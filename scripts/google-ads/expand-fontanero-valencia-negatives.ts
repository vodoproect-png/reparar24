// @ts-nocheck
/**
 * Expands campaign-level negative keywords for the Fontanero Valencia pilot.
 *
 * Adds only missing negatives and does not change campaign/ad group/keyword
 * activation state.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-negative-keywords.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const NEGATIVE_KEYWORDS = [
  // Free / informational intent
  'gratis',
  'barato gratis',
  'sin pagar',
  'tutorial',
  'tutoriales',
  'manual',
  'guia',
  'guía',
  'pdf',
  'video',
  'videos',
  'youtube',
  'foro',
  'blog',
  'opiniones trabajo',
  'como hacer',
  'cómo hacer',
  'hazlo tu mismo',
  'hazlo tú mismo',
  'bricolaje',
  'casero',
  'casera',
  'remedio casero',
  'reparar yo mismo',
  'arreglar yo mismo',
  'sin fontanero',
  'sin llamar',

  // Jobs / education
  'trabajo',
  'empleo',
  'ofertas de empleo',
  'vacante',
  'vacantes',
  'curriculum',
  'currículum',
  'cv',
  'sueldo',
  'salario',
  'aprendiz',
  'practicas',
  'prácticas',
  'curso',
  'cursos',
  'formacion',
  'formación',
  'fp',
  'oposiciones',
  'certificado profesional',

  // Stores / ecommerce / parts only
  'amazon',
  'ikea',
  'leroy merlin',
  'bricodepot',
  'bricomart',
  'obi',
  'carrefour',
  'aliexpress',
  'segunda mano',
  'wallapop',
  'milanuncios',
  'comprar',
  'venta',
  'precio pieza',
  'recambios',
  'repuestos',
  'material fontaneria',
  'material fontanería',
  'herramientas',
  'alquiler herramientas',
  'tubo pvc comprar',
  'grifo comprar',
  'termo comprar',

  // Non-service / comparison noise
  'telefono gratis',
  'telefono atencion cliente',
  'teléfono atención cliente',
  'seguro hogar telefono',
  'seguro hogar teléfono',
  'mapa',
  'imagenes',
  'imágenes',
  'fotos',
  'plantilla',
  'normativa pdf',
  'licencia',
  'colegio profesional',
]

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function normalize(text) {
  return String(text || '').trim().replace(/\s+/g, ' ').toLowerCase()
}

function unique(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = normalize(item)
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

async function mutate(accessToken, operations) {
  if (!operations.length) return { results: [] }

  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/campaignCriteria:mutate`,
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

async function listExistingNegativeKeywords(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign_criterion.campaign = '${campaign}' AND campaign_criterion.negative = true AND campaign_criterion.type = 'KEYWORD'`,
  )

  return (raw?.results || [])
    .map((result) => result.campaignCriterion?.keyword?.text)
    .filter(Boolean)
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const existing = await listExistingNegativeKeywords(accessToken, campaign)
  const existingSet = new Set(existing.map(normalize))
  const candidates = unique(NEGATIVE_KEYWORDS)
  const missing = candidates.filter((keyword) => !existingSet.has(normalize(keyword)))

  const response = await mutate(accessToken, missing.map((text) => ({
    create: {
      campaign,
      negative: true,
      keyword: {
        text,
        matchType: 'BROAD',
      },
    },
  })))

  const report = {
    campaign,
    existingBefore: existing.length,
    desiredTotalUnique: candidates.length,
    added: response?.results?.length || 0,
    skippedExisting: candidates.length - missing.length,
    addedKeywords: missing,
    matchType: 'BROAD',
    status: 'Campaign activation state was not changed.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Existing negatives before: ${report.existingBefore}`)
  console.log(`Added negatives: ${report.added}`)
  console.log(`Skipped existing: ${report.skippedExisting}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
