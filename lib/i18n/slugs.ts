import type { Locale } from './config'
import { defaultLocale } from './config'

/**
 * Centralized multilingual slug management system
 * Supports locale-aware URL generation for services, cities, and districts
 */

// Service slug mappings
export const serviceSlugMap = {
  fontanero: {
    es: 'fontanero',
    en: 'plumber',
    ru: 'santekhnik',
  },
  electricista: {
    es: 'electricista',
    en: 'electrician',
    ru: 'elektrik',
  },
  desatascos: {
    es: 'desatascos',
    en: 'drain-cleaning',
    ru: 'prochistka-trub',
  },
  'aire-acondicionado': {
    es: 'aire-acondicionado',
    en: 'air-conditioning',
    ru: 'konditsionirovanie',
  },
  cerrajero: {
    es: 'cerrajero',
    en: 'locksmith',
    ru: 'zamochnik',
  },
  pintor: {
    es: 'pintor',
    en: 'painter',
    ru: 'malyar',
  },
  calefaccion: {
    es: 'calefaccion',
    en: 'heating',
    ru: 'otoplenie',
  },
  'limpieza-tuberias': {
    es: 'limpieza-tuberias',
    en: 'pipe-cleaning',
    ru: 'ochistka-trub',
  },
} as const

// Service ID type (base Spanish slug)
export type ServiceId = keyof typeof serviceSlugMap

/**
 * Get localized slug for a service
 */
export function getLocalizedServiceSlug(serviceId: ServiceId, locale: Locale): string {
  return serviceSlugMap[serviceId][locale] || serviceSlugMap[serviceId][defaultLocale]
}

/**
 * Get service ID from localized slug
 */
export function getServiceIdFromSlug(slug: string, locale: Locale): ServiceId | null {
  for (const [serviceId, localeMap] of Object.entries(serviceSlugMap)) {
    if (localeMap[locale] === slug) {
      return serviceId as ServiceId
    }
  }
  return null
}

/**
 * Get all possible slugs for a service across all locales
 */
export function getAllServiceSlugs(serviceId: ServiceId): string[] {
  const slugs = serviceSlugMap[serviceId]
  return Object.values(slugs)
}

/**
 * Generate service URL with localized slug
 */
export function getLocalizedServiceUrl(serviceId: ServiceId, locale: Locale): string {
  const slug = getLocalizedServiceSlug(serviceId, locale)
  return `/${locale}/${slug}`
}

/**
 * Generate service+city URL with localized slug
 */
export function getLocalizedServiceCityUrl(
  serviceId: ServiceId,
  citySlug: string,
  locale: Locale
): string {
  const serviceSlug = getLocalizedServiceSlug(serviceId, locale)
  return `/${locale}/${serviceSlug}/${citySlug}`
}

/**
 * Generate service+city+district URL with localized slug
 */
export function getLocalizedServiceCityDistrictUrl(
  serviceId: ServiceId,
  citySlug: string,
  districtSlug: string,
  locale: Locale
): string {
  const serviceSlug = getLocalizedServiceSlug(serviceId, locale)
  return `/${locale}/${serviceSlug}/${citySlug}/${districtSlug}`
}

/**
 * City slug mappings (if needed for localization)
 * Currently cities use same slugs across locales for SEO consistency
 */
export const citySlugMap = {
  madrid: {
    es: 'madrid',
    en: 'madrid',
    ru: 'madrid',
  },
  barcelona: {
    es: 'barcelona',
    en: 'barcelona',
    ru: 'barcelona',
  },
  valencia: {
    es: 'valencia',
    en: 'valencia',
    ru: 'valencia',
  },
} as const

export type CityId = keyof typeof citySlugMap

/**
 * Get localized city slug (currently same across locales)
 */
export function getLocalizedCitySlug(cityId: CityId, locale: Locale): string {
  return citySlugMap[cityId][locale] || citySlugMap[cityId][defaultLocale]
}

/**
 * Slug resolution helpers for dynamic routes
 */
export const SlugResolver = {
  /**
   * Resolve service from any locale's slug
   */
  resolveService(slug: string): { serviceId: ServiceId; locale: Locale } | null {
    for (const locale of ['es', 'en', 'ru'] as Locale[]) {
      const serviceId = getServiceIdFromSlug(slug, locale)
      if (serviceId) {
        return { serviceId, locale }
      }
    }
    return null
  },

  /**
   * Check if slug is valid for given locale
   */
  isValidServiceSlug(slug: string, locale: Locale): boolean {
    return getServiceIdFromSlug(slug, locale) !== null
  },
}
