/**
 * Semantic SEO Data: Problem-Intent Clustering
 * 
 * This file defines common problems/queries that users search for.
 * Used for semantic SEO, internal linking, and future programmatic pages.
 * 
 * Structure enables:
 * - Problem-based SEO pages
 * - FAQ generation
 * - Internal linking by intent
 * - Topical authority building
 */

export interface Problem {
  id: string
  title: string // User-facing title
  query: string // Search query variation
  urgency: 'emergency' | 'urgent' | 'normal'
  serviceId: string // Related service
  keywords: string[]
  faqQuestion?: string
  faqAnswer?: string
}

/**
 * Plumbing Problems (Fontanería)
 */
export const plumbingProblems: Problem[] = [
  {
    id: 'water-leak',
    title: 'Fuga de Agua',
    query: 'fuga de agua',
    urgency: 'emergency',
    serviceId: 'fontanero',
    keywords: ['fuga', 'agua', 'tubería rota', 'gotera', 'humedad'],
    faqQuestion: '¿Qué hago si tengo una fuga de agua?',
    faqAnswer: 'Cierre la llave de paso principal inmediatamente y llame a un fontanero profesional. Nuestro servicio de emergencia está disponible 24/7 con respuesta en 30-60 minutos.',
  },
  {
    id: 'clogged-drain',
    title: 'Desagüe Atascado',
    query: 'desagüe atascado',
    urgency: 'urgent',
    serviceId: 'desatascos',
    keywords: ['atasco', 'desagüe', 'tubería', 'obstrucción', 'mal olor'],
    faqQuestion: '¿Cómo desatascar un desagüe?',
    faqAnswer: 'Los atascos requieren herramientas profesionales. Intentar desatascar sin experiencia puede dañar las tuberías. Nuestros técnicos utilizan equipos especializados para resolver cualquier atasco de forma segura.',
  },
  {
    id: 'no-hot-water',
    title: 'Sin Agua Caliente',
    query: 'no hay agua caliente',
    urgency: 'urgent',
    serviceId: 'fontanero',
    keywords: ['agua caliente', 'caldera', 'calentador', 'termo', 'avería'],
    faqQuestion: '¿Por qué no tengo agua caliente?',
    faqAnswer: 'La falta de agua caliente puede deberse a problemas en la caldera, termo eléctrico o instalación de gas. Un técnico certificado debe revisar el sistema para diagnosticar y reparar el problema de forma segura.',
  },
  {
    id: 'dripping-faucet',
    title: 'Grifo Que Gotea',
    query: 'grifo gotea',
    urgency: 'normal',
    serviceId: 'fontanero',
    keywords: ['grifo', 'goteo', 'fuga pequeña', 'reparación grifo'],
    faqQuestion: '¿Es urgente reparar un grifo que gotea?',
    faqAnswer: 'Aunque no es una emergencia, un grifo que gotea desperdicia agua y aumenta la factura. La reparación es rápida y económica. Contacte con nosotros para un presupuesto sin compromiso.',
  },
]

/**
 * Electrical Problems (Electricidad)
 */
export const electricalProblems: Problem[] = [
  {
    id: 'power-outage',
    title: 'Corte de Luz',
    query: 'se fue la luz',
    urgency: 'emergency',
    serviceId: 'electricista',
    keywords: ['corte luz', 'apagón', 'sin electricidad', 'cuadro eléctrico'],
    faqQuestion: '¿Qué hacer si se va la luz en casa?',
    faqAnswer: 'Verifique el cuadro eléctrico y los interruptores. Si el problema persiste, puede ser una avería peligrosa. Nuestros electricistas certificados están disponibles 24/7 para emergencias eléctricas.',
  },
  {
    id: 'short-circuit',
    title: 'Cortocircuito',
    query: 'cortocircuito',
    urgency: 'emergency',
    serviceId: 'electricista',
    keywords: ['cortocircuito', 'chispa', 'quemado', 'olor a quemado', 'peligro'],
    faqQuestion: '¿Es peligroso un cortocircuito?',
    faqAnswer: 'Sí, los cortocircuitos son peligrosos y pueden causar incendios. Desconecte la electricidad inmediatamente y llame a un electricista certificado. Atención de emergencia 24/7.',
  },
  {
    id: 'tripping-breaker',
    title: 'Disyuntor Salta',
    query: 'salta el diferencial',
    urgency: 'urgent',
    serviceId: 'electricista',
    keywords: ['diferencial', 'magnetotérmico', 'salta luz', 'interruptor'],
    faqQuestion: '¿Por qué salta el diferencial?',
    faqAnswer: 'El diferencial salta por problemas de seguridad: fugas eléctricas, sobrecargas o averías. Un electricista debe revisar la instalación para localizar y solucionar el problema.',
  },
  {
    id: 'outlet-not-working',
    title: 'Enchufe No Funciona',
    query: 'enchufe no funciona',
    urgency: 'normal',
    serviceId: 'electricista',
    keywords: ['enchufe', 'toma', 'no funciona', 'reparación enchufe'],
    faqQuestion: '¿Por qué no funcionan los enchufes?',
    faqAnswer: 'Los enchufes pueden dejar de funcionar por conexiones sueltas, averías internas o problemas en el circuito. Un electricista puede diagnosticar y reparar el problema de forma rápida y segura.',
  },
]

