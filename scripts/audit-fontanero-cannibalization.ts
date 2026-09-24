#!/usr/bin/env ts-node
// @ts-nocheck

const fs = require('fs')
const path = require('path')

const { services } = require('../data/services')
const { childServicesData } = require('../data/fontanero/child-services-seo')
const { fontaneroHubFaqs, fontaneroHubSeoContent } = require('../data/fontanero/hub-page-content')
const { FONTANERO_SEMANTIC_MAP } = require('../data/seo/fontanero-semantic-map')
const { FONTANERO_CLUSTERS } = require('../data/seo/fontanero-clusters')
const { FontaneroCitySEOContent } = require('../data/city-seo/fontanero')
const { FontaneroDistrictSEOContent } = require('../data/district-seo/fontanero')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')

const ROOT = process.cwd()
const OUT_PATH = path.join(ROOT, 'docs', 'seo', 'fontanero-cannibalization-reaudit-2026-06-22.md')

const STOPWORDS = new Set([
  'a', 'al', 'ante', 'bajo', 'con', 'contra', 'de', 'del', 'desde', 'durante', 'e', 'el', 'en',
  'entre', 'es', 'esta', 'este', 'esto', 'la', 'las', 'lo', 'los', 'mas', 'muy', 'o', 'para',
  'por', 'que', 'se', 'sin', 'sobre', 'su', 'sus', 'un', 'una', 'unas', 'unos', 'y', 'ya',
  '24', '24h', 'horas', 'servicio', 'servicios', 'profesional', 'profesionales', 'presupuesto',
  'previo', 'reparar24', 'valencia', 'madrid', 'barcelona', 'sevilla', 'malaga', 'zaragoza',
  'fontanero', 'fontaneros', 'fontaneria', 'urgente', 'urgencias',
])

const GENERIC_KEYWORDS = new Set([
  'fontanero',
  'fontanero urgente',
  'fontanero 24 horas',
  'fontanero cerca de mi',
  'precio fontanero valencia',
])

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:()[\]{}"'`]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenSet(value) {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter((token) => token.length > 2 && !STOPWORDS.has(token)),
  )
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  for (const token of a) if (b.has(token)) intersection += 1
  const union = a.size + b.size - intersection
  return union ? intersection / union : 0
}

function seoContentText(content) {
  if (!content) return ''
  return [
    content.badge,
    content.title,
    ...(content.intro || []),
    ...(content.serviceCards || []).flatMap((card) => [card.title, ...(card.bullets || [])]),
    content.localCoverage?.title,
    content.localCoverage?.description,
    content.benefitsTitle,
    ...(content.benefits || []),
    content.keywordsTitle,
    ...(content.keywordTags || []),
  ].filter(Boolean).join(' ')
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))]
}

function pageKeywordList(data) {
  return uniq([
    data.lockedPrimaryKw,
    ...(data.secondaryKw || []),
    ...(data.seoBlockKw || []),
    ...(data.faqKw || []),
    ...(data.seoContent?.keywordTags || []),
  ])
}

const pages = []
const fontaneroService = services.find((service) => service.slug === 'fontanero')

pages.push({
  type: 'hub',
  slug: '/fontanero',
  primary: 'fontanero',
  keywords: uniq([
    ...(fontaneroService?.keywords || []),
    'fontanero 24 horas',
    'fontanero urgente',
    'fontanero cerca de mi',
    'precio hora fontanero',
  ]),
  text: [
    fontaneroHubSeoContent?.title,
    seoContentText(fontaneroHubSeoContent),
    ...(fontaneroHubFaqs || []).flatMap((faq) => [faq.question, faq.answer]),
  ].join(' '),
})

