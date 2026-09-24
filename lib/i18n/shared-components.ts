/**
 * Spanish-only shared component copy.
 *
 * EN/RU are accepted only as legacy URL inputs for redirects, never as active
 * content locales. Any caller receives Spanish text.
 */

import type { Locale } from './config'

export interface SharedComponentTranslations {
  serviceGuaranteeTitle: string
  serviceGuaranteeDesc: string
  certifiedProfessionals: string
  qualityMaterials: string
  transparentBudget: string
  responseTimeTitle: string
  responseTimeDesc: string
  localExpertsTitle: string
  localExpertsDesc: (yearsExperience: number, city: string) => string
  processTitle: string
  processStep1Title: string
  processStep1Desc: string
  processStep2Title: string
  processStep2Desc: string
  processStep3Title: string
  processStep3Desc: string
  processStep4Title: string
  processStep4Desc: string
  processStep5Title: string
  processStep5Desc: string
  needProfessionalNow: string
  ctaSubtitle: string
  callButtonText: string
  whatsappButton: string
  availability247: string
  availability247Desc: string
  freeQuote: string
  freeQuoteDesc: string
  qualityGuaranteeTitle: string
  qualityGuaranteeDesc: string
  urgentAvailable: string
  heroTitle1: string
  heroTitle2: string
  heroDescription: string
  callNowLabel: string
  whatsappImmediate: string
  fastResponse: string
  fastResponseTime: string
  certifiedProfessionalsLabel: string
  experienceGuaranteed: string
  workGuarantee: string
  qualityAssured: string
  ourServices: string
}

export function getSharedTranslations(locale: Locale): SharedComponentTranslations {
  void locale

  return {
    serviceGuaranteeTitle: 'Garantía de Servicio',
    serviceGuaranteeDesc:
      'Todos nuestros servicios incluyen garantía de satisfacción. Si no estás conforme con el trabajo realizado, lo corregimos sin coste adicional.',
    certifiedProfessionals: 'Profesionales certificados y asegurados',
    qualityMaterials: 'Materiales de primera calidad',
    transparentBudget: 'Presupuesto transparente sin sorpresas',
    responseTimeTitle: 'Tiempo de Respuesta',
    responseTimeDesc: '30-60 minutos en la zona y área metropolitana. Servicio de emergencia 24 horas, 365 días al año.',
    localExpertsTitle: 'Expertos Locales en',
    localExpertsDesc: (years, city) =>
      `Con más de ${years} años de experiencia en ${city}, conocemos las instalaciones típicas de la zona, los problemas más comunes y las soluciones más efectivas.`,
    processTitle: 'Nuestro Proceso de Trabajo',
    processStep1Title: 'Llamada y Diagnóstico Inicial',
    processStep1Desc: 'Evaluamos el problema por teléfono y te orientamos sobre la urgencia y el coste aproximado.',
    processStep2Title: 'Desplazamiento Rápido',
    processStep2Desc: 'Llegamos a tu domicilio en 30-60 minutos con todas las herramientas necesarias.',
    processStep3Title: 'Inspección y Presupuesto',
    processStep3Desc: 'Inspeccionamos el problema, te explicamos la solución y te damos un presupuesto claro antes de empezar.',
    processStep4Title: 'Reparación Profesional',
    processStep4Desc: 'Realizamos el trabajo con materiales de calidad y dejamos todo limpio y funcionando.',
    processStep5Title: 'Garantía y Seguimiento',
    processStep5Desc: 'Te entregamos factura y garantía por escrito. Seguimiento post-servicio para asegurar tu satisfacción.',
    needProfessionalNow: '¿Necesitas un Profesional Ahora?',
    ctaSubtitle: 'Estamos disponibles 24/7 para atender tus emergencias. Respuesta rápida garantizada en toda España.',
    callButtonText: 'Llamar al',
    whatsappButton: 'WhatsApp',
    availability247: 'Disponibilidad 24/7',
    availability247Desc: 'Servicio de emergencias disponible todos los días del año',
    freeQuote: 'Presupuesto Gratuito',
    freeQuoteDesc: 'Sin compromiso y con precios transparentes',
    qualityGuaranteeTitle: 'Garantía de Calidad',
    qualityGuaranteeDesc: 'Todos nuestros trabajos incluyen garantía',
    urgentAvailable: 'URGENTE: Disponibles 24/7',
    heroTitle1: 'Fontaneros y Electricistas',
    heroTitle2: 'Respuesta en 30-60 Minutos',
    heroDescription:
      'Atención inmediata para emergencias. Profesionales certificados disponibles 24 horas en toda España. Garantía de trabajo y presupuesto transparente.',
    callNowLabel: 'Llamar Ahora',
    whatsappImmediate: 'WhatsApp Inmediato',
    fastResponse: 'Respuesta Rápida',
    fastResponseTime: '30-60 minutos',
    certifiedProfessionalsLabel: 'Profesionales Certificados',
    experienceGuaranteed: 'Experiencia garantizada',
    workGuarantee: 'Garantía de Trabajo',
    qualityAssured: 'Calidad asegurada',
    ourServices: 'Nuestros Servicios',
  }
}
