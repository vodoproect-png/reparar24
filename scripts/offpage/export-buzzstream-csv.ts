#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

const { buzzstreamConfig } = require('../../data/offpage/buzzstream')

const ROOT = process.cwd()
const OFFPAGE_DIR = path.join(ROOT, '.tmp', 'offpage')
const OUTREACH_PATH = path.join(OFFPAGE_DIR, 'outreach', 'outreach-briefs.json')
const OUT_DIR = path.join(OFFPAGE_DIR, 'buzzstream')

function csvEscape(value: unknown): string {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
}

function main() {
  if (!fs.existsSync(OUTREACH_PATH)) {
    throw new Error(`Outreach briefs not found: ${path.relative(ROOT, OUTREACH_PATH)}`)
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const outreach = readJson(OUTREACH_PATH)
  const briefs = (outreach.briefs || []).filter((brief: any) => brief.decision !== 'skip')

  const rows = briefs.map((brief: any) => ({
    Website: brief.sourceUrl || `https://${brief.domain}`,
    Domain: brief.domain,
    'First Name': '',
    'Last Name': '',
    Email: '',
    Phone: '',
    'Relationship Stage': buzzstreamConfig.relationshipStage,
    Tags: [...buzzstreamConfig.defaultTags, brief.decision, brief.wave || 'offpage']
      .filter(Boolean)
      .join('; '),
    'Source URL': brief.sourceUrl || '',
    'Target URL': brief.targetUrl,
    Anchor: brief.anchor,
    'Rel Policy': brief.relPolicy,
    Decision: brief.decision,
    Priority: brief.priority,
    'Max Offer EUR': brief.maxOfferEur,
    'Risk Score': brief.riskScore,
    'Priority Score': brief.priorityScore,
    Subject: brief.subject,
    'Outreach Message': brief.message,
    Notes: brief.notes,
  }))

  const csvPath = path.join(OUT_DIR, 'buzzstream-import-wave-1.csv')
  fs.writeFileSync(
    csvPath,
    `${[
      buzzstreamConfig.csvColumns.join(','),
      ...rows.map((row: any) =>
        buzzstreamConfig.csvColumns.map((column: string) => csvEscape(row[column])).join(',')
      ),
    ].join('\n')}\n`,
    'utf8'
  )

  const summaryPath = path.join(OUT_DIR, 'buzzstream-import-wave-1.json')
  fs.writeFileSync(
    summaryPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        projectName: buzzstreamConfig.defaultProjectName,
        total: rows.length,
        csvPath: path.relative(ROOT, csvPath),
        columns: buzzstreamConfig.csvColumns,
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  console.log('BuzzStream CSV export')
  console.log('=====================')
  console.log(`Project: ${buzzstreamConfig.defaultProjectName}`)
  console.log(`Rows: ${rows.length}`)
  console.log(`CSV: ${path.relative(ROOT, csvPath)}`)
  console.log(`Summary: ${path.relative(ROOT, summaryPath)}`)
}

try {
  main()
} catch (error: any) {
  console.error(`BuzzStream CSV export failed: ${error.message}`)
  process.exit(1)
}
