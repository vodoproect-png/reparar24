import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay } from '@/lib/config/contact'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">Reparar24</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/fontanero`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Fontanería
            </Link>
            <Link href={`/${locale}/electricista`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Electricidad
            </Link>
            <Link href={`/${locale}/desatascos`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Desatascos
            </Link>
            <Link href={`/${locale}/aire-acondicionado`} className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Clima
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
  )
}
