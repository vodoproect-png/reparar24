// @ts-nocheck
/**
 * Builds a safe Google Ads Search pilot for Fontanero child services in Valencia.
 *
 * Default mode is dry-run and writes only to .tmp/google-ads.
 * Execute mode creates Google Ads resources, but every campaign, ad group,
 * keyword and ad is created PAUSED. This script never activates spend.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv, slugify } = require('../keyword-providers/common')
const { childServicesData } = require('../../data/fontanero/child-services-seo')
const { FONTANERO_PAGE_REGISTRY } = require('../../data/seo/page-registry')

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
]

const SPANISH_LANGUAGE_CONSTANT = 'languageConstants/1003'
const VALENCIA_FALLBACK_GEO_TARGET = 'geoTargetConstants/1005549'

const INFO_INTENT_PATTERNS = [
  /\bcomo\b/i,
  /\bc[oó]mo\b/i,
  /\bque hacer\b/i,
  /\bqu[eé] hacer\b/i,
  /\bpor qu[eé]\b/i,
  /\bporque\b/i,
  /\btutorial\b/i,
  /\bmanual\b/i,
  /\bpdf\b/i,
  /\bbricolaje\b/i,
]

const CAMPAIGN_NEGATIVES = [
  'gratis',
  'curso',
  'cursos',
  'trabajo',
  'empleo',
  'ofertas de empleo',
  'sueldo',
  'salario',
  'fp',
  'formacion',
  'formación',
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
  'oposiciones',
  'aprendiz',
]

function parseArgs() {
  const args = process.argv.slice(2)
  const flags = new Set(args.filter((arg) => arg.startsWith('--')))

  function readNumber(name, fallback) {
    const index = args.indexOf(name)
    if (index === -1 || !args[index + 1]) return fallback
    const value = Number(args[index + 1])
    return Number.isFinite(value) && value > 0 ? value : fallback
  }

  return {
    execute: flags.has('--execute'),
    budgetEur: readNumber('--budget-eur', Number(process.env.GOOGLE_ADS_PILOT_DAILY_BUDGET_EUR || 10)),
    maxCpcEur: readNumber('--max-cpc-eur', Number(process.env.GOOGLE_ADS_PILOT_MAX_CPC_EUR || 0.45)),
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function eurosToMicros(value) {
  return String(Math.round(Number(value) * 1000000))
}

function cleanText(value) {
  return String(value || '')
    .replace(/[¿?¡!|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateGoogleText(text, limit) {
  const normalized = cleanText(text)
  if (normalized.length <= limit) return normalized
  const cut = normalized.slice(0, limit + 1)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 12 ? lastSpace : limit).trim()
}

function titleCaseSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function isCommercialKeyword(keyword) {
  const normalized = cleanText(keyword).toLowerCase()
  if (!normalized) return false
  if (INFO_INTENT_PATTERNS.some((pattern) => pattern.test(normalized))) return false
  return true
}

function unique(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = cleanText(item).toLowerCase()
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function buildKeywords(service) {
  const base = unique([
    service.lockedPrimaryKw,
    service.h1,
    ...(service.secondaryKw || []),
  ]).filter(isCommercialKeyword)

  const selected = base.slice(0, 8)
  const keywordTexts = unique(selected.flatMap((keyword) => {
    const text = cleanText(keyword)
    const hasValencia = /\bvalencia\b/i.test(text)
    return hasValencia ? [text] : [text, `${text} valencia`]
  })).slice(0, 12)

  return keywordTexts.flatMap((text) => ([
    { text, matchType: 'EXACT' },
    { text, matchType: 'PHRASE' },
  ]))
}

function buildAds(slug, service) {
  const serviceName = truncateGoogleText(service.h1, 30)
  const primary = truncateGoogleText(service.lockedPrimaryKw, 30)

  const headlines = unique([
    'Fontanero en Valencia',
    serviceName,
    primary,
    'Presupuesto Claro',
    'Reparar24 Fontaneros',
    'Llegada 30-60 Min',
    'Garantia 2 Anos',
    'Tecnicos Certificados',
    'Pide Presupuesto',
    'Sin Compromiso',
    'Habla por WhatsApp',
    'Solucion Hoy',
    'Revisa tu Averia',
    'Llamanos Ahora',
    'Servicio Profesional',
    'Reparacion con Garantia',
  ]).map((text) => ({ text: truncateGoogleText(text, 30) })).slice(0, 15)

  const descriptions = unique([
    'Cuentanos la averia y te orientamos antes de intervenir. Presupuesto claro en Valencia.',
    'Respuesta rapida por telefono o WhatsApp. Coordinamos la visita sin compromiso.',
    truncateGoogleText(service.metaDescription, 90),
    'Tecnicos identificados, garantia por escrito y explicacion clara antes de empezar.',
  ]).map((text) => ({ text: truncateGoogleText(text, 90) })).slice(0, 4)

  return {
    finalUrl: `https://reparar24.es/fontanero/${slug}?utm_source=google&utm_medium=cpc&utm_campaign=fontanero_valencia_search_test&utm_content=${slug}`,
    headlines,
    descriptions,
  }
}

function buildPlan(options) {
  const allowedSlugs = FONTANERO_PAGE_REGISTRY.children
    .filter((entry) => entry.allowed && entry.status === 'approved')
    .map((entry) => entry.slug)

  const adGroups = allowedSlugs.map((slug) => {
    const service = childServicesData[slug]
    if (!service) {
      return { slug, error: 'Missing child service data' }
    }

    return {
      slug,
      name: truncateGoogleText(`FON | ${titleCaseSlug(slug)} | Valencia`, 255),
      landingPage: `https://reparar24.es/fontanero/${slug}`,
      h1: service.h1,
      primaryKeyword: service.lockedPrimaryKw,
      keywords: buildKeywords(service),
      ad: buildAds(slug, service),
      status: 'PAUSED',
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
    }
  })

  return {
    createdAt: new Date().toISOString(),
    dryRun: !options.execute,
    safety: {
      allCreatedResourcesStatus: 'PAUSED',
      network: 'Google Search only',
      matchTypes: ['EXACT', 'PHRASE'],
      broadMatch: false,
      displayNetwork: false,
      searchPartners: false,
      activation: 'Not supported by this script',
    },
    campaign: {
      name: `R24 | Fontanero | Valencia | Search Test`,
      status: 'PAUSED',
      dailyBudgetEur: options.budgetEur,
      dailyBudgetMicros: eurosToMicros(options.budgetEur),
      maxCpcEur: options.maxCpcEur,
      maxCpcMicros: eurosToMicros(options.maxCpcEur),
      language: SPANISH_LANGUAGE_CONSTANT,
      location: {
        label: 'Valencia, Spain',
        geoTargetConstant: VALENCIA_FALLBACK_GEO_TARGET,
        note: 'Resolved or verified at execute time.',
      },
      negativeKeywords: CAMPAIGN_NEGATIVES,
    },
    adGroups,
    summary: {
      adGroups: adGroups.filter((group) => !group.error).length,
      keywords: adGroups.reduce((sum, group) => sum + (group.keywords?.length || 0), 0),
      ads: adGroups.filter((group) => group.ad).length,
      errors: adGroups.filter((group) => group.error).length,
    },
  }
}

function writePlan(plan) {
  ensureDir(OUT_DIR)
  const jsonPath = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-plan.json')
  const csvPath = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-keywords.csv')

  fs.writeFileSync(jsonPath, `${JSON.stringify(plan, null, 2)}\n`, 'utf8')

  const rows = [['ad_group', 'landing_page', 'match_type', 'keyword', 'max_cpc_eur']]
  for (const group of plan.adGroups) {
    for (const keyword of group.keywords || []) {
      rows.push([
        group.name,
        group.landingPage,
        keyword.matchType,
        keyword.text,
        String(plan.campaign.maxCpcEur),
      ])
    }
  }

  fs.writeFileSync(
    csvPath,
    `${rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')}\n`,
    'utf8',
  )

  return {
    json: path.relative(process.cwd(), jsonPath),
    csv: path.relative(process.cwd(), csvPath),
  }
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

function customerId() {
  return String(process.env.GOOGLE_ADS_ADVERTISING_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
}

function loginCustomerId() {
  return String(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID || '').replace(/-/g, '')
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

async function searchGoogleAds(accessToken, query) {
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/googleAds:search`,
    googleAdsHeaders(accessToken),
    { query },
    30000,
  )
}

async function assertAdvertisingCustomer(accessToken) {
  const raw = await searchGoogleAds(
    accessToken,
    'SELECT customer.id, customer.descriptive_name, customer.manager, customer.status FROM customer',
  )

  const customer = raw?.results?.[0]?.customer
  if (!customer) {
    throw new Error('Could not read Google Ads customer details before creating campaign.')
  }

  if (customer.manager) {
    throw new Error([
      'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID is required for campaign creation.',
      `Current customer ${customer.id} (${customer.descriptiveName || 'unnamed'}) is a manager account.`,
      'Set GOOGLE_ADS_ADVERTISING_CUSTOMER_ID to a non-manager client account and keep GOOGLE_ADS_LOGIN_CUSTOMER_ID as the manager id.',
    ].join(' '))
  }

  return customer
}

async function suggestValenciaGeoTarget(accessToken) {
  try {
    const raw = await postJson(
      GOOGLE_ADS_HOST,
      `/${GOOGLE_ADS_API_VERSION}/geoTargetConstants:suggest`,
      googleAdsHeaders(accessToken),
      {
        locale: 'es',
        countryCode: 'ES',
        locationNames: { names: ['Valencia'] },
      },
      30000,
    )

    const suggestions = Array.isArray(raw?.geoTargetConstantSuggestions) ? raw.geoTargetConstantSuggestions : []
    const exact = suggestions.find((item) => {
      const geo = item.geoTargetConstant || {}
      return geo.countryCode === 'ES'
        && String(geo.name || '').toLowerCase() === 'valencia'
        && ['City', 'Municipality', 'Province'].includes(geo.targetType)
    })

    return exact?.geoTargetConstant?.resourceName || VALENCIA_FALLBACK_GEO_TARGET
  } catch (error) {
    console.warn(`Could not resolve Valencia geo target, using fallback ${VALENCIA_FALLBACK_GEO_TARGET}. ${error.message}`)
    return VALENCIA_FALLBACK_GEO_TARGET
  }
}

async function executePlan(plan) {
  requireEnv(REQUIRED_ENV)

  const accessToken = await refreshAccessToken()
  await assertAdvertisingCustomer(accessToken)
  const valenciaGeoTarget = await suggestValenciaGeoTarget(accessToken)

  const budgetResponse = await mutate(accessToken, 'campaignBudgets', [{
    create: {
      name: `${plan.campaign.name} | Budget | ${new Date().toISOString().slice(0, 10)}`,
      amountMicros: plan.campaign.dailyBudgetMicros,
      deliveryMethod: 'STANDARD',
      explicitlyShared: false,
    },
  }])

  const campaignBudget = budgetResponse?.results?.[0]?.resourceName
  if (!campaignBudget) throw new Error('Campaign budget creation did not return resourceName.')

  const campaignResponse = await mutate(accessToken, 'campaigns', [{
    create: {
      name: `${plan.campaign.name} | ${new Date().toISOString().slice(0, 10)}`,
      status: 'PAUSED',
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

  const campaignCriteria = [
    {
      create: {
        campaign,
        location: { geoTargetConstant: valenciaGeoTarget },
      },
    },
    {
      create: {
        campaign,
        language: { languageConstant: SPANISH_LANGUAGE_CONSTANT },
      },
    },
    ...plan.campaign.negativeKeywords.map((text) => ({
      create: {
        campaign,
        negative: true,
        keyword: { text, matchType: 'BROAD' },
      },
    })),
  ]
  await mutate(accessToken, 'campaignCriteria', campaignCriteria)

  const adGroupOperations = plan.adGroups
    .filter((group) => !group.error)
    .map((group) => ({
      create: {
        name: group.name,
        status: 'PAUSED',
        campaign,
        type: 'SEARCH_STANDARD',
        cpcBidMicros: group.maxCpcMicros,
      },
    }))

  const adGroupResponse = await mutate(accessToken, 'adGroups', adGroupOperations)
  const createdAdGroups = adGroupResponse?.results || []

  for (let i = 0; i < createdAdGroups.length; i += 1) {
    const adGroup = createdAdGroups[i].resourceName
    const group = plan.adGroups.filter((item) => !item.error)[i]

    await mutate(accessToken, 'adGroupCriteria', group.keywords.map((keyword) => ({
      create: {
        adGroup,
        status: 'PAUSED',
        cpcBidMicros: group.maxCpcMicros,
        keyword: {
          text: keyword.text,
          matchType: keyword.matchType,
        },
      },
    })))

    await mutate(accessToken, 'adGroupAds', [{
      create: {
        adGroup,
        status: 'PAUSED',
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

  return {
    campaign,
    campaignBudget,
    valenciaGeoTarget,
    adGroups: createdAdGroups.length,
    createdAt: new Date().toISOString(),
    status: 'PAUSED',
  }
}

async function main() {
  const options = parseArgs()
  const plan = buildPlan(options)
  const outputs = writePlan(plan)

  console.log(`Google Ads Fontanero Valencia pilot plan written:`)
  console.log(`- ${outputs.json}`)
  console.log(`- ${outputs.csv}`)
  console.log(`Plan: ${plan.summary.adGroups} ad groups, ${plan.summary.keywords} keywords, ${plan.summary.ads} paused ads.`)
  console.log(`Budget: ${plan.campaign.dailyBudgetEur} EUR/day. Max CPC: ${plan.campaign.maxCpcEur} EUR.`)

  if (!options.execute) {
    console.log('Dry-run only. Pass --execute to create PAUSED resources in Google Ads.')
    return
  }

  const execution = await executePlan(plan)
  const executionPath = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
  fs.writeFileSync(executionPath, `${JSON.stringify(execution, null, 2)}\n`, 'utf8')
  console.log(`Created PAUSED Google Ads resources. Execution report: ${path.relative(process.cwd(), executionPath)}`)
}

main().catch((error) => {
  if (error?.message) {
    console.error(error.message)
  } else {
    console.error(JSON.stringify(error, null, 2))
  }
  process.exit(1)
})
