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

          {/* Professional certifications - IMPROVED: Stat grid instead of text */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Garantías y Normativa</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-3">🎓</div>
                <div className="text-3xl font-bold mb-2">Certificados</div>
                <ul className="text-sm text-gray-300 space-y-1 text-left mt-4">
                  <li>• Carné instalador gas</li>
                  <li>• Habilitación oficial</li>
                  <li>• Formación continua</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-3">📋</div>
                <div className="text-3xl font-bold mb-2">Normativas</div>
                <ul className="text-sm text-gray-300 space-y-1 text-left mt-4">
                  <li>• CTE DB-HS (salubridad)</li>
                  <li>• RITE (térmicos)</li>
                  <li>• Boletines oficiales</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-4xl mb-3">🛡️</div>
                <div className="text-2xl font-bold mb-2">600.000€</div>
                <ul className="text-sm text-gray-300 space-y-1 text-left mt-4">
                  <li>• Seguro RC profesional</li>
                  <li>• 2 años garantía</li>
                  <li>• Cobertura completa</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service area - Valencia focus - IMPROVED: Grid layout */}
          <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-3xl mr-3">🌍</span>
              Cobertura en Valencia y Área Metropolitana
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📍</span>
                  <span className="font-bold text-lg">Valencia Ciudad</span>
                </div>
                <p className="text-sm text-gray-600">Tiempo respuesta: 30-60 min</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏘️</span>
                  <span className="font-bold text-lg">Paterna / Mislata</span>
                </div>
                <p className="text-sm text-gray-600">Cobertura inmediata</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌆</span>
                  <span className="font-bold text-lg">Torrent / Burjassot</span>
                </div>
                <p className="text-sm text-gray-600">Servicio 24/7</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Conocemos las particularidades de las instalaciones valencianas: 
              edificios antiguos del centro histórico, construcciones modernas, y climatología mediterránea.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
