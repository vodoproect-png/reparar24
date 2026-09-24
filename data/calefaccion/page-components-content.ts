import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import type OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'

export const calefaccionServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: 'Servicios de calefaccion',
  title: 'Calderas, radiadores y sistemas de calefaccion para vivienda y comunidad',
  subtitle: 'Cada pagina responde a una intencion comercial distinta: reparar, mantener, instalar, regular o mejorar el sistema.',
  phoneHref: 'tel:+34642310813',
  phoneLabel: '642 310 813',
  whatsappHref: 'https://wa.me/34642310813?text=Hola%2C%20necesito%20un%20servicio%20de%20calefacci%C3%B3n.%20%C2%BFPueden%20ayudarme%3F',
  whatsappLabel: 'WhatsApp',
  searchPlaceholder: 'Buscar servicio de calefaccion',
  summaryCountLabel: '8 servicios de calefaccion',
  summaryDescription: 'Calderas, mantenimiento, radiadores, instalacion, suelo radiante, comunidades, termostatos y aerotermia.',
  trustItems: [
    { icon: 'ShieldCheck', label: 'Presupuesto claro' },
    { icon: 'Award', label: 'Tecnicos profesionales' },
    { icon: 'Clock', label: 'Respuesta rapida' },
    { icon: 'CreditCard', label: 'Factura disponible' },
  ],
  groups: [
    {
      id: 'calderas',
      label: 'Calderas y mantenimiento',
      icon: 'Flame',
      services: [
        {
          icon: 'Wrench',
          title: 'Reparacion de Calderas',
          description: 'Diagnostico de calderas que no encienden, pierden presion, gotean o muestran errores.',
          href: '/calefaccion',
          featured: true,
        },
        {
          icon: 'ShieldCheck',
          title: 'Mantenimiento y Revision de Calderas',
          description: 'Revision preventiva, limpieza, presiones, seguridad y puesta a punto antes del invierno.',
          href: '/calefaccion',
          featured: true,
        },
      ],
    },
    {
      id: 'radiadores-instalacion',
      label: 'Radiadores e instalacion',
      icon: 'Gauge',
      services: [
        {
          icon: 'Gauge',
          title: 'Reparacion e Instalacion de Radiadores',
          description: 'Purgado, fugas, valvulas, detentores y cambio de radiadores de calefaccion.',
          href: '/calefaccion',
          featured: true,
        },
        {
          icon: 'Wrench',
          title: 'Instalacion de Calefaccion',
          description: 'Montaje de calefaccion, calderas, radiadores y circuitos con prueba final.',
          href: '/calefaccion',
        },
      ],
    },
    {
      id: 'sistemas',
      label: 'Sistemas y regulacion',
      icon: 'Activity',
      services: [
        {
          icon: 'Flame',
          title: 'Suelo Radiante',
          description: 'Instalacion, revision y reparacion de suelo radiante de agua, colectores y zonas frias.',
          href: '/calefaccion',
        },
        {
          icon: 'Gauge',
          title: 'Calefaccion Central para Comunidades',
          description: 'Mantenimiento y reparacion de calefaccion central, sala de calderas y equilibrado.',
          href: '/calefaccion',
        },
        {
          icon: 'Activity',
          title: 'Termostatos y Valvulas Termostaticas',
          description: 'Instalacion de termostatos, cambio de controles y valvulas termostaticas de radiador.',
          href: '/calefaccion',
        },
        {
          icon: 'Flame',
          title: 'Aerotermia para Calefaccion',
          description: 'Aerotermia aplicada a calefaccion, radiadores, suelo radiante y ACS con estudio previo.',
          href: '/calefaccion',
        },
      ],
    },
  ],
}

export const calefaccionTrustSignalsContent: TrustSignalsV1Props = {
  badge: 'Garantias Reparar24',
  title: 'Por que elegirnos para calefaccion',
  subtitle: 'Diagnostico antes de cambiar piezas, presupuesto claro y soluciones proporcionadas al sistema real.',
  stats: [
    { icon: 'ShieldCheck', color: 'green', headline: 'Garantia', description: 'En trabajos realizados' },
    { icon: 'Clock', color: 'blue', headline: 'Rapidez', description: 'Citas y urgencias segun zona' },
    { icon: 'Award', color: 'purple', headline: 'Tecnicos', description: 'Servicio profesional' },
    { icon: 'Tag', color: 'orange', headline: 'Precio claro', description: 'Sin sorpresas' },
  ],
  bottomItems: [
    { icon: 'UserCheck', label: 'Tecnicos identificados' },
    { icon: 'FileText', label: 'Factura disponible' },
    { icon: 'Tag', label: 'Presupuesto previo' },
  ],
}

