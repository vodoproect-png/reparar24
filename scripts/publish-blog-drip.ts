const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')
const { BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID } = require('../data/blog/informational-semantics')

const args = new Set(process.argv.slice(2))
const execute = args.has('--execute')
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : 3
const topicsPath = path.resolve(process.cwd(), 'data/blog/topics.ts')
const blogDataDir = path.resolve(process.cwd(), 'data/blog')
const logDir = path.resolve(process.cwd(), '.tmp/blog')
const today = new Date().toISOString().slice(0, 10)

interface BlogArticleForPublish {
  slug: string
  categorySlug: string
  title: string
  status: string
  indexing: string
  semanticStatus?: string
  semanticClusterId?: string
  originalityStatus?: string
  llmAnswer?: string
  commercialOwner?: string
}

interface ArticleBlock {
  start: number
  end: number
  block: string
}

if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
  console.error('Use --limit=N with N between 1 and 50')
  process.exit(1)
}

function isReadyForIndex(article: BlogArticleForPublish): boolean {
  if (article.status !== 'ready') return false
  if (article.indexing !== 'index') return false
  if (article.semanticStatus !== 'approved') return false
  if (!article.semanticClusterId) return false
  if (!BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID[article.semanticClusterId]) return false
  if (article.originalityStatus !== 'external-passed') return false
  if (!article.llmAnswer || article.llmAnswer.trim().length < 90) return false
  if (!article.commercialOwner?.startsWith('/')) return false
  return true
}

function findArticleBlock(source: string, slug: string): ArticleBlock {
  const slugNeedles = [`slug: '${slug}'`, `"slug": "${slug}"`]
  const slugIndex = slugNeedles
    .map((needle) => source.indexOf(needle))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1

  if (slugIndex === -1) {
    throw new Error(`Cannot find article ${slug}`)
  }

  const start = source.lastIndexOf('  {', slugIndex)
  let depth = 0

  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return {
          start,
          end: index + 1,
          block: source.slice(start, index + 1),
        }
      }
    }
  }

  throw new Error(`Cannot parse article block ${slug}`)
}

function findArticleSourceFile(slug: string): string {
  const slugNeedles = [`slug: '${slug}'`, `"slug": "${slug}"`]
  const candidateFiles = [
    topicsPath,
    ...fs.readdirSync(blogDataDir)
      .filter((fileName) => fileName.endsWith('.ts'))
      .filter((fileName) => !['topics.ts', 'types.ts', 'informational-semantics.ts'].includes(fileName))
      .map((fileName) => path.join(blogDataDir, fileName)),
  ]

  for (const filePath of candidateFiles) {
    const source = fs.readFileSync(filePath, 'utf8')
    if (slugNeedles.some((needle) => source.includes(needle))) {
      return filePath
    }
  }

  throw new Error(`Cannot find source file for article ${slug}`)
}

function publishBlock(block: string): string {
  let nextBlock = block
    .replace("status: 'ready'", "status: 'published'")
    .replace('"status": "ready"', '"status": "published"')

  if (nextBlock.includes('publishedAt:')) {
    nextBlock = nextBlock.replace(/publishedAt: '[^']*'/, `publishedAt: '${today}'`)
  } else if (nextBlock.includes('"publishedAt":')) {
    nextBlock = nextBlock.replace(/"publishedAt": "[^"]*"/, `"publishedAt": "${today}"`)
  } else {
    nextBlock = nextBlock.includes('"indexing": "index",')
      ? nextBlock.replace(
        '"indexing": "index",',
        `"indexing": "index",\n    "publishedAt": "${today}",`
      )
      : nextBlock.replace(
        "indexing: 'index',",
        `indexing: 'index',\n    publishedAt: '${today}',`
      )
  }

  return nextBlock
}

const eligible = (BLOG_ARTICLE_BRIEFS as BlogArticleForPublish[]).filter(isReadyForIndex).slice(0, limit)

fs.mkdirSync(logDir, { recursive: true })

const report = {
  generatedAt: new Date().toISOString(),
  mode: execute ? 'execute' : 'dry-run',
  limit,
  selected: eligible.map((article) => ({
    article: `${article.categorySlug}/${article.slug}`,
    title: article.title,
    commercialOwner: article.commercialOwner,
    semanticClusterId: article.semanticClusterId,
  })),
}

fs.writeFileSync(
  path.join(logDir, `publish-drip-${today}.json`),
  JSON.stringify(report, null, 2)
)

console.log(`Blog drip publisher: ${execute ? 'execute' : 'dry-run'}`)
console.log(`Ready articles selected: ${eligible.length}`)

for (const article of eligible) {
  console.log(`- ${article.categorySlug}/${article.slug}`)
}

if (!eligible.length) {
  console.log('No ready/index externally approved articles found.')
  process.exit(0)
}

if (!execute) {
  console.log('No files changed. Add --execute to publish selected articles.')
  process.exit(0)
}

for (const article of eligible) {
  const sourcePath = findArticleSourceFile(article.slug)
  let source = fs.readFileSync(sourcePath, 'utf8')
  const found = findArticleBlock(source, article.slug)
  const nextBlock = publishBlock(found.block)
  source = `${source.slice(0, found.start)}${nextBlock}${source.slice(found.end)}`
  fs.writeFileSync(sourcePath, source)
}

execFileSync('npm', ['run', 'audit:blog'], { stdio: 'inherit', shell: true })

console.log(`Published ${eligible.length} blog article(s).`)
