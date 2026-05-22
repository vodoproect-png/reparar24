import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateLocalBusinessSchema } from '@/lib/seo/schema'
import { getDistrictLinks, generateServiceCityBreadcrumbs } from '@/lib/linking/internal'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import { getCitySEOContent } from '@/data/city-seo-content'
import { CitySEOFAQList } from '@/components/seo/CitySEOFAQList'
import { getLightweightCityContent } from '@/lib/i18n/city-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { EEATSection } from '@/components/seo/EEATSignals'
import Link from 'next/link'

export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string; citySlug: string }[] = []
  
  const locales: Locale[] = ['es', 'en', 'ru']
  
  locales.forEach((locale) => {
    services.forEach((service) => {
      cities.forEach((city) => {
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
  const coverageHeading = lightweightContent ? lightweightContent.coverageHeading : `Cobertura en ${city.name}`
  const ourServiceHeading = lightweightContent ? lightweightContent.ourServiceHeading : `Nuestro Servicio de ${service.name} en ${city.name}`
  const otherServicesHeading = lightweightContent ? lightweightContent.otherServicesHeading : `Otros Servicios en ${city.name}`
  const faqHeading = lightweightContent ? lightweightContent.faqHeading : `Preguntas Frecuentes sobre ${service.name} en ${city.name}`
  const callNowCTA = lightweightContent ? lightweightContent.callNowCTA : 'Llamar Ahora'
  const service24hBadge = lightweightContent ? lightweightContent.service24hBadge : `Servicio 24h en ${city.name}`

  // Schema names (locale-aware)
  const schemaNameSuffix = lightweightContent ? lightweightContent.schemaNameSuffix : `en ${city.name}`
  const schemaDescPrefix = lightweightContent ? lightweightContent.schemaDescPrefix : `en ${city.name}`

  const serviceSchema = generateServiceSchema({ service, city })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} ${schemaNameSuffix} - Reparar24`,
    description: `${service.description} ${schemaDescPrefix}`,
    city: city,
  })

  const districtLinks = getDistrictLinks(city, service, locale)

  // Get city-specific SEO content if available (Spanish only)
  const citySEO = locale === 'es' ? getCitySEOContent(service.id, city.slug) : null

  // Generate breadcrumbs
  const breadcrumbItems = generateServiceCityBreadcrumbs(service, city, locale)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

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
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        {/* Hero Section */}
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
                  href="tel:+34641688524"
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

        {/* Districts Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">{coverageHeading}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {districtLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="card text-center hover:-translate-y-1 transition-all"
                >
                  <div className="font-semibold">{link.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {ourServiceHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="card">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-2xl mt-1">✓</span>
                    <p className="text-lg">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EEAT Trust Signals */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <EEATSection
              city={city.name}
              showGuarantee={true}
              showResponseTime={true}
              showExpertise={true}
              showProcess={false}
            />
          </div>
        </section>

        {/* AI-Optimized Q&A Section - TEMPORARILY DISABLED FOR SEMANTIC GOVERNANCE */}
        {/*
          GOVERNANCE NOTE: Generic emergency FAQ layer disabled on GEO city pages.
          Issue: commonEmergencyQuestions contains cross-service terminology.
          Example: "fontanero" terms appearing on electricista pages.
          
          This creates semantic contamination and violates keyword ownership.
          
          Status: GENERIC_FAQ_LAYER_DISABLED
          Will be replaced with service-specific, GEO-optimized FAQs after approval.
        */}
        {/* {locale === 'es' && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Preguntas Frecuentes - {service.name} en {city.name}
              </h2>
              <div className="max-w-4xl mx-auto">
                <AIAnswerList questions={commonEmergencyQuestions.es} />
              </div>
            </div>
          </section>
        )} */}

        {/* Other Services in City */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">{otherServicesHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services
                .filter((s) => s.id !== service.id)
                .slice(0, 3)
                .map((otherService) => {
                  const otherServiceUrl = `/${locale}/${otherService.slug}/${city.slug}`
                  return (
                    <Link
                      key={otherService.id}
                      href={otherServiceUrl}
                      className="card group hover:-translate-y-1 transition-all"
                    >
                      <div className="text-4xl mb-3">{otherService.icon}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">
                        {lightweightContent 
                          ? `${otherService.name} ${lightweightContent.schemaNameSuffix}`
                          : `${otherService.name} en ${city.name}`
                        }
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {otherService.description}
                      </p>
                      <span className="text-primary-600 font-semibold">
                        {otherService.priceRange} →
                      </span>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>

        {/* Final CTA - Above SEO Content */}
        <CTASection locale={locale} />

        {/* City-Specific FAQs - ENABLED FOR FONTANERÍA ENTERPRISE SEO (Spanish only) */}
        {citySEO && citySEO.faqs.length > 0 && locale === 'es' && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {faqHeading}
              </h2>
              <div className="max-w-4xl mx-auto">
                <CitySEOFAQList 
                  faqs={citySEO.faqs}
                  serviceName={service.name}
                  cityName={city.name}
                />
              </div>
            </div>
          </section>
        )}

        {/* City-Specific SEO Content - Absolute Bottom Before Footer (Spanish only) */}
        {citySEO && locale === 'es' && (
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
      </main>
      <Footer locale={locale} />
    </>
  )
}
