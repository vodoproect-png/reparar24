/**
 * Semantic Content Generator
 * 
 * Generates semantically differentiated content for district pages
 * to avoid thin-content penalties and improve local expertise signals.
 * 
 * Core principles:
 * - Every district page must have meaningful unique content
 * - Content varies by district characteristics, service, and user intent
 * - Natural language variation, not template spam
 * - Strong E-E-A-T signals through local expertise
 */

import type { Service } from '@/data/services'
import type { City, District } from '@/data/cities'
import { getDistrictContext, getServiceContext, type DistrictContext } from '@/data/district-context'
import { getProblemsByService, type Problem } from '@/data/problems'

/**
 * Generate semantically varied introductory text
 */
export function generateDistrictIntro(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): string {
  if (!context) {
    // Fallback if no context available
    return `${service.longDescription} Servicio completo en ${district.name}, ${city.name}.`
  }

  // Build intro based on district characteristics
  const intros: string[] = []

  // Vary by building age and type
  if (context.avgBuildingAge === 'historic' || context.avgBuildingAge === 'old') {
    intros.push(
      `En ${district.name}, los ${context.traits[0] || 'edificios antiguos'} requieren especialización en ${service.name.toLowerCase()}. ` +
      `Nuestros profesionales conocen las particularidades de las instalaciones antiguas y trabajamos ` +
      `respetando la estructura de estos edificios.`
    )
  } else if (context.avgBuildingAge === 'modern' || context.avgBuildingAge === 'new') {
    intros.push(
      `${district.name} cuenta con ${context.traits[0] || 'instalaciones modernas'} que requieren ` +
      `técnicos especializados en ${service.name.toLowerCase()} actualizada. Trabajamos con las últimas ` +
      `tecnologías y sistemas inteligentes habituales en esta zona.`
    )
  } else {
    intros.push(
      `En ${district.name}, atendemos tanto ${context.traits[0] || 'edificios'} como construcciones modernas. ` +
      `Nuestro equipo de ${service.name.toLowerCase()} tiene experiencia con todo tipo de instalaciones ` +
      `características de este barrio.`
    )
  }

  // Add emergency context if applicable
  if (context.emergencyFrequency === 'very-high' || context.emergencyFrequency === 'high') {
    if (service.available24h) {
      intros.push(
        `Sabemos que en ${district.name} las urgencias son frecuentes, por eso nuestro ` +
        `servicio de ${service.name} está disponible 24 horas con tiempo de respuesta de 30-45 minutos.`
      )
    }
  }

  return intros.join(' ')
}

/**
 * Generate local expertise section text
 */
export function generateLocalExpertiseText(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): {
  title: string
  paragraphs: string[]
  highlights: string[]
} {
  if (!context) {
    return {
      title: `${service.name} en ${district.name}`,
      paragraphs: [`Servicio profesional de ${service.name.toLowerCase()} en todo ${district.name}.`],
      highlights: service.benefits.slice(0, 3)
    }
  }

  const serviceContext = getServiceContext(city.id, district.id, service.id)
  const paragraphs: string[] = []
  const highlights: string[] = []

  // First paragraph: District-specific expertise
  if (context.traits.length > 0) {
    const mainTrait = context.traits[0]
    paragraphs.push(
      `Nuestro equipo especializado en ${service.name.toLowerCase()} para ${mainTrait} de ${district.name} ` +
      `cuenta con más de 10 años de experiencia trabajando en esta zona. Conocemos en detalle las ` +
      `características de las instalaciones locales y los problemas más frecuentes del barrio.`
    )
  }

  // Second paragraph: Common problems in district
  if (serviceContext && serviceContext.commonIssues.length > 0) {
    const topIssue = serviceContext.commonIssues[0]
    paragraphs.push(
      `En ${district.name} atendemos regularmente casos de ${topIssue.toLowerCase()}. ` +
      `Hemos desarrollado técnicas específicas y contamos con las herramientas adecuadas para ` +
      `resolver estos problemas de forma eficiente y duradera.`
    )
    
    // Add to highlights
    serviceContext.commonIssues.slice(0, 3).forEach(issue => {
      highlights.push(`Experiencia con ${issue.toLowerCase()}`)
    })
  }

  // Third paragraph: Special considerations
  if (serviceContext && serviceContext.specialConsiderations.length > 0) {
    const consideration = serviceContext.specialConsiderations[0]
    paragraphs.push(
      `${consideration}. Por eso en cada trabajo en ${district.name} seguimos protocolos ` +
      `específicos que garantizan la calidad del resultado y el cumplimiento de todas las normativas.`
    )
  }

  return {
    title: `Expertos en ${service.name} para ${district.name}`,
    paragraphs,
    highlights: highlights.length > 0 ? highlights : service.benefits.slice(0, 3)
  }
}

