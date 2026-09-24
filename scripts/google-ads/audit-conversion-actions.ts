// @ts-nocheck
/**
 * Audits Google Ads conversion actions without printing credentials.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')

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

  if (!raw?.access_token) {
    throw new Error('Google OAuth response did not include access_token.')
  }
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
    30000,
  )
}

function parseSendTo(tagSnippets = []) {
  const joined = tagSnippets
    .map((snippet) => `${snippet.globalSiteTag || ''}\n${snippet.eventSnippet || ''}`)
    .join('\n')
  const match = joined.match(/send_to['"]?\s*:\s*['"]([^'"]+)['"]/)
  return match?.[1] || null
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const accessToken = await refreshAccessToken()
  const raw = await search(
    accessToken,
    `SELECT conversion_action.id, conversion_action.name, conversion_action.status, conversion_action.type, conversion_action.category, conversion_action.primary_for_goal, conversion_action.include_in_conversions_metric, conversion_action.counting_type, conversion_action.tag_snippets FROM conversion_action ORDER BY conversion_action.name`,
  )

  const actions = (raw?.results || []).map((row) => {
    const action = row.conversionAction
    return {
      id: action.id,
      name: action.name,
      status: action.status,
      type: action.type,
      category: action.category,
      primaryForGoal: action.primaryForGoal,
      includeInConversionsMetric: action.includeInConversionsMetric,
      countingType: action.countingType,
      sendToAvailable: Boolean(parseSendTo(action.tagSnippets)),
      sendTo: parseSendTo(action.tagSnippets),
    }
  })

  const output = path.join(OUT_DIR, 'conversion-actions-audit.json')
  fs.writeFileSync(output, `${JSON.stringify({ updatedAt: new Date().toISOString(), actions }, null, 2)}\n`, 'utf8')

  console.log(`Conversion actions: ${actions.length}`)
  for (const action of actions) {
    console.log(`- ${action.name}: ${action.status}, ${action.type}, ${action.category}, primary=${action.primaryForGoal}, inConversions=${action.includeInConversionsMetric}, sendTo=${action.sendToAvailable}`)
  }
  console.log(`Report: ${path.relative(process.cwd(), output)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
