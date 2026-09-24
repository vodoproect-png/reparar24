export interface BlogCategorySeo {
  heading: string
  targetKeywords: string[]
  paragraphs: string[]
}

export const BLOG_CATEGORY_SEO: Record<string, BlogCategorySeo> = {
  fontaneria: {
    heading: 'Guia de fontaneria para entender averias antes de llamar',
    targetKeywords: [
      'guia de fontaneria',
      'averias de fontaneria',
      'fuga de agua en casa',
      'cisterna gotea',
      'cuanto cuesta un fontanero en Valencia',
    ],
    paragraphs: [
      'Esta guia de fontaneria reune dudas reales que suelen aparecer antes de llamar a un profesional: que hacer ante una fuga de agua en casa, como cortar el suministro sin empeorar la averia, por que una cisterna gotea, cuando conviene reparar un grifo y que datos ayudan a pedir un presupuesto claro. El objetivo no es convertir una reparacion delicada en un trabajo casero, sino dar contexto para tomar mejores decisiones y explicar el problema con precision.',
      'Los articulos se organizan por diagnostico, costes, mantenimiento y senales de urgencia. Una perdida pequena bajo el fregadero no se gestiona igual que una fuga oculta, una humedad en techo o una cisterna que no deja de cargar agua. Por eso cada guia explica sintomas, causas probables, comprobaciones seguras y limites: si hay agua cerca de enchufes, presion irregular, olor a humedad persistente o danos en paredes, la recomendacion pasa a ser asistencia tecnica.',
      'Esta estructura evita canibalizar paginas comerciales como reparacion de fugas, cambio de grifos, reparacion de cisternas o instalaciones de fontaneria. La parte informativa responde preguntas de larga cola y la pagina de servicio mantiene la intencion de contratacion. Asi, consultas como fuga de agua en casa, cisterna pierde agua, precio fontanero Valencia o averias de fontaneria frecuentes tienen una respuesta util sin crear paginas comerciales innecesarias.',
      'Tambien ayuda a preparar mejor una llamada: ubicacion de la averia, antiguedad aproximada de la instalacion, si el problema afecta a una sola toma o a toda la vivienda, si ya se ha cerrado una llave de paso y si existen danos visibles. Con esa informacion el tecnico puede valorar mejor la urgencia, llevar material adecuado y ofrecer una explicacion mas clara antes de intervenir.',
    ],
  },
  electricidad: {
    heading: 'Guia de electricidad para revisar sintomas sin asumir riesgos',
    targetKeywords: [
      'guia de electricidad',
      'diferencial salta',
      'cortocircuito en casa',
      'cuanto cuesta un electricista en Valencia',
      'seguridad electrica vivienda',
    ],
    paragraphs: [
      'La guia de electricidad esta pensada para resolver dudas sin poner en riesgo a nadie. Explica por que salta el diferencial, que hacer ante un cortocircuito en casa, como actuar si hay olor a quemado, que puede indicar un enchufe caliente y cuando un corte de luz deja de ser una incidencia puntual. La prioridad es siempre la seguridad: observar, desconectar si es necesario y evitar manipulaciones internas si no se tiene formacion.',
      'Cada articulo diferencia sintomas, comprobaciones basicas y senales que requieren electricista. No es lo mismo que salte un magnetotermico al conectar un aparato concreto que tener apagones repetidos en varias habitaciones. Tampoco se interpreta igual una luz que parpadea, una derivacion por humedad o un diferencial que no rearma. La guia ayuda a ordenar esas pistas para que el usuario sepa describirlas y no normalice una averia peligrosa.',
      'La semantica de esta seccion trabaja consultas informativas como diferencial que salta, cortocircuito casa, seguridad electrica vivienda, precio electricista Valencia y averias electricas frecuentes. Son busquedas previas a la contratacion que no deben mezclarse con paginas comerciales de urgencias electricas, cuadros electricos, revision electrica o instalaciones. Asi el blog aporta autoridad y las paginas de servicio conservan su funcion comercial.',
      'Tambien explicamos que datos conviene tener antes de pedir ayuda: que proteccion salta, si ocurre con lluvia o humedad, si afecta a un circuito concreto, si aparece olor, ruido o calor, y si se han incorporado aparatos de alto consumo. Esta informacion permite orientar una revision con menos ensayo y error, y reduce el riesgo de soluciones improvisadas que solo esconden el problema.',
    ],
  },
  desatascos: {
    heading: 'Guia de desatascos para distinguir una obstruccion puntual de un problema serio',
    targetKeywords: [
      'guia de desatascos',
      'tuberia atascada',
      'wc atascado',
      'camion cuba',
      'atasco profesional',
    ],
    paragraphs: [
      'La guia de desatascos ayuda a distinguir un atasco puntual de un problema serio en tuberias, WC, fregadero, bajantes, arquetas o colectores. Muchas incidencias empiezan con senales pequenas: agua que baja despacio, gorgoteos, olor desagradable, retorno por otro desague o atascos que se repiten aunque se use un producto domestico. Entender esas pistas evita perder tiempo y reduce el riesgo de danar la instalacion.',
      'Los articulos explican que se puede comprobar sin desmontar ni introducir objetos que puedan atascar mas la tuberia. Tambien advierten sobre errores habituales: abusar de quimicos agresivos, tirar de la cisterna varias veces si el WC esta al limite, mezclar productos, forzar un fregadero con grasa acumulada o ignorar olores de arqueta en comunidades. Si hay retorno de agua, varios puntos afectados o residuos visibles, la guia orienta hacia una intervencion profesional.',
      'El contenido informativo se separa de las paginas comerciales de desatasco de tuberias, desatascar fregadero, desatascar WC, camion cuba y limpieza de fosas septicas. Asi podemos trabajar busquedas como tuberia atascada, WC atascado, cuando llamar camion cuba o atasco profesional sin convertir cada duda en una pagina de venta. Cuando el usuario ya necesita ayuda, cada guia enlaza con el servicio adecuado.',
      'Tambien damos criterios para comunicar mejor la incidencia: que desague falla, desde cuando ocurre, si hay mal olor, si afecta a una vivienda o a varias, si existe arqueta accesible y si el problema aparece despues de lluvia o uso intensivo. Esa informacion ayuda a elegir entre herramientas manuales, alta presion, inspeccion con camara o camion cuba.',
    ],
  },
  climatizacion: {
    heading: 'Guia de aire acondicionado para diagnostico, mantenimiento e instalacion',
    targetKeywords: [
      'guia de aire acondicionado',
      'aire acondicionado no enfria',
      'mantenimiento aire acondicionado',
      'cuanto cuesta instalar un split',
      'instalacion aire acondicionado',
    ],
    paragraphs: [
      'La guia de aire acondicionado responde dudas sobre equipos split, multisplit, conductos, bomba de calor y mantenimiento preventivo. Explica por que un aire acondicionado no enfria, que puede indicar una unidad interior que gotea, cuando limpiar filtros, como reconocer un problema de drenaje y que factores influyen en el precio de instalar un split. El enfoque es practico: observar sintomas sin manipular gas, electricidad ni componentes internos.',
      'Cada articulo separa causas sencillas de averias que requieren tecnico. Un filtro sucio puede reducir el caudal de aire, pero un equipo que pierde rendimiento de forma progresiva puede apuntar a falta de mantenimiento, intercambiador sucio, problema de ventilador, fuga de refrigerante o unidad exterior bloqueada. Tambien explicamos cuando conviene revisar el dimensionamiento, porque un aparato pequeno para la estancia nunca trabajara con comodidad aunque funcione correctamente.',
      'Esta categoria no compite con las paginas comerciales de instalacion de aire acondicionado, reparacion, mantenimiento, carga de gas, conductos o preinstalacion. El blog cubre la intencion informativa y las paginas de servicio quedan para solicitar presupuesto. Asi se pueden trabajar consultas como aire acondicionado no enfria, mantenimiento aire acondicionado, cuanto cuesta instalar un split o instalacion aire acondicionado con una respuesta clara y util.',
      'Antes de llamar a un tecnico conviene anotar modelo del equipo, antiguedad, ultima limpieza, si enfria menos que antes, si hay codigos de error, si la unidad exterior arranca y si el problema aparece en frio, calor o ambas funciones. Con esos datos la visita se orienta mejor y es mas facil distinguir mantenimiento, reparacion o sustitucion.',
    ],
  },
  calefaccion: {
    heading: 'Guia de calefaccion para calderas, radiadores y presion del circuito',
    targetKeywords: [
      'guia de calefaccion',
      'caldera no arranca',
      'radiador no calienta',
      'presion baja caldera',
      'mantenimiento calefaccion',
    ],
    paragraphs: [
      'La guia de calefaccion agrupa consultas sobre calderas, radiadores, termostatos, presion del circuito y mantenimiento. Ayuda a interpretar sintomas como una caldera que no arranca, un radiador que no calienta, una perdida de presion repetida, ruidos en las tuberias o falta de agua caliente. La idea es que el usuario pueda diferenciar una comprobacion basica de una averia que exige tecnico autorizado.',
      'Los articulos se escriben para personas, no para forzar palabras clave. Explican que se puede observar sin desmontar la instalacion, que datos conviene anotar y cuando detener cualquier prueba por seguridad. Si hay olor a gas, llama irregular, goteo en la caldera, presion que sube demasiado o bloqueo constante, no tiene sentido insistir en reinicios: conviene pedir revision profesional.',
      'La parte comercial queda separada en paginas como reparacion de calderas, mantenimiento de calderas, radiadores de calefaccion o instalacion de calefaccion. El blog trabaja busquedas previas como caldera no arranca, radiador no calienta, presion baja caldera, purgar radiadores y mantenimiento calefaccion. Esta separacion evita canibalizacion y permite responder dudas sin desplazar la intencion de contratar.',
      'Tambien explicamos como preparar una visita: marca y modelo de la caldera, codigo de error si aparece, presion en frio, si el fallo afecta a calefaccion, agua caliente o ambas, si se han purgado radiadores recientemente y si hay perdidas visibles. Cuanto mas concreta sea la informacion, mas facil sera diagnosticar con rapidez y evitar cambios de piezas innecesarios.',
    ],
  },
  saneamiento: {
    heading: 'Guia de limpieza de tuberias para comunidades, arquetas y bajantes',
    targetKeywords: [
      'guia de limpieza de tuberias',
      'limpieza de bajantes',
      'camara de tuberias',
      'malos olores arquetas comunidad',
      'mantenimiento arquetas',
    ],
    paragraphs: [
      'La guia de limpieza de tuberias esta orientada a comunidades, locales, garajes, restaurantes, naves y redes con uso intensivo. Responde dudas sobre cuando limpiar bajantes, que aporta una inspeccion con camara, por que aparecen malos olores en arquetas y que diferencia hay entre desatascar una obstruccion puntual y hacer mantenimiento de una red de saneamiento.',
      'Los contenidos ayudan a distinguir un problema domestico aislado de una incidencia comunitaria. Un lavabo lento puede resolverse de forma sencilla, pero olores persistentes, atascos repetidos, arquetas con sedimentos, bajantes antiguas, retorno en plantas bajas o sospecha de rotura requieren un enfoque mas tecnico. En esos casos la guia explica que informacion reunir y que pruebas pueden tener sentido antes de presupuestar.',
      'Esta categoria conecta con servicios como inspeccion CCTV, limpieza de arquetas, limpieza de bajantes, alta presion y mantenimiento preventivo, pero no intenta venderlos todos desde una sola pagina. El blog trabaja busquedas informativas como limpieza de tuberias, camara de tuberias, malos olores arquetas comunidad, mantenimiento arquetas y limpieza de bajantes, mientras las paginas comerciales quedan para solicitudes concretas.',
      'Tambien es util para administradores de fincas y negocios: permite reconocer patrones, decidir si conviene actuar de forma preventiva y documentar mejor una incidencia. Saber si el problema afecta a varios vecinos, si hay registros accesibles, si existen planos, si el olor aparece por horarios o si las lluvias agravan el retorno ayuda a elegir la intervencion adecuada sin improvisar.',
    ],
  },
}

export function getBlogCategorySeo(categorySlug: string): BlogCategorySeo | undefined {
  return BLOG_CATEGORY_SEO[categorySlug]
}
