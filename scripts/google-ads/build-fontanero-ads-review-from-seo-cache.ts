// @ts-nocheck
/**
 * Builds a manual Google Ads keyword review file from existing SEO semantics
 * and cached DataForSEO keyword-provider outputs. Read-only: no API calls.
 */

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const SEO_CSV = path.join(ROOT, 'docs', 'seo', 'exports', 'fontanero-seo-keywords-2026-06-22.csv')
const DFS_DIR = path.join(ROOT, '.tmp', 'keyword-providers', 'dataforseo')
const OUT_DIR = path.join(ROOT, 'docs', 'ads')
const OUT_CSV = path.join(OUT_DIR, 'fontanero-valencia-ads-keywords-from-seo-review-2026-06-24.csv')
const OUT_MD = path.join(OUT_DIR, 'fontanero-valencia-ads-keywords-from-seo-review-2026-06-24.md')

const CHILD_SLUGS = new Set([
  'reparacion-fugas',
  'desatascos',
  'instalaciones',
  'sustitucion-tuberias',
  'calentadores-termos',
  'mantenimiento',
  'cambio-banera-por-ducha',
  'reparacion-cisternas',
  'cambio-reparacion-grifos',
  'grupos-presion-agua',
  'descalcificadores-osmosis',
  'instalacion-cambio-inodoros',
  'instalacion-lavabos',
  'mamparas-ducha',
  'bajantes',
  'reparacion-duchas',
])

const LANDING_LABELS = {
  '/fontanero/reparacion-fugas': 'Reparacion fugas',
  '/fontanero/desatascos': 'Desatascos',
  '/fontanero/instalaciones': 'Instalaciones fontaneria',
  '/fontanero/sustitucion-tuberias': 'Sustitucion tuberias',
  '/fontanero/calentadores-termos': 'Calentadores termos',
  '/fontanero/mantenimiento': 'Mantenimiento fontaneria',
  '/fontanero/cambio-banera-por-ducha': 'Cambio banera por ducha',
  '/fontanero/reparacion-cisternas': 'Reparacion cisternas',
  '/fontanero/cambio-reparacion-grifos': 'Cambio reparacion grifos',
  '/fontanero/grupos-presion-agua': 'Grupos presion agua',
  '/fontanero/descalcificadores-osmosis': 'Descalcificadores osmosis',
  '/fontanero/instalacion-cambio-inodoros': 'Instalacion cambio inodoros',
  '/fontanero/instalacion-lavabos': 'Instalacion lavabos',
  '/fontanero/mamparas-ducha': 'Mamparas ducha',
  '/fontanero/bajantes': 'Bajantes',
  '/fontanero/reparacion-duchas': 'Reparacion duchas',
}

const ALLOWED_TYPES = new Set([
  'lockedPrimaryKw',
  'secondaryKw',
  'seoBlockKw',
  'keywordTags',
])

const BLOCK_PATTERNS = [
  /\bcomo\b/i,
  /\bc[oó]mo\b/i,
  /\bpor que\b/i,
  /\bpor qu[eé]\b/i,
  /\bque hacer\b/i,
  /\bqu[eé] hacer\b/i,
  /\bmanual\b/i,
  /\btutorial\b/i,
  /\bpdf\b/i,
  /\byoutube\b/i,
  /\bforo\b/i,
  /\bopiniones\b/i,
  /\bmejor\b/i,
  /\bmarca\b/i,
  /\bmedidas\b/i,
  /\brecambio/i,
  /\brepuesto/i,
  /\bbricolaje\b/i,
  /\bcaser[oa]\b/i,
  /\bcomprar\b/i,
  /\bventa\b/i,
  /\boferta\b/i,
  /\bamazon\b/i,
  /\bleroy\b/i,
  /\bwallapop\b/i,
  /\b24\s*horas\b/i,
  /\b24h\b/i,
  /\b\d+\s*litros\b/i,
  /\blitros\b/i,
]

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"'`´|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

