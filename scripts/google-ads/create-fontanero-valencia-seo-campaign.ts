// @ts-nocheck
/**
 * Creates a new Fontanero Valencia Search campaign from the approved SEO export.
 *
 * Safety:
 * - Source keywords: docs/seo/exports/fontanero-seo-keywords-2026-06-22.csv
 * - Hub /fontanero and approved child service pages are included.
 * - Google Ads Valencia historical volume must be >= --min-volume (default 30).
 * - Product/DIY/info/24h noise is filtered out.
 * - Existing Fontanero Valencia Search campaigns are archived only after the
 *   new campaign is created successfully and only with --archive-existing.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const ROOT = process.cwd()
const SEO_CSV = path.join(ROOT, 'docs', 'seo', 'exports', 'fontanero-seo-keywords-2026-06-22.csv')
const OUT_DIR = path.join(ROOT, '.tmp', 'google-ads')
const PLAN_JSON = path.join(OUT_DIR, 'fontanero-valencia-seo-campaign-plan.json')
const PLAN_CSV = path.join(OUT_DIR, 'fontanero-valencia-seo-campaign-keywords.csv')
const EXECUTION_JSON = path.join(OUT_DIR, 'fontanero-valencia-seo-campaign-execution.json')

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

const LANDINGS = {
  '/fontanero': 'FON General Fontanero Valencia',
  '/fontanero/reparacion-fugas': 'FON Reparacion Fugas Valencia',
  '/fontanero/desatascos': 'FON Desatascos Valencia',
  '/fontanero/instalaciones': 'FON Instalaciones Valencia',
  '/fontanero/sustitucion-tuberias': 'FON Sustitucion Tuberias Valencia',
  '/fontanero/calentadores-termos': 'FON Calentadores Termos Valencia',
  '/fontanero/mantenimiento': 'FON Mantenimiento Valencia',
  '/fontanero/cambio-banera-por-ducha': 'FON Cambio Banera Por Ducha Valencia',
  '/fontanero/reparacion-cisternas': 'FON Reparacion Cisternas Valencia',
  '/fontanero/cambio-reparacion-grifos': 'FON Cambio Reparacion Grifos Valencia',
  '/fontanero/grupos-presion-agua': 'FON Grupos Presion Agua Valencia',
  '/fontanero/descalcificadores-osmosis': 'FON Descalcificadores Osmosis Valencia',
  '/fontanero/instalacion-cambio-inodoros': 'FON Instalacion Cambio Inodoros Valencia',
  '/fontanero/instalacion-lavabos': 'FON Instalacion Lavabos Valencia',
  '/fontanero/mamparas-ducha': 'FON Mamparas Ducha Valencia',
  '/fontanero/bajantes': 'FON Bajantes Valencia',
  '/fontanero/reparacion-duchas': 'FON Reparacion Duchas Valencia',
}

const ALLOWED_TYPES = new Set([
  'hub/service keywords',
  'hub/seo phrases',
  'lockedPrimaryKw',
  'secondaryKw',
  'seoBlockKw',
  'keywordTags',
])

const NEGATIVES = [
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
  'oposiciones',
  'aprendiz',
  '24 horas',
  '24h',
]

const BLOCK_PATTERNS = [
  /\bcomo\b/i,
  /\bc[oó]mo\b/i,
  /\bque hacer\b/i,
  /\bqu[eé] hacer\b/i,
  /\bpor que\b/i,
  /\bpor qu[eé]\b/i,
  /\bporque\b/i,
  /\btutorial\b/i,
  /\bmanual\b/i,
  /\bguia\b/i,
  /\bguía\b/i,
  /\bpdf\b/i,
  /\byoutube\b/i,
  /\bforo\b/i,
  /\bblog\b/i,
  /\bopiniones\b/i,
  /\bmejor\b/i,
  /\bmarca\b/i,
  /\bmedidas\b/i,
  /\bdom[eé]stico\b/i,
  /\bhorizontal\b/i,
  /\bvertical\b/i,
  /\bmulticapa\b/i,
  /\bpex\b/i,
  /\bcobre\b/i,
  /\bpvc\b/i,
  /\bpolietileno\b/i,
  /\bdetector\b/i,
  /\brecambio/i,
  /\brepuesto/i,
  /\bbricolaje\b/i,
  /\bcaser[oa]\b/i,
  /\bcomprar\b/i,
  /\bventa\b/i,
  /\boferta\b/i,
  /\bamazon\b/i,
  /\bleroy\b/i,
  /\bikea\b/i,
  /\bwallapop\b/i,
  /\btrabajo\b/i,
  /\bempleo\b/i,
  /\bsueldo\b/i,
  /\bcurso\b/i,
  /\b24\s*horas\b/i,
  /\b24h\b/i,
  /\b\d+\s*litros\b/i,
  /\blitros\b/i,
]

const SERVICE_ACTION_PATTERNS = [
  /\bfontaner/i,
  /\brepar/i,
  /\barregl/i,
  /\bcambiar/i,
  /\bcambio\b/i,
  /\binstal/i,
  /\bsustitu/i,
  /\bdesatasc/i,
  /\bmantenimiento/i,
  /\brevision/i,
  /\binspeccion/i,
  /\bpresupuesto/i,
  /\bprecio\b/i,
  /\burgente/i,
  /\bservicio/i,
  /\bpierde agua\b/i,
  /\bgotea\b/i,
  /\bfuga\b/i,
  /\batasco\b/i,
  /\bcerca de mi\b/i,
]

function parseArgs() {
  const args = process.argv.slice(2)
  const flags = new Set(args.filter((arg) => arg.startsWith('--')))
  const numberArg = (name, fallback) => {
    const index = args.indexOf(name)
    const value = index >= 0 ? Number(args[index + 1]) : fallback
    return Number.isFinite(value) && value > 0 ? value : fallback
  }
  return {
    execute: flags.has('--execute'),
    archiveExisting: flags.has('--archive-existing'),
    minVolume: numberArg('--min-volume', 30),
    budgetEur: numberArg('--budget-eur', 20),
    maxCpcEur: numberArg('--max-cpc-eur', 0.65),
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

function microsToCurrency(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.round((parsed / 1000000) * 100) / 100 : null
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

function csvParseLine(line) {
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
    if (!quoted && char === ',') {
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

function readSeoRows() {
  const lines = fs.readFileSync(SEO_CSV, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean)
  const header = csvParseLine(lines.shift())
  return lines.map((line) => {
    const cells = csvParseLine(line)
    return Object.fromEntries(header.map((name, index) => [name, cells[index] || '']))
  })
}

function isAllowedPage(page) {
  return Object.prototype.hasOwnProperty.call(LANDINGS, page)
}

function isAllowedKeyword(row) {
  const keyword = clean(row.keyword)
  const key = normalize(keyword)
  if (!keyword || !key) return false
  if (!isAllowedPage(row.page)) return false
  if (!ALLOWED_TYPES.has(row.type)) return false
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(key))) return false
  if (!SERVICE_ACTION_PATTERNS.some((pattern) => pattern.test(key))) return false
  return true
}

function dedupeSeoKeywords() {
  const byKey = new Map()
  for (const row of readSeoRows()) {
    if (!isAllowedKeyword(row)) continue
    const keyword = clean(row.keyword)
    const key = normalize(keyword)
    if (byKey.has(key)) continue
    byKey.set(key, {
      keyword,
      landing: row.page,
      adGroupName: LANDINGS[row.page],
      seoType: row.type,
      seoSource: row.source,
    })
  }
  return Array.from(byKey.values())
}

function chunk(items, size) {
  const out = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

async function fetchHistoricalMetrics(accessToken, keywords) {
  const metrics = new Map()
  const batches = chunk(keywords, 100)
  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index]
    console.log(`Google Ads Valencia metrics batch ${index + 1}/${batches.length}: ${batch.length} keywords`)
    const raw = await postJson(
      GOOGLE_ADS_HOST,
      `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}:generateKeywordHistoricalMetrics`,
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
      metrics.set(normalize(keyword), {
        keyword,
        avgMonthlySearches: Number(item.avgMonthlySearches || 0),
        competitionIndex: item.competitionIndex ?? null,
        competitionLevel: item.competition ?? null,
        lowTopOfPageBid: microsToCurrency(item.lowTopOfPageBidMicros),
        highTopOfPageBid: microsToCurrency(item.highTopOfPageBidMicros),
      })
    }
  }
  return metrics
}

function truncate(text, limit) {
  const value = clean(text)
  if (value.length <= limit) return value
  const cut = value.slice(0, limit + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 12 ? lastSpace : limit).trim()
}

function buildAdForGroup(groupName, landing) {
  const simpleName = groupName.replace(/^FON\s+/i, '').replace(/\s+Valencia$/i, '')
  return {
    finalUrl: `https://reparar24.es${landing}?utm_source=google&utm_medium=cpc&utm_campaign=fontanero_valencia_seo&utm_content=${normalize(simpleName).replace(/\s+/g, '_')}`,
    headlines: [
      'Fontanero en Valencia',
      truncate(simpleName, 30),
      'Presupuesto Claro',
      'Reparar24 Fontaneros',
      'Tecnicos Certificados',
      'Garantia por Escrito',
      'Llama o WhatsApp',
      'Servicio Profesional',
      'Respuesta Rapida',
      'Solucionamos tu Averia',
      'Sin Compromiso',
      'Atencion en Valencia',
    ].map((text) => ({ text: truncate(text, 30) })),
    descriptions: [
      'Cuéntanos la avería y te orientamos antes de intervenir. Presupuesto claro en Valencia.',
      'Respuesta por teléfono o WhatsApp. Técnicos identificados y trabajo con garantía.',
      'Fontaneros profesionales para reparaciones, instalaciones y mantenimiento en Valencia.',
      'Explicamos la solución y el precio antes de empezar. Atención directa de Reparar24.',
    ].map((text) => ({ text: truncate(text, 90) })),
  }
}

function buildPlanFromMetrics(seoKeywords, metrics, options) {
  const keywords = seoKeywords
    .map((item) => {
      const metric = metrics.get(normalize(item.keyword))
      return {
        ...item,
        avgMonthlySearches: metric?.avgMonthlySearches || 0,
        competitionIndex: metric?.competitionIndex ?? null,
        competitionLevel: metric?.competitionLevel ?? null,
        lowTopOfPageBid: metric?.lowTopOfPageBid ?? null,
        highTopOfPageBid: metric?.highTopOfPageBid ?? null,
      }
    })
    .filter((item) => item.avgMonthlySearches >= options.minVolume)
    .sort((a, b) => {
      const groupDiff = a.adGroupName.localeCompare(b.adGroupName, 'es')
      if (groupDiff !== 0) return groupDiff
      const volumeDiff = b.avgMonthlySearches - a.avgMonthlySearches
      if (volumeDiff !== 0) return volumeDiff
      return a.keyword.localeCompare(b.keyword, 'es')
    })

  const groups = Object.entries(Object.groupBy(keywords, (item) => item.adGroupName))
    .map(([name, items]) => ({
      name,
      landing: items[0].landing,
      keywords: items,
      ad: buildAdForGroup(name, items[0].landing),
      status: 'ENABLED',
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))

  return {
    generatedAt: new Date().toISOString(),
    source: 'approved-seo-export + google-ads-historical-metrics',
    dryRun: !options.execute,
    filters: {
      minVolume: options.minVolume,
      geoTarget: VALENCIA_GEO_TARGET,
      language: SPANISH_LANGUAGE_CONSTANT,
      blocked24h: true,
      blockedInfoDiyProductIntent: true,
    },
    campaign: {
      name: `R24 | Fontanero | Valencia | SEO Search | ${new Date().toISOString().slice(0, 10)}`,
      status: 'ENABLED',
      dailyBudgetEur: options.budgetEur,
      dailyBudgetMicros: eurosToMicros(options.budgetEur),
      maxCpcEur: options.maxCpcEur,
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
      negativeKeywords: NEGATIVES,
      schedule: '08:00-20:00 Europe/Madrid, all days',
    },
    groups,
    summary: {
      sourceSeoKeywords: seoKeywords.length,
      selectedKeywords: keywords.length,
      adGroups: groups.length,
      keywordCriteria: keywords.length * 2,
      ads: groups.length,
    },
  }
}

function writePlan(plan) {
  ensureDir(OUT_DIR)
  fs.writeFileSync(PLAN_JSON, `${JSON.stringify(plan, null, 2)}\n`, 'utf8')

  const rows = [[
    'ad_group',
    'landing',
    'keyword',
    'avg_monthly_searches_valencia',
    'competition_index',
    'competition_level',
    'low_top_of_page_bid_eur',
    'high_top_of_page_bid_eur',
    'match_types',
    'seo_type',
    'seo_source',
  ]]

  for (const group of plan.groups) {
    for (const item of group.keywords) {
      rows.push([
        group.name,
        item.landing,
        item.keyword,
        item.avgMonthlySearches,
        item.competitionIndex ?? '',
        item.competitionLevel ?? '',
        item.lowTopOfPageBid ?? '',
        item.highTopOfPageBid ?? '',
        'EXACT + PHRASE',
        item.seoType,
        item.seoSource,
      ])
    }
  }

  fs.writeFileSync(PLAN_CSV, `${rows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')
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

async function listExistingFontaneroCampaigns(accessToken, newCampaignName) {
  const raw = await search(accessToken, [
    'SELECT campaign.resource_name, campaign.name, campaign.status',
    'FROM campaign',
    "WHERE campaign.advertising_channel_type = 'SEARCH'",
    "AND campaign.status != 'REMOVED'",
    "AND campaign.name LIKE '%Fontanero%'",
  ].join(' '))

  return (raw?.results || [])
    .map((result) => result.campaign)
    .filter((campaign) => campaign?.resourceName && campaign.name !== newCampaignName)
}

async function executePlan(plan, options) {
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

  const adGroupResponse = await mutate(accessToken, 'adGroups', plan.groups.map((group) => ({
    create: {
      name: group.name,
      status: 'ENABLED',
      campaign,
      type: 'SEARCH_STANDARD',
      cpcBidMicros: group.maxCpcMicros,
    },
  })), 120000)

  const createdGroups = adGroupResponse?.results || []
  for (let i = 0; i < createdGroups.length; i += 1) {
    const adGroup = createdGroups[i].resourceName
    const group = plan.groups[i]
    const keywordOps = []
    for (const item of group.keywords) {
      for (const matchType of ['EXACT', 'PHRASE']) {
        keywordOps.push({
          create: {
            adGroup,
            status: 'ENABLED',
            cpcBidMicros: group.maxCpcMicros,
            keyword: { text: item.keyword, matchType },
          },
        })
      }
    }
    await mutate(accessToken, 'adGroupCriteria', keywordOps, 120000)
    await mutate(accessToken, 'adGroupAds', [{
      create: {
        adGroup,
        status: 'ENABLED',
        ad: {
          finalUrls: [group.ad.finalUrl],
          responsiveSearchAd: {
            headlines: group.ad.headlines,
            descriptions: group.ad.descriptions,
          },
        },
      },
    }])
  }

  const existingCampaigns = options.archiveExisting
    ? await listExistingFontaneroCampaigns(accessToken, plan.campaign.name)
    : []

  const archiveResponse = options.archiveExisting
    ? await mutate(accessToken, 'campaigns', existingCampaigns.map((oldCampaign) => ({ remove: oldCampaign.resourceName })))
    : { results: [] }

  return {
    executedAt: new Date().toISOString(),
    campaign,
    campaignName: plan.campaign.name,
    campaignBudget,
    adGroups: createdGroups.length,
    keywordCriteria: plan.summary.keywordCriteria,
    ads: plan.summary.ads,
    archivedExisting: existingCampaigns.map((campaign) => ({
      resourceName: campaign.resourceName,
      name: campaign.name,
      previousStatus: campaign.status,
    })),
    archivedExistingCount: archiveResponse?.results?.length || 0,
  }
}

async function main() {
  const options = parseArgs()
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const accessToken = await refreshAccessToken()
  const seoKeywords = dedupeSeoKeywords()
  console.log(`SEO commercial candidates before volume filter: ${seoKeywords.length}`)
  const metrics = await fetchHistoricalMetrics(accessToken, seoKeywords.map((item) => item.keyword))
  const plan = buildPlanFromMetrics(seoKeywords, metrics, options)
  writePlan(plan)

  console.log(`Selected keywords >= ${options.minVolume}: ${plan.summary.selectedKeywords}`)
  console.log(`Ad groups: ${plan.summary.adGroups}`)
  console.log(`Keyword criteria: ${plan.summary.keywordCriteria}`)
  console.log(`Plan: ${path.relative(ROOT, PLAN_JSON)}`)
  console.log(`CSV: ${path.relative(ROOT, PLAN_CSV)}`)

  if (!options.execute) {
    console.log('Dry-run only. Pass --execute to create the campaign.')
    return
  }

  const execution = await executePlan(plan, options)
  fs.writeFileSync(EXECUTION_JSON, `${JSON.stringify(execution, null, 2)}\n`, 'utf8')
  console.log(`Created campaign: ${execution.campaignName}`)
  console.log(`Archived old campaigns: ${execution.archivedExistingCount}`)
  console.log(`Execution: ${path.relative(ROOT, EXECUTION_JSON)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
