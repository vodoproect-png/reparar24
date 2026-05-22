/**
 * Lightweight City Content for EN/RU Locales
 * 
 * IMPORTANT: This is a LIGHTWEIGHT implementation for non-Spanish locales.
 * Spanish (es) continues to use the full enterprise SEO system from city-seo-content.ts
 * 
 * EN/RU pages receive basic translated content to eliminate Spanish contamination
 * while maintaining SEO freeze (pages blocked from indexing).
 * 
 * Pattern: Same as district-content.ts
 */

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

/**
 * Generate lightweight English content for city pages
 */
function generateLightweightEN(
  service: Service,
  city: City
): LightweightCityContent {
  return {
    h1: `${service.name} in ${city.name}`,
    intro: `Professional ${service.name.toLowerCase()} services in ${city.name}. Fast response, certified professionals, transparent pricing.`,
    coverageHeading: `Coverage in ${city.name}`,
    ourServiceHeading: `Our ${service.name} Service in ${city.name}`,
    otherServicesHeading: `Other Services in ${city.name}`,
    faqHeading: `Frequently Asked Questions - ${service.name} in ${city.name}`,
    callNowCTA: 'Call Now',
    service24hBadge: `24h Service in ${city.name}`,
    schemaNameSuffix: `in ${city.name}`,
    schemaDescPrefix: `in ${city.name}`
  }
}

/**
 * Generate lightweight Russian content for city pages
 */
function generateLightweightRU(
  service: Service,
  city: City
): LightweightCityContent {
  // Map service names to Russian
  const serviceNameRU = {
    'Fontanero': 'Сантехника',
    'Electricista': 'Электрика',
    'Desatascos': 'Прочистка труб',
    'Calefacción': 'Отопление',
    'Aire Acondicionado': 'Кондиционирование',
    'Limpieza de Tuberías': 'Очистка труб'
  }[service.name] || service.name

  return {
    h1: `${serviceNameRU} в ${city.name}`,
    intro: `Профессиональные услуги ${serviceNameRU.toLowerCase()} в ${city.name}. Быстрый отклик, сертифицированные специалисты, прозрачные цены.`,
    coverageHeading: `Покрытие в ${city.name}`,
    ourServiceHeading: `Наша услуга ${serviceNameRU} в ${city.name}`,
    otherServicesHeading: `Другие услуги в ${city.name}`,
    faqHeading: `Часто задаваемые вопросы - ${serviceNameRU} в ${city.name}`,
    callNowCTA: 'Позвонить сейчас',
    service24hBadge: `Служба 24ч в ${city.name}`,
    schemaNameSuffix: `в ${city.name}`,
    schemaDescPrefix: `в ${city.name}`
  }
}

/**
 * Get lightweight city content based on locale
 * Returns null for Spanish (use full enterprise SEO system instead)
 */
export function getLightweightCityContent(
  locale: Locale,
  service: Service,
  city: City
): LightweightCityContent | null {
  // Spanish uses full enterprise city-seo-content.ts - not lightweight
  if (locale === 'es') {
    return null
  }

  // English lightweight content
  if (locale === 'en') {
    return generateLightweightEN(service, city)
  }

  // Russian lightweight content
  if (locale === 'ru') {
    return generateLightweightRU(service, city)
  }

  return null
}
