import type { Locale } from '@/lib/i18n/config'
import { defaultLocale, locales } from '@/lib/i18n/config'
import type { ServiceId, CityId } from '@/lib/i18n/slugs'
import {
  getLocalizedCitySlug,
  getLocalizedServiceUrl,
  getLocalizedServiceCityUrl,
  getLocalizedServiceCityDistrictUrl,
} from '@/lib/i18n/slugs'

/**
 * Centralized routing helpers for locale-aware URL generation
 * Supports services, cities, districts, breadcrumbs, canonical URLs
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://reparar24.es'

/**
 * Route generation helpers
 */
export const RouteHelper = {
  /**
   * Generate homepage URL for locale
   * Spanish (default locale) uses root-level URLs without prefix
   */
  home(locale: Locale = defaultLocale): string {
    return locale === defaultLocale ? '/' : `/${locale}`
  },

  /**
   * Generate absolute homepage URL
   */
  absoluteHome(locale: Locale = defaultLocale): string {
    const path = locale === defaultLocale ? '' : `/${locale}`
    return `${BASE_URL}${path}`
  },

  /**
   * Generate service page URL
   */
  service(serviceId: ServiceId, locale: Locale = defaultLocale): string {
    return getLocalizedServiceUrl(serviceId, locale)
  },

  /**
   * Generate service+city URL
   */
  serviceCity(
    serviceId: ServiceId,
    cityId: CityId,
    locale: Locale = defaultLocale
  ): string {
    const citySlug = getLocalizedCitySlug(cityId, locale)
    return getLocalizedServiceCityUrl(serviceId, citySlug, locale)
  },

  /**
   * Generate service+city+district URL
   */
  serviceCityDistrict(
    serviceId: ServiceId,
    cityId: CityId,
    districtSlug: string,
    locale: Locale = defaultLocale
  ): string {
    const citySlug = getLocalizedCitySlug(cityId, locale)
    return getLocalizedServiceCityDistrictUrl(serviceId, citySlug, districtSlug, locale)
  },

  /**
   * Generate city overview URL
   * Spanish (default locale) uses root-level URLs without prefix
   */
  city(cityId: CityId, locale: Locale = defaultLocale): string {
    const citySlug = getLocalizedCitySlug(cityId, locale)
    const prefix = locale === defaultLocale ? '' : `/${locale}`
    return `${prefix}/servicios/${citySlug}`
  },

  /**
   * Generate absolute URL
   */
  absolute(path: string, locale: Locale = defaultLocale): string {
    void locale

    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${BASE_URL}${cleanPath}`
  },
}

/**
 * Canonical URL helpers
 */
export const CanonicalHelper = {
  /**
   * Generate canonical URL (always points to Spanish version as primary)
   */
  service(serviceId: ServiceId): string {
    return RouteHelper.absolute(RouteHelper.service(serviceId, 'es'))
  },

  serviceCity(serviceId: ServiceId, cityId: CityId): string {
    return RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, 'es'))
  },

  serviceCityDistrict(
    serviceId: ServiceId,
    cityId: CityId,
    districtSlug: string
  ): string {
    return RouteHelper.absolute(
      RouteHelper.serviceCityDistrict(serviceId, cityId, districtSlug, 'es')
    )
  },

  city(cityId: CityId): string {
    return RouteHelper.absolute(RouteHelper.city(cityId, 'es'))
  },
}

/**
 * Hreflang URL helpers
 */
export const HreflangHelper = {
  /**
   * Generate indexable hreflang URLs for a service page.
   * Reparar24 is Spanish-only; EN/RU are legacy redirect inputs only.
   */
  service(serviceId: ServiceId): Partial<Record<Locale, string>> {
    return {
      es: RouteHelper.absolute(RouteHelper.service(serviceId, 'es')),
    }
  },

  /**
   * Generate indexable hreflang URLs for service+city page.
   */
  serviceCity(serviceId: ServiceId, cityId: CityId): Partial<Record<Locale, string>> {
    return {
      es: RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, 'es')),
    }
  },

  /**
   * Generate all hreflang URLs for service+city+district page
   */
  serviceCityDistrict(
    serviceId: ServiceId,
    cityId: CityId,
    districtSlug: string
  ): Partial<Record<Locale, string>> {
    return {
      es: RouteHelper.absolute(
        RouteHelper.serviceCityDistrict(serviceId, cityId, districtSlug, 'es')
      ),
    }
  },
}

/**
 * Sitemap URL generator
 */
export const SitemapHelper = {
  /**
   * Generate all indexable service URLs.
   */
  allServices(serviceIds: ServiceId[]): Array<{ url: string; locale: Locale; priority: number }> {
    const urls: Array<{ url: string; locale: Locale; priority: number }> = []

    serviceIds.forEach((serviceId) => {
      locales.forEach((locale) => {
        urls.push({
          url: RouteHelper.absolute(RouteHelper.service(serviceId, locale)),
          locale,
          priority: 0.9,
        })
      })
    })

    return urls
  },

  /**
   * Generate all indexable service+city URLs.
   */
  allServiceCities(
    serviceIds: ServiceId[],
    cityIds: CityId[]
  ): Array<{ url: string; locale: Locale; priority: number }> {
    const urls: Array<{ url: string; locale: Locale; priority: number }> = []

    serviceIds.forEach((serviceId) => {
      cityIds.forEach((cityId) => {
        locales.forEach((locale) => {
          urls.push({
            url: RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, locale)),
            locale,
            priority: 0.8,
          })
        })
      })
    })

    return urls
  },
}
