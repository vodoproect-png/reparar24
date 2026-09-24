'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n/config'
import { faqs } from '@/data/faqs'

interface FAQSectionProps {
  locale: Locale
}

export default function FAQSection(props: FAQSectionProps) {
  void props.locale

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Preguntas frecuentes</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Resolvemos tus dudas sobre nuestros servicios
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-lg bg-white shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
              >
                <span className="pr-8 text-lg font-semibold">{faq.question}</span>
                <span className="flex-shrink-0 text-2xl text-primary-600">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className="animate-slide-up px-6 pb-4 text-gray-600">
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
