/**
 * Fontanero Hub Page Content
 * URL: /fontanero
 * 
 * This file contains SEO-optimized content for the fontanero hub page.
 * Content is separated from reusable components to maintain clean architecture.
 * 
 * Last Updated: SEO Optimization - 2026-05-23
 */

import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import {
  Clock,
  ShieldCheck,
  Users,
  FileText,
  BadgeCheck,
  Receipt,
  Umbrella,
} from 'lucide-react'

export const fontaneroHubSeoContent: SeoContentSectionV1Props = {
  badge: "Fontanero 24 horas",
  title: "Fontanero 24 Horas: Servicio Urgente Profesional",
  intro: [
    "Cuando necesitas un fontanero 24 horas en Valencia, cada minuto cuenta. Nuestro equipo de fontaneros profesionales está disponible todos los días del año para atender emergencias de fontanería: reparación de fugas urgentes, desatascos inmediatos, termos eléctricos averiados, o cualquier problema que no puede esperar.",
    "Somos especialistas en fontanería profesional con más de 15 años trabajando en Valencia y área metropolitana. Como fontanero urgente cerca de ti, llegamos en 30-60 minutos equipados para resolver reparaciones de fontanería, desatascos profesionales, reparación de fugas de agua, instalación y reparación de termos eléctricos, y cualquier instalación de fontanería que necesites.",
    "¿Buscas un fontanero cerca de mi con precios claros? Ofrecemos presupuesto transparente antes de empezar cualquier trabajo. Nuestro servicio de fontanero de urgencia incluye diagnóstico técnico completo, materiales de primeras marcas, mano de obra certificada y respuesta rápida garantizada. Todos nuestros trabajos incluyen 2 años de garantía por escrito.",
  ],
  serviceCards: [], // Explicitly remove service cards to avoid duplication with ServicesGridV1
  localCoverage: {
    title: "Fontaneros locales en Valencia y alrededores",
    description: "Trabajamos todos los días del año, incluidos fines de semana y festivos. Llegamos rápido donde nos necesites.",
  },
  trustStats: [
    { icon: Clock, label: "Respuesta rápida", value: "30-60 min" },
    { icon: ShieldCheck, label: "Servicio 24/7", value: "365 días al año" },
    { icon: Users, label: "Profesionales", value: "cualificados" },
  ],
  phone: { label: "Llama ahora", number: "641 688 524" },
  footerTrustItems: [
    { icon: FileText, title: "Garantía", subtitle: "2 años" },
    { icon: BadgeCheck, title: "Certificados", subtitle: "y seguros" },
    { icon: Receipt, title: "Facturas", subtitle: "oficiales" },
    { icon: Umbrella, title: "Seguro RC", subtitle: "600.000€" },
  ],
}

export const fontaneroHubFaqs = [
  {
    question: "¿Cuánto cobra un fontanero?",
    answer:
      "Un fontanero profesional cobra desde 49€ por visita y diagnóstico. El precio final depende del tipo de reparación: reparación de fuga básica 60-120€, cambio de grifo 80-110€, desatasco 70-100€, instalación de termos 90-150€. Siempre informamos del precio antes de empezar el trabajo. Servicios urgentes 24h tienen recargo justificado por disponibilidad inmediata.",
  },
  {
    question: "¿Cuánto cobra un fontanero por hora?",
    answer: "El precio hora fontanero en Valencia está entre 40-50€/hora en horario diurno normal. Para urgencias nocturnas o festivos el precio hora fontanero es de 60-80€/hora por disponibilidad 24h. Normalmente trabajamos con presupuesto cerrado por trabajo completo, no por horas, para mayor transparencia y evitar sorpresas en la factura final.",
  },
  {
    question: "¿Cuánto cuesta un fontanero urgente 24 horas?",
    answer: "Un fontanero urgente 24 horas en Valencia cobra desde 70-100€ para servicios urgentes, dependiendo del horario (noche/festivo más caro). Incluye desplazamiento y diagnóstico. Las reparaciones urgentes de fugas, desatascos o averías críticas se presupuestan según complejidad. Atendemos emergencias con llegada en 30-60 minutos.",
  },
  {
    question: "¿Qué servicios de fontanería ofrecéis?",
    answer: "Ofrecemos fontanería 24 horas: reparación de fugas urgentes, desatascos profesionales, instalación y reparación de termos eléctricos, grifos y sanitarios, sustitución de tuberías, y reformas de fontanería completas. Todos los trabajos incluyen garantía de 2 años y presupuesto previo sin compromiso.",
  },
  {
    question: "¿Cuánto tardáis en llegar en una emergencia?",
    answer: "Nuestro fontanero urgente llega en 30-60 minutos en Valencia y área metropolitana. Atendemos emergencias 24/7 todos los días del año. Para fugas graves, cortes de agua o desatascos críticos priorizamos la atención inmediata. Llama al 641 688 524 para servicio urgente.",
  },
  {
    question: "¿Los fontaneros están certificados?",
    answer: "Sí. Todos nuestros fontaneros son profesionales certificados con más de 15 años de experiencia en Valencia. Contamos con seguro de responsabilidad civil de 600.000€ y garantía por escrito en todos los trabajos. Cumplimos toda la normativa vigente de fontanería profesional.",
  },
  {
    question: "¿Hay recargo por servicio urgente nocturno?",
    answer: "Sí. Los servicios de fontanero de urgencia en horario nocturno (22:00-08:00) o festivos tienen un recargo del 30-50% sobre tarifa diurna, debido a la disponibilidad 24h y disponibilidad inmediata. Te informamos del precio exacto antes de desplazarnos. La urgencia real justifica el coste adicional.",
  },
  {
    question: "¿Ofrecéis presupuesto sin compromiso?",
    answer: "Sí. Ofrecemos presupuesto gratuito sin compromiso para trabajos planificados (reformas, instalaciones). Para urgencias de fontanería 24 horas, la visita de diagnóstico cuesta 49€ descontables si contratas la reparación. Siempre explicamos el trabajo necesario y el coste antes de empezar cualquier intervención.",
  },
]
