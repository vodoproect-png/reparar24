'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2, Phone, RotateCcw, Share2 } from 'lucide-react'
import type {
  DiagnosticAnswer,
  DiagnosticOutcome,
  DiagnosticResult,
  DiagnosticScenario,
  RepairRoute,
  RepairStep,
} from '@/data/diagnostics/types'
import { getPhoneDisplay, getPhoneHref, getWhatsAppHref } from '@/lib/config/contact'
import type { DataLayerEvent } from '@/lib/analytics/gtm'

type DiagnosticEventName =
  | 'diagnostic_widget_view'
  | 'diagnostic_widget_start'
  | 'diagnostic_question_answer'
  | 'diagnostic_back'
  | 'diagnostic_complete'
  | 'diagnostic_result_view'
  | 'diagnostic_cta_click'
  | 'diagnostic_restart'
  | 'diagnostic_repair_route_view'
  | 'diagnostic_repair_route_start'
  | 'diagnostic_repair_step_complete'
  | 'diagnostic_repair_route_complete'
  | 'diagnostic_self_repair_success'
  | 'diagnostic_self_repair_partial'
  | 'diagnostic_self_repair_failed'
  | 'diagnostic_self_repair_skipped'
  | 'diagnostic_share_click'

type DiagnosticEventParams = {
  scenario_id: string
  article_slug: string
  service: string
  question_id?: string
  answer_id?: string
  result_id?: string
  severity?: string
  scenario_version?: number
  repair_route_id?: string
  repair_step_id?: string
  step?: number
  cta?: string
  difficulty?: string
  outcome?: string
}

type AnswerTrailItem = {
  questionId: string
  answerId: string
  label: string
}

function trackDiagnosticEvent(eventName: DiagnosticEventName, params: DiagnosticEventParams) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params } satisfies DataLayerEvent)

  const gtag = window.gtag as
    | ((command: 'event', eventName: string, params?: Record<string, string | number | boolean | undefined>) => void)
    | undefined

  if (typeof gtag === 'function') {
    gtag('event', eventName, params)
  }
}

