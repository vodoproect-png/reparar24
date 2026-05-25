import { notFound } from 'next/navigation'
import { type Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema as genBreadcrumbSchema } from '@/lib/seo/schema'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import Link from 'next/link'
import type { Metadata } from 'next'

// Define child service structure
interface FontaneroChildService {
  slug: string
  name: string
  h1: string
  icon: string
  description: string
  longDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  benefits: string[]
  leakTypes?: string[]
  detectionMethods?: string[]
  process?: { step: number; title: string; description: string }[]
  pricing?: {intro: string; items: { service: string; price: string; note?: string }[]}
  faqs: { question: string; answer: string }[]
  relatedServices: { title: string; slug: string; icon: string }[]
}

// Fontanero child services database
const fontaneroChildServices: FontaneroChildService[] = [
  {
    slug: 'reparacion-fugas',
    name: 'Reparación de Fugas',
    h1: 'Reparación de Fugas de Agua',
    icon: '💧',
    description: 'Servicio profesional de detección y reparación de fugas de agua las 24 horas. Técnicos especializados con tecnología avanzada para localizar y reparar fugas ocultas sin obras.',
    metaTitle: 'Reparación de Fugas de Agua 24h | Detección y Reparación Urgente',
    metaDescription: 'Reparación profesional de fugas de agua 24/7. Detección con tecnología avanzada, reparación inmediata sin obras. Técnicos certificados. ¡Llama ahora!',
    keywords: [
      'reparación de fugas',
      'detección de fugas',
      'fuga de agua',
      'fuga oculta',
      'humedad por fuga',
      'pérdida de agua',
      'goteo en tuberías',
      'fuga en pared',
      'fuga en techo',
      'localización de fugas',
      'detector de fugas',
      'reparación urgente fugas'
    ],
    longDescription: `Las fugas de agua son uno de los problemas más comunes y costosos en viviendas y edificios. Una fuga no detectada puede desperdiciar miles de litros de agua al mes, provocar humedades graves, daños estructurales y aumentar significativamente la factura del agua. Nuestro servicio de reparación de fugas de agua está disponible 24 horas al día, los 7 días de la semana, con técnicos especializados y equipos de detección avanzados.

Somos expertos en detección y reparación de todo tipo de fugas de agua. Utilizamos tecnología profesional de detección: equipos de correlación acústica que escuchan el sonido del agua escapando, cámaras termográficas que identifican cambios de temperatura causados por humedad, geófonos electrónicos para fugas en conducciones enterradas, y equipos de trazado de tuberías para localizar con precisión el punto exacto de la fuga.

Una fuga oculta en una pared, bajo el suelo o en una tubería enterrada puede pasar desapercibida durante meses mientras causa daños progresivos. Los signos de una fuga oculta incluyen: manchas de humedad en paredes o techos, aparición de moho, pavimento húmedo sin causa aparente, sonido de agua corriendo cuando todo está cerrado, aumento inexplicable en la factura del agua, o pérdida de presión en grifos y duchas.

Realizamos reparación de fugas sin obras siempre que es posible. Nuestros métodos de reparación incluyen sellado interno de tuberías, inyección de resina para fugas en juntas, reemplazo localizado del tramo afectado, y reparación de fugas en conexiones de fontanería. Solo rompemos paredes o suelos cuando es estrictamente necesario, y restauramos todo al finalizar.

Nuestro servicio de detección de fugas comienza con una inspección visual completa de toda la instalación. Comprobamos contadores de agua para verificar consumo anómalo incluso con todo cerrado. Realizamos pruebas de presión en el sistema para localizar pérdidas. Utilizamos equipos de escucha electrónica en tuberías y conducciones. Aplicamos termografía infrarroja en paredes y suelos. Una vez localizada la fuga con precisión, procedemos a la reparación inmediata.

Las fugas más comunes que reparamos incluyen: fugas en tuberías de agua fría y caliente, fugas en juntas y conexiones por deterioro, fugas en codos y uniones de tuberías, fugas en grifos y cisternas que gotean constantemente, fugas en calentadores de agua y termos, fugas en tuberías de calefacción, y fugas en acometidas generales del edificio.`,
    benefits: [
      'Detección con tecnología avanzada',
      'Reparación inmediata 24/7',
      'Sin obras innecesarias',
      'Técnicos especializados certificados',
      'Garantía en todas las reparaciones',
      'Presupuesto detallado sin sorpresas'
    ],
    leakTypes: [
      'Fugas en tuberías de agua fría - Las más comunes, causadas por corrosión, presión excesiva o golpes de ariete',
      'Fugas en tuberías de agua caliente - Provocadas por dilatación térmica, juntas deterioradas o corrosión acelerada',
      'Fugas ocultas en paredes - Difíciles de detectar, requieren equipos especializados de termografía o correlación',
      'Fugas bajo suelo o pavimento - Pueden causar hundimientos, requieren detección mediante geófonos y trazadores',
      'Fugas en juntas y conexiones - Causadas por apriete incorrecto, juntas deterioradas o movimientos estructurales',
      'Fugas en grifos y válvulas - Goteo constante que desperdicia agua y aumenta la factura mensual',
      'Fugas en cisternas de inodoro - Pérdida continua hacia el inodoro, a veces silenciosa pero muy costosa'
    ],
    detectionMethods: [
      'Correlación acústica - Equipos electrónicos que escuchan el sonido característico del agua bajo presión escapando',
      'Termografía infrarroja - Cámaras térmicas que detectan diferencias de temperatura causadas por humedad',
      'Geófonos electrónicos - Sensores de alta precisión para localizar fugas en conducciones enterradas',
      'Prueba de presión - Inyección de presión controlada para verificar dónde cae en el sistema',
      'Trazadores y detectores - Localización exacta de tuberías antes de cualquier intervención',
      'Inspección con cámara - Cámaras en conducciones de gran diámetro para ver el interior sin romper'
    ],
    process: [
      {
        step: 1,
        title: 'Llamada y valoración inicial',
        description: 'Contacta con nosotros indicando los síntomas: humedades, sonido de agua, aumento de consumo. Valoramos urgencia y programamos visita inmediata o en horario conveniente.'
      },
      {
        step: 2,
        title: 'Inspección visual y análisis',
        description: 'Nuestros técnicos realizan inspección completa de la instalación. Comprueban contadores, presión del sistema, y zonas con síntomas de humedad o pérdida.'
      },
      {
        step: 3,
        title: 'Detección con equipos especializados',
        description: 'Utilizamos tecnología avanzada (correlación acústica, termografía, geófonos) para localizar exactamente el punto de la fuga sin romper paredes innecesariamente.'
      },
      {
        step: 4,
        title: 'Presupuesto detallado',
        description: 'Una vez localizada la fuga, te explicamos la reparación necesaria y proporcionamos presupuesto claro y detallado. Solo procedemos con tu aprobación.'
      },
      {
        step: 5,
        title: 'Reparación profesional',
        description: 'Reparamos la fuga con técnicas profesionales, minimizando obras. Sellamos, reemplazamos el tramo afectado, o inyectamos resina según el caso.'
      },
      {
        step: 6,
        title: 'Pruebas y verificación',
        description: 'Realizamos pruebas de presión completas para asegurar que la fuga está completamente reparada. Verificamos que no hay otras fugas en el sistema.'
      },
      {
        step: 7,
        title: 'Restauración y limpieza',
        description: 'Si fue necesario romper, restauramos paredes o suelos. Limpiamos completamente la zona de trabajo. Te entregamos garantía escrita de la reparación.'
      }
    ],
    pricing: {
      intro: 'Tarifas transparentes para reparación de fugas. El precio final depende de la complejidad, ubicación y accesibilidad de la fuga.',
      items: [
        { service: 'Visita y detección visual', price: 'Desde 49€', note: 'Inspección inicial sin equipos avanzados' },
        { service: 'Detección con equipos especializados', price: '90-180€', note: 'Termografía, correlación acústica, geófonos' },
        { service: 'Reparación de fuga simple accesible', price: '80-150€', note: 'Fugas en grifos, válvulas, conexiones a la vista' },
        { service: 'Reparación con acceso complicado', price: '150-350€', note: 'Requiere apertura de registro, acceso a falso techo' },
        { service: 'Reparación con obra menor', price: '250-600€', note: 'Incluye romper pared/suelo, reparación y restauración' },
        { service: 'Reparación de fuga en tubería enterrada', price: '400-900€', note: 'Excavación, reparación de acometida, reposición' }
      ]
    },
    faqs: [
      {
        question: '¿Cómo sé si tengo una fuga de agua oculta?',
        answer: 'Los signos principales son: aumento en la factura del agua sin cambios en consumo, manchas de humedad en paredes o techos, aparición de moho, sonido de agua corriendo cuando todo está cerrado, pérdida de presión en grifos, o contador que gira aunque todo esté cerrado. Si notas alguno de estos síntomas, es probable que tengas una fuga oculta que requiere detección profesional.'
      },
      {
        question: '¿Cuánto cuesta la detección y reparación de una fuga?',
        answer: 'Desde 49€ para visita básica y detección visual. Detección con equipos especializados (termografía, correlación acústica) 90-180€. Reparación de fugas simples 80-150€. Reparaciones complejas con obra 250-600€. Cada caso es diferente según ubicación y accesibilidad de la fuga. Siempre proporcionamos presupuesto detallado antes de proceder.'
      },
      {
        question: '¿Tenéis que romper paredes para encontrar la fuga?',
        answer: 'No siempre. Utilizamos tecnología avanzada (termografía infrarroja, correlación acústica, geófonos) que localiza fugas con precisión sin romper. Solo rompemos lo mínimo imprescindible una vez localizado el punto exacto. Si es necesario abrir, restauramos completamente la zona afectada. Nuestro objetivo es minimizar obras y molestias.'
      },
      {
        question: '¿Ofrecéis servicio urgente de reparación de fugas?',
        answer: 'Sí, nuestro servicio de reparación de fugas está disponible 24 horas, 7 días a la semana, incluidos festivos. Si tienes una fuga importante con pérdida de agua abundante, inundación, o daños graves, atendemos emergencias de inmediato. Contamos con técnicos de guardia listos para intervenir.'
      },
      {
        question: '¿Cuánto tiempo tarda la reparación de una fuga?',
        answer: 'Depende del tipo de fuga. Fugas simples en grifos o válvulas: 30-60 minutos. Fugas en tuberías accesibles: 1-2 horas. Fugas ocultas que requieren detección avanzada: 2-4 horas. Fugas con obra menor: 3-6 horas incluyendo restauración. Te informamos del tiempo estimado tras la inspección inicial.'
      },
      {
        question: '¿La reparación incluye garantía?',
        answer: 'Sí, todas nuestras reparaciones de fugas incluyen garantía por escrito. Garantizamos la reparación realizada: si la misma fuga reaparece en el punto reparado, volvemos sin coste adicional. La garantía cubre mano de obra y materiales utilizados en la reparación específica.'
      },
      {
        question: '¿Podéis reparar fugas en comunidades de vecinos?',
        answer: 'Sí, trabajamos habitualmente con comunidades de propietarios. Reparamos fugas en instalaciones comunitarias, acometidas generales, bajantes, y zonas comunes. Proporcionamos informes técnicos detallados para el administrador de fincas. Coordinamos trabajos para minimizar molestias a vecinos.'
      },
      {
        question: '¿Qué cubre el seguro del hogar en caso de fugas?',
        answer: 'La mayoría de seguros cubren daños causados por fugas (humedades, daños en muebles), pero no siempre cubren la localización y reparación de la fuga. Te ayudamos con el papeleo del seguro, proporcionando informes técnicos, fotografías, presupuestos detallados y factura para tu reclamación.'
      }
    ],
    relatedServices: [
      { title: 'Desatascos Urgentes', slug: 'desatascos', icon: '🚰' },
      { title: 'Instalaciones de Fontanería', slug: 'instalaciones', icon: '🔧' },
      { title: 'Sustitución de Tuberías', slug: 'sustitucion-tuberias', icon: '🔩' },
      { title: 'Calentadores y Termos', slug: 'calentadores-termos', icon: '♨️' },
      { title: 'Mantenimiento Preventivo', slug: 'mantenimiento', icon: '🛠️' }
    ]
  },
  {
    slug: 'desatascos',
    name: 'Desatascos Urgentes',
    h1: 'Desatascos Urgentes de Fontanería',
    icon: '🚰',
    description: 'Servicio urgente de desatascos 24 horas para eliminar atascos en bajantes, desagües, fregaderos e inodoros. Intervención rápida con equipos profesionales.',
    metaTitle: 'Desatascos Urgentes 24h | Bajantes, Desagües e Inodoros',
    metaDescription: 'Desatascos urgentes 24/7 de bajantes, desagües, fregaderos e inodoros. Intervención inmediata con equipos profesionales. Sin obras. ¡Llama ahora!',
    keywords: [
      'desatascos urgentes',
      'atasco bajante',
      'desagüe atascado',
      'inodoro atascado',
      'fregadero atascado',
      'obstrucción tubería',
      'desatasco urgente',
      'atascos fontanería',
      'desatoro urgente',
      'eliminar atasco'
    ],
    longDescription: `Los atascos en desagües e inodoros son emergencias domésticas que requieren intervención inmediata. Un atasco grave puede impedir el uso normal de baños y cocinas, provocar desbordamientos de agua sucia, malos olores intensos, y en casos extremos, inundaciones que afectan a viviendas y locales. Nuestro servicio de desatascos urgentes está disponible 24 horas al día, todos los días del año, con técnicos especializados y equipos profesionales listos para intervenir.

Realizamos desatascos de todo tipo de obstrucciones en instalaciones de fontanería: inodoros atascados por papel, toallitas o objetos, fregaderos obstruidos por restos de comida y grasas, lavabos bloqueados por jabón y cabellos, duchas con drenaje lento o completamente bloqueadas, bajantes de edificios obstruidas, y arquetas de evacuación colapsadas.

Utilizamos múltiples técnicas profesionales según el tipo y gravedad del atasco. Desatascadores manuales de alta presión para atascos superficiales accesibles, varillas flexibles profesionales para obstrucciones en tuberías rectas, máquinas eléctricas de desatasco con cable flexible y cabezales específicos, equipos de presión y aire comprimido para atascos resistentes, y cámaras de inspección para visualizar el interior de tuberías y localizar exactamente la obstrucción.

Los atascos más frecuentes en viviendas incluyen inodoros bloqueados por acumulación de papel higiénico o toallitas húmedas (que nunca deben tirarse al inodoro), fregaderos de cocina obstruidos por restos de comida, aceites y grasas solidificadas, lavabos de baño con acumulación de jabón, cabellos y residuos de productos de higiene, duchas con drenaje lento por acumulación progresiva de cabellos y jabón, y bajantes comunitarias afectadas por vertidos inadecuados.

Intervenimos rápidamente para restablecer el funcionamiento normal de tus instalaciones. Evaluamos la situación, identificamos el punto de obstrucción, aplicamos la técnica más efectiva según el caso, verificamos que el drenaje funciona correctamente, y proporcionamos recomendaciones para prevenir futuros atascos. No utilizamos productos químicos agresivos que dañan tuberías y contaminan: aplicamos métodos mecánicos profesionales seguros y efectivos.`,
    benefits: [
      'Intervención urgente en menos de 1 hora',
      'Equipos profesionales de desatasco',
      'Sin productos químicos dañinos',
      'Servicio 24/7 incluidos festivos',
      'Solución definitiva sin chapuzas',
      'Presupuesto cerrado sin sorpresas'
    ],
    process: [
      {
        step: 1,
        title: 'Llamada urgente',
        description: 'Contacta con nosotros explicando el tipo de atasco: inodoro, fregadero, bajante. Evaluamos urgencia y enviamos técnico inmediatamente o en horario conveniente.'
      },
      {
        step: 2,
        title: 'Evaluación del atasco',
        description: 'El técnico inspecciona la instalación, identifica el punto de obstrucción, determina la causa del atasco, y selecciona el equipo más adecuado.'
      },
      {
        step: 3,
        title: 'Presupuesto inmediato',
        description: 'Te explicamos el trabajo necesario y proporcionamos presupuesto claro antes de proceder. Solo intervenimos con tu autorización.'
      },
      {
        step: 4,
        title: 'Desatasco profesional',
        description: 'Aplicamos la técnica apropiada: desatascador de presión, varillas flexibles, máquina eléctrica, o equipos de alta presión según la obstrucción.'
      },
      {
        step: 5,
        title: 'Verificación de funcionamiento',
        description: 'Comprobamos que el desagüe drena correctamente, realizamos pruebas de flujo completas, y nos aseguramos de que no quedan residuos.'
      },
      {
        step: 6,
        title: 'Limpieza de la zona',
        description: 'Limpiamos completamente el área de trabajo, retiramos cualquier resto, y dejamos todo en perfectas condiciones de higiene.'
      },
      {
        step: 7,
        title: 'Consejos preventivos',
        description: 'Te explicamos qué causó el atasco y cómo evitar futuros problemas. Proporcionamos recomendaciones de uso y mantenimiento básico.'
      }
    ],
    pricing: {
      intro: 'Precios transparentes para desatascos. El coste depende del tipo, accesibilidad y gravedad de la obstrucción.',
      items: [
        { service: 'Desatasco simple accesible', price: 'Desde 60€', note: 'Inodoros, fregaderos, lavabos con obstrucción superficial' },
        { service: 'Desatasco con equipo eléctrico', price: '90-180€', note: 'Obstrucciones profundas, requiere máquina profesional' },
        { service: 'Desatasco de bajante comunitaria', price: '150-300€', note: 'Bajantes de edificio, requiere acceso y equipos especiales' },
        { service: 'Desatasco con cámara inspección', price: '180-350€', note: 'Incluye inspección visual interior con cámara' },
        { service: 'Desatasco en arqueta exterior', price: '120-250€', note: 'Arquetas de evacuación, pozos de registro' },
        { service: 'Servicio urgente nocturno/festivo', price: '+30-50€', note: 'Recargo por servicio en horario nocturno o festivo' }
      ]
    },
    faqs: [
      {
        question: '¿Cuánto tiempo tardáis en venir para un desatasco urgente?',
        answer: 'En emergencias urgentes (inodoro desbordado, inundación inminente) llegamos en menos de 1 hora en la mayoría de zonas. Para atascos no urgentes, podemos programar visita en el mismo día o siguiente día según tu conveniencia. Disponemos de técnicos de guardia 24/7 incluidos festivos.'
      },
      {
        question: '¿Los productos químicos de desatascar funcionan?',
        answer: 'Los productos químicos de supermercado son poco efectivos en atascos importantes y pueden dañar tuberías, especialmente las de PVC. Además, son peligrosos para la salud y el medio ambiente. Nosotros utilizamos métodos mecánicos profesionales (varillas, máquinas eléctricas, presión) mucho más efectivos, seguros y definitivos.'
      },
      {
        question: '¿Qué pasa si el atasco vuelve después?',
        answer: 'Si el atasco reaparece en las siguientes semanas en el mismo punto, volvemos sin coste adicional. Nuestros desatascos son definitivos porque eliminamos completamente la obstrucción. Si el atasco es recurrente, puede indicar un problema estructural mayor (tubería hundida, raíces) que evaluamos y te informamos.'
      },
      {
        question: '¿Podéis desatascar inodoros atascados con toallitas?',
        answer: 'Sí, las toallitas húmedas son una causa muy común de atascos graves porque no se deshacen como el papel higiénico. Utilizamos equipos específicos para extraer estas obstrucciones. Importante: nunca tires toallitas al inodoro, aunque digan "biodegradables", van a la basura siempre.'
      },
      {
        question: '¿Cuál es la causa más común de atascos en fregaderos?',
        answer: 'La grasa y aceites de cocina. Aunque se vierten líquidos, se solidifican al enfriarse en las tuberías acumulándose con restos de comida. Para prevenir: nunca viertas aceite por el fregadero, usa un colador para sólidos, vierte agua caliente periódicamente, y limpia el sifón cada pocos meses.'
      },
      {
        question: '¿Necesitáis romper para desatascar una bajante?',
        answer: 'No, en la mayoría de casos accedemos por arquetas, registros o puntos de acceso existentes. Utilizamos varillas flexibles y cámaras que entran por estos puntos. Solo en casos excepcionales de obstrucciones inaccesibles es necesario abrir, pero siempre te informamos antes y buscamos la solución menos invasiva.'
      },
      {
        question: '¿Trabajáis con comunidades de vecinos?',
        answer: 'Sí, trabajamos habitualmente con comunidades. Desatascamos bajantes comunitarias, arquetas generales, y sistemas de evacuación de edificios. Coordinamos con administradores de fincas, proporcionamos informes técnicos, y minimizamos molestias a vecinos. Disponemos de seguros de responsabilidad civil.'
      },
      {
        question: '¿Hacéis mantenimiento preventivo de desagües?',
        answer: 'Sí, ofrecemos servicio de mantenimiento preventivo anual o semestral. Incluye inspección de desagües, limpieza preventiva de sifones, revisión de arquetas, y detección temprana de obstrucciones parciales. Es especialmente recomendable en restaurantes, comunidades, y viviendas con historial de atascos frecuentes.'
      }
    ],
    relatedServices: [
      { title: 'Reparación de Fugas', slug: 'reparacion-fugas', icon: '💧' },
      { title: 'Instalaciones de Fontanería', slug: 'instalaciones', icon: '🔧' },
      { title: 'Sustitución de Tuberías', slug: 'sustitucion-tuberias', icon: '🔩' },
      { title: 'Calentadores y Termos', slug: 'calentadores-termos', icon: '♨️' },
      { title: 'Mantenimiento Preventivo', slug: 'mantenimiento', icon: '🛠️' }
    ]
  },
  {
    slug: 'instalaciones',
    name: 'Instalaciones de Fontanería',
    h1: 'Instalaciones de Fontanería Profesional',
    icon: '🔧',
    description: 'Instalación profesional de grifos, sanitarios y sistemas de fontanería completos. Para obra nueva, reformas y renovaciones. Trabajos garantizados por profesionales certificados.',
    metaTitle: 'Instalaciones de Fontanería | Grifos, Sanitarios y Sistemas',
    metaDescription: 'Instalación profesional de fontanería: grifos, sanitarios, duchas, sistemas completos. Para obra nueva y reformas. Instaladores certificados. Presupuesto sin compromiso.',
    keywords: [
      'instalación fontanería',
      'instalar grifo',
      'instalación sanitarios',
      'instalación ducha',
      'fontanería obra nueva',
      'reforma baño fontanería',
      'instalador fontanero',
      'instalar inodoro',
      'cambiar grifería',
      'instalación lavabo'
    ],
    longDescription: `Las instalaciones de fontanería profesionales son fundamentales para el correcto funcionamiento de viviendas, oficinas y locales comerciales. Una instalación bien ejecutada garantiza suministro de agua eficiente, ausencia de fugas, durabilidad a largo plazo, y cumplimiento de normativas técnicas y sanitarias. Nuestro servicio de instalaciones de fontanería cubre desde pequeñas intervenciones como cambio de grifos hasta instalaciones completas en obra nueva o reformas integrales.

Realizamos todo tipo de instalaciones de fontanería: grifería de cocina y baño (monomandos, termostáticos, de caño alto), sanitarios completos (inodoros, bidés, urinarios), lavabos y lavamanos (de columna, suspendidos, sobre encimera), duchas y bañeras (platos de ducha, mamparas, hidromasaje), sistemas de fontanería completos para viviendas nuevas, reforma integral de baños y cocinas, instalación de fontanería para locales comerciales, y actualización de instalaciones antiguas a normativa actual.

Trabajamos con los mejores materiales del mercado. Tuberías de cobre multicapa para instalaciones de calidad superior, tubería de PEX flexible para instalaciones modernas y eficientes, tubería de PP y PVC para evacuaciones, grifería de marcas reconocidas con garantía del fabricante, sanitarios de porcelana vitrificada de alta calidad, válvulas y llaves de paso con certificaciones europeas, y sistemas de fontanería con eficiencia hídrica para ahorro de agua.

Nuestras instalaciones se realizan siguiendo estrictamente el Código Técnico de la Edificación y normativas sanitarias vigentes. Calculamos correctamente diámetros de tubería según caudales necesarios, diseñamos pendientes adecuadas en evacuaciones, instalamos sistemas de ventilación de bajantes, colocamos llaves de paso accesibles para mantenimiento, aislamos tuberías para evitar condensaciones y pérdidas térmicas, y realizamos pruebas de presión antes de cerrar instalaciones ocultas.

Las instalaciones más demandadas incluyen: cambio de grifería antigua por monomandos modernos con limitador de caudal, instalación de inodoros con doble descarga para ahorro de agua, sustitución de bañera por plato de ducha (muy popular en reformas), instalación de fontanería completa en reformas de baño, instalación de grifería termostática en duchas, cambio de sanitarios antiguos por modelos de bajo consumo, e instalación de fontanería para cocinas reformadas con nuevos puntos de agua.`,
    benefits: [
      'Instaladores certificados con experiencia',
      'Materiales de primeras marcas',
      'Cumplimiento normativa vigente',
      'Garantía escrita en instalaciones',
      'Presupuesto detallado previo',
      'Coordinación con otros oficios'
    ],
    process: [
      {
        step: 1,
        title: 'Consulta inicial y visita',
        description: 'Contacta con nosotros explicando tu proyecto: cambio de grifos, reforma de baño, instalación completa. Programamos visita para ver la instalación actual y tus necesidades.'
      },
      {
        step: 2,
        title: 'Diseño y planificación',
        description: 'Evaluamos el espacio, medimos, diseñamos la distribución óptima de puntos de agua y evacuación. En reformas, coordinamos con otros oficios (albañilería, electricidad, alicatado).'
      },
      {
        step: 3,
        title: 'Presupuesto detallado',
        description: 'Proporcionamos presupuesto completo desglosado: materiales, mano de obra, plazos. Incluimos marcas y modelos específicos. Te asesoramos sobre opciones y alternativas.'
      },
      {
        step: 4,
        title: 'Suministro de materiales',
        description: 'Gestionamos compra de todos los materiales necesarios: tuberías, grifería, sanitarios, válvulas. Opción de que tú aportes algunos elementos (sanitarios, grifos) si lo prefieres.'
      },
      {
        step: 5,
        title: 'Instalación profesional',
        description: 'Ejecutamos la instalación según normativa: tendido de tuberías, conexiones, fijación de sanitarios, montaje de grifería, instalación de evacuaciones, llaves de paso.'
      },
      {
        step: 6,
        title: 'Pruebas y verificación',
        description: 'Realizamos pruebas de presión completas en red de agua, verificamos todas las conexiones, comprobamos que no hay fugas, probamos correcta evacuación de agua.'
      },
      {
        step: 7,
        title: 'Entrega y garantía',
        description: 'Te explicamos el funcionamiento de toda la instalación, los cierres de paso, mantenimiento básico recomendado. Entregamos garantía escrita y documentación de materiales.'
      }
    ],
    pricing: {
      intro: 'Precios orientativos para instalaciones de fontanería. El coste final depende de materiales elegidos y complejidad de la instalación.',
      items: [
        { service: 'Instalación/cambio de grifo', price: '60-120€', note: 'Mano de obra, sin incluir grifo. Desde monomando simple' },
        { service: 'Instalación de inodoro completo', price: '150-250€', note: 'Incluye retirada del antiguo, instalación nuevo, conexiones' },
        { service: 'Instalación de lavabo con grifo', price: '180-320€', note: 'Lavabo suspendido o columna, grifería, sifón, conexiones' },
        { service: 'Cambio bañera por plato ducha', price: '800-1.500€', note: 'Completo: retirada, fontanería, plato, grifería termostática' },
        { service: 'Reforma completa baño fontanería', price: '1.200-2.500€', note: 'Fontanería completa: inodoro, lavabo, ducha, grifería' },
        { service: 'Instalación fontanería obra nueva', price: 'Desde 2.500€', note: 'Instalación completa vivienda según proyecto' }
      ]
    },
    faqs: [
      {
        question: '¿Incluís los materiales en el presupuesto?',
        answer: 'Podemos trabajar de dos formas: presupuesto completo donde incluimos todos los materiales (grifos, sanitarios, tuberías, válvulas), o solo mano de obra si tú prefieres comprar algunos elementos como grifería o sanitarios. Te asesoramos sobre marcas y calidades recomendadas. Siempre especificamos qué incluye el presupuesto.'
      },
      {
        question: '¿Cuánto tiempo se tarda en cambiar un grifo?',
        answer: 'Un cambio de grifo simple (cocina o lavabo) se realiza en 30-60 minutos. Si hay complicaciones (tuberías antiguas, llaves de paso bloqueadas, necesidad de adaptar conexiones) puede llevar 1-2 horas. En grifería empotrada el tiempo es mayor. Siempre llevamos herramientas y materiales auxiliares necesarios.'
      },
      {
        question: '¿Puedo elegir yo los grifos y sanitarios?',
        answer: 'Por supuesto. Muchos clientes prefieren elegir personalmente su grifería y sanitarios en tiendas especializadas según su gusto y presupuesto. Nosotros te asesoramos sobre compatibilidad técnica, calidades recomendadas, y nos encargamos de la instalación profesional. Solo asegúrate de comprar artículos con normativa europea.'
      },
      {
        question: '¿Es mejor cambiar bañera por ducha?',
        answer: 'Depende de tus necesidades. Las duchas son tendencia en reformas porque ocupan menos espacio, consumen menos agua, son más accesibles (especialmente para personas mayores o movilidad reducida), y facilitan limpieza. Las bañeras son preferibles si hay niños pequeños o te gusta relajarte en baño. Te asesoramos según tu caso.'
      },
      {
        question: '¿Qué garantía tiene la instalación?',
        answer: 'Garantizamos nuestra mano de obra por 2 años: si hay cualquier problema en la instalación realizada (fuga, aflojamiento, mal funcionamiento) lo reparamos sin coste. Los materiales tienen la garantía del fabricante (generalmente 2-5 años según marca). Trabajamos solo con fabricantes reconocidos para evitar problemas.'
      },
      {
        question: '¿Hacéis también las obras de albañilería?',
        answer: 'En reformas integrales coordinamos todos los oficios: albañilería, fontanería, electricidad, alicatado. Tenemos equipo completo o coordinamos con profesionales de confianza. Esto simplifica la reforma porque tienes un solo interlocutor y garantizamos que todos los oficios se coordinan correctamente y cumplen plazos.'
      },
      {
        question: '¿Se puede instalar fontanería sin romper azulejos?',
        answer: 'Depende del trabajo. Cambios de grifería superficial, instalación de sanitarios con tomas existentes, o cambio de aparatos se hacen sin romper. Pero para mover puntos de agua, añadir nuevas tomas, o cambiar tuberías empotradas sí es necesario abrir paredes. Valoramos siempre la opción menos invasiva posible.'
      },
      {
        question: '¿Instaláis fontanería para locales comerciales?',
        answer: 'Sí, tenemos experiencia en instalaciones para comercios, oficinas, restaurantes y locales. Instalamos baños públicos con normativa accesibilidad, fontanería industrial para hostelería, fuentes y puntos de agua, sistemas con caudales mayores, y cumplimos todas las normativas comerciales y de actividad industrial.'
      }
    ],
    relatedServices: [
      { title: 'Reparación de Fugas', slug: 'reparacion-fugas', icon: '💧' },
      { title: 'Desatascos Urgentes', slug: 'desatascos', icon: '🚰' },
      { title: 'Sustitución de Tuberías', slug: 'sustitucion-tuberias', icon: '🔩' },
      { title: 'Calentadores y Termos', slug: 'calentadores-termos', icon: '♨️' },
      { title: 'Mantenimiento Preventivo', slug: 'mantenimiento', icon: '🛠️' }
    ]
  },
  {
    slug: 'sustitucion-tuberias',
    name: 'Sustitución de Tuberías',
    h1: 'Sustitución de Tuberías Antiguas',
    icon: '🔩',
    description: 'Renovación y cambio de tuberías antiguas o dañadas por conducciones modernas de cobre, PEX o multicapa. Eliminamos tuberías con corrosión, fugas constantes o bajo rendimiento.',
    metaTitle: 'Sustitución de Tuberías | Renovación de Conducciones Antiguas',
    metaDescription: 'Sustitución profesional de tuberías antiguas por conducciones modernas. Cobre, PEX, multicapa. Eliminamos corrosión y fugas. Presupuesto sin compromiso.',
    keywords: [
      'sustitución tuberías',
      'cambio tuberías antiguas',
      'renovación conducciones',
      'tuberías con fugas',
      'reemplazar tuberías',
      'tuberías corroídas',
      'actualizar fontanería',
      'tuberías de cobre',
      'tuberías de PEX',
      'cambio de bajantes'
    ],
    longDescription: `La sustitución de tuberías antiguas es una inversión necesaria cuando las conducciones existentes presentan corrosión avanzada, fugas recurrentes, pérdida de presión, o simplemente han superado su vida útil. Las tuberías de plomo (instaladas hasta los años 80), hierro galvanizado, o cobre muy antiguo con corrosión interna pueden contaminar el agua, causar fugas constantes, reducir caudal significativamente, y generar problemas estructurales por humedades. Sustituir estas conducciones por tuberías modernas garantiza agua limpia, presión adecuada, ausencia de fugas, y tranquilidad durante décadas.

Las señales que indican necesidad de sustitución incluyen: corrosión visible en tuberías a la vista (óxido, verdín), agua de color marrón o rojizo al abrir grifos, fugas frecuentes en diferentes puntos de la instalación, pérdida progresiva de presión en toda la vivienda, ruidos extraños en tuberías (golpes, silbidos), edad superior a 30-40 años de la instalación, tuberías de plomo que deben eliminarse por salud, y reformas integrales donde aprovechar para renovar fontanería oculta.

Trabajamos con las mejores tuberías modernas del mercado. Cobre multicapa para máxima durabilidad y fiabilidad (vida útil 50+ años), tubería PEX reticulada para flexibilidad e instalación rápida sin soldaduras, multicapa (aluminio-polietileno) que combina ventajas de ambos materiales, tuberías certificadas con normativa UNE y marcado CE, y materiales con garantía del fabricante. Descartamos materiales de baja calidad que dan problemas a corto plazo.

Nuestra metodología de sustitución minimiza molestias y obras. Realizamos estudio previo de la instalación actual y trazado óptimo de nuevas tuberías, buscamos pasos por falsos techos, registros o espacios existentes para minimizar rozas, utilizamos técnicas de instalación vista en zonas no habitables, coordinamos obras con otros oficios si es reforma integral, realizamos trabajos por fases cuando es posible para no dejar sin agua toda la vivienda, y restauramos completamente las zonas donde fue necesario abrir.

Los tipos de sustitución que realizamos incluyen: renovación completa de instalación de agua fría y caliente en viviendas, cambio de bajantes comunitarias de hierro por PVC, sustitución parcial de tramos específicos con problemas recurrentes, actualización de acometida general del edificio, reemplazo de tuberías empotradas en reformas de baño o cocina, cambio de tuberías de plomo por normativa sanitaria, y renovación de conducciones en locales comerciales y comunidades.`,
    benefits: [
      'Materiales modernos de alta calidad',
      'Minimización de obras y rozas',
      'Instalación por fases si es necesario',
      'Presión y caudal óptimos',
      'Garantía en materiales e instalación',
      'Cumplimiento normativa vigente'
    ],
    process: [
      {
        step: 1,
        title: 'Inspección y diagnóstico',
        description: 'Visitamos la vivienda, evaluamos estado actual de tuberías, identificamos problemas, medimos espacios, y determinamos mejor solución técnica y ruta de nuevas conducciones.'
      },
      {
        step: 2,
        title: 'Diseño del trazado',
        description: 'Planificamos recorrido óptimo de nuevas tuberías, aprovechando falsos techos, registros, espacios existentes. Calculamos diámetros necesarios según normativa y caudales requeridos.'
      },
      {
        step: 3,
        title: 'Presupuesto completo',
        description: 'Proporcionamos presupuesto detallado: metros de tubería, accesorios, mano de obra, obras necesarias, restauración. Especificamos materiales exactos y plazos de ejecución.'
      },
      {
        step: 4,
        title: 'Preparación y suministro',
        description: 'Adquirimos todos los materiales certificados. Preparamos herramientas y equipos necesarios. Coordinamos fechas para minimizar molestias y asegurar que no quedas sin agua innecesariamente.'
      },
      {
        step: 5,
        title: 'Ejecución de la sustitución',
        description: 'Retiramos tuberías antiguas, realizamos rozas mínimas imprescindibles, instalamos nuevas conducciones, realizamos conexiones con técnica apropiada según material (soldadura, prensado, roscado).'
      },
      {
        step: 6,
        title: 'Pruebas de presión',
        description: 'Sometemos la nueva instalación a pruebas de presión según normativa (mínimo 1.5 veces presión de trabajo), comprobamos todas las conexiones, verificamos ausencia total de fugas.'
      },
      {
        step: 7,
        title: 'Restauración y limpieza',
        description: 'Restauramos paredes o suelos abiertos, reponemos alicatados si fue necesario, pintamos si corresponde. Limpiamos completamente. Entregamos certificado de instalación y garantía.'
      }
    ],
    pricing: {
      intro: 'Precios estimados para sustitución de tuberías. El coste depende de metros lineales, tipo de tubería, y obras necesarias.',
      items: [
        { service: 'Sustitución parcial (1 baño)', price: '600-1.200€', note: 'Cambio tuberías agua fría y caliente de un baño completo' },
        { service: 'Sustitución vivienda 2 baños', price: '1.800-3.500€', note: 'Renovación completa fontanería vivienda tipo 80-100m²' },
        { service: 'Sustitución completa piso 3 baños', price: '2.500-4.500€', note: 'Fontanería completa vivienda grande 120-150m²' },
        { service: 'Cambio acometida general', price: '800-2.000€', note: 'Acometida desde llave general hasta vivienda/local' },
        { service: 'Sustitución bajante comunitaria', price: '150-300€/m', note: 'Bajante completa de edificio, precio por metro lineal' },
        { service: 'Cambio tuberías de plomo', price: 'Según valoración', note: 'Requiere inspección, puede tener subvenciones' }
      ]
    },
    faqs: [
      {
        question: '¿Cuándo hay que cambiar las tuberías de una vivienda?',
        answer: 'Se recomienda sustitución cuando: las tuberías tienen más de 30-40 años, hay fugas frecuentes en múltiples puntos, el agua sale de color oxidado, la presión ha bajado significativamente, son tuberías de plomo (obligatorio cambiar), hay corrosión visible, o vas a hacer reforma integral (momento ideal para renovar fontanería oculta).'
      },
      {
        question: '¿Qué material de tubería es mejor: cobre, PEX o multicapa?',
        answer: 'Las tres son excelentes opciones modernas. Cobre: máxima durabilidad (50+ años), resistente, requiere soldadura profesional. PEX: flexible, instalación rápida sin soldaduras, económico, ideal para reformas. Multicapa: combina ventajas del cobre y PEX, muy versátil. Te asesoramos según tu caso, presupuesto y tipo de instalación.'
      },
      {
        question: '¿Hay que romper todas las paredes para cambiar tuberías?',
        answer: 'No necesariamente. Aprovechamos falsos techos, registros, espacios bajo suelo, recorridos por zonas no habitables. En instalaciones empotradas en paredes sí hay que abrir, pero minimizamos rozas al máximo. En reformas integrales es el momento ideal para renovar tuberías porque ya se van a hacer obras. Restauramos todo al finalizar.'
      },
      {
        question: '¿Cuánto tiempo lleva sustituir las tuberías completas?',
        answer: 'Depende del tamaño de la vivienda. Vivienda pequeña (1 baño): 2-4 días. Vivienda mediana (2 baños): 3-5 días. Vivienda grande: 5-7 días. Si es sustitución parcial: 1-2 días. Trabajamos para que tengas servicios mínimos de agua durante el proceso, coordinando fases de trabajo.'
      },
      {
        question: '¿Las tuberías nuevas tienen garantía?',
        answer: 'Sí, los materiales tienen garantía del fabricante (típicamente 10-25 años según marca y modelo). Nuestra instalación está garantizada por 2 años: si hay fugas, problemas en conexiones o cualquier defecto de instalación, lo solucionamos sin coste. Trabajamos con marcas reconocidas para asegurar calidad a largo plazo.'
      },
      {
        question: '¿Es obligatorio cambiar las tuberías de plomo?',
        answer: 'Sí, las tuberías de plomo están prohibidas por normativa sanitaria desde hace años porque el plomo contamina el agua potable con graves riesgos para la salud (especialmente niños). Si tu vivienda todavía tiene tuberías de plomo, debes cambiarlas. En algunas comunidades hay subvenciones para este cambio, te informamos.'
      },
      {
        question: '¿Puedo cambiar solo las tuberías que dan problemas?',
        answer: 'Sí, se puede hacer sustitución parcial de tramos problemáticos. Pero si las tuberías son muy antiguas y un tramo ya falló, es probable que otros tramos fallen pronto. A veces es más rentable a medio plazo hacer sustitución completa aprovechando obras. Te asesoramos sobre la opción más conveniente para tu caso.'
      },
      {
        question: '¿Sustituís también las bajantes de un edificio?',
        answer: 'Sí, realizamos sustitución de bajantes comunitarias completas. Típicamente cambiamos bajantes viejas de hierro fundido (que se oxidan y rompen) por PVC moderno. Requiere coordinación con comunidad de vecinos, andamios o plataformas si es necesario, y trabajos por fases para minimizar molestias. Proporcionamos informes para el administrador.'
      }
    ],
    relatedServices: [
      { title: 'Reparación de Fugas', slug: 'reparacion-fugas', icon: '💧' },
      { title: 'Desatascos Urgentes', slug: 'desatascos', icon: '🚰' },
      { title: 'Instalaciones de Fontanería', slug: 'instalaciones', icon: '🔧' },
      { title: 'Calentadores y Termos', slug: 'calentadores-termos', icon: '♨️' },
      { title: 'Mantenimiento Preventivo', slug: 'mantenimiento', icon: '🛠️' }
    ]
  },
  {
    slug: 'calentadores-termos',
    name: 'Calentadores y Termos',
    h1: 'Calentadores y Termos Eléctricos',
    icon: '♨️',
    description: 'Instalación, reparación y mantenimiento de calentadores de agua y termos eléctricos. Agua caliente sanitaria garantizada con equipos eficientes y profesionales certificados.',
    metaTitle: 'Calentadores y Termos | Instalación y Reparación de ACS',
    metaDescription: 'Instalación y reparación de calentadores y termos eléctricos. Agua caliente sanitaria 24/7. Técnicos especializados. Cambio urgente. ¡Llama ahora!',
    keywords: [
      'instalación termo eléctrico',
      'reparación calentador',
      'calentador de agua',
      'termo sin agua caliente',
      'cambio termo eléctrico',
      'agua caliente sanitaria',
      'instalador termos',
      'calentador averiado',
      'termo pierde agua',
      'mantenimiento calentador'
    ],
    longDescription: `El agua caliente sanitaria es esencial en cualquier vivienda moderna. Los calentadores de agua y termos eléctricos son los sistemas más utilizados para proporcionar agua caliente en hogares, oficinas y pequeños comercios. Un calentador averiado, un termo que pierde agua, o simplemente un equipo antiguo que consume excesivamente, son problemas que requieren atención profesional inmediata. Nuestro servicio especializado en calentadores y termos cubre instalación de equipos nuevos, reparación de averías, mantenimiento preventivo, y sustitución de equipos obsoletos por modelos eficientes.

Los problemas más frecuentes en calentadores y termos incluyen: falta de agua caliente por resistencia quemada, termo que pierde agua por corrosión del depósito o válvulas defectuosas, termostato averiado que no regula temperatura correctamente, válvula de seguridad goteando constantemente, acumulación de cal en resistencia y depósito reduciendo eficiencia, consumo eléctrico excesivo por aislamiento deteriorado, y ruidos al calentar por sedimentos acumulados en el fondo del depósito.

En instalaciones nuevas, te asesoramos sobre el tipo y capacidad de calentador óptimo según tus necesidades. Termo eléctrico (50-200 litros) para viviendas donde se acumula agua caliente, calentador instantáneo sin depósito para puntos de uso concretos, sistemas compactos para espacios reducidos, equipos de bajo consumo con programación horaria, termos con tecnología de recuperación rápida, y combinados con aerotermia para máxima eficiencia. Calculamos la capacidad necesaria según número de usuarios, baños existentes, y hábitos de consumo para evitar quedarte sin agua caliente o sobredimensionar el equipo.

Nuestra experiencia técnica incluye todas las marcas del mercado: Fleck, Junkers, Ariston, Cointra, Thermor, Fagor, Teka, y marcas premium. Conocemos las averías típicas de cada modelo, disponemos de recambios habituales, y mantenemos relación directa con servicios técnicos oficiales para piezas específicas. Esto nos permite diagnosticar rápidamente la avería y proporcionar solución eficaz, ya sea reparación económica o recomendación de sustitución cuando el equipo no es reparable.

Realizamos mantenimiento preventivo anual que incluye: revisión del ánodo de magnesio que protege el depósito contra corrosión, limpieza de resistencia y depósito con descalcificación, comprobación y ajuste del termostato, verificación de válvula de seguridad, aislamiento y conexiones eléctricas verificadas, y detección temprana de problemas potenciales. El mantenimiento regular alarga significativamente la vida útil del equipo (de 8-10 años hasta 12-15 años) y mantiene eficiencia energética óptima.`,
    benefits: [
      'Técnicos especializados en ACS',
      'Asesoramiento en equipos eficientes',
      'Reparación o cambio urgente',
      'Instalación con normativa vigente',
      'Garantía en reparaciones e instalaciones',
      'Servicio de mantenimiento preventivo'
    ],
    process: [
      {
        step: 1,
        title: 'Diagnóstico de la avería',
        description: 'Si no hay agua caliente o el termo pierde agua, contacta con nosotros. Programamos visita técnica para diagnosticar el problema: resistencia, termostato, válvulas, corrosión, o cal acumulada.'
      },
      {
        step: 2,
        title: 'Valoración técnica',
        description: 'Nuestro técnico evalúa si es reparable económicamente o es mejor sustituir el equipo. Te explicamos opciones, costes, y recomendación profesional según antigüedad y estado del calentador.'
      },
      {
        step: 3,
        title: 'Presupuesto claro',
        description: 'Proporcionamos presupuesto detallado de reparación con piezas, o de instalación nueva con equipo específico según capacidad necesaria. Sin sorpresas ni costes ocultos.'
      },
      {
        step: 4,
        title: 'Reparación o instalación',
        description: 'Si es reparación: cambiamos resistencia, termostato, válvula de seguridad, o limpiamos depósito. Si es instalación nueva: retiramos equipo antiguo, instalamos nuevo, conexiones eléctricas y fontanería.'
      },
      {
        step: 5,
        title: 'Pruebas de funcionamiento',
        description: 'Ponemos en marcha el equipo, verificamos que calienta correctamente, comprobamos temperatura del agua, tiraje de humos si es calentador a gas, y ausencia de fugas de agua.'
      },
      {
        step: 6,
        title: 'Explicación de uso',
        description: 'Te explicamos el funcionamiento correcto, temperatura recomendada (60°C para evitar legionela sin desperdiciar energía), mantenimiento básico, y cuándo llamarnos para revisión.'
      },
      {
        step: 7,
        title: 'Garantía y certificado',
        description: 'Entregamos certificado de instalación eléctrica si es equipo nuevo, garantía de nuestro trabajo, y garantía del fabricante si es equipo nuevo. Programamos mantenimiento anual si lo solicitas.'
      }
    ],
    pricing: {
      intro: 'Precios orientativos para calentadores y termos. Instalaciones nuevas no incluyen el equipo salvo que se especifique.',
      items: [
        { service: 'Reparación avería simple', price: '80-150€', note: 'Cambio resistencia, termostato, válvula. Según pieza' },
        { service: 'Descalcificación y limpieza', price: '90-180€', note: 'Mantenimiento completo con limpieza de depósito' },
        { service: 'Instalación termo eléctrico 50-100L', price: '150-300€', note: 'Mano de obra instalación. Termo no incluido' },
        { service: 'Instalación termo eléctrico >100L', price: '250-400€', note: 'Termos grandes, requieren fijaciones especiales' },
        { service: 'Termo eléctrico 50L instalado', price: 'Desde 350€', note: 'Completo: termo básico + instalación + retirada antiguo' },
        { service: 'Termo eléctrico 100L instalado', price: 'Desde 550€', note: 'Completo: termo + instalación + retirada antiguo' }
      ]
    },
    faqs: [
      {
        question: '¿Por qué mi termo no da agua caliente?',
        answer: 'Las causas más comunes son: resistencia quemada (no calienta), termostato averiado (no activa la resistencia), fusible o diferencial desconectado, acumulación excesiva de cal en la resistencia, o termo demasiado pequeño para tus necesidades. Un técnico diagnostica en 15-20 minutos y te explica si es reparable o hay que cambiar el termo.'
      },
      {
        question: '¿Cuánto dura un termo eléctrico?',
        answer: 'Un termo eléctrico de calidad bien mantenido dura 10-15 años. Sin mantenimiento, suele durar 8-10 años. Los factores que acortan vida útil son: dureza del agua (mucha cal), temperatura excesiva (más de 70°C acelera corrosión), ánodo de magnesio sin cambiar (protege contra corrosión), y falta de limpieza periódica. El mantenimiento anual alarga significativamente la vida del equipo.'
      },
      {
        question: '¿Qué capacidad de termo necesito para mi vivienda?',
        answer: 'Regla básica: 1-2 personas: 50-80L, 3-4 personas: 100-150L, 5+ personas: 150-200L. Pero depende de hábitos: si todos os ducháis seguidos por la mañana, necesitáis más capacidad. Si los usos están escalonados, podéis con menos. También influye si tenéis bañera (consume más que ducha). Te asesoramos según tu caso concreto para no sobredimensionar.'
      },
      {
        question: '¿Por qué gotea agua de mi termo?',
        answer: 'Hay dos causas principales: válvula de seguridad goteando (normal que gotee algo durante el calentamiento por dilatación del agua, pero no debe gotear constantemente), o fuga en el depósito por corrosión (grave, hay que cambiar termo). También puede ser junta o conexión de fontanería aflojada (fácil de reparar). Un técnico identifica rápidamente la causa.'
      },
      {
        question: '¿Es mejor termo eléctrico o calentador de gas?',
        answer: 'Depende de tu instalación. Termo eléctrico: no necesita gas ni salida de humos, instalación más simple, coste menor inicial, ideal si no tienes gas en casa. Calentador gas: agua caliente ilimitada instantánea, más económico en consumo a largo plazo (gas más barato que electricidad), pero requiere instalación de gas y salida de humos certificada. Te asesoramos según tu caso.'
      },
      {
        question: '¿Se puede reparar un termo con el depósito corroído?',
        answer: 'No, si el depósito tiene corrosión perforada (pierde agua por el depósito, no por válvulas o conexiones), el termo no es reparable y hay que sustituirlo completo. La corrosión del depósito es irreversible. Por esto es importante el mantenimiento: cambiar el ánodo de magnesio cada 2-3 años previene la corrosión del depósito.'
      },
      {
        question: '¿Cuánto cuesta la electricidad de un termo?',
        answer: 'Depende de capacidad y uso. Un termo de 100L consume aproximadamente 1.5-2 kWh por calentamiento completo (unos 0.30-0.50€ con tarifa media). Si usas agua caliente una vez al día: unos 10-15€/mes. Con tarifa discriminación horaria, programándolo de noche, reduces coste un 40-50%. Los termos con buen aislamiento mantienen temperatura sin recalentar constantemente.'
      },
      {
        question: '¿Hacéis mantenimiento preventivo de termos?',
        answer: 'Sí, recomendamos mantenimiento anual que incluye: inspección general del equipo, limpieza de resistencia con descalcificación, revisión y si es necesario cambio del ánodo de magnesio (protege contra corrosión), comprobación termostato y válvula de seguridad, verificación conexiones eléctricas y fontanería. Cuesta 90-180€ y alarga vida útil del termo hasta 5 años más.'
      }
    ],
    relatedServices: [
      { title: 'Reparación de Fugas', slug: 'reparacion-fugas', icon: '💧' },
      { title: 'Desatascos Urgentes', slug: 'desatascos', icon: '🚰' },
      { title: 'Instalaciones de Fontanería', slug: 'instalaciones', icon: '🔧' },
      { title: 'Sustitución de Tuberías', slug: 'sustitucion-tuberias', icon: '🔩' },
      { title: 'Mantenimiento Preventivo', slug: 'mantenimiento', icon: '🛠️' }
    ]
  },
  {
    slug: 'mantenimiento',
    name: 'Mantenimiento Preventivo',
    h1: 'Mantenimiento Preventivo de Fontanería',
    icon: '🛠️',
    description: 'Servicio de mantenimiento preventivo para evitar fugas, averías y problemas futuros. Planes para hogares, comunidades y empresas. Ahorra en reparaciones urgentes.',
    metaTitle: 'Mantenimiento Preventivo de Fontanería | Planes Anuales',
    metaDescription: 'Mantenimiento preventivo de fontanería para evitar fugas y averías. Planes anuales para hogares y comunidades. Revisión completa de instalaciones. Contrato ya.',
    keywords: [
      'mantenimiento fontanería',
      'revisión fontanería',
      'plan mantenimiento',
      'prevención fugas',
      'mantenimiento preventivo',
      'inspección fontanería',
      'contrato mantenimiento',
      'revisión anual fontanería',
      'chequeo instalación agua',
      'mantenimiento comunidad'
    ],
    longDescription: `El mantenimiento preventivo de fontanería es la forma más inteligente y económica de evitar averías costosas, fugas imprevistas, y emergencias inconvenientes. Una revisión periódica profesional detecta problemas incipientes antes de que se conviertan en reparaciones caras, alarga la vida útil de tu instalación, mantiene presión y caudal óptimos, previene humedades y daños estructurales, y te proporciona tranquilidad sabiendo que tu fontanería está en perfecto estado. Nuestros planes de mantenimiento preventivo están diseñados para viviendas particulares, comunidades de propietarios, y empresas.

Las instalaciones de fontanería se deterioran gradualmente con el uso normal. Juntas que se secan y agrietan, válvulas que se oxidan y bloquean, cal que se acumula reduciendo caudal, tuberías que se corroen lentamente, gomas que pierden elasticidad, y conexiones que se aflojan con vibraciones. Estos procesos son invisibles pero continuos. El mantenimiento preventivo identifica estos deterioros cuando aún son fáciles de solucionar con intervenciones menores y económicas, antes de que provoquen fugas importantes, roturas súbitas, o inundaciones.

Nuestro servicio de mantenimiento preventivo incluye: inspección visual completa de toda la instalación visible, comprobación de contadores para verificar consumo normal, revisión de llaves de paso y válvulas de corte, inspección de grifería en busca de goteos o fugas menores, verificación de sifones y arquetas de evacuación, comprobación de presión del sistema, detección de fugas ocultas mediante escucha y medición, revisión de termo o calentador de agua, limpieza preventiva de aireadores y perlizadores, lubricación de válvulas, apriete de conexiones si es necesario, y recomendaciones sobre elementos que conviene cambiar pronto.

Los planes de mantenimiento se adaptan a cada necesidad. Para viviendas particulares: revisión anual básica (suficiente para instalaciones modernas), o revisión semestral si la instalación supera 15 años o tiene historial de problemas. Para comunidades de propietarios: revisión trimestral de zonas comunes, bajantes, contador general, y sistemas de bombeo si existen. Para empresas y comercios: plan personalizado según tipo de actividad, revisiones más frecuentes en hostelería o industria con uso intensivo de agua. Todos los planes incluyen informe escrito de cada revisión con recomendaciones.

El coste del mantenimiento preventivo se recupera ampliamente evitando reparaciones urgentes. Un ejemplo: cambiar una goma de grifo que gotea (15-30€ en mantenimiento) evita desperdiciar cientos de litros de agua y una factura mayor. Detectar una fuga oculta incipiente (50-100€ de detección preventiva) evita reparaciones de 300-800€ más daños estructurales por humedad. Limpiar periódicamente el termo (90-180€) evita su sustitución prematura (500-1.000€). El mantenimiento preventivo no es un gasto, es una inversión que amortiza multiplicando su coste.`,
    benefits: [
      'Prevención de averías costosas',
      'Detección temprana de problemas',
      'Alarga vida útil de instalaciones',
      'Planes flexibles y adaptados',
      'Informes escritos cada revisión',
      'Descuentos en reparaciones urgentes'
    ],
    process: [
      {
        step: 1,
        title: 'Contratación del plan',
        description: 'Contacta con nosotros explicando tu situación: vivienda, comunidad, o empresa. Te recomendamos el plan de mantenimiento apropiado: anual, semestral, o trimestral según tus necesidades.'
      },
      {
        step: 2,
        title: 'Primera revisión completa',
        description: 'Realizamos inspección exhaustiva inicial de toda tu instalación de fontanería. Evaluamos estado general, identificamos puntos de atención, y establecemos línea base para futuras revisiones.'
      },
      {
        step: 3,
        title: 'Informe y recomendaciones',
        description: 'Entregamos informe escrito con estado de la instalación, fotografías si es necesario, elementos que requieren atención inmediata, y recomendaciones de mejoras preventivas a medio plazo.'
      },
      {
        step: 4,
        title: 'Intervenciones menores',
        description: 'Durante la revisión, realizamos pequeñas intervenciones sin coste adicional: apriete de conexiones, lubricación de válvulas, limpieza de aireadores, ajustes menores. Ahorramos visitas futuras.'
      },
      {
        step: 5,
        title: 'Programación de revisiones',
        description: 'Agendamos las siguientes revisiones según la periodicidad contratada. Te avisamos con antelación. Llevamos registro histórico de tu instalación para detectar evolución y tendencias.'
      },
      {
        step: 6,
        title: 'Revisiones periódicas',
        description: 'En cada visita periódica inspeccionamos nuevamente todos los puntos críticos, comparamos con revisiones anteriores, identificamos nuevos problemas, y actualizamos recomendaciones.'
      },
      {
        step: 7,
        title: 'Prioridad y descuentos',
        description: 'Como cliente de mantenimiento, tienes prioridad en caso de urgencia real, y descuentos en reparaciones necesarias (10-15%). El mantenimiento previene, pero si surge imprevisto, te atendemos rápido.'
      }
    ],
    pricing: {
      intro: 'Planes de mantenimiento preventivo con precios cerrados anuales. Intervenciones menores durante revisiones incluidas.',
      items: [
        { service: 'Plan Básico Vivienda - Anual', price: '120-180€/año', note: '1 revisión completa anual, vivienda hasta 120m², informe escrito' },
        { service: 'Plan Premium Vivienda - Semestral', price: '220-300€/año', note: '2 revisiones al año, ideal instalaciones antiguas o problemáticas' },
        { service: 'Plan Comunidad Pequeña (hasta 10 viviendas)', price: '350-600€/año', note: 'Revisiones trimestrales zonas comunes, bajantes, contadores' },
        { service: 'Plan Comunidad Mediana (10-30 viviendas)', price: '600-1.200€/año', note: 'Revisiones trimestrales, incluye bombeo si existe' },
        { service: 'Plan Empresa/Comercio', price: 'Según valoración', note: 'Personalizado según actividad, tamaño, uso de agua' },
        { service: 'Revisión puntual sin contrato', price: '90-150€', note: 'Revisión completa única si no deseas plan anual' }
      ]
    },
    faqs: [
      {
        question: '¿Vale la pena contratar mantenimiento preventivo?',
        answer: 'Absolutamente. El coste de una reparación urgente (fuga importante, termo averiado, atasco) suele ser 3-5 veces el coste de mantenimiento anual. Además, previene daños por humedad que pueden costar miles de euros. El mantenimiento detecta problemas pequeños cuando son baratos de solucionar. Nuestros clientes con contrato de mantenimiento tienen 70-80% menos urgencias que clientes sin mantenimiento.'
      },
      {
        question: '¿Qué incluye exactamente una revisión de mantenimiento?',
        answer: 'Inspección visual completa de instalación, revisión de grifería, llaves de paso, sifones, contador, presión del sistema, evacuaciones, termo o calentador, arquetas accesibles, detección básica de fugas ocultas, limpieza de aireadores, lubricación válvulas, apriete conexiones, y recomendaciones escritas. Incluye pequeñas intervenciones sin coste adicional. Dura 1-2 horas según tamaño de instalación.'
      },
      {
        question: '¿Con qué frecuencia hay que hacer mantenimiento?',
        answer: 'Para viviendas con instalación moderna (menos de 15 años): revisión anual suficiente. Instalaciones más antiguas o con historial de problemas: revisión semestral recomendable. Comunidades de vecinos: trimestral es ideal para detectar problemas en zonas comunes. Empresas/comercios: según uso intensivo, puede ser mensual. Te asesoramos sobre lo apropiado en tu caso.'
      },
      {
        question: '¿Puedo cancelar el plan de mantenimiento cuando quiera?',
        answer: 'Sí, nuestros planes son anuales pero sin compromiso de renovación. Si no estás satisfecho, cancelas sin penalización. Tampoco hay compromiso de permanencia: si quieres cancelar a medio año, solo pagas las revisiones ya realizadas. Nuestra prioridad es que valores el servicio, no atarte con contratos largos.'
      },
      {
        question: '¿Qué pasa si se detecta una reparación necesaria?',
        answer: 'Te explicamos el problema encontrado y proporcionamos presupuesto de la reparación necesaria. Tú decides si la haces ahora, la programas para más adelante, o prefieres esperar. Como cliente de mantenimiento, tienes 10-15% descuento en reparaciones. No hay obligación de que hagas ninguna reparación con nosotros, pero te recomendamos lo que vemos para que decidas informadamente.'
      },
      {
        question: '¿Hacéis mantenimiento en comunidades de vecinos?',
        answer: 'Sí, tenemos experiencia con comunidades. Revisamos zonas comunes, bajantes, contador general, arquetas, cuartos de contadores, equipos de bombeo o presión si existen. Proporcionamos informe para el administrador de fincas con fotografías, estado de elementos, y recomendaciones de actuaciones prioritarias. Coordinamos trabajos para minimizar molestias.'
      },
      {
        question: '¿El mantenimiento incluye limpieza del termo?',
        answer: 'En plan básico anual incluimos inspección del termo (verificar funcionamiento, posibles fugas, ruidos anormales). La limpieza profunda con descalcificación y cambio de ánodo tiene coste adicional (90-150€) porque requiere más tiempo y piezas, pero como cliente de mantenimiento tienes descuento. Te avisamos cuando tu termo necesita esta limpieza (cada 2-3 años típicamente).'
      },
      {
        question: '¿Tengo prioridad si surge una urgencia con contrato de mantenimiento?',
        answer: 'Sí, nuestros clientes con contrato de mantenimiento tienen prioridad en emergencias reales. Si tienes una fuga importante o avería urgente, atendemos antes que clientes sin contrato. Además, como ya conocemos tu instalación por las revisiones previas, diagnosticamos más rápido y a menudo tenemos piezas apropiadas. El servicio urgente también tiene descuento para clientes de mantenimiento.'
      }
    ],
    relatedServices: [
      { title: 'Reparación de Fugas', slug: 'reparacion-fugas', icon: '💧' },
      { title: 'Desatascos Urgentes', slug: 'desatascos', icon: '🚰' },
      { title: 'Instalaciones de Fontanería', slug: 'instalaciones', icon: '🔧' },
      { title: 'Sustitución de Tuberías', slug: 'sustitucion-tuberias', icon: '🔩' },
      { title: 'Calentadores y Termos', slug: 'calentadores-termos', icon: '♨️' }
    ]
  }
]

