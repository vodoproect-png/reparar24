"use client"

import { useState } from "react"
import { HelpCircle, Phone, ChevronDown } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

export interface FaqSectionV2Props {
  faqs?: FaqItem[]
}

export default function FaqSectionV2({ faqs }: FaqSectionV2Props = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  // Strict conditional rendering - no fallback content in production
  if (!faqs?.length) return null

  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E3ECFB] px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#2563EB]">
            <HelpCircle className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            Preguntas frecuentes
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
            Resolvemos Tus Dudas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-[#5B6B8C] sm:text-xl">
            Respuestas claras sobre nuestros servicios profesionales
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-4 flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[20px] border border-[#EAF0F9] bg-white shadow-[0_16px_40px_-28px_rgba(15,45,117,0.3)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-bold text-[#0F2D75] sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[#2563EB] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-[#5B6B8C]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA card */}
        <div className="mt-4 flex flex-col items-center gap-6 rounded-[28px] border border-[#EAF0F9] bg-white px-6 py-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-extrabold leading-tight text-[#0F2D75] sm:text-2xl">
              ¿No encuentras la respuesta?
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5B6B8C]">
              Llámanos o escríbenos por WhatsApp.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:w-auto lg:flex-shrink-0">
            <a
              href="tel:+34641688524"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#F97316] px-5 py-3.5 text-white shadow-[0_14px_30px_-14px_rgba(249,115,22,0.7)] transition-colors duration-200 hover:bg-[#EA6A0F]"
            >
              <Phone className="h-5 w-5 flex-shrink-0" strokeWidth={2.25} aria-hidden="true" />
              <span className="flex flex-col leading-tight text-left">
                <span className="text-base font-bold">Llamar ahora</span>
                <span className="text-sm font-medium text-white/90">641 688 524</span>
              </span>
            </a>
            <a
              href="https://wa.me/34641688524"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#22C55E] px-5 py-3.5 text-white shadow-[0_14px_30px_-14px_rgba(34,197,94,0.7)] transition-colors duration-200 hover:bg-[#1FB055]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 fill-white" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.51-.17-.01-.37-.01-.56-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.2-.56-.34zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4zm8-17.4A11.32 11.32 0 0 0 12.03 0C5.65 0 .46 5.19.46 11.57c0 2.04.53 4.03 1.54 5.79L.36 24l6.79-1.78a11.52 11.52 0 0 0 5.51 1.4h.01c6.38 0 11.57-5.19 11.57-11.57 0-3.09-1.2-5.99-3.39-8.18z" />
              </svg>
              <span className="flex flex-col leading-tight text-left">
                <span className="text-base font-bold">WhatsApp</span>
                <span className="text-sm font-medium text-white/90">Respuesta inmediata</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
