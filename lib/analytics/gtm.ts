/**
 * Google Tag Manager Integration
 * 
 * Provides GTM script injection and event tracking functionality.
 */

import { analyticsConfig, isAnalyticsEnabled } from './config'

/**
 * Get GTM script for <head>
 */
export function getGTMScript(): string {
  if (!isAnalyticsEnabled()) return ''
  
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${analyticsConfig.gtmId}');`
}

/**
 * Get GTM noscript iframe for <body>
 */
export function getGTMNoScript(): string {
  if (!isAnalyticsEnabled()) return ''
  
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(data: Record<string, any>): void {
  if (!isAnalyticsEnabled()) {
    if (analyticsConfig.debug) {
      console.log('[GTM Debug]', data)
    }
    return
  }
  
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    (window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(data)
    
    if (analyticsConfig.debug) {
      console.log('[GTM]', data)
    }
  }
}
