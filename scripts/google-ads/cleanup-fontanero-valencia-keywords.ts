// @ts-nocheck
/**
 * Removes low-intent or brand/competitor keywords from the Fontanero Valencia campaign.
 * Does not print secrets. Writes a report to .tmp/google-ads.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-cleanup.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const REMOVE_TEXTS = [
  'almacen fontaneria valencia',
  'fontaneria giner valencia',
  'desatascos net valencia',
  'desatascos baratos valencia',
  'desatascos valencia baratos',
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
    .replace(/[Вї?ВЎ!.,;:()"'`Вґ|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/adGroupCriteria:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    120000,
  )
}

function readCampaignResourceName() {
  const envCampaign = process.env.GOOGLE_ADS_FONTANERO_VALENCIA_CAMPAIGN_RESOURCE
  if (envCampaign) return envCampaign
  const execution = JSON.parse(fs.readFileSync(EXECUTION_PATH, 'utf8'))
  if (!execution.campaign) throw new Error('Execution report does not include campaign resource name.')
  return execution.campaign
}

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const accessToken = await refreshAccessToken()
  const campaign = readCampaignResourceName()
  const removeKeys = new Set(REMOVE_TEXTS.map(normalize))

  const raw = await search(
    accessToken,
    [
      'SELECT',
      'ad_group.name, ad_group_criterion.resource_name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type',
      'FROM keyword_view',
      `WHERE campaign.resource_name = '${campaign}'`,
      "AND ad_group_criterion.status != 'REMOVED'",
      'LIMIT 2000',
    ].join(' '),
  )

  const matches = []
  for (const result of raw?.results || []) {
    const text = result.adGroupCriterion?.keyword?.text || ''
    if (!removeKeys.has(normalize(text))) continue
    matches.push({
      adGroupName: result.adGroup?.name,
      resourceName: result.adGroupCriterion?.resourceName,
      keyword: text,
      matchType: result.adGroupCriterion?.keyword?.matchType,
    })
  }

  const response = await mutate(accessToken, matches.map((item) => ({ remove: item.resourceName })))
  const report = {
    generatedAt: new Date().toISOString(),
    campaign,
    removeTexts: REMOVE_TEXTS,
    matchedCriteria: matches.length,
    removedCriteria: response?.results?.length || 0,
    matches,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Matched criteria: ${report.matchedCriteria}`)
  console.log(`Removed criteria: ${report.removedCriteria}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
