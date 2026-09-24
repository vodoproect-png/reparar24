#!/usr/bin/env ts-node
/**
 * SEO Impact Preview
 *
 * PURPOSE:
 * Shows how a promoted keyword cluster relates to the current semantic-map,
 * seo-map, and production page content before updating page copy.
 *
 * SAFETY:
 * - Does NOT modify production files
 * - Does NOT call external APIs
 * - Writes preview report only to .tmp/semantic-review/seo-previews/
 */

const fs = require('fs');
const path = require('path');

function showHelp(): void {
  console.log('SEO Impact Preview - Help');
  console.log('=========================\n');
  console.log('USAGE:');
  console.log('  npm run preview:seo-impact -- --service electricista --slug enchufes-interruptores\n');
  console.log('OPTIONS:');
  console.log('  --service <service>  Service id: electricista or fontanero (required)');
  console.log('  --slug <slug>        Child service slug (required)');
  console.log('  --help               Show this help message\n');
}

function parseArgs(): { service: string; slug: string } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const serviceIndex = args.indexOf('--service');
  const slugIndex = args.indexOf('--slug');

  if (serviceIndex === -1 || !args[serviceIndex + 1] || slugIndex === -1 || !args[slugIndex + 1]) {
    console.error('Missing required arguments: --service and --slug\n');
    showHelp();
    process.exit(1);
  }

  return {
    service: args[serviceIndex + 1],
    slug: args[slugIndex + 1],
  };
}

function loadService(service: string): {
  semanticMap: any;
  seoMap: any;
  clusters: any[];
  productionContent: Record<string, any>;
} {
  if (service === 'electricista') {
    return {
      semanticMap: require('../data/seo/electricista-semantic-map').ELECTRICISTA_SEMANTIC_MAP,
      seoMap: require('../data/seo/electricista-seo-map').ELECTRICISTA_SEO_MAP,
      clusters: require('../data/seo/electricista-clusters').ELECTRICISTA_CLUSTERS,
      productionContent: require('../data/electricista/child-services-seo').childServicesData,
    };
  }

  if (service === 'fontanero') {
    return {
      semanticMap: require('../data/seo/fontanero-semantic-map').FONTANERO_SEMANTIC_MAP,
      seoMap: require('../data/seo/fontanero-seo-map').FONTANERO_SEO_MAP,
      clusters: require('../data/seo/fontanero-clusters').FONTANERO_CLUSTERS,
      productionContent: require('../data/fontanero/child-services-seo').childServicesData,
    };
  }

  throw new Error(`Unsupported service: ${service}`);
}

function getApprovedChildren(semanticMap: any): any[] {
  return (semanticMap.approvedChildren || semanticMap.existingPageTargets || [])
    .filter((child: any) => child.status === 'approved');
}

function compareArrays(left: string[] = [], right: string[] = []): {
  shared: string[];
  onlyLeft: string[];
  onlyRight: string[];
} {
  return {
    shared: left.filter(item => right.includes(item)),
    onlyLeft: left.filter(item => !right.includes(item)),
    onlyRight: right.filter(item => !left.includes(item)),
  };
}

function normalizeKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function templateContainsPrimary(templateText: string, primaryKeyword: string): boolean {
  const normalizedTemplate = normalizeKeyword(templateText.replace(/\{city\}/g, 'valencia'));
  const normalizedPrimary = normalizeKeyword(primaryKeyword);
  const primaryTokens = normalizedPrimary.split(/\s+/).filter(Boolean);

  return normalizedTemplate.includes(normalizedPrimary) ||
    primaryTokens.every(token => normalizedTemplate.includes(token));
}

