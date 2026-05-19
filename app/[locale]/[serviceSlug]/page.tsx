import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'
import { generateServiceSchema, generateFAQSchema } from '@/lib/seo/schema'
import { getServiceCityLinks } from '@/lib/linking/internal'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import Link from 'next/link'

export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string }[] = []
  
  const locales: Locale[] = ['es', 'en', 'ru']
  
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
      <Header locale={locale} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">{service.icon}</span>
                <h1 className="text-5xl md:text-6xl font-bold">{service.name}</h1>
              </div>
              <p className="text-2xl mb-8 text-primary-50">{service.longDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+34900000000"
                  className="btn-primary bg-accent-500 hover:bg-accent-600"
                >
                  📞 Llamar Ahora - {service.priceRange}
                </a>
                {service.available24h && (
                  <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center">
                    🕐 Disponible 24 Horas
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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

        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
