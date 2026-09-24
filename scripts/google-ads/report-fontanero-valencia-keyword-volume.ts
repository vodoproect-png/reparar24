// @ts-nocheck
/**
 * Reports Google Ads historical metrics for every keyword currently used in the
 * Fontanero Valencia pilot campaign, scoped to Valencia geo.
 *
 * Read-only. Does not print secrets. Writes CSV/JSON to .tmp/google-ads.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_JSON_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-volume.json')
const REPORT_CSV_PATH = path.join(OUT_DIR, 'fontanero-valencia-keyword-volume.csv')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const SPANISH_LANGUAGE_CONSTANT = 'languageConstants/1003'
const VALENCIA_GEO_TARGET = 'geoTargetConstants/20297'

function customerId() {
  return String(process.env.GOOGLE_ADS_ADVERTISING_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function loginCustomerId() {
  return String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function normalizeKeyword(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanKeyword(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function microsToCurrency(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.round((parsed / 1000000) * 100) / 100 : null
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function chunk(items, size) {
  const result = []
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size))
  }
  return result
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
  return postJsonWithRetry(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/googleAds:search`,
    googleAdsHeaders(accessToken),
    { query },
    60000,
  )
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function retryDelayFromMessage(message) {
  const match = String(message || '').match(/Retry in (\d+) seconds/i)
  if (!match) return null
  return Number(match[1]) * 1000
}

async function postJsonWithRetry(hostname, pathName, headers, body, timeoutMs = 60000, attempts = 4) {
  let lastError = null
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await postJson(hostname, pathName, headers, body, timeoutMs)
    } catch (error) {
      lastError = error
      const message = error?.message || ''
      const isRateLimit = message.includes('HTTP 429') || message.includes('RESOURCE_EXHAUSTED')
      if (!isRateLimit || attempt === attempts) break
      const delay = retryDelayFromMessage(message) || attempt * 5000
      console.log(`Google Ads rate limit, retry ${attempt}/${attempts - 1} after ${Math.ceil(delay / 1000)}s`)
      await sleep(delay + 750)
    }
  }
  throw lastError
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

async function collectCampaignKeywords(accessToken, campaignResourceName) {
  const raw = await search(
    accessToken,
    [
      'SELECT',
      '  campaign.id,',
      '  campaign.name,',
      '  ad_group.name,',
      '  ad_group.status,',
      '  ad_group_criterion.status,',
      '  ad_group_criterion.primary_status,',
      '  ad_group_criterion.keyword.text,',
      '  ad_group_criterion.keyword.match_type',
      'FROM keyword_view',
      `WHERE campaign.resource_name = '${campaignResourceName}'`,
      "  AND ad_group.status = 'ENABLED'",
      "  AND ad_group_criterion.status = 'ENABLED'",
      'ORDER BY ad_group.name, ad_group_criterion.keyword.text',
      'LIMIT 1000',
    ].join(' '),
  )

  const byKeyword = new Map()
  for (const result of raw?.results || []) {
    const text = cleanKeyword(result.adGroupCriterion?.keyword?.text)
    const key = normalizeKeyword(text)
    if (!key) continue

    const current = byKeyword.get(key) || {
      keyword: text,
      adGroups: new Set(),
      matchTypes: new Set(),
      googlePrimaryStatuses: new Set(),
    }
    current.adGroups.add(result.adGroup?.name || '')
    current.matchTypes.add(result.adGroupCriterion?.keyword?.matchType || '')
    current.googlePrimaryStatuses.add(result.adGroupCriterion?.primaryStatus || '')
    byKeyword.set(key, current)
  }

  return Array.from(byKeyword.values()).map((item) => ({
    keyword: item.keyword,
    adGroups: Array.from(item.adGroups).filter(Boolean).sort(),
    matchTypes: Array.from(item.matchTypes).filter(Boolean).sort(),
    googlePrimaryStatuses: Array.from(item.googlePrimaryStatuses).filter(Boolean).sort(),
  }))
}

async function fetchHistoricalMetrics(accessToken, keywords) {
  const metrics = new Map()
  const batches = chunk(keywords, 100)
  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}:generateKeywordHistoricalMetrics`

  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index]
    console.log(`Google Ads Valencia metrics batch ${index + 1}/${batches.length}: ${batch.length} keywords`)
    const raw = await postJsonWithRetry(
      GOOGLE_ADS_HOST,
      endpoint,
      googleAdsHeaders(accessToken),
      {
        keywords: batch,
        language: SPANISH_LANGUAGE_CONSTANT,
        geoTargetConstants: [VALENCIA_GEO_TARGET],
        keywordPlanNetwork: 'GOOGLE_SEARCH',
      },
      120000,
    )
    await sleep(900)

    for (const result of raw?.results || []) {
      const keyword = result.text || ''
      const item = result.keywordMetrics || {}
      metrics.set(normalizeKeyword(keyword), {
        keyword,
        avgMonthlySearches: item.avgMonthlySearches ?? 0,
        competitionIndex: item.competitionIndex ?? null,
        competitionLevel: item.competition ?? null,
        lowTopOfPageBid: microsToCurrency(item.lowTopOfPageBidMicros),
        highTopOfPageBid: microsToCurrency(item.highTopOfPageBidMicros),
        monthlySearchVolumes: item.monthlySearchVolumes || [],
      })
    }
  }

  return metrics
}

function writeReports(report) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const rows = [[
    'keyword',
    'avg_monthly_searches_valencia',
    'competition_index',
    'competition_level',
    'low_top_of_page_bid_eur',
    'high_top_of_page_bid_eur',
    'ad_groups',
    'match_types',
    'google_primary_statuses',
  ]]

  for (const item of report.keywords) {
    rows.push([
      item.keyword,
      item.avgMonthlySearches,
      item.competitionIndex ?? '',
      item.competitionLevel ?? '',
      item.lowTopOfPageBid ?? '',
      item.highTopOfPageBid ?? '',
      item.adGroups.join(' | '),
      item.matchTypes.join(' | '),
      item.googlePrimaryStatuses.join(' | '),
    ])
  }

  fs.writeFileSync(
    REPORT_CSV_PATH,
    `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`,
    'utf8',
  )
}

async function main() {
  requireEnv(REQUIRED_ENV)

  const accessToken = await refreshAccessToken()
  const campaign = readCampaignResourceName()
  const campaignKeywords = await collectCampaignKeywords(accessToken, campaign)
  const metrics = await fetchHistoricalMetrics(accessToken, campaignKeywords.map((item) => item.keyword))

  const enriched = campaignKeywords.map((item) => {
    const metric = metrics.get(normalizeKeyword(item.keyword))
    return {
      ...item,
      avgMonthlySearches: metric?.avgMonthlySearches ?? 0,
      competitionIndex: metric?.competitionIndex ?? null,
      competitionLevel: metric?.competitionLevel ?? null,
      lowTopOfPageBid: metric?.lowTopOfPageBid ?? null,
      highTopOfPageBid: metric?.highTopOfPageBid ?? null,
      monthlySearchVolumes: metric?.monthlySearchVolumes ?? [],
    }
  }).sort((a, b) => {
    const volumeDiff = Number(b.avgMonthlySearches || 0) - Number(a.avgMonthlySearches || 0)
    if (volumeDiff !== 0) return volumeDiff
    return a.keyword.localeCompare(b.keyword, 'es')
  })

  const report = {
    generatedAt: new Date().toISOString(),
    source: 'google-ads-generateKeywordHistoricalMetrics',
    campaign,
    geoTarget: {
      label: 'Valencia, Spain',
      resourceName: VALENCIA_GEO_TARGET,
    },
    language: SPANISH_LANGUAGE_CONSTANT,
    summary: {
      uniqueEnabledKeywords: enriched.length,
      keywordsWithVolume: enriched.filter((item) => Number(item.avgMonthlySearches || 0) > 0).length,
      totalAvgMonthlySearches: enriched.reduce((sum, item) => sum + Number(item.avgMonthlySearches || 0), 0),
    },
    keywords: enriched,
  }

  writeReports(report)

  console.log(`Unique enabled keywords: ${report.summary.uniqueEnabledKeywords}`)
  console.log(`Keywords with Valencia volume: ${report.summary.keywordsWithVolume}`)
  console.log(`Total avg monthly searches: ${report.summary.totalAvgMonthlySearches}`)
  console.log(`JSON: ${path.relative(process.cwd(), REPORT_JSON_PATH)}`)
  console.log(`CSV: ${path.relative(process.cwd(), REPORT_CSV_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
