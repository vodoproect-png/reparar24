#!/usr/bin/env ts-node
/**
 * Semantic Layer Validation Script
 * 
 * PURPOSE:
 * Validates that semantic maps, SEO maps, keyword clusters, page-registry,
 * and production content stay aligned. This is a safety layer for future
 * automation to prevent inconsistencies.
 * 
 * VALIDATION RULES:
 * 1. Every approved child service in semantic-map has a matching entry in seo-map
 * 2. Every approved child service in semantic-map has a matching cluster
 * 3. Every seo-map entry belongs to an existing approved semantic-map child or hub
 * 4. Every keyword cluster belongs to an existing semantic-map child or future category
 * 5. No duplicate slugs exist
 * 6. No empty primaryKeyword fields
 * 7. No empty titleTemplate, descriptionTemplate or h1Template fields
 * 8. Future categories may exist in clusters but must NOT be treated as approved child pages
 * 9. Every registry child with allowed=true must have production content
 * 10. Every production content entry must be allowed=true in registry
 * 11. Every allowed=false registry child must NOT be in production content
 * 12. Every allowed=true child must have semantic-map, cluster, and seo-map entries
 * 13. Every allowed=true child must have matching primaryKeyword across semantic-map, cluster, and production content
 * 14. Production secondaryKw must overlap with cluster secondaryKeywords for allowed=true children
 * 15. Electricista GEO city pages must have city SEO content
 * 16. Electricista GEO district pages must have matching district SEO content
 * 17. Electricista district SEO entries must correspond to real routable districts
 * 18. Electricista GEO routes must render existing GEO SEO content, not hide it behind fontanero-only gates
 * 19. Valencia service landing pages must canonicalize /service/valencia to /service
 * 20. Child service pages must not duplicate TrustSignalsV1 headings
 * 
 * USAGE:
 * npm run validate:semantic
 */

// Use CommonJS require with no file extensions (for ts-node compatibility)
const { ELECTRICISTA_SEMANTIC_MAP } = require('../data/seo/electricista-semantic-map');
const { ELECTRICISTA_SEO_MAP } = require('../data/seo/electricista-seo-map');
const { ELECTRICISTA_CLUSTERS, ELECTRICISTA_FUTURE_CLUSTERS } = require('../data/seo/electricista-clusters');
const { FONTANERO_SEMANTIC_MAP } = require('../data/seo/fontanero-semantic-map');
const { FONTANERO_SEO_MAP } = require('../data/seo/fontanero-seo-map');
const { FONTANERO_CLUSTERS, FONTANERO_FUTURE_CLUSTERS } = require('../data/seo/fontanero-clusters');
const { PAGE_REGISTRY } = require('../data/seo/page-registry');
const { childServicesData: electricistaChildServicesData } = require('../data/electricista/child-services-seo');
const { childServicesData: fontaneroChildServicesData } = require('../data/fontanero/child-services-seo');
const fs = require('fs');
const path = require('path');
const { cities } = require('../data/cities');
const { getCitySEOContent } = require('../data/city-seo-content');
const { getDistrictSEOContent, getServiceDistrictSEO } = require('../data/district-seo-content');

const VALENCIA_SERVICE_LANDING_SERVICES = ['electricista'];

interface ValidationError {
  service: string;
  type: string;
  slug?: string;
  problem: string;
}

function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

class SemanticLayerValidator {
  public errors: ValidationError[] = [];

