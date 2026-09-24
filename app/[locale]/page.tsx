import { type Locale } from '@/lib/i18n/config'
import Hero from '@/components/sections/Hero'
import ServicesSection from '@/components/sections/ServicesSection'
import CitiesSection from '@/components/sections/CitiesSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import ProcessStepsV3 from '@/components/ds/ProcessStepsV3'
import SeoContentSectionV1 from '@/components/ds/SeoContentSectionV1'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import TrustSignalsV1 from '@/components/ds/TrustSignalsV1'
import {
  homepageCommercialKeywords,
  homepageFaqs,
  homepageProcessStepsContent,
  homepageSeoContent,
  homepageTrustSignalsContent,
} from '@/data/homepage-content'
import { generateFAQSchema, generateLocalBusinessSchema } from '@/lib/seo/schema'
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
  const ogImage = 'https://reparar24.es/reparar24-og.jpg'

  return {
    title: 'Reparar24 - Servicios de Fontanería, Electricidad y Climatización 24/7',
    description:
      'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
    keywords: homepageCommercialKeywords,
    alternates: {
      canonical: 'https://reparar24.es',
    },
    openGraph: {
      title: 'Reparar24 - Servicios de Fontanería, Electricidad y Climatización 24/7',
      description:
        'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
      url: 'https://reparar24.es',
      siteName: 'Fontanero Valencia Reparar24',
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
      description:
        'Profesionales certificados. Atención urgente 24 horas. Fontanería, electricidad y climatización en Valencia.',
      images: [ogImage],
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Reparar24',
    description: 'Servicios profesionales de fontanería, electricidad, desatascos y reparaciones 24 horas',
  })
  const faqSchema = generateFAQSchema({ questions: homepageFaqs })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <ServicesSection locale={locale} />
        <TrustSignalsV1 {...homepageTrustSignalsContent} />
        <ProcessStepsV3 {...homepageProcessStepsContent} />
        <CitiesSection locale={locale} />
        <ReviewsSection locale={locale} />
        <FaqSectionV2 faqs={homepageFaqs} />
        <SeoContentSectionV1 {...homepageSeoContent} />
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
      <MobileStickyCTA />
    </>
  )
}