/**
 * Generate district-specific problem list
 */
export function generateDistrictProblems(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext,
  limit: number = 3
): Array<{ problem: string; description: string }> {
  const problems: Array<{ problem: string; description: string }> = []
  
  const serviceContext = getServiceContext(city.id, district.id, service.id)
  
  if (serviceContext && serviceContext.commonIssues.length > 0) {
    // Use service-specific issues from district context
    serviceContext.commonIssues.slice(0, limit).forEach(issue => {
      problems.push({
        problem: issue,
        description: `Problema frecuente en ${context?.traits[0] || district.name}. Atención especializada con ${context?.infrastructureAge === 'old' ? 'técnicas adaptadas a instalaciones antiguas' : 'equipos modernos'}.`
      })
    })
  } else {
    // Fallback to general problems data
    const serviceProblems = getProblemsByService(service.id)
    serviceProblems.slice(0, limit).forEach(prob => {
      problems.push({
        problem: prob.title,
        description: prob.faqAnswer || `Solución profesional en ${district.name}.`
      })
    })
  }
  
  return problems
}

/**
 * Generate varied FAQ content for district
 */
export function generateDistrictFAQs(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []
  const serviceContext = getServiceContext(city.id, district.id, service.id)

  // FAQ 1: Price - vary by district characteristics
  const priceContext = context?.traits[0] || 'la zona'
  faqs.push({
    question: `¿Cuánto cuesta el servicio de ${service.name.toLowerCase()} en ${district.name}?`,
    answer: context?.buildingType === 'historic' 
      ? `En ${district.name}, dada la complejidad de trabajar en ${context.traits[0]}, el servicio comienza desde ${service.priceRange}. El precio puede variar según la dificultad de acceso y las peculiaridades de cada edificio. Ofrecemos presupuesto detallado sin compromiso.`
      : `El servicio de ${service.name.toLowerCase()} en ${district.name} comienza desde ${service.priceRange}. El precio final depende del tipo de trabajo, materiales necesarios y características de la instalación. Primera consulta y presupuesto gratuitos.`
  })

  // FAQ 2: Response time - vary by emergency frequency
  if (context?.emergencyFrequency === 'very-high' || context?.emergencyFrequency === 'high') {
    faqs.push({
      question: `¿Cuánto tardáis en llegar a ${district.name} en caso de urgencia?`,
      answer: `Sabemos que en ${district.name} ${context.traits.find(t => t.includes('urgencia')) ? 'las urgencias son muy frecuentes' : 'el tiempo de respuesta es crítico'}. Nuestro equipo de ${service.name.toLowerCase()} llega en 30-45 minutos a cualquier punto de ${district.name}. Disponibles 24/7 incluidos festivos.`
    })
  } else {
    faqs.push({
      question: `¿Cuánto tarda en llegar un profesional a ${district.name}?`,
      answer: `Para ${district.name}, nuestro tiempo de respuesta habitual es de 1-2 horas en horario normal. En urgencias ${service.available24h ? 'priorizamos la atención con llegada en 30-60 minutos' : 'coordinamos llegada el mismo día'}. También ofrecemos citas programadas con el día y hora que prefieras.`
    })
  }

  // FAQ 3: Specific to district characteristics
  if (serviceContext) {
    const mainIssue = serviceContext.commonIssues[0]
    const mainConsideration = serviceContext.specialConsiderations[0]
    
    faqs.push({
      question: `¿Estáis especializados en los problemas típicos de ${district.name}?`,
      answer: `Sí, trabajamos habitualmente en ${district.name} y conocemos bien ${mainIssue.toLowerCase()}. ${mainConsideration}. Nuestro equipo tiene amplia experiencia en ${context?.traits[0] || 'este tipo de edificios'} y utilizamos las técnicas más adecuadas para cada situación.`
    })
  } else {
    faqs.push({
      question: `¿Ofrecéis garantía en ${district.name}?`,
      answer: `Sí, todos nuestros trabajos de ${service.name.toLowerCase()} en ${district.name} incluyen garantía. La duración específica depende del tipo de servicio realizado, pero siempre emitimos certificado de trabajo con garantía por escrito.`
    })
  }

  // FAQ 4: Building-specific question
  if (context?.avgBuildingAge === 'historic' || context?.avgBuildingAge === 'old') {
    faqs.push({
      question: `¿Trabajáis en edificios antiguos de ${district.name}?`,
      answer: `Sí, estamos especializados en ${context.traits[0] || 'edificios antiguos'}. Conocemos las limitaciones y particularidades de las instalaciones antiguas en ${district.name}. Trabajamos con técnicas que respetan la estructura original ${context.buildingType === 'historic' ? 'y cumplimos con los requisitos de patrimonio histórico' : 'minimizando obras innecesarias'}.`
    })
  } else if (context?.avgBuildingAge === 'modern' || context?.avgBuildingAge === 'new') {
    faqs.push({
      question: `¿Estáis actualizados con las instalaciones modernas de ${district.name}?`,
      answer: `Sí, nuestro equipo está certificado en los sistemas ${serviceContext ? 'más habituales' : 'modernos'} de ${district.name}. ${context.traits.find(t => t.includes('domótica')) ? 'Trabajamos con domótica, automatización y sistemas inteligentes.' : 'Manejamos equipos de última generación y garantizamos la integración con sistemas existentes.'} Formación continua en nuevas tecnologías.`
    })
  }

  return faqs
}

