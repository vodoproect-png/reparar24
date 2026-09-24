import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStep, ProcessStepsV3Props, TrustItem } from '@/components/ds/ProcessStepsV3'
import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import {
  BadgeCheck,
  Clock,
  FileText,
  Receipt,
  ShieldCheck,
  Umbrella,
  Wrench,
} from 'lucide-react'

export const homepageTrustSignalsContent: TrustSignalsV1Props = {
  badge: 'Garantias Reparar24',
  title: 'Servicio tecnico para casa, local y comunidad',
  subtitle: 'Una entrada clara para urgencias y reparaciones habituales, con profesionales identificados y presupuesto previo.',
  stats: [
    {
      icon: 'Clock',
      color: 'blue',
      headline: '30-60 min',
      description: 'Respuesta orientativa en zonas urbanas para avisos urgentes.',
    },
    {
      icon: 'ShieldCheck',
      color: 'green',
      headline: '24/7/365',
      description: 'Atencion continua para fontaneria, electricidad y desatascos.',
    },
    {
      icon: 'Shield',
      color: 'orange',
      headline: '600.000 EUR RC',
      description: 'Seguro de responsabilidad civil profesional.',
    },
    {
      icon: 'Award',
      color: 'purple',
      headline: '6 meses',
      description: 'Garantia en reparaciones realizadas por nuestro equipo.',
    },
  ],
  bottomItems: [
    { icon: 'UserCheck', label: 'Tecnicos certificados' },
    { icon: 'FileText', label: 'Factura disponible' },
    { icon: 'Tag', label: 'Presupuesto previo' },
  ],
}

export const homepageProcessSteps: ProcessStep[] = [
  {
    number: '1',
    color: 'blue',
    title: 'Cuentanos la averia',
    description: 'Recibimos el aviso por telefono o WhatsApp y ubicamos el servicio adecuado.',
    iconSrc: '/icons/process-3d-01-contacto.webp',
  },
  {
    number: '2',
    color: 'green',
    title: 'Diagnostico y precio',
    description: 'Un tecnico revisa el caso y explica el presupuesto antes de empezar.',
    iconSrc: '/icons/process-3d-02-valoracion.webp',
  },
  {
    number: '3',
    color: 'orange',
    title: 'Reparacion segura',
    description: 'Trabajamos con material adecuado y comprobamos que el problema queda resuelto.',
    iconSrc: '/icons/process-3d-03-reparacion.webp',
  },
  {
    number: '4',
    color: 'purple',
    title: 'Factura y garantia',
    description: 'Dejamos registro del trabajo y condiciones claras de garantia.',
    iconSrc: '/icons/process-3d-04-garantia.webp',
  },
]

export const homepageProcessTrustItems: TrustItem[] = [
  {
    icon: 'Clock',
    title: 'Urgencias reales',
    description: 'Priorizamos fugas, cortes de luz, atascos y averias que no pueden esperar.',
  },
  {
    icon: 'UserRound',
    title: 'Profesionales locales',
    description: 'Asignamos el aviso segun servicio, ciudad y disponibilidad.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Sin sorpresas',
    description: 'El presupuesto se explica antes de iniciar la reparacion.',
  },
  {
    icon: 'FileText',
    title: 'Trabajo documentado',
    description: 'Factura disponible y garantia cuando el trabajo queda finalizado.',
  },
]

export const homepageProcessStepsContent: ProcessStepsV3Props = {
  badge: 'Como trabajamos',
  title: 'De tu aviso a la reparacion terminada',
  subtitle:
    'Un proceso claro: recibimos la averia, revisamos el caso, confirmamos el precio y dejamos la reparacion comprobada.',
  steps: homepageProcessSteps,
  trustItems: homepageProcessTrustItems,
}

