require('dotenv').config({ path: '.env.local', quiet: true })
const fs = require('fs')
const path = require('path')

interface SerpCandidate {
  query: string
  position: number
  title: string
  url: string
  domain: string
}

interface BenchmarkResult {
  query: string
  position: number
  title: string
  url: string
  domain: string
  words?: number
  chars?: number
  ok?: boolean
  skipped?: string
  metrics?: {
    uniqueness?: number
    waterPercent?: number
    spamPercent?: number
    spellErrors?: number
  }
  error?: string
}

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, '.tmp', 'uniqueness')

const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD
const TEXT_RU_API_KEY = process.env.TEXT_RU_API_KEY
const TEXT_RU_API_URL = process.env.TEXT_RU_API_URL || 'https://api.text.ru/post'
const TEXT_RU_POLL_ATTEMPTS = Number(process.env.TEXT_RU_POLL_ATTEMPTS ?? '10')
const TEXT_RU_POLL_DELAY_MS = Number(process.env.TEXT_RU_POLL_DELAY_MS ?? '8000')
const MIN_TEXT_CHARS = Number(process.env.BENCHMARK_MIN_TEXT_CHARS ?? '2200')

const args = process.argv.slice(2)
const execute = args.includes('--execute')
const maxTargets = Number(getArgValue('--max-targets', '4'))
const depth = Number(getArgValue('--depth', '10'))
const queries = getArgValue(
  '--queries',
  [
    'que hacer si tienes una fuga de agua en casa',
    'por que salta el diferencial',
    'aire acondicionado no enfria que hacer',
    'como saber si una tuberia esta atascada',
  ].join('|')
)
  .split('|')
  .map((query) => query.trim())
  .filter(Boolean)

