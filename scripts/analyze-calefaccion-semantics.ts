#!/usr/bin/env ts-node
// @ts-nocheck

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const AHREFS_DIR = path.join(ROOT, '.tmp', 'ahrefs')
const OUT_DIR = path.join(ROOT, '.tmp', 'semantic-review')
const SEED_PATHS = [
  path.join(ROOT, 'scripts', 'dataforseo-calefaccion-seeds.json'),
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
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function isRejected(k) {
  return /(amazon|leroy|bricomart|bauhaus|carrefour|media markt|mediamarkt|wallapop|segunda mano|manual|pdf|curso|empleo|trabajo|foro|youtube|gratis|oferta|ofertas|comprar|barato|barata|brico|bricolaje|camper|caravana|coche|auto|vehiculo|portatil|calefactor|estufa|chimenea|pellet|pellets|radiador electrico|radiadores electricos|radiador de aceite|radiadores de aceite|emisor termico|emisores termicos|toallero electrico|manta electrica|brasero|termoestufa|bioetanol|leña|lena|butano|parafina|honeywell|siemens|orkli|netatmo|tado|garza|baxi|vaillant|junkers|saunier duval|ferroli|ariston|roca|cointra|bosch|thermor|orbegozo|cecotec|xiaomi)/.test(k)
}

function isInfo(k) {
  return /(como |por que|porque |que hacer|cada cuanto|cuando |temperatura|consume|consumo|ahorrar|consejos|que es|funciona|funcionan|diferencia|mejor|comparativa|ventajas|inconvenientes|normativa|obligatorio|recomendad|guia|calcular|potencia|purgar radiadores|baja la presion|no calienta)/.test(k)
}

function isGeo(k) {
  return /(madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante|murcia|bilbao|granada|cordoba|centro|salamanca|chamberi|chamartin|retiro|arganzuela|tetuan|eixample|gracia|sants|sarria|poblenou|ciutat vella|ruzafa|russafa|triana|nervion|macarena|teatinos|delicias|universidad|san jose|actur|cerca de mi)/.test(k)
}

function isPrice(k) {
  return /(precio|precios|tarifa|tarifas|cuanto cuesta|coste|costo|presupuesto|cuanto vale|cuanto sale)/.test(k)
}

function classify(keyword, seedTarget) {
  const k = cleanKeyword(keyword)

  if (isRejected(k)) {
    return { bucket: 'rejected', target: 'rejected', reason: 'Product, marketplace, brand, DIY or weak service intent.' }
  }

  if (isInfo(k)) {
    return { bucket: 'content-opportunity', target: 'blog-calefaccion', reason: 'Informational/blog intent.' }
  }

  if (isGeo(k)) {
    return { bucket: 'geo-intent', target: 'geo-layer', reason: 'Geo modifier detected.' }
  }

  if (isPrice(k)) {
    return { bucket: 'commercial-support', target: 'pricing-faq', reason: 'Price/FAQ commercial support.' }
  }

  if (/(caldera|calderas)/.test(k) && /(reparacion|reparar|tecnico|servicio tecnico|averia|no funciona|no enciende|pierde agua|hace ruido|baja presion|presion baja|error|fallo|urgencia)/.test(k)) {
    return { bucket: 'commercial-review', target: 'reparacion-calderas', reason: 'Boiler repair/service intent.' }
  }

  if (/(mantenimiento|revision|certificado|contrato|puesta a punto|limpieza)/.test(k) && /(caldera|calefaccion|gas)/.test(k)) {
    return { bucket: 'commercial-review', target: 'mantenimiento-calderas', reason: 'Maintenance/revision intent.' }
  }

  if (/(radiador|radiadores|detentor|valvula)/.test(k)) {
    return { bucket: 'commercial-review', target: 'radiadores-calefaccion', reason: 'Radiator service intent.' }
  }

  if (/(instalacion|instalar|instalador|montaje|montar)/.test(k) && /(calefaccion|radiadores|caldera|gas)/.test(k)) {
    return { bucket: 'commercial-review', target: 'instalacion-calefaccion', reason: 'Heating installation intent.' }
  }

  if (/(suelo radiante)/.test(k)) {
    return { bucket: 'commercial-review', target: 'suelo-radiante', reason: 'Underfloor heating service intent.' }
  }

  if (/(calefaccion central|comunidad|comunidades|sala calderas|vecinos)/.test(k)) {
    return { bucket: 'commercial-review', target: 'calefaccion-central-comunidades', reason: 'Central/community heating intent.' }
  }

  if (/(termostato|valvula termostatica|valvulas termostaticas)/.test(k)) {
    return { bucket: 'commercial-review', target: 'termostatos-valvulas', reason: 'Controls and thermostatic valve intent.' }
  }

  if (/(aerotermia|bomba de calor)/.test(k) && /(calefaccion|radiadores|suelo radiante|instalacion|mantenimiento|reparacion)/.test(k)) {
    return { bucket: 'commercial-review', target: 'aerotermia-calefaccion', reason: 'Aerothermal/heat pump heating intent.' }
  }

  if (/(calefaccion|tecnico calefaccion|servicio calefaccion|empresa calefaccion|reparacion calefaccion|urgente)/.test(k)) {
    return { bucket: 'covered-hub', target: 'calefaccion-hub', reason: 'Covered by calefaccion hub.' }
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
  targets[target].topKeywords = top(targets[target].topKeywords, 40)
}

const commercialTargets = [
  'reparacion-calderas',
  'mantenimiento-calderas',
  'radiadores-calefaccion',
  'instalacion-calefaccion',
  'suelo-radiante',
  'calefaccion-central-comunidades',
  'termostatos-valvulas',
  'aerotermia-calefaccion',
]

const candidateSummary = Object.fromEntries(commercialTargets.map((target) => {
  const rows = all.filter((row) => row.target === target)
  return [target, {
    count: rows.length,
    totalVolume: rows.reduce((sum, row) => sum + (row.volume || 0), 0),
    topKeywords: top(rows, 25),
  }]
}))

const review = {
  source: 'calefaccion-semantic-review',
  generatedAt: new Date().toISOString(),
  seedFiles: SEED_PATHS.map((seedPath) => path.relative(ROOT, seedPath)),
  sourceFiles: [...sourceFiles].sort(),
  counts: {
    seeds: seedRows.length,
    normalizedFiles,
    uniqueKeywords: all.length,
    coveredHub: buckets['covered-hub']?.length || 0,
    commercialReview: buckets['commercial-review']?.length || 0,
    commercialSupport: buckets['commercial-support']?.length || 0,
    geoIntent: buckets['geo-intent']?.length || 0,
    contentOpportunity: buckets['content-opportunity']?.length || 0,
    needsReview: buckets['needs-review']?.length || 0,
    rejected: buckets.rejected?.length || 0,
  },
  candidateSummary,
  targets,
  topByBucket: Object.fromEntries(Object.entries(buckets).map(([bucket, rows]) => [bucket, top(rows, 100)])),
  allKeywords: top(all, all.length),
}

fs.mkdirSync(OUT_DIR, { recursive: true })
const outPath = path.join(OUT_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}-calefaccion-review.json`)
fs.writeFileSync(outPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8')

console.log(`Calefaccion review saved: ${path.relative(ROOT, outPath)}`)
console.log(JSON.stringify(review.counts, null, 2))
console.log('\nCommercial candidates:')
for (const [target, data] of Object.entries(candidateSummary)) {
  console.log(`- ${target}: ${data.count} keywords, volume ${data.totalVolume}`)
  data.topKeywords.slice(0, 8).forEach((row) => console.log(`  ${row.keyword} | vol ${row.volume || 0} | bucket ${row.bucket}`))
}
