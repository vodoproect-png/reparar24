#!/usr/bin/env ts-node
// @ts-nocheck

const fs = require('fs')
const path = require('path')

const { aireAcondicionadoHubSeoContent, aireAcondicionadoHubFaqs } = require('../data/aire-acondicionado/hub-page-content')
const { aireAcondicionadoChildServicesData } = require('../data/aire-acondicionado/child-services-seo')
const { citySEOContent } = require('../data/city-seo-content')
const { districtSEOContent } = require('../data/district-seo-content')

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'docs')

const STOPWORDS = new Set([
  'a', 'al', 'ante', 'bajo', 'con', 'contra', 'de', 'del', 'desde', 'durante', 'e', 'el', 'en',
  'entre', 'es', 'esa', 'ese', 'esta', 'este', 'esto', 'la', 'las', 'lo', 'los', 'mas', 'muy',
  'o', 'para', 'por', 'que', 'se', 'sin', 'sobre', 'su', 'sus', 'un', 'una', 'unas', 'unos',
  'y', 'ya', 'aire', 'acondicionado', 'climatizacion', 'servicio', 'servicios', 'reparar24',
  'profesional', 'profesionales', 'presupuesto', 'previo', 'valencia',
])

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokens(value) {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter((token) => token.length > 3 && !STOPWORDS.has(token))
  )
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let intersection = 0
  for (const token of a) {
    if (b.has(token)) intersection += 1
  }
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
    ...(content.benefits || []),
    ...(content.keywordTags || []),
  ].filter(Boolean).join(' ')
}