/**
 * Generate varied meta description (OPTIMIZED: 120-155 char limit)
 */
export function generateDistrictMetaDescription(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): string {
  // REMOVED longDescription - was causing 300+ char meta descriptions!
  // OPTIMIZED: Concise, unique, 120-155 characters
  
  if (!context) {
    return `${service.name} ${service.available24h ? '24h' : 'profesional'} en ${district.name}, ${city.name}. ${service.priceRange}. Presupuesto gratis. ¡Llama ahora!`
  }

  const serviceContext = getServiceContext(city.id, district.id, service.id)
  const urgency = serviceContext?.urgencyLevel === 'high' ? 'Urgencias 24h' : 'Servicio profesional'
  const trait = context.traits[0]?.substring(0, 30) || district.name // Limit trait length
  
  // Keep it concise: urgency + service + location + price + CTA (120-155 chars)
  return `${urgency} de ${service.name} en ${trait}, ${city.name}. ${service.priceRange}. Llama ${service.available24h ? '24/7' : 'ahora'}.`
}

/**
 * Generate varied H1 with semantic intent
 * UPDATED: Include city name to ensure uniqueness across cities with same district names
 */
export function generateDistrictH1(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): string {
  if (!context) {
    return `${service.name} en ${district.name} ${city.name}`
  }

  const serviceContext = getServiceContext(city.id, district.id, service.id)
  
  // Vary H1 based on urgency and building type
  // Include city name for uniqueness (PR-CY audit fix for duplicate H1s)
  if (serviceContext?.urgencyLevel === 'high' && service.available24h) {
    return `${service.name} Urgente 24h en ${district.name} ${city.name}`
  }
  
  if (context.buildingType === 'historic') {
    return `${service.name} para Edificios Históricos en ${district.name} ${city.name}`
  }
  
  if (context.avgBuildingAge === 'new' || context.avgBuildingAge === 'modern') {
    return `${service.name} Especializado en ${district.name} ${city.name}`
  }
  
  // Default with trait modifier
  const modifier = context.traits.find(t => t.includes('residencial')) ? 'Residencial' :
                   context.traits.find(t => t.includes('comercio')) ? 'Comercial' :
                   'Profesional'
  
  return `${service.name} ${modifier} en ${district.name} ${city.name}`
}

