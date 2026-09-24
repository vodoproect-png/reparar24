import type { DiagnosticScenario, RepairRoute } from './types'

const standardOutcomeMessages = {
  success:
    'Perfecto. Realiza varias descargas durante las próximas horas y comprueba que la unión siga seca y que la cisterna permanezca estable.',
  partial:
    'La mejora indica que la fijación o la junta estaban implicadas, pero la estanqueidad no se ha recuperado por completo.',
  failed:
    'Ya has realizado las acciones seguras correspondientes a este caso. Seguir apretando o desmontando sin confirmar la pieza puede dañar la porcelana o aumentar la fuga.',
  skipped:
    'Has hecho bien en detenerte si no te parecía seguro o no disponías de las herramientas adecuadas.',
}

const observationOutcomeMessages = {
  success:
    'Si no vuelve a aparecer el síntoma durante la observación, revisa de nuevo más tarde antes de desmontar nada.',
  partial: 'Si sigues teniendo dudas, anota cuándo aparece el síntoma y evita tocar piezas internas.',
  failed: 'Si el problema aumenta o no puedes aislarlo, conviene pedir una revisión.',
  skipped: 'No pasa nada si decides no intervenir. La información recogida ayuda a explicar mejor el caso.',
}

const ajusteFijacionesRoute: RepairRoute = {
  id: 'ajuste-fijaciones',
  title: 'Ajustar la fijación de la cisterna',
  appliesWhen: [
    'La cisterna tiene un movimiento ligero.',
    'Los tornillos visibles no parecen oxidados.',
    'No se observan grietas en la porcelana.',
  ],
  difficulty: 'moderate',
  estimatedTime: '10-20 minutos',
  tools: [
    'Una llave ajustable o una llave del tamaño adecuado',
    'Un destornillador adecuado para sujetar la cabeza del tornillo, si es necesario',
    'Un paño o una esponja',
    'Un recipiente pequeño para el agua restante',
  ],
  preparationSteps: [
    {
      id: 'cerrar-llave',
      title: 'Cierra la llave de paso',
      instruction:
        'Cierra la llave de paso de la cisterna hasta detener completamente la entrada de agua.',
      warning: 'Si la llave no cierra, está bloqueada o empieza a perder agua, no continúes.',
      completionCheck: 'Acciona la descarga y confirma que el depósito no vuelve a llenarse.',
    },
    {
      id: 'vaciar-deposito',
      title: 'Vacía el depósito',
      instruction:
        'Acciona la descarga y retira con una esponja o un paño el agua que quede en el fondo. Trabajar con el depósito vacío reduce el peso sobre las fijaciones y evita que el agua salga durante el ajuste.',
    },
    {
      id: 'secar-fijacion',
      title: 'Seca la zona de fijación',
      instruction: 'Seca los tornillos, las tuercas y la unión entre la cisterna y la taza.',
      completionCheck: 'La zona debe quedar completamente seca antes de ajustar.',
    },
  ],
  repairSteps: [
    {
      id: 'localizar-tornillos',
      title: 'Localiza los dos tornillos de fijación',
      instruction:
        'Normalmente la cisterna está unida a la taza mediante dos tornillos. La cabeza se encuentra dentro del depósito y la tuerca debajo de la unión.',
      warning: 'No desmontes ninguna pieza si no puedes identificar claramente ambos lados del tornillo.',
    },
    {
      id: 'sujetar-cabeza',
      title: 'Sujeta la cabeza del tornillo',
      instruction:
        'Sujeta suavemente la cabeza del tornillo desde el interior del depósito para evitar que gire mientras ajustas la tuerca inferior.',
      warning: 'No hagas palanca contra la porcelana.',
    },
    {
      id: 'ajustar-alterno',
      title: 'Ajusta los dos lados de forma alterna',
      instruction:
        'Aprieta una de las tuercas solo un pequeño giro. Después ajusta la tuerca del lado contrario en la misma medida. Repite el proceso poco a poco.',
      warning:
        'No aprietes un lado completamente antes que el otro. La cisterna puede quedar torcida, la junta puede deformarse y la porcelana puede romperse. No aprietes hasta encontrar una resistencia máxima.',
    },
    {
      id: 'comprobar-estabilidad',
      title: 'Comprueba la estabilidad',
      instruction:
        'Después de cada pequeño ajuste, comprueba con cuidado si la cisterna sigue teniendo movimiento.',
      completionCheck:
        'Detente cuando la cisterna quede estable. No continúes apretando una vez eliminado el movimiento.',
    },
    {
      id: 'abrir-llave',
      title: 'Abre lentamente la llave de paso',
      instruction: 'Abre la llave poco a poco y deja que el depósito se llene por completo.',
      completionCheck: 'Comprueba que no aparezca agua alrededor de la toma ni de los tornillos.',
    },
    {
      id: 'descargas-prueba',
      title: 'Realiza varias descargas de prueba',
      instruction:
        'Realiza al menos dos o tres descargas. Después de cada una, comprueba con papel seco la zona de los tornillos y la unión entre la cisterna y la taza.',
    },
  ],
  successCriteria: [
    'La unión permanece seca.',
    'No aparece agua alrededor de los tornillos.',
    'La cisterna está estable.',
    'No cae agua al suelo.',
  ],
  stopConditions: [
    'No aprietes una sola tuerca hasta el fondo.',
    'No utilices fuerza excesiva.',
    'No uses alicates directamente sobre piezas de plástico.',
    'No fuerces tornillos oxidados.',
    'No continúes si la porcelana cruje o presenta una grieta.',
    'No uses silicona para ocultar una fuga causada por una junta dañada.',
    'No sigas apretando una vez que la cisterna esté estable.',
    'No continúes usando el inodoro si el agua cae al suelo.',
  ],
}

