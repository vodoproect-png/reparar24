export interface Service {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  longDescription: string
  benefits: string[]
  priceRange: string
  available24h: boolean
  keywords: string[]
}

export const services: Service[] = [
  {
    id: 'fontanero',
    name: 'Fontanería',
    slug: 'fontanero',
    icon: '🔧',
    description: 'Fontanero urgente 24h. Reparación de fugas, instalación de grifos y sanitarios. Profesionales certificados con garantía.',
    longDescription: `Cuando tienes una fuga de agua en tu piso, un grifo que no cierra bien o un inodoro atascado, necesitas un fontanero que responda rápido y resuelva el problema correctamente. En Reparar24 trabajamos todos los días del año, 24 horas, porque sabemos que las averías de fontanería no esperan al lunes ni al horario de oficina.

Llevamos más de 15 años arreglando problemas de fontanería en pisos, viviendas unifamiliares, locales comerciales y comunidades de vecinos. Nuestros fontaneros conocen las instalaciones típicas de los edificios españoles: tuberías de plomo antiguas que hay que sustituir, bajantes comunitarias de fibrocemento, conducciones empotradas en tabiques de pladur, y todas esas particularidades que solo entiende quien trabaja a diario en fontanería.

**Fugas de agua**: Usamos termografía infrarroja y geófonos para detectar fugas ocultas sin tener que romper paredes enteras. Es habitual encontrar fugas en uniones de tubería multicapa mal prensada, codos de cobre soldados con estaño-plata que desarrollan porosidad con el tiempo, o juntas de goma de desagüe que se han deteriorado. Localizamos el punto exacto, reparamos y comprobamos que no haya otras zonas comprometidas.

**Sustitución de tuberías**: En viviendas de más de 30-40 años es común que las tuberías de plomo o galvanizado estén al límite. Trabajamos con tubería multicapa (Pex-Al-Pex), cobre tipo B para agua caliente sanitaria (ACS), y PVC evacuación con junta de goma según normativa CTE-HS. Conocemos los diámetros apropiados: ½" para ramales hasta grifos, ¾" para alimentación general en pisos, y 1" para acometidas de edificios plurifamiliares.

**Grifos y sanitarios**: Instalamos grifería monomando con cartucho cerámico de 25-35mm, termoestáticos para ducha con protección anticalcaria, inodoros de doble descarga (3/6 litros) conforme a eficiencia hídrica, y platos de ducha de resina con sifón extraplano de 52mm cuando la altura de solera es limitada. En reformas integrales coordinamos con alicatadores para que las salidas de agua queden a ras.

**Cisternas y mecanismos**: Las cisternas empotradas Geberit o Roca con bastidor metálico tienen sus particularidades: cuando falla el pulsador dual hay que desmontar la placa frontal sin romper el  alicatado, acceder al mecanismo de descarga y sustituir el flotador o membrana. En cisternas externas clásicas cambiamos el conjunto completo (mecanismo de llenado, válvula de descarga, junta) para evitar goteos continuos que disparan el consumo de agua.

**Calentadores y termos**: Instalamos termos eléctricos de 50-100L para viviendas (con válvula de seguridad de 7 bar y vaso de expansión si la presión de red supera 5 bar), calentadores estancos de gas natural C12 o C13 para ACS instantánea, y revisamos ánodos de sacrificio en termos eléctricos para alargar su vida útil. Todos los trabajos con gas requieren boletín de instalación individual.

**Servicios de urgencia real**: Cuando decimos urgente 24h, es que respondemos. Hemos atendido fugas a las 3 de la madrugada en cocinas inundadas, roturas de tubería enterrada en comunidades de vecinos un domingo festivo, y bajantes reventadas en locales comerciales que no pueden permitirse estar cerrados. Tenemos furgonetas equipadas con material de emergencia: manguitos de reparación rápida, cinta autovulcanizante, llaves de paso de diferentes medidas, y cartuchos de grifería habituales.

**Precios sin letra pequeña**: Visita y diagnóstico técnico 49€ (descontable de la reparación). Reparación de fuga puntual 60-90€, cambio de grifo monomando 80-120€, instalación de inodoro completo con bajante 120-200€, sustitución de cisterna empotrada con mecanismo nuevo 90-150€. Si el trabajo requiere materiales específicos (tubería, válvulas, racorería) se presupuestan aparte. Siempre te explicamos qué hay que hacer y cuánto va a costar antes de empezar.

**Sobre garantías y normativa**: Nuestros fontaneros tienen el carné profesional de instalador de gas (si trabajas con gas necesitas habilitación oficial), conocen el CTE DB-HS sobre salubridad (presiones, diámetros, materiales permitidos), y cada instalación cumple con el RITE cuando afecta a sistemas térmicos. Emitimos factura con desglose de mano de obra y materiales, certificamos las instalaciones cuando es preceptivo, y damos 2 años de garantía en mano de obra. Contamos con seguro de responsabilidad civil profesional que cubre daños hasta 600.000€ por siniestro.

Si tienes dudas sobre una avería, necesitas consejo antes de comprar materiales, o simplemente quieres que un profesional revise tu instalación antes de que falle, llámanos. Preferimos prevenir problemas que arreglar desastres.`,
    benefits: [
      'Servicio de emergencia 24 horas',
      'Profesionales certificados',
      'Precio sin sorpresas',
      'Garantía de trabajo',
      'Presupuesto gratuito'
    ],
    priceRange: 'Desde 49€',
    available24h: true,
    keywords: [
      'fontanero urgente',
      'fontanero 24 horas',
      'servicio de fontanería',
      'fontanero profesional',
      'reparación de fugas',
      'instalación fontanería',
      'instalación de grifos',
      'instalación de sanitarios',
      'reparación fontanería',
      'fontanería urgente',
      'averías fontanería',
      'reparación de cisterna',
      'reparación calentador'
    ]
  },
  {
    id: 'electricista',
    name: 'Electricidad',
    slug: 'electricista',
    icon: '⚡',
    description: 'Electricista urgente 24h. Reparación de averías eléctricas, cortocircuitos, cuadros eléctricos. Certificados y boletín.',
    longDescription: `¿Necesitas un electricista urgente? En Reparar24 ofrecemos servicio eléctrico profesional disponible las 24 horas del día, los 7 días de la semana, incluidos festivos. Nuestro equipo de electricistas certificados está preparado para resolver cualquier emergencia eléctrica o trabajo programado de instalación eléctrica.

Somos especialistas en todo tipo de reparaciones eléctricas y averías eléctricas. Atendemos cortocircuitos, fallos eléctricos y saltos de diferencial con respuesta inmediata. Realizamos diagnóstico preciso de la causa del problema eléctrico mediante equipos de medición profesionales, garantizando soluciones efectivas y seguras según normativa vigente.

Nuestros servicios incluyen reparación de cuadros eléctricos, actualización de instalaciones antiguas, reparación de enchufes e interruptores que no funcionan correctamente, e instalación de luces y sistemas de iluminación. También realizamos mantenimiento eléctrico preventivo y revisión eléctrica completa de tu instalación para detectar problemas antes de que se conviertan en emergencias.

Si se te va la luz en casa, salta el diferencial sin motivo aparente, o detectas señales de una avería eléctrica como chispas, olores extraños o interruptores que se calientan, es momento de llamar a un electricista profesional. No arriesgues tu seguridad intentando reparaciones eléctricas sin conocimientos: los fallos eléctricos pueden provocar incendios o descargas peligrosas.

Ofrecemos tarifas transparentes desde 59€ para visita y diagnóstico. Reparación de avería eléctrica básica 70-120€, reparación de cuadro eléctrico 90-180€, instalación de enchufes o interruptores 60-100€, instalación de iluminación 80-150€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende de la complejidad del trabajo y materiales necesarios.

Disponemos de servicio de emergencia eléctrica 24/7 para cortocircuitos graves, fallos en el cuadro eléctrico, instalaciones que saltan constantemente, u olores a quemado de origen eléctrico. Nuestro tiempo de respuesta es rápido en emergencias eléctricas, con electricistas preparados para intervenir inmediatamente.

Como empresa de servicios eléctricos profesional, nuestros electricistas cuentan con certificación oficial, experiencia comprobada y seguro de responsabilidad civil. Cumplimos toda la normativa eléctrica vigente y emitimos boletín eléctrico cuando es necesario. Todos nuestros trabajos incluyen garantía. Confía en electricistas profesionales cualificados para tus instalaciones y reparaciones eléctricas.`,
    benefits: [
      'Servicio urgente 24 horas',
      'Electricistas certificados oficialmente',
      'Boletín eléctrico incluido',
      'Cumplimiento normativa vigente',
      'Garantía en todos los trabajos'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: [
      'electricista urgente',
      'electricista 24 horas',
      'servicio eléctrico',
      'electricista profesional',
      'reparación eléctrica',
      'averías eléctricas',
      'instalación eléctrica',
      'cortocircuito',
      'fallo eléctrico',
      'cuadro eléctrico',
      'enchufes e interruptores',
      'instalación de luces',
      'reparación de enchufes',
      'salto de diferencial',
      'mantenimiento eléctrico',
      'revisión eléctrica',
      'emergencia eléctrica'
    ]
  },
  {
    id: 'desatascos',
    name: 'Desatascos',
    slug: 'desatascos',
    icon: '🚰',
    description: 'Servicio profesional de desatascos con camión cuba. Desatascos industriales, comunidades de vecinos y saneamiento. Maquinaria especializada.',
    longDescription: `Cuando una comunidad de vecinos tiene las bajantes colapsadas, un restaurante no puede evacuar las aguas residuales de cocina, o un edificio completo sufre problemas de saneamiento que afectan a múltiples plantas, se necesita empresa especializada con equipamiento industrial. En Reparar24 llevamos más de 12 años resolviendo obstrucciones de gran envergadura con camión cuba, equipos de alta presión hasta 200 bar, y tecnología de inspección por cámara robotizada.

Nuestra especialidad son desatascos profesionales que requieren maquinaria pesada: colectores generales de edificios de 200mm-400mm, arquetas comunitarias de 80x80cm o más, bajantes principales de PVC o fibrocemento con décadas de acumulación, y redes enterradas de saneamiento con raíces invasivas. No trabajamos en desatascos domésticos simples de inodoro o fregadero (para eso está el fontanero de urgencia). Trabajamos en instalaciones donde un atasco afecta a 10, 20, 50 viviendas o paraliza la actividad comercial de un establecimiento.

**Comunidades de propietarios - Mantenimiento preventivo**: Los edificios de más de 30 años con bajantes de fibrocemento o conducciones de obra sin revestimiento interno acumulan restos de cal, sedimentos y biofilm que reducen el diámetro útil progresivamente. Ofrecemos contratos de mantenimiento anual que incluyen limpieza programada con cuba de aspiración e inyección a 150 bar (presión controlada para no dañar tuberías antiguas), inspección con cámara CCTV push de 40 metros que nos permite ver el estado interior desde la arqueta general, y limpieza de pozos de registro comunitarios donde se acumulan sólidos.

Trabajamos con administradores de fincas que necesitan certificados de mantenimiento, informes fotográficos del antes/después para actas de junta, y facturación con desglose para reparto entre propietarios. En edificios residenciales grandes (50+ viviendas) establecemos programas bianuales de limpieza preventiva que cuestan entre 600€-1.200€/año según número de bajantes verticales, pero evitan emergencias de sábado tarde con inundaciones en garaje comunitario que pueden costar 3.000€-5.000€ entre desatasco urgente, limpieza y daños.

**Restaurantes y hoteles - Separadores de grasas y trampas de sólidos**: Las cocinas profesionales tienen la obligación legal (Ordenanza municipal de vertidos) de instalar separadores de grasas antes de evacuar a red pública. Estos sistemas se colmatan con aceites solidificados, restos orgánicos y detergentes que forman masas compactas. Realizamos limpieza de separadores de grasas de 500L-2000L con camión cuba que aspira el contenido, lava con agua a presión caliente (60°C ayuda a disolver grasas), y deja el separador operativo en 30-45 minutos. En hoteles con múltiples puntos de evacuación también limpiamos las sifones de suelo de cocina industrial, arquetas de desagüe de lavandería, y bajantes específicas de residuos. Frecuencia recomendada: cada 2-3 meses en cocinas de alto volumen.

**Industrias y naves comerciales**: Centros comerciales, supermercados, naves industriales, parkings subterráneos... cada instalación tiene particularidades. Trabajamos con bombas de lodos capaces de extraer mezclas sólido-líquido densas, flexibles de aspiración de 100mm que llegan hasta el fondo de arquetas profundas, y lanzas de alta presión giratorias que eliminan incrustaciones en paredes de conducciones de hormigón. En parkings subterráneos es habitual encontrar arquetas de recogida de pluviales y achique que acumulan arenas, aceites de motor y lodos que hay que extraer con cuba porque los sistemas de bombeo se atascan.

**Equipamiento especializado que nos diferencia**: Camiones cuba de 8.000-10.000 litros con doble función (aspiración + presión), necesarios para trabajos que generan gran volumen de residuos líquidos. Equipos de hidro-curetaje a 180-200 bar con boquillas rotativas especiales para eliminar raíces que han penetrado juntas de tuberías de gres enterradas. Cámaras de inspección robotizadas desde 100mm hasta 600mm que avanzan por el interior del colector con iluminación LED y graban vídeo en HD para identificar roturas, desplazamientos de juntas, o conexiones irregulares de bajantes. Detectores de tuberías y localizadores de arquetas enterradas cuando en un edificio antiguo no hay planos de saneamiento.

**Intervenciones reales que hemos resuelto**: Comunidad de 40 viviendas en edificio de 1975 con bajante principal colapsada por acumulación de 30 años - evacuación de todo el contenido con cuba (4 viajes), limpieza a presión, inspección interna que reveló desplazamiento de junta en planta baja que requirió obra puntual. Restaurante en zona turística con arqueta de grasas desbordada en plena temporada alta - intervención nocturna de 02:00 a 05:00h con cuba para no afectar servicio, limpieza completa de red hasta acometida, dejando establecimiento operativo para desayunos. Parking subterráneo de 200 plazas con sistema de achique colapsado por lodos - extracción con cuba de 8.000L de mezcla sólido-líquida, limpieza de motobombas, restablecimiento de evacuación automática.

**Normativa y documentación profesional**: Cumplimos el Reglamento de Vertidos municipal que establece condiciones de evacuación a red pública. Para instalaciones con separador de grasas emitimos certificados de limpieza que puede requerir la inspección sanitaria. Generamos informes técnicos con fotografías de estado de redes que sirven a administradores para fundamentar derramas de reparación. En intervenciones con cámara CCTV proporcionamos grabación en vídeo y planos de localización de problemas estructurales. Contamos con seguro de responsabilidad civil de 1.000.000€ que cubre daños en instalaciones durante trabajos, y todos los residuos se gestionan en planta de tratamiento autorizada con justificante de entrega.

**Diferencia importante - Desatascos profesionales vs domésticos**: Si tienes un inodoro atascado, un fregadero que no traga, o una ducha con mal desagüe en tu piso, necesitas un fontanero de urgencia que con espirales manuales o máquinas eléctricas pequeñas resuelve el problema en 30 minutos por 60-120€. Nosotros intervenimos cuando el atasco afecta a la bajante general del edificio (todas las viviendas de una columna), a la arqueta principal donde confluyen todas las evacuaciones, o a redes comerciales/industriales que requieren camión cuba porque el volumen de residuos a extraer supera lo que puede manejar un van de fontanería. Escala, equipamiento y precio son completamente diferentes.

**Tarifas profesionales orientativas**: Desatasco puntual con cuba en comunidad (bajante principal o arqueta general) desde 280€ + IVA. Limpieza preventiva anual comunidad 10-30 viviendas: 600-900€/año. Vaciado y limpieza separador de grasas restaurante 500L-1000L: 180-280€. Servicio completo con inspección cámara CCTV y limpieza alta presión red comercial: 450-800€ según metros lineales. Contratos bienales mantenimiento edificios grandes: consultar según inventario de puntos. Todos los presupuestos incluyen desplazamiento de cuba, mano de obra especializada, gestión de residuos, y documentación técnica.

Para consultas técnicas, presupuestos según planos de instalación, o contratación de mantenimiento preventivo, contacta con nuestro departamento de grandes cuentas. Trabajamos con administradores, gerentes de establecimienos hosteleros, responsables de facility management, y empresas que necesitan proveedores certificados con capacidad de respuesta y documentación completa.`,
    benefits: [
      'Servicio con camión cuba y alta presión',
      'Desatascos industriales y comerciales',
      'Contratos de mantenimiento para comunidades',
      'Inspección con cámara robotizada',
      'Equipamiento profesional de gran capacidad'
    ],
    priceRange: 'Desde 200€',
    available24h: true,
    keywords: [
      'desatascos profesionales',
      'camión cuba',
      'desatascos industriales',
      'desatascos comunidades',
      'limpieza de colectores',
      'saneamiento profesional',
      'desatasco de bajantes',
      'empresa de desatascos',
      'alta presión desatascos',
      'mantenimiento bajantes',
      'inspección con cámara',
      'desatascos comerciales',
      'limpieza arquetas'
    ]
  },
  {
    id: 'aire-acondicionado',
    name: 'Aire Acondicionado',
    slug: 'aire-acondicionado',
    icon: '❄️',
    description: 'Reparación de aire acondicionado urgente. Técnicos especializados en instalación y mantenimiento. Todas las marcas de split.',
    longDescription: `¿Necesitas reparación de aire acondicionado urgente? En Reparar24 ofrecemos servicio de aire acondicionado profesional con técnicos especializados disponibles para resolver cualquier avería de aire acondicionado, realizar instalaciones y mantenimiento de aire acondicionado de todas las marcas y modelos.

Somos especialistas en reparación split y sistemas de climatización. Si tu aire acondicionado no enfría correctamente, hace ruidos extraños, pierde agua, o presenta mal olor aire acondicionado, nuestros técnicos de aire acondicionado diagnostican y solucionan el problema rápidamente. Atendemos averías comunes como falta de refrigeración, fugas de gas, problemas con el compresor, o fallos en el sistema de drenaje.

Un problema frecuente es cuando el aire acondicionado no enfría. Las causas pueden ser: nivel bajo de gas refrigerante, filtros sucios obstruidos, condensador sucio, fallo en el compresor, o termostato descalibrado. Nuestros técnicos realizan diagnóstico completo para identificar la causa específica y aplicar la reparación adecuada, ya sea carga de gas aire acondicionado, limpieza de componentes, o sustitución de piezas.

La fuga de gas aire acondicionado es una avería que requiere atención profesional inmediata. Si notas pérdida de rendimiento progresiva o formación de hielo en la unidad, puede indicar fuga. Nuestros técnicos localizan la fuga, reparan el punto de escape, realizan vacío del sistema y recargan con la cantidad exacta de gas refrigerante según especificaciones del fabricante.

Realizamos instalación de aire acondicionado y instalación split profesional para viviendas, oficinas y locales comerciales. Trabajamos con todas las marcas: Daikin, Mitsubishi, Samsung, LG, Fujitsu, Panasonic y más. La instalación incluye: montaje de unidad interior y exterior, conexiones frigoríficas y  eléctricas, vacío del sistema, carga de gas, y pruebas de funcionamiento completas.

El mantenimiento de aire acondicionado preventivo es esencial para eficiencia energética y durabilidad del equipo. Recomendamos revisión de aire acondicionado anual que incluye: limpieza de filtros profunda, limpieza de intercambiadores de calor, comprobación de presiones, verificación de conexiones eléctricas, limpieza del circuito de drenaje, y comprobación de niveles de refrigerante. El mantenimiento previene averías, reduce consumo eléctrico y mejora calidad del aire.

Ofrecemos tarifas transparentes desde 79€ para visita y diagnóstico. Limpieza y mantenimiento básico 60-90€, carga de gas aire acondicionado 90-150€, reparación de averías 100-200€ según problema, instalación split desde 350€ según potencia. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del tipo de trabajo y materiales necesarios.

Como empresa de servicios de climatización profesional, nuestros técnicos cuentan con certificación de gases fluorados obligatoria, experiencia en todas las marcas, y seguro de responsabilidad civil. Utilizamos equipos profesionales para carga de gas y detección de fugas. Cumplimos toda la normativa vigente de instalaciones frigoríficas. Todos nuestros trabajos incluyen garantía. Confía en técnicos de aire acondicionado cualificados para tus instalaciones, reparaciones y mantenimiento.`,
    benefits: [
      'Técnicos certificados en gases fluorados',
      'Todas las marcas de aire acondicionado',
      'Instalación profesional con garantía',
      'Mantenimiento preventivo anual',
      'Reparaciones con piezas originales'
    ],
    priceRange: 'Desde 79€',
    available24h: false,
    keywords: [
      'reparación de aire acondicionado',
      'aire acondicionado urgente',
      'técnico de aire acondicionado',
      'servicio de aire acondicionado',
      'averías de aire acondicionado',
      'mantenimiento de aire acondicionado',
      'instalación de aire acondicionado',
      'aire acondicionado no enfría',
      'fuga de gas aire acondicionado',
      'carga de gas aire acondicionado',
      'limpieza de filtros',
      'revisión de aire acondicionado',
      'instalación split',
      'reparación split',
      'climatizador averiado',
      'aire acondicionado hace ruido',
      'mal olor aire acondicionado'
    ]
  },
  {
    id: 'calefaccion',
    name: 'Calefacción',
    slug: 'calefaccion',
    icon: '🔥',
    description: 'Reparación de calefacción urgente. Técnicos especializados en calderas y radiadores. Averías, mantenimiento y revisiones.',
    longDescription: `¿Necesitas reparación de calefacción urgente? En Reparar24 ofrecemos servicio de calefacción profesional disponible las 24 horas del día, los 7 días de la semana. Nuestro equipo de técnicos de calefacción especializados está preparado para resolver cualquier avería de calefacción o realizar trabajos de instalación y mantenimiento de calefacción.

Somos especialistas en reparación de calderas y sistemas de calefacción central. Si tu caldera presenta un fallo de caldera, no arranca, hace ruidos extraños, o tiene problemas en el circuito, nuestros técnicos identifican y solucionan la avería rápidamente. Realizamos reparación de calderas de gas, gasoil y eléctricas, trabajando con todas las marcas y modelos.

Un problema frecuente es la presión baja en caldera. Si la presión está por debajo de 1 bar, la caldera no funciona correctamente. Nuestros técnicos comprueban si hay fugas en el sistema, reparan válvulas defectuosas y restablecen la presión adecuada. También atendemos averías relacionadas con termostatos, válvulas de seguridad y sistemas de encendido.

Realizamos reparación de radiadores que no calientan, uno de los problemas de calefacción más comunes. Si algunos radiadores no calientan uniformemente, realizamos purgado de radiadores para eliminar el aire acumulado. También solucionamos fugas en radiadores, reemplazamos válvulas defectuosas y hacemos instalación de radiadores nuevos cuando es necesario renovar el sistema.

Nuestro servicio incluye mantenimiento de calefacción preventivo y revisión de calefacción completa. El mantenimiento anual de la caldera es obligatorio por normativa y garantiza eficiencia energética y seguridad. Realizamos limpieza de quemadores, comprobación de presiones, revisión de válvulas de seguridad, y análisis de combustión para asegurar el correcto funcionamiento del sistema de calefacción.

Ofrecemos tarifas transparentes desde 59€ para visita y diagnóstico. Reparación de avería de caldera básica 80-150€, reparación de radiadores 60-100€, purgado del sistema completo 70-120€, mantenimiento anual de caldera 80-120€. Cada servicio incluye presupuesto gratuito sin compromiso. El precio final depende del tipo de avería y materiales necesarios.

Disponemos de calefacción urgente 24/7 para emergencias: caldera que no arranca en pleno invierno, fuga de gas, pérdida total de calefacción, o problemas graves de presión. Nuestro tiempo de respuesta es rápido en emergencias de calefacción, con técnicos preparados para restablecer el servicio inmediatamente.

Como empresa de servicios de calefacción profesional, nuestros técnicos cuentan con certificación de gas, experiencia en todas las marcas de calderas, y seguro de responsabilidad civil. Cumplimos toda la normativa vigente de instalaciones térmicas. Emitimos certificados de mantenimiento obligatorios. Todos nuestros trabajos incluyen garantía. Confía en técnicos de calefacción cualificados para tus reparaciones y mantenimiento.`,
    benefits: [
      'Servicio urgente 24 horas',
      'Técnicos con certificado de gas',
      'Todas las marcas de calderas',
      'Mantenimiento con certificado',
      'Garantía en reparaciones'
    ],
    priceRange: 'Desde 59€',
    available24h: true,
    keywords: [
      'reparación de calefacción',
      'calefacción urgente',
      'servicio de calefacción',
      'técnico de calefacción',
      'averías de calefacción',
      'reparación de radiadores',
      'reparación de calderas',
      'radiadores que no calientan',
      'problemas de calefacción',
      'purgado de radiadores',
      'fallo de caldera',
      'presión baja en caldera',
      'mantenimiento de calefacción',
      'instalación de radiadores',
      'revisión de calefacción',
      'calefacción central',
      'sistema de calefacción'
    ]
  },
  {
    id: 'limpieza-tuberias',
    name: 'Limpieza de Tuberías',
    slug: 'limpieza-tuberias',
    icon: '💧',
    description: 'Limpieza industrial y preventiva de tuberías con camión cuba. Para comunidades, hoteles, restaurantes y empresas.',
    longDescription: `¿Necesitas limpieza preventiva profesional de tuberías y redes de saneamiento? En Reparar24 ofrecemos servicio especializado de limpieza industrial de tuberías con camión cuba de alta capacidad, orientado a comunidades de propietarios, hoteles, restaurantes, centros comerciales y empresas que requieren mantenimiento programado de sus instalaciones de saneamiento.

Nuestro servicio de limpieza de tuberías con camión cuba está diseñado para mantenimiento preventivo de redes comunitarias, instalaciones hosteleras y edificios corporativos. Realizamos limpieza a alta presión de bajantes comunitarias, colectores generales, arquetas de gran volumen, redes de alcantarillado interior y sistemas de saneamiento industrial. Trabajamos con equipos profesionales de camión cuba que garantizan limpieza profunda sin necesidad de obras ni roturas.

Somos especialistas en mantenimiento preventivo programado para comunidades de propietarios. Realizamos limpieza periódica de bajantes verticales comunitarias, limpieza de colectores horizontales de sótano, limpieza de arquetas generales del edificio, y limpieza de acometidas a red pública. Este mantenimiento preventivo evita atascos graves, malos olores en zonas comunes, y problemas de saneamiento que afectan a múltiples viviendas. Recomendamos limpieza preventiva anual o semestral según volumen de uso.

Para hoteles y apartamentos turísticos, ofrecemos servicio de limpieza industrial de tuberías adaptado a alta ocupación. Realizamos limpieza preventiva de redes de saneamiento en temporada baja, limpieza de grasa acumulada en cocinas industriales hosteleras, mantenimiento de bajantes con alta carga de uso, y limpieza de sistemas de drenaje en zonas comunes y lavanderías. Trabajamos fuera de horario de huéspedes para no afectar operaciones.

Nuestro servicio para restaurantes, bares y locales de hostelería incluye limpieza especializada de tuberías con grasa industrial acumulada. Realizamos limpieza de alta presión en redes afectadas por grasa solidificada, limpieza de separadores de grasas, mantenimiento preventivo de bajantes de cocina, y limpieza de arquetas con residuos orgánicos. Cumplimos normativa de saneamiento hostelero y emitimos certificados de limpieza para inspecciones sanitarias.

Para centros comerciales, oficinas y naves industriales, ofrecemos limpieza de redes de saneamiento de gran volumen. Realizamos limpieza de colectores principales con camión cuba, limpieza de arquetas de alcantarillado interior, mantenimiento preventivo de acometidas, y limpieza de redes afectadas por residuos industriales específicos. Trabajamos con plan de mantenimiento anual para garantizar funcionamiento continuo.

Ofrecemos tarifas transparentes desde 150€ para servicios básicos de comunidades pequeñas. Limpieza preventiva comunidad (bajante vertical) 150-250€, limpieza colector horizontal con camión cuba 280-450€, limpieza integral edificio comunitario 400-800€ según número de plantas, mantenimiento preventivo anual hoteles desde 600€ según capacidad, limpieza industrial restaurante 180-350€. Cada servicio incluye presupuesto personalizado sin compromiso según complejidad de instalación.

Utilizamos camión cuba profesional de alta capacidad con sistema de aspiración y alta presión combinados. Nuestros equipos incluyen cámara de inspección CCTV para verificar estado de tuberías, manómetros de presión controlada, y sistemas de limpieza que no dañan tuberías antiguas. Realizamos informes técnicos con fotografías del antes y después, recomendaciones de mantenimiento futuro, y certificados de limpieza para administradores de fincas.

Como empresa especializada en limpieza industrial de tuberías y saneamiento preventivo, trabajamos con administradores de fincas, gerentes de hotel, responsables de restauración, y facility managers de empresas. Ofrecemos contratos de mantenimiento preventivo anual, facturación adaptada a empresas y comunidades, y emisión de certificados para cumplimiento normativo. Todos nuestros trabajos incluyen garantía y seguro de responsabilidad civil. Confía en profesionales especializados en limpieza preventiva de gran volumen para tus instalaciones comunitarias o empresariales.`,
    benefits: [
      'Camión cuba alta capacidad',
      'Mantenimiento preventivo programado',
      'Especialistas en comunidades y hoteles',
      'Certificados para administradores',
      'Contratos anuales disponibles'
    ],
    priceRange: 'Desde 150€',
    available24h: false, // Preventive service, not emergency
    keywords: [
      'limpieza industrial tuberías',
      'camión cuba comunidades',
      'limpieza preventiva saneamiento',
      'mantenimiento redes comunitarias',
      'limpieza tuberías hotel',
      'limpieza tuberías restaurante',
      'limpieza bajantes comunidad',
      'camión cuba alta presión',
      'limpieza colectores edificio',
      'saneamiento preventivo',
      'limpieza tuberías empresas',
      'mantenimiento alcantarillado',
      'certificado limpieza comunidad'
    ]
  }
]
