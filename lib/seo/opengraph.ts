import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'

/**
 * OpenGraph and Twitter Card utilities
 */

interface OpenGraphParams {
  title: string
  description: string
  url: string
  locale: Locale
  image?: string
  type?: 'website' | 'article'
}

/**
 * Generate comprehensive OpenGraph metadata
 */
export function generateOpenGraph(params: OpenGraphParams): Metadata['openGraph'] {
  const {
    title,
    description,
    url,
    locale,
    image = '/og-default.jpg',
    type = 'website',
  } = params

  const localeMap: Record<Locale, string> = {
    es: 'es_ES',
    en: 'en_GB',
    ru: 'ru_RU',
  }

  return {
    title,
    description,
    url,
    siteName: 'Reparar24',
    type,
    locale: localeMap[locale],
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  }
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(params: {
  title: string
  description: string
  image?: string
}): Metadata['twitter'] {
  const { title, description, image = '/og-default.jpg' } = params

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@reparar24',
  }
}

/**
 * Generate complete social metadata
 */
export function generateSocialMetadata(
  params: OpenGraphParams
): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: generateOpenGraph(params),
    twitter: generateTwitterCard({
      title: params.title,
      description: params.description,
      image: params.image,
    }),
  }
}
