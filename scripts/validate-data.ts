#!/usr/bin/env ts-node
/**
 * Data Validation Script
 * 
 * Run: npm run validate:data
 * 
 * Self-contained validation using CommonJS for ts-node compatibility
 * All dependencies are imported directly to avoid ESM/path alias issues
 */

// Use CommonJS require with no file extensions
const { services } = require('../data/services')
const { cities } = require('../data/cities')

// Inline serviceSlugMap to avoid import issues
const serviceSlugMap = {
  fontanero: { es: 'fontanero', en: 'plumber', ru: 'santekhnik' },
  electricista: { es: 'electricista', en: 'electrician', ru: 'elektrik' },
  desatascos: { es: 'desatascos', en: 'drain-cleaning', ru: 'prochistka-trub' },
  'aire-acondicionado': { es: 'aire-acondicionado', en: 'air-conditioning', ru: 'konditsionirovanie' },
  cerrajero: { es: 'cerrajero', en: 'locksmith', ru: 'zamochnik' },
  pintor: { es: 'pintor', en: 'painter', ru: 'malyar' },
  calefaccion: { es: 'calefaccion', en: 'heating', ru: 'otoplenie' },
  'limpieza-tuberias': { es: 'limpieza-tuberias', en: 'pipe-cleaning', ru: 'ochistka-trub' },
} as const

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

function validateServices(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const service of services) {
    if (!service.id) {
      errors.push(`Service missing ID: ${JSON.stringify(service)}`)
    }
    if (!service.slug) {
      errors.push(`Service ${service.id || 'unknown'} missing slug`)
    }
    if (!service.name) {
      errors.push(`Service ${service.id} missing name`)
    }

    if (service.id && seenIds.has(service.id)) {
      errors.push(`Duplicate service ID: ${service.id}`)
    }
    seenIds.add(service.id)

    if (service.slug && seenSlugs.has(service.slug)) {
      errors.push(`Duplicate service slug: ${service.slug}`)
    }
    seenSlugs.add(service.slug)

    if (service.slug && !serviceSlugMap[service.slug as keyof typeof serviceSlugMap]) {
      errors.push(`Service slug "${service.slug}" not found in lib/i18n/slugs.ts serviceSlugMap`)
    }

    if (!Array.isArray(service.keywords)) {
      warnings.push(`Service ${service.id} keywords should be an array`)
    }
    if (!Array.isArray(service.benefits)) {
      warnings.push(`Service ${service.id} benefits should be an array`)
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

function validateCities(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const seenIds = new Set<string>()
  const seenSlugs = new Set<string>()

  for (const city of cities) {
    if (!city.id) {
      errors.push(`City missing ID: ${JSON.stringify(city)}`)
    }
    if (!city.slug) {
      errors.push(`City ${city.id || 'unknown'} missing slug`)
    }
    if (!city.name) {
      errors.push(`City ${city.id} missing name`)
    }

    if (city.id && seenIds.has(city.id)) {
      errors.push(`Duplicate city ID: ${city.id}`)
    }
    seenIds.add(city.id)

    if (city.slug && seenSlugs.has(city.slug)) {
      errors.push(`Duplicate city slug: ${city.slug}`)
    }
    seenSlugs.add(city.slug)

    if (typeof city.population !== 'number' || city.population <= 0) {
      warnings.push(`City ${city.id} has invalid population: ${city.population}`)
    }

    if (!Array.isArray(city.districts) || city.districts.length === 0) {
      errors.push(`City ${city.id} has no districts`)
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

function validateDistricts(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  for (const city of cities) {
    const seenDistrictIds = new Set<string>()
    const seenDistrictSlugs = new Set<string>()

    for (const district of city.districts || []) {
      if (!district.id) {
        errors.push(`District in ${city.name} missing ID`)
      }
      if (!district.slug) {
        errors.push(`District ${district.id || 'unknown'} in ${city.name} missing slug`)
      }
      if (!district.name) {
        errors.push(`District ${district.id} in ${city.name} missing name`)
      }

      if (district.id && seenDistrictIds.has(district.id)) {
        errors.push(`Duplicate district ID in ${city.name}: ${district.id}`)
      }
      seenDistrictIds.add(district.id)

      if (district.slug && seenDistrictSlugs.has(district.slug)) {
        errors.push(`Duplicate district slug in ${city.name}: ${district.slug}`)
      }
      seenDistrictSlugs.add(district.slug)

      if (!Array.isArray(district.postalCodes) || district.postalCodes.length === 0) {
        warnings.push(`District ${district.name} in ${city.name} has no postal codes`)
      }
    }
  }

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

function validatePostalCodes(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const spanishPostalCodePattern = /^\d{5}$/
  const seenPostalCodes = new Map<string, string[]>()

  for (const city of cities) {
    for (const district of city.districts || []) {
      for (const postalCode of district.postalCodes || []) {
        if (!spanishPostalCodePattern.test(postalCode)) {
          errors.push(
            `Invalid postal code format "${postalCode}" in ${district.name}, ${city.name}. ` +
            `Spanish postal codes must be 5 digits.`
          )
        }

        if (!seenPostalCodes.has(postalCode)) {
          seenPostalCodes.set(postalCode, [])
        }
        seenPostalCodes.get(postalCode)!.push(`${district.name}, ${city.name}`)
      }
    }
  }

  for (const [postalCode, locations] of seenPostalCodes.entries()) {
    if (locations.length > 1) {
      warnings.push(
        `Postal code ${postalCode} appears in multiple locations: ${locations.join(' / ')}`
      )
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

function validateSlugs(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const locales = ['es', 'en', 'ru']

  for (const [serviceId, slugMap] of Object.entries(serviceSlugMap)) {
    for (const locale of locales) {
      if (!(slugMap as any)[locale]) {
        errors.push(`Service "${serviceId}" missing ${locale} locale in slug map`)
      }
    }

    const slugValues = Object.values(slugMap as any)
    const uniqueSlugs = new Set(slugValues)
    if (slugValues.length !== uniqueSlugs.size) {
      warnings.push(
        `Service "${serviceId}" has duplicate localized slugs: ${slugValues.join(', ')}`
      )
    }
  }

  for (const locale of locales) {
    const seenSlugs = new Map<string, string>()
    
    for (const [serviceId, slugMap] of Object.entries(serviceSlugMap)) {
      const slug = (slugMap as any)[locale]
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

function main() {
  console.log('🔍 Validating data integrity...\n')

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

  // Display errors
  if (errors.length > 0) {
    console.error('❌ ERRORS FOUND:\n')
    errors.forEach((error: string, index: number) => {
      console.error(`  ${index + 1}. ${error}`)
    })
    console.error('')
  }

  // Display warnings
  if (warnings.length > 0) {
    console.warn('⚠️  WARNINGS:\n')
    warnings.forEach((warning: string, index: number) => {
      console.warn(`  ${index + 1}. ${warning}`)
    })
    console.warn('')
  }

  // Summary
  const valid = errors.length === 0
  if (valid) {
    console.log('✅ All data validation passed!')
    console.log(`   ${warnings.length} warnings (non-blocking)\n`)
    process.exit(0)
  } else {
    console.error(`❌ Data validation FAILED!`)
    console.error(`   ${errors.length} errors`)
    console.error(`   ${warnings.length} warnings\n`)
    console.error('Fix errors before building or deploying.\n')
    process.exit(1)
  }
}

main()
