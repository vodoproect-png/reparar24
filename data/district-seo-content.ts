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
  },

  // ========================================
  // ELECTRICISTA PHASE 1 PILOT - 9 DISTRICTS
  // ========================================

  // Madrid Salamanca - Premium Smart Homes
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'salamanca',
    metadata: {
      title: 'Electricista Salamanca Madrid | Domótica y Sistemas Premium | Reparar24',
      description: 'Electricista premium en Salamanca Madrid. Especialistas en domótica, cargadores Tesla, iluminación inteligente y sistemas eléctricos de alto standing. Servicio 24h.'
    },
    seoText: `Nuestro equipo de electricistas especializados atiende Salamanca con enfoque en instalaciones de alto standing. Instalamos y mantenemos sistemas de domótica avanzados (Lutron, Control4, KNX), cargadores para vehículos eléctricos Tesla y otras marcas premium, iluminación inteligente Philips Hue integrada con asistentes, y actualizaciones de instalaciones trifásicas para alta demanda. Trabajamos discretamente coordinando con porteros y administradores, respetando estándares estéticos y funcionales que exigen los residentes de este distrito. Ofrecemos contratos de mantenimiento preventivo para viviendas y comunidades que valoran tranquilidad y continuidad del servicio eléctrico sin interrupciones.`,
    faqs: [
      {
        question: '¿Instaláis cargadores para Tesla en Salamanca?',
        answer: 'Sí, instalamos cargadores Tesla Wall Connector y otros cargadores para vehículos eléctricos en Salamanca. Gestionamos permisos de comunidad, actualización de potencia contratada si es necesario, y certificación eléctrica reglamentaria.'
      },
      {
        question: '¿Trabajáis con sistemas de domótica premium?',
        answer: 'Sí, instalamos y configuramos sistemas Lutron, Control4, KNX y otras marcas de alto standing. Integramos iluminación, climatización, persianas automáticas y seguridad en una experiencia unificada controlable desde dispositivos móviles.'
      },
      {
        question: '¿Ofrecéis servicio discreto coordinado con portería?',
        answer: 'Sí, en Salamanca trabajamos con protocolos de discreción profesional. Coordinamos horarios con porterías, usamos uniformes corporativos, y mantenemos el espacio impecable durante y después de cada intervención.'
      }
    ],
    semanticOwnership: ['electricista', 'salamanca', 'madrid', 'domótica', 'cargadores tesla', 'premium']
  },

  // Madrid Chamberí - Old Wiring Modernization
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'chamberi',
    metadata: {
      title: 'Electricista Chamberí Madrid | Actualización Instalaciones Antiguas | Reparar24',
      description: 'Electricista en Chamberí especializado en modernización de instalaciones antiguas. Actualización de cuadros eléctricos, cambio de cableado obsoleto y solución de sobrecargas. 24h.'
    },
    seoText: `En Chamberí conocemos las particularidades de edificios con instalaciones eléctricas de décadas anteriores. Actualizamos cuadros eléctricos con fusibles cerámicos obsoletos por magnetotérmicos y diferenciales modernos que cumplen normativa. Reemplazamos cableado de aluminio de los años 70-80 por cobre actual cuando es necesario, solucionamos sobrecargas frecuentes que hacen saltar plomos en viviendas con consumo moderno, y adaptamos instalaciones a demanda eléctrica contemporánea sin obras innecesarias. Trabajamos en edificios mixtos residenciales y comerciales, coordinando con comunidades y comercios para mínima interrupción del servicio. Emitimos boletín eléctrico tras cada actualización significativa.`,
    faqs: [
      {
        question: '¿Es frecuente que salten los plomos en edificios antiguos de Chamberí?',
        answer: 'Sí, es muy común. Edificios de los 70-80 tienen cuadros eléctricos dimensionados para consumo de aquella época. Electrodomésticos actuales, aire acondicionado y dispositivos electrónicos superan esta capacidad. Actualizamos cuadro y potencia para eliminar el problema.'
      },
      {
        question: '¿Cambiáis cableado de aluminio por cobre?',
        answer: 'Sí, cuando detectamos cableado de aluminio antiguo en mal estado o insuficiente, recomendamos reemplazo por cobre. Evaluamos primero si es necesario cambio completo o podemos actualizar solo tramos críticos para optimizar coste.'
      },
      {
        question: '¿Actualizáis cuadros eléctricos obsoletos?',
        answer: 'Sí, reemplazamos cuadros con fusibles cerámicos antiguos por cuadros modernos con magnetotérmicos, diferenciales de 30mA, protector sobretensión, y dimensionado adecuado. Emitimos boletín eléctrico tras la actualización.'
      }
    ],
    semanticOwnership: ['electricista', 'chamberi', 'madrid', 'cuadros antiguos', 'cableado obsoleto', 'sobrecargas']
  },

  // Madrid Centro - Historic Electrical Infrastructure
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'centro',
    metadata: {
      title: 'Electricista Centro Madrid 24h | Urgencias e Instalaciones Históricas | Reparar24',
      description: 'Electricista urgencias en Centro Madrid. Especialistas en edificios históricos, cortes de luz, averías comerciales y modernización respetuosa con patrimonio. Disponible 24 horas.'
    },
    seoText: `Nuestro equipo atiende emergencias eléctricas en Centro Madrid con respuesta rápida a cortes de luz, averías urgentes en comercios y restaurantes, y problemas en apartamentos turísticos. Conocemos las restricciones de edificios protegidos desde Gran Vía hasta Lavapiés, trabajando con respeto a normativas patrimoniales cuando actualizamos instalaciones antiguas. Solucionamos sobrecargas por alta densidad de uso comercial y turístico, modernizamos cuadros eléctricos obsoletos en edificios señoriales, y adaptamos instalaciones a demanda actual sin comprometer estructura histórica. Disponibles 24 horas para emergencias que afectan actividad comercial o residencial en el corazón de la capital.`,
    faqs: [
      {
        question: '¿Atendéis cortes de luz urgentes en el centro?',
        answer: 'Sí, atendemos emergencias eléctricas 24 horas en Centro Madrid. Llegamos en 30-45 minutos. Diagnosticamos causa del corte (avería interna, cuadro, diferencial) y restablecemos suministro lo antes posible.'
      },
      {
        question: '¿Trabajáis en edificios protegidos respetando patrimonio?',
        answer: 'Sí, tenemos experiencia en edificios históricos del Centro. Actualizamos instalaciones minimizando impacto visual y estructural, usando canalizaciones ocultas y respetando elementos arquitectónicos protegidos. Coordinamos con normativas municipales cuando es necesario.'
      },
      {
        question: '¿Modernizáis instalaciones eléctricas antiguas sin obra?',
        answer: 'Sí, en muchos casos podemos actualizar cuadros eléctricos, reemplazar tramos críticos de cableado y mejorar protecciones sin obras significativas. Evaluamos cada caso y proponemos solución más eficiente respetando la estructura del edificio.'
      }
    ],
    semanticOwnership: ['electricista', 'centro', 'madrid', 'urgencias', 'edificios históricos', 'cortes luz']
  },

  // Barcelona Eixample - Modernist Electrical Retrofits
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'eixample',
    metadata: {
      title: 'Electricista Eixample Barcelona | Edificios Modernistas | Reparar24',
      description: 'Electricista en Eixample Barcelona especializado en edificios modernistas. Actualizaciones eléctricas en techos altos, reformas respetando arquitectura Cerdà. Servicio 24h.'
    },
    seoText: `En el Eixample de Barcelona atendemos las particularidades eléctricas de edificios modernistas del plan Cerdà. Trabajamos en pisos con techos de 4+ metros usando equipamiento adecuado para altura, accedemos a instalaciones en patios de manzana y galerías interiores características del distrito, y actualizamos sistemas eléctricos respetando molduras, rosetones y elementos decorativos originales. Reemplazamos cuadros eléctricos antiguos en edificios de principios 1900s, modernizamos cableado en instalaciones de época, y adaptamos iluminación preservando estética modernista. Coordinamos con comunidades de propietarios para intervenciones en zonas comunes y patios interiores típicos de la retícula Cerdà.`,
    faqs: [
      {
        question: '¿Trabajáis en edificios modernistas del Eixample?',
        answer: 'Sí, tenemos amplia experiencia en edificios modernistas del Eixample. Conocemos las particularidades constructivas, estructuras de techos altos, y respetamos elementos arquitectónicos históricos en cada intervención eléctrica que realizamos.'
      },
      {
        question: '¿Cómo accedéis a instalaciones eléctricas en techos altos?',
        answer: 'Usamos andamios ligeros telescópicos y escaleras especializadas para techos de 4+ metros característicos del Eixample. Protegemos suelos y molduras durante trabajo, y llevamos equipamiento que no daña elementos decorativos originales.'
      },
      {
        question: '¿Respetáis la estética modernista al actualizar electricidad?',
        answer: 'Sí, al modernizar instalaciones eléctricas preservamos rosetones, molduras y elementos decorativos. Usamos canalizaciones ocultas o integradas, y adaptamos puntos de luz manteniendo la estética original del edificio modernista.'
      }
    ],
    semanticOwnership: ['electricista', 'eixample', 'barcelona', 'modernista', 'techos altos', 'cerdà']
  },

  // Barcelona Ciutat Vella - Medieval Humidity Electrical
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Electricista Ciutat Vella Barcelona | Urgencias Eléctricas Gótico | Reparar24',
      description: 'Electricista urgencias en Ciutat Vella Barcelona. Especialistas en edificios medievales, humedad, apartamentos turísticos y averías eléctricas en Gótico y Raval. 24h.'
    },
    seoText: `En Ciutat Vella atendemos emergencias eléctricas considerando los desafíos únicos de edificios medievales del Gótico, Born y Raval. La humedad característica de estas zonas afecta cuadros eléctricos y conexiones, por lo que instalamos protección específica con cajas estancas IP55+ y revisamos periódicamente instalaciones en edificios de piedra antiguos. Solucionamos sobrecargas en apartamentos turísticos con alta rotación, actualizamos instalaciones obsoletas en edificios catalogados minimizando impacto estructural, y atendemos urgencias en bares y restaurantes del casco antiguo. Nuestro equipo conoce el acceso por calles estrechas peatonales y coordina intervenciones respetando normativa patrimonial del Ajuntament.`,
    faqs: [
      {
        question: '¿La humedad del Gótico afecta a instalaciones eléctricas?',
        answer: 'Sí, la humedad en edificios medievales de Ciutat Vella puede deteriorar cuadros eléctricos y conexiones. Instalamos protección con cajas estancas IP55+, revisamos cableado expuesto a humedad, y recomendamos mantenimiento preventivo en estas condiciones.'
      },
      {
        question: '¿Atendéis urgencias eléctricas en apartamentos turísticos?',
        answer: 'Sí, atendemos emergencias eléctricas 24h en apartamentos turísticos de Ciutat Vella. Solucion amos rápido cortes de luz, diferenciales que saltan,y sobrecargas por aire acondicionado. Coordinamos con propietarios/gestores para acceso.'
      },
      {
        question: '¿Cómo protegéis cuadros eléctricos de la humedad?',
        answer: 'Instalamos cuadros con protección IP55+ resistentes a humedad, ubicamos en zonas más secas posibles, aplicamos protección antihumedad en conexiones críticas, y recomendamos revisiones periódicas en edificios con humedad persistente dela zona.'
      }
    ],
    semanticOwnership: ['electricista', 'ciutat-vella', 'barcelona', 'gótico', 'humedad', 'medieval']
  },

  // Valencia Poblats Marítims - Coastal Corrosion Electrical
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'poblats-maritims',
    metadata: {
      title: 'Electricista Poblats Marítims Valencia | Protección Costera | Reparar24',
      description: 'Electricista en Poblats Marítims Valencia especializado en protección contra salinidad marina. Instalaciones resistentes a corrosión, iluminación exterior costera. 24h.'
    },
    seoText: `En Poblats Marítims trabajamos con las particularidades eléctricas de zona costera valenciana. La humedad marina y salinidad aceleran corrosión en cuadros eléctricos exteriores, conexiones y cableado mal protegido. Instalamos sistemas con protección IP65 para exteriores, utilizamos materiales resistentes a ambiente salino, y revisamos periódicamente instalaciones en viviendas cercanas a playa. Instalamos iluminación exterior resistente a sal para jardines y terrazas, actualizamos cuadros con protección anticorrosión, y asesoramos sobre mantenimiento preventivo en entorno marino. Atendemos averías en apartamentos de playa y chalets costeros, solucionando problemas específicos de degradación acelerada por ambiente marítimo valenciano.`,
    faqs: [
      {
        question: '¿La humedad marina afecta a cuadros eléctricos en Poblats Marítims?',
        answer: 'Sí, la humedad salina del ambiente marino acelera corrosión en cuadros eléctricos exteriores y conexiones mal protegidas. Instalamos cajas estancas IP65, usamos materiales resistentes a salinidad, y recomendamos revisión anual preventiva en zona costera.'
      },
      {
        question: '¿Qué protección recomendáis para exteriores cerca del mar?',
        answer: 'Recomendamos cajas IP65 mínimo para cuadros exteriores, cableado con doble aislamiento, conectores con protección antihumedad, y materiales inoxidables o tratados anticorrosión. En Poblats Marítims es esencial protección adecuada para durabilidad.'
      },
      {
        question: '¿Instaláis iluminación exterior resistente a la sal?',
        answer: 'Sí, instalamos luminarias con protección IP65+ y materiales resistentes a ambiente salino para jardines, terrazas y fachadas cerca de la playa. Usamos lámparas LED con carcasas anticorrosión que soportan bien el ambiente marino.'
      }
    ],
    semanticOwnership: ['electricista', 'poblats-maritims', 'valencia', 'costa', 'salinidad', 'corrosión marina']
  },

  // Valencia Ciutat Vella - Historic Center Electrical
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Electricista Ciutat Vella Valencia | Centro Histórico 24h | Reparar24',
      description: 'Electricista en Ciutat Vella Valencia. Especialistas en edificios históricos, apartamentos turísticos, modernización eléctrica y urgencias en el centro antiguo. Servicio 24h.'
    },
    seoText: `En Ciutat Vella de Valencia atendemos instalaciones eléctricas en el centro histórico con sus particularidades arquitectónicas. Modernizamos cuadros eléctricos en edificios antiguos del casco valenciano, solucionamos sobrecargas en apartamentos turísticos con alta demanda estival, y actualizamos instalaciones obsoletas respetando estructura histórica de viviendas tradicionales. Trabajamos en calles estrechas con acceso peatonal coordinando materiales y equipos, atendemos urgencias en comercios y restaurantes del centro, y realizamos reformas eléctricas cumpliendo normativa de edificios protegidos. Nuestro equipo conoce los sistemas antiguos y desafíos de actualización eléctrica en centros históricos mediterráneos.`,
    faqs: [
      {
        question: '¿Modernizáis instalaciones eléctricas en el casco antiguo?',
        answer: 'Sí, actualizamos instalaciones eléctricas antiguas en Ciutat Vella. Reemplazamos cuadros obsoletos, modernizamos cableado, aumentamos puntos de conexión para demanda actual, y emitimos boletín eléctrico. Respetamos estructura del edificio histórico en cada reforma.'
      },
      {
        question: '¿Trabajáis en edificios históricos con acceso estrecho?',
        answer: 'Sí, en Ciutat Vella estamos acostumbrados a calles estrechas peatonales. Llevamos equipamiento portátil adaptado, coordinamos transporte de material por zonas de acceso limitado, y planificamos logística para trabajar eficientemente en centro histórico.'
      },
      {
        question: '¿Atendéis apartamentos turísticos con problemas eléctricos?',
        answer: 'Sí, atendemos urgencias en apartamentos turísticos de Ciutat Vella. Solucionamos diferenciales que saltan por sobrecarga de aire acondicionado, aumentamos potencia si es insuficiente, y revisamos instalación para evitar problemas durante temporada alta.'
      }
    ],
    semanticOwnership: ['electricista', 'ciutat-vella', 'valencia', 'centro histórico', 'casco antiguo', 'turístico']
  },

  // Málaga Teatinos - Modern Smart Systems
  {
    serviceId: 'electricista',
    citySlug: 'malaga',
    districtSlug: 'teatinos',
    metadata: {
      title: 'Electricista Teatinos Málaga | Instalaciones Modernas y Domótica | Reparar24',
      description: 'Electricista en Teatinos Málaga especializado en desarrollos modernos. Domótica, smart home, instalaciones eléctricas en edificios nuevos y mantenimiento preventivo. 24h.'
    },
    seoText: `En Teatinos atendemos instalaciones eléctricas de los desarrollos residenciales modernos  y viviendas universitarias del distrito. Instalamos sistemas domóticos básicos y avanzados para pisos contemporáneos, configuramos iluminación inteligente controlable por voz y apps, y optimizamos instalaciones eléctricas para alto consumo de dispositivos tecnológicos en hogares de estudiantes y profesionales jóvenes. Revisamos instalaciones en comunidades nuevas para identificar defectos constructivos antes que causen problemas, ofrecemos contratos de mantenimiento preventivo para edificios recientes, y actualizamos potencia eléctrica cuando el desarrollo inicial resulta insuficiente. Atendemos rápidamente necesidades de residentes que priorizan tecnología y eficiencia.`,
    faqs: [
      {
        question: '¿Instaláis domótica en pisos modernos de Teatinos?',
        answer: 'Sí, instalamos sistemas domóticos desde básicos (enchufes inteligentes, control WiFi) hasta avanzados (automatización completa, asistentes de voz integrados). Adaptamos instalación según presupuesto y preferencias tecnológicas de cada vivienda en Teatinos.'
      },
      {
        question: '¿Trabajáis con sistemas eléctricos inteligentes?',
        answer: 'Sí, configuramos iluminación inteligente Philips Hue, enchufes WiFi, termostatos conectados, persianas automáticas y otros dispositivos smart home. Integramos todo en ecosistema unificado controlable desde móvil o asistentes de voz.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para comunidades nuevas?',
        answer: 'Sí, en Teatinos revisamos instalaciones de edificios recientes para detectar defectos constructivos, conexiones mal realizadas, o cuadros con problemas antes de que causen averías. El mantenimiento preventivo temprano evita problemas futuros y garantiza instalación correcta.'
      }
    ],
    semanticOwnership: ['electricista', 'teatinos', 'malaga', 'moderno', 'domótica', 'smart home']
  },

  // Zaragoza Universidad - Student Overload Hazards
  {
    serviceId: 'electricista',
    citySlug: 'zaragoza',
    districtSlug: 'universidad',
    metadata: {
      title: 'Electricista Universidad Zaragoza | Pisos Estudiantes 24h | Reparar24',
      description: 'Electricista en zona Universidad Zaragoza. Especialistas en sobrecargas eléctricas, diferenciales que saltan, pisos compartidos y coordinación propietario-inquilino. Servicio 24h.'
    },
    seoText: `En zona Universidad de Zaragoza atendemos las particularidades eléctricas de pisos de estudiantes con alta demanda. Solucionamos sobrecargas frecuentes por múltiples dispositivos conectados simultáneamente (ordenadores, móviles, climatización), actualizamos cuadros eléctricos subdimensionados que no soportan consumo actual, y eliminamos uso peligroso de ladrones y extensiones en cascada. Coordinamos con propietarios e inquilinos para reparaciones necesarias explicando responsabilidades según normativa de arrendamiento, realizamos revisiones de seguridad eléctrica en pisos compartidos, y ofrecemos soluciones económicas para maximizar capacidad sin renovación completa cuando es posible. Atendemos rápido durante periodo académico cuando estudiantes necesitan urgentemente electricidad funcional.`,
    faqs: [
      {
        question: '¿Por qué saltan los plomos constantemente en pisos de estudiantes?',
        answer: 'En pisos de estudiantes es frecuente sobrecarga eléctrica: varios ordenadores, móviles cargando, aire acondicionado, y electrodomésticos simultáneos superan capacidad del cuadro antiguo. Actualizamos magnetotérmicos y potencia contratada para eliminar estos cortes continuos.'
      },
      {
        question: '¿Solucionáis problemas de sobrecarga eléctrica?',
        answer: 'Sí, diagnosticamos causa de sobrecarga (cuadro antiguo, potencia insuficiente, instalación deficiente), y proponemos solución: actualizar cuadro, aumentar potencia contratada, o redistribuir consumos en circuitos separados. Explicamos opciones y costes claramente.'
      },
      {
        question: '¿Quién paga las reparaciones eléctricas en pisos de alquiler?',
        answer: 'Depende del tipo de avería: averías por uso normal o antigüedad corresponden al propietario; daños por mal uso del inquilino son su responsabilidad. Evaluamos causa, explicamos a ambas partes según normativa de arrendamiento,y facilitamos resolución rápida sin conflictos.'
      }
    ],
    semanticOwnership: ['electricista', 'universidad', 'zaragoza', 'estudiantes', 'sobrecarga', 'pisos compartidos']
  },

  // ========================================
  // ELECTRICISTA PHASE 2 EXPANSION - 11 DISTRICTS
  // ========================================

  // Madrid Retiro - Residential Stability & Preventive Maintenance
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'retiro',
    metadata: {
      title: 'Electricista Retiro Madrid | Mantenimiento Preventivo Residencial | Reparar24',
      description: 'Electricista en Retiro Madrid especializado en mantenimiento preventivo para viviendas familiares. Actualizaciones de iluminación, modernización segura y revisiones programadas. 24h.'
    },
    seoText: `En Retiro ofrecemos servicio eléctrico enfocado al mantenimiento preventivo de viviendas residenciales y apartamentos familiares cerca del parque. Realizamos revisiones programadas de instalaciones eléctricas en edificios clásicos, actualizamos sistemas de iluminación obsoletos a LED con mejoras de eficiencia, y modernizamos cuadros eléctricos antiguos respetando estética de viviendas tradicionales del distrito. Trabajamos con familias que valoran estabilidad y seguridad eléctrica a largo plazo, ofreciendo contratos de mantenimiento que previenen averías costosas. Atendemos actualizaciones de potencia eléctric a contratada cuando familias añaden electrodomésticos modernos, instalamos protecciones contra sobretensiones en zonas residenciales, y asesoramos sobre optimización del consumo eléctrico doméstico.`,
    faqs: [
      {
        question: '¿Ofrecéis contratos de mantenimiento eléctrico preventivo en Retiro?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo para viviendas en Retiro. Incluyen revisiones anuales de cuadros eléctricos, verificación de protecciones, limpieza de conexiones y detección temprana de problemas antes de que causen averías mayores.'
      },
      {
        question: '¿Actualizáis iluminación antigua a LED en pisos del Retiro?',
        answer: 'Sí, modernizamos sistemas de iluminación en viviendas del Retiro. Reemplazamos halógenas y fluorescentes por LED, actualizamos reguladores de intensidad incompatibles, y optimizamos circuitos de iluminación para mayor eficiencia sin cambiar estética del hogar.'
      },
      {
        question: '¿Qué incluye una revisión eléctrica completa en Retiro?',
        answer: 'Revisión completa incluye: inspección de cuadro eléctrico y protecciones, verificación de cableado visible, prueba de diferenciales y magnetotérmicos, medición de tierras, revisión de enchufes y puntos de luz, y informe detallado con recomendaciones priorizadas.'
      }
    ],
    semanticOwnership: ['electricista', 'retiro', 'madrid', 'mantenimiento preventivo', 'iluminación LED', 'residencial']
  },

  // Madrid Chamartín - Business & Office Electrical Systems
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'chamartin',
    metadata: {
      title: 'Electricista Chamartín Madrid | Sistemas Eléctricos Comerciales | Reparar24',
      description: 'Electricista especializado en Chamartín para oficinas y negocios. Sistemas de respaldo eléctrico, SAI, instalaciones trifásicas y mantenimiento comercial. Servicio empresarial 24h.'
    },
    seoText: `Servicio eléctrico especializado para el entorno empresarial de Chamartín, desde zona financiera AZCA hasta Torre Europa. Instalamos y mantenemos sistemas de alimentación ininterrumpida (SAI/UPS) para oficinas que requieren continuidad operativa, gestionamos instalaciones trifásicas de alta potencia para equipamiento informático y servidores, y diseñamos redundancia eléctrica en centros de trabajo críticos. Trabajamos fuera de horario laboral para no interrumpir operaciones, coordinamos con property managers y administradores de edificios corporativos, y cumplimos normativas de seguridad eléctrica en espacios de trabajo. Atendemos emergencias eléctricas empresariales con respuesta prioritaria, entendiendo impacto de cortes en productividad y operaciones comerciales del distrito financiero madrileño.`,
    faqs: [
      {
        question: '¿Instaláis sistemas de respaldo eléctrico para oficinas en Chamartín?',
        answer: 'Sí, instalamos SAI (sistemas de alimentación ininterrumpida) para oficinas en Chamartín. Dimensionamos potencia según carga informática, configuramos tiempos de autonomía necesarios, y mantenemos baterías para garantizar respaldo cuando hay cortes de red.'
      },
      {
        question: '¿Trabajáis fuera de horario en edificios de oficinas?',
        answer: 'Sí, ofrecemos servicio nocturno y fines de semana en Chamartín para no interrumpir actividad empresarial. Coordinamos con seguridad de edificios y administradores, trabajamos en horarios que minimizan impacto operativo.'
      },
      {
        question: '¿Gestionáis instalaciones trifásicas para equipos informáticos?',
        answer: 'Sí, trabajamos con instalaciones trifásicas en oficinas de Chamartín. Distribuimos cargas equilibradamente, instalamos protecciones específicas para equipamiento sensible, y aseguramos que potencia contratada es suficiente para toda la infraestructura tecnológica.'
      }
    ],
    semanticOwnership: ['electricista', 'chamartin', 'madrid', 'sistemas SAI', 'trifásica', 'empresarial']
  },

  // Barcelona Gràcia - Retrofitted Mix Old/New Electrical
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'gracia',
    metadata: {
      title: 'Electricista Gràcia Barcelona | Modernización Instalaciones Mixtas | Reparar24',
      description: 'Electricista en Gràcia especializado en instalaciones eléctricas retrofitadas. Combinación sistemas antiguos/modernos, actualizaciones progresivas y comercios artesanales. 24h.'
    },
    seoText: `En Gràcia trabajamos con la realidad eléctrica de edificios donde conviven instalaciones antiguas originales con renovaciones parciales modernas. Gestionamos actualizaciones progresivas en pisos donde propietarios han modernizado progresivamente sin renovación completa, integramos tramos nuevos de cableado con secciones antiguas funcionales, y equilibramos cargas en cuadros donde se han añadido circuitos modernos a estructura original. Atendemos comercios artesanales y pequeños negocios del barrio con soluciones eléctricas prácticas que respetan presupuestos ajustados, instalamos iluminación comercial en locales históricos renovados, y solucionamos problemas de compatibilidad entre sistemas eléctricos de diferentes épocas. Conocemos particularidades de edificios gracienses donde cada piso puede tener configuración eléctrica distinta según renovaciones individuales realizadas.`,
    faqs: [
      {
        question: '¿Trabajáis con instalaciones eléctricas parcialmente renovadas en Gràcia?',
        answer: 'Sí, en Gràcia es común encontrar instalaciones mixtas: parte moderna, parte antigua. Evaluamos qué tramos mantener y cuáles actualizar, integramos nuevos circuitos con existentes funcionales, y priorizamos intervenciones según presupuesto disponible.'
      },
      {
        question: '¿Atendéis pequeños comercios y negocios artesanales de Gràcia?',
        answer: 'Sí, trabajamos con comercios locales de Gràcia. Entendemos presupuestos ajustados de pequeños negocios, ofrecemos soluciones eléctricas prácticas y económicas, y respetamos la realidad empresarial del barrio con opciones escalables.'
      },
      {
        question: '¿Cómo gestionáis cuadros eléctricos con circuitos de diferentes épocas?',
        answer: 'Analizamos configuración actual, identificamos circuitos antiguos vs modernos, verificamos compatibilidad de protecciones, y proponemos actualización gradual priorizando seguridad. No siempre es necesario reemplazar todo simultáneamente.'
      }
    ],
    semanticOwnership: ['electricista', 'gracia', 'barcelona', 'instalaciones mixtas', 'modernización gradual', 'comercios']
  },

  // Barcelona Sants - Dense Residential Practical Repairs
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'sants',
    metadata: {
      title: 'Electricista Sants Barcelona | Reparaciones Prácticas y Económicas | Reparar24',
      description: 'Electricista en Sants Barcelona. Servicio eléctrico práctico para apartamentos densos, reparaciones asequibles, sobrecargas y actualizaciones básicas. Precios justos 24h.'
    },
    seoText: `Servicio eléctrico de confianza en Sants con enfoque práctico y precios justos para vecinos del barrio. Solucionamos sobrecargas eléctricas frecuentes en apartamentos con muchos dispositivos conectados, actualizamos cuadros eléctricos básicos que no cumplen demanda actual, y reparamos problemas comunes sin sobrecostes innecesarios. Trabajamos en bloques densos de viviendas donde averías eléctricas afectan a múltiples familias, ofrecemos presupuestos transparentes explicados claramente para que cada vecino decida según su economía, y coordinamos con propietarios e inquilinos en zonas de alta densidad de alquileres. Entendemos realidad de Sants: familias trabajadoras que buscan soluciones eléctricas efectivas al mejor precio posible, sin sacrificar seguridad ni calidad del servicio profesional.`,
    faqs: [
      {
        question: '¿Tenéis precios accesibles para vecinos de Sants?',
        answer: 'Sí, en Sants trabajamos con transparencia y precios justos. Presupuestamos claramente cada opción desde lo básico hasta lo completo, sin presionar, respetando que cada familia decida según su presupuesto disponible.'
      },
      {
        question: '¿Solucionáis problemas de sobrecargas eléctricas en apartamentos?',
        answer: 'Sí, es muy común en Sants. Diagnosticamos si es cuadro antiguo, potencia insuficiente, o distribución inadecuada. Proponemos solución más económica efectiva: desde optimizar circuitos actuales hasta actualizar cuadro o aumentar potencia contratada.'
      },
      {
        question: '¿Trabajáis en edificios sin ascensor de Sants?',
        answer: 'Sí, muchos edificios de Sants son sin ascensor. Llevamos herramientas portátiles adecuadas, subimos equipos necesarios, y no cobramos extra por escaleras. Es parte normal del servicio en este barrio tradicional.'
      }
    ],
    semanticOwnership: ['electricista', 'sants', 'barcelona', 'reparaciones prácticas', 'precios justos', 'sobrecargas']
  },

  // Barcelona Sarrià - Premium Villas & Smart Automation
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'sarria',
    metadata: {
      title: 'Electricista Sarrià Barcelona | Sistemas Premium y Automatización | Reparar24',
      description: 'Electricista premium en Sarrià Barcelona. Especialistas en villas de lujo, automatización integral, cargadores vehículos eléctricos y mantenimiento exclusivo. Servicio discreto 24h.'
    },
    seoText: `Servicio eléctrico premium en Sarrià para villas, casas unifamiliares y apartamentos de alto standing en zona alta de Barcelona. Diseñamos e instalamos automatización eléctrica integral con sistemas domóticos avanzados controlando iluminación, persianas eléctricas, climatización y seguridad desde interfaces unificadas. Instalamos cargadores para vehículos eléctricos Tesla, Porsche y otras marcas premium en garajes privados con gestión inteligente de carga, actualizamos instalaciones trifásicas en viviendas con alta demanda eléctrica, y mantenemos sistemas de iluminación arquitectónica exterior en jardines y fachadas. Trabajamos con discreción profesional coordinando horarios con propietarios y personal doméstico, usamos materiales de máxima calidad y marcas reconocidas, y ofrecemos contratos de mantenimiento preventivo exclusivos para propiedades que valoran servicio impecable y continuidad sin interrupciones.`,
    faqs: [
      {
        question: '¿Instaláis sistemas domóticos completos en villas de Sarrià?',
        answer: 'Sí, diseñamos e instalamos automatización integral en Sarrià. Sistemas que controlan toda la vivienda: iluminación escenificada, persianas motorizadas, clima zonificado, seguridad integrada, y control desde iPad o voz. Marcas premium como Lutron, KNX, Control4.'
      },
      {
        question: '¿Gestionáis cargadores para vehículos eléctricos premium?',
        answer: 'Sí, instalamos cargadores para Tesla, Porsche Taycan, Audi e-tron y otros vehículos premium en Sarrià. Gestionamos potencia trifásica necesaria, instalación en garajes privados con gestión inteligente de carga, y certificación reglamentaria completa.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para propiedades en Sarrià?',
        answer: 'Sí, diseñamos contratos de mantenimiento exclusivos en Sarrià. Revisiones programadas discretas, respuesta prioritaria, coordinación con personal doméstico, y garantía de continuidad del servicio eléctrico sin interrupciones. Tranquilidad total.'
      }
    ],
    semanticOwnership: ['electricista', 'sarria', 'barcelona', 'premium', 'domótica avanzada', 'cargadores EV']
  },

  // Valencia Campanar - Residential Communities Modern Apartments
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'campanar',
    metadata: {
      title: 'Electricista Campanar Valencia | Comunidades Residenciales Modernas | Reparar24',
      description: 'Electricista en Campanar Valencia especializado en comunidades de propietarios. Instalaciones comunes, portales automáticos, videoporte ros y mantenimiento comunitario. 24h.'
    },
    seoText: `En Campanar atendemos instalaciones eléctricas de comunidades residenciales y bloques de apartamentos modernos de zona norte valenciana. Trabajamos con administradores de fincas en mantenimiento de instalaciones eléctricas comunes: portales automáticos, iluminación de escaleras con temporizadores, videoporteros digitales conectados, y cuadros generales de edificios. Solucionamos averías en garajes comunitarios donde iluminación o puertas automáticas fallan, actualizamos sistemas de alumbrado común a LED reduciendo consumo eléctrico de la comunidad, e instalamos videoporteros IP modernos con conexión a smartphones de vecinos. Ofrecemos contratos de mantenimiento para comunidades que prefieren revisiones preventivas programadas evitando averías sorpresa, y coordinamos intervenciones respetando normativas y acuerdos de propietarios en edificios residenciales familiares del distrito.`,
    faqs: [
      {
        question: '¿Trabajáis con comunidades de propietarios en Campanar?',
        answer: 'Sí, colaboramos regularmente con administradores de fincas en Campanar. Mantenemos instalaciones eléctricas comunes, reparamos portales automáticos y videoporteros, actualizamos iluminación de zonas comunes, y ofrecemos contratos de mantenimiento preventivo comunitario.'
      },
      {
        question: '¿Actualizáis videoporteros a sistemas modernos con smartphone?',
        answer: 'Sí, instalamos videoporteros IP modernos en Campanar. Permiten ver quién llama desde móvil, abrir portal remotamente, y grabar eventos. Integramos con instalación existente minimizando obra, compatible con diferentes marcas.'
      },
      {
        question: '¿Solucionáis problemas eléctricos en garajes comunitarios?',
        answer: 'Sí, atendemos averías en garajes de comunidades: iluminación que no funciona, puertas automáticas paradas, cuadros eléctricos que saltan. Diagnosticamos causa y reparamos coordinando con comunidad para acceso y aprobación.'
      }
    ],
    semanticOwnership: ['electricista', 'campanar', 'valencia', 'comunidades', 'videoporteros', 'instalaciones comunes']
  },

  // Valencia Extramurs - Mixed Residential/Commercial Upgrades
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'extramurs',
    metadata: {
      title: 'Electricista Extramurs Valencia | Modernización Mixta Residencial-Comercial | Reparar24',
      description: 'Electricista en Extramurs Valencia. Modernización eléctrica en zona mixta, comercios locales, apartamentos medios y actualizaciones prácticas. Servicio local 24h.'
    },
    seoText: `Servicio eléctrico en Extramurs para zona mixta residencial-comercial con edificios de densidad media que requieren actualizaciones prácticas. Modernizamos instalaciones eléctricas en apartamentos de construcción 80-90 donde cableado y cuadros están obsoletos para demanda actual, atendemos comercios de barrio con necesidades eléctricas específicas de iluminación comercial y escaparates, y solucionamos problemas de convivencia eléctrica en edificios donde bajo comercial comparte instalación con viviendas superiores. Trabajamos en actualizaciones progresivas cuando presupuesto no permite renovación completa, ofrecemos soluciones intermedias que mejoran seguridad y capacidad sin coste prohibitivo, y coordinamos con comunidades mixtas donde vecinos y comerciantes deben consensuar intervenciones en instalaciones compartidas del edificio.`,
    faqs: [
      {
        question: '¿Atendéis edificios mixtos vivienda-comercio en Extramurs?',
        answer: 'Sí, trabajamos con edificios mixtos en Extramurs. Gestionamos instalaciones donde bajo comercial y viviendas comparten acometida, separamos correctamente contadores y protecciones, y coordinamos intervenciones con vecinos y comerciantes afectados.'
      },
      {
        question: '¿Modernizáis instalaciones eléctricas de los años 80-90?',
        answer: 'Sí, en Extramurs muchos edificios tienen instalaciones de esa época. Actualizamos cuadros eléctricos, reemplazamos cableado insuficiente, añadimos circuitos para demanda actual, y mejoramos protecciones cumpliendo normativa sin obras innecesarias.'
      },
      {
        question: '¿Ofrecéis actualizaciones eléctricas escalonadas por presupuesto?',
        answer: 'Sí, entendemos limitaciones presupuestarias. Priorizamos intervenciones por urgencia y seguridad: primero lo crítico, luego mejoras progresivas. Planificamos actualización en fases asequibles sin comprometer funcionalidad esencial.'
      }
    ],
    semanticOwnership: ['electricista', 'extramurs', 'valencia', 'mixto', 'modernización', 'comercios']
  },

  // Sevilla Triana - Traditional Housing Humidity Electrical
  {
    serviceId: 'electricista',
    citySlug: 'sevilla',
    districtSlug: 'triana',
    metadata: {
      title: 'Electricista Triana Sevilla | Instalaciones Tradicionales y Humedad | Reparar24',
      description: 'Electricista en Triana Sevilla especializado en viviendas tradicionales. Protección anti-humedad, casas con patio, modernización de cableado antiguo y arquitectura andaluza. 24h.'
    },
    seoText: `En Triana trabajamos con particularidades eléctricas de viviendas tradicionales andaluzas y casas con patio características del barrio sevillano. La humedad por proximidad al Guadalquivir afecta instalaciones eléctricas requiriendo protección específica con cajas estancas en exteriores y zonas húmedas, solucionamos problemas de cableado antiguo en casas-patio donde instalaciones discurren por galerías perimetrales expuestas, y modernizamos cuadros eléctricos obsoletos en edificios tradicionales respetando distribución y estética andaluza. Instalamos iluminación en patios interiores con materiales resistentes a humedad ambiental, actualizamos tomas de corriente en zonas húmedas cumpliendo normativa de baños y exteriores, y trabajamos en viviendas donde arquitectura tradicional limita recorridos de cableado requiriendo soluciones creativas que respeten estructura histórica del inmueble trianero.`,
    faqs: [
      {
        question: '¿Trabajáis con casas-patio tradicionales de Triana?',
        answer: 'Sí, tenemos experiencia en arquitectura tradicional trianera. Instalamos iluminación en patios con protección contra humedad, gestionamos cableado en galerías, y respetamos distribución andaluza original mientras modernizamos instalación eléctrica.'
      },
      {
        question: '¿La humedad del Guadalquivir afecta instalaciones eléctricas?',
        answer: 'Sí, en Triana la humedad ambiental por el río deteriora conexiones eléctricas expuestas. Usamos cajas IP55+ para exteriores, protegemos cuadros en zonas húmedas, y recomendamos mantenimiento periódico en viviendas cercanas al Guadalquivir.'
      },
      {
        question: '¿Actualizáis cableado antiguo en edificios tradicionales de Triana?',
        answer: 'Sí, modernizamos cableado respetando estructura del edificio. Reemplazamos instalaciones obsoletas sin obras invasivas, usamos recorridos existentes cuando es posible, y adaptamos trabajo a limitaciones de arquitectura tradicional andaluza.'
      }
    ],
    semanticOwnership: ['electricista', 'triana', 'sevilla', 'tradicional andaluz', 'humedad', 'casas-patio']
  },

  // Sevilla Nervión - Business/Residential Mix Commercial
  {
    serviceId: 'electricista',
    citySlug: 'sevilla',
    districtSlug: 'nervion',
    metadata: {
      title: 'Electricista Nervión Sevilla | Comercial y Residencial Moderno | Reparar24',
      description: 'Electricista en Nervión Sevilla para oficinas, locales comerciales y apartamentos modernos. Iluminación comercial, sistemas trifásicos y mantenimiento empresarial. 24h.'
    },
    seoText: `Servicio eléctrico en Nervión para distrito comercial y empresarial sevillano con mezcla de oficinas, locales y viviendas modernas. Instalamos iluminación comercial en tiendas y locales del área Luis Montoto optimizada para exposición de productos, gestionamos instalaciones trifásicas en oficinas con alta carga informática y equipamiento tecnológico, y atendemos emergencias eléctricas en negocios donde cada hora sin servicio significa pérdida económica. Trabajamos fuera de horario comercial en oficinas para no interrumpir actividad diaria, coordinamos con administradores de centros comerciales y edificios empresariales, y ofrecemos mantenimiento preventivo para empresas que priorizan continuidad operativa. También atendemos viviendas modernas del distrito con instalaciones contemporáneas que requieren servicio profesional rápido y eficiente adaptado al ritmo urbano de zona empresarial sevillana.`,
    faqs: [
      {
        question: '¿Atendéis locales comerciales y oficinas en Nervión?',
        answer: 'Sí, somos especialistas en entorno comercial de Nervión. Instalamos iluminación para tiendas, mantenemos sistemas eléctricos de oficinas, trabajamos fuera de horario para no afectar negocio, y respondemos rápido a emergencias comerciales.'
      },
      {
        question: '¿Instaláis sistemas eléctricos para equipos informáticos en oficinas?',
        answer: 'Sí, gestionamos instalaciones para oficinas en Nervión. Dimensionamos potencia para servidores y equipos, instalamos circuitos dedicados para tecnología sensible, y aseguramos protecciones adecuadas contra sobretensiones que puedan dañar equipamiento.'
      },
      {
        question: '¿Ofrecéis intervenciones nocturnas en zona empresarial?',
        answer: 'Sí, trabajamos noche y fines de semana en Nervión para no interrumpir actividad comercial. Coordinamos con seguridad de edificios, minimizamos impacto operativo, y completamos trabajos en horarios que no afectan al negocio.'
      }
    ],
    semanticOwnership: ['electricista', 'nervion', 'sevilla', 'comercial', 'iluminación tiendas', 'oficinas']
  },

  // Málaga Centro - Tourism Hospitality Electrical Demand
  {
    serviceId: 'electricista',
    citySlug: 'malaga',
    districtSlug: 'centro',
    metadata: {
      title: 'Electricista Centro Málaga | Apartamentos Turísticos y Hostelería | Reparar24',
      description: 'Electricista urgencias en Centro Málaga. Especialistas en apartamentos turísticos, hoteles, restaurantes, casco antiguo costero y emergencias 24h. Respuesta inmediata.'
    },
    seoText: `En Centro de Málaga atendemos alta demanda eléctrica del sector turístico y hostelero del casco histórico costero malagueño. Solucionamos urgencias en apartamentos turísticos donde diferenciales saltan por sobrecarga de aires acondicionados en verano, actualizamos potencia eléctrica en viviendas turisticas con mayor ocupación que vivienda tradicional requiere, y trabajamos en hoteles y hostales donde cortes eléctricos afectan directamente a huéspedes y reputación del negocio. Instalamos iluminación exterior en terrazas de bares y restaurantes de zona puerto resistente a ambiente salino marino, modernizamos instalaciones anticuadas en edificios del casco antiguo que ahora son alojamientos turísticos, y atendemos 24 horas emergencias eléctricas en hostelería donde cada minuto sin luz significa clientes descontentos. El ambiente costero acelera corrosión en instalaciones exteriores requiriendo materiales específicos anti-sal.`,
    faqs: [
      {
        question: '¿Atendéis emergencias eléctricas en apartamentos turísticos del centro?',
        answer: 'Sí, atendemos urgencias 24h en apartamentos turísticos de Centro Málaga. Llegamos rápido porque sabemos que afecta a huéspedes y reservas. Solucionamos diferenciales que saltan, sobrecargas por aires acondicionados, y problemas eléctricos comunes en temporada alta.'
      },
      {
        question: '¿La brisa marina afecta instalaciones eléctricas en Centro Málaga?',
        answer: 'Sí, el ambiente salino del puerto acelera corrosión en conexiones y equipos exteriores. Usamos materiales resistentes a sal, protecciones estancas IP65 para terrazas y exteriores, y recomendamos mantenimiento preventivo en zona costera del centro.'
      },
      {
        question: '¿Trabajáis en restaurantes y bares de zona turística?',
        answer: 'Sí, atendemos hostelería en Centro Málaga. Priorizamos emergencias en bares y restaurantes porque sabemos impacto de quedarse sin luz. Trabajamos rápido, conocemos equipamiento hostelero (cámaras, cocinas), y respondemos 24h.'
      }
    ],
    semanticOwnership: ['electricista', 'centro', 'malaga', 'turístico', 'hostelería', 'costero']
  },

  // Zaragoza Delicias - Dense Family Housing Practical Solutions
  {
    serviceId: 'electricista',
    citySlug: 'zaragoza',
    districtSlug: 'delicias',
    metadata: {
      title: 'Electricista Delicias Zaragoza | Viviendas Familiares y Comunidades | Reparar24',
      description: 'Electricista en Delicias Zaragoza. Servicio eléctrico práctico para familias, reparaciones asequibles, actualizaciones básicas y soluciones comunitarias. Precios honestos 24h.'
    },
    seoText: `Servicio eléctrico de confianza en Delicias para familias trabajadoras y comunidades de edificios densos cerca de estación Intermodal zaragozana. Solucionamos sobrecargas eléctricas en apartamentos familiares donde consumo moderno supera  capacidad de cuadros antiguos, actualizamos instalaciones de edificios sin ascensor con presupuestos ajustados a realidad económica de vecinos, y reparamos problemas comunes sin sobrecostes innecesarios priorizando seguridad y funcionalidad. Trabajamos con administradores en mantenimiento de instalaciones eléctricas comunes de edificios, ofrecemos presupuestos transparentes explicando claramente opciones desde lo esencial hasta lo ideal, y coordinamos con propietarios e inquilinos facilitando resolución de averías sin conflictos. Entendemos que en Delicias cada euro cuenta en economías familiares, por lo que ofrecemos soluciones eléctricas efectivas al precio más justo posible manteniendo calidad profesional y seguridad reglamentaria.`,
    faqs: [
      {
        question: '¿Ofrecéis precios justos para familias de Delicias?',
        answer: 'Sí, en Delicias trabajamos con honestidad y transparencia total. Presupuestamos claramente cada opción, explicamos qué es necesario y qué es recomendable, y respetamos que cada familia decida según su presupuesto sin presionar.'
      },
      {
        question: '¿Actualizáis cuadros eléctricos antiguos en comunidades de Delicias?',
        answer: 'Sí, modernizamos cuadros obsoletos en edificios de Delicias. Reemplazamos fusibles cerámicos por magnetotérmicos, añadimos diferenciales modernos, dimensionamos adecuadamente, y emitimos boletín eléctrico tras actualización cumpliendo normativa.'
      },
      {
        question: '¿Trabajáis en edificios sin ascensor de Delicias?',
        answer: 'Sí, muchos edificios familiares de Delicias no tienen ascensor. Llevamos herramientas portátiles ligeras, subimos equipos necesarios por escaleras, y no cobramos extra por acceso. Es parte del servicio en barrios tradicionales como Delicias.'
      }
    ],
    semanticOwnership: ['electricista', 'delicias', 'zaragoza', 'familias', 'comunidades', 'precios justos']
  },

  // ========================================
  // ELECTRICISTA PHASE 3 FINAL COVERAGE - 10 DISTRICTS
  // ========================================

  // Madrid Arganzuela - Industrial Conversion Loft Electrical
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'arganzuela',
    metadata: {
      title: 'Electricista Arganzuela Madrid | Lofts Industriales y Conversiones | Reparar24',
      description: 'Electricista en Arganzuela Madrid especializado en conversiones industriales. Instalaciones eléctricas para lofts, naves reconvertidas y edificios mixtos. Servicio 24h.'
    },
    seoText: `En Arganzuela trabajamos con la realidad eléctrica única de un distrito en transformación industrial. Instalamos sistemas eléctricos completos en antiguas naves y fábricas reconvertidas a lofts y espacios de coworking, diseñamos distribución de cableado en espacios diáfanos donde no existe estructura tabicada tradicional, y modernizamos instalaciones en edificios obreros históricos con sistemas eléctricos obsoletos. La mezcla arquitectónica del distrito requiere soluciones versátiles: desde viviendas de inicios de siglo XX con cableado original hasta espacios industriales contemporáneos con demanda tecnológica alta. Gestionamos instalaciones en edificios cercanos a Matadero y estación Atocha donde legado ferroviario-industrial condiciona infraestructura eléctrica, y ofrecemos soluciones para desarrollo creativo y tecnológico que caracteriza la renovación urbana de Arganzuela.`,
    faqs: [
      {
        question: '¿Instaláis electricidad en lofts de antiguas naves industriales de Arganzuela?',
        answer: 'Sí, diseñamos e instalamos sistemas eléctricos completos en conversiones industriales de Arganzuela. Trabajamos con espacios diáfanos sin tabiques, instalación vista o empotrada según proyecto, y distribución flexible adaptada a uso residencial o profesional en antiguas fábricas.'
      },
      {
        question: '¿Modernizáis instalaciones en edificios obreros históricos de Arganzuela?',
        answer: 'Sí, actualizamos instalaciones eléctricas en viviendas obreras del distrito. Reemplazamos cableado antiguo, modernizamos cuadros obsoletos, y adaptamos sistemas a demanda actual manteniendo distribución original cuando edificio tiene valor arquitectónico.'
      },
      {
        question: '¿Trabajáis en espacios de coworking y estudios creativos?',
        answer: 'Sí, instalamos sistemas eléctricos para coworkings y estudios en Arganzuela. Diseñamos múltiples circuitos independientes, enchufes de alta densidad, iluminación regulable, y preparamos instalación para equipamiento tecnológico y creativo.'
      }
    ],
    semanticOwnership: ['electricista', 'arganzuela', 'madrid', 'lofts', 'industrial', 'conversiones']
  },

  // Madrid Tetuán - Dense Mixed Affordable Modernization
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    districtSlug: 'tetuan',
    metadata: {
      title: 'Electricista Tetuán Madrid | Modernización Asequible y Comunidades | Reparar24',
      description: 'Electricista en Tetuán Madrid. Servicio eléctrico pr áctico para edificios densos, actualizaciones asequibles, sobrecargas y reparaciones accesibles. Precios transparentes 24h.'
    },
    seoText: `Servicio eléctrico de confianza en Tetuán para barrio denso y diverso de zona norte madrileña. Solucionamos sobrecargas eléctricas frecuentes en apartamentos con alta ocupación y múltiples dispositivos conectados, actualizamos cuadros eléctricos obsoletos en bloques de viviendas que no soportan demanda actual, y reparamos problemas comunes sin sobrecostes priorizando seguridad y funcionalidad. Trabajamos en edificios de alta densidad donde averías en instalaciones comunes afectan a muchos vecinos, ofrecemos presupuestos claros y transparentes explicados con lenguaje sencillo, y coordinamos con propietarios e inquilinos en zonas con alta rotación de alquileres. Conocemos realidad económica de Tetuán: familias que buscan soluciones eléctricas efectivas al precio más justo posible, comercios de barrio con presupuestos ajustados, y comunidades que priorizan intervenciones necesarias sobre extras prescindibles.`,
    faqs: [
      {
        question: '¿Ofrecéis presupuestos transparentes para vecinos de Tetuán?',
        answer: 'Sí, en Tetuán trabajamos con total transparencia. Explicamos cada partida del presupuesto, ofrecemos opciones desde lo esencial hasta lo ideal, y respetamos decisiones económicas sin presionar. Precios justos para todas las comunidades del barrio.'
      },
      {
        question: '¿Solucionáis sobrecargas eléctricas en pisos con alta ocupación?',
        answer: 'Sí, es problema frecuente en Tetuán. Diagnosticamos si es cuadro antiguo, potencia insuficiente, o distribución inadecuada. Proponemos solución más económica efectiva: desde optimizar circuitos hasta actualizar cuadro o aumentar potencia contratada según caso.'
      },
      {
        question: '¿Atendéis averías colectivas en edificios densos de Tetuán?',
        answer: 'Sí, priorizamos averías en instalaciones comunes que afectan a múltiples viviendas. Coordinamos con administradores o comunidades, comunicamos a vecinos afectados, y trabajamos para resolver rápido minimizando impacto en bloques de alta densidad.'
      }
    ],
    semanticOwnership: ['electricista', 'tetuan', 'madrid', 'denso', 'asequible', 'comunidades']
  },

  // Barcelona Poblenou - Tech District Smart Office Systems
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'poblenou',
    metadata: {
      title: 'Electricista Poblenou Barcelona | Oficinas Tech y Sistemas Inteligentes | Reparar24',
      description: 'Electricista en Poblenou Barcelona distrito 22@. Especialistas en oficinas tecnológicas, coworkings, sistemas inteligentes y conversiones industriales. Servicio empresarial 24h.'
    },
    seoText: `Servicio eléctrico especializado para Poblenou, epicentro tecnológico barcelonés del distrito 22@. Instalamos sistemas eléctricos en oficinas de startups y empresas tech con alta demanda tecnológica, configuramos instalaciones para coworkings con múltiples espacios independientes y flexibles, y desarrollamos electricidad en conversiones de antiguas fábricas textiles a espacios de trabajo contemporáneos. Trabajamos con arquitectura industrial reconvertida donde instalaciones eléctricas deben integrarse con estética loft preservando ladrillo visto y estructuras originales. Gestionamos sistemas inteligentes y domótica para oficinas modernas, instalaciones trifásicas para servidores y equipamiento informático, e iluminación arquitectónica en espacios diáfanos característicos del distrito innovación. Proximidad al mar requiere considerar corrosión salina en Diagonal Mar al seleccionar materiales para instalaciones exteriores.`,
    faqs: [
      {
        question: '¿Instaláis sistemas eléctricos para oficinas y coworkings en Poblenou?',
        answer: 'Sí, somos especialistas en entorno tech del 22@. Instalamos circuitos de alta capacidad para servidores, múltiples puntos de conexión, iluminación regulable, y preparamos instalación para equipamiento tecnológico. Trabajamos fuera horario para no interrumpir actividad.'
      },
      {
        question: '¿Trabajáis en conversiones de naves industriales del Poble nou?',
        answer: 'Sí, instalamos electricidad en antiguas fábricas reconvertidas. Diseñamos distribución en espacios abiertos, instalación vista si se desea para estética industrial, y sistemas modernos cumpliendo normativa en edificios con estructura histórica.'
      },
      {
        question: '¿Gestionáis instalaciones trifásicas para equipos tecnológicos?',
        answer: 'Sí, trabajamos con instalaciones trifásicas en oficinas tech de Poblenou. Dimensionamos potencia para servidores y equipamiento, instalamos protecciones específicas, y aseguramos continuidad eléctrica crítica para operaciones tecnológicas.'
      }
    ],
    semanticOwnership: ['electricista', 'poblenou', 'barcelona', 'tech', '22@', 'coworkings']
  },

  // Barcelona Ciutat Vella - Medieval Tourism Emergency Electrical
  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Electricista Ciutat Vella Barcelona 24h | Urgencias Gótico y Raval | Reparar24',
      description: 'Electricista urgencias en Ciutat Vella Barcelona. Especialistas en edificios medievales, apartamentos turísticos, humedad y emergencias eléctricas en Gótico, Raval y Born. 24h.'
    },
    seoText: `Atendemos emergencias eléctricas en Ciutat Vella barcelonesa con comprensión de los desafíos únicos del casco histórico. La humedad característica de edificios medievales del Gótico deteriora conexiones eléctricas y cuadros, por lo que instalamos protección específica con cajas estancas IP55+ y revisamos periódicamente instalaciones en construcciones de piedra antiguas. Solucionamos urgencias en apartamentos turísticos donde diferenciales saltan por sobrecarga de aires acondicionados afectando reservas, modernizamos instalaciones obsoletas en edificios catalogados minimizando impacto estructural respetando patrimonio, y atendemos emergencias en bares y restaurantes del Raval donde cada minuto sin luz afecta negocio. Nuestro equipo conoce acceso por calles estrechas peatonales del Barri Gòtic, y coordina intervenciones cumpliendo normativas de conservación del Ajuntament en zona histórica protegida.`,
    faqs: [
      {
        question: '¿Atendéis emergencias eléctricas 24h en apartamentos turísticos del Gótico?',
        answer: 'Sí, priorizamos urgencias en alojamientos turísticos de Ciutat Vella. Llegamos rápido porque entendemos impacto en huéspedes y reservas. Solucionamos diferenciales que saltan, sobrecargas por aires acondicionados, y problemas eléctricos comunes en temporada alta.'
      },
      {
        question: '¿Trabajáis en edificios medievales con restricciones patrimoniales?',
        answer: 'Sí, tenemos experiencia en edificios históricos catalogados de Ciutat Vella. Actualizamos instalaciones minimizando obra invasiva, usamos técnicas respetuosas con estructura original, y coordinamos con patrimonio cuando edificio está protegido.'
      },
      {
        question: '¿Cómo protegéis instalaciones eléctricas de la humedad en Ciutat Vella?',
        answer: 'Instalamos cuadros con protección IP55+ resistentes a humedad medieval, ubicamos en zonas más secas posibles, aplicamos protección antihumedad en conexiones, y recomendamos revisiones preventivas en edificios del Gótico con humedad persistente.'
      }
    ],
    semanticOwnership: ['electricista', 'ciutat-vella', 'barcelona', 'gótico', 'turismo', 'medieval']
  },

  // Valencia Ruzafa - Nightlife Restaurant High Electrical Demand
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'ruzafa',
    metadata: {
      title: 'Electricista Ruzafa Valencia | Restaurantes y Alta Demanda Eléctrica | Reparar24',
      description: 'Electricista en Ruzafa Valencia especializado en hostelería y ocio nocturno. Ampliaciones potencia, instalaciones comerciales, emergencias 24h en bares y restaurantes.'
    },
    seoText: `Servicio eléctrico especializado para Ruzafa, barrio valenciano con mayor densidad de bares y restaurantes, donde demanda eléctrica nocturna es crítica. Instalamos y ampliamos potencia contratada en locales hosteleros que requieren soportar cocinas profesionales, cámaras frigoríficas, iluminación, climatización y equipamiento simultáneo en horario punta. Solucionamos sobrecargas eléctricas frecuentes cuando restaurantes añaden equipos sin actualizar instalación, modernizamos cuadros eléctricos en locales de edificios antiguos adaptados a uso comercial intensivo, y atendemos emergencias nocturnas priorizando hostelería porque cada hora cerrado significa pérdida económica. Trabajamos en viviendas del barrio bohemio donde jóvenes profesionales alquilan pisos con instalaciones antiguas, coordinando propietarios e inquilinos para reparaciones necesarias. Ofrecemos intervenciones fuera horario comercial para no afectar servicio diurno en zona con vida nocturna intensa hasta madrugada.`,
    faqs: [
      {
        question: '¿Atendéis urgencias eléctricas en restaurantes de Ruzafa durante servicio?',
        answer: 'Sí, priorizamos emergencias en hostelería de Ruzafa. Sabemos que corte eléctrico obliga a cerrar. Llegamos rápido, trabajamos eficientemente, y ofrecemos intervenciones nocturnas o madrugada para no afectar horario de mayor demanda.'
      },
      {
        question: '¿Ampliáis potencia eléctrica en locales de hostelería?',
        answer: 'Sí, gestionamos ampliaciones de potencia en bares y restaurantes de Ruzafa. Evaluamos demanda real del negocio, tramitamos aumento con distribuidora, actualizamos cuadro e instalación interna, y certificamos todo eléctricamente.'
      },
      {
        question: '¿Solucionáis sobrecargas en cocinas profesionales?',
        answer: 'Sí, diagnosticamos causa de sobrecargas en cocinas: potencia insuficiente, circuitos sobrecargados, o cuadro antiguo. Proponemos solución: redistribuir carga, añadir circuitos dedicados, o actualizar potencia según necesidad del negocio.'
      }
    ],
    semanticOwnership: ['electricista', 'ruzafa', 'valencia', 'hostelería', 'nocturno', 'restaurantes']
  },

  // Valencia L'Eixample - Elegant Residential Lighting Modernization
  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    districtSlug: 'leixample',
    metadata: {
      title: 'Electricista L\'Eixample Valencia | Residencial Elegante y Modernización | Reparar24',
      description: 'Electricista en L\'Eixample Valencia. Modernización eléctrica en viviendas elegantes, iluminación premium, actualizaciones en edificios clásicos. Servicio de calidad 24h.'
    },
    seoText: `Servicio eléctrico en L'Eixample valenciano para distrito residencial elegante con mezcla de viviendas clásicas y renovaciones contemporáneas. Modernizamos instalaciones eléctricas en pisos señoriales de principios siglo XX manteniendo distribución y estética original mientras actualizamos sistemas obsoletos, instalamos iluminación LED de calidad en viviendas que valoran eficiencia sin sacrificar confort lumínico, y diseñamos sistemas eléctricos para reformas integrales en edificios del Ensanche que combinan arquitectura tradicional con equipamiento moderno. Trabajamos con familias residentes del Eixample que priorizan calidad y durabilidad en intervenciones eléctricas, ofrecemos soluciones para viviendas amplias con múltiples estancias requiriendo distribución eléctrica bien planificada, y coordinamos con comunidades de propietarios para actualización de instalaciones comunes en edificios elegantes de Gran Vía manteniendo estética arquitectónica del distrito.`,
    faqs: [
      {
        question: '¿Modernizáis instalaciones eléctricas en pisos señoriales del Eixample?',
        answer: 'Sí, actualizamos instalaciones en viviendas elegantes de L\'Eixample. Reemplazamos cableado antiguo, modernizamos cuadros, añadimos circuitos para demanda actual, y mantenemos distribución original cuando tiene valor arquitectónico.'
      },
      {
        question: '¿Instaláis iluminación LED de calidad en viviendas del Eixample?',
        answer: 'Sí, diseñamos sistemas de iluminación LED premium para L\'Eixample. Seleccionamos temperatura color adecuada, reguladores de intensidad, y distribución que realza arquitectura sin sacrificar eficiencia energética ni confort lumínico.'
      },
      {
        question: '¿Trabajáis en reformas integrales del Ensanche valenciano?',
        answer: 'Sí, colaboramos en reformas completas de viviendas del Eixample. Diseñamos instalación eléctrica nueva adaptada a distribución actual, coordinamos con otros gremios, y entregamos instalación certificada cumpliendo normativa y expectativas de calidad.'
      }
    ],
    semanticOwnership: ['electricista', 'leixample', 'valencia', 'elegante', 'ensanche', 'iluminación premium']
  },

  // Sevilla Centro - Tourism Hospitality Old Infrastructure Electrical
  {
    serviceId: 'electricista',
    citySlug: 'sevilla',
    districtSlug: 'centro',
    metadata: {
      title: 'Electricista Centro Sevilla 24h | Turismo y Hostelería Casco Histórico | Reparar24',
      description: 'Electricista urgencias en Centro Sevilla. Especialistas en apartamentos turísticos, hoteles, edificios históricos andaluces y emergencias eléctricas 24h en casco antiguo.'
    },
    seoText: `Atendemos instalaciones eléctricas en Centro histórico sevillano donde turismo y arquitectura andaluza tradicional condicionan servicio. Solucionamos urgencias en apartamentos turísticos y hoteles donde cortes eléctricos afectan directamente a huéspedes y reputación del negocio, modernizamos cuadros eléctricos obsoletos en edificios del casco antiguo ahora dedicados a alojamiento turístico, y actualizamos potencia eléctrica en viviendas convertidas a uso turístico con mayor ocupación que requiere residencial tradicional. Trabajamos en casas-patio andaluzas con instalaciones eléctricas discurriendo por galerías perimetrales expuestas a humedad, instalamos iluminación en patios interiores con materiales resistentes y estética integrada, y coordinamos intervenciones respetando normativas patrimoniales en edificios catalogados de Santa Cruz y Arenal. Atendemos 24 horas emergencias en hostelería del centro donde cada minuto sin electricidad significa clientes descontentos y pérdida económica en zona de máxima actividad turística.`,
    faqs: [
      {
        question: '¿Atendéis urgencias eléctricas 24h en apartamentos turísticos del centro?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos del Centro Sevilla. Llegamos rápido porque sabemos impacto en huéspedes y reservas. Solucionamos cortes, diferenciales que saltan, sobrecargas estacionales, y problemas eléctricos en temporada alta.'
      },
      {
        question: '¿Trabajáis en casas-patio andaluzas con instalaciones en galerías?',
        answer: 'Sí, tenemos experiencia en arquitectura andaluza tradicional del centro. Instalamos electricidad en patios con protección contra humedad, gestionamos cableado en galerías perimetrales, y respetamos distribución tradicional mientras modernizamos instalación.'
      },
      {
        question: '¿Modernizáis instalaciones en edificios históricos del casco antiguo?',
        answer: 'Sí, actualizamos electricidad en edificios del Centro Sevilla respetando patrimonio. Reemplazamos sistemas obsoletos minimizando obra, coordinamos con patrimonio si edificio está catalogado, y adaptamos instalación a uso turístico actual.'
      }
    ],
    semanticOwnership: ['electricista', 'centro', 'sevilla', 'turismo', 'andaluz', 'hostelería']
  },

  // Málaga Este - Coastal Villas Outdoor Marine Electrical
  {
    serviceId: 'electricista',
    citySlug: 'malaga',
    districtSlug: 'este',
    metadata: {
      title: 'Electricista Este Málaga | Villas Costeras y Protección Marina | Reparar24',
      description: 'Electricista en Este Málaga (El Palo, Pedregalejo). Especialistas en instalaciones costeras, protección anticorrosión, iluminación exterior y sistemas eléctricos en zona playa. 24h.'
    },
    seoText: `Servicio eléctrico especializado en distrito Este de Málaga para viviendas costeras de El Palo y Pedregalejo donde ambiente marino condiciona instalaciones. La proximidad al Mediterráneo acelera corrosión en equipos eléctricos por humedad salina constante, obligando uso de materiales específicos resistentes y revisión periódica de cuadros, iluminación exterior y tomas de corriente en terrazas. Instalamos sistemas de iluminación exterior en jardines y fachadas con protección IP65 anticorrosión, diseñamos instalaciones eléctricas para piscinas cumpliendo distancias de seguridad y protección diferencial específica, y trabajamos en villas unifamiliares con demanda eléctrica elevada por climatización, domótica y espacios exteriores. Conocemos particularidades de viviendas en primera línea de playa donde bombas elevadoras pueden ser necesarias por cota respecto nivel del mar, y gestionamos estacionalidad: demanda máxima verano con mayor uso de duchas exteriores, iluminación nocturna en terrazas, y sistemas que sufren desgaste acelerado por ambiente salino.`,
    faqs: [
      {
        question: '¿Qué protección recomendáis para instalaciones eléctricas en zona costera?',
        answer: 'En Este Málaga recomendamos cajas IP65 para exteriores, materiales inoxidables o tratados anticorrosión, cableado con doble aislamiento, y protecciones diferenciales sensibles. Revisiones anuales preventivas detectan deterioro por salinidad antes de causar averías.'
      },
      {
        question: '¿Instaláis iluminación exterior resistente a ambiente marino?',
        answer: 'Sí, instalamos luminarias con protección IP65+ y materiales anticorrosión para jardines, terrazas y fachadas en El Palo y Pedregalejo. Usamos LED con carcasas resistentes a sal que soportan bien humedad marina costera.'
      },
      {
        question: '¿Trabajáis en instalaciones eléctricas para piscinas en villas costeras?',
        answer: 'Sí, instalamos sistemas eléctricos para piscinas cumpliendo normativa: iluminación sumergible, protección diferencial específica 30mA, distancias de seguridad, y cuadro dedicado. Usamos materiales resistentes a cloro y salinidad ambiental.'
      }
    ],
    semanticOwnership: ['electricista', 'este', 'malaga', 'costero', 'villas', 'anticorrosión']
  },

  // Zaragoza Centro - Central Commercial Residential Mix Electrical
  {
    serviceId: 'electricista',
    citySlug: 'zaragoza',
    districtSlug: 'centro',
    metadata: {
      title: 'Electricista Centro Zaragoza | Comercial y Residencial 24h | Reparar24',
      description: 'Electricista en Centro Zaragoza. Servicio eléctrico para comercios, oficinas, viviendas casco histórico. Modernización y emergencias eléctricas en zona centro. Disponible 24h.'
    },
    seoText: `Servicio eléctrico integral en Centro de Zaragoza para distrito con mezcla de comercios, oficinas y viviendas en casco histórico. Atendemos emergencias eléctricas en negocios de zona Coso y Alfonso donde cada hora sin luz significa pérdida económica, modernizamos instalaciones en edificios históricos del centro respetando estructura original mientras actualizamos sistemas obsoletos, y trabajamos en viviendas residenciales que requieren actualización eléctrica adaptada a vida urbana actual. Instalamos iluminación comercial en tiendas optimizada para exposición de productos, gestionamos sistemas eléctricos en oficinas del centro administrativo zaragozano, y solucionamos sobrecargas en apartamentos céntricos con instalaciones antiguas. Coordinamos intervenciones en calles estrechas del casco antiguo con acceso limitado, trabajamos fuera horario comercial cuando negocio no puede cerrar, y ofrecemos asesoramiento sobre optimización energética eléctrica en edificios donde modernización debe equilibrarse con presupuestos ajustados característicos de comercio local centro urbano.`,
    faqs: [
      {
        question: '¿Atendéis urgencias eléctricas en comercios del Centro Zaragoza?',
        answer: 'Sí, priorizamos emergencias en negocios del centro. Entendemos que corte eléctrico obliga a cerrar. Llegamos rápido, diagnosticamos y reparamos eficientemente, y ofrecemos intervenciones nocturnas o festivas si negocio no puede cerrar durante día.'
      },
      {
        question: '¿Modernizáis instalaciones en edificios históricos del casco antiguo?',
        answer: 'Sí, actualizamos electricidad en edificios del Centro Zaragoza. Reemplazamos cuadros obsoletos, modernizamos cableado insuficiente, añadimos circuitos para demanda actual, y respetamos estructura histórica minimizando obra invasiva.'
      },
      {
        question: '¿Instaláis iluminación comercial en tiendas del centro?',
        answer: 'Sí, diseñamos iluminación para comercios del Centro. Optimizamos exposición de productos, seleccionamos temperatura color adecuada, balanceamos eficiencia energética con calidad lumínica, y cumplimos normativa eléctrica comercial.'
      }
    ],
    semanticOwnership: ['electricista', 'centro', 'zaragoza', 'comercial', 'casco antiguo', 'mixto']
  },

  // Zaragoza San José - Traditional Family Practical Solutions
  {
    serviceId: 'electricista',
    citySlug: 'zaragoza',
    districtSlug: 'san-jose',
    metadata: {
      title: 'Electricista San José Zaragoza | Familias y Soluciones Prácticas | Reparar24',
      description: 'Electricista en San José Zaragoza. Servicio eléctrico para viviendas familiares, reparaciones asequibles, actualizaciones prácticas y mantenimiento comunitario. Precios honestos 24h.'
    },
    seoText: `Servicio eléctrico de confianza en San José para barrio zaragozano de familias trabajadoras que valoran soluciones prácticas y precios justos. Solucionamos sobrecargas eléctricas en viviendas familiares donde aparatos modernos superan capacidad de cuadros antiguos, actualizamos instalaciones obsoletas con presupuestos ajustados a realidad económica de vecinos, y reparamos problemas comunes priorizando seguridad y funcionalidad sobre extras prescindibles. Trabajamos en bloques de viviendas donde coordinación con comunidades es necesaria para intervenciones en instalaciones compartidas, ofrecemos presupuestos transparentes explicando claramente opciones desde lo esencial hasta lo completo para que familias decidan según su economía, y atendemos edificios sin ascensor sin cobrar extra por acceso porque es realidad del barrio tradicional. Conocemos San José: vecinos que buscan electricista honesto que solucione problemas sin sobrecostes, comercios locales con presupuestos limitados, y comunidades que valoran trabajo bien hecho a precio razonable.`,
    faqs: [
      {
        question: '¿Ofrecéis precios justos para familias de San José?',
        answer: 'Sí, en San José trabajamos con honestidad y transparencia. Presupuestamos claramente, explicamos qué es necesario y qué opcional, ofrecemos alternativas económicas cuando existen, y respetamos decisiones de cada familia sin presionar.'
      },
      {
        question: '¿Solucionáis sobrecargas eléctricas en viviendas familiares?',
        answer: 'Sí, diagnosticamos causa: cuadro antiguo, potencia insuficiente, o circuitos sobrecargados. Proponemos solución más económica efectiva: optimizar distribución actual, actualizar cuadro, o aumentar potencia según necesidad real y presupuesto disponible.'
      },
      {
        question: '¿Trabajáis con comunidades de propietarios en San José?',
        answer: 'Sí, colaboramos con comunidades en San José. Mantenemos instalaciones comunes, actualizamos cuadros generales, reparamos iluminación de portales y escaleras, y ofrecemos presupuestos adaptados a posibilidades económicas de la comunidad.'
      }
    ],
    semanticOwnership: ['electricista', 'san-jose', 'zaragoza', 'familias', 'práctico', 'asequible']
  },

  // ========================================
  // DESATASCOS PHASE 1 PILOT - 10 DISTRICTS
  // ========================================

  // Madrid Centro - Historic Building Drain Emergencies
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'centro',
    metadata: {
      title: 'Desatascos Centro Madrid 24h | Bajantes Antiguas y Urgencias | Reparar24',
      description: 'Desatascos urgentes en Centro Madrid. Especialistas en edificios históricos, bajantes comunitarias, atascos nocturnos en zona hostelera y redes antiguas. Servicio 24 horas.'
    },
    seoText: `Servicio de desatascos especializado en Centro de Madrid para edificios históricos con redes de saneamiento antiguas. Atend emos urgencias de atascos en bajantes comunitarias que afectan a múltiples viviendas simultáneamente, solucionamos obstrucciones en restaurantes de Gran Vía y Lavapiés donde acumulación de grasa bloquea desagües profesionales, y respondemos rápido a inundaciones por atascos en apartamentos turísticos del casco antiguo. Realizamos inspección con cámara CCTV en tuberías de edificios protegidos para diagnosticar sin obras invasivas, limpieza a presión de colectores comunitarios en propiedades señoriales, y mantenimiento preventivo de arquetas y bajantes en comunidades que priorizan evitar emergencias costosas. Conocemos acceso complicado en calles peatonales del Madrid histórico y trabajamos 24 horas atendiendo urgencias nocturnas en zona hostelera donde cada minuto de servicio interrumpido afecta negocio.`,
    faqs: [
      {
        question: '¿Atendéis atascos en bajantes comunitarias de edificios antiguos del Centro?',
        answer: 'Sí, es muy frecuente en Centro Madrid. Bajantes comunitarias antiguas acumulan residuos y provocan atascos que afectan a varias plantas. Localizamos obstrucción con CCTV, desbloqueamos con presión o herramientas específicas, y recomendamos limpieza preventiva anual.'
      },
      {
        question: '¿Realizáis inspección CCTV en tuberías de edificios protegidos?',
        answer: 'Sí, en edificios históricos protegidos del Centro usamos cámaras de inspección CCTV para diagnosticar estado de tuberías internas sin obras. Identificamos obstrucciones, roturas, raíces, y planificamos intervención mínimamente invasiva respetando estructura protegida.'
      },
      {
        question: '¿Solucionáis atascos de grasa en restaurantes del Centro?',
        answer: 'Sí, atendemos emergencias en hostelería del Centro Madrid. Limpiamos desagües con acumulación de grasas, instalamos separadores cuando procede, y ofrecemos mantenimiento preventivo para restaurantes que quieren evitar atascos en horario servicio.'
      }
    ],
    semanticOwnership: ['desatascos', 'centro', 'madrid', 'bajantes antiguas', 'atascos comunitarios', 'CCTV']
  },

  // Madrid Chamberí - Old Apartment Vertical Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'chamberi',
    metadata: {
      title: 'Desatascos Chamberí Madrid | Bajantes Comunitarias y Atascos Recurrentes',
      description: 'Desatascos en Chamberí Madrid especializado en edificios antiguos. Bajantes verticales obstruidas, mantenimiento preventivo comunitario y solución de atascos recurrentes. 24h.'
    },
    seoText: `En Chamberí atendemos problemática específica de edificios con instalaciones de saneamiento de décadas anteriores. Solucionamos atascos recurrentes en bajantes verticales que comparten múltiples viviendas donde residuos acumulados provocan obstrucciones periódicas en plantas bajas y medias, limpiamos colectores comunitarios en edificios donde antigüedad de tuberías genera estrechamientos por incrustaciones, y desbloqueamos desagües de cocina y baño en pisos con sistemas obsoletos que no soportan uso actual. Trabajamos con comunidades de vecinos para mantenimiento preventivo de bajantes generales reduciendo emergencias futuras, realizamos limpieza a presión de arquetas y registros en patios interiores característicos del distrito, y ofrecemos inspección CCTV para evaluar estado real de tuberías antiguas antes de planificar renovaciones. Coordinamos intervenciones minimizando molestias a vecinos y priorizando averías que afectan instalaciones comunes críticas.`,
    faqs: [
      {
        question: '¿Por qué se atascan frecuentemente las bajantes en edificios antiguos de Chamberí?',
        answer: 'Bajantes antiguas de Chamberí tienen diámetro reducido y acumulación de décadas de residuos adheridos. Estrechamientos internos provocan atascos recurrentes. Recomendamos limpieza preventiva a presión anual y en casos críticos evaluamos renovación con inspección CCTV.'
      },
      {
        question: '¿Realizáis limpieza preventiva de bajantes comunitarias?',
        answer: 'Sí, ofrecemos contratos de mantenimiento preventivo para comunidades de Chamberí. Limpiamos bajantes generales con presión, inspeccionamos arquetas y registros, eliminamos residuos acumulados, y prevenimos atascos que afectan a múltiples viviendas simultáneamente.'
      },
      {
        question: '¿Cómo localizáis obstrucciones en bajantes verticales?',
        answer: 'Usamos cámaras CCTV que introducimos por arquetas o registros para localizar exactamente dónde está el atasco en bajante vertical. Identificamos si es acumulación de residuos, objeto atascado, o rotura, y elegimos técnica de desatasco más efectiva.'
      }
    ],
    semanticOwnership: ['desatascos', 'chamberi', 'madrid', 'bajantes verticales', 'atascos recurrentes', 'comunidades']
  },

  // Madrid Salamanca - Premium Discreet Drain Maintenance
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'salamanca',
    metadata: {
      title: 'Desatascos Salamanca Madrid | Mantenimiento Preventivo y Urgencias Discretas',
      description: 'Desatascos premium en Salamanca Madrid. Servicio discreto para edificios de alto standing, mantenimiento preventivo, inspección CCTV y urgencias en hostelería. 24h.'
    },
    seoText: `Servicio de desatascos profesional en Salamanca adaptado a edificios premium y comunidades exclusivas que valoran discreción. Realizamos mantenimiento preventivo programado de bajantes y colectores en propiedades de alto standing evitando emergencias incomodas, limpiamos sistemas de drenaje en restaurantes de zona Serrano y Velázquez con intervenciones fuera horario comercial para no afectar negocio, y atendemos urgencias con protocolos estrictos de presentación y limpieza requeridos en comunidades exclusivas del distrito. Ofrecemos inspección CCTV avanzada para evaluar estado de tuberías sin obras, limpieza a alta presión de colectores con equipamiento profesional que no daña instalaciones delicadas, y contratos anuales de mantenimiento para propiedades que priorizan prevención sobre reparación reactiva. Coordinamos con porterías y administradores, trabajamos en horarios convenientes para propietarios exigentes, y garantizamos servicio impecable que preserva prestigio de edificio y tranquilidad de residentes.`,
    faqs: [
      {
        question: '¿Ofrecéis mantenimiento preventivo discreto para edificios de Salamanca?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo para propiedades premium de Salamanca. Limpiamos bajantes y colectores programadamente, inspeccionamos con CCTV, trabajamos discretamente coordinando con porterías, y prevenimos emergencias incómodas en comunidades exclusivas.'
      },
      {
        question: '¿Atendéis urgencias en restaurantes de zona Serrano fuera de horario?',
        answer: 'Sí, trabajamos 24h y ofrecemos servicio nocturno para hostelería de Salamanca. Solucionamos atascos de grasa en cocinas profesionales, desbloqueamos desagües rápidamente, e intervenimos fuera horario comercial para no afectar servicio a clientes.'
      },
      {
        question: '¿Qué incluye inspección CCTV de tuberías en edificios de Salamanca?',
        answer: 'Inspeccionamos tuberías con cámara de alta definición, grabamos estado interno del sistema, identificamos obstrucciones/roturas/raíces, entregamos informe con imágenes y recomendaciones, y planificamos intervenciones necesarias sin sorpresas. Servicio no invasivo ideal para propiedades premium.'
      }
    ],
    semanticOwnership: ['desatascos', 'salamanca', 'madrid', 'mantenimiento preventivo', 'discreto', 'premium']
  },

  // Barcelona Ciutat Vella - Medieval Sewer Emergency Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Desatascos Ciutat Vella Barcelona 24h | Redes Antiguas Gótico y Raval',
      description: 'Desatascos urgentes en Ciutat Vella Barcelona. Especialistas en redes medievales, apartamentos turísticos, bajantes húmedas y atascos en Gótico, Raval y Born. 24 horas.'
    },
    seoText: `Atendemos emergencias de desatascos en Ciutat Vella barcelonesa con comprensión de los desafíos únicos de redes de saneamiento medievales. Los sistemas antiguos del Gótico y Raval tienen diámetros estrechos y materiales deteriorados que provocan atascos frecuentes, trabajamos en apartamentos turísticos donde alta rotación de usuarios genera obstrucciones por uso inadecuado de inodoros, y solucionamos inundaciones por atascos en bajos comerciales donde colectores antiguos colapsan en temporada alta. La humedad característica de edificios históricos acelera deterioro de tuberías requiriendo limpieza preventiva más frecuente, realizamos inspección CCTV en redes antiguas para diagnosticar sin obras invasivas en edificios catalogados, y coordinamos con Ajuntament cuando intervención afecta a colectores municipales protegidos. Nuestro equipo conoce acceso por calles estrechas peatonales del Barri Gòtic, lleva equipamiento portátil adaptado, y responde 24 horas a urgencias en hostelería donde cada minuto de baño fuera servicio afecta negocio turístico.`,
    faqs: [
      {
        question: '¿Las redes medievales del Gótico provocan más atascos?',
        answer: 'Sí, sistemas de saneamiento antiguos de Ciutat Vella tienen diámetros reducidos, materiales deteriorados, y trazados irregulares que favorecen atascos. Recomendamos uso responsable de inodoros y limpieza preventiva periódica en edificios del casco histórico.'
      },
      {
        question: '¿Atendéis urgencias en apartamentos turísticos del Gótico 24h?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos de Ciutat Vella. Solucionamos atascos en inodoros, desagües de ducha obstruidos, y bajantes bloqueadas rápidamente para no afectar huéspedes ni reservas. Disponibles 24 horas.'
      },
      {
        question: '¿Cómo accedéis a edificios en calles estrechas del casco antiguo?',
        answer: 'Llevamos equipamiento profesional portátil adaptado a calles peatonales del Gótico. Llegamos con herramientas manuales, máquinas de presión compactas, y cámaras CCTV transportables. Experiencia en acceso complicado característico de Ciutat Vella.'
      }
    ],
    semanticOwnership: ['desatascos', 'ciutat-vella', 'barcelona', 'redes antiguas', 'gótico', 'medieval']
  },

  // Barcelona Eixample - Large Residential Block Vertical Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'eixample',
    metadata: {
      title: 'Desatascos Eixample Barcelona | Bajantes Comunitarias y Edificios Modernistas',
      description: 'Desatascos en Eixample Barcelona. Especialistas en grandes bloques residenciales, bajantes verticales comunitarias, mantenimiento preventivo y urgencias en edificios modernistas. 24h.'
    },
    seoText: `Servicio de desatascos en Eixample para edificios modernistas del plan Cerdà con instalaciones de saneamiento comunitarias extensas. Atendemos atascos en bajantes verticales de bloques de gran altura donde obstrucción en piso medio afecta a plantas superiores provocando inundación desde arriba, limpiamos colectores en patios de manzana característicos de Eixample donde confluyen desagües de múltiples fincas compartiendo arquetas comunes, y solucionamos obstrucciones en sistemas originales de edificios de principios 1900s con tuberías de fundición deterioradas. Realizamos mantenimiento preventivo para comunidades de propietarios que priorizan evitar emergencias costosas afectando a muchos vecinos, limpieza a presión de bajantes generales coordinando acceso a registros en plantas comunes, e inspección CCTV para evaluar estado real de tuberías antiguas antes de planificar renovaciones estructurales. Trabajamos en restaurantes y comercios de Eixample con alta carga de grasas requiriendo limpieza especializada de desagües profesionales.`,
    faqs: [
      {
        question: '¿Solucionáis atascos en bajantes verticales de edificios altos del Eixample?',
        answer: 'Sí, especialistas en bajantes verticales de bloques del Eixample. Localizamos obstrucción con CCTV, accedemos por registros en plantas comunes, desbloqueamos con presión, y coordinamos con comunidad para minimizar molestias a vecinos afectados.'
      },
      {
        question: '¿Trabajáis en patios de manzana con arquetas compartidas?',
        answer: 'Sí, limpiamos arquetas comunitarias en patios de manzana del Eixample donde múltiples fincas comparten colectores. Desbloqueamos obstrucciones, inspeccionamos estado del sistema compartido, y coordinamos intervenciones con todas las comunidades afectadas.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para grandes comunidades del Eixample?',
        answer: 'Sí, diseñamos contratos de mantenimiento para comunidades grandes. Limpiamos bajantes generales anualmente, inspeccionamos arquetas, eliminamos acumulaciones antes de causar atascos, y prevenimos emergencias que afectan a múltiples vecinos simultáneamente.'
      }
    ],
    semanticOwnership: ['desatascos', 'eixample', 'barcelona', 'bajantes verticales', 'comunidades grandes', 'patios manzana']
  },

  // Valencia Poblats Marítims - Coastal Humidity Sand Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'poblats-maritims',
    metadata: {
      title: 'Desatascos Poblats Marítims Valencia | Sistemas Costeros y Arena',
      description: 'Desatascos en Poblats Marítims Valencia. Especialistas en atascos por arena, humedad salina, apartamentos playa, sistemas exteriores y drenaje costero. Servicio 24 horas.'
    },
    seoText: `Servicio de desatascos especializado para zona costera de Poblats Marítims donde ambiente marino condiciona sistemas de saneamiento. La arena arrastrada desde playa se acumula en desagües exteriores, duchas de jardín, y sumideros provocando obstrucciones específicas de zona costera, humedad salina acelera corrosión de tuberías metálicas en bajantes generando roturas y atascos por desprendimiento de óxido interno, y apartamentos de uso vacacional sufren atascos por acumulación entre temporadas requiriendo revisión antes de alquileres estivales. Limpiamos desagües de terrazas y patios con acumulación de arena y sal, desbloqueamos sistemas de drenaje en chalets cercanos a playa donde raíces de vegetación costera invaden tuberías buscando humedad, y ofrecemos mantenimiento preventivo en periodo bajo para propiedades que evitan emergencias en temporada alta de máxima ocupación. Conocemos particularidades de saneamiento en primera línea marítima y adaptamos intervenciones a estacionalidad turística del distrito costero valenciano.`,
    faqs: [
      {
        question: '¿La arena de playa provoca atascos en Poblats Marítims?',
        answer: 'Sí, es problema frecuente en zona costera. Arena arrastrada se acumula en desagües de duchas exteriores, terrazas, y sumideros. Limpiamos regularmente con presión, instalamos rejillas protectoras donde procede, y recomendamos mantenimiento preventivo en viviendas cercanas a playa.'
      },
      {
        question: '¿Atendéis atascos en apartamentos vacacionales antes de temporada alta?',
        answer: 'Sí, ofrecemos revisiones pre-temporada en Poblats Marítims. Desbloqueamos desagües acumulados entre alquileres, inspeccionamos bajantes, limpiamos arquetas, y aseguramos sistemas funcionan correctamente antes de llegada de inquilinos veraniegos.'
      },
      {
        question: '¿Solucionáis atascos por raíces en chalets costeros?',
        answer: 'Sí, en chalets de Poblats Marítims raíces de vegetación buscan humedad e invaden tuberías. Inspeccionamos con CCTV, eliminamos raíces con fresado o presión, y recomendamos protección o renovación de tramos afectados según gravedad.'
      }
    ],
    semanticOwnership: ['desatascos', 'poblats-maritims', 'valencia', 'arena', 'costero', 'humedad salina']
  },

  // Valencia Ciutat Vella - Historic Sewer Tourism Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Desatascos Ciutat Vella Valencia 24h | Redes Históricas y Hostelería',
      description: 'Desatascos urgentes en Ciutat Vella Valencia. Especialistas en casco antiguo, apartamentos turísticos, hostelería, redes históricas y atascos en Carmen y Mercat. 24 horas.'
    },
    seoText: `Atendemos desatascos en Ciutat Vella valenciana con conocimiento de red de saneamiento histórica del centro antiguo. Solucionamos urgencias en apartamentos turísticos del Carmen donde atascos afectan a huéspedes y reservas, desbloqueamos desagües en restaurantes y bares del Mercado Central con alta carga de residuos orgánicos y grasa, y respondemos rápido a inundaciones por atascos en bajos comerciales de calles históricas con colectores municipales antiguos compartidos. Realizamos limpieza preventiva de bajantes comunitarias en edificios del casco antiguo donde system as originales tienen diámetros reducidos y materiales deteriorados, inspeccionamos con CCTV redes históricas para diagnosticar sin obras invasivas en zona protegida patrimonialmente, y coordinamos con comerciantes en intervenciones que afectan a múltiples negocios conectados a mismo colector. Conocemos acceso complicado por calles estrechas del centro histórico valenciano, llevamos equipamiento adaptado, y trabajamos 24 horas atendiendo emergencias nocturnas en zona hostelera activa hasta madrugada.`,
    faqs: [
      {
        question: '¿Atendéis atascos urgentes en apartamentos turísticos del Carmen?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos de Ciutat Vella. Desbloqueamos inodoros, duchas y lavabos obstruidos rápidamente para no afectar huéspedes. Disponibles 24h sabiendo importancia de resolver antes de check-in siguiente.'
      },
      {
        question: '¿Los restaurantes del Mercado Central tienen más atascos por grasa?',
        answer: 'Sí, hostelería de Ciutat Vella genera alta carga de grasas y residuos orgánicos que bloquean desagües. Limpiamos sistemas con productos específicos o presión, ofrecemos mantenimiento preventivo, y recomendamos separadores de grasa donde normativa requiere.'
      },
      {
        question: '¿Trabajáis en calles estrechas del casco antiguo de Valencia?',
        answer: 'Sí, estamos acostumbrados a acceso complicado de Ciutat Vella. Llevamos equipos portátiles adaptados, llegamos a pie o con vehículos compactos, y coordinamos acceso en calles peatonales del centro histórico valenciano.'
      }
    ],
    semanticOwnership: ['desatascos', 'ciutat-vella', 'valencia', 'casco antiguo', 'turismo', 'hostelería']
  },

  // Sevilla Triana - Traditional Patio House River Humidity Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    districtSlug: 'triana',
    metadata: {
      title: 'Desatascos Triana Sevilla | Casas-Patio y Bajantes Húmedas Guadalquivir',
      description: 'Desatascos en Triana Sevilla especializado en arquitectura tradicional. Casas-patio andaluzas, humedad del río, bajantes antiguas y sistemas comunitarios tradicionales. 24h.'
    },
    seoText: `Servicio de desatascos en Triana para arquitectura andaluza tradicional con particularidades de drenaje características del barrio sevillano. Trabajamos en casas-patio donde desagües discurren por galerías perimetrales expuestas a humedad requiriendo limpieza frecuente de residuos acumulados, atendemos bajantes comunitarias en edificios cercanos al Guadalquivir donde humedad del río acelera deterioro de tuberías provocando obstrucciones por corrosión interna, y solucionamos atascos en sistemas de saneamiento tradicionales con arquetas en patios interiores compartidos entre múltiples viviendas. Realizamos inspección CCTV de tuberías antiguas en casas tradicionales para diagnosticar estado sin obras invasivas respetando estructura histórica, limpiamos colectores en calles del barrio con acceso complicado por estrechamiento y tráfico limitado, y ofrecemos mantenimiento preventivo para comunidades que priorizan evitar emergencias en viviendas con instalaciones originales de décadas. Entendemos realidad de Triana: vecinos tradicionales que valoran servicio honesto respetando carácter andaluz del barrio.`,
    faqs: [
      {
        question: '¿Trabajáis con casas-patio tradicionales de Triana?',
        answer: 'Sí, tenemos experiencia en arquitectura andaluza de Triana. Limpiamos desagües en galerías de patios, desbloqueamos arquetas comunitarias, inspeccionamos bajantes húmedas, y respetamos distribución tradicional mientras solucionamos atascos en casas-patio características.'
      },
      {
        question: '¿La humedad del Guadalquivir afecta a las tuberías en Triana?',
        answer: 'Sí, humedad ambiental por proximidad al río acelera corrosión de bajantes metálicas en Triana. Provoca desprendimientos internos que bloquean flujo. Inspeccionamos con CCTV, limpiamos con presión, y recomendamos renovación en casos avanzados.'
      },
      {
        question: '¿Limpiáis arquetas en patios interiores compartidos?',
        answer: 'Sí, limpiamos arquetas comunitarias en patios tradicionales de Triana. Extraemos residuos acumulados, desbloqueamos conexiones a colector general, y coordinamos con vecinos que comparten sistema de saneamiento característico de arquitectura andaluza.'
      }
    ],
    semanticOwnership: ['desatascos', 'triana', 'sevilla', 'casas-patio', 'andaluz', 'guadalquivir']
  },

  // Málaga Centro - Tourism Hospitality Coastal Drain Emergencies
  {
    serviceId: 'desatascos',
    citySlug: 'malaga',
    districtSlug: 'centro',
    metadata: {
      title: 'Desatascos Centro Málaga 24h | Apartamentos Turísticos y Hostelería Urgente',
      description: 'Desatascos urgencias en Centro Málaga. Especialistas en apartamentos turísticos, hoteles, restaurantes, atascos nocturnos en zona puerto y emergencias costeras. 24 horas.'
    },
    seoText: `Atendemos urgencias de desatascos en Centro de Málaga para sector turístico y hostelero del casco histórico costero. Solucionamos atascos en apartamentos turísticos donde inodoros o duchas bloqueados afectan directamente a huéspedes y reputación del alojamiento, desbloqueamos desagües en restaurantes y bares de zona puerto con alta demanda estacional requiriendo respuesta inmediata, y respondemos 24 horas a emergencias nocturnas en hostelería activa hasta madrugada donde cada minuto de baño fuera de servicio significa clientes descontentos. El ambiente salino marino afecta tuberías metálicas acelerando corrosión y favoreciendo atascos por desprendimientos internos, limpiamos colectores en edificios del centro convertidos a uso turístico con mayor carga de saneamiento que residencial tradicional, y ofrecemos mantenimiento preventivo fuera temporada para propiedades que evitan emergencias en meses de mayo r ocupación. Conocemos presión turística del Centro malagueño, priorizamos urgencias que afectan negocio, y coordinamos intervenciones minimizando impacto en actividad hotelera del distrito costero.`,
    faqs: [
      {
        question: '¿Atendéis atascos urgentes en apartamentos turísticos del Centro 24h?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos de Centro Málaga. Desbloqueamos inodoros y desagües rápidamente para no afectar huéspedes ni reservas. Llegamos en 30-45 minutos, trabajamos limpio, disponibles 24 horas incluyendo festivos.'
      },
      {
        question: '¿Solucionáis atascos en restaurantes de zona puerto durante servicio?',
        answer: 'Sí, atendemos urgencias en hostelería del Centro. Sabemos que baño fuera servicio obliga a rechazar clientes. Llegamos rápido, desbloqueamos eficientemente, trabajamos discretamente, y ofrecemos intervenciones nocturnas si negocio no puede cerrar.'
      },
      {
        question: '¿El ambiente marino afecta a las tuberías en Centro Málaga?',
        answer: 'Sí, humedad salina del puerto acelera corrosión en tuberías metálicas. Provoca desprendimientos que bloquean desagües. Recomendamos inspección CCTV periódica, limpieza preventiva, y en casos severos renovación de bajantes corroídas.'
      }
    ],
    semanticOwnership: ['desatascos', 'centro', 'malaga', 'turismo', 'hostelería', 'costero']
  },

  // Zaragoza Universidad - Student Apartments Grease Misuse Blockages
  {
    serviceId: 'desatascos',
    citySlug: 'zaragoza',
    districtSlug: 'universidad',
    metadata: {
      title: 'Desatascos Universidad Zaragoza | Pisos Estudiantes y Atascos Frecuentes',
      description: 'Desatascos en zona Universidad Zaragoza. Especialistas en pisos compartidos estudiantes, atascos por mal uso, grasa acumulada y reparaciones rápidas asequibles. 24 horas.'
    },
    seoText: `Servicio de desatascos en zona Universidad de Zaragoza para pisos de estudiantes con atascos frecuentes por uso intensivo y desconocimiento de sistemas. Atendemos obstrucciones en inodoros por tirar objetos inadecuados como toallitas húmedas o residuos que no deberían ir por saneamiento, desbloqueamos desagües de cocina con acumulación de grasa porque estudiantes vierten aceite usado directamente en fregadero, y solucionamos atascos en duchas compartidas de pisos con múltiples inquilinos generando alta carga de residuos orgánicos y jabones. Trabajamos con propietarios e inquilinos facilitando comunicación sobre qué corresponde a cada parte según normativa de arrendamiento, ofrecemos precios ajustados para perfil económico de estudiantes en reparaciones necesarias, y realizamos intervenciones rápidas durante periodo académico cuando jóvenes necesitan urgentemente baño funcional. Conocemos realidad de Universidad: pisos con alta rotación de inquilinos, uso intensivo de instalaciones, y necesidad de soluciones rápidas económicas sin comprometer funcionalidad esencial del saneamiento.`,
    faqs: [
      {
        question: '¿Atendéis atascos en pisos de estudiantes de zona Universidad?',
        answer: 'Sí, atendemos frecuentemente pisos compartidos de estudiantes cerca del campus. Desbloqueamos inodoros, fregaderos y duchas obstruidos, explicamos uso correcto para prevenir repetición, y ofrecemos precios ajustados para presupuestos estudiantiles.'
      },
      {
        question: '¿Los atascos por grasa en fregadero se pueden evitar?',
        answer: 'Sí, nunca verter aceite usado por fregadero. Se solidifica en tuberías y bloquea. En pisos de estudiantes recomendamos: recoger aceite en botellas para reciclar, usar rejillas en desagües, y enjuagar con agua fría tras lavar platos con grasa.'
      },
      {
        question: '¿Quién paga el desatasco en piso de alquiler de estudiantes?',
        answer: 'Depende de causa: atasco por mal uso del inquilino (tirar toallitas, aceite) corresponde a inquilino; obstrucción por antigüedad de tuberías o fallo instalación corresponde a propietario. Evaluamos causa, explicamos responsabilidades según ley arrendamiento.'
      }
    ],
    semanticOwnership: ['desatascos', 'universidad', 'zaragoza', 'estudiantes', 'grasa', 'mal uso']
  },

  // ========================================
  // DESATASCOS PHASE 2 EXPANSION - 11 DISTRICTS
  // ========================================

  // Madrid Retiro - Residential Community Preventive Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'retiro',
    metadata: {
      title: 'Desatascos Retiro Madrid | Mantenimiento Comunitario Preventivo',
      description: 'Desatascos en Retiro Madrid. Mantenimiento preventivo de bajantes comunitarias, arquetas y sistemas de drenaje en edificios residenciales. Servicio discreto 24h.'
    },
    seoText: `Servicio de desatascos en Retiro enfocado al mantenimiento preventivo de comunidades residenciales y edificios clásicos del distrito. Realizamos limpiezas programadas de bajantes generales y colectores comunitarios para evitar atascos que afecten a múltiples viviendas, inspeccionamos con cámara CCTV sistemas de saneamiento envejecidos para detectar acumulaciones antes de que causen obstrucciones, y limpiamos arquetas y registros en patios interiores y zonas comunes. Trabajamos discretamente coordinando con administradores de fincas y porterías, respetando horarios convenientes para vecinos del distrito, y ofrecemos contratos de mantenimiento anual para comunidades que priorizan prevenir emergencias costosas. Conocemos sistemas de saneamiento en edificios residenciales de décadas con instalaciones originales que requieren atención periódica, y proporcionamos informes técnicos tras cada intervención documentando estado del sistema y recomendaciones de mantenimiento futuro.`,
    faqs: [
      {
        question: '¿Ofrecéis mantenimiento preventivo de bajantes para comunidades del Retiro?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo para comunidades de Retiro. Limpiamos bajantes generales con presión anualmente, inspeccionamos arquetas, eliminamos acumulaciones progresivas, y prevenimos atascos que afectan a múltiples vecinos simultáneamente.'
      },
      {
        question: '¿Realizáis inspección CCTV en sistemas de saneamiento residenciales?',
        answer: 'Sí, inspeccionamos con cámara CCTV colectores y bajantes de edificios del Retiro. Identificamos acumulaciones, estrechamientos, roturas o raíces antes de causar atascos mayores. Entregamos informe con imágenes y recomendaciones para comunidad.'
      },
      {
        question: '¿Cómo coordinan las intervenciones con administradores de fincas?',
        answer: 'Coordinamos horarios con administradores y porterías del Retiro, trabajamos discretamente, informamos a vecinos afectados, y documentamos intervenciones con informes técnicos. Respetamos tranquilidad residencial del distrito en cada servicio.'
      }
    ],
    semanticOwnership: ['desatascos', 'retiro', 'madrid', 'mantenimiento preventivo', 'comunidades', 'discreto']
  },

  // Madrid Chamartín - Commercial Office Building Drainage Systems
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'chamartin',
    metadata: {
      title: 'Desatascos Chamartín Madrid | Sistemas Comerciales y Colectores 24h',
      description: 'Desatascos en Chamartín Madrid para oficinas y edificios comerciales. Colectores de alta capacidad, grasa comercial, emergencias empresariales. Servicio continuidad operativa 24h.'
    },
    seoText: `Servicio de desatascos especializado para edificios comerciales y de oficinas de Chamartín donde continuidad operativa es crítica. Atendemos atascos en colectores de edificios corporativos con alta carga de uso durante horario laboral, limpiamos sistemas de drenaje en cafeterías y comedores empresariales donde grasa acumulada bloquea desagües profesionales, y respondemos urgencias en edificios de oficinas donde baños fuera de servicio afectan actividad empresarial. Realizamos mantenimiento preventivo de arquetas y colectores en edificios de zona financiera y AZCA, trabajamos fuera de horario para no interrumpir operaciones diarias de empresas, e inspeccionamos con CCTV sistemas de alta capacidad antes de renovaciones o expansiones. Coordinamos con property managers y administradores de edificios comerciales, priorizamos emergencias que impactan actividad empresarial, y ofrecemos contratos de mantenimiento para empresas que requieren continuidad sin interrupciones de saneamiento.`,
    faqs: [
      {
        question: '¿Los edificios de oficinas de Chamartín sufren más bloqueos en colectores?',
        answer: 'Edificios de oficinas tienen alta carga concentrada en horario laboral: múltiples baños, cafeterías, comedores. Colectores acumulan residuos orgánicos y grasa. Recomendamos mantenimiento preventivo semestral para evitar atascos que interrumpan actividad empresarial.'
      },
      {
        question: '¿Atendéis urgencias en edificios comerciales fuera de horario?',
        answer: 'Sí, trabajamos 24h y ofrecemos servicio nocturno y fines de semana para Chamartín. Sabemos que intervenciones diurnas interrumpen oficinas. Coordinamos con seguridad de edificios y completamos trabajos cuando empresas no operan.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para empresas en Chamartín?',
        answer: 'Sí, diseñamos contratos de mantenimiento para edificios comerciales de Chamartín. Limpiamos colectores, arquetas y bajantes programadamente, inspeccionamos con CCTV sistemas de alta capacidad, y garantizamos continuidad operativa sin atascos sorpresa.'
      }
    ],
    semanticOwnership: ['desatascos', 'chamartin', 'madrid', 'comercial', 'oficinas', 'colectores']
  },

  // Barcelona Gràcia - Artistic Old Residential Mixed Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'gracia',
    metadata: {
      title: 'Desatascos Gràcia Barcelona | Sistemas Antiguos y Comercios Locales',
      description: 'Desatascos en Gràcia Barcelona. Bajantes antiguas, comercios artesanales, sistemas de drenaje mixtos y atascos en barrio bohemio. Servicio local 24h.'
    },
    seoText: `Servicio de desatascos en Gràcia para barrio con mezcla de viviendas residenciales antiguas y comercios locales artesanales. Atendemos atascos en bajantes comunitarias de edificios históricos del barrio con sistemas de saneamiento originales estrechos, desbloqueamos desagües en bares y restaurantes de Plaza del Sol donde grasa acumulada causa obstrucciones, y solucionamos problemas en redes mixtas donde viviendas y comercios comparten colectores. Limpiamos arquetas en patios interiores característicos de Gràcia con acceso complicado por calles estrechas, realizamos inspección CCTV en sistemas antiguos para evaluar estado sin obras invasivas, y trabajamos con comercios locales entendiendo presupuestos ajustados de pequeños negocios del barrio. Conocemos particularidades de Gràcia: edificios de diferentes épocas con saneamiento heterogéneo, comunidades que valoran servicio cercano y honesto, y necesidad de soluciones prácticas adaptadas a realidad del barrio bohemio barcelonés.`,
    faqs: [
      {
        question: '¿Atendéis atascos en comercios y bares de Gràcia?',
        answer: 'Sí, trabajamos con hostelería y comercios locales de Gràcia. Desbloqueamos desagües con grasa acumulada, limpiamos sistemas de drenaje en cocinas profesionales, y ofrecemos precios justos para pequeños negocios del barrio.'
      },
      {
        question: '¿Las bajantes antiguas de Gràcia requieren más mantenimiento?',
        answer: 'Sí, edificios históricos de Gràcia tienen bajantes comunitarias con diámetros reducidos y materiales envejecidos que favorecen atascos. Recomendamos limpieza preventiva periódica y uso responsable de inodoros para minimizar obstrucciones.'
      },
      {
        question: '¿Cómo accedéis a patios interiores en calles estrechas de Gràcia?',
        answer: 'Llevamos equipamiento portátil adaptado a calles estrechas de Gràcia. Llegamos a pie o con vehículos compactos, transportamos herramientas manuales y máquinas de presión ligeras. Experiencia en accesos complicados del barrio.'
      }
    ],
    semanticOwnership: ['desatascos', 'gracia', 'barcelona', 'sistemas antiguos', 'comercios locales', 'mixto']
  },

  // Barcelona Sants - Dense Apartment Recurrent Communal Blockages
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'sants',
    metadata: {
      title: 'Desatascos Sants Barcelona | Atascos Comunales y Soluciones Prácticas',
      description: 'Desatascos en Sants Barcelona. Especialistas en bloques densos, bajantes comunitarias recurrentes, soluciones asequibles y reparaciones honestas. Precios justos 24h.'
    },
    seoText: `Servicio de desatascos de confianza en Sants para barrio barcelonés de edificios densos con alta ocupación. Solucionamos atascos recurrentes en bajantes comunitarias que afectan a múltiples viviendas por acumulación de residuos en sistemas de saneamiento compartidos, desbloqueamos colectores en bloques de apartamentos con uso intensivo donde obstrucciones son frecuentes, y limpiamos arquetas en patios de edificios populares coordinando con comunidades de vecinos. Ofrecemos presupuestos transparentes y precios justos para familias trabajadoras de Sants que buscan soluciones efectivas sin sobrecostes, trabajamos en edificios sin ascensor sin cobrar extra por acceso complicado, y explicamos claramente causa del atasco y opciones de reparación para que comunidades decidan según presupuesto disponible. Conocemos realidad de Sants: bloques de alta densidad con instalaciones envejecidas, comunidades que valoran servicio honesto, y necesidad de desatascos efectivos al precio más accesible posible manteniendo calidad profesional.`,
    faqs: [
      {
        question: '¿Ofrecéis precios accesibles para comunidades de Sants?',
        answer: 'Sí, en Sants trabajamos con honestidad y transparencia. Presupuestamos claramente, explicamos opciones desde lo esencial hasta lo completo, y respetamos que comunidades decidan según economía familiar sin presionar.'
      },
      {
        question: '¿Por qué hay atascos recurrentes en edificios densos de Sants?',
        answer: 'Bloques densos de Sants tienen alta ocupación y uso intensivo de bajantes comunitarias. Acumulación diaria de residuos en diámetros reducidos causa atascos frecuentes. Recomendamos limpieza preventiva periódica y educación sobre uso responsable.'
      },
      {
        question: '¿Trabajáis en edificios sin ascensor de Sants?',
        answer: 'Sí, muchos edificios populares de Sants no tienen ascensor. Llevamos herramientas portátiles, subimos equipos necesarios, y no cobramos extra por escaleras. Forma parte del servicio en barrios trabajadores como Sants.'
      }
    ],
    semanticOwnership: ['desatascos', 'sants', 'barcelona', 'denso', 'comunales', 'asequible']
  },

  // Barcelona Sarrià - Premium Preventive CCTV Maintenance
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'sarria',
    metadata: {
      title: 'Desatascos Sarrià Barcelona | Mantenimiento Preventivo y CCTV Premium',
      description: 'Desatascos premium en Sarrià Barcelona. Inspección CCTV preventiva, mantenimiento disecreeto, sistemas de drenaje en villas y edificios exclusivos. Servicio 24h.'
    },
    seoText: `Servicio de desatascos premium en Sarrià adaptado a villas, chalets y edificios exclusivos de zona alta barcelonesa. Realizamos inspección con cámara CCTV de última generación en sistemas de saneamiento para diagnóstico preventivo sin obras, mantenimiento programado de colectores, bajantes y arquetas en propiedades de alto standing evitando emergencias incómodas, y limpieza especializada de sistemas de drenaje en jardines y piscinas de chalets con equipamiento profesional. Trabajamos discretamente coordinando horarios con propietarios y personal doméstico, usamos protocolos estrictos de limpieza y presentación requeridos en comunidades exclusivas, y ofrecemos contratos de mantenimiento anual para propiedades que priorizan prevención sobre reparación reactiva. Limpiamos sistemas de drenaje extensos en villas unifamiliares con múltiples baños, instalaciones exteriores y complejidad superior a apartamentos estándar, e inspeccionamos redes privadas de saneamiento antes de problemas mayores garantizando tranquilidad y continuidad sin interrupciones.`,
    faqs: [
      {
        question: '¿Realizáis mantenimiento CCTV preventivo en comunidades de Sarrià?',
        answer: 'Sí, ofrecemos inspección CCTV preventiva en Sarrià. Grabamos estado interno de tuberías con cámara alta definición, identificamos acumulaciones progresivas antes de causar atascos, entregamos informe técnico con imágenes, y planificamos mantenimiento futuro.'
      },
      {
        question: '¿Trabajáis discretamente en propiedades exclusivas de Sarrià?',
        answer: 'Sí, mantenemos protocolos estrictos de discreción en Sarrià. Coordinamos con porterías o personal doméstico, usamos uniformes corporativos, mantenemos espacio impecable, y respetamos privacidad y tranquilidad de propiedades premium.'
      },
      {
        question: '¿Ofrecéis contratos de mantenimiento para villas en Sarrià?',
        answer: 'Sí, diseñamos contratos personalizados para villas y chalets de Sarrià. Incluyen limpieza preventiva de colectores y arquetas, inspección CCTV anual, mantenimiento de drenajes exteriores, y respuesta prioritaria a cualquier urgencia.'
      }
    ],
    semanticOwnership: ['desatascos', 'sarria', 'barcelona', 'premium', 'CCTV', 'mantenimiento preventivo']
  },

  // Valencia Campanar - Residential Community Modern Systems
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'campanar',
    metadata: {
      title: 'Desatascos Campanar Valencia | Comunidades Residenciales Modernas',
      description: 'Desatascos en Campanar Valencia. Mantenimiento de comunidades, bajantes modernas, sistemas compartidos y atascos en residenciales zona norte. Servicio 24h.'
    },
    seoText: `Servicio de desatascos en Campanar para comunidades residenciales de zona norte valenciana con edificios de construcción reciente. Atendemos atascos en bajantes comunitarias de bloques de apartamentos donde residuos acumulados afectan plantas superiores, limpiamos colectores y arquetas compartidas en comunidades que priorizan mantenimiento preventivo, y solucionamos obstrucciones en sistemas modernos con mejor diseño que edificios antiguos pero igualmente susceptibles a uso inadecuado. Trabajamos con administradores de fincas en Campanar para mantenimiento programado de instalaciones comunes, inspeccionamos sistemas de saneamiento en chalets y viviendas unifamiliares con mayor complejidad que apartamentos estándar, y limpiamos desagües en urbanizaciones con zonas comunes, jardines y piscinas compartidas. Coordinamos intervenciones respetando vida familiar del distrito, ofrecemos presupuestos adaptados a comunidades residenciales, y proporcionamos informes técnicos tras cada servicio documentando estado del sistema y recomendaciones futuras.`,
    faqs: [
      {
        question: '¿Trabajáis con comunidades de propietarios en Campanar?',
        answer: 'Sí, colaboramos con administradores y comunidades de Campanar. Limpiamos bajantes generales, arquetas y colectores preventivamente, atendemos urgencias comunitarias, y ofrecemos contratos de mantenimiento anual para edificios residenciales.'
      },
      {
        question: '¿Atendéis atascos en chalets y viviendas unifamiliares?',
        answer: 'Sí, trabajamos en chalets de Campanar con sistemas más complejos: múltiples baños, desagües de jardín, piscinas. Inspeccionamos con CCTV redes privadas, limpiamos arquetas particulares, y desbloqueamos colectores individuales.'
      },
      {
        question: '¿Limpiáis desagües de piscinas en urbanizaciones de Campanar?',
        answer: 'Sí, limpiamos sistemas de drenaje en piscinas comunitarias y privadas. Desbloqueamos desagües de fondo, rebosaderos y arquetas de equipamiento, especialmente antes de temporada de baño para asegurar funcionamiento correcto.'
      }
    ],
    semanticOwnership: ['desatascos', 'campanar', 'valencia', 'comunidades residenciales', 'moderno', 'chalets']
  },

  // Valencia Extramurs - Mixed Residential Commercial Practical
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'extramurs',
    metadata: {
      title: 'Desatascos Extramurs Valencia | Mixto Residencial-Comercial Práctico',
      description: 'Desatascos en Extramurs Valencia. Atascos en zona mixta, edificios medios, comercios de barrio y soluciones prácticas de drenaje. Servicio local 24h.'
    },
    seoText: `Servicio de desatascos en Extramurs para zona valenciana mixta residencial-comercial con edificios de densidad media. Atendemos atascos en bloques de viviendas donde bajo comercial comparte colectores con apartamentos superiores generando mayor carga de residuos, desbloqueamos desagües en bares y restaurantes de barrio con acumulación de grasa en cocinas profesionales, y solucionamos obstrucciones en edificios de los 80-90 con instalaciones de saneamiento que requieren limpieza frecuente por antigüedad. Trabajamos con comunidades mixtas coordinando intervenciones que afectan tanto a vecinos como a comerciantes, ofrecemos soluciones prácticas cuando presupuesto no permite renovación completa de sistema, y limpiamos arquetas compartidas en edificios donde residencial y comercial confluyen en mismo colector municipal. Conocemos realidad de Extramurs: barrio en transición con mezcla arquitectónica, comunidades que buscan soluciones efectivas a precio justo, y necesidad de desatascos prácticos que resuelvan problemas sin obras innecesarias.`,
    faqs: [
      {
        question: '¿Atendéis edificios mixtos vivienda-comercio en Extramurs?',
        answer: 'Sí, trabajamos con edificios mixtos de Extramurs. Gestionamos atascos en colectores compartidos, coordinamos con vecinos y comerciantes, y solucionamos obstrucciones causadas por carga comercial superior a residencial estándar.'
      },
      {
        question: '¿Limpiáis desagües en bares y restaurantes de Extramurs?',
        answer: 'Sí, atendemos hostelería de Extramurs. Desbloqueamos desagües con grasa acumulada en cocinas, limpiamos con presión o productos específicos, y ofrecemos mantenimiento preventivo para evitar atascos durante horario servicio.'
      },
      {
        question: '¿Ofrecéis soluciones prácticas cuando no hay presupuesto para renovar?',
        answer: 'Sí, en Extramurs entendemos limitaciones económicas. Priorizamos limpieza efectiva sobre renovación completa cuando sistema aún funciona. Limpiamos, desbloqueamos, y mantenemos instalaciones maximizando vida útil sin obras innecesarias.'
      }
    ],
    semanticOwnership: ['desatascos', 'extramurs', 'valencia', 'mixto', 'práctico', 'residencial-comercial']
  },

  // Sevilla Nervión - Business Commercial Office Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    districtSlug: 'nervion',
    metadata: {
      title: 'Desatascos Nervión Sevilla | Sistemas Comerciales y Empresariales 24h',
      description: 'Desatascos en Nervión Sevilla. Edificios de oficinas, centros comerciales, hostelería y sistemas de alta capacidad. Continuidad operativa empresarial 24h.'
    },
    seoText: `Servicio de desatascos especializado para zona empresarial y comercial de Nervión donde continuidad operativa es prioritaria. Atendemos urgencias en edificios de oficinas y centros comerciales donde atascos en baños públicos afectan actividad empresarial, limpiamos sistemas de drenaje en locales de hostelería con alta carga de grasa acumulada en cocinas profesionales, y desbloqueamos colectores de edificios comerciales con múltiples negocios compartiendo instalaciones de saneamiento. Trabajamos fuera de horario comercial para no interrumpir operaciones diarias de empresas, coordinamos con property managers y administradores de edificios corporativos en intervenciones planificadas, y respondemos 24h a emergencias que impactan continuidad empresarial del distrito. Realizamos inspección CCTV en colectores de alta capacidad antes de renovaciones o expansiones comerciales, limpiamos arquetas en zonas de carga y descarga de centros comerciales, y ofrecemos contratos de mantenimiento preventivo para empresas que priorizan evitar interrupciones costosas de sistema de saneamiento.`,
    faqs: [
      {
        question: '¿Atendéis emergencias en edificios comerciales de Nervión durante horario laboral?',
        answer: 'Sí, priorizamos urgencias comerciales en Nervión. Entendemos que atascos en oficinas o centros comerciales afectan negocio. Llegamos rápido, trabajamos eficientemente, y minimizamos impacto en actividad empresarial.'
      },
      {
        question: '¿Limpiáis sistemas de drenaje en restaurantes de centros comerciales?',
        answer: 'Sí, trabajamos con hostelería en centros comerciales de Nervión. Desbloqueamos desagües con grasa, limpiamos arquetas y colectores compartidos, y coordinamos intervenciones fuera horario punta para no afectar servicio a clientes.'
      },
      {
        question: '¿Ofrecéis servicio fuera de horario para empresas en Nervión?',
        answer: 'Sí, trabajamos noche y fines de semana en Nervión. Muchas empresas prefieren mantenimiento o reparaciones cuando oficinas están cerradas. Coordinamos con seguridad de edificios y completamos trabajos sin interrumpir operaciones.'
      }
    ],
    semanticOwnership: ['desatascos', 'nervion', 'sevilla', 'comercial', 'empresarial', 'oficinas']
  },

  // Sevilla Centro - Tourism Historic Hospitality Emergency Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    districtSlug: 'centro',
    metadata: {
      title: 'Desatascos Centro Sevilla 24h | Turismo y Redes Históricas Urgencias',
      description: 'Desatascos urgentes en Centro Sevilla. Apartamentos turísticos, hostelería, redes antiguas andaluzas y emergencias 24h en casco histórico. Acceso estrecho.'
    },
    seoText: `Atendemos desatascos urgentes en Centro histórico sevillano con comprensión de redes de saneamiento antiguas y presión turística. Solucionamos atascos en apartamentos turísticos del casco antiguo donde inodoros bloqueados afectan huéspedes y reservas, desbloqueamos desagües en restaurantes y bares de zona Alfalfa y Arenal con alta carga de grasa en temporada alta, y respondemos 24h a inundaciones por atascos en edificios del centro histórico con colectores municipales compartidos y envejecidos. Trabajamos en casas-patio andaluzas donde desagües discurren por galerías expuestas acumulando residuos, limpiamos arquetas en edificios convertidos a uso turístico con mayor carga que residencial tradicional, y realizamos inspección CCTV en redes históricas para diagnosticar sin obras invasivas en edificios catalogados. Conocemos acceso complicado por calles estrechas peatonales del centro sevillano, llevamos equipamiento portátil adaptado, y priorizamos emergencias en hostelería donde cada minuto sin baño funcional significa clientes descontentos y pérdida económica en zona de máxima actividad turística.`,
    faqs: [
      {
        question: '¿Atendéis atascos urgentes en apartamentos turísticos del centro 24h?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos del Centro Sevilla. Desbloqueamos inodoros y desagües rápidamente para no afectar huéspedes ni reservas. Llegamos en 30-45 minutos, disponibles 24h incluyendo festivos.'
      },
      {
        question: '¿Las redes antiguas del casco histórico sevillano sufren más atascos?',
        answer: 'Sí, redes de saneamiento antiguas del Centro Sevilla tienen diámetros reducidos, materiales deteriorados, y trazados irregulares que favorecen obstrucciones. Recomendamos uso responsable y limpieza preventiva en edificios históricos.'
      },
      {
        question: '¿Cómo accedéis a edificios en calles estrechas del centro?',
        answer: 'Llevamos equipamiento portátil adaptado a calles peatonales del centro histórico sevillano. Llegamos a pie o con vehículos compactos, transportamos herramientas manuales y máquinas de presión ligeras. Experiencia en accesos complicados del casco antiguo.'
      }
    ],
    semanticOwnership: ['desatascos', 'centro', 'sevilla', 'turismo', 'hostelería', 'redes históricas']
  },

  // Málaga Este - Coastal Villa Outdoor Sand Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'malaga',
    districtSlug: 'este',
    metadata: {
      title: 'Desatascos Este Málaga | Villas Costeras y Sistemas Exteriores',
      description: 'Desatascos en Este Málaga (El Palo, Pedregalejo). Arena, salinidad, drenajes exteriores, piscinas y sistemas costeros. Mantenimiento preventivo playa 24h.'
    },
    seoText: `Servicio de desatascos especializado en distrito Este de Málaga para viviendas costeras de El Palo y Pedregalejo donde ambiente marino condiciona sistemas de drenaje. La arena arrastrada desde playa se acumula en desagües de duchas exteriores, sumideros de terrazas y patios provocando obstrucciones específicas de zona costera, limpiamos sistemas de drenaje en jardines y piscinas de villas donde residuos orgánicos y arena combinados causan atascos, y desbloqueamos colectores afectados por salinidad ambiental que deteriora tuberías metálicas generando desprendimientos internos. Realizamos mantenimiento preventivo en propiedades de primera línea marítima antes de temporada alta de máxima ocupación, limpiamos arquetas y registros en chalets con instalaciones exteriores extensas, e inspeccionamos con CCTV sistemas privados de saneamiento en villas para detectar raíces de vegetación costera invasiva o roturas por asentamiento terreno. Conocemos estacionalidad de zona: demanda máxima verano con mayor uso de duchas exteriores post-playa, y necesidad de sistemas funcionando correctamente en periodo vacacional cuando propiedades alcanzan ocupación pico.`,
    faqs: [
      {
        question: '¿La arena y salinidad afectan los desagües exteriores en Málaga Este?',
        answer: 'Sí, arena desde playa se acumula en desagües de duchas exteriores, terrazas y sumideros. Salinidad ambiental corroe tuberías metálicas. Recomendamos limpieza preventiva periódica, rejillas protectoras, y uso de materiales anticorrosión en zona costera.'
      },
      {
        question: '¿Limpiáis sistemas de drenaje en piscinas de villas costeras?',
        answer: 'Sí, limpiamos drenajes de piscinas en chalets de Este Málaga. Desbloqueamos desagües de fondo, rebosaderos, arquetas de equipamiento, y evacuación de aguas. Especialmente antes de temporada para asegurar funcionamiento correcto.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo pre-temporada en propiedades de playa?',
        answer: 'Sí, ofrecemos revisiones preventivas en Poblats Marítims antes de verano. Limpiamos desagües acumulados entre temporadas, desbloqueamos colectores, inspeccionamos arquetas, y aseguramos sistemas funcionan para temporada alta de ocupación.'
      }
    ],
    semanticOwnership: ['desatascos', 'este', 'malaga', 'costero', 'arena', 'villas']
  },

  // Zaragoza Delicias - Dense Family Housing Affordable Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'zaragoza',
    districtSlug: 'delicias',
    metadata: {
      title: 'Desatascos Delicias Zaragoza | Comunidades Familiares y Soluciones Honestas',
      description: 'Desatascos en Delicias Zaragoza. Bajantes comunitarias, edificios densos, atascos recurrentes y soluciones asequibles para familias. Precios transparentes 24h.'
    },
    seoText: `Servicio de desatascos de confianza en Delicias para barrio zaragozano de familias trabajadoras que valoran servicio honesto. Atendemos atascos recurrentes en bajantes comunitarias de bloques de viviendas con uso intensivo donde residuos acumulados afectan a múltiples familias, desbloqueamos colectores en edificios densos de los 60-70 con instalaciones de saneamiento envejecidas, y limpiamos arquetas en comunidades con presupuestos ajustados buscando soluciones efectivas sin sobrecostes innecesarios. Ofrecemos presupuestos transparentes explicados claramente para que comunidades y familias decidan según economía disponible, trabajamos en edificios sin ascensor sin cobrar extra por acceso complicado porque es realidad del barrio tradicional, y coordinamos con administradores y vecinos facilitando comunicación sobre intervenciones necesarias versus recomendables. Conocemos Delicias: bloques de alta densidad familiar con instalaciones que requieren mantenimiento frecuente, comunidades que valoran honestidad sobre ventas agresivas, y necesidad de desatascos efectivos al precio más justo posible manteniendo calidad profesional y seguridad sanitaria.`,
    faqs: [
      {
        question: '¿Ofrecéis precios honestos para familias de Delicias?',
        answer: 'Sí, en Delicias trabajamos con transparencia total. Presupuestamos claramente cada opción, explicamos qué es necesario y qué opcional, y respetamos decisiones económicas de familias sin presionar. Servicio honesto para vecinos del barrio.'
      },
      {
        question: '¿Por qué hay atascos recurrentes en edificios densos de Delicias?',
        answer: 'Edificios de alta densidad en Delicias tienen bajantes comunitarias con uso intensivo diario: múltiples viviendas, familias numerosas. Acumulación progresiva causa atascos frecuentes. Recomendamos limpieza preventiva periódica y educación sobre uso responsable.'
      },
      {
        question: '¿Trabajáis con comunidades de vecinos en Delicias?',
        answer: 'Sí, colaboramos con comunidades y administradores de Delicias. Limpiamos bajantes generales, arquetas compartidas, atendemos urgencias comunitarias, y ofrecemos presupuestos adaptados a posibilidades económicas de comunidades familiares del barrio.'
      }
    ],
    semanticOwnership: ['desatascos', 'delicias', 'zaragoza', 'familias', 'comunidades', 'transparente']
  },

  // ========================================
  // DESATASCOS PHASE 3 FINAL COMPLETION - 9 DISTRICTS
  // ========================================

  // Madrid Arganzuela - Industrial Conversion Loft Drainage Legacy
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'arganzuela',
    metadata: {
      title: 'Desatascos Arganzuela Madrid | Sistemas Industriales Reconvertidos',
      description: 'Desatascos en Arganzuela Madrid. Lofts industriales, sistemas mixtos viejos/nuevos, colectores ferroviarios y drenaje en reconversión urbana. Servicio 24h.'
    },
    seoText: `Servicio de desatascos en Arganzuela para distrito en transformación con legado industrial-ferroviario único. Atendemos atascos en lofts y conversiones de antiguas naves donde sistemas de drenaje nuevos se conectan a colectores municipales históricos generando incompatibilidades y obstrucciones, limpiamos bajantes en edificios obreros tradicionales con saneamiento original de décadas que comparte red con desarrollos contemporáneos, y solucionamos problemas en zona Matadero y Madrid Río donde infraestructura ferroviaria antigua condiciona evacuación de aguas residuales. Trabajamos en espacios industriales reconvertidos a viviendas donde diseño de drenaje debe adaptarse a distribuciones abiertas sin estructura tabicada tradicional, inspeccionamos con CCTV colectores mixtos para identificar incompatibilidades entre tramos antiguos y renovados, y gestionamos atascos en zona Atocha con alta densidad de uso por proximidad a estación ferroviaria y flujo turístico. Conocemos realidad de Arganzuela: mezcla arquitectónica compleja con saneamiento heterogéneo que requiere diagnóstico caso por caso.`,
    faqs: [
      {
        question: '¿Trabajáis con sistemas de drenaje en lofts de antiguas naves de Arganzuela?',
        answer: 'Sí, trabajamos en conversiones industriales de Arganzuela. Gestionamos atascos donde drenaje nuevo se conecta a colectores municipales antiguos, inspeccionamos con CCTV compatibilidad de sistemas, y solucionamos obstrucciones en instalaciones retrofitadas.'
      },
      {
        question: '¿Los colectores antiguos ferroviarios de Arganzuela causan más atascos?',
        answer: 'Sí, legado ferroviario-industrial de Arganzuela significa colectores municipales antiguos diseñados para uso industrial, no residencial moderno. Diámetros y materiales envejecidos favorecen atascos. Recomendamos inspección CCTV y limpieza preventiva.'
      },
      {
        question: '¿Atendéis atascos en edificios obreros tradicionales de Arganzuela?',
        answer: 'Sí, limpiamos bajantes y colectores en viviendas obreras históricas con instalaciones originales. Desbloqueamos obstrucciones, inspeccionamos estado del sistema, y adaptamos mantenimiento a realidad de edificios que conviven con desarrollos modernos.'
      }
    ],
    semanticOwnership: ['desatascos', 'arganzuela', 'madrid', 'industrial', 'lofts', 'reconversión']
  },

  // Madrid Tetuán - Dense Apartment Affordable Practical Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    districtSlug: 'tetuan',
    metadata: {
      title: 'Desatascos Tetuán Madrid | Edificios Densos y Soluciones Accesibles',
      description: 'Desatascos en Tetuán Madrid. Bajantes comunitarias recurrentes, bloques densos, atascos frecuentes y soluciones prácticas para comunidades. Precios transparentes 24h.'
    },
    seoText: `Servicio de desatascos de confianza en Tetuán para barrio denso de zona norte madrileña con alta ocupación residencial. Atendemos atascos recurrentes en bajantes comunitarias de bloques con múltiples viviendas por planta donde acumulación diaria de residuos provoca obstrucciones frecuentes que afectan a muchos vecinos, limpiamos colectores en edificios con uso intensivo por densidad poblacional y viviendas multigeneracionales, y solucionamos inundaciones por atascos en plantas bajas cuando bajante general colapsa por sobrecarga. Ofrecemos presupuestos transparentes para comunidades con presupuestos ajustados explicando opciones desde limpieza esencial hasta mantenimiento preventivo completo, trabajamos en edificios sin ascensor sin cobrar extra por acceso complicado, y coordinamos con administradores facilitando comunicación sobre intervenciones necesarias versus recomendables. Conocemos realidad de Tetuán: bloques de alta densidad con instalaciones antiguas que requieren limpieza frecuente, comunidades diversas que valoran honestidad, y necesidad de desatascos efectivos al precio más accesible posible sin comprometer funcionalidad sanitaria.`,
    faqs: [
      {
        question: '¿Ofrecéis precios accesibles para comunidades de bloques densos de Tetuán?',
        answer: 'Sí, en Tetuán trabajamos con transparencia total. Presupuestamos claramente, explicamos opciones desde lo esencial hasta lo completo, y respetamos que comunidades decidan según economía sin presionar. Servicio honesto para vecinos del barrio.'
      },
      {
        question: '¿Por qué hay atascos tan frecuentes en edificios de alta densidad?',
        answer: 'Bloques densos de Tetuán tienen bajantes comunitarias con uso intensivo diario: múltiples viviendas, ocupación alta. Acumulación constante causa atascos recurrentes. Recomendamos limpieza preventiva semestral y educación vecinal sobre uso responsable de inodoros.'
      },
      {
        question: '¿Trabajáis en edificios sin ascensor de Tetuán?',
        answer: 'Sí, muchos bloques de Tetuán no tienen ascensor. Llevamos herramientas portátiles adecuadas, subimos equipos necesarios, y no cobramos extra por escaleras. Forma parte del servicio en barrios tradicionales densos.'
      }
    ],
    semanticOwnership: ['desatascos', 'tetuan', 'madrid', 'denso', 'bloques altos', 'accesible']
  },

  // Barcelona Poblenou - Tech Office Commercial Collector Systems
  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    districtSlug: 'poblenou',
    metadata: {
      title: 'Desatascos Poblenou Barcelona | Oficinas Tech y Colectores Comerciales',
      description: 'Desatascos en Poblenou Barcelona distrito 22@. Coworkings, oficinas tech, sistemas comerciales de alta ocupación y mantenimiento preventivo empresarial. 24h.'
    },
    seoText: `Servicio de desatascos especializado para Poblenou, distrito 22@ barcelonés con alta concentración de oficinas tecnológicas y coworkings. Atendemos atascos en colectores de edificios de oficinas con uso intensivo durante horario laboral por múltiples empresas compartiendo instalaciones, limpiamos sistemas de drenaje en cocinas office y cafeterías corporativas donde grasa y residuos orgánicos se acumulan, y respondemos urgencias en coworkings donde baños fuera de servicio afectan a docenas de profesionales simultáneamente. Trabajamos fuera de horario laboral para no interrumpir actividad tecnológica y startups del distrito innovación, coordinamos con property managers de edificios corporativos en mantenimiento preventivo programado, e inspeccionamos con CCTV sistemas de alta capacidad en conversiones de naves industriales donde drenaje se instaló durante reconversión. Ofrecemos contratos de mantenimiento para empresas tech que priorizan continuidad operativa sin interrupciones sanitarias, conocemos estacionalidad de eventos y congresos en 22@ que aumentan ocupación puntual de instalaciones, y gestionamos colectores compartidos en edificios multi-tenant donde múltiples negocios comparten infraestructura de saneamiento.`,
    faqs: [
      {
        question: '¿Realizáis mantenimiento preventivo de colectores en coworkings de Poblenou?',
        answer: 'Sí, ofrecemos contratos de mantenimiento para coworkings y oficinas del 22@. Limpiamos colectores preventivamente, inspeccionamos arquetas, eliminamos acumulaciones antes de provocar atascos que afecten a múltiples empresas compartiendo edificio.'
      },
      {
        question: '¿Atendéis urgencias en edificios de oficinas sin interrumpir actividad?',
        answer: 'Sí, trabajamos 24h y priorizamos intervenciones nocturnas o fines de semana en Poblenou. Coordinamos con administradores, accedemos con seguridad de edificios, y completamos desatascos cuando oficinas están cerradas minimizando impacto operativo.'
      },
      {
        question: '¿Limpiáis desagües con grasa en cocinas office del 22@?',
        answer: 'Sí, atendemos cocinas office y cafeterías corporativas de Poblenou. Desbloqueamos desagües con acumulación de grasa, limpiamos con productos específicos o presión, y ofrecemos mantenimiento preventivo para evitar atascos en horario laboral.'
      }
    ],
    semanticOwnership: ['desatascos', 'poblenou', 'barcelona', '22@', 'oficinas', 'coworkings']
  },

  // Valencia Ruzafa - Nightlife Restaurant Grease Emergency Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'ruzafa',
    metadata: {
      title: 'Desatascos Ruzafa Valencia 24h | Restaurantes y Atascos por Grasa',
      description: 'Desatascos urgentes en Ruzafa Valencia. Especialistas en hostelería, grasa acumulada, bares y restaurantes, emergencias nocturnas. Servicio continuo 24 horas.'
    },
    seoText: `Servicio de desatascos especializado para Ruzafa, barrio valenciano con mayor densidad de bares y restaurantes donde acumulación de grasa es crítica. Atendemos emergencias en desagües de cocinas profesionales bloqueados por grasas solidificadas que impiden funcionamiento de restaurantes, limpiamos colectores compartidos en edificios con múltiples locales hosteleros donde carga combinada supera capacidad de bajantes originales, y solucionamos atascos nocturnos y fines de semana cuando demanda hostelera es máxima y cada minuto cerrado significa pérdida económica. Trabajamos en horarios adaptados al ritmo del barrio: intervenciones nocturnas post-cierre para no afectar servicio a clientes, limpieza de arquetas en calles con terrazas activas hasta madrugada, y respuesta rápida a urgencias en horario punta cuando restaurante no puede cerrar. Ofrecemos mantenimiento preventivo con limpieza programada de desagües en cocinas evitando atascos sorpresa durante servicio, inspeccionamos con CCTV colectores con alta carga de grasa para planificar limpiezas, e instalamos o mantenemos separadores de grasa cumpliendo normativa hostelera en locales que requieren esta protección.`,
    faqs: [
      {
        question: '¿Los restaurantes de Ruzafa generan más atascos por grasa acumulada?',
        answer: 'Sí, la alta densidad de bares y restaurantes en Ruzafa genera acumulación constante de grasa en colectores y desagües. Grasa se solidifica en tuberías causando obstrucciones severas. Recomendamos limpieza preventiva mensual y separadores de grasa en cocinas profesionales.'
      },
      {
        question: '¿Atendéis urgencias nocturnas en hostelería de Ruzafa?',
        answer: 'Sí, trabajamos 24h y priorizamos emergencias en bares y restaurantes. Sabemos que atasco en cocina o baño obliga a cerrar. Llegamos rápido incluso madrugada, trabajamos eficientemente, y ofrecemos intervención post-cierre para no afectar servicio.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para reducir atascos en restaurantes?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo para hostelería de Ruzafa. Limpiamos desagües mensualmente con productos específicos desengrasantes o presión, inspeccionamos separadores de grasa, y prevenimos atascos sorpresa durante servicio.'
      }
    ],
    semanticOwnership: ['desatascos', 'ruzafa', 'valencia', 'restaurantes', 'grasa', 'hostelería']
  },

  // Valencia L'Eixample - Elegant Residential Old Communal Systems
  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    districtSlug: 'leixample',
    metadata: {
      title: 'Desatascos L\'Eixample Valencia | Edificios Elegantes y Bajantes Antiguas',
      description: 'Desatascos en L\'Eixample Valencia. Edificios señoriales, bajantes comunitarias antiguas, mantenimiento preventivo y sistemas clásicos del Ensanche. Servicio 24h.'
    },
    seoText: `Servicio de desatascos en L'Eixample valenciano para edificios señoriales del Ensanche con sistemas comunitarios clásicos que requieren mantenimiento especializado. Atendemos atascos en bajantes verticales de edificios de principios siglo XX con tuberías originales de diámetros reducidos y materiales envejecidos, limpiamos colectores comunitarios en propiedades elegantes de Gran Vía donde múltiples viviendas comparten infraestructura de saneamiento antigua, y solucionamos obstrucciones en sistemas que combinan tramos originales con renovaciones parciales creando incompatibilidades. Realizamos mantenimiento preventivo para comunidades residenciales que valoran preservar funcionamiento sin emergencias incómodas, limpieza programada de arquetas y registros en edificios clásicos coordinando con administradores de fincas, e inspección CCTV de bajantes para evaluar estado real antes de planificar renovaciones estructurales. Trabajamos discretamente respetando carácter residencial elegante del Eixample, conocemos particularidades de saneamiento en edificios históricos valencianos, y ofrecemos soluciones que equilibran preservación de instalaciones funcionales con necesidad de modernización cuando deterioro es avanzado.`,
    faqs: [
      {
        question: '¿Las bajantes antiguas del Ensanche valenciano requieren más mantenimiento?',
        answer: 'Sí, edificios señoriales de L\'Eixample tienen bajantes comunitarias originales con diámetros reducidos y materiales envejecidos. Acumulación progresiva causa atascos. Recomendamos limpieza preventiva anual con presión e inspección CCTV cada 2-3 años.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para comunidades del Eixample?',
        answer: 'Sí, diseñamos contratos de mantenimiento para comunidades de L\'Eixample. Limpiamos bajantes generales programadamente, inspeccionamos arquetas, eliminamos acumulaciones antes de causar obstrucciones, y coordinamos discretamente con administradores respetando vida residencial.'
      },
      {
        question: '¿Inspeccionáis bajantes con CCTV en edificios clásicos?',
        answer: 'Sí, inspeccionamos con cámara CCTV bajantes verticales de edificios del Eixample. Identificamos estrechamientos, acumulaciones, roturas o deterioro de materiales originales sin obras. Entregamos informe con imágenes y recomendaciones para comunidad.'
      }
    ],
    semanticOwnership: ['desatascos', 'leixample', 'valencia', 'ensanche', 'bajantes antiguas', 'elegante']
  },

  // Sevilla Macarena - Traditional Family Housing Aging Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    districtSlug: 'macarena',
    metadata: {
      title: 'Desatascos Macarena Sevilla | Comunidades Familiares y Sistemas Antiguos',
      description: 'Desatascos en Macarena Sevilla. Edificios familiares, bajantes envejecidas, atascos comunitarios y soluciones asequibles en barrio tradicional. Servicio 24h.'
    },
    seoText: `Servicio de desatascos en Macarena para barrio sevillano de familias trabajadoras con edificios tradicionales y sistemas de saneamiento envejecidos. Atendemos atascos recurrentes en bajantes comunitarias de bloques donde múltiples viviendas comparten instalaciones antiguas con materiales deteriorados, limpiamos colectores en edificios de los 60-80 con tuberías que acumulan residuos por diámetros reducidos y obsolescencia, y solucionamos obstrucciones en comunidades con presupuestos limitados buscando soluciones prácticas efectivas. Trabajamos con administradores y vecinos de Macarena coordinando intervenciones que afectan a múltiples familias, ofrecemos presupuestos claros adaptados a realidad económica del barrio tradicional, y explicamos causas de atascos recomendando mantenimiento preventivo cuando comunidad puede permitírselo. Conocemos particularidades de Macarena: edificios familiares populares con instalaciones que requieren atención frecuente, vecinos que valoran servicio honesto sin sobrecostes, y necesidad de desatascos que resuelvan problemas urgentes al precio más justo posible manteniendo funcionamiento sanitario correcto.`,
    faqs: [
      {
        question: '¿Trabajáis con comunidades familiares de Macarena?',
        answer: 'Sí, colaboramos regularmente con comunidades de Macarena. Limpiamos bajantes comunitarias, atendemos urgencias que afectan a vecinos, explicamos presupuestos claramente, y respetamos decisiones económicas de comunidades familiares del barrio.'
      },
      {
        question: '¿Los edificios antiguos de Macarena sufren atascos recurrentes?',
        answer: 'Sí, edificios de los 60-80 en Macarena tienen bajantes con diámetros reducidos y materiales envejecidos. Acumulación progresiva de residuos causa atascos frecuentes. Recomendamos limpieza preventiva periódica para minimizar emergencias.'
      },
      {
        question: '¿Ofrecéis soluciones prácticas cuando presupuesto comunitario es ajustado?',
        answer: 'Sí, en Macarena entendemos limitaciones económicas. Priorizamos limpieza esencial efectiva, explicamos opciones desde lo necesario hasta lo ideal, y facilitamos que comunidad decida según presupuesto disponible sin presionar por extras.'
      }
    ],
    semanticOwnership: ['desatascos', 'macarena', 'sevilla', 'familias', 'tradicional', 'envejecido']
  },

  // Sevilla Sur - Modern Residential Communities Shared Systems
  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    districtSlug: 'sur',
    metadata: {
      title: 'Desatascos Sur Sevilla | Urbanizaciones Modernas y Comunidades',
      description: 'Desatascos en Sur Sevilla. Urbanizaciones residenciales, sistemas compartidos modernos, mantenimiento comunitario y viviendas familiares. Servicio preventivo 24h.'
    },
    seoText: `Servicio de desatascos en distrito Sur de Sevilla para urbanizaciones residenciales modernas y comunidades de construcción reciente. Atendemos atascos en bajantes comunitarias de bloques de apartamentos con diseño moderno pero igualmente susceptibles a uso inadecuado por residentes, limpiamos colectores y arquetas compartidas en urbanizaciones con zonas comunes donde múltiples edificios confluyen en misma red de saneamiento, y solucionamos obstrucciones en viviendas unifamiliares y chalets adosados con sistemas privados más complejos que apartamentos estándar. Trabajamos con comunidades de propietarios en mantenimiento preventivo programado para evitar emergencias costosas, inspeccionamos con CCTV sistemas modernos para detectar defectos constructivos o acumulaciones tempranas, y limpiamos desagües en urbanizaciones con piscinas comunitarias y jardines compartidos generando mayor volumen de residuos orgánicos. Coordinamos con administradores de fincas respetando normativas comunitarias, ofrecemos contratos adaptados a presupuestos de urbanizaciones familiares, y proporcionamos informes técnicos tras intervenciones documentando estado de instalaciones comunes de drenaje.`,
    faqs: [
      {
        question: '¿Trabajáis con urbanizaciones y comunidades del Sur de Sevilla?',
        answer: 'Sí, colaboramos con administradores de urbanizaciones del Sur. Limpiamos bajantes comunitarias, arquetas compartidas, colectores de zonas comunes, y ofrecemos contratos de mantenimiento preventivo para comunidades residenciales modernas.'
      },
      {
        question: '¿Atendéis atascos en chalets adosados del Sur?',
        answer: 'Sí, trabajamos en viviendas unifamiliares del Sur con sistemas de drenaje más complejos: múltiples baños, desagües de jardín, piscinas privadas. Inspeccionamos con CCTV redes particulares y limpiamos arquetas individuales.'
      },
      {
        question: '¿Limpiáis desagües de piscinas comunitarias en urbanizaciones?',
        answer: 'Sí, limpiamos sistemas de drenaje de piscinas comunitarias: desagües de fondo, rebosaderos, arquetas de equipamiento. Especialmente antes de temporada de baño para asegurar funcionamiento correcto sin obstrucciones.'
      }
    ],
    semanticOwnership: ['desatascos', 'sur', 'sevilla', 'urbanizaciones', 'moderno', 'comunidades']
  },

  // Málaga Teatinos - Modern Student Professional High Occupancy
  {
    serviceId: 'desatascos',
    citySlug: 'malaga',
    districtSlug: 'teatinos',
    metadata: {
      title: 'Desatascos Teatinos Málaga | Edificios Modernos y Alta Ocupación',
      description: 'Desatascos en Teatinos Málaga. Apartamentos estudiantes/profesionales, edificios nuevos alta ocupación, bajantes compartidas y mantenimiento preventivo. 24h.'
    },
    seoText: `Servicio de desatascos en Teatinos para distrito malagueño de construcción moderna con alta densidad de estudiantes y jóvenes profesionales. Atendemos atascos en bajantes comunitarias de bloques nuevos con alta ocupación por alquileres compartidos generando uso intensivo de instalaciones sanitarias, limpiamos colectores en edificios cercanos a universidad donde residuos y acumulación son frecuentes por desconocimiento de uso correcto, y solucionamos obstrucciones en viviendas de alquiler donde coordinamos con propietarios e inquilinos para reparaciones urgentes. Trabajamos en edificios modernos donde diseño de saneamiento debería ser adecuado pero alta densidad de ocupación supera capacidad prevista originalmente, ofrecemos presupuestos ajustados para perfil económico de estudiantes y jóvenes, y realizamos mantenimiento preventivo para comunidades nuevas que priorizan evitar problemas antes de que se agraven. Conocemos particularidades de Teatinos: desarrollos residenciales recientes con alta rotación de inquilinos estudiantes, uso intensivo de instalaciones compartidas, y necesidad de educación sobre uso responsable de sistemas sanitarios para minimizar atascos por mal uso.`,
    faqs: [
      {
        question: '¿Atendéis urgencias por bajantes bloqueadas en comunidades de Teatinos?',
        answer: 'Sí, atendemos urgencias comunitarias en Teatinos. Desbloqueamos bajantes que afectan a múltiples viviendas, trabajamos rápido para minimizar impacto en vecinos, y coordinamos con administradores o comunidades para acceso y solución efectiva.'
      },
      {
        question: '¿Los edificios nuevos de Teatinos también sufren atascos?',
        answer: 'Sí, aunque sean modernos, alta ocupación por alquileres compartidos genera uso intensivo que provoca atascos. Mal uso de inodoros (toallitas, residuos inadecuados) y grasa en fregaderos causan obstrucciones incluso en instalaciones recientes.'
      },
      {
        question: '¿Ofrecéis precios adaptados para estudiantes de Teatinos?',
        answer: 'Sí, en Teatinos entendemos perfil económico estudiantil. Ofrecemos presupuestos justos, explicamos opciones claramente, y coordinamos con propietarios e inquilinos para resolver averías según responsabilidades sin conflictos innecesarios.'
      }
    ],
    semanticOwnership: ['desatascos', 'teatinos', 'malaga', 'estudiantes', 'moderno', 'alta ocupación']
  },

  // Zaragoza Centro - Historic Commercial Residential Mix Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'zaragoza',
    districtSlug: 'centro',
    metadata: {
      title: 'Desatascos Centro Zaragoza | Comercial-Residencial Casco Antiguo',
      description: 'Desatascos en Centro Zaragoza. Edificios históricos, comercios, oficinas, turismo y redes antiguas del casco. Emergencias mixtas 24h.'
    },
    seoText: `Servicio de desatascos en Centro histórico de Zaragoza para distrito con mezcla de comercios, oficinas, turismo y viviendas en casco antiguo. Atendemos urgencias en restaurantes y bares de zona Coso y Alfonso donde acumulación de grasa en desagües profesionales bloquea cocinas durante servicio, solucionamos atascos en apartamentos turísticos del centro donde obstrucciones afectan huéspedes y reservas, y desbloqueamos colectores en edificios mixtos donde residencial y comercial comparten bajantes generando mayor carga que solo viviendas. Trabajamos en redes de saneamiento antiguas del casco histórico zaragozano con tuberías estrechas y materiales deteriorados que favorecen obstrucciones frecuentes, limpiamos arquetas en calles estrechas del centro con acceso vehicular complicado, y coordinamos intervenciones respetando actividad comercial diurna y vida residencial nocturna. Ofrecemos servicio nocturno para comercios que prefieren no cerrar durante día, mantenimiento preventivo para edificios históricos que priorizan evitar emergencias, y respuesta rápida a inundaciones por atascos en bajos comerciales donde cada hora afecta negocio en zona comercial central zaragozana.`,
    faqs: [
      {
        question: '¿Atendéis atascos urgentes en restaurantes del Centro Zaragoza?',
        answer: 'Sí, priorizamos emergencias en hostelería del centro. Sabemos que desagüe bloqueado en cocina obliga a cerrar. Llegamos rápido, desbloqueamos grasa acumulada, y ofrecemos intervenciones nocturnas para no afectar servicio diurno.'
      },
      {
        question: '¿Las redes antiguas del casco histórico tienen más atascos?',
        answer: 'Sí, redes de saneamiento antiguas del Centro Zaragoza tienen diámetros reducidos, materiales deteriorados, y trazados irregulares característicos de cascos históricos. Favorecen obstrucciones frecuentes. Recomendamos limpieza preventiva y uso responsable.'
      },
      {
        question: '¿Trabajáis en edificios mixtos vivienda-comercio del centro?',
        answer: 'Sí, gestionamos atascos en edificios mixtos del Centro. Coordinamos con vecinos y comerciantes cuando obstrucción afecta a colector compartido, y solucionamos problemas causados por carga comercial superior a residencial estándar.'
      }
    ],
    semanticOwnership: ['desatascos', 'centro', 'zaragoza', 'comercial', 'casco antiguo', 'mixto']
  },

  // Zaragoza San José - Family Apartment Practical Affordable Drainage
  {
    serviceId: 'desatascos',
    citySlug: 'zaragoza',
    districtSlug: 'san-jose',
    metadata: {
      title: 'Desatascos San José Zaragoza | Viviendas Familiares y Comunidades',
      description: 'Desatascos en San José Zaragoza. Edificios familiares, bajantes comunitarias, atascos recurrentes y soluciones prácticas asequibles. Precios honestos 24h.'
    },
    seoText: `Servicio de desatascos de confianza en San José para barrio zaragozano de viviendas familiares que valoran servicio honesto y precios transparentes. Atendemos atascos recurrentes en bajantes comunitarias de edificios donde familias trabajadoras comparten instalaciones de saneamiento con uso intensivo diario, limpiamos colectores en bloques de apartamentos con sistemas envejecidos que requieren mantenimiento frecuente, y solucionamos obstrucciones en comunidades con presupuestos ajustados ofreciendo opciones prácticas desde lo esencial hasta mantenimiento preventivo completo. Trabajamos en edificios sin ascensor sin cobrar extra por acceso complicado porque es realidad del barrio tradicional, ofrecemos presupuestos claros explicando qué es necesario y qué opcional para que familias decidan según economía, y coordinamos con administradores facilitando comunicación sobre intervenciones urgentes versus preventivas. Conocemos San José: comunidades familiares que buscan soluciones efectivas al precio más accesible, vecinos que valoran honestidad sobre ventas agresivas, y necesidad de desatascos que resuelvan problemas sin obras innecesarias manteniendo funcionalidad sanitaria esencial del sistema comunitario.`,
    faqs: [
      {
        question: '¿Ofrecéis precios justos para familias de San José?',
        answer: 'Sí, en San José trabajamos con honestidad y transparencia total. Presupuestamos claramente cada opción, explicamos qué es necesario y qué recomendable, y respetamos decisiones económicas de familias sin presionar. Servicio de confianza para vecinos del barrio.'
      },
      {
        question: '¿Atendéis atascos comunitarios que afectan a muchas viviendas?',
        answer: 'Sí, priorizamos urgencias en bajantes comunitarias de San José. Cuando obstrucción afecta a múltiples familias, coordinamos con administrador o vecinos, informamos a afectados, y trabajamos rápido para resolver minimizando impacto colectivo.'
      },
      {
        question: '¿Trabajáis en edificios sin ascensor de San José?',
        answer: 'Sí, muchos edificios familiares de San José no tienen ascensor. Llevamos herramientas portátiles ligeras, subimos equipos necesarios por escaleras, y no cobramos extra por acceso. Parte normal del servicio en barrios tradicionales.'
      }
    ],
    semanticOwnership: ['desatascos', 'san-jose', 'zaragoza', 'familias', 'viviendas', 'práctico']
  },

  // ========================================
  // AIRE ACONDICIONADO PHASE 1 PILOT - 10 DISTRICTS
  // ========================================

  // Madrid Salamanca - Premium Silent Inverter Climate Systems
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'salamanca',
    metadata: {
      title: 'Aire Acondicionado Salamanca Madrid | Climatización Premium Inverter',
      description: 'Instalación aire acondicionado en Salamanca Madrid. Sistemas inverter silenciosos, climatización premium, smart home integrado. Confort térmico alto standing 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en Salamanca para viviendas de alto standing que exigen máximo confort térmico y tecnología avanzada. Instalamos sistemas inverter de última generación ultrasilenciosos como Daikin Ururu Sarara, Mitsubishi Electric MSZ-LN, y Panasonic Etherea con funcionamiento prácticamente insonoro ideal para dormitorios principales en viviendas premium. Diseñamos climatización multizona con unidades multisplit que mantienen temperaturas independientes en cada estancia respetando preferencias individuales, integramos control domótico con asistentes de voz y apps para gestión inteligente desde smartphone, y seleccionamos equipos con diseño estético integrado en decoración elegante de propiedades señoriales. Realizamos instalaciones discretas con unidades exteriores ubicadas estratégicamente minimizando impacto visual en fachadas de edificios clásicos, mantenimiento preventivo programado para garantizar rendimiento óptimo sin interrupciones, y asesoramiento sobre climatización eficiente que equilibra confort máximo con consumo energético controlado. Trabajamos coordinando con porterías y comunidades exclusivas respetando normativas estéticas, utilizamos solo marcas reconocidas de alta gama, y ofrecemos garantías extendidas con servicio técnico prioritario.`,
    faqs: [
      {
        question: '¿Qué sistema inverter recomendáis para pisos elegantes en Salamanca?',
        answer: 'Para Salamanca recomendamos sistemas inverter premium ultrasilenciosos: Daikin Ururu Sarara con control humedad, Mitsubishi Electric MSZ-LN con sensor 3D, o Panasonic Etherea con diseño minimalista. Modelos prácticamente insonoros con máxima eficiencia energética A+++.'
      },
      {
        question: '¿Instaláis climatización integrada con domótica en viviendas de alto standing?',
        answer: 'Sí, integramos aire acondicionado con sistemas domóticos: control por voz vía Alexa/Google, apps móviles para gestión remota, programación inteligente por zonas, y automatización con sensores de presencia. Climatización smart completa para hogares premium.'
      },
      {
        question: '¿Cómo garantizáis instalaciones discretas en edificios clásicos de Salamanca?',
        answer: 'Planificamos ubicación de unidades exteriores minimizando impacto visual, coordinamos con comunidades para cumplir normativas estéticas, utilizamos soportes antivibratorios silenciosos, y realizamos instalación limpia respetando fachadas de edificios señoriales del distrito.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'salamanca', 'madrid', 'inverter premium', 'silencioso', 'climatización lujo']
  },

  // Madrid Chamberí - Retrofitted AC Old Buildings Compact Solutions
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'chamberi',
    metadata: {
      title: 'Aire Acondicionado Chamberí Madrid | Instalación en Edificios Antiguos',
      description: 'Aire acondicionado en Chamberí Madrid para edificios antiguos. Sistemas split compactos, instalación sin obras, adaptación a viviendas clásicas. Soluciones térmicas 24h.'
    },
    seoText: `Servicio de aire acondicionado en Chamberí especializado en instalación en edificios antiguos con limitaciones estructurales. Trabajamos en viviendas de principios de siglo XX donde no existen preinstalaciones de climatización, adaptando sistemas split compactos que minimizan obras y perforaciones en muros gruesos históricos. Solucionamos desafíos de edificios clásicos: instalación de unidades exteriores en fachadas con restricciones estéticas comunitarias, evacuación de condensados sin colgar tuberías visibles por patios interiores, y ubicación de unidades interiores en estancias con techos altos y molduras decorativas a preservar. Utilizamos sistemas inverter de bajo perfil que se integran en decoración tradicional, instalamos split multi-estancia aprovechando huecos de ventilación originales para pasar conductos frigoríficos minimizando impacto visual, y asesoramos sobre eficiencia térmica en pisos con poca aislación característica de construcción antigua. Coordinamos con comunidades de Chamberí para aprobaciones necesarias respetando normativas de edificios protegidos, trabajamos limpiamente preservando pavimentos originales y elementos arquitectónicos, y ofrecemos soluciones prácticas de climatización adaptadas a arquitectura histórica del distrito.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado silencioso en edificios antiguos de Chamberí?',
        answer: 'Sí, instalamos sistemas inverter silenciosos adaptados a edificios antiguos de Chamberí. Usamos equipos compactos que se integran en arquitectura clásica, minimizamos perforaciones, y ubicamos unidades respetando techos altos y molduras originales.'
      },
      {
        question: '¿Cómo evacuáis condensados en edificios sin preinstalación?',
        answer: 'En edificios de Chamberí sin preinstalación evacuamos condensados por: conducto discreto hasta bajante existente, bomba elevadora cuando no hay pendiente natural, o evaporación interna en modelos que lo permiten. Evitamos colgar tuberías visibles en fachadas.'
      },
      {
        question: '¿Se necesita permiso de la comunidad para instalar aire acondicionado en Chamberí?',
        answer: 'Generalmente sí para unidades exteriores visibles en fachada. Gestionamos solicitud a comunidad, proponemos ubicación discreta cumpliendo normativas estéticas, y coordinamos instalación respetando acuerdos vecinales de edificios del distrito.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'chamberi', 'madrid', 'edificios antiguos', 'retrofiteado', 'split compacto']
  },

  // Madrid Centro - Tourism High-Occupancy Summer Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'centro',
    metadata: {
      title: 'Aire Acondicionado Centro Madrid 24h | Apartamentos Turísticos',
      description: 'Aire acondicionado urgente en Centro Madrid. Especialistas en apartamentos turísticos, azoteas, alta ocupación estival. Instalación y reparación rápida 24 horas.'
    },
    seoText: `Servicio de aire acondicionado en Centro de Madrid para sector turístico y residencial del casco histórico con alta demanda estival. Instalamos y reparamos sistemas split en apartamentos turísticos donde clima funcional es crítico para opiniones de huéspedes, solucionamos emergencias en temporada alta cuando unidades colapsan por uso intensivo continuo, y trabajamos en edificios históricos de Gran Vía y Lavapiés con azoteas comunitarias donde ubicamos unidades exteriores múltiples. Atendemos urgencias 24h en alojamientos turísticos donde aire acondicionado averiado afecta reservas y reputación, realizamos mantenimiento preventivo fuera temporada para propietarios que evitan problemas en meses críticos, y cargamos gas refrigerante en sistemas que pierden rendimiento por fugas en tuberías frigoríficas antiguas. Conocemos particularidades del Centro: alta ocupación residencial y turística en verano madrileño con temperaturas máximas, edificios protegidos con limitaciones para instalación exterior, y necesidad de climatización eficiente que soporte uso continuo sin disparar consumo en alojamientos con tarifa eléctrica plana incluida.`,
    faqs: [
      {
        question: '¿Atendéis urgencias de aire acondicionado en apartamentos turísticos del Centro 24h?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos de Centro Madrid. Reparamos unidades averiadas rápidamente para no afectar huéspedes ni reservas. Disponibles 24h en temporada alta cuando clima es crítico para satisfacción de guests.'
      },
      {
        question: '¿Instaláis aire acondicionado en edificios históricos del centro?',
        answer: 'Sí, instalamos sistemas en edificios protegidos del Centro respetando normativas patrimoniales. Ubicamos unidades exteriores discretamente en azoteas comunitarias o patios interiores, minimizamos impacto visual, y cumplimos restricciones municipales.'
      },
      {
        question: '¿Por qué el aire acondicionado pierde rendimiento en verano en el Centro?',
        answer: 'Pérdida de rendimiento puede ser: filtros sucios bloqueando flujo de aire, falta de gas refrigerante por microfugas, o unidad subdimensionada para carga térmica real. Diagnosticamos causa y solucionamos: limpieza, recarga, o recomendamos upgrade.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'centro', 'madrid', 'turístico', 'verano', 'urgencias']
  },

  // Barcelona Eixample - Modernist Ducted Climate Systems
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'eixample',
    metadata: {
      title: 'Aire Acondicionado Eixample Barcelona | Conductos y Sistemas Elegantes',
      description: 'Aire acondicionado en Eixample Barcelona. Sistemas por conductos, climatización en edificios modernistas, integración estética. Confort térmico todo el año.'
    },
    seoText: `Servicio de aire acondicionado en Eixample barcelonés especializado en climatización integrada para edificios modernistas con techos altos. Instalamos sistemas por conductos ocultos que distribuyen aire fresco uniformemente sin unidades interiores visibles preservando estética de viviendas con molduras y rosetones originales, diseñamos multi-splits para pisos amplios del Ensanche con zonas independientes controlando temperatura en cada estancia según uso, y trabajamos con arquitectura de techos de 4+ metros aprovechando altura para integrar difusores de aire discretos en decoración clásica. Realizamos instalación de conductos en falsos techos o recorridos existentes minimizando impacto en estructura protegida, ubicamos unidades exteriores en patios de manzana característicos del Eixample coordinando con múltiples comunidades, y asesoramos sobre climatización eficiente en viviendas amplias donde distribución térmica requiere planificación específica por volúmenes grandes. Ofrecemos mantenimiento anual de sistemas por conductos con limpieza de filtros, revisión de difusores, y optimización de flujo de aire para máximo confort en edificios señoriales del plan Cerdà.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado por conductos en pisos del Eixample?',
        answer: 'Sí, somos especialistas en sistemas por conductos para Eixample. Aprovechamos techos altos de edificios modernistas para integrar conductos ocultos, instalamos difusores discretos, y diseñamos climatización invisible que preserva estética de viviendas clásicas del Ensanche.'
      },
      {
        question: '¿Cómo se climatiza un piso con techos de 4 metros en Eixample?',
        answer: 'Techos altos requieren sistemas dimensionados correctamente. Instalamos equipos con mayor potencia frigorífica, ubicamos difusores estratégicamente para distribuir aire hacia abajo eficientemente, y usamos modos de flujo direccional que evitan acumulación de aire frío en zona inferior.'
      },
      {
        question: '¿Dónde se ubican las unidades exteriores en el Eixample?',
        answer: 'En Eixample típicamente ubicamos unidades exteriores en patios de manzana interiores compartidos, azoteas comunitarias, o balcones traseros. Coordinamos con comunidades, respetamos normativas estéticas, y minimizamos impacto visual y sonoro para vecinos.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'eixample', 'barcelona', 'conductos', 'modernista', 'techos altos']
  },

  // Barcelona Ciutat Vella - Compact Tourism Humidity Climate Control
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Aire Acondicionado Ciutat Vella Barcelona | Control Humedad Compacto',
      description: 'Aire acondicionado en Ciutat Vella Barcelona. Sistemas compactos para edificios medievales, apartamentos turísticos, control humedad. Instalación en Gótico 24h.'
    },
    seoText: `Servicio de aire acondicionado en Ciutat Vella barcelonesa para edificios medievales del Gótico y Raval con desafíos únicos de climatización. La humedad característica de construcciones de piedra antiguas requiere sistemas con función deshumidificación activa que no solo enfríen sino sequen ambiente, instalamos equipos split compactos en apartamentos turísticos con espacios reducidos y techos irregulares donde climatización debe integrarse sin obras mayores, y trabajamos en edificios protegidos minimizando impacto en estructura histórica con instalaciones reversibles. Solucionamos problemas de flujo de aire en viviendas con distribución irregular y habitaciones interiores sin ventilación natural, instalamos unidades exteriores en azoteas del casco antiguo o patios comunitarios cumpliendo normativas patrimoniales del Ajuntament, y atendemos emergencias en alojamientos turísticos durante temporada alta donde clima no funcional afecta directamente a satisfacción de huéspedes. Realizamos mantenimiento preventivo con limpieza frecuente de filtros especialmente important e en ambiente húmedo que favorece moho y bacterias, y asesoramos sobre consumo eficiente en apartamentos con tarifa eléctrica limitada.`,
    faqs: [
      {
        question: '¿La humedad del Gótico afecta al rendimiento del aire acondicionado?',
        answer: 'Sí, humedad alta en Ciutat Vella reduce eficiencia de enfriamiento y favorece moho en filtros. Recomendamos sistemas con deshumidificación activa, limpieza de filtros mensual en temporada alta, y modo dry para secar ambiente sin enfriar excesivamente.'
      },
      {
        question: '¿Instaláis aire acondicionado en apartamentos turísticos del Gótico?',
        answer: 'Sí, instalamos sistemas compactos en alojamientos turísticos de Ciutat Vella. Equipos silenciosos dimensionados para espacios pequeños, instalación rápida minimizando molestias, y coordinación con gestores para trabajar entre reservas si es necesario.'
      },
      {
        question: '¿Cómo se instalan unidades exteriores en edificios medievales?',
        answer: 'En edificios históricos de Ciutat Vella ubicamos unidades en azoteas comunitarias o patios interiores. Coordinamos con patrimonio si edificio está catalogado, usamos soportes que no dañan estructura original, y cumplimos normativas de conservación del Ajuntament.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'ciutat-vella', 'barcelona', 'humedad', 'compacto', 'turístico']
  },

  // Valencia Poblats Marítims - Coastal Humidity Dehumidification Climate
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'poblats-maritims',
    metadata: {
      title: 'Aire Acondicionado Poblats Marítims Valencia | Control Humedad Costera',
      description: 'Aire acondicionado en Poblats Marítims Valencia. Deshumidificación marina, protección anticorrosión, climatización en viviendas costeras. Mantenimiento preventivo playa.'
    },
    seoText: `Servicio especializado de aire acondicionado para zona costera de Poblats Marítims donde humedad marina y salinidad condicionan sistemas de climatización. La brisa mediterránea acelera corrosión en unidades exteriores requiriendo equipos con tratamiento anticorrosión específico y mantenimiento preventivo más frecuente, humedad ambiental alta obliga a sistemas con fuerte capacidad deshumidificadora que sequen aire además de enfriar, y ambiente salino deteriora filtros y serpentinas si no se limpian regularmente. Instalamos equipos con protección IP especial para exteriores costeros resistentes a sal, utilizamos materiales anticorrosión en soportes y fijaciones de unidades expuestas a ambiente marino, y recomendamos limpieza de serpentinas exteriores cada 3-4 meses para eliminar acumulación de sal que reduce transferencia térmica. Trabajamos en villas y apartamentos de playa con climatización para temporada estival de máximo uso, realizamos mantenimiento preventivo pre-verano para propiedades vacacionales, y asesoramos sobre consumo eficiente equilibrando confort con coste eléctrico en viviendas de uso intensivo temporal durante vacaciones costeras.`,
    faqs: [
      {
        question: '¿La humedad de Poblats Marítims afecta el rendimiento del aire acondicionado?',
        answer: 'Sí, humedad costera alta requiere que aire acondicionado trabaje más para enfriar y especialmente para secar ambiente. Recomendamos sistemas con deshumidificación potente, modo dry, y mantenimiento frecuente. Filtros y serpentinas deben limpiarse más seguido.'
      },
      {
        question: '¿Las unidades exteriores se corroen más rápido en zona de playa?',
        answer: 'Sí, salinidad ambiente acelera corrosión en Poblats Marítims. Instalamos equipos con tratamiento anticorrosión, usamos fijaciones inoxidables, y recomendamos limpieza preventiva de serpentinas cada 3-4 meses para eliminar sal acumulada y prolongar vida del equipo.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para apartamentos de playa?',
        answer: 'Sí, diseñamos contratos de mantenimiento para viviendas costeras en Poblats Marítims. Limpieza pre-verano de filtros y serpentinas, revisión de gas refrigerante, verificación eléctrica, y optimización para temporada alta de uso intensivo.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'poblats-maritims', 'valencia', 'humedad costera', 'anticorrosión', 'deshumidificación']
  },

  // Valencia Ciutat Vella - Old Building Ventilation Airflow Optimization
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Aire Acondicionado Ciutat Vella Valencia | Edificios Antiguos y Ventilación',
      description: 'Aire acondicionado en Ciutat Vella Valencia. Sistemas para casco antiguo, optimización ventilación, calor acumulado, apartamentos compactos. Soluciones 24h.'
    },
    seoText: `Servicio de aire acondicionado en Ciutat Vella valenciana para edificios del casco antiguo con problemas de ventilación natural y acumulación de calor. Trabajamos en viviendas del Carmen y Mercat donde distribuciones irregulares y habitaciones interiores sin ventanas dificultan circulación de aire, instalamos sistemas split adaptados a espacios compactos típicos del centro histórico, y solucionamos problemas de calor excesivo en plantas altas bajo cubiertas donde radiación solar calienta techos durante jornadas estivales valencianas. Utilizamos equipos inverter de alta eficiencia que mantienen confort térmico en estudios y apartamentos pequeños sin consumo desproporcionado, instalamos multi-splits para climatizar zonas sin ventilación natural donde aire fresco es imposible por distribución del edificio antiguo, y asesoramos sobre ubicación óptima de unidades interiores para circulación efectiva en espacios reducidos. Realizamos mantenimiento de filtros especialmente crítico en centro urbano con polución y partículas, trabajamos coordinando acceso en calles estrechas peatonales características de Ciutat Vella, y atendemos apartamentos turísticos requiriendo climatización eficaz para valoraciones positivas de guests. `,
    faqs: [
      {
        question: '¿Cómo se climatiza un piso interior sin ventanas en Ciutat Vella?',
        answer: 'En habitaciones interiores del casco antiguo instalamos split con flujo de aire direccional potente que distribuya frío, ubicamos unidad estratégicamente para circulación cruzada con estancias ventiladas, y asesoramos sobre ventiladores de apoyo. Multi-split con varias unidades es ideal.'
      },
      {
        question: '¿El calor acumulado en plantas altas del Carmen se puede solucionar?',
        answer: 'Sí, plantas bajo cubierta en Ciutat Vella acumulan calor por radiación solar. Instalamos aire acondicionado dimensionado correctamente para cargas térmicas altas, recomendamos aislamiento de techos si es posible, y usamos modo potente en horas pico de calor.'
      },
      {
        question: '¿Qué mantenimiento requiere el aire acondicionado en el centro urbano?',
        answer: 'En Ciutat Vella recomendamos limpieza de filtros mensual en verano por polución urbana, revisión anual de gas refrigerante, limpieza de serpentinas, y verificación de drenaje de condensados. Ambiente urbano ensucia filtros más rápido que zonas residenciales.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'ciutat-vella', 'valencia', 'ventilación', 'calor acumulado', 'casco antiguo']
  },

  // Sevilla Triana - Extreme Heat Patio Thermal Comfort
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    districtSlug: 'triana',
    metadata: {
      title: 'Aire Acondicionado Triana Sevilla | Máximo Confort Frente al Calor Extremo',
      description: 'Aire acondicionado en Triana Sevilla. Climatización eficiente para calor extremo, casas-patio andaluzas, sistemas de alto rendimiento. Confort térmico total 24h.'
    },
    seoText: `Servicio de aire acondicionado en Triana especializado en climatización para viviendas andaluzas enfrentando calor extremo sevillano. Las temperaturas estivales que superan 40°C en Sevilla requieren sistemas de alta capacidad frigorífica que mantengan confort térmico continuo durante oleadas de calor, trabajamos en casas-patio tradicionales donde climatizar requiere multiple unidades por distribución fragmentada en torno a patio central, y solucionamos problemas de eficiencia en sistemas subdimensionados que no soportan demanda real de veranos sevillanos. Instalamos equipos inverter de clase A+++ con rendimiento óptimo incluso en temperaturas exteriores extremas donde sistemas básicos colapsan, diseñamos climatización multi-estancia para viviendas con galerías perimetrales características de arquitectura trianera, y asesoramos sobre consumo energético equilibrado porque aire acondicionado en Sevilla implica uso continuo 3-4 meses representando porción significativa de factura eléctrica. Realizamos mantenimiento preventivo pre-verano esencial para garantizar funcionamiento durante meses críticos, ofrecemos revisión de carga de gas refrigerante que tiende a perderse en sistemas sometidos a uso intenso, y optimizamos configuración para máxima eficiencia sin comprometer confort en clima exigente sevillano.`,
    faqs: [
      {
        question: '¿Qué potencia de aire acondicionado se necesita en Triana para el calor sevillano?',
        answer: 'Sevilla con 40°C+ requiere sistemas potentes. Para salon de 20m² recomendamos mínimo 3.000 frigorías (unos 3.5kW). Importante dimensionar correctamente: sistema subdimensionado trabaja continuamente consumiendo mucho sin enfriar adecuadamente. Calculamos carga térmica real.'
      },
      {
        question: '¿Cómo se climatiza una casa-patio andaluza de Triana?',
        answer: 'Casas-patio requieren múltiples unidades: una por zona (salón, dormitorios, galerías). Multi-split con varias unidades interiores y una exterior es solución óptima. Climatizar todo desde un solo split no es efectivo por distribución fragmentada.'
      },
      {
        question: '¿El aire acondicionado consume mucho en el verano sevillano?',
        answer: 'Uso continuo 3-4 meses implica consumo significativo. Optimizamos con: sistemas inverter A+++ que ajustan potencia automáticamente, programación inteligente, temperatura razonable 24-25°C (no 20°C), y mantenimiento para máxima eficiencia. Balance confort-consumo.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'triana', 'sevilla', 'calor extremo', 'casas-patio', 'eficiencia térmica']
  },

  // Málaga Centro - Tourism Coastal Continuous Summer Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'malaga',
    districtSlug: 'centro',
    metadata: {
      title: 'Aire Acondicionado Centro Málaga | Apartamentos Turísticos Costeros',
      description: 'Aire acondicionado en Centro Málaga. Especialistas en apartamentos turísticos, humedad costera, uso continuo estival. Instalación y mantenimiento zona puerto 24h.'
    },
    seoText: `Servicio de aire acondicionado en Centro de Málaga para sector turístico costero con uso intensivo estival. Instalamos sistemas en apartamentos de alquiler turístico donde climatización operativa es esencial para valoraciones positivas de guests, trabajamos con humedad marina que requiere función deshumidificación potente para secar ambiente además de enfriar, y atendemos emergencias en temporada alta cuando unidades colapsan por funcionamiento continuo 24h durante meses. La proximidad al puerto mediterráneo acelera degradación de serpentinas exteriores por sal requiriendo limpieza preventiva frecuente, instalamos equipos dimensionados para ocupación máxima de apartamentos turísticos superior a vivienda residencial estándar, y solucionamos problemas de rendimiento en sistemas sometidos a uso intensivo por rotación constante de inquilinos vacacionales. Realizamos mantenimiento preventivo fuera temporada para propietarios que evitan averías en meses de máxima ocupación y tarifas, asesoramos sobre sistemas eficientes que equilibran confort para huéspedes con consumo eléctrico incluido en alquiler, y coordinamos intervenciones rápidas durante temporada cuando cada día sin clima funcional significa pérdida de reservas.`,
    faqs: [
      {
        question: '¿Atendéis urgencias de aire acondicionado en apartamentos turísticos de Centro Málaga?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos del Centro. Reparamos unidades averiadas rápidamente para no afectar huéspedes ni opiniones. Disponibles 24h en temporada alta cuando clima es crítico para satisfacción y reputación del apartamento.'
      },
      {
        question: '¿La humedad y sal marina afectan al aire acondicionado en Centro Málaga?',
        answer: 'Sí, ambiente marino costero requiere mantenimiento frecuente. Sal se deposita en serpentinas reduciendo transferencia térmica y eficiencia. Limpiamos serpentinas exteriores cada 3-4 meses, verificamos corrosión, y usamos equipos con tratamiento anticorrosión cuando es posible.'
      },
      {
        question: '¿Qué potencia necesitan apartamentos turísticos del centro?',
        answer: 'Apartamentos turísticos tienen ocupación máxima y uso 24h en verano. Dimensionamos con margen: para estudio de 30-40m² recomendamos 3.500-4.000 frigorías. Sistema subdimensionado no soportará carga térmica real con multiple guests y uso continuo.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'centro', 'malaga', 'turístico', 'humedad marina', 'uso continuo']
  },

  // Zaragoza Universidad - Student Affordable Efficient Compact Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'zaragoza',
    districtSlug: 'universidad',
    metadata: {
      title: 'Aire Acondicionado Universidad Zaragoza | Estudiantes y Soluciones Eficientes',
      description: 'Aire acondicionado en zona Universidad Zaragoza. Sistemas para estudiantes, instalación asequible, climatización eficiente para pisos compartidos. Confort económico 24h.'
    },
    seoText: `Servicio de aire acondicionado en zona Universidad de Zaragoza adaptado a necesidades de estudiantes y pisos compartidos con presupuestos ajustados. Instalamos sistemas split eficientes de marcas confiables con buena relación calidad-precio evitando equipos premium innecesarios para viviendas de alquiler temporal, asesoramos sobre climatización económica en dormitorios individuales versus zonas comunes priorizando inversión donde más se usa, y solucionamos problemas de consumo eléctrico excesivo en instalaciones antiguas o mal configuradas. Trabajamos con propietarios de pisos estudiantiles ayudando a seleccionar equipos durables que soporten uso por múltiples inquilinos rotativos, instalamos sistemas compactos sin obras complejas adecuados para viviendas de alquiler, y coordinamos entre propietarios e inquilinos cuando avería de aire acondicionado requiere reparación durante periodo lectivo. Ofrecemos presupuestos transparentes adaptados a realidad económica de zona universitaria, explicamos opciones desde lo básico funcional hasta sistemas más avanzados, y realizamos mantenimiento preventivo económico con limpieza de filtros y revisión anual básica.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado recomendáis para pisos de estudiantes en zona Universidad?',
        answer: 'Para pisos de estudiantes recomendamos split inverter de marcas fiables (Fujitsu, Mitsubishi Electric, Daikin gama media) con eficiencia A++ o A+++. Prioridad: consumo bajo y fiabilidad. Potencia justa: 2.500-3.000 frigorías para dormitorios individuales.'
      },
      {
        question: '¿Quién paga la instalación de aire acondicionado en piso de alquiler?',
        answer: 'Normalmente es mejora voluntaria del propietario. Algunos propietarios instalan para hacer piso más atractivo. Si inquilino lo instala, debe coordinarlo con propietario y puede tener derecho a llevárselo al fin del contrato según acuerdo.'
      },
      {
        question: '¿Cómo reducir el consumo eléctrico del aire acondicionado en Universidad?',
        answer: 'Consejos: temperatura a 24-25°C (no 20°C), modo auto/eco, limpieza de filtros mensual, cerrar persianas en horas de sol, y usar solo en habitaciones ocupadas. Sistema inverter A+++ consume 40-50% menos que modelos antiguos on/off.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'universidad', 'zaragoza', 'estudiantes', 'eficiente', 'asequible']
  },

  // ========================================
  // AIRE ACONDICIONADO PHASE 2 EXPANSION - 10 DISTRICTS
  // ========================================

  // Madrid Retiro - Family Residential Silent Preventive Climate
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'retiro',
    metadata: {
      title: 'Aire Acondicionado Retiro Madrid | Climatización Residencial Silenciosa',
      description: 'Aire acondicionado en Retiro Madrid. Sistemas silenciosos para familias, climatización equilibrada, mantenimiento preventivo residencial. Confort familiar 24h.'
    },
    seoText: `Servicio de aire acondicionado en Retiro orientado a familias que valoran confort térmico sin ruidos molestos en ambiente residencial tranquilo del distrito. Instalamos sistemas inverter ultrasilenciosos ideales para dormitorios de niños y personas mayores donde nivel sonoro debe ser mínimo durante descanso nocturno, diseñamos climatización multizona para viviendas familiares permitiendo temperaturas independientes en cada habitación según preferencias de cada miembro, y asesoramos sobre eficiencia energética equilibrada que mantiene confort sin disparar factura eléctrica en hogares con uso continuo verano-invierno. Realizamos mantenimiento preventivo programado adaptado a ritmo familiar con revisiones pre-verano que garantizan funcionamiento óptimo durante meses calurosos, limpieza de filtros para ambiente saludable especialmente importante en hogares con niños pequeños o alergias, y verificación de gas refrigerante antes de temporada de máximo uso. Trabajamos en edificios clásicos del Retiro instalando sistemas que se integran estéticamente en viviendas tradicionales, coordinamos horarios respetando vida familiar tranquila del distrito, y ofrecemos servicio completo pensando en hogares que priorizan estabilidad térmica y bienestar familiar a largo plazo.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado silencioso recomendáis para familias en Retiro?',
        answer: 'Para familias en Retiro recomendamos sistemas inverter con nivel sonoro <20dB en modo nocturno: Daikin Emura, Mitsubishi MSZ-LN, o Fujitsu Halcyon. Ideales para dormitorios porque funcionan prácticamente sin ruido mientras mantienen temperatura estable durante toda la noche.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo pre-verano para viviendas familiares?',
        answer: 'Sí, diseñamos contratos de mantenimiento preventivo para familias en Retiro. Revisión pre-verano incluye: limpieza de filtros, verificación de gas refrigerante, prueba de funcionamiento, y optimización de parámetros para temporada. Garantiza clima funcional cuando más se necesita.'
      },
      {
        question: '¿Cómo climatizar viviendas con diferentes preferencias de temperatura?',
        answer: 'Sistemas multisplit son ideales: permiten temperaturas independientes por habitación. En Retiro instalamos unidades interiores separadas para dormitorios, salón, y zonas comunes, cada una con su mando. Cada familia personaliza confort según preferencias individuales.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'retiro', 'madrid', 'silencioso', 'familias', 'mantenimiento preventivo']
  },

  // Madrid Chamartín - Office Commercial Centralized HVAC
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'chamartin',
    metadata: {
      title: 'Aire Acondicionado Chamartín Madrid | Climatización Comercial Oficinas',
      description: 'Aire acondicionado en Chamartín Madrid para oficinas y edificios comerciales. Climatización centralizada, sistemas VRV, continuidad empresarial. HVAC profesional 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en Chamartín para edificios de oficinas y espacios comerciales del distrito empresarial madrileño. Instalamos sistemas VRV (Volumen de Refrigerante Variable) para oficinas con múltiples espacios independientes requiriendo control individualizado, diseñamos climatización centralizada en edificios corporativos de AZCA y zona financiera con alta carga térmica por equipamiento informático y ocupación densa, y gestionamos sistemas de alto rendimiento que mantienen confort estable durante jornadas laborales completas sin interrupciones. Trabajamos fuera de horario comercial para instalaciones y mantenimiento mayor minimizando impacto en actividad empresarial, coordinamos con property managers y administradores de edificios en intervenciones planificadas, y atendemos emergencias con respuesta prioritaria cuando fallo de climatización afecta operaciones de negocio. Ofrecemos contratos de mantenimiento preventivo para empresas que requieren continuidad operativa garantizada, realizamos revisiones trimestrales de sistemas comerciales con mayor desgaste por uso intensivo, y optimizamos consumo energético en edificios con alta facturación en climatización controlando costes operativos sin comprometer confort laboral.`,
    faqs: [
      {
        question: '¿Instaláis climatización centralizada para oficinas en Chamartín?',
        answer: 'Sí, instalamos sistemas VRV y climatización centralizada en edificios de oficinas de Chamartín. Diseñamos distribución para múltiples espacios con control independiente, dimensionamos para carga térmica de equipos informáticos, y gestionamos instalación coordinando con actividad empresarial.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para empresas en Chamartín?',
        answer: 'Sí, diseñamos contratos de mantenimiento empresarial para Chamartín. Revisiones trimestrales, respuesta prioritaria, intervenciones fuera horario, y garantía de continuidad. Sistemas comerciales requieren mantenimiento más frecuente por uso intensivo diario.'
      },
      {
        question: '¿Atendéis emergencias de climatización en edificios de oficinas durante horario laboral?',
        answer: 'Sí, priorizamos urgencias empresariales en Chamartín. Entendemos que fallo de climatización afecta productividad y bienestar de empleados. Llegamos rápido, diagnosticamos eficientemente, y reparamos minimizando impacto en operaciones.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'chamartin', 'madrid', 'oficinas', 'VRV', 'climatización centralizada']
  },

  // Barcelona Gràcia - Artistic Retrofitted Compact Airflow
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'gracia',
    metadata: {
      title: 'Aire Acondicionado Gràcia Barcelona | Instalaciones Compactas Artísticas',
      description: 'Aire acondicionado en Gràcia Barcelona. Sistemas compactos para edificios bohemios, optimización flujo aire, instalación respetuosa. Climatización local 24h.'
    },
    seoText: `Servicio de aire acondicionado en Gràcia adaptado a arquitectura bohemia y edificios de carácter del barrio barcelonés. Instalamos sistemas compactos en viviendas artísticas y pisos con distribuciones irregulares donde espacios reducidos requieren soluciones creativas de climatización, trabajamos con edificios históricos de Gràcia respetando estética original mientras añadimos confort térmico moderno, y solucionamos problemas de flujo de aire en apartamentos con habitaciones interiores sin ventilación natural. Diseñamos instalaciones discretas que se integran en decoración ecléctica característica del barrio, ubicamos unidades exteriores en balcones traseros o azoteas comunitarias coordinando con vecinos para cumplir normativas, y asesoramos sobre climatización eficiente en viviendas de alquiler donde propietarios buscan balance entre inversión y valor añadido. Trabajamos con comercios boutique y estudios creativos de Gràcia instalando climatización que no interfiere con actividad artística o profesional, ofrecemos soluciones económicas para presupuestos ajustados manteniendo calidad funcional, y respetamos carácter local del barrio con servicio cercano y comprensión de realidad residencial de Gràcia.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado en pisos pequeños con espacios reducidos de Gràcia?',
        answer: 'Sí, somos especialistas en soluciones compactas para Gràcia. Instalamos split de bajo perfil que se integran en espacios reducidos, optimizamos ubicación para máximo flujo de aire, y trabajamos con distribuciones irregulares típicas de edificios bohemios del barrio.'
      },
      {
        question: '¿Cómo se climatiza un piso con habitaciones sin ventanas en Gràcia?',
        answer: 'En habitaciones interiores sin ventilación natural instalamos split con flujo direccional potente, ubicamos unidad para circulación cruzada con estancias ventiladas, y asesoramos sobre ventiladores de apoyo. Multisplit con varias unidades es solución óptima para distribuciones complejas.'
      },
      {
        question: '¿Trabajáis con comercios y estudios creativos de Gràcia?',
        answer: 'Sí, instalamos climatización en tiendas boutique y estudios de Gràcia. Diseñamos sistemas que no interfieren con actividad creativa, trabajamos fuera horario comercial si es necesario, y adaptamos soluciones a presupuestos de pequeños negocios locales del barrio.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'gracia', 'barcelona', 'compacto', 'bohemio', 'flujo aire']
  },

  // Barcelona Sants - Dense Affordable Practical Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'sants',
    metadata: {
      title: 'Aire Acondicionado Sants Barcelona | Soluciones Prácticas y Asequibles',
      description: 'Aire acondicionado en Sants Barcelona. Sistemas eficientes para familias trabajadoras, instalación práctica, climatización asequible. Precios justos 24h.'
    },
    seoText: `Servicio de aire acondicionado de confianza en Sants para barrio barcelonés de familias trabajadoras que buscan climatización efectiva a precio justo. Instalamos sistemas split inverter eficientes con buena relación calidad-precio evitando equipos premium innecesarios, asesoramos sobre dimensionamiento correcto para no sobredimensionar ni subdimensionar evitando gastos excesivos o rendimiento insuficiente, y ofrecemos opciones de climatización desde lo básico funcional hasta sistemas más completos adaptándonos a presupuesto disponible de cada familia. Trabajamos en bloques de apartamentos densos de Sants con instalaciones prácticas que minimizan obras, ubicamos unidades exteriores coordinando con comunidades respetando normativas sin complicaciones burocráticas excesivas, y solucionamos problemas de consumo eléctrico alto en sistemas antiguos ineficientes proponiendo upgrade a inverter que reduce factura 40-50%. Ofrecemos presupuestos transparentes explicados claramente para que vecinos decidan según economía familiar, realizamos limpieza de filtros económica pero efectiva, y mantenemos trato cercano y honesto característico de servicio local comprometido con barrio trabajador de Sants.`,
    faqs: [
      {
        question: '¿Tenéis precios accesibles para familias de Sants?',
        answer: 'Sí, en Sants trabajamos con precios justos y transparencia. Ofrecemos sistemas eficientes de marcas confiables sin empujar equipos premium innecesarios. Explicamos opciones desde lo básico hasta lo completo, respetando presupuesto de cada familia.'
      },
      {
        question: '¿Qué aire acondicionado recomendáis para apartamentos de Sants?',
        answer: 'Para Sants recomendamos split inverter A++ o A+++ de marcas fiables (Fujitsu, Daikin gama media, Mitsubishi Electric) con buena relación calidad-precio. Potencia justa según m²: 2.500-3.000 frigorías para dormitorios, 3.500-4.500 para salones. Sin sobr edimensionar.'
      },
      {
        question: '¿Los sistemas inverter realmente ahorran electricidad en Sants?',
        answer: 'Sí, inverter A+++ consume 40-50% menos que modelos on/off antiguos. En Sants con uso continuo 3-4 meses en verano, ahorro es significativo en factura. Inversión inicial se recupera en 2-3 años con ahorro energético real.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'sants', 'barcelona', 'asequible', 'práctico', 'eficiente']
  },

  // Barcelona Sarrià - Premium Villas Silent Automation Climate
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'sarria',
    metadata: {
      title: 'Aire Acondicionado Sarrià Barcelona | Sistemas Premium y Domótica',
      description: 'Aire acondicionado premium en Sarrià Barcelona. Villas de lujo, automatización integral, climatización multizona silenciosa. Confort térmico exclusivo 24h.'
    },
    seoText: `Servicio premium de aire acondicionado en Sarrià para villas, chalets y apartamentos exclusivos de zona alta barcelonesa. Instalamos sistemas de climatización integral multizona con control independiente en cada estancia vía domótica avanzada, integramos aire acondicionado con automatización del hogar controlable por voz y apps desde cualquier ubicación, y seleccionamos equipos de máxima gama ultrasilenciosos como Daikin Ururu Sarara con control de humedad o Mitsubishi Electric Diamond garantizando confort absoluto sin contaminación acústica. Diseñamos climatización por conductos ocultos en villas que distribuye aire uniformemente sin unidades visibles preservando estética interior de diseño, instalamos sistemas con tecnología inverter avanzada y eficiencia A+++ que optimiza consumo sin comprometer rendimiento, y ubicamos unidades exteriores en jardines privados minimizando impacto visual y sonoro para propiedades que valoran tranquilidad. Ofrecemos contratos de mantenimiento exclusivo con revisiones programadas discretas y respuesta prioritaria 24h, trabajamos coordinando con personal doméstico respetando privacidad de propietarios, y garantizamos servicio impecable que cumple expectativas más exigentes de residentes de Sarrià.`,
    faqs: [
      {
        question: '¿Qué sistema premium de aire acondicionado recomendáis para villas de Sarrià?',
        answer: 'Para Sarrià recomendamos sistemas premium ultrasilenciosos: Daikin Ururu Sarara con control humedad, Mitsubishi Electric Diamond con sensor 3D, o Panasonic Etherea con diseño exclusivo. Climatización por conductos para villas grandes o multisplit de alta gama para apartamentos premium.'
      },
      {
        question: '¿Integráis climatización con domótica en viviendas de Sarrià?',
        answer: 'Sí, integramos aire acondicionado con sistemas domóticos de lujo: control por voz vía Alexa/Google Home, apps móviles para gestión remota, programación inteligente por zonas y horarios, automatización con sensores de presencia, y escenas personalizadas. Climatización smart completa.'
      },
      {
        question: '¿Ofrecéis contratos de mantenimiento exclusivo en Sarrià?',
        answer: 'Sí, diseñamos contratos premium para propiedades en Sarrià. Revisiones discretas programadas, limpieza profesional de filtros y serpentinas, respuesta prioritaria 24h, coordinación con personal doméstico, y garantía de funcionamiento continuo sin interrupciones. Tranquilidad total.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'sarria', 'barcelona', 'premium', 'villas', 'domótica']
  },

  // Valencia Campanar - Family Communities Efficient Residential
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'campanar',
    metadata: {
      title: 'Aire Acondicionado Campanar Valencia | Climatización Comunidades Familiares',
      description: 'Aire acondicionado en Campanar Valencia. Sistemas para familias, comunidades residenciales, climatización eficiente en zona norte. Confort familiar 24h.'
    },
    seoText: `Servicio de aire acondicionado en Campanar para comunidades residenciales familiares de zona norte valenciana. Instalamos sistemas en viviendas de familias que priorizan eficiencia energética y bienestar térmico en veranos valencianos, diseñamos climatización para chalets y viviendas unifamiliares con múltiples espacios requiriendo soluciones multizona, y ofrecemos asesoramiento sobre consumo energético equilibrado importante para hogares con presupuestos familiares controlados. Trabajamos con comunidades de propietarios en Campanar para mantenimiento de instalaciones de aire acondicionado comunes si existen, coordinamos instalaciones individuales respetando normativas comunitarias sobre ubicación de unidades exteriores en fachadas, y realizamos revisiones preventivas pre-verano especialmente relevantes en clima mediterráneo valenciano con temperaturas estivales elevadas. Instalamos sistemas que equilibran inversión inicial con ahorro energético a largo plazo pensando en familias que valoran rentabilidad, proporcionamos limpieza de filtros periódica para ambiente saludable en hogares con niños, y ofrecemos servicio completo adaptado a ritmo familiar tranquilo del distrito residencial de Campanar.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado es mejor para familias en Campanar?',
        answer: 'Para familias en Campanar recomendamos split inverter A++ o A+++ con buen equilibrio calidad-precio-eficiencia. Marcas fiables como Daikin, Mitsubishi Electric, o Fujitsu. Dimensionar correctamente: 2.500-3.000 frigorías por dormitorio, 4.000-5.000 para salones familiares.'
      },
      {
        question: '¿Instaláis climatización en chalets de Campanar con varias zonas?',
        answer: 'Sí, en chalets de Campanar instalamos sistemas multisplit con múltiples unidades interiores (dormitorios, salón, cocina, despacho) conectadas a una o dos exteriores. Cada zona controla temperatura independientemente según uso y preferencias.'
      },
      {
        question: '¿Ofrecéis revisión pre-verano para viviendas familiares en Campanar?',
        answer: 'Sí, ofrecemos revisiones preventivas antes de verano en Campanar. Limpiamos filtros, verificamos gas refrigerante, probamos funcionamiento completo, y optimizamos parámetros. Garantiza que sistema funciona perfectamente cuando familia más lo necesita en calor valenciano.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'campanar', 'valencia', 'familias', 'comunidades', 'eficiente']
  },

  // Valencia Extramurs - Mixed Residential Commercial Balanced Climate
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'extramurs',
    metadata: {
      title: 'Aire Acondicionado Extramurs Valencia | Mixto Residencial-Comercial',
      description: 'Aire acondicionado en Extramurs Valencia. Climatización para viviendas y comercios, sistemas mixtos, instalación práctica zona media. Servicio local 24h.'
    },
    seoText: `Servicio de aire acondicionado en Extramurs para zona valenciana mixta residencial-comercial con necesidades diversas de climatización. Instalamos sistemas en viviendas de apartamentos medios donde familias buscan confort térmico asequible sin equipos premium innecesarios, trabajamos en comercios locales y oficinas pequeñas del barrio con climatización comercial adaptada a espacios de negocio, y solucionamos problemas en edificios mixtos donde bajo comercial y viviendas superiores requieren sistemas independientes evitando interferencias. Diseñamos climatización práctica que equilibra inversión con rendimiento para propietarios de Extramurs, instalamos split eficientes en pisos de alquiler donde mejora aumenta atractivo sin sobrecostes, y asesoramos sobre consumo energético controlado en hogares donde factura eléctrica es consideración importante. Trabajamos con comercios de barrio ofreciendo climatización asequible que mejora ambiente para clientes sin inversiones prohibitivas, coordinamos instalaciones en edificios con usos mixtos respetando normativas comunitarias, y proporcionamos servicio local comprometido con realidad económica del distrito valenciano de densidad media.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado en edificios mixtos vivienda-comercio de Extramurs?',
        answer: 'Sí, trabajamos con edificios mixtos de Extramurs. Instalamos sistemas independientes para bajo comercial y viviendas superiores, evitamos interferencias, y coordinamos con propietarios y comerciantes respetando normativas comunitarias y necesidades de cada uso.'
      },
      {
        question: '¿Qué climatización recomendáis para comercios pequeños de Extramurs?',
        answer: 'Para comercios de barrio en Extramurs recomendamos split comercial de 4.000-6.000 frigorías según m² de local. Sistemas eficientes que mejoran confort de clientes sin disparar consumo. Marcas fiables con buen post-venta: Daikin, Mitsubishi, Fujitsu gama comercial.'
      },
      {
        question: '¿Ofrecéis climatización asequible para pisos de alquiler en Extramurs?',
        answer: 'Sí, en Extramurs muchos propietarios buscan mejorar pisos de alquiler con aire acondicionado asequible. Recomendamos split inverter eficiente que añade valor sin sobreinvertir. Balance óptimo entre inversión inicial y atractivo para inquilinos potenciales.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'extramurs', 'valencia', 'mixto', 'práctico', 'residencial-comercial']
  },

  // Sevilla Nervión - Commercial Shopping Office High-Capacity HVAC
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    districtSlug: 'nervion',
    metadata: {
      title: 'Aire Acondicionado Nervión Sevilla | Climatización Comercial y Oficinas',
      description: 'Aire acondicionado en Nervión Sevilla. Sistemas comerciales para oficinas, centros comerciales, alta capacidad. HVAC empresarial calor sevillano 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en Nervión para distrito comercial y empresarial sevillano con alta demanda de climatización profesional. Instalamos sistemas de alta capacidad en oficinas y centros comerciales donde calor extremo sevillano en verano obliga a climatización potente que mantenga ambiente laboral confortable durante jornadas completas, diseñamos instalaciones para locales comerciales dimensionando correctamente frigorías según exposición solar, afluencia de clientes y carga térmica real, y trabajamos con edificios de oficinas implementando climatización centralizada o multisplit según estructura y necesidades. Atendemos emergencias comerciales con respuesta prioritaria porque fallo de aire acondicionado en pleno verano sevillano con 40°C+ puede obligar a cerrar negocio, realizamos mantenimiento preventivo de sistemas comerciales con uso intensivo requiriendo revisiones más frecuentes que residenciales, y ofrecemos contratos empresariales con intervenciones fuera horario comercial para no afectar actividad diaria. Conocemos realidad de Nervión: zona empresarial donde climatización no es lujo sino necesidad operativa durante 4-5 meses de temperaturas extremas, y proporcionamos soluciones profesionales que garantizan continuidad empresarial sin interrupciones por fallos térmicos.`,
    faqs: [
      {
        question: '¿Instaláis climatización para oficinas y centros comerciales de Nervión?',
        answer: 'Sí, somos especialistas en climatización comercial de Nervión. Instalamos sistemas de alta capacidad para oficinas, VRV para edificios multi-tenant, y climatización en centros comerciales. Dimensionamos para calor extremo sevillano y uso intensivo empresarial.'
      },
      {
        question: '¿Atendéis emergencias de aire acondicionado en negocios durante verano sevillano?',
        answer: 'Sí, priorizamos urgencias comerciales en Nervión durante verano. Con 40°C+ exterior, fallo de climatización obliga a cerrar. Llegamos rápido, reparamos eficientemente: recarga de gas, limpieza serpentinas, o reemplazo de componentes dañados.'
      },
      {
        question: '¿Ofrecéis mantenimiento preventivo para empresas en Nervión?',
        answer: 'Sí, diseñamos contratos de mantenimiento empresarial para Nervión. Revisiones pre-verano críticas (limpieza serpentinas, recarga gas si necesario, verificación completa), intervenciones fuera horario, y respuesta prioritaria. Continuidad operativa garantizada.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'nervion', 'sevilla', 'comercial', 'oficinas', 'alta capacidad']
  },

  // Sevilla Centro - Historic Tourism Extreme Heat Emergency AC
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    districtSlug: 'centro',
    metadata: {
      title: 'Aire Acondicionado Centro Sevilla 24h | Turismo y Calor Extremo',
      description: 'Aire acondicionado urgente en Centro Sevilla. Apartamentos turísticos, edificios históricos, emergencias calor extremo 40°C+. Instalación casco antiguo 24 horas.'
    },
    seoText: `Atendemos aire acondicionado en Centro histórico sevillano donde calor extremo estival y arquitectura andaluza tradicional condicionan climatización. Instalamos sistemas en apartamentos turísticos del casco antiguo donde clima funcional es crítico para valoraciones positivas de guests en pleno verano con temperaturas superando 40°C, trabajamos en casas-patio tradicionales sevillanas donde climatizar requiere múltiples unidades distribuidas en estancias alrededor del patio central, y solucionamos emergencias 24h durante ola de calor cuando unidades colapsan por demanda térmica extrema. Ubicamos unidades exteriores en azoteas de edificios históricos o patios interiores respetando normativas patrimoniales del casco antiguo, dimensionamos sistemas con margen suficiente para soportar calor extremo sevillano que fácilmente alcanza 42-44°C en julio-agosto, y asesoramos sobre consumo energético porque uso continuo 24h durante 4 meses de calor representa factura eléctrica significativa. Realizamos mantenimiento preventivo fuera temporada para alojamientos turísticos evitando averías en meses de máxima ocupación, coordinamos intervenciones en calles estrechas del centro con acceso complicado, y atendemos urgencias priorizando hostelería donde cada día sin clima operativo significa pérdida de reservas en temporada alta turística.`,
    faqs: [
      {
        question: '¿Qué potencia de aire acondicionado se necesita en Centro Sevilla con 40°C?',
        answer: 'Calor extremo sevillano requiere potencia generosa. Para apartamento turístico de 50m² recomendamos sistema de 5.000-6.000 frigorías mínimo. Subdimensionar es error común: unidad pequeña trabaja continuamente al 100% consumiendo mucho sin enfriar adecuadamente. Calculamos carga térmica real.'
      },
      {
        question: '¿Atendéis urgencias de aire acondicionado en apartamentos turísticos del Centro 24h?',
        answer: 'Sí, priorizamos emergencias en alojamientos turísticos del Centro Sevilla. En pleno verano con 40°C+, clima no funcional es inaceptable para huéspedes. Llegamos rápido, diagnosticamos, y reparamos o reemplazamos urgentemente. Disponibles 24h en temporada alta.'
      },
      {
        question: '¿Cómo se climatiza una casa-patio andaluza del Centro?',
        answer: 'Casas-patio sevillanas requieren multisplit: unidad interior en cada estancia alrededor del patio (salones, dormitorios, galerías). Una sola unidad central no es efectiva por distribución fragmentada. Ubicamos exteriores en azotea o patio respetando arquitectura tradicional.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'centro', 'sevilla', 'calor extremo', 'turístico', 'andaluz']
  },

  // Málaga Este - Coastal Villas Marine Protection Premium Climate
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'malaga',
    districtSlug: 'este',
    metadata: {
      title: 'Aire Acondicionado Este Málaga | Villas Costeras y Protección Marina',
      description: 'Aire acondicionado en Este Málaga (El Palo, Pedregalejo). Villas costeras, protección anticorrosión, humedad marina, climatización premium playa. 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en distrito Este de Málaga para villas y viviendas costeras de El Palo y Pedregalejo donde ambiente marino condiciona climatización. La proximidad al Mediterráneo requiere equipos con tratamiento anticorrosión especial en unidades exteriores porque salinidad acelera deterioro de serpentinas y componentes metálicos, humedad marina obliga a sistemas con deshumidificación potente que sequen ambiente además de enfriar evitando condensación excesiva y moho, y mantenimiento preventivo debe ser más frecuente que ubicaciones interiores por acumulación de sal en serpentinas reduciendo transferencia térmica. Instalamos climatización en villas unifamiliares con múltiples espacios (dormitorios, salones, zonas exteriores) usando sistemas multisplit que distribuyen eficientemente, diseñamos soluciones para apartamentos de primera línea con exposición directa a brisa salina, y ubicamos unidades exteriores en ubicaciones protegidas minimizando exposición a sal cuando arquitectura lo permite. Realizamos limpieza de serpentinas cada 3-4 meses en zona costera eliminando sal acumulada que reduce rendimiento, ofrecemos revisiones pre-verano para propiedades vacacionales asegurando clima funcional durante temporada alta, y asesoramos sobre materiales y configuraciones que maximizan durabilidad en entorno marino difícil del litoral malagueño.`,
    faqs: [
      {
        question: '¿La humedad marina afecta unidades exteriores en Málaga Este?',
        answer: 'Sí, salinidad ambiente en El Palo y Pedregalejo acelera corrosión de serpentinas y componentes metálicos. Recomendamos equipos con tratamiento anticorrosión, limpieza preventiva de serpentinas cada 3-4 meses eliminando sal, y revisión más frecuente que ubicaciones interior.'
      },
      {
        question: '¿Qué aire acondicionado es mejor para villas en primera línea de playa?',
        answer: 'Para villas costeras de Málaga Este recomendamos multisplit inverter con múltiples zonas, protección anticorrosión en unidad exterior, y deshumidificación potente. Marcas con buen tratamiento anticorrosión: Daikin, Mitsubishi Electric, Fujitsu gama costera cuando disponible.'
      },
      {
        question: '¿El aire acondicionado necesita más mantenimiento en zona de playa?',
        answer: 'Sí, en zona costera mantenimiento debe ser más frecuente. Limpieza de serpentinas exteriores cada 3-4 meses (vs 6-12 meses interior) eliminando sal. Filtros también se ensucian más por humedad ambiental. Revisiones previenen pérdida de rendimiento por salinidad.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'este', 'malaga', 'villas costeras', 'anticorrosión', 'humedad marina']
  },

  // Zaragoza Delicias - Family Affordable Practical Efficient Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'zaragoza',
    districtSlug: 'delicias',
    metadata: {
      title: 'Aire Acondicionado Delicias Zaragoza | Familias y Soluciones Prácticas',
      description: 'Aire acondicionado en Delicias Zaragoza. Climatización para familias trabajadoras, sistemas asequibles, eficiencia energética. Precios honestos 24h.'
    },
    seoText: `Servicio de aire acondicionado de confianza en Delicias para barrio zaragozano de familias trabajadoras que buscan climatización efectiva a precio justo. Instalamos sistemas split inverter eficientes sin empujar equipos premium innecesarios evitando sobrecostes para hogares con presupuestos ajustados, asesoramos sobre dimensionamiento correcto según metros cuadrados reales evitando sobredimensionar que aumenta inversión sin beneficio, y explicamos opciones desde lo básico funcional hasta sistemas más completos para que cada familia decida según economía disponible. Trabajamos en bloques de apartamentos de Delicias con instalaciones prácticas que minimizan obras y molestias a vecinos, coordinamos con comunidades para ubicación de unidades exteriores cumpliendo normativas sin complicaciones, y ofrecemos presupuestos transparentes con precios claros sin sorpresas posteriores. Realizamos mantenimiento preventivo económico pero efectivo con limpieza de filtros que mejora rendimiento y reduce consumo, asesoramos sobre uso eficiente del aire acondicionado para controlar factura eléctrica en verano, y proporcionamos servicio honesto comprometido con vecinos de Delicias que valoran trabajo bien hecho a precio razonable sin sacrificar calidad funcional ni seguridad reglamentaria.`,
    faqs: [
      {
        question: '¿Ofrecéis aire acondicionado asequible para familias de Delicias?',
        answer: 'Sí, en Delicias trabajamos con honestidad y precios justos. Instalamos split inverter eficiente de marcas fiables sin equipos premium innecesarios. Explicamos opciones claramente desde lo básico funcional hasta completo, respetando presupuesto de cada familia.'
      },
      {
        question: '¿Qué tamaño de aire acondicionado necesito para piso de 70m² en Delicias?',
        answer: 'Para piso de 70m² en Delicias depende de distribución. Opción 1: multisplit con 2-3 unidades interiores (dormitorios + salón) conectadas a una exterior. Opción 2: split individual potente en salón de 5.000-6.000 frigorías + portátil o ventiladores en dormitorios. Evaluamos caso y presupuesto.'
      },
      {
        question: '¿Cómo reducir el consumo eléctrico del aire acondicionado en Delicias?',
        answer: 'Consejos para Delicias: invertir en inverter A+++ (consume 40-50% menos), temperatura a 25-26°C (cada grado menos aumenta 8% consumo), limpieza mensual de filtros, cerrar persianas en horas sol, modo eco/auto, y usar solo en habitaciones ocupadas.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'delicias', 'zaragoza', 'familias', 'asequible', 'eficiencia']
  },

  // ============================================================
  // AIRE ACONDICIONADO - PHASE 3 (FINAL 10 DISTRICTS TO 100%)
  // ============================================================

  // Madrid Arganzuela - Industrial Loft Open Space Cooling
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'arganzuela',
    metadata: {
      title: 'Aire Acondicionado Arganzuela Madrid | Lofts y Espacios Amplios',
      description: 'Aire acondicionado en Arganzuela Madrid. Lofts industriales, grandes espacios abiertos, climatización potente, techos altos. Instalación profesional 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en Arganzuela para espacios amplios característicos del barrio: antiguos lofts industriales reconvertidos en viviendas modernas y estudios con techos altos. Instalamos climatización para grandes volúmenes de aire en espacios diáfanos sin divisiones interiores donde distribución térmica requiere equipos potentes y estratégicamente ubicados, diseñamos soluciones multisplit con varias unidades interiores distribuidas por planta abierta asegurando cobertura uniforme sin zonas calientes, y dimensionamos correctamente considerando altura de techos superior a estándar residencial porque aire caliente asciende concentrándose en parte alta. Trabajamos en edificios reconvertidos con mezcla de elementos originales industriales y adaptaciones modernas, coordinamos instalación respetando estética de espacios arquitectónicos donde tuberías vistas pueden integrarse o conductos ocultos mantener diseño limpio, y ubicamos unidades exteriores en azoteas compartidas de edificios de Arganzuela cumpliendo normativas comunitarias. Ofrecemos asesoramiento técnico sobre caudal de aire necesario para espacios de 100-200m² abiertos, recomendamos sistemas inverter de alta capacidad que mantengan confort sin disparar consumo, y realizamos mantenimiento adaptado a uso residencial-profesional en lofts que también funcionan como estudios o talleres creativos del distrito.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado necesito para loft de 120m² con techos altos en Arganzuela?',
        answer: 'Para loft grande en Arganzuela con techos de 4-5m recomendamos multisplit de alta capacidad: 3-4 unidades interiores murales o cassette distribuidas estratégicamente por planta abierta, conectadas a exterior potente de 9-12kW. Altura extra aumenta volumen a climatizar, necesitas potencia superior a vivienda estándar.'
      },
      {
        question: '¿Es mejor cassette o split mural para espacios diáfanos de Arganzuela?',
        answer: 'En lofts diáfanos de Arganzuela ambas opciones son válidas. Cassette de techo distribuye aire uniformemente desde arriba (ideal para estética industrial), split mural es más económico y fácil instalar. Depende de presupuesto, estética deseada y acceso a falso techo.'
      },
      {
        question: '¿Instaláis aire acondicionado respetando estilo industrial de lofts?',
        answer: 'Sí, en Arganzuela trabajamos respetando estética industrial. Podemos: tuberías vistas integradas en diseño loft, conductos de chapa vista en techos altos, unidades minimalistas que no desentonen, o instalación oculta si preferís diseño limpio moderno. Adaptamos soluciones a arquitectura.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'arganzuela', 'madrid', 'lofts', 'espacios abiertos', 'techos altos']
  },

  // Madrid Tetuán - Dense Apartment Compact Affordable Residential
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    districtSlug: 'tetuan',
    metadata: {
      title: 'Aire Acondicionado Tetuán Madrid | Apartamentos y Soluciones Compactas',
      description: 'Aire acondicionado en Tetuán Madrid. Apartamentos densos, sistemas compactos eficientes, instalación práctica, multifamiliar. Servicio asequible 24h.'
    },
    seoText: `Servicio de aire acondicionado práctico en Tetuán para barrio residencial denso con apartamentos de tamaño medio y variedad multicultural de residentes. Instalamos split compactos eficientes en pisos estándar de 60-80m² optimizando ubicación de unidades interiores para enfriar principales estancias sin necesidad de sistemas premium costosos, asesoramos sobre configuraciones realistas para familias con presupuestos ajustados explicando diferencias entre split individual central o multisplit zonificado, y coordinamos con comunidades de vecinos para instalación de exteriores en fachadas cumpliendo normativa municipal madrileña. Trabajamos en bloques de apartamentos de Tetuán con alta densidad de viviendas compartiendo fachada donde ubicación de unidades exteriores requiere coordinación con administradores y respeto espacios comunes, ofrecemos presupuestos transparentes adaptados a economía diversa del barrio, y realizamos mantenimiento preventivo accesible con limpieza de filtros y revisiones básicas que prolongan vida útil y mantienen eficiencia. Conocemos particularidades de Tetuán: apartamentos prácticos sin lujos innecesarios, familias trabajadoras que priorizan relación calidad-precio, y necesidad de climatización funcional efectiva instalada sin obras invasivas ni complicaciones administrativas con comunidades multifamiliares densas del distrito madrileño.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado recomendáis para apartamento familiar de 70m² en Tetuán?',
        answer: 'Para piso familiar de 70m² en Tetuán recomendamos opciones según presupuesto: Opción 1 económica: split 1x1 inverter A+++ de 5.000-6.000 frigorías en salón + ventiladores dormitorios. Opción 2: multisplit 2x1 (salón + dormitorio principal). Opción 3 completa: multisplit 3x1 cubriendo todas estancias.'
      },
      {
        question: '¿Es complicado instalar aire acondicionado en comunidades de vecinos de Tetuán?',
        answer: 'En Tetuán coordinamos con administradores para permisos de fachada. Generalmente es sencillo si: cumples normativa municipal, respetas distancias a ventanas vecinos, instalación es estéticamente coherente, y comunicas previamente. Te ayudamos con documentación necesaria para licencia si comunidad lo requiere.'
      },
      {
        question: '¿Ofrecéis mantenimiento económico para aire acondicionado en Tetuán?',
        answer: 'Sí, ofrecemos mantenimiento básico preventivo asequible: limpieza filtros interiores, revisión gas refrigerante, limpieza serpentinas exteriores, chequeo funcionamiento general. Precio adaptado a economía familiar de Tetuán. Mantenimiento anual previene averías mayores y mantiene consumo bajo.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'tetuan', 'madrid', 'apartamentos', 'denso', 'compacto']
  },

  // Barcelona Poblenou - Tech Coworking Smart Climate Commercial
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    districtSlug: 'poblenou',
    metadata: {
      title: 'Aire Acondicionado Poblenou Barcelona | Tech, Coworkings y Oficinas',
      description: 'Aire acondicionado en Poblenou Barcelona. Espacios tech, coworkings, oficinas modernas, climatización continua, sistemas eficientes. Servicio profesional 24h.'
    },
    seoText: `Servicio especializado de aire acondicionado en Poblenou para distrito tecnológico barcelonés con coworkings, startups y oficinas creativas que requieren climatización continua fiable. Instalamos sistemas profesionales para espacios de trabajo colaborativos con alta ocupación donde múltiples profesionales generan carga térmica elevada durante jornadas laborales completas, diseñamos climatización para oficinas tech con equipos informáticos funcionando permanentemente aumentando calor ambiente que debe compensarse con refrigeración adecuada, y ofrecemos soluciones eficientes para estudios creativos y agencias donde confort térmico impacta productividad directamente. Trabajamos con VRV y sistemas multi-espacio que permiten control independiente de diferentes zonas (salas reuniones, espacios abiertos, despachos privados) optimizando consumo según ocupación variable, coordinamos instalaciones en edificios industriales reconvertidos respetando arquitectura característica de Poblenou, y proporcionamos mantenimiento preventivo programado fuera horario laboral para no interrumpir actividad empresarial. Ofrecemos respuesta prioritaria a urgencias durante jornada laboral porque fallo de climatización en verano con 30°C+ interior obliga a cerrar espacio afectando negocio, asesoramos sobre amortización de inversión en sistemas eficientes mediante ahorro energético mensurable, y diseñamos instalaciones escalables que puedan ampliarse si espacio coworking crece añadiendo más puestos trabajo en futuro.`,
    faqs: [
      {
        question: '¿Instaláis climatización eficiente para coworkings en Poblenou?',
        answer: 'Sí, en Poblenou Barcelona muchas oficinas tecnológicas y coworkings requieren climatización estable durante jornadas largas con alta ocupación y carga térmica constante de equipos electrónicos. Instalamos VRV o multisplit por zonas, dimensionamos para ocupación máxima, y priorizamos eficiencia A+++ para controlar costes operativos mensuales.'
      },
      {
        question: '¿Atendéis urgencias de aire acondicionado en oficinas durante jornada laboral?',
        answer: 'Sí, priorizamos urgencias empresariales en Poblenou. Sabemos que fallo de climatización en verano con oficina llena obliga a cerrar o enviar equipo a casa. Llegamos rápido, diagnosticamos, y reparamos eficientemente: recarga gas, limpieza serpentinas, o sustitución componente dañado.'
      },
      {
        question: '¿Qué sistema de climatización es mejor para startup tech de Poblenou?',
        answer: 'Para startup tech en Poblenou recomendamos sistemas escalables: multisplit inverter que permita añadir unidades futuras si crecéis, control por zonas para optimizar consumo, eficiencia A+++ (factura eléctrica mensual importa), y mantenimiento preventivo que evite paradas imprevistas. Valoramos necesidades actuales y crecimiento proyectado.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'poblenou', 'barcelona', 'tech', 'coworkings', 'oficinas']
  },

  // Valencia Ruzafa - Nightlife Restaurant Bar Cooling Evening Heat
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'ruzafa',
    metadata: {
      title: 'Aire Acondicionado Ruzafa Valencia | Restaurantes, Bares y Locales',
      description: 'Aire acondicionado en Ruzafa Valencia. Hostelería, restaurantes, bares, climatización nocturna, calor cocinas, sistemas potentes. Emergencias 24h.'
    },
    seoText: `Servicio profesional de aire acondicionado en Ruzafa para barrio valenciano de hostelería intensa con restaurantes, bares y locales nocturnos que generan altas temperaturas interiores. Instalamos sistemas potentes en cocinas profesionales donde calor de planchas, hornos y fuegos combinado con aglomeración de clientes en noches verano crea ambiente térmicamente exigente requiriendo alta capacidad frigorífica, diseñamos climatización zonificada separando cocina de comedor porque necesidades térmicas son diferentes (cocina 10-15°C más caliente necesita mayor potencia), y ofrecemos soluciones para bares con terraza donde clientes entran/salen constantemente dificultando mantenimiento temperatura estable. Trabajamos en establecimientos de Ruzafa con horarios nocturnos donde máxima ocupación coincide con horas más calurosas tardías y aire acondicionado debe funcionar continuamente durante servicio de cenas hasta cierre madrugada, coordinamos instalaciones en edificios antiguos del barrio respetando limitaciones arquitectónicas y normativas municipales, y proporcionamos mantenimiento preventivo pre-verano asegurando que sistemas funcionen perfectamente antes de temporada alta hostelera. Ofrecemos urgencias prioritarias para hostelería porque climatización fallando en agosto con local lleno significa cerrar o perder clientela, asesoramos sobre dimensionamiento correcto evitando subdimensionar que provoca sistemas trabajando al máximo sin enfriar adecuadamente, y recomendamos contratos mantenimiento trimestral porque grasa y uso intensivo aceleran necesidad limpieza filtros serpentinas.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado potente para restaurantes de Ruzafa?',
        answer: 'Sí, en Ruzafa Valencia bares y restaurantes generan altas temperaturas interiores durante noches y fines de semana, por lo que necesitan sistemas inverter capaces de mantener refrigeración continua con consumo optimizado. Dimensionamos según metros cuadrados, aforo máximo, y carga térmica de cocina profesional.'
      },
      {
        question: '¿El calor nocturno de Ruzafa afecta rendimiento del aire acondicionado?',
        answer: 'Sí, noches valencianas de 25-28°C minimizan diferencial térmico reduciendo eficiencia de transferencia calor. Sistema debe trabajar más para enfriar. Importante dimensionar correctamente y mantener serpentinas limpias maximizando intercambio térmico disponible con temperatura exterior elevada nocturna.'
      },
      {
        question: '¿Atendéis urgencias de climatización en hostelería durante servicio?',
        answer: 'Sí, priorizamos emergencias hosteleras en Ruzafa. Fallo de aire acondicionado en agosto con restaurante lleno obliga a cerrar. Ofrecemos intervención rápida nocturna/fines semana, diagnóstico eficiente, y reparación urgente: recarga gas, limpieza serpentinas obstruidas, o sustitución componente crítico para reactivar sistema.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'ruzafa', 'valencia', 'hostelería', 'restaurantes', 'nocturno']
  },

  // Valencia L'Eixample - Elegant Residential Balanced Efficient Comfort
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    districtSlug: 'leixample',
    metadata: {
      title: 'Aire Acondicionado L\'Eixample Valencia | Residencial Elegante y Eficiente',
      description: 'Aire acondicionado en L\'Eixample Valencia. Viviendas elegantes, climatización eficiente, confort residencial, técnicos cualificados. Instalación profesional 24h.'
    },
    seoText: `Servicio de aire acondicionado profesional en L'Eixample valenciano para distrito residencial de viviendas elegantes que priorizan confort térmico equilibrado con eficiencia energética. Instalamos sistemas inverter silenciosos en pisos de construcción clásica donde climatización debe integrarse estéticamente sin desentonar con decoración cuidada, diseñamos soluciones multizona para viviendas amplias permitiendo control independiente de dormitorios y zonas día ajustando temperatura según horarios uso familiar, y asesoramos sobre equipos premium-medios que ofrecen mejor relación prestaciones-precio evitando tanto gama básica limitada como lujo innecesario. Trabajamos en edificios de L'Eixample con regulaciones comunitarias sobre instalación fachadas donde coordinamos permisos y respetamos estética arquitectónica del ensanche valenciano, ofrecemos instalaciones discretas con tuberías ocultas y unidades interiores que minimizan impacto visual en interiores elegantes, y realizamos mantenimiento preventivo programado pre-verano asegurando funcionamiento óptimo durante meses calurosos. Proporcionamos asesoramiento técnico honesto sobre necesidades reales de climatización evitando sobredimensionar innecesariamente, recomendamos inversión en eficiencia A+++ que reduce factura eléctrica mensual significativamente con uso continuado típico de familias residenciales, y trabajamos con marcas fiables reconocidas (Daikin, Mitsubishi, Fujitsu) que ofrecen garantía respaldo y servicio técnico post-venta competente en Valencia ciudad.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado recomendáis para viviendas familiares de L\'Eixample?',
        answer: 'Para viviendas familiares de L\'Eixample Valencia recomendamos multisplit inverter A+++ con 2-4 zonas independientes: dormitorios principales, zona día (salón-cocina), despacho si existe. Permite control individualizado optimizando confort y consumo. Marcas fiables: Daikin, Mitsubishi Electric, Fujitsu gama media-alta.'
      },
      {
        question: '¿Es importante la eficiencia energética en aire acondicionado residencial?',
        answer: 'Sí, en L\'Eixample con uso residencial continuo 4-5 meses verano, eficiencia A+++ vs A reduce consumo 30-40%. Inversión inicial superior se amortiza en 3-4 años con ahorro factura eléctrica. Además, sistemas eficientes suelen ser más silenciosos y duraderos.'
      },
      {
        question: '¿Coordinais instalación con comunidades de vecinos de L\'Eixample?',
        answer: 'Sí, gestionamos permisos con administradores de L\'Eixample. Te ayudamos con: solicitud licencia municipal si necesaria, comunicación previa a comunidad, instalación cumpliendo normativas de fachada, y coordinación con vecinos afectados minimizando molestias durante obras.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'leixample', 'valencia', 'residencial', 'elegante', 'eficiente']
  },

  // Sevilla Macarena - Traditional Family Extreme Heat Practical Systems
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    districtSlug: 'macarena',
    metadata: {
      title: 'Aire Acondicionado Macarena Sevilla | Familias y Calor Extremo Sevillano',
      description: 'Aire acondicionado en Macarena Sevilla. Familias tradicionales, calor extremo 40°C+, sistemas potentes asequibles, instalación práctica. Urgencias 24h.'
    },
    seoText: `Servicio de aire acondicionado adaptado a Macarena para barrio sevillano tradicional donde familias trabajadoras enfrentan calor extremo estival de 40-44°C con presupuestos ajustados. Instalamos sistemas inverter potentes correctamente dimensionados para temperaturas andaluzas extremas evitando subdimensionamiento común que provoca equipos trabajando al máximo sin enfriar adecuadamente, asesoramos sobre capacidad frigorífica realista necesaria para viviendas sevillanas explicando que 2.500 frigorías insuficientes cuando exterior alcanza 42°C y recomendando mínimo 3.500-4.000 por habitación principal, y ofrecemos soluciones prácticas económicas priorizando funcionalidad sobre estética o extras innecesarios. Trabajamos en edificios tradicionales de Macarena con limitaciones instalación donde ubicación de exteriores requiere creatividad respetando normativas comunitarias y arquitectura antigua, coordinamos con vecinos y administradores en comunidades populares donde comunicación clara y presupuestos transparentes son fundamentales, y ofrecemos financiación o facilidades pago para familias que necesitan climatización urgente pero tienen limitaciones económicas temporales. Proporcionamos urgencias verano prioritarias porque con 40°C+ en Sevilla fallo de aire acondicionado es emergencia real especialmente con niños pequeños o personas mayores en casa, realizamos instalaciones rápidas eficientes cuando cliente ya ha decidido evitando dilaciones innecesarias, y recomendamos mantenimiento preventivo pre-verano económico básico que reduce probabilidad averías durante meses críticos julio-agosto sevillanos.`,
    faqs: [
      {
        question: '¿Qué potencia de aire acondicionado se necesita en Macarena para el calor sevillano?',
        answer: 'Para Macarena Sevilla con 40-44°C verano recomendamos mínimo: salón 20m² necesita 4.000-5.000 frigorías, dormitorio 12m² necesita 3.000-3.500 frigorías. Subdimensionar es error común: equipo pequeño trabaja continuamente sin enfriar bien y consume mucho. Dimensionamiento correcto es crítico en Sevilla.'
      },
      {
        question: '¿Ofrecéis soluciones asequibles para familias trabajadoras de Macarena?',
        answer: 'Sí, en Macarena entendemos economía familiar. Ofrecemos split inverter eficiente de marcas fiables (no premium pero sí calidad) a precio justo, explicamos opciones desde básico funcional hasta completo, y facilitamos pago si necesario. Prioridad: aire acondicionado que funcione bien en calor sevillano sin arruinar presupuesto.'
      },
      {
        question: '¿Atendéis urgencias de aire acondicionado en verano sevillano?',
        answer: 'Sí, urgencias verano en Macarena son prioridad. Con 42°C exterior, fallo de climatización es emergencia real. Llegamos rápido, diagnosticamos, y reparamos eficientemente: recarga gas, limpieza, o sustitución componente. Entendemos que familias sevillanas dependen de aire acondicionado funcional julio-agosto.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'macarena', 'sevilla', 'familias', 'calor extremo', 'tradicional']
  },

  // Sevilla Sur - Modern Communities Centralized Balanced Residential
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    districtSlug: 'sur',
    metadata: {
      title: 'Aire Acondicionado Sur Sevilla | Comunidades Modernas y Eficiencia',
      description: 'Aire acondicionado en Sur Sevilla. Urbanizaciones modernas, comunidades residenciales, climatización eficiente, instalación profesional. Servicio familiar 24h.'
    },
    seoText: `Servicio de aire acondicionado profesional en distrito Sur de Sevilla para urbanizaciones residenciales modernas y comunidades familiares que buscan climatización eficiente ante calor extremo sevillano. Instalamos sistemas en viviendas de construcción reciente con aislamiento térmico superior a edificios antiguos pero igualmente expuestas a 40°C+ estivales, diseñamos soluciones multizona para chalets adosados y viviendas unifamiliares con múltiples dormitorios y zonas comunes requiriendo climatización independiente, y asesoramos sobre balance inversión-eficiencia priorizando sistemas A+++ que amortizan coste superior mediante ahorro energético continuado. Trabajamos con comunidades de propietarios en mantenimiento preventivo programado colectivo que reduce costes mediante economía escala y asegura funcionamiento pre-verano para todos vecinos, coordinamos instalaciones respetando normativas arquitectónicas de urbanizaciones donde estética uniforme es requisito administrativo, y ofrecemos contratos anuales para comunidades que prefieren servicio garantizado con proveedor conocido evitando búsquedas urgentes durante temporada alta. Proporcionamos asesoramiento sobre climatización sostenible con sistemas inverter eficientes que minimizan impacto ambiental y factura eléctrica familiar, recomendamos ubicación óptima de unidades exteriores en jardines privados o zonas comunitarias cumpliendo distancias regulatorias, y realizamos instalaciones en urbanizaciones del Sur coordinando accesos, horarios y limpieza respetando convivencia vecinal en comunidades residenciales donde múltiples familias comparten espacios comunes diariamente.`,
    faqs: [
      {
        question: '¿Trabajáis con comunidades de propietarios del Sur de Sevilla?',
        answer: 'Sí, colaboramos con administradores y comunidades del Sur. Ofrecemos mantenimiento preventivo colectivo pre-verano para múltiples viviendas (economía escala reduce precio), contratos anuales para urbanizaciones, y coordinación instalaciones nuevas cumpliendo normativas comunitarias arquitectónicas.'
      },
      {
        question: '¿Qué aire acondicionado recomendáis para chalets adosados del Sur?',
        answer: 'Para chalets del Sur Sevilla recomendamos multisplit inverter con 3-5 zonas independientes: dormitorios, salón, cocina-comedor, despacho si existe. Permite climatizar selectivamente según ocupación optimizando consumo. Capacidad total: 12-18kW dependiendo metros cuadrados considerando 40°C+ verano sevillano.'
      },
      {
        question: '¿Es rentable invertir en aire acondicionado A+++ en Sevilla?',
        answer: 'Sí, en Sevilla con 4-5 meses uso intensivo verano, A+++ vs A estándar ahorra 35-45% factura eléctrica mensual. Inversión inicial 15-20% superior se amortiza en 3-4 años. Además, sistemas eficientes soportan mejor temperaturas extremas sevillanas funcionando establemente.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'sur', 'sevilla', 'comunidades', 'moderno', 'residencial']
  },

  // Málaga Teatinos - Student Professional Modern Efficient Apartment
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'malaga',
    districtSlug: 'teatinos',
    metadata: {
      title: 'Aire Acondicionado Teatinos Málaga | Estudiantes y Apartamentos Modernos',
      description: 'Aire acondicionado en Teatinos Málaga. Estudiantes, profesionales jóvenes, apartamentos eficientes, instalación rápida, precios adaptados. Servicio 24h.'
    },
    seoText: `Servicio de aire acondicionado adaptado a Teatinos para distrito malagueño universitario con estudiantes y jóvenes profesionales en apartamentos modernos que priorizan eficiencia y economía. Instalamos split inverter compactos en viviendas de alquiler dimensionando correctamente sin sobredimensionar innecesariamente porque presupuesto estudiantil es ajustado, asesoramos sobre opciones realistas para pisos compartidos donde climatizar dormitorio individual es suficiente versus climatizar piso completo, y coordinamos con propietarios e inquilinos respecto inversión-responsabilidad cuando instalación nueva requiere acuerdo entre partes. Trabajamos en edificios modernos de Teatinos cercanos a campus universitario con alta rotación inquilinos donde instalaciones deben ser prácticas duraderas sin requerir conocimiento técnico complejo por usuarios jóvenes, ofrecemos presupuestos transparentes competitivos adaptados a economía estudiantil y joven profesional, y realizamos instalaciones rápidas eficientes minimizando tiempo ocupación vivienda durante obras. Proporcionamos asesoramiento sobre consumo eléctrico real mensual para que estudiantes puedan presupuestar factura verano anticipadamente, recomendamos marcas fiables económicas que ofrecen garantía adecuada sin pagar premium innecesario, y ofrecemos mantenimiento básico asequible pre-verano que cualquier inquilino puede contratar independientemente asegurando funcionamiento durante meses calurosos sin averías sorpresa en plena época exámenes junio-julio malagueños.`,
    faqs: [
      {
        question: '¿Qué aire acondicionado económico recomendáis para estudiantes en Teatinos?',
        answer: 'Para estudiantes Teatinos Málaga recomendamos split 1x1 inverter A++ de 2.500-3.000 frigorías por dormitorio individual (marcas fiables económicas: Fujitsu, Mitsubishi gama básica, Daikin entry). Instalación sencilla, consumo controlado 30-50€/mes verano, y suficiente para espacio personal estudiante.'
      },
      {
        question: '¿Quién paga instalación de aire acondicionado en piso alquiler de Teatinos?',
        answer: 'Depende acuerdo propietario-inquilino. Opciones comunes Teatinos: propietario instala y sube renta ligeramente, inquilino instala portable sin obras, o acuerdo compartido (propietario paga equipo, inquilino instalación). Coordinamos con ambas partes facilitando solución beneficiosa mutua.'
      },
      {
        question: '¿Cuánto consume mensualmente aire acondicionado en apartamento de Teatinos?',
        answer: 'En Teatinos Málaga con uso moderado estudiante (6-8h diarias junio-septiembre), split inverter A++ de 3.000 frigorías consume aprox 40-60€/mes electricidad. Uso intensivo 12h/día: 70-90€/mes. Temperatura a 26°C vs 22°C reduce consumo 20-25%. Limpieza filtros mensual mantiene eficiencia.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'teatinos', 'malaga', 'estudiantes', 'moderno', 'apartamentos']
  },

  // Zaragoza Centro - Commercial Residential Mix Practical Balanced
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'zaragoza',
    districtSlug: 'centro',
    metadata: {
      title: 'Aire Acondicionado Centro Zaragoza | Comercial-Residencial Equilibrado',
      description: 'Aire acondicionado en Centro Zaragoza. Edificios mixtos, comercios, oficinas, viviendas, climatización práctica. Instalación profesional 24h.'
    },
    seoText: `Servicio versátil de aire acondicionado en Centro histórico de Zaragoza para distrito con mezcla de usos comerciales, oficinas y residenciales en edificios antiguos casco. Instalamos climatización en comercios de planta baja con limitaciones arquitectónicas donde ubicación de unidades exteriores debe respetar fachadas protegidas y normativa municipal casco antiguo, diseñamos soluciones para oficinas pequeñas en primeras plantas de edificios mixtos donde conviven actividad profesional diurna con viviendas superiores, y trabajamos en apartamentos residenciales del centro con restricciones instalación típicas de construcción antigua zaragozana. Coordinamos con comunidades de vecinos en edificios mixtos donde comercio-oficina-vivienda comparten portal gestionando permisos que afectan a múltiples propietarios con intereses diferentes, ofrecemos instalaciones prácticas que minimizan impacto visual en casco histórico cumpliendo regulaciones patrimoniales cuando edificio está catalogado, y realizamos mantenimiento preventivo adaptado a uso mixto considerando que comercios requieren frecuencia distinta que viviendas. Proporcionamos urgencias priorizadas para comercios durante horario comercial porque fallo climatización verano obliga cerrar afectando negocio inmediatamente, asesoramos sobre dimensionamiento correcto para locales con exposición solar intensa en calles estrechas del centro donde orientación y falta ventilación natural aumentan carga térmica, y recomendamos sistemas silenciosos para viviendas residenciales del centro donde ruido nocturno es sensible en calles históricas relativamente tranquilas de Zaragoza ciudad.`,
    faqs: [
      {
        question: '¿Instaláis aire acondicionado en edificios antiguos del Centro Zaragoza?',
        answer: 'Sí, trabajamos en casco antiguo zaragozano respetando limitaciones arquitectónicas. Instalamos discretamente en fachadas históricas cumpliendo normativa municipal, coordinamos permisos con administradores edificios catalogados, y diseñamos soluciones prácticas para construcción antigua sin grandes obras invasivas.'
      },
      {
        question: '¿Atendéis comercios y oficinas del Centro durante jornada laboral?',
        answer: 'Sí, en Centro Zaragoza priorizamos urgencias comerciales. Fallo de climatización verano obliga cerrar comercio. Llegamos rápido horario laboral, reparamos eficientemente, y ofrecemos instalaciones nuevas fuera horario comercial (tardes-noches) para no afectar actividad diurna negocio.'
      },
      {
        question: '¿Es complicado instalar aire acondicionado en edificios mixtos comercio-vivienda?',
        answer: 'En Centro Zaragoza gestionamos complejidad edificios mixtos: coordinamos permisos con comunidad afectando comercio+vecinos, cumplimos normativas diferenciadas (comercial vs residencial), respetamos horarios instalación no molestando vecinos, y ubicamos exteriores cumpliendo distancias regulatorias entre usos.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'centro', 'zaragoza', 'comercial', 'residencial', 'mixto']
  },

  // Zaragoza San José - Family Apartment Practical Affordable Efficiency
  {
    serviceId: 'aire-acondicionado',
    citySlug: 'zaragoza',
    districtSlug: 'san-jose',
    metadata: {
      title: 'Aire Acondicionado San José Zaragoza | Apartamentos Familiares Prácticos',
      description: 'Aire acondicionado en San José Zaragoza. Familias trabajadoras, apartamentos prácticos, sistemas asequibles eficientes, instalación honesta. Servicio 24h.'
    },
    seoText: `Servicio de aire acondicionado honesto en San José para barrio zaragozano de familias trabajadoras en apartamentos prácticos que necesitan climatización efectiva a precio razonable. Instalamos split inverter fiables sin empujar gama premium innecesaria para viviendas estándar, asesoramos transparentemente sobre dimensionamiento real necesario evitando sobredimensionar que aumenta coste sin beneficio proporcional, y explicamos opciones claramente desde básico funcional hasta sistemas completos para que cada familia decida según presupuesto disponible sin presión comercial. Trabajamos en bloques de apartamentos de San José con instalaciones prácticas que cumplen normativa sin sobrecostes innecesarios, coordinamos con comunidades para ubicación exteriores respetando acuerdos vecinales sin complicaciones administrativas, y ofrecemos presupuestos escritos detallados con precios finales claros sin sorpresas posteriores ni extras ocultos. Realizamos mantenimiento preventivo económico pre-verano con limpieza filtros y revisión básica que previene averías mayores, asesoramos sobre uso eficiente reduciendo consumo eléctrico mediante temperatura adecuada 25-26°C y aprovechamiento modo eco automático, y proporcionamos servicio post-venta responsable atendiendo dudas o incidencias menores sin cobrar desplazamientos abusivos. Conocemos particularidades San José: familias que valoran honestidad y trabajo bien hecho, presupuestos ajustados que requieren maximizar relación calidad-precio, y necesidad de climatización fiable funcional durante veranos zaragozanos sin lujos innecesarios pero con garantía tranquilidad operativa funcionamiento correcto toda temporada calurosa.`,
    faqs: [
      {
        question: '¿Qué sistema inverter recomendáis para pisos familiares en San José Zaragoza?',
        answer: 'Para familias San José recomendamos opciones según presupuesto: Económica: split 1x1 inverter A++ salón 5.000 frigorías + ventiladores dormitorios (700-900€ instalado). Equilibrada: multisplit 2x1 salón+dormitorio principal (1.200-1.500€). Completa: multisplit 3x1 cubriendo todas estancias (1.800-2.200€). Marcas fiables: Fujitsu, Mitsubishi, Daikin gama media.'
      },
      {
        question: '¿Ofrecéis presupuestos claros sin sorpresas en San José?',
        answer: 'Sí, en San José trabajamos con transparencia total. Presupuesto escrito incluye: equipo específico (marca+modelo+potencia), materiales instalación (tuberías+cableado+soportes), mano obra, permisos si necesarios, y IVA. Precio final cerrado sin extras ocultos posteriores. Honestidad es prioridad con vecinos del barrio.'
      },
      {
        question: '¿Cómo mantener bajo el consumo del aire acondicionado en San José?',
        answer: 'Consejos prácticos San José: temperatura 25-26°C (confortable y económica), modo auto/eco que ajusta potencia automáticamente, limpieza filtros mensual mejora rendimiento 10-15%, cerrar persianas horas sol, ventilar natural mañanas frescas, y usar solo habitaciones ocupadas. Inverter A+++ consume 40% menos que modelos antiguos on/off.'
      }
    ],
    semanticOwnership: ['aire-acondicionado', 'san-jose', 'zaragoza', 'familias', 'apartamentos', 'práctico']
  },

  // ============================================
  // CALEFACCIÓN DISTRICT SEO - PHASE 1 PILOT
  // ============================================
  // Enterprise Heating Semantic Layer - 10 Districts
  // Governance: NO GEO expansion, ONLY refinement
  // Cross-service isolation: heating vs cooling validated
  // ============================================

  // Madrid Salamanca - Luxury Winter Comfort Premium Radiant
  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    districtSlug: 'salamanca',
    metadata: {
      title: 'Calefacción Salamanca Madrid | Confort Premium y Suelo Radiante',
      description: 'Calefacción en Salamanca Madrid. Sistemas premium, suelo radiante, termostatos inteligentes, confort silencioso, instalación profesional. Servicio 24h.'
    },
    seoText: `Servicio premium de calefacción en Salamanca para distrito madrileño de alto standing donde residentes exigen máximo confort térmico invernal con elegancia discreta. Instalamos sistemas de suelo radiante en viviendas de lujo proporcionando calor uniforme sin radiadores visibles que comprometan diseño interior elegante, integramos termostatos inteligentes programables desde smartphone permitiendo control preciso temperatura por zonas y ahorro energético sin sacrificar confort, y realizamos mantenimiento preventivo calderas de condensación marca premium asegurando eficiencia máxima durante invierno madrileño. Trabajamos en apartamentos amplios de Salamanca con sistemas de calefacción central comunitaria optimizando distribución calor mediante equilibrado hidráulico de radiadores evitando zonas frías en viviendas exteriores, instalamos radiadores de aluminio diseño contemporáneo que combinan alta emisión térmica con estética minimalista apropiada para interiores refinados, y proporcionamos urgencias prioritarias 24h durante olas de frío porque fallo calefacción invierno en residencia premium es inaceptable. Asesoramos sobre modernización sistemas antiguos a calderas condensación eficientes reduciendo factura gas 25-30% mientras mejoramos confort, recomendamos soluciones híbridas calefacción-aerotermia para viviendas ecológicas premium buscando sostenibilidad sin comprometer prestaciones, y ofrecemos contratos mantenimiento integral anual con revisiones preventivas pre-invierno garantizando funcionamiento impecable toda temporada fría madrileña sin sorpresas desagradables.`,
    faqs: [
      {
        question: '¿El suelo radiante es recomendable para viviendas premium en Salamanca Madrid?',
        answer: 'Sí, en Salamanca el suelo radiante es ideal para viviendas premium. Proporciona confort superior con calor uniforme desde suelo, permite diseño interior sin radiadores visibles, es silencioso totalmente, ofrece eficiencia energética excelente, y aumenta valor inmobiliario. Inversión inicial mayor pero amortización 8-10 años y confort incomparable.'
      },
      {
        question: '¿Qué termostatos inteligentes recomendáis para apartamentos de lujo en Salamanca?',
        answer: 'Para Salamanca premium recomendamos Nest Learning Thermostat (aprende hábitos automáticamente), Netatmo (diseño elegante francés, control multizona), o Honeywell Evohome (sistema profesional 12 zonas independientes). Permiten control smartphone, programación avanzada, integración domótica, y ahorro 20-30% optimizando temperaturas según ocupación real.'
      },
      {
        question: '¿Con qué frecuencia necesita mantenimiento caldera de condensación en Salamanca?',
        answer: 'Calderas condensación premium Salamanca requieren revisión anual obligatoria pre-invierno (septiembre-octubre). Incluye: limpieza quemador e intercambiador, verificación presión circuito, prueba estanqueidad gas, calibración termostato, y análisis combustión. Mantenimiento preventivo evita averías invierno, mantiene eficiencia óptima, y prolonga vida útil caldera 15-20 años.'
      }
    ],
    semanticOwnership: ['calefaccion', 'salamanca', 'madrid', 'premium', 'suelo-radiante', 'lujo']
  },

  // Madrid Chamberí - Old Buildings Poor Insulation Radiator Balancing
  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    districtSlug: 'chamberi',
    metadata: {
      title: 'Calefacción Chamberí Madrid | Edificios Antiguos y Eficiencia',
      description: 'Calefacción en Chamberí Madrid. Edificios antiguos, aislamiento deficiente, equilibrado radiadores, calderas comunitarias, retrofits térmicos. Servicio 24h.'
    },
    seoText: `Servicio especializado de calefacción para Chamberí donde edificios antiguos de principios siglo XX presentan desafíos térmicos por aislamiento deficiente y sistemas calefacción originales obsoletos. Realizamos equilibrado hidráulico radiadores en instalaciones centralizadas comunitarias donde viviendas orientación norte sufren frío mientras orientación sur tienen exceso calor, instalamos válvulas termostáticas en cada radiador permitiendo regulación individual temperatura sin modificar caldera central, y optimizamos calderas comunitarias antiguas mejorando combustión y reduciendo consumo gas común del edificio. Trabajamos en comunidades vecinos Chamberí coordinando mejoras térmicas colectivas que benefician todos propietarios, asesoramos sobre modernización sistemas antiguos carbón-gasoil a gas natural eficiente cumpliendo normativas ambientales actuales Madrid Central, y solucionamos problemas crónicos zonas frías interiores típicas construcciones antiguas con puentes térmicos estructurales. Instalamos radiadores adicionales en estancias mal climatizadas originalmente donde distribución calor diseño original era insuficiente, purgamos sistemas completos eliminando aire acumulado que reduce rendimiento significativamente en instalaciones viejas, y reparamos fugas circuitos calefacción ocultos tras tabiques antiguos detectando origen mediante termografía infrarroja evitando obras innecesarias. Proporcionamos urgencias invierno para edificios Chamberí donde fallo caldera comunitaria afecta múltiples familias simultáneamente requiriendo intervención rápida, y ofrecemos asesoramiento retrofits térmicos mejorando aislamiento ventanas-fachadas complementando calefacción para confort real sostenible en construcción centenaria madrileña.`,
    faqs: [
      {
        question: '¿La calefacción central de Chamberí pierde eficiencia en edificios antiguos?',
        answer: 'Sí, edificios antiguos Chamberí pierden calor rápidamente por aislamiento deficiente (ventanas originales, fachadas sin aislar, puentes térmicos estructurales). Soluciones: equilibrar radiadores optimizando distribución calor, instalar válvulas termostáticas regulando temperatura por estancia, mejorar aislamiento ventanas con doble acristalamiento, y modernizar caldera comunitaria a condensación. Mejoras reducen consumo 20-35% aumentando confort notablemente.'
      },
      {
        question: '¿Es posible regular temperatura individualmente con calefacción central comunitaria?',
        answer: 'Sí, instalando válvulas termostáticas en cada radiador puedes regular temperatura por habitación independientemente sin modificar caldera central comunitaria. Válvulas permiten cerrar radiadores habitaciones no usadas, ajustar confort personal (18°C dormitorios, 21°C salón), y ahorrar en factura individual repartida según contador calorífico si edificio tiene sistema instalado.'
      },
      {
        question: '¿Por qué algunos radiadores calientan mucho y otros quedan fríos en Chamberí?',
        answer: 'Desequilibrio hidráulico típico instalaciones centralizadas antiguas. Radiadores cerca caldera reciben agua muy caliente, radiadores lejos quedan tibios-fríos. Solución: equilibrado hidráulico profesional ajustando válvulas retorno para distribuir caudal uniformemente. Tras equilibrado, temperatura homogénea en toda vivienda y edificio, mejorando confort y eficiencia sistema completo.'
      }
    ],
    semanticOwnership: ['calefaccion', 'chamberi', 'madrid', 'edificios-antiguos', 'radiadores', 'equilibrado']
  },

  // Madrid Centro - Tourism Apartments Historic Thermal Loss Emergency
  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    districtSlug: 'centro',
    metadata: {
      title: 'Calefacción Centro Madrid | Apartamentos Turísticos e Históricos',
      description: 'Calefacción en Centro Madrid. Apartamentos turísticos, edificios históricos, pérdidas térmicas, reparaciones urgentes, instalación rápida. Servicio 24h.'
    },
    seoText: `Servicio ágil de calefacción para Centro Madrid donde apartamentos turísticos y residencias históricas requieren soluciones térmicas rápidas efectivas durante invierno. Instalamos sistemas calefacción compactos en apartamentos turismo donde espacio limitado y rotación huéspedes demanda equipos fiables automáticos sin complicaciones operativas, realizamos reparaciones urgentes calderas individuales 24h porque fallo calefacción pleno invierno madrileño afecta experiencia huéspedes turísticos gravemente, y proporcionamos mantenimiento preventivo pre-temporada alta asegurando funcionamiento impecable durante meses ocupación máxima diciembre-febrero. Trabajamos en edificios históricos casco antiguo madrileño con restricciones arquitectónicas respetando normativas protección patrimonial, instalamos calefacción eléctrica eficiente en viviendas sin gas natural donde instalación gas requeriría obras invasivas incompatibles con estructura protegida, y solucionamos pérdidas térmicas crónicas ventanas antiguas acristalamiento simple mediante soluciones discretas compatibles con estética histórica. Coordinamos con administradores fincas turísticas gestionando múltiples apartamentos con mantenimiento unificado reduciendo costes operativos, asesoramos propietarios inversión apartamentos turísticos sobre sistemas calefacción óptimos balance confort-coste operativo maximizando rentabilidad, y ofrecemos contratos mantenimiento anual apartamentos turismo con revisiones programadas períodos baja ocupación evitando interrupciones durante reservas activas. Proporcionamos urgencias prioritarias Centro Madrid con respuesta <60 minutos porque fallo calefacción apartamento turístico con huéspedes requiere solución inmediata profesional preservando reputación propiedad plataformas alquiler vacacional.`,
    faqs: [
      {
        question: '¿Qué calefacción recomendáis para apartamentos turísticos en Centro Madrid?',
        answer: 'Para apartamentos turísticos Centro recomendamos: splits inverter bomba calor frío-calor (versátil verano-invierno, termostato simple huéspedes), radiadores eléctricos bajo consumo con termostato programable (sin mantenimiento gas, seguros), o caldera gas condensación individual si instalación gas disponible (económico uso intensivo). Prioridad: fiabilidad, automatización, y operación simple para huéspedes sin conocimiento técnico.'
      },
      {
        question: '¿Cómo evitar averías calefacción en apartamento turístico durante ocupación?',
        answer: 'Mantenimiento preventivo riguroso pre-temporada alta (septiembre-octubre): revisión completa caldera/splits, limpieza filtros, verificación presión circuito, prueba funcionamiento termostatos, y reemplazo preventivo componentes desgastados. Contratos mantenimiento semestral minimizan riesgo averías durante reservas. Si fallo ocurre, servicio urgente 24h restablece calefacción <2-3 horas preservando experiencia huéspedes.'
      },
      {
        question: '¿Es caro calentar edificios históricos del Centro con pérdidas térmicas altas?',
        answer: 'Sí, edificios históricos Centro con acristalamiento simple, fachadas sin aislar, y puertas originales pierden calor rápidamente aumentando consumo. Soluciones viables: burletes puertas/ventanas (económico, efectivo), cortinas térmicas gruesas, calefacción por zonas solo estancias usadas, temperatura moderada 19-21°C, y termostato programable bajando temperatura noche-ausencias. Mejoras reducen factura 20-30% sin obras invasivas incompatibles con protección patrimonial.'
      }
    ],
    semanticOwnership: ['calefaccion', 'centro', 'madrid', 'turismo', 'historico', 'urgencias']
  },

  // Barcelona Eixample - Elegant Classic Radiator Modernization Balanced
  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    districtSlug: 'eixample',
    metadata: {
      title: 'Calefacción Eixample Barcelona | Radiadores y Confort Clásico',
      description: 'Calefacción en Eixample Barcelona. Apartamentos elegantes, modernización radiadores, eficiencia térmica equilibrada, sistemas discretos. Servicio 24h.'
    },
    seoText: `Servicio refinado de calefacción en Eixample barcelonés para distrito emblemático donde apartamentos Cerdà amplios requieren climatización invernal equilibrada respetando elegancia arquitectónica. Modernizamos radiadores hierro fundido antiguos a aluminio alta emisión térmica manteniendo estética clásica apropiada para interiores Eixample, instalamos calderas condensación eficientes reemplazando equipos antiguos atmosféricos reduciendo consumo gas 25-30% mientras mejoramos confort, y realizamos equilibrado sistemas calefacción central comunitaria distribuyendo calor uniformemente entre viviendas orientaciones diferentes. Trabajamos en comunidades vecinos Eixample coordinando mejoras térmicas colectivas optimizando calderas centralizadas antiguas con beneficio compartido todos propietarios, instalamos contadores caloríficos individuales permitiendo facturación justa según consumo real cada vivienda incentivando ahorro energético, y proporcionamos mantenimiento preventivo pre-invierno asegurando funcionamiento impecable durante meses fríos barceloneses diciembre-febrero. Asesoramos sobre sistemas híbridos calefacción gas-aerotermia para viviendas sostenibles Eixample buscando eficiencia máxima reduciendo huella carbono, instalamos termostatos inalámbricos programables por zonas en pisos amplios permitiendo climatizar selectivamente estancias según ocupación real optimizando consumo, y solucionamos problemas humedad-condensación invierno en viviendas Eixample con ventilación deficiente causando moho mediante sistemas VMC (ventilación mecánica controlada) complementando calefacción. Ofrecemos urgencias 24h Eixample con respuesta <60 minutos porque fallo calefacción pleno invierno mediterráneo húmedo requiere solución profesional rápida restaurando confort térmico esencial viviendas residenciales permanentes.`,
    faqs: [
      {
        question: '¿Vale la pena modernizar radiadores antiguos en Eixample Barcelona?',
        answer: 'Sí, modernizar radiadores fundición antiguos Eixample a aluminio/acero moderno ofrece ventajas: calientan 40% más rápido (respuesta térmica inmediata), pesan menos (instalación sencilla), diseño contemporáneo elegante, mayor emisión térmica por m² (ahorras espacio), y eficiencia superior (consumes menos gas mismo confort). Inversión amortiza 5-7 años con ahorro energético + confort mejorado.'
      },
      {
        question: '¿Cómo funciona calefacción central en edificios comunitarios Eixample?',
        answer: 'Calefacción central Eixample: caldera única comunitaria calienta agua circulando por tuberías verticales (montantes) distribuyendo calor radiadores todas viviendas. Ventajas: mantenimiento compartido, economía escala combustible, sin calderas individuales. Desventajas: horario fijo encendido, temperatura uniforme difícil personalizar. Solución: válvulas termostáticas individuales + contador calorífico permiten regulación personal y facturación justa según consumo real.'
      },
      {
        question: '¿Qué temperatura calefacción es recomendable en Eixample invierno?',
        answer: 'Temperatura óptima Eixample invierno: 19-21°C salón-zonas día (confort sin derrochar), 16-18°C dormitorios (sueño saludable, ahorro energético), 22°C baño durante uso (confort puntual). Cada grado adicional aumenta consumo gas 7%. Termostato programable baja temperatura automáticamente noche-ausencias ahorrando 20-25% factura sin sacrificar confort cuando estás presente.'
      }
    ],
    semanticOwnership: ['calefaccion', 'eixample', 'barcelona', 'radiadores', 'elegante', 'modernizacion']
  },

  // Barcelona Ciutat Vella - Humidity Condensation Winter Medieval Compact
  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Calefacción Ciutat Vella Barcelona | Humedad y Confort Invernal',
      description: 'Calefacción en Ciutat Vella Barcelona. Edificios antiguos, humedad invernal, condensación, calefacción compacta, retrofits térmicos. Servicio 24h.'
    },
    seoText: `Servicio especializado calefacción para Ciutat Vella barcelonesa donde edificios medievales góticos enfrentan desafíos únicos humedad invernal condensación por proximidad mar y construcción antigua. Instalamos sistemas calefacción compacta en pisos estrechos casco antiguo con espacio limitado donde radiadores tradicionales ocupan demasiado área vital, solucionamos problemas condensación-moho invierno causados por combinación humedad mediterránea y calefacción insuficiente mediante equipos dimensionados correctamente más ventilación adecuada, y realizamos retrofits térmicos respetuosos edificios históricos protegidos Ciutat Vella cumpliendo normativas patrimoniales estrictas. Trabajamos en apartamentos turísticos Barrio Gótico-Raval donde calefacción fiable esencial experiencia huéspedes durante meses fríos húmedos diciembre-febrero, instalamos calefacción eléctrica eficiente en viviendas sin instalación gas donde obras requeridas serían invasivas incompatibles con estructura medieval protegida, y proporcionamos mantenimiento urgente 24h porque fallo calefacción casco antiguo barcelonés con humedad ambiental alta genera condensación rápida deteriorando interiores. Asesoramos sobre deshumidificación complementaria calefacción en plantas bajas Ciutat Vella con humedad estructural crónica por capilaridad muros antiguos, instalamos termostatos higrostáticos que ajustan temperatura según humedad relativa previniendo condensación ventanas-paredes frías, y recomendamos radiadores toallero baño que calientan secando ambiente reduciendo moho típico baños antiguos mal ventilados. Coordinamos con comunidades vecinos soluciones térmicas colectivas edificios completos maximizando eficiencia mediante economía escala mientras respetamos idiosincrasia arquitectónica única patrimonio medieval barcelonés incomparable.`,
    faqs: [
      {
        question: '¿Por qué aparece condensación en ventanas durante invierno en Ciutat Vella?',
        answer: 'Condensación ventanas Ciutat Vella invierno ocurre cuando humedad interior alta (cocinar, bañarse, respirar) contacta cristal frío exterior formando gotas. Causas: calefacción insuficiente (interior frío), ventilación deficiente (humedad acumulada), ventanas antiguas acristalamiento simple. Soluciones: ventilar 10min diarios renovando aire, calefacción adecuada manteniendo 19-21°C, deshumidificador si humedad >70%, doble acristalamiento si posible.'
      },
      {
        question: '¿Es recomendable calefacción eléctrica en pisos antiguos Ciutat Vella sin gas?',
        answer: 'Sí, para pisos Ciutat Vella sin gas, calefacción eléctrica moderna eficiente es opción viable: radiadores bajo consumo con termostato programable (instalación simple sin obras), splits bomba calor inverter A+++ (eficientes, frío-calor versatil), o acumuladores nocturnos cargando tarifa valle (económico). Evita radiadores antiguos convección directa (consumen excesivo). Inversión correcta + tarificación adecuada = coste razonable confort garantizado.'
      },
      {
        question: '¿Cómo evitar moho en apartamentos Ciutat Vella durante invierno?',
        answer: 'Prevención moho Ciutat Vella invierno: calefacción mínima constante 18-19°C (evita paredes frías), ventilación diaria 10-15min (renueva aire húmedo), extractor baño-cocina funcionando (elimina vapor origen), deshumidificador si humedad persistente >70%, y evitar tender ropa interior sin ventilación. Moho crece <16°C + humedad >70%. Calefacción adecuada + ventilación correcta = ambiente seco saludable sin moho.'
      }
    ],
    semanticOwnership: ['calefaccion', 'ciutat-vella', 'barcelona', 'humedad', 'medieval', 'condensacion']
  },

  // Valencia Poblats Marítims - Coastal Humidity Winter Dehumidification Mild
  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    districtSlug: 'poblats-maritims',
    metadata: {
      title: 'Calefacción Poblats Marítims Valencia | Humedad Costera Invierno',
      description: 'Calefacción en Poblats Marítims Valencia. Humedad costera invernal, deshumidificación, calefacción eficiente, invierno suave. Servicio 24h.'
    },
    seoText: `Servicio adaptado calefacción para Poblats Marítims valencianos donde humedad costera invernal y clima mediterráneo suave requieren enfoque diferente calefacción tradicional interior. Instalamos sistemas calefacción eficientes dimensionados correctamente para inviernos suaves Valencia donde temperaturas raramente bajan de 5°C evitando sobredimensionamiento típico instaladores sin experiencia local, proporcionamos soluciones deshumidificación complementaria calefacción porque humedad marina alta 70-80% invierno genera sensación térmica fría mayor que temperatura real ambiente, y realizamos mantenimiento preventivo calderas gas asegurando funcionamiento correcto durante meses uso limitado evitando averías por inactividad prolongada. Trabajamos en viviendas costeras Malvarrosa-Cabanyal donde proximidad mar causa humedad estructural crónica requiriendo calefacción que seque además calentar, instalamos splits bomba calor inverter modo calor que deshumidifican simultáneamente proporcionando confort superior mediante reducción humedad relativa ambiente, y asesoramos sobre uso eficiente calefacción Valencia donde necesidad real es 4-5 meses año versus 6-7 meses interior peninsular justificando inversión moderada versus sistemas premium sobredimensionados. Coordinamos con comunidades apartamentos costeros mantenimiento calderas centralizadas antiguas infrautilizadas mayoría año donde revisión anual es esencial prevenir deterioro corrosivo aire salino marino, solucionamos problemas condensación ventanas invierno típicos viviendas frente playa con humedad ambiental extrema mediante termostatos higrostáticos inteligentes, y ofrecemos urgencias calefacción 24h Poblats Marítims porque aunque inviernos suaves, olas frío ocasionales combinadas con humedad costera alta generan malestar significativo requiriendo calefacción funcional inmediatamente.`,
    faqs: [
      {
        question: '¿Qué potencia calefacción necesito en Poblats Marítims Valencia?',
        answer: 'Poblats Marítims Valencia con invierno suave requiere potencia moderada: salón 20m² necesita 1.500-2.000W (vs 2.500-3.000W interior frío). Splits inverter 2.200-2.500W calor suficientes mayoría viviendas costeras. Evita sobredimensionar: equipos oversized consumen más, encienden-apagan frecuentemente (ineficiente), y cuestan más innecesariamente. Consulta instalador local experiencia clima mediterráneo costero Valencia específicamente.'
      },
      {
        question: '¿Es necesaria deshumidificación adicional con calefacción en zona costera?',
        answer: 'En Poblats Marítims humedad invernal 70-85% hace sentir más frío de lo que termómetro indica. Calefacción splits inverter modernos deshumidifican automáticamente modo calor (función incorporada), mejorando confort notablemente. Si calefacción solo radiadores gas sin deshumidificación, considera deshumidificador portátil dormitorios-salón reduciendo humedad a 50-60% (confort óptimo). Air seco calienta más fácil ahorrando energía.'
      },
      {
        question: '¿Con qué frecuencia usar calefacción en Poblats Marítims invierno suave?',
        answer: 'Poblats Marítims Valencia: calefacción necesaria diciembre-febrero principalmente, ocasionalmente noviembre-marzo días fríos puntuales. Uso típico: tardes-noches cuando temperatura baja y humedad aumenta (sensación fría), apagada días soleados suaves 15-18°C. Termostato programable optimiza encendidos solo cuando necesario, ahorrando versus encendido continuo innecesario. Factura mensual moderada 30-60€ uso racional invierno suave mediterráneo.'
      }
    ],
    semanticOwnership: ['calefaccion', 'poblats-maritims', 'valencia', 'humedad-costera', 'invierno-suave', 'deshumidificacion']
  },

  // Valencia Ciutat Vella - Narrow Historic Thermal Retention Compact Efficient
  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    districtSlug: 'ciutat-vella',
    metadata: {
      title: 'Calefacción Ciutat Vella Valencia | Edificios Históricos Compactos',
      description: 'Calefacción en Ciutat Vella Valencia. Edificios históricos, calles estrechas, retención térmica, calefacción compacta eficiente. Servicio 24h.'
    },
    seoText: `Servicio especializado calefacción para Ciutat Vella valenciana donde edificios históricos casco antiguo con calles estrechas presentan características térmicas únicas requiriendo soluciones adaptadas. Instalamos sistemas calefacción compactos en viviendas estrechas altas casco antiguo donde espacio limitado y distribución vertical requieren radiadores dimensionados correctamente por planta, trabajamos respetando restricciones arquitectónicas edificios protegidos Ciutat Vella donde obras invasivas prohibidas limitando opciones instalación, y solucionamos problemas retención térmica deficiente construcciones antiguas con muros gruesos piedra que absorben calor lentamente enfriándose rápidamente. Realizamos instalaciones calefacción gas natural en edificios casco antiguo recientemente conectados red gas sustituyendo sistemas eléctricos antiguos ineficientes reduciendo coste operativo significativamente, proporcionamos calefacción eléctrica eficiente moderna en viviendas sin acceso gas donde obras conexión serían desproporcionadas para tamaño vivienda, y asesoramos sobre uso racional calefacción Valencia donde invierno suave permite estrategias ahorro mediante calefacción selectiva estancias usadas versus climatizar piso completo innecesariamente. Trabajamos en apartamentos turísticos casco antiguo valenciano donde calefacción fiable esencial durante meses invierno para huéspedes esperando confort moderno en edificio histórico, coordinamos con comunidades vecinos mejoras térmicas colectivas optimizando calderas centralizadas antiguas infrautilizadas mayoría año, y ofrecemos mantenimiento preventivo pre-invierno especializado edificios históricos considerando particularidades construcción antigua compatible con sistemas modernos. Proporcionamos urgencias calefacción 24h Ciutat Vella porque fallo invernal en edificio histórico puede causar daños humedad-condensación además incomodidad residentes requiriendo intervención rápida profesional.`,
    faqs: [
      {
        question: '¿Es complicado instalar calefacción en edificios antiguos Ciutat Vella Valencia?',
        answer: 'Instalación calefacción Ciutat Vella requiere experiencia edificios históricos: muros gruesos piedra dificultan paso tuberías, restricciones patrimonio limitan obras visibles, y espacio reducido complica ubicación equipos. Soluciones: sistemas compactos sin obras invasivas (splits bomba calor, radiadores eléctricos bajo consumo), instalaciones discretas respetuosas arquitectura, y coordinación permisos necesarios. Instalador experimentado casco antiguo soluciona eficientemente sin comprometer edificio.'
      },
      {
        question: '¿Qué sistema calefacción es mejor para pisos estrechos altos de Ciutat Vella?',
        answer: 'Pisos estrechos verticales Ciutat Vella se benefician: splits multi-split inverter (unidad exterior única, interiores compactas por planta ahorrando espacio), radiadores eléctricos bajos programables por estancia (sin ocupar suelo, control independiente), o caldera gas mural + radiadores aluminio compactos si gas disponible. Evita sistemas voluminosos ocupando espacio vital. Prioridad: compactación, eficiencia, control por zonas.'
      },
      {
        question: '¿Los muros gruesos antiguos conservan bien el calor en Ciutat Vella?',
        answer: 'Muros piedra antiguos Ciutat Vella tienen inercia térmica alta: tardan calentarse (absorben calor lentamente), pero conservan temperatura más tiempo una vez calientes (enfriamiento lento). Estrategia: calefacción continua moderada 18-20°C versus encendidos puntuales intensos (más eficiente con inercia alta). Una vez muros calientes, mantener temperatura consume menos que calentar desde frío repetidamente. Apagar-encender constante es ineficiente en construcción antigua inercia alta.'
      }
    ],
    semanticOwnership: ['calefaccion', 'ciutat-vella', 'valencia', 'historico', 'compacto', 'eficiente']
  },

  // Sevilla Triana - Humid Winter Mornings Patio-House Practical Affordable
  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    districtSlug: 'triana',
    metadata: {
      title: 'Calefacción Triana Sevilla | Confort Invernal y Casas-Patio',
      description: 'Calefacción en Triana Sevilla. Humedad matinal invernal, casas-patio tradicionales, calefacción práctica asequible. Servicio 24h urgente.'
    },
    seoText: `Servicio práctico calefacción para Triana sevillano donde casas-patio tradicionales y humedad matinal invernal características distrito requieren soluciones térmicas adaptadas idiosincrasia local. Instalamos calefacción eficiente casas-patio Triana con distribución habitaciones alrededor patio central donde pérdida térmica por múltiples fachadas exteriores requiere dimensionamiento correcto evitando subdimensionar típico instaladores sin experiencia arquitectura tradicional sevillana, proporcionamos sistemas calefacción zonificada permitiendo climatizar selectivamente estancias usadas versus calentar patio central abierto innecesariamente, y realizamos mantenimiento calderas gas asegurando funcionamiento durante meses uso limitado invierno porque Sevilla disfruta temperaturas suaves mayoría año. Trabajamos en viviendas tradicionales Triana donde humedad mañanas invierno por proximidad Guadalquivir genera sensación fría mayor que temperatura real requiriendo calefacción matinal potente rápida, instalamos termostatos programables con horarios adaptados ritmo vida trianero activando calefacción automáticamente madrugadas frías preparando hogar antes despertar, y asesoramos sobre uso racional calefacción Sevilla donde necesidad real limitada 3-4 meses año justificando inversión moderada sistemas eficientes versus equipos premium sobredimensionados. Coordinamos con familias trabajadoras Triana proporcionando presupuestos transparentes honestos adaptados economía local sin empujar soluciones innecesarias, ofrecemos opciones calefacción escalables desde básico funcional hasta completo multizona para que cada hogar decida según presupuesto disponible, y realizamos instalaciones rápidas eficientes minimizando molestias durante obras porque respeto vivienda familiar es prioritario. Proporcionamos urgencias calefacción 24h Triana durante olas frío ocasionales invierno sevillano cuando temperaturas bajan inesperadamente generando demanda concentrada servicios térmicos profesionales.`,
    faqs: [
      {
        question: '¿Cómo afecta el patio central a la calefacción en casa tradicional Triana?',
        answer: 'Patio central Triana actúa como zona pérdida térmica: habitaciones perimetrales tienen múltiples paredes exteriores (fachada calle + patio) perdiendo más calor que piso convencional. Necesitas 20-30% más potencia calefacción compensando pérdidas. Estrategia eficiente: calefacción solo habitaciones cerradas usadas, cortinas gruesas separando estancias de patio, y cerrar puertas patio durante noche. No intentes calentar patio abierto (imposible eficientemente).'
      },
      {
        question: '¿Es necesaria calefacción potente en Triana con invierno sevillano suave?',
        answer: 'Aunque invierno Sevilla es suave (raramente <5°C), humedad matinal alta Triana por Guadalquivir genera sensación fría significativa. Necesitas calefacción suficiente calentar rápidamente mañanas 8-10°C húmedas (sensación térmica 5-6°C). Potencia adecuada: 80-100W por m² calefacción rápida. Subdimensionar común error: equipo pequeño no calienta efectivamente ambiente húmedo frío matinal trianero.'
      },
      {
        question: '¿Cuántos meses al año se usa calefacción en Triana realmente?',
        answer: 'Triana Sevilla usa calefacción principalmente diciembre-febrero (3 meses intenso), ocasionalmente noviembre-marzo días fríos puntuales (uso esporádico). Total: ~4 meses año con uso variable. Esto justifica invertir en sistemas eficientes moderados (no premium), priorizar bajo consumo operativo (factura mensual controlada), y evitar sobredimensionamiento innecesario. Calefacción Sevilla debe ser práctica-económica, no lujo permanente como norte España.'
      }
    ],
    semanticOwnership: ['calefaccion', 'triana', 'sevilla', 'humedad-matinal', 'casas-patio', 'practico']
  },

  // Málaga Centro - Mild Winter Humidity Tourism Compact Efficient
  {
    serviceId: 'calefaccion',
    citySlug: 'malaga',
    districtSlug: 'centro',
    metadata: {
      title: 'Calefacción Centro Málaga | Invierno Suave y Apartamentos Turísticos',
      description: 'Calefacción en Centro Málaga. Invierno suave, humedad costera, apartamentos turísticos, calefacción compacta eficiente. Servicio 24h urgente.'
    },
    seoText: `Servicio adaptado calefacción para Centro malagueño donde invierno excepcionalmente suave y apartamentos turísticos numerosos requieren soluciones térmicas específicas clima mediterráneo costero. Instalamos calefacción eficiente dimensionada correctamente para inviernos Málaga donde temperaturas raramente bajan de 8-10°C evitando sobredimensionamiento típico instaladores sin experiencia climatología local, proporcionamos sistemas compactos versátiles apartamentos turismo que funcionan calefacción invierno-refrigeración verano maximizando utilidad anual equipos, y realizamos mantenimiento preventivo pre-temporada asegurando funcionamiento impecable durante meses ocupación turística invernal diciembre-febrero cuando huéspedes esperan confort moderno. Trabajamos en edificios turísticos Centro coordinando mantenimiento múltiples apartamentos unificadamente reduciendo costes operativos propietarios inversión, instalamos splits bomba calor inverter silenciosos que proporcionan calefacción eficiente sin ruido molesto huéspedes durante noche, y asesoramos sobre uso racional calefacción Málaga donde necesidad muy limitada permite estrategias ahorro mediante calefacción selectiva versus funcionamiento continuo innecesario. Solucionamos problemas humedad invernal costera apartamentos frente mar donde brisa marina húmeda combinada con calefacción insuficiente genera condensación ventanas-paredes requiriendo deshumidificación complementaria, coordinamos instalaciones urgentes apartamentos turismo con huéspedes activos realizando trabajos horarios convenientes sin interrumpir estancias, y ofrecemos contratos mantenimiento anual apartamentos turísticos con revisiones programadas períodos baja ocupación maximizando eficiencia operativa. Proporcionamos urgencias calefacción 24h Centro Málaga porque fallo térmico apartamento turístico huéspedes invierno afecta experiencia gravemente requiriendo solución inmediata profesional preservando reputación propiedad plataformas alquiler vacacional competitivo.`,
    faqs: [
      {
        question: '¿Es realmente necesaria calefacción en Centro Málaga con clima tan suave?',
        answer: 'Sí, aunque Málaga tiene invierno más suave España, noches diciembre-febrero bajan a 8-12°C (sensación 5-8°C con humedad costera). Apartamentos turísticos requieren confort moderno 20-22°C, residentes locales aprecian calefacción noches-madrugadas frías. Calefacción Málaga es necesidad real 2-3 meses año, pero dimensionarla correctamente (no sobredimensionar como interior frío) es clave eficiencia-coste.'
      },
      {
        question: '¿Qué sistema calefacción recomendáis para apartamentos turísticos Málaga?',
        answer: 'Apartamentos turísticos Málaga idealmente splits bomba calor inverter A+++ (frío verano + calor invierno, versátiles año completo). Ventajas: compactos ideales apartamentos pequeños, silenciosos <20dB noche (crítico huéspedes), eficientes A+++ (coste operativo bajo), operación simple termostato (cualquier huésped maneja sin dificultad), y fiabilidad alta minimiza incidencias durante ocupación. Marcas recomendadas: Daikin, Mitsubishi, Fujitsu gama media-turismo.'
      },
      {
        question: '¿Cómo gestionar humedad invernal en apartamentos frente mar Centro Málaga?',
        answer: 'Apartamentos frente mar Centro Málaga sufren humedad costera alta invierno 75-85%. Soluciones: splits inverter con deshumidificación automática modo calor (función incorporada modernos), ventilar 10min diarios renovando aire húmedo, evitar tender ropa interior sin ventilación, y deshumidificador portátil si humedad persistente >80%. Calefacción + deshumidificación = confort óptimo apartamento costero sin condensación-moho problemas frecuentes sin gestión adecuada.'
      }
    ],
    semanticOwnership: ['calefaccion', 'centro', 'malaga', 'invierno-suave', 'turismo', 'humedad']
  },

  // Zaragoza Universidad - Student Cold Winter Economical Radiator Optimization
  {
    serviceId: 'calefaccion',
    citySlug: 'zaragoza',
    districtSlug: 'universidad',
    metadata: {
      title: 'Calefacción Universidad Zaragoza | Estudiantes y Ahorro Invernal',
      description: 'Calefacción en Universidad Zaragoza. Apartamentos estudiantes, invierno frío continental, radiadores eficientes, ahorro energético. Servicio 24h urgente.'
    },
    seoText: `Servicio orientado estudiantes y jóvenes profesionales en Universidad Zaragoza donde invierno continental frío y presupuestos ajustados requieren calefacción eficiente económica. Instalamos radiadores eléctricos bajo consumo con termostato programable en apartamentos alquiler estudiantes donde inversión inicial moderada y operación simple son prioritarias, asesoramos sobre optimización radiadores centralizados antiguos edificios universitarios mediante válvulas termostáticas permitiendo regulación individual temperatura sin modificar instalación comunitaria, y proporcionamos mantenimiento preventivo económico calderas gas apartamentos compartidos asegurando funcionamiento durante inviernos zaragozanos genuinamente fríos -5°C a 5°C frecuentes diciembre-febrero. Trabajamos con propietarios apartamentos alquiler estudiantes coordinando instalaciones-reparaciones calefacción respetando presupuestos ajustados sin comprometer calidad técnica necesaria, ofrecemos presupuestos transparentes escritos detallados para que inquilinos-propietarios comprendan exactamente coste inversión sin sorpresas posteriores, y realizamos urgencias calefacción prioritarias período exámenes enero-febrero porque fallo térmico pleno invierno zaragozano afecta rendimiento académico estudiantes gravemente. Asesoramos estudiantes Universidad sobre uso racional calefacción maximizando confort minimizando factura mediante temperatura moderada 19-20°C (confortable-saludable versus 23-24°C derrochadoras), programación termostato bajando temperatura ausencias-noche automáticamente ahorrando 25-30% consumo, y calefacción selectiva solo habitación ocupada versus calentar piso compartido completo innecesariamente. Proporcionamos soluciones purgado radiadores eliminando aire acumulado que reduce rendimiento significativamente optimizando calefacción existente sin coste adicional, recomendamos complementos económicos mejorando eficiencia térmica (burletes ventanas, cortinas gruesas, alfombras aislantes), y ofrecemos consejos prácticos estudiantes extranjeros primeros inviernos Zaragoza adaptándose frío continental muy diferente climas origen mediterráneos-tropicales.`,
    faqs: [
      {
        question: '¿Qué sistema de calefacción consume menos en apartamentos de estudiantes en Zaragoza Universidad?',
        answer: 'Para estudiantes Universidad Zaragoza opciones económicas: 1) Calefacción central comunitaria (más barato si incluida renta, sin control individual). 2) Radiadores eléctricos bajo consumo A++ con termostato programable (inversión 200-400€, consumo 40-70€/mes invierno uso racional). 3) Caldera gas individual condensación (si gas disponible, consumo 50-80€/mes, requiere mantenimiento anual). Clave ahorro: temperatura moderada 19-20°C, programación inteligente, solo estancias usadas.'
      },
      {
        question: '¿Cómo ahorrar en factura calefacción siendo estudiante en Zaragoza con invierno frío?',
        answer: 'Consejos prácticos ahorro estudiantes Universidad Zaragoza: temperatura 19-20°C (cada grado más = +7% consumo), programar termostato (16°C noche-ausencias, 20°C presencia), calentar solo tu habitación si piso compartido (cerrar puerta, no climatizar zonas comunes vacías), ventilar 5-10min máximo rápido (renovar sin enfriar muros), burletes ventanas-puertas (evita fugas aire frío), cortinas gruesas cerradas noche (retienen calor), y aprovechar sol diurno abriendo persianas sur. Ahorro combinado: 30-40% factura.'
      },
      {
        question: '¿Qué hacer si radiadores calientan poco en apartamento estudiantes Universidad?',
        answer: 'Radiadores tibios/fríos en Universidad Zaragoza: 1) Purgar aire acumulado (llave purgador pequeña, dejar salir aire hasta gotea agua, cerrar). 2) Verificar válvula termostática abierta completamente (girar máximo). 3) Limpiar polvo acumulado (reduce emisión térmica 15-20%). 4) Si persiste, caldera puede necesitar revisión presión-circulación. Purgado es mantenimiento básico estudiante puede hacer (video tutorial online). Si no mejora, avisar propietario/administrador arranjar profesionalmente.'
      }
    ],
    semanticOwnership: ['calefaccion', 'universidad', 'zaragoza', 'estudiantes', 'frio', 'economico']
  },

  // CALEFACCIÓN PHASE 2 — Enterprise Heating Semantic Expansion (11 districts)

  // Madrid Retiro — Family Residential Preventive Heating
  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    districtSlug: 'retiro',
    metadata: {
      title: 'Calefacción Retiro Madrid | Confort Familiar y Mantenimiento Preventivo',
      description: 'Servicio de calefacción en Retiro Madrid - radiadores, calderas, termostatos, mantenimiento preventivo residencial. Técnicos 24h para confort térmico familiar continuo.'
    },
    seoText: `En Retiro instalamos y mantenemos sistemas de calefacción residenciales que garantizan confort térmico familiar continuo durante todo el invierno madrileño. Esta zona residencial tranquila demanda calefacción fiable y eficiente para viviendas familiares amplias.

Especializados en mantenimiento preventivo de calderas antes del invierno, limpieza de circuitos hidráulicos, equilibrado de radiadores por habitaciones, y termostatos programables para optimizar consumo según horarios familia. Atendemos viviendas unifamiliares, pisos amplios con múltiples zonas térmicas, y edificios residenciales con calefacción central comunitaria.

En Retiro las familias valoran calefacción silenciosa, confort estable sin variaciones bruscas temperatura, y sistemas que no requieren intervención constante. Trabajamos calderas condensación alta eficiencia, radiadores aluminio diseño discreto, válvulas termostáticas por estancia, y bombas circulación inverter bajo ruido. Servicio disponible 24 horas para emergencias invierno.`,
    faqs: [
      {
        question: '¿El mantenimiento preventivo de caldera antes del invierno es realmente necesario en Retiro?',
        answer: 'Sí, mantenimiento preventivo caldera es esencial en Retiro Madrid. Revisión antes invierno incluye: limpieza intercambiador (acumulación calcio reduce rendimiento 20-30%), verificación presión circuito (óptimo 1.2-1.5 bar), purgado radiadores todas habitaciones, comprobación seguridades (termostato límite, detector llama), y análisis combustión (CO2 óptimo 8-9%). Previene averías en pleno invierno cuando familia necesita calefacción continuamente. Costo mantenimiento: 80-120€. Costo avería urgente 24h invierno: 200-350€. Inversión preventiva evita interrupciones confort familiar.'
      },
      {
        question: '¿Cómo equilibrar radiadores en vivienda familiar grande Retiro con zonas que calientan desigual?',
        answer: 'Equilibrado hidráulico en vivienda grande Retiro requiere ajuste proporcional llaves paso radiadores: 1) Identificar radiadores lejanos caldera (calientan poco) vs cercanos (calientan excesivo). 2) Cerrar parcialmente llaves radiadores cerca caldera (dejar 40-60% apertura). 3) Abrir completamente radiadores lejos caldera. 4) Dejar sistema funcionar 2-3h estabilizar. 5) Verificar temperatura uniforme +/- 1-2°C todas habitaciones. Equilibrado profesional con termómetro infrarrojo y medidor caudal: 120-180€. Resultado: confort uniforme, reducción consumo 10-15%, y eliminación habitaciones frías/sobrecalentadas.'
      },
      {
        question: '¿Qué termostato programable conviene familia Retiro con horarios escolares regulares?',
        answer: 'Familia Retiro con rutinas escolares regulares beneficia termostato programable semanal: temperatura 20-21°C mañanas 7-9h (preparación escolar), bajar 18°C durante día 9-17h (casa vacía), subir 21°C tardes-noches 17-23h (familia reunida), bajar 17-18°C madrugadas (dormitorios frescos descansa mejor). Fines semana programación diferente (familias permanecen más tiempo). Termostatos recomendados: Honeywell T4 semanal (60-80€), Netatmo inteligente WiFi (150-180€), Tado° control remoto smartphone (200-220€). Ahorro programación: 15-25% factura gas respecto temperatura constante 24h.'
      }
    ],
    semanticOwnership: ['calefaccion', 'retiro', 'madrid', 'familia', 'residencial', 'preventivo']
  },

  // Madrid Chamartín — Office Commercial Centralized Heating
  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    districtSlug: 'chamartin',
    metadata: {
      title: 'Calefacción Chamartín Madrid | Sistemas Centralizados y Oficinas',
      description: 'Calefacción Chamartín Madrid - edificios oficinas, sistemas centralizados alta capacidad, continuidad negocio invierno. Servicio técnico empresarial 24h.'
    },
    seoText: `En Chamartín atendemos calefacción centralizada de edificios de oficinas y espacios comerciales que requieren confort térmico continuo durante horario laboral completo invierno. Esta zona empresarial demanda sistemas alta capacidad y fiabilidad absoluta.

Especializados en calderas centralizadas gran volumen (150-500kW), distribución hidráulica multizona para plantas independientes, sistemas BMS integración control edificio, y mantenimiento preventivo programado fuera horario laboral. Atendemos torres oficinas modernas, edificios corporativos, centros negocios, y complejos comerciales.

En Chamartín edificios oficinas priorizan continuidad térmica horario completo (8-20h), zonificación independiente por plantas/empresas, y eficiencia energética certificaciones sostenibilidad. Trabajamos calderas condensación modulantes, bombas alta eficiencia IE3/IE4, válvulas motorizadas control zonas, y sistemas monitorización remoto. Contrato mantenimiento empresarial disponible. Emergencias 24h garantizadas.`,
    faqs: [
      {
        question: '¿La calefacción central de oficinas en Chamartín requiere mantenimiento preventivo antes del invierno?',
        answer: 'Absolutamente. Edificios oficinas Chamartín con calefacción centralizada gran capacidad requieren mantenimiento preventivo exhaustivo: limpieza completa intercambiadores calderas (acumulación suciedad reduce rendimiento 25-35%), revisión bombas circulación (rodamientos, estanqueidad), purgado completo circuitos todas plantas, verificación válvulas seguridad y expansión (evita sobrepresión), análisis combustión optimizado, y comprobación sistema BMS. Interrupción calefacción horario laboral afecta productividad 100+ empleados. Costo mantenimiento preventivo: 400-800€ según capacidad. Costo avería urgencia laboral: 1.000-2.500€. Preventivo es inversión obligada continuidad negocio.'
      },
      {
        question: '¿Cómo regular temperatura independiente por plantas en edificio oficinas Chamartín?',
        answer: 'Regulación independiente plantas edificio Chamartín requiere sistema zonificación hidráulica: válvulas motorizadas dos-tres vías en distribuidores cada planta, termostatos zona independientes (cada empresa/planta configura temperatura deseada 19-23°C), y colectores equilibrado caudal proporcional superficie. Sistema BMS gestiona demandas simultáneas optimizando rendimiento caldera. Instalación zonificación edificio 4-6 plantas: 3.000-6.000€ según complejidad. Beneficios: satisfacción térmica personalizada, reducción consumo 20-30% (no calentar plantas vacías/uso reducido), y facturación individualizada empresas.'
      },
      {
        question: '¿Qué hacer si caldera centralizada edificio Chamartín falla en pleno invierno laboral?',
        answer: 'Protocolo emergencia caldera oficinas Chamartín: 1) Llamar servicio técnico urgente 24h (empresarial prioridad). 2) Verificar si es fallo menor restablecible (presión baja rellenar circuito, reset seguridad térmica). 3) Si falla compleja (bomba, intercambiador, electrónica), técnico llega 1-2h con repuestos comunes. 4) Reparación in situ si posible (60-70% casos). 5) Si requiere pieza especial pedido (10-30% casos), instalación calefacción provisional portátil empresas (calentadores eléctricos industriales, generadores aire caliente) mientras llega repuesto 24-48h. Costo emergencia: 300-500€ desplazamiento + reparación. Contrato mantenimiento: prioridad absoluta, repuestos stock, backup garantizado.'
      }
    ],
    semanticOwnership: ['calefaccion', 'chamartin', 'madrid', 'oficinas', 'comercial', 'centralizada']
  },

  // Barcelona Gràcia — Artistic Old Apartment Heating Retrofits
  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    districtSlug: 'gracia',
    metadata: {
      title: 'Calefacción Gràcia Barcelona | Retrofits y Apartamentos Artísticos',
      description: 'Calefacción Gràcia Barcelona - edificios antiguos, retrofits térmicos, radiadores compactos, pisos bohemios. Soluciones calefacción respetuosas arquitectura histórica.'
    },
    seoText: `En Gràcia instalamos soluciones calefacción adaptadas a apartamentos antiguos bohemios y edificios principios siglo XX donde arquitectura singular requiere retrofits térmicos respetuosos. Este barrio artístico presenta desafíos únicos aislamiento deficiente y espacios irregulares.

Especializados en radiadores aluminio compactos alta emisión, calderas murales reducidas dimensiones sin obras invasivas, termostatos inalámbricos sin cableado aparente, y sistemas calefacción eléctrica infrarrojo donde no existe gas natural. Atendemos pisos reformados estilo industrial, estudios artistas techos altos, y viviendas compartidas comunidades creativas.

En Gràcia residentes valoran estética minimalista, instalación rápida sin obras prolongadas, y flexibilidad adaptación viviendas singulares. Trabajamos calefacción gas natural allí disponible, radiadores eléctricos bajo consumo donde no hay gas, y bombas calor splits versátiles frío-calor. Asesoramiento eficiencia térmica edificios antiguos humedad. Servicio 24 horas disponible invierno.`,
    faqs: [
      {
        question: '¿Qué calefacción instalar en piso antiguo Gràcia sin gas natural y aislamiento deficiente?',
        answer: 'Piso antiguo Gràcia sin gas y mal aislado opciones calefacción eléctrica eficiente: 1) Splits bomba calor inverter (más eficiente, 1kW eléctrico = 3-4kW térmicos, inversión 800-1.500€ instalado). 2) Radiadores eléctricos bajo consumo programables (flexibles por habitación, 200-400€ cada uno). 3) Paneles radiantes infrarrojos (calientan objetos no aire, sensación inmediata, 300-600€). Para piso mal aislado priorizar: mejorar ventanas (burletes, doble vidrio), cortinas térmicas (retienen 25-30% más calor), y calentar solo habitaciones usadas (no climatizar todo piso). Consumo split bomba calor: 40-70€/mes. Radiadores eléctricos: 60-100€/mes. Paneles infrarrojo: 50-80€/mes.'
      },
      {
        question: '¿Cuánto cuesta modernizar calefacción radiadores fundición antiguos Gràcia a aluminio eficiente?',
        answer: 'Modernización radiadores fundición a aluminio piso Gràcia: radiadores aluminio emiten 15-25% más calor mismo tamaño, calientan más rápido (inercia baja), y pesan 60% menos (instalación sencilla). Costo modernización piso 70-90m² (5-6 radiadores): radiadores aluminio nuevos 800-1.400€, mano obra desmontaje-montaje 400-600€, ajuste válvulas termostáticas 200-300€. Total: 1.400-2.300€. Beneficios: confort más rápido (calientan 30-40% antes), ahorro consumo 10-20%, y estética moderna minimalista. Alternativa económica: mantener radiadores fundición pero añadir válvulas termostáticas programables mejorando control (300-500€ total).'
      },
      {
        question: '¿Cómo combatir humedad condensación invierno piso antiguo Gràcia con calefacción insuficiente?',
        answer: 'Condensación invierno pisos antiguos Gràcia ocurre cuando aire frío exterior toca paredes frías interiores + humedad interior (cocinar, duchar, respirar). Soluciones combinadas: 1) Mejorar calefacción potencia adecuada (mínimo 80-100W/m²). 2) Ventilar correctamente: 10min mañana ventilación cruzada rápida (renueva aire sin enfriar muros). 3) Termostato higrostático (activa calefacción si humedad >65%). 4) Aislamiento térmico puntual (interior paredes norte/exteriores con placa XPS 3-4cm). 5) Extractor baño-cocina obligatorio. Inversión mejoras anti-condensación: 800-1.500€. Resultado: elimina moho, protege salud respiratoria, y preserva vivienda.'
      }
    ],
    semanticOwnership: ['calefaccion', 'gracia', 'barcelona', 'antiguo', 'bohemio', 'retrofit']
  },

  // Barcelona Sants — Dense Affordable Practical Radiator Optimization
  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    districtSlug: 'sants',
    metadata: {
      title: 'Calefacción Sants Barcelona | Radiadores y Eficiencia Práctica',
      description: 'Calefacción Sants Barcelona - apartamentos densos, optimización radiadores, calefacción práctica económica. Técnicos especializados en eficiencia térmica asequible.'
    },
    seoText: `En Sants proporcionamos servicios calefacción prácticos y económicos para apartamentos densos y edificios residenciales donde familias buscan confort invierno sin disparar factura gas. Esta zona popular demanda soluciones térmicas eficientes accesibles.

Especializados en optimización radiadores existentes mediante válvulas termostáticas, purgado completo circuitos, equilibrado hidráulico entre habitaciones, y calderas condensación sustituyendo atmosféricas antiguas (ahorro 20-30% garantizado). Atendemos pisos compartidos, viviendas familias numerosas, y edificios calefacción central comunitaria.

En Sants residentes priorizan relación calidad-precio, ahorro factura gas mensual, y soluciones prácticas mantenimiento sencillo. Trabajamos materiales fiables calidad-precio óptima, evitamos sobrecostos innecesarios, y explicamos funcionamiento permitiendo auto-mantenimiento básico (purgado, presión). Financiación sustitución calderas disponible. Servicio urgencias 24h invierno.`,
    faqs: [
      {
        question: '¿Cuánto ahorro real supone cambiar caldera antigua atmosférica Sants por condensación moderna?',
        answer: 'Sustitución caldera atmosférica antigua (rendimiento 70-80%) por condensación moderna (rendimiento 95-105%) en Sants genera ahorro real: consumo gas reducción 20-30%. Ejemplo familia 90m² consumo actual 1.200€/año: ahorro 240-360€/año. Costo caldera condensación instalada: 1.800-2.800€ según marca. Amortización: 5-8 años. Además, calderas nuevas incluyen termostato programable, seguridades modernas, y reducción averías. Subvenciones ayuntamiento Barcelona calderas eficientes: 200-400€. Plan Renove estatal: hasta 600€ adicionales. Ahorro neto inversión: recuperación 4-6 años, luego beneficio puro 20-25 años vida útil.'
      },
      {
        question: '¿Cómo reducir factura calefacción familia Sants sin inversión grande?',
        answer: 'Reducción factura calefacción Sants sin inversión costosa: 1) Instalar válvulas termostáticas radiadores (150-300€ total, ahorran 15-20% cerrando automático habitaciones vacías). 2) Termostato programable (50-120€, ahorra 10-15% bajando automático temperatura ausencias-noche). 3) Purgar radiadores (gratis DIY, mejora 5-10% eliminando aire interior). 4) Burletes puertas-ventanas (30-60€, evitan fugas calor). 5) Temperatura óptima 20-21°C día, 17-18°C noche (cada grado menos = 7% ahorro). 6) Reflectores radiadores (15-30€, reflejan calor interior habitación). Inversión total medidas: 250-500€. Ahorro combinado: 25-40% factura. Amortización: 1-2 años.'
      },
      {
        question: '¿Qué mantenimiento básico puede hacer familia Sants sin llamar técnico cada vez?',
        answer: 'Mantenimiento básico calefacción DIY familias Sants: 1) Purgar radiadores inicio invierno (llave purgador, dejar salir aire hasta gotea agua, cerrar. Video YouTube tutorial). 2) Rellenar presión caldera si baja <1 bar (llave llenado agua fría hasta alcanza 1.2-1.5 bar). 3) Limpiar polvo acumulado radiadores (aspirador, paño húmedo. Polvo reduce emisión 10-15%). 4) Verificar válvulas termostáticas funcionan (girar manualmente, no forzar). 5) Reset caldera si salta error (botón reset 3 segundos). 6) Comprobar piloto encendido visible. Tareas anuales técnico profesional obligadas: limpieza intercambiador, análisis combustión, verificación seguridades (80-120€/año). Autonomía mantenimiento básico ahorra 3-5 llamadas técnico anuales.'
      }
    ],
    semanticOwnership: ['calefaccion', 'sants', 'barcelona', 'practico', 'economico', 'ahorro']
  },

  // Barcelona Sarrià — Luxury Villa Premium Radiant Heating
  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    districtSlug: 'sarria',
    metadata: {
      title: 'Calefacción Sarrià Barcelona | Suelo Radiante y Confort Premium',
      description: 'Calefacción Sarrià Barcelona - villas luxury, suelo radiante hidráulico, termostatos inteligentes premium, confort térmico silencioso elegante. Servicio exclusivo 24h.'
    },
    seoText: `En Sarrià instalamos sistemas calefacción premium para villas y apartamentos lujo donde confort térmico sofisticado, diseño elegante invisible, y tecnología smart son prioritarios. Esta zona residencial alto standing demanda calefacción discreta máxima calidad.

Especializados en suelo radiante hidráulico instalación completa (calor uniforme sin elementos visibles), calderas condensación marca premium silenciosas, termostatos inteligentes Nest/Netatmo/Tado control smartphone, y sistemas híbridos aerotermia+

gas sostenibilidad energética. Atendemos villas unifamiliares jardín, dúplex premium diseño contemporáneo, y apartamentos lujo edificios exclusivos.

En Sarrià residentes valoran calefacción prácticamente insonora, estética minimalista sin radiadores aparentes, control remoto vacaciones, y eficiencia energética certificaciones sostenibilidad. Trabajamos marcas premium Vaillant/Viessmann/Junkers, instalación impecable acabados perfectos, y mantenimiento preventivo anual incluido contrato. Servicio técnico prioritario 24h disponible.`,
    faqs: [
      {
        question: '¿El suelo radiante mejora el confort en villas premium de Sarrià realmente?',
        answer: 'Absolutamente. Suelo radiante hidráulico en villas Sarrià ofrece confort superior vs radiadores: 1) Calor uniforme suelo a techo (elimina zonas frías, sensación térmica +2-3°C misma temperatura aire). 2) Confort pies descalzos (especialmente baños, dormitorios). 3) Estética invisible (sin radiadores en paredes, libertad decoración). 4) Silencio absoluto (sin bombas ruido, sin aire forzado). 5) Eficiencia mayor (trabaja 35-45°C vs radiadores 70-80°C, ahorra 15-25% gas). 6) Compatible aerotermia (bomba calor alta eficiencia). Inversión villa 200-300m²: 12.000-20.000€ instalación completa. Amortización: 8-12 años vía ahorro. Beneficio confort y valor propiedad: invaluable.'
      },
      {
        question: '¿Qué termostato inteligente conviene villa Sarrià con múltiples zonas térmicas?',
        answer: 'Villa Sarrià multizona (planta baja, planta superior, sótano/gimnasio, zona invitados) requiere sistema termostatos inteligentes coordinados: Nest Learning (Google, autoajusta patrones, 200€/unidad), Tado° (control por habitación, geolocalización ausencias, 150€ cabezal termostático + 200€ bridge), o Netatmo (Apple HomeKit, 180€ termostato + 80€ válvulas adicionales). Ventajas inteligentes: control smartphone remoto vacaciones, programación automática aprendizaje, geofencing (detecta salida/llegada casa ajustando temperatura), y estadísticas consumo. Sistema completo villa 4-5 zonas: 800-1.500€. Ahorro vs termostatos convencionales: 15-25% adicional optimización ausencias.'
      },
      {
        question: '¿Cuánto cuesta mantenimiento anual calefacción villa premium Sarrià?',
        answer: 'Mantenimiento anual completo villa premium Sarrià incluye: revisión exhaustiva caldera condensación (limpieza intercambiador, análisis combustión, verificación seguridades), comprobación circuitos suelo radiante (presión, purga colectores, válvulas), verificación bombas circulación eficiencia, ajuste termostatos inteligentes, y limpieza filtros sistema. Costo mantenimiento villa 200-300m²: 180-280€/año según complejidad. Contrato mantenimiento premium incluye: visita anual, prioridad urgencias 24h (tiempo respuesta <3h), repuestos comunes stock, y revisión adicional gratuita si incidencia. Inversión preventiva evita averías costosas (reparación urgente bomba: 400-800€, caldera: 300-600€).'
      }
    ],
    semanticOwnership: ['calefaccion', 'sarria', 'barcelona', 'premium', 'lujo', 'radiante']
  },

  // Valencia Campanar — Family Community Centralized Optimization
  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    districtSlug: 'campanar',
    metadata: {
      title: 'Calefacción Campanar Valencia | Comunidades y Eficiencia Familiar',
      description: 'Calefacción Campanar Valencia - comunidades vecinales, calefacción central optimizada, familias eficiencia térmica. Invierno suave mediterráneo dimensionamiento correcto.'
    },
    seoText: `En Campanar atendemos calefacción de comunidades residenciales familiares donde calefacción central compartida y eficiencia térmica suave invierno valenciano son prioritarios. Esta zona familiar demanda sistemas equilibrados consumo moderado.

Especializados en optimización calderas centralizadas comunitarias, contadores caloríficos individualizados por vivienda, equilibrado distribución hidráulica edificio, y dimensionamiento correcto evitando sobredimensionamiento típico instaladores sin experiencia clima mediterráneo. Atendemos edificios residenciales 20-50 viviendas, comunidades propietarios, y complejos familiares.

En Campanar comunidades valoran reparto justo costes según consumo real, confort suficiente invierno suave (raramente <5-8°C), y evitar desperdicio energético sobrecalentar. Trabajamos contadores caloríficos certificados, válvulas termostáticas viviendas independencia, y calderas modulantes adaptación demanda variable. Asesoramiento técnico juntas propietarios. Servicio comunidades 24h disponible.`,
    faqs: [
      {
        question: '¿Cómo individualizar consumo calefacción comunidad Campanar con caldera central compartida?',
        answer: 'Individualización consumo calefacción central Campanar requiere instalación contadores caloríficos: dispositivos electrónicos montados radiadores cada vivienda miden energía térmica consumida (kWh). Sistema incluye: contadores todos radiadores vivienda, módulo comunicación centralizado, y software reparto costes proporcional consumo real. Instalación comunidad 30 viviendas: 9.000-15.000€ (300-500€ por vivienda). Beneficios: pago justo según uso real (familias ausentes no subvencionan presentes), incentivo ahorro individual (cada familia controla gasto), reducción consumo total 15-30% (usuarios conscientes). Amortización colectiva: 4-7 años. Obligatorio edificios nuevos desde 2017.'
      },
      {
        question: '¿Qué potencia caldera central necesita edificio 40 viviendas Campanar para invierno valenciano suave?',
        answer: 'Dimensionamiento caldera central 40 viviendas Campanar (invierno suave mediterráneo raramente <5-8°C, no <0°C prolongado como Madrid/Zaragoza): potencia necesaria 250-350kW (65-90W/m² vs 100-120W/m² climas fríos). Error común instaladores: sobredimensionar usando tablas zona fría (400-500kW), resultando caldera trabajo intermitente ineficiente. Caldera correctamente dimensionada: funcionamiento modulante continuo 30-70% carga (máxima eficiencia condensación), arranques-paros reducidos (menor desgaste), y consumo optimizado. Consultor energético independiente recomendable calcular carga térmica real (400-600€). Inversión correcta inicial evita 20 años consumo excesivo.'
      },
      {
        question: '¿Cuántos meses año se usa calefacción realmente en Campanar Valencia?',
        answer: 'Uso real calefacción Campanar Valencia: 3-4 meses efectivos (diciembre-enero-febrero plenos, noviembre-marzo parciales días fríos puntuales). Invierno mediterráneo suave: temperatura media diurna 12-16°C, mínimas nocturnas 5-10°C. Días genuinamente fríos <5°C: 10-20 días/temporada. Familias usan calefacción: mañanas frías 7-9h preparación, tardes-noches 19-23h reunión familiar, y apagan durante día si soleado. Consumo anual familia 90m² Campanar: 400-700€ gas (vs 1.000-1.500€ Madrid/Zaragoza misma superficie). Estrategia eficiente: termostato programable horarios presencia, temperatura moderada 19-20°C suficiente, y aprovechar sol diurno (ganancia solar gratuita).'
      }
    ],
    semanticOwnership: ['calefaccion', 'campanar', 'valencia', 'comunidad', 'familia', 'central']
  },

  // Valencia Extramurs — Mixed Residential Commercial Compact Modernization
  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    districtSlug: 'extramurs',
    metadata: {
      title: 'Calefacción Extramurs Valencia | Modernización y Compacta Eficiente',
      description: 'Calefacción Extramurs Valencia - pisos mixtos, modernización compacta, radiadores eficientes, retrofits térmicos. Invierno mediterráneo dimensionamiento adecuado.'
    },
    seoText: `En Extramurs instalamos soluciones calefacción modernizadas para pisos mixtos residencial-comercial donde espacio reducido, eficiencia térmica, y adaptación edificios diversos son prioritarios. Esta zona dinámica demanda retrofits inteligentes clima mediterráneo suave.

Especializados en calderas murales compactas alta eficiencia, radiadores aluminio diseño contemporáneo máxima emisión mínimo espacio, termostatos programables ahorro energético, y mejoras aislamiento térmico ventanas-fachadas. Atendemos pisos jóvenes profesionales, estudios compactos, locales convertidos viviendas, y edificios rehabilitación térmica.

En Extramurs residentes valoran instalación rápida mínimas obras, estética moderna minimalista, y consumo ajustado invierno suave valenciano. Trabajamos soluciones gas natural allí disponible, splits bomba calor versátiles donde no hay gas, y mejoras eficiencia sin inversión excesiva. Asesoramiento subvenciones rehabilitación energética. Servicio técnico 24h invierno disponible.`,
    faqs: [
      {
        question: '¿Qué mejoras térmicas priorizar piso Extramurs con calefacción poco eficiente sin inversión grande?',
        answer: 'Mejoras eficiencia térmica piso Extramurs priorizadas presupuesto limitado: 1) Válvulas termostáticas radiadores (150-300€, ahorro 15-20% calentando solo estancias usadas). 2) Termostato programable (50-120€, ahorro 10-15% bajando temperatura ausencias-trabajo). 3) Burletes ventanas-puertas (30-80€, evitan fugas aire caliente). 4) Cortinas térmicas (100-200€, retienen 20-30% más calor noche). 5) Reflectores detrás radiadores (20-40€, reflejan calor interior habitación). 6) Purgar radiadores inicio temporada (gratis DIY). Inversión total: 350-740€. Ahorro combinado: 30-45% factura. Amortización: 1.5-2.5 años. Mejora grande (ventanas doble vidrio) solo si presupuesto mayor (2.000-4.000€, amortización 8-12 años).'
      },
      {
        question: '¿Conviene suelo radiante en piso pequeño Extramurs Valencia o mejor radiadores modernos?',
        answer: 'Piso pequeño Extramurs (60-80m²) radiadores aluminio modernos más conveniente vs suelo radiante: costo radiadores 1.200-2.000€ instalados vs suelo radiante 5.000-8.000€. Diferencia 3.500-6.000€ amortizaría 15-20 años solo vía ahorro energético (suelo radiante ahorra 15-20% vs radiadores buenos). Factores decisivos pro-radiadores: inversión menor, instalación 1-2 días sin obras grandes, reemplazo futuro sencillo, y suficiente invierno suave Valencia (suelo radiante óptimo climas fríos uso intenso). Suelo radiante justificable: vivienda nueva construcción (obra abierta, sin sobrecosto), invierno muy frío (>5 meses uso), o presupuesto holgado valorando confort pies máximo.'
      },
      {
        question: '¿Qué calefacción elegir para piso Extramurs sin gas natural disponible?',
        answer: 'Piso Extramurs sin gas natural opciones calefacción: 1) Split bomba calor inverter (más eficiente opción eléctrica: 1kW eléctrico = 3-4kW térmicos. Instalación 1 unidad dormitorio + 1 salón: 1.500-2.500€. Consumo invierno: 40-70€/mes. Ventaja adicional: aire acondicionado verano incluido). 2) Radiadores eléctricos bajo consumo programables (flexibilidad por habitación, inversión menor 800-1.200€ piso completo, consumo 60-100€/mes). 3) Acumuladores eléctricos tarifa nocturna (cargan calor noche tarifa valle, liberan día. Inversión 1.500-2.500€, consumo 50-80€/mes). Recomendación Valencia invierno suave: split bomba calor (eficiencia máxima + frío verano + inversión moderada). Evitar: calefacción eléctrica directa resistencias (consumo desorbitado).'
      }
    ],
    semanticOwnership: ['calefaccion', 'extramurs', 'valencia', 'compacto', 'mixto', 'modernizacion']
  },

  // Sevilla Nervión — Commercial Office Winter Comfort Continuity
  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    districtSlug: 'nervion',
    metadata: {
      title: 'Calefacción Nervión Sevilla | Oficinas y Continuidad Térmica',
      description: 'Calefacción Nervión Sevilla - oficinas comerciales, continuidad térmica laboral, sistemas centralizados, invierno suave andaluz. Servicio empresarial 24h.'
    },
    seoText: `En Nervión atendemos calefacción de oficinas y espacios comerciales donde continuidad térmica horario laboral, confort empleados, y eficiencia energética invierno suave sevillano son prioritarios. Esta zona comercial demanda fiabilidad absoluta sistemas dimensionados correctamente.

Especializados en calderas centralizadas edificios oficinas, sistemas zonificación por plantas-empresas, termostatos programables horario comercial 8-20h, y dimensionamiento adecuado invierno andaluz suave (evitar sobredimensionamiento desperdicio). Atendemos edificios oficinas modernas, centros negocios, locales comerciales, y espacios coworking.

En Nervión empresas valoran confort térmico empleados productividad, consumo ajustado invierno corto (3-4 meses), y mantenimiento preventivo fuera horario laboral. Trabajamos sistemas eficiencia energética certificaciones, control remoto BMS, y contratos mantenimiento empresarial garantía continuidad. Servicio técnico prioritario empresas 24h disponible.`,
    faqs: [
      {
        question: '¿Qué temperatura calefacción oficinas Nervión es óptima para productividad y ahorro?',
        answer: 'Temperatura óptima oficinas Nervión: 20-21°C (estudios productividad laboral muestran 20-22°C rango confort máximo concentración, <19°C reduce productividad frío, >23°C produce somnolencia). Normativa prevención riesgos laborales España recomienda 17-27°C, óptimo 20-21°C invierno. Estrategia ahorro: 21°C horario laboral 8-20h, bajar 16°C noche-fin semana (edificio vacío), inercia térmica edificios evita enfriado excesivo arranque matinal. Cada grado reducción temperatura = 7% ahorro gas. Ejemplo oficina 200m² Nervión: temperatura 21°C consumo 800€/temporada vs 23°C consumo 1.000€/temporada (diferencia 200€). Termostato programable semanal esencial optimización.'
      },
      {
        question: '¿Cuántos meses realmente se usa calefacción en oficinas Nervión Sevilla?',
        answer: 'Uso real calefacción oficinas Nervión: 3-4 meses efectivos (diciembre-enero-febrero continuos, noviembre-marzo días fríos puntuales). Invierno sevillano suave: temperatura media diurna 12-17°C, mínimas nocturnas 3-8°C. Días genuinamente fríos <5°C: 15-25 días/temporada. Oficinas climatizadas necesitan calefacción mañanas frías (edificio enfriado noche) y días nublados húmedos sensación térmica baja. Consumo anual oficina 150m² Nervión: 600-1.000€ gas (vs 1.500-2.500€ Madrid/Barcelona misma superficie). Error común: dimensionar calefacción para hipotéticos 0°C (ocurren 0-2 días/año) resulta sobrecapacidad ineficiente 95% temporada. Dimensionamiento correcto: temperatura diseño 3-5°C realista.'
      },
      {
        question: '¿Qué hacer si calefacción oficinas Nervión falla durante jornada laboral invierno?',
        answer: 'Protocolo emergencia calefacción oficinas Nervión jornada laboral: 1) Verificar fallo menor restablecible inmediato (presión baja rellenar circuito, termostato programación horario, reset seguridad caldera). 2) Llamar servicio técnico urgente empresarial (prioridad <2h). 3) Mientras llega técnico: cerrar puertas-ventanas conservar calor residual, redistribuir personal zonas más cálidas edificio, y evaluar gravedad (invierno sevillano suave permite continuar jornada sin calefacción 3-4h sin riesgo salud). 4) Técnico llega con repuestos comunes (60-70% reparaciones in situ inmediatas). 5) Fallos complejos: calefacción provisional portátil (calentadores eléctricos industriales) mientras llega pieza 24-48h. Contrato mantenimiento empresarial: prioridad absoluta + backup garantizado.'
      }
    ],
    semanticOwnership: ['calefaccion', 'nervion', 'sevilla', 'oficinas', 'comercial', 'continuidad']
  },

  // Sevilla Centro — Tourism Historic Compact Winter Heating
  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    districtSlug: 'centro',
    metadata: {
      title: 'Calefacción Centro Sevilla | Apartamentos Turísticos e Históricos',
      description: 'Calefacción Centro Sevilla - apartamentos turísticos, edificios históricos, calefacción compacta, invierno suave. Fiabilidad huéspedes, instalación respetuosa patrimonio.'
    },
    seoText: `En Centro Sevilla instalamos soluciones calefacción apartamentos turísticos y edificios históricos donde fiabilidad absoluta huéspedes, instalación respetuosa patrimonio arquitectónico, y dimensionamiento correcto invierno suave son prioritarios. Esta zona turística demanda sistemas compactos discretos.

Especializados en splits bomba calor silenciosos frío-calor (versátiles todo año), radiadores eléctricos programables sin obras gas, calefacción compacta dormitorios-baños apartamentos pequeños, y mantenimiento preventivo pre-temporada alta turística. Atendemos apartamentos turísticos casco histórico, viviendas vacacionales, casas-patio tradicionales, y edificios protegidos restricciones patrimoniales.

En Centro propietarios valoran sistemas automáticos sin intervención huéspedes, fiabilidad cero averías temporada alta, y estética discreta respetuosa arquitectura tradicional. Trabajamos instalación mínima impacto visual, control remoto propietario ausente, y servicio urgente 24h garantizado ocupación turística. Asesoramiento normativa apartamentos turísticos climatización.`,
    faqs: [
      {
        question: '¿Qué calefacción instalar apartamento turístico Centro Sevilla para satisfacción huéspedes invierno?',
        answer: 'Apartamento turístico Centro Sevilla calefacción ideal: split bomba calor inverter silencioso (calor invierno + frío verano, control remoto WiFi propietario, termostato automático huésped no manipula configuración, consumo moderado invierno suave sevillano). Instalación apartamento 50-70m² (1 unidad salón-dormitorio + 1 dormitorio adicional): 1.500-2.500€. Ventajas turístico: funcionamiento automático sin complicaciones huésped, fiabilidad tecnología inverter, climatización todo año sin equipos adicionales, y consumo eléctrico incluido tarifa plana sin sorpresas. Alternativa económica: radiadores eléctricos programables bajo consumo (800-1.200€), pero solo calor invierno (necesita AC verano aparte). Evitar: calefacción gas apartamentos turísticos (normativa restricciones seguridad, inspecciones anuales obligatorias).'
      },
      {
        question: '¿Cómo prevenir averías calefacción apartamento Centro Sevilla durante ocupación huéspedes?',
        answer: 'Prevención averías calefacción apartamento turístico Centro: 1) Mantenimiento preventivo pre-temporada alta octubre-noviembre (limpieza filtros split, verificación funcionamiento, recarga gas si necesario). 2) Sistemas sencillos automáticos (termostato fijo no manipulable, mando oculto propietario). 3) Instrucciones visuales claras huéspedes español-inglés (encendido/apagado básico, temperatura recomendada 21-22°C). 4) Monitorización remota consumo-funcionamiento (detectar anomalías antes queja huésped). 5) Servicio técnico urgente 24h contratado (<3h respuesta dentro temporada alta). 6) Backup plan: calentadores eléctricos portátiles almacén (solución mientras llega técnico). Inversión mantenimiento + monitorización: 150-300€/año. Costo avería temporada alta con huésped: 300-500€ + valoración negativa inapreciable.'
      },
      {
        question: '¿Edificio histórico protegido Centro Sevilla tiene restricciones instalar calefacción?',
        answer: 'Edificios históricos protegidos Centro Sevilla restricciones calefacción: prohibición modificar fachadas exteriores (unidades split exteriores requieren autorización especial Gerencia Urbanismo, ubicación discreta patio interior/trasera permitida), limitaciones abrir rozas muros originales (calefacción eléctrica sin gas preferible), y respeto estético elementos originales. Soluciones compatibles patrimonio: splits unidades exteriores patio interior ocultas, radiadores eléctricos sin instalación gas (evita tuberías), y bomba calor aerotermia azotea (centralizada, impacto visual nulo). Trámites: proyecto técnico + licencia obras patrimonio histórico (2-4 meses tramitación). Asesoramiento arquitecto especializado patrimonio recomendable (400-800€). Alternativa rápida: calefacción eléctrica portátil certificada (sin obras, sin licencias, inmediato).'
      }
    ],
    semanticOwnership: ['calefaccion', 'centro', 'sevilla', 'turistico', 'historico', 'compacto']
  },

  // Málaga Este — Coastal Winter Humidity Compact Efficient
  {
    serviceId: 'calefaccion',
    citySlug: 'malaga',
    districtSlug: 'este',
    metadata: {
      title: 'Calefacción Este Málaga | Humedad Costera y Eficiencia Invierno',
      description: 'Calefacción Este Málaga - humedad costera invernal, sistemas compactos eficientes, invierno excepcionalmente suave. Dimensionamiento correcto clima mediterráneo.'
    },
    seoText: `En Este Málaga proporcionamos soluciones calefacción adaptadas a humedad costera invernal y clima excepcionalmente suave donde dimensionamiento correcto, eficiencia térmica moderada, y control humedad son prioritarios. Esta zona costera demanda sistemas ajustados realidad mediterránea.

Especializados en splits bomba calor modo calor+deshumidificación (gestionan humedad 70-85% costera), radiadores compactos dimensionamiento prudente (evitar sobredimensionamiento desperdicio), calderas uso limitado 2-4 meses año, y termostatos higrostáticos control humedad+temperatura. Atendemos viviendas residenciales costeras, apartamentos vista mar, y pisos zonas húmedas proximidad litoral.

En Este residentes priorizan gestión humedad invernal sensación fría, calefacción uso limitado invierno brevísimo (raramente <8-10°C), y evitar inversión excesiva sistemas infrautilizados. Trabajamos equipos versátiles deshumidificación+calor, dimensionamiento realista no hipotético, y asesoramiento eficiencia adaptada clima. Servicio técnico 24h disponible temporada.`,
    faqs: [
      {
        question: '¿Por qué humedad invernal Málaga Este hace sentir más frío que temperatura real indica?',
        answer: 'Humedad costera Este Málaga invierno (70-85% HR típico) amplifica sensación fría: aire húmedo conduce calor corporal 25x más rápido que aire seco, haciendo sentir 15°C húmedos como 10-12°C secos. Además, humedad alta dificulta evaporación transpiración (mecanismo termorregulación cuerpo menos eficiente). Solución calefacción adaptada: split bomba calor modo simultáneo calor+deshumidificación (reduce humedad 70% a 50-55% confortable + calienta a 20-21°C. Sensación térmica mejora dramáticamente). Costo operación: 30-50€/mes invierno (diciembre-febrero). Beneficio adicional: previene condensación ventanas y moho paredes (humedad >65% + frío = condensación). Deshumidificación tan importante como calefacción zonas costeras.'
      },
      {
        question: '¿Cuánta potencia calefacción necesita realmente vivienda Este Málaga con invierno tan suave?',
        answer: 'Vivienda Este Málaga invierno suave (mínimas raramente <8-10°C, medias 12-16°C) necesita potencia moderada: 50-70W/m² (vs 100-120W/m² zonas frías Madrid/Zaragoza). Error común instaladores: aplicar tablas genéricas zonas frías resultando sobredimensionamiento 50-80% (calefacción 100-120W/m² funciona intermitente ineficiente clima suave). Ejemplo vivienda 90m²: potencia necesaria 4.5-6.3kW suficiente vs 9-10kW instaladores suelen proponer. Consecuencias sobredimensionamiento: inversión inicial excesiva, funcionamiento intermitente on-off (desgaste+ineficiencia), y consumo innecesario. Consultor energético independiente calcular carga térmica real clima malagueño: 300-500€. Inversión recuperada en equipos correctamente dimensionados.'
      },
      {
        question: '¿Split bomba calor frío-calor suficiente para calefacción Este Málaga o necesita radiadores gas adicionales?',
        answer: 'Split bomba calor inverter suficiente calefacción Este Málaga: invierno suave (uso 2-4 meses, temperaturas raramente <8°C) no justifica inversión caldera gas + radiadores (2.500-4.000€) cuando split cubre perfectamente necesidades (1.500-2.500€ + aire acondicionado verano incluido). Bomba calor eficiencia excelente temperaturas suaves (COP 3.5-4.5: 1kW eléctrico = 3.5-4.5kW térmicos). Solo climas <0°C prolongado justifican gas. Ventajas split Málaga: inversión menor, frío+calor integrado, eficiencia máxima clima suave, instalación rápida sin obras gas, y mantenimiento sencillo. Consumo invierno split 90m²: 35-60€/mes (diciembre-febrero). Consumo gas hipotético: 40-70€/mes + inversión inicial doble. Split imbatible coste-beneficio costas mediterráneas.'
      }
    ],
    semanticOwnership: ['calefaccion', 'este', 'malaga', 'costero', 'humedad', 'suave']
  },

  // Zaragoza Delicias — Family Economical Continental Efficiency
  {
    serviceId: 'calefaccion',
    citySlug: 'zaragoza',
    districtSlug: 'delicias',
    metadata: {
      title: 'Calefacción Delicias Zaragoza | Familias y Ahorro Continental',
      description: 'Calefacción Delicias Zaragoza - familias economía ajustada, radiadores optimizados, eficiencia continental fría. Ahorro energético invierno zaragozano genuino.'
    },
    seoText: `En Delicias proporcionamos soluciones calefacción económicas y eficientes para familias donde ahorro energético, confort suficiente invierno continental genuinamente frío, y relación calidad-precio son prioritarios. Este barrio familiar demanda sistemas prácticos accesibles.

Especializados en optimización radiadores calefacción central comunitaria mediante válvulas termostáticas, calderas individuales condensación sustituyendo antiguas (ahorro 25-35%), termostatos programables horarios familiares, y asesoramiento eficiencia térmica presupuestos ajustados. Atendemos pisos familias numerosas, viviendas comunidades propietarios, y apartamentos calefacción central incluida.

En Delicias familias priorizan factura gas controlada, temperatura agradable suficiente 19-21°C (no excesiva), y soluciones prácticas mantenimiento DIY básico. Trabajamos materiales fiables calidad-precio óptima, financiación calderas disponible, y formación auto-mantenimiento elemental (purgado, presión). Servicio urgencias 24h invierno. Asesoramiento subvenciones eficiencia energética.`,
    faqs: [
      {
        question: '¿Cómo reducir factura gas familia Delicias con invierno zaragozano frío sin pasar frío en casa?',
        answer: 'Reducción factura gas familia Delicias invierno frío manteniendo confort: 1) Temperatura óptima 19-20°C día / 17-18°C noche (cada grado menos = 7% ahorro. 20°C confortable vs 23°C desperdicio). 2) Termostato programable horarios (bajar ausencias-trabajo, subir presencia familiar. Ahorro 15-20%). 3) Válvulas termostáticas radiadores (calentar solo habitaciones usadas, cerrar dormitorios vacíos día. Ahorro 15-18%). 4) Purgar radiadores inicio invierno (eliminaaire acumulado mejora 8-12%). 5) Burletes ventanas-puertas (evitan fugas aire frío/caliente. Ahorro 10-15%). 6) Cortinas gruesas cerradas noche (retienen calor interior). 7) Reflectores detrás radiadores (reflejan calor interior habitación). Ahorro combinado: 35-50% factura. Familia 90m² Delicias: reducción 1.200€/año a 700-800€/año.'
      },
      {
        question: '¿Vale la pena cambiar caldera antigua Delicias por condensación moderna con ahorro Gobierno?',
        answer: 'Sustitución caldera antigua por condensación Delicias con subvención muy rentable: caldera atmosférica antigua (rendimiento 70-75%) vs condensación moderna (rendimiento 95-105%) ahorra 25-35% gas. Familia 100m² consumo actual 1.500€/año: ahorro 450-525€/año. Costo caldera condensación instalada: 2.200-3.200€. Subvenciones disponibles: Plan Renove Aragón calderas eficientes 400-800€ + Plan estatal 600-1.000€ adicionales familias renta media-baja. Costo neto inversión: 800-1.800€. Amortización: 2-4 años. Beneficios adicionales: mayor confort (modulación precisa temperatura), fiabilidad (tecnología nueva vs antigua 15-20 años), y reducción emisiones CO2. Inversión altamente rentable largo plazo.'
      },
      {
        question: '¿Cómo mantener calefacción familia Delicias sin llamar técnico constantemente ahorrando visitas?',
        answer: 'Mantenimiento básico calefacción DIY familias Delicias: 1) Purgar radiadores inicio temporada (llave purgador, abrir hasta sale agua sin aire, cerrar. Tutorial YouTube familias). 2) Rellenar presión caldera <1 bar (llave llenado agua fría hasta 1.2-1.5 bar alcanzado manómetro). 3) Limpiar polvo radiadores mensual (aspirador ranuras, paño húmedo exterior). 4) Verificar válvulas termostáticas giran suavemente (no forzar rotas). 5) Reset caldera si error (botón reset 5 segundos). 6) Comprobar piloto encendido visible. Tareas técnico profesional obligatorias anuales: limpieza intercambiador, análisis combustión, verificación seguridades (90-140€). Autonomía mantenimiento básico ahorra 4-6 visitas técnico innecesarias/año (60-80€ cada visita). Familias autosuficientes tareas simples ahorran 240-400€/año.'
      }
    ],
    semanticOwnership: ['calefaccion', 'delicias', 'zaragoza', 'familia', 'economico', 'continental']
  },

  // CALEFACCIÓN PHASE 3: Valencia L'Eixample
  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    districtSlug: 'leixample',
    metadata: {
      title: 'Calefacción L\'Eixample Valencia | Calderas y Radiadores 24h | Reparar24',
      description: 'Servicio técnico de calefacción en L\'Eixample Valencia. Reparación calderas, instalación radiadores, mantenimiento sistemas térmicos. Atención inmediata invierno valenciano.'
    },
    seoText: `Especialistas en calefacción para L'Eixample Valencia, donde los inviernos suaves requieren sistemas eficientes que funcionen perfectamente durante los meses fríos. Atendemos edificios modernistas y construcciones contemporáneas del distrito con soluciones adaptadas al clima mediterráneo: calderas de condensación optimizadas para uso estacional, radiadores de bajo consumo dimensionados para inviernos templados, y sistemas de calefacción central comunitaria. Nuestros técnicos conocen las particularidades térmicas de L'Eixample, desde la Gran Vía Marqués del Turia hasta Colón, ofreciendo mantenimiento preventivo antes de temporada fría, reparaciones urgentes cuando bajan temperaturas, e instalaciones que equilibran confort invernal con consumo moderado característico del clima valenciano mediterráneo.`,
    faqs: [
      {
        question: '¿Cuándo activar calefacción Eixample Valencia con clima mediterráneo suave?',
        answer: 'En L\'Eixample Valencia, clima mediterráneo con invierno suave (8-15°C típico), activar calefacción selectivamente: diciembre-febrero mañanas frías (<10°C), noches invierno (<12°C interiores incómodo), y días lluviosos fríos (sensación térmica baja). No necesario calefacción continua como clima continental. Uso intermitente ahorra hasta 60% vs uso permanente. Temperatura confortable: 19-20°C suficiente (vs 21-22°C climas fríos). Programar termostato: encender 6:00-9:00 mañana, apagar día soleado, reactivar 20:00-23:00 noche.'
      },
      {
        question: '¿Qué tipo caldera mejor Eixample Valencia con uso estacional limitado invierno?',
        answer: 'Para L\'Eixample Valencia, uso calefacción 3-4 meses/año, caldera mixta condensación (calefacción + ACS) ideal: 1) Eficiencia alta (rendimiento 95%+) compensa inversión incluso uso limitado. 2) ACS disponible todo año (amortiza equipo). 3) Modulación potencia adapta necesidad térmica variable clima mediterráneo. 4) Menor consumo gas vs caldera estándar ahorra 25-30% factura invierno. Potencia recomendada piso 80-100m² L\'Eixample: 24kW (suficiente invierno templado, evita sobredimensionar). Marcas fiables: Vaillant, Junkers, Saunier Duval adaptadas uso intermitente.'
      },
      {
        question: '¿Purgar radiadores Eixample Valencia si solo usados invierno pocos meses?',
        answer: 'Sí, purgar radiadores L\'Eixample antes primera activación invierno esencial aunque uso limitado: aire acumulado periodo inactivo (primavera-verano-otoño) reduce eficiencia 15-25%. Síntomas aire radiador: zonas frías superiores, ruidos burbujeo, calentamiento lento. Purga simple: llave purgador abre hasta sale agua sin burbujas, cierra. Realizar octubre-noviembre antes frío. Beneficios: calentamiento uniforme habitación, menor consumo gas (radiador eficiente trabaja menos tiempo), confort térmico óptimo desde primer uso invierno. DIY tutorial YouTube familias.'
      },
      {
        question: '¿Vale pena instalar termostato programable Eixample Valencia con invierno corto?',
        answer: 'Termostato programable Eixample Valencia altamente rentable precisamente por invierno corto uso intermitente: ahorro 20-30% factura gas vs manual (encender/apagar olvidos, temperatura excesiva innecesaria). Uso óptimo: programar horarios presencia familiar (mañana 6:00-9:00, noche 20:00-23:00), temperatura reducida ausencias/trabajo, apagado días templados soleados. Inversión termostato digital programable: 60-150€. Ahorro familia L\'Eixample invierno típico (factura 400-600€/temporada): 100-150€/año. Amortización: <2 años. Modelos WiFi permiten control remoto smartphone (ajustar temperatura desde trabajo).'
      }
    ],
    semanticOwnership: ['calefaccion', 'leixample', 'valencia', 'mediterraneo', 'estacional', 'intermitente']
  },

  // CALEFACCIÓN PHASE 3: Sevilla Macarena
  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    districtSlug: 'macarena',
    metadata: {
      title: 'Calefacción Macarena Sevilla | Reparación Calderas Invierno | Reparar24',
      description: 'Técnicos calefacción en Macarena, Sevilla. Servicio calderas, radiadores, instalaciones térmicas. Especialistas clima andaluz con inviernos suaves. Urgencias 24h.'
    },
    seoText: `Servicio técnico especializado en calefacción para el distrito Macarena de Sevilla, adaptado al clima andaluz con inviernos suaves pero húmedos donde la calefacción es necesaria estratégicamente. Atendemos desde el casco histórico hasta la zona norte del distrito, con soluciones térmicas eficientes para viviendas tradicionales sevillanas y edificaciones modernas: calderas de bajo consumo optimizadas para uso moderado invernal, sistemas de radiadores dimensionados para clima templado, y calefacción por suelo radiante en viviendas nuevas que aprovecha baja temperatura necesaria en Sevilla. Conocemos las necesidades específicas de Macarena, ofreciendo mantenimiento pre-invierno, reparaciones rápidas durante olas de frío que afectan Sevilla, e instalaciones que equilibran confort térmico con consumo moderado característico del clima mediterráneo continental andaluz.`,
    faqs: [
      {
        question: '¿Cuándo encender calefacción Macarena Sevilla con invierno andaluz templado húmedo?',
        answer: 'Macarena Sevilla, invierno templado (5-15°C) pero húmedo (sensación térmica más fría), encender calefacción selectivamente: enero-febrero mañanas <8°C, noches frías <10°C, y días lluviosos húmedos (humedad 70-85% intensifica frío percibido). No necesario calefacción permanente. Temperatura confortable: 18-19°C suficiente clima templado (ahorra gas vs 21°C). Uso típico: 2-3 meses/año intermitente. Programación inteligente: calentar solo mañanas-noches frías, apagar mediodías soleados (temperatura exterior 15-18°C confortable). Ahorro: 50-60% vs calefacción continua.'
      },
      {
        question: '¿Calefacción eléctrica mejor que gas Macarena Sevilla con poco uso invierno?',
        answer: 'Depende vivienda tipo y uso: calefacción eléctrica (radiadores aceite, paneles radiantes, bomba calor) ventajosa Macarena si: 1) Piso pequeño (<60m²) uso ocasional (ahorra inversión caldera gas). 2) Sin instalación gas natural (evita alta acometida). 3) Calentamiento rápido habitaciones individuales vs sistema central. PERO gas natural más económico uso medio-alto: caldera gas piso 80-100m² consumo invierno 300-400€/temporada vs eléctrico 500-700€. Opción óptima clima Sevilla: bomba calor inverter (frío/calor) amortiza doble uso. Split 2500W: 150-180€/invierno eficiente.'
      },
      {
        question: '¿Biomasa o pellets viable Macarena Sevilla con invierno corto uso limitado?',
        answer: 'Calefacción biomasa/pellets Macarena Sevilla generalmente NO rentable uso limitado: 1) Inversión alta estufa/caldera pellets (2.500-5.000€) vs caldera gas (1.200-2.500€). 2) Invierno corto Sevilla (uso 2-3 meses) amortización lenta (>10 años). 3) Almacenamiento pellets requiere espacio (viviendas tradicionales Macarena limitado). 4) Mantenimiento frecuente (limpieza cenizas, revisiones). MÁS viable: viviendas unifamiliares calefacción continua, o combinación estufa pellets salón + radiadores eléctricos dormitorios (flexibilidad). Ahorro combustible pellets vs gas marginal clima templado.'
      },
      {
        question: '¿Mantenimiento caldera Macarena Sevilla suficiente cada 2 años con poco uso?',
        answer: 'NO: mantenimiento caldera obligatorio ANUAL independiente uso (normativa seguridad). Macarena Sevilla, aunque uso 2-3 meses/año, revisión anual crítica: 1) Verificar quemador funcionamiento óptimo antes temporada. 2) Limpieza intercambiador (acumulación hollín reduce eficiencia uso estacional). 3) Comprobar seguridades (detector CO, válvula presión). 4) Análisis combustión rendimiento. Costo revisión: 80-120€/año. Mantenimiento preventivo evita averías invierno (técnico disponibilidad limitada alta demanda frío). Multas omitir revisión: 300-600€. Caldera sin mantenimiento anual: seguro hogar puede rechazar cobertura averías.'
      }
    ],
    semanticOwnership: ['calefaccion', 'macarena', 'sevilla', 'andaluz', 'templado', 'humedo']
  },

  // CALEFACCIÓN PHASE 3: Sevilla Sur
  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    districtSlug: 'sur',
    metadata: {
      title: 'Calefacción Sevilla Sur | Calderas y Sistemas Térmicos | Reparar24',
      description: 'Servicio calefacción distrito Sur Sevilla. Instalación y reparación calderas, radiadores, suelo radiante. Técnicos especializados clima andaluz. Disponibles 24 horas.'
    },
    seoText: `Técnicos especializados en calefacción para el distrito Sur de Sevilla, donde el clima andaluz templado requiere sistemas térmicos eficientes para los meses de invierno. Atendemos toda la zona sur, desde Bellavista hasta El Plantinar, con soluciones adaptadas a viviendas residenciales modernas y barriadas tradicionales: calderas de condensación dimensionadas para uso estacional moderado, instalaciones de radiadores de bajo consumo optimizados para clima templado, calefacción por suelo radiante en urbanizaciones nuevas, y sistemas centralizados en comunidades. Entendemos las necesidades específicas del Sur sevillano, donde los inviernos suaves pero húmedos requieren calefacción selectiva y eficiente, ofreciendo mantenimiento preventivo, reparaciones urgentes durante olas de frío, instalaciones que maximizan confort térmico minimizando consumo energético en clima mediterráneo continental.`,
    faqs: [
      {
        question: '¿Suelo radiante mejor que radiadores distrito Sur Sevilla con clima templado?',
        answer: 'Suelo radiante ventajas clima templado Sur Sevilla: 1) Funciona baja temperatura (30-35°C vs 60-70°C radiadores) = eficiencia 15-20% mayor invierno suave. 2) Calor uniforme confortable (evita estratificación aire caliente techo). 3) Sin elementos visibles (estética). 4) Inercia térmica aprovecha sol andaluz (apagar sistema conserva calor horas). PERO: inversión alta (60-80€/m² instalación) vs radiadores (25-40€/m²). Amortización: 15-20 años. Recomendado: vivienda nueva/reforma integral Sur. Radiadores suficientes vivienda existente uso moderado invierno. Híbrido: suelo salón + radiadores dormitorios.'
      },
      {
        question: '¿Cuánto gas consume caldera invierno típico Sur Sevilla familia media?',
        answer: 'Consumo gas caldera invierno Sur Sevilla (clima templado, uso 2-3 meses activo): familia 4 personas, piso 90-100m², caldera condensación eficiente, calefacción intermitente (mañanas/noches frías). Consumo estimado: diciembre-febrero 200-300m³ gas natural (tarifa 2024: 0,06-0,08€/kWh). Factura calefacción temporada: 250-400€ total. Desglose: 60% calefacción, 40% ACS invierno. Variables aumentan consumo: temperatura excesiva (22-23°C vs 19°C óptimo), ventanas aislamiento deficiente (fugas térmicas 30%), caldera antigua rendimiento bajo. Ahorro familia consciente: termostato programable, temperatura moderada, mantenimiento anual.'
      },
      {
        question: '¿Cambiar radiador hierro fundido antiguo por aluminio Sur Sevilla ahorra gas?',
        answer: 'Sí, sustitución radiadores hierro fundido por aluminio moderno ahorra energía clima Sur Sevilla: 1) Aluminio calienta rápido (inercia baja responde termostato preciso, evita sobrecalentamiento). 2) Menor volumen agua sistema (caldera calienta menos agua = arranque rápido). 3) Dimensionamiento optimizado clima templado (radiador sobredimensionado antiguo desperdicia). Ahorro estimado: 10-15% consumo gas. Inversión radiador aluminio instalado: 150-300€/unidad. Vivienda 90m² (6-7 radiadores): 1.200-1.800€ total. Amortización: 8-12 años ahorro gas. Adicional: estética moderna, válvulas termostáticas individuales (control temperatura habitación).'
      },
      {
        question: '¿Condensación techo paredes invierno Sur Sevilla problema calefacción insuficiente?',
        answer: 'Condensación invierno Sur Sevilla (humedad relativa alta 70-85%) causada: 1) Calefacción insuficiente (temperatura baja + humedad = punto rocío alcanzado superficies frías). 2) Ventilación inadecuada (humedad interior acumulada). 3) Aislamiento deficiente paredes exteriores (puentes térmicos fríos). 4) Producción humedad excesiva (cocinar, secar ropa interior). Solución: calefacción adecuada mantener 18-20°C, ventilación diaria 10-15 min (renovación aire expulsa humedad), extractor baño-cocina activo, evitar secar ropa radiadores (añade humedad). Si persiste: verificar aislamiento térmico vivienda, considerar deshumidificador zonas problemáticas (30-40€ eléctrico portátil).'
      }
    ],
    semanticOwnership: ['calefaccion', 'sur', 'sevilla', 'residencial', 'templado', 'eficiente']
  },

  // CALEFACCIÓN PHASE 3: Málaga Teatinos
  {
    serviceId: 'calefaccion',
    citySlug: 'malaga',
    districtSlug: 'teatinos',
    metadata: {
      title: 'Calefacción Teatinos Málaga | Calderas y Radiadores Costa del Sol | Reparar24',
      description: 'Servicio técnico calefacción en Teatinos, Málaga. Instalación calderas, reparación radiadores, mantenimiento sistemas térmicos. Especialistas clima mediterráneo costero.'
    },
    seoText: `Especialistas en calefacción para Teatinos, Málaga, donde el clima mediterráneo costero suave requiere sistemas térmicos eficientes para los escasos días fríos del año. Atendemos el distrito universitario y residencial de Teatinos con soluciones optimizadas para uso mínimo invernal: calderas mixtas de alta eficiencia que proporcionan ACS todo el año y calefacción ocasional en invierno, sistemas de radiadores dimensionados para clima costero templado, instalaciones de bomba de calor inverter que ofrecen versatilidad frío-calor, y calefacción individualizada por habitaciones para uso selectivo. Conocemos las particularidades de Teatinos, zona moderna con edificación contemporánea bien aislada, ofreciendo soluciones que equilibran el confort térmico ocasional con consumo energético mínimo, ideal para el clima privilegiado de la Costa del Sol donde la calefacción se usa 1-2 meses al año.`,
    faqs: [
      {
        question: '¿Necesario calefacción gas Teatinos Málaga con clima Costa Sol muy suave?',
        answer: 'Teatinos Málaga, clima mediterráneo costero muy suave (temperatura media invierno 12-17°C), calefacción necesaria pero uso MÍNIMO: enero-febrero mañanas frías <10°C, noches <12°C, días nublados viento levante (sensación fría). Opciones viables: 1) Caldera gas mixta (ACS prioritario + calefacción ocasional cuando necesario). 2) Bomba calor split inverter (frío verano prioritario + calor días fríos invierno). 3) Radiadores eléctricos bajo consumo habitaciones (uso puntual dormitorios noche).  Evitar: instalación calefacción gas exclusiva (inversión alta vs uso 1-2 meses). Calefacción eléctrica puntual suficiente clima Teatinos.'
      },
      {
        question: '¿Split bomba calor mejor inversión Teatinos Málaga que caldera gas uso mínimo?',
        answer: 'Bomba calor inverter (split aire acondicionado frío/calor) generalmente MÁS rentable Teatinos: 1) Uso prioritario: refrigeración verano Costa Sol (5-6 meses/año) amortiza inversión. 2) Calefacción invierno: función secundaria días fríos puntuales (eficiente hasta 0°C exterior). 3) Instalación: 800-1.500€ equipo 3.000W vs caldera gas 1.800-2.800€. 4) Sin mantenimiento anual obligatorio (vs caldera). 5) Control habitación individual (encender solo donde necesario). Consumo invierno bomba calor: 150-250€/temporada uso moderado. Caldera gas viable SI: vivienda grande (>100m²), familia numerosa (ACS alto consumo), o preferencia calor radiante vs aire.'
      },
      {
        question: '¿Edificio nuevo Teatinos con calefacción central comunitaria rentable clima Málaga?',
        answer: 'Calefacción central comunitaria Teatinos Málaga problemática clima muy suave: 1) Horarios fijos (mañana 7-10h, tarde 18-22h) no adaptables necesidad real variable clima. 2) Días templados 16-18°C: calefacción activa innecesaria (desperdicio). 3) Cuota fija mensual independiente uso (vecinos ausentes pagan igual). 4) Sin control temperatura individual vivienda. Alternativa óptima edificios nuevos Teatinos: calefacción-refrigeración individualizada bomba calor (cada vecino controla uso/gasto según necesidad). Edificio existente calefacción central: negociar comunidad reducción horarios invierno Málaga (vs ciudades frías), instalar termostatos corte individual viviendas.'
      },
      {
        question: '¿Calefacción invierno Teatinos Málaga sube mucho factura eléctrica familia típica?',
        answer: 'Impacto calefacción eléctrica (bomba calor/radiadores) factura invierno Teatinos: familia 4 personas, piso 85m², uso moderado 1-2 meses. Consumo adicional invierno: bomba calor inverter eficiente 150-250 kWh/mes (enero-febrero) vs verano sin calefacción. Incremento factura: 40-70€/mes temporada fría (total invierno: 80-140€). Radiadores eléctricos convencionales consumen 30-40% más (más costoso). Optimizar consumo: temperatura moderada 19-20°C (cada grado +7% consumo), calentar solo habitaciones usadas, aprovechar tarifa discriminación horaria (calentar valle nocturno más barato), y apagar días soleados templados (temperatura exterior confortable).'
      }
    ],
    semanticOwnership: ['calefaccion', 'teatinos', 'malaga', 'costero', 'minimo', 'ocasional']
  },

  // CALEFACCIÓN PHASE 3: Zaragoza Centro  
  {
    serviceId: 'calefaccion',
    citySlug: 'zaragoza',
    districtSlug: 'centro',
    metadata: {
      title: 'Calefacción Centro Zaragoza | Calderas Urgentes Cierzo | Reparar24',
      description: 'Servicio urgente calefacción Centro Zaragoza. Reparación calderas, radiadores, instalaciones térmicas. Especialistas clima continental aragonés con cierzo frío. 24 horas.'
    },
    seoText: `Servicio técnico especializado en calefacción para el Centro de Zaragoza, donde el clima continental aragonés con cierzo intenso genera inviernos fríos que requieren sistemas térmicos robustos y eficientes. Atendemos el casco histórico y centro urbano con soluciones adaptadas a edificios tradicionales y modernas comunidades: calderas de alta potencia para calefacción central dimensionadas para temperaturas bajo cero, radiadores eficientes diseñados para inviernos rigurosos continentales, sistemas de calefacción que compensan pérdidas térmicas por viento cierzo característico de Zaragoza, y reparaciones urgentes durante olas de frío ártico. Conocemos perfectamente las exigencias térmicas del Centro zaragozano, ofreciendo mantenimiento preventivo pre-invernal esencial, intervenciones rápidas cuando las temperaturas caen drásticamente con cierzo, e instalaciones que garantizan confort térmico constante durante los 4-5 meses de frío intenso del invierno aragonés continental.`,
    faqs: [
      {
        question: '¿Calefacción Centro Zaragoza suficiente 20°C o necesario más por frío cierzo?',
        answer: 'Centro Zaragoza, invierno continental frío (-2 a +8°C) con cierzo (viento 40-60 km/h intensifica sensación fría), temperatura confortable interior: 20-21°C adecuada SI vivienda bien aislada. Cierzo NO afecta interior directamente PERO aumenta pérdidas térmicas ventanas-fachadas exposición norte-noroeste. Compensación: 1) Temperatura 21°C zonas exposición cierzo (vs 19-20°C fachadas protegidas). 2) Cerrar persianas noche (barrera adicional frío). 3) Burletes ventanas (evitan infiltraciones aire frío cierzo). 4) Temperatura 22-23°C excesiva (cada grado +7% consumo gas innecesario). Termostato programable: 21°C día, 18°C noche (ahorra gas manteniendo confort).'
      },
      {
        question: '¿Cuánto tiempo caldera apagada Centro Zaragoza invierno antes tubería congela helada?',
        answer: 'Riesgo congelación tuberías Centro Zaragoza invierno crítico: temperaturas nocturnas 0 a -5°C frecuentes, cierzo intensifica frío. Calefacción apagada: tuberías instalación interior vivienda (protegidas) resisten 24-48 horas antes congelación SI temperatura exterior no extrema (<-5°C). Tuberías zonas riesgo: cámaras aire fachadas exteriores, patios interiores, trasteros sin calefacción. Prevención ausencias invierno: 1) Calefacción mínima 12-15°C permanente (antihielo protege tuberías). 2) Vaciar instalación agua si ausencia prolongada (abrir grifos, vaciar caldera). 3) Aislamiento térmico tuberías expuestas. Tubería congelada = rotura al descongelar (reparación 300-800€). Modo antihielo caldera consume mínimo vs coste reparación.'
      },
      {
        question: '¿Calefacción eléctrica viable Centro Zaragoza con invierno largo frío o solo gas?',
        answer: 'Centro Zaragoza, invierno largo (noviembre-marzo = 5 meses) y frío intenso, calefacción eléctrica generalmente NO económica uso continuo: radiadores eléctricos consumo alto (2.000W/unidad x 0,15€/kWh = costoso). Piso 80m² calefacción eléctrica invierno: 800-1.200€/temporada vs gas natural 400-600€ (caldera eficiente). Excepción viable: bomba calor aerotérmica inverter alta eficiencia (COP 3-4: produce 3-4 kW calor por 1 kW eléctrico consumido). Inversión bomba calor: 3.000-6.000€ (amortización 6-10 años ahorro vs gas). Gas natural opción óptima Centro viviendas conexión disponible: económico, fiable invierno riguroso, calor radiante confortable.'
      },
      {
        question: '¿Mantenimiento caldera Centro Zaragoza antes invierno evita averías altas demandas frío?',
        answer: 'Mantenimiento preventivo caldera octubre-noviembre Centro Zaragoza ESENCIAL: demanda técnicos pico diciembre-enero (ola frío, fallos calderas antiguas sin revisión) genera esperas 3-5 días (frío extremo mientras tanto). Revisión pre-invernal (80-120€): limpieza quemador-intercambiador (eficiencia óptima), verificación presión-vaso expansión, análisis combustión (rendimiento máximo antes uso intensivo 5 meses), comprobación seguridades. Caldera sin mantenimiento: riesgo fallo inicio invierno 40% mayor, eficiencia reducida 10-15% (consume más gas mismo calor). Programar revisión septiembre-octubre: disponibilidad técnicos inmediata, precio competitivo (vs diciembre alta demanda), caldera perfecta antes frío extremo.'
      }
    ],
    semanticOwnership: ['calefaccion', 'centro', 'zaragoza', 'continental', 'cierzo', 'frio']
  },

  // CALEFACCIÓN PHASE 3: Zaragoza San José
  {
    serviceId: 'calefaccion',
    citySlug: 'zaragoza',
    districtSlug: 'san-jose',
    metadata: {
      title: 'Calefacción San José Zaragoza | Calderas Invierno Continental | Reparar24',
      description: 'Técnicos calefacción San José, Zaragoza. Servicio calderas, radiadores, sistemas térmicos clima continental. Reparaciones urgentes invierno aragonés. Disponibles 24h.'
    },
    seoText: `Especialistas en calefacción para San José, Zaragoza, distrito residencial que enfrenta los rigores del invierno continental aragonés con temperaturas bajo cero y viento cierzo característico. Atendemos toda la zona de San José con soluciones térmicas robustas adaptadas a viviendas familiares y comunidades: calderas individuales y centralizadas de alta eficiencia dimensionadas para frío intenso prolongado, instalaciones de radiadores optimizados para calefacción continua invernal, sistemas de calefacción por suelo radiante en viviendas modernas que proporcionan confort uniforme, y reparaciones urgentes durante los meses críticos de invierno. Entendemos las necesidades específicas de San José, barrio residencial con edificación mayoritariamente familiar donde el confort térmico durante los 5 meses de frío es prioritario, ofreciendo mantenimiento preventivo, instalaciones eficientes energéticamente que reducen consumo de gas, reparaciones rápidas cuando el frío aprieta, garantizando calor confortable constante para familias del distrito durante todo el invierno aragonés.`,
    faqs: [
      {
        question: '¿Caldera condensación ahorra mucho San José Zaragoza con invierno largo uso intenso?',
        answer: 'San José Zaragoza, invierno largo intenso (5 meses uso continuo), caldera condensación ahorro significativo vs convencional: rendimiento 95-105% (condensación aprovecha calor latente) vs 75-85% (atmosférica antigua). Ahorro real: 20-30% consumo gas anual. Familia típica San José, vivienda 100m², consumo actual caldera antigua: 1.800€/año gas. Con condensación: 1.260-1.440€/año (ahorro 360-540€/año). Inversión caldera condensación instalada: 2.500-3.500€. Amortización: 5-8 años. Beneficios adicionales: modulación precisa temperatura (confort óptimo), menor mantenimiento (tecnología moderna fiable), emisiones CO2 reducidas. Invierno largo Zaragoza ideal amortizar inversión condensación.'
      },
      {
        question: '¿Cuánto gas consume calefacción familia San José Zaragoza invierno completo típico?',
        answer: 'Consumo gas calefacción San José Zaragoza invierno típico continental: familia 4 personas, vivienda unifamiliar/adosado 110-130m², caldera condensación eficiente, temperatura confort 20-21°C, noviembre-marzo (5 meses). Consumo estimado: 1.100-1.400 m³ gas natural/temporada. Desglose: diciembre-febrero (frío intenso) 65% consumo, noviembre-marzo (transición) 35%. Factura total invierno: 900-1.200€ (tarifa 2024: 0,06-0,08€/kWh). Variables incrementan consumo: aislamiento térmico deficiente (+30%), ventanas antiguas (+20%), temperatura excesiva 22-23°C (+15% cada grado), caldera antigua baja eficiencia (+25%). Optimización: termostato programable, temperatura moderada, mantenimiento anual.'
      },
      {
        question: '¿Sistema calefacción suelo radiante mejor radiadores tradicionales San José Zaragoza?',
        answer: 'Suelo radiante vs radiadores San José Zaragoza invierno riguroso: Suelo radiante ventajas: 1) Calor uniforme desde suelo (confort superior, pies calientes). 2) Funciona baja temperatura 35-40°C (eficiencia +15-20% vs radiadores 65-70°C). 3) Compatible caldera condensación (rendimiento óptimo baja temperatura). 4) Sin elementos visibles (estética, espacio libre). 5) Inercia térmica alta (conserva calor horas apagado). Desventajas: 1) Inversión alta 70-90€/m² instalación (vivienda 100m²: 7.000-9.000€) vs radiadores 3.500-5.000€. 2) Inercia = respuesta lenta cambios temperatura (vs radiadores rápidos). Recomendado: vivienda nueva/reforma integral San José. Radiadores adecuados vivienda existente (inversión menor).'
      },
      {
        question: '¿Vale pena cambiar caldera antigua 15 años San José Zaragoza por nueva eficiente?',
        answer: 'Caldera 15 años San José Zaragoza: sustitución altamente recomendable. Caldera antigua (rendimiento degradado 70-75%, fallos frecuentes, repuestos caros/descatalogados, seguridad reducida) vs condensación moderna (rendimiento 95-105%, fiabilidad tecnología actual, garantía 3-5 años, control digital preciso). Ahorro consumo gas: 25-35% = familia San José consumo actual 1.600€/año → nueva 1.040-1.200€/año (ahorro 400-560€/año). Inversión: caldera condensación instalada llave mano 2.800-3.800€. Amortización: 5-7 años ahorro gas. Beneficio adicional: tranquilidad invierno (evitar avería caldera antigua momento crítico frío extremo, técnico no disponible días). Financiación disponible: 48-60 meses sin intereses distribuidores.'
      }
    ],
    semanticOwnership: ['calefaccion', 'san-jose', 'zaragoza', 'residencial', 'familiar', 'riguroso']
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
