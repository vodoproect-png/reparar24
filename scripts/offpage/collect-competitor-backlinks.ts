#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(process.cwd(), '.env.local'), quiet: true })
require('dotenv').config({ quiet: true })

const { offpageCompetitors } = require('../../data/offpage/competitors')

type Options = {
  execute: boolean
  force: boolean
  limit: number
}

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, '.tmp', 'offpage', 'dataforseo-backlinks')

function getArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}

function parseArgs(): Options {
  const args = process.argv.slice(2)
  const limit = Number(getArg(args, '--limit') || 100)

  if (!Number.isFinite(limit) || limit < 1) {
    throw new Error('--limit must be a positive number')
  }

  return {
    execute: args.includes('--execute'),
    force: args.includes('--force'),
    limit,
  }
}

function safeFileName(value: string): string {
  return value.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase()
}

function authHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN || process.env.DATAFORSEO_API_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD || process.env.DATAFORSEO_API_PASSWORD

  if (!login || !password) {
    throw new Error('DataForSEO credentials are missing in env.')
  }

  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`
}

async function collectDomain(domain: string, limit: number) {
  const endpoint =
    process.env.DATAFORSEO_BACKLINKS_ENDPOINT ||
    'https://api.dataforseo.com/v3/backlinks/backlinks/live'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        target: domain,
        mode: 'one_per_domain',
        limit,
        order_by: ['rank,desc'],
        include_subdomains: true,
        exclude_internal_backlinks: true,
        backlinks_status_type: 'live',
        rank_scale: 'one_hundred',
        tag: `reparar24-offpage-${domain}`,
      },
    ]),
  })

  const body = await response.text()
  if (!response.ok) {
    throw new Error(`DataForSEO request failed for ${domain}: HTTP ${response.status}`)
  }

  return JSON.parse(body)
}

async function main() {
  const options = parseArgs()
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const preview = {
    generatedAt: new Date().toISOString(),
    mode: options.execute ? 'execute' : 'preview',
    limit: options.limit,
    competitors: offpageCompetitors,
  }

  if (!options.execute) {
    const previewPath = path.join(OUT_DIR, `preview-${Date.now()}.json`)
    fs.writeFileSync(previewPath, `${JSON.stringify(preview, null, 2)}\n`, 'utf8')
    console.log('DataForSEO competitor backlinks preview')
    console.log('======================================')
    console.log(`Competitors: ${offpageCompetitors.length}`)
    for (const competitor of offpageCompetitors) {
      console.log(`- ${competitor.domain} [${competitor.market}] ${competitor.services.join(', ')}`)
    }
    console.log(`Saved: ${path.relative(ROOT, previewPath)}`)
    return
  }

  console.log('Collecting competitor backlinks with DataForSEO')
  console.log('================================================')
  console.log(`Competitors: ${offpageCompetitors.length}`)

  const summary = {
    ...preview,
    results: [] as any[],
  }

  for (const competitor of offpageCompetitors) {
    const outPath = path.join(OUT_DIR, `${safeFileName(competitor.domain)}.json`)

    if (fs.existsSync(outPath) && !options.force) {
      console.log(`Skip existing: ${competitor.domain}`)
      summary.results.push({
        domain: competitor.domain,
        skippedDuplicate: true,
        outPath: path.relative(ROOT, outPath),
      })
      continue
    }

    console.log(`Collect: ${competitor.domain}`)
    const result = await collectDomain(competitor.domain, options.limit)
    fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
    summary.results.push({
      domain: competitor.domain,
      skippedDuplicate: false,
      outPath: path.relative(ROOT, outPath),
      statusCode: result.status_code,
      statusMessage: result.status_message,
      taskStatusCode: result.tasks?.[0]?.status_code,
      taskStatusMessage: result.tasks?.[0]?.status_message,
    })
  }

  const summaryPath = path.join(OUT_DIR, `summary-${Date.now()}.json`)
  fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')
  console.log(`Saved: ${path.relative(ROOT, summaryPath)}`)

  const denied = summary.results.filter((row: any) => row.taskStatusCode === 40204)
  if (denied.length) {
    console.log(`Backlinks API access denied for ${denied.length} competitors. Activate DataForSEO Backlinks subscription to collect competitor links.`)
  }
}

main().catch((error: Error) => {
  console.error(`Backlink collection failed: ${error.message}`)
  process.exit(1)
})
