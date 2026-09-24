import type { Metadata } from 'next'
import './globals.css'
import { ConsentAwareAnalytics, ConsentAwareGTMNoScript } from '@/components/analytics/ConsentAwareAnalytics'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema'

export const metadata: Metadata = {
  metadataBase: new URL('https://reparar24.es'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebSiteSchema()

  return (
    <html lang="es">
      <head>
        <ConsentAwareAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ConsentAwareGTMNoScript />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
