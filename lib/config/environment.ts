/**
 * ENVIRONMENT DETECTION UTILITY
 * 
 * Detects production vs preview/staging environments to control SEO indexability.
 * 
 * Production: reparar24.es - FULLY INDEXABLE
 * Preview/Staging: *.vercel.app - BLOCKED FROM INDEXING
 */

/**
 * Production domain (canonical, indexable)
 */
export const PRODUCTION_DOMAIN = 'reparar24.es'

/**
 * Production URL (canonical base)
 */
export const PRODUCTION_URL = 'https://reparar24.es'

/**
 * Detects if current environment is production
 * 
 * Returns true ONLY for reparar24.es
 * Returns false for:
 * - *.vercel.app (Vercel preview deployments)
 * - localhost
 * - Any other domain
 */
export function isProduction(): boolean {
  // In build time or without headers, check environment variables
  const vercelEnv = process.env.VERCEL_ENV
  const vercelUrl = process.env.VERCEL_URL
  
  // If VERCEL_ENV is explicitly set to 'production', we're in production
  if (vercelEnv === 'production') {
    return true
  }
  
  // If VERCEL_ENV is 'preview' or 'development', we're NOT in production
  if (vercelEnv === 'preview' || vercelEnv === 'development') {
    return false
  }
  
  // Fallback: Check if VERCEL_URL matches production domain
  if (vercelUrl) {
    return vercelUrl === PRODUCTION_DOMAIN || vercelUrl.startsWith(PRODUCTION_DOMAIN)
  }
  
  // Default to false (safer to block indexing than accidentally index preview)
  return false
}

/**
 * Detects if a given hostname is production
 * 
 * @param hostname - The hostname to check (e.g., from request.headers)
 * @returns true if hostname is production domain
 */
export function isProductionHostname(hostname: string | null): boolean {
  if (!hostname) return false
  
  // Remove port if present
  const cleanHostname = hostname.split(':')[0]
  
  // Check if it's the production domain
  return cleanHostname === PRODUCTION_DOMAIN
}

/**
 * Detects if current environment is a Vercel preview deployment
 * 
 * @param hostname - Optional hostname to check
 * @returns true if this is a Vercel preview deployment
 */
export function isVercelPreview(hostname?: string | null): boolean {
  // Check VERCEL_ENV environment variable
  if (process.env.VERCEL_ENV === 'preview') {
    return true
  }
  
  // Check hostname if provided
  if (hostname) {
    const cleanHostname = hostname.split(':')[0]
    return cleanHostname.endsWith('.vercel.app')
  }
  
  // Check VERCEL_URL
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl && vercelUrl.endsWith('.vercel.app')) {
    return true
  }
  
  return false
}

/**
 * Gets the canonical base URL for metadata
 * Always returns production URL regardless of environment
 */
export function getCanonicalBaseUrl(): string {
  return PRODUCTION_URL
}

/**
 * Should this environment be indexed by search engines?
 * 
 * @param hostname - Optional hostname to check
 * @returns true if indexable (production only)
 */
export function shouldIndex(hostname?: string | null): boolean {
  if (hostname) {
    return isProductionHostname(hostname)
  }
  return isProduction()
}
