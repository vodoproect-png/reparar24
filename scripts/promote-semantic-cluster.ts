#!/usr/bin/env ts-node
/**
 * Semantic Cluster Promoter
 *
 * PURPOSE:
 * Promotes a resolved semantic review final draft into the matching
 * production keyword cluster file.
 *
 * SAFETY:
 * - Requires --apply for writes
 * - Supports electricista only until other services are explicitly mapped
 * - Updates only the matching cluster object by slug
 * - Does NOT modify page-registry, routes, sitemap, or production content
 */

const fs = require('fs');
const path = require('path');

interface ReviewKeyword {
  keyword: string;
  volume?: number | null;
}

function showHelp(): void {
  console.log('Semantic Cluster Promoter - Help');
  console.log('===============================\n');
  console.log('USAGE:');
  console.log('  npm run promote:cluster -- --input .tmp/semantic-review/cluster-drafts/electricista-enchufes-interruptores-final.json');
  console.log('  npm run promote:cluster -- --input .tmp/semantic-review/cluster-drafts/electricista-enchufes-interruptores-final.json --apply\n');
  console.log('OPTIONS:');
  console.log('  --input <path>  Resolved final draft JSON (required)');
  console.log('  --apply         Write changes to production cluster file');
  console.log('  --help          Show this help message\n');
}

function parseArgs(): { input: string; apply: boolean } | null {
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

  return {
    input: args[inputIndex + 1],
    apply: args.includes('--apply'),
  };
}

function resolveInput(input: string): string {
  const fullPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Input file not found: ${input}`);
  }
  return fullPath;
}

function getClusterFile(service: string): string {
  if (service !== 'electricista') {
    throw new Error(`Unsupported service for promotion: ${service}`);
  }

  return path.join(process.cwd(), 'data', 'seo', 'electricista-clusters.ts');
}

function quoteList(values: string[], indent: string): string {
  return values.map(value => `${indent}'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`).join(',\n');
}

function isLongTail(keyword: string): boolean {
  const wordCount = keyword.trim().split(/\s+/).length;
  return wordCount >= 6 ||
    /^(como|porque|cuanto|causas|olor|incendio|mi)\b/i.test(keyword) ||
    /\b(no funciona|quemado|se sale|garaje comunitario|de pared|huele a quemado)\b/i.test(keyword);
}

function splitKeywords(finalDraft: any): { secondaryKeywords: string[]; longTailKeywords: string[] } {
  const primary = finalDraft.finalClusterCandidate.primaryKeyword;
  const ordered = ((finalDraft.approvedKeywords || []) as ReviewKeyword[])
    .map(item => item.keyword)
    .filter(Boolean)
    .filter(keyword => keyword !== primary);

  const unique = Array.from(new Set(ordered));
  const secondaryCandidates = unique.filter(keyword => !isLongTail(keyword));
  const longTailCandidates = unique.filter(keyword => isLongTail(keyword));

  return {
    secondaryKeywords: secondaryCandidates.slice(0, 12),
    longTailKeywords: [
      ...secondaryCandidates.slice(12),
      ...longTailCandidates,
    ].slice(0, 40),
  };
}

function buildClusterObject(finalDraft: any): string {
  const { secondaryKeywords, longTailKeywords } = splitKeywords(finalDraft);
  const primaryKeyword = finalDraft.finalClusterCandidate.primaryKeyword;
  const commercialIntent = finalDraft.finalClusterCandidate.commercialIntent || 'medium';

  return `  {
    slug: '${finalDraft.target}',
    primaryKeyword: '${primaryKeyword.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
    secondaryKeywords: [
${quoteList(secondaryKeywords, '      ')}
    ],
    longTailKeywords: [
${quoteList(longTailKeywords, '      ')}
    ],
    commercialIntent: '${commercialIntent}',
    status: 'approved',
    notes: 'Promoted from Ahrefs semantic review. Product, brand, auto and unsafe DIY intents excluded by classifier/resolver.'
  },`;
}

function findClusterObjectRange(source: string, slug: string): { start: number; end: number } {
  const slugIndex = source.indexOf(`slug: '${slug}'`);
  if (slugIndex === -1) {
    throw new Error(`Cluster slug not found in production file: ${slug}`);
  }

  const start = source.lastIndexOf('  {', slugIndex);
  if (start === -1) {
    throw new Error(`Could not find cluster object start for slug: ${slug}`);
  }

  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let index = start; index < source.length; index++) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    if (char === '\'' || char === '"' || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === '{') depth++;
    if (char === '}') {
      depth--;
      if (depth === 0) {
        let end = index + 1;
        if (source.slice(end, end + 1) === ',') end++;
        return { start, end };
      }
    }
  }

  throw new Error(`Could not find cluster object end for slug: ${slug}`);
}

function promote(finalDraft: any, apply: boolean): {
  clusterFile: string;
  primaryKeyword: string;
  secondaryCount: number;
  longTailCount: number;
} {
  if (finalDraft.finalClusterCandidate?.status !== 'ready-for-human-approval') {
    throw new Error(`Final draft is not ready for promotion: ${finalDraft.finalClusterCandidate?.status}`);
  }

  if ((finalDraft.counts?.manualReview || 0) !== 0) {
    throw new Error('Final draft still has manualReview keywords.');
  }

  const clusterFile = getClusterFile(finalDraft.service);
  const source = fs.readFileSync(clusterFile, 'utf-8');
  const range = findClusterObjectRange(source, finalDraft.target);
  const clusterObject = buildClusterObject(finalDraft);
  const updated = `${source.slice(0, range.start)}${clusterObject}${source.slice(range.end)}`;
  const { secondaryKeywords, longTailKeywords } = splitKeywords(finalDraft);

  if (apply) {
    fs.writeFileSync(clusterFile, updated, 'utf-8');
  }

  return {
    clusterFile,
    primaryKeyword: finalDraft.finalClusterCandidate.primaryKeyword,
    secondaryCount: secondaryKeywords.length,
    longTailCount: longTailKeywords.length,
  };
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const inputPath = resolveInput(options.input);
  const finalDraft = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const result = promote(finalDraft, options.apply);

  console.log('Semantic Cluster Promotion');
  console.log('==========================');
  console.log(`Mode: ${options.apply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`Service: ${finalDraft.service}`);
  console.log(`Target: ${finalDraft.target}`);
  console.log(`Cluster file: ${path.relative(process.cwd(), result.clusterFile)}`);
  console.log(`Primary keyword: ${result.primaryKeyword}`);
  console.log(`Secondary keywords: ${result.secondaryCount}`);
  console.log(`Long-tail keywords: ${result.longTailCount}`);
  console.log(options.apply ? '\nProduction cluster updated.' : '\nNo files were modified. Add --apply to write changes.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nPromotion failed: ${error.message}\n`);
  process.exit(1);
}
