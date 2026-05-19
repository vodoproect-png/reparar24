import type { Locale } from '@/lib/i18n/config'
import type { Service } from '@/data/services'
import type { City } from '@/data/cities'

/**
 * SEO Content Structure Foundation
 * Scalable architecture for future programmatic SEO content generation
 */

/**
 * Content block types for modular SEO pages
 */
export type ContentBlockType =
  | 'faq'
  | 'problem-solution'
  | 'emergency-info'
  | 'service-comparison'
  | 'trust-signals'
  | 'local-info'
  | 'pricing-info'
  | 'process-steps'

/**
 * Content variants - NO MORE any types!
 */
export type FAQContent = Array<{
  question: string
  answer: string
}>

export type ProblemSolutionContent = {
  problem: string
  solution: string
  benefits: string[]
}

export type EmergencyContent = {
  urgencyLevel: 'critical' | 'high' | 'normal' | 'medium' | 'low'
  responseTime: string
  availability: string
  contactInfo?: string
}

export type TrustContent = {
  badges: string[]
  guarantees: string[]
  certifications: string[]
}

export type LocalContent = {
  areaName: string
  postalCodes: string[]
  coverage: string
}

export type PricingContent = {
  basePrice?: string
  priceRange: string
  factors: string[]
}

export type ProcessContent = Array<{
  step: number
  title: string
  description: string
}>

export type ServiceComparisonContent = Array<{
  serviceName: string
  description: string
  priceRange: string
  bestFor: string[]
}>

export type ContentVariant =
  | { type: 'faq'; content: FAQContent }
  | { type: 'problem-solution'; content: ProblemSolutionContent }
  | { type: 'emergency-info'; content: EmergencyContent }
  | { type: 'trust-signals'; content: TrustContent }
  | { type: 'local-info'; content: LocalContent }
  | { type: 'pricing-info'; content: PricingContent }
  | { type: 'process-steps'; content: ProcessContent }
  | { type: 'service-comparison'; content: ServiceComparisonContent }

export interface ContentBlock {
  type: ContentBlockType
  title: string
  content: ContentVariant['content']
  metadata?: Record<string, string | number | boolean>
}

/**
 * FAQ Block Structure
 */
export interface FAQBlock {
  type: 'faq'
  title: string
  content: FAQContent
  metadata?: Record<string, string | number | boolean>
}

/**
 * Problem-Solution Block (for programmatic SEO)
 */
export interface ProblemSolutionBlock {
  type: 'problem-solution'
  title: string
  content: ProblemSolutionContent
  metadata?: Record<string, string | number | boolean>
}

/**
 * Emergency Info Block
 */
export interface EmergencyBlock {
  type: 'emergency-info'
  title: string
  content: EmergencyContent
  metadata?: Record<string, string | number | boolean>
}

/**
 * Service Comparison Block (for cross-selling)
 */
export interface ServiceComparisonBlock {
  type: 'service-comparison'
  title: string
  content: ServiceComparisonContent
  metadata?: Record<string, string | number | boolean>
}

/**
 * Content Template Generator
 * Prepares scalable templates for AI-generated content
 */