export const homepageSeoContent: SeoContentSectionV1Props = {
  badge: 'Reparaciones 24 horas',
  title: 'Reparaciones del hogar con fontaneria, electricidad, desatascos y climatizacion',
  intro: [
    'Reparar24 es la entrada principal para quien necesita una reparacion urgente o programada en casa, un local o una comunidad. La pagina principal concentra la busqueda general de servicios de reparacion del hogar 24 horas y dirige cada averia al equipo adecuado: fontaneria, electricidad, desatascos, aire acondicionado, calefaccion o limpieza de tuberias.',
    'Trabajamos con un enfoque claro: identificar el problema, explicar el presupuesto antes de intervenir y realizar la reparacion con tecnicos profesionales. Si hay una fuga de agua, un corte electrico, un atasco, un termo averiado, un equipo de climatizacion que no funciona o una incidencia en una comunidad, te orientamos hacia el servicio correcto sin mezclar intenciones que ya tienen su propia pagina especializada.',
    'La semantica de esta URL se centra en consultas comerciales amplias como reparaciones del hogar, reparaciones urgentes 24 horas, tecnicos profesionales, servicios de fontaneria y electricidad, desatascos y climatizacion con presupuesto previo. Las paginas hijas y geo mantienen los terminos especificos de cada servicio o ciudad para evitar canibalizacion y mejorar la ruta del usuario desde la home hasta la solucion concreta.',
  ],
  localCoverage: {
    title: 'Servicio coordinado por especialidad y zona',
    description:
      'Asignamos cada aviso segun tipo de averia, disponibilidad y cobertura local. La home funciona como puerta de entrada general; las paginas de servicio y ciudad completan la informacion especifica.',
  },
  trustStats: [
    { icon: Clock, label: 'Respuesta', value: '30-60 min' },
    { icon: ShieldCheck, label: 'Garantia', value: '6 meses' },
    { icon: BadgeCheck, label: 'Profesionales', value: 'certificados' },
  ],
  benefitsTitle: 'Que cubre Reparar24',
  benefits: [
    'Reparaciones urgentes y programadas para vivienda, local y comunidad.',
    'Fontaneria, electricidad, desatascos, climatizacion y mantenimiento tecnico.',
    'Presupuesto previo, factura disponible y garantia sobre el trabajo realizado.',
    'Atencion por telefono y WhatsApp para clasificar la averia desde el primer contacto.',
  ],
  serviceAreasTitle: 'Principales lineas de servicio',
  serviceAreas: [
    'Fontaneros 24 horas para fugas, grifos, cisternas, termos e instalaciones.',
    'Electricistas para averias, cuadros, enchufes, iluminacion y mantenimiento.',
    'Desatascos profesionales para tuberias, fregaderos, WC, arquetas y bajantes.',
    'Climatizacion, calefaccion y limpieza preventiva de tuberias.',
  ],
  serviceAreasCtaLabel: 'Ver servicios',
  phone: { label: 'Atencion directa', number: '642 310 813' },
  footerTrustItems: [
    { icon: FileText, title: 'Presupuesto', subtitle: 'antes de empezar' },
    { icon: Receipt, title: 'Factura', subtitle: 'disponible' },
    { icon: Umbrella, title: 'Seguro RC', subtitle: '600.000 EUR' },
    { icon: Wrench, title: 'Tecnicos', subtitle: 'por especialidad' },
  ],
  footnote:
    'Esta pagina esta optimizada para busquedas comerciales generales de Reparar24. Las consultas especificas se trabajan en sus paginas de servicio, ciudad o distrito correspondientes.',
}

export const homepageFaqs = [
  {
    question: '¿Qué servicios ofrece Reparar24?',
    answer:
      'Reparar24 atiende reparaciones del hogar y servicios tecnicos para fontaneria, electricidad, desatascos, climatizacion, calefaccion y limpieza de tuberias. La home concentra la entrada general y cada servicio tiene su pagina especifica.',
  },
  {
    question: '¿Atendeis urgencias 24 horas?',
    answer:
      'Si. Atendemos avisos urgentes 24/7 cuando la averia no puede esperar, como fugas de agua, cortes electricos, atascos graves o problemas que afectan al uso normal de la vivienda, local o comunidad.',
  },
  {
    question: '¿Cuánto tarda en llegar un tecnico?',
    answer:
      'En zonas urbanas la respuesta orientativa para urgencias suele estar entre 30 y 60 minutos, segun disponibilidad, ubicacion y tipo de servicio. Para trabajos programados acordamos una franja de visita.',
  },
  {
    question: '¿Dais presupuesto antes de reparar?',
    answer:
      'Si. Antes de iniciar el trabajo explicamos el diagnostico, la solucion recomendada y el presupuesto. Si la reparacion necesita materiales o una intervencion mayor, se comunica antes de continuar.',
  },
  {
    question: '¿Cómo elijo el servicio correcto?',
    answer:
      'Puedes entrar desde la categoria correspondiente o contactar por telefono o WhatsApp. Si no sabes si necesitas fontanero, electricista, desatascos o climatizacion, clasificamos la averia y te dirigimos al tecnico adecuado.',
  },
]

export const homepageCommercialKeywords = [
  'reparaciones del hogar',
  'reparaciones urgentes 24 horas',
  'servicios de fontaneria y electricidad',
  'desatascos y climatizacion',
  'tecnicos profesionales',
  'presupuesto previo',
]
