export interface FAQ {
  question: string
  answer: string
  category?: string
  serviceId?: string
}

export const faqs: FAQ[] = [
  // Fontanero-specific FAQs (GEO-neutral)
  {
    question: '¿Cuánto cuesta contratar un fontanero urgente?',
    answer: 'El servicio de fontanería empieza desde 49€ (visita + diagnóstico). Reparaciones básicas 60-120€ según trabajo. Ofrecemos presupuesto gratuito sin compromiso antes de cualquier intervención. El precio final depende del tipo de avería y materiales necesarios.',
    category: 'precio',
    serviceId: 'fontanero'
  },
  {
    question: '¿Cuánto tarda en llegar un fontanero urgente?',
    answer: 'Nuestro servicio de fontanero urgente tiene tiempo de respuesta de 30-60 minutos en zonas urbanas. Estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos. Para emergencias graves priorizamos la atención inmediata. Llama al 641 688 524 para asistencia urgente.',
    category: 'servicio',
    serviceId: 'fontanero'
  },
  {
    question: '¿Qué servicios de fontanería ofrecéis?',
    answer: 'Ofrecemos reparación de fugas de agua, reparación y cambio de tuberías, instalación de grifos y sanitarios, reparación de cisternas, y reparación de calentadores. También atendemos averías de fontanería urgentes. Todos nuestros trabajos incluyen garantía.',
    category: 'servicio',
    serviceId: 'fontanero'
  },
  {
    question: '¿Tenéis servicio de fontanería 24 horas?',
    answer: 'Sí, disponemos de servicio de emergencia 24/7. Nuestros profesionales están disponibles todos los días del año, incluidos festivos y fines de semana. Atendemos emergencias de fontanería con respuesta rápida. Consulta cobertura para tu zona.',
    category: 'servicio',
    serviceId: 'fontanero'
  },
  {
    question: '¿Los fontaneros están certificados?',
    answer: 'Sí, todos nuestros fontaneros profesionales cuentan con certificación, experiencia comprobada y seguro de responsabilidad civil. Cumplimos normativa vigente. Nuestro trabajo incluye garantía. Somos una empresa de fontanería profesional certificada.',
    category: 'profesionales',
    serviceId: 'fontanero'
  },
  // Desatascos-specific FAQs (GEO-neutral)
  {
    question: '¿Cuánto cuesta un servicio de desatascos?',
    answer: 'El servicio de desatascos comienza desde 69€ para desatascos básicos. Desatasco de fregadero o lavabo 69-90€, desatasco de inodoro 80-110€, desatasco de bajantes 120-180€. Ofrecemos presupuesto gratuito sin compromiso. El precio final depende de la complejidad del atasco y la técnica necesaria.',
    category: 'precio',
    serviceId: 'desatascos'
  },
  {
    question: '¿Cuánto tarda un servicio de desatascos?',
    answer: 'La mayoría de desatascos se resuelven en 30-60 minutos. Atascos complejos pueden requerir 1-2 horas. Disponemos de servicio urgente 24/7 con tiempo de respuesta rápido en emergencias. Para atascos graves priorizamos la atención inmediata.',
    category: 'servicio',
    serviceId: 'desatascos'
  },
  {
    question: '¿Qué técnicas de desatasco utilizáis?',
    answer: 'Utilizamos sondas eléctricas rotativas, máquinas de alta presión, sistemas de aspiración y cámaras de inspección HD. Todas nuestras técnicas son no invasivas: no rompemos suelos ni paredes. Seleccionamos la técnica según el tipo de atasco y tubería.',
    category: 'servicio',
    serviceId: 'desatascos'
  },
  {
    question: '¿Cuándo debo llamar a un servicio de desatascos urgente?',
    answer: 'Llama inmediatamente si: el inodoro está completamente obstruido, hay desbordamiento de aguas residuales, el agua no drena en múltiples puntos, o hay mal olor persistente. Nuestro servicio urgente 24/7 atiende emergencias rápidamente para evitar daños mayores.',
    category: 'emergencia',
    serviceId: 'desatascos'
  },
  {
    question: '¿Qué causa los atascos en las tuberías?',
    answer: 'Las causas más comunes son: acumulación de residuos (grasa, jabón, pelo), objetos extraños, toallitas húmedas, raíces de árboles en tuberías exteriores, o problemas estructurales. Usamos cámara de inspección para identificar la causa exacta y aplicar la solución adecuada.',
    category: 'informacion',
    serviceId: 'desatascos'
  },
  {
    question: '¿Los desatascos incluyen garantía?',
    answer: 'Sí, todos nuestros servicios de desatascos incluyen garantía. Si el mismo atasco se repite en el periodo garantizado, volvemos sin coste adicional. Utilizamos equipos profesionales y técnicas efectivas para asegurar resultados duraderos.',
    category: 'garantia',
    serviceId: 'desatascos'
  },
  {
    question: '¿Puedo prevenir atascos en las tuberías?',
    answer: 'Sí. Recomendaciones: no tires grasa por el fregadero, usa rejillas en desagües, no arrojes toallitas al inodoro, realiza limpiezas preventivas periódicas. Ofrecemos servicio de limpieza preventiva con alta presión para mantener tus tuberías en óptimas condiciones.',
    category: 'prevencion',
    serviceId: 'desatascos'
  },
  // Electricista-specific FAQs (GEO-neutral)
  {
    question: '¿Cuánto cuesta contratar un electricista urgente?',
    answer: 'El servicio eléctrico empieza desde 59€ (visita + diagnóstico). Reparación de avería eléctrica básica 70-120€, reparación de cuadro eléctrico 90-180€, instalación de enchufes 60-100€. Ofrecemos presupuesto gratuito sin compromiso. El precio final depende de la complejidad del trabajo y materiales necesarios.',
    category: 'precio',
    serviceId: 'electricista'
  },
  {
    question: '¿Qué hacer si salta el diferencial?',
    answer: 'Si salta el diferencial: desconecta todos los aparatos eléctricos, intenta subirlo de nuevo, si vuelve a saltar no insistas. Llama a un electricista profesional para diagnosticar la causa: cortocircuito, fallo de aislamiento, o aparato defectuoso. No manipules el cuadro eléctrico sin conocimientos, puede ser peligroso.',
    category: 'emergencia',
    serviceId: 'electricista'
  },
  {
    question: '¿Cuáles son las señales de una avería eléctrica?',
    answer: 'Señales de avería eléctrica: diferencial que salta frecuentemente, chispas en enchufes o interruptores, olores a quemado, interruptores que se calientan, luces que parpadean, o se te va la luz sin motivo. Si detectas alguna señal, contacta con un electricista urgente para evitar riesgos mayores.',
    category: 'informacion',
    serviceId: 'electricista'
  },
  {
    question: '¿Cuándo debo llamar a un electricista urgente?',
    answer: 'Llama inmediatamente si: huele a quemado de origen eléctrico, ves chispas o humo, el cuadro eléctrico hace ruidos extraños, se te va la luz constantemente, o el diferencial no se puede subir. Nuestro servicio urgente 24/7 atiende emergencias eléctricas rápidamente para garantizar tu seguridad.',
    category: 'emergencia',
    serviceId: 'electricista'
  },
  {
    question: '¿Los electricistas están certificados?',
    answer: 'Sí, todos nuestros electricistas profesionales cuentan con certificación oficial, experiencia comprobada y seguro de responsabilidad civil. Cumplimos toda la normativa eléctrica vigente. Emitimos boletín eléctrico cuando es necesario. Nuestro trabajo incluye garantía. Somos empresa de servicios eléctricos profesional certificada.',
    category: 'profesionales',
    serviceId: 'electricista'
  },
  {
    question: '¿Qué es un boletín eléctrico y cuándo es necesario?',
    answer: 'El boletín eléctrico es un certificado oficial que acredita que la instalación eléctrica cumple normativa vigente. Es necesario en: instalaciones nuevas, reformas importantes, cambio de potencia, o compraventa de vivienda. Nuestros electricistas certificados emiten el boletín eléctrico tras realizar la instalación o revisión.',
    category: 'informacion',
    serviceId: 'electricista'
  },
  // Calefaccion-specific FAQs (GEO-neutral)
  {
    question: '¿Por qué no calientan los radiadores?',
    answer: 'Causas comunes de radiadores que no calientan: aire acumulado en el sistema (necesita purgado de radiadores), presión baja en caldera (menos de 1 bar), válvula del radiador cerrada o defectuosa, bomba circuladora averiada, o termostato mal configurado. Si tras purgar los radiadores el problema persiste, llama a un técnico de calefacción para diagnosticar la avería.',
    category: 'problemas',
    serviceId: 'calefaccion'
  },
  {
    question: '¿Qué hacer si la calefacción no funciona?',
    answer: 'Si la calefacción no funciona: verifica que el termostato esté encendido y a temperatura adecuada, comprueba la presión de la caldera (debe estar entre 1-1.5 bar), asegúrate de que hay suministro de gas o electricidad, revisa que no haya errores en pantalla de la caldera. Si todo está correcto y sigue sin funcionar, contacta con un técnico de calefacción urgente. No intentes reparar la caldera tú mismo.',
    category: 'emergencia',
    serviceId: 'calefaccion'
  },
  {
    question: '¿Por qué baja la presión de la caldera?',
    answer: 'La presión baja en caldera ocurre por: pequeñas fugas en radiadores, tuberías o válvulas, válvula de seguridad defectuosa, o vaso de expansión averiado. Si la presión baja frecuentemente, hay que identificar y reparar la causa. No es normal que baje constantemente. Un técnico de calefacción localiza la fuga y repara el sistema para mantener presión estable.',
    category: 'problemas',
    serviceId: 'calefaccion'
  },
  {
    question: '¿Cuánto cuesta reparar una caldera?',
    answer: 'El coste de reparación de calderas varía según la avería. Visita y diagnóstico desde 59€. Reparación de avería básica 80-150€, cambio de piezas comunes (termostato, electroválvula) 100-200€, reparación del circuito 150-300€. El mantenimiento anual preventivo cuesta 80-120€ y evita averías graves. Ofrecemos presupuesto gratuito sin compromiso antes de cualquier reparación.',
    category: 'precio',
    serviceId: 'calefaccion'
  },
  {
    question: '¿Cuándo llamar a un técnico de calefacción?',
    answer: 'Llama a un técnico de calefacción si: la caldera no arranca, hace ruidos extraños, pierde presión constantemente, muestra errores en pantalla, huele a gas, los radiadores no calientan tras purgarlos, o para realizar el mantenimiento anual obligatorio. No esperes a que la avería sea grave, especialmente en invierno. Servicio urgente disponible 24/7.',
    category: 'servicio',
    serviceId: 'calefaccion'
  },
  {
    question: '¿Es obligatorio el mantenimiento de la caldera?',
    answer: 'Sí, el mantenimiento de calefacción es obligatorio por normativa. Calderas de gas requieren revisión anual. El mantenimiento incluye: limpieza de quemadores, revisión de válvulas de seguridad, comprobación de presiones, análisis de combustión, y prueba de estanqueidad. Emitimos certificado de mantenimiento obligatorio. El mantenimiento previene averías, mejora eficiencia energética y garantiza seguridad.',
    category: 'mantenimiento',
    serviceId: 'calefaccion'
  },
  // Aire Acondicionado-specific FAQs (GEO-neutral)
  {
    question: '¿Por qué el aire acondicionado no enfría?',
    answer: 'Causas comunes de aire acondicionado que no enfría: nivel bajo de gas refrigerante (necesita recarga), filtros sucios obstruidos (bloquean flujo de aire), condensador exterior sucio, fallo en el compresor, termostato descalibrado, o válvula de expansión defectuosa. Si tras limpiar los filtros el problema persiste, llama a un técnico de aire acondicionado para diagnóstico completo y reparación.',
    category: 'problemas',
    serviceId: 'aire-acondicionado'
  },
  {
    question: '¿Por qué el aire acondicionado pierde agua?',
    answer: 'El split pierde agua por: tubo de drenaje obstruido (causa más común), bandeja de condensación sucia o rota, bomba de drenaje averiada, o exceso de humedad por falta de mantenimiento. Si el agua cae dentro de casa, el circuito de drenaje necesita limpieza o reparación. Un técnico de aire acondicionado limpia el desagüe, repara la bandeja si es necesario y restablece el drenaje correcto.',
    category: 'problemas',
    serviceId: 'aire-acondicionado'
  },
  {
    question: '¿Cuándo necesita el aire acondicionado carga de gas?',
    answer: 'El aire acondicionado necesita carga de gas cuando: enfría menos de lo normal progresivamente, se forma hielo en la unidad interior, el compresor funciona pero no enfría, o tras reparar una fuga de gas. El gas refrigerante no se consume, si baja nivel hay fuga. Un técnico certificado en gases fluorados localiza y repara fugas antes de recargar. La recarga incluye vacío del sistema y carga según especificaciones del fabricante.',
    category: 'mantenimiento',
    serviceId: 'aire-acondicionado'
  },
  {
    question: '¿Qué hacer si el split hace ruido?',
    answer: 'Si el aire acondicionado hace ruido: ruidos de clic al encender/apagar son normales (dilatación), ruido continuo fuerte indica ventilador sucio o rodamientos gastados, vibración excesiva sugiere fijaciones flojas, silbidos indican falta de gas o restricción en tuberías. Si el ruido es nuevo o excesivo, contacta técnico de aire acondicionado. El mantenimiento preventivo con limpieza evita la mayoría de ruidos.',
    category: 'problemas',
    serviceId: 'aire-acondicionado'
  },
  {
    question: '¿Cuánto cuesta reparar un aire acondicionado?',
    answer: 'El coste de reparación de aire acondicionado varía según avería. Visita y diagnóstico desde 79€. Limpieza y mantenimiento básico 60-90€, carga de gas refrigerante 90-150€, reparación de fugas 120-200€, cambio de piezas comunes (ventilador, sonda) 100-180€. Instalación split completa desde 350€. Ofrecemos presupuesto gratuito sin compromiso antes de cualquier reparación.',
    category: 'precio',
    serviceId: 'aire-acondicionado'
  },
  {
    question: '¿Cuándo hacer mantenimiento del aire acondicionado?',
    answer: 'Recomendamos mantenimiento de aire acondicionado anual, idealmente antes del verano. El mantenimiento incluye: limpieza profunda de filtros, limpieza de intercambiadores de calor, comprobación de presiones de gas, verificación de conexiones eléctricas, limpieza del circuito de drenaje, y revisión del compresor. El mantenimiento previene averías, mejora eficiencia energética (reduce consumo hasta 30%), y elimina mal olor del aire acondicionado. Técnicos certificados en gases fluorados.',
    category: 'mantenimiento',
    serviceId: 'aire-acondicionado'
  },
  // General FAQs
  {
    question: '¿Cuánto cuesta un servicio de fontanería?',
    answer: 'El coste de un servicio de fontanería comienza desde 49€ para servicios básicos. El precio final depende del tipo de trabajo, urgencia, materiales necesarios y complejidad. Ofrecemos presupuestos gratuitos sin compromiso.',
    category: 'precio'
  },
  {
    question: '¿Tenéis servicio de urgencias 24 horas?',
    answer: 'Sí, contamos con servicio de emergencias disponible las 24 horas del día, los 7 días de la semana, incluidos festivos. Nuestros profesionales están listos para atender cualquier urgencia de fontanería, electricidad o desatascos.',
    category: 'servicio'
  },
  {
    question: '¿En qué ciudades operáis?',
    answer: 'Operamos en las principales ciudades de España: Madrid, Barcelona, Valencia, Sevilla, Zaragoza, Málaga y muchas más. Consulta nuestra cobertura específica para tu localidad.',
    category: 'cobertura'
  },
  {
    question: '¿Cuánto tiempo tardáis en llegar?',
    answer: 'En servicios de emergencia, nuestro tiempo promedio de respuesta es de 30-60 minutos, dependiendo de la ubicación. Para servicios programados, ofrecemos citas el mismo día o al día siguiente.',
    category: 'servicio'
  },
  {
    question: '¿Los profesionales están certificados?',
    answer: 'Sí, todos nuestros profesionales están certificados, tienen experiencia comprobada y cuentan con todas las licencias necesarias. Están especializados en sus áreas y reciben formación continua.',
    category: 'profesionales'
  },
  {
    question: '¿Ofrecéis garantía en el trabajo realizado?',
    answer: 'Sí, todos nuestros trabajos incluyen garantía. El periodo de garantía varía según el tipo de servicio y está especificado en el presupuesto. Garantizamos la calidad de nuestro trabajo y materiales.',
    category: 'garantía'
  },
  {
    question: '¿Cómo puedo solicitar un presupuesto?',
    answer: 'Puedes solicitar un presupuesto gratuito llamando a nuestro número de teléfono, mediante el formulario web o por WhatsApp. Te responderemos en el menor tiempo posible con un presupuesto detallado.',
    category: 'presupuesto'
  },
  {
    question: '¿Qué métodos de pago aceptáis?',
    answer: 'Aceptamos efectivo, tarjetas de crédito/débito, transferencia bancaria y Bizum. El pago se realiza una vez finalizado el trabajo a su total satisfacción.',
    category: 'pago'
  },
  {
    question: '¿Hacéis trabajos para comunidades de vecinos?',
    answer: 'Sí, trabajamos con comunidades de propietarios y ofrecemos contratos de mantenimiento preventivo. Contacta con nosotros para condiciones especiales para comunidades.',
    category: 'servicio'
  },
  {
    question: '¿Qué hacer en caso de una fuga de agua?',
    answer: 'En caso de fuga: 1) Cierra la llave de paso general, 2) Corta la electricidad en la zona afectada si hay riesgo, 3) Llámanos inmediatamente. Nuestro equipo de emergencias estará contigo en menos de una hora.',
    category: 'emergencia'
  },
  // Limpieza de Tuberías - Preventive/Industrial Service FAQs
  {
    question: '¿Cuánto cuesta limpieza preventiva de tuberías para comunidad?',
    answer: 'El servicio de limpieza industrial con camión cuba comienza desde 150€ para comunidades pequeñas. Limpieza bajante vertical 150-250€, colector horizontal 280-450€, limpieza integral edificio 400-800€ según número de plantas. Para hoteles y restaurantes ofrecemos presupuestos personalizados según instalación. Incluimos certificado de limpieza para administradores.',
    category: 'precio',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿Cada cuánto tiempo debe hacerse limpieza preventiva de tuberías?',
    answer: 'Recomendamos limpieza preventiva anual para comunidades residenciales estándar. Hoteles con alta ocupación: semestral. Restaurantes y locales comerciales con grasa: trimestral o semestral según volumen. Edificios históricos o con tuberías antiguas: anual obligatorio. El mantenimiento preventivo evita atascos graves, malos olores y problemas costosos que afectan a múltiples viviendas o huéspedes.',
    category: 'mantenimiento',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿Qué diferencia hay entre desatasco urgente y limpieza preventiva de tuberías?',
    answer: 'El desatasco urgente resuelve bloqueos puntuales ya existentes en viviendas (fregadero, inodoro). La limpieza preventiva industrial con camión cuba es mantenimiento programado para comunidades, hoteles y empresas: limpia colectores completos, bajantes verticales y arquetas antes de que se atasquen. Previene emergencias, elimina acumulaciones de grasa y residuos, y mantiene flujo óptimo en instalaciones compartidas. Son servicios complementarios con objetivos diferentes.',
    category: 'servicio',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿Qué incluye el servicio de limpieza con camión cuba?',
    answer: 'Nuestro servicio con camión cuba incluye: inspección previa con cámara CCTV, limpieza a alta presión de bajantes y colectores, aspiración de residuos sólidos, limpieza de arquetas de gran volumen, eliminación de grasa industrial solidificada, y informe técnico fotográfico. Emitimos certificado de limpieza para comunidades y cumplimiento normativo hostelero. Trabajamos con equipos profesionales de alta capacidad sin necesidad de obras.',
    category: 'servicio',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿Hacéis limpieza de tuberías para hoteles y restaurantes?',
    answer: 'Sí, somos especialistas en limpieza industrial para sector hostelero. Para hoteles: limpieza de redes con alta carga de uso, mantenimiento preventivo en temporada baja, sistemas de lavanderías y cocinas industriales. Para restaurantes: limpieza especializada de tuberías con grasa, separadores de grasas, cumplimiento normativa sanitaria, certificados para inspecciones. Trabajamos fuera de horario operativo para no afectar servicio a clientes.',
    category: 'hosteleria',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿Se necesita autorizar la limpieza con la comunidad de propietarios?',
    answer: 'Sí, la limpieza preventiva de colectores y bajantes comunitarias requiere autorización del presidente o administrador de fincas, ya que afecta a zonas comunes y se cobra del fondo comunitario. Proporcionamos presupuesto detallado para junta, certificado post-limpieza, y coordinamos acceso a trasteros o sótanos si es necesario. Muchas comunidades lo incluyen en plan de mantenimiento anual preventivo junto con revisión ascensores y caldera.',
    category: 'comunidades',
    serviceId: 'limpieza-tuberias'
  },
  {
    question: '¿La limpieza preventiva evita problemas de atascos futuros?',
    answer: 'Sí, la limpieza preventiva regular reduce drásticamente la probabilidad de atascos graves. Elimina acumulaciones progresivas de grasa, cal, jabón y residuos antes de que bloqueen completamente las tuberías. En comunidades con mantenimiento preventivo anual, los atascos urgentes se reducen 70-80%. El coste preventivo (150-800€ anual comunidad) es muy inferior a emergencias múltiples (cada atasco urgente 80-180€) más daños por inundaciones.',
    category: 'prevencion',
    serviceId: 'limpieza-tuberias'
  }
]