export const ContentTemplateGenerator = {
  /**
   * Generate FAQ template for service
   */
  generateFAQTemplate(service: Service, city?: City, locale: Locale = 'es'): FAQBlock {
    const location = city ? ` en ${city.name}` : ''
    
    return {
      type: 'faq',
      title: `Preguntas frecuentes sobre ${service.name}${location}`,
      content: [
        {
          question: `¿Cuánto cuesta el servicio de ${service.name.toLowerCase()}${location}?`,
          answer: `El servicio comienza desde ${service.priceRange}. El precio final depende de la complejidad del trabajo y los materiales necesarios.`,
        },
        {
          question: `¿Cuánto tiempo tarda en llegar un profesional${location}?`,
          answer: `Nuestro tiempo de respuesta típico es de 30-60 minutos. Para emergencias, priorizamos la atención inmediata.`,
        },
        {
          question: `¿Ofrecen garantía en el servicio de ${service.name.toLowerCase()}?`,
          answer: `Sí, todos nuestros trabajos incluyen garantía. La duración específica depende del tipo de servicio realizado.`,
        },
      ],
      metadata: {
        serviceId: service.id,
        ...(city?.id && { cityId: city.id }),
        locale,
      },
    }
  },

  /**
   * Generate problem-solution template (for programmatic landing pages)
   */
  generateProblemSolutionTemplate(
    problem: string,
    service: Service,
    city?: City
  ): ProblemSolutionBlock {
    const location = city ? ` en ${city.name}` : ''
    
    return {
      type: 'problem-solution',
      title: `Solución para: ${problem}`,
      content: {
        problem,
        solution: `Nuestro servicio de ${service.name}${location} resuelve ${problem.toLowerCase()} de manera rápida y profesional.`,
        benefits: service.benefits.slice(0, 3),
      },
      metadata: {
        serviceId: service.id,
        ...(city?.id && { cityId: city.id }),
        problemKeyword: problem,
      },
    }
  },

  /**
   * Generate emergency block template
   */
  generateEmergencyTemplate(service: Service, city?: City): EmergencyBlock {
    const location = city ? ` en ${city.name}` : ''
    
    return {
      type: 'emergency-info',
      title: `Servicio de Emergencias 24/7`,
      content: {
        urgencyLevel: service.available24h ? 'high' : 'normal',
        responseTime: service.available24h ? '30-45 minutos' : '2-4 horas',
        availability: service.available24h
          ? '24 horas, 7 días a la semana'
          : 'Lunes a Sábado, 8:00 - 20:00',
        contactInfo: '+34 641 68 85 24',
      },
      metadata: {
        serviceId: service.id,
        ...(city?.id && { cityId: city.id }),
        is24h: service.available24h,
      },
    }
  },
}

/**
 * Programmatic SEO Page Structure
 * Foundation for AI-generated landing pages
 */
export interface ProgrammaticPageStructure {
  title: string
  metaDescription: string
  h1: string
  intro: string
  contentBlocks: ContentBlock[]
  cta: {
    primary: string
    secondary?: string
  }
  relatedPages: string[]
}

/**
 * SEO Page Generator
 * Creates structured content for programmatic pages
 */
export const SEOPageGenerator = {
  /**
   * Generate structure for problem-based landing page
   * Example: "Fuga de agua urgente en Madrid"
   */
  problemBasedPage(
    problem: string,
    service: Service,
    city: City,
    locale: Locale = 'es'
  ): ProgrammaticPageStructure {
    return {
      title: `${problem} - ${service.name} en ${city.name} | Reparar24`,
      metaDescription: `Solución inmediata para ${problem.toLowerCase()} en ${city.name}. ${service.name} profesional ${service.priceRange}. Disponible 24h.`,
      h1: `${problem} en ${city.name}`,
      intro: `¿Necesitas solucionar ${problem.toLowerCase()} en ${city.name}? Nuestro servicio de ${service.name} está disponible las 24 horas.`,
      contentBlocks: [
        ContentTemplateGenerator.generateProblemSolutionTemplate(problem, service, city),
        ContentTemplateGenerator.generateEmergencyTemplate(service, city),
        ContentTemplateGenerator.generateFAQTemplate(service, city, locale),
      ],
      cta: {
        primary: `Llamar Ahora - ${service.priceRange}`,
        secondary: 'Solicitar Presupuesto Gratuito',
      },
      relatedPages: [],
    }
  },

  /**
   * Generate structure for comparison page
   * Example: "Fontanero vs Plomero en Madrid"
   */
  comparisonPage(
    services: Service[],
    city: City,
    locale: Locale = 'es'
  ): ProgrammaticPageStructure {
    const serviceNames = services.map((s) => s.name).join(' vs ')
    
    return {
      title: `${serviceNames} en ${city.name} - Comparativa | Reparar24`,
      metaDescription: `Comparativa profesional: ${serviceNames} en ${city.name}. Precios, disponibilidad y características de cada servicio.`,
      h1: `Comparativa: ${serviceNames} en ${city.name}`,
      intro: `Descubre las diferencias entre nuestros servicios de ${serviceNames.toLowerCase()} en ${city.name}.`,
      contentBlocks: [],
      cta: {
        primary: 'Ver Todos los Servicios',
      },
      relatedPages: [],
    }
  },
}

/**
 * Schema templates for various content types
 */
export const ContentSchemaGenerator = {
  /**
   * Generate FAQ schema from FAQ block
   */
  faqSchema(faqBlock: FAQBlock) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqBlock.content.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
  },

  /**
   * Generate HowTo schema for process steps
   */
  howToSchema(steps: string[], name: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: step,
      })),
    }
  },
}
