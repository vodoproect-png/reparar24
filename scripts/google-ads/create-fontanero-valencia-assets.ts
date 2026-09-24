// @ts-nocheck
/**
 * Adds rich Google Ads assets to the paused Fontanero Valencia pilot campaign.
 *
 * Assets help Search ads occupy more SERP space: sitelinks, callouts,
 * structured snippets and a call asset. The campaign itself remains PAUSED.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-assets.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const SITELINKS = [
  {
    linkText: 'Fontanero Urgente',
    description1: 'Respuesta rapida',
    description2: 'Presupuesto previo',
    finalUrl: 'https://reparar24.es/fontanero',
  },
  {
    linkText: 'Reparacion de Fugas',
    description1: 'Deteccion profesional',
    description2: 'Garantia por escrito',
    finalUrl: 'https://reparar24.es/fontanero/reparacion-fugas',
  },
  {
    linkText: 'Cambio de Grifos',
    description1: 'Cocina y bano',
    description2: 'Piezas homologadas',
    finalUrl: 'https://reparar24.es/fontanero/cambio-reparacion-grifos',
  },
  {
    linkText: 'Reparacion Cisternas',
    description1: 'Cisternas y WC',
    description2: 'Solucion sin sorpresas',
    finalUrl: 'https://reparar24.es/fontanero/reparacion-cisternas',
  },
  {
    linkText: 'Instalaciones',
    description1: 'Fontaneria para vivienda',
    description2: 'Trabajo certificado',
    finalUrl: 'https://reparar24.es/fontanero/instalaciones',
  },
  {
    linkText: 'Termos Electricos',
    description1: 'Instalacion y cambio',
    description2: 'Revisamos conexiones',
    finalUrl: 'https://reparar24.es/fontanero/termos-electricos',
  },
]

const CALLOUTS = [
  'Llegada 30-60 min',
  'Presupuesto previo',
  'Garantia 2 anos',
  'Tecnicos certificados',
  'Factura disponible',
  'Sin compromiso',
  'Atencion por WhatsApp',
  'Respuesta rapida',
  'Diagnostico claro',
]

const STRUCTURED_SNIPPETS = [
  {
    header: 'Servicios',
    values: [
      'Fugas',
      'Grifos',
      'Cisternas',
      'Termos',
      'Instalaciones',
      'Mantenimiento',
    ],
  },
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
    throw new Error(`Missing execution report: ${path.relative(process.cwd(), EXECUTION_PATH)}. Create the pilot campaign first.`)
  }

  const execution = JSON.parse(fs.readFileSync(EXECUTION_PATH, 'utf8'))
  if (!execution.campaign) throw new Error('Execution report does not include campaign resource name.')
  return execution.campaign
}

function sitelinkOperation(item) {
  return {
    create: {
      finalUrls: [item.finalUrl],
      sitelinkAsset: {
        linkText: item.linkText,
        description1: item.description1,
        description2: item.description2,
      },
    },
  }
}

function calloutOperation(text) {
  return {
    create: {
      calloutAsset: {
        calloutText: text,
      },
    },
  }
}

function structuredSnippetOperation(item) {
  return {
    create: {
      structuredSnippetAsset: {
        header: item.header,
        values: item.values,
      },
    },
  }
}

function callOperation() {
  return {
    create: {
      callAsset: {
        countryCode: 'ES',
        phoneNumber: '+34642310813',
      },
    },
  }
}

async function createAssets(accessToken) {
  const operations = [
    ...SITELINKS.map(sitelinkOperation),
    ...CALLOUTS.map(calloutOperation),
    ...STRUCTURED_SNIPPETS.map(structuredSnippetOperation),
    callOperation(),
  ]

  const response = await mutate(accessToken, 'assets', operations)
  const resources = response?.results?.map((result) => result.resourceName).filter(Boolean) || []

  if (resources.length !== operations.length) {
    throw new Error(`Asset creation returned ${resources.length} resources for ${operations.length} operations.`)
  }

  return {
    sitelinks: resources.slice(0, SITELINKS.length),
    callouts: resources.slice(SITELINKS.length, SITELINKS.length + CALLOUTS.length),
    structuredSnippets: resources.slice(SITELINKS.length + CALLOUTS.length, SITELINKS.length + CALLOUTS.length + STRUCTURED_SNIPPETS.length),
    call: resources[resources.length - 1],
  }
}

async function attachAssets(accessToken, campaign, assets) {
  const operations = [
    ...assets.sitelinks.map((asset) => ({
      create: { campaign, asset, fieldType: 'SITELINK', status: 'ENABLED' },
    })),
    ...assets.callouts.map((asset) => ({
      create: { campaign, asset, fieldType: 'CALLOUT', status: 'ENABLED' },
    })),
    ...assets.structuredSnippets.map((asset) => ({
      create: { campaign, asset, fieldType: 'STRUCTURED_SNIPPET', status: 'ENABLED' },
    })),
    {
      create: { campaign, asset: assets.call, fieldType: 'CALL', status: 'ENABLED' },
    },
  ]

  const response = await mutate(accessToken, 'campaignAssets', operations)
  return response?.results?.map((result) => result.resourceName).filter(Boolean) || []
}

async function removeExistingCampaignAssets(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT campaign_asset.resource_name, campaign_asset.field_type FROM campaign_asset WHERE campaign_asset.campaign = '${campaign}' AND campaign_asset.field_type IN ('SITELINK', 'CALLOUT', 'STRUCTURED_SNIPPET', 'CALL')`,
  )

  const resourceNames = (raw?.results || [])
    .map((result) => result.campaignAsset?.resourceName)
    .filter(Boolean)

  await mutate(accessToken, 'campaignAssets', resourceNames.map((resourceName) => ({ remove: resourceName })))
  return resourceNames.length
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const removedAssociations = await removeExistingCampaignAssets(accessToken, campaign)
  const assets = await createAssets(accessToken)
  const campaignAssets = await attachAssets(accessToken, campaign, assets)

  const report = {
    campaign,
    createdAt: new Date().toISOString(),
    assets: {
      sitelinks: SITELINKS.length,
      callouts: CALLOUTS.length,
      structuredSnippets: STRUCTURED_SNIPPETS.length,
      callAssets: 1,
      total: SITELINKS.length + CALLOUTS.length + STRUCTURED_SNIPPETS.length + 1,
    },
    removedAssociations,
    campaignAssetAssociations: campaignAssets.length,
    status: 'Assets enabled, campaign remains paused.',
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Created and attached ${report.assets.total} Google Ads assets.`)
  console.log(`Campaign asset associations: ${report.campaignAssetAssociations}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
