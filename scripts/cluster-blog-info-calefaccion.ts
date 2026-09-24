// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory for calefaccion blog topics.
 */

const fs = require('fs')
const path = require('path')

function getArg(args, name, fallback = undefined) {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : fallback
}

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(text) {
  return normalize(text).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 72)
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8'))
}

function isNoise(keyword) {
  const key = normalize(keyword)
  return /\b(amazon|leroy|leroy merlin|bricomart|bauhaus|carrefour|mediamarkt|media markt|ikea|youtube|pdf|manual|foro|opinion|opiniones|trabajo|empleo|curso|segunda mano|wallapop|comprar|barato|barata|oferta|ofertas|brico|bricolaje|camper|caravana|coche|auto|vehiculo|portatil|calefactor|estufa|chimenea|pellet|pellets|radiador electrico|radiadores electricos|radiador de aceite|emisor termico|emisores termicos|toallero electrico|manta electrica|brasero|parafina|butano|baxi|vaillant|junkers|saunier duval|ferroli|ariston|roca|cointra|bosch|netatmo|tado|honeywell|siemens|xiaomi)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|precios|tarifa|coste|cuanto vale|cuanto cobra)\b/.test(normalize(keyword))
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio tecnico|servicio|tecnico|instalador|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(contratar|llamar|reparar|instalar|montar|mantenimiento profesional|revision profesional|cambiar caldera|cambiar radiador)\b/.test(key)
  )
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales|cada cuanto)\b/.test(key) ||
    /\b(causa|causas|sintoma|sintomas|guia|consejo|diagnostico|detectar|saber si|evitar|solucionar|mantenimiento|prevenir|prevencion|no enciende|no arranca|no funciona|no calienta|pierde agua|gotea|ruido|presion|purgar|radiador|radiadores|caldera|termostato|valvula|detentor|suelo radiante|calefaccion central|aerotermia|bomba de calor|temperatura|ahorrar|consume)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []
  if (isNoise(keyword)) flags.push('noise-or-store')
  if (isPriceInfo(keyword)) flags.push('price-intent')
  if (/\b(gas|caldera|combustion|salida de humos|olor a gas|llama|monoxido)\b/.test(key)) flags.push('gas-safety-review')
  if (/\b(presion|valvula|fuga|pierde agua|gotea|vaso expansion)\b/.test(key)) flags.push('hydraulic-safety-review')
  if (/\b(termostato|corriente|electrico|no enciende)\b/.test(key)) flags.push('electrical-safety-review')
  if (/^(instalar|montar|reparar|cambiar|purgar|subir presion)\b/.test(key)) flags.push('diy-or-commercial-review')
  return flags
}

function classify(keyword) {
  if (isNoise(keyword)) return 'needs-review'
  if (isCommercial(keyword)) return 'commercial-backlog'
  if (isInformational(keyword)) return 'informational'
  if (isPriceInfo(keyword)) return 'mixed-price'
  return 'needs-review'
}

function inferOwner(keyword, fallbackTarget, fallbackOwner) {
  const key = normalize(keyword)
  if (/\b(caldera de agua|no enciende|no arranca|no funciona|se bloquea|error|codigo|no calienta agua)\b/.test(key)) return { target: 'caldera-no-enciende', owner: '/calefaccion/reparacion-calderas' }
  if (/\b(presion|pierde presion|baja presion|subir presion|manometro|vaso expansion)\b/.test(key)) return { target: 'presion-caldera', owner: '/calefaccion/reparacion-calderas' }
  if (/\b(pierde agua|gotea|ruido|suena|valvula seguridad)\b/.test(key) && /\bcaldera\b/.test(key)) return { target: 'caldera-pierde-agua-ruido', owner: '/calefaccion/reparacion-calderas' }
  if (/\b(revision|revisar|mantenimiento|obligatoria|limpieza|puesta a punto)\b/.test(key) && /\b(caldera|calefaccion)\b/.test(key)) return { target: 'mantenimiento-revision-caldera', owner: '/calefaccion/mantenimiento-calderas' }
  if (/\b(purgar|radiador frio|radiador no calienta|radiadores no calientan|frio abajo|frio arriba)\b/.test(key)) return { target: 'radiadores-no-calientan', owner: '/calefaccion/radiadores-calefaccion' }
  if (/\b(radiador|valvula|detentor)\b/.test(key) && /\b(pierde agua|fuga|gotea|no funciona|cambiar|regular)\b/.test(key)) return { target: 'radiadores-fugas-valvulas', owner: '/calefaccion/radiadores-calefaccion' }
  if (/\b(cuanto cuesta instalar|precio instalacion|instalar calefaccion|instalacion calefaccion|instalar radiadores|que calefaccion poner)\b/.test(key)) return { target: 'instalacion-calefaccion-coste', owner: '/calefaccion/instalacion-calefaccion' }
  if (/\b(suelo radiante)\b/.test(key)) return { target: 'suelo-radiante', owner: '/calefaccion/suelo-radiante' }
  if (/\b(calefaccion central|comunidad|vecinos|contador individual|sala calderas|equilibrado)\b/.test(key)) return { target: 'calefaccion-central-comunidad', owner: '/calefaccion/calefaccion-central-comunidades' }
  if (/\b(termostato|valvula termostatica|valvulas termostaticas)\b/.test(key)) return { target: 'termostatos-valvulas', owner: '/calefaccion/termostatos-valvulas' }
  if (/\b(aerotermia|bomba de calor|fancoils|acs)\b/.test(key)) return { target: 'aerotermia-calefaccion', owner: '/calefaccion/aerotermia-calefaccion' }
  if (/\b(temperatura|ahorrar|ahorro|consume|consumo|eficiente|encender calefaccion)\b/.test(key)) return { target: 'ahorro-uso-calefaccion', owner: '/calefaccion' }
  return { target: fallbackTarget, owner: fallbackOwner }
}

