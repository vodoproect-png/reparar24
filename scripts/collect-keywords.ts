#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Unified Keyword Collector (SAFE REVIEW MODE)
 *
 * Adds a provider-neutral entrypoint for semantic collection.
 * Writes only to .tmp/keyword-providers and never modifies production data.
 */

const { getKeywordProvider, listKeywordProviders } = require('./keyword-providers');
const { findExistingProviderResult, saveProviderResult } = require('./keyword-providers/common');

type Options = {
  provider: string;
  seed: string;
  country: string;
  language: string;
  limit: number;
  execute: boolean;
  force: boolean;
  pollIntervalMs: number;
  maxPolls: number;
};

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function showHelp(): void {
  console.log('Unified Keyword Collector');
  console.log('=========================\n');
  console.log('USAGE:');
  console.log('  npm run collect:keywords -- --provider dataforseo --seed "videoportero valencia" --limit 100');
  console.log('  npm run collect:keywords -- --provider dataforseo --seed "videoportero valencia" --limit 100 --execute\n');
  console.log('OPTIONS:');
  console.log('  --provider <id>       dataforseo | google-ads');
  console.log('  --seed <keyword>      Seed keyword to collect');
  console.log('  --country <code>      Country context, default: es');
  console.log('  --language <code>     Language code, default: es');
  console.log('  --limit <n>           Max keywords, default: 100');
  console.log('  --execute             Call external provider. Omit for dry-run.');
  console.log('  --force               Ignore duplicate protection and collect again.');
  console.log('  --poll-ms <n>         DataForSEO queue poll interval, default: 10000.');
  console.log('  --max-polls <n>       DataForSEO queue poll attempts, default: 18.');
  console.log('  --providers           List provider setup status');
  console.log('  --help                Show help\n');
}

function listProviders(): void {
  console.log('Available keyword providers');
  console.log('===========================\n');
  for (const provider of listKeywordProviders()) {
    const missing = provider.requiredEnv.filter((name: string) => !process.env[name]);
    console.log(`${provider.id}: ${provider.label}`);
    console.log(`  requiredEnv: ${provider.requiredEnv.join(', ') || 'none'}`);
    console.log(`  status: ${missing.length ? `missing ${missing.join(', ')}` : 'configured'}`);
  }
}

function parseArgs(): Options | null {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  if (args.includes('--providers')) {
    listProviders();
    return null;
  }

  const provider = getArg(args, '--provider') || 'dataforseo';
  const seed = getArg(args, '--seed');
  if (!seed) throw new Error('--seed is required.');

  const limit = Number(getArg(args, '--limit') || 100);
  if (!Number.isFinite(limit) || limit < 1) throw new Error('--limit must be a positive number.');

  const pollIntervalMs = Number(getArg(args, '--poll-ms') || 10000);
  if (!Number.isFinite(pollIntervalMs) || pollIntervalMs < 1000) {
    throw new Error('--poll-ms must be at least 1000.');
  }

  const maxPolls = Number(getArg(args, '--max-polls') || 18);
  if (!Number.isFinite(maxPolls) || maxPolls < 1) throw new Error('--max-polls must be a positive number.');

  return {
    provider,
    seed,
    country: getArg(args, '--country') || 'es',
    language: getArg(args, '--language') || 'es',
    limit,
    execute: args.includes('--execute'),
    force: args.includes('--force'),
    pollIntervalMs,
    maxPolls,
  };
}

async function main(): Promise<void> {
  const options = parseArgs();
  if (!options) return;

  const provider = getKeywordProvider(options.provider);
  console.log(`Provider: ${provider.id}`);
  console.log(`Seed: ${options.seed}`);
  console.log(`Mode: ${options.execute ? 'execute' : 'dry-run'}\n`);

  const existingPath = findExistingProviderResult(provider.id, options);
  if (options.execute && existingPath && !options.force) {
    console.log('Duplicate protection');
    console.log('====================');
    console.log(`Existing result: ${existingPath}`);
    console.log('Skipped external provider call. Use --force to collect this seed again.');
    return;
  }

  const result = await provider.collect(options);
  const outputPath = saveProviderResult(result);

  console.log('Collection Summary');
  console.log('==================');
  console.log(`Source: ${result.source}`);
  console.log(`Keywords: ${result.keywords.length}`);
  console.log(`Saved: ${outputPath}`);
  console.log('No production files were modified.');
}

main().catch((error: any) => {
  console.error(`Collection failed: ${error.message}`);
  process.exit(1);
});
