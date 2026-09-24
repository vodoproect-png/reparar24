#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Enrich Blog Master Backlog with Google Ads Historical Metrics
 *
 * Reads approved informational clusters, requests official Keyword Planner
 * historical metrics in batches, and writes review-only outputs to .tmp/blog.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath, quiet: true });

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25';
const GOOGLE_ADS_HOST = 'googleads.googleapis.com';
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com';
const INPUT_PATH = path.join(process.cwd(), '.tmp', 'blog', 'blog-master-backlog.json');
const OUT_BASE = path.join(process.cwd(), '.tmp', 'blog', 'blog-master-backlog-google-ads-enriched');

const GEO_TARGETS = {
  es: 'geoTargetConstants/2724',
};

const LANGUAGE_TARGETS = {
  es: 'languageConstants/1003',
};

function getArg(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function requireEnv(names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

function normalizeKeyword(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function post(hostname, pathName, headers, body, timeoutMs = 60000) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname,
      path: pathName,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: timeoutMs,
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 500)}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error(`Invalid JSON response: ${data.slice(0, 500)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function refreshAccessToken() {
  const raw = await post(
    GOOGLE_OAUTH_HOST,
    '/token',
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }).toString(),
    30000,
  );
  if (!raw.access_token) throw new Error('Google OAuth response did not include access_token.');
  return raw.access_token;
}

function parseApprovedKeywords(cluster) {
  return String(cluster.approvedKeywords || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

function collectKeywords(clusters) {
  const byKey = new Map();
  for (const cluster of clusters) {
    for (const keyword of [cluster.primaryKeyword, ...parseApprovedKeywords(cluster)]) {
      const key = normalizeKeyword(keyword);
      if (!key) continue;
      if (!byKey.has(key)) byKey.set(key, keyword);
    }
  }
  return Array.from(byKey.values()).sort((a, b) => a.localeCompare(b));
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function microsToCurrency(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed / 1000000 : null;
}

async function fetchHistoricalMetrics(keywords, options) {
  const accessToken = await refreshAccessToken();
  const customerId = String(process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '');
  const loginCustomerId = String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || '').replace(/-/g, '');
  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:generateKeywordHistoricalMetrics`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
    'Content-Type': 'application/json',
  };
  if (loginCustomerId) headers['login-customer-id'] = loginCustomerId;

  const metrics = new Map();
  const batches = chunk(keywords, options.batchSize);
  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index];
    console.log(`Google Ads batch ${index + 1}/${batches.length}: ${batch.length} keywords`);
    const raw = await post(GOOGLE_ADS_HOST, endpoint, headers, {
      keywords: batch,
      language: LANGUAGE_TARGETS[options.language] || options.language,
      geoTargetConstants: [GEO_TARGETS[options.country] || options.country],
      keywordPlanNetwork: 'GOOGLE_SEARCH',
    }, 120000);

    for (const result of raw.results || []) {
      const keyword = result.text || '';
      const item = result.keywordMetrics || {};
      metrics.set(normalizeKeyword(keyword), {
        keyword,
        googleAdsVolume: item.avgMonthlySearches ?? null,
        googleAdsCompetition: item.competitionIndex ?? null,
        googleAdsCompetitionLevel: item.competition ?? null,
        googleAdsLowTopBid: microsToCurrency(item.lowTopOfPageBidMicros),
        googleAdsHighTopBid: microsToCurrency(item.highTopOfPageBidMicros),
        raw: item,
      });
    }
  }
  return metrics;
}

