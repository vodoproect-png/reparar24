#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

const { offpageProspects } = require('../../data/offpage/prospects')
const { prohibitedPatterns, offpageRiskMode } = require('../../data/offpage/anchor-policy')

type Prospect = {
  id: string
  domain: string
  url?: string
  type: string
  country: string
  language: string
  serviceFocus: string[]
  targetUrl: string
  preferredAnchorType: string
  linkAttribute: string
  priceEur?: number
  status: string
  notes: string
  metrics?: {
    domainRank?: number
    organicTraffic?: number
    referringDomains?: number
    outboundLinks?: number
    spamSignals?: number
  }
}

type ScoredProspect = Prospect & {
  riskScore: number
  powerScore: number
  priorityScore: number
  decision: 'approve' | 'manual_review' | 'reject'
  reasons: string[]
}

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, '.tmp', 'offpage')
const CANDIDATES_PATH = path.join(OUT_DIR, 'backlink-prospect-candidates.json')

function add(reasonList: string[], reason: string, points: number): number {
  reasonList.push(`${points > 0 ? '+' : ''}${points}: ${reason}`)
  return points
}

function scoreProspect(prospect: Prospect): ScoredProspect {
  const reasons: string[] = []
  let riskScore = 10
  let powerScore = 20

  const searchable = `${prospect.domain} ${prospect.url || ''} ${prospect.notes}`.toLowerCase()
  const prohibitedHits = prohibitedPatterns.filter((pattern: string) =>
    searchable.includes(pattern.toLowerCase())
  )
  const agencyFootprint =
    /(agencia|marketing digital|posicionamiento seo|desarrollo web|dise[ñn]o web|portfolio|portafolio|ecommerce|hosting|logotipo|branding|presencia online|soluciones digitales)/.test(
      searchable
    )
  const homeRepairContext =
    /(reforma|hogar|casa|vivienda|fontaner|electric|desatasc|clima|calefacci|tuber|limpieza|gas|inmobiliaria|comunidad|mantenimiento|instalador|ferreteria|pavimento|construcci)/.test(
      searchable
    )

  if (prohibitedHits.length) {
    riskScore += add(reasons, `prohibited pattern: ${prohibitedHits.join(', ')}`, 55)
  }

  if (agencyFootprint && !homeRepairContext) {
    riskScore += add(reasons, 'web/SEO agency footprint without home-service context', 42)
  }

  if (homeRepairContext) {
    powerScore += add(reasons, 'home-service or local property context', 16)
  }

  if (prospect.country !== 'ES') {
    riskScore += add(reasons, `country is ${prospect.country}, expected ES`, 12)
  } else {
    powerScore += add(reasons, 'Spain/local country match', 10)
  }

  if (prospect.language !== 'es') {
    riskScore += add(reasons, `language is ${prospect.language}, expected es`, 10)
  } else {
    powerScore += add(reasons, 'Spanish language match', 8)
  }

  if (prospect.preferredAnchorType === 'exact_commercial') {
    riskScore += add(reasons, 'exact commercial anchor requested', 22)
  }

  if (prospect.linkAttribute === 'follow' && prospect.priceEur && prospect.priceEur > 0) {
    riskScore += add(reasons, 'paid follow placement needs manual review', 20)
  }

  if (prospect.type === 'citation' || prospect.type === 'local_directory') {
    powerScore += add(reasons, 'local entity/citation value', 12)
  }

  if (prospect.type === 'local_media' || prospect.type === 'partner' || prospect.type === 'supplier') {
    powerScore += add(reasons, 'high-trust local/contextual placement type', 18)
  }

  if (prospect.type === 'guest_post' || prospect.type === 'niche_blog') {
    riskScore += add(reasons, 'editorial quality must be checked manually', 8)
    powerScore += add(reasons, 'contextual content placement', 14)
  }

  const metrics = prospect.metrics || {}

  if (typeof metrics.domainRank === 'number') {
    if (metrics.domainRank >= 40) powerScore += add(reasons, `domainRank ${metrics.domainRank}`, 16)
    if (metrics.domainRank < 10) riskScore += add(reasons, `weak domainRank ${metrics.domainRank}`, 8)
  }

  if (typeof metrics.organicTraffic === 'number') {
    if (metrics.organicTraffic >= 1000) powerScore += add(reasons, `organic traffic ${metrics.organicTraffic}`, 14)
    if (metrics.organicTraffic === 0) riskScore += add(reasons, 'no visible organic traffic', 14)
  }

  if (typeof metrics.outboundLinks === 'number' && metrics.outboundLinks > 200) {
    riskScore += add(reasons, `high outbound links ${metrics.outboundLinks}`, 18)
  }

  if (typeof metrics.spamSignals === 'number' && metrics.spamSignals > 0) {
    riskScore += add(reasons, `spam signals ${metrics.spamSignals}`, metrics.spamSignals * 10)
  }

  if (offpageRiskMode === 'aggressiveManaged') {
    powerScore += add(reasons, 'aggressiveManaged mode accepts controlled grey prospects', 5)
  }

  riskScore = Math.max(0, Math.min(100, riskScore))
  powerScore = Math.max(0, Math.min(100, powerScore))

  const priorityScore = Math.max(0, Math.min(100, powerScore - Math.round(riskScore * 0.45)))
  const decision =
    riskScore >= 66 ? 'reject' : riskScore >= 46 ? 'manual_review' : 'approve'

  return {
    ...prospect,
    riskScore,
    powerScore,
    priorityScore,
    decision,
    reasons,
  }
}

