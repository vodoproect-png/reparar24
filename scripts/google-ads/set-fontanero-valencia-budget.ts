// @ts-nocheck
/**
 * Updates daily budget for the Fontanero Valencia pilot campaign.
 *
 * Usage:
 *   npm run ads:fontanero:budget -- --budget-eur 20
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-budget-update.json')

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
  const index = args.indexOf('--budget-eur')
  const value = index >= 0 && args[index + 1] ? Number(args[index + 1]) : 20
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error('Invalid --budget-eur value.')
  }
  return { budgetEur: value }
}

function customerId() {
  return String(process.env.GOOGLE_ADS_ADVERTISING_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function loginCustomerId() {
  return String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function eurosToMicros(value) {
  return String(Math.round(Number(value) * 1000000))
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

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const { budgetEur } = parseArgs()
  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()

  const campaignRaw = await search(
    accessToken,
    `SELECT campaign.id, campaign.name, campaign_budget.resource_name, campaign_budget.amount_micros FROM campaign WHERE campaign.resource_name = '${campaign}' LIMIT 1`,
  )

  const row = campaignRaw?.results?.[0]
  const budget = row?.campaignBudget
  if (!budget?.resourceName) throw new Error('Could not resolve campaign budget resource.')

  const previousBudgetEur = Number(budget.amountMicros || 0) / 1000000
  const amountMicros = eurosToMicros(budgetEur)

  await mutate(accessToken, 'campaignBudgets', [{
    update: {
      resourceName: budget.resourceName,
      amountMicros,
    },
    updateMask: 'amount_micros',
  }])

  const report = {
    updatedAt: new Date().toISOString(),
    campaign,
    campaignName: row?.campaign?.name || null,
    budgetResourceName: budget.resourceName,
    previousBudgetEur,
    newBudgetEur: budgetEur,
    amountMicros,
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(`Budget updated: ${previousBudgetEur} EUR/day -> ${budgetEur} EUR/day`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
