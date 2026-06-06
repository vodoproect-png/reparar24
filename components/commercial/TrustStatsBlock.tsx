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
  // Hero stats - most important for conversion
  const heroStats = [
    {
      icon: '⚡',
      value: '30-60 min',
      label: 'Tiempo respuesta urgencias',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      highlight: true
    },
    {
      icon: '✅',
      value: '24/7/365',
      label: 'Disponibilidad total',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      highlight: true
    },
    {
      icon: '🛡️',
      value: '2 años',
      label: 'Garantía mano de obra',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      highlight: true
    }
  ]

  // Supporting stats
  const supportStats = [
    {
      icon: '🏆',
      value: '+15 años',
      label: 'Experiencia profesional',
      color: 'bg-blue-50 text-blue-600'
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
      icon: '💰',
      value: 'Desde 49€',
      label: 'Presupuesto transparente',
      color: 'bg-amber-50 text-amber-600'
    }
  ]

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Tu Tranquilidad, Nuestra Prioridad
        </h2>
        
        {/* Hero Stats - Larger, more prominent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {heroStats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.color} text-white rounded-xl p-6 md:p-8 text-center transition-transform hover:scale-105 shadow-lg`}
            >
              <div className="text-5xl md:text-6xl mb-3">{stat.icon}</div>
              <div className="font-bold text-2xl md:text-3xl mb-2">{stat.value}</div>
              <div className="text-sm md:text-base opacity-95">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Supporting Stats - Smaller grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {supportStats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.color} rounded-lg p-4 text-center transition-transform hover:scale-105`}
            >
              <div className="text-2xl md:text-3xl mb-2">{stat.icon}</div>
              <div className="font-bold text-base md:text-lg mb-1">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
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
