import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { getDistrictContext } from '@/data/district-context'
import { getDistrictSEOContent } from '@/data/district-seo-content'
import { generateEnhancedMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateLocalBusinessSchema } from '@/lib/seo/schema'
import { generateServiceCityDistrictBreadcrumbs } from '@/lib/linking/internal'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import {
  generateDistrictH1,
  generateDistrictMetaDescription,
} from '@/lib/seo/semantic-content-generator'
import { getLightweightDistrictContent } from '@/lib/i18n/district-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { serviceDistrictToHeroProps } from '@/lib/adapters/hero-adapter'
import ServicesGridV1 from '@/components/ds/ServicesGridV1'
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
  
  if (districtSEO && locale === 'es') {
    // Use unique meta tags for pilot districts
    return generateEnhancedMetadata({
      title: districtSEO.metadata.title,
      description: districtSEO.metadata.description,
      path: `${service.slug}/${city.slug}/${district.slug}`,
      locale,
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
  
  // 🌍 MULTILINGUAL LIGHTWEIGHT PILOT: Use lightweight content for EN/RU
  const lightweightContent = getLightweightDistrictContent(locale, service, city, district)

  const serviceSchema = generateServiceSchema({ service, city })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} en ${district.name} - Reparar24`,
    description: `${service.description} en ${district.name}, ${city.name}`,
    city: city,
  })

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
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        {/* Hero Section - ServiceHeroV2 for fontanero only */}
        {service.slug === 'fontanero' ? (
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
                        ? (locale === 'en' ? `${service.name} in ${district.name}` : `${service.name} в ${district.name}`)
                        : `${service.name} en ${district.name}`
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
                        ? (locale === 'en' ? 'Postal Codes:' : 'Почтовые индексы:')
                        : 'Códigos Postales:'
                      } {district.postalCodes.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+34641688524"
                    className="btn-primary bg-accent-500 hover:bg-accent-600 text-lg px-8 py-4"
                  >
                    📞 Llamar Ahora
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Approved Neutral Blocks - Fontanero Only */}
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

        {/* FAQ Section - Migrate existing FAQ content */}
        {districtSEO && districtSEO.faqs && districtSEO.faqs.length > 0 && locale === 'es' && service.slug === 'fontanero' && (
          <FaqSectionV2
            faqs={districtSEO.faqs.map(faq => ({
              question: faq.question,
              answer: faq.answer
            }))}
          />
        )}

        {/* District-Specific SEO Content - Keep existing SEO text */}
        {districtSEO && locale === 'es' && service.slug === 'fontanero' && (
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

        {/* Final CTA - TrustCtaBlueV1 for fontanero */}
        {service.slug === 'fontanero' && <TrustCtaBlueV1 />}
      </main>
      <Footer locale={locale} />
    </>
  )
}
