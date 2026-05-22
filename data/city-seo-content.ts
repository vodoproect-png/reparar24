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
