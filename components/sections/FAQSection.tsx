'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n/config'
import { faqs } from '@/data/faqs'

interface FAQSectionProps {
  locale: Locale
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestros servicios
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">
                  {faq.question}
                </span>
                <span className="text-2xl text-primary-600 flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
