#!/usr/bin/env ts-node
// @ts-nocheck

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const AHREFS_DIR = path.join(ROOT, '.tmp', 'ahrefs');
const OUT_DIR = path.join(ROOT, '.tmp', 'semantic-review');

function readJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function slugify(seed: string): string {
  return String(seed)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function latestExecuteSummary(): string {
  const dir = path.join(ROOT, '.tmp', 'semantic-collection', 'dataforseo');
  const files = fs.readdirSync(dir)
    .filter((file: string) => file.startsWith('execute-limpieza-tuberias-') && file.endsWith('.json'))
    .map((file: string) => {
      const fullPath = path.join(dir, file);
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs };
    })
    .sort((a: any, b: any) => b.mtime - a.mtime);
  if (!files[0]) throw new Error('No execute-limpieza-tuberias summary found.');
  return files[0].fullPath;
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

function clean(value: string): string {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

const cityTerms = ['madrid', 'barcelona', 'valencia', 'sevilla', 'zaragoza', 'malaga'];
const districtTerms = [
  'centro', 'salamanca', 'chamberi', 'retiro', 'chamartin', 'arganzuela', 'tetuan',
  'ciutat vella', 'eixample', 'gracia', 'sants', 'sarria', 'poblenou',
  'ruzafa', 'russafa', 'extramurs', 'campanar', 'poblats maritims',
  'casco antiguo', 'triana', 'nervion', 'macarena', 'sur',
  'delicias', 'universidad', 'san jose', 'actur',
  'este', 'ciudad jardin', 'teatinos', 'carretera de cadiz'
];

function includesAny(keyword: string, terms: string[]): boolean {
  return terms.some((term) => keyword.includes(term));
}

function classify(keyword: string, seedTarget: string): any {
  const k = clean(keyword);

  if (/(empleo|trabajo|curso|fp|pdf|manual|amazon|leroy|bricomart|bauhaus|mercadona|producto|maquina casera|casero barato|comprar|alquiler maquinaria|sosa|bicarbonato|vinagre)/.test(k)) {
    if (/(como|limpiar|olor|prevenir|cada cuanto|que es|por que)/.test(k)) {
      return { bucket: 'content-opportunity', target: 'blog-limpieza-tuberias', reason: 'Informational/blog intent with DIY or prevention angle.' };
    }
    return { bucket: 'rejected', target: 'rejected', reason: 'Product, employment or low commercial fit.' };
  }

  if (/(como |cómo |cada cuanto|que es|qué es|por que|por qué|prevenir|mal olor|olor tuber|mantener|consejos|guia|guía)/.test(k)) {
    return { bucket: 'content-opportunity', target: 'blog-limpieza-tuberias', reason: 'Informational/blog intent.' };
  }

  if (/(precio|precios|tarifa|tarifas|cuanto cuesta|cuánto cuesta|coste|costo|presupuesto)/.test(k)) {
    return { bucket: 'commercial-support', target: 'pricing-faq', reason: 'Price/FAQ support.' };
  }

  if (includesAny(k, cityTerms) || includesAny(k, districtTerms) || k.includes('cerca de mi')) {
    return { bucket: 'geo-intent', target: includesAny(k, districtTerms) ? 'district-layer' : 'city-layer', reason: 'Geo modifier detected.' };
  }

  if (/(bajante|bajantes)/.test(k)) {
    return { bucket: 'commercial-page', target: 'limpieza-bajantes', reason: 'Bajantes/community vertical pipes service.' };
  }

  if (/(arqueta|arquetas|colector|colectores|alcantarillado|acometida|saneamiento)/.test(k)) {
    return { bucket: 'commercial-page', target: 'limpieza-arquetas-colectores', reason: 'Arquetas, collectors and private sewer network service.' };
  }

  if (/(camion cuba|camión cuba|cuba|alta presion|alta presión|hidrocurado|agua a presion|agua a presión)/.test(k)) {
    return { bucket: 'commercial-page', target: 'limpieza-alta-presion-camion-cuba', reason: 'High-pressure/cuba method service.' };
  }

  if (/(camara|cámara|videoinspeccion|videoinspección|inspeccion|inspección|cctv|diagnostico|diagnóstico)/.test(k)) {
    return { bucket: 'commercial-page', target: 'inspeccion-camara-tuberias', reason: 'Camera inspection and diagnosis service.' };
  }

  if (/(restaurante|restaurantes|hotel|hoteles|hosteleria|hostelería|empresa|empresas|cocina industrial|separador|grasas)/.test(k)) {
    return { bucket: 'commercial-page', target: 'limpieza-tuberias-empresas', reason: 'B2B/hostelry service.' };
  }

  if (/(comunidad|comunidades|vecinos|edificio|edificios)/.test(k)) {
    return { bucket: 'commercial-page', target: 'limpieza-tuberias-comunidades', reason: 'Community/building maintenance service.' };
  }

  if (/(limpieza tuber|limpieza de tuber|limpiar tuber|mantenimiento tuber)/.test(k)) {
    return { bucket: 'covered-hub', target: 'limpieza-tuberias-hub', reason: 'Core hub demand.' };
  }

  if (/(desatasc|atasc|wc|fregadero|lavabo|ducha|inodoro)/.test(k)) {
    return { bucket: 'rejected', target: 'desatascos-or-fontanero', reason: 'Owned by desatascos/fontanero, not limpieza-tuberias preventive category.' };
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
      const keyword = clean(item.keyword);
      if (!keyword) continue;
      const row = {
        keyword,
        volume: item.volume ?? 0,
        cpc: item.cpc ?? null,
        competition: item.competition ?? null,
        seed,
        seedTarget: seedTargets.get(seed) || null,
        sourceFile: path.relative(ROOT, filePath),
        ...classify(keyword, seedTargets.get(seed)),
      };
      const existing = rowsByKeyword.get(keyword);
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
    targets[target].topKeywords = top(targets[target].topKeywords, 25);
  }

  const review = {
    source: 'limpieza-tuberias-semantic-review',
    generatedAt: new Date().toISOString(),
    summaryFile: path.relative(ROOT, summaryPath),
    seedFile: summary.seedsFile,
    sourceFiles: [...sourceFiles].sort(),
    counts: {
      seeds: summary.count,
      normalizedFiles: normalizedFiles.size,
      uniqueKeywords: all.length,
      coveredHub: buckets['covered-hub']?.length || 0,
      commercialPage: buckets['commercial-page']?.length || 0,
      geoIntent: buckets['geo-intent']?.length || 0,
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
  const outPath = path.join(OUT_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}-limpieza-tuberias-review.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8');

  console.log(`Review saved: ${path.relative(ROOT, outPath)}`);
  console.log(JSON.stringify(review.counts, null, 2));
  console.log('\nTop targets:');
  Object.entries(targets)
    .sort(([, a]: any, [, b]: any) => b.totalVolume - a.totalVolume)
    .slice(0, 15)
    .forEach(([target, data]: any) => {
      console.log(`- ${target}: ${data.count} keywords, volume ${data.totalVolume}`);
      data.topKeywords.slice(0, 8).forEach((row: any) => {
        console.log(`  ${row.keyword} | vol ${row.volume || 0} | cpc ${row.cpc ?? '-'}`);
      });
    });
}

try {
  main();
} catch (error: any) {
  console.error(`Limpieza tuberias semantic analysis failed: ${error.message}`);
  process.exit(1);
}
