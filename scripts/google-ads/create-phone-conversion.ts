// @ts-nocheck
/**
 * Creates or finds the Google Ads phone click conversion action.
 * Does not print secrets. Writes the Ads tag ids/labels to .tmp/google-ads.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const CONVERSION_NAME = 'Phone click - Reparar24'

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

async function mutate(accessToken, operations) {
  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/conversionActions:mutate`,
    googleAdsHeaders(accessToken),
    { operations },
    30000,
  )
}

function parseSendTo(tagSnippets = []) {
  const joined = tagSnippets
    .map((snippet) => `${snippet.globalSiteTag || ''}\n${snippet.eventSnippet || ''}`)
    .join('\n')
  const match = joined.match(/send_to['"]?\s*:\s*['"]([^'"]+)['"]/)
  if (!match) return { sendTo: null, conversionId: null, conversionLabel: null }
  const sendTo = match[1]
  const [, conversionId, conversionLabel] = sendTo.match(/^(AW-\d+)\/(.+)$/) || []
  return { sendTo, conversionId: conversionId || null, conversionLabel: conversionLabel || null }
}

async function findConversion(accessToken) {
  const escaped = CONVERSION_NAME.replace(/'/g, "\\'")
  const raw = await search(
    accessToken,
    `SELECT conversion_action.resource_name, conversion_action.id, conversion_action.name, conversion_action.status, conversion_action.type, conversion_action.category, conversion_action.primary_for_goal, conversion_action.include_in_conversions_metric, conversion_action.tag_snippets FROM conversion_action WHERE conversion_action.name = '${escaped}'`,
  )
  return raw?.results?.[0]?.conversionAction || null
}

async function createConversion(accessToken) {
  const response = await mutate(accessToken, [{
    create: {
      name: CONVERSION_NAME,
      status: 'ENABLED',
      type: 'WEBPAGE',
      category: 'CONTACT',
      primaryForGoal: true,
      countingType: 'ONE_PER_CLICK',
      clickThroughLookbackWindowDays: 30,
      viewThroughLookbackWindowDays: 1,
      valueSettings: {
        defaultValue: 1,
        defaultCurrencyCode: 'EUR',
        alwaysUseDefaultValue: true,
      },
    },
  }])

  const resourceName = response?.results?.[0]?.resourceName
  if (!resourceName) throw new Error('Conversion action creation did not return resourceName.')
  return resourceName
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const accessToken = await refreshAccessToken()
  let conversion = await findConversion(accessToken)
  let created = false

  if (!conversion) {
    await createConversion(accessToken)
    conversion = await findConversion(accessToken)
    created = true
  }

  if (!conversion) throw new Error('Could not read phone conversion action after create.')

  const parsed = parseSendTo(conversion.tagSnippets)
  const report = {
    created,
    resourceName: conversion.resourceName,
    id: conversion.id,
    name: conversion.name,
    status: conversion.status,
    type: conversion.type,
    category: conversion.category,
    primaryForGoal: conversion.primaryForGoal,
    includeInConversionsMetric: conversion.includeInConversionsMetric,
    sendTo: parsed.sendTo,
    conversionId: parsed.conversionId,
    conversionLabel: parsed.conversionLabel,
    updatedAt: new Date().toISOString(),
  }

  const output = path.join(OUT_DIR, 'phone-conversion-action.json')
  fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(`Phone conversion action ${created ? 'created' : 'already exists'}.`)
  console.log(`Report: ${path.relative(process.cwd(), output)}`)
  console.log(`Conversion action id: ${report.id}`)
  console.log(`send_to available: ${Boolean(report.sendTo)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
