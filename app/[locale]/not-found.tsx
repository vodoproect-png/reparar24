import Link from 'next/link'
import { getPhoneHref, getWhatsAppHref } from '@/lib/config/contact'

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Página No Encontrada
              </h1>
              <p className="text-gray-600 mb-6">
                Lo sentimos, no pudimos encontrar la página que buscas.
                ¿Necesitas ayuda urgente?
              </p>

              {/* CTAs - Preserve conversion focus */}
              <div className="space-y-3 mb-6">
                <a
                  href={getPhoneHref()}
                  className="btn-primary w-full inline-block"
                >
                  📞 Llamar Ahora - 900 000 000
                </a>
                <a
                  href={getWhatsAppHref('Necesito ayuda')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full inline-block"
                >
                  💬 WhatsApp
                </a>
              </div>

              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-primary-600 hover:underline"
                >
                  ← Volver al Inicio
                </Link>
                <Link
                  href="/es"
                  className="block text-gray-600 hover:underline"
                >
                  Ver Todos los Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
