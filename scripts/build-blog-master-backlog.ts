// @ts-nocheck
/**
 * Aggregate informational article clusters and commercial spillover keywords
 * from per-service blog semantic collection outputs.
 */

const fs = require('fs')
const path = require('path')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')

const BLOG_DIR = path.join(process.cwd(), '.tmp', 'blog')
const OUT_BASE = path.join(BLOG_DIR, 'blog-master-backlog')
const REPORT_PATH = path.join(process.cwd(), 'docs', 'seo', 'blog-master-backlog-report.md')

const SERVICE_LABELS = {
  fontaneria: 'Fontaneria',
  electricista: 'Electricista',
  desatascos: 'Desatascos',
  'aire-acondicionado': 'Aire Acondicionado / Climatizacion',
  calefaccion: 'Calefaccion',
  'limpieza-tuberias': 'Limpieza de Tuberias',
}

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      field += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(field)
      field = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      row.push(field)
      if (row.some((value) => value !== '')) rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  if (field || row.length) {
    row.push(field)
    if (row.some((value) => value !== '')) rows.push(row)
  }

  const [header, ...body] = rows
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ''])))
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferServiceFromFile(fileName) {
  return fileName.replace('-info-expanded-clusters.csv', '').replace('-info-expanded-commercial-backlog.csv', '')
}

function priority(totalVolume, keywordCount, flags) {
  const volume = Number(totalVolume || 0)
  const count = Number(keywordCount || 0)
  const flagText = String(flags || '')

  if (/safety-review|gas-safety-review|electrical-safety-review|sanitation-review/.test(flagText) && volume >= 500) return 'P0-safety'
  if (volume >= 1000 || count >= 80) return 'P1-high'
  if (volume >= 100 || count >= 15) return 'P2-medium'
  return 'P3-low'
}

function textLengthRule(totalVolume, keywordCount, flags) {
  const pr = priority(totalVolume, keywordCount, flags)
  if (pr === 'P0-safety' || pr === 'P1-high') return 'large-1400-2000-words'
  if (pr === 'P2-medium') return 'standard-900-1400-words'
  return 'short-700-1100-words-if-useful'
}

function existingArticleSet() {
  const set = new Set()
  for (const item of BLOG_ARTICLE_BRIEFS || []) {
    set.add(normalize(item.semanticClusterId))
    set.add(normalize(item.slug))
    set.add(normalize(item.primaryKeyword))
  }
  return set
}

function articleStatus(row, existing) {
  const identifiers = [
    row.clusterId,
    row.proposedSlug,
    row.primaryKeyword,
    row.proposedTitle,
  ].map(normalize)

  return identifiers.some((id) => id && existing.has(id)) ? 'already-created' : 'backlog'
}

function readClusters() {
  const existing = existingArticleSet()
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('-info-expanded-clusters.csv'))
    .sort()

  const rows = []
  for (const file of files) {
    const service = inferServiceFromFile(file)
    const data = parseCsv(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
    for (const row of data) {
      const next = {
        service,
        serviceLabel: SERVICE_LABELS[service] || service,
        status: articleStatus(row, existing),
        priority: priority(row.totalVolume, row.keywordCount, row.flags),
        textLengthRule: textLengthRule(row.totalVolume, row.keywordCount, row.flags),
        clusterId: row.clusterId,
        target: row.target,
        owner: row.owner,
        proposedSlug: row.proposedSlug,
        proposedTitle: row.proposedTitle,
        primaryKeyword: row.primaryKeyword,
        totalVolume: Number(row.totalVolume || 0),
        keywordCount: Number(row.keywordCount || 0),
        flags: row.flags,
        approvedKeywords: row.approvedKeywords,
      }
      rows.push(next)
    }
  }

  return rows.sort((a, b) => {
    const priorityOrder = { 'P0-safety': 0, 'P1-high': 1, 'P2-medium': 2, 'P3-low': 3 }
    return (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9) || b.totalVolume - a.totalVolume
  })
}

function readCommercialBacklog() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('-info-expanded-commercial-backlog.csv'))
    .sort()

  const rows = []
  for (const file of files) {
    const service = inferServiceFromFile(file)
    const data = parseCsv(fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'))
    for (const row of data) {
      if (!row.keyword) continue
      rows.push({
        service,
        serviceLabel: SERVICE_LABELS[service] || service,
        target: row.target,
        owner: row.owner,
        keyword: row.keyword,
        volume: Number(row.volume || 0),
        cpc: row.cpc,
        competition: row.competition,
        seed: row.seed,
        qualityFlags: row.qualityFlags,
      })
    }
  }

  return rows.sort((a, b) => b.volume - a.volume || a.service.localeCompare(b.service))
}

function groupCount(rows, field) {
  return rows.reduce((acc, row) => {
    acc[row[field]] = (acc[row[field]] || 0) + 1
    return acc
  }, {})
}

