const fs = require('fs');
const path = require('path');
const { cities } = require('../data/cities');
const { faqs } = require('../data/faqs');
const { getCitySEOContent } = require('../data/city-seo/index.ts');
const { getDistrictSEOContent, getServiceDistrictSEO } = require('../data/district-seo/index.ts');
const { childServicesData } = require('../data/electricista/child-services-seo');
const { electricistaHubSeoContent, electricistaHubFaqs } = require('../data/electricista/hub-page-content');
const { ELECTRICISTA_CLUSTERS } = require('../data/seo/electricista-clusters');
const { ELECTRICISTA_SEMANTIC_MAP } = require('../data/seo/electricista-semantic-map');
const { getAllowedPageSlugs } = require('../data/seo/page-registry');

type PageType = 'hub' | 'child' | 'city' | 'district';

type AuditPage = {
  path: string;
  type: PageType;
  slug: string;
  citySlug?: string;
  districtSlug?: string;
  routeGenerated: boolean;
  semanticSource: string | null;
  semanticExists: boolean;
  productionContentSource: string | null;
  productionContentExists: boolean;
  metaSource: string | null;
  metaExists: boolean;
  faqSource: string | null;
  faqExists: boolean;
  seoTextSource: string | null;
  seoTextExists: boolean;
  renderedBlocks: string[];
  missingOrNotRendered: string[];
  notes: string[];
  keywordAudit?: KeywordAudit;
};

type KeywordAudit = {
  totalClusterKeywords: number;
  coveredAnywhere: number;
  coveredInProse: number;
  tagOnlyKeywords: string[];
  missingKeywords: string[];
};

const SERVICE_ID = 'electricista';
const OUT_DIR = path.join(process.cwd(), '.tmp', 'category-audits');
const VALENCIA_SERVICE_LANDING_SERVICES = ['electricista'];

function isValenciaServiceLanding(service: string, citySlug: string): boolean {
  return VALENCIA_SERVICE_LANDING_SERVICES.includes(service) && citySlug === 'valencia';
}

function parseArgs() {
  const args = process.argv.slice(2);
  const serviceIndex = args.indexOf('--service');
  const service = serviceIndex >= 0 ? args[serviceIndex + 1] : SERVICE_ID;

  if (service !== SERVICE_ID) {
    throw new Error('This audit currently supports only --service electricista');
  }

  return { service };
}

