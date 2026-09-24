#!/usr/bin/env ts-node
/**
 * Ahrefs Background Collector (SAFE AUTONOMOUS MODE)
 *
 * Runs the existing Ahrefs queue collector in small batches while the computer
 * is awake. Intended for VS Code task / folder-open usage.
 *
 * SAFETY:
 * - Does NOT modify production data, routes, sitemap or page-registry
 * - Writes only to .tmp/ahrefs, .tmp/semantic-review and .tmp/semantic-collection
 * - Requires --execute for API calls
 * - Uses per-run seed budget and pause intervals to avoid burning API quota
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

type SeedInput = string | { seed: string; requestedLimit?: number; limit?: number };

type BackgroundOptions = {
  service: string;
  seedsFile: string;
  execute: boolean;
  once: boolean;
  limit: number;
  maxSeedsPerCycle: number;
  maxSeedsPerRun: number;
  delayMs: number;
  retryDelayMs: number;
  intervalMinutes: number;
  maxRetries: number;
  timeoutMs: number;
  rerunExisting: boolean;
};

type BackgroundState = {
  source: 'ahrefs-background-collector';
  service: string;
  seedsFile: string;
  cursor: number;
  daily?: {
    date: string;
    processedSeeds: number;
  };
  cycles: number;
  startedAt: string;
  updatedAt: string;
  lastBatchPath: string | null;
  history: Array<{
    at: string;
    batchPath: string;
    queueExitCode: number | null;
    seeds: string[];
    success: number;
    skippedExisting: number;
    failed: number;
  }>;
};

const OUT_DIR = path.join(process.cwd(), '.tmp', 'semantic-collection', 'ahrefs-background');
const QUEUE_OUT_DIR = path.join(process.cwd(), '.tmp', 'semantic-collection', 'ahrefs-queues');
const DEFAULT_SEEDS_FILE = 'scripts/ahrefs-electricista-seeds.json';
const STATE_FILE = path.join(OUT_DIR, 'state.json');
const LOG_FILE = path.join(OUT_DIR, 'collector.log');

function showHelp(): void {
  console.log('Ahrefs Background Collector');
  console.log('===========================\n');
  console.log('USAGE:');
  console.log('  npm run collect:ahrefs:background -- --execute');
  console.log('  npm run collect:ahrefs:background -- --once --execute --max-seeds-per-cycle 1\n');
  console.log('OPTIONS:');
  console.log('  --execute                 Actually call Ahrefs. Without it, preview only');
  console.log('  --once                    Run one cycle and exit');
  console.log('  --service <name>          Default: electricista');
  console.log('  --seeds-file <path>       Default: scripts/ahrefs-electricista-seeds.json');
  console.log('  --limit <n>               Ahrefs limit per seed, default: 300');
  console.log('  --max-seeds-per-cycle <n> Seeds per cycle, default: 3');
  console.log('  --max-seeds-per-run <n>   Session seed budget, default: 40');
  console.log('  --daily-max-seeds <n>     Deprecated alias for --max-seeds-per-run');
  console.log('  --delay-ms <n>            Delay between seeds inside queue, default: 45000');
  console.log('  --retry-delay-ms <n>      Retry delay, default: 300000');
  console.log('  --interval-minutes <n>    Pause between cycles, default: 20');
  console.log('  --max-retries <n>         Retries per seed, default: 2');
  console.log('  --timeout-ms <n>          Per command timeout, default: 120000');
  console.log('  --rerun-existing          Force rerun seeds with existing exports');
  console.log('  --reset-state             Remove .tmp background state and exit');
  console.log('  --help                    Show help\n');
  console.log('This script only collects raw/review data in .tmp. It never promotes pages.');
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

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function sleep(ms: number): void {
  if (ms <= 0) return;
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function log(message: string): void {
  ensureDir(OUT_DIR);
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, `${line}\n`, 'utf8');
}

function readJson(filePath: string): any {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalizeSeed(input: SeedInput, defaultLimit: number): { seed: string; requestedLimit: number } | null {
  if (typeof input === 'string') {
    const seed = input.trim();
    return seed ? { seed, requestedLimit: defaultLimit } : null;
  }

  if (input && typeof input.seed === 'string') {
    const seed = input.seed.trim();
    if (!seed) return null;
    return {
      seed,
      requestedLimit: Number(input.requestedLimit || input.limit || defaultLimit),
    };
  }

  return null;
}

function readSeeds(options: BackgroundOptions): Array<{ seed: string; requestedLimit: number }> {
  const data = readJson(options.seedsFile);
  const rawSeeds = Array.isArray(data) ? data : data.seeds || [];
  const unique = new Map<string, { seed: string; requestedLimit: number }>();

  for (const item of rawSeeds) {
    const normalized = normalizeSeed(item, options.limit);
    if (!normalized) continue;
    const key = normalized.seed.toLowerCase();
    if (!unique.has(key)) unique.set(key, normalized);
  }

  return Array.from(unique.values());
}

function defaultState(options: BackgroundOptions): BackgroundState {
  return {
    source: 'ahrefs-background-collector',
    service: options.service,
    seedsFile: options.seedsFile,
    cursor: 0,
    daily: {
      date: today(),
      processedSeeds: 0,
    },
    cycles: 0,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastBatchPath: null,
    history: [],
  };
}

function readState(options: BackgroundOptions): BackgroundState {
  ensureDir(OUT_DIR);
  if (!fs.existsSync(STATE_FILE)) return defaultState(options);

  const state = readJson(STATE_FILE) as BackgroundState;
  if (state.seedsFile !== options.seedsFile || state.service !== options.service) {
    state.cursor = 0;
    state.service = options.service;
    state.seedsFile = options.seedsFile;
  }
  return state;
}

function writeState(state: BackgroundState): void {
  state.updatedAt = new Date().toISOString();
  state.history = state.history.slice(-100);
  fs.writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

function nextBatch(
  seeds: Array<{ seed: string; requestedLimit: number }>,
  state: BackgroundState,
  options: BackgroundOptions,
  processedThisRun: number
): Array<{ seed: string; requestedLimit: number }> {
  const remainingThisRun = Math.max(0, options.maxSeedsPerRun - processedThisRun);
  const batchSize = Math.min(options.maxSeedsPerCycle, remainingThisRun);
  if (batchSize <= 0 || seeds.length === 0) return [];

  const batch: Array<{ seed: string; requestedLimit: number }> = [];
  for (let i = 0; i < batchSize; i += 1) {
    const index = state.cursor % seeds.length;
    batch.push(seeds[index]);
    state.cursor = (state.cursor + 1) % seeds.length;
  }
  return batch;
}

function writeBatchSeeds(batch: Array<{ seed: string; requestedLimit: number }>): string {
  ensureDir(OUT_DIR);
  const filePath = path.join(OUT_DIR, `${timestamp()}-batch-seeds.json`);
  fs.writeFileSync(filePath, `${JSON.stringify({ seeds: batch }, null, 2)}\n`, 'utf8');
  return filePath;
}

function getLatestQueueFile(sinceMs: number): string | null {
  if (!fs.existsSync(QUEUE_OUT_DIR)) return null;
  const files = fs.readdirSync(QUEUE_OUT_DIR)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(QUEUE_OUT_DIR, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .filter((entry: any) => entry.mtime >= sinceMs)
    .sort((a: any, b: any) => b.mtime - a.mtime);
  return files[0]?.fullPath || null;
}

function runQueue(batchPath: string, options: BackgroundOptions): {
  exitCode: number | null;
  queuePath: string | null;
  success: number;
  skippedExisting: number;
  failed: number;
  fatalErrorKind: string | null;
} {
  const tsNodePath = path.join(process.cwd(), 'node_modules', 'ts-node', 'dist', 'bin.js');
  const args = [
    'scripts/collect-ahrefs-seed-queue.ts',
    '--seeds-file',
    batchPath,
    '--service',
    options.service,
    '--limit',
    String(options.limit),
    '--delay-ms',
    String(options.delayMs),
    '--retry-delay-ms',
    String(options.retryDelayMs),
    '--max-retries',
    String(options.maxRetries),
    '--timeout-ms',
    String(options.timeoutMs),
    '--execute',
  ];

  if (options.rerunExisting) args.push('--rerun-existing');

  const before = Date.now();
  const result = spawnSync(process.execPath, [tsNodePath, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: Math.max(
      options.timeoutMs * (options.maxRetries + 1) * options.maxSeedsPerCycle +
        options.retryDelayMs * options.maxRetries * options.maxSeedsPerCycle +
        options.delayMs * Math.max(0, options.maxSeedsPerCycle - 1) +
        60000,
      options.timeoutMs
    ),
    shell: false,
  });

  const output = [result.stdout, result.stderr, result.error?.message].filter(Boolean).join('\n');
  fs.appendFileSync(LOG_FILE, `${output}\n`, 'utf8');

  const queuePath = getLatestQueueFile(before);
  if (!queuePath) {
    return { exitCode: result.status, queuePath: null, success: 0, skippedExisting: 0, failed: 1, fatalErrorKind: null };
  }

  const queue = readJson(queuePath);
  const results = Array.isArray(queue.results) ? queue.results : [];
  const fatalResult = results.find((item: any) => item.errorKind === 'auth' || item.errorKind === 'forbidden');
  return {
    exitCode: result.status,
    queuePath,
    success: results.filter((item: any) => item.status === 'success').length,
    skippedExisting: results.filter((item: any) => item.status === 'skipped-existing').length,
    failed: results.filter((item: any) => item.status === 'failed').length,
    fatalErrorKind: fatalResult?.errorKind || null,
  };
}

function parseArgs(): BackgroundOptions | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  ensureDir(OUT_DIR);
  if (args.includes('--reset-state')) {
    if (fs.existsSync(STATE_FILE)) fs.unlinkSync(STATE_FILE);
    console.log(`Removed ${path.relative(process.cwd(), STATE_FILE)}`);
    return null;
  }

  return {
    service: getArg(args, '--service') || 'electricista',
    seedsFile: getArg(args, '--seeds-file') || DEFAULT_SEEDS_FILE,
    execute: args.includes('--execute'),
    once: args.includes('--once'),
    limit: parseNumber(getArg(args, '--limit'), 300, '--limit'),
    maxSeedsPerCycle: parseNumber(getArg(args, '--max-seeds-per-cycle'), 3, '--max-seeds-per-cycle'),
    maxSeedsPerRun: parseNumber(
      getArg(args, '--max-seeds-per-run') || getArg(args, '--daily-max-seeds'),
      40,
      '--max-seeds-per-run'
    ),
    delayMs: parseNumber(getArg(args, '--delay-ms'), 45000, '--delay-ms'),
    retryDelayMs: parseNumber(getArg(args, '--retry-delay-ms'), 300000, '--retry-delay-ms'),
    intervalMinutes: parseNumber(getArg(args, '--interval-minutes'), 20, '--interval-minutes'),
    maxRetries: parseNumber(getArg(args, '--max-retries'), 2, '--max-retries'),
    timeoutMs: parseNumber(getArg(args, '--timeout-ms'), 120000, '--timeout-ms'),
    rerunExisting: args.includes('--rerun-existing'),
  };
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const seeds = readSeeds(options);
  if (!seeds.length) throw new Error(`No seeds found in ${options.seedsFile}`);

  const state = readState(options);

  if (!options.execute) {
    console.log('Preview only. Add --execute to call Ahrefs.');
    console.log(`Seeds loaded: ${seeds.length}`);
    console.log(`Next cursor: ${state.cursor}`);
    console.log(`Run budget: ${options.maxSeedsPerRun} seed(s)`);
    console.log(`State: ${path.relative(process.cwd(), STATE_FILE)}`);
    return;
  }

  log(`Background collector started. seeds=${seeds.length} service=${options.service} once=${options.once}`);

  let running = true;
  process.on('SIGINT', () => {
    running = false;
    log('SIGINT received. Finishing current cycle and exiting.');
  });

  let processedThisRun = 0;

  while (running) {
    const batch = nextBatch(seeds, state, options, processedThisRun);
    if (!batch.length) {
      log(`Run budget reached: ${processedThisRun}/${options.maxSeedsPerRun}. Stopping background collector.`);
      writeState(state);
      break;
    }

    const batchPath = writeBatchSeeds(batch);
    state.lastBatchPath = path.relative(process.cwd(), batchPath);
    state.cycles += 1;
    writeState(state);

    log(`Cycle ${state.cycles}: running ${batch.length} seed(s): ${batch.map((item) => item.seed).join(' | ')}`);
    const result = runQueue(batchPath, options);

    processedThisRun += batch.length;
    state.history.push({
      at: new Date().toISOString(),
      batchPath: path.relative(process.cwd(), batchPath),
      queueExitCode: result.exitCode,
      seeds: batch.map((item) => item.seed),
      success: result.success,
      skippedExisting: result.skippedExisting,
      failed: result.failed,
    });
    writeState(state);

    log(
      `Cycle ${state.cycles} done. success=${result.success} skipped=${result.skippedExisting} failed=${result.failed} queue=${result.queuePath ? path.relative(process.cwd(), result.queuePath) : 'none'}`
    );

    if (result.fatalErrorKind) {
      log(`Fatal Ahrefs error "${result.fatalErrorKind}" detected. Stopping background collector.`);
      break;
    }

    if (options.once) break;
    sleep(options.intervalMinutes * 60 * 1000);
  }

  log('Background collector stopped.');
}

try {
  main();
} catch (error: any) {
  console.error(`\nBackground collector failed: ${error.message}\n`);
  process.exit(1);
}
