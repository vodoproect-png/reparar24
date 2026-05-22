'use client'

/**
 * Cookie Consent Banner Component
 * 
 * GDPR/LSSI compliant cookie consent banner for Spanish production
 * Lightweight, non-intrusive UI
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { hasConsentChoice, saveConsent } from '@/lib/consent/storage'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show banner if user hasn't made a choice
    const hasChoice = hasConsentChoice()
    setIsVisible(!hasChoice)
  }, [])

  const handleAccept = () => {
    saveConsent(true)
    setIsVisible(false)
  }

  const handleReject = () => {
    saveConsent(false)
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-600 shadow-2xl z-50"
      role="dialog"
      aria-label="Consentimiento de cookies"
    >
      <div className="container-custom py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Message */}
          <div className="flex-1 text-sm text-gray-700">
            <p className="font-semibold mb-1">🍪 Utilizamos cookies</p>
            <p>
              Utilizamos cookies técnicas necesarias y, con tu consentimiento, cookies analíticas para mejorar el sitio.{' '}
              <Link href="/cookies" className="text-primary-600 hover:underline font-medium">
                Más información
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Rechazar cookies analíticas"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-md"
              aria-label="Aceptar cookies analíticas"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
