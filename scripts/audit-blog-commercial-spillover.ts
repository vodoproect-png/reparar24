// @ts-nocheck
/**
 * Classify commercial spillover keywords found during blog semantic collection.
 *
 * The goal is not to create pages automatically. This audit separates:
 * - keywords that should enrich existing commercial pages
 * - keywords that belong to a future commercial architecture
 * - informational/product/safety phrases that should stay in blog support
 * - mapping fixes where the current owner is not the best page
 */

const fs = require('fs')
const path = require('path')

const INPUT = path.join(process.cwd(), '.tmp', 'blog', 'blog-master-backlog-commercial.csv')
const OUT_CSV = path.join(process.cwd(), '.tmp', 'blog', 'blog-commercial-spillover-audit.csv')
const OUT_JSON = path.join(process.cwd(), '.tmp', 'blog', 'blog-commercial-spillover-audit.json')
const OUT_MD = path.join(process.cwd(), 'docs', 'seo', 'blog-commercial-spillover-audit.md')

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      field += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(field)
      field = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      row.push(field)
      if (row.some((value) => value !== '')) rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  if (field || row.length) {
    row.push(field)
    if (row.some((value) => value !== '')) rows.push(row)
  }

  const [header, ...body] = rows
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ''])))
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (!/[",\n]/.test(text)) return text
  return `"${text.replace(/"/g, '""')}"`
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(' |')} |`
  const divider = `| ${columns.map(() => '---').join(' |')} |`
  const body = rows.map((row) => `| ${columns.map((column) => String(row[column.key] ?? '').replace(/\|/g, '/')).join(' |')} |`)
  return [header, divider, ...body].join('\n')
}

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function classify(row) {
  const keyword = normalize(row.keyword)
  const target = row.target

  if (target === 'boletin-electrico' || target === 'legalizacion-electrica') {
    return {
      action: 'future-architecture',
      finalOwner: '/certificados-electricos',
      reason: 'Boletines, CIE, certificados y legalizacion electrica estan bloqueados para una arquitectura futura separada, no como child normal de electricista.',
    }
  }

  if (target === 'productos-y-errores' || /sosa caustica|desatascador casero|wc net|sin desatascador|con desatascador|como /.test(keyword)) {
    return {
      action: 'blog-safety-support',
      finalOwner: row.owner,
      reason: 'Consulta informacional/producto/DIY. Debe responderse en blog con advertencia de seguridad y enlace a la pagina comercial, no como landing comercial principal.',
    }
  }

  if (/cambiar un inodoro|instalar un inodoro|precio.*inodoro|cuanto cobra.*inodoro/.test(keyword)) {
    return {
      action: 'remap-existing-owner',
      finalOwner: '/fontanero/instalacion-cambio-inodoros',
      reason: 'La intencion es instalacion/cambio de inodoro. Ya existe pagina aprobada; no debe ir a cambio de banera por ducha.',
    }
  }

  if (/grifo termostatico|grifo banera|grifo de ducha/.test(keyword)) {
    return {
      action: 'optimize-existing-with-secondary-link',
      finalOwner: row.owner,
      reason: 'Intencion de ducha/griferia. Mantener owner actual si habla de ducha, pero enlazar/armonizar con cambio y reparacion de grifos para evitar solape.',
    }
  }

  return {
    action: 'optimize-existing-owner',
    finalOwner: row.owner,
    reason: 'La intencion comercial encaja con una pagina aprobada existente. Usar como refuerzo de title/meta/FAQ/SEO text sin crear nueva pagina.',
  }
}

function groupRows(rows) {
  return Object.values(rows.reduce((acc, row) => {
    const key = `${row.service}|${row.target}|${row.action}|${row.finalOwner}`
    const group = acc[key] || {
      service: row.serviceLabel,
      target: row.target,
      action: row.action,
      finalOwner: row.finalOwner,
      keywords: 0,
      totalVolume: 0,
      examples: [],
      reason: row.reason,
    }

    group.keywords += 1
    group.totalVolume += Number(row.volume || 0)
    if (group.examples.length < 6) group.examples.push(row.keyword)
    acc[key] = group
    return acc
  }, {})).sort((a, b) => {
    const actionOrder = {
      'optimize-existing-owner': 0,
      'optimize-existing-with-secondary-link': 1,
      'remap-existing-owner': 2,
      'future-architecture': 3,
      'blog-safety-support': 4,
    }
    return (actionOrder[a.action] ?? 9) - (actionOrder[b.action] ?? 9) || b.totalVolume - a.totalVolume
  })
}

function main() {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`Missing commercial backlog input: ${INPUT}`)
  }

  const rows = parseCsv(fs.readFileSync(INPUT, 'utf8')).map((row) => ({
    ...row,
    volume: Number(row.volume || 0),
    ...classify(row),
  }))

  const groups = groupRows(rows)
  const counts = rows.reduce((acc, row) => {
    acc[row.action] = (acc[row.action] || 0) + 1
    return acc
  }, {})

  fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), counts, rows, groups }, null, 2))
  fs.writeFileSync(OUT_CSV, [
    ['service', 'serviceLabel', 'target', 'keyword', 'volume', 'owner', 'action', 'finalOwner', 'reason', 'qualityFlags'].join(','),
    ...rows.map((row) => ['service', 'serviceLabel', 'target', 'keyword', 'volume', 'owner', 'action', 'finalOwner', 'reason', 'qualityFlags'].map((field) => csvEscape(row[field])).join(',')),
  ].join('\n'))

  const md = [
    '# Blog commercial spillover audit',
    '',
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Summary',
    '',
    `- Total commercial spillover keywords: ${rows.length}`,
    `- Optimize existing pages: ${counts['optimize-existing-owner'] || 0}`,
    `- Optimize existing pages with secondary-link caution: ${counts['optimize-existing-with-secondary-link'] || 0}`,
    `- Remap to another existing page: ${counts['remap-existing-owner'] || 0}`,
    `- Future commercial architecture: ${counts['future-architecture'] || 0}`,
    `- Keep as blog safety/support topics: ${counts['blog-safety-support'] || 0}`,
    '',
    '## Decision Groups',
    '',
    markdownTable(groups, [
      { key: 'service', label: 'Service' },
      { key: 'target', label: 'Target' },
      { key: 'action', label: 'Action' },
      { key: 'finalOwner', label: 'Final owner' },
      { key: 'keywords', label: 'Keywords' },
      { key: 'totalVolume', label: 'Volume' },
      { key: 'examples', label: 'Examples' },
    ]),
    '',
    '## Action Rules',
    '',
    '- `optimize-existing-owner`: add the variants to the existing commercial page SEO text, FAQ, title/meta only if length allows, and internal anchors.',
    '- `optimize-existing-with-secondary-link`: update the owner page, but add contextual links to the neighboring commercial page to avoid cannibalization.',
    '- `remap-existing-owner`: fix the semantic owner before writing or optimizing content.',
    '- `future-architecture`: do not force into current service pages; hold for a future certificados/boletines family.',
    '- `blog-safety-support`: write informational/safety blog content and link to the correct service page, but do not use as commercial landing-page primary intent.',
  ].join('\n')

  fs.writeFileSync(OUT_MD, md)

  console.log(`Audit CSV: ${path.relative(process.cwd(), OUT_CSV)}`)
  console.log(`Audit JSON: ${path.relative(process.cwd(), OUT_JSON)}`)
  console.log(`Audit report: ${path.relative(process.cwd(), OUT_MD)}`)
  console.log(JSON.stringify(counts, null, 2))
}

main()
