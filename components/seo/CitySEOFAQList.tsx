import { CitySEOFAQ } from '@/data/city-seo-content'

interface CitySEOFAQListProps {
  faqs: CitySEOFAQ[]
  serviceName: string
  cityName: string
}

/**
 * City-specific FAQ list component
 * Displays FAQs for city landing pages with proper schema markup
 */
export function CitySEOFAQList({ faqs, serviceName, cityName }: CitySEOFAQListProps) {
  if (!faqs || faqs.length === 0) return null

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

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="card hover:shadow-lg transition-shadow"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3
              className="text-xl font-bold mb-3 text-gray-900"
              itemProp="name"
            >
              {faq.question}
            </h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p className="text-gray-700 leading-relaxed" itemProp="text">
                {faq.answer}
              </p>
            </div>
            {faq.category && (
              <span className="inline-block mt-3 text-sm text-primary-600 font-medium">
                {faq.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
