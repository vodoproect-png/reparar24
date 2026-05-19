import { Metadata } from 'next'
import { Service } from '@/data/services'
import { City } from '@/data/cities'
import type { Locale } from '@/lib/i18n/config'
import { getCanonicalUrl } from './url'
import { generateOpenGraph, generateTwitterCard } from './opengraph'
import { getHreflangMetadata } from './hreflang'

/**
 * Enhanced metadata generation with i18n support
 */

interface EnhancedMetadataParams {
  title: string
  description: string
  keywords?: string[]
  path: string
  locale: Locale
  image?: string
  noindex?: boolean
}

export function generateEnhancedMetadata(params: EnhancedMetadataParams): Metadata {
  const {
    title,
    description,
    keywords,
    path,
    locale,
    image,
    noindex = false,
  } = params

  const canonicalUrl = getCanonicalUrl(path, locale)
  const hreflangData = getHreflangMetadata(path)

  return {
    title,
    description,
    keywords,
    ...hreflangData,
    robots: noindex ? 'noindex, follow' : 'index, follow',
    openGraph: generateOpenGraph({
      title,
      description,
      url: canonicalUrl,
      locale,
      image,
    }),
    twitter: generateTwitterCard({
      title,
      description,
      image,
    }),
  }
}

/**
 * Generate enhanced service metadata with i18n
 */
export function generateEnhancedServiceMetadata(
  service: Service,
  locale: Locale,
  city?: City
): Metadata {
  const titleSuffix = locale === 'es' ? 'Reparar24' : 'Reparar24'
  
  const titles: Record<Locale, string> = {
    es: city
      ? `${service.name} en ${city.name} - ${service.available24h ? 'Servicio 24h' : 'Servicio Profesional'} | ${titleSuffix}`
      : `${service.name} - Servicio Profesional en España | ${titleSuffix}`,
    en: city
      ? `${service.name} in ${city.name} - ${service.available24h ? '24h Service' : 'Professional Service'} | ${titleSuffix}`
      : `${service.name} - Professional Service in Spain | ${titleSuffix}`,
    ru: city
      ? `${service.name} в ${city.name} - ${service.available24h ? 'Услуга 24ч' : 'Профессиональная услуга'} | ${titleSuffix}`
      : `${service.name} - Профессиональная услуга в Испании | ${titleSuffix}`,
  }

  const descriptions: Record<Locale, string> = {
    es: city
      ? `${service.description} en ${city.name}. ${service.longDescription} ${service.priceRange}. ¡Llama ahora!`
      : `${service.description}. ${service.longDescription} Disponible en toda España. ${service.priceRange}.`,
    en: city
      ? `${service.description} in ${city.name}. ${service.longDescription} ${service.priceRange}. Call now!`
      : `${service.description}. ${service.longDescription} Available throughout Spain. ${service.priceRange}.`,
    ru: city
      ? `${service.description} в ${city.name}. ${service.longDescription} ${service.priceRange}. Звоните сейчас!`
      : `${service.description}. ${service.longDescription} Доступно по всей Испании. ${service.priceRange}.`,
  }

  const path = city
    ? `${service.slug}/${city.slug}`
    : service.slug

  return generateEnhancedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    keywords: city
      ? [...service.keywords, city.name, `${service.slug} ${city.slug}`]
      : service.keywords,
    path,
    locale,
  })
}

/**
 * Generate enhanced city metadata with i18n
 */
export function generateEnhancedCityMetadata(city: City, locale: Locale): Metadata {
  const titles: Record<Locale, string> = {
    es: `Servicios de Fontanería, Electricidad y Reparaciones en ${city.name} | Reparar24`,
    en: `Plumbing, Electrical and Repair Services in ${city.name} | Reparar24`,
    ru: `Сантехнические, электрические и ремонтные услуги в ${city.name} | Reparar24`,
  }

  const descriptions: Record<Locale, string> = {
    es: `Servicios profesionales 24 horas en ${city.name} y todos sus distritos. Fontaneros, electricistas, desatascos y más. ${city.population.toLocaleString('es-ES')} habitantes confían en nosotros.`,
    en: `Professional 24-hour services in ${city.name} and all its districts. Plumbers, electricians, drain cleaning and more. Trusted by ${city.population.toLocaleString('en-GB')} residents.`,
    ru: `Профессиональные услуги 24 часа в ${city.name} и всех районах. Сантехники, электрики и многое другое. Нам доверяют ${city.population.toLocaleString('ru-RU')} жителей.`,
  }

  return generateEnhancedMetadata({
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      'servicios',
      city.name,
      city.province,
      'fontanero',
      'electricista',
      '24 horas',
      ...city.districts.map(d => d.name),
    ],
    path: `servicios/${city.slug}`,
    locale,
  })
}
