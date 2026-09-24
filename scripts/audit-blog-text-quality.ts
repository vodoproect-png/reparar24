#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')

type Severity = 'error' | 'warn' | 'info'

type ArticleAudit = {
  id: string
  route: string
  status: string
  indexing: string
  words: number
  sentences: number
  avgSentenceWords: number
  maxSentenceWords: number
  paragraphs: number
  avgParagraphWords: number
  lexicalDiversity: number
  waterRatio: number
  primaryKeywordDensity: number
  secondaryKeywordCoverage: number
  repeatedTerms: Array<{ term: string; count: number }>
  repeatedPhrases: Array<{ phrase: string; count: number }>
  secondaryKeywordsCovered: string[]
  secondaryKeywordsMissing: string[]
  findings: Array<{ severity: Severity; message: string }>
}

type SimilarityFinding = {
  a: string
  b: string
  score: number
}

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, '.tmp', 'blog-quality')
const args = process.argv.slice(2)
const includeDrafts = args.includes('--include-drafts')
const ids = getArgValue('--ids', '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean)

const STOPWORDS = new Set([
  'a', 'al', 'algo', 'ante', 'antes', 'asi', 'cada', 'como', 'con', 'contra', 'cuando', 'de', 'del',
  'desde', 'despues', 'donde', 'durante', 'el', 'ella', 'ellos', 'en', 'entre', 'era', 'es', 'esa',
  'ese', 'eso', 'esta', 'estan', 'estar', 'este', 'esto', 'hay', 'la', 'las', 'lo', 'los', 'mas',
  'menos', 'muy', 'no', 'nos', 'o', 'otra', 'otro', 'para', 'pero', 'por', 'porque', 'puede',
  'pueden', 'que', 'se', 'ser', 'si', 'sin', 'sobre', 'su', 'sus', 'tambien', 'te', 'tener', 'tiene',
  'tienen', 'un', 'una', 'unas', 'uno', 'y', 'ya',
])

const WATER_WORDS = new Set([
  'adecuado', 'adecuada', 'algunas', 'algunos', 'bastante', 'cierto', 'cierta', 'claro', 'correcto',
  'correcta', 'diferente', 'distintos', 'forma', 'general', 'habitual', 'habituales', 'importante',
  'mejor', 'muchas', 'muchos', 'necesario', 'necesaria', 'normal', 'posible', 'probable', 'recomendable',
  'sencillo', 'sencilla', 'suele', 'suelen', 'util', 'varias', 'varios',
])

const TEMPLATE_PHRASES = [
  'en reparar24',
  'presupuesto previo',
  'servicio profesional',
  'pagina comercial',
]

const LIMITS = {
  minWords: 750,
  reviewWords: 1000,
  maxPrimaryDensity: 2.5,
  minPrimaryDensity: 0.15,
  maxAvgSentenceWords: 27,
  maxSentenceWords: 48,
  maxWaterRatio: 15,
  maxRepeatedPhraseCount: 4,
  minSecondaryCoverage: 0.5,
  targetSecondaryCoverage: 0.75,
  similarityWarn: 0.3,
  similarityError: 0.42,
  uniformLengthDeltaWarn: 120,
}

function getArgValue(name: string, fallback: string): string {
  const inline = args.find((arg) => arg.startsWith(`${name}=`))
  if (inline) return inline.split('=').slice(1).join('=')

  const index = args.indexOf(name)
  if (index >= 0 && args[index + 1]) return args[index + 1]

  return fallback
}

function normalize(value: string): string {
  let normalized = String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  for (const phrase of TEMPLATE_PHRASES) {
    normalized = normalized.replaceAll(phrase, ' ')
  }

  return normalized.replace(/\s+/g, ' ').trim()
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

function contentWords(value: string): string[] {
  return tokenize(value).filter((word) => !STOPWORDS.has(word))
}

function countPhrase(text: string, phrase: string): number {
  const normalizedText = ` ${normalize(text)} `
  const normalizedPhrase = normalize(phrase)
  if (!normalizedPhrase) return 0
  const pattern = new RegExp(` ${escapeRegex(normalizedPhrase)} `, 'g')
  const exactCount = normalizedText.match(pattern)?.length ?? 0
  if (exactCount > 0) return exactCount

  const phraseWords = contentWords(phrase)
  if (phraseWords.length < 2) return 0

  const textWords = contentWords(text)
  let flexibleCount = 0
  for (let index = 0; index <= textWords.length - phraseWords.length; index += 1) {
    if (phraseWords.every((word, offset) => textWords[index + offset] === word)) {
      flexibleCount += 1
    }
  }

  return flexibleCount
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function articleText(article: any): string {
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
    .filter(Boolean)
    .join('\n\n')
}

function paragraphs(article: any): string[] {
  return article.bodySections?.flatMap((section: any) => section.paragraphs ?? []) ?? []
}

function sentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 20)
}

function topCounts(items: string[], limit: number): Array<{ term: string; count: number }> {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(item, (counts.get(item) ?? 0) + 1)

  return Array.from(counts.entries())
    .map(([term, count]) => ({ term, count }))
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term))
    .slice(0, limit)
}

