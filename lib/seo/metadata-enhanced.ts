import { Metadata } from 'next'
import { Service } from '@/data/services'
import { City } from '@/data/cities'
import type { Locale } from '@/lib/i18n/config'
import { getCanonicalUrl } from './url'
import { generateOpenGraph, generateTwitterCard } from './opengraph'
import { getHreflangMetadata } from './hreflang'
import { getServiceOGImage, getDefaultOGImage } from './og-image-mapper'
import { fitMetaDescription, fitSeoTitle } from './meta-length'

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
  imageAlt?: string
  siteName?: string
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
    imageAlt,
    siteName,
    noindex = false,
  } = params

  const canonicalUrl = getCanonicalUrl(path, locale)
  const hreflangData = getHreflangMetadata(path)
  const fittedTitle = fitSeoTitle(title)
  const fittedDescription = fitMetaDescription(description)

  return {
    title: fittedTitle,
    description: fittedDescription,
    keywords,
    ...hreflangData,
    robots: noindex ? 'noindex, follow' : 'index, follow',
    openGraph: generateOpenGraph({
      title: fittedTitle,
      description: fittedDescription,
      url: canonicalUrl,
      locale,
      image,
      imageAlt,
      siteName,
    }),
    twitter: generateTwitterCard({
      title: fittedTitle,
      description: fittedDescription,
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
  const titleSuffix = 'Reparar24'
  
  // SEO-optimized titles per service
  const title = city
    ? `${service.name} en ${city.name} - ${service.available24h ? 'Servicio 24h' : 'Servicio Profesional'} | ${titleSuffix}`
    : service.slug === 'fontanero'
      ? 'Fontanero 24h Valencia | Fontanería de Cualquier Complejidad'
      : service.slug === 'electricista'
        ? 'Electricista 24 Horas Valencia | Urgencias Eléctricas'
      : `${service.name} - Servicio Profesional en España | ${titleSuffix}`

  // OPTIMIZED: 120-155 char meta descriptions (removed longDescription - too long!)
  const description = city
    ? `${service.name} ${service.available24h ? '24h' : 'profesional'} en ${city.name}. ${service.priceRange}. Garantía y presupuesto gratuito. ¡Llama ahora!`
    : service.slug === 'fontanero'
      ? 'Fontanero 24 horas en Valencia. Fugas, desatascos, termos e instalaciones con llegada en 30-60 minutos y presupuesto previo.'
      : service.slug === 'electricista'
        ? 'Electricista urgente 24h en Valencia. Averías eléctricas, cuadros, instalaciones, iluminación LED y enchufes. Desde 59€. Garantía profesional.'
      : `${service.name} profesional en toda España. ${service.priceRange}. Servicio ${service.available24h ? '24h' : 'certificado'} con garantía. Presupuesto gratis.`

  const path = city
    ? `${service.slug}/${city.slug}`
    : service.slug

  // Custom alt text for fontanero service
  const imageAlt = service.slug === 'fontanero' 
    ? 'Fontanería profesional 24 horas | Reparar24'
    : undefined
  const siteName = !city && service.slug === 'fontanero'
    ? 'Fontanero Valencia Reparar24'
    : undefined

  return generateEnhancedMetadata({
    title,
    description,
    keywords: city
      ? [...service.keywords, city.name, `${service.slug} ${city.slug}`]
      : service.slug === 'fontanero'
        ? [
            'fontanero valencia',
            'fontanero 24 horas valencia',
            'fontanero urgente valencia',
            'fontaneros valencia',
            'fontaneros urgentes valencia',
            'fontanero barato valencia',
            'reparacion fugas valencia',
            'desatascos valencia',
            ...service.keywords,
          ]
      : service.slug === 'electricista'
        ? [
            'electricista',
            'electricista valencia',
            'electricista urgente',
            'electricista 24 horas',
            'averías eléctricas',
            'cuadros eléctricos',
            'instalaciones eléctricas',
            'iluminación led',
            'enchufes e interruptores',
          ]
        : service.keywords,
    path,
    locale,
    image: getServiceOGImage(service.slug),
    imageAlt,
    siteName,
  })
}

/**
 * Generate enhanced city metadata with i18n
 */
export function generateEnhancedCityMetadata(city: City, locale: Locale): Metadata {
  return generateEnhancedMetadata({
    title: `Servicios de Fontanería, Electricidad y Reparaciones en ${city.name} | Reparar24`,
    description: `Servicios profesionales 24 horas en ${city.name} y todos sus distritos. Fontaneros, electricistas, desatascos y más. ${city.population.toLocaleString('es-ES')} habitantes confían en nosotros.`,
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
    image: getDefaultOGImage(),
  })
}
