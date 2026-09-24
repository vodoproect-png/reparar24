#!/usr/bin/env ts-node

type Finding = {
  severity: 'error' | 'warn' | 'info'
  area: string
  message: string
}

const SITE_URL = 'https://reparar24.es'
const SERVICE_SLUGS = [
  'fontanero',
  'electricista',
  'desatascos',
  'aire-acondicionado',
  'calefaccion',
  'limpieza-tuberias',
]
const SAMPLE_PAGES = [
  '/',
  '/fontanero',
  '/electricista',
  '/desatascos',
  '/aire-acondicionado',
  '/calefaccion',
  '/limpieza-tuberias',
  '/servicios/madrid',
]

const findings: Finding[] = []

function add(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

async function fetchText(url: string, init?: RequestInit): Promise<{ status: number; url: string; text: string; headers: Headers }> {
  const response = await fetch(url, {
    redirect: 'manual',
    headers: {
      'user-agent': 'Reparar24ProductionAudit/1.0',
    },
    ...init,
  })

  return {
    status: response.status,
    url: response.url,
    text: await response.text(),
    headers: response.headers,
  }
}

function extractCanonical(html: string): string | undefined {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/)?.[1]
}

function extractTitle(html: string): string | undefined {
  return html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, ' ').trim()
}

async function auditRobots() {
  const robots = await fetchText(`${SITE_URL}/robots.txt`, { redirect: 'follow' })

  if (robots.status !== 200) {
    add('error', 'robots', `robots.txt returned ${robots.status}`)
    return
  }

  const required = ['Allow: /', 'Disallow: /api/', 'Disallow: /admin/', 'Sitemap: https://reparar24.es/sitemap.xml']

  for (const snippet of required) {
    if (!robots.text.includes(snippet)) add('error', 'robots', `missing directive: ${snippet}`)
  }

  if (robots.text.includes('Disallow: /') && !robots.text.includes('Allow: /')) {
    add('error', 'robots', 'production robots appears to block the whole site')
  }

  add('info', 'robots', 'production robots.txt is reachable')
}

async function auditSitemap() {
  const sitemap = await fetchText(`${SITE_URL}/sitemap.xml`, { redirect: 'follow' })

  if (sitemap.status !== 200) {
    add('error', 'sitemap', `sitemap.xml returned ${sitemap.status}`)
    return
  }

  const urls = Array.from(sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1])
  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index)
  const localized = urls.filter((url) => /https:\/\/reparar24\.es\/(?:es|en|ru)(?:\/|$)/.test(url))
  const valenciaServiceUrls = SERVICE_SLUGS.map((slug) => `${SITE_URL}/${slug}/valencia`).filter((url) => urls.includes(url))

  if (!urls.length) add('error', 'sitemap', 'no URLs found')
  if (duplicates.length) add('error', 'sitemap', `duplicate URLs: ${Array.from(new Set(duplicates)).slice(0, 10).join(', ')}`)
  if (localized.length) add('error', 'sitemap', `localized URLs present: ${localized.slice(0, 10).join(', ')}`)
  if (valenciaServiceUrls.length) add('error', 'sitemap', `Valencia service-city URLs present: ${valenciaServiceUrls.join(', ')}`)

  add('info', 'sitemap', `${urls.length} live canonical URLs`)
}

async function auditRedirects() {
  for (const serviceSlug of SERVICE_SLUGS) {
    const url = `${SITE_URL}/${serviceSlug}/valencia`
    const response = await fetchText(url)
    const location = response.headers.get('location')

    if (![301, 308].includes(response.status)) {
      add('error', 'redirects', `${url} returned ${response.status}, expected 301/308`)
      continue
    }

    if (location !== `/${serviceSlug}` && location !== `${SITE_URL}/${serviceSlug}`) {
      add('error', 'redirects', `${url} redirects to ${location}, expected /${serviceSlug}`)
    }
  }

  add('info', 'redirects', `${SERVICE_SLUGS.length} Valencia service-city redirects checked`)
}

async function auditPages() {
  for (const path of SAMPLE_PAGES) {
    const url = `${SITE_URL}${path}`
    const page = await fetchText(url, { redirect: 'follow' })

    if (page.status !== 200) {
      add('error', 'pages', `${url} returned ${page.status}`)
      continue
    }

    const canonical = extractCanonical(page.text)
    const expectedCanonical = `${SITE_URL}${path === '/' ? '' : path}`
    const title = extractTitle(page.text)
    const robotsHeader = page.headers.get('x-robots-tag')

    if (!canonical) add('error', 'pages', `${path} missing canonical`)
    else if (canonical !== expectedCanonical) add('error', 'pages', `${path} canonical ${canonical}, expected ${expectedCanonical}`)

    if (!title) add('error', 'pages', `${path} missing title`)
    if (robotsHeader?.includes('noindex')) add('error', 'pages', `${path} has X-Robots-Tag ${robotsHeader}`)
  }

  add('info', 'pages', `${SAMPLE_PAGES.length} live pages checked`)
}

async function main() {
  await auditRobots()
  await auditSitemap()
  await auditRedirects()
  await auditPages()

  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Production SEO audit')
  console.log('====================')

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

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
