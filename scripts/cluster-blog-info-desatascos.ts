// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory for desatascos blog topics.
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
  return normalize(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
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
  return /\b(leroy merlin|bricomart|amazon|ikea|mercadona|carrefour|youtube|pdf|manual|foro|opinion|opiniones|trabajo|empleo|curso|segunda mano|wallapop)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|precios|tarifa|coste|cuanto vale|cuanto cobra)\b/.test(normalize(keyword))
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio|desatascos|desatascador|fontanero|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(contratar|llamar|reparar|limpieza profesional|desatascar profesional)\b/.test(key)
  )
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales)\b/.test(key) ||
    /\b(causa|causas|sintoma|sintomas|guia|consejo|diagnostico|detectar|saber si|evitar|solucionar|limpiar|quitar|mantenimiento|prevenir|prevencion|atasco|atascado|atascada|obstruida|obstruccion|mal olor|huele mal|olor|rebose|retorno|raices|camara|inspeccion)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []

  if (isNoise(keyword)) flags.push('noise-or-store')
  if (/\b(sosa caustica|lejia|acido|producto quimico|quimico)\b/.test(key)) flags.push('chemical-safety-review')
  if (/\b(bicarbonato|vinagre|casero|remedio casero|desatascador casero)\b/.test(key)) flags.push('diy-review')
  if (/\b(fosa|septica|residuo|lodo|aguas residuales)\b/.test(key)) flags.push('sanitation-review')
  if (isPriceInfo(keyword)) flags.push('price-intent')
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

  if (/\b(fregadero|pila de la cocina|cocina)\b/.test(key)) {
    return { target: 'fregadero-atascado', owner: '/desatascos/desatascar-fregadero' }
  }

  if (/\b(wc|inodoro|vater|water|retrete)\b/.test(key)) {
    return { target: 'wc-inodoro-atascado', owner: '/desatascos/desatascar-wc' }
  }

  if (/\b(lavabo|lavamanos|ducha|banera|plato de ducha|bano)\b/.test(key)) {
    return { target: 'lavabo-ducha-atascados', owner: '/desatascos/desatascar-lavabo-ducha' }
  }

  if (/\b(arquet|bajante|colector)\b/.test(key)) {
    return { target: 'arquetas-bajantes', owner: '/desatascos/desatasco-tuberias' }
  }

  if (/\b(camion cuba|camion|cuba|alta presion|hidrocurado)\b/.test(key)) {
    return { target: 'camion-cuba', owner: '/desatascos/camion-cuba' }
  }

  if (/\b(fosa|septica)\b/.test(key)) {
    return { target: 'fosas-septicas', owner: '/desatascos/limpieza-fosas-septicas' }
  }

  if (/\b(mal olor|huele mal|olor a alcantarilla|caneria|canerias|cañeria|cañerias)\b/.test(key)) {
    return { target: 'olores-desagues', owner: '/desatascos' }
  }

  if (/\b(sosa|bicarbonato|vinagre|casero|producto|desatascador casero)\b/.test(key)) {
    return { target: 'productos-y-errores', owner: '/desatascos' }
  }

  if (/\b(camara|inspeccion|raices|raiz|rota|rotura|hundida|atascos repetidos)\b/.test(key)) {
    return { target: 'camara-diagnostico', owner: '/desatascos/desatasco-tuberias' }
  }

  return { target: fallbackTarget, owner: fallbackOwner }
}