function buildWarnings(data: {
  semanticChild: any;
  cluster: any;
  seoTemplate: any;
  production: any;
}): string[] {
  const warnings: string[] = [];
  const { semanticChild, cluster, seoTemplate, production } = data;

  if (semanticChild.primaryKeyword !== cluster.primaryKeyword) {
    warnings.push(`semantic-map primaryKeyword "${semanticChild.primaryKeyword}" differs from cluster primaryKeyword "${cluster.primaryKeyword}"`);
  }

  if (production?.lockedPrimaryKw && production.lockedPrimaryKw !== cluster.primaryKeyword) {
    warnings.push(`production lockedPrimaryKw "${production.lockedPrimaryKw}" differs from cluster primaryKeyword "${cluster.primaryKeyword}"`);
  }

  const productionSecondary = production?.secondaryKw || [];
  const secondaryOverlap = compareArrays(cluster.secondaryKeywords || [], productionSecondary);
  if (secondaryOverlap.onlyLeft.length > 0 || secondaryOverlap.onlyRight.length > 0) {
    warnings.push(`production secondaryKw is not aligned with cluster secondaryKeywords (${secondaryOverlap.shared.length} shared)`);
  }

  const seoText = [
    seoTemplate?.titleTemplate,
    seoTemplate?.descriptionTemplate,
    seoTemplate?.h1Template,
  ].filter(Boolean).join(' ');
  if (seoText && !templateContainsPrimary(seoText, cluster.primaryKeyword)) {
    warnings.push('seo-map templates do not contain the promoted cluster primaryKeyword');
  }

  return warnings;
}

function ensureOutputDirectory(): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'semantic-review', 'seo-previews');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const { semanticMap, seoMap, clusters, productionContent } = loadService(options.service);
  const semanticChild = getApprovedChildren(semanticMap).find(child => child.slug === options.slug);
  const cluster = clusters.find(cluster => cluster.slug === options.slug);
  const seoTemplate = seoMap.children[options.slug];
  const production = productionContent[options.slug];

  if (!semanticChild) throw new Error(`Semantic child not found: ${options.service}/${options.slug}`);
  if (!cluster) throw new Error(`Cluster not found: ${options.service}/${options.slug}`);
  if (!seoTemplate) throw new Error(`SEO map template not found: ${options.service}/${options.slug}`);
  if (!production) throw new Error(`Production content not found: ${options.service}/${options.slug}`);

  const report = {
    source: 'seo-impact-preview',
    generatedAt: new Date().toISOString(),
    service: options.service,
    slug: options.slug,
    semanticMap: {
      primaryKeyword: semanticChild.primaryKeyword,
      secondaryKeywords: semanticChild.secondaryKeywords || [],
    },
    cluster: {
      primaryKeyword: cluster.primaryKeyword,
      secondaryKeywords: cluster.secondaryKeywords || [],
      longTailKeywords: cluster.longTailKeywords || [],
      commercialIntent: cluster.commercialIntent,
      status: cluster.status,
      notes: cluster.notes,
    },
    seoMap: seoTemplate,
    productionContent: {
      lockedPrimaryKw: production.lockedPrimaryKw,
      secondaryKw: production.secondaryKw || [],
      seoBlockKw: production.seoBlockKw || [],
      faqKw: production.faqKw || [],
      metaTitle: production.metaTitle,
      metaDescription: production.metaDescription,
      h1: production.h1,
    },
    comparisons: {
      clusterVsProductionSecondary: compareArrays(cluster.secondaryKeywords || [], production.secondaryKw || []),
    },
    warnings: buildWarnings({ semanticChild, cluster, seoTemplate, production }),
  };

  const outputDir = ensureOutputDirectory();
  const outputPath = path.join(outputDir, `${options.service}-${options.slug}-impact.json`);
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('SEO Impact Preview');
  console.log('==================');
  console.log(`Service: ${options.service}`);
  console.log(`Slug: ${options.slug}`);
  console.log(`Cluster primary: ${cluster.primaryKeyword}`);
  console.log(`Semantic primary: ${semanticChild.primaryKeyword}`);
  console.log(`Production locked primary: ${production.lockedPrimaryKw}`);
  console.log(`Cluster secondary: ${(cluster.secondaryKeywords || []).length}`);
  console.log(`Cluster long-tail: ${(cluster.longTailKeywords || []).length}`);
  console.log(`Warnings: ${report.warnings.length}`);
  report.warnings.forEach((warning: string) => console.log(`- ${warning}`));
  console.log(`\nSaved preview to: ${path.relative(process.cwd(), outputPath)}`);
  console.log('\nNo production files were modified.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nPreview failed: ${error.message}\n`);
  process.exit(1);
}
