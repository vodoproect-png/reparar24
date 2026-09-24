#!/usr/bin/env ts-node

const { spawnSync } = require('child_process')
const path = require('path')

const ROOT = process.cwd()

function run(label: string, args: string[]) {
  const tsNodePath = path.join(ROOT, 'node_modules', 'ts-node', 'dist', 'bin.js')
  console.log(`\n${label}`)
  console.log('='.repeat(label.length))

  const result = spawnSync(process.execPath, [tsNodePath, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    shell: false,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

function main() {
  const args = process.argv.slice(2)
  const execute = args.includes('--execute')
  const force = args.includes('--force')
  const limitArgIndex = args.indexOf('--limit')
  const limit = limitArgIndex >= 0 ? args[limitArgIndex + 1] : '100'

  const collectArgs = [
    'scripts/offpage/collect-competitor-backlinks.ts',
    '--limit',
    limit,
  ]
  if (execute) collectArgs.push('--execute')
  if (force) collectArgs.push('--force')

  run('Collect competitor backlinks', collectArgs)
  run('Normalize backlink prospects', ['scripts/offpage/normalize-backlink-prospects.ts'])
  run('Score prospects', ['scripts/offpage/score-prospects.ts'])
  run('Export first wave', ['scripts/offpage/export-first-wave.ts'])
  run('Generate outreach briefs', ['scripts/offpage/generate-outreach-briefs.ts'])
  run('Export BuzzStream CSV', ['scripts/offpage/export-buzzstream-csv.ts'])
  run('Audit anchor risk', ['scripts/offpage/audit-anchor-risk.ts'])
}

main()
