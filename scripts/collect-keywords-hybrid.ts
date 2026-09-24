#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Hybrid Keyword Collector
 *
 * DataForSEO expands the seed; Google Ads validates the same seed and provides
 * official Keyword Planner metrics. Output stays in .tmp and is safe to review.
 */

const { getKeywordProvider } = require('./keyword-providers');
const { saveProviderResult } = require('./keyword-providers/common');

type Options = {
  seed: string;
  country: string;
  language: string;
  limit: number;
  execute: boolean;
  pollIntervalMs: number;
  maxPolls: number;
};

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function showHelp(): void {
  console.log('Hybrid Keyword Collector');
  console.log('========================\n');
  console.log('USAGE:');
  console.log('  npm run collect:keywords:hybrid -- --seed "fontanero valencia" --limit 100 --execute\n');
  console.log('OUTPUT:');
  console.log('  .tmp/keyword-providers/hybrid/*.json');
  console.log('  No production files are modified.');
}

function parseArgs(): Options | null {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

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
    seed,
    country: getArg(args, '--country') || 'es',
    language: getArg(args, '--language') || 'es',
    limit,
    execute: args.includes('--execute'),
    pollIntervalMs,
    maxPolls,
  };
}

function keywordKey(keyword: string): string {
  return String(keyword || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toNumber(value: any): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function scoreKeyword(item: any): number {
  const volume = Math.max(0, Number(item.volume || 0));
  const cpc = Math.max(0, Number(item.cpc || 0));
  const competition = Math.max(0, Number(item.competition || 0));
  const validationBoost = item.googleValidated ? 18 : 0;
  const volumeScore = volume > 0 ? Math.log10(volume + 1) * 22 : 0;
  const cpcScore = cpc > 0 ? Math.min(22, cpc * 7) : 0;
  const competitionScore = competition > 0 ? Math.min(16, competition / 6) : 0;
  return Math.round((validationBoost + volumeScore + cpcScore + competitionScore) * 10) / 10;
}

function mergeKeywords(dataForSeoResult: any, googleAdsResult: any): any[] {
  const byKey = new Map<string, any>();

  for (const item of dataForSeoResult.keywords || []) {
    const key = keywordKey(item.keyword);
    if (!key) continue;
    byKey.set(key, {
      keyword: item.keyword,
      seed: dataForSeoResult.seed,
      country: dataForSeoResult.country,
      language: dataForSeoResult.language,
      sources: ['dataforseo'],
      googleValidated: false,
      volume: toNumber(item.volume),
      dataforseoVolume: toNumber(item.volume),
      googleAdsVolume: null,
      difficulty: toNumber(item.difficulty),
      cpc: toNumber(item.cpc),
      dataforseoCpc: toNumber(item.cpc),
      googleAdsCpc: null,
      competition: toNumber(item.competition),
      dataforseoCompetition: toNumber(item.competition),
      googleAdsCompetition: null,
      raw: {
        dataforseo: item.raw || item,
        googleAds: null,
      },
    });
  }

  for (const item of googleAdsResult.keywords || []) {
    const key = keywordKey(item.keyword);
    if (!key) continue;
    const current = byKey.get(key);
    const googleVolume = toNumber(item.volume);
    const googleCpc = toNumber(item.cpc);
    const googleCompetition = toNumber(item.competition);

    if (current) {
      current.sources = Array.from(new Set([...current.sources, 'google-ads']));
      current.googleValidated = true;
      current.volume = googleVolume ?? current.volume;
      current.googleAdsVolume = googleVolume;
      current.cpc = googleCpc ?? current.cpc;
      current.googleAdsCpc = googleCpc;
      current.competition = googleCompetition ?? current.competition;
      current.googleAdsCompetition = googleCompetition;
      current.raw.googleAds = item.raw || item;
      continue;
    }

    byKey.set(key, {
      keyword: item.keyword,
      seed: googleAdsResult.seed,
      country: googleAdsResult.country,
      language: googleAdsResult.language,
      sources: ['google-ads'],
      googleValidated: true,
      volume: googleVolume,
      dataforseoVolume: null,
      googleAdsVolume: googleVolume,
      difficulty: null,
      cpc: googleCpc,
      dataforseoCpc: null,
      googleAdsCpc: googleCpc,
      competition: googleCompetition,
      dataforseoCompetition: null,
      googleAdsCompetition: googleCompetition,
      raw: {
        dataforseo: null,
        googleAds: item.raw || item,
      },
    });
  }

  return Array.from(byKey.values())
    .map((item) => ({
      ...item,
      priorityScore: scoreKeyword(item),
    }))
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
      return Number(b.volume || 0) - Number(a.volume || 0);
    });
}

async function main(): Promise<void> {
  const options = parseArgs();
  if (!options) return;

  console.log('Hybrid Keyword Collector');
  console.log('========================');
  console.log(`Seed: ${options.seed}`);
  console.log(`Mode: ${options.execute ? 'execute' : 'dry-run'}\n`);

  const dataForSeo = getKeywordProvider('dataforseo');
  const googleAds = getKeywordProvider('google-ads');

  const request = {
    ...options,
    force: true,
  };

  const dataForSeoResult = await dataForSeo.collect(request);
  const googleAdsResult = await googleAds.collect(request);
  const keywords = mergeKeywords(dataForSeoResult, googleAdsResult);

  const result = {
    source: 'hybrid',
    providers: ['dataforseo', 'google-ads'],
    seed: options.seed,
    country: options.country,
    language: options.language,
    limit: options.limit,
    fetchedAt: new Date().toISOString(),
    strategy: {
      expansion: 'dataforseo-standard-queue',
      validation: 'google-ads-keyword-planner',
      ranking: 'google validation + volume + cpc + competition',
    },
    summary: {
      dataforseoKeywords: dataForSeoResult.keywords?.length || 0,
      googleAdsKeywords: googleAdsResult.keywords?.length || 0,
      mergedKeywords: keywords.length,
      googleValidated: keywords.filter((item) => item.googleValidated).length,
    },
    rawProviderResults: {
      dataforseo: {
        source: dataForSeoResult.source,
        seed: dataForSeoResult.seed,
        fetchedAt: dataForSeoResult.fetchedAt,
        taskId: dataForSeoResult.taskId,
        keywordCount: dataForSeoResult.keywords?.length || 0,
      },
      googleAds: {
        source: googleAdsResult.source,
        seed: googleAdsResult.seed,
        fetchedAt: googleAdsResult.fetchedAt,
        keywordCount: googleAdsResult.keywords?.length || 0,
      },
    },
    keywords,
  };

  const outputPath = saveProviderResult(result);

  console.log('Hybrid Collection Summary');
  console.log('=========================');
  console.log(`DataForSEO keywords: ${result.summary.dataforseoKeywords}`);
  console.log(`Google Ads keywords: ${result.summary.googleAdsKeywords}`);
  console.log(`Merged keywords: ${result.summary.mergedKeywords}`);
  console.log(`Google validated: ${result.summary.googleValidated}`);
  console.log(`Saved: ${outputPath}`);
  console.log('No production files were modified.');
}

main().catch((error: any) => {
  console.error(`Hybrid collection failed: ${error.message}`);
  process.exit(1);
});
