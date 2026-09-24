import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { getDistrictContext } from '@/data/district-context'
import { getDistrictSEOContent } from '@/data/district-seo-content'
import { generateEnhancedMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateLocalBusinessSchema, generateFAQSchema } from '@/lib/seo/schema'
import { generateServiceCityDistrictBreadcrumbs } from '@/lib/linking/internal'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import {
  generateDistrictH1,
  generateDistrictMetaDescription,
} from '@/lib/seo/semantic-content-generator'
import { getLightweightDistrictContent } from '@/lib/i18n/district-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { serviceDistrictToHeroProps } from '@/lib/adapters/hero-adapter'
import ServicesGridV1 from '@/components/ds/ServicesGridV1'
import ServicesDirectoryV2 from '@/components/ds/ServicesDirectoryV2'
import TrustSignalsV1 from '@/components/ds/TrustSignalsV1'
import ProcessStepsV3 from '@/components/ds/ProcessStepsV3'
import PricingSectionV1 from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import ServiceAreasV1 from '@/components/ds/ServiceAreasV1'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import {
  fontaneroServicesGridContent,
  fontaneroTrustSignalsContent,
  fontaneroProcessStepsContent,
  fontaneroPricingSectionContent,
  fontaneroOpinionesClientesContent,
} from '@/data/fontanero/page-components-content'
import {
  electricistaServicesGridContent,
  electricistaTrustSignalsContent,
  electricistaProcessStepsContent,
  electricistaPricingSectionContent,
  electricistaOpinionesClientesContent,
} from '@/data/electricista/page-components-content'
import {
  desatascosServicesDirectoryContent,
  desatascosTrustSignalsContent,
  desatascosProcessStepsContent,
  desatascosPricingSectionContent,
  desatascosOpinionesClientesContent,
} from '@/data/desatascos/page-components-content'
import {
  aireAcondicionadoServicesDirectoryContent,
  aireAcondicionadoTrustSignalsContent,
  aireAcondicionadoProcessStepsContent,
  aireAcondicionadoPricingSectionContent,
  aireAcondicionadoOpinionesClientesContent,
} from '@/data/aire-acondicionado/page-components-content'
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'

export async function generateStaticParams() {
  const params: {
    locale: Locale
    serviceSlug: string
    citySlug: string
    districtSlug: string
  }[] = []

  // SPANISH-ONLY PRODUCTION: Only generate Spanish pages
  // EN/RU middleware redirects to Spanish equivalents
  const locales: Locale[] = ['es']

  locales.forEach((locale) => {
    services.forEach((service) => {
      cities.forEach((city) => {
        city.districts.forEach((district) => {
          params.push({
            locale,
            serviceSlug: service.slug,
            citySlug: city.slug,
            districtSlug: district.slug,
          })
        })
      })
    })
  })

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale
    serviceSlug: string
    citySlug: string
    districtSlug: string
  }>
}) {
  const { locale, serviceSlug, citySlug, districtSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)
  const city = cities.find((c) => c.slug === citySlug)
  const district = city?.districts.find((d) => d.slug === districtSlug)

  if (!service || !city || !district) return {}

  // Check for unique district SEO content (Phase 1 Pilot)
  const districtSEO = getDistrictSEOContent(service.id, city.slug, district.slug)
  
  // Custom alt text for fontanero service
  const imageAlt = service.slug === 'fontanero' 
    ? 'Fontanería profesional 24 horas | Reparar24'
    : undefined
  
  if (districtSEO && locale === 'es') {
    // Use unique meta tags for pilot districts
    return generateEnhancedMetadata({
      title: districtSEO.metadata.title,
      description: districtSEO.metadata.description,
      path: `${service.slug}/${city.slug}/${district.slug}`,
      locale,
      imageAlt,
    })
  }

  // Fall back to generated meta tags for non-pilot districts
  const context = getDistrictContext(city.id, district.id)
  const h1 = generateDistrictH1(service, city, district, context)
  const description = generateDistrictMetaDescription(service, city, district, context)

  return generateEnhancedMetadata({
    title: `${h1} | Reparar24`,
    description,
    path: `${service.slug}/${city.slug}/${district.slug}`,
    locale,
    imageAlt,
  })
}

