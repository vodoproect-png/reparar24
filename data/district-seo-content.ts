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
