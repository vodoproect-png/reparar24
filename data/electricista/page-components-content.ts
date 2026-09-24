/**
 * Electricista Page - Component Props
 * URL: /electricista
 * 
 * All production content for Design System components.
 * Components are pure UI renderers.
 * Content lives here, not in component defaults.
 * 
 * Created: 2026-06-12 - Foundation Architecture Phase
 */

import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { ServicesGridV1Props } from '@/components/ds/ServicesGridV1'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { RelatedServicesV1Props } from '@/components/ds/RelatedServicesV1'
import {
  Zap,
  Lightbulb,
  Power,
  Cable,
  ShieldAlert,
  Clock,
  ShieldCheck,
  Award,
  CreditCard,
} from 'lucide-react'

export const electricistaServicesGridContent: ServicesGridV1Props = {
  badge: "Servicios Profesionales",
  title: "Nuestros Servicios de Electricidad",
  subtitle: "Soluciones profesionales para tu hogar o negocio. Trabajos con garantia y atencion personalizada.",
  services: [
    {
      icon: ShieldAlert,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      title: "Urgencias Electricas",
      description: "Electricistas disponibles 24h para cortes de luz, cortocircuitos y averias urgentes.",
      href: "/electricista/urgencias-electricas",
    },
    {
      icon: Lightbulb,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Instalaciones Electricas",
      description: "Instalacion electrica en viviendas, locales y reformas con materiales homologados.",
      href: "/electricista/instalaciones-electricas",
    },
    {
      icon: Power,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Cuadros Electricos",
      description: "Reparacion, sustitucion y ampliacion de cuadros electricos, diferenciales y magnetotermicos.",
      href: "/electricista/cuadros-electricos",
    },
    {
      icon: Lightbulb,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      title: "Iluminacion LED",
      description: "Instalacion de iluminacion LED interior, exterior, jardines, cocinas y comunidades.",
      href: "/electricista/iluminacion-led",
    },
    {
      icon: Cable,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      title: "Enchufes e Interruptores",
      description: "Instalacion y sustitucion de enchufes, interruptores, puntos de luz y mecanismos electricos.",
      href: "/electricista/enchufes-interruptores",
    },
    {
      icon: Zap,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Reparacion de Averias Electricas",
      description: "Diagnostico y reparacion de fallos electricos, plomos que saltan y problemas de corriente.",
      href: "/electricista/averias-electricas",
    },
  ],
  trustItems: [
    {
      icon: Clock,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Llegada en 30-60 min",
      subtitle: "Servicio urgente 24/7",
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Garantia 6 meses",
      subtitle: "En todos nuestros trabajos",
    },
    {
      icon: Award,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "Profesionales certificados",
      subtitle: "Tecnicos cualificados",
    },
    {
      icon: CreditCard,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      title: "Presupuesto gratis",
      subtitle: "Sin compromiso",
    },
  ],
}

