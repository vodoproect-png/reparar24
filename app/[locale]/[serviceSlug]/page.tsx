import Link from 'next/link'
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
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { ServicesDirectoryV2 } from '@/components/ds/ServicesDirectoryV2'
import { TrustSignalsV1 } from '@/components/ds/TrustSignalsV1'
import { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import { TrustCtaBlueV1 } from '@/components/ds/TrustCtaBlueV1'
import ServiceAreasV1 from '@/components/ds/ServiceAreasV1'
import SeoContentSectionV1 from '@/components/ds/SeoContentSectionV1'
import DistrictLinksBlock from '@/components/ds/DistrictLinksBlock'
import RelatedBlogArticles from '@/components/blog/RelatedBlogArticles'
import { serviceToHeroProps } from '@/lib/adapters/hero-adapter'
import {
  getServicePageContent,
  servicePageValenciaCoverage,
} from '@/data/service-page-content'

export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string }[] = []
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

  const serviceContent = getServicePageContent(serviceSlug)
  const isOptimizedService = Boolean(serviceContent)
  const valenciaCity = cities.find((city) => city.slug === 'valencia')
  const serviceSchema = generateServiceSchema({
    service,
    url: `https://reparar24.es/${service.slug}`,
    areaServed:
      service.slug === 'fontanero' && valenciaCity
        ? {
            '@type': 'AdministrativeArea',
            name: valenciaCity.name,
            containedInPlace: {
              '@type': 'Country',
              name: 'Espana',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: valenciaCity.coordinates.lat,
              longitude: valenciaCity.coordinates.lng,
            },
          }
        : undefined,
  })
  const faqSchema = generateFAQSchema({
    questions: serviceContent?.faqs ?? [
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
        {isOptimizedService ? (
          <ServiceHeroV2 {...serviceToHeroProps(service, locale)} />
        ) : (
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="mb-6 flex items-center space-x-4">
                  <span className="text-6xl">{service.icon}</span>
                  <h1 className="text-5xl font-bold md:text-6xl">{service.name}</h1>
                </div>
                <p className="mb-8 text-2xl text-primary-50">{service.description}</p>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="tel:+34642310813"
                    className="btn-primary bg-accent-500 px-8 py-4 text-lg font-bold shadow-xl hover:bg-accent-600"
                  >
                    📞 Llamar ahora - {service.priceRange}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {isOptimizedService && (
          <MobileStickyCTA
            phone="34642310813"
            whatsappMessage={`Hola, necesito un ${service.name.toLowerCase()} urgente. ¿Pueden ayudarme?`}
          />
        )}

        {serviceContent && (
          <>
            <ServicesDirectoryV2 {...serviceContent.servicesDirectory} />
            <TrustSignalsV1 {...serviceContent.trustSignals} />
            <ProcessStepsV3 {...serviceContent.processSteps} />
            <PricingSectionV1 {...serviceContent.pricing} />
            <OpinionesClientesV1 {...serviceContent.opiniones} />
            <ServiceAreasV1 {...servicePageValenciaCoverage} />
          </>
        )}

        {serviceContent && valenciaCity && (
          <DistrictLinksBlock
            service={service}
            city={valenciaCity}
            locale={locale}
            variant="compact"
            title={serviceContent.districtLinks.title}
            description={serviceContent.districtLinks.description}
          />
        )}

        {!isOptimizedService && (
          <section className="bg-gray-50 py-16">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold">¿Por qué elegirnos?</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="card">
                    <div className="flex items-start space-x-3">
                      <span className="mt-1 text-2xl text-green-500">✓</span>
                      <p className="text-lg">{benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!isOptimizedService && (
          <section className="bg-white py-16">
            <div className="container-custom">
              <h2 className="mb-8 text-center text-3xl font-bold">{service.name} en tu ciudad</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {cityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg bg-gray-50 p-4 text-center font-medium transition-colors hover:bg-primary-50 hover:text-primary-600"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {!isOptimizedService && <CTASection locale={locale} />}

        {serviceContent ? (
          <FaqSectionV2 faqs={serviceContent.faqs} />
        ) : (
          faqs.filter((faq) => faq.serviceId === service.id).length > 0 && (
            <section className="bg-gray-50 py-16">
              <div className="container-custom">
                <h2 className="mb-8 text-center text-3xl font-bold">Preguntas frecuentes</h2>
                <div className="mx-auto max-w-3xl space-y-4">
                  {faqs.filter((faq) => faq.serviceId === service.id).map((faq) => (
                    <details key={faq.question} className="group overflow-hidden rounded-lg bg-white shadow-md">
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-semibold transition-colors hover:bg-gray-50">
                        <span>{faq.question}</span>
                        <span className="text-primary-600 transition-transform group-open:rotate-180">⌄</span>
                      </summary>
                      <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )
        )}

        {serviceContent ? (
          <SeoContentSectionV1 {...serviceContent.seo} />
        ) : (
          <section className="bg-white py-16">
            <div className="container-custom">
              <div className="prose prose-lg mx-auto max-w-4xl">
                <div className="whitespace-pre-line leading-relaxed text-gray-700">
                  {service.longDescription}
                </div>
              </div>
            </div>
          </section>
        )}

        {serviceContent && <RelatedBlogArticles commercialPath={`/${service.slug}`} />}

        {isOptimizedService && <TrustCtaBlueV1 />}
      </main>
      <Footer locale={locale} />
    </>
  )
}
