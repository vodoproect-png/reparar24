import type { Locale } from '@/lib/i18n/config'
import { defaultLocale } from '@/lib/i18n/config'
import type { ServiceId, CityId } from '@/lib/i18n/slugs'
import {
  getLocalizedServiceSlug,
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
   */
  home(locale: Locale = defaultLocale): string {
    return `/${locale}`
  },

  /**
   * Generate absolute homepage URL
   */
  absoluteHome(locale: Locale = defaultLocale): string {
    return `${BASE_URL}/${locale}`
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
   */
  city(cityId: CityId, locale: Locale = defaultLocale): string {
    const citySlug = getLocalizedCitySlug(cityId, locale)
    return `/${locale}/servicios/${citySlug}`
  },

  /**
   * Generate absolute URL
   */
  absolute(path: string, locale: Locale = defaultLocale): string {
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
   * Generate all hreflang URLs for a service page
   */
  service(serviceId: ServiceId): Record<Locale, string> {
    return {
      es: RouteHelper.absolute(RouteHelper.service(serviceId, 'es')),
      en: RouteHelper.absolute(RouteHelper.service(serviceId, 'en')),
      ru: RouteHelper.absolute(RouteHelper.service(serviceId, 'ru')),
    }
  },

  /**
   * Generate all hreflang URLs for service+city page
   */
  serviceCity(serviceId: ServiceId, cityId: CityId): Record<Locale, string> {
    return {
      es: RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, 'es')),
      en: RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, 'en')),
      ru: RouteHelper.absolute(RouteHelper.serviceCity(serviceId, cityId, 'ru')),
    }
  },

  /**
   * Generate all hreflang URLs for service+city+district page
   */
  serviceCityDistrict(
    serviceId: ServiceId,
    cityId: CityId,
    districtSlug: string
  ): Record<Locale, string> {
    return {
      es: RouteHelper.absolute(
        RouteHelper.serviceCityDistrict(serviceId, cityId, districtSlug, 'es')
      ),
      en: RouteHelper.absolute(
        RouteHelper.serviceCityDistrict(serviceId, cityId, districtSlug, 'en')
      ),
      ru: RouteHelper.absolute(
        RouteHelper.serviceCityDistrict(serviceId, cityId, districtSlug, 'ru')
      ),
    }
  },
}

/**
 * Sitemap URL generator
 */
export const SitemapHelper = {
  /**
   * Generate all service URLs across all locales
   */
  allServices(serviceIds: ServiceId[]): Array<{ url: string; locale: Locale; priority: number }> {
    const urls: Array<{ url: string; locale: Locale; priority: number }> = []
    const locales: Locale[] = ['es', 'en', 'ru']

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
   * Generate all service+city URLs across all locales
   */
  allServiceCities(
    serviceIds: ServiceId[],
    cityIds: CityId[]
  ): Array<{ url: string; locale: Locale; priority: number }> {
    const urls: Array<{ url: string; locale: Locale; priority: number }> = []
    const locales: Locale[] = ['es', 'en', 'ru']

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
