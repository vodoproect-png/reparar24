import fs from 'fs'
import path from 'path'
import { BLOG_ARTICLE_BRIEFS } from '../data/blog/topics.ts'
import { BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS } from '../data/blog/informational-semantics.ts'

type WritingPlanCluster = {
  service: string
  serviceLabel: string
  status: string
  priority: string
  writingPriorityScore: number
  textLengthRule: string
  clusterId: string
  target: string
  owner: string
  originalPrimaryKeyword: string
  recommendedPrimaryKeyword: string
  recommendedSlug: string
  recommendedH1: string
  recommendedTitle: string
  googleAdsPrimaryVolume: number | string | null
  googleAdsTotalVolume: number | string | null
  googleAdsCoverage: number | string | null
  keywordCount: number | string | null
  flags: string
  approvedKeywords: string
  primarySelectionReason: string
}

type ClusterLedgerItem = {
  clusterId: string
  service: string
  categorySlug: string
  commercialOwner: string
  priority: string
  writingPriorityScore: number
  articleSlug: string
  h1: string
  title: string
  primaryKeyword: string
  primaryVolume: number
  totalVolume: number
  keywordCount: number
  textLengthRule: string
  flags: string[]
  approvedKeywords: string[]
  source: string
  status: 'backlog' | 'published'
  publishedArticleSlug?: string
  publishedSemanticClusterId?: string
}

const ROOT = process.cwd()
const PLAN_PATH = path.join(ROOT, '.tmp', 'blog', 'blog-writing-plan-google-ads-reranked.json')
const OUT_DIR = path.join(ROOT, 'data', 'blog')
const DOCS_DIR = path.join(ROOT, 'docs', 'seo')
const BACKLOG_JSON = path.join(OUT_DIR, 'informational-cluster-backlog.json')
const PUBLISHED_JSON = path.join(OUT_DIR, 'published-informational-clusters.json')
const BACKLOG_CSV = path.join(OUT_DIR, 'informational-cluster-backlog.csv')
const PUBLISHED_CSV = path.join(OUT_DIR, 'published-informational-clusters.csv')
const REPORT_PATH = path.join(DOCS_DIR, 'blog-informational-cluster-ledger.md')

const CATEGORY_BY_SERVICE: Record<string, string> = {
  fontaneria: 'fontaneria',
  electricista: 'electricidad',
  desatascos: 'desatascos',
  'aire-acondicionado': 'climatizacion',
  calefaccion: 'calefaccion',
  'limpieza-tuberias': 'saneamiento',
}

