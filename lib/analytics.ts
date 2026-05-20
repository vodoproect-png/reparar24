/**
 * Analytics & Conversion Tracking Utilities
 * 
 * Production-safe GA4 event tracking for Reparar24
 * Compatible with Next.js App Router, SSR, and multilingual architecture
 */

import type { Locale } from '@/lib/i18n/config'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Device type detection
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Contact click location
 */
export type ClickLocation = 
  | 'header' 
  | 'footer' 
  | 'mobile_menu'
  | 'mobile_sticky'
  | 'contact_page'
  | 'service_page'
  | 'hero'

/**
 * Form types
 */
export type FormType = 'contact' | 'quote' | 'callback'

/**
 * WhatsApp click event parameters
 */
interface WhatsAppClickParams {
  service?: string
  page: string
  locale: Locale
  city?: string
  device_type: DeviceType
  click_location: ClickLocation
}

/**
 * Phone click event parameters
 */
interface PhoneClickParams {
  service?: string
  page: string
  locale: Locale
  city?: string
  device_type: DeviceType
  click_location: ClickLocation
}

/**
 * Form submit event parameters
 */
interface FormSubmitParams {
  form_type: FormType
  service?: string
  locale: Locale
  city?: string
}

/**
 * Service page view parameters
 */
interface ServicePageViewParams {
  service: string
  city?: string
  locale: Locale
}

/**
 * Generic event parameters
 */
interface GenericEventParams {
  [key: string]: string | number | boolean | undefined
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Check if gtag is available
 */
function isGtagAvailable(): boolean {
  return isBrowser() && typeof window.gtag === 'function'
}

/**
 * Detect device type based on viewport width
 */
export function getDeviceType(): DeviceType {
  if (!isBrowser()) return 'desktop'
  
  const width = window.innerWidth
  
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Get current page path
 */
function getCurrentPage(): string {
  if (!isBrowser()) return '/'
  return window.location.pathname
}

// ============================================================================
// CORE TRACKING FUNCTIONS
// ============================================================================

/**
 * Generic event tracking
 * 
 * @param eventName - GA4 event name
 * @param params - Event parameters
 */
export function trackEvent(
  eventName: string,
  params?: GenericEventParams
): void {
  if (!isGtagAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics Debug]', eventName, params)
    }
    return
  }

  try {
    window.gtag('event', eventName, params)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, params)
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics Error]', error)
    }
  }
}

/**
 * Track WhatsApp click conversion
 * 
 * @param params - WhatsApp click parameters
 */
export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: 'WhatsApp Contact',
    ...params,
  })
}

/**
 * Track phone click conversion
 * 
 * @param params - Phone click parameters
 */
export function trackPhoneClick(params: PhoneClickParams): void {
  trackEvent('phone_click', {
    event_category: 'conversion',
    event_label: 'Phone Contact',
    ...params,
  })
}

/**
 * Track form submission conversion
 * 
 * @param params - Form submit parameters
 */
export function trackFormSubmit(params: FormSubmitParams): void {
  trackEvent('form_submit', {
    event_category: 'conversion',
    event_label: `Form: ${params.form_type}`,
    ...params,
  })
}

/**
 * Track service page view for engagement analysis
 * 
 * @param params - Service page view parameters
 */
export function trackServicePageView(params: ServicePageViewParams): void {
  trackEvent('service_page_view', {
    event_category: 'engagement',
    event_label: `Service: ${params.service}`,
    ...params,
  })
}

// ============================================================================
// CONVENIENCE WRAPPERS
// ============================================================================

/**
 * Track WhatsApp click from header
 */
export function trackWhatsAppClickHeader(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackWhatsAppClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'header',
  })
}

/**
 * Track WhatsApp click from footer
 */
export function trackWhatsAppClickFooter(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackWhatsAppClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'footer',
  })
}

/**
 * Track WhatsApp click from mobile sticky CTA
 */
export function trackWhatsAppClickMobileSticky(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackWhatsAppClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'mobile_sticky',
  })
}

/**
 * Track phone click from header
 */
export function trackPhoneClickHeader(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackPhoneClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'header',
  })
}

/**
 * Track phone click from footer
 */
export function trackPhoneClickFooter(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackPhoneClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'footer',
  })
}

/**
 * Track phone click from mobile menu
 */
export function trackPhoneClickMobileMenu(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackPhoneClick({
    service,
    page: getCurrentPage(),
    locale,
    city,
    device_type: getDeviceType(),
    click_location: 'mobile_menu',
  })
}

/**
 * Track phone click from contact page
 */
export function trackPhoneClickContactPage(
  locale: Locale
): void {
  trackPhoneClick({
    page: getCurrentPage(),
    locale,
    device_type: getDeviceType(),
    click_location: 'contact_page',
  })
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackFormSubmit({
    form_type: 'contact',
    service,
    locale,
    city,
  })
}

/**
 * Track quote form submission
 */
export function trackQuoteFormSubmit(
  locale: Locale,
  service?: string,
  city?: string
): void {
  trackFormSubmit({
    form_type: 'quote',
    service,
    locale,
    city,
  })
}

// ============================================================================
// PAGE VIEW TRACKING
// ============================================================================

/**
 * Track service page view (call on service page load)
 */
export function trackServicePage(
  service: string,
  locale: Locale,
  city?: string
): void {
  trackServicePageView({
    service,
    city,
    locale,
  })
}

// ============================================================================
// GLOBAL TYPE AUGMENTATION
// ============================================================================

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string | object,
      config?: object
    ) => void
  }
}
