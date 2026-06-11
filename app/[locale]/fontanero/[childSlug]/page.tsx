import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema as genBreadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import type { Metadata } from 'next'
import { getServiceOGImage } from '@/lib/seo/og-image-mapper'
// V0 Design System Components - SAME AS PARENT
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { ServicesGridV1 } from '@/components/ds/ServicesGridV1'
import { TrustSignalsV1 } from '@/components/ds/TrustSignalsV1'
import { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import { TrustCtaBlueV1 } from '@/components/ds/TrustCtaBlueV1'
import SeoContentSectionV1 from '@/components/ds/SeoContentSectionV1'
import { ServiceAreasV1 } from '@/components/ds/ServiceAreasV1'
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
import { childServiceToHeroProps } from '@/lib/adapters/hero-adapter'
// SEO Master Data - Source of truth for all content
import { childServicesData } from '@/data/fontanero/child-services-seo'
// Reusable neutral commercial content - SAME AS PARENT /fontanero
import {
  fontaneroServicesGridContent,
  fontaneroTrustSignalsContent,
  fontaneroProcessStepsContent,
  fontaneroPricingSectionContent,
  fontaneroOpinionesClientesContent,
} from '@/data/fontanero/page-components-content'
// Shared Valencia GEO preset
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'

// Generate static params for child services
export async function generateStaticParams() {
  const params: { locale: Locale; childSlug: string }[] = []
  
  // SPANISH-ONLY PRODUCTION
  const locales: Locale[] = ['es']
  
  locales.forEach((locale) => {
    Object.keys(childServicesData).forEach((slug) => {
      params.push({
        locale,
        childSlug: slug,
      })
    })
  })
  
  return params
}

// Generate metadata - using SEO_MASTER data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}): Promise<Metadata> {
  const { childSlug } = await params
  const serviceData = childServicesData[childSlug]
  
  if (!serviceData) {
    return {}
  }

  const canonicalUrl = `https://reparar24.es/fontanero/${childSlug}`
  const ogImage = getServiceOGImage('fontanero')
  
  const keywords = [serviceData.lockedPrimaryKw, ...serviceData.secondaryKw].join(', ')
  
  return {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      url: canonicalUrl,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Fontanería profesional 24 horas | Reparar24',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceData.metaTitle,
      description: serviceData.metaDescription,
      images: [ogImage],
      creator: '@reparar24',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

// Page component - SAME ARCHITECTURE AS /fontanero
export default async function FontaneroChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  const { locale, childSlug } = await params
  const serviceData = childServicesData[childSlug]

  if (!serviceData) {
    notFound()
  }

  const parentService = services.find((s) => s.slug === 'fontanero')!

  // Breadcrumbs
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Fontanería', url: '/fontanero' },
    { name: serviceData.h1, url: `/fontanero/${childSlug}` }
  ]

  const breadcrumbSchema = genBreadcrumbSchema(breadcrumbItems)

  // Service schema
  const serviceSchema = generateServiceSchema({
    service: {
      ...parentService,
      name: serviceData.h1,
      description: serviceData.description
    }
  })

  // FAQ schema - using service-specific FAQs from SEO_MASTER
  const faqSchema = generateFAQSchema({
    questions: serviceData.faqs
  })

  // Hero props with correct H1 from SEO_MASTER
  const heroProps = childServiceToHeroProps(
    serviceData.h1, // Use H1 from SEO_MASTER
    childSlug,
    serviceData.description,
    locale
  )

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
        {/* BLOCK 1: Hero Section - V0 Design System with correct H1 (SEO-specific) */}
        <ServiceHeroV2 {...heroProps} />

        {/* Mobile Sticky CTA */}
        <MobileStickyCTA 
          phone="34641688524"
          whatsappMessage={`Hola, necesito ${serviceData.h1.toLowerCase()}. ¿Pueden ayudarme?`}
        />

        {/* BLOCK 2: Services Grid V1 - NEUTRAL COMMERCIAL (reusable from parent) */}
        <ServicesGridV1 {...fontaneroServicesGridContent} />

        {/* BLOCK 3: SEO Heading + Trust Signals V1 - NEUTRAL COMMERCIAL (reusable from parent) */}
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
        <TrustSignalsV1 {...fontaneroTrustSignalsContent} />

        {/* BLOCK 4: Process Steps V3 - NEUTRAL COMMERCIAL (reusable from parent) */}
        <ProcessStepsV3 {...fontaneroProcessStepsContent} />

        {/* BLOCK 5: Pricing Section V1 - NEUTRAL COMMERCIAL (reusable from parent) */}
        <PricingSectionV1 {...fontaneroPricingSectionContent} />

        {/* BLOCK 6: Opiniones Clientes V1 - NEUTRAL COMMERCIAL (reusable from parent) */}
        <OpinionesClientesV1 {...fontaneroOpinionesClientesContent} />

        {/* BLOCK 7: Service Areas V1 - SHARED VALENCIA GEO COVERAGE (from preset) */}
        <ServiceAreasV1 {...servicePageValenciaCoverage} />

        {/* BLOCK 8: FAQ Section V2 - SERVICE SPECIFIC SEO CONTENT (from SEO_MASTER) */}
        <FaqSectionV2 faqs={serviceData.faqs} />

        {/* BLOCK 9: SEO Content Section V1 - SERVICE SPECIFIC SEO CONTENT (from SEO_MASTER) */}
        <SeoContentSectionV1 {...serviceData.seoContent} />

        {/* BLOCK 10: Final CTA - Trust CTA Blue V1 - NEUTRAL COMMERCIAL (reusable from parent) */}
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
