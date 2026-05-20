export interface Service {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  longDescription: string
  benefits: string[]
  priceRange: string
  available24h: boolean
  keywords: string[]
}

export const services: Service[] = [
  {
    id: 'fontanero',
    name: 'Fontanería',
    slug: 'fontanero',
    icon: '🔧',
    description: 'Fontanero urgente 24h en Valencia. Reparación de fugas, tuberías, grifos. Profesionales certificados.',
    longDescription: `¿Necesitas un fontanero urgente en Valencia? En Reparar24 ofrecemos servicio de fontanería profesional las 24 horas del día, los 7 días a la semana, incluidos festivos. Nuestro equipo de fontaneros certificados está listo para resolver cualquier emergencia o trabajo programado de fontanería en Valencia y toda la Comunidad Valenciana.

Somos especialistas en todo tipo de trabajos de fontanería. Realizamos reparación de fugas de agua con equipos de detección avanzados para localizar fugas ocultas sin romper paredes. Instalamos y reemplazamos tuberías de agua y desagüe trabajando con cobre, PVC, PEX y multicapa, garantizando instalaciones duraderas según normativa actual.

Nuestros servicios incluyen instalación de grifos de cocina, baño y termoestáticos. También instalamos inodoros, lavabos, bidés, duchas y bañeras, asesorando en la mejor opción según tus necesidades. Si tu cisterna gotea o no funciona, reparamos todo tipo de cisternas: empotradas, externas, de doble descarga, cambiando mecanismos completos si es necesario.

Ofrecemos tarifas transparentes desde 49€ para visita y diagnóstico. Reparaciones simples cuestan 60-90€, cambio de grifo 80-120€, instalación de sanitario 120-200€, y cambio de cisterna 90-150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del trabajo específico y materiales necesarios.

Disponemos de servicio de fontanero urgente 24/7 para fugas de agua graves, tuberías rotas, inundaciones y fallos en calentadores. Nuestro tiempo de respuesta es de 30-60 minutos en Valencia capital y alrededores.

Como empresa de fontanería profesional registrada en Valencia, nuestros fontaneros cuentan con certificación, experiencia comprobada y seguro de responsabilidad civil. Cumplimos toda la normativa vigente y ofrecemos garantía en todos nuestros trabajos. Confía en profesionales cualificados para tus averías de fontanería.`,
    benefits: [
      'Servicio de emergencia 24 horas',
      'Profesionales certificados',
      'Precio sin sorpresas',
      'Garantía de trabajo',
      'Presupuesto gratuito'
    ],
    priceRange: 'Desde 49€',
    available24h: true,
    keywords: [
      'fontanero urgente',
      'fontanero 24 horas',
      'servicio de fontanería',
      'fontanero profesional',
      'reparación de fugas',
      'reparación de tuberías',
      'instalación de grifos',
      'cambio de tuberías',
      'reparación fontanería',
      'fontanería urgente',
      'averías fontanería',
      'reparación de cisterna',
      'reparación calentador'
    ]
  },
  {
    id: 'electricista',
    name: 'Electricidad',
    slug: 'electricista',
    icon: '⚡',
    description: 'Electricistas profesionales para instalaciones y reparaciones',
    longDescription: 'Electricistas certificados para todo tipo de instalaciones eléctricas, reparaciones, cuadros eléctricos, iluminación y emergencias eléctricas.',
    benefits: [
      'Electricistas certificados',
      'Normativa vigente',
      'Seguridad garantizada',
      'Servicio urgente disponible',
      'Boletín eléctrico incluido'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: ['electricista', 'instalación eléctrica', 'cortocircuito', 'cuadro eléctrico', 'enchufes']
  },
  {
    id: 'desatascos',
    name: 'Desatascos',
    slug: 'desatascos',
    icon: '🚰',
    description: 'Desatascos urgentes de tuberías y desagües',
    longDescription: 'Servicio profesional de desatascos con maquinaria especializada. Desatascamos tuberías, fregaderos, inodoros, desagües y arquetas.',
    benefits: [
      'Maquinaria profesional',
      'Sin romper',
      'Resultados inmediatos',
      'Disponible 24h',
      'Cámara de inspección'
    ],
    priceRange: 'Desde 69€',
    available24h: true,
    keywords: ['desatascos', 'atasco', 'desagüe', 'tubería obstruida', 'wc atascado']
  },
  {
    id: 'aire-acondicionado',
    name: 'Aire Acondicionado',
    slug: 'aire-acondicionado',
    icon: '❄️',
    description: 'Instalación y reparación de aires acondicionados',
    longDescription: 'Especialistas en instalación, mantenimiento y reparación de sistemas de aire acondicionado. Todas las marcas y modelos.',
    benefits: [
      'Instaladores oficiales',
      'Mantenimiento preventivo',
      'Reparaciones rápidas',
      'Recarga de gas',
      'Garantía del fabricante'
    ],
    priceRange: 'Desde 79€',
    available24h: false,
    keywords: ['aire acondicionado', 'climatización', 'split', 'mantenimiento', 'instalación']
  },
  {
    id: 'calefaccion',
    name: 'Calefacción',
    slug: 'calefaccion',
    icon: '🔥',
    description: 'Instalación y mantenimiento de sistemas de calefacción',
    longDescription: 'Servicios completos de calefacción: calderas, radiadores, suelo radiante, bomba de calor. Instalación, reparación y mantenimiento.',
    benefits: [
      'Técnicos especializados',
      'Todas las marcas',
      'Certificado de gas',
      'Mantenimiento anual',
      'Reparaciones urgentes'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: ['calefacción', 'caldera', 'radiadores', 'suelo radiante', 'calentador']
  },
  {
    id: 'limpieza-tuberias',
    name: 'Limpieza de Tuberías',
    slug: 'limpieza-tuberias',
    icon: '💧',
    description: 'Limpieza profesional de tuberías y saneamientos',
    longDescription: 'Servicio de limpieza profesional de tuberías con camión cuba. Eliminamos atascos, residuos y aseguramos el correcto funcionamiento.',
    benefits: [
      'Camión cuba profesional',
      'Alta presión',
      'Sin obras',
      'Inspección con cámara',
      'Preventivo y correctivo'
    ],
    priceRange: 'Desde 89€',
    available24h: true,
    keywords: ['limpieza tuberías', 'camión cuba', 'alta presión', 'saneamiento']
  }
]
