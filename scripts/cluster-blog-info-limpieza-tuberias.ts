// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory for limpieza de tuberias blog topics.
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
  return /\b(amazon|leroy|leroy merlin|bricomart|bauhaus|carrefour|mercadona|ikea|youtube|pdf|manual|foro|opinion|opiniones|trabajo|empleo|curso|segunda mano|wallapop|comprar|barato|barata|oferta|ofertas|brico|bricolaje|coche|auto|moto|piscina|pecera|lavadora|lavavajillas|termo|caldera|aire acondicionado)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|precios|tarifa|coste|cuanto vale|cuanto cobra)\b/.test(normalize(keyword))
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio profesional|profesional|tecnico|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(contratar|llamar|reparar|desatascar profesional|limpieza profesional)\b/.test(key)
  )
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales|cada cuanto)\b/.test(key) ||
    /\b(causa|causas|sintoma|sintomas|guia|consejo|diagnostico|detectar|saber si|evitar|solucionar|limpiar|quitar|mantenimiento|prevenir|prevencion|atasco|atascado|atascada|obstruida|obstruccion|mal olor|huele mal|olor|rebose|retorno|lodos|grasa|grasas|bajante|bajantes|arqueta|arquetas|colector|colectores|saneamiento|camara|videoinspeccion|inspeccion|hidrocurado|alta presion|camion cuba|sosa|bicarbonato|vinagre|separador de grasas)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []
  if (isNoise(keyword)) flags.push('noise-or-store')
  if (isPriceInfo(keyword)) flags.push('price-intent')
  if (/\b(sosa caustica|lejia|acido|producto quimico|quimico)\b/.test(key)) flags.push('chemical-safety-review')
  if (/\b(bicarbonato|vinagre|casero|remedio casero)\b/.test(key)) flags.push('diy-review')
  if (/\b(lodo|lodos|aguas residuales|separador de grasas|fosa|septica)\b/.test(key)) flags.push('sanitation-review')
  if (/^(desatascar|limpiar|vaciar)\b/.test(key)) flags.push('diy-or-commercial-review')
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

  if (/\b(bajante|bajantes)\b/.test(key)) return { target: 'bajantes-comunidad', owner: '/limpieza-tuberias/limpieza-bajantes' }
  if (/\b(arqueta|arquetas|colector|colectores|acometida|alcantarillado privado|lodo|lodos)\b/.test(key)) return { target: 'arquetas-colectores-olores', owner: '/limpieza-tuberias/limpieza-arquetas-colectores' }
  if (/\b(camara|videoinspeccion|inspeccion|informe|localizar atasco)\b/.test(key)) return { target: 'camara-inspeccion', owner: '/limpieza-tuberias/inspeccion-camara-tuberias' }
  if (/\b(alta presion|hidrocurado|camion cuba|agua a presion|sin obras)\b/.test(key)) return { target: 'alta-presion-hidrocurado', owner: '/limpieza-tuberias/limpieza-alta-presion-camion-cuba' }
  if (/\b(separador de grasas|restaurante|hotel|cocina industrial|hosteleria|empresa|empresas)\b/.test(key)) return { target: 'hosteleria-grasas', owner: '/limpieza-tuberias/limpieza-tuberias-empresas' }
  if (/\b(comunidad|comunidades|vecinos|red saneamiento|saneamiento comunidad|atascos repetidos|mal olor tuberias comunidad)\b/.test(key)) return { target: 'comunidades-saneamiento', owner: '/limpieza-tuberias/limpieza-tuberias-comunidades' }
  if (/\b(bicarbonato|sosa|vinagre|producto|productos|casa|hogar)\b/.test(key)) return { target: 'limpiar-tuberias-casa', owner: '/limpieza-tuberias' }
  if (/\b(precio|cuanto cuesta|coste|tarifa|cuanto vale)\b/.test(key)) return { target: 'precios-informativos', owner: '/limpieza-tuberias' }
  if (/\b(prevenir|prevencion|mantenimiento|cada cuanto|cuando limpiar|limpieza preventiva)\b/.test(key)) return { target: 'mantenimiento-preventivo', owner: '/limpieza-tuberias' }

  return { target: fallbackTarget, owner: fallbackOwner }
}

