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
    description: 'Fontanero urgente 24h. Reparación de fugas, instalación de grifos y sanitarios. Profesionales certificados con garantía.',
    longDescription: `¿Necesitas un fontanero urgente? En Reparar24 ofrecemos servicio de fontanería profesional las 24 horas del día, los 7 días a la semana, incluidos festivos. Nuestro equipo de fontaneros certificados está listo para resolver cualquier emergencia o trabajo programado de fontanería.

Somos especialistas en todo tipo de trabajos de fontanería. Realizamos reparación de fugas de agua con equipos de detección avanzados para localizar fugas ocultas sin romper paredes. Instalamos y reemplazamos conducciones de agua y desagüe trabajando con cobre, PVC, PEX y multicapa, garantizando instalaciones duraderas según normativa actual.

Nuestros servicios incluyen instalación de grifos de cocina, baño y termoestáticos. También instalamos inodoros, lavabos, bidés, duchas y bañeras, asesorando en la mejor opción según tus necesidades. Si tu cisterna gotea o no funciona, reparamos todo tipo de cisternas: empotradas, externas, de doble descarga, cambiando mecanismos completos si es necesario.

Ofrecemos tarifas transparentes desde 49€ para visita y diagnóstico. Reparaciones simples cuestan 60-90€, cambio de grifo 80-120€, instalación de sanitario 120-200€, y cambio de cisterna 90-150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del trabajo específico y materiales necesarios.

Disponemos de servicio de fontanero urgente 24/7 para fugas de agua graves, roturas en conducciones, inundaciones y fallos en calentadores. Nuestro tiempo de respuesta es rápido en emergencias, con profesionales cercanos listos para atenderte.

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
      'instalación fontanería',
      'instalación de grifos',
      'instalación de sanitarios',
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
    description: 'Servicio profesional de desatascos con camión cuba. Desatascos industriales, comunidades de vecinos y saneamiento. Maquinaria especializada.',
    longDescription: `En Reparar24 somos empresa especializada en desatascos profesionales con capacidad para intervenciones de cualquier envergadura. Disponemos de camión cuba, equipos de alta presión, maquinaria industrial y tecnología de inspección avanzada para desatascos complejos que requieren soluciones profesionales.

Nuestro servicio se enfoca en desatascos de gran escala y complejidad: comunidades de vecinos con bajantes colapsadas, edificios completos con problemas de saneamiento, locales comerciales, restaurantes, industrias, y cualquier instalación que requiera equipamiento profesional más allá de los desatascos domésticos básicos.

Realizamos desatasco de colectores generales, redes de saneamiento, bajantes comunitarias de edificios, arquetas principales y sistemas de evacuación complejos. Trabajamos con camión cuba para limpieza por aspiración e inyección a alta presión, especialmente efectivo en obstrucciones por acumulación de grasas, lodos o residuos sólidos en conducciones de gran diámetro.

Para comunidades de propietarios ofrecemos contratos de mantenimiento preventivo que incluyen revisión periódica de bajantes, limpieza programada de arquetas, inspección con cámara de circuito cerrado y detección temprana de problemas antes de que se conviertan en emergencias costosas. Proporcionamos informes técnicos detallados para administradores de fincas.

Nuestro servicio industrial incluye desatasco y limpieza de tuberías en restaurantes y cocinas comerciales donde la acumulación de grasas es un problema recurrente, sistemas de evacuación en naves industriales, y desatascos en instalaciones que requieren cumplimiento de normativas específicas de saneamiento.

Disponemos de equipos de alta presión (hasta 200 bar) para eliminar obstrucciones resistentes, raíces de árboles que invaden conducciones enterradas, y residuos solidificados. Nuestra flota incluye camiones cuba con capacidad de hasta 10,000 litros para trabajos de gran volumen.

Realizamos inspección con cámara robotizada de tuberías desde 100mm hasta 600mm de diámetro, generando informes con grabación en vídeo para diagnóstico preciso de roturas, hundimientos, conexiones irregulares o problemas estructurales en redes de saneamiento.

Como empresa de desatascos profesional trabajamos para administradores de fincas, comunidades de vecinos, empresas, restaurantes, hoteles, centros comerciales e industrias que requieren servicio técnico cualificado con garantías y seguros de responsabilidad civil. Emitimos certificados y documentación técnica necesaria para inspecciones oficiales.

