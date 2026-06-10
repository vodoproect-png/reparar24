/**
 * Structured Content Block - Fontanería
 * 
 * Transforms SEO content wall into structured, scannable sections
 * NO duplication - uses existing content, improves presentation
 * 
 * Used in: /fontanero master template
 */

export function StructuredContentBlock() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Servicios de Fontanería Profesional en Valencia
            </h2>
            <p className="text-lg text-gray-600">
              Más de 15 años resolviendo problemas de fontanería con profesionalidad y garantía.
            </p>
          </div>

          {/* Intro paragraph */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed text-gray-700">
              Cuando tienes una fuga de agua en tu piso, un grifo que no cierra bien o un inodoro atascado, 
              necesitas un fontanero que responda rápido y resuelva el problema correctamente. En Reparar24 
              trabajamos todos los días del año, 24 horas, porque sabemos que las averías de fontanería no 
              esperan al lunes ni al horario de oficina.
            </p>
          </div>

          {/* Main services grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Fugas de agua */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">💧</span>
                Fugas de Agua
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 text-xl flex-shrink-0">🔍</span>
                  <span><strong>Detección precisa:</strong> Termografía infrarroja y geófonos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 text-xl flex-shrink-0">🚫</span>
                  <span><strong>Sin destrozos:</strong> Localización exacta sin romper paredes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 text-xl flex-shrink-0">✅</span>
                  <span><strong>Verificación completa:</strong> Comprobamos zonas comprometidas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 text-xl flex-shrink-0">⚡</span>
                  <span><strong>Respuesta rápida:</strong> Urgencias 24/7 en Valencia</span>
                </li>
              </ul>
            </div>

            {/* Sustitución de tuberías */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🔩</span>
                Sustitución de Tuberías
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-xl flex-shrink-0">🔧</span>
                  <span><strong>Pex-Al-Pex:</strong> Tubería multicapa resistente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-xl flex-shrink-0">♨️</span>
                  <span><strong>Cobre tipo B:</strong> Agua caliente sanitaria (ACS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-xl flex-shrink-0">📋</span>
                  <span><strong>Normativa CTE-HS:</strong> Cumplimiento garantizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-xl flex-shrink-0">✓</span>
                  <span><strong>Diámetros correctos:</strong> Según necesidades reales</span>
                </li>
              </ul>
            </div>

            {/* Grifos y sanitarios */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🚰</span>
                Grifos y Sanitarios
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">🔧</span>
                  <span><strong>Grifería monomando:</strong> Cartucho cerámico 25-35mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">🚽</span>
                  <span><strong>Inodoros eficientes:</strong> Doble descarga 3/6 litros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">🚿</span>
                  <span><strong>Platos de ducha:</strong> Resina con sifón extraplano</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl flex-shrink-0">🏗️</span>
                  <span><strong>Reformas integrales:</strong> Coordinación con otros oficios</span>
                </li>
              </ul>
            </div>

            {/* Calentadores y termos */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">♨️</span>
                Calentadores y Termos
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xl flex-shrink-0">⚡</span>
                  <span><strong>Termos eléctricos:</strong> 50-100L con válvula seguridad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xl flex-shrink-0">🔥</span>
                  <span><strong>Calentadores gas:</strong> Estancos C12/C13 certificados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xl flex-shrink-0">🛠️</span>
                  <span><strong>Mantenimiento:</strong> Revisión ánodos sacrificio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-xl flex-shrink-0">📋</span>
                  <span><strong>Boletín incluido:</strong> Instalaciones de gas certificadas</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
