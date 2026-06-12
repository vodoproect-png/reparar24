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
import { ServiceGuaranteeBlock } from '@/components/seo/EEATSignals'
import { ServiceHubBlock } from '@/components/seo/ServiceHubBlock'
import Link from 'next/link'
// Commercial components for master template (fontanero)
import { TrustStatsBlock } from '@/components/commercial/TrustStatsBlock'
import { CommercialCTA } from '@/components/commercial/CommercialCTA'
import { PricingTableBlock } from '@/components/commercial/PricingTableBlock'
// Conversion components
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
// PILOT: V0 Design System Components
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { ServicesGridV1 } from '@/components/ds/ServicesGridV1'
import { TrustSignalsV1 } from '@/components/ds/TrustSignalsV1'
import { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import { TrustCtaBlueV1 } from '@/components/ds/TrustCtaBlueV1'
import ServiceAreasV1 from '@/components/ds/ServiceAreasV1'
import SeoContentSectionV1 from '@/components/ds/SeoContentSectionV1'
import { serviceToHeroProps } from '@/lib/adapters/hero-adapter'
import { fontaneroHubSeoContent, fontaneroHubFaqs } from '@/data/fontanero/hub-page-content'
import {
  fontaneroServicesGridContent,
  fontaneroTrustSignalsContent,
  fontaneroProcessStepsContent,
  fontaneroPricingSectionContent,
  fontaneroOpinionesClientesContent,
} from '@/data/fontanero/page-components-content'
import {
  electricistaHeroContent,
} from '@/data/electricista/page-components-content'
// Shared Valencia GEO preset
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'

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
        {/* Hero Section - PILOT: V0 Design System Component (fontanero, electricista) */}
        {serviceSlug === 'fontanero' ? (
          <ServiceHeroV2 {...serviceToHeroProps(service, locale)} />
        ) : serviceSlug === 'electricista' ? (
          <ServiceHeroV2 {...electricistaHeroContent} />
        ) : (
          /* Original Hero Section - Other Services */
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-6xl">{service.icon}</span>
                  <h1 className="text-5xl md:text-6xl font-bold">
                    {service.name}
                  </h1>
                </div>
                <p className="text-2xl mb-8 text-primary-50">
                  {service.description}
                </p>
                
                {/* CTAs - Only 2 primary actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <a
                    href="tel:+34641688524"
                    className="btn-primary bg-accent-500 hover:bg-accent-600 text-lg font-bold px-8 py-4 shadow-xl"
                  >
                    📞 Llamar Ahora - {service.priceRange}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Mobile Sticky CTA - Fontanero */}
        {serviceSlug === 'fontanero' && (
          <MobileStickyCTA 
            phone="34641688524"
            whatsappMessage="Hola, necesito un fontanero urgente. ¿Pueden ayudarme?"
          />
        )}

        {/* PILOT: V0 ServicesGridV1 - WITH PROPS (fontanero) */}
        {serviceSlug === 'fontanero' && <ServicesGridV1 {...fontaneroServicesGridContent} />}

        {/* SEO Heading + PILOT: V0 TrustSignalsV1 - WITH PROPS (fontanero) */}
        {serviceSlug === 'fontanero' && (
          <div className="container-custom mt-8 mb-4">
            {/* Pill badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                VENTAJAS REPARAR24
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="mt-6 text-balance text-center text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
              ¿Por qué elegir Reparar24?
            </h2>
          </div>
        )}
        {serviceSlug === 'fontanero' && <TrustSignalsV1 {...fontaneroTrustSignalsContent} />}

        {/* Process Steps V3 - WITH PROPS (fontanero) */}
        {serviceSlug === 'fontanero' && <ProcessStepsV3 {...fontaneroProcessStepsContent} />}

        {/* Pricing Section V1 - WITH PROPS (fontanero) */}
        {serviceSlug === 'fontanero' && <PricingSectionV1 {...fontaneroPricingSectionContent} />}

        {/* Opiniones Clientes V1 - WITH PROPS (fontanero) */}
        {serviceSlug === 'fontanero' && <OpinionesClientesV1 {...fontaneroOpinionesClientesContent} />}

        {/* Service Areas V1 - SHARED VALENCIA GEO COVERAGE (fontanero) */}
        {serviceSlug === 'fontanero' && <ServiceAreasV1 {...servicePageValenciaCoverage} />}

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

        {/* Service Areas - REMOVED (duplicates SeoContentSectionV1 coverage) */}

        {/* Cities Section - OTHER SERVICES */}
        {serviceSlug !== 'fontanero' && (
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
        )}

        {/* Generic CTA for other services */}
        {serviceSlug !== 'fontanero' && <CTASection locale={locale} />}

        {/* FAQ Section - FONTANERO uses V2, ELECTRICISTA uses generic, others use generic */}
        {serviceSlug === 'fontanero' ? (
          <FaqSectionV2 faqs={fontaneroHubFaqs} />
        ) : (
          faqs.filter(faq => faq.serviceId === service.id).length > 0 && (
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
          )
        )}

        {/* SEO Content Section V1 - FONTANERO (v0 approved component) */}
        {serviceSlug === 'fontanero' ? (
          <SeoContentSectionV1 {...fontaneroHubSeoContent} />
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

        {/* Final CTA - FONTANERO */}
        {serviceSlug === 'fontanero' && <TrustCtaBlueV1 />}
      </main>
      <Footer locale={locale} />
    </>
  )
}