const sustituirJuntasTornillosRoute: RepairRoute = {
  id: 'sustituir-juntas-tornillos',
  title: 'Sustituir las juntas de los tornillos',
  appliesWhen: [
    'El agua aparece junto a uno de los tornillos.',
    'El ajuste simple no elimina la humedad.',
    'Los tornillos están en buen estado y el modelo es accesible.',
  ],
  difficulty: 'moderate',
  estimatedTime: '30-60 minutos',
  tools: [
    'Una llave ajustable o llave adecuada',
    'Un destornillador adecuado',
    'Un recipiente',
    'Una esponja o paño',
  ],
  parts: [
    'Un juego compatible de tornillos para cisterna',
    'Arandelas de goma compatibles',
    'Arandelas y tuercas compatibles',
  ],
  preparationSteps: [
    {
      id: 'confirmar-compatibilidad',
      title: 'Confirma la compatibilidad',
      instruction:
        'Antes de comprar piezas, confirma el diámetro, la longitud y el sistema de fijación. Un juego incompatible puede provocar una nueva fuga.',
    },
    {
      id: 'cerrar-vaciar',
      title: 'Cierra y vacía la cisterna',
      instruction:
        'Cierra la llave de paso, descarga el depósito y retira el agua restante con una esponja.',
      warning: 'No continúes si la llave no cierra o si la conexión de entrada está dañada.',
    },
  ],
  repairSteps: [
    {
      id: 'documentar-orden',
      title: 'Observa el orden original de las piezas',
      instruction:
        'El orden de las arandelas depende del sistema de fijación. Reproduce la disposición original y utiliza un juego compatible con el modelo.',
      warning: 'Si no entiendes el orden de montaje, detente antes de desmontar.',
    },
    {
      id: 'retirar-tornillos',
      title: 'Retira los tornillos sin forzar',
      instruction:
        'Sujeta la cabeza del tornillo y afloja la tuerca inferior poco a poco, alternando ambos lados.',
      warning: 'No fuerces un tornillo oxidado ni uno que gira sin aflojar.',
    },
    {
      id: 'sustituir-gomas',
      title: 'Sustituye las juntas de goma',
      instruction:
        'Coloca las arandelas de goma compatibles siguiendo la disposición original del sistema.',
      completionCheck: 'Las juntas quedan asentadas, sin pellizcos ni deformaciones.',
    },
    {
      id: 'montaje-uniforme',
      title: 'Aprieta de forma uniforme',
      instruction:
        'Ajusta ambos lados poco a poco y en alternancia para que la cisterna quede apoyada de forma regular.',
      warning: 'No busques máxima fuerza; busca asiento uniforme y estabilidad.',
    },
    {
      id: 'prueba-tornillos',
      title: 'Comprueba con papel seco',
      instruction:
        'Llena la cisterna y realiza varias descargas, pasando papel seco por cada tornillo después de cada prueba.',
    },
  ],
  successCriteria: [
    'Los tornillos permanecen secos tras varias descargas.',
    'La cisterna queda estable.',
    'No aparecen gotas bajo el depósito.',
  ],
  stopConditions: [
    'El tornillo está oxidado.',
    'El tornillo gira sin aflojar.',
    'La cisterna se desplaza o queda torcida.',
    'Aparece una grieta.',
    'No puedes sujetar la cisterna con seguridad.',
    'La conexión de entrada está vieja o dañada.',
    'No estás seguro del orden de las piezas.',
  ],
}

