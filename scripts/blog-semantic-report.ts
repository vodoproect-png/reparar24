const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')
const { BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID } = require('../data/blog/informational-semantics')
const fs = require('fs')
const path = require('path')

const outputDir = path.resolve(process.cwd(), '.tmp/blog')
const outputFile = path.join(outputDir, 'informational-semantic-report.json')

const approved = []
const candidates = []
const missingClusters = []

for (const article of BLOG_ARTICLE_BRIEFS) {
  const cluster = article.semanticClusterId
    ? BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID[article.semanticClusterId]
    : null

  const row = {
    article: `${article.categorySlug}/${article.slug}`,
    title: article.title,
    primaryKeyword: article.primaryKeyword,
    commercialOwner: article.commercialOwner,
    semanticStatus: article.semanticStatus ?? 'unset',
    semanticClusterId: article.semanticClusterId ?? null,
    approvedKeywords: cluster?.approvedKeywords ?? [],
    sourceFile: cluster?.sourceFile ?? null,
  }

  if (article.semanticStatus === 'approved') {
    approved.push(row)
    if (!cluster) missingClusters.push(row)
  } else {
    candidates.push({
      ...row,
      nextAction:
        'Revisar si existe semantica informacional en los dumps actuales; si no, doborrar con DataForSEO Standard Queue.',
    })
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalArticles: BLOG_ARTICLE_BRIEFS.length,
    approved: approved.length,
    candidates: candidates.length,
    missingClusters: missingClusters.length,
  },
  approved,
  candidates,
  missingClusters,
}

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify(report, null, 2))

console.log(`Blog semantic report written to ${path.relative(process.cwd(), outputFile)}`)
console.log(`Approved: ${approved.length}`)
console.log(`Candidates: ${candidates.length}`)
console.log(`Missing clusters: ${missingClusters.length}`)
