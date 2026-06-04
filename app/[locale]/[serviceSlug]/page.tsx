import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { faqs } from '@/data/faqs'
import { generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateFAQSchema } from '@/lib/seo/schema'
import { getServiceCityLinks, generateServiceBreadcrumbs } from '@/lib/linking/internal'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { RelatedServicesBlock } from '@/components/seo/RelatedServicesBlock'
import { ServiceGuaranteeBlock } from '@/components/seo/EEATSignals'
import { ServiceHubBlock } from '@/components/seo/ServiceHubBlock'
import Link from 'next/link'
// Commercial components for master template (fontanero)
import { TrustStatsBlock } from '@/components/commercial/TrustStatsBlock'
import { ProcessStepsBlock } from '@/components/commercial/ProcessStepsBlock'
import { CommercialCTA } from '@/components/commercial/CommercialCTA'
import { PricingTableBlock } from '@/components/commercial/PricingTableBlock'
import { StructuredContentBlock } from '@/components/commercial/StructuredContentBlock'

export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string }[] = []
  
  // SPANISH-ONLY PRODUCTION: Only generate Spanish pages
  const locales: Locale[] = ['es']
  
  locales.forEach((locale) => {
    services.forEach((service) => {
      params.push({
        locale,
        serviceSlug: service.slug,
      })
    })
  })
  
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; serviceSlug: string }>
}) {
  const { locale, serviceSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)
  if (!service) return {}
  
  return generateEnhancedServiceMetadata(service, locale)
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; serviceSlug: string }>
}) {
  const { locale, serviceSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)

  if (!service) {
    notFound()
  }

  const serviceSchema = generateServiceSchema({ service })
  const faqSchema = generateFAQSchema({
    questions: [
      {
        question: `¿Cuánto cuesta el servicio de ${service.name.toLowerCase()}?`,
        answer: `El servicio comienza desde ${service.priceRange}. El precio final depende de la complejidad del trabajo.`,
      },
      {
        question: `¿Está disponible ${service.name.toLowerCase()} 24 horas?`,
        answer: service.available24h
          ? 'Sí, nuestro servicio está disponible 24/7 para emergencias.'
          : 'Disponemos de servicio en horario laboral.',
      },
    ],
  })

  const cityLinks = getServiceCityLinks(service, cities, locale)
  const breadcrumbItems = generateServiceBreadcrumbs(service, locale)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        {/* Hero Section - Enhanced for Fontanero */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">{service.icon}</span>
                <h1 className="text-5xl md:text-6xl font-bold">{service.name}</h1>
              </div>
              <p className="text-2xl mb-8 text-primary-50">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+34641688524"
                  className="btn-primary bg-accent-500 hover:bg-accent-600"
                >
                  📞 Llamar Ahora - {service.priceRange}
                </a>
                {serviceSlug === 'fontanero' && (
                  <a
                    href={`https://wa.me/34641688524?text=${encodeURIComponent('Hola, necesito un fontanero profesional. ¿Pueden ayudarme?')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-green-500 hover:bg-green-600"
                  >
                    💬 WhatsApp
                  </a>
                )}
                {service.available24h && (
                  <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center">
                    🕐 Disponible 24 Horas
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Stats Block - FONTANERO ONLY */}
        {serviceSlug === 'fontanero' && <TrustStatsBlock />}

        {/* Process Steps - FONTANERO ONLY */}
        {serviceSlug === 'fontanero' && <ProcessStepsBlock />}

        {/* Benefits Section - OTHER SERVICES */}
        {serviceSlug !== 'fontanero' && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">¿Por Qué Elegirnos?</h2>
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
        )}

        {/* Pricing Table - FONTANERO ONLY */}
        {serviceSlug === 'fontanero' && <PricingTableBlock />}

        {/* Commercial CTA #2 - FONTANERO ONLY (after pricing) */}
        {serviceSlug === 'fontanero' && (
          <CommercialCTA 
            title="Presupuesto Gratuito Sin Compromiso"
            subtitle="Te explicamos qué hay que hacer y cuánto va a costar antes de empezar."
            variant="secondary"
          />
        )}

        {/* Cities Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {service.name} en Tu Ciudad
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors text-center font-medium hover:text-primary-600"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Generic CTA for other services */}
        {serviceSlug !== 'fontanero' && <CTASection locale={locale} />}

        {/* Service-Specific FAQs */}
        {faqs.filter(faq => faq.serviceId === service.id).length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.filter(faq => faq.serviceId === service.id).map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                    <summary className="px-6 py-4 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center">
                      <span>{faq.question}</span>
                      <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* E-E-A-T Trust Signals */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <ServiceGuaranteeBlock locale={locale} />
            </div>
          </div>
        </section>

        {/* Related Services - Internal Linking */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <RelatedServicesBlock currentServiceId={service.id} locale={locale} />
          </div>
        </section>

        {/* Structured Content - FONTANERO ONLY (replaces SEO wall) */}
        {serviceSlug === 'fontanero' ? (
          <StructuredContentBlock />
        ) : (
          /* SEO Content Section - OTHER SERVICES (keep as is) */
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto prose prose-lg">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {service.longDescription}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA - FONTANERO ONLY */}
        {serviceSlug === 'fontanero' && (
          <CommercialCTA 
            title="¿Listo para Resolver Tu Problema?"
            subtitle="Más de 15 años de experiencia. Presupuesto gratuito. Garantía de 2 años."
          />
        )}
      </main>
      <Footer locale={locale} />
    </>
  )
}
