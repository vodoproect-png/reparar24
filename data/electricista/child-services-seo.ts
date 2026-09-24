/**
 * Electricista Child Services SEO Data
 * Source of truth for /electricista/[childSlug] production pages.
 *
 * Each page keeps a distinct primary intent to avoid cannibalization:
 * - urgencias-electricas: electricista 24 horas Valencia
 * - instalaciones-electricas: instalacion electrica Valencia
 * - cuadros-electricos: cuadro electrico Valencia
 * - iluminacion-led: iluminacion led Valencia
 * - enchufes-interruptores: enchufes e interruptores Valencia
 * - averias-electricas: averia electrica Valencia
 * - pequenos-trabajos-electricos: pequenos trabajos electricos Valencia
 * - cargador-coche-electrico: cargador coche electrico Valencia
 * - domotica: domotica Valencia
 * - mantenimiento-electrico: mantenimiento electrico Valencia
 * - revision-electrica: revision instalacion electrica Valencia
 */

import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import {
  Zap,
  Lightbulb,
  Power,
  ShieldAlert,
  Cable,
  Wrench,
} from 'lucide-react'

export interface ChildServiceData {
  h1: string
  metaTitle: string
  metaDescription: string
  lockedPrimaryKw: string
  secondaryKw: string[]
  seoBlockKw: string[]
  faqKw: string[]
  contentBrief: string
  description: string
  seoContent: SeoContentSectionV1Props
  faqs: { question: string; answer: string }[]
}

