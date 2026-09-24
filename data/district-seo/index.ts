import type { DistrictSEO } from './types.ts'
import { AireAcondicionadoDistrictSEOContent } from './aire-acondicionado.ts'
import { CalefaccionDistrictSEOContent } from './calefaccion.ts'
import { DesatascosDistrictSEOContent } from './desatascos.ts'
import { ElectricistaDistrictSEOContent } from './electricista.ts'
import { FontaneroDistrictSEOContent } from './fontanero.ts'
import { LimpiezaTuberiasDistrictSEOContent } from './limpieza-tuberias.ts'

export type { DistrictSEO } from './types.ts'

export const districtSEOContent: DistrictSEO[] = [
  ...AireAcondicionadoDistrictSEOContent,
  ...CalefaccionDistrictSEOContent,
  ...DesatascosDistrictSEOContent,
  ...ElectricistaDistrictSEOContent,
  ...FontaneroDistrictSEOContent,
  ...LimpiezaTuberiasDistrictSEOContent,
]

const districtSeoContentIndex = new Map(
  districtSEOContent.map((content) => [
    `${content.serviceId}:${content.citySlug}:${content.districtSlug}`,
    content,
  ])
)

const districtSeoByServiceIndex = districtSEOContent.reduce<Record<string, DistrictSEO[]>>(
  (acc, content) => {
    acc[content.serviceId] = acc[content.serviceId] ?? []
    acc[content.serviceId].push(content)
    return acc
  },
  {}
)

export function getDistrictSEOContent(
  serviceId: string,
  citySlug: string,
  districtSlug: string
): DistrictSEO | undefined {
  return districtSeoContentIndex.get(`${serviceId}:${citySlug}:${districtSlug}`)
}

export function hasDistrictSEO(
  serviceId: string,
  citySlug: string,
  districtSlug: string
): boolean {
  return getDistrictSEOContent(serviceId, citySlug, districtSlug) !== undefined
}

export function getServiceDistrictSEO(serviceId: string): DistrictSEO[] {
  return districtSeoByServiceIndex[serviceId] ?? []
}
