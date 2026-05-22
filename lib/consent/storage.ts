/**
 * Cookie Consent Storage Utility
 * 
 * Manages user consent preferences for GDPR/LSSI compliance
 * Uses localStorage for persistence (client-side only)
 */

export type ConsentPreferences = {
  analytics: boolean
  timestamp: number
}

const CONSENT_KEY = 'reparar24_cookie_consent'
const CONSENT_VERSION = '1.0'

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Get stored consent preferences
 */
export function getConsent(): ConsentPreferences | null {
  if (!isBrowser()) return null

  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null

    const data = JSON.parse(stored)
    
    // Validate structure
    if (typeof data.analytics !== 'boolean' || typeof data.timestamp !== 'number') {
      return null
    }

    return data as ConsentPreferences
  } catch (error) {
    console.error('Error reading consent:', error)
    return null
  }
}

/**
 * Save consent preferences
 */
export function saveConsent(analytics: boolean): void {
  if (!isBrowser()) return

  try {
    const preferences: ConsentPreferences = {
      analytics,
      timestamp: Date.now(),
    }

    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences))
    
    // Dispatch custom event for components to react
    window.dispatchEvent(new CustomEvent('consentChanged', { 
      detail: preferences 
    }))
  } catch (error) {
    console.error('Error saving consent:', error)
  }
}

/**
 * Check if user has analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsent()
  return consent?.analytics === true
}

/**
 * Check if user has made a consent choice
 */
export function hasConsentChoice(): boolean {
  return getConsent() !== null
}

/**
 * Clear all consent data (for testing/reset)
 */
export function clearConsent(): void {
  if (!isBrowser()) return

  try {
    localStorage.removeItem(CONSENT_KEY)
    window.dispatchEvent(new CustomEvent('consentChanged', { detail: null }))
  } catch (error) {
    console.error('Error clearing consent:', error)
  }
}

/**
 * Get consent version for future migrations
 */
export function getConsentVersion(): string {
  return CONSENT_VERSION
}
