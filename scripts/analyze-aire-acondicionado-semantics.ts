#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Aire Acondicionado Semantic Review
 *
 * Aggregates DataForSEO normalized outputs for /aire-acondicionado and writes a
 * review artifact under .tmp/semantic-review. It does not modify production data.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const AHREFS_DIR = path.join(ROOT, '.tmp', 'ahrefs');
const OUT_DIR = path.join(ROOT, '.tmp', 'semantic-review');
const SEEDS_PATH = path.join(ROOT, 'scripts', 'dataforseo-aire-acondicionado-seeds.json');

function readJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function slugify(seed: string): string {
  return seed
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function latestFileForSeed(seed: string): string | null {
  const suffix = `dataforseo-${slugify(seed)}.json`;
  if (!fs.existsSync(AHREFS_DIR)) return null;
  const files = fs.readdirSync(AHREFS_DIR)
    .filter((file: string) => file.endsWith(suffix))
    .map((file: string) => {
      const fullPath = path.join(AHREFS_DIR, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .sort((a: any, b: any) => b.mtime - a.mtime);
  return files[0]?.fullPath || null;
}

function cleanKeyword(value: string): string {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

const cityTerms = [
  'madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'málaga', 'zaragoza',
  'alicante', 'murcia', 'bilbao', 'granada', 'cordoba', 'córdoba'
];

const districtTerms = [
  'centro', 'salamanca', 'chamberi', 'chamartin', 'retiro', 'arganzuela', 'tetuan',
  'ciutat vella', 'eixample', 'gracia', 'sants', 'sarria', 'poblenou',
  'ruzafa', 'russafa', 'poblats maritims', 'campanar', 'extramurs', 'leixample',
  'triana', 'nervion', 'macarena', 'casco antiguo', 'teatinos', 'delicias',
  'universidad', 'san jose', 'actur'
];

function includesAny(keyword: string, terms: string[]): boolean {
  return terms.some((term) => keyword.includes(term));
}

function classify(keyword: string, seedTarget: string): any {
  const k = cleanKeyword(keyword);

  if (/(amazon|leroy|bricomart|bauhaus|carrefour|media markt|mediamarkt|segunda mano|wallapop|manual|pdf|curso|empleo|trabajo|foro|youtube|gratis|alquiler|portatil barato|ventilador|purificador)/.test(k)) {
    return { bucket: 'rejected', target: 'rejected', reason: 'Marketplace, DIY-only, job/course or weak service intent.' };
  }

  if (/(como |cómo |por que|por qué|que hacer|qué hacer|cada cuanto|temperatura|consume mucho|inverter que es|que es|qué es|frigorias|frigorías|ahorrar|consejos|limpiar filtros|limpieza filtros|diferencia|mejor|comparativa)/.test(k)) {
    return { bucket: 'content-opportunity', target: 'blog-aire-acondicionado', reason: 'Informational/blog intent.' };
  }

  if (/(precio|precios|tarifa|tarifas|cuanto cuesta|cuánto cuesta|coste|costo|presupuesto)/.test(k)) {
    return { bucket: 'commercial-support', target: 'pricing-faq', reason: 'Price/FAQ commercial support.' };
  }

  if (includesAny(k, cityTerms) || includesAny(k, districtTerms) || k.includes('cerca de mi')) {
    return { bucket: 'geo-intent', target: includesAny(k, districtTerms) ? 'district-layer' : 'city-layer', reason: 'Geo modifier detected.' };
  }

  if (/(instalacion|instalación|instalar|instalador|montaje|montar)/.test(k) && /(aire acondicionado|split|multisplit|conductos|climatizacion|climatización)/.test(k)) {
    return { bucket: 'future-candidate', target: 'installation', reason: 'Installation child-page candidate.' };
  }

  if (/(reparacion|reparación|reparar|averia|avería|no enfria|no enfría|pierde agua|hace ruido|huele mal|no enciende|se apaga|compresor)/.test(k)) {
    return { bucket: 'future-candidate', target: 'repair', reason: 'Repair child-page candidate.' };
  }

  if (/(mantenimiento|revision|revisión|limpieza|puesta a punto|contrato mantenimiento)/.test(k) && /(aire acondicionado|climatizacion|climatización|split)/.test(k)) {
    return { bucket: 'future-candidate', target: 'maintenance', reason: 'Maintenance child-page candidate.' };
  }

  if (/(carga gas|recarga gas|fuga gas|gas refrigerante|r32|r410|detectar fuga)/.test(k)) {
    return { bucket: 'future-candidate', target: 'gas-refrigerant', reason: 'Gas/refrigerant child-page candidate.' };
  }

  if (/(conductos|cassette|multisplit|split|bomba de calor|aerotermia|local comercial|vivienda)/.test(k)) {
    return { bucket: 'future-candidate', target: 'equipment-types', reason: 'Equipment/type page or section candidate.' };
  }

  if (/(aire acondicionado|climatizacion|climatización)/.test(k)) {
    return { bucket: 'approved-target', target: 'aire-acondicionado-hub', reason: 'Core commercial climate demand.' };
  }

  return { bucket: 'needs-review', target: seedTarget || 'needs-review', reason: 'No deterministic rule matched.' };
}

function top(items: any[], count = 25): any[] {
  return [...items]
    .sort((a, b) => (b.volume || 0) - (a.volume || 0) || (b.cpc || 0) - (a.cpc || 0))
    .slice(0, count);
}

function main(): void {
  const seedList = readJson(SEEDS_PATH);
  const seedRows = (seedList.groups || []).flatMap((group: any) =>
    (group.seeds || []).map((seed: string) => ({ seed, target: group.target }))
  );
  const seedTargets = new Map(seedRows.map((row: any) => [row.seed, row.target]));

  const normalizedFiles = new Map<string, string>();
  for (const { seed } of seedRows) {
    const latest = latestFileForSeed(seed);
    if (latest) normalizedFiles.set(seed, latest);
  }

  const rowsByKeyword = new Map<string, any>();
  const sourceFiles = new Set<string>();

  for (const [seed, filePath] of normalizedFiles.entries()) {
    const file = readJson(filePath);
    sourceFiles.add(path.relative(ROOT, filePath));
    for (const item of file.raw?.keywords || []) {
      const keyword = cleanKeyword(item.keyword);
      if (!keyword) continue;
      const classified = classify(keyword, seedTargets.get(seed));
      const existing = rowsByKeyword.get(keyword);
      const row = {
        keyword,
        volume: item.volume ?? 0,
        cpc: item.cpc ?? null,
        competition: item.competition ?? null,
        seed,
        seedTarget: seedTargets.get(seed) || null,
        sourceFile: path.relative(ROOT, filePath),
        ...classified,
      };
      if (!existing || (row.volume || 0) > (existing.volume || 0) || ((row.volume || 0) === (existing.volume || 0) && (row.cpc || 0) > (existing.cpc || 0))) {
        rowsByKeyword.set(keyword, row);
      }
    }
  }

  const all = [...rowsByKeyword.values()];
  const buckets = all.reduce((acc: any, row: any) => {
    acc[row.bucket] ||= [];
    acc[row.bucket].push(row);
    return acc;
  }, {});

  const targets = all.reduce((acc: any, row: any) => {
    acc[row.target] ||= { count: 0, totalVolume: 0, topKeywords: [] };
    acc[row.target].count += 1;
    acc[row.target].totalVolume += row.volume || 0;
    acc[row.target].topKeywords.push(row);
    return acc;
  }, {});

  for (const target of Object.keys(targets)) {
    targets[target].topKeywords = top(targets[target].topKeywords, 20);
  }

  const review = {
    source: 'aire-acondicionado-semantic-review',
    generatedAt: new Date().toISOString(),
    seedFile: path.relative(ROOT, SEEDS_PATH),
    sourceFiles: [...sourceFiles].sort(),
    counts: {
      seeds: seedRows.length,
      normalizedFiles: normalizedFiles.size,
      uniqueKeywords: all.length,
      approvedTarget: buckets['approved-target']?.length || 0,
      geoIntent: buckets['geo-intent']?.length || 0,
      futureCandidate: buckets['future-candidate']?.length || 0,
      commercialSupport: buckets['commercial-support']?.length || 0,
      contentOpportunity: buckets['content-opportunity']?.length || 0,
      needsReview: buckets['needs-review']?.length || 0,
      rejected: buckets.rejected?.length || 0,
    },
    topByBucket: Object.fromEntries(
      Object.entries(buckets).map(([bucket, rows]: any) => [bucket, top(rows, 50)])
    ),
    targets,
    allKeywords: top(all, all.length),
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}-aire-acondicionado-dataforseo-review.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8');

  console.log(`Review saved: ${path.relative(ROOT, outPath)}`);
  console.log(JSON.stringify(review.counts, null, 2));
  console.log('\nTop targets:');
  Object.entries(targets)
    .sort(([, a]: any, [, b]: any) => b.totalVolume - a.totalVolume)
    .slice(0, 12)
    .forEach(([target, data]: any) => {
      console.log(`- ${target}: ${data.count} keywords, volume ${data.totalVolume}`);
      data.topKeywords.slice(0, 5).forEach((row: any) => {
        console.log(`  ${row.keyword} | vol ${row.volume || 0} | cpc ${row.cpc ?? '-'}`);
      });
    });
}

try {
  main();
} catch (error: any) {
  console.error(`Aire acondicionado semantic analysis failed: ${error.message}`);
  process.exit(1);
}
