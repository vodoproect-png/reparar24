import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import type OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'

export const aireAcondicionadoServicesDirectoryContent: ServicesDirectoryV2Props = {
  badge: 'Servicios de climatizacion',
  title: 'Soluciones de aire acondicionado para vivienda, local y comunidad',
  subtitle: 'Cada servicio responde a una intencion comercial diferente: instalar, reparar, mantener, recargar gas o revisar sistemas por conductos.',
  phoneHref: 'tel:+34642310813',
  phoneLabel: '642 310 813',
  whatsappHref: 'https://wa.me/34642310813?text=Hola%2C%20necesito%20un%20servicio%20de%20aire%20acondicionado.%20%C2%BFPueden%20ayudarme%3F',
  whatsappLabel: 'WhatsApp',
  searchPlaceholder: 'Buscar servicio de climatizacion',
  summaryCountLabel: '11 servicios de aire acondicionado',
  summaryDescription: 'Instalacion, reparacion, mantenimiento, gas, conductos, split, bomba de calor, cassette, preinstalacion y climatizacion para negocios.',
  trustItems: [
    { icon: 'ShieldCheck', label: 'Presupuesto claro' },
    { icon: 'Award', label: 'Tecnicos profesionales' },
    { icon: 'Clock', label: 'Respuesta rapida' },
    { icon: 'CreditCard', label: 'Factura disponible' },
  ],
  groups: [
    {
      id: 'instalacion',
      label: 'Instalacion',
      icon: 'Flame',
      services: [
        {
          icon: 'Wrench',
          title: 'Instalacion de Aire Acondicionado',
          description: 'Montaje de equipos split, multisplit o bomba de calor con ubicacion, desague y conexion revisados.',
          href: '/aire-acondicionado/instalacion-aire-acondicionado',
          featured: true,
        },
        {
          icon: 'Flame',
          title: 'Instalacion de Split',
          description: 'Instalamos split y multisplit para salon, dormitorios, oficinas y locales con presupuesto previo.',
          href: '/aire-acondicionado/instalacion-split',
          featured: true,
        },
        {
          icon: 'Gauge',
          title: 'Aire Acondicionado por Conductos',
          description: 'Instalacion, revision y reparacion de sistemas por conductos para viviendas y locales.',
          href: '/aire-acondicionado/aire-acondicionado-conductos',
        },
        {
          icon: 'Search',
          title: 'Preinstalacion de Aire Acondicionado',
          description: 'Revision y preparacion de tuberias, desague y conexion antes del montaje del equipo.',
          href: '/aire-acondicionado/preinstalacion-aire-acondicionado',
        },
      ],
    },
    {
      id: 'servicio-tecnico',
      label: 'Servicio tecnico',
      icon: 'Wrench',
      services: [
        {
          icon: 'Wrench',
          title: 'Reparacion de Aire Acondicionado',
          description: 'Diagnostico de equipos que no enfrian, pierden agua, hacen ruido o muestran errores.',
          href: '/aire-acondicionado/reparacion-aire-acondicionado',
          featured: true,
        },
        {
          icon: 'ShieldCheck',
          title: 'Mantenimiento de Aire Acondicionado',
          description: 'Limpieza de filtros, revision de desague, bateria, rendimiento y funcionamiento antes del calor.',
          href: '/aire-acondicionado/mantenimiento-aire-acondicionado',
          featured: true,
        },
        {
          icon: 'Gauge',
          title: 'Carga de Gas Aire Acondicionado',
          description: 'Comprobacion de presiones, deteccion de fugas y recarga de gas refrigerante cuando procede.',
          href: '/aire-acondicionado/carga-gas-aire-acondicionado',
        },
        {
          icon: 'Fan',
          title: 'Limpieza de Conductos',
          description: 'Limpieza y revision de conductos, rejillas, retorno y malos olores en sistemas centralizados.',
          href: '/aire-acondicionado/limpieza-conductos-aire-acondicionado',
        },
      ],
    },
    {
      id: 'sistemas',
      label: 'Sistemas y empresas',
      icon: 'Snowflake',
      services: [
        {
          icon: 'Flame',
          title: 'Bomba de Calor y Climatizacion',
          description: 'Instalacion y revision de equipos frio/calor, bomba de calor inverter y rendimiento en modo calor.',
          href: '/aire-acondicionado/bomba-calor',
          featured: true,
        },
        {
          icon: 'Fan',
          title: 'Aire Acondicionado Cassette y Techo',
          description: 'Instalacion y reparacion de cassette, suelo techo y equipos para locales u oficinas.',
          href: '/aire-acondicionado/aire-acondicionado-cassette-techo',
        },
        {
          icon: 'ShieldCheck',
          title: 'Empresa de Climatizacion',
          description: 'Servicio para locales, oficinas, comercios y comunidades con factura y planificacion.',
          href: '/aire-acondicionado/empresa-climatizacion',
        },
      ],
    },
  ],
}

