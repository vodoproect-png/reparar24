/**
 * Centralized Contact Configuration
 * 
 * All phone numbers, WhatsApp links, and contact CTAs
 * are managed here to enable easy updates and future
 * service/city-based routing.
 */

export interface ContactConfig {
  phone: string
  phoneDisplay: string
  whatsapp: string
  email: string
}

export interface BusinessAddress {
  streetAddress: string
  addressLocality: string
  postalCode: string
  addressRegion: string
  addressCountry: string
}

/**
 * Get contact configuration
 * Future: Can route by service/city for call tracking
 */
export function getContactConfig(
  service?: string,
  city?: string
): ContactConfig {
  // Future enhancement: Route different numbers by service/city
  // Example: plumbing in Madrid vs electrical in Barcelona
  
  const basePhone = process.env.NEXT_PUBLIC_PHONE || '+34641688524'
  
  return {
    phone: basePhone,
    phoneDisplay: '641 688 524',
    whatsapp: basePhone.replace('+', ''),
    email: process.env.NEXT_PUBLIC_EMAIL || 'info@reparar24.es',
  }
}

/**
 * Get phone number for service/city
 */
export function getPhoneNumber(service?: string, city?: string): string {
  return getContactConfig(service, city).phone
}

/**
 * Get display-friendly phone number
 */
export function getPhoneDisplay(service?: string, city?: string): string {
  return getContactConfig(service, city).phoneDisplay
}

/**
 * Get phone href for tel: links
 */
export function getPhoneHref(service?: string, city?: string): string {
  return `tel:${getPhoneNumber(service, city)}`
}

/**
 * Get WhatsApp number (without +)
 */
export function getWhatsAppNumber(service?: string, city?: string): string {
  return getContactConfig(service, city).whatsapp
}

/**
 * Get WhatsApp href with optional message
 */
export function getWhatsAppHref(
  message?: string,
  service?: string,
  city?: string
): string {
  const number = getWhatsAppNumber(service, city)
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${encodedMessage}`
}

/**
 * Generate context-aware WhatsApp message
 */
export function getWhatsAppMessage(context: {
  service?: string
  city?: string
  district?: string
  problem?: string
  locale?: string
}): string {
  const { service, city, district, problem, locale = 'es' } = context
  
  const messages: Record<string, string> = {
    es: generateSpanishMessage(service, city, district, problem),
    en: generateEnglishMessage(service, city, district, problem),
    ru: generateRussianMessage(service, city, district, problem),
  }
  
  return messages[locale] || messages.es
}

function generateSpanishMessage(
  service?: string,
  city?: string,
  district?: string,
  problem?: string
): string {
  const parts = ['Hola']
  
  if (problem) {
    parts.push(`tengo un problema: ${problem}`)
  } else if (service) {
    parts.push(`necesito ${service}`)
  } else {
    parts.push('necesito un servicio')
  }
  
  if (district && city) {
    parts.push(`en ${district}, ${city}`)
  } else if (city) {
    parts.push(`en ${city}`)
  }
  
  return parts.join(', ')
}

function generateEnglishMessage(
  service?: string,
  city?: string,
  district?: string,
  problem?: string
): string {
  const parts = ['Hello']
  
  if (problem) {
    parts.push(`I have a problem: ${problem}`)
  } else if (service) {
    parts.push(`I need ${service}`)
  } else {
    parts.push('I need a service')
  }
  
  if (district && city) {
    parts.push(`in ${district}, ${city}`)
  } else if (city) {
    parts.push(`in ${city}`)
  }
  
  return parts.join(', ')
}

function generateRussianMessage(
  service?: string,
  city?: string,
  district?: string,
  problem?: string
): string {
  const parts = ['Здравствуйте']
  
  if (problem) {
    parts.push(`у меня проблема: ${problem}`)
  } else if (service) {
    parts.push(`мне нужен ${service}`)
  } else {
    parts.push('мне нужна услуга')
  }
  
  if (district && city) {
    parts.push(`в ${district}, ${city}`)
  } else if (city) {
    parts.push(`в ${city}`)
  }
  
  return parts.join(', ')
}

/**
 * Get email address
 */
export function getEmail(): string {
  return getContactConfig().email
}

/**
 * Get business address for schema markup and legal info
 */
export function getBusinessAddress(): BusinessAddress {
  return {
    streetAddress: 'Calle Navas de Tolosa, 9',
    addressLocality: 'Torrent',
    postalCode: '46901',
    addressRegion: 'Valencia',
    addressCountry: 'España'
  }
}
