import { notFound } from 'next/navigation'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n/config'
import { cities } from '@/data/cities'
import { services } from '@/data/services'
import { generateEnhancedCityMetadata } from '@/lib/seo/metadata-enhanced'
import { generateLocalBusinessSchema } from '@/lib/seo/schema'
import { getCityServiceLinks } from '@/lib/linking/internal'
import { getPhoneHref, getPhoneDisplay, getPhoneNumber } from '@/lib/config/contact'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { EEATSection } from '@/components/seo/EEATSignals'

export async function generateStaticParams() {
  const params: { locale: Locale; citySlug: string }[] = []
  const locales: Locale[] = ['es', 'en', 'ru']
  
  locales.forEach((locale) => {
    cities.forEach((city) => {
      params.push({ locale, citySlug: city.slug })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; citySlug: string }> }) {
  const { locale, citySlug } = await params
  const city = cities.find((c) => c.slug === citySlug)
  if (!city) return {}
  return generateEnhancedCityMetadata(city, locale)
}

export default async function CityPage({ params }: { params: Promise<{ locale: Locale; citySlug: string }> }) {
  const { locale, citySlug } = await params
  const city = cities.find((c) => c.slug === citySlug)
  
  if (!city) notFound()

  const localBusinessSchema = generateLocalBusinessSchema({
    name: `Reparar24 - Servicios en ${city.name}`,
    description: `Servicios profesionales 24 horas en ${city.name}`,
    city: city,
  })

  const serviceLinks = getCityServiceLinks(city, services, locale)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Header locale={locale} />
      <main>
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Servicios Profesionales en {city.name}</h1>
            <p className="text-2xl mb-4 text-primary-50">Fontaneros, electricistas y profesionales 24h en {city.province}</p>
            <p className="text-lg mb-8 text-primary-100">📍 {city.districts.length} distritos • 👥 {city.population.toLocaleString(locale)} habitantes</p>
            <a href={getPhoneHref()} className="btn-primary bg-accent-500 hover:bg-accent-600">📞 {getPhoneDisplay()}</a>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Todos los Servicios en {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="card hover:-translate-y-1 transition-all">
                  <h3 className="text-xl font-bold mb-2 text-primary-600">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </Link>
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

        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
