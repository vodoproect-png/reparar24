// @ts-nocheck
/**
 * Collect informational blog seeds through the unified keyword provider pipeline.
 *
 * Safe by default:
 * - dry-run unless --execute is passed
 * - duplicate protection is handled by collect-keywords.ts
 * - outputs stay in .tmp/keyword-providers
 */

const fs = require('fs')
const path = require('path')
const { getKeywordProvider } = require('./keyword-providers')
const { findExistingProviderResult, saveProviderResult } = require('./keyword-providers/common')

function getArg(args, name, fallback = undefined) {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : fallback
}

function showHelp() {
  console.log('Blog informational seed collector')
  console.log('=================================\n')
  console.log('USAGE:')
  console.log('  npx ts-node scripts/collect-blog-info-seeds.ts --seed-file scripts/dataforseo-blog-fontaneria-info-seeds.json --max 10')
  console.log('  npx ts-node scripts/collect-blog-info-seeds.ts --seed-file scripts/dataforseo-blog-fontaneria-info-seeds.json --max 10 --execute\n')
  console.log('OPTIONS:')
  console.log('  --seed-file <path>      JSON seed file')
  console.log('  --max <n>               Max seeds to process/show')
  console.log('  --target <name>         Optional group target filter')
  console.log('  --limit <n>             Provider keyword limit per seed, defaults to file limit')
  console.log('  --execute               Call provider')
  console.log('  --force                 Re-collect existing seeds')
  console.log('  --poll-ms <n>           DataForSEO poll interval')
  console.log('  --max-polls <n>         DataForSEO max polls')
  console.log('  --help                  Show help\n')
}

function readSeedFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath)
  if (!fs.existsSync(fullPath)) throw new Error(`Seed file not found: ${filePath}`)
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
}

function buildRows(seedConfig, options) {
  const groups = Array.isArray(seedConfig.groups) ? seedConfig.groups : []
  const rows = []

  for (const group of groups) {
    if (options.target && group.target !== options.target) continue

    for (const seed of group.seeds || []) {
      rows.push({
        provider: seedConfig.provider || 'dataforseo',
        country: seedConfig.country || 'es',
        language: seedConfig.language || 'es',
        limit: options.limit || seedConfig.limit || 100,
        service: seedConfig.service || 'unknown',
        surface: seedConfig.surface || 'blog',
        target: group.target,
        owner: group.owner || '',
        seed,
      })
    }
  }

  return rows.slice(0, options.max)
}

async function runCollector(row, options) {
  const provider = getKeywordProvider(row.provider)
  const request = {
    provider: row.provider,
    seed: row.seed,
    country: row.country,
    language: row.language,
    limit: row.limit,
    execute: options.execute,
    force: options.force,
    pollIntervalMs: options.pollMs,
    maxPolls: options.maxPolls,
  }

  const existingPath = findExistingProviderResult(row.provider, request)
  if (options.execute && existingPath && !options.force) {
    return {
      ...row,
      exitCode: 0,
      skipped: true,
      keywords: 0,
      saved: existingPath,
      error: '',
    }
  }

  try {
    const result = await provider.collect(request)
    const saved = saveProviderResult(result)

    return {
      ...row,
      exitCode: 0,
      skipped: false,
      keywords: Array.isArray(result.keywords) ? result.keywords.length : 0,
      saved,
      error: '',
    }
  } catch (error) {
    return {
      ...row,
      exitCode: 1,
      skipped: false,
      keywords: 0,
      saved: '',
      error: String(error?.message || error).slice(0, 700),
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    showHelp()
    return
  }

  const seedFile = getArg(args, '--seed-file')
  if (!seedFile) throw new Error('--seed-file is required')

  const options = {
    seedFile,
    max: Number(getArg(args, '--max', '9999')),
    target: getArg(args, '--target'),
    limit: getArg(args, '--limit') ? Number(getArg(args, '--limit')) : undefined,
    execute: args.includes('--execute'),
    force: args.includes('--force'),
    pollMs: Number(getArg(args, '--poll-ms', '8000')),
    maxPolls: Number(getArg(args, '--max-polls', '16')),
  }

  const seedConfig = readSeedFile(seedFile)
  const rows = buildRows(seedConfig, options)

  console.log(`Seed file: ${seedFile}`)
  console.log(`Mode: ${options.execute ? 'execute' : 'dry-run'}`)
  console.log(`Rows: ${rows.length}\n`)

  const results = []
  for (const row of rows) {
    results.push(await runCollector(row, options))
  }

  const outDir = path.join(process.cwd(), '.tmp', 'blog')
  fs.mkdirSync(outDir, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outFile = path.join(outDir, `blog-info-collection-${seedConfig.service || 'service'}-${stamp}.json`)
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        seedFile,
        mode: options.execute ? 'execute' : 'dry-run',
        summary: {
          rows: results.length,
          collected: results.filter((result) => result.exitCode === 0 && !result.skipped).length,
          skipped: results.filter((result) => result.skipped).length,
          failed: results.filter((result) => result.exitCode !== 0).length,
          keywords: results.reduce((sum, result) => sum + Number(result.keywords || 0), 0),
        },
        results,
      },
      null,
      2
    )
  )

  console.log(`Report: ${path.relative(process.cwd(), outFile)}`)
  console.table(
    results.map((result) => ({
      target: result.target,
      seed: result.seed,
      status: result.exitCode !== 0 ? 'failed' : result.skipped ? 'skipped' : 'collected',
      keywords: result.keywords,
    }))
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
