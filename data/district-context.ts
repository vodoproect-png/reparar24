/**
 * District Semantic Context System
 * 
 * Provides semantic differentiation for district-level pages.
 * Each district has unique characteristics that affect service needs,
 * problems, and local expertise requirements.
 * 
 * This enables meaningful content variation to avoid thin-content penalties.
 */

export type BuildingType = 'historic' | 'modern' | 'mixed' | 'residential' | 'commercial'
export type DistrictDensity = 'very-high' | 'high' | 'medium' | 'low'
export type EmergencyFrequency = 'very-high' | 'high' | 'medium' | 'low'

export interface DistrictContext {
  districtId: string
  cityId: string
  
  // Physical characteristics
  buildingType: BuildingType
  avgBuildingAge: 'new' | 'modern' | 'old' | 'historic' | 'mixed'
  density: DistrictDensity
  
  // Service characteristics
  emergencyFrequency: EmergencyFrequency
  commonProblems: string[]
  infrastructureAge: 'new' | 'modern' | 'aging' | 'old' | 'mixed'
  
  // Semantic traits for content generation
  traits: string[]
  
  // Service-specific contexts
  plumbingContext?: {
    commonIssues: string[]
    specialConsiderations: string[]
    urgencyLevel: 'high' | 'medium' | 'low'
  }
  
  electricalContext?: {
    commonIssues: string[]
    specialConsiderations: string[]
    urgencyLevel: 'high' | 'medium' | 'low'
  }
  
  drainageContext?: {
    commonIssues: string[]
    specialConsiderations: string[]
    urgencyLevel: 'high' | 'medium' | 'low'
  }
  
  heatingContext?: {
    commonIssues: string[]
    specialConsiderations: string[]
    urgencyLevel: 'high' | 'medium' | 'low'
  }
}

/**
 * District context database for semantic differentiation
 */
