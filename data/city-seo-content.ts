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
  // Fontanero Valencia - Foundation GEO Page
  {
    serviceId: 'fontanero',
    citySlug: 'valencia',
    seoText: `Cuando necesitas un fontanero urgente en Valencia, cada minuto cuenta. Ofrecemos servicio profesional en toda la ciudad con tiempo de respuesta de 30-60 minutos. Nuestro equipo está disponible 24 horas para atender emergencias: fugas de agua, tuberías rotas, atascos, y cualquier avería urgente.

**Servicio 24 Horas en Valencia**

Cubrimos todos los barrios: Ruzafa, El Carmen, Benimaclet, Campanar, Malvarrosa, Nazaret, Algirós y todas las zonas de la ciudad. Cuando llamas, localizamos al técnico más cercano para garantizar llegada rápida, priorizando emergencias graves como inundaciones o fugas de gas.

**Reparación de Fugas de Agua**

Las fugas son una de las emergencias más frecuentes. Si detectas una fuga en tu vivienda o local, actúa rápidamente para evitar daños mayores. Utilizamos equipos de detección sin romper paredes, localizando el punto exacto del escape para reparaciones precisas.

Reparamos fugas en tuberías ocultas, goteos en grifos, cisternas, y calentadores. Si tu factura de agua ha aumentado sin motivo aparente, puede indicar una fuga oculta. Ofrecemos servicio de detección para identificar pérdidas no visibles.

**Instalación y Cambio de Tuberías**

Realizamos cambio completo de tuberías trabajando con materiales modernos como PEX, cobre y multicapa. La instalación nueva mejora la presión del agua, elimina corrosión y previene averías futuras.

Valencia tiene edificios de diferentes épocas, desde construcciones históricas en el centro hasta edificaciones modernas en Campanar o Benimaclet. Nuestros técnicos tienen experiencia con instalaciones antiguas que requieren cuidado especial y con sistemas modernos en viviendas nuevas.

**Reparación de Sanitarios y Grifería**

Instalamos y reparamos todo tipo de sanitarios: inodoros, lavabos, bidés, duchas y bañeras. Si tu inodoro pierde agua continuamente o la cisterna no funciona, lo solucionamos rápidamente. También instalamos grifería moderna, termostáticos para ducha y sistemas de ahorro de agua.

La dureza del agua local puede provocar acumulación de cal. Ofrecemos limpieza, mantenimiento e instalación de descalcificadores si es necesario.

**Desatascos y Limpieza de Tuberías**

Los atascos en fregaderos, lavabos y desagües son problemas comunes. Contamos con equipos profesionales: sondas eléctricas, sistemas de alta presión y cámaras de inspección.

Realizamos desatascos urgentes sin romper suelos ni paredes. Si el atasco es recurrente, investigamos la causa con cámara de inspección para identificar problemas estructurales. También ofrecemos servicio preventivo de limpieza.

**Servicio para Comunidades**

Trabajamos con comunidades de vecinos ofreciendo contratos de mantenimiento preventivo: revisiones periódicas de arquetas, bajantes y sistemas de agua caliente. El mantenimiento preventivo reduce averías y ahorra costes a largo plazo.

**Precios Transparentes**

Tarifas claras: Visita y diagnóstico desde 49€. Reparaciones simples 60-90€. Cambio de sanitarios 120-200€. Reparación de fugas 80-150€. Desatascos 69-90€. Presupuesto gratuito sin  sorpresas en la factura final.

**Por qué Elegirnos**

Todos nuestros profesionales cuentan con certificación, experiencia y seguro de responsabilidad civil. Conocemos Valencia y sus particularidades desde edificios históricos hasta construcciones modernas. Garantía en todos los trabajos y protocolos de calidad rigurosos.

Disponemos de stock en nuestras furgonetas para resolver averías en la primera visita. Solución rápida, eficiente y definitiva.

Llámanos al 641 688 524. Disponibles 24 horas todos los días del año para emergencias con respuesta rápida y trabajo profesional.`,
    faqs: [
      {
        question: '¿Cuánto tarda en llegar un fontanero urgente a Valencia?',
        answer: 'Nuestro tiempo de respuesta promedio en Valencia es de 30-60 minutos. Tenemos fontaneros distribuidos estratégicamente por toda la ciudad para poder atender emergencias rápidamente. En casos de emergencias graves como inundaciones o fugas importantes, priorizamos la atención inmediata. Disponemos de servicio 24 horas todos los días del año en Valencia.',
        category: 'urgencias'
      },
      {
        question: '¿Cuánto cuesta un fontanero en Valencia?',
        answer: 'En Valencia, nuestras tarifas comienzan desde 49€ para visita y diagnóstico. Reparaciones simples de grifos o cisternas cuestan entre 60-90€. Cambio de sanitarios desde 120€. Reparación de fugas entre 80-150€ según complejidad. Desatascos básicos desde 69€. Siempre ofrecemos presupuesto gratuito sin compromiso antes de realizar cualquier trabajo. El precio final depende del tipo de avería y materiales necesarios.',
        category: 'precio'
      },
      {
        question: '¿Qué hacer si hay una fuga de agua en mi piso de Valencia?',
        answer: 'Si detectas una fuga en tu vivienda en Valencia: 1) Cierra la llave de paso general del agua inmediatamente, 2) Corta la electricidad en la zona afectada si hay riesgo de contacto con el agua, 3) Llama a nuestro servicio de fontanería urgente 24h. 4) Si es posible, coloca recipientes para recoger el agua y protege muebles. Nuestros fontaneros en Valencia llegarán en 30-60 minutos para localizar y reparar la fuga. No esperes, las fugas pueden causar daños graves si no se atienden rápidamente.',
        category: 'emergencias'
      },
      {
        question: '¿Trabajan fontaneros en todos los barrios de Valencia?',
        answer: 'Sí, ofrecemos servicio completo de fontanería en todos los barrios de Valencia: Centro Histórico, Ruzafa, El Carmen, Benimaclet, Campanar, Malvarrosa, Nazaret, Algirós, Patraix, Quatre Carreres, Poblats Marítims, y todas las zonas de la ciudad. Tenemos fontaneros distribuidos estratégicamente para poder llegar rápido a cualquier punto de Valencia, tanto en el centro como en barrios periféricos.',
        category: 'cobertura'
      },
      {
        question: '¿Atienden fontanería en edificios antiguos del centro de Valencia?',
        answer: 'Sí, tenemos amplia experiencia trabajando en edificios antiguos del centro histórico de Valencia. Conocemos las particularidades de las instalaciones antiguas y trabajamos con cuidado para no dañar estructuras delicadas. Realizamos cambio de tuberías antiguas, reparación de instalaciones históricas, y actualización de sistemas manteniendo el respeto por el edificio. Utilizamos técnicas especiales para trabajar en espacios reducidos típicos de edificios antiguos valencianos.',
        category: 'servicios'
      },
      {
        question: '¿Ofrecen garantía en las reparaciones de fontanería en Valencia?',
        answer: 'Sí, todos nuestros trabajos de fontanería en Valencia incluyen garantía. El periodo de garantía varía según el tipo de servicio: reparaciones tienen garantía de 3-6 meses, instalaciones nuevas hasta 12 meses. La garantía cubre tanto la mano de obra como los materiales utilizados. Si surge algún problema relacionado con nuestro trabajo durante el periodo de garantía, volvemos sin coste adicional. Trabajamos con repuestos de calidad y marcas reconocidas.',
        category: 'garantia'
      },
      {
        question: '¿Qué problemas de fontanería son más frecuentes en Valencia?',
        answer: 'En Valencia, los problemas más frecuentes son: fugas en tuberías por presión del agua y envejecimiento de instalaciones, atascos en fregaderos y desagües por acumulación de residuos, averías en cisternas de inodoros, goteos en grifería por acumulación de cal (la dureza del agua en Valencia lo favorece), y problemas en instalaciones antiguas de edificios del centro. También atendemos muchas emergencias de calentadores y roturas de tuberías en invierno. Todos estos problemas los solucionamos con servicio rápido en Valencia.',
        category: 'problemas'
      },
      {
        question: '¿Tienen servicio de fontanería para locales comerciales en Valencia?',
        answer: 'Sí, ofrecemos servicio profesional de fontanería para locales comerciales, restaurantes, oficinas y negocios en Valencia. Entendemos que una avería en un negocio puede causar pérdidas económicas, por eso priorizamos las intervenciones en locales comerciales. Realizamos instalaciones completas de fontanería en reformas, mantenimiento preventivo, y reparaciones urgentes. Podemos trabajar fuera del horario comercial para no interrumpir tu actividad. Disponemos de factura para empresas y contratos de mantenimiento a medida.',
        category: 'comercial'
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
        'fontanero urgente'
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
        'señales de una fuga de agua oculta',
        'fontanero 24 horas cerca de mí'
      ]
    },
    lastUpdated: '2026-05-20'
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
