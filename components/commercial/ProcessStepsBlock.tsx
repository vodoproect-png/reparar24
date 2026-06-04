/**
 * Process Steps Block Component
 * 
 * Visual representation of service workflow
 * Builds trust through transparency
 * 
 * Used in: /fontanero master template
 * Future: Template for all service pages
 */

export function ProcessStepsBlock() {
  const steps = [
    {
      number: '1',
      icon: '📞',
      title: 'Contacto',
      description: 'Llámanos o escríbenos por WhatsApp. Atención inmediata 24/7.'
    },
    {
      number: '2',
      icon: '🔍',
      title: 'Diagnóstico',
      description: 'Evaluamos el problema in situ con equipos profesionales.'
    },
    {
      number: '3',
      icon: '💰',
      title: 'Presupuesto',
      description: 'Precio claro antes de empezar. Sin sorpresas ni letra pequeña.'
    },
    {
      number: '4',
      icon: '🔧',
      title: 'Reparación',
      description: 'Trabajo profesional con garantía. Certificamos cuando es necesario.'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Trabajamos?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso transparente en 4 pasos. Sin complicaciones, sin sorpresas.
          </p>
        </div>

        {/* Mobile: Vertical layout */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal layout with arrows */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-2xl mb-4">
                    {step.number}
                  </div>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
              
              {/* Arrow between steps (except last one) */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="text-primary-600 text-3xl">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
