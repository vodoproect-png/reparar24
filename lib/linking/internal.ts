import type { Service } from '@/data/services'
import type { City } from '@/data/cities'
import type { Locale } from '@/lib/i18n/config'
import { getServiceCityUrl, getServiceUrl } from '@/lib/seo/url'

const BASE_URL = 'https://reparar24.es'

/**
 * Internal linking utilities for scalable SEO
 */

export interface InternalLink {
  href: string
  title: string
  description?: string
}

/**
 * Generate related service links for a given service
 */
export function getRelatedServiceLinks(
  currentService: Service,
  allServices: Service[],
  locale: Locale,
  limit: number = 3
): InternalLink[] {
  return allServices
    .filter((s) => s.id !== currentService.id)
    .slice(0, limit)
    .map((service) => ({
      href: getServiceUrl(service.slug, locale),
      title: service.name,
      description: service.description,
    }))
}

/**
 * Generate city links for a service across all cities
 */
export function getServiceCityLinks(
  service: Service,
  cities: City[],
  locale: Locale,
  limit?: number
): InternalLink[] {
  const cityLinks = cities.map((city) => ({
    href: getServiceCityUrl(service.slug, city.slug, locale),
    title: `${service.name} en ${city.name}`,
    description: `${service.description} en ${city.name}`,
  }))

  return limit ? cityLinks.slice(0, limit) : cityLinks
}

/**
 * Generate service links for a city across all services
 */
export function getCityServiceLinks(
  city: City,
  services: Service[],
  locale: Locale,
  limit?: number
): InternalLink[] {
  const serviceLinks = services.map((service) => ({
    href: getServiceCityUrl(service.slug, city.slug, locale),
    title: `${service.name} en ${city.name}`,
    description: service.description,
  }))

  return limit ? serviceLinks.slice(0, limit) : serviceLinks
}

/**
 * Generate district links for a city (future scalability)
 */
export function getDistrictLinks(
  city: City,
  service: Service,
  locale: Locale
): InternalLink[] {
  return city.districts.map((district) => ({
    href: `${getServiceCityUrl(service.slug, city.slug, locale)}/${district.slug}`,
    title: `${service.name} en ${district.name}`,
    description: `Servicio en ${district.name}, ${city.name}`,
  }))
}

/**
 * Generate emergency service links (24h services)
 */
export function getEmergencyServiceLinks(
  services: Service[],
  locale: Locale
): InternalLink[] {
  return services
    .filter((s) => s.available24h)
    .map((service) => ({
      href: getServiceUrl(service.slug, locale),
      title: `${service.name} Urgente 24h`,
      description: service.description,
    }))
}

/**
 * Generate breadcrumb data for SEO
 */
export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateServiceBreadcrumbs(
  service: Service,
  locale: Locale
): BreadcrumbItem[] {
  return [
    { name: 'Inicio', url: BASE_URL },
    { name: service.name, url: getServiceUrl(service.slug, locale) },
  ]
}

export function generateServiceCityBreadcrumbs(
  service: Service,
  city: City,
  locale: Locale
): BreadcrumbItem[] {
  return [
    { name: 'Inicio', url: BASE_URL },
    { name: service.name, url: getServiceUrl(service.slug, locale) },
    {
      name: city.name,
      url: getServiceCityUrl(service.slug, city.slug, locale),
    },
  ]
}

export function generateServiceCityDistrictBreadcrumbs(
  service: Service,
  city: City,
  districtName: string,
  districtSlug: string,
  locale: Locale
): BreadcrumbItem[] {
  return [
    { name: 'Inicio', url: BASE_URL },
    { name: service.name, url: getServiceUrl(service.slug, locale) },
    {
      name: city.name,
      url: getServiceCityUrl(service.slug, city.slug, locale),
    },
    {
      name: districtName,
      url: `${getServiceCityUrl(service.slug, city.slug, locale)}/${districtSlug}`,
    },
  ]
}