Consulta presupuesto personalizado según envergadura del trabajo. Desatascos comunitarios desde 200€, servicio con camión cuba desde 350€, contratos de mantenimiento preventivo desde 500€/año. Cada proyecto incluye estudio técnico, presupuesto detallado y planificación para minimizar molestias.`,
    benefits: [
      'Servicio con camión cuba y alta presión',
      'Desatascos industriales y comerciales',
      'Contratos de mantenimiento para comunidades',
      'Inspección con cámara robotizada',
      'Equipamiento profesional de gran capacidad'
    ],
    priceRange: 'Desde 200€',
    available24h: true,
    keywords: [
      'desatascos profesionales',
      'camión cuba',
      'desatascos industriales',
      'desatascos comunidades',
      'limpieza de colectores',
      'saneamiento profesional',
      'desatasco de bajantes',
      'empresa de desatascos',
      'alta presión desatascos',
      'mantenimiento bajantes',
      'inspección con cámara',
      'desatascos comerciales',
      'limpieza arquetas'
    ]
  },
  {
    id: 'aire-acondicionado',
    name: 'Aire Acondicionado',
    slug: 'aire-acondicionado',
    icon: '❄️',
    description: 'Reparación de aire acondicionado urgente. Técnicos especializados en instalación y mantenimiento. Todas las marcas de split.',
    longDescription: `¿Necesitas reparación de aire acondicionado urgente? En Reparar24 ofrecemos servicio de aire acondicionado profesional con técnicos especializados disponibles para resolver cualquier avería de aire acondicionado, realizar instalaciones y mantenimiento de aire acondicionado de todas las marcas y modelos.

Somos especialistas en reparación split y sistemas de climatización. Si tu aire acondicionado no enfría correctamente, hace ruidos extraños, pierde agua, o presenta mal olor aire acondicionado, nuestros técnicos de aire acondicionado diagnostican y solucionan el problema rápidamente. Atendemos averías comunes como falta de refrigeración, fugas de gas, problemas con el compresor, o fallos en el sistema de drenaje.

Un problema frecuente es cuando el aire acondicionado no enfría. Las causas pueden ser: nivel bajo de gas refrigerante, filtros sucios obstruidos, condensador sucio, fallo en el compresor, o termostato descalibrado. Nuestros técnicos realizan diagnóstico completo para identificar la causa específica y aplicar la reparación adecuada, ya sea carga de gas aire acondicionado, limpieza de componentes, o sustitución de piezas.

La fuga de gas aire acondicionado es una avería que requiere atención profesional inmediata. Si notas pérdida de rendimiento progresiva o formación de hielo en la unidad, puede indicar fuga. Nuestros técnicos localizan la fuga, reparan el punto de escape, realizan vacío del sistema y recargan con la cantidad exacta de gas refrigerante según especificaciones del fabricante.

Realizamos instalación de aire acondicionado y instalación split profesional para viviendas, oficinas y locales comerciales. Trabajamos con todas las marcas: Daikin, Mitsubishi, Samsung, LG, Fujitsu, Panasonic y más. La instalación incluye: montaje de unidad interior y exterior, conexiones frigoríficas y  eléctricas, vacío del sistema, carga de gas, y pruebas de funcionamiento completas.

El mantenimiento de aire acondicionado preventivo es esencial para eficiencia energética y durabilidad del equipo. Recomendamos revisión de aire acondicionado anual que incluye: limpieza de filtros profunda, limpieza de intercambiadores de calor, comprobación de presiones, verificación de conexiones eléctricas, limpieza del circuito de drenaje, y comprobación de niveles de refrigerante. El mantenimiento previene averías, reduce consumo eléctrico y mejora calidad del aire.

Ofrecemos tarifas transparentes desde 79€ para visita y diagnóstico. Limpieza y mantenimiento básico 60-90€, carga de gas aire acondicionado 90-150€, reparación de averías 100-200€ según problema, instalación split desde 350€ según potencia. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del tipo de trabajo y materiales necesarios.

Como empresa de servicios de climatización profesional, nuestros técnicos cuentan con certificación de gases fluorados obligatoria, experiencia en todas las marcas, y seguro de responsabilidad civil. Utilizamos equipos profesionales para carga de gas y detección de fugas. Cumplimos toda la normativa vigente de instalaciones frigoríficas. Todos nuestros trabajos incluyen garantía. Confía en técnicos de aire acondicionado cualificados para tus instalaciones, reparaciones y mantenimiento.`,
    benefits: [
      'Técnicos certificados en gases fluorados',
      'Todas las marcas de aire acondicionado',
      'Instalación profesional con garantía',
      'Mantenimiento preventivo anual',
      'Reparaciones con piezas originales'
    ],
    priceRange: 'Desde 79€',
    available24h: false,
    keywords: [
      'reparación de aire acondicionado',
      'aire acondicionado urgente',
      'técnico de aire acondicionado',
      'servicio de aire acondicionado',
      'averías de aire acondicionado',
      'mantenimiento de aire acondicionado',
      'instalación de aire acondicionado',
      'aire acondicionado no enfría',
      'fuga de gas aire acondicionado',
      'carga de gas aire acondicionado',
      'limpieza de filtros',
      'revisión de aire acondicionado',
      'instalación split',
      'reparación split',
      'climatizador averiado',
      'aire acondicionado hace ruido',
      'mal olor aire acondicionado'
    ]
  },
  {
    id: 'calefaccion',
    name: 'Calefacción',
    slug: 'calefaccion',
    icon: '🔥',
    description: 'Reparación de calefacción urgente. Técnicos especializados en calderas y radiadores. Averías, mantenimiento y revisiones.',
    longDescription: `¿Necesitas reparación de calefacción urgente? En Reparar24 ofrecemos servicio de calefacción profesional disponible las 24 horas del día, los 7 días de la semana. Nuestro equipo de técnicos de calefacción especializados está preparado para resolver cualquier avería de calefacción o realizar trabajos de instalación y mantenimiento de calefacción.

