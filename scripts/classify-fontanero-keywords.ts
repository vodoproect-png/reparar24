#!/usr/bin/env ts-node
// @ts-nocheck
/**
 * Fontanero Keyword Classifier (REVIEW MODE)
 *
 * Reads normalized keyword-provider exports from .tmp/ahrefs and classifies
 * fontanero terms into the approved semantic territories.
 *
 * SAFETY:
 * - Does NOT modify production SEO files
 * - Writes review output only to .tmp/semantic-review
 */

const fs = require('fs');
const path = require('path');

type Bucket = 'approved-target' | 'future-candidate' | 'cross-service' | 'content-opportunity' | 'geo-intent' | 'rejected' | 'needs-review';

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function showHelp(): void {
  console.log('Fontanero Keyword Classifier');
  console.log('============================\n');
  console.log('USAGE:');
  console.log('  ts-node scripts/classify-fontanero-keywords.ts --since-minutes 60');
  console.log('  ts-node scripts/classify-fontanero-keywords.ts --input .tmp/ahrefs/file.json\n');
  console.log('OPTIONS:');
  console.log('  --input <path>          Single normalized JSON input');
  console.log('  --input-dir <path>      Directory, default .tmp/ahrefs');
  console.log('  --since-minutes <n>     Include files modified in last n minutes');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function readJson(filePath: string): any {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function getInputFiles(options: any): string[] {
  if (options.input) {
    const fullPath = path.isAbsolute(options.input) ? options.input : path.join(process.cwd(), options.input);
    if (!fs.existsSync(fullPath)) throw new Error(`Input file not found: ${options.input}`);
    return [fullPath];
  }

  const dir = path.isAbsolute(options.inputDir) ? options.inputDir : path.join(process.cwd(), options.inputDir);
  if (!fs.existsSync(dir)) throw new Error(`Input directory not found: ${options.inputDir}`);
  const sinceMs = Date.now() - options.sinceMinutes * 60 * 1000;

  return fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json') && file.includes('dataforseo'))
    .map((file: string) => path.join(dir, file))
    .filter((filePath: string) => fs.statSync(filePath).mtimeMs >= sinceMs)
    .sort();
}

function extractRows(files: string[]): any[] {
  const rows: any[] = [];
  for (const filePath of files) {
    const data = readJson(filePath);
    const keywords = Array.isArray(data.raw?.keywords) ? data.raw.keywords : [];
    for (const row of keywords) {
      if (!row?.keyword) continue;
      rows.push({
        keyword: String(row.keyword).trim(),
        volume: row.volume ?? null,
        difficulty: row.difficulty ?? null,
        cpc: row.cpc ?? null,
        competition: row.competition ?? null,
        seed: data.seed,
        sourceFile: path.relative(process.cwd(), filePath),
      });
    }
  }
  return rows;
}

function dedupeRows(rows: any[]): any[] {
  const byKeyword = new Map<string, any>();
  for (const row of rows) {
    const key = normalizeText(row.keyword).trim();
    const current = byKeyword.get(key);
    if (!current || Number(row.volume || 0) > Number(current.volume || 0)) {
      byKeyword.set(key, row);
    }
  }
  return Array.from(byKeyword.values());
}

const REJECT_RULES = [
  { pattern: /\b(leroy merlin|bricomart|bricodepot|amazon|ikea|bauhaus|mano ?mano|tienda|comprar|catalogo|catalogo|segunda mano|precio termo electrico|termo electrico (50|80|100|150) litros)\b/i, reason: 'Product, retailer or shopping intent, not service landing-page intent' },
  { pattern: /\b(curso|formacion|fp|trabajo|empleo|sueldo|salario|convenio|autonomo|oferta)\b/i, reason: 'Education, employment or labor-market intent' },
  { pattern: /\b(fontanero mario|super mario|juego|fontanero pelicula)\b/i, reason: 'Entertainment/navigation intent' },
];

const CONTENT_OPPORTUNITY_RULES = [
  {
    target: 'blog-fontaneria',
    contentType: 'how-to-guide',
    pattern: /\b(como|que hacer|por que|porque|guia|tutorial|consejos?|limpiar|evitar|solucion casera|sin romper|sin obras|paso a paso)\b/i,
    reason: 'Informational/DIY intent; preserve for future blog or guide content, not service landing pages',
  },
  {
    target: 'blog-fontaneria',
    contentType: 'reference-guide',
    pattern: /\b(que es|significado|definicion|wikipedia|pdf|manual|normativa|partes de|herramientas?)\b/i,
    reason: 'Reference/document intent; preserve for future content review instead of rejecting outright',
  },
];

const CROSS_SERVICE_RULES = [
  {
    ownerService: 'desatascos',
    target: 'desatascos',
    pattern: /\b(desatasc\w*|atasco\w*|atascad\w*|atascar|tuberia obstruida|bajante atascad\w*|arqueta\w*|camion cuba|camiones cuba|cuba desatascos|(?:fregadero\w*|wc|inodoro\w*).{0,24}atasc\w*|atasc\w*.{0,24}(?:fregadero\w*|wc|inodoro\w*))\b/i,
    reason: 'Owned by top-level /desatascos service; keep out of automatic fontanero child promotion',
  },
];

const FUTURE_CANDIDATE_RULES = [
  {
    target: 'grifos',
    pattern: /\b(grifo\w*|monomando\w*)\b/i,
    reason: 'Specific faucet repair/installation demand; review as possible child page or installations subsection',
  },
  {
    target: 'cisternas-inodoros',
    pattern: /\b(cisterna\w*|inodoro\w*|wc|retrete\w*|mecanismo cisterna|descarga\w*)\b/i,
    reason: 'Specific toilet/cistern repair demand; review as possible child page or installations subsection',
  },
  {
    target: 'duchas-lavabos',
    pattern: /\b(ducha\w*|plato de ducha|lavabo\w*|mampara\w*)\b/i,
    reason: 'Specific bathroom fixture demand; review as possible child page or installations subsection',
  },
  {
    target: 'bombas-grupos-presion',
    pattern: /\b(bomba\w* de agua|grupo\w* de presion|grupo presion|presurizador\w*)\b/i,
    reason: 'Water pump or pressure group service demand; review commercial viability',
  },
  {
    target: 'descalcificadores-osmosis',
    pattern: /\b(descalcificador\w*|osmosis|filtro\w* de agua|filtracion de agua)\b/i,
    reason: 'Water treatment equipment demand; review as possible specialized plumbing child',
  },
];

const TARGET_RULES = [
  { target: 'reparacion-fugas', pattern: /\b(fuga\w*|escape de agua|perdida de agua|detectar fuga|detector de fuga\w*|humedad\w*|gotera\w*|geofono\w*|localizar fuga)\b/i, reason: 'Water leak detection or repair service intent' },
  { target: 'calentadores-termos', pattern: /\b(termo\w*|calentador\w*|agua caliente|caldera de agua|calentador gas|calentador de gas)\b/i, reason: 'Water heater or hot-water equipment service intent' },
  { target: 'mantenimiento', pattern: /\b(mantenimiento\w*|revision\w*|preventivo\w*|contrato\w*|comunidad\w*|administrador\w*|empresa mantenimiento)\b/i, reason: 'Preventive maintenance or recurring service intent' },
  { target: 'instalaciones', pattern: /\b(instalacion\w*|instalar|instalador\w*|montar|grifo\w*|sanitario\w*|bano\w*|ducha\w*|lavabo\w*|cisterna\w*)\b/i, reason: 'Plumbing installation service intent' },
  { target: 'sustitucion-tuberias', pattern: /\b(sustitucion tuberia\w*|sustituir tuberia\w*|cambio tuberia\w*|cambiar tuberia\w*|renovar tuberia\w*|renovacion tuberia\w*|bajante\w*|tuberias antiguas|plomo|multicapa)\b/i, reason: 'Pipe replacement or renovation intent' },
  { target: 'fontanero', pattern: /\b(fontanero\w*|fontaneria\w*)\b/i, reason: 'Generic plumber service intent mapped to hub' },
];

function classify(row: any): any {
  const keyword = normalizeText(row.keyword);

  for (const rule of REJECT_RULES) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'rejected' as Bucket, reason: rule.reason };
    }
  }

  for (const rule of CONTENT_OPPORTUNITY_RULES) {
    if (rule.pattern.test(keyword)) {
      return {
        ...row,
        bucket: 'content-opportunity' as Bucket,
        target: rule.target,
        contentType: rule.contentType,
        reason: rule.reason,
      };
    }
  }

  for (const rule of CROSS_SERVICE_RULES) {
    if (rule.pattern.test(keyword)) {
      return {
        ...row,
        bucket: 'cross-service' as Bucket,
        ownerService: rule.ownerService,
        target: rule.target,
        reason: rule.reason,
      };
    }
  }

  for (const rule of FUTURE_CANDIDATE_RULES) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'future-candidate' as Bucket, target: rule.target, reason: rule.reason };
    }
  }

  for (const rule of TARGET_RULES) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'approved-target' as Bucket, target: rule.target, reason: rule.reason };
    }
  }

  if (/\b(madrid|barcelona|valencia|sevilla|zaragoza|malaga|alicante|castellon|paterna|mislata|torrent|catarroja|paiporta|sagunto|burjassot)\b/i.test(keyword)) {
    return { ...row, bucket: 'geo-intent' as Bucket, target: 'fontanero-geo', reason: 'Geo-modified plumber intent; useful for city/district layer review' };
  }

  return { ...row, bucket: 'needs-review' as Bucket, reason: 'No deterministic fontanero rule matched' };
}

