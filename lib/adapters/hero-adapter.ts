/**
 * Hero Adapter
 * 
 * Maps Reparar24's existing data architecture to ServiceHeroV2 props.
 * This adapter isolates data mapping logic, preserving SEO content sources.
 */

import type { Service } from '@/data/services'
import type { City } from '@/data/cities'
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
  Zap,
  Power,
  Lightbulb,
  Cable
} from 'lucide-react'
import { 
  getPhoneDisplay, 
  getPhoneHref, 
  getWhatsAppHref 
} from '@/lib/config/contact'

/**
 * Convert Service + City data to ServiceHeroV2 props for city pages
 */
export function serviceCityToHeroProps(
  service: Service,
  city: City,
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  const isElectricista = service.slug === 'electricista'
  
  // H1 Pattern for city pages: "Fontanero en [City] 24 Horas" or "Electricista en [City]"
  const titleCity = locale === 'es' 
    ? (isFontanero ? `Fontanero en ${city.name} 24 Horas` : 
       isElectricista ? `Electricista en ${city.name}` :
       `${service.name} en ${city.name}`)
    : `${service.name} in ${city.name}`
  
  return {
    eyebrow: locale === 'es' ? `Servicio 24/7 en ${city.name}` : `24/7 Service in ${city.name}`,
    title: titleCity,
    titleHighlight: undefined,
    subtitle: isFontanero
      ? `Fontaneros profesionales en ${city.name}. Llegamos en 30-60 minutos para resolver fugas, desatascos, termos e instalaciones con garantía.`
      : isElectricista
      ? `Electricistas profesionales en ${city.name}. Llegamos en 30-60 minutos para resolver averías eléctricas, cuadros e instalaciones con garantía.`
      : `${service.description} Servicio profesional en ${city.name} con técnicos certificados.`,
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
          ? `Hola, necesito ${service.name.toLowerCase()} en ${city.name}. ¿Pueden ayudarme?`
          : `Hello, I need ${service.name.toLowerCase()} in ${city.name}. Can you help me?`,
        service.slug
      ),
    },
    trustCards: [
      {
        icon: Star,
        title: isElectricista ? '4.8/5' : '4.9/5',
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
      : isElectricista
      ? [
          {
            icon: Zap,
            label: locale === 'es' ? 'Averías' : 'Faults',
          },
          {
            icon: Power,
            label: locale === 'es' ? 'Cuadros' : 'Panels',
          },
          {
            icon: Lightbulb,
            label: locale === 'es' ? 'Instalaciones' : 'Installations',
          },
          {
            icon: Cable,
            label: locale === 'es' ? 'Recableado' : 'Rewiring',
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
      src: isElectricista ? '/images/electricista/electricista-hero.png' : '/images/fontanero-hero.jpg',
      alt: locale === 'es'
        ? `${service.name} profesional en ${city.name} - Servicio 24/7`
        : `Professional ${service.name} in ${city.name} - 24/7 Service`,
    },
  }
}

/**
 * Convert Service data to ServiceHeroV2 props (generic service page)
 */
export function serviceToHeroProps(
  service: Service,
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  
  return {
    eyebrow: locale === 'es' ? 'Servicio Profesional 24h' : '24/7 Professional Service',
    title: isFontanero ? 'Fontanero 24 Horas' : `${service.name} 24 Horas`,
    titleHighlight: undefined, // Simple, clear H1
    subtitle: isFontanero
      ? 'Fontaneros profesionales disponibles 24h todos los días. Reparación urgente de fugas, desatascos, termos eléctricos e instalaciones de fontanería. Llegamos en 30-60 minutos cerca de ti con presupuesto previo.'
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

/**
 * Convert Service + City + District data to ServiceHeroV2 props for district pages
 * H1 Pattern: "Fontanero en [District], [City] 24 Horas" or "Electricista en [District], [City]"
 */
export function serviceDistrictToHeroProps(
  service: Service,
  city: City,
  district: { name: string; slug: string },
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  const isElectricista = service.slug === 'electricista'
  
  // H1 Pattern for district pages: "Fontanero en [District], [City] 24 Horas" or "Electricista en [District], [City]"
  const titleDistrict = locale === 'es'
    ? (isFontanero ? `Fontanero en ${district.name}, ${city.name} 24 Horas` : 
       isElectricista ? `Electricista en ${district.name}, ${city.name}` :
       `${service.name} en ${district.name}, ${city.name}`)
    : `${service.name} in ${district.name}, ${city.name}`
  
  return {
    eyebrow: locale === 'es' ? `Servicio 24/7 en ${district.name}` : `24/7 Service in ${district.name}`,
    title: titleDistrict,
    titleHighlight: undefined,
    subtitle: isFontanero
      ? `Fontaneros profesionales en ${district.name}. Llegamos en 30-60 minutos para resolver fugas, desatascos, termos e instalaciones con garantía. Atención inmediata en tu barrio.`
      : isElectricista
      ? `Electricistas profesionales en ${district.name}. Llegamos en 30-60 minutos para resolver averías eléctricas, cuadros e instalaciones con garantía. Atención inmediata en tu barrio.`
      : `${service.description} Servicio profesional en ${district.name}, ${city.name} con técnicos certificados.`,
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
          ? `Hola, necesito ${service.name.toLowerCase()} en ${district.name}, ${city.name}. ¿Pueden ayudarme?`
          : `Hello, I need ${service.name.toLowerCase()} in ${district.name}, ${city.name}. Can you help me?`,
        service.slug
      ),
    },
    trustCards: [
      {
        icon: Star,
        title: isElectricista ? '4.8/5' : '4.9/5',
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
      : isElectricista
      ? [
          {
            icon: Zap,
            label: locale === 'es' ? 'Averías' : 'Faults',
          },
          {
            icon: Power,
            label: locale === 'es' ? 'Cuadros' : 'Panels',
          },
          {
            icon: Lightbulb,
            label: locale === 'es' ? 'Instalaciones' : 'Installations',
          },
          {
            icon: Cable,
            label: locale === 'es' ? 'Recableado' : 'Rewiring',
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
      src: isElectricista ? '/images/electricista/electricista-hero.png' : '/images/fontanero-hero.jpg',
      alt: locale === 'es'
        ? `${service.name} profesional en ${district.name}, ${city.name} - Servicio 24/7`
        : `Professional ${service.name} in ${district.name}, ${city.name} - 24/7 Service`,
    },
  }
}

/**
 * Convert Child Service data to ServiceHeroV2 props (child service pages)
 */
export function childServiceToHeroProps(
  childServiceName: string,
  childServiceSlug: string,
  childServiceDescription: string,
  locale: Locale
): ServiceHeroV2Props {
  // Map child slugs to chip highlighting
  const chipMapping: Record<string, number> = {
    'reparacion-fugas': 0,
    'desatascos': 1,
    'calentadores-termos': 2,
    'instalaciones': 3,
    'sustitucion-tuberias': 3, // maps to Instalaciones
    'mantenimiento': 3, // maps to Instalaciones
  }
  
  const activeChipIndex = chipMapping[childServiceSlug] ?? -1
  
  // Use compact layout for long titles that may overflow
  const needsCompactLayout = childServiceSlug === 'mantenimiento' || childServiceSlug === 'sustitucion-tuberias'
  
  return {
    eyebrow: locale === 'es' 
      ? `Especialistas en ${childServiceName}` 
      : `Specialists in ${childServiceName}`,
    title: childServiceName,
    titleHighlight: undefined,
    subtitle: childServiceDescription,
    phoneCta: {
      label: locale === 'es' ? 'Llamar ahora' : 'Call now',
      sublabel: 'Desde 49€',
      href: getPhoneHref('fontanero'),
    },
    whatsappCta: {
      label: 'WhatsApp',
      sublabel: locale === 'es' ? 'Respuesta en 2 min' : 'Reply in 2 min',
      href: getWhatsAppHref(
        locale === 'es' 
          ? `Hola, necesito ${childServiceName.toLowerCase()}. ¿Pueden ayudarme?`
          : `Hello, I need ${childServiceName.toLowerCase()}. Can you help me?`,
        'fontanero'
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
    quickChips: [
      {
        icon: Droplets,
        label: locale === 'es' ? 'Fugas' : 'Leaks',
        href: '/fontanero/reparacion-fugas',
        active: activeChipIndex === 0,
      },
      {
        icon: Waves,
        label: locale === 'es' ? 'Desatascos' : 'Unclogging',
        href: '/fontanero/desatascos',
        active: activeChipIndex === 1,
      },
      {
        icon: Flame,
        label: locale === 'es' ? 'Termos' : 'Heaters',
        href: '/fontanero/calentadores-termos',
        active: activeChipIndex === 2,
      },
      {
        icon: Wrench,
        label: locale === 'es' ? 'Instalaciones' : 'Installations',
        href: '/fontanero/instalaciones',
        active: activeChipIndex === 3,
      },
    ],
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
      src: '/images/fontanero-hero.jpg',
      alt: locale === 'es'
        ? `${childServiceName} profesional - Servicio 24/7`
        : `Professional ${childServiceName} - 24/7 Service`,
    },
    compactImage: needsCompactLayout,
  }
}
