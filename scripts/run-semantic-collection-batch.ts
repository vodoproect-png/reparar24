const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

type BatchPhase = 'hub' | 'child' | 'city' | 'missing-district' | 'district' | 'blocked' | 'all';

type PlanItem = {
  path: string;
  kind: string;
  priority: string;
  primarySeed: string;
  secondarySeeds: string[];
  ahrefsLimit: number;
  semanticContentExists: boolean;
  productionContentExists: boolean;
  routeExists: boolean;
};

type BatchOptions = {
  phase: BatchPhase;
  max: number;
  execute: boolean;
  includeSecondary: boolean;
  rerunExisting: boolean;
  timeoutMs: number;
};

const PLAN_PATH = path.join(
  process.cwd(),
  '.tmp',
  'semantic-collection',
  'electricista-semantic-collection-plan.json'
);
const AHREFS_DIR = path.join(process.cwd(), '.tmp', 'ahrefs');
const REVIEW_DIR = path.join(process.cwd(), '.tmp', 'semantic-review');
const OUT_DIR = path.join(process.cwd(), '.tmp', 'semantic-collection', 'batches');

function showHelp(): void {
  console.log('Semantic Collection Batch Runner');
  console.log('================================\n');
  console.log('USAGE:');
  console.log('  npm run collect:semantic -- --phase child --max 4');
  console.log('  npm run collect:semantic -- --phase child --max 1 --execute\n');
  console.log('OPTIONS:');
  console.log('  --phase <phase>        hub | child | city | missing-district | district | blocked | all');
  console.log('  --max <n>              Max primary seeds to process/show (default: 5)');
  console.log('  --include-secondary    Include secondary seeds after primary seeds');
  console.log('  --rerun-existing       Include seeds that already have .tmp/ahrefs exports');
  console.log('  --timeout-ms <n>       Per import timeout in ms (default: 60000)');
  console.log('  --execute              Actually call Ahrefs importer and classifier');
  console.log('  --help                 Show this help\n');
  console.log('DEFAULT: preview only. No API calls unless --execute is present.');
}

function parseArgs(): BatchOptions | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const phaseIndex = args.indexOf('--phase');
  const maxIndex = args.indexOf('--max');
  const timeoutIndex = args.indexOf('--timeout-ms');
  const phase = (phaseIndex >= 0 ? args[phaseIndex + 1] : 'child') as BatchPhase;
  const validPhases = new Set(['hub', 'child', 'city', 'missing-district', 'district', 'blocked', 'all']);

  if (!validPhases.has(phase)) {
    throw new Error(`Invalid --phase "${phase}". Use --help for options.`);
  }

  const max = maxIndex >= 0 ? Number(args[maxIndex + 1]) : 5;
  if (!Number.isFinite(max) || max < 1) {
    throw new Error('--max must be a positive number.');
  }

  const timeoutMs = timeoutIndex >= 0 ? Number(args[timeoutIndex + 1]) : 60000;
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1000) {
    throw new Error('--timeout-ms must be at least 1000.');
  }

  return {
    phase,
    max,
    execute: args.includes('--execute'),
    includeSecondary: args.includes('--include-secondary'),
    rerunExisting: args.includes('--rerun-existing'),
    timeoutMs,
  };
}

function readPlan(): PlanItem[] {
  if (!fs.existsSync(PLAN_PATH)) {
    throw new Error('Semantic collection plan not found. Run npm run plan:semantic-collection first.');
  }

  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
  return plan.items;
}

function itemMatchesPhase(item: PlanItem, phase: BatchPhase): boolean {
  if (item.ahrefsLimit <= 0) return false;
  if (phase === 'all') return item.routeExists && item.priority !== 'done-pilot';
  if (phase === 'hub') return item.kind === 'hub';
  if (phase === 'child') return item.kind === 'child' && item.priority !== 'done-pilot';
  if (phase === 'city') return item.kind === 'city';
  if (phase === 'missing-district') return item.kind === 'district' && !item.productionContentExists;
  if (phase === 'district') return item.kind === 'district' && item.productionContentExists;
  if (phase === 'blocked') return item.priority === 'blocked-reconcile';
  return false;
}

function getLatestJsonFile(dir: string, beforeMs = 0): string | null {
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      return {
        fullPath,
        mtime: fs.statSync(fullPath).mtimeMs,
      };
    })
    .filter((entry: any) => entry.mtime >= beforeMs)
    .sort((a: any, b: any) => b.mtime - a.mtime);

  return files[0]?.fullPath ?? null;
}

function slugifySeed(seed: string): string {
  return seed
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 50);
}

function hasExistingAhrefsExport(seed: string): boolean {
  if (!fs.existsSync(AHREFS_DIR)) return false;

  const seedSlug = slugifySeed(seed);
  return fs.readdirSync(AHREFS_DIR).some((file: string) =>
    file.endsWith('.json') && file.includes(seedSlug)
  );
}

