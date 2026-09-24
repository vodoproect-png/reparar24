import type { Locale } from './config'
import type { Service } from '@/data/services'
import type { City, District } from '@/data/cities'

export interface LightweightDistrictContent {
  intro: string
  expertiseTitle: string
  expertiseParagraphs: string[]
  expertiseHighlights: string[]
  frequentProblemsHeading: string
  emergencyHeading: string
  emergencyText: string
  faqHeading: string
  whyChooseUsHeading: string
  commonQuestionsHeading: string
  professionalServiceHeading: string
  callUrgentCTA: string
  whatsappMessage: string
}

export function getLightweightDistrictContent(
  locale: Locale,
  service: Service,
  city: City,
  district: District
): LightweightDistrictContent | null {
  void locale
  void service
  void city
  void district

  return null
}