export const districtContexts: DistrictContext[] = [
  // ============================================
  // MADRID DISTRICTS
  // ============================================
  
  {
    districtId: 'centro',
    cityId: 'madrid',
    buildingType: 'mixed',
    avgBuildingAge: 'old',
    density: 'high',
    emergencyFrequency: 'very-high',
    commonProblems: [
      'Tuberías antiguas con fugas frecuentes',
      'Sistemas eléctricos sobrecargados',
      'Atascos recurrentes en edificios antiguos',
      'Instalaciones de gas antiguas'
    ],
    infrastructureAge: 'old',
    traits: [
      'zona centro histórico',
      'edificios antiguos',
      'alta densidad residencial',
      'comercio intenso',
      'urgencias frecuentes'
    ],
    plumbingContext: {
      commonIssues: [
        'Fugas en tuberías de plomo antiguas',
        'Baja presión de agua en edificios altos',
        'Corrosión en instalaciones antiguas',
        'Problemas de saneamiento en edificios históricos'
      ],
      specialConsiderations: [
        'Edificios protegidos con restricciones de obra',
        'Espacios reducidos dificultan acceso',
        'Coordinación con comunidades de vecinos necesaria'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Instalaciones sin toma de tierra',
        'Cuadros eléctricos obsoletos',
        'Saltos frecuentes del diferencial',
        'Cableado antiguo que no cumple normativa actual'
      ],
      specialConsiderations: [
        'Necesidad de actualización a normativa vigente',
        'Limitaciones de potencia en edificios antiguos',
        'Certificados eléctricos obligatorios'
      ],
      urgencyLevel: 'high'
    },
    drainageContext: {
      commonIssues: [
        'Atascos por acumulación de residuos',
        'Arquetas antiguas colapsadas',
        'Malos olores por saneamiento deficiente',
        'Tuberías de pequeño diámetro saturadas'
      ],
      specialConsiderations: [
        'Difícil acceso a redes generales',
        'Necesidad de inspección con cámara',
        'Posibles afecciones a otros vecinos'
      ],
      urgencyLevel: 'high'
    },
    heatingContext: {
      commonIssues: [
        'Calderas antiguas con bajo rendimiento',
        'Termostatos y programación obsoletos',
        'Radiadores con fugas o aire',
        'Instalaciones de gas sin revisar'
      ],
      specialConsiderations: [
        'Necesidad de certificado de gas',
        'Revisiones obligatorias de calderas',
        'Espacios limitados para instalaciones modernas'
      ],
      urgencyLevel: 'medium'
    }
  },
  
  {
    districtId: 'salamanca',
    cityId: 'madrid',
    buildingType: 'historic',
    avgBuildingAge: 'old',
    density: 'high',
    emergencyFrequency: 'high',
    commonProblems: [
      'Problemas en edificios señoriales antiguos',
      'Instalaciones de alta gama que requieren especialización',
      'Tuberías de plomo en edificios históricos',
      'Sistemas de calefacción central complejos'
    ],
    infrastructureAge: 'aging',
    traits: [
      'zona residencial de alto standing',
      'edificios señoriales',
      'instalaciones de calidad',
      'clientes exigentes',
      'mantenimiento preventivo importante'
    ],
    plumbingContext: {
      commonIssues: [
        'Sustitución de plomo por cobre o PEX',
        'Modernización de baños manteniendo estética',
        'Problemas de presión en áticos',
        'Fugas ocultas en paredes gruesas'
      ],
      specialConsiderations: [
        'Clientes exigen acabados de alta calidad',
        'Trabajos con mínimo impacto visual',
        'Marcas premium y garantías extendidas',
        'Respeto por elementos arquitectónicos originales'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Actualización de potencia para electrodomésticos modernos',
        'Instalación domótica en edificios antiguos',
        'Climatización de alto consumo',
        'Iluminación LED compatible con instalaciones antiguas'
      ],
      specialConsiderations: [
        'Boletines eléctricos y certificaciones obligatorias',
        'Instalaciones empotradas sin afectar decoración',
        'Protecciones diferenciales y magnetotérmicas premium'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Atascos en bajantes antiguas',
        'Problemas de olores en saneamiento horizontal',
        'Obstrucciones por obras de reforma',
        'Mantenimiento de arquetas comunitarias'
      ],
      specialConsiderations: [
        'Uso de técnicas no invasivas (sin obra)',
        'Inspección con cámara previa',
        'Limpieza preventiva recomendada'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calderas de condensación en edificios antiguos',
        'Sistemas de calefacción central con contadores',
        'Radiadores de diseño que requieren ajuste específico',
        'Termostatos inteligentes mal configurados'
      ],
      specialConsiderations: [
        'Eficiencia energética clase A obligatoria',
        'Certificados de gas al día',
        'Mantenimiento anual imprescindible'
      ],
      urgencyLevel: 'medium'
    }
  },
  
  {
    districtId: 'chamberi',
    cityId: 'madrid',
    buildingType: 'mixed',
    avgBuildingAge: 'mixed',
    density: 'high',
    emergencyFrequency: 'high',
    commonProblems: [
      'Reformas en pisos antiguos',
      'Problemas de vecindad por instalaciones compartidas',
      'Atascos en cocinas por grasa acumulada',
      'Aire acondicionado en edificios sin preinstalación'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'zona residencial familiar',
      'edificios en reforma continua',
      'mezcla de antiguo y moderno',
      'comunidades activas',
      'mantenimiento regular necesario'
    ],
    plumbingContext: {
      commonIssues: [
        'Adaptación de fontanería en reformas integrales',
        'Problemas de presión por reformas de vecinos',
        'Grifería termostática que requiere ajuste',
        'Fugas post-reforma por mala ejecución'
      ],
      specialConsiderations: [
        'Coordinación con comunidad de vecinos',
        'Horarios de trabajo restringidos',
        'Permisos de obra necesarios',
        'Revisión de toda la vertical de bajantes'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Cuadros eléctricos insuficientes para demanda actual',
        'Saltos de luz por electrodomésticos modernos',
        'Instalación de puntos de recarga para vehículos',
        'Iluminación empotrada en reformas'
      ],
      specialConsiderations: [
        'Actualización de potencia contratada',
        'Diferenciales y magnetotérmicos adecuados',
        'Toma de tierra en edificios antiguos'
      ],
      urgencyLevel: 'high'
    },
    drainageContext: {
      commonIssues: [
        'Atascos en fregaderos por grasa',
        'Bajantes comunitarias atascadas',
        'Malos olores en baños reformados',
        'Sifones secos por poco uso (segundas residencias)'
      ],
      specialConsiderations: [
        'Inspección de red comunitaria',
        'Educación sobre uso correcto',
        'Mantenimiento preventivo trimestral'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calderas individuales en edificios con central',
        'Radiadores que no calientan uniformemente',
        'Termostatos programables mal configurados',
        'Suelo radiante en reformas'
      ],
      specialConsiderations: [
        'Revisión anual de calderas obligatoria',
        'Optimización de consumo energético',
        'Certificación energética en reformas'
      ],
      urgencyLevel: 'medium'
    }
  },
  
  {
    districtId: 'retiro',
    cityId: 'madrid',
    buildingType: 'residential',
    avgBuildingAge: 'mixed',
    density: 'medium',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Mantenimiento de viviendas familiares',
      'Problemas estacionales (calefacción/AC)',
      'Jardines comunitarios con riego',
      'Piscinas comunitarias'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'zona residencial tranquila',
      'viviendas familiares',
      'mantenimiento preventivo',
      'zonas verdes',
      'servicios programados'
    ],
    plumbingContext: {
      commonIssues: [
        'Sistemas de riego automático',
        'Mantenimiento de piscinas comunitarias',
        'Calentadores de agua dimensionados para familias',
        'Grifería de jardín y exteriores'
      ],
      specialConsiderations: [
        'Mantenimiento estacional importante',
        'Revisiones preventivas recomendadas',
        'Servicios programados con antelación'
      ],
      urgencyLevel: 'low'
    },
    electricalContext: {
      commonIssues: [
        'Iluminación de jardines y zonas comunes',
        'Cuadros de piscina y filtración',
        'Instalaciones de riego automático',
        'Videoporteros y sistemas de seguridad'
      ],
      specialConsiderations: [
        'Instalaciones exteriores con protección IP',
        'Automatización de zonas comunes',
        'Eficiencia energética en iluminación'
      ],
      urgencyLevel: 'low'
    },
    drainageContext: {
      commonIssues: [
        'Mantenimiento de arquetas de jardín',
        'Desagües de terrazas y balcones',
        'Atascos por hojas y vegetación',
        'Sistema de drenaje de piscinas'
      ],
      specialConsiderations: [
        'Limpieza preventiva antes de lluvias',
        'Inspección de red exterior',
        'Mantenimiento trimestral recomendado'
      ],
      urgencyLevel: 'low'
    },
    heatingContext: {
      commonIssues: [
        'Calderas de gran capacidad para viviendas amplias',
        'Termostatos por zonas',
        'Suelo radiante en viviendas modernas',
        'Integración con sistemas domóticos'
      ],
      specialConsiderations: [
        'Programación eficiente por zonas',
        'Mantenimiento preventivo anual',
        'Optimización de consumo familiar'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'chamartin',
    cityId: 'madrid',
    buildingType: 'modern',
    avgBuildingAge: 'modern',
    density: 'medium',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Sistemas modernos con tecnología compleja',
      'Domótica y automatización',
      'Instalaciones de climatización avanzadas',
      'Garajes con puntos de recarga'
    ],
    infrastructureAge: 'new',
    traits: [
      'zona moderna',
      'tecnología avanzada',
      'edificios nuevos',
      'instalaciones eficientes',
      'servicios especializados'
    ],
    plumbingContext: {
      commonIssues: [
        'Grifería electrónica y termostática',
        'Sistemas de descalcificación',
        'Instalaciones de aerotermia',
        'Fontanería empotrada con accesos limitados'
      ],
      specialConsiderations: [
        'Conocimiento de marcas premium',
        'Configuración de sistemas electrónicos',
        'Mantenimiento especializado'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Domótica KNX o similar',
        'Puntos de recarga para vehículos eléctricos',
        'Paneles solares y gestión energética',
        'Sistemas de climatización inverter'
      ],
      specialConsiderations: [
        'Certificación en sistemas específicos',
        'Integración con automatización',
        'Actualizaciones de firmware'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Desagües con sifones anti-olores',
        'Sistemas de recogida de aguas pluviales',
        'Bajantes con insonorización',
        'Muy pocos problemas por instalación moderna'
      ],
      specialConsiderations: [
        'Mantenimiento preventivo simple',
        'Garantías de construcción activas',
        'Revisión de sifones evaporados'
      ],
      urgencyLevel: 'low'
    },
    heatingContext: {
      commonIssues: [
        'Calderas de condensación eficientes',
        'Suelo radiante con control por app',
        'Aerotermia y bombas de calor',
        'Integración con domótica'
      ],
      specialConsiderations: [
        'Configuración de sistemas inteligentes',
        'Optimización energética avanzada',
        'App y control remoto'
      ],
      urgencyLevel: 'low'
    }
  },
  
  // ============================================
  // BARCELONA DISTRICTS
  // ============================================
  
  {
    districtId: 'ciutat-vella',
    cityId: 'barcelona',
    buildingType: 'historic',
    avgBuildingAge: 'historic',
    density: 'very-high',
    emergencyFrequency: 'very-high',
    commonProblems: [
      'Edificios históricos con instalaciones precarias',
      'Pisos turísticos con uso intensivo',
      'Humedades por proximidad al mar',
      'Instalaciones muy antiguas sin actualizar'
    ],
    infrastructureAge: 'old',
    traits: [
      'casco histórico',
      'edificios medievales',
      'turismo intenso',
      'trabajo con protección patrimonio',
      'urgencias constantes'
    ],
    plumbingContext: {
      commonIssues: [
        'Tuberías de plomo en edificios medievales',
        'Humedades estructurales crónicas',
        'Saneamiento deficiente en calles estrechas',
        'Baja presión generalizada'
      ],
      specialConsiderations: [
        'Protección de patrimonio histórico',
        'Difícil acceso con vehículos',
        'Necesidad de andamios y permisos especiales',
        'Coordinación con Patrimonio de la Generalitat'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Instalaciones sin actualizar desde hace décadas',
        'Cuadros eléctricos fuera de normativa',
        'Cableado expuesto en fachadas antiguas',
        'Potencia insuficiente para uso moderno'
      ],
      specialConsiderations: [
        'Normativa especial en edificios protegidos',
        'Instalaciones vistas respetando estética',
        'Certificaciones obligatorias estrictas'
      ],
      urgencyLevel: 'high'
    },
    drainageContext: {
      commonIssues: [
        'Red de saneamiento antigua colapsada',
        'Atascos frecuentes en edificios sin renovar',
        'Olores por red general saturada',
        'Arquetas inaccesibles bajo pavimento antiguo'
      ],
      specialConsiderations: [
        'Coordinación con servicios municipales',
        'Inspección con cámara obligatoria',
        'Soluciones sin levantar pavimento histórico'
      ],
      urgencyLevel: 'high'
    },
    heatingContext: {
      commonIssues: [
        'Edificios sin calefacción central',
        'Calderas de gas en espacios no ventilados',
        'Calentadores de agua antiguos peligrosos',
        'Emisiones sin salida adecuada'
      ],
      specialConsiderations: [
        'Certificado de gas extremadamente importante',
        'Ventilación adecuada obligatoria',
        'Inspecciones periódicas por industria'
      ],
      urgencyLevel: 'high'
    }
  },
  
  {
    districtId: 'eixample',
    cityId: 'barcelona',
    buildingType: 'historic',
    avgBuildingAge: 'old',
    density: 'high',
    emergencyFrequency: 'high',
    commonProblems: [
      'Edificios modernistas con instalaciones complejas',
      'Reformas integrales en pisos antiguos',
      'Ascensores y montacargas con necesidades especiales',
      'Patios interiores con problemas de humedad'
    ],
    infrastructureAge: 'aging',
    traits: [
      'ensanche modernista',
      'edificios icónicos',
      'reformas de alta gama',
      'arquitectura protegida',
      'clientes exigentes'
    ],
    plumbingContext: {
      commonIssues: [
        'Modernización de baños manteniendo elementos originales',
        'Patios interiores con bajantes antiguas',
        'Sustitución de tuberías en techos moldurados',
        'Grifería de diseño empotrada'
      ],
      specialConsiderations: [
        'Respeto por elementos modernistas originales',
        'Trabajos con arquitectos y diseñadores',
        'Acabados de alta calidad obligatorios',
        'Permisos especiales de patrimonio'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Actualización eléctrica respetando molduras',
        'Iluminación ornamental en edificios protegidos',
        'Cuadros eléctricos ocultos en reformas',
        'Domótica en edificios históricos'
      ],
      specialConsiderations: [
        'Cableado empotrado sin afectar estructura',
        'Iluminación respetuosa con fachadas',
        'Certificaciones con normativa vigente'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Bajantes de patio interior atascadas',
        'Atascos en cocinas por 100+ años de uso',
        'Red horizontal deficiente',
        'Olores en patios mal ventilados'
      ],
      specialConsiderations: [
        'Acceso complicado a patios interiores',
        'Inspección con cámara siempre recomendada',
        'Renovación de tramos completos a veces necesaria'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calefacción central en edificios completos',
        'Radiadores originales a conservar',
        'Calderas comunitarias antiguas',
        'Sistemas de agua caliente centralizados'
      ],
      specialConsiderations: [
        'Decisiones de comunidad necesarias',
        'Modernización de calderas centrales',
        'Contadores individuales en sistemas centrales'
      ],
      urgencyLevel: 'medium'
    }
  },
  
  {
    districtId: 'gracia',
    cityId: 'barcelona',
    buildingType: 'mixed',
    avgBuildingAge: 'mixed',
    density: 'high',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Edificios bajos con comercios en planta baja',
      'Terrazas comunitarias',
      'Reformas en estudios y pisos pequeños',
      'Uso intensivo de lavadoras y lavavajillas'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'barrio con encanto',
      'edificios pequeños',
      'comercio local',
      'terrazas populares',
      'ambiente joven'
    ],
    plumbingContext: {
      commonIssues: [
        'Optimización de espacio en baños pequeños',
        'Fontanería para terrazas con barbacoa',
        'Instalaciones para comercios en bajos',
        'Calentadores compactos'
      ],
      specialConsiderations: [
        'Soluciones compactas y eficientes',
        'Rapidez en reparaciones de comercios',
        'Permisos de terraza con agua'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Potencia limitada en pisos pequeños',
        'Iluminación en terrazas',
        'Instalaciones para comercios',
        'Actualización de cuadros en edificios bajos'
      ],
      specialConsiderations: [
        'Optimización de potencia disponible',
        'Instalaciones de comercio separadas',
        'Certificados para licencias de actividad'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Atascos en cocinas de restaurantes',
        'Desagües de terrazas obstruidos',
        'Bajantes de edificios bajos saturadas',
        'Sifones de bares y locales'
      ],
      specialConsiderations: [
        'Mantenimiento preventivo para comercios',
        'Separadores de grasas obligatorios',
        'Limpieza profesional periódica'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calderas individuales en pisos pequeños',
        'Calentadores de paso para optimizar espacio',
        'Radiadores compactos',
        'Calefacción por splits en reformas'
      ],
      specialConsiderations: [
        'Soluciones compactas eficientes',
        'Gas natural vs butano',
        'Certificaciones de gas obligatorias'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'sants',
    cityId: 'barcelona',
    buildingType: 'mixed',
    avgBuildingAge: 'mixed',
    density: 'high',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Edificios obreros reformados',
      'Naves industriales reconvertidas en lofts',
      'Instalaciones compartidas complejas',
      'Zonas con renovación urbana activa'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'barrio popular',
      'renovación urbana',
      'lofts industriales',
      'comunidades grandes',
      'reformas integrales'
    ],
    plumbingContext: {
      commonIssues: [
        'Adaptación de naves industriales a vivienda',
        'Instalaciones ocultas en lofts',
        'Bajantes comunitarias de edificios grandes',
        'Fontanería a la vista con estética industrial'
      ],
      specialConsiderations: [
        'Permisos de cambio de uso industrial a residencial',
        'Sistemas contra incendios obligatorios',
        'Instalaciones de gran diámetro'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Adaptación de potencia industrial a residencial',
        'Cuadros eléctricos de gran tamaño',
        'Iluminación de espacios diáfanos',
        'Cableado visto con conductos industriales'
      ],
      specialConsiderations: [
        'Potencias elevadas disponibles',
        'Trifásica a monofásica',
        'Certificaciones de cambio de uso'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Desagües industriales a adaptar',
        'Bajantes de gran diámetro',
        'Arquetas exteriores de naves',
        'Atascos por obras de reforma'
      ],
      specialConsiderations: [
        'Red de saneamiento dimensionada para industria',
        'Posible necesidad de separadores',
        'Inspección previa en cambios de uso'
      ],
      urgencyLevel: 'low'
    },
    heatingContext: {
      commonIssues: [
        'Calefacción de espacios grandes',
        'Altura de techos industriales',
        'Aerotermia en lofts modernos',
        'Radiadores de gran potencia'
      ],
      specialConsiderations: [
        'Sistemas eficientes para grandes volúmenes',
        'Zonificación por ambientes',
        'Aislamiento térmico importante'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'sarria',
    cityId: 'barcelona',
    buildingType: 'residential',
    avgBuildingAge: 'mixed',
    density: 'low',
    emergencyFrequency: 'low',
    commonProblems: [
      'Viviendas unifamiliares con jardín',
      'Piscinas privadas',
      'Sistemas de riego complejos',
      'Instalaciones de alta gama'
    ],
    infrastructureAge: 'modern',
    traits: [
      'zona residencial premium',
      'chalets y unifamiliares',
      'jardines y piscinas',
      'servicios de lujo',
      'mantenimiento preventivo'
    ],
    plumbingContext: {
      commonIssues: [
        'Mantenimiento de piscinas privadas',
        'Sistemas de riego automatizado',
        'Jacuzzis y bañeras de hidromasaje',
        'Descalcificadores y tratamiento de agua'
      ],
      specialConsiderations: [
        'Marcas premium y garantías extendidas',
        'Mantenimiento estacional programado',
        'Servicios de urgencia prioritarios',
        'Discreción y profesionalidad máxima'
      ],
      urgencyLevel: 'low'
    },
    electricalContext: {
      commonIssues: [
        'Domótica avanzada en toda la vivienda',
        'Iluminación de jardines y exteriores',
        'Puntos de recarga para vehículos',
        'Paneles solares y gestión energética'
      ],
      specialConsiderations: [
        'Certificación en sistemas KNX/Loxone',
        'Integración completa de sistemas',
        'Mantenimiento preventivo anual'
      ],
      urgencyLevel: 'low'
    },
    drainageContext: {
      commonIssues: [
        'Desagües de piscina',
        'Red de saneamiento de jardín',
        'Arquetas exteriores',
        'Muy pocos problemas en general'
      ],
      specialConsiderations: [
        'Mantenimiento preventivo estacional',
        'Revisión antes de temporada de lluvias',
        'Inspección de red privada'
      ],
      urgencyLevel: 'low'
    },
    heatingContext: {
      commonIssues: [
        'Calderas de alto rendimiento',
        'Suelo radiante en toda la vivienda',
        'Sistemas de climatización por zonas',
        'Piscina climatizada'
      ],
      specialConsiderations: [
        'Eficiencia energética clase A',
        'Control domótico completo',
        'Mantenimiento preventivo regular'
      ],
      urgencyLevel: 'low'
    }
  },
  
  // ============================================
  // VALENCIA DISTRICTS
  // ============================================
  
  {
    districtId: 'ciutat-vella',
    cityId: 'valencia',
    buildingType: 'historic',
    avgBuildingAge: 'historic',
    density: 'very-high',
    emergencyFrequency: 'high',
    commonProblems: [
      'Edificios históricos sin renovar',
      'Problemas de humedad por nivel freático alto',
      'Tuberías compartidas con vecinos',
      'Instalaciones precarias en edificios antiguos'
    ],
    infrastructureAge: 'old',
    traits: [
      'casco histórico valenciano',
      'edificios muy antiguos',
      'humedad por proximidad al mar',
      'barrio en renovación',
      'urgencias frecuentes'
    ],
    plumbingContext: {
      commonIssues: [
        'Humedades crónicas por nivel freático',
        'Tuberías corroídas por salinidad',
        'Saneamiento deficiente en calles estrechas',
        'Fugas en patios interiores'
      ],
      specialConsiderations: [
        'Tratamiento anti-humedad obligatorio',
        'Materiales resistentes a corrosión',
        'Difícil acceso en calles del Carmen',
        'Protección de edificios catalogados'
      ],
      urgencyLevel: 'high'
    },
    electricalContext: {
      commonIssues: [
        'Instalaciones sin toma de tierra',
        'Cuadros eléctricos en mal estado',
        'Humedad afectando instalación eléctrica',
        'Potencia muy limitada'
      ],
      specialConsiderations: [
        'Protección contra humedad esencial',
        'Materiales con grado de protección IP alto',
        'Actualización completa recomendada'
      ],
      urgencyLevel: 'high'
    },
    drainageContext: {
      commonIssues: [
        'Red de alcantarillado antigua colapsada',
        'Atascos por sistemas compartidos',
        'Olores en verano por calor',
        'Arquetas inundadas en lluvias'
      ],
      specialConsiderations: [
        'Coordinación con Ayuntamiento para red general',
        'Inspección con cámara obligatoria',
        'Limpieza preventiva antes de otoño'
      ],
      urgencyLevel: 'high'
    },
    heatingContext: {
      commonIssues: [
        'Pocos edificios con calefacción central',
        'Calentadores de agua insuficientes',
        'Necesidad de aire acondicionado más que calefacción',
        'Sistemas de gas natural limitados'
      ],
      specialConsiderations: [
        'Clima mediterráneo con inviernos suaves',
        'Prioridad en aire acondicionado',
        'Certificado de gas donde existe'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'leixample',
    cityId: 'valencia',
    buildingType: 'modern',
    avgBuildingAge: 'modern',
    density: 'high',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Edificios de los años 60-80',
      'Reformas en pisos de esa época',
      'Instalaciones originales obsoletas',
      'Comunidades grandes con problemas comunes'
    ],
    infrastructureAge: 'aging',
    traits: [
      'ensanche valenciano',
      'edificios años 60-80',
      'necesidad de actualización',
      'comunidades grandes',
      'reformas frecuentes'
    ],
    plumbingContext: {
      commonIssues: [
        'Tuberías de fibrocemento a sustituir',
        'Grifería obsoleta',
        'Calentadores de agua antiguos',
        'Bajantes comunitarias con fugas'
      ],
      specialConsiderations: [
        'Renovación de verticales recomendada',
        'Coordinación con comunidades grandes',
        'Derrame de agua en reformas de vecinos'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Cuadros eléctricos años 60-80 obsoletos',
        'Potencia insuficiente (3,3 kW típico)',
        'Sin diferenciales ni magnetotérmicos modernos',
        'Cableado original sin actualizar'
      ],
      specialConsiderations: [
        'Actualización a normativa vigente necesaria',
        'Aumento de potencia contratada común',
        'Boletines eléctricos obligatorios en reformas'
      ],
      urgencyLevel: 'high'
    },
    drainageContext: {
      commonIssues: [
        'Atascos en bajantes antiguas',
        'Desagües de cocina con grasa acumulada',
        'Arquetas comunitarias sin mantenimiento',
        'Olores por sifones mal diseñados'
      ],
      specialConsiderations: [
        'Mantenimiento comunitario necesario',
        'Inspección con cámara recomendada',
        'Limpieza preventiva anual'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calentadores de agua a gas antiguos',
        'Sin calefacción central en mayoría',
        'Splits de aire acondicionado individuales',
        'Necesidad de certificado de gas'
      ],
      specialConsiderations: [
        'Clima cálido: prioridad en refrigeración',
        'Revisión de gas obligatoria',
        'Modernización a calderas de condensación'
      ],
      urgencyLevel: 'medium'
    }
  },
  
  {
    districtId: 'extramurs',
    cityId: 'valencia',
    buildingType: 'mixed',
    avgBuildingAge: 'mixed',
    density: 'high',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Mezcla de edificios antiguos y modernos',
      'Barrio multicultural con uso intensivo',
      'Comercios en planta baja',
      'Edificios con necesidades diversas'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'barrio multicultural',
      'comercio activo',
      'edificación variada',
      'uso intensivo',
      'necesidades diversas'
    ],
    plumbingContext: {
      commonIssues: [
        'Atascos por uso inadecuado',
        'Fugas en edificios mal mantenidos',
        'Fontanería para comercios',
        'Contadores comunitarios con problemas'
      ],
      specialConsiderations: [
        'Comunicación en varios idiomas a veces necesaria',
        'Explicación de uso correcto importante',
        'Mantenimiento preventivo recomendado'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Potencia limitada y saltos frecuentes',
        'Instalaciones comerciales mezcladas con residenciales',
        'Certificados de locales comerciales',
        'Actualizaciones parciales en edificios'
      ],
      specialConsiderations: [
        'Separación de contadores comercial/residencial',
        'Licencias de actividad para comercios',
        'Inspecciones periódicas'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Atascos por uso incorrecto',
        'Desagües de comercios con grasa',
        'Bajantes saturadas en horas punta',
        'Mantenimiento comunal deficiente'
      ],
      specialConsiderations: [
        'Educación sobre uso correcto',
        'Mantenimiento preventivo en comercios',
        'Separadores de grasas obligatorios'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Mezcla de sistemas individuales',
        'Calentadores eléctricos vs gas',
        'Climatización para comercios',
        'Mantenimiento irregular'
      ],
      specialConsiderations: [
        'Variedad de sistemas requiere especialización',
        'Certificados de comercios importantes',
        'Revisiones de gas obligatorias'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'campanar',
    cityId: 'valencia',
    buildingType: 'modern',
    avgBuildingAge: 'modern',
    density: 'medium',
    emergencyFrequency: 'low',
    commonProblems: [
      'Urbanizaciones modernas',
      'Chalets adosados',
      'Instalaciones relativamente nuevas',
      'Zonas comunes compartidas'
    ],
    infrastructureAge: 'new',
    traits: [
      'urbanizaciones modernas',
      'viviendas unifamiliares',
      'zonas comunes',
      'instalaciones nuevas',
      'mantenimiento preventivo'
    ],
    plumbingContext: {
      commonIssues: [
        'Sistemas de riego comunitario',
        'Piscinas comunitarias',
        'Fontanería moderna con garantías',
        'Pequeñas reparaciones y ajustes'
      ],
      specialConsiderations: [
        'Garantías de construcción activas',
        'Mantenimiento estacional de zonas comunes',
        'Servicios programados convenientes'
      ],
      urgencyLevel: 'low'
    },
    electricalContext: {
      commonIssues: [
        'Instalaciones modernas con domótica',
        'Iluminación zonas comunes',
        'Cuadros de piscina y jardines',
        'Puntos de recarga para vehículos'
      ],
      specialConsiderations: [
        'Sistemas smart home integrados',
        'Certificaciones al día',
        'Mantenimiento preventivo'
      ],
      urgencyLevel: 'low'
    },
    drainageContext: {
      commonIssues: [
        'Desagües de zonas comunes',
        'Arquetas de jardines',
        'Red moderna con pocos problemas',
        'Mantenimiento preventivo simple'
      ],
      specialConsiderations: [
        'Limpieza preventiva estacional',
        'Inspección de red antes de lluvias',
        'Muy bajo riesgo de problemas'
      ],
      urgencyLevel: 'low'
    },
    heatingContext: {
      commonIssues: [
        'Calderas individuales modernas',
        'Aires acondicionados eficientes',
        'Suelo radiante en algunos chalets',
        'Sistemas con control inteligente'
      ],
      specialConsiderations: [
        'Mantenimiento anual recomendado',
        'Eficiencia energética alta',
        'Control por app habitual'
      ],
      urgencyLevel: 'low'
    }
  },
  
  {
    districtId: 'poblats-maritims',
    cityId: 'valencia',
    buildingType: 'mixed',
    avgBuildingAge: 'mixed',
    density: 'medium',
    emergencyFrequency: 'medium',
    commonProblems: [
      'Corrosión por ambiente salino marítimo',
      'Humedad por proximidad al mar',
      'Segundas residencias con poco uso',
      'Uso estacional intenso en verano'
    ],
    infrastructureAge: 'mixed',
    traits: [
      'zona costera',
      'ambiente salino',
      'segundas residencias',
      'uso estacional',
      'corrosión acelerada'
    ],
    plumbingContext: {
      commonIssues: [
        'Corrosión acelerada por salinidad',
        'Sifones secos en viviendas de uso estacional',
        'Fugas en verano por expansión térmica',
        'Duchas y grifería exterior para playa'
      ],
      specialConsiderations: [
        'Materiales resistentes a corrosión (acero inox, PEX)',
        'Revisión antes de temporada de verano',
        'Mantenimiento de instalaciones exteriores',
        'Purga de instalaciones en viviendas cerradas'
      ],
      urgencyLevel: 'medium'
    },
    electricalContext: {
      commonIssues: [
        'Corrosión en cuadros eléctricos',
        'Humedad en instalaciones',
        'Iluminación exterior afectada por sal',
        'Aires acondicionados con uso intensivo estacional'
      ],
      specialConsiderations: [
        'Protección IP alta necesaria',
        'Materiales resistentes a ambiente marino',
        'Revisión pre-temporada imprescindible',
        'Mantenimiento de aires tras verano'
      ],
      urgencyLevel: 'medium'
    },
    drainageContext: {
      commonIssues: [
        'Arena en desagües tras uso verano',
        'Sifones secos permitiendo olores',
        'Arquetas con arena y sal',
        'Limpieza post-temporada necesaria'
      ],
      specialConsiderations: [
        'Limpieza profunda fin de temporada',
        'Revisión de sifones antes de cerrar',
        'Mantenimiento preventivo estacional'
      ],
      urgencyLevel: 'medium'
    },
    heatingContext: {
      commonIssues: [
        'Calefacción poco usada (clima cálido)',
        'Aires acondicionados con uso muy intenso',
        'Calentadores de agua con bajo uso en invierno',
        'Mantenimiento estacional importante'
      ],
      specialConsiderations: [
        'Prioridad absoluta en aire acondicionado',
        'Revisión pre-verano crucial',
        'Limpieza de filtros frecuente por sal',
        'Calefacción residual o inexistente'
      ],
      urgencyLevel: 'low'
    }
  }
]

/**
 * Get district context by IDs
 */
export function getDistrictContext(cityId: string, districtId: string): DistrictContext | undefined {
  return districtContexts.find(
    dc => dc.cityId === cityId && dc.districtId === districtId
  )
}

/**
 * Get all districts for a city
 */
export function getCityDistrictContexts(cityId: string): DistrictContext[] {
  return districtContexts.filter(dc => dc.cityId === cityId)
}

/**
 * Get service-specific context for a district
 */
export function getServiceContext(
  cityId: string,
  districtId: string,
  serviceId: string
): { commonIssues: string[]; specialConsiderations: string[]; urgencyLevel: string } | undefined {
  const context = getDistrictContext(cityId, districtId)
  if (!context) return undefined
  
  const serviceMap: Record<string, string> = {
    'fontanero': 'plumbingContext',
    'electricista': 'electricalContext',
    'desatascos': 'drainageContext',
    'calefaccion': 'heatingContext'
  }
  
  const contextKey = serviceMap[serviceId]
  if (!contextKey) return undefined
  
  return (context as any)[contextKey]
}