export default async function ServiceCityDistrictPage({
  params,
}: {
  params: Promise<{
    locale: Locale
    serviceSlug: string
    citySlug: string
    districtSlug: string
  }>
}) {
  const { locale, serviceSlug, citySlug, districtSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)
  const city = cities.find((c) => c.slug === citySlug)
  const district = city?.districts.find((d) => d.slug === districtSlug)

  if (!service || !city || !district) {
    notFound()
  }

  // Check for unique district SEO content (Phase 1 Pilot)
  const districtSEO = getDistrictSEOContent(service.id, city.slug, district.slug)
  const rendersServiceSeoContent =
    service.slug === 'fontanero' ||
    service.slug === 'electricista' ||
    service.slug === 'desatascos' ||
    service.slug === 'aire-acondicionado' ||
    service.slug === 'calefaccion' ||
    service.slug === 'limpieza-tuberias'
  
  // 🌍 MULTILINGUAL LIGHTWEIGHT PILOT: Use lightweight content for EN/RU
  const lightweightContent = getLightweightDistrictContent(locale, service, city, district)

  const canonicalUrl = `https://reparar24.es/${service.slug}/${city.slug}/${district.slug}`
  const serviceSchema = generateServiceSchema({ service, city, url: canonicalUrl })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} en ${district.name} - Reparar24`,
    description: `${service.description} en ${district.name}, ${city.name}`,
    city: city,
    url: canonicalUrl,
  })
  const faqSchema = districtSEO && districtSEO.faqs.length > 0
    ? generateFAQSchema({
        questions: districtSEO.faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })),
      })
    : null

  // Generate breadcrumbs
  const breadcrumbItems = generateServiceCityDistrictBreadcrumbs(
    service,
    city,
    district.name,
    district.slug,
    locale
  )
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  // Check if this is Valencia district for ServiceAreasV1
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
        {/* Hero Section - ServiceHeroV2 for approved DS services */}
        {rendersServiceSeoContent ? (
          <ServiceHeroV2 {...serviceDistrictToHeroProps(service, city, district, locale)} />
        ) : (
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
            <div className="container-custom">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-6xl">{service.icon}</span>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold">
                      {lightweightContent 
                        ? `${service.name} en ${district.name}`
                        : `${service.name} en ${district.name}, ${city.name}`
                      }
                    </h1>
                    <p className="text-xl mt-2 text-primary-100">
                      {city.name}, {city.province}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span>📮</span>
                    <span>
                      {lightweightContent 
                        ? 'Códigos postales:'
                        : 'Códigos Postales:'
                      } {district.postalCodes.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+34642310813"
                    className="btn-primary bg-accent-500 hover:bg-accent-600 text-lg px-8 py-4"
                  >
                    📞 Llamar Ahora
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Approved DS Blocks - Fontanero, Electricista and Desatascos */}
        {service.slug === 'fontanero' && (
          <>
            <ServicesGridV1 {...fontaneroServicesGridContent} />
            <TrustSignalsV1 {...fontaneroTrustSignalsContent} />
            <ProcessStepsV3 {...fontaneroProcessStepsContent} />
            <PricingSectionV1 {...fontaneroPricingSectionContent} />
            <OpinionesClientesV1 {...fontaneroOpinionesClientesContent} />
            
            {/* Valencia ServiceAreasV1 - Only for Valencia districts */}
            {isValencia && <ServiceAreasV1 {...servicePageValenciaCoverage} />}
          </>
        )}
        {service.slug === 'electricista' && (
          <>
            <ServicesGridV1 {...electricistaServicesGridContent} />
            <TrustSignalsV1 {...electricistaTrustSignalsContent} />
            <ProcessStepsV3 {...electricistaProcessStepsContent} />
            <PricingSectionV1 {...electricistaPricingSectionContent} />
            <OpinionesClientesV1 {...electricistaOpinionesClientesContent} />
          </>
        )}
        {service.slug === 'desatascos' && (
          <>
            <ServicesDirectoryV2 {...desatascosServicesDirectoryContent} />
            <TrustSignalsV1 {...desatascosTrustSignalsContent} />
            <ProcessStepsV3 {...desatascosProcessStepsContent} />
            <PricingSectionV1 {...desatascosPricingSectionContent} />
            <OpinionesClientesV1 {...desatascosOpinionesClientesContent} />
          </>
        )}
        {service.slug === 'aire-acondicionado' && (
          <>
            <ServicesDirectoryV2 {...aireAcondicionadoServicesDirectoryContent} />
            <TrustSignalsV1 {...aireAcondicionadoTrustSignalsContent} />
            <ProcessStepsV3 {...aireAcondicionadoProcessStepsContent} />
            <PricingSectionV1 {...aireAcondicionadoPricingSectionContent} />
            <OpinionesClientesV1 {...aireAcondicionadoOpinionesClientesContent} />
          </>
        )}

        {/* FAQ Section - Migrate existing FAQ content */}
        {districtSEO && districtSEO.faqs && districtSEO.faqs.length > 0 && locale === 'es' && rendersServiceSeoContent && (
          <FaqSectionV2
            faqs={districtSEO.faqs.map(faq => ({
              question: faq.question,
              answer: faq.answer
            }))}
          />
        )}

        {/* District-Specific SEO Content - Keep existing SEO text */}
        {districtSEO && locale === 'es' && rendersServiceSeoContent && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {districtSEO.seoText}
                  </p>
                </div>
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
