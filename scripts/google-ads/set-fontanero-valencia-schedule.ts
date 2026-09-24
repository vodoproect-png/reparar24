// @ts-nocheck
/**
 * Restricts the paused Fontanero Valencia pilot campaign to 08:00-20:00
 * Valencia mainland Spain time.
 *
 * Google Ads applies ad schedules in the customer account time zone.
 * Existing ad schedule criteria on this campaign are removed before applying
 * the new schedule.
 */

const fs = require('fs')
const path = require('path')
const { postJson, requireEnv } = require('../keyword-providers/common')

const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || 'v25'
const GOOGLE_ADS_HOST = 'googleads.googleapis.com'
const GOOGLE_OAUTH_HOST = 'oauth2.googleapis.com'
const OUT_DIR = path.join(process.cwd(), '.tmp', 'google-ads')
const EXECUTION_PATH = path.join(OUT_DIR, 'fontanero-valencia-search-pilot-execution.json')
const REPORT_PATH = path.join(OUT_DIR, 'fontanero-valencia-schedule.json')

const REQUIRED_ENV = [
  'GOOGLE_ADS_DEVELOPER_TOKEN',
  'GOOGLE_ADS_CLIENT_ID',
  'GOOGLE_ADS_CLIENT_SECRET',
  'GOOGLE_ADS_REFRESH_TOKEN',
  'GOOGLE_ADS_CUSTOMER_ID',
  'GOOGLE_ADS_ADVERTISING_CUSTOMER_ID',
]

const DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

const VALENCIA_TARGET = {
  startHour: 8,
  endHour: 20,
  label: '08:00-20:00 Europe/Madrid',
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

async function mutate(accessToken, operations) {
  if (!operations.length) return { results: [] }

  return postJson(
    GOOGLE_ADS_HOST,
    `/${GOOGLE_ADS_API_VERSION}/customers/${customerId()}/campaignCriteria:mutate`,
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

async function getCustomerTimeZone(accessToken) {
  const raw = await search(accessToken, 'SELECT customer.time_zone FROM customer')
  return raw?.results?.[0]?.customer?.timeZone || null
}

async function listExistingSchedules(accessToken, campaign) {
  const raw = await search(
    accessToken,
    `SELECT campaign_criterion.resource_name FROM campaign_criterion WHERE campaign_criterion.campaign = '${campaign}' AND campaign_criterion.type = 'AD_SCHEDULE'`,
  )

  return (raw?.results || [])
    .map((result) => result.campaignCriterion?.resourceName)
    .filter(Boolean)
}

function accountScheduleForValencia(timeZone) {
  if (timeZone === 'Atlantic/Canary') {
    return {
      startHour: 7,
      endHour: 19,
      label: '07:00-19:00 Atlantic/Canary',
      note: 'Account is Atlantic/Canary, one hour behind Valencia. This maps to 08:00-20:00 Europe/Madrid.',
    }
  }

  return {
    startHour: VALENCIA_TARGET.startHour,
    endHour: VALENCIA_TARGET.endHour,
    label: VALENCIA_TARGET.label,
    note: 'Account time zone appears aligned with mainland Spain or no offset override was needed.',
  }
}

function createScheduleOperations(campaign, schedule) {
  return DAYS.map((dayOfWeek) => ({
    create: {
      campaign,
      adSchedule: {
        dayOfWeek,
        startHour: schedule.startHour,
        startMinute: 'ZERO',
        endHour: schedule.endHour,
        endMinute: 'ZERO',
      },
    },
  }))
}

async function main() {
  requireEnv(REQUIRED_ENV)
  ensureDir(OUT_DIR)

  const campaign = readCampaignResourceName()
  const accessToken = await refreshAccessToken()
  const timeZone = await getCustomerTimeZone(accessToken)
  const accountSchedule = accountScheduleForValencia(timeZone)
  const existingSchedules = await listExistingSchedules(accessToken, campaign)

  await mutate(accessToken, existingSchedules.map((resourceName) => ({ remove: resourceName })))
  const created = await mutate(accessToken, createScheduleOperations(campaign, accountSchedule))

  const report = {
    campaign,
    accountTimeZone: timeZone,
    targetSchedule: {
      days: DAYS,
      start: '08:00',
      end: '20:00',
      timeZone: 'Europe/Madrid',
    },
    appliedAccountSchedule: {
      start: `${String(accountSchedule.startHour).padStart(2, '0')}:00`,
      end: `${String(accountSchedule.endHour).padStart(2, '0')}:00`,
      timeZone: timeZone,
      note: accountSchedule.note,
    },
    removedExistingSchedules: existingSchedules.length,
    createdSchedules: created?.results?.length || 0,
    status: 'Schedule applied. Campaign activation state was not changed.',
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  console.log(`Applied ad schedule ${accountSchedule.label} to ${report.createdSchedules} days.`)
  console.log(`Target Valencia schedule: ${VALENCIA_TARGET.label}`)
  console.log(`Account time zone: ${timeZone || 'unknown'}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
}

main().catch((error) => {
  console.error(error?.message || JSON.stringify(error, null, 2))
  process.exit(1)
})
