#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type Finding = {
  severity: 'error' | 'warn' | 'info'
  route: string
  message: string
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const SITE_URL = 'https://reparar24.es'
const MOJIBAKE_PATTERN = /[\u0402\u0407\uFFFD]|[\u00C2][\u00A0-\u00BF]|(?:\u0413[\u00A0-\u045F])|(?:\u0432\u201A\u00AC)/
const LEGAL_ROUTES = new Set(['/cookies', '/privacidad', '/terminos'])
const TITLE_WARN_MAX = 70
const DESCRIPTION_WARN_MIN = 100
const DESCRIPTION_WARN_MAX = 160

const findings: Finding[] = []

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: any) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(HTML_ROOT, filePath).replace(/\\/g, '/')

  if (relative === 'es.html') return '/'
  if (!relative.startsWith('es/')) return `/${relative.replace(/\.html$/, '')}`

  return `/${relative.slice(3).replace(/\.html$/, '')}`
}

function getFirstMatch(source: string, pattern: RegExp): string | undefined {
  const match = source.match(pattern)
  return match?.[1] ? decodeHtml(match[1].trim()) : undefined
}

function getAllMatches(source: string, pattern: RegExp): string[] {
  return Array.from(source.matchAll(pattern)).map((match) => decodeHtml(match[1] ?? '').trim())
}

function add(severity: Finding['severity'], route: string, message: string) {
  findings.push({ severity, route, message })
}

function auditJsonLd(route: string, html: string) {
  if (LEGAL_ROUTES.has(route)) return

  const scripts = getAllMatches(
    html,
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g
  )

  if (!scripts.length) {
    add('warn', route, 'missing JSON-LD schema')
    return
  }

  scripts.forEach((script, index) => {
    try {
      JSON.parse(script)
    } catch (error) {
      add('error', route, `invalid JSON-LD script #${index + 1}`)
    }
  })
}

function auditImages(route: string, html: string) {
  const images = html.match(/<img\b[^>]*>/g) ?? []
  const missingAlt = images.filter((img) => !/\salt=("|')[\s\S]*?\1/.test(img))
  const emptyAlt = images.filter((img) => /\salt=("|')\s*\1/.test(img))

  if (missingAlt.length) add('error', route, `${missingAlt.length} image(s) without alt`)
  if (emptyAlt.length) add('warn', route, `${emptyAlt.length} image(s) with empty alt`)
}

function auditPage(filePath: string) {
  const route = routeFromHtmlPath(filePath)

  if (route.includes('_not-found')) return

  const html = fs.readFileSync(filePath, 'utf8')
  const title = getFirstMatch(html, /<title>([\s\S]*?)<\/title>/)
  const description = getFirstMatch(
    html,
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/
  )
  const canonical = getFirstMatch(
    html,
    /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["'][^>]*>/
  )
  const h1s = getAllMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g).map(stripTags)

  if (!title) add('error', route, 'missing title')
  else {
    if (title.length < 25) add('warn', route, `short title (${title.length} chars)`)
    if (title.length > TITLE_WARN_MAX) add('warn', route, `long title (${title.length} chars)`)
    if (MOJIBAKE_PATTERN.test(title)) add('error', route, 'title contains mojibake')
  }

  if (!description) add('error', route, 'missing meta description')
  else {
    if (description.length < DESCRIPTION_WARN_MIN) add('warn', route, `short description (${description.length} chars)`)
    if (description.length > DESCRIPTION_WARN_MAX) add('warn', route, `long description (${description.length} chars)`)
    if (MOJIBAKE_PATTERN.test(description)) add('error', route, 'description contains mojibake')
  }

  if (!canonical) {
    add('error', route, 'missing canonical')
  } else {
    const expected = `${SITE_URL}${route === '/' ? '' : route}`
    if (canonical !== expected) add('warn', route, `canonical ${canonical} differs from expected ${expected}`)
  }

  if (h1s.length !== 1) add('error', route, `expected 1 H1, found ${h1s.length}`)
  if (h1s.some((h1) => MOJIBAKE_PATTERN.test(h1))) add('error', route, 'H1 contains mojibake')

  if (MOJIBAKE_PATTERN.test(html)) add('warn', route, 'HTML contains possible mojibake markers')

  auditJsonLd(route, html)
  auditImages(route, html)
}

function printFindings() {
  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Rendered SEO audit')
  console.log('==================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!grouped[severity].length) continue

    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of grouped[severity].slice(0, 80)) {
      console.log(`- ${finding.route}: ${finding.message}`)
    }

    if (grouped[severity].length > 80) {
      console.log(`- ... ${grouped[severity].length - 80} more`)
    }
  }

  const pageCount = walk(HTML_ROOT).filter((filePath) => filePath.endsWith('.html')).length
  console.log(
    `\nSummary: ${pageCount} HTML files, ${grouped.error.length} errors, ${grouped.warn.length} warnings`
  )

  if (grouped.error.length > 0) process.exitCode = 1
}

if (!fs.existsSync(HTML_ROOT)) {
  console.error('Missing .next/server/app. Run npm run build first.')
  process.exit(1)
}

walk(HTML_ROOT)
  .filter((filePath) => filePath.endsWith('.html'))
  .forEach(auditPage)

printFindings()
