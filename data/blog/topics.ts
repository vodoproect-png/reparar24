import type { BlogArticleBrief, BlogCategory } from './types'
import { DAILY_BLOG_ARTICLES_2026_06_19 } from './daily-articles-2026-06-19.ts'
import { DAILY_BLOG_ARTICLES_2026_06_20 } from './daily-articles-2026-06-20.ts'
import { DAILY_BLOG_ARTICLES_2026_06_21 } from './daily-articles-2026-06-21.ts'
import { DAILY_BLOG_ARTICLES_2026_06_22 } from './daily-articles-2026-06-22.ts'
import { DAILY_BLOG_ARTICLES_2026_06_23 } from './daily-articles-2026-06-23.ts'
import { DAILY_BLOG_ARTICLES_2026_06_24 } from './daily-articles-2026-06-24.ts'
import { DAILY_BLOG_ARTICLES_2026_06_25 } from './daily-articles-2026-06-25.ts'

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'fontaneria',
    title: 'Guía de fontanería',
    description: 'Averías, mantenimiento y decisiones prÁcticas antes de llamar a un fontanero.',
    serviceSlug: 'fontanero',
  },
  {
    slug: 'electricidad',
    title: 'Guía de electricidad',
    description: 'Seguridad eléctrica, averías frecuentes y revisiones recomendadas.',
    serviceSlug: 'electricista',
  },
  {
    slug: 'desatascos',
    title: 'Guía de desatascos',
    description: 'Atascos, saneamiento, camión cuba y mantenimiento preventivo.',
    serviceSlug: 'desatascos',
  },
  {
    slug: 'climatizacion',
    title: 'Guía de aire acondicionado',
    description: 'Instalación, averías y mantenimiento de equipos de climatización.',
    serviceSlug: 'aire-acondicionado',
  },
  {
    slug: 'calefaccion',
    title: 'Guía de calefacción',
    description: 'Calderas, radiadores, presión, mantenimiento y seguridad.',
    serviceSlug: 'calefaccion',
  },
  {
    slug: 'saneamiento',
    title: 'Guía de limpieza de tuberías',
    description: 'Bajantes, arquetas, cÁmara CCTV y mantenimiento para comunidades y empresas.',
    serviceSlug: 'limpieza-tuberias',
  },
]