Object.entries(childServicesData).forEach(([slug, data]) => {
  pages.push({
    type: 'child',
    slug: `/fontanero/${slug}`,
    primary: data.lockedPrimaryKw,
    keywords: pageKeywordList(data),
    text: [
      data.h1,
      data.metaTitle,
      data.metaDescription,
      data.description,
      data.contentBrief,
      seoContentText(data.seoContent),
      ...(data.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
    ].join(' '),
  })
})

;(FontaneroCitySEOContent || []).forEach((entry) => {
  pages.push({
    type: 'city',
    slug: `/fontanero/${entry.citySlug}`,
    primary: entry.keywords?.primary?.[0] || `fontanero ${entry.citySlug}`,
    keywords: uniq([
      ...(entry.keywords?.primary || []),
      ...(entry.keywords?.secondary || []),
      ...(entry.keywords?.longTail || []),
      ...(entry.semanticOwnership || []),
    ]),
    text: [
      entry.metadata?.title,
      entry.metadata?.description,
      entry.seoText,
      ...(entry.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
    ].join(' '),
  })
})

;(FontaneroDistrictSEOContent || []).forEach((entry) => {
  pages.push({
    type: 'district',
    slug: `/fontanero/${entry.citySlug}/${entry.districtSlug}`,
    primary: entry.targetKeywords?.[0] || entry.keywords?.primary?.[0] || `${entry.districtSlug} fontanero`,
    keywords: uniq([
      ...(entry.targetKeywords || []),
      ...(entry.keywords?.primary || []),
      ...(entry.keywords?.secondary || []),
      ...(entry.keywords?.longTail || []),
    ]),
    text: [
      entry.metadata?.title,
      entry.metadata?.description,
      entry.seoText,
      ...(entry.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
    ].join(' '),
  })
})

const blogArticles = (BLOG_ARTICLE_BRIEFS || [])
  .filter((article) => article.categorySlug === 'fontaneria' || article.serviceSlug === 'fontanero')
  .map((article) => ({
    slug: `/blog/${article.categorySlug}/${article.slug}`,
    primary: article.primaryKeyword,
    secondary: article.secondaryKeywords || [],
    commercialOwner: article.commercialOwner,
    supportLinks: article.supportLinks || [],
  }))

const ownershipPages = pages.filter((page) => page.type === 'hub' || page.type === 'child')
const duplicatePrimaryGroups = Object.values(
  ownershipPages.reduce((acc, page) => {
    const key = normalize(page.primary)
    if (!key) return acc
    acc[key] ||= []
    acc[key].push(page.slug)
    return acc
  }, {}),
).filter((group) => group.length > 1)

const childPages = pages.filter((page) => page.type === 'child')
const tokenPages = childPages.map((page) => ({ ...page, tokens: tokenSet(page.text) }))
const highSimilarityPairs = []

for (let i = 0; i < tokenPages.length; i += 1) {
  for (let j = i + 1; j < tokenPages.length; j += 1) {
    const score = jaccard(tokenPages[i].tokens, tokenPages[j].tokens)
    if (score >= 0.42) {
      highSimilarityPairs.push({
        score: Number(score.toFixed(3)),
        a: tokenPages[i].slug,
        b: tokenPages[j].slug,
      })
    }
  }
}

const exactKeywordOwners = new Map()
for (const page of childPages) {
  for (const keyword of page.keywords) {
    const key = normalize(keyword)
    if (!key || GENERIC_KEYWORDS.has(key)) continue
    if (!exactKeywordOwners.has(key)) exactKeywordOwners.set(key, [])
    exactKeywordOwners.get(key).push({ page: page.slug, keyword })
  }
}

const duplicateChildKeywords = [...exactKeywordOwners.entries()]
  .map(([key, owners]) => ({ key, owners }))
  .filter((item) => new Set(item.owners.map((owner) => owner.page)).size > 1)
  .sort((a, b) => b.owners.length - a.owners.length || a.key.localeCompare(b.key))

const semanticSlugs = new Set((FONTANERO_SEMANTIC_MAP.existingPageTargets || []).map((item) => item.slug))
const clusterSlugs = new Set((FONTANERO_CLUSTERS || []).map((item) => item.slug))
const productionSlugs = new Set(Object.keys(childServicesData || {}))

const architectureMismatches = [
  ...[...semanticSlugs].filter((slug) => !productionSlugs.has(slug)).map((slug) => `semantic approved but missing production child: ${slug}`),
  ...[...productionSlugs].filter((slug) => !semanticSlugs.has(slug)).map((slug) => `production child missing semantic owner: ${slug}`),
  ...[...clusterSlugs].filter((slug) => !semanticSlugs.has(slug)).map((slug) => `cluster missing semantic owner: ${slug}`),
]

const blogOwnerIssues = blogArticles
  .filter((article) => article.commercialOwner && !article.commercialOwner.startsWith('/fontanero'))
  .map((article) => `${article.slug} owner=${article.commercialOwner}`)

const blogCommercialCollisions = []
for (const article of blogArticles) {
  const articleTerms = [article.primary, ...article.secondary].map(normalize).filter(Boolean)
  for (const page of childPages) {
    const pageTerms = page.keywords.map(normalize)
    const overlap = articleTerms.filter((term) => pageTerms.includes(term))
    if (!overlap.length) continue
    const expectedOwner = page.slug
    const currentOwner = article.commercialOwner
    if (currentOwner && currentOwner !== expectedOwner) {
      blogCommercialCollisions.push({
        article: article.slug,
        currentOwner,
        expectedOwner,
        overlap,
      })
    }
  }
}

const resultHasCritical =
  duplicatePrimaryGroups.length > 0 ||
  architectureMismatches.length > 0 ||
  highSimilarityPairs.length > 0 ||
  duplicateChildKeywords.length > 0 ||
  blogOwnerIssues.length > 0 ||
  blogCommercialCollisions.length > 0

const lines = [
  '# Fontanero Cannibalization Reaudit',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Coverage',
  '',
  `- Total pages modeled: ${pages.length}`,
  `- Hub pages: ${pages.filter((page) => page.type === 'hub').length}`,
  `- Child service pages: ${childPages.length}`,
  `- City pages: ${pages.filter((page) => page.type === 'city').length}`,
  `- District pages: ${pages.filter((page) => page.type === 'district').length}`,
  `- Fontaneria blog articles checked: ${blogArticles.length}`,
  '',
  '## Result',
  '',
  resultHasCritical
    ? 'Potential cannibalization or ownership issues were found and should be reviewed.'
    : 'No critical cannibalization issues found after keyword encoding cleanup.',
  '',
  '## Duplicate Primary Ownership',
  '',
  duplicatePrimaryGroups.length ? duplicatePrimaryGroups.map((group) => `- ${group.join(', ')}`).join('\n') : '- None',
  '',
  '## Architecture Alignment',
  '',
  architectureMismatches.length ? architectureMismatches.map((item) => `- ${item}`).join('\n') : '- Semantic map, clusters and production child pages are aligned.',
  '',
  '## High Similarity Child Pairs',
  '',
  highSimilarityPairs.length
    ? highSimilarityPairs.sort((a, b) => b.score - a.score).map((item) => `- ${item.score}: ${item.a} vs ${item.b}`).join('\n')
    : '- None above threshold',
  '',
  '## Exact Child Keyword Overlap',
  '',
  duplicateChildKeywords.length
    ? duplicateChildKeywords.slice(0, 80).map((item) => `- "${item.key}": ${item.owners.map((owner) => owner.page).join(', ')}`).join('\n')
    : '- None',
  '',
  '## Blog Owner Issues',
  '',
  blogOwnerIssues.length ? blogOwnerIssues.map((item) => `- ${item}`).join('\n') : '- None',
  '',
  '## Blog Commercial Keyword Collisions',
  '',
  blogCommercialCollisions.length
    ? blogCommercialCollisions.slice(0, 80).map((item) => `- ${item.article}: owner ${item.currentOwner}, exact overlap with ${item.expectedOwner}: ${item.overlap.join(', ')}`).join('\n')
    : '- None',
  '',
  '## Child Page Summary',
  '',
  ...childPages.map((page) => `- ${page.slug}: primary="${page.primary}", keywords=${page.keywords.length}, uniqueTokens=${tokenSet(page.text).size}`),
  '',
]

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
fs.writeFileSync(OUT_PATH, `${lines.join('\n')}\n`, 'utf8')

console.log(`Audit saved: ${path.relative(ROOT, OUT_PATH)}`)
console.log(JSON.stringify({
  pagesModeled: pages.length,
  childPages: childPages.length,
  blogArticles: blogArticles.length,
  duplicatePrimaryGroups: duplicatePrimaryGroups.length,
  architectureMismatches: architectureMismatches.length,
  highSimilarityChildPairs: highSimilarityPairs.length,
  exactChildKeywordOverlaps: duplicateChildKeywords.length,
  blogOwnerIssues: blogOwnerIssues.length,
  blogCommercialCollisions: blogCommercialCollisions.length,
}, null, 2))
