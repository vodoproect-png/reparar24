import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPhoneHref, getPhoneDisplay } from '@/lib/config/contact'

export default function NotFound() {
  return (
    <>
      <Header locale="es" />
      <main className="flex-1 bg-white">
        <section className="container-custom py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-primary-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-600">
              Error 404
            </span>
            <h1 className="mt-6 text-5xl font-black leading-tight text-primary-900 lg:text-7xl">
              Pagina no encontrada
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-slate-600">
              La direccion que has abierto no existe o ha cambiado. Puedes volver al inicio,
              revisar nuestros servicios o llamarnos para una reparacion urgente.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/" className="btn-primary">
                Volver al inicio
              </Link>
              <a href={getPhoneHref()} className="btn-emergency">
                Llamar {getPhoneDisplay()}
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { href: '/fontanero', title: 'Fontaneria', text: 'Fugas, grifos, cisternas e instalaciones.' },
              { href: '/electricista', title: 'Electricidad', text: 'Averias, cuadros, enchufes y revisiones.' },
              { href: '/desatascos', title: 'Desatascos', text: 'Tuberias, WC, fregaderos y camion cuba.' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card-flat">
                <h2 className="text-2xl text-primary-900">{item.title}</h2>
                <p className="mt-2 text-base text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer locale="es" />
    </>
  )
}
