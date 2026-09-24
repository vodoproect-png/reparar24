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
  badge: "Electricistas Profesionales Valencia",
  title: "Electricistas Profesionales en Valencia: Urgencias 24h y Reparaciones",
  intro: [
    "Cuando salta el diferencial de madrugada y te quedas sin luz, tienes un apagón parcial en casa, o notas que los plomos saltan constantemente, necesitas un electricista profesional que entienda las instalaciones eléctricas de viviendas en Valencia. En Reparar24 llevamos más de 14 años solucionando urgencias eléctricas, reparando averías y realizando instalaciones eléctricas seguras con materiales homologados.",
    "Ofrecemos servicio completo: urgencias eléctricas 24 horas para cortes de luz y fallos urgentes, reparación de averías eléctricas, instalaciones eléctricas nuevas en reformas y viviendas, cuadros eléctricos con diferenciales y magnetotérmicos, iluminación LED para hogares y locales, enchufes e interruptores, y todo tipo de trabajos eléctricos para que tu instalación funcione de forma segura y eficiente.",
    "Trabajamos con equipos de medición profesionales, materiales eléctricos de calidad y mano de obra certificada. Todos nuestros trabajos incluyen garantía de 6 meses por escrito. Si necesitas un electricista en Valencia con precios claros y presupuesto transparente, estamos disponibles todos los días del año, incluidos fines de semana y festivos.",
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
  phone: { label: "Llama ahora", number: "642 310 813" },
  footerTrustItems: [
    { icon: FileText, title: "Garantía", subtitle: "6 meses" },
    { icon: BadgeCheck, title: "Profesionales", subtitle: "certificados" },
    { icon: Receipt, title: "Facturas", subtitle: "oficiales" },
    { icon: Umbrella, title: "Seguro RC", subtitle: "600.000€" },
  ],
}

export const electricistaHubFaqs = [
  {
    question: "¿Cuánto cobra un electricista?",
    answer:
      "El precio depende del tipo de trabajo. Una reparación básica o diagnóstico puede empezar desde 59€, mientras que una urgencia 24h, un cuadro eléctrico o una instalación completa requieren presupuesto según el caso. Siempre informamos del precio antes de empezar.",
  },
  {
    question: "¿Atendéis urgencias eléctricas 24 horas?",
    answer:
      "Sí. Atendemos urgencias eléctricas 24h para cortes de luz, cortocircuitos, fallos en el cuadro eléctrico, diferenciales que saltan y averías que requieren atención rápida.",
  },
  {
    question: "¿Qué hago si salta el diferencial constantemente?",
    answer:
      "Si el diferencial salta varias veces, evita manipular la instalación y desconecta los aparatos principales. Puede deberse a una fuga eléctrica, humedad, sobrecarga o avería en algún circuito. Un electricista debe revisar el cuadro y localizar el origen del fallo.",
  },
  {
    question: "¿Reparáis cuadros eléctricos antiguos?",
    answer:
      "Sí. Revisamos, reparamos y sustituimos cuadros eléctricos antiguos, diferenciales, magnetotérmicos y protecciones deterioradas. Si la instalación no es segura, explicamos la mejor solución antes de realizar cualquier trabajo.",
  },
  {
    question: "¿Hacéis instalaciones eléctricas en reformas?",
    answer:
      "Sí. Realizamos instalaciones eléctricas para viviendas, locales, cocinas, baños, reformas y ampliaciones. Trabajamos con materiales homologados y dejamos la instalación preparada para un uso seguro.",
  },
  {
    question: "¿Instaláis enchufes, interruptores y puntos de luz?",
    answer:
      "Sí. Instalamos y sustituimos enchufes, interruptores, mecanismos, puntos de luz, focos y tiras LED. También podemos añadir nuevos puntos eléctricos si la instalación lo permite.",
  },
  {
    question: "¿Cuánto tardáis en llegar?",
    answer:
      "En servicios urgentes, intentamos llegar en 30-60 minutos según disponibilidad y zona. Para trabajos programados, acordamos una franja horaria cómoda antes de la visita.",
  },
  {
    question: "¿Los trabajos tienen garantía?",
    answer:
      "Sí. Los trabajos realizados por Reparar24 incluyen garantía. Antes de empezar explicamos la intervención, el precio y las condiciones del servicio.",
  },
]
