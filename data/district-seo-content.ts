/**
 * District-Level SEO Content
 * 
 * ENTERPRISE DISTRICT SEO ROLLOUT - PHASE 1 PILOT
 * 
 * Governance Rules:
 * - Each district gets UNIQUE content
 * - Minimum 95% uniqueness required
 * - Anti-cannibalization validated
 * - Semantic ownership enforced
 * - AI/LLM optimized
 * 
 * Content Structure:
 * - Unique meta tags (title, description)
 * - Unique bottom SEO text (600-800 chars)
 * - Unique FAQ (3-5 questions)
 */

export interface DistrictSEO {
  serviceId: string
  citySlug: string
  districtSlug: string
  metadata: {
    title: string  // Must include district name
    description: string  // Must include district name
  }
  seoText: string  // 600-800 chars, bottom placement
  faqs: Array<{
    question: string
    answer: string
  }>
  uniquenessScore?: number  // Future: automated validation
  semanticOwnership: string[]  // Keywords owned by this page
}

/**
 * PHASE 1 PILOT: 5 Fontanero Districts
 * 
 * Strategic selection across cities and district types
 */
export const districtSEOContent: DistrictSEO[] = [
  // PILOT 1: Madrid Centro - Historic Capital Center
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'centro',
    metadata: {
      title: 'Fontanero en Centro Madrid 24h | Reparaciones Urgentes | Reparar24',
      description: 'Fontanero urgente en Centro Madrid disponible 24 horas. Reparación de fugas, desatascos y fontanería profesional en el corazón de la capital. Presupuesto sin compromiso.'
    },
    seoText: `Nuestro equipo de fontanería especializado atiende el distrito Centro de Madrid con respuesta inmediata para cualquier emergencia. Conocemos las características únicas de los edificios históricos y las comunidades de vecinos de esta zona emblemática, desde Gran Vía hasta Puerta del Sol. Ofrecemos mantenimiento preventivo para tuberías antiguas, modernización de instalaciones en edificios protegidos respetando normativas patrimoniales, y soluciones integrales adaptadas a viviendas históricas. Nuestros fontaneros están familiarizados con los sistemas tradicionales de fontanería del casco antiguo madrileño, garantizando intervenciones eficaces que preservan el carácter del inmueble mientras resuelven problemas modernos de suministro y saneamiento.`,
    faqs: [
      {
        question: '¿Atienden fontanería en edificios históricos de Centro Madrid?',
        answer: 'Sí, nuestro equipo tiene experiencia específica en edificios históricos del Centro de Madrid. Trabajamos respetando normativas de protección patrimonial y conocemos las particularidades de las instalaciones antiguas.'
      },
      {
        question: '¿Cuánto tardan en llegar a Centro Madrid?',
        answer: 'En Centro Madrid llegamos en 30-45 minutos para emergencias. Nuestra ubicación estratégica nos permite atender rápidamente desde Gran Vía hasta Lavapiés.'
      },
      {
        question: '¿Trabajan con comunidades de vecinos en Centro?',
        answer: 'Sí, colaboramos regularmente con comunidades de vecinos del Centro. Ofrecemos presupuestos especiales para trabajos colectivos y mantenimiento preventivo de instalaciones comunes.'
      },
      {
        question: '¿Qué problemas de fontanería son comunes en Centro Madrid?',
        answer: 'En Centro Madrid son frecuentes las obstrucciones por antigüedad de tuberías, fugas en bajantes compartidas, y problemas de presión en edificios altos. Nuestro equipo está especializado en estos casos.'
      }
    ],
    semanticOwnership: ['fontanero', 'centro', 'madrid', 'edificios históricos', 'casco antiguo']
  },

  // PILOT 2: Barcelona Gracia - Bohemian Residential District
  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    districtSlug: 'gracia',
    metadata: {
      title: 'Fontanero en Gràcia Barcelona | Servicio Local 24h | Reparar24',
      description: 'Servicio de fontanería profesional en Gràcia, Barcelona. Especialistas en reparación de fugas, instalación de calentadores y mantenimiento. Atención rápida en tu barrio.'
    },
    seoText: `En Gràcia conocemos cada rincón de este barrio único de Barcelona, desde la Plaza del Sol hasta Park Güell. Nuestros fontaneros locales comprenden las necesidades específicas de las viviendas modernistas y los pisos de esta zona residencial tan característica. Proporcionamos servicios integrales: desde reparación de averías urgentes en pleno verano cuando más se necesita, hasta instalación de sistemas de ahorro de agua adaptados a pisos de alquiler vacacional. Trabajamos con la comunidad local de Gràcia, ofreciendo asesoramiento personalizado para optimizar instalaciones sanitarias en edificios de principios del siglo XX, respetando su estructura original mientras incorporamos tecnología moderna que mejora eficiencia energética y reduce consumo hídrico de forma sostenible.`,
    faqs: [
      {
        question: '¿Atienden fontanería en pisos de alquiler en Gràcia?',
        answer: 'Sí, trabajamos con inquilinos y propietarios en Gràcia. Coordinamos reparaciones con el protocolo adecuado y ofrecemos presupuestos transparentes para aprobación rápida.'
      },
      {
        question: '¿Tienen experiencia con edificios modernistas de Gràcia?',
        answer: 'Sí, nuestro equipo conoce las particularidades constructivas de los edificios modernistas del barrio. Respetamos la estructura histórica en cada intervención.'
      },
      {
        question: '¿Qué cobertura tienen en Gràcia?',
        answer: 'Cubrimos todo Gràcia: desde Lesseps hasta Vallcarca, pasando por la Vila de Gràcia. Llegamos en 30-40 minutos para urgencias en cualquier punto del distrito.'
      },
      {
        question: '¿Instalan sistemas de eficiencia hídrica en Gràcia?',
        answer: 'Sí, instalamos sistemas de ahorro de agua especialmente diseñados para pisos de Gràcia. Incluye aireadores, limitadores de caudal y tecnología de bajo consumo adaptada a tu vivienda.'
      }
    ],
    semanticOwnership: ['fontanero', 'gracia', 'barcelona', 'modernista', 'eficiencia hídrica']
  },

  // PILOT 3: Valencia Ciutat Vella - Cultural Old Town
  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Fontanero Ciutat Vella Valencia | Emergencias 24h Centro Histórico',
      description: 'Fontanería profesional en Ciutat Vella, Valencia. Especialistas en el casco histórico: fugas, desatascos, instalaciones. Servicio urgente en barrios El Carmen, Velluters y Mercat.'
    },
    seoText: `Atendemos fontanería en todo Ciutat Vella de Valencia, incluyendo El Carmen, Mercat, Universidad y Velluters. Nuestro equipo especializado comprende los retos únicos del centro histórico valenciano: edificios con siglos de antigüedad, calles estrechas y sistemas de saneamiento que requieren experiencia específica. Desde reparaciones urgentes en hostelería y comercios del Mercado Central, hasta mantenimiento de viviendas en el Barrio del Carmen, ofrecemos soluciones que respetan el patrimonio arquitectónico. Trabajamos coordinadamente con la realidad del casco antiguo: accesibilidad complicada, normativas de conservación municipal, y necesidades tanto de residentes tradicionales como del sector turístico creciente que caracteriza esta zona monumental de Valencia donde conviven tradición e innovación.`,
    faqs: [
      {
        question: '¿Atienden emergencias en comercios de Ciutat Vella?',
        answer: 'Sí, damos servicio prioritario a negocios del centro histórico. Entendemos la urgencia en hostelería y comercios, especialmente en zona Mercado Central y alrededores.'
      },
      {
        question: '¿Cómo acceden a calles estrechas del Barrio del Carmen?',
        answer: 'Nuestro equipo conoce perfectamente las calles del Carmen y Velluters. Utilizamos equipamiento especializado adaptado a espacios reducidos y acceso peatonal.'
      },
      {
        question: '¿Trabajan con edificios protegidos en Ciutat Vella?',
        answer: 'Sí, tenemos experiencia con inmuebles de protección patrimonial en el casco histórico valenciano. Cumplimos todas las normativas municipales de conservación.'
      },
      {
        question: '¿Qué problemas de fontanería son típicos en Ciutat Vella Valencia?',
        answer: 'Son frecuentes obstrucciones en desagües antiguos, humedades por capilaridad en bajos, y problemas de presión. Nuestra experiencia en el casco antiguo nos permite resolverlos eficazmente.'
      }
    ],
    semanticOwnership: ['fontanero', 'ciutat vella', 'valencia', 'centro histórico', 'barrio carmen']
  },

  // PILOT 4: Sevilla Triana - Iconic Riverside District
  {
    serviceId: 'fontanero',
    citySlug: 'sevilla',
    districtSlug: 'triana',
    metadata: {
      title: 'Fontanero en Triana Sevilla | Servicio Rápido 24 Horas | Reparar24',
      description: 'Fontanero profesional en Triana, Sevilla. Reparaciones urgentes, instalaciones y mantenimiento en el barrio más emblemático. Experiencia local en viviendas tradicionales.'
    },
    seoText: `Ofrecemos servicio completo de fontanería en Triana, el barrio con más carácter de Sevilla. Conocemos las particularidades constructivas de estas viviendas tradicionales andaluzas, desde la Calle Betis junto al Guadalquivir hasta la Capilla de los Marineros. Nuestros fontaneros entienden los desafíos específicos: humedad por proximidad al río, sistemas de saneamiento en calles históricas, y la arquitectura típica trianera con patios que requieren soluciones específicas. Atendemos tanto a residentes de toda la vida como a nuevos vecinos del barrio, proporcionando mantenimiento preventivo que preserva el valor de estas propiedades únicas. Especialistas en problemas de condensación, renovación de instalaciones antiguas mantiene estilo local, y adaptación de sistemas modernos a estructuras tradicionales muy características zona.`,
    faqs: [
      {
        question: '¿Atienden problemas de humedad por el Guadalquivir en Triana?',
        answer: 'Sí, conocemos bien los problemas específicos de humedad en Triana por proximidad al río. Ofrecemos soluciones especializadas para viviendas cerca del Guadalquivir y Calle Betis.'
      },
      {
        question: '¿Tienen experiencia con patios tradicionales trianeros?',
        answer: 'Sí, trabajamos regularmente con la arquitectura típica de Triana. Nuestro equipo sabe cómo mantener instalaciones en patios andaluces respetando su carácter tradicional.'
      },
      {
        question: '¿Cuánto tardan en llegar a Triana?',
        answer: 'En Triana llegamos en 25-35 minutos para emergencias. Conocemos bien el barrio y optimizamos rutas para atención rápida en cualquier punto, desde Pureza hasta Los Remedios.'
      },
      {
        question: '¿Qué servicios de fontanería ofrecen en Triana?',
        answer: 'En Triana ofrecemos todo: reparación de fugas, desatascos, instalación de calentadores, renovación de tuberías antiguas, y mantenimiento preventivo adaptado a viviendas tradicionales del barrio.'
      }
    ],
    semanticOwnership: ['fontanero', 'triana', 'sevilla', 'guadalquivir', 'arquitectura andaluza']
  },

  // PILOT 5: Zaragoza Universidad - Student District
  {
    serviceId: 'fontanero',
    citySlug: 'zaragoza',
    districtSlug: 'universidad',
    metadata: {
      title: 'Fontanero Zona Universidad Zaragoza | Servicio Estudiantes 24h',
      description: 'Fontanería en zona Universidad de Zaragoza. Servicio rápido para estudiantes, pisos compartidos y propietarios. Reparaciones urgentes y presupuestos ajustados cerca del campus.'
    },
    seoText: `Proporcionamos servicio especializado de fontanería en el distrito Universidad de Zaragoza, atendiendo las necesidades específicas de esta zona estudiantil dinámica cerca del Campus San Francisco. Trabajamos con propietarios de pisos de estudiantes, resolviendo emergencias comunes en viviendas compartidas: atascos frecuentes, problemas con calentadores de uso intensivo, y averías causadas por desconocimiento en manipulación básica instalaciones. Ofrecemos presupuestos claros y ajustados pensando en el perfil económico de la zona, con opciones de reparación asequibles sin comprometer calidad. Nuestro equipo conoce el ritmo del barrio y horarios particulares uso viviendas estudiantes, adaptando intervenciones para minimizar molestias durante épocas exámenes. Asesoramiento preventivo propietarios invertir mejore durabilidad reducir incidencias recurrentes inquilinos rotativos característicos distrito.`,
    faqs: [
      {
        question: '¿Atienden emergencias en pisos de estudiantes en zona Universidad?',
        answer: 'Sí, atendemos regularmente pisos compartidos de estudiantes cerca del campus. Comprendemos la urgencia y ofrecemos presupuestos ajustados para reparaciones comunes.'
      },
      {
        question: '¿Quién paga la reparación en piso de alquiler de estudiantes?',
        answer: 'Coordinamos con propietario e inquilinos según caso. Para averías urgentes actuamos rápido y luego gestionamos facturación según responsabilidades contractuales.'
      },
      {
        question: '¿Qué problemas de fontanería son frecuentes en zona Universidad?',
        answer: 'Son comunes atascos en pisos compartidos, problemas con calentadores por uso intensivo, y goteos en grifos. Nuestro equipo resuelve eficazmente estos casos típicos del distrito.'
      },
      {
        question: '¿Ofrecen mantenimiento preventivo para propietarios con inquilinos estudiantes?',
        answer: 'Sí, ofrecemos planes de mantenimiento preventivo en zona Universidad. Ayudamos a propietarios a reducir averías recurrentes con revisiones programadas adaptadas a pisos de alquiler estudiantil.'
      }
    ],
    semanticOwnership: ['fontanero', 'universidad', 'zaragoza', 'estudiantes', 'campus']
  },

  // PHASE 2 EXPANSION: 10 Additional Strategic Districts
  
  // PILOT 6: Madrid Salamanca - Upscale/Luxury Residential
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'salamanca',
    metadata: {
      title: 'Fontanería Salamanca Madrid | Servicio Premium 24h | Reparar24',
      description: 'Fontanero especializado en Salamanca, Madrid. Servicio profesional para viviendas de alto standing. Discreción, calidad y respuesta inmediata. Presupuesto personalizado.'
    },
    seoText: 'Ofrecemos fontanería especializada en el distrito de Salamanca, adaptada a las exigencias de propiedades premium y viviendas de alto standing. Nuestro equipo comprende las particularidades de inmuebles señoriales en calles como Serrano, Velázquez o Jorge Juan, donde la discreción y calidad son fundamentales. Trabajamos con materiales de primera categoría para intervenciones en baños de diseño, cocinas equipadas de lujo y sistemas de climatización avanzados. Mantenemos protocolos estrictos de limpieza y profesionalidad, adaptándonos a las necesidades de comunidades exclusivas y propietarios exigentes que valoran la excelencia en cada detalle del servicio.',
    faqs: [
      {
        question: '¿Trabajan con materiales premium para viviendas de alto standing?',
        answer: 'Sí, en Salamanca trabajamos exclusivamente con marcas reconocidas y materiales de primera calidad. Nuestros profesionales tienen experiencia con instalaciones de lujo y equipamiento sofisticado característico del distrito.'
      },
      {
        question: '¿Mantienen discreción y protocolos especiales en comunidades exclusivas?',
        answer: 'Absolutamente. Entendemos las necesidades de discreción en Salamanca. Nuestro equipo sigue protocolos estrictos de presentación, limpieza y respeto a las normas de cada comunidad de propietarios.'
      },
      {
        question: '¿Qué tiempo de respuesta tienen en Salamanca?',
        answer: 'Priorizamos emergencias en Salamanca con tiempo de respuesta de 30-45 minutos en horario diurno. Para servicios programados ofrecemos flexibilidad horaria adaptada a la disponibilidad de propietarios.'
      },
      {
        question: '¿Ofrecen contratos de mantenimiento para propiedades en Salamanca?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo personalizados para viviendas y comunidades en Salamanca, con revisiones programadas que preservan el valor de propiedades premium.'
      }
    ],
    semanticOwnership: ['fontanero', 'salamanca', 'madrid', 'alto standing', 'premium']
  },

  // PILOT 7: Madrid Chamberí - Mixed Residential/Commercial
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'chamberi',
    metadata: {
      title: 'Fontanero Chamberí Madrid | Reparaciones Locales y Viviendas 24h',
      description: 'Servicio de fontanería en Chamberí para negocios locales y viviendas. Especialistas en comercios, oficinas y pisos del barrio. Atención rápida en tu zona.'
    },
    seoText: 'Atendemos fontanería en Chamberí tanto para hogares como para el tejido comercial del distrito. Desde Trafalgar hasta Vallehermoso, conocemos las instalaciones típicas de edificios residenciales de principios del siglo XX y las necesidades específicas de bares, restaurantes, oficinas y comercios locales del barrio. Resolvemos emergencias en horas comerciales sin interrumpir la actividad empresarial, y ofrecemos soluciones rápidas para viviendas con problemas de presión de agua o tuberías antiguas. Nuestro equipo está familiarizado con la arquitectura mixta de Chamberí, combinando experiencia residencial con conocimiento de instalaciones profesionales.',
    faqs: [
      {
        question: '¿Atienden emergencias en comercios de Chamberí durante horario laboral?',
        answer: 'Sí, priorizamos emergencias en negocios de Chamberí para minimizar tiempo de cierre. Contamos con disponibilidad especial para bares, restaurantes y oficinas que necesitan solución inmediata.'
      },
      {
        question: '¿Tienen experiencia con instalaciones antiguas de Chamberí?',
        answer: 'Sí, trabajamos regularmente con edificios históricos de Chamberí. Conocemos las tuberías de plomo antiguas y sistemas originales que requieren tratamiento especializado respetando la estructura del inmueble.'
      },
      {
        question: '¿Qué tipo de comercios atienden en Chamberí?',
        answer: 'Atendemos todo tipo de negocios: restaurantes, cafeterías, oficinas, clínicas, peluquerías y comercios locales. Adaptamos horarios de intervención para no afectar el servicio al cliente.'
      },
      {
        question: '¿Solucionan problemas de baja presión en pisos de Chamberí?',
        answer: 'Sí, es un problema frecuente en edificios antiguos de Chamberí. Diagnosticamos si es obstrucción, válvulas antiguas o deficiencia en acometida, y proponemos la solución más efectiva.'
      }
    ],
    semanticOwnership: ['fontanero', 'chamberi', 'madrid', 'comercios', 'mixto']
  },

  // PILOT 8: Madrid Retiro - Parks/Elegant Housing
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'retiro',
    metadata: {
      title: 'Fontanero en Retiro Madrid | Servicio Residencial de Calidad 24h',
      description: 'Fontanería profesional en distrito Retiro. Especialistas en viviendas clásicas y edificios junto al Parque del Retiro. Servicio de confianza para tu hogar.'
    },
    seoText: 'Proporcionamos servicio de fontanería en el distrito Retiro, especializado en viviendas residenciales de ambiente tranquilo y edificios clásicos cercanos al parque. Atendemos zonas como Ibiza, Jerónimos y Pacífico, donde las propiedades combinan elegancia tradicional con confort moderno. Nuestros fontaneros entienden las necesidades de familias que valoran la tranquilidad y buscan intervenciones profesionales sin molestias innecesarias. Trabajamos en actualización de baños manteniendo estilo clásico, reparación de instalaciones en viviendas con años de historia, y modernización de sistemas de agua caliente. Respetamos el carácter residencial del Retiro con puntualidad y profesionalidad.',
    faqs: [
      {
        question: '¿Qué experiencia tienen con viviendas clásicas del Retiro?',
        answer: 'Trabajamos frecuentemente en el Retiro con edificios de arquitectura clásica. Sabemos cómo intervenir en baños y cocinas conservando elementos originales mientras modernizamos instalaciones obsoletas.'
      },
      {
        question: '¿Hacen renovaciones de baños en zona Retiro?',
        answer: 'Sí, realizamos reformas completas de baño respetando el estilo arquitectónico del Retiro. Desde actualizaciones funcionales hasta renovaciones completas manteniendo elegancia y calidad.'
      },
      {
        question: '¿Cuánto tardan en llegar al distrito Retiro?',
        answer: 'Nuestro tiempo habitual de llegada al Retiro es de 35-50 minutos dependiendo de la zona específica. Mantenemos puntualidad y avisamos si hay cualquier retraso.'
      },
      {
        question: '¿Ofrecen revisiones de fontanería en viviendas antiguas del Retiro?',
        answer: 'Sí, recomendamos revisiones periódicas en edificios antiguos del Retiro para detectar desgaste en tuberías, fugas ocultas y prevenir averías costosas. Ofrecemos servicio de inspección completa.'
      }
    ],
    semanticOwnership: ['fontanero', 'retiro', 'madrid', 'residencial', 'elegante']
  },

  // PILOT 9: Madrid Chamartín - Business/Modern District
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'chamartin',
    metadata: {
      title: 'Fontanería Chamartín Madrid | Servicios Empresariales y Modernos 24h',
      description: 'Fontanero en Chamartín para oficinas, edificios modernos y zona empresarial. Soluciones profesionales en distrito financiero de Madrid. Rapidez garantizada.'
    },
    seoText: 'Servicio de fontanería en Chamartín orientado al entorno empresarial y residencial moderno del distrito. Desde la zona financiera de AZCA hasta las viviendas contemporáneas de Prosperidad, ofrecemos soluciones adaptadas a edificios de nueva construcción, oficinas corporativas y espacios comerciales. Nuestro equipo maneja tecnología en instalaciones modernas: sistemas de climatización eficientes, grifería electrónica, y fontanería domótica. Entendemos la importancia de rapidez en entornos profesionales donde cada hora cuenta, y mantenemos disponibilidad para intervenciones urgentes que no interrumpan operaciones empresariales. Combinamos eficiencia técnica con servicio ágil.',
    faqs: [
      {
        question: '¿Atienden oficinas y edificios empresariales en Chamartín?',
        answer: 'Sí, somos especialistas en fontanería para entorno corporativo en Chamartín. Trabajamos con property managers, administradores de edificios y empresas que necesitan respuesta profesional inmediata.'
      },
      {
        question: '¿Tienen experiencia con instalaciones modernas y domótica?',
        answer: 'Sí, nuestro equipo está formado en tecnología de fontanería actual: grifería inteligente, sistemas de ahorro de agua, sensores automáticos y fontanería integrada con domótica de edificios modernos.'
      },
      {
        question: '¿Qué rapidez de respuesta ofrecen en zona empresarial?',
        answer: 'Priorizamos emergencias empresariales en Chamartín con respuesta objetivo de 30 minutos en horario laboral. Comprendemos el impacto de averías en entornos corporativos.'
      },
      {
        question: '¿Trabajan fuera de horario en oficinas de Chamartín?',
        answer: 'Sí, ofrecemos intervenciones nocturnas y fines de semana en oficinas de Chamartín para no interrumpir actividad diaria. Coordinamos horarios según necesidades operativas.'
      }
    ],
    semanticOwnership: ['fontanero', 'chamartin', 'madrid', 'empresarial', 'moderno']
  },

  // PILOT 10: Barcelona Eixample - Modernist Grid
  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    districtSlug: 'eixample',
    metadata: {
      title: 'Fontanero Eixample Barcelona | Especialistas Arquitectura Modernista',
      description: 'Fontanería en Eixample Barcelona. Expertos en edificios modernistas y viviendas del Ensanche. Respeto arquitectónico y soluciones profesionales. Servicio 24 horas.'
    },
    seoText: 'Especialistas en fontanería para el Eixample de Barcelona, donde la arquitectura modernista y el trazado en cuadrícula definen el carácter del barrio. Desde Passeig de Gràcia hasta Fort Pilar, trabajamos con edificios emblemáticos que requieren sensibilidad arquitectónica y conocimiento de instalaciones originales de época. Nuestros fontaneros comprenden las particularidades de viviendas modernistas con techos altos, molduras decorativas y distribuciones originales de Cerdà. Realizamos intervenciones que respetan patrimonio arquitectónico mientras modernizamos sistemas hidráulicos obsoletos. Combinamos técnicas tradicionales con soluciones contemporáneas adaptadas a vida urbana actual del Ensanche barcelonés.',
    faqs: [
      {
        question: '¿Trabajan con edificios modernistas protegidos del Eixample?',
        answer: 'Sí, tenemos amplia experiencia en edificios modernistas del Eixample. Conocemos normativas de protección patrimonial y trabajamos respetando elementos originales mientras actualizamos fontanería.'
      },
      {
        question: '¿Cómo gestionan instalaciones en pisos con techos altos del Eixample?',
        answer: 'Disponemos de equipamiento especializado para trabajos en altura característicos del Eixample. Manejamos intervenciones en techos de 4+ metros conservando molduras y decoración original.'
      },
      {
        question: '¿Conocen la problemática de cañerías antiguas en Eixample?',
        answer: 'Sí, las tuberías originales de plomo y hierro fundido son comunes en Eixample. Evaluamos si es necesario reemplazo completo o si reparaciones parciales son viables según estado real.'
      },
      {
        question: '¿Qué zonas del Eixample cubren?',
        answer: 'Cubrimos todo el Eixample: izquierdo, derecho, Sagrada Familia, Sant Antoni. Llegamos rápidamente a cualquier punto del distrito gracias a su trazado regular y bien conectado.'
      }
    ],
    semanticOwnership: ['fontanero', 'eixample', 'barcelona', 'modernista', 'ensanche']
  },

  // PILOT 11: Barcelona Sants - Working-Class/Transport Hub
  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    districtSlug: 'sants',
    metadata: {
      title: 'Fontanero Sants Barcelona | Servicio Local Rápido y Económico 24h',
      description: 'Fontanería en Sants, Barcelona. Servicio cercano para vecinos del barrio. Precios justos, trabajo honesto. Emergencias 24h en tu zona.'
    },
    seoText: 'Fontanería de confianza para el barrio de Sants, donde atendemos familias trabajadoras y comunidades de vecinos con servicio honesto y precios transparentes. Desde la Estación hasta Hostafrancs, conocemos las viviendas populares del distrito y las necesidades reales de hogares que buscan soluciones efectivas sin costes innecesarios. Reparamos averías comunes en pisos de alquiler, solucionamos problemas de presión en edificios sin ascensor, y ofrecemos alternativas económicas cuando el presupuesto es ajustado. Nuestro compromiso es calidad accesible adaptada a la realidad del barrio, con trato cercano y comprensión de que cada euro cuenta en economías familiares.',
    faqs: [
      {
        question: '¿Ofrecen presupuestos ajustados para vecinos de Sants?',
        answer: 'Sí, en Sants trabajamos con precios justos y transparencia total. Explicamos todas las opciones disponibles, desde solución económica hasta ideal, para que cada familia decida según su presupuesto.'
      },
      {
        question: '¿Atienden pisos de alquiler en Sants?',
        answer: 'Sí, trabajamos frecuentemente con inquilinos y propietarios en Sants coordinando reparaciones necesarias. Facilitamos comunicación entre partes para resolver averías sin conflictos.'
      },
      {
        question: '¿Qué problemas son más frecuentes en Sants?',
        answer: 'Atendemos muchas obstrucciones, goteras, problemas de calentadores antiguos y baja presión en pisos altos sin ascensor. Son situaciones típicas en edificios populares del barrio.'
      },
      {
        question: '¿Cobran desplazamiento en Sants?',
        answer: 'No cobramos desplazamiento dentro de Sants para intervenciones que superan importe mínimo. Somos del barrio y queremos mantener servicio local accesible para todos los vecinos.'
      }
    ],
    semanticOwnership: ['fontanero', 'sants', 'barcelona', 'popular', 'accesible']
  },

  // PILOT 12: Valencia L'Eixample - Expansion District
  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    districtSlug: 'leixample',
    metadata: {
      title: 'Fontanero L\'Eixample Valencia | Zona Ensanche y Gran Vía 24h',
      description: 'Fontanería en L\'Eixample Valencia. Servicio en zona Gran Vía, Russafa conexión y Ensanche valenciano. Atención profesional en tu distrito.'
    },
    seoText: 'Servicio de fontanería en L\'Eixample de Valencia, el Ensanche que conecta centro histórico con zonas modernas de la ciudad. Cubrimos desde Gran Vía hasta límites de Russafa, atendiendo tanto viviendas tradicionales valencianas como edificios renovados del área de expansión. Conocemos la mezcla arquitectónica característica del distrito: pisos señoriales de inicios del XX conviven con reformas integrales contemporáneas. Nuestro equipo maneja esta diversidad con soluciones adaptadas a cada tipo de propiedad, desde conservar instalaciones clásicas funcionales hasta modernizar completamente sistemas obsoletos. Ofrecemos asesoramiento sobre mejoras eficientes adaptadas al estilo de vida urbano valenciano.',
    faqs: [
      {
        question: '¿Cubren toda la zona de L\'Eixample en Valencia?',
        answer: 'Sí, cubrimos completamente L\'Eixample valenciano: Gran Vía, calles del Ensanche y zona límite con Russafa. Conocemos bien toda el área de expansión de la ciudad.'
      },
      {
        question: '¿Hacen reformas de fontanería en pisos antiguos del Ensanche?',
        answer: 'Sí, realizamos renovaciones completas de fontanería en viviendas antiguas del Ensanche valenciano. Muchos pisos mantienen instalaciones originales que necesitan actualización integral.'
      },
      {
        question: '¿Qué tiempo de respuesta manejan en L\'Eixample?',
        answer: 'Llegamos a L\'Eixample en 25-40 minutos según tráfico urbano. La cercanía del distrito al centro facilita desplazamientos rápidos en situaciones urgentes.'
      },
      {
        question: '¿Trabajan con comunidades de vecinos del Ensanche?',
        answer: 'Sí, colaboramos con administradores de fincas en L\'Eixample para mantenimiento de zonas comunes, reparaciones en bajantes generales y actualizaciones de instalaciones colectivas.'
      }
    ],
    semanticOwnership: ['fontanero', 'leixample', 'valencia', 'ensanche', 'gran via']
  },

  // PILOT 13: Valencia Campanar - Suburban Residential
  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    districtSlug: 'campanar',
    metadata: {
      title: 'Fontanero Campanar Valencia | Servicio Residencial Zona Norte 24h',
      description: 'Fontanería en Campanar, Valencia. Atendemos barrios residenciales de zona norte. Servicio familiar para viviendas y chalets. Confianza y profesionalidad.'
    },
    seoText: 'Fontanería para Campanar y zona residencial norte de Valencia, donde predominan viviendas familiares, chalets pareados y urbanizaciones tranquilas. Desde Marxalenes hasta Tendetes, ofrecemos servicio adaptado al carácter residencial del distrito con atención personalizada para familias. Trabajamos en instalaciones de chalets con jardín que requieren sistemas de riego adicionales, viviendas unifamiliares con mayor complejidad hidráulica, y bloques de pisos de construcción reciente. Nuestros fontaneros comprenden las necesidades de hogares familiares: seguridad para niños, explicaciones claras a propietarios, limpieza meticulosa post-intervención. Prioritario es mantener confianza de vecinos que valoran servicio profesional cercano.',
    faqs: [
      {
        question: '¿Atienden chalets y viviendas unifamiliares en Campanar?',
        answer: 'Sí, trabajamos regularmente con chalets en Campanar. Manejamos instalaciones más complejas: múltiples baños, sistemas de riego de jardín, piscinas y calentadores de mayor capacidad.'
      },
      {
        question: '¿Instalan sistemas de riego en jardines de Campanar?',
        answer: 'Sí, instalamos y reparamos sistemas de riego automático en viviendas con jardín de Campanar. Configuramos programación eficiente adaptada al clima mediterráneo valenciano.'
      },
      {
        question: '¿Cuánto tardan en llegar a Campanar desde el centro?',
        answer: 'Llegamos a Campanar en 30-45 minutos dependiendo de tráfico. Aunque está en zona norte, mantenemos cobertura constante en todos los barrios residenciales del distrito.'
      },
      {
        question: '¿Ofrecen servicio de mantenimiento para familias en Campanar?',
        answer: 'Sí, creamos planes de mantenimiento preventivo para viviendas familiares en Campanar. Revisiones programadas ayudan a evitar averías sorpresa y mantener instalaciones en perfecto estado.'
      }
    ],
    semanticOwnership: ['fontanero', 'campanar', 'valencia', 'residencial', 'chalets']
  },

  // PILOT 14: Sevilla Nervión - Business/Shopping District
  {
    serviceId: 'fontanero',
    citySlug: 'sevilla',
    districtSlug: 'nervion',
    metadata: {
      title: 'Fontanero Nervión Sevilla | Comercios y Oficinas 24h | Reparar24',
      description: 'Fontanería en Nervión, Sevilla. Especialistas en zona comercial, oficinas y viviendas modernas. Servicio rápido en distrito empresarial sevillano.'
    },
    seoText: 'Fontanería especializada para Nervión, distrito empresarial y comercial de Sevilla con mayor concentración de oficinas, centros comerciales y servicios de la ciudad. Atendemos tanto la vertiente profesional como las viviendas modernas que caracterizan el área. Desde Luis Montoto hasta zona Viapol, nuestro equipo responde eficientemente a emergencias en locales comerciales durante horario laboral, intervenciones en edificios de oficinas que requieren coordinación con property managers, y servicio residencial en los numerosos bloques de viviendas contemporáneas. Comprendemos la dinámica comercial de Nervión donde tiempo es dinero y el cuidado profesional marca diferencia. Ofrecemos soluciones ágiles sin comprometer calidad técnica.',
    faqs: [
      {
        question: '¿Atienden emergencias en comercios y oficinas de Nervión?',
        answer: 'Sí, somos especialistas en entorno comercial de Nervión. Priorizamos averías en negocios para minimizar tiempo fuera de servicio y coordinamos con responsables para intervenciones efectivas.'
      },
      {
        question: '¿Tienen experiencia con instalaciones en centros comerciales?',
        answer: 'Sí, trabajamos con locales en centros comerciales de Nervión. Manejamos instalaciones profesionales: baños públicos, fuentes de agua, sistemas de climatización y fontanería de locales hosteleros.'
      },
      {
        question: '¿Hacen intervenciones nocturnas en Nervión?',
        answer: 'Sí, ofrecemos servicio nocturno y fines de semana para oficinas y comercios de Nervión que prefieren no interrumpir horario comercial. Coordinamos con seguridad de edificios.'
      },
      {
        question: '¿Atienden también viviendas en zona Nervión?',
        answer: 'Sí, además de comercios atendemos las viviendas modernas de Nervión. Son edificios de construcción reciente con instalaciones actuales que requieren mantenimiento profesional estándar.'
      }
    ],
    semanticOwnership: ['fontanero', 'nervion', 'sevilla', 'comercial', 'empresarial']
  },

  // PILOT 15: Málaga Centro - Coastal Historic
  {
    serviceId: 'fontanero',
    citySlug: 'malaga',
    districtSlug: 'centro',
    metadata: {
      title: 'Fontanero Centro Málaga | Casco Histórico y Zona Puerto 24h',
      description: 'Fontanería en Centro de Málaga. Especialistas en casco antiguo, zona puerto y centro histórico costero. Servicio adaptado a clima mediterráneo.'
    },
    seoText: 'Servicio de fontanería en el Centro histórico de Málaga, donde el clima costero mediterráneo y la arquitectura andaluza tradicional requieren atención especializada. Desde Calle Larios hasta zona del puerto, trabajamos con la mezcla característica de turismo, residencia local y comercio del corazón malagueño. Nuestros fontaneros comprenden desafíos específicos: humedad salina que acelera corrosión de tuberías, instalaciones en edificios antiguos del casco histórico con estructura irregular, y alta demanda de viviendas turísticas que necesitan respuesta inmediata. Combinamos conocimiento de fontanería tradicional andaluza con soluciones modernas adaptadas a vida urbana costera. Entendemos la importancia de calidad duradera en entorno marino.',
    faqs: [
      {
        question: '¿Tienen experiencia con problemas de humedad salina en Málaga?',
        answer: 'Sí, el ambiente marino de Málaga acelera desgaste de instalaciones. Usamos materiales resistentes a corrosión salina y recomendamos revisiones preventivas en zona costera.'
      },
      {
        question: '¿Atienden apartamentos turísticos en el Centro?',
        answer: 'Sí, trabajamos con gestores de alojamientos turísticos en Centro de Málaga. Ofrecemos respuesta rápida para no afectar reservas y mantenimiento preventivo entre temporadas.'
      },
      {
        question: '¿Cómo acceden a edificios antiguos del casco histórico?',
        answer: 'Tenemos experiencia navegando calles estrechas del centro histórico malagueño. Llevamos herramientas portátiles y nos adaptamos a accesos complicados típicos de edificios antiguos.'
      },
      {
        question: '¿Qué cobertura tienen en Centro de Málaga?',
        answer: 'Cubrimos todo el Centro: desde Muelle Uno hasta barrio de La Merced, incluyendo Soho, zona Alameda y casco antiguo. Respuesta rápida en toda el área central costera.'
      }
    ],
    semanticOwnership: ['fontanero', 'centro', 'malaga', 'costero', 'historico']
  },

  // WAVE 3 CURATED ROLLOUT: 8 Additional Strategic Districts with Enhanced Operational Realism

  // WAVE 3.1: Madrid Arganzuela - Industrial-Adjacent/Transit Hub
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'arganzuela',
    metadata: {
      title: 'Servicio Fontanería Arganzuela Madrid | Zona Atocha y Matadero',
      description: 'Fontanero Arganzuela, Madrid. Especialistas en edificios junto a Atocha, Matadero y zona industrial reconvertida. Conocemos tuberías antiguas del distrito.'
    },
    seoText: 'Nuestro servicio en Arganzuela abarca desde la Estación de Atocha hasta el Matadero Madrid, conociendo las particularidades de un distrito en transformación. Trabajamos con edificios de diferentes épocas: viviendas obreras históricas con tuberías de plomo que requieren reemplazo cuidadoso, bloques de pisos de los años 70-80 con bajantes de fibrocemento, y lofts modernos en antiguas naves industriales donde adaptamos fontanería a espacios diáfanos. La proximidad al Manzanares y zonas históricamente industriales significa lidiar con humedades por capilaridad en plantas bajas. Entendemos problemas de presión en edificios altos sin renovación de acometida, y gestionamos coordinación con comunidades en calles estrechas de acceso complicado cerca del río.',
    faqs: [
      {
        question: '¿Trabajan con las tuberías antiguas de plomo en Arganzuela?',
        answer: 'Sí, Arganzuela tiene muchas viviendas obreras históricas con instalaciones de plomo originales. Evaluamos si es necesario reemplazo completo por normativa sanitaria o si tramos específicos pueden mantenerse temporalmente según el estado real.'
      },
      {
        question: '¿Cómo acceden a edificios cerca de Atocha con restricciones?',
        answer: 'Conocemos las limitaciones de tráfico y carga/descarga en zona Atocha. Planificamos horarios de acceso, usamos equipos portátiles y coordinamos con administradores para intervenciones eficientes minimizando molestias.'
      },
      {
        question: '¿Atienden lofts en antiguas naves del Matadero?',
        answer: 'Sí, trabajamos regularmente en conversiones industriales de Arganzuela. Manejamos fontanería vista, instalaciones en espacios abiertos y adaptaciones a distribuciones no convencionales típicas de lofts.'
      },
      {
        question: '¿Qué problemas son comunes en edificios de los 70-80 en Arganzuela?',
        answer: 'Frecuentemente bajantes de fibrocemento deterioradas, problemas de presión por acometidas subdimensionadas, y fugas en terrazas comunitarias. Ofrecemos diagnóstico completo antes de proponer soluciones.'
      }
    ],
    semanticOwnership: ['fontanero', 'arganzuela', 'madrid', 'atocha', 'industrial']
  },

  // WAVE 3.2: Madrid Tetuán - Dense Apartment Blocks/Immigrant Communities
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    districtSlug: 'tetuan',
    metadata: {
      title: 'Fontanero Tetuán Madrid | Barrio Multiétnico Zona Norte',
      description: 'Fontanería en Tetuán, Madrid. Servicio en Bravo Murillo y barrios diversos del distrito. Comunicación clara, precios transparentes para todas las comunidades.'
    },
    seoText: 'Damos servicio en todo Tetuán, desde Bravo Murillo hasta Cuatro Caminos, un distrito denso y diverso donde priorizamos comunicación clara con todas las comunidades. Trabajamos en bloques de alta densidad con múltiples viviendas por planta donde averías en bajantes afectan a muchos vecinos simultáneamente, por lo que coordinamos reparaciones urgentes con agilidad. Conocemos realidad de pisos compartidos, subarrend os y viviendas multigeneracionales donde uso intensivo de instalaciones requiere mantenimiento frecuente. Ofrecemos presupuestos detallados y explicados en lenguaje sencillo, respetamos diversidad cultural del barrio, y entendemos que muchas familias buscan soluciones económicas sin comprometer seguridad. Gestionamos problemas típicos: obstrucciones frecuentes, calentadores sobredimensionados para uso compartido, y fugas en baños con tráfico alto.',
    faqs: [
      {
        question: '¿Ofrecen presupuestos claros para familias de Tetuán?',
        answer: 'Sí, en Tetuán trabajamos con transparencia total. Explicamos cada partida del presupuesto en lenguaje sencillo, ofrecemos opciones desde lo esencial hasta lo ideal, y respetamos decisiones económicas de cada familia.'
      },
      {
        question: '¿Cómo manejan averías que afectan a muchos vecinos?',
        answer: 'En bloques densos de Tetuán priorizamos averías colectivas en bajantes. Coordinamos con administradores o comunidades, informamos a afectados, y trabajamos para resolver rápido minimizando impacto en múltiples viviendas.'
      },
      {
        question: '¿Atienden pisos compartidos y subarriendos?',
        answer: 'Sí, trabajamos con todo tipo de situaciones en Tetuán. Facilitamos comunicación entre propietarios e inquilinos para resolver averías urgentes sin conflictos, priorizando seguridad y funcionalidad.'
      },
      {
        question: '¿Qué hacer si el calentador no da para toda la familia?',
        answer: 'Problema común en Tetuán con viviendas multigeneracionales. Evaluamos si es capacidad insuficiente, obstrucción o mal ajuste, y proponemos desde optimización del actual hasta upgrade si es necesario.'
      }
    ],
    semanticOwnership: ['fontanero', 'tetuan', 'madrid', 'bravo murillo', 'denso']
  },

  // WAVE 3.3: Barcelona Poblenou - Rapidly Modernized/Tech District
  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    districtSlug: 'poblenou',
    metadata: {
      title: 'Fontanero Poblenou Barcelona | Distrito Innovación 22@',
      description: 'Fontanería Poblenou, Barcelona. Especialistas en lofts industriales, oficinas tech y viviendas modernas del 22@. Nueva fontanería en edificios reconvertidos.'
    },
    seoText: 'Servicio especializado en Poblenou, epicentro de transformación urbana barcelonesa desde zona industrial a distrito de innovación 22@. Trabajamos en conversiones de antiguas fábricas textiles a lofts y oficinas donde instalamos fontanería completamente nueva en estructuras de ladrillo visto centenarias. Manejamos oficinas de startups tecnológicas con necesidades específicas: múltiples baños, office kitchens, y sistemas eficientes. También atendemos viviendas de obra nueva en Diagonal Mar y casos mixtos donde coexisten edificios antiguos del Poblenou obrero original con rascacielos contemporáneos. Comprendemos equilibrio entre preservar carácter industrial arquitectónico y modernizar instalaciones. Proximidad al mar implica considerar corrosión salina al seleccionar materiales. Ofrecemos soluciones tecnológicas adaptadas a espíritu innovador del distrito.',
    faqs: [
      {
        question: '¿Instalan fontanería en conversiones industriales de Poblenou?',
        answer: 'Sí, es nuestra especialidad en Poblenou. Diseñamos instalaciones nuevas en antiguos espacios industriales, con fontanería vista si se desea, respetando estética loft mientras cumplimos normativas actuales.'
      },
      {
        question: '¿Trabajan con oficinas y coworking del 22@?',
        answer: 'Sí, atendemos espacios de trabajo del distrito innovación. Entendemos necesidades de empresas tech: múltiples puntos de agua, intervenciones sin interrumpir actividad, y coordinación con property managers.'
      },
      {
        question: '¿Tienen experiencia con fontanería en edificios junto al mar?',
        answer: 'Sí, Diagonal Mar y zona costera de Poblenou requieren materiales resistentes a corrosión salina. Recomendamos tuberías y grifería adecuadas al ambiente marino para mayor durabilidad.'
      },
      {
        question: '¿Qué diferencia hay entre trabajar en Poblenou antiguo vs nuevo?',
        answer: 'Poblenou antiguo tiene viviendas obreras con instalaciones a renovar. Poblenou nuevo (22@) tiene construcción moderna. Adaptamos enfoque: renovación integral en primero, mantenimiento eficiente en segundo.'
      }
    ],
    semanticOwnership: ['fontanero', 'poblenou', 'barcelona', '22@', 'industrial']
  },

  // WAVE 3.4: Barcelona Ciutat Vella - Tourist-Heavy Historic
  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Fontanero Ciutat Vella Barcelona | Gótico y Raval 24h',
      description: 'Fontanería urgente en Ciutat Vella, Barcelona. Gótico, Raval, Born. Especialistas en edificios medievales, apartamentos turísticos y patrimonio protegido.'
    },
    seoText: 'Atendemos fontanería en toda Ciutat Vella barcelonesa desde el Barrio Gótico hasta el Raval, pasando por Born y Barceloneta. El casco histórico presenta desafíos únicos: edificios medievales con muros de un metro de grosor donde pasar tuberías nuevas requiere planificación meticulosa, calles estrechas sin acceso vehicular que obligan a trabajar porteando equipos a mano, y alta concentración de apartamentos turísticos que necesitan respuesta inmediata para no afectar reservas. Trabajamos con instalaciones mixtas donde conviven tramos originales de plomo o hierro fundido con renovaciones parciales, coordinamos con Patrimonio en inmuebles protegidos, y resolvemos problemas de presión de agua en diferentes plantas por antiguedad de acometidas generales. Conocemos sobrecarga estacional que sufren instalaciones en zona turística del Gótico durante temporada alta.',
    faqs: [
      {
        question: '¿Cómo trabajan en edificios góticos sin dañar estructura?',
        answer: 'Trabajamos con técnicas especializadas en patrimonio: inspeccionamos primero recorridos existentes, usamos herramientas de precisión, y coordinamos con Patrimonio cuando edificio está catalogado para respetar elementos originales.'
      },
      {
        question: '¿Atienden emergencias en apartamentos turísticos del Gótico?',
        answer: 'Sí, ofrecemos respuesta prioritaria para alojamientos turísticos en Ciutat Vella. Entendemos que averías afectan reservas y reputación. Trabajamos rápido y limpio para no interrumpir negocio.'
      },
      {
        question: '¿Cómo acceden a edificios sin entrada de vehí culos?',
        answer: 'El casco histórico tiene calles peatonales estrechas. Usamos equipos portátiles, llegamos a pie o en moto cuando necesario, y nos adaptamos a limitaciones de acceso típicas de Ciutat Vella.'
      },
      {
        question: '¿Por qué hay problemas de presión en edificios antiguos del Raval?',
        answer: 'Muchos edificios del Raval mantienen acometidas originales subdimensionadas para densidad actual. Causa baja presión en pisos altos. Evaluamos si es obstrucción puntual o necesidad de reforma de acometida.'
      }
    ],
    semanticOwnership: ['fontanero', 'ciutat vella', 'barcelona', 'gotico', 'turistico']
  },

  // WAVE 3.5: Valencia Ruzafa/Russafa - Nightlife/Bohemian  
  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    districtSlug: 'ruzafa',
    metadata: {
      title: 'Fontanero Ruzafa Valencia | Barrio De Moda y Restauración',
      description: 'Fontanería Ruzafa/Russafa, Valencia. Servicio para bares, restaurantes y viviendas del barrio bohemio. Horarios flexibles, conocemos zona comercial.'
    },
    seoText: 'Damos servicio integral en Ruzafa (Russafa), barrio de moda valenciano con mayor densidad de bares y restaurantes per cápita. Atendemos tanto hostelería como viviendas de jóvenes profesionales y parejas que han revitalizado este distrito tradicional. Para negocios de restauración: reparamos sistemas de alta demanda en cocinas profesionales, desatascos de grasas acumuladas en desagües, y emergencias que no pueden esperar porque cada hora cerrado es pérdida económica. Ofrecemos intervenciones nocturnas o madrugada para no afectar servicio. Para viviendas: conocemos pisos antiguos con instalaciones originales que ocupan jóvenes en alquiler, balanceamos soluciones habitables con realidad presupuestaria de inquilinos. Entendemos mezcla: edificios centenarios renovados conviven con locales modernos, creando infraestructura desigual donde calibramos intervenciones caso por caso.',
    faqs: [
      {
        question: '¿Atienden emergencias en bares y restaurantes de Ruzafa?',
        answer: 'Sí, priorizamos hostelería de Ruzafa. Sabemos que un baño o cocina fuera de servicio para un bar significa cerrar. Respondemos rápido y ofrecemos opción de trabajo nocturno para no afectar servicio diurno.'
      },
      {
        question: '¿Desatascan tuberías de cocinas profesionales?',
        answer: 'Sí, trabajamos regularmente con restaurantes. Desatascamos desagües con acumulación de grasas, limpiamos sifones y recomendamos mantenimiento preventivo para evitar cierres por averías.'
      },
      {
        question: '¿Tienen precios especiales para jóvenes alquilando en Ruzafa?',
        answer: 'Ofrecemos presupuestos justos para todos. En Ruzafa muchos inquilinos jóvenes buscan soluciones económicas. Explicamos opciones desde reparación mínima hasta ideal, facilitando decisión según presupuesto.'
      },
      {
        question: '¿Qué pasa si el problema es de instalación general del edificio?',
        answer: 'En Ruzafa hay muchos edificios antiguos con instalaciones colectivas. Si detectamos problema en bajante o acometida general, explicamos a comunidad o propietario qué debe arreglarse y facilitamos coordinación.'
      }
    ],
    semanticOwnership: ['fontanero', 'ruzafa', 'valencia', 'hosteleria', 'bohemio']
  },

  // WAVE 3.6: Sevilla Centro - Tourist Historic
  {
    serviceId: 'fontanero',
    citySlug: 'sevilla',
    districtSlug: 'centro',
    metadata: {
      title: 'Fontanero Centro Sevilla | Catedral, Arenal y Santa Cruz',
      description: 'Fontanería en Centro histórico Sevilla. Especialistas en casco antiguo, zona Catedral, Arenal, Santa Cruz. Edificios andaluces tradicionales y turismo.'
    },
    seoText: 'Servicio completo de fontanería en el corazón histórico sevillano: desde la Catedral y Giralda hasta Santa Cruz, pasando por Arenal y zona Alfalfa. El centro de Sevilla combina arquitectura andaluza tradicional con altísima densidad turística que condiciona nuestro trabajo. Atendemos casas-palacio con patios centrales donde fontanería discurre por galerías perimetrales, edificios con viviendas turisticas que requieren respuesta inmediata, y negocios hosteleros en zona Alfalfa que no pueden cerrar por averías. Conocemos problemas específicos: cal acumulada en tuberías por dureza del agua sevillana, humedades ascendentes por capilaridad en plantas bajas típicas del casco antiguo, y necesidad de respetar normativa patrimonial en edificios catalogados. Trabajamos coordinando con realidad de calles estrechas sin aparcamiento y normativas de acceso al centro histórico.',
    faqs: [
      {
        question: '¿Trabajan con casas-palacio y patios andaluces del Centro?',
        answer: 'Sí, tenemos experiencia en arquitectura tradicional sevillana. Manejamos instalaciones en casas con patios, galerías y distribución andaluza tradicional, respetando elementos originales mientras modernizamos fontanería.'
      },
      {
        question: '¿Cómo solucionan problemas de cal en tuberías del Centro?',
        answer: 'El agua de Sevilla es muy dura, causa acumulación de cal. Ofrecemos desincrustación química, instalación de descalcificadores donde procede, y recomendamos mantenimiento preventivo para tuberías de agua caliente.'
      },
      {
        question: '¿Atienden apartamentos turísticos en Santa Cruz?',
        answer: 'Sí, Santa Cruz tiene alta concentración de alojamientos turísticos. Ofrecemos respuesta rápida para no afectar huéspedes, trabajamos con gestores, y hacemos mantenimiento preventivo entre temporadas.'
      },
      {
        question: '¿Cómo acceden al centro con restricciones de tráfico?',
        answer: 'Conocemos accesos y horarios permitidos en centro histórico sevillano. Coordinamos con residentes o administradores para permisos temporales, y usamos equipamiento portátil cuando acceso vehicular no es posible.'
      }
    ],
    semanticOwnership: ['fontanero', 'centro', 'sevilla', 'catedral', 'andaluz']
  },

  // WAVE 3.7: Málaga Este - Coastal Residential/Beach
  {
    serviceId: 'fontanero',
    citySlug: 'malaga',
    districtSlug: 'este',
    metadata: {
      title: 'Fontanero Este Málaga | El Palo, Pedregalejo y Playas',
      description: 'Fontanería en Este de Málaga. El Palo, Pedregalejo, zona playa. Especialistas en corrosión marina, apartamentos vacacionales y viviendas costeras.'
    },
    seoText: 'Proporcionamos servicio especializado en el distrito Este de Málaga, desde El Palo hasta Pedregalejo, zona costera residencial con características únicas. La proximidad al Mediterráneo acelera corrosión en instalaciones por humedad salina constante, lo que obliga a usar materiales específicos resistentes y revisar periódicamente termos, grifería y tuberías metálicas. Trabajamos con mezcla de viviendas principales de residentes de toda la vida y apartamentos de uso vacacional que requieren respuesta flexible para temporadas altas. Conocemos edificaciones costeras donde bomba elevadora es necesaria por cota respecto al nivel del mar, y gestión complicada de comunidades en primera línea con más mantenimiento preventivo necesario. Entendemos estacionalidad: demanda máxima en verano con mayor uso de agua, duchas de playa, y terrazas con puntos de agua exteriores que sufren mayor desgaste.',
    faqs: [
      {
        question: '¿Qué materiales recomiendan en zona costera de Málaga Este?',
        answer: 'En El Palo y Pedregalejo la brisa marina es constante. Recomendamos grifería de acero inoxidable o latón cromado de calidad, tubería de polipropileno o PEX, y evitar hierro galvanizado que se corroe rápidamente.'
      },
      {
        question: '¿Atienden apartamentos vacacionales en temporada alta?',
        answer: 'Sí, trabajamos con propietarios y gestores de alquileres turísticos en zona playa. Priorizamos averías en temporada alta para no perder reservas, y ofrecemos revisiones preventivas fuera de temporada.'
      },
      {
        question: '¿Por qué se estropean más rápido los termos en zona de playa?',
        answer: 'La humedad salina acelera corrosión en ánodos de magnesio de termos eléctricos. En Málaga Este recomendamos revisiones más frecuentes y reemplazo de ánodos antes de plazo estándar para prolongar vida del termo.'
      },
      {
        question: '¿Instalan duchas exteriores y puntos de agua en terrazas?',
        answer: 'Sí, es común en viviendas de Pedregalejo y El Palo. Instalamos duchas de playa, grifos en terrazas y jardines, usando materiales anticorrosión y protección contra heladas en invierno si es necesario.'
      }
    ],
    semanticOwnership: ['fontanero', 'este', 'malaga', 'playa', 'costero']
  },

  // WAVE 3.8: Zaragoza Delicias - Transit/Working Class
  {
    serviceId: 'fontanero',
    citySlug: 'zaragoza',
    districtSlug: 'delicias',
    metadata: {
      title: 'Fontanero Delicias Zaragoza | Barrio Estación y Familias',
      description: 'Fontanería Delicias, Zaragoza. Servicio en barrio estación, viviendas trabajadoras. Precios accesibles, trabajo honesto, atención familiar.'
    },
    seoText: 'Servicio de fontanería de confianza en Delicias, barrio zaragozano de carácter familiar y trabajador junto a la estación Intermodal. Atendemos viviendas de familias que valoran trabajo honesto a precio justo, sin sobrecostes innecesarios. Trabajamos con bloques de pisos construidos en diferentes oleadas: desde edificios de los 60-70 con instalaciones originales a renovar, hasta construcción más reciente de los 90-2000. Conocemos problemática de edificios sin ascensor donde hay que subir equipos por escaleras, presupuestos ajustados de familias donde cada euro cuenta y ofrecemos opciones desde lo esencial hasta lo ideal, y averías típicas de barrios consolidados como obstrucciones, goteras y calentadores antiguos. Mantenemos trato cercano y directo, explicamos claramente qué hay que hacer y por qué, y respetamos decisiones económicas de vecinos del barrio.',
    faqs: [
      {
        question: '¿Tienen precios justos para vecinos de Delicias?',
        answer: 'Sí, en Delicias trabajamos con honestidad y transparencia. Presupuestamos claramente, explicamos opciones desde lo básico hasta lo completo, y respetamos que cada familia decida según su economía sin presionar.'
      },
      {
        question: '¿Qué hacer si vivo en un piso alto sin ascensor?',
        answer: 'Trabajamos en muchos edificios sin ascensor en Delicias. Llevamos equipos portátiles adecuados, y no cobramos extra por subir escaleras. Forma parte del servicio en un barrio como este.'
      },
      {
        question: '¿Merecela pena arreglar un calentador antiguo o cambiarlo?',
        answer: 'Depende de estado y edad. Revisamos primero: si reparación es económica y da más años de vida, recomendamos arreglar. Si está muy deteriorado y va a fallar pronto, aconsejamos cambio. Explicamos pros y contras honestamente.'
      },
      {
        question: '¿Pueden ayudar si no sé quién debe pagar la reparación?',
        answer: 'Sí, en Delicias trabajamos con propietarios e inquilinos. Explicamos qué corresponde a cada parte según ley, y facilitamos comunicación para resolver la avería sin conflictos innecesarios.'
      }
    ],
    semanticOwnership: ['fontanero', 'delicias', 'zaragoza', 'estacion', 'familiar']
  }
]

/**
 * Helper function to get district SEO content
 */
export function getDistrictSEOContent(
  serviceId: string,
  citySlug: string,
  districtSlug: string
): DistrictSEO | undefined {
  return districtSEOContent.find(
    (content) =>
      content.serviceId === serviceId &&
      content.citySlug === citySlug &&
      content.districtSlug === districtSlug
  )
}

/**
 * Validation: Check if district has unique SEO content
 */
export function hasDistrictSEO(
  serviceId: string,
  citySlug: string,
  districtSlug: string
): boolean {
  return getDistrictSEOContent(serviceId, citySlug, districtSlug) !== undefined
}

/**
 * Get all districts with SEO content for a service
 */
export function getServiceDistrictSEO(serviceId: string): DistrictSEO[] {
  return districtSEOContent.filter((content) => content.serviceId === serviceId)
}
