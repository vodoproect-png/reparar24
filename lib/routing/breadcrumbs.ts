import type { Locale } from '@/lib/i18n/config'
import type { Service } from '@/data/services'
import type { City } from '@/data/cities'
import { RouteHelper } from './helpers'
import { getServiceIdFromSlug, type ServiceId, type CityId } from '@/lib/i18n/slugs'
import { getDictionary } from '@/lib/i18n/dictionaries'

const BASE_URL = 'https://reparar24.es'

/**
 * Scalable breadcrumb generation system
 * Supports locale-aware, SEO-friendly breadcrumbs for all page types
 */

export interface BreadcrumbItem {
  label: string
  href: string
  position: number
}

export interface BreadcrumbSchema {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

/**
 * Breadcrumb generator
 */
export const BreadcrumbGenerator = {
  /**
   * Generate homepage breadcrumb with absolute URL
   */
  home(locale: Locale): BreadcrumbItem {
    const dict = getDictionary(locale)
    return {
      label: dict.common.call || 'Inicio',
      href: RouteHelper.absoluteHome(locale),
      position: 1,
    }
  },

  /**
   * Generate breadcrumbs for service page with absolute URLs
   * Example: Home > Fontanería
   */
  service(service: Service, locale: Locale): BreadcrumbItem[] {
    return [
      this.home(locale),
      {
        label: service.name,
        href: RouteHelper.absolute(RouteHelper.service(service.slug as ServiceId, locale)),
        position: 2,
      },
    ]
  },

  /**
   * Generate breadcrumbs for service+city page with absolute URLs
   * Example: Home > Fontanería > Madrid
   */
  serviceCity(service: Service, city: City, locale: Locale): BreadcrumbItem[] {
    return [
      this.home(locale),
      {
        label: service.name,
        href: RouteHelper.absolute(RouteHelper.service(service.slug as ServiceId, locale)),
        position: 2,
      },
      {
        label: city.name,
        href: RouteHelper.absolute(RouteHelper.serviceCity(service.slug as ServiceId, city.slug as CityId, locale)),
        position: 3,
      },
    ]
  },

  /**
   * Generate breadcrumbs for service+city+district page with absolute URLs
   * Example: Home > Fontanería > Madrid > Salamanca
   */
  serviceCityDistrict(
    service: Service,
    city: City,
    districtName: string,
    districtSlug: string,
    locale: Locale
  ): BreadcrumbItem[] {
    return [
      this.home(locale),
      {
        label: service.name,
        href: RouteHelper.absolute(RouteHelper.service(service.slug as ServiceId, locale)),
        position: 2,
      },
      {
        label: city.name,
        href: RouteHelper.absolute(RouteHelper.serviceCity(service.slug as ServiceId, city.slug as CityId, locale)),
        position: 3,
      },
      {
        label: districtName,
        href: RouteHelper.absolute(RouteHelper.serviceCityDistrict(
          service.slug as ServiceId,
          city.slug as CityId,
          districtSlug,
          locale
        )),
        position: 4,
      },
    ]
  },

  /**
   * Generate breadcrumbs for city overview page with absolute URLs
   * Example: Home > Servicios > Madrid
   */
  city(city: City, locale: Locale): BreadcrumbItem[] {
    const dict = getDictionary(locale)
    return [
      this.home(locale),
      {
        label: dict.common.services || 'Servicios',
        href: RouteHelper.absoluteHome(locale),
        position: 2,
      },
      {
        label: city.name,
        href: RouteHelper.absolute(RouteHelper.city(city.slug as CityId, locale)),
        position: 3,
      },
    ]
  },
}

/**
 * JSON-LD Breadcrumb Schema generator
 */
export const BreadcrumbSchemaGenerator = {
  /**
   * Generate BreadcrumbList schema for SEO
   * Breadcrumbs now contain absolute URLs, no concatenation needed
   */
  generate(breadcrumbs: BreadcrumbItem[]): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        return {
          '@type': 'ListItem',
          position: crumb.position,
          name: crumb.label,
          // Google recommends omitting 'item' for the last breadcrumb (current page)
          ...((!isLast) && { item: crumb.href }),
        }
      }),
    }
  },

  /**
   * Generate schema for service page
   */
  service(service: Service, locale: Locale): BreadcrumbSchema {
    const breadcrumbs = BreadcrumbGenerator.service(service, locale)
    return this.generate(breadcrumbs)
  },

  /**
   * Generate schema for service+city page
   */
  serviceCity(service: Service, city: City, locale: Locale): BreadcrumbSchema {
    const breadcrumbs = BreadcrumbGenerator.serviceCity(service, city, locale)
    return this.generate(breadcrumbs)
  },

  /**
   * Generate schema for service+city+district page
   */
  serviceCityDistrict(
    service: Service,
    city: City,
    districtName: string,
    districtSlug: string,
    locale: Locale
  ): BreadcrumbSchema {
    const breadcrumbs = BreadcrumbGenerator.serviceCityDistrict(
      service,
      city,
      districtName,
      districtSlug,
      locale
    )
    return this.generate(breadcrumbs)
  },
}
