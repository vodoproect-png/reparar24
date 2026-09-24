// @ts-nocheck
/**
 * Removes Google Ads keywords that are currently not eligible because of low search volume.
 * Does not print secrets. Writes a before/after report to .tmp/google-ads.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const REPORT_PATH = path.join(OUT_DIR, 'removed-low-search-volume-keywords.json')
const DENYLIST_PATH = path.join(process.cwd(), 'data', 'google-ads-keyword-denylist.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
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

function readDenylist() {
  if (!fs.existsSync(DENYLIST_PATH)) return { lowSearchVolume: [] }
  return JSON.parse(fs.readFileSync(DENYLIST_PATH, 'utf8'))
}

function writeDenylistWith(matches) {
  const denylist = readDenylist()
  const current = Array.isArray(denylist.lowSearchVolume) ? denylist.lowSearchVolume : []
  const byNormalized = new Map(current.map((keyword) => [normalize(keyword), keyword]))

  for (const match of matches) {
    const key = normalize(match.keyword)
    if (key && !byNormalized.has(key)) byNormalized.set(key, match.keyword)
  }

  const next = {
    ...denylist,
    lowSearchVolume: [...byNormalized.values()].sort((a, b) => normalize(a).localeCompare(normalize(b))),
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(DENYLIST_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  return next.lowSearchVolume.length - current.length
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
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/adGroupCriteria:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    120000,
  )
}

function isLowSearchVolumeKeyword(result) {
  const criterion = result.adGroupCriterion || {}
  const reasons = criterion.primaryStatusReasons || []

  return criterion.systemServingStatus === 'LOW_SEARCH_VOLUME'
    || criterion.systemServingStatus === 'RARELY_SERVED'
    || (
      criterion.primaryStatus === 'NOT_ELIGIBLE'
      && reasons.some((reason) => /LOW_SEARCH_VOLUME|RARELY_SERVED/.test(String(reason)))
    )
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const accessToken = await refreshAccessToken()
  const raw = await search(
    accessToken,
    [
      'SELECT',
      'campaign.name, ad_group.name, ad_group_criterion.resource_name,',
      'ad_group_criterion.status, ad_group_criterion.primary_status, ad_group_criterion.primary_status_reasons,',
      'ad_group_criterion.system_serving_status,',
      'ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type',
      'FROM keyword_view',
      "WHERE ad_group_criterion.status != 'REMOVED'",
      'LIMIT 10000',
    ].join(' '),
  )

  const matches = (raw?.results || [])
    .filter(isLowSearchVolumeKeyword)
    .map((result) => ({
      campaignName: result.campaign?.name,
      adGroupName: result.adGroup?.name,
      resourceName: result.adGroupCriterion?.resourceName,
      keyword: result.adGroupCriterion?.keyword?.text,
      matchType: result.adGroupCriterion?.keyword?.matchType,
      status: result.adGroupCriterion?.status,
      primaryStatus: result.adGroupCriterion?.primaryStatus,
      primaryStatusReasons: result.adGroupCriterion?.primaryStatusReasons || [],
      systemServingStatus: result.adGroupCriterion?.systemServingStatus,
    }))
    .filter((item) => item.resourceName)

  const operations = matches.map((item) => ({ remove: item.resourceName }))
  const response = await mutate(accessToken, operations)
  const addedToDenylist = writeDenylistWith(matches)

  const report = {
    generatedAt: new Date().toISOString(),
    matchedCriteria: matches.length,
    removedCriteria: response?.results?.length || 0,
    addedToDenylist,
    denylistPath: path.relative(process.cwd(), DENYLIST_PATH),
    matches,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(`Matched low-search-volume keywords: ${report.matchedCriteria}`)
  console.log(`Removed criteria: ${report.removedCriteria}`)
  console.log(`Added to denylist: ${report.addedToDenylist}`)
  for (const item of matches.slice(0, 80)) {
    console.log(`- ${item.keyword} [${item.matchType}] / ${item.adGroupName} / ${item.campaignName}`)
  }
  if (matches.length > 80) console.log(`- ... ${matches.length - 80} more`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
