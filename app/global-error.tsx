'use client'

import { useEffect } from 'react'
import { getPhoneHref, getPhoneDisplay } from '@/lib/config/contact'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
    // TODO: Send to error tracking service
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Error Crítico
            </h1>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error grave. Por favor, contacta con nosotros directamente.
            </p>
            <div className="space-y-3">
              <a
                href={getPhoneHref()}
                className="btn-primary w-full inline-block"
              >
                📞 Llamar: {getPhoneDisplay()}
              </a>
              <button
                onClick={reset}
                className="btn-secondary w-full"
              >
                Intentar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
