import { type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import Hero from '@/components/sections/Hero'
import ServicesSection from '@/components/sections/ServicesSection'
import CitiesSection from '@/components/sections/CitiesSection'
import CTASection from '@/components/sections/CTASection'
import FAQSection from '@/components/sections/FAQSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
import EmergencyBanner from '@/components/conversion/EmergencyBanner'
import { generateLocalBusinessSchema } from '@/lib/seo/schema'
import { getPhoneNumber, getBusinessAddress } from '@/lib/config/contact'
import type { Metadata } from 'next'

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

// SPANISH-ONLY PRODUCTION: Only generate Spanish homepage
export async function generateStaticParams() {
  return [{ locale: 'es' as Locale }]
}

// Homepage Open Graph Metadata
export async function generateMetadata(): Promise<Metadata> {
  const ogImage = 'https://reparar24.es/reparar24-og.png'
  
  return {
    title: 'Reparar24 - Servicios de Fontanería, Electricidad y Climatización 24/7',
    description: 'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
    openGraph: {
      title: 'Reparar24 - Servicios de Fontanería, Electricidad y Climatización 24/7',
      description: 'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
      url: 'https://reparar24.es',
      siteName: 'Reparar24',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Reparar24 - Servicios profesionales de fontanería, electricidad y climatización 24/7 en Valencia',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Reparar24 - Servicios de Fontanería, Electricidad y Climatización 24/7',
      description: 'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
      images: [ogImage],
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  // Dictionary available for future use
  // const dict = getDictionary(params.locale)
  
  const businessAddress = getBusinessAddress()
  
  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Reparar24',
    description: 'Servicios profesionales de fontanería, electricidad, desatascos y reparaciones 24 horas',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <EmergencyBanner />
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <ServicesSection locale={locale} />
        <CitiesSection locale={locale} />
        <ReviewsSection locale={locale} />
        <FAQSection locale={locale} />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
      <MobileStickyCTA />
    </>
  )
}
