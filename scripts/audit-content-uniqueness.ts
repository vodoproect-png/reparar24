#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type Finding = {
  severity: 'error' | 'warn' | 'info'
  area: string
  message: string
}

type PageText = {
  route: string
  title: string
  description: string
  h1: string
  h2s: string[]
  paragraphs: string[]
  text: string
  keywords: Set<string>
  shingles: Set<string>
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const MIN_TEXT_CHARS = 900
const SIMILARITY_WARN = 0.58
const SIMILARITY_ERROR = 0.72
const DUPLICATE_FRAGMENT_MIN_WORDS = 18
const MAX_FINDINGS_PER_AREA = 50
const LEGAL_ROUTES = new Set(['/cookies', '/privacidad', '/terminos'])
const STOPWORDS = new Set([
  'a', 'al', 'antes', 'con', 'como', 'de', 'del', 'desde', 'el', 'en', 'entre', 'es', 'esta', 'este',
  'la', 'las', 'lo', 'los', 'mas', 'nos', 'o', 'para', 'por', 'que', 'se', 'si', 'sin', 'su', 'sus',
  'tu', 'un', 'una', 'y', '24', '24h', '365', 'reparar24', 'valencia', 'madrid', 'barcelona',
  'sevilla', 'zaragoza', 'malaga', 'servicio', 'servicios', 'profesional', 'profesionales',
  'presupuesto', 'previo', 'gratis', 'gratuito', 'urgente', 'urgencias', 'llamar', 'whatsapp',
])
const TEMPLATE_PHRASES = [
  'llamanos o escribenos por whatsapp',
  'respuesta en 30-60 min',
  'profesionales certificados',
  'presupuesto gratuito',
  'garantia 2 anos',
  'seguro rc',
  'todos los servicios',
  'no hemos encontrado ese servicio',
  'escribenos por whatsapp',
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

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function getFirstMatch(source: string, pattern: RegExp): string {
  const match = source.match(pattern)
  return match?.[1] ? stripTags(match[1]) : ''
}

function getAllMatches(source: string, pattern: RegExp): string[] {
  return Array.from(source.matchAll(pattern)).map((match) => stripTags(match[1] ?? '')).filter(Boolean)
}

function normalizeText(value: string): string {
  let normalized = decodeHtml(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  for (const phrase of TEMPLATE_PHRASES) {
    normalized = normalized.replaceAll(phrase, ' ')
  }

  return normalized.replace(/\s+/g, ' ').trim()
}

function words(value: string): string[] {
  return normalizeText(value)
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))
}

function buildKeywords(page: Pick<PageText, 'title' | 'description' | 'h1' | 'h2s'>): Set<string> {
  const source = [page.title, page.description, page.h1, ...page.h2s].join(' ')
  return new Set(words(source))
}

function buildShingles(text: string, size = 7): Set<string> {
  const tokens = words(text)
  const shingles = new Set<string>()

  for (let index = 0; index <= tokens.length - size; index += 1) {
    shingles.add(tokens.slice(index, index + size).join(' '))
  }

  return shingles
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0

  let intersection = 0
  for (const value of a) {
    if (b.has(value)) intersection += 1
  }

  return intersection / (a.size + b.size - intersection)
}

function extractMainText(html: string): Pick<PageText, 'title' | 'description' | 'h1' | 'h2s' | 'paragraphs' | 'text'> {
  const title = getFirstMatch(html, /<title>([\s\S]*?)<\/title>/)
  const description = getFirstMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/)
  const h1 = getFirstMatch(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/)
  const h2s = getAllMatches(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/g)
  const paragraphs = getAllMatches(html, /<p\b[^>]*>([\s\S]*?)<\/p>/g)
    .filter((text) => text.length >= 45)
    .filter((text) => !/llamar|whatsapp|cookies|politica de privacidad/i.test(normalizeText(text)))
  const text = [h1, ...h2s, ...paragraphs].join(' ')

  return { title, description, h1, h2s, paragraphs, text }
}

function loadPages(): PageText[] {
  return walk(HTML_ROOT)
    .filter((filePath) => filePath.endsWith('.html'))
    .map((filePath) => {
      const route = routeFromHtmlPath(filePath)
      const html = fs.readFileSync(filePath, 'utf8')
      const extracted = extractMainText(html)
      const keywords = buildKeywords(extracted)
      const shingles = buildShingles(extracted.text)

      return {
        route,
        ...extracted,
        keywords,
        shingles,
      }
    })
    .filter((page) => !page.route.includes('_not-found'))
    .filter((page) => !LEGAL_ROUTES.has(page.route))
}