/**
 * AC Problems (Aire Acondicionado)
 */
export const acProblems: Problem[] = [
  {
    id: 'ac-not-cooling',
    title: 'Aire Acondicionado No Enfría',
    query: 'aire acondicionado no enfría',
    urgency: 'urgent',
    serviceId: 'aire-acondicionado',
    keywords: ['aire acondicionado', 'no enfría', 'calor', 'avería', 'gas'],
    faqQuestion: '¿Por qué el aire acondicionado no enfría?',
    faqAnswer: 'Puede ser falta de gas, filtros sucios, fallo del compresor o problemas eléctricos. Un técnico especializado debe revisar el sistema para diagnosticar y reparar la avería.',
  },
  {
    id: 'ac-leaking-water',
    title: 'Aire Acondicionado Pierde Agua',
    query: 'aire acondicionado gotea',
    urgency: 'urgent',
    serviceId: 'aire-acondicionado',
    keywords: ['gotea', 'pierde agua', 'fuga agua', 'desagüe obstruido'],
    faqQuestion: '¿Por qué gotea el aire acondicionado?',
    faqAnswer: 'El goteo suele deberse a desagües obstruidos o problemas de instalación. Es importante repararlo pronto para evitar daños por humedad. Servicio técnico especializado disponible.',
  },
]

/**
 * Drainage Problems (Desatascos)
 */
export const drainageProblems: Problem[] = [
  {
    id: 'toilet-clogged',
    title: 'Inodoro Atascado',
    query: 'inodoro atascado',
    urgency: 'emergency',
    serviceId: 'desatascos',
    keywords: ['inodoro', 'wc', 'atasco', 'baño', 'urgente'],
    faqQuestion: '¿Cómo desatascar un inodoro?',
    faqAnswer: 'Para atascos severos se requiere equipo profesional. Intentar desatascar con productos químicos o herramientas inadecuadas puede dañar las tuberías. Servicio de emergencia 24/7.',
  },
  {
    id: 'kitchen-sink-clogged',
    title: 'Fregadero Atascado',
    query: 'fregadero atascado',
    urgency: 'urgent',
    serviceId: 'desatascos',
    keywords: ['fregadero', 'cocina', 'atasco', 'desagüe', 'grasa'],
    faqQuestion: '¿Qué causa los atascos en el fregadero?',
    faqAnswer: 'Los atascos en el fregadero suelen ser por acumulación de grasa, restos de comida y residuos. Nuestro servicio de desatascos utiliza métodos profesionales sin dañar las tuberías.',
  },
]

/**
 * All problems grouped by category
 */
export const problemsByCategory = {
  fontanero: plumbingProblems,
  electricista: electricalProblems,
  'aire-acondicionado': acProblems,
  desatascos: drainageProblems,
}

/**
 * Get all problems
 */
export const allProblems: Problem[] = [
  ...plumbingProblems,
  ...electricalProblems,
  ...acProblems,
  ...drainageProblems,
]

/**
 * Get problems by service
 */
export function getProblemsByService(serviceId: string): Problem[] {
  return allProblems.filter(p => p.serviceId === serviceId)
}

/**
 * Get emergency problems
 */
export function getEmergencyProblems(): Problem[] {
  return allProblems.filter(p => p.urgency === 'emergency')
}

/**
 * Get problems by urgency
 */
export function getProblemsByUrgency(urgency: Problem['urgency']): Problem[] {
  return allProblems.filter(p => p.urgency === urgency)
}
