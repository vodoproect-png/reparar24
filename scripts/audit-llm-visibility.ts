import fs from 'fs'
import path from 'path'

type JsonLdNode = Record<string, unknown>

interface PageAudit {
  path: string
  score: number
  jsonLdCount: number
  schemaTypes: string[]
  h1Count: number
  h2Count: number
  textLength: number
  issues: string[]
  warnings: string[]
}

const SITE_BUILD_DIR = path.join(process.cwd(), '.next', 'server', 'app')
const OUTPUT_DIR = path.join(process.cwd(), '.tmp', 'llm')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'llm-visibility-audit.json')

const REQUIRED_GLOBAL_TYPES = ['Organization', 'WebSite']
const REQUIRED_PAGE_TYPES = ['BreadcrumbList']
const SERVICE_ROUTE_RE = /^\/(?:fontanero|electricista|desatascos|aire-acondicionado|calefaccion|limpieza-tuberias)(?:\/|$)/
const MOJIBAKE_RE = /Г|Р|в‚|Вї|ВЎ|пё|рџ/

function walkHtmlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return walkHtmlFiles(fullPath)
    }

    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : []
  })
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(SITE_BUILD_DIR, filePath).replace(/\\/g, '/')
  const withoutHtml = relative.replace(/\/?index\.html$/, '').replace(/\.html$/, '')
  const route = withoutHtml === '' ? '/' : `/${withoutHtml}`

  return route.replace(/^\/es(?=\/|$)/, '') || '/'
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
}

function stripHtml(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function extractHeadingCount(html: string, tag: 'h1' | 'h2') {
  return (html.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length
}

function extractJsonLd(html: string) {
  const nodes: JsonLdNode[] = []
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match: RegExpExecArray | null

  while ((match = regex.exec(html)) !== null) {
    const raw = decodeHtmlEntities(match[1]).trim()

    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        nodes.push(...parsed.filter((item) => item && typeof item === 'object'))
      } else if (parsed && typeof parsed === 'object') {
        nodes.push(parsed)
      }
    } catch {
      nodes.push({ __parseError: raw.slice(0, 120) })
    }
  }

  return nodes
}

function normalizeTypes(nodes: JsonLdNode[]) {
  return Array.from(
    new Set(
      nodes.flatMap((node) => {
        const type = node['@type']
        return Array.isArray(type) ? type.map(String) : type ? [String(type)] : []
      })
    )
  ).sort()
}

function hasSchemaType(types: string[], expected: string) {
  return types.includes(expected)
}

function auditPage(filePath: string): PageAudit {
  const html = fs.readFileSync(filePath, 'utf8')
  const route = routeFromHtmlPath(filePath)
  const text = stripHtml(html)
  const nodes = extractJsonLd(html)
  const types = normalizeTypes(nodes)
  const issues: string[] = []
  const warnings: string[] = []

  if (nodes.some((node) => node.__parseError)) {
    issues.push('JSON-LD parse error')
  }

  for (const type of REQUIRED_GLOBAL_TYPES) {
    if (!hasSchemaType(types, type)) {
      issues.push(`Missing global ${type} schema`)
    }
  }

  for (const type of REQUIRED_PAGE_TYPES) {
    if (route !== '/' && !hasSchemaType(types, type)) {
      warnings.push(`Missing ${type} schema`)
    }
  }

  if (SERVICE_ROUTE_RE.test(route) && !hasSchemaType(types, 'Service')) {
    issues.push('Missing Service schema on service route')
  }

  if (route === '/' && !hasSchemaType(types, 'LocalBusiness')) {
    issues.push('Missing LocalBusiness schema on homepage')
  }

  if (html.includes('/buscar?q=')) {
    warnings.push('SearchAction references /buscar; keep disabled until search exists')
  }

  if (html.includes('facebook.com/reparar24') || html.includes('twitter.com/reparar24')) {
    warnings.push('Unverified sameAs social profile detected')
  }

  if (html.includes('logo.png')) {
    warnings.push('Structured data or markup references logo.png; prefer existing brand image')
  }

  if (MOJIBAKE_RE.test(text)) {
    warnings.push('Possible mojibake text detected')
  }

  const h1Count = extractHeadingCount(html, 'h1')
  const h2Count = extractHeadingCount(html, 'h2')

  if (h1Count !== 1) {
    warnings.push(`Expected one H1, found ${h1Count}`)
  }

  if (text.length < 1200) {
    warnings.push(`Thin rendered text for LLM extraction: ${text.length} chars`)
  }

  const appearsToHaveFaqContent =
    /Preguntas frecuentes|FAQ/i.test(text) ||
    /<details[\s>]/i.test(html)

  if (appearsToHaveFaqContent && !hasSchemaType(types, 'FAQPage')) {
    warnings.push('Rendered FAQ content without FAQPage schema')
  }

  const score = Math.max(0, 100 - issues.length * 18 - warnings.length * 5)

  return {
    path: route,
    score,
    jsonLdCount: nodes.length,
    schemaTypes: types,
    h1Count,
    h2Count,
    textLength: text.length,
    issues,
    warnings,
  }
}

function main() {
  const htmlFiles = walkHtmlFiles(SITE_BUILD_DIR)

  if (htmlFiles.length === 0) {
    console.error('No built HTML found. Run npm run build before audit:llm.')
    process.exit(1)
  }

  const pages = htmlFiles
    .map(auditPage)
    .filter((page) => !page.path.startsWith('/_'))
    .sort((a, b) => a.path.localeCompare(b.path))
  const issueCount = pages.reduce((sum, page) => sum + page.issues.length, 0)
  const warningCount = pages.reduce((sum, page) => sum + page.warnings.length, 0)
  const averageScore = Math.round(pages.reduce((sum, page) => sum + page.score, 0) / pages.length)
  const weakestPages = pages
    .filter((page) => page.issues.length || page.warnings.length)
    .sort((a, b) => a.score - b.score)
    .slice(0, 20)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        pagesAudited: pages.length,
        averageScore,
        issueCount,
        warningCount,
        weakestPages,
        pages,
      },
      null,
      2
    )
  )

  console.log(`LLM visibility audit complete: ${pages.length} pages`)
  console.log(`Average score: ${averageScore}/100`)
  console.log(`Issues: ${issueCount}`)
  console.log(`Warnings: ${warningCount}`)
  console.log(`Report: ${path.relative(process.cwd(), OUTPUT_FILE)}`)

  if (weakestPages.length > 0) {
    console.log('\nWeakest pages:')
    for (const page of weakestPages.slice(0, 10)) {
      console.log(`- ${page.path}: ${page.score}/100 (${page.issues.length} issues, ${page.warnings.length} warnings)`)
    }
  }

  if (issueCount > 0) {
    process.exit(1)
  }
}

main()
