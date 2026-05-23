import Link from 'next/link'
import { getPhoneHref, getWhatsAppHref } from '@/lib/config/contact'

export default function NotFound() {
  return (
    <html lang="es">
      <head>
        <title>Página No Encontrada - Reparar24</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
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
                  📞 Llamar Ahora
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

              {/* Navigation Links - Canonical Spanish URLs */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  O explora nuestros servicios:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link
                    href="/fontanero"
                    className="text-primary-600 hover:underline"
                  >
                    💧 Fontanería
                  </Link>
                  <Link
                    href="/electricista"
                    className="text-primary-600 hover:underline"
                  >
                    ⚡ Electricidad
                  </Link>
                  <Link
                    href="/desatascos"
                    className="text-primary-600 hover:underline"
                  >
                    🚰 Desatascos
                  </Link>
                  <Link
                    href="/aire-acondicionado"
                    className="text-primary-600 hover:underline"
                  >
                    ❄️ Aire Acondicionado
                  </Link>
                  <Link
                    href="/calefaccion"
                    className="text-primary-600 hover:underline"
                  >
                    🔥 Calefacción
                  </Link>
                  <Link
                    href="/contacto"
                    className="text-primary-600 hover:underline"
                  >
                    📧 Contacto
                  </Link>
                </div>
              </div>

              <Link
                href="/"
                className="block text-primary-600 hover:underline font-medium"
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