const sustituirJuntaCentralRoute: RepairRoute = {
  id: 'sustituir-junta-central',
  title: 'Sustituir la junta central entre cisterna y taza',
  appliesWhen: [
    'La cisterna está estable.',
    'El agua aparece en la unión central durante o después de descargar.',
    'La cisterna no es empotrada y conoces la junta compatible.',
  ],
  difficulty: 'moderate',
  estimatedTime: '45-90 minutos',
  tools: [
    'Una llave ajustable o llave adecuada',
    'Un destornillador adecuado',
    'Un recipiente',
    'Una esponja o paño',
    'Una superficie protegida para apoyar la cisterna',
  ],
  parts: ['Una junta central compatible con el modelo de cisterna'],
  preparationSteps: [
    {
      id: 'confirmar-modelo',
      title: 'Confirma el modelo y la junta',
      instruction:
        'Comprueba que la junta central es compatible con el sistema antes de desmontar la cisterna.',
      warning: 'No utilices silicona como sustituto de una junta correcta.',
    },
    {
      id: 'preparar-desmontaje',
      title: 'Prepara el desmontaje',
      instruction:
        'Cierra la llave, vacía el depósito y deja un espacio estable para apoyar la cisterna sin golpear la porcelana.',
      warning: 'Esta reparación implica desmontar la cisterna y tiene riesgo de rotura si se fuerza.',
    },
  ],
  repairSteps: [
    {
      id: 'soltar-fijaciones',
      title: 'Suelta las fijaciones de forma alterna',
      instruction:
        'Afloja los tornillos de manera progresiva y alterna, manteniendo la cisterna estable.',
      warning: 'Detente si un tornillo está oxidado, bloqueado o hace girar todo el conjunto.',
    },
    {
      id: 'retirar-cisterna',
      title: 'Retira la cisterna con apoyo',
      instruction:
        'Levanta la cisterna solo si puedes sostenerla con seguridad y colocarla sobre una superficie protegida.',
      warning: 'No continúes si pesa demasiado o si no puedes sujetarla sin inclinarla.',
    },
    {
      id: 'cambiar-junta-central',
      title: 'Cambia la junta central',
      instruction:
        'Retira la junta antigua, limpia el asiento sin rascar la porcelana y coloca la junta compatible de forma uniforme.',
      completionCheck: 'La junta queda centrada y sin deformaciones.',
    },
    {
      id: 'reinstalar-uniforme',
      title: 'Reinstala la cisterna sin torcerla',
      instruction:
        'Vuelve a colocar la cisterna y ajusta ambos tornillos poco a poco, alternando lados.',
      warning:
        'La estanqueidad debe conseguirse con una junta compatible y un montaje uniforme, no con silicona.',
    },
    {
      id: 'probar-union-central',
      title: 'Prueba la unión central',
      instruction:
        'Llena el depósito y realiza varias descargas, revisando con papel seco la unión central.',
    },
  ],
  successCriteria: [
    'La unión central permanece seca durante y después de descargar.',
    'La cisterna queda recta y estable.',
    'No aparece agua junto a los tornillos.',
  ],
  stopConditions: [
    'La cisterna es empotrada.',
    'Los tornillos están oxidados.',
    'Hay una grieta.',
    'La cisterna pesa demasiado para retirarla con seguridad.',
    'La conexión de entrada está deformada.',
    'No puedes sujetar la cisterna.',
    'No conoces el modelo o el tamaño de la junta.',
    'La cisterna queda torcida después de instalarla.',
  ],
}

