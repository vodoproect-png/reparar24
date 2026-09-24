#!/usr/bin/env ts-node
/**
 * Semantic Review Aggregator (DRAFT MODE)
 *
 * PURPOSE:
 * Aggregates classifier review files from .tmp/semantic-review into a
 * category-level draft cluster for human review.
 *
 * SAFETY:
 * - Does NOT modify data/seo
 * - Does NOT modify page-registry
 * - Does NOT create routes or pages
 * - Writes draft output only to .tmp/semantic-review/cluster-drafts/
 */

const fs = require('fs');
const path = require('path');

interface ReviewKeyword {
  keyword: string;
  volume?: number | null;
  difficulty?: number | null;
  cpc?: number | null;
  traffic_potential?: number | null;
  bucket: string;
  target?: string;
  reason: string;
}

interface ReviewFile {
  filePath: string;
  service?: string;
  seed?: string;
  inputFile?: string;
  inputFiles?: string[];
  classifiedAt?: string;
}

function showHelp(): void {
  console.log('Semantic Review Aggregator - Help');
  console.log('=================================\n');
  console.log('USAGE:');
  console.log('  npm run aggregate:review -- --target enchufes-interruptores --service electricista\n');
  console.log('OPTIONS:');
  console.log('  --target <slug>      Target category to aggregate (required)');
  console.log('  --service <service>  Service context, default: electricista');
  console.log('  --help               Show this help message\n');
  console.log('OUTPUT:');
  console.log('  .tmp/semantic-review/cluster-drafts/{service}-{target}.json\n');
}

function parseArgs(): { target: string; service: string } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const targetIndex = args.indexOf('--target');
  const serviceIndex = args.indexOf('--service');

  if (targetIndex === -1 || !args[targetIndex + 1]) {
    console.error('Missing required argument: --target\n');
    showHelp();
    process.exit(1);
  }

  return {
    target: args[targetIndex + 1],
    service: serviceIndex !== -1 && args[serviceIndex + 1] ? args[serviceIndex + 1] : 'electricista',
  };
}

function getReviewFiles(): ReviewFile[] {
  const dir = path.join(process.cwd(), '.tmp', 'semantic-review');

  if (!fs.existsSync(dir)) {
    throw new Error('No .tmp/semantic-review directory found. Run classify:ahrefs first.');
  }

  return fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .filter((file: string) => !file.includes('batch-'))
    .filter((file: string) => !file.includes('seed-results'))
    .filter((file: string) => file !== 'enchufes-nongeo-reclassified-results.json')
    .map((file: string) => path.join(dir, file))
    .map((filePath: string) => {
      const review = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return {
        filePath,
        service: review.service,
        seed: review.seed,
        inputFile: review.inputFile,
        inputFiles: review.inputFiles,
        classifiedAt: review.classifiedAt,
      };
    });
}

function getLatestReviewFiles(): string[] {
  const latestByInput = new Map<string, ReviewFile>();

  for (const file of getReviewFiles()) {
    if (!file.service) continue;

    const key = file.inputFile ||
      (Array.isArray(file.inputFiles) && file.inputFiles.length > 0 ? `${file.service}:${file.inputFiles.sort().join('|')}` : '') ||
      (file.seed ? `${file.service}:${file.seed}` : file.filePath);
    const existing = latestByInput.get(key);
    const fileTime = Date.parse(file.classifiedAt || '') || fs.statSync(file.filePath).mtimeMs;
    const existingTime = existing
      ? Date.parse(existing.classifiedAt || '') || fs.statSync(existing.filePath).mtimeMs
      : 0;

    if (!existing || fileTime > existingTime) {
      latestByInput.set(key, file);
    }
  }

  return Array.from(latestByInput.values()).map(file => file.filePath);
}

function addUniqueKeyword(target: Map<string, ReviewKeyword>, item: ReviewKeyword): void {
  const key = item.keyword.toLowerCase();
  const existing = target.get(key);

  if (!existing) {
    target.set(key, item);
    return;
  }

  const existingVolume = Number(existing.volume || 0);
  const itemVolume = Number(item.volume || 0);

  if (itemVolume > existingVolume) {
    target.set(key, item);
  }
}

function readMatchingReviews(service: string, targetSlug: string): {
  sourceFiles: string[];
  approved: ReviewKeyword[];
  rejected: ReviewKeyword[];
  needsReview: ReviewKeyword[];
  future: ReviewKeyword[];
  contentOpportunity: ReviewKeyword[];
  crossService: ReviewKeyword[];
} {
  const approved = new Map<string, ReviewKeyword>();
  const rejected = new Map<string, ReviewKeyword>();
  const needsReview = new Map<string, ReviewKeyword>();
  const future = new Map<string, ReviewKeyword>();
  const contentOpportunity = new Map<string, ReviewKeyword>();
  const crossService = new Map<string, ReviewKeyword>();
  const sourceFiles: string[] = [];

  for (const filePath of getLatestReviewFiles()) {
    const review = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (review.service !== service) continue;

    const approvedItems = (review.grouped?.approvedTarget || []) as ReviewKeyword[];
    const futureItems = (review.grouped?.futureCandidate || []) as ReviewKeyword[];
    const contentOpportunityItems = (review.grouped?.contentOpportunity || []) as ReviewKeyword[];
    const crossServiceItems = (review.grouped?.crossService || []) as ReviewKeyword[];
    const rejectedItems = (review.grouped?.rejected || []) as ReviewKeyword[];
    const needsReviewItems = (review.grouped?.needsReview || []) as ReviewKeyword[];

    const hasTarget = approvedItems.some(item => item.target === targetSlug) ||
      futureItems.some(item => item.target === targetSlug) ||
      contentOpportunityItems.some(item => item.target === targetSlug) ||
      crossServiceItems.some(item => item.target === targetSlug);

    if (!hasTarget) continue;

    sourceFiles.push(path.relative(process.cwd(), filePath));

    for (const item of approvedItems.filter(item => item.target === targetSlug)) {
      addUniqueKeyword(approved, item);
    }

    for (const item of futureItems.filter(item => item.target === targetSlug)) {
      addUniqueKeyword(future, item);
    }

    for (const item of contentOpportunityItems.filter(item => item.target === targetSlug)) {
      addUniqueKeyword(contentOpportunity, item);
    }

    for (const item of crossServiceItems.filter(item => item.target === targetSlug)) {
      addUniqueKeyword(crossService, item);
    }

    for (const item of rejectedItems) {
      addUniqueKeyword(rejected, item);
    }

    for (const item of needsReviewItems) {
      addUniqueKeyword(needsReview, item);
    }
  }

  return {
    sourceFiles,
    approved: Array.from(approved.values()),
    rejected: Array.from(rejected.values()),
    needsReview: Array.from(needsReview.values()),
    future: Array.from(future.values()),
    contentOpportunity: Array.from(contentOpportunity.values()),
    crossService: Array.from(crossService.values()),
  };
}

