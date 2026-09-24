import { cisternaGoteaScenario } from './cisterna-gotea'
import type { DiagnosticScenario } from './types'

export type DiagnosticScenarioId = 'cisterna-gotea'

export const diagnosticScenarios = {
  'cisterna-gotea': cisternaGoteaScenario,
} satisfies Record<DiagnosticScenarioId, DiagnosticScenario>

export function getDiagnosticScenario(id?: DiagnosticScenarioId): DiagnosticScenario | null {
  if (!id) return null

  const scenario = diagnosticScenarios[id]
  if (!scenario?.enabled) return null

  return scenario
}

export type { DiagnosticScenario }