const profesionalRoute: RepairRoute = {
  id: 'profesional',
  title: 'Detener el uso y pedir revisión profesional',
  appliesWhen: [
    'Hay óxido, grieta, movimiento fuerte, agua en el suelo o fijaciones inaccesibles.',
    'No puedes cerrar la llave de paso con suavidad.',
    'La cisterna es empotrada o no entiendes el sistema.',
  ],
  difficulty: 'professional',
  tools: ['Un paño seco', 'Un recipiente si hay agua visible', 'El teléfono de un fontanero'],
  repairSteps: [
    {
      id: 'cerrar-si-puedes',
      title: 'Cierra la llave de paso si puedes hacerlo sin forzarla',
      instruction: 'Gírala solo si está accesible y se mueve con suavidad.',
      warning: 'No fuerces una llave dura, oxidada o que empieza a perder agua.',
    },
    {
      id: 'no-usar-inodoro',
      title: 'No sigas utilizando el inodoro',
      instruction: 'Evita nuevas descargas hasta que se revise el origen de la fuga.',
    },
    {
      id: 'secar-suelo',
      title: 'Seca el agua del suelo',
      instruction: 'Retira el agua visible para evitar daños en suelo, pared o vivienda inferior.',
    },
    {
      id: 'explicar-tecnico',
      title: 'Prepara la información para el técnico',
      instruction:
        'Indica cuándo aparece la fuga; si la cisterna se mueve; si los tornillos tienen óxido; si hay una grieta; si el agua aparece en los tornillos o en la unión central.',
    },
  ],
  successCriteria: ['El agua deja de avanzar.', 'La cisterna queda sin uso hasta la revisión.'],
  stopConditions: [
    'No desmontes la cisterna.',
    'No fuerces tornillos oxidados.',
    'No uses silicona para tapar la fuga.',
    'No sigas descargando si el agua cae al suelo.',
  ],
  professionalReason:
    'En estas condiciones desmontar o apretar puede romper la porcelana, agrandar la fuga o dejar la cisterna inestable.',
}

const observacionRoute: RepairRoute = {
  id: 'observacion',
  title: 'Observar sin desmontar',
  appliesWhen: [
    'No hay datos suficientes para escoger una reparación segura.',
    'No puedes ver bien la zona de los tornillos o la unión.',
  ],
  difficulty: 'easy',
  estimatedTime: '5-10 minutos',
  tools: ['Papel absorbente', 'Una linterna', 'Un paño seco'],
  repairSteps: [
    {
      id: 'secar-zona',
      title: 'Seca toda la zona visible',
      instruction: 'Seca la base de la cisterna, los tornillos y la unión con papel o un paño.',
    },
    {
      id: 'descarga-unica',
      title: 'Haz una sola descarga de prueba',
      instruction:
        'Realiza una descarga y observa con papel seco si la humedad aparece en tornillos, unión central o suelo.',
      warning: 'No repitas la descarga si el agua cae al suelo.',
    },
    {
      id: 'anotar-patron',
      title: 'Anota el patrón',
      instruction:
        'Apunta si aparece al descargar, sin descargar, junto a tornillos o en la unión central.',
    },
  ],
  successCriteria: [
    'Identificas una zona concreta.',
    'No hay agua activa en el suelo.',
    'Puedes decidir si corresponde ajuste, junta o revisión profesional.',
  ],
  stopConditions: [
    'El agua cae al suelo.',
    'No puedes cerrar la llave de paso.',
    'La cisterna se mueve bastante.',
    'Ves grietas u óxido.',
  ],
}

const unionRepairRoutes = [
  profesionalRoute,
  ajusteFijacionesRoute,
  sustituirJuntasTornillosRoute,
  sustituirJuntaCentralRoute,
  observacionRoute,
]

