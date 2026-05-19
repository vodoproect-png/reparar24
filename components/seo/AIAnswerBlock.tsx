/**
 * AI Answer Block Component
 * 
 * Optimized for:
 * - Google AI Overviews
 * - Featured Snippets
 * - Conversational Search
 * - LLM Extraction
 * 
 * Structure follows best practices for AI-friendly content:
 * - Direct answer first
 * - Semantic HTML
 * - Clear hierarchy
 * - Concise, conversational tone
 */

import React from 'react'

interface AIAnswerBlockProps {
  question: string
  answer: string
  detailedAnswer?: string
  className?: string
}

export function AIAnswerBlock({ 
  question, 
  answer, 
  detailedAnswer,
  className = '' 
}: AIAnswerBlockProps) {
  return (
    <div className={`ai-answer-block ${className}`} itemScope itemType="https://schema.org/Question">
      <h3 
        className="text-xl font-semibold text-neutral-900 mb-3"
        itemProp="name"
      >
        {question}
      </h3>
      
      <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
        {/* Direct Answer - Optimized for AI Extraction */}
        <p 
          className="text-lg text-neutral-700 font-medium mb-4"
          itemProp="text"
        >
          {answer}
        </p>
        
        {/* Detailed Answer - Optional Expansion */}
        {detailedAnswer && (
          <div className="text-base text-neutral-600 leading-relaxed">
            {detailedAnswer}
          </div>
        )}
      </div>
    </div>
  )
}

interface AIAnswerListProps {
  questions: Array<{
    question: string
    answer: string
    detailedAnswer?: string
  }>
  className?: string
}

export function AIAnswerList({ questions, className = '' }: AIAnswerListProps) {
  return (
    <section className={`ai-answer-list space-y-8 ${className}`}>
      {questions.map((qa, index) => (
        <AIAnswerBlock
          key={index}
          question={qa.question}
          answer={qa.answer}
          detailedAnswer={qa.detailedAnswer}
        />
      ))}
    </section>
  )
}

/**
 * Common AI-optimized Q&A for Reparar24
 */

export const commonEmergencyQuestions = {
  es: [
    {
      question: '¿Cuánto cuesta un fontanero urgente en Valencia?',
      answer: 'Un fontanero urgente en Valencia cuesta entre 60-120€ para servicios de emergencia 24h, dependiendo del tipo de reparación.',
      detailedAnswer: 'El precio incluye desplazamiento y la primera hora de trabajo. Reparaciones sencillas como grifos o cisternas suelen estar en el rango inferior, mientras que fugas graves o desatascos complejos pueden requerir presupuestos superiores.'
    },
    {
      question: '¿Cuánto tarda en llegar un fontanero de urgencia?',
      answer: 'Un fontanero de urgencia llega en 30-60 minutos en Valencia ciudad y principales zonas metropolitanas.',
      detailedAnswer: 'El tiempo puede variar según la ubicación exacta y el tráfico. En distritos céntricos como Ciutat Vella o l\'Eixample, el tiempo suele ser de 30-45 minutos. En zonas periféricas puede extenderse hasta 60 minutos.'
    },
    {
      question: '¿Qué hacer si una tubería pierde agua?',
      answer: 'Si una tubería pierde agua, cierra inmediatamente la llave de paso general, coloca un cubo para recoger el agua y llama a un fontanero urgente.',
      detailedAnswer: 'Mientras esperas: seca el suelo para evitar daños, identifica la ubicación exacta de la fuga, y si es posible, cierra la llave de paso específica de esa zona. No intentes reparaciones temporales con cintas o adhesivos si la fuga es importante, ya que pueden empeorar el problema.'
    },
    {
      question: '¿Cuándo llamar a un electricista urgente?',
      answer: 'Llama a un electricista urgente si hay chispas, olor a quemado, cortes de luz frecuentes, o si el diferencial salta constantemente.',
      detailedAnswer: 'Estos son síntomas de problemas eléctricos serios que pueden causar incendios. También es urgente si hay cables expuestos, enchufes que chisporrotean, o si recibes descargas al tocar electrodomésticos. En estos casos, desconecta la corriente del cuadro general y llama inmediatamante.'
    }
  ],
  en: [
    {
      question: 'How much does an emergency plumber cost in Valencia?',
      answer: 'An emergency plumber in Valencia costs between €60-120 for 24h emergency services, depending on the type of repair.',
      detailedAnswer: 'The price includes travel and the first hour of work. Simple repairs like taps or cisterns are usually in the lower range, while serious leaks or complex blockages may require higher quotes.'
    }
  ],
  ru: [
    {
      question: 'Сколько стоит срочный сантехник в Валенсии?',
      answer: 'Срочный сантехник в Валенсии стоит от 60 до 120 евро за экстренную службу 24 часа, в зависимости от типа ремонта.',
      detailedAnswer: 'Цена включает выезд и первый час работы. Простой ремонт, такой как краны или бачки, обычно находится в нижнем диапазоне, в то время как серьезные утечки или сложные засоры могут потребовать более высоких цен.'
    }
  ]
}
