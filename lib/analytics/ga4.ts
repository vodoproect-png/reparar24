/**
 * Google Analytics 4 Integration
 * 
 * Provides GA4 event tracking functionality.
 */

import { analyticsConfig, isAnalyticsEnabled, type AnalyticsEvent } from './config'
import { pushToDataLayer } from './gtm'

/**
 * Get GA4 script for <head>
 */
export function getGA4Script(): string {
  if (!isAnalyticsEnabled()) return ''
  
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${analyticsConfig.ga4Id}');
  `
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled()) {
    if (analyticsConfig.debug) {
      console.log('[GA4 Debug] Page View:', { url, title })
    }
    return
  }
  
  pushToDataLayer({
    event: 'page_view',
    page_location: url,
    page_title: title || document.title,
  })
}

/**
 * Track conversion event
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  eventParams?: Record<string, any>
): void {
  if (!isAnalyticsEnabled()) {
    if (analyticsConfig.debug) {
      console.log('[GA4 Debug] Event:', eventName, eventParams)
    }
    return
  }
  
  pushToDataLayer({
    event: eventName,
    ...eventParams,
  })
}

/**
 * Track phone click conversion
 */
export function trackPhoneClick(phoneNumber: string, location: string): void {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    click_location: location, // 'header', 'footer', 'contact_page', etc.
    event_category: 'conversion',
    event_label: `Phone: ${phoneNumber}`,
  })
}

/**
 * Track WhatsApp click conversion
 */
export function trackWhatsAppClick(phoneNumber: string, location: string): void {
  trackEvent('whatsapp_click', {
    phone_number: phoneNumber,
    click_location: location,
    event_category: 'conversion',
    event_label: `WhatsApp: ${phoneNumber}`,
  })
}

/**
 * Track email click conversion
 */
export function trackEmailClick(email: string, location: string): void {
  trackEvent('email_click', {
    email_address: email,
    click_location: location,
    event_category: 'conversion',
    event_label: `Email: ${email}`,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaType: string, location: string, label?: string): void {
  trackEvent(`${ctaType}_cta_click` as AnalyticsEvent, {
    cta_type: ctaType,
    click_location: location,
    event_category: 'engagement',
    event_label: label || ctaType,
  })
}

/**
 * Track form interaction
 */
export function trackFormInteraction(
  formName: string,
  action: 'start' | 'submit' | 'success' | 'error',
  errorMessage?: string
): void {
  const eventName = `${formName}_form_${action}` as AnalyticsEvent
  
  trackEvent(eventName, {
    form_name: formName,
    form_action: action,
    event_category: 'form',
    ...(errorMessage && { error_message: errorMessage }),
  })
}
