#!/usr/bin/env ts-node
// @ts-nocheck

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const AHREFS_DIR = path.join(ROOT, '.tmp', 'ahrefs')
const OUT_DIR = path.join(ROOT, '.tmp', 'semantic-review')
const SEED_PATHS = [
  path.join(ROOT, 'scripts', 'dataforseo-aire-acondicionado-seeds.json'),
  path.join(ROOT, 'scripts', 'dataforseo-aire-acondicionado-wave2-seeds.json'),
]

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
}

function slugify(seed) {
  return String(seed)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function latestFileForSeed(seed) {
  const suffix = `dataforseo-${slugify(seed)}.json`
  if (!fs.existsSync(AHREFS_DIR)) return null
  const files = fs.readdirSync(AHREFS_DIR)
    .filter((file) => file.endsWith(suffix))
    .map((file) => {
      const fullPath = path.join(AHREFS_DIR, file)
      return { fullPath, mtime: fs.statSync(fullPath).mtimeMs }
    })
    .sort((a, b) => b.mtime - a.mtime)
  return files[0]?.fullPath || null
}

function cleanKeyword(value) {
  return String(value || '').toLowerCase().trim().replace(/\s+/g, ' ')
}

function isProductOrMarketplace(k) {
  return /(amazon|leroy|bricomart|bauhaus|carrefour|media markt|mediamarkt|segunda mano|wallapop|manual|pdf|curso|empleo|trabajo|foro|youtube|gratis|alquiler|oferta|ofertas|comprar|barato|barata|portatil|portátil|pinguino|pingüino|ventilador|purificador|caravana|coche|auto|automovil|vehiculo|mitsubishi|daikin|fujitsu|haier|hisense|toshiba|carrier|panasonic|samsung|lg|kosner|daitsu)/.test(k)
}

function classify(keyword, seedTarget) {
  const k = cleanKeyword(keyword)

  if (isProductOrMarketplace(k)) {
    return { bucket: 'rejected', target: 'rejected', reason: 'Product, marketplace, brand, vehicle, DIY or weak service intent.' }
  }

  if (/(como |cómo |por que|por qué|que hacer|qué hacer|cada cuanto|temperatura|consume mucho|inverter que es|que es|qué es|frigorias|frigorías|ahorrar|consejos|limpiar filtros|limpieza filtros|diferencia|mejor|comparativa|ventajas)/.test(k)) {
    return { bucket: 'content-opportunity', target: 'blog-aire-acondicionado', reason: 'Informational/blog intent.' }
  }

  if (/(madrid|barcelona|valencia|sevilla|malaga|málaga|zaragoza|alicante|murcia|bilbao|granada|cordoba|córdoba|centro|salamanca|chamberi|chamartin|retiro|arganzuela|tetuan|eixample|gracia|sants|sarria|poblenou|ruzafa|russafa|triana|nervion|macarena|teatinos|delicias|universidad|san jose|actur|cerca de mi)/.test(k)) {
    return { bucket: 'geo-intent', target: 'geo-layer', reason: 'Geo modifier detected.' }
  }

  if (/(precio|precios|tarifa|tarifas|cuanto cuesta|cuánto cuesta|coste|costo|presupuesto|cuanto vale|cuánto vale|cuanto sale|cuánto sale)/.test(k)) {
    return { bucket: 'commercial-support', target: 'pricing-faq', reason: 'Price/FAQ commercial support.' }
  }

  if (/(preinstalacion|preinstalación|pre instalacion|pre instalación)/.test(k)) {
    return { bucket: 'commercial-review', target: 'preinstalacion', reason: 'Pre-installation service intent.' }
  }

  if (/(cassette|split de techo|techo)/.test(k) && /(aire|climatizacion|climatización|split|cassette)/.test(k)) {
    return { bucket: 'commercial-review', target: 'cassette-techo', reason: 'Cassette/ceiling system intent.' }
  }

  if (/(bomba de calor|frio calor|frío calor)/.test(k) && /(aire|split|climatizacion|climatización|instalacion|reparacion|mantenimiento)/.test(k)) {
    return { bucket: 'commercial-review', target: 'bomba-calor', reason: 'Heat pump / reversible climate intent.' }
  }

  if (/(limpieza|limpiar|desinfeccion|desinfección|mal olor)/.test(k) && /(conductos|rejillas|climatizacion|climatización)/.test(k)) {
    return { bucket: 'commercial-review', target: 'limpieza-conductos', reason: 'Duct cleaning and maintenance intent.' }
  }

  if (/(local comercial|oficina|comunidad|comunidades|empresa|negocio)/.test(k) && /(aire acondicionado|climatizacion|climatización)/.test(k)) {
    return { bucket: 'commercial-review', target: 'local-oficina-comunidad', reason: 'B2B/local/community intent.' }
  }

  if (/(multisplit|multi split|2x1|3x1|doble split|dos splits|split)/.test(k)) {
    return { bucket: 'covered-existing', target: 'instalacion-split', reason: 'Covered by split/multisplit child page.' }
  }

  if (/(conductos)/.test(k)) {
    return { bucket: 'covered-existing', target: 'aire-acondicionado-conductos', reason: 'Covered by conductos child page.' }
  }

  if (/(carga gas|recarga gas|fuga gas|gas refrigerante|r32|r410|detectar fuga)/.test(k)) {
    return { bucket: 'covered-existing', target: 'carga-gas-aire-acondicionado', reason: 'Covered by gas/refrigerant child page.' }
  }

  if (/(mantenimiento|revision|revisión|limpieza|puesta a punto|contrato mantenimiento)/.test(k) && /(aire acondicionado|climatizacion|climatización|split)/.test(k)) {
    return { bucket: 'covered-existing', target: 'mantenimiento-aire-acondicionado', reason: 'Covered by maintenance child page.' }
  }

  if (/(reparacion|reparación|reparar|averia|avería|no enfria|no enfría|pierde agua|gotea|tira agua|hace ruido|huele mal|no enciende|no arranca|se apaga|se congela|hace hielo|no funciona|salta diferencial|error|compresor)/.test(k)) {
    return { bucket: 'covered-existing', target: 'reparacion-aire-acondicionado', reason: 'Covered by repair child page.' }
  }

  if (/(instalacion|instalación|instalar|instalador|montaje|montar)/.test(k) && /(aire acondicionado|split|multisplit|conductos|climatizacion|climatización)/.test(k)) {
    return { bucket: 'covered-existing', target: 'instalacion-aire-acondicionado', reason: 'Covered by installation child page.' }
  }

  if (/(aire acondicionado|climatizacion|climatización|tecnico aire|técnico aire)/.test(k)) {
    return { bucket: 'covered-existing', target: 'aire-acondicionado-hub', reason: 'Covered by hub.' }
  }

  return { bucket: 'needs-review', target: seedTarget || 'needs-review', reason: 'No deterministic rule matched.' }
}

function top(items, count = 25) {
  return [...items]
    .sort((a, b) => (b.volume || 0) - (a.volume || 0) || (b.cpc || 0) - (a.cpc || 0))
    .slice(0, count)
}

const seedRows = SEED_PATHS.flatMap((seedPath) => {
  const seedList = readJson(seedPath)
  return (seedList.groups || []).flatMap((group) =>
    (group.seeds || []).map((seed) => ({ seed, target: group.target, seedFile: path.relative(ROOT, seedPath) }))
  )
})

const rowsByKeyword = new Map()
const sourceFiles = new Set()
let normalizedFiles = 0

for (const row of seedRows) {
  const filePath = latestFileForSeed(row.seed)
  if (!filePath) continue
  normalizedFiles += 1
  sourceFiles.add(path.relative(ROOT, filePath))
  const file = readJson(filePath)
  for (const item of file.raw?.keywords || []) {
    const keyword = cleanKeyword(item.keyword)
    if (!keyword) continue
    const classified = classify(keyword, row.target)
    const out = {
      keyword,
      volume: item.volume ?? 0,
      cpc: item.cpc ?? null,
      competition: item.competition ?? null,
      seed: row.seed,
      seedTarget: row.target,
      seedFile: row.seedFile,
      sourceFile: path.relative(ROOT, filePath),
      ...classified,
    }
    const existing = rowsByKeyword.get(keyword)
    if (!existing || (out.volume || 0) > (existing.volume || 0) || ((out.volume || 0) === (existing.volume || 0) && (out.cpc || 0) > (existing.cpc || 0))) {
      rowsByKeyword.set(keyword, out)
    }
  }
}

const all = [...rowsByKeyword.values()]
const buckets = all.reduce((acc, row) => {
  acc[row.bucket] ||= []
  acc[row.bucket].push(row)
  return acc
}, {})
const targets = all.reduce((acc, row) => {
  acc[row.target] ||= { count: 0, totalVolume: 0, topKeywords: [] }
  acc[row.target].count += 1
  acc[row.target].totalVolume += row.volume || 0
  acc[row.target].topKeywords.push(row)
  return acc
}, {})
for (const target of Object.keys(targets)) {
  targets[target].topKeywords = top(targets[target].topKeywords, 30)
}

const candidateTargets = ['bomba-calor', 'cassette-techo', 'preinstalacion', 'limpieza-conductos', 'local-oficina-comunidad']
const candidateSummary = Object.fromEntries(candidateTargets.map((target) => {
  const rows = all.filter((row) => row.target === target)
  return [target, {
    count: rows.length,
    totalVolume: rows.reduce((sum, row) => sum + (row.volume || 0), 0),
    topKeywords: top(rows, 20),
  }]
}))

const review = {
  source: 'aire-acondicionado-expanded-semantic-review',
  generatedAt: new Date().toISOString(),
  seedFiles: SEED_PATHS.map((seedPath) => path.relative(ROOT, seedPath)),
  sourceFiles: [...sourceFiles].sort(),
  counts: {
    seeds: seedRows.length,
    normalizedFiles,
    uniqueKeywords: all.length,
    coveredExisting: buckets['covered-existing']?.length || 0,
    commercialReview: buckets['commercial-review']?.length || 0,
    commercialSupport: buckets['commercial-support']?.length || 0,
    geoIntent: buckets['geo-intent']?.length || 0,
    contentOpportunity: buckets['content-opportunity']?.length || 0,
    needsReview: buckets['needs-review']?.length || 0,
    rejected: buckets.rejected?.length || 0,
  },
  candidateSummary,
  targets,
  topByBucket: Object.fromEntries(Object.entries(buckets).map(([bucket, rows]) => [bucket, top(rows, 80)])),
  allKeywords: top(all, all.length),
}

fs.mkdirSync(OUT_DIR, { recursive: true })
const outPath = path.join(OUT_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}-aire-acondicionado-expanded-review.json`)
fs.writeFileSync(outPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8')

console.log(`Expanded review saved: ${path.relative(ROOT, outPath)}`)
console.log(JSON.stringify(review.counts, null, 2))
console.log('\nCommercial candidates:')
for (const [target, data] of Object.entries(candidateSummary)) {
  console.log(`- ${target}: ${data.count} keywords, volume ${data.totalVolume}`)
  data.topKeywords.slice(0, 8).forEach((row) => console.log(`  ${row.keyword} | vol ${row.volume || 0} | bucket ${row.bucket}`))
}
