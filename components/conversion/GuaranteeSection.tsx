interface Guarantee {
  icon: string
  title: string
  description: string
}

export default function GuaranteeSection() {
  const guarantees: Guarantee[] = [
    {
      icon: '✅',
      title: 'Garantía de Satisfacción',
      description: 'Si no estás satisfecho con nuestro trabajo, lo corregimos sin coste adicional',
    },
    {
      icon: '🔒',
      title: 'Trabajo Garantizado',
      description: 'Todos nuestros servicios incluyen garantía por escrito de 6 meses',
    },
    {
      icon: '💳',
      title: 'Pago Seguro',
      description: 'Paga solo cuando estés 100% satisfecho con el trabajo realizado',
    },
    {
      icon: '📄',
      title: 'Presupuesto Detallado',
      description: 'Precio fijo sin sorpresas. Lo que presupuestamos es lo que pagas',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Nuestras Garantías
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu tranquilidad es nuestra prioridad. Trabajamos con total transparencia y compromiso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {guarantee.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {guarantee.title}
                  </h3>
                  <p className="text-gray-600">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-gray-900">Más de 10.000 clientes satisfechos</span>
          </div>
        </div>
      </div>
    </section>
  )
}