function sortKeywords(items: ReviewKeyword[]): ReviewKeyword[] {
  return [...items].sort((a, b) => {
    const volumeDiff = Number(b.volume || 0) - Number(a.volume || 0);
    if (volumeDiff !== 0) return volumeDiff;
    return a.keyword.localeCompare(b.keyword);
  });
}

function suggestPrimaryKeyword(approved: ReviewKeyword[], targetSlug: string): string {
  const sorted = sortKeywords(approved);
  const targetPreferences: Record<string, RegExp[]> = {
    'enchufes-interruptores': [
      /^enchufe valencia$/i,
      /^instalar enchufe valencia$/i,
      /^cambiar enchufe valencia$/i,
      /^instalar interruptor valencia$/i,
      /^cambiar interruptor valencia$/i,
      /^enchufes e interruptores$/i,
      /^instalar enchufe$/i,
      /^cambiar enchufe$/i,
      /^reparar enchufe$/i,
    ],
  };

  for (const pattern of targetPreferences[targetSlug] || []) {
    const preferred = sorted.find(item => pattern.test(item.keyword));
    if (preferred) return preferred.keyword;
  }

  const exactServiceIntent = sorted.find(item =>
    /\b(cambiar|instalar|reparar)\b/i.test(item.keyword) &&
    /\b(enchufe|enchufes|interruptor|interruptores)\b/i.test(item.keyword)
  );

  return exactServiceIntent?.keyword || sorted[0]?.keyword || targetSlug;
}

function writeDraft(service: string, targetSlug: string, data: ReturnType<typeof readMatchingReviews>): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'semantic-review', 'cluster-drafts');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const approved = sortKeywords(data.approved);
  const rejected = sortKeywords(data.rejected);
  const needsReview = sortKeywords(data.needsReview);
  const future = sortKeywords(data.future);
  const contentOpportunity = sortKeywords(data.contentOpportunity);
  const crossService = sortKeywords(data.crossService);
  const primaryKeyword = suggestPrimaryKeyword(approved, targetSlug);

  const result = {
    source: 'semantic-review-aggregator',
    service,
    target: targetSlug,
    generatedAt: new Date().toISOString(),
    sourceFiles: data.sourceFiles.sort(),
    draftCluster: {
      slug: targetSlug,
      primaryKeyword,
      secondaryKeywords: approved
        .map(item => item.keyword)
        .filter(keyword => keyword !== primaryKeyword)
        .slice(0, 30),
      commercialIntent: 'medium',
      status: 'review-draft',
      notes: 'Draft generated from Ahrefs classifier review files. Requires human approval before production.',
    },
    counts: {
      approved: approved.length,
      future: future.length,
      contentOpportunity: contentOpportunity.length,
      crossService: crossService.length,
      rejected: rejected.length,
      needsReview: needsReview.length,
    },
    approvedKeywords: approved,
    futureKeywords: future,
    contentOpportunities: contentOpportunity,
    crossServiceKeywords: crossService,
    rejectedExamples: rejected,
    needsReviewExamples: needsReview,
  };

  const outputPath = path.join(outputDir, `${service}-${targetSlug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  return outputPath;
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const data = readMatchingReviews(options.service, options.target);

  if (data.sourceFiles.length === 0) {
    throw new Error(`No review files found for service="${options.service}" target="${options.target}".`);
  }

  const outputPath = writeDraft(options.service, options.target, data);
  const approved = sortKeywords(data.approved);

  console.log('Semantic Review Aggregation');
  console.log('===========================');
  console.log(`Service: ${options.service}`);
  console.log(`Target: ${options.target}`);
  console.log(`Source files: ${data.sourceFiles.length}`);
  console.log(`Approved keywords: ${data.approved.length}`);
  console.log(`Future candidates: ${data.future.length}`);
  console.log(`Rejected examples: ${data.rejected.length}`);
  console.log(`Content opportunities: ${data.contentOpportunity.length}`);
  console.log(`Cross-service examples: ${data.crossService.length}`);
  console.log(`Needs-review examples: ${data.needsReview.length}`);
  console.log(`Primary keyword suggestion: ${suggestPrimaryKeyword(approved, options.target)}`);
  console.log(`\nSaved draft to: ${path.relative(process.cwd(), outputPath)}`);
  console.log('\nNo production files were modified.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nAggregation failed: ${error.message}\n`);
  process.exit(1);
}
