const fs = require('fs')
const path = require('path')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')
const { BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID } = require('../data/blog/informational-semantics')

type BlogArticle = {
  slug: string
  categorySlug: string
  h1: string
  title: string
  primaryKeyword: string
  secondaryKeywords?: string[]
  semanticClusterId?: string
  commercialOwner: string
  status: string
  indexing: string
}

type RerankedCluster = {
  clusterId: string
  owner: string
  recommendedPrimaryKeyword: string
  recommendedSlug: string
  recommendedH1: string
  googleAdsPrimaryVolume: string | number | null
  googleAdsTotalVolume: string | number | null
  approvedKeywords: string
}

const errors: string[] = []
const warnings: string[] = []

function normalize(value: string | undefined | null): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(value: string): string {
  return normalize(value)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function tokens(value: string): Set<string> {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter((token) => token.length > 2)
  )
}

function jaccard(a: string, b: string): number {
  const left = tokens(a)
  const right = tokens(b)
  const union = new Set([...left, ...right])
  if (!union.size) return 0

  let intersection = 0
  for (const token of left) {
    if (right.has(token)) intersection += 1
  }

  return intersection / union.size
}

function parseList(value: string): string[] {
  return String(value ?? '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
}

function readRerankedPlan(): RerankedCluster[] {
  const filePath = path.resolve(process.cwd(), '.tmp/blog/blog-writing-plan-google-ads-reranked.json')
  if (!fs.existsSync(filePath)) {
    warnings.push('Google Ads reranked writing plan is missing: .tmp/blog/blog-writing-plan-google-ads-reranked.json')
    return []
  }

  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return Array.isArray(payload.clusters) ? payload.clusters : []
}

function findRerankedCluster(article: BlogArticle, clusters: RerankedCluster[]): RerankedCluster | null {
  const semanticId = normalize(article.semanticClusterId)
  const primary = normalize(article.primaryKeyword)
  const owner = normalize(article.commercialOwner)
  const secondary = new Set((article.secondaryKeywords ?? []).map(normalize))

  return (
    clusters.find((cluster) => normalize(cluster.clusterId) === semanticId) ??
    clusters.find((cluster) => normalize(cluster.owner) === owner && normalize(cluster.recommendedPrimaryKeyword) === primary) ??
    clusters.find((cluster) => {
      if (normalize(cluster.owner) !== owner) return false
      const approved = parseList(cluster.approvedKeywords).map(normalize)
      return approved.includes(primary) || approved.some((keyword) => secondary.has(keyword))
    }) ??
    null
  )
}

function selectedArticles(): BlogArticle[] {
  const idsArg = process.argv.find((arg) => arg.startsWith('--ids='))
  if (!idsArg) return BLOG_ARTICLE_BRIEFS

  const ids = new Set(
    idsArg
      .replace('--ids=', '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  )

  return BLOG_ARTICLE_BRIEFS.filter((article: BlogArticle) => ids.has(`${article.categorySlug}/${article.slug}`))
}

const articles = selectedArticles()
const rerankedClusters = readRerankedPlan()
const seenSlugs = new Set<string>()
const seenPrimary = new Map<string, string>()

for (const article of articles) {
  const key = `${article.categorySlug}/${article.slug}`
  const slugKey = normalize(key)
  const primaryKey = normalize(article.primaryKeyword)

  if (seenSlugs.has(slugKey)) errors.push(`${key}: duplicate category/slug`)
  seenSlugs.add(slugKey)

  if (seenPrimary.has(primaryKey)) {
    errors.push(`${key}: duplicate primaryKeyword with ${seenPrimary.get(primaryKey)} (${article.primaryKeyword})`)
  }
  seenPrimary.set(primaryKey, key)

  if (!article.semanticClusterId) {
    errors.push(`${key}: missing semanticClusterId`)
    continue
  }

  const semanticCluster = BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID[article.semanticClusterId]
  if (!semanticCluster) {
    errors.push(`${key}: semanticClusterId is not approved: ${article.semanticClusterId}`)
    continue
  }

  const rerankedCluster = findRerankedCluster(article, rerankedClusters)
  if (!rerankedCluster) {
    warnings.push(`${key}: no Google Ads reranked cluster match found for ${article.semanticClusterId}`)
  } else {
    const recommendedPrimary = normalize(rerankedCluster.recommendedPrimaryKeyword)
    const articlePrimary = normalize(article.primaryKeyword)
    const recommendedSlug = normalize(rerankedCluster.recommendedSlug)
    const articleSlug = normalize(article.slug)
    const volumeNote = `GAds primary ${rerankedCluster.googleAdsPrimaryVolume ?? 'n/a'}, total ${rerankedCluster.googleAdsTotalVolume ?? 'n/a'}`

    if (recommendedPrimary !== articlePrimary) {
      warnings.push(
        `${key}: primaryKeyword differs from Google Ads recommendation (${rerankedCluster.recommendedPrimaryKeyword}); ${volumeNote}`
      )
    }

    if (recommendedSlug && recommendedSlug !== articleSlug) {
      warnings.push(`${key}: slug differs from recommendedSlug ${rerankedCluster.recommendedSlug}; ${volumeNote}`)
    }
  }

  const primarySlug = slugify(article.primaryKeyword)
  if (!article.slug.includes(primarySlug) && !primarySlug.includes(article.slug)) {
    warnings.push(`${key}: URL slug does not clearly reflect primaryKeyword "${article.primaryKeyword}"`)
  }

  if (!normalize(article.h1).includes(primaryKey)) {
    warnings.push(`${key}: H1 does not include primaryKeyword "${article.primaryKeyword}"`)
  }

  for (const other of BLOG_ARTICLE_BRIEFS as BlogArticle[]) {
    const otherKey = `${other.categorySlug}/${other.slug}`
    if (otherKey === key) continue

    const sameOwner = normalize(other.commercialOwner) === normalize(article.commercialOwner)
    const sameCategory = other.categorySlug === article.categorySlug
    const score = jaccard(
      [article.primaryKeyword, ...(article.secondaryKeywords ?? [])].join(' '),
      [other.primaryKeyword, ...(other.secondaryKeywords ?? [])].join(' ')
    )

    if ((sameOwner || sameCategory) && score >= 0.56) {
      warnings.push(`${key}: possible informational cannibalization with ${otherKey} (${score.toFixed(2)} keyword overlap)`)
    }
  }
}

console.log(`Blog preflight audit: ${articles.length} articles checked`)

if (warnings.length) {
  console.log(`Warnings: ${warnings.length}`)
  for (const warning of warnings) console.log(`- ${warning}`)
}

if (errors.length) {
  console.error(`Errors: ${errors.length}`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Blog preflight audit passed')
