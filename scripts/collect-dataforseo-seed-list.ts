#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * DataForSEO Seed List Collector
 *
 * Safe batch runner for provider-neutral keyword collection.
 * Writes only to .tmp/keyword-providers, .tmp/ahrefs and .tmp/semantic-collection.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

type Options = {
  seedsFile: string;
  execute: boolean;
  maxSeeds: number;
  pollMs: number;
  maxPolls: number;
  timeoutMs: number;
  force: boolean;
};

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function showHelp(): void {
  console.log('DataForSEO Seed List Collector');
  console.log('==============================\n');
  console.log('USAGE:');
  console.log('  ts-node scripts/collect-dataforseo-seed-list.ts --seeds-file scripts/dataforseo-fontanero-seeds.json');
  console.log('  ts-node scripts/collect-dataforseo-seed-list.ts --seeds-file scripts/dataforseo-fontanero-seeds.json --execute\n');
  console.log('OPTIONS:');
  console.log('  --seeds-file <path>  JSON seed list');
  console.log('  --max-seeds <n>      Max seeds to process, default all');
  console.log('  --execute            Call DataForSEO. Omit for preview.');
  console.log('  --force              Recollect even when duplicate protection would skip.');
  console.log('  --poll-ms <n>        Default 5000');
  console.log('  --max-polls <n>      Default 12');
  console.log('  --timeout-ms <n>     Per command timeout, default 120000');
}

function parseArgs(): Options | null {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const seedsFile = getArg(args, '--seeds-file');
  if (!seedsFile) throw new Error('--seeds-file is required.');

  const maxSeeds = Number(getArg(args, '--max-seeds') || Number.MAX_SAFE_INTEGER);
  if (!Number.isFinite(maxSeeds) || maxSeeds < 1) throw new Error('--max-seeds must be positive.');

  const pollMs = Number(getArg(args, '--poll-ms') || 5000);
  const maxPolls = Number(getArg(args, '--max-polls') || 12);
  const timeoutMs = Number(getArg(args, '--timeout-ms') || 120000);

  return {
    seedsFile,
    execute: args.includes('--execute'),
    maxSeeds,
    pollMs,
    maxPolls,
    timeoutMs,
    force: args.includes('--force'),
  };
}

function readJson(filePath: string): any {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, ''));
}

function flattenSeeds(seedList: any): any[] {
  return (seedList.groups || []).flatMap((group: any) =>
    (group.seeds || []).map((seed: string) => ({
      target: group.target,
      seed,
      limit: seedList.limit || 100,
      country: seedList.country || 'es',
      language: seedList.language || 'es',
    }))
  );
}

function latestJson(dir: string, beforeMs: number): string | null {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .filter((entry: any) => entry.mtime >= beforeMs)
    .sort((a: any, b: any) => b.mtime - a.mtime);
  return files[0]?.fullPath || null;
}

function runTsNode(args: string[], timeoutMs: number) {
  const tsNodePath = path.join(process.cwd(), 'node_modules', 'ts-node', 'dist', 'bin.js');
  return spawnSync(process.execPath, [tsNodePath, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: timeoutMs,
    shell: false,
  });
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const seedList = readJson(options.seedsFile);
  const rows = flattenSeeds(seedList).slice(0, options.maxSeeds);
  const providerDir = path.join(process.cwd(), '.tmp', 'keyword-providers', 'dataforseo');
  const ahrefsDir = path.join(process.cwd(), '.tmp', 'ahrefs');
  const outDir = path.join(process.cwd(), '.tmp', 'semantic-collection', 'dataforseo');
  fs.mkdirSync(outDir, { recursive: true });

  const summary = {
    source: 'dataforseo-seed-list-collector',
    generatedAt: new Date().toISOString(),
    mode: options.execute ? 'execute' : 'preview',
    seedsFile: options.seedsFile,
    service: seedList.service,
    count: rows.length,
    rows,
    results: [] as any[],
  };

  if (!options.execute) {
    const previewPath = path.join(outDir, `preview-${seedList.service || 'service'}-${Date.now()}.json`);
    fs.writeFileSync(previewPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
    console.log(`Preview seeds: ${rows.length}`);
    rows.forEach((row, index) => console.log(`${index + 1}. [${row.target}] ${row.seed} (limit ${row.limit})`));
    console.log(`Preview saved: ${path.relative(process.cwd(), previewPath)}`);
    return;
  }

  console.log(`Executing DataForSEO seed list. Seeds: ${rows.length}`);
  for (const [index, row] of rows.entries()) {
    console.log(`${index + 1}/${rows.length}: [${row.target}] ${row.seed}`);
    const beforeCollect = Date.now();
    const collectArgs = [
      'scripts/collect-keywords.ts',
      '--provider', 'dataforseo',
      '--seed', row.seed,
      '--country', row.country,
      '--language', row.language,
      '--limit', String(row.limit),
      '--execute',
      '--poll-ms', String(options.pollMs),
      '--max-polls', String(options.maxPolls),
    ];
    if (options.force) collectArgs.push('--force');

    const collect = runTsNode(collectArgs, options.timeoutMs);
    const providerPath = latestJson(providerDir, beforeCollect);
    let normalizedPath: string | null = null;
    let normalize: any = null;

    if (collect.status === 0 && providerPath) {
      const beforeNormalize = Date.now();
      normalize = runTsNode(
        ['scripts/normalize-keyword-provider-output.ts', '--input', providerPath],
        options.timeoutMs
      );
      normalizedPath = latestJson(ahrefsDir, beforeNormalize);
    }

    const collectOutput = [collect.stdout, collect.stderr].filter(Boolean).join('\n');
    const skippedDuplicate = collect.status === 0 && !providerPath && /Duplicate protection/i.test(collectOutput);

    const result = {
      ...row,
      collectExitCode: collect.status,
      skippedDuplicate,
      collectTimedOut: Boolean(collect.error && collect.error.code === 'ETIMEDOUT'),
      collectError: collect.error?.message ?? null,
      collectLastOutput: collectOutput.slice(-2000),
      providerPath: providerPath ? path.relative(process.cwd(), providerPath) : null,
      normalizeExitCode: normalize?.status ?? null,
      normalizeLastOutput: normalize ? [normalize.stdout, normalize.stderr].filter(Boolean).join('\n').slice(-2000) : null,
      normalizedPath: normalizedPath ? path.relative(process.cwd(), normalizedPath) : null,
    };
    summary.results.push(result);

    console.log(`  collect=${result.collectExitCode} normalize=${result.normalizeExitCode} provider=${result.providerPath || 'none'} normalized=${result.normalizedPath || 'none'}`);

    if (skippedDuplicate) {
      continue;
    }

    if (result.collectTimedOut || result.collectExitCode !== 0 || result.normalizeExitCode !== 0) {
      console.log('  Stopping batch after non-zero exit.');
      break;
    }
  }

  const outPath = path.join(outDir, `execute-${seedList.service || 'service'}-${Date.now()}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  console.log(`Batch saved: ${path.relative(process.cwd(), outPath)}`);
}

try {
  main();
} catch (error: any) {
  console.error(`Batch failed: ${error.message}`);
  process.exit(1);
}
