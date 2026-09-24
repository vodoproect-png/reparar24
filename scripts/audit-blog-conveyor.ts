const { BLOG_ARTICLE_BRIEFS, BLOG_CATEGORIES } = require('../data/blog/topics')
const { BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID } = require('../data/blog/informational-semantics')
const { PAGE_REGISTRY } = require('../data/seo/page-registry')
const { services } = require('../data/services')
const fs = require('fs')
const path = require('path')

const errors: string[] = []
const warnings: string[] = []
const categorySlugs = new Set(BLOG_CATEGORIES.map((category: { slug: string }) => category.slug))
const serviceSlugs = new Set(services.map((service: { slug: string }) => service.slug))
const seenArticleKeys = new Set<string>()

const WEAK_ANSWER_START_RE = /^(en este articulo|esta guia|vamos a|a continuacion|si quieres saber|cuando hablamos)/i

function countWords(value: string): number {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ\s-]/gi, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .length
}

function articleBodyText(article: any): string {
  const bodySections = article.bodySections ?? []
  const faq = article.faq ?? []

  return [
    article.h1,
    article.description,
    article.llmAnswer,
    ...article.outline,
    ...bodySections.flatMap((section: any) => [section.heading, ...(section.paragraphs ?? [])]),
    ...faq.flatMap((item: any) => [item.question, item.answer]),
  ].join(' ')
}

function firstSentence(value: string): string {
  return String(value)
    .trim()
    .split(/(?<=[.!?])\s+/)[0]
    ?.trim() ?? ''
}

function isAnswerUnitSection(section: any): boolean {
  const paragraphs = section?.paragraphs ?? []
  const firstParagraph = String(paragraphs[0] ?? '').trim()
  const sentence = firstSentence(firstParagraph)

  return Boolean(
    String(section?.heading ?? '').trim().length >= 12 &&
      firstParagraph.length >= 90 &&
      sentence.length >= 45 &&
      sentence.length <= 240 &&
      !WEAK_ANSWER_START_RE.test(sentence)
  )
}

function entityCoverage(article: any): number {
  const text = articleBodyText(article).toLowerCase()
  const entities = [
    article.primaryKeyword,
    ...(article.secondaryKeywords ?? []),
    article.serviceSlug,
    article.commercialOwner?.replace(/^\/+/, '').replace(/-/g, ' '),
  ]
    .filter(Boolean)
    .map((value: string) => value.toLowerCase())

  return new Set(entities.filter((entity: string) => text.includes(entity))).size
}

function ownerExists(path: string): boolean {
  const segments = path.replace(/^\/+|\/+$/g, '').split('/')

  if (segments.length === 1) {
    return serviceSlugs.has(segments[0])
  }

  if (segments.length === 2) {
    const [serviceSlug, childSlug] = segments
    return Boolean(
      PAGE_REGISTRY[serviceSlug]?.children.some(
        (entry: { slug: string; allowed: boolean }) => entry.slug === childSlug && entry.allowed
      )
    )
  }

  return false
}

for (const category of BLOG_CATEGORIES) {
  if (!serviceSlugs.has(category.serviceSlug)) {
    errors.push(`Category ${category.slug} has unknown serviceSlug ${category.serviceSlug}`)
  }
}