/**
 * Generate emergency context text
 */
export function generateEmergencyContext(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): string | null {
  if (!service.available24h) return null
  
  if (!context) {
    return `Servicio de emergencias 24/7 en ${district.name}. Atención inmediata para urgencias de ${service.name.toLowerCase()}.`
  }

  const serviceContext = getServiceContext(city.id, district.id, service.id)
  
  if (context.emergencyFrequency === 'very-high') {
    return `En ${district.name} atendemos urgencias de ${service.name.toLowerCase()} constantemente. ` +
      `${serviceContext ? serviceContext.commonIssues[0] + ' requieren atención inmediata.' : 'Respuesta en 30-45 minutos.'} ` +
      `Nuestro equipo de guardia 24/7 conoce bien la zona y llega rápido a tu ubicación.`
  }
  
  if (context.emergencyFrequency === 'high') {
    return `Servicio de emergencias 24 horas en ${district.name}. Especialistas en ${context.traits[0] || 'urgencias'} ` +
      `con ${serviceContext ? 'experiencia en ' + serviceContext.commonIssues[0].toLowerCase() : 'atención rápida'}. ` +
      `Disponibles incluidos festivos y fines de semana.`
  }
  
  return `Servicio de ${service.name} disponible 24 horas en ${district.name}. Atención de urgencias con llegada en 45-60 minutos.`
}

/**
 * Generate call-to-action variations
 */
export function generateDistrictCTA(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): { primary: string; secondary: string } {
  const serviceContext = getServiceContext(city.id, district.id, service.id)
  
  // High urgency areas
  if (context?.emergencyFrequency === 'very-high' || serviceContext?.urgencyLevel === 'high') {
    return {
      primary: `Urgencias ${district.name} - ${service.priceRange}`,
      secondary: `WhatsApp Inmediato`
    }
  }
  
  // Premium areas
  if (context?.traits.find(t => t.includes('premium') || t.includes('alto standing'))) {
    return {
      primary: `Solicitar Presupuesto Personalizado`,
      secondary: `Llamar Ahora - ${service.priceRange}`
    }
  }
  
  // Default
  return {
    primary: `Llamar Ahora ${district.name} - ${service.priceRange}`,
    secondary: `Presupuesto Gratuito por WhatsApp`
  }
}

/**
 * Generate WhatsApp message with district context
 */
export function generateDistrictWhatsAppMessage(
  service: Service,
  city: City,
  district: District,
  context?: DistrictContext
): string {
  const serviceContext = getServiceContext(city.id, district.id, service.id)
  
  if (serviceContext?.urgencyLevel === 'high') {
    return `Hola, necesito ${service.name.toLowerCase()} urgente en ${district.name}, ${city.name}. ${serviceContext.commonIssues[0]}.`
  }
  
  return `Hola, necesito presupuesto de ${service.name.toLowerCase()} en ${district.name}, ${city.name}. CP: ${district.postalCodes[0]}.`
}

/**
 * Content variation safety check
 * Returns true if content for two districts is sufficiently different
 */
export function validateContentUniqueness(
  content1: string,
  content2: string,
  minDifferencePercent: number = 30
): boolean {
  // Simple word-level comparison
  const words1 = new Set(content1.toLowerCase().split(/\s+/))
  const words2 = new Set(content2.toLowerCase().split(/\s+/))
  
  const intersection = new Set([...words1].filter(w => words2.has(w)))
  const union = new Set([...words1, ...words2])
  
  const similarity = (intersection.size / union.size) * 100
  const difference = 100 - similarity
  
  return difference >= minDifferencePercent
}
