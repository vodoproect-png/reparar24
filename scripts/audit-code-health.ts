#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type Finding = {
  severity: 'info' | 'warn' | 'error'
  area: string
  message: string
}

type DirEntry = {
  name: string
  isDirectory: () => boolean
}

type CitySeoRecord = {
  serviceId: string
  citySlug: string
}

type DistrictSeoRecord = CitySeoRecord & {
  districtSlug: string
}

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'data', 'lib']
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md'])
const LARGE_FILE_WARN_BYTES = 150 * 1024
const MOJIBAKE_PATTERN = /Вї|в‚¬|ГЎ|Г©|Г­|Гі|Гє|Г±|Гј|Г |Г‰|Г‘|Гњ|�/

const findings: Finding[] = []

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: DirEntry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') return []
      return walk(fullPath)
    }

    return [fullPath]
  })
}

function relative(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, '/')
}

function addFinding(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function auditFileSizeAndEncoding() {
  const files = SCAN_DIRS.flatMap((dir) => walk(path.join(ROOT, dir))).filter((filePath) =>
    TEXT_EXTENSIONS.has(path.extname(filePath))
  )

  for (const filePath of files) {
    const stat = fs.statSync(filePath)
    const file = relative(filePath)

    if (stat.size >= LARGE_FILE_WARN_BYTES) {
      addFinding('warn', 'file-size', `${file} is ${(stat.size / 1024).toFixed(1)} KB`)
    }

    const source = fs.readFileSync(filePath, 'utf8')
    const matches = source.match(new RegExp(MOJIBAKE_PATTERN, 'g'))

    if (matches?.length) {
      addFinding('warn', 'encoding', `${file} has ${matches.length} possible mojibake markers`)
    }
  }
}

function auditDuplicateKeys<T>(
  area: string,
  rows: T[],
  getKey: (row: T) => string
) {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const row of rows) {
    const key = getKey(row)

    if (seen.has(key)) duplicates.add(key)
    seen.add(key)
  }

  if (duplicates.size) {
    addFinding('error', area, `duplicate keys: ${Array.from(duplicates).slice(0, 10).join(', ')}`)
  } else {
    addFinding('info', area, `${rows.length} unique entries`)
  }
}

function readSeoModuleRows<T>(dir: string): T[] {
  const fullDir = path.join(ROOT, dir)

  if (!fs.existsSync(fullDir)) return []

  return fs
    .readdirSync(fullDir)
    .filter((fileName: string) => fileName.endsWith('.ts'))
    .filter((fileName: string) => fileName !== 'index.ts' && fileName !== 'types.ts')
    .flatMap((fileName: string) => {
      const source = fs.readFileSync(path.join(fullDir, fileName), 'utf8')
      const arrayStart = source.indexOf('= [')
      const arrayEnd = source.lastIndexOf(']')

      if (arrayStart === -1 || arrayEnd === -1 || arrayEnd <= arrayStart) {
        addFinding('error', 'seo-data', `${dir}/${fileName} does not expose a parseable array`)
        return []
      }

      return JSON.parse(source.slice(source.indexOf('[', arrayStart), arrayEnd + 1)) as T[]
    })
}

function auditSeoData() {
  const citySEOContent = readSeoModuleRows<CitySeoRecord>('data/city-seo')
  const districtSEOContent = readSeoModuleRows<DistrictSeoRecord>('data/district-seo')

  auditDuplicateKeys(
    'city-seo',
    citySEOContent,
    (content) => `${content.serviceId}:${content.citySlug}`
  )

  auditDuplicateKeys(
    'district-seo',
    districtSEOContent,
    (content) => `${content.serviceId}:${content.citySlug}:${content.districtSlug}`
  )
}

function printFindings() {
  const bySeverity = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Code health audit')
  console.log('=================')

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

  if (process.argv.includes('--strict') && bySeverity.error.length > 0) {
    process.exitCode = 1
  }
}

auditFileSizeAndEncoding()
auditSeoData()
printFindings()
