export const legacyLocales = ['es', 'en', 'ru'] as const
export type Locale = (typeof legacyLocales)[number]

// Reparar24 is a Spanish-only site. Keep EN/RU only as legacy URL inputs for
// redirects, never as active routes to generate, link or index.
export const locales = ['es'] as const satisfies readonly Locale[]
export type ActiveLocale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'Español',
  ru: 'Español',
}

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇪🇸',
  ru: '🇪🇸',
}

export function isValidLocale(locale: string): locale is Locale {
  return legacyLocales.includes(locale as Locale)
}

export function isActiveLocale(locale: string): locale is ActiveLocale {
  return locales.includes(locale as ActiveLocale)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale
  }
  
  return defaultLocale
}