// Generate static params for child services
export async function generateStaticParams() {
  const params: { locale: Locale; childSlug: string }[] = []
  
  // SPANISH-ONLY PRODUCTION
  const locales: Locale[] = ['es']
  
  locales.forEach((locale) => {
    fontaneroChildServices.forEach((childService) => {
      params.push({
        locale,
        childSlug: childService.slug,
      })
    })
  })
  
  return params
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}): Promise<Metadata> {
  const { locale, childSlug } = await params
  const childService = fontaneroChildServices.find((cs) => cs.slug === childSlug)
  
  if (!childService) {
    return {}
  }

  const canonicalUrl = `https://reparar24.es/fontanero/${childSlug}`
  
  return {
    title: childService.metaTitle,
    description: childService.metaDescription,
    keywords: childService.keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: childService.metaTitle,
      description: childService.metaDescription,
      url: canonicalUrl,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

// Page component
export default async function FontaneroChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  const { locale, childSlug } = await params
  const childService = fontaneroChildServices.find((cs) => cs.slug === childSlug)

  if (!childService) {
    notFound()
  }

  const parentService = services.find((s) => s.slug === 'fontanero')!

  // Breadcrumbs
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Fontanería', url: '/fontanero' },
    { name: childService.name, url: `/fontanero/${childSlug}` }
  ]

  const breadcrumbSchema = genBreadcrumbSchema(breadcrumbItems)

  // Service schema
  const serviceSchema = generateServiceSchema({
    service: {
      ...parentService,
      name: childService.name,
      description: childService.description
    }
  })

  // FAQ schema
  const faqSchema = generateFAQSchema({
    questions: childService.faqs
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">{childService.icon}</span>
                <h1 className="text-5xl md:text-6xl font-bold">{childService.h1}</h1>
              </div>
              <p className="text-2xl mb-8 text-primary-50">{childService.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+34641688524"
                  className="btn-primary bg-accent-500 hover:bg-accent-600"
                >
                  📞 Llamar Ahora - Desde 49€
                </a>
                <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold flex items-center">
                  🕐 Disponible 24 Horas
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="trust-badge">
                <span className="text-green-500 font-bold">✓</span>
                <span>Detección Avanzada</span>
              </div>
              <div className="trust-badge">
                <span className="text-green-500 font-bold">✓</span>
                <span>Técnicos Certificados</span>
              </div>
              <div className="trust-badge">
                <span className="text-green-500 font-bold">✓</span>
                <span>Reparación Inmediata</span>
              </div>
              <div className="trust-badge">
                <span className="text-green-500 font-bold">✓</span>
                <span>Servicio 24/7</span>
              </div>
              <div className="trust-badge">
                <span className="text-green-500 font-bold">✓</span>
                <span>Garantía Incluida</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">¿Por Qué Elegirnos para Reparar Fugas?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childService.benefits.map((benefit, index) => (
                <div key={index} className="card">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 text-2xl mt-1">✓</span>
                    <p className="text-lg">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leak Types Section */}
        {childService.leakTypes && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">Tipos de Fugas que Reparamos</h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {childService.leakTypes.map((type, index) => (
                  <div key={index} className="card-flat">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-600 text-xl mt-1">💧</span>
                      <p className="text-gray-700">{type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Detection Methods Section */}
        {childService.detectionMethods && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-8 text-center">Métodos de Detección Profesional</h2>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {childService.detectionMethods.map((method, index) => (
                  <div key={index} className="card">
                    <div className="flex items-start space-x-3">
                      <span className="text-accent-600 text-2xl mt-1">🔍</span>
                      <p className="text-gray-700">{method}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Emergency CTA */}
        <section className="py-12 bg-gradient-to-r from-emergency-600 to-orange-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">¿Fuga de Agua Urgente?</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              No esperes a que el problema empeore. Disponibles 24/7 para emergencias.
            </p>
            <a
              href="tel:+34641688524"
              className="btn-emergency inline-block"
            >
              📞 Llamar Ahora - Servicio Inmediato
            </a>
          </div>
        </section>

        {/* Process Section */}
        {childService.process && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-12 text-center">Cómo Reparamos Tu Fuga</h2>
              <div className="max-w-4xl mx-auto space-y-8">
                {childService.process.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        {childService.pricing && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-3xl font-bold mb-4 text-center">Tarifas Transparentes</h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {childService.pricing.intro}
              </p>
              <div className="max-w-3xl mx-auto space-y-4">
                {childService.pricing.items.map((item, index) => (
                  <div key={index} className="card flex justify-between items-center">
                    <div className="flex-grow">
                      <p className="font-semibold text-lg">{item.service}</p>
                      {item.note && <p className="text-sm text-gray-600 mt-1">{item.note}</p>}
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-xl font-bold text-primary-600">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  * Precios orientativos. Presupuesto definitivo tras inspección inicial.
                </p>
              </div>
            </div>
          </section>
        )}

        <CTASection locale={locale} />

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {childService.longDescription}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {childService.faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <summary className="px-6 py-4 font-semibold text-lg cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Block */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Otros Servicios de Fontanería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {childService.relatedServices.map((relService, index) => (
                <Link
                  key={index}
                  href={`/fontanero/${relService.slug}`}
                  className="group block"
                >
                  <article className="h-full bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all duration-300 hover:shadow-lg p-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-100 text-3xl mb-4 group-hover:bg-primary-200 transition-colors">
                      {relService.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {relService.title}
                    </h3>
                    <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                      <span>Ver servicio</span>
                      <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/fontanero"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                ← Volver a Servicios de Fontanería
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
