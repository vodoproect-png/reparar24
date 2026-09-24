export type DiagnosticSeverity = 'informational' | 'service_recommended' | 'urgent'
export type RepairDifficulty = 'easy' | 'moderate' | 'professional'
export type DiagnosticOutcome = 'success' | 'partial' | 'failed' | 'skipped'

export interface DiagnosticAnswer {
  id: string
  label: string
  nextQuestionId?: string
  resultId?: string
}

export interface DiagnosticQuestion {
  id: string
  text: string
  answers: DiagnosticAnswer[]
}

export interface DiagnosticResult {
  id: string
  severity: DiagnosticSeverity
  title: string
  summary: string
  reasoning?: {
    intro?: string
    signals: string[]
  }
  inspectionSteps?: InspectionStep[]
  repairRoutes?: RepairRoute[]
  repairRouteRules?: RepairRouteRule[]
  defaultRepairRouteId?: string
  nextRepairRouteByOutcome?: Partial<Record<DiagnosticOutcome, string>>
  relatedServiceSlug?: string
  outcomeMessages: Record<DiagnosticOutcome, string>
}

export interface InspectionStep {
  id: string
  title: string
  instruction: string
  expectedObservation?: string
  warning?: string
}

export interface RepairStep {
  id: string
  title: string
  instruction: string
  warning?: string
  completionCheck?: string
}

export interface RepairRoute {
  id: string
  title: string
  appliesWhen: string[]
  difficulty: RepairDifficulty
  estimatedTime?: string
  tools: string[]
  parts?: string[]
  preparationSteps?: RepairStep[]
  repairSteps: RepairStep[]
  successCriteria: string[]
  stopConditions: string[]
  professionalReason?: string
}

export interface RepairRouteRule {
  routeId: string
  conditions: Array<{
    questionId: string
    answerIds: string[]
  }>
}

export interface DiagnosticScenario {
  id: string
  version: number
  enabled: boolean
  articleSlug: string
  service: string
  title: string
  subtitle: string
  disclaimer: string
  startButtonLabel: string
  questions: DiagnosticQuestion[]
  results: DiagnosticResult[]
  fallback: {
    title: string
    rows: Array<{
      symptom: string
      possibleOrigin: string
      nextStep: string
    }>
  }
}
