/**
 * Data Validation System
 * 
 * Validates data integrity to prevent:
 * - Duplicate slugs
 * - Invalid postal codes
 * - Missing required fields
 * - Route collisions
 */

import { services } from '../../data/services'
import { cities } from '../../data/cities'
import { serviceSlugMap, type ServiceId } from '../i18n/slugs'
import type { Locale } from '../i18n/config'

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate all data integrity
 */
export function validateAllData(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Run all validators
  const serviceValidation = validateServices()
  const cityValidation = validateCities()
  const districtValidation = validateDistricts()
  const slugValidation = validateSlugs()
  const postalCodeValidation = validatePostalCodes()

  errors.push(...serviceValidation.errors)
  errors.push(...cityValidation.errors)
  errors.push(...districtValidation.errors)
  errors.push(...slugValidation.errors)
  errors.push(...postalCodeValidation.errors)

  warnings.push(...serviceValidation.warnings)
  warnings.push(...cityValidation.warnings)
  warnings.push(...districtValidation.warnings)
  warnings.push(...slugValidation.warnings)
  warnings.push(...postalCodeValidation.warnings)

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validate services data
 */
export function validateServices(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const service of services) {
    // Check required fields
    if (!service.id) {
      errors.push(`Service missing ID: ${JSON.stringify(service)}`)
    }
    if (!service.slug) {
      errors.push(`Service ${service.id || 'unknown'} missing slug`)
    }
    if (!service.name) {
      errors.push(`Service ${service.id} missing name`)
    }

    // Check for duplicates
    if (service.id && seenIds.has(service.id)) {
      errors.push(`Duplicate service ID: ${service.id}`)
    }
    seenIds.add(service.id)

    if (service.slug && seenSlugs.has(service.slug)) {
      errors.push(`Duplicate service slug: ${service.slug}`)
    }
    seenSlugs.add(service.slug)

    // Check if slug exists in slug map
    if (service.slug && !serviceSlugMap[service.slug as ServiceId]) {
      errors.push(`Service slug "${service.slug}" not found in lib/i18n/slugs.ts serviceSlugMap`)
    }

    // Validate arrays
    if (!Array.isArray(service.keywords)) {
      warnings.push(`Service ${service.id} keywords should be an array`)
    }
    if (!Array.isArray(service.benefits)) {
      warnings.push(`Service ${service.id} benefits should be an array`)
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate cities data
 */
export function validateCities(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const city of cities) {
    // Check required fields
    if (!city.id) {
      errors.push(`City missing ID: ${JSON.stringify(city)}`)
    }
    if (!city.slug) {
      errors.push(`City ${city.id || 'unknown'} missing slug`)
    }
    if (!city.name) {
      errors.push(`City ${city.id} missing name`)
    }

    // Check for duplicates
    if (city.id && seenIds.has(city.id)) {
      errors.push(`Duplicate city ID: ${city.id}`)
    }
    seenIds.add(city.id)

    if (city.slug && seenSlugs.has(city.slug)) {
      errors.push(`Duplicate city slug: ${city.slug}`)
    }
    seenSlugs.add(city.slug)

    // Validate population
    if (typeof city.population !== 'number' || city.population <= 0) {
      warnings.push(`City ${city.id} has invalid population: ${city.population}`)
    }

    // Validate districts exist
    if (!Array.isArray(city.districts) || city.districts.length === 0) {
      errors.push(`City ${city.id} has no districts`)
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate districts data
 */
export function validateDistricts(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  for (const city of cities) {
    const seenDistrictIds = new Set<string>()
    const seenDistrictSlugs = new Set<string>()

    for (const district of city.districts || []) {
      // Check required fields
      if (!district.id) {
        errors.push(`District in ${city.name} missing ID`)
      }
      if (!district.slug) {
        errors.push(`District ${district.id || 'unknown'} in ${city.name} missing slug`)
      }
      if (!district.name) {
        errors.push(`District ${district.id} in ${city.name} missing name`)
      }

      // Check for duplicates within city
      if (district.id && seenDistrictIds.has(district.id)) {
        errors.push(`Duplicate district ID in ${city.name}: ${district.id}`)
      }
      seenDistrictIds.add(district.id)

      if (district.slug && seenDistrictSlugs.has(district.slug)) {
        errors.push(`Duplicate district slug in ${city.name}: ${district.slug}`)
      }
      seenDistrictSlugs.add(district.slug)

      // Validate postal codes
      if (!Array.isArray(district.postalCodes) || district.postalCodes.length === 0) {
        warnings.push(`District ${district.name} in ${city.name} has no postal codes`)
      }
    }
  }

  // Check for slug collisions across cities
  const globalDistrictSlugs = new Map<string, string[]>()
  for (const city of cities) {
    for (const district of city.districts || []) {
      if (!globalDistrictSlugs.has(district.slug)) {
        globalDistrictSlugs.set(district.slug, [])
      }
      globalDistrictSlugs.get(district.slug)!.push(city.name)
    }
  }

  for (const [slug, cityNames] of globalDistrictSlugs.entries()) {
    if (cityNames.length > 1) {
      warnings.push(
        `District slug "${slug}" appears in multiple cities: ${cityNames.join(', ')}. ` +
        `This is OK if intentional, but may cause URL confusion.`
      )
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate localized slugs
 */
export function validateSlugs(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const locales: Locale[] = ['es', 'en', 'ru']

  for (const [serviceId, slugMap] of Object.entries(serviceSlugMap)) {
    // Check all locales are present
    for (const locale of locales) {
      if (!slugMap[locale]) {
        errors.push(`Service "${serviceId}" missing ${locale} locale in slug map`)
      }
    }

    // Check for duplicate localized slugs
    const slugValues = Object.values(slugMap)
    const uniqueSlugs = new Set(slugValues)
    if (slugValues.length !== uniqueSlugs.size) {
      warnings.push(
        `Service "${serviceId}" has duplicate localized slugs: ${slugValues.join(', ')}`
      )
    }
  }

  // Check for slug collisions across services
  for (const locale of locales) {
    const seenSlugs = new Map<string, string>()
    
    for (const [serviceId, slugMap] of Object.entries(serviceSlugMap)) {
      const slug = slugMap[locale]
      if (seenSlugs.has(slug)) {
        errors.push(
          `Slug collision in ${locale}: "${slug}" used by both "${serviceId}" and "${seenSlugs.get(slug)}"`
        )
      }
      seenSlugs.set(slug, serviceId)
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate postal codes
 */
export function validatePostalCodes(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Spanish postal codes are 5 digits: NNNNN
  const spanishPostalCodePattern = /^\d{5}$/

  const seenPostalCodes = new Map<string, string[]>()

  for (const city of cities) {
    for (const district of city.districts || []) {
      for (const postalCode of district.postalCodes || []) {
        // Validate format
        if (!spanishPostalCodePattern.test(postalCode)) {
          errors.push(
            `Invalid postal code format "${postalCode}" in ${district.name}, ${city.name}. ` +
            `Spanish postal codes must be 5 digits.`
          )
        }

        // Track duplicates
        if (!seenPostalCodes.has(postalCode)) {
          seenPostalCodes.set(postalCode, [])
        }
        seenPostalCodes.get(postalCode)!.push(`${district.name}, ${city.name}`)
      }
    }
  }

  // Check for postal code reuse (warning, not error - some codes may span districts)
  for (const [postalCode, locations] of seenPostalCodes.entries()) {
    if (locations.length > 1) {
      warnings.push(
        `Postal code ${postalCode} appears in multiple locations: ${locations.join(' / ')}`
      )
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Check for potential route collisions
 */
export function validateRoutes(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  const routes = new Set<string>()
  const locales: Locale[] = ['es', 'en', 'ru']

  for (const locale of locales) {
    // Check service routes
    for (const service of services) {
      const slugMap = serviceSlugMap[service.slug as ServiceId]
      if (slugMap) {
        const localizedSlug = slugMap[locale]
        const route = `/${locale}/${localizedSlug}`
        
        if (routes.has(route)) {
          errors.push(`Route collision: ${route}`)
        }
        routes.add(route)
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}
