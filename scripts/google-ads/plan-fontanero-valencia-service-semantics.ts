// @ts-nocheck
/**
 * Read-only Google Ads keyword plan for Reparar24 plumbing services in Valencia.
 *
 * The script collects KeywordPlanIdeaService ideas, keeps only non-zero
 * service-intent keywords, and writes review files. It does not mutate campaigns.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const JSON_PATH = path.join(OUT_DIR, 'fontanero-valencia-service-semantics-plan.json')
const CSV_PATH = path.join(OUT_DIR, 'fontanero-valencia-service-semantics-plan.csv')
const MD_PATH = path.join(OUT_DIR, 'fontanero-valencia-service-semantics-plan.md')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const SPANISH_LANGUAGE_CONSTANT = 'languageConstants/1003'
const VALENCIA_GEO_TARGET = 'geoTargetConstants/20297'
const MAX_KEYWORDS_PER_GROUP = 12

const GROUPS = [
  {
    name: 'Reparacion fugas',
    landing: '/fontanero/reparacion-fugas',
    seeds: ['reparacion fugas agua valencia', 'fuga de agua valencia', 'detectar fuga agua valencia', 'fontanero fuga agua valencia'],
    require: [/fuga/i, /detectar/i, /deteccion/i, /localizar/i],
    exclude: [],
  },
  {
    name: 'Desatascos',
    landing: '/fontanero/desatascos',
    seeds: ['desatascos valencia', 'desatascar tuberia valencia', 'desatascos urgentes valencia', 'fontanero desatascos valencia'],
    require: [/desatasc/i, /atasco/i],
    exclude: [],
  },
  {
    name: 'Instalaciones fontaneria',
    landing: '/fontanero/instalaciones',
    seeds: ['instalacion fontaneria valencia', 'fontanero instalador valencia', 'instalacion sanitarios valencia', 'instalar fontaneria bano valencia'],
    require: [/instal/i, /fontaner/i, /sanitari/i],
    exclude: [/termo/i, /calentador/i, /mampara/i, /banera/i, /bañera/i],
  },
  {
    name: 'Sustitucion tuberias',
    landing: '/fontanero/sustitucion-tuberias',
    seeds: ['cambiar tuberias valencia', 'sustitucion tuberias valencia', 'reparar tuberia valencia', 'renovar tuberias valencia'],
    require: [/tuber/i],
    exclude: [/desatasc/i, /atasco/i],
  },
  {
    name: 'Calentadores termos',
    landing: '/fontanero/calentadores-termos',
    seeds: ['cambiar termo electrico valencia', 'instalar termo electrico valencia', 'reparar termo electrico valencia', 'reparar calentador gas valencia'],
    require: [/termo/i, /calentador/i],
    exclude: [],
  },
  {
    name: 'Mantenimiento fontaneria',
    landing: '/fontanero/mantenimiento',
    seeds: ['mantenimiento fontaneria valencia', 'revision fontaneria valencia', 'mantenimiento tuberias valencia', 'servicio mantenimiento fontaneria valencia'],
    require: [/mantenimiento/i, /revision/i, /fontaner/i, /tuber/i],
    exclude: [/descalcificador/i, /osmosis/i, /ósmosis/i],
  },
  {
    name: 'Cambio banera por ducha',
    landing: '/fontanero/cambio-banera-por-ducha',
    seeds: ['cambiar banera por ducha valencia', 'cambio banera por ducha valencia', 'quitar banera poner ducha valencia', 'sustituir banera por ducha valencia'],
    require: [/banera/i, /bañera/i, /ducha/i],
    exclude: [],
  },
  {
    name: 'Reparacion cisternas',
    landing: '/fontanero/reparacion-cisternas',
    seeds: ['reparar cisterna valencia', 'cisterna pierde agua valencia', 'cisterna gotea valencia', 'arreglar cisterna valencia'],
    require: [/cisterna/i],
    exclude: [],
  },
  {
    name: 'Cambio reparacion grifos',
    landing: '/fontanero/cambio-reparacion-grifos',
    seeds: ['cambiar grifo valencia', 'reparar grifo valencia', 'grifo gotea valencia', 'fontanero cambiar grifo valencia'],
    require: [/grifo/i],
    exclude: [],
  },
  {
    name: 'Grupos presion agua',
    landing: '/fontanero/grupos-presion-agua',
    seeds: ['instalar grupo presion agua valencia', 'reparar grupo presion agua valencia', 'mantenimiento grupo presion agua valencia', 'fontanero grupo presion valencia'],
    require: [/grupo.*presion/i, /presion.*agua/i, /presión.*agua/i, /bomba.*agua/i],
    exclude: [],
  },
  {
    name: 'Descalcificadores osmosis',
    landing: '/fontanero/descalcificadores-osmosis',
    seeds: ['instalar descalcificador valencia', 'reparar descalcificador valencia', 'mantenimiento descalcificador valencia', 'reparar osmosis inversa valencia'],
    require: [/descalcificador/i, /osmosis/i, /ósmosis/i],
    exclude: [],
  },
  {
    name: 'Instalacion cambio inodoros',
    landing: '/fontanero/instalacion-cambio-inodoros',
    seeds: ['cambiar inodoro valencia', 'instalar inodoro valencia', 'reparar wc valencia', 'wc pierde agua valencia'],
    require: [/inodoro/i, /\bwc\b/i, /water/i],
    exclude: [/desatasc/i, /atasco/i],
  },
  {
    name: 'Instalacion lavabos',
    landing: '/fontanero/instalacion-lavabos',
    seeds: ['cambiar lavabo valencia', 'instalar lavabo valencia', 'reparar lavabo valencia', 'fontanero lavabo valencia'],
    require: [/lavabo/i, /sifon/i, /sifón/i],
    exclude: [/desatasc/i, /atasco/i],
  },
  {
    name: 'Mamparas ducha',
    landing: '/fontanero/mamparas-ducha',
    seeds: ['instalar mampara ducha valencia', 'cambiar mampara ducha valencia', 'reparar mampara ducha valencia', 'fontanero mampara ducha valencia'],
    require: [/mampara/i],
    exclude: [],
  },
  {
    name: 'Bajantes',
    landing: '/fontanero/bajantes',
    seeds: ['reparar bajante valencia', 'reparacion bajantes valencia', 'bajantes comunidad valencia', 'cambiar bajante valencia'],
    require: [/bajante/i],
    exclude: [],
  },
  {
    name: 'Reparacion duchas',
    landing: '/fontanero/reparacion-duchas',
    seeds: ['reparar ducha valencia', 'cambiar ducha valencia', 'ducha gotea valencia', 'fontanero ducha valencia'],
    require: [/ducha/i],
    exclude: [/banera/i, /bañera/i, /mampara/i],
  },
]

const BLOCK_PATTERNS = [
  /\bcomprar\b/i,
  /\bventa\b/i,
  /\boferta\b/i,
  /\bbarat/i,
  /\bamazon\b/i,
  /\bleroy\b/i,
  /\bbricodepot\b/i,
  /\bcarrefour\b/i,
  /\bsegunda mano\b/i,
  /\bwallapop\b/i,
  /\bmanual\b/i,
  /\btutorial\b/i,
  /\bpdf\b/i,
  /\byoutube\b/i,
  /\bforo\b/i,
  /\bopiniones\b/i,
  /\bmejor\b/i,
  /\bmarca\b/i,
  /\bmedidas\b/i,
  /\brecambio/i,
  /\brepuesto/i,
  /\bbricolaje\b/i,
  /\bcaser[oa]\b/i,
  /\bcomo\b/i,
  /\bc[oó]mo\b/i,
  /\bpor que\b/i,
  /\bpor qu[eé]\b/i,
  /\bque hacer\b/i,
  /\bqu[eé] hacer\b/i,
  /\btrabajo\b/i,
  /\bempleo\b/i,
  /\bsueldo\b/i,
  /\bcurso\b/i,
  /\b24\s*horas\b/i,
  /\b24h\b/i,
  /\b\d+\s*litros\b/i,
  /\blitros\b/i,
]

const SERVICE_PATTERNS = [
  /\bfontaner/i,
  /\brepar/i,
  /\barregl/i,
  /\binstal/i,
  /\bcambiar/i,
  /\bcambio\b/i,
  /\bsustitu/i,
  /\bdesatasc/i,
  /\bdetectar/i,
  /\bdeteccion/i,
  /\bmantenimiento/i,
  /\brevision/i,
  /\burgente/i,
  /\bservicio/i,
  /\bfuga/i,
  /\bcisterna/i,
  /\bgrifo/i,
  /\bducha/i,
  /\btermo/i,
  /\bcalentador/i,
  /\bbajante/i,
  /\binodoro/i,
  /\blavabo/i,
  /\bmampara/i,
  /\bdescalcificador/i,
  /\bosmosis/i,
  /\bgrupo.*presion/i,
  /\bpresion.*agua/i,
]

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function customerId() {
  return String(process.env.GOOGLE_ADS_ADVERTISING_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function loginCustomerId() {
  return String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function microsToCurrency(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.round((parsed / 1000000) * 100) / 100 : null
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function refreshAccessToken() {
  const raw = await postJson(
    GOOGLE_OAUTH_HOST,
    '/token',
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }).toString(),
    30000,
  )

  if (!raw?.access_token) throw new Error('Google OAuth response did not include access_token.')
  return raw.access_token
}

function googleAdsHeaders(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
    'Content-Type': 'application/json',
  }
  const loginId = loginCustomerId()
  if (loginId) headers['login-customer-id'] = loginId
  return headers
}

async function keywordIdeas(accessToken, seeds) {
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}:generateKeywordIdeas`,
    googleAdsHeaders(accessToken),
    {
      language: SPANISH_LANGUAGE_CONSTANT,
      geoTargetConstants: [VALENCIA_GEO_TARGET],
      includeAdultKeywords: false,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: { keywords: seeds },
      pageSize: 200,
    },
    120000,
  )
}

function normalizeIdea(item, group) {
  const metrics = item.keywordIdeaMetrics || {}
  return {
    group: group.name,
    landing: group.landing,
    keyword: clean(item.text),
    avgMonthlySearches: Number(metrics.avgMonthlySearches || 0),
    competitionIndex: metrics.competitionIndex ?? null,
    competitionLevel: metrics.competition ?? null,
    lowTopOfPageBid: microsToCurrency(metrics.lowTopOfPageBidMicros),
    highTopOfPageBid: microsToCurrency(metrics.highTopOfPageBidMicros),
    recommendedMatchTypes: 'EXACT + PHRASE',
  }
}

function hasAllowedIntent(keyword, group) {
  const normalized = normalize(keyword)
  if (!normalized) return false
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(normalized))) return false
  if (!SERVICE_PATTERNS.some((pattern) => pattern.test(normalized))) return false
  if (!group.require.some((pattern) => pattern.test(normalized))) return false
  if ((group.exclude || []).some((pattern) => pattern.test(normalized))) return false
  return true
}

function writeReports(report) {
  ensureDir(OUT_DIR)
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const rows = [[
    'group',
    'landing',
    'keyword',
    'avg_monthly_searches_valencia',
    'competition_index',
    'competition_level',
    'low_top_of_page_bid_eur',
    'high_top_of_page_bid_eur',
    'recommended_match_types',
  ]]
  for (const item of report.keywords) {
    rows.push([
      item.group,
      item.landing,
      item.keyword,
      item.avgMonthlySearches,
      item.competitionIndex ?? '',
      item.competitionLevel ?? '',
      item.lowTopOfPageBid ?? '',
      item.highTopOfPageBid ?? '',
      item.recommendedMatchTypes,
    ])
  }
  fs.writeFileSync(CSV_PATH, `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')

  const md = [
    '# Fontanero Valencia Google Ads Service Semantics',
    '',
    `Generated: ${report.generatedAt}`,
    `Geo: ${report.geoTarget.label}`,
    `Keywords kept: ${report.summary.keywords}`,
    `Total avg monthly searches: ${report.summary.totalAvgMonthlySearches}`,
    '',
  ]

  for (const group of report.groups) {
    md.push(`## ${group.name}`, '')
    md.push(`Landing: ${group.landing}`, '')
    md.push('| Keyword | Avg monthly searches | Competition | Low bid | High bid |')
    md.push('| --- | ---: | ---: | ---: | ---: |')
    for (const item of report.keywords.filter((keyword) => keyword.group === group.name)) {
      md.push(`| ${item.keyword} | ${item.avgMonthlySearches} | ${item.competitionIndex ?? ''} | ${item.lowTopOfPageBid ?? ''} | ${item.highTopOfPageBid ?? ''} |`)
    }
    md.push('')
  }

  fs.writeFileSync(MD_PATH, `${md.join('\n')}\n`, 'utf8')
}

async function main() {
  requireEnv(REQUIRED_ENV)

  const accessToken = await refreshAccessToken()
  const byKeyword = new Map()
  const groupSummaries = []

  for (const group of GROUPS) {
    console.log(`Collecting ${group.name}`)
    const raw = await keywordIdeas(accessToken, group.seeds)
    await sleep(1000)

    const ideas = (raw?.results || [])
      .map((item) => normalizeIdea(item, group))
      .filter((item) => item.keyword && item.avgMonthlySearches > 0)
      .filter((item) => hasAllowedIntent(item.keyword, group))
      .sort((a, b) => {
        const volumeDiff = b.avgMonthlySearches - a.avgMonthlySearches
        if (volumeDiff !== 0) return volumeDiff
        return Number(b.competitionIndex || 0) - Number(a.competitionIndex || 0)
      })
      .slice(0, MAX_KEYWORDS_PER_GROUP)

    for (const idea of ideas) {
      const key = normalize(idea.keyword)
      const existing = byKeyword.get(key)
      if (!existing || idea.avgMonthlySearches > existing.avgMonthlySearches) {
        byKeyword.set(key, idea)
      }
    }

    groupSummaries.push({
      name: group.name,
      landing: group.landing,
      rawIdeas: raw?.results?.length || 0,
      keptIdeas: ideas.length,
    })
  }

  const keywords = Array.from(byKeyword.values())
    .sort((a, b) => {
      const groupDiff = a.group.localeCompare(b.group, 'es')
      if (groupDiff !== 0) return groupDiff
      const volumeDiff = b.avgMonthlySearches - a.avgMonthlySearches
      if (volumeDiff !== 0) return volumeDiff
      return a.keyword.localeCompare(b.keyword, 'es')
    })

  const report = {
    generatedAt: new Date().toISOString(),
    source: 'google-ads-generateKeywordIdeas',
    geoTarget: {
      label: 'Valencia, Spain',
      resourceName: VALENCIA_GEO_TARGET,
    },
    language: SPANISH_LANGUAGE_CONSTANT,
    groups: groupSummaries,
    summary: {
      keywords: keywords.length,
      totalAvgMonthlySearches: keywords.reduce((sum, item) => sum + Number(item.avgMonthlySearches || 0), 0),
    },
    keywords,
  }

  writeReports(report)

  console.log(`Keywords kept: ${report.summary.keywords}`)
  console.log(`Total avg monthly searches: ${report.summary.totalAvgMonthlySearches}`)
  console.log(`JSON: ${path.relative(process.cwd(), JSON_PATH)}`)
  console.log(`CSV: ${path.relative(process.cwd(), CSV_PATH)}`)
  console.log(`MD: ${path.relative(process.cwd(), MD_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