export const electricistaServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: "Servicios electricos en Valencia",
  title: "Servicios de electricista para vivienda, local y comunidad",
  subtitle: "Organizamos las urgencias, averias, instalaciones y trabajos electricos habituales para que encuentres rapido el servicio que necesitas.",
  phoneHref: "tel:+34642310813",
  phoneLabel: "642 310 813",
  whatsappHref: "https://wa.me/34642310813?text=Hola%2C%20necesito%20un%20electricista%20en%20Valencia.%20%C2%BFPueden%20ayudarme%3F",
  whatsappLabel: "WhatsApp",
  searchPlaceholder: "Buscar servicio electrico",
  trustItems: [
    { icon: "Clock", label: "Atencion 24h" },
    { icon: "ShieldCheck", label: "Garantia" },
    { icon: "Award", label: "Tecnicos cualificados" },
    { icon: "CreditCard", label: "Presupuesto claro" },
  ],
  groups: [
    {
      id: "urgencias-averias",
      label: "Urgencias y averias",
      icon: "ShieldAlert",
      services: [
        {
          icon: "ShieldAlert",
          title: "Urgencias Electricas",
          description: "Electricistas disponibles 24h para cortes de luz, cortocircuitos y averias urgentes.",
          href: "/electricista/urgencias-electricas",
          featured: true,
        },
        {
          icon: "Zap",
          title: "Reparacion de Averias Electricas",
          description: "Diagnostico y reparacion de fallos electricos, plomos que saltan y problemas de corriente.",
          href: "/electricista/averias-electricas",
          featured: true,
        },
      ],
    },
    {
      id: "instalaciones",
      label: "Instalaciones",
      icon: "Lightbulb",
      services: [
        {
          icon: "Lightbulb",
          title: "Instalaciones Electricas",
          description: "Instalacion electrica en viviendas, locales y reformas con materiales homologados.",
          href: "/electricista/instalaciones-electricas",
          featured: true,
        },
        {
          icon: "Power",
          title: "Cuadros Electricos",
          description: "Reparacion, sustitucion y ampliacion de cuadros electricos, diferenciales y magnetotermicos.",
          href: "/electricista/cuadros-electricos",
        },
        {
          icon: "Cable",
          title: "Enchufes e Interruptores",
          description: "Instalacion y sustitucion de enchufes, interruptores, puntos de luz y mecanismos electricos.",
          href: "/electricista/enchufes-interruptores",
        },
        {
          icon: "ShieldCheck",
          title: "Puesta a Tierra",
          description: "Revision y mejora de la toma de tierra para instalaciones electricas mas seguras.",
          status: "consult",
        },
      ],
    },
    {
      id: "iluminacion-trabajos",
      label: "Iluminacion y trabajos pequenos",
      icon: "Wrench",
      services: [
        {
          icon: "Lightbulb",
          title: "Iluminacion LED",
          description: "Instalacion de iluminacion LED interior, exterior, jardines, cocinas y comunidades.",
          href: "/electricista/iluminacion-led",
        },
        {
          icon: "Wrench",
          title: "Pequenos Trabajos Electricos",
          description: "Cambio de lamparas, sustitucion de enchufes, puntos de luz y reparaciones electricas rapidas.",
          href: "/electricista/pequenos-trabajos-electricos",
        },
      ],
    },
    {
      id: "especializadas",
      label: "Especializadas",
      icon: "Activity",
      services: [
        {
          icon: "Car",
          title: "Cargador de Coche Electrico",
          description: "Instalacion de punto de recarga para vehiculo electrico en vivienda, garaje o comunidad.",
          href: "/electricista/cargador-coche-electrico",
        },
        {
          icon: "Wifi",
          title: "Domotica",
          description: "Automatizacion de iluminacion, persianas, control electrico y sistemas inteligentes.",
          href: "/electricista/domotica",
        },
        {
          icon: "Tv",
          title: "Videoportero y Portero Automatico",
          description: "Instalacion y sustitucion de porteros automaticos, telefonillos y videoporteros.",
          status: "consult",
        },
      ],
    },
    {
      id: "mantenimiento",
      label: "Mantenimiento",
      icon: "ClipboardCheck",
      services: [
        {
          icon: "ClipboardCheck",
          title: "Mantenimiento Electrico",
          description: "Mantenimiento preventivo y correctivo para viviendas, locales y comunidades.",
          href: "/electricista/mantenimiento-electrico",
        },
        {
          icon: "ShieldCheck",
          title: "Revision Electrica",
          description: "Comprobacion del cuadro, cableado, protecciones, enchufes y puntos de luz.",
          href: "/electricista/revision-electrica",
        },
      ],
    },
  ],
}

