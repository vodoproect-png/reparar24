export const locales = ['es', 'en', 'ru'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  ru: 'Русский',
}

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  ru: '🇷🇺',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale
  }
  
  return defaultLocale
}