export const cisternaGoteaScenario = {
  id: 'cisterna-gotea',
  version: 3,
  enabled: true,
  articleSlug: 'por-que-gotea-cisterna',
  service: 'fontaneria',
  title: '¿Qué puede estar causando la pérdida de agua?',
  subtitle: 'Responde unas preguntas sencillas para identificar el origen más probable del problema.',
  disclaimer: 'El resultado es orientativo y no sustituye la revisión de un profesional.',
  startButtonLabel: 'Comprobar mi cisterna',
  questions: [
    {
      id: 'donde-aparece-agua',
      text: '¿Dónde aparece el agua?',
      answers: [
        { id: 'taza', label: 'Dentro de la taza del inodoro', nextQuestionId: 'recarga-sola' },
        { id: 'exterior', label: 'Debajo o alrededor de la cisterna', nextQuestionId: 'zona-humedad' },
        { id: 'rebosa', label: 'La cisterna rebosa o no deja de llenarse', nextQuestionId: 'supera-nivel' },
        { id: 'no-seguro', label: 'No estoy seguro', nextQuestionId: 'escuchas-carga' },
      ],
    },
    {
      id: 'recarga-sola',
      text: '¿La cisterna se llena y después vuelve a cargar sola?',
      answers: [
        { id: 'si', label: 'Sí, vuelve a cargar sin usar el inodoro', nextQuestionId: 'baja-nivel' },
        { id: 'continua', label: 'No, el agua corre continuamente', nextQuestionId: 'baja-nivel' },
        { id: 'no-seguro', label: 'No estoy seguro', nextQuestionId: 'baja-nivel' },
      ],
    },
    {
      id: 'baja-nivel',
      text: '¿El nivel del depósito baja si cierras la llave de paso?',
      answers: [
        { id: 'si', label: 'Sí', resultId: 'descarga' },
        { id: 'no', label: 'No', resultId: 'entrada' },
        { id: 'no-puedo', label: 'No puedo comprobarlo', resultId: 'revision' },
      ],
    },
    {
      id: 'zona-humedad',
      text: '¿En qué zona aparece la humedad?',
      answers: [
        { id: 'latiguillo', label: 'Junto al latiguillo o la llave de paso', resultId: 'conexion-exterior' },
        { id: 'union', label: 'Entre la cisterna y el inodoro', nextQuestionId: 'union-movimiento' },
        { id: 'tornillos', label: 'En los tornillos o la parte inferior del depósito', nextQuestionId: 'union-movimiento' },
        { id: 'no-identifico', label: 'No puedo identificar la zona', resultId: 'fuga-exterior-urgente' },
      ],
    },
    {
      id: 'union-movimiento',
      text: '¿La cisterna se mueve ligeramente si la tocas con cuidado?',
      answers: [
        { id: 'ligero', label: 'Sí, tiene un poco de movimiento', nextQuestionId: 'union-tornillos' },
        { id: 'estable', label: 'No, está completamente estable', nextQuestionId: 'union-tornillos' },
        { id: 'bastante', label: 'Se mueve bastante', nextQuestionId: 'union-tornillos' },
        { id: 'no-comprobar', label: 'Prefiero no comprobarlo', nextQuestionId: 'union-tornillos' },
      ],
    },
    {
      id: 'union-tornillos',
      text: '¿Los tornillos visibles parecen oxidados o dañados?',
      answers: [
        { id: 'buen-estado', label: 'No, parecen estar en buen estado', nextQuestionId: 'union-cuando-agua' },
        { id: 'oxido', label: 'Sí, tienen óxido', nextQuestionId: 'union-cuando-agua' },
        { id: 'no-veo', label: 'No puedo verlos', nextQuestionId: 'union-cuando-agua' },
        { id: 'no-seguro', label: 'No estoy seguro', nextQuestionId: 'union-cuando-agua' },
      ],
    },
    {
      id: 'union-cuando-agua',
      text: '¿Cuándo aparece el agua?',
      answers: [
        { id: 'despues-descargar', label: 'Solo durante o después de descargar', nextQuestionId: 'union-grieta' },
        { id: 'sin-descargar', label: 'Aparece incluso sin descargar', nextQuestionId: 'union-grieta' },
        { id: 'junto-tornillo', label: 'Aparece junto a uno de los tornillos', nextQuestionId: 'union-grieta' },
        { id: 'no-identifico', label: 'No puedo identificarlo', nextQuestionId: 'union-grieta' },
      ],
    },
    {
      id: 'union-grieta',
      text: '¿Ves alguna grieta en la cisterna o en la taza?',
      answers: [
        { id: 'no', label: 'No', resultId: 'junta-union' },
        { id: 'si', label: 'Sí', resultId: 'junta-union' },
        { id: 'no-seguro', label: 'No estoy seguro', resultId: 'junta-union' },
      ],
    },
    {
      id: 'supera-nivel',
      text: '¿El agua supera el nivel habitual o llega al tubo central?',
      answers: [
        { id: 'si', label: 'Sí', nextQuestionId: 'flotador-libre' },
        { id: 'no', label: 'No', nextQuestionId: 'flotador-libre' },
        { id: 'no-seguro', label: 'No estoy seguro', resultId: 'entrada' },
      ],
    },
    {
      id: 'flotador-libre',
      text: '¿El flotador se mueve libremente?',
      answers: [
        { id: 'si', label: 'Sí', resultId: 'entrada' },
        { id: 'no', label: 'No', resultId: 'flotador' },
        { id: 'no-se', label: 'No sé cuál es el flotador', resultId: 'revision' },
      ],
    },
    {
      id: 'escuchas-carga',
      text: '¿Escuchas que la cisterna se llena aunque nadie use el inodoro?',
      answers: [
        { id: 'si', label: 'Sí', nextQuestionId: 'ves-hilo' },
        { id: 'no', label: 'No', nextQuestionId: 'agua-suelo' },
        { id: 'no-seguro', label: 'No estoy seguro', nextQuestionId: 'ves-hilo' },
      ],
    },
    {
      id: 'ves-hilo',
      text: '¿Ves un hilo de agua en la taza?',
      answers: [
        { id: 'si', label: 'Sí', resultId: 'descarga' },
        { id: 'no', label: 'No', nextQuestionId: 'agua-suelo' },
        { id: 'no-seguro', label: 'No estoy seguro', resultId: 'revision' },
      ],
    },
    {
      id: 'agua-suelo',
      text: '¿Hay agua en el suelo o humedad exterior?',
      answers: [
        { id: 'si', label: 'Sí', resultId: 'fuga-exterior-urgente' },
        { id: 'no', label: 'No', resultId: 'insuficiente' },
        { id: 'no-seguro', label: 'No estoy seguro', resultId: 'revision' },
      ],
    },
  ],
  results: [
    {
      id: 'descarga',
      severity: 'service_recommended',
      title: 'El problema parece estar en el mecanismo de descarga',
      summary:
        'El depósito pierde agua hacia la taza. Suele relacionarse con una junta desgastada, suciedad en el cierre o un mecanismo de descarga mal asentado.',
      reasoning: {
        signals: [
          'El agua aparece dentro de la taza.',
          'La cisterna puede volver a cargar sin que nadie use el inodoro.',
          'El cierre inferior puede no estar sellando bien.',
        ],
      },
      inspectionSteps: [
        {
          id: 'observar-hilo',
          title: 'Observa la taza con buena luz',
          instruction: 'Mira si aparece un hilo fino de agua en la pared interior de la taza.',
          expectedObservation: 'El hilo confirma que el agua pasa desde el depósito hacia la taza.',
        },
        {
          id: 'cerrar-llave',
          title: 'Cierra la llave si gira suave',
          instruction: 'Cierra la llave de paso y espera unos minutos sin descargar.',
          warning: 'No fuerces la llave si está dura u oxidada.',
          expectedObservation: 'Si baja el nivel, el cierre de descarga puede estar implicado.',
        },
      ],
      repairRoutes: [observacionRoute],
      defaultRepairRouteId: 'observacion',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'entrada',
      severity: 'service_recommended',
      title: 'El origen probable está en la entrada de agua',
      summary:
        'La cisterna parece seguir llenando o no cortar en el nivel correcto. Puede deberse al flotador, la válvula de entrada o la regulación.',
      reasoning: {
        signals: [
          'El agua puede acercarse al tubo central.',
          'La entrada no corta con estabilidad.',
          'La cisterna puede hacer ruido de carga repetida.',
        ],
      },
      inspectionSteps: [
        {
          id: 'mirar-nivel',
          title: 'Observa el nivel del agua',
          instruction: 'Retira la tapa solo si es una cisterna exterior y observa si el agua se acerca al tubo central.',
          warning: 'No manipules una cisterna empotrada si no conoces el sistema.',
        },
        {
          id: 'mirar-flotador',
          title: 'Comprueba el flotador sin forzar',
          instruction: 'Mira si el flotador sube y baja libremente al cambiar el nivel del agua.',
          warning: 'No tires del flotador ni dobles varillas si notas resistencia.',
        },
      ],
      repairRoutes: [observacionRoute],
      defaultRepairRouteId: 'observacion',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'flotador',
      severity: 'service_recommended',
      title: 'El flotador podría estar bloqueado o mal regulado',
      summary:
        'Cuando el flotador no se mueve libremente, la válvula de entrada puede seguir dejando pasar agua.',
      reasoning: {
        signals: [
          'El flotador no parece moverse con normalidad.',
          'La entrada de agua puede no cortar.',
          'Puede haber roce, cal o una pieza fatigada.',
        ],
      },
      inspectionSteps: [
        {
          id: 'mirar-roces',
          title: 'Mira si el flotador roza',
          instruction: 'Observa si el flotador toca la pared del depósito, la tapa o alguna pieza cercana.',
        },
        {
          id: 'mover-suave',
          title: 'Comprueba el movimiento suave',
          instruction: 'Muévelo muy ligeramente solo si está accesible y no ofrece resistencia.',
          warning: 'No fuerces brazos, varillas ni plásticos antiguos.',
        },
      ],
      repairRoutes: [observacionRoute],
      defaultRepairRouteId: 'observacion',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'conexion-exterior',
      severity: 'urgent',
      title: 'Puede haber una fuga en la conexión de entrada',
      summary:
        'La humedad junto al latiguillo o la llave de paso apunta a una pérdida exterior. Conviene contener el agua y evitar seguir usando la cisterna si la fuga está activa.',
      reasoning: {
        signals: [
          'La humedad aparece junto al latiguillo o la llave de paso.',
          'Esa zona trabaja con agua de entrada y puede perder aunque no descargues.',
          'Apretar una conexión antigua puede agrandar la fuga.',
        ],
      },
      inspectionSteps: [
        {
          id: 'secar-conexion',
          title: 'Seca la zona visible',
          instruction: 'Seca alrededor del latiguillo y la llave para distinguir si la humedad vuelve.',
          warning: 'No aprietes conexiones ni uses herramientas en piezas antiguas.',
        },
      ],
      repairRoutes: [profesionalRoute],
      defaultRepairRouteId: 'profesional',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'junta-union',
      severity: 'service_recommended',
      title: 'La fuga parece estar en la unión entre la cisterna y la taza',
      summary:
        'La humedad aparece en la zona donde el depósito se apoya sobre la taza. Puede venir de fijaciones flojas, juntas de tornillos, junta central o una condición que requiere profesional.',
      reasoning: {
        intro: 'El recorrido de preguntas separa señales de movimiento, óxido, punto exacto de aparición y grietas.',
        signals: [
          'La humedad se concentra entre la cisterna y la taza o junto a tornillos.',
          'El momento en que aparece el agua ayuda a distinguir tornillos, junta central o fuga exterior.',
          'Óxido, grieta o movimiento fuerte cambian la recomendación a revisión profesional.',
        ],
      },
      inspectionSteps: [
        {
          id: 'secar-union',
          title: 'Seca la unión entre depósito y taza',
          instruction: 'Seca bien la parte inferior de la cisterna, la zona de los tornillos y el borde de unión.',
          expectedObservation: 'La zona queda seca y puedes distinguir si la humedad reaparece.',
        },
        {
          id: 'descarga-observacion',
          title: 'Haz una descarga y observa',
          instruction: 'Realiza una descarga normal y mira si aparecen gotas en la unión o alrededor de los tornillos.',
          warning: 'No hagas varias descargas si el agua cae al suelo.',
        },
        {
          id: 'comprobar-movimiento',
          title: 'Comprueba si el depósito se mueve',
          instruction: 'Apoya la mano con suavidad y verifica si el depósito tiene holgura visible.',
          warning: 'No muevas la cisterna para probar ni fuerces tornillos.',
        },
      ],
      repairRoutes: unionRepairRoutes,
      repairRouteRules: [
        {
          routeId: 'profesional',
          conditions: [{ questionId: 'union-grieta', answerIds: ['si'] }],
        },
        {
          routeId: 'profesional',
          conditions: [{ questionId: 'union-movimiento', answerIds: ['bastante'] }],
        },
        {
          routeId: 'profesional',
          conditions: [{ questionId: 'union-tornillos', answerIds: ['oxido'] }],
        },
        {
          routeId: 'profesional',
          conditions: [{ questionId: 'union-cuando-agua', answerIds: ['sin-descargar'] }],
        },
        {
          routeId: 'ajuste-fijaciones',
          conditions: [
            { questionId: 'union-movimiento', answerIds: ['ligero'] },
            { questionId: 'union-tornillos', answerIds: ['buen-estado'] },
            { questionId: 'union-grieta', answerIds: ['no'] },
          ],
        },
        {
          routeId: 'sustituir-juntas-tornillos',
          conditions: [
            { questionId: 'union-cuando-agua', answerIds: ['junto-tornillo'] },
            { questionId: 'union-tornillos', answerIds: ['buen-estado'] },
            { questionId: 'union-grieta', answerIds: ['no'] },
          ],
        },
        {
          routeId: 'sustituir-junta-central',
          conditions: [
            { questionId: 'union-movimiento', answerIds: ['estable'] },
            { questionId: 'union-cuando-agua', answerIds: ['despues-descargar'] },
            { questionId: 'union-grieta', answerIds: ['no'] },
          ],
        },
      ],
      defaultRepairRouteId: 'observacion',
      nextRepairRouteByOutcome: {
        partial: 'sustituir-juntas-tornillos',
        failed: 'profesional',
      },
      relatedServiceSlug: 'fontaneria',
      outcomeMessages: standardOutcomeMessages,
    },
    {
      id: 'fuga-exterior-urgente',
      severity: 'urgent',
      title: 'Hay riesgo de fuga exterior activa',
      summary:
        'La presencia de agua bajo la cisterna, en tornillos o sin zona clara requiere prudencia. Es mejor cortar el uso y pedir revisión antes de que la humedad avance.',
      reasoning: {
        signals: [
          'El agua no queda contenida dentro de la taza.',
          'Puede afectar a suelo, pared, vecinos o mueble.',
          'Sin un punto claro, manipular piezas aumenta el riesgo.',
        ],
      },
      inspectionSteps: [
        {
          id: 'contener-agua',
          title: 'Contén el agua visible',
          instruction: 'Seca o recoge el agua visible para evitar que avance hacia suelo, pared o mueble.',
        },
      ],
      repairRoutes: [profesionalRoute],
      defaultRepairRouteId: 'profesional',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'revision',
      severity: 'informational',
      title: 'Hace falta una comprobación visual más clara',
      summary:
        'Con los datos disponibles no conviene señalar una pieza concreta. El problema puede estar en entrada, descarga o conexión exterior.',
      reasoning: {
        signals: [
          'Tus respuestas no aíslan una zona concreta.',
          'Puede haber más de una pieza implicada.',
          'Una revisión ordenada evita cambiar piezas sin necesidad.',
        ],
      },
      inspectionSteps: [
        {
          id: 'mirar-taza',
          title: 'Mira primero dentro de la taza',
          instruction: 'Con la cisterna llena y sin usar, observa si aparece un hilo fino de agua en la taza.',
        },
        {
          id: 'mirar-exterior',
          title: 'Revisa el exterior sin desmontar',
          instruction: 'Pasa un paño seco por el latiguillo, la llave y la parte inferior del depósito.',
          warning: 'No aprietes ni gires piezas si notas resistencia.',
        },
      ],
      repairRoutes: [observacionRoute],
      defaultRepairRouteId: 'observacion',
      outcomeMessages: observationOutcomeMessages,
    },
    {
      id: 'insuficiente',
      severity: 'informational',
      title: 'No hay información suficiente para aislar la causa sin una revisión',
      summary:
        'No aparece una señal dominante de entrada, descarga o fuga exterior. Conviene seguir observando síntomas básicos antes de manipular el mecanismo.',
      reasoning: {
        signals: [
          'No hay hilo de agua visible ni humedad exterior clara.',
          'El ruido de carga no está confirmado.',
          'La avería puede ser intermitente o no estar activa en este momento.',
        ],
      },
      inspectionSteps: [
        {
          id: 'esperar-sin-uso',
          title: 'Espera sin usar el inodoro',
          instruction: 'Deja pasar unos minutos sin descargar ni abrir grifos cercanos.',
        },
      ],
      repairRoutes: [observacionRoute],
      defaultRepairRouteId: 'observacion',
      outcomeMessages: observationOutcomeMessages,
    },
  ],
  fallback: {
    title: 'Señales rápidas antes de comprobar la cisterna',
    rows: [
      {
        symptom: 'Hilo de agua dentro de la taza',
        possibleOrigin: 'Junta inferior, campana o mecanismo de descarga',
        nextStep: 'Cerrar la llave de paso y observar si baja el nivel del depósito',
      },
      {
        symptom: 'La cisterna no deja de llenarse',
        possibleOrigin: 'Flotador, válvula de entrada o regulación de altura',
        nextStep: 'Comprobar si el agua supera el nivel habitual sin forzar piezas',
      },
      {
        symptom: 'Humedad fuera de la cisterna',
        possibleOrigin: 'Latiguillo, llave, tornillos o junta entre depósito e inodoro',
        nextStep: 'No seguir usando la cisterna si la fuga está activa',
      },
    ],
  },
} satisfies DiagnosticScenario
