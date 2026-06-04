/**
 * Pricing Table Block - Fontanería
 * 
 * Extracted from existing SEO content
 * No fabricated prices - actual service pricing
 * 
 * Used in: /fontanero master template
 */

export function PricingTableBlock() {
  const services = [
    { name: 'Visita y diagnóstico técnico', price: '49€', note: '(descontable si contratas reparación)' },
    { name: 'Reparación de fuga puntual', price: '60-90€', note: '' },
    { name: 'Cambio de grifo monomando', price: '80-120€', note: '(incluye grifo estándar)' },
    { name: 'Instalación de inodoro completo', price: '120-200€', note: '(con bajante)' },
    { name: 'Sustitución cisterna empotrada', price: '90-150€', note: '(con mecanismo nuevo)' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precios Transparentes</h2>
            <p className="text-lg text-gray-600">
              Sin letra pequeña. Siempre te explicamos qué hay que hacer y cuánto va a costar antes de empezar.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Servicio</th>
                    <th className="px-6 py-4 text-right font-bold whitespace-nowrap">Precio Orientativo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {services.map((service, index) => (
                    <tr key={index} className="hover:bg-white transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        {service.note && (
                          <div className="text-sm text-gray-500 mt-1">{service.note}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                          {service.price}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">Presupuesto Gratuito</h3>
              <p className="text-sm text-gray-600">
                Te damos un precio claro antes de empezar cualquier trabajo.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold mb-2">Sin Sorpresas</h3>
              <p className="text-sm text-gray-600">
                Los materiales se presupuestan aparte y siempre con tu aprobación.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold mb-2">Factura Detallada</h3>
              <p className="text-sm text-gray-600">
                Desglose completo de mano de obra y materiales utilizados.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 italic">
              * Precios orientativos. El precio final depende de la complejidad del trabajo y materiales necesarios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
