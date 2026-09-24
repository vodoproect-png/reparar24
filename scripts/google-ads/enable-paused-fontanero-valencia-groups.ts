// @ts-nocheck
/**
 * Enables the remaining paused ad groups in the Fontanero Valencia pilot.
 *
 * Also enables paused ads inside those groups. Keywords were already enabled
 * in the prior launch flow, but this script safely enables paused positive
 * keyword criteria in the selected groups if any remain.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-enabled-paused-groups.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const TARGET_AD_GROUP_NAMES = [
  'FON Bajantes Valencia',
  'FON Descalcificadores Osmosis Valencia',
  'FON Instalacion Cambio Inodoros Valencia',
  'FON Instalacion Lavabos Valencia',
  'FON Mamparas Ducha Valencia',
  'FON Reparacion Duchas Valencia',
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

async function listTargetAdGroups(accessToken, campaign) {
  const names = TARGET_AD_GROUP_NAMES.map((name) => `'${quote(name)}'`).join(', ')
  const raw = await search(
    accessToken,
    `SELECT ad_group.resource_name, ad_group.name, ad_group.status FROM ad_group WHERE ad_group.campaign = '${campaign}' AND ad_group.name IN (${names})`,
  )

  return (raw?.results || []).map((result) => result.adGroup).filter(Boolean)
}

async function listPausedAds(accessToken, adGroupResourceNames) {
  if (!adGroupResourceNames.length) return []
  const groups = adGroupResourceNames.map((name) => `'${name}'`).join(', ')
  const raw = await search(
    accessToken,
    `SELECT ad_group_ad.resource_name, ad_group.name, ad_group_ad.status FROM ad_group_ad WHERE ad_group.resource_name IN (${groups}) AND ad_group_ad.status = 'PAUSED'`,
  )

  return (raw?.results || []).map((result) => ({
    resourceName: result.adGroupAd?.resourceName,
    adGroupName: result.adGroup?.name,
  })).filter((item) => item.resourceName)
}

async function listPausedKeywords(accessToken, adGroupResourceNames) {
  if (!adGroupResourceNames.length) return []
  const groups = adGroupResourceNames.map((name) => `'${name}'`).join(', ')
  const raw = await search(
    accessToken,
    `SELECT ad_group_criterion.resource_name, ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.status FROM keyword_view WHERE ad_group.resource_name IN (${groups}) AND ad_group_criterion.status = 'PAUSED' AND ad_group_criterion.negative = false LIMIT 500`,
  )

  return (raw?.results || []).map((result) => ({
    resourceName: result.adGroupCriterion?.resourceName,
    adGroupName: result.adGroup?.name,
    keyword: result.adGroupCriterion?.keyword?.text,
  })).filter((item) => item.resourceName)
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const adGroups = await listTargetAdGroups(accessToken, campaign)
  const adGroupResourceNames = adGroups.map((group) => group.resourceName)
  const pausedAds = await listPausedAds(accessToken, adGroupResourceNames)
  const pausedKeywords = await listPausedKeywords(accessToken, adGroupResourceNames)

  const adGroupResult = await mutate(accessToken, 'adGroups', adGroups.map((group) => ({
    update: {
      resourceName: group.resourceName,
      status: 'ENABLED',
    },
    updateMask: 'status',
  })))

  const adResult = await mutate(accessToken, 'adGroupAds', pausedAds.map((ad) => ({
    update: {
      resourceName: ad.resourceName,
      status: 'ENABLED',
    },
    updateMask: 'status',
  })))

  const keywordResult = await mutate(accessToken, 'adGroupCriteria', pausedKeywords.map((keyword) => ({
    update: {
      resourceName: keyword.resourceName,
      status: 'ENABLED',
    },
    updateMask: 'status',
  })))

  const report = {
    campaign,
    requestedAdGroups: TARGET_AD_GROUP_NAMES,
    foundAdGroups: adGroups.map((group) => ({ name: group.name, previousStatus: group.status })),
    enabledAdGroups: adGroupResult?.results?.length || 0,
    enabledAds: adResult?.results?.length || 0,
    enabledKeywords: keywordResult?.results?.length || 0,
    status: 'Selected ad groups and their paused ads/keywords were enabled.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Enabled ad groups: ${report.enabledAdGroups}`)
  console.log(`Enabled ads: ${report.enabledAds}`)
  console.log(`Enabled keywords: ${report.enabledKeywords}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
