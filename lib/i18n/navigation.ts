import { locales, type Locale } from './config'

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

const spanishNavigation: ServiceNavigation = {
  plumbing: {
    slug: 'fontanero',
    label: 'Fontaneria',
    href: '/fontanero',
  },
  electrical: {
    slug: 'electricista',
    label: 'Electricidad',
    href: '/electricista',
  },
  drainage: {
    slug: 'desatascos',
    label: 'Desatascos',
    href: '/desatascos',
  },
  airConditioning: {
    slug: 'aire-acondicionado',
    label: 'Aire Acondicionado',
    href: '/aire-acondicionado',
  },
}

export function getServiceNavigation(locale: Locale): ServiceNavigation {
  void locale
  return spanishNavigation
}

export function getMainNavigation(locale: Locale): NavItem[] {
  const services = getServiceNavigation(locale)

  return [
    services.plumbing,
    services.electrical,
    services.drainage,
    services.airConditioning,
  ]
}

export interface LocaleSwitcher {
  locale: Locale
  label: string
  nativeLabel: string
}

export function getLocaleSwitchers(currentPath: string): LocaleSwitcher[] {
  void currentPath

  return locales.map((locale) => ({
    locale,
    label: 'Spanish',
    nativeLabel: 'Espanol',
  }))
}