function clusterKey(keyword, target) {
  const key = normalize(keyword)
  const rules = [
    ['tuberias-atascadas', 'como-desatascar-tuberia', /\b(como|que hacer|desatascar|limpiar|solucionar).*\b(tuberia|tuberias|desague|desagues).*\b(atasc|obstruid)?|\b(tuberia|tuberias).*\b(atascad|obstruid|no traga)\b/],
    ['tuberias-atascadas', 'por-que-se-atascan-tuberias', /\b(por que|porque|causa|causas).*\b(atasc|obstru).*\b(tuberia|tuberias|desague|desagues)\b/],
    ['tuberias-atascadas', 'evitar-atascos-tuberias', /\b(evitar|prevenir|prevencion|no atascar).*\b(atasc|tuberia|tuberias|desague|desagues)\b/],

    ['fregadero-atascado', 'como-desatascar-fregadero', /\b(como|desatascar|destapar|desatorar|limpiar|remedio|bicarbonato|vinagre).*\b(fregadero|fregadera|pila|pica|lavadero de cocina|tuberia de cocina|tuberias cocina|desague cocina|sumidero de la cocina)\b|\b(fregadero|fregadera|pila|pica|lavadero de cocina|tuberia de cocina|desague cocina).*\b(atascado|no traga|agua estancada|desatascar|destapar|limpiar)\b/],
    ['fregadero-atascado', 'fregadero-no-traga', /\bfregadero.*\b(no traga|no desagua|agua no baja|agua estancada)\b/],
    ['fregadero-atascado', 'mal-olor-fregadero', /\bfregadero.*\b(mal olor|huele mal|olor)|\b(mal olor|huele mal|olor).*\bfregadero\b/],
    ['fregadero-atascado', 'por-que-se-atasca-fregadero', /\b(por que|porque|causa|causas).*\bfregadero.*\b(atasca|atascado)\b/],

    ['wc-inodoro-atascado', 'como-desatascar-wc-inodoro', /\b(como|desatascar|que hacer|solucionar).*\b(wc|inodoro|vater|water|retrete)\b|\b(wc|inodoro|vater|water|retrete).*\b(atascado|atasco|no traga|agua sube|desatascar)\b|\batasco.*\b(wc|inodoro|vater|water|retrete)\b/],
    ['wc-inodoro-atascado', 'por-que-se-atasca-wc', /\b(por que|porque|causa|causas).*\b(wc|inodoro|vater|water).*\b(atasca|atascado)\b/],
    ['wc-inodoro-atascado', 'toallitas-atascan-tuberias', /\b(toallita|toallitas|papel|compresa|tampon).*\b(atasc|tuberia|wc|inodoro)\b/],

    ['lavabo-ducha-atascados', 'como-desatascar-lavabo', /\b(como|desatascar|destapar|desembozar|limpiar|solucionar).*\b(lavabo|lavamanos|pica del bano|pila del bano)\b|\b(lavabo|lavamanos|pica del bano|pila del bano).*\b(atascado|no traga|no desagua|mal olor|desatascar|limpiar)\b/],
    ['lavabo-ducha-atascados', 'como-desatascar-ducha', /\b(como|desatascar|limpiar|solucionar).*\b(ducha|plato de ducha)\b|\b(ducha|plato de ducha).*\b(atascada|no traga|no desagua|agua estancada|huele mal|mal olor)\b/],
    ['lavabo-ducha-atascados', 'como-desatascar-banera', /\b(como|desatascar|limpiar|solucionar).*\b(banera|bañera)\b|\b(banera|bañera).*\b(atascada|no traga|pelos|desague)\b/],
    ['lavabo-ducha-atascados', 'mal-olor-bano-ducha-lavabo', /\b(mal olor|olor|huele mal|quitar olor|eliminar olor|porque huele|porque huelen).*\b(bano|baño|ducha|lavabo|bote sifonico|desague ducha|tuberias bano|canerias bano|cañerias bano)\b|\b(bano|baño|ducha|lavabo|bote sifonico|desague ducha|tuberias bano|canerias bano|cañerias bano).*\b(mal olor|olor|huele mal)\b/],
    ['lavabo-ducha-atascados', 'pelos-en-desague-ducha', /\b(pelo|pelos|cabello).*\b(ducha|desague|atasc)\b/],

    ['arquetas-bajantes', 'arqueta-atascada', /\barqueta.*\b(atascada|llena|rebosa|limpiar|limpieza|mal olor)|\b(como saber|que hacer).*\barqueta\b/],
    ['arquetas-bajantes', 'limpieza-arquetas', /\b(cada cuanto|mantenimiento|limpieza|limpiar).*\barqueta|arquetas\b/],
    ['arquetas-bajantes', 'bajante-atascada-o-mal-olor', /\bbajante.*\b(atascada|atasco|mal olor|huele|olor|sintoma|sintomas|limpieza)\b|\bolor.*\bbajante\b/],

    ['camion-cuba', 'cuando-hace-falta-camion-cuba', /\b(cuando|que es|para que sirve|hace falta).*\b(camion cuba|cuba)\b|\b(camion cuba|cuba).*\b(para que sirve|hace falta)\b/],
    ['camion-cuba', 'alta-presion-desatascos', /\b(alta presion|hidrocurado|agua a presion).*\b(desatasco|tuberia|atasco|cuando usar)\b/],
    ['camion-cuba', 'precio-camion-cuba', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(camion cuba|cuba|desatasco)\b|\b(camion cuba|cuba).*\b(precio|cuanto cuesta|coste|tarifa)\b/],

    ['fosas-septicas', 'limpiar-fosa-septica', /\b(limpiar|limpieza|vaciado|vaciar|mantenimiento).*\bfosa.*septica|\bfosa.*septica.*\b(limpiar|limpieza|vaciado|vaciar|mantenimiento)\b/],
    ['fosas-septicas', 'fosa-septica-llena-o-mal-olor', /\bfosa.*septica.*\b(llena|huele mal|mal olor|rebosa|sintoma|sintomas)\b/],
    ['fosas-septicas', 'precio-vaciar-fosa-septica', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\bfosa.*septica|\bfosa.*septica.*\b(precio|cuanto cuesta|coste|tarifa)\b/],

    ['olores-desagues', 'mal-olor-desague', /\b(mal olor|huele mal|olor a alcantarilla|olor).*\b(desague|desagues|tuberia|tuberias|caneria|canerias|cañeria|cañerias|bano|cocina|casa)\b|\b(desague|desagues|tuberia|caneria|canerias|cañeria|cañerias|bano|cocina).*\b(mal olor|huele mal|olor)\b/],
    ['olores-desagues', 'quitar-olor-desague', /\b(como quitar|quitar|eliminar|solucionar|evitar).*\b(olor|mal olor).*\b(desague|desagues|tuberia|tuberias|caneria|canerias|cañeria|cañerias|bano|cocina)\b/],

    ['productos-y-errores', 'sosa-caustica-tuberias', /\b(sosa caustica|lejia|acido|quimico|productos desatascadores).*\b(tuberia|tuberias|desague|atasco)\b/],
    ['productos-y-errores', 'remedios-caseros-desatascar', /\b(bicarbonato|vinagre|casero|remedio casero|desatascador casero).*\b(desatascar|tuberia|fregadero|wc|desague)|\bcomo desatascar con\b/],
    ['productos-y-errores', 'errores-desatascar-tuberias', /\berrores?.*\b(desatascar|tuberias|desague|atasco)\b/],

    ['camara-diagnostico', 'inspeccion-camara-tuberias', /\b(camara|inspeccion).*\b(tuberia|tuberias|desague|atasco|precio)\b/],
    ['camara-diagnostico', 'atascos-repetidos-tuberias', /\b(atasco|atascos).*\b(repetido|repetidos|vuelve|recurrente)|\b(repetido|repetidos|recurrente).*\b(atasco|tuberia|tuberias)\b/],
    ['camara-diagnostico', 'raices-o-tuberia-rota', /\b(raices|raiz|rota|rotura|hundida|hundimiento).*\b(tuberia|tuberias|desague)\b|\btuberia.*\b(rota|atascada)\b/],
  ]

  for (const [ruleTarget, name, pattern] of rules) {
    if (target === ruleTarget && pattern.test(key)) return `${target}:${name}`
  }

  return ''
}

