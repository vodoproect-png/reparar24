interface EmergencyBannerProps {
  phone?: string
  text?: string
  subtext?: string
  showPulse?: boolean
}

export default function EmergencyBanner({
  phone = '+34 900 000 000',
  text = 'Servicio de Emergencias 24/7',
  subtext = 'Respuesta en menos de 60 minutos',
  showPulse = true,
}: EmergencyBannerProps) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="container-custom py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {showPulse && (
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </div>
            )}
            <div>
              <div className="font-bold text-lg">{text}</div>
              {subtext && (
                <div className="text-sm text-red-100">{subtext}</div>
              )}
            </div>
          </div>
          
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="bg-white text-red-600 hover:bg-red-50 font-bold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
