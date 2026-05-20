import { Service } from '@/data/services'
import { City } from '@/data/cities'
import { getPhoneNumber, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'

interface LocalBusinessSchemaProps {
  name: string
  description: string
  url?: string
  image?: string
  priceRange?: string
  city?: City
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const address = getBusinessAddress()
  const telephone = getPhoneNumber()
  const email = getEmail()
  
  // Use city coordinates if provided, otherwise use business address coordinates (Valencia/Torrent area)
  const geo = props.city ? {
    '@type': 'GeoCoordinates' as const,
    latitude: props.city.coordinates.lat,
    longitude: props.city.coordinates.lng
  } : {
    '@type': 'GeoCoordinates' as const,
    latitude: 39.4699, // Valencia coordinates (fallback for homepage/organization)
    longitude: -0.3763
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${props.url || 'https://reparar24.es'}#business`,
    name: props.name,
    description: props.description,
    url: props.url || 'https://reparar24.es',
    telephone: telephone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: geo,
    image: props.image || 'https://reparar24.es/logo.png',
    logo: 'https://reparar24.es/logo.png',
    priceRange: props.priceRange || '€€-€€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Valencia'
      },
      {
        '@type': 'City',
        name: 'Madrid'
      },
      {
        '@type': 'City',
        name: 'Barcelona'
      }
    ],
    serviceType: [
      'Fontanería',
      'Electricidad',
      'Desatascos',
      'Calefacción',
      'Aire Acondicionado'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

interface ServiceSchemaProps {
  service: Service
  city?: City
  provider?: string
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  const { service, city, provider = 'Reparar24' } = props
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city ? `${service.name} en ${city.name}` : service.name,
    description: service.longDescription,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    areaServed: city ? {
      '@type': 'City',
      name: city.name
    } : {
      '@type': 'Country',
      name: 'España'
    },
    available: service.available24h ? '24/7' : 'Business hours',
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      price: service.priceRange,
      priceCurrency: 'EUR'
    }
  }
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function generateFAQSchema(props: FAQSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.questions.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateOrganizationSchema() {
  const address = getBusinessAddress()
  const company = getCompanyInfo()
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://reparar24.es#organization',
    name: company.tradeName,
    legalName: company.legalName,
    alternateName: 'Reparar 24',
    taxID: company.cif,
    url: 'https://reparar24.es',
    logo: {
      '@type': 'ImageObject',
      url: 'https://reparar24.es/logo.png',
      width: '250',
      height: '60'
    },
    description: 'Servicios de fontanería, electricidad y reparaciones 24 horas en España',
    email: getEmail(),
    telephone: getPhoneNumber(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: getPhoneNumber(),
      contactType: 'customer service',
      areaServed: 'ES',
      availableLanguage: ['Spanish', 'English', 'Russian'],
      contactOption: 'TollFree',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    },
    sameAs: [
      'https://facebook.com/reparar24',
      'https://twitter.com/reparar24',
      'https://instagram.com/reparar24'
    ]
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://reparar24.es#website',
    url: 'https://reparar24.es',
    name: 'Reparar24',
    description: 'Servicios de fontanería, electricidad y reparaciones 24 horas',
    publisher: {
      '@id': 'https://reparar24.es#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://reparar24.es/buscar?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['es', 'en', 'ru']
  }
}

interface WebPageSchemaProps {
  url: string
  name: string
  description: string
  breadcrumbs?: BreadcrumbItem[]
}

export function generateWebPageSchema(props: WebPageSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${props.url}#webpage`,
    url: props.url,
    name: props.name,
    description: props.description,
    isPartOf: {
      '@id': 'https://reparar24.es#website'
    },
    about: {
      '@id': 'https://reparar24.es#organization'
    },
    breadcrumb: props.breadcrumbs ? {
      '@id': `${props.url}#breadcrumb`
    } : undefined,
    inLanguage: 'es',
    potentialAction: {
      '@type': 'ReadAction',
      target: [props.url]
    }
  }
}

interface EnhancedServiceSchemaProps {
  service: Service
  city?: City
  url: string
}

export function generateEnhancedServiceSchema(props: EnhancedServiceSchemaProps) {
  const { service, city, url } = props
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: city ? `${service.name} en ${city.name}` : service.name,
    description: service.longDescription,
    serviceType: service.name,
    provider: {
      '@id': 'https://reparar24.es#organization'
    },
    areaServed: city ? {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'Country',
        name: 'España'
      }
    } : {
      '@type': 'Country',
      name: 'España'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: getPhoneNumber(),
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English', 'Russian']
      }
    },
    hoursAvailable: service.available24h ? {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: service.priceRange,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.priceRange,
        priceCurrency: 'EUR'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '89',
      bestRating: '5',
      worstRating: '1'
    }
  }
}
