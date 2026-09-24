#!/usr/bin/env ts-node
/**
 * Semantic Review Resolver (FINAL DRAFT MODE)
 *
 * PURPOSE:
 * Converts a category-level semantic review draft into a final production
 * candidate file after conservative automatic review decisions.
 *
 * SAFETY:
 * - Does NOT modify data/seo
 * - Does NOT modify page-registry
 * - Does NOT create routes or pages
 * - Writes output only to .tmp/semantic-review/cluster-drafts/
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

interface ResolvedKeyword extends ReviewKeyword {
  decision: 'approved' | 'rejected' | 'manual-review';
  decisionReason: string;
}

function showHelp(): void {
  console.log('Semantic Review Resolver - Help');
  console.log('===============================\n');
  console.log('USAGE:');
  console.log('  npm run resolve:review -- --input .tmp/semantic-review/cluster-drafts/electricista-enchufes-interruptores.json\n');
  console.log('OPTIONS:');
  console.log('  --input <path>  Aggregated review draft JSON (required)');
  console.log('  --help          Show this help message\n');
  console.log('OUTPUT:');
  console.log('  .tmp/semantic-review/cluster-drafts/{service}-{target}-final.json\n');
}

function parseArgs(): { input: string } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const inputIndex = args.indexOf('--input');
  if (inputIndex === -1 || !args[inputIndex + 1]) {
    console.error('Missing required argument: --input\n');
    showHelp();
    process.exit(1);
  }

  return { input: args[inputIndex + 1] };
}

function resolveInput(input: string): string {
  const fullPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Input file not found: ${input}`);
  }
  return fullPath;
}

function sortKeywords<T extends ReviewKeyword>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const volumeDiff = Number(b.volume || 0) - Number(a.volume || 0);
    if (volumeDiff !== 0) return volumeDiff;
    return a.keyword.localeCompare(b.keyword);
  });
}

function rejectReason(keyword: string): string | null {
  const text = keyword.toLowerCase();

  const rules: Array<{ pattern: RegExp; reason: string }> = [
    { pattern: /\b(teckin|bticino|sonoff|simon|schneider|ikea|legrand|niloe|niessen)\b/i, reason: 'Brand/product-specific intent' },
    { pattern: /\b(adaptador|embellecedor|embellecedores|cargador|iphone|notebook|portalamparas|portalámparas|e27)\b/i, reason: 'Consumer product intent' },
    { pattern: /\b(coche|auto|vehiculo|vehículo|freno|peugeot|ibiza|seat|12v|mechero)\b/i, reason: 'Vehicle/auto electrical intent' },
    { pattern: /\b(sin cortar corriente)\b/i, reason: 'Unsafe DIY how-to intent' },
    { pattern: /\benchufe\b.*\b(wifi|inteligente|smart)\b.*\b(no funciona|reparar|porque)\b/i, reason: 'Smart-plug product troubleshooting intent' },
    { pattern: /\bporque\b.*\benchufe\b.*\b(wifi|inteligente|smart)\b/i, reason: 'Smart-plug product troubleshooting intent' },
    { pattern: /\breparar enchufe\b.*\b(wifi|inteligente|smart)\b/i, reason: 'Smart-plug product troubleshooting intent' },
    { pattern: /\b(nataly|justicia|sanidad|solar)\b/i, reason: 'Ambiguous entity or non-standard service intent' },
    { pattern: /\b(altura|conexiones|limpiar|ingles|inglés|a español)\b/i, reason: 'DIY/specification intent, not service demand' },
    { pattern: /^como\s+(cambiar|instalar)\b/i, reason: 'DIY how-to intent; do not use as production service keyword' },
  ];

  const match = rules.find(rule => rule.pattern.test(text));
  return match?.reason || null;
}

function promoteNeedsReviewReason(keyword: string): string | null {
  const text = keyword.toLowerCase();

  if (/^como\s+(arreglar|reparar)\b/i.test(text) && /\benchufe\b/i.test(text)) {
    return 'Service-adjacent repair FAQ intent';
  }

  return null;
}

function approveKeyword(item: ReviewKeyword, decisionReason: string): ResolvedKeyword {
  return {
    ...item,
    bucket: 'approved-target',
    decision: 'approved',
    decisionReason,
  };
}

function rejectKeyword(item: ReviewKeyword, decisionReason: string): ResolvedKeyword {
  return {
    ...item,
    bucket: 'rejected',
    decision: 'rejected',
    decisionReason,
  };
}

function manualReviewKeyword(item: ReviewKeyword, decisionReason: string): ResolvedKeyword {
  return {
    ...item,
    decision: 'manual-review',
    decisionReason,
  };
}

function resolveDraft(draft: any): {
  approved: ResolvedKeyword[];
  rejected: ResolvedKeyword[];
  manualReview: ResolvedKeyword[];
} {
  const approved = new Map<string, ResolvedKeyword>();
  const rejected = new Map<string, ResolvedKeyword>();
  const manualReview = new Map<string, ResolvedKeyword>();

  const add = (target: Map<string, ResolvedKeyword>, item: ResolvedKeyword): void => {
    target.set(item.keyword.toLowerCase(), item);
  };

  for (const item of (draft.approvedKeywords || []) as ReviewKeyword[]) {
    const reason = rejectReason(item.keyword);
    if (reason) {
      add(rejected, rejectKeyword(item, reason));
    } else {
      add(approved, approveKeyword(item, 'Classifier approved and resolver found no reject signal'));
    }
  }

  for (const item of (draft.needsReviewExamples || []) as ReviewKeyword[]) {
    const reject = rejectReason(item.keyword);
    if (reject) {
      add(rejected, rejectKeyword(item, reject));
      continue;
    }

    const promote = promoteNeedsReviewReason(item.keyword);
    if (promote) {
      add(approved, approveKeyword(item, promote));
      continue;
    }

    add(manualReview, manualReviewKeyword(item, 'No deterministic resolver rule matched'));
  }

  for (const item of (draft.rejectedExamples || []) as ReviewKeyword[]) {
    add(rejected, rejectKeyword(item, item.reason || 'Classifier rejected'));
  }

  return {
    approved: sortKeywords(Array.from(approved.values())),
    rejected: sortKeywords(Array.from(rejected.values())),
    manualReview: sortKeywords(Array.from(manualReview.values())),
  };
}

function writeFinalDraft(inputPath: string, draft: any): string {
  const resolved = resolveDraft(draft);
  const primaryKeyword = draft.draftCluster?.primaryKeyword || resolved.approved[0]?.keyword || draft.target;
  const outputDir = path.dirname(inputPath);
  const outputPath = path.join(outputDir, `${draft.service}-${draft.target}-final.json`);

  const result = {
    source: 'semantic-review-resolver',
    inputFile: path.relative(process.cwd(), inputPath),
    service: draft.service,
    target: draft.target,
    generatedAt: new Date().toISOString(),
    sourceFiles: draft.sourceFiles || [],
    finalClusterCandidate: {
      slug: draft.target,
      primaryKeyword,
      secondaryKeywords: resolved.approved
        .map(item => item.keyword)
        .filter(keyword => keyword !== primaryKeyword)
        .slice(0, 40),
      commercialIntent: draft.draftCluster?.commercialIntent || 'medium',
      status: resolved.manualReview.length === 0 ? 'ready-for-human-approval' : 'manual-review-required',
      notes: 'Final draft generated from semantic review. Requires human approval before production cluster update.',
    },
    counts: {
      approved: resolved.approved.length,
      rejected: resolved.rejected.length,
      manualReview: resolved.manualReview.length,
    },
    approvedKeywords: resolved.approved,
    rejectedKeywords: resolved.rejected,
    manualReviewKeywords: resolved.manualReview,
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  return outputPath;
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const inputPath = resolveInput(options.input);
  const draft = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const outputPath = writeFinalDraft(inputPath, draft);
  const result = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

  console.log('Semantic Review Resolution');
  console.log('==========================');
  console.log(`Service: ${result.service}`);
  console.log(`Target: ${result.target}`);
  console.log(`Approved: ${result.counts.approved}`);
  console.log(`Rejected: ${result.counts.rejected}`);
  console.log(`Manual review: ${result.counts.manualReview}`);
  console.log(`Primary keyword: ${result.finalClusterCandidate.primaryKeyword}`);
  console.log(`\nSaved final draft to: ${path.relative(process.cwd(), outputPath)}`);
  console.log('\nNo production files were modified.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nResolution failed: ${error.message}\n`);
  process.exit(1);
}
