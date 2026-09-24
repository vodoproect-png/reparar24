'use client'

/**
 * Consent-Aware Analytics Component
 * 
 * Loads Google tag with Consent Mode defaults and updates consent dynamically.
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasAnalyticsConsent, hasConsentChoice } from '@/lib/consent/storage'
import { trackPhoneClick, trackWhatsAppClick, type ClickLocation, type DeviceType } from '@/lib/analytics'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-PGM6VFMXRW'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || 'AW-18181043849'

export function ConsentAwareAnalytics() {
  const [hasAnalyticsConsentState, setHasAnalyticsConsentState] = useState(false)
  const [isGtmInitialized, setIsGtmInitialized] = useState(false)
  const [isGtagInitialized, setIsGtagInitialized] = useState(false)

  useEffect(() => {
    // Check initial consent state
    const checkConsent = () => {
      setHasAnalyticsConsentState(hasConsentChoice() && hasAnalyticsConsent())
    }

    checkConsent()

    // Listen for consent changes
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const consent = customEvent.detail
      setHasAnalyticsConsentState(consent?.analytics === true)
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
  const hasGoogleAds = GOOGLE_ADS_ID && GOOGLE_ADS_ID.startsWith('AW-')
  const shouldLoadGtag = isProduction && (hasGA4 || hasGoogleAds)

  useEffect(() => {
    if (!isProduction || !hasAnalyticsConsentState) {
      return
    }

    let attempts = 0
    const configureAnalytics = () => {
      attempts += 1

      if (typeof window.gtag !== 'function') {
        if (attempts < 20) {
          window.setTimeout(configureAnalytics, 250)
        }
        return
      }

      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })

    }

    configureAnalytics()
  }, [hasAnalyticsConsentState, hasGA4, isProduction])

  useEffect(() => {
    if (!isProduction || !shouldLoadGtag) return

    const getDeviceType = (): DeviceType => {
      const width = window.innerWidth
      if (width < 768) return 'mobile'
      if (width < 1024) return 'tablet'
      return 'desktop'
    }

    const getClickLocation = (anchor: HTMLAnchorElement): ClickLocation => {
      const explicitLocation = anchor.dataset.analyticsLocation
      const validLocations: ClickLocation[] = [
        'header',
        'footer',
        'mobile_menu',
        'mobile_sticky',
        'contact_page',
        'service_page',
        'hero',
      ]

      if (validLocations.includes(explicitLocation as ClickLocation)) {
        return explicitLocation as ClickLocation
      }

      if (anchor.closest('header')) return 'header'
      if (anchor.closest('footer')) return 'footer'
      if (anchor.closest('[data-mobile-sticky-cta]')) return 'mobile_sticky'
      if (window.location.pathname.includes('/contacto')) return 'contact_page'

      return 'service_page'
    }

    const handleContactClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.href
      const page = window.location.pathname
      const deviceType = getDeviceType()
      const clickLocation = getClickLocation(anchor)

      if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
        event.preventDefault()
        let didNavigate = false
        const navigateToWhatsApp = () => {
          if (didNavigate) return
          didNavigate = true
          window.location.href = href
        }

        trackWhatsAppClick({
          page,
          locale: 'es',
          device_type: deviceType,
          click_location: clickLocation,
        }, {
          eventCallback: navigateToWhatsApp,
          eventTimeoutMs: 800,
        })

        window.setTimeout(navigateToWhatsApp, 350)
        return
      }

      if (href.startsWith('tel:')) {
        event.preventDefault()
        let didNavigate = false
        const navigateToPhone = () => {
          if (didNavigate) return
          didNavigate = true
          window.location.href = href
        }

        trackPhoneClick({
          page,
          locale: 'es',
          device_type: deviceType,
          click_location: clickLocation,
        }, {
          eventCallback: navigateToPhone,
          eventTimeoutMs: 800,
        })

        window.setTimeout(navigateToPhone, 350)
      }
    }

    document.addEventListener('click', handleContactClick, true)

    return () => {
      document.removeEventListener('click', handleContactClick, true)
    }
  }, [isProduction, shouldLoadGtag])

  if (!isProduction || !shouldLoadGtag) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager */}
      {hasAnalyticsConsentState && hasGTM && !isGtmInitialized && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          onLoad={() => setIsGtmInitialized(true)}
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
      {shouldLoadGtag && !isGtagInitialized && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${hasGA4 ? GA4_ID : GOOGLE_ADS_ID}`}
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            onLoad={() => setIsGtagInitialized(true)}
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  analytics_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  wait_for_update: 500
                });
                ${hasAnalyticsConsentState ? `gtag('consent', 'update', {
                  ad_storage: 'granted',
                  analytics_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted'
                });` : ''}
                gtag('js', new Date());
                ${hasGA4 ? `gtag('config', '${GA4_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                  anonymize_ip: true
                });` : ''}
                ${hasGoogleAds ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
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
