/**
 * City-Specific SEO Content Architecture
 * 
 * This file contains GEO-targeted SEO content for city landing pages.
 * Each city × service combination has unique SEO content to prevent
 * cannibalization with generic service authority pages.
 * 
 * Architecture Principles:
 * - Generic service pages (/fontanero) = GEO-neutral authority hubs
 * - City service pages (/fontanero/valencia) = GEO-targeted landing pages
 * - Complete content separation to eliminate cannibalization
 * - Scalable for future cities, districts, and multilingual expansion
 */

export interface CitySEOContent {
  serviceId: string
  citySlug: string
  metadata?: {
    title: string
    description: string
  }
  seoText: string // 700-1000 words unique GEO-targeted content
  faqs: CitySEOFAQ[]
  keywords: {
    primary: string[]
    secondary: string[]
    longTail: string[]
  }
  lastUpdated: string
}

export interface CitySEOFAQ {
  question: string
  answer: string
  category: string
}

/**
 * City-Specific SEO Content Database
 * 
 * Guidelines:
 * - Content must be 95%+ unique from generic service pages
 * - Include local context, emergency response, pricing
 * - Emphasize city-specific benefits and coverage
 * - Natural, readable language (not keyword stuffed)
 * - AI Overview optimized
 */
export const citySEOContent: CitySEOContent[] = [
  // ============================================================================
  // FONTANERO (PLUMBER) - CITY SEO CONTENT
  // Enterprise-grade semantic authority hubs for plumbing services
  // ============================================================================
  
  {
    serviceId: 'fontanero',
    citySlug: 'madrid',
    metadata: {
      title: 'Fontanero en Madrid 24h | Urgencias y Reparaciones Profesionales',
      description: 'Fontanero profesional en Madrid. Expertos en edificios verticales, presión de agua y tuberías antiguas. Servicio urgente 24h en todos los barrios. Presupuesto gratuito sin compromiso.'
    },
    seoText: 'Madrid presenta desafíos únicos de fontanería derivados de su densidad urbana y parque edificatorio histórico. Los edificios verticales de 5-7 plantas construidos entre 1900-1960 generan problemas de presión diferencial: la presión de red municipal (2-3 bar) apenas alcanza plantas superiores sin grupo de presión, obligando a instalaciones progresivas para garantizar suministro uniforme. En el centro histórico (Austrias, La Latina, Lavapiés), las infraestructuras centenarias conservan tuberías originales de plomo o hierro galvanizado con diámetros reducidos por acumulación interna de óxido y cal. El agua de Madrid, aunque de excelente calidad, tiene dureza moderada-alta (150-300 mg/L CaCO3) que favorece incrustaciones calcáreas en grifería, termos y electrodomésticos',
    faqs: [
      {
        question: '¿Por qué los pisos altos en Madrid tienen poca presión de agua?',
        answer: 'En edificios madrileños antiguos sin grupo de presión, la presión municipal (2-3 bar) disminuye 0.1 bar por cada metro de altura. Un piso en quinta planta (15m) pierde 1.5 bar, quedando con apenas 0.5-1 bar (insuficiente para duchas). Solución: instalar grupo de presión comunitario (€1,800-3,500) que mantiene presión uniforme en todo el edificio. Es inversión comunitaria que revaloriza el inmueble y soluciona problema estructural.',
        category: 'presion'
      },
      {
        question: '¿Cuándo es obligatorio cambiar tuberías de plomo en edificios antiguos de Madrid?',
        answer: 'Aunque el Código Técnico no establece plazo obligatorio, las tuberías de plomo (prohibidas desde 1980) liberan metales al agua, especialmente si es ácida. Los edificios del centro construidos antes de 1975 conservan tramos de plomo. Si análisis de agua muestra niveles altos o detectas sabor metálico, actúa. Coste cambio completo piso 80m²: €2,000-3,500 usando PEX o multicapa. Muchas comunidades en Madrid centro están renovando acometidas progresivamente; verifica con tu presidente.',
        category: 'instalaciones'
      },
      {
        question: '¿Qué hacer ante fuga en bajante comunitaria de edificio madrileño?',
        answer: 'Las fugas en bajantes verticales afectan múltiples viviendas. Protocolo inmediato: 1) Cierra válvula general del edificio (portal/sótano); 2) Avisa al presidente comunidad; 3) Llama a fontanero urgente 24h con experiencia en edificios antiguos; 4) Documenta daños con fotos para seguro; 5) El fontanero inspeccionará con cámara y reparará tramo afectado. Coste: €800-2,000 según accesibilidad. El seguro comunitario cubre la mayor parte; conserva documentación de la reparación.',
        category: 'emergencias'
      },
      {
        question: '¿Por qué se acumula tanta cal en grifos y termos en Madrid?',
        answer: 'El agua del Canal de Isabel II tiene dureza 150-300 mg/L CaCO3 (moderada-alta), generando depósitos calcáreos. En termos eléctricos, la cal se adhiere a resistencias reduciendo eficiencia hasta 30% y provocando averías prematuras. Prevención: descalcificación anual del termo (€60-90), instalación de filtros antical en acometida (€300-600) o descalcificador doméstico si dureza es muy alta (€800-1,500). En grifería, los aireadores se obstruyen cada 3-6 meses; límpielos con vinagre o reemplácelos (€3-8).',
        category: 'mantenimiento'
      },
      {
        question: '¿Cuánto cuesta reparación urgente de fontanería en Madrid fuera de horario?',
        answer: 'Tarifas urgencias 24h en Madrid: Visita + diagnóstico laborable €50-65, sábado tarde/noche €70-100, domingo/festivo €90-120. Reparación simple (cambio grifo, desatasco) añade €80-140. Fuga importante con corte suministro puede requerir €200-400 en urgencia nocturna. Ofrecemos precios transparentes; informamos coste total antes de intervenir. La mayoría de emergencias se resuelven en 60-90 minutos. Exige siempre presupuesto previo; evita fontaneros sin cotización clara.',
        category: 'precio'
      },
      {
        question: '¿Qué problemas específicos tienen edificios centenarios del centro de Madrid?',
        answer: 'Los edificios históricos madrileños (1880-1940) presentan: 1) Tuberías originales de plomo/hierro galvanizado oxidadas y estrechadas; 2) Bajantes de fibrocemento (años 60-70) que filtran; 3) Sin válvulas individuales (hay que cerrar toda vertical); 4) Arquetas emparedadas o enterradas (difícil acceso); 5) Acometidas subdimensionadas para consumo actual; 6) Sifones sin registro que se atascan. Renovación completa fontanería piso 90m²: €4,000-7,000. Muchas comunidades optan por renovación progresiva: primero bajantes críticas, luego acometidas individuales.',
        category: 'edificios_antiguos'
      }
    ],
    keywords: {
      primary: [
        'fontanero madrid',
        'fontanero urgente madrid',
        'fontanería urgente madrid',
        'fontanero 24 horas madrid',
        'reparación fugas madrid',
        'fontanero centro madrid'
      ],
      secondary: [
        'cambio tuberías madrid',
        'fontanero edificios antiguos madrid',
        'problemas presión agua madrid',
        'grupo presión madrid',
        'tuberías plomo madrid',
        'cal agua madrid',
        'bajantes comunitarias madrid'
      ],
      longTail: [
        'por qué varía presión agua en edificios madrid',
        'cuándo cambiar tuberías plomo madrid',
        'fontanero edificios históricos madrid centro',
        'fuga bajante comunitaria madrid qué hacer',
        'agua dura madrid soluciones cal',
        'fontanero urgente sábado noche madrid'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'fontanero',
    citySlug: 'barcelona',
    metadata: {
      title: 'Fontanero en Barcelona 24h | Expertos en Eixample y Ciutat Vella',
      description: 'Fontanero profesional en Barcelona. Especialistas en humedad, tuberías antiguas del Eixample y edificios modernistas. Servicio urgente 24h en todos los barrios. Presupuesto gratuito.'
    },
    seoText: 'Barcelona combina arquitectura modernista única con desafíos específicos de fontanería. Los edificios del Eixample (1900-1930) conservan instalaciones originales de hierro galvanizado en patios de luces comunitarios donde la humedad ambiental alta (70-85% por proximidad al mar) acelera la corrosión. Los baños interiores que ventilan a patis compartidos acumulan humedad, generando moho y filtraciones cuando existen microfu gas en tuberías empotradas. En Ciutat Vella, los edificios medievales y barrocos catalogados requieren intervenciones respetuosas con patrimonio: localización de fugas mediante termografía sin rozas invasivas, reparaciones puntuales por videoendoscopia y materiales compatibles con estructuras históricas. La ITE (Inspección Técnica Edificios) obligatoria para inmuebles de más de 45 años evalúa estado de instalaciones, pudiendo exigir renovación de bajantes deterioradas',
    faqs: [
      {
        question: '¿Por qué hay tanta humedad en baños interiores de pisos del Eixample?',
        answer: 'Los edificios del Eixample tienen baños que ventilan a patios de luces compartidos con ventilación natural limitada. La humedad marina (70-80%) se concentra en espacios cerrados. Cuando hay microfiltraciones en tuberías empotradas o juntas de sanitarios, la humedad no evapora, generando moho y salitre. Solución integral: 1) Reparar fugas (fontanero las localiza con detector); 2) Mejorar ventilación (extractor mecánico €150-300); 3) Impermeabilizar paredes si hay filtración del patio (€800-1,500). Problema común pero solucionable.',
        category: 'humedad'
      },
      {
        question: '¿Cuándo cambiar tuberías originales en pisos modernistas de Barcelona?',
        answer: 'Los pisos modernistas conservan tuberías de hierro galvanizado de 80-120 años. Señales de cambio urgente: 1) Agua oxidada (marrón) tras horas sin uso; 2) Presión muy baja por estrechamiento interno; 3) Fugas recurrentes en uniones; 4) Obstrucciones por óxido desprendido. Coste renovación completa piso 100m² Eixample: €3,500-6,000 (PEX o multicapa), incluyendo rozas y restauración. Muchas comunidades subvencionan parcialmente si ITE obliga a renovación. No esperes a rotura catastrófica; inversión se amortiza evitando daños mayores.',
        category: 'instalaciones'
      },
      {
        question: '¿Qué implica fuga de agua en edificio del casco antiguo de Barcelona?',
        answer: 'En Ciutat Vella (Raval, Gòtic, Born), los edificios catalogados complican intervenciones. Una fuga puede: 1) Dañar vigas centenarias de madera (pudrición); 2) Desprender frescos históricos; 3) Afectar comercios en planta baja; 4) Requerir autorización Patrimoni. El fontanero trabaja con métodos no invasivos: cámara termográfica sin romper, reparación puntual con acceso mínimo (videoendoscopia), materiales compatibles. Coste: 50-100% más que edificio moderno por complejidad. Seguro comunidad cubre daños; conserva documentación ante Patrimoni. Tiempo: 3-7 días vs 1-2 días en edificio estándar.',
        category: 'emergencies'
      },
      {
        question: '¿Por qué se oxidan tanto las tuberías metálicas en Barcelona?',
        answer: 'Barcelona tiene humedad relativa alta (65-75%, hasta 85% invierno) por proximidad al mar, acelerando corrosión de tuberías metálicas. El hierro galvanizado (común en edificios 1900-1980) pierde protección de zinc en 40-60 años, oxidándose internamente. El agua barcelonesa con dureza moderada (200-250 mg/L) y ligera salinidad en zonas portuarias (Barceloneta, Poblenou) favorece corrosión electroquímica. Prevención: sustituir metales viejos por PEX o polipropileno (anticorrosión), instalar válvulas antirretorno en patios húmedos, revisar anualmente bajantes en patios de luces.',
        category: 'mantenimiento'
      },
      {
        question: '¿Qué cubre la ITE en Barcelona respecto a fontanería?',
        answer: 'La ITE (obligatoria para edificios 45+ años) revisa estado de instalaciones. Si detecta tuberías de plomo, fibrocemento o redes muy deterioradas, puede exigir "actuación inmediata" antes de renovar cédula habitabilidad. Las comunidades tienen 1-2 años para subsanar. La ITE evalúa: bajantes generales, acometidas, grado de corrosión, fugas, evacuación pluviales. Si obliga a renovación, coste típico edificio 12 viviendas: €15,000-30,000 (bajantes + acometidas). Muchas comunidades solicitan subvenciones municipales (Rehabilita Barcelona cubre hasta 50%). Cumplir ITE previene averías graves y protege patrimonio.',
        category: 'normativa'
      },
      {
        question: '¿Qué particularidades tienen reformas de baño en pisos del Eixample?',
        answer: 'Reformar baño en Eixample implica: 1) Trabajar con patinillos comunitarios (toda intervención en conductos requiere aviso a comunidad); 2) Respetar alturas forjados (2.6-3m; techos decorados limitan instalaciones); 3) Sortear vigas IPN originales (no se pueden taladrar); 4) Adaptar fontanería a distribuciones irregulares (baños trapezoidales); 5) Coordinar con vecinos si hay que intervenir bajantes compartidas. Es fundamental fontanero con experiencia en Eixample que conozca tipología. Coste reforma completa baño 6m² con cambio fontanería: €5,000-9,000. Plazo: 15-25 días laborales.',
        category: 'reformas'
      }
    ],
    keywords: {
      primary: [
        'fontanero barcelona',
        'fontanero urgente barcelona',
        'fontanero eixample',
        'fontanería barcelona',
        'fontanero 24 horas barcelona',
        'reparación fugas barcelona'
      ],
      secondary: [
        'fontanero edificios antiguos barcelona',
        'humedad baños eixample',
        'cambio tuberías barcelona',
        'fontanero ciutat vella',
        'ITE fontanería barcelona',
        'tuberías antiguas eixample',
        'fontanero gracia barcelona'
      ],
      longTail: [
        'por qué tanta humedad baños eixample',
        'cuándo cambiar tuberías modernistas barcelona',
        'fontanero edificios históricos ciutat vella',
        'ITE barcelona qué cubre fontanería',
        'oxidación tuberías barcelona humedad',
        'reforma baño eixample particularidades'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    metadata: {
      title: 'Fontanero en Valencia 24h | Servicio Urgente en Todos los Barrios',
      description: 'Fontanero profesional en Valencia. Expertos en edificios del centro histórico y zonas costeras. Servicio urgente 24h en Ruzafa, Campanar, Benimaclet y toda la ciudad. Presupuesto gratuito.'
    },
    seoText: 'Valencia presenta particularidades derivadas de su clima mediterráneo y proximidad al mar. La humedad costera (60-75%) y la brisa marina con salinidad afectan las tuberías metálicas en zonas próximas al puerto y Malvarrosa, acelerando corrosión en instalaciones expuestas. El centro histórico conserva edificios con infraestructuras antiguas donde las tuberías discurren por estructuras centenarias, requiriendo intervenciones cuidadosas. La dureza del agua municipal (150-250 mg/L CaCO3) genera acumulación de cal en grifería, termos y electrodomésticos si no se realiza mantenimiento preventivo. En barrios como Ruzafa, Benimaclet o Campanar, las reformas integrales de viviendas demandan actualización completa de fontanería adaptada a consumos modernos. Las viviendas en zonas como Nazaret o Poblats Marítims requieren atención específica por la salinidad ambiental que degrada juntas y conexiones metálicas',
    faqs: [
      {
        question: '¿Cuánto tarda en llegar un fontanero urgente a Valencia?',
        answer: 'Nuestro tiempo de respuesta promedio en Valencia es 30-60 minutos. Tenemos fontaneros distribuidos por toda la ciudad para atender emergencias rápidamente. En casos graves como inundaciones o fugas importantes, priorizamos atención inmediata. Servicio 24 horas todos los días del año en Valencia.',
        category: 'urgencias'
      },
      {
        question: '¿Cuánto cuesta un fontanero en Valencia?',
        answer: 'En Valencia, tarifas desde 49€ para visita y diagnóstico. Reparaciones simples de grifos o cisternas: €60-90. Cambio de sanitarios desde €120. Reparación de fugas €80-150 según complejidad. Desatascos básicos desde €69. Siempre ofrecemos presupuesto gratuito sin compromiso antes de trabajar. Precio final depende del tipo de avería y materiales necesarios.',
        category: 'precio'
      },
      {
        question: '¿Qué hacer si hay fuga de agua en mi piso de Valencia?',
        answer: 'Si detectas fuga en tu vivienda: 1) Cierra llave de paso general inmediatamente; 2) Corta electricidad en zona afectada si hay riesgo de contacto con agua; 3) Llama a fontanería urgente 24h; 4) Coloca recipientes para recoger agua y protege muebles. Nuestros fontaneros en Valencia llegan en 30-60 minutos para localizar y reparar la fuga. No esperes; las fugas causan daños graves si no se atienden rápidamente.',
        category: 'emergencias'
      },
      {
        question: '¿Cómo afecta la salinidad del mar a las tuberías en Valencia?',
        answer: 'En zonas costeras de Valencia (Malvarrosa, Nazaret, Poblats Marítims), la brisa marina con aerosoles salinos acelera corrosión de tuberías metálicas expuestas en patios, terrazas o fachadas. Las juntas y conexiones se degradan más rápido que en zonas interiores. Prevención: usar materiales anticorrosión (PEX, polipropileno), proteger tuberías expuestas con recubrimientos, revisar anualmente conexiones en zonas exteriores. Si vives cerca del mar y tienes tuberías de hierro galvanizado de más de 30 años, considera renovación preventiva para evitar fugas costosas.',
        category: 'costa'
      },
      {
        question: '¿Trabajan fontaneros en edificios antiguos del centro histórico de Valencia?',
        answer: 'Sí, tenemos amplia experiencia en edificios antiguos del centro histórico de Valencia. Conocemos particularidades de instalaciones antiguas y trabajamos cuidadosamente para no dañar estructuras delicadas. Realizamos cambio de tuberías antiguas, reparación de instalaciones históricas y actualización de sistemas respetando el edificio. Utilizamos técnicas especiales para espacios reducidos típicos de edificios valencianos antiguos. Coordin amos con comunidades y patrimonio si es necesario.',
        category: 'servicios'
      },
      {
        question: '¿Qué problemas de fontanería son más frecuentes en Valencia?',
        answer: 'En Valencia, los problemas más frecuentes son: fugas en tuberías por presión de agua y envejecimiento, atascos en fregaderos y desagües por acumulación de residuos, averías en cisternas de inodoros, goteos en grifería por cal (la dureza del agua lo favorece), problemas en instalaciones antiguas del centro, y en zonas costeras, corrosión acelerada de tuberías metálicas por salinidad. También atendemos emergencias de calentadores y roturas de tuberías en invierno. Todos estos problemas los solucionamos con servicio rápido en Valencia.',
        category: 'problemas'
      }
    ],
    keywords: {
      primary: [
        'fontanero valencia',
        'fontanero urgente valencia',
        'fontanero 24 horas valencia',
        'servicio de fontanería valencia',
        'fontaneros valencia',
        'reparación de fugas valencia',
        'fontanero urgente valencia'
      ],
      secondary: [
        'reparación de tuberías valencia',
        'fuga de agua valencia',
        'desatasco de tuberías valencia',
        'instalación de grifos valencia',
        'cambio de sanitarios valencia',
        'averías de fontanería valencia',
        'fontanero económico valencia',
        'urgencias de fontanería valencia',
        'reparación de cisterna valencia',
        'mantenimiento de fontanería valencia'
      ],
      longTail: [
        'cuánto cuesta un fontanero en valencia',
        'cuándo llamar a un fontanero urgente',
        'qué hacer ante una fuga de agua',
        'cuánto tarda un fontanero urgente',
        'salinidad mar afecta tuberías valencia',
        'fontanero edificios históricos valencia centro'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'fontanero',
    citySlug: 'sevilla',
    metadata: {
      title: 'Fontanero en Sevilla 24h | Urgencias y Reparaciones Rápidas',
      description: 'Fontanero profesional en Sevilla. Expertos en estrés térmico de tuberías y edificios históricos. Servicio urgente 24h en todos los barrios: Triana, Nervión, Macarena. Presupuesto gratuito.'
    },
    seoText: 'Sevilla enfrenta desafíos específicos derivados de su clima extremo. Los veranos con temperaturas de 40-45°C generan dilatación térmica en tuberías expuestas y estrés en juntas, favoreciendo fugas en puntos débiles. Las tuberías de PVC en terrazas o patios se degradan aceleradamente por radiación UV directa si no están protegidas. El centro histórico (Arenal, Santa Cruz, Alameda) conserva edificios con instalaciones centenarias donde las tuberías discurren por muros de más de un metro de grosor, complicando localizaciones y reparaciones. La baja pluviometría (menos de 550mm anuales) concentra el consumo de agua en meses cálidos, sobrecargando instalaciones antiguas subdimensionadas. En barrios como Triana, Nervión o Macarena, las reformas demandan actualización de fontanería adaptada a aire acondicionado centralizado y consumos modernos',
    faqs: [
      {
        question: '¿Por qué se rompen más tuberías en verano en Sevilla?',
        answer: 'El calor extremo sevillano (40-45°C en sombra) genera dilatación térmica en tuberías. Los materiales se expanden y contraen diariamente, creando estrés en juntas y uniones. Las tuberías metálicas expuestas en patios o azoteas sufren más. Las de PVC degradadas por UV se vuelven quebradizas. Solución: proteger tuberías expuestas con aislamiento térmico reflectante (€8-15/metro), usar materiales resistentes (PEX multicapa soporta mejor dilatación), y revisar juntas antes del verano. Si tienes tuberías PVC exteriores de más de 15 años, considera cambio preventivo.',
        category: 'climatico'
      },
      {
        question: '¿Qué hacer si el termo eléctrico no funciona bien en verano en Sevilla?',
        answer: 'En Sevilla, muchos usuarios bajan temperatura del termo en verano (agua de red ya sale tibia a 25-28°C). Error común: apagarlo completamente favorece proliferación bacteriana (Legionella). Solución correcta: mantener termo a mínimo 55°C siempre. Si tarda mucho en calentar o el agua no calienta, puede ser: 1) Resistencia cubierta de cal (necesita descalcificación €60-90); 2) Termostato averiado (€40-80 reemplazo); 3) Resistencia quemada (€80-150 cambio). Revisión anual del termo previene averías costosas en pleno verano.',
        category: 'termos'
      },
      {
        question: '¿Cuánto cuesta reparar fuga en edificio antiguo del centro de Sevilla?',
        answer: 'Los edificios históricos sevillanos (Arenal, Santa Cruz, San Vicente) tienen muros muy gruesos (80-120cm) donde localizar fugas es complejo. Usamos detector acústico y termografía para evitar rozas innecesarias. Coste localización + reparación puntual: €150-350. Si hay que abrir muro grueso y restaurar después: €400-800. En edificios catalogados puede requerirse autorización Patrimonio, alargando plazo. Tiempo: 2-5 días vs 1-2 días en edificio moderno. Seguro hogar o comunidad debe cubrir. Conserva siempre documentación y fotos de daños.',
        category: 'edificios_antiguos'
      },
      {
        question: '¿Por qué la presión de agua baja tanto en verano en Sevilla?',
        answer: 'En verano, el consumo de agua en Sevilla aumenta 30-40% (riego, aire acondicionado, duchas frecuentes). Las redes antiguas en barrios como Triana, Macarena o San Bernardo se dimensionaron para consumos de hace 50 años. Cuando todo el edificio consume simultáneamente (20:00-22:00h), la presión baja notablemente. Solución individual: instalar grupo de presión doméstico (€350-700) si vives en planta alta. Solución comunitaria: renovar acometida general o instalar grupo presión comunitario (€2,000-4,000 edificio 10 viviendas). Consulta con comunidad de vecinos.',
        category: 'presion'
      },
      {
        question: '¿Qué tarifas tienen las urgencias de fontanería en Sevilla fines de semana?',
        answer: 'Tarifas de urgencia 24h en Sevilla: Visita + diagnóstico laborables €50-65, sábados €70-95, domingos/festivos €85-110. Reparaciones simples añaden €75-130. Emergencias graves (inundación, fuga con corte suministro) pueden requerir €180-350 fuera de horario. Ofrecemos presupuesto antes de intervenir; no cobramos desplazamiento adicional dentro de Sevilla capital. La mayoría de urgencias se resuelven en primera visita. Exige siempre cotización clara antes de autorizar trabajos.',
        category: 'precio'
      },
      {
        question: '¿Cómo mantener tuberías en buen estado con el calor extremo de Sevilla?',
        answer: 'Mantenimiento preventivo en Sevilla: 1) Protege tuberías expuestas con aislamiento térmico reflectante (reduce dilatación); 2) Revisa juntas y conexiones antes del verano (busca pequeñas humedades); 3) Descalcifica termo anualmente (cal se adhiere más con agua caliente); 4) Si tienes PVC exterior, píntalo con pintura reflectante específica o cámbialo; 5) Instala reguladores presión si supera 4 bar (protege instalación de golpes ariete). Inversión €150-300/año previene averías de €1,000-3,000. En Sevilla el calor castiga; prevenir es más barato que reparar.',
        category: 'mantenimiento'
      }
    ],
    keywords: {
      primary: [
        'fontanero sevilla',
        'fontanero urgente sevilla',
        'fontanería urgente sevilla',
        'fontanero 24 horas sevilla',
        'reparación fugas sevilla',
        'fontanero nervión sevilla'
      ],
      secondary: [
        'fontanero triana sevilla',
        'fontanero edificios antiguos sevilla',
        'tuberías calor sevilla',
        'termo averiado sevilla',
        'presión agua verano sevilla',
        'fontanero centro histórico sevilla',
        'fontanero macarena sevilla'
      ],
      longTail: [
        'por qué se rompen tuberías verano sevilla',
        'termo no funciona bien verano sevilla',
        'fuga edificio antiguo centro sevilla coste',
        'baja presión agua verano sevilla',
        'fontanero urgente fin de semana sevilla',
        'mantener tuberías calor extremo sevilla'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'fontanero',
    citySlug: 'malaga',
    metadata: {
      title: 'Fontanero en Málaga 24h | Expertos en Zonas Costeras y Centro',
      description: 'Fontanero profesional en Málaga. Especialistas en corrosión salina, humedad costera y tuberías en zonas turísticas. Servicio urgente 24h en todos los barrios. Presupuesto gratuito.'
    },
    seoText: 'Málaga presenta desafíos únicos por su ubicación costera mediterránea. La humedad ambiental alta (65-80%) combinada con aerosoles salinos del mar genera corrosión acelerada en tuberías metálicas, especialmente en zonas como Malagueta, Pedregalejo o El Palo donde la brisa marina impacta directamente las fachadas. Las juntas y conexiones de grifería se degradan más rápido que en ciudades de interior, requiriendo reemplazo cada 8-12 años vs 15-20 años en zonas sin salinidad. El centro histórico conserva edificios con instalaciones antiguas donde las tuberías discurren por estructuras centenarias. Las viviendas turísticas en zonas costeras demandan mantenimiento preventivo intensificado para evitar averías en temporada alta. La dureza del agua (100-200 mg/L CaCO3, variable según zona) requiere descalcificación periódica',
    faqs: [
      {
        question: '¿Cómo afecta la salinidad del mar a las tuberías en Málaga?',
        answer: 'En Málaga, la proximidad al mar (especialmente en Malagueta, Pedregalejo, El Palo) genera aerosoles salinos que se depositan en fachadas, patios y tuberías exteriores. La sal acelera corrosión de tuberías metálicas (hierro, cobre) y degrada juntas de goma en grifería. Las tuberías galvanizadas pierden protección en 20-30 años vs 40-60 en interior. Solución: usar materiales anticorrosión (PEX, polipropileno) en reformas, proteger tuberías expuestas con recubrimientos, revisar anualmente conexiones exteriores. Si vives en primera línea de playa y tienes hierro de más de 25 años, plantea cambio preventivo.',
        category: 'costa'
      },
      {
        question: '¿Qué mantenimiento necesitan viviendas turísticas en zonas costeras de Málaga?',
        answer: 'Las viviendas vacacionales en Málaga costa requieren mantenimiento intensificado: 1) Revisión pre-temporada (mayo) de grifería y sanitarios; 2) Descalcificación termo si estuvo parado meses; 3) Comprobación presión (uso intensivo de múltiples inquilinos estresa instalación); 4) Inspección fugas ocultas (vacíos prolongados enmascaran goteos); 5) Limpieza filtros aireadores (cal + salinidad obstruyen). Contrato mantenimiento preventivo (€180-300/año) previene averías en plena temporada que cuestan €500-1,500 en urgencia + pérdida de reservas. Muchos propietarios lo incluyen en gestión del apartamento.',
        category: 'viviendas_turisticas'
      },
      {
        question: '¿Por qué se estropean tanto los grifos en pisos cerca del mar en Málaga?',
        answer: 'La brisa marina en Málaga deposita micropartículas de sal en grifería exterior (terrazas, balcones). La sal penetra en cartuchos cerámicos y juntas, provocando goteo y dificultad para abrir/cerrar. Los grifería cromada se pica (corrosión puntual) perdiendo brillo. Vida útil grifos exteriores en primera línea: 5-8 años vs 12-15 años en interior. Prevención: limpiar grifos exteriores mensualmente con agua dulce, aplicar protector anticorrosión, elegir grifería acero inoxidable marina (más resistente). Cambio cartucho grifo: €40-70. Cambio completo: €80-200.',
        category: 'griferia'
      },
      {
        question: '¿Cuánto cuesta cambiar tuberías en piso antiguo del centro de Málaga?',
        answer: 'En el centro histórico de Málaga, renovar fontanería completa en piso 70m² cuesta €2,500-5,000. Incluye: retirada tuberías antiguas, instalación PEX o multicapa, válvulas corte individuales, prueba de presión, rozas y restauración paredes. Si el edificio está catalogado, añade €500-1,000 por trámites y limitaciones de intervención. Plazo: 5-10 días laborables. Muchas comunidades se subvencionan parcialmente si renovación es por ITE o seguro comunitario. La inversión revaloriza inmueble y previene fugas costosas en edificios turísticos donde averías generan pérdidas económicas.',
        category: 'reformas'
      },
      {
        question: '¿Qué tarifas tienen fontaneros urgentes en Málaga en temporada alta?',
        answer: 'Tarifas urgencia 24h Málaga: Visita + diagnóstico laborables €50-65, sábados €70-100, domingos/festivos €90-120. Reparaciones simples añaden €80-140. En temporada alta (junio-septiembre), la demanda aumenta 40% por viviendas turísticas; algunos profesionales aplican suplemento 10-15%. Urgencia con inundación o corte suministro puede requerir €200-400. Ofrecemos precios fijos transparentes sin suplementos estacionales. La mayoría de emergencias se resuelven en 60-90 minutos en Málaga capital. Exige siempre presupuesto previo claro.',
        category: 'precio'
      },
      {
        question: '¿Cómo prevenir averías de fontanería en vivienda vacía meses en Málaga?',
        answer: 'Si tu vivienda en Málaga estará vacía (segunda residencia, vacacional), prevención: 1) Cierra llave de paso general (evita daños por fugas mientras estás ausente); 2) Vacía termo eléctrico si estará off más de 2 meses (ahorra electricidad, previene legionella); 3) Deja grifos ligeramente abiertos con llave paso cerrada (previene bloqueo cartuchos por cal); 4) Aplica producto anticorrosión en grifería exterior; 5) Contrata revisión pre-apertura (€60-90). Las averías en viviendas desatendidas causan daños de €3,000-10,000 (inundaciones no detectadas, corrosión acelerada). Pequeña inversión en prevención protege gran patrimonio.',
        category: 'prevencion'
      }
    ],
    keywords: {
      primary: [
        'fontanero malaga',
        'fontanero urgente malaga',
        'fontanería urgente malaga',
        'fontanero 24 horas malaga',
        'reparación fugas malaga',
        'fontanero centro malaga'
      ],
      secondary: [
        'fontanero zona costa malaga',
        'corrosión salina tuberías malaga',
        'fontanero vivienda turística malaga',
        'grifos estropeados cerca mar malaga',
        'cambio tuberías malaga',
        'fontanero pedregalejo malaga',
        'fontanero malagueta'
      ],
      longTail: [
        'cómo afecta salinidad mar tuberías malaga',
        'mantenimiento vivienda turística costa malaga',
        'por qué se estropean grifos cerca mar malaga',
        'cuánto cuesta cambiar tuberías piso antiguo malaga',
        'fontanero urgente temporada alta malaga',
        'prevenir averías vivienda vacía malaga'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'fontanero',
    citySlug: 'zaragoza',
    metadata: {
      title: 'Fontanero en Zaragoza 24h | Expertos en Cierzo y Clima Continental',
      description: 'Fontanero profesional en Zaragoza. Especialistas en roturas por heladas, estrés del cierzo y edificios antiguos. Servicio urgente 24h en todos los barrios. Presupuesto gratuito.'
    },
    seoText: 'Zaragoza enfrenta desafíos únicos derivados de su clima continental extremo y el cierzo característico. Los inviernos con temperaturas de -5 a +5°C generan riesgo de congelación en tuberías expuestas en patios, terrazas o zonas no calefactadas, provocando roturas costosas cuando el agua congelada se expande. El cierzo (viento de 40-80 km/h) enfría rápidamente tuberías en fachadas norte y acelera pérdida térmica en instalaciones de agua caliente. Los veranos de 35-40°C contrastan con inv iernos gélidos, creando estrés térmico por dilatación/contracción cíclica que debilita juntas. El centro histórico (Casco Viejo, Magdalena) conserva edificios con instalaciones centenarias donde las tuberías discurren por muros gruesos. En barrios como Delicias, Las Fuentes o Universidad, las reformas demandan actualización de fontanería con aislamiento térmico reforzado',
    faqs: [
      {
        question: '¿Cómo prevenir congelación de tuberías en invierno en Zaragoza?',
        answer: 'En Zaragoza, las heladas (diciembre-febrero, temperaturas -5 a 0°C) congelan tuberías en zonas no calefactadas. Prevención: 1) Aisla tuberías expuestas (patios, garajes) con coquilla de polietileno (€2-4/metro); 2) Deja grifos con ligero goteo en noches muy frías (agua en movimiento no congela); 3) Vacía tuberías de riego exterior antes del invierno; 4) Mantén calefacción mínima (7-10°C) en viviendas deshabitadas; 5) Abre armarios bajo fregaderos en noches gélidas (aire caliente protege tuberías). Rotura por congelación cuesta €200-800 reparar; prevención cuesta €50-150. En Zaragoza, proteger tuberías es inversión obligada.',
        category: 'heladas'
      },
      {
        question: '¿Por qué el cierzo afecta a las tuberías de agua caliente en Zaragoza?',
        answer: 'El cierzo (viento frío de 40-80 km/h frecuente en Zaragoza) impacta fachadas norte enfriando rápidamente tuberías de agua caliente empotradas o poco aisladas. El agua caliente pierde temperatura entre calentador y grifos, obligando a dejar correr más agua esperando que caliente (desperdicio + coste). Tuberías de ACS en fachadas norte expuestas al cierzo pueden perder 5-10°C en trayecto. Solución: aislar tramos de ACS con coquilla reforzada (€3-6/metro), instalar tuberías por fachadas interiores en reformas, o colocar calentadores más próximos a puntos de consumo. Ahorro: 10-20% en gas/electricidad.',
        category: 'cierzo'
      },
      {
        question: '¿Qué hacer si se congela una tubería en Zaragoza?',
        answer: 'Si detectas tubería congelada (no sale agua del grifo en zona fría): 1) NO uses soplete ni calor directo intenso (riesgo de rotura); 2) Abre el grifo afectado (cuando descongele, evacuará presión); 3) Aplica calor gradual: secador de pelo, toallas calientes, calefactor portátil a distancia; 4) Comienza calentando cerca del grifo, avanzando hacia la congelación; 5) Revisa fugas cuando descongele (expansión pudo romper). Si no puedes acceder o no descongela, llama a fontanero urgente 24h (€80-150 intervención). En Zaragoza suele pasar en garajes, trasteros y patios exteriores enero-febrero.',
        category: 'emergencias'
      },
      {
        question: '¿Cuánto cuesta reparar rotura de tubería por helada en Zaragoza?',
        answer: 'Rotura por congelación en Zaragoza cuesta €150-800 según localización: tubería accesible €150-300 (cambio tramo, restauración), tubería empotrada €300-500 (apertura pared, reparación, restauración), daños colaterales (inundación, parqué, muebles) €500-3,000. Seguro hogar cubre si tienes cobertura daños agua. Muchas roturas ocurren en garajes/trasteros al descongelar cuando no hay nadie en casa. Si vas a ausentarte en invierno, vacía instalaciones no calefactadas o deja calefacción mínima. Reparar urgencia fin de semana añade €50-100 suplemento. En Zaragoza, prevenir congelación es prioritario.',
        category: 'precio'
      },
      {
        question: '¿Qué mantenimiento necesitan tuberías con clima continental de Zaragoza?',
        answer: 'Mantenimiento específico en Zaragoza: 1) Pre-invierno (octubre): aislar tuberías expuestas, revisar llaves paso, vaciar circuitos exteriores; 2) Post-invierno (marzo): inspeccionar fugas tras heladas, revisar juntas (dilatación/contracción las debilita); 3) Verano (julio): proteger tuberías expuestas del calor (deterioro acelerado); 4) Anual: descalcificación termo, limpieza aireadores. Contrato mantenimiento preventivo: €120-250/año. El estrés térmico del clima zaragozano (-5°C invierno, +40°C verano) envejece instalaciones 30% más rápido que en climas suaves. Mantenimiento preventivo es clave.',
        category: 'mantenimiento'
      },
      {
        question: '¿Por qué se rompen más tuberías en edificios antiguos del Casco Viejo de Zaragoza?',
        answer: 'Los edificios históricos del Casco Viejo (construidos siglos XVIII-XX) tienen: 1) Tuberías antiguas de hierro galvanizado o plomo debilitadas por 60-100 años de ciclos térmicos extremos; 2) Muros muy gruesos (80-120cm) no aislados térmicamente donde tuberías sufren más frío; 3) Sin calefacción central (muchos tienen estufas individuales, dejando zonas sin calefaccionar); 4) Juntas antiguas que no soportan bien dilatación/contracción. Coste renovación fontanería piso 80m² Casco Viejo: €3,000-6,000 (complejidad estructural). ITE puede exigir actualización. Muchas comunidades están renovando; consulta con tu presidente.',
        category: 'edificios_antiguos'
      }
    ],
    keywords: {
      primary: [
        'fontanero zaragoza',
        'fontanero urgente zaragoza',
        'fontanería urgente zaragoza',
        'fontanero 24 horas zaragoza',
        'reparación fugas zaragoza',
        'fontanero casco viejo zaragoza'
      ],
      secondary: [
        'fontanero congelación tuberías zaragoza',
        'rotura tubería helada zaragoza',
        'cierzo afecta tuberías zaragoza',
        'fontanero delicias zaragoza',
        'aislar tuberías invierno zaragoza',
        'fontanero edificios antiguos zaragoza',
        'prevenir heladas tuberías zaragoza'
      ],
      longTail: [
        'cómo prevenir congelación tuberías invierno zaragoza',
        'por qué cierzo afecta agua caliente zaragoza',
        'qué hacer tubería congelada zaragoza',
        'cuánto cuesta reparar rotura helada zaragoza',
        'mantenimiento tuberías clima continental zaragoza',
        'tuberías se rompen edificios antiguos zaragoza'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  // ============================================================================
  // ELECTRICISTA (ELECTRICIAN) - CITY SEO CONTENT
  // Enterprise-grade semantic authority hubs for electrical services
  // ============================================================================
  
  {
    serviceId: 'electricista',
    citySlug: 'madrid',
    metadata: {
      title: 'Electricista en Madrid 24h | Urgencias Eléctricas Certificadas',
      description: 'Electricista profesional certificado en Madrid. Expertos en cuadros eléctricos, diferenciales y boletines. Atención urgencias 24h. Presupuesto gratuito.'
    },
    seoText: 'Las instalaciones eléctricas en Madrid enfrentan desafíos específicos derivados de su tejido urbano vertical y parque inmobiliario histórico. Los edificios de 5-8 plantas construidos entre 1950-1980 conservan cuadros eléctricos antiguos con fusibles cerámicos, sin magnetotérmicos modernos ni diferenciales de alta sensibilidad. En comunidades del ensanche (Salamanca, Chamberí, Retiro), la potencia contratada original (3-5 kW) resulta insuficiente para consumos actuales: climatización, electrodomésticos clase A+++, cocinas vitrocerámicas de inducción, sistemas domóticos. La red de Media Tensión de Canal de Isabel II Electricidad (actualmente Naturgy/Iberdrola) presenta estabilidad, pero picos de demanda en verano (aire acondicionado masivo) generan microcortes en zonas saturadas.',
    faqs: [
      {
        question: '¿Por qué saltan los diferenciales en edificios antiguos de Madrid?',
        answer: 'Los edificios madrileños pre-1980 carecen de toma de tierra adecuada o tienen derivaciones por humedad en instalación empotrada. El diferencial (30mA sensibilidad alta) detecta fugas mínimas a tierra y desconecta por seguridad. Causas comunes: electrodomésticos antiguos sin clase II, cableado deteriorado con aislamiento roto, humedad en cajas de derivación empotradas. Solución: revisión con megóhmetro para medir resistencia de aislamiento; si <0.5 MΩ, hay fuga. Reparación: localizar derivación (€120-250) o renovación selectiva circuito afectado (€400-900 según tramo).',
        category: 'diferenciales'
      },
      {
        question: '¿Cuándo es obligatorio actualizar cuadro eléctrico en Madrid?',
        answer: 'El Código Técnico de Edificación y REBT exigen cuadros con protecciones magnetotérmicas, diferencial ≥30mA y toma tierra <15Ω. Si tu cuadro tiene fusibles cerámicos (pre-1980), carece diferencial o no tiene SIPS (protección sobretensión), está obsoleto técnicamente. Aunque no hay obligación retroactiva, las ITE (Inspección Técnica Edificios) en Madrid pueden exigir actualización si detectan riesgo. Coste actualización cuadro vivienda 90m²: €600-1,200 con boletín eléctrico incluido. Mejora seguridad dramáticamente y es requisito para aumentar potencia.',
        category: 'normativa'
      },
      {
        question: '¿Qué potencia eléctrica contratar para vivienda moderna en Madrid?',
        answer: 'Viviendas 80-100m² con climatización, cocina inducción y electrodomésticos clase A necesitan mínimo 5.75 kW (25A). Para viviendas >120m² con calefacción eléctrica, bomba calor aerotérmica o coche eléctrico, considerar 9.2 kW (40A) o incluso 11.5 kW (50A). Madrid tiene tarifa eléctrica urbana estándar; los aumentos de potencia requieren: 1) Cuadro adecuado con ICP o limitador; 2) Cableado acometida suficiente (6mm² mínimo para 5.75 kW); 3) Boletín eléctrico si hay obras. Coste aumentar potencia 3.45→5.75 kW: derechos €17-45 + posible obra cuadro €150-400.',
        category: 'potencia'
      },
      {
        question: '¿Por qué parpadean las luces en edificios altos de Madrid?',
        answer: 'En edificios >7 plantas, las variaciones de carga en acometida general provocan caídas tensión. Si alguien arranca ascensor (motor 10-15 kW), electrodoméstico potente o sistema climatización, la demanda súbita genera bajada tensional momentánea. Más evidente en horas punta (21:00-23:00). Solución individual: estabilizador de tensión (€200-500) protege equipos sensibles. Solución comunitaria: verificar sección acometida y derivaciones; si cable subdimensionado (<50mm² para edificio 40 viviendas), requiere ampliación por compañía distribuidora. Notificar a presidente para gestión técnica.',
        category: 'calidad_suministro'
      },
      {
        question: '¿Cómo afecta el calor de verano a instalaciones eléctricas en Madrid?',
        answer: 'Temperaturas Madrid verano (35-40°C) elevan temperatura cables empotrados sin ventilación hasta 60-70°C, reduciendo capacidad conducción 20-30%. Cables antiguos con aislamiento PVC (pre-1990) se degradan aceleradamente; los modernos XLPE/EPR resisten mejor. La sobrecarga térmica combinada con climatización masiva genera disparos magnetotérmicos falsos. Prevención: no sobrecargar enchufes (max 3,500W/regleta), ventilar cuadros eléctricos en armarios, revisar cables en falsos techos donde calor acumula. Si magnetotérmico salta repetidamente, indica sobrecarga real o deterioro; electricista debe medir corriente con pinza amperimétrica.',
        category: 'verano'
      },
      {
        question: '¿Qué cubre el boletín eléctrico en Madrid y cuándo es obligatorio?',
        answer: 'El boletín (Certificado Instalación Eléctrica) es obligatorio en Madrid tras: 1) Nueva instalación o ampliación sustancial; 2) aumento de potencia >10%; 3) Reformas con obra >25% instalación; 4) ITE edificios >50 años si detecta deficiencias. Un electricista autorizado inspecciona, mide resistencia tierra, verifica protecciones y emite certificado registrable en Comunidad de Madrid (Industria). Coste vivienda estándar: €120-200 certificado + €35-50 registro administrativo. Válido indefinidamente salvo nueva reforma. Sin boletín, distribuidora puede negarse a dar alta o aumentar potencia.',
        category: 'certificacion'
      }
    ],
    keywords: {
      primary: [
        'electricista madrid',
        'electricista urgente madrid',
        'electricista 24 horas madrid',
        'cuadro eléctrico madrid',
        'saltan diferenciales madrid'
      ],
      secondary: [
        'boletín eléctrico madrid',
        'cambiar cuadro eléctrico madrid',
        'aumentar potencia eléctrica madrid',
        'reparación instalación eléctrica madrid',
        'electricista certificado madrid'
      ],
      longTail: [
        'por qué saltan diferenciales edificios antiguos madrid',
        'cuánto cuesta cambiar cuadro eléctrico madrid',
        'electricista urgente 24h domingo madrid',
        'qué potencia eléctrica necesito vivienda madrid',
        'boletín eléctrico obligatorio madrid cuándo'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'electricista',
    citySlug: 'barcelona',
    metadata: {
      title: 'Electricista en Barcelona 24h | ITE Eléctrica y Urgencias',
      description: 'Electricista certificado en Barcelona. Especialistas en fincas antiguas, humedad costera e ITE eléctricas. Servicio urgente 24h. Boletines autorizados.'
    },
    seoText: 'Barcelona presenta particularidades eléctricas derivadas del Eixample (plan Cerdá) con edificios 1900-1960 de fachadas modernistas y estructuras interiores centenarias. La combinación de humedad mediterránea, brisa salina y edificaciones antiguas genera problemas específicos: corrosión acelerada en conexiones de cobre (cajas derivación empotradas sin estanqueidad), degradación aislamiento PVC en instalaciones pre-1980, y derivaciones a tierra por filtraciones de humedad ascendiente típicas fincas sin impermeabilización . La ITE (Inspección Técnica Edificación) catalana es especialmente exigente con instalaciones eléctricas: cuadros sin diferencial 30mA, ausencia toma tierra <15Ω o cableado aluminio antiguo generan desfavorable obligando actualización antes vender/alquilar. El Área Metropolitana Barcelona tiene red eléctrica robusta (Endesa distribución), pero barrios turísticos (Gòtic, Born) con uso intensivo Airbnb experimentan sobrecargas estacionales.',
    faqs: [
      {
        question: '¿Por qué las averías eléctricas son más comunes en fincas antiguas de Barcelona?',
        answer: 'Las fincas del Eixample y Ciutat Vella (1880-1950) conservan instalaciones originales con cableado de tela aislada, tubos metálicos sin puesta a tierra y cuadros sin protecciones modernas. La humedad costera (70-80% HR) penetra muros poco impermeabilizados, generando condensación en cajas derivación empotradas que corroen conexiones cobre. Los cables antiguos con aislamiento textil/goma se vuelven quebradizos perdiendo propiedades aislantes, provocando derivaciones. Solución: renovación progresiva: primero cuadro + diferencial (€600-900), después circuitos críticos cocina/baño (€800-1,500), finalmente cableado completo cuando ITE lo exija (€4,000-7,000 piso 90m²).',
        category: 'edificios_antiguos'
      },
      {
        question: '¿Qué es la ITE eléctrica en Barcelona y cuándo es obligatoria?',
        answer: 'La Inspección Técnica Edificación catalana incluye revisión instalaciones eléctricas en edificios >45 años. Técnico certificado verifica: cuadro con protecciones reglamentarias, diferencial ≥30mA, toma tierra <15Ω, ausencia cables aluminio, sección adecuada. Si ITE es desfavorable, propietarios deben subsanar en 12-24 meses; sin corrección, pueden imponer multas o restringir actividad alquiler turístico. Coste ITE completa edificio 15 viviendas: €1,800-3,500; reparaciones eléctricas según hallazgos: desde €400 (actualizar cuadro) hasta €5,000 (renovación instalación). ITE requerida para compraventa y renovación cada 10 años tras primera.',
        category: 'inspecciones'
      },
      {
        question: '¿Cómo afecta la humedad mediterránea a instalaciones eléctricas en Barcelona?',
        answer: 'La cercanía al mar genera aire salino rico en NaCl que acelera corrosión contactos eléctricos, especialmente en zonas Barceloneta, Poblenou, Port Vell. Magnetotérmicos antiguos se oxidan perdiendo capacidad de corte; enchufes exteriores sin IP44 sufren oxidación interna. La humedad relativa alta (70-85%) combinada con filtraciones de cubierta o fachada genera condensación en cajas derivación de baños/cocinas empotradas en paredes frías. Prevención: usar mecanismos estancos IP55 en zonas húmedas (€8-15/unidad vs €3-5 estándar), aplicar spray antihumedad en cuadros (€12-18/500ml), renovar cajas derivación añosas con sellado silicona.',
        category: 'humedad'
      },
      {
        question: '¿Por qué hay tantos cortes de luz en verano en barrios turísticos de Barcelona?',
        answer: 'El Raval, Gòtic, Born experimentan sobrecarga red en verano por densificación Airbnb. Cada apartamento turístico usa aire acondicionado 12-18h/día (1,500-2,500W/unidad), mientras infraestructura eléctrica diseñada para uso residencial moderado. Las acometidas generales edificios antiguos (50-70mm² cobre) resultan insuficientes para demanda actual. Endesa corta sectores sobrecargados evitando daño transformadores. Solución individual: split inverter clase A+++ reduce consumo 40% vs modelos antiguos. Solución comunitaria: ampliación acometida general (gestión presidente + Endesa, €3,000-8,000 según obra).',
        category: 'suministro'
      },
      {
        question: '¿Cuánto cuesta renovar instalación eléctrica en piso del Eixample?',
        answer: 'Piso típico Eixample 85-110m² con techos altos (3.2-3.8m), molduras y suelos hidráulicos requiere instalación por canal vista o rozas controladas (evitar dañar elementos originales protegidos). Coste renovación completa: €5,500-9,000 incluyendo: cuadro moderno 16 circuitos (€600-900), cableado RZ1-K 2.5-6mm² (€25-35/m instalado), mecanismos Niessen/Simon (€400-700 total), 6-8 puntos luz LED (€350-600), boletín eléctrico y legalización (€180-250). Si piso catalogado (Patrimonio), añadir €800-1,500 por obra arqueológica supervisada. Plazo: 5-7 días útiles con piso vacío.',
        category: 'presupuesto'
      },
      {
        question: '¿Qué problemas tienen instalaciones con cableado de aluminio en Barcelona?',
        answer: 'Edificios 1960-1975 usaron conductor aluminio (más barato que cobre). Problema: aluminio se oxida formando capa aislante que aumenta resistencia eléctrica, generando calentamiento en conexiones (riesgo incendio). Además, es quebradizo y sufre fatiga por ciclos térmicos expansión-contracción. REBT actual prohíbe aluminio en instalaciones interiores domésticas. Si ITE detecta aluminio, obliga sustitución. Identificación: cable grisáceo mate (vs cobre brillante rojizo); verificar en cuadro o cajas derivación. Coste renovación vivienda 75m²: €3,500-6,000 completa. Priorizar circuitos alta carga (cocina, baño, climatización).',
        category: 'cableado'
      }
    ],
    keywords: {
      primary: [
        'electricista barcelona',
        'electricista urgente barcelona',
        'ITE eléctrica barcelona',
        'cuadro eléctrico barcelona',
        'boletín eléctrico barcelona'
      ],
      secondary: [
        'electricista eixample barcelona',
        'renovar instalación eléctrica barcelona',
        'electricista fincas antiguas barcelona',
        'diferencial salta barcelona',
        'electricista 24 horas barcelona'
      ],
      longTail: [
        'qué es ITE eléctrica obligatoria barcelona',
        'cuánto cuesta renovar electricidad piso barcelona',
        'problemas eléctricos humedad barcelona',
        'electricista certificado ITE barcelona',
        'cambiar cableado aluminio barcelona'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'electricista',
    citySlug: 'valencia',
    metadata: {
      title: 'Electricista en Valencia 24h | Urgencias y Boletines Eléct ricos',
      description: 'Electricista profesional en Valencia. Expertos en climatización eléctrica y aire salino costero. Servicio urgente 24h en toda la ciudad. Boletines certificados.'
    },
    seoText: 'Valencia combina clima mediterráneo seco-caluroso con cercanía marítima, generando condiciones específicas para instalaciones eléctricas. Los veranos con temperaturas 35-40°C y uso intensivo de climatización (mayo-septiembre) estresan redes eléctricas residenciales diseñadas para cargas menores. Los edificios del centro histórico (Ciutat Vella, Russafa) construidos 1920-1970 conservan cuadros eléctricos antiguos sin capacidad para splits multinversor modernos (3,000-5,000W cada unidad interior). La brisa marítima transporta partículas salinas que corroen contactos eléctricos en zonas costeras (Malvarrosa, Cabanyal, El Saler), acelerando degradación mecanismos exteriores y cuadros en patios sin protección IP. La red eléctrica de Iberdrola es robusta en ciudad consolidada, pero urbanizaciones periféricas (Paterna, Mislata, Manises) con crecimiento acelerado experimentan microcortes en picos de demanda veraniegos',
    faqs: [
      {
        question: '¿Por qué saltan magnetotérmicos en verano en Valencia?',
        answer: 'Los veranos valencianos (35-42°C) obligan a uso simultáneo de múltiples equipos climatización. Un piso típico 80m² con 2 splits (1,500W + 2,000W), cocina inducción (3,500W pico) y lavavajillas (2,000W) suma 9,000W momentáneos. Si potencia contratada es 4.6 kW (20A) o 5.75 kW (25A), el magnetotérmico general dispara por sobrecarga. Solución inmediata: gestionar cargas, evitando simultaneidad cocina+lavadora+aires. Solución definitiva: aumentar potencia a 7.5-9.2 kW (35-40A) y actualizar cuadro con magnetotérmicos selectivos. Coste: derechos enganche €30-60 + obra cuadro si necesario €200-500.',
        category: 'climatizacion'
      },
      {
        question: '¿Cómo afecta la humedad del Mediterráneo a instalaciones eléctricas en Valencia?',
        answer: 'La proximidad a la costa (2-8 km según barrio) genera ambiente salino con NaCl en suspensión que oxida contactos cobre en enchufes, interruptores y bornas cuadro eléctrico. En viviendas <1 km del mar (Malvarrosa, Marina Real, Puerto), los mecanismos estándar (IP20) sufren corrosión acelerada reduciendo vida útil de 20 años a 8-10 años. Los diferenciales expuestos a humedad pueden perder sensibilidad. Prevención: usar mecanismos estancos IP44/IP55 en terrazas y cocinas/baños cerca costa (sobreprecio 40-60%). Proteger cuadro eléctrico con caja estanca IP65 si está en patio/galería. Mantenimiento: spray limpiador contactos cada 2 años.',
        category: 'aire_salino'
      },
      {
        question: '¿Qué potencia eléctrica necesito para vivienda con aire acondicionado en Valencia?',
        answer: 'Valencia requiere climatización 6-7 meses año (mayo-octubre). Vivienda 90m² con 3 splits inverter clase A++ consume: salón 2,000W + 2 dormitorios 1,200W c/u = 4,400W climatización + base vivienda 1,500W (electrodomésticos, luces) = 5,900W pico real. Añadir margen 20% → necesitas 7.0-7.5 kW mínimo (recomendable 9.2 kW si instalas cocina inducción). Potencias típicas valencianas: 3.3 kW antigua insuficiente, 5.75 kW ajustada sin margen, 7.4-9.2 kW cómoda para uso moderno. Coste aumentar 5.75→9.2 kW: derechos €25-50 + actualización cuadro €300-600 si ICP/PCS limitados.',
        category: 'potencia'
      },
      {
        question: '¿Por qué es importante la protección sobretensión en Valencia?',
        answer: 'Valencia experimenta tormentas eléctricas intensas finales verano (septiembre), con rayos que inducen sobretensiones en red eléctrica (picos 2,000-6,000V vs 230V nominal). Estas sobretensiones destruyen: televisiones, ordenadores, electrodomésticos con electrónica, sistemas domóticos, cuadros mandos climatización. Un SIPS (Sobreintensión Permanente) clase II en cuadro (€45-80) desvía sobretensiones a tierra protegiendo instalación. Recomendable en viviendas con valor electrónico >€3,000. Instalación por electricista: €60-100 mano obra. En urbanizaciones con línea aérea (más expuesta a rayos), es crítico. Revisar/reemplazar cada 3-5 años tras tormentas significatives.',
        category: 'proteccion'
      },
      {
        question: '¿Cuándo revisar instalación eléctrica en viviendas valencianas antiguas?',
        answer: 'Edificios valencianos 1960-1980 (expansión desarrollismo) tienen instalaciones 40-60 años con: cables tela/goma degradados, cuadros fusibles cerámicos sin diferencial, enchufes sin tierra, sección cables subdimensionada (1.5mm² vs 2.5mm² actual). Señales alarma: enchufes/interruptores calientes al tacto, olor cable quemado, luces parpadean, diferencial salta sin motivo. Revisión técnica profesional (€180-300) con medición: resistencia aislamiento (megóhmetro), continuidad tierra, verificación protecciones. Si detecta anomalía seria, renovación prioritaria: cuadro+diferencial (€600-900) primero, después circuitos críticos baño/cocina (€800-1,400).',
        category: 'mantenimiento'
      },
      {
        question: '¿Qué cubre el boletín eléctrico en Valencia y cuándo es necesario?',
        answer: 'En Comunidad Valenciana, el Certificado Instalación Eléctrica (boletín) es obligatorio tras: nueva instalación, ampliación >5 kW potencia, reforma >25% circuitos, cambio uso local (residencial↔comercial). Electricista autorizado inspecciona según REBT, mide tierra (<20Ω residencial), verifica protecciones y emite certificado registrable en IVACE (Industria), requisito para que Iberdrola active suministro o aumente potencia. Coste Valencia vivienda 70-100m²: €150-220 certificado + €45-65 registro oficial. Plazo emisión: 5-10 días hábiles. Sin boletín, distribuidora niega alta/modificación legalmente.',
        category: 'certificacion'
      }
    ],
    keywords: {
      primary: [
        'electricista valencia',
        'electricista urgente valencia',
        'electricista 24 horas valencia',
        'boletín eléctrico valencia',
        'cuadro eléctrico valencia'
      ],
      secondary: [
        'electricista aire acondicionado valencia',
        'aumentar potencia eléctrica valencia',
        'cambiar diferencial valencia',
        'instalación eléctrica valencia',
        'electricista certificado valencia'
      ],
      longTail: [
        'por qué saltan magnetotérmicos verano valencia',
        'qué potencia eléctrica necesito aire acondicionado valencia',
        'cuánto cuesta boletín eléctrico valencia',
        'electricista urgente domingo valencia',
        'protección sobretensión tormentas valencia'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  // Sevilla, Málaga, Zaragoza for Electricista
  {
    serviceId: 'electricista',
    citySlug: 'sevilla',
    metadata: {
      title: 'Electricista en Sevilla 24h | Urgencias y Certificaciones',
      description: 'Electricista certificado en Sevilla. Expertos en instalaciones resistentes al calor extremo. Servicio urgente 24h. Boletines eléctricos autorizados.'
    },
    seoText: 'Sevilla enfrenta condiciones eléctricas específicas derivadas de su clima extremo. Los veranos con temperaturas sostenidas de 38-45°C durante semanas generan estrés térmico severo en instalaciones eléctricas: cables empotrados alcanzan 65-75°C, reduciendo capacidad de conducción y acelerando degradación del aislamiento PVC en instalaciones antiguas. El uso masivo simultáneo de climatización (mayo-octubre, 16-18h/día) sobrecarga cuadros eléctricos dimensionados para consumos históricos menores. En el casco histórico (Arenal, Santa Cruz, Triana), los edificios con muros de carga de 80-120cm complican detección de averías y renovaciones. La red de Endesa es estable pero experimenta picos de demanda críticos en tardes de julio-agosto (18:00-22:00) cuando 90% de viviendas activan climatización.',
    faqs: [
      {
        question: '¿Por qué saltan los magnetotérmicos más en verano en Sevilla?',
        answer: 'El calor sevillano (40-45°C) genera doble efecto: 1) Cables empotrados alcanzan 65-75°C, reduciendo capacidad conducción 25-30%; 2) Uso simultáneo masivo de climatización sobrecarga instalación. Un piso 85m² con 2 splits (3,500W) + cocina (2,000W) + electrodomésticos (1,500W) suma 7,000W pico. Si potencia contratada es 5.75 kW, magnetotérmico salta légitimamente. Solución inmediata: gestionar cargas, apagar splits al cocinar. Solución definitiva: aumentar potencia a 9.2 kW y actualizar cuadro con magnetotérmicos curva C adecuados. Coste: €40-70 derechos + €300-600 obra cuadro.',
        category: 'calor_extremo'
      },
      {
        question: '¿Cómo proteger instalación eléctrica del calor extremo en Sevilla?',
        answer: 'El calor sevillano degrada instalaciones eléctricas aceleradamente. Protección: 1) Ventilar cuadro eléctrico (instalar rejillas ventilación si está en armario cerrado); 2) No sobrecargar enchufes en verano (max 2,500W/regleta vs 3,500W en invierno); 3) Revisar cables en falsos techos no ventilados (pueden alcanzar 80°C); 4) Usar magnetotérmicos con compensación térmica si cuadro en zona caliente; 5) Instalar ventilador extracción en cuadros de garajes/trasteros sin climatización. Inversión €150-400 previene averías: cables que se derriten cuestan €800-2,000 renovar.',
        category: 'prevencion'
      },
      {
        question: '¿Qué potencia eléctrica necesito en Sevilla con aire acondicionado?',
        answer: 'Sevilla requiere uso de aires 6-7 meses (mayo-octubre). Vivienda 90m² consume: 2 splits salón/dormitorio (3,500W) + base vivienda (1,500W) + picos cocina (2,000W) = 7,000W simultáneos probables. Potencias: 5.75 kW ajustada límite (salta si coinciden cargas), 7.5 kW cómoda, 9.2 kW holgada si tienes inducción. En Sevilla, muchos aumentan a 9.2 kW tras primer verano con cortes. Coste aumentar 5.75→9.2 kW: derechos €30-60 + obra cuadro €250-500 si ICP antiguo. Amortización: 2-3 veranos sin cortes molestos.',
        category: 'dimensionamiento'
      },
      {
        question: '¿Por qué hay tantos cortes de luz en tardes de verano en Sevilla?',
        answer: 'Las tardes sevillanas julio-agosto (18:00-22:00, temp 38-42°C) concentran demanda máxima: 90% viviendas con aires encendidos + inicio actividad tras siesta. Las acometidas generales edificios antiguos (diseñadas para 3 kW/vivienda años 70) soportan mal demanda actual (7-9 kW/vivienda). Endesa corta sectores sobrecargados evitando daño transformadores. Solución individual: splits inverter clase A+++ consumen 40% menos. Solución comunitaria: ampliación acometida (€4,000-9,000 edificio 15 viviendas, gestión presidente). Urbanizaciones nuevas tienen infraestructura adecuada; problem afecta centro/barrios históricos.',
        category: 'suministro'
      },
      {
        question: '¿Cuánto cuesta renovar instalación eléctrica en edificio antiguo de Sevilla?',
        answer: 'Edificios casco histórico Sevilla (Santa Cruz, Arenal) tienen muros muy gruesos complicando obra. Renovación piso 80m²: €4,500-7,500 incluyendo cuadro moderno (€700-1,000), cableado RZ1-K ignífugo resistente calor (€28-38/m instalado), mecanismos estancos zonas húmedas (€450-750), puntos luz LED bajo consumo (€400-650), boletín y legalización (€180-250). Si edificio catalogado, añadir €800-1,200 supervisión patrimonio. Plazo: 6-9 días con piso vacío. Muchas comunidades renuevan por ITE; consultar posibles ayudas municipales (Rehabilitación Integral Sevilla).',
        category: 'renovacion'
      },
      {
        question: '¿Qué cubre boletín eléctrico en Sevilla y cuándo es obligatorio?',
        answer: 'En Andalucía, el Certificado Instalación Eléctrica es obligatorio tras: nueva instalación, ampliación >10% potencia, reforma >25% circuitos, ITE desfavorable. Electricista autorizado inspecciona según REBT, mide tierra (<37Ω Andalucía), verifica protecciones magnetotérmicas/descubiertales adecuadas para clima cálido, emite certificado registrable en Junta Andalucía (Industria). Coste Sevilla vivienda 75-95m²: €140-210 certificado + €40-60 registro. Plazo: 7-12 días hábiles. Sin boletín, Endesa rechaza alta o aumento potencia. En ITE Sevilla exigen boletín si detectan instalación pre-1980 sin protecciones modernas.',
        category: 'certificacion'
      }
    ],
    keywords: {
      primary: [
        'electricista sevilla',
        'electricista urgente sevilla',
        'electricista 24 horas sevilla',
        'boletín eléctrico sevilla',
        'cuadro eléctrico sevilla'
      ],
      secondary: [
        'electricista aire acondicionado sevilla',
        'aumentar potencia sevilla',
        'instalación eléctrica sevilla',
        'electricista certificado sevilla',
        'saltan magnetotérmicos verano sevilla'
      ],
      longTail: [
        'por qué saltan magnetotérmicos verano sevilla',
        'proteger instalación eléctrica calor sevilla',
        'qué potencia necesito aire acondicionado sevilla',
        'cortes luz tardes verano sevilla',
        'cuánto cuesta renovar electricidad sevilla'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'electricista',
    citySlug: 'malaga',
    metadata: {
      title: 'Electricista en Málaga 24h | Expertos en Zonas Costeras',
      description: 'Electricista certificado en Málaga. Especialistas en corrosión salina y humedad costera. Servicio urgente 24h en toda la Costa del Sol. Boletines autorizados.'
    },
    seoText: 'Málaga presenta condiciones eléctricas particulares por su ubicación costera mediterránea. La humedad ambiental alta (65-80%) combinada con aerosoles salinos del mar acelera corrosión de contactos eléctricos, especialmente en zonas como Huelin, Pedregalejo, El Palo, donde la brisa marina impacta directamente instalaciones. Los magnetotérmicos y diferenciales expuestos a humedad salina pierden fiabilidad: contactos se oxidan, mecanismos se agarrotan. Las viviendas turísticas costeras experimentan uso intensivo estacional (mayo-octubre) seguido de desocupación invernal, generando ciclos de carga que estresan instalaciones. Los edificios del centro histórico conservan cableado antiguo con aislamiento textil/goma degradado por humedad. La red eléctrica de Endesa es robusta, pero urbanizaciones costeras con uso turístico intensivo experimentan sobrecargas en julio-agosto.',
    faqs: [
      {
        question: '¿Cómo afecta la salinidad costera a instalaciones eléctricas en Málaga?',
        answer: 'La proximidad al mar en Málaga (Malagueta, Pedregalejo, zonas costeras <500m) genera aerosoles salinos que se depositan en mecanismos eléctricos. La sal (NaCl) es higroscópica (absorbe humedad) y conduce electricidad, provocando: 1) Oxidación acelerada contactos cobre/latón; 2) Cortocircuitos en enchufes exteriores; 3) Pérdida sensibilidad diferenciales; 4) Magnetotérmicos se agarrotan. Prevención: usar mecanismos estancos IP55 en exteriores (€10-18/unidad), proteger cuadro con caja IP65 si está en terraza/galería, aplicar spray limpiador contactos anual (€15-25). Vida útil mecanismos zona costera: 8-12 años vs 15-20 años interior.',
        category: 'salinidad'
      },
      {
        question: '¿Qué mantenimiento necesitan viviendas vacacionales costeras en Málaga?',
        answer: 'Las viviendas turísticas costeras Málaga requieren mantenimiento eléctrico intensificado: 1) Revisión pre-temporada (abril): verificar magnetotérmicos, limpiar contactos oxidados, comprobar diferenciales (test mensual); 2) Inspección Mediados-temporada (julio): revisar sobrecalentamientos, comprobar consumos anómalos; 3) Preparación post-temporada (noviembre): cerrar circuitos no esenciales, proteger cuadro. Contrato mantenimiento preventivo: €200-350/año. Ahorra: fallo diferencial en plena temporada cuesta €400-700 urgencia + pérdidas alquiler (€800-2,000/semana). Muchos propietarios lo incluyen en gestión inmobiliaria.',
        category: 'viviendas_turisticas'
      },
      {
        question: '¿Por qué fallan tanto los diferenciales en zonas húmedas de Málaga?',
        answer: 'La humedad relativa alta Málaga (70-85% invierno, 60-75% verano) penetra cuadros eléctricos mal sellados, generando condensación en circuitos internos diferenciales. La sal del aire acelera corrosión. Síntomas: diferencial salta sin motivo aparente, no rearma, tarda en actuar. Los diferenciales de 30mA (alta sensibilidad) son más susceptibles. Solución: reemplazar diferencial cada 8-10 años en zona costera (€45-80 + €60-90 mano obra), instalar cuadro en caja estanca IP65 (€90-150), aplicar spray antihumedad periódicamente. Test diferencial mensualmente (botón T); si no dispara, reemplazar inmediatamente (riesgo ser humano).',
        category: 'diferenciales'
      },
      {
        question: '¿Cuánto cuesta instalación eléctrica en apartamento costero de Málaga?',
        answer: 'Apartamento turístico típico 60-80m² zona costera Málaga: instalación completa €3,800-6,500 incluyendo cuadro estanco IP65 (€800-1,100), cableado resistente humedad RZ1-K (€26-36/m), mecanismos estancos IP44 cocina/baños + IP55 terrazas (€500-850 total), 4-6 splits pre-instalación (€300-500), domótica básica control remoto (€400-700), boletín (€160-220). Usar materiales anticorrosión (acero inox, plásticos técnicos) añade 15-20% pero duplica vida útil. Inversión se amortiza: instalación estándar falla en 7-10 años; resistente  dura 15-20 años en costa.',
        category: 'costes'
      },
      {
        question: '¿Por qué hay tantos cortes en verano en zonas turísticas de Málaga?',
        answer: 'Costa del Sol (Torremolinos, Benalmádena, Fuengirola, Marbella) experimenta picos demanda julio-agosto por densificación turística. Cada apartamento vacacional usa: 2-3 aires (4,000-6,000W), cocina (2,000W), electrodomésticos (1,500W) = 7,500-9,500W simultáneos. Infraestructura eléctrica diseñada para uso residencial moderado resulta insuficiente. Endesa corta sectores sobrecargados evitando daño transformadores. Solución individual: splits inverter A+++ reducen consumo 40%. Solución urbanización: ampliación transformador y acometidas (gestión comunidad + Endesa, €15,000-40,000 según tamaño). Nuevos complejos turísticos ya dimensionan adecuadamente; problema afecta edificios 80-90.',
        category: 'infraestructura'
      },
      {
        question: '¿Qué precauciones tomar con instalaciones eléctricas en primera línea de playa?',
        answer: 'Viviendas <100m del mar requieren protección especial: 1) Cuadro eléctrico en caja estanca IP65+ (€120-200); 2) Mecanismos exteriores IP55 mínimo (€12-20/unidad); 3) Cableado con aislamiento XLPE/EPR resistente UV y humedad (no PVC estándar); 4) Magnetotérmicos/diferenciales con tratamiento anticorrosión; 5) Revisión anual completa (€150-280); 6) Limpieza contactos semestral. Los seguros hogar pueden exigir certificado instalación adecuada para zona costera. Inversión inicial 25-30% mayor que interior, pero previene averías costosas y peligrosas (cortocircuitos por sal pueden iniciar incendios).',
        category: 'primera_linea'
      }
    ],
    keywords: {
      primary: [
        'electricista malaga',
        'electricista urgente malaga',
        'electricista 24 horas malaga',
        'electricista costa del sol',
        'boletín eléctrico malaga'
      ],
      secondary: [
        'electricista zona costera malaga',
        'corrosión salina instalaciones malaga',
        'electricista vivienda turística malaga',
        'diferencial salta malaga',
        'instalación eléctrica apartamento malaga'
      ],
      longTail: [
        'cómo afecta salinidad instalaciones eléctricas malaga',
        'mantenimiento vivienda vacacional costera malaga',
        'por qué fallan diferenciales zonas húmedas malaga',
        'cuánto cuesta instalación eléctrica apartamento costero malaga',
        'precauciones eléctricas primera línea playa malaga'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'electricista',
    citySlug: 'zaragoza',
    metadata: {
      title: 'Electricista en Zaragoza 24h | Expertos en Clima Continental',
      description: 'Electricista certificado en Zaragoza. Especialistas en instalaciones resistentes a cambios térmicos extremos. Servicio urgente 24h. Boletines autorizados.'
    },
    seoText: 'Zaragoza presenta condiciones eléctricas únicas derivadas de su clima continental extremo. Las oscilaciones térmicas anuales (-8°C invierno, +40°C verano) generan estrés por ciclos dilatación-contracción que debilitan conexiones eléctricas: tornillos de bornas se aflojan, empalmes pierden contacto, juntas se agrietan. El cierzo (viento 40-80 km/h frecuente) enfría rápidamente fachadas norte donde discurren instalaciones, aumentando pérdidas calor en calefacción eléctrica. Los inviernos con heladas (-5 a 0°C, diciembre-febrero) obligan a uso intensivo calefacción eléctrica, radiadores, bombas calor que sobrecargan instalaciones dimensionadas para consumos menores. En el casco histórico (Casco Viejo, San Pablo, Magdalena), los edificios antiguos conservan cableado original con aislamiento degradado por ciclos térmicos.',
    faqs: [
      {
        question: '¿Cómo afectan los cambios térmicos extremos a instalaciones en Zaragoza?',
        answer: 'Zaragoza sufre oscilación térmica anual 48°C (-8°C invierno, +40°C verano) que provoca: 1) Dilatación/contracción cíclica afloja tornillos bornas cuadro (pérdida contacto, chispas, calentamiento); 2) Cables PVC antiguos se agrietan por fatiga térmica; 3) Juntas empalmes se deterioran; 4) Magnetotérmicos calibrados a 25°C pierden precisión en extremos. Prevención: revisar apriete bornas anualmente (€80-120 mano obra), usar cables XLPE/EPR resistentes térmicos, instalar magnetotérmicos compensados temperatura. Si cuadro está en zona no climatizada (garaje), protegerlo con caja térmica. Síntoma alarma: olor cable quemado, chispas al accionar interruptor.',
        category: 'clima_extremo'
      },
      {
        question: '¿Qué potencia eléctrica necesito en Zaragoza con calefacción eléctrica?',
        answer: 'Zaragoza con inviernos fríos (-5 a +5°C, diciembre-febrero) y veranos calurosos (35-40°C, julio-agosto) requiere alta potencia. Vivienda 90m² con climatización completa consume: invierno 4-6 kW calefacción + base 1,5 kW = 5,5-7,5 kW; verano 3-4 kW climatización + base = 4,5-5,5 kW. Si añades cocina inducción (+3,5 kW pico), necesitas 9.2-11.5 kW. Potencias típicas Zaragoza: 5.75 kW ajustada sin margen, 7.5 kW suficiente uso moderado, 9.2 kW cómoda, 11.5 kW si bomba calor aerotérmica. Coste aumentar 5.75→9.2 kW: €35-65 derechos + €300-650 obra cuadro.',
        category: 'dimensionamiento'
      },
      {
        question: '¿Por qué es importante el diferencial en instalaciones de Zaragoza?',
        answer: 'Los edificios antiguos Zaragoza (casco viejo, barrios históricos) carecen toma tierra adecuada o tienen resistencia alta (>50Ω vs <15Ω reglamentario). Sin tierra efectiva, el diferencial 30mA es la ÚNICA protección contra electrocución. En ambiente seco zaragozano (HR 40-60%), el riesgo choque eléctrico aumenta (piel seca conduce peor, se necesita más corriente para sentir, pero daño es mayor). El diferencial debe revisarse mensualmente (botón test T): si no dispara, reemplazar urgente. Cambio diferencial: €45-75 + €60-90 mano obra. En Zaragoza es crítico verificar diferencial funciona; puede salvar vida si hay fallo aislamiento en electrodoméstico.',
        category: 'seguridad'
      },
      {
        question: '¿Cuánto cuesta renovar instalación eléctrica en edificio antiguo de Zaragoza?',
        answer: 'Edificios casco histórico Zaragoza (construcción 1900-1970) requieren renovación completa. Piso 80m²: €4,200-7,000 incluyendo cuadro moderno con diferencial (€700-950), cableado XLPE resistente cambios térmicos (€27-37/m instalado), mecanismos táctiles modernos (€400-700), toma tierra nueva si no existe (€300-600 edificada antiguo), puntos luz LED (€350-600), boletín eléctrico Aragón (€150-220). Plazo: 6-8 días laborables con piso vacío. ITE Zaragoza obliga actualización si detecta instalación pre-1980 sin protecciones. Algunas comunidades acceden a programas rehabilitación energética (ayudas hasta 40%).',
        category: 'renovacion'
      },
      {
        question: '¿Por qué saltan diferenciales en invierno con calefacción en Zaragoza?',
        answer: 'El uso intensivo calefacción eléctrica invierno zaragozano estresa instalaciones: radiadores, bomba calor, termoventiladores suman 4-6 kW continuos. Si instalación tiene derivaciones por humedad (condensación en muros fríos), cableado deteriorado o electrodomésticos antiguos sin clase II, el diferencial detecta fugas a tierra y desconecta. Diagnóstico: electricista mide resistencia aislamiento con megóhmetro; si <0.5 MΩ hay fuga. Causas comunes: termos eléctricos viejos (resistencia derivación), cables rotos en cajas derivación, humedad en enchufes baño/cocina. Reparación: desde €120 (localizar y aislar) hasta €800 (renovar circuito completo).',
        category: 'calefaccion'
      },
      {
        question: '¿Qué cubre boletín eléctrico en Zaragoza y cuándo es obligatorio?',
        answer: 'En Aragón, el Certificado Instalación Eléctrica es obligatorio tras: nueva instalación, modificación sustancial (>25% circuitos), aumento potencia >10%, ITE desfavorable, cambio titularidad local (compraventa local comercial). Electricista autorizado inspecciona según REBT: cuadro con protecciones adecuadas clima continental (magnetotérmicos compensados), diferencial ≥30mA, toma tierra <15Ω, cables con aislamiento resistente cambios térmicos. Emite certificado registrable Gobierno Aragón (Industria). Coste vivienda 70-100m²: €140-210 certificado + €40-55 registro oficial. Plazo: 7-10 días hábiles. Sin boletín, Iberdrola/Endesa rechazan alta o modificación contrato.',
        category: 'certificacion'
      }
    ],
    keywords: {
      primary: [
        'electricista zaragoza',
        'electricista urgente zaragoza',
        'electricista 24 horas zaragoza',
        'boletín eléctrico zaragoza',
        'cuadro eléctrico zaragoza'
      ],
      secondary: [
        'electricista calefacción eléctrica zaragoza',
        'aumentar potencia zaragoza',
        'diferencial salta invierno zaragoza',
        'instalación eléctrica zaragoza',
        'electricista casco viejo zaragoza'
      ],
      longTail: [
        'cómo afectan cambios térmicos instalaciones zaragoza',
        'qué potencia necesito calefacción eléctrica zaragoza',
        'por qué importante diferencial zaragoza',
        'cuánto cuesta renovar electricidad edificio antiguo zaragoza',
        'saltan diferenciales invierno calefacción zaragoza'
      ]
    },
    lastUpdated: '2026-05-22'
  }
]

/**
 * Helper function to get city-specific SEO content
 * 
 * @param serviceId - Service identifier (e.g., 'fontanero')
 * @param citySlug - City slug (e.g., 'valencia')
 * @returns CitySEOContent or undefined if not found
 */
export function getCitySEOContent(
  serviceId: string,
  citySlug: string
): CitySEOContent | undefined {
  return citySEOContent.find(
    (content) => content.serviceId === serviceId && content.citySlug === citySlug
  )
}

/**
 * Helper function to check if city-specific content exists
 * 
 * @param serviceId - Service identifier
 * @param citySlug - City slug
 * @returns boolean indicating if content exists
 */
export function hasCitySEOContent(
  serviceId: string,
  citySlug: string
): boolean {
  return getCitySEOContent(serviceId, citySlug) !== undefined
}
