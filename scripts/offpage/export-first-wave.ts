#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

const { citationTargets, citationNap } = require('../../data/offpage/citations')
const { offpageProspects } = require('../../data/offpage/prospects')
const { anchorPolicy, targetUrlPriority } = require('../../data/offpage/anchor-policy')

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, '.tmp', 'offpage')
const CANDIDATES_PATH = path.join(OUT_DIR, 'backlink-prospect-candidates.json')
const SCORES_PATH = path.join(OUT_DIR, 'prospect-scores.json')

function csvEscape(value: unknown): string {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function readBacklinkCandidates(): any[] {
  if (fs.existsSync(SCORES_PATH)) {
    const json = JSON.parse(fs.readFileSync(SCORES_PATH, 'utf8').replace(/^\uFEFF/, ''))
    return (json.scored || [])
      .filter((row: any) => row.source === 'dataforseo')
      .filter((row: any) => row.decision === 'approve')
      .filter(isFirstWaveCandidate)
      .sort((a: any, b: any) => b.priorityScore - a.priorityScore)
  }

  if (!fs.existsSync(CANDIDATES_PATH)) return []
  const json = JSON.parse(fs.readFileSync(CANDIDATES_PATH, 'utf8').replace(/^\uFEFF/, ''))
  return json.prospects || []
}

function isFirstWaveCandidate(row: any): boolean {
  const domain = String(row.domain || '').toLowerCase()
  const url = String(row.url || '').toLowerCase()
  const text = `${domain} ${url} ${row.notes || ''}`.toLowerCase()

  if (row.country !== 'ES') return false
  if (/(^|\.)cronoshare\.|(^|\.)habitissimo\.|(^|\.)zaask\./.test(domain)) return false
  if (/soporte|support|help|centro-de-ayuda|\/hc\//.test(url)) return false
  if (/desarrollo web|dise[ñn]o web|marketing digital|posicionamiento seo|portfolio|portafolio|hosting/.test(text)) {
    return false
  }

  return true
}

function isManualProspectExportable(prospect: any): boolean {
  const domain = String(prospect.domain || '').toLowerCase()

  if (['google.com', 'bingplaces.com'].includes(domain)) return false
  if (domain.endsWith('.example')) return false

  return true
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const backlinkCandidates = readBacklinkCandidates()

  const tasks = [
    ...citationTargets.map((target: any, index: number) => ({
      wave: 'citation',
      priority: target.priority,
      order: index + 1,
      domain: new URL(target.url).hostname,
      url: target.url,
      targetUrl: '/',
      anchorType: 'brand',
      suggestedAnchor: citationNap.businessName,
      linkAttribute: 'nofollow',
      action: `Create or update ${target.platform} profile with consistent NAP`,
      status: target.status,
      notes: target.notes,
    })),
    ...offpageProspects.filter(isManualProspectExportable).map((prospect: any, index: number) => ({
      wave: 'prospect',
      priority: prospect.status === 'approved' ? 'high' : 'medium',
      order: index + 1,
      domain: prospect.domain,
      url: prospect.url || '',
      targetUrl: prospect.targetUrl,
      anchorType: prospect.preferredAnchorType,
      suggestedAnchor: prospect.preferredAnchorType === 'naked_url' ? citationNap.website : citationNap.businessName,
      linkAttribute: prospect.linkAttribute,
      action: `Qualify and contact ${prospect.domain}`,
      status: prospect.status,
      notes: prospect.notes,
    })),
    ...backlinkCandidates.slice(0, 50).map((candidate: any, index: number) => ({
      wave: 'competitor-backlink',
      priority: index < 15 ? 'high' : 'medium',
      order: index + 1,
      domain: candidate.domain,
      url: candidate.url || '',
      targetUrl: candidate.targetUrl,
      anchorType: candidate.preferredAnchorType,
      suggestedAnchor: candidate.preferredAnchorType === 'partial_commercial' ? 'servicio Reparar24' : citationNap.businessName,
      linkAttribute: candidate.linkAttribute,
      priorityScore: candidate.priorityScore ?? '',
      riskScore: candidate.riskScore ?? '',
      action: `Review competitor donor and prepare outreach`,
      status: candidate.status,
      notes: `${candidate.notes} | score=${candidate.priorityScore ?? 'n/a'} risk=${candidate.riskScore ?? 'n/a'}`,
    })),
  ]

  const jsonOut = {
    generatedAt: new Date().toISOString(),
    mode: 'aggressiveManaged',
    nap: citationNap,
    anchorPolicy,
    targetUrlPriority,
    counts: {
      citations: citationTargets.length,
      manualProspects: offpageProspects.length,
      backlinkCandidates: backlinkCandidates.length,
      tasks: tasks.length,
    },
    tasks,
  }

  const jsonPath = path.join(OUT_DIR, 'first-wave-tasks.json')
  fs.writeFileSync(jsonPath, `${JSON.stringify(jsonOut, null, 2)}\n`, 'utf8')

  const headers = [
    'wave',
    'priority',
    'order',
    'domain',
    'url',
    'targetUrl',
    'anchorType',
    'suggestedAnchor',
    'linkAttribute',
    'priorityScore',
    'riskScore',
    'action',
    'status',
    'notes',
  ]

  const csvRows = [
    headers.join(','),
    ...tasks.map((task) => headers.map((header) => csvEscape((task as any)[header])).join(',')),
  ]

  const csvPath = path.join(OUT_DIR, 'first-wave-tasks.csv')
  fs.writeFileSync(csvPath, `${csvRows.join('\n')}\n`, 'utf8')

  console.log('Offpage first wave export')
  console.log('=========================')
  console.log(`Citations: ${citationTargets.length}`)
  console.log(`Manual prospects: ${offpageProspects.length}`)
  console.log(`Backlink candidates: ${backlinkCandidates.length}`)
  console.log(`Tasks: ${tasks.length}`)
  console.log(`JSON: ${path.relative(ROOT, jsonPath)}`)
  console.log(`CSV: ${path.relative(ROOT, csvPath)}`)
}

main()
