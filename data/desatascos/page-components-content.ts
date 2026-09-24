import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import type OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'

export const desatascosServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: 'Servicios de desatascos',
  title: 'Soluciones para atascos, tuberías y saneamiento',
  subtitle: 'Organizamos los servicios por tipo de obstrucción para que cada página trabaje una intención comercial clara.',
  phoneHref: 'tel:+34642310813',
  phoneLabel: '642 310 813',
  whatsappHref: 'https://wa.me/34642310813?text=Hola%2C%20necesito%20un%20servicio%20de%20desatascos.%20%C2%BFPueden%20ayudarme%3F',
  whatsappLabel: 'WhatsApp',
  searchPlaceholder: 'Buscar servicio de desatascos',
  summaryCountLabel: '6 servicios de desatascos',
  summaryDescription: 'Tuberías, fregaderos, WC, lavabos, duchas, camión cuba y fosas sépticas con presupuesto previo.',
  trustItems: [
    { icon: 'Clock', label: 'Atención 24h' },
    { icon: 'ShieldCheck', label: 'Presupuesto claro' },
    { icon: 'Award', label: 'Equipo profesional' },
    { icon: 'CreditCard', label: 'Sin sorpresas' },
  ],
  groups: [
    {
      id: 'urgencias-domesticas',
      label: 'Urgencias domésticas',
      icon: 'Droplets',
      services: [
        {
          icon: 'Droplets',
          title: 'Desatasco de Tuberías',
          description: 'Desatascamos tuberías obstruidas, desagües lentos y retornos de agua con equipo profesional.',
          href: '/desatascos/desatasco-tuberias',
          featured: true,
        },
        {
          icon: 'Wrench',
          title: 'Desatascar Fregadero',
          description: 'Solucionamos fregaderos que no tragan por grasa, restos de comida, sifón o tubería bloqueada.',
          href: '/desatascos/desatascar-fregadero',
          featured: true,
        },
        {
          icon: 'Toilet',
          title: 'Desatascar WC e Inodoro',
          description: 'Atendemos WC atascados, inodoros que rebosan y bloqueos urgentes sin dañar la instalación.',
          href: '/desatascos/desatascar-wc',
          featured: true,
        },
        {
          icon: 'ShowerHead',
          title: 'Desatascar Lavabo y Ducha',
          description: 'Eliminamos atascos por pelo, jabón, cal, malos olores y desagües lentos en baños.',
          href: '/desatascos/desatascar-lavabo-ducha',
        },
      ],
    },
    {
      id: 'profesional-comunidades',
      label: 'Comunidades y saneamiento',
      icon: 'Gauge',
      services: [
        {
          icon: 'Gauge',
          title: 'Camión Cuba',
          description: 'Camión cuba para arquetas, colectores, bajantes, alta presión y saneamiento de gran volumen.',
          href: '/desatascos/camion-cuba',
          featured: true,
        },
        {
          icon: 'Droplets',
          title: 'Limpieza de Fosas Sépticas',
          description: 'Vaciado, limpieza y mantenimiento de fosas sépticas con gestión correcta de residuos.',
          href: '/desatascos/limpieza-fosas-septicas',
        },
      ],
    },
  ],
}

export const desatascosTrustSignalsContent: TrustSignalsV1Props = {
  badge: 'Garantías Reparar24',
  title: 'Por qué elegirnos para un desatasco',
  subtitle: 'Respuesta rápida, diagnóstico claro y equipo adecuado para cada tipo de obstrucción.',
  stats: [
    { icon: 'Clock', color: 'blue', headline: '24/7', description: 'Urgencias todos los días' },
    { icon: 'ShieldCheck', color: 'green', headline: 'Presupuesto', description: 'Antes de intervenir' },
    { icon: 'Shield', color: 'orange', headline: 'Seguro RC', description: 'Trabajo profesional' },
    { icon: 'Award', color: 'purple', headline: 'Garantía', description: 'En la intervención' },
  ],
  bottomItems: [
    { icon: 'UserCheck', label: 'Técnicos identificados' },
    { icon: 'FileText', label: 'Factura disponible' },
    { icon: 'Tag', label: 'Precio claro' },
  ],
}

