#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Commercial page keyword audit through Google Ads Historical Metrics.
 *
 * Review-only script. It checks whether hub and child service pages use the
 * strongest commercial primary keyword without promoting informational or
 * mismatched geo queries into URL/H1 decisions.
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
const OUT_DIR = path.join(process.cwd(), '.tmp', 'commercial-keyword-audit');

const GEO_TARGETS = { es: 'geoTargetConstants/2724' };
const LANGUAGE_TARGETS = { es: 'languageConstants/1003' };

const CHILD_MODULES = [
  {
    service: 'fontanero',
    file: '../data/fontanero/child-services-seo',
    exportName: 'childServicesData',
  },
  {
    service: 'electricista',
    file: '../data/electricista/child-services-seo',
    exportName: 'childServicesData',
  },
  {
    service: 'desatascos',
    file: '../data/desatascos/child-services-seo',
    exportName: 'desatascosChildServicesData',
  },
  {
    service: 'aire-acondicionado',
    file: '../data/aire-acondicionado/child-services-seo',
    exportName: 'aireAcondicionadoChildServicesData',
  },
  {
    service: 'calefaccion',
    file: '../data/calefaccion/child-services-seo',
    exportName: 'calefaccionChildServicesData',
  },
  {
    service: 'limpieza-tuberias',
    file: '../data/limpieza-tuberias/child-services-seo',
    exportName: 'limpiezaTuberiasChildServicesData',
  },
];

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

