// @ts-nocheck
/**
 * Audits Google Ads serving/policy statuses for the Fontanero Valencia pilot.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-status-audit.json')

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

function compactRows(raw, key) {
  return (raw?.results || []).map((result) => result[key]).filter(Boolean)
}

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()

  const campaignRaw = await search(
    accessToken,
    `SELECT campaign.id, campaign.name, campaign.status, campaign.serving_status, campaign.primary_status, campaign.primary_status_reasons, campaign.advertising_channel_type, campaign.bidding_strategy_type, campaign_budget.amount_micros FROM campaign WHERE campaign.resource_name = '${campaign}'`,
  )

  const adGroupsRaw = await search(
    accessToken,
    `SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.primary_status, ad_group.primary_status_reasons, ad_group.cpc_bid_micros FROM ad_group WHERE ad_group.campaign = '${campaign}' ORDER BY ad_group.name`,
  )

  const adsRaw = await search(
    accessToken,
    `SELECT ad_group.name, ad_group_ad.resource_name, ad_group_ad.status, ad_group_ad.primary_status, ad_group_ad.primary_status_reasons, ad_group_ad.policy_summary.approval_status, ad_group_ad.policy_summary.review_status, ad_group_ad.policy_summary.policy_topic_entries, ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions FROM ad_group_ad WHERE ad_group.campaign = '${campaign}' ORDER BY ad_group.name`,
  )

  const keywordsRaw = await search(
    accessToken,
    `SELECT ad_group.name, ad_group_criterion.status, ad_group_criterion.primary_status, ad_group_criterion.primary_status_reasons, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.approval_status FROM keyword_view WHERE campaign.resource_name = '${campaign}' ORDER BY ad_group.name LIMIT 500`,
  )

  const assetsRaw = await search(
    accessToken,
    `SELECT campaign_asset.field_type, campaign_asset.status, campaign_asset.primary_status, campaign_asset.primary_status_reasons, asset.name, asset.type FROM campaign_asset WHERE campaign_asset.campaign = '${campaign}'`,
  )

  const report = {
    campaign: compactRows(campaignRaw, 'campaign')[0] || null,
    adGroups: compactRows(adGroupsRaw, 'adGroup'),
    ads: (adsRaw?.results || []).map((result) => ({
      adGroupName: result.adGroup?.name,
      ad: result.adGroupAd,
    })),
    keywords: (keywordsRaw?.results || []).map((result) => ({
      adGroupName: result.adGroup?.name,
      criterion: result.adGroupCriterion,
    })),
    assets: (assetsRaw?.results || []).map((result) => ({
      asset: result.asset,
      campaignAsset: result.campaignAsset,
    })),
    auditedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const disapprovedAds = report.ads.filter((item) => item.ad?.policySummary?.approvalStatus && item.ad.policySummary.approvalStatus !== 'APPROVED')
  const limitedAssets = report.assets.filter((item) => item.campaignAsset?.primaryStatus && !['ELIGIBLE', 'NOT_ELIGIBLE'].includes(item.campaignAsset.primaryStatus))

  console.log(`Campaign status: ${report.campaign?.status || 'unknown'} / primary: ${report.campaign?.primaryStatus || 'unknown'}`)
  console.log(`Ad groups: ${report.adGroups.length}`)
  console.log(`Ads: ${report.ads.length}; not approved/reviewing: ${disapprovedAds.length}`)
  console.log(`Assets: ${report.assets.length}; not approved/reviewing: ${limitedAssets.length}`)
  console.log(`Keywords audited: ${report.keywords.length}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
