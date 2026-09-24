/**
 * Google Analytics Integration Component
 * 
 * Loads GA4 and GTM scripts for production analytics tracking
 * Compatible with Next.js App Router and SSR architecture
 */

import Script from 'next/script'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-PGM6VFMXRW'
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || 'AW-18181043849'

/**
 * Google Analytics component - loads GA4 and GTM
 * 
 * Only loads in production when environment variables are set
 * Uses Next.js Script component for optimal performance
 */
export function GoogleAnalytics() {
  // Only load in production with valid IDs
  const isProduction = process.env.NODE_ENV === 'production'
  const hasGA4 = GA4_ID && GA4_ID !== 'G-XXXXXXXXXX'
  const hasGTM = GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && GTM_ID !== 'GT-XXXXXXX'
  const hasGoogleAds = GOOGLE_ADS_ID && GOOGLE_ADS_ID.startsWith('AW-')
  
  if (!isProduction) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager */}
      {hasGTM && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
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
        </>
      )}

      {/* Google Analytics 4 */}
      {(hasGA4 || hasGoogleAds) && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${hasGA4 ? GA4_ID : GOOGLE_ADS_ID}`}
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${hasGA4 ? `gtag('config', '${GA4_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
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
 * GTM NoScript fallback for users with JavaScript disabled
 * Must be placed immediately after <body> tag
 */
export function GTMNoScript() {
  const isProduction = process.env.NODE_ENV === 'production'
  const hasGTM = GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && GTM_ID !== 'GT-XXXXXXX'
  
  if (!isProduction || !hasGTM) {
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
