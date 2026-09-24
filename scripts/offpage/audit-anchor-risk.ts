#!/usr/bin/env ts-node

const { anchorPolicy, targetUrlPriority } = require('../../data/offpage/anchor-policy')
const { offpagePlacements } = require('../../data/offpage/placements')

type Placement = {
  id: string
  domain: string
  pageUrl: string
  targetUrl: string
  anchor: string
  anchorType: string
  linkAttribute: string
  status: string
}

type Finding = {
  severity: 'info' | 'warn' | 'error'
  area: string
  message: string
}

const findings: Finding[] = []

function addFinding(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function percent(part: number, total: number): number {
  if (!total) return 0
  return Math.round((part / total) * 1000) / 10
}

function auditAnchorDistribution(placements: Placement[]) {
  const live = placements.filter((placement) =>
    ['published', 'indexed'].includes(placement.status)
  )

  if (!live.length) {
    addFinding('info', 'anchors', 'no published placements yet')
    return
  }

  for (const rule of anchorPolicy) {
    const count = live.filter((placement) => placement.anchorType === rule.type).length
    const share = percent(count, live.length)

    if (share > rule.maxPercent) {
      addFinding(
        rule.type === 'exact_commercial' ? 'error' : 'warn',
        'anchors',
        `${rule.type} is ${share}% (${count}/${live.length}), max ${rule.maxPercent}%`
      )
    } else if (share < rule.minPercent && live.length >= 10) {
      addFinding(
        'warn',
        'anchors',
        `${rule.type} is ${share}% (${count}/${live.length}), min ${rule.minPercent}%`
      )
    } else {
      addFinding('info', 'anchors', `${rule.type}: ${share}% (${count}/${live.length})`)
    }
  }
}

function auditTargetConcentration(placements: Placement[]) {
  const live = placements.filter((placement) =>
    ['published', 'indexed'].includes(placement.status)
  )

  if (!live.length) return

  const counts = new Map<string, number>()
  for (const placement of live) {
    counts.set(placement.targetUrl, (counts.get(placement.targetUrl) || 0) + 1)
  }

  for (const [targetUrl, count] of counts.entries()) {
    const share = percent(count, live.length)
    if (share > 45 && live.length >= 10) {
      addFinding('warn', 'target-url', `${targetUrl} receives ${share}% of live placements`)
    }
  }

  for (const targetUrl of targetUrlPriority) {
    if (!counts.has(targetUrl)) {
      addFinding('info', 'target-url', `${targetUrl} has no live offpage placement yet`)
    }
  }
}

function auditDuplicateDomains(placements: Placement[]) {
  const live = placements.filter((placement) =>
    ['published', 'indexed'].includes(placement.status)
  )

  const counts = new Map<string, number>()
  for (const placement of live) {
    counts.set(placement.domain, (counts.get(placement.domain) || 0) + 1)
  }

  for (const [domain, count] of counts.entries()) {
    if (count >= 4) {
      addFinding('warn', 'domain-repeat', `${domain} has ${count} live placements`)
    }
  }
}

function printFindings() {
  const bySeverity = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Offpage anchor risk audit')
  console.log('=========================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!bySeverity[severity].length) continue
    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of bySeverity[severity]) {
      console.log(`- [${finding.area}] ${finding.message}`)
    }
  }

  console.log(
    `\nSummary: ${bySeverity.error.length} errors, ${bySeverity.warn.length} warnings, ${bySeverity.info.length} info`
  )

  if (bySeverity.error.length > 0) {
    process.exitCode = 1
  }
}

auditAnchorDistribution(offpagePlacements)
auditTargetConcentration(offpagePlacements)
auditDuplicateDomains(offpagePlacements)
printFindings()
