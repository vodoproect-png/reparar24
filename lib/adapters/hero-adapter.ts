/**
 * Hero Adapter
 * 
 * Maps Reparar24's existing data architecture to ServiceHeroV2 props.
 * This adapter isolates data mapping logic, preserving SEO content sources.
 */

import type { Service } from '@/data/services'
import type { Locale } from '@/lib/i18n/config'
import type { ServiceHeroV2Props } from '@/components/ds/ServiceHeroV2'
import { 
  Star, 
  Clock, 
  ShieldCheck, 
  Droplets, 
  Waves, 
  Flame, 
  Wrench 
} from '@/components/ds/ServiceHeroV2'
import { 
  getPhoneDisplay, 
  getPhoneHref, 
  getWhatsAppHref 
} from '@/lib/config/contact'

/**
 * Convert Service data to ServiceHeroV2 props
 */
export function serviceToHeroProps(
  service: Service,
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  
  return {
    eyebrow: locale === 'es' ? 'Servicio 24/7 en Valencia' : '24/7 Service in Valencia',
    title: service.name,
    titleHighlight: undefined, // Can be customized per service if needed
    subtitle: isFontanero
      ? 'Llegamos en 30-60 minutos. Solucionamos averías de fontanería con garantía y al mejor precio.'
      : service.description,
    phoneCta: {
      label: locale === 'es' ? 'Llamar ahora' : 'Call now',
      sublabel: service.priceRange,
      href: getPhoneHref(service.slug),
    },
    whatsappCta: {
      label: 'WhatsApp',
      sublabel: locale === 'es' ? 'Respuesta en 2 min' : 'Reply in 2 min',
      href: getWhatsAppHref(
        locale === 'es' 
          ? `Hola, necesito ${service.name.toLowerCase()}. ¿Pueden ayudarme?`
          : `Hello, I need ${service.name.toLowerCase()}. Can you help me?`,
        service.slug
      ),
    },
    trustCards: [
      {
        icon: Star,
        title: '4.9/5',
        subtitle: locale === 'es' ? '500+ reseñas' : '500+ reviews',
      },
      {
        icon: Clock,
        title: '24/7',
        subtitle: locale === 'es' ? '365 días al año' : '365 days/year',
      },
      {
        icon: ShieldCheck,
        title: locale === 'es' ? 'Profesionales' : 'Certified',
        subtitle: locale === 'es' ? 'certificados' : 'professionals',
      },
    ],
    quickChips: isFontanero
      ? [
          {
            icon: Droplets,
            label: locale === 'es' ? 'Fugas' : 'Leaks',
          },
          {
            icon: Waves,
            label: locale === 'es' ? 'Desatascos' : 'Unclogging',
          },
          {
            icon: Flame,
            label: locale === 'es' ? 'Termos' : 'Heaters',
          },
          {
            icon: Wrench,
            label: locale === 'es' ? 'Instalaciones' : 'Installations',
          },
        ]
      : [],
    highlights: [
      {
        label: locale === 'es' ? 'Llegada en 30-60 min' : 'Arrival in 30-60 min',
      },
      {
        label: locale === 'es' ? 'Garantía 2 años' : '2 year warranty',
      },
      {
        label: locale === 'es' ? 'Seguro RC 600.000€' : 'Insurance 600,000€',
      },
      {
        label: locale === 'es' ? 'Presupuesto gratuito' : 'Free quote',
      },
    ],
    image: {
      src: '/images/fontanero-hero.jpg', // Dedicated hero image
      alt: locale === 'es'
        ? `${service.name} profesional - Servicio 24/7`
        : `Professional ${service.name} - 24/7 Service`,
    },
  }
}
