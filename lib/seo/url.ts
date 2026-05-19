import type { Locale } from '@/lib/i18n/config'
import { defaultLocale } from '@/lib/i18n/config'

/**
 * SEO URL utilities for canonical, alternate, and route generation
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://reparar24.es'

/**
 * Generate canonical URL for a given path and locale
 */
export function getCanonicalUrl(path: string, locale: Locale = defaultLocale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  if (locale === defaultLocale) {
    return `${BASE_URL}/${cleanPath}`
  }
  
  return `${BASE_URL}/${locale}/${cleanPath}`
}

/**
 * Generate alternate language URLs for hreflang
 */
export function getAlternateUrls(path: string, locales: Locale[]): Record<Locale, string> {
  const alternates: Partial<Record<Locale, string>> = {}
  
  locales.forEach((locale) => {
    alternates[locale] = getCanonicalUrl(path, locale)
  })
  
  return alternates as Record<Locale, string>
}

/**
 * Generate service page URL
 */
export function getServiceUrl(serviceSlug: string, locale: Locale = defaultLocale): string {
  const path = `${serviceSlug}`
  return getCanonicalUrl(path, locale)
}

/**
 * Generate service + city page URL (primary SEO route)
 */
export function getServiceCityUrl(
  serviceSlug: string,
  citySlug: string,
  locale: Locale = defaultLocale
): string {
  const path = `${serviceSlug}/${citySlug}`
  return getCanonicalUrl(path, locale)
}

/**
 * Generate service + city + district page URL (future scalability)
 */
export function getServiceCityDistrictUrl(
  serviceSlug: string,
  citySlug: string,
  districtSlug: string,
  locale: Locale = defaultLocale
): string {
  const path = `${serviceSlug}/${citySlug}/${districtSlug}`
  return getCanonicalUrl(path, locale)
}

/**
 * Generate city overview URL
 */
export function getCityUrl(citySlug: string, locale: Locale = defaultLocale): string {
  const path = `servicios/${citySlug}`
  return getCanonicalUrl(path, locale)
}

/**
 * Normalize slug (remove accents, lowercase, replace spaces)
 */
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Get locale prefix for routes
 */
export function getLocalePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}
