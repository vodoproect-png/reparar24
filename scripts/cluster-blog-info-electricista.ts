// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory for electricista blog topics.
 *
 * Outputs:
 * - all deduped keywords
 * - editorial article clusters
 * - commercial/future-service backlog found during informational collection
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
  return /\b(amazon|leroy merlin|bricomart|ikea|wallapop|segunda mano|manual pdf|curso|fp|sueldo|trabajo|ofertas de empleo|temario|test|oposiciones|youtube|minecraft)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|tarifa|coste|cuanto cobra|presupuesto)\b/.test(normalize(keyword))
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio|electricista|instalador|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(reparar|contratar|instalar|cambiar|montar|legalizar)\b/.test(key)
  )
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales)\b/.test(key) ||
    /\b(causa|causas|sintoma|sintomas|guia|consejo|diagnostico|detectar|saber si|evitar|solucionar|revisar|mantenimiento|averia|averias|problema|problemas|normativa|esquema|potencia|seguridad|consumo|calcular)\b/.test(key) ||
    /\b(no funciona|no enciende|no carga|salta|se va la luz|parpadea|chispas|huele a quemado|olor a quemado|se calienta|cortocircuito|diferencial|magnetotermico|disyuntor)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []

  if (isNoise(keyword)) flags.push('noise-or-non-service')
  if (/\b(simon|schneider|legrand|niessen|tesla|wallbox|hager|siemens|philips|xiaomi|shelly|sonoff)\b/.test(key)) flags.push('brand-specific')
  if (/\b(normativa|legalizar|boletin|certificado|proyecto|ite|industria)\b/.test(key)) flags.push('compliance-review')
  if (isPriceInfo(keyword)) flags.push('price-intent')
  if (/^(instalar|cambiar|montar|reparar)\b/.test(key)) flags.push('diy-or-commercial-review')

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
    ['urgencias-electricas', 'diferencial-salta', /\b(diferencial|automatico|plomos).*\b(salta|saltan|dispara)|\b(salta|saltan|dispara).*\b(diferencial|automatico|plomos)\b/],
    ['urgencias-electricas', 'cortocircuito-en-casa', /\b(cortocircuito|corto circuito|chispas|chispa|quemado|huele a quemado|olor a quemado)\b/],
    ['urgencias-electricas', 'se-va-la-luz-en-casa', /\b(se va la luz|sin luz|corte de luz|no tengo luz|apagones|apagon)\b/],
    ['urgencias-electricas', 'enchufe-quemado-o-caliente', /\b(enchufe).*\b(quemado|calienta|caliente|chispas|olor)\b/],

    ['instalaciones-electricas', 'instalacion-electrica-vivienda', /\b(instalacion electrica|electricidad vivienda|instalacion vivienda|hacer instalacion|instalacion casa)\b/],
    ['instalaciones-electricas', 'esquema-instalacion-electrica', /\b(esquema|plano|circuito|diagrama).*\b(electrica|electricidad|vivienda)\b/],
    ['instalaciones-electricas', 'normativa-instalacion-electrica', /\b(normativa|reglamento|itc|rebt|legal).*\b(electrica|electricidad|vivienda)\b/],
    ['instalaciones-electricas', 'precio-instalacion-electrica', /\b(precio|cuanto cuesta|coste|tarifa|presupuesto).*\b(instalacion electrica|electricidad)\b/],
    ['instalaciones-electricas', 'renovar-instalacion-electrica', /\b(renovar|cambiar|actualizar|antigua|reforma).*\b(instalacion electrica|electricidad)\b/],

    ['cuadros-electricos', 'cuadro-electrico-antiguo', /\b(cuadro electrico).*\b(antiguo|viejo|mal estado|huele|quemado)\b/],
    ['cuadros-electricos', 'cambiar-cuadro-electrico-precio', /\b(precio|cuanto cuesta|coste|cambiar|sustituir).*\b(cuadro electrico)\b/],
    ['cuadros-electricos', 'magnetotermico-salta', /\b(magnetotermico|termico|pia).*\b(salta|dispara|calienta|quemado)|\b(salta|dispara).*\b(magnetotermico|termico|pia)\b/],
    ['cuadros-electricos', 'diferencial-y-protecciones', /\b(diferencial|proteccion|protecciones|automatico).*\b(cuadro|electrico|salta|prueba)\b/],

    ['iluminacion-led', 'bombilla-led-parpadea', /\b(led|bombilla|luz|luces).*\b(parpadea|parpadean|titila|intermitente)|\b(parpadea|parpadean|titila).*\b(led|bombilla|luz|luces)\b/],
    ['iluminacion-led', 'instalar-tiras-led', /\b(instalar|poner|colocar|conectar|se conecta|se instala).*\b(tira led|tiras led|led)\b/],
    ['iluminacion-led', 'transformador-led-no-funciona', /\b(transformador|driver).*\b(led|no funciona|averia|parpadea)\b/],
    ['iluminacion-led', 'precio-iluminacion-led', /\b(precio|cuanto cuesta|coste|tarifa).*\b(led|iluminacion)\b/],

    ['enchufes-interruptores', 'enchufe-no-funciona', /\benchufe.*\b(no funciona|sin corriente|no va|averia)\b/],
    ['enchufes-interruptores', 'enchufe-chispas-o-caliente', /\benchufe.*\b(chispas|calienta|caliente|quemado|olor)\b/],
    ['enchufes-interruptores', 'cambiar-enchufe', /\b(cambiar|instalar|poner|montar|sustituir|desmontar|mover|se cambia).*\benchufe\b/],
    ['enchufes-interruptores', 'cambiar-interruptor', /\b(cambiar|instalar|poner|montar|sustituir|desmontar|se cambia).*\b(interruptor|llave de luz)\b/],
    ['enchufes-interruptores', 'interruptor-no-funciona', /\binterruptor.*\b(no funciona|no enciende|averia|fallo)\b/],

    ['averias-electricas', 'detectar-fallo-electrico', /\b(detectar|localizar|encontrar|diagnosticar).*\b(fallo|averia|problema).*\belectric/],
    ['averias-electricas', 'luz-parpadea-en-casa', /\b(luz|luces|bombilla).*\b(parpadea|parpadean|titila)|\b(parpadea|parpadean|titila).*\b(luz|luces)\b/],
    ['averias-electricas', 'por-que-se-va-la-luz', /\b(por que|porque|causas).*\b(se va la luz|corte de luz|sin luz|apagon)\b/],
    ['averias-electricas', 'disyuntor-salta', /\b(disyuntor|automatico|diferencial).*\b(salta|dispara)\b/],

    ['pequenos-trabajos-electricos', 'instalar-lampara-techo', /\b(instalar|colocar|poner|cambiar|conectar|quitar|montar).*\b(lampara|lamparas|luminaria|plafon|plafones)\b/],
    ['pequenos-trabajos-electricos', 'cambiar-bombillas-halogenos', /\b(cambiar|quitar|poner|sustituir|colocar).*\b(bombilla|halogeno|halogenos|halogena|foco|focos)\b/],
    ['pequenos-trabajos-electricos', 'cambiar-fluorescente-a-led', /\b(cambiar|sustituir|conectar|quitar).*\b(fluorescente|tubo fluorescente|cebador).*\bled|\b(fluorescente|tubo fluorescente|cebador)\b/],
    ['pequenos-trabajos-electricos', 'colocar-luces-led-techo', /\b(colocar|poner|instalar|conectar).*\b(luces led|led).*\b(techo|cocina|habitacion)\b/],
    ['pequenos-trabajos-electricos', 'instalar-ventilador-techo', /\b(instalar|colocar|poner|montar|colgar|conectar|se instala|se monta|se pone|se coloca).*\bventilador.*\btecho\b|\b(instalar|colocar|poner|montar|conectar).*\bventilador\b/],
    ['pequenos-trabajos-electricos', 'timbre-no-funciona', /\btimbre.*\b(no funciona|no suena|averia)\b/],
    ['pequenos-trabajos-electricos', 'cambiar-telefonillo', /\b(telefonillo|portero automatico|videoportero).*\b(cambiar|instalar|no funciona|averia)|\b(cambiar|instalar|poner).*\b(telefonillo|portero automatico|videoportero)\b/],

    ['cargador-coche-electrico', 'precio-instalar-cargador-coche-electrico', /\b(precio|cuanto cuesta|coste|tarifa).*\b(cargador|wallbox|punto de recarga|coche electrico)\b/],
    ['cargador-coche-electrico', 'wallbox-garaje-comunitario', /\b(wallbox|cargador|punto de recarga).*\b(garaje comunitario|comunidad|comunitario)\b/],
    ['cargador-coche-electrico', 'normativa-punto-recarga', /\b(normativa|legal|permiso|boletin).*\b(cargador|punto de recarga|coche electrico)\b/],
    ['cargador-coche-electrico', 'potencia-cargar-coche-electrico', /\b(potencia|kw|contratar|necesito).*\b(cargar|coche electrico|wallbox)\b/],
    ['cargador-coche-electrico', 'cargador-coche-no-carga', /\b(cargador|wallbox|coche electrico).*\b(no carga|no funciona|averia)\b/],

    ['domotica', 'que-es-domotica-casa', /\b(que es|que significa|domotica casa|casa inteligente|significa domotica)\b/],
    ['domotica', 'como-domotizar-casa', /\b(domotizar|automatizar|instalar domotica|domotica vivienda)\b/],
    ['domotica', 'precio-domotica-casa', /\b(precio|cuanto cuesta|coste|tarifa).*\b(domotica|domotizar|casa inteligente)\b/],
    ['domotica', 'domotica-persianas-luces', /\b(domotica).*\b(persianas|luces|iluminacion)\b/],
    ['domotica', 'sistema-domotico-no-funciona', /\b(domotica|sistema domotico|casa inteligente).*\b(no funciona|averia|problema)\b/],

    ['mantenimiento-electrico', 'mantenimiento-electrico-vivienda', /\b(mantenimiento|revision|preventivo).*\b(electrico|electricidad).*\b(vivienda|casa)\b/],
    ['mantenimiento-electrico', 'mantenimiento-electrico-comunidad', /\b(mantenimiento|revision|preventivo|contrato).*\b(electrico|electricidad).*\b(comunidad|comunitario)\b/],
    ['mantenimiento-electrico', 'checklist-mantenimiento-electrico', /\b(checklist|lista|cada cuanto|periodico|preventivo).*\b(mantenimiento|revision).*\belectric/],

    ['revision-electrica', 'revision-electrica-vivienda', /\b(revision|revisar|inspeccion).*\b(electrica|electricidad).*\b(vivienda|casa|piso)\b/],
    ['revision-electrica', 'revision-electrica-antes-comprar-piso', /\b(revision|revisar|comprobar).*\b(electrica|electricidad).*\b(comprar|piso|vivienda)\b/],
    ['revision-electrica', 'prueba-diferencial', /\b(prueba|test|comprobar).*\bdiferencial\b/],

    ['boletin-electrico', 'que-es-boletin-electrico', /\b(que es|para que sirve|cuando hace falta|caduca|vigencia).*\b(boletin electrico|boletin de luz|certificado electrico|certificado de instalacion electrica|cie)\b/],
    ['boletin-electrico', 'precio-boletin-electrico', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\b(boletin electrico|boletin de luz|boletin luz|certificado electrico|certificado de instalacion electrica|cie)\b|\b(boletin de luz|boletin luz|certificado de instalacion electrica).*\b(precio|cuanto cuesta|coste|tarifa|cuanto vale)\b/],
    ['boletin-electrico', 'conseguir-certificado-instalacion-electrica', /\b(conseguir|obtener|solicitar).*\b(boletin electrico|boletin de luz|certificado instalacion electrica|certificado de instalacion electrica|certificado electrico|cie)\b|\bcertificado instalacion electrica\b|\bcertificado de instalacion electrica\b/],

    ['legalizacion-electrica', 'legalizar-instalacion-electrica', /\b(legalizar|legalizacion|sin boletin|proyecto electrico|industria).*\b(instalacion electrica|electricidad|certificado)\b/],
    ['legalizacion-electrica', 'precio-legalizacion-electrica', /\b(precio|cuanto cuesta|coste|tarifa).*\b(legalizacion|legalizar|proyecto electrico)\b/],
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
  const base = path.join(outDir, 'electricista-info-expanded')

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
