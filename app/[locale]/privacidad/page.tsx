import { type Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad - Reparar24',
  description: 'Política de privacidad de Reparar24. Información sobre tratamiento de datos personales, derechos de usuarios y protección de información según GDPR.',
  alternates: {
    canonical: 'https://reparar24.es/privacidad',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export async function generateStaticParams() {
  const locales: Locale[] = ['es']
  return locales.map((locale) => ({ locale }))
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const company = getCompanyInfo()
  const address = getBusinessAddress()

  return (
    <>
      <Header locale={locale} />
      <main className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            
            <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700">
                <strong>Última actualización:</strong> 22 de mayo de 2026
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Esta política de privacidad explica cómo {company.legalName} recoge, utiliza y protege 
                la información personal que nos proporcionas cuando utilizas nuestros servicios.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Responsible Entity */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Responsable del Tratamiento</h2>
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <p><strong>Razón Social:</strong> {company.legalName}</p>
                  <p><strong>Nombre Comercial:</strong> {company.tradeName}</p>
                  <p><strong>CIF:</strong> {company.cif}</p>
                  <p><strong>Dirección:</strong> {address.streetAddress}, {address.postalCode} {address.addressLocality}, {address.addressRegion}</p>
                  <p><strong>Teléfono:</strong> {getPhoneDisplay()}</p>
                  <p><strong>Email:</strong> {getEmail()}</p>
                </div>
              </section>

              {/* Data Collected */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Datos Personales que Recogemos</h2>
                <p>Podemos recoger y procesar los siguientes datos personales:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de contacto:</strong> Nombre, teléfono, email y dirección cuando solicitas nuestros servicios</li>
                  <li><strong>Datos de servicio:</strong> Información sobre el tipo de servicio solicitado, dirección de intervención y descripción del problema</li>
                  <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas y tiempo de navegación (mediante cookies y herramientas analíticas)</li>
                  <li><strong>Datos comerciales:</strong> Historial de servicios contratados y preferencias de comunicación</li>
                </ul>
              </section>

              {/* Purpose */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Finalidad del Tratamiento</h2>
                <p>Utilizamos tus datos personales para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestionar y prestar los servicios de fontanería, electricidad y reparaciones solicitados</li>
                  <li>Contactarte para confirmar citas, proporcionar presupuestos y resolver consultas</li>
                  <li>Procesar pagos y emitir facturas</li>
                  <li>Cumplir con obligaciones legales y fiscales</li>
                  <li>Mejorar nuestros servicios mediante análisis estadísticos anónimos</li>
                  <li>Enviarte comunicaciones comerciales sobre nuestros servicios (solo con tu consentimiento expreso)</li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Base Legal</h2>
                <p>El tratamiento de tus datos se basa en:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Ejecución del contrato:</strong> Para prestar los servicios que solicitas</li>
                  <li><strong>Obligación legal:</strong> Para cumplir con requisitos fiscales, contables y regulatorios</li>
                  <li><strong>Consentimiento:</strong> Para comunicaciones comerciales y uso de cookies no esenciales</li>
                  <li><strong>Interés legítimo:</strong> Para mejora de servicios y seguridad</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Conservación de Datos</h2>
                <p>Conservaremos tus datos personales durante:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de clientes:</strong> Durante la relación comercial y hasta 6 años después por obligaciones fiscales</li>
                  <li><strong>Datos de presupuestos:</strong> Hasta 1 año si no se acepta el presupuesto</li>
                  <li><strong>Datos de marketing:</strong> Hasta que retires tu consentimiento</li>
                  <li><strong>Datos analíticos:</strong> En forma anónima sin límite temporal</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Comunicación de Datos a Terceros</h2>
                <p>No vendemos ni compartimos tus datos personales con terceros, excepto:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestro negocio (hosting, pasarelas de pago, servicios de mensajería)</li>
                  <li><strong>Autoridades:</strong> Cuando sea requerido por ley o mandato judicial</li>
                  <li><strong>Asesores profesionales:</strong> Asesores legales, fiscales o contables bajo obligación de confidencialidad</li>
                </ul>
                <p className="mt-4">Todos los terceros están obligados a proteger tus datos según la normativa vigente.</p>
              </section>

              {/* User Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Tus Derechos</h2>
                <p>Tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios</li>
                  <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para fines específicos</li>
                  <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento en ciertas circunstancias</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y legible</li>
                  <li><strong>Retirar consentimiento:</strong> Retirar el consentimiento en cualquier momento sin afectar la licitud del tratamiento previo</li>
                </ul>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="font-semibold mb-2">Cómo ejercer tus derechos:</p>
                  <p>Puedes ejercer estos derechos contactándonos por:</p>
                  <ul className="list-none mt-2 space-y-1">
                    <li>📧 Email: <a href={`mailto:${getEmail()}`} className="text-primary-600 hover:underline">{getEmail()}</a></li>
                    <li>📞 Teléfono: <a href={getPhoneHref()} className="text-primary-600 hover:underline">{getPhoneDisplay()}</a></li>
                    <li>✉️ Correo postal: {address.streetAddress}, {address.postalCode} {address.addressLocality}</li>
                  </ul>
                </div>
              </section>

              {/* Security */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Seguridad de los Datos</h2>
                <p>
                  Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra 
                  acceso no autorizado, pérdida, destrucción o alteración. Estas medidas incluyen cifrado de datos, 
                  controles de acceso, copias de seguridad regulares y formación de personal en protección de datos.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Cookies y Tecnologías Similares</h2>
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación y analizar 
                  el uso de nuestro sitio web. Para más información, consulta nuestra{' '}
                  <Link href="/cookies" className="text-primary-600 hover:underline font-semibold">
                    Política de Cookies
                  </Link>.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Transferencias Internacionales</h2>
                <p>
                  En general, tus datos se procesan dentro del Espacio Económico Europeo (EEE). Si necesitamos 
                  transferir datos fuera del EEE, nos aseguraremos de que existan garantías adecuadas de protección 
                  mediante cláusulas contractuales estándar u otros mecanismos aprobados por la UE.
                </p>
              </section>

              {/* Changes */}
              <section>
                <h2 className="text-2xl font-bold mb-4">11. Modificaciones de esta Política</h2>
                <p>
                  Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio 
                  significativo publicando la nueva política en esta página y actualizando la fecha de &quot;Última actualización&quot;. 
                  Te recomendamos revisar esta política periódicamente.
                </p>
              </section>

              {/* Complaints */}
              <section>
                <h2 className="text-2xl font-bold mb-4">12. Reclamaciones</h2>
                <p>
                  Si consideras que el tratamiento de tus datos personales no cumple con la normativa aplicable, 
                  tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD):
                </p>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 mt-4">
                  <p><strong>Agencia Española de Protección de Datos (AEPD)</strong></p>
                  <p>C/ Jorge Juan, 6</p>
                  <p>28001 Madrid</p>
                  <p>Web: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.aepd.es</a></p>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4">13. Contacto</h2>
                <p>
                  Si tienes preguntas sobre esta política de privacidad o sobre cómo tratamos tus datos personales, 
                  no dudes en contactarnos:
                </p>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200 mt-4">
                  <p className="font-semibold mb-3">{company.legalName}</p>
                  <p>📍 {address.streetAddress}, {address.postalCode} {address.addressLocality}</p>
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