function summarize(classified: any[]): any {
  const byTarget: Record<string, number> = {};
  for (const row of classified) {
    if (row.target) byTarget[row.target] = (byTarget[row.target] || 0) + 1;
  }

  return {
    total: classified.length,
    approvedTarget: classified.filter(row => row.bucket === 'approved-target').length,
    futureCandidate: classified.filter(row => row.bucket === 'future-candidate').length,
    crossService: classified.filter(row => row.bucket === 'cross-service').length,
    contentOpportunity: classified.filter(row => row.bucket === 'content-opportunity').length,
    geoIntent: classified.filter(row => row.bucket === 'geo-intent').length,
    rejected: classified.filter(row => row.bucket === 'rejected').length,
    needsReview: classified.filter(row => row.bucket === 'needs-review').length,
    byTarget,
  };
}

function main(): void {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const options = {
    input: getArg(args, '--input'),
    inputDir: getArg(args, '--input-dir') || '.tmp/ahrefs',
    sinceMinutes: Number(getArg(args, '--since-minutes') || 60),
  };

  const files = getInputFiles(options);
  const rows = dedupeRows(extractRows(files));
  const classified = rows.map(classify).sort((a, b) => Number(b.volume || 0) - Number(a.volume || 0));

  const grouped = {
    approvedTarget: classified.filter(row => row.bucket === 'approved-target'),
    futureCandidate: classified.filter(row => row.bucket === 'future-candidate'),
    crossService: classified.filter(row => row.bucket === 'cross-service'),
    contentOpportunity: classified.filter(row => row.bucket === 'content-opportunity'),
    geoIntent: classified.filter(row => row.bucket === 'geo-intent'),
    rejected: classified.filter(row => row.bucket === 'rejected'),
    needsReview: classified.filter(row => row.bucket === 'needs-review'),
  };

  const result = {
    source: 'fontanero-dataforseo-classifier',
    service: 'fontanero',
    classifiedAt: new Date().toISOString(),
    inputFiles: files.map(file => path.relative(process.cwd(), file)),
    summary: summarize(classified),
    grouped,
  };

  const outDir = path.join(process.cwd(), '.tmp', 'semantic-review');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${new Date().toISOString().replace(/[:.]/g, '-')}-fontanero-dataforseo-review.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  console.log('Fontanero Classification Summary');
  console.log('=================================');
  console.log(`Input files:      ${files.length}`);
  console.log(`Unique keywords:  ${result.summary.total}`);
  console.log(`Approved target:  ${result.summary.approvedTarget}`);
  console.log(`Future candidate: ${result.summary.futureCandidate}`);
  console.log(`Cross-service:    ${result.summary.crossService}`);
  console.log(`Content opps:     ${result.summary.contentOpportunity}`);
  console.log(`Geo intent:       ${result.summary.geoIntent}`);
  console.log(`Rejected:         ${result.summary.rejected}`);
  console.log(`Needs review:     ${result.summary.needsReview}`);
  console.log(`Targets:          ${Object.entries(result.summary.byTarget).map(([key, value]) => `${key}=${value}`).join(', ')}`);
  console.log(`Saved:            ${path.relative(process.cwd(), outPath)}`);
}

try {
  main();
} catch (error: any) {
  console.error(`Classification failed: ${error.message}`);
  process.exit(1);
}
