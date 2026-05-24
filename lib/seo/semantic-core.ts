/**
 * Semantic Core Integration System
 * 
 * This module provides intelligent semantic keyword organization and clustering.
 * Designed for future semantic core data ingestion and programmatic SEO scaling.
 * 
 * SAFETY FIRST: All systems include quality controls to prevent thin content.
 */

export type SearchIntent =
  | 'commercial'      // "fontanero precio"
  | 'emergency'       // "fontanero urgente 24h"
  | 'informational'   // "como desatascar tuberia"
  | 'navigational'    // "fontanero madrid"
  | 'comparison'      // "fontanero vs plomero"
  | 'problem'         // "fuga de agua"

export type KeywordDifficulty = 'low' | 'medium' | 'high'

/**
 * Semantic Keyword Structure
 */
export interface SemanticKeyword {
  id: string
  keyword: string                 // Primary keyword
  variations: string[]            // Keyword variations
  searchVolume?: number           // Monthly search volume
  difficulty?: KeywordDifficulty  // SEO difficulty
  intent: SearchIntent            // User intent
  serviceId: string               // Related service
  cityId?: string                 // Related city (if local)
  districtId?: string             // Related district (if hyper-local)
  urgency: 'emergency' | 'urgent' | 'normal'
  locale: 'es' | 'en' | 'ru'      // Language
  relatedKeywords?: string[]      // Semantic relationships
  faqQuestions?: string[]         // Related FAQ questions
}

/**
 * Semantic Cluster
 * Groups related keywords by topic/intent
 */
export interface SemanticCluster {
  id: string
  name: string                    // Cluster name
  description: string             // Cluster description
  primaryKeywords: string[]       // Main keywords
  secondaryKeywords: string[]     // Supporting keywords
  intent: SearchIntent            // Dominant intent
  serviceIds: string[]            // Related services
  priority: 'high' | 'medium' | 'low'
  pageUrl?: string                // Target page (if exists)
}

/**
 * SILO Structure
 * Hierarchical topical organization
 */
export interface SEOSilo {
  id: string
  name: string                    // SILO name
  level: 1 | 2 | 3 | 4            // Hierarchy level
  parentId?: string               // Parent SILO
  childrenIds: string[]           // Child SILOs
  keywords: string[]              // Target keywords
  pageUrl: string                 // Landing page
  internalLinks: string[]         // Links within SILO
}

/**
 * Intent Mapper
 * Maps search queries to user intent and appropriate content
 */
export class IntentMapper {
  /**
   * Detect search intent from query
   */
  static detectIntent(query: string): SearchIntent {
    const normalizedQuery = query.toLowerCase().trim()

    // Emergency intent signals
    const emergencySignals = [
      'urgente', 'emergencia', '24h', '24 horas', 'inmediato',
      'rapido', 'ya', 'ahora', 'nocturno', 'fin de semana'
    ]
    
    if (emergencySignals.some(signal => normalizedQuery.includes(signal))) {
      return 'emergency'
    }

    // Problem intent signals
    const problemSignals = [
      'fuga', 'roto', 'atascado', 'gotea', 'no funciona',
      'averia', 'reparar', 'arreglar', 'problema'
    ]
    
    if (problemSignals.some(signal => normalizedQuery.includes(signal))) {
      return 'problem'
    }

    // Commercial intent signals
    const commercialSignals = [
      'precio', 'coste', 'cuanto cuesta', 'presupuesto',
      'barato', 'economico', 'tarifa', 'contratar'
    ]
    
    if (commercialSignals.some(signal => normalizedQuery.includes(signal))) {
      return 'commercial'
    }

    // Informational intent signals
    const informationalSignals = [
      'como', 'que es', 'por que', 'cuando', 'donde',
      'tutorial', 'guia', 'consejos', 'tips'
    ]
    
    if (informationalSignals.some(signal => normalizedQuery.includes(signal))) {
      return 'informational'
    }

    // Comparison intent signals
    const comparisonSignals = [
      'vs', 'versus', 'mejor', 'comparar', 'diferencia',
      'cual', 'opiniones', 'reviews'
    ]
    
    if (comparisonSignals.some(signal => normalizedQuery.includes(signal))) {
      return 'comparison'
    }

    // Default: navigational
    return 'navigational'
  }

  /**
   * Suggest content type based on intent
   */
  static suggestContentType(intent: SearchIntent): string {
    const contentMap: Record<SearchIntent, string> = {
      emergency: 'emergency-landing-page',
      problem: 'problem-solution-page',
      commercial: 'service-pricing-page',
      informational: 'how-to-guide',
      comparison: 'comparison-page',
      navigational: 'service-page',
    }

    return contentMap[intent]
  }

