#!/usr/bin/env ts-node

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

type Finding = {
  severity: 'error' | 'warn' | 'info'
  area: string
  message: string
}

type FileSize = {
  file: string
  bytes: number
  gzipBytes?: number
}

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')
const NEXT_STATIC_DIR = path.join(ROOT, '.next', 'static')
const SOURCE_DIRS = ['app', 'components', 'lib']
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const TEXT_EXTENSIONS = new Set(['.ts', '.tsx'])

const IMAGE_WARN_BYTES = 450 * 1024
const IMAGE_ERROR_BYTES = 900 * 1024
const JS_CHUNK_WARN_GZIP_BYTES = 80 * 1024
const CSS_WARN_GZIP_BYTES = 45 * 1024

const findings: Finding[] = []

function add(severity: Finding['severity'], area: string, message: string) {
  findings.push({ severity, area, message })
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry: any) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

function relative(filePath: string): string {
  return path.relative(ROOT, filePath).replace(/\\/g, '/')
}

function gzipSize(filePath: string): number {
  return zlib.gzipSync(fs.readFileSync(filePath)).length
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function topFiles(files: FileSize[], count: number): string {
  return files
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, count)
    .map((item) => `${item.file} (${formatBytes(item.bytes)})`)
    .join('; ')
}

function auditPublicImages() {
  const images = walk(PUBLIC_DIR)
    .filter((filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .map((filePath) => ({
      file: relative(filePath),
      bytes: fs.statSync(filePath).size,
    }))

  const oversized = images.filter((image) => image.bytes >= IMAGE_ERROR_BYTES)
  const heavy = images.filter((image) => image.bytes >= IMAGE_WARN_BYTES && image.bytes < IMAGE_ERROR_BYTES)

  if (oversized.length) {
    add('error', 'images', `oversized public images: ${topFiles(oversized, 10)}`)
  }

  if (heavy.length) {
    add('warn', 'images', `heavy public images: ${topFiles(heavy, 12)}`)
  }

  add('info', 'images', `${images.length} public raster images; largest: ${topFiles(images, 8)}`)
}

function auditStaticBundles() {
  const staticFiles = walk(NEXT_STATIC_DIR)
  const jsFiles = staticFiles
    .filter((filePath) => filePath.endsWith('.js'))
    .map((filePath) => ({
      file: relative(filePath),
      bytes: fs.statSync(filePath).size,
      gzipBytes: gzipSize(filePath),
    }))
  const cssFiles = staticFiles
    .filter((filePath) => filePath.endsWith('.css'))
    .map((filePath) => ({
      file: relative(filePath),
      bytes: fs.statSync(filePath).size,
      gzipBytes: gzipSize(filePath),
    }))

  const heavyJs = jsFiles.filter((file) => (file.gzipBytes ?? 0) >= JS_CHUNK_WARN_GZIP_BYTES)
  const heavyCss = cssFiles.filter((file) => (file.gzipBytes ?? 0) >= CSS_WARN_GZIP_BYTES)

  for (const file of heavyJs) {
    add('warn', 'javascript', `${file.file} is ${formatBytes(file.bytes)} raw / ${formatBytes(file.gzipBytes ?? 0)} gzip`)
  }

  for (const file of heavyCss) {
    add('warn', 'css', `${file.file} is ${formatBytes(file.bytes)} raw / ${formatBytes(file.gzipBytes ?? 0)} gzip`)
  }

  add(
    'info',
    'javascript',
    `${jsFiles.length} JS chunks; largest gzip: ${jsFiles
      .sort((a, b) => (b.gzipBytes ?? 0) - (a.gzipBytes ?? 0))
      .slice(0, 5)
      .map((file) => `${file.file} (${formatBytes(file.gzipBytes ?? 0)})`)
      .join('; ')}`
  )

  if (cssFiles.length) {
    add(
      'info',
      'css',
      `${cssFiles.length} CSS files; largest gzip: ${cssFiles
        .sort((a, b) => (b.gzipBytes ?? 0) - (a.gzipBytes ?? 0))
        .slice(0, 3)
        .map((file) => `${file.file} (${formatBytes(file.gzipBytes ?? 0)})`)
        .join('; ')}`
    )
  }
}

function auditImageUsage() {
  const sourceFiles = SOURCE_DIRS.flatMap((dir) => walk(path.join(ROOT, dir))).filter((filePath) =>
    TEXT_EXTENSIONS.has(path.extname(filePath))
  )

  let nextImageImports = 0
  let rawImgTags = 0
  let heroPriorityUsages = 0

  for (const filePath of sourceFiles) {
    const source = fs.readFileSync(filePath, 'utf8')
    if (source.includes("from 'next/image'") || source.includes('from "next/image"')) nextImageImports += 1

    const imgMatches = source.match(/<img\b/g)
    if (imgMatches) rawImgTags += imgMatches.length

    if (source.includes('priority') && source.includes('fetchPriority="high"')) {
      heroPriorityUsages += 1
    }
  }

  if (rawImgTags > 0) {
    add('warn', 'image-usage', `${rawImgTags} raw <img> tag(s) found; prefer next/image unless SVG/icon-specific`)
  }

  add('info', 'image-usage', `${nextImageImports} files import next/image; ${heroPriorityUsages} high-priority hero image pattern(s)`)
}

function printFindings() {
  const grouped = {
    error: findings.filter((finding) => finding.severity === 'error'),
    warn: findings.filter((finding) => finding.severity === 'warn'),
    info: findings.filter((finding) => finding.severity === 'info'),
  }

  console.log('Performance budget audit')
  console.log('========================')

  for (const severity of ['error', 'warn', 'info'] as const) {
    if (!grouped[severity].length) continue

    console.log(`\n${severity.toUpperCase()}`)
    for (const finding of grouped[severity]) {
      console.log(`- [${finding.area}] ${finding.message}`)
    }
  }

  console.log(`\nSummary: ${grouped.error.length} errors, ${grouped.warn.length} warnings`)

  if (grouped.error.length > 0) process.exitCode = 1
}

if (!fs.existsSync(NEXT_STATIC_DIR)) {
  console.error('Missing .next/static. Run npm run build first.')
  process.exit(1)
}

auditPublicImages()
auditStaticBundles()
auditImageUsage()
printFindings()
