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
      title: 'Fontanero Madrid | Urgencias Profesionales 24 Horas',
      description: 'Fontanero profesional en Madrid. Especialistas en edificios antiguos y presión de agua. Atención urgente 24h en Centro, Salamanca, Chamberí, Retiro. Presupuesto gratuito.'
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
      title: 'Fontanero en Barcelona 24h: Expertos en Eixample y Ciutat Vella',
      description: 'Fontanero profesional en Barcelona. Especialistas en humedad, tuberías antiguas del Eixample y edificios modernistas. Urgencias 24h en Gràcia, Born, Raval y Sants. Consulta sin compromiso.'
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
      title: 'Fontanero en Valencia 24h – Servicio Urgente en Todos los Barrios',
      description: 'Fontanero profesional en Valencia. Expertos en edificios del centro histórico y zonas costeras. Urgencias 24h en Ruzafa, Campanar, Benimaclet y toda la ciudad. Valoración gratuita.'
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
      title: 'Electricista en Madrid 24h – Urgencias Eléctricas Certificadas',
      description: 'Electricista profesional certificado en Madrid. Expertos en cuadros eléctricos, diferenciales y boletines. Servicio urgente 24h. Consulta sin compromiso.'
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
      title: 'Electricista en Barcelona 24h: ITE Eléctrica y Urgencias',
      description: 'Electricista certificado en Barcelona. Especialistas en fincas antiguas, humedad costera e ITE eléctricas. Urgencias 24h. Boletines autorizados.'
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
      title: 'Electricista en Valencia 24h | Urgencias y Boletines Eléctricos',
      description: 'Electricista profesional en Valencia. Expertos en climatización eléctrica y aire salino costero. Atención urgente 24h en toda la ciudad. Boletines certificados.'
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
  },

  // ============================================================================
  // DESATASCOS (DRAIN UNBLOCKING) - CITY SEO CONTENT
  // Enterprise-grade semantic authority hubs for drainage services
  // ============================================================================

  {
    serviceId: 'desatascos',
    citySlug: 'madrid',
    metadata: {
      title: 'Desatascos en Madrid 24h – Urgencias en Bajantes y Tuberías',
      description: 'Servicio profesional de desatascos en Madrid. Expertos en bajantes comunitarias y edificios verticales. Urgencias 24h con cámara de inspección.'
    },
    seoText: 'Madrid presenta desafíos específicos de desagüe derivados de su densidad urbana y edificios verticales de 5-8 plantas. Las bajantes comunitarias de edificios construidos entre 1950-1980 acumulan décadas de residuos, con diámetros reducidos por incrustaciones de cal, grasa y sedimentos. Los atascos en comunidades grandes afectan múltiples viviendas simultáneamente, requiriendo intervención profesional con equipos de alta presión. Los edificios del centro histórico (Austrias, Malasaña, Lavapiés) conservan redes de saneamiento originales con arquetas empotradas de difícil acceso. La escasa pluviometría madrileña (400mm anuales) impide que la lluvia limpie naturalmente las tuberías, favoreciendo acumulación progresiva de residuos orgánicos y minerales.',
    faqs: [
      {
        question: '¿Por qué se atascan más las bajantes en edificios altos de Madrid?',
        answer: 'Los edificios verticales madrileños generan flujo descendente de hasta 7-8 plantas que acumula presión y velocidad, arrastrando residuos que se depositan en cambios de dirección (codos, arquetas). Las bajantes antiguas (hierro fundido pre-1980) tienen rugosidad interna donde se adhieren grasas. En comunidades de 20+ viviendas, el uso simultáneo sobrecarga la red. Atascos típicos ocurren en arquetas principales (sótano) donde confluyen múltiples bajantes. Prevención: desatasco preventivo anual comunitario (€400-800 edificio completo). Reparación urgencia: €180-400 según acceso.',
        category: 'edificios_verticales'
      },
      {
        question: '¿Qué hacer ante atasco en bajante comunitaria que inunda mi vivienda?',
        answer: 'Protocolo inmediato: 1) Cierra válvula entrada agua (evita agravar inundación); 2) NO uses más desagües (WC, fregadero, lavadora); 3) Avisa presidente comunidad; 4) Llama desatascos urgente 24h; 5) Documenta daños con fotos para seguro. El técnico inspeccionará con cámara la bajante, localizará obstrucción y desobstruirá con camión cuba (presión 150-200 bar). Coste: €250-600 emergencia nocturna. El seguro comunitario cubre la mayor parte; conserva factura. Tiempo resolución: 1-3 horas típicamente.',
        category: 'emergencias'
      },
      {
        question: '¿Cuánto cuesta desatascar tuberías con cámara de inspección en Madrid?',
        answer: 'Tarifas Madrid: Inspección cámara €80-150 (localiza exactamente el atasco sin romper). Desatasco simple fregadero/inodoro: €69-120. Desatasco bajante comunitaria: €200-450. Desatasco con camión cuba (alta presión): €300-700. Desatascos urgentes nocturnos/festivos: +40-60%. Incluimos inspección previa sin compromiso. La cámara identifica: ubicación exacta, tipo de obstrucción (raíces, grasa, objeto), estado tubería. Ahorra dinero evitando rozas innecesarias. La mayoría atascos resueltos sin obra.',
        category: 'precio'
      },
      {
        question: '¿Por qué los edificios antiguos del centro de Madrid se atascan más?',
        answer: 'Los edificios históricos madrileños (1880-1960) tienen: 1) Tuberías hierro fundido con rugosidad interna; 2) Diámetros reducidos (80-100mm vs 110mm actual); 3) Trazados con múltiples codos; 4) Arquetas empotradas o enterradas (difícil mantenimiento); 5) Sin separación aguas pluviales/residuales. La falta mantenimiento durante décadas genera incrustaciones que reducen sección útil hasta 50%. Raíces de árboles históricos penetran en juntas antiguas. Solución: inspección cámara (€100-180) + limpieza anual preventiva (€150-300). Evita atascos graves que cuestan €500-1,500.',
        category: 'edificios_antiguos'
      },
      {
        question: '¿Qué previene atascos en edificios comunitarios de Madrid?',
        answer: 'Mantenimiento preventivo comunitario: 1) Limpieza bajantes anual con camión cuba (€400-800 edificio 15-20 viviendas); 2) Inspección cámara cada 2-3 años (€150-300, detecta problemas temprano); 3) Educación vecinos (NO tirar: toallitas, aceite, restos comida); 4) Filtros aromáticos en sumideros (€20-40); 5) Revisión arquetas principales semestralmente. Inversión prevención: €600-1,200/año. Ahorro vs atascos graves: €2,000-5,000 (roturas, inundaciones, daños). Muchas comunidades contratan mantenimiento anual que incluye desatascos preventivos.',
        category: 'prevencion'
      },
      {
        question: '¿Cuándo es necesario cambiar las tuberías de desagüe en Madrid?',
        answer: 'Señales de renovación necesaria: 1) Atascos recurrentes (>3/año) pese a mantenimiento; 2) Cámara revela rotura, fisuras o colapso; 3) Tuberías hierro fundido con >60 años (típico en edificios pre-1960); 4) Malos olores persistentes (fisuras permiten filtraciones); 5) Humedad en paredes cercanas a bajantes. Coste renovación bajante completa edificio 6 plantas: €4,000-9,000 incluye obra + restauración. ITE puede exigir renovación si detecta riesgo. Muchas comunidades renuevan progresivamente: primero tramos críticos, después completo. Sin renovar, atascos graves pueden costar €1,000-3,000 cada vez.',
        category: 'renovacion'
      }
    ],
    keywords: {
      primary: [
        'desatascos madrid',
        'desatascos urgentes madrid',
        'desatasco bajantes madrid',
        'desatascos 24 horas madrid',
        'camión cuba madrid'
      ],
      secondary: [
        'desatasco tuberías madrid',
        'desatasco edificios madrid',
        'inspección cámara madrid',
        'desatascos comunidades madrid',
        'limpieza bajantes madrid'
      ],
      longTail: [
        'por qué se atascan bajantes edificios madrid',
        'cuánto cuesta desatascar tuberías madrid',
        'desatasco urgente bajante comunitaria madrid',
        'prevenir atascos edificios madrid',
        'cuándo renovar tuberías desagüe madrid'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'desatascos',
    citySlug: 'barcelona',
    metadata: {
      title: 'Desatascos en Barcelona 24h | Urgencias en Eixample y Ciutat Vella',
      description: 'Desatascos profesionales en Barcelona. Expertos en fincas antiguas y patios de luces. Atención urgente 24h con cámara. ITE-compliant.'
    },
    seoText: 'Barcelona enfrenta desafíos específicos de desagüe derivados de la humedad mediterránea y arquitectura del Eixample. Las fincas construidas 1900-1930 tienen bajantes que discurren por patios de luces compartidos con ventilación natural limitada, donde la humedad alta (70-85% HR) favorece formación de lodos y biofilm. Los desagües interiores que ventilan a patios acumulan grasas y cal en trazados largos con múltiples codos. En Ciutat Vella, los edificios medievales conservan redes de saneamiento centenarias con arquetas de piedra y tuberías de gres vitrificado quebradizo. Las inspecciones técnicas (ITE) obligatorias para edificios >45 años detectan frecuentemente obstrucciones crónicas que exigen limpieza profesional.',
    faqs: [
      {
        question: '¿Por qué se atascan las tuberías en fincas antiguas del Eixample?',
        answer: 'Las fincas Eixample tienen desagües que recorren distancias largas hasta patios de luces, con trazados horizontales que acumulan residuos. La humedad alta (75-85%) genera biofilm (limo bacteriano) que estrecha tuberías. Las bajantes pasan por patios donde hojas y suciedad entran por ventilaciones antiguas. Tuberías de gres (cerámica) tienen juntas donde se depositan grasas. Uso simultáneo de múltiples viviendas sobrecarga red dimensionada hace un siglo. Prevención: limpieza anual con hidrocurva (€200-400) + inspección cámara bienal (€120-250). Atascos graves cuestan €300-800 con emergencia.',
        category: 'fincas_antiguas'
      },
      {
        question: '¿Cómo afecta la ITE a desagües en Barcelona?',
        answer: 'La ITE revisa estado conductos de evacuación de edificios >45 años. Si detecta: obstrucciones, roturas, sección reducida >30% por incrustaciones, emite "desfavorable" obligando a subsanar en 12-24 meses. Típicos defectos ITE: arquetas colmatadas, bajantes fisuradas, sifones inutilizados. Coste habitual: inspección cámara completa (€300-600) + limpiezas (€400-900). Sin subsanar, pueden impedir compraventa o renovación cédula habitabilidad. Muchas comunidades aprovechan ITE para mantenimiento integral que previene futuros atascos graves.',
        category: 'inspecciones'
      },
      {
        question: '¿Qué problemas tienen los patios de luces del Eixample con desagües?',
        answer: 'Los patios de luces acumulan hojas, polvo y humedad que obstruyen sumideros y bajantes pluviales. Los desagües de cocinas/baños confluyen en bajante del patio expuesta a elementos. La ventilación natural limitada genera condensación que favorece lodos. Arquetas de patio (compartidas por múltiples viviendas) colmatan con tierra y residuos orgánicos. Acceso complicado (patio estrecho 3x3m) dificulta intervenciones. Solución: limpieza patio + sumideros trimestral (comunidad), revisión arqueta anual. Coste mantenimiento: €150-300/año. Evita atascos que cuestan €400-1,000 urgencia.',
        category: 'patios_luces'
      },
      {
        question: '¿Cuánto cuesta desatascar bajante comunitaria en Barcelona?',
        answer: 'Tarifas Barcelona: Desatasco simple inodoro/fregadero: €75-140. Desatasco bajante comunitaria: €220-550 según acceso y profundidad. Limpieza con camión cuba (alta presión 180 bar): €350-800. Inspección cámara: €90-180. Urgencias nocturnas/festivos: +50-70%. En edificios catalogados (Patrimoni): +30-50% por restricciones acceso. La mayoría atascos resueltos sin obra. Incluimos inspección previa gratuita. Si ITE obliga limpieza integral, €600-1,500 edificio completo. Presupuesto sin compromiso antes intervenir.',
        category: 'precio'
      },
      {
        question: '¿Por qué desagües se atascan más en invierno en Barcelona?',
        answer: 'El invierno barcelonés (8-12°C) enfría grasas de cocina que se solidifican en tuberías horizontales. Las lluvias intensas (octubre-noviembre) arrastran hojas que obstruyen sumideros de patios. La calefacción encendida genera condensación en bajantes que atraviesan zonas frías, favoreciendo biofilm. Uso mayor de duchas calientes (grasas corporales, jabones) acumula residuos. Menor temperatura retrasa degradación bacteriana de residuos orgánicos. Prevención: usar agua caliente tras cocinar con aceite, limpieza sumideros pre-invierno, revisión arquetas octubre. Atascos invierno: €300-700 vs verano €200-500.',
        category: 'estacional'
      }
    ],
    keywords: {
      primary: [
        'desatascos barcelona',
        'desatascos urgentes barcelona',
        'desatascos eixample',
        'desatascos 24 horas barcelona',
        'camión cuba barcelona'
      ],
      secondary: [
        'desatasco bajantes barcelona',
        'desatasco fincas antiguas barcelona',
        'ITE desagües barcelona',
        'desatascos ciutat vella',
        'inspección cámara barcelona'
      ],
      longTail: [
        'por qué se atascan tuberías fincas antiguas eixample',
        'cómo afecta ITE desagües barcelona',
        'problemas patios luces eixample desagües',
        'cuánto cuesta desatascar bajante barcelona',
        'desagües se atascan más invierno barcelona'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'desatascos',
    citySlug: 'valencia',
    metadata: {
      title: 'Desatascos en Valencia 24h: Urgencias en Zonas Costeras',
      description: 'Desatascos profesionales en Valencia. Especialistas en arena, residuos turísticos y humedad mediterránea. Urgencias 24h con cámara.'
    },
    seoText: 'Valencia presenta particularidades de desagüe derivadas de su proximidad al mar y clima mediterráneo. Las zonas costeras (Malvarrosa, Cabanyal, El Saler) experimentan infiltración de arena fina en desagües por el viento y afluencia de playa. Los apartamentos turísticos en zonas como Ruzafa o Ciudad de las Artes generan uso intensivo con residuos atípicos (toallitas, productos higiene, restos comida) que obstruyen redes dimensionadas para uso residencial. La humedad ambiental alta (60-75%) favorece biofilm en tuberías horizontales. Las lluvias torrenciales otoñales (gota fría) saturan sistemas combinados de aguas residuales y pluviales, generando reflujos en plantas bajas.',
    faqs: [
      {
        question: '¿Cómo afecta la arena de playa a los desagües en Valencia?',
        answer: 'En zonas costeras (Malvarrosa, Cabanyal, Poblats Marítims), la arena fina transportada por viento o en calzado/toallas se acumula en sifones de ducha y sumideros. Arena + grasas forma sedimento compacto que obstruye tuberías horizontales. Los apartamentos vacacionales generan mayor volumen arena (turistas retorno playa). Prevención: alfombrillas pre-ducha, enjuague pies antes entrar, limpieza sifones mensual (€5-10 autoservicio o €40-70 profesional). Desatasco arena compactada: €90-200. En viviendas costeras <300m mar, incluir limpieza preventiva trimestral (€150-300/año) ahorra atascos graves (€400-800).',
        category: 'arena_costera'
      },
      {
        question: '¿Por qué viviendas turísticas en Valencia tienen más atascos?',
        answer: 'Los apartamentos vacacionales valencianos experimentan uso intensivo por múltiples huéspedes con hábitos diferentes: tiran toallitas (aunque ponga NO), restos comida, productos higiene inadecuados. Rotación semanal genera ciclos de alta carga-desocupación que estresan tuberías sin mantenimiento regular. Arena, protectores solares y grasas se acumulan rápido. Propietarios remotos no detectan problemas tempranos. Solución: contrato mantenimiento (€200-400/año incluye revisión post-ocupación, limpieza preventiva trimestral, inspección anual). Evita urgencias plena temporada que cuestan €400-900 + pérdida reservas (€800-2,000/semana).',
        category: 'viviendas_turisticas'
      },
      {
        question: '¿Qué hacer ante reflujo de desagüe en planta baja en Valencia?',
        answer: 'Los reflujos en plantas bajas ocurren cuando red alcantarillado se satura (lluvias torrenciales, obstrucción comunitaria) y el agua busca salida por punto más bajo. Protocolo: 1) NO usar más desagües; 2) Cierra válvula antiretorno si existe (algunas viviendas costeras la tienen); 3) Llama desatascos urgente 24h; 4) Documenta daños para seguro; 5) Ventila para evitar gases. El técnico verificará si obstrucción es individual o comunitaria/municipal. Instalación válvula antiretorno: €200-450, IMPRESCINDIBLE en plantas bajas zonas inundables. Seguro hogar debe cubrir daños; conserva facturas.',
        category: 'reflujos'
      },
      {
        question: '¿Cuánto cuesta desatasco urgente en Valencia fin de semana?',
        answer: 'Tarifas urgencias 24h Valencia: Desatasco simple inodoro/fregadero laborables €65-130, sábados €90-170, domingos/festivos €110-200. Bajante comunitaria laborables €200-500, urgencia fin de semana €300-750. Camión cuba alta presión: €350-900. Inspección cámara: €80-160. Temporada alta (julio-agosto) en zonas turísticas: posible suplemento 10-15%. Ofrecemos presupuesto previo transparente. Mayoría urgencias resueltas en 1-2 horas. Servicio 24h todos los días. Exige siempre cotización antes autorizar trabajos.',
        category: 'precio'
      },
      {
        question: '¿Cómo prevenir atascos por gota fría en Valencia?',
        answer: 'La gota fría valenciana (septiembre-octubre) genera lluvias torrenciales (100-200 mm en pocas horas) que saturan sistema combinado aguas residuales/pluviales. Prevención: 1) Limpieza sumideros terraza/patio pre-septiembre (€40-80); 2) Revisión arquetas bajantes pluviales agosto (€60-120); 3) Instalar válvula antiretorno si vives en planta baja zona inundable (€200-450); 4) NO tires nada por desagües días previos/durante tormentas; 5) Mantener sumideros libres de hojas. Inversión prevención: €200-400. Evita reflujos que causan daños €1,000-5,000 (limpieza, reposición, desinfección).',
        category: 'prevencion_climatica'
      }
    ],
    keywords: {
      primary: [
        'desatascos valencia',
        'desatascos urgentes valencia',
        'desatascos 24 horas valencia',
        'desatasco tuberías valencia',
        'camión cuba valencia'
      ],
      secondary: [
        'desatascos zona costera valencia',
        'desatasco vivienda turística valencia',
        'desatascos malvarrosa',
        'desatascos ruzafa',
        'inspección cámara valencia'
      ],
      longTail: [
        'cómo afecta arena playa desagües valencia',
        'por qué viviendas turísticas más atascos valencia',
        'qué hacer reflujo desagüe planta baja valencia',
        'cuánto cuesta desatasco urgente valencia',
        'prevenir atascos gota fría valencia'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'desatascos',
    citySlug: 'sevilla',
    metadata: {
      title: 'Desatascos en Sevilla 24h | Expertos en Calor Extremo',
      description: 'Desatascos profesionales en Sevilla. Especialistas en grasa solidificada y evaporación rápida. Servicio urgente 24h. Edificios históricos.'
    },
    seoText: 'Sevilla enfrenta desafíos únicos de desagüe derivados de su calor extremo. Las temperaturas estivales de 40-45°C durante semanas generan evaporación rápida de agua en sifones, permitiendo que gases malolientes del alcantarillado penetren en viviendas. Las grasas de cocina se solidifican al enfriarse en tuberías subterráneas más frías (20-25°C), formando depósitos duros que obstruyen progresivamente. El uso intensivo de agua en verano (duchas frecuentes, limpieza) arrastra mayor volumen de grasas y jabones. Los edificios del casco histórico (Santa Cruz, Triana, Arenal) conservan redes de saneamiento centenarias con arquetas profundas de difícil acceso.',
    faqs: [
      {
        question: '¿Por qué las grasas atascan más en verano en Sevilla?',
        answer: 'El calor sevillano (40-45°C) derrite grasas en cocina, que se vierten líquidas por desagües. Al descender por tuberías enterradas (20-25°C), se enfrían y solidifican adhiriéndose a paredes. Ciclos repetidos forman capas duras que estrechan sección. Más cocina casera en verano (evitar salir calor) genera >30% más grasas. Jabones de ducha frecuente (2-3/día en verano) se mezclan con grasas formando masa jabonosa. Prevención: verter café molido tras cocinar con aceite (absorbe grasa), usar agua muy caliente para limpiar platos, limpieza con desengrasante químico mensual (€15-30). Desatasco grasa solidificada: €120-350.',
        category: 'grasa_calor'
      },
      {
        question: '¿Por qué huelen mal los desagües en verano en Sevilla?',
        answer: 'El calor evapora agua de sifones (pequeñas trampas en forma U bajo desagües que bloquean olores). Con sifón vacío, gases de alcantarillado (sulfuro hidrógeno, metano) suben directamente a vivienda. Evaporación es rápida en Sevilla: sifón puede vaciarse en 7-10 días sin usar (viviendas vacacionales). Calor también acelera descomposición residuos orgánicos en tuberías generando más gases. Solución inmediata: verter 2-3 litros agua en todos desagües. Solución permanente: usar diariamente o tapar desagües con tapón. Sifones antimosquito con menor evaporación: €25-50/unidad instalados.',
        category: 'olores'
      },
      {
        question: '¿Cuánto cuesta desatascar casco histórico Sevilla?',
        answer: 'Edificios históricos sevillanos (Santa Cruz, Triana) tienen complejidades: arquetas profundas (3-4m), acceso estrecho (calles medievales impiden camión cuba), tuberías cerámicas frágiles, restricciones Patrimonio. Tarifas: desatasco simple inodoro/fregadero €80-160, bajante comunitaria €250-650 (vs €200-450 en zonas nuevas), limpieza arqueta profunda €180-400. Si necesario camión cuba de tamaño reducido: €450-1,000. Inspección cámara imprescindible (evita romper): €100-200. Tiempo operación: 2-4 horas vs 1-2 horas edificios modernos. En edificios catalogados, añadir permisos patrimonio: +2-5 días.',
        category: 'edificios_historicos'
      },
      {
        question: '¿Qué mantenimiento necesitan tuberías en verano sevillano?',
        answer: 'El calor extremo sevillano requiere mantenimiento intensificado: 1) Verter agua en todos desagües diariamente (previene evaporación sifones); 2) Limpieza desengrasante mensual verano (€15-30/aplicación); 3) NO verter aceite líquido aunque parezca fluido (solidificará abajo); 4) Inspección cámara pre-verano si >3 años sin revisar (€100-180); 5) Limpieza profesional bajantes comunitarias junio (antes pico calor), €300-600 edificio. Inversión mantenimiento: €200-400/año. Previene atascos graves verano que cuestan €400-1,200 urgencia + molestias extremas con 42°C exterior.',
        category: 'mantenimiento_calor'
      },
      {
        question: '¿Por qué bajantes comunitarias colapsan en edificios antiguos Sevilla?',
        answer: 'Edificios Triana, Nervión, Macarena construidos 1950-1970 tienen bajantes hierro fundido/fibrocemento con 50-70 años. Calor ciclos expansión-contracción debilitan juntas. Incrustaciones cal (agua dura sevillana) + grasas reducen diámetro útil 40-60%. Raíces de árboles centenarios penetran en fisuras. Falta mantenimiento comunitario durante décadas colmata arquetas. Cuando colapsa afecta 10-20 viviendas simultáneamente. Señales alarma: gorgoteos, malos olores persistentes, desagüe lento múltiples viviendas. Renovación bajante completa: €4,500-10,000 edificio 6 plantas. Prevención más barata: inspección cámara bienal (€150-300) + limpiezas anuales (€350-700).',
        category: 'bajantes_colapso'
      }
    ],
    keywords: {
      primary: [
        'desatascos sevilla',
        'desatascos urgentes sevilla',
        'desatascos 24 horas sevilla',
        'desatasco triana sevilla',
        'camión cuba sevilla'
      ],
      secondary: [
        'desatascos grasa sevilla',
        'desatascos casco historico sevilla',
        'desatasco bajantes sevilla',
        'malos olores desagües sevilla',
        'inspección cámara sevilla'
      ],
      longTail: [
        'por qué grasas atascan más verano sevilla',
        'por qué huelen mal desagües verano sevilla',
        'cuánto cuesta desatascar casco histórico sevilla',
        'mantenimiento tuberías verano sevillano',
        'bajantes comunitarias colapsan edificios sevilla'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'desatascos',
    citySlug: 'malaga',
    metadata: {
      title: 'Desatascos en Málaga 24h | Expertos en Zonas Turísticas',
      description: 'Desatascos profesionales en Málaga. Especialistas en apartamentos turísticos y zonas costeras. Servicio urgente 24h. Costa del Sol.'
    },
    seoText: 'Málaga presenta desafíos específicos de desagüe derivados de su intensa actividad turística costera. Los apartamentos vacacionales en Málaga capital y Costa del Sol experimentan uso intensivo estacional (mayo-octubre) con rotación semanal de huéspedes que desconocen el mantenimiento básico, generando atascos por uso inadecuado (toallitas, restos alimentación, productos higiene). La humedad ambiental alta (65-80%) combinada con salinidad del aire acelera corrosión de tuberías metálicas y favorece biofilm. Los períodos de desocupación invernal permiten evaporación de sifones y solidificación de grasas residuales. Las urbanizaciones turísticas comparten redes de saneamiento dimensionadas para uso residencial que resultan insuficientes para picos veraniegos.',
    faqs: [
      {
        question: '¿Por qué apartamentos turísticos en Málaga tienen más atascos?',
        answer: 'Los apartamentos vacacionales málaga generan atascos por: 1) Turistas desconocen qué NO tirar (toallitas, compresas, restos comida); 2) Uso intensivo 6-8 personas vs vivienda diseñada para 3-4; 3) Arena de playa en duchas (Pedregalejo, Malagueta); 4) Grasas verano por cocinar mucho (vacaciones); 5) Propietarios remotos no detectan problemas tempranos. Rotación semanal multiplica x6 stress vs vivienda convencional. Prevención: carteles informativos baño/cocina, revisión post-checkout, limpieza profesional mensual temporada alta (€80-150). Evita urgencias plena temporada: €400-800 + pérdida reservas (€1,000-2,500/semana).',
        category: 'apartamentos_turisticos'
      },
      {
        question: '¿Qué mantenimiento necesitan viviendas vacacionales en Costa del Sol?',
        answer: 'Mantenimiento específico apartamentos turísticos: 1) Pre-temporada (abril): inspección cámara (€90-170) + limpieza preventiva (€100-200); 2) Durante temporada: revisión post cada 3-4 ocupaciones, vaciado/limpieza sifones; 3) Mediados temporada (julio): desatasco preventivo (€120-250); 4) Post-temporada (noviembre): limpieza integral + protección sifones; 5) Invierno: verter agua mensualmente en desocupados. Contrato mantenimiento anual: €350-700. Ahorra: atasco urgencia agosto cuesta €500-1,000 + pérdidas alquiler. Muchos gestores inmobiliarios incluyen mantenimiento desagües en servicio.',
        category: 'mantenimiento_turistico'
      },
      {
        question: '¿Cómo afecta la salinidad costera a las tuberías en Málaga?',
        answer: 'La proximidad al mar (Malagueta, Pedregalejo, El Palo) genera aerosoles salinos que corroen tuberías metálicas expuestas (terrazas, patios). Las tuberías de evacuación PVC resisten mejor, pero juntas metálicas se oxidan. Sal penetra por ventilaciones y se deposita en interior tuberías. Humedad salinidad favorece biofilm que estrecha sección. Corrosión puede generar fisuras → infiltraciones mutuas agua limpia/residual. Prevención: usar PVC en reformas (anticorrosión), proteger tuberías expuestas, inspección cámara cada 2-3 años en costa (€90-180). Renovación tuberías corroídas: €1,500-4,000 vivienda 70m². En primera línea playa, vida útil tuberías metálicas: 15-25 años vs 30-50 años interior.',
        category: 'salinidad_costera'
      },
      {
        question: '¿Cuánto cuestan los desatascos en temporada alta en Málaga?',
        answer: 'Tarifas temporada alta Málaga (junio-septiembre): Desatasco simple inodoro/fregadero €70-140, bajante comunitaria €220-580, camión cuba €350-850. Algunos proveedores aplican suplemento 15-25% temporada alta por mayor demanda. Urgencias nocturnas (frecuentes en apartamentos turísticos): +50-80%. Incluimos inspección cámara sin coste adicional. No cobramos desplazamiento en Málaga capital y Costa del Sol <15km. La mayoría desatascos resueltos en 1-2 horas. Ofrecemos presupuesto fijo previo para evitar sorpresas. Contratos anuales gestores turísticos: tarifas reducidas 20-30%.',
        category: 'precio_temporada'
      },
      {
        question: '¿Qué hacer con vivienda vacacional desocupada meses en Málaga?',
        answer: 'Apartamentos desocupados invierno requieren preparación: 1) Verter 3-4 litros agua cada desagüe (llena sifones); 2) Añadir aceite vegetal (1-2 cucharadas por sifón, retarda evaporación); 3) Taponar desagües con tapones (€5-10); 4) Dejar instrucciones limpiadora verter agua mensualmente; 5) Cerrar válvula entrada agua (previene fugas); 6) Contratar revisión pre-reapertura (€60-120). Sifones secos permiten: gases tóxicos, insectos (cucarachas subiendo), malos olores, corrosión por humedad. Una revisión previa reapertura evita sorpresas negativas ante primeros huéspedes temporada. Costes prevención: €100-200/invierno vs urgencia reapertura: €300-700.',
        category: 'desocupacion'
      }
    ],
    keywords: {
      primary: [
        'desatascos malaga',
        'desatascos urgentes malaga',
        'desatascos costa del sol',
        'desatascos 24 horas malaga',
        'camión cuba malaga'
      ],
      secondary: [
        'desatascos apartamentos turísticos malaga',
        'desatascos pedregalejo',
        'desatascos zona costera malaga',
        'desatasco vivienda vacacional malaga',
        'inspección cámara malaga'
      ],
      longTail: [
        'por qué apartamentos turísticos más atascos malaga',
        'mantenimiento viviendas vacacionales costa del sol',
        'cómo afecta salinidad tuberías malaga',
        'cuánto cuestan desatascos temporada alta malaga',
        'qué hacer vivienda vacacional desocupada malaga'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'desatascos',
    citySlug: 'zaragoza',
    metadata: {
      title: 'Desatascos en Zaragoza 24h | Expertos en Clima Continental',
      description: 'Desatascos profesionales en Zaragoza. Especialistas en cambios térmicos y tuberías antiguas. Servicio urgente 24h. Cierzo.'
    },
    seoText: 'Zaragoza presenta desafíos únicos de desagüe derivados de su clima continental extremo. Las oscilaciones térmicas anuales (-8°C invierno, +40°C verano) generan ciclos dilatación-contracción que debilitan juntas de tuberías, facilitando infiltración de raíces y tierras. Los inviernos con heladas ocasionales (-5 a 0°C) pueden congelar agua residual en tuberías mal aisladas, expandiendo y rompiendo secciones vulnerables. El uso intensivo de calefacción en invierno incrementa grasas domésticas (cocina, duchas calientes) que se solidifican en tuberías subterráneas frías. Los edificios del casco histórico (Casco Viejo, San Pablo, Magdalena) conservan redes centenarias con arquetas profundas y tuberías de gres quebradizo.',
    faqs: [
      {
        question: '¿Cómo afectan los cambios térmicos a las tuberías en Zaragoza?',
        answer: 'Zaragoza sufre oscilación térmica 48°C (-8°C invierno, +40°C verano) que genera expansión-contracción cíclica en tuberías. PVC se dilata/contrae debilitando juntas; tuberías antiguas (gres, fibrocemento) se agrietan por fatiga térmica. Juntas debilitadas permiten: infiltración raíces (buscan humedad), entrada tierras, fugas agua residual. Invierno: grasas solidifican más rápido en tuberías enterradas (5-10°C). Verano: evaporación rápida sifones (similar Sevilla). Prevención: inspección cámara cada 3 años (€100-200) detecta fisuras tempranas, limpieza anual primavera (€150-350) antes pico calor. Renovación tuberías >50 años: €3,000-7,000 vivienda completa.',
        category: 'cambios_termicos'
      },
      {
        question: '¿Por qué tuberías se atascan más en invierno en Zaragoza?',
        answer: 'El invierno zaragozano genera mayor volumen grasas domésticas: calefacción + cocina caliente (guisos, fritos) enfrían en tuberías subterráneas (5-10°C) solidificando rápidamente. Duchas más calientes (40-45°C) arrastran grasas corporales + jabones que se depositan. Menos ventilación viviendas (frío) reduce evaporación en tuberías horizontales. Hojas otoñales obstruyen sumideros exteriores. Condensación en tuberías frías genera biofilm. Prevención: agua hirviendo tras cocinar con grasa, desengrasante químico mensual (€15-30), limpieza sumideros octubre (€40-80). Atascos invierno: €250-600 vs verano €180-450.',
        category: 'invierno'
      },
      {
        question: '¿Qué problemas tienen edificios antiguos del Casco Viejo de Zaragoza?',
        answer: 'Edificios históricos Casco Viejo (construcción 1700-1950) tienen: 1) Tuberías gres vitrificado/cerámica quebradizas (agrietadas por ciclos térmicos); 2) Arquetas piedra profundas (3-5m) colmatadas décadas; 3) Trazados sinuosos sin pendiente adecuada; 4) Raíces árboles centenarios penetrando en fisuras; 5) Sin separación aguas pluviales/residuales. Acceso complicado (calles estrechas medievales). Renovación integral: €5,000-12,000 vivienda 80m². Muchas comunidades renuevan progresivamente. ITE puede exigir actuación. Prevención: inspección cámara detecta estado (€120-250), limpieza profesional anual (€200-450) minimiza deterioro progresivo.',
        category: 'edificios_antiguos'
      },
      {
        question: '¿Cuánto cuesta desatasco urgente nocturno en Zaragoza?',
        answer: 'Tarifas urgencias 24h Zaragoza: Desatasco simple inodoro/fregadero laborables €65-130, sábados €85-160, domingos/festivos €100-190. Bajante comunitaria laborables €200-480, fin semana €280-650. Camión cuba alta presión: €320-800. Inspección cámara: €80-170. Invierno (diciembre-febrero) posible suplemento 10-20% por condiciones (frío, hielo). Ofrecemos presupuesto transparente antes intervenir. Sin costes ocultos. Mayoría urgencias resueltas 1-2 horas. Servicio 24h todos días incluido festivos. Aceptamos pagos tarjeta/efectivo/transferencia.',
        category: 'precio'
      },
      {
        question: '¿Cómo prevenir congelación tuberías desagüe en Zaragoza?',
        answer: 'Las heladas zaragozanas (-5 a 0°C, diciembre-febrero) pueden congelar agua residual en tuberías desagüe mal aisladas (garajes, sótanos, exteriores). Agua congelada se expande rompiendo tuberías. Prevención: 1) Aislar tuberías zonas no calefactadas con coquilla (€3-6/metro); 2) Mantener calefacción mínima 5-7°C en desocupados; 3) Dejar grifo goteo leve nocturno si helada anunciada (agua movimiento no congela); 4) Vaciar tuberías exteriores/jardín antes invierno; 5) Abrir armarios bajo fregaderos para que calor interior llegue. Rotura por congelación: €200-800 reparación + posible inundación. Prevención: €100-300 aislamiento.',
        category: 'congelacion'
      }
    ],
    keywords: {
      primary: [
        'desatascos zaragoza',
        'desatascos urgentes zaragoza',
        'desatascos 24 horas zaragoza',
        'desatascos casco viejo zaragoza',
        'camión cuba zaragoza'
      ],
      secondary: [
        'desatasco bajantes zaragoza',
        'desatascos tuberías zaragoza',
        'desatascos edificios antiguos zaragoza',
        'inspección cámara zaragoza',
        'limpieza arquetas zaragoza'
      ],
      longTail: [
        'cómo afectan cambios térmicos tuberías zaragoza',
        'por qué tuberías atascan más invierno zaragoza',
        'problemas edificios antiguos casco viejo zaragoza',
        'cuánto cuesta desatasco urgente zaragoza',
        'prevenir congelación tuberías desagüe zaragoza'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  // ============================================================================
  // AIRE ACONDICIONADO (AIR CONDITIONING) - CITY SEO CONTENT
  // Enterprise-grade climatologically-differentiated AC installation & repair
  // ============================================================================

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'madrid',
    metadata: {
      title: 'Aire Acondicionado en Madrid | Instalación y Mantenimiento Split',
      description: 'Instalación y reparación de aire acondicionado en Madrid. Especialistas en sistemas split inverter para calor seco intenso. Mantenimiento preventivo y carga de gas refrigerante. Máximo ahorro energético.'
    },
    seoText: 'Madrid enfrenta veranos de calor seco intenso con temperaturas que superan los 38-42°C durante julio y agosto, generando una demanda crítica de climatización residencial y comercial. El clima continental seco de la capital presenta desafíos específicos para los sistemas de aire acondicionado: la baja humedad relativa (20-35% en verano) reduce la eficiencia de enfriamiento evaporativo pero favorece el rendimiento de sistemas split convencionales. Los edificios verticales madrileños (5-8 plantas) requieren soluciones de climatización por zonas, con unidades exteriores instaladas en fachadas históricas que deben cumplir normativas estéticas municipales estrictas. La red eléctrica en barrios densos (Salamanca, Chamberí, Retiro) experimenta picos de consumo entre 14:00-18:00h cuando todos los aires funcionan simultaneamente',
    faqs: [
      {
        question: '¿Qué potencia de aire acondicionado necesito para piso en Madrid?',
        answer: 'Madrid requiere cálculo específico por calor seco intenso. Regla general: 100-120 frigorías/m² (vivienda estándar aislamiento), 120-140 frigorías/m² (ático/última planta), 140-160 frigorías/m² (exposición sur/oeste directa). Ejemplo: salón 25m² orientación sur = 3,000-3,500 frigorías (equipo 3,000W / 2,500 frigorías reales). Splits inverter clase A+++ ahorran 40% vs modelos fijos. Factores Madrid: altura edificio (plantas altas +10% calor), ventanas grandes (+15%), techos altos >2.8m (+10%). Instalador debe medir antes comprar equipo; sobredimensionar desperdicia energía, subdimensionar no enfría.',
        category: 'dimensionamiento'
      },
      {
        question: '¿Cuándo hacer mantenimiento preventivo en Madrid?',
        answer: 'Madrid requiere mantenimiento pre-verano obligatorio (abril-mayo) antes picos calor. Incluye: limpieza filtros interiores, limpieza unidad exterior (polvo acumulado invierno), revisión carga gas refrigerante, verificación eléctrica, comprobación drenaje condensados. Coste: €60-90/equipo split. Mantenimiento evita: pérdida eficiencia 30%, averías julio-agosto (técnicos saturados, esperas 5-7 días, precios urgencia +40%), consumo eléctrico innecesario (€80-150/verano desperdiciados). Edificios comunitarios: contrato mantenimiento anual (€40-60/equipo) con prioridad averías. Filtros limpiar cada 3-4 semanas uso intensivo (Madrid: junio-septiembre).',
        category: 'mantenimiento'
      },
      {
        question: '¿Por qué mi aire acondicionado no enfría bien en Madrid en pleno verano?',
        answer: 'Causas comunes Madrid: 1) Falta gas refrigerante (fuga lenta, recarga €80-150); 2) Filtros sucios obstruidos polvo (limpiar 20 min gratis); 3) Unidad exterior sol directo >45°C (rendimiento cae 20-30%, instalar toldo); 4) Equipo subdimensionado (comprado pequeño, no alcanza temperatura); 5) Ventanas/puertas abiertas (aire caliente entra continuamente); 6) Aislamiento deficiente ventanas antiguas (pérdida 40% frío). Diagnóstico técnico: €50-70. Soluciones: recarga gas (€90-180), limpieza completa (€60-90), upgrade equipo mayor (€600-1,200 instalado). Verificar primero filtros (fácil usuario) antes llamar técnico.',
        category: 'rendimiento'
      },
      {
        question: '¿Cuánto consume aire acondicionado en Madrid todo el verano?',
        answer: 'Madrid usa aire 4-5 meses intensivos (junio-septiembre). Split inverter 2,500W clase A+++: 8h/día × 120 días × 0.7 kW real × €0.15/kWh = €100-130/verano. Modelo antiguo clase B: misma uso = €180-240/verano (+80% consumo). Factores aumentan coste: temperatura termostato <22°C (+30% consumo vs 24-25°C), ventanas abiertas, aislamiento deficiente, equipo sin mantenimiento. Ahorro: termostato 24-25°C (confortable Madrid calor seco), apagar nocturno 2:00-8:00 (inercia térmica mantiene fresco), ventilador techo ayuda (sensación -2°C, gasto €2/mes). Inversión equipo eficiente (A+++) amortiza 3-4 veranos vs modelo barato ineficiente.',
        category: 'consumo'
      },
      {
        question: '¿Puedo instalar aire acondicionado en edificio protegido del centro de Madrid?',
        answer: 'Centro histórico Madrid (Austrias, La Latina, Sol) tiene restricciones estéticas. Permitido: unidades exteriores patios interiores (no visibles fachada), terrazas privadas, cubiertas (con permiso comunidad). Prohibido generalmente: fachadas principales edificios catalogados BIC. Proceso: 1) Consultar normativa específica distrito (urbanismo Ayuntamiento); 2) Solicitar permiso comunidad vecinos (mayoría simple/cualificada según estatutos); 3) Licencia obras menor si afecta fachada (€80-150 tasas); 4) Instalación certificada (boletín eléctrico si nueva línea). Alternativas fachada: splits sin unidad exterior (menos eficientes, €900-1,400), sistemas conductos (invisible, €2,500-4,500). Consultar antes comprar equipo.',
        category: 'normativa'
      },
      {
        question: '¿Qué hacer si vecinos se quejan del ruido del aire acondicionado en Madrid?',
        answer: 'Normativa Madrid: unidades exteriores <65 dB día, <45 dB noche (23:00-7:00). Split moderno inverter: 35-45 dB (correcto). Quejas procedentes si: equipo antiguo ruidoso (+55 dB), vibraciones transmitidas fachada, horario nocturno excesivo. Soluciones: 1) Instalar soportes antivibratorios (€40-80, reduce 60% ruido); 2) Pantalla acústica unidad exterior (€80-150); 3) Mantenimiento (rodamientos desgastados aumentan ruido); 4) Temporizador nocturno (apagar 1:00-7:00). Si queja formal: medición técnica acústica (€150-300) determina si supera límites legales. Instalador debe colocar equipo orientado patios/no dormitorios vecinos. Prevenir conflictos: avisar instalación antes, horario uso razonable.',
        category: 'convivencia'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado madrid',
        'instalación aire acondicionado madrid',
        'reparación aire acondicionado madrid',
        'mantenimiento aire acondicionado madrid',
        'split inverter madrid'
      ],
      secondary: [
        'carga gas aire acondicionado madrid',
        'limpieza aire acondicionado madrid',
        'aire acondicionado edificios antiguos madrid',
        'instalación split madrid',
        'técnico aire acondicionado madrid'
      ],
      longTail: [
        'qué potencia aire acondicionado necesito madrid',
        'cuándo hacer mantenimiento aire acondicionado madrid',
        'por qué aire acondicionado no enfría madrid',
        'cuánto consume aire acondicionado verano madrid',
        'instalar aire acondicionado edificio protegido madrid'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'barcelona',
    metadata: {
      title: 'Aire Acondicionado en Barcelona | Instalación Split con Humedad',
      description: 'Instalación y reparación de aire acondicionado en Barcelona. Especialistas en climatización con humedad mediterránea. Sistemas antimoho y deshumidificación. Mantenimiento preventivo contra corrosión salina.'
    },
    seoText: 'Barcelona presenta desafíos únicos de climatización derivados de su humedad mediterránea costera. Las temperaturas estivales (28-34°C) combinadas con humedad relativa alta (60-75%) generan sensación térmica 5-8°C superior, exigiendo mayor capacidad de deshumidificación en los equipos. La brisa marina aporta partículas salinas que corroen unidades exteriores en distritos costeros (Barceloneta, Poblenou, Diagonal Mar), requiriendo modelos con tratamiento anticorrosión. Los edificios del Eixample con patios de luces interiores tienen ventilación natural limitada, acumulando humedad que favorece moho si el aire acondicionado no deshumidifica adecuadamente. Las fachadas modernistas protegidas limitan opciones de instalación exterior, obligando a soluciones discretas que respeten patrimonio arquitectónico',
    faqs: [
      {
        question: '¿Cómo afecta la humedad de Barcelona al rendimiento del aire acondicionado?',
        answer: 'Barcelona tiene humedad 60-75% verano vs Madrid 25-35%. Aire húmedo requiere más energía enfriar: equipo debe eliminar humedad (condensación) Y bajar temperatura. Split estándar 3,000W en Madrid rinde 2,500W Barcelona por carga latente humedad. Consecuencias: 1) Sensación menos fresco (sudor no evapora bien con humedad); 2) Condensación excesiva (drenaje debe evacuarse correctamente); 3) Moho si apagado frecuente (humedad residual); 4) Filtros ensucian más rápido (partículas se adhieren con humedad). Solución: equipos con función deshumidificación independiente, limpiar filtros cada 2-3 semanas, mantener funcionamiento continuo verano (24-25°C vs encender/apagar).',
        category: 'humedad'
      },
      {
        question: '¿Por qué mi unidad exterior se oxida tan rápido en Barcelona?',
        answer: 'Barcelona costera tiene brisa marina con partículas sal que corroen aluminio/cobre. Zonas afectadas: Barceloneta, Poblenou, Diagonal Mar (<2km costa). Síntomas: óxido verdoso (cobre), picaduras aluminio, deterioro aletas condensador. Prevención: instalar modelos tratamiento anticorrosión (recubrimiento hidrofílico "blue fin"), protector lluvia/sol (€60-100), limpieza anual agua dulce presión baja elimina sal acumulada (€40-70). Vida útil equipo estándar zona costera: 6-8 años vs interior ciudad 12-15 años. Si vives <500m mar, invierte equipo anticorrosión (+€150-250 compra); prolongación vida compensa coste. Evitar instalar dirección mar/viento dominante.',
        category: 'corrosion'
      },
      {
        question: '¿Puedo instalar aire acondicionado en piso del Eixample con patio de luces?',
        answer: 'Eixample: patios de luces son ubicación ideal unidad exterior (discreta, no afecta fachada modernista protegida). Ventajas: no visible calle, fácil autorización comunidad, buena ventilación. Consideraciones: 1) Verificar carga muro (unidad pesa 30-50kg); 2) Drenaje condensados debe conectarse bajante (no tirar patio directamente); 3) Ruido: orientar compresor sin apuntar ventanas vecinos; 4) Humedad patio: elegir equipo función deshumidificación (Eixample retiene humedad en patios cerrados). Coste instalación patio: €500-900 (tuberías + obra + unidad). Requiere permiso comunidad (mayoría simple). Alternativa: cubierta edificio si comunidad autoriza (requiere acuerdo formal + instalación más cara €800-1,300).',
        category: 'eixample'
      },
      {
        question: '¿Cuándo aparecen manchas moho alrededor aire acondicionado Barcelona?',
        answer: 'Humedad Barcelona (60-75%) + condensación aire acondicionado = riesgo moho si ventilación insuficiente. Causas: 1) Drenaje condensados obstruido (agua retorna interior); 2) Filtros sucios (biofilm prolifera); 3) Apagado frecuente (humedad residual dentro unidad); 4) Pared exterior mal aislada (puente térmico condensa). Moho negro alrededor split indica: fuga agua interna, exceso humedad ambiental, ventilación pobre. Solución: limpieza profesional split con desinfección (€80-140), reparar drenaje (€60-120), mejorar ventilación cruzada vivienda, función deshumidificación diaria 1-2h (sin enfriar, solo seca aire). Prevención: limpiar filtros cada 3 semanas verano, ventilar vivienda diario 10-15 min (mañana <10:00h antes calor).',
        category: 'moho'
      },
      {
        question: '¿Cuánto cuesta instalar aire acondicionado en Barcelona cumpliendo ITE?',
        answer: 'ITE (Inspección Técnica Edificios) Barcelona puede obligar regularización instalaciones. Split estándar 1 unidad interior + 1 exterior con instalación certificada: €650-1,100 (equipo inverter A++, instalación, boletín eléctrico). Edificios con ITE pendiente: verificar si instalaciones antiguas (pre-2000) necesitan regularización. Instalador debe: presentar memoria técnica si >12,000 frigorías, boletín instalación frigorista, certificado eléctrico si nueva línea. Comunidad puede exigir uniformidad estética unidades exteriores (todas mismo color/ubicación). Presupuesto completo incluye: equipo (€400-700), instalación (€200-350), materiales (€50-100), legalización (€80-150). Solicitar 3 presupuestos; desconfiar precios <€550 (calidad dudosa, sin legalización).',
        category: 'ite'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado barcelona',
        'instalación aire acondicionado barcelona',
        'reparación aire acondicionado barcelona',
        'aire acondicionado eixample',
        'instalación split barcelona'
      ],
      secondary: [
        'aire acondicionado humedad barcelona',
        'mantenimiento aire acondicionado barcelona',
        'aire acondicionado edificios modernistas',
        'split anticorrosión barcelona',
        'deshumidificación barcelona'
      ],
      longTail: [
        'cómo afecta humedad aire acondicionado barcelona',
        'por qué unidad exterior oxida barcelona',
        'instalar aire patio luces eixample',
        'moho aire acondicionado barcelona',
        'cuánto cuesta instalación aire barcelona ite'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'valencia',
    metadata: {
      title: 'Aire Acondicionado en Valencia | Split para Clima Mediterráneo',
        description: 'Instalación y reparación de aire acondicionado en Valencia. Especialistas en humedad alta costera y apartamentos turísticos. Mantenimiento contra condensación y moho. Eficiencia energética máxima.'
    },
    seoText: 'Valencia combina temperaturas estivales elevadas (30-38°C) con humedad mediterránea alta (65-80%), creando condiciones especialmente exigentes para sistemas de climatización. La proximidad al mar genera brisa húmeda que incrementa la sensación térmica real 6-9°C por encima de la temperatura medida, obligando a equipos con alta capacidad de deshumidificación. Los apartamentos turísticos en zonas costeras (Malvarrosa, Cabanyal, Patacona) experimentan uso intensivo verano con largos periodos de desocupación que favorecen acumulación de humedad y moho si no hay mantenimiento preventivo. El clima valenciano con gota fría otoñal genera picos de humedad 85-95% que condensan en unidades interiores frías, requiriendo drenajes correctamente dimensionados',
    faqs: [
      {
        question: '¿Por qué en Valencia el aire acondicionado gotea tanto?',
        answer: 'Valencia tiene humedad 65-80% verano, aire acondicionado debe extraer gran cantidad agua (condensación). Split 3,000W genera 1-2 litros/hora condensados en Valencia vs 0.3-0.5 litros/hora Madrid (seco). Causas goteo: 1) Drenaje obstruido (algas/moho crecen con humedad); 2) Bandeja condensados llena/agrietada; 3) Tubería drenaje sin pendiente adecuada; 4) Bomba condensados averiada (pisos sin salida gravedad). Solución: limpieza tubería drenaje con agua presión baja + lejía diluida (€40-70), revisar pendiente (mínimo 2%), instalar bomba evacuación si necesario (€80-150). Prevención: limpieza drenaje anual (abril-mayo) antes verano, verificar evacuación correcto cada inicio temporada.',
        category: 'condensacion'
      },
      {
        question: '¿Cómo afecta la humedad de Valencia al consumo del aire acondicionado?',
        answer: 'Humedad valenciana incrementa consumo 20-35% vs clima seco. Split debe eliminar humedad (consumo energético) antes enfriar aire. Ejemplo: equipo 3,000W Valencia consume 2.2-2.5 kW reales por carga latente vs 1.5-1.8 kW Madrid. Modelo inverter A+++ mitiga diferencia adaptando potencia gradualmente. Factores: apartamentos playa (brisa marina +10% humedad), plantas bajas (+15% humedad suelo), casas adosadas (+20% si jardín riego). Ahorro: deshumidificador independiente primavera/otoño (€100-200, gasta 300W vs 2,000W aire completo), ventilar mañanas secas (<60% HR), sellado ventanas contra infiltración aire húmedo exterior. Consumo verano Valencia: €130-180 vs €90-130 interior (4 meses uso).',
        category: 'consumo'
      },
      {
        question: '¿Qué mantenimiento necesita aire acondicionado en apartamento turístico Valencia?',
        answer: 'Apartamentos turísticos Valencia requieren protocolo específico: uso intensivo + periodos desocupación largos = riesgo moho/malos olores. Mantenimiento recomendado: 1) Pre-temporada (abril): limpieza completa + desinfección (€90-140); 2) Durante uso: limpieza filtros cada 3 semanas (inquilinos/limpiadora); 3) Post-temporada (octubre): limpieza fungicida + modo ventilación 2h seca interior; 4) Desocupación: desconectar eléctrico (ahorra standby, evita fallos eléctricos). Apartamentos playa (Malvarrosa): limpieza exterior anual elimina sal (€50-80). Coste anual mantenimiento profesional: €180-280 (2 limpiezas). Previene: averías plena ocupación (técnico tarda 5-7 días verano), quejas clientes aire no enfría/huele mal, penalizaciones Airbnb/Booking.',
        category: 'turistico'
      },
      {
        question: '¿Puedo dejar aire acondicionado funcionando todo el día en Valencia?',
        answer: 'Sí, es más eficiente que encender/apagar. Split inverter Valencia: funcionamiento continuo 24-26°C consume menos que arranques/paradas frecuentes. Arranque demanda pico potencia 3x nominal; modo mantenimiento usa 30-40% potencia. Ventajas: temperatura estable, humedad controlada (evita moho), menor desgaste compresor, sensación confort superior. Cálculo: 24h continuo 24°C = 12-16h equivalentes encendido/apagado por arranques. Consejos: subir a 26°C nocturno (ahorra 15%, suficiente dormir con humedad baja), cerrar persianas orientación este/sur reduce carga térmica 25%, ventilador techo complementa (sensación -2°C, gasto mínimo). Desconectar solo ausencias >5 días; rearrancada requiere 4-6h estabilizar temperatura/humedad.',
        category: 'uso'
      },
      {
        question: '¿Cómo prevenir moho en aire acondicionado en Valencia?',
        answer: 'Humedad Valencia (70-80%) + temperaturas cálidas = ambiente ideal moho. Prevención: 1) Limpiar filtros cada 3 semanas (esporas se acumulan); 2) Función deshumidificación 1h diaria (seca interior unidad sin enfriar); 3) Ventilar vivienda mañanas <10:00h (aire menos húmedo); 4) Limpieza profesional pre-verano con fungicida (€80-130); 5) No apagar bruscamente (dejar modo ventilación 5 min seca condensación interna). Moho negro alrededor split: limpieza urgente + reparar origen humedad. Señales alarma: olor humedad encender aire, manchas negras rejillas, estornudos/alergias. Limpieza correctiva con moho: €120-190 (desmontaje, desinfección profunda, verificación drenaje). Apartamentos playa: riesgo mayor por sal + humedad constante.',
        category: 'moho'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado valencia',
        'instalación aire acondicionado valencia',
        'reparación aire acondicionado valencia',
        'mantenimiento aire acondicionado valencia',
        'split valencia'
      ],
      secondary: [
        'aire acondicionado apartamento turístico valencia',
        'aire acondicionado playa valencia',
        'deshumidificación valencia',
        'instalación split valencia',
        'aire acondicionado edificios antiguos valencia'
      ],
      longTail: [
        'por qué aire acondicionado gotea tanto valencia',
        'cómo afecta humedad consumo aire valencia',
        'mantenimiento aire apartamento turístico valencia',
        'dejar aire funcionando todo día valencia',
        'prevenir moho aire acondicionado valencia'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'sevilla',
    metadata: {
      title: 'Aire Acondicionado en Sevilla | Instalación para Calor Extremo 40-45°C',
      description: 'Instalación y reparación de aire acondicionado en Sevilla. Especialistas en sistemas para temperaturas extremas. Mantenimiento preventivo contra sobrecarga térmica. Eficiencia energética en calor intenso.'
    },
    seoText: 'Sevilla enfrenta los veranos más extremos de España con temperaturas regulares de 40-45°C entre julio y agosto, demandando sistemas de aire acondicionado de máximo rendimiento y resistencia térmica. El calor seco intenso (humedad 25-40%) facilita la evaporación pero somete a unidades exteriores a estrés térmico extremo cuando operan bajo sol directo con 50-55°C en superficies metálicas. Los edificios históricos del centro (Arenal, Santa Cruz, Alameda) con muros gruesos de más de un metro conservan frescor nocturno pero requieren potencias elevadas durante horas pico 14:00-20:00h. La red eléctrica experimenta los mayores picos de consumo nacional por uso masivo simultáneo de climatización',
    faqs: [
      {
        question: '¿Por qué el aire acondicionado pierde rendimiento en Sevilla durante olas de calor?',
        answer: 'Temperaturas exteriores >42°C reducen eficiencia splits estándar 25-35%. Unidades exteriores diseñadas para 35°C ambiente óptimo; a 43°C el compresor trabaja al límite, consume más electricidad pero enfría menos. Física: diferencial térmico entre exterior/interior determina eficiencia; cuanto mayor diferencia (45°C exterior → 22°C interior = 23°C salto), más energía necesita. Solución: equipos diseño climas extremos (+€200-350 compra), ubicación exterior sombra/norte (rinde 15-20% mejor), toldo protección sol unidad (€80-150). Sevilla requiere splits sobredimensionados 20% vs cálculo estándar. Evitar termostato <23°C con calor extremo; objetivo 24-25°C es realista/eficiente. Apagar horas pico tarifarias 18:00-22:00 (más caro, menos eficiente).',
        category: 'calor_extremo'
      },
      {
        question: '¿Cuánto se dispara el consumo eléctrico con aire acondicionado en Sevilla?',
        answer: 'Sevilla lidera consumo eléctrico verano España. Split 3,000W clase A++ consume: junio €40-55, julio €90-130, agosto €95-140, septiembre €50-70 = €275-395/verano (8-10h/día). Modelo antiguo clase B: +60% = €440-630/verano. Factores Sevilla: temperatura exterior extrema (compresor forzado), uso prolongado (mayo-octubre), orientación vivienda sur/oeste (+30% carga térmica). Ahorro: termostato 25-26°C vs 22-23°C ahorra €80-120/verano, aislamiento ventanas (€200-500) reduce 25% consumo, persianas térmicas bajadas horas sol (€30-60/ventana) cortan radiación directa. Tarifa discriminación horaria: usar aire antes 14:00 y después 22:00 (periodos valle). Ventilador techo complementa (sensación fresco, gasta €3/mes).',
        category: 'consumo'
      },
      {
        question: '¿Qué potencia de aire necesito para ático en Sevilla expuesto al sol?',
        answer: 'Áticos Sevilla requieren potencia 40-60% superior planta intermedia. Cálculo: cubierta recibe radiación solar directa 12h/día, temperatura interior bajo tejado alcanza 45-50°C sin aislamiento. Regla ático Sevilla: 160-180 frigorías/m² vs 100-120 estándar. Ejemplo: salón 25m² ático = 4,000-4,500 frigorías (split 4,300W mínimo). Factores críticos: aislamiento cubierta (sin aislar +50% potencia), orientación (sur/oeste +20%), ventanas grandes (+15%), colores oscuros tejado (+10%). Inversión inteligente: aislar cubierta primero (€1,500-3,000, ahorro 40% consumo/año) luego instalar aire dimensionado correcto. Split subdimensionado ático Sevilla no alcanza temperatura, trabaja 24h forzado, avería prematura. Consultar técnico con experiencia áticos antes comprar.',
        category: 'atico'
      },
      {
        question: '¿Cómo proteger unidad exterior del sol extremo en Sevilla?',
        answer: 'Sol directo Sevilla eleva temperatura exterior unidad a 50-55°C, reduciendo eficiencia 25% y acortando vida útil. Protección: 1) Toldo/pérgola sobre unidad dejando 40cm espacio ventilación (€100-200); 2) Orientación norte/noreste instalación (evita sol tarde más fuerte); 3) Pintura reflectante blanca carcasa (€25-40 lata); 4) Malla sombra 70% (€30-60, reduce radiación sin bloquear aire); 5) Riego exterior suelo bajo unidad (evapora enfría ambiente). Prohibido: encerrar unidad (sobrecalentamiento), bloquear ventilación, cubrir totalmente. Ubicación ideal: patio interior sombra, fachada norte, bajo terraza/balcón superior. Sevilla: inversión protección (€100-150) mejora rendimiento 15-20% + prolonga vida 3-4 años. Consulta instalador antes instalar; reubicación posterior cuesta €300-500.',
        category: 'proteccion'
      },
      {
        question: '¿Es normal que aire acondicionado funcione 18-20 horas al día en Sevilla?',
        answer: 'Julio-agosto Sevilla: funcionamiento continuo es normal. Temperaturas nocturnas 28-32°C (no refrescan) + inercia térmica edificios = aire trabaja día/noche. Split inverter diseñado funcionamiento continuo; adapta potencia según necesidad (noche usa 30-40% potencia vs día 100%). Funcionamiento 24h clase A+++ más eficiente que encender/apagar: arranques consumen pico 3x nominal, paradas permiten calor acumularse (difícil recuperar). Consejos: 26°C nocturno suficiente (calor seco Sevilla permite dormir bien), ventilador techo nocturno complementa (€2/mes), cerrar vivienda desde 11:00h evita entrada calor. Modelos antiguos (>10 años) sin inverter: consumo excesivo 24h, considerar renovación (A+++ ahorra 40-50%, amortiza 3-4 veranos). Desconectar solo ausencias >4 días.',
        category: 'uso_continuo'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado sevilla',
        'instalación aire acondicionado sevilla',
        'reparación aire acondicionado sevilla',
        'aire acondicionado calor extremo sevilla',
        'mantenimiento aire sevilla'
      ],
      secondary: [
        'aire acondicionado ático sevilla',
        'split alta temperatura sevilla',
        'consumo aire acondicionado sevilla',
        'aire acondicionado centro histórico sevilla',
        'instalación split sevilla'
      ],
      longTail: [
        'por qué aire pierde rendimiento olas calor sevilla',
        'cuánto dispara consumo eléctrico aire sevilla',
        'potencia aire ático sevilla',
        'proteger unidad exterior sol sevilla',
        'normal aire funcione 20 horas día sevilla'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'malaga',
    metadata: {
      title: 'Aire Acondicionado en Málaga | Split para Apartamentos Costa del Sol',
      description: 'Instalación y reparación de aire acondicionado en Málaga. Especialistas en apartamentos turísticos y corrosión salina costera. Mantenimiento preventivo y sistemas eficientes para uso intensivo.'
    },
    seoText: 'Málaga combina clima mediterráneo cálido (32-38°C verano) con particularidades costeras que afectan significativamente a los sistemas de aire acondicionado. La brisa marina cargada de sal corroe unidades exteriores en zonas <1km costa (Centro, Malagueta, Pedregalejo), reduciendo vida útil 40% sin tratamiento anticorrosión. Los apartamentos turísticos experimentan uso intensivo concentrado en temporada alta (junio-septiembre) con picos de ocupación que someten equipos a ciclos extremos: funcionamiento continuo 15-20h/día durante ocupación + paradas prolongadas en temporada baja. El mercado inmobiliario turístico malagueño demanda instalaciones eficientes que minimicen quejas de clientes por ruido, malos olores o rendimiento insuficiente',
    faqs: [
      {
        question: '¿Qué mantenimiento necesita aire acondicionado en apartamento turístico Málaga?',
        answer: 'Apartamentos turísticos Málaga requieren mantenimiento riguroso evitar quejas clientes. Protocolo recomendado: 1) Pre-temporada alta (mayo): limpieza completa interior/exterior + desinfección + verificación gas (€120-180); 2) Durante temporada: limpieza filtros cada 15 días (personal limpieza/propietario); 3) Post-temporada (octubre): limpieza fungicida + protección parada prolongada; 4) Zonas costeras (<1km): limpieza exterior agua dulce presión baja elimina sal (€50-80 cada 6 meses). Coste anual profesional: €250-380 (2-3 limpiezas). Previene: averías plena ocupación (reparación urgencia €200-400), penalizaciones Booking/Airbnb malas reseñas, devoluciones reservas. Invertir mantenimiento ahorra reclamaciones + prolonga vida equipo 4-6 años.',
        category: 'turistico'
      },
      {
        question: '¿Por qué unidad exterior se oxida rápido en apartamentos costa Málaga?',
        answer: 'Costa Málaga (Malagueta, Pedregalejo, Torremolinos) tiene brisa marina con sal que corroe cobre/aluminio rápidamente. Mecanismo: partículas sal depositadas + humedad marina = electrólisis corrosión. Síntomas: aletas condensador corroídas (reducen 30-40% eficiencia), fugas gas circuito enfriamiento, carcasa deteriorada. Vida útil: equipo estándar 5-7 años costa vs 12-15 años interior. Solución: instalar modelos tratamiento anticorrosión "blue fin" o recubrimiento epoxi (+€180-300 compra inicial, prolonga vida útil 2x), limpieza agua dulce semestral (€40-70), protector lluvia orientación mar (€70-120). Apartamentos turísticos costa: coste equipo anticorrosión amortiza vs reemplazo prematuro (€700-1,200 nueva instalación cada 5-6 años).',
        category: 'corrosion'
      },
      {
        question: '¿Cuánto consume aire acondicionado apartamento 60m² temporada alta Málaga?',
        answer: 'Apartamento turístico 60m² Málaga temporada alta (julio-agosto): split 3,500W inverter A+++ funcionamiento 15-18h/día × 60 días = €180-250 consumo eléctrico. Factores: ocupación continua, clientes prefieren 22-23°C (frío excesivo +20% consumo), check-in/out días ventanas abiertas limpieza (+15%), orientación sur/oeste (+10%). Comparativa modelos: clase A+++ €230/verano, clase B antigua €380/verano (+65%). Ahorro propietarios: termostato bloqueado 24°C (confortable pero no excesivo), instrucciones huéspedes cerrar ventanas, aislamiento térmico ventanas (€150-300, reduce 20% consumo), timer nocturno modo eco 2:00-8:00 (€25-40/verano ahorro). Inversión equipo eficiente recupera 2-3 temporadas. Coste electricidad incluir cálculo rentabilidad alquiler.',
        category: 'consumo'
      },
      {
        question: '¿Qué hago si clientes se quejan del ruido del aire acondicionado en Málaga?',
        answer: 'Quejas ruido frecuentes apartamentos turísticos. Normativa: unidad exterior <65 dB día, <45 dB noche. Causas comunes: 1) Equipo antiguo/barato ruidoso (>55 dB); 2) Mal instalado sin soportes antivibratorios; 3) Ubicación exterior junto ventana vecinos; 4) Mantenimiento deficiente (rodamientos desgastados aumentan ruido). Soluciones: instalar equipos silenciosos (<40 dB, consultar especificaciones compra), soportes antivibratorios reduecen 60% vibración (€50-90), pantalla acústica (€100-180), orientar compresor evitando dormitorios. Apartamentos nuevos: especificar equipos ultra-silenciosos inverter (€650-1,100 instalados); previene reseñas negativas valen más que €100 extra. Quejas formales vecinos: medición técnica (€150-280) determina procedencia.',
        category: 'ruido'
      },
      {
        question: '¿Conviene poner aire conductos o splits en apartamento turístico Málaga?',
        answer: 'Decisión depende tamaño/rentabilidad. Splits individuales (2-3 unidades): €1,200-2,200 instalación completa, ventaja control independiente habitaciones (ahorro si ocupación parcial), reparación no afecta resto, inversión gradual. Conductos: €3,500-6,000 instalación, ventaja estética (invisible), silencioso, climatización uniforme, sin unidades interiores vistas (preferencia clientes lujo). Recomendación Málaga: apartamentos <80m² splits inverter (flexibilidad + menor coste), apartamentos >100m² conductos si objetivo alquiler lujo. Mantenimiento: splits más económico (€60-90/unidad anual), conductos requiere técnico especializado (€200-350/anual). Rentabilidad: splits amortizan 2-3 temporadas vs conductos 4-6 temporadas. Evaluar perfil cliente objetivo antes decidir.',
        category: 'tipo_equipo'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado málaga',
        'instalación aire acondicionado málaga',
        'reparación aire acondicionado málaga',
        'aire acondicionado apartamento turístico málaga',
        'mantenimiento aire málaga'
      ],
      secondary: [
        'aire acondicionado costa del sol',
        'split anticorrosión málaga',
        'aire acondicionado apartamento playa málaga',
        'instalación split málaga',
        'aire acondicionado temporal málaga'
      ],
      longTail: [
        'mantenimiento aire apartamento turístico málaga',
        'por qué unidad exterior oxida málaga costa',
        'cuánto consume aire apartamento temporada málaga',
        'quejas ruido aire acondicionado apartamento málaga',
        'aire conductos o splits apartamento turístico'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'aire-acondicionado',
    citySlug: 'zaragoza',
    metadata: {
      title: 'Aire Acondicionado en Zaragoza | Split Eficiente Clima Continental',
      description: 'Instalación y reparación de aire acondicionado en Zaragoza. Especialistas en bombas de calor para clima continental. Sistemas reversibles frío/calor. Eficiencia energética anual máxima.'
    },
    seoText: 'Zaragoza presenta un clima continental extremo que demanda sistemas de climatización versátiles: veranos calurosos con picos de 38-42°C e inviernos fríos con temperaturas de -5 a 5°C. Esta oscilación térmica anual de casi 50°C hace especialmente rentable la inversión en bombas de calor reversibles (aire acondicionado con función calefacción) que amortizan equipamiento en dos estaciones. El calor seco veraniego (humedad 30-45%) facilita el enfriamiento evaporativo pero las oscilaciones diarias (15°C día-noche) generan ciclos de arranque-parada que desgastan compresores si no son tecnología inverter. El viento del Cierzo (noroeste) enfría rápidamente las viviendas orientadas a este punto cardinal, mientras las orientaciones sur-suroeste acumulan calor excesivo',
    faqs: [
      {
        question: '¿Conviene instalar bomba de calor reversible en Zaragoza?',
        answer: 'Zaragoza: clima perfecto bombas calor. Verano 38-42°C + invierno -5 a 5°C = uso frío/calor rentabiliza inversión. Bomba calor split inverter cuesta +€100-200 vs solo frío, pero proporciona calefacción eficiente invierno (3-4 kW calor por 1 kW eléctrico gastado vs radiador eléctrico 1:1). Cálculo ahorro: vivienda 80m² complementar calefacción central con split salón invierno = €120-180 ahorro/invierno vs radiador eléctrico. Uso anual: verano (junio-septiembre) + invierno (noviembre-marzo) = 8-9 meses. Inversión bomba calor €800-1,300 instalada amortiza 3-4 años vs equipo solo frío (€650-1,000) sin función calor. Zaragoza: mínimo 70% instalaciones nuevas ya bomba calor por rentabilidad. Verificar unidad exterior resiste -10°C (modelos estándar limitan -5°C).',
        category: 'bomba_calor'
      },
      {
        question: '¿Cómo afectan cambios térmicos día-noche de Zaragoza al aire acondicionado?',
        answer: 'Oscilación Zaragoza verano: 38-42°C tarde → 20-24°C madrugada = 15-18°C diferencia. Aires antiguos sin inverter arrancan/paran constantemente (desgaste compresor). Tecnología inverter adapta potencia gradualmente: tarde 100% potencia, noche 20-30% mantenimiento. Ventajas inverter Zaragoza: 1) Ahorro 40-50% vs antiguo (arranques consumen picos); 2) Temperatura estable ±0.5°C (confort); 3) Vida útil compresor 12-15 años vs 6-8 años on/off; 4) Silencioso noche (baja potencia = <30 dB). Estrategia Zaragoza: enfriar vivienda tarde 14:00-22:00, noche mantener 25-26°C (fresco natural madrugada ayuda), ventilar 6:00-9:00 antes calor. Inversión inverter (+€150-250) recupera 2-3 veranos consumo.',
        category: 'cambios_termicos'
      },
      {
        question: '¿Qué orientación vivienda es peor para calor en Zaragoza?',
        answer: 'Zaragoza: peor orientación sur-suroeste. Recibe sol 12h/día verano (6:00-20:00), temperaturas interior alcanzan 32-36°C sin climatización. Cierzo (viento NO) no refresca fachada sur. Consecuencias: splits requieren potencia 30-40% superior vs orientación norte, consumo eléctrico +€80-130/verano, equipos trabajo forzado (mayor desgaste). Soluciones: aislamiento térmico ventanas (€200-400, reduce 30% carga), persianas exteriores blancas reflejan 60% radiación (€80-150/ventana), toldos fachada sur (€300-800), vegetación caduca sur (sombra verano, sol invierno). Split instalación sur-suroeste: sobredimensionar 20% (vivienda 80m² calcular como 95m²). Orientación norte: infrautiliza equipo verano pero ideal invierno. Consultar técnico evaluación térmica antes comprar potencia.',
        category: 'orientacion'
      },
      {
        question: '¿Cuánto cuesta climatizar vivienda completa Zaragoza frío y calor?',
        answer: 'Vivienda 90m² Zaragoza (3 habitaciones + salón): opción split: 1 split salón 4,300W + 2 splits dormitorios 2,600W = €2,200-3,200 instalación completa inverter A+++ frío/calor. Opción conductos: €4,500-7,000 instalación + obra falso techo. Consumo anual split: verano €110-150 (4 meses), invierno complemento radiadores €140-190 (4-5 meses) = €250-340/año total. Conductos: consumo similar pero mantenimiento más caro (€200-350/anual vs €150-220 splits). Recomendación Zaragoza: splits inversión menor (instalación gradual salón primero), flexibilidad zonas (habitaciones solo ocupadas), funcionalidad independiente (avería uno no afecta resto). Pisos <100m² splits preferible; viviendas >150m² considerar conductos por estética. Bomba calor amortiza 4-5 años vs calefacción eléctrica directa.',
        category: 'coste'
      },
      {
        question: '¿Cómo preparar aire acondicionado para invierno Zaragoza si solo da frío?',
        answer: 'Equipos solo frío (sin bomba calor) deben protegerse invierno Zaragoza: 1) Limpieza completa pre-guardado (octubre): filtros + drenaje evita moho hibernación (€50-80); 2) Cubrir unidad exterior permeable agua/impermeable viento (€30-60, protege heladas -5°C eventuales); 3) Desconectar magnetotérmico (ahorra standby 3-5W continuo); 4) Dejar interior accesible ventilación (evita humedad condensación interna). Heladas Zaragoza (-5 a 0°C) pueden dañar drenaje si agua residual congela expande; vaciar bandeja condensados. Primer arranque primavera (abril-mayo): quitar cobertura, conectar eléctrico, probar 10 min modo ventilación, luego frío. Mantenimiento pre-verano profesional: €60-90 (limpieza + verificación). Equipos bomba calor: usar invierno evita mantenimiento parada, función calor mantiene lubricación compresor.',
        category: 'invierno'
      }
    ],
    keywords: {
      primary: [
        'aire acondicionado zaragoza',
        'instalación aire acondicionado zaragoza',
        'bomba de calor zaragoza',
        'split frío calor zaragoza',
        'reparación aire zaragoza'
      ],
      secondary: [
        'aire acondicionado inverter zaragoza',
        'climatización eficiente zaragoza',
        'instalación bomba calor zaragoza',
        'mantenimiento aire acondicionado zaragoza',
        'split reversible zaragoza'
      ],
      longTail: [
        'conviene bomba calor reversible zaragoza',
        'cambios térmicos aire acondicionado zaragoza',
        'orientación vivienda calor zaragoza',
        'cuánto cuesta climatización completa zaragoza',
        'preparar aire invierno zaragoza'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  // ============================================================================
  // CALEFACCIÓN (HEATING) - CITY SEO CONTENT
  // Enterprise-grade climate-differentiated heating systems & winter comfort
  // ============================================================================

  {
    serviceId: 'calefaccion',
    citySlug: 'madrid',
    metadata: {
      title: 'Calefacción en Madrid | Calderas y Radiadores Urgencias 24h',
      description: 'Instalación y reparación de calefacción en Madrid. Expertos en calderas de gas, radiadores y calefacción central. Urgencias 24h en invierno. Mantenimiento preventivo y certificados.'
    },
    seoText: 'Madrid enfrenta inviernos continentales con temperaturas de -3 a 8°C entre diciembre y febrero, demandando sistemas de calefacción robustos y eficientes. Los edificios verticales madrileños (5-8 plantas) construidos entre 1950-1980 cuentan mayoritariamente con calefacción central comunitaria mediante calderas de gas natural, distribuyendo calor por radiadores de hierro fundido. El clima seco madrileño (humedad invierno 50-65%) favorece calefacción por radiadores tradicionales vs suelo radiante, evitando resecamiento excesivo del ambiente. Las comunidades de propietarios gestionan encendidos programados (típicamente 7:00-10:00h y 17:00-23:00h) con costes repartidos según coeficientes de participación. Las calderas individuales de gas (habituales en reformas y pisos sin calefacción central) requieren mantenimiento anual obligatorio y certificaciones periódicas',
    faqs: [
      {
        question: '¿Cuándo se enciende la calefacción central en Madrid?',
        answer: 'En Madrid, las comunidades encienden calefacción central típicamente mediados noviembre (cuando temperaturas bajan de 12°C) hasta mediados marzo. Horarios habituales: mañana 7:00-10:00h, tarde-noche 17:00-23:00h. La decisión la toma la comunidad en junta (mayoría simple). Coste promedio vivienda 80m²: €60-100/mes (diciembre-febrero pico). Algunas comunidades instalan termostatos programables comunitarios (€800-1,500) con sensores que encienden automáticamente cuando temperatura exterior <10°C. Si tu comunidad no enciende y hace frío, convocar junta extraordinaria. Pisos sin calefacción central: caldera individual + radiadores €2,500-4,500 instalación completa.',
        category: 'central'
      },
      {
        question: '¿Cuánto cuesta el gas de calefacción en invierno en Madrid?',
        answer: 'Madrid invierno (diciembre-febrero) con temperaturas -3 a 8°C. Piso 80m² con caldera individual gas natural consume: 800-1,200 m³/año = €600-950/invierno (tarifa regulada €0.75-0.80/m³). Factores: aislamiento vivienda (sin aislar +40% consumo), orientación norte (+20%), ventanas antiguas (+30%), termostato 21-22°C vs 19-20°C (+15%). Calefacción central comunitaria: €60-120/mes según coeficiente participación. Ahorro: aislamiento ventanas (€300-800, reduce 25% consumo), termostatos inteligentes (€80-150, ahorro 15-20% programando), purga radiadores anual (mejora rendimiento 10%). Inversión caldera condensación clase A ahorra 20-30% vs caldera estándar.',
        category: 'consumo'
      },
      {
        question: '¿Por qué algunos radiadores no calientan en calefacción central Madrid?',
        answer: 'Radiadores fríos en calefacción central indican: 1) Aire acumulado (purgar válvula superior, suena borboteo al abrir); 2) Válvula termostática atascada por cal/óxido (limpiar o cambiar €15-40); 3) Lodos acumulados en circuito (requiere limpieza profesional €200-500 vivienda); 4) Desequilibrio hidráulico (radiadores lejanos calderas reciben menos caudal, técnico debe reequilibrar sistema €150-350). Madrid: agua dura (150-300 mg/L cal) genera lodos en instalaciones >15 años sin limpieza. Prevención: purga anual inicio temporada (octubre), limpieza circuito cada 5-7 años, aditivo anticorrosión (€40-80/año). Radiador completamente frío: llamar técnico comunitario.',
        category: 'radiadores'
      },
      {
        question: '¿Cada cuánto revisar caldera individual gas en Madrid?',
        answer: 'Mantenimiento caldera gas es OBLIGATORIO anual por normativa. Técnico certificado verifica: combustión correcta (CO, rendimiento), limpieza quemadores, estado intercambiador, presión circuito (1-1.5 bar), válvula seguridad, extracción humos. Coste: €70-120 revisión + certificado. Sin mantenimiento: 1) Pierde eficiencia 15-25% (más consumo gas); 2) Riesgo avería invierno (reparación urgencia €200-500); 3) Seguro hogar puede no cubrir si no hay mantenimiento al día; 4) Multa si inspección detecta falta certificado (€300-600). Mejor momento: septiembre-octubre (antes frío, técnicos disponibles). Caldera >12 años: considerar renovación por condensación clase A (ahorra 25-30% gas).',
        category: 'mantenimiento'
      },
      {
        question: '¿Conviene instalar bomba de calor para calefacción en Madrid?',
        answer: 'Madrid con invierno moderado (media 5-7°C, mínimas -3°C eventuales) es limítrofe para bomba calor. Ventajas: eficiencia 300-350% (3-3.5 kW calor por 1 kW eléctrico gastado) vs radiador eléctrico 100%, mismo equipo enfría verano. Desventajas: rendimiento cae con <0°C exterior, inversión inicial alta (€2,500-4,500 vs €1,500-2,500 caldera gas). Cálculo: vivienda 85m² gasta €750/invierno gas vs €550 bomba calor eléctrica (tarifa €0.12/kWh valle). Diferencia €200/año amortiza instalación en 10-15 años. Recomendación Madrid: si ya tienes aire acondicionado, añadir función calor (+€100-200) rentable complemento; para calefacción principal, gas natural sigue más económico.',
        category: 'bomba_calor'
      },
      {
        question: '¿Qué hacer si caldera de gas se apaga sola en pleno invierno?',
        answer: 'Caldera que se apaga indica problema seguridad: 1) Presión circuito baja <0.8 bar (rellenar hasta 1-1.5 bar con llave llenado); 2) Extracción humos bloqueada (ventilador no expulsa gases, caldera corta por seguridad); 3) Llama no detectada (termopar sucio/averiado); 4) Sobrecalentamiento (circulador agua parado, limpieza o cambio €120-250). Si no arranca tras rellenar presión, NO forzar arranques repetidos (puede dañar electroválvula). Llamar técnico caldera urgente 24h: €90-180 visita + reparación. Invierno Madrid: técnicos saturados, esperas 24-48h laborables, 2-4 días festivos. Tener manta eléctrica emergencia (€30-60). Prevención: mantenimiento septiembre evita 80% averías invierno.',
        category: 'emergencias'
      }
    ],
    keywords: {
      primary: [
        'calefacción madrid',
        'caldera gas madrid',
        'reparación caldera madrid',
        'radiadores madrid',
        'calefacción central madrid'
      ],
      secondary: [
        'mantenimiento caldera madrid',
        'instalación calefacción madrid',
        'bomba calor calefacción madrid',
        'caldera individual madrid',
        'purgar radiadores madrid'
      ],
      longTail: [
        'cuándo se enciende calefacción central madrid',
        'cuánto cuesta gas calefacción invierno madrid',
        'por qué radiadores no calientan madrid',
        'cada cuánto revisar caldera gas madrid',
        'conviene bomba calor calefacción madrid'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'calefaccion',
    citySlug: 'barcelona',
    metadata: {
      title: 'Calefacción en Barcelona | Calderas y suelo Radiante ITE',
      description: 'Instalación y reparación de calefacción en Barcelona. Expertos en calefacción central, suelo radiante y humedad invernal. Certificados ITE y mantenimiento preventivo.'
    },
    seoText: 'Barcelona experimenta inviernos suaves (8-15°C) pero con humedad mediterránea elevada (70-85%) que genera sensación de frío superior a la temperatura real. Los edificios del Eixample con calefacción central mediante calderas comunitarias distribuyen calor por radiadores de hierro fundido en circuitos con más de 80 años de antigüedad. La humedad invernal favorece condensación en ventanas y paredes mal aisladas, demandando sistemas que eviten resecamiento excesivo del ambiente. Las fincas modernistas con techos altos (3.5-4m) requieren mayor potencia calorífica para compensar volumen. La ITE (Inspección Técnica Edificios) exige certificación de calderas y evaluación del estado de circuitos de calefacción en inmuebles >45 años. Las reformas integrales en pisos del Eixample optan crecientemente por suelo radiante de baja temperatura combinado con bomba de calor aerotérmica',
    faqs: [
      {
        question: '¿Por qué la calefacción central funciona mal en fincas antiguas del Eixample?',
        answer: 'Las fincas Eixample (1900-1940) tienen circuitos de calefacción con 80-100 años conservando tuberías originales de hierro. Problemas: 1) Lodos y óxido acumulados reducen caudal (radiadores lejanos no calientan); 2) Pérdidas distribución por aislamiento inexistente tuberías en patios; 3) Calderas antiguas sobredimensionadas (bajo rendimiento <60%); 4) Válvulas corroídas no cierran (pérdidas continuas). Solución progresiva: renovar caldera por condensación (€3,500-6,000 comunitaria), limpieza circuito completo (€800-2,000 edificio), aislar tuberías patios (€15-25/metro). ITE puede exigir estas  mejoras. Coste/vivienda edificio 12 pisos: €450-800 una vez.',
        category: 'eixample'
      },
      {
        question: '¿Conviene suelo radiante en reforma de piso en Barcelona?',
        answer: 'Barcelona con invierno suave (8-15°C) + humedad alta (75-85%) es ideal para suelo radiante baja temperatura (35-45°C agua vs 70-80°C radiadores). Ventajas: 1) Calor uniforme sin resecar ambiente húmedo; 2) Eficiencia 25% superior con bomba calor aerotérmica; 3) Sin radiadores (espacio útil +4-6m²); 4) Funciona refrigeración verano (suelo frío 18-20°C). Desventajas: coste instalación €50-90/m² (piso 80m² = €4,000-7,200), requiere reforma completa (levantar suelo), inercia térmica (tarda 2-3h calentar). Recomendación Barcelona: reforma integral con bomba calor aerotérmica + suelo radiante amortiza en 12-15 años vs caldera gas + radiadores. Pisos sin reforma: radiadores más económico.',
        category: 'suelo_radiante'
      },
      {
        question: '¿Cómo afecta la humedad de Barcelona a la calefacción?',
        answer: 'Humedad invernal Barcelona (75-85%) hace que temperatura percibida sea 3-5°C inferior a real. Edificios con calefacción generan condensación en ventanas y paredes frías (puentes térmicos), favoreciendo moho si no hay ventilación. Solución: ventilar 10-15 min diarios (mañana cuando calienta), mantener temperatura estable 19-21°C (vs encender/apagar que genera condensación), deshumidificador si >75% HR interior (€100-250), doble acristalamiento ventanas (€250-450/m²) elimina condensación. Calefacción debe combinarse con ventilación controlada; ambiente cerrado hermético con alta humedad es insalubre. Barcelona: preferir calor radiante uniforme vs aire forzado que reseca.',
        category: 'humedad'
      },
      {
        question: '¿Qué cubre la ITE respecto a calefacción en Barcelona?',
        answer: 'ITE Barcelona revisa instalaciones térmicas en edificios >45 años. Evalúa: caldera comunitaria (rendimiento, seguridad, emisiones), estado circuitos calefacción (fugas, corrosión), aislamiento térmico, certificaciones vigentes. Si ITE detecta: caldera >25 años bajo rendimiento, circuitos con fugas, ausencia certificados mantenimiento, emite "desfavorable" obligando subsanar 12-24 meses. Coste habitual: renovación caldera comunitaria (€4,000-8,000, repartido vecinos = €300-650/vivienda edificio 12 pisos), limpieza circuito (€800-2,000 comunidad), certificaciones mantenimiento (€80-150/anual). Sin subsanar, dificulta compraventa y puede multar comunidad.',
        category: 'ite'
      },
      {
        question: '¿Cuánto cuesta calefacción central vs bomba de calor en Barcelona?',
        answer: 'Comparativa piso 85m² Barcelona (invierno Nov-Mar, media 10-12°C): Calefacción central gas: €70-110/mes × 5 meses = €350-550/invierno. Bomba calor individual (splits): 4-5 kW necesarios, consumo €0.12/kWh valle, COP 3.5 → €250-400/invierno. Inversión: central ya instalado (€0), bomba calor multisplit €2,500-4,000. Diferencia anual €100-200 amortiza bomba en 12-20 años. Ventaja bomba: también enfría verano, independencia horarios comunitarios, sin averías generales que afectan todo edificio. Desventaja: no funciona bien <0°C (raro Barcelona pero ocurre). Barcelona: ambos sistemas viables, decisión según si ya tienes uno instalado.',
        category: 'coste'
      },
      {
        question: '¿Qué hacer si aparece agua bajo radiador en Barcelona?',
        answer: 'Fuga radiador indica: 1) Válvula purgador superior agrietada (cambio €8-20); 2) Junta válvula termostática deteriorada (cambio €15-35); 3) Fisura radiador por corrosión (requiere reemplazo €150-400 instalado); 4) Conexión roscada tuberías floja (reapretar con llave). Protocolo: cerrar válvulas entrada/salida radiador (llaves inferiores), secar agua, localizar origen goteo. Si no puedes cerrar válvulas (oxidadas/bloqueadas), cerrar llave paso general calefacción vivienda. Llamar técnico urgencia: €80-150. En Barcelona, humedad acelera corrosión radiadores hierro >40 años; si varios radiadores tienen fugas, considerar renovación completa (€150-350/radiador instalado). Prevención: purgar inicio temporada, inspeccionar conexiones.',
        category: 'fugas'
      }
    ],
    keywords: {
      primary: [
        'calefacción barcelona',
        'caldera gas barcelona',
        'reparación caldera barcelona',
        'suelo radiante barcelona',
        'calefacción central barcelona'
      ],
      secondary: [
        'calefacción eixample',
        'bomba calor calefacción barcelona',
        'mantenimiento caldera barcelona',
        'ITE calefacción barcelona',
        'radiadores barcelona'
      ],
      longTail: [
        'calefacción funciona mal fincas antiguas eixample',
        'conviene suelo radiante reforma barcelona',
        'cómo afecta humedad calefacción barcelona',
        'qué cubre ITE calefacción barcelona',
        'cuánto cuesta calefacción central barcelona'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'calefaccion',
    citySlug: 'valencia',
    metadata: {
      title: 'Calefacción en Valencia | Calderas y Climatización Invierno',
      description: 'Instalación y reparación de calefacción en Valencia. Expertos en climatización intermitente y humedad mediterránea. Bombas de calor y radiadores eficientes.'
    },
    seoText: 'Valencia presenta inviernos suaves (8-16°C) con humedad mediterránea alta (70-85%) que obligan a estrategias de calefacción intermitente. A diferencia de climas continentales, la calefacción valenciana se usa de forma discontinua: encender temperaturas bajas puntuales (<10°C) durante olas de frío diciembre-febrero, mantener apagada en días templados (15-18°C habituales). Esta intermitencia favorece sistemas de arranque rápido como bombas de calor reversibles (splits que ya enfrían en verano) vs calefacción central por radiadores que tarda horas en calentar masa térmica. Los apartamentos turísticos en zonas costeras demandan calefacción eficiente para confort invernal de huéspedes, aunque uso sea ocasional. La humedad de invierno exige sistemas que no resequen excesivamente el ambiente, favoreciendo radiadores de baja temperatura o suelo radiante',
    faqs: [
      {
        question: '¿Realmente se necesita calefacción en Valencia?',
        answer: 'Valencia tiene invierno suave (media 10-12°C) pero con días fríos puntuales: olas frío enero-febrero con mínimas 2-6°C, temperaturas máximas 8-12°C durante 7-15 días. Humedad 75-85% hace que sensación térmica sea 4-6°C inferior. Interior viviendas sin calefacción: 12-15°C (incómodo trabajar/dormir). Solución: no necesitas calefacción potente continua (como Madrid/Zaragoza), pero sí sistema eficiente uso intermitente. Recomendación: splits con bomba calor (ya tienes para verano, añade calor +€100-200). Alternativa: radiadores eléctricos bajo consumo (€60-150/unidad) para habitaciones. Evitar: calefacción central tradicional (excesivo para clima Valencia, infrautiliza instalación).',
        category: 'necesidad'
      },
      {
        question: '¿Conviene bomba de calor como calefacción principal en Valencia?',
        answer: 'Valencia es clima IDEAL bomba calor: invierno suave (8-16°C), electricidad relativamente económica, mismo equipo enfría verano. Bomba calor split inverter: rinde COP 3.5-4.5 en Valencia (3.5-4.5 kW calor por 1 kW eléctrico). Piso 75m² necesita 2 splits (salón 3,500W + dormitorio 2,500W = 6 kW total) instalados €2,200-3,400. Consumo invierno Valencia (uso intermitente 40-60 días, 6-8h/día): €180-280 (tarifa €0.12/kWh). Alternativa caldera gas: instalación €2,500-4,000 + consumo €400-600/invierno. Bomba calor amortiza en 8-12 años + funcionalidad verano. Apartamentos turísticos: bomba calor obligado (clientes esperan climatización verano+invierno). Recomendación: sí, muy rentable.',
        category: 'bomba_calor'
      },
      {
        question: '¿Cómo calentar eficientemente piso en Valencia úsando poco la calefacción?',
        answer: 'Valencia requiere calefacción intermitente (días fríos puntuales). Estrategia eficiente: 1) Splits bomba calor (arranque rápido 15 min, calientan solo cuando necesario); 2) Termostato 19-20°C suficiente (humedad hace sentir más frío que es); 3) Calentar solo habitaciones ocupadas (cerrar puertas, no derrochar calentando toda vivienda); 4) Aprovechar días soleados (abrir persianas sur 10:00-16:00, inercia térmica gratis); 5) Deshumidificar si HR >75% (ambiente menos húmedo siente más cálido). Evitar: radiadores eléctricos directos 2,000W (gasto €0.24/h vs bomba calor €0.07/h). Inversión splits reversibles calor/frío se amortiza con doble funcionalidad.',
        category: 'eficiencia'
      },
      {
        question: '¿Qué problemas da humedad invernal en sistemas de calefacción Valencia?',
        answer: 'Valencia invierno con humedad 75-85% genera: 1) Condensación ventanas cuando calefacción funciona (vidrio frío + aire caliente interior); 2) Moho en esquinas/puentes térmicos si ambiente >22°C + >70% HR; 3) Sensación frío pese temperatura (humedad dificulta evaporación sudor); 4) Radiadores agua calientan lentamente (alta humedad retiene calor peor). Solución: ventilar 15 min mañana (incluso con calefacción, renueva aire), deshumidificador independiente (€100-250) si HR interior >70%, mantener 19-21°C estable vs picos 24°C (evita condensación al apagar). Calefacción seca excesiva (radiadores eléctricos) también mala; ambiente 40-60% HR es óptimo.',
        category: 'humedad'
      },
      {
        question: '¿Cuánto cuesta instalar caldera de gas individual en Valencia?',
        answer: 'Caldera gas individual para piso sin calefacción central Valencia: Caldera condensación clase A 24-28 kW (70-90m²) + 6-8 radiadores aluminio + tubería + instalación = €3,500-5,500 completo. Incluye: caldera (€900-1,500), radiadores (€100-200/unidad), tubería cobre (€12-18/metro), mano obra instalación (€800-1,500), certificado gas (€80-150), boletín eléctrico (€100-180). Consumo gas invierno Valencia (uso moderado 60 días × 6h/día): €350-550. Alternativa: bomba calor multisplit frío/calor €2,500-4,000, consumo invierno €200-350 pero también enfría verano (doble funcionalidad). Valencia: valorar bomba calor si no tienes aire verano; si solo calefacción ocasional, gas sigue siendo económico.',
        category: 'instalacion'
      },
      {
        question: '¿Qué mantenimiento necesita apartamento turístico con calefacción en Valencia?',
        answer: 'Apartamentos vacacionales Valencia ofrecen calefacción invierno (noviembre-marzo, huéspedes nórdicos la valoran mucho). Mantenimiento específico: 1) Pre-temporada invierno (octubre): revisión bomba calor modo calor, limpiar filtros, verificar mandos; 2) Durante temporada: instrucciones huéspedes uso correcto (termostato 20-21°C, no abrir ventanas con calefacción); 3) Mensual: verificar consumo anormal (huéspedes dejan 26°C ventanas abiertas); 4) Post-temporada (marzo): limpieza + desinfección. Coste mantenimiento bomba calor: €120-200/año (2 limpiezas). Previene: quejas frío (reseñas negativas), consumo eléctrico excesivo (€200-400/mes si mal usado), av erías por dejadez. Termostato bloqueado 21°C máximo previene abusos.',
        category: 'turistico'
      }
    ],
    keywords: {
      primary: [
        'calefacción valencia',
        'caldera gas valencia',
        'bomba calor calefacción valencia',
        'suelo radiante valencia',
        'calefacción invierno valencia'
      ],
      secondary: [
        'reparación caldera valencia',
        'instalación calefacción valencia',
        'calefacción apartamento turístico valencia',
        'radiadores valencia',
        'mantenimiento caldera valencia'
      ],
      longTail: [
        'realmente se necesita calefacción valencia',
        'conviene bomba calor calefacción valencia',
        'cómo calentar eficientemente piso valencia',
        'humedad invernal calefacción valencia',
        'cuánto cuesta instalar caldera gas valencia'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'calefaccion',
    citySlug: 'sevilla',
    metadata: {
      title: 'Calefacción en Sevilla | Calderas Eficientes para Invierno Corto',
      description: 'Instalación y reparación de calefacción en Sevilla. Expertos en sistemas eficientes para invierno corto pero frío. Bombas de calor reversibles y radiadores de bajo consumo.'
    },
    seoText: 'Sevilla experimenta inviernos cortos pero con noches frías que demandan calefacción puntual. Las temperaturas invernales oscilan entre 5-15°C de día y 2-8°C de noche durante diciembre-febrero, con inversión térmica que hace madrugadas especialmente frías. La inversión en calefacción debe optimizarse para uso intermitente: 60-80 días/año vs 120-150 días en climas continentales. Las bombas de calor reversibles (splits que enfrían verano y calientan invierno) son especialmente rentables en Sevilla por doble estacionalidad: 6 meses aire acondicionado (mayo-octubre) + 3 meses calefacción (diciembre-febrero) = 9 meses uso total. Los edificios del casco histórico con muros gruesos (80-120cm) conservan inercia térmica nocturna, requiriendo calefacción solo en horas más frías',
    faqs: [
      {
        question: '¿Conviene instalar calefacción en Sevilla si solo hace frío 2-3 meses?',
        answer: 'Sevilla usa calefacción 60-90 días/año (diciembre-febrero), pero noches frías (2-8°C) hacen interior vivienda bajar a 10-14°C (incómodo). Solución óptima: bomba calor reversible (split frío/calor). ¿Por qué? Ya necesitas aire verano (obligatorio), añadir función calor cuesta +€100-200 pero ofrece calefacción eficiente. Evitar: caldera gas individual si solo usas 2 meses (inversión €3,000-5,000 + mantenimiento €90/año infrautilizada). Radiadores eléctricos: solución económica inicial (€60-150/unidad) pero consumo alto (€0.24/h vs €0.07/h bomba calor). Recomendación Sevilla: bomba calor multisplit (salón + 2 dormitorios) €2,500-3,800 completo, funcionalidad 9 meses/año (verano + invierno), amortización 4-6 años vs instalar caldera.',
        category: 'rentabilidad'
      },
      {
        question: '¿Por qué hace tanto frío de noche en Sevilla pese a ser ciudad cálida?',
        answer: 'Sevilla experimenta inversión térmica invernal: días templados 14-18°C pero noches frías 2-6°C (diferencia 12-15°C). Cielo despejado (clima seco 45-60% HR) permite pérdida radiación nocturna rápida. Edificios sin aislamiento (construcción 1950-1980) pierden calor acumulado durante día. Madrugadas 5:00-8:00 son más frías. Interior vivienda sin calefacción: baja a 10-13°C (dormitorios orientación norte <10°C). Solución: calefacción nocturna programada 22:00-8:00 mantener 18-20°C (bomba calor consume €0.30-0.50/noche), edredones nórdicos (tog 13-15, €80-150), cerrar persianas al anochecer (retiene calor). Días soleados: abrir persianas sur 10:00-17:00 (ganancia solar gratis, inercia térmica).',
        category: 'climatologia'
      },
      {
        question: '¿Qué potencia de calefacción necesito en Sevilla?',
        answer: 'Sevilla con invierno suave requiere potencia moderada. Cálculo: 80-100 W/m² (vs 120-150 W/m² Madrid/Zaragoza). Piso 80m² necesita: 6.5-8 kW térmicos. Bomba calor: 2 splits (salón 3,5 kW + dormitorio 2,5 kW = 6 kW eléctricos generan 18-24 kW térmicos con COP 3-4). Caldera gas: modelo 20-24 kW suficiente. Factores Sevilla: aislamiento deficiente edificios antiguos (+20% potencia), orientación norte (+15%), techos altos >3m (+10%). Edificios históricos casco con muros 80-120cm necesitan MENOS potencia (inercia térmica). No sobredimensionar: calderas excesivamente potentes funcionan ineficientemente con ciclos cortos. Consultar técnico con experiencia Sevilla antes comprar.',
        category: 'dimensionamiento'
      },
      {
        question: '¿Cuánto consume calefacción eléctrica vs gas en Sevilla?',
        answer: 'Sevilla con uso intermitente 60-80 días invierno. Piso 75m²: Bomba calor (COP 3.5): 6-8h/día × 70 días × 2 kW promedio ÷ 3.5 = 280 kWh × €0.12/kWh = €230-320/invierno. Caldera gas: 70 días × 6h × 2.5 kW térmico ÷ 0.90 rendimiento = 600 m³ × €0.75/m³ = €450-550/invierno. Radiadores eléctricos directos: misma necesidad térmica = 1,050 kWh × €0.15/kWh = €600-750/invierno (+100% vs bomba calor). Sevilla: bomba calor gana por eficiencia + doble uso verano. Gas competitivo solo si instalación ya existe. Radiadores eléctricos: solo habitaciones puntuales (€40-80/invierno complemento).',
        category: 'consumo'
      },
      {
        question: '¿Cómo calentar edificios históricos del centro de Sevilla eficientemente?',
        answer: 'Edificios históricos sevillanos (Santa Cruz, Arenal, Triana) con muros 80-120cm tienen inercia térmica: conservan fresco verano + calor invierno. Ventaja: requieren menos potencia calefacción. Desafío: no se pueden hacer rozas invasivas (patrimonio), instalación debe respetar estructura. Soluciones: 1) Splits bomba calor (Sin obra rozas, instalan fácilmente); 2) Radiadores eléctricos bajo consumo (€80-200/unidad, tomas existentes); 3) Estufas catalíticas gas butano (€150-350, sin instalación, móviles). Evitar: suelo radiante (requiere levantar todo pavimento, a veces protegido). Coste bomba calor 2 unidades: €1,800-2,800 instaladas. Rendimiento excelente por: muros gruesos retienen calor, techo altos dispersan calor (splits posición alta optimizan).',
        category: 'edificios_historicos'
      },
      {
        question: '¿Qué mantenimiento necesita bomba de calor usada también para calefacción?',
        answer: 'Bomba calor reversible Sevilla funciona 9 meses/año (verano frío + invierno calor). Mantenimiento: 1) Pre-verano (abril): limpieza modo frío (€60-90); 2) Pre-invierno (noviembre): verificar modo calor funciona, limpiar filtros, comprobar válvula inversión; 3) Anual: limpieza completa profesional (€120-180 ambos modos). Desgaste: modo calor estresa más compresor (COP alto exige trabajo intenso), revisar cada 2-3 años refrigerante. Vida útil bomba reversible bien mantenida: 12-15 años vs 15-18 años solo frío (mayor uso). Mantenimiento previene: fallo calefacción en pleno frío enero (técnicos saturados), pérdida eficiencia (+€150-250/año desperdiciados). Splits >8 años: vigilar rendimiento modo calor.',
        category: 'mantenimiento'
      }
    ],
    keywords: {
      primary: [
        'calefacción sevilla',
        'bomba calor calefacción sevilla',
        'caldera gas sevilla',
        'calefacción invierno sevilla',
        'radiadores sevilla'
      ],
      secondary: [
        'instalación calefacción sevilla',
        'split calor sevilla',
        'calefacción eficiente sevilla',
        'reparación caldera sevilla',
        'calefacción edificios históricos sevilla'
      ],
      longTail: [
        'realmente necesita calefacción sevilla',
        'conviene bomba calor calefacción sevilla',
        'por qué tanto frío noche sevilla invierno',
        'qué potencia calefacción necesito sevilla',
        'cuánto consume calefacción sevilla'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'calefaccion',
    citySlug: 'malaga',
    metadata: {
      title: 'Calefacción en Málaga | Sistemas para Invierno Suave Costero',
      description: 'Instalación y reparación de calefacción en Málaga. Expertos en climatización puntual y apartamentos turísticos. Bombas de calor eficientes y mantenimiento preventivo.'
    },
    seoText: 'Málaga presenta el invierno más suave de las grandes ciudades españolas (10-18°C de día, 6-12°C de noche) con humedad costera mediterránea (65-80%) que modera la sensación térmica. La proximidad al mar atenúa oscilaciones térmicas, resultando en necesidades de calefacción mínimas: apenas 30-60 días/año con uso puntual durante olas de frío enero-febrero. Esta climatología favorece bombas de calor reversibles que amortizan inversión principalmente en refrigeración veraniega (6-7 meses) mientras ofrecen calefacción ocasional eficiente para días fríos. Los apartamentos turísticos costeros demandan sistemas flexibles que proporcionen confort a huéspedes internacionales acostumbrados a temperaturas interiores superiores (22-24°C) sin generar consumos excesivos en propiedades de segunda residencia',
    faqs: [
      {
        question: '¿Es necesaria calefacción en Málaga o sobrevivo sin ella?',
        answer: 'Málaga tiene el invierno más suave España continental (media 12-14°C). Días fríos puntuales: 15-25 días/año con mínimas 4-8°C. Interior vivienda sin calefacción: 14-17°C (tolerable con ropa abrigada pero incómodo trabajar/estar todo día). Residentes habituales: muchos usan solo calefacción puntual (radiadores eléctricos €60-120, estufas catalíticas €100-250) días muy fríos. Apartamentos turísticos: calefacción OBLIGATORIA (huéspedes internacionales esperan 20-22°C interior). Solución universal: bomba calor reversible (mismo split verano añade calor +€100-200), úsala cuando necesites sin inversión caldera grande. Viviendas secundarias: bomba calor portátil (€300-600) para visitas invierno.',
        category: 'necesidad'
      },
      {
        question: '¿Qué sistema de calefacción es más barato en Málaga para uso ocasional?',
        answer: 'Málaga usa calefacción solo 30-60 días/año (mínimo España). Para uso tan bajo: Splits bomba calor reversible: inversión €1,800-2,800 (2 unidades), consumo invierno €120-200 (uso reducido). Ya rentable por verano obligatorio. Radiadores eléctricos bajo consumo: inversión €180-400 (3 unidades), consumo €150-280/invierno. Caldera gas: inversión €3,500-5,000 + consumo €300-450 + mantenimiento €90/año = INFRAUTILIZADA. Recomendación Málaga: si tienes aire verano, NO instales gas para 40 días invierno; usa splits bomba calor. Si no tienes aire (raro), radiadores eléctricos eficientes puntuales (2-3 habitaciones) más económico que caldera completa.',
        category: 'economia'
      },
      {
        question: '¿Cómo afecta la humedad costera a sistemas de calefacción en Málaga?',
        answer: 'Humedad costera Málaga (70-80% invierno) genera: 1) Sensación frío mayor que temperatura real (12°C con 80% HR siente como 8-9°C); 2) Condensación ventanas cuando calefacción funciona (vidrio frío, aire interior caliente húmedo); 3) Corrosión acelerada radiadores metálicos (óxido en modelos hierro >20 años); 4) Moho en esquinas frías si calefacción +22°C sin ventilar. Solución: mantener 19-21°C (suficiente con humedad ambiente), ventilar 10 min mañana soleada, deshumidificar si HR inte rior >75% (€100-200), doble acristalamiento (€250-400/m²) elimina condensación. Bomba calor controla humedad mejor que radiadores (circula aire vs solo calentar). Evitar sobrecalentar; Málaga no requiere 24°C interior.',
        category: 'humedad'
      },
      {
        question: '¿Qué calefacción poner en segunda residencia que uso poco en Málaga?',
        answer: 'Segunda residencia con uso esporádico invierno (fines semana, vacaciones): Bomba calor portátil (€350-700, calentar/enfriar, llevas si vendes propiedad), splits fijos bomba calor si también usas verano (€1,600-2,500 instalados, valor permanente inmueble), radiadores eléctricos bajo consumo (€80-180/unidad, sin instalación). Evitar: caldera gas (mantenimiento anual €90 aunque no uses, instalación fija €3,500+, riesgo averías desuso). Málaga: mayoría segundas residencias tienen splits reversibles (alquileres vacacionales temporada alta, calefacción eventual invierno). Inversión splits añade valor reventa propiedad; radiadores eléctricos no aportan valor pero funcionan.',
        category: 'segunda_residencia'
      },
      {
        question: '¿Qué mantenimiento necesita calefacción en apartamento turístico Málaga costa?',
        answer: 'Apartamentos turísticos Costa del Sol usan calefacción noviembre-marzo para huéspedes nórdicos. Mantenimiento específico: 1) Pre-invierno (octubre): verificar modo calor bomba funciona, limpiar filtros, comprobar mandos remotos (baterías); 2) Durante uso: instrucciones huéspedes (termostato 20-21°C máx, cerrar ventanas); 3) Post-invierno (abril): limpieza completa (sal + humedad deterioran unidades costeras); 4) Verificar consumos mensuales (detectar uso abusivo 26°C continuo). Coste mantenimiento bomba calor costa: €180-300/año (2-3 limpiezas, sal mari na requiere más atención). Previene: quejas frío/calor en reseñas, consumos €300-600/mes por mal uso, corrosión prematura unidades exteriores (vida útil 6-8 años costa vs 12-15 interior).',
        category: 'turistico'
      }
    ],
    keywords: {
      primary: [
        'calefacción málaga',
        'bomba calor calefacción málaga',
        'calefacción invierno málaga',
        'split calor málaga',
        'calefacción costa del sol'
      ],
      secondary: [
        'caldera gas málaga',
        'radiadores eléctricos málaga',
        'calefacción apartamento turístico málaga',
        'instalación calefacción málaga',
        'calefacción segunda residencia málaga'
      ],
      longTail: [
        'es necesaria calefacción málaga',
        'qué sistema calefacción más barato málaga',
        'humedad costera afecta calefacción málaga',
        'calefacción segunda residencia uso poco málaga',
        'mantenimiento calefacción apartamento málaga'
      ]
    },
    lastUpdated: '2026-05-22'
  },

  {
    serviceId: 'calefaccion',
    citySlug: 'zaragoza',
    metadata: {
      title: 'Calefacción en Zaragoza | Calderas para Invierno Continental Fuerte',
      description: 'Instalación y reparación de calefacción en Zaragoza. Expertos en clima continental extremo, calderas de gas y bombas de calor. Urgencias invierno 24h. Protección antiheladas.'
    },
    seoText: 'Zaragoza enfrenta uno de los inviernos más duros de España con temperaturas de -5 a +8°C durante diciembre-febrero, demandando sistemas de calefacción dimensionados para frío intenso y prolongado. El clima continental seco genera oscilaciones diurnas de 10-15°C (mañanas -3°C, tardes 8-10°C) que exigen sistemas con capacidad de reacción rápida. El cierzo invernal (viento 40-80 km/h desde noroeste) incrementa sensación térmica real -6 a -10°C, infiltrándose por ventanas sin sellado adecuado. Las viviendas orientadas norte-noroeste sufren pérdidas térmicas extremas requiriendo potencias calefación 30-40% superiores a orientaciones sur-suroeste. Los edificios del casco histórico con muros gruesos pero sin aislamiento moderno demandan actualizaciones térmicas para evitar consumos desorbitados',
    faqs: [
      {
        question: '¿Qué potencia de calefacción necesito en Zaragoza para invierno fuerte?',
        answer: 'Zaragoza con inviernos -5 a +8°C requiere potencia robusta: 120-150 W/m² (vs 80-100 Madrid, 60-80 Sevilla/Málaga). Piso 85m² necesita: 10-13 kW térmicos. Caldera gas: modelo 24-28 kW (sobredimensionado 20% permite arranques sin forzar). Bomba calor: menos eficiente <0°C (COP baja a 2-2.5), requiere potencia eléctrica alta; equipo 3.5+2.5 kW = 6 kW eléctricos generan 12-15 kW térmicos a 5°C exterior. Factores críticos Zaragoza: orientación norte (+30% potencia), exposición cierzo (+20%), pisos esquina (2 fachadas exteriores +25%), ventanas antiguas sin doble acristalamiento (+30%). Aislamiento térmico reduce necesidades 30-40%; invertir primero en aislamiento, después dimensionar calefacción.',
        category: 'dimensionamiento'
      },
      {
        question: '¿Conviene bomba de calor o caldera de gas para Zaragoza con frío intenso?',
        answer: 'Zaragoza es caso límite bomba calor por frío <0°C habitual. Comparativa: Caldera condensación gas: eficiente todo rango temperaturas (rendimiento 90-95%), inversión €3,000-5,000 instalada, consumo €700-1,000/invierno (120 días uso). Bomba calor aerotérmica: eficiente hasta 0°C (COP 3-3.5), pierde rendimiento <-3°C (COP 2-2.2), inversión €6,000-10,000 (aerotérmica suelo), consumo €500-750/invierno pero añadir resistencia eléctrica apoyo días <-3°C. Bomba calor splits: inversión menor (€2,500-4,000) pero no diseñados calefacción principal <0°C. Recomendación Zaragoza: gas natural sigue siendo óptimo para calefacción  principal; bomba calor viable solo si: edificio muy aislado, combinas con solar térmica, o usas splits como complemento (no principal).',
        category: 'sistema_optimo'
      },
      {
        question: '¿Cómo proteger calefacción de heladas en Zaragoza?',
        answer: 'Heladas zaragozanas (-8 a 0°C, diciembre-febrero) pueden congelar agua circuito calefacción si caldera se apaga días muy fríos (segunda residencia, avería). Agua congelada se expande rompe tuberías/radiadores. Protección: 1) Anticongelante circuito cerrado (glicol 20-30%, protege hasta -15°C, €60-120 carga profesional); 2) Función antiheladas caldera (mantiene >5°C automático, gasta €15-30/mes desocupación); 3) Vaciar circuito si ausencia >1 mes invierno (€80-150 vaciar + rellenar); 4) Calefacción mínima 8-10°C continuo (protege + evita humedad). NUNCA apagar completamente calefacción vivienda desocupada invierno Zaragoza. Rotura por congelación: €800-3,000 reparación + daños.',
        category: 'antiheladas'
      },
      {
        question: '¿Por qué caldera consume tanto gas en Zaragoza comparado con otras ciudades?',
        answer: 'Zaragoza lidera consumo calefacción España por: 1) Invierno largo intenso (noviembre-marzo, 120-140 días vs 60-90 Sevilla/Málaga); 2) Temperaturas bajas (-5 a 8°C vs 8-15°C mediterráneo); 3) Cierzo enfría edificios rápidamente (viento frío 40-80 km/h); 4) Oscilación diurna grande (arranques frecuentes). Piso 80m² Zaragoza: 1,200-1,600 m³ gas/invierno = €900-1,200 (tarifa regulada). Reducción consumo: aislamiento térmico (€2,000-5,000 inversión, ahorra 30-40% = €300-450/año), caldera condensación clase A vs estándar (ahorro 25%), termostatos programables por zonas (€80-200, ahorro 15-20%), burletes ventanas (€50-120, reducen infiltraciones cierzo). Inversión aislamiento amortiza 5-8 años en Zaragoza por uso intensivo.',
        category: 'consumo'
      },
      {
        question: '¿Qué hacer si caldera se congela en Zaragoza durante ola de frío?',
        answer: 'Si caldera se apaga con heladas intensas (<-5°C) y no rearranca: 1) Verificar hielo en tubería evacuación condensados (caldera condensación expulsa agua que congela exterior); 2) Comprobar presión circuito (congelación causa pérdida presión); 3) NO forzar arranques repetidos (daña electroválvula); 4) Llamar técnico urgencia 24h (€120-250 intervención invierno). Prevención: aislar tubería condensados exterior con coquilla térmica (€5-10/metro), tubería evacuación con pendiente adecuada (evita retención agua), función antiheladas activa siempre, mantener calefacción mínima viviendas desocupadas. Congelación puede romper intercambiador caldera: reparación €400-900 o reemplazo caldera completa €2,500-4,500.',
        category: 'heladas'
      },
      {
        question: '¿Cuánto cuesta calefacción para piso completo en Zaragoza?',
        answer: 'Piso 85m² Zaragoza sin calefacción, instalación completa: Caldera condensación gas 24 kW + 7-8 radiadores aluminio + tubería + obra = €4,500-7,000 total. Incluye: caldera (€1,200-1,800), radiadores (€120-220/unidad), tubería cobre/multicapa (€15-25/metro), mano obra (€1,200-2,000), certificado gas (€90-150), boletín eléctrico (€120-180). Consumo invierno (120 días uso): €850-1,200/año. Alternativa bomba calor aerotérmica + suelo radiante: €9,000-14,000 instalación (mayor por obra suelo), consumo €600-900/año (más eficiente) pero inversión adicional amortiza 15-25 años. Zaragoza: gas natural sigue siendo más económico para calefacción principal; bomba calor viable solo reformas integrales con ahorro largo plazo.',
        category: 'coste_instalacion'
      }
    ],
    keywords: {
      primary: [
        'calefacción zaragoza',
        'caldera gas zaragoza',
        'reparación caldera zaragoza',
        'calefacción invierno zaragoza',
        'radiadores zaragoza'
      ],
      secondary: [
        'instalación calefacción zaragoza',
        'bomba calor calefacción zaragoza',
        'calefacción cierzo zaragoza',
        'antiheladas caldera zaragoza',
        'mantenimiento caldera zaragoza'
      ],
      longTail: [
        'qué potencia calefacción necesito zaragoza',
        'conviene bomba calor caldera gas zaragoza',
        'proteger calefacción heladas zaragoza',
        'por qué caldera consume tanto gas zaragoza',
        'cuánto cuesta calefacción piso zaragoza'
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
