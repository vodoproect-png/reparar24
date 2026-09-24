// @ts-nocheck
/**
 * Adds a general Fontanero Valencia ad group to the existing pilot campaign.
 *
 * Landing page: /fontanero
 * Match types: EXACT + PHRASE only
 * Bid: 0.45 EUR by default
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-general-ad-group.json')

const AD_GROUP_NAME = 'FON General Fontanero Valencia'
const FINAL_URL = 'https://reparar24.es/fontanero?utm_source=google&utm_medium=cpc&utm_campaign=fontanero_valencia_search_test&utm_content=general_fontanero'

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const KEYWORDS = [
  'fontanero valencia',
  'fontaneros valencia',
  'fontanero en valencia',
  'fontanero cerca de mi',
  'fontanero urgente valencia',
  'fontanero rapido valencia',
  'fontanero profesional valencia',
  'servicio fontaneria valencia',
  'reparacion fontaneria valencia',
  'fontaneria valencia',
  'fontanero a domicilio valencia',
  'fontanero presupuesto valencia',
]

function parseArgs() {
  const args = process.argv.slice(2)
  const index = args.indexOf('--max-cpc-eur')
  const value = index >= 0 && args[index + 1] ? Number(args[index + 1]) : 0.45
  return {
    maxCpcEur: Number.isFinite(value) && value > 0 ? value : 0.45,
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function eurosToMicros(value) {
  return String(Math.round(Number(value) * 1000000))
}

function cleanText(value) {
  return String(value || '')
    .replace(/[¿?¡!|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateGoogleText(text, limit) {
  const normalized = cleanText(text)
  if (normalized.length <= limit) return normalized
  const cut = normalized.slice(0, limit + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 12 ? lastSpace : limit).trim()
}

function unique(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = cleanText(item).toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function customerId() {
  return String(process.env.GOOGLE_ADS_ADVERTISING_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function loginCustomerId() {
  return String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
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
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/googleAds:search`,
    googleAdsHeaders(accessToken),
    { query },
    60000,
  )
}

async function mutate(accessToken, service, operations) {
  if (!operations.length) return { results: [] }

  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/${service}:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    60000,
  )
}

function readCampaignResourceName() {
  const envCampaign = process.env.GOOGLE_ADS_FONTANERO_VALENCIA_CAMPAIGN_RESOURCE
  if (envCampaign) return envCampaign

  if (!fs.existsSync(EXECUTION_PATH)) {
    throw new Error(`Missing execution report: ${path.relative(process.cwd(), EXECUTION_PATH)}.`)
  }

  const execution = JSON.parse(fs.readFileSync(EXECUTION_PATH, 'utf8'))
  if (!execution.campaign) throw new Error('Execution report does not include campaign resource name.')
  return execution.campaign
}

function quote(value) {
  return String(value).replace(/'/g, "\\'")
}

async function findAdGroup(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group.resource_name, ad_group.name, ad_group.status FROM ad_group WHERE ad_group.campaign = '${campaign}' AND ad_group.name = '${quote(AD_GROUP_NAME)}' LIMIT 1`,
  )

  return raw?.results?.[0]?.adGroup || null
}

function buildKeywordOperations(adGroup, cpcBidMicros) {
  const keywordTexts = unique(KEYWORDS)
  return keywordTexts.flatMap((text) => ([
    {
      create: {
        adGroup,
        status: 'ENABLED',
        cpcBidMicros,
        keyword: { text, matchType: 'EXACT' },
      },
    },
    {
      create: {
        adGroup,
        status: 'ENABLED',
        cpcBidMicros,
        keyword: { text, matchType: 'PHRASE' },
      },
    },
  ]))
}

function buildAdOperation(adGroup) {
  const headlines = unique([
    'Fontanero en Valencia',
    'Fontaneros Valencia',
    'Presupuesto Claro',
    'Pide Presupuesto',
    'Habla por WhatsApp',
    'Llegada 30-60 Min',
    'Tecnicos Certificados',
    'Garantia 2 Anos',
    'Solucion Hoy',
    'Llamanos Ahora',
    'Sin Compromiso',
    'Reparar24 Fontaneros',
    'Servicio Profesional',
    'Revisa tu Averia',
    'Reparacion con Garantia',
  ]).map((text) => ({ text: truncateGoogleText(text, 30) })).slice(0, 15)

  const descriptions = unique([
    'Fontanero en Valencia para vivienda, local o comunidad. Presupuesto claro antes de empezar.',
    'Cuentanos la averia por telefono o WhatsApp y coordinamos la visita sin compromiso.',
    'Reparamos fugas, grifos, cisternas, termos e instalaciones con garantia por escrito.',
    'Tecnicos identificados, respuesta rapida y explicacion clara de la solucion.',
  ]).map((text) => ({ text: truncateGoogleText(text, 90) })).slice(0, 4)

  return {
    create: {
      adGroup,
      status: 'ENABLED',
      ad: {
        finalUrls: [FINAL_URL],
        responsiveSearchAd: {
          headlines,
          descriptions,
        },
      },
    },
  }
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const options = parseArgs()
  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const cpcBidMicros = eurosToMicros(options.maxCpcEur)
  let adGroup = await findAdGroup(accessToken, campaign)
  let createdAdGroup = false
  let createdKeywords = 0
  let createdAds = 0

  if (!adGroup) {
    const adGroupResponse = await mutate(accessToken, 'adGroups', [{
      create: {
        name: AD_GROUP_NAME,
        status: 'ENABLED',
        campaign,
        type: 'SEARCH_STANDARD',
        cpcBidMicros,
      },
    }])

    const adGroupResourceName = adGroupResponse?.results?.[0]?.resourceName
    if (!adGroupResourceName) throw new Error('Ad group creation did not return resourceName.')
    adGroup = { resourceName: adGroupResourceName, name: AD_GROUP_NAME, status: 'ENABLED' }
    createdAdGroup = true

    const keywordResponse = await mutate(accessToken, 'adGroupCriteria', buildKeywordOperations(adGroup.resourceName, cpcBidMicros))
    createdKeywords = keywordResponse?.results?.length || 0

    const adResponse = await mutate(accessToken, 'adGroupAds', [buildAdOperation(adGroup.resourceName)])
    createdAds = adResponse?.results?.length || 0
  }

  const report = {
    campaign,
    adGroupName: AD_GROUP_NAME,
    adGroupResourceName: adGroup.resourceName,
    maxCpcEur: options.maxCpcEur,
    cpcBidMicros,
    createdAdGroup,
    createdKeywords,
    createdAds,
    landingPage: FINAL_URL,
    status: createdAdGroup
      ? 'General fontanero ad group created and enabled.'
      : 'General fontanero ad group already existed; no duplicate was created.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(report.status)
  console.log(`Created keywords: ${createdKeywords}`)
  console.log(`Created ads: ${createdAds}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
