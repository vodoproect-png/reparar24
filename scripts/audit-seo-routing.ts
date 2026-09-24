#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type Finding = {
  severity: 'error' | 'warn' | 'info'
  area: string
  message: string
}

const ROOT = process.cwd()
const SITE_URL = 'https://reparar24.es'
const SITEMAP_BODY_PATH = path.join(ROOT, '.next', 'server', 'app', 'sitemap.xml.body')
const SERVICE_SLUGS = [
  'fontanero',
  'electricista',
  'desatascos',
  'aire-acondicionado',
  'calefaccion',
  'limpieza-tuberias',
]

const findings: Finding[] = []

function add(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function readSource(relativePath: string): string {
  const fullPath = path.join(ROOT, relativePath)

  if (!fs.existsSync(fullPath)) {
    add('error', 'source', `missing ${relativePath}`)
    return ''
  }

  return fs.readFileSync(fullPath, 'utf8')
}

function extractSitemapUrls(source: string): string[] {
  return Array.from(source.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1])
}

function auditSitemap() {
  if (!fs.existsSync(SITEMAP_BODY_PATH)) {
    add('error', 'sitemap', 'missing generated sitemap; run npm run build first')
    return
  }

  const sitemapSource = fs.readFileSync(SITEMAP_BODY_PATH, 'utf8')
  const urls = extractSitemapUrls(sitemapSource)
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index)
  const nonProductionUrls = urls.filter((url) => !url.startsWith(SITE_URL))
  const localizedUrls = urls.filter((url) => /https:\/\/reparar24\.es\/(?:es|en|ru)(?:\/|$)/.test(url))
  const valenciaServiceUrls = SERVICE_SLUGS
    .map((serviceSlug) => `${SITE_URL}/${serviceSlug}/valencia`)
    .filter((url) => urls.includes(url))

  if (!urls.length) add('error', 'sitemap', 'no URLs found in generated sitemap')
  else add('info', 'sitemap', `${urls.length} canonical URLs`)

  if (duplicateUrls.length) {
    add('error', 'sitemap', `duplicate URLs: ${Array.from(new Set(duplicateUrls)).slice(0, 10).join(', ')}`)
  }

  if (nonProductionUrls.length) {
    add('error', 'sitemap', `non-production URLs: ${nonProductionUrls.slice(0, 10).join(', ')}`)
  }

  if (localizedUrls.length) {
    add('error', 'sitemap', `localized URLs should not be indexable: ${localizedUrls.slice(0, 10).join(', ')}`)
  }

  if (valenciaServiceUrls.length) {
    add('error', 'sitemap', `Valencia service-city URLs must redirect, not index: ${valenciaServiceUrls.join(', ')}`)
  }

  for (const serviceSlug of SERVICE_SLUGS) {
    const serviceUrl = `${SITE_URL}/${serviceSlug}`

    if (!urls.includes(serviceUrl)) {
      add('error', 'sitemap', `missing service hub ${serviceUrl}`)
    }
  }
}

function auditRedirects() {
  const nextConfig = readSource('next.config.js')

  for (const serviceSlug of SERVICE_SLUGS) {
    const rootRule = `source: \`/\${serviceSlug}/valencia\``
    const localeRule = `source: \`/es/\${serviceSlug}/valencia\``

    if (!nextConfig.includes(rootRule) || !nextConfig.includes(localeRule)) {
      add('error', 'redirects', `missing Valencia redirect template for ${serviceSlug}`)
    }
  }

  add('info', 'redirects', `${SERVICE_SLUGS.length} Valencia service-city redirects are configured`)
}

function auditRobotsSource() {
  const robotsSource = readSource('app/robots.ts')

  const requiredSnippets = [
    "allow: '/'",
    "'/api/'",
    "'/admin/'",
    'sitemap:',
    'PRODUCTION_URL',
  ]

  for (const snippet of requiredSnippets) {
    if (!robotsSource.includes(snippet)) {
      add('error', 'robots', `missing robots source directive: ${snippet}`)
    }
  }

  add('info', 'robots', 'production robots and preview lockdown are declared in source')
}

function auditMiddlewareSource() {
  const middlewareSource = readSource('middleware.ts')

  const requiredSnippets = [
    "hostname.endsWith('.vercel.app')",
    "'X-Robots-Tag'",
    "pathname === '/sitemap.xml'",
    "pathname === '/robots.txt'",
    "pathname.startsWith('/en/')",
    "pathname.startsWith('/ru/')",
    "has: [{ type: 'header', key: 'host', value: '.*\\\\.vercel\\\\.app' }]",
    "'/es/:path*'",
  ]

  for (const snippet of requiredSnippets) {
    if (!middlewareSource.includes(snippet)) {
      add('error', 'middleware', `missing middleware SEO guard: ${snippet}`)
    }
  }

  add('info', 'middleware', 'preview lockdown and locale rollback are configured')
}

function auditRewriteSource() {
  const nextConfig = readSource('next.config.js')

  const requiredSnippets = [
    'async rewrites()',
    "source: '/'",
    "destination: '/es'",
    'source: `/${serviceSlug}/:path*`',
    'destination: `/es/${serviceSlug}/:path*`',
    "source: '/blog/:path*'",
    "destination: '/es/blog/:path*'",
    "source: '/servicios/:path*'",
    "destination: '/es/servicios/:path*'",
    "source: '/contacto'",
    "destination: '/es/contacto'",
  ]

  for (const snippet of requiredSnippets) {
    if (!nextConfig.includes(snippet)) {
      add('error', 'rewrites', `missing static Spanish rewrite: ${snippet}`)
    }
  }

  add('info', 'rewrites', 'public Spanish routes are served through Next.js static rewrites')
}

function printFindings() {
  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('SEO routing audit')
  console.log('=================')

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

auditSitemap()
auditRedirects()
auditRobotsSource()
auditMiddlewareSource()
auditRewriteSource()
printFindings()
