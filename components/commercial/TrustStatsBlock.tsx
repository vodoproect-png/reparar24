/**
 * Trust Stats Block Component
 * 
 * Professional trust indicators for service pages
 * Shows experience, coverage, guarantees
 * 
 * Used in: /fontanero master template
 * Future: Template for all service pages
 */

interface TrustStatsBlockProps {
  variant?: 'fontanero' | 'generic'
}

export function TrustStatsBlock({ variant = 'generic' }: TrustStatsBlockProps) {
  // Truthful stats only - no fabrication
  const stats = [
    {
      icon: '🏆',
      value: '+15 años',
      label: 'Experiencia profesional',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: '✅',
      value: '24/7/365',
      label: 'Disponibilidad total',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: '⚡',
      value: '30-60 min',
      label: 'Tiempo respuesta urgencias',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: '🛡️',
      value: '2 años',
      label: 'Garantía mano de obra',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: '📋',
      value: '600.000€',
      label: 'Seguro RC profesional',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: '🎓',
      value: 'Certificados',
      label: 'Profesionales cualificados',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: '🌍',
      value: 'Valencia',
      label: 'Cobertura metropolitana',
      color: 'bg-teal-50 text-teal-600'
    },
    {
      icon: '💰',
      value: 'Presupuesto',
      label: 'Gratuito sin compromiso',
      color: 'bg-amber-50 text-amber-600'
    }
  ]

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Tu Tranquilidad, Nuestra Prioridad
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.color} rounded-lg p-4 md:p-5 text-center transition-transform hover:scale-105`}
            >
              <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
              <div className="font-bold text-lg md:text-xl mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="max-w-3xl mx-auto">
            Profesionales certificados con experiencia demostrable. Cumplimos normativa CTE y REBT. 
            Todos nuestros trabajos incluyen garantía por escrito y seguro de responsabilidad civil.
          </p>
        </div>
      </div>
    </section>
  )
}