function enrichClusters(clusters, metricsByKey) {
  return clusters.map((cluster) => {
    const approved = parseApprovedKeywords(cluster);
    const keywords = approved.map((keyword) => {
      const metric = metricsByKey.get(normalizeKeyword(keyword));
      return {
        keyword,
        dataforseoVolume: null,
        googleAdsVolume: metric?.googleAdsVolume ?? null,
        googleAdsCompetition: metric?.googleAdsCompetition ?? null,
        googleAdsCompetitionLevel: metric?.googleAdsCompetitionLevel ?? null,
        googleAdsLowTopBid: metric?.googleAdsLowTopBid ?? null,
        googleAdsHighTopBid: metric?.googleAdsHighTopBid ?? null,
        googleValidated: Boolean(metric),
      };
    });

    const primaryMetric = metricsByKey.get(normalizeKeyword(cluster.primaryKeyword));
    const googleAdsTotalVolume = keywords.reduce((sum, item) => sum + Number(item.googleAdsVolume || 0), 0);
    const googleValidatedKeywords = keywords.filter((item) => item.googleValidated).length;
    const googleAdsCoverage = keywords.length ? Math.round((googleValidatedKeywords / keywords.length) * 1000) / 10 : 0;

    return {
      ...cluster,
      googleAdsPrimaryVolume: primaryMetric?.googleAdsVolume ?? null,
      googleAdsPrimaryCompetition: primaryMetric?.googleAdsCompetition ?? null,
      googleAdsPrimaryLowTopBid: primaryMetric?.googleAdsLowTopBid ?? null,
      googleAdsPrimaryHighTopBid: primaryMetric?.googleAdsHighTopBid ?? null,
      googleAdsTotalVolume,
      googleAdsValidatedKeywords: googleValidatedKeywords,
      googleAdsCoverage,
      keywords,
    };
  }).sort((a, b) => {
    const googleDiff = Number(b.googleAdsTotalVolume || 0) - Number(a.googleAdsTotalVolume || 0);
    if (googleDiff !== 0) return googleDiff;
    return Number(b.totalVolume || 0) - Number(a.totalVolume || 0);
  });
}

function writeCsv(filePath, rows) {
  const header = [
    'service',
    'status',
    'priority',
    'clusterId',
    'owner',
    'primaryKeyword',
    'dataforseoTotalVolume',
    'googleAdsPrimaryVolume',
    'googleAdsTotalVolume',
    'googleAdsValidatedKeywords',
    'googleAdsCoverage',
    'keywordCount',
    'proposedTitle',
  ];
  const lines = [
    header.join(','),
    ...rows.map((row) => header.map((field) => csvEscape(
      field === 'dataforseoTotalVolume' ? row.totalVolume : row[field]
    )).join(',')),
  ];
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
  const args = process.argv.slice(2);
  const input = getArg(args, '--input') || INPUT_PATH;
  const country = getArg(args, '--country') || 'es';
  const language = getArg(args, '--language') || 'es';
  const batchSize = Number(getArg(args, '--batch-size') || 500);
  const maxClustersArg = getArg(args, '--max-clusters');
  const maxClusters = maxClustersArg ? Number(maxClustersArg) : null;

  requireEnv([
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
  ]);

  const source = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  const clusters = maxClusters ? (source.clusters || []).slice(0, maxClusters) : (source.clusters || []);
  const keywords = collectKeywords(clusters);

  console.log('Google Ads Blog Backlog Enrichment');
  console.log('==================================');
  console.log(`Input clusters: ${clusters.length}`);
  console.log(`Unique approved keywords: ${keywords.length}`);
  console.log(`Batch size: ${batchSize}\n`);

  const metricsByKey = await fetchHistoricalMetrics(keywords, { country, language, batchSize });
  const enrichedClusters = enrichClusters(clusters, metricsByKey);

  const result = {
    generatedAt: new Date().toISOString(),
    sourceInput: path.relative(process.cwd(), input),
    country,
    language,
    summary: {
      clusters: enrichedClusters.length,
      uniqueApprovedKeywords: keywords.length,
      googleAdsMetricKeywords: metricsByKey.size,
      googleAdsCoverage: keywords.length ? Math.round((metricsByKey.size / keywords.length) * 1000) / 10 : 0,
    },
    clusters: enrichedClusters,
  };

  fs.writeFileSync(`${OUT_BASE}.json`, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  writeCsv(`${OUT_BASE}.csv`, enrichedClusters);

  console.log('\nEnrichment Summary');
  console.log('==================');
  console.log(`Clusters: ${result.summary.clusters}`);
  console.log(`Unique approved keywords: ${result.summary.uniqueApprovedKeywords}`);
  console.log(`Google Ads metric keywords: ${result.summary.googleAdsMetricKeywords}`);
  console.log(`Google Ads coverage: ${result.summary.googleAdsCoverage}%`);
  console.log(`Saved: ${path.relative(process.cwd(), `${OUT_BASE}.json`)}`);
  console.log(`Saved: ${path.relative(process.cwd(), `${OUT_BASE}.csv`)}`);
}

main().catch((error) => {
  console.error(`Google Ads enrichment failed: ${error.message}`);
  process.exit(1);
});
