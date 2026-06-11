import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { getDefaultOGImage, OG_IMAGE_DIMENSIONS } from './og-image-mapper'

/**
 * OpenGraph and Twitter Card utilities
 */

interface OpenGraphParams {
  title: string
  description: string
  url: string
  locale: Locale
  image?: string
  imageAlt?: string
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
    image,
    imageAlt,
    type = 'website',
  } = params

  const localeMap: Record<Locale, string> = {
    es: 'es_ES',
    en: 'en_GB',
    ru: 'ru_RU',
  }

  // Use provided image (absolute URL) or default
  const ogImage = image || getDefaultOGImage()

  return {
    title,
    description,
    url,
    siteName: 'Reparar24',
    type,
    locale: localeMap[locale],
    images: [
      {
        url: ogImage,
        width: OG_IMAGE_DIMENSIONS.width,
        height: OG_IMAGE_DIMENSIONS.height,
        alt: imageAlt || title,
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
  const { title, description, image } = params

  // Use provided image (absolute URL) or default
  const twitterImage = image || getDefaultOGImage()

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [twitterImage],
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