export const electricistaTrustSignalsContent: TrustSignalsV1Props = {
  badge: "Ventajas Reparar24",
  title: "?Por Que Elegir Nuestro Electricista?",
  subtitle: "Atencion rapida, trabajo seguro y presupuesto claro para urgencias, averias e instalaciones electricas.",
  stats: [
    {
      icon: "Clock",
      color: "blue",
      headline: "Atencion 24h",
      description: "Electricistas disponibles todos los dias para urgencias, cortes de luz y averias electricas.",
    },
    {
      icon: "Clock",
      color: "green",
      headline: "Llegada rapida",
      description: "Desplazamiento rapido para servicios urgentes segun disponibilidad en tu zona.",
    },
    {
      icon: "ShieldCheck",
      color: "orange",
      headline: "Trabajo seguro",
      description: "Reparaciones e instalaciones realizadas con materiales electricos homologados.",
    },
    {
      icon: "Award",
      color: "purple",
      headline: "Garantia profesional",
      description: "Todos los trabajos se realizan con garantia y presupuesto claro antes de empezar.",
    },
  ],
  bottomItems: [
    { icon: "UserCheck", label: "Profesionales certificados" },
    { icon: "ShieldCheck", label: "Materiales homologados" },
    { icon: "Tag", label: "Presupuesto gratuito" },
  ],
}

// ProcessSteps props interface
interface ProcessStep {
  number: string
  color: "blue" | "green" | "orange" | "purple"
  title: string
  description: string
  iconSrc: string
}

interface TrustItem {
  icon: "Wrench" | "ShieldCheck" | "Clock" | "UserRound" | "FileText"
  title: string
  description: string
}

interface ProcessStepsV3Props {
  badge?: string
  title?: string
  subtitle?: string
  steps?: ProcessStep[]
  trustItems?: TrustItem[]
}

// PricingSection props interface
type PriceColor = "blue" | "orange" | "green" | "red"

interface PricingPlan {
  title: string
  price: string
  color: PriceColor
  iconSrc: string
  features: string[]
  featured?: boolean
}

interface PricingTrustItem {
  icon: "ShieldCheck" | "FileText" | "XCircle"
  title: string
  description: string
}

interface PricingSectionV1Props {
  badge?: string
  title?: string
  subtitle?: string
  pricingPlans?: PricingPlan[]
  featuredBadgeText?: string
  fromLabel?: string
  trustItems?: PricingTrustItem[]
  disclaimer?: string
}

export const electricistaProcessStepsContent: ProcessStepsV3Props = {
  badge: "Proceso transparente",
  title: "?Como Trabajamos?",
  subtitle: "Proceso transparente en 4 pasos. Sin complicaciones, sin sorpresas.",
  steps: [
    {
      number: "01",
      color: "blue",
      title: "Contactas con nosotros",
      description: "Llamanos o escribenos por WhatsApp y cuentanos si tienes un corte de luz, cortocircuito, averia o instalacion electrica pendiente.",
      iconSrc: "/icons/process-3d-01-contacto.webp",
    },
    {
      number: "02",
      color: "green",
      title: "Diagnostico electrico",
      description: "Un electricista revisa el cuadro, diferencial, enchufes, cableado o punto afectado para detectar el origen del problema.",
      iconSrc: "/icons/process-3d-02-valoracion.webp",
    },
    {
      number: "03",
      color: "orange",
      title: "Presupuesto claro",
      description: "Te explicamos la solucion y el precio antes de empezar, sin costes ocultos ni trabajos innecesarios.",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
    },
    {
      number: "04",
      color: "purple",
      title: "Reparacion segura",
      description: "Realizamos el trabajo con materiales homologados, dejamos la instalacion funcionando y aplicamos garantia.",
      iconSrc: "/icons/process-3d-04-garantia.webp",
    },
  ],
  trustItems: [
    {
      icon: "ShieldCheck",
      title: "Diagnostico profesional",
      description: "Identificamos el origen del problema",
    },
    {
      icon: "Wrench",
      title: "Materiales homologados",
      description: "Cumplimiento normativa vigente",
    },
    {
      icon: "ShieldCheck",
      title: "Trabajo seguro",
      description: "Instalacion electrica protegida",
    },
    {
      icon: "FileText",
      title: "Garantia incluida",
      description: "En todos nuestros trabajos",
    },
  ],
}

