import { type Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getEmail } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies - Reparar24',
  description: 'Política de cookies de Reparar24. Información sobre el uso de cookies, finalidad y cómo gestionarlas en tu navegador.',
  alternates: {
    canonical: 'https://reparar24.es/cookies',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export async function generateStaticParams() {
  const locales: Locale[] = ['es']
  return locales.map((locale) => ({ locale }))
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const company = getCompanyInfo()

  return (
    <>
      <Header locale={locale} />
      <main className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700">
                <strong>Última actualización:</strong> 22 de mayo de 2026
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Esta política explica qué son las cookies, cómo las utilizamos en nuestro sitio web y 
                cómo puedes controlarlas.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* What are Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. ¿Qué son las Cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) 
                  cuando visitas un sitio web. Las cookies permiten que el sitio web reconozca tu dispositivo y recuerde 
                  información sobre tu visita, como tu idioma preferido y otras configuraciones.
                </p>
                <p className="mt-4">
                  Las cookies pueden ser &quot;persistentes&quot; o &quot;de sesión&quot;: las persistentes permanecen en tu dispositivo hasta 
                  que caducan o las eliminas, mientras que las de sesión se eliminan cuando cierras el navegador.
                </p>
              </section>

              {/* Why We Use Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. ¿Por Qué Utilizamos Cookies?</h2>
                <p>Utilizamos cookies para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Permitir que nuestro sitio web funcione correctamente</li>
                  <li>Mejorar la experiencia de usuario recordando tus preferencias</li>
                  <li>Analizar cómo los visitantes utilizan nuestro sitio web</li>
                  <li>Entender qué contenido y servicios son más populares</li>
                  <li>Optimizar el rendimiento del sitio web</li>
                </ul>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-6">
                  
                  {/* Technical Cookies */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h3 className="text-xl font-bold mb-3">Cookies Técnicas (Necesarias)</h3>
                    <p className="mb-3">
                      Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse.
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-300">
                      <p className="text-sm"><strong>Propósito:</strong> Navegación básica, seguridad, acceso a áreas seguras</p>
                      <p className="text-sm"><strong>Duración:</strong> Sesión</p>
                      <p className="text-sm"><strong>Tipo:</strong> Primera parte (First-party)</p>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h3 className="text-xl font-bold mb-3">Cookies Analíticas</h3>
                    <p className="mb-3">
                      Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando 
                      información de forma anónima.
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-300 space-y-2">
                      <div>
                        <p className="text-sm font-semibold">Google Analytics 4 (GA4)</p>
                        <p className="text-sm"><strong>Propósito:</strong> Análisis de tráfico web, comportamiento de usuarios, estadísticas de uso</p>
                        <p className="text-sm"><strong>Cookies:</strong> _ga, _ga_*, _gid</p>
                        <p className="text-sm"><strong>Duración:</strong> Hasta 2 años</p>
                        <p className="text-sm"><strong>Proveedor:</strong> Google LLC</p>
                        <p className="text-sm"><strong>Más info:</strong>{' '}
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                            Política de Privacidad de Google
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies (if applicable) */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <h3 className="text-xl font-bold mb-3">Cookies de Marketing (Opcional)</h3>
                    <p className="mb-3">
                      Estas cookies se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas. 
                      Solo se activan con tu consentimiento.
                    </p>
                    <div className="bg-white p-3 rounded border border-gray-300">
                      <p className="text-sm"><strong>Propósito:</strong> Publicidad personalizada, remarketing</p>
                      <p className="text-sm"><strong>Duración:</strong> Variable (hasta 2 años)</p>
                      <p className="text-sm"><strong>Consentimiento:</strong> Requerido</p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Third Party */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Cookies de Terceros</h2>
                <p>
                  Algunos servicios externos que utilizamos pueden instalar sus propias cookies en tu dispositivo:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Google Analytics:</strong> Para análisis web y estadísticas de uso</li>
                  <li><strong>Google Tag Manager:</strong> Para gestionar etiquetas de seguimiento</li>
                </ul>
                <p className="mt-4">
                  Estas cookies están sujetas a las políticas de privacidad de sus respectivos proveedores. 
                  No tenemos control sobre estas cookies de terceros.
                </p>
              </section>

              {/* Cookie Management */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Cómo Gestionar las Cookies</h2>
                <p>
                  Puedes controlar y gestionar las cookies de varias formas:
                </p>
                
                <div className="mt-4 space-y-4">
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Configuración del Navegador</h3>
                    <p className="text-sm mb-3">
                      Todos los navegadores modernos permiten cambiar la configuración de cookies. Generalmente, 
                      puedes encontrar esta configuración en el menú &quot;Opciones&quot; o &quot;Preferencias&quot; de tu navegador.
                    </p>
                    <p className="text-sm font-semibold mb-2">Enlaces rápidos a instrucciones de gestión de cookies:</p>
                    <ul className="text-sm space-y-1">
                      <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Chrome</a></li>
                      <li>• <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Mozilla Firefox</a></li>
                      <li>• <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Safari</a></li>
                      <li>• <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Microsoft Edge</a></li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold mb-2">Desactivar Google Analytics</h3>
                    <p className="text-sm mb-2">
                      Puedes desactivar Google Analytics instalando el complemento de desactivación para navegadores:
                    </p>
                    <p className="text-sm">
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-semibold">
                        Complemento de desactivación de Google Analytics
                      </a>
                    </p>
                  </div>

                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold">
                    ⚠️ Importante: Si deshabilitas todas las cookies, algunas funciones del sitio web pueden no funcionar correctamente.
                  </p>
                </div>
              </section>

              {/* Legal Basis */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Base Legal</h2>
                <p>
                  El uso de cookies analíticas y de marketing requiere tu consentimiento previo según el artículo 22 de 
                  la Ley de Servicios de la Sociedad de la Información (LSSI) y el RGPD.
                </p>
                <p className="mt-4">
                  Las cookies técnicas necesarias no requieren consentimiento ya que son esenciales para el funcionamiento 
                  del sitio web.
                </p>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Actualizaciones de esta Política</h2>
                <p>
                  Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras prácticas 
                  o en la legislación aplicable. Te recomendamos revisar esta página periódicamente para estar informado 
                  de cualquier cambio.
                </p>
              </section>

              {/* More Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Más Información</h2>
                <p>
                  Para obtener más información sobre cómo protegemos tus datos personales, consulta nuestra{' '}
                  <Link href="/privacidad" className="text-primary-600 hover:underline font-semibold">
                    Política de Privacidad
                  </Link>.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
                <p>
                  Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos:
                </p>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200 mt-4">
                  <p className="font-semibold mb-3">{company.legalName}</p>
                  <p>📞 <a href={getPhoneHref()} className="text-primary-600 hover:underline font-semibold">{getPhoneDisplay()}</a></p>
                  <p>📧 <a href={`mailto:${getEmail()}`} className="text-primary-600 hover:underline font-semibold">{getEmail()}</a></p>
                  <p className="text-sm text-gray-600 mt-3">Horario de atención: Lunes a Viernes, 08:00-20:00</p>
                </div>
              </section>

            </div>

          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  )
}
