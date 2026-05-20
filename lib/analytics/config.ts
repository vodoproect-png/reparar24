/**
 * Analytics Configuration
 * 
 * Centralized configuration for Google Tag Manager, Google Analytics 4,
 * and conversion tracking events.
 */

export const analyticsConfig = {
  // Google Tag Manager ID
  // Replace with actual GTM ID from Google Tag Manager account
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
  
  // Google Analytics 4 Measurement ID
  // Replace with actual GA4 ID from Google Analytics account
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX',
  
  // Enable/disable analytics in development
  enableInDevelopment: process.env.NODE_ENV === 'production',
  
  // Enable debug mode (logs events to console)
  debug: process.env.NODE_ENV === 'development',
}

/**
 * Check if analytics should be enabled
 */
export function isAnalyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false
  if (process.env.NODE_ENV === 'production') return true
  return analyticsConfig.enableInDevelopment
}

/**
 * Standard event names for conversion tracking
 * Following Google Analytics 4 naming conventions (snake_case)
 */
export const ANALYTICS_EVENTS = {
  // Contact events
  PHONE_CLICK: 'phone_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  EMAIL_CLICK: 'email_click',
  
  // CTA events
  HERO_CTA_CLICK: 'hero_cta_click',
  SERVICE_CTA_CLICK: 'service_cta_click',
  MOBILE_STICKY_CTA_CLICK: 'mobile_sticky_cta_click',
  CONTACT_CTA_CLICK: 'contact_cta_click',
  FOOTER_CTA_CLICK: 'footer_cta_click',
  
  // Form events
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // Engagement events
  FAQ_EXPAND: 'faq_expand',
  SERVICE_VIEW: 'service_view',
  CITY_VIEW: 'city_view',
  
  // Conversion events
  IBAN_COPY: 'iban_copy',
  MAP_CLICK: 'map_click',
  
  // Navigation events
  MOBILE_MENU_OPEN: 'mobile_menu_open',
  MOBILE_MENU_CLOSE: 'mobile_menu_close',
  LANGUAGE_CHANGE: 'language_change',
} as const

export type AnalyticsEvent = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]