function readDataForSeoMetrics() {
  const metrics = new Map()
  if (!fs.existsSync(DFS_DIR)) return metrics

  for (const file of fs.readdirSync(DFS_DIR).filter((name) => name.endsWith('.json'))) {
    const fullPath = path.join(DFS_DIR, file)
    let data
    try {
      data = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    } catch {
      continue
    }

    for (const item of data.keywords || []) {
      const keyword = item.keyword || ''
      const key = normalize(keyword)
      const volume = Number(item.volume || 0)
      if (!key || volume <= 0) continue
      const current = metrics.get(key)
      if (!current || volume > current.volume) {
        metrics.set(key, {
          keyword,
          volume,
          cpc: item.cpc ?? '',
          competition: item.competition ?? '',
          seed: item.seed || data.seed || '',
          sourceFile: path.relative(ROOT, fullPath),
        })
      }
    }
  }

  return metrics
}

function isChildLanding(page) {
  const match = String(page || '').match(/^\/fontanero\/([^/]+)$/)
  return Boolean(match && CHILD_SLUGS.has(match[1]))
}

function hasCommercialShape(keyword) {
  const key = normalize(keyword)
  if (!key) return false
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(key))) return false
  return true
}

function main() {
  const rows = readSeoRows()
  const metrics = readDataForSeoMetrics()
  const byKeyword = new Map()

  for (const row of rows) {
    if (!isChildLanding(row.page)) continue
    if (!ALLOWED_TYPES.has(row.type)) continue
    if (!hasCommercialShape(row.keyword)) continue

    const key = normalize(row.keyword)
    const metric = metrics.get(key)
    if (!metric || Number(metric.volume || 0) <= 0) continue

    const existing = byKeyword.get(key)
    const next = {
      decision: 'review',
      notes: '',
      group: LANDING_LABELS[row.page] || row.page.replace('/fontanero/', ''),
      landing: row.page,
      keyword: row.keyword,
      volume: metric.volume,
      cpc: metric.cpc,
      competition: metric.competition,
      seoType: row.type,
      seoSource: row.source,
      dataforseoSeed: metric.seed,
      dataforseoSource: metric.sourceFile,
      recommendedMatchTypes: 'EXACT + PHRASE',
    }

    if (!existing || Number(next.volume || 0) > Number(existing.volume || 0)) {
      byKeyword.set(key, next)
    }
  }

  const candidates = Array.from(byKeyword.values()).sort((a, b) => {
    const groupDiff = a.group.localeCompare(b.group, 'es')
    if (groupDiff !== 0) return groupDiff
    const volumeDiff = Number(b.volume || 0) - Number(a.volume || 0)
    if (volumeDiff !== 0) return volumeDiff
    return a.keyword.localeCompare(b.keyword, 'es')
  })

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const header = [
    'decision',
    'notes',
    'group',
    'landing',
    'keyword',
    'dataforseo_volume',
    'dataforseo_cpc',
    'dataforseo_competition',
    'seo_type',
    'seo_source',
    'dataforseo_seed',
    'dataforseo_source',
    'recommended_match_types',
  ]
  const csvRows = [header, ...candidates.map((item) => [
    item.decision,
    item.notes,
    item.group,
    item.landing,
    item.keyword,
    item.volume,
    item.cpc,
    item.competition,
    item.seoType,
    item.seoSource,
    item.dataforseoSeed,
    item.dataforseoSource,
    item.recommendedMatchTypes,
  ])]
  fs.writeFileSync(OUT_CSV, `${csvRows.map((row) => row.map(csvEscape).join(',')).join('\n')}\n`, 'utf8')

  const md = [
    '# Fontanero Valencia Ads Keywords From SEO Review',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Candidates: ${candidates.length}`,
    '',
    'Use `decision`: approve / reject / edit.',
    '',
  ]
  for (const [group, items] of Object.entries(Object.groupBy(candidates, (item) => item.group))) {
    md.push(`## ${group}`, '')
    md.push('| Decision | Keyword | Volume | CPC | Competition | Landing |')
    md.push('| --- | --- | ---: | ---: | ---: | --- |')
    for (const item of items) {
      md.push(`| ${item.decision} | ${item.keyword} | ${item.volume} | ${item.cpc} | ${item.competition} | ${item.landing} |`)
    }
    md.push('')
  }
  fs.writeFileSync(OUT_MD, `${md.join('\n')}\n`, 'utf8')

  console.log(`Candidates: ${candidates.length}`)
  console.log(`CSV: ${path.relative(ROOT, OUT_CSV)}`)
  console.log(`MD: ${path.relative(ROOT, OUT_MD)}`)
}

main()