function unique(items) {
  const seen = new Set();
  const result = [];
  for (const item of items.flat().filter(Boolean).map((value) => String(value).trim()).filter(Boolean)) {
    const key = normalizeKeyword(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
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
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 800)}`));
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
    console.log(`Google Ads commercial batch ${index + 1}/${batches.length}: ${batch.length} keywords`);
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
        avgMonthlySearches: item.avgMonthlySearches ?? null,
        competitionIndex: item.competitionIndex ?? null,
        competitionLevel: item.competition ?? null,
        lowTopOfPageBid: microsToCurrency(item.lowTopOfPageBidMicros),
        highTopOfPageBid: microsToCurrency(item.highTopOfPageBidMicros),
        monthlySearchVolumes: item.monthlySearchVolumes || [],
        raw: item,
      });
    }
  }
  return metrics;
}

function collectTextKeywords(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split('|');
  return [];
}

function parseSeoContentKeywords(seoContent) {
  if (!seoContent) return [];
  return unique([
    seoContent.keywordTags || [],
    seoContent.keywords || [],
    seoContent.localCoverage?.title || '',
    seoContent.localCoverage?.description || '',
  ]);
}

function collectPages() {
  const pages = [];
  const { services } = require('../data/services');
  for (const service of services || []) {
    const keywords = unique([
      service.keywords || [],
      service.name,
      service.description,
    ]);
    pages.push({
      service: service.slug,
      pageType: 'hub',
      path: `/${service.slug}`,
      slug: service.slug,
      h1: service.name,
      metaTitle: service.name,
      metaDescription: service.description,
      currentPrimary: keywords[0] || service.name,
      approvedKeywords: keywords,
    });
  }

  for (const childModule of CHILD_MODULES) {
    const data = require(childModule.file)[childModule.exportName] || {};
    for (const [slug, page] of Object.entries(data)) {
      const approvedKeywords = unique([
        page.lockedPrimaryKw,
        page.secondaryKw || [],
        page.seoBlockKw || [],
        page.faqKw || [],
        parseSeoContentKeywords(page.seoContent),
      ]);
      pages.push({
        service: childModule.service,
        pageType: 'child',
        path: `/${childModule.service}/${slug}`,
        slug,
        h1: page.h1,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        currentPrimary: page.lockedPrimaryKw,
        approvedKeywords,
      });
    }
  }

  return pages;
}

function hasInfoIntent(keyword) {
  const key = normalizeKeyword(keyword);
  return /(^|\s)(como|que|cuando|porque|por que|cuanto|donde|cual|se puede|mejor|guia|tutorial|pdf)(\s|$)/.test(key);
}

function hasPriceIntent(keyword) {
  const key = normalizeKeyword(keyword);
  return /(^|\s)(precio|cuanto cuesta|tarifa|coste|presupuesto)(\s|$)/.test(key);
}

function hasGeoIntent(keyword) {
  const key = normalizeKeyword(keyword);
  return /(^|\s)(valencia|madrid|barcelona|sevilla|zaragoza|malaga|alicante|torrent|paterna|burjassot)(\s|$)/.test(key);
}

function commercialIntentScore(keyword, page) {
  const key = normalizeKeyword(keyword);
  let score = 0;
  if (/(servicio|empresa|tecnico|instalador|reparacion|mantenimiento|instalacion|urgente|24 horas|desatasco|limpieza|cambiar|sustitucion|revision|camion cuba)/.test(key)) score += 30;
  if (key.includes(normalizeKeyword(page.service))) score += 8;
  if (page.pageType === 'hub' && key.length <= 32) score += 6;
  if (page.pageType === 'child' && key.includes(normalizeKeyword(page.currentPrimary).split(' ')[0])) score += 5;
  if (hasInfoIntent(key)) score -= 60;
  if (hasPriceIntent(key)) score -= page.slug.includes('precio') ? 0 : 15;
  if (hasGeoIntent(key) && page.pageType === 'child') score -= 8;
  return score;
}

function scoreCandidate(keyword, metric, page) {
  const volume = Number(metric?.avgMonthlySearches || 0);
  const bid = Number(metric?.highTopOfPageBid || metric?.lowTopOfPageBid || 0);
  const competition = Number(metric?.competitionIndex || 0);
  return (
    Math.log10(volume + 1) * 35
    + Math.min(bid, 8) * 4
    + Math.min(competition, 100) * 0.15
    + commercialIntentScore(keyword, page)
    + (normalizeKeyword(keyword) === normalizeKeyword(page.currentPrimary) ? 10 : 0)
  );
}

function metricFields(metric) {
  return {
    volume: metric?.avgMonthlySearches ?? null,
    competitionIndex: metric?.competitionIndex ?? null,
    competitionLevel: metric?.competitionLevel ?? null,
    lowTopOfPageBid: metric?.lowTopOfPageBid ?? null,
    highTopOfPageBid: metric?.highTopOfPageBid ?? null,
    monthlySearchVolumes: metric?.monthlySearchVolumes ?? [],
  };
}

function auditPage(page, metricsByKey) {
  const candidates = page.approvedKeywords.map((keyword) => {
    const metric = metricsByKey.get(normalizeKeyword(keyword));
    return {
      keyword,
      ...metricFields(metric),
      googleValidated: Boolean(metric),
      infoIntent: hasInfoIntent(keyword),
      priceIntent: hasPriceIntent(keyword),
      geoIntent: hasGeoIntent(keyword),
      score: scoreCandidate(keyword, metric, page),
    };
  }).sort((a, b) => {
    const scoreDiff = Number(b.score || 0) - Number(a.score || 0);
    if (scoreDiff !== 0) return scoreDiff;
    return Number(b.volume || 0) - Number(a.volume || 0);
  });

  const currentMetric = metricsByKey.get(normalizeKeyword(page.currentPrimary));
  const current = {
    keyword: page.currentPrimary,
    ...metricFields(currentMetric),
    googleValidated: Boolean(currentMetric),
  };

  const best = candidates[0] || null;
  const currentVolume = Number(current.volume || 0);
  const bestVolume = Number(best?.volume || 0);
  const samePrimary = best && normalizeKeyword(best.keyword) === normalizeKeyword(page.currentPrimary);
  const candidateStrongEnough = bestVolume >= Math.max(20, Math.round(currentVolume * 1.3));
  const candidateCleanEnough = best && !best.infoIntent && !(best.priceIntent && !normalizeKeyword(page.slug).includes('precio'));

  let recommendation = 'keep-primary';
  let reason = 'Current primary is validated or the stronger candidates are not clean enough for URL/H1.';
  if (!current.googleValidated && best?.googleValidated && candidateCleanEnough) {
    recommendation = 'review-primary';
    reason = 'Current primary has no Google Ads metric; review best commercial candidate.';
  } else if (!samePrimary && candidateStrongEnough && candidateCleanEnough) {
    recommendation = 'review-primary';
    reason = 'A stronger commercial candidate has materially higher Google Ads volume.';
  } else if (!current.googleValidated && !best?.googleValidated) {
    recommendation = 'manual-review';
    reason = 'No Google Ads metrics returned for current primary or candidates.';
  }

  const validatedCount = candidates.filter((candidate) => candidate.googleValidated).length;
  return {
    ...page,
    keywordCount: page.approvedKeywords.length,
    googleValidatedKeywords: validatedCount,
    googleAdsCoverage: page.approvedKeywords.length
      ? Math.round((validatedCount / page.approvedKeywords.length) * 1000) / 10
      : 0,
    currentPrimaryMetrics: current,
    bestCandidate: best,
    topCandidates: candidates.slice(0, 10),
    recommendation,
    reason,
  };
}

function writeCsv(filePath, rows) {
  const header = [
    'service',
    'pageType',
    'path',
    'slug',
    'h1',
    'metaTitle',
    'metaDescription',
    'currentPrimary',
    'currentPrimaryVolume',
    'currentPrimaryCompetitionIndex',
    'currentPrimaryCompetitionLevel',
    'currentPrimaryLowTopBid',
    'currentPrimaryHighTopBid',
    'bestCandidateKeyword',
    'bestCandidateVolume',
    'bestCandidateCompetitionIndex',
    'bestCandidateCompetitionLevel',
    'bestCandidateLowTopBid',
    'bestCandidateHighTopBid',
    'bestCandidateInfoIntent',
    'bestCandidatePriceIntent',
    'bestCandidateGeoIntent',
    'keywordCount',
    'googleValidatedKeywords',
    'googleAdsCoverage',
    'recommendation',
    'reason',
  ];

  const lines = [
    header.join(','),
    ...rows.map((row) => header.map((field) => {
      if (field.startsWith('currentPrimary')) {
        const key = field.replace('currentPrimary', '');
        const map = {
          Volume: 'volume',
          CompetitionIndex: 'competitionIndex',
          CompetitionLevel: 'competitionLevel',
          LowTopBid: 'lowTopOfPageBid',
          HighTopBid: 'highTopOfPageBid',
        };
        return csvEscape(row.currentPrimaryMetrics?.[map[key]] ?? row[field]);
      }
      if (field.startsWith('bestCandidate')) {
        const key = field.replace('bestCandidate', '');
        const map = {
          Keyword: 'keyword',
          Volume: 'volume',
          CompetitionIndex: 'competitionIndex',
          CompetitionLevel: 'competitionLevel',
          LowTopBid: 'lowTopOfPageBid',
          HighTopBid: 'highTopOfPageBid',
          InfoIntent: 'infoIntent',
          PriceIntent: 'priceIntent',
          GeoIntent: 'geoIntent',
        };
        return csvEscape(row.bestCandidate?.[map[key]] ?? row[field]);
      }
      return csvEscape(row[field]);
    }).join(',')),
  ];
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function writeCandidatesCsv(filePath, rows) {
  const header = [
    'service',
    'pageType',
    'path',
    'slug',
    'currentPrimary',
    'candidateRank',
    'candidateKeyword',
    'candidateScore',
    'volume',
    'competitionIndex',
    'competitionLevel',
    'lowTopOfPageBid',
    'highTopOfPageBid',
    'googleValidated',
    'infoIntent',
    'priceIntent',
    'geoIntent',
    'monthlySearchVolumes',
  ];

  const lines = [
    header.join(','),
    ...rows.flatMap((row) => (row.topCandidates || []).map((candidate, index) => {
      const monthly = (candidate.monthlySearchVolumes || [])
        .map((item) => `${item.year}-${String(item.month || '').padStart(2, '0')}:${item.monthlySearches}`)
        .join('|');
      const record = {
        service: row.service,
        pageType: row.pageType,
        path: row.path,
        slug: row.slug,
        currentPrimary: row.currentPrimary,
        candidateRank: index + 1,
        candidateKeyword: candidate.keyword,
        candidateScore: Math.round(Number(candidate.score || 0) * 100) / 100,
        volume: candidate.volume,
        competitionIndex: candidate.competitionIndex,
        competitionLevel: candidate.competitionLevel,
        lowTopOfPageBid: candidate.lowTopOfPageBid,
        highTopOfPageBid: candidate.highTopOfPageBid,
        googleValidated: candidate.googleValidated,
        infoIntent: candidate.infoIntent,
        priceIntent: candidate.priceIntent,
        geoIntent: candidate.geoIntent,
        monthlySearchVolumes: monthly,
      };
      return header.map((field) => csvEscape(record[field])).join(',');
    })),
  ];
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
  const args = process.argv.slice(2);
  const country = getArg(args, '--country') || 'es';
  const language = getArg(args, '--language') || 'es';
  const batchSize = Number(getArg(args, '--batch-size') || 500);

  requireEnv([
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_CUSTOMER_ID',
  ]);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pages = collectPages();
  const allKeywords = unique(pages.flatMap((page) => [page.currentPrimary, page.approvedKeywords]));

  console.log('Commercial Google Ads Keyword Audit');
  console.log('===================================');
  console.log(`Pages: ${pages.length}`);
  console.log(`Unique keywords: ${allKeywords.length}`);
  console.log(`Country: ${country}`);
  console.log(`Language: ${language}`);
  console.log(`Batch size: ${batchSize}\n`);

  const metricsByKey = await fetchHistoricalMetrics(allKeywords, { country, language, batchSize });
  const auditedPages = pages.map((page) => auditPage(page, metricsByKey))
    .sort((a, b) => {
      if (a.recommendation !== b.recommendation) {
        return a.recommendation === 'review-primary' ? -1 : 1;
      }
      return a.path.localeCompare(b.path);
    });

  const summary = {
    pages: auditedPages.length,
    hubPages: auditedPages.filter((page) => page.pageType === 'hub').length,
    childPages: auditedPages.filter((page) => page.pageType === 'child').length,
    uniqueKeywords: allKeywords.length,
    googleAdsMetricKeywords: metricsByKey.size,
    googleAdsCoverage: allKeywords.length ? Math.round((metricsByKey.size / allKeywords.length) * 1000) / 10 : 0,
    keepPrimary: auditedPages.filter((page) => page.recommendation === 'keep-primary').length,
    reviewPrimary: auditedPages.filter((page) => page.recommendation === 'review-primary').length,
    manualReview: auditedPages.filter((page) => page.recommendation === 'manual-review').length,
  };

  const result = {
    generatedAt: new Date().toISOString(),
    country,
    language,
    guardrails: {
      urlH1PrimaryRule: 'Use the strongest commercial-intent keyword only when it matches the page intent. Informational, price-only, or mismatched geo queries are candidates for FAQ/body/blog, not automatic URL/H1 replacement.',
      materialChangeThreshold: 'Best candidate needs at least 30% higher volume or current primary must have no Google Ads metric.',
    },
    summary,
    pages: auditedPages,
  };

  const jsonPath = path.join(OUT_DIR, 'commercial-keyword-google-ads-audit.json');
  const csvPath = path.join(OUT_DIR, 'commercial-keyword-google-ads-audit.csv');
  const candidatesCsvPath = path.join(OUT_DIR, 'commercial-keyword-google-ads-candidates.csv');
  fs.writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  writeCsv(csvPath, auditedPages);
  writeCandidatesCsv(candidatesCsvPath, auditedPages);

  console.log('\nAudit Summary');
  console.log('=============');
  console.log(`Pages: ${summary.pages} (${summary.hubPages} hubs, ${summary.childPages} child pages)`);
  console.log(`Unique keywords: ${summary.uniqueKeywords}`);
  console.log(`Google Ads metric keywords: ${summary.googleAdsMetricKeywords}`);
  console.log(`Google Ads coverage: ${summary.googleAdsCoverage}%`);
  console.log(`Keep primary: ${summary.keepPrimary}`);
  console.log(`Review primary: ${summary.reviewPrimary}`);
  console.log(`Manual review: ${summary.manualReview}`);
  console.log(`Saved: ${path.relative(process.cwd(), jsonPath)}`);
  console.log(`Saved: ${path.relative(process.cwd(), csvPath)}`);
  console.log(`Saved: ${path.relative(process.cwd(), candidatesCsvPath)}`);
}

main().catch((error) => {
  console.error(`Commercial keyword audit failed: ${error.message}`);
  process.exit(1);
});
