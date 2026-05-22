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
  generateDistrictIntro,
  generateLocalExpertiseText,
  generateDistrictFAQs,
  generateDistrictProblems,
  generateDistrictH1,
  generateDistrictMetaDescription,
  generateEmergencyContext,
  generateDistrictCTA,
  generateDistrictWhatsAppMessage,
} from '@/lib/seo/semantic-content-generator'
import { getLightweightDistrictContent } from '@/lib/i18n/district-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import EmergencyBanner from '@/components/conversion/EmergencyBanner'
import WhatsAppCTA from '@/components/conversion/WhatsAppCTA'
import { EEATSection } from '@/components/seo/EEATSignals'

export async function generateStaticParams() {
  const params: {
    locale: Locale
    serviceSlug: string
    citySlug: string
    districtSlug: string
  }[] = []

  const locales: Locale[] = ['es', 'en', 'ru']

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
  
  // Get district context for semantic content
  const context = getDistrictContext(city.id, district.id)
  
  // 🌍 MULTILINGUAL LIGHTWEIGHT PILOT: Use lightweight content for EN/RU
  const lightweightContent = getLightweightDistrictContent(locale, service, city, district)
  
  // Spanish (es): Full semantic content generator
  // EN/RU: Lightweight translated content
  const intro = lightweightContent ? lightweightContent.intro : generateDistrictIntro(service, city, district, context)
  const localExpertise = lightweightContent 
    ? {
        title: lightweightContent.expertiseTitle,
        paragraphs: lightweightContent.expertiseParagraphs,
        highlights: lightweightContent.expertiseHighlights
      }
    : generateLocalExpertiseText(service, city, district, context)
  const faqs = (districtSEO && locale === 'es') ? districtSEO.faqs : generateDistrictFAQs(service, city, district, context)
  const problems = generateDistrictProblems(service, city, district, context, 4)
  const h1 = lightweightContent 
    ? (locale === 'en' ? `${service.name} in ${district.name}` : `${service.name} в ${district.name}`)
    : generateDistrictH1(service, city, district, context)
  const emergencyText = lightweightContent ? lightweightContent.emergencyText : generateEmergencyContext(service, city, district, context)
  const cta = lightweightContent 
    ? { primary: lightweightContent.callUrgentCTA, secondary: 'WhatsApp' }
    : generateDistrictCTA(service, city, district, context)
  const whatsappMessage = lightweightContent ? lightweightContent.whatsappMessage : generateDistrictWhatsAppMessage(service, city, district, context)
  
  // Section headings (locale-aware)
  const postalCodesLabel = lightweightContent ? (locale === 'en' ? 'Postal Codes:' : 'Почтовые индексы:') : 'Códigos Postales:'
  const ourExperienceLabel = lightweightContent ? (locale === 'en' ? 'Our Experience' : 'Наш опыт') : 'Nuestra Experiencia'
  const frequentProblemsHeading = lightweightContent ? `${lightweightContent.frequentProblemsHeading} ${district.name}` : `Problemas Frecuentes en ${district.name}`
  const emergencyHeading = lightweightContent ? `${lightweightContent.emergencyHeading} ${district.name}` : `Emergencias 24/7 en ${district.name}`
  const faqHeading = lightweightContent ? lightweightContent.faqHeading : `Preguntas Frecuentes - ${service.name} en ${district.name}`
  const whyChooseUsHeading = lightweightContent ? `${lightweightContent.whyChooseUsHeading} ${district.name}` : `Por Qué Elegirnos en ${district.name}`
  const professionalServiceHeading = lightweightContent ? lightweightContent.professionalServiceHeading : `${service.name} Profesional en ${district.name}, ${city.name}`

  const serviceSchema = generateServiceSchema({ service, city })
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `${service.name} en ${district.name} - Reparar24`,
    description: intro.substring(0, 200),
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
      <EmergencyBanner />
      <main>
        {/* Hero Section with Semantic H1 */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-6xl">{service.icon}</span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">{h1}</h1>
                  <p className="text-xl mt-2 text-primary-100">
                    {city.name}, {city.province}
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span>📮</span>
                  <span>{postalCodesLabel} {district.postalCodes.join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+34641688524"
                  className="btn-primary bg-accent-500 hover:bg-accent-600 text-lg px-8 py-4"
                >
                  📞 {cta.primary}
                </a>
                <WhatsAppCTA
                  variant="inline"
                  message={whatsappMessage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Expertise Section - Semantic Content */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">{localExpertise.title}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 space-y-4">
                {localExpertise.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">{ourExperienceLabel}</h3>
                <ul className="space-y-3">
                  {localExpertise.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* District-Specific Problems */}
        {problems.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8">
                {frequentProblemsHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {problems.map((problem, index) => (
                  <div key={index} className="card">
                    <h3 className="text-xl font-bold mb-3">{problem.problem}</h3>
                    <p className="text-gray-700">{problem.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Emergency Section - if applicable */}
        {emergencyText && (
          <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50 border-y-4 border-red-200">
            <div className="container-custom">
              <div className="flex items-center gap-6">
                <span className="text-6xl">🚨</span>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-900 mb-2">
                    {emergencyHeading}
                  </h2>
                  <p className="text-red-700 text-lg leading-relaxed">
                    {emergencyText}
                  </p>
                </div>
                <a
                  href="tel:+34641688524"
                  className="btn-primary bg-red-600 hover:bg-red-700 text-white px-8 py-4 whitespace-nowrap"
                >
                  📞 {cta.primary}
                </a>
              </div>
            </div>
          </section>
        )}

        {/* District-Specific FAQs */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {faqHeading}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="card group">
                  <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-primary-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed border-t pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* General Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {whyChooseUsHeading}
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
        <section className="py-16 bg-white">
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

        {/* Unique District SEO Text - Bottom Placement (Pilot Districts Only) */}
        {districtSEO && locale === 'es' && (
          <section className="py-16 bg-white border-t-2 border-gray-100">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">
                  {professionalServiceHeading}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {districtSEO.seoText}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
      <WhatsAppCTA variant="floating" message={whatsappMessage} />
    </>
  )
}
