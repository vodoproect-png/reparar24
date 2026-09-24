import fs from 'fs'
import path from 'path'
import { services } from '../data/services'
import { childServicesData } from '../data/fontanero/child-services-seo'
import { fontaneroHubFaqs } from '../data/fontanero/hub-page-content'
import { FONTANERO_SEO_MAP } from '../data/seo/fontanero-seo-map'
import { FontaneroCitySEOContent } from '../data/city-seo/fontanero'
import { FontaneroDistrictSEOContent } from '../data/district-seo/fontanero'
import { BLOG_CATEGORY_SEO } from '../data/blog/category-seo'
import { BLOG_ARTICLE_BRIEFS } from '../data/blog/topics'

type Row = { page: string; type: string; keyword: string; source: string }

function normalizeText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()[\]{}"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function csvEscape(value: string) {
  return `"${String(value).replace(/"/g, '""')}"`
}

const rows: Row[] = []

function add(page: string, type: string, values: unknown, source: string) {
  const list = Array.isArray(values) ? values : values ? [values] : []
  for (const raw of list) {
    if (typeof raw !== 'string') continue
    const keyword = raw.trim()
    if (!keyword) continue
    rows.push({ page, type, keyword, source })
  }
}

const fontanero = services.find((service) => service.slug === 'fontanero')
add('/fontanero', 'hub/service keywords', fontanero?.keywords, 'data/services.ts')
add(
  '/fontanero',
  'hub/seo phrases',
  [
    'fontanero 24 horas',
    'fontaneros profesionales',
    'fontanero urgente',
    'fontanero cerca de mi',
    'fontanero de urgencia',
    'precio hora fontanero',
  ],
  'data/fontanero/hub-page-content.ts',
)
add('/fontanero', 'hub/faq topics', fontaneroHubFaqs.map((faq) => faq.question), 'data/fontanero/hub-page-content.ts')
add('/fontanero', 'seo map faq topics', FONTANERO_SEO_MAP.hub.faqTopics, 'data/seo/fontanero-seo-map.ts')

for (const [slug, data] of Object.entries(childServicesData)) {
  const page = `/fontanero/${slug}`
  add(page, 'lockedPrimaryKw', data.lockedPrimaryKw, 'data/fontanero/child-services-seo.ts')
  add(page, 'secondaryKw', data.secondaryKw, 'data/fontanero/child-services-seo.ts')
  add(page, 'seoBlockKw', data.seoBlockKw, 'data/fontanero/child-services-seo.ts')
  add(page, 'faqKw', data.faqKw, 'data/fontanero/child-services-seo.ts')
  add(page, 'keywordTags', data.seoContent?.keywordTags, 'data/fontanero/child-services-seo.ts')
  add(page, 'seo map faq topics', FONTANERO_SEO_MAP.children[slug]?.faqTopics, 'data/seo/fontanero-seo-map.ts')
}

for (const entry of FontaneroCitySEOContent as any[]) {
  const citySlug = entry.citySlug || entry.city || 'unknown-city'
  const page = `/fontanero/${citySlug}`
  add(page, 'city primary', entry.keywords?.primary, 'data/city-seo/fontanero.ts')
  add(page, 'city secondary', entry.keywords?.secondary, 'data/city-seo/fontanero.ts')
  add(page, 'city longTail', entry.keywords?.longTail, 'data/city-seo/fontanero.ts')
  add(page, 'city semanticOwnership', entry.semanticOwnership, 'data/city-seo/fontanero.ts')
}

for (const entry of FontaneroDistrictSEOContent as any[]) {
  const citySlug = entry.citySlug || 'unknown-city'
  const districtSlug = entry.districtSlug || entry.slug || 'unknown-district'
  const page = `/fontanero/${citySlug}/${districtSlug}`
  add(page, 'district targetKeywords', entry.targetKeywords, 'data/district-seo/fontanero.ts')
  add(page, 'district keywords', entry.keywords, 'data/district-seo/fontanero.ts')
  add(page, 'district primary', entry.keywords?.primary, 'data/district-seo/fontanero.ts')
  add(page, 'district secondary', entry.keywords?.secondary, 'data/district-seo/fontanero.ts')
  add(page, 'district longTail', entry.keywords?.longTail, 'data/district-seo/fontanero.ts')
}

add('/blog/fontaneria', 'blog category keywords', BLOG_CATEGORY_SEO.fontaneria?.targetKeywords, 'data/blog/category-seo.ts')

for (const article of BLOG_ARTICLE_BRIEFS as any[]) {
  if (article.categorySlug !== 'fontaneria' && article.serviceSlug !== 'fontanero') continue
  const page = `/blog/${article.categorySlug}/${article.slug}`
  add(page, 'blog primaryKeyword', article.primaryKeyword, 'data/blog/topics.ts')
  add(page, 'blog secondaryKeywords', article.secondaryKeywords, 'data/blog/topics.ts')
}

const deduped: Row[] = []
const seen = new Set<string>()
for (const row of rows) {
  const key = `${row.page}|${normalizeText(row.keyword)}|${row.type}`
  if (seen.has(key)) continue
  seen.add(key)
  deduped.push(row)
}

const uniqueKeywords = [
  ...new Map(deduped.map((row) => [normalizeText(row.keyword), row.keyword])).values(),
].sort((a, b) => normalizeText(a).localeCompare(normalizeText(b)))

const byPage = new Map<string, Row[]>()
for (const row of deduped) {
  if (!byPage.has(row.page)) byPage.set(row.page, [])
  byPage.get(row.page)!.push(row)
}

const lines: string[] = []
lines.push('# Fontanero SEO Keywords Export')
lines.push('')
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`)
lines.push(`Total page-keyword rows: ${deduped.length}`)
lines.push(`Unique keywords/questions: ${uniqueKeywords.length}`)
lines.push('')
lines.push('## Unique List')
lines.push('')
for (const keyword of uniqueKeywords) lines.push(`- ${keyword}`)
lines.push('')
lines.push('## By Page')
lines.push('')
for (const [page, pageRows] of [...byPage.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  lines.push(`### ${page}`)
  lines.push('')
  for (const row of pageRows.sort((a, b) => a.type.localeCompare(b.type) || normalizeText(a.keyword).localeCompare(normalizeText(b.keyword)))) {
    lines.push(`- [${row.type}] ${row.keyword}`)
  }
  lines.push('')
}

const outDir = path.join(process.cwd(), 'docs', 'seo', 'exports')
fs.mkdirSync(outDir, { recursive: true })
const mdPath = path.join(outDir, 'fontanero-seo-keywords-2026-06-22.md')
const csvPath = path.join(outDir, 'fontanero-seo-keywords-2026-06-22.csv')
fs.writeFileSync(mdPath, lines.join('\n'), 'utf8')
fs.writeFileSync(
  csvPath,
  [
    'page,type,keyword,source',
    ...deduped.map((row) => [row.page, row.type, row.keyword, row.source].map(csvEscape).join(',')),
  ].join('\n'),
  'utf8',
)

console.log(`Markdown: ${path.relative(process.cwd(), mdPath)}`)
console.log(`CSV: ${path.relative(process.cwd(), csvPath)}`)
console.log(`Rows: ${deduped.length}`)
console.log(`Unique: ${uniqueKeywords.length}`)
