/**
 * OG Image Mapper for Reparar24
 * 
 * Maps services to appropriate OG images
 * Falls back to default if service-specific image not available
 */

import { PRODUCTION_URL } from '@/lib/config/environment'

/**
 * Service ID to OG image mapping
 */
const SERVICE_OG_IMAGES: Record<string, string> = {
  fontanero: '/images/og/fontanero-og.png',
  electricista: '/og-electricista.jpg',
  desatascos: '/og-desatascos.jpg',
  'aire-acondicionado': '/og-clima.jpg',
  calefaccion: '/og-clima.jpg',
  'limpieza-tuberias': '/og-limpieza.jpg',
}

/**
 * Default OG image (fallback)
 */
const DEFAULT_OG_IMAGE = '/og-default.jpg'

/**
 * Get OG image for a service
 * 
 * @param serviceId - Service identifier
 * @returns Absolute URL to OG image
 */
export function getServiceOGImage(serviceId?: string): string {
  // If no service ID, use default
  if (!serviceId) {
    return `${PRODUCTION_URL}${DEFAULT_OG_IMAGE}`
  }

  // Get service-specific image or fall back to default
  const imagePath = SERVICE_OG_IMAGES[serviceId] || DEFAULT_OG_IMAGE

  // Return absolute URL (required for OG tags)
  return `${PRODUCTION_URL}${imagePath}`
}

/**
 * Get default OG image (for homepage, legal pages, etc.)
 */
export function getDefaultOGImage(): string {
  return `${PRODUCTION_URL}${DEFAULT_OG_IMAGE}`
}

/**
 * Get OG image dimensions
 */
export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const
