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
    description: 'Fontanero urgente 24h. Reparación de fugas, tuberías, grifos. Profesionales certificados con garantía.',
    longDescription: `¿Necesitas un fontanero urgente? En Reparar24 ofrecemos servicio de fontanería profesional las 24 horas del día, los 7 días a la semana, incluidos festivos. Nuestro equipo de fontaneros certificados está listo para resolver cualquier emergencia o trabajo programado de fontanería.

Somos especialistas en todo tipo de trabajos de fontanería. Realizamos reparación de fugas de agua con equipos de detección avanzados para localizar fugas ocultas sin romper paredes. Instalamos y reemplazamos tuberías de agua y desagüe trabajando con cobre, PVC, PEX y multicapa, garantizando instalaciones duraderas según normativa actual.

Nuestros servicios incluyen instalación de grifos de cocina, baño y termoestáticos. También instalamos inodoros, lavabos, bidés, duchas y bañeras, asesorando en la mejor opción según tus necesidades. Si tu cisterna gotea o no funciona, reparamos todo tipo de cisternas: empotradas, externas, de doble descarga, cambiando mecanismos completos si es necesario.

Ofrecemos tarifas transparentes desde 49€ para visita y diagnóstico. Reparaciones simples cuestan 60-90€, cambio de grifo 80-120€, instalación de sanitario 120-200€, y cambio de cisterna 90-150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del trabajo específico y materiales necesarios.

Disponemos de servicio de fontanero urgente 24/7 para fugas de agua graves, tuberías rotas, inundaciones y fallos en calentadores. Nuestro tiempo de respuesta es rápido en emergencias, con profesionales cercanos listos para atenderte.

Como empresa de fontanería profesional, nuestros fontaneros cuentan con certificación, experiencia comprobada y seguro de responsabilidad civil. Cumplimos toda la normativa vigente y ofrecemos garantía en todos nuestros trabajos. Confía en profesionales cualificados para tus averías de fontanería.`,
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
    description: 'Electricista urgente 24h. Reparación de averías eléctricas, cortocircuitos, cuadros eléctricos. Certificados y boletín.',
    longDescription: `¿Necesitas un electricista urgente? En Reparar24 ofrecemos servicio eléctrico profesional disponible las 24 horas del día, los 7 días de la semana, incluidos festivos. Nuestro equipo de electricistas certificados está preparado para resolver cualquier emergencia eléctrica o trabajo programado de instalación eléctrica.

Somos especialistas en todo tipo de reparaciones eléctricas y averías eléctricas. Atendemos cortocircuitos, fallos eléctricos y saltos de diferencial con respuesta inmediata. Realizamos diagnóstico preciso de la causa del problema eléctrico mediante equipos de medición profesionales, garantizando soluciones efectivas y seguras según normativa vigente.

Nuestros servicios incluyen reparación de cuadros eléctricos, actualización de instalaciones antiguas, reparación de enchufes e interruptores que no funcionan correctamente, e instalación de luces y sistemas de iluminación. También realizamos mantenimiento eléctrico preventivo y revisión eléctrica completa de tu instalación para detectar problemas antes de que se conviertan en emergencias.

Si se te va la luz en casa, salta el diferencial sin motivo aparente, o detectas señales de una avería eléctrica como chispas, olores extraños o interruptores que se calientan, es momento de llamar a un electricista profesional. No arriesgues tu seguridad intentando reparaciones eléctricas sin conocimientos: los fallos eléctricos pueden provocar incendios o descargas peligrosas.

Ofrecemos tarifas transparentes desde 59€ para visita y diagnóstico. Reparación de avería eléctrica básica 70-120€, reparación de cuadro eléctrico 90-180€, instalación de enchufes o interruptores 60-100€, instalación de iluminación 80-150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende de la complejidad del trabajo y materiales necesarios.

Disponemos de servicio de emergencia eléctrica 24/7 para cortocircuitos graves, fallos en el cuadro eléctrico, instalaciones que saltan constantemente, u olores a quemado de origen eléctrico. Nuestro tiempo de respuesta es rápido en emergencias eléctricas, con electricistas preparados para intervenir inmediatamente.

Como empresa de servicios eléctricos profesional, nuestros electricistas cuentan con certificación oficial, experiencia comprobada y seguro de responsabilidad civil. Cumplimos toda la normativa eléctrica vigente y emitimos boletín eléctrico cuando es necesario. Todos nuestros trabajos incluyen garantía. Confía en electricistas profesionales cualificados para tus instalaciones y reparaciones eléctricas.`,
    benefits: [
      'Servicio urgente 24 horas',
      'Electricistas certificados oficialmente',
      'Boletín eléctrico incluido',
      'Cumplimiento normativa vigente',
      'Garantía en todos los trabajos'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: [
      'electricista urgente',
      'electricista 24 horas',
      'servicio eléctrico',
      'electricista profesional',
      'reparación eléctrica',
      'averías eléctricas',
      'instalación eléctrica',
      'cortocircuito',
      'fallo eléctrico',
      'cuadro eléctrico',
      'enchufes e interruptores',
      'instalación de luces',
      'reparación de enchufes',
      'salto de diferencial',
      'mantenimiento eléctrico',
      'revisión eléctrica',
      'emergencia eléctrica'
    ]
  },
  {
    id: 'desatascos',
    name: 'Desatascos',
    slug: 'desatascos',
    icon: '🚰',
    description: 'Desatascos urgentes 24h. Servicio profesional con maquinaria especializada. Sin romper, resultados inmediatos.',
    longDescription: `¿Necesitas un desatasco urgente? En Reparar24 ofrecemos servicio profesional de desatascos disponible las 24 horas del día, los 7 días de la semana, incluidos festivos. Nuestro equipo especializado está equipado con maquinaria profesional para resolver cualquier atasco de tuberías de forma rápida y eficaz.

Somos especialistas en todo tipo de desatascos. Realizamos desatasco de fregaderos, lavabos, duchas y bañeras utilizando técnicas avanzadas que no requieren romper suelos ni paredes. Nuestros profesionales cuentan con sondas eléctricas, equipos de alta presión y cámaras de inspección para localizar y eliminar atascos incluso en las tuberías más difíciles de acceder.

Atendemos emergencias de desatascos en inodoros y WC atascados, un problema común que requiere atención inmediata. También realizamos desatasco de bajantes, arquetas y desagües generales. Nuestro servicio incluye inspección con cámara para identificar la causa del atasco: acumulación de residuos, objetos extraños, raíces de árboles o problemas estructurales en las tuberías.

Ofrecemos tarifas transparentes desde 69€ para desatascos básicos. Desatasco de fregadero o lavabo 69-90€, desatasco de inodoro 80-110€, desatasco de bajantes 120-180€, y desatasco con cámara de inspección desde 150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende de la complejidad del atasco y la técnica necesaria.

Disponemos de servicio de desatascos urgentes 24/7 para emergencias: inodoros completamente obstruidos, desbordamiento de aguas residuales, atascos múltiples o problemas que afectan al funcionamiento normal del hogar. Nuestro tiempo de respuesta es rápido, con profesionales preparados para atender tu emergencia.

Como empresa de desatascos profesional, utilizamos técnicas no invasivas que protegen tus instalaciones. Trabajamos con equipos de última generación: sondas eléctricas rotativas, máquinas de alta presión, sistemas de aspiración y cámaras de inspección HD. Todos nuestros trabajos incluyen garantía y seguimos protocolos de higiene y seguridad. Confía en profesionales cualificados para resolver tus problemas de tuberías atascadas.`,
    benefits: [
      'Servicio urgente 24 horas',
      'Sin romper suelos ni paredes',
      'Maquinaria profesional especializada',
      'Cámara de  inspección incluida',
      'Garantía en todos los trabajos'
    ],
    priceRange: 'Desde 69€',
    available24h: true,
    keywords: [
      'desatascos urgentes',
      'desatascos 24 horas',
      'servicio de desatascos',
      'empresa de desatascos',
      'desatasco de tuberías',
      'desatasco urgente',
      'desatascos profesionales',
      'desatasco de fregadero',
      'desatasco de lavabo',
      'desatasco de ducha',
      'tuberías atascadas',
      'desatasco de bajantes',
      'desatasco de desagües'
    ]
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