function buildSeedRows(items: PlanItem[], options: BatchOptions) {
  return items.flatMap((item) => {
    const primary = {
      pagePath: item.path,
      kind: item.kind,
      seedType: 'primary',
      seed: item.primarySeed,
      limit: item.ahrefsLimit,
    };

    if (!options.includeSecondary) return [primary];

    return [
      primary,
      ...item.secondarySeeds.map((seed) => ({
        pagePath: item.path,
        kind: item.kind,
        seedType: 'secondary',
        seed,
        limit: Math.min(item.ahrefsLimit, 30),
      })),
    ];
  }).filter((row: any) => options.rerunExisting || !hasExistingAhrefsExport(row.seed))
    .slice(0, options.max);
}

function runCommand(command: string, args: string[], timeoutMs: number) {
  const tsNodePath = path.join(process.cwd(), 'node_modules', 'ts-node', 'dist', 'bin.js');
  const resolvedCommand = command === 'ts-node' ? process.execPath : command;
  const resolvedArgs = command === 'ts-node' ? [tsNodePath, ...args] : args;

  return spawnSync(resolvedCommand, resolvedArgs, {
    cwd: process.cwd(),
    encoding: 'utf8',
    timeout: timeoutMs,
    shell: false,
  });
}

function executeSeed(row: any, timeoutMs: number) {
  const beforeImport = Date.now();
  const importResult = runCommand(
    'ts-node',
    ['scripts/import-ahrefs-keywords.ts', '--seed', row.seed, '--limit', String(row.limit), '--dry-run'],
    timeoutMs
  );

  const importTimedOut = Boolean(importResult.error && importResult.error.code === 'ETIMEDOUT');
  const ahrefsPath = getLatestJsonFile(AHREFS_DIR, beforeImport);
  let classifyResult: any = null;
  let reviewPath: string | null = null;

  if (importResult.status === 0 && ahrefsPath) {
    const beforeClassify = Date.now();
    classifyResult = runCommand(
      'ts-node',
      ['scripts/classify-ahrefs-keywords.ts', '--input', ahrefsPath, '--service', 'electricista'],
      timeoutMs
    );
    reviewPath = getLatestJsonFile(REVIEW_DIR, beforeClassify);
  }

  return {
    ...row,
    importExitCode: importResult.status,
    importTimedOut,
    importError: importResult.error?.message ?? null,
    importLastOutput: [importResult.stdout, importResult.stderr].filter(Boolean).join('\n').slice(-2000),
    ahrefsPath: ahrefsPath ? path.relative(process.cwd(), ahrefsPath) : null,
    classifyExitCode: classifyResult?.status ?? null,
    classifyError: classifyResult?.error?.message ?? null,
    classifyLastOutput: classifyResult
      ? [classifyResult.stdout, classifyResult.stderr].filter(Boolean).join('\n').slice(-2000)
      : null,
    reviewPath: reviewPath ? path.relative(process.cwd(), reviewPath) : null,
  };
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const items = readPlan().filter((item) => itemMatchesPhase(item, options.phase));
  const seedRows = buildSeedRows(items, options);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const result = {
    source: 'semantic-collection-batch',
    generatedAt: new Date().toISOString(),
    service: 'electricista',
    mode: options.execute ? 'execute' : 'preview',
    options,
    count: seedRows.length,
    seeds: seedRows,
    results: [] as any[],
  };

  if (!options.execute) {
    const previewPath = path.join(OUT_DIR, `preview-${options.phase}.json`);
    fs.writeFileSync(previewPath, `${JSON.stringify(result, null, 2)}\n`);

    console.log('Semantic collection batch preview');
    console.log('=================================');
    console.log(`Phase: ${options.phase}`);
    console.log(`Seeds: ${seedRows.length}`);
    seedRows.forEach((row, index) => {
      console.log(`${index + 1}. [${row.kind}/${row.seedType}] ${row.seed} -> ${row.pagePath} (limit ${row.limit})`);
    });
    console.log(`\nPreview saved to: ${path.relative(process.cwd(), previewPath)}`);
    console.log('No API calls were made. Add --execute to run this batch.');
    return;
  }

  console.log('Semantic collection batch EXECUTE');
  console.log('=================================');
  console.log(`Phase: ${options.phase}`);
  console.log(`Seeds: ${seedRows.length}`);
  console.log(`Timeout per command: ${options.timeoutMs}ms\n`);

  for (const [index, row] of seedRows.entries()) {
    console.log(`${index + 1}/${seedRows.length}: ${row.seed}`);
    const seedResult = executeSeed(row, options.timeoutMs);
    result.results.push(seedResult);

    if (seedResult.importTimedOut) {
      console.log('  Import timed out. Stopping batch.');
      break;
    }

    console.log(`  import exit: ${seedResult.importExitCode}`);
    console.log(`  classify exit: ${seedResult.classifyExitCode}`);
    console.log(`  ahrefs: ${seedResult.ahrefsPath ?? 'none'}`);
    console.log(`  review: ${seedResult.reviewPath ?? 'none'}`);

    if (seedResult.importExitCode !== 0 || seedResult.classifyExitCode !== 0) {
      console.log('  Non-zero exit detected. Stopping batch.');
      break;
    }
  }

  const outputPath = path.join(OUT_DIR, `execute-${options.phase}-${Date.now()}.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`\nBatch result saved to: ${path.relative(process.cwd(), outputPath)}`);
}

try {
  main();
} catch (error: any) {
  console.error(`\nBatch failed: ${error.message}\n`);
  process.exit(1);
}
