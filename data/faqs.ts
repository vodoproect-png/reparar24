export interface FAQ {
  question: string
  answer: string
  category?: string
}

export const faqs: FAQ[] = [
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
