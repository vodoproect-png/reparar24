import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { generateEnhancedMetadata, generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema'
import { generateServiceCityBreadcrumbs } from '@/lib/linking/internal'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import { getCitySEOContent } from '@/data/city-seo-content'
import { getLightweightCityContent } from '@/lib/i18n/city-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { serviceCityToHeroProps } from '@/lib/adapters/hero-adapter'
import ServicesGridV1 from '@/components/ds/ServicesGridV1'
import ServicesDirectoryV2 from '@/components/ds/ServicesDirectoryV2'
import TrustSignalsV1 from '@/components/ds/TrustSignalsV1'
import ProcessStepsV3 from '@/components/ds/ProcessStepsV3'
import PricingSectionV1 from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import ServiceAreasV1 from '@/components/ds/ServiceAreasV1'
import DistrictLinksBlock from '@/components/ds/DistrictLinksBlock'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import {
  getServiceCityPageContent,
  servicePageValenciaCoverage,
} from '@/data/service-city-page-content'

export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string; citySlug: string }[] = []
  
  // SPANISH-ONLY PRODUCTION: Only generate Spanish pages
  const locales: Locale[] = ['es']
  
  locales.forEach((locale) => {
    services.forEach((service) => {
      cities.forEach((city) => {
        if (city.slug === 'valencia') {
          return
        }

        params.push({
          locale,
          serviceSlug: service.slug,
          citySlug: city.slug,
        })
      })
    })
  })
  
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; serviceSlug: string; citySlug: string }>
}) {
  const { locale, serviceSlug, citySlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)
  const city = cities.find((c) => c.slug === citySlug)

  if (!service || !city) return {}

  const citySEO = locale === 'es' ? getCitySEOContent(service.id, city.slug) : null

  if (citySEO?.metadata) {
    return generateEnhancedMetadata({
      title: citySEO.metadata.title,
      description: citySEO.metadata.description,
      keywords: [
        ...citySEO.keywords.primary,
        ...citySEO.keywords.secondary,
        ...citySEO.keywords.longTail,
      ],
      path: `${service.slug}/${city.slug}`,
      locale,
    })
  }

  return generateEnhancedServiceMetadata(service, locale, city)
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ locale: Locale; serviceSlug: string; citySlug: string }>
}) {
  const { locale, serviceSlug, citySlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)
  const city = cities.find((c) => c.slug === citySlug)

  if (!service || !city) {
    notFound()
  }

  // 🌍 MULTILINGUAL LIGHTWEIGHT ARCHITECTURE
  // Spanish: Uses full enterprise SEO from city-seo-content.ts
  // EN/RU: Uses lightweight translations 
  const lightweightContent = getLightweightCityContent(locale, service, city)

  // Locale-aware content (Spanish uses hardcoded, EN/RU uses lightweight)
  const h1 = lightweightContent ? lightweightContent.h1 : `${service.name} en ${city.name}`
  const callNowCTA = lightweightContent ? lightweightContent.callNowCTA : 'Llamar Ahora'
  const service24hBadge = lightweightContent ? lightweightContent.service24hBadge : `Servicio 24h en ${city.name}`

  // Schema names (locale-aware)
  const schemaNameSuffix = lightweightContent ? lightweightContent.schemaNameSuffix : `en ${city.name}`
  const schemaDescPrefix = lightweightContent ? lightweightContent.schemaDescPrefix : `en ${city.name}`

  const canonicalUrl = `https://reparar24.es/${service.slug}/${city.slug}`
  const serviceSchema = generateServiceSchema({ service, city, url: canonicalUrl })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} ${schemaNameSuffix} - Reparar24`,
    description: `${service.description} ${schemaDescPrefix}`,
    city: city,
    url: canonicalUrl,
  })

  // Get city-specific SEO content if available (Spanish only)
  const citySEO = locale === 'es' ? getCitySEOContent(service.id, city.slug) : null
  const faqSchema = citySEO && citySEO.faqs.length > 0
    ? generateFAQSchema({
        questions: citySEO.faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })),
      })
    : null
  const cityPageContent = getServiceCityPageContent(service.slug)
  const rendersServiceSeoContent = Boolean(cityPageContent || citySEO)

  // Generate breadcrumbs
  const breadcrumbItems = generateServiceCityBreadcrumbs(service, city, locale)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  // Check if this is Valencia for ServiceAreasV1
  const isValencia = city.slug === 'valencia'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        {/* Hero Section - ServiceHeroV2 for approved service pages */}
        {rendersServiceSeoContent ? (
          <ServiceHeroV2 {...serviceCityToHeroProps(service, city, locale)} />
        ) : (
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-6xl">{service.icon}</span>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold">
                      {h1}
                    </h1>
                  </div>
                </div>
                <p className="text-2xl mb-8 text-primary-50">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+34642310813"
                    className="btn-primary bg-accent-500 hover:bg-accent-600"
                  >
                    📞 {callNowCTA} - {service.priceRange}
                  </a>
                  {service.available24h && (
                    <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center">
                      🕐 {service24hBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {cityPageContent && (
          <>
            {cityPageContent.servicesListing.kind === 'grid' ? (
              <ServicesGridV1 {...cityPageContent.servicesListing.props} />
            ) : (
              <ServicesDirectoryV2 {...cityPageContent.servicesListing.props} />
            )}
            <TrustSignalsV1 {...cityPageContent.trustSignals} />
            <ProcessStepsV3 {...cityPageContent.processSteps} />
            <PricingSectionV1 {...cityPageContent.pricing} />
            <OpinionesClientesV1 {...cityPageContent.opiniones} />
            {cityPageContent.showValenciaCoverage && isValencia && (
              <ServiceAreasV1 {...servicePageValenciaCoverage} />
            )}
          </>
        )}

        {/* District Internal Links Block - ALL SERVICES */}
        <DistrictLinksBlock service={service} city={city} locale={locale} />

        {/* FAQ Section - Migrate existing FAQ content */}
        {citySEO && citySEO.faqs.length > 0 && locale === 'es' && rendersServiceSeoContent && (
          <FaqSectionV2
            faqs={citySEO.faqs.map(faq => ({
              question: faq.question,
              answer: faq.answer
            }))}
          />
        )}

        {/* City-Specific SEO Content - Keep existing SEO text */}
        {citySEO && locale === 'es' && rendersServiceSeoContent && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: citySEO.seoText
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^/g, '<p>')
                      .replace(/$/g, '</p>')
                  }} 
                />
              </div>
            </div>
          </section>
        )}

        {/* Final CTA - TrustCtaBlueV1 for DS services */}
        {rendersServiceSeoContent ? (
          <TrustCtaBlueV1 />
        ) : (
          <CTASection locale={locale} />
        )}
      </main>
      <Footer locale={locale} />
    </>
  )
}
