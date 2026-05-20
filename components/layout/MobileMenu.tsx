'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getWhatsAppHref } from '@/lib/config/contact'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  locale: Locale
}

interface AccordionItemProps {
  title: string
  icon: string
  children: React.ReactNode
}

function AccordionItem({ title, icon, children }: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Cerrar' : 'Abrir'} menú ${title}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-4 py-2 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  )
}

export default function MobileMenu({ isOpen, onClose, locale }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup Menu */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] max-w-md h-[70vh] bg-white rounded-lg shadow-2xl z-[70] overflow-hidden flex flex-col md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-primary-600 text-white">
          <h2 className="text-lg font-bold">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-700 rounded-full transition-colors touch-target"
            aria-label="Cerrar menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Inicio */}
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">🏠</span>
            <span className="font-semibold text-gray-900">Inicio</span>
          </Link>

          {/* Servicios Accordion */}
          <AccordionItem title="Servicios" icon="🔧">
            <div className="space-y-1">
              <Link
                href={`/${locale}/fontanero`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                💧 Fontanería
              </Link>
              <Link
                href={`/${locale}/electricista`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                ⚡ Electricidad
              </Link>
              <Link
                href={`/${locale}/desatascos`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                🚰 Desatascos
              </Link>
              <Link
                href={`/${locale}/aire-acondicionado`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                ❄️ Clima
              </Link>
              <Link
                href={`/${locale}/caldera`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                🔥 Calderas
              </Link>
              <Link
                href={`/${locale}/aire-acondicionado`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                🌬️ Aire Acondicionado
              </Link>
              <Link
                href={`/${locale}`}
                onClick={onClose}
                className="block py-2 px-2 mt-2 text-primary-600 font-semibold hover:underline"
              >
                → Ver todos los servicios
              </Link>
            </div>
          </AccordionItem>

          {/* Ciudades Accordion */}
          <AccordionItem title="Ciudades" icon="📍">
            <div className="space-y-1">
              <Link
                href={`/${locale}/servicios/valencia`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Valencia
              </Link>
              <Link
                href={`/${locale}/servicios/torrent`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Torrent
              </Link>
              <Link
                href={`/${locale}/servicios/paterna`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Paterna
              </Link>
              <Link
                href={`/${locale}/servicios/mislata`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Mislata
              </Link>
              <Link
                href={`/${locale}/servicios/gandia`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Gandía
              </Link>
              <Link
                href={`/${locale}/servicios/sagunto`}
                onClick={onClose}
                className="block py-2 px-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-primary-600"
              >
                Sagunto
              </Link>
              <Link
                href={`/${locale}`}
                onClick={onClose}
                className="block py-2 px-2 mt-2 text-primary-600 font-semibold hover:underline"
              >
                → Ver todas las zonas
              </Link>
            </div>
          </AccordionItem>

          {/* Contacto */}
          <Link
            href={`/${locale}/contacto`}
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">📧</span>
            <span className="font-semibold text-gray-900">
              {locale === 'es' ? 'Contacto' : locale === 'en' ? 'Contact' : 'Контакты'}
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🌐</span>
              <span className="font-semibold text-gray-900">Idioma</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Link
                href="/es"
                onClick={onClose}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'es'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ES
              </Link>
              <Link
                href="/en"
                onClick={onClose}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'en'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                EN
              </Link>
              <Link
                href="/ru"
                onClick={onClose}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'ru'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                RU
              </Link>
            </div>
          </div>

          {/* Contact CTAs */}
          <div className="px-4 py-4 space-y-2 bg-gray-50">
            <a
              href={getPhoneHref()}
              className="flex items-center justify-center gap-2 w-full py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-lg transition-colors shadow-md touch-target"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              📞 Llamar {getPhoneDisplay()}
            </a>
            <a
              href={getWhatsAppHref('Hola, necesito información')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-md touch-target"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
