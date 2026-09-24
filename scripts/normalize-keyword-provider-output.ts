#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Normalize Keyword Provider Output
 *
 * Converts .tmp/keyword-providers/* results into the Ahrefs-like shape already
 * understood by scripts/classify-ahrefs-keywords.ts.
 */

const fs = require('fs');
const path = require('path');

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function showHelp(): void {
  console.log('Normalize Keyword Provider Output');
  console.log('=================================\n');
  console.log('USAGE:');
  console.log('  npm run normalize:keywords -- --input .tmp/keyword-providers/dataforseo/file.json\n');
  console.log('OUTPUT:');
  console.log('  .tmp/ahrefs/{timestamp}-{provider}-{seed}.json');
  console.log('  This output is Ahrefs-like only for classifier compatibility.');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 70);
}

function readJson(filePath: string): any {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeDataForSeoRaw(data: any): any[] {
  const taskGet = data.raw?.taskGet || data.raw;
  const tasks = Array.isArray(taskGet?.tasks) ? taskGet.tasks : [];
  return tasks.flatMap((task: any) => {
    const results = Array.isArray(task?.result) ? task.result : [];
    return results.flatMap((result: any) => {
      if (Array.isArray(result?.items)) return result.items;
      return result?.keyword ? [result] : [];
    });
  }).map((item: any) => ({
    keyword: String(item?.keyword || '').trim(),
    source: data.source || 'dataforseo',
    volume: item?.search_volume ?? null,
    difficulty: item?.keyword_difficulty ?? null,
    cpc: item?.cpc ?? null,
    competition: item?.competition_index ?? item?.competition ?? null,
    trafficPotential: null,
  })).filter((item: any) => item.keyword);
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const input = getArg(args, '--input');
  if (!input) throw new Error('--input is required.');

  const data = readJson(input);
  let keywords = Array.isArray(data.keywords) ? data.keywords : [];
  if (data.raw?.dryRun) {
    throw new Error('Input is a dry-run provider result. Run provider collection with --execute before normalizing.');
  }
  if (keywords.length === 0 && data.source === 'dataforseo') {
    keywords = normalizeDataForSeoRaw(data);
  }
  if (keywords.length === 0) {
    throw new Error('Input has no keywords to normalize.');
  }

  const normalized = {
    source: data.source || 'keyword-provider',
    seed: data.seed,
    country: data.country || 'es',
    limit: data.limit || keywords.length,
    fetchedAt: data.fetchedAt || new Date().toISOString(),
    endpoint: data.endpoint || 'keyword-provider',
    providerInput: input,
    raw: {
      keywords: keywords.map((item: any) => ({
        keyword: item.keyword,
        volume: item.volume ?? null,
        difficulty: item.difficulty ?? null,
        cpc: item.cpc ?? null,
        traffic_potential: item.trafficPotential ?? null,
        competition: item.competition ?? null,
        source: item.source,
      })),
    },
  };

  const outDir = path.join(process.cwd(), '.tmp', 'ahrefs');
  fs.mkdirSync(outDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '-').slice(0, 19);
  const outPath = path.join(outDir, `${timestamp}-${slugify(data.source || 'provider')}-${slugify(data.seed || 'keywords')}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');

  console.log('Normalize Summary');
  console.log('=================');
  console.log(`Input: ${input}`);
  console.log(`Keywords: ${keywords.length}`);
  console.log(`Saved: ${path.relative(process.cwd(), outPath)}`);
  console.log('No production files were modified.');
}

try {
  main();
} catch (error: any) {
  console.error(`Normalize failed: ${error.message}`);
  process.exit(1);
}
