/**
 * PaymentInfo Component
 * 
 * Reusable component for displaying banking/payment information.
 * Used on contact page, invoices, payment pages, etc.
 */

'use client'

import { useState } from 'react'
import { getBankingInfo, formatIBAN, getIBANRaw } from '@/lib/config/company'

interface PaymentInfoProps {
  locale?: string
  showCopyButton?: boolean
}

export default function PaymentInfo({ locale = 'es', showCopyButton = true }: PaymentInfoProps) {
  const banking = getBankingInfo()
  const [copied, setCopied] = useState(false)

  const handleCopyIBAN = async () => {
    try {
      await navigator.clipboard.writeText(getIBANRaw())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy IBAN:', err)
    }
  }

  const labels = {
    es: {
      title: 'Información de Pago',
      subtitle: 'Transferencia bancaria directa',
      iban: 'IBAN',
      swift: 'SWIFT/BIC',
      bank: 'Banco',
      copyIBAN: 'Copiar IBAN',
      copied: '¡Copiado!',
    },
    en: {
      title: 'Payment Information',
      subtitle: 'Direct bank transfer',
      iban: 'IBAN',
      swift: 'SWIFT/BIC',
      bank: 'Bank',
      copyIBAN: 'Copy IBAN',
      copied: 'Copied!',
    },
    ru: {
      title: 'Платежная информация',
      subtitle: 'Прямой банковский перевод',
      iban: 'IBAN',
      swift: 'SWIFT/BIC',
      bank: 'Банк',
      copyIBAN: 'Копировать IBAN',
      copied: 'Скопировано!',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.es

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-primary-50">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* IBAN */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">{t.iban}</span>
            {showCopyButton && (
              <button
                onClick={handleCopyIBAN}
                className="text-xs px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors flex items-center gap-1"
                aria-label={t.copyIBAN}
              >
                {copied ? (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t.copied}
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {t.copyIBAN}
                  </>
                )}
              </button>
            )}
          </div>
          <p className="font-mono text-lg font-semibold text-gray-900 break-all">
            {formatIBAN(banking.iban)}
          </p>
        </div>

        {/* SWIFT */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <span className="text-sm font-semibold text-gray-600 block mb-2">{t.swift}</span>
          <p className="font-mono text-lg font-semibold text-gray-900">
            {banking.swift}
          </p>
        </div>

        {/* Bank Name */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <span className="text-sm font-semibold text-gray-600 block mb-2">{t.bank}</span>
          <p className="font-medium text-gray-900">{banking.bankName}</p>
          <p className="text-sm text-gray-600 mt-1">
            {banking.bankAddress.street}<br />
            {banking.bankAddress.postalCode} {banking.bankAddress.city}<br />
            {banking.bankAddress.country}
          </p>
        </div>
      </div>
    </div>
  )
}
