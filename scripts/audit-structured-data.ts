#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')

type JsonLdNode = Record<string, any>
type Finding = {
  route: string
  message: string
}

const ROOT = process.cwd()
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app')
const findings: Finding[] = []

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: any) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(HTML_ROOT, filePath).replace(/\\/g, '/')

  if (relative === 'es.html') return '/'
  if (!relative.startsWith('es/')) return `/${relative.replace(/\.html$/, '')}`

  return `/${relative.slice(3).replace(/\.html$/, '')}`
}

function getAllMatches(source: string, pattern: RegExp): string[] {
  return Array.from(source.matchAll(pattern)).map((match) => match[1] ?? '')
}

function getTypes(node: JsonLdNode): string[] {
  const type = node['@type']
  if (Array.isArray(type)) return type
  return type ? [type] : []
}

function visit(node: any, callback: (node: JsonLdNode) => void) {
  if (!node || typeof node !== 'object') return

  if (!Array.isArray(node)) {
    callback(node)
  }

  Object.values(node).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => visit(item, callback))
      return
    }

    visit(value, callback)
  })
}

function add(route: string, message: string) {
  findings.push({ route, message })
}

function auditNode(route: string, node: JsonLdNode) {
  const types = getTypes(node)

  if (types.includes('LocalBusiness') && 'serviceType' in node) {
    add(route, 'LocalBusiness contains unsupported serviceType property')
  }

  if (types.includes('Service') && 'available' in node) {
    add(route, 'Service contains unsupported available property')
  }

  if (types.includes('Offer')) {
    const priceSpecification = node.priceSpecification
    if (
      priceSpecification &&
      !('price' in priceSpecification) &&
      !('minPrice' in priceSpecification) &&
      !('maxPrice' in priceSpecification)
    ) {
      add(route, 'Offer priceSpecification has no numeric price/minPrice/maxPrice')
    }
  }

  if (types.includes('BreadcrumbList')) {
    const items = Array.isArray(node.itemListElement) ? node.itemListElement : []
    items.forEach((item: JsonLdNode, index: number) => {
      if (!item.item) {
        add(route, `BreadcrumbList item #${index + 1} has no item URL`)
      }
    })
  }
}

function auditHtml(filePath: string) {
  const route = routeFromHtmlPath(filePath)
  const html = fs.readFileSync(filePath, 'utf8')
  const scripts = getAllMatches(
    html,
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g
  )

  scripts.forEach((script, index) => {
    try {
      const parsed = JSON.parse(script)
      visit(parsed, (node) => auditNode(route, node))
    } catch {
      add(route, `invalid JSON-LD script #${index + 1}`)
    }
  })
}

if (!fs.existsSync(HTML_ROOT)) {
  console.error('Missing .next/server/app. Run npm run build first.')
  process.exit(1)
}

walk(HTML_ROOT)
  .filter((filePath) => filePath.endsWith('.html'))
  .forEach(auditHtml)

console.log('Structured data audit')
console.log('=====================')

if (!findings.length) {
  console.log('OK: no local structured data regressions found.')
} else {
  findings.slice(0, 120).forEach((finding) => {
    console.log(`- ${finding.route}: ${finding.message}`)
  })

  if (findings.length > 120) {
    console.log(`- ... ${findings.length - 120} more`)
  }

  console.log(`\nSummary: ${findings.length} finding(s)`)
  process.exitCode = 1
}