export default function DiagnosticWidgetClient({ scenario }: { scenario: DiagnosticScenario }) {
  const questionsById = useMemo(
    () => new Map(scenario.questions.map((question) => [question.id, question])),
    [scenario.questions]
  )
  const resultsById = useMemo(
    () => new Map(scenario.results.map((result) => [result.id, result])),
    [scenario.results]
  )
  const firstQuestion = scenario.questions[0]
  const [hasStarted, setHasStarted] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(firstQuestion.id)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [answerTrail, setAnswerTrail] = useState<AnswerTrailItem[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [resultId, setResultId] = useState<string | null>(null)
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([])
  const [outcome, setOutcome] = useState<DiagnosticOutcome | null>(null)
  const [shareStatus, setShareStatus] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const hasTrackedStart = useRef(false)
  const hasTrackedView = useRef(false)
  const trackedResults = useRef(new Set<string>())
  const trackedRepairRoutes = useRef(new Set<string>())
  const startedRepairRoutes = useRef(new Set<string>())
  const completedRepairRoutes = useRef(new Set<string>())

  const currentQuestion = questionsById.get(currentQuestionId) ?? firstQuestion
  const result = resultId ? resultsById.get(resultId) ?? null : null
  const selectedRepairRoute = result ? selectRepairRoute(result, answerTrail) : null
  const progressStep = history.length + 1
  const totalSteps = Math.max(3, Math.min(7, scenario.questions.length))
  const phoneHref = getPhoneHref('fontanero')
  const phoneDisplay = getPhoneDisplay('fontanero')
  const whatsappHref = getWhatsAppHref(
    'Hola, necesito revisar una cisterna que pierde agua.',
    'fontanero'
  )

  useEffect(() => {
    const element = widgetRef.current
    if (!element || hasTrackedView.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return

        hasTrackedView.current = true
        trackDiagnosticEvent('diagnostic_widget_view', baseEventParams(scenario))
        observer.disconnect()
      },
      { threshold: 0.45 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [scenario])

  useEffect(() => {
    if (!hasStarted && !result) return

    window.setTimeout(() => headingRef.current?.focus(), 0)
  }, [currentQuestionId, hasStarted, result])

  useEffect(() => {
    if (!result || trackedResults.current.has(result.id)) return

    trackedResults.current.add(result.id)
    trackDiagnosticEvent('diagnostic_complete', {
      ...baseEventParams(scenario),
      result_id: result.id,
      severity: result.severity,
      step: progressStep,
    })
    trackDiagnosticEvent('diagnostic_result_view', {
      ...baseEventParams(scenario),
      result_id: result.id,
      severity: result.severity,
      step: progressStep,
    })
  }, [progressStep, result, scenario])

  useEffect(() => {
    if (!result || !selectedRepairRoute) return

    const routeKey = `${result.id}:${selectedRepairRoute.id}`
    if (trackedRepairRoutes.current.has(routeKey)) return

    trackedRepairRoutes.current.add(routeKey)
    trackDiagnosticEvent('diagnostic_repair_route_view', {
      ...baseEventParams(scenario),
      result_id: result.id,
      repair_route_id: selectedRepairRoute.id,
      difficulty: selectedRepairRoute.difficulty,
    })
  }, [result, scenario, selectedRepairRoute])

  function startWidget() {
    setHasStarted(true)

    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true
      trackDiagnosticEvent('diagnostic_widget_start', {
        ...baseEventParams(scenario),
        question_id: firstQuestion.id,
        step: 1,
      })
    }
  }

  function answerQuestion(answer: DiagnosticAnswer) {
    if (!hasStarted) startWidget()

    setSelectedAnswers((answers) => ({
      ...answers,
      [currentQuestion.id]: answer.id,
    }))
    setAnswerTrail((items) => [
      ...items.filter((item) => item.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, answerId: answer.id, label: answer.label },
    ])

    trackDiagnosticEvent('diagnostic_question_answer', {
      ...baseEventParams(scenario),
      question_id: currentQuestion.id,
      answer_id: answer.id,
      step: progressStep,
    })

    if (answer.resultId) {
      setCompletedStepIds([])
      setOutcome(null)
      setShareStatus('')
      setResultId(answer.resultId)
      return
    }

    if (answer.nextQuestionId && questionsById.has(answer.nextQuestionId)) {
      setHistory((items) => [...items, currentQuestion.id])
      setCurrentQuestionId(answer.nextQuestionId)
      return
    }

    setResultId('revision')
  }

  function goBack() {
    const previousQuestionId = history.at(-1)
    if (!previousQuestionId) return

    setResultId(null)
    setCurrentQuestionId(previousQuestionId)
    setHistory((items) => items.slice(0, -1))
    setAnswerTrail((items) => items.filter((item) => item.questionId !== currentQuestionId))

    trackDiagnosticEvent('diagnostic_back', {
      ...baseEventParams(scenario),
      question_id: previousQuestionId,
      step: Math.max(1, progressStep - 1),
    })
  }

  function restart() {
    setHasStarted(false)
    setCurrentQuestionId(firstQuestion.id)
    setSelectedAnswers({})
    setAnswerTrail([])
    setHistory([])
    setResultId(null)
    setCompletedStepIds([])
    setOutcome(null)
    setShareStatus('')
    trackedResults.current.clear()
    trackedRepairRoutes.current.clear()
    startedRepairRoutes.current.clear()
    completedRepairRoutes.current.clear()
    hasTrackedStart.current = false

    trackDiagnosticEvent('diagnostic_restart', baseEventParams(scenario))
  }

  function completeRepairStep(stepId: string) {
    if (!result || !selectedRepairRoute || completedStepIds.includes(stepId)) return

    const routeKey = `${result.id}:${selectedRepairRoute.id}`
    const nextCompletedStepIds = [...completedStepIds, stepId]
    setCompletedStepIds(nextCompletedStepIds)

    if (!startedRepairRoutes.current.has(routeKey)) {
      startedRepairRoutes.current.add(routeKey)
      trackDiagnosticEvent('diagnostic_repair_route_start', {
        ...baseEventParams(scenario),
        result_id: result.id,
        repair_route_id: selectedRepairRoute.id,
        difficulty: selectedRepairRoute.difficulty,
      })
    }

    trackDiagnosticEvent('diagnostic_repair_step_complete', {
      ...baseEventParams(scenario),
      result_id: result.id,
      repair_route_id: selectedRepairRoute.id,
      repair_step_id: stepId,
      difficulty: selectedRepairRoute.difficulty,
    })

    const routeStepIds = getAllRepairSteps(selectedRepairRoute).map((step) => step.id)
    const routeIsComplete = routeStepIds.every((id) => nextCompletedStepIds.includes(id))

    if (routeIsComplete && !completedRepairRoutes.current.has(routeKey)) {
      completedRepairRoutes.current.add(routeKey)
      trackDiagnosticEvent('diagnostic_repair_route_complete', {
        ...baseEventParams(scenario),
        result_id: result.id,
        repair_route_id: selectedRepairRoute.id,
        difficulty: selectedRepairRoute.difficulty,
      })
    }
  }

  function selectOutcome(nextOutcome: DiagnosticOutcome) {
    if (!result) return

    setOutcome(nextOutcome)
    trackDiagnosticEvent(`diagnostic_self_repair_${nextOutcome}`, {
      ...baseEventParams(scenario),
      result_id: result.id,
      repair_route_id: selectedRepairRoute?.id,
      difficulty: selectedRepairRoute?.difficulty,
      outcome: nextOutcome,
    })
  }

  async function shareGuide() {
    if (!result) return

    const shareUrl =
      typeof window === 'undefined'
        ? ''
        : `${window.location.origin}${window.location.pathname}#diagnostico-cisterna`
    const shareData = {
      title: scenario.title,
      text: result.title,
      url: shareUrl,
    }

    trackDiagnosticEvent('diagnostic_share_click', {
      ...baseEventParams(scenario),
      result_id: result.id,
      repair_route_id: selectedRepairRoute?.id,
      difficulty: selectedRepairRoute?.difficulty,
      outcome: outcome ?? undefined,
    })

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareStatus('Guía compartida.')
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setShareStatus('Enlace copiado.')
    } catch {
      setShareStatus('No se pudo compartir. Copia la URL de la página.')
    }
  }

  function trackCtaClick(label: 'solicitar_revision' | 'llamar_ahora') {
    trackDiagnosticEvent('diagnostic_cta_click', {
      ...baseEventParams(scenario),
      result_id: result?.id,
      severity: result?.severity,
      repair_route_id: selectedRepairRoute?.id,
      difficulty: selectedRepairRoute?.difficulty,
      step: progressStep,
      cta: label,
    })
  }

  return (
    <div
      ref={widgetRef}
      className="mt-6 overflow-hidden rounded-[24px] border border-[#BFD2F5] bg-white shadow-[0_24px_55px_-38px_rgba(37,99,235,0.55)]"
    >
      <div className="border-b border-[#E4ECFA] bg-[#F8FBFF] px-5 py-4 sm:px-6">
        <p className="text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
          Diagnóstico orientativo
        </p>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 text-2xl font-extrabold leading-tight text-[#0F2D75] outline-none"
        >
          {result ? result.title : hasStarted ? currentQuestion.text : scenario.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-[#5B6B8C]">
          {result ? result.summary : hasStarted ? scenario.disclaimer : scenario.subtitle}
        </p>
      </div>

      <div className="min-h-[360px] p-5 transition-[min-height] duration-200 sm:p-6">
        {!hasStarted && !result ? (
          <div aria-live="polite" className="space-y-5">
            <p className="rounded-2xl bg-[#EAF1FF] px-4 py-3 text-sm font-semibold leading-relaxed text-[#0F2D75]">
              {scenario.disclaimer}
            </p>
            <button
              type="button"
              onClick={startWidget}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-base font-extrabold text-white transition hover:bg-[#1D4FD7] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5] sm:w-auto"
            >
              {scenario.startButtonLabel}
            </button>
          </div>
        ) : result ? (
          <DiagnosticResultView
            phoneDisplay={phoneDisplay}
            phoneHref={phoneHref}
            result={result}
            repairRoute={selectedRepairRoute}
            answerTrail={answerTrail}
            completedStepIds={completedStepIds}
            outcome={outcome}
            onCtaClick={trackCtaClick}
            onOutcome={selectOutcome}
            onRestart={restart}
            onShare={shareGuide}
            onStepComplete={completeRepairStep}
            shareStatus={shareStatus}
            whatsappHref={whatsappHref}
          />
        ) : (
          <div aria-live="polite" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-[#5B6B8C]">
                Pregunta {Math.min(progressStep, totalSteps)} de {totalSteps}
              </p>
              <div
                aria-hidden="true"
                className="h-2 w-32 overflow-hidden rounded-full bg-[#E4ECFA]"
              >
                <div
                  className="h-full rounded-full bg-[#2563EB] transition-[width] duration-200"
                  style={{ width: `${(Math.min(progressStep, totalSteps) / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid gap-3">
              {currentQuestion.answers.map((answer) => {
                const isSelected = selectedAnswers[currentQuestion.id] === answer.id

                return (
                  <button
                    key={answer.id}
                    type="button"
                    onClick={() => answerQuestion(answer)}
                    className="min-h-12 rounded-2xl border border-[#DCE7F7] bg-[#FBFDFF] px-4 py-3 text-left text-base font-bold leading-snug text-[#0F2D75] transition hover:border-[#2563EB] hover:bg-[#EAF1FF] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5]"
                    aria-pressed={isSelected}
                  >
                    {answer.label}
                  </button>
                )
              })}
            </div>

            {history.length ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DCE7F7] bg-white px-4 py-2 text-sm font-extrabold text-[#0F2D75] transition hover:bg-[#F5F8FD] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al paso anterior
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

function DiagnosticResultView({
  answerTrail,
  completedStepIds,
  outcome,
  phoneDisplay,
  phoneHref,
  repairRoute,
  result,
  onCtaClick,
  onOutcome,
  onRestart,
  onShare,
  onStepComplete,
  shareStatus,
  whatsappHref,
}: {
  answerTrail: AnswerTrailItem[]
  completedStepIds: string[]
  outcome: DiagnosticOutcome | null
  phoneDisplay: string
  phoneHref: string
  repairRoute: RepairRoute | null
  result: DiagnosticResult
  onCtaClick: (label: 'solicitar_revision' | 'llamar_ahora') => void
  onOutcome: (outcome: DiagnosticOutcome) => void
  onRestart: () => void
  onShare: () => void
  onStepComplete: (stepId: string) => void
  shareStatus: string
  whatsappHref: string
}) {
  const nextRoute =
    outcome && result.nextRepairRouteByOutcome?.[outcome]
      ? result.repairRoutes?.find((route) => route.id === result.nextRepairRouteByOutcome?.[outcome])
      : null
  const shouldShowServiceCta =
    Boolean(outcome) &&
    (repairRoute?.difficulty === 'professional' || outcome === 'partial' || outcome === 'failed' || outcome === 'skipped')
  const allSteps = repairRoute ? getAllRepairSteps(repairRoute) : []

  return (
    <div aria-live="polite" className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className={severityClassName(result.severity)}>{severityLabel(result.severity)}</span>
        {repairRoute ? (
          <>
            <span className="inline-flex rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
              {difficultyLabel(repairRoute.difficulty)}
            </span>
            {repairRoute.estimatedTime ? (
              <span className="inline-flex rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
                {repairRoute.estimatedTime}
              </span>
            ) : null}
          </>
        ) : null}
      </div>

      <ResultList title="Origen más probable" items={[result.summary]} />

      <ResultList
        title="Por qué llegamos a esta conclusión"
        intro={result.reasoning?.intro}
        items={
          answerTrail.length
            ? [
                ...answerTrail.map((answer) => `Has indicado: ${answer.label}.`),
                ...(result.reasoning?.signals ?? []),
              ]
            : result.reasoning?.signals ?? []
        }
      />

      {result.inspectionSteps?.length ? (
        <section className="rounded-2xl border border-[#E4ECFA] bg-[#FBFDFF] p-4">
          <h4 className="text-lg font-extrabold leading-tight text-[#0F2D75]">
            Comprobaciones de diagnóstico
          </h4>
          <div className="mt-4 space-y-3">
            {result.inspectionSteps.map((step, index) => (
              <StepCard key={step.id} index={index + 1} step={step} />
            ))}
          </div>
        </section>
      ) : null}

      {repairRoute ? (
        <section className="rounded-2xl border border-[#E4ECFA] bg-[#FBFDFF] p-4">
          <h4 className="text-lg font-extrabold leading-tight text-[#0F2D75]">
            Ruta recomendada: {repairRoute.title}
          </h4>
          {repairRoute.professionalReason ? (
            <p className="mt-3 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold leading-relaxed text-orange-700">
              {repairRoute.professionalReason}
            </p>
          ) : null}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <ResultList title="Aplica cuando" items={repairRoute.appliesWhen} />
            <ResultList title="Herramientas" items={repairRoute.tools} />
            {repairRoute.parts?.length ? <ResultList title="Piezas" items={repairRoute.parts} /> : null}
            <ResultList title="Cuándo debes detenerte" items={repairRoute.stopConditions} />
          </div>

          {repairRoute.preparationSteps?.length ? (
            <div className="mt-5">
              <h5 className="text-base font-extrabold leading-tight text-[#0F2D75]">Preparación</h5>
              <div className="mt-3 space-y-3">
                {repairRoute.preparationSteps.map((step, index) => (
                  <RepairStepCard
                    key={step.id}
                    index={index + 1}
                    isComplete={completedStepIds.includes(step.id)}
                    step={step}
                    onStepComplete={onStepComplete}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-5">
            <h5 className="text-base font-extrabold leading-tight text-[#0F2D75]">
              {repairRoute.difficulty === 'professional' ? 'Acciones seguras' : 'Pasos de reparación'}
            </h5>
            <div className="mt-3 space-y-3">
              {repairRoute.repairSteps.map((step, index) => (
                <RepairStepCard
                  key={step.id}
                  index={(repairRoute.preparationSteps?.length ?? 0) + index + 1}
                  isComplete={completedStepIds.includes(step.id)}
                  step={step}
                  onStepComplete={onStepComplete}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <ResultList title="Cómo saber si ha funcionado" items={repairRoute.successCriteria} />
          </div>

          {allSteps.length ? (
            <p className="mt-4 text-sm font-semibold text-[#5B6B8C]">
              Pasos marcados: {allSteps.filter((step) => completedStepIds.includes(step.id)).length} de {allSteps.length}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-2xl border border-[#E4ECFA] bg-[#F8FBFF] p-4">
        <h4 className="text-lg font-extrabold leading-tight text-[#0F2D75]">
          ¿Has conseguido detener la fuga?
        </h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(['success', 'partial', 'failed', 'skipped'] as DiagnosticOutcome[]).map((nextOutcome) => (
            <button
              key={nextOutcome}
              type="button"
              onClick={() => onOutcome(nextOutcome)}
              aria-pressed={outcome === nextOutcome}
              className="min-h-11 rounded-xl border border-[#DCE7F7] bg-white px-3 py-2 text-left text-sm font-extrabold text-[#0F2D75] transition hover:bg-[#EAF1FF] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5] aria-pressed:border-[#2563EB] aria-pressed:bg-[#EAF1FF]"
            >
              {outcomeLabel(nextOutcome)}
            </button>
          ))}
        </div>
        {outcome ? (
          <div className="mt-3 space-y-3">
            <p className="rounded-xl bg-white px-3 py-2 text-sm font-semibold leading-relaxed text-[#31415F]">
              {result.outcomeMessages[outcome]}
            </p>
            {outcome === 'partial' && nextRoute && nextRoute.id !== repairRoute?.id ? (
              <p className="rounded-xl bg-white px-3 py-2 text-sm font-semibold leading-relaxed text-[#31415F]">
                Siguiente opción segura: {nextRoute.title}. Ten en cuenta que puede requerir desmontaje y piezas compatibles.
              </p>
            ) : null}
          </div>
        ) : null}
      </section>

      <div className="flex flex-col gap-3 rounded-2xl bg-[#F5F8FD] p-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onShare}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#DCE7F7] bg-white px-5 py-3 text-base font-extrabold text-[#0F2D75] transition hover:bg-[#EAF1FF] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5]"
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
          Compartir esta guía
        </button>
        {shouldShowServiceCta ? (
          <>
            <a
              href={whatsappHref}
              onClick={() => onCtaClick('solicitar_revision')}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#2563EB] px-5 py-3 text-base font-extrabold text-white transition hover:bg-[#1D4FD7] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5]"
            >
              Solicitar revisión
            </a>
            <a
              href={phoneHref}
              onClick={() => onCtaClick('llamar_ahora')}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-base font-extrabold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Llamar ahora {phoneDisplay}
            </a>
          </>
        ) : null}
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DCE7F7] bg-white px-5 py-3 text-base font-extrabold text-[#0F2D75] transition hover:bg-[#F5F8FD] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5]"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          Repetir la comprobación
        </button>
      </div>
      {shareStatus ? <p className="text-sm font-semibold text-[#5B6B8C]">{shareStatus}</p> : null}
    </div>
  )
}

function StepCard({
  index,
  step,
}: {
  index: number
  step: { title: string; instruction: string; warning?: string; expectedObservation?: string; completionCheck?: string }
}) {
  return (
    <div className="rounded-2xl border border-[#DCE7F7] bg-white p-4">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-sm font-extrabold text-[#2563EB]">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <h5 className="text-base font-extrabold text-[#0F2D75]">{step.title}</h5>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#31415F]">
            {step.instruction}
          </p>
          {step.warning ? (
            <p className="mt-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold leading-relaxed text-orange-700">
              Atención: {step.warning}
            </p>
          ) : null}
          {step.expectedObservation ?? step.completionCheck ? (
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#5B6B8C]">
              Comprueba: {step.expectedObservation ?? step.completionCheck}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function RepairStepCard({
  index,
  isComplete,
  step,
  onStepComplete,
}: {
  index: number
  isComplete: boolean
  step: RepairStep
  onStepComplete: (stepId: string) => void
}) {
  return (
    <div className="rounded-2xl border border-[#DCE7F7] bg-white p-4">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-sm font-extrabold text-[#2563EB]">
          {index}
        </span>
        <div className="min-w-0 flex-1">
          <h5 className="text-base font-extrabold text-[#0F2D75]">{step.title}</h5>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#31415F]">
            {step.instruction}
          </p>
          {step.warning ? (
            <p className="mt-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold leading-relaxed text-orange-700">
              Atención: {step.warning}
            </p>
          ) : null}
          {step.completionCheck ? (
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#5B6B8C]">
              Comprueba: {step.completionCheck}
            </p>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onStepComplete(step.id)}
        disabled={isComplete}
        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DCE7F7] bg-white px-4 py-2 text-sm font-extrabold text-[#0F2D75] transition hover:bg-[#F5F8FD] focus:outline-none focus:ring-4 focus:ring-[#BFD2F5] disabled:bg-[#EAF7EF] disabled:text-[#137A3D]"
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        {isComplete ? 'Paso marcado' : 'He completado este paso'}
      </button>
    </div>
  )
}

function ResultList({ intro, items, title }: { intro?: string; items: string[]; title: string }) {
  return (
    <div className="rounded-2xl border border-[#E4ECFA] bg-[#FBFDFF] p-4">
      <h4 className="text-base font-extrabold leading-tight text-[#0F2D75]">{title}</h4>
      {intro ? <p className="mt-3 text-sm font-semibold leading-relaxed text-[#5B6B8C]">{intro}</p> : null}
      <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-[#31415F]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function selectRepairRoute(result: DiagnosticResult, answerTrail: AnswerTrailItem[]) {
  if (!result.repairRoutes?.length) return null

  const selectedAnswersByQuestion = new Map(answerTrail.map((answer) => [answer.questionId, answer.answerId]))

  for (const rule of result.repairRouteRules ?? []) {
    const matches = rule.conditions.every((condition) => {
      const answerId = selectedAnswersByQuestion.get(condition.questionId)
      return answerId ? condition.answerIds.includes(answerId) : false
    })

    if (matches) {
      return result.repairRoutes.find((route) => route.id === rule.routeId) ?? null
    }
  }

  return (
    result.repairRoutes.find((route) => route.id === result.defaultRepairRouteId) ??
    result.repairRoutes[0]
  )
}

function getAllRepairSteps(route: RepairRoute) {
  return [...(route.preparationSteps ?? []), ...route.repairSteps]
}

function baseEventParams(scenario: DiagnosticScenario): DiagnosticEventParams {
  return {
    scenario_id: scenario.id,
    scenario_version: scenario.version,
    article_slug: scenario.articleSlug,
    service: scenario.service,
  }
}

function severityLabel(severity: DiagnosticResult['severity']) {
  if (severity === 'urgent') return 'Revisión recomendada cuanto antes'
  if (severity === 'service_recommended') return 'Servicio recomendado'
  return 'Resultado orientativo'
}

function severityClassName(severity: DiagnosticResult['severity']) {
  const base = 'inline-flex rounded-full px-4 py-2 text-sm font-extrabold'

  if (severity === 'urgent') {
    return `${base} bg-orange-100 text-orange-700`
  }

  if (severity === 'service_recommended') {
    return `${base} bg-[#EAF1FF] text-[#2563EB]`
  }

  return `${base} bg-[#EAF7EF] text-[#137A3D]`
}

function difficultyLabel(difficulty: RepairRoute['difficulty']) {
  if (difficulty === 'easy') return 'Fácil'
  if (difficulty === 'moderate') return 'Intermedio'
  return 'Recomendamos profesional'
}

function outcomeLabel(outcome: DiagnosticOutcome) {
  if (outcome === 'success') return 'Sí, la zona permanece seca'
  if (outcome === 'partial') return 'Ha mejorado, pero todavía aparece humedad'
  if (outcome === 'failed') return 'No, sigue perdiendo agua'
  return 'He preferido no continuar'
}
