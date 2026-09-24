#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type Finding = {
  severity: 'error' | 'warn' | 'info'
  area: string
  message: string
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const SITEMAP_BODY_PATH = path.join(ROOT, '.next', 'server', 'app', 'sitemap.xml.body')
const SITE_URL = 'https://reparar24.es'
const SERVICE_SLUGS = [
  'fontanero',
  'electricista',
  'desatascos',
  'aire-acondicionado',
  'calefaccion',
  'limpieza-tuberias',
]
const EXPECTED_LOW_LINK_ROUTES = new Set(['/cookies', '/privacidad', '/terminos'])
const IGNORED_INTERNAL_PREFIXES = [
  '/_next/',
  '/api/',
  '/icon',
  '/apple-icon',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
]

const findings: Finding[] = []

function add(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: any) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(HTML_ROOT, filePath).replace(/\\/g, '/')

  if (relative === 'es.html') return '/'
  if (!relative.startsWith('es/')) return `/${relative.replace(/\.html$/, '')}`

  return `/${relative.slice(3).replace(/\.html$/, '')}`
}

function normalizeInternalHref(rawHref: string): string | null {
  if (!rawHref) return null
  if (rawHref.startsWith('#')) return null
  if (/^(tel|mailto|sms|whatsapp):/i.test(rawHref)) return null
  if (rawHref.startsWith('https://wa.me/')) return null

  let href = rawHref

  if (href.startsWith(SITE_URL)) {
    href = href.slice(SITE_URL.length) || '/'
  } else if (/^https?:\/\//i.test(href)) {
    return null
  }

  href = href.split('#')[0].split('?')[0]
  if (!href.startsWith('/')) return null
  if (href.length > 1) href = href.replace(/\/$/, '')

  if (IGNORED_INTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix))) return null

  return href || '/'
}

function extractHrefs(html: string): string[] {
  return Array.from(html.matchAll(/<a\b[^>]*\shref=["']([^"']+)["'][^>]*>/g))
    .map((match) => normalizeInternalHref(match[1]))
    .filter(Boolean) as string[]
}

function extractSitemapRoutes(): Set<string> {
  if (!fs.existsSync(SITEMAP_BODY_PATH)) {
    add('error', 'sitemap', 'missing generated sitemap; run npm run build first')
    return new Set()
  }

  const source = fs.readFileSync(SITEMAP_BODY_PATH, 'utf8')
  return new Set(
    Array.from(source.matchAll(/<loc>([^<]+)<\/loc>/g) as Iterable<RegExpMatchArray>)
      .map((match) => match[1])
      .filter((url) => url.startsWith(SITE_URL))
      .map((url) => url.slice(SITE_URL.length) || '/')
  )
}

function auditInternalLinking() {
  if (!fs.existsSync(HTML_ROOT)) {
    add('error', 'html', 'missing .next/server/app; run npm run build first')
    return
  }

  const sitemapRoutes = extractSitemapRoutes()
  const htmlFiles = walk(HTML_ROOT).filter((filePath) => filePath.endsWith('.html'))
  const existingRoutes = new Set<string>()
  const incoming = new Map<string, Set<string>>()
  const linksBySource = new Map<string, Set<string>>()

  for (const route of sitemapRoutes) {
    incoming.set(route, new Set())
  }

  for (const filePath of htmlFiles) {
    const route = routeFromHtmlPath(filePath)
    if (route.includes('_not-found')) continue

    existingRoutes.add(route)
    const html = fs.readFileSync(filePath, 'utf8')
    const hrefs = extractHrefs(html)
    linksBySource.set(route, new Set(hrefs))

    for (const href of hrefs) {
      if (!incoming.has(href)) incoming.set(href, new Set())
      incoming.get(href)?.add(route)
    }
  }

  const sitemapMissingHtml = Array.from(sitemapRoutes).filter((route) => !existingRoutes.has(route))
  const htmlMissingSitemap = Array.from(existingRoutes).filter((route) => !sitemapRoutes.has(route) && !EXPECTED_LOW_LINK_ROUTES.has(route))
  const brokenLinks: string[] = []
  const localizedLinks: string[] = []
  const valenciaRedirectLinks: string[] = []

  for (const [source, hrefs] of linksBySource.entries()) {
    for (const href of hrefs) {
      if (/^\/(?:es|en|ru)(?:\/|$)/.test(href)) localizedLinks.push(`${source} -> ${href}`)

      if (SERVICE_SLUGS.some((serviceSlug) => href === `/${serviceSlug}/valencia`)) {
        valenciaRedirectLinks.push(`${source} -> ${href}`)
      }

      if (!sitemapRoutes.has(href) && !existingRoutes.has(href) && !EXPECTED_LOW_LINK_ROUTES.has(href)) {
        brokenLinks.push(`${source} -> ${href}`)
      }
    }
  }

  const orphanRoutes = Array.from(sitemapRoutes).filter((route) => {
    if (route === '/') return false
    if (EXPECTED_LOW_LINK_ROUTES.has(route)) return false
    return (incoming.get(route)?.size ?? 0) === 0
  })

  const lowIncomingRoutes = Array.from(sitemapRoutes)
    .filter((route) => !EXPECTED_LOW_LINK_ROUTES.has(route))
    .filter((route) => route !== '/')
    .filter((route) => (incoming.get(route)?.size ?? 0) > 0 && (incoming.get(route)?.size ?? 0) < 2)

  if (sitemapMissingHtml.length) add('error', 'coverage', `sitemap URLs missing rendered HTML: ${sitemapMissingHtml.slice(0, 20).join(', ')}`)
  if (htmlMissingSitemap.length) add('warn', 'coverage', `rendered routes not in sitemap: ${htmlMissingSitemap.slice(0, 20).join(', ')}`)
  if (brokenLinks.length) add('error', 'links', `broken internal links: ${brokenLinks.slice(0, 30).join('; ')}`)
  if (localizedLinks.length) add('error', 'links', `localized internal links found: ${localizedLinks.slice(0, 30).join('; ')}`)
  if (valenciaRedirectLinks.length) add('error', 'links', `links point to redirected Valencia service-city URLs: ${valenciaRedirectLinks.slice(0, 30).join('; ')}`)
  if (orphanRoutes.length) add('warn', 'orphan-pages', `sitemap routes with no internal incoming links: ${orphanRoutes.slice(0, 40).join(', ')}`)
  if (lowIncomingRoutes.length) add('info', 'link-depth', `${lowIncomingRoutes.length} sitemap routes have only one internal incoming link`)

  add('info', 'coverage', `${existingRoutes.size} rendered routes checked against ${sitemapRoutes.size} sitemap URLs`)
  add('info', 'links', `${Array.from(linksBySource.values()).reduce((sum, links) => sum + links.size, 0)} unique source links checked`)
}

function printFindings() {
  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Internal linking audit')
  console.log('======================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!grouped[severity].length) continue

    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of grouped[severity]) {
      console.log(`- [${finding.area}] ${finding.message}`)
    }
  }

  console.log(`\nSummary: ${grouped.error.length} errors, ${grouped.warn.length} warnings`)

  if (grouped.error.length > 0) process.exitCode = 1
}

auditInternalLinking()
printFindings()
