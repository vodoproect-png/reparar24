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

import type { ServicesGridV1Props } from '@/components/ds/ServicesGridV1'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { RelatedServicesV1Props } from '@/components/ds/RelatedServicesV1'
import type { ServiceHeroV2Props } from '@/components/ds/ServiceHeroV2'
import type { LucideIcon } from 'lucide-react'
import {
  Zap,
  Lightbulb,
  Power,
  Activity,
  Cable,
  ShieldAlert,
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

export const electricistaHeroContent: ServiceHeroV2Props = {
  eyebrow: "Servicio 24/7 en Valencia",
  title: "Electricista",
  subtitle: "Llegamos en 30-60 minutos. Solucionamos averías eléctricas con garantía y al mejor precio.",
  phoneCta: {
    label: "Llamar ahora",
    sublabel: "Desde 59€",
    href: "tel:+34641688524",
  },
  whatsappCta: {
    label: "WhatsApp",
    sublabel: "Respuesta en 2 min",
    href: "https://wa.me/34641688524",
  },
  trustCards: [
    { icon: Star, title: "4.8/5", subtitle: "500+ reseñas" },
    { icon: Clock, title: "24/7", subtitle: "365 días al año" },
    { icon: ShieldCheck, title: "Profesionales", subtitle: "certificados" },
  ],
  quickChips: [
    { icon: Zap, label: "Averías" },
    { icon: Power, label: "Cuadros" },
    { icon: Lightbulb, label: "Instalaciones" },
    { icon: Cable, label: "Recableado" },
  ],
  highlights: [
    { label: "Llegada en 30-60 min" },
    { label: "Garantía 2 años" },
    { label: "Seguro RC 600.000€" },
    { label: "Presupuesto gratuito" },
  ],
  image: {
    src: "/images/electricista/electricista-hero.png",
    alt: "Electricista profesional junto a furgoneta de servicio",
  },
}

export const electricistaServicesGridContent: ServicesGridV1Props = {
  badge: "Servicios Profesionales",
  title: "Nuestros Servicios de Electricidad",
  subtitle: "Soluciones profesionales para tu hogar o negocio. Trabajos con garantía y atención personalizada.",
  services: [
    {
      icon: Zap,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Reparación de Averías",
      description: "Diagnóstico y reparación de cortocircuitos, saltos de diferencial, y fallos eléctricos urgentes.",
      href: "#",
    },
    {
      icon: Power,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Cuadros Eléctricos",
      description: "Actualización y reparación de cuadros eléctricos con protecciones modernas y boletín eléctrico.",
      href: "#",
    },
    {
      icon: Lightbulb,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      title: "Instalaciones",
      description: "Instalación de enchufes, interruptores, iluminación LED, y puntos de luz con certificado oficial.",
      href: "#",
    },
    {
      icon: Activity,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      title: "Inspecciones Eléctricas",
      description: "Revisión completa de instalaciones eléctricas con termografía y emisión de boletín eléctrico.",
      href: "#",
    },
    {
      icon: Cable,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Recableado Completo",
      description: "Sustitución de instalaciones antiguas de aluminio por cobre. Actualización normativa REBT.",
      href: "#",
    },
    {
      icon: ShieldAlert,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      title: "Emergencias 24/7",
      description: "Atención urgente para cortocircuitos, apagones, y situaciones de riesgo eléctrico.",
      href: "#",
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
      title: "Garantía 2 años",
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

export const electricistaTrustSignalsContent: TrustSignalsV1Props = {
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
      headline: "Garantía 2 años",
      description: "En todas nuestras reparaciones",
    },
  ],
  bottomItems: [
    { icon: "UserCheck", label: "Profesionales certificados" },
    { icon: "FileText", label: "Boletín eléctrico incluido" },
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
  title: "¿Cómo Trabajamos?",
  subtitle: "Proceso transparente en 4 pasos. Sin complicaciones, sin sorpresas.",
  steps: [
    {
      number: "01",
      color: "blue",
      title: "Contactas con nosotros",
      description: "Llámanos o escríbenos por WhatsApp. Cuéntanos tu problema eléctrico y te asesoramos al instante.",
      iconSrc: "/icons/process-3d-01-contacto.webp",
    },
    {
      number: "02",
      color: "green",
      title: "Valoramos tu caso",
      description: "Evaluamos la avería con equipos profesionales y te damos un presupuesto claro y sin compromiso.",
      iconSrc: "/icons/process-3d-02-valoracion.webp",
    },
    {
      number: "03",
      color: "orange",
      title: "Reparamos el problema",
      description: "Nuestros electricistas certificados se desplazan y reparan de forma rápida y segura.",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
    },
    {
      number: "04",
      color: "purple",
      title: "Garantía y tranquilidad",
      description: "Te ofrecemos garantía de 2 años y boletín eléctrico cuando es necesario para tu total tranquilidad.",
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
      title: "Boletín eléctrico",
      description: "Emitimos certificado cuando es necesario",
    },
  ],
}

export const electricistaPricingSectionContent: PricingSectionV1Props = {
  badge: "Precios transparentes",
  title: "Precios Transparentes",
  subtitle: "Sin sorpresas ni costes ocultos",
  pricingPlans: [
    {
      title: "Diagnóstico",
      price: "59€",
      color: "blue",
      iconSrc: "/icons/pricing-3d-01-diagnostico.webp",
      features: ["Inspección con equipos", "Evaluación profesional", "Presupuesto detallado", "Sin compromiso"],
    },
    {
      title: "Reparación de avería",
      price: "89€",
      color: "orange",
      iconSrc: "/icons/process-3d-03-reparacion.webp",
      features: ["Localización del fallo", "Reparación inmediata", "Materiales incluidos", "Garantía 2 años"],
      featured: true,
    },
    {
      title: "Cuadro eléctrico",
      price: "120€",
      color: "green",
      iconSrc: "/icons/pricing-3d-03-desatascos.webp",
      features: ["Protecciones modernas", "Diferenciales y magnetotérmicos", "Normativa REBT", "Boletín incluido"],
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
    { icon: "FileText", title: "Boletín eléctrico", description: "cuando es necesario" },
    { icon: "ShieldCheck", title: "Garantía", description: "hasta 2 años" },
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

export const electricistaOpinionesClientesContent: OpinionesClientesV1Props = {
  rating: "4.8/5",
  title: "Lo Que Dicen Nuestros Clientes",
  subtitle: "Opiniones reales de clientes satisfechos con nuestro servicio eléctrico",
  reviews: [
    {
      name: "Pedro L.",
      quote: "Saltaba el diferencial constantemente y vinieron en menos de una hora. Encontraron el problema y lo solucionaron rápido. Muy profesionales.",
      verified: true,
    },
    {
      name: "Laura M.",
      quote: "Actualización completa del cuadro eléctrico con boletín incluido. Explicaron todo claramente y el precio justo. Recomendables 100%.",
      verified: true,
    },
    {
      name: "José R.",
      quote: "Emergencia nocturna por cortocircuito. Llegaron en 40 minutos, repararon de forma segura. Excelente servicio urgente.",
      verified: true,
    },
    {
      name: "Carmen S.",
      quote: "Instalación de nuevos enchufes y luces LED en toda la casa. Trabajo limpio, profesional y garantizado. Muy contentos.",
      verified: true,
    },
  ],
  trustItems: [
    { node: "google", title: "4.8/5", description: "Google Reviews", showStars: true },
    { icon: "Users", title: "2.500+", description: "Clientes satisfechos" },
    { icon: "ShieldCheck", title: "Disponibles 24/7", description: "365 días al año" },
    { icon: "MapPin", title: "Valencia", description: "y alrededores" },
  ],
  verifiedLabel: "Cliente verificado",
}

export const electricistaRelatedServicesContent: RelatedServicesV1Props = {
  badge: "Servicios Relacionados",
  title: "Otros Servicios Que Ofrecemos",
  description: "Servicios complementarios para resolver todas tus necesidades eléctricas.",
  cards: [
    {
      icon: "Wrench",
      title: "Reparación de averías",
      description: "Diagnóstico y solución de fallos eléctricos urgentes.",
      color: "blue",
      bullets: [
        "Cortocircuitos y saltos de diferencial",
        "Apagones parciales en vivienda",
        "Cables seccionados o dañados",
        "Fallos en cuadro eléctrico",
      ],
    },
    {
      icon: "ShieldCheck",
      title: "Cuadros eléctricos",
      description: "Actualización con protecciones modernas normativa REBT.",
      color: "cyan",
      bullets: [
        "Diferenciales de 30mA",
        "Magnetotérmicos por circuito",
        "Protector de sobretensiones",
        "Boletín eléctrico incluido",
      ],
    },
    {
      icon: "Waves",
      title: "Recableado completo",
      description: "Sustitución de instalaciones antiguas por cobre moderno.",
      color: "orange",
      bullets: [
        "Eliminación de aluminio antiguo",
        "Cable de cobre homologado",
        "Cumplimiento normativa actual",
        "Actualización completa segura",
      ],
    },
    {
      icon: "Flame",
      title: "Instalaciones",
      description: "Instalación profesional de enchufes, luces e interruptores.",
      color: "green",
      bullets: [
        "Enchufes y tomas de corriente",
        "Iluminación LED eficiente",
        "Interruptores y conmutadores",
        "Puntos de luz adicionales",
      ],
    },
  ],
  ctaTitle: "¿No estás seguro de qué servicio necesitas?",
  ctaText: "Cuéntanos tu problema eléctrico y te asesoramos sin compromiso.",
  cta: { whatsappLabel: "WhatsApp", callLabel: "Llamar ahora  641 688 524" },
  trustBadges: [
    { icon: "ShieldCheck", title: "Profesionales", subtitle: "certificados oficialmente" },
    { icon: "Clock", title: "Atención 24/7", subtitle: "365 días al año" },
    { icon: "Star", title: "Más de 14 años", subtitle: "de experiencia" },
    { icon: "Award", title: "Boletín eléctrico", subtitle: "cuando es necesario" },
    { icon: "Home", title: "Trabajamos en toda", subtitle: "Valencia y alrededores" },
  ],
}
