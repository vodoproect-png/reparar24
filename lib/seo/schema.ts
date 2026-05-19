import { Service } from '@/data/services'
import { City } from '@/data/cities'
import { getPhoneNumber } from '@/lib/config/contact'

interface LocalBusinessSchemaProps {
  name: string
  description: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  image?: string
  priceRange?: string
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: props.name,
    description: props.description,
    telephone: props.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry
    },
    image: props.image || 'https://reparar24.es/logo.png',
    priceRange: props.priceRange || '€€',
    openingHours: 'Mo-Su 00:00-24:00',
    areaServed: {
      '@type': 'Country',
      name: 'España'
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reparar24',
    url: 'https://reparar24.es',
    logo: 'https://reparar24.es/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: getPhoneNumber().replace('+', '').replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1-$2-$3-$4'),
      contactType: 'customer service',
      areaServed: 'ES',
      availableLanguage: 'Spanish'
    },
    sameAs: [
      'https://facebook.com/reparar24',
      'https://twitter.com/reparar24',
      'https://instagram.com/reparar24'
    ]
  }
}