function getArgValue(name: string, fallback: string): string {
  const inline = args.find((arg) => arg.startsWith(`${name}=`))
  if (inline) return inline.split('=').slice(1).join('=')

  const index = args.indexOf(name)
  if (index >= 0 && args[index + 1]) return args[index + 1]

  return fallback
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function stripHtml(html: string): string {
  return decodeHtml(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function basicAuth(): string {
  return Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString('base64')
}

function assertExecuteEnv(): void {
  if (!DATAFORSEO_LOGIN || !DATAFORSEO_PASSWORD) {
    throw new Error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD in .env.local')
  }
  if (!TEXT_RU_API_KEY) {
    throw new Error('Missing TEXT_RU_API_KEY in .env.local')
  }
}

async function getSerpCandidates(): Promise<SerpCandidate[]> {
  const response = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
    method: 'POST',
    headers: {
      authorization: `Basic ${basicAuth()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      queries.map((keyword) => ({
        keyword,
        location_name: 'Spain',
        language_code: 'es',
        device: 'desktop',
        os: 'windows',
        depth,
      }))
    ),
  })

  const data: any = await response.json()
  if (!response.ok) throw new Error(`DataForSEO HTTP ${response.status}`)
  if (data.status_code && data.status_code !== 20000) {
    throw new Error(`DataForSEO ${data.status_code}: ${data.status_message}`)
  }

  const candidates: SerpCandidate[] = []
  for (const task of data.tasks ?? []) {
    const query = task.data?.keyword ?? 'unknown'
    const items = task.result?.[0]?.items ?? []
    for (const item of items) {
      if (item.type !== 'organic' || !item.url) continue
      const url = String(item.url)
      if (/youtube|facebook|instagram|tiktok|pinterest|amazon|google\./i.test(url)) continue

      candidates.push({
        query,
        position: Number(item.rank_group ?? item.rank_absolute ?? 0),
        title: String(item.title ?? '').trim(),
        url,
        domain: getDomain(url),
      })
    }
  }

  return candidates
}

async function fetchArticleText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36',
      'accept-language': 'es-ES,es;q=0.9,en;q=0.7',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const html = await response.text()
  const articleMatch = html.match(/<article\b[\s\S]*?<\/article>/i)
  const mainMatch = html.match(/<main\b[\s\S]*?<\/main>/i)
  const selectedHtml = articleMatch?.[0] ?? mainMatch?.[0] ?? html
  return stripHtml(selectedHtml)
}

async function postTextRu(params: Record<string, string>): Promise<any> {
  const response = await fetch(TEXT_RU_API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  })
  const raw = await response.text()
  if (!response.ok) throw new Error(`Text.ru HTTP ${response.status}`)
  try {
    return JSON.parse(raw)
  } catch {
    throw new Error(`Text.ru returned non-JSON response: ${raw.slice(0, 120)}`)
  }
}

function parseJsonish(value: any): any {
  if (!value) return undefined
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

function numberFrom(value: any): number | undefined {
  const normalized = Number(String(value ?? '').replace(',', '.'))
  return Number.isFinite(normalized) ? normalized : undefined
}

function extractMetrics(data: any): BenchmarkResult['metrics'] {
  const seoCheck = parseJsonish(data.seo_check ?? data.seoCheck)
  const spellCheck = parseJsonish(data.spell_check ?? data.spellCheck)
  const resultJson = parseJsonish(data.result_json ?? data.resultJson)
  const resultSeo = parseJsonish(resultJson?.seo_check ?? resultJson?.seoCheck)
  const effectiveSeo = seoCheck ?? resultSeo ?? resultJson?.seo ?? resultJson
  const effectiveSpell = spellCheck ?? resultJson?.spell_check ?? resultJson?.spellCheck

  return {
    uniqueness: numberFrom(data.text_unique ?? data.unique ?? data.uniqueness ?? resultJson?.text_unique),
    waterPercent: numberFrom(
      data.water_percent ?? effectiveSeo?.water_percent ?? effectiveSeo?.waterPercent ?? effectiveSeo?.water
    ),
    spamPercent: numberFrom(
      data.spam_percent ?? effectiveSeo?.spam_percent ?? effectiveSeo?.spamPercent ?? effectiveSeo?.spam
    ),
    spellErrors: Array.isArray(effectiveSpell) ? effectiveSpell.length : numberFrom(data.spell_errors),
  }
}

function getError(data: any): string | undefined {
  if (String(data.error_code ?? '') === '181') return undefined
  if (data.error_desc) return `${data.error_code ?? 'error'}: ${data.error_desc}`
  if (data.error) return String(data.error)
  if (data.errors) return JSON.stringify(data.errors)
  return undefined
}

function isPending(data: any): boolean {
  if (String(data.error_code ?? '') === '181') return true
  const status = String(data.status ?? data.state ?? data.result ?? '').toLowerCase()
  return ['wait', 'waiting', 'queue', 'queued', 'process', 'processing', 'check', 'checking'].includes(status)
}

async function checkTextRu(text: string): Promise<BenchmarkResult['metrics']> {
  if (!TEXT_RU_API_KEY) throw new Error('Missing TEXT_RU_API_KEY in .env.local')

  const submission = await postTextRu({
    userkey: TEXT_RU_API_KEY,
    text,
    jsonvisible: 'detail',
  })
  const submissionError = getError(submission)
  if (submissionError) throw new Error(submissionError)

  const uid = submission.text_uid ?? submission.uid ?? submission.textUid
  if (!uid) return extractMetrics(submission)

  for (let attempt = 1; attempt <= TEXT_RU_POLL_ATTEMPTS; attempt += 1) {
    await sleep(TEXT_RU_POLL_DELAY_MS)
    const statusData = await postTextRu({
      userkey: TEXT_RU_API_KEY,
      uid,
      jsonvisible: 'detail',
    })

    const statusError = getError(statusData)
    if (statusError) throw new Error(statusError)
    if (isPending(statusData) && attempt < TEXT_RU_POLL_ATTEMPTS) continue

    return extractMetrics(statusData)
  }

  throw new Error(`Text.ru result was not ready after ${TEXT_RU_POLL_ATTEMPTS} attempts`)
}

function selectCandidates(candidates: SerpCandidate[]): SerpCandidate[] {
  const selected: SerpCandidate[] = []
  const usedDomains = new Set<string>()
  const byQuery = new Map<string, SerpCandidate[]>()

  for (const candidate of candidates) {
    const rows = byQuery.get(candidate.query) ?? []
    rows.push(candidate)
    byQuery.set(candidate.query, rows)
  }

  for (const query of queries) {
    const rows = (byQuery.get(query) ?? []).sort((a, b) => a.position - b.position)
    const candidate = rows.find((row) => !usedDomains.has(row.domain))
    if (!candidate) continue

    selected.push(candidate)
    usedDomains.add(candidate.domain)
    if (selected.length >= maxTargets) return selected
  }

  for (const candidate of candidates.sort((a, b) => a.position - b.position)) {
    if (usedDomains.has(candidate.domain)) continue
    selected.push(candidate)
    usedDomains.add(candidate.domain)
    if (selected.length >= maxTargets) break
  }

  return selected
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log(`Text.ru competitor benchmark: ${execute ? 'execute' : 'dry-run'}`)
  console.log(`Queries: ${queries.join(' | ')}`)
  console.log(`SERP depth: ${depth}`)
  console.log(`Max targets: ${maxTargets}`)

  if (!execute) {
    console.log('Dry-run only. Add --execute to call DataForSEO and Text.ru.')
    return
  }

  assertExecuteEnv()

  const candidates = await getSerpCandidates()
  const selected = selectCandidates(candidates)
  const results: BenchmarkResult[] = []

  console.log(`SERP candidates: ${candidates.length}`)
  console.log(`Selected benchmark URLs: ${selected.length}`)

  for (const candidate of selected) {
    console.log(`- ${candidate.domain} [${candidate.query}] #${candidate.position}`)

    try {
      const text = await fetchArticleText(candidate.url)
      const words = wordCount(text)
      if (text.length < MIN_TEXT_CHARS) {
        results.push({
          ...candidate,
          words,
          chars: text.length,
          skipped: `extracted text too short (${text.length} chars)`,
        })
        continue
      }

      const metrics = await checkTextRu(text)
      results.push({
        ...candidate,
        words,
        chars: text.length,
        ok: true,
        metrics,
      })
    } catch (error) {
      results.push({
        ...candidate,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const successful = results.filter((result) => result.metrics)
  const report = {
    generatedAt: new Date().toISOString(),
    provider: 'text.ru',
    source: 'dataforseo-google-spain-serp',
    queries,
    depth,
    maxTargets,
    candidates: candidates.map(({ query, position, title, url, domain }) => ({
      query,
      position,
      title,
      url,
      domain,
    })),
    results,
    summary: {
      successful: successful.length,
      avgWords: average(successful.map((item) => item.words)),
      avgUniqueness: average(successful.map((item) => item.metrics?.uniqueness)),
      avgWaterPercent: average(successful.map((item) => item.metrics?.waterPercent)),
      avgSpamPercent: average(successful.map((item) => item.metrics?.spamPercent)),
    },
  }

  const outputFile = path.join(
    OUTPUT_DIR,
    `text-ru-competitor-benchmark-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  )
  fs.writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`)

  for (const result of results) {
    const detail = result.metrics
      ? `${result.words} words, ${result.metrics.uniqueness ?? '?'}% unique, water ${result.metrics.waterPercent ?? '?'}%, spam ${result.metrics.spamPercent ?? '?'}%`
      : result.skipped ?? result.error ?? 'no metrics'
    console.log(`  ${result.domain}: ${detail}`)
  }

  console.log(`Report: ${path.relative(ROOT, outputFile)}`)
}

function average(values: Array<number | undefined>): number | undefined {
  const numbers = values.filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
  if (numbers.length === 0) return undefined
  return Math.round((numbers.reduce((sum, value) => sum + value, 0) / numbers.length) * 100) / 100
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
