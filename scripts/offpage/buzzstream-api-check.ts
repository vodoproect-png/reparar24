#!/usr/bin/env ts-node

const nodeCrypto = require('crypto')
const path = require('path')
require('dotenv').config({ path: path.join(process.cwd(), '.env.local'), quiet: true })
require('dotenv').config({ quiet: true })

type OAuthParams = Record<string, string>

const API_BASE_URL = process.env.BUZZSTREAM_API_BASE_URL || 'https://api.buzzstream.com/v1'

function encode(value: string): string {
  return encodeURIComponent(value)
    .replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
}

function authHeader(method: string, url: string, consumerKey: string, consumerSecret: string): string {
  const params: OAuthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: nodeCrypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: '1.0',
  }

  const normalized = Object.keys(params)
    .sort()
    .map((key) => `${encode(key)}=${encode(params[key])}`)
    .join('&')

  const baseString = [method.toUpperCase(), encode(url), encode(normalized)].join('&')
  const signingKey = `${encode(consumerSecret)}&`
  const signature = nodeCrypto.createHmac('sha1', signingKey).update(baseString).digest('base64')

  return `OAuth ${Object.entries({ ...params, oauth_signature: signature })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${encode(key)}="${encode(value)}"`)
    .join(', ')}`
}

async function main() {
  const args = process.argv.slice(2)
  const execute = args.includes('--execute')
  const consumerKey = process.env.BUZZSTREAM_CONSUMER_KEY
  const consumerSecret = process.env.BUZZSTREAM_CONSUMER_SECRET

  console.log('BuzzStream API check')
  console.log('====================')
  console.log(`Base URL: ${API_BASE_URL}`)

  if (!consumerKey || !consumerSecret) {
    console.log('Status: missing BUZZSTREAM_CONSUMER_KEY or BUZZSTREAM_CONSUMER_SECRET')
    console.log('Add credentials to .env.local, then run: npm run offpage:buzzstream:check -- --execute')
    process.exitCode = 1
    return
  }

  console.log('Credentials: present')

  if (!execute) {
    console.log('Preview only. Add -- --execute to make a signed API request.')
    return
  }

  const url = API_BASE_URL
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: authHeader('GET', url, consumerKey, consumerSecret),
      Accept: 'application/json',
    },
  })

  const text = await response.text()
  console.log(`HTTP: ${response.status}`)
  console.log(`Response preview: ${text.slice(0, 500)}`)

  if (!response.ok) {
    process.exitCode = 1
  }
}

main().catch((error: Error) => {
  console.error(`BuzzStream API check failed: ${error.message}`)
  process.exit(1)
})
