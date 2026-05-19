import { Metadata } from 'next'
import { Service } from '@/data/services'
import { City } from '@/data/cities'

interface GenerateMetadataProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
}

export function generateMetadata(props: GenerateMetadataProps): Metadata {
  const baseUrl = 'https://reparar24.es'
  const canonicalUrl = props.canonical || baseUrl

  return {
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: props.title,
      description: props.description,
      url: canonicalUrl,
      siteName: 'Reparar24',
      type: 'website',
      locale: 'es_ES',
      images: props.image ? [
        {
          url: props.image,
          width: 1200,
          height: 630,
          alt: props.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: props.image ? [props.image] : undefined,
    },
  }
}

export function generateServiceMetadata(service: Service, city?: City): Metadata {
  const title = city 
    ? `${service.name} en ${city.name} - Servicio ${service.available24h ? '24h' : 'Profesional'} | Reparar24`
    : `${service.name} - Servicio Profesional en España | Reparar24`

  const description = city
    ? `${service.description} en ${city.name}. ${service.longDescription} ${service.priceRange}. Llama ahora!`
    : `${service.description}. ${service.longDescription} Disponible en toda España. ${service.priceRange}.`

  const keywords = city
    ? [...service.keywords, city.name, `${service.slug} ${city.slug}`]
    : service.keywords

  const canonical = city
    ? `https://reparar24.es/${service.slug}/${city.slug}`
    : `https://reparar24.es/${service.slug}`

  return generateMetadata({
    title,
    description,
    keywords,
    canonical,
  })
}

export function generateCityMetadata(city: City): Metadata {
  const title = `Servicios de Fontanería, Electricidad y Reparaciones en ${city.name} | Reparar24`
  const description = `Servicios profesionales 24 horas en ${city.name} y todos sus distritos. Fontaneros, electricistas, desatascos y más. Atención inmediata ${city.population.toLocaleString('es-ES')} habitantes confían en nosotros.`
  const keywords = [
    'servicios',
    city.name,
    city.province,
    'fontanero',
    'electricista',
    '24 horas',
    ...city.districts.map(d => d.name)
  ]

  return generateMetadata({
    title,
    description,
    keywords,
    canonical: `https://reparar24.es/ciudad/${city.slug}`,
  })
}

export function generateDistrictMetadata(city: City, districtSlug: string): Metadata {
  const district = city.districts.find(d => d.slug === districtSlug)
  
  if (!district) {
    return generateCityMetadata(city)
  }

  const title = `Servicios en ${district.name}, ${city.name} - 24 Horas | Reparar24`
  const description = `Servicios de emergencia en ${district.name}, ${city.name}. Fontaneros, electricistas y desatascos disponibles 24/7. Códigos postales: ${district.postalCodes.join(', ')}.`
  const keywords = [
    district.name,
    city.name,
    'servicios',
    'emergencias',
    'fontanero',
    'electricista',
    ...district.postalCodes
  ]

  return generateMetadata({
    title,
    description,
    keywords,
    canonical: `https://reparar24.es/ciudad/${city.slug}/${district.slug}`,
  })
}
