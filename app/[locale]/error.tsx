'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { getPhoneHref, getWhatsAppHref } from '@/lib/config/contact'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Page error:', error)
    // TODO: Send to error tracking service (Sentry) in production
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Algo Salió Mal
              </h1>
              <p className="text-gray-600 mb-6">
                Lo sentimos, ha ocurrido un error inesperado. Puedes intentar recargar la página o llamarnos directamente.
              </p>
              
              {/* Error details in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-left">
                  <p className="text-sm text-red-800 font-mono break-all">
                    {error.message}
                  </p>
                </div>
              )}

              {/* CTAs - Preserve conversion focus */}
              <div className="space-y-3 mb-6">
                <a
                  href={getPhoneHref()}
                  className="btn-primary w-full inline-block"
                >
                  📞 Llamar Ahora - 900 000 000
                </a>
                <a
                  href={getWhatsAppHref('Tengo un problema con la página web')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full inline-block"
                >
                  💬 WhatsApp
                </a>
                <button
                  onClick={reset}
                  className="btn-secondary w-full"
                >
                  🔄 Intentar de Nuevo
                </button>
              </div>

              <Link
                href="/"
                className="text-primary-600 hover:underline"
              >
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
