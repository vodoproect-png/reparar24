import type { Locale } from './config'

/**
 * Locale-aware navigation configuration
 * Maps service slugs and labels to their localized versions
 */

export interface NavItem {
  slug: string
  label: string
  href: string
}

export interface ServiceNavigation {
  plumbing: NavItem
  electrical: NavItem
  drainage: NavItem
  airConditioning: NavItem
}

/**
 * Get localized service navigation
 * Currently uses same slugs across locales for SEO consistency
 * Labels are localized for UI display
 */
export function getServiceNavigation(locale: Locale): ServiceNavigation {
  const navigationMaps: Record<Locale, ServiceNavigation> = {
    es: {
      plumbing: {
        slug: 'fontanero',
        label: 'Fontanería',
        href: `/es/fontanero`,
      },
      electrical: {
        slug: 'electricista',
        label: 'Electricidad',
        href: `/es/electricista`,
      },
      drainage: {
        slug: 'desatascos',
        label: 'Desatascos',
        href: `/es/desatascos`,
      },
      airConditioning: {
        slug: 'aire-acondicionado',
        label: 'Aire Acondicionado',
        href: `/es/aire-acondicionado`,
      },
    },
    en: {
      plumbing: {
        slug: 'fontanero', // Keep Spanish slug for now for URL consistency
        label: 'Plumbing',
        href: `/en/fontanero`,
      },
      electrical: {
        slug: 'electricista',
        label: 'Electrical',
        href: `/en/electricista`,
      },
      drainage: {
        slug: 'desatascos',
        label: 'Drain Cleaning',
        href: `/en/desatascos`,
      },
      airConditioning: {
        slug: 'aire-acondicionado',
        label: 'Air Conditioning',
        href: `/en/aire-acondicionado`,
      },
    },
    ru: {
      plumbing: {
        slug: 'fontanero',
        label: 'Сантехника',
        href: `/ru/fontanero`,
      },
      electrical: {
        slug: 'electricista',
        label: 'Электрика',
        href: `/ru/electricista`,
      },
      drainage: {
        slug: 'desatascos',
        label: 'Прочистка труб',
        href: `/ru/desatascos`,
      },
      airConditioning: {
        slug: 'aire-acondicionado',
        label: 'Кондиционеры',
        href: `/ru/aire-acondicionado`,
      },
    },
  }

  return navigationMaps[locale]
}

/**
 * Get main navigation items
 */
export function getMainNavigation(locale: Locale): NavItem[] {
  const services = getServiceNavigation(locale)
  
  return [
    services.plumbing,
    services.electrical,
    services.drainage,
    services.airConditioning,
  ]
}

/**
 * Get locale switcher items
 */
export interface LocaleSwitcher {
  locale: Locale
  label: string
  nativeLabel: string
}

export function getLocaleSwitchers(currentPath: string): LocaleSwitcher[] {
  return [
    {
      locale: 'es',
      label: 'Spanish',
      nativeLabel: 'Español',
    },
    {
      locale: 'en',
      label: 'English',
      nativeLabel: 'English',
    },
    {
      locale: 'ru',
      label: 'Russian',
      nativeLabel: 'Русский',
    },
  ]
}
