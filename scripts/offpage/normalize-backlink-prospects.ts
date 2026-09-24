#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type BacklinkItem = {
  domain_from?: string
  url_from?: string
  domain_from_rank?: number
  page_from_rank?: number
  rank?: number
  backlink_spam_score?: number
  page_from_external_links?: number
  page_from_language?: string
  domain_from_country?: string
  anchor?: string
  dofollow?: boolean
  page_from_title?: string
  url_from_status_code?: number
}

const ROOT = process.cwd()
const IN_DIR = path.join(ROOT, '.tmp', 'offpage', 'dataforseo-backlinks')
const OUT_DIR = path.join(ROOT, '.tmp', 'offpage')

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''))
}

function classifyType(item: BacklinkItem): string {
  const text = `${item.domain_from || ''} ${item.url_from || ''} ${item.page_from_title || ''}`.toLowerCase()

  if (/ayuntamiento|valencia|madrid|barcelona|local|guia|directorio|paginas/.test(text)) {
    return 'local_directory'
  }

  if (/blog|noticias|news|revista|hogar|casa|reforma|bricolaje/.test(text)) {
    return 'niche_blog'
  }

  if (/proveedor|material|ferreteria|suministro|instalador/.test(text)) {
    return 'supplier'
  }

  return 'competitor_backlink'
}

function inferServiceFocus(item: BacklinkItem): string[] {
  const text = `${item.url_from || ''} ${item.page_from_title || ''} ${item.anchor || ''}`.toLowerCase()
  const services = [
    ['fontanero', /fontaner|fuga|grifo|cisterna|termo/],
    ['electricista', /electric|cuadro|enchufe|boletin|averia electr/],
    ['desatascos', /desatasc|tuber|fregadero|wc|cuba|saneamiento/],
    ['aire-acondicionado', /aire|clima|split|conducto/],
    ['calefaccion', /caldera|radiador|calefaccion/],
    ['limpieza-tuberias', /limpieza.*tuber|bajante|arqueta|colector/],
  ]

  const matched = services
    .filter(([, pattern]) => (pattern as RegExp).test(text))
    .map(([service]) => service as string)

  return matched.length ? matched : ['brand']
}

function targetForServices(services: string[]): string {
  if (services.includes('fontanero')) return '/fontanero'
  if (services.includes('electricista')) return '/electricista'
  if (services.includes('desatascos')) return '/desatascos'
  if (services.includes('aire-acondicionado')) return '/aire-acondicionado'
  if (services.includes('calefaccion')) return '/calefaccion'
  if (services.includes('limpieza-tuberias')) return '/limpieza-tuberias'
  return '/'
}

function normalizeCountry(value?: string): string {
  if (!value || value === 'WW') return 'ES'
  return value.toUpperCase()
}

function normalizeLanguage(value?: string): string {
  if (!value || value === 'unknown') return 'es'
  return value.toLowerCase().slice(0, 2)
}

function backlinkItemsFromResponse(response: any): BacklinkItem[] {
  return (response.tasks || []).flatMap((task: any) =>
    (task.result || []).flatMap((result: any) => result.items || [])
  )
}

function main() {
  if (!fs.existsSync(IN_DIR)) {
    throw new Error(`No DataForSEO backlink directory found: ${path.relative(ROOT, IN_DIR)}`)
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const files = fs
    .readdirSync(IN_DIR)
    .filter((fileName: string) => fileName.endsWith('.json'))
    .filter((fileName: string) => !fileName.startsWith('preview-'))
    .filter((fileName: string) => !fileName.startsWith('summary-'))

  const byDomain = new Map<string, any>()

  for (const fileName of files) {
    const response = readJson(path.join(IN_DIR, fileName))
    for (const item of backlinkItemsFromResponse(response)) {
      if (!item.domain_from || !item.url_from) continue
      if (byDomain.has(item.domain_from)) continue

      const serviceFocus = inferServiceFocus(item)
      byDomain.set(item.domain_from, {
        id: `dfs-${item.domain_from}`.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase(),
        domain: item.domain_from,
        url: item.url_from,
        type: classifyType(item),
        country: normalizeCountry(item.domain_from_country),
        language: normalizeLanguage(item.page_from_language),
        serviceFocus,
        targetUrl: targetForServices(serviceFocus),
        preferredAnchorType: serviceFocus.includes('brand') ? 'brand' : 'partial_commercial',
        linkAttribute: typeof item.dofollow === 'boolean' ? (item.dofollow ? 'follow' : 'nofollow') : 'unknown',
        source: 'dataforseo',
        status: 'new',
        notes: `Found in competitor backlinks. Title: ${item.page_from_title || 'n/a'}`,
        metrics: {
          domainRank: item.domain_from_rank,
          organicTraffic: undefined,
          referringDomains: undefined,
          outboundLinks: item.page_from_external_links,
          spamSignals: item.backlink_spam_score,
        },
        raw: {
          rank: item.rank,
          pageRank: item.page_from_rank,
          anchor: item.anchor,
          statusCode: item.url_from_status_code,
        },
      })
    }
  }

  const prospects = Array.from(byDomain.values()).sort((a, b) => {
    const aRank = a.metrics.domainRank || 0
    const bRank = b.metrics.domainRank || 0
    return bRank - aRank
  })

  const outPath = path.join(OUT_DIR, 'backlink-prospect-candidates.json')
  fs.writeFileSync(
    outPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        sourceDir: path.relative(ROOT, IN_DIR),
        sourceFiles: files.length,
        total: prospects.length,
        prospects,
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  console.log('Backlink prospect normalization')
  console.log('================================')
  console.log(`Source files: ${files.length}`)
  console.log(`Prospects: ${prospects.length}`)
  console.log(`Saved: ${path.relative(ROOT, outPath)}`)
}

try {
  main()
} catch (error: any) {
  console.error(`Backlink normalization failed: ${error.message}`)
  process.exit(1)
}
