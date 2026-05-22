/**
 * Lightweight Shared Component Translations for EN/RU
 * 
 * Provides simple translation interface for shared components (EEAT, CTA, trust signals)
 * Used across city/district/service pages
 * 
 * Pattern: Same as district-content.ts and city-content.ts
 */

import type { Locale } from './config'

export interface SharedComponentTranslations {
  // EEAT - Service Guarantee
  serviceGuaranteeTitle: string
  serviceGuaranteeDesc: string
  certifiedProfessionals: string
  qualityMaterials: string
  transparentBudget: string
  
  // EEAT - Response Time
  responseTimeTitle: string
  responseTimeDesc: string
  
  // EEAT - Local Expertise
  localExpertsTitle: string
  localExpertsDesc: (yearsExperience: number, city: string) => string
  
  // EEAT - Process
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
  
  // CTA Section
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
  
  // Hero
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
  
  // Shared
  ourServices: string
}

/**
 * Get shared component translations by locale
 */
export function getSharedTranslations(locale: Locale): SharedComponentTranslations {
  if (locale === 'en') {
    return {
      // EEAT - Service Guarantee
      serviceGuaranteeTitle: 'Service Guarantee',
      serviceGuaranteeDesc: 'All our services include satisfaction guarantee. If you\'re not satisfied with the work performed, we\'ll correct it at no additional cost.',
      certifiedProfessionals: 'Certified and insured professionals',
      qualityMaterials: 'Premium quality materials',
      transparentBudget: 'Transparent budget with no surprises',
      
      // EEAT - Response Time
      responseTimeTitle: 'Response Time',
      responseTimeDesc: '30-60 minutes in the zone and metropolitan area. 24/7 emergency service, 365 days a year.',
      
      // EEAT - Local Expertise
      localExpertsTitle: 'Local Experts in',
      localExpertsDesc: (years, city) => 
        `With over ${years} years of experience in ${city}, we know the typical installations in the area, the most common problems and the most effective solutions.`,
      
      // EEAT - Process
      processTitle: 'Our Work Process',
      processStep1Title: 'Call and Initial Diagnosis',
      processStep1Desc: 'We evaluate the problem over the phone and guide you on the urgency and approximate cost.',
      processStep2Title: 'Fast Deployment',
      processStep2Desc: 'We arrive at your location in 30-60 minutes with all necessary tools.',
      processStep3Title: 'Inspection and Budget',
      processStep3Desc: 'We inspect the problem, explain the solution and give you a clear quote before starting.',
      processStep4Title: 'Professional Repair',
      processStep4Desc: 'We perform the work with quality materials and leave everything clean and working.',
      processStep5Title: 'Guarantee and Follow-up',
      processStep5Desc: 'We provide invoice and written guarantee. Post-service follow-up to ensure your satisfaction.',
      
      // CTA Section
      needProfessionalNow: 'Need a Professional Now?',
      ctaSubtitle: 'We are available 24/7 for your emergencies. Fast guaranteed response throughout Spain.',
      callButtonText: 'Call',
      whatsappButton: 'WhatsApp',
      availability247: '24/7 Availability',
      availability247Desc: 'Emergency service available every day of the year',
      freeQuote: 'Free Quote',
      freeQuoteDesc: 'No obligation and transparent pricing',
      qualityGuaranteeTitle: 'Quality Guarantee',
      qualityGuaranteeDesc: 'All our work includes guarantee',
      
      // Hero
      urgentAvailable: 'URGENT: Available 24/7',
      heroTitle1: 'Plumbers and Electricians',
      heroTitle2: 'Response in 30-60 Minutes',
      heroDescription: 'Immediate attention for emergencies. Certified professionals available 24 hours throughout Spain. Work guarantee and transparent budget.',
      callNowLabel: 'Call Now',
      whatsappImmediate: 'Immediate WhatsApp',
      fastResponse: 'Fast Response',
      fastResponseTime: '30-60 minutes',
      certifiedProfessionalsLabel: 'Certified Professionals',
      experienceGuaranteed: 'Guaranteed Experience',
      workGuarantee: 'Work Guarantee',
      qualityAssured: 'Assured Quality',
      
      // Shared
      ourServices: 'Our Services'
    }
  }
  
  if (locale === 'ru') {
    return {
      // EEAT - Service Guarantee
      serviceGuaranteeTitle: 'Гарантия услуги',
      serviceGuaranteeDesc: 'Все наши услуги включают гарантию удовлетворения. Если вы не довольны выполненной работой, мы исправим ее без дополнительной оплаты.',
      certifiedProfessionals: 'Сертифицированные и застрахованные специалисты',
      qualityMaterials: 'Материалы премиум-качества',
      transparentBudget: 'Прозрачная смета без сюрпризов',
      
      // EEAT - Response Time
      responseTimeTitle: 'Время отклика',
      responseTimeDesc: '30-60 минут в зоне и в метрополитене. Экстренная помощь 24/7, 365 дней в году.',
      
      // EEAT - Local Expertise
      localExpertsTitle: 'Местные специалисты в',
      localExpertsDesc: (years, city) => 
        `С более чем ${years} годами опыта в ${city}, мы знаем типичные установки в этом районе, самые распространенные проблемы и самые эффективные решения.`,
      
      // EEAT - Process
      processTitle: 'Наш рабочий процесс',
      processStep1Title: 'Звонок и первичная диагностика',
      processStep1Desc: 'Мы оцениваем проблему по телефону и информируем вас о срочности и примерной стоимости.',
      processStep2Title: 'Быстрый выезд',
      processStep2Desc: 'Мы прибываем к вам в течение 30-60 минут со всеми необходимыми инструментами.',
      processStep3Title: 'Осмотр и смета',
      processStep3Desc: 'Мы осматриваем проблему, объясняем решение и даем четкую смету перед началом работы.',
      processStep4Title: 'Профессиональный ремонт',
      processStep4Desc: 'Мы выполняем работу с качественными материалами и оставляем все в чистоте и рабочем состоянии.',
      processStep5Title: 'Гарантия и контроль',
      processStep5Desc: 'Мы предоставляем счет и письменную гарантию. Послепродажное обслуживание для обеспечения вашего удовлетворения.',
      
      // CTA Section
      needProfessionalNow: 'Нужен специалист сейчас?',
      ctaSubtitle: 'Мы доступны 24/7 для вашей срочной помощи. Быстрый гарантированный отклик по всей Испании.',
      callButtonText: 'Позвонить',
      whatsappButton: 'WhatsApp',
      availability247: 'Доступность 24/7',
      availability247Desc: 'Экстренная помощь доступна каждый день года',
      freeQuote: 'Бесплатная оценка',
      freeQuoteDesc: 'Без обязательств и с прозрачными ценами',
      qualityGuaranteeTitle: 'Гарантия качества',
      qualityGuaranteeDesc: 'Все наши работы включают гарантию',
      
      // Hero
      urgentAvailable: 'СРОЧНО: Доступно 24/7',
      heroTitle1: 'Сантехники и электрики',
      heroTitle2: 'Отклик через 30-60 минут',
      heroDescription: 'Немедленное реагирование на чрезвычайные ситуации. Сертифицированные специалисты доступны 24 часа по всей Испании. Гарантия работы и прозрачная смета.',
      callNowLabel: 'Позвонить сейчас',
      whatsappImmediate: 'WhatsApp сейчас',
      fastResponse: 'Быстрый отклик',
      fastResponseTime: '30-60 минут',
      certifiedProfessionalsLabel: 'Сертифицированные специалисты',
      experienceGuaranteed: 'Гарантированный опыт',
      workGuarantee: 'Гарантия работы',
      qualityAssured: 'Гарантированное качество',
      
      // Shared
      ourServices: 'Наши услуги'
    }
  }
  
  // Spanish (default) - keep original hardcoded Spanish
  return {
    // EEAT - Service Guarantee
    serviceGuaranteeTitle: 'Garantía de Servicio',
    serviceGuaranteeDesc: 'Todos nuestros servicios incluyen garantía de satisfacción. Si no estás conforme con el trabajo realizado, lo corregimos sin coste adicional.',
    certifiedProfessionals: 'Profesionales certificados y asegurados',
    qualityMaterials: 'Materiales de primera calidad',
    transparentBudget: 'Presupuesto transparente sin sorpresas',
    
    // EEAT - Response Time
    responseTimeTitle: 'Tiempo de Respuesta',
    responseTimeDesc: '30-60 minutos en la zona y área metropolitana. Servicio de emergencia 24 horas, 365 días al año.',
    
    // EEAT - Local Expertise
    localExpertsTitle: 'Expertos Locales en',
    localExpertsDesc: (years, city) => 
      `Con más de ${years} años de experiencia en ${city}, conocemos perfectamente las instalaciones típicas de la zona, los problemas más comunes y las soluciones más efectivas.`,
    
    // EEAT - Process
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
    
    // CTA Section
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
    
    // Hero
    urgentAvailable: 'URGENTE: Disponibles 24/7',
    heroTitle1: 'Fontaneros y Electricistas',
    heroTitle2: 'Respuesta en 30-60 Minutos',
    heroDescription: 'Atención inmediata para emergencias. Profesionales certificados disponibles 24 horas en toda España. Garantía de trabajo y presupuesto transparente.',
    callNowLabel: 'Llamar Ahora',
    whatsappImmediate: 'WhatsApp Inmediato',
    fastResponse: 'Respuesta Rápida',
    fastResponseTime: '30-60 minutos',
    certifiedProfessionalsLabel: 'Profesionales Certificados',
    experienceGuaranteed: 'Experiencia garantizada',
    workGuarantee: 'Garantía de Trabajo',
    qualityAssured: 'Calidad asegurada',
    
    // Shared
    ourServices: 'Nuestros Servicios'
  }
}