for (const article of BLOG_ARTICLE_BRIEFS) {
  const key = `${article.categorySlug}/${article.slug}`

  if (seenArticleKeys.has(key)) {
    errors.push(`Duplicate article slug: ${key}`)
  }
  seenArticleKeys.add(key)

  if (!categorySlugs.has(article.categorySlug)) {
    errors.push(`${key} has unknown category ${article.categorySlug}`)
  }

  if (!serviceSlugs.has(article.serviceSlug)) {
    errors.push(`${key} has unknown service ${article.serviceSlug}`)
  }

  if (!article.commercialOwner.startsWith('/')) {
    errors.push(`${key} commercialOwner must start with /`)
  }

  if (!ownerExists(article.commercialOwner)) {
    errors.push(`${key} commercialOwner does not match an approved commercial page: ${article.commercialOwner}`)
  }

  for (const supportLink of article.supportLinks ?? []) {
    if (!ownerExists(supportLink)) {
      errors.push(`${key} supportLink does not match an approved commercial page: ${supportLink}`)
    }
  }

  if (article.indexing === 'noindex') {
    errors.push(`${key} uses noindex; Reparar24 keeps unfinished articles internal instead of public noindex`)
  }

  if (article.status === 'published' && article.semanticStatus !== 'approved') {
    errors.push(`${key} cannot be published/indexed without approved informational semantics`)
  }

  if (!article.semanticStatus) {
    warnings.push(`${key} has no semanticStatus yet; keep it internal draft until approved`)
  }

  if (article.semanticStatus === 'approved') {
    if (!article.semanticClusterId) {
      errors.push(`${key} is approved but has no semanticClusterId`)
    } else {
      const cluster = BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID[article.semanticClusterId]

      if (!cluster) {
        errors.push(`${key} references unknown semanticClusterId ${article.semanticClusterId}`)
      } else {
        if (cluster.articleSlug !== article.slug) {
          errors.push(`${key} semantic cluster belongs to article ${cluster.articleSlug}`)
        }

        if (cluster.categorySlug !== article.categorySlug) {
          errors.push(`${key} semantic cluster belongs to category ${cluster.categorySlug}`)
        }

        if (cluster.commercialOwner !== article.commercialOwner) {
          errors.push(`${key} semantic cluster owner ${cluster.commercialOwner} differs from article owner ${article.commercialOwner}`)
        }

        if (!Array.isArray(cluster.approvedKeywords) || cluster.approvedKeywords.length < 3) {
          errors.push(`${key} semantic cluster must contain at least 3 approved keywords`)
        }

        const sourcePath = path.resolve(process.cwd(), cluster.sourceFile)
        if (!fs.existsSync(sourcePath)) {
          warnings.push(`${key} semantic source file is not available locally: ${cluster.sourceFile}`)
        }
      }
    }
  }

  if (article.semanticStatus === 'candidate' && article.semanticClusterId) {
    warnings.push(`${key} is still candidate but already has semanticClusterId ${article.semanticClusterId}`)
  }

  if (['ready', 'published'].includes(article.status)) {
    const wordCount = countWords(articleBodyText(article))

    if (article.originalityStatus !== 'external-passed') {
      errors.push(`${key} cannot be ${article.status} without Text.ru + Copyscape external-passed originalityStatus`)
    }

    if (!Array.isArray(article.bodySections) || article.bodySections.length < 3) {
      errors.push(`${key} cannot be ${article.status} without at least 3 original body sections`)
    }

    if (wordCount < 750) {
      errors.push(`${key} cannot be ${article.status} with thin article body (${wordCount} words)`)
    } else if (wordCount < 1000) {
      warnings.push(`${key} is a concise article (${wordCount} words); keep it only if the intent is narrow and keyword coverage is complete`)
    }
  }

  if (article.status === 'published' && article.indexing !== 'index') {
    errors.push(`${key} is published but is not marked index`)
  }

  if (article.outline.length < 4) {
    warnings.push(`${key} has a short outline`)
  }

  if (!article.llmAnswer || article.llmAnswer.trim().length < 90) {
    errors.push(`${key} must have an answer-first llmAnswer of at least 90 characters`)
  }

  if (article.llmAnswer && article.llmAnswer.length > 260) {
    warnings.push(`${key} llmAnswer is long; keep answer-first text concise for LLM extraction`)
  }

  if (!article.llmAnswer?.match(/[.?!]$/)) {
    warnings.push(`${key} llmAnswer should be a complete sentence`)
  }

  if (['ready', 'published'].includes(article.status)) {
    const answerUnitSections = (article.bodySections ?? []).filter(isAnswerUnitSection).length

    if (answerUnitSections < 3) {
      errors.push(`${key} must have at least 3 answer-unit sections with direct answer-first paragraphs`)
    }

    if (entityCoverage(article) < 3) {
      warnings.push(`${key} has weak entity coverage; include primary keyword, related terms and service context naturally`)
    }
  }
}

console.log(`Blog conveyor audit: ${BLOG_ARTICLE_BRIEFS.length} article briefs, ${BLOG_CATEGORIES.length} categories`)

if (warnings.length) {
  console.log(`Warnings: ${warnings.length}`)
  for (const warning of warnings) console.log(`- ${warning}`)
}

if (errors.length) {
  console.error(`Errors: ${errors.length}`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Blog conveyor audit passed')
