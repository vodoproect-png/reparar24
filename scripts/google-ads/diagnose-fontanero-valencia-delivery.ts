// @ts-nocheck
/**
 * Read-only diagnostics for the Fontanero Valencia campaign delivery.
 * Does not print secrets. Writes JSON/CSV to .tmp/google-ads.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_JSON_PATH = path.join(OUT_DIR, 'fontanero-valencia-delivery-diagnostics.json')
const REPORT_CSV_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-delivery.csv')

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

function microsToEur(value) {
  const parsed = Number(value || 0)
  return Math.round((parsed / 1000000) * 100) / 100
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
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

function rows(raw) {
  return raw?.results || []
}

function metricSummary(result) {
  const metrics = result.metrics || {}
  return {
    impressions: Number(metrics.impressions || 0),
    clicks: Number(metrics.clicks || 0),
    costEur: microsToEur(metrics.costMicros),
    averageCpcEur: microsToEur(metrics.averageCpc),
    conversions: Number(metrics.conversions || 0),
    allConversions: Number(metrics.allConversions || 0),
    ctr: Number(metrics.ctr || 0),
    searchImpressionShare: metrics.searchImpressionShare ?? null,
    searchBudgetLostImpressionShare: metrics.searchBudgetLostImpressionShare ?? null,
    searchRankLostImpressionShare: metrics.searchRankLostImpressionShare ?? null,
    topImpressionPercentage: metrics.topImpressionPercentage ?? null,
    absoluteTopImpressionPercentage: metrics.absoluteTopImpressionPercentage ?? null,
  }
}

async function main() {
  requireEnv(REQUIRED_ENV)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const accessToken = await refreshAccessToken()
  const campaign = readCampaignResourceName()

  const campaignRaw = await search(
    accessToken,
    [
      'SELECT',
      'campaign.id, campaign.name, campaign.status, campaign.serving_status, campaign.primary_status, campaign.primary_status_reasons,',
      'campaign.advertising_channel_type, campaign.bidding_strategy_type, campaign_budget.amount_micros,',
      'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.conversions, metrics.all_conversions, metrics.ctr,',
      'metrics.search_impression_share, metrics.search_budget_lost_impression_share, metrics.search_rank_lost_impression_share,',
      'metrics.top_impression_percentage, metrics.absolute_top_impression_percentage',
      'FROM campaign',
      `WHERE campaign.resource_name = '${campaign}'`,
      'AND segments.date DURING TODAY',
    ].join(' '),
  )

  const adGroupsRaw = await search(
    accessToken,
    [
      'SELECT',
      'ad_group.id, ad_group.name, ad_group.status, ad_group.primary_status, ad_group.primary_status_reasons, ad_group.cpc_bid_micros,',
      'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.conversions, metrics.all_conversions, metrics.ctr,',
      'metrics.search_impression_share, metrics.search_rank_lost_impression_share',
      'FROM ad_group',
      `WHERE ad_group.campaign = '${campaign}'`,
      'AND segments.date DURING TODAY',
      'ORDER BY metrics.impressions DESC, metrics.clicks DESC, ad_group.name',
    ].join(' '),
  )

  const keywordsRaw = await search(
    accessToken,
    [
      'SELECT',
      'ad_group.name, ad_group_criterion.status, ad_group_criterion.primary_status, ad_group_criterion.primary_status_reasons,',
      'ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,',
      'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.conversions, metrics.all_conversions, metrics.ctr',
      'FROM keyword_view',
      `WHERE campaign.resource_name = '${campaign}'`,
      'AND segments.date DURING TODAY',
      'ORDER BY metrics.impressions DESC, metrics.clicks DESC, ad_group.name',
      'LIMIT 1000',
    ].join(' '),
  )

  const searchTermsRaw = await search(
    accessToken,
    [
      'SELECT',
      'ad_group.name, search_term_view.search_term, search_term_view.status,',
      'metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc, metrics.conversions, metrics.all_conversions, metrics.ctr',
      'FROM search_term_view',
      `WHERE campaign.resource_name = '${campaign}'`,
      'AND segments.date DURING TODAY',
      'ORDER BY metrics.clicks DESC, metrics.impressions DESC',
      'LIMIT 100',
    ].join(' '),
  )

  const schedulesRaw = await search(
    accessToken,
    [
      'SELECT',
      'campaign_criterion.resource_name, campaign_criterion.status,',
      'campaign_criterion.ad_schedule.day_of_week, campaign_criterion.ad_schedule.start_hour, campaign_criterion.ad_schedule.start_minute,',
      'campaign_criterion.ad_schedule.end_hour, campaign_criterion.ad_schedule.end_minute',
      'FROM campaign_criterion',
      `WHERE campaign_criterion.campaign = '${campaign}'`,
      'AND campaign_criterion.type = AD_SCHEDULE',
      'ORDER BY campaign_criterion.ad_schedule.day_of_week',
    ].join(' '),
  )

  const campaignRows = rows(campaignRaw)
  const campaignResult = campaignRows[0] || {}

  const report = {
    generatedAt: new Date().toISOString(),
    campaignResourceName: campaign,
    campaign: {
      ...(campaignResult.campaign || {}),
      budgetEurPerDay: microsToEur(campaignResult.campaignBudget?.amountMicros),
      metricsToday: metricSummary(campaignResult),
    },
    adGroupsToday: rows(adGroupsRaw).map((result) => ({
      name: result.adGroup?.name,
      status: result.adGroup?.status,
      primaryStatus: result.adGroup?.primaryStatus,
      primaryStatusReasons: result.adGroup?.primaryStatusReasons || [],
      cpcBidEur: microsToEur(result.adGroup?.cpcBidMicros),
      metrics: metricSummary(result),
    })),
    keywordsToday: rows(keywordsRaw).map((result) => ({
      adGroupName: result.adGroup?.name,
      keyword: result.adGroupCriterion?.keyword?.text,
      matchType: result.adGroupCriterion?.keyword?.matchType,
      status: result.adGroupCriterion?.status,
      primaryStatus: result.adGroupCriterion?.primaryStatus,
      primaryStatusReasons: result.adGroupCriterion?.primaryStatusReasons || [],
      metrics: metricSummary(result),
    })),
    searchTermsToday: rows(searchTermsRaw).map((result) => ({
      adGroupName: result.adGroup?.name,
      searchTerm: result.searchTermView?.searchTerm,
      status: result.searchTermView?.status,
      metrics: metricSummary(result),
    })),
    schedules: rows(schedulesRaw).map((result) => result.campaignCriterion),
  }

  fs.writeFileSync(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const csvRows = [[
    'ad_group',
    'keyword',
    'match_type',
    'status',
    'primary_status',
    'primary_status_reasons',
    'impressions',
    'clicks',
    'cost_eur',
    'avg_cpc_eur',
    'conversions',
  ]]
  for (const item of report.keywordsToday) {
    csvRows.push([
      item.adGroupName,
      item.keyword,
      item.matchType,
      item.status,
      item.primaryStatus,
      (item.primaryStatusReasons || []).join('|'),
      item.metrics.impressions,
      item.metrics.clicks,
      item.metrics.costEur,
      item.metrics.averageCpcEur,
      item.metrics.conversions,
    ])
  }
  fs.writeFileSync(REPORT_CSV_PATH, `${csvRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')

  const zeroImpressionGroups = report.adGroupsToday.filter((item) => item.metrics.impressions === 0).length
  const clickedKeywords = report.keywordsToday.filter((item) => item.metrics.clicks > 0)

  console.log(`Campaign: ${report.campaign.name}`)
  console.log(`Status: ${report.campaign.status} / primary: ${report.campaign.primaryStatus}`)
  console.log(`Today: ${report.campaign.metricsToday.impressions} impressions, ${report.campaign.metricsToday.clicks} clicks, ${report.campaign.metricsToday.costEur} EUR, conversions ${report.campaign.metricsToday.conversions}`)
  console.log(`Ad groups today: ${report.adGroupsToday.length}; zero-impression groups: ${zeroImpressionGroups}`)
  console.log(`Clicked keywords today: ${clickedKeywords.length}`)
  for (const item of clickedKeywords.slice(0, 10)) {
    console.log(`- ${item.keyword} [${item.matchType}] / ${item.adGroupName}: ${item.metrics.clicks} click, ${item.metrics.costEur} EUR`)
  }
  console.log(`Search terms visible: ${report.searchTermsToday.length}`)
  console.log(`JSON: ${path.relative(process.cwd(), REPORT_JSON_PATH)}`)
  console.log(`CSV: ${path.relative(process.cwd(), REPORT_CSV_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
