import fs from 'fs'
import path from 'path'
import { services } from '../data/services'
import type { ChildPageServiceSlug } from '../data/service-child-page-content'
import { childServicesData as fontaneroChildServicesData } from '../data/fontanero/child-services-seo'
import { childServicesData as electricistaChildServicesData } from '../data/electricista/child-services-seo'
import { desatascosChildServicesData } from '../data/desatascos/child-services-seo'
import { aireAcondicionadoChildServicesData } from '../data/aire-acondicionado/child-services-seo'
import { calefaccionChildServicesData } from '../data/calefaccion/child-services-seo'
import { limpiezaTuberiasChildServicesData } from '../data/limpieza-tuberias/child-services-seo'
import { citySEOContent } from '../data/city-seo'
import { districtSEOContent } from '../data/district-seo'

type ServiceKeywordBucket = {
  service: ChildPageServiceSlug
  keywords: string[]
}

const OUTPUT_DIR = path.join(process.cwd(), '.tmp', 'ahrefs')
const CSV_OUTPUT = path.join(OUTPUT_DIR, 'service-keywords-283.csv')
const TXT_OUTPUT = path.join(OUTPUT_DIR, 'service-keywords-283.txt')

const SERVICE_ORDER: ChildPageServiceSlug[] = [
  'fontanero',
  'electricista',
  'desatascos',
  'aire-acondicionado',
  'calefaccion',
  'limpieza-tuberias',
]

const TARGET_TOTAL = 283

const CHILD_SERVICES_BY_SERVICE = {
  fontanero: fontaneroChildServicesData,
  electricista: electricistaChildServicesData,
  desatascos: desatascosChildServicesData,
  'aire-acondicionado': aireAcondicionadoChildServicesData,
  calefaccion: calefaccionChildServicesData,
  'limpieza-tuberias': limpiezaTuberiasChildServicesData,
} as const

function normalizeKeyword(keyword: string): string {
  return keyword
    .replace(/ГЎ/g, 'a')
    .replace(/Г©/g, 'e')
    .replace(/Г­/g, 'i')
    .replace(/Гі/g, 'o')
    .replace(/Гє/g, 'u')
    .replace(/Г±/g, 'n')
    .replace(/ГЃ/g, 'A')
    .replace(/Г‰/g, 'E')
    .replace(/ГЌ/g, 'I')
    .replace(/Г“/g, 'O')
    .replace(/Гљ/g, 'U')
    .replace(/Г‘/g, 'N')
    .replace(/Вї/g, '')
    .replace(/ВЎ/g, '')
    .normalize('NFC')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[“”"]/g, '')
    .trim()
    .toLowerCase()
}

function addUnique(target: string[], seen: Set<string>, keyword: unknown) {
  if (typeof keyword !== 'string') return
  const normalized = normalizeKeyword(keyword)
  if (!normalized || normalized.length < 3) return
  if (seen.has(normalized)) return
  seen.add(normalized)
  target.push(normalized)
}

function collectServiceKeywords(serviceSlug: ChildPageServiceSlug): string[] {
  const service = services.find((item) => item.slug === serviceSlug)
  const childServices = CHILD_SERVICES_BY_SERVICE[serviceSlug]
  const citySeo = citySEOContent.filter((entry) => entry.serviceId === serviceSlug)
  const districtSeo = districtSEOContent.filter((entry) => entry.serviceId === serviceSlug)
  const seen = new Set<string>()
  const keywords: string[] = []

  addUnique(keywords, seen, service?.name)
  service?.keywords.forEach((keyword) => addUnique(keywords, seen, keyword))

  Object.values(childServices).forEach((child) => {
    addUnique(keywords, seen, child.lockedPrimaryKw)
    child.secondaryKw.forEach((keyword) => addUnique(keywords, seen, keyword))
    child.seoContent.keywordTags?.forEach((keyword) => addUnique(keywords, seen, keyword))
  })

  citySeo.forEach((entry) => {
    entry.keywords?.primary?.forEach((keyword: string) => addUnique(keywords, seen, keyword))
    entry.keywords?.secondary?.forEach((keyword: string) => addUnique(keywords, seen, keyword))
    entry.keywords?.longTail?.forEach((keyword: string) => addUnique(keywords, seen, keyword))
  })

  districtSeo.forEach((entry) => {
    entry.semanticOwnership?.forEach((keyword: string) => addUnique(keywords, seen, keyword))
  })

  return keywords
}

function balancedQuotas(total: number, buckets: number): number[] {
  const base = Math.floor(total / buckets)
  const remainder = total % buckets
  return Array.from({ length: buckets }, (_, index) => base + (index < remainder ? 1 : 0))
}

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

const buckets: ServiceKeywordBucket[] = SERVICE_ORDER.map((serviceSlug) => ({
  service: serviceSlug,
  keywords: collectServiceKeywords(serviceSlug),
}))

const quotas = balancedQuotas(TARGET_TOTAL, buckets.length)
const selected = buckets.flatMap((bucket, bucketIndex) =>
  bucket.keywords.slice(0, quotas[bucketIndex]).map((keyword) => ({
    service: bucket.service,
    keyword,
  }))
)

if (selected.length !== TARGET_TOTAL) {
  throw new Error(`Expected ${TARGET_TOTAL} keywords, got ${selected.length}`)
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.writeFileSync(
  CSV_OUTPUT,
  ['service,keyword', ...selected.map((row) => `${escapeCsv(row.service)},${escapeCsv(row.keyword)}`)].join('\n'),
  'utf8'
)
fs.writeFileSync(TXT_OUTPUT, selected.map((row) => row.keyword).join('\n'), 'utf8')

console.log(`Exported ${selected.length} keywords`)
buckets.forEach((bucket, index) => {
  console.log(`- ${bucket.service}: ${quotas[index]} selected from ${bucket.keywords.length}`)
})
console.log(`CSV: ${CSV_OUTPUT}`)
console.log(`TXT: ${TXT_OUTPUT}`)
