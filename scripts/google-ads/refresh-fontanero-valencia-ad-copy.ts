// @ts-nocheck
/**
 * Replaces the paused Fontanero Valencia pilot RSA copy with more conversion-led text.
 *
 * Existing ad group ads in the pilot campaign are removed, then new PAUSED RSAs
 * are created. The campaign, ad groups and keywords remain PAUSED.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')
const { childServicesData } = require('../../data/fontanero/child-services-seo')
const { FONTANERO_PAGE_REGISTRY } = require('../../data/seo/page-registry')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-ad-copy-refresh.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

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

function titleCaseSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
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

function buildAds(slug, service) {
  const serviceName = truncateGoogleText(service.h1, 30)
  const primary = truncateGoogleText(service.lockedPrimaryKw, 30)

  const headlines = unique([
    'Fontanero en Valencia',
    serviceName,
    primary,
    'Presupuesto Claro',
    'Reparar24 Fontaneros',
    'Llegada 30-60 Min',
    'Garantia 2 Anos',
    'Tecnicos Certificados',
    'Pide Presupuesto',
    'Habla por WhatsApp',
    'Solucion Hoy',
    'Revisa tu Averia',
    'Llamanos Ahora',
    'Servicio Profesional',
    'Reparacion con Garantia',
  ]).map((text) => ({ text: truncateGoogleText(text, 30) })).slice(0, 15)

  const descriptions = unique([
    'Cuentanos la averia y te orientamos antes de intervenir. Presupuesto claro en Valencia.',
    'Respuesta rapida por telefono o WhatsApp. Coordinamos la visita sin compromiso.',
    truncateGoogleText(service.metaDescription, 90),
    'Tecnicos identificados, garantia por escrito y explicacion clara antes de empezar.',
  ]).map((text) => ({ text: truncateGoogleText(text, 90) })).slice(0, 4)

  return {
    finalUrl: `https://reparar24.es/fontanero/${slug}?utm_source=google&utm_medium=cpc&utm_campaign=fontanero_valencia_search_test&utm_content=${slug}`,
    headlines,
    descriptions,
  }
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

function buildExpectedAdGroups() {
  const slugs = FONTANERO_PAGE_REGISTRY.children
    .filter((entry) => entry.allowed && entry.status === 'approved')
    .map((entry) => entry.slug)

  const byName = new Map()
  for (const slug of slugs) {
    const service = childServicesData[slug]
    if (!service) continue
    byName.set(truncateGoogleText(`FON | ${titleCaseSlug(slug)} | Valencia`, 255), {
      slug,
      service,
      ad: buildAds(slug, service),
    })
  }

  return byName
}

async function listAdGroups(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group.resource_name, ad_group.name FROM ad_group WHERE ad_group.campaign = '${campaign}'`,
  )

  return (raw?.results || []).map((result) => result.adGroup).filter(Boolean)
}

async function listAdGroupAds(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group_ad.resource_name FROM ad_group_ad WHERE ad_group.campaign = '${campaign}'`,
  )

  return (raw?.results || [])
    .map((result) => result.adGroupAd?.resourceName)
    .filter(Boolean)
}

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const expected = buildExpectedAdGroups()
  const adGroups = await listAdGroups(accessToken, campaign)
  const oldAds = await listAdGroupAds(accessToken, campaign)

  await mutate(accessToken, 'adGroupAds', oldAds.map((resourceName) => ({ remove: resourceName })))

  const createOperations = []
  const missing = []

  for (const adGroup of adGroups) {
    const item = expected.get(adGroup.name)
    if (!item) {
      missing.push(adGroup.name)
      continue
    }

    createOperations.push({
      create: {
        adGroup: adGroup.resourceName,
        status: 'PAUSED',
        ad: {
          finalUrls: [item.ad.finalUrl],
          responsiveSearchAd: {
            headlines: item.ad.headlines,
            descriptions: item.ad.descriptions,
          },
        },
      },
    })
  }

  const created = await mutate(accessToken, 'adGroupAds', createOperations)
  const report = {
    campaign,
    removedAds: oldAds.length,
    createdAds: created?.results?.length || 0,
    missingAdGroups: missing,
    status: 'New ads are paused. Campaign remains paused.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Removed ${report.removedAds} old ads and created ${report.createdAds} refreshed paused ads.`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