function ngrams(words: string[], size: number): string[] {
  const result: string[] = []
  for (let index = 0; index <= words.length - size; index += 1) {
    result.push(words.slice(index, index + size).join(' '))
  }
  return result
}

function shingles(words: string[], size = 7): Set<string> {
  return new Set(ngrams(words, size))
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0
  let intersection = 0
  for (const value of a) {
    if (b.has(value)) intersection += 1
  }
  return intersection / (a.size + b.size - intersection)
}

function density(count: number, totalWords: number): number {
  if (!totalWords) return 0
  return Number(((count / totalWords) * 100).toFixed(2))
}

function auditArticle(article: any): ArticleAudit {
  const id = `${article.categorySlug}/${article.slug}`
  const route = `/blog/${article.categorySlug}/${article.slug}`
  const text = articleText(article)
  const allWords = tokenize(text)
  const meaningfulWords = contentWords(text)
  const sentenceList = sentences(text)
  const sentenceWordCounts = sentenceList.map((sentence) => tokenize(sentence).length)
  const paragraphWordCounts = paragraphs(article).map((paragraph) => tokenize(paragraph).length)
  const uniqueMeaningfulWords = new Set(meaningfulWords)
  const primaryKeywordCount = countPhrase(text, article.primaryKeyword)
  const secondaryHits = article.secondaryKeywords.filter((keyword: string) => countPhrase(text, keyword) > 0)
  const secondaryMissing = article.secondaryKeywords.filter((keyword: string) => countPhrase(text, keyword) === 0)
  const waterCount = allWords.filter((word) => WATER_WORDS.has(word)).length
  const repeatedTerms = topCounts(meaningfulWords, 10)
  const repeatedPhrases = topCounts([...ngrams(meaningfulWords, 2), ...ngrams(meaningfulWords, 3)], 12)
    .filter((item) => item.count >= 3)
    .map((item) => ({ phrase: item.term, count: item.count }))

  const audit: ArticleAudit = {
    id,
    route,
    status: article.status,
    indexing: article.indexing,
    words: allWords.length,
    sentences: sentenceList.length,
    avgSentenceWords: Number((sentenceWordCounts.reduce((sum, value) => sum + value, 0) / Math.max(sentenceWordCounts.length, 1)).toFixed(1)),
    maxSentenceWords: Math.max(0, ...sentenceWordCounts),
    paragraphs: paragraphWordCounts.length,
    avgParagraphWords: Number((paragraphWordCounts.reduce((sum, value) => sum + value, 0) / Math.max(paragraphWordCounts.length, 1)).toFixed(1)),
    lexicalDiversity: Number(((uniqueMeaningfulWords.size / Math.max(meaningfulWords.length, 1)) * 100).toFixed(1)),
    waterRatio: density(waterCount, allWords.length),
    primaryKeywordDensity: density(primaryKeywordCount * tokenize(article.primaryKeyword).length, allWords.length),
    secondaryKeywordCoverage: Number((secondaryHits.length / Math.max(article.secondaryKeywords.length, 1)).toFixed(2)),
    repeatedTerms,
    repeatedPhrases,
    secondaryKeywordsCovered: secondaryHits,
    secondaryKeywordsMissing: secondaryMissing,
    findings: [],
  }

  if (audit.words < LIMITS.minWords) audit.findings.push({ severity: 'error', message: `thin article body: ${audit.words} words` })
  if (audit.words >= LIMITS.minWords && audit.words < LIMITS.reviewWords) audit.findings.push({ severity: 'info', message: `short article, confirm topic is narrow: ${audit.words} words` })
  if (audit.primaryKeywordDensity > LIMITS.maxPrimaryDensity) audit.findings.push({ severity: 'warn', message: `primary keyword density is high: ${audit.primaryKeywordDensity}%` })
  if (audit.primaryKeywordDensity < LIMITS.minPrimaryDensity) audit.findings.push({ severity: 'info', message: `primary keyword density is low: ${audit.primaryKeywordDensity}%` })
  if (audit.secondaryKeywordCoverage < LIMITS.minSecondaryCoverage) audit.findings.push({ severity: 'warn', message: `secondary keyword coverage is low: ${Math.round(audit.secondaryKeywordCoverage * 100)}%` })
  if (audit.secondaryKeywordCoverage >= LIMITS.minSecondaryCoverage && audit.secondaryKeywordCoverage < LIMITS.targetSecondaryCoverage) audit.findings.push({ severity: 'info', message: `secondary keyword coverage can be improved: ${Math.round(audit.secondaryKeywordCoverage * 100)}%` })
  if (audit.avgSentenceWords > LIMITS.maxAvgSentenceWords) audit.findings.push({ severity: 'warn', message: `average sentence is long: ${audit.avgSentenceWords} words` })
  if (audit.maxSentenceWords > LIMITS.maxSentenceWords) audit.findings.push({ severity: 'warn', message: `long sentence found: ${audit.maxSentenceWords} words` })
  if (audit.waterRatio > LIMITS.maxWaterRatio) audit.findings.push({ severity: 'warn', message: `water-word ratio is high: ${audit.waterRatio}%` })

  const heavyRepeatedPhrases = audit.repeatedPhrases.filter((item) => item.count > LIMITS.maxRepeatedPhraseCount)
  if (heavyRepeatedPhrases.length) {
    audit.findings.push({
      severity: 'warn',
      message: `repeated phrase pressure: ${heavyRepeatedPhrases.slice(0, 3).map((item) => `${item.phrase} x${item.count}`).join(', ')}`,
    })
  }

  return audit
}

