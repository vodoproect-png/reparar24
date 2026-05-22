'use client'

/**
 * Consent-Aware Analytics Component
 * 
 * Only loads GA4/GTM scripts after user consent
 * Monitors consent changes and loads analytics dynamically
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasAnalyticsConsent, hasConsentChoice } from '@/lib/consent/storage'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export function ConsentAwareAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check initial consent state
    const checkConsent = () => {
      const hasChoice = hasConsentChoice()
      const hasConsent = hasAnalyticsConsent()
      
      // Only load if user has explicitly consented
      if (hasChoice && hasConsent) {
        setShouldLoad(true)
      }
    }

    checkConsent()

    // Listen for consent changes
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const consent = customEvent.detail
      
      if (consent?.analytics === true) {
        setShouldLoad(true)
      } else {
        setShouldLoad(false)
      }
    }

    window.addEventListener('consentChanged', handleConsentChange)

    return () => {
      window.removeEventListener('consentChanged', handleConsentChange)
    }
  }, [])

  // Only load in production with valid IDs and user consent
  const isProduction = process.env.NODE_ENV === 'production'
  const hasGA4 = GA4_ID && GA4_ID !== 'G-XXXXXXXXXX'
  const hasGTM = GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && GTM_ID !== 'GT-XXXXXXX'

  if (!isProduction || !shouldLoad) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager */}
      {hasGTM && !isInitialized && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          onLoad={() => setIsInitialized(true)}
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}

      {/* Google Analytics 4 */}
      {hasGA4 && !isInitialized && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            onLoad={() => setIsInitialized(true)}
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                  anonymize_ip: true
                });
              `,
            }}
          />
        </>
      )}
    </>
  )
}

/**
 * GTM NoScript fallback (only if consent given)
 */
export function ConsentAwareGTMNoScript() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const hasChoice = hasConsentChoice()
    const hasConsent = hasAnalyticsConsent()
    setShouldLoad(hasChoice && hasConsent)
  }, [])

  const isProduction = process.env.NODE_ENV === 'production'
  const hasGTM = GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && GTM_ID !== 'GT-XXXXXXX'

  if (!isProduction || !hasGTM || !shouldLoad) {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