function titleFromCluster(cluster, sampleKeyword) {
  const key = normalize(sampleKeyword)
  if (/^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales)/.test(key)) {
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
      approvedKeywords: cluster.keywords
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 20)
        .map((item) => item.keyword),
      flags: [...new Set(cluster.keywords.flatMap((item) => String(item.qualityFlags || '').split('|').filter(Boolean)))].join('|'),
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume)

  const outDir = path.join(process.cwd(), '.tmp', 'blog')
  fs.mkdirSync(outDir, { recursive: true })
  const base = path.join(outDir, 'desatascos-info-expanded')

  fs.writeFileSync(
    `${base}.json`,
    JSON.stringify(
      {
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
      },
      null,
      2
    )
  )

  const keywordHeader = ['intent', 'qualityFlags', 'target', 'owner', 'keyword', 'volume', 'cpc', 'competition', 'seed', 'source']
  fs.writeFileSync(
    `${base}-keywords.csv`,
    [
      keywordHeader.join(','),
      ...keywords.map((item) => keywordHeader.map((field) => csvEscape(item[field])).join(',')),
    ].join('\n')
  )

  const clusterHeader = ['clusterId', 'target', 'owner', 'proposedSlug', 'proposedTitle', 'primaryKeyword', 'totalVolume', 'keywordCount', 'flags', 'approvedKeywords']
  fs.writeFileSync(
    `${base}-clusters.csv`,
    [
      clusterHeader.join(','),
      ...clusters.map((cluster) =>
        clusterHeader
          .map((field) => csvEscape(Array.isArray(cluster[field]) ? cluster[field].join(' | ') : cluster[field]))
          .join(',')
      ),
    ].join('\n')
  )

  const backlogHeader = ['target', 'owner', 'keyword', 'volume', 'cpc', 'competition', 'seed', 'source', 'qualityFlags']
  fs.writeFileSync(
    `${base}-commercial-backlog.csv`,
    [
      backlogHeader.join(','),
      ...commercialBacklog.map((item) => backlogHeader.map((field) => csvEscape(item[field])).join(',')),
    ].join('\n')
  )

  fs.writeFileSync(
    `${base}-unclustered-info.csv`,
    [
      keywordHeader.join(','),
      ...unclusteredInfo.map((item) => keywordHeader.map((field) => csvEscape(item[field])).join(',')),
    ].join('\n')
  )

  console.log(`Expanded keyword CSV: ${path.relative(process.cwd(), `${base}-keywords.csv`)}`)
  console.log(`Cluster CSV: ${path.relative(process.cwd(), `${base}-clusters.csv`)}`)
  console.log(`Commercial backlog CSV: ${path.relative(process.cwd(), `${base}-commercial-backlog.csv`)}`)
  console.log(`Unclustered info CSV: ${path.relative(process.cwd(), `${base}-unclustered-info.csv`)}`)
  console.log(
    JSON.stringify(
      {
        totalKeywords: keywords.length,
        articleEligibleKeywords: articleEligible.length,
        commercialBacklogKeywords: commercialBacklog.length,
        needsReviewKeywords: needsReview.length,
        unclusteredInfoKeywords: unclusteredInfo.length,
        articleClusters: clusters.length,
      },
      null,
      2
    )
  )
}

main()
