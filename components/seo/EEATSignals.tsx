/**
 * EEAT Signals Component - MULTILINGUAL
 * 
 * Demonstrates Experience, Expertise, Authoritativeness, and Trust
 * for Google's Quality Rater Guidelines and AI understanding.
 * 
 * Updated to support EN/RU locales via shared-components.ts
 */

import React from 'react'
import type { Locale } from '@/lib/i18n/config'
import { getSharedTranslations } from '@/lib/i18n/shared-components'

/**
 * Service Guarantee Block
 * Signals: Trust, Transparency
 */
interface ServiceGuaranteeBlockProps {
  locale: Locale
}

export function ServiceGuaranteeBlock({ locale }: ServiceGuaranteeBlockProps) {
  const t = getSharedTranslations(locale)
  
  return (
    <div className="service-guarantee bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 text-2xl">🛡️</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {t.serviceGuaranteeTitle}
          </h3>
          <p className="text-neutral-700 mb-3">
            {t.serviceGuaranteeDesc}
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>{t.certifiedProfessionals}</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>{t.qualityMaterials}</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>{t.transparentBudget}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * Response Time Block
 * Signals: Experience, Reliability
 */
interface ResponseTimeBlockProps {
  locale: Locale
}

export function ResponseTimeBlock({ locale }: ResponseTimeBlockProps) {
  const t = getSharedTranslations(locale)
  
  return (
    <div className="response-time bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 text-2xl">⏱️</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {t.responseTimeTitle}
          </h3>
          <p className="text-neutral-700">
            {t.responseTimeDesc}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Local Expertise Block
 * Signals: Experience, Authority
 */
interface LocalExpertiseProps {
  city: string
  yearsExperience?: number
  locale: Locale
}

export function LocalExpertiseBlock({ city, yearsExperience = 15, locale }: LocalExpertiseProps) {
  const t = getSharedTranslations(locale)
  
  return (
    <div className="local-expertise bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-green-600 flex-shrink-0 mt-1 text-2xl">🏆</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {t.localExpertsTitle} {city}
          </h3>
          <p className="text-neutral-700">
            {t.localExpertsDesc(yearsExperience, city)}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Process Transparency Block
 * Signals: Trust, Expertise
 */
interface ProcessTransparencyBlockProps {
  locale: Locale
}

export function ProcessTransparencyBlock({ locale }: ProcessTransparencyBlockProps) {
  const t = getSharedTranslations(locale)
  
  return (
    <div className="process-transparency">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        {t.processTitle}
      </h3>
      <ol className="space-y-4">
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            1
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{t.processStep1Title}</h4>
            <p className="text-neutral-600 text-sm">
              {t.processStep1Desc}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            2
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{t.processStep2Title}</h4>
            <p className="text-neutral-600 text-sm">
              {t.processStep2Desc}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            3
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{t.processStep3Title}</h4>
            <p className="text-neutral-600 text-sm">
              {t.processStep3Desc}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            4
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{t.processStep4Title}</h4>
            <p className="text-neutral-600 text-sm">
              {t.processStep4Desc}
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            5
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">{t.processStep5Title}</h4>
            <p className="text-neutral-600 text-sm">
              {t.processStep5Desc}
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}

/**
 * Combined EEAT Section
 * Can be used on service pages to demonstrate trust signals
 */
interface EEATSectionProps {
  locale: Locale
  city?: string
  showGuarantee?: boolean
  showResponseTime?: boolean
  showExpertise?: boolean
  showProcess?: boolean
}

export function EEATSection({
  locale,
  city,
  showGuarantee = true,
  showResponseTime = true,
  showExpertise = true,
  showProcess = false
}: EEATSectionProps) {
  return (
    <section className="eeat-section space-y-6 my-12">
      {showResponseTime && <ResponseTimeBlock locale={locale} />}
      {showGuarantee && <ServiceGuaranteeBlock locale={locale} />}
      {showExpertise && city && <LocalExpertiseBlock city={city} locale={locale} />}
      {showProcess && <ProcessTransparencyBlock locale={locale} />}
    </section>
  )
}
