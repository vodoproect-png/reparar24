import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { GoogleAnalytics, GTMNoScript } from '@/components/analytics/GoogleAnalytics'
import '../globals.css'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }
  
  // MULTILINGUAL INDEXATION FREEZE
  // En/ru pages contain broken Spanish content - block from indexing
  const isNonIndexable = locale !== 'es'
  
  const metadataByLocale: Record<Locale, Metadata> = {
    es: {
      metadataBase: new URL('https://reparar24.es'),
      title: {
        default: 'Reparar24 - Servicios de Fontanería, Electricidad y Reparaciones 24/7',
        template: '%s | Reparar24',
      },
      description:
        'Servicios profesionales de fontanería, electricidad, desatascos y emergencias 24 horas en toda España.',
      robots: {
        index: true,
        follow: true,
      },
    },
    en: {
      metadataBase: new URL('https://reparar24.es'),
      title: {
        default: 'Reparar24 - Plumbing, Electrical and Repair Services 24/7',
        template: '%s | Reparar24',
      },
      description:
        'Professional plumbing, electrical, drain cleaning and emergency services available 24 hours throughout Spain.',
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    },
    ru: {
      metadataBase: new URL('https://reparar24.es'),
      title: {
        default: 'Reparar24 - Сантехнические, электрические и ремонтные услуги 24/7',
        template: '%s | Reparar24',
      },
      description:
        'Профессиональные сантехнические, электрические услуги и аварийный сервис 24 часа по всей Испании.',
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    },
  }

  return metadataByLocale[locale]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params as { locale: Locale }
  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  // Dictionary available for future use
  // const dict = getDictionary(params.locale)

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen flex flex-col">
        <GTMNoScript />
        {children}
      </body>
    </html>
  )
}