function readBacklinkCandidates(): Prospect[] {
  if (!fs.existsSync(CANDIDATES_PATH)) return []

  const json = JSON.parse(fs.readFileSync(CANDIDATES_PATH, 'utf8').replace(/^\uFEFF/, ''))
  return json.prospects || []
}

function csvEscape(value: unknown): string {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const backlinkCandidates = readBacklinkCandidates()
  const rows = [...offpageProspects, ...backlinkCandidates]

  const scored: ScoredProspect[] = rows
    .map(scoreProspect)
    .sort((a: ScoredProspect, b: ScoredProspect) => b.priorityScore - a.priorityScore)

  const summary = {
    generatedAt: new Date().toISOString(),
    mode: offpageRiskMode,
    total: scored.length,
    manualProspects: offpageProspects.length,
    backlinkCandidates: backlinkCandidates.length,
    approve: scored.filter((row) => row.decision === 'approve').length,
    manualReview: scored.filter((row) => row.decision === 'manual_review').length,
    reject: scored.filter((row) => row.decision === 'reject').length,
    scored,
  }

  const outPath = path.join(OUT_DIR, 'prospect-scores.json')
  fs.writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8')

  const shortlist = scored.filter((row) => row.decision === 'approve').slice(0, 80)
  const headers = [
    'priorityScore',
    'riskScore',
    'powerScore',
    'decision',
    'domain',
    'url',
    'type',
    'country',
    'language',
    'targetUrl',
    'preferredAnchorType',
    'linkAttribute',
    'notes',
  ]
  const csvPath = path.join(OUT_DIR, 'approved-prospect-shortlist.csv')
  fs.writeFileSync(
    csvPath,
    `${[
      headers.join(','),
      ...shortlist.map((row) => headers.map((header) => csvEscape((row as any)[header])).join(',')),
    ].join('\n')}\n`,
    'utf8'
  )

  console.log('Offpage prospect scoring')
  console.log('========================')
  console.log(`Mode: ${offpageRiskMode}`)
  console.log(`Total: ${summary.total}`)
  console.log(`Manual prospects: ${summary.manualProspects}`)
  console.log(`Backlink candidates: ${summary.backlinkCandidates}`)
  console.log(`Approve: ${summary.approve}`)
  console.log(`Manual review: ${summary.manualReview}`)
  console.log(`Reject: ${summary.reject}`)
  console.log(`Saved: ${path.relative(ROOT, outPath)}`)
  console.log(`Shortlist: ${path.relative(ROOT, csvPath)}`)
}

main()
