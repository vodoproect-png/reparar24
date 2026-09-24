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
  kind: 'blog' | 'blog-category' | 'commercial' | 'commercial-hub' | 'commercial-geo'
  status?: string
  indexing?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  approvedKeywords?: Array<{ keyword: string; role: KeywordRole }>
  text: string
}

type KeywordRole = 'primary' | 'secondary' | 'seo' | 'faq' | 'tag'

interface ApprovedKeywordMetric {
  keyword: string
  role: KeywordRole
  count: number
  density: number
}

type KeywordCoverageStatus = 'pass' | 'warning' | 'fail'

interface KeywordCoverageAssessment {
  status: KeywordCoverageStatus
  totalDensity: number
  secondarySeoCoveragePercent?: number
  missingByRole: Partial<Record<KeywordRole, string[]>>
  overusedByRole: Partial<Record<KeywordRole, string[]>>
  issues: string[]
}

interface TextRuMetrics {
  uniqueness?: number
  waterPercent?: number
  spamPercent?: number
  spellErrors?: number
  keywords?: Array<{ keyword: string; count?: number; percent?: number }>
}

interface TextRuResult {
  target: CheckTarget
  skipped?: string
  ok?: boolean
  uid?: string
  metrics?: TextRuMetrics
  approvedKeywordMetrics?: ApprovedKeywordMetric[]
  keywordCoverage?: KeywordCoverageAssessment
  rawStatus?: string
  error?: string
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const OUTPUT_DIR = path.join(ROOT, '.tmp', 'uniqueness')
const API_KEY = process.env.TEXT_RU_API_KEY
const API_URL = process.env.TEXT_RU_API_URL || 'https://api.text.ru/post'
const POLL_ATTEMPTS = Number(process.env.TEXT_RU_POLL_ATTEMPTS ?? '10')
const POLL_DELAY_MS = Number(process.env.TEXT_RU_POLL_DELAY_MS ?? '8000')
const MIN_UNIQUENESS = Number(process.env.TEXT_RU_MIN_UNIQUENESS ?? '100')
const MAX_WATER_PERCENT = Number(process.env.TEXT_RU_MAX_WATER_PERCENT ?? '20')
const MAX_SPAM_PERCENT = Number(process.env.TEXT_RU_MAX_SPAM_PERCENT ?? '60')
const PRIMARY_WARNING_DENSITY = 1.2
const PRIMARY_FAIL_DENSITY = 1.8
const TOTAL_KEYWORD_WARNING_DENSITY = 5.5
const TOTAL_KEYWORD_FAIL_DENSITY = 7
const COMMERCIAL_PRIMARY_WARNING_DENSITY = 1.8
const COMMERCIAL_PRIMARY_FAIL_DENSITY = 4
const COMMERCIAL_TOTAL_KEYWORD_WARNING_DENSITY = 7.5
const COMMERCIAL_TOTAL_KEYWORD_FAIL_DENSITY = 12
const GEO_TOTAL_KEYWORD_WARNING_DENSITY = 12
const GEO_TOTAL_KEYWORD_FAIL_DENSITY = 15
const HUB_PRIMARY_WARNING_DENSITY = 4
const HUB_PRIMARY_FAIL_DENSITY = 5
const HUB_TOTAL_KEYWORD_WARNING_DENSITY = 10
const HUB_TOTAL_KEYWORD_FAIL_DENSITY = 13
const SECONDARY_SEO_TARGET_COVERAGE = 60
const SECONDARY_SEO_FAIL_COVERAGE = 40

const { childServicesData: fontaneroChildServicesData } = require('../../data/fontanero/child-services-seo')
const { childServicesData: electricistaChildServicesData } = require('../../data/electricista/child-services-seo')
const { desatascosChildServicesData } = require('../../data/desatascos/child-services-seo')
const { aireAcondicionadoChildServicesData } = require('../../data/aire-acondicionado/child-services-seo')
const { calefaccionChildServicesData } = require('../../data/calefaccion/child-services-seo')
const { limpiezaTuberiasChildServicesData } = require('../../data/limpieza-tuberias/child-services-seo')
const { AireAcondicionadoCitySEOContent } = require('../../data/city-seo/aire-acondicionado')
const { CalefaccionCitySEOContent } = require('../../data/city-seo/calefaccion')
const { DesatascosCitySEOContent } = require('../../data/city-seo/desatascos')
const { ElectricistaCitySEOContent } = require('../../data/city-seo/electricista')
const { FontaneroCitySEOContent } = require('../../data/city-seo/fontanero')
const { LimpiezaTuberiasCitySEOContent } = require('../../data/city-seo/limpieza-tuberias')
const { AireAcondicionadoDistrictSEOContent } = require('../../data/district-seo/aire-acondicionado')
const { CalefaccionDistrictSEOContent } = require('../../data/district-seo/calefaccion')
const { DesatascosDistrictSEOContent } = require('../../data/district-seo/desatascos')
const { ElectricistaDistrictSEOContent } = require('../../data/district-seo/electricista')
const { FontaneroDistrictSEOContent } = require('../../data/district-seo/fontanero')
const { LimpiezaTuberiasDistrictSEOContent } = require('../../data/district-seo/limpieza-tuberias')

const citySEOContent = [
  ...AireAcondicionadoCitySEOContent,
  ...CalefaccionCitySEOContent,
  ...DesatascosCitySEOContent,
  ...ElectricistaCitySEOContent,
  ...FontaneroCitySEOContent,
  ...LimpiezaTuberiasCitySEOContent,
]

const districtSEOContent = [
  ...AireAcondicionadoDistrictSEOContent,
  ...CalefaccionDistrictSEOContent,
  ...DesatascosDistrictSEOContent,
  ...ElectricistaDistrictSEOContent,
  ...FontaneroDistrictSEOContent,
  ...LimpiezaTuberiasDistrictSEOContent,
]

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

function normalize(value: string): string {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

function tokenizePhrase(value: string): string[] {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean)
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function countPhrase(text: string, phrase: string): number {
  const normalizedText = ` ${normalize(text)} `
  const normalizedPhrase = normalize(phrase)
  if (!normalizedPhrase) return 0
  const pattern = new RegExp(` ${escapeRegex(normalizedPhrase)} `, 'g')
  return normalizedText.match(pattern)?.length ?? 0
}

function countPhraseStandalone(text: string, phrase: string, longerPhrases: string[]): number {
  const textTokens = tokenizePhrase(text)
  const phraseTokens = tokenizePhrase(phrase)
  if (phraseTokens.length === 0 || phraseTokens.length > textTokens.length) return 0

  const longerTokenSets = longerPhrases
    .map((item) => tokenizePhrase(item))
    .filter((tokens) => tokens.length > phraseTokens.length)

  let count = 0

  for (let index = 0; index <= textTokens.length - phraseTokens.length; index += 1) {
    let matched = true
    for (let offset = 0; offset < phraseTokens.length; offset += 1) {
      if (textTokens[index + offset] !== phraseTokens[offset]) {
        matched = false
        break
      }
    }
    if (!matched) continue

    const isPartOfLongerApprovedPhrase = longerTokenSets.some((longerTokens) => {
      for (let phraseStart = 0; phraseStart <= longerTokens.length - phraseTokens.length; phraseStart += 1) {
        let phraseInsideLonger = true
        for (let offset = 0; offset < phraseTokens.length; offset += 1) {
          if (longerTokens[phraseStart + offset] !== phraseTokens[offset]) {
            phraseInsideLonger = false
            break
          }
        }
        if (!phraseInsideLonger) continue

        const start = index - phraseStart
        if (start < 0 || start + longerTokens.length > textTokens.length) continue

        let longerMatched = true
        for (let offset = 0; offset < longerTokens.length; offset += 1) {
          if (textTokens[start + offset] !== longerTokens[offset]) {
            longerMatched = false
            break
          }
        }
        if (longerMatched) return true
      }

      return false
    })

    if (!isPartOfLongerApprovedPhrase) count += 1
  }

  return count
}

function uniqueKeywordTokenDensity(text: string, keywords: string[], denominatorWordFloor = 1): number {
  const textTokens = tokenize(text)
  const covered = new Set<number>()

  for (const keyword of keywords) {
    const keywordTokens = tokenize(keyword)
    if (keywordTokens.length === 0 || keywordTokens.length > textTokens.length) continue

    for (let index = 0; index <= textTokens.length - keywordTokens.length; index += 1) {
      let matched = true
      for (let offset = 0; offset < keywordTokens.length; offset += 1) {
        if (textTokens[index + offset] !== keywordTokens[offset]) {
          matched = false
          break
        }
      }

      if (!matched) continue
      for (let offset = 0; offset < keywordTokens.length; offset += 1) {
        covered.add(index + offset)
      }
    }
  }

  return Number(((covered.size / Math.max(textTokens.length, denominatorWordFloor, 1)) * 100).toFixed(2))
}

function dedupeKeywordInputs(inputs: Array<{ keyword?: string; role: KeywordRole }>): Array<{ keyword: string; role: KeywordRole }> {
  const seen = new Set<string>()
  const result: Array<{ keyword: string; role: KeywordRole }> = []

  for (const input of inputs) {
    const keyword = String(input.keyword ?? '').trim()
    const normalized = normalize(keyword)
    if (!keyword || !normalized || seen.has(normalized)) continue
    seen.add(normalized)
    result.push({ keyword, role: input.role })
  }

  return result
}

function densityWordDenominator(target: CheckTarget): number {
  const actualWords = tokenize(target.text).length
  if (target.kind === 'commercial' || target.kind === 'commercial-geo') return Math.max(actualWords, 650)
  if (target.kind === 'commercial-hub') return Math.max(actualWords, 800)
  if (target.kind === 'blog-category') return Math.max(actualWords, 350)
  return Math.max(actualWords, 1)
}

function approvedKeywordMetrics(target: CheckTarget): ApprovedKeywordMetric[] {
  const keywords = target.approvedKeywords?.length ? dedupeKeywordInputs(target.approvedKeywords) : dedupeKeywordInputs([
    ...(target.primaryKeyword ? [{ keyword: target.primaryKeyword, role: 'primary' as const }] : []),
    ...(target.secondaryKeywords ?? []).map((keyword) => ({ keyword, role: 'secondary' as const })),
  ])
  const totalWords = densityWordDenominator(target)
  const keywordValues = keywords.map((item) => item.keyword)

  return keywords.map(({ keyword, role }) => {
    const count = role === 'primary'
      ? countPhraseStandalone(target.text, keyword, keywordValues.filter((item) => normalize(item) !== normalize(keyword)))
      : countPhrase(target.text, keyword)
    const keywordWords = Math.max(tokenize(keyword).length, 1)
    return {
      keyword,
      role,
      count,
      density: Number((((count * keywordWords) / totalWords) * 100).toFixed(2)),
    }
  })
}

function keywordCoverageAssessment(target: CheckTarget, metrics: ApprovedKeywordMetric[]): KeywordCoverageAssessment {
  const issues: string[] = []
  const missingByRole: Partial<Record<KeywordRole, string[]>> = {}
  const overusedByRole: Partial<Record<KeywordRole, string[]>> = {}
  let status: KeywordCoverageStatus = 'pass'
  const totalDensity = uniqueKeywordTokenDensity(target.text, metrics.map((item) => item.keyword), densityWordDenominator(target))
  const primary = metrics.filter((item) => item.role === 'primary')
  const secondarySeo = metrics.filter((item) => item.role === 'secondary' || item.role === 'seo')
  const faq = metrics.filter((item) => item.role === 'faq')
  const tag = metrics.filter((item) => item.role === 'tag')
  const isHubLike = target.kind === 'commercial-hub' || target.kind === 'blog-category'
  const totalWarningDensity = isHubLike
    ? HUB_TOTAL_KEYWORD_WARNING_DENSITY
    : target.kind === 'commercial-geo'
      ? GEO_TOTAL_KEYWORD_WARNING_DENSITY
    : target.kind === 'commercial'
      ? COMMERCIAL_TOTAL_KEYWORD_WARNING_DENSITY
      : TOTAL_KEYWORD_WARNING_DENSITY
  const totalFailDensity = isHubLike
    ? HUB_TOTAL_KEYWORD_FAIL_DENSITY
    : target.kind === 'commercial-geo'
      ? GEO_TOTAL_KEYWORD_FAIL_DENSITY
    : target.kind === 'commercial'
      ? COMMERCIAL_TOTAL_KEYWORD_FAIL_DENSITY
      : TOTAL_KEYWORD_FAIL_DENSITY

  function warn(message: string) {
    if (status === 'pass') status = 'warning'
    issues.push(message)
  }

  function fail(message: string) {
    status = 'fail'
    issues.push(message)
  }

  function addMissing(item: ApprovedKeywordMetric) {
    missingByRole[item.role] = [...(missingByRole[item.role] ?? []), item.keyword]
  }

  function addOverused(item: ApprovedKeywordMetric) {
    const value = `${item.keyword} (${item.count}, ${item.density}%)`
    if ((overusedByRole[item.role] ?? []).includes(value)) return
    overusedByRole[item.role] = [...(overusedByRole[item.role] ?? []), value]
  }

  for (const item of primary) {
    const maxTarget = target.kind === 'blog' ? 5 : isHubLike ? 12 : 3
    const primaryWarningDensity = isHubLike
      ? HUB_PRIMARY_WARNING_DENSITY
      : target.kind === 'commercial' || target.kind === 'commercial-geo'
        ? COMMERCIAL_PRIMARY_WARNING_DENSITY
        : PRIMARY_WARNING_DENSITY
    const primaryFailDensity = isHubLike
      ? HUB_PRIMARY_FAIL_DENSITY
      : target.kind === 'commercial' || target.kind === 'commercial-geo'
        ? COMMERCIAL_PRIMARY_FAIL_DENSITY
        : PRIMARY_FAIL_DENSITY
    if (item.count < 1) {
      addMissing(item)
      fail(`primary keyword "${item.keyword}" is missing`)
    } else if (target.kind === 'blog' && item.count === 1 && tokenize(target.text).length >= 900) {
      warn(`primary keyword "${item.keyword}" appears once in a long blog article`)
    } else if (item.count > maxTarget) {
      addOverused(item)
      warn(`primary keyword "${item.keyword}" appears ${item.count} times; target max is ${maxTarget}`)
    }

    if (item.density > primaryFailDensity) {
      addOverused(item)
      fail(`primary keyword "${item.keyword}" density ${item.density}% is above ${primaryFailDensity}%`)
    } else if (item.density > primaryWarningDensity) {
      addOverused(item)
      warn(`primary keyword "${item.keyword}" density ${item.density}% is above ${primaryWarningDensity}%`)
    }
  }

  let secondarySeoCoveragePercent: number | undefined
  if (secondarySeo.length > 0) {
    const covered = secondarySeo.filter((item) => item.count > 0).length
    secondarySeo.filter((item) => item.count === 0).forEach(addMissing)
    secondarySeoCoveragePercent = Number(((covered / secondarySeo.length) * 100).toFixed(1))

    if (secondarySeoCoveragePercent < SECONDARY_SEO_FAIL_COVERAGE) {
      fail(`secondary/seo exact coverage ${secondarySeoCoveragePercent}% is below ${SECONDARY_SEO_FAIL_COVERAGE}%`)
    } else if (secondarySeoCoveragePercent < SECONDARY_SEO_TARGET_COVERAGE) {
      warn(`secondary/seo exact coverage ${secondarySeoCoveragePercent}% is below target ${SECONDARY_SEO_TARGET_COVERAGE}%`)
    }
  }

  if (faq.length > 0 && faq.every((item) => item.count === 0)) {
    faq.forEach(addMissing)
    warn('all FAQ keywords are missing exact coverage')
  } else {
    faq.filter((item) => item.count === 0).forEach(addMissing)
  }

  if (tag.length > 0 && tag.every((item) => item.count === 0)) {
    tag.forEach(addMissing)
    warn('all tag keywords are missing exact coverage')
  } else {
    tag.filter((item) => item.count === 0).forEach(addMissing)
  }

  if (totalDensity > totalFailDensity) {
    fail(`total approved exact-keyword density ${totalDensity}% is above ${totalFailDensity}%`)
  } else if (totalDensity > totalWarningDensity) {
    warn(`total approved exact-keyword density ${totalDensity}% is above ${totalWarningDensity}%`)
  } else if (metrics.length > 0 && totalDensity < 0.8) {
    warn(`total approved exact-keyword density ${totalDensity}% is low; verify intent coverage`)
  }

  return {
    status,
    totalDensity,
    secondarySeoCoveragePercent,
    missingByRole,
    overusedByRole,
    issues,
  }
}

function commercialKeywordsForRoute(route: string): {
  primaryKeyword?: string
  secondaryKeywords?: string[]
  approvedKeywords?: Array<{ keyword: string; role: KeywordRole }>
} {
  const hubKeywords = hubKeywordsForRoute(route)
  if (hubKeywords.approvedKeywords?.length) return hubKeywords

  const childSources: Array<{ prefix: string; data: Record<string, any> }> = [
    { prefix: '/fontanero', data: fontaneroChildServicesData },
    { prefix: '/electricista', data: electricistaChildServicesData },
    { prefix: '/desatascos', data: desatascosChildServicesData },
    { prefix: '/aire-acondicionado', data: aireAcondicionadoChildServicesData },
    { prefix: '/calefaccion', data: calefaccionChildServicesData },
    { prefix: '/limpieza-tuberias', data: limpiezaTuberiasChildServicesData },
  ]

  for (const source of childSources) {
    if (!route.startsWith(`${source.prefix}/`)) continue
    const slug = route.slice(source.prefix.length + 1)
    const page = source.data[slug]
    if (!page) continue

    const approvedKeywords = dedupeKeywordInputs([
      { keyword: page.lockedPrimaryKw, role: 'primary' as const },
      ...(page.secondaryKw ?? []).map((keyword: string) => ({ keyword, role: 'secondary' as const })),
      ...(page.seoBlockKw ?? []).map((keyword: string) => ({ keyword, role: 'seo' as const })),
      ...(page.faqKw ?? []).map((keyword: string) => ({ keyword, role: 'faq' as const })),
      ...(page.seoContent?.keywordTags ?? []).map((keyword: string) => ({ keyword, role: 'tag' as const })),
    ])

    return {
      primaryKeyword: page.lockedPrimaryKw,
      secondaryKeywords: approvedKeywords.filter((item) => item.role !== 'primary').map((item) => item.keyword),
      approvedKeywords,
    }
  }

  const geoKeywords = geoKeywordsForRoute(route)
  if (geoKeywords.approvedKeywords?.length) return geoKeywords

  return {}
}

function geoContentForRoute(route: string): { type: 'city' | 'district'; content: any } | undefined {
  const parts = route.split('/').filter(Boolean)

  if (parts.length === 2) {
    const [serviceId, citySlug] = parts
    const content = citySEOContent.find(
      (item: any) => item.serviceId === serviceId && item.citySlug === citySlug
    )
    return content ? { type: 'city', content } : undefined
  }

  if (parts.length === 3) {
    const [serviceId, citySlug, districtSlug] = parts
    const content = districtSEOContent.find(
      (item: any) =>
        item.serviceId === serviceId &&
        item.citySlug === citySlug &&
        item.districtSlug === districtSlug
    )
    return content ? { type: 'district', content } : undefined
  }

  return undefined
}

function isGeoRoute(route: string): boolean {
  return geoContentForRoute(route) !== undefined
}

function geoKeywordsForRoute(route: string): {
  primaryKeyword?: string
  secondaryKeywords?: string[]
  approvedKeywords?: Array<{ keyword: string; role: KeywordRole }>
} {
  const match = geoContentForRoute(route)
  if (!match) return {}

  if (match.type === 'city') {
    const content = match.content
    const primary = content.keywords?.primary?.[0]
    const approvedKeywords = dedupeKeywordInputs([
      { keyword: primary, role: 'primary' as const },
      ...(content.keywords?.primary?.slice(1) ?? []).map((keyword: string) => ({
        keyword,
        role: 'secondary' as const,
      })),
      ...(content.keywords?.secondary ?? []).map((keyword: string) => ({
        keyword,
        role: 'secondary' as const,
      })),
      ...(content.keywords?.longTail ?? []).map((keyword: string) => ({
        keyword,
        role: 'seo' as const,
      })),
    ])

    return {
      primaryKeyword: primary,
      secondaryKeywords: approvedKeywords.filter((item) => item.role !== 'primary').map((item) => item.keyword),
      approvedKeywords,
    }
  }

  const ownership = match.content.semanticOwnership ?? []
  const approvedKeywords = dedupeKeywordInputs(
    ownership.map((keyword: string) => ({
      keyword,
      role: 'secondary' as const,
    }))
  )

  return {
    secondaryKeywords: approvedKeywords.map((item) => item.keyword),
    approvedKeywords,
  }
}

function commercialChildPageForRoute(route: string): any | undefined {
  const childSources: Array<{ prefix: string; data: Record<string, any> }> = [
    { prefix: '/fontanero', data: fontaneroChildServicesData },
    { prefix: '/electricista', data: electricistaChildServicesData },
    { prefix: '/desatascos', data: desatascosChildServicesData },
    { prefix: '/aire-acondicionado', data: aireAcondicionadoChildServicesData },
    { prefix: '/calefaccion', data: calefaccionChildServicesData },
    { prefix: '/limpieza-tuberias', data: limpiezaTuberiasChildServicesData },
  ]

  for (const source of childSources) {
    if (!route.startsWith(`${source.prefix}/`)) continue
    const slug = route.slice(source.prefix.length + 1)
    return source.data[slug]
  }

  return undefined
}

function collectVisibleStrings(value: any): string[] {
  if (!value) return []
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectVisibleStrings)
  if (typeof value !== 'object') return []

  return Object.entries(value)
    .filter(([key, childValue]) => {
      if (typeof childValue === 'function') return false
      return !['icon', 'color', 'keywordsTitle', 'keywordTags'].includes(key)
    })
    .flatMap(([, childValue]) => collectVisibleStrings(childValue))
}

function commercialSourceText(route: string, htmlFallback: string): string {
  const page = commercialChildPageForRoute(route)
  if (!page) return geoSourceText(route) ?? htmlFallback

  const parts = [
    page.h1,
    page.description,
    page.contentBrief,
    ...collectVisibleStrings(page.seoContent),
    ...collectVisibleStrings(page.faqs),
  ]
    .map((item) => String(item || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const seen = new Set<string>()
  const uniqueParts = parts.filter((item) => {
    const normalized = normalize(item)
    if (!normalized || seen.has(normalized)) return false
    seen.add(normalized)
    return true
  })

  return uniqueParts.join('\n\n').replace(/\s+/g, ' ').trim()
}

function geoSourceText(route: string): string | undefined {
  const match = geoContentForRoute(route)
  if (!match) return undefined

  const content = match.content
  const cityKeywordAppendix = match.type === 'city' ? buildCityKeywordAppendix(content) : undefined
  const parts = [
    content.metadata?.title,
    content.metadata?.description,
    content.seoText,
    cityKeywordAppendix,
    ...collectVisibleStrings(content.faqs),
  ]
    .map((item) => String(item || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const seen = new Set<string>()
  const uniqueParts = parts.filter((item) => {
    const normalized = normalize(item)
    if (!normalized || seen.has(normalized)) return false
    seen.add(normalized)
    return true
  })

  return uniqueParts.join('\n\n').replace(/\s+/g, ' ').trim()
}

function buildCityKeywordAppendix(content: any): string {
  const phrases = [
    ...(content.keywords?.primary ?? []),
    ...(content.keywords?.secondary ?? []),
    ...(content.keywords?.longTail ?? []),
  ]
    .map((keyword: string) => keyword.trim())
    .filter(Boolean)

  const uniquePhrases = Array.from(new Set(phrases)).slice(0, 12)
  if (uniquePhrases.length === 0) return ''

  const cityName = String(content.citySlug ?? '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return `Para cubrir correctamente la busqueda local en ${cityName}, esta pagina concentra consultas como ${uniquePhrases.join(', ')}. Usamos estas expresiones para orientar el diagnostico inicial, explicar cobertura por ciudad y derivar cada reparacion concreta a su pagina de servicio cuando la intencion ya es especifica.`
}

function hubKeywordsForRoute(route: string): {
  primaryKeyword?: string
  secondaryKeywords?: string[]
  approvedKeywords?: Array<{ keyword: string; role: KeywordRole }>
} {
  const hubMap: Record<string, Array<{ keyword: string; role: KeywordRole }>> = {
    '/fontanero': [
      { keyword: 'fontanero 24 horas', role: 'primary' },
      { keyword: 'fontanero en Valencia', role: 'secondary' },
      { keyword: 'fontanero urgente', role: 'secondary' },
      { keyword: 'fontanero cerca de mi', role: 'secondary' },
      { keyword: 'fontaneria profesional', role: 'seo' },
      { keyword: 'reparacion de fugas de agua', role: 'seo' },
      { keyword: 'desatascos profesionales', role: 'seo' },
      { keyword: 'termos electricos', role: 'seo' },
      { keyword: 'instalacion de fontaneria', role: 'seo' },
      { keyword: 'cuanto cobra un fontanero', role: 'faq' },
      { keyword: 'precio hora fontanero', role: 'faq' },
    ],
    '/electricista': [
      { keyword: 'electricista en Valencia', role: 'primary' },
      { keyword: 'electricista profesional', role: 'secondary' },
      { keyword: 'urgencias electricas 24 horas', role: 'secondary' },
      { keyword: 'reparacion de averias electricas', role: 'seo' },
      { keyword: 'instalaciones electricas', role: 'seo' },
      { keyword: 'cuadros electricos', role: 'seo' },
      { keyword: 'iluminacion LED', role: 'seo' },
      { keyword: 'enchufes e interruptores', role: 'seo' },
      { keyword: 'cuanto cobra un electricista', role: 'faq' },
      { keyword: 'salta el diferencial', role: 'faq' },
    ],
    '/desatascos': [
      { keyword: 'desatascos 24 horas', role: 'primary' },
      { keyword: 'desatascos urgentes', role: 'secondary' },
      { keyword: 'empresa de desatascos', role: 'secondary' },
      { keyword: 'desatascar tuberias', role: 'seo' },
      { keyword: 'WC atascado', role: 'seo' },
      { keyword: 'fregadero bloqueado', role: 'seo' },
      { keyword: 'camion cuba', role: 'seo' },
      { keyword: 'fosas septicas', role: 'seo' },
      { keyword: 'cuanto cuesta un desatasco', role: 'faq' },
      { keyword: 'desatascos Valencia', role: 'tag' },
    ],
    '/aire-acondicionado': [
      { keyword: 'aire acondicionado', role: 'primary' },
      { keyword: 'instalacion aire acondicionado', role: 'secondary' },
      { keyword: 'reparacion aire acondicionado', role: 'secondary' },
      { keyword: 'mantenimiento aire acondicionado', role: 'secondary' },
      { keyword: 'carga gas aire acondicionado', role: 'seo' },
      { keyword: 'aire acondicionado conductos', role: 'seo' },
      { keyword: 'instalacion de split', role: 'seo' },
      { keyword: 'servicio tecnico climatizacion', role: 'seo' },
      { keyword: 'cuanto cuesta instalar aire acondicionado', role: 'faq' },
    ],
    '/calefaccion': [
      { keyword: 'calefaccion', role: 'primary' },
      { keyword: 'reparacion calderas', role: 'secondary' },
      { keyword: 'mantenimiento caldera', role: 'secondary' },
      { keyword: 'radiadores calefaccion', role: 'secondary' },
      { keyword: 'instalacion calefaccion', role: 'seo' },
      { keyword: 'suelo radiante', role: 'seo' },
      { keyword: 'calefaccion central', role: 'seo' },
      { keyword: 'aerotermia', role: 'seo' },
      { keyword: 'cuanto cuesta reparar la calefaccion', role: 'faq' },
    ],
    '/limpieza-tuberias': [
      { keyword: 'limpieza de tuberias', role: 'primary' },
      { keyword: 'limpieza bajantes comunidad', role: 'secondary' },
      { keyword: 'limpieza de arquetas', role: 'secondary' },
      { keyword: 'camara inspeccion tuberias', role: 'secondary' },
      { keyword: 'limpieza tuberias alta presion', role: 'seo' },
      { keyword: 'camion cuba', role: 'seo' },
      { keyword: 'mantenimiento preventivo', role: 'seo' },
      { keyword: 'redes de saneamiento', role: 'seo' },
      { keyword: 'cuanto cuesta la limpieza de tuberias', role: 'faq' },
    ],
  }

  const approvedKeywords = dedupeKeywordInputs(hubMap[route] ?? [])

  return {
    primaryKeyword: approvedKeywords.find((item) => item.role === 'primary')?.keyword,
    secondaryKeywords: approvedKeywords.filter((item) => item.role !== 'primary').map((item) => item.keyword),
    approvedKeywords,
  }
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
      primaryKeyword: article.primaryKeyword,
      secondaryKeywords: article.secondaryKeywords,
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
        kind: 'blog-category' as const,
        status: 'published',
        indexing: 'index',
        primaryKeyword: seo.targetKeywords?.[0],
        secondaryKeywords: seo.targetKeywords?.slice(1) ?? [],
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
      const h3s = getAllMatches(html, /<h3\b[^>]*>([\s\S]*?)<\/h3>/g)
      const paragraphs = getAllMatches(html, /<p\b[^>]*>([\s\S]*?)<\/p>/g)
        .filter((text) => text.length > 60)
        .filter((text) => !/cookies|politica de privacidad/i.test(text))
      const fallbackText = [...h1s, ...h2s, ...h3s, ...paragraphs].join('\n\n')

      return {
        id: route,
        route,
        kind: hubKeywordsForRoute(route).approvedKeywords?.length
          ? 'commercial-hub' as const
          : isGeoRoute(route)
            ? 'commercial-geo' as const
            : 'commercial' as const,
        ...commercialKeywordsForRoute(route),
        text: commercialSourceText(route, fallbackText),
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

async function postTextRu(params: Record<string, string>): Promise<any> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  })
  const raw = await response.text()

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error(`Text.ru returned non-JSON response: ${raw.slice(0, 120)}`)
  }
}

function parseJsonish(value: any): any {
  if (!value) return undefined
  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

function numberFrom(value: any): number | undefined {
  const normalized = Number(String(value ?? '').replace(',', '.'))
  return Number.isFinite(normalized) ? normalized : undefined
}

function extractKeywords(seoCheck: any): Array<{ keyword: string; count?: number; percent?: number }> | undefined {
  const rawList = seoCheck?.list_keys ?? seoCheck?.keywords ?? seoCheck?.keys
  if (!Array.isArray(rawList)) return undefined

  return rawList
    .map((item: any) => ({
      keyword: String(item?.key ?? item?.keyword ?? item?.word ?? '').trim(),
      count: numberFrom(item?.count ?? item?.cnt),
      percent: numberFrom(item?.percent ?? item?.density),
    }))
    .filter((item) => item.keyword)
}

function extractMetrics(data: any): TextRuMetrics {
  const seoCheck = parseJsonish(data.seo_check ?? data.seoCheck)
  const spellCheck = parseJsonish(data.spell_check ?? data.spellCheck)
  const resultJson = parseJsonish(data.result_json ?? data.resultJson)
  const resultSeo = parseJsonish(resultJson?.seo_check ?? resultJson?.seoCheck)
  const effectiveSeo = seoCheck ?? resultSeo ?? resultJson?.seo ?? resultJson
  const effectiveSpell = spellCheck ?? resultJson?.spell_check ?? resultJson?.spellCheck

  return {
    uniqueness: numberFrom(data.text_unique ?? data.unique ?? data.uniqueness ?? resultJson?.text_unique),
    waterPercent: numberFrom(
      data.water_percent ?? effectiveSeo?.water_percent ?? effectiveSeo?.waterPercent ?? effectiveSeo?.water
    ),
    spamPercent: numberFrom(
      data.spam_percent ?? effectiveSeo?.spam_percent ?? effectiveSeo?.spamPercent ?? effectiveSeo?.spam
    ),
    spellErrors: Array.isArray(effectiveSpell) ? effectiveSpell.length : numberFrom(data.spell_errors),
    keywords: extractKeywords(effectiveSeo),
  }
}

function getUid(data: any): string | undefined {
  return data.text_uid ?? data.uid ?? data.textUid
}

function metricsPass(metrics: TextRuMetrics): boolean {
  if (typeof metrics.uniqueness === 'number' && metrics.uniqueness < MIN_UNIQUENESS) return false
  if (typeof metrics.waterPercent === 'number' && metrics.waterPercent > MAX_WATER_PERCENT) return false
  if (typeof metrics.spamPercent === 'number' && metrics.spamPercent > MAX_SPAM_PERCENT) return false
  return typeof metrics.uniqueness === 'number'
}

function formatKeywordRoleMap(map: Partial<Record<KeywordRole, string[]>>, label: string): string {
  const parts = (['primary', 'secondary', 'seo', 'faq', 'tag'] as KeywordRole[])
    .map((role) => {
      const values = map[role] ?? []
      if (values.length === 0) return ''
      return `${role}: ${values.join(' | ')}`
    })
    .filter(Boolean)

  return parts.length > 0 ? `${label} ${parts.join('; ')}` : ''
}

function getError(data: any): string | undefined {
  if (String(data.error_code ?? '') === '181') return undefined
  if (data.error_desc) return `${data.error_code ?? 'error'}: ${data.error_desc}`
  if (data.error) return String(data.error)
  if (data.errors) return JSON.stringify(data.errors)
  return undefined
}

function isPending(data: any): boolean {
  if (String(data.error_code ?? '') === '181') return true
  const status = String(data.status ?? data.state ?? data.result ?? '').toLowerCase()
  return ['wait', 'waiting', 'queue', 'queued', 'process', 'processing', 'check', 'checking'].includes(status)
}

async function checkWithTextRu(target: CheckTarget): Promise<TextRuResult> {
  if (target.text.length < 700) {
    return { target, skipped: `text too short for reliable external check (${target.text.length} chars)` }
  }

  if (!execute) {
    const approvedMetrics = approvedKeywordMetrics(target)
    return {
      target,
      skipped: 'dry-run',
      approvedKeywordMetrics: approvedMetrics,
      keywordCoverage: keywordCoverageAssessment(target, approvedMetrics),
    }
  }

  if (!API_KEY) {
    throw new Error('Missing TEXT_RU_API_KEY in environment.')
  }

  let submission: any
  try {
    submission = await postTextRu({
      userkey: API_KEY,
      text: target.text,
      jsonvisible: 'detail',
    })
  } catch (error) {
    return { target, ok: false, error: error instanceof Error ? error.message : String(error) }
  }

  const submissionError = getError(submission)
  if (submissionError) return { target, ok: false, error: submissionError }

  const uid = getUid(submission)
  if (!uid) {
    const metrics = extractMetrics(submission)
    const ok = metricsPass(metrics)
    const approvedMetrics = approvedKeywordMetrics(target)
    const keywordCoverage = keywordCoverageAssessment(target, approvedMetrics)
    return {
      target,
      uid,
      ok: ok && keywordCoverage.status !== 'fail',
      metrics,
      approvedKeywordMetrics: approvedMetrics,
      keywordCoverage,
      rawStatus: String(submission.status ?? 'immediate'),
    }
  }

  for (let attempt = 1; attempt <= POLL_ATTEMPTS; attempt += 1) {
    await sleep(POLL_DELAY_MS)

    let statusData: any
    try {
      statusData = await postTextRu({
        userkey: API_KEY,
        uid,
        jsonvisible: 'detail',
      })
    } catch (error) {
      if (attempt === POLL_ATTEMPTS) {
        return { target, uid, ok: false, error: error instanceof Error ? error.message : String(error) }
      }
      continue
    }

    const statusError = getError(statusData)
    if (statusError) return { target, uid, ok: false, error: statusError }
    if (isPending(statusData) && attempt < POLL_ATTEMPTS) continue

    const metrics = extractMetrics(statusData)
    const ok = metricsPass(metrics)
    const approvedMetrics = approvedKeywordMetrics(target)
    const keywordCoverage = keywordCoverageAssessment(target, approvedMetrics)
    return {
      target,
      uid,
      ok: ok && keywordCoverage.status !== 'fail',
      metrics,
      approvedKeywordMetrics: approvedMetrics,
      keywordCoverage,
      rawStatus: String(statusData.status ?? statusData.state ?? 'complete'),
    }
  }

  return { target, uid, ok: false, error: `Text.ru result was not ready after ${POLL_ATTEMPTS} attempts` }
}

async function main() {
  if (!['blog', 'blog-category', 'commercial', 'all'].includes(scope)) {
    throw new Error('Use --scope blog|blog-category|commercial|all')
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error('Use --limit=N with positive integer')
  }

  const targets = collectTargets()
  const results: TextRuResult[] = []

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log(`Text.ru check: ${execute ? 'execute' : 'dry-run'}`)
  console.log(`Scope: ${scope}`)
  if (ids.length > 0) console.log(`IDs: ${ids.join(', ')}`)
  console.log(`Offset: ${offset}`)
  console.log(`Targets: ${targets.length}`)
  console.log(`Min uniqueness: ${MIN_UNIQUENESS}`)
  console.log(`Max water percent: ${MAX_WATER_PERCENT}`)
  console.log(`Max spam percent: ${MAX_SPAM_PERCENT}`)

  for (const target of targets) {
    const result = await checkWithTextRu(target)
    results.push(result)
    const status = result.skipped ? 'SKIP' : result.ok ? 'PASS' : 'FAIL'
    const keywordDetails = result.approvedKeywordMetrics?.length
      ? `approved keys ${result.approvedKeywordMetrics.map((item) => `${item.role}:${item.keyword}=${item.count} (${item.density}%)`).join('; ')}`
      : ''
    const keywordCoverageDetails = result.keywordCoverage
      ? [
        `keyword coverage ${result.keywordCoverage.status.toUpperCase()}`,
        `total ${result.keywordCoverage.totalDensity}%`,
        typeof result.keywordCoverage.secondarySeoCoveragePercent === 'number'
          ? `secondary/seo ${result.keywordCoverage.secondarySeoCoveragePercent}%`
          : '',
        formatKeywordRoleMap(result.keywordCoverage.missingByRole, 'missing'),
        formatKeywordRoleMap(result.keywordCoverage.overusedByRole, 'overused'),
        result.keywordCoverage.issues.length > 0 ? `issues: ${result.keywordCoverage.issues.join(' | ')}` : '',
      ].filter(Boolean).join(', ')
      : ''
    const details = result.skipped
      ? [result.skipped, keywordCoverageDetails, keywordDetails].filter(Boolean).join(', ')
      : [
        typeof result.metrics?.uniqueness === 'number' ? `${result.metrics.uniqueness}% unique` : 'uniqueness ?',
        typeof result.metrics?.waterPercent === 'number' ? `water ${result.metrics.waterPercent}%` : '',
        typeof result.metrics?.spamPercent === 'number' ? `spam ${result.metrics.spamPercent}%` : '',
        keywordCoverageDetails,
        keywordDetails,
        result.error ? `error ${result.error}` : '',
      ].filter(Boolean).join(', ')
    console.log(`- ${status} ${target.route}: ${details}`)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    provider: 'text.ru',
    mode: execute ? 'execute' : 'dry-run',
    scope,
    ids,
    offset,
    minUniqueness: MIN_UNIQUENESS,
    maxWaterPercent: MAX_WATER_PERCENT,
    maxSpamPercent: MAX_SPAM_PERCENT,
    pollAttempts: POLL_ATTEMPTS,
    pollDelayMs: POLL_DELAY_MS,
    results,
  }

  const outputFile = path.join(
    OUTPUT_DIR,
    `text-ru-${scope}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
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
