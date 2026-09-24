// @ts-nocheck
/**
 * Audits Google Ads keyword serving/status fields without changing anything.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const REPORT_PATH = path.join(OUT_DIR, 'keyword-statuses-audit.json')

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

function countBy(items, keyFn) {
  const counts = new Map()
  for (const item of items) {
    const key = keyFn(item) || '(empty)'
    counts.set(key, (counts.get(key) || 0) + 1)
  }
  return Object.fromEntries([...counts.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0]))))
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

  const keywords = (raw?.results || []).map((result) => ({
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

  const interesting = keywords.filter((item) => {
    const haystack = [
      item.status,
      item.primaryStatus,
      item.systemServingStatus,
      ...(item.primaryStatusReasons || []),
    ].join(' ')
    return /LOW|VOLUME|RARE|NOT_ELIGIBLE|ELIGIBLE_LIMITED/i.test(haystack)
  })

  const report = {
    generatedAt: new Date().toISOString(),
    totalKeywords: keywords.length,
    byStatus: countBy(keywords, (item) => item.status),
    byPrimaryStatus: countBy(keywords, (item) => item.primaryStatus),
    bySystemServingStatus: countBy(keywords, (item) => item.systemServingStatus),
    byPrimaryStatusReasons: countBy(
      keywords.flatMap((item) => item.primaryStatusReasons?.length ? item.primaryStatusReasons : ['(none)']),
      (item) => item,
    ),
    interesting,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Total keywords: ${report.totalKeywords}`)
  console.log(`Primary statuses: ${JSON.stringify(report.byPrimaryStatus)}`)
  console.log(`System serving statuses: ${JSON.stringify(report.bySystemServingStatus)}`)
  console.log(`Interesting keywords: ${interesting.length}`)
  for (const item of interesting.slice(0, 80)) {
    console.log(`- ${item.keyword} [${item.matchType}] / ${item.primaryStatus} / ${item.systemServingStatus} / ${(item.primaryStatusReasons || []).join('|')}`)
  }
  if (interesting.length > 80) console.log(`- ... ${interesting.length - 80} more`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
