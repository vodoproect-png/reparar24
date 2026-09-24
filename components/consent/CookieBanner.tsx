'use client'

/**
 * Cookie Consent Banner Component
 *
 * Compact GDPR/LSSI consent banner for Spanish production.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { hasConsentChoice, saveConsent } from '@/lib/consent/storage'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(!hasConsentChoice())
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
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white/96 shadow-xl shadow-slate-900/12 backdrop-blur md:bottom-5"
      role="dialog"
      aria-label="Consentimiento de cookies"
    >
      <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="min-w-0 text-sm leading-snug text-slate-600">
          <p className="font-semibold text-slate-900">Cookies analíticas</p>
          <p>
            Usamos cookies necesarias y, si aceptas, medición para mejorar el sitio.{' '}
            <Link href="/cookies" className="font-semibold text-primary-600 hover:underline">
              Más información sobre cookies
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 gap-2.5">
          <button
            onClick={handleReject}
            className="min-h-11 flex-1 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:flex-none"
            aria-label="Rechazar cookies analíticas"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="min-h-11 flex-1 rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 sm:flex-none"
            aria-label="Aceptar cookies analíticas"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
