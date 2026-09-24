import { AlertTriangle, ClipboardCheck } from 'lucide-react'
import type { DiagnosticScenario } from '@/data/diagnostics/types'
import { getPhoneHref, getWhatsAppHref } from '@/lib/config/contact'
import DiagnosticWidgetClient from './DiagnosticWidgetClient'

export default function DiagnosticWidget({ scenario }: { scenario: DiagnosticScenario }) {
  const whatsappHref = getWhatsAppHref(
    'Hola, necesito revisar una cisterna que pierde agua.',
    'fontanero'
  )

  return (
    <section
      id="diagnostico-cisterna"
      className="rounded-[28px] border border-[#BFD2F5] bg-white p-6 shadow-[0_24px_55px_-36px_rgba(37,99,235,0.5)] sm:p-8"
      data-diagnostic-scenario={scenario.id}
      data-diagnostic-version={scenario.version}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Comprobación guiada
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0F2D75]">
            {scenario.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[#5B6B8C]">{scenario.subtitle}</p>
          <p className="mt-2 text-base leading-relaxed text-[#5B6B8C]">{scenario.disclaimer}</p>
        </div>
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold leading-relaxed text-[#6B3D10] lg:max-w-xs">
          <AlertTriangle className="mb-2 h-5 w-5 text-orange-600" aria-hidden="true" />
          Si hay agua en el suelo o riesgo para otra vivienda, corta el uso de la cisterna y pide revisión.
        </div>
      </div>

      <DiagnosticWidgetClient scenario={scenario} />

      <div className="mt-6 rounded-[24px] border border-[#E4ECFA] bg-[#F8FBFF] p-5">
        <h3 className="text-xl font-extrabold text-[#0F2D75]">{scenario.fallback.title}</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-[#5B6B8C]">
              <tr>
                <th className="border-b border-[#DCE7F7] pb-3 pr-4 font-extrabold">Señal</th>
                <th className="border-b border-[#DCE7F7] pb-3 pr-4 font-extrabold">Origen posible</th>
                <th className="border-b border-[#DCE7F7] pb-3 font-extrabold">Paso prudente</th>
              </tr>
            </thead>
            <tbody>
              {scenario.fallback.rows.map((row) => (
                <tr key={row.symptom}>
                  <td className="border-b border-[#E4ECFA] py-3 pr-4 font-bold text-[#0F2D75]">
                    {row.symptom}
                  </td>
                  <td className="border-b border-[#E4ECFA] py-3 pr-4 font-medium text-[#31415F]">
                    {row.possibleOrigin}
                  </td>
                  <td className="border-b border-[#E4ECFA] py-3 font-medium text-[#31415F]">
                    {row.nextStep}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <noscript>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-base font-extrabold text-white"
            >
              Solicitar revisión
            </a>
            <a
              href={getPhoneHref('fontanero')}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-base font-extrabold text-white"
            >
              Llamar ahora
            </a>
          </div>
        </noscript>
      </div>
    </section>
  )
}