export const calefaccionProcessStepsContent = {
  badge: 'Como trabajamos',
  title: 'Del diagnostico al calor funcionando',
  subtitle: 'Primero revisamos el sistema; despues proponemos reparacion, mantenimiento o mejora.',
  steps: [
    { number: '01', color: 'blue', title: 'Revisamos sintomas', description: 'Caldera, radiadores, presion, termostato, valvulas y circuito.', iconSrc: '/icons/process-3d-01-contacto.webp' },
    { number: '02', color: 'green', title: 'Damos presupuesto', description: 'Explicamos si conviene reparar, mantener, purgar, ajustar o sustituir.', iconSrc: '/icons/process-3d-02-valoracion.webp' },
    { number: '03', color: 'orange', title: 'Intervenimos', description: 'Trabajamos con herramientas adecuadas para calefaccion, gas y sistemas hidraulicos.', iconSrc: '/icons/process-3d-03-reparacion.webp' },
    { number: '04', color: 'purple', title: 'Comprobamos', description: 'Verificamos presion, calor, ausencia de fugas y funcionamiento estable.', iconSrc: '/icons/process-3d-04-garantia.webp' },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Solucion proporcionada', description: 'No cambiamos piezas sin diagnostico.' },
    { icon: 'FileText', title: 'Explicacion clara', description: 'Sabes que se hace y por que.' },
    { icon: 'Clock', title: 'Temporada fria', description: 'Priorizamos sistemas parados en invierno.' },
  ],
} satisfies Parameters<typeof ProcessStepsV3>[0]

export const calefaccionPricingSectionContent = {
  badge: 'Precios orientativos',
  title: 'Tarifas segun servicio de calefaccion',
  subtitle: 'El precio final depende de la averia, sistema, piezas, acceso y ciudad. Siempre se confirma antes de intervenir.',
  featuredBadgeText: 'Frecuente',
  fromLabel: 'Desde',
  pricingPlans: [
    { title: 'Diagnostico caldera', price: '59€', color: 'blue', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', featured: true, features: ['No enciende', 'Presion baja', 'Presupuesto previo'] },
    { title: 'Mantenimiento', price: 'Consultar', color: 'green', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', features: ['Revision', 'Puesta a punto', 'Seguridad'] },
    { title: 'Radiadores', price: 'Consultar', color: 'orange', iconSrc: '/icons/pricing-3d-03-desatascos.webp', features: ['Purgado', 'Valvulas', 'Fugas'] },
    { title: 'Instalacion', price: 'Consultar', color: 'red', iconSrc: '/icons/pricing-3d-04-urgencias.webp', features: ['Caldera', 'Radiadores', 'Circuito'] },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Presupuesto previo', description: 'No empezamos sin explicar el coste.' },
    { icon: 'FileText', title: 'Factura disponible', description: 'Para viviendas, locales y comunidades.' },
    { icon: 'XCircle', title: 'Sin piezas a ciegas', description: 'Revisamos antes de sustituir.' },
  ],
  disclaimer: 'Precios orientativos sujetos a ciudad, horario, tipo de sistema, piezas, acceso y estado de la instalacion.',
} satisfies Parameters<typeof PricingSectionV1>[0]

export const calefaccionOpinionesClientesContent = {
  rating: '4.8/5',
  reviewCount: 'Casos atendidos',
  badge: 'Opiniones de clientes',
  title: 'Clientes que recuperaron calefaccion sin sorpresas',
  subtitle: 'Casos habituales de calderas, radiadores y mantenimiento.',
  verifiedLabel: 'Cliente atendido',
  reviews: [
    { name: 'Marta G.', quote: 'La caldera perdia presion cada dia. Revisaron radiadores y valvulas y nos explicaron el presupuesto antes de tocar nada.' },
    { name: 'Comunidad en Valencia', quote: 'Teniamos varios pisos con radiadores frios. Hicieron revision y equilibrado con explicaciones claras.' },
    { name: 'Javier R.', quote: 'Nos cambiaron termostato y purgaron radiadores. La calefaccion quedo funcionando mejor que antes.' },
  ],
  trustItems: [
    { icon: 'Users', title: '4.8/5', description: 'Opiniones de clientes', showStars: true },
    { icon: 'ShieldCheck', title: 'Garantia', description: 'Trabajo comprobado' },
    { icon: 'MapPin', title: 'Valencia', description: 'Cobertura local' },
  ],
} satisfies Parameters<typeof OpinionesClientesV1>[0]
