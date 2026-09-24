/**
 * Fontanero Page - Component Props
 * URL: /fontanero
 * 
 * All production content for Design System components.
 * Components are pure UI renderers.
 * Content lives here, not in component defaults.
 * 
 * Created: 2026-06-11 - Architecture Cleanup Phase
 */

import type { ServicesGridV1Props } from '@/components/ds/ServicesGridV1'
import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { RelatedServicesV1Props } from '@/components/ds/RelatedServicesV1'
import type OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import type { LucideIcon } from 'lucide-react'
import {
  Droplet,
  Waves,
  Construction,
  Flame,
  Wrench,
  Gauge,
  ShowerHead,
  Toilet,
  Clock,
  ShieldCheck,
  Award,
  CreditCard,
  UserCheck,
  FileText,
  Tag,
  Shield,
  UserRound,
  Star,
  XCircle,
  Home,
} from 'lucide-react'

export const fontaneroServicesGridContent: ServicesGridV1Props = {
  badge: "Servicios Profesionales",
  title: "Nuestros Servicios de Fontanería",
  subtitle: "Soluciones profesionales para tu hogar o negocio. Trabajos con garantía y atención personalizada.",
  services: [
    {
      icon: Droplet,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Reparación de Fugas",
      description: "Detectamos y solucionamos fugas de agua rápidamente en tuberías, grifos y sanitarios sin romper.",
      href: "/fontanero/reparacion-fugas",
    },
    {
      icon: Waves,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Desatascos",
      description: "Eliminamos atascos en tuberías, fregaderos, inodoros y desagües con equipos profesionales.",
      href: "/desatascos",
    },
    {
      icon: Construction,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "Instalaciones",
      description: "Instalación profesional de grifos, sanitarios, calentadores y tuberías con certificado oficial.",
      href: "/fontanero/instalaciones",
    },
    {
      icon: Flame,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      title: "Termos y Calentadores",
      description: "Reparación e instalación de termos eléctricos y calentadores. Todas las marcas y modelos.",
      href: "/fontanero/calentadores-termos",
    },
    {
      icon: Wrench,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      title: "Cambio de Tuberías",
      description: "Sustitución de tuberías antiguas de plomo o galvanizado por multicapa o cobre.",
      href: "/fontanero/sustitucion-tuberias",
    },
    {
      icon: Wrench,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Reparaci\u00f3n de Bajantes",
      description: "Reparamos y cambiamos bajantes de PVC o comunidad, con diagn\u00f3stico y presupuesto previo.",
      href: "/limpieza-tuberias",
    },
    {
      icon: ShowerHead,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      title: "Bañera por Ducha",
      description: "Sustituimos bañeras por platos de ducha antideslizantes con acabado limpio y garantía.",
      href: "/fontanero",
    },
    {
      icon: Toilet,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      title: "Reparación de Cisternas",
      description: "Arreglamos cisternas que pierden agua, no cargan o tienen el mecanismo averiado.",
      href: "/fontanero",
    },
    {
      icon: Toilet,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      title: "Cambio de Inodoros",
      description: "Instalamos y cambiamos inodoros, sanitarios y WC con sellado, conexión y prueba final.",
      href: "/fontanero/instalaciones",
    },
    {
      icon: Droplet,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      title: "Lavabos y Desagües",
      description: "Cambio e instalación de lavabos, sifones, válvulas y desagües con prueba de estanqueidad.",
      href: "/fontanero/instalaciones",
    },
    {
      icon: ShowerHead,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Mamparas de Ducha",
      description: "Instalamos, cambiamos y reparamos mamparas de ducha con ajuste, sellado y garantía.",
      href: "/fontanero",
    },
    {
      icon: Wrench,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      title: "Cambio y Reparación de Grifos",
      description: "Cambiamos y reparamos grifos de cocina, ducha y lavabo, incluyendo goteos y monomandos.",
      href: "/fontanero/instalaciones",
    },
    {
      icon: ShowerHead,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Reparaci\u00f3n de Duchas",
      description: "Cambio y reparaci\u00f3n de duchas, columnas, flexos, desag\u00fces y goteos.",
      href: "/fontanero",
    },
    {
      icon: Gauge,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      title: "Grupos de Presión",
      description: "Instalación y reparación de grupos de presión y bombas de agua para viviendas y comunidades.",
      href: "/fontanero",
    },
    {
      icon: Droplet,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      title: "Descalcificadores y Ósmosis",
      description: "Mantenimiento, reparación e instalación de descalcificadores y equipos de ósmosis inversa.",
      href: "/fontanero",
    },
    {
      icon: Wrench,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      title: "Mantenimiento Preventivo",
      description: "Revisiones periódicas para evitar averías y problemas futuros en tu instalación.",
      href: "/fontanero/mantenimiento",
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
      title: "Garantía 6 meses",
      subtitle: "En todos nuestros trabajos",
    },
    {
      icon: Award,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "Profesionales certificados",
      subtitle: "Técnicos cualificados",
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

export const fontaneroServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: "Servicios de fontanería en Valencia",
  title: "Servicios de fontanero para vivienda, local y comunidad",
  subtitle: "Organizamos urgencias, reparaciones, instalaciones y mantenimiento de fontanería para que encuentres rápido el servicio que necesitas.",
  phoneHref: "tel:+34642310813",
  phoneLabel: "642 310 813",
  whatsappHref: "https://wa.me/34642310813?text=Hola%2C%20necesito%20un%20fontanero%20en%20Valencia.%20%C2%BFPueden%20ayudarme%3F",
  whatsappLabel: "WhatsApp",
  searchPlaceholder: "Buscar servicio de fontanería",
  summaryCountLabel: "16 servicios de fontanería",
  summaryDescription: "Urgencias, fugas, bajantes, duchas, desatascos, instalaciones, sanitarios, lavabos, mamparas, grifos y equipos de agua para vivienda, local o comunidad.",
  trustItems: [
    { icon: "Clock", label: "Atención 24h" },
    { icon: "ShieldCheck", label: "Garantía" },
    { icon: "Award", label: "Técnicos cualificados" },
    { icon: "CreditCard", label: "Presupuesto claro" },
  ],
  groups: [
    {
      id: "urgencias-reparaciones",
      label: "Urgencias y reparaciones",
      icon: "Droplets",
      services: [
        {
          icon: "Droplets",
          title: "Reparación de Fugas",
          description: "Detección y reparación de fugas de agua visibles u ocultas con diagnóstico profesional.",
          href: "/fontanero/reparacion-fugas",
          featured: true,
        },
        {
          icon: "Wrench",
          title: "Cambio y Reparación de Grifos",
          description: "Reparamos grifos que gotean y cambiamos grifos de cocina, ducha, lavabo y bañera.",
          href: "/fontanero/instalaciones",
          featured: true,
        },
        {
          icon: "ShowerHead",
          title: "Reparaci\u00f3n de Duchas",
          description: "Cambio y reparaci\u00f3n de duchas, columnas, flexos, desag\u00fces y goteos.",
          href: "/fontanero",
        },
        {
          icon: "Toilet",
          title: "Reparación de Cisternas",
          description: "Solucionamos cisternas que pierden agua, no cargan o tienen mecanismo averiado.",
          href: "/fontanero",
        },
        {
          icon: "Wrench",
          title: "Reparaci\u00f3n de Bajantes",
          description: "Reparaci\u00f3n y cambio de bajantes de PVC o comunidad, incluso sin obra cuando es viable.",
          href: "/limpieza-tuberias",
        },
        {
          icon: "Droplets",
          title: "Desatascos",
          description: "Desatascos de tuberías, fregaderos, WC, arquetas y bajantes con equipo profesional.",
          href: "/desatascos",
          featured: true,
        },
      ],
    },
    {
      id: "instalaciones",
      label: "Instalaciones",
      icon: "Construction",
      services: [
        {
          icon: "Construction",
          title: "Instalaciones de Fontanería",
          description: "Instalación de fontanería en baños, cocinas, reformas, locales y viviendas.",
          href: "/fontanero/instalaciones",
          featured: true,
        },
        {
          icon: "Toilet",
          title: "Instalación y Cambio de Inodoros",
          description: "Cambio de inodoros, sanitarios y WC con retirada, conexión, sellado y prueba final.",
          href: "/fontanero/instalaciones",
        },
        {
          icon: "ShowerHead",
          title: "Cambiar Bañera por Ducha",
          description: "Sustitución de bañera por plato de ducha con instalación profesional y garantía.",
          href: "/fontanero",
        },
        {
          icon: "Droplets",
          title: "Instalación y Reparación de Lavabos",
          description: "Cambio de lavabos, desagües, sifones, válvulas y sellado con prueba final.",
          href: "/fontanero/instalaciones",
        },
        {
          icon: "ShowerHead",
          title: "Mamparas de Ducha",
          description: "Instalación, cambio y reparación de mamparas con ajuste, sellado y garantía.",
          href: "/fontanero",
        },
        {
          icon: "Wrench",
          title: "Cambio de Tuberías",
          description: "Sustitución de tuberías antiguas por instalaciones seguras y materiales actuales.",
          href: "/fontanero/sustitucion-tuberias",
        },
      ],
    },
    {
      id: "equipos-mantenimiento",
      label: "Equipos y mantenimiento",
      icon: "Gauge",
      services: [
        {
          icon: "Flame",
          title: "Termos y Calentadores",
          description: "Instalación, reparación y sustitución de termos eléctricos y calentadores de agua.",
          href: "/fontanero/calentadores-termos",
        },
        {
          icon: "Gauge",
          title: "Grupos de Presión",
          description: "Instalación y reparación de grupos de presión y bombas de agua para viviendas y comunidades.",
          href: "/fontanero",
        },
        {
          icon: "Droplets",
          title: "Descalcificadores y Ósmosis",
          description: "Mantenimiento, reparación e instalación de descalcificadores y ósmosis inversa.",
          href: "/fontanero",
        },
        {
          icon: "ClipboardCheck",
          title: "Mantenimiento Preventivo",
          description: "Revisiones periódicas para evitar fugas, atascos, averías y desgaste de la instalación.",
          href: "/fontanero/mantenimiento",
        },
      ],
    },
  ],
}

export const fontaneroTrustSignalsContent: TrustSignalsV1Props = {
  badge: "Garantías Reparar24",
  title: "Por qué elegir Reparar24",
  subtitle: "Trabajos de fontanería con atención rápida, técnicos cualificados, presupuesto claro y garantía por escrito.",
  stats: [
    {
      icon: "Clock",
      color: "blue",
      headline: "30-60 min",
      description: "Llegada garantizada en Valencia y alrededores",
    },
    {
      icon: "ShieldCheck",
      color: "green",
      headline: "24/7/365",
      description: "Atención continua todo el año",
    },
    {
      icon: "Shield",
      color: "orange",
      headline: "600.000€ RC",
      description: "Seguro de responsabilidad civil profesional",
    },
    {
      icon: "Award",
      color: "purple",
      headline: "Garantía 6 meses",
      description: "En todas nuestras reparaciones",
    },
  ],
  bottomItems: [
    { icon: "UserCheck", label: "Profesionales certificados" },
    { icon: "FileText", label: "Factura disponible" },
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

export const fontaneroProcessStepsContent: ProcessStepsV3Props = {
  badge: "Proceso transparente",
  title: "¿Cómo Trabajamos?",
  subtitle: "Proceso transparente en 4 pasos. Sin complicaciones, sin sorpresas.",
  steps: [
    {
      number: "01",
      color: "blue",
      title: "Contactas con nosotros",
      description: "Llámanos o escríbenos por WhatsApp. Cuéntanos tu problema y te asesoramos al instante.",
      iconSrc: "/icons/process-3d-01-contacto.webp",
    },
    {
      number: "02",
      color: "green",
      title: "Valoramos tu caso",
      description: "Evaluamos la avería y te damos un presupuesto claro y sin compromiso.",
      iconSrc: "/icons/process-3d-02-valoracion.webp",
    },
    {
      number: "03",
      color: "orange",
      title: "Reparamos el problema",
      description: "Nuestros profesionales certificados se desplazan y reparan de forma rápida y eficiente.",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
    },
    {
      number: "04",
      color: "purple",
      title: "Garantía y tranquilidad",
      description: "Te ofrecemos garantía de 6 meses en todas nuestras reparaciones para tu total tranquilidad.",
      iconSrc: "/icons/process-3d-04-garantia.webp",
    },
  ],
  trustItems: [
    {
      icon: "ShieldCheck",
      title: "Sin sorpresas",
      description: "Presupuesto cerrado antes de empezar",
    },
    {
      icon: "Clock",
      title: "Rápidos y eficientes",
      description: "Llegamos en 30-60 min a Valencia",
    },
    {
      icon: "UserRound",
      title: "Profesionales certificados",
      description: "Técnicos expertos con años de experiencia",
    },
    {
      icon: "FileText",
      title: "Factura disponible",
      description: "Recibes tu factura al finalizar el trabajo",
    },
  ],
}

export const fontaneroPricingSectionContent: PricingSectionV1Props = {
  badge: "Precios transparentes",
  title: "Precios Transparentes",
  subtitle: "Sin sorpresas ni costes ocultos",
  pricingPlans: [
    {
      title: "Diagnóstico",
      price: "49€",
      color: "blue",
      iconSrc: "/icons/pricing-3d-01-diagnostico.webp",
      features: ["Inspección inicial", "Evaluación profesional", "Presupuesto detallado", "Sin compromiso"],
    },
    {
      title: "Reparación de fugas",
      price: "79€",
      color: "orange",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
      features: ["Localización de fuga", "Reparación inmediata", "Materiales incluidos", "Garantía 6 meses"],
      featured: true,
    },
    {
      title: "Desatascos",
      price: "89€",
      color: "green",
      iconSrc: "/icons/pricing-3d-03-desatascos.webp",
      features: ["Cocina", "Baño", "Bajantes", "Equipos profesionales"],
    },
    {
      title: "Urgencias 24/7",
      price: "99€",
      color: "red",
      iconSrc: "/icons/pricing-3d-04-urgencias.webp",
      features: ["Atención inmediata", "Noches y festivos", "Llegada 30-60 min", "Servicio prioritario"],
    },
  ],
  featuredBadgeText: "Más solicitada",
  fromLabel: "Desde",
  trustItems: [
    { icon: "ShieldCheck", title: "Presupuesto cerrado", description: "antes de empezar" },
    { icon: "FileText", title: "Factura disponible", description: "al finalizar el trabajo" },
    { icon: "ShieldCheck", title: "Garantía", description: "6 meses" },
    { icon: "XCircle", title: "Sin costes ocultos", description: "ni suplementos" },
  ],
  disclaimer: "Precios orientativos. Cada caso es único y se presupuestará según la evaluación.",
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

export const fontaneroOpinionesClientesContent: OpinionesClientesV1Props = {
  rating: "4.8/5",
  title: "Lo Que Dicen Nuestros Clientes",
  subtitle: "Opiniones reales de clientes satisfechos con nuestro servicio de fontanería",
  reviews: [
    {
      name: "María G.",
      quote: "Excelente servicio. Vinieron en menos de una hora y solucionaron la fuga en mi cocina. Muy profesionales y limpios.",
      verified: true,
    },
    {
      name: "Carlos R.",
      quote: "Llamé por una emergencia nocturna y llegaron rápido. Precio justo y trabajo impecable. Totalmente recomendable.",
      verified: true,
    },
    {
      name: "Ana L.",
      quote: "Necesitaba cambiar el termo eléctrico. Me asesoraron muy bien y la instalación perfecta. Gran servicio.",
      verified: true,
    },
    {
      name: "Javier M.",
      quote: "Problema resuelto en el mismo día. Técnicos muy cualificados y trato excepcional. Volveré a llamarles sin duda.",
      verified: true,
    },
  ],
  trustItems: [
    { icon: "Users", title: "4.8/5", description: "Opiniones de clientes", showStars: true },
    { icon: "Users", title: "2.500+", description: "Clientes satisfechos" },
    { icon: "ShieldCheck", title: "Disponibles 24/7", description: "365 días al año" },
    { icon: "MapPin", title: "Valencia", description: "y alrededores" },
  ],
  verifiedLabel: "Cliente atendido",
}

export const fontaneroRelatedServicesContent: RelatedServicesV1Props = {
  badge: "Servicios Relacionados",
  title: "Otros Servicios Que Ofrecemos",
  description: "Servicios complementarios para resolver todas tus necesidades de fontanería.",
  cards: [
    {
      icon: "Waves",
      title: "Desatascos",
      description: "Eliminamos atascos en tuberías, desagües y bajantes.",
      color: "blue",
      bullets: [
        "Atascos en fregaderos y lavabos",
        "Atascos en bañeras y duchas",
        "Atascos en W.C. y bidés",
        "Limpieza de tuberías y arquetas",
      ],
    },
    {
      icon: "Droplet",
      title: "Reparación de fugas",
      description: "Detectamos y reparamos fugas de agua sin romper.",
      color: "cyan",
      bullets: [
        "Fugas de agua ocultas",
        "Fugas en tuberías y grifos",
        "Fugas en cisternas y sanitarios",
        "Detección con tecnología avanzada",
      ],
    },
    {
      icon: "Wrench",
      title: "Sustitución de tuberías",
      description: "Cambiamos tuberías antiguas por nuevas y más eficientes.",
      color: "orange",
      bullets: [
        "Tubería multicapa Pex-Al-Pex",
        "Sustitución sin obra innecesaria",
        "Mejora de presión y caudal",
        "Cumplimiento normativa CTE-HS",
      ],
    },
    {
      icon: "Flame",
      title: "Calentadores y termos",
      description: "Instalación, reparación y mantenimiento de equipos.",
      color: "green",
      bullets: [
        "Calentadores de gas estancos",
        "Termos eléctricos 50-100L",
        "Revisión y mantenimiento",
        "Instalación segura y eficiente",
      ],
    },
  ],
  ctaTitle: "¿No estás seguro de qué servicio necesitas?",
  ctaText: "Cuéntanos tu problema y te asesoramos sin compromiso.",
  cta: { whatsappLabel: "WhatsApp", callLabel: "Llamar ahora  642 310 813" },
  trustBadges: [
    { icon: "ShieldCheck", title: "Profesionales", subtitle: "cualificados" },
    { icon: "Clock", title: "Atención 24/7", subtitle: "365 días al año" },
    { icon: "Star", title: "Más de 15 años", subtitle: "de experiencia" },
    { icon: "Award", title: "Garantía por escrito", subtitle: "en todos los trabajos" },
    { icon: "Home", title: "Trabajamos en toda", subtitle: "Valencia y alrededores" },
  ],
}