  /**
   * Validate a single service (semantic map + seo map + clusters + registry + content)
   */
  validateService(
    serviceName: string,
    semanticMap: any,
    seoMap: any,
    clusters: any[],
    futureClusters: any[],
    productionContent: Record<string, any>
  ): void {
    // Get approved children slugs from semantic map
    const approvedChildSlugs = (semanticMap.existingPageTargets || semanticMap.approvedChildren || [])
      .filter((child: any) => child.status === 'approved')
      .map((child: any) => child.slug);

    // Get future category slugs from semantic map (support both old and new names)
    const futureCategorySlugs = (semanticMap.futureCategoryCandidates || semanticMap.futureCategories || [])
      .map((cat: any) => cat.slug);

    // RULE 1: Every approved child in semantic-map has matching entry in seo-map
    approvedChildSlugs.forEach((slug: string) => {
      if (!seoMap.children[slug]) {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `Approved child "${slug}" exists in semantic-map but missing in seo-map`
        });
      }
    });

    // RULE 2: Every approved child in semantic-map has matching cluster (approved OR future)
    // UPDATED: Clusters can exist without pages, but approved pages should have clusters
    approvedChildSlugs.forEach((slug: string) => {
      const hasCluster = clusters.some((cluster: any) => cluster.slug === slug) ||
                        futureClusters.some((cluster: any) => cluster.slug === slug);
      if (!hasCluster) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-clusters',
          slug,
          problem: `Approved child "${slug}" exists in semantic-map but missing in keyword clusters`
        });
      }
    });

    // RULE 3: Every seo-map entry belongs to existing approved semantic-map child or hub
    Object.keys(seoMap.children).forEach((slug: string) => {
      if (!approvedChildSlugs.includes(slug)) {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `SEO map entry "${slug}" does not belong to any approved semantic-map child`
        });
      }
    });

    // RULE 4: Every keyword cluster belongs to existing semantic-map child or future category
    [...clusters, ...futureClusters].forEach((cluster: any) => {
      const isApprovedChild = approvedChildSlugs.includes(cluster.slug);
      const isFutureCategory = futureCategorySlugs.includes(cluster.slug);
      
      if (!isApprovedChild && !isFutureCategory) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-clusters',
          slug: cluster.slug,
          problem: `Cluster "${cluster.slug}" does not belong to any semantic-map child or future category`
        });
      }
    });

    // RULE 5: No duplicate slugs in semantic map
    const allSemanticSlugs = [
      ...(semanticMap.existingPageTargets || semanticMap.approvedChildren || []).map((c: any) => c.slug),
      ...(semanticMap.futureCategoryCandidates || semanticMap.futureCategories || []).map((c: any) => c.slug)
    ];
    const duplicateSlugs = allSemanticSlugs.filter((slug: string, index: number) => 
      allSemanticSlugs.indexOf(slug) !== index
    );
    duplicateSlugs.forEach((slug: string) => {
      this.errors.push({
        service: serviceName,
        type: 'semantic-map',
        slug,
        problem: `Duplicate slug "${slug}" found in semantic-map`
      });
    });

    // RULE 6: No empty primaryKeyword fields
    (semanticMap.existingPageTargets || semanticMap.approvedChildren || []).forEach((child: any) => {
      if (!child.primaryKeyword || child.primaryKeyword.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'semantic-map',
          slug: child.slug,
          problem: `Empty primaryKeyword for child "${child.slug}"`
        });
      }
    });

    clusters.forEach((cluster: any) => {
      if (!cluster.primaryKeyword || cluster.primaryKeyword.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'keyword-clusters',
          slug: cluster.slug,
          problem: `Empty primaryKeyword for cluster "${cluster.slug}"`
        });
      }
    });

    // RULE 7: No empty titleTemplate, descriptionTemplate or h1Template fields
    // Check hub
    if (!seoMap.hub.titleTemplate || seoMap.hub.titleTemplate.trim() === '') {
      this.errors.push({
        service: serviceName,
        type: 'seo-map',
        problem: 'Empty titleTemplate for hub page'
      });
    }
    if (!seoMap.hub.descriptionTemplate || seoMap.hub.descriptionTemplate.trim() === '') {
      this.errors.push({
        service: serviceName,
        type: 'seo-map',
        problem: 'Empty descriptionTemplate for hub page'
      });
    }
    if (!seoMap.hub.h1Template || seoMap.hub.h1Template.trim() === '') {
      this.errors.push({
        service: serviceName,
        type: 'seo-map',
        problem: 'Empty h1Template for hub page'
      });
    }

    // Check children
    Object.entries(seoMap.children).forEach(([slug, template]: [string, any]) => {
      if (!template.titleTemplate || template.titleTemplate.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `Empty titleTemplate for child "${slug}"`
        });
      }
      if (!template.descriptionTemplate || template.descriptionTemplate.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `Empty descriptionTemplate for child "${slug}"`
        });
      }
      if (!template.h1Template || template.h1Template.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `Empty h1Template for child "${slug}"`
        });
      }
    });

    // RULE 8: Verify future categories are not in approved children (safety check)
    futureCategorySlugs.forEach((slug: string) => {
      if (approvedChildSlugs.includes(slug)) {
        this.errors.push({
          service: serviceName,
          type: 'semantic-map',
          slug,
          problem: `Slug "${slug}" exists in both future candidates and existing page targets`
        });
      }
    });

    // Additional check: Approved clusters should not be future categories
    clusters.filter((c: any) => c.status === 'approved').forEach((cluster: any) => {
      if (futureCategorySlugs.includes(cluster.slug)) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-clusters',
          slug: cluster.slug,
          problem: `Cluster "${cluster.slug}" is approved but belongs to future category`
        });
      }
    });

    // PAGE REGISTRY + PRODUCTION CONTENT VALIDATION
    const registry = PAGE_REGISTRY[serviceName];
    if (!registry) {
      this.errors.push({
        service: serviceName,
        type: 'page-registry',
        problem: `Service "${serviceName}" missing in PAGE_REGISTRY`
      });
      return;
    }

    // Get all registry children
    const allowedRegistryChildren = registry.children
      .filter((c: any) => c.allowed === true)
      .map((c: any) => c.slug);
    
    const disallowedRegistryChildren = registry.children
      .filter((c: any) => c.allowed === false)
      .map((c: any) => c.slug);

    // Get production content slugs
    const productionContentSlugs = Object.keys(productionContent);

    // RULE 9: Every allowed registry child must have production content
    allowedRegistryChildren.forEach((slug: string) => {
      if (!productionContentSlugs.includes(slug)) {
        this.errors.push({
          service: serviceName,
          type: 'production-content',
          slug,
          problem: `Registry child "${slug}" is allowed=true but missing in production content`
        });
      }
    });

    // RULE 10: Every production content entry must be allowed=true in registry
    productionContentSlugs.forEach((slug: string) => {
      if (!allowedRegistryChildren.includes(slug)) {
        this.errors.push({
          service: serviceName,
          type: 'page-registry',
          slug,
          problem: `Production content "${slug}" exists but is NOT allowed=true in page-registry`
        });
      }
    });

    // RULE 11: Every allowed=false registry child must NOT be in production content
    disallowedRegistryChildren.forEach((slug: string) => {
      if (productionContentSlugs.includes(slug)) {
        this.errors.push({
          service: serviceName,
          type: 'production-content',
          slug,
          problem: `Registry child "${slug}" is allowed=false but EXISTS in production content (must remove)`
        });
      }
    });

    // RULE 12: Every allowed=true child must have complete semantic layer
    // STRICT: allowed=true pages MUST have approved cluster (not future cluster)
    allowedRegistryChildren.forEach((slug: string) => {
      const hasSemanticMap = approvedChildSlugs.includes(slug);
      const hasApprovedCluster = clusters.some((c: any) => c.slug === slug && c.status === 'approved');
      const hasOnlyFutureCluster = !hasApprovedCluster && futureClusters.some((c: any) => c.slug === slug);
      const hasSeoMap = seoMap.children[slug];
      const hasProductionContent = productionContentSlugs.includes(slug);

      if (!hasSemanticMap) {
        this.errors.push({
          service: serviceName,
          type: 'semantic-map',
          slug,
          problem: `Allowed registry child "${slug}" missing in semantic-map existingPageTargets with status='approved'`
        });
      }

      if (!hasApprovedCluster) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-clusters',
          slug,
          problem: `Allowed registry child "${slug}" missing approved cluster in main clusters (${hasOnlyFutureCluster ? 'exists only in futureClusters - NOT valid for production' : 'not found'})`
        });
      }

      if (!hasSeoMap) {
        this.errors.push({
          service: serviceName,
          type: 'seo-map',
          slug,
          problem: `Allowed registry child "${slug}" missing in seo-map children`
        });
      }

      if (!hasProductionContent) {
        this.errors.push({
          service: serviceName,
          type: 'production-content',
          slug,
          problem: `Allowed registry child "${slug}" missing in production childServicesData`
        });
      }

      // RULE 13: Primary keyword alignment across semantic-map, cluster, and production content
      const semanticChild = (semanticMap.existingPageTargets || semanticMap.approvedChildren || [])
        .find((child: any) => child.slug === slug && child.status === 'approved');
      const approvedCluster = clusters.find((cluster: any) => cluster.slug === slug && cluster.status === 'approved');
      const contentEntry = productionContent[slug];

      if (semanticChild && approvedCluster && semanticChild.primaryKeyword !== approvedCluster.primaryKeyword) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-alignment',
          slug,
          problem: `Primary keyword mismatch: semantic-map="${semanticChild.primaryKeyword}" but cluster="${approvedCluster.primaryKeyword}"`
        });
      }

      if (approvedCluster && contentEntry?.lockedPrimaryKw && contentEntry.lockedPrimaryKw !== approvedCluster.primaryKeyword) {
        this.errors.push({
          service: serviceName,
          type: 'keyword-alignment',
          slug,
          problem: `Primary keyword mismatch: production lockedPrimaryKw="${contentEntry.lockedPrimaryKw}" but cluster="${approvedCluster.primaryKeyword}"`
        });
      }

      // RULE 14: Production secondary keywords should not drift completely away from cluster keywords
      if (approvedCluster && contentEntry?.secondaryKw) {
        const clusterKeywords = [
          approvedCluster.primaryKeyword,
          ...(approvedCluster.secondaryKeywords || []),
          ...(approvedCluster.longTailKeywords || [])
        ].filter(Boolean).map(normalizeKeyword);
        const productionSecondary = (contentEntry.secondaryKw || []).map(normalizeKeyword);
        const overlap = productionSecondary.filter((keyword: string) => clusterKeywords.includes(keyword));

        if (clusterKeywords.length > 0 && productionSecondary.length > 0 && overlap.length === 0) {
          this.errors.push({
            service: serviceName,
            type: 'keyword-alignment',
            slug,
            problem: `Secondary keyword mismatch: production secondaryKw has no overlap with cluster keywords`
          });
        }
      }
    });
  }

  /**
   * Validate GEO layer for electricista routes.
   *
   * GEO pages are generated from data/cities.ts. If a route exists, the semantic
   * content must exist and must be reachable from the current route render.
   */
  validateElectricistaGeoLayer(): void {
    const serviceName = 'electricista';

    // RULE 15: Every routable city GEO page must have complete city SEO content
    cities.forEach((city: any) => {
      const content = getCitySEOContent(serviceName, city.slug);
      const slug = city.slug;

      if (!content) {
        this.errors.push({
          service: serviceName,
          type: 'geo-city-content',
          slug,
          problem: `Routable city GEO page "/electricista/${city.slug}" is missing data/city-seo-content.ts entry`
        });
        return;
      }

      if (!content.metadata?.title || !content.metadata?.description) {
        this.errors.push({
          service: serviceName,
          type: 'geo-city-content',
          slug,
          problem: `City GEO page "/electricista/${city.slug}" has incomplete metadata in data/city-seo-content.ts`
        });
      }

      if (!content.seoText || content.seoText.trim() === '') {
        this.errors.push({
          service: serviceName,
          type: 'geo-city-content',
          slug,
          problem: `City GEO page "/electricista/${city.slug}" has empty seoText in data/city-seo-content.ts`
        });
      }

      if (!Array.isArray(content.faqs) || content.faqs.length === 0) {
        this.errors.push({
          service: serviceName,
          type: 'geo-city-content',
          slug,
          problem: `City GEO page "/electricista/${city.slug}" has no FAQ items in data/city-seo-content.ts`
        });
      }

      const keywordCount = [
        ...(content.keywords?.primary || []),
        ...(content.keywords?.secondary || []),
        ...(content.keywords?.longTail || [])
      ].length;

      if (keywordCount === 0) {
        this.errors.push({
          service: serviceName,
          type: 'geo-city-content',
          slug,
          problem: `City GEO page "/electricista/${city.slug}" has no keyword ownership in data/city-seo-content.ts`
        });
      }
    });

    const routableDistrictKeys = new Set<string>();

    // RULE 16: Every routable district GEO page must have complete district SEO content
    cities.forEach((city: any) => {
      city.districts.forEach((district: any) => {
        const key = `${city.slug}/${district.slug}`;
        routableDistrictKeys.add(key);

        const content = getDistrictSEOContent(serviceName, city.slug, district.slug);

        if (!content) {
          this.errors.push({
            service: serviceName,
            type: 'geo-district-content',
            slug: key,
            problem: `Routable district GEO page "/electricista/${city.slug}/${district.slug}" is missing data/district-seo-content.ts entry`
          });
          return;
        }

        if (!content.metadata?.title || !content.metadata?.description) {
          this.errors.push({
            service: serviceName,
            type: 'geo-district-content',
            slug: key,
            problem: `District GEO page "/electricista/${city.slug}/${district.slug}" has incomplete metadata in data/district-seo-content.ts`
          });
        }

        if (!content.seoText || content.seoText.trim() === '') {
          this.errors.push({
            service: serviceName,
            type: 'geo-district-content',
            slug: key,
            problem: `District GEO page "/electricista/${city.slug}/${district.slug}" has empty seoText in data/district-seo-content.ts`
          });
        }

        if (!Array.isArray(content.faqs) || content.faqs.length === 0) {
          this.errors.push({
            service: serviceName,
            type: 'geo-district-content',
            slug: key,
            problem: `District GEO page "/electricista/${city.slug}/${district.slug}" has no FAQ items in data/district-seo-content.ts`
          });
        }

        if (!Array.isArray(content.semanticOwnership) || content.semanticOwnership.length === 0) {
          this.errors.push({
            service: serviceName,
            type: 'geo-district-content',
            slug: key,
            problem: `District GEO page "/electricista/${city.slug}/${district.slug}" has no semanticOwnership in data/district-seo-content.ts`
          });
        }
      });
    });

    // RULE 17: District SEO entries must correspond to real routes from data/cities.ts
    getServiceDistrictSEO(serviceName).forEach((entry: any) => {
      const key = `${entry.citySlug}/${entry.districtSlug}`;

      if (!routableDistrictKeys.has(key)) {
        this.errors.push({
          service: serviceName,
          type: 'geo-district-orphan',
          slug: key,
          problem: `District SEO entry "/electricista/${key}" exists but is not routable from data/cities.ts`
        });
      }
    });

    // RULE 18: Existing electricista GEO content must be reachable from routes
    const cityRoutePath = path.join(process.cwd(), 'app', '[locale]', '[serviceSlug]', '[citySlug]', 'page.tsx');
    const districtRoutePath = path.join(process.cwd(), 'app', '[locale]', '[serviceSlug]', '[citySlug]', '[districtSlug]', 'page.tsx');
    const cityRoute = fs.readFileSync(cityRoutePath, 'utf8');
    const districtRoute = fs.readFileSync(districtRoutePath, 'utf8');

    const citySeoStillFontaneroOnly =
      cityRoute.includes("citySEO && citySEO.faqs.length > 0 && locale === 'es' && service.slug === 'fontanero'") ||
      cityRoute.includes("citySEO && locale === 'es' && service.slug === 'fontanero'");

    if (citySeoStillFontaneroOnly) {
      this.errors.push({
        service: serviceName,
        type: 'geo-route-render',
        slug: 'city',
        problem: 'City GEO SEO text/FAQ exists for electricista but route rendering is gated behind service.slug === fontanero'
      });
    }

    const districtSeoStillFontaneroOnly =
      districtRoute.includes("districtSEO && districtSEO.faqs && districtSEO.faqs.length > 0 && locale === 'es' && service.slug === 'fontanero'") ||
      districtRoute.includes("districtSEO && locale === 'es' && service.slug === 'fontanero'");

    if (districtSeoStillFontaneroOnly) {
      this.errors.push({
        service: serviceName,
        type: 'geo-route-render',
        slug: 'district',
        problem: 'District GEO SEO text/FAQ exists for electricista but route rendering is gated behind service.slug === fontanero'
      });
    }

    // RULE 19: Services promoted as Valencia landings must not expose /service/valencia as a canonical page
    if (VALENCIA_SERVICE_LANDING_SERVICES.includes(serviceName)) {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');
      const internalLinksPath = path.join(process.cwd(), 'lib', 'linking', 'internal.ts');
      const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');
      const internalLinks = fs.readFileSync(internalLinksPath, 'utf8');

      if (
        !nextConfig.includes('serviceValenciaRedirects') ||
        !nextConfig.includes('source: `/${serviceSlug}/valencia`') ||
        !nextConfig.includes('destination: `/${serviceSlug}`') ||
        !nextConfig.includes('source: `/es/${serviceSlug}/valencia`')
      ) {
        this.errors.push({
          service: serviceName,
          type: 'valencia-landing-canonical',
          slug: 'redirect',
          problem: `/${serviceName}/valencia must permanently redirect to /${serviceName}`
        });
      }

      if (
        !sitemap.includes("city.slug === 'valencia'") ||
        !sitemap.includes('return')
      ) {
        this.errors.push({
          service: serviceName,
          type: 'valencia-landing-canonical',
          slug: 'sitemap',
          problem: `/${serviceName}/valencia must be excluded from sitemap because /${serviceName} is the Valencia landing`
        });
      }

      if (
        !internalLinks.includes('getCanonicalServiceCityHref') ||
        !internalLinks.includes("city.slug === 'valencia'") ||
        !internalLinks.includes('return getServiceUrl(service.slug, locale)')
      ) {
        this.errors.push({
          service: serviceName,
          type: 'valencia-landing-canonical',
          slug: 'internal-links',
          problem: `Internal service-city links for Valencia must point to /${serviceName}, not /${serviceName}/valencia`
        });
      }
    }

    // RULE 20: Child page templates must let TrustSignalsV1 own its heading.
    // A manual heading before TrustSignalsV1 caused duplicate "Ventajas / Por qué elegir" blocks.
    const childRoutePath = path.join(process.cwd(), 'app', '[locale]', serviceName, '[childSlug]', 'page.tsx');
    if (fs.existsSync(childRoutePath)) {
      const childRoute = fs.readFileSync(childRoutePath, 'utf8');
      if (
        childRoute.includes('SEO Heading + Trust Signals V1') ||
        childRoute.includes('VENTAJAS REPARAR24') ||
        childRoute.includes('container-custom mt-8 mb-4') && childRoute.includes('<TrustSignalsV1')
      ) {
        this.errors.push({
          service: serviceName,
          type: 'child-route-ui',
          slug: 'trust-signals',
          problem: 'Child route template duplicates the TrustSignalsV1 heading; keep badge/title/subtitle inside TrustSignalsV1 only'
        });
      }
    }
  }

  /**
   * Print validation errors
   */
  printErrors(): void {
    if (this.errors.length === 0) {
      console.log('\n✅ Semantic layer validation passed\n');
      return;
    }

    console.log('\n❌ Semantic layer validation failed\n');
    console.log(`Found ${this.errors.length} error(s):\n`);

    this.errors.forEach((error, index) => {
      console.log(`${index + 1}. [${error.service}] ${error.type}${error.slug ? ` - ${error.slug}` : ''}`);
      console.log(`   ${error.problem}\n`);
    });
  }

  /**
   * Check if validation passed
   */
  isValid(): boolean {
    return this.errors.length === 0;
  }
}