export const electricistaPricingSectionContent: PricingSectionV1Props = {
  badge: "Precios transparentes",
  title: "Precios Transparentes",
  subtitle: "Sin sorpresas ni costes ocultos",
  pricingPlans: [
    {
      title: "Reparacion de Averias",
      price: "59€",
      color: "blue",
      iconSrc: "/icons/pricing-3d-01-diagnostico.webp",
      features: ["Diagnostico profesional", "Reparacion segura", "Materiales homologados", "Garantia incluida"],
    },
    {
      title: "Urgencias Electricas 24h",
      price: "89€",
      color: "red",
      iconSrc: "/icons/pricing-3d-04-urgencias.webp",
      features: ["Servicio 24/7", "Llegada rapida", "Atencion prioritaria", "Presupuesto antes de reparar"],
      featured: true,
    },
    {
      title: "Cuadros Electricos",
      price: "120€",
      color: "green",
      iconSrc: "/icons/process-3d-02-valoracion.webp",
      features: ["Diferenciales y automaticos", "Proteccion actualizada", "Cumplimiento normativa", "Trabajo garantizado"],
    },
    {
      title: "Instalaciones Electricas",
      price: "150€",
      color: "orange",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
      features: ["Viviendas y locales", "Cableado y puntos de luz", "Material certificado", "Instalacion segura"],
    },
    {
      title: "Enchufes e Interruptores",
      price: "45€",
      color: "blue",
      iconSrc: "/icons/pricing-3d-01-diagnostico.webp",
      features: ["Enchufes e interruptores", "Nuevos puntos electricos", "Sustitucion de mecanismos", "Acabado limpio"],
    },
    {
      title: "Iluminacion LED",
      price: "60€",
      color: "orange",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
      features: ["Iluminacion interior", "Iluminacion exterior", "Tiras LED y focos", "Ahorro energetico"],
    },
  ],
  featuredBadgeText: "Mas solicitada",
  fromLabel: "Desde",
  trustItems: [
    { icon: "ShieldCheck", title: "Presupuesto cerrado", description: "antes de empezar" },
    { icon: "ShieldCheck", title: "Garantia", description: "6 meses" },
    { icon: "XCircle", title: "Sin costes ocultos", description: "ni suplementos" },
  ],
  disclaimer: "Precios orientativos. Cada caso es unico y se presupuestara segun la evaluacion.",
}

// OpinionesClientesV1 props interface
interface Review {
  name: string
  quote: string
  verified?: boolean
}

interface OpinionesClientesV1Props {
  rating?: string
  reviewCount?: string
  badge?: string
  title?: string
  subtitle?: string
  reviews?: Review[]
  trustItems?: Array<{
    icon?: "Users" | "ShieldCheck" | "MapPin"
    node?: "google"
    title: string
    description: string
    showStars?: boolean
  }>
  verifiedLabel?: string
}

export const electricistaOpinionesClientesContent: OpinionesClientesV1Props = {
  rating: "4.8/5",
  title: "Lo Que Dicen Nuestros Clientes",
  subtitle: "Opiniones reales de clientes satisfechos con nuestro servicio electrico",
  reviews: [
    {
      name: "Carlos M.",
      quote: "Se fue la luz por la noche y necesitabamos un electricista urgente. Llegaron rapido, localizaron el fallo en el cuadro y dejaron todo funcionando con seguridad.",
      verified: true,
    },
    {
      name: "Laura G.",
      quote: "Nos cambiaron el cuadro electrico antiguo y revisaron los diferenciales. Trabajo limpio, explicacion clara y presupuesto cerrado antes de empezar.",
      verified: true,
    },
    {
      name: "Miguel R.",
      quote: "Contratamos una instalacion electrica para una reforma. Fueron puntuales, usaron materiales homologados y dejaron todos los puntos funcionando correctamente.",
      verified: true,
    },
    {
      name: "Ana P.",
      quote: "Instalaron nuevos enchufes y luces LED en varias habitaciones. El acabado quedo muy bien y nos explicaron como optimizar el consumo.",
      verified: true,
    },
  ],
  trustItems: [
    { icon: "Users", title: "4.8/5", description: "Opiniones de clientes", showStars: true },
    { icon: "Users", title: "2.500+", description: "Clientes satisfechos" },
    { icon: "ShieldCheck", title: "24/7", description: "Disponibles" },
    { icon: "MapPin", title: "Valencia", description: "y alrededores" },
  ],
  verifiedLabel: "Cliente atendido",
}

