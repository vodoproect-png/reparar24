/**
 * Electricista Hub Page Content
 * URL: /electricista
 * 
 * This file contains SEO-optimized content for the electricista hub page.
 * Content is separated from reusable components to maintain clean architecture.
 * 
 * Created: 2026-06-12 - Foundation Architecture Phase
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

export const electricistaHubSeoContent: SeoContentSectionV1Props = {
  badge: "Electricista 24 horas",
  title: "Electricista 24 Horas: Servicio Urgente Profesional",
  intro: [
    "Cuando salta el diferencial de madrugada y te quedas sin luz, tienes un apagón parcial en casa que no sabes de dónde viene, o notas que los plomos saltan constantemente, necesitas un electricista que entienda cómo funcionan las instalaciones eléctricas en edificios españoles. En Reparar24 llevamos más de 14 años trabajando con cuadros eléctricos, diferenciales, magnetotérmicos, ICP, y todas esas cosas que cuando fallan te dejan a oscuras o sin poder usar electrodomésticos básicos.",
    "Conocemos las instalaciones eléctricas típicas de viviendas en España: pisos con instalaciones de aluminio de los años 70-80 que ya están al límite de su vida útil, cuadros eléctricos antiguos sin protección diferencial adecuada (30mA obligatorio en baños y cocinas desde REBT 2002), derivaciones individuales de comunidades con cables de 6mm² que se quedan cortos cuando metes aire acondicionado, y todas esas situaciones que aparecen cuando la instalación no está preparada para el consumo eléctrico actual.",
    "¿Buscas un electricista cerca de mi con precios claros? Ofrecemos presupuesto transparente antes de empezar cualquier trabajo. Nuestro servicio de electricista de urgencia incluye diagnóstico técnico completo con equipos de medición profesionales, materiales eléctricos homologados, mano de obra certificada y boletín eléctrico cuando es necesario. Todos nuestros trabajos incluyen garantía de 2 años por escrito.",
  ],
  serviceCards: [], // Explicitly remove service cards to avoid duplication with ServicesGridV1
  localCoverage: {
    title: "Electricistas locales en Valencia y alrededores",
    description: "Trabajamos todos los días del año, incluidos fines de semana y festivos. Llegamos rápido donde nos necesites.",
  },
  trustStats: [
    { icon: Clock, label: "Respuesta rápida", value: "30-60 min" },
    { icon: ShieldCheck, label: "Servicio 24/7", value: "365 días al año" },
    { icon: Users, label: "Profesionales", value: "certificados" },
  ],
  phone: { label: "Llama ahora", number: "641 688 524" },
  footerTrustItems: [
    { icon: FileText, title: "Garantía", subtitle: "2 años" },
    { icon: BadgeCheck, title: "Certificados", subtitle: "y boletín" },
    { icon: Receipt, title: "Facturas", subtitle: "oficiales" },
    { icon: Umbrella, title: "Seguro RC", subtitle: "600.000€" },
  ],
}

export const electricistaHubFaqs = [
  {
    question: "¿Cuánto cobra un electricista?",
    answer:
      "Un electricista profesional cobra desde 59€ por visita y diagnóstico con equipos de medición. El precio final depende del tipo de reparación: reparación de avería eléctrica básica 70-120€, reparación de cuadro eléctrico 90-180€, instalación de enchufes 60-100€. Siempre informamos del precio antes de empezar el trabajo. Servicios urgentes 24h tienen recargo justificado por disponibilidad inmediata.",
  },
  {
    question: "¿Qué hacer si salta el diferencial?",
    answer: "Si salta el diferencial: desconecta todos los aparatos eléctricos, intenta subirlo de nuevo, si vuelve a saltar no insistas. Llama a un electricista profesional para diagnosticar la causa: cortocircuito, fallo de aislamiento, o aparato defectuoso. No manipules el cuadro eléctrico sin conocimientos, puede ser peligroso.",
  },
  {
    question: "¿Cuáles son las señales de una avería eléctrica?",
    answer: "Señales de avería eléctrica: diferencial que salta frecuentemente, chispas en enchufes o interruptores, olores a quemado, interruptores que se calientan, luces que parpadean, o se te va la luz sin motivo. Si detectas alguna señal, contacta con un electricista urgente para evitar riesgos mayores.",
  },
  {
    question: "¿Cuándo debo llamar a un electricista urgente?",
    answer: "Llama inmediatamente si: huele a quemado de origen eléctrico, ves chispas o humo, el cuadro eléctrico hace ruidos extraños, se te va la luz constantemente, o el diferencial no se puede subir. Nuestro servicio urgente 24/7 atiende emergencias eléctricas rápidamente para garantizar tu seguridad.",
  },
  {
    question: "¿Cuánto tardáis en llegar en una emergencia?",
    answer: "Nuestro electricista urgente llega en 30-60 minutos en Valencia y área metropolitana. Atendemos emergencias 24/7 todos los días del año. Para averías eléctricas graves, cortocircuitos o situaciones de riesgo priorizamos la atención inmediata. Llama al 641 688 524 para servicio urgente.",
  },
  {
    question: "¿Los electricistas están certificados?",
    answer: "Sí. Todos nuestros electricistas son profesionales certificados con carné oficial de instalador eléctrico de baja tensión. Contamos con seguro de responsabilidad civil de 600.000€ y emitimos boletín eléctrico cuando es necesario. Cumplimos toda la normativa REBT vigente.",
  },
  {
    question: "¿Qué es un boletín eléctrico y cuándo es necesario?",
    answer: "El boletín eléctrico (CIE) es un certificado oficial que acredita que la instalación eléctrica cumple normativa vigente. Es necesario en: instalaciones nuevas, reformas importantes, cambio de potencia, o compraventa de vivienda. Nuestros electricistas certificados emiten el boletín eléctrico tras realizar la instalación o revisión.",
  },
  {
    question: "¿Ofrecéis presupuesto sin compromiso?",
    answer: "Sí. Ofrecemos presupuesto gratuito sin compromiso para trabajos planificados (reformas, instalaciones). Para urgencias eléctricas, la visita de diagnóstico con equipos de medición cuesta 59€ descontables si contratas la reparación. Siempre explicamos el trabajo necesario y el coste antes de empezar cualquier intervención.",
  },
]
