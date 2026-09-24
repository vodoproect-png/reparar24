/**
 * Hero Adapter
 *
 * Maps Reparar24's content architecture to the approved ServiceHeroV2 shell.
 * The layout stays fixed; SEO copy, service chips, CTA URLs and service images vary by page.
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
  Wrench,
} from '@/components/ds/ServiceHeroV2'
import {
  Zap,
  Power,
  Lightbulb,
  Cable,
  Gauge,
  Snowflake,
  Fan,
  Search,
} from 'lucide-react'
import {
  getPhoneHref,
  getWhatsAppHref,
} from '@/lib/config/contact'

const ELECTRICISTA_CHILD_SLUGS = new Set([
  'urgencias-electricas',
  'instalaciones-electricas',
  'cuadros-electricos',
  'iluminacion-led',
  'enchufes-interruptores',
  'averias-electricas',
])

const DESATASCOS_CHILD_SLUGS = new Set([
  'desatasco-tuberias',
  'desatascar-fregadero',
  'desatascar-wc',
  'desatascar-lavabo-ducha',
  'camion-cuba',
  'limpieza-fosas-septicas',
])

const AIRE_ACONDICIONADO_CHILD_SLUGS = new Set([
  'instalacion-aire-acondicionado',
  'reparacion-aire-acondicionado',
  'mantenimiento-aire-acondicionado',
  'carga-gas-aire-acondicionado',
  'aire-acondicionado-conductos',
  'instalacion-split',
  'bomba-calor',
  'aire-acondicionado-cassette-techo',
  'preinstalacion-aire-acondicionado',
  'limpieza-conductos-aire-acondicionado',
  'empresa-climatizacion',
])

const CALEFACCION_CHILD_SLUGS = new Set([
  'reparacion-calderas',
  'mantenimiento-calderas',
  'radiadores-calefaccion',
  'instalacion-calefaccion',
  'suelo-radiante',
  'calefaccion-central-comunidades',
  'termostatos-valvulas',
  'aerotermia-calefaccion',
])

const LIMPIEZA_TUBERIAS_CHILD_SLUGS = new Set([
  'inspeccion-camara-tuberias',
  'limpieza-arquetas-colectores',
  'limpieza-bajantes',
  'limpieza-tuberias-comunidades',
  'limpieza-tuberias-empresas',
  'limpieza-alta-presion-camion-cuba',
])

const fontaneroChipMapping: Record<string, number> = {
  'reparacion-fugas': 0,
  desatascos: 1,
  'calentadores-termos': 2,
  instalaciones: 3,
  'sustitucion-tuberias': 3,
  mantenimiento: 3,
}

const electricistaChipMapping: Record<string, number> = {
  'averias-electricas': 0,
  'cuadros-electricos': 1,
  'instalaciones-electricas': 2,
  'iluminacion-led': 3,
  'enchufes-interruptores': 4,
  'urgencias-electricas': 5,
}

const desatascosChipMapping: Record<string, number> = {
  'desatasco-tuberias': 0,
  'desatascar-fregadero': 1,
  'desatascar-wc': 2,
  'desatascar-lavabo-ducha': 3,
  'camion-cuba': 4,
  'limpieza-fosas-septicas': 5,
}

const aireAcondicionadoChipMapping: Record<string, number> = {
  'instalacion-aire-acondicionado': 0,
  'reparacion-aire-acondicionado': 1,
  'mantenimiento-aire-acondicionado': 2,
  'carga-gas-aire-acondicionado': 3,
  'aire-acondicionado-conductos': 4,
  'instalacion-split': 5,
  'bomba-calor': 6,
  'aire-acondicionado-cassette-techo': 7,
  'preinstalacion-aire-acondicionado': 8,
  'limpieza-conductos-aire-acondicionado': 9,
  'empresa-climatizacion': 10,
}

const calefaccionChipMapping: Record<string, number> = {
  'reparacion-calderas': 0,
  'mantenimiento-calderas': 1,
  'radiadores-calefaccion': 2,
  'instalacion-calefaccion': 3,
  'suelo-radiante': 4,
  'calefaccion-central-comunidades': 5,
  'termostatos-valvulas': 6,
  'aerotermia-calefaccion': 7,
}

const limpiezaTuberiasChipMapping: Record<string, number> = {
  'inspeccion-camara-tuberias': 0,
  'limpieza-arquetas-colectores': 1,
  'limpieza-bajantes': 2,
  'limpieza-tuberias-comunidades': 3,
  'limpieza-tuberias-empresas': 4,
  'limpieza-alta-presion-camion-cuba': 5,
}

function getServiceImage(serviceSlug: string) {
  if (serviceSlug === 'electricista') return '/images/electricista/electricista-hero.webp'
  if (serviceSlug === 'aire-acondicionado') return '/images/aire-acondicionado/hero-aire-acondicionado.webp'
  if (serviceSlug === 'calefaccion') return '/images/calefaccion/hero-calefaccion.webp'
  return '/images/fontanero-hero.jpg'
}

function getCityServiceHref(serviceSlug: string, city: City) {
  return city.slug === 'valencia' ? `/${serviceSlug}` : `/${serviceSlug}/${city.slug}`
}

function getTrustCards(isElectricista: boolean, locale: Locale, isAireAcondicionado = false): ServiceHeroV2Props['trustCards'] {
  return [
    {
      icon: Star,
      title: isElectricista ? '4.8/5' : '4.9/5',
      subtitle: locale === 'es' ? '500+ reseñas' : '500+ reviews',
    },
    {
      icon: Clock,
      title: isAireAcondicionado ? 'Cita rápida' : '24/7',
      subtitle: isAireAcondicionado ? (locale === 'es' ? 'según zona' : 'by area') : (locale === 'es' ? '365 días al año' : '365 days/year'),
    },
    {
      icon: ShieldCheck,
      title: locale === 'es' ? 'Profesionales' : 'Certified',
      subtitle: locale === 'es' ? 'certificados' : 'professionals',
    },
  ]
}

function getHighlights(locale: Locale): ServiceHeroV2Props['highlights'] {
  return [
    { label: locale === 'es' ? 'Llegada en 30-60 min' : 'Arrival in 30-60 min' },
    { label: locale === 'es' ? 'Garantía 2 años' : '2 year warranty' },
    { label: locale === 'es' ? 'Seguro RC 600.000€' : 'Insurance 600,000€' },
    { label: locale === 'es' ? 'Presupuesto gratuito' : 'Free quote' },
  ]
}

function getFontaneroChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Droplets,
      label: locale === 'es' ? 'Fugas' : 'Leaks',
      href: '/fontanero/reparacion-fugas',
      active: activeChipIndex === 0,
    },
    {
      icon: Waves,
      label: locale === 'es' ? 'Desatascos' : 'Unclogging',
      href: '/desatascos',
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
  ]
}

function getElectricistaChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Zap,
      label: locale === 'es' ? 'Averías' : 'Faults',
      href: '/electricista/averias-electricas',
      active: activeChipIndex === 0,
    },
    {
      icon: Power,
      label: locale === 'es' ? 'Cuadros' : 'Panels',
      href: '/electricista/cuadros-electricos',
      active: activeChipIndex === 1,
    },
    {
      icon: Cable,
      label: locale === 'es' ? 'Instalaciones' : 'Installations',
      href: '/electricista/instalaciones-electricas',
      active: activeChipIndex === 2,
    },
    {
      icon: Lightbulb,
      label: 'LED',
      href: '/electricista/iluminacion-led',
      active: activeChipIndex === 3,
    },
    {
      icon: Cable,
      label: locale === 'es' ? 'Enchufes' : 'Sockets',
      href: '/electricista/enchufes-interruptores',
      active: activeChipIndex === 4,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Urgencias' : 'Urgent',
      href: '/electricista/urgencias-electricas',
      active: activeChipIndex === 5,
    },
  ]
}

function getDesatascosChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Droplets,
      label: locale === 'es' ? 'Tuberías' : 'Pipes',
      href: '/desatascos/desatasco-tuberias',
      active: activeChipIndex === 0,
    },
    {
      icon: Wrench,
      label: locale === 'es' ? 'Fregadero' : 'Sink',
      href: '/desatascos/desatascar-fregadero',
      active: activeChipIndex === 1,
    },
    {
      icon: Waves,
      label: 'WC',
      href: '/desatascos/desatascar-wc',
      active: activeChipIndex === 2,
    },
    {
      icon: Droplets,
      label: locale === 'es' ? 'Ducha' : 'Shower',
      href: '/desatascos/desatascar-lavabo-ducha',
      active: activeChipIndex === 3,
    },
    {
      icon: Gauge,
      label: locale === 'es' ? 'Cuba' : 'Vacuum truck',
      href: '/desatascos/camion-cuba',
      active: activeChipIndex === 4,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Fosas' : 'Septic tanks',
      href: '/desatascos/limpieza-fosas-septicas',
      active: activeChipIndex === 5,
    },
  ]
}

function getAireAcondicionadoChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Wrench,
      label: locale === 'es' ? 'Instalación' : 'Installation',
      href: '/aire-acondicionado/instalacion-aire-acondicionado',
      active: activeChipIndex === 0,
    },
    {
      icon: Fan,
      label: locale === 'es' ? 'Reparación' : 'Repair',
      href: '/aire-acondicionado/reparacion-aire-acondicionado',
      active: activeChipIndex === 1,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Mantenimiento' : 'Maintenance',
      href: '/aire-acondicionado/mantenimiento-aire-acondicionado',
      active: activeChipIndex === 2,
    },
    {
      icon: Gauge,
      label: locale === 'es' ? 'Gas' : 'Gas',
      href: '/aire-acondicionado/carga-gas-aire-acondicionado',
      active: activeChipIndex === 3,
    },
    {
      icon: Snowflake,
      label: locale === 'es' ? 'Conductos' : 'Ducts',
      href: '/aire-acondicionado/aire-acondicionado-conductos',
      active: activeChipIndex === 4,
    },
    {
      icon: Flame,
      label: 'Split',
      href: '/aire-acondicionado/instalacion-split',
      active: activeChipIndex === 5,
    },
    {
      icon: Flame,
      label: locale === 'es' ? 'Bomba calor' : 'Heat pump',
      href: '/aire-acondicionado/bomba-calor',
      active: activeChipIndex === 6,
    },
    {
      icon: Fan,
      label: 'Cassette',
      href: '/aire-acondicionado/aire-acondicionado-cassette-techo',
      active: activeChipIndex === 7,
    },
    {
      icon: Search,
      label: locale === 'es' ? 'Preinstalación' : 'Preinstall',
      href: '/aire-acondicionado/preinstalacion-aire-acondicionado',
      active: activeChipIndex === 8,
    },
    {
      icon: Snowflake,
      label: locale === 'es' ? 'Limpieza conductos' : 'Duct cleaning',
      href: '/aire-acondicionado/limpieza-conductos-aire-acondicionado',
      active: activeChipIndex === 9,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Empresas' : 'Companies',
      href: '/aire-acondicionado/empresa-climatizacion',
      active: activeChipIndex === 10,
    },
  ]
}

function getCalefaccionChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Wrench,
      label: locale === 'es' ? 'Calderas' : 'Boilers',
      href: '/calefaccion/reparacion-calderas',
      active: activeChipIndex === 0,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Mantenimiento' : 'Maintenance',
      href: '/calefaccion/mantenimiento-calderas',
      active: activeChipIndex === 1,
    },
    {
      icon: Gauge,
      label: locale === 'es' ? 'Radiadores' : 'Radiators',
      href: '/calefaccion/radiadores-calefaccion',
      active: activeChipIndex === 2,
    },
    {
      icon: Flame,
      label: locale === 'es' ? 'Instalacion' : 'Installation',
      href: '/calefaccion/instalacion-calefaccion',
      active: activeChipIndex === 3,
    },
    {
      icon: Flame,
      label: locale === 'es' ? 'Suelo radiante' : 'Underfloor',
      href: '/calefaccion/suelo-radiante',
      active: activeChipIndex === 4,
    },
    {
      icon: Gauge,
      label: locale === 'es' ? 'Central' : 'Central',
      href: '/calefaccion/calefaccion-central-comunidades',
      active: activeChipIndex === 5,
    },
    {
      icon: Search,
      label: locale === 'es' ? 'Termostatos' : 'Thermostats',
      href: '/calefaccion/termostatos-valvulas',
      active: activeChipIndex === 6,
    },
    {
      icon: Flame,
      label: locale === 'es' ? 'Aerotermia' : 'Aerothermal',
      href: '/calefaccion/aerotermia-calefaccion',
      active: activeChipIndex === 7,
    },
  ]
}

function getLimpiezaTuberiasChips(locale: Locale, activeChipIndex = -1): ServiceHeroV2Props['quickChips'] {
  return [
    {
      icon: Search,
      label: locale === 'es' ? 'Camara' : 'Camera',
      href: '/limpieza-tuberias/inspeccion-camara-tuberias',
      active: activeChipIndex === 0,
    },
    {
      icon: Waves,
      label: locale === 'es' ? 'Arquetas' : 'Drain boxes',
      href: '/limpieza-tuberias/limpieza-arquetas-colectores',
      active: activeChipIndex === 1,
    },
    {
      icon: Droplets,
      label: locale === 'es' ? 'Bajantes' : 'Downpipes',
      href: '/limpieza-tuberias/limpieza-bajantes',
      active: activeChipIndex === 2,
    },
    {
      icon: ShieldCheck,
      label: locale === 'es' ? 'Comunidades' : 'Communities',
      href: '/limpieza-tuberias/limpieza-tuberias-comunidades',
      active: activeChipIndex === 3,
    },
    {
      icon: Wrench,
      label: locale === 'es' ? 'Empresas' : 'Companies',
      href: '/limpieza-tuberias/limpieza-tuberias-empresas',
      active: activeChipIndex === 4,
    },
    {
      icon: Gauge,
      label: locale === 'es' ? 'Alta presion' : 'High pressure',
      href: '/limpieza-tuberias/limpieza-alta-presion-camion-cuba',
      active: activeChipIndex === 5,
    },
  ]
}

export function serviceCityToHeroProps(
  service: Service,
  city: City,
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  const isElectricista = service.slug === 'electricista'
  const isDesatascos = service.slug === 'desatascos'
  const isAireAcondicionado = service.slug === 'aire-acondicionado'
  const isCalefaccion = service.slug === 'calefaccion'
  const isLimpiezaTuberias = service.slug === 'limpieza-tuberias'
  const titleCity = locale === 'es'
    ? isFontanero
      ? `Fontanero en ${city.name} 24 Horas`
      : isElectricista
        ? `Electricista en ${city.name}`
        : isDesatascos
          ? `Desatascos en ${city.name} 24 Horas`
          : isAireAcondicionado
            ? `Aire Acondicionado en ${city.name}`
          : isCalefaccion
            ? `Calefaccion en ${city.name}`
          : isLimpiezaTuberias
            ? `Limpieza de Tuberias en ${city.name}`
          : `${service.name} en ${city.name}`
    : `${service.name} in ${city.name}`

  return {
    eyebrow: locale === 'es' ? `Servicio 24/7 en ${city.name}` : `24/7 Service in ${city.name}`,
    title: titleCity,
    titleHighlight: undefined,
    subtitle: isFontanero
      ? `Fontaneros profesionales en ${city.name}. Llegamos en 30-60 minutos para resolver fugas, desatascos, termos e instalaciones con garantía.`
      : isElectricista
        ? `Electricistas profesionales en ${city.name}. Llegamos en 30-60 minutos para resolver averías eléctricas, cuadros e instalaciones con garantía.`
        : isDesatascos
          ? `Empresa de desatascos en ${city.name}. Atendemos tuberías, WC, fregaderos, arquetas y camión cuba con presupuesto previo.`
          : isAireAcondicionado
            ? `Servicio de aire acondicionado en ${city.name}: instalación, reparación, mantenimiento, carga de gas y conductos con presupuesto previo.`
          : isCalefaccion
            ? `Servicio de calefaccion en ${city.name}: calderas, radiadores, mantenimiento, instalacion y sistemas centrales con presupuesto previo.`
          : isLimpiezaTuberias
            ? `Limpieza profesional de tuberias en ${city.name}: bajantes, arquetas, colectores, camara, alta presion y mantenimiento preventivo.`
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
    trustCards: getTrustCards(isElectricista, locale, isAireAcondicionado),
    quickChips: isFontanero ? getFontaneroChips(locale) : isElectricista ? getElectricistaChips(locale) : isDesatascos ? getDesatascosChips(locale) : isAireAcondicionado ? getAireAcondicionadoChips(locale) : isCalefaccion ? getCalefaccionChips(locale) : isLimpiezaTuberias ? getLimpiezaTuberiasChips(locale) : [],
    highlights: getHighlights(locale),
    image: {
      src: getServiceImage(service.slug),
      alt: locale === 'es'
        ? `${service.name} profesional en ${city.name} - Servicio 24/7`
        : `Professional ${service.name} in ${city.name} - 24/7 Service`,
    },
  }
}

export function cityHubToHeroProps(
  city: City,
  locale: Locale,
  content: { headline: string; intro: string }
): ServiceHeroV2Props {
  return {
    eyebrow: locale === 'es' ? `Servicios 24/7 en ${city.name}` : `24/7 services in ${city.name}`,
    title: content.headline,
    titleHighlight: undefined,
    subtitle: content.intro,
    phoneCta: {
      label: locale === 'es' ? 'Llamar ahora' : 'Call now',
      sublabel: '642 310 813',
      href: getPhoneHref(),
    },
    whatsappCta: {
      label: 'WhatsApp',
      sublabel: locale === 'es' ? 'Respuesta en 2 min' : 'Reply in 2 min',
      href: getWhatsAppHref(
        locale === 'es'
          ? `Hola, necesito ayuda con una reparacion del hogar en ${city.name}. ¿Pueden ayudarme?`
          : `Hello, I need help with a home repair in ${city.name}. Can you help me?`
      ),
    },
    trustCards: [
      {
        icon: Star,
        title: '4.8/5',
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
        label: 'Fontaneria',
        href: getCityServiceHref('fontanero', city),
      },
      {
        icon: Zap,
        label: 'Electricidad',
        href: getCityServiceHref('electricista', city),
      },
      {
        icon: Waves,
        label: 'Desatascos',
        href: getCityServiceHref('desatascos', city),
      },
      {
        icon: Snowflake,
        label: 'Clima',
        href: getCityServiceHref('aire-acondicionado', city),
      },
    ],
    highlights: getHighlights(locale),
    image: {
      src: '/images/homepage/reparar24-branded-technician-van.webp',
      alt: locale === 'es'
        ? `Tecnico de Reparar24 con vehiculo rotulado para servicios en ${city.name}`
        : `Reparar24 technician with branded van for services in ${city.name}`,
    },
  }
}

export function serviceToHeroProps(
  service: Service,
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  const isElectricista = service.slug === 'electricista'
  const isDesatascos = service.slug === 'desatascos'
  const isAireAcondicionado = service.slug === 'aire-acondicionado'
  const isCalefaccion = service.slug === 'calefaccion'
  const isLimpiezaTuberias = service.slug === 'limpieza-tuberias'

  return {
    eyebrow: locale === 'es'
      ? isFontanero ? 'Fontanero en Valencia 24h' : isElectricista ? 'Servicio 24/7 en Valencia' : isDesatascos ? 'Empresa de desatascos 24h' : isAireAcondicionado ? 'Servicio técnico de climatización' : isCalefaccion ? 'Servicio tecnico de calefaccion' : isLimpiezaTuberias ? 'Limpieza profesional de tuberias' : 'Servicio Profesional 24h'
      : '24/7 Professional Service',
    title: isFontanero
      ? 'Fontanero 24 Horas Valencia'
      : isElectricista
        ? 'Electricista 24 Horas Valencia'
        : isDesatascos
          ? 'Desatascos 24 Horas'
          : isAireAcondicionado
            ? 'Aire Acondicionado'
          : isCalefaccion
            ? 'Calefaccion y Calderas'
          : isLimpiezaTuberias
            ? 'Limpieza de Tuberias'
          : `${service.name} 24 Horas`,
    titleHighlight: undefined,
    subtitle: isFontanero
      ? 'Fontaneros profesionales disponibles 24h en Valencia todos los días. Reparación urgente de fugas, desatascos, termos eléctricos e instalaciones de fontanería. Llegamos en 30-60 minutos con presupuesto previo.'
      : isElectricista
        ? 'Electricistas profesionales en Valencia. Llegamos en 30-60 minutos para resolver averías eléctricas, cuadros, instalaciones, iluminación LED y enchufes con garantía.'
        : isDesatascos
          ? 'Empresa de desatascos para tuberías, WC, fregaderos, arquetas, bajantes y camión cuba. Atención urgente 24h con diagnóstico y presupuesto antes de empezar.'
          : isAireAcondicionado
            ? 'Instalación, reparación y mantenimiento de aire acondicionado para viviendas, locales y comunidades. Revisamos equipos split, conductos, carga de gas y averías con presupuesto previo.'
          : isCalefaccion
            ? 'Reparacion de calderas, mantenimiento, radiadores, instalacion de calefaccion, suelo radiante y sistemas centrales con diagnostico y presupuesto previo.'
          : isLimpiezaTuberias
            ? 'Limpieza profesional de tuberias, bajantes, arquetas, colectores y redes de saneamiento para comunidades, empresas y locales con presupuesto previo.'
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
    trustCards: getTrustCards(isElectricista, locale, isAireAcondicionado),
    quickChips: isFontanero ? getFontaneroChips(locale) : isElectricista ? getElectricistaChips(locale) : isDesatascos ? getDesatascosChips(locale) : isAireAcondicionado ? getAireAcondicionadoChips(locale) : isCalefaccion ? getCalefaccionChips(locale) : isLimpiezaTuberias ? getLimpiezaTuberiasChips(locale) : [],
    highlights: getHighlights(locale),
    image: {
      src: getServiceImage(service.slug),
      alt: locale === 'es'
        ? `${service.name} profesional - Servicio 24/7`
        : `Professional ${service.name} - 24/7 Service`,
    },
  }
}

export function serviceDistrictToHeroProps(
  service: Service,
  city: City,
  district: { name: string; slug: string },
  locale: Locale
): ServiceHeroV2Props {
  const isFontanero = service.slug === 'fontanero'
  const isElectricista = service.slug === 'electricista'
  const isDesatascos = service.slug === 'desatascos'
  const isAireAcondicionado = service.slug === 'aire-acondicionado'
  const isCalefaccion = service.slug === 'calefaccion'
  const isLimpiezaTuberias = service.slug === 'limpieza-tuberias'
  const titleDistrict = locale === 'es'
      ? isFontanero
      ? `Fontanero en ${district.name}, ${city.name} 24 Horas`
      : isElectricista
        ? `Electricista en ${district.name}, ${city.name}`
        : isDesatascos
          ? `Desatascos en ${district.name}, ${city.name}`
          : isAireAcondicionado
            ? `Aire Acondicionado en ${district.name}, ${city.name}`
          : isCalefaccion
            ? `Calefaccion en ${district.name}, ${city.name}`
          : isLimpiezaTuberias
            ? `Limpieza de Tuberias en ${district.name}, ${city.name}`
          : `${service.name} en ${district.name}, ${city.name}`
    : `${service.name} in ${district.name}, ${city.name}`

  return {
    eyebrow: locale === 'es' ? `Servicio 24/7 en ${district.name}` : `24/7 Service in ${district.name}`,
    title: titleDistrict,
    titleHighlight: undefined,
    subtitle: isFontanero
      ? `Fontaneros profesionales en ${district.name}. Llegamos en 30-60 minutos para resolver fugas, desatascos, termos e instalaciones con garantía. Atención inmediata en tu barrio.`
      : isElectricista
        ? `Electricistas profesionales en ${district.name}. Llegamos en 30-60 minutos para resolver averías eléctricas, cuadros e instalaciones con garantía. Atención inmediata en tu barrio.`
        : isDesatascos
          ? `Desatascos profesionales en ${district.name}. Atendemos WC, fregaderos, tuberías, arquetas y bajantes con presupuesto previo.`
          : isAireAcondicionado
            ? `Servicio de aire acondicionado en ${district.name}: instalación, reparación, mantenimiento y carga de gas con presupuesto previo.`
          : isCalefaccion
            ? `Servicio de calefaccion en ${district.name}: calderas, radiadores, mantenimiento e instalacion con presupuesto previo.`
          : isLimpiezaTuberias
            ? `Limpieza profesional de tuberias en ${district.name}: bajantes, arquetas, colectores, camara y alta presion con presupuesto previo.`
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
    trustCards: getTrustCards(isElectricista, locale, isAireAcondicionado),
    quickChips: isFontanero ? getFontaneroChips(locale) : isElectricista ? getElectricistaChips(locale) : isDesatascos ? getDesatascosChips(locale) : isAireAcondicionado ? getAireAcondicionadoChips(locale) : isCalefaccion ? getCalefaccionChips(locale) : isLimpiezaTuberias ? getLimpiezaTuberiasChips(locale) : [],
    highlights: getHighlights(locale),
    image: {
      src: getServiceImage(service.slug),
      alt: locale === 'es'
        ? `${service.name} profesional en ${district.name}, ${city.name} - Servicio 24/7`
        : `Professional ${service.name} in ${district.name}, ${city.name} - 24/7 Service`,
    },
  }
}

export function childServiceToHeroProps(
  childServiceName: string,
  childServiceSlug: string,
  childServiceDescription: string,
  locale: Locale,
  parentServiceSlug?: 'fontanero' | 'electricista' | 'desatascos' | 'aire-acondicionado' | 'calefaccion' | 'limpieza-tuberias'
): ServiceHeroV2Props {
  const isElectricista = ELECTRICISTA_CHILD_SLUGS.has(childServiceSlug)
  const isDesatascos = DESATASCOS_CHILD_SLUGS.has(childServiceSlug)
  const isAireAcondicionado = AIRE_ACONDICIONADO_CHILD_SLUGS.has(childServiceSlug)
  const isCalefaccion = CALEFACCION_CHILD_SLUGS.has(childServiceSlug)
  const isLimpiezaTuberias = LIMPIEZA_TUBERIAS_CHILD_SLUGS.has(childServiceSlug)
  const serviceSlug = parentServiceSlug || (isElectricista ? 'electricista' : isDesatascos ? 'desatascos' : isAireAcondicionado ? 'aire-acondicionado' : isCalefaccion ? 'calefaccion' : isLimpiezaTuberias ? 'limpieza-tuberias' : 'fontanero')
  const activeChipIndex = serviceSlug === 'electricista'
    ? electricistaChipMapping[childServiceSlug] ?? -1
    : serviceSlug === 'desatascos'
      ? desatascosChipMapping[childServiceSlug] ?? -1
      : serviceSlug === 'aire-acondicionado'
        ? aireAcondicionadoChipMapping[childServiceSlug] ?? -1
        : serviceSlug === 'calefaccion'
          ? calefaccionChipMapping[childServiceSlug] ?? -1
        : serviceSlug === 'limpieza-tuberias'
          ? limpiezaTuberiasChipMapping[childServiceSlug] ?? -1
        : fontaneroChipMapping[childServiceSlug] ?? -1
  const needsCompactLayout = childServiceName.length > 42 || childServiceSlug === 'mantenimiento' || childServiceSlug === 'sustitucion-tuberias'

  return {
    eyebrow: locale === 'es'
      ? `Especialistas en ${childServiceName}`
      : `Specialists in ${childServiceName}`,
    title: childServiceName,
    titleHighlight: undefined,
    subtitle: childServiceDescription,
    phoneCta: {
      label: locale === 'es' ? 'Llamar ahora' : 'Call now',
      sublabel: serviceSlug === 'electricista' ? 'Desde 59€' : serviceSlug === 'desatascos' ? 'Desde 69€' : serviceSlug === 'aire-acondicionado' ? 'Desde 79€' : serviceSlug === 'calefaccion' ? 'Desde 59€' : serviceSlug === 'limpieza-tuberias' ? 'Desde 150€' : 'Desde 49€',
      href: getPhoneHref(serviceSlug),
    },
    whatsappCta: {
      label: 'WhatsApp',
      sublabel: locale === 'es' ? 'Respuesta en 2 min' : 'Reply in 2 min',
      href: getWhatsAppHref(
        locale === 'es'
          ? `Hola, necesito ${childServiceName.toLowerCase()}. ¿Pueden ayudarme?`
          : `Hello, I need ${childServiceName.toLowerCase()}. Can you help me?`,
        serviceSlug
      ),
    },
    trustCards: getTrustCards(isElectricista, locale, serviceSlug === 'aire-acondicionado'),
    quickChips: serviceSlug === 'electricista'
      ? getElectricistaChips(locale, activeChipIndex)
      : serviceSlug === 'desatascos'
        ? getDesatascosChips(locale, activeChipIndex)
        : serviceSlug === 'aire-acondicionado'
          ? getAireAcondicionadoChips(locale, activeChipIndex)
          : serviceSlug === 'calefaccion'
            ? getCalefaccionChips(locale, activeChipIndex)
          : serviceSlug === 'limpieza-tuberias'
            ? getLimpiezaTuberiasChips(locale, activeChipIndex)
          : getFontaneroChips(locale, activeChipIndex),
    highlights: getHighlights(locale),
    image: {
      src: getServiceImage(serviceSlug),
      alt: locale === 'es'
        ? `${childServiceName} profesional - Servicio 24/7`
        : `Professional ${childServiceName} - 24/7 Service`,
    },
    compactImage: needsCompactLayout,
  }
}
