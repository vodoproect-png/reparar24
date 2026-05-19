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

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  // Dictionary available for future use
  // const dict = getDictionary(params.locale)
  
  const businessAddress = getBusinessAddress()
  
  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Reparar24',
    description: 'Servicios profesionales de fontanería, electricidad, desatascos y reparaciones 24 horas',
    telephone: getPhoneNumber(),
    address: {
      streetAddress: businessAddress.streetAddress,
      addressLocality: businessAddress.addressLocality,
      postalCode: businessAddress.postalCode,
      addressCountry: businessAddress.addressCountry,
    },
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
