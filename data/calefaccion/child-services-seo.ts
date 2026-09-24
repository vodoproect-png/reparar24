import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Flame, Gauge, Search, ShieldCheck, Thermometer, Wrench } from 'lucide-react'

export interface CalefaccionChildServiceData {
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

export const calefaccionChildServicesData: Record<string, CalefaccionChildServiceData> = {
  'reparacion-calderas': {
    h1: 'Reparacion de Calderas',
    metaTitle: 'Reparacion de Calderas | Tecnico Caldera | Reparar24',
    metaDescription: 'Reparacion de calderas de gas con diagnostico, presupuesto previo y tecnico profesional para averias, presion baja o caldera que no enciende.',
    lockedPrimaryKw: 'reparacion calderas',
    secondaryKw: ['tecnico caldera', 'servicio tecnico calderas', 'reparacion caldera gas', 'caldera no enciende'],
    seoBlockKw: ['reparacion calderas', 'tecnico caldera', 'servicio tecnico calderas', 'reparacion caldera gas'],
    faqKw: ['caldera no enciende', 'caldera pierde agua', 'caldera baja presion'],
    contentBrief: 'Pagina comercial para averias de caldera y servicio tecnico. Separada de mantenimiento, instalacion y consultas informativas.',
    description: 'Diagnosticamos y reparamos calderas que no encienden, pierden presion, gotean, hacen ruido o muestran errores.',
    seoContent: {
      badge: 'Servicio tecnico',
      title: 'Reparacion de Calderas con Diagnostico y Presupuesto Previo',
      intro: [
        'La reparacion de calderas exige diagnostico antes de cambiar piezas. Una caldera que no enciende, pierde agua, baja de presion o hace ruido puede fallar por vaso de expansion, valvula de seguridad, bomba, sonda, placa, intercambiador, falta de gas o problema de evacuacion. Esta pagina trabaja la intencion comercial de reparacion calderas, tecnico caldera, servicio tecnico calderas y reparacion caldera gas sin mezclarla con guias de mantenimiento ni comparativas de marcas.',
        'Antes de intervenir revisamos el sintoma, codigo de error si existe, presion del circuito, estanqueidad, encendido, salida de humos, respuesta del termostato y estado de conexiones. Si la averia requiere pieza, explicamos el motivo, el coste aproximado y si compensa reparar segun antiguedad y estado del equipo. No forzamos una reparacion cuando la caldera esta al final de su vida util.',
        'Atendemos viviendas, locales y comunidades con calderas individuales o sistemas de calefaccion vinculados a radiadores. El presupuesto se confirma antes de actuar y la prueba final comprueba calefaccion, agua caliente cuando aplica, presion estable y ausencia de fugas visibles. El objetivo es recuperar el servicio con seguridad, claridad y garantia.'
      ],
      serviceCards: [
        { icon: Search, title: 'Diagnostico', color: 'blue', bullets: ['No enciende', 'Error pantalla', 'Presion baja', 'Ruidos'] },
        { icon: Wrench, title: 'Reparacion', color: 'orange', bullets: ['Bomba', 'Valvulas', 'Sondas', 'Placa si procede'] },
        { icon: ShieldCheck, title: 'Seguridad', color: 'green', bullets: ['Presupuesto previo', 'Prueba final', 'Factura', 'Garantia'] },
      ],
      localCoverage: { title: 'Reparacion de calderas en Valencia', description: 'Servicio tecnico para vivienda, local y comunidad segun disponibilidad de zona.' },
      benefitsTitle: 'Que revisamos',
      benefits: ['Presion del circuito', 'Encendido y codigos de error', 'Fugas y valvulas', 'Viabilidad de reparar'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['reparacion calderas', 'tecnico caldera', 'servicio tecnico calderas', 'reparacion caldera gas'],
    },
    faqs: [
      { question: '¿Qué hago si la caldera no enciende?', answer: 'Comprueba presion, gas, corriente y termostato. Si sigue sin arrancar o muestra error, conviene llamar a un tecnico para evitar danos mayores.' },
      { question: '¿Por qué baja la presión de la caldera?', answer: 'Puede haber fuga en radiadores, valvulas, vaso de expansion o circuito. Si baja a menudo, hay que localizar la causa.' },
      { question: '¿Cuánto cuestá reparar una caldera?', answer: 'Depende de la averia y de si requiere pieza. Primero diagnosticamos y damos presupuesto antes de reparar.' },
    ],
  },
  'mantenimiento-calderas': {
    h1: 'Mantenimiento y Revision de Calderas',
    metaTitle: 'Mantenimiento de Calderas | Revision Caldera Gas | Reparar24',
    metaDescription: 'Mantenimiento de calderas y revision de caldera de gas con limpieza, comprobaciones de seguridad, presupuesto previo y certificado si procede.',
    lockedPrimaryKw: 'mantenimiento caldera',
    secondaryKw: ['revision caldera gas', 'mantenimiento de calderas', 'revision calefaccion', 'puesta a punto calefaccion'],
    seoBlockKw: ['mantenimiento caldera', 'revision caldera gas', 'mantenimiento de calderas', 'revision calefaccion'],
    faqKw: ['cada cuanto revisar caldera', 'mantenimiento caldera obligatorio', 'precio mantenimiento caldera'],
    contentBrief: 'Pagina para mantenimiento, revision y puesta a punto. La informacional amplia queda para blog.',
    description: 'Realizamos mantenimiento y revision de calderas: limpieza, presiones, seguridad, combustion y funcionamiento.',
    seoContent: {
      badge: 'Revision preventiva',
      title: 'Mantenimiento de Calderas para Evitar Averias en Invierno',
      intro: [
        'El mantenimiento de calderas reduce averias, mejora el rendimiento y ayuda a detectar problemas antes de que la calefaccion falle en pleno invierno. La semantica de esta pagina se centra en mantenimiento caldera, revision caldera gas, mantenimiento de calderas y revision calefaccion. Dejamos las dudas normativas extensas y las guias de bricolaje para el futuro blog, manteniendo aqui una respuesta comercial clara.',
        'Durante la visita revisamos presion del circuito, estanqueidad visible, quemador, ventilacion, salida de humos, valvulas, bomba, termostato y respuesta en modo calefaccion. Cuando procede, limpiamos componentes accesibles y recomendamos ajustes para mejorar consumo o estabilidad. Si detectamos una averia, la separamos del mantenimiento y la presupuestamos antes de reparar.',
        'La revision es especialmente recomendable antes de la temporada fria, en viviendas con uso intensivo, pisos alquilados, apartamentos turisticos y comunidades. Trabajamos con explicacion sencilla, factura y garantia sobre los trabajos realizados, para que el cliente sepa que se ha revisado y que queda pendiente si aparece alguna incidencia.'
      ],
      serviceCards: [
        { icon: ShieldCheck, title: 'Prevencion', color: 'green', bullets: ['Antes del invierno', 'Presion', 'Seguridad', 'Rendimiento'] },
        { icon: Search, title: 'Revision', color: 'blue', bullets: ['Caldera', 'Radiadores', 'Termostato', 'Circuito'] },
        { icon: Wrench, title: 'Plan claro', color: 'orange', bullets: ['Sin piezas ocultas', 'Informe verbal', 'Presupuesto', 'Factura'] },
      ],
      localCoverage: { title: 'Mantenimiento de calderas en Valencia', description: 'Revision para viviendas, alquileres, locales y comunidades.' },
      benefitsTitle: 'Beneficios',
      benefits: ['Menos averias en temporada fria', 'Mejor rendimiento', 'Deteccion temprana de fugas', 'Mayor seguridad de uso'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['mantenimiento caldera', 'revision caldera gas', 'mantenimiento de calderas', 'revision calefaccion'],
    },
    faqs: [
      { question: '¿Cada cuánto revisar una caldera?', answer: 'Como norma general se recomienda revision anual o segun indicacion normativa y fabricante. Antes del invierno es el mejor momento.' },
      { question: '¿El mantenimiento incluye reparaciónes?', answer: 'Incluye revision y ajustes basicos. Si aparece una averia o pieza, se presupuesta aparte antes de actuar.' },
      { question: '¿Sirve para calderas antiguas?', answer: 'Si, aunque en equipos muy antiguos tambien valoramos si conviene reparar, mantener o plantear sustitucion.' },
    ],
  },
  'radiadores-calefaccion': {
    h1: 'Reparacion e Instalacion de Radiadores',
    metaTitle: 'Radiadores de Calefaccion | Reparacion e Instalacion',
    metaDescription: 'Reparamos radiadores que no calientan, fugas, valvulas, detentores y purgado. Instalacion de radiadores con presupuesto previo.',
    lockedPrimaryKw: 'radiadores calefaccion',
    secondaryKw: ['reparacion radiadores', 'instalacion radiadores', 'purgar radiadores', 'radiador pierde agua', 'reparar fuga radiador calefaccion', 'reparar llave radiador gotea', 'reparar un radiador que pierde agua'],
    seoBlockKw: ['radiadores calefaccion', 'reparacion radiadores', 'instalacion radiadores', 'purgar radiadores', 'reparar fuga radiador calefaccion', 'reparar llave de radiador que gotea'],
    faqKw: ['radiador no calienta', 'como purgar radiadores', 'radiador pierde agua', 'reparar fuga radiador casa'],
    contentBrief: 'Pagina para radiadores calefaccion de agua vinculados a caldera. Excluye radiadores electricos y compras de producto.',
    description: 'Reparamos radiadores que no calientan, pierden agua o necesitan purgado, valvulas, detentores o sustitucion.',
    seoContent: {
      badge: 'Radiadores de agua',
      title: 'Radiadores de Calefaccion que Calientan de Forma Regular',
      intro: [
        'Los radiadores de calefaccion concentran muchas consultas comerciales: reparacion radiadores, instalacion radiadores, purgar radiadores, radiador pierde agua y radiador no calienta. Esta pagina se enfoca en radiadores de agua conectados a caldera o calefaccion central, no en radiadores electricos, compras de producto o comparativas de tiendas, para evitar canibalizacion con contenido informativo.',
        'Un radiador frio puede deberse a aire en el circuito, valvula bloqueada, detentor mal regulado, lodo acumulado, desequilibrio hidraulico o problema de la caldera. Revisamos temperatura de entrada y retorno, purgado, presion y explicamos como purgar radiadores, llaves, estado de juntas y posibles fugas. Si hace falta reparar fuga radiador casa o reparar fuga radiador calefaccion, reparar llave de radiador que gotea, cambiar una valvula o sustituir el radiador, lo presupuestamos antes de empezar.',
        'Tambien instalamos radiadores nuevos cuando una estancia no alcanza temperatura, cuando se reforma una vivienda o cuando el equipo existente esta oxidado o mal dimensionado. Atendemos reparar fuga agua radiador calefaccion, reparar junta radiador calefaccion, reparar llave radiador gotea y reparar un radiador que pierde agua. El trabajo incluye comprobacion de conexiones, estanqueidad, purgado y prueba con el sistema funcionando para confirmar que el calor llega de forma estable.'
      ],
      serviceCards: [
        { icon: Thermometer, title: 'Calor estable', color: 'blue', bullets: ['Purgado', 'Equilibrado', 'Valvulas', 'Detentores'] },
        { icon: Wrench, title: 'Reparacion', color: 'orange', bullets: ['Fugas', 'Juntas', 'Oxido', 'Sustitucion'] },
        { icon: ShieldCheck, title: 'Garantia', color: 'green', bullets: ['Prueba con presion', 'Presupuesto', 'Factura', 'Sin sorpresas'] },
      ],
      localCoverage: { title: 'Radiadores de calefaccion en Valencia', description: 'Servicio para viviendas, comunidades y locales con sistema de agua caliente.' },
      benefitsTitle: 'Servicios habituales',
      benefits: ['Purgado de radiadores', 'Reparacion de fugas', 'Cambio de valvulas y detentores', 'Instalacion de radiadores nuevos'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['radiadores calefaccion', 'reparacion radiadores', 'instalacion radiadores', 'purgar radiadores', 'reparar fuga radiador calefaccion', 'reparar llave radiador gotea'],
    },
    faqs: [
      { question: '¿Por qué un radiador no calienta?', answer: 'Puede tener aire, valvula bloqueada, detentor mal ajustado o falta de caudal en el circuito. Revisamos antes de cambiar piezas.' },
      { question: '¿Purgais radiadores?', answer: 'Si. Purgamos y comprobamos presion para que el circuito vuelva a trabajar de forma estable.' },
      { question: '¿Qué hago si un radiador pierde agua por una llave o junta?', answer: 'Conviene cerrar la llave si es posible, proteger el suelo y no forzar la pieza. Revisamos junta, valvula, detentor y presion para decidir si basta reparar o si hay que sustituir el elemento.' },
      { question: '¿Se puede cambiar un radiador sin obra grande?', answer: 'En muchos casos si, siempre que las tomas sean compatibles. Si no, presupuestamos la adaptacion.' },
    ],
  },
  'instalacion-calefaccion': {
    h1: 'Instalacion de Calefaccion',
    metaTitle: 'Instalacion de Calefaccion | Radiadores y Calderas',
    metaDescription: 'Instalacion de calefaccion, radiadores y calderas con estudio previo, presupuesto claro, montaje profesional y prueba de funcionamiento.',
    lockedPrimaryKw: 'instalacion de calefaccion',
    secondaryKw: ['instalacion calefaccion', 'instalar calefaccion', 'instalacion caldera gas', 'instalacion radiadores', 'instalar caldera condensacion', 'instalar caldera de gas precio', 'instalar calefaccion gas natural precio'],
    seoBlockKw: ['instalacion de calefaccion', 'instalacion calefaccion', 'instalar calefaccion', 'instalacion radiadores', 'instalar caldera condensacion', 'instalar calefaccion en casa precio'],
    faqKw: ['precio instalacion calefaccion', 'presupuesto calefaccion', 'instalar caldera gas', 'instalar caldera de gas precio'],
    contentBrief: 'Pagina de montaje de sistemas de calefaccion. Separada de reparaciones y mantenimiento.',
    description: 'Instalamos sistemas de calefaccion, calderas, radiadores y circuitos con presupuesto y prueba final.',
    seoContent: {
      badge: 'Montaje profesional',
      title: 'Instalacion de Calefaccion Dimensionada para tu Vivienda',
      intro: [
        'La instalacion de calefaccion debe partir del uso real de la vivienda, metros, aislamiento, orientacion, numero de estancias y tipo de generador. Esta pagina trabaja instalacion calefaccion, instalar calefaccion, instalacion de calefaccion, instalacion radiadores e instalar calefaccion en casa precio. No se orienta a comprar calderas o radiadores, sino a contratar un montaje profesional con presupuesto previo.',
        'Antes de instalar revisamos si existe circuito, estado de tuberias, ubicacion de caldera, salida de humos, potencia necesaria, numero de radiadores, llaves de paso y posibilidad de zonificacion. En reformas o viviendas antiguas proponemos soluciones proporcionadas para no sobredimensionar ni dejar estancias frias. Si el objetivo es instalar caldera condensacion, instalar caldera de gas o instalar calefaccion gas natural, comprobamos viabilidad tecnica y coordinacion necesaria antes de presupuestar.',
        'La instalacion se entrega con prueba de funcionamiento, purgado, comprobacion de presion y explicacion de uso basica. Cuando el trabajo requiere coordinacion con gas, electricidad o albañileria, dejamos claro el alcance antes de comenzar. El objetivo es que el sistema caliente de forma regular, segura y eficiente.'
      ],
      serviceCards: [
        { icon: Search, title: 'Estudio previo', color: 'blue', bullets: ['Metros', 'Aislamiento', 'Potencia', 'Ubicacion'] },
        { icon: Wrench, title: 'Montaje', color: 'orange', bullets: ['Caldera', 'Radiadores', 'Circuito', 'Termostato'] },
        { icon: ShieldCheck, title: 'Entrega', color: 'green', bullets: ['Purgado', 'Prueba', 'Presupuesto', 'Garantia'] },
      ],
      localCoverage: { title: 'Instalacion de calefaccion en Valencia', description: 'Montaje para vivienda, local y pequenas comunidades segun viabilidad tecnica.' },
      benefitsTitle: 'Que incluye',
      benefits: ['Calculo de necesidades', 'Montaje de equipos y circuito', 'Prueba de presion y calor', 'Explicacion antes de cerrar'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['instalacion de calefaccion', 'instalacion calefaccion', 'instalar calefaccion', 'instalacion radiadores', 'instalar caldera condensacion', 'instalar calefaccion gas natural precio'],
    },
    faqs: [
      { question: '¿Cuánto cuestá instalar calefaccion?', answer: 'Depende de metros, numero de radiadores, caldera, tuberias y obra necesaria. Damos presupuesto despues de revisar.' },
      { question: '¿Qué influye en el precio de instalar una caldera de gas?', answer: 'Influyen el tipo de caldera, salida de humos, adaptacion de conexiones, radiadores, estado del circuito, accesos y legalizacion necesaria. Por eso revisamos antes de dar una cifra cerrada.' },
      { question: '¿Instalais radiadores y caldera?', answer: 'Si, podemos instalar radiadores, caldera y elementos de control, segun viabilidad y normativa.' },
      { question: '¿Hace falta obra?', answer: 'Depende de si existe circuito previo. En viviendas sin instalacion puede requerir pasos de tuberia y remates.' },
    ],
  },
  'suelo-radiante': {
    h1: 'Suelo Radiante',
    metaTitle: 'Suelo Radiante | Instalacion y Reparacion | Reparar24',
    metaDescription: 'Servicio de suelo radiante para instalacion, revision, reparacion y mantenimiento de sistemas de agua con presupuesto previo.',
    lockedPrimaryKw: 'suelo radiante',
    secondaryKw: ['instalacion suelo radiante', 'reparacion suelo radiante', 'mantenimiento suelo radiante', 'suelo radiante agua'],
    seoBlockKw: ['suelo radiante', 'instalacion suelo radiante', 'reparacion suelo radiante', 'mantenimiento suelo radiante'],
    faqKw: ['precio suelo radiante', 'suelo radiante con aerotermia', 'suelo radiante no calienta'],
    contentBrief: 'Pagina comercial para suelo radiante de agua. La comparativa ventajas/inconvenientes queda en blog.',
    description: 'Instalamos, revisamos y reparamos suelo radiante de agua, colectores, circuitos, presion y zonas frias.',
    seoContent: {
      badge: 'Calefaccion uniforme',
      title: 'Suelo Radiante con Revision Tecnica y Presupuesto Claro',
      intro: [
        'Esta pagina trabaja instalacion suelo radiante, reparacion suelo radiante, mantenimiento suelo radiante y suelo radiante agua. Nos centramos en sistemas de agua para vivienda o reforma, separando las consultas informativas sobre ventajas, inconvenientes o comparativas para el futuro blog.',
        'En una instalacion nueva revisamos aislamiento, altura disponible, colectores, circuitos, generador, regulacion por zonas y compatibilidad con caldera o aerotermia. En una averia comprobamos presion, caudal, purgado, valvulas, actuadores, termostatos y posibles zonas frias. Un sistema por suelo mal equilibrado puede consumir mas y calentar de forma irregular.',
        'El presupuesto explica si basta ajustar, purgar o revisar colectores, o si la reparacion exige una intervencion mayor. En reformas coordinamos la preparacion antes del pavimento para evitar errores caros cuando el suelo ya esta cerrado. La meta es conseguir calor uniforme, controlable y eficiente.'
      ],
      serviceCards: [
        { icon: Flame, title: 'Instalacion', color: 'orange', bullets: ['Circuitos', 'Colectores', 'Aislamiento', 'Zonas'] },
        { icon: Search, title: 'Revision', color: 'blue', bullets: ['Presion', 'Caudal', 'Termostatos', 'Actuadores'] },
        { icon: ShieldCheck, title: 'Control', color: 'green', bullets: ['Equilibrado', 'Prueba', 'Presupuesto', 'Garantia'] },
      ],
      localCoverage: { title: 'Calefaccion por suelo en Valencia', description: 'Servicio para reformas, viviendas unifamiliares y sistemas con caldera o aerotermia.' },
      benefitsTitle: 'Servicios',
      benefits: ['Instalacion de circuitos bajo pavimento', 'Revision de colectores', 'Reparacion de zonas frias', 'Mantenimiento y equilibrado'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['suelo radiante', 'instalacion suelo radiante', 'reparacion suelo radiante', 'mantenimiento suelo radiante'],
    },
    faqs: [
      { question: '¿Instalais sistemas con aerotermia?', answer: 'Si, revisamos compatibilidad, circuitos y regulacion para que el sistema trabaje a baja temperatura.' },
      { question: '¿Qué pasa si una zona no calienta?', answer: 'Puede haber aire, falta de caudal, actuador averiado, termostato mal configurado o desequilibrio. Hay que revisar colector y circuito.' },
      { question: '¿Cuánto cuestá este sistema de calefaccion?', answer: 'Depende de metros, aislamiento, colectores, generador y obra. El presupuesto se calcula tras revisar el proyecto.' },
    ],
  },
  'calefaccion-central-comunidades': {
    h1: 'Calefaccion Central para Comunidades',
    metaTitle: 'Calefaccion Central Comunidades | Mantenimiento y Reparacion',
    metaDescription: 'Servicio de calefaccion central para comunidades: mantenimiento, reparacion, sala de calderas, equilibrado y urgencias con presupuesto.',
    lockedPrimaryKw: 'calefaccion central',
    secondaryKw: ['mantenimiento calefaccion central', 'reparacion calefaccion central', 'calefaccion comunidades', 'sala calderas comunidad', 'instalar contadores individuales en calefaccion central'],
    seoBlockKw: ['calefaccion central', 'mantenimiento calefaccion central', 'reparacion calefaccion central', 'calefaccion comunidades', 'instalar contadores individuales en calefaccion central'],
    faqKw: ['calefaccion central comunidad vecinos', 'contador individual calefaccion central', 'instalar contadores individuales en calefaccion central', 'averia calefaccion comunidad'],
    contentBrief: 'Pagina B2B/comunidades para sistemas centrales. Separada de caldera individual.',
    description: 'Mantenimiento y reparacion de calefaccion central, sala de calderas, radiadores comunitarios y equilibrado.',
    seoContent: {
      badge: 'Comunidades',
      title: 'Calefaccion Central con Servicio para Comunidades de Vecinos',
      intro: [
        'Una instalacion comunitaria requiere una respuesta distinta a una caldera individual. La semantica recogida agrupa calefaccion central, mantenimiento calefaccion central, reparacion calefaccion central, calefaccion comunidades y sala calderas comunidad. Esta pagina atiende administradores, presidentes de comunidad y edificios donde una averia afecta a varios vecinos a la vez.',
        'Revisamos sala de calderas, bombas, presion, purgado, equilibrado hidraulico, radiadores frios en determinadas plantas, termostatos, valvulas y programacion. En sistemas antiguos es frecuente que algunas viviendas reciban demasiado calor y otras no alcancen temperatura. El diagnostico debe considerar recorrido, alturas, orientacion y estado de radiadores.',
        'Podemos plantear mantenimiento preventivo, reparacion puntual, mejora de regulacion, instalacion de contadores individuales en calefaccion central o actuacion urgente durante temporada fria. El presupuesto se documenta de forma clara para que pueda trasladarse a administrador o junta de propietarios. La prioridad es restablecer confort, evitar consumos excesivos y reducir incidencias repetidas.'
      ],
      serviceCards: [
        { icon: Gauge, title: 'Sistema central', color: 'blue', bullets: ['Sala calderas', 'Bombas', 'Presion', 'Circuito'] },
        { icon: Wrench, title: 'Comunidad', color: 'orange', bullets: ['Radiadores', 'Equilibrado', 'Averias', 'Mantenimiento'] },
        { icon: ShieldCheck, title: 'Gestion clara', color: 'green', bullets: ['Presupuesto', 'Factura', 'Informe', 'Garantia'] },
      ],
      localCoverage: { title: 'Sistemas centrales en Valencia', description: 'Servicio para comunidades, administradores de fincas y edificios residenciales.' },
      benefitsTitle: 'Para comunidades',
      benefits: ['Mantenimiento preventivo', 'Reparacion de averias centrales', 'Equilibrado de radiadores', 'Presupuesto para administradores'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['calefaccion central', 'mantenimiento calefaccion central', 'reparacion calefaccion central', 'calefaccion comunidades', 'instalar contadores individuales en calefaccion central'],
    },
    faqs: [
      { question: '¿Atendeis comunidades de vecinos?', answer: 'Si. Podemos coordinar presupuesto, factura e intervencion con administrador o responsable de la comunidad.' },
      { question: '¿Por qué unos pisos calientan mas que otros?', answer: 'Puede deberse a desequilibrio hidraulico, aire, valvulas, bombas o dimensionamiento. Hay que revisar el conjunto.' },
      { question: '¿Hacéis mantenimiento de sala de calderas?', answer: 'Si, segun alcance y tipo de instalacion. Revisamos necesidades antes de proponer plan.' },
      { question: '¿Instalais contadores individuales?', answer: 'Podemos valorar la instalacion o adaptacion de contadores individuales segun sala de calderas, distribucion, normativa aplicable y acuerdo de comunidad.' },
    ],
  },
  'termostatos-valvulas': {
    h1: 'Termostatos y Valvulas Termostaticas',
    metaTitle: 'Instalar Termostato Calefaccion | Valvulas Termostaticas',
    metaDescription: 'Instalacion y cambio de termostatos de calefaccion, valvulas termostaticas y regulacion por zonas con presupuesto previo.',
    lockedPrimaryKw: 'termostato calefaccion',
    secondaryKw: ['instalar termostato calefaccion', 'cambiar termostato calefaccion', 'valvulas termostaticas radiadores', 'termostato caldera'],
    seoBlockKw: ['termostato calefaccion', 'instalar termostato calefaccion', 'cambiar termostato calefaccion', 'valvulas termostaticas radiadores'],
    faqKw: ['termostato caldera no funciona', 'instalar valvulas termostaticas', 'termostato wifi caldera'],
    contentBrief: 'Pagina para control, termostatos y valvulas. Filtra marcas y producto puro.',
    description: 'Instalamos y cambiamos termostatos, valvulas termostaticas y controles para regular mejor la calefaccion.',
    seoContent: {
      badge: 'Control de temperatura',
      title: 'Termostatos y Valvulas para Regular Mejor la Calefaccion',
      intro: [
        'Un termostato de calefaccion bien instalado mejora confort y evita consumos innecesarios. Esta pagina trabaja termostato calefaccion, instalar termostato calefaccion, cambiar termostato calefaccion, termostato caldera y valvulas termostaticas radiadores. No responde a busquedas de compra o marcas concretas, sino a usuarios que necesitan instalacion, sustitucion o ajuste profesional.',
        'Antes de cambiar un termostato comprobamos compatibilidad con la caldera, cableado, ubicacion, alimentacion, contacto seco o protocolo, y si conviene un modelo simple, programable o wifi. En radiadores revisamos llaves, valvulas, detentores y posibilidad de instalar cabezales termostaticos para regular estancias de forma independiente.',
        'Tambien diagnosticamos fallos donde la calefaccion no arranca, no corta, se enciende sola o no responde al termostato. Puede ser un problema del propio dispositivo, de cableado, de configuracion o de la caldera. Damos presupuesto antes de sustituir y comprobamos el funcionamiento al terminar.'
      ],
      serviceCards: [
        { icon: Thermometer, title: 'Regulacion', color: 'blue', bullets: ['Termostato', 'Valvulas', 'Zonas', 'Programacion'] },
        { icon: Search, title: 'Compatibilidad', color: 'green', bullets: ['Caldera', 'Cableado', 'Wifi', 'Radiadores'] },
        { icon: Wrench, title: 'Instalacion', color: 'orange', bullets: ['Cambio', 'Ajuste', 'Prueba', 'Explicacion'] },
      ],
      localCoverage: { title: 'Termostatos de calefaccion en Valencia', description: 'Instalacion y cambio para viviendas, locales y sistemas con radiadores.' },
      benefitsTitle: 'Que hacemos',
      benefits: ['Instalar termostato de calefaccion', 'Cambiar termostato de caldera', 'Valvulas termostaticas en radiadores', 'Diagnostico de fallos de control'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['termostato calefaccion', 'instalar termostato calefaccion', 'cambiar termostato calefaccion', 'valvulas termostaticas radiadores'],
    },
    faqs: [
      { question: '¿Puedo instalar un termostato wifi?', answer: 'Si es compatible con la caldera y el cableado. Revisamos antes de instalar para evitar fallos.' },
      { question: '¿Para que sirven las valvulas termostaticas?', answer: 'Permiten regular cada radiador o estancia y ayudan a evitar exceso de calor en zonas concretas.' },
      { question: '¿Por qué la calefaccion no responde al termostato?', answer: 'Puede ser cableado, configuracion, pilas, rele, ubicacion o fallo de caldera. Se diagnostica antes de cambiar.' },
    ],
  },
  'aerotermia-calefaccion': {
    h1: 'Aerotermia para Calefaccion',
    metaTitle: 'Aerotermia Calefaccion | Instalacion y Revision',
    metaDescription: 'Aerotermia para calefaccion, radiadores y suelo radiante. Instalacion, revision y presupuesto previo para viviendas eficientes.',
    lockedPrimaryKw: 'calefaccion aerotermia',
    secondaryKw: ['aerotermia calefaccion', 'aerotermia instalacion', 'bomba de calor calefaccion', 'aerotermia con radiadores'],
    seoBlockKw: ['calefaccion aerotermia', 'aerotermia calefaccion', 'aerotermia instalacion', 'bomba de calor calefaccion'],
    faqKw: ['aerotermia con radiadores', 'aerotermia suelo radiante', 'instalacion aerotermia vivienda'],
    contentBrief: 'Pagina comercial para aerotermia aplicada a calefaccion. Evita canibalizar aire acondicionado bomba-calor.',
    description: 'Asesoramos, instalamos y revisamos aerotermia para calefaccion, radiadores, suelo radiante y ACS segun vivienda.',
    seoContent: {
      badge: 'Calefaccion eficiente',
      title: 'Aerotermia para Calefaccion con Estudio Previo',
      intro: [
        'La aerotermia para calefaccion merece pagina propia porque el usuario busca una solucion completa, no solo reparar un split o instalar aire acondicionado. Esta URL trabaja calefaccion aerotermia, aerotermia calefaccion, aerotermia instalacion y bomba de calor calefaccion, manteniendo la frontera con la categoria de aire acondicionado: aqui el foco es calefaccion, radiadores, suelo radiante y ACS.',
        'Antes de proponer aerotermia revisamos aislamiento, potencia necesaria, emisores existentes, temperatura de impulsion, espacio para unidad exterior, acumulador, compatibilidad con radiadores o suelo radiante y necesidades de agua caliente. En viviendas antiguas puede ser necesario mejorar emisores o aislamiento para que el sistema sea realmente eficiente.',
        'El presupuesto se prepara con alcance claro: equipo, instalacion, adaptaciones hidraulicas, control, puesta en marcha y recomendaciones de uso. Tambien revisamos sistemas existentes cuando no alcanzan temperatura, consumen demasiado o no coordinan bien con termostatos y zonas. El objetivo es una calefaccion eficiente, no una promesa generica.'
      ],
      serviceCards: [
        { icon: Flame, title: 'Sistema completo', color: 'orange', bullets: ['Bomba calor', 'ACS', 'Radiadores', 'Suelo radiante'] },
        { icon: Search, title: 'Estudio', color: 'blue', bullets: ['Aislamiento', 'Potencia', 'Emisores', 'Ubicacion'] },
        { icon: ShieldCheck, title: 'Eficiencia', color: 'green', bullets: ['Presupuesto', 'Puesta en marcha', 'Control', 'Garantia'] },
      ],
      localCoverage: { title: 'Aerotermia para calefaccion en Valencia', description: 'Servicio para viviendas, reformas y sistemas de baja temperatura.' },
      benefitsTitle: 'Cuando encaja',
      benefits: ['Reforma energetica', 'Suelo radiante', 'Radiadores adecuados', 'Vivienda bien aislada'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['calefaccion aerotermia', 'aerotermia calefaccion', 'aerotermia instalacion', 'bomba de calor calefaccion'],
    },
    faqs: [
      { question: '¿La aerotermia funciona con radiadores?', answer: 'Puede funcionar si los radiadores y la vivienda permiten trabajar a temperaturas adecuadas. Hay que revisar antes de decidir.' },
      { question: '¿Es mejor con suelo radiante?', answer: 'Normalmente si, porque el suelo radiante trabaja a baja temperatura y aprovecha mejor la eficiencia de la aerotermia.' },
      { question: '¿Cuánto cuestá instalar aerotermia?', answer: 'Depende de potencia, acumulador, emisores, obra y adaptaciones. Requiere estudio previo y presupuesto personalizado.' },
    ],
  },
}


