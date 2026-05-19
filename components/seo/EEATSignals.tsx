/**
 * EEAT Signals Component
 * 
 * Demonstrates Experience, Expertise, Authoritativeness, and Trust
 * for Google's Quality Rater Guidelines and AI understanding.
 * 
 * Lightweight components that can be reused across pages to strengthen
 * trustworthiness and domain authority signals.
 */

import React from 'react'

/**
 * Service Guarantee Block
 * Signals: Trust, Transparency
 */
export function ServiceGuaranteeBlock() {
  return (
    <div className="service-guarantee bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1 text-2xl">🛡️</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Garantía de Servicio
          </h3>
          <p className="text-neutral-700 mb-3">
            Todos nuestros servicios incluyen garantía de satisfacción. Si no estás conforme con el trabajo realizado, lo corregimos sin coste adicional.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Profesionales certificados y asegurados</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Materiales de primera calidad</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Presupuesto transparente sin sorpresas</span>
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
export function ResponseTimeBlock() {
  return (
    <div className="response-time bg-amber-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 text-2xl">⏱️</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Tiempo de Respuesta
          </h3>
          <p className="text-neutral-700">
            <strong>30-60 minutos</strong> en Valencia ciudad y área metropolitana. Servicio de emergencia 24 horas, 365 días al año.
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
}

export function LocalExpertiseBlock({ city, yearsExperience = 15 }: LocalExpertiseProps) {
  return (
    <div className="local-expertise bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 text-green-600 flex-shrink-0 mt-1 text-2xl">🏆</div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Expertos Locales en {city}
          </h3>
          <p className="text-neutral-700">
            Con más de <strong>{yearsExperience} años de experiencia</strong> en {city}, conocemos perfectamente las instalaciones típicas de la zona, los problemas más comunes y las soluciones más efectivas.
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
export function ProcessTransparencyBlock() {
  return (
    <div className="process-transparency">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Nuestro Proceso de Trabajo
      </h3>
      <ol className="space-y-4">
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            1
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">Llamada y Diagnóstico Inicial</h4>
            <p className="text-neutral-600 text-sm">
              Evaluamos el problema por teléfono y te orientamos sobre la urgencia y el coste aproximado.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            2
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">Desplazamiento Rápido</h4>
            <p className="text-neutral-600 text-sm">
              Llegamos a tu domicilio en 30-60 minutos con todas las herramientas necesarias.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            3
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">Inspección y Presupuesto</h4>
            <p className="text-neutral-600 text-sm">
              Inspeccionamos el problema, te explicamos la solución y te damos un presupuesto claro antes de empezar.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            4
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">Reparación Profesional</h4>
            <p className="text-neutral-600 text-sm">
              Realizamos el trabajo con materiales de calidad y dejamos todo limpio y funcionando.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
            5
          </span>
          <div>
            <h4 className="font-semibold text-neutral-900 mb-1">Garantía y Seguimiento</h4>
            <p className="text-neutral-600 text-sm">
              Te entregamos factura y garantía por escrito. Seguimiento post-servicio para asegurar tu satisfacción.
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
  city?: string
  showGuarantee?: boolean
  showResponseTime?: boolean
  showExpertise?: boolean
  showProcess?: boolean
}

export function EEATSection({
  city,
  showGuarantee = true,
  showResponseTime = true,
  showExpertise = true,
  showProcess = false
}: EEATSectionProps) {
  return (
    <section className="eeat-section space-y-6 my-12">
      {showResponseTime && <ResponseTimeBlock />}
      {showGuarantee && <ServiceGuaranteeBlock />}
      {showExpertise && city && <LocalExpertiseBlock city={city} />}
      {showProcess && <ProcessTransparencyBlock />}
    </section>
  )
}