function writeCsv(filePath, rows, header) {
  fs.writeFileSync(filePath, [header.join(','), ...rows.map((row) => header.map((field) => csvEscape(row[field])).join(','))].join('\n'))
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(' |')} |`
  const divider = `| ${columns.map(() => '---').join(' |')} |`
  const body = rows.map((row) => `| ${columns.map((column) => String(row[column.key] ?? '').replace(/\|/g, '/')).join(' |')} |`)
  return [header, divider, ...body].join('\n')
}

function writeReport(clusters, commercial) {
  const byService = Object.entries(groupCount(clusters, 'service')).map(([service, count]) => ({
    service: SERVICE_LABELS[service] || service,
    clusters: count,
    backlog: clusters.filter((row) => row.service === service && row.status === 'backlog').length,
    alreadyCreated: clusters.filter((row) => row.service === service && row.status === 'already-created').length,
    commercialKeywords: commercial.filter((row) => row.service === service).length,
  }))

  const byPriority = Object.entries(groupCount(clusters, 'priority')).map(([priorityName, count]) => ({
    priority: priorityName,
    clusters: count,
  }))

  const top = clusters.slice(0, 20).map((row) => ({
    service: row.serviceLabel,
    priority: row.priority,
    title: row.proposedTitle,
    primary: row.primaryKeyword,
    volume: row.totalVolume,
    owner: row.owner,
  }))

  const commercialGroups = Object.values(commercial.reduce((acc, row) => {
    const key = `${row.service}|${row.target}|${row.owner}`
    const group = acc[key] || {
      service: row.serviceLabel,
      target: row.target,
      owner: row.owner,
      keywords: 0,
      totalVolume: 0,
      examples: [],
    }

    group.keywords += 1
    group.totalVolume += Number(row.volume || 0)
    if (group.examples.length < 5) group.examples.push(row.keyword)
    acc[key] = group
    return acc
  }, {})).sort((a, b) => b.keywords - a.keywords || b.totalVolume - a.totalVolume)

  const md = [
    '# Blog master backlog',
    '',
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Summary',
    '',
    `- Article clusters: ${clusters.length}`,
    `- Backlog clusters not yet created: ${clusters.filter((row) => row.status === 'backlog').length}`,
    `- Already-created / matched clusters: ${clusters.filter((row) => row.status === 'already-created').length}`,
    `- Commercial spillover keywords: ${commercial.length}`,
    '',
    '## By service',
    '',
    markdownTable(byService, [
      { key: 'service', label: 'Service' },
      { key: 'clusters', label: 'Article clusters' },
      { key: 'backlog', label: 'Backlog' },
      { key: 'alreadyCreated', label: 'Already created' },
      { key: 'commercialKeywords', label: 'Commercial keywords' },
    ]),
    '',
    '## By priority',
    '',
    markdownTable(byPriority, [
      { key: 'priority', label: 'Priority' },
      { key: 'clusters', label: 'Clusters' },
    ]),
    '',
    '## Top article opportunities',
    '',
    markdownTable(top, [
      { key: 'service', label: 'Service' },
      { key: 'priority', label: 'Priority' },
      { key: 'title', label: 'Proposed title' },
      { key: 'primary', label: 'Primary keyword' },
      { key: 'volume', label: 'Volume' },
      { key: 'owner', label: 'Commercial owner' },
    ]),
    '',
    '## Commercial spillover groups',
    '',
    markdownTable(commercialGroups, [
      { key: 'service', label: 'Service' },
      { key: 'target', label: 'Target' },
      { key: 'owner', label: 'Owner' },
      { key: 'keywords', label: 'Keywords' },
      { key: 'totalVolume', label: 'Total volume' },
      { key: 'examples', label: 'Examples' },
    ]),
    '',
    '## Production rules',
    '',
    '- Articles are written from approved semantic clusters only.',
    '- New articles are indexable by default; no more noindex backlog unless explicitly requested.',
    '- Text length is driven by cluster depth, keyword coverage, spam/water checks and usefulness, not by forcing every article to the same word count.',
    '- Standard informational article: 900-1400 words.',
    '- Large informational article: 1400-2000 words when the cluster has broad demand, safety risk or many sub-intents.',
    '- Every article must pass Text.ru and Copyscape checks before publication.',
  ].join('\n')

  fs.writeFileSync(REPORT_PATH, md)
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) throw new Error(`Missing directory: ${BLOG_DIR}`)

  const clusters = readClusters()
  const commercial = readCommercialBacklog()

  fs.writeFileSync(`${OUT_BASE}.json`, JSON.stringify({ generatedAt: new Date().toISOString(), clusters, commercial }, null, 2))
  writeCsv(`${OUT_BASE}.csv`, clusters, [
    'service',
    'serviceLabel',
    'status',
    'priority',
    'textLengthRule',
    'clusterId',
    'target',
    'owner',
    'proposedSlug',
    'proposedTitle',
    'primaryKeyword',
    'totalVolume',
    'keywordCount',
    'flags',
    'approvedKeywords',
  ])
  writeCsv(`${OUT_BASE}-commercial.csv`, commercial, [
    'service',
    'serviceLabel',
    'target',
    'owner',
    'keyword',
    'volume',
    'cpc',
    'competition',
    'seed',
    'qualityFlags',
  ])
  writeReport(clusters, commercial)

  console.log(`Master backlog JSON: ${path.relative(process.cwd(), `${OUT_BASE}.json`)}`)
  console.log(`Master backlog CSV: ${path.relative(process.cwd(), `${OUT_BASE}.csv`)}`)
  console.log(`Commercial backlog CSV: ${path.relative(process.cwd(), `${OUT_BASE}-commercial.csv`)}`)
  console.log(`Report: ${path.relative(process.cwd(), REPORT_PATH)}`)
  console.log(JSON.stringify({
    articleClusters: clusters.length,
    backlogClusters: clusters.filter((row) => row.status === 'backlog').length,
    alreadyCreated: clusters.filter((row) => row.status === 'already-created').length,
    commercialKeywords: commercial.length,
    priorities: groupCount(clusters, 'priority'),
    services: groupCount(clusters, 'service'),
  }, null, 2))
}

main()