export const desatascosProcessStepsContent = {
  badge: 'Cómo trabajamos',
  title: 'Del atasco al desagüe funcionando',
  subtitle: 'Un proceso sencillo: diagnóstico, presupuesto, intervención y prueba final.',
  steps: [
    { number: '01', color: 'blue', title: 'Localizamos el problema', description: 'Identificamos si el atasco está en sifón, tubería, bajante, arqueta o red general.', iconSrc: '/icons/process-3d-01-contacto.webp' },
    { number: '02', color: 'green', title: 'Damos presupuesto', description: 'Explicamos el trabajo y el equipo necesario antes de empezar.', iconSrc: '/icons/process-3d-02-valoracion.webp' },
    { number: '03', color: 'orange', title: 'Desatascamos', description: 'Usamos herramienta manual, máquina, alta presión o camión cuba según el caso.', iconSrc: '/icons/process-3d-03-reparacion.webp' },
    { number: '04', color: 'purple', title: 'Comprobamos', description: 'Hacemos prueba de agua y dejamos recomendaciones para evitar repetición.', iconSrc: '/icons/process-3d-04-garantia.webp' },
  ],
  trustItems: [
    { icon: 'Clock', title: 'Respuesta rápida', description: 'Priorizamos urgencias sanitarias.' },
    { icon: 'ShieldCheck', title: 'Trabajo seguro', description: 'Sin químicos agresivos como solución principal.' },
    { icon: 'FileText', title: 'Explicación clara', description: 'Sabes qué se hace y por qué.' },
  ],
} satisfies Parameters<typeof ProcessStepsV3>[0]

export const desatascosPricingSectionContent = {
  badge: 'Precios orientativos',
  title: 'Tarifas según tipo de atasco',
  subtitle: 'El precio final depende del acceso, urgencia y equipo necesario. Siempre se confirma antes de intervenir.',
  featuredBadgeText: 'Frecuente',
  fromLabel: 'Desde',
  pricingPlans: [
    { title: 'WC o fregadero', price: '69€', color: 'blue', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', featured: true, features: ['Atasco accesible', 'Diagnóstico incluido', 'Prueba final'] },
    { title: 'Tubería interior', price: '95€', color: 'orange', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', features: ['Máquina profesional', 'Tramo obstruido', 'Presupuesto previo'] },
    { title: 'Cámara / revisión', price: '85€', color: 'green', iconSrc: '/icons/pricing-3d-03-desatascos.webp', features: ['Atascos repetidos', 'Diagnóstico visual', 'Informe verbal'] },
    { title: 'Camión cuba', price: 'Consultar', color: 'red', iconSrc: '/icons/pricing-3d-04-urgencias.webp', features: ['Arquetas y colectores', 'Aspiración', 'Alta presión'] },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Presupuesto previo', description: 'Sin empezar sin explicarte el coste.' },
    { icon: 'FileText', title: 'Factura disponible', description: 'Para viviendas, negocios y comunidades.' },
    { icon: 'XCircle', title: 'Sin químicos agresivos', description: 'Priorizamos métodos mecánicos.' },
  ],
  disclaimer: 'Precios orientativos sujetos a acceso, horario, ciudad y complejidad del atasco.',
} satisfies Parameters<typeof PricingSectionV1>[0]

export const desatascosOpinionesClientesContent = {
  rating: '4.8/5',
  reviewCount: 'Casos atendidos',
  badge: 'Opiniones de clientes',
  title: 'Clientes que resolvieron el atasco sin sorpresas',
  subtitle: 'Casos habituales en viviendas, locales y comunidades.',
  verifiedLabel: 'Cliente atendido',
  reviews: [
    { name: 'Marta G.', quote: 'El fregadero no tragaba nada. Vinieron rápido, explicaron el precio y lo dejaron funcionando.' },
    { name: 'Comunidad en Valencia', quote: 'La arqueta estaba saturada y coordinaron el camión cuba sin complicaciones.' },
    { name: 'Restaurante local', quote: 'Nos atendieron fuera de horario para no cerrar el servicio del día siguiente.' },
  ],
  trustItems: [
    { icon: 'Users', title: '4.8/5', description: 'Opiniones de clientes', showStars: true },
    { icon: 'ShieldCheck', title: 'Garantía', description: 'Intervención comprobada' },
    { icon: 'MapPin', title: 'Valencia', description: 'Cobertura local' },
  ],
} satisfies Parameters<typeof OpinionesClientesV1>[0]
