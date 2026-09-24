#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Desatascos Semantic Review
 *
 * Aggregates DataForSEO normalized outputs for /desatascos and writes a review
 * artifact under .tmp/semantic-review. It does not modify production data.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const AHREFS_DIR = path.join(ROOT, '.tmp', 'ahrefs');
const OUT_DIR = path.join(ROOT, '.tmp', 'semantic-review');

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

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function latestExecuteSummary(): string {
  const dir = path.join(ROOT, '.tmp', 'semantic-collection', 'dataforseo');
  const files = fs.readdirSync(dir)
    .filter((file: string) => file.startsWith('execute-desatascos-') && file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .sort((a: any, b: any) => b.mtime - a.mtime);
  if (!files[0]) throw new Error('No execute-desatascos summary found.');
  return files[0].fullPath;
}

function cleanKeyword(value: string): string {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

const cityTerms = [
  'madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'zaragoza',
  'alicante', 'costa blanca', 'costa del sol'
];

const districtTerms = [
  'centro', 'salamanca', 'chamberi', 'retiro', 'chamartin', 'arganzuela', 'tetuan',
  'ciutat vella', 'eixample', 'gracia', 'sants', 'sarria', 'poblenou',
  'ruzafa', 'russafa', 'poblats maritims', 'campanar', 'extramurs', 'leixample',
  'triana', 'nervion', 'macarena', 'casco antiguo', 'casco viejo',
  'delicias', 'universidad', 'san jose', 'actur', 'teatinos', 'pedregalejo'
];

function includesAny(keyword: string, terms: string[]): boolean {
  return terms.some((term) => keyword.includes(term));
}

function classify(keyword: string, seedTarget: string): any {
  const k = cleanKeyword(keyword);

  if (/(empleo|trabajo|curso|fp|oposicion|pdf|gratis descargar|amazon|mercadona|leroy|bricomart|briomart|bahaus|bauhaus|melt|muelle|manual|alambre|wc net|producto|quimico|químico)/.test(k)) {
    return { bucket: 'rejected', target: 'rejected', reason: 'Non-service, product-only or low commercial fit.' };
  }

  if (/(como |cómo |por que|por qué|que hacer|qué hacer|sosa|casero|bicarbonato|vinagre|mal olor|cada cuanto|toallitas|evitar|prevenir|remedio)/.test(k)) {
    return { bucket: 'content-opportunity', target: 'blog-desatascos', reason: 'Informational/blog intent.' };
  }

  if (/(precio|precios|tarifa|tarifas|cuanto cuesta|cuánto cuesta|coste|costo)/.test(k)) {
    return { bucket: 'commercial-support', target: 'pricing-faq', reason: 'Price/FAQ commercial support.' };
  }

  if (includesAny(k, cityTerms) || includesAny(k, districtTerms) || k.includes('cerca de mi')) {
    return { bucket: 'geo-intent', target: includesAny(k, districtTerms) ? 'district-layer' : 'city-layer', reason: 'Geo modifier detected.' };
  }

  if (/(wc|water|vater|váter|inodoro|fregadero|lavabo|ducha|baño|bano|desague|desagüe|tuberia|tubería|sifon|sifón|bote sifonico|bote sifónico)/.test(k) && /(desatasc|atasc|obstruid|no traga|desemboz|limpi)/.test(k)) {
    return { bucket: 'future-candidate', target: 'domestic-blockages', reason: 'Domestic blockage service candidate; ownership must avoid fontanero cannibalization.' };
  }

  if (/(bajante|bajantes|arqueta|arquetas|colector|colectores|alcantarill|fosa|septica|séptica|comunidad|comunidades|restaurante|separador|grasas|cuba|camion|camión|camara|cámara|inspeccion|inspección|hidrocurado|alta presion|alta presión|limpieza tuber|limpieza de tuber|limpiar tuber)/.test(k)) {
    return { bucket: 'future-candidate', target: 'professional-blockages', reason: 'Professional desatascos child/service-section candidate.' };
  }

  if (/(desatasc|desatranc|desator|desatoro|desatascador)/.test(k)) {
    return { bucket: 'approved-target', target: 'desatascos-hub', reason: 'Core commercial desatascos demand.' };
  }

  return { bucket: 'needs-review', target: seedTarget || 'needs-review', reason: 'No deterministic rule matched.' };
}

function top(items: any[], count = 25): any[] {
  return [...items]
    .sort((a, b) => (b.volume || 0) - (a.volume || 0) || (b.cpc || 0) - (a.cpc || 0))
    .slice(0, count);
}

function main(): void {
  const summaryPath = path.resolve(ROOT, getArg(process.argv.slice(2), '--summary') || latestExecuteSummary());
  const summary = readJson(summaryPath);
  const seedTargets = new Map(summary.rows.map((row: any) => [row.seed, row.target]));

  const normalizedFiles = new Map<string, string>();
  for (const result of summary.results || []) {
    if (result.normalizedPath) {
      normalizedFiles.set(result.seed, path.join(ROOT, result.normalizedPath));
      continue;
    }
    const latest = latestFileForSeed(result.seed);
    if (latest) normalizedFiles.set(result.seed, latest);
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
    targets[target].topKeywords = top(targets[target].topKeywords, 15);
  }

  const review = {
    source: 'desatascos-semantic-review',
    generatedAt: new Date().toISOString(),
    summaryFile: path.relative(ROOT, summaryPath),
    seedFile: summary.seedsFile,
    sourceFiles: [...sourceFiles].sort(),
    counts: {
      seeds: summary.count,
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
      Object.entries(buckets).map(([bucket, rows]: any) => [bucket, top(rows, 40)])
    ),
    targets,
    allKeywords: top(all, all.length),
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}-desatascos-dataforseo-review.json`);
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
  console.error(`Desatascos semantic analysis failed: ${error.message}`);
  process.exit(1);
}
