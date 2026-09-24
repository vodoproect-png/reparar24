import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import { type Locale } from '@/lib/i18n/config'
import {
  getBusinessAddress,
  getEmail,
  getPhoneDisplay,
  getPhoneHref,
  getWhatsAppHref,
} from '@/lib/config/contact'
import { getBankingInfo, getCompanyInfo, formatIBAN } from '@/lib/config/company'
import { generateLocalBusinessSchema, generateOrganizationSchema } from '@/lib/seo/schema'
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto Reparar24 | Telefono y WhatsApp en Valencia',
  description:
    'Contacta con Reparar24 en Valencia. Telefono 642 310 813, WhatsApp, email, direccion en Torrent, datos legales y formas de pago.',
  alternates: {
    canonical: 'https://reparar24.es/contacto',
  },
}

export async function generateStaticParams() {
  const locales: Locale[] = ['es']
  return locales.map((locale) => ({ locale }))
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const address = getBusinessAddress()
  const company = getCompanyInfo()
  const banking = getBankingInfo()
  const email = getEmail()
  const phoneDisplay = getPhoneDisplay()
  const phoneHref = getPhoneHref()
  const whatsappHref = getWhatsAppHref('Hola, necesito ayuda de Reparar24 en Valencia.')
  const mapsHref = 'https://maps.google.com/?q=Calle+Navas+de+Tolosa+9+Torrent+Valencia'
  const countryLabel = 'Espana'

  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Reparar24',
    description: 'Contacto de Reparar24 para fontaneria, electricidad, desatascos y reparaciones en Valencia',
  })
  const organizationSchema = generateOrganizationSchema()

  const contactCards = [
    {
      title: 'Telefono',
      value: phoneDisplay,
      note: 'Para avisos urgentes y consultas de servicio',
      href: phoneHref,
      label: 'Llamar ahora',
      icon: Phone,
      tone: 'blue',
    },
    {
      title: 'WhatsApp',
      value: phoneDisplay,
      note: 'Envia fotos, ubicacion y una descripcion del problema',
      href: whatsappHref,
      label: 'Abrir WhatsApp',
      icon: MessageCircle,
      tone: 'green',
      external: true,
    },
    {
      title: 'Email',
      value: email,
      note: 'Para documentacion, facturas y solicitudes no urgentes',
      href: `mailto:${email}`,
      label: 'Enviar email',
      icon: Mail,
      tone: 'orange',
    },
  ]

  const services = [
    'Fontaneria en Valencia',
    'Electricista en Valencia',
    'Desatascos y tuberias',
    'Calefaccion y climatizacion',
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Header locale={locale} />

      <main className="bg-[#F4F7FC]">
        <section className="w-full bg-white px-4 py-8 sm:px-6 lg:py-10">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                Contacto Reparar24
              </span>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
                Hablemos de tu reparacion en Valencia
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#4A5B7D]">
                Contacta con Reparar24 por telefono, WhatsApp o email. Atendemos avisos de fontaneria,
                electricidad, desatascos, calefaccion y climatizacion con presupuesto previo y datos de empresa claros.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-7 py-3.5 text-base font-bold text-white shadow-[0_16px_34px_-14px_rgba(37,99,235,0.8)] transition-colors hover:bg-[#1D4FD7]"
                >
                  <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                  Llamar {phoneDisplay}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22A45D] px-7 py-3.5 text-base font-bold text-white shadow-[0_16px_34px_-14px_rgba(34,164,93,0.8)] transition-colors hover:bg-[#1C8C4F]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#DCE7F7] bg-[#F7FAFF] p-5 shadow-[0_24px_55px_-30px_rgba(15,45,117,0.45)] sm:p-6">
              <div className="grid gap-3">
                {contactCards.map((item) => {
                  const Icon = item.icon
                  const tone =
                    item.tone === 'green'
                      ? 'bg-[#E3F5EC] text-[#16A34A]'
                      : item.tone === 'orange'
                        ? 'bg-[#FCEFDD] text-[#EA8A0C]'
                        : 'bg-[#E4EDFB] text-[#2563EB]'

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="group flex gap-4 rounded-2xl border border-[#E4ECF9] bg-white p-4 transition-shadow hover:shadow-[0_18px_35px_-24px_rgba(15,45,117,0.35)]"
                    >
                      <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${tone}`}>
                        <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold uppercase tracking-wide text-[#667796]">{item.title}</span>
                        <span className="mt-1 block break-words text-xl font-extrabold leading-tight text-[#0F2D75]">
                          {item.value}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#5B6B8C]">{item.note}</span>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB]">
                          {item.label}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-8 sm:px-6">
          <div className="mx-auto grid max-w-[1180px] gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] border border-[#E4ECF9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.22)]">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EDFB] text-[#2563EB]">
                  <MapPin className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-extrabold text-[#0F2D75]">Direccion</h2>
              </div>
              <p className="mt-4 leading-relaxed text-[#4A5B7D]">
                {address.streetAddress}<br />
                {address.postalCode} {address.addressLocality}<br />
                {address.addressRegion}, {countryLabel}
              </p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]"
              >
                Ver en Google Maps
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-[24px] border border-[#E4ECF9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.22)]">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3F5EC] text-[#16A34A]">
                  <Clock className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-extrabold text-[#0F2D75]">Horario</h2>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#E4ECF9] pb-2">
                  <dt className="font-bold text-[#3A4A6B]">Lunes - viernes</dt>
                  <dd className="text-[#5B6B8C]">08:00 - 20:00</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#E4ECF9] pb-2">
                  <dt className="font-bold text-[#3A4A6B]">Sabados</dt>
                  <dd className="text-[#5B6B8C]">09:00 - 14:00</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-[#3A4A6B]">Domingos y festivos</dt>
                  <dd className="text-[#5B6B8C]">Solo urgencias</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[24px] border border-[#E4ECF9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.22)]">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCEFDD] text-[#EA8A0C]">
                  <Wrench className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-extrabold text-[#0F2D75]">Servicios</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-2.5 text-sm font-medium text-[#4A5B7D]">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#2563EB]" strokeWidth={2.5} aria-hidden="true" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full bg-white px-4 py-9 sm:px-6">
          <div className="mx-auto grid max-w-[1180px] gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                Atencion local
              </span>
              <h2 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl">
                Contacto directo para reparaciones del hogar en Valencia
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#4A5B7D]">
                Reparar24 centraliza la atencion para avisos de fontaneria, electricidad, desatascos,
                calefaccion y aire acondicionado en Valencia. Antes de desplazar un tecnico, recogemos los
                datos basicos del problema, la ubicacion y la urgencia para orientar el servicio correcto.
              </p>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#4A5B7D]">
                Si puedes, envia por WhatsApp una foto de la averia, el tipo de inmueble y el barrio o municipio.
                Esa informacion ayuda a preparar herramientas, materiales y presupuesto previo con menos rodeos.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Respuesta clara', 'Te indicamos disponibilidad, pasos recomendados y presupuesto antes de intervenir.'],
                ['Cobertura Valencia', 'Atendemos Valencia ciudad, Torrent, area metropolitana y provincia segun disponibilidad.'],
                ['Datos verificados', 'Telefono, email, direccion, CIF e informacion bancaria se muestran de forma transparente.'],
                ['Seguimiento sencillo', 'Puedes continuar la conversacion por WhatsApp para enviar fotos o confirmar detalles.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[22px] border border-[#E4ECF9] bg-[#F7FAFF] p-5">
                  <h3 className="font-extrabold text-[#0F2D75]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6B8C]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-8 sm:px-6">
          <div className="mx-auto grid max-w-[1180px] gap-4 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#E4ECF9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.22)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EDFB] text-[#2563EB]">
                  <Building2 className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-[#0F2D75]">Informacion empresarial</h2>
                  <p className="text-sm text-[#667796]">Datos legales de Reparar24</p>
                </div>
              </div>

              <dl className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">Nombre legal</dt>
                  <dd className="mt-1 font-bold text-[#0F2D75]">{company.legalName}</dd>
                </div>
                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">Nombre comercial</dt>
                  <dd className="mt-1 font-bold text-[#0F2D75]">{company.tradeName}</dd>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">CIF</dt>
                    <dd className="mt-1 font-mono font-bold text-[#0F2D75]">{company.cif}</dd>
                  </div>
                  <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">NIE</dt>
                    <dd className="mt-1 font-mono font-bold text-[#0F2D75]">{company.nie}</dd>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">Domicilio social</dt>
                  <dd className="mt-1 leading-relaxed text-[#3A4A6B]">
                    {address.streetAddress}, {address.postalCode} {address.addressLocality}, {address.addressRegion}, {countryLabel}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[28px] border border-[#E4ECF9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.22)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3F5EC] text-[#16A34A]">
                  <CreditCard className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-[#0F2D75]">Informacion de pago</h2>
                  <p className="text-sm text-[#667796]">Transferencia bancaria directa</p>
                </div>
              </div>

              <dl className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">IBAN</dt>
                  <dd className="mt-1 break-all font-mono text-lg font-bold text-[#0F2D75]">{formatIBAN(banking.iban)}</dd>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">SWIFT/BIC</dt>
                    <dd className="mt-1 font-mono font-bold text-[#0F2D75]">{banking.swift}</dd>
                  </div>
                  <div className="rounded-2xl bg-[#F7FAFF] p-4">
                    <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">Banco</dt>
                    <dd className="mt-1 font-bold text-[#0F2D75]">{banking.bankName}</dd>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F7FAFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-[#667796]">Direccion del banco</dt>
                  <dd className="mt-1 leading-relaxed text-[#3A4A6B]">
                    {banking.bankAddress.street}, {banking.bankAddress.postalCode} {banking.bankAddress.city}, {banking.bankAddress.country}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="w-full bg-white px-4 py-9 sm:px-6">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Clock, title: 'Horario claro', text: 'Atencion comercial 08:00-20:00 y urgencias segun disponibilidad.' },
                { icon: FileText, title: 'Presupuesto previo', text: 'Explicamos el alcance antes de empezar el trabajo.' },
                { icon: Banknote, title: 'Pago documentado', text: 'Datos bancarios y de empresa visibles para clientes.' },
                { icon: ShieldCheck, title: 'Servicio local', text: 'Base en Torrent y cobertura en Valencia.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-[22px] border border-[#E4ECF9] bg-[#F7FAFF] p-5">
                    <Icon className="h-7 w-7 text-[#2563EB]" strokeWidth={2.25} aria-hidden="true" />
                    <h3 className="mt-4 font-extrabold text-[#0F2D75]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5B6B8C]">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <TrustCtaBlueV1 phoneHref={phoneHref} whatsappHref={whatsappHref} />
      </main>

      <Footer locale={locale} />
    </>
  )
}
