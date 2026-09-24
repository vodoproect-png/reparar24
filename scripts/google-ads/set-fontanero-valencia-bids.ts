// @ts-nocheck
/**
 * Sets max CPC bids for the paused Fontanero Valencia pilot campaign.
 *
 * Updates ad group bids and keyword criterion bids. The campaign activation
 * state is not changed.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-bids.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
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

async function listAdGroups(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group.resource_name FROM ad_group WHERE ad_group.campaign = '${campaign}'`,
  )

  return (raw?.results || [])
    .map((result) => result.adGroup?.resourceName)
    .filter(Boolean)
}

async function listKeywordCriteria(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT ad_group_criterion.resource_name FROM ad_group_criterion WHERE ad_group.campaign = '${campaign}' AND ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = false`,
  )

  return (raw?.results || [])
    .map((result) => result.adGroupCriterion?.resourceName)
    .filter(Boolean)
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const options = parseArgs()
  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const cpcBidMicros = eurosToMicros(options.maxCpcEur)

  const adGroups = await listAdGroups(accessToken, campaign)
  const keywordCriteria = await listKeywordCriteria(accessToken, campaign)

  const adGroupResult = await mutate(accessToken, 'adGroups', adGroups.map((resourceName) => ({
    update: {
      resourceName,
      cpcBidMicros,
    },
    updateMask: 'cpc_bid_micros',
  })))

  const keywordResult = await mutate(accessToken, 'adGroupCriteria', keywordCriteria.map((resourceName) => ({
    update: {
      resourceName,
      cpcBidMicros,
    },
    updateMask: 'cpc_bid_micros',
  })))

  const report = {
    campaign,
    maxCpcEur: options.maxCpcEur,
    cpcBidMicros,
    updatedAdGroups: adGroupResult?.results?.length || 0,
    updatedKeywordCriteria: keywordResult?.results?.length || 0,
    status: 'Bids updated. Campaign activation state was not changed.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Updated max CPC to ${options.maxCpcEur} EUR.`)
  console.log(`Ad groups updated: ${report.updatedAdGroups}`)
  console.log(`Keyword criteria updated: ${report.updatedKeywordCriteria}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
