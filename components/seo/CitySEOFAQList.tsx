'use client'

import { useState } from 'react'
import { CitySEOFAQ } from '@/data/city-seo-content'

interface CitySEOFAQListProps {
  faqs: CitySEOFAQ[]
  serviceName: string
  cityName: string
}

/**
 * City-specific FAQ list component
 * Displays FAQs for city landing pages with proper schema markup
 * Uses accordion style matching FAQSection for visual consistency
 */
export function CitySEOFAQList({ faqs }: CitySEOFAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQ schema for search engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ List - Accordion Style matching FAQSection */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            itemScope
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg pr-8" itemProp="name">
                {faq.question}
              </span>
              <span className="text-2xl text-primary-600 flex-shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div 
                className="px-6 pb-4 text-gray-600 animate-slide-up"
                itemScope 
                itemProp="acceptedAnswer" 
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
