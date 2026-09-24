#!/usr/bin/env ts-node
/**
 * Ahrefs Seed Queue Collector (SAFE REVIEW MODE)
 *
 * PURPOSE:
 * Runs Ahrefs imports/classification from a seed queue with delay, retry and
 * resumable checkpoints. This is for larger semantic collection runs where the
 * API may return 429/timeouts.
 *
 * SAFETY:
 * - Does NOT modify data/seo
 * - Does NOT modify page-registry
 * - Does NOT create routes/pages
 * - Writes only to .tmp/ahrefs, .tmp/semantic-review and .tmp/semantic-collection
 * - Requires --execute for API calls
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

type QueueOptions = {
  service: string;
  limit: number;
  execute: boolean;
  seedsFile?: string;
  fromFailed?: string;
  delayMs: number;
  retryDelayMs: number;
  maxRetries: number;
  timeoutMs: number;
  maxSeeds?: number;
  rerunExisting: boolean;
};

type QueueSeed = {
  seed: string;
  requestedLimit: number;
};

type QueueResult = {
  seed: string;
  requestedLimit: number;
  attempts: number;
  status: 'success' | 'failed' | 'skipped-existing' | 'skipped-manifest' | 'preview';
  importExitCode: number | null;
  classifyExitCode: number | null;
  ahrefsPath: string | null;
  reviewPath: string | null;
  errorKind: string | null;
  lastOutput: string | null;
};

const AHREFS_DIR = path.join(process.cwd(), '.tmp', 'ahrefs');
const REVIEW_DIR = path.join(process.cwd(), '.tmp', 'semantic-review');
const OUT_DIR = path.join(process.cwd(), '.tmp', 'semantic-collection', 'ahrefs-queues');
const MANIFEST_PATH = path.join(process.cwd(), '.tmp', 'semantic-collection', 'ahrefs-collected-manifest.json');

function showHelp(): void {
  console.log('Ahrefs Seed Queue Collector');
  console.log('===========================\n');
  console.log('USAGE:');
  console.log('  npm run collect:ahrefs:queue -- --from-failed .tmp/path/results.json');
  console.log('  npm run collect:ahrefs:queue -- --seeds-file .tmp/path/seeds.json --execute\n');
  console.log('OPTIONS:');
  console.log('  --execute                 Actually call Ahrefs importer');
  console.log('  --service <name>          Service context, default: electricista');
  console.log('  --limit <n>               Default Ahrefs limit per seed, default: 50');
  console.log('  --seeds-file <path>       JSON array of seeds or { seeds: [...] }');
  console.log('  --from-failed <path>      Retry failed seeds from previous queue/import results JSON');
  console.log('  --delay-ms <n>            Delay between successful seeds, default: 60000');
  console.log('  --retry-delay-ms <n>      Delay before retry on retryable errors, default: 300000');
  console.log('  --max-retries <n>         Retries per seed after first attempt, default: 2');
  console.log('  --timeout-ms <n>          Per command timeout, default: 90000');
  console.log('  --max-seeds <n>           Process at most N seeds');
  console.log('  --rerun-existing          Do not skip seeds with existing .tmp/ahrefs exports');
  console.log('  --help                    Show help\n');
  console.log('DEFAULT: preview only. No API calls unless --execute is present.');
}

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function parseNumber(value: string | undefined, fallback: number, label: string): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative number.`);
  }
  return parsed;
}

function parseArgs(): QueueOptions | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const seedsFile = getArg(args, '--seeds-file');
  const fromFailed = getArg(args, '--from-failed');

  if (!seedsFile && !fromFailed) {
    throw new Error('Provide --seeds-file or --from-failed. Use --help for examples.');
  }

  const maxSeedsRaw = getArg(args, '--max-seeds');
  const maxSeeds = maxSeedsRaw ? Number(maxSeedsRaw) : undefined;
  if (maxSeeds !== undefined && (!Number.isFinite(maxSeeds) || maxSeeds < 1)) {
    throw new Error('--max-seeds must be a positive number.');
  }

  return {
    service: getArg(args, '--service') || 'electricista',
    limit: parseNumber(getArg(args, '--limit'), 50, '--limit'),
    execute: args.includes('--execute'),
    seedsFile,
    fromFailed,
    delayMs: parseNumber(getArg(args, '--delay-ms'), 60000, '--delay-ms'),
    retryDelayMs: parseNumber(getArg(args, '--retry-delay-ms'), 300000, '--retry-delay-ms'),
    maxRetries: parseNumber(getArg(args, '--max-retries'), 2, '--max-retries'),
    timeoutMs: parseNumber(getArg(args, '--timeout-ms'), 90000, '--timeout-ms'),
    maxSeeds,
    rerunExisting: args.includes('--rerun-existing'),
  };
}

function readJson(filePath: string): any {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeSeed(seed: any, defaultLimit: number): QueueSeed | null {
  if (typeof seed === 'string') {
    return { seed, requestedLimit: defaultLimit };
  }

  if (seed && typeof seed.seed === 'string') {
    return {
      seed: seed.seed,
      requestedLimit: Number(seed.requestedLimit || seed.limit || defaultLimit),
    };
  }

  return null;
}

function readSeeds(options: QueueOptions): QueueSeed[] {
  const seeds: QueueSeed[] = [];

  if (options.seedsFile) {
    const data = readJson(options.seedsFile);
    const rawSeeds = Array.isArray(data) ? data : data.seeds || data.results || [];
    for (const item of rawSeeds) {
      const normalized = normalizeSeed(item, options.limit);
      if (normalized) seeds.push(normalized);
    }
  }

  if (options.fromFailed) {
    const data = readJson(options.fromFailed);
    const rawResults = data.results || [];
    for (const item of rawResults) {
      const failed = item.importExitCode !== 0 || item.classifyExitCode !== 0 || item.status === 'failed';
      if (!failed) continue;
      const normalized = normalizeSeed(item, Number(item.requestedLimit || options.limit));
      if (normalized) seeds.push(normalized);
    }
  }

  const unique = new Map<string, QueueSeed>();
  for (const item of seeds) {
    const key = item.seed.toLowerCase().trim();
    if (!key) continue;
    if (!unique.has(key)) unique.set(key, item);
  }

  const deduped = Array.from(unique.values());
  return options.maxSeeds ? deduped.slice(0, options.maxSeeds) : deduped;
}

function slugifySeed(seed: string): string {
  return normalizeSeedKey(seed)
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

function normalizeSeedKey(seed: string): string {
  return seed
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readManifest(): any {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return {
      source: 'ahrefs-collected-manifest',
      generatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seeds: {},
    };
  }

  return readJson(MANIFEST_PATH);
}

function writeManifest(manifest: any): void {
  ensureDir(path.dirname(MANIFEST_PATH));
  manifest.updatedAt = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function findExistingAhrefsExport(seed: string): string | null {
  if (!fs.existsSync(AHREFS_DIR)) return null;
  const seedSlug = slugifySeed(seed);
  const files = fs.readdirSync(AHREFS_DIR)
    .filter((file: string) => file.endsWith('.json') && file.includes(seedSlug))
    .map((file: string) => path.join(AHREFS_DIR, file))
    .sort((a: string, b: string) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0] ? path.relative(process.cwd(), files[0]) : null;
}

function getManifestEntry(seed: string): any | null {
  const manifest = readManifest();
  const key = normalizeSeedKey(seed);
  return manifest.seeds?.[key] || null;
}

function recordCollectedSeed(seed: QueueSeed, ahrefsPath: string | null, reviewPath: string | null): void {
  const manifest = readManifest();
  const key = normalizeSeedKey(seed.seed);
  manifest.seeds[key] = {
    seed: seed.seed,
    normalizedSeed: key,
    requestedLimit: seed.requestedLimit,
    ahrefsPath,
    reviewPath,
    collectedAt: new Date().toISOString(),
  };
  writeManifest(manifest);
}

function getLatestJsonFile(dir: string, sinceMs: number): string | null {
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .filter((entry: any) => entry.mtime >= sinceMs)
    .sort((a: any, b: any) => b.mtime - a.mtime);

  return files[0]?.fullPath || null;
}

function runTsNode(args: string[], timeoutMs: number): any {
  const tsNodePath = path.join(process.cwd(), 'node_modules', 'ts-node', 'dist', 'bin.js');
  return spawnSync(process.execPath, [tsNodePath, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: timeoutMs,
    shell: false,
  });
}

function detectErrorKind(output: string, errorMessage?: string): string | null {
  const text = `${output}\n${errorMessage || ''}`.toLowerCase();
  if (text.includes('429') || text.includes('rate limit')) return 'rate-limit';
  if (text.includes('timeout') || text.includes('etimedout')) return 'timeout';
  if (text.includes('403')) return 'forbidden';
  if (text.includes('401')) return 'auth';
  if (text.includes('network error')) return 'network';
  return null;
}

function isRetryable(kind: string | null): boolean {
  return kind === 'rate-limit' || kind === 'timeout' || kind === 'network';
}

function sleep(ms: number): void {
  if (ms <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeCheckpoint(outputPath: string, data: any): void {
  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function executeSeed(seed: QueueSeed, options: QueueOptions): QueueResult {
  if (!options.rerunExisting) {
    const manifestEntry = getManifestEntry(seed.seed);
    if (manifestEntry) {
      return {
        seed: seed.seed,
        requestedLimit: seed.requestedLimit,
        attempts: 0,
        status: 'skipped-manifest',
        importExitCode: null,
        classifyExitCode: null,
        ahrefsPath: manifestEntry.ahrefsPath || null,
        reviewPath: manifestEntry.reviewPath || null,
        errorKind: null,
        lastOutput: `Seed already collected in manifest: ${path.relative(process.cwd(), MANIFEST_PATH)}`,
      };
    }

    const existingExport = findExistingAhrefsExport(seed.seed);
    if (existingExport) {
      recordCollectedSeed(seed, existingExport, null);
      return {
        seed: seed.seed,
        requestedLimit: seed.requestedLimit,
        attempts: 0,
        status: 'skipped-existing',
        importExitCode: null,
        classifyExitCode: null,
        ahrefsPath: existingExport,
        reviewPath: null,
        errorKind: null,
        lastOutput: 'Existing .tmp/ahrefs export found and recorded in manifest. Use --rerun-existing to force.',
      };
    }
  }

  let lastResult: QueueResult | null = null;

  for (let attempt = 1; attempt <= options.maxRetries + 1; attempt += 1) {
    const beforeImport = Date.now();
    const importResult = runTsNode(
      ['scripts/import-ahrefs-keywords.ts', '--seed', seed.seed, '--limit', String(seed.requestedLimit), '--dry-run'],
      options.timeoutMs
    );
    const importOutput = [importResult.stdout, importResult.stderr].filter(Boolean).join('\n');
    const ahrefsPath = getLatestJsonFile(AHREFS_DIR, beforeImport);
    const errorKind = detectErrorKind(importOutput, importResult.error?.message);

    let classifyResult: any = null;
    let reviewPath: string | null = null;

    if (importResult.status === 0 && ahrefsPath) {
      const beforeClassify = Date.now();
      classifyResult = runTsNode(
        ['scripts/classify-ahrefs-keywords.ts', '--input', ahrefsPath, '--service', options.service],
        options.timeoutMs
      );
      reviewPath = getLatestJsonFile(REVIEW_DIR, beforeClassify);
    }

    const classifyOutput = classifyResult
      ? [classifyResult.stdout, classifyResult.stderr].filter(Boolean).join('\n')
      : '';
    const classifyErrorKind = classifyResult
      ? detectErrorKind(classifyOutput, classifyResult.error?.message)
      : null;
    const finalErrorKind = errorKind || classifyErrorKind;
    const success = importResult.status === 0 && (!classifyResult || classifyResult.status === 0);
    const relativeAhrefsPath = ahrefsPath ? path.relative(process.cwd(), ahrefsPath) : null;
    const relativeReviewPath = reviewPath ? path.relative(process.cwd(), reviewPath) : null;

    lastResult = {
      seed: seed.seed,
      requestedLimit: seed.requestedLimit,
      attempts: attempt,
      status: success ? 'success' : 'failed',
      importExitCode: importResult.status,
      classifyExitCode: classifyResult?.status ?? null,
      ahrefsPath: relativeAhrefsPath,
      reviewPath: relativeReviewPath,
      errorKind: finalErrorKind,
      lastOutput: [importOutput, classifyOutput].filter(Boolean).join('\n').slice(-2000) || null,
    };

    if (success) {
      recordCollectedSeed(seed, relativeAhrefsPath, relativeReviewPath);
      return lastResult;
    }
    if (!isRetryable(finalErrorKind) || attempt > options.maxRetries) return lastResult;

    console.log(`Retryable ${finalErrorKind} for "${seed.seed}". Waiting ${options.retryDelayMs}ms before retry ${attempt + 1}.`);
    sleep(options.retryDelayMs);
  }

  return lastResult as QueueResult;
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  ensureDir(OUT_DIR);
  const seeds = readSeeds(options);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = path.join(OUT_DIR, `${timestamp}-${options.service}-queue.json`);

  const state = {
    source: 'ahrefs-seed-queue',
    generatedAt: new Date().toISOString(),
    service: options.service,
    mode: options.execute ? 'execute' : 'preview',
    options,
    count: seeds.length,
    seeds,
    results: [] as QueueResult[],
  };

  if (!options.execute) {
    state.results = seeds.map((seed) => ({
      seed: seed.seed,
      requestedLimit: seed.requestedLimit,
      attempts: 0,
      status: 'preview',
      importExitCode: null,
      classifyExitCode: null,
      ahrefsPath: null,
      reviewPath: null,
      errorKind: null,
      lastOutput: null,
    }));
    writeCheckpoint(outputPath, state);
    console.log(`Preview seeds: ${seeds.length}`);
    console.log(`Saved preview to: ${path.relative(process.cwd(), outputPath)}`);
    return;
  }

  console.log(`Ahrefs queue started. Seeds: ${seeds.length}`);
  console.log(`Checkpoint: ${path.relative(process.cwd(), outputPath)}`);

  seeds.forEach((seed, index) => {
    console.log(`[${index + 1}/${seeds.length}] ${seed.seed}`);
    const result = executeSeed(seed, options);
    state.results.push(result);
    writeCheckpoint(outputPath, state);
    console.log(`  -> ${result.status} attempts=${result.attempts} error=${result.errorKind || 'none'}`);

    if (index < seeds.length - 1) {
      sleep(options.delayMs);
    }
  });

  const success = state.results.filter((item) => item.status === 'success').length;
  const skipped = state.results.filter((item) => item.status === 'skipped-existing').length;
  const skippedManifest = state.results.filter((item) => item.status === 'skipped-manifest').length;
  const failed = state.results.filter((item) => item.status === 'failed').length;

  console.log('\nQueue Summary');
  console.log('=============');
  console.log(`Success: ${success}`);
  console.log(`Skipped existing: ${skipped}`);
  console.log(`Skipped manifest: ${skippedManifest}`);
  console.log(`Failed: ${failed}`);
  console.log(`Saved to: ${path.relative(process.cwd(), outputPath)}`);
}

try {
  main();
} catch (error: any) {
  console.error(`\nQueue failed: ${error.message}\n`);
  process.exit(1);
}
