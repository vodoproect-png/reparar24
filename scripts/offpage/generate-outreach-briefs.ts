#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

const { outreachBudgetPolicy, outreachTemplates } = require('../../data/offpage/outreach-policy')
const { citationNap } = require('../../data/offpage/citations')

type FirstWaveTask = {
  wave: string
  priority: string
  order: number
  domain: string
  url: string
  targetUrl: string
  anchorType: string
  suggestedAnchor: string
  linkAttribute: string
  priorityScore?: number
  riskScore?: number
  action: string
  status: string
  notes: string
}

const ROOT = process.cwd()
const OFFPAGE_DIR = path.join(ROOT, '.tmp', 'offpage')
const FIRST_WAVE_PATH = path.join(OFFPAGE_DIR, 'first-wave-tasks.json')
const OUT_DIR = path.join(OFFPAGE_DIR, 'outreach')

function csvEscape(value: unknown): string {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

function templateByDecision(decision: string) {
  return outreachTemplates.find((template: any) => template.decision === decision) || outreachTemplates[1]
}

function decide(task: FirstWaveTask) {
  const text = `${task.domain} ${task.url} ${task.notes}`.toLowerCase()
  const risk = Number(task.riskScore || 0)

  if (risk > outreachBudgetPolicy.manualReviewAboveRiskScore) {
    return {
      decision: 'skip',
      reason: `risk ${risk} is above manual threshold`,
      maxOfferEur: 0,
      rel: 'nofollow',
    }
  }

  if (task.wave === 'citation') {
    return {
      decision: 'submit_profile',
      reason: 'citation/NAP profile',
      maxOfferEur: 0,
      rel: 'nofollow',
    }
  }

  if (/noticias|tribuna|ticpymes|blog|decor|hogar|reforma|pavimento|inmobiliaria/.test(text)) {
    return {
      decision: 'pitch_article',
      reason: 'editorial or home-content context',
      maxOfferEur: outreachBudgetPolicy.preferredPaidPlacementEur,
      rel: task.linkAttribute === 'follow' ? 'sponsored_or_nofollow_if_paid' : task.linkAttribute,
    }
  }

  if (/fontaner|electric|clima|calefacci|limpieza|desatasc|gas|instalador/.test(text)) {
    return {
      decision: 'request_mention',
      reason: 'service-adjacent topical context',
      maxOfferEur: outreachBudgetPolicy.maxPaidPlacementEur,
      rel: task.linkAttribute === 'follow' ? 'follow_allowed_if_editorial' : task.linkAttribute,
    }
  }

  return {
    decision: 'negotiate_paid',
    reason: 'needs commercial qualification',
    maxOfferEur: outreachBudgetPolicy.preferredPaidPlacementEur,
    rel: 'sponsored_or_nofollow_if_paid',
  }
}

function anchorForTask(task: FirstWaveTask): string {
  if (task.anchorType === 'partial_commercial') return 'servicio Reparar24'
  if (task.anchorType === 'naked_url') return citationNap.website
  if (task.anchorType === 'local_brand') return 'Reparar24 en Valencia'
  return 'Reparar24'
}

function targetUrl(task: FirstWaveTask): string {
  return `https://reparar24.es${task.targetUrl === '/' ? '' : task.targetUrl}`
}

function main() {
  if (!fs.existsSync(FIRST_WAVE_PATH)) {
    throw new Error(`First wave file not found: ${path.relative(ROOT, FIRST_WAVE_PATH)}`)
  }

  fs.mkdirSync(OUT_DIR, { recursive: true })

  const firstWave = JSON.parse(fs.readFileSync(FIRST_WAVE_PATH, 'utf8').replace(/^\uFEFF/, ''))
  const tasks: FirstWaveTask[] = firstWave.tasks || []

  const briefs = tasks.map((task) => {
    const action = decide(task)
    const template = templateByDecision(action.decision)
    const anchor = anchorForTask(task)
    const target = targetUrl(task)

    return {
      id: `${task.wave}-${task.order}-${task.domain}`.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase(),
      domain: task.domain,
      sourceUrl: task.url,
      wave: task.wave,
      priority: task.priority,
      decision: action.decision,
      reason: action.reason,
      maxOfferEur: action.maxOfferEur,
      targetUrl: target,
      anchor,
      relPolicy: action.rel,
      riskScore: task.riskScore ?? '',
      priorityScore: task.priorityScore ?? '',
      subject: template.subject,
      message: template.body
        .replaceAll('https://reparar24.es', target)
        .replaceAll(`${'Reparar24'} S.L.`, 'ATG S.L.'),
      notes: task.notes,
    }
  })

  const actionable = briefs.filter((brief) => brief.decision !== 'skip')
  const jsonPath = path.join(OUT_DIR, 'outreach-briefs.json')
  fs.writeFileSync(
    jsonPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        policy: outreachBudgetPolicy,
        total: briefs.length,
        actionable: actionable.length,
        skipped: briefs.length - actionable.length,
        briefs,
      },
      null,
      2
    )}\n`,
    'utf8'
  )

  const headers = [
    'priority',
    'decision',
    'domain',
    'sourceUrl',
    'targetUrl',
    'anchor',
    'relPolicy',
    'maxOfferEur',
    'priorityScore',
    'riskScore',
    'subject',
    'reason',
  ]

  const csvPath = path.join(OUT_DIR, 'outreach-briefs.csv')
  fs.writeFileSync(
    csvPath,
    `${[
      headers.join(','),
      ...actionable.map((brief) => headers.map((header) => csvEscape((brief as any)[header])).join(',')),
    ].join('\n')}\n`,
    'utf8'
  )

  const markdownPath = path.join(OUT_DIR, 'outreach-briefs.md')
  const markdown = [
    '# Reparar24 Outreach Briefs',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Actionable: ${actionable.length}`,
    '',
    ...actionable.slice(0, 30).flatMap((brief, index) => [
      `## ${index + 1}. ${brief.domain}`,
      '',
      `Decision: ${brief.decision}`,
      `Target: ${brief.targetUrl}`,
      `Anchor: ${brief.anchor}`,
      `Rel policy: ${brief.relPolicy}`,
      `Max offer: ${brief.maxOfferEur} EUR`,
      `Subject: ${brief.subject}`,
      '',
      '```text',
      brief.message,
      '```',
      '',
    ]),
  ].join('\n')
  fs.writeFileSync(markdownPath, markdown, 'utf8')

  console.log('Offpage outreach briefs')
  console.log('=======================')
  console.log(`Total: ${briefs.length}`)
  console.log(`Actionable: ${actionable.length}`)
  console.log(`Skipped: ${briefs.length - actionable.length}`)
  console.log(`JSON: ${path.relative(ROOT, jsonPath)}`)
  console.log(`CSV: ${path.relative(ROOT, csvPath)}`)
  console.log(`MD: ${path.relative(ROOT, markdownPath)}`)
}

try {
  main()
} catch (error: any) {
  console.error(`Outreach brief generation failed: ${error.message}`)
  process.exit(1)
}