function loadTargets(): any[] {
  return BLOG_ARTICLE_BRIEFS
    .filter((article: any) => includeDrafts || ['ready', 'published'].includes(article.status))
    .filter((article: any) => !ids.length || ids.includes(`${article.categorySlug}/${article.slug}`))
}

function auditSimilarity(articles: any[]): SimilarityFinding[] {
  const prepared = articles.map((article: any) => ({
    id: `${article.categorySlug}/${article.slug}`,
    shingles: shingles(contentWords(articleText(article))),
  }))
  const findings: SimilarityFinding[] = []

  for (let i = 0; i < prepared.length; i += 1) {
    for (let j = i + 1; j < prepared.length; j += 1) {
      const score = Number(jaccard(prepared[i].shingles, prepared[j].shingles).toFixed(3))
      if (score >= LIMITS.similarityWarn) {
        findings.push({ a: prepared[i].id, b: prepared[j].id, score })
      }
    }
  }

  return findings.sort((a, b) => b.score - a.score)
}

function severityRank(severity: Severity): number {
  return severity === 'error' ? 0 : severity === 'warn' ? 1 : 2
}

function main() {
  const articles = loadTargets()
  const articleAudits = articles.map(auditArticle)
  const similarity = auditSimilarity(articles)
  const wordCounts = articleAudits.map((article: ArticleAudit) => article.words)
  const minWords = wordCounts.length ? Math.min(...wordCounts) : 0
  const maxWords = wordCounts.length ? Math.max(...wordCounts) : 0
  const uniformLengthWarning =
    articleAudits.length >= 3 &&
    maxWords > 0 &&
    maxWords - minWords < LIMITS.uniformLengthDeltaWarn
  const generatedAt = new Date().toISOString()

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  const reportPath = path.join(OUTPUT_DIR, `blog-text-quality-${generatedAt.replace(/[:.]/g, '-')}.json`)
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt,
    limits: LIMITS,
    totals: {
      articles: articleAudits.length,
      minWords,
      maxWords,
      uniformLengthWarning,
    },
    articles: articleAudits,
    similarity,
  }, null, 2))

  const totalFindings = articleAudits.flatMap((article) => article.findings.map((finding) => ({ ...finding, id: article.id })))
  const errors = totalFindings.filter((finding) => finding.severity === 'error').length
  const warnings = totalFindings.filter((finding) => finding.severity === 'warn').length + (uniformLengthWarning ? 1 : 0)

  console.log(`Blog text quality audit: ${articles.length} articles`)
  console.log(`Errors: ${errors}`)
  console.log(`Warnings: ${warnings}`)
  console.log(`Similarity pairs >= ${LIMITS.similarityWarn}: ${similarity.length}`)
  if (uniformLengthWarning) {
    console.log(`Length warning: article batch is too uniform (${minWords}-${maxWords} words). Plan by intent depth, not by word counter.`)
  }

  console.log('\nArticle summary')
  for (const article of articleAudits) {
    const findingBadge = article.findings.length
      ? article.findings
        .sort((a, b) => severityRank(a.severity) - severityRank(b.severity))
        .map((finding) => `${finding.severity}: ${finding.message}`)
        .slice(0, 3)
        .join(' | ')
      : 'ok'

    console.log(`- ${article.id}: ${article.words} words, PK ${article.primaryKeywordDensity}%, secondary ${Math.round(article.secondaryKeywordCoverage * 100)}%, water ${article.waterRatio}%, avg sentence ${article.avgSentenceWords}; ${findingBadge}`)
    if (article.secondaryKeywordsMissing.length) {
      console.log(`  missing secondary: ${article.secondaryKeywordsMissing.join(', ')}`)
    }
  }

  if (similarity.length) {
    console.log('\nPotential internal similarity')
    for (const item of similarity.slice(0, 12)) {
      const severity = item.score >= LIMITS.similarityError ? 'error' : 'warn'
      console.log(`- ${severity} ${item.a} <-> ${item.b}: ${Math.round(item.score * 100)}%`)
    }
  }

  console.log(`\nReport: ${path.relative(ROOT, reportPath)}`)

  if (errors > 0 || similarity.some((item) => item.score >= LIMITS.similarityError)) {
    process.exitCode = 1
  }
}

main()
