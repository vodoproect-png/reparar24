import type { Locale } from './config'
import type { Service } from '@/data/services'
import type { City } from '@/data/cities'

export interface LightweightCityContent {
  h1: string
  intro: string
  coverageHeading: string
  ourServiceHeading: string
  otherServicesHeading: string
  faqHeading: string
  callNowCTA: string
  service24hBadge: string
  schemaNameSuffix: string
  schemaDescPrefix: string
}

export function getLightweightCityContent(
  locale: Locale,
  service: Service,
  city: City
): LightweightCityContent | null {
  void locale
  void service
  void city

  return null
}