export const aireAcondicionadoTrustSignalsContent: TrustSignalsV1Props = {
  badge: 'Garantias Reparar24',
  title: 'Por que elegirnos para climatizacion',
  subtitle: 'Diagnostico claro, presupuesto antes de intervenir y soluciones proporcionadas al estado real del equipo.',
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

export const aireAcondicionadoProcessStepsContent = {
  badge: 'Como trabajamos',
  title: 'Del diagnostico a la climatizacion funcionando',
  subtitle: 'Primero revisamos el equipo o la instalacion; despues proponemos la solucion adecuada.',
  steps: [
    { number: '01', color: 'blue', title: 'Revisamos el caso', description: 'Tipo de equipo, sintomas, potencia, ubicacion y acceso a unidades.', iconSrc: '/icons/process-3d-01-contacto.webp' },
    { number: '02', color: 'green', title: 'Damos presupuesto', description: 'Explicamos si conviene instalar, reparar, limpiar, recargar gas o sustituir piezas.', iconSrc: '/icons/process-3d-02-valoracion.webp' },
    { number: '03', color: 'orange', title: 'Intervenimos', description: 'Trabajamos con herramientas adecuadas para climatizacion, drenaje y conexion electrica.', iconSrc: '/icons/process-3d-03-reparacion.webp' },
    { number: '04', color: 'purple', title: 'Comprobamos', description: 'Verificamos frio/calor, condensados, ruido y funcionamiento antes de cerrar.', iconSrc: '/icons/process-3d-04-garantia.webp' },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Solucion proporcionada', description: 'No cambiamos piezas sin diagnostico.' },
    { icon: 'FileText', title: 'Explicacion clara', description: 'Sabes que se hace y por que.' },
    { icon: 'Clock', title: 'Temporada de calor', description: 'Priorizamos equipos parados en uso intensivo.' },
  ],
} satisfies Parameters<typeof ProcessStepsV3>[0]

export const aireAcondicionadoPricingSectionContent = {
  badge: 'Precios orientativos',
  title: 'Tarifas segun servicio de aire acondicionado',
  subtitle: 'El precio final depende del equipo, acceso, materiales y complejidad. Siempre se confirma antes de intervenir.',
  featuredBadgeText: 'Frecuente',
  fromLabel: 'Desde',
  pricingPlans: [
    { title: 'Diagnostico / revision', price: '59€', color: 'blue', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', featured: true, features: ['Equipo no enfria', 'Fallo o ruido', 'Presupuesto previo'] },
    { title: 'Mantenimiento', price: '79€', color: 'green', iconSrc: '/icons/pricing-3d-01-diagnostico.webp', features: ['Limpieza filtros', 'Revision desague', 'Prueba funcionamiento'] },
    { title: 'Carga de gas', price: 'Consultar', color: 'orange', iconSrc: '/icons/pricing-3d-03-desatascos.webp', features: ['Comprobacion presiones', 'Deteccion fuga', 'Gas segun equipo'] },
    { title: 'Instalacion split', price: 'Consultar', color: 'red', iconSrc: '/icons/pricing-3d-04-urgencias.webp', features: ['Montaje completo', 'Materiales', 'Desague y prueba'] },
  ],
  trustItems: [
    { icon: 'ShieldCheck', title: 'Presupuesto previo', description: 'No empezamos sin explicar el coste.' },
    { icon: 'FileText', title: 'Factura disponible', description: 'Para viviendas, locales y comunidades.' },
    { icon: 'XCircle', title: 'Sin recargas a ciegas', description: 'Revisamos antes de cargar gas.' },
  ],
  disclaimer: 'Precios orientativos sujetos a ciudad, horario, acceso, marca, refrigerante y estado del equipo.',
} satisfies Parameters<typeof PricingSectionV1>[0]

export const aireAcondicionadoOpinionesClientesContent = {
  rating: '4.8/5',
  reviewCount: 'Casos atendidos',
  badge: 'Opiniones de clientes',
  title: 'Clientes que recuperaron el confort sin sorpresas',
  subtitle: 'Casos habituales de instalacion, reparacion y mantenimiento de climatizacion.',
  verifiedLabel: 'Cliente atendido',
  reviews: [
    { name: 'Laura M.', quote: 'El split no enfriaba y pensabamos que habia que cambiarlo. Revisaron, limpiaron y quedo funcionando.' },
    { name: 'Oficina en Valencia', quote: 'Necesitabamos mantenimiento antes del verano. Fueron claros con el precio y la revision.' },
    { name: 'Carlos R.', quote: 'Nos instalaron un equipo nuevo explicando donde colocar la unidad exterior y el desague.' },
  ],
  trustItems: [
    { icon: 'Users', title: '4.8/5', description: 'Opiniones de clientes', showStars: true },
    { icon: 'ShieldCheck', title: 'Garantia', description: 'Trabajo comprobado' },
    { icon: 'MapPin', title: 'Valencia', description: 'Cobertura local' },
  ],
} satisfies Parameters<typeof OpinionesClientesV1>[0]
