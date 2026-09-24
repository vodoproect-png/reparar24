// @ts-nocheck
/**
 * Creates one Google Ads Search campaign for one Fontanero landing page
 * from a Google Keyword Planner "Keyword Stats" TSV/CSV export.
 *
 * Manual workflow:
 * 1. User reviews/export keywords for one landing page.
 * 2. Run dry-run and review .tmp/google-ads report.
 * 3. Run with --execute after approval.
 *
 * Safety:
 * - Dry-run by default.
 * - Filters 24h/24 horas keywords, zero-volume keywords and obvious non-plumbing noise.
 * - Uses the same Reparar24 Fontanero baseline: Valencia, Spanish, 08:00-20:00,
 *   20 EUR/day, max CPC 0.65 EUR, Google Search only.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, '.tmp', 'google-ads')

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
const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

const BASE_NEGATIVES = [
  'gratis',
  'curso',
  'trabajo',
  'empleo',
  'sueldo',
  'salario',
  'fp',
  'formacion',
  'tutorial',
  'manual',
  'pdf',
  'youtube',
  'bricolaje',
  'leroy merlin',
  'bricodepot',
  'amazon',
  'ikea',
  'segunda mano',
  'wallapop',
  'cerrajero',
  'cerradura',
  'llaves',
  '24 horas',
  '24h',
]

function parseArgs() {
  const args = process.argv.slice(2)
  const valueOf = (name, fallback = '') => {
    const index = args.indexOf(name)
    return index >= 0 ? args[index + 1] : fallback
  }
  const numberOf = (name, fallback) => {
    const value = Number(valueOf(name, fallback))
    return Number.isFinite(value) && value >= 0 ? value : fallback
  }

  return {
    execute: args.includes('--execute'),
    csv: valueOf('--csv'),
    landing: valueOf('--landing', '/fontanero'),
    label: valueOf('--label', 'General'),
    budgetEur: numberOf('--budget-eur', 20),
    maxCpcEur: numberOf('--max-cpc-eur', 0.65),
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
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

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function clean(value) {
  return String(value || '').replace(/[¿?¡!|]/g, ' ').replace(/\s+/g, ' ').trim()
}

function parseDelimitedLine(line, delimiter) {
  const out = []
  let value = ''
  let quoted = false
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    if (quoted && char === '"' && line[i + 1] === '"') {
      value += '"'
      i += 1
      continue
    }
    if (char === '"') {
      quoted = !quoted
      continue
    }
    if (!quoted && char === delimiter) {
      out.push(value)
      value = ''
      continue
    }
    value += char
  }
  out.push(value)
  return out
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function readKeywordPlannerRows(filePath) {
  const buffer = fs.readFileSync(filePath)
  const sample = buffer.slice(0, 200).toString('latin1')
  const encoding = sample.includes('\u0000') || sample.includes('\x00') ? 'utf16le' : 'utf8'
  const rawLines = buffer.toString(encoding).replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean)
  const headerIndex = rawLines.findIndex((line) => /^Keyword\t|^Keyword,/.test(line))
  if (headerIndex < 0) throw new Error('Keyword Planner header row was not found.')
  const delimiter = rawLines[headerIndex].includes('\t') ? '\t' : ','
  const header = parseDelimitedLine(rawLines[headerIndex], delimiter)
  return rawLines.slice(headerIndex + 1).map((line) => {
    const cells = parseDelimitedLine(line, delimiter)
    return Object.fromEntries(header.map((name, index) => [name, cells[index] || '']))
  })
}

function parseSearches(value) {
  const normalized = String(value || '').replace(/\s/g, '').replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

function shouldExcludeKeyword(keyword, avgMonthlySearches) {
  const key = normalize(keyword)
  if (!key) return 'empty'
  if (avgMonthlySearches <= 0) return 'zero-volume'
  if (/\b24\s*horas\b/i.test(key) || /\b24h\b/i.test(key) || /\bfontanero\s*24\b/i.test(key) || /\bplomero\s*24\b/i.test(key)) {
    return '24h-blocked'
  }
  if (/\bcerrajero\b/i.test(key) || /\bcerradura\b/i.test(key) || /\bllaves\b/i.test(key)) return 'non-plumbing'
  return ''
}

function buildPlan(options) {
  if (!options.csv) throw new Error('Pass --csv "path/to/keyword-planner-export.csv".')
  const rows = readKeywordPlannerRows(options.csv)
  const selectedByKey = new Map()
  const excluded = []

  for (const row of rows) {
    const keyword = clean(row.Keyword)
    const avgMonthlySearches = parseSearches(row['Avg. monthly searches'])
    const excludeReason = shouldExcludeKeyword(keyword, avgMonthlySearches)
    if (excludeReason) {
      excluded.push({ keyword, avgMonthlySearches, reason: excludeReason })
      continue
    }
    const key = normalize(keyword)
    if (!selectedByKey.has(key)) {
      selectedByKey.set(key, {
        keyword,
        avgMonthlySearches,
        competition: row.Competition || '',
        competitionIndex: row['Competition (indexed value)'] || '',
        lowTopOfPageBid: row['Top of page bid (low range)'] || '',
        highTopOfPageBid: row['Top of page bid (high range)'] || '',
      })
    }
  }

  const keywords = Array.from(selectedByKey.values()).sort((a, b) => b.avgMonthlySearches - a.avgMonthlySearches)
  const date = new Date().toISOString().slice(0, 10)
  const safeLabel = clean(options.label).replace(/\s+/g, ' ')
  const adGroupName = `FON ${safeLabel} Valencia`

  return {
    generatedAt: new Date().toISOString(),
    dryRun: !options.execute,
    sourceCsv: options.csv,
    filters: {
      blocked24h: true,
      blockedZeroVolume: true,
      blockedNonPlumbing: ['cerrajero', 'cerradura', 'llaves'],
    },
    campaign: {
      name: `R24 | Fontanero | Valencia | ${safeLabel} | ${date}`,
      status: 'ENABLED',
      dailyBudgetEur: options.budgetEur,
      dailyBudgetMicros: eurosToMicros(options.budgetEur),
      maxCpcEur: options.maxCpcEur,
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
      landing: options.landing,
      finalUrl: `https://reparar24.es${options.landing}?utm_source=google&utm_medium=cpc&utm_campaign=fontanero_valencia_${normalize(safeLabel).replace(/\s+/g, '_')}`,
      schedule: '08:00-20:00 Europe/Madrid, all days',
      negativeKeywords: BASE_NEGATIVES,
    },
    adGroup: {
      name: adGroupName,
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
      keywords,
    },
    excluded,
    summary: {
      sourceRows: rows.length,
      selectedKeywords: keywords.length,
      excludedKeywords: excluded.length,
      keywordCriteria: keywords.length * 2,
      ads: 1,
    },
  }
}

function truncate(text, limit) {
  const value = clean(text)
  if (value.length <= limit) return value
  const cut = value.slice(0, limit + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 12 ? lastSpace : limit).trim()
}

function responsiveSearchAd() {
  return {
    headlines: [
      'Fontanero en Valencia',
      'Fontaneros Cerca de Mi',
      'Presupuesto Claro',
      'Reparar24 Fontaneros',
      'Tecnicos Certificados',
      'Garantia por Escrito',
      'Llama o WhatsApp',
      'Servicio de Fontaneria',
      'Respuesta Rapida',
      'Solucionamos tu Averia',
      'Atencion en Valencia',
      'Fontanero Profesional',
    ].map((text) => ({ text: truncate(text, 30) })),
    descriptions: [
      'Cuéntanos la avería y te orientamos antes de intervenir. Presupuesto claro en Valencia.',
      'Respuesta por teléfono o WhatsApp. Técnicos identificados y trabajo con garantía.',
      'Fontaneros profesionales para reparaciones, instalaciones y mantenimiento en Valencia.',
      'Explicamos la solución y el precio antes de empezar. Atención directa de Reparar24.',
    ].map((text) => ({ text: truncate(text, 90) })),
  }
}

function writePlan(plan) {
  ensureDir(OUT_DIR)
  const slug = normalize(plan.campaign.name).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const planJson = path.join(OUT_DIR, `${slug}-plan.json`)
  const planCsv = path.join(OUT_DIR, `${slug}-keywords.csv`)
  fs.writeFileSync(planJson, `${JSON.stringify(plan, null, 2)}\n`, 'utf8')

  const rows = [[
    'campaign',
    'ad_group',
    'landing',
    'keyword',
    'avg_monthly_searches',
    'competition',
    'competition_index',
    'low_top_of_page_bid',
    'high_top_of_page_bid',
    'match_types',
  ]]
  for (const keyword of plan.adGroup.keywords) {
    rows.push([
      plan.campaign.name,
      plan.adGroup.name,
      plan.campaign.landing,
      keyword.keyword,
      keyword.avgMonthlySearches,
      keyword.competition,
      keyword.competitionIndex,
      keyword.lowTopOfPageBid,
      keyword.highTopOfPageBid,
      'EXACT + PHRASE',
    ])
  }
  fs.writeFileSync(planCsv, `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')
  return { planJson, planCsv }
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

async function mutate(accessToken, service, operations, timeoutMs = 60000) {
  if (!operations.length) return { results: [] }
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/${service}:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    timeoutMs,
  )
}

function scheduleOperations(campaign) {
  return DAYS.map((dayOfWeek) => ({
    create: {
      campaign,
      adSchedule: {
        dayOfWeek,
        startHour: 8,
        startMinute: 'ZERO',
        endHour: 20,
        endMinute: 'ZERO',
      },
    },
  }))
}

async function executePlan(plan) {
  const accessToken = await refreshAccessToken()
  const budgetResponse = await mutate(accessToken, 'campaignBudgets', [{
    create: {
      name: `${plan.campaign.name} | Budget`,
      amountMicros: plan.campaign.dailyBudgetMicros,
      deliveryMethod: 'STANDARD',
      explicitlyShared: false,
    },
  }])
  const campaignBudget = budgetResponse?.results?.[0]?.resourceName
  if (!campaignBudget) throw new Error('Campaign budget creation did not return resourceName.')

  const campaignResponse = await mutate(accessToken, 'campaigns', [{
    create: {
      name: plan.campaign.name,
      status: 'ENABLED',
      advertisingChannelType: 'SEARCH',
      containsEuPoliticalAdvertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING',
      campaignBudget,
      manualCpc: { enhancedCpcEnabled: false },
      networkSettings: {
        targetGoogleSearch: true,
        targetSearchNetwork: false,
        targetContentNetwork: false,
        targetPartnerSearchNetwork: false,
      },
    },
  }])
  const campaign = campaignResponse?.results?.[0]?.resourceName
  if (!campaign) throw new Error('Campaign creation did not return resourceName.')

  await mutate(accessToken, 'campaignCriteria', [
    { create: { campaign, location: { geoTargetConstant: VALENCIA_GEO_TARGET } } },
    { create: { campaign, language: { languageConstant: SPANISH_LANGUAGE_CONSTANT } } },
    ...scheduleOperations(campaign),
    ...plan.campaign.negativeKeywords.map((text) => ({
      create: {
        campaign,
        negative: true,
        keyword: { text, matchType: 'BROAD' },
      },
    })),
  ], 120000)

  const adGroupResponse = await mutate(accessToken, 'adGroups', [{
    create: {
      name: plan.adGroup.name,
      status: 'ENABLED',
      campaign,
      type: 'SEARCH_STANDARD',
      cpcBidMicros: plan.adGroup.maxCpcMicros,
    },
  }])
  const adGroup = adGroupResponse?.results?.[0]?.resourceName
  if (!adGroup) throw new Error('Ad group creation did not return resourceName.')

  const keywordOperations = []
  for (const item of plan.adGroup.keywords) {
    for (const matchType of ['EXACT', 'PHRASE']) {
      keywordOperations.push({
        create: {
          adGroup,
          status: 'ENABLED',
          cpcBidMicros: plan.adGroup.maxCpcMicros,
          keyword: { text: item.keyword, matchType },
        },
      })
    }
  }
  await mutate(accessToken, 'adGroupCriteria', keywordOperations, 120000)

  await mutate(accessToken, 'adGroupAds', [{
    create: {
      adGroup,
      status: 'ENABLED',
      ad: {
        finalUrls: [plan.campaign.finalUrl],
        responsiveSearchAd: responsiveSearchAd(),
      },
    },
  }])

  const execution = {
    executedAt: new Date().toISOString(),
    campaign,
    campaignName: plan.campaign.name,
    campaignBudget,
    adGroup,
    keywordCriteria: keywordOperations.length,
    ads: 1,
  }
  const executionPath = path.join(OUT_DIR, `${normalize(plan.campaign.name).replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-execution.json`)
  fs.writeFileSync(executionPath, `${JSON.stringify(execution, null, 2)}\n`, 'utf8')
  return { execution, executionPath }
}

async function main() {
  const options = parseArgs()
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)
  const plan = buildPlan(options)
  const files = writePlan(plan)

  console.log(`Campaign: ${plan.campaign.name}`)
  console.log(`Landing: ${plan.campaign.landing}`)
  console.log(`Selected keywords: ${plan.summary.selectedKeywords}`)
  console.log(`Excluded keywords: ${plan.summary.excludedKeywords}`)
  console.log(`Keyword criteria: ${plan.summary.keywordCriteria}`)
  console.log(`Plan: ${path.relative(ROOT, files.planJson)}`)
  console.log(`CSV: ${path.relative(ROOT, files.planCsv)}`)

  if (!options.execute) {
    console.log('Dry-run only. Pass --execute to create the campaign.')
    return
  }

  const { execution, executionPath } = await executePlan(plan)
  console.log(`Created campaign: ${execution.campaignName}`)
  console.log(`Campaign resource: ${execution.campaign}`)
  console.log(`Execution: ${path.relative(ROOT, executionPath)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