export const childServicesData: Record<string, ChildServiceData> = {
  'urgencias-electricas': {
    h1: 'Electricista Urgente 24 Horas en Valencia',
    metaTitle: 'Electricista Urgente Valencia | 24 Horas',
    metaDescription: 'Electricista urgente 24 horas en Valencia para cortes de luz, cortocircuitos, averias y emergencias electricas. Llegada rapida y presupuesto claro.',
    lockedPrimaryKw: 'electricista urgente',
    secondaryKw: ['electricista urgente', 'electricista de urgencias', 'electricista emergencia', 'electricista de emergencia', 'electricista de guardia'],
    seoBlockKw: ['electricista urgente valencia', 'electricista 24 horas', 'electricista de urgencias', 'emergencia electrica'],
    faqKw: ['electricista urgente', 'emergencia electrica', 'electricista de emergencia', 'electricista de guardia', 'servicio electrico urgente'],
    contentBrief: 'Servicio de electricista urgente disponible 24 horas para emergencias electricas en Valencia.',
    description: 'Atencion urgente para cortes de luz, cortocircuitos y averias electricas en Valencia.',
    seoContent: {
      badge: 'Servicio de emergencia 24/7',
      title: 'Electricista urgente en Valencia para emergencias reales',
      intro: [
        'Cuando se corta la luz, salta el diferencial o aparece olor a quemado, necesitas un electricista urgente en Valencia que actue con rapidez y seguridad. Atendemos emergencias electricas en viviendas, locales y comunidades con diagnostico profesional desde el primer aviso.',
        'Nuestro servicio de electricista 24 horas cubre cortocircuitos, cuadros electricos disparados, enchufes quemados, fallos de suministro y averias que no pueden esperar al dia siguiente. Trabajamos como electricista de urgencias, electricista emergencia y electricista de emergencia cuando la instalacion necesita una respuesta inmediata.',
        'Trabajamos con herramientas de comprobacion, materiales homologados y procedimientos seguros para recuperar la electricidad sin improvisaciones. Si la averia requiere una reparacion mayor, dejamos la instalacion protegida y te indicamos la solucion definitiva.',
      ],
      serviceCards: [
        {
          icon: ShieldAlert,
          title: 'Emergencias electricas 24 horas',
          color: 'red' as const,
          bullets: ['Cortes de luz', 'Cortocircuitos', 'Diferencial que salta', 'Enchufes quemados'],
        },
        {
          icon: Zap,
          title: 'Electricista de guardia en Valencia',
          color: 'orange' as const,
          bullets: ['Atencion rapida', 'Diagnostico seguro', 'Presupuesto previo', 'Intervencion profesional'],
        },
        {
          icon: Wrench,
          title: 'Reparacion urgente y segura',
          color: 'blue' as const,
          bullets: ['Materiales homologados', 'Pruebas finales', 'Garantia de trabajo', 'Solucion estable'],
        },
      ],
      localCoverage: {
        title: 'Electricista urgente en Valencia y alrededores',
        description: 'Atendemos emergencias electricas con prioridad en Valencia, barrios principales y zonas cercanas.',
      },
      benefitsTitle: 'Por que elegir nuestro electricista urgente',
      benefits: [
        'Atencion 24 horas todos los dias',
        'Diagnostico antes de reparar',
        'Presupuesto claro antes de empezar',
        'Trabajo con garantia profesional',
        'Electricistas con experiencia en averias reales',
      ],
      keywordsTitle: 'Servicios urgentes de electricidad',
      keywordTags: ['electricista urgente valencia', 'electricista 24 horas', 'electricista de urgencias', 'electricista de guardia', 'emergencia electrica'],
    },
    faqs: [
      {
        question: '¿Cuándo debo llamar a un electricista urgente?',
        answer: 'Conviene llamar si hay corte de luz sin causa clara, chispazos, olor a quemado, enchufes calientes, cortocircuitos o si el diferencial salta continuamente.',
      },
      {
        question: '¿Atendeis emergencias eléctricas de noche?',
        answer: 'Si, el servicio urgente esta preparado para avisos 24 horas en Valencia, incluyendo noches, fines de semana y festivos.',
      },
      {
        question: '¿Qué hago si salta el diferencial y no vuelve la luz?',
        answer: 'Desconecta aparatos, evita manipular cables y llama a un electricista de guardia. Puede haber una fuga, sobrecarga o cortocircuito que requiere comprobacion.',
      },
      {
        question: '¿Cuánto tarda en llegar un electricista urgente?',
        answer: 'Depende de la zona y la hora, pero priorizamos las urgencias electricas en Valencia para llegar lo antes posible y estabilizar la instalacion.',
      },
      {
        question: '¿Dais presupuesto antes de reparar?',
        answer: 'Si. Revisamos la averia, explicamos la causa y damos un presupuesto claro antes de realizar la reparacion.',
      },
    ],
  },

  'instalaciones-electricas': {
    h1: 'Instalacion Electrica en Valencia',
    metaTitle: 'Instalacion Electrica Valencia | Viviendas y Locales',
    metaDescription: 'Instalacion electrica en Valencia para viviendas, locales y reformas. Cableado, puntos de luz, enchufes, cuadro electrico y pruebas de seguridad.',
    lockedPrimaryKw: 'instalacion electrica',
    secondaryKw: ['instalacion electrica vivienda', 'instalador electricista', 'electricista instalador', 'cableado electrico', 'reforma electrica'],
    seoBlockKw: ['instalacion electrica valencia', 'instalacion electrica vivienda', 'electricista instalador', 'cableado electrico'],
    faqKw: ['instalacion electrica', 'instalacion electrica vivienda', 'instalador electricista', 'cableado electrico', 'reforma electrica'],
    contentBrief: 'Instalaciones electricas profesionales en Valencia para viviendas, locales y reformas.',
    description: 'Instalaciones electricas seguras para viviendas, locales y reformas en Valencia.',
    seoContent: {
      badge: 'Instalaciones electricas',
      title: 'Instalacion electrica profesional en Valencia',
      intro: [
        'Realizamos instalacion electrica en Valencia para viviendas, locales, reformas y ampliaciones. Una instalacion electrica vivienda bien planteada revisa necesidades de potencia, distribucion de circuitos, puntos de luz, enchufes y cuadro electrico para que la instalacion sea practica y segura.',
        'Un electricista instalador debe planificar el cableado electrico, proteger cada circuito y comprobar que la instalacion responde al uso real de la vivienda o negocio. Asi se evitan sobrecargas, averias repetidas y riesgos por conexiones antiguas.',
        'Trabajamos con materiales homologados, presupuesto previo y pruebas finales de funcionamiento. Podemos ejecutar instalaciones nuevas, renovar cableado deteriorado o adaptar una reforma electrica a nuevas zonas de uso.',
      ],
      serviceCards: [
        {
          icon: Cable,
          title: 'Instalacion electrica de vivienda',
          color: 'blue' as const,
          bullets: ['Cableado electrico', 'Puntos de luz', 'Enchufes e interruptores', 'Circuitos protegidos'],
        },
        {
          icon: Wrench,
          title: 'Reformas electricas',
          color: 'orange' as const,
          bullets: ['Redistribucion de puntos', 'Sustitucion de cableado', 'Adaptacion de espacios', 'Pruebas finales'],
        },
        {
          icon: ShieldAlert,
          title: 'Instalador electricista certificado',
          color: 'green' as const,
          bullets: ['Materiales homologados', 'Trabajo seguro', 'Presupuesto claro', 'Garantia profesional'],
        },
      ],
      localCoverage: {
        title: 'Instalaciones electricas en toda Valencia',
        description: 'Instalamos y renovamos sistemas electricos en viviendas, locales, oficinas y comunidades.',
      },
      benefitsTitle: 'Por que hacer la instalacion con un profesional',
      benefits: ['Diseno segun uso real', 'Cableado seguro', 'Protecciones adecuadas', 'Menos averias futuras', 'Garantia sobre el trabajo'],
      keywordsTitle: 'Servicios de instalacion electrica',
      keywordTags: ['instalacion electrica valencia', 'instalacion electrica vivienda', 'instalador electricista', 'cableado electrico', 'reforma electrica'],
    },
    faqs: [
      {
        question: '¿Qué incluye una instalación eléctrica en vivienda?',
        answer: 'Puede incluir cableado, cuadro electrico, circuitos, enchufes, interruptores, puntos de luz y pruebas de seguridad segun el estado de la vivienda.',
      },
      {
        question: '¿Cuánto cuestá una instalación eléctrica en Valencia?',
        answer: 'Depende de metros, numero de puntos, estado del cableado y complejidad del cuadro. Revisamos la instalacion y damos presupuesto antes de empezar.',
      },
      {
        question: '¿Puedo renovar solo parte del cableado eléctrico?',
        answer: 'Si, cuando la instalacion lo permite. Revisamos la zona afectada y proponemos una renovacion parcial o completa segun seguridad y uso.',
      },
      {
        question: '¿Cuánto tarda una reforma eléctrica?',
        answer: 'Una actuacion pequena puede resolverse en horas. Una vivienda completa suele requerir varios dias segun puntos, rozas, cuadro y acabados.',
      },
      {
        question: '¿El instalador revisa el cuadro eléctrico?',
        answer: 'Si. En una instalacion electrica profesional se revisa el cuadro, protecciones y circuitos para que el sistema funcione con seguridad.',
      },
    ],
  },

  'cuadros-electricos': {
    h1: 'Cuadro Electrico en Valencia',
    metaTitle: 'Cuadro Electrico Valencia | Cambio y Reparacion',
    metaDescription: 'Cambio y reparacion de cuadro electrico en Valencia. Diferenciales, magnetotermicos, protecciones, averias y actualizacion de cuadros electricos.',
    lockedPrimaryKw: 'cuadro electrico',
    secondaryKw: ['cuadro electrico vivienda', 'cambiar cuadro electrico', 'reparacion cuadro electrico', 'diferencial electrico', 'magnetotermico'],
    seoBlockKw: ['cuadro electrico valencia', 'cambiar cuadro electrico', 'reparacion cuadro electrico', 'diferencial electrico'],
    faqKw: ['cuadro electrico', 'cambiar cuadro electrico', 'diferencial electrico', 'cuadro electrico vivienda'],
    contentBrief: 'Cambio, reparacion y actualizacion de cuadros electricos en Valencia.',
    description: 'Reparamos y cambiamos cuadros electricos con protecciones seguras en Valencia.',
    seoContent: {
      badge: 'Cuadros electricos',
      title: 'Cambio y reparacion de cuadro electrico en Valencia',
      intro: [
        'El cuadro electrico protege toda la instalacion. Si un cuadro electrico vivienda salta a menudo, tiene magnetotermicos antiguos, calentamiento, ruido o cortes frecuentes, conviene revisar el cuadro antes de que la averia avance.',
        'Realizamos cambiar cuadro electrico y reparacion cuadro electrico en Valencia, sustitucion de diferenciales, cambio de magnetotermicos, reorganizacion de circuitos y actualizacion de cuadros antiguos para viviendas, locales y comunidades.',
        'Cada intervencion incluye diagnostico, explicacion del problema, presupuesto claro y pruebas finales. El objetivo es que el cuadro electrico quede ordenado, protegido y preparado para el consumo real del inmueble.',
      ],
      serviceCards: [
        {
          icon: Power,
          title: 'Cambio de cuadro electrico',
          color: 'blue' as const,
          bullets: ['Cuadros antiguos', 'Protecciones nuevas', 'Circuitos ordenados', 'Materiales homologados'],
        },
        {
          icon: Wrench,
          title: 'Reparacion de cuadro electrico',
          color: 'orange' as const,
          bullets: ['Diferencial que salta', 'Magnetotermicos', 'Falsos contactos', 'Cortes de luz'],
        },
        {
          icon: ShieldAlert,
          title: 'Seguridad y comprobaciones',
          color: 'green' as const,
          bullets: ['Revision de cargas', 'Pruebas de disparo', 'Conexion segura', 'Garantia profesional'],
        },
      ],
      localCoverage: {
        title: 'Cuadros electricos en Valencia',
        description: 'Atendemos cambios y reparaciones de cuadros electricos en viviendas, locales y comunidades.',
      },
      benefitsTitle: 'Cuando conviene revisar el cuadro electrico',
      benefits: ['Saltos frecuentes del diferencial', 'Cuadro antiguo o desordenado', 'Nuevos electrodomesticos de alta potencia', 'Olor a quemado o calentamiento', 'Reforma o ampliacion electrica'],
      keywordsTitle: 'Servicios de cuadro electrico',
      keywordTags: ['cuadro electrico valencia', 'cambiar cuadro electrico', 'reparacion cuadro electrico', 'diferencial electrico', 'magnetotermico'],
    },
    faqs: [
      {
        question: '¿Cuándo hay que cambiar un cuadro eléctrico?',
        answer: 'Conviene cambiarlo si es antiguo, no tiene protecciones adecuadas, presenta calentamiento, fallos repetidos o no soporta el consumo actual de la vivienda.',
      },
      {
        question: '¿Por qué salta el diferencial eléctrico?',
        answer: 'Puede saltar por una fuga de corriente, humedad, un aparato defectuoso o un problema en el circuito. Hay que diagnosticarlo antes de cambiar piezas.',
      },
      {
        question: '¿Cuánto tarda cambiar un cuadro eléctrico?',
        answer: 'Un cambio estandar suele hacerse en el mismo dia, aunque depende del estado del cableado, numero de circuitos y espacio disponible.',
      },
      {
        question: '¿Se puede reparar un cuadro sin cambiarlo entero?',
        answer: 'Si el cuadro esta en buen estado, a veces basta con sustituir diferencial, magnetotermicos o corregir conexiones. Lo confirmamos tras la revision.',
      },
      {
        question: '¿Dais presupuesto para cuadro eléctrico en Valencia?',
        answer: 'Si. Revisamos el cuadro, explicamos la solucion y damos presupuesto antes de realizar la reparacion o sustitucion.',
      },
    ],
  },

  'iluminacion-led': {
    h1: 'Iluminacion LED en Valencia',
    metaTitle: 'Iluminacion LED Valencia | Instalacion Profesional',
    metaDescription: 'Instalacion de iluminacion LED en Valencia para viviendas, cocinas, terrazas, locales y exteriores. Diseno de puntos de luz y montaje seguro.',
    lockedPrimaryKw: 'iluminacion led valencia',
    secondaryKw: ['instalar iluminacion led en valencia', 'instalacion iluminacion led', 'iluminacion led exterior', 'iluminacion led cocina'],
    seoBlockKw: ['iluminacion led valencia', 'instalar iluminacion led en valencia', 'instalacion iluminacion led'],
    faqKw: ['cuanto cuesta instalar iluminacion led', 'instalar iluminacion led en valencia', 'iluminacion led exterior', 'iluminacion led cocina'],
    contentBrief: 'Instalacion de iluminacion LED en Valencia para interiores, exteriores, cocinas y negocios.',
    description: 'Instalamos iluminacion led valencia, interior y exterior, con montaje seguro.',
    seoContent: {
      badge: 'Iluminacion LED',
      title: 'Instalacion de iluminacion LED en Valencia',
      intro: [
        'La iluminacion LED mejora consumo, confort y visibilidad cuando se disena con criterio electrico. Instalamos LED en Valencia para cocinas, salones, pasillos, terrazas, jardines, escaparates y locales comerciales.',
        'Si necesitas instalar iluminacion led en valencia, calculamos puntos de luz, revisamos el cableado, elegimos soluciones adecuadas para interior o exterior y dejamos la instalacion probada. Tambien hacemos instalacion iluminacion led y sustituimos sistemas antiguos por luminarias mas eficientes, incluyendo iluminacion led cocina cuando hace falta luz de trabajo.',
        'El resultado debe ser una luz estable, bien distribuida y segura. Por eso trabajamos con presupuesto previo, materiales adecuados y montaje profesional, evitando conexiones improvisadas o sobrecargas.',
      ],
      serviceCards: [
        {
          icon: Lightbulb,
          title: 'Instalacion de LED interior',
          color: 'orange' as const,
          bullets: ['Cocinas', 'Salones', 'Pasillos', 'Zonas de trabajo'],
        },
        {
          icon: Lightbulb,
          title: 'Iluminacion LED exterior',
          color: 'blue' as const,
          bullets: ['Terrazas', 'Jardines', 'Fachadas', 'Accesos'],
        },
        {
          icon: Cable,
          title: 'Montaje electrico seguro',
          color: 'green' as const,
          bullets: ['Cableado revisado', 'Puntos de luz', 'Pruebas finales', 'Ahorro energetico'],
        },
      ],
      localCoverage: {
        title: 'Iluminacion LED en Valencia',
        description: 'Instalamos iluminacion LED para viviendas, negocios, cocinas, terrazas y exteriores.',
      },
      benefitsTitle: 'Ventajas de instalar iluminacion LED',
      benefits: ['Menor consumo electrico', 'Mejor distribucion de luz', 'Soluciones para interior y exterior', 'Montaje limpio y seguro', 'Presupuesto antes de empezar'],
      keywordsTitle: 'Servicios de iluminacion LED',
      keywordTags: ['iluminacion led valencia', 'instalar iluminacion led en valencia', 'instalacion iluminacion led', 'iluminacion led exterior', 'iluminacion led cocina'],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá instalar iluminacion LED?',
        answer: 'Depende del numero de puntos de luz, tipo de luminaria, si hay cableado previo y si la instalacion es interior o exterior. Damos presupuesto antes de empezar.',
      },
      {
        question: '¿Instalais iluminacion LED en cocinas?',
        answer: 'Si. Podemos instalar tiras, focos, puntos bajo mueble y luz general, cuidando potencia, ubicacion y seguridad electrica.',
      },
      {
        question: '¿Se puede instalar LED en terrazas o exterior?',
        answer: 'Si, usando luminarias y conexiones adecuadas para exterior, humedad y uso continuo.',
      },
      {
        question: '¿Cuánto tarda una instalación LED?',
        answer: 'Una instalacion sencilla puede resolverse en pocas horas. Proyectos con varios puntos, exteriores o adaptacion de cableado pueden requerir mas tiempo.',
      },
      {
        question: '¿La iluminacion LED reduce el consumo?',
        answer: 'Normalmente si. El ahorro depende de las horas de uso, potencia instalada y tipo de luminarias sustituidas.',
      },
    ],
  },

  'enchufes-interruptores': {
    h1: 'Enchufes e Interruptores en Valencia',
    metaTitle: 'Enchufes e Interruptores Valencia | Instalacion',
    metaDescription: 'Instalacion, cambio y reparacion de enchufes e interruptores en Valencia. Enchufes quemados, interruptores, puntos nuevos y mecanismos seguros.',
    lockedPrimaryKw: 'enchufe valencia',
    secondaryKw: ['enchufe valencia', 'cambiar enchufe pladur', 'instalar interruptor bombilla', 'instalar interruptor enchufe', 'instalar interruptor superficie', 'instalar interruptor triple', 'reparar cable enchufe', 'reparar enchufe roto'],
    seoBlockKw: ['enchufes e interruptores', 'enchufe valencia', 'instalar interruptor enchufe', 'reparar enchufe roto', 'enchufe quemado'],
    faqKw: ['cuanto cuesta instalar un enchufe', 'reparar enchufe quemado', 'porque no funciona el enchufe', 'cambiar un enchufe quemado'],
    contentBrief: 'Instalacion, cambio y reparacion de enchufes e interruptores en Valencia.',
    description: 'Instalamos y reparamos enchufes e interruptores en Valencia con revision segura del punto electrico.',
    seoContent: {
      badge: 'Enchufes e interruptores',
      title: 'Instalacion y reparacion de enchufes e interruptores en Valencia',
      intro: [
        'Un enchufe roto, quemado o sin corriente puede indicar un problema en el mecanismo, el cableado o el circuito. Reparamos e instalamos enchufes e interruptores en Valencia con comprobaciones de seguridad antes de cerrar el trabajo.',
        'Atendemos cambiar enchufe pladur, instalar interruptor bombilla, instalar interruptor enchufe, instalar interruptor superficie e instalar interruptor triple cuando la vivienda necesita adaptar puntos de mando, luz o corriente sin abrir una reforma completa.',
        'Tambien resolvemos reparar cable enchufe, reparar enchufe roto, reparar enchufe de pared y reparar enchufe que se sale de la pared. Si la toma huele a quemado, aparece olor en el mecanismo o hay daño por cortocircuito, revisamos la causa antes de sustituir piezas.',
        'Antes de intervenir revisamos tension, toma de tierra y estado del cableado. Asi evitamos que el problema vuelva a aparecer y dejamos cada punto electrico listo para uso diario, incluyendo instalar enchufe de exterior, instalar enchufe en garaje comunitario o instalar enchufe y conmutador.',
      ],
      serviceCards: [
        {
          icon: Cable,
          title: 'Instalacion de enchufes',
          color: 'blue' as const,
          bullets: ['Puntos nuevos', 'Enchufes de exterior', 'Mecanismos de superficie', 'Toma de tierra'],
        },
        {
          icon: Wrench,
          title: 'Cambio de interruptores',
          color: 'orange' as const,
          bullets: ['Interruptor simple', 'Conmutadores', 'Interruptor triple', 'Interruptor con enchufe'],
        },
        {
          icon: ShieldAlert,
          title: 'Reparacion de enchufes',
          color: 'green' as const,
          bullets: ['Enchufe quemado', 'Cable suelto', 'Sin corriente', 'Mecanismo roto'],
        },
      ],
      localCoverage: {
        title: 'Enchufes e interruptores en Valencia',
        description: 'Cambiamos, instalamos y reparamos puntos electricos en viviendas, locales y comunidades.',
      },
      benefitsTitle: 'Por que revisar enchufes e interruptores con un electricista',
      benefits: ['Evita sobrecalentamientos', 'Corrige fallos de cableado', 'Instalacion segura', 'Mecanismos adecuados', 'Garantia profesional'],
      keywordsTitle: 'Servicios de enchufes e interruptores',
      keywordTags: ['enchufes e interruptores', 'enchufe valencia', 'instalar interruptor enchufe', 'reparar enchufe roto', 'enchufe quemado'],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá instalar un enchufe?',
        answer: 'Depende de si hay cableado previo, distancia al circuito, tipo de mecanismo y ubicacion. Para cuanto cuesta cambiar enchufes e interruptores revisamos numero de puntos, material y acceso antes de dar presupuesto.',
      },
      {
        question: '¿Qué hago si un enchufe está quemado?',
        answer: 'Deja de usarlo, desconecta el circuito si es posible y pide revision. Para cambiar un enchufe quemado o reparar enchufe quemado hay que localizar antes la causa: sobrecarga, mal contacto, cable deteriorado, toma de horno dañada o riesgo de incendio si se sigue usando.',
      },
      {
        question: '¿Por qué no funciona un enchufe?',
        answer: 'Puede deberse a un cable suelto, mecanismo roto, falta de tension, proteccion disparada o problema en el circuito. Revisamos casos como porque no funciona el enchufe sin cambiar piezas a ciegas: puede fallar el mecanismo, el cable o la proteccion del circuito.',
      },
      {
        question: '¿Instalais interruptores de superficie?',
        answer: 'Si, instalamos interruptores de superficie, empotrados, conmutadores, triples e interruptores combinados con enchufe. Tambien podemos instalar interruptor doble con enchufe, instalar interruptor doble luz, cambiar un interruptor cruzado o cambiar pulsador por interruptor cuando el circuito lo permite.',
      },
      {
        question: '¿Se puede poner un enchufe nuevo donde no hay punto?',
        answer: 'Normalmente si, si existe una ruta segura para el cableado y el circuito lo permite. Lo revisamos antes de presupuestar.',
      },
      {
        question: '¿Podéis cambiar enchufes antiguos por modelos seguros?',
        answer: 'Si. Revisamos enchufes e interruptores antiguos, toma de tierra, caja y cableado antes de cambiar enchufe simple a doble, cambiar enchufe macho con toma de tierra o cambiar un enchufe con fusible.',
      },
      {
        question: '¿Reparais enchufes de exterior o estancos?',
        answer: 'Si. Para enchufes e interruptores estancos para exterior comprobamos proteccion frente a humedad, ubicacion, caja, cableado y grado de estanqueidad antes de instalar o reparar.',
      },
      {
        question: '¿Hacéis cambios especiales de interruptores?',
        answer: 'Si. Podemos cambiar interruptor por sensor de movimiento, cambiar interruptor ventilador techo o cambiar fusible por enchufe cuando la instalacion es compatible y queda protegida.',
      },
      {
        question: '¿Puedo arreglar yo un enchufe que falla?',
        answer: 'Busquedas como como arreglar un enchufe que no funciona, como reparar un enchufe de pared o como reparar enchufe de pared suelen esconder fallos de tension o contacto. Lo seguro es medir el circuito y reparar caja de enchufe o mecanismo con el circuito protegido.',
      },
    ],
  },

  'averias-electricas': {
    h1: 'Averia Electrica en Valencia',
    metaTitle: 'Averia Electrica Valencia | Reparacion Rapida',
    metaDescription: 'Reparacion de averias electricas en Valencia. Solucionamos fallos electricos, cortes de luz, plomos que saltan, enchufes sin corriente y cortocircuitos.',
    lockedPrimaryKw: 'averia electrica',
    secondaryKw: ['reparacion averia electrica', 'fallo electrico', 'saltan los plomos', 'no hay luz en casa', 'problema electrico vivienda'],
    seoBlockKw: ['averia electrica valencia', 'reparacion averia electrica', 'fallo electrico', 'saltan los plomos'],
    faqKw: ['averia electrica', 'reparacion averia electrica', 'fallo electrico', 'saltan los plomos', 'no hay luz en casa'],
    contentBrief: 'Diagnostico y reparacion de averias electricas en Valencia.',
    description: 'Diagnosticamos y reparamos averias electricas en viviendas y locales de Valencia.',
    seoContent: {
      badge: 'Reparacion de averias',
      title: 'Reparacion de averias electricas en Valencia',
      intro: [
        'Una averia electrica puede dejar una vivienda sin luz, hacer saltar los plomos o provocar fallos intermitentes en enchufes y luminarias. Atendemos averias electricas en Valencia con diagnostico ordenado y reparacion segura.',
        'Buscamos la causa real del fallo electrico y hacemos reparacion averia electrica cuando hay sobrecarga, cortocircuito, cable deteriorado, humedad, mecanismo defectuoso o problema electrico vivienda. Reparar sin diagnosticar suele hacer que la averia vuelva.',
        'Trabajamos en viviendas, locales y comunidades con presupuesto previo, materiales adecuados y pruebas finales. Si la averia requiere una actuacion mayor, te explicamos opciones y prioridad de seguridad.',
      ],
      serviceCards: [
        {
          icon: Zap,
          title: 'Diagnostico de averia electrica',
          color: 'red' as const,
          bullets: ['Cortes de luz', 'Plomos que saltan', 'Enchufes sin corriente', 'Fallos intermitentes'],
        },
        {
          icon: Wrench,
          title: 'Reparacion electrica',
          color: 'orange' as const,
          bullets: ['Cableado', 'Mecanismos', 'Cuadro electrico', 'Circuitos afectados'],
        },
        {
          icon: ShieldAlert,
          title: 'Prevencion de nuevos fallos',
          color: 'blue' as const,
          bullets: ['Pruebas de seguridad', 'Revision de protecciones', 'Solucion estable', 'Garantia profesional'],
        },
      ],
      localCoverage: {
        title: 'Averias electricas en Valencia',
        description: 'Reparamos averias electricas en viviendas, locales, oficinas y comunidades de Valencia.',
      },
      benefitsTitle: 'Como trabajamos una averia electrica',
      benefits: ['Diagnostico antes de reparar', 'Localizacion de la causa', 'Presupuesto claro', 'Reparacion segura', 'Comprobacion final de la instalacion'],
      keywordsTitle: 'Servicios de reparacion de averias',
      keywordTags: ['averia electrica valencia', 'reparacion averia electrica', 'fallo electrico', 'saltan los plomos', 'no hay luz en casa'],
    },
    faqs: [
      {
        question: '¿Qué hago si no hay luz en casa?',
        answer: 'Comprueba si el corte afecta solo a tu vivienda y revisa el cuadro sin forzar interruptores. Si vuelve a saltar, llama a un electricista para diagnosticar la averia.',
      },
      {
        question: '¿Por qué saltan los plomos continuamente?',
        answer: 'Puede haber sobrecarga, cortocircuito, fuga de corriente o un aparato defectuoso. Hay que revisar circuitos y cuadro para localizar la causa.',
      },
      {
        question: '¿Cuánto cuestá reparar una avería eléctrica?',
        answer: 'Depende del tipo de fallo, tiempo de diagnostico y materiales. Damos presupuesto claro tras revisar la averia.',
      },
      {
        question: '¿Podéis reparar fallos eléctricos intermitentes?',
        answer: 'Si. Los fallos intermitentes suelen requerir mediciones y revision por zonas para encontrar cables, conexiones o mecanismos defectuosos.',
      },
      {
        question: '¿Una avería eléctrica puede ser peligrosa?',
        answer: 'Si hay olor a quemado, chispas, calor en enchufes o cortes repetidos, conviene dejar de usar la zona afectada y pedir revision profesional.',
      },
    ],
  },

  'pequenos-trabajos-electricos': {
    h1: 'Pequenos Trabajos Electricos en Valencia',
    metaTitle: 'Pequenos Trabajos Electricos Valencia | Electricista',
    metaDescription: 'Pequenos trabajos electricos en Valencia: cambiar lamparas, bombillas, timbres, puntos de luz y arreglos electricos con presupuesto claro.',
    lockedPrimaryKw: 'pequenos trabajos electricos',
    secondaryKw: ['cambiar lampara', 'instalar lampara', 'cambiar bombilla', 'sustituir bombilla', 'reparacion timbre', 'pequenos arreglos electricos'],
    seoBlockKw: ['pequenos trabajos electricos valencia', 'cambiar lampara', 'instalar lampara', 'cambiar bombilla', 'reparacion timbre'],
    faqKw: ['pequenos trabajos electricos', 'cambiar lampara', 'instalar lampara', 'cambiar bombilla', 'reparacion timbre'],
    contentBrief: 'Pequenos trabajos electricos en Valencia para lamparas, bombillas, timbres, puntos de luz y arreglos electricos sencillos.',
    description: 'Realizamos pequenos trabajos electricos en Valencia con presupuesto claro y montaje seguro.',
    seoContent: {
      badge: 'Pequenos trabajos electricos',
      title: 'Pequenos trabajos electricos en Valencia',
      intro: [
        'No todos los problemas electricos requieren una reforma completa. Realizamos pequenos trabajos electricos en Valencia para viviendas, locales y comunidades cuando necesitas resolver cambios, montajes o arreglos concretos con seguridad.',
        'Atendemos cambiar lampara, instalar lampara, cambiar lampara techo, instalar lampara techo, cambiar bombilla, sustituir bombilla y cambiar bombilla empotrada cuando el acceso, la fijacion o el cableado hacen que el trabajo no sea tan simple como parece.',
        'Tambien hacemos cambiar cable lampara, cambiar casquillo lampara, reparacion timbre, instalar punto de luz pequeno y pequenos arreglos electricos que conviene dejar en manos de un electricista para pequenas reparaciones.',
        'Antes de intervenir revisamos el punto afectado, comprobamos tension y estado del cableado, explicamos la solucion y damos un presupuesto claro. El objetivo es resolver el trabajo sin improvisaciones y dejar la instalacion lista para uso diario.',
      ],
      serviceCards: [
        {
          icon: Lightbulb,
          title: 'Lamparas y puntos de luz',
          color: 'orange' as const,
          bullets: ['Cambiar lampara', 'Instalar lampara', 'Puntos de luz', 'Conexiones seguras'],
        },
        {
          icon: Wrench,
          title: 'Arreglos electricos pequenos',
          color: 'blue' as const,
          bullets: ['Reparacion de timbre', 'Cableado simple', 'Casquillos', 'Mecanismos basicos'],
        },
        {
          icon: ShieldAlert,
          title: 'Revision antes de montar',
          color: 'green' as const,
          bullets: ['Comprobacion de tension', 'Cableado revisado', 'Material adecuado', 'Trabajo con garantia'],
        },
      ],
      localCoverage: {
        title: 'Pequenos trabajos electricos en Valencia',
        description: 'Atendemos arreglos electricos pequenos en viviendas, locales, oficinas y comunidades de Valencia.',
      },
      benefitsTitle: 'Por que llamar a un electricista para trabajos pequenos',
      benefits: ['Evita conexiones inseguras', 'Ahorra tiempo en montajes delicados', 'Detecta cableado deteriorado', 'Presupuesto antes de empezar', 'Garantia sobre el trabajo realizado'],
      keywordsTitle: 'Servicios de pequenos trabajos electricos',
      keywordTags: ['pequenos trabajos electricos valencia', 'cambiar lampara', 'instalar lampara', 'cambiar bombilla', 'reparacion timbre'],
    },
    faqs: [
      {
        question: '¿Qué se considera un pequeno trabajo eléctrico?',
        answer: 'Son tareas concretas como cambiar una lampara, instalar un punto de luz, revisar un timbre, sustituir una bombilla especial o resolver un arreglo electrico sencillo.',
      },
      {
        question: '¿Cuánto cuestá un pequeno trabajo eléctrico?',
        answer: 'Depende del tipo de trabajo, acceso al punto electrico, estado del cableado y materiales necesarios. Revisamos el caso y damos presupuesto antes de empezar.',
      },
      {
        question: '¿Podéis cambiar una lampara de techo?',
        answer: 'Si. Podemos cambiar lampara techo o instalar lampara techo revisando fijacion, peso, cableado, clemas y conexion para que quede segura.',
      },
      {
        question: '¿Reparais timbres y pequenos mecanismos?',
        answer: 'Si. Podemos hacer reparacion timbre, revisar pulsadores, cableado sencillo, cambiar casquillo lampara y mecanismos basicos cuando el fallo pertenece a la instalacion electrica.',
      },
      {
        question: '¿Cambiais bombillas empotradas o especiales?',
        answer: 'Si. Para cambiar bombilla empotrada o sustituir bombilla en zonas de dificil acceso comprobamos el portalamparas, temperatura, falso contacto y estado del punto de luz.',
      },
      {
        question: '¿Podéis cambiar el cable de una lampara?',
        answer: 'Si. Cambiar cable lampara requiere revisar seccion, aislamiento, casquillo, conexion y sujecion para evitar falsos contactos o calentamientos.',
      },
      {
        question: '¿Instalais puntos de luz pequenos?',
        answer: 'Si. Podemos instalar punto de luz pequeno si hay una ruta segura de cableado y el circuito permite alimentar ese nuevo punto sin sobrecarga.',
      },
      {
        question: '¿Cuándo conviene llamar a un electricista para algo pequeno?',
        answer: 'Conviene llamar si hay cables antiguos, chispas, falso contacto, falta de tension, dudas de conexion o si el punto esta en techo, exterior o zona dificil.',
      },
    ],
  },

  'cargador-coche-electrico': {
    h1: 'Cargador Coche Electrico en Valencia',
    metaTitle: 'Cargador Coche Electrico Valencia | Instalacion Wallbox',
    metaDescription: 'Instalacion de cargador de coche electrico en Valencia. Wallbox, punto de recarga en vivienda, garaje y comunidad con presupuesto claro.',
    lockedPrimaryKw: 'cargador coche electrico',
    secondaryKw: ['instalacion punto recarga', 'instalacion wallbox', 'punto de recarga coche electrico', 'cargador vehiculo electrico', 'instalar cargador coche electrico', 'instalar cargador coche electrico en casa', 'instalar punto de recarga en casa', 'instalar wallbox en casa'],
    seoBlockKw: ['punto de recarga en valencia', 'instalacion punto recarga', 'instalacion wallbox', 'punto de recarga coche electrico', 'instalar cargador coche electrico en casa', 'instalar punto recarga coche electrico casa'],
    faqKw: ['cargador coche electrico', 'instalacion wallbox', 'punto de recarga coche electrico', 'garaje comunitario'],
    contentBrief: 'Instalacion de cargador de coche electrico en Valencia para viviendas, garajes privados y comunidades.',
    description: 'Instalamos cargadores de coche electrico y puntos de recarga en Valencia con estudio previo, montaje seguro y presupuesto claro.',
    seoContent: {
      badge: 'Punto de recarga',
      title: 'Instalacion de cargador de coche electrico en Valencia',
      intro: [
        'Instalar un punto de recarga en casa o en un garaje comunitario requiere revisar potencia disponible, protecciones, recorrido del cableado y tipo de equipo. Realizamos instalacion punto recarga en Valencia con planteamiento seguro desde el primer paso.',
        'Trabajamos con instalacion wallbox, cargador vehiculo electrico, punto de recarga coche electrico vivienda e instalar punto de recarga en casa cuando el usuario quiere cargar a diario sin depender de cargadores publicos. Antes de montar, comprobamos cuadro electrico, distancia al punto de carga y necesidades reales del vehiculo para evitar sobrecostes o una instalacion insuficiente.',
        'Tambien valoramos instalar wallbox en casa, instalar wallbox en garaje, instalacion cargador coche electrico comunidad e instalar cargador coche electrico cuando el cliente ya tiene equipo comprado. Un electricista especializado en recarga debe dimensionar cableado, protecciones y carga para uso diario.',
        'Te explicamos la solucion recomendada, materiales, protecciones y presupuesto antes de empezar. El objetivo es dejar un punto de recarga comodo, protegido y preparado para uso diario.',
      ],
      serviceCards: [
        {
          icon: Power,
          title: 'Instalacion de wallbox',
          color: 'blue' as const,
          bullets: ['Cargador mural', 'Protecciones electricas', 'Cableado seguro', 'Pruebas finales'],
        },
        {
          icon: Cable,
          title: 'Punto de recarga en garaje',
          color: 'green' as const,
          bullets: ['Garaje privado', 'Garaje comunitario', 'Recorrido de cable', 'Cuadro revisado'],
        },
        {
          icon: ShieldAlert,
          title: 'Instalacion protegida',
          color: 'orange' as const,
          bullets: ['Diferencial adecuado', 'Magnetotermico', 'Material homologado', 'Trabajo con garantia'],
        },
      ],
      localCoverage: {
        title: 'Cargador de coche electrico en Valencia',
        description: 'Instalamos puntos de recarga para vehiculo electrico en viviendas, garajes, locales y comunidades de Valencia.',
      },
      benefitsTitle: 'Por que instalar el cargador con un electricista',
      benefits: ['Revision de potencia disponible', 'Protecciones adecuadas', 'Cableado dimensionado', 'Presupuesto antes de empezar', 'Instalacion preparada para uso diario'],
      keywordsTitle: 'Servicios de recarga para vehiculo electrico',
      keywordTags: ['punto de recarga en valencia', 'instalacion punto recarga', 'instalacion wallbox', 'punto de recarga coche electrico', 'instalar cargador coche electrico en casa', 'instalar punto de recarga en casa', 'instalar wallbox en casa'],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá instalar un cargador de coche eléctrico?',
        answer: 'Depende de la distancia al cuadro, potencia disponible, tipo de cargador, protecciones y si la plaza esta en vivienda o garaje comunitario. Revisamos el caso y damos presupuesto claro.',
      },
      {
        question: '¿Puedo instalar un wallbox en un garaje comunitario?',
        answer: 'Si, normalmente se puede instalar wallbox en garaje comunitario, pero hay que estudiar recorrido del cableado, contador, protecciones y condiciones de la comunidad antes de instalar.',
      },
      {
        question: '¿Qué se revisa antes de instalar un punto de recarga en casa?',
        answer: 'Revisamos potencia contratada, cuadro electrico, distancia hasta la plaza, canalizacion, protecciones y tipo de cargador. Asi evitamos una instalacion lenta, insegura o insuficiente para el uso diario.',
      },
      {
        question: '¿Qué potencia necesita un punto de recarga?',
        answer: 'Depende del vehiculo, uso diario y potencia contratada. Podemos valorar una instalacion ajustada a tus necesidades para cargar con seguridad sin sobredimensionar.',
      },
      {
        question: '¿Cuánto tarda instalar un cargador eléctrico?',
        answer: 'Una instalacion sencilla puede resolverse en una jornada. Si hay mucho recorrido de cable, obra auxiliar o garaje comunitario, puede requerir mas planificacion.',
      },
      {
        question: '¿Instalais cargadores que ya ha comprado el cliente?',
        answer: 'Podemos revisar el equipo y confirmar si es adecuado para la instalacion. Si falta algun elemento de proteccion, cableado o configuracion para cargador vehiculo electrico, lo incluimos en el presupuesto.',
      },
      {
        question: '¿Instalais puntos de recarga en viviendas?',
        answer: 'Si. Un punto de recarga coche electrico vivienda se planifica revisando potencia contratada, cuadro, distancia al aparcamiento, protecciones y uso diario del vehiculo.',
      },
      {
        question: '¿Hacéis instalaciónes para comunidades?',
        answer: 'Si. En una instalacion para comunidad revisamos recorrido comun, contador, plaza, canalizacion, protecciones y requisitos de comunicacion con la comunidad.',
      },
    ],
  },

  'domotica': {
    h1: 'Domotica en Valencia',
    metaTitle: 'Domotica Valencia | Instaladores Smart Home',
    metaDescription: 'Domotica en Valencia para viviendas y locales: instalacion, reparacion, persianas, sensores, iluminacion y control inteligente.',
    lockedPrimaryKw: 'domotica valencia',
    secondaryKw: ['domotica en valencia', 'instaladores de domotica en valencia', 'reparacion domotica valencia', 'domotica vivienda', 'convertir casa en domotica'],
    seoBlockKw: ['domotica valencia', 'domotica en valencia', 'instaladores de domotica en valencia', 'persianas domotica', 'sensores domotica'],
    faqKw: ['domotica valencia', 'domotica vivienda', 'convertir casa en domotica', 'reparacion domotica valencia'],
    contentBrief: 'Domotica en Valencia para automatizar iluminacion, persianas, sensores, cortinas, multimedia y control electrico de hogares y negocios.',
    description: 'Instalamos y reparamos domotica valencia para hogares, oficinas y pequenos negocios con presupuesto claro.',
    seoContent: {
      badge: 'Smart home',
      title: 'Domotica en Valencia para viviendas y locales',
      intro: [
        'La domotica permite controlar iluminacion, persianas, sensores, cortinas, escenas y sistemas multimedia desde mandos, pulsadores o aplicaciones. Realizamos instalaciones de domotica en Valencia para viviendas y locales que necesitan mas comodidad, seguridad y control electrico.',
        'Antes de convertir casa en domotica revisamos el cuadro, cableado, puntos de luz, persianas, mecanismos y necesidades reales de uso. Asi evitamos montar equipos incompatibles o automatizaciones que luego no encajan con la instalacion existente.',
        'Tambien atendemos reparacion domotica valencia cuando fallan sensores, persianas automatizadas, controles de iluminacion o escenas programadas. Diagnosticamos el sistema, explicamos la causa y damos presupuesto antes de intervenir.',
        'Integramos electricidad y domotica en valencia para domotica vivienda, domotica para hogares, proyectos e instalaciones domotica y electronica, y soluciones como domotica audio video area valencia cuando el cliente quiere unir control electrico, confort y multimedia.',
      ],
      serviceCards: [
        {
          icon: Lightbulb,
          title: 'Iluminacion y escenas',
          color: 'blue' as const,
          bullets: ['Luces inteligentes', 'Bombillas domotica', 'Escenas de uso', 'Control por zonas'],
        },
        {
          icon: Power,
          title: 'Persianas y cortinas',
          color: 'green' as const,
          bullets: ['Persianas domotica', 'Domotica para cortinas', 'Motores revisados', 'Mandos y pulsadores'],
        },
        {
          icon: Cable,
          title: 'Sensores y control',
          color: 'orange' as const,
          bullets: ['Sensores domotica', 'Cableado y conexion', 'Multimedia domotica', 'Pruebas finales'],
        },
      ],
      localCoverage: {
        title: 'Instaladores de domotica en Valencia',
        description: 'Trabajamos domotica en viviendas, locales, oficinas y comunidades de Valencia con revision previa de la instalacion electrica.',
      },
      benefitsTitle: 'Por que instalar domotica con un electricista',
      benefits: ['Compatibilidad con la instalacion existente', 'Cableado y protecciones revisadas', 'Automatizaciones utiles para el dia a dia', 'Presupuesto claro antes de montar', 'Reparacion y ajustes del sistema'],
      keywordsTitle: 'Servicios de domotica',
      keywordTags: ['domotica valencia', 'domotica en valencia', 'instaladores de domotica en valencia', 'persianas domotica', 'sensores domotica'],
    },
    faqs: [
      {
        question: '¿Qué incluye una instalación de domotica en Valencia?',
        answer: 'Puede incluir control de iluminacion, persianas, cortinas, sensores, escenas, multimedia y automatizacion de zonas. Revisamos la vivienda y proponemos una solucion ajustada al uso real.',
      },
      {
        question: '¿Cuánto cuestá convertir una casa en domotica?',
        answer: 'Depende del numero de puntos a automatizar, cableado existente, tipo de mecanismos, sensores y nivel de control que necesitas. Damos presupuesto despues de revisar la instalacion.',
      },
      {
        question: '¿Hacéis reparación domotica en Valencia?',
        answer: 'Si. Revisamos fallos en sensores, persianas, mandos, pulsadores, iluminacion automatizada y sistemas que han dejado de responder correctamente.',
      },
      {
        question: '¿Se puede instalar domotica en una vivienda ya terminada?',
        answer: 'Normalmente si, aunque hay que valorar cableado, espacio en cajas, cuadro electrico y compatibilidad de mecanismos. Buscamos la opcion menos invasiva posible.',
      },
      {
        question: '¿Qué diferencia hay entre domotica y una instalación eléctrica normal?',
        answer: 'La instalacion electrica alimenta los circuitos. La domotica anade control, automatizacion y comunicacion entre elementos como luces, persianas, sensores y escenas.',
      },
    ],
  },

  'mantenimiento-electrico': {
    h1: 'Mantenimiento Electrico en Valencia',
    metaTitle: 'Mantenimiento Electrico Valencia | Electricista',
    metaDescription: 'Servicio preventivo electrico en Valencia para viviendas, locales, edificios y comunidades. Revisiones periodicas, contratos y presupuesto claro.',
    lockedPrimaryKw: 'mantenimiento electrico',
    secondaryKw: ['contratos de mantenimiento electrico', 'mantenimiento electrico comunidades', 'mantenimiento electrico de edificios', 'mantenimiento sistema electrico', 'empresas mantenimiento electrico'],
    seoBlockKw: ['mantenimiento electrico valencia', 'contratos de mantenimiento electrico', 'mantenimiento electrico comunidades', 'mantenimiento electrico de edificios', 'mantenimiento sistema electrico'],
    faqKw: ['mantenimiento electrico', 'contratos de mantenimiento electrico', 'mantenimiento electrico comunidades', 'precio contrato mantenimiento electrico'],
    contentBrief: 'Servicio preventivo electrico en Valencia para revisar instalaciones, prevenir averias, ordenar contratos periodicos y cuidar sistemas electricos de viviendas, locales, edificios y comunidades.',
    description: 'Organizamos mantenimiento electrico en Valencia con revisiones periodicas, diagnostico preventivo y presupuesto claro para viviendas, locales y comunidades.',
    seoContent: {
      badge: 'Mantenimiento electrico',
      title: 'Servicio preventivo electrico en Valencia para evitar averias',
      intro: [
        'Una revision preventiva ayuda a detectar conexiones flojas, consumos anormales, protecciones deterioradas y puntos de riesgo antes de que aparezcan cortes de luz o averias costosas. Atendemos mantenimiento electrico en Valencia para viviendas, locales, edificios y comunidades.',
        'Podemos organizar revisiones puntuales o contratos de mantenimiento electrico segun el uso de la instalacion. Comprobamos cuadro, circuitos, enchufes, puntos de luz, diferenciales, mantenimiento electrico comunidades, comunidades de vecinos y mantenimiento electrico de edificios.',
        'Tambien damos soporte a mantenimiento sistema electrico, empresas mantenimiento electrico, hoteles, mantenimiento predictivo y gestion de revisiones cuando se necesita controlar incidencias, prioridades y visitas periodicas.',
        'Cada visita se realiza con diagnostico claro, explicacion de prioridades y presupuesto antes de corregir cualquier incidencia. No mezclamos este servicio con boletines o certificados: aqui el foco es conservar la instalacion segura, funcional y preparada para el uso diario.',
      ],
      serviceCards: [
        {
          icon: ShieldAlert,
          title: 'Revision preventiva',
          color: 'blue' as const,
          bullets: ['Protecciones revisadas', 'Conexiones comprobadas', 'Puntos calientes', 'Riesgos detectados'],
        },
        {
          icon: Wrench,
          title: 'Contratos de mantenimiento',
          color: 'green' as const,
          bullets: ['Visitas periodicas', 'Prioridades claras', 'Historial de incidencias', 'Presupuesto previo'],
        },
        {
          icon: Cable,
          title: 'Comunidades y locales',
          color: 'orange' as const,
          bullets: ['Zonas comunes', 'Locales comerciales', 'Edificios', 'Sistemas electricos'],
        },
      ],
      localCoverage: {
        title: 'Servicio preventivo electrico en Valencia',
        description: 'Revisamos instalaciones electricas en viviendas, locales, edificios, hoteles pequenos y comunidades de vecinos de Valencia.',
      },
      benefitsTitle: 'Por que hacer revisiones periodicas',
      benefits: ['Reduce averias inesperadas', 'Detecta deterioro antes del fallo', 'Ayuda a planificar reparaciones', 'Mejora la seguridad de la instalacion', 'Facilita presupuestos y prioridades'],
      keywordsTitle: 'Servicios preventivos electricos',
      keywordTags: ['mantenimiento electrico valencia', 'contratos de mantenimiento electrico', 'mantenimiento electrico comunidades', 'mantenimiento electrico de edificios', 'mantenimiento sistema electrico'],
    },
    faqs: [
      {
        question: '¿Qué incluye una revisión preventiva?',
        answer: 'Puede incluir revision del cuadro, diferenciales, magnetotermicos, enchufes, puntos de luz, conexiones, zonas comunes y comprobacion de fallos repetidos en la instalacion.',
      },
      {
        question: '¿Cuánto cuestá un contrato de mantenimiento eléctrico?',
        answer: 'El precio del contrato depende del tipo de inmueble, numero de revisiones, tamano de la instalacion y nivel de respuesta necesario. Primero revisamos el caso y planteamos un presupuesto claro.',
      },
      {
        question: '¿Hacéis revisiónes eléctricas en comunidades?',
        answer: 'Si. Hacemos seguimiento para comunidades y comunidades de vecinos revisando zonas comunes, iluminacion, cuadros secundarios, mecanismos y averias recurrentes.',
      },
      {
        question: '¿Trabajáis con edificios y hoteles?',
        answer: 'Si. El seguimiento de edificios y hoteles requiere revisar zonas comunes, cuadros, iluminacion, consumos, incidencias repetidas y prioridades de seguridad.',
      },
      {
        question: '¿Qué es una revisión predictiva?',
        answer: 'La revision predictiva busca detectar sintomas antes del fallo: calentamientos, conexiones flojas, consumos raros, protecciones fatigadas y puntos con riesgo de averia.',
      },
      {
        question: '¿Podéis encargarse de la gestion de revisiónes?',
        answer: 'Si. La gestion preventiva puede incluir calendario de revisiones, historial de incidencias, prioridades, presupuestos y seguimiento de reparaciones.',
      },
      {
        question: '¿Cada cuánto conviene revisar una instalación eléctrica?',
        answer: 'Depende del uso y antiguedad. Una vivienda puede requerir revisiones puntuales, mientras que locales, comunidades o edificios con uso intenso suelen necesitar seguimiento periodico.',
      },
      {
        question: '¿Este servicio incluye boletines o certificados?',
        answer: 'No en esta pagina. Los boletines y certificados pertenecen a otra categoria futura. Este servicio se centra en revisiones, prevencion de averias y conservacion de la instalacion.',
      },
    ],
  },

  'revision-electrica': {
    h1: 'Revision de Instalacion Electrica en Valencia',
    metaTitle: 'Revision Instalacion Electrica Valencia | Electricista',
    metaDescription: 'Revision electrica en Valencia para viviendas, locales, comunidades y empresas. Comprobamos cuadro, cableado, enchufes y protecciones.',
    lockedPrimaryKw: 'revision electrica',
    secondaryKw: ['revision electrica', 'revision periodica electrica', 'revision electrica domiciliaria', 'revision electrica empresa', 'revision electrica edificios'],
    seoBlockKw: ['revision instalacion electrica', 'revision electrica valencia', 'revision periodica electrica', 'revision electrica domiciliaria', 'precio revision instalacion electrica'],
    faqKw: ['revision electrica', 'revision instalacion electrica', 'revision electrica domiciliaria', 'presupuesto revision instalacion electrica'],
    contentBrief: 'Revision electrica en Valencia para comprobar cuadros, protecciones, enchufes, cableado, puntos de luz y posibles riesgos en viviendas, locales, edificios y comunidades.',
    description: 'Revisamos instalaciones electricas en Valencia para detectar fallos, deterioros y riesgos antes de una averia o reforma.',
    seoContent: {
      badge: 'Revision electrica',
      title: 'Revision electrica en Valencia para instalaciones seguras',
      intro: [
        'Una comprobacion tecnica permite conocer el estado real de una instalacion antes de comprar una vivienda, abrir un local, hacer una reforma o resolver fallos repetidos. Realizamos revision electrica en Valencia para viviendas, empresas, edificios, parkings y comunidades.',
        'Comprobamos revision instalacion electrica, revision periodica electrica, revision periodica instalacion electrica, revision electrica domiciliaria y revision instalacion electrica vivienda con cuadro, diferenciales, magnetotermicos, enchufes, puntos de luz, cableado visible, zonas con calentamiento y sintomas de sobrecarga.',
        'Tambien atendemos revision electrica empresa, revision electrica edificios, revision instalacion electrica comunidades, revision instalacion electrica local, revision instalacion electrica parking y baja tension cuando se necesita priorizar reparaciones o preparar una actualizacion.',
        'Este servicio no sustituye boletines, certificados ni inspecciones OCA obligatorias. La pagina se centra en revision tecnica practica para detectar riesgos, preparar presupuestos y decidir si una instalacion electrica necesita reparacion, mantenimiento o actualizacion.',
      ],
      serviceCards: [
        {
          icon: ShieldAlert,
          title: 'Comprobacion de seguridad',
          color: 'blue' as const,
          bullets: ['Cuadro electrico', 'Diferenciales', 'Magnetotermicos', 'Sobrecargas'],
        },
        {
          icon: Cable,
          title: 'Revision de instalacion',
          color: 'green' as const,
          bullets: ['Cableado visible', 'Enchufes', 'Puntos de luz', 'Zonas deterioradas'],
        },
        {
          icon: Wrench,
          title: 'Informe de prioridades',
          color: 'orange' as const,
          bullets: ['Riesgos detectados', 'Reparaciones recomendadas', 'Presupuesto claro', 'Siguiente paso'],
        },
      ],
      localCoverage: {
        title: 'Comprobacion tecnica en viviendas, locales y comunidades',
        description: 'Atendemos revision electrica domiciliaria, revision de instalaciones en locales, edificios, parkings y comunidades de Valencia.',
      },
      benefitsTitle: 'Cuando conviene pedir una comprobacion tecnica',
      benefits: ['Antes de una reforma', 'Cuando saltan protecciones', 'Si hay enchufes calientes', 'Al comprar o alquilar un inmueble', 'Para planificar reparaciones electricas'],
      keywordsTitle: 'Servicios de comprobacion electrica',
      keywordTags: ['revision electrica valencia', 'revision instalacion electrica', 'revision periodica electrica', 'revision electrica domiciliaria', 'precio revision instalacion electrica'],
    },
    faqs: [
      {
        question: '¿Qué incluye la comprobacion?',
        answer: 'Incluye comprobacion del cuadro, protecciones, enchufes, puntos de luz, cableado visible, sintomas de sobrecarga y fallos repetidos. Despues indicamos prioridades y posibles reparaciones.',
      },
      {
        question: '¿Cuánto cuestá revisar una instalación eléctrica?',
        answer: 'El precio revision instalacion electrica depende del tamano del inmueble, numero de puntos a comprobar, estado de la instalacion y si se trata de vivienda, local, parking o comunidad. Damos presupuesto revision instalacion electrica antes de empezar.',
      },
      {
        question: '¿Cuándo hacer una comprobacion domiciliaria?',
        answer: 'Conviene hacer una comprobacion domiciliaria o revision instalacion electrica vivienda si la instalacion es antigua, saltan los plomos, hay enchufes calientes, se va la luz, vas a reformar o quieres comprobar el estado electrico de una vivienda.',
      },
      {
        question: '¿Revisais locales y empresas?',
        answer: 'Si. Podemos hacer revision instalacion electrica local, revision electrica empresa, revision electrica edificios y revision instalacion electrica comunidades para detectar riesgos, averias recurrentes o necesidades de actualizacion.',
      },
      {
        question: '¿Hacéis comprobacion de parkings y baja tension?',
        answer: 'Si. La revision instalacion electrica parking y la comprobacion de baja tension se centra en cuadro, protecciones, cableado, iluminacion, puntos de consumo y riesgos visibles.',
      },
      {
        question: '¿La comprobacion incluye boletin o certificado?',
        answer: 'No. Los boletines, certificados e inspecciones OCA pertenecen a otra categoria. Esta revision sirve para diagnosticar el estado de la instalacion y orientar reparaciones o mejoras.',
      },
    ],
  },
}