function normalize(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function toNumber(value: unknown): number {
  const parsed = Number(value ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}

function splitList(value: string): string[] {
  return String(value ?? '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
}

function csvEscape(value: unknown): string {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function readPlan(): WritingPlanCluster[] {
  const raw = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'))
  return raw.clusters ?? []
}

function publishedSignatures() {
  const signatures = new Map<string, { slug: string; semanticClusterId?: string }>()

  function add(value: unknown, meta: { slug: string; semanticClusterId?: string }) {
    const key = normalize(value)
    if (key) signatures.set(key, meta)
  }

  for (const article of BLOG_ARTICLE_BRIEFS) {
    if (article.status !== 'published') continue
    const meta = { slug: article.slug, semanticClusterId: article.semanticClusterId }
    add(article.slug, meta)
    add(article.semanticClusterId, meta)
    add(article.primaryKeyword, meta)
    for (const keyword of article.secondaryKeywords ?? []) add(keyword, meta)
  }

  for (const cluster of BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS) {
    const meta = { slug: cluster.articleSlug, semanticClusterId: cluster.id }
    add(cluster.id, meta)
    add(cluster.articleSlug, meta)
    for (const keyword of cluster.approvedKeywords ?? []) add(keyword, meta)
  }

  return signatures
}

function toLedgerItem(cluster: WritingPlanCluster, status: 'backlog' | 'published', match?: { slug: string; semanticClusterId?: string }): ClusterLedgerItem {
  return {
    clusterId: cluster.clusterId,
    service: cluster.service,
    categorySlug: CATEGORY_BY_SERVICE[cluster.service] ?? cluster.service,
    commercialOwner: cluster.owner,
    priority: cluster.priority,
    writingPriorityScore: toNumber(cluster.writingPriorityScore),
    articleSlug: cluster.recommendedSlug,
    h1: cluster.recommendedH1,
    title: cluster.recommendedTitle,
    primaryKeyword: cluster.recommendedPrimaryKeyword,
    primaryVolume: toNumber(cluster.googleAdsPrimaryVolume),
    totalVolume: toNumber(cluster.googleAdsTotalVolume),
    keywordCount: toNumber(cluster.keywordCount),
    textLengthRule: cluster.textLengthRule,
    flags: splitList(cluster.flags),
    approvedKeywords: splitList(cluster.approvedKeywords),
    source: '.tmp/blog/blog-writing-plan-google-ads-reranked.json',
    status,
    ...(match
      ? {
          publishedArticleSlug: match.slug,
          publishedSemanticClusterId: match.semanticClusterId,
        }
      : {}),
  }
}

function buildLedger() {
  const signatures = publishedSignatures()
  const plan = readPlan()
  const backlog: ClusterLedgerItem[] = []
  const published: ClusterLedgerItem[] = []

  for (const cluster of plan) {
    const candidates = [
      cluster.clusterId,
      cluster.recommendedSlug,
      cluster.originalPrimaryKeyword,
      cluster.recommendedPrimaryKeyword,
      ...splitList(cluster.approvedKeywords),
    ]
    const match = candidates.map((item) => signatures.get(normalize(item))).find(Boolean)
    const item = toLedgerItem(cluster, match ? 'published' : 'backlog', match)
    if (match) published.push(item)
    else backlog.push(item)
  }

  return {
    generatedAt: new Date().toISOString(),
    source: PLAN_PATH.replace(`${ROOT}${path.sep}`, ''),
    policy: {
      moveRule: 'After an article is published, rerun npm run blog:sync-clusters. Matching clusters move from backlog to published by clusterId, slug, primary keyword or approved keyword overlap.',
      articleRule: 'Write new blog articles only from data/blog/informational-cluster-backlog.json unless the user explicitly approves a new semantic collection pass.',
      noindexRule: 'Published blog articles stay indexable by default.',
      qualityRule: 'Before publication, report Text.ru uniqueness, water, spam/zaspamlennost and key occurrences; run Copyscape where applicable.',
    },
    summary: {
      totalPlanClusters: plan.length,
      backlogClusters: backlog.length,
      publishedMatchedClusters: published.length,
      publishedArticlesOnSite: BLOG_ARTICLE_BRIEFS.filter((article) => article.status === 'published').length,
    },
    byService: groupByService(backlog, published),
    backlog,
    published,
  }
}

function groupByService(backlog: ClusterLedgerItem[], published: ClusterLedgerItem[]) {
  const services = new Set([...backlog, ...published].map((item) => item.service))
  return Object.fromEntries(
    [...services].sort().map((service) => [
      service,
      {
        backlog: backlog.filter((item) => item.service === service).length,
        publishedMatched: published.filter((item) => item.service === service).length,
      },
    ])
  )
}

function writeCsv(filePath: string, rows: ClusterLedgerItem[]) {
  const header = [
    'status',
    'service',
    'categorySlug',
    'priority',
    'writingPriorityScore',
    'clusterId',
    'articleSlug',
    'h1',
    'primaryKeyword',
    'primaryVolume',
    'totalVolume',
    'keywordCount',
    'commercialOwner',
    'textLengthRule',
    'flags',
    'approvedKeywords',
    'publishedArticleSlug',
    'publishedSemanticClusterId',
  ]
  const lines = [
    header.join(','),
    ...rows.map((row) => header.map((field) => csvEscape((row as any)[field])).join(',')),
  ]
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8')
}

function markdownTable(rows: Array<Record<string, unknown>>, columns: Array<{ key: string; label: string }>) {
  return [
    `| ${columns.map((column) => column.label).join(' | ')} |`,
    `| ${columns.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${columns.map((column) => String(row[column.key] ?? '').replace(/\|/g, '/')).join(' | ')} |`),
  ].join('\n')
}

function writeReport(ledger: ReturnType<typeof buildLedger>) {
  const byServiceRows = Object.entries(ledger.byService).map(([service, data]) => ({
    service,
    backlog: data.backlog,
    publishedMatched: data.publishedMatched,
  }))
  const nextRows = ledger.backlog.slice(0, 20).map((item) => ({
    service: item.service,
    priority: item.priority,
    h1: item.h1,
    keyword: item.primaryKeyword,
    volume: item.primaryVolume,
    owner: item.commercialOwner,
  }))
  const report = [
    '# Blog informational cluster ledger',
    '',
    `Generated: ${ledger.generatedAt}`,
    '',
    '## Summary',
    '',
    `- Source plan clusters: ${ledger.summary.totalPlanClusters}`,
    `- Backlog clusters available for future articles: ${ledger.summary.backlogClusters}`,
    `- Plan clusters already matched to published articles: ${ledger.summary.publishedMatchedClusters}`,
    `- Published blog articles currently on site: ${ledger.summary.publishedArticlesOnSite}`,
    '',
    '## Files',
    '',
    '- Backlog JSON: `data/blog/informational-cluster-backlog.json`',
    '- Backlog CSV: `data/blog/informational-cluster-backlog.csv`',
    '- Published JSON: `data/blog/published-informational-clusters.json`',
    '- Published CSV: `data/blog/published-informational-clusters.csv`',
    '',
    '## By Service',
    '',
    markdownTable(byServiceRows, [
      { key: 'service', label: 'Service' },
      { key: 'backlog', label: 'Backlog' },
      { key: 'publishedMatched', label: 'Published matched' },
    ]),
    '',
    '## Next Backlog Candidates',
    '',
    markdownTable(nextRows, [
      { key: 'service', label: 'Service' },
      { key: 'priority', label: 'Priority' },
      { key: 'h1', label: 'H1' },
      { key: 'keyword', label: 'Primary keyword' },
      { key: 'volume', label: 'Volume' },
      { key: 'owner', label: 'Commercial owner' },
    ]),
    '',
    '## Operating Rule',
    '',
    'After publishing a blog article, rerun `npm run blog:sync-clusters`. The cluster should disappear from the backlog file and appear in the published file by clusterId, slug, primary keyword or approved-keyword match.',
    '',
  ].join('\n')

  fs.writeFileSync(REPORT_PATH, report, 'utf8')
}

function main() {
  const ledger = buildLedger()
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.mkdirSync(DOCS_DIR, { recursive: true })
  fs.writeFileSync(BACKLOG_JSON, `${JSON.stringify(ledger.backlog, null, 2)}\n`, 'utf8')
  fs.writeFileSync(PUBLISHED_JSON, `${JSON.stringify(ledger.published, null, 2)}\n`, 'utf8')
  writeCsv(BACKLOG_CSV, ledger.backlog)
  writeCsv(PUBLISHED_CSV, ledger.published)
  writeReport(ledger)
  console.log(`Blog informational cluster ledger synced.`)
  console.log(`Backlog clusters: ${ledger.summary.backlogClusters}`)
  console.log(`Published matched clusters: ${ledger.summary.publishedMatchedClusters}`)
  console.log(`Published articles on site: ${ledger.summary.publishedArticlesOnSite}`)
}

main()