  /**
   * Get recommended CTAs by intent
   */
  static getRecommendedCTAs(intent: SearchIntent): string[] {
    const ctaMap: Record<SearchIntent, string[]> = {
      emergency: ['Llamar Urgente', 'WhatsApp Inmediato'],
      problem: ['Llamar Ahora', 'Solicitar Presupuesto'],
      commercial: ['Ver Precios', 'Pedir Presupuesto'],
      informational: ['Contactar Experto', 'Ver Servicios'],
      comparison: ['Comparar Servicios', 'Hablar con Asesor'],
      navigational: ['Ver Servicio', 'Llamar Ahora'],
    }

    return ctaMap[intent]
  }
}

/**
 * Semantic Clustering Engine
 * Groups keywords into topical clusters
 */
export class SemanticClusteringEngine {
  /**
   * Group keywords by service and intent
   */
  static clusterByServiceIntent(
    keywords: SemanticKeyword[]
  ): Map<string, SemanticKeyword[]> {
    const clusters = new Map<string, SemanticKeyword[]>()

    for (const keyword of keywords) {
      const clusterKey = `${keyword.serviceId}-${keyword.intent}`
      
      if (!clusters.has(clusterKey)) {
        clusters.set(clusterKey, [])
      }
      
      clusters.get(clusterKey)!.push(keyword)
    }

    return clusters
  }

  /**
   * Group keywords by location hierarchy
   */
  static clusterByLocation(
    keywords: SemanticKeyword[]
  ): Map<string, SemanticKeyword[]> {
    const clusters = new Map<string, SemanticKeyword[]>()

    for (const keyword of keywords) {
      // City-level cluster
      if (keyword.cityId) {
        const key = `city-${keyword.cityId}`
        if (!clusters.has(key)) clusters.set(key, [])
        clusters.get(key)!.push(keyword)
      }

      // District-level cluster
      if (keyword.districtId) {
        const key = `district-${keyword.districtId}`
        if (!clusters.has(key)) clusters.set(key, [])
        clusters.get(key)!.push(keyword)
      }
    }

    return clusters
  }

  /**
   * Identify keyword cannibalization risks
   */
  static detectCannibalization(
    keywords: SemanticKeyword[]
  ): Array<{ keywords: SemanticKeyword[]; reason: string }> {
    const risks: Array<{ keywords: SemanticKeyword[]; reason: string }> = []
    
    // Group by similar keywords
    const similarGroups = new Map<string, SemanticKeyword[]>()
    
    for (const keyword of keywords) {
      const baseKeyword = this.normalizeKeyword(keyword.keyword)
      
      if (!similarGroups.has(baseKeyword)) {
        similarGroups.set(baseKeyword, [])
      }
      
      similarGroups.get(baseKeyword)!.push(keyword)
    }

    // Check for same intent + same service + same location
    for (const [base, group] of similarGroups) {
      if (group.length > 1) {
        const sameIntent = group.filter(k => k.intent === group[0].intent)
        if (sameIntent.length > 1) {
          risks.push({
            keywords: sameIntent,
            reason: `Multiple pages targeting similar keyword "${base}" with same intent`,
          })
        }
      }
    }

    return risks
  }

  /**
   * Normalize keyword for comparison
   */
  private static normalizeKeyword(keyword: string): string {
    return keyword
      .toLowerCase()
      .replace(/[áàä]/g, 'a')
      .replace(/[éèë]/g, 'e')
      .replace(/[íìï]/g, 'i')
      .replace(/[óòö]/g, 'o')
      .replace(/[úùü]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
  }
}

/**
 * SILO Builder
 * Constructs hierarchical SEO SILO architecture
 */
export class SiloBuilder {
  /**
   * Build service-based SILO hierarchy
   * 
   * Example:
   * Level 1: Fontanería (service)
   * Level 2: Fontanero Madrid (service + city)
   * Level 3: Fontanero Madrid Salamanca (service + city + district)
   * Level 4: Fontanero Madrid Salamanca Fuga Agua (problem-specific)
   */
  static buildServiceSilo(
    serviceId: string,
    serviceName: string,
    cities: string[],
    districts: Record<string, string[]>
  ): SEOSilo[] {
    const silos: SEOSilo[] = []

    // Level 1: Service root
    const rootSilo: SEOSilo = {
      id: `silo-${serviceId}`,
      name: serviceName,
      level: 1,
      childrenIds: [],
      keywords: [serviceId, serviceName],
      pageUrl: `/${serviceId}`,
      internalLinks: [],
    }

    // Level 2: Service + City
    for (const city of cities) {
      const citySilo: SEOSilo = {
        id: `silo-${serviceId}-${city}`,
        name: `${serviceName} en ${city}`,
        level: 2,
        parentId: rootSilo.id,
        childrenIds: [],
        keywords: [`${serviceId} ${city}`, `${serviceName} ${city}`],
        pageUrl: `/${serviceId}/${city}`,
        internalLinks: [rootSilo.pageUrl],
      }

      rootSilo.childrenIds.push(citySilo.id)
      silos.push(citySilo)

      // Level 3: Service + City + District
      if (districts[city]) {
        for (const district of districts[city]) {
          const districtSilo: SEOSilo = {
            id: `silo-${serviceId}-${city}-${district}`,
            name: `${serviceName} en ${city} ${district}`,
            level: 3,
            parentId: citySilo.id,
            childrenIds: [],
            keywords: [`${serviceId} ${city} ${district}`],
            pageUrl: `/${serviceId}/${city}/${district}`,
            internalLinks: [rootSilo.pageUrl, citySilo.pageUrl],
          }

          citySilo.childrenIds.push(districtSilo.id)
          silos.push(districtSilo)
        }
      }
    }

    silos.unshift(rootSilo)
    return silos
  }