function clusterKey(keyword, target) {
  const key = normalize(keyword)
  const rules = [
    ['mantenimiento-preventivo', 'cada-cuanto-limpiar-tuberias', /\b(cada cuanto|cuando|frecuencia).*\b(limpiar|limpieza|mantenimiento).*\btuberias?\b|\btuberias?.*\b(cada cuanto|frecuencia|mantenimiento)\b/],
    ['mantenimiento-preventivo', 'prevenir-atascos-tuberias', /\b(prevenir|prevencion|evitar|no atascar).*\b(atasc|tuberia|tuberias|desague|saneamiento)\b/],
    ['mantenimiento-preventivo', 'mantenimiento-preventivo-saneamiento', /\b(mantenimiento preventivo|limpieza preventiva).*\b(saneamiento|tuberias|red)\b|\bsaneamiento.*\bmantenimiento\b/],

    ['limpiar-tuberias-casa', 'como-limpiar-tuberias-casa', /\b(como|limpiar|limpieza|quitar).*\b(tuberia|tuberias|caneria|canerias|desague|desagues).*\b(casa|hogar)?\b|\b(tuberia|tuberias|caneria|canerias).*\b(casa|hogar|limpiar)\b/],
    ['limpiar-tuberias-casa', 'como-destapar-caneria-tapada', /\b(como|destapar|desatascar|desatorar|solucionar).*\b(caneria|canerias|tuberia|tuberias).*\b(tapad|atascad|obstruid|casa)?\b|\b(caneria|canerias|tuberia|tuberias).*\b(tapad|atascad|obstruid|destapar|desatascar)\b/],
    ['limpiar-tuberias-casa', 'bicarbonato-vinagre-tuberias', /\b(bicarbonato|vinagre).*\b(tuberia|tuberias|caneria|canerias|desague|atasco|destapar|desatascar)\b|\b(tuberia|tuberias|caneria|canerias|desague).*\b(bicarbonato|vinagre)\b/],
    ['limpiar-tuberias-casa', 'sosa-caustica-tuberias', /\b(sosa caustica|lejia|acido|quimico).*\b(tuberia|tuberias|caneria|canerias|desague|atasco)\b/],
    ['limpiar-tuberias-casa', 'productos-para-limpiar-tuberias', /\b(producto|productos|liquido|gel).*\b(limpiar|desatascar|destapar).*\b(tuberia|tuberias|caneria|canerias|desague)\b/],
    ['limpiar-tuberias-casa', 'limpiar-tuberias-con-grasa', /\b(grasa).*\b(tuberia|tuberias|caneria|canerias|desague|fregadero|cocina)\b|\b(tuberia|tuberias|caneria|canerias|desague|fregadero|cocina).*\bgrasa\b/],
    ['limpiar-tuberias-casa', 'limpiar-tuberias-con-sarro-o-cal', /\b(sarro|cal).*\b(tuberia|tuberias|caneria|canerias|agua)\b|\b(tuberia|tuberias|caneria|canerias).*\b(sarro|cal)\b/],
    ['limpiar-tuberias-casa', 'mal-olor-canerias-casa', /\b(mal olor|huele mal|olor).*\b(tuberia|tuberias|caneria|canerias|desague|cocina|casa)\b|\b(tuberia|tuberias|caneria|canerias|desague|cocina).*\b(mal olor|huele mal|olor)\b/],

    ['bajantes-comunidad', 'cuando-limpiar-bajantes-comunidad', /\b(cada cuanto|cuando|frecuencia|mantenimiento|limpieza|limpiar).*\bbajantes?\b|\bbajantes?.*\b(cada cuanto|mantenimiento|limpieza)\b/],
    ['bajantes-comunidad', 'mal-olor-bajantes', /\b(mal olor|huele mal|olor).*\bbajantes?\b|\bbajantes?.*\b(mal olor|huele mal|olor)\b/],
    ['bajantes-comunidad', 'bajante-comunidad-atascada', /\bbajantes?.*\b(atascad|obstruid|rebosa|retorno|sintoma|comunidad|edificio)\b|\bcomunidad.*\bbajantes?\b/],

    ['arquetas-colectores-olores', 'mal-olor-arquetas-comunidad', /\b(mal olor|huele mal|olor).*\barquetas?\b|\barquetas?.*\b(mal olor|huele mal|olor)\b/],
    ['arquetas-colectores-olores', 'cada-cuanto-limpiar-arquetas', /\b(cada cuanto|cuando|frecuencia|mantenimiento|limpieza|limpiar).*\barquetas?\b|\barquetas?.*\b(cada cuanto|mantenimiento|limpieza)\b/],
    ['arquetas-colectores-olores', 'limpieza-colectores-saneamiento', /\b(colector|colectores|acometida|alcantarillado|red saneamiento).*\b(limpiar|limpieza|mantenimiento|atasc)\b/],
    ['arquetas-colectores-olores', 'arquetas-con-lodos', /\barquetas?.*\b(lodo|lodos|llena|rebosa|residuos)\b|\b(lodo|lodos).*\barquetas?\b/],

    ['camara-inspeccion', 'cuando-usar-camara-tuberias', /\b(cuando|para que|que es|como funciona).*\b(camara|videoinspeccion|inspeccion).*\btuberias?\b/],
    ['camara-inspeccion', 'que-detecta-camara-tuberias', /\b(que detecta|detectar|localizar|diagnostico).*\b(camara|videoinspeccion).*\b(tuberia|atasco|rotura)\b/],
    ['camara-inspeccion', 'precio-inspeccion-camara', /\b(precio|cuanto cuesta|coste|tarifa).*\b(camara|videoinspeccion|inspeccion).*\btuberias?\b/],
    ['camara-inspeccion', 'informe-camara-tuberias', /\b(informe|grabacion|video).*\b(camara|videoinspeccion|tuberias?)\b/],

    ['alta-presion-hidrocurado', 'que-es-hidrocurado', /\b(que es|como funciona|para que sirve).*\bhidrocurado\b|\bhidrocurado.*\b(que es|como funciona)\b/],
    ['alta-presion-hidrocurado', 'cuando-usar-camion-cuba', /\b(cuando|para que|que es|hace falta).*\b(camion cuba|cuba)\b|\b(camion cuba|cuba).*\b(cuando|para que|hace falta)\b/],
    ['alta-presion-hidrocurado', 'limpieza-tuberias-alta-presion', /\b(alta presion|agua a presion|hidrocurado).*\b(tuberia|tuberias|saneamiento|atasco)\b/],
    ['alta-presion-hidrocurado', 'limpieza-tuberias-sin-obras', /\b(sin obras|sin romper).*\b(tuberia|tuberias|limpieza|atasco)\b/],

    ['hosteleria-grasas', 'mantenimiento-separador-grasas', /\b(separador de grasas|trampa de grasa).*\b(mantenimiento|limpieza|limpiar|cada cuanto)\b/],
    ['hosteleria-grasas', 'limpieza-tuberias-restaurante', /\b(restaurante|hosteleria|cocina industrial).*\b(tuberia|tuberias|limpieza|atasco|grasa)\b/],
    ['hosteleria-grasas', 'mal-olor-tuberias-restaurante', /\b(mal olor|huele mal|olor).*\b(restaurante|hotel|cocina industrial|tuberias?)\b/],
    ['hosteleria-grasas', 'limpieza-tuberias-hotel', /\bhotel.*\b(tuberia|tuberias|limpieza|saneamiento|atasco)\b/],

    ['comunidades-saneamiento', 'mantenimiento-saneamiento-comunidad', /\b(mantenimiento|plan|limpieza).*\b(saneamiento|red saneamiento|tuberias).*\b(comunidad|vecinos)\b/],
    ['comunidades-saneamiento', 'atascos-repetidos-comunidad', /\b(atasco|atascos).*\b(repetido|repetidos|recurrente|vuelve).*\b(comunidad|vecinos|edificio)?\b/],
    ['comunidades-saneamiento', 'mal-olor-tuberias-comunidad', /\b(mal olor|huele mal|olor).*\b(tuberias|saneamiento|comunidad|vecinos|edificio)\b/],
    ['comunidades-saneamiento', 'plan-mantenimiento-saneamiento-comunidad', /\b(plan|programa|preventivo).*\b(mantenimiento|saneamiento|comunidad)\b/],

    ['precios-informativos', 'precio-limpieza-tuberias', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(limpiar|limpieza).*\btuberias?\b/],
    ['precios-informativos', 'precio-limpieza-bajantes', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(limpiar|limpieza).*\bbajantes?\b/],
    ['precios-informativos', 'precio-limpieza-arquetas', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(limpiar|limpieza).*\barquetas?\b/],
    ['precios-informativos', 'precio-hidrocurado', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\bhidrocurado\b/],
    ['precios-informativos', 'precio-inspeccion-camara', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(camara|videoinspeccion|inspeccion).*\btuberias?\b/],
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
  const base = path.join(outDir, 'limpieza-tuberias-info-expanded')
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
