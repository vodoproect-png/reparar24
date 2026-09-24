import fs from 'fs'
import path from 'path'

const csvPath = path.join(process.cwd(), 'docs', 'seo', 'exports', 'fontanero-seo-keywords-2026-06-22.csv')
const outPath = path.join(process.cwd(), 'docs', 'seo', 'exports', 'fontanero-seo-keywords-2026-06-22-audit.md')

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let value = ''
  let quoted = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"' && quoted && next === '"') {
      value += '"'
      i += 1
      continue
    }

    if (char === '"') {
      quoted = !quoted
      continue
    }

    if (char === ',' && !quoted) {
      result.push(value)
      value = ''
      continue
    }

    value += char
  }

  result.push(value)
  return result
}

const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(Boolean)
const rows = lines.slice(1).map((line) => {
  const [page, type, keyword, source] = parseCsvLine(line)
  return { page, type, keyword, source }
})

const checks = [
  {
    label: 'mojibake UTF-8/CP1251',
    test: (value: string) => /Вї|ВЎ|в‚¬|Г[^\s]/.test(value),
  },
  {
    label: 'broken question/template punctuation',
    test: (value: string) => /^\?|[?]{2,}|[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]\?[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(value),
  },
  {
    label: 'raw euro mojibake',
    test: (value: string) => value.includes('в‚¬'),
  },
  {
    label: 'non-Valencia geo modifier',
    test: (value: string) => /\b(madrid|barcelona|sevilla|malaga|zaragoza)\b/i.test(value),
  },
  {
    label: 'likely informational question in commercial export',
    test: (value: string) => /^(¿)?(como|cómo|por que|por qué|cuanto|cuánto|cuando|cuándo|que hacer|qué hacer)\b/i.test(value),
  },
]

const report: string[] = []
report.push('# Fontanero Keywords Export Audit')
report.push('')
report.push(`Rows checked: ${rows.length}`)
report.push('')

for (const check of checks) {
  const matches = rows.filter((row) => check.test(row.keyword))
  report.push(`## ${check.label}`)
  report.push('')
  report.push(`Rows: ${matches.length}`)
  report.push('')

  const grouped = new Map<string, typeof matches>()
  for (const row of matches) {
    const key = row.source
    grouped.set(key, [...(grouped.get(key) ?? []), row])
  }

  for (const [source, sourceRows] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    report.push(`### ${source}`)
    report.push('')
    for (const row of sourceRows.slice(0, 80)) {
      report.push(`- ${row.page} | ${row.type}: ${row.keyword}`)
    }
    if (sourceRows.length > 80) report.push(`- ...and ${sourceRows.length - 80} more`)
    report.push('')
  }
}

fs.writeFileSync(outPath, report.join('\n'), 'utf8')

console.log(`Audit: ${path.relative(process.cwd(), outPath)}`)
for (const check of checks) {
  console.log(`${check.label}: ${rows.filter((row) => check.test(row.keyword)).length}`)
}