  /**
   * Get breadcrumb trail fromSILO hierarchy
   */
  static getSiloBreadcrumb(silo: SEOSilo, allSilos: SEOSilo[]): string[] {
    const trail: string[] = [silo.pageUrl]
    
    let current = silo
    while (current.parentId) {
      const parent = allSilos.find(s => s.id === current.parentId)
      if (!parent) break
      
      trail.unshift(parent.pageUrl)
      current = parent
    }

    return trail
  }
}

/**
 * Semantic Internal Linking Engine
 * Generates contextual internal links based on semantic relationships
 */
export class SemanticLinkingEngine {
  /**
   * Find related keywords for internal linking
   */
  static findRelatedKeywords(
    keyword: SemanticKeyword,
    allKeywords: SemanticKeyword[],
    maxResults: number = 5
  ): SemanticKeyword[] {
    const related: SemanticKeyword[] = []

    // Same service, different intent
    const sameService = allKeywords.filter(
      k => k.serviceId === keyword.serviceId &&
           k.intent !== keyword.intent &&
           k.id !== keyword.id
    )
    related.push(...sameService.slice(0, 2))

    // Same intent, different service
    const sameIntent = allKeywords.filter(
      k => k.intent === keyword.intent &&
           k.serviceId !== keyword.serviceId &&
           k.id !== keyword.id
    )
    related.push(...sameIntent.slice(0, 2))

    // Same location, different service
    if (keyword.cityId) {
      const sameCity = allKeywords.filter(
        k => k.cityId === keyword.cityId &&
             k.serviceId !== keyword.serviceId &&
             k.id !== keyword.id
      )
      related.push(...sameCity.slice(0, 1))
    }

    return related.slice(0, maxResults)
  }

  /**
   * Generate contextual anchor text
   */
  static generateAnchorText(keyword: SemanticKeyword): string[] {
    const anchors: string[] = [keyword.keyword]

    // Add variations
    if (keyword.variations) {
      anchors.push(...keyword.variations.slice(0, 2))
    }

    // Add intent-based variations
    if (keyword.intent === 'emergency') {
      anchors.push(`${keyword.keyword} urgente`)
      anchors.push(`${keyword.keyword} 24h`)
    }

    return anchors
  }
}

/**
 * Example: Ready-to-use semantic keyword data structure
 * (Will be replaced with actual semantic core data)
 */
export const exampleSemanticKeywords: SemanticKeyword[] = [
  {
    id: 'kw-fontanero-urgente-madrid',
    keyword: 'fontanero urgente madrid',
    variations: ['fontanero emergencia madrid', 'fontanero 24h madrid'],
    intent: 'emergency',
    serviceId: 'fontanero',
    cityId: 'madrid',
    urgency: 'emergency',
    locale: 'es',
    relatedKeywords: ['fuga agua madrid', 'tuberia rota madrid'],
    faqQuestions: ['¿Cuánto tarda un fontanero urgente?', '¿Fontanero 24 horas Madrid?'],
  },
  {
    id: 'kw-electricista-precio',
    keyword: 'electricista precio',
    variations: ['cuanto cuesta electricista', 'tarifa electricista'],
    intent: 'commercial',
    serviceId: 'electricista',
    urgency: 'normal',
    locale: 'es',
    relatedKeywords: ['electricista certificado', 'presupuesto electricidad'],
    faqQuestions: ['¿Cuánto cobra un electricista?', '¿Precio hora electricista?'],
  },
]