function clusterKey(keyword, target) {
  const key = normalize(keyword)
  const rules = [
    ['caldera-no-enciende', 'que-hacer-caldera-no-enciende', /\b(que hacer|como solucionar|porque|por que|causa).*\b(caldera).*\b(no enciende|no arranca|no funciona|se bloquea|error)\b|\bcaldera.*\b(no enciende|no arranca|no funciona|se bloquea|error)\b/],
    ['caldera-no-enciende', 'caldera-no-calienta-agua', /\bcaldera.*\b(no calienta agua|sin agua caliente|agua caliente no sale)\b/],
    ['caldera-no-enciende', 'caldera-de-agua-que-es', /\bcaldera de agua\b|\bcaldera.*\bagua\b/],

    ['presion-caldera', 'por-que-baja-presion-caldera', /\b(por que|porque|causa|causas).*\b(baja|pierde).*\bpresion.*\bcaldera\b|\bcaldera.*\b(baja|pierde).*\bpresion\b/],
    ['presion-caldera', 'como-subir-presion-caldera', /\b(como|subir|rellenar|aumentar).*\bpresion.*\bcaldera\b/],
    ['presion-caldera', 'presion-correcta-caldera', /\b(presion correcta|presion ideal|que presion|presion normal).*\bcaldera\b|\bcaldera.*\b(presion correcta|presion ideal|presion normal)\b/],
    ['presion-caldera', 'caldera-sube-mucho-presion', /\bcaldera.*\b(sube|alta|demasiada).*\bpresion\b|\bpresion.*\b(alta|sube).*\bcaldera\b/],

    ['caldera-pierde-agua-ruido', 'caldera-pierde-agua', /\bcaldera.*\b(pierde agua|gotea|fuga|valvula seguridad)\b|\b(pierde agua|gotea|fuga).*\bcaldera\b/],
    ['caldera-pierde-agua-ruido', 'caldera-hace-ruido', /\bcaldera.*\b(ruido|suena|silba|golpes|vibra)\b|\b(ruido|suena).*\bcaldera\b/],

    ['mantenimiento-revision-caldera', 'cada-cuanto-revisar-caldera', /\b(cada cuanto|cuando|frecuencia).*\b(revisar|revision|mantenimiento).*\bcaldera\b/],
    ['mantenimiento-revision-caldera', 'mantenimiento-caldera-obligatorio', /\b(mantenimiento|revision).*\b(caldera).*\b(obligatorio|normativa|legal)\b|\bobligatorio.*\bcaldera\b/],
    ['mantenimiento-revision-caldera', 'que-incluye-mantenimiento-caldera', /\b(que incluye|limpieza|puesta a punto).*\b(mantenimiento|revision).*\bcaldera\b/],
    ['mantenimiento-revision-caldera', 'revision-caldera-gas', /\b(revisar|revision|mantenimiento).*\bcaldera( de)? gas\b|\b(revisar|revision).*\bcaldera\b/],

    ['radiadores-no-calientan', 'como-purgar-radiadores', /\b(como|cuando|purgar|purgado).*\bradiadores?\b|\bradiadores?.*\bpurgar\b/],
    ['radiadores-no-calientan', 'por-que-radiador-no-calienta', /\b(radiador|radiadores).*\b(no calienta|frio|frios|calienta arriba|frio abajo|no calientan)\b|\b(por que|porque).*\bradiador.*\b(no calienta|frio)\b/],
    ['radiadores-no-calientan', 'radiadores-no-calientan-bien', /\bradiadores.*\b(no calientan bien|calientan poco|unos calientan y otros no)\b/],

    ['radiadores-fugas-valvulas', 'radiador-pierde-agua', /\bradiador.*\b(pierde agua|fuga|gotea)\b|\b(fuga|pierde agua).*\bradiador\b/],
    ['radiadores-fugas-valvulas', 'valvula-radiador-no-funciona', /\b(valvula|detentor|llave).*\bradiador.*\b(no funciona|pierde agua|regular|cambiar)\b|\bradiador.*\b(valvula|detentor)\b/],

    ['instalacion-calefaccion-coste', 'cuanto-cuesta-instalar-calefaccion', /\b(cuanto cuesta|precio|coste|tarifa).*\b(instalar|instalacion).*\b(calefaccion|radiadores)\b/],
    ['instalacion-calefaccion-coste', 'que-calefaccion-poner-en-casa', /\b(que calefaccion|mejor calefaccion|calefaccion poner|tipo de calefaccion).*\b(casa|vivienda|piso)\b/],
    ['instalacion-calefaccion-coste', 'calefaccion-por-radiadores-como-funciona', /\b(calefaccion por radiadores|radiadores).*\b(como funciona|funciona)\b/],

    ['suelo-radiante', 'suelo-radiante-ventajas-inconvenientes', /\bsuelo radiante.*\b(ventajas|inconvenientes|desventajas|pros|contras)\b/],
    ['suelo-radiante', 'suelo-radiante-no-calienta', /\bsuelo radiante.*\b(no calienta|frio|problema|averia)\b/],
    ['suelo-radiante', 'suelo-radiante-consumo', /\bsuelo radiante.*\b(consume|consumo|gasta|ahorro)\b/],
    ['suelo-radiante', 'precio-suelo-radiante', /\b(precio|cuanto cuesta|coste|tarifa).*\bsuelo radiante\b|\bsuelo radiante.*\b(precio|cuanto cuesta|coste|tarifa)\b/],
    ['suelo-radiante', 'suelo-radiante-o-radiadores', /\bsuelo radiante.*\bradiadores?\b|\bradiadores?.*\bsuelo radiante\b/],
    ['suelo-radiante', 'suelo-radiante-como-funciona', /\bsuelo radiante.*\b(como funciona|agua|temperatura|mantenimiento)\b/],
    ['suelo-radiante', 'mantenimiento-suelo-radiante', /\b(mantenimiento|limpieza|limpiar).*\bsuelo radiante\b|\bsuelo radiante.*\b(mantenimiento|limpieza|limpiar)\b/],

    ['calefaccion-central-comunidad', 'calefaccion-central-como-funciona', /\bcalefaccion central.*\b(como funciona|que es|funciona)\b/],
    ['calefaccion-central-comunidad', 'calefaccion-central-comunidad-vecinos', /\b(calefaccion central|sala calderas|caldera).*\b(comunidad|vecinos)\b/],
    ['calefaccion-central-comunidad', 'radiadores-frios-calefaccion-central', /\b(radiadores|pisos|viviendas).*\b(frios|no calientan).*\bcentral\b|\bcentral.*\bradiadores.*\b(frios|no calientan)\b/],
    ['calefaccion-central-comunidad', 'contador-individual-calefaccion-central', /\bcontador.*\bcalefaccion central\b|\bcalefaccion central.*\bcontador\b/],
    ['calefaccion-central-comunidad', 'cuando-encienden-calefaccion-central', /\bcuando.*\b(encienden|encender).*\bcalefaccion central\b/],

    ['termostatos-valvulas', 'termostato-calefaccion-como-funciona', /\btermostato.*\b(calefaccion|caldera).*\b(como funciona|funciona|que es)\b/],
    ['termostatos-valvulas', 'termostato-caldera-no-funciona', /\btermostato.*\b(no funciona|no enciende|no conecta|no activa)\b/],
    ['termostatos-valvulas', 'donde-colocar-termostato-calefaccion', /\b(donde colocar|ubicacion|poner).*\btermostato\b/],
    ['termostatos-valvulas', 'valvulas-termostaticas-como-funcionan', /\bvalvulas? termostaticas?.*\b(como funcionan|regular|funcionan|que son)\b/],

    ['aerotermia-calefaccion', 'aerotermia-calefaccion-como-funciona', /\baerotermia.*\b(calefaccion|como funciona|funciona|que es)\b/],
    ['aerotermia-calefaccion', 'aerotermia-con-radiadores', /\baerotermia.*\bradiadores?\b|\bradiadores?.*\baerotermia\b/],
    ['aerotermia-calefaccion', 'aerotermia-o-caldera-gas', /\baerotermia.*\b(caldera|gas|mejor|diferencia)\b|\bcaldera.*\baerotermia\b/],
    ['aerotermia-calefaccion', 'bomba-de-calor-para-calefaccion', /\bbomba de calor.*\b(calefaccion|radiadores|suelo radiante)\b/],
    ['aerotermia-calefaccion', 'precio-aerotermia', /\b(precio|cuanto cuesta|coste|tarifa).*\baerotermia\b|\baerotermia.*\b(precio|cuanto cuesta|coste|tarifa)\b/],
    ['aerotermia-calefaccion', 'aerotermia-agua-caliente-acs', /\b(aerotermia|bomba de calor).*\b(agua caliente|acs|frio calor|fancoils|alta temperatura|piso|casa)\b|\bacs aerotermia\b/],

    ['ahorro-uso-calefaccion', 'temperatura-calefaccion-recomendada', /\btemperatura.*\b(calefaccion|recomendada|ideal|grados)\b/],
    ['ahorro-uso-calefaccion', 'como-ahorrar-calefaccion', /\b(ahorrar|ahorro|consume|consumo|gasta|eficiente|factura).*\bcalefaccion\b/],
    ['ahorro-uso-calefaccion', 'cuando-encender-calefaccion', /\bcuando.*\b(encender|poner).*\bcalefaccion\b/],
    ['ahorro-uso-calefaccion', 'calefaccion-no-calienta-suficiente', /\bcalefaccion.*\b(no calienta|calienta poco|no calienta suficiente)\b/],
  ]

  for (const [ruleTarget, name, pattern] of rules) {
    if (target === ruleTarget && pattern.test(key)) return `${target}:${name}`
  }

  return ''
}

