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

const dictionaries = { es }

export const getDictionary = (locale: Locale): Dictionary => {
  void locale
  return dictionaries.es
}