Somos especialistas en reparación de calderas y sistemas de calefacción central. Si tu caldera presenta un fallo de caldera, no arranca, hace ruidos extraños, o tiene problemas en el circuito, nuestros técnicos identifican y solucionan la avería rápidamente. Realizamos reparación de calderas de gas, gasoil y eléctricas, trabajando con todas las marcas y modelos.

Un problema frecuente es la presión baja en caldera. Si la presión está por debajo de 1 bar, la caldera no funciona correctamente. Nuestros técnicos comprueban si hay fugas en el sistema, reparan válvulas defectuosas y restablecen la presión adecuada. También atendemos averías relacionadas con termostatos, válvulas de seguridad y sistemas de encendido.

Realizamos reparación de radiadores que no calientan, uno de los problemas de calefacción más comunes. Si algunos radiadores no calientan uniformemente, realizamos purgado de radiadores para eliminar el aire acumulado. También solucionamos fugas en radiadores, reemplazamos válvulas defectuosas y hacemos instalación de radiadores nuevos cuando es necesario renovar el sistema.

Nuestro servicio incluye mantenimiento de calefacción preventivo y revisión de calefacción completa. El mantenimiento anual de la caldera es obligatorio por normativa y garantiza eficiencia energética y seguridad. Realizamos limpieza de quemadores, comprobación de presiones, revisión de válvulas de seguridad, y análisis de combustión para asegurar el correcto funcionamiento del sistema de calefacción.

Ofrecemos tarifas transparentes desde 59€ para visita y diagnóstico. Reparación de avería de caldera básica 80-150€, reparación de radiadores 60-100€, purgado del sistema completo 70-120€, mantenimiento anual de caldera 80-120€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del tipo de avería y materiales necesarios.

Disponemos de calefacción urgente 24/7 para emergencias: caldera que no arranca en pleno invierno, fuga de gas, pérdida total de calefacción, o problemas graves de presión. Nuestro tiempo de respuesta es rápido en emergencias de calefacción, con técnicos preparados para restablecer el servicio inmediatamente.

Como empresa de servicios de calefacción profesional, nuestros técnicos cuentan con certificación de gas, experiencia en todas las marcas de calderas, y seguro de responsabilidad civil. Cumplimos toda la normativa vigente de instalaciones térmicas. Emitimos certificados de mantenimiento obligatorios. Todos nuestros trabajos incluyen garantía. Confía en técnicos de calefacción cualificados para tus reparaciones y mantenimiento.`,
    benefits: [
      'Servicio urgente 24 horas',
      'Técnicos con certificado de gas',
      'Todas las marcas de calderas',
      'Mantenimiento con certificado',
      'Garantía en reparaciones'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: [
      'reparación de calefacción',
      'calefacción urgente',
      'servicio de calefacción',
      'técnico de calefacción',
      'averías de calefacción',
      'reparación de radiadores',
      'reparación de calderas',
      'radiadores que no calientan',
      'problemas de calefacción',
      'purgado de radiadores',
      'fallo de caldera',
      'presión baja en caldera',
      'mantenimiento de calefacción',
      'instalación de radiadores',
      'revisión de calefacción',
      'calefacción central',
      'sistema de calefacción'
    ]
  },
  {
    id: 'limpieza-tuberias',
    name: 'Limpieza de Tuberías',
    slug: 'limpieza-tuberias',
    icon: '💧',
    description: 'Limpieza industrial y preventiva de tuberías con camión cuba. Para comunidades, hoteles, restaurantes y empresas.',
    longDescription: `¿Necesitas limpieza preventiva profesional de tuberías y redes de saneamiento? En Reparar24 ofrecemos servicio especializado de limpieza industrial de tuberías con camión cuba de alta capacidad, orientado a comunidades de propietarios, hoteles, restaurantes, centros comerciales y empresas que requieren mantenimiento programado de sus instalaciones de saneamiento.

