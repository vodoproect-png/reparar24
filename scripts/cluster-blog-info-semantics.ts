// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory from a blog seed collection report.
 *
 * Outputs:
 * - all deduped keywords
 * - editorial article clusters
 * - commercial backlog found during informational collection
 * - informational keywords that need manual review
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
  return /\b(leroy merlin|bricomart|b&q|amazon|ikea|manual pdf|segunda mano|mil anuncios|wallapop|opinion|opiniones)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|tarifa|coste|cuanto cobra)\b/.test(normalize(keyword))
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales)\b/.test(key) ||
    /\b(sintoma|sintomas|causa|causas|guia|consejo|diagnostico|detectar|localizar|saber si|evitar|solucionar|revisar|mantenimiento|limpiar|quitar cal|purgar|averia|averias|problema|problemas)\b/.test(key) ||
    /\b(no funciona|no enciende|no arranca|no calienta|pierde agua|gotea|atascad|presion baja|poca presion|fuga|olor|huele mal|ruido|no carga agua|no cierra)\b/.test(key)
  )
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio|fontanero|presupuesto|barato|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(reparar|contratar)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []

  if (isNoise(keyword)) flags.push('marketplace-or-brand-store')
  if (/\b(junkers|cointra|vaillant|saunier|opalia|neckar|htw|roca|thermor|ariston|fleck)\b/.test(key)) {
    flags.push('brand-specific')
  }
  if (/\b(gas|butano|propano|natural)\b/.test(key)) flags.push('gas-safety-review')
  if (isPriceInfo(keyword)) flags.push('price-intent')
  if (/^(instalar|cambiar|sustituir|montar)\b/.test(key)) flags.push('diy-or-commercial-review')

  return flags
}

function classify(keyword) {
  if (isNoise(keyword)) return 'needs-review'
  if (isCommercial(keyword)) return 'commercial-backlog'
  if (isInformational(keyword)) return 'informational'
  if (isPriceInfo(keyword)) return 'mixed-price'
  return 'needs-review'
}

