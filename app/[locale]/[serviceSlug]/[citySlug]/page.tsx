import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateLocalBusinessSchema } from '@/lib/seo/schema'
import { getDistrictLinks } from '@/lib/linking/internal'
import { getCitySEOContent } from '@/data/city-seo-content'
import { CitySEOFAQList } from '@/components/seo/CitySEOFAQList'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { AIAnswerList, commonEmergencyQuestions } from '@/components/seo/AIAnswerBlock'
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

  const serviceSchema = generateServiceSchema({ service, city })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} en ${city.name} - Reparar24`,
    description: `${service.description} en ${city.name}`,
    city: city,
  })

  const districtLinks = getDistrictLinks(city, service, locale)

  // Get city-specific SEO content if available
  const citySEO = getCitySEOContent(service.id, city.slug)

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
      <Header locale={locale} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-6xl">{service.icon}</span>
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold">
                    {service.name} en {city.name}
                  </h1>
                  <p className="text-xl mt-2 text-primary-100">
                    {city.province} - {city.population.toLocaleString(locale)} habitantes
                  </p>
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
                  📞 Llamar Ahora - {service.priceRange}
                </a>
                {service.available24h && (
                  <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center">
                    🕐 Servicio 24h en {city.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Districts Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Cobertura en {city.name}</h2>
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
              Nuestro Servicio de {service.name} en {city.name}
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

        {/* AI-Optimized Q&A Section */}
        {locale === 'es' && (
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
        )}

        {/* Other Services in City */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Otros Servicios en {city.name}</h2>
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
                        {otherService.name} en {city.name}
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

        {/* City-Specific SEO Content - Absolute Bottom Placement */}
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

        {/* City-Specific FAQs - Before Footer */}
        {citySEO && citySEO.faqs.length > 0 && locale === 'es' && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Preguntas Frecuentes sobre {service.name} en {city.name}
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
      </main>
      <Footer locale={locale} />
    </>
  )
}