/**
 * Main validation function
 */
function validateSemanticLayer(): void {
  const validator = new SemanticLayerValidator();

  console.log('🔍 Validating Semantic Layer...\n');
  console.log('Services: electricista, fontanero\n');

  // Validate Electricista
  validator.validateService(
    'electricista',
    ELECTRICISTA_SEMANTIC_MAP,
    ELECTRICISTA_SEO_MAP,
    ELECTRICISTA_CLUSTERS,
    ELECTRICISTA_FUTURE_CLUSTERS,
    electricistaChildServicesData
  );
  validator.validateElectricistaGeoLayer();

  // Validate Fontanero
  validator.validateService(
    'fontanero',
    FONTANERO_SEMANTIC_MAP,
    FONTANERO_SEO_MAP,
    FONTANERO_CLUSTERS,
    FONTANERO_FUTURE_CLUSTERS,
    fontaneroChildServicesData
  );

  // Print results
  validator.printErrors();

  // Exit with appropriate status
  if (!validator.isValid()) {
    process.exit(1);
  }
}

/**
 * Self-Test Mode: Negative Validation Scenarios
 * 
 * Tests that the validator correctly catches errors by creating
 * in-memory violations and verifying they are detected.
 */
function runSelfTest(): void {
  console.log('🧪 Running Self-Test Mode: Negative Validation Scenarios\n');
  console.log('Testing that validator catches governance violations...\n');

  let allTestsPassed = true;
  const testResults: Array<{ name: string; passed: boolean; message: string }> = [];

  // TEST 1: allowed=false slug present in production content
  console.log('Test 1: allowed=false slug in production content');
  console.log('  Injecting "boletin-electrico" into production content (should be caught)...');
  
  const testContentWithAllowedFalse = {
    ...electricistaChildServicesData,
    'boletin-electrico': {
      title: 'Test violation',
      description: 'This should not exist'
    }
  };

  const validator1 = new SemanticLayerValidator();
  validator1.validateService(
    'electricista',
    ELECTRICISTA_SEMANTIC_MAP,
    ELECTRICISTA_SEO_MAP,
    ELECTRICISTA_CLUSTERS,
    ELECTRICISTA_FUTURE_CLUSTERS,
    testContentWithAllowedFalse
  );

  const test1Passed = validator1.errors.some(
    err => err.slug === 'boletin-electrico' && 
           err.type === 'production-content' &&
           err.problem.includes('allowed=false')
  );

  testResults.push({
    name: 'Test 1: Catch allowed=false in production',
    passed: test1Passed,
    message: test1Passed 
      ? '✅ Validator correctly detected allowed=false slug in production content'
      : '❌ FAILED: Validator did not catch allowed=false slug in production content'
  });

  if (!test1Passed) allTestsPassed = false;

  // TEST 2: allowed=true slug with only future cluster (no approved cluster)
  console.log('\nTest 2: allowed=true slug with only future cluster');
  console.log('  Creating modified page-registry where boletin-electrico is allowed=true...');
  console.log('  (boletin-electrico exists only in FUTURE_CLUSTERS, not in main CLUSTERS)');

  // Create test registry where boletin-electrico is allowed=true
  const testRegistry = {
    ...PAGE_REGISTRY,
    electricista: {
      ...PAGE_REGISTRY.electricista,
      children: PAGE_REGISTRY.electricista.children.map((child: any) => 
        child.slug === 'boletin-electrico' 
          ? { ...child, allowed: true, status: 'approved' }
          : child
      )
    }
  };

  // Mock the registry for this test
  const originalRegistry = PAGE_REGISTRY.electricista;
  (PAGE_REGISTRY as any).electricista = testRegistry.electricista;

  const validator2 = new SemanticLayerValidator();
  validator2.validateService(
    'electricista',
    ELECTRICISTA_SEMANTIC_MAP,
    ELECTRICISTA_SEO_MAP,
    ELECTRICISTA_CLUSTERS,
    ELECTRICISTA_FUTURE_CLUSTERS,
    electricistaChildServicesData
  );

  // Restore original registry
  (PAGE_REGISTRY as any).electricista = originalRegistry;

  const test2Passed = validator2.errors.some(
    err => err.slug === 'boletin-electrico' &&
           err.type === 'keyword-clusters' &&
           err.problem.includes('futureClusters')
  );

  testResults.push({
    name: 'Test 2: Reject allowed=true with only future cluster',
    passed: test2Passed,
    message: test2Passed
      ? '✅ Validator correctly rejected allowed=true page with only future cluster'
      : '❌ FAILED: Validator did not catch allowed=true page with only future cluster'
  });

  if (!test2Passed) allTestsPassed = false;

  // TEST 3: Verify normal child/page-registry validation still passes (no false positives)
  console.log('\nTest 3: Verify normal child/page-registry validation passes (no false positives)');
  console.log('  Running normal child/page-registry validation on production data...');

  const validator3 = new SemanticLayerValidator();
  validator3.validateService(
    'electricista',
    ELECTRICISTA_SEMANTIC_MAP,
    ELECTRICISTA_SEO_MAP,
    ELECTRICISTA_CLUSTERS,
    ELECTRICISTA_FUTURE_CLUSTERS,
    electricistaChildServicesData
  );
  validator3.validateService(
    'fontanero',
    FONTANERO_SEMANTIC_MAP,
    FONTANERO_SEO_MAP,
    FONTANERO_CLUSTERS,
    FONTANERO_FUTURE_CLUSTERS,
    fontaneroChildServicesData
  );

  const test3Passed = validator3.isValid();

  testResults.push({
    name: 'Test 3: Normal child/page-registry validation passes',
    passed: test3Passed,
    message: test3Passed
      ? '✅ Normal child/page-registry production data passes validation (no false positives)'
      : '❌ FAILED: Normal child/page-registry production data failed validation (false positive detected)'
  });

  if (!test3Passed) allTestsPassed = false;

  // Print results
  console.log('\n' + '='.repeat(80));
  console.log('SELF-TEST RESULTS');
  console.log('='.repeat(80) + '\n');

  testResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.name}`);
    console.log(`   ${result.message}\n`);
  });

  console.log('='.repeat(80));
  if (allTestsPassed) {
    console.log('✅ ALL SELF-TESTS PASSED');
    console.log('='.repeat(80));
    console.log('\nValidator successfully catches governance violations.');
    console.log('✅ allowed=false pages in production → BLOCKED');
    console.log('✅ allowed=true with only future clusters → BLOCKED');
    console.log('✅ Normal child/page-registry production data → PASSES\n');
    process.exit(0);
  } else {
    console.log('❌ SELF-TESTS FAILED');
    console.log('='.repeat(80));
    console.log('\nValidator is NOT catching expected governance violations!');
    console.log('This indicates a critical issue with validation logic.\n');
    process.exit(1);
  }
}

// Determine mode from CLI arguments
const args = process.argv.slice(2);
const isSelfTest = args.includes('--self-test');

if (isSelfTest) {
  runSelfTest();
} else {
  validateSemanticLayer();
}
