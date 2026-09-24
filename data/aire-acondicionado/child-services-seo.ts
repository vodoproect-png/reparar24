import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Fan, Flame, Gauge, Search, ShieldCheck, Wrench } from 'lucide-react'

export interface AireAcondicionadoChildServiceData {
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

export const aireAcondicionadoChildServicesData: Record<string, AireAcondicionadoChildServiceData> = {
  'instalacion-aire-acondicionado': {
    h1: 'Instalacion de Aire Acondicionado',
    metaTitle: 'Instalacion de Aire Acondicionado | Reparar24',
    metaDescription: 'Instalacion de aire acondicionado split, multisplit o bomba de calor con presupuesto previo, montaje profesional y prueba de funcionamiento.',
    lockedPrimaryKw: 'instalacion aire acondicionado',
    secondaryKw: ['instalar aire acondicionado', 'aire acondicionado con instalacion', 'montaje aire acondicionado', 'instalador aire acondicionado', 'instalar aire acondicionado en casa precio', 'instalar aire acondicionado en piso', 'instalar aire acondicionado piso alquiler'],
    seoBlockKw: ['instalacion aire acondicionado', 'instalar aire acondicionado', 'aire acondicionado con instalacion', 'montaje aire acondicionado', 'instalar aire acondicionado en casa precio', 'instalar aire acondicionado en piso'],
    faqKw: ['cuanto cuesta instalar aire acondicionado', 'precio instalacion aire acondicionado', 'instalar aire acondicionado en casa precio', 'instalar aire acondicionado en piso', 'donde colocar aire acondicionado'],
    contentBrief: 'Pagina comercial para montaje de equipos nuevos, separada de reparacion, mantenimiento y busquedas de compra de equipos.',
    description: 'Instalamos aire acondicionado split, multisplit y bomba de calor revisando potencia, ubicacion, desague, conexion y puesta en marcha.',
    seoContent: {
      badge: 'Instalacion profesional',
      title: 'Instalacion de Aire Acondicionado con Presupuesto Previo',
      intro: [
        'La instalacion de aire acondicionado debe resolver mucho mas que colgar una unidad en la pared. Para que el equipo enfrie bien, consuma lo justo y no genere averias tempranas, hay que calcular potencia, escoger ubicacion interior, preparar la unidad exterior, prever el desague de condensados y revisar la conexion electrica. Esta pagina trabaja la intencion comercial de instalacion aire acondicionado, instalar aire acondicionado, aire acondicionado con instalacion y montaje aire acondicionado.',
        'Antes de presupuestar revisamos la estancia, orientacion, metros cuadrados, aislamiento, distancia entre unidades, paso de tuberias, evacuacion de agua y accesibilidad. Si quieres instalar aire acondicionado en casa y conocer precio, diferenciamos entre vivienda propia, piso, local y piso de alquiler, porque permisos, fachada y ubicacion de la unidad exterior pueden cambiar el alcance. Si el equipo ya lo ha comprado el cliente, comprobamos que sea adecuado y que incluya los materiales necesarios.',
        'El presupuesto se explica antes de empezar e incluye el alcance del montaje, materiales, prueba de funcionamiento y recomendaciones de uso. Al terminar comprobamos frio y calor si el equipo es bomba de calor, ausencia de vibraciones, salida correcta de condensados y respuesta del mando. Si la instalacion requiere trabajo especial en fachada, altura o comunidad, lo indicamos desde el principio.'
      ],
      serviceCards: [
        { icon: Wrench, title: 'Montaje completo', color: 'blue', bullets: ['Split y multisplit', 'Unidad exterior', 'Tuberias', 'Desague'] },
        { icon: Search, title: 'Revision previa', color: 'green', bullets: ['Potencia', 'Ubicacion', 'Acceso', 'Conexion electrica'] },
        { icon: ShieldCheck, title: 'Sin sorpresas', color: 'orange', bullets: ['Presupuesto previo', 'Prueba final', 'Factura', 'Garantia'] },
      ],
      localCoverage: { title: 'Instalacion de aire acondicionado en Valencia', description: 'Servicio para viviendas, oficinas, locales y comunidades segun acceso y disponibilidad.' },
      benefitsTitle: 'Que incluye',
      benefits: ['Eleccion correcta de ubicacion', 'Montaje de unidad interior y exterior', 'Prueba de frio/calor y condensados', 'Explicacion de uso y mantenimiento'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['instalacion aire acondicionado', 'instalar aire acondicionado', 'instalar aire acondicionado en casa precio', 'instalar aire acondicionado en piso', 'aire acondicionado con instalacion'],
    },
    faqs: [
      { question: '¿Cuánto cuestá instalar aire acondicionado?', answer: 'Depende del tipo de equipo, distancia entre unidades, materiales, acceso exterior y necesidad de bomba de condensados. Damos presupuesto antes de empezar.' },
      { question: '¿Cuánto cuestá instalar aire acondicionado en casa o en un piso?', answer: 'Depende de potencia, distancia entre unidad interior y exterior, acceso a fachada, desague, materiales y permisos de comunidad si aplica. En pisos de alquiler confirmamos tambien autorizacion del propietario.' },
      { question: '¿Puedo comprar yo el equipo?', answer: 'Si, pero revisamos que sea adecuado para la estancia y que la instalacion sea viable. Si no encaja, te lo explicamos antes de montarlo.' },
      { question: '¿La instalación incluye prueba?', answer: 'Si. Comprobamos funcionamiento, condensados, ruido, mando y modo frio/calor cuando el equipo lo permite.' },
    ],
  },
  'reparacion-aire-acondicionado': {
    h1: 'Reparacion de Aire Acondicionado',
    metaTitle: 'Reparacion de Aire Acondicionado | Servicio Tecnico',
    metaDescription: 'Reparamos aire acondicionado que no enfria, pierde agua, hace ruido, huele mal o muestra errores. Diagnostico y presupuesto previo.',
    lockedPrimaryKw: 'reparacion aire acondicionado',
    secondaryKw: ['reparar aire acondicionado', 'servicio tecnico aire acondicionado', 'aire acondicionado no enfria', 'aire acondicionado pierde agua'],
    seoBlockKw: ['reparacion aire acondicionado', 'reparar aire acondicionado', 'servicio tecnico aire acondicionado', 'aire acondicionado no enfria'],
    faqKw: ['porque mi aire acondicionado no enfria', 'aire acondicionado pierde agua', 'cuanto cuesta reparar aire acondicionado'],
    contentBrief: 'Pagina para averias y diagnostico, separada de instalacion, mantenimiento preventivo y carga de gas como servicio especifico.',
    description: 'Diagnosticamos y reparamos equipos que no enfrian, pierden agua, hacen ruido, huelen mal, se paran o muestran codigos de error.',
    seoContent: {
      badge: 'Servicio tecnico',
      title: 'Reparacion de Aire Acondicionado con Diagnostico Claro',
      intro: [
        'Cuando un aire acondicionado no enfria, pierde agua, hace ruido o huele mal, la causa no siempre es la misma. Puede haber filtros sucios, falta de mantenimiento, desague obstruido, fuga de gas, ventilador bloqueado, sonda averiada, placa electronica con fallo o compresor trabajando fuera de rango. Esta pagina trabaja reparacion aire acondicionado, reparar aire acondicionado, servicio tecnico aire acondicionado y aire acondicionado no enfria.',
        'Nuestro proceso empieza por el diagnostico. Revisamos sintomas, estado de filtros, baterias, drenaje de condensados, presiones, conexiones, respuesta del mando y posibles codigos de error. No recomendamos una carga de gas o cambio de pieza sin comprobar antes si realmente es la causa. Si el equipo es antiguo y la reparacion no compensa, tambien lo explicamos para que el cliente decida con informacion.',
        'Atendemos splits domesticos, multisplit, equipos de oficinas, locales y pequenos sistemas de climatizacion. Antes de intervenir damos presupuesto de la reparacion o de la siguiente prueba necesaria. Al finalizar comprobamos temperatura de salida, evacuacion de agua, ruido y funcionamiento estable durante el tiempo suficiente para detectar fallos evidentes.'
      ],
      serviceCards: [
        { icon: Search, title: 'Sintomas', color: 'blue', bullets: ['No enfria', 'Pierde agua', 'Hace ruido', 'Huele mal'] },
        { icon: Wrench, title: 'Diagnostico', color: 'orange', bullets: ['Filtros', 'Desague', 'Gas', 'Placa y sensores'] },
        { icon: ShieldCheck, title: 'Reparacion', color: 'green', bullets: ['Presupuesto previo', 'Piezas si procede', 'Prueba final', 'Garantia'] },
      ],
      localCoverage: { title: 'Reparacion de aire acondicionado en Valencia', description: 'Servicio tecnico para vivienda, local, oficina y comunidad.' },
      benefitsTitle: 'Que revisamos',
      benefits: ['Causa real de la averia', 'Estado de filtros y drenaje', 'Presiones y posible fuga', 'Viabilidad de reparar frente a sustituir'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['reparacion aire acondicionado', 'reparar aire acondicionado', 'servicio tecnico aire acondicionado', 'aire acondicionado no enfria'],
    },
    faqs: [
      { question: '¿Por qué mi aire acondicionado no enfría?', answer: 'Puede ser suciedad, fuga de gas, problema electrico, sonda, compresor o falta de mantenimiento. Hay que diagnosticar antes de decidir.' },
      { question: '¿Si pierde agua es grave?', answer: 'Suele deberse a desague obstruido, mala pendiente, bandeja sucia o bomba de condensados. Conviene pararlo para evitar danos.' },
      { question: '¿Cuánto cuestá reparar un aire acondicionado?', answer: 'Depende de la averia y piezas necesarias. Primero revisamos y despues damos presupuesto.' },
    ],
  },
  'mantenimiento-aire-acondicionado': {
    h1: 'Mantenimiento de Aire Acondicionado',
    metaTitle: 'Mantenimiento de Aire Acondicionado | Limpieza y Revision',
    metaDescription: 'Mantenimiento de aire acondicionado con limpieza de filtros, revision de desague, rendimiento, ruido y funcionamiento antes de temporada.',
    lockedPrimaryKw: 'mantenimiento aire acondicionado',
    secondaryKw: ['limpieza aire acondicionado', 'revision aire acondicionado', 'limpieza filtros aire acondicionado', 'mantenimiento climatizacion'],
    seoBlockKw: ['mantenimiento aire acondicionado', 'limpieza aire acondicionado', 'revision aire acondicionado', 'limpieza filtros aire acondicionado'],
    faqKw: ['cada cuanto mantenimiento aire acondicionado', 'limpiar filtros aire acondicionado', 'mantenimiento aire acondicionado precio'],
    contentBrief: 'Pagina para mantenimiento preventivo y limpieza, con informacional basica en FAQ sin convertirla en blog.',
    description: 'Realizamos mantenimiento preventivo de aire acondicionado: limpieza, revision de desague, bateria, rendimiento y funcionamiento.',
    seoContent: {
      badge: 'Mantenimiento preventivo',
      title: 'Mantenimiento de Aire Acondicionado antes de la Temporada de Calor',
      intro: [
        'El mantenimiento de aire acondicionado evita muchas averias que aparecen justo cuando empieza el calor. Un equipo con filtros sucios, bateria obstruida o desague parcialmente bloqueado consume mas, enfria peor, puede oler mal y termina trabajando forzado. Esta pagina trabaja mantenimiento aire acondicionado, limpieza aire acondicionado, revision aire acondicionado y limpieza filtros aire acondicionado como servicio comercial preventivo.',
        'La intervencion incluye revision visual del equipo, limpieza de filtros, comprobacion del desague, funcionamiento del ventilador, temperatura de impulsion, ruidos, vibraciones y estado general de la unidad. En locales, oficinas y viviendas de uso intensivo recomendamos programarlo antes de verano; en apartamentos turisticos o comunidades puede ser conveniente revisar varios equipos en una misma visita para reducir costes.',
        'No mezclamos esta pagina con reparaciones complejas ni con guias de bricolaje. Si durante el mantenimiento aparece una averia, falta de gas o fuga, lo separamos y lo presupuestamos antes de actuar. El objetivo es que el equipo llegue a la temporada fuerte con mejor rendimiento, menos olor, menos riesgo de goteo y una vida util mas larga.'
      ],
      serviceCards: [
        { icon: ShieldCheck, title: 'Revision preventiva', color: 'green', bullets: ['Filtros', 'Bateria', 'Desague', 'Ruido'] },
        { icon: Gauge, title: 'Rendimiento', color: 'blue', bullets: ['Temperatura', 'Caudal', 'Consumo', 'Modo frio/calor'] },
        { icon: Wrench, title: 'Plan claro', color: 'orange', bullets: ['Antes del calor', 'Sin piezas innecesarias', 'Presupuesto', 'Factura'] },
      ],
      localCoverage: { title: 'Mantenimiento de aire acondicionado en Valencia', description: 'Revision para viviendas, oficinas, locales y apartamentos turisticos.' },
      benefitsTitle: 'Beneficios',
      benefits: ['Reduce averias en temporada alta', 'Mejora el rendimiento', 'Evita malos olores y goteos', 'Alarga la vida del equipo'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['mantenimiento aire acondicionado', 'limpieza aire acondicionado', 'revision aire acondicionado', 'limpieza filtros aire acondicionado'],
    },
    faqs: [
      { question: '¿Cada cuánto hacer mantenimiento?', answer: 'En uso domestico suele bastar una revision anual antes del calor. En locales o uso intensivo puede requerir mas frecuencia.' },
      { question: '¿La limpieza de filtros la puedo hacer yo?', answer: 'La limpieza basica si, pero el mantenimiento profesional revisa tambien desague, bateria, rendimiento y sintomas de averia.' },
      { question: '¿Incluye carga de gas?', answer: 'No por defecto. Si se detecta falta de rendimiento o fuga, se diagnostica y se presupuesta aparte.' },
    ],
  },
  'carga-gas-aire-acondicionado': {
    h1: 'Carga de Gas Aire Acondicionado',
    metaTitle: 'Carga de Gas Aire Acondicionado | Revision y Recarga',
    metaDescription: 'Carga de gas para aire acondicionado con comprobacion de presiones, posible fuga y presupuesto previo. Servicio profesional.',
    lockedPrimaryKw: 'carga gas aire acondicionado',
    secondaryKw: ['recarga gas aire acondicionado', 'gas aire acondicionado', 'cargar aire acondicionado', 'fuga gas aire acondicionado'],
    seoBlockKw: ['carga gas aire acondicionado', 'recarga gas aire acondicionado', 'gas aire acondicionado', 'fuga gas aire acondicionado'],
    faqKw: ['cuanto cuesta cargar gas aire acondicionado', 'cada cuanto cargar gas aire acondicionado', 'aire acondicionado sin gas sintomas'],
    contentBrief: 'Pagina comercial para recarga de refrigerante con enfoque tecnico responsable: no cargar sin diagnostico.',
    description: 'Comprobamos presiones, rendimiento y posibles fugas antes de realizar carga o recarga de gas refrigerante.',
    seoContent: {
      badge: 'Gas refrigerante',
      title: 'Carga de Gas Aire Acondicionado sin Recargas a Ciegas',
      intro: [
        'La carga de gas de aire acondicionado debe hacerse con criterio tecnico. Un equipo no consume gas como si fuera combustible: si falta refrigerante, normalmente existe una fuga, una intervencion previa o una perdida que conviene localizar. Esta pagina trabaja carga gas aire acondicionado, recarga gas aire acondicionado, gas aire acondicionado y fuga gas aire acondicionado, evitando prometer recargas rapidas sin diagnostico.',
        'Antes de cargar revisamos sintomas: el aire no enfria, la unidad exterior trabaja sin rendimiento, aparece hielo, hay baja presion o el equipo se para por proteccion. Comprobamos presiones, temperatura, tipo de refrigerante y estado general. Si hay indicios de fuga, lo explicamos antes de recargar, porque una carga sin reparar la causa puede durar poco y generar un gasto innecesario.',
        'Trabajamos con equipos domesticos y pequenos sistemas de locales u oficinas. El precio depende del gas, cantidad, acceso, comprobaciones y si hace falta buscar fuga. Al terminar verificamos rendimiento y dejamos constancia de lo realizado. Cuando el equipo es muy antiguo o usa refrigerante descatalogado, proponemos alternativas realistas antes de invertir en una reparacion poco rentable.'
      ],
      serviceCards: [
        { icon: Gauge, title: 'Comprobacion', color: 'blue', bullets: ['Presiones', 'Temperatura', 'Tipo de gas', 'Rendimiento'] },
        { icon: Search, title: 'Fugas', color: 'orange', bullets: ['Perdida recurrente', 'Hielo', 'Baja presion', 'Revision previa'] },
        { icon: ShieldCheck, title: 'Recarga responsable', color: 'green', bullets: ['Presupuesto', 'Gas adecuado', 'Prueba final', 'Sin atajos'] },
      ],
      localCoverage: { title: 'Carga de gas aire acondicionado en Valencia', description: 'Servicio con diagnostico previo para vivienda, oficina y local.' },
      benefitsTitle: 'Cuando puede hacer falta',
      benefits: ['El equipo no enfria suficiente', 'Aparece hielo en tuberias', 'La instalacion tuvo una fuga', 'Se sustituyo un componente del circuito'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['carga gas aire acondicionado', 'recarga gas aire acondicionado', 'gas aire acondicionado', 'fuga gas aire acondicionado'],
    },
    faqs: [
      { question: '¿Cada cuánto se carga gas?', answer: 'No hay una periodicidad fija. Si todo esta bien, el circuito no deberia perder gas. Si falta, hay que revisar por que.' },
      { question: '¿Cuánto cuestá cargar gas?', answer: 'Depende del refrigerante, cantidad, acceso y comprobaciones. Confirmamos precio antes de realizar la carga.' },
      { question: '¿Se puede cargar sin reparar fuga?', answer: 'No lo recomendamos. Puede perderse de nuevo y no resolver la averia.' },
    ],
  },
  'aire-acondicionado-conductos': {
    h1: 'Aire Acondicionado por Conductos',
    metaTitle: 'Aire Acondicionado por Conductos | Instalacion y Reparacion',
    metaDescription: 'Instalacion, revision y reparacion de aire acondicionado por conductos para viviendas y locales. Diagnostico y presupuesto previo.',
    lockedPrimaryKw: 'aire acondicionado conductos',
    secondaryKw: ['aire acondicionado por conductos', 'montaje de conductos aire acondicionado', 'reparacion aire acondicionado conductos', 'instalar aire acondicionado centralizado'],
    seoBlockKw: ['aire acondicionado conductos', 'aire acondicionado por conductos', 'montaje de conductos aire acondicionado', 'instalar aire acondicionado centralizado'],
    faqKw: ['precio aire acondicionado por conductos', 'conductos no enfria una habitacion', 'mantenimiento aire por conductos'],
    contentBrief: 'Pagina para sistemas centralizados por conductos, no para splits individuales.',
    description: 'Instalamos, revisamos y reparamos sistemas de aire acondicionado por conductos en viviendas, locales y oficinas.',
    seoContent: {
      badge: 'Sistemas por conductos',
      title: 'Aire Acondicionado por Conductos para Vivienda y Local',
      intro: [
        'El aire acondicionado por conductos reparte frio o calor por varias estancias desde una unidad central y una red de conductos ocultos. Es una solucion habitual en viviendas con falso techo, oficinas y locales donde se busca una climatizacion mas uniforme y discreta que varios splits visibles. Esta pagina trabaja aire acondicionado conductos, aire acondicionado por conductos, instalar aire acondicionado centralizado y montaje de conductos de climatizacion como intencion comercial propia.',
        'Antes de instalar o reparar revisamos distribucion, rejillas, retorno, potencia, estado de conductos, aislamiento, desague, termostato y accesibilidad de la unidad interior. Si una habitacion no enfria, puede deberse a compuerta, fuga de aire, conducto mal dimensionado, retorno insuficiente, suciedad, problema de maquina o mala regulacion. Por eso no tratamos estos sistemas como un split simple.',
        'El presupuesto puede variar mucho segun si ya existen conductos, si hay que hacer obra, si el equipo solo requiere reparacion o si conviene redimensionar la instalacion. Nuestro enfoque es explicar primero el problema y separar instalacion, mantenimiento y reparacion para que el cliente entienda el alcance real antes de intervenir.'
      ],
      serviceCards: [
        { icon: Flame, title: 'Climatizacion central', color: 'blue', bullets: ['Varias estancias', 'Falso techo', 'Rejillas', 'Retorno'] },
        { icon: Search, title: 'Diagnostico', color: 'green', bullets: ['Caudal', 'Conductos', 'Termostato', 'Desague'] },
        { icon: Wrench, title: 'Instalacion y reparacion', color: 'orange', bullets: ['Equipo central', 'Aislamiento', 'Prueba', 'Presupuesto'] },
      ],
      localCoverage: { title: 'Aire acondicionado por conductos en Valencia', description: 'Servicio para viviendas, oficinas, locales y comunidades segun viabilidad tecnica.' },
      benefitsTitle: 'Casos habituales',
      benefits: ['Viviendas con falso techo', 'Locales con varias zonas', 'Habitaciones que no enfrien', 'Mantenimiento de rejillas y conductos'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['aire acondicionado conductos', 'aire acondicionado por conductos', 'instalar aire acondicionado centralizado', 'montaje de conductos aire acondicionado'],
    },
    faqs: [
      { question: '¿Es mejor conductos o split?', answer: 'Depende de la vivienda, presupuesto y uso. Conductos es mas discreto y reparte por zonas; split suele ser mas simple y economico.' },
      { question: '¿Por qué una habitacion no enfría?', answer: 'Puede haber falta de caudal, compuerta cerrada, conducto mal aislado, retorno insuficiente o problema del equipo.' },
      { question: '¿Hace falta obra?', answer: 'Si no existen conductos o falso techo, normalmente si. Si ya existe instalacion, puede bastar con revisar o sustituir equipo.' },
    ],
  },
  'instalacion-split': {
    h1: 'Instalacion de Split y Multisplit',
    metaTitle: 'Instalacion de Split | Aire Acondicionado Split y Multisplit',
    metaDescription: 'Instalacion de split y multisplit para vivienda, oficina o local. Montaje profesional con presupuesto previo y prueba final.',
    lockedPrimaryKw: 'instalacion split',
    secondaryKw: ['instalar split', 'montaje split aire acondicionado', 'instalacion multisplit', 'equipo split con montaje'],
    seoBlockKw: ['instalacion split', 'instalar split', 'montaje split aire acondicionado', 'instalacion multisplit'],
    faqKw: ['cuanto cuesta instalar un split', 'donde colocar split', 'split o multisplit'],
    contentBrief: 'Pagina para equipos split/multisplit, subordinada a instalacion general pero con demanda especifica suficiente.',
    description: 'Instalamos equipos split y multisplit para estancias concretas, revisando potencia, ubicacion, unidad exterior y desague.',
    seoContent: {
      badge: 'Split y multisplit',
      title: 'Instalacion de Split y Multisplit con Montaje Profesional',
      intro: [
        'La instalacion de split es la solucion mas comun para climatizar una estancia concreta: salon, dormitorio, despacho, oficina o pequeno local. Tambien existe la opcion multisplit cuando una sola unidad exterior alimenta varias unidades interiores. Esta pagina trabaja instalacion split, instalar split, montaje split aire acondicionado e instalacion multisplit como cluster propio dentro de aire acondicionado.',
        'Para que el split funcione bien no basta con elegir un equipo potente. Hay que valorar metros cuadrados, orientacion, altura, aislamiento, distancia a la unidad exterior, paso de tuberias, desague de condensados y punto electrico. Una mala ubicacion puede generar ruido, corrientes molestas, goteos o rendimiento bajo. Por eso revisamos la instalacion antes de cerrar precio.',
        'El montaje incluye colocacion de soportes, paso de lineas, conexion, evacuacion de condensados y prueba final. Si el cliente quiere multisplit, verificamos que la potencia exterior sea suficiente para las estancias previstas. Si conviene un sistema por conductos o varios splits independientes, lo explicamos antes para evitar una decision cara que no resuelva el confort.'
      ],
      serviceCards: [
        { icon: Flame, title: 'Split domestico', color: 'blue', bullets: ['Salon', 'Dormitorio', 'Despacho', 'Local pequeno'] },
        { icon: Gauge, title: 'Multisplit', color: 'green', bullets: ['Varias estancias', 'Unidad exterior', 'Potencia', 'Distribucion'] },
        { icon: ShieldCheck, title: 'Montaje seguro', color: 'orange', bullets: ['Desague', 'Conexion', 'Prueba final', 'Presupuesto'] },
      ],
      localCoverage: { title: 'Instalacion de split en Valencia', description: 'Montaje de split y multisplit para viviendas, oficinas y locales.' },
      benefitsTitle: 'Que decidimos contigo',
      benefits: ['Potencia adecuada', 'Mejor ubicacion interior', 'Ruta de tuberias y desague', 'Split individual o multisplit'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['instalacion split', 'instalar split', 'montaje split aire acondicionado', 'instalacion multisplit'],
    },
    faqs: [
      { question: '¿Cuánto cuestá instalar un split?', answer: 'Depende de distancia entre unidades, materiales, acceso a fachada, desague y si hay preinstalacion. Se presupuesta antes.' },
      { question: '¿Qué es mejor, split o multisplit?', answer: 'Split independiente es simple y flexible. Multisplit reduce unidades exteriores, pero requiere buen dimensionamiento.' },
      { question: '¿Puede instalarse en cualquier pared?', answer: 'No siempre. Hay que revisar estructura, salida de condensados, distancia exterior y ubicacion para no generar corrientes molestas.' },
    ],
  },
  'bomba-calor': {
    h1: 'Bomba de Calor y Aire Acondicionado',
    metaTitle: 'Bomba de Calor Aire Acondicionado | Instalacion y Revision',
    metaDescription: 'Instalacion, revision y reparacion de bomba de calor de aire acondicionado frio/calor con presupuesto previo y prueba de rendimiento.',
    lockedPrimaryKw: 'bomba de calor aire acondicionado',
    secondaryKw: ['aire acondicionado con bomba de calor', 'aire acondicionado frio calor', 'bomba de calor inverter', 'reparacion bomba de calor'],
    seoBlockKw: ['bomba de calor aire acondicionado', 'aire acondicionado con bomba de calor', 'aire acondicionado frio calor', 'bomba de calor inverter'],
    faqKw: ['bomba de calor o aire acondicionado', 'bomba de calor no calienta', 'bomba de calor aire acondicionado consumo'],
    contentBrief: 'Pagina comercial para equipos frio/calor y bomba de calor, separada de instalacion generica y reparacion general.',
    description: 'Instalamos, revisamos y reparamos equipos de aire acondicionado con bomba de calor para frio y calor en vivienda, local u oficina.',
    seoContent: {
      badge: 'Frio y calor',
      title: 'Bomba de Calor y Aire Acondicionado para Climatizar Todo el Ano',
      intro: [
        'La bomba de calor de aire acondicionado permite usar el mismo equipo para frio en verano y calor en invierno. Es una solucion habitual cuando se busca climatizacion eficiente sin instalar radiadores o sistemas separados. Esta pagina trabaja bomba de calor aire acondicionado, aire acondicionado con bomba de calor, aire acondicionado frio calor y bomba de calor inverter como intencion comercial propia, distinta de una instalacion basica de split.',
        'Antes de recomendar instalacion, reparacion o sustitucion revisamos metros de la estancia, aislamiento, orientacion, potencia necesaria, ubicacion de unidades, desague, conexion electrica y uso previsto. En modo calor tambien comprobamos si el equipo rinde correctamente, si entra en desescarche, si hay falta de mantenimiento o si existe una averia que reduzca la temperatura de impulsion.',
        'El presupuesto se confirma antes de actuar. Si el equipo no calienta, no enfria o consume mas de lo esperado, hacemos diagnostico para separar problemas de filtros, gas, sensores, ventilador, placa o dimensionamiento incorrecto. La reparacion bomba de calor se plantea solo cuando compensa frente a mantener o instalar un equipo frio/calor nuevo.'
      ],
      serviceCards: [
        { icon: Flame, title: 'Frio/calor', color: 'orange', bullets: ['Verano', 'Invierno', 'Inverter', 'Modo calor'] },
        { icon: Search, title: 'Revision tecnica', color: 'blue', bullets: ['Potencia', 'Rendimiento', 'Filtros', 'Presiones'] },
        { icon: ShieldCheck, title: 'Decision clara', color: 'green', bullets: ['Instalar', 'Reparar', 'Mantener', 'Sustituir'] },
      ],
      localCoverage: { title: 'Bomba de calor de aire acondicionado en Valencia', description: 'Servicio para viviendas, locales, oficinas y apartamentos con presupuesto previo.' },
      benefitsTitle: 'Cuando conviene',
      benefits: ['Dudas entre bomba de calor o aire acondicionado', 'El modo calor no rinde bien', 'Quieres revisar bomba de calor aire acondicionado consumo', 'Hay que revisar potencia antes de instalar'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['bomba de calor aire acondicionado', 'aire acondicionado con bomba de calor', 'aire acondicionado frio calor', 'bomba de calor inverter'],
    },
    faqs: [
      { question: '¿Es lo mismo bomba de calor y aire acondicionado?', answer: 'Muchos equipos de aire acondicionado actuales incorporan bomba de calor, por eso pueden enfriar y calentar. Hay que revisar potencia y uso para elegir bien.' },
      { question: '¿Por qué mi bomba de calor no calienta?', answer: 'Puede ser falta de mantenimiento, filtros sucios, sonda, gas, unidad exterior, desescarche o dimensionamiento insuficiente. Primero diagnosticamos.' },
      { question: '¿Consume mucho una bomba de calor?', answer: 'Depende del equipo, aislamiento, temperatura objetivo y horas de uso. Un inverter bien dimensionado suele ser eficiente frente a otros sistemas electricos.' },
    ],
  },
  'aire-acondicionado-cassette-techo': {
    h1: 'Aire Acondicionado Cassette y de Techo',
    metaTitle: 'Aire Acondicionado Cassette y Techo | Instalacion y Reparacion',
    metaDescription: 'Instalacion, revision y reparacion de aire acondicionado cassette, suelo techo y equipos de techo para locales, oficinas y viviendas.',
    lockedPrimaryKw: 'aire acondicionado cassette',
    secondaryKw: ['aire acondicionado techo', 'aire acondicionado de techo', 'aire acondicionado suelo techo', 'split de techo'],
    seoBlockKw: ['aire acondicionado cassette', 'aire acondicionado techo', 'aire acondicionado de techo', 'aire acondicionado suelo techo'],
    faqKw: ['aire acondicionado cassette no enfria', 'cassette aire acondicionado gotea', 'aire acondicionado techo precio instalacion'],
    contentBrief: 'Pagina comercial para cassette, suelo-techo y equipos de techo, orientada a locales, oficinas y estancias amplias.',
    description: 'Instalamos y reparamos aire acondicionado cassette, suelo techo y equipos de techo cuando se necesita reparto uniforme y acceso profesional.',
    seoContent: {
      badge: 'Cassette y techo',
      title: 'Aire Acondicionado Cassette y de Techo con Instalacion Profesional',
      intro: [
        'El aire acondicionado cassette y los equipos de techo se usan cuando hace falta repartir el aire de forma mas uniforme que con un split mural. Son habituales en locales, oficinas, salones amplios, comercios y espacios donde la pared no es la mejor ubicacion. Esta pagina trabaja aire acondicionado cassette, aire acondicionado techo, aire acondicionado de techo y aire acondicionado suelo techo como cluster comercial independiente.',
        'Antes de instalar revisamos altura, falso techo, estructura, retorno, desague, unidad exterior, potencia, ruido permitido y accesibilidad para mantenimiento. En reparaciones comprobamos si el cassette gotea, si no enfria, si la bomba de condensados falla, si las lamas no abren o si hay suciedad en bandeja, filtros o bateria. Son equipos que requieren diagnostico mas especifico que un split domestico sencillo.',
        'El presupuesto depende del tipo de maquina, acceso, materiales, posible obra en techo y estado de la instalacion existente. Explicamos si basta con limpiar, reparar bomba de condensados, revisar gas, sustituir piezas o renovar el equipo. El objetivo es que el sistema quede estable, con buen caudal y sin goteos ni vibraciones.'
      ],
      serviceCards: [
        { icon: Fan, title: 'Equipos de techo', color: 'blue', bullets: ['Cassette', 'Suelo-techo', 'Local', 'Oficina'] },
        { icon: Search, title: 'Revision', color: 'green', bullets: ['Desague', 'Bomba', 'Caudal', 'Lamas'] },
        { icon: Wrench, title: 'Instalacion', color: 'orange', bullets: ['Falso techo', 'Unidad exterior', 'Prueba', 'Factura'] },
      ],
      localCoverage: { title: 'Aire acondicionado cassette en Valencia', description: 'Servicio para locales, oficinas, comercios, viviendas amplias y comunidades.' },
      benefitsTitle: 'Casos habituales',
      benefits: ['Local con falso techo', 'Oficina con varias zonas', 'Equipo cassette que gotea', 'Sustitucion de maquina de techo'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['aire acondicionado cassette', 'aire acondicionado techo', 'aire acondicionado de techo', 'aire acondicionado suelo techo'],
    },
    faqs: [
      { question: '¿Cuándo conviene un cassette?', answer: 'Cuando hay falso techo y se busca repartir el aire en varias direcciones, especialmente en locales, oficinas o estancias amplias.' },
      { question: '¿Por qué gotea un cassette?', answer: 'Puede fallar la bomba de condensados, estar sucia la bandeja, obstruido el desague o haber mala nivelacion. Hay que revisarlo.' },
      { question: '¿Es mas caro que un split mural?', answer: 'Normalmente requiere mas trabajo y acceso tecnico, sobre todo si hay falso techo o bomba de condensados. Se presupuesta segun caso.' },
    ],
  },
  'preinstalacion-aire-acondicionado': {
    h1: 'Preinstalacion de Aire Acondicionado',
    metaTitle: 'Preinstalacion Aire Acondicionado | Revision y Conexion',
    metaDescription: 'Revision, preparacion y aprovechamiento de preinstalacion de aire acondicionado split o conductos con presupuesto previo.',
    lockedPrimaryKw: 'preinstalacion aire acondicionado',
    secondaryKw: ['preinstalacion de aire acondicionado', 'aire acondicionado sin preinstalacion', 'preinstalacion aire acondicionado por conductos', 'aire acondicionado preinstalacion conductos'],
    seoBlockKw: ['preinstalacion aire acondicionado', 'preinstalacion de aire acondicionado', 'preinstalacion aire acondicionado por conductos'],
    faqKw: ['se puede instalar aire acondicionado sin preinstalacion', 'como saber si tengo preinstalacion aire acondicionado', 'preinstalacion aire acondicionado conductos'],
    contentBrief: 'Pagina para viviendas con tubos preparados, obra nueva, reformas y casos donde hay que verificar o crear preinstalacion.',
    description: 'Revisamos preinstalaciones existentes y preparamos lineas, desague y conexion para instalar aire acondicionado split o conductos.',
    seoContent: {
      badge: 'Preparacion tecnica',
      title: 'Preinstalacion de Aire Acondicionado antes del Montaje',
      intro: [
        'La preinstalacion de aire acondicionado condiciona el precio, la rapidez y la calidad del montaje final. En viviendas de obra nueva o reformas puede haber tuberias, desague y conexion preparados, pero no siempre estan en buen estado o sirven para el equipo elegido. Esta pagina trabaja preinstalacion aire acondicionado, preinstalacion de aire acondicionado y preinstalacion aire acondicionado por conductos como demanda comercial propia.',
        'Revisamos si existen lineas frigorificas, diametros correctos, desague de condensados, punto electrico, ubicacion de unidad interior y exterior, distancia entre maquinas y estado de tapones o tuberias. Si no hay preinstalacion, estudiamos la ruta mas limpia para crearla con la menor obra posible. En conductos analizamos falso techo, retorno, rejillas y acceso a la maquina.',
        'Separar esta pagina de la instalacion general ayuda a resolver dudas antes de comprar un equipo. Muchos problemas aparecen por montar una maquina sobre una preinstalacion mal planteada: goteos, falta de rendimiento, ruido, fugas o imposibilidad de conectar la unidad exterior. Por eso damos presupuesto tras verificar la viabilidad real.'
      ],
      serviceCards: [
        { icon: Search, title: 'Comprobacion', color: 'blue', bullets: ['Tuberias', 'Desague', 'Diametros', 'Conexion'] },
        { icon: Wrench, title: 'Preparacion', color: 'orange', bullets: ['Split', 'Conductos', 'Reforma', 'Obra nueva'] },
        { icon: ShieldCheck, title: 'Viabilidad', color: 'green', bullets: ['Acceso', 'Distancia', 'Exterior', 'Presupuesto'] },
      ],
      localCoverage: { title: 'Preinstalacion de aire acondicionado en Valencia', description: 'Revision y preparacion para viviendas, locales, reformas y obra nueva.' },
      benefitsTitle: 'Que evitamos',
      benefits: ['Comprar un equipo incompatible', 'Goteos por desague mal previsto', 'Fugas por tuberia deteriorada', 'Montajes caros de ultima hora'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['preinstalacion aire acondicionado', 'preinstalacion de aire acondicionado', 'preinstalacion aire acondicionado por conductos'],
    },
    faqs: [
      { question: '¿Cómo saber si tengo preinstalación?', answer: 'Hay que revisar salidas, tubos, desague, punto electrico y ubicacion exterior. Podemos comprobarlo antes de comprar el equipo.' },
      { question: '¿Se puede instalar sin preinstalación?', answer: 'Si, pero habra que definir ruta de tuberias, desague y conexion. El coste depende del acceso y distancia.' },
      { question: '¿Sirve cualquier preinstalación para conductos?', answer: 'No. En conductos influyen falso techo, retorno, rejillas, dimensiones y acceso a la unidad interior.' },
    ],
  },
  'limpieza-conductos-aire-acondicionado': {
    h1: 'Limpieza de Conductos de Aire Acondicionado',
    metaTitle: 'Limpieza Conductos Aire Acondicionado | Revision Profesional',
    metaDescription: 'Limpieza de conductos de aire acondicionado, rejillas y retorno para sistemas por conductos con malos olores, polvo o bajo caudal.',
    lockedPrimaryKw: 'limpieza conductos aire acondicionado',
    secondaryKw: ['limpiar conductos aire acondicionado', 'limpieza de conductos de aire acondicionado', 'limpieza aire acondicionado por conductos', 'mal olor aire acondicionado conductos'],
    seoBlockKw: ['limpieza conductos aire acondicionado', 'limpiar conductos aire acondicionado', 'limpieza aire acondicionado por conductos'],
    faqKw: ['cada cuanto limpiar conductos aire acondicionado', 'mal olor conductos aire acondicionado', 'limpiar conductos aire acondicionado casa'],
    contentBrief: 'Pagina comercial para limpieza y revision de sistemas por conductos, separada de mantenimiento de split.',
    description: 'Limpiamos y revisamos conductos, rejillas, retorno, filtros y desague en sistemas de aire acondicionado por conductos.',
    seoContent: {
      badge: 'Conductos limpios',
      title: 'Limpieza de Conductos de Aire Acondicionado con Revision del Sistema',
      intro: [
        'La limpieza de conductos de aire acondicionado es importante cuando aparecen malos olores, polvo en rejillas, caudal bajo, sensacion de aire cargado o mantenimiento pendiente en sistemas centralizados. No es lo mismo limpiar filtros de un split que revisar una red de conductos, retorno, rejillas y unidad interior oculta. Esta pagina trabaja limpieza conductos aire acondicionado, limpiar conductos aire acondicionado y limpieza aire acondicionado por conductos.',
        'Antes de intervenir valoramos tipo de instalacion, accesos, numero de rejillas, retorno, filtros, bandeja de condensados, estado de la unidad y sintomas. Si el problema es olor, puede venir de suciedad, humedad, desague, filtros, bateria o falta de ventilacion. Si el problema es bajo caudal, tambien revisamos compuertas, retorno y posible obstruccion.',
        'El servicio se adapta a vivienda, oficina, local o comunidad. Explicamos que limpieza es viable sin desmontajes excesivos y que partes requieren acceso tecnico. Si durante la revision detectamos una averia de maquina, falta de gas o problema de instalacion, lo separamos del trabajo de limpieza para presupuestarlo correctamente.'
      ],
      serviceCards: [
        { icon: Fan, title: 'Sistema por conductos', color: 'blue', bullets: ['Rejillas', 'Retorno', 'Filtros', 'Unidad interior'] },
        { icon: Search, title: 'Sintomas', color: 'orange', bullets: ['Mal olor', 'Polvo', 'Bajo caudal', 'Humedad'] },
        { icon: ShieldCheck, title: 'Revision completa', color: 'green', bullets: ['Accesos', 'Desague', 'Bateria', 'Informe'] },
      ],
      localCoverage: { title: 'Limpieza de conductos en Valencia', description: 'Servicio para viviendas con conductos, oficinas, locales y comunidades.' },
      benefitsTitle: 'Cuando pedirlo',
      benefits: ['El aire huele mal al encender', 'Sale polvo por las rejillas', 'Una zona recibe poco caudal', 'Hace anos que no se revisa el sistema'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza conductos aire acondicionado', 'limpiar conductos aire acondicionado', 'limpieza aire acondicionado por conductos'],
    },
    faqs: [
      { question: '¿Cada cuánto limpiar conductos?', answer: 'Depende del uso, polvo, humedad y tipo de local. En uso domestico se revisa cuando hay sintomas o mantenimiento pendiente.' },
      { question: '¿El mal olor siempre viene de los conductos?', answer: 'No. Puede venir de filtros, bateria, bandeja, desague o humedad. Por eso revisamos antes de proponer limpieza.' },
      { question: '¿Hay que desmontar todo?', answer: 'No siempre. Depende de accesos, rejillas y estado del sistema. Se explica antes de empezar.' },
    ],
  },
  'empresa-climatizacion': {
    h1: 'Empresa de Climatizacion',
    metaTitle: 'Empresa de Climatizacion | Aire Acondicionado para Locales',
    metaDescription: 'Empresa de climatizacion para instalacion, reparacion y mantenimiento de aire acondicionado en locales, oficinas y comunidades.',
    lockedPrimaryKw: 'empresa climatizacion',
    secondaryKw: ['empresas de climatizacion', 'empresa aire acondicionado', 'empresas de aire acondicionado', 'aire acondicionado para locales'],
    seoBlockKw: ['empresa climatizacion', 'empresas de climatizacion', 'empresa aire acondicionado', 'aire acondicionado para locales'],
    faqKw: ['empresa mantenimiento aire acondicionado', 'climatizacion locales comerciales', 'aire acondicionado oficinas'],
    contentBrief: 'Pagina B2B para locales, oficinas y comunidades; no compite con instalacion domestica general.',
    description: 'Servicio de climatizacion para locales, oficinas, comercios y comunidades: instalacion, mantenimiento, reparacion y sustitucion.',
    seoContent: {
      badge: 'Locales y empresas',
      title: 'Empresa de Climatizacion para Locales, Oficinas y Comunidades',
      intro: [
        'Una empresa de climatizacion debe resolver necesidades distintas a una vivienda puntual. En locales, oficinas, comercios y comunidades importan la continuidad del servicio, el confort de clientes y trabajadores, la planificacion del mantenimiento, la factura y la posibilidad de actuar sin interrumpir la actividad. Esta pagina trabaja empresa climatizacion, empresas de climatizacion, empresa aire acondicionado y empresas de aire acondicionado con enfoque B2B.',
        'Atendemos instalacion, reparacion, mantenimiento, limpieza, carga de gas y sustitucion de equipos de aire acondicionado en negocios y espacios compartidos. Revisamos potencia, numero de estancias, horarios, accesibilidad, ruido, normativa de comunidad, ubicacion exterior, conductos, cassette, split o multisplit. Si el sistema afecta a varias zonas, planteamos una solucion proporcionada y presupuestada.',
        'El objetivo es evitar paradas en temporada alta y reducir intervenciones improvisadas. Podemos agrupar revisiones, priorizar equipos criticos y dejar recomendaciones claras. Esta pagina no sustituye a las paginas tecnicas de instalacion o reparacion: concentra la demanda de empresas, locales y comunidades que necesitan un proveedor de climatizacion fiable.'
      ],
      serviceCards: [
        { icon: ShieldCheck, title: 'B2B', color: 'green', bullets: ['Local', 'Oficina', 'Comercio', 'Comunidad'] },
        { icon: Wrench, title: 'Servicio completo', color: 'blue', bullets: ['Instalacion', 'Reparacion', 'Mantenimiento', 'Sustitucion'] },
        { icon: Search, title: 'Planificacion', color: 'orange', bullets: ['Factura', 'Prioridades', 'Horarios', 'Presupuesto'] },
      ],
      localCoverage: { title: 'Empresa de climatizacion en Valencia', description: 'Servicio para negocios, oficinas, comunidades y locales comerciales.' },
      benefitsTitle: 'Para quien es',
      benefits: ['Locales comerciales con atencion al publico', 'Oficinas con varios equipos', 'Comunidades con climatizacion compartida', 'Negocios que necesitan factura y planificacion'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['empresa climatizacion', 'empresas de climatizacion', 'empresa aire acondicionado', 'aire acondicionado para locales'],
    },
    faqs: [
      { question: '¿Trabajáis con locales y oficinas?', answer: 'Si. Revisamos horarios, acceso, factura, continuidad del servicio y necesidades de varias estancias o equipos.' },
      { question: '¿Podéis hacer mantenimiento periodico?', answer: 'Podemos revisar varios equipos y recomendar una frecuencia segun uso, temporada y estado de la instalacion.' },
      { question: '¿Tambien reparais equipos de empresa?', answer: 'Si. Diagnosticamos averias, falta de rendimiento, goteos, ruido, gas, conductos, cassette, split y multisplit.' },
    ],
  },
}
