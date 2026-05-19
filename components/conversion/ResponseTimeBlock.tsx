interface ResponseTimeBlockProps {
  time?: string
  title?: string
  description?: string
  variant?: 'compact' | 'detailed'
}

export default function ResponseTimeBlock({
  time = '30-60 min',
  title = 'Tiempo de Respuesta',
  description = 'Nuestro equipo estará en tu ubicación',
  variant = 'compact',
}: ResponseTimeBlockProps) {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-lg px-4 py-3">
        <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-green-900 text-lg">{time}</div>
          <div className="text-sm text-green-700">{title}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full text-white mb-4 shadow-lg">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-4xl font-bold text-green-900 mb-2">{time}</div>
      <div className="text-lg font-semibold text-green-800 mb-1">{title}</div>
      <div className="text-sm text-green-700">{description}</div>
      <div className="mt-4 pt-4 border-t border-green-200">
        <div className="flex items-center justify-center gap-2 text-sm text-green-700">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Garantizado</span>
        </div>
      </div>
    </div>
  )
}