export const BLOG_ARTICLE_BRIEFS: BlogArticleBrief[] = [
  {
    slug: 'que-hacer-fuga-agua-casa',
    categorySlug: 'fontaneria',
    serviceSlug: 'fontanero',
    title: '¿Qué hacer si tienes una fuga de agua en casa?',
    h1: '¿Qué hacer si tienes una fuga de agua en casa?',
    description: 'Guía prÁctica para frenar la pérdida, proteger la vivienda y decidir si hace falta asistencia urgente.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'fontaneria-fuga-agua-casa',
    primaryKeyword: 'que hacer fuga de agua casa',
    secondaryKeywords: ['fuga de agua en casa', 'como cortar fuga de agua', 'fuga agua urgente'],
    commercialOwner: '/fontanero/reparacion-fugas',
    supportLinks: ['/fontanero'],
    outline: ['Cortar la llave de paso', 'Evitar electricidad cerca del agua', 'Identificar si la fuga es visible u oculta', 'Cuando llamar a un profesional'],
    bodySections: [
      {
        heading: 'Primeros minutos: controlar el agua sin improvisar',
        paragraphs: [
          'Cuando aparece agua donde no deberia, la primera decision no es buscar la averia exacta, sino bajar el impacto. Si no tienes claro el origen, actua sobre el corte principal de la vivienda. Si el escape esta muy localizado en un sanitario, termo, fregadero o aparato concreto, intenta aislar solo esa linea para no dejar toda la casa sin servicio mas tiempo del necesario.',
          'No es buena idea desmontar conexiones mientras la instalacion conserva presion. Una junta que parecia estable puede soltarse del todo y transformar una perdida lenta en un escape abierto. Primero se reduce el caudal, despues se seca lo visible y solo entonces tiene sentido observar si el origen esta en una union, una fisura, un desague o una conduccion oculta.',
        ],
      },
      {
        heading: 'Senales de que la fuga puede estar oculta',
        paragraphs: [
          'No todas las fugas se anuncian con un chorro. A veces se descubren por una sombra humeda que avanza, un rodapie que se hincha, una zona templada en el pavimento, olor persistente o consumo de agua sin uso aparente. Cuando las pistas son indirectas, conviene pensar en fuga oculta y evitar abrir paredes sin una comprobacion previa.',
          'Si la perdida puede estar dentro de pared, suelo o techo, no abras rozas por intuicion. Una localizacion ordenada permite acotar el punto, decidir si basta reparar una seccion o si hay que revisar mas instalacion, y reducir danos. En Valencia es habitual encontrar banos reformados sobre instalaciones antiguas, terrazas cerradas y cocinas con recorridos modificados; por eso cada prueba debe tener una razon.',
        ],
      },
      {
        heading: 'Riesgos que hay que evitar',
        paragraphs: [
          'Si hay enchufes, regletas, electrodomesticos, termo electrico o cuadro cerca de la zona mojada, trata la averia como un problema de seguridad, no solo de fontaneria. Desconecta esa parte de la instalacion si puedes hacerlo desde un lugar seco. No uses secadores, alargadores ni herramientas conectadas para acelerar el secado.',
          'Tampoco es buena idea aplicar siliconas, cintas o masillas sobre una fuga activa sin saber la presion ni el material de la tuberia. Estos parches pueden servir unos minutos en situaciones muy controladas, pero suelen ocultar el problema y complicar la reparacion. Si el agua vuelve a salir al abrir la llave, la fuga necesita una solucion mecanica, no solo cubrir la superficie.',
        ],
      },
      {
        heading: '¿Cuando llamar a un fontanero?',
        paragraphs: [
          'Conviene llamar a un fontanero cuando no consigues limitar la perdida, cuando la humedad continua extendiendose, cuando aparece consumo sin uso real de agua o cuando el dano alcanza otra vivienda, local o zona comun. Tambien es recomendable pedir ayuda si intervienen cisternas encastradas, bajantes, termos, grupos de presion o tuberias empotradas.',
          'En Reparar24 trabajamos con diagnostico previo, explicacion de la solucion y presupuesto antes de intervenir. Para una fuga de agua en casa, el objetivo no es solo cortar la perdida visible, sino confirmar que la instalacion queda estable y que no hay otro punto deteriorado que pueda provocar una repeticion en pocos dias.',
        ],
      },
      {
        heading: '¿Como documentar la fuga antes de la visita?',
        paragraphs: [
          'Si la situacion esta bajo control, toma algunas fotos de la zona afectada, del punto visible y del contador si sospechas consumo anormal. No necesitas un informe tecnico, pero esas imagenes ayudan a explicar si la fuga aumenta, si solo aparece al usar un sanitario o si continua aun sin abrir ningun grifo. En edificios, tambien facilitan comunicar el incidente al administrador o al seguro.',
          'Anota la hora aproximada en la que detectaste la fuga y si hubo algun uso previo: ducha, lavadora, lavavajillas, cisterna, riego de terraza o termo. Estos detalles orientan mucho. Una fuga que aparece al ducharse puede estar relacionada con desague, plato, mampara o junta. Una fuga que aparece sin usar nada suele apuntar mas a presion, tuberia de agua limpia o mecanismo que no cierra.',
        ],
      },
      {
        heading: 'Fuga visible, fuga de desague y fuga de presion',
        paragraphs: [
          'No todas las fugas se reparan igual. Una fuga visible en un latiguillo, llave de paso o conexion suele localizarse rapido porque el agua sale por el propio punto de union. Una fuga de desague puede aparecer solo cuando se usa el lavabo, fregadero, ducha o lavadora, y muchas veces huele distinto porque arrastra restos de jabon o residuos. Una fuga de presion puede perder agua de forma constante aunque no haya ningun grifo abierto.',
          'Distinguir estos escenarios evita intervenciones equivocadas. Si la perdida solo aparece al evacuar agua, abrir una pared para buscar suministro puede no tener sentido. Si existe consumo sin uso, centrarse solo en el desague tampoco seria suficiente. El diagnostico ordenado permite decidir entre cambiar una pieza accesible, reparar una seccion o localizar una fuga oculta con herramientas especificas.',
        ],
      },
      {
        heading: '¿Que hacer si la fuga afecta a vecinos?',
        paragraphs: [
          'Si la humedad llega al techo de otra vivienda, a un local inferior o a una zona comun, hay que reducir el uso de agua y avisar cuanto antes. Aunque el origen no este confirmado, esperar suele aumentar danos y complica la gestion. En un edificio, informa al presidente o administrador y evita usar banos, cocina o lavadora hasta saber si el problema pertenece a tu vivienda o a una bajante comunitaria.',
          'En estos casos es importante no prometer una causa antes de revisar. Una mancha bajo un bano puede venir de un desague, una junta, una tuberia de agua limpia, un sellado de ducha o una bajante. El tecnico debe comprobar el origen, explicar si corresponde a vivienda o comunidad y dejar claro que actuacion resuelve la perdida sin desplazar el problema a otro punto.',
        ],
      },
      {
        heading: 'Prevencion despues de reparar la fuga',
        paragraphs: [
          'Despues de reparar, observa la zona varios dias, sobre todo si hubo humedad en pared, techo, suelo o mueble. Que el agua deje de salir no significa que el material este seco. Ventilar, revisar olor y comprobar que la marca no avanza ayuda a confirmar que la averia quedo cerrada. Si la humedad crece, puede quedar otro punto activo.',
          'Tambien es buen momento para revisar llaves de paso, latiguillos, juntas antiguas y mecanismos de cisterna cercanos. Muchas fugas domesticas no aparecen de forma aislada: una instalacion envejecida puede tener varias piezas al limite. Reparar la averia principal y detectar elementos debiles reduce urgencias futuras y evita que una pequena perdida vuelva a convertirse en dano visible.',
        ],
      },
      {
        heading: '¿Que informacion ayuda a preparar el presupuesto?',
        paragraphs: [
          'Para preparar una intervencion con presupuesto previo, ayuda saber si la fuga esta visible, si el agua sale limpia o sucia, si afecta a pared, techo, mueble o suelo, y si hay acceso directo al punto. Tambien es util indicar la antiguedad aproximada de la instalacion, si hubo reformas recientes y si la vivienda tiene llaves de corte por zonas. Cuanto mas claro sea el contexto, mas facil es evitar desplazamientos sin material adecuado.',
          'En una fuga urgente no siempre se puede cerrar el diagnostico por telefono, pero si se puede ordenar la visita: cortar agua, proteger la zona, valorar riesgo electrico y decidir que herramienta o recambio puede hacer falta. Este enfoque reduce improvisacion y permite que la reparacion se centre en resolver la causa, no solo en secar el sintoma visible.',
          'Si la fuga ya esta contenida, no reabras el suministro solo para comprobar si "todavia sale". Esa prueba puede agrandar la humedad y hacer mas dificil distinguir el origen real.',
        ],
      },
      {
        heading: '¿Como cortar fuga de agua sin perder tiempo?',
        paragraphs: [
          'Si buscas que hacer fuga de agua casa, la respuesta practica empieza por una ruta corta: localizar el corte, cerrar, secar y observar. En pisos con llave general accesible, ese paso evita que el dano avance mientras llega ayuda. En viviendas con varias llaves, prueba primero la del bano, cocina, termo o zona afectada para mantener servicio en el resto de la casa si el escape queda aislado.',
          'Cuando no sabes como cortar fuga de agua porque la llave esta dura, escondida o no cierra del todo, no la fuerces con herramientas grandes. Una llave partida puede dejar la vivienda sin control. En una fuga agua urgente, cerrar el contador o avisar a la comunidad puede ser mas seguro que manipular piezas antiguas bajo presion.',
        ],
      },
      {
        heading: '¿Como detectar fuga de agua antes de romper?',
        paragraphs: [
          'Para como detectar fuga de agua en casa, combina tres datos: consumo sin uso, avance de humedad y relacion con aparatos. Si el contador se mueve con todos los grifos cerrados, la sospecha gana fuerza. Si la mancha solo aparece al ducharse, el foco puede estar en desague, sellado o plato. Si aparece sin usar nada, puede venir de una tuberia de presion.',
          'Detectar fuga de agua sin romper exige evitar decisiones por intuicion. Primero se acota la zona, despues se revisan llaves, latiguillos, juntas, sanitarios, termo y recorridos probables. Si la fuga esta en terraza, jardin o una linea enterrada, como localizar una fuga de agua en una tuberia enterrada depende de pruebas ordenadas y no de abrir suelo al azar.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo saber si tengo una fuga oculta?',
        answer: 'Deja la vivienda sin consumo de agua unos minutos y observa si el contador registra movimiento. Tambien revisa sombras humedas, olor persistente, pintura abombada o suelos con temperatura rara.',
      },
      {
        question: '¿Puedo reparar una fuga con cinta o silicona?',
        answer: 'Puede servir solo como recurso temporal en una perdida minima y accesible. Si hay presion, humedad oculta o la fuga reaparece al abrir el agua, hace falta reparacion profesional.',
      },
      {
        question: '¿CuÁndo es urgente llamar a un fontanero?',
        answer: 'Es urgente cuando no logras contener la perdida, hay elementos electricos cerca, afecta a vecinos o la humedad sigue avanzando despues de cerrar cortes locales.',
      },
    ],
    llmAnswer: 'Ante una fuga de agua, primero limita el suministro, separa la zona de cualquier riesgo electrico y pide ayuda profesional si la perdida no queda aislada.',
  },
  {
    "slug": "cuanto-cuesta-fontanero-valencia",
    "categorySlug": "fontaneria",
    "serviceSlug": "fontanero",
    "title": "¿CuÁnto cuesta un fontanero en Valencia?",
    "h1": "¿CuÁnto cuesta un fontanero en Valencia?",
    "description": "Factores que influyen en el precio de un fontanero y cómo evitar sorpresas antes de contratar.",
    "intent": "cost",
    "status": "published",
    "indexing": "index",
    "publishedAt": "2026-06-18",
    "updatedAt": "2026-06-18",
    "originalityStatus": "external-passed",
    "semanticStatus": "approved",
    "semanticClusterId": "fontaneria-coste-fontanero-valencia",
    "primaryKeyword": "cuanto cuesta un fontanero en valencia",
    "secondaryKeywords": [
      "precio fontanero valencia",
      "tarifa fontanero urgente",
      "fontanero presupuesto previo"
    ],
    "commercialOwner": "/fontanero",
    "supportLinks": [
      "/fontanero/reparacion-fugas",
      "/fontanero/reparacion-cisternas"
    ],
    "outline": [
      "Tipo de averia",
      "Urgencia y horario",
      "Materiales y desplazamiento",
      "Presupuesto previo"
    ],
    "bodySections": [
      {
        "heading": "Por que no existe un precio unico para un fontanero",
        "paragraphs": [
          "La pregunta cuanto cuesta un fontanero en Valencia parece sencilla, pero la respuesta depende de lo que realmente haya que resolver. No cuesta lo mismo ajustar una cisterna accesible que localizar una fuga oculta, cambiar una llave de paso antigua o reparar una tuberia empotrada. El precio cambia porque cambian el tiempo, el riesgo, el material y la forma de llegar al punto averiado.",
          "Un presupuesto serio no deberia basarse solo en una frase como pierde agua o gotea. Primero hay que saber si la averia esta visible, si el agua sale con presion, si afecta a otra vivienda, si hay que cortar suministro, si hace falta desmontar mueble o sanitario y si el material esta deteriorado. Cuanto mas claro sea el diagnostico inicial, menos margen hay para sorpresas durante la visita."
        ]
      },
      {
        "heading": "Factores que mas influyen en el precio",
        "paragraphs": [
          "El precio fontanero Valencia suele depender de cinco variables: tipo de incidencia, urgencia, accesibilidad, material necesario y tiempo de intervencion. Una reparacion sencilla en horario normal puede resolverse con una pieza comun. Una fuga dentro de pared, una llave bloqueada o una averia que afecta a vecinos exige mas comprobaciones y puede requerir herramientas especificas.",
          "Tambien influye el estado de la instalacion. En viviendas antiguas, una pieza aparentemente simple puede estar unida a tuberias rigidas, roscas gastadas o llaves que no cierran. Forzar sin revisar puede provocar una fuga mayor. Por eso el profesional debe explicar si conviene reparar solo el punto visible o sustituir un tramo, una valvula o un mecanismo completo."
        ]
      },
      {
        "heading": "Urgencia, horario y desplazamiento",
        "paragraphs": [
          "La tarifa fontanero urgente no se calcula igual que una visita programada. Si la averia ocurre por la noche, en festivo o con riesgo de dano a otra vivienda, el servicio necesita respuesta rapida y prioridad de agenda. Esa urgencia puede afectar al coste, pero tambien evita que una perdida de agua siga danando techo, pared, mueble o instalacion electrica cercana.",
          "El desplazamiento dentro de Valencia y alrededores tambien forma parte de la organizacion del servicio. Lo importante es que el cliente sepa antes de aceptar si existe coste de visita, si se descuenta al realizar la reparacion, que incluye el diagnostico y que queda fuera. La transparencia en este punto evita malentendidos y ayuda a comparar presupuestos reales, no solo precios sueltos."
        ]
      },
      {
        "heading": "Materiales y piezas que pueden cambiar el presupuesto",
        "paragraphs": [
          "En fontaneria, muchas reparaciones dependen de piezas pequenas: juntas, latiguillos, flotadores, mecanismos de descarga, sifones, llaves de escuadra, valvulas o tramos de tuberia. El material puede ser barato, pero la mano de obra cambia si hay que desmontar, adaptar medidas, cortar suministro, sanear una conexion antigua o comprobar estanqueidad despues de intervenir.",
          "No siempre conviene elegir la solucion mas barata. Si una cisterna pierde agua porque la junta esta deformada, cambiar solo la goma puede bastar. Si el mecanismo completo esta fatigado, reparar una pieza puede dejar otra al limite. Un buen presupuesto explica la diferencia entre reparacion minima, sustitucion recomendada y trabajo preventivo para evitar otra visita en pocos dias."
        ]
      },
      {
        "heading": "Como pedir un presupuesto util",
        "paragraphs": [
          "Para recibir un fontanero presupuesto previo con sentido, conviene enviar informacion concreta: que ocurre, desde cuando, si la fuga es continua o aparece al usar un aparato, si hay llave de paso accesible, si afecta a vecinos y si puedes mandar fotos. No hace falta saber el nombre tecnico de la pieza. Basta describir el sintoma con claridad.",
          "Las fotos ayudan mucho cuando muestran el punto de agua, el entorno y el acceso. Una imagen demasiado cerca de la fuga puede no explicar si hay mueble, sanitario, pared o tubo oculto. Si se trata de un termo, cisterna, fregadero o lavabo, una foto general y otra del detalle permiten preparar mejor el material y reducir improvisacion."
        ]
      },
      {
        "heading": "Cuando un precio bajo puede salir caro",
        "paragraphs": [
          "Un precio muy bajo sin diagnostico puede ocultar limites importantes: no incluye desplazamiento, no incluye material, no cubre urgencia, no contempla desmontaje o solo sirve para averias muy simples. El problema no es que existan trabajos economicos, sino aceptar una cifra cerrada cuando todavia no se sabe si la reparacion es accesible, visible o segura.",
          "Tambien puede salir caro resolver solo el sintoma. Si una fuga aparece en una conexion deteriorada y se aprieta sin revisar el conjunto, quiza deje de gotear unas horas, pero vuelva a fallar con presion. La reparacion correcta debe dejar la instalacion estable, explicar que se ha cambiado y comprobar que no aparece agua al volver a abrir suministro."
        ]
      },
      {
        "heading": "Diferencia entre visita, diagnostico y reparacion",
        "paragraphs": [
          "Conviene distinguir tres cosas. La visita es el desplazamiento y la revision inicial. El diagnostico es la identificacion razonada de la causa. La reparacion es la actuacion sobre la pieza, tramo o mecanismo que provoca el problema. En averias simples, las tres fases pueden resolverse en una misma intervencion. En fugas ocultas o instalaciones antiguas, el diagnostico puede requerir mas pruebas.",
          "Preguntar que incluye cada fase ayuda a comparar presupuestos. Si un profesional explica el alcance antes de empezar, el cliente puede decidir con mas tranquilidad. En Reparar24 la idea es clara: revisar, explicar la solucion, confirmar presupuesto y actuar cuando el cliente acepta. Para una averia de agua, ese orden evita trabajos innecesarios."
        ]
      },
      {
        "heading": "Precio orientativo y decision practica",
        "paragraphs": [
          "Mas que buscar una cifra universal, conviene pensar en rangos segun el caso: ajuste o sustitucion de pieza accesible, reparacion de fuga visible, desatasco asociado a fontaneria, intervencion urgente o trabajo con desmontaje. Cada escenario tiene una logica distinta. La clave es que el precio final este vinculado a una causa concreta, no a una promesa generica.",
          "Si tienes una averia activa, lo mas util es cortar el agua si puedes, evitar manipular piezas bajo presion y pedir valoracion. Si el problema no es urgente, una visita programada permite revisar con calma, preparar material y ordenar el trabajo. En ambos casos, el objetivo es el mismo: saber que se va a hacer, cuanto cuesta y por que esa solucion es la adecuada."
        ]
      },
      {
        "heading": "Como preparar la visita para ajustar el precio",
        "paragraphs": [
          "Antes de que llegue el fontanero, hay pequenos pasos que ayudan a que la visita sea mas rapida y el presupuesto mas preciso. Deja libre el acceso al punto afectado, localiza si puedes la llave de paso, evita usar el sanitario o aparato que provoca la perdida y apunta si el problema ocurre siempre o solo en momentos concretos. Esa informacion reduce pruebas innecesarias y permite centrar la revision en la causa probable.",
          "Tambien conviene explicar si hubo reparaciones recientes, si la vivienda es antigua, si la averia ya se intento solucionar con un parche o si el problema afecta a otra vivienda. Un profesional puede trabajar mejor cuando sabe si se enfrenta a una fuga nueva, una instalacion envejecida o una reparacion anterior mal resuelta. Preparar estos datos no sustituye el diagnostico, pero si ayuda a evitar desplazamientos sin material adecuado.",
          "Si comparas varias opciones, pide que todas hablen del mismo alcance. No es lo mismo cambiar una junta que sustituir un mecanismo completo, ni reparar una fuga visible que localizar una perdida oculta. Un presupuesto claro debe permitir entender por que se cobra, que riesgo queda resuelto y que garantia practica tiene la intervencion.",
          "Tambien es util preguntar que pasa si al abrir la zona aparece un problema distinto. En fontaneria puede descubrirse una llave que no cierra, una rosca deteriorada, una tuberia con corrosion o una pieza descatalogada. Un presupuesto honesto debe explicar como se actualiza el alcance si la averia real no coincide con la primera sospecha, y debe pedir confirmacion antes de ampliar el trabajo.",
          "En comunidades o pisos con vecinos debajo, conviene guardar fotos, hora de aviso y descripcion de la mancha o fuga. Esa documentacion ayuda al seguro, al administrador y al tecnico. No cambia el precio por si sola, pero evita discusiones sobre origen, alcance y urgencia cuando hay que decidir rapido.",
          "Si la averia ya no pierde agua, no conviene ocultarla hasta que vuelva a fallar. Una visita programada suele ser mas tranquila, permite revisar piezas cercanas y evita pagar urgencia cuando el problema se puede resolver antes de convertirse en dano visible.",
          "La mejor referencia de precio es siempre una causa identificada, no una tarifa aislada."
        ]
      },
      {
        "heading": "Ejemplos de trabajos que no se deben comparar como si fueran iguales",
        "paragraphs": [
          "Un ajuste de flotador, un cambio de latiguillo, una reparacion de cisterna, una fuga bajo fregadero y una perdida dentro de pared pertenecen a niveles distintos de trabajo. Algunos casos se resuelven con una pieza accesible y una prueba de estanqueidad. Otros requieren localizar el origen, desmontar, cortar suministro, adaptar conexiones y comprobar que no queda humedad activa. Por eso una tarifa plana puede servir para orientar, pero no para decidir sin diagnostico.",
          "Tambien cambia el precio cuando el problema afecta a una comunidad o a un vecino. Si hay filtracion hacia otra vivienda, el tecnico debe valorar origen, zona humeda, posible recorrido del agua y urgencia real. A veces la reparacion de la pieza es sencilla, pero la comprobacion del dano exige mas tiempo. En estos casos conviene documentar fotos, hora de aviso y zonas afectadas antes de aceptar una solucion rapida.",
          "En viviendas reformadas parcialmente aparece otro escenario: piezas nuevas conectadas a tramos antiguos. Un grifo nuevo puede estar unido a llaves viejas; una cisterna moderna puede depender de una toma deteriorada; un termo sustituido puede mostrar problemas en la valvula o en la presion. El precio debe contemplar esa frontera entre material reciente y red existente.",
          "La conclusion practica es sencilla: el cliente no necesita memorizar tarifas de fontaneria, sino pedir un presupuesto que relacione precio, causa y alcance. Si la explicacion no permite entender que se va a reparar, que pieza se usara y que comprobacion final se hara, la cifra todavia no es suficiente para tomar una buena decision."
        ]
      },
      {
        "heading": "Como decidir si pedir visita urgente o programada",
        "paragraphs": [
          "La urgencia no depende solo de la incomodidad. Hay casos donde esperar puede multiplicar el dano: agua que cae hacia otra vivienda, fuga cerca de enchufes, llave de paso que no cierra, termo que pierde por la valvula o humedad que crece en pared. En esos escenarios, pagar una intervencion prioritaria puede ser mas razonable que esperar a que el problema sea visible en mas zonas.",
          "En cambio, un grifo que gotea poco, una cisterna que rellena de vez en cuando o un sifon con pequena perdida pueden organizarse como visita programada si el agua esta controlada. Esta diferencia ayuda a controlar el presupuesto sin negar el problema. La decision correcta no es siempre llamar con urgencia, sino entender si existe riesgo activo.",
          "Si dudas, explica el sintoma con honestidad: cantidad de agua, ubicacion, tiempo desde que empezo, si puedes cerrar una llave local y si hay vecinos afectados. Con esos datos se puede orientar mejor la prioridad y preparar material antes de acudir. Una buena gestion de la urgencia tambien forma parte del precio final."
        ]
      }
    ],
    "faq": [
      {
        "question": "¿Por que varia tanto el precio de un fontanero?",
        "answer": "Porque no todas las averias tienen el mismo acceso, urgencia, material ni riesgo. Una pieza visible no se presupuesta igual que una fuga oculta o una reparacion que afecta a vecinos."
      },
      {
        "question": "¿Se puede saber el precio exacto por telefono?",
        "answer": "A veces se puede orientar, pero el precio exacto depende del diagnostico. Fotos, descripcion del sintoma y acceso ayudan a preparar un presupuesto mas fiable."
      },
      {
        "question": "¿Que debe incluir un presupuesto de fontaneria?",
        "answer": "Debe explicar desplazamiento, diagnostico, mano de obra, materiales, urgencia si aplica y alcance de la reparacion antes de empezar el trabajo."
      }
    ],
    "llmAnswer": "El precio de un fontanero en Valencia depende del tipo de averia, urgencia, acceso, materiales y tiempo de reparacion. Lo mas seguro es pedir diagnostico y presupuesto previo antes de intervenir."
  },
  {
    slug: 'por-que-gotea-cisterna',
    categorySlug: 'fontaneria',
    serviceSlug: 'fontanero',
    title: '¿Por qué gotea una cisterna y cómo detectarlo?',
    h1: '¿Por qué gotea una cisterna y cómo detectarlo?',
    description: 'Causas habituales de una cisterna que pierde agua y señales de que conviene reparar el mecanismo.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'fontaneria-cisterna-pierde-agua',
    primaryKeyword: 'cisterna gotea',
    secondaryKeywords: ['cisterna pierde agua', 'reparar mecanismo cisterna', 'wc pierde agua'],
    commercialOwner: '/fontanero/reparacion-cisternas',
    diagnosticScenarioId: 'cisterna-gotea',
    diagnosticPlacement: 'after-hero',
    outline: ['Flotador mal regulado', 'Junta desgastada', 'Mecanismo de descarga', 'Consumo de agua oculto'],
    bodySections: [
      {
        heading: '¿Por que una cisterna empieza a perder agua?',
        paragraphs: [
          'Una cisterna que gotea suele avisar con un hilo continuo dentro del inodoro, un ruido de carga cada pocos minutos o una factura de agua mas alta sin cambiar los habitos de consumo. El fallo mas habitual esta en el cierre del mecanismo de descarga, en la junta inferior o en el flotador que no corta la entrada de agua en el nivel correcto.',
          'Aunque parezca una averia menor, una cisterna perdiendo agua puede desperdiciar muchos litros al dia. En algunos banos el ruido apenas se oye, especialmente de noche o con la puerta cerrada, y el problema se mantiene durante semanas. Por eso conviene revisar la cisterna cuando el agua corre sin usar el WC o cuando el deposito se rellena solo.',
        ],
      },
      {
        heading: '¿Como detectar si el problema es de entrada o de descarga?',
        paragraphs: [
          'Si el agua rebosa por el tubo central o el deposito no deja de llenarse, el problema suele estar en la entrada: flotador, valvula o regulacion de altura. En cambio, si el deposito se llena bien pero el agua se escapa hacia la taza, el origen suele estar en la descarga: junta, campana, mecanismo mal asentado o suciedad que impide cerrar. La busqueda cisterna gotea casi siempre termina en una de estas dos familias de fallo.',
          'Una prueba sencilla es cerrar la llave de paso de la cisterna y observar si el nivel baja. Si baja sin usar el inodoro, hay una perdida hacia la taza. Si no baja pero al abrir vuelve a cargar sin parar, la entrada no esta cortando correctamente. Esta observacion ayuda a explicar el problema al tecnico y acelera la reparacion.',
        ],
      },
      {
        heading: '¿Cuando conviene reparar y cuando sustituir piezas?',
        paragraphs: [
          'En cisternas recientes, muchas averias se resuelven cambiando una junta, ajustando el flotador o sustituyendo el mecanismo de descarga. En modelos antiguos, piezas deformadas por cal, plastico debilitado o tornillos oxidados pueden hacer mas razonable cambiar el conjunto completo. La decision depende del estado real, no solo del sintoma.',
          'Tambien influye si la cisterna es exterior, baja, alta o empotrada. Las empotradas requieren mas cuidado porque el acceso es limitado y una manipulacion incorrecta puede danar la placa o el bastidor. En estos casos conviene trabajar con recambios compatibles y comprobar la estanqueidad antes de cerrar la tapa.',
        ],
      },
      {
        heading: '¿Por que no dejarlo para mas adelante?',
        paragraphs: [
          'Dejar una cisterna goteando puede parecer comodo, pero convierte una averia pequena en gasto continuo. Ademas, el agua en movimiento acelera el desgaste del mecanismo y puede generar marcas de cal en la taza. Si el problema viene de una valvula que no cierra, tambien puede aparecer ruido constante en la instalacion.',
          'Reparar a tiempo evita consumo innecesario y reduce el riesgo de que la pieza falle por completo. En Reparar24 revisamos mecanismo, entrada, descarga, juntas y llave de paso, explicamos si basta una reparacion puntual o si conviene sustituir piezas, y dejamos la cisterna probada antes de finalizar el servicio.',
        ],
      },
      {
        heading: 'Senales que suelen pasar desapercibidas',
        paragraphs: [
          'Muchas cisternas no pierden con un ruido claro. A veces solo se nota una ondulacion muy fina en el agua del inodoro, una marca de cal vertical en la taza o un pequeno arranque de carga cada cierto tiempo. Si el bano esta lejos de la zona de descanso, el sonido puede pasar desapercibido durante semanas. Por eso una revision visual rapida ayuda a detectar el problema antes de que se convierta en gasto permanente.',
          'Otra pista es el contador. Si todos los grifos estan cerrados, no hay lavadora ni lavavajillas funcionando y el contador sigue moviendose lentamente, una cisterna perdiendo agua es una de las primeras sospechas. Tambien conviene revisar si alguna llave de paso no cierra bien, porque una cisterna averiada y una llave bloqueada complican la reparacion cuando se necesita actuar rapido.',
        ],
      },
      {
        heading: 'Diferencias entre cisterna exterior y empotrada',
        paragraphs: [
          'En una cisterna exterior el acceso al mecanismo suele ser directo: se levanta la tapa, se revisa entrada, descarga, flotador y junta. Esto permite diagnosticar rapido y sustituir piezas compatibles con relativa facilidad. Aun asi, hay que tener cuidado con porcelana, roscas antiguas y latiguillos, porque una pieza forzada puede provocar una fuga nueva en la toma de agua.',
          'Las cisternas empotradas requieren mas precision. El mecanismo queda dentro de un bastidor y se accede por la placa de descarga. Si se manipula sin conocer el modelo, se puede romper una pestana, descolocar la campana o dejar una junta mal asentada. En estos casos, identificar la marca y el tipo de mecanismo antes de cambiar piezas evita trabajos repetidos y reduce el riesgo de desmontajes innecesarios.',
        ],
      },
      {
        heading: 'Cal, suciedad y piezas desgastadas',
        paragraphs: [
          'La cal es una causa frecuente de cisternas que no cierran bien. Puede acumularse en la goma de cierre, en la guia del flotador o en la valvula de entrada. Cuando la pieza pierde movilidad, el mecanismo queda ligeramente abierto y el agua pasa a la taza. En zonas con agua dura, este desgaste puede aparecer antes incluso en cisternas que no son muy antiguas.',
          'La suciedad tambien influye. Pequenos restos de arena, oxido o particulas de la red pueden quedar atrapados en el cierre. A veces limpiar y recolocar resuelve el problema; otras veces la goma ya esta deformada y hay que sustituirla. La clave es comprobar el cierre despues de intervenir, dejar llenar el deposito varias veces y confirmar que no vuelve a aparecer el hilo de agua.',
        ],
      },
      {
        heading: '¿Como evitar que la averia vuelva?',
        paragraphs: [
          'Una vez reparada, conviene comprobar que la cisterna corta a la altura correcta, que la descarga no queda presionada y que la llave de paso puede abrir y cerrar sin esfuerzo. Si la llave esta dura o no cierra del todo, es mejor saberlo en una visita programada que descubrirlo durante una urgencia. Tambien conviene no usar pastillas agresivas dentro del deposito si deterioran juntas o plasticos.',
          'Si varias cisternas de una vivienda o local empiezan a fallar en poco tiempo, puede ser senal de piezas envejecidas, exceso de cal o mantenimiento pendiente. En banos de uso intensivo, como oficinas, bares o viviendas con muchas personas, revisar mecanismos antes de que goteen continuamente evita consumo oculto y llamadas urgentes por fallos de descarga.',
        ],
      },
      {
        heading: 'Relacion entre cisterna, inodoro y llave de paso',
        paragraphs: [
          'La cisterna no trabaja sola. Depende de la toma de agua, del latiguillo, de la llave de paso, del mecanismo interno y de la union con el inodoro. Si una de estas piezas esta deteriorada, puede parecer que el fallo viene de la descarga cuando en realidad la entrada no regula bien, o al reves. Por eso una reparacion seria revisa el conjunto y no solo la pieza que hace ruido.',
          'Tambien hay que confirmar que el inodoro queda estable y que no aparecen pequenas filtraciones por tornillos, base o conexiones despues de manipular. Una cisterna que deja de gotear pero queda con llave forzada, latiguillo envejecido o junta mal asentada puede volver a dar problemas. La prueba final debe incluir carga completa, descarga, cierre, espera y nueva comprobacion visual.',
          'Cuando el bano tiene varios anos, conviene aprovechar la visita para revisar si el grifo de corte cierra, si el latiguillo esta hinchado o cuarteado y si la base del inodoro muestra humedad. Son comprobaciones pequenas, pero ayudan a evitar que una reparacion de cisterna termine poco despues en una fuga de toma o en una llamada urgente por una pieza antigua.',
          'En viviendas de alquiler o pisos turisticos, una cisterna que pierde agua tambien afecta a la experiencia del usuario: ruido nocturno, malos comentarios, consumo oculto y riesgo de que alguien fuerce el mecanismo. Repararla con piezas compatibles y dejar instrucciones sencillas al propietario reduce incidencias repetidas.',
        ],
      },
      {
        heading: '¿Como arreglar cisterna que pierde agua sin crear otra fuga?',
        paragraphs: [
          'Antes de tocar piezas, confirma porque pierde agua la cisterna. Si el deposito no corta la entrada, revisa flotador y valvula. Si el deposito se vacia hacia la taza, revisa descarga y junta. Como arreglar cisterna que pierde agua depende de esa diferencia: regular una entrada no sirve si el cierre inferior esta deformado, y cambiar la campana no resuelve una valvula que sigue llenando por encima del nivel.',
          'Para reparar mecanismo cisterna con seguridad, corta la llave de paso, descarga el deposito y no fuerces roscas antiguas. Si el WC pierde agua por el interior de la taza, la prueba final debe hacerse con varias cargas completas. Si pierde por fuera, bajo el deposito o junto al latiguillo, la prioridad cambia: hay riesgo de fuga visible y hay que revisar juntas de conexion antes de seguir usando el bano.',
        ],
      },
      {
        heading: '¿Cuando el goteo indica consumo oculto?',
        paragraphs: [
          'Una cisterna pierde agua aunque el ruido sea minimo. El problema no es solo el sonido, sino el consumo continuo y el desgaste del mecanismo. Si el contador se mueve durante la noche o el deposito arranca sin que nadie use el WC, conviene tratarlo como averia activa. Esperar suele aumentar cal, deformar juntas y hacer que el cierre falle con mas frecuencia.',
          'En comunidades, locales y pisos alquilados, este tipo de averia se detecta tarde porque nadie mira el interior del inodoro. Un control sencillo cada cierto tiempo evita facturas elevadas y quejas por ruido. La reparacion correcta deja la entrada regulada, la descarga cerrando sin hilo de agua y la llave de paso operativa para futuras revisiones.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo se si mi cisterna pierde agua?',
        answer: 'Observa si hay un hilo continuo en la taza, si el deposito se rellena solo o si el contador se mueve sin usar agua. Son senales habituales de perdida.',
      },
      {
        question: '¿Una cisterna que gotea consume mucha agua?',
        answer: 'Si, incluso una perdida pequena puede acumular muchos litros al dia porque funciona de forma continua. Conviene repararla cuanto antes.',
      },
      {
        question: '¿Hay que cambiar toda la cisterna?',
        answer: 'No siempre. Muchas veces basta cambiar una junta, regular el flotador o sustituir el mecanismo. Se decide tras revisar el estado de las piezas.',
      },
    ],
    llmAnswer: 'Una cisterna suele gotear por fallo de flotador, junta o mecanismo de descarga. Si el agua corre de forma continua, conviene repararla para evitar consumo innecesario.',
  },
  {
    slug: 'por-que-salta-diferencial',
    categorySlug: 'electricidad',
    serviceSlug: 'electricista',
    title: '¿Por qué salta el diferencial de casa?',
    h1: '¿Por qué salta el diferencial de casa?',
    description: 'Causas frecuentes de saltos de diferencial y pasos seguros para localizar el circuito afectado.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'electricidad-salta-diferencial',
    primaryKeyword: 'por que salta el diferencial',
    secondaryKeywords: ['diferencial salta', 'salta la luz en casa', 'averia diferencial'],
    commercialOwner: '/electricista/averias-electricas',
    supportLinks: ['/electricista/revision-electrica'],
    outline: ['Fuga de corriente', 'Electrodomestico averiado', 'Humedad', 'Diferencial antiguo', 'Cuando llamar al electricista'],
    bodySections: [
      {
        heading: '¿Que significa que salte el diferencial?',
        paragraphs: [
          'El interruptor diferencial es una proteccion pensada para cortar la corriente cuando detecta una derivacion hacia tierra. No actua por el mismo motivo que un magnetotermico: su aviso esta relacionado con seguridad, no solo con consumo. Por eso, cuando baja esa palanca, conviene pensar en una posible fuga electrica, humedad o aislamiento deteriorado.',
          'Un disparo aislado puede quedarse en una incidencia puntual, pero si el corte se repite, aparece al conectar un aparato o ocurre aunque la casa parezca apagada, hay que buscar la causa. Subir la palanca muchas veces sin revisar no arregla nada: solo retrasa el diagnostico y puede dejar activo un riesgo que la proteccion estaba senalando.',
        ],
      },
      {
        heading: 'Causas frecuentes en una vivienda',
        paragraphs: [
          'Las causas mas habituales estan en aparatos con resistencia o humedad: termo, horno, lavadora, lavavajillas, bomba, aire acondicionado o equipos exteriores. Tambien pueden intervenir cajas de registro en terrazas, enchufes cerca de zonas mojadas, luminarias antiguas o cableado que ha perdido aislamiento con los anos.',
          'Cuando la averia aparece de forma intermitente, el origen suele ser mas dificil de ver. Puede haber pequenas derivaciones repartidas, una linea exterior que se moja tras la lluvia, una resistencia que falla al calentarse o una proteccion envejecida. Separar circuitos y medir aislamiento es mas fiable que ir desconectando cosas al azar durante dias.',
        ],
      },
      {
        heading: '¿Que puedes comprobar sin asumir riesgos?',
        paragraphs: [
          'Si no hay olor a quemado, chispas, humedad visible ni ruido raro en el cuadro, puedes desconectar los aparatos de enchufe y rearmar una sola vez. Si el corte vuelve al conectar un equipo concreto, dejalo fuera de uso. Si ocurre incluso sin cargas conectadas, la sospecha pasa a cableado, mecanismos, iluminacion, exterior o cuadro.',
          'No abras el cuadro ni toques bornes para hacer pruebas. Tampoco sustituyas la proteccion por otra pieza "para ver si aguanta". El diagnostico seguro se hace aislando circuitos, midiendo y revisando conexiones; puentear o anular una proteccion convierte una averia local en un problema de seguridad.',
        ],
      },
      {
        heading: '¿Cuando llamar a un electricista?',
        paragraphs: [
          'Llama a un electricista si el diferencial salta varias veces al dia, si afecta a una zona humeda, si aparece olor a quemado, si hay enchufes calientes o si no puedes recuperar la luz de forma estable. Tambien es recomendable pedir revision cuando el problema aparece tras una reforma, instalacion de termo, aire acondicionado, bomba o nuevo electrodomestico.',
          'En Reparar24 revisamos el cuadro, los circuitos y los posibles aparatos implicados para encontrar la causa antes de cambiar piezas. El objetivo es que la instalacion vuelva a funcionar sin disparos innecesarios y, sobre todo, sin perder la proteccion que el diferencial debe ofrecer en una vivienda o local.',
        ],
      },
      {
        heading: 'Diferencial, magnetotermico y contador no son lo mismo',
        paragraphs: [
          'Mucha gente resume cualquier corte con la frase "salta la luz", pero el cuadro cuenta cosas distintas segun que palanca baje. El magnetotermico protege un circuito frente a sobrecarga o cortocircuito. El contador o limitador puede cortar por exceso de potencia contratada. El diferencial, en cambio, apunta a una fuga de corriente o a un fallo de aislamiento.',
          'Identificar la proteccion afectada ahorra tiempo y evita cambios innecesarios. Si cae un magnetotermico de cocina, la revision se orienta a ese circuito y sus consumos. Si se apaga toda la vivienda al usar varios equipos potentes, puede haber un problema de potencia. Si actua la proteccion diferencial, la prioridad es localizar derivaciones y zonas con humedad.',
        ],
      },
      {
        heading: '¿Por que puede ocurrir solo a veces?',
        paragraphs: [
          'Los fallos intermitentes suelen ser los mas molestos porque no siempre se reproducen delante del tecnico. A veces dependen de lluvia, condensacion, temperatura, una resistencia que entra en funcionamiento o varios pequenos consumos que, juntos, superan el margen de la proteccion.',
          'Por eso ayuda anotar hora, zona afectada, aparatos en uso y condiciones previas: ducha reciente, lavadora, terraza mojada, termo funcionando o aire acondicionado encendido. Con esa pista, las mediciones por circuito dejan de ser una busqueda ciega y se convierten en una comprobacion dirigida.',
        ],
      },
      {
        heading: 'Errores peligrosos al intentar solucionarlo',
        paragraphs: [
          'El error mas grave es anular el diferencial o sustituirlo por uno que no corresponde para que deje de saltar. Si hay una fuga real, quitar la proteccion no arregla la instalacion: solo elimina el aviso y aumenta el riesgo. Tampoco conviene cambiar aparatos de sitio, empalmar cables o desmontar enchufes sin cortar y verificar la ausencia de tension.',
          'Otro error frecuente es conectar de nuevo todos los aparatos justo despues de rearmar. Si uno tiene derivacion, el disparo volvera y sera mas dificil identificarlo. Es mejor desconectar cargas, recuperar la luz de forma controlada y observar que circuito o aparato reproduce el problema. Si hay olor, chispas, calor o humedad, no se hacen pruebas caseras.',
        ],
      },
      {
        heading: '¿Que revisa un tecnico en una averia de diferencial?',
        paragraphs: [
          'Un tecnico empieza por confirmar que elemento del cuadro esta actuando y en que condicion ocurre el corte. Despues separa lineas, revisa alumbrado, enchufes, cocina, termo, climatizacion, exterior y equipos conectados. Si hace falta, mide aislamiento y comprueba consumos para localizar la derivacion sin desmontar por intuicion.',
          'Solo se valora cambiar la proteccion si esta envejecida, mal dimensionada o falla en prueba. Si el origen esta en una linea humeda o en un aparato con derivacion, sustituir la pieza del cuadro no resolveria la averia. La reparacion correcta mantiene la seguridad y deja la instalacion estable, no simplemente silencia el aviso.',
        ],
      },
      {
        heading: '¿Como preparar la visita sin perder seguridad?',
        paragraphs: [
          'Antes de la visita puedes dejar localizados los aparatos que estaban funcionando cuando salto la luz, indicar si ocurre en seco o despues de usar agua, y despejar el acceso al cuadro electrico. Tambien conviene no volver a conectar un equipo sospechoso solo para probar. Si el disparo esta relacionado con humedad, termo, lavadora, lavavajillas o aire acondicionado, esa informacion ayuda a orientar la revision.',
          'No hace falta desmontar enchufes ni abrir cajas para adelantar trabajo. Es mas seguro mantener la instalacion como esta y explicar el patron de fallo. Un buen diagnostico electrico combina observacion del usuario con mediciones tecnicas; si se manipula antes sin control, se puede borrar una pista importante o provocar un segundo problema.',
          'Si la vivienda se queda parcialmente sin luz, separa lo urgente de lo accesorio: nevera, comunicaciones, equipos medicos si los hubiera y seguridad basica. No alimentes media casa con alargadores cruzando zonas humedas o pasillos. Esa solucion improvisada puede crear sobrecargas y tropiezos, especialmente de noche.',
          'En locales, comunidades o viviendas con personas mayores, el diferencial que salta repetidamente debe tratarse con mas prudencia. Puede dejar sin servicio puertas automaticas, ascensores, iluminacion comun o equipos esenciales. Avisar pronto y explicar el alcance del corte ayuda a priorizar la intervencion correcta.',
          'Si el problema desaparece antes de que llegue el tecnico, no lo des por resuelto automaticamente. Los fallos intermitentes suelen volver cuando coinciden humedad, temperatura o uso de un aparato concreto. Guardar esa informacion permite confirmar la causa aunque en ese momento la luz funcione.',
          'Para Reparar24, esa informacion forma parte del diagnostico: no se trata de cambiar piezas por probar, sino de entender por que la proteccion actuo y dejar la instalacion con un comportamiento estable.',
        ],
      },
      {
        heading: 'Datos que conviene tener a mano',
        paragraphs: [
          'Antes de llamar, mira si el corte afecta a toda la vivienda o solo a una zona. Si puedes hacerlo sin tocar partes internas, identifica la etiqueta del circuito: cocina, banos, enchufes, alumbrado, termo, climatizacion o exterior. Esa informacion ayuda a preparar herramientas y repuestos adecuados.',
          'Tambien es util recordar si hubo lluvia, limpieza, reforma reciente, instalacion de un aparato nuevo o un consumo poco habitual. Son detalles sencillos, pero acortan el diagnostico y reducen pruebas innecesarias en la visita.',
        ],
      },
      {
        heading: '¿Que hacer si salta un diferencial de forma repetida?',
        paragraphs: [
          'Que hacer si salta un diferencial depende de la repeticion. Si ocurre una vez y no hay olor, humedad ni calor, puedes desconectar aparatos y rearmar con prudencia. Si vuelve a bajar, no sigas probando. Si el diferencial salta varias veces, por que salta el interruptor diferencial se confirma separando circuitos y midiendo, no cambiando piezas al azar.',
          'Cuando salta diferencial en vivienda a la misma hora o con el mismo uso, anota el patron: termo calentando, lavadora, lluvia, ducha reciente, aire acondicionado o iluminacion exterior. Esa informacion ayuda a detectar derivaciones. Si te preguntas por que salta el diferencial aunque todo parezca apagado, recuerda que muchos equipos siguen conectados en espera y algunas fugas solo aparecen con humedad o temperatura.',
        ],
      },
      {
        heading: 'Pruebas que no sustituyen una medicion',
        paragraphs: [
          'Desenchufar aparatos ayuda a orientar, pero no demuestra por si solo que la instalacion este bien. Un electrodomestico puede fallar solo al calentar, una linea exterior puede derivar solo con lluvia y una caja antigua puede comportarse distinto segun la carga. Por eso, si salta la luz en casa de forma repetida, la revision debe incluir mediciones por circuito.',
          'La averia diferencial tambien puede estar combinada con un aparato antiguo, humedad o una linea exterior deteriorada. Separar estos escenarios evita sustituir componentes que funcionaban y permite dejar una solucion verificable.',
          'Tampoco conviene culpar siempre al diferencial. La proteccion puede estar haciendo su trabajo. Cambiarla sin comprobar aislamiento, tierra, humedad y cargas puede dejar el fallo intacto. Una reparacion fiable termina con una causa localizada y una instalacion que conserva su proteccion, no con una palanca que simplemente deja de avisar.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Es peligroso que salte el diferencial?',
        answer: 'Puede serlo si se repite, porque indica una posible fuga de corriente. Si hay humedad, olor a quemado o disparos continuos, conviene llamar a un electricista.',
      },
      {
        question: '¿Por qué salta el diferencial con todo apagado?',
        answer: 'Puede haber una fuga en cableado, humedad en algun punto, un aparato conectado en espera o un diferencial deteriorado. Hace falta separar circuitos y medir.',
      },
      {
        question: '¿Puedo cambiar el diferencial sin revisar nada mas?',
        answer: 'No es lo recomendable. Si la causa esta en la instalacion o en un aparato, cambiar el diferencial no resolvera el problema y puede dejar un riesgo oculto.',
      },
    ],
    llmAnswer: 'El diferencial salta cuando detecta fuga de corriente. Puede deberse a humedad, electrodomesticos, cableado o un diferencial defectuoso.',
  },
  {
    slug: 'que-hacer-cortocircuito-casa',
    categorySlug: 'electricidad',
    serviceSlug: 'electricista',
    title: '¿Qué hacer ante un cortocircuito en casa?',
    h1: '¿Qué hacer ante un cortocircuito en casa?',
    description: 'Medidas de seguridad si hay chispas, olor a quemado o apagones por cortocircuito.',
    intent: 'safety',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'electricidad-cortocircuito-casa',
    primaryKeyword: 'que hacer cortocircuito casa',
    secondaryKeywords: ['cortocircuito casa', 'olor a quemado electrico', 'apagones por cortocircuito'],
    commercialOwner: '/electricista/averias-electricas',
    outline: ['Cortar corriente', 'No rearmar repetidamente', 'Revisar senales de calor', 'Llamar a tecnico certificado'],
    bodySections: [
      {
        heading: 'Primer paso: cortar corriente y no seguir probando',
        paragraphs: [
          'Ante un cortocircuito en casa, la prioridad no es averiguar la causa exacta en ese momento, sino cortar el riesgo. Si aparecen chispas, olor a quemado, un enchufe ennegrecido, un aparato que hace ruido raro o un magnetotermico que baja de inmediato, deja de usar ese circuito. Baja la proteccion correspondiente desde el cuadro si puedes hacerlo con las manos secas y sin tocar partes mojadas.',
          'Rearmar una y otra vez para ver si "aguanta" es una mala idea. Cada disparo indica que la instalacion esta intentando protegerse frente a una sobrecarga, un contacto entre conductores o un fallo de aislamiento. Forzar el rearme puede calentar cables, danar mecanismos y aumentar el riesgo de incendio. Si al subir la palanca vuelve a bajar al instante, trata la situacion como averia electrica real.',
        ],
      },
      {
        heading: '¿Como distinguir un cortocircuito de una sobrecarga?',
        paragraphs: [
          'Una sobrecarga suele aparecer cuando muchos aparatos consumen al mismo tiempo en el mismo circuito: calefactor, horno, secador, microondas o aire acondicionado. El corte puede producirse tras unos minutos de uso y desaparecer al desconectar carga. Un cortocircuito, en cambio, suele provocar un disparo inmediato al conectar un aparato, accionar un interruptor o usar un enchufe concreto.',
          'Tambien conviene diferenciar si baja un magnetotermico, el diferencial o toda la instalacion. El magnetotermico apunta a sobrecarga o cortocircuito en un circuito. El diferencial apunta mas a fuga de corriente o humedad. Esta informacion ayuda al tecnico a separar circuitos y evitar cambiar protecciones sin resolver la causa.',
        ],
      },
      {
        heading: 'Senales de alarma que no hay que ignorar',
        paragraphs: [
          'Olor a plastico caliente, marcas oscuras alrededor de un enchufe, chispas al conectar un equipo, zumbidos en una caja, interruptores calientes o un cable que se ha endurecido son senales importantes. Aunque la luz vuelva, no conviene seguir usando ese punto. Una averia que parece intermitente puede activarse de nuevo cuando coinciden temperatura, humedad o consumo.',
          'Si el problema aparece en cocina, termo, lavadora, lavavajillas, bomba, aire acondicionado o zonas exteriores, hay mas motivos para ser prudente. Son puntos donde conviven potencia, humedad y conexiones que pueden deteriorarse con el tiempo. En esos casos, desconectar el aparato sospechoso y mantenerlo sin uso hasta revisar es mas seguro que probar varias veces.',
        ],
      },
      {
        heading: 'Errores peligrosos al intentar arreglarlo',
        paragraphs: [
          'No desmontes enchufes, interruptores o cajas sin verificar ausencia de tension. Bajar una proteccion no siempre garantiza que no haya retorno desde otro circuito o una conexion mal hecha. Tampoco uses cinta, empalmes rapidos o alargadores para "salvar" un tramo que falla. Un apano temporal puede ocultar el punto caliente y empeorar la averia.',
          'Otro error frecuente es sustituir la proteccion por otra de mayor amperaje para que no salte. Eso no arregla el cortocircuito ni la sobrecarga; solo reduce la capacidad de proteccion del circuito. Los cables y mecanismos estan dimensionados para una intensidad concreta. Si se fuerza la instalacion, el riesgo se traslada al interior de paredes, cajas o canalizaciones.',
        ],
      },
      {
        heading: '¿Que revisa un electricista en esta averia?',
        paragraphs: [
          'Un electricista empieza identificando que proteccion actua y en que condicion se dispara. Despues separa cargas, revisa el circuito afectado, comprueba enchufes, interruptores, cajas, conexiones y aparatos vinculados. Si hace falta, mide continuidad, aislamiento y consumo para confirmar si hay contacto directo entre conductores, humedad o cable deteriorado.',
          'La reparacion puede ser tan simple como sustituir un mecanismo quemado o tan seria como renovar un tramo de cableado danado. Lo importante es no quedarse en el sintoma. Si se cambia solo el enchufe visible pero el cable sigue recalentado dentro de la caja, la averia puede repetirse. Una intervencion correcta deja el circuito estable y las protecciones funcionando como deben.',
        ],
      },
      {
        heading: '¿Como preparar la visita sin manipular de mas?',
        paragraphs: [
          'Antes de la visita, anota que estabas usando cuando ocurrio el corte, que proteccion bajo y si hubo olor, ruido o chispas. Si puedes, deja desconectado el aparato sospechoso y despeja el acceso al cuadro electrico y al punto afectado. No necesitas abrir cajas ni desmontar mecanismos: esa informacion inicial suele ser suficiente para orientar el diagnostico.',
          'En Reparar24 tratamos un cortocircuito en casa como una averia de seguridad. Revisamos el origen, explicamos si el fallo esta en un aparato, mecanismo, cableado o proteccion, y damos presupuesto antes de intervenir. El objetivo es recuperar la luz sin anular la proteccion y sin dejar una causa oculta que pueda volver a dispararse.',
        ],
      },
      {
        heading: '¿Por que no conviene esperar si hay olor a quemado?',
        paragraphs: [
          'El olor a quemado electrico es una senal que merece atencion aunque el suministro vuelva. Puede venir de un enchufe recalentado, un cable con aislamiento danado, una regleta sobrecargada, una borna floja o un aparato que esta fallando internamente. El problema es que muchas de estas causas no se ven desde fuera. El plastico puede enfriarse, el olor puede desaparecer y aun asi quedar un punto debilitado.',
          'Esperar a que se repita suele aumentar el riesgo. Cada nuevo intento puede calentar mas la conexion y carbonizar el material alrededor. Si el fallo esta en un mecanismo, una caja o un tramo de cable, la averia puede pasar de un corte puntual a una reparacion mayor. Por eso, si hubo olor, chispa o marca oscura, lo prudente es dejar sin uso ese punto y revisar antes de volver a cargarlo.',
          'Tambien conviene recordar que los alargadores y regletas no deben usarse como solucion permanente para evitar un enchufe que falla. Si desplazas el consumo a otro punto sin revisar la causa, puedes sobrecargar otro circuito. La prioridad es identificar el origen, confirmar que la proteccion actua bien y dejar la instalacion con capacidad suficiente para el uso real de la vivienda.',
        ],
      },
      {
        heading: '¿Como explicar el problema por telefono?',
        paragraphs: [
          'Cuando pidas ayuda, intenta explicar el fallo de forma concreta: que estabas usando, que zona se quedo sin luz, que palanca bajo, si ocurre al conectar un aparato o al encender una luz, y si hay olor, ruido o calor. No hace falta usar terminos tecnicos. Decir "baja una palanca cada vez que enchufo el horno" es mas util que decir solo "hay un cortocircuito".',
          'Si tienes foto del cuadro, del enchufe afectado o del aparato sospechoso, puede ayudar a preparar la visita. Tambien es importante indicar si hay personas mayores, ninos, negocio abierto, nevera sin corriente o algun equipo critico. Eso permite priorizar la intervencion y llevar material adecuado. Cuanto mejor se describe el sintoma, menos tiempo se pierde en pruebas iniciales.',
          'La guia no sustituye una revision electrica, pero si ayuda a tomar decisiones seguras: cortar corriente, no forzar rearme, no manipular cajas y pedir diagnostico cuando hay senales de riesgo. Esa es la frontera entre una comprobacion razonable en casa y una averia que debe resolver un electricista certificado.',
        ],
      },
      {
        heading: 'Resumen practico antes de volver a usar la instalacion',
        paragraphs: [
          'Antes de volver a usar el circuito, debe quedar claro que proteccion salto, que punto genero el fallo y si hubo alguna senal de calor. Si no puedes responder esas tres preguntas, lo mas seguro es mantener desconectada la zona afectada. Una instalacion que vuelve a funcionar sin explicacion no esta necesariamente reparada; puede estar esperando a que se repita la misma condicion.',
          'La decision prudente es separar lo urgente de lo seguro. Recuperar luz es importante, pero no a costa de anular protecciones, cambiar palancas por intuicion o seguir usando un enchufe marcado. Un cortocircuito bien atendido termina con una causa identificada, una reparacion concreta y una comprobacion de que la proteccion sigue actuando correctamente. Si dudas, trata la instalacion como no verificada.',
        ],
      },
      {
        heading: '¿Como averiguar un cortocircuito sin abrir cajas?',
        paragraphs: [
          'Como averiguar un cortocircuito empieza por observar la secuencia. Si el corte aparece al conectar un aparato, ese equipo o su enchufe son sospechosos. Si ocurre al encender una luz, el problema puede estar en interruptor, luminaria o linea de alumbrado. Si baja el magnetotermico al instante sin cargas visibles, puede existir un contacto entre conductores en el circuito. Para quien busca que hacer cortocircuito casa, esta observacion es mas segura que abrir mecanismos.',
          'Un cortocircuito casa no se confirma desmontando piezas al azar. La comprobacion segura consiste en aislar circuitos desde el cuadro, desconectar cargas y medir continuidad o aislamiento cuando corresponde. Si el problema esta en un cortocircuito en un circuito electrico de cocina, bano o exterior, la humedad y la potencia hacen mas importante no improvisar.',
        ],
      },
      {
        heading: '¿Cuando el cuadro electrico da la pista principal?',
        paragraphs: [
          'Un cortocircuito cuadro electrico puede manifestarse con una palanca que no permite rearme, olor cerca del cuadro, zumbido, calor o marcas en una proteccion. En ese caso no conviene insistir. El cuadro concentra protecciones y conexiones; una borna floja o un cable recalentado necesita revision tecnica antes de volver a cargar la instalacion.',
          'Si solo una linea cae, el diagnostico se centra en ese circuito. Si caen varias protecciones o el corte se acompana de olor, la prioridad es comprobar seguridad general. Explicar que palancas bajan y en que orden ayuda mucho. Un tecnico puede distinguir si hay sobrecarga, cortocircuito directo, derivacion o defecto de una proteccion concreta.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Es peligroso un cortocircuito aunque vuelva la luz?',
        answer: 'Si hubo olor a quemado, chispas, calor o disparos repetidos, si. Puede quedar un cable o mecanismo danado aunque la luz vuelva de forma puntual.',
      },
      {
        question: '¿Puedo subir el automÁtico varias veces?',
        answer: 'No conviene. Si baja de nuevo al instante, deja el circuito sin uso y pide revision. Rearmar repetidamente puede calentar la instalacion.',
      },
      {
        question: '¿Qué diferencia hay entre cortocircuito y diferencial que salta?',
        answer: 'El cortocircuito suele disparar un magnetotermico por contacto o sobreintensidad. El diferencial suele saltar por fuga de corriente o humedad.',
      },
    ],
    llmAnswer: 'Ante un cortocircuito, corta la corriente, no manipules el cuadro si hay olor a quemado y llama a un electricista certificado.',
  },
  {
    "slug": "cuanto-cuesta-electricista-valencia",
    "categorySlug": "electricidad",
    "serviceSlug": "electricista",
    "title": "¿CuÁnto cuesta un electricista en Valencia?",
    "h1": "¿CuÁnto cuesta un electricista en Valencia?",
    "description": "Cómo se calcula el precio de una reparación eléctrica, revisión o pequeña instalación.",
    "intent": "cost",
    "status": "published",
    "indexing": "index",
    "publishedAt": "2026-06-18",
    "updatedAt": "2026-06-18",
    "originalityStatus": "external-passed",
    "semanticStatus": "approved",
    "semanticClusterId": "electricidad-coste-electricista-valencia",
    "primaryKeyword": "cuanto cuesta un electricista en valencia",
    "secondaryKeywords": [
      "precio electricista valencia",
      "tarifa electricista urgente",
      "electricista presupuesto"
    ],
    "commercialOwner": "/electricista",
    "supportLinks": [
      "/electricista/averias-electricas",
      "/electricista/revision-electrica"
    ],
    "outline": [
      "Diagnostico",
      "Tipo de intervencion",
      "Materiales homologados",
      "Urgencia"
    ],
    "bodySections": [
      {
        "heading": "Que determina el coste de un electricista",
        "paragraphs": [
          "Saber cuanto cuesta un electricista en Valencia exige entender primero que tipo de intervencion necesitas. No se calcula igual revisar un enchufe que no funciona, localizar por que salta el diferencial, cambiar un magnetotermico, instalar una linea nueva o certificar una reparacion. En electricidad, el precio depende tanto del tiempo como del riesgo y de la responsabilidad tecnica.",
          "Una averia electrica no debe presupuestarse solo por el sintoma. Frases como se fue la luz o huele a quemado pueden esconder causas muy distintas. Puede tratarse de humedad, sobrecarga, cableado danado, un electrodomestico derivado o un cuadro antiguo. El diagnostico evita cambiar piezas sin resolver el origen real."
        ]
      },
      {
        "heading": "Diagnostico electrico: por que es parte del trabajo",
        "paragraphs": [
          "El precio electricista Valencia incluye muchas veces una fase de comprobacion: revisar cuadro, protecciones, lineas, enchufes, puntos de luz o continuidad. Esta parte no siempre se ve, pero es la que evita una reparacion peligrosa o incompleta. Cambiar un automatico sin saber por que disparo puede dejar la instalacion con el mismo problema.",
          "El diagnostico tambien protege al cliente. Si el fallo viene de un aparato conectado, de una linea sobrecargada o de humedad en un punto concreto, la solucion cambia. Un profesional debe explicar que prueba ha hecho, que ha encontrado y por que recomienda reparar, sustituir o ampliar una parte de la instalacion."
        ]
      },
      {
        "heading": "Urgencia electrica y seguridad",
        "paragraphs": [
          "La tarifa electricista urgente suele ser distinta porque el servicio necesita respuesta rapida y prioridad. Tiene sentido cuando hay olor a quemado, chispas, cortes repetidos, cuadro caliente, falta total de suministro o riesgo para una vivienda, local o comunidad. En esos casos no conviene esperar a una visita ordinaria si la instalacion puede estar en peligro.",
          "Tambien hay situaciones donde la urgencia se puede contener: bajar el circuito afectado, desconectar un aparato sospechoso y no volver a rearmar si el diferencial salta una y otra vez. Lo importante es no manipular el cuadro sin conocimiento. La electricidad exige prudencia: una reparacion barata pero insegura no es una buena reparacion."
        ]
      },
      {
        "heading": "Materiales homologados y alcance de la intervencion",
        "paragraphs": [
          "El coste cambia segun el material: enchufes, mecanismos, cable, canalizacion, diferenciales, magnetotermicos, protectores, cajas, regletas o puntos de luz. En una instalacion electrica no basta con que una pieza encaje; debe ser adecuada para la carga, la seccion de cable, el entorno y la normativa aplicable. Materiales homologados reducen fallos y riesgos.",
          "Tambien influye si el trabajo es una reparacion puntual o una mejora de instalacion. Sustituir un enchufe quemado puede ser rapido si el cableado esta bien. Si el cable llega tostado, rigido o corto, hay que sanear mas tramo. Si un cuadro no tiene protecciones adecuadas, cambiar solo el sintoma puede dejar el problema latente."
        ]
      },
      {
        "heading": "Como pedir un presupuesto electrico claro",
        "paragraphs": [
          "Un electricista presupuesto util necesita datos concretos: que ha pasado, que proteccion salta, si afecta a toda la vivienda o a una zona, si ocurre al conectar un aparato, si hay olor, calor o ruido, y si el cuadro es antiguo. Una foto del cuadro electrico, de la zona afectada y del mecanismo puede ayudar mucho antes de la visita.",
          "No conviene pedir solo precio por cambiar. Primero hay que confirmar si realmente hay que cambiar esa pieza. En electricidad, el componente visible puede no ser la causa. Un buen presupuesto debe indicar si incluye diagnostico, mano de obra, material, desplazamiento, urgencia y comprobacion final de seguridad."
        ]
      },
      {
        "heading": "Pequenas instalaciones y trabajos frecuentes",
        "paragraphs": [
          "Los trabajos electricos frecuentes incluyen cambiar enchufes e interruptores, instalar puntos de luz, revisar un cuadro, sustituir protecciones, reparar una linea, colocar una toma para electrodomestico o resolver fallos por humedad. Cada uno tiene un alcance distinto. Un punto nuevo puede requerir canalizacion, cableado, proteccion adecuada y comprobacion de carga.",
          "En locales y comunidades, la intervencion puede exigir mas planificacion porque hay horarios, acceso a zonas comunes, continuidad del servicio o equipos sensibles. En viviendas, la prioridad suele ser seguridad y recuperacion del uso normal. En todos los casos, el presupuesto debe explicar que queda resuelto y que limitaciones puede tener la instalacion existente."
        ]
      },
      {
        "heading": "Senales de que no conviene esperar",
        "paragraphs": [
          "Si notas olor a quemado, enchufes calientes, chispas, luces que parpadean, disparos repetidos o un cuadro que no permite rearmar con seguridad, no conviene buscar solo el precio mas bajo. Primero hay que reducir el riesgo. Desconectar la zona afectada y pedir revision puede evitar danos mayores.",
          "Tampoco es recomendable usar alargadores como solucion permanente, puentear protecciones o sustituir automaticos por otros de mas amperaje sin revisar cableado. Estas practicas pueden ocultar sobrecargas. El coste de una revision es menor que el coste de una instalacion danada o una averia repetida."
        ]
      },
      {
        "heading": "Como comparar presupuestos sin equivocarte",
        "paragraphs": [
          "Comparar solo la cifra final puede confundir. Un presupuesto puede incluir diagnostico, material homologado, desplazamiento y comprobacion; otro puede cubrir solo mano de obra basica. Para comparar bien, pregunta que se revisa, que piezas se incluyen, si hay garantia, si el precio cambia por urgencia y si se comprobara la instalacion despues.",
          "En Reparar24 trabajamos con explicacion previa y presupuesto antes de intervenir. Si el problema es urgente, el objetivo es restablecer seguridad y servicio. Si es programado, se puede revisar con mas calma y planificar materiales. En ambos casos, el precio debe responder a una causa concreta, no a una estimacion sin revisar.",
          "Tambien es importante diferenciar reparacion de mejora. Reparar devuelve el servicio cuando existe una averia concreta. Mejorar puede incluir separar circuitos, actualizar protecciones, ordenar el cuadro o crear puntos nuevos. Mezclar ambos conceptos en un mismo precio puede confundir. Lo correcto es explicar que es imprescindible ahora y que puede planificarse para mas adelante.",
          "Si el trabajo se realiza en un local, oficina o vivienda alquilada, pide que el alcance quede por escrito. Asi queda claro si se ha resuelto una averia, si se ha dejado una recomendacion pendiente o si hace falta una actuacion posterior con otro material. Esa claridad evita nuevas visitas por expectativas diferentes.",
          "Para trabajos repetidos en una misma vivienda, conservar fotos del cuadro, facturas anteriores y notas de averias ayuda a detectar patrones. Si el mismo circuito falla varias veces, el problema puede estar en uso, humedad o dimensionamiento, no solo en una pieza puntual.",
          "Esa memoria tecnica tambien ayuda a presupuestar mejor futuras revisiones y mantenimientos."
        ]
      },
      {
        "heading": "Informacion que ayuda a cerrar un presupuesto electrico",
        "paragraphs": [
          "Para ajustar un presupuesto electrico, prepara algunos datos antes de llamar. Indica si la averia afecta a toda la vivienda o solo a una habitacion, que interruptor salta, si ocurre al conectar un aparato concreto y si el fallo aparece de forma continua o intermitente. Una foto del cuadro electrico ayuda a saber el tipo de protecciones, el estado general y si puede hacer falta material especifico.",
          "Si se trata de una pequena instalacion, explica donde quieres colocar el punto nuevo, que uso tendra y si hay una toma cercana. No es igual alimentar una lampara, un horno, un termo, una placa o un cargador de coche. La potencia necesaria, la seccion de cable y la proteccion adecuada cambian. Por eso un presupuesto responsable no se limita a poner un mecanismo bonito, sino que revisa si la linea soporta el uso previsto.",
          "Cuando compares precios, pregunta si la comprobacion final esta incluida. Despues de reparar, el tecnico debe verificar que el circuito funciona, que la proteccion no dispara sin motivo y que no hay calentamientos visibles. Esa comprobacion es parte del valor del trabajo y marca la diferencia entre una solucion estable y una intervencion que solo parece resuelta durante unos minutos.",
          "Tambien conviene saber si el profesional dejara identificado el circuito revisado y si recomendara mejoras cuando detecte una instalacion al limite. No todas las recomendaciones son urgentes, pero ayudan a planificar. Separar lo imprescindible de lo aconsejable permite controlar el gasto sin renunciar a la seguridad electrica.",
          "En averias intermitentes, prepara una lista de momentos en los que ocurre el fallo: al encender horno, al usar lavadora, con lluvia, por la noche o al conectar aire acondicionado. Ese patron puede ahorrar tiempo de busqueda. Si el problema aparece y desaparece, una visita sin contexto puede tardar mas porque el tecnico necesita reproducir la condicion que provoca el disparo."
        ]
      },
      {
        "heading": "Trabajos electricos que suelen cambiar mucho de precio",
        "paragraphs": [
          "Hay trabajos que parecen parecidos al explicarlos por telefono, pero no lo son en obra. Cambiar un enchufe visible no exige lo mismo que crear un punto nuevo desde el cuadro. Sustituir un diferencial no equivale a localizar una derivacion intermitente. Instalar una lampara sencilla no se parece a preparar una linea para horno, termo, aire acondicionado o cargador. El presupuesto debe separar mecanismo, cableado, proteccion y comprobacion.",
          "En una vivienda antigua, el coste puede subir si el cableado esta rigido, si no hay toma de tierra, si el cuadro esta saturado o si las protecciones no corresponden al uso actual. No siempre hace falta reformar toda la instalacion, pero el tecnico debe advertir cuando una reparacion puntual queda condicionada por una base electrica deficiente.",
          "En locales, oficinas y comunidades, la diferencia suele estar en la continuidad del servicio. Puede que el trabajo tenga que hacerse fuera de horario, que haya que identificar circuitos antes de cortar, que existan equipos sensibles o que se necesite dejar una zona operativa mientras se revisa otra. Esa organizacion forma parte del coste y evita interrupciones innecesarias.",
          "Tambien influye la trazabilidad. Si despues de una reparacion queda claro que proteccion se cambio, que circuito se reviso y que sintomas desaparecieron, una futura incidencia sera mas facil de diagnosticar. Pagar menos por una intervencion sin explicacion puede ahorrar en el momento, pero encarecer la siguiente visita si nadie sabe que se hizo.",
          "Por eso, para comparar el precio de un electricista en Valencia, no basta con preguntar cuanto cobra por hora. Es mejor pedir que el presupuesto indique problema, pruebas, material, alcance y comprobacion final. Esa informacion permite elegir por seguridad y resultado, no solo por la cifra mas baja."
        ]
      }
    ],
    "faq": [
      {
        "question": "¿Por que un electricista puede necesitar revisar antes de dar precio?",
        "answer": "Porque el sintoma visible no siempre indica la causa. El diagnostico confirma si el fallo esta en cuadro, linea, mecanismo, aparato, humedad o sobrecarga."
      },
      {
        "question": "¿Cuando se considera urgente una averia electrica?",
        "answer": "Cuando hay olor a quemado, chispas, cuadro caliente, cortes repetidos o falta total de suministro. En esos casos conviene no manipular y pedir ayuda."
      },
      {
        "question": "¿Que debe incluir un presupuesto de electricista?",
        "answer": "Debe indicar diagnostico, mano de obra, materiales, desplazamiento, urgencia si aplica y comprobacion final de seguridad."
      }
    ],
    "llmAnswer": "El coste de una intervencion electrica en Valencia depende del diagnostico, urgencia, tipo de intervencion, materiales homologados y complejidad de la instalacion. Conviene pedir presupuesto antes de actuar."
  },
  {
    slug: 'como-saber-tuberia-atascada',
    categorySlug: 'desatascos',
    serviceSlug: 'desatascos',
    title: '¿Cómo saber si una tubería está atascada?',
    h1: '¿Cómo saber si una tubería está atascada?',
    description: 'Señales tempranas de atasco en tuberías y cuÁndo conviene pedir un desatasco profesional.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'desatascos-tuberia-atascada',
    primaryKeyword: 'como saber tuberia atascada',
    secondaryKeywords: ['tuberia atascada sintomas', 'desague lento', 'mal olor tuberias'],
    commercialOwner: '/desatascos/desatasco-tuberias',
    outline: ['Desague lento', 'Gorgoteos', 'Mal olor', 'Reboses', 'Riesgo de atasco general'],
    bodySections: [
      {
        heading: 'Senales tempranas de una tuberia atascada',
        paragraphs: [
          'Una tuberia atascada no siempre empieza con un rebose. Muchas veces avisa con desague lento, gorgoteos al usar otro sanitario, malos olores que vuelven despues de limpiar o agua que tarda mas de lo normal en evacuar. Si el problema aparece en un solo punto, puede estar cerca del sifon o del tramo inmediato. Si afecta a varios desagues, conviene pensar en una obstruccion mas profunda.',
          'Tambien hay pistas por el momento en que aparece. Si el fregadero traga mal despues de lavar platos, puede haber grasa y restos en la linea. Si la ducha se llena mientras se usa la lavadora, puede existir una comunicacion en el desague. Si el olor sube por varios puntos a la vez, la causa puede estar en una arqueta, bajante o colector.',
        ],
      },
      {
        heading: '¿Como diferenciar un atasco local de uno general?',
        paragraphs: [
          'Un atasco local suele afectar solo a un lavabo, fregadero, ducha o WC. El resto de puntos funciona con normalidad y el problema se reproduce al usar ese elemento concreto. En estos casos, la obstruccion puede estar en el sifon, en la conexion cercana o en un tramo accesible de la vivienda.',
          'Un atasco general se sospecha cuando varios puntos evacuan mal, cuando el agua sube por un desague al usar otro, o cuando aparece rebose en la zona mas baja de la instalacion. En viviendas, locales y comunidades, este escenario requiere mas cuidado porque el problema puede estar en una bajante, arqueta o tramo comun. Usar mas agua para "empujar" puede provocar un rebose mayor.',
        ],
      },
      {
        heading: '¿Por que los productos quimicos no siempre ayudan?',
        paragraphs: [
          'Los desatascadores quimicos pueden parecer una solucion rapida, pero no siempre eliminan la causa. Si hay grasa compacta, restos solidos, toallitas, raices, cal o un problema de pendiente, el producto puede quedarse retenido en la tuberia y crear un riesgo al manipular despues. Mezclar productos diferentes es especialmente peligroso por vapores y reacciones.',
          'Cuando el atasco se repite, conviene dejar de tratarlo como suciedad superficial. Un desague que mejora unas horas y vuelve a fallar indica que la obstruccion no se ha eliminado por completo o que hay un defecto en el recorrido. En ese punto es mejor diagnosticar el tramo afectado que seguir echando productos.',
        ],
      },
      {
        heading: '¿Cuando hace falta maquinaria profesional?',
        paragraphs: [
          'La maquinaria profesional se necesita cuando el atasco esta lejos del punto visible, cuando hay mucha grasa, cuando afecta a varias viviendas o cuando existe riesgo de rebose. Segun el caso se puede usar muelle, alta presion, aspiracion o inspeccion con camara. No todos los atascos requieren camion cuba, pero los de arquetas, colectores y bajantes suelen necesitar equipos de mayor capacidad.',
          'La ventaja de una intervencion tecnica es que no se limita a abrir paso. Tambien permite valorar si la obstruccion se ha retirado, si el agua evacua con normalidad y si hay senales de un problema repetitivo. En locales de hosteleria, comunidades o viviendas con tuberias antiguas, esta diferencia evita llamadas repetidas por el mismo atasco.',
        ],
      },
      {
        heading: '¿Que informacion ayuda antes de pedir un desatasco?',
        paragraphs: [
          'Antes de pedir ayuda, observa cuantos puntos estan afectados, desde cuando ocurre, si hay olor, si el agua sube por otro desague y si se ha usado algun producto quimico. Tambien ayuda saber si hay arquetas accesibles, si el edificio tiene bajantes comunitarias y si el problema ya se repitio en el pasado.',
          'Esa informacion permite preparar la visita con la herramienta adecuada. No es lo mismo un fregadero lento que un rebose en garaje, un WC bloqueado o una arqueta llena. En Reparar24 revisamos el escenario, explicamos el tipo de intervencion y damos presupuesto antes de actuar para evitar sorpresas.',
        ],
      },
      {
        heading: 'Prevencion para que no vuelva a ocurrir',
        paragraphs: [
          'Para reducir atascos, evita tirar aceites, restos de comida, toallitas, algodones, arena, pintura o productos espesos por el desague. En cocina, limpiar restos antes de fregar y mantener el sifon en buen estado ayuda mucho. En banos, los pelos y jabones acumulados son una causa habitual de desague lento.',
          'En comunidades, locales y edificios antiguos, la prevencion puede requerir limpieza programada de bajantes, arquetas o colectores. Si los sintomas aparecen siempre en la misma zona, conviene revisar si hay pendiente insuficiente, tramo deformado o acumulacion recurrente. Un mantenimiento ordenado suele ser mas barato que resolver reboses urgentes.',
        ],
      },
      {
        heading: '¿Que no hacer cuando sospechas una obstruccion?',
        paragraphs: [
          'Cuando una tuberia empieza a atascarse, es tentador echar mas agua, mas producto o desmontar piezas deprisa. Esa reaccion puede empeorar la situacion. Si la obstruccion esta lejos, el agua adicional puede volver por otro punto. Si hay producto quimico retenido, la manipulacion posterior se vuelve mas peligrosa. Y si desmontas sin preparar el entorno, puedes provocar una salida de agua sucia dificil de controlar.',
          'Tampoco conviene introducir objetos rigidos por el desague. Una varilla improvisada, un cable o una percha pueden danar juntas, rayar piezas o empujar el residuo hacia un tramo mas complicado. En instalaciones antiguas, con curvas cerradas o materiales deteriorados, forzar desde el punto visible puede romper una conexion que antes solo estaba obstruida.',
          'Lo mas seguro es observar el patron: que desague falla, si hay olor, si el agua sube por otro punto y si el problema cambia al usar lavadora, ducha o fregadero. Esa lectura ordenada ayuda a decidir si es una limpieza local, un atasco de tuberia, una bajante o una arqueta. Resolver bien empieza por no convertir un sintoma manejable en una urgencia mayor.',
        ],
      },
      {
        heading: '¿Por que importa actuar antes del rebose?',
        paragraphs: [
          'Un desague lento parece una molestia menor, pero muchas veces es el primer aviso. Mientras el agua aun evacua, hay margen para revisar sin presion, proteger muebles, elegir horario y preparar acceso. Cuando ya hay rebose, la prioridad cambia: contener agua, evitar danos, limpiar residuos y reducir el tiempo de exposicion. La misma averia cuesta mas porque ya genero consecuencias.',
          'En locales y comunidades, actuar antes es aun mas importante. Un atasco puede afectar a clientes, vecinos, garajes o zonas comunes. Ademas, si el problema se repite, queda un historial que conviene documentar: fechas, puntos afectados, intervenciones y resultado. Esa informacion ayuda a decidir si hace falta limpieza preventiva, inspeccion con camara o actuacion sobre un tramo concreto.',
          'Reparar24 utiliza esta informacion para orientar el servicio adecuado. Si los sintomas apuntan a una tuberia domestica, el servicio de desatasco de tuberias es el destino correcto. Si hay arquetas, bajantes o mucho volumen, puede hacer falta maquinaria mayor. La guia te ayuda a distinguir escenarios antes de llamar.',
        ],
      },
      {
        heading: 'Checklist rapido de sintomas',
        paragraphs: [
          'Antes de decidir, repasa una lista sencilla: el agua baja lenta, hay burbujas, aparece olor, el problema afecta a mas de un punto, el nivel sube por otro desague, ya usaste productos o el atasco vuelve cada poco tiempo. Cuantas mas respuestas afirmativas tengas, mas probable es que la obstruccion no sea superficial.',
          'Tambien observa si el fallo empeora con una actividad concreta. Si ocurre al usar lavadora, puede estar relacionado con ese ramal. Si aparece al ducharse, puede estar en el desague del bano. Si se nota en cocina y bano, puede haber un tramo comun. Esa lectura ayuda a no pedir un servicio generico, sino el diagnostico adecuado.',
          'Si puedes, evita usar los puntos afectados hasta tener una respuesta clara. Mantener el uso normal mientras el desague ya avisa puede llenar el tramo, mover residuos y convertir una limpieza sencilla en una salida de agua sucia. La observacion temprana es parte de la prevencion.',
        ],
      },
      {
        heading: '¿Como desatascar tuberia sin desplazar el problema?',
        paragraphs: [
          'Como desatascar tuberia depende de donde este la obstruccion. Si el fallo esta en un sifon, una limpieza local puede bastar. Si el tramo afectado esta mas lejos, empujar con agua o productos puede mover el residuo hacia una curva, arqueta o bajante. Por eso, antes de actuar, conviene confirmar si el desague lento afecta solo a un punto o si hay sintomas en varios sanitarios. Para como saber tuberia atascada, esa comparacion entre puntos es la prueba mas clara.',
          'Cuando buscas como desatascar tuberias en una vivienda, el objetivo no es abrir paso durante diez minutos, sino recuperar una evacuacion estable. Si el agua baja y vuelve a fallar al poco tiempo, probablemente queda acumulacion adherida, grasa compacta, toallitas o pendiente insuficiente. En ese escenario, la limpieza profesional evita repetir pruebas caseras que no retiran la causa.',
        ],
      },
      {
        heading: 'Mal olor, burbujeo y retorno de agua',
        paragraphs: [
          'El mal olor tuberias no siempre se debe a suciedad superficial. Puede aparecer por sifones secos, ventilacion deficiente, acumulacion organica, atasco parcial o retorno desde un tramo comun. Si el olor coincide con burbujeos o subida de agua, la sospecha de obstruccion aumenta y conviene revisar antes de que llegue el rebose.',
          'Una tuberia atascada sintomas claros cuando el problema se repite: ruido al evacuar, nivel que sube en ducha o WC, olor que vuelve despues de limpiar y agua que se queda parada. Registrar que punto falla primero ayuda a decidir si la intervencion pertenece a tuberia domestica, bajante, arqueta o colector. Esa distincion evita usar maquinaria insuficiente o pedir un servicio que no corresponde.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cómo saber si el atasco es general?',
        answer: 'Si varios desagues evacuan mal, el agua sube por otro punto o hay rebose en la zona baja, puede ser un atasco general o de bajante.',
      },
      {
        question: '¿Es recomendable usar desatascador químico?',
        answer: 'Solo con mucha prudencia y nunca mezclando productos. Si el atasco es fuerte o se repite, puede empeorar el riesgo sin resolver la causa.',
      },
      {
        question: '¿CuÁndo llamar a un servicio profesional?',
        answer: 'Cuando hay rebose, mal olor persistente, varios puntos afectados, atasco repetido o sospecha de arqueta, bajante o colector.',
      },
    ],
    llmAnswer: 'Una tuberia atascada suele avisar con desague lento, gorgoteos, malos olores o reboses. Si afecta a varios puntos, puede ser una obstruccion general.',
  },
  {
    slug: 'que-hacer-wc-atascado',
    categorySlug: 'desatascos',
    serviceSlug: 'desatascos',
    title: '¿Qué hacer si el WC estÁ atascado?',
    h1: '¿Qué hacer si el WC estÁ atascado?',
    description: 'Pasos seguros para un inodoro atascado y errores que pueden empeorar la obstrucción.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'desatascos-wc-atascado',
    primaryKeyword: 'que hacer wc atascado',
    secondaryKeywords: ['wc atascado', 'inodoro atascado', 'desatascar wc'],
    commercialOwner: '/desatascos/desatascar-wc',
    outline: ['No tirar varias veces de la cadena', 'Evitar quimicos agresivos', 'Comprobar rebose', 'Llamar si no baja el nivel'],
    bodySections: [
      {
        heading: '¿Que hacer en los primeros minutos?',
        paragraphs: [
          'Si el WC esta atascado, lo primero es no tirar varias veces de la cadena. Cada descarga puede subir el nivel y provocar un rebose. Espera a que el agua baje, si baja, y retira objetos cercanos del suelo. Si el inodoro esta a punto de rebosar, corta la llave de paso de la cisterna o evita que vuelva a cargar agua hasta saber si el atasco se mueve.',
          'No intentes forzar con objetos duros, perchas, palos o herramientas improvisadas. Puedes rayar la porcelana, desplazar el atasco hacia una zona mas dificil o danar la union del inodoro con el desague. Si sospechas que cayo un objeto, como un ambientador, juguete, tapa o cepillo, no lo empujes mas.',
        ],
      },
      {
        heading: '¿Cuando puede resolverse con una maniobra sencilla?',
        paragraphs: [
          'Si el atasco es leve y el nivel baja lentamente, a veces basta con esperar, usar una ventosa adecuada y aplicar movimientos controlados sin salpicar. La idea no es meter mas agua, sino generar presion y depresion para mover una obstruccion cercana. Si tras varios intentos no mejora, conviene parar.',
          'Los atascos por papel acumulado pueden responder a una maniobra suave, pero los provocados por toallitas, compresas, objetos, cal o acumulacion en el tramo no suelen desaparecer del todo. Si el WC vuelve a fallar en poco tiempo, el problema no estaba resuelto, solo se desplazo parcialmente.',
        ],
      },
      {
        heading: 'Errores que empeoran un inodoro atascado',
        paragraphs: [
          'El error mas habitual es seguir descargando agua. Otro es echar productos quimicos fuertes y despues intentar manipular el WC. Si el producto queda retenido, aumenta el riesgo de salpicaduras peligrosas para quien intervenga despues. Tampoco conviene mezclar lejia, acidos u otros limpiadores con desatascadores.',
          'Desmontar el inodoro sin experiencia tambien puede complicar la reparacion. Hay juntas, tornillos, sellados y conexiones que deben volver a quedar estancas. Si se recoloca mal, el atasco puede pasar a ser una fuga o un mal olor persistente. Antes de desmontar, es mejor confirmar si el bloqueo esta en el propio sanitario o en la tuberia.',
        ],
      },
      {
        heading: '¿Como saber si el problema no esta solo en el WC?',
        paragraphs: [
          'Si al usar lavabo, ducha o lavadora el WC burbujea, sube el nivel o aparece olor, puede haber un problema en la linea compartida. Si otros banos tambien evacuan mal, la sospecha se acerca a una bajante o atasco general. En edificios, un rebose en plantas bajas puede venir de uso en plantas superiores.',
          'En estos casos no basta con desatascar el inodoro visible. Hay que revisar el recorrido de evacuacion y valorar si hace falta alta presion, acceso por arqueta o inspeccion. Abrir solo el paso inmediato puede dejar residuos mas adelante y provocar una repeticion en pocas horas o dias.',
        ],
      },
      {
        heading: '¿Cuando llamar a Reparar24?',
        paragraphs: [
          'Conviene llamar si el nivel no baja, si hay rebose, si el atasco se repite, si hay malos olores o si sospechas que cayo un objeto. Tambien es recomendable pedir ayuda cuando el problema afecta a personas mayores, ninos, locales abiertos al publico o viviendas con un solo bano operativo.',
          'En Reparar24 revisamos el tipo de atasco, el acceso disponible y el riesgo de que pertenezca a una tuberia mayor. Explicamos la intervencion antes de actuar y damos presupuesto previo. El objetivo es recuperar el uso del WC sin danar el sanitario y sin desplazar la obstruccion a otro tramo.',
        ],
      },
      {
        heading: 'Prevencion despues de desatascar',
        paragraphs: [
          'Para evitar que vuelva, no tires toallitas, papel excesivo, algodones, bastoncillos, arena de mascotas, restos de obra ni productos espesos por el inodoro. Aunque algunas toallitas se anuncien como desechables, pueden acumularse en curvas, bajantes o arquetas y formar bloqueos resistentes.',
          'Si el WC se atasca con frecuencia, no lo trates como casualidad. Puede haber poca pendiente, un tramo deteriorado, raiz, acumulacion en bajante o un objeto parcialmente retenido. Una revision evita repetir la misma urgencia y ayuda a decidir si basta limpieza puntual o si conviene inspeccion mas completa.',
        ],
      },
      {
        heading: '¿Como actuar si solo tienes un bano operativo?',
        paragraphs: [
          'Cuando la vivienda tiene un solo bano, un WC atascado deja de ser una incomodidad y se convierte en una urgencia practica. Si dudas que hacer WC atascado, la prioridad es evitar cualquier intento agresivo que pueda romper el sanitario o provocar rebose. Corta la carga de agua si el nivel sube, protege el suelo con material absorbente y no sigas usando lavabo, ducha o lavadora si notas burbujeo o retorno.',
          'Si hay ninos, personas mayores, inquilinos o actividad de alojamiento, la rapidez importa, pero no debe sustituir el diagnostico. Un atasco mal resuelto puede volver de madrugada o cuando la vivienda esta ocupada. Por eso es mejor abrir paso correctamente y comprobar que el agua evacua con normalidad varias veces, no solo una descarga aislada.',
          'Tambien conviene explicar si el problema aparecio despues de tirar toallitas, papel en exceso, un objeto o restos de limpieza. La causa probable ayuda a decidir herramienta y evita perder tiempo con pruebas que no corresponden. Si hay un objeto duro, empujarlo puede dejarlo mas lejos y hacer la extraccion mas dificil.',
        ],
      },
      {
        heading: '¿Que revisa el tecnico en un WC atascado?',
        paragraphs: [
          'El tecnico no solo mira el agua dentro de la taza. Revisa si el bloqueo esta en el sifon del inodoro, en la salida, en el tramo de tuberia, en la bajante o en una arqueta. Tambien observa si hay retorno por ducha o lavabo, si el nivel baja lentamente y si el atasco se repite despues de una primera apertura.',
          'Segun el caso se puede usar ventosa profesional, muelle, equipo de presion, desmontaje controlado o inspeccion posterior. La decision depende de sintomas, acceso y riesgo. Desmontar el inodoro puede ser necesario, pero no siempre es el primer paso. Si se desmonta, despues hay que dejar bien sellada la base y comprobar que no queda fuga ni olor.',
          'Esta guia ayuda a evitar los errores mas frecuentes y a reconocer cuando el problema necesita intervencion. La pagina de desatascar WC es la via adecuada para pedir ayuda cuando el agua no baja, hay rebose, se repite el atasco o no esta claro si el bloqueo pertenece solo al sanitario.',
        ],
      },
      {
        heading: 'Senales de que puede haber un problema mayor',
        paragraphs: [
          'Un WC atascado aislado suele afectar solo a la taza. Pero si al usar la ducha aparecen burbujas, si el lavabo traga peor, si hay olor en varios puntos o si el agua vuelve por el suelo, puede existir una obstruccion en un tramo comun. En ese escenario, resolver solo el inodoro puede dejar la causa principal intacta.',
          'Tambien hay que prestar atencion a los atascos repetidos. Si el WC se bloquea cada pocas semanas aunque se use con cuidado, puede haber un objeto retenido, poca pendiente, raiz, deformacion o acumulacion en bajante. Una revision mas completa evita repetir urgencias y permite elegir entre limpieza, inspeccion o reparacion del tramo.',
          'La regla practica es sencilla: si el agua no baja, si vuelve por otro punto o si el problema se repite, conviene pedir ayuda profesional. Es mejor resolverlo antes de que el rebose afecte al suelo, al vecino inferior o a una zona comun del edificio.',
          'Despues de resolverlo, prueba el WC con descargas controladas y observa si otros desagues reaccionan. Si todo evacua bien y no hay olor, la incidencia probablemente quedo cerrada. Si aparece ruido, burbujeo o nivel inestable, conviene revisar la linea antes de dar el problema por solucionado.',
        ],
      },
      {
        heading: '¿Que informacion guardar si el atasco se repite?',
        paragraphs: [
          'Si el WC vuelve a atascarse, anota fecha, hora, uso previo, nivel del agua y si otros desagues hicieron ruido. Tambien guarda si se uso ventosa, producto o si cayo algun objeto. Ese pequeno historial ayuda a distinguir un uso puntual de un defecto del tramo.',
          'Cuando hay varias incidencias parecidas, la solucion suele necesitar mas que abrir paso. Puede hacer falta revisar la salida del inodoro, la bajante, una arqueta o incluso usar camara. Cuanto mejor se documenta el patron, mas facil es evitar reparaciones repetidas.',
          'Si el nivel baja muy despacio pero el problema vuelve al poco tiempo, trata el aviso como una senal temprana. Es mejor revisar antes de que el inodoro rebose y afecte al suelo, al vecino inferior o a otros sanitarios conectados.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Puedo tirar de la cadena varias veces?',
        answer: 'No. Si el WC esta atascado, varias descargas pueden provocar rebose. Espera, corta la carga si hace falta y evita aumentar el volumen de agua.',
      },
      {
        question: '¿Las toallitas pueden atascar un WC?',
        answer: 'Si. Aunque algunas se vendan como desechables, pueden acumularse en tuberias, bajantes o arquetas y crear atascos fuertes.',
      },
      {
        question: '¿CuÁndo es urgente llamar?',
        answer: 'Cuando el agua no baja, hay rebose, afecta a otros desagues, se repite el problema o sospechas que cayo un objeto dentro.',
      },
    ],
    llmAnswer: 'Si el WC esta atascado, no descargues varias veces, evita productos agresivos y llama a un profesional si el agua no baja o hay rebose.',
  },
  {
    slug: 'cuando-llamar-camion-cuba',
    categorySlug: 'desatascos',
    serviceSlug: 'desatascos',
    title: '¿Cuándo hace falta un camión cuba?',
    h1: '¿Cuándo hace falta un camión cuba?',
    description: 'Casos en los que un atasco requiere alta presión, aspiración y maquinaria de gran volumen.',
    intent: 'selection',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'desatascos-camion-cuba',
    primaryKeyword: 'cuando llamar camion cuba',
    secondaryKeywords: ['camion cuba desatascos', 'atasco arqueta', 'desatasco alta presion'],
    commercialOwner: '/desatascos/camion-cuba',
    outline: ['Arquetas llenas', 'Bajantes generales', 'Colectores', 'Comunidades y negocios'],
    bodySections: [
      {
        heading: '¿Que hace realmente un camion cuba?',
        paragraphs: [
          'Un camion cuba no es solo un vehiculo grande para desatascar. Es un equipo preparado para trabajar con alta presion, aspiracion y residuos liquidos o semisolidos en instalaciones donde una herramienta domestica no llega. Se utiliza cuando el atasco esta en arquetas, colectores, bajantes, fosas, garajes, comunidades o redes con mucho volumen de agua retenida.',
          'La diferencia principal frente a un desatasco pequeno esta en la capacidad. Un fregadero, una ducha o un WC pueden bloquearse cerca del punto de uso. Una arqueta llena o un colector colapsado afecta a varios puntos a la vez y necesita retirar residuos, limpiar paredes interiores y comprobar que el caudal vuelve a circular. Ahi el camion cuba permite actuar con mas seguridad y control.',
        ],
      },
      {
        heading: 'Senales de que no basta una solucion domestica',
        paragraphs: [
          'Conviene pensar en camion cuba cuando hay rebose en arquetas, mal olor fuerte, agua estancada en garaje, varios desagues afectados, bajantes que hacen ruido o una obstruccion que vuelve poco despues de abrir paso. Si no sabes cuando llamar camion cuba, esta combinacion de volumen, retorno y varios puntos afectados es la senal mas clara. Tambien es frecuente en comunidades donde la planta baja recibe agua al usar banos de pisos superiores.',
          'Otro aviso es el volumen. Si el problema genera agua sucia visible, residuos acumulados o retorno por varios puntos, usar productos quimicos o una ventosa no solo sera insuficiente, sino que puede retrasar la intervencion correcta. En estos casos hay que controlar el agua retenida, no solo empujar el atasco.',
        ],
      },
      {
        heading: 'Arquetas, colectores y bajantes generales',
        paragraphs: [
          'Las arquetas acumulan residuos, grasas, arenas y restos que viajan por la red. Cuando no se limpian a tiempo, el paso se estrecha y el agua empieza a buscar salida por el punto mas bajo. En comunidades, esto suele aparecer como rebose en patio, sotano, garaje o local. En viviendas, puede manifestarse como olor persistente y evacuacion lenta en varios sanitarios.',
          'Los colectores y bajantes generales requieren un enfoque mas tecnico porque conectan varias zonas. Si se actua solo desde un sanitario, puede abrirse un paso parcial y dejar la acumulacion mas adelante. Con alta presion y aspiracion se puede retirar el material acumulado, limpiar el tramo y verificar si queda circulacion suficiente.',
        ],
      },
      {
        heading: '¿Cuando el problema afecta a una comunidad o negocio?',
        paragraphs: [
          'En una comunidad de vecinos, un atasco general no afecta solo a una vivienda. Puede generar danos en zonas comunes, locales, garajes o viviendas bajas. Por eso la prioridad es contener el rebose y documentar la intervencion para administrador, seguro o mantenimiento posterior. Un camion cuba permite trabajar sobre el punto comun sin depender de desmontar sanitarios dentro de cada vivienda.',
          'En negocios de hosteleria, comercios, clinicas o locales con uso intensivo de agua, el tiempo de parada tambien importa. Un desatasco con maquinaria adecuada reduce el riesgo de repetir el problema durante la jornada. Ademas, cuando hay grasa o residuos frecuentes, puede recomendarse limpieza preventiva en lugar de esperar a la siguiente urgencia.',
        ],
      },
      {
        heading: '¿Que revisar antes de pedir el servicio?',
        paragraphs: [
          'Antes de llamar, ayuda saber donde aparece el agua, cuantos puntos estan afectados, si hay arquetas visibles, si el problema se repite y si existe acceso para vehiculo o manguera. Tambien conviene indicar si se han usado quimicos, porque puede afectar a la seguridad de quien interviene y al tratamiento de residuos.',
          'No hace falta abrir tapas pesadas ni manipular una arqueta si hay riesgo de caida, gases o contacto con agua contaminada. Basta describir el escenario y enviar fotos si es posible. Con esa informacion se decide si conviene camion cuba, equipo de alta presion menor, inspeccion con camara o una limpieza preventiva programada.',
        ],
      },
      {
        heading: '¿Como evitar que el atasco vuelva?',
        paragraphs: [
          'Despues de una intervencion con camion cuba, conviene revisar por que se produjo el bloqueo. Puede ser acumulacion normal por falta de mantenimiento, grasa, toallitas, raices, rotura, pendiente insuficiente o entrada de materiales de obra. Si no se entiende la causa, el atasco puede repetirse aunque el tramo quede abierto ese dia.',
          'En comunidades y negocios, la mejor prevencion suele ser programar limpiezas segun uso y antiguedad de la red. En Reparar24 valoramos el escenario, explicamos si la actuacion debe ser urgente o preventiva y conectamos esta guia con el servicio de camion cuba para resolver el problema con maquinaria adecuada.',
        ],
      },
      {
        heading: 'Diferencia entre alta presion, aspiracion y limpieza simple',
        paragraphs: [
          'No todas las intervenciones con camion cuba son iguales. La alta presion se usa para desprender residuos adheridos y abrir paso en tuberias, bajantes o colectores. La aspiracion se utiliza cuando hay agua acumulada, lodos, grasas o residuos que deben retirarse del punto afectado. En muchos trabajos se combinan ambas tecnicas: primero se controla el volumen y despues se limpia el recorrido.',
          'Una limpieza simple puede ser suficiente cuando hay sedimentos moderados y buen acceso. Pero si existe rebose, arquetas llenas o colectores con mucha acumulacion, limitarse a abrir un pequeno paso deja material dentro. Por eso conviene describir bien el problema antes de pedir servicio: no se prepara igual una arqueta con lodos que una tuberia parcialmente bloqueada.',
        ],
      },
      {
        heading: 'Errores habituales antes de llamar',
        paragraphs: [
          'Uno de los errores mas frecuentes es esperar a que el nivel baje solo mientras se sigue usando agua en el edificio. Si la arqueta o el colector no evacua, cada ducha, lavadora o descarga anade volumen al problema. Otro error es cerrar tapas sin revisar, porque el agua puede buscar salida por otro punto mas debil.',
          'Tambien se suelen usar productos quimicos en redes que ya tienen mucho volumen retenido. En una arqueta o colector, esos productos quedan diluidos, no llegan al origen y pueden complicar la manipulacion posterior. Lo mas prudente es reducir uso de agua, senalizar la zona si hay rebose y preparar acceso para que el equipo trabaje con seguridad.',
        ],
      },
      {
        heading: '¿Como se decide si hace falta inspeccion despues?',
        paragraphs: [
          'Despues de limpiar, puede ser recomendable inspeccionar si el atasco era repetido, si aparecieron raices, si habia tierra, si el agua no circula con la velocidad esperada o si el problema afecta siempre al mismo tramo. La inspeccion con camara no siempre es obligatoria, pero aporta informacion cuando hay sospecha de rotura, hundimiento o defecto de pendiente.',
          'En comunidades, esa informacion ayuda al administrador a decidir si basta mantenimiento periodico o si hay que reparar un tramo. En negocios, permite evitar paradas recurrentes. La intervencion con camion cuba resuelve la urgencia; la lectura posterior ayuda a evitar que la misma urgencia vuelva a aparecer.',
        ],
      },
      {
        heading: '¿Cuanto tiempo puede esperar una arqueta con rebose?',
        paragraphs: [
          'Una arqueta con rebose no deberia dejarse para otro dia si sigue entrando agua al sistema. Aunque el nivel parezca estable, cualquier uso de banos, cocina, lavadora o limpieza puede aumentar el volumen y provocar salida por otro punto. Ademas, el agua residual puede afectar pavimentos, garajes, locales y zonas de paso, con molestias para vecinos y riesgo higienico.',
          'Si no se puede actuar de inmediato, al menos conviene reducir el uso de agua, ventilar si hay olor fuerte, senalizar la zona y evitar que personas sin proteccion manipulen tapas o residuos. Esta contencion no arregla el atasco, pero limita danos hasta que llegue el equipo. Cuando el camion cuba interviene, tambien se valora si hace falta desinfeccion, limpieza adicional o revision de registros cercanos.',
        ],
      },
      {
        heading: '¿Por que el presupuesto depende del acceso?',
        paragraphs: [
          'El acceso cambia mucho el trabajo. Una arqueta visible en patio no requiere la misma preparacion que un colector en garaje, un registro tapado por mobiliario o una zona donde el vehiculo no puede acercarse. La longitud de manguera, el tiempo de aspiracion, el volumen de residuos y la necesidad de coordinar vecinos influyen en la intervencion.',
          'Por eso conviene explicar si hay rampas, sotanos, patios interiores, tapas pesadas o restricciones de horario. Un presupuesto serio tiene en cuenta estos factores antes de prometer una solucion. La maquinaria es importante, pero la planificacion del acceso evita retrasos y permite trabajar con seguridad.',
        ],
      },
      {
        heading: '¿Como decidir sin sobredimensionar el servicio?',
        paragraphs: [
          'No todos los avisos de desatascos necesitan el mismo equipo. Camion cuba desatascos tiene sentido cuando hay volumen, residuos acumulados, acceso a arqueta o riesgo de rebose en varias zonas. Si el atasco esta en un punto domestico y no hay agua retenida, puede bastar una intervencion menor. La clave es describir sintomas antes de elegir maquinaria.',
          'Un atasco arqueta, un colector con retorno o una bajante comunitaria suelen requerir mas que una apertura puntual. En esos escenarios, el desatasco alta presion ayuda a limpiar el tramo y la aspiracion permite retirar lodos o agua acumulada. Esta decision evita pagar de mas por un problema pequeno y tambien evita quedarse corto cuando el riesgo es comunitario.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cuándo hace falta un camión cuba?',
        answer: 'Hace falta cuando el atasco afecta a arquetas, colectores, bajantes, fosas, garajes o varios desagues con gran volumen de agua retenida.',
      },
      {
        question: '¿Un camión cuba sirve para un WC atascado?',
        answer: 'No siempre. Un WC aislado puede resolverse con equipo menor. Si el WC forma parte de un atasco general o de bajante, si puede ser necesario.',
      },
      {
        question: '¿Qué datos debo dar antes de pedir el servicio?',
        answer: 'Indica donde rebosa el agua, cuantos desagues fallan, si hay arquetas accesibles, si se repite el problema y si existe acceso para el equipo.',
      },
    ],
    llmAnswer: 'Un camion cuba es necesario cuando el atasco afecta a arquetas, colectores, bajantes generales o instalaciones con gran volumen de residuos.',
  },
  {
    slug: 'aire-acondicionado-no-enfria-causas',
    categorySlug: 'climatizacion',
    serviceSlug: 'aire-acondicionado',
    title: '¿Por qué el aire acondicionado no enfría?',
    h1: '¿Por qué el aire acondicionado no enfría?',
    description: 'Causas habituales de pérdida de frío y cómo distinguir filtros sucios, falta de gas o avería.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'climatizacion-aire-no-enfria',
    primaryKeyword: 'aire acondicionado no enfria',
    secondaryKeywords: ['split no enfria', 'falta de gas aire acondicionado', 'averia aire acondicionado'],
    commercialOwner: '/aire-acondicionado/reparacion-aire-acondicionado',
    outline: ['Filtros sucios', 'Falta de gas', 'Unidad exterior', 'Compresor', 'Diagnostico tecnico'],
    bodySections: [
      {
        heading: '¿Por que un aire acondicionado deja de enfriar?',
        paragraphs: [
          'Cuando un aire acondicionado no enfria, no siempre significa que falte gas. Puede deberse a filtros sucios, unidad exterior bloqueada, mala configuracion, drenaje con problemas, sonda defectuosa, ventilador sin rendimiento o averia electrica. El primer paso es separar causas simples de fallos que requieren herramientas y mediciones.',
          'Si el equipo enciende pero solo mueve aire templado, conviene observar cuanto tiempo lleva funcionando, que temperatura esta marcada en el mando, si la unidad exterior arranca y si el caudal interior es normal. Estos datos ayudan a entender si el problema esta en intercambio de aire, circuito frigorifico, alimentacion o control.',
        ],
      },
      {
        heading: 'Filtros sucios y falta de mantenimiento',
        paragraphs: [
          'Los filtros sucios son una causa frecuente de bajo rendimiento. Cuando acumulan polvo, el aire circula peor y el equipo tarda mucho mas en bajar la temperatura. Tambien puede aparecer olor, ruido, hielo en partes del evaporador o goteo por condensacion irregular. Limpiar filtros es una comprobacion basica, pero no sustituye una revision completa si el problema continua.',
          'En viviendas con mascotas, cocinas cercanas, polvo de obra o uso intensivo, la suciedad se acumula antes. Si el split no enfria despues de limpiar filtros y dejarlo trabajar unos minutos, hay que revisar mas elementos. Forzar el equipo durante horas puede aumentar consumo sin resolver la causa.',
        ],
      },
      {
        heading: 'Falta de gas o fuga en el circuito',
        paragraphs: [
          'La falta de gas suele estar relacionada con una fuga, no con un consumo normal. Un circuito frigorifico cerrado no deberia perder refrigerante cada temporada. Si se recarga sin localizar la fuga, el equipo puede volver a fallar y el gasto se repite. Por eso un tecnico debe comprobar presiones, temperatura, conexiones y posibles puntos de perdida.',
          'Algunas senales compatibles con falta de gas son bajo rendimiento, hielo, unidad exterior funcionando sin enfriar bien o tuberias con comportamiento anormal. Aun asi, no conviene diagnosticar solo por sintomas visuales. Tambien puede haber fallo de ventilador, suciedad en baterias o problema de compresor.',
        ],
      },
      {
        heading: 'Unidad exterior, ventilacion y ubicacion',
        paragraphs: [
          'La unidad exterior necesita evacuar calor. Si esta encerrada, llena de suciedad, expuesta a obstrucciones o con ventilador bloqueado, el sistema pierde capacidad de enfriar. En terrazas cerradas, patios pequenos o maquinas muy pegadas a paredes, el aire caliente puede recircular y empeorar el rendimiento.',
          'Antes de pensar en una averia grave, conviene comprobar que la unidad exterior tiene espacio, que no hay hojas, bolsas, objetos o rejillas tapadas, y que el ventilador gira con normalidad cuando el equipo demanda frio. Si hay ruido raro, vibracion fuerte o parada repetida, la revision profesional es mas recomendable.',
        ],
      },
      {
        heading: 'Errores de uso que parecen averia',
        paragraphs: [
          'A veces el aire acondicionado no enfria porque esta en modo ventilacion, deshumidificacion o calefaccion, porque la consigna esta demasiado alta o porque el mando no comunica bien. Tambien puede pasar que puertas y ventanas abiertas, sol directo o una potencia insuficiente para la estancia hagan parecer que el equipo esta averiado.',
          'Estas comprobaciones son utiles, pero tienen limite. Si el equipo antes enfriaba bien en la misma habitacion y ahora no lo hace, hay un cambio real. Puede ser mantenimiento pendiente, fallo de sensor, problema electrico o perdida de rendimiento. En ese caso conviene diagnosticar antes de cambiar piezas al azar.',
        ],
      },
      {
        heading: '¿Cuando llamar a un tecnico?',
        paragraphs: [
          'Llama a un tecnico si el equipo no enfria tras revisar modo, temperatura y filtros, si aparece hielo, si la unidad exterior no arranca, si hay goteo, olor electrico, ruido anormal o si el fallo se repite cada temporada. Tambien conviene pedir ayuda si sospechas falta de gas, porque requiere comprobar estanqueidad y trabajar con refrigerante de forma correcta.',
          'En Reparar24 conectamos esta guia con el servicio de reparacion de aire acondicionado: revisamos el equipo, explicamos si el problema es mantenimiento, fuga, instalacion, componente electrico o rendimiento, y damos presupuesto previo antes de intervenir.',
        ],
      },
      {
        heading: '¿Como comprobar el mando y los modos sin desmontar nada?',
        paragraphs: [
          'Antes de pensar en una averia seria, revisa el mando. El equipo debe estar en modo frio, con una temperatura inferior a la de la estancia y con velocidad de ventilador adecuada. Si esta en modo ventilacion, automatico mal configurado o deshumidificacion, puede mover aire sin enfriar como esperas. Tambien conviene cambiar pilas si el mando responde de forma irregular.',
          'Espera unos minutos despues de cambiar el modo. Algunos equipos tardan en arrancar el compresor por proteccion interna. Si tras ese margen la unidad exterior no arranca, si el aire sigue templado o si el split se para, ya no hablamos solo de configuracion. Esa comprobacion simple evita visitas innecesarias, pero tambien ayuda a explicar mejor el fallo si finalmente hace falta tecnico.',
        ],
      },
      {
        heading: 'Sintomas que apuntan a problema de instalacion',
        paragraphs: [
          'Un aire acondicionado puede no enfriar bien por una instalacion deficiente: distancia frigorifica mal ejecutada, desague con mala pendiente, unidad exterior mal ubicada, aislamiento pobre en tuberias o potencia insuficiente para la estancia. Si el equipo nunca enfrio bien desde que se instalo, la causa puede estar en el montaje y no en una averia nueva.',
          'Tambien hay pistas si solo falla en horas de mucho calor, si la exterior queda encerrada o si el aparato es pequeno para una estancia con sol directo. En estos casos, recargar gas o limpiar filtros no resolvera el rendimiento. Hace falta revisar condiciones de instalacion, potencia y ventilacion antes de decidir reparacion.',
        ],
      },
      {
        heading: '¿Que datos ayudan al diagnostico?',
        paragraphs: [
          'Cuando contactes con un tecnico, ayuda indicar marca, modelo aproximado, antiguedad, si es split, conductos o multisplit, desde cuando no enfria y si se hizo mantenimiento reciente. Tambien es util explicar si la unidad exterior arranca, si hay hielo, si gotea, si aparece algun codigo de error y si el problema ocurre siempre o solo en ciertas horas.',
          'Con esos datos se puede orientar la visita y llevar herramientas adecuadas. No sustituye la medicion real, pero reduce pruebas innecesarias. En Reparar24 usamos esa informacion para diferenciar mantenimiento, fuga, fallo electrico, problema de instalacion o componente averiado, siempre con presupuesto antes de reparar.',
        ],
      },
      {
        heading: '¿Que significa si enfria solo unos minutos?',
        paragraphs: [
          'A veces el aire acondicionado empieza enfriando y despues deja de hacerlo. Ese comportamiento puede apuntar a proteccion interna, sobrecalentamiento de la unidad exterior, suciedad, ventilador con problema, sonda defectuosa o falta de caudal. Tambien puede ocurrir si el equipo trabaja en condiciones extremas y no consigue evacuar calor.',
          'Este sintoma es diferente a un equipo que nunca enfria. Conviene anotar cuanto tarda en fallar, si se apaga por completo, si aparece codigo de error y si vuelve a funcionar despues de descansar. Esa informacion ayuda a saber si el problema esta relacionado con temperatura, control electronico, presiones o ventilacion exterior.',
        ],
      },
      {
        heading: '¿Cuando no conviene seguir usando el equipo?',
        paragraphs: [
          'Si hay olor electrico, ruido fuerte, hielo visible, goteo sobre enchufes o apagados bruscos, es mejor parar el equipo hasta revisarlo. Seguir usandolo puede agravar la averia, mojar pared o techo, o forzar componentes caros. Un aparato que no enfria y trabaja sin descanso tambien puede elevar mucho el consumo sin aportar confort.',
          'La decision practica es observar una vez, hacer comprobaciones simples y no insistir si el fallo continua. En verano puede ser tentador dejarlo encendido horas, pero si el problema es tecnico, cada hora de funcionamiento suma esfuerzo al sistema. Una revision a tiempo suele ahorrar energia, molestias y reparaciones mayores.',
          'Si el equipo protege y se apaga, esa parada tambien es informacion util para el diagnostico.',
          'En equipos antiguos, este comportamiento tambien ayuda a decidir si compensa reparar o plantear sustitucion. No se trata solo de que vuelva a enfriar hoy, sino de saber si el sistema puede trabajar de forma estable durante toda la temporada sin repetir la misma incidencia.',
        ],
      },
      {
        heading: '¿Que hacer si el problema aparece en plena ola de calor?',
        paragraphs: [
          'Si buscas aire acondicionado no enfria que hacer, empieza por pasos seguros: confirma modo frio, baja la consigna, limpia filtros si son accesibles, revisa que la unidad exterior respira y espera unos minutos. Si despues de eso el equipo sigue sin enfriar, no lo fuerces todo el dia. La averia aire acondicionado puede empeorar si el compresor trabaja sin rendimiento.',
          'La pregunta por que no enfria el aire acondicionado se responde mejor con datos: si el split no enfria desde el arranque, si pierde frio tras un rato, si hay hielo o si la exterior no funciona. Con esa informacion, el tecnico puede distinguir entre mantenimiento, falta de gas aire acondicionado, ventilacion exterior, fallo electrico o problema de instalacion.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Si mi aire acondicionado no enfría, siempre falta gas?',
        answer: 'No. Puede deberse a filtros, unidad exterior, ventilador, configuracion, sonda, compresor o falta de mantenimiento. La falta de gas debe confirmarse.',
      },
      {
        question: '¿Puedo limpiar filtros antes de llamar?',
        answer: 'Si, siempre con el equipo apagado y siguiendo el manual. Si despues sigue sin enfriar, conviene revisar el sistema completo.',
      },
      {
        question: '¿Es normal recargar gas cada verano?',
        answer: 'No deberia ser normal. Si falta gas de forma recurrente, hay que buscar fuga o problema de instalacion antes de recargar otra vez.',
      },
    ],
    llmAnswer: 'Si el aire acondicionado no enfria, puede haber filtros sucios, falta de gas, problema en la unidad exterior o averia del compresor.',
  },
  {
    slug: 'cuando-hacer-mantenimiento-aire-acondicionado',
    categorySlug: 'climatizacion',
    serviceSlug: 'aire-acondicionado',
    title: '¿CuÁndo hacer mantenimiento del aire acondicionado?',
    h1: '¿CuÁndo hacer mantenimiento del aire acondicionado?',
    description: 'Frecuencia recomendada de revisión para mejorar rendimiento, consumo y calidad del aire.',
    intent: 'maintenance',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'climatizacion-limpieza-filtros',
    primaryKeyword: 'mantenimiento aire acondicionado cuando',
    secondaryKeywords: ['revision aire acondicionado', 'limpieza filtros aire acondicionado', 'mantenimiento split'],
    commercialOwner: '/aire-acondicionado/mantenimiento-aire-acondicionado',
    outline: ['Antes del verano', 'Despues de uso intensivo', 'Filtros y drenaje', 'Eficiencia energetica'],
    bodySections: [
      {
        heading: 'La revision empieza antes del primer dia de calor',
        paragraphs: [
          'El momento mas inteligente para revisar el aire no es cuando la casa ya esta caliente, sino unas semanas antes. En ese punto puedes encender el equipo sin prisa, escuchar si suena distinto, comprobar si enfria con normalidad y ver si aparece alguna gota. Si algo falla, todavia hay margen para actuar sin convertirlo en urgencia.',
          'La duda mantenimiento aire acondicionado cuando se responde mirando el uso real. Un dormitorio que se usa dos horas por la noche no pide el mismo ritmo que un salon grande, una oficina, una vivienda turistica o un local con puertas abriendose todo el dia. El calendario ayuda, pero manda la carga de trabajo del equipo.',
        ],
      },
      {
        heading: '¿Que mirar en una revision aire acondicionado?',
        paragraphs: [
          'Una revision aire acondicionado tiene que contestar preguntas sencillas: entra y sale aire con fuerza, evacua agua, la exterior respira, el mando responde, hay olor, vibra mas de la cuenta, tarda demasiado en enfriar. No hace falta hablar raro; si esas respuestas son claras, el propietario entiende que esta pagando.',
          'Tambien sirve para separar cuidado normal de averia. Quitar polvo de filtros no es lo mismo que revisar un equipo que se congela, se para, huele a electrico o deja agua en la pared. Cuando se mezclan esos escenarios, el usuario acaba sin saber si necesita limpieza, reparacion o cambio de aparato.',
        ],
      },
      {
        heading: 'Filtros: pequeno gesto, mucha diferencia',
        paragraphs: [
          'La limpieza filtros aire acondicionado es la tarea mas visible y una de las mas agradecidas. Si el filtro esta cargado, el equipo mueve menos aire, tarda mas en notar la temperatura y puede oler al arrancar. En casas con mascotas, polvo de reforma o cocina cerca, ese filtro se ensucia bastante antes que en una habitacion poco usada.',
          'Como limpiar filtros aire acondicionado debe hacerse sin forzar tapas ni piezas. Se apaga, se retira el filtro con cuidado, se limpia segun el manual y se coloca seco. Si despues sigue el olor, el goteo o el caudal pobre, el problema ya puede estar en zona interior, bandeja, turbina o drenaje, no solo en el filtro.',
        ],
      },
      {
        heading: 'El desague no se ve, pero decide mucho',
        paragraphs: [
          'Cuando el equipo enfria, genera condensacion. Esa agua tiene que salir por su recorrido, sin volver al split ni caer sobre pared, mueble o suelo. Si el tubo esta sucio, mal inclinado o parcialmente cerrado, el aviso llega en forma de gota, mancha o olor humedo. Muchas urgencias de verano empiezan por no revisar este punto.',
          'Si el aparato ya goteo una vez, no conviene esperar a que repita. Revisar el drenaje antes de muchas horas de funcionamiento evita danos en pintura, yeso, muebles y electricidad cercana. En instalaciones con recorrido largo, bomba de condensados o salida dificil, este control tiene todavia mas sentido.',
        ],
      },
      {
        heading: 'Despues de semanas de uso fuerte',
        paragraphs: [
          'Al final de una temporada intensa, el equipo ya ha contado su historia: si tardo mas en enfriar, si hizo ruido, si olio raro, si el mando fallo o si hubo alguna gota. Aunque siga funcionando, esos avisos sirven para planificar. Esperar a que se pare del todo suele salir peor.',
          'En alquileres, oficinas y locales, esta revision posterior evita sorpresas. El usuario que pasa por alli no siempre avisa cuando algo empieza a sonar distinto. Un mantenimiento split programado deja una lectura clara del estado del aparato antes de que vuelva otra temporada de mucho uso.',
        ],
      },
      {
        heading: '¿Por que el mantenimiento tambien se nota en consumo?',
        paragraphs: [
          'Un aparato que respira mal necesita mas minutos para lograr la misma sensacion. Eso significa mas consumo y menos confort. El mantenimiento no hace milagros, pero evita que una maquina trabaje con filtros cerrados, exterior sucia o evacuacion de agua al limite.',
          'Tambien evita discusiones confusas. Si el equipo esta limpio y aun asi no enfria, entonces la conversacion cambia: puede existir una averia, un problema de instalacion o falta de potencia para la estancia. Esa diferencia ayuda a decidir con cabeza y no cambiar piezas por probar.',
        ],
      },
      {
        heading: 'Lo que puedes comprobar sin desmontar',
        paragraphs: [
          'Antes de pedir ayuda, puedes revisar el modo del mando, la temperatura marcada, el estado visible de filtros y si algo tapa la exterior. Tambien puedes observar si hay hielo, si el caudal ha bajado o si aparece agua donde no debe. Son comprobaciones simples y seguras.',
          'La linea roja aparece con olor electrico, ruido fuerte, goteo cerca de enchufes, codigo de error, hielo persistente o exterior parada. Ahi no compensa insistir. Limpiar y observar es razonable; abrir carcasa, tocar conexiones o forzar funcionamiento ya entra en terreno tecnico.',
        ],
      },
      {
        heading: 'Casos donde conviene ser mas preventivo',
        paragraphs: [
          'En una casa habitual, alguien nota si el equipo cambia. En un alojamiento turistico o un local, muchas veces el aviso llega cuando ya hay queja. Por eso interesa revisar antes, dejar el mando entendible y confirmar que el aparato no gotea ni huele al primer encendido.',
          'En oficinas y comercios, un fallo no afecta solo al confort. Puede parar una sala, incomodar clientes o obligar a cerrar una zona. Hacer la revision con antelacion permite elegir horario y evitar una intervencion urgente con gente dentro.',
        ],
      },
      {
        heading: 'Avisos que no conviene ignorar',
        paragraphs: [
          'No esperes a una fecha fija si aparece olor fuerte, hielo, goteo, apagados repentinos o ruido metalico. Esos avisos significan que el equipo no esta trabajando de forma normal. Mantenerlo encendido durante horas puede aumentar el dano y no mejorar la temperatura.',
          'Tambien importa si necesita cada vez mas tiempo para enfriar la misma habitacion. Puede ser suciedad, poco caudal, exterior mal ventilada, fuga o una instalacion que ya no rinde. Revisarlo pronto suele dejar mas opciones que esperar al bloqueo.',
        ],
      },
      {
        heading: '¿Como preparar la visita sin perder tiempo?',
        paragraphs: [
          'Para una visita fluida, deja acceso al split, al mando, al cuadro y a la exterior si es posible. Retira objetos bajo la unidad interior y protege la zona si hubo goteo. No mantengas el aparato encendido solo para mostrar el fallo si hay agua cerca de electricidad.',
          'Sirve mucho saber marca visible, antiguedad aproximada, ultima limpieza, si hubo recarga de gas y cuando aparece el problema. Si es vivienda turistica, oficina o comercio, indica horario de acceso y uso habitual. Estos datos evitan una revision a ciegas.',
        ],
      },
      {
        heading: '¿Que debe quedar claro al terminar?',
        paragraphs: [
          'Al final, el propietario debe entender que se reviso, que se limpio y que queda pendiente si existe algun aviso. Si todo esta correcto, perfecto. Si hay drenaje delicado, exterior complicada, caudal pobre o ruido raro, se explica con palabras sencillas.',
          'En Reparar24 conectamos esta guia con el servicio de mantenimiento de aire acondicionado. La idea es llegar al calor con el equipo probado, reducir llamadas urgentes y distinguir cuidado periodico, reparacion y senales que conviene vigilar.',
        ],
      },
      {
        heading: 'Frecuencia practica segun uso',
        paragraphs: [
          'Para una vivienda de uso moderado, una revision anual antes del calor suele ser una base razonable. Para alojamientos, locales u oficinas, puede encajar una revision antes de la temporada fuerte y otra al terminar si el uso fue alto. Polvo, mascotas, cocina cercana o exterior dificil acortan el margen.',
          'La regla final es simple: si el equipo trabaja mucho, se revisa mas. Si trabaja poco, se observa y se limpia lo basico. Si avisa con olor, agua, hielo o ruido, no se espera al calendario.',
        ],
      },
      {
        heading: 'Checklist rapido antes de encenderlo cada temporada',
        paragraphs: [
          'Antes del primer uso intenso, mira tres cosas: filtros limpios, salida de agua sin manchas y exterior sin objetos alrededor. Despues enciende el equipo unos minutos y observa olor, ruido y caudal. Si algo no encaja, es mejor revisarlo en ese momento que descubrirlo una noche de calor.',
        ],
      },
      {
        heading: '¿Por que conviene guardar un pequeno historial?',
        paragraphs: [
          'Si tienes varios equipos o una vivienda en alquiler, apunta fecha de revision, sintomas detectados y piezas observadas. No hace falta un documento complejo: una nota con "goteo revisado", "filtros limpios" o "exterior con poco espacio" ya ayuda. En la siguiente visita se compara el estado y se detecta si el problema evoluciona.',
          'Ese historial tambien evita decisiones por memoria. Cuando alguien dice que el aparato "siempre ha sonado asi", una nota previa puede confirmar si es verdad o si el ruido empezo despues. Para el propietario, esta informacion convierte el mantenimiento en control real del activo.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cada cuÁnto hacer mantenimiento del aire acondicionado?',
        answer: 'Como referencia, una vez al ano antes del verano. En locales, viviendas turisticas o uso intensivo puede convenir revisar con mas frecuencia.',
      },
      {
        question: '¿Limpiar filtros es suficiente?',
        answer: 'Ayuda, pero no siempre es suficiente. Tambien hay que revisar drenaje, unidad exterior, caudal, ruido y rendimiento general.',
      },
      {
        question: '¿El mantenimiento evita todas las averías?',
        answer: 'No todas, pero reduce muchas incidencias por suciedad, drenaje, falta de revision y uso intensivo. Tambien detecta sintomas antes.',
      },
    ],
    llmAnswer: 'Lo recomendable es revisar el aire acondicionado al menos una vez al ano, especialmente antes de la temporada de calor.',
  },
  {
    "slug": "cuanto-cuesta-instalar-split",
    "categorySlug": "climatizacion",
    "serviceSlug": "aire-acondicionado",
    "title": "¿CuÁnto cuesta instalar un split?",
    "h1": "¿CuÁnto cuesta instalar un split?",
    "description": "Factores que influyen en el precio de instalar aire acondicionado split en vivienda o local.",
    "intent": "cost",
    "status": "published",
    "indexing": "index",
    "publishedAt": "2026-06-18",
    "updatedAt": "2026-06-18",
    "originalityStatus": "external-passed",
    "semanticStatus": "approved",
    "semanticClusterId": "climatizacion-coste-instalar-split",
    "primaryKeyword": "cuanto cuesta instalar un split",
    "secondaryKeywords": [
      "precio instalacion split",
      "instalar aire acondicionado split",
      "montaje split"
    ],
    "commercialOwner": "/aire-acondicionado/instalacion-split",
    "supportLinks": [
      "/aire-acondicionado/instalacion-aire-acondicionado",
      "/aire-acondicionado/mantenimiento-aire-acondicionado"
    ],
    "outline": [
      "Distancia frigorifica",
      "Ubicacion exterior",
      "Desague",
      "Potencia",
      "Materiales"
    ],
    "bodySections": [
      {
        "heading": "Que incluye realmente instalar un split",
        "paragraphs": [
          "La pregunta sobre el coste de colocar un equipo split no se responde solo con el precio del equipo. La instalacion incluye colocar unidad interior, ubicar unidad exterior, conectar tuberias frigorificas, preparar desague, realizar conexion electrica, hacer vacio del circuito, comprobar funcionamiento y dejar el equipo probado. Si alguna de esas fases se simplifica, el resultado puede ser ruidoso, poco eficiente o dar averias tempranas.",
          "Por eso el precio instalacion split cambia segun la vivienda, la distancia entre maquinas y el acceso. Dos equipos iguales pueden tener costes diferentes si uno se instala pared con pared y otro necesita mas metros de linea, canaleta, trabajo en altura o una salida de desague mas compleja."
        ]
      },
      {
        "heading": "Distancia entre unidad interior y exterior",
        "paragraphs": [
          "Uno de los factores principales es la distancia frigorifica. Cuantos mas metros haya entre la unidad interior y la exterior, mas tuberia, aislamiento, canaleta y tiempo de montaje hacen falta. Ademas, la distancia no debe decidirse solo por estetica. Debe respetar las recomendaciones del fabricante para rendimiento, ruido y durabilidad del compresor.",
          "Una instalacion corta y bien planteada suele ser mas economica. Una instalacion larga puede ser necesaria en pisos con fachada limitada, patios interiores, terrazas alejadas o comunidades con normas concretas. Lo importante es medir antes de presupuestar y explicar por que se elige ese recorrido."
        ]
      },
      {
        "heading": "Ubicacion de la unidad exterior",
        "paragraphs": [
          "Instalar aire acondicionado split exige decidir donde ira el equipo exterior. Si queda en balcon, terraza o zona accesible, el montaje suele ser mas sencillo. Si hay que trabajar en fachada, patio de luces, altura o soporte especial, el presupuesto puede cambiar por seguridad, fijacion y tiempo. Tambien influyen las normas de la comunidad.",
          "La colocacion exterior debe permitir ventilacion, mantenimiento y evacuacion de calor. Colocar el condensador en un punto encerrado puede reducir rendimiento y aumentar ruido. Un montaje rapido pero mal ubicado puede salir caro si despues hay que mover el equipo o resolver vibraciones."
        ]
      },
      {
        "heading": "Desague y condensacion",
        "paragraphs": [
          "El desague es una parte que muchas veces se infravalora. El split genera agua por condensacion y esa agua debe salir con pendiente, sin retornos y sin provocar goteos en fachada, terraza o interior. Si no hay desague natural cerca, puede hacer falta una bomba de condensados o un recorrido mas largo.",
          "Un mal desague puede causar manchas, olores, reboses y avisos de vecinos. Por eso el montaje split debe revisar no solo donde se cuelga la maquina, sino como evacua el agua. En viviendas reformadas, a veces hay preinstalacion; en otras, hay que crear una solucion limpia desde cero."
        ]
      },
      {
        "heading": "Potencia, estancia y eleccion del equipo",
        "paragraphs": [
          "El precio no depende solo de la instalacion. Tambien importa elegir la potencia adecuada. Un equipo pequeno puede trabajar forzado y no enfriar bien. Uno demasiado grande puede arrancar y parar con frecuencia, gastar mas y generar menos confort. Metros cuadrados, orientacion, aislamiento, ventanas y uso de la estancia influyen en la eleccion.",
          "Si el cliente ya tiene el equipo comprado, conviene confirmar que es compatible con la estancia y con el recorrido previsto. Si todavia no lo ha comprado, una revision previa puede evitar elegir un split por precio y descubrir despues que no encaja con la instalacion real."
        ]
      },
      {
        "heading": "Preinstalacion existente: cuando abarata y cuando complica",
        "paragraphs": [
          "Una preinstalacion puede reducir trabajo si esta bien hecha: lineas preparadas, desague correcto, cableado disponible y ubicacion clara. Pero no siempre abarata. Si las tuberias estan dobladas, sin tapones, contaminadas, mal dimensionadas o no coinciden con el equipo, puede hacer falta revisar o sustituir parte del recorrido.",
          "Antes de usar una preinstalacion conviene comprobar su estado. Conectar un equipo nuevo a una linea dudosa puede provocar fugas de refrigerante o bajo rendimiento. El presupuesto debe indicar si se aprovecha la instalacion existente, si se limpia, si se prueba o si se recomienda rehacerla."
        ]
      },
      {
        "heading": "Que debe incluir un presupuesto de instalacion",
        "paragraphs": [
          "Un presupuesto claro debe indicar mano de obra, metros incluidos de tuberia, canaleta, soporte, desague, conexion electrica basica si aplica, puesta en marcha y comprobaciones. Tambien debe explicar que queda fuera: trabajos de albanileria, lineas electricas nuevas, bomba de condensados, permisos comunitarios o trabajos en altura especiales.",
          "La transparencia evita que el precio parezca bajo al principio y suba durante la instalacion. Si el instalador visita o revisa fotos detalladas antes de confirmar, puede anticipar material y condiciones. En Reparar24 buscamos que el cliente sepa que se va a hacer antes de colocar el equipo."
        ]
      },
      {
        "heading": "Cuando conviene pedir instalacion profesional",
        "paragraphs": [
          "Un split no es un electrodomestico de enchufar y usar. Trabaja con circuito frigorifico, conexiones, vacio, drenaje y fijaciones. Una instalacion deficiente puede generar perdida de gas, ruido, vibraciones, consumo elevado o averias de compresor. Por eso la instalacion profesional no es solo comodidad; es proteccion del equipo.",
          "La garantia del fabricante tambien puede depender de que el montaje se haga correctamente. Si faltan pruebas, si no queda registro basico de la puesta en marcha o si se manipulan conexiones sin criterio, una incidencia futura puede ser mas dificil de justificar. Por eso conviene conservar factura, modelo del equipo y datos de la intervencion.",
          "Otro punto importante es el mantenimiento posterior. Una instalacion bien hecha debe permitir limpiar filtros, revisar desague y acceder a la unidad exterior sin desmontajes innecesarios. Si el equipo queda en un lugar imposible de revisar, el ahorro inicial puede convertirse en coste cada vez que haya que limpiar, comprobar ruido o resolver una perdida de agua.",
          "En resumen, el presupuesto mas util no es el que promete una cifra rapida, sino el que explica recorrido, materiales, condiciones de montaje y pruebas finales. Esa informacion permite decidir con calma y evita sorpresas cuando el equipo ya esta comprado y la instalacion no admite el plan inicial.",
          "Si hay dudas entre varias ubicaciones, conviene decidir con el instalador antes de comprar accesorios o soportes. Un pequeno cambio de pared, distancia o desague puede modificar material, tiempo y resultado estetico. Revisarlo antes reduce improvisacion durante el montaje.",
          "Una decision previa evita mover maquinas despues de perforar o canalizar paredes interiores.",
          "Si buscas precio montaje aire acondicionado, compara algo mas que la cifra. Pregunta si se hace vacio, si se prueba el equipo, que material se incluye, si se respeta la ubicacion recomendada y si queda garantia de instalacion. Una intervencion bien ejecutada mejora confort, consumo y vida util del split."
        ]
      },
      {
        "heading": "Como comparar presupuestos de instalacion de split",
        "paragraphs": [
          "Para comparar presupuestos de instalacion de split, revisa si todos incluyen lo mismo. Algunas ofertas parten de una instalacion basica con pocos metros de tuberia, soporte sencillo y acceso directo. Otros incluyen mas metros, canaleta, soporte reforzado, bomba de condensados o trabajos de mayor dificultad. Si no se aclara el alcance, la cifra mas baja puede crecer cuando el instalador ve la vivienda.",
          "Tambien pregunta si se realiza vacio del circuito y puesta en marcha completa. Son pasos importantes para proteger el equipo y comprobar que no hay fugas ni fallos de rendimiento. Un split nuevo puede funcionar al principio aunque la instalacion no sea correcta, pero los problemas aparecen despues: perdida de frio, ruido, consumo elevado, agua interior o averia prematura del compresor.",
          "Antes de aceptar, confirma donde quedaran el split interior, el modulo exterior, la canaleta y el desague. Una instalacion limpia no solo debe enfriar; tambien debe integrarse en la vivienda, evitar molestias a vecinos y permitir mantenimiento futuro. Si el recorrido se decide con criterio desde el principio, el precio queda mas justificado y el resultado suele durar mas.",
          "Tambien es recomendable confirmar si el presupuesto contempla retirada de embalajes, explicacion basica de uso y primera comprobacion de frio, drenaje y ruido. Estos detalles parecen menores, pero ayudan a detectar errores de montaje antes de que el instalador se marche y evitan dudas cuando llega el primer dia de calor intenso.",
          "Si la vivienda esta habitada, prepara el espacio de trabajo: despeja la pared interior, protege muebles cercanos y confirma que hay acceso a terraza, balcon o fachada autorizada. Esto reduce tiempo muerto y facilita un acabado limpio. Si el edificio exige permiso comunitario o limita la colocacion exterior, conviene resolverlo antes de fijar fecha de montaje."
        ]
      },
      {
        "heading": "Partidas que conviene confirmar antes de aceptar",
        "paragraphs": [
          "Antes de aceptar el presupuesto, pregunta cuantos metros de tuberia frigorifica incluye y cuanto cuesta cada metro adicional. Esta partida suele explicar muchas diferencias entre ofertas. Una vivienda con unidad exterior cerca de la interior puede quedar dentro de una instalacion basica; otra con terraza alejada, patio o recorrido por canaleta puede necesitar mas material y tiempo.",
          "Tambien conviene confirmar el tipo de soporte exterior. No es lo mismo colocar la maquina sobre suelo de terraza que fijarla en pared, usar silentblocks, trabajar con acceso dificil o cumplir una condicion de la comunidad. Un soporte mal elegido puede transmitir vibracion, generar ruido o complicar el mantenimiento.",
          "La conexion electrica debe quedar clara. Algunas instalaciones aprovechan una toma existente adecuada; otras necesitan revisar linea, proteccion o punto de alimentacion. Si el equipo se conecta de cualquier manera, puede funcionar, pero no necesariamente de forma segura. Por eso el presupuesto debe diferenciar instalacion frigorifica, drenaje y parte electrica.",
          "Por ultimo, pregunta como se documenta la instalacion. Factura, modelo del equipo, fecha de montaje y alcance del trabajo ayudan si aparece una incidencia o si mas adelante se hace mantenimiento. El precio de instalar aire acondicionado split debe cubrir el montaje, pero tambien dejar una base clara para cuidar el equipo durante los proximos anos."
        ]
      }
    ],
    "faq": [
      {
        "question": "¿Por que cambia el precio del montaje de un split?",
        "answer": "Cambia por la distancia entre unidades, ubicacion del equipo exterior, desague, potencia, material incluido, acceso y si existe preinstalacion aprovechable."
      },
      {
        "question": "¿Una preinstalacion siempre reduce el coste?",
        "answer": "No siempre. Si esta en buen estado puede ahorrar trabajo, pero si las lineas estan danadas, sucias o mal dimensionadas puede requerir revision o sustitucion."
      },
      {
        "question": "¿Que debe incluir una instalacion profesional?",
        "answer": "Debe incluir fijacion de unidades, tuberias, aislamiento, desague, conexion adecuada, vacio del circuito, puesta en marcha y comprobacion final."
      }
    ],
    "llmAnswer": "El coste de instalar un split depende de la distancia entre unidades, colocacion exterior, desague, potencia del equipo, material incluido y complejidad del montaje."
  },
  {
    slug: 'caldera-no-arranca-que-revisar',
    categorySlug: 'calefaccion',
    serviceSlug: 'calefaccion',
    title: '¿Qué revisar si la caldera no arranca?',
    h1: '¿Qué revisar si la caldera no arranca?',
    description: 'Comprobaciones bÁsicas antes de llamar al técnico cuando una caldera no enciende.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'calefaccion-caldera-no-arranca',
    primaryKeyword: 'caldera no arranca',
    secondaryKeywords: ['caldera no enciende', 'fallo caldera', 'reparacion caldera'],
    commercialOwner: '/calefaccion/reparacion-calderas',
    outline: ['Presion', 'Gas o suministro', 'Termostato', 'Codigo de error', 'Seguridad'],
    bodySections: [
      {
        heading: 'Primeras comprobaciones si la caldera no arranca',
        paragraphs: [
          'Cuando una caldera no arranca, lo primero es revisar lo visible sin manipular partes internas. Comprueba si hay corriente, si el display muestra error, si el termostato pide calefaccion o agua caliente y si la presion esta dentro del rango recomendado por el fabricante. Muchas calderas bloquean el encendido si detectan presion baja, falta de suministro o una condicion de seguridad.',
          'Tambien conviene observar si la caldera intenta arrancar y se para, si no hace nada, si solo falla con calefaccion o si tambien falla con agua caliente. Esa diferencia orienta mucho el diagnostico. No es lo mismo un problema de demanda, una falta de gas, una averia de encendido o un bloqueo por seguridad.',
        ],
      },
      {
        heading: 'Presion, termostato y suministro',
        paragraphs: [
          'La presion baja es una causa frecuente de bloqueo. Si el manometro marca por debajo del rango normal, la caldera puede impedir el arranque para proteger el circuito. Rellenar sin saber por que bajo la presion puede servir de forma puntual, pero si vuelve a caer hay que revisar fugas, purgadores, vaso de expansion o valvula de seguridad.',
          'El termostato tambien puede confundir. Si esta apagado, sin pilas, mal configurado o en una temperatura inferior a la ambiente, la caldera no recibira demanda de calefaccion. Para agua caliente, revisa si el fallo aparece al abrir un grifo concreto o en toda la vivienda. Un caudal insuficiente o sensor defectuoso puede impedir el encendido sanitario.',
        ],
      },
      {
        heading: 'Codigos de error y bloqueos',
        paragraphs: [
          'Los codigos de error son utiles, pero no siempre indican una pieza exacta. Un mismo codigo puede estar relacionado con falta de gas, mala evacuacion, sonda, ventilador, presostato, bomba o encendido. Apuntar el codigo antes de resetear ayuda al tecnico a entender que proteccion se activo.',
          'Resetear una vez puede ser razonable si el manual lo permite y no hay olor a gas, ruido raro o fuga. Resetear muchas veces no lo es. Si el bloqueo vuelve, la caldera esta avisando de una condicion que debe revisarse. Forzar el arranque puede agravar una averia o ocultar una situacion de seguridad.',
        ],
      },
      {
        heading: '¿Cuando no tocar la caldera?',
        paragraphs: [
          'No manipules la caldera si hay olor a gas, marcas de quemado, fuga de agua, ruido fuerte, salida de humos anormal o bloqueo repetido. Cierra el gas si procede, ventila y evita encender interruptores si sospechas fuga de gas. En esos casos no estamos ante una simple duda de uso, sino ante una posible incidencia de seguridad.',
          'Tampoco conviene abrir la carcasa ni tocar conexiones internas sin autorizacion. Una caldera combina gas, electricidad, agua y evacuacion de humos. Aunque parezca un electrodomestico domestico, su reparacion debe hacerla personal cualificado con herramientas y criterio tecnico.',
        ],
      },
      {
        heading: '¿Que revisa un tecnico?',
        paragraphs: [
          'Un tecnico revisa presion, alimentacion electrica, demanda del termostato, suministro de gas, encendido, bomba, sensores, ventilador, evacuacion y posibles fugas. Tambien interpreta el historial de errores y comprueba si el fallo se produce en calefaccion, agua caliente o ambos modos.',
          'El objetivo no es cambiar piezas por probar, sino confirmar la causa. A veces basta ajustar presion o sustituir una pieza menor; otras veces hay que reparar una averia de combustion, bomba, sonda o placa. En Reparar24 damos presupuesto previo y explicamos la solucion antes de intervenir.',
        ],
      },
      {
        heading: '¿Como distinguir si el fallo es electrico, de gas o de agua?',
        paragraphs: [
          'La forma en que falla la caldera ayuda a ordenar posibilidades. Si no se enciende ningun piloto, no hay pantalla o el equipo parece muerto, puede haber un problema de alimentacion electrica, fusible, enchufe, interruptor o placa. Si hay pantalla pero no aparece llama, conviene revisar si existe demanda real, suministro de gas, presion correcta y ausencia de bloqueos.',
          'Cuando la caldera intenta arrancar, hace el ciclo y se detiene, el origen puede estar en encendido, ionizacion, evacuacion, ventilador, presostato, sensores o combustion. Cuando solo falla el agua caliente y la calefaccion funciona, la pista cambia hacia caudal sanitario, sensor de flujo o intercambiador. Cuando solo falla la calefaccion, el termostato, bomba, valvulas o circuito pueden tener mas peso.',
          'Esta lectura no sustituye al diagnostico, pero evita llamar diciendo solo "no va". Explicar si la caldera tiene luz, si muestra codigo, si intenta arrancar, si huele a gas, si hay agua caliente o si la presion esta baja permite preparar mejor la visita. Tambien ayuda a decidir si es una urgencia real o una revision programada.',
        ],
      },
      {
        heading: '¿Que datos anotar antes de pedir asistencia?',
        paragraphs: [
          'Antes de llamar, anota marca y modelo si los ves sin desmontar, codigo de error, presion en frio, si hay agua caliente, si funciona la calefaccion, cuando empezo el fallo y si ya se ha reseteado. Tambien conviene decir si la caldera ha pasado revision reciente, si se han purgado radiadores o si hubo cortes de gas, agua o electricidad.',
          'Si hay fotos del display, manometro o zona donde aparece agua, pueden ahorrar tiempo. No hace falta enviar imagenes de partes internas ni abrir tapas; basta documentar lo visible. En viviendas alquiladas, comunidades o locales, esta informacion tambien ayuda al propietario o administrador a autorizar la actuacion con menos dudas.',
          'Cuanto mas claro sea el sintoma inicial, mas facil es evitar presupuestos vagos. Una caldera no arranca por muchas razones, y la diferencia entre bloqueo puntual, falta de presion, fallo de encendido o problema de seguridad cambia el tipo de intervencion. Por eso el diagnostico empieza antes de tocar la maquina.',
        ],
      },
      {
        heading: 'Errores que pueden empeorar la averia',
        paragraphs: [
          'El error mas comun es resetear continuamente hasta que la caldera arranque. Si el bloqueo se repite, el equipo esta protegiendose. Forzarlo puede ocultar el codigo original, calentar componentes, hacer trabajar la bomba en malas condiciones o retrasar una reparacion que al principio era sencilla.',
          'Otro error es subir presion por encima del rango recomendado para "asegurar". Una presion excesiva puede provocar descarga por la valvula de seguridad y dar la sensacion de que la caldera pierde agua. Tambien es mala idea tapar rejillas, modificar salidas de humos, manipular gas o abrir la carcasa para buscar una pieza suelta.',
          'Si el equipo arranca despues de varios intentos pero vuelve a fallar al dia siguiente, tratala como averia, no como casualidad. Las calderas suelen avisar antes de detenerse del todo: ruidos, bloqueos, perdida de presion, olor, dificultad de encendido o agua caliente irregular. Atender esos avisos reduce riesgo y coste.',
        ],
      },
      {
        heading: '¿Cuando conviene reparar y cuando valorar sustitucion?',
        paragraphs: [
          'Una caldera que no arranca no implica automaticamente sustitucion. Si el equipo esta en buen estado, tiene repuestos disponibles y el fallo esta localizado, una reparacion puede ser suficiente. En cambio, si acumula bloqueos, pierde presion, hace ruido, consume mas de lo normal y ya ha tenido varias intervenciones, conviene comparar el coste de reparar con la fiabilidad futura.',
          'La antiguedad pesa, pero no es el unico criterio. Tambien importan uso, mantenimiento, disponibilidad de piezas, tipo de averia y seguridad. Un tecnico serio no deberia recomendar cambiar por sistema ni reparar a ciegas. Debe explicar la causa probable, el coste, el riesgo de repeticion y si hay senales de desgaste general.',
          'Para el usuario, la mejor decision es la que evita quedarse sin calefaccion o agua caliente repetidamente. Si la caldera falla en plena temporada, una reparacion rapida puede resolver la urgencia. Si los fallos se repiten, planificar sustitucion con tiempo puede salir mejor que encadenar avisos y desplazamientos.',
        ],
      },
      {
        heading: '¿Como prevenir bloqueos repetidos?',
        paragraphs: [
          'La mejor prevencion es revisar la caldera antes de la temporada de frio, purgar radiadores cuando corresponde y vigilar si la presion baja con frecuencia. Tambien ayuda no tapar salidas, no modificar ventilaciones y no retrasar pequenas fugas del circuito. Muchas averias graves empiezan como sintomas intermitentes.',
          'Si la caldera no arranca una vez y luego funciona semanas, puede haber sido un bloqueo puntual. Si ocurre varias veces, hay que tratarlo como senal. Un diagnostico temprano evita quedarse sin calefaccion o agua caliente en el peor momento y permite decidir con calma entre reparacion, mantenimiento o sustitucion.',
        ],
      },
      {
        heading: '¿Como explicar el fallo sin tocar la maquina?',
        paragraphs: [
          'Cuando una caldera no funciona, explicar el sintoma con precision ayuda mas que intentar desmontar. Indica si la caldera no enciende nada, si tiene pantalla, si muestra error, si intenta arrancar o si se bloquea al pedir agua caliente. Si la caldera no calienta agua pero la calefaccion si responde, la revision se orienta de forma distinta.',
          'Un fallo caldera tambien puede aparecer solo en calefaccion, solo en agua sanitaria o en ambos servicios. Para una reparacion caldera segura, no manipules gas, carcasa ni salida de humos. Documenta lo visible, corta uso si hay olor o fuga y pide diagnostico. Asi el tecnico llega con una hipotesis clara y sin que se hayan borrado pistas utiles.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Puedo resetear la caldera si no arranca?',
        answer: 'Puedes hacerlo una vez si el manual lo permite y no hay olor a gas, fuga o ruido raro. Si el bloqueo vuelve, llama a un tecnico.',
      },
      {
        question: '¿La presión baja impide que arranque?',
        answer: 'Si. Muchas calderas bloquean el encendido con presion baja. Si la presion cae repetidamente, hay que buscar la causa.',
      },
      {
        question: '¿CuÁndo es urgente pedir ayuda?',
        answer: 'Si hay olor a gas, fuga de agua, marcas de quemado, salida de humos anormal o bloqueos repetidos, conviene llamar sin manipular.',
      },
    ],
    llmAnswer: 'Si la caldera no arranca, revisa presion, suministro, termostato y codigo de error. Si hay olor a gas o bloqueo repetido, llama a un tecnico.',
  },
  {
    slug: 'radiador-no-calienta-causas',
    categorySlug: 'calefaccion',
    serviceSlug: 'calefaccion',
    title: '¿Por qué un radiador no calienta?',
    h1: '¿Por qué un radiador no calienta?',
    description: 'Causas habituales de radiadores fríos y cuÁndo basta purgar o hace falta revisar el circuito.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'calefaccion-radiador-no-calienta',
    primaryKeyword: 'radiador no calienta',
    secondaryKeywords: ['radiador frio', 'purgar radiadores', 'radiador no calienta abajo'],
    commercialOwner: '/calefaccion/radiadores-calefaccion',
    outline: ['Aire en el circuito', 'Valvula cerrada', 'Lodos', 'Equilibrado hidraulico'],
    bodySections: [
      {
        heading: '¿Por qué un radiador no calienta?',
        paragraphs: [
          'Un radiador que no calienta puede tener aire acumulado, valvula cerrada, falta de caudal, lodos en el circuito, desequilibrio hidraulico o un problema en la caldera. La pista principal es como falla: si esta frio arriba, frio abajo, frio entero o si solo falla uno mientras los demas funcionan.',
          'No conviene asumir que siempre basta purgar. Purgar ayuda cuando hay aire, pero si el radiador sigue frio puede haber otro problema. Revisar el comportamiento del resto de la instalacion evita tocar piezas innecesarias y ayuda a distinguir entre una incidencia local y una averia del sistema.',
        ],
      },
      {
        heading: 'Aire en el circuito y purgado',
        paragraphs: [
          'El aire acumulado suele provocar radiadores calientes abajo y frios arriba, ruidos de circulacion o calor irregular. Purgar permite sacar aire, pero debe hacerse con cuidado y controlando despues la presion de la caldera. Si tras purgar baja demasiado la presion, la caldera puede bloquearse o trabajar mal.',
          'Si hay que purgar con frecuencia, el problema puede estar en una fuga pequena, un vaso de expansion, una entrada de aire o un mantenimiento pendiente. En ese caso purgar solo resuelve el sintoma por unos dias. Conviene revisar por que el circuito vuelve a acumular aire.',
        ],
      },
      {
        heading: 'Valvulas, detentores y caudal',
        paragraphs: [
          'Un radiador puede estar frio porque la valvula esta cerrada, bloqueada o porque el detentor no deja pasar caudal suficiente. Tambien puede ocurrir que una valvula termostatica quede agarrotada despues de meses sin uso. En estos casos, el radiador no recibe agua caliente aunque la caldera funcione.',
          'Manipular detentores sin criterio puede desequilibrar la instalacion. Si se abren o cierran al azar, unos radiadores calientan demasiado y otros dejan de hacerlo. El equilibrado busca repartir caudal segun recorrido y demanda, especialmente en viviendas grandes o instalaciones antiguas.',
        ],
      },
      {
        heading: 'Lodos y suciedad en radiadores',
        paragraphs: [
          'Cuando un radiador esta caliente arriba y frio abajo, puede haber acumulacion de lodos o suciedad. Con el tiempo, oxidos y particulas se depositan en la parte baja y reducen el intercambio de calor. Esto hace que el radiador tarde mas en calentar o no entregue potencia suficiente.',
          'La solucion depende del estado del circuito. A veces basta una revision y ajuste; otras veces se necesita limpieza del circuito, tratamiento o actuacion sobre varios radiadores. Si el problema afecta a muchos puntos, no conviene centrarse solo en el radiador mas visible.',
        ],
      },
      {
        heading: '¿Cuando el problema esta en la caldera?',
        paragraphs: [
          'Si todos los radiadores calientan poco, la causa puede estar en la caldera, bomba, presion, temperatura de impulsion o una averia de control. Tambien puede existir aire general en el circuito o una instalacion mal equilibrada. En este escenario, purgar un radiador aislado dificilmente resolvera el conjunto.',
          'Observa si hay agua caliente sanitaria normal, si la caldera alcanza temperatura, si hace ruido, si se bloquea o si la presion cambia. Estos datos ayudan a diferenciar entre radiador local, circuito de calefaccion o generador de calor.',
        ],
      },
      {
        heading: 'Un radiador frio frente a toda la vivienda fria',
        paragraphs: [
          'La primera separacion importante es saber si falla un radiador o si la vivienda completa calienta mal. Si solo hay un radiador frio y los demas funcionan, lo mas probable es un problema local: aire, valvula, detentor, suciedad o falta de caudal en ese punto. Si todos calientan poco, hay que mirar el sistema completo.',
          'Cuando fallan varios radiadores de una misma zona, puede existir desequilibrio, tramo con aire, bomba insuficiente o una llave parcialmente cerrada. En viviendas de dos plantas, los radiadores altos pueden acusar antes la falta de presion o el aire. En instalaciones antiguas, los recorridos largos tambien hacen que algunos puntos reciban menos caudal.',
          'Esta diferencia evita soluciones demasiado simples. Purgar un radiador aislado tiene sentido si el sintoma coincide con aire. Pero si toda la casa esta fria, insistir en purgar puede bajar la presion de la caldera y anadir otro problema. Mirar el conjunto permite elegir mejor el siguiente paso.',
        ],
      },
      {
        heading: 'Despues de purgar: que comprobar',
        paragraphs: [
          'Despues de purgar un radiador, revisa la presion de la caldera con la instalacion fria o segun indique el fabricante. Si la presion queda baja, la caldera puede bloquearse o no circular bien. Tambien comprueba si el radiador empieza a calentar de forma uniforme o si solo mejora durante unas horas.',
          'Si vuelve a entrar aire al poco tiempo, puede haber una microfuga, entrada de aire por el circuito, problema de vaso de expansion o falta de mantenimiento. El aire recurrente no debe tratarse como una tarea normal de cada semana. Es una pista de que el sistema no esta estable.',
          'Tambien observa ruidos de burbujeo, golpes, radiadores que calientan por zonas y cambios de presion. Esos detalles permiten decidir si basta una actuacion sencilla o si conviene revisar toda la instalacion de calefaccion. El objetivo no es solo que un radiador caliente hoy, sino que el circuito funcione sin repetir el fallo.',
        ],
      },
      {
        heading: 'Radiadores en plantas altas, viviendas grandes y reformas',
        paragraphs: [
          'En plantas altas o viviendas con muchos radiadores, la falta de caudal se nota antes. Un radiador lejano puede calentar tarde o quedarse templado si el circuito no esta equilibrado. Tambien ocurre despues de cambiar radiadores, mover tuberias o instalar valvulas nuevas sin ajustar el conjunto.',
          'Las reformas pueden alterar el comportamiento aunque la caldera sea la misma. Un radiador mas grande, un recorrido nuevo o un detentor mal regulado cambia la distribucion del agua caliente. Por eso, despues de una reforma no basta comprobar que no hay fugas: tambien hay que verificar que todos los puntos reciben caudal adecuado.',
          'Si el problema aparece cada invierno, merece una revision completa. Ajustar un unico radiador puede aliviar el sintoma, pero una instalacion desequilibrada seguira generando habitaciones frias, consumo alto y quejas repetidas. La intervencion correcta combina diagnostico, regulacion y comprobacion de temperatura.',
        ],
      },
      {
        heading: '¿Que datos ayudan a localizar la causa?',
        paragraphs: [
          'Antes de pedir asistencia, apunta que radiador falla, si esta frio arriba, abajo o completo, si los demas calientan, si la caldera muestra presion normal y si el problema empeora en determinadas horas. Tambien sirve saber si el radiador tiene valvula termostatica, si se ha purgado recientemente o si hubo obras en la instalacion.',
          'Toca el radiador con prudencia y compara entrada, salida y cuerpo central. Si una tuberia llega caliente pero el radiador no, la pista apunta a valvula, detentor o circulacion local. Si ninguna tuberia llega caliente, puede haber corte de caudal antes de ese punto. Si todos los radiadores estan templados, mira la caldera y la temperatura de impulsion.',
          'Esta informacion reduce pruebas innecesarias. El tecnico puede revisar primero el punto mas probable y despues confirmar el equilibrio del circuito. En instalaciones con varios sintomas, ordenar datos es casi tan importante como la herramienta: evita confundir aire, lodos, falta de presion y problemas de caldera.',
          'Tambien conviene recordar si el radiador alguna vez calento bien. Un radiador nuevo que nunca funciono apunta a instalacion, equilibrado o valvulas. Un radiador antiguo que dejo de calentar despues de anos de uso apunta mas a aire, suciedad, caudal o desgaste de componentes. Esa diferencia cambia la prioridad del diagnostico.',
          'Si hay habitaciones frias aunque el radiador parezca templado, anota tambien orientacion, aislamiento y tiempo que tarda en calentar. A veces el problema no es solo el radiador, sino el rendimiento real del circuito en esa zona.',
        ],
      },
      {
        heading: '¿Cuando llamar a un tecnico?',
        paragraphs: [
          'Conviene llamar si el radiador sigue frio tras comprobaciones basicas, si hay que purgar a menudo, si la presion baja, si varios radiadores fallan o si hay ruidos, fugas o calor muy desigual. Tambien cuando la instalacion lleva mucho tiempo sin mantenimiento o se han cambiado radiadores recientemente.',
          'En Reparar24 revisamos radiadores, valvulas, presion y comportamiento del circuito. La guia ayuda a entender el problema, pero la pagina comercial de radiadores y calefaccion es el punto correcto para solicitar diagnostico y presupuesto previo.',
        ],
      },
      {
        heading: '¿Como purgar radiadores sin perder el control de la presion?',
        paragraphs: [
          'Como purgar radiadores de forma segura empieza con la calefaccion parada o siguiendo las instrucciones del fabricante. Abre el purgador despacio, deja salir aire hasta que aparezca agua de forma estable y cierra sin forzar. Despues revisa la presion de la caldera. Si baja demasiado, el sistema puede bloquearse o calentar peor.',
          'Si un radiador no calienta abajo, purgar no siempre sera la solucion. Ese sintoma puede indicar lodos o falta de circulacion. Si el radiador frio mejora arriba pero sigue sin calentar en la parte baja, conviene revisar caudal, valvulas y suciedad del circuito. La comprobacion evita repetir purgados que no resuelven la causa.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Por qué un radiador estÁ frío arriba?',
        answer: 'Suele indicar aire acumulado. Puede requerir purgado y despues revisar la presion de la caldera.',
      },
      {
        question: '¿Por qué un radiador estÁ frío abajo?',
        answer: 'Puede indicar lodos, suciedad o falta de circulacion. Si ocurre en varios radiadores, conviene revisar el circuito.',
      },
      {
        question: '¿Es normal purgar radiadores muchas veces?',
        answer: 'No. Si necesitas purgar con frecuencia, puede haber fuga, entrada de aire o problema de mantenimiento.',
      },
    ],
    llmAnswer: 'Un radiador puede no calentar por aire, valvula cerrada, lodos o desequilibrio del circuito. Purgar ayuda, pero no siempre resuelve.',
  },
  {
    slug: 'presion-baja-caldera',
    categorySlug: 'calefaccion',
    serviceSlug: 'calefaccion',
    title: '¿Qué significa presión baja en la caldera?',
    h1: '¿Qué significa presión baja en la caldera?',
    description: 'Por qué baja la presión de la caldera y qué indica si ocurre con frecuencia.',
    intent: 'diagnosis',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'calefaccion-presion-baja-caldera',
    primaryKeyword: 'presion baja caldera',
    secondaryKeywords: ['caldera pierde presion', 'subir presion caldera', 'fuga circuito calefaccion'],
    commercialOwner: '/calefaccion/reparacion-calderas',
    outline: ['Presion normal', 'Rellenado', 'Fugas', 'Vaso de expansion', 'Avisos de seguridad'],
    bodySections: [
      {
        heading: '¿Qué significa presión baja en la caldera?',
        paragraphs: [
          'La presion baja en la caldera significa que el circuito de calefaccion no tiene la presion de agua suficiente para trabajar con normalidad. Muchas calderas muestran aviso, bloquean el encendido o dejan de calentar para proteger el sistema. La presion recomendada depende del fabricante, pero suele revisarse con la instalacion fria y siguiendo el manual.',
          'Una bajada puntual puede ocurrir despues de purgar radiadores o tras una pequena perdida controlada. El problema aparece cuando la presion baja una y otra vez. En ese caso, rellenar solo devuelve el valor durante un tiempo, pero no explica por que se pierde presion.',
        ],
      },
      {
        heading: 'Causas habituales de perdida de presion',
        paragraphs: [
          'Las causas mas frecuentes son pequenas fugas en radiadores, llaves, purgadores, conexiones, valvula de seguridad o circuito oculto. Tambien puede fallar el vaso de expansion, que compensa los cambios de volumen del agua al calentarse. Si no funciona bien, la presion puede subir y bajar de forma anormal.',
          'Otra posibilidad es que el circuito haya quedado con aire despues de una intervencion o purgado. El aire puede generar ruidos, calor irregular y cambios de presion. Si el sistema se rellena muchas veces, tambien se introduce agua nueva con oxigeno y minerales, lo que puede acelerar corrosion o lodos.',
        ],
      },
      {
        heading: '¿Como rellenar sin crear otro problema?',
        paragraphs: [
          'Si el manual indica como rellenar y no hay fugas visibles, puedes subir la presion con prudencia hasta el rango recomendado. Hazlo con la caldera fria, lentamente y cerrando bien la llave de llenado. Subir demasiado la presion puede provocar descarga por la valvula de seguridad o nuevos avisos.',
          'No dejes la llave de llenado abierta ni rellenes cada pocos dias como rutina. Si la presion vuelve a bajar, hay una causa pendiente. Apunta cuanto tarda en bajar, si ocurre al usar calefaccion, si hay goteos y si algun radiador necesita purgado frecuente. Esa informacion es muy util para el diagnostico.',
        ],
      },
      {
        heading: 'Senales de fuga en el circuito',
        paragraphs: [
          'Una fuga puede ser visible o muy pequena. Revisa manchas bajo radiadores, llaves, conexiones, suelo cercano a tuberias, caldera y valvula de seguridad. Tambien observa si hay humedad en pared o techo, especialmente despues de usar calefaccion. Una fuga minima puede no formar charco, pero si bajar la presion con el tiempo.',
          'Si la instalacion tiene tuberias empotradas, la fuga puede no verse al principio. En ese caso, los sintomas indirectos importan: presion que baja siempre, marcas de humedad, ruido en circuito o necesidad de rellenar con frecuencia. No conviene abrir paredes sin comprobaciones previas.',
        ],
      },
      {
        heading: 'Vaso de expansion y valvula de seguridad',
        paragraphs: [
          'El vaso de expansion absorbe la dilatacion del agua al calentarse. Si pierde carga o se averia, la presion puede subir demasiado en caliente y caer despues. A veces el usuario solo ve que la caldera pide agua, pero el origen esta en este componente o en la valvula de seguridad que descarga por exceso de presion.',
          'Este tipo de comprobacion debe hacerla un tecnico. Cambiar presion a ciegas o rellenar continuamente no soluciona el fallo. Si el vaso o la valvula trabajan mal, la caldera puede entrar en bloqueos repetidos y el circuito sufrir mas de lo necesario.',
        ],
      },
      {
        heading: 'Presion baja en frio o cambios al calentar',
        paragraphs: [
          'No es lo mismo una presion baja caldera constante que una presion normal en frio y excesiva en caliente. Si la presion cae cuando la caldera esta parada, puede haber perdida de agua en el circuito o descarga previa por algun componente. Si sube mucho al calentar y despues baja, el vaso de expansion o la valvula de seguridad pueden estar implicados.',
          'Por eso conviene observar el manometro en momentos distintos: antes de encender calefaccion, con los radiadores calientes y horas despues de apagar. No hace falta manipular nada para anotar esos valores. Esa informacion ayuda a entender si el sistema pierde agua, si expande mal o si hay un comportamiento asociado al uso de calefaccion.',
          'Si la caldera solo da aviso por la manana, despues de una noche fria, puede estar cerca del limite minimo. Si la presion cae despues de purgar, el origen puede ser la perdida de agua durante el purgado. Si baja aunque no uses calefaccion, la sospecha de fuga o componente defectuoso gana peso.',
        ],
      },
      {
        heading: '¿Que pasa si rellenas demasiado?',
        paragraphs: [
          'Rellenar la caldera por encima del rango recomendado no mejora el funcionamiento. Al calentarse, el agua se dilata y la presion puede subir mas de la cuenta. Entonces la valvula de seguridad puede descargar agua para proteger el sistema, y al enfriarse la presion vuelve a quedar baja. El usuario ve que "pierde presion", pero parte del problema fue un exceso de llenado.',
          'Tambien puede ocurrir que la llave de llenado quede mal cerrada. En ese caso, la presion puede variar de forma rara o subir lentamente. Por seguridad, el llenado debe ser lento, controlado y finalizado cerrando bien la llave. Si no tienes claro el procedimiento, es mejor no improvisar.',
          'La presion correcta no se decide a ojo ni por comparacion con otra vivienda. Cada modelo y cada instalacion tienen rangos de trabajo. Lo importante es mantenerse dentro de lo indicado y, sobre todo, no convertir el rellenado en una rutina frecuente que oculte la averia real.',
        ],
      },
      {
        heading: '¿Como detectar pequenas fugas sin abrir paredes?',
        paragraphs: [
          'Antes de pensar en una fuga oculta, revisa lo accesible: bajos de radiadores, llaves, purgadores, uniones visibles, zona inferior de la caldera, desague de valvula de seguridad y marcas de humedad cerca de tuberias. Una gota cada cierto tiempo puede bastar para que la presion baje lentamente. Si la caldera pierde presion cada pocos dias, la causa puede estar en una fuga circuito calefaccion o en un componente que descarga agua.',
          'Tambien mira si hay pintura abombada, rodapies hinchados, manchas que aparecen con calefaccion o zonas del suelo con humedad. En comunidades o viviendas con vecinos debajo, conviene preguntar si han notado marcas recientes. La fuga pequena no siempre se ve como charco; a veces se detecta por repeticion de sintomas.',
          'Si no aparece nada visible, no conviene romper sin criterio. Un tecnico puede combinar observacion, pruebas de presion, revision de componentes y, si procede, localizacion mas precisa. La prioridad es confirmar si la perdida esta en caldera, radiadores, valvulas o tramo oculto antes de abrir.',
        ],
      },
      {
        heading: 'Relacion entre purgado, radiadores y presion',
        paragraphs: [
          'Purgar radiadores libera aire, pero tambien puede sacar agua del circuito. Si se purgan varios radiadores, la presion de la caldera puede bajar por debajo del minimo y provocar bloqueo. Subir presion caldera debe hacerse despacio y solo hasta el rango recomendado. Por eso, despues de purgar, siempre conviene comprobar el manometro y devolver el circuito al rango indicado por el fabricante si sabes hacerlo con seguridad.',
          'Si cada purgado termina con presion baja, hay que preguntarse por que entra aire o por que el circuito no mantiene estabilidad. Puede existir una pequena fuga, un vaso de expansion que no trabaja bien o un mantenimiento pendiente. Purgar sin revisar la causa convierte una solucion puntual en una rutina que nunca termina.',
          'Tambien ocurre al reves: una presion demasiado alta puede generar descarga por la valvula de seguridad, y despues el usuario encuentra la caldera baja de presion. La clave es no mirar solo el numero del manometro, sino el comportamiento completo del sistema antes, durante y despues de usar calefaccion.',
          'Si la vivienda tiene varios radiadores y todos se han purgado, anota si la presion bajo de golpe o si se recupero tras rellenar. Si solo un radiador necesita purgado una y otra vez, ese punto puede estar dando una pista local. Si toda la instalacion acumula aire, la revision debe mirar el circuito completo.',
        ],
      },
      {
        heading: '¿Cuando pedir revision?',
        paragraphs: [
          'Pide revision si la presion baja mas de una vez, si hay humedad, si purgas radiadores a menudo, si la caldera bloquea o si la presion sube demasiado en caliente. Tambien si no sabes usar la llave de llenado o si el equipo esta en garantia y no conviene manipularlo.',
          'En Reparar24 revisamos presion, posibles fugas, radiadores, caldera, vaso de expansion y valvula de seguridad. Esta guia orienta, pero si el sintoma se repite, la solucion correcta es diagnosticar la causa antes de que la calefaccion falle en plena temporada.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Es normal que baje la presión de la caldera?',
        answer: 'Una bajada puntual puede ocurrir tras purgar. Si baja repetidamente, no es normal y conviene revisar fugas o componentes.',
      },
      {
        question: '¿Puedo subir la presión yo mismo?',
        answer: 'Solo si sabes hacerlo segun el manual y sin superar el rango recomendado. Si vuelve a bajar, hay que buscar la causa.',
      },
      {
        question: '¿La presión baja puede indicar fuga?',
        answer: 'Si. Puede ser una fuga visible, pequena, oculta o un problema en vaso de expansion o valvula de seguridad.',
      },
    ],
    llmAnswer: 'La presion baja puede deberse a purgado, pequenas fugas o fallo del vaso de expansion. Si baja repetidamente, necesita revision.',
  },
  {
    slug: 'cuando-limpiar-bajantes-comunidad',
    categorySlug: 'saneamiento',
    serviceSlug: 'limpieza-tuberias',
    title: '¿CuÁndo limpiar las bajantes de una comunidad?',
    h1: '¿CuÁndo limpiar las bajantes de una comunidad?',
    description: 'Frecuencia y señales para programar limpieza preventiva de bajantes comunitarias.',
    intent: 'maintenance',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'saneamiento-limpieza-bajantes',
    primaryKeyword: 'limpiar bajantes comunidad',
    secondaryKeywords: ['mantenimiento bajantes comunidad', 'limpieza bajantes edificio', 'bajantes mal olor'],
    commercialOwner: '/limpieza-tuberias/limpieza-bajantes',
    outline: ['Sintomas', 'Frecuencia anual', 'Edificios antiguos', 'Informe para administrador'],
    bodySections: [
      {
        heading: '¿Por que las bajantes necesitan mantenimiento?',
        paragraphs: [
          'Las bajantes de una comunidad reciben agua y residuos de varias viviendas. Aunque parezcan instalaciones pasivas, con el tiempo acumulan restos de jabon, grasa, cal, papel, pequenas particulas y suciedad que reduce el paso. Cuando el caudal disminuye, aparecen olores, ruidos, desagues lentos o reboses en puntos bajos.',
          'La limpieza preventiva de bajantes evita esperar a que el problema se convierta en urgencia. En edificios con muchos vecinos, locales en planta baja o instalaciones antiguas, un atasco de bajante puede afectar a varias propiedades y generar danos mayores que una revision programada. La limpieza bajantes edificio debe plantearse como mantenimiento, no solo como respuesta a un rebose.',
        ],
      },
      {
        heading: 'Senales de que conviene limpiar bajantes',
        paragraphs: [
          'Hay senales claras: malos olores repetidos, gorgoteos en sanitarios, desagues que tragan lento en varias viviendas, reboses en patios o garajes, manchas cerca de registros y quejas recurrentes de los mismos pisos. Si hay bajantes mal olor y el problema aparece en diferentes viviendas, no suele ser un atasco aislado de un sifon.',
          'Tambien conviene actuar si ya se han hecho desatascos puntuales y el problema vuelve. Abrir paso una vez puede resolver la urgencia, pero si la acumulacion sigue dentro de la bajante, el atasco reaparece. La limpieza ordenada retira residuos y permite valorar si hay deterioro, mala pendiente o necesidad de inspeccion.',
        ],
      },
      {
        heading: 'Frecuencia orientativa en comunidades',
        paragraphs: [
          'No existe una frecuencia unica para todas las comunidades. Depende de antiguedad del edificio, numero de vecinos, uso, diametro de tuberias, historial de incidencias y presencia de locales de hosteleria o negocios con mucho caudal. Como referencia, muchas comunidades se benefician de una revision anual o semestral si hay sintomas.',
          'En edificios sin incidencias, puede bastar una planificacion mas espaciada. En edificios con atascos repetidos, olores o bajantes antiguas, esperar varios anos aumenta el riesgo. Lo importante es registrar incidencias y tomar decisiones por datos, no solo por urgencias.',
          'Si el administrador ya tiene historial de partes, conviene revisar fechas y zonas afectadas. Cuando las incidencias se concentran en plantas bajas, patios, garajes o locales, la bajante puede estar trabajando con menos margen del necesario. En esos casos, limpiar bajantes de comunidad deja de ser una actuacion opcional y se convierte en mantenimiento preventivo.',
          'Para decidir cuando limpiar bajantes comunidad, lo mas util es cruzar sintomas, antiguedad del edificio y frecuencia de avisos reales.',
          'Tambien influye la epoca del ano. Antes de periodos de mayor ocupacion, lluvias o uso intensivo de locales, una revision puede evitar urgencias fuera de horario. No se trata de limpiar por calendario sin mirar el edificio, sino de crear una pauta razonable segun sintomas, antiguedad y riesgo.',
        ],
      },
      {
        heading: '¿Que incluye una limpieza profesional?',
        paragraphs: [
          'Una limpieza profesional puede incluir acceso por registros, uso de maquinaria adecuada, agua a presion, retirada de residuos y comprobacion de evacuacion. Segun el caso, tambien puede recomendarse inspeccion con camara para documentar el estado interior, localizar roturas, raices, hundimientos o acumulaciones persistentes.',
          'El trabajo debe adaptarse al edificio. No es lo mismo una bajante pequena de vivienda que una red comunitaria con arquetas, colectores y locales conectados. Un enfoque correcto reduce molestias y permite informar al administrador con claridad sobre lo realizado y lo pendiente.',
          'En una comunidad, la preparacion del acceso importa mucho. Hay que saber donde estan los registros, si se necesita permiso para entrar en viviendas, si existen tapas en garaje o patio y si hay horarios sensibles para vecinos o negocios. Una limpieza organizada reduce cortes, evita improvisacion y permite terminar con una comprobacion de caudal.',
          'Cuando aparecen residuos duros, grasa, restos de obra o sedimentos, el tecnico puede recomendar una actuacion mas amplia que una apertura puntual. La diferencia es importante: un desatasco urgente resuelve el bloqueo inmediato; el mantenimiento de bajantes busca reducir la probabilidad de que vuelva a repetirse.',
        ],
      },
      {
        heading: 'Bajantes antiguas, locales y edificios con historial',
        paragraphs: [
          'Los edificios antiguos suelen tener bajantes con secciones, materiales o recorridos que no perdonan acumulaciones. Si ademas hay locales de hosteleria, viviendas turisticas o muchos vecinos, el uso diario aumenta la carga de la red. En estos casos, el mantenimiento bajantes comunidad ayuda a anticiparse a olores, gorgoteos y reboses.',
          'No siempre se puede cambiar toda una instalacion, pero si se puede vigilar mejor. Registrar incidencias, limpiar puntos criticos y revisar arquetas permite tomar decisiones graduales. Si cada ano se repite el mismo atasco, la comunidad tiene una senal clara de que la estrategia no debe limitarse a llamar cuando el agua ya sale.',
          'Tambien conviene explicar a vecinos y locales que la red comunitaria no funciona como un cubo sin limite. Toallitas, grasas, restos de obra y objetos pequenos terminan acumulandose. Una parte del mantenimiento es tecnico, y otra parte es reducir malos usos que aceleran la obstruccion.',
        ],
      },
      {
        heading: '¿Como decidir entre limpieza puntual y plan preventivo?',
        paragraphs: [
          'Si la incidencia aparece una vez y tiene una causa clara, una limpieza puntual puede ser suficiente. Si los sintomas vuelven, afectan a varias viviendas o aparecen siempre en la misma zona, conviene pensar en un plan preventivo. La diferencia esta en pasar de reaccionar ante urgencias a mantener la red bajo control.',
          'Un plan no tiene por que ser complejo. Puede consistir en revisar registros principales, limpiar bajantes criticas, comprobar arquetas y dejar anotado que se encontro. Con esa base, la comunidad decide si mantiene una frecuencia anual, semestral o solo por sintomas. Lo importante es que la decision no dependa de memoria o impresiones.',
          'Este enfoque tambien ayuda a justificar presupuesto. Para una comunidad, una actuacion preventiva debe explicarse en terminos sencillos: menos riesgo de rebose, menos olores, menos urgencias y mejor informacion sobre el estado de la red. Asi la limpieza deja de verse como gasto invisible y pasa a ser una proteccion del edificio.',
          'Cuando hay dudas, se puede empezar por los puntos con mas historial y ampliar despues. Esa forma escalonada evita gastar de mas y permite comprobar si la limpieza reduce avisos reales.',
        ],
      },
      {
        heading: 'Informacion util para el administrador',
        paragraphs: [
          'Antes de solicitar servicio, ayuda reunir que viviendas tienen sintomas, desde cuando ocurre, si hay reboses, si existen planos o registros accesibles y si ya hubo actuaciones anteriores. Tambien conviene indicar horarios de acceso, zonas comunes afectadas y si hay necesidad de coordinar con vecinos.',
          'Esta informacion permite preparar equipo, tiempos y presupuesto. En comunidades, la transparencia importa: explicar si se trata de limpieza preventiva, desatasco urgente o inspeccion evita malentendidos y ayuda a justificar la actuacion ante propietarios.',
          'Si hay fotos de registros, tapas, zonas con humedad o partes anteriores, merece la pena conservarlas. No sustituyen la revision, pero ayudan a entender el recorrido de la incidencia. En juntas de propietarios, contar con datos concretos evita que la decision se base solo en quejas aisladas.',
          'Tambien es util separar sintomas de opiniones. "Huele en el portal desde hace dos semanas", "rebosa al usar varias viviendas" o "el garaje tuvo agua sucia el sabado" son datos mas utiles que decir solo que la bajante esta mal. Cuanto mas claro sea el aviso, mejor se prepara el servicio.',
          'Si se aprueba una limpieza, conviene guardar fecha, zona tratada y recomendaciones. Ese registro permite comparar si los avisos bajan y ayuda a decidir la siguiente revision sin empezar desde cero.',
        ],
      },
      {
        heading: '¿Como conectar mantenimiento y servicio profesional?',
        paragraphs: [
          'Una guia informativa ayuda a reconocer sintomas, pero la decision final requiere ver la instalacion. Si hay malos olores, atascos repetidos o reboses, la pagina de limpieza de bajantes es el punto adecuado para solicitar diagnostico. Asi el contenido no sustituye al servicio, sino que prepara mejor la conversacion.',
          'En Reparar24 orientamos a comunidades y administradores con presupuesto previo, actuacion adaptada al edificio y recomendaciones para reducir incidencias futuras. El objetivo es mantener la red limpia, no solo apagar urgencias cuando ya hay agua fuera de sitio.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cada cuÁnto limpiar las bajantes de una comunidad?',
        answer: 'Depende del edificio. Si hay olores, atascos repetidos o bajantes antiguas, suele convenir revision anual o semestral.',
      },
      {
        question: '¿Qué sintomas indican bajante sucia?',
        answer: 'Malos olores, gorgoteos, desagues lentos en varias viviendas, reboses y quejas repetidas en los mismos puntos.',
      },
      {
        question: '¿Hace falta cÁmara para limpiar bajantes?',
        answer: 'No siempre. La camara conviene si hay atascos repetidos, sospecha de rotura, raices o necesidad de documentar el estado.',
      },
    ],
    llmAnswer: 'Una comunidad deberia limpiar bajantes de forma preventiva si hay malos olores, desagues lentos o edificios antiguos con uso intenso.',
  },
  {
    slug: 'inspeccion-camara-tuberias-cuando-conviene',
    categorySlug: 'saneamiento',
    serviceSlug: 'limpieza-tuberias',
    title: '¿Cuándo conviene una inspección con cámara de tuberías?',
    h1: '¿Cuándo conviene una inspección con cámara de tuberías?',
    description: 'Casos en los que una cÁmara CCTV ayuda a localizar roturas, raíces, hundimientos o atascos repetidos.',
    intent: 'selection',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'saneamiento-inspeccion-camara',
    primaryKeyword: 'inspeccion camara tuberias cuando',
    secondaryKeywords: ['camara tuberias', 'inspeccion CCTV tuberias', 'localizar rotura tuberia'],
    commercialOwner: '/limpieza-tuberias/inspeccion-camara-tuberias',
    outline: ['Atascos repetidos', 'Roturas ocultas', 'Raices', 'Informes tecnicos'],
    bodySections: [
      {
        heading: 'Para que sirve una inspeccion con camara',
        paragraphs: [
          'La inspeccion camara tuberias cuando hay dudas repetidas permite ver el interior de una conduccion sin abrir suelos o paredes por intuicion. Se introduce una camara CCTV por un punto de acceso y se observa si hay roturas, raices, hundimientos, juntas abiertas, acumulacion de residuos, objetos retenidos o pendientes incorrectas.',
          'No todos los atascos necesitan camara. Si el problema es puntual y se resuelve claramente, puede no hacer falta. Pero cuando el atasco se repite, cuando hay dudas sobre el tramo afectado o cuando se necesita justificar una reparacion, la camara evita trabajar a ciegas.',
        ],
      },
      {
        heading: 'Atascos repetidos y diagnostico',
        paragraphs: [
          'Un atasco que vuelve una y otra vez suele tener una causa de fondo: acumulacion en una curva, pendiente insuficiente, raiz, deformacion, tramo roto o material adherido. Desatascar abre paso, pero si no se identifica el origen, el problema puede repetirse en semanas o dias.',
          'La camara ayuda a confirmar si el tramo quedo limpio despues de actuar y si existe un defecto estructural. Esta informacion es especialmente util en comunidades, locales, garajes y viviendas con instalaciones antiguas donde abrir sin localizar puede ser caro y molesto.',
        ],
      },
      {
        heading: 'Roturas, raices y hundimientos',
        paragraphs: [
          'Cuando una tuberia esta rota, hundida o invadida por raices, los sintomas pueden parecer un atasco normal: evacuacion lenta, olores o reboses. Sin embargo, la solucion cambia. No basta con retirar residuos si el tramo sigue roto o si la raiz vuelve a crecer dentro de la conduccion.',
          'La inspeccion permite documentar el punto aproximado, la gravedad y el tipo de defecto. Con esa informacion se decide si conviene reparacion puntual, limpieza, sustitucion de tramo o mantenimiento periodico. Tambien ayuda a evitar intervenciones innecesarias en zonas que no tienen problema.',
        ],
      },
      {
        heading: 'Informes para comunidades, seguros y reformas',
        paragraphs: [
          'En comunidades y seguros, una inspeccion con camara puede aportar pruebas visuales del estado de la red. Esto facilita explicar por que se recomienda una limpieza, una reparacion o una actuacion preventiva. Tambien puede servir antes de una reforma para conocer si la instalacion soportara nuevos usos.',
          'Un informe no debe ser solo una grabacion sin contexto. Debe indicar que se ha visto, donde aparece el problema y que actuacion se recomienda. Asi el administrador, propietario o seguro puede tomar decisiones con menos dudas y menos discusiones.',
        ],
      },
      {
        heading: 'Limitaciones de la camara',
        paragraphs: [
          'La camara necesita acceso y condiciones minimas. Si la tuberia esta completamente llena, colapsada o sin punto de entrada, puede ser necesario limpiar o abrir paso antes de inspeccionar. Tambien hay tramos donde la geometria limita el avance. Por eso se decide caso por caso.',
          'La camara no sustituye todas las pruebas. Puede mostrar el interior, pero a veces hace falta combinarla con localizacion, pruebas de agua, mediciones o revision de arquetas. Lo importante es usarla cuando aporta informacion real, no como gasto automatico.',
          'Otra limitacion es la interpretacion. Ver una imagen no siempre basta: hay que entender si lo que aparece es suciedad normal, una junta desplazada, una raiz, un hundimiento o un defecto que exige reparacion. Por eso una inspeccion CCTV tuberias debe ir acompanada de criterio tecnico y recomendacion clara.',
          'Tambien conviene guardar el resultado de forma ordenada. Si la inspeccion se hace para una comunidad, seguro, reforma o compra de inmueble, el valor esta en poder explicar despues que se vio y por que se aconsejo una actuacion. Una grabacion sin conclusiones puede dejar las mismas dudas que antes.',
        ],
      },
      {
        heading: 'Diferencia entre desatascar e inspeccionar con camara',
        paragraphs: [
          'Desatascar busca recuperar el paso del agua. La inspeccion con camara busca entender que hay dentro de la tuberia. A veces se necesitan las dos cosas: primero abrir paso para que el agua evacue y despues introducir la camara para comprobar si queda una causa de fondo. En otros casos, la camara se usa antes de decidir si conviene limpiar, reparar o sustituir.',
          'Esta diferencia evita expectativas equivocadas. Si una tuberia esta llena de residuos, la camara puede no avanzar bien hasta limpiar. Si el atasco se repite siempre en el mismo punto, la camara puede mostrar si hay raiz, rotura, pendiente incorrecta o deposito de grasa. El orden correcto depende del estado de la instalacion.',
          'Para el propietario, la ventaja es tomar decisiones con menos incertidumbre. No es lo mismo pagar una limpieza puntual que justificar una reparacion de tramo, y no es lo mismo sospechar una rotura que verla documentada. La camara tuberias aporta pruebas cuando el problema no se entiende desde fuera.',
        ],
      },
      {
        heading: '¿Que preguntar antes de contratar una inspeccion?',
        paragraphs: [
          'Antes de contratar, pregunta si la inspeccion incluye explicacion del resultado, si se puede localizar el tramo afectado, si se entrega informe o grabacion y que ocurre si la tuberia no permite avanzar. Tambien conviene indicar diametro aproximado, puntos de acceso, tipo de inmueble y sintomas: atascos repetidos, olores, humedad o reboses.',
          'Si se trata de una comunidad, el administrador debe saber si se revisara una bajante, colector, arqueta o tramo concreto. En locales y garajes, puede ser importante coordinar horarios y acceso. Una inspeccion bien planteada ahorra tiempo y evita recorrer tramos que no tienen relacion con el problema.',
          'La camara no debe venderse como solucion magica, sino como herramienta de diagnostico. Su valor aparece cuando responde una pregunta concreta: donde esta el problema, que lo causa, si se repite por un defecto estructural y que actuacion tiene sentido despues.',
        ],
      },
      {
        heading: 'Casos donde la camara cambia la decision',
        paragraphs: [
          'La inspeccion cambia la decision cuando demuestra que el problema no era solo suciedad. Por ejemplo, una raiz dentro del tubo, una junta abierta, un tramo hundido o una pendiente incorrecta explican por que un atasco vuelve aunque se limpie. Si hay que localizar rotura tuberia, esa imagen evita abrir por intuicion. Sin esa prueba, el propietario puede pensar que el servicio anterior fue insuficiente cuando en realidad habia una causa estructural.',
          'Tambien cambia la decision cuando descarta una rotura. Si la camara muestra acumulacion sin dano visible, puede bastar una limpieza mas completa y mantenimiento. Si muestra una rotura localizada, se puede planificar una reparacion mas precisa. En ambos casos, el valor esta en reducir incertidumbre.',
          'En reformas y compraventas, una camara de tuberias puede evitar sorpresas. Saber si hay raices, deformaciones o residuos antes de cerrar una obra permite decidir con mas margen. No es una prueba obligatoria para todo, pero si una herramienta muy util cuando el coste de equivocarse seria alto.',
          'Para negocios, garajes y comunidades, tambien reduce tiempos muertos: se localiza mejor el tramo y se prepara la intervencion con menos improvisacion.',
          'Si la red ya ha tenido varias limpiezas, la camara permite comprobar si el problema es de uso, acumulacion normal o defecto repetitivo. Esa diferencia evita pagar siempre la misma urgencia sin resolver la causa.',
        ],
      },
      {
        heading: '¿Cuando pedir inspeccion a Reparar24?',
        paragraphs: [
          'Pide inspeccion si hay atascos repetidos, sospecha de rotura, malos olores persistentes, humedad sin origen claro, raices, hundimientos o necesidad de documentar el estado de la red. Tambien si vas a comprar, reformar o entregar un local y quieres conocer el estado de las tuberias.',
          'En Reparar24 conectamos la guia con el servicio de inspeccion con camara de tuberias. Revisamos el caso, explicamos si la camara es necesaria y damos presupuesto previo para que la decision tenga sentido tecnico y economico.',
          'Si el problema es urgente, primero se valora si hay que desatascar o contener el agua. Si el problema es repetitivo, la inspeccion ayuda a cerrar el diagnostico. Esta separacion mantiene la guia como contenido informativo y dirige la solicitud comercial al servicio adecuado.',
        ],
      },
    ],
    faq: [
      {
        question: '¿CuÁndo conviene una cÁmara de tuberías?',
        answer: 'Cuando hay atascos repetidos, sospecha de rotura, raices, hundimiento, malos olores persistentes o necesidad de informe.',
      },
      {
        question: '¿La cÁmara evita abrir paredes o suelos?',
        answer: 'Puede ayudar a localizar mejor el problema y evitar abrir por intuicion, aunque en algunos casos despues haga falta reparar el tramo.',
      },
      {
        question: '¿Se puede usar cÁmara si la tubería estÁ llena?',
        answer: 'Depende. A veces hay que limpiar o abrir paso antes para que la camara avance y la imagen sea util.',
      },
    ],
    llmAnswer: 'La inspeccion con camara conviene cuando hay atascos repetidos, sospecha de rotura, raices o necesidad de documentar el estado de la red.',
  },
  {
    slug: 'limpieza-arquetas-olores-comunidad',
    categorySlug: 'saneamiento',
    serviceSlug: 'limpieza-tuberias',
    title: '¿Por qué hay malos olores en arquetas de comunidad?',
    h1: '¿Por qué hay malos olores en arquetas de comunidad?',
    description: 'Por qué aparecen olores en arquetas y cómo prevenirlos con limpieza programada.',
    intent: 'prevention',
    status: 'published',
    indexing: 'index',
    publishedAt: '2026-06-18',
    updatedAt: '2026-06-18',
    originalityStatus: 'external-passed',
    semanticStatus: 'approved',
    semanticClusterId: 'saneamiento-arquetas-olores',
    primaryKeyword: 'malos olores arquetas comunidad',
    secondaryKeywords: ['limpieza arquetas comunidad', 'arquetas con olor', 'mantenimiento arquetas'],
    commercialOwner: '/limpieza-tuberias/limpieza-arquetas-colectores',
    outline: ['Acumulacion de residuos', 'Sifones secos', 'Ventilacion', 'Limpieza preventiva'],
    bodySections: [
      {
        heading: '¿Por que huelen las arquetas de una comunidad?',
        paragraphs: [
          'Los malos olores arquetas comunidad suelen aparecer por acumulacion de residuos, agua estancada, falta de limpieza, sifones secos, ventilacion deficiente o problemas en colectores. Una arqueta esta pensada para registrar y conducir aguas, pero si se llena de sedimentos o restos organicos, se convierte en un foco de olor y posible atasco.',
          'El olor puede subir por patios, garajes, portales, locales o viviendas bajas. A veces se nota solo en dias de calor, despues de lluvias o cuando se usa mucho la red. Ese comportamiento no significa que sea imaginario: las condiciones de presion, temperatura y ventilacion influyen en como se desplazan los gases.',
        ],
      },
      {
        heading: 'Diferenciar olor puntual de problema recurrente',
        paragraphs: [
          'Un olor puntual puede venir de un sifon seco, una tapa mal cerrada o un uso poco frecuente de una zona. Si desaparece al ventilar, revisar cierres o aportar agua a un sifon, puede no requerir una intervencion grande. Pero si vuelve con frecuencia, afecta a varias zonas o va acompanado de desagues lentos, hay que revisar arquetas y colectores.',
          'Los olores recurrentes suelen indicar acumulacion, mala ventilacion o circulacion insuficiente. Tambien pueden aparecer cuando una arqueta esta parcialmente obstruida y el agua queda retenida. Si hay arquetas con olor de forma repetida, limpiar solo la superficie o usar ambientadores no resuelve la causa.',
        ],
      },
      {
        heading: 'Acumulacion de residuos y riesgo de atasco',
        paragraphs: [
          'Con el tiempo, las arquetas reciben arenas, grasa, papel, restos de obra, hojas y sedimentos. Si no se limpian, el volumen util disminuye y el agua circula peor. Esto genera olores y aumenta el riesgo de rebose cuando hay mas caudal de lo habitual.',
          'En comunidades con locales, garajes o jardines, el riesgo puede ser mayor por residuos variados. La limpieza de arquetas y colectores retira material acumulado y permite ver si hay roturas, raices o entradas de tierra que expliquen la acumulacion.',
        ],
      },
      {
        heading: 'Ventilacion, tapas y cierres',
        paragraphs: [
          'No todos los olores vienen de suciedad. Una tapa que no ajusta, un sifon sin agua, una ventilacion mal resuelta o un registro deteriorado puede permitir que los gases salgan al interior de una zona comun. Por eso la revision debe mirar tanto la limpieza como el estado de cierres y recorridos.',
          'Si se cambia una tapa o se sella un punto sin revisar el flujo, el olor puede desplazarse a otra zona. La solucion correcta mantiene la red accesible para mantenimiento y evita convertir una arqueta en un punto imposible de revisar en futuras incidencias.',
        ],
      },
      {
        heading: 'Limpieza preventiva para comunidades',
        paragraphs: [
          'La limpieza preventiva evita que la arqueta solo se abra cuando ya hay rebose. Programar revisiones permite retirar residuos antes de que el nivel suba, detectar tapas deterioradas y decidir si hace falta inspeccion con camara. En edificios antiguos, este mantenimiento suele ser mas barato que reparar danos por agua sucia.',
          'Tambien ayuda a la convivencia. Los malos olores generan quejas, dudas sobre higiene y conflictos entre vecinos o locales. Un plan de mantenimiento documentado permite responder con hechos: que se limpio, que se encontro y que se recomienda para evitar repeticion.',
          'La frecuencia depende del uso. Una comunidad tranquila puede necesitar menos intervenciones que un edificio con locales, garaje, patios interiores o historial de reboses. Lo importante es no esperar a que el olor sea permanente. Cuando una arqueta con olor empieza a repetirse, ya hay una senal de acumulacion o ventilacion deficiente, y el mantenimiento arquetas debe programarse antes de la siguiente urgencia.',
          'La limpieza arquetas comunidad tambien puede servir para detectar problemas que no se ven desde fuera: tapas mal apoyadas, entradas de tierra, sedimentos, raices o colectores con poca pendiente. Esa informacion permite planificar reparaciones antes de que el problema afecte a viviendas o negocios.',
        ],
      },
      {
        heading: 'Mal olor de tuberias o problema de arqueta',
        paragraphs: [
          'Muchas quejas empiezan como "mal olor de tuberias", pero el origen puede estar en una arqueta, un sifon, un colector, una bajante o una ventilacion. Si el olor aparece en un solo bano, puede ser un sifon o desague local. Si aparece en portal, garaje, patio o varias viviendas, la red comunitaria gana probabilidad.',
          'La ubicacion y el momento ayudan. Olor al abrir una tapa, despues de lluvias, con calor o al usar varias viviendas puede apuntar a acumulacion o gases en la red. Olor constante en una zona cerrada puede indicar tapa deteriorada o falta de estanqueidad. Por eso conviene observar antes de tapar el problema con ambientadores.',
          'Como limpiar tuberias con mal olor depende del origen. Si hay sedimentos en arquetas, hace falta retirar residuos. Si hay mala ventilacion, limpiar puede mejorar pero no resolver del todo. Si hay atasco parcial, abrir paso y comprobar circulacion sera prioritario. El diagnostico evita gastar en soluciones cosmeticas.',
        ],
      },
      {
        heading: 'Errores habituales al tratar olores',
        paragraphs: [
          'El error mas comun es sellar una tapa o registro sin pensar en el mantenimiento futuro. Puede reducir el olor unos dias, pero tambien dificulta acceder cuando haya atasco. Otro error es usar productos agresivos sin saber si el problema esta en una arqueta comunitaria, porque el producto no retirara sedimentos pesados ni resolvera ventilacion.',
          'Tambien se suele confundir limpieza superficial con limpieza real. Retirar agua visible o perfumar una zona no elimina grasa, arenas y restos depositados en el fondo. Si el olor vuelve, la causa sigue dentro de la red. En comunidades, documentar la limpieza ayuda a demostrar que se actuo sobre el origen y no solo sobre la molestia.',
          'Cuando hay vecinos afectados, conviene evitar decisiones improvisadas. Una actuacion profesional debe revisar acceso, estado de tapas, residuos, circulacion y posible relacion con bajantes o colectores. Asi se reduce el riesgo de que el olor se desplace a otra zona o reaparezca en pocos dias.',
        ],
      },
      {
        heading: '¿Como documentar el problema para la comunidad?',
        paragraphs: [
          'Si el olor afecta a zonas comunes, conviene anotar fecha, lugar, intensidad aproximada y si coincide con lluvia, calor, uso de garaje o actividad de locales. Tambien sirve registrar si hay desagues lentos, insectos, agua estancada o quejas de viviendas bajas. Estos datos ayudan a diferenciar una molestia puntual de un problema de red.',
          'Las fotos de tapas, registros, zonas humedas o residuos visibles pueden ayudar, siempre sin abrir elementos peligrosos ni manipular instalaciones. Para el administrador, esa documentacion facilita pedir presupuesto, explicar la necesidad de limpieza y comparar si el problema mejora despues de la actuacion.',
          'Cuando la comunidad actua con informacion, se reducen discusiones. No se trata de culpar a un vecino o local, sino de entender como trabaja la red y que mantenimiento necesita. Un olor persistente puede tener varias causas, pero dejar constancia permite encontrar patrones.',
          'Si despues de limpiar el olor vuelve en el mismo punto, ese registro previo ayuda a decidir si hace falta inspeccion, reparacion de tapa o revision de ventilacion.',
        ],
      },
      {
        heading: '¿Cuando llamar a un servicio profesional?',
        paragraphs: [
          'Conviene llamar si el olor es persistente, si hay agua estancada, si aparecen insectos, si los desagues tragan lento, si hay rebose o si la arqueta lleva mucho tiempo sin limpieza. Tambien si la tapa esta rota, sellada de forma improvisada o no se sabe donde estan los registros.',
          'En Reparar24 conectamos esta guia con el servicio de limpieza de arquetas y colectores. Revisamos el acceso, retiramos residuos cuando corresponde, explicamos el origen probable del olor y damos presupuesto previo para la actuacion necesaria.',
          'Si el olor esta asociado a rebose, agua sucia o varios desagues lentos, no conviene esperar. Puede haber una obstruccion parcial que todavia permite evacuar algo de agua, pero que terminara bloqueando la red. Actuar antes reduce danos y facilita limpiar con menos urgencia.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Por qué huele una arqueta de comunidad?',
        answer: 'Puede oler por residuos acumulados, agua estancada, sifones secos, mala ventilacion, tapa deteriorada o colectores con circulacion insuficiente.',
      },
      {
        question: '¿Los ambientadores solucionan el olor?',
        answer: 'No. Pueden taparlo unas horas, pero si hay acumulacion, ventilacion defectuosa o atasco parcial, el olor volvera.',
      },
      {
        question: '¿Cada cuÁnto limpiar arquetas?',
        answer: 'Depende del uso y del historial. Si hay olores, reboses o edificios antiguos, conviene planificar limpieza preventiva y revisar periodicamente.',
      },
    ],
    llmAnswer: 'Los malos olores en arquetas suelen venir de residuos acumulados, sifones secos o ventilacion deficiente. La limpieza preventiva reduce el problema.',
  },
  ...DAILY_BLOG_ARTICLES_2026_06_19,
  ...DAILY_BLOG_ARTICLES_2026_06_20,
  ...DAILY_BLOG_ARTICLES_2026_06_21,
  ...DAILY_BLOG_ARTICLES_2026_06_22,
  ...DAILY_BLOG_ARTICLES_2026_06_23,
  ...DAILY_BLOG_ARTICLES_2026_06_24,
  ...DAILY_BLOG_ARTICLES_2026_06_25,
]
