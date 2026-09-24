// @ts-nocheck
/**
 * Expands the active Fontanero Valencia Search campaign with Google Ads keyword
 * ideas scoped to Valencia.
 *
 * Safety:
 * - Uses Google Search only keyword ideas.
 * - Adds only EXACT + PHRASE.
 * - Skips informational, DIY, jobs, shops and already-existing keywords.
 * - Does not change budget, bids, ads or campaign status.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-expansion.json')
const CSV_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-expansion.csv')
const DENYLIST_PATH = path.join(process.cwd(), 'data', 'google-ads-keyword-denylist.json')

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
const MAX_TEXTS_PER_GROUP = 8
const MAX_TEXTS_TOTAL = 80
const DEFAULT_MAX_CPC_MICROS = '450000'

const SEEDS_BY_GROUP = [
  {
    name: 'FON General Fontanero Valencia',
    seeds: ['fontanero valencia', 'fontaneria valencia', 'fontanero urgente valencia', 'servicio fontaneria valencia'],
    mustInclude: [/fontaner/i],
  },
  {
    name: 'FON Reparacion Fugas Valencia',
    seeds: ['reparacion fugas agua valencia', 'detectar fuga agua valencia', 'fuga de agua valencia'],
    mustInclude: [/fuga/i, /detectar/i, /deteccion/i],
  },
  {
    name: 'FON Desatascos Valencia',
    seeds: ['desatascos valencia', 'desatascos tuberias valencia', 'empresa desatascos valencia'],
    mustInclude: [/desatasc/i, /atasco/i],
  },
  {
    name: 'FON Instalaciones Valencia',
    seeds: ['instalacion fontaneria valencia', 'instalacion fontaneria baño valencia', 'instalar grifo valencia'],
    mustInclude: [/instal/i, /fontaner/i],
  },
  {
    name: 'FON Sustitucion Tuberias Valencia',
    seeds: ['sustitucion tuberias valencia', 'cambiar tuberias valencia', 'reparar tuberia valencia'],
    mustInclude: [/tuber/i],
  },
  {
    name: 'FON Calentadores Termos Valencia',
    seeds: ['termo electrico valencia', 'instalar termo electrico valencia', 'reparar termo electrico valencia'],
    mustInclude: [/termo/i, /calentador/i],
  },
  {
    name: 'FON Mantenimiento Valencia',
    seeds: ['mantenimiento fontaneria valencia', 'revision fontaneria valencia', 'mantenimiento tuberias valencia'],
    mustInclude: [/mantenimiento/i, /revision/i],
  },
  {
    name: 'FON Cambio Reparacion Grifos Valencia',
    seeds: ['cambiar grifo valencia', 'reparar grifo valencia', 'grifo gotea valencia'],
    mustInclude: [/grifo/i],
  },
  {
    name: 'FON Reparacion Cisternas Valencia',
    seeds: ['reparar cisterna valencia', 'cisterna pierde agua valencia', 'cisterna gotea valencia'],
    mustInclude: [/cisterna/i],
  },
  {
    name: 'FON Reparacion Duchas Valencia',
    seeds: ['reparar ducha valencia', 'cambiar ducha valencia', 'cambio de ducha valencia'],
    mustInclude: [/ducha/i],
  },
  {
    name: 'FON Cambio Banera Por Ducha Valencia',
    seeds: ['cambiar bañera por ducha valencia', 'cambio bañera por ducha valencia', 'bañera por ducha valencia'],
    mustInclude: [/banera/i, /bañera/i, /ducha/i],
  },
  {
    name: 'FON Instalacion Cambio Inodoros Valencia',
    seeds: ['instalar inodoro valencia', 'cambiar inodoro valencia', 'instalacion inodoro valencia'],
    mustInclude: [/inodoro/i, /wc/i],
  },
  {
    name: 'FON Instalacion Lavabos Valencia',
    seeds: ['instalar lavabo valencia', 'cambiar lavabo valencia', 'reparar lavabo valencia'],
    mustInclude: [/lavabo/i],
  },
  {
    name: 'FON Mamparas Ducha Valencia',
    seeds: ['mamparas ducha valencia', 'reparar mampara ducha valencia', 'cambiar mampara ducha valencia'],
    mustInclude: [/mampara/i],
  },
  {
    name: 'FON Bajantes Valencia',
    seeds: ['reparacion bajantes valencia', 'reparar bajante valencia', 'bajantes comunidad valencia'],
    mustInclude: [/bajante/i],
  },
  {
    name: 'FON Grupos Presion Agua Valencia',
    seeds: ['grupo presion agua valencia', 'instalar grupo presion agua valencia', 'reparar grupo presion valencia'],
    mustInclude: [/presion/i, /presión/i],
  },
  {
    name: 'FON Descalcificadores Osmosis Valencia',
    seeds: ['descalcificador valencia', 'osmosis inversa valencia', 'reparar osmosis valencia'],
    mustInclude: [/descalcificador/i, /osmosis/i],
  },
]

const BLOCK_PATTERNS = [
  /\bgratis\b/i,
  /\bbaratos?\b/i,
  /\balmacen\b/i,
  /\balmac[eГ©]n\b/i,
  /\bbricolaje\b/i,
  /\bcaser[oa]\b/i,
  /\bcomo\b/i,
  /\bc[oó]mo\b/i,
  /\bque hacer\b/i,
  /\bqu[eé] hacer\b/i,
  /\bpor qu[eé]\b/i,
  /\btutorial\b/i,
  /\bmanual\b/i,
  /\bguia\b/i,
  /\bguía\b/i,
  /\bpdf\b/i,
  /\byoutube\b/i,
  /\bforo\b/i,
  /\bblog\b/i,
  /\bcurso\b/i,
  /\bempleo\b/i,
  /\btrabajo\b/i,
  /\bsueldo\b/i,
  /\bsalario\b/i,
  /\bamazon\b/i,
  /\bleroy\b/i,
  /\bikea\b/i,
  /\bginer\b/i,
  /\bdesatascos net\b/i,
  /\bcomprar\b/i,
  /\bventa\b/i,
  /\bsegunda mano\b/i,
  /\bwallapop\b/i,
]

const SERVICE_INTENT_PATTERNS = [
  /\bfontaner/i,
  /\brepar/i,
  /\barregl/i,
  /\bcambiar/i,
  /\binstal/i,
  /\bsustitu/i,
  /\bdesatasc/i,
  /\bdetectar/i,
  /\bmantenimiento/i,
  /\brevision/i,
  /\burgente/i,
  /\bpresupuesto/i,
  /\bservicio/i,
]

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

function readDenylist() {
  if (!fs.existsSync(DENYLIST_PATH)) return new Set()
  const raw = JSON.parse(fs.readFileSync(DENYLIST_PATH, 'utf8'))
  return new Set([...(raw.lowSearchVolume || [])].map(normalize))
}

function eurosToMicros(value) {
  return String(Math.round(Number(value) * 1000000))
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

async function search(accessToken, query) {
  return postJsonWithRetry(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/googleAds:search`,
    googleAdsHeaders(accessToken),
    { query },
    60000,
  )
}

async function mutate(accessToken, operations) {
  if (!operations.length) return { results: [] }
  return postJsonWithRetry(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/adGroupCriteria:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    120000,
  )
}

async function keywordIdeas(accessToken, seeds) {
  return postJsonWithRetry(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}:generateKeywordIdeas`,
    googleAdsHeaders(accessToken),
    {
      language: SPANISH_LANGUAGE_CONSTANT,
      geoTargetConstants: [VALENCIA_GEO_TARGET],
      includeAdultKeywords: false,
      keywordPlanNetwork: 'GOOGLE_SEARCH',
      keywordSeed: { keywords: seeds },
      pageSize: 100,
    },
    120000,
  )
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function retryDelayFromMessage(message) {
  const match = String(message || '').match(/Retry in (\d+) seconds/i)
  if (!match) return null
  return Number(match[1]) * 1000
}

async function postJsonWithRetry(hostname, pathName, headers, body, timeoutMs = 60000, attempts = 4) {
  let lastError = null
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await postJson(hostname, pathName, headers, body, timeoutMs)
    } catch (error) {
      lastError = error
      const message = error?.message || ''
      const isRateLimit = message.includes('HTTP 429') || message.includes('RESOURCE_EXHAUSTED')
      if (!isRateLimit || attempt === attempts) break
      const delay = retryDelayFromMessage(message) || attempt * 5000
      console.log(`Google Ads rate limit, retry ${attempt}/${attempts - 1} after ${Math.ceil(delay / 1000)}s`)
      await sleep(delay + 750)
    }
  }
  throw lastError
}

function readCampaignResourceName() {
  const envCampaign = process.env.GOOGLE_ADS_FONTANERO_VALENCIA_CAMPAIGN_RESOURCE
  if (envCampaign) return envCampaign
  const execution = JSON.parse(fs.readFileSync(EXECUTION_PATH, 'utf8'))
  if (!execution.campaign) throw new Error('Execution report does not include campaign resource name.')
  return execution.campaign
}

async function collectAdGroups(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group.resource_name, ad_group.name, ad_group.cpc_bid_micros FROM ad_group WHERE ad_group.campaign = '${campaign}' AND ad_group.status = 'ENABLED'`,
  )
  const byName = new Map()
  for (const result of raw?.results || []) {
    byName.set(result.adGroup?.name, result.adGroup)
  }
  return byName
}

async function collectExistingKeywordKeys(accessToken, campaign) {
  const raw = await search(
    accessToken,
    [
      'SELECT',
      '  ad_group.name,',
      '  ad_group_criterion.keyword.text,',
      '  ad_group_criterion.keyword.match_type',
      'FROM keyword_view',
      `WHERE campaign.resource_name = '${campaign}'`,
      "  AND ad_group_criterion.status != 'REMOVED'",
      'LIMIT 2000',
    ].join(' '),
  )

  const keys = new Set()
  const textKeys = new Set()
  for (const result of raw?.results || []) {
    const group = result.adGroup?.name || ''
    const text = normalize(result.adGroupCriterion?.keyword?.text)
    const matchType = result.adGroupCriterion?.keyword?.matchType || ''
    if (!text) continue
    keys.add(`${group}::${text}::${matchType}`)
    textKeys.add(text)
  }
  return { keys, textKeys }
}

function isCommercialIdea(text, config) {
  const normalized = normalize(text)
  if (!normalized) return false
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(normalized))) return false
  if (!SERVICE_INTENT_PATTERNS.some((pattern) => pattern.test(normalized))) return false
  if (!config.mustInclude.some((pattern) => pattern.test(normalized))) return false
  return true
}

function normalizeIdea(item) {
  const metrics = item.keywordIdeaMetrics || {}
  return {
    keyword: clean(item.text),
    avgMonthlySearches: Number(metrics.avgMonthlySearches || 0),
    competitionIndex: metrics.competitionIndex ?? null,
    competitionLevel: metrics.competition ?? null,
    lowTopOfPageBid: microsToCurrency(metrics.lowTopOfPageBidMicros),
    highTopOfPageBid: microsToCurrency(metrics.highTopOfPageBidMicros),
  }
}

function operationsForCandidate(candidate, adGroup, existingKeys) {
  const cpcBidMicros = adGroup.cpcBidMicros || DEFAULT_MAX_CPC_MICROS
  const ops = []
  for (const matchType of ['EXACT', 'PHRASE']) {
    const key = `${adGroup.name}::${normalize(candidate.keyword)}::${matchType}`
    if (existingKeys.has(key)) continue
    ops.push({
      create: {
        adGroup: adGroup.resourceName,
        status: 'ENABLED',
        cpcBidMicros,
        keyword: {
          text: candidate.keyword,
          matchType,
        },
      },
    })
    existingKeys.add(key)
  }
  return ops
}

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const accessToken = await refreshAccessToken()
  const campaign = readCampaignResourceName()
  const adGroups = await collectAdGroups(accessToken, campaign)
  const existing = await collectExistingKeywordKeys(accessToken, campaign)
  const denylist = readDenylist()

  const selected = []
  const skipped = []
  const selectedTextKeys = new Set(existing.textKeys)

  for (const config of SEEDS_BY_GROUP) {
    const adGroup = adGroups.get(config.name)
    if (!adGroup) {
      skipped.push({ adGroup: config.name, reason: 'missing ad group' })
      continue
    }

    console.log(`Collecting ideas: ${config.name}`)
    const raw = await keywordIdeas(accessToken, config.seeds)
    await sleep(900)
    const ideas = (raw?.results || [])
      .map(normalizeIdea)
      .filter((item) => item.keyword && item.avgMonthlySearches > 0)
      .filter((item) => !denylist.has(normalize(item.keyword)))
      .filter((item) => isCommercialIdea(item.keyword, config))
      .filter((item) => {
        const key = normalize(item.keyword)
        if (selectedTextKeys.has(key)) return false
        selectedTextKeys.add(key)
        return true
      })
      .sort((a, b) => {
        const volumeDiff = b.avgMonthlySearches - a.avgMonthlySearches
        if (volumeDiff !== 0) return volumeDiff
        return Number(b.competitionIndex || 0) - Number(a.competitionIndex || 0)
      })
      .slice(0, MAX_TEXTS_PER_GROUP)

    for (const idea of ideas) {
      selected.push({
        ...idea,
        adGroupName: config.name,
        adGroupResourceName: adGroup.resourceName,
      })
      if (selected.length >= MAX_TEXTS_TOTAL) break
    }
    if (selected.length >= MAX_TEXTS_TOTAL) break
  }

  const operations = []
  for (const candidate of selected) {
    const adGroup = adGroups.get(candidate.adGroupName)
    operations.push(...operationsForCandidate(candidate, adGroup, existing.keys))
  }

  const response = await mutate(accessToken, operations)

  const report = {
    generatedAt: new Date().toISOString(),
    campaign,
    geoTarget: VALENCIA_GEO_TARGET,
    selectedKeywordTexts: selected.length,
    createdCriteria: response?.results?.length || 0,
    skipped,
    selected,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  const rows = [[
    'ad_group',
    'keyword',
    'avg_monthly_searches_valencia',
    'competition_index',
    'competition_level',
    'low_top_of_page_bid_eur',
    'high_top_of_page_bid_eur',
  ]]
  for (const item of selected) {
    rows.push([
      item.adGroupName,
      item.keyword,
      item.avgMonthlySearches,
      item.competitionIndex ?? '',
      item.competitionLevel ?? '',
      item.lowTopOfPageBid ?? '',
      item.highTopOfPageBid ?? '',
    ])
  }
  fs.writeFileSync(CSV_PATH, `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')

  console.log(`Selected keyword texts: ${selected.length}`)
  console.log(`Created criteria: ${report.createdCriteria}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
  console.log(`CSV: ${path.relative(process.cwd(), CSV_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