function containsPhrase(text, phrase) {
  if (!phrase) return false
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|\\s)${escaped}(\\s|$)`).test(text)
}

const pages = []

pages.push({
  type: 'hub',
  slug: '/aire-acondicionado',
  title: aireAcondicionadoHubSeoContent.title,
  primary: 'aire acondicionado',
  keywords: aireAcondicionadoHubSeoContent.keywordTags || [],
  text: [
    seoContentText(aireAcondicionadoHubSeoContent),
    ...aireAcondicionadoHubFaqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(' '),
})

Object.entries(aireAcondicionadoChildServicesData).forEach(([slug, data]) => {
  pages.push({
    type: 'child',
    slug: `/aire-acondicionado/${slug}`,
    title: data.h1,
    primary: data.lockedPrimaryKw,
    keywords: [data.lockedPrimaryKw, ...(data.secondaryKw || []), ...(data.seoBlockKw || [])],
    text: [
      data.h1,
      data.metaTitle,
      data.metaDescription,
      data.description,
      seoContentText(data.seoContent),
      ...(data.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
    ].join(' '),
  })
})

citySEOContent
  .filter((entry) => entry.serviceId === 'aire-acondicionado')
  .forEach((entry) => {
    pages.push({
      type: 'city',
      slug: `/aire-acondicionado/${entry.citySlug}`,
      title: entry.metadata?.title || `Aire acondicionado ${entry.citySlug}`,
      primary: entry.keywords?.primary?.[0] || `aire acondicionado ${entry.citySlug}`,
      keywords: [...(entry.keywords?.primary || []), ...(entry.keywords?.secondary || []), ...(entry.keywords?.longTail || [])],
      text: [
        entry.metadata?.title,
        entry.metadata?.description,
        entry.seoText,
        ...(entry.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
      ].join(' '),
    })
  })

districtSEOContent
  .filter((entry) => entry.serviceId === 'aire-acondicionado')
  .forEach((entry) => {
    pages.push({
      type: 'district',
      slug: `/aire-acondicionado/${entry.citySlug}/${entry.districtSlug}`,
      title: entry.metadata?.title || `Aire acondicionado ${entry.districtSlug}`,
      primary: (entry.semanticOwnership || []).slice(0, 3).join(' '),
      keywords: entry.semanticOwnership || [],
      text: [
        entry.metadata?.title,
        entry.metadata?.description,
        entry.seoText,
        ...(entry.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
      ].join(' '),
    })
  })

const pageTokens = pages.map((page) => ({ ...page, tokenSet: tokens(page.text) }))
const pairIssues = []

for (let i = 0; i < pageTokens.length; i += 1) {
  for (let j = i + 1; j < pageTokens.length; j += 1) {
    const a = pageTokens[i]
    const b = pageTokens[j]
    const score = jaccard(a.tokenSet, b.tokenSet)
    const threshold = a.type === 'district' && b.type === 'district' ? 0.58 : 0.48
    if (score >= threshold) {
      pairIssues.push({
        score: Number(score.toFixed(3)),
        a: a.slug,
        aType: a.type,
        b: b.slug,
        bType: b.type,
      })
    }
  }
}

const phraseIssues = []
const childPrimaries = Object.entries(aireAcondicionadoChildServicesData)
  .map(([slug, data]) => ({ slug: `/aire-acondicionado/${slug}`, phrase: normalize(data.lockedPrimaryKw) }))

for (const page of pages) {
  if (page.type === 'city' || page.type === 'district') continue
  const text = normalize(page.text)
  for (const child of childPrimaries) {
    if (page.slug === child.slug || page.type === 'hub') continue
    if (containsPhrase(text, child.phrase)) {
      phraseIssues.push({ page: page.slug, type: page.type, competingPhrase: child.phrase, owner: child.slug })
    }
  }
}

const duplicatePrimaryGroups = Object.values(
  pages.reduce((acc, page) => {
    const key = normalize(page.primary)
    if (!key) return acc
    acc[key] ||= []
    acc[key].push(page.slug)
    return acc
  }, {})
).filter((group) => group.length > 1)

const report = {
  generatedAt: new Date().toISOString(),
  service: 'aire-acondicionado',
  pagesAudited: pages.length,
  coverage: {
    hub: pages.filter((page) => page.type === 'hub').length,
    child: pages.filter((page) => page.type === 'child').length,
    city: pages.filter((page) => page.type === 'city').length,
    district: pages.filter((page) => page.type === 'district').length,
  },
  duplicatePrimaryGroups,
  pairIssues: pairIssues.sort((a, b) => b.score - a.score),
  phraseIssues,
  pageSummary: pages.map((page) => ({
    type: page.type,
    slug: page.slug,
    primary: page.primary,
    keywordCount: page.keywords.length,
    textChars: page.text.length,
    uniqueTokens: tokens(page.text).size,
  })),
}

const lines = [
  '# Aire Acondicionado Cannibalization Audit',
  '',
  `Generated: ${report.generatedAt}`,
  '',
  '## Coverage',
  '',
  `- Pages audited: ${report.pagesAudited}`,
  `- Hub pages: ${report.coverage.hub}`,
  `- Child pages: ${report.coverage.child}`,
  `- City pages: ${report.coverage.city}`,
  `- District pages: ${report.coverage.district}`,
  '',
  '## Result',
  '',
  duplicatePrimaryGroups.length || pairIssues.length || phraseIssues.length
    ? 'Potential issues were found and should be reviewed.'
    : 'No critical cannibalization issues found in the current commercial group.',
  '',
  '## Duplicate Primary Ownership',
  '',
  duplicatePrimaryGroups.length
    ? duplicatePrimaryGroups.map((group) => `- ${group.join(', ')}`).join('\n')
    : '- None',
  '',
  '## High Similarity Pairs',
  '',
  pairIssues.length
    ? pairIssues.slice(0, 40).map((item) => `- ${item.score}: ${item.a} (${item.aType}) vs ${item.b} (${item.bType})`).join('\n')
    : '- None above threshold',
  '',
  '## Cross-Page Child Keyword Mentions',
  '',
  phraseIssues.length
    ? phraseIssues.slice(0, 80).map((item) => `- ${item.page} mentions "${item.competingPhrase}" owned by ${item.owner}`).join('\n')
    : '- None',
  '',
  '## Page Summary',
  '',
  ...report.pageSummary.map((page) => `- ${page.slug} (${page.type}): primary="${page.primary}", chars=${page.textChars}, uniqueTokens=${page.uniqueTokens}`),
  '',
]

fs.mkdirSync(OUT_DIR, { recursive: true })
const outPath = path.join(OUT_DIR, 'AIRE_ACONDICIONADO_CANNIBALIZATION_AUDIT.md')
fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8')

console.log(`Audit saved: ${path.relative(ROOT, outPath)}`)
console.log(JSON.stringify({
  pagesAudited: report.pagesAudited,
  coverage: report.coverage,
  duplicatePrimaryGroups: report.duplicatePrimaryGroups.length,
  highSimilarityPairs: report.pairIssues.length,
  crossPageChildKeywordMentions: report.phraseIssues.length,
}, null, 2))
