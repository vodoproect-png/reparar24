import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Droplets, Wrench, Gauge, ShieldCheck, Search, Truck, Toilet, ShowerHead } from 'lucide-react'

export interface DesatascosChildServiceData {
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

export const desatascosChildServicesData: Record<string, DesatascosChildServiceData> = {
  'desatasco-tuberias': {
    h1: 'Desatasco de Tuberías',
    metaTitle: 'Desatasco de Tuberías 24h | Reparar24',
    metaDescription: 'Desatascar tuberías con equipo profesional. Atascos en desagües, bajantes y redes interiores con presupuesto previo y servicio urgente.',
    lockedPrimaryKw: 'desatascar tuberias',
    secondaryKw: ['desatascar tuberia', 'desatascador tuberias', 'desatasco tuberias', 'desatascar una tuberia muy obstruida', 'limpieza tuberias'],
    seoBlockKw: ['desatascar tuberias', 'desatascar tuberia', 'desatasco tuberias', 'desatascador de tuberias', 'limpieza tuberias', 'tuberia obstruida'],
    faqKw: ['cuanto cuesta desatascar tuberia', 'desatascar una tuberia muy obstruida', 'inspeccion tuberias camara precio'],
    contentBrief: 'Servicio comercial para desatascar tuberías y desagües interiores, separado de reparación de fugas o sustitución de tuberías.',
    description: 'Desatascamos tuberías obstruidas con máquinas profesionales, alta presión e inspección cuando el atasco se repite.',
    seoContent: {
      badge: 'Tuberías obstruidas',
      title: 'Desatasco de Tuberías con Diagnóstico y Presupuesto Previo',
      intro: [
        'Un desatasco de tuberías profesional no consiste en echar un producto químico y esperar. Cuando una tubería está obstruida de verdad, el problema puede estar en un tramo horizontal, en una curva, en una bajante compartida o en una arqueta donde se acumulan grasas, restos orgánicos, cal, arena o toallitas. Esta página trabaja la intención de desatasco tuberias y limpieza tuberias como servicio comercial propio, sin mezclarla con reparación de fugas ni sustitución completa de la instalación.',
        'En Reparar24 usamos máquinas rotativas, espirales profesionales, agua a presión y, cuando hace falta, cámara de inspección para entender por qué el atasco vuelve. Antes de intervenir explicamos si el bloqueo parece puntual, si conviene limpiar un tramo más largo o si hay señales de tubería deformada, raíces, pendiente incorrecta o rotura. El objetivo es recuperar el paso de agua sin dañar la conducción y dejar claro qué se ha hecho.',
        'Atendemos viviendas, locales, comunidades y negocios donde una tubería no traga, el agua retorna por otro punto o varios desagües fallan a la vez. El presupuesto se comunica antes de empezar, con precio cerrado según acceso, longitud de la tubería y equipo necesario. Si el trabajo requiere camión cuba, cámara o intervención comunitaria, lo indicamos antes para evitar sorpresas.'
      ],
      serviceCards: [
        { icon: Droplets, title: 'Tuberías y desagües', color: 'blue', bullets: ['Tubería obstruida', 'Desagüe lento', 'Retorno de agua', 'Mal olor'] },
        { icon: Wrench, title: 'Equipo profesional', color: 'orange', bullets: ['Máquina rotativa', 'Espirales largas', 'Alta presión', 'Limpieza del tramo'] },
        { icon: Search, title: 'Diagnóstico', color: 'green', bullets: ['Atascos repetidos', 'Cámara si procede', 'Origen del bloqueo', 'Solución explicada'] },
      ],
      localCoverage: {
        title: 'Desatasco de tuberías en Valencia',
        description: 'Servicio urgente y programado para tuberías obstruidas en viviendas, locales y comunidades.',
      },
      benefitsTitle: 'Qué incluye el servicio',
      benefits: ['Presupuesto antes de intervenir', 'Métodos mecánicos sin dañar tuberías', 'Prueba de desagüe al finalizar', 'Recomendaciones para evitar que vuelva'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['desatascar tuberias', 'desatascar tuberia', 'desatasco tuberias', 'limpieza tuberias', 'tuberia obstruida'],
    },
    faqs: [
      { question: '¿Cuánto cuestá desatascar una tubería?', answer: 'Depende del acceso, longitud del tramo y equipo necesario. Un atasco accesible suele ser más económico; si requiere máquina profesional, cámara o alta presión, se presupuesta antes de empezar.' },
      { question: '¿Usáis productos químicos para limpiar tuberías?', answer: 'No como solución principal. Los productos químicos pueden dañar juntas y tuberías. Preferimos métodos mecánicos y agua a presión porque eliminan el atasco de forma controlada.' },
      { question: '¿Qué pasa si la tubería se atasca otra vez?', answer: 'Si el atasco se repite, recomendamos inspeccion tuberias camara precio antes de repetir la intervención para comprobar si hay rotura, raíces, pendiente incorrecta o acumulación estructural de residuos.' },
    ],
  },

  'desatascar-fregadero': {
    h1: 'Desatascar Fregadero',
    metaTitle: 'Desatascar Fregadero | Servicio Urgente con Presupuesto',
    metaDescription: 'Desatascamos fregaderos que no tragan, con grasa acumulada, malos olores o retorno de agua. Atención rápida y precio claro.',
    lockedPrimaryKw: 'desatascar fregadero',
    secondaryKw: ['atasco fregadero', 'desatascar fregadero cocina', 'fregadero no traga', 'precio desatascar fregadero'],
    seoBlockKw: ['desatascar fregadero', 'atasco fregadero', 'fregadero atascado', 'desatascar fregadero cocina', 'precio desatascar fregadero'],
    faqKw: ['cuanto cuesta desatascar un fregadero', 'por que se atasca el fregadero', 'fregadero no traga nada'],
    contentBrief: 'Página comercial centrada en fregaderos atascados por grasa, restos de comida, sifón o tramo de desagüe.',
    description: 'Desatascamos fregaderos de cocina que no tragan, huelen mal o devuelven agua por acumulación de grasa y residuos.',
    seoContent: {
      badge: 'Fregadero atascado',
      title: 'Servicio para Desatascar Fregaderos de Cocina',
      intro: [
        'Desatascar un fregadero es una de las urgencias más habituales en cocina. El bloqueo suele aparecer poco a poco: el agua baja lenta, se queda espuma en la cubeta, sube mal olor por el desagüe o el fregadero termina completamente atascado. En muchos casos el problema no está solo en el sifón visible, sino en el tramo de tubería donde la grasa se ha solidificado y ha atrapado restos de comida, jabón y pequeños residuos.',
        'Esta página trabaja la intención comercial de desatascar fregadero, atasco fregadero y precio desatascar fregadero. No la mezclamos con cambio de grifos, instalación de lavabo ni reformas de cocina. Si el fregadero está atascado, revisamos sifón, válvula, tubo flexible y conducción hasta localizar el punto probable del bloqueo. Cuando el atasco está más profundo usamos máquina rotativa o presión controlada.',
        'Antes de intervenir te explicamos el precio y la solución. Si el atasco procede de una bajante comunitaria o afecta a varios vecinos, lo indicamos para coordinar el trabajo correcto. Al terminar hacemos prueba de caudal y dejamos recomendaciones claras: evitar grasa caliente, usar rejilla, retirar restos sólidos y no abusar de productos químicos.'
      ],
      serviceCards: [
        { icon: Droplets, title: 'Síntomas frecuentes', color: 'blue', bullets: ['Agua estancada', 'Mal olor', 'Retorno por cubeta', 'Desagüe lento'] },
        { icon: Wrench, title: 'Intervención', color: 'orange', bullets: ['Revisión de sifón', 'Limpieza de tramo', 'Máquina si procede', 'Prueba final'] },
        { icon: ShieldCheck, title: 'Sin sorpresas', color: 'green', bullets: ['Precio previo', 'Sin químicos agresivos', 'Trabajo limpio', 'Garantía de intervención'] },
      ],
      localCoverage: {
        title: 'Desatasco de fregaderos en Valencia',
        description: 'Atendemos cocinas particulares, locales de hostelería y apartamentos turísticos.',
      },
      benefitsTitle: 'Por qué llamar',
      benefits: ['Evita inundaciones en cocina', 'Elimina grasa acumulada', 'Revisa si el problema es comunitario', 'Reduce malos olores'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['desatascar fregadero', 'atasco fregadero', 'fregadero atascado', 'precio desatascar fregadero'],
    },
    faqs: [
      { question: '¿Cuánto cuestá desatascar un fregadero?', answer: 'El precio depende de si el atasco está en el sifón, en el tramo de desagüe o en una bajante. Siempre damos presupuesto antes de empezar.' },
      { question: '¿Por qué se atasca el fregadero?', answer: 'Lo más común es acumulación de grasa, restos de comida, jabón y cal. Con el tiempo el diámetro útil se reduce hasta que el agua deja de pasar.' },
      { question: '¿Puedo usar sosa cáustica?', answer: 'No lo recomendamos. Puede generar gases, quemaduras y daños en juntas. Si ya la has usado, avísanos antes de intervenir por seguridad.' },
    ],
  },

  'desatascar-wc': {
    h1: 'Desatascar WC e Inodoro',
    metaTitle: 'Desatascar WC e Inodoro | Urgencias 24h',
    metaDescription: 'Servicio urgente para WC o inodoro atascado. Solución profesional sin dañar la instalación y con presupuesto previo.',
    lockedPrimaryKw: 'desatascar wc',
    secondaryKw: ['desatascar inodoro', 'atasco wc', 'inodoro atascado', 'desatascos wc', 'desatascar water'],
    seoBlockKw: ['desatascar wc', 'desatascar inodoro', 'atasco wc', 'inodoro atascado', 'wc atascado', 'desatascos wc'],
    faqKw: ['que hacer si se atasca el wc', 'como desatascar wc muy atascado', 'precio desatascar wc'],
    contentBrief: 'Página para WC e inodoros atascados, separada de instalación/cambio de inodoros y reparación de cisternas.',
    description: 'Atendemos WC e inodoros atascados con herramientas profesionales, evitando daños en porcelana, juntas y tuberías.',
    seoContent: {
      badge: 'WC atascado',
      title: 'Desatascar WC o Inodoro sin Dañar la Instalación',
      intro: [
        'Un WC atascado es una urgencia sanitaria. Cuando el agua sube, no baja después de tirar de la cadena o incluso rebosa, conviene parar el uso del baño y llamar a un técnico antes de insistir. El bloqueo puede estar en el sifón del inodoro, en el manguito de salida, en la tubería horizontal o en una bajante comunitaria. Esta página trabaja desatascar WC, desatascar inodoro, atasco WC e inodoro atascado; no se mezcla con instalar inodoro ni reparar cisternas.',
        'En Reparar24 actuamos con herramientas específicas para desatascos de WC. No forzamos la porcelana ni desmontamos sin necesidad. Primero valoramos si el atasco es superficial, si hay objeto atrapado, si el agua retorna por ducha o lavabo, o si hay señales de bloqueo general. Según el caso usamos ventosa profesional, guía, máquina rotativa o desmontaje controlado cuando no queda otra opción.',
        'El precio se explica antes de empezar. Si el atasco afecta a varios baños o viviendas, lo tratamos como posible problema de bajante o arqueta y proponemos el equipo adecuado. Al finalizar comprobamos descarga, estanqueidad y evacuación, y te indicamos qué no tirar por el WC: toallitas, compresas, bastoncillos, pañales, arena de gato o exceso de papel.'
      ],
      serviceCards: [
        { icon: Toilet, title: 'Urgencias WC', color: 'blue', bullets: ['Inodoro no traga', 'Agua sube', 'Rebose', 'Mal olor'] },
        { icon: Wrench, title: 'Herramientas seguras', color: 'orange', bullets: ['Ventosa profesional', 'Guía flexible', 'Máquina rotativa', 'Desmontaje si hace falta'] },
        { icon: ShieldCheck, title: 'Separación clara', color: 'green', bullets: ['No es cisterna', 'No es instalación', 'Es obstrucción', 'Prueba de descarga'] },
      ],
      localCoverage: {
        title: 'Desatasco de WC en Valencia',
        description: 'Servicio urgente para viviendas, locales, oficinas y comunidades.',
      },
      benefitsTitle: 'Qué evitamos',
      benefits: ['Reboses y daños por agua', 'Roturas por forzar el inodoro', 'Uso peligroso de químicos', 'Reaparición por causa no diagnosticada'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['desatascar wc', 'desatascar inodoro', 'atasco wc', 'inodoro atascado', 'desatascos wc'],
    },
    faqs: [
      { question: '¿Qué hago si se atasca el WC?', answer: 'No sigas tirando de la cadena. Si el agua sube, espera a que baje y llama. Insistir puede provocar rebose e inundación.' },
      { question: '¿Esto es lo mismo que cambiar un inodoro?', answer: 'No. Cambiar o instalar inodoro pertenece a fontanería. Esta página cubre obstrucciones y atascos del WC o su salida.' },
      { question: '¿Atendéis urgencias de WC por la noche?', answer: 'Sí, los atascos de WC se atienden como urgencia porque pueden dejar un baño inutilizable o causar daños sanitarios.' },
    ],
  },

  'desatascar-lavabo-ducha': {
    h1: 'Desatascar Lavabo y Ducha',
    metaTitle: 'Desatascar Lavabo y Ducha | Desagües Lentos y Mal Olor',
    metaDescription: 'Desatasco de lavabo, ducha y plato de ducha. Eliminamos pelos, jabón, cal y residuos con diagnóstico y presupuesto previo.',
    lockedPrimaryKw: 'desatascar lavabo',
    secondaryKw: ['desatascar ducha', 'atasco lavabo', 'ducha atascada', 'desague ducha atascado', 'limpiar desague ducha', 'desatascador desague ducha'],
    seoBlockKw: ['desatascar lavabo', 'desatascar ducha', 'atasco lavabo', 'ducha atascada', 'desague ducha atascado', 'desatascador desague ducha'],
    faqKw: ['como desatascar una ducha', 'como desatascar un lavabo', 'mal olor desague'],
    contentBrief: 'Página combinada para lavabos y duchas por intención similar: pelos, jabón, sifón y desagüe lento.',
    description: 'Solucionamos lavabos y duchas atascadas por pelo, jabón, cal o residuos acumulados en sifón y desagüe.',
    seoContent: {
      badge: 'Lavabo y ducha',
      title: 'Desatasco de Lavabos, Duchas y Desagües Lentos',
      intro: [
        'Lavabos y duchas suelen atascarse por una mezcla de pelo, jabón, cal, restos de cosméticos y residuos que se quedan en el sifón o en el tramo inicial del desagüe. Primero el agua baja despacio, después aparece mal olor y finalmente el plato de ducha o el lavabo quedan con agua estancada. Esta página agrupa desatascar lavabo y desatascar ducha porque comparten intención de búsqueda y tipo de intervención.',
        'No mezclamos este servicio con instalación de lavabos, cambio de grifos, mamparas o reparación de duchas. Aquí el objetivo es recuperar la evacuación del agua. Revisamos válvula, bote sifónico, sifón, desagüe de plato, rejilla y tubería conectada. Si hay atasco lavabo o desague ducha atascado, separamos primero si el bloqueo está en el sifón o en la salida. Si el bloqueo está cerca, se resuelve con limpieza y desatascador de desagüe de ducha profesional; si está más profundo, usamos guía o máquina adecuada. Cuando el caso lo permite, usamos desatascador desague ducha profesional sin dañar piezas visibles.',
        'También atendemos malos olores persistentes cuando el desagüe queda sucio o el sifón pierde sello de agua. Antes de empezar explicamos precio y alcance. Al finalizar hacemos prueba de caudal y dejamos pautas de mantenimiento para limpiar desague ducha: retirar pelo de rejillas, limpiar filtros y evitar verter productos agresivos que dañen juntas o cromados.'
      ],
      serviceCards: [
        { icon: ShowerHead, title: 'Ducha atascada', color: 'blue', bullets: ['Agua acumulada', 'Pelos y jabón', 'Rejilla obstruida', 'Plato lento'] },
        { icon: Droplets, title: 'Lavabo lento', color: 'cyan', bullets: ['Sifón sucio', 'Mal olor', 'Bote sifónico', 'Retorno'] },
        { icon: Wrench, title: 'Limpieza segura', color: 'orange', bullets: ['Sin dañar piezas', 'Prueba de caudal', 'Presupuesto previo', 'Consejo preventivo'] },
      ],
      localCoverage: {
        title: 'Desatasco de lavabos y duchas en Valencia',
        description: 'Servicio para baños de viviendas, apartamentos turísticos, gimnasios, locales y oficinas.',
      },
      benefitsTitle: 'Señales de aviso',
      benefits: ['El agua tarda en bajar', 'Aparece olor a desagüe', 'La ducha se llena mientras te bañas', 'El lavabo hace ruido al vaciar'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['desatascar lavabo', 'desatascar ducha', 'ducha atascada', 'desague ducha atascado', 'desatascador desague ducha'],
    },
    faqs: [
      { question: '¿Cómo desatascar una ducha sin empeorar el atasco?', answer: 'Primero conviene retirar pelos de la rejilla y no usar químicos agresivos. Normalmente el problema viene por pelo, jabón y cal acumulados en la rejilla, sifón o tramo inicial del desagüe.' },
      { question: '¿Cómo desatascar un lavabo con mal olor desague?', answer: 'Puede ser suciedad acumulada, sifón seco o problema de ventilación. Revisamos el punto antes de proponer solución.' },
      { question: '¿Hay que desmontar el lavabo o la ducha?', answer: 'Solo si el acceso lo requiere. Muchas veces se resuelve limpiando sifón, bote o desagüe con herramienta adecuada.' },
      { question: '¿Un desatascador de desagüe de ducha sirve siempre?', answer: 'Sirve cuando el atasco está cerca de la rejilla o del sifón. Si el agua vuelve, hay mal olor persistente o el bloqueo está en la tubería, conviene usar herramienta profesional.' },
    ],
  },

  'camion-cuba': {
    h1: 'Camión Cuba para Desatascos',
    metaTitle: 'Camión Cuba Desatascos | Arquetas, Bajantes y Saneamiento',
    metaDescription: 'Servicio de camión cuba para desatascos, arquetas, bajantes, colectores y limpieza de saneamiento con alta presión.',
    lockedPrimaryKw: 'camion cuba',
    secondaryKw: ['camion cuba desatascos', 'cuba desatascos', 'cubas desatascos', 'camion desatascos', 'camion cuba precio', 'camion cuba desatascos para que sirve'],
    seoBlockKw: ['camion cuba', 'camion cuba desatascos', 'cuba desatascos', 'camion desatascos', 'alta presion desatascos', 'camion cuba desatascos para que sirve'],
    faqKw: ['camion cuba desatascos precio', 'precio camion cuba', 'precio hora cuba desatasco', 'camion cuba desatascos para que sirve'],
    contentBrief: 'Página profesional para demanda de camión cuba, alta presión, arquetas, colectores y saneamiento.',
    description: 'Camión cuba para desatascos de arquetas, bajantes, colectores y redes de saneamiento con aspiración y alta presión.',
    seoContent: {
      badge: 'Equipo de alta presión',
      title: 'Camión Cuba para Desatascos de Gran Volumen',
      intro: [
        'El camión cuba se utiliza cuando un atasco supera lo que puede resolver una intervención doméstica: arquetas llenas, colectores con lodos, bajantes comunitarias, redes de saneamiento con grasa compactada, garajes inundados o instalaciones donde hay que aspirar residuos antes de limpiar. Esta página trabaja camión cuba, camión cuba desatascos y cuba desatascos como servicio profesional, no como alquiler de maquinaria.',
        'El equipo combina aspiración de gran caudal y agua a presión para extraer residuos, limpiar paredes interiores y recuperar el paso en arquetas, pozos, acometidas o tramos comunitarios. Tambien usamos alta presion desatascos cuando la red necesita arrastre continuo. Antes de desplazar una unidad de saneamiento valoramos acceso, volumen, tipo de residuo, distancia al punto de trabajo y necesidad de gestionar residuos en planta autorizada. Así el presupuesto es realista y el cliente sabe qué incluye.',
        'Es un servicio habitual para comunidades, administradores de fincas, restaurantes, naves, parkings, hoteles y edificios con saneamiento antiguo. Cuando hace falta camion desatascos, coordinamos acceso y gestion del residuo antes de intervenir. Si te preguntas para qué sirve un equipo cuba de desatascos, la respuesta es clara: aspirar residuos y limpiar con presión cuando hay volumen, lodos o una red general afectada. Si basta con una máquina más pequeña, lo decimos; si hace falta cuba, explicamos por qué.'
      ],
      serviceCards: [
        { icon: Truck, title: 'Aspiración', color: 'blue', bullets: ['Arquetas llenas', 'Lodos', 'Pozos', 'Garajes'] },
        { icon: Gauge, title: 'Alta presión', color: 'orange', bullets: ['Colectores', 'Bajantes', 'Acometidas', 'Grasa compactada'] },
        { icon: ShieldCheck, title: 'Trabajo profesional', color: 'green', bullets: ['Gestión de residuos', 'Presupuesto previo', 'Servicio a comunidades', 'Documentación'] },
      ],
      localCoverage: {
        title: 'Equipo cuba en Valencia',
        description: 'Cobertura para comunidades, hostelería, industria ligera y saneamiento urbano según disponibilidad.',
      },
      benefitsTitle: 'Cuándo hace falta',
      benefits: ['Arquetas desbordadas', 'Bajantes comunitarias colapsadas', 'Colectores con lodos', 'Necesidad de aspirar residuos'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['camion cuba', 'camion cuba desatascos', 'cuba desatascos', 'alta presion desatascos', 'camion cuba desatascos para que sirve'],
    },
    faqs: [
      { question: '¿Cuánto cuestá una cuba para desatascos?', answer: 'Depende del desplazamiento, acceso, volumen a aspirar, tiempo de trabajo y gestión de residuos. Damos presupuesto antes de desplazar el equipo.' },
      { question: '¿Cuándo no hace falta equipo cuba?', answer: 'Si el atasco está en un sifón, WC o fregadero individual, normalmente basta con herramienta de desatasco. La cuba se reserva para volumen, arquetas, colectores y redes generales.' },
      { question: '¿Para qué sirve un camión cuba de desatascos?', answer: 'Sirve para aspirar agua, lodos o residuos y limpiar con alta presión arquetas, colectores, bajantes o redes de saneamiento que no se resuelven con herramienta doméstica. El precio camion cuba depende del acceso, volumen y tiempo necesario.' },
      { question: '¿Trabajáis con comunidades?', answer: 'Sí. Podemos coordinar con administradores, presidentes de comunidad y negocios que necesitan limpieza o desatasco documentado.' },
    ],
  },

  'limpieza-fosas-septicas': {
    h1: 'Limpieza de Fosas Sépticas',
    metaTitle: 'Limpieza de Fosas Sépticas | Vaciado y Mantenimiento',
    metaDescription: 'Limpieza y vaciado de fosas sépticas con camión cuba, gestión de residuos y presupuesto previo.',
    lockedPrimaryKw: 'limpieza fosas septicas',
    secondaryKw: ['limpieza fosa septica', 'limpiar fosa septica', 'vaciar fosa septica precio', 'limpieza fosa septica precio', 'servicio de limpieza de fosa septica precio'],
    seoBlockKw: ['limpieza fosas septicas', 'limpieza fosa septica', 'limpiar fosa septica', 'vaciado fosas septicas', 'precio vaciar fosa septica', 'servicio de limpieza de fosa septica precio'],
    faqKw: ['vaciar fosa septica precio', 'limpieza fosa septica precio', 'servicio de limpieza de fosa septica precio', 'cada cuanto limpiar fosa septica'],
    contentBrief: 'Página para limpieza/vaciado de fosas sépticas y mantenimiento con camión cuba.',
    description: 'Realizamos limpieza, vaciado y mantenimiento de fosas sépticas con camión cuba y gestión correcta de residuos.',
    seoContent: {
      badge: 'Fosas sépticas',
      title: 'Limpieza y Vaciado de Fosas Sépticas',
      intro: [
        'La limpieza de fosas sépticas requiere camión cuba, aspiración controlada y gestión responsable de residuos. No es un desatasco doméstico: hablamos de retirar lodos, grasas, aguas residuales y sólidos acumulados para que la instalación vuelva a funcionar sin olores, reboses ni riesgo sanitario. Esta página trabaja limpieza fosas sépticas, limpieza fosa séptica, limpiar fosa séptica y precio vaciar fosa séptica.',
        'Antes de presupuestar revisamos acceso para el camión, distancia hasta la fosa, volumen aproximado, estado de la tapa, frecuencia de mantenimiento y señales de saturación. Si la fosa se llena demasiado rápido puede haber entrada de pluviales, filtraciones, problema de drenaje o uso superior al previsto. En esos casos no solo vaciamos: explicamos qué conviene revisar para evitar repetición.',
        'El servicio está pensado para viviendas aisladas, chalets, fincas, restaurantes, instalaciones rurales y pequeños negocios que dependen de una fosa o depósito. Coordinamos la retirada, limpieza, transporte y entrega de residuos según normativa aplicable. El precio se comunica antes de intervenir y puede variar por volumen, acceso y urgencia.'
      ],
      serviceCards: [
        { icon: Truck, title: 'Vaciado con cuba', color: 'blue', bullets: ['Aspiración', 'Lodos', 'Aguas residuales', 'Transporte'] },
        { icon: Droplets, title: 'Mantenimiento', color: 'green', bullets: ['Evitar reboses', 'Reducir olores', 'Control de nivel', 'Revisión básica'] },
        { icon: ShieldCheck, title: 'Gestión segura', color: 'orange', bullets: ['Residuos autorizados', 'Presupuesto previo', 'Trabajo limpio', 'Servicio programado'] },
      ],
      localCoverage: {
        title: 'Limpieza de fosas sépticas en Valencia y alrededores',
        description: 'Servicio programado o urgente según acceso, volumen y disponibilidad de camión cuba.',
      },
      benefitsTitle: 'Cuándo llamar',
      benefits: ['Mal olor persistente', 'Nivel alto de la fosa', 'Rebose o retorno', 'Mantenimiento anual o periódico'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza fosas septicas', 'limpieza fosa septica', 'vaciar fosa septica precio', 'limpieza fosa septica precio', 'servicio de limpieza de fosa septica precio'],
    },
    faqs: [
      { question: '¿Cada cuánto hay que limpiar una fosa séptica?', answer: 'Depende del tamaño y uso. En viviendas habituales suele revisarse al menos una vez al año; con alto uso o negocios puede ser necesario antes.' },
      { question: '¿Cuánto cuestá vaciar una fosa séptica?', answer: 'El precio depende del volumen, acceso, distancia de manguera y gestión de residuos. Se presupuesta antes de desplazar el camión cuba.' },
      { question: '¿La limpieza elimina los malos olores?', answer: 'Si el olor procede de saturación o lodos acumulados, sí. Si hay ventilación deficiente o problema estructural, lo indicamos tras revisar.' },
    ],
  },
}



