require('dotenv').config({ path: '.env.local', quiet: true })
const fs = require('fs')
const path = require('path')
const { BLOG_ARTICLE_BRIEFS } = require('../../data/blog/topics')
const { BLOG_CATEGORIES } = require('../../data/blog/topics')
const { getBlogCategorySeo } = require('../../data/blog/category-seo')

type Scope = 'blog' | 'blog-category' | 'commercial' | 'all'

interface CheckTarget {
  id: string
  route: string
  kind: 'blog' | 'commercial'
  status?: string
  indexing?: string
  text: string
}

interface CopyscapeResult {
  target: CheckTarget
  skipped?: string
  ok?: boolean
  cost?: string
  count?: number
  percentMatched?: number
  wordsMatched?: number
  viewUrl?: string
  error?: string
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const OUTPUT_DIR = path.join(ROOT, '.tmp', 'uniqueness')
const USERNAME = process.env.COPYSCAPE_USERNAME
const API_KEY = process.env.COPYSCAPE_API_KEY
const API_URL = process.env.COPYSCAPE_API_URL || 'https://www.copyscape.com/api/'
const MAX_PERCENT_MATCHED = Number(process.env.COPYSCAPE_MAX_PERCENT_MATCHED ?? '0')
const FULL_COMPARISONS = Number(process.env.COPYSCAPE_FULL_COMPARISONS ?? '3')
const IGNORE_DOMAINS = process.env.COPYSCAPE_IGNORE_DOMAINS || 'reparar24.es,www.reparar24.es'

const args = process.argv.slice(2)
const execute = args.includes('--execute')
const scope = getArgValue('--scope', 'blog') as Scope
const limit = Number(getArgValue('--limit', '10'))
const offset = Number(getArgValue('--offset', '0'))
const includeDrafts = args.includes('--include-drafts')
const ids = getArgValue('--ids', '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean)

function getArgValue(name: string, fallback: string): string {
  const inline = args.find((arg) => arg.startsWith(`${name}=`))
  if (inline) return inline.split('=').slice(1).join('=')

  const index = args.indexOf(name)
  if (index >= 0 && args[index + 1]) return args[index + 1]

  return fallback
}

function stripTags(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function getAllMatches(source: string, pattern: RegExp): string[] {
  return Array.from(source.matchAll(pattern)).map((match) => stripTags(match[1] ?? '')).filter(Boolean)
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(HTML_ROOT, filePath).replace(/\\/g, '/')

  if (relative === 'es.html') return '/'
  if (!relative.startsWith('es/')) return `/${relative.replace(/\.html$/, '')}`

  return `/${relative.slice(3).replace(/\.html$/, '')}`
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: any) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function blogText(article: any): string {
  const body = article.bodySections?.flatMap((section: any) => [section.heading, ...section.paragraphs]) ?? []
  const faq = article.faq?.flatMap((item: any) => [item.question, item.answer]) ?? []

  return [
    article.h1,
    article.description,
    article.llmAnswer,
    ...article.outline,
    ...body,
    ...faq,
  ]
    .join('\n\n')
    .replace(/\s+/g, ' ')
    .trim()
}

function collectBlogTargets(): CheckTarget[] {
  return BLOG_ARTICLE_BRIEFS
    .filter((article: any) => includeDrafts || ['ready', 'published'].includes(article.status))
    .map((article: any) => ({
      id: `${article.categorySlug}/${article.slug}`,
      route: `/blog/${article.categorySlug}/${article.slug}`,
      kind: 'blog' as const,
      status: article.status,
      indexing: article.indexing,
      text: blogText(article),
    }))
}

function collectBlogCategoryTargets(): CheckTarget[] {
  return BLOG_CATEGORIES
    .map((category: any) => {
      const seo = getBlogCategorySeo(category.slug)
      if (!seo) return null

      return {
        id: `blog-category/${category.slug}`,
        route: `/blog/${category.slug}`,
        kind: 'blog' as const,
        status: 'published',
        indexing: 'index',
        text: [category.title, category.description, seo.heading, ...seo.paragraphs].join('\n\n'),
      }
    })
    .filter(Boolean) as CheckTarget[]
}

function collectCommercialTargets(): CheckTarget[] {
  if (!fs.existsSync(HTML_ROOT)) {
    throw new Error('Missing .next/server/app. Run npm run build before checking commercial pages.')
  }

  return walk(HTML_ROOT)
    .filter((filePath) => filePath.endsWith('.html'))
    .map((filePath) => {
      const route = routeFromHtmlPath(filePath)
      const html = fs.readFileSync(filePath, 'utf8')
      const h1s = getAllMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g)
      const h2s = getAllMatches(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/g)
      const paragraphs = getAllMatches(html, /<p\b[^>]*>([\s\S]*?)<\/p>/g)
        .filter((text) => text.length > 60)
        .filter((text) => !/cookies|politica de privacidad/i.test(text))

      return {
        id: route,
        route,
        kind: 'commercial' as const,
        text: [...h1s, ...h2s, ...paragraphs].join('\n\n'),
      }
    })
    .filter((target) => target.route.startsWith('/'))
    .filter((target) => !target.route.includes('/blog'))
    .filter((target) => !['/cookies', '/privacidad', '/terminos'].includes(target.route))
    .filter((target) => target.text.length >= 700)
}

function collectTargets(): CheckTarget[] {
  const targets: CheckTarget[] = []

  if (scope === 'blog' || scope === 'all') targets.push(...collectBlogTargets())
  if (scope === 'blog-category' || scope === 'all') targets.push(...collectBlogCategoryTargets())
  if (scope === 'commercial' || scope === 'all') targets.push(...collectCommercialTargets())

  const filteredTargets = ids.length > 0 ? targets.filter((target) => ids.includes(target.id)) : targets

  return filteredTargets.slice(offset, offset + limit)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function checkWithCopyscape(target: CheckTarget): Promise<CopyscapeResult> {
  if (target.text.length < 700) {
    return { target, skipped: `text too short for reliable external check (${target.text.length} chars)` }
  }

  if (!execute) {
    return { target, skipped: 'dry-run' }
  }

  if (!USERNAME || !API_KEY) {
    throw new Error('Missing COPYSCAPE_USERNAME or COPYSCAPE_API_KEY in environment.')
  }

  const body = new URLSearchParams({
    u: USERNAME,
    k: API_KEY,
    o: 'csearch',
    e: 'UTF-8',
    t: target.text,
    c: String(FULL_COMPARISONS),
    f: 'json',
    i: IGNORE_DOMAINS,
  })

  let response: Response | null = null
  let raw = ''

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body,
      })
      raw = await response.text()
      break
    } catch (error) {
      if (attempt === 3) {
        return {
          target,
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        }
      }

      await sleep(1200 * attempt)
    }
  }

  if (!response) {
    return { target, ok: false, error: 'No response from Copyscape' }
  }

  if (!response.ok) {
    return { target, ok: false, error: `HTTP ${response.status}` }
  }

  let data: any
  try {
    data = JSON.parse(raw)
  } catch {
    return { target, ok: false, error: 'Copyscape returned non-JSON response' }
  }

  if (data.error) {
    return { target, ok: false, error: String(data.error) }
  }

  const percentMatched = Number(data.allpercentmatched ?? 0)
  const result: CopyscapeResult = {
    target,
    ok: percentMatched <= MAX_PERCENT_MATCHED,
    cost: data.cost,
    count: Number(data.count ?? 0),
    percentMatched,
    wordsMatched: Number(data.allwordsmatched ?? 0),
    viewUrl: data.allviewurl,
  }

  return result
}

