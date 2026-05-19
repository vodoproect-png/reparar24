import type { Locale } from '@/lib/i18n/config'

interface ReviewsSectionProps {
  locale: Locale
}

export default function ReviewsSection({ locale }: ReviewsSectionProps) {
  const reviews = [
    {
      name: 'María González',
      city: 'Madrid',
      service: 'Fontanería',
      rating: 5,
      comment: 'Excelente servicio. Llegaron en 40 minutos y solucionaron la fuga inmediatamente. Muy profesionales.',
      date: '2024-03-15'
    },
    {
      name: 'Carlos Martínez',
      city: 'Barcelona',
      service: 'Electricidad',
      rating: 5,
      comment: 'Electricista muy competente. Resolvió el problema eléctrico rápidamente y a buen precio.',
      date: '2024-03-10'
    },
    {
      name: 'Ana López',
      city: 'Valencia',
      service: 'Desatascos',
      rating: 5,
      comment: 'Servicio rápido y eficaz. Problema resuelto sin obras. Lo recomiendo 100%.',
      date: '2024-03-08'
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Opiniones de Clientes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de clientes satisfechos en toda España
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.city}</div>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-gray-600 mb-3 italic">
                &quot;{review.comment}&quot;
              </p>

              <div className="text-sm text-gray-500 flex items-center justify-between">
                <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                  {review.service}
                </span>
                <span>{new Date(review.date).toLocaleDateString(locale)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
