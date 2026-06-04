/**
 * City Hub SEO Content
 * 
 * PURPOSE: Multi-service city landing pages (/servicios/{city})
 * INTENT: Users searching for "servicios profesionales {city}" or multiple services in a city
 * 
 * CRITICAL ANTI-CANNIBALIZATION RULES:
 * - City hubs focus on MULTI-SERVICE positioning
 * - Service+city pages focus on SINGLE-SERVICE depth
 * - NO service-specific deep dives (that's for /fontanero/madrid etc.)
 * - Focus on city-wide service availability, emergency response, and cross-service benefits
 * - Emphasize comprehensive coverage, not individual service expertise
 */

export interface CityHubSEOContent {
  citySlug: string
  seoText: string // 800-1200 words, MULTI-SERVICE focused
  faqs: CityHubFAQ[]
  localContext: string // Brief city-specific context for E-E-A-T
}

export interface CityHubFAQ {
  question: string
  answer: string
  category: 'servicios' | 'cobertura' | 'urgencias' | 'precio' | 'general'
}

export const cityHubSEOContent: CityHubSEOContent[] = [
  // ============================================================================
  // MADRID - Multi-Service City Hub
  // ============================================================================
  {
    citySlug: 'madrid',
    seoText: `Madrid, como capital y ciudad más poblada de España, presenta una demanda constante de servicios profesionales de reparación y mantenimiento del hogar. Con más de 3,2 millones de habitantes repartidos en 21 distritos, la diversidad arquitectónica y la densidad urbana generan necesidades específicas que requieren respuesta rápida y profesional cualificado.

**Servicios Integrales en Todos los Distritos de Madrid**

Ofrecemos cobertura completa en los 21 distritos madrileños: desde el centro histórico (Centro, Salamanca, Chamberí, Retiro) hasta las áreas residenciales periféricas (Fuencarral, Hortaleza, Villaverde, Carabanchel). Nuestra red de profesionales garantiza tiempos de respuesta de 30-60 minutos en urgencias dentro de la M-30, y menos de 90 minutos en toda el área metropolitana.

La capital combina edificios centenarios con promociones modernas, cada uno con características y desafíos propios. Los edificios históricos del centro (construidos 1900-1960) conservan instalaciones originales que requieren experiencia específica en fontanería de hierro galvanizado, sistemas eléctricos antiguos y calefacciones obsoletas. Las promociones recientes (post-2000) incorporan tecnología avanzada: domótica, climatización inverter, instalaciones eficientes que necesitan mantenimiento especializado.

**Respuesta Urgente 24 Horas en Madrid Capital**

Madrid nunca duerme, nosotros tampoco. Nuestro servicio de urgencias 24/7 cubre todas las emergencias domésticas: fugas de agua, cortes eléctricos, atascos severos, averías de calefacción en invierno y fallos de aire acondicionado en los meses de calor extremo (julio-agosto con temperaturas 35-40°C). 

La urgencia real no avisa. Una tubería que revienta a las 3 de la madrugada puede causar daños por miles de euros si no se actúa inmediatamente. Un corte eléctrico en pleno verano con nevera y congelador llenos representa pérdidas materiales y riesgo sanitario. Nuestros profesionales salen equipados con herramientas, repuestos comunes y vehículos preparados para resolver la mayoría de emergencias en la primera visita.

**Experiencia Local en Madrid: Conocemos Tu Ciudad**

Llevamos años trabajando en Madrid capital y área metropolitana. Conocemos las particularidades de cada distrito: la presión de agua baja en pisos altos sin grupo de presión (común en Lavapiés, Malasaña), los problemas de evacuación en bajantes comunitarias antiguas (Austrias, La Latina), las instalaciones eléctricas subdimensionadas en edificios rehabilitados (Chueca, Tribunal), y las necesidades de climatización en áticos y últimas plantas expuestas.

Esta experiencia local marca la diferencia. Sabemos dónde están las arquetas comunitarias, cómo funcionan los sistemas de cada época constructiva, qué materiales se usaron en cada década y cómo abordar reparaciones respetando normativa ITE y ordenanzas municipales. No improvisamos; aplicamos conocimiento acumulado.

**Servicios Múltiples, Un Solo Contacto**

La ventaja de trabajar con nosotros es la integración. Si necesitas fontanero y electricista para una reforma, coordinamos ambos oficios. Si detectamos un problema eléctrico durante una reparación de fontanería, lo gestionamos sin que tengas que buscar otro profesional. Este enfoque integral ahorra tiempo, dinero y elimina la frustración de coordinar múltiples proveedores.

Muchos problemas domésticos son multidisciplinares: una humedad puede tener origen en fontanería (filtración) o en climatización (condensación). Un termo eléctrico combina fontanería y electricidad. Una rehabilitación de baño requiere fontanero, electricista y, a veces, albañil. Nosotros gestionamos todo el proceso.

**Transparencia y Presupuestos Claros**

En Madrid capital operan cientos de empresas de servicios, no todas con los mismos estándares. Nosotros aplicamos transparencia total: presupuesto antes de intervenir, precios claros en urgencias, garantía escrita en reparaciones. No hay sorpresas en la factura.

Los precios en Madrid son competitivos pero justos. Una llamada urgente nocturna cuesta más que una intervención programada diurna; es lógico. Lo importante es conocer el coste antes de autorizar el trabajo. Nuestros profesionales informan del precio total: desplazamiento + mano de obra + materiales, todo incluido, antes de empezar.

**Compromiso con la Calidad y el Servicio**

Madrid es un mercado exigente. Los clientes madrileños valoran el profesionalismo, la puntualidad y el trabajo bien hecho. Nosotros cumplimos esos estándares. Cada intervención se documenta, cada reparación lleva garantía, cada cliente recibe seguimiento post-servicio.

Nuestro objetivo no es solo resolver el problema inmediato; es ganar tu confianza para que, cuando necesites cualquier servicio profesional en tu hogar, pienses en nosotros primero. La satisfacción del cliente no es un eslogan; es nuestro modelo de negocio.`,

    faqs: [
      {
        question: '¿Qué servicios profesionales ofrecéis en Madrid?',
        answer: 'Ofrecemos todos los servicios esenciales para el hogar en Madrid: fontanería (reparaciones, instalaciones, urgencias), electricidad (cuadros, enchufes, iluminación), desatascos (tuberías, bajantes, sifones), calefacción (calderas, radiadores, mantenimiento), aire acondicionado (instalación, reparación, gas), y limpieza de tuberías. Cubrimos desde pequeñas reparaciones hasta reformas completas, siempre con profesionales cualificados y garantía de trabajo.',
        category: 'servicios'
      },
      {
        question: '¿Cuánto tardáis en llegar en urgencias dentro de Madrid?',
        answer: 'Nuestro tiempo de respuesta para urgencias en Madrid capital es de 30-60 minutos dentro de la M-30 y menos de 90 minutos en el área metropolitana completa. Priorizamos emergencias críticas (fugas incontroladas, cortes eléctricos totales, atascos con riesgo de desbordamiento). Para servicios programados sin carácter urgente, coordinamos cita en 24-48 horas según disponibilidad. Trabajamos 24 horas, 365 días al año, incluidos festivos.',
        category: 'urgencias'
      },
      {
        question: '¿Atendéis todos los distritos de Madrid?',
        answer: 'Sí, atendemos los 21 distritos de Madrid capital y área metropolitana cercana. Tenemos cobertura total: Centro, Arganzuela, Retiro, Salamanca, Chamartín, Tetuán, Chamberí, Fuencarral-El Pardo, Moncloa-Aravaca, Latina, Carabanchel, Usera, Puente de Vallecas, Moratalaz, Ciudad Lineal, Hortaleza, Villaverde, Villa de Vallecas, Vicálvaro, San Blas-Canillejas y Barajas. También cubrimos municipios limítrofes como Pozuelo, Alcorcón, Getafe, Leganés y otros bajo petición.',
        category: 'cobertura'
      },
      {
        question: '¿Cuánto cuestan los servicios profesionales en Madrid?',
        answer: 'Los precios varían según el servicio y la urgencia. Reparaciones programadas: desde €50-80 por visita + materiales. Urgencias 24h: desde €70-120 según horario (nocturno/festivo más caro). Siempre informamos del coste ANTES de intervenir; autorizas el presupuesto y entonces trabajamos. No hay sorpresas. Ejemplo: cambio grifo básico €80-120 total, reparación fuga urgente €100-200, revisión eléctrica cuadro €60-90. Pedimos presupuesto sin compromiso para trabajos grandes.',
        category: 'precio'
      },
      {
        question: '¿Por qué elegir vuestros servicios en Madrid frente a otros?',
        answer: 'Ventajas diferenciales: (1) Múltiples servicios coordinados - si necesitas fontanero y electricista, gestionamos ambos; (2) Experiencia local - conocemos Madrid, sus edificios, sus característ icas; (3) Respuesta rápida - menos de 60 minutos en urgencias en M-30; (4) Transparencia total - presupuesto claro antes de trabajar; (5) Garantía escrita en reparaciones; (6) Disponibilidad 24/7/365; (7) Profesionales cualificados con experiencia demostrable. No somos la opción más barata, somos la más fiable.',
        category: 'general'
      },
      {
        question: '¿Trabajáis con comunidades de vecinos en Madrid?',
        answer: 'Sí, trabajamos regularmente con comunidades de propietarios en Madrid. Ofrecemos servicios específicos: reparación de bajantes comunitarias, mantenimiento de calderas centrales, revisión de instalaciones eléctricas comunes, desatascos en colectores generales, y contratos de mantenimiento preventivo. Emitimos facturas y certificados necesarios para la comunidad. Coordinamos con presidentes y administradores de fincas. Respondemos a urgencias comunitarias (fugas en patios, cortes eléctricos portales) con prioridad.',
        category: 'servicios'
      },
      {
        question: '¿Qué garantía ofrecéis en las reparaciones realizadas en Madrid?',
        answer: 'Todas nuestras intervenciones incluyen garantía por escrito. Reparaciones estándar: 6-12 meses de garantía en mano de obra y materiales instalados por nosotros. Instalaciones nuevas: hasta 24 meses según complejidad. La garantía cubre defectos de ejecución o fallos en materiales suministrados por nosotros; no cubre uso inadecuado o daños externos posteriores. Si algo falla dentro del periodo de garantía por causa imputable a nuestro trabajo, volvemos sin coste adicional. Emitimos certificados y documentación completa.',
        category: 'general'
      },
      {
        question: '¿Cómo solicito un servicio profesional en Madrid?',
        answer: 'Tres formas simples: (1) Llama al teléfono visible en la web - atención inmediata, especialmente para urgencias; (2) WhatsApp - envía mensaje describiendo el problem a, respondemos rápido y coordinamos visita; (3) Formulario web - para servicios programados sin urgencia. Indica: tipo de servicio necesario, ubicación en Madrid (distrito/barrio), descripción del problema, y si es urgencia o puede programarse. En urgencias, priorizamos contacto telefónico directo para rapidez. Te confirmamos disponibilidad y tiempo estimado de llegada.',
        category: 'general'
      }
    ],
    localContext: 'Con sede operativa cercana a Madrid y años de experiencia en la capital, nuestro equipo conoce a fondo las características constructivas de cada distrito madrileño: desde los edificios centenarios del centro histórico hasta las promociones modernas de la periferia. Esta experiencia local garantiza diagnósticos precisos y soluciones adaptadas a las particularidades de cada zona.'
  },

  // ============================================================================
  // BARCELONA - Multi-Service City Hub
  // ============================================================================
  {
    citySlug: 'barcelona',
    seoText: `Barcelona, con 1,6 millones de habitantes y una arquitectura única en Europa, requiere servicios profesionales especializados que comprendan sus particularidades constructivas y climáticas. Desde el Eixample modernista hasta los barrios del litoral mediterráneo, cada zona presenta desafíos específicos.

**Cobertura Integral en Toda Barcelona**

Atendemos los 10 distritos barceloneses: Ciutat Vella, Eixample, Sants-Montjuïc, Les Corts, Sarrià-Sant Gervasi, Gràcia, Horta-Guinardó, Nou Barris, Sant Andreu y Sant Martí. Nuestros profesionales conocen las características de cada barrio, desde los edificios patrimoniales del Gòtic y Born hasta las viviendas modernas de Diagonal Mar y 22@.

Barcelona presenta una complejidad arquitectónica excepcional. Los edificios modernistas del Eixample (1900-1930) combinan belleza patrimonial con instalaciones centenarias que requieren intervenciones respetuosas y especializadas. Los patios de luces característicos crean microclimas de alta humedad que afectan a tuberías, instalaciones eléctricas y sistemas de climatización. La proximidad al mar (0-3 km en muchos barrios) genera corrosión acelerada en elementos metálicos.

**Servicio de Urgencias 24 Horas en Barcelona**

Barcelona es una ciudad que nunca para: turismo, negocios, vida urbana continua. Nuestro servicio de emergencias 24/7 responde en 30-60 minutos en el área central (Ciutat Vella, Eixample, Gràcia) y menos de 90 minutos en toda el área metropolitana. Comprendemos que una urgencia doméstica no puede esperar hasta el lunes: una fuga puede dañar un edificio histórico catalogado, un corte eléctrico afecta conservación de alimentos y trabajo remoto, un atasco puede causar desbordamiento en pisos inferiores.

El clima mediterráneo de Barcelona genera demandas específicas: veranos calurosos (28-35°C julio-agosto) con uso intensivo de aire acondicionado, inviernos suaves pero húmedos que exigen calefacción eficiente, y temporales de lluvia intensa que ponen a prueba los sistemas de evacuación pluvial. Nuestros profesionales están preparados para gestionar estas emergencias estacionales.

**Experiencia en Arquitectura Barcelonesa**

Lo que diferencia Barcelona es su patrimonio arquitectónico. Los edificios modernistas del Eixample no son solo bonitos; presentan complejidades técnicas: distribuciones irregulares, patios comunitarios con instalaciones compartidas, forjados altos con tuberías empostradas, y elementos patrimoniales que no pueden alterarse sin permiso.

Ciutat Vella (Raval, Gòtic, Born, Barceloneta) conserva edificios medievales y barrocos con siglos de antigüedad. Intervenir en estas estructuras requiere métodos no invasivos: termografía para localizar fugas sin rozas, videoendoscopia para inspeccionar tuberías, técnicas de reparación que minimicen impacto en patrimonio. Trabajamos coordinados con servicios de patrimonio municipal cuando es necesario.

Los barrios modernos (Diagonal Mar, 22@, Fòrum) presentan edificios tecnológicamente avanzados: domótica, climatización centralizada, instalaciones de eficiencia energética. Estos sistemas requieren conocimiento actualizado en tecnologías de construcción contemporáneas.

**Servicios Integrados para Barcelona**

Ofrecemos todo el espectro de servicios profesionales: fontanería (instalaciones, reparaciones, mantenimiento), electricidad (cuadros, cableado, iluminación, domótica), desatascos (tuberías, bajantes, colectores), climatización (aire acondicionado, calefacción, bombas de calor), y limpieza técnica de instalaciones.

Nuestro valor diferencial es la integración. En Barcelona, donde muchas intervenciones requieren coordinación multi-oficio, gestionamos todo el proceso. Una reforma de baño en el Eixample necesita fontanero, electricista, tal vez obra menor: nosotros coordinamos todo. Una avería de termo eléctrico combina fontanería y electricidad: mismo profesional. Una rehabilitación de local puede requerir actualización integral: gestionamos proyecto completo.

**Transparencia y Compromiso con el Cliente**

Barcelona es una ciudad cosmopolita con estándares altos. Los residentes barceloneses valoran profesionalidad, transparencia y calidad. Nosotros compartimos esos valores: presupuestos claros antes de intervenir, información completa de costes, garantías por escrito, seguimiento post-servicio.

Los precios en Barcelona reflejan el nivel de vida y la complejidad técnica. Las intervenciones en edificios catalogados cuestan más por las restricciones normativas. Las urgencias nocturnas tienen recargo justificado. Las reformas en Eixample requieren experiencia específica. Todo esto se explica claramente; el cliente decide con información completa.

**Respeto por la Ciudad y sus Habitantes**

Trabajar en Barcelona implica responsabilidad. Intervenimos en viviendas de familias, comercios en funcionamiento, edificios con valor histórico. Nuestros profesionales entienden que no solo reparan instalaciones; contribuyen a mantener el patrimonio urbano y la calidad de vida de la ciudad.

Cada trabajo se ejecuta con limpieza, respeto por los espacios, cumplimiento de horarios y minimización de molestias. Generamos factura completa con certificados necesarios. Cumplimos normativa municipal y autonómica. Somos parte del ecosistema de servicios profesionales que mantiene Barcelona funcionando día a día.`,

    faqs: [
      {
        question: '¿Qué servicios profesionales ofrecéis en Barcelona?',
        answer: 'Ofrecemos servicios completos en Barcelona: fontanería (instalaciones, reparaciones, emergencias con fugas), electricidad (cuadros eléctricos, iluminación, enchufes, certificados), desatascos (tuberías, bajantes, métodos mecánicos y químicos), climatización (aire acondicionado, calefacción, mantenimiento, carga de gas), y limpieza técnica de instalaciones. Trabajamos en viviendas particulares, comunidades de propietarios, locales comerciales y edificios catalogados cumpliendo toda normativa. Equipo profesional con años de experiencia en Barcelona.',
        category: 'servicios'
      },
      {
        question: '¿Cuánto tardáis en llegar en urgencias en Barcelona?',
        answer: 'Tiempo de respuesta en urgencias en Barcelona: 30-60 minutos en área central (Ciutat Vella, Eixample, Gràcia, Les Corts) y hasta 90 minutos en toda el área metropolitana (incluido: Hospitalet, Badalona, Santa Coloma, Cornellà). Para emergencias críticas con riesgo de daños mayores, priorizamos atención inmediata. Disponibles 24 horas todos los días incluidos festivos y verano. Para servicios programados coordinamos cita en 24-48 horas. Confirmamos tiempo estimado al recibir llamada.',
        category: 'urgencias'
      },
      {
        question: '¿Tenéis experiencia trabajando en edificios modernistas del Eixample?',
        answer: 'Sí, tenemos amplia experiencia en edificios modernistas del Eixample. Conocemos sus particularidades: patios de iluces con alta humedad, tuberías de hierro galvanizado originales, instalaciones eléctricas antiguas, distribuciones irregulares, y elementos patrimoniales protegidos. Usamos métodos no invasivos cuando procede: termografía, videoendoscopia, reparaciones puntuales minimizando rozas. Respetamos ordenanzas de patrimonio. Trabajamos coordinados con comunidades y, si necesario, con permisos municipales. Diferenciamos reforma libre de intervención en elementos protegidos.',
        category: 'servicios'
      },
      {
        question: '¿Atendéis urgencias en Ciutat Vella y edificios históricos de Barcelona?',
        answer: 'Sí, atendemos urgencias en Ciutat Vella (Gòtic, Raval, Born, Barceloneta) y todos los edificios históricos de Barcelona. Entendemos las complejidades de estos inmuebles: estructuras centenarias, catalogación patrimonial, accesos complicados, instalaciones antiguas. Nuestros profesionales están capacitados para trabajar con respeto al patrimonio usando técnicas adecuadas. En emergencias (fugas, cortes eléctricos), priorizamos contener el daño con mínima invasión. Para reparaciones definitivas, asesoramos sobre normativa y permisos si aplican. Experiencia demostrable en barrio.',
        category: 'urgencias'
      },
      {
        question: '¿Qué precios tenéis para servicios profesionales en Barcelona?',
        answer: 'Precios orientativos en Barcelona: visita diagnóstico €50-80, urgencia 24h desde €80-140 según horario y festivo. Reparaciones comunes: cambio grifo €90-130, reparación fuga €100-250, revisión eléctrica €60-100, desatasco simple €80-120, recarga gas AC €90-180. Trabajos en edificios catalogados o Eixample pueden tener recargo por complejidad. SIEMPRE presupuesto antes de intervenir; autorizas y trabajamos. Sin compromiso para grandes trabajos. Precios Barcelona son competitivos considerando experiencia y calidad; no somos los más baratos, somos profesionales.',
        category: 'precio'
      },
      {
        question: '¿Trabajáis en toda el área metropolitana de Barcelona?',
        answer: 'Sí, cobertura completa en área metropolitana: Barcelona ciudad (10 distritos), Hospitalet de Llobregat, Badalona, Sabadell, Terrassa, Santa Coloma de Gramenet, Cornellà, Sant Bou, Mataró, Granollers y otros municipios del Barcelonès, Baix Llobregat y Vallès. Consulta cobertura si vives en municipio específico. Tiempos de llegada en urgencias varían: Barcelona capital 30-60 min, área metropolitana próxima 60-90 min, municipios alejados hasta 120 min según tráfico y ubicación. Coordinamos servicios programados con antelación.',
        category: 'cobertura'
      },
      {
        question: '¿Cómo afecta la humedad de Barcelona a las instalaciones?',
        answer: 'Barcelona tiene humedad relativa alta (70-85% en invierno) por proximidad al mar, afectando instalaciones. Corrosión acelerada en tuberías metálicas (hierro galvanizado común en edificios antiguos), oxidación en cuadros eléctricos externos, moho en baños interiores mal ventilados, condensación en sistemas de climatización. Soluciones: sustitución tuberías metálicas por PEX o multicapa, protección extra en instalaciones eléctricas de patios, ventilación forzada en baños, mantenimiento preventivo en AC. Como profesionales en Barcelona, conocemos estos problemas y asesoramos soluciones duraderas.',
        category: 'general'
      },
      {
        question: '¿Cómo solicito un servicio profesional en Barcelona?',
        answer: 'Tres opciones: (1) Llámanos por teléfono - mejor para urgencias, atención inmediata; (2) WhatsApp - envía mensaje con tipo de servicio, ubicación en Barcelona (distrito/barrio), descripción problema, fotos si es posible; (3) Formulario web - para servicios programados sin prisa. Especifica si es urgencia o puede programarse. Cuanto más detalles proporciones (tipo vivienda, qué falla, desde cuándo), mejor podemos asesorarte. Confirmamos disponibilidad, tiempo llegada estimado, y coste orientativo. En Barcelona trabajamos 24/7 incluyendo festivos.',
        category: 'general'
      }
    ],
    localContext: 'Llevamos años trabajando en Barcelona y conocemos profundamente la ciudad: desde la complejidad de los edificios modernistas del Eixample hasta las particularidades de los inmuebles históricos de Ciutat Vella. Nuestra experiencia en arquitectura catalana y el clima mediterráneo nos permite ofrecer soluciones técnicas adaptadas a cada barrio y tipo de construcción.'
  },

  // ============================================================================
  // VALENCIA - Multi-Service City Hub
  // ============================================================================
  {
    citySlug: 'valencia',
    seoText: `Valencia, tercera ciudad de España con casi 800.000 habitantes, combina patrimonio histórico, expansión moderna y proximidad al Mediterráneo. Esta diversidad arquitectónica y climática genera necesidades específicas de servicios profesionales que requieren conocimiento local profundo.

**Servicios Profesionales en Todos los Distritos de Valencia**

Cubrimos los 19 distritos de Valencia: desde el centro histórico de Ciutat Vella hasta los barrios marítimos (Malvarrosa, Cabanyal, El Saler), pasando por l'Eixample, Campanar, Benimaclet, y las zonas en expansión. Cada distrito tiene sus particularidades constructivas y necesidades; nuestros profesionales conocen estas diferencias y adaptan sus intervenciones.

Valencia presenta características únicas. El clima mediterráneo cálido-seco con veranos intensos (35-42°C julio-agosto) y la cercanía al mar (muchos barrios a menos de 5 km) afectan directamente a las instalaciones: corrosión salina en zonas costeras, alto uso de climatización en verano, baja presión de agua en edificios altos sin grupo de presión, y expansión térmica en tuberías expuestas.

El patrimonio histórico de Ciutat Vella y El Carmen conserva edificios de siglos de antigüedad con instalaciones que mezclan épocas construction. Las expansiones modernas (Ruzafa, Benimaclet, Campanar) presentan construcciones de los años 60-80 con necesidades de renovación. Los desarrollos recientes (Ciudad de las Artes y las Ciencias, Avenida de Francia) incorporan tecnología constructiva avanzada.

**Urgencias 24/7: Respuesta Rápida en Valencia**

Valencia requiere servicio de emergencia continuo. Una fuga de agua en pleno agosto puede causar daños mayores por la rápida evaporación y humedad combinadas. Un corte eléctrico en verano con temperaturas de 40°C representa riesgo para conservación de alimentos y salud (ancianos, niños). Un atasco severo durante las DANAS (lluvias intensas típicas del otoño valenciano) puede provocar inundaciones en bajos y sótanos.

Nuestro servicio de urgencias opera 24 horas, 365 días al año. Tiempo de respuesta: 30-60 minutos en ciudad consolidada (Ciutat Vella, l'Eixample, Ruzafa, Campanar) y hasta 90 minutos en pedanías y área metropolitana (Paterna, Mislata, Burjassot, Manises). Nuestros profesionales salen equipados con herramienta, materiales básicos y vehículos preparados para resolver emergencias en primera intervención.

**Conocimiento Local de Valencia**

Lo que marca la diferencia en Valencia es comprender su idiosincrasia. Las viviendas valencianas suelen tener terrazas amplias y patios interiores; estas áreas exteriores exponen instalaciones a factores climáticos intensos. El viento de poniente en primavera-verano puede dañar unidades exteriores de aire acondicionado mal instaladas. La sal marina afecta tuberías y cableados en Malvarrosa, Cabanyal, Nazaret, y El Saler.

Los edificios del centro histórico presentan distribuciones complejas heredadas de reformas sucesivas. No es raro encontrar instalaciones "parche" acumuladas por décadas. Valencia creció mucho en los años 60-70 con promociones que ahora requieren renovación integral: tuberías de fibrocemento, cableados sin toma de tierra, calefacciones antiguas.

Las expromoción modernas incorporan climatización eficiente, pero el uso intensivo (5-6 meses al año en Valencia) requiere mantenimiento preventivo que muchas veces no se realiza. Nuestro equipo asesora sobre mantenimiento preventivo para evitar averías en plena ola de calor.

**Oferta Integral de Servicios**

Proporcionamos soluciones completas: fontanería (fugas, instalaciones, mantenimiento), electricidad (cuadros, circuitos, iluminación, boletines), desatascos (mecánicos, químicos, inspección por cámara), climatización (aire acondicionado instalación/reparación/gas, calefacción, aerotermia), y servicios especializados como limpieza de tuberías.

La ventaja de un proveedor integral es la coordinación. En Valencia, donde el calor obliga a tener climatización operativa, una avería de AC puede requerir revisión eléctrica también. Un problema de alta humedad puede tener origen en filtración (fontanería) o condensación (climatización). Nosotros diagnosticamos holísticamente y solucionamos de raíz, sin derivarte a múltiples proveedores.

**Relación Calidad-Precio Competitiva**

Valencia es una ciudad con costes de vida moderados comparada con Madrid o Barcelona, pero sin comprometer calidad. Nuestros precios son transparentes y competitivos: siempre presupuesto antes de trabajar, desglose claro de mano de obra y materiales, sin sorpresas en factura.

Las urgencias tienen recargo por disponibilidad 24h, es lógico. Las intervenciones en edificios históricos pueden requerir técnicas específicas que cuestan más. Lo importante es que tú decides con información completa: sabes cuánto va a costar antes de autorizar el trabajo.

**Compromiso con Valencia y sus Habitantes**

Trabajamos en Valencia porque nos gusta la ciudad y su gente. Cada intervención se realiza pensando en largo plazo: no reparamos "para que aguante"; reparamos profesionalmente con garantía. Cada cliente es un vecino; cada trabajo es una oportunidad de demostrar compromiso.

Valencia está creciendo como polo tecnológico y de calidad de vida. Nosotros contribuimos manteniendo las viviendas funcionando correctamente, respondiendo rápido en emergencias, y proporcionando el servicio profesional que la tercera ciudad de España merece.`,

    faqs: [
      {
        question: '¿Qué servicios profesionales ofrecéis en Valencia?',
        answer: 'En Valencia ofrecemos servicios integrales: fontanería (reparaciones, instalaciones, emergencias), electricidad (cuadros, cableado, iluminación, certificados), desatascos (tuberías, bajantes, inspección cámara), climatización (aire acondicionado instalación/reparación/gas, calefacción, bombas de calor), y limpieza técnica de instalaciones. Trabajamos en viviendas, comunidades, locales y edificios históricos. Cobertura en los 19 distritos de Valencia ciudad y área metropolitana (Paterna, Mislata, Torrente bajo consulta). Equipo especializado con experiencia en clima mediterráneo valenciano.',
        category: 'servicios'
      },
      {
        question: '¿Cuánto tardáis en llegar en urgencias en Valencia?',
        answer: 'Tiempos de respuesta en urgencias en Valencia: 30-60 minutos en ciudad consolidada (Ciutat Vella, l\'Eixample, Ruzafa, Benimaclet, Campanar) y hasta 90 minutos en zonas periféricas y pedanías. Para emergencias críticas (fugas grandes, cortes eléctricos totales, atascos con desbordamiento) priorizamos atención inmediata. Disponemos de servicio 24 horas todos los días incluidos festivos, Fallas, Feria de Julio y verano. Para servicios programados coordinamos cita en 24-48 horas. Confirmamos tiempo estimado al contactar.',
        category: 'urgencias'
      },
      {
        question: '¿Cómo afecta el clima de Valencia a las instalaciones del hogar?',
        answer: 'El clima mediterráneo de Valencia (veranos 35-42°C, cercanía al mar) afecta instalaciones: (1) Alto uso AC 5-6 meses/año estressa componentes, requiere mantenimiento; (2) Sal marina en zonas costeras (Malvarrosa, Cabanyal) corroe tuberías metálicas y cableados; (3) Calor extremo dilata tuberías PVC exteriores, puede causar fugas; (4) Humedad alta en otoño-primavera favorece condensación en AC; (5) DANAS (lluvias intensas otoño) pueden saturar bajantes. Soluciones: mantenimiento preventivo AC primavera, tuberías anticorrosión en costa, protección IP en instalaciones exteriores.',
        category: 'general'
      },
      {
        question: '¿Trabajáis en los barrios marítimos de Valencia (Malvarrosa, Cabanyal)?',
        answer: 'Sí, trabajamos en todos los barrios marítimos: Malvarrosa, Cabanyal-Canyamelar, Nazaret, El Saler, Pinedo. Conocemos sus particularidades: corrosión acelerada por sal marina, humedad relativa alta, edificios antiguos con instalaciones expuestas, y necesidades específicas de climatización (brisa marina, alta usabilidad terrazas). Usamos materiales anticorrosión (tuberías PEX, cableado protección alta, elementos inox), protección extra en cuadros exteriores, y mantenimiento preventivo en AC/calefacción. Experiencia demostrable en zona marítima valenciana.',
        category: 'cobertura'
      },
      {
        question: '¿Qué precios tenéis para servicios profesionales en Valencia?',
        answer: 'Precios orientativos Valencia: visita diagnóstico €50-70, urgencia 24h desde €70-110 según horario. Reparaciones frecuentes: cambio grifo €80-110, reparación fuga €90-180, revisión cuadro eléctrico €55-90, desatasco simple €70-100, recarga gas AC €80-160, instalación split €400-800 según potencia. Siempre presupuesto ANTES de trabajar; autorizas y ejecutamos. Sin compromiso en grandes trabajos. Valencia tiene precios competitivos versus Madrid/Barcelona manteniendo calidad profesional. Transparencia total en factura: desplazamiento + mano obra + materiales.',
        category: 'precio'
      },
      {
        question: '¿Atendéis urgencias durante las Fallas y festivos valencianos?',
        answer: 'Sí, trabajamos 365 días al año incluidos Fallas (15-19 marzo), Feria de Julio, festivos locales y verano. Las urgencias domésticas no esperan a que terminen las fiestas. Durante Fallas, con tráfico complicado y mascarás cerradas, nuestro tiempo de respuesta puede alargarse 20-30%  por circunstancias de tráfico, pero seguimos operativos. Urgencias festivos tienen recargo (20-40% sobre tarifa base) por disponibilidad garantizada. Confirmamos tiempo estimado real considerando situación tráfico al recibir llamada.',
        category: 'urgencias'
      },
      {
        question: '¿Trabajáis con comunidades de propietarios en Valencia?',
        answer: 'Sí, colaboramos regularmente con comunidades en Valencia. Servicios comunitarios: reparación bajantes/colectores, mantenimiento calderas centrales, revisión instalaciones eléctricas comunes, desatascos arquetas generales, y contratos mantenimiento preventivo. Emitimos facturas y certificados para comunidad. Coordinamos con presidentes y administradores. Atendemos urgencias comunitarias (fugas patiopersonales, cortes portal, atascos generales). Experiencia en edificios años 60-80 típicos Valencia que requieren renovación progresiva instalaciones.',
        category: 'servicios'
      },
      {
        question: '¿Cómo solicito un servicio profesional en Valencia?',
        answer: 'Tres formas fáciles: (1) Teléfono directo - recomendado para urgencias, atención inmediata; (2) WhatsApp - envía mensaje con tipo servicio, ubicación en Valencia (distrito/barrio), descripción problema, fotos útiles; (3) Formulario web - para servicios programados. Indica urgencia o puede programarse. Cuantos más detalles (tipo vivienda, edificio antiguo/moderno, qué falla, desde cuándo), mejor diagnosticamos. Confirmamos disponibilidad, tiempo llegada estimado, coste orientativo. Valencia 24/7 incluidos festivos y Fallas.',
        category: 'general'
      }
    ],
    localContext: 'Con sede en el área metropolitana de Valencia y años trabajando en la ciudad y su entorno, conocemos profundamente las características del clima mediterráneo valenciano y su impacto en las instalaciones: desde la corrosión salina en zonas costeras hasta las necesidades de climatización en los meses de calor intenso. Esta experiencia local nos permite ofrecer soluciones duraderas adaptadas a Valencia.'
  }
]

/**
 * Get city hub SEO content by city slug
 */
export function getCityHubSEOContent(citySlug: string): CityHubSEOContent | undefined {
  return cityHubSEOContent.find(content => content.citySlug === citySlug)
}
