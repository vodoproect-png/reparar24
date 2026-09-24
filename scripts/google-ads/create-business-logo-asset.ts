// @ts-nocheck
/**
 * Creates and attaches a Google Ads business logo asset to the active
 * Reparar24 Fontanero campaign.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-business-logo-asset.json')

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

function parseArgs() {
  const args = process.argv.slice(2)
  const valueOf = (name, fallback = '') => {
    const index = args.indexOf(name)
    return index >= 0 ? args[index + 1] : fallback
  }
  return {
    campaign: valueOf('--campaign', process.env.GOOGLE_ADS_FONTANERO_VALENCIA_CAMPAIGN_RESOURCE || ''),
    image: valueOf('--image', path.join(process.cwd(), 'public', 'ads', 'reparar24-logo-google-ads.png')),
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
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/${service}:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    60000,
  )
}

async function main() {
  const options = parseArgs()
  requireEnv(REQUIRED_ENV)
  if (!options.campaign) throw new Error('Pass --campaign customers/.../campaigns/... or set GOOGLE_ADS_FONTANERO_VALENCIA_CAMPAIGN_RESOURCE.')
  if (!fs.existsSync(options.image)) throw new Error(`Logo image was not found: ${options.image}`)
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const accessToken = await refreshAccessToken()
  const imageData = fs.readFileSync(options.image).toString('base64')

  const assetResponse = await mutate(accessToken, 'assets', [{
    create: {
      name: `Reparar24 business logo ${new Date().toISOString().slice(0, 10)}`,
      imageAsset: {
        data: imageData,
      },
    },
  }])
  const asset = assetResponse?.results?.[0]?.resourceName
  if (!asset) throw new Error('Logo image asset creation did not return resourceName.')

  const campaignAssetResponse = await mutate(accessToken, 'campaignAssets', [{
    create: {
      campaign: options.campaign,
      asset,
      fieldType: 'BUSINESS_LOGO',
      status: 'ENABLED',
    },
  }])
  const campaignAsset = campaignAssetResponse?.results?.[0]?.resourceName
  if (!campaignAsset) throw new Error('Business logo campaign asset creation did not return resourceName.')

  const report = {
    createdAt: new Date().toISOString(),
    campaign: options.campaign,
    image: path.relative(process.cwd(), options.image),
    asset,
    campaignAsset,
    fieldType: 'BUSINESS_LOGO',
  }
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Created logo asset: ${asset}`)
  console.log(`Attached business logo: ${campaignAsset}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