export const electricistaRelatedServicesContent: RelatedServicesV1Props = {
  badge: "Servicios Relacionados",
  title: "Otros Servicios Que Ofrecemos",
  description: "Servicios complementarios para resolver todas tus necesidades electricas.",
  cards: [
    {
      icon: "Wrench",
      title: "Reparacion de averias",
      description: "Diagnostico y solucion de fallos electricos urgentes.",
      color: "blue",
      bullets: [
        "Cortocircuitos y saltos de diferencial",
        "Apagones parciales en vivienda",
        "Cables seccionados o danados",
        "Fallos en cuadro electrico",
      ],
    },
    {
      icon: "ShieldCheck",
      title: "Cuadros electricos",
      description: "Actualizacion con protecciones modernas normativa REBT.",
      color: "cyan",
      bullets: [
        "Diferenciales de 30mA",
        "Magnetotermicos por circuito",
        "Protector de sobretensiones",
        "Protecciones electricas actualizadas",
      ],
    },
    {
      icon: "Waves",
      title: "Recableado completo",
      description: "Sustitucion de instalaciones antiguas por cobre moderno.",
      color: "orange",
      bullets: [
        "Eliminacion de aluminio antiguo",
        "Cable de cobre homologado",
        "Cumplimiento normativa actual",
        "Actualizacion completa segura",
      ],
    },
    {
      icon: "Flame",
      title: "Instalaciones",
      description: "Instalacion profesional de enchufes, luces e interruptores.",
      color: "green",
      bullets: [
        "Enchufes y tomas de corriente",
        "Iluminacion LED eficiente",
        "Interruptores y conmutadores",
        "Puntos de luz adicionales",
      ],
    },
  ],
  ctaTitle: "?No estas seguro de que servicio necesitas?",
  ctaText: "Cuentanos tu problema electrico y te asesoramos sin compromiso.",
  cta: { whatsappLabel: "WhatsApp", callLabel: "Llamar ahora  642 310 813" },
  trustBadges: [
    { icon: "ShieldCheck", title: "Profesionales", subtitle: "certificados oficialmente" },
    { icon: "Clock", title: "Atencion 24/7", subtitle: "365 dias al ano" },
    { icon: "Star", title: "Mas de 14 anos", subtitle: "de experiencia" },
    { icon: "Award", title: "Trabajo seguro", subtitle: "materiales homologados" },
    { icon: "Home", title: "Trabajamos en toda", subtitle: "Valencia y alrededores" },
  ],
}

/**
 * Final CTA Content - TrustCtaBlueV1
 * SOURCE: electricista-semantic-map.ts + electricista-clusters.ts
 * 
 * Approved Services (Semantic Layer):
 * - urgencias-electricas
 * - instalaciones-electricas
 * - cuadros-electricos
 * - iluminacion-led
 * - enchufes-interruptores
 * - averias-electricas
 * 
 * EXCLUDED: boletines, certificados, CIE (future category /boletines)
 */
export const electricistaTrustCtaContent = {
  badge: "Electricistas Valencia",
  title: "?Necesitas un Electricista en Valencia?",
  subtitle: "Atendemos urgencias electricas 24h, averias, instalaciones electricas, cuadros electricos, iluminacion LED y enchufes e interruptores con presupuesto claro y garantia profesional.",
  primaryCta: {
    label: "Llamar Ahora",
    href: "tel:+34642310813",
  },
  secondaryCta: {
    label: "WhatsApp",
    href: "https://wa.me/34642310813",
  },
  trustItems: [
    "? Atencion 24h",
    "? Presupuesto claro",
    "? Materiales homologados",
    "? Garantia profesional",
  ],
}
