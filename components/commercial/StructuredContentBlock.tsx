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
              <p className="text-gray-700 mb-4">
                Usamos termografía infrarroja y geófonos para detectar fugas ocultas sin romper paredes enteras. 
                Localizamos el punto exacto, reparamos y comprobamos que no haya otras zonas comprometidas.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Detección con equipos profesionales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reparación sin obras innecesarias</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Verificación completa de la instalación</span>
                </li>
              </ul>
            </div>

            {/* Sustitución de tuberías */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🔩</span>
                Sustitución de Tuberías
              </h3>
              <p className="text-gray-700 mb-4">
                Trabajamos con tubería multicapa (Pex-Al-Pex), cobre tipo B para agua caliente sanitaria (ACS), 
                y PVC evacuación conforme normativa CTE-HS. Conocemos los diámetros apropiados para cada caso.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Materiales certificados y duraderos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Cumplimiento normativa CTE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instalación profesional con garantía</span>
                </li>
              </ul>
            </div>

            {/* Grifos y sanitarios */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">🚰</span>
                Grifos y Sanitarios
              </h3>
              <p className="text-gray-700 mb-4">
                Instalamos grifería monomando con cartucho cerámico, inodoros de doble descarga eficientes, 
                y platos de ducha de resina. Coordinamos con otros profesionales en reformas integrales.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Grifería de calidad con garantía</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Sanitarios eficientes (ahorro agua)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instalación precisa y limpia</span>
                </li>
              </ul>
            </div>

            {/* Calentadores y termos */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="text-3xl mr-3">♨️</span>
                Calentadores y Termos
              </h3>
              <p className="text-gray-700 mb-4">
                Instalamos termos eléctricos de 50-100L con válvula de seguridad, calentadores estancos de gas 
                natural, y revisamos ánodos de sacrificio para alargar vida útil. Boletín de gas incluido.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instalación con certificación oficial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mantenimiento preventivo disponible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Boletín de gas cuando se requiere</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Professional certifications */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Garantías y Normativa</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-3">🎓</div>
                <p className="font-bold mb-2">Profesionales Certificados</p>
                <p className="text-gray-300">
                  Carné profesional de instalador de gas cuando trabajamoscon gas natural o butano
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📋</div>
                <p className="font-bold mb-2">Cumplimiento Normativo</p>
                <p className="text-gray-300">
                  CTE DB-HS (salubridad), RITE (sistemas térmicos), todas las instalaciones conformes
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🛡️</div>
                <p className="font-bold mb-2">Seguro Profesional</p>
                <p className="text-gray-300">
                  Responsabilidad civil hasta 600.000€ por siniestro, 2 años garantía mano de obra
                </p>
              </div>
            </div>
          </div>

          {/* Service area - Valencia focus */}
          <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-3xl mr-3">🌍</span>
              Cobertura en Valencia y Área Metropolitana
            </h3>
            <p className="text-gray-700 mb-4">
              Con sede en el área metropolitana de Valencia, ofrecemos respuesta rápida en toda la ciudad 
              y alrededores. Conocemos las particularidades de las instalaciones valencianas y nos adaptamos 
              al clima mediterráneo local.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <span className="text-primary-600 mr-2">📍</span>
                <span>Valencia ciudad: 30-60 minutos</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 mr-2">📍</span>
                <span>Área metropolitana: 60-90 minutos</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
