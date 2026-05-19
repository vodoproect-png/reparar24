import type { Locale } from './config'

// Dictionary type structure (can be expanded)
export type Dictionary = {
  common: {
    call: string
    whatsapp: string
    available24h: string
    freeQuote: string
    emergency: string
    contact: string
    services: string
    cities: string
    about: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
  }
  footer: {
    rights: string
    privacy: string
    terms: string
    cookies: string
  }
}

// Spanish (default)
const es: Dictionary = {
  common: {
    call: 'Llamar',
    whatsapp: 'WhatsApp',
    available24h: 'Disponible 24/7',
    freeQuote: 'Presupuesto Gratuito',
    emergency: 'Emergencia',
    contact: 'Contacto',
    services: 'Servicios',
    cities: 'Ciudades',
    about: 'Nosotros',
  },
  home: {
    hero: {
      title: 'Servicios de Reparación 24 Horas en España',
      subtitle: 'Fontaneros, electricistas y profesionales disponibles las 24 horas',
      cta: 'Llamar Ahora',
    },
  },
  footer: {
    rights: 'Todos los derechos reservados',
    privacy: 'Política de Privacidad',
    terms: 'Términos y Condiciones',
    cookies: 'Cookies',
  },
}

// English
const en: Dictionary = {
  common: {
    call: 'Call',
    whatsapp: 'WhatsApp',
    available24h: 'Available 24/7',
    freeQuote: 'Free Quote',
    emergency: 'Emergency',
    contact: 'Contact',
    services: 'Services',
    cities: 'Cities',
    about: 'About',
  },
  home: {
    hero: {
      title: '24-Hour Repair Services in Spain',
      subtitle: 'Plumbers, electricians and professionals available 24 hours',
      cta: 'Call Now',
    },
  },
  footer: {
    rights: 'All rights reserved',
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    cookies: 'Cookies',
  },
}

// Russian
const ru: Dictionary = {
  common: {
    call: 'Позвонить',
    whatsapp: 'WhatsApp',
    available24h: 'Доступно 24/7',
    freeQuote: 'Бесплатная оценка',
    emergency: 'Срочный вызов',
    contact: 'Контакты',
    services: 'Услуги',
    cities: 'Города',
    about: 'О нас',
  },
  home: {
    hero: {
      title: 'Ремонтные услуги 24 часа в Испании',
      subtitle: 'Сантехники, электрики и специалисты доступны круглосуточно',
      cta: 'Позвонить сейчас',
    },
  },
  footer: {
    rights: 'Все права защищены',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    cookies: 'Cookies',
  },
}

const dictionaries = { es, en, ru }

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.es
}