function titleFromCluster(cluster, sampleKeyword) {
  const key = normalize(sampleKeyword)
  if (/^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales|cada cuanto)/.test(key)) {
    return key.charAt(0).toUpperCase() + key.slice(1)
  }
  const label = cluster.split(':')[1].replace(/-/g, ' ')
  return `Guia sobre ${label}`
}

function main() {
  const args = process.argv.slice(2)
  const reportArg = getArg(args, '--report') || getArg(args, '--reports')
  if (!reportArg) throw new Error('--report is required')

  const minVolume = Number(getArg(args, '--min-volume', '0'))
  const reportPaths = String(reportArg).split(',').map((item) => item.trim()).filter(Boolean)
  const reports = reportPaths.map((reportPath) => ({ reportPath, report: readJson(reportPath) }))
  const rows = reports.flatMap(({ report }) => report.results || [])
  const byKeyword = new Map()

  for (const row of rows) {
    if (!row.saved) continue
    const resultPath = path.resolve(process.cwd(), row.saved)
    if (!fs.existsSync(resultPath)) continue
    const providerResult = readJson(resultPath)
    for (const item of providerResult.keywords || []) {
      const keyword = normalize(item.keyword)
      if (!keyword || Number(item.volume || 0) < minVolume) continue
      const flags = qualityFlags(keyword)
      const current = byKeyword.get(keyword)
      const inferred = inferOwner(keyword, row.target, row.owner)
      const next = {
        keyword,
        volume: Number(item.volume || 0),
        cpc: item.cpc ?? null,
        competition: item.competition ?? null,
        seed: row.seed,
        target: inferred.target,
        owner: inferred.owner,
        source: row.saved,
        intent: classify(keyword),
        qualityFlags: flags.join('|'),
      }
      if (!current || next.volume > current.volume) byKeyword.set(keyword, next)
    }
  }

  const keywords = [...byKeyword.values()].sort((a, b) => b.volume - a.volume || a.keyword.localeCompare(b.keyword))
  const articleEligible = keywords.filter((item) => item.intent === 'informational' || item.intent === 'mixed-price')
  const commercialBacklog = keywords.filter((item) => item.intent === 'commercial-backlog')
  const needsReview = keywords.filter((item) => item.intent === 'needs-review')
  const unclusteredInfo = []
  const clusterMap = new Map()

  for (const item of articleEligible) {
    const key = clusterKey(item.keyword, item.target)
    if (!key) {
      unclusteredInfo.push(item)
      continue
    }
    const cluster = clusterMap.get(key) || {
      clusterId: key,
      target: item.target,
      owner: item.owner,
      proposedSlug: slugify(key.replace(':', '-')),
      proposedTitle: '',
      primaryKeyword: item.keyword,
      totalVolume: 0,
      keywords: [],
    }
    cluster.keywords.push(item)
    cluster.totalVolume += item.volume
    if (item.volume > (cluster.keywords[0]?.volume || 0)) cluster.primaryKeyword = item.keyword
    clusterMap.set(key, cluster)
  }

  const clusters = [...clusterMap.values()]
    .map((cluster) => ({
      ...cluster,
      proposedTitle: titleFromCluster(cluster.clusterId, cluster.primaryKeyword),
      keywordCount: cluster.keywords.length,
      approvedKeywords: cluster.keywords.sort((a, b) => b.volume - a.volume).slice(0, 20).map((item) => item.keyword),
      flags: [...new Set(cluster.keywords.flatMap((item) => String(item.qualityFlags || '').split('|').filter(Boolean)))].join('|'),
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume)

  const outDir = path.join(process.cwd(), '.tmp', 'blog')
  fs.mkdirSync(outDir, { recursive: true })
  const base = path.join(outDir, 'calefaccion-info-expanded')
  fs.writeFileSync(`${base}.json`, JSON.stringify({
    generatedAt: new Date().toISOString(),
    sourceReports: reportPaths,
    summary: {
      totalKeywords: keywords.length,
      articleEligibleKeywords: articleEligible.length,
      commercialBacklogKeywords: commercialBacklog.length,
      needsReviewKeywords: needsReview.length,
      unclusteredInfoKeywords: unclusteredInfo.length,
      articleClusters: clusters.length,
    },
    clusters,
    commercialBacklog,
    needsReview,
    unclusteredInfo,
  }, null, 2))

  const keywordHeader = ['intent', 'qualityFlags', 'target', 'owner', 'keyword', 'volume', 'cpc', 'competition', 'seed', 'source']
  fs.writeFileSync(`${base}-keywords.csv`, [keywordHeader.join(','), ...keywords.map((item) => keywordHeader.map((field) => csvEscape(item[field])).join(','))].join('\n'))

  const clusterHeader = ['clusterId', 'target', 'owner', 'proposedSlug', 'proposedTitle', 'primaryKeyword', 'totalVolume', 'keywordCount', 'flags', 'approvedKeywords']
  fs.writeFileSync(`${base}-clusters.csv`, [clusterHeader.join(','), ...clusters.map((cluster) => clusterHeader.map((field) => csvEscape(Array.isArray(cluster[field]) ? cluster[field].join(' | ') : cluster[field])).join(','))].join('\n'))

  const backlogHeader = ['target', 'owner', 'keyword', 'volume', 'cpc', 'competition', 'seed', 'source', 'qualityFlags']
  fs.writeFileSync(`${base}-commercial-backlog.csv`, [backlogHeader.join(','), ...commercialBacklog.map((item) => backlogHeader.map((field) => csvEscape(item[field])).join(','))].join('\n'))

  fs.writeFileSync(`${base}-unclustered-info.csv`, [keywordHeader.join(','), ...unclusteredInfo.map((item) => keywordHeader.map((field) => csvEscape(item[field])).join(','))].join('\n'))

  console.log(`Expanded keyword CSV: ${path.relative(process.cwd(), `${base}-keywords.csv`)}`)
  console.log(`Cluster CSV: ${path.relative(process.cwd(), `${base}-clusters.csv`)}`)
  console.log(`Commercial backlog CSV: ${path.relative(process.cwd(), `${base}-commercial-backlog.csv`)}`)
  console.log(`Unclustered info CSV: ${path.relative(process.cwd(), `${base}-unclustered-info.csv`)}`)
  console.log(JSON.stringify({
    totalKeywords: keywords.length,
    articleEligibleKeywords: articleEligible.length,
    commercialBacklogKeywords: commercialBacklog.length,
    needsReviewKeywords: needsReview.length,
    unclusteredInfoKeywords: unclusteredInfo.length,
    articleClusters: clusters.length,
  }, null, 2))
}

main()
