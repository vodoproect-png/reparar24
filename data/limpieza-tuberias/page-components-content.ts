import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import type OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'

export const limpiezaTuberiasServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: 'Servicios de limpieza de tuberias',
  title: 'Mantenimiento, camara y limpieza profesional de redes de saneamiento',
  subtitle: 'Categoria enfocada en comunidades, empresas, hosteleria y redes privadas: no duplica desatascos domesticos.',
  phoneHref: 'tel:+34642310813',
  phoneLabel: '642 310 813',
  whatsappHref: 'https://wa.me/34642310813?text=Hola%2C%20necesito%20limpieza%20profesional%20de%20tuber%C3%ADas.%20%C2%BFPueden%20ayudarme%3F',
  whatsappLabel: 'WhatsApp',
  searchPlaceholder: 'Buscar servicio de limpieza de tuberias',
  summaryCountLabel: '6 servicios de limpieza de tuberias',
  summaryDescription: 'Camara, arquetas, colectores, bajantes, comunidades, empresas, alta presion y camion cuba.',
  trustItems: [
    { icon: 'ShieldCheck', label: 'Presupuesto previo' },
    { icon: 'ClipboardCheck', label: 'Factura disponible' },
    { icon: 'Construction', label: 'Equipo profesional' },
    { icon: 'Search', label: 'Diagnostico claro' },
  ],
  groups: [
    {
      id: 'diagnostico',
      label: 'Diagnostico y saneamiento',
      icon: 'Search',
      services: [
        {
          icon: 'Search',
          title: 'Inspeccion de Tuberias con Camara',
          description: 'Diagnostico CCTV para atascos repetidos, roturas, raices, pendientes y defectos ocultos.',
          href: '/limpieza-tuberias/inspeccion-camara-tuberias',
          featured: true,
        },
        {
          icon: 'Construction',
          title: 'Limpieza de Arquetas y Colectores',
          description: 'Limpieza de arquetas, colectores, acometidas y redes privadas con equipo profesional.',
          href: '/limpieza-tuberias/limpieza-arquetas-colectores',
          featured: true,
        },
      ],
    },
    {
      id: 'comunidades',
      label: 'Comunidades',
      icon: 'Construction',
      services: [
        {
          icon: 'Wrench',
          title: 'Limpieza de Bajantes',
          description: 'Mantenimiento de bajantes en edificios y comunidades para reducir atascos y olores.',
          href: '/limpieza-tuberias/limpieza-bajantes',
        },
        {
          icon: 'ShieldCheck',
          title: 'Limpieza de Tuberias en Comunidades',
          description: 'Planes preventivos para bajantes, arquetas, colectores, garajes y redes comunes.',
          href: '/limpieza-tuberias/limpieza-tuberias-comunidades',
        },
      ],
    },
    {
      id: 'empresas-equipo',
      label: 'Empresas y alta presion',
      icon: 'Construction',
      services: [
        {
          icon: 'Construction',
          title: 'Limpieza para Empresas y Hosteleria',
          description: 'Restaurantes, hoteles, cocinas industriales, separadores de grasas y locales.',
          href: '/limpieza-tuberias/limpieza-tuberias-empresas',
        },
        {
          icon: 'Gauge',
          title: 'Alta Presion y Camion Cuba',
          description: 'Hidrocurado, agua a presion, aspiracion y limpieza profunda de redes.',
          href: '/limpieza-tuberias/limpieza-alta-presion-camion-cuba',
        },
      ],
    },
  ],
}

export const limpiezaTuberiasTrustSignalsContent: TrustSignalsV1Props = {
  badge: 'Garantias Reparar24',
  title: 'Limpieza profesional sin obras innecesarias',
  subtitle: 'Primero diagnosticamos el tramo y despues proponemos limpieza, camara, alta presion o mantenimiento.',
  stats: [
    { icon: 'Clock', color: 'blue', headline: 'Diagnostico', description: 'Antes de intervenir' },
    { icon: 'Shield', color: 'orange', headline: 'Equipo', description: 'Cuba y alta presion si procede' },
    { icon: 'ShieldCheck', color: 'green', headline: 'Garantia', description: 'Trabajo comprobado' },
    { icon: 'FileText', color: 'purple', headline: 'Factura', description: 'Para comunidades y empresas' },
  ],
  bottomItems: [
    { icon: 'UserCheck', label: 'Tecnicos identificados' },
    { icon: 'FileText', label: 'Presupuesto previo' },
    { icon: 'Tag', label: 'Mantenimiento programado' },
  ],
}

