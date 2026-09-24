import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema as genBreadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getServiceOGImage } from '@/lib/seo/og-image-mapper'
import { fitMetaDescription, fitSeoTitle } from '@/lib/seo/meta-length'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { ServicesDirectoryV2 } from '@/components/ds/ServicesDirectoryV2'
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
import RelatedBlogArticles from '@/components/blog/RelatedBlogArticles'
import { childServiceToHeroProps } from '@/lib/adapters/hero-adapter'
import { getAllowedPageSlugs, isPageAllowed } from '@/data/seo/page-registry'
import {
  type ChildPageServiceSlug,
  getServiceChildPageContent,
  servicePageValenciaCoverage,
} from '@/data/service-child-page-content'

type ChildRouteParams = Promise<{ locale: Locale; childSlug: string }>

export function generateChildServiceStaticParams(parentSlug: ChildPageServiceSlug) {
  const params: { locale: Locale; childSlug: string }[] = []
  const locales: Locale[] = ['es']
  const allowedSlugs = getAllowedPageSlugs(parentSlug)

  locales.forEach((locale) => {
    allowedSlugs.forEach((slug) => {
      params.push({ locale, childSlug: slug })
    })
  })

  return params
}

export async function generateChildServiceMetadata(
  parentSlug: ChildPageServiceSlug,
  params: ChildRouteParams
): Promise<Metadata> {
  const { childSlug } = await params
  const config = getServiceChildPageContent(parentSlug)
  const serviceData = config.childServices[childSlug]

  if (!serviceData) return {}

  const canonicalUrl = `https://reparar24.es/${parentSlug}/${childSlug}`
  const ogImage = getServiceOGImage(parentSlug)
  const keywords = [serviceData.lockedPrimaryKw, ...serviceData.secondaryKw].join(', ')
  const metaTitle = fitSeoTitle(serviceData.metaTitle)
  const metaDescription = fitMetaDescription(serviceData.metaDescription)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
      creator: '@reparar24',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export async function ServiceChildPageTemplate({
  parentSlug,
  params,
}: {
  parentSlug: ChildPageServiceSlug
  params: ChildRouteParams
}) {
  const { locale, childSlug } = await params
  const config = getServiceChildPageContent(parentSlug)

  if (!isPageAllowed(parentSlug, childSlug)) {
    notFound()
  }

  const serviceData = config.childServices[childSlug]
  if (!serviceData) {
    notFound()
  }

  const parentService = services.find((s) => s.slug === parentSlug)
  if (!parentService) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: config.parentLabel, url: `/${parentSlug}` },
    { name: serviceData.h1, url: `/${parentSlug}/${childSlug}` },
  ]
  const canonicalUrl = `https://reparar24.es/${parentSlug}/${childSlug}`
  const breadcrumbSchema = genBreadcrumbSchema(breadcrumbItems)
  const serviceSchema = generateServiceSchema({
    service: {
      ...parentService,
      name: serviceData.h1,
      description: serviceData.description,
    },
    url: canonicalUrl,
  })
  const faqSchema = generateFAQSchema({ questions: serviceData.faqs })
  const heroProps = childServiceToHeroProps(
    serviceData.h1,
    childSlug,
    serviceData.description,
    locale,
    parentSlug
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
        <ServiceHeroV2 {...heroProps} />
        <MobileStickyCTA
          phone="34642310813"
          whatsappMessage={`Hola, necesito ${serviceData.h1.toLowerCase()}. ¿Pueden ayudarme?`}
        />
        {config.servicesListing.kind === 'grid' ? (
          <ServicesGridV1 {...config.servicesListing.props} />
        ) : (
          <ServicesDirectoryV2 {...config.servicesListing.props} />
        )}
        <TrustSignalsV1 {...config.trustSignals} />
        <ProcessStepsV3 {...config.processSteps} />
        <PricingSectionV1 {...config.pricing} />
        <OpinionesClientesV1 {...config.opiniones} />
        <ServiceAreasV1 {...servicePageValenciaCoverage} />
        <FaqSectionV2 faqs={serviceData.faqs} />
        <SeoContentSectionV1 {...serviceData.seoContent} />
        <RelatedBlogArticles commercialPath={`/${parentSlug}/${childSlug}`} />
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
