import { type Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Reparar24',
  description: 'Términos y condiciones de uso de los servicios de Reparar24. Información sobre contratación, garantías, responsabilidades y derechos del consumidor.',
  alternates: {
    canonical: 'https://reparar24.es/terminos',
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

export default async function TermsPage({
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
            
            <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-700">
                <strong>Última actualización:</strong> 22 de mayo de 2026
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Estos términos y condiciones regulan el uso de los servicios profesionales de fontanería, 
                electricidad y reparaciones proporcionados por {company.legalName}.
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Legal Notice */}
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Información Legal</h2>
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <p><strong>Razón Social:</strong> {company.legalName}</p>
                  <p><strong>Nombre Comercial:</strong> {company.tradeName}</p>
                  <p><strong>CIF:</strong> {company.cif}</p>
                  <p><strong>Dirección:</strong> {address.streetAddress}, {address.postalCode} {address.addressLocality}, {address.addressRegion}</p>
                  <p><strong>Teléfono:</strong> {getPhoneDisplay()}</p>
                  <p><strong>Email:</strong> {getEmail()}</p>
                </div>
              </section>

              {/* Acceptance */}
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Aceptación de los Términos</h2>
                <p>
                  Al contratar nuestros servicios o utilizar nuestro sitio web, aceptas estos términos y condiciones 
                  en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, te rogamos que no 
                  contrates nuestros servicios.
                </p>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Servicios Ofrecidos</h2>
                <p>Reparar24 ofrece servicios profesionales de:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Fontanería:</strong> Reparación de fugas, instalación de sanitarios, desatascos, sistemas de agua</li>
                  <li><strong>Electricidad:</strong> Reparación de averías eléctricas, instalaciones, cuadros eléctricos, boletines</li>
                  <li><strong>Desatascos:</strong> Limpieza de tuberías, desatascos de inodoros, desagües, bajantes</li>
                  <li><strong>Calefacción:</strong> Instalación y reparación de calderas, radiadores, sistemas de calefacción</li>
                  <li><strong>Aire Acondicionado:</strong> Instalación, reparación y mantenimiento de sistemas de climatización</li>
                </ul>
                <p className="mt-4">
                  Todos los servicios son realizados por profesionales certificados con experiencia en el sector.
                </p>
              </section>

              {/* Emergency Services */}
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Servicios de Emergencia</h2>
                <p>
                  Ofrecemos servicio de emergencia 24 horas, 7 días a la semana para situaciones urgentes que requieran 
                  atención inmediata (fugas graves, averías eléctricas peligrosas, etc.).
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>El tiempo de respuesta estimado en emergencias es de 30-60 minutos en Valencia y alrededores</li>
                  <li>Los servicios de emergencia fuera de horario comercial pueden tener recargo sobre la tarifa estándar</li>
                  <li>La definición de &quot;emergencia&quot; queda a criterio técnico del profesional</li>
                </ul>
              </section>

              {/* Quotations */}
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Presupuestos y Tarifas</h2>
                <p>
                  Nuestro proceso de presupuestación es transparente y sin sorpresas:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Presupuesto gratuito:</strong> Proporcionamos presupuesto sin compromiso antes de iniciar cualquier trabajo</li>
                  <li><strong>Precios orientativos:</strong> Los precios publicados en la web son orientativos; el precio final depende de la complejidad del trabajo</li>
                  <li><strong>Desplazamiento:</strong> Incluido en el precio del servicio dentro de nuestra zona de cobertura principal</li>
                  <li><strong>Materiales:</strong> Los materiales se facturan aparte según consumo real</li>
                  <li><strong>Aceptación:</strong> El trabajo solo se inicia tras tu aceptación explícita del presupuesto</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold">
                    ⚠️ Importante: Si durante el trabajo se detectan problemas adicionales no contemplados en el presupuesto inicial, 
                    te informaremos inmediatamente y proporcionaremos un presupuesto adicional antes de continuar.
                  </p>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Forma de Pago</h2>
                <p>Aceptamos los siguientes métodos de pago:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Efectivo</li>
                  <li>Tarjeta de crédito/débito</li>
                  <li>Transferencia bancaria</li>
                  <li>Bizum</li>
                </ul>
                <p className="mt-4">
                  El pago se realiza una vez finalizado el servicio. Emitimos factura con IVA incluido para todos los trabajos realizados.
                </p>
              </section>

              {/* Cancellation */}
              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cancelaciones y Modificaciones</h2>
                <p><strong>Cancelación por el Cliente:</strong></p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Puedes cancelar o reprogramar una cita sin coste con al menos 2 horas de antelación</li>
                  <li>Cancelaciones con menos de 2 horas de antelación pueden incurrir en gastos de desplazamiento</li>
                  <li>En emergencias ya iniciadas, se cobrará el desplazamiento y diagnóstico aunque decidas no proceder</li>
                </ul>
                <p className="mt-4"><strong>Cancelación por Reparar24:</strong></p>
                <p>
                  Nos reservamos el derecho de cancelar un servicio si las condiciones de seguridad no son adecuadas, 
                  si el trabajo requiere permisos especiales no disponibles, o por causas de fuerza mayor.
                </p>
              </section>

              {/* Warranties */}
              <section>
                <h2 className="text-2xl font-bold mb-4">8. Garantías</h2>
                <p>Ofrecemos garantía en todos nuestros trabajos:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Mano de obra:</strong> 12 meses de garantía en todos los trabajos realizados</li>
                  <li><strong>Materiales:</strong> Garantía del fabricante (varía según producto, típicamente 1-2 años)</li>
                  <li><strong>Exclusiones:</strong> La garantía no cubre daños por mal uso, modificaciones no autorizadas o desgaste normal</li>
                </ul>
                <p className="mt-4">
                  Para hacer válida la garantía, conserva la factura y contacta con nosotros describiendo el problema.
                </p>
              </section>

              {/* Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold mb-4">9. Responsabilidades</h2>
                <p><strong>Responsabilidades de Reparar24:</strong></p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Realizar los trabajos con profesionalidad y según normativa vigente</li>
                  <li>Contar con el seguro de responsabilidad civil requerido</li>
                  <li>Proporcionar certificaciones técnicas cuando sea legalmente obligatorio</li>
                  <li>Respetar tu propiedad y dejar el área de trabajo limpia y ordenada</li>
                </ul>
                <p className="mt-4"><strong>Responsabilidades del Cliente:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar acceso seguro al área de trabajo</li>
                  <li>Informar de cualquier condición especial o riesgo conocido</li>
                  <li>Estar presente o designar a un representante autorizado durante el servicio</li>
                  <li>Realizar el pago según lo acordado</li>
                </ul>
              </section>

              {/* Liability Limitations */}
              <section>
                <h2 className="text-2xl font-bold mb-4">10. Limitación de Responsabilidad</h2>
                <p>
                  Nuestra responsabilidad está limitada al importe facturado por el servicio específico, excepto en casos 
                  de negligencia grave o dolo. No somos responsables de:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Daños preexistentes no comunicados</li>
                  <li>Problemas derivados de instalaciones no conformes o fuera de normativa previas a nuestra intervención</li>
                  <li>Daños indirectos, lucro cesante o pérdidas económicas derivadas</li>
                  <li>Retrasos causados por circunstancias fuera de nuestro control</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold mb-4">11. Propiedad Intelectual</h2>
                <p>
                  Todo el contenido de este sitio web (textos, imágenes, logos, diseños) es propiedad de {company.legalName} 
                  o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No está permitido copiar, 
                  reproducir o distribuir ningún contenido sin autorización explícita.
                </p>
              </section>

              {/* Data Protection */}
              <section>
                <h2 className="text-2xl font-bold mb-4">12. Protección de Datos</h2>
                <p>
                  El tratamiento de tus datos personales se realiza conforme a nuestra{' '}
                  <Link href="/privacidad" className="text-primary-600 hover:underline font-semibold">
                    Política de Privacidad
                  </Link>
                  , cumpliendo con el RGPD y la LOPD-GDD.
                </p>
              </section>

              {/* Applicable Law */}
              <section>
                <h2 className="text-2xl font-bold mb-4">13. Legislación Aplicable y Jurisdicción</h2>
                <p>
                  Estos términos y condiciones se rigen por la legislación española. Para cualquier controversia, 
                  las partes se someten a los juzgados y tribunales de Valencia capital, renunciando expresamente 
                  a cualquier otro fuero que pudiera corresponderles.
                </p>
                <p className="mt-4">
                  Como consumidor, tienes derecho a la resolución alternativa de conflictos a través de mediación o arbitraje 
                  de consumo según la normativa aplicable.
                </p>
              </section>

              {/* Changes */}
              <section>
                <h2 className="text-2xl font-bold mb-4">14. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios 
                  entrarán en vigor una vez publicados en esta página. Te recomendamos revisar estos términos periódicamente.
                </p>
              </section>

              {/* Consumer Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-4">15. Derechos del Consumidor</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold mb-2">Como consumidor, tienes derecho a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recibir información clara y comprensible antes de contratar</li>
                    <li>Recibir factura detallada de los servicios prestados</li>
                    <li>Reclamar por servicios defectuosos o no conformes</li>
                    <li>Acceder a sistemas de resolución de conflictos (Juntas Arbitrales de Consumo, OMIC)</li>
                  </ul>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4">16. Contacto</h2>
                <p>
                  Para cualquier consulta sobre estos términos y condiciones, puedes contactarnos:
                </p>
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200 mt-4">
                  <p className="font-semibold mb-3">{company.legalName}</p>
                  <p>📍 {address.streetAddress}, {address.postalCode} {address.addressLocality}</p>
                  <p>📞 <a href={getPhoneHref()} className="text-primary-600 hover:underline font-semibold">{getPhoneDisplay()}</a></p>
                  <p>📧 <a href={`mailto:${getEmail()}`} className="text-primary-600 hover:underline font-semibold">{getEmail()}</a></p>
                  <p className="text-sm text-gray-600 mt-3">Horario de atención: Lunes a Viernes, 08:00-20:00</p>
                  <p className="text-sm text-gray-600">Emergencias 24/7</p>
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
