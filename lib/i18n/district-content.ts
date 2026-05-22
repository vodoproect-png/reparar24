/**
 * Lightweight District Content for EN/RU Locales
 * 
 * IMPORTANT: This is a LIGHTWEIGHT implementation for non-Spanish locales.
 * Spanish (es) continues to use the full semantic-content-generator.ts
 * 
 * EN/RU pages receive basic translated content to eliminate Spanish contamination
 * while maintaining SEO freeze (pages blocked from indexing).
 */

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

/**
 * Generate lightweight English content for district pages
 */
function generateLightweightEN(
  service: Service,
  city: City,
  district: District
): LightweightDistrictContent {
  return {
    intro: `Professional ${service.name.toLowerCase()} services in ${district.name}, ${city.name}. Fast response, certified professionals, transparent pricing.`,
    expertiseTitle: 'Our Local Expertise',
    expertiseParagraphs: [
      `We provide professional ${service.name.toLowerCase()} services throughout ${district.name}. Our experienced team knows the area and responds quickly to all service requests.`,
      `Available 24/7 for emergencies. Certified professionals with transparent pricing and guaranteed work quality.`
    ],
    expertiseHighlights: service.benefits.slice(0, 3),
    frequentProblemsHeading: `Common Problems in ${district.name}`,
    emergencyHeading: `24/7 Emergencies in ${district.name}`,
    emergencyText: `24/7 emergency service available in ${district.name}. Fast response for urgent ${service.name.toLowerCase()} repairs. Call now for immediate assistance.`,
    faqHeading: `Frequently Asked Questions - ${service.name} in ${district.name}`,
    whyChooseUsHeading: `Why Choose Us in ${district.name}`,
    commonQuestionsHeading: `Common Questions - ${service.name} in ${district.name}`,
    professionalServiceHeading: `Professional ${service.name} in ${district.name}, ${city.name}`,
    callUrgentCTA: 'Call Urgent',
    whatsappMessage: `I need ${service.name.toLowerCase()} service in ${district.name}, ${city.name}`
  }
}

/**
 * Generate lightweight Russian content for district pages
 */
function generateLightweightRU(
  service: Service,
  city: City,
  district: District
): LightweightDistrictContent {
  // Map service names to Russian
  const serviceNameRU = {
    'Fontanero': 'Сантехника',
    'Electricista': 'Электрика',
    'Desatascos': 'Прочистка труб',
    'Calefacción': 'Отопление',
    'Aire Acondicionado': 'Кондиционирование'
  }[service.name] || service.name

  return {
    intro: `Профессиональные услуги ${serviceNameRU.toLowerCase()} в ${district.name}, ${city.name}. Быстрый отклик, сертифицированные специалисты, прозрачные цены.`,
    expertiseTitle: 'Наш местный опыт',
    expertiseParagraphs: [
      `Мы предоставляем профессиональные услуги ${serviceNameRU.toLowerCase()} по всему ${district.name}. Наша опытная команда знает район и быстро реагирует на все запросы.`,
      `Доступны 24/7 для аварий. Сертифицированные специалисты с прозрачными ценами и гарантией качества работы.`
    ],
    expertiseHighlights: service.benefits.slice(0, 3),
    frequentProblemsHeading: `Частые проблемы в ${district.name}`,
    emergencyHeading: `Аварии 24/7 в ${district.name}`,
    emergencyText: `Аварийная служба 24/7 доступна в ${district.name}. Быстрый отклик для срочного ремонта ${serviceNameRU.toLowerCase()}. Звоните сейчас для немедленной помощи.`,
    faqHeading: `Часто задаваемые вопросы - ${serviceNameRU} в ${district.name}`,
    whyChooseUsHeading: `Почему выбрать нас в ${district.name}`,
    commonQuestionsHeading: `Общие вопросы - ${serviceNameRU} в ${district.name}`,
    professionalServiceHeading: `Профессиональный ${serviceNameRU} в ${district.name}, ${city.name}`,
    callUrgentCTA: 'Срочный звонок',
    whatsappMessage: `Мне нужна услуга ${serviceNameRU.toLowerCase()} в ${district.name}, ${city.name}`
  }
}

/**
 * Get lightweight district content based on locale
 * Returns null for Spanish (use full semantic generator instead)
 */
export function getLightweightDistrictContent(
  locale: Locale,
  service: Service,
  city: City,
  district: District
): LightweightDistrictContent | null {
  // Spanish uses full semantic generator - not lightweight
  if (locale === 'es') {
    return null
  }

  // English lightweight content
  if (locale === 'en') {
    return generateLightweightEN(service, city, district)
  }

  // Russian lightweight content
  if (locale === 'ru') {
    return generateLightweightRU(service, city, district)
  }

  return null
}
