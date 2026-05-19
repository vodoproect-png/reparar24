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
    description: 'Servicios profesionales de fontanería 24 horas',
    longDescription: 'Nuestros fontaneros profesionales están disponibles 24/7 para resolver cualquier problema de fontanería. Reparación de fugas, instalación de grifos, cambio de tuberías y más.',
    benefits: [
      'Servicio de emergencia 24 horas',
      'Profesionales certificados',
      'Precio sin sorpresas',
      'Garantía de trabajo',
      'Presupuesto gratuito'
    ],
    priceRange: 'Desde 49€',
    available24h: true,
    keywords: ['fontanero', 'plomero', 'fugas', 'grifos', 'tuberías', 'sanitarios']
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
