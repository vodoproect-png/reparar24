import { Service } from '@/data/services'
import { City } from '@/data/cities'
import { getPhoneNumber, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'

const SITE_URL = 'https://reparar24.es'
const BRAND_IMAGE_URL = `${SITE_URL}/reparar24-og.jpg`

interface LocalBusinessSchemaProps {
  name: string
  description: string
  url?: string
  image?: string
  priceRange?: string
  city?: City
}

interface ServiceSchemaProps {
  service: Service
  city?: City
  provider?: string
  url?: string
  areaServed?: Record<string, unknown>
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface WebPageSchemaProps {
  url: string
  name: string
  description: string
  breadcrumbs?: BreadcrumbItem[]
}

interface EnhancedServiceSchemaProps {
  service: Service
  city?: City
  url: string
}

function getServicePageUrl(service: Service, city?: City) {
  return city ? `${SITE_URL}/${service.slug}/${city.slug}` : `${SITE_URL}/${service.slug}`
}

function getOpeningHoursSpecification() {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  }
}

function getContactPoint() {
  return {
    '@type': 'ContactPoint',
    telephone: getPhoneNumber(),
    contactType: 'customer service',
    areaServed: 'ES',
    availableLanguage: ['es'],
    hoursAvailable: getOpeningHoursSpecification(),
  }
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const address = getBusinessAddress()
  const geo = props.city
    ? {
        '@type': 'GeoCoordinates' as const,
        latitude: props.city.coordinates.lat,
        longitude: props.city.coordinates.lng,
      }
    : {
        '@type': 'GeoCoordinates' as const,
        latitude: 39.4699,
        longitude: -0.3763,
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${props.url || SITE_URL}#business`,
    name: props.name,
    description: props.description,
    url: props.url || SITE_URL,
    telephone: getPhoneNumber(),
    email: getEmail(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo,
    image: props.image || BRAND_IMAGE_URL,
    logo: BRAND_IMAGE_URL,
    priceRange: props.priceRange || 'EUR 49-600',
    openingHoursSpecification: [getOpeningHoursSpecification()],
    areaServed: [
      { '@type': 'City', name: 'Valencia' },
      { '@type': 'City', name: 'Madrid' },
      { '@type': 'City', name: 'Barcelona' },
    ],
  }
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  const { service, city, provider = 'Reparar24', areaServed } = props
  const url = props.url || getServicePageUrl(service, city)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: city ? `${service.name} en ${city.name}` : service.name,
    description: service.description,
    url,
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: provider,
      url: SITE_URL,
    },
    areaServed:
      areaServed ??
      (city
        ? {
            '@type': 'City',
            name: city.name,
            containedInPlace: {
              '@type': 'Country',
              name: 'Espana',
            },
          }
        : {
            '@type': 'Country',
            name: 'Espana',
          }),
    serviceType: service.name,
    brand: {
      '@type': 'Brand',
      name: 'Reparar24',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${SITE_URL}#organization`,
      },
      itemOffered: {
        '@id': `${url}#service`,
      },
    },
  }
}

export function generateFAQSchema(props: FAQSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationSchema() {
  const address = getBusinessAddress()
  const company = getCompanyInfo()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: company.tradeName,
    legalName: company.legalName,
    alternateName: 'Reparar 24',
    taxID: company.cif,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BRAND_IMAGE_URL,
      width: '1200',
      height: '630',
    },
    image: BRAND_IMAGE_URL,
    description: 'Servicios de fontaneria, electricidad, desatascos y reparaciones 24 horas en Espana',
    email: getEmail(),
    telephone: getPhoneNumber(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    contactPoint: [getContactPoint()],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Reparar24',
    description: 'Servicios de fontaneria, electricidad, desatascos y reparaciones 24 horas',
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
    inLanguage: 'es-ES',
  }
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
      '@id': `${SITE_URL}#website`,
    },
    about: {
      '@id': `${SITE_URL}#organization`,
    },
    breadcrumb: props.breadcrumbs
      ? {
          '@id': `${props.url}#breadcrumb`,
        }
      : undefined,
    inLanguage: 'es-ES',
    potentialAction: {
      '@type': 'ReadAction',
      target: [props.url],
    },
  }
}

export function generateEnhancedServiceSchema(props: EnhancedServiceSchemaProps) {
  const { service, city, url } = props

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: city ? `${service.name} en ${city.name}` : service.name,
    description: service.description,
    serviceType: service.name,
    url,
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
    provider: {
      '@id': `${SITE_URL}#organization`,
    },
    areaServed: city
      ? {
          '@type': 'City',
          name: city.name,
          containedInPlace: {
            '@type': 'Country',
            name: 'Espana',
          },
        }
      : {
          '@type': 'Country',
          name: 'Espana',
        },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${SITE_URL}#organization`,
      },
      itemOffered: {
        '@id': `${url}#service`,
      },
    },
  }
}