export const limpiezaTuberiasProcessStepsContent = {
  badge: 'Como trabajamos',
  title: 'Del diagnostico a la red limpia',
  subtitle: 'Evitamos actuar a ciegas: revisamos acceso, sintomas y alcance antes de elegir el metodo.',
  steps: [
    { number: '01', color: 'blue', title: 'Revisamos el problema', description: 'Arquetas, bajantes, colectores, olores, retornos o atascos repetidos.', iconSrc: '/icons/process-3d-01-contacto.webp' },
    { number: '02', color: 'green', title: 'Definimos equipo', description: 'Camara, alta presion, cuba, aspiracion o limpieza manual segun el caso.', iconSrc: '/icons/process-3d-02-valoracion.webp' },
    { number: '03', color: 'orange', title: 'Limpiamos la red', description: 'Actuamos desde puntos de acceso existentes, con presion controlada.', iconSrc: '/icons/process-3d-03-reparacion.webp' },
    { number: '04', color: 'purple', title: 'Comprobamos resultado', description: 'Probamos evacuacion y dejamos recomendacion de mantenimiento.', iconSrc: '/icons/process-3d-04-garantia.webp' },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Sin obras a ciegas', description: 'La camara se usa cuando aporta valor.' },
    { icon: 'FileText', title: 'Presupuesto claro', description: 'Antes de movilizar equipo pesado.' },
    { icon: 'Clock', title: 'Plan preventivo', description: 'Ideal para comunidades y negocios.' },
  ],
} satisfies Parameters<typeof ProcessStepsV3>[0]

export const limpiezaTuberiasPricingSectionContent = {
  badge: 'Precios orientativos',
  title: 'Tarifas segun red, acceso y equipo necesario',
  subtitle: 'La limpieza de tuberias depende de longitud, acceso, volumen de residuos, camara, alta presion o camion cuba.',
  featuredBadgeText: 'Frecuente',
  fromLabel: 'Desde',
  pricingPlans: [
    { title: 'Diagnostico', price: 'Consultar', color: 'blue', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', featured: true, features: ['Acceso', 'Sintomas', 'Presupuesto previo'] },
    { title: 'Camara', price: 'Consultar', color: 'green', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', features: ['Videoinspeccion', 'Localizacion', 'Diagnostico'] },
    { title: 'Arquetas', price: 'Consultar', color: 'orange', iconSrc: '/icons/pricing-3d-03-desatascos.webp', features: ['Lodos', 'Grasas', 'Olores'] },
    { title: 'Cuba / Alta presion', price: 'Consultar', color: 'red', iconSrc: '/icons/pricing-3d-04-urgencias.webp', features: ['Hidrocurado', 'Aspiracion', 'Redes grandes'] },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Presupuesto previo', description: 'Sin movilizar equipo pesado sin explicar coste.' },
    { icon: 'FileText', title: 'Factura disponible', description: 'Comunidades, empresas y particulares.' },
    { icon: 'XCircle', title: 'Sin promesas falsas', description: 'Si hay rotura, lo indicamos.' },
  ],
  disclaimer: 'Precios orientativos sujetos a ciudad, acceso, longitud, residuos, equipo necesario y horario.',
} satisfies Parameters<typeof PricingSectionV1>[0]

export const limpiezaTuberiasOpinionesClientesContent = {
  rating: '4.8/5',
  reviewCount: 'Casos atendidos',
  badge: 'Opiniones de clientes',
  title: 'Clientes que evitaron atascos mayores',
  subtitle: 'Casos habituales de comunidades, arquetas, bajantes y negocios.',
  verifiedLabel: 'Cliente atendido',
  reviews: [
    { name: 'Administrador de fincas', quote: 'Nos revisaron arquetas y bajantes de una comunidad con olores repetidos. Presupuesto claro y trabajo limpio.' },
    { name: 'Restaurante en Valencia', quote: 'Limpiaron la red de cocina y el separador de grasas fuera de horario. Pudimos abrir al dia siguiente.' },
    { name: 'Comunidad de vecinos', quote: 'La camara mostro donde estaba el problema. Evitamos abrir media zona comun sin saber.' },
  ],
  trustItems: [
    { icon: 'Users', title: '4.8/5', description: 'Opiniones de clientes', showStars: true },
    { icon: 'ShieldCheck', title: 'Garantia', description: 'Trabajo comprobado' },
    { icon: 'MapPin', title: 'Valencia', description: 'Cobertura local' },
  ],
} satisfies Parameters<typeof OpinionesClientesV1>[0]
