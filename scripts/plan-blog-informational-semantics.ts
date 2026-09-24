import fs from 'fs'
import path from 'path'

import { childServicesData as fontaneroChildServices } from '../data/fontanero/child-services-seo'
import { childServicesData as electricistaChildServices } from '../data/electricista/child-services-seo'
import { desatascosChildServicesData } from '../data/desatascos/child-services-seo'
import { aireAcondicionadoChildServicesData } from '../data/aire-acondicionado/child-services-seo'
import { calefaccionChildServicesData } from '../data/calefaccion/child-services-seo'
import { limpiezaTuberiasChildServicesData } from '../data/limpieza-tuberias/child-services-seo'
import { BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS } from '../data/blog/informational-semantics'

type ChildServiceLike = {
  h1: string
  lockedPrimaryKw: string
  secondaryKw?: string[]
  seoBlockKw?: string[]
  faqKw?: string[]
  contentBrief?: string
}

type ServiceGroup = {
  serviceSlug: string
  blogCategorySlug: string
  childServices: Record<string, ChildServiceLike>
}

type KeywordCandidate = {
  keyword: string
  volume: number
  sourceFile: string
  bucket?: string
  reason?: string
}

type PlannedTopic = {
  status: 'existing' | 'candidate' | 'needs-dataforseo'
  serviceSlug: string
  blogCategorySlug: string
  commercialOwner: string
  childServiceSlug: string
  childServiceTitle: string
  proposedArticleSlug: string
  proposedTitle: string
  primaryKeyword: string
  approvedKeywords: string[]
  source: string
  priority: number
  notes: string
}

const serviceGroups: ServiceGroup[] = [
  {
    serviceSlug: 'fontanero',
    blogCategorySlug: 'fontaneria',
    childServices: fontaneroChildServices,
  },
  {
    serviceSlug: 'electricista',
    blogCategorySlug: 'electricidad',
    childServices: electricistaChildServices,
  },
  {
    serviceSlug: 'desatascos',
    blogCategorySlug: 'desatascos',
    childServices: desatascosChildServicesData,
  },
  {
    serviceSlug: 'aire-acondicionado',
    blogCategorySlug: 'climatizacion',
    childServices: aireAcondicionadoChildServicesData,
  },
  {
    serviceSlug: 'calefaccion',
    blogCategorySlug: 'calefaccion',
    childServices: calefaccionChildServicesData,
  },
  {
    serviceSlug: 'limpieza-tuberias',
    blogCategorySlug: 'saneamiento',
    childServices: limpiezaTuberiasChildServicesData,
  },
]

const mojibakePairs: Array<[RegExp, string]> = [
  [/ГЎ/g, 'a'],
  [/Г©/g, 'e'],
  [/Г­/g, 'i'],
  [/Гі/g, 'o'],
  [/Гє/g, 'u'],
  [/Г±/g, 'n'],
  [/Гј/g, 'u'],
  [/Г/g, ''],
  [/Вї/g, ''],
  [/В/g, ''],
  [/в‚¬/g, 'euro'],
  [/рџ[^\s]*/g, ''],
]

function normalizeText(value: string): string {
  let text = value
  for (const [pattern, replacement] of mojibakePairs) {
    text = text.replace(pattern, replacement)
  }

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,:;()[\]{}"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function displayText(value: string): string {
  return normalizeText(value)
}

function slugify(value: string): string {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
}

