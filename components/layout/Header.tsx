'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay } from '@/lib/config/contact'
import MobileMenu from './MobileMenu'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Spanish uses root-level URLs, other locales use prefix
  const localePrefix = locale === 'es' ? '' : `/${locale}`

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container-custom py-4">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between gap-1">
            {/* Logo - Left (lowered slightly for baseline alignment) */}
            <Link 
              href={localePrefix || '/'} 
              className="flex items-center flex-shrink-0 self-center pt-0.5"
              aria-label="Reparar24 - Inicio"
            >
              <span className="text-xl font-bold text-primary-600">Reparar24</span>
            </Link>

            {/* Clean Phone CTA - Middle (minimal style, shifted left for alignment) */}
            <a 
              href={getPhoneHref()} 
              className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-base transition-colors touch-target flex-shrink-0 -ml-4"
              aria-label={`Llamar al ${getPhoneDisplay()}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="whitespace-nowrap font-semibold">{getPhoneDisplay()}</span>
            </a>

            {/* Hamburger Menu - Right (enlarged) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-target flex-shrink-0"
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <Link href={localePrefix || '/'} className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">Reparar24</span>
            </Link>

            <div className="flex items-center space-x-8">
              <Link href={`${localePrefix}/fontanero`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Fontanería
              </Link>
              <Link href={`${localePrefix}/electricista`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Electricidad
              </Link>
              <Link href={`${localePrefix}/desatascos`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Desatascos
              </Link>
              <Link href={`${localePrefix}/aire-acondicionado`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Clima
              </Link>
              <Link href={`${localePrefix}/contacto`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                {locale === 'es' ? 'Contacto' : locale === 'en' ? 'Contact' : 'Контакты'}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href={getPhoneHref()} 
                className="btn-primary text-sm md:text-base"
              >
                📞 {getPhoneDisplay()}
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Popup */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  )
}
