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
  }
]
