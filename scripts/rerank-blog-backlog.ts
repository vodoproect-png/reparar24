#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Rerank Blog Backlog
 *
 * Rebuilds the informational writing plan from Google Ads enriched clusters.
 * It does not modify production content.
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(process.cwd(), '.tmp', 'blog', 'blog-master-backlog-google-ads-enriched.json');
const OUT_BASE = path.join(process.cwd(), '.tmp', 'blog', 'blog-writing-plan-google-ads-reranked');

function getArg(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:()"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return normalize(text)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function csvEscape(value) {
  const text = String(value ?? '');
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function titleCaseSpanish(keyword) {
  const smallWords = new Set(['a', 'al', 'ante', 'con', 'de', 'del', 'el', 'en', 'la', 'las', 'los', 'o', 'para', 'por', 'que', 'si', 'un', 'una', 'y']);
  return String(keyword || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && smallWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function isQuestion(keyword) {
  return /^(como|cuanto|cuando|donde|por que|que hacer|que significa|porque|porqué|qué|cómo|cuánto|cuándo|dónde)\b/i.test(normalize(keyword));
}

function readableH1(keyword) {
  const clean = String(keyword || '').trim();
  const titled = titleCaseSpanish(clean);
  return isQuestion(clean) ? `¿${titled}?` : titled;
}

function scoreCandidate(keyword, cluster) {
  const normalized = normalize(keyword.keyword);
  const currentPrimary = normalize(cluster.primaryKeyword);
  const target = normalize(cluster.target);
  const flags = normalize(cluster.flags);
  const volume = Number(keyword.googleAdsVolume || 0);
  const competition = Number(keyword.googleAdsCompetition || 0);
  const highBid = Number(keyword.googleAdsHighTopBid || 0);

  let score = 0;
  score += volume > 0 ? Math.log10(volume + 1) * 35 : 0;
  score += Math.min(18, competition / 6);
  score += Math.min(14, highBid * 4);

  if (keyword.googleValidated) score += 14;
  if (normalized === currentPrimary) score += 10;
  if (target && normalized.includes(target.replace(/-/g, ' '))) score += 8;

  if (/^(como|cuanto|cuando|por que|que hacer|que significa)\b/.test(normalized)) score += 8;
  if (/precio|cuesta|coste|tarifa/.test(normalized) && /price-intent/.test(flags)) score += 10;
  if (/precio|cuesta|coste|tarifa/.test(normalized) && !/price-intent/.test(flags)) score -= 24;
  if (/no enciende|no calienta|no enfria|atascad|gotea|pierde|salta|baja|fuga/.test(normalized)) score += 7;
  if (/valencia|madrid|barcelona|sevilla|zaragoza|malaga/.test(normalized)) score -= 6;
  if (/comprar|amazon|leroy|bricomart|manual|pdf|segunda mano|wallapop/.test(normalized)) score -= 20;
  if (normalized.length > 70) score -= 6;
  if (normalized.split(' ').length > 8) score -= 5;

  return Math.round(score * 10) / 10;
}

function choosePrimary(cluster) {
  const candidates = (cluster.keywords || [])
    .filter((item) => item.keyword)
    .map((item) => ({
      ...item,
      candidateScore: scoreCandidate(item, cluster),
    }))
    .sort((a, b) => {
      if (b.candidateScore !== a.candidateScore) return b.candidateScore - a.candidateScore;
      return Number(b.googleAdsVolume || 0) - Number(a.googleAdsVolume || 0);
    });

  let selected = candidates[0] || {
    keyword: cluster.primaryKeyword,
    googleAdsVolume: cluster.googleAdsPrimaryVolume,
    candidateScore: 0,
  };

  const originalCandidate = candidates.find((item) => normalize(item.keyword) === normalize(cluster.primaryKeyword));
  const selectedVolume = Number(selected.googleAdsVolume || 0);
  const originalVolume = Number(originalCandidate?.googleAdsVolume || cluster.googleAdsPrimaryVolume || 0);
  const selectedIsPrice = /precio|cuesta|coste|tarifa/.test(normalize(selected.keyword));
  const clusterIsPrice = /price-intent/.test(normalize(cluster.flags));

  if (normalize(selected.keyword) !== normalize(cluster.primaryKeyword)) {
    if (selectedVolume <= 0 && originalCandidate) selected = originalCandidate;
    if (selectedIsPrice && !clusterIsPrice && originalCandidate) selected = originalCandidate;
    if (originalVolume > 0 && selectedVolume > 0 && selectedVolume < originalVolume * 1.25 && originalCandidate) {
      selected = originalCandidate;
    }
  }

  return {
    selected,
    candidates: candidates.slice(0, 8),
    changed: normalize(selected.keyword) !== normalize(cluster.primaryKeyword),
  };
}

function priorityScore(cluster, primary) {
  const volume = Number(cluster.googleAdsTotalVolume || 0);
  const primaryVolume = Number(primary.googleAdsVolume || 0);
  const coverage = Number(cluster.googleAdsCoverage || 0);
  const keywordCount = Number(cluster.keywordCount || 0);
  let score = 0;
  score += volume > 0 ? Math.log10(volume + 1) * 28 : 0;
  score += primaryVolume > 0 ? Math.log10(primaryVolume + 1) * 16 : 0;
  score += Math.min(16, coverage / 7);
  score += Math.min(12, keywordCount / 18);
  if (cluster.priority === 'P0-safety') score += 16;
  if (cluster.priority === 'P1-high') score += 10;
  return Math.round(score * 10) / 10;
}

function rebuildCluster(cluster) {
  const primary = choosePrimary(cluster);
  const selected = primary.selected;
  const proposedSlug = slugify(selected.keyword);
  const h1 = readableH1(selected.keyword);
  const title = h1.length <= 58 ? `${h1} | Guia Reparar24` : h1;
  const score = priorityScore(cluster, selected);

  return {
    service: cluster.service,
    serviceLabel: cluster.serviceLabel,
    status: cluster.status,
    priority: cluster.priority,
    writingPriorityScore: score,
    textLengthRule: cluster.textLengthRule,
    clusterId: cluster.clusterId,
    target: cluster.target,
    owner: cluster.owner,
    originalPrimaryKeyword: cluster.primaryKeyword,
    recommendedPrimaryKeyword: selected.keyword,
    primaryChanged: primary.changed,
    recommendedSlug: proposedSlug,
    recommendedH1: h1,
    recommendedTitle: title,
    googleAdsPrimaryVolume: selected.googleAdsVolume ?? null,
    googleAdsTotalVolume: cluster.googleAdsTotalVolume,
    googleAdsCoverage: cluster.googleAdsCoverage,
    keywordCount: cluster.keywordCount,
    flags: cluster.flags,
    approvedKeywords: cluster.approvedKeywords,
    primarySelectionReason: primary.changed
      ? 'Changed to higher-scoring Google Ads validated keyword with matching informational intent.'
      : 'Kept original primary keyword; it remains the best intent/volume match.',
    topPrimaryCandidates: primary.candidates.map((item) => ({
      keyword: item.keyword,
      score: item.candidateScore,
      googleAdsVolume: item.googleAdsVolume,
      googleAdsCompetition: item.googleAdsCompetition,
    })),
  };
}

function writeCsv(filePath, rows) {
  const header = [
    'service',
    'status',
    'priority',
    'writingPriorityScore',
    'clusterId',
    'owner',
    'originalPrimaryKeyword',
    'recommendedPrimaryKeyword',
    'primaryChanged',
    'recommendedSlug',
    'recommendedH1',
    'googleAdsPrimaryVolume',
    'googleAdsTotalVolume',
    'googleAdsCoverage',
    'keywordCount',
    'textLengthRule',
    'primarySelectionReason',
  ];
  const lines = [
    header.join(','),
    ...rows.map((row) => header.map((field) => csvEscape(row[field])).join(',')),
  ];
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function main() {
  const args = process.argv.slice(2);
  const input = getArg(args, '--input') || INPUT_PATH;
  const includeCreated = args.includes('--include-created');
  const data = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  const sourceClusters = includeCreated
    ? data.clusters || []
    : (data.clusters || []).filter((cluster) => cluster.status !== 'already-created');

  const clusters = sourceClusters
    .map(rebuildCluster)
    .sort((a, b) => b.writingPriorityScore - a.writingPriorityScore || Number(b.googleAdsTotalVolume || 0) - Number(a.googleAdsTotalVolume || 0));

  const byService = clusters.reduce((acc, item) => {
    if (!acc[item.service]) acc[item.service] = { clusters: 0, primaryChanges: 0, googleAdsTotalVolume: 0 };
    acc[item.service].clusters += 1;
    acc[item.service].primaryChanges += item.primaryChanged ? 1 : 0;
    acc[item.service].googleAdsTotalVolume += Number(item.googleAdsTotalVolume || 0);
    return acc;
  }, {});

  const result = {
    generatedAt: new Date().toISOString(),
    sourceInput: path.relative(process.cwd(), input),
    policy: {
      primaryRule: 'Use the highest-frequency Google Ads keyword in URL/H1 only when it matches the article intent. Intent beats volume.',
      urlRule: 'Use recommendedSlug from recommendedPrimaryKeyword unless it is too broad, transactional, or unnatural.',
      h1Rule: 'Use recommendedH1 with natural Spanish punctuation for question queries.',
    },
    summary: {
      clusters: clusters.length,
      primaryChanges: clusters.filter((item) => item.primaryChanged).length,
      byService,
    },
    clusters,
  };

  fs.writeFileSync(`${OUT_BASE}.json`, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  writeCsv(`${OUT_BASE}.csv`, clusters);

  console.log('Blog Writing Plan Rerank');
  console.log('========================');
  console.log(`Clusters: ${result.summary.clusters}`);
  console.log(`Primary changes: ${result.summary.primaryChanges}`);
  console.log(`Saved: ${path.relative(process.cwd(), `${OUT_BASE}.json`)}`);
  console.log(`Saved: ${path.relative(process.cwd(), `${OUT_BASE}.csv`)}`);
  console.log('\nTop 10:');
  for (const item of clusters.slice(0, 10)) {
    console.log(`${item.service} | ${item.recommendedPrimaryKeyword} | GAds total ${item.googleAdsTotalVolume} | changed ${item.primaryChanged}`);
  }
}

try {
  main();
} catch (error) {
  console.error(`Rerank failed: ${error.message}`);
  process.exit(1);
}