function auditDuplicateMetadata(pages: PageText[]) {
  const byTitle = new Map<string, string[]>()
  const byDescription = new Map<string, string[]>()
  const byH1 = new Map<string, string[]>()

  for (const page of pages) {
    for (const [map, value] of [[byTitle, page.title], [byDescription, page.description], [byH1, page.h1]] as const) {
      const key = normalizeText(value)
      if (!key) continue
      if (!map.has(key)) map.set(key, [])
      map.get(key)?.push(page.route)
    }
  }

  for (const [label, map] of [['title', byTitle], ['description', byDescription], ['h1', byH1]] as const) {
    const duplicates = Array.from(map.entries()).filter(([, routes]) => routes.length > 1)
    if (duplicates.length) {
      add('error', 'metadata', `duplicate ${label}: ${duplicates.slice(0, 10).map(([, routes]) => routes.join(' / ')).join('; ')}`)
    }
  }
}

function auditTextLength(pages: PageText[]) {
  const shortCommercial = pages
    .filter((page) => page.route.split('/').filter(Boolean).length <= 2)
    .filter((page) => page.text.length < MIN_TEXT_CHARS)
    .map((page) => `${page.route} (${page.text.length} chars)`)

  if (shortCommercial.length) {
    add('warn', 'content-length', `commercial pages with thin extracted text: ${shortCommercial.slice(0, 30).join(', ')}`)
  }
}

function auditSimilarity(pages: PageText[]) {
  const similarPairs: Array<{ a: string; b: string; score: number; keywordScore: number }> = []

  for (let i = 0; i < pages.length; i += 1) {
    for (let j = i + 1; j < pages.length; j += 1) {
      const a = pages[i]
      const b = pages[j]
      const score = jaccard(a.shingles, b.shingles)
      const keywordScore = jaccard(a.keywords, b.keywords)

      if (score >= SIMILARITY_WARN || (score >= 0.42 && keywordScore >= 0.58)) {
        similarPairs.push({ a: a.route, b: b.route, score, keywordScore })
      }
    }
  }

  const errors = similarPairs.filter((pair) => pair.score >= SIMILARITY_ERROR)
  const warnings = similarPairs.filter((pair) => pair.score < SIMILARITY_ERROR)

  if (errors.length) {
    add('error', 'similarity', errors.slice(0, MAX_FINDINGS_PER_AREA).map((pair) => `${pair.a} <> ${pair.b} (${pair.score.toFixed(2)})`).join('; '))
  }

  if (warnings.length) {
    add('warn', 'similarity', warnings.slice(0, MAX_FINDINGS_PER_AREA).map((pair) => `${pair.a} <> ${pair.b} (${pair.score.toFixed(2)}, kw ${pair.keywordScore.toFixed(2)})`).join('; '))
  }
}

function auditDuplicateFragments(pages: PageText[]) {
  const fragmentMap = new Map<string, Set<string>>()

  for (const page of pages) {
    for (const paragraph of page.paragraphs) {
      const tokens = words(paragraph)
      if (tokens.length < DUPLICATE_FRAGMENT_MIN_WORDS) continue

      const fragment = tokens.slice(0, Math.min(tokens.length, 28)).join(' ')
      if (!fragmentMap.has(fragment)) fragmentMap.set(fragment, new Set())
      fragmentMap.get(fragment)?.add(page.route)
    }
  }

  const repeated = Array.from(fragmentMap.entries())
    .filter(([, routes]) => routes.size > 1)
    .filter(([fragment]) => !TEMPLATE_PHRASES.some((phrase) => fragment.includes(phrase)))

  if (repeated.length) {
    add(
      'warn',
      'duplicate-fragments',
      repeated
        .slice(0, MAX_FINDINGS_PER_AREA)
        .map(([fragment, routes]) => `"${fragment.slice(0, 110)}..." in ${Array.from(routes).slice(0, 5).join(', ')}`)
        .join('; ')
    )
  }
}

function printFindings(pages: PageText[]) {
  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Content uniqueness audit')
  console.log('========================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!grouped[severity].length) continue

    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of grouped[severity]) {
      console.log(`- [${finding.area}] ${finding.message}`)
    }
  }

  console.log(`\nSummary: ${pages.length} pages, ${grouped.error.length} errors, ${grouped.warn.length} warnings`)

  if (grouped.error.length > 0) process.exitCode = 1
}

if (!fs.existsSync(HTML_ROOT)) {
  console.error('Missing .next/server/app. Run npm run build first.')
  process.exit(1)
}

const pages = loadPages()

auditDuplicateMetadata(pages)
auditTextLength(pages)
auditSimilarity(pages)
auditDuplicateFragments(pages)
add('info', 'coverage', `${pages.length} rendered indexable pages checked for cannibalization and local text uniqueness`)
printFindings(pages)