function childBlocks() {
  return [
    'ServiceHeroV2',
    'MobileStickyCTA',
    'ServicesGridV1',
    'TrustSignalsV1',
    'ProcessStepsV3',
    'PricingSectionV1',
    'OpinionesClientesV1',
    'ServiceAreasV1',
    'FaqSectionV2',
    'SeoContentSectionV1',
    'TrustCtaBlueV1',
  ];
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectText(value: any, skipKeywordFields = false): string {
  const parts: string[] = [];

  function walk(item: any, key = '') {
    if (!item) return;
    if (
      skipKeywordFields &&
      ['keywordTags', 'seoBlockKw', 'faqKw', 'secondaryKw'].includes(key)
    ) {
      return;
    }

    if (typeof item === 'string') {
      parts.push(item);
      return;
    }

    if (Array.isArray(item)) {
      item.forEach((child) => walk(child));
      return;
    }

    if (typeof item === 'object') {
      Object.entries(item).forEach(([childKey, childValue]) => walk(childValue, childKey));
    }
  }

  walk(value);
  return normalizeText(parts.join(' '));
}

function keywordAuditFor(content: any, cluster: any): KeywordAudit | undefined {
  if (!content || !cluster) return undefined;

  const keywords = [
    cluster.primaryKeyword,
    ...(cluster.secondaryKeywords || []),
    ...(cluster.longTailKeywords || []),
  ].filter(Boolean);

  const fullText = collectText(content);
  const proseText = collectText(content, true);
  const coveredAnywhere = keywords.filter((keyword) => fullText.includes(normalizeText(keyword)));
  const coveredInProse = keywords.filter((keyword) => proseText.includes(normalizeText(keyword)));

  return {
    totalClusterKeywords: keywords.length,
    coveredAnywhere: coveredAnywhere.length,
    coveredInProse: coveredInProse.length,
    tagOnlyKeywords: coveredAnywhere.filter((keyword) => !proseText.includes(normalizeText(keyword))),
    missingKeywords: keywords.filter((keyword) => !fullText.includes(normalizeText(keyword))),
  };
}

function hubPage(): AuditPage {
  const genericFaqs = faqs.filter((faq: any) => faq.serviceId === SERVICE_ID);

  return {
    path: `/${SERVICE_ID}`,
    type: 'hub',
    slug: SERVICE_ID,
    routeGenerated: true,
    semanticSource: 'data/seo/electricista-semantic-map.ts',
    semanticExists: Boolean(ELECTRICISTA_SEMANTIC_MAP.hubKeyword),
    productionContentSource: 'data/electricista/hub-page-content.ts',
    productionContentExists: Boolean(electricistaHubSeoContent),
    metaSource: 'lib/seo/metadata-enhanced.ts via data/services.ts',
    metaExists: true,
    faqSource:
      electricistaHubFaqs.length > 0
        ? 'data/electricista/hub-page-content.ts'
        : genericFaqs.length > 0
          ? 'data/faqs.ts'
          : null,
    faqExists: electricistaHubFaqs.length > 0 || genericFaqs.length > 0,
    seoTextSource: 'data/electricista/hub-page-content.ts',
    seoTextExists: true,
    renderedBlocks: [
      'ServiceHeroV2',
      'MobileStickyCTA',
      'ServicesGridV1',
      'TrustSignalsV1',
      'ProcessStepsV3',
      'PricingSectionV1',
      'OpinionesClientesV1',
      'ServiceAreasV1',
      'FaqSectionV2',
      'SeoContentSectionV1',
      'TrustCtaBlueV1',
    ],
    missingOrNotRendered: [],
    notes: [
      'Hub is the Valencia landing for electricista and uses the electricista DS/content architecture.',
    ],
  };
}

function childPages(): AuditPage[] {
  const allowedSlugs = getAllowedPageSlugs(SERVICE_ID);

  return allowedSlugs.map((slug: string) => {
    const content = childServicesData[slug];
    const cluster = ELECTRICISTA_CLUSTERS.find((entry: any) => entry.slug === slug);
    const target = ELECTRICISTA_SEMANTIC_MAP.existingPageTargets.find((entry: any) => entry.slug === slug);

    return {
      path: `/${SERVICE_ID}/${slug}`,
      type: 'child',
      slug,
      routeGenerated: true,
      semanticSource: 'data/seo/electricista-semantic-map.ts + data/seo/electricista-clusters.ts',
      semanticExists: Boolean(cluster && target),
      productionContentSource: 'data/electricista/child-services-seo.ts',
      productionContentExists: Boolean(content),
      metaSource: 'data/electricista/child-services-seo.ts',
      metaExists: Boolean(content?.metaTitle && content?.metaDescription && content?.h1),
      faqSource: 'data/electricista/child-services-seo.ts',
      faqExists: Boolean(content?.faqs?.length),
      seoTextSource: 'data/electricista/child-services-seo.ts seoContent',
      seoTextExists: Boolean(content?.seoContent?.intro?.length),
      renderedBlocks: childBlocks(),
      missingOrNotRendered: [],
      notes: [
        'Child page uses page-registry production gate and full electricista DS block set.',
      ],
      keywordAudit: keywordAuditFor(content, cluster),
    };
  });
}

function cityPages(): AuditPage[] {
  return cities.map((city: any) => {
    const content = getCitySEOContent(SERVICE_ID, city.slug);
    const redirectsToHub = isValenciaServiceLanding(SERVICE_ID, city.slug);

    return {
      path: `/${SERVICE_ID}/${city.slug}`,
      type: 'city',
      slug: city.slug,
      citySlug: city.slug,
      routeGenerated: !redirectsToHub,
      semanticSource: 'data/city-seo-content.ts',
      semanticExists: Boolean(content?.keywords),
      productionContentSource: 'data/city-seo-content.ts',
      productionContentExists: Boolean(content),
      metaSource: redirectsToHub
        ? `next.config.js redirect to /${SERVICE_ID}`
        : 'lib/seo/metadata-enhanced.ts via data/services.ts + city',
      metaExists: true,
      faqSource: content?.faqs?.length ? 'data/city-seo-content.ts' : null,
      faqExists: Boolean(content?.faqs?.length),
      seoTextSource: content?.seoText ? 'data/city-seo-content.ts' : null,
      seoTextExists: Boolean(content?.seoText),
      renderedBlocks: redirectsToHub
        ? ['308 Redirect']
        : [
            'ServiceHeroV2',
            'ServicesGridV1',
            'TrustSignalsV1',
            'ProcessStepsV3',
            'PricingSectionV1',
            'OpinionesClientesV1',
            'DistrictLinksBlock',
            'FaqSectionV2',
            'SeoContentSection',
            'TrustCtaBlueV1',
          ],
      missingOrNotRendered: redirectsToHub
        ? []
        : [
            'City metadata entry exists but current route uses generated metadata, not citySEO.metadata',
          ],
      notes: [
        redirectsToHub
          ? `Valencia city URL is canonicalized to /${SERVICE_ID}; the hub owns Valencia service intent.`
          : 'City GEO semantic/content exists for electricista and now renders the electricista DS commercial block set.',
      ],
    };
  });
}

function districtPages(): AuditPage[] {
  return cities.flatMap((city: any) =>
    city.districts.map((district: any) => {
      const content = getDistrictSEOContent(SERVICE_ID, city.slug, district.slug);

      return {
        path: `/${SERVICE_ID}/${city.slug}/${district.slug}`,
        type: 'district' as const,
        slug: `${city.slug}/${district.slug}`,
        citySlug: city.slug,
        districtSlug: district.slug,
        routeGenerated: true,
        semanticSource: content ? 'data/district-seo-content.ts' : null,
        semanticExists: Boolean(content?.semanticOwnership?.length),
        productionContentSource: content ? 'data/district-seo-content.ts' : null,
        productionContentExists: Boolean(content),
        metaSource: content
          ? 'data/district-seo-content.ts metadata'
          : 'lib/seo/semantic-content-generator.ts fallback metadata',
        metaExists: true,
        faqSource: content?.faqs?.length ? 'data/district-seo-content.ts' : null,
        faqExists: Boolean(content?.faqs?.length),
        seoTextSource: content?.seoText ? 'data/district-seo-content.ts' : null,
        seoTextExists: Boolean(content?.seoText),
        renderedBlocks: [
          'ServiceHeroV2',
          'ServicesGridV1',
          'TrustSignalsV1',
          'ProcessStepsV3',
          'PricingSectionV1',
          'OpinionesClientesV1',
          ...(content?.faqs?.length ? ['FaqSectionV2'] : []),
          ...(content?.seoText ? ['SeoContentSection'] : []),
          'TrustCtaBlueV1',
        ],
        missingOrNotRendered: content
          ? []
          : [
              'No matching district SEO entry for this routed district',
              'No district FAQ source for this routed district',
            ],
        notes: [
          content
            ? 'District page renders electricista DS commercial blocks and district SEO body content.'
            : 'District page is visually complete with electricista DS blocks, but semantic/content coverage is missing.',
        ],
      };
    })
  );
}

function getOrphanDistrictSeoEntries() {
  const routeKeys = new Set(
    cities.flatMap((city: any) =>
      city.districts.map((district: any) => `${city.slug}/${district.slug}`)
    )
  );

  return getServiceDistrictSEO(SERVICE_ID)
    .map((entry: any) => ({
      path: `/${SERVICE_ID}/${entry.citySlug}/${entry.districtSlug}`,
      citySlug: entry.citySlug,
      districtSlug: entry.districtSlug,
      semanticOwnership: entry.semanticOwnership,
    }))
    .filter((entry: any) => !routeKeys.has(`${entry.citySlug}/${entry.districtSlug}`));
}

function summarize(pages: AuditPage[]) {
  const byType = (type: PageType) => pages.filter((page) => page.type === type);
  const withSemantic = pages.filter((page) => page.semanticExists).length;
  const withProductionContent = pages.filter((page) => page.productionContentExists).length;
  const withFaq = pages.filter((page) => page.faqExists).length;
  const withSeoText = pages.filter((page) => page.seoTextExists).length;
  const pagesWithUnrenderedContent = pages.filter((page) =>
    page.missingOrNotRendered.some((item) => item.includes('exists but current route renders'))
  ).length;
  const childKeywordAudits = byType('child').filter((page) => page.keywordAudit);
  const childKeywordCoverage = childKeywordAudits.map((page) => ({
    slug: page.slug,
    totalClusterKeywords: page.keywordAudit!.totalClusterKeywords,
    coveredAnywhere: page.keywordAudit!.coveredAnywhere,
    coveredInProse: page.keywordAudit!.coveredInProse,
    tagOnlyCount: page.keywordAudit!.tagOnlyKeywords.length,
    missingCount: page.keywordAudit!.missingKeywords.length,
  }));

  return {
    totalRoutablePages: pages.length,
    byType: {
      hub: byType('hub').length,
      child: byType('child').length,
      city: byType('city').length,
      district: byType('district').length,
    },
    coverage: {
      semanticExists: withSemantic,
      productionContentExists: withProductionContent,
      faqExists: withFaq,
      seoTextExists: withSeoText,
      pagesWithUnrenderedContent,
    },
    childPages: {
      total: byType('child').length,
      fullDsBlockSet: byType('child').filter((page) => page.renderedBlocks.includes('TrustCtaBlueV1')).length,
      keywordCoverage: childKeywordCoverage,
      pagesWithMissingKeywords: childKeywordCoverage.filter((page) => page.missingCount > 0).length,
      pagesWithTagOnlyKeywords: childKeywordCoverage.filter((page) => page.tagOnlyCount > 0).length,
    },
    cityGeoPages: {
      total: byType('city').length,
      contentExists: byType('city').filter((page) => page.productionContentExists).length,
      redirectedToHub: byType('city').filter((page) => page.renderedBlocks.includes('308 Redirect')).length,
      renderedSeoText: byType('city').filter((page) => page.renderedBlocks.includes('SeoContentSection')).length,
      renderedFaq: byType('city').filter((page) => page.renderedBlocks.includes('FaqSectionV2')).length,
    },
    districtGeoPages: {
      total: byType('district').length,
      contentExists: byType('district').filter((page) => page.productionContentExists).length,
      missingContent: byType('district').filter((page) => !page.productionContentExists).length,
      renderedSeoText: byType('district').filter((page) => page.renderedBlocks.includes('SeoContentSection')).length,
      renderedFaq: byType('district').filter((page) => page.renderedBlocks.includes('FaqSectionV2')).length,
    },
  };
}

function main() {
  const { service } = parseArgs();
  const pages = [
    hubPage(),
    ...childPages(),
    ...cityPages(),
    ...districtPages(),
  ];

  const orphanDistrictSeoEntries = getOrphanDistrictSeoEntries();
  const audit = {
    source: 'category-conveyor-audit',
    generatedAt: new Date().toISOString(),
    service,
    summary: summarize(pages),
    orphanDistrictSeoEntries,
    recommendedNextSteps: [
      'Resolve remaining missing district SEO entries for routable electricista district pages.',
      'Resolve orphan district SEO entries that are not routable from data/cities.ts.',
      'Decide the policy for non-Valencia city GEO pages while real field coverage is Valencia-first.',
      'Run visual audit for /electricista after the hub was promoted to the Valencia landing.',
    ],
    pages,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${service}-category-conveyor-audit.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(audit, null, 2)}\n`);

  console.log(`Category conveyor audit completed for ${service}`);
  console.log(`Routable pages: ${audit.summary.totalRoutablePages}`);
  console.log(`Hub: ${audit.summary.byType.hub}`);
  console.log(`Child: ${audit.summary.byType.child}`);
  console.log(`City GEO: ${audit.summary.byType.city}`);
  console.log(`City GEO redirected to hub: ${audit.summary.cityGeoPages.redirectedToHub}`);
  console.log(`District GEO: ${audit.summary.byType.district}`);
  console.log(`District GEO content missing: ${audit.summary.districtGeoPages.missingContent}`);
  console.log(`Orphan district SEO entries: ${orphanDistrictSeoEntries.length}`);
  console.log(`Output: ${path.relative(process.cwd(), outPath)}`);
}

main();
