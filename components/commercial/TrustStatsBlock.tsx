interface TrustStatsBlockProps {
  variant?: 'fontanero' | 'generic'
}

export function TrustStatsBlock(props: TrustStatsBlockProps) {
  void props.variant

  const heroStats = [
    {
      icon: '⚡',
      value: '30-60 min',
      label: 'Tiempo respuesta urgencias',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    {
      icon: '✓',
      value: '24/7/365',
      label: 'Disponibilidad total',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      icon: '🛡️',
      value: '6 meses',
      label: 'Garantía mano de obra',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
  ]

  const supportStats = [
    {
      icon: '🏆',
      value: '+15 años',
      label: 'Experiencia profesional',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: '📋',
      value: '600.000€',
      label: 'Seguro RC profesional',
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: '🎓',
      value: 'Certificados',
      label: 'Profesionales cualificados',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: '💶',
      value: 'Desde 49€',
      label: 'Presupuesto transparente',
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <section className="border-y border-gray-200 bg-white py-12">
      <div className="container-custom">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          Tu tranquilidad, nuestra prioridad
        </h2>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-xl p-6 text-center text-white shadow-lg transition-transform hover:scale-105 md:p-8`}
            >
              <div className="mb-3 text-5xl md:text-6xl">{stat.icon}</div>
              <div className="mb-2 text-2xl font-bold md:text-3xl">{stat.value}</div>
              <div className="text-sm opacity-95 md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {supportStats.map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-lg p-4 text-center transition-transform hover:scale-105`}>
              <div className="mb-2 text-2xl md:text-3xl">{stat.icon}</div>
              <div className="mb-1 text-base font-bold md:text-lg">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mx-auto max-w-3xl">
            Profesionales certificados con experiencia demostrable. Cumplimos normativa CTE y REBT.
            Todos nuestros trabajos incluyen garantía por escrito y seguro de responsabilidad civil.
          </p>
        </div>
      </div>
    </section>
  )
}
