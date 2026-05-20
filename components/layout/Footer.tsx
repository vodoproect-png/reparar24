import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { getPhoneHref, getPhoneDisplay, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Reparar24</h3>
            <p className="text-sm mb-4">
              Servicios profesionales de fontanería, electricidad y reparaciones disponibles las 24 horas del día en toda España.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                📷
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${locale}/${service.slug}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ciudades</h4>
            <ul className="space-y-2 text-sm">
              {cities.slice(0, 6).map((city) => (
                <li key={city.id}>
                  <Link 
                    href={`/${locale}/servicios/${city.slug}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={getPhoneHref()} className="hover:text-primary-400 transition-colors">
                  📞 {getPhoneDisplay()}
                </a>
              </li>
              <li>
                <a href={`mailto:${getEmail()}`} className="hover:text-primary-400 transition-colors">
                  ✉️ {getEmail()}
                </a>
              </li>
              <li className="text-gray-400">
                📍 {getBusinessAddress().streetAddress}<br />
                {getBusinessAddress().postalCode} {getBusinessAddress().addressLocality}<br />
                {getBusinessAddress().addressRegion}
              </li>
              <li className="text-gray-400">
                🕐 Disponible 24/7
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {getCompanyInfo().legalName} - CIF: {getCompanyInfo().cif}</p>
          <p className="text-gray-500 mt-1 text-xs">Torrent, Valencia, España</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacidad" className="hover:text-primary-400 transition-colors">
              Política de Privacidad
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terminos" className="hover:text-primary-400 transition-colors">
              Términos y Condiciones
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/cookies" className="hover:text-primary-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