Nuestro servicio de limpieza de tuberías con camión cuba está diseñado para mantenimiento preventivo de redes comunitarias, instalaciones hosteleras y edificios corporativos. Realizamos limpieza a alta presión de bajantes comunitarias, colectores generales, arquetas de gran volumen, redes de alcantarillado interior y sistemas de saneamiento industrial. Trabajamos con equipos profesionales de camión cuba que garantizan limpieza profunda sin necesidad de obras ni roturas.

Somos especialistas en mantenimiento preventivo programado para comunidades de propietarios. Realizamos limpieza periódica de bajantes verticales comunitarias, limpieza de colectores horizontales de sótano, limpieza de arquetas generales del edificio, y limpieza de acometidas a red pública. Este mantenimiento preventivo evita atascos graves, malos olores en zonas comunes, y problemas de saneamiento que afectan a múltiples viviendas. Recomendamos limpieza preventiva anual o semestral según volumen de uso.

Para hoteles y apartamentos turísticos, ofrecemos servicio de limpieza industrial de tuberías adaptado a alta ocupación. Realizamos limpieza preventiva de redes de saneamiento en temporada baja, limpieza de grasa acumulada en cocinas industriales hosteleras, mantenimiento de bajantes con alta carga de uso, y limpieza de sistemas de drenaje en zonas comunes y lavanderías. Trabajamos fuera de horario de huéspedes para no afectar operaciones.

Nuestro servicio para restaurantes, bares y locales de hostelería incluye limpieza especializada de tuberías con grasa industrial acumulada. Realizamos limpieza de alta presión en redes afectadas por grasa solidificada, limpieza de separadores de grasas, mantenimiento preventivo de bajantes de cocina, y limpieza de arquetas con residuos orgánicos. Cumplimos normativa de saneamiento hostelero y emitimos certificados de limpieza para inspecciones sanitarias.

Para centros comerciales, oficinas y naves industriales, ofrecemos limpieza de redes de saneamiento de gran volumen. Realizamos limpieza de colectores principales con camión cuba, limpieza de arquetas de alcantarillado interior, mantenimiento preventivo de acometidas, y limpieza de redes afectadas por residuos industriales específicos. Trabajamos con plan de mantenimiento anual para garantizar funcionamiento continuo.

Ofrecemos tarifas transparentes desde 150€ para servicios básicos de comunidades pequeñas. Limpieza preventiva comunidad (bajante vertical) 150-250€, limpieza colector horizontal con camión cuba 280-450€, limpieza integral edificio comunitario 400-800€ según número de plantas, mantenimiento preventivo anual hoteles desde 600€ según capacidad, limpieza industrial restaurante 180-350€. Cada servicio incluye presupuesto personalizado sin compromiso según complejidad de instalación.

Utilizamos camión cuba profesional de alta capacidad con sistema de aspiración y alta presión combinados. Nuestros equipos incluyen cámara de inspección CCTV para verificar estado de tuberías, manómetros de presión controlada, y sistemas de limpieza que no dañan tuberías antiguas. Realizamos informes técnicos con fotografías del antes y después, recomendaciones de mantenimiento futuro, y certificados de limpieza para administradores de fincas.

Como empresa especializada en limpieza industrial de tuberías y saneamiento preventivo, trabajamos con administradores de fincas, gerentes de hotel, responsables de restauración, y facility managers de empresas. Ofrecemos contratos de mantenimiento preventivo anual, facturación adaptada a empresas y comunidades, y emisión de certificados para cumplimiento normativo. Todos nuestros trabajos incluyen garantía y seguro de responsabilidad civil. Confía en profesionales especializados en limpieza preventiva de gran volumen para tus instalaciones comunitarias o empresariales.`,
    benefits: [
      'Camión cuba alta capacidad',
      'Mantenimiento preventivo programado',
      'Especialistas en comunidades y hoteles',
      'Certificados para administradores',
      'Contratos anuales disponibles'
    ],
    priceRange: 'Desde 150€',
    available24h: false, // Preventive service, not emergency
    keywords: [
      'limpieza industrial tuberías',
      'camión cuba comunidades',
      'limpieza preventiva saneamiento',
      'mantenimiento redes comunitarias',
      'limpieza tuberías hotel',
      'limpieza tuberías restaurante',
      'limpieza bajantes comunidad',
      'camión cuba alta presión',
      'limpieza colectores edificio',
      'saneamiento preventivo',
      'limpieza tuberías empresas',
      'mantenimiento alcantarillado',
      'certificado limpieza comunidad'
    ]
  }
]