function clusterKey(keyword, target) {
  const key = normalize(keyword)
  const rules = [
    ['fugas-agua', 'detectar-fuga-agua', /\b(detectar|localizar|encontrar|saber si).*\bfuga|\bfuga.*\b(detectar|localizar|encontrar|saber si)\b/],
    ['fugas-agua', 'fuga-agua-sin-romper', /\b(sin romper|camara termografica|geofono|detector fuga)\b/],
    ['fugas-agua', 'fuga-agua-enterrada-pared', /\b(enterrad|pared|suelo|techo|oculta|tuberia rota|detectar tuberia|localizar tuberia|cano de agua)\b/],
    ['fugas-agua', 'precio-detectar-fuga-agua', /\b(precio|cuanto cuesta|coste|tarifa).*\bfuga|\bfuga.*\b(precio|cuanto cuesta|coste|tarifa)\b/],
    ['fugas-agua', 'que-hacer-fuga-agua-casa', /\b(que hacer|tapar|cortar agua|llave de paso).*\bfuga|\bfuga.*\b(que hacer|tapar|cortar agua|llave de paso)\b/],

    ['grifos', 'grifo-gotea', /\b(grifo|llave|monomando|termostatico).*\b(gotea|goteo|pierde agua)|\b(gotea|goteo|pierde agua).*\b(grifo|llave|monomando|termostatico)\b/],
    ['grifos', 'cambiar-grifo-cocina-lavabo-ducha', /\b(cambiar|instalar|montar|sustituir|desmontar|quitar).*\b(grifo|griferia|llave)/],
    ['grifos', 'grifo-no-cierra-o-no-sale-agua', /\b(grifo|llave).*\b(no cierra|no sale agua|atascado|duro|flojo)\b/],
    ['grifos', 'precio-cambiar-grifo', /\b(precio|cuanto cuesta|coste|tarifa).*\b(grifo|griferia|llave)\b/],

    ['cisternas-inodoros', 'cisterna-pierde-agua', /\b(cisterna|wc|inodoro|vater|water).*\b(pierde agua|gotea|fuga)|\b(pierde agua|gotea|fuga).*\b(cisterna|wc|inodoro|vater|water)\b/],
    ['cisternas-inodoros', 'cisterna-no-carga-agua', /\b(cisterna|wc|inodoro|vater|water).*\b(no carga|no llena|no entra agua|no descarga|no tira)\b/],
    ['cisternas-inodoros', 'cambiar-mecanismo-cisterna', /\b(cambiar|reparar|arreglar|sustituir).*\b(mecanismo|flotador|descarga|pulsador|valvula|cisterna)/],
    ['cisternas-inodoros', 'precio-reparar-cisterna-inodoro', /\b(precio|cuanto cuesta|coste|tarifa).*\b(cisterna|inodoro|wc|vater|water|mecanismo)\b/],

    ['termos-calentadores', 'termo-electrico-no-calienta', /\b(termo electrico|termo|calentador electrico).*\b(no calienta|agua no sale caliente|no funciona|piloto encendido)|\b(no calienta|agua no sale caliente).*\b(termo electrico|termo|calentador electrico)\b/],
    ['termos-calentadores', 'termo-electrico-pierde-agua', /\b(termo electrico|termo).*\b(pierde agua|gotea|fuga)|\b(pierde agua|gotea|fuga).*\b(termo electrico|termo)\b/],
    ['termos-calentadores', 'como-vaciar-termo-electrico', /\b(vaciar|purgar|drenar).*\b(termo|calentador)\b/],
    ['termos-calentadores', 'instalar-termo-electrico', /\b(instalar|montar|cambiar|sustituir|colocar|conectar|poner).*\b(termo electrico|termo|calentador electrico|calentador de agua electrico)\b/],
    ['termos-calentadores', 'calentador-gas-no-enciende', /\b(calentador|termo).*\b(no enciende|no salta|no arranca|llama piloto)\b/],
    ['termos-calentadores', 'precio-cambiar-termo-calentador', /\b(precio|cuanto cuesta|coste|tarifa).*\b(termo|calentador)\b/],

    ['tuberias', 'limpiar-tuberias-cal', /\b(limpiar|quitar|eliminar).*\b(tuberia|tuberias|cal|sarro)|\b(cal|sarro).*\b(tuberia|tuberias)\b/],
    ['tuberias', 'cuando-cambiar-tuberias-casa', /\b(cuando|saber si|mal estado|antiguas|plomo|multicapa).*\b(tuberia|tuberias)\b/],
    ['tuberias', 'precio-cambiar-tuberias-casa', /\b(precio|cuanto cuesta|coste|tarifa).*\b(tuberia|tuberias)\b/],
    ['tuberias', 'detectar-tuberias-agua', /\b(detectar|localizar|encontrar).*\b(tuberia|tuberias)\b/],

    ['bano-ducha-lavabo', 'cambiar-banera-por-ducha-precio', /\b(banera|banera).*\b(ducha|plato)|\bducha.*\bbanera\b/],
    ['bano-ducha-lavabo', 'instalar-plato-ducha', /\b(instalar|colocar|poner|montar).*\b(plato de ducha|ducha)\b/],
    ['bano-ducha-lavabo', 'instalar-lavabo-desague', /\b(lavabo|desague|sifon).*\b(instalar|colocar|poner|gotea|atascado|pierde)\b/],
    ['bano-ducha-lavabo', 'precio-cambiar-inodoro', /\b(precio|cuanto cuesta|coste|tarifa|cambiar|instalar).*\b(inodoro|wc|vater|water)\b/],

    ['presion-agua', 'aumentar-presion-agua-casa', /\b(aumentar|subir|dar mas|tener mas|mejorar).*\bpresion\b/],
    ['presion-agua', 'poca-presion-agua-causas', /\b(poca|baja|falta).*\bpresion\b/],
    ['presion-agua', 'bomba-agua-no-arranca', /\bbomba.*\b(no arranca|no funciona|zumba|no enciende)\b/],
    ['presion-agua', 'grupo-presion-agua-problemas', /\bgrupo de presion\b|\bpresostato\b|\bcalderin\b/],
    ['presion-agua', 'precio-grupo-presion-agua', /\b(precio|cuanto cuesta|coste|tarifa).*\b(grupo de presion|bomba de agua)\b/],

    ['osmosis-descalcificadores', 'mantenimiento-osmosis-inversa', /\b(osmosis).*\b(mantenimiento|revision|limpiar|filtro|membrana|cambiar filtros)|\b(mantenimiento|revision|limpiar|filtro|membrana|cambiar filtros).*\bosmosis\b/],
    ['osmosis-descalcificadores', 'osmosis-no-sale-agua', /\bosmosis.*\b(no sale agua|poca agua|no funciona|gotea|sabor)\b/],
    ['osmosis-descalcificadores', 'descalcificador-no-consume-sal', /\bdescalcificador.*\b(no consume sal|sal|no funciona|mantenimiento|averia)\b/],
    ['osmosis-descalcificadores', 'precio-instalar-osmosis-descalcificador', /\b(precio|cuanto cuesta|coste|tarifa|instalar).*\b(osmosis|descalcificador)\b/],

    ['mantenimiento-fontaneria', 'mantenimiento-fontaneria-vivienda', /\b(mantenimiento|revision|preventivo|revisar).*\b(fontaneria|instalacion|vivienda|casa|comunidad|tuberias)\b/],

    ['instalaciones-fontaneria', 'instalacion-fontaneria-bano', /\b(instalacion|instalar|hacer|montar|esquema|medidas|normativa).*\b(fontaneria|bano|vivienda|pladur)\b/],
    ['instalaciones-fontaneria', 'precio-instalacion-fontaneria-bano', /\b(precio|cuanto cuesta|coste|tarifa).*\b(instalacion|fontaneria|bano)\b/],

    ['bajantes', 'bajante-rota-o-con-fuga', /\b(bajante|bajantes).*\b(rota|fuga|pierde|humedad|agua)\b/],
    ['bajantes', 'bajante-comunitaria-huele-mal', /\b(bajante|bajantes).*\b(huele|olor|mal olor|comunitaria)\b/],
    ['bajantes', 'reparar-bajante-sin-obras', /\b(reparar|arreglar|rehabilitar).*\b(bajante|bajantes).*\b(sin obras)?/],
    ['bajantes', 'precio-cambiar-bajantes-comunidad', /\b(precio|cuanto cuesta|coste|tarifa|cambiar|sustituir).*\b(bajante|bajantes).*\b(comunidad|comunitaria)?/],

    ['inodoros', 'instalar-inodoro', /\b(instalar|montar|colocar|poner).*\b(inodoro|wc|vater|water|sanitario)\b/],
    ['inodoros', 'cambiar-inodoro', /\b(cambiar|sustituir|quitar).*\b(inodoro|wc|vater|water|sanitario)\b/],
    ['inodoros', 'precio-cambiar-inodoro', /\b(precio|cuanto cuesta|coste|tarifa|cuanto cobra).*\b(inodoro|wc|vater|water|sanitario)\b/],
    ['inodoros', 'inodoro-pierde-agua-base', /\b(inodoro|wc|vater|water).*\b(pierde agua|gotea|fuga|base|por debajo)\b/],
    ['inodoros', 'medidas-instalacion-inodoro', /\b(medidas|distancia|altura|salida|toma).*\b(inodoro|wc|sanitario)\b/],

    ['lavabos', 'instalar-lavabo', /\b(instalar|montar|colocar|poner).*\b(lavabo|lavamanos|seno)\b/],
    ['lavabos', 'cambiar-lavabo', /\b(cambiar|sustituir|quitar).*\b(lavabo|lavamanos|seno)\b/],
    ['lavabos', 'cambiar-sifon-desague-lavabo', /\b(sifon|desague|valvula).*\b(lavabo|lavamanos|seno)|\b(lavabo|lavamanos|seno).*\b(sifon|desague|valvula)\b/],
    ['lavabos', 'lavabo-gotea-o-no-desagua', /\b(lavabo|lavamanos|seno).*\b(gotea|pierde|no desagua|atascado|por debajo)\b/],

    ['mamparas-ducha', 'instalar-mampara-ducha', /\b(instalar|montar|colocar|poner).*\bmampara\b/],
    ['mamparas-ducha', 'cambiar-mampara-ducha', /\b(cambiar|sustituir|quitar).*\bmampara\b/],
    ['mamparas-ducha', 'mampara-ducha-no-cierra-o-pierde-agua', /\bmampara.*\b(no cierra|pierde agua|gotea|rota|rueda|perfil)\b/],
    ['mamparas-ducha', 'precio-instalar-mampara-ducha', /\b(precio|cuanto cuesta|coste|tarifa).*\bmampara\b/],

    ['reparacion-duchas', 'ducha-gotea-o-pierde-agua', /\bducha.*\b(gotea|pierde agua|fuga)|\b(gotea|pierde agua|fuga).*\bducha\b/],
    ['reparacion-duchas', 'cambiar-columna-flexo-ducha', /\b(cambiar|sustituir|instalar).*\b(columna|flexo|manguera|alcachofa).*\bducha\b/],
    ['reparacion-duchas', 'cambiar-desague-ducha', /\b(desague|sumidero).*\bducha|\bducha.*\b(desague|sumidero)\b/],
    ['reparacion-duchas', 'ducha-no-traga-agua', /\bducha.*\b(no traga|atascada|atasco|no desagua)\b/],
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
      const next = {
        keyword,
        volume: Number(item.volume || 0),
        cpc: item.cpc ?? null,
        competition: item.competition ?? null,
        seed: row.seed,
        target: row.target,
        owner: row.owner,
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
    if (item.volume > (cluster.keywords[0]?.volume || 0)) {
      cluster.primaryKeyword = item.keyword
    }
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
  const base = path.join(outDir, 'fontaneria-info-expanded')

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
