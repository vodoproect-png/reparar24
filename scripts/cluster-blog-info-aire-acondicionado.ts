// @ts-nocheck
/**
 * Build a reviewable informational semantic inventory for aire acondicionado blog topics.
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
  return /\b(leroy merlin|bricomart|amazon|ikea|carrefour|mediamarkt|wikipedia|youtube|pdf|manual|foro|opinion|opiniones|trabajo|empleo|curso|segunda mano|wallapop|portatil barato|comprar|oferta|ofertas|marca|coche|auto|automovil|carro|mitsubishi|daikin|fujitsu|lg|samsung|hisense|haier|panasonic|tcl|midea|bosch|carrier)\b/.test(key)
}

function isPriceInfo(keyword) {
  return /\b(cuanto cuesta|precio|precios|tarifa|coste|cuanto vale|cuanto cobra)\b/.test(normalize(keyword))
}

function isCommercial(keyword) {
  const key = normalize(keyword)
  return (
    /\b(urgente|24 horas|cerca de mi|empresa|servicio tecnico|servicio|tecnico|instalador|madrid|barcelona|valencia|sevilla|malaga|zaragoza|alicante)\b/.test(key) ||
    /^(contratar|llamar|reparar|instalar|montar|mantenimiento profesional|limpieza profesional|cargar gas|recargar gas)\b/.test(key)
  )
}

function isInformational(keyword) {
  const key = normalize(keyword)
  return (
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales|cada cuanto)\b/.test(key) ||
    /\b(causa|causas|sintoma|sintomas|guia|consejo|diagnostico|detectar|saber si|evitar|solucionar|limpiar|quitar|mantenimiento|prevenir|prevencion|no enfria|gotea|pierde agua|huele mal|mal olor|ruido|vibra|no enciende|se apaga|falta gas|sin gas|hielo|consume|temperatura|frigorias|potencia|inverter|modo dry|modo sleep|bomba de calor|conductos|preinstalacion|cassette)\b/.test(key)
  )
}

function qualityFlags(keyword) {
  const key = normalize(keyword)
  const flags = []

  if (isNoise(keyword)) flags.push('noise-or-store')
  if (isPriceInfo(keyword)) flags.push('price-intent')
  if (/\b(gas|refrigerante|r32|r410|fuga|presion|hielo|congela)\b/.test(key)) flags.push('technical-safety-review')
  if (/\b(salta diferencial|cortocircuito|chispas|olor a quemado)\b/.test(key)) flags.push('electrical-safety-review')
  if (/\b(limpiar|desinfectar|moho|bacteria|hongos)\b/.test(key)) flags.push('hygiene-review')
  if (/^(instalar|montar|reparar|cargar|recargar)\b/.test(key)) flags.push('diy-or-commercial-review')

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

  if (/\b(no enfria|no echa aire frio|enfria poco|no sale frio|aire caliente)\b/.test(key)) {
    return { target: 'no-enfria', owner: '/aire-acondicionado/reparacion-aire-acondicionado' }
  }

  if (/\b(pierde agua|gotea|tira agua|agua cae|condensados|desague obstruido)\b/.test(key)) {
    return { target: 'pierde-agua-gotea', owner: '/aire-acondicionado/reparacion-aire-acondicionado' }
  }

  if (/\b(filtro|filtros|mantenimiento|limpieza|limpiar split|puesta a punto)\b/.test(key)) {
    return { target: 'mantenimiento-limpieza', owner: '/aire-acondicionado/mantenimiento-aire-acondicionado' }
  }

  if (/\b(mal olor|huele mal|humedad|vinagre|desinfectar|moho|hongos)\b/.test(key)) {
    return { target: 'mal-olor', owner: '/aire-acondicionado/reparacion-aire-acondicionado' }
  }

  if (/\b(ruido|vibra|vibracion|zumbido|golpe|agua al apagar)\b/.test(key)) {
    return { target: 'ruido-vibracion', owner: '/aire-acondicionado/reparacion-aire-acondicionado' }
  }

  if (/\b(no enciende|no arranca|se apaga|error|codigo|parpadea|salta diferencial|no funciona)\b/.test(key)) {
    return { target: 'no-enciende-se-apaga-error', owner: '/aire-acondicionado/reparacion-aire-acondicionado' }
  }

  if (/\b(gas|refrigerante|r32|r410|fuga|falta gas|sin gas|hielo|congela|presion)\b/.test(key)) {
    return { target: 'gas-refrigerante', owner: '/aire-acondicionado/carga-gas-aire-acondicionado' }
  }

  if (/\b(cuanto cuesta instalar|precio instalacion|frigorias|potencia|metros cuadrados|donde colocar|permiso comunidad|instalacion en piso)\b/.test(key)) {
    return { target: 'instalacion-potencia-precio', owner: '/aire-acondicionado/instalacion-aire-acondicionado' }
  }

  if (/\b(split|multisplit|dormitorio|salon)\b/.test(key)) {
    return { target: 'split-multisplit', owner: '/aire-acondicionado/instalacion-split' }
  }

  if (/\b(conducto|conductos|rejilla|rejillas|retorno)\b/.test(key)) {
    return { target: 'conductos', owner: '/aire-acondicionado/aire-acondicionado-conductos' }
  }

  if (/\b(bomba de calor|modo calor|no calienta|frio calor)\b/.test(key)) {
    return { target: 'bomba-calor', owner: '/aire-acondicionado/bomba-calor' }
  }

  if (/\b(temperatura|ahorrar|ahorro|modo dry|modo sleep|consume|consumo|verano|inverter)\b/.test(key)) {
    return { target: 'ahorro-uso', owner: '/aire-acondicionado' }
  }

  if (/\b(preinstalacion|cassette|techo|suelo techo)\b/.test(key)) {
    return { target: 'preinstalacion-cassette', owner: '/aire-acondicionado/preinstalacion-aire-acondicionado' }
  }

  return { target: fallbackTarget, owner: fallbackOwner }
}

function clusterKey(keyword, target) {
  const key = normalize(keyword)
  const rules = [
    ['no-enfria', 'por-que-aire-acondicionado-no-enfria', /\b(por que|porque|causa|causas|motivo).*\b(no enfria|no echa frio|enfria poco|no sale frio)\b|\b(no enfria|no echa frio|enfria poco|no sale frio).*\b(por que|porque|causa|causas)\b/],
    ['no-enfria', 'que-hacer-aire-acondicionado-no-enfria', /\b(que hacer|como solucionar|solucionar|diagnosticar).*\b(no enfria|no echa frio|enfria poco|no sale frio)\b|\b(no enfria|no echa frio|enfria poco).*\b(que hacer|solucion)\b/],
    ['no-enfria', 'split-no-enfria', /\bsplit.*\b(no enfria|enfria poco|no sale frio)\b/],

    ['pierde-agua-gotea', 'por-que-aire-acondicionado-pierde-agua', /\b(por que|porque|causa|causas).*\b(pierde agua|gotea|tira agua)\b|\b(pierde agua|gotea|tira agua).*\b(por que|porque|causa|causas)\b/],
    ['pierde-agua-gotea', 'que-hacer-si-gotea-aire-acondicionado', /\b(que hacer|solucionar|como arreglar|como quitar).*\b(gotea|pierde agua|tira agua|agua cae)\b|\b(gotea|pierde agua|tira agua).*\b(que hacer|solucion)\b/],
    ['pierde-agua-gotea', 'desague-aire-acondicionado-obstruido', /\b(desague|condensado|condensados|bandeja).*\b(obstruido|atascado|tapado|limpiar|agua)\b/],

    ['mantenimiento-limpieza', 'como-limpiar-filtros-aire-acondicionado', /\b(como|cada cuanto|limpiar|lavar).*\bfiltros?.*\baire acondicionado\b|\bfiltros?.*\b(limpiar|lavar|sucio|sucios)\b/],
    ['mantenimiento-limpieza', 'como-limpiar-aire-acondicionado', /\b(como limpiar|limpiar|limpieza).*\baire acondicionado\b/],
    ['mantenimiento-limpieza', 'cada-cuanto-mantenimiento-aire-acondicionado', /\b(cada cuanto|cuando|frecuencia).*\b(mantenimiento|revision|limpieza).*\baire acondicionado\b/],
    ['mantenimiento-limpieza', 'como-limpiar-split-aire-acondicionado', /\b(como|limpiar|limpieza).*\bsplit\b|\bsplit.*\b(limpiar|limpieza)\b/],

    ['mal-olor', 'por-que-huele-mal-aire-acondicionado', /\b(por que|porque|causa|causas).*\b(huele mal|mal olor|olor|humedad|vinagre)\b|\b(huele mal|mal olor|olor).*\b(por que|porque|causa|causas)\b/],
    ['mal-olor', 'como-quitar-mal-olor-aire-acondicionado', /\b(como quitar|quitar|eliminar|solucionar|evitar|desinfectar).*\b(mal olor|olor|huele mal|humedad)\b/],
    ['mal-olor', 'aire-acondicionado-huele-a-humedad', /\b(huele|olor).*\b(humedad|vinagre|moho)\b/],

    ['ruido-vibracion', 'por-que-aire-acondicionado-hace-ruido', /\b(por que|porque|causa|causas).*\b(ruido|vibra|vibracion|zumbido)\b|\b(ruido|vibra|vibracion|zumbido).*\b(por que|porque|causa|causas)\b/],
    ['ruido-vibracion', 'unidad-exterior-hace-ruido', /\b(unidad exterior|compresor|maquina exterior).*\b(ruido|vibra|zumbido)\b/],
    ['ruido-vibracion', 'ruido-agua-aire-acondicionado', /\b(ruido|sonido).*\bagua\b|\bagua.*\b(ruido|sonido)\b/],

    ['no-enciende-se-apaga-error', 'aire-acondicionado-no-enciende', /\b(no enciende|no arranca|no funciona)\b/],
    ['no-enciende-se-apaga-error', 'aire-acondicionado-se-apaga-solo', /\b(se apaga solo|se para solo|se apaga)\b/],
    ['no-enciende-se-apaga-error', 'codigos-error-aire-acondicionado', /\b(error|codigo|parpadea|luces|display)\b/],
    ['no-enciende-se-apaga-error', 'aire-acondicionado-salta-diferencial', /\b(salta diferencial|salta la luz|cortocircuito)\b/],

    ['gas-refrigerante', 'como-saber-si-falta-gas-aire-acondicionado', /\b(como saber|sintoma|sintomas|falta gas|sin gas).*\b(gas|aire acondicionado)\b|\b(gas|refrigerante).*\b(falta|sintoma|sintomas)\b/],
    ['gas-refrigerante', 'cada-cuanto-cargar-gas-aire-acondicionado', /\b(cada cuanto|cuando).*\b(cargar|recargar).*\bgas\b/],
    ['gas-refrigerante', 'gas-r32-o-r410-diferencias', /\b(r32|r410|r410a|refrigerante).*\b(diferencia|mejor|que es)\b/],
    ['gas-refrigerante', 'aire-acondicionado-hace-hielo', /\b(hielo|congela|escarcha).*\b(aire acondicionado|split|tubo|unidad)\b|\b(aire acondicionado|split|tubo|unidad).*\b(hielo|congela|escarcha)\b/],

    ['instalacion-potencia-precio', 'cuanto-cuesta-instalar-aire-acondicionado', /\b(cuanto cuesta|precio|coste|tarifa).*\b(instalar|instalacion|montaje).*\baire acondicionado\b/],
    ['instalacion-potencia-precio', 'frigorias-por-metro-cuadrado', /\b(frigorias|potencia|metros cuadrados|m2|kw).*\b(aire acondicionado|necesito|calcular|metro|metros|m2)\b|\b(frigorias por m2|frigorias por metro|calcular frigorias)\b/],
    ['instalacion-potencia-precio', 'donde-colocar-aire-acondicionado', /\b(donde colocar|ubicacion|poner).*\b(aire acondicionado|split|unidad interior|unidad exterior)\b/],
    ['instalacion-potencia-precio', 'permiso-comunidad-aire-acondicionado', /\b(permiso|comunidad|vecinos|fachada|legal).*\baire acondicionado\b/],

    ['split-multisplit', 'split-o-conductos-que-es-mejor', /\b(split|multisplit).*\b(conductos|mejor|elegir|diferencia)\b|\bconductos.*\bsplit\b/],
    ['split-multisplit', 'que-es-aire-acondicionado-split', /\b(que es|como funciona).*\bsplit\b/],
    ['split-multisplit', 'donde-colocar-split-dormitorio', /\b(split|aire acondicionado).*\b(dormitorio|habitacion|salon|donde colocar)\b/],

    ['conductos', 'aire-acondicionado-por-conductos-ventajas', /\b(conductos).*\b(ventaja|ventajas|desventaja|mejor|que es|como funciona)\b/],
    ['conductos', 'conductos-no-enfria-habitacion', /\b(conductos|rejilla|habitacion|zona).*\b(no enfria|enfria poco|no sale aire|caudal)\b/],
    ['conductos', 'limpiar-conductos-aire-acondicionado', /\b(limpiar|limpieza|mantenimiento).*\bconductos\b|\bconductos.*\b(limpiar|limpieza|mantenimiento|mal olor)\b/],
    ['conductos', 'precio-aire-acondicionado-por-conductos', /\b(precio|cuanto cuesta|coste|tarifa|cuanto vale).*\bconductos\b|\bconductos.*\b(precio|cuanto cuesta|coste|tarifa)\b/],

    ['bomba-calor', 'bomba-de-calor-consume-mucho', /\bbomba de calor.*\b(consume|consumo|gasta|gasto)\b/],
    ['bomba-calor', 'bomba-de-calor-no-calienta', /\b(bomba de calor|modo calor|aire acondicionado calor).*\b(no calienta|no funciona|frio)\b/],
    ['bomba-calor', 'que-es-bomba-de-calor-aire-acondicionado', /\b(bomba de calor|frio calor).*\b(que es|como funciona|diferencia|inverter)\b/],
    ['bomba-calor', 'bomba-de-calor-o-aire-acondicionado', /\b(bomba de calor).*\b(aire acondicionado|mejor|diferencia|comparativa)\b|\baire acondicionado.*\bbomba de calor\b/],

    ['ahorro-uso', 'que-temperatura-poner-aire-acondicionado', /\b(temperatura|grados).*\b(aire acondicionado|verano|poner|ideal)\b/],
    ['ahorro-uso', 'como-ahorrar-con-aire-acondicionado', /\b(ahorrar|ahorro|consume|consumo|gasta|factura).*\baire acondicionado\b/],
    ['ahorro-uso', 'modo-dry-sleep-aire-acondicionado', /\b(modo dry|modo sleep|deshumidificador|sleep|dry)\b/],
    ['ahorro-uso', 'aire-acondicionado-inverter-que-es', /\binverter.*\b(aire acondicionado|que es|consume|ahorro)\b|\b(que es|como funciona).*\binverter\b/],

    ['preinstalacion-cassette', 'preinstalacion-aire-acondicionado-que-es', /\bpreinstalacion.*\b(aire acondicionado|que es|como saber|desague|tubos)\b/],
    ['preinstalacion-cassette', 'aire-acondicionado-cassette-que-es', /\bcassette.*\b(aire acondicionado|que es|no enfria|gotea|mantenimiento)\b/],
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
      approvedKeywords: cluster.keywords
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 20)
        .map((item) => item.keyword),
      flags: [...new Set(cluster.keywords.flatMap((item) => String(item.qualityFlags || '').split('|').filter(Boolean)))].join('|'),
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume)

  const outDir = path.join(process.cwd(), '.tmp', 'blog')
  fs.mkdirSync(outDir, { recursive: true })
  const base = path.join(outDir, 'aire-acondicionado-info-expanded')

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