async function main() {
  if (!['blog', 'blog-category', 'commercial', 'all'].includes(scope)) {
    throw new Error('Use --scope blog|blog-category|commercial|all')
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error('Use --limit=N with positive integer')
  }

  const targets = collectTargets()
  const results: CopyscapeResult[] = []

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log(`Copyscape uniqueness check: ${execute ? 'execute' : 'dry-run'}`)
  console.log(`Scope: ${scope}`)
  if (ids.length > 0) console.log(`IDs: ${ids.join(', ')}`)
  console.log(`Offset: ${offset}`)
  console.log(`Targets: ${targets.length}`)
  console.log(`Max percent matched: ${MAX_PERCENT_MATCHED}`)

  for (const target of targets) {
    const result = await checkWithCopyscape(target)
    results.push(result)
    const status = result.skipped ? 'SKIP' : result.ok ? 'PASS' : 'FAIL'
    const detail = result.skipped ?? `${result.percentMatched ?? '?'}% matched`
    console.log(`- ${status} ${target.route}: ${detail}`)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    provider: 'copyscape',
    mode: execute ? 'execute' : 'dry-run',
    scope,
    ids,
    offset,
    maxPercentMatched: MAX_PERCENT_MATCHED,
    fullComparisons: FULL_COMPARISONS,
    results,
  }

  const outputFile = path.join(
    OUTPUT_DIR,
    `copyscape-${scope}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  )
  fs.writeFileSync(outputFile, JSON.stringify(report, null, 2))
  console.log(`Report: ${path.relative(ROOT, outputFile)}`)

  if (results.some((result) => result.ok === false)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
