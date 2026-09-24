// @ts-nocheck
/**
 * Read-only list of Reparar24 Google Ads search campaigns.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const REPORT_PATH = path.join(OUT_DIR, 'reparar24-search-campaigns.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

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

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const accessToken = await refreshAccessToken()
  const raw = await search(accessToken, [
    'SELECT',
    '  campaign.resource_name,',
    '  campaign.id,',
    '  campaign.name,',
    '  campaign.status,',
    '  campaign.primary_status,',
    '  campaign.serving_status,',
    '  campaign.advertising_channel_type,',
    '  campaign_budget.amount_micros',
    'FROM campaign',
    "WHERE campaign.advertising_channel_type = 'SEARCH'",
    'ORDER BY campaign.name',
  ].join(' '))

  const campaigns = (raw?.results || []).map((result) => ({
    resourceName: result.campaign?.resourceName,
    id: result.campaign?.id,
    name: result.campaign?.name,
    status: result.campaign?.status,
    primaryStatus: result.campaign?.primaryStatus,
    servingStatus: result.campaign?.servingStatus,
    dailyBudgetEur: Number(result.campaignBudget?.amountMicros || 0) / 1000000,
  }))

  const report = {
    auditedAt: new Date().toISOString(),
    searchCampaigns: campaigns,
  }
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(`Search campaigns: ${campaigns.length}`)
  for (const campaign of campaigns) {
    console.log(`${campaign.status} | ${campaign.name} | ${campaign.dailyBudgetEur} EUR/day | ${campaign.resourceName}`)
  }
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