function csvEscape(value: string | number): string {
  const text = String(value)
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function isInformationalKeyword(keyword: string): boolean {
  const normalized = normalizeText(keyword)

  if (normalized.length < 8) return false
  if (/\b(pdf|manual tecnico|curso|trabajo|empleo|amazon|leroy|bricomart|wikipedia|youtube)\b/.test(normalized)) {
    return false
  }

  const strongInfo =
    /^(como|que hacer|por que|porque|cuando|cuanto|que significa|donde|cual|cuales)\b/.test(normalized) ||
    /\b(sintoma|sintomas|causa|causas|consejo|guia|diagnostico|detectar|localizar|saber si|evitar|solucionar|revisar)\b/.test(normalized)

  const problemInfo =
    /\b(no funciona|no enciende|no arranca|no enfria|no calienta|pierde agua|gotea|atascad|salta|olor|huele mal|ruido|presion baja|fuga|cortocircuito|diferencial|cisterna|radiador|caldera|bajante|arqueta)\b/.test(normalized)

  const costInfo = /\b(cuanto cuesta|precio|tarifa|coste)\b/.test(normalized)

  return strongInfo || problemInfo || costInfo
}

function titleFromKeyword(keyword: string): string {
  const normalized = displayText(keyword)

  if (/^(como|que hacer|por que|cuando|cuanto|que significa)\b/.test(normalized)) {
    return `¿${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}?`
  }

  if (/\b(no funciona|no enciende|no arranca|no enfria|no calienta|pierde agua|gotea|atascad|salta|huele mal|olor|ruido|presion baja)\b/.test(normalized)) {
    return `¿Qué revisar si ${normalized}?`
  }

  if (/\b(precio|coste|tarifa)\b/.test(normalized)) {
    return `¿Cuánto cuesta ${normalized.replace(/\b(precio|coste|tarifa)\b/g, '').trim()}?`
  }

  return `Guía práctica sobre ${normalized}`
}

function collectTokens(service: ChildServiceLike): Set<string> {
  const values = [
    service.h1,
    service.lockedPrimaryKw,
    ...(service.secondaryKw ?? []),
    ...(service.seoBlockKw ?? []),
    ...(service.faqKw ?? []),
  ]

  const stopWords = new Set([
    'de',
    'del',
    'la',
    'el',
    'en',
    'y',
    'para',
    'con',
    'sin',
    'un',
    'una',
    'por',
    'que',
    'como',
    'cuanto',
    'cuando',
    'valencia',
    'servicio',
    'reparacion',
    'instalacion',
  ])

  const tokens = new Set<string>()
  for (const value of values) {
    for (const token of normalizeText(value).split(' ')) {
      if (token.length < 4 || stopWords.has(token)) continue
      tokens.add(token)
    }
  }

  return tokens
}

function scoreKeyword(keyword: string, tokens: Set<string>): number {
  const normalized = normalizeText(keyword)
  let score = 0

  for (const token of tokens) {
    if (normalized.includes(token)) score += token.length > 6 ? 2 : 1
  }

  if (isInformationalKeyword(keyword)) score += 3
  return score
}

function extractKeywordCandidatesFromObject(value: unknown, sourceFile: string, output: KeywordCandidate[]): void {
  if (!value || typeof value !== 'object') return

  if (!Array.isArray(value)) {
    const record = value as Record<string, unknown>
    if (typeof record.keyword === 'string') {
      output.push({
        keyword: record.keyword,
        volume: typeof record.volume === 'number' ? record.volume : 0,
        bucket: typeof record.bucket === 'string' ? record.bucket : undefined,
        reason: typeof record.reason === 'string' ? record.reason : undefined,
        sourceFile,
      })
    }
  }

  for (const child of Array.isArray(value) ? value : Object.values(value as Record<string, unknown>)) {
    extractKeywordCandidatesFromObject(child, sourceFile, output)
  }
}

function loadReviewKeywordPool(): KeywordCandidate[] {
  const reviewDir = path.join(process.cwd(), '.tmp', 'semantic-review')
  if (!fs.existsSync(reviewDir)) return []

  const pool: KeywordCandidate[] = []
  const files = fs
    .readdirSync(reviewDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(reviewDir, file))

  for (const file of files) {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'))
      extractKeywordCandidatesFromObject(parsed, path.relative(process.cwd(), file), pool)
    } catch {
      // Keep the planner tolerant: one broken review file must not block the full semantic inventory.
    }
  }

  const seen = new Set<string>()
  return pool
    .map((candidate) => ({
      ...candidate,
      keyword: displayText(candidate.keyword),
    }))
    .filter((candidate) => {
      const key = normalizeText(candidate.keyword)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function childSeedCandidates(service: ChildServiceLike): KeywordCandidate[] {
  const values = [
    ...(service.faqKw ?? []),
    ...(service.secondaryKw ?? []),
    ...(service.seoBlockKw ?? []),
    service.lockedPrimaryKw,
  ]

  const seen = new Set<string>()
  return values
    .map((keyword) => displayText(keyword))
    .filter((keyword) => {
      const key = normalizeText(keyword)
      if (seen.has(key)) return false
      seen.add(key)
      return isInformationalKeyword(keyword)
    })
    .map((keyword) => ({
      keyword,
      volume: 0,
      sourceFile: 'child-service-seo-data',
    }))
}

const existingClustersByOwner = new Map<string, typeof BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS>()
const existingKeywords = new Set<string>()

for (const cluster of BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS) {
  const list = existingClustersByOwner.get(cluster.commercialOwner) ?? []
  list.push(cluster)
  existingClustersByOwner.set(cluster.commercialOwner, list)
  for (const keyword of cluster.approvedKeywords) {
    existingKeywords.add(normalizeText(keyword))
  }
}

const keywordPool = loadReviewKeywordPool()
const plannedTopics: PlannedTopic[] = []

for (const group of serviceGroups) {
  for (const [childServiceSlug, childService] of Object.entries(group.childServices)) {
    const commercialOwner = `/${group.serviceSlug}/${childServiceSlug}`
    const existing = existingClustersByOwner.get(commercialOwner) ?? []

    for (const cluster of existing) {
      plannedTopics.push({
        status: 'existing',
        serviceSlug: group.serviceSlug,
        blogCategorySlug: group.blogCategorySlug,
        commercialOwner,
        childServiceSlug,
        childServiceTitle: displayText(childService.h1),
        proposedArticleSlug: cluster.articleSlug,
        proposedTitle: titleFromKeyword(cluster.approvedKeywords[0] ?? cluster.articleSlug),
        primaryKeyword: displayText(cluster.approvedKeywords[0] ?? cluster.articleSlug),
        approvedKeywords: cluster.approvedKeywords.map(displayText),
        source: cluster.sourceFile,
        priority: 100,
        notes: cluster.notes,
      })
    }

    const tokens = collectTokens(childService)
    const localCandidates = [
      ...childSeedCandidates(childService),
      ...keywordPool
        .filter((candidate) => isInformationalKeyword(candidate.keyword))
        .map((candidate) => ({
          ...candidate,
          matchScore: scoreKeyword(candidate.keyword, tokens),
        }))
        .filter((candidate) => candidate.matchScore >= 5)
        .sort((a, b) => b.matchScore - a.matchScore || b.volume - a.volume)
        .slice(0, 12),
    ]

    const dedupedCandidates = new Map<string, KeywordCandidate>()
    for (const candidate of localCandidates) {
      const key = normalizeText(candidate.keyword)
      if (existingKeywords.has(key)) continue
      if (!dedupedCandidates.has(key)) dedupedCandidates.set(key, candidate)
    }

    const selected = [...dedupedCandidates.values()]
      .sort((a, b) => b.volume - a.volume)
      .slice(0, existing.length > 0 ? 2 : 3)

    for (const candidate of selected) {
      const related = [...dedupedCandidates.values()]
        .filter((item) => item.keyword !== candidate.keyword)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 4)
        .map((item) => item.keyword)

      plannedTopics.push({
        status: 'candidate',
        serviceSlug: group.serviceSlug,
        blogCategorySlug: group.blogCategorySlug,
        commercialOwner,
        childServiceSlug,
        childServiceTitle: displayText(childService.h1),
        proposedArticleSlug: slugify(candidate.keyword),
        proposedTitle: titleFromKeyword(candidate.keyword),
        primaryKeyword: candidate.keyword,
        approvedKeywords: [candidate.keyword, ...related],
        source: candidate.sourceFile,
        priority: candidate.volume,
        notes: candidate.bucket
          ? `Local DataForSEO semantic review bucket: ${candidate.bucket}.`
          : 'Detected from existing child-service SEO semantics.',
      })
    }

    if (existing.length === 0 && selected.length === 0) {
      plannedTopics.push({
        status: 'needs-dataforseo',
        serviceSlug: group.serviceSlug,
        blogCategorySlug: group.blogCategorySlug,
        commercialOwner,
        childServiceSlug,
        childServiceTitle: displayText(childService.h1),
        proposedArticleSlug: '',
        proposedTitle: '',
        primaryKeyword: displayText(childService.lockedPrimaryKw),
        approvedKeywords: [],
        source: 'missing',
        priority: 0,
        notes: 'No reliable informational candidate found locally. Add DataForSEO Standard Queue seeds for this child service.',
      })
    }
  }
}

const outputDir = path.join(process.cwd(), '.tmp', 'blog')
const jsonFile = path.join(outputDir, 'informational-semantic-plan.json')
const csvFile = path.join(outputDir, 'informational-semantic-plan.csv')
const txtFile = path.join(outputDir, 'informational-semantic-keywords.txt')

const summaryByService = serviceGroups.map((group) => {
  const rows = plannedTopics.filter((topic) => topic.serviceSlug === group.serviceSlug)
  const childOwners = new Set(Object.keys(group.childServices).map((slug) => `/${group.serviceSlug}/${slug}`))
  const ownersWithExisting = new Set(rows.filter((row) => row.status === 'existing').map((row) => row.commercialOwner))
  const ownersWithCandidates = new Set(rows.filter((row) => row.status === 'candidate').map((row) => row.commercialOwner))
  const ownersNeedingData = new Set(rows.filter((row) => row.status === 'needs-dataforseo').map((row) => row.commercialOwner))

  return {
    serviceSlug: group.serviceSlug,
    blogCategorySlug: group.blogCategorySlug,
    childServices: childOwners.size,
    ownersWithExistingArticles: ownersWithExisting.size,
    ownersWithNewCandidates: ownersWithCandidates.size,
    ownersNeedingDataForSeo: ownersNeedingData.size,
    existingArticles: rows.filter((row) => row.status === 'existing').length,
    newCandidates: rows.filter((row) => row.status === 'candidate').length,
  }
})

const report = {
  generatedAt: new Date().toISOString(),
  rules: {
    sourcePriority: [
      'Existing approved blog semantic clusters',
      'Child-service SEO FAQ/secondary keywords',
      'Local DataForSEO semantic review dumps',
      'Only then DataForSEO Standard Queue for gaps',
    ],
    publication: 'This file is a semantic plan only. Article production and indexation are separate steps.',
  },
  summary: {
    childServices: serviceGroups.reduce((sum, group) => sum + Object.keys(group.childServices).length, 0),
    existingTopics: plannedTopics.filter((row) => row.status === 'existing').length,
    candidateTopics: plannedTopics.filter((row) => row.status === 'candidate').length,
    needsDataForSeo: plannedTopics.filter((row) => row.status === 'needs-dataforseo').length,
    localReviewKeywords: keywordPool.length,
  },
  summaryByService,
  topics: plannedTopics,
}

const csvHeader = [
  'status',
  'serviceSlug',
  'blogCategorySlug',
  'commercialOwner',
  'childServiceSlug',
  'childServiceTitle',
  'proposedArticleSlug',
  'proposedTitle',
  'primaryKeyword',
  'approvedKeywords',
  'source',
  'priority',
  'notes',
]

const csvRows = plannedTopics.map((topic) =>
  csvHeader
    .map((field) => {
      const value = topic[field as keyof PlannedTopic]
      return csvEscape(Array.isArray(value) ? value.join(' | ') : value ?? '')
    })
    .join(',')
)

const keywordList = plannedTopics
  .filter((topic) => topic.status === 'candidate')
  .flatMap((topic) => topic.approvedKeywords)
  .map((keyword) => displayText(keyword))
  .filter((keyword, index, array) => array.indexOf(keyword) === index)
  .sort()

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(jsonFile, JSON.stringify(report, null, 2))
fs.writeFileSync(csvFile, [csvHeader.join(','), ...csvRows].join('\n'))
fs.writeFileSync(txtFile, keywordList.join('\n'))

console.log(`Informational semantic plan written to ${path.relative(process.cwd(), jsonFile)}`)
console.log(`CSV written to ${path.relative(process.cwd(), csvFile)}`)
console.log(`Keyword list written to ${path.relative(process.cwd(), txtFile)}`)
console.log(`Existing topics: ${report.summary.existingTopics}`)
console.log(`Candidate topics: ${report.summary.candidateTopics}`)
console.log(`Needs DataForSEO: ${report.summary.needsDataForSeo}`)
console.table(summaryByService)
