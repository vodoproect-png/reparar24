interface Badge {
  icon: string
  title: string
  description: string
}

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid'
  className?: string
}

export default function TrustBadges({ 
  variant = 'horizontal',
  className = '' 
}: TrustBadgesProps) {
  const badges: Badge[] = [
    {
      icon: '✓',
      title: 'Profesionales Certificados',
      description: 'Equipo cualificado y con licencias',
    },
    {
      icon: '⚡',
      title: 'Respuesta Rápida',
      description: '30-60 minutos de llegada',
    },
    {
      icon: '💰',
      title: 'Precio Transparente',
      description: 'Sin sorpresas ni costes ocultos',
    },
    {
      icon: '🛡️',
      title: 'Garantía de Servicio',
      description: 'Trabajo garantizado por escrito',
    },
  ]

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border-2 border-gray-100 hover:border-primary-200 transition-colors"
          >
            <div className="text-3xl text-primary-600 mb-2">{badge.icon}</div>
            <div className="font-semibold text-gray-900 mb-1">{badge.title}</div>
            <div className="text-sm text-gray-600">{badge.description}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
          <div className="text-2xl">{badge.icon}</div>
          <div>
            <div className="font-semibold text-sm">{badge.title}</div>
            <div className="text-xs opacity-90">{badge.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
