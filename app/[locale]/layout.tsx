import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, isActiveLocale, type Locale } from '@/lib/i18n/config'

export const dynamicParams = false

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale }

  const metadataByLocale: Record<Locale, Metadata> = {
    es: {
      metadataBase: new URL('https://reparar24.es'),
      title: {
        default: 'Reparar24 | Fontanería, Electricidad y Reparaciones 24/7',
        template: '%s',
      },
      description:
        '¿Emergencia en casa? Fontanero y electricista 24/7 en España. Profesionales certificados desde 49€. Presupuesto gratis. ¡Llama ya!',
      robots: {
        index: true,
        follow: true,
      },
    },
    en: {
      metadataBase: new URL('https://reparar24.es'),
      title: {
        default: 'Reparar24 - Plumbing, Electrical and Repair Services 24/7',
        template: '%s',
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
        default: 'Reparar24 - Servicios de reparación 24/7',
        template: '%s',
      },
      description:
        'Servicios profesionales de fontanería, electricidad y reparaciones urgentes 24/7 en España.',
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    },
  }

  return metadataByLocale[locale] ?? metadataByLocale.es
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params as { locale: Locale }

  if (!isActiveLocale(locale)) {
    notFound()
  }

  return children
}
