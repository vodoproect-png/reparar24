import type { Locale } from '@/lib/i18n/config'
import { locales } from '@/lib/i18n/config'

/**
 * Hreflang utilities for multilingual SEO
 */

export interface HreflangLink {
  hreflang: string
  href: string
}

/**
 * Generate hreflang links for a given path
 * 
 * MULTILINGUAL INDEXATION FREEZE: Only Spanish hreflang
 * English and Russian pages contain broken Spanish content
 * Hreflang disabled for en/ru until proper translations exist
 */
export function generateHreflangLinks(
  path: string,
  baseUrl: string = 'https://reparar24.es'
): HreflangLink[] {
  const links: HreflangLink[] = []
  
  // FREEZE: Only indexable locales (Spanish only)
  const indexableLocales = locales.filter(locale => locale === 'es')
  
  // Add locale-specific links (only Spanish)
  indexableLocales.forEach((locale) => {
    const href = locale === 'es' 
      ? `${baseUrl}/${path}`
      : `${baseUrl}/${locale}/${path}`
      
    links.push({
      hreflang: getHreflangCode(locale),
      href: href,
    })
  })
  
  // Add x-default (Spanish as default)
  links.push({
    hreflang: 'x-default',
    href: `${baseUrl}/${path}`,
  })
  
  return links
}

/**
 * Convert locale to hreflang code
 */
export function getHreflangCode(locale: Locale): string {
  const hreflangMap: Record<Locale, string> = {
    es: 'es-ES',
    en: 'en-GB',
    ru: 'ru-RU',
  }
  
  return hreflangMap[locale] || locale
}

/**
 * Generate hreflang meta tags for Next.js metadata
 */
export function getHreflangMetadata(path: string, baseUrl: string = 'https://reparar24.es') {
  const links = generateHreflangLinks(path, baseUrl)
  
  return {
    alternates: {
      canonical: `${baseUrl}/${path}`,
      languages: links.reduce((acc, link) => {
        if (link.hreflang !== 'x-default') {
          acc[link.hreflang] = link.href
        }
        return acc
      }, {} as Record<string, string>),
    },
  }
}
