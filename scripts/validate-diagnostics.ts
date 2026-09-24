const assert = require('assert')
const { BLOG_ARTICLE_BRIEFS } = require('../data/blog/topics')
const { cisternaGoteaScenario } = require('../data/diagnostics/cisterna-gotea')

const diagnosticScenarios = {
  'cisterna-gotea': cisternaGoteaScenario,
}

type Scenario = (typeof diagnosticScenarios)[keyof typeof diagnosticScenarios]

const errors: string[] = []

function check(condition: unknown, message: string) {
  try {
    assert.ok(condition, message)
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error))
  }
}

function validateScenario(scenario: Scenario) {
  const questionIds = new Set(scenario.questions.map((question: { id: string }) => question.id))
  const resultIds = new Set(scenario.results.map((result: { id: string }) => result.id))
  const visitedQuestions = new Set<string>()
  const reachedResults = new Set<string>()

  check(scenario.enabled === true, `${scenario.id}: scenario must be enabled`)
  check(scenario.version === 3, `${scenario.id}: scenario version must be 3`)
  check(scenario.questions.length > 0, `${scenario.id}: scenario needs questions`)
  check(scenario.results.length > 0, `${scenario.id}: scenario needs results`)
  check(Boolean(scenario.fallback?.rows?.length), `${scenario.id}: fallback rows are required`)

  for (const question of scenario.questions) {
    check(!visitedQuestions.has(question.id), `${scenario.id}: duplicate question ${question.id}`)
    visitedQuestions.add(question.id)
    check(question.answers.length > 0, `${scenario.id}: question ${question.id} needs answers`)

    for (const answer of question.answers) {
      check(
        Boolean(answer.nextQuestionId) !== Boolean(answer.resultId),
        `${scenario.id}: answer ${question.id}/${answer.id} must point to one question or one result`
      )

      if (answer.nextQuestionId) {
        check(
          questionIds.has(answer.nextQuestionId),
          `${scenario.id}: answer ${question.id}/${answer.id} points to missing question ${answer.nextQuestionId}`
        )
      }

      if (answer.resultId) {
        reachedResults.add(answer.resultId)
        check(
          resultIds.has(answer.resultId),
          `${scenario.id}: answer ${question.id}/${answer.id} points to missing result ${answer.resultId}`
        )
      }
    }
  }

  checkNoQuestionCycles(scenario, scenario.questions[0].id, new Set(), new Set())

  for (const result of scenario.results) {
    check(reachedResults.has(result.id), `${scenario.id}: result ${result.id} is not reachable`)
    check(
      ['informational', 'service_recommended', 'urgent'].includes(result.severity),
      `${scenario.id}: result ${result.id} has invalid severity`
    )
    check(Boolean(result.reasoning?.signals?.length), `${scenario.id}: result ${result.id} needs reasoning signals`)
    check(
      Boolean(result.inspectionSteps?.length),
      `${scenario.id}: result ${result.id} needs diagnostic inspection steps`
    )
    check(Boolean(result.repairRoutes?.length), `${scenario.id}: result ${result.id} needs repair routes`)

    const routeIds = new Set((result.repairRoutes ?? []).map((route: { id: string }) => route.id))
    if (result.defaultRepairRouteId) {
      check(
        routeIds.has(result.defaultRepairRouteId),
        `${scenario.id}: result ${result.id} default route is missing`
      )
    }

    for (const rule of result.repairRouteRules ?? []) {
      check(routeIds.has(rule.routeId), `${scenario.id}: result ${result.id} rule points to missing route ${rule.routeId}`)
      check(rule.conditions.length > 0, `${scenario.id}: result ${result.id} route rule needs conditions`)
      for (const condition of rule.conditions) {
        check(
          questionIds.has(condition.questionId),
          `${scenario.id}: result ${result.id} rule points to missing question ${condition.questionId}`
        )
        check(condition.answerIds.length > 0, `${scenario.id}: result ${result.id} rule needs answer ids`)
      }
    }

    for (const route of result.repairRoutes ?? []) {
      check(
        ['easy', 'moderate', 'professional'].includes(route.difficulty),
        `${scenario.id}: route ${route.id} has invalid difficulty`
      )
      check(route.appliesWhen.length > 0, `${scenario.id}: route ${route.id} needs appliesWhen`)
      check(route.tools.length > 0, `${scenario.id}: route ${route.id} needs tools`)
      check(route.repairSteps.length > 0, `${scenario.id}: route ${route.id} needs repair steps`)
      check(route.successCriteria.length > 0, `${scenario.id}: route ${route.id} needs success criteria`)
      check(route.stopConditions.length > 0, `${scenario.id}: route ${route.id} needs stop conditions`)
      if (route.difficulty === 'professional') {
        check(
          Boolean(route.professionalReason),
          `${scenario.id}: professional route ${route.id} needs professional reason`
        )
      }
    }

    for (const outcome of ['success', 'partial', 'failed', 'skipped']) {
      check(
        Boolean(result.outcomeMessages[outcome]),
        `${scenario.id}: result ${result.id} needs ${outcome} outcome message`
      )
    }
  }
}

function checkNoQuestionCycles(
  scenario: Scenario,
  questionId: string,
  visiting: Set<string>,
  visited: Set<string>
) {
  if (visited.has(questionId)) return

  check(!visiting.has(questionId), `${scenario.id}: question graph contains a cycle at ${questionId}`)
  if (visiting.has(questionId)) return

  visiting.add(questionId)
  const question = scenario.questions.find((item: { id: string }) => item.id === questionId)
  if (!question) return

  for (const answer of question.answers) {
    if (answer.nextQuestionId) {
      checkNoQuestionCycles(scenario, answer.nextQuestionId, visiting, visited)
    }
  }

  visiting.delete(questionId)
  visited.add(questionId)
}

for (const scenario of Object.values(diagnosticScenarios) as Scenario[]) {
  validateScenario(scenario)
}

const cisternArticle = BLOG_ARTICLE_BRIEFS.find(
  (article: { slug: string; categorySlug: string }) =>
    article.categorySlug === 'fontaneria' && article.slug === 'por-que-gotea-cisterna'
)

check(Boolean(cisternArticle), 'target article must exist')
check(
  cisternArticle?.diagnosticScenarioId === 'cisterna-gotea',
  'target article must reference cisterna-gotea'
)
check(
  cisternArticle?.diagnosticPlacement === 'after-hero',
  'target article must place diagnostic widget after hero'
)

const cisternQuestions = new Set(cisternaGoteaScenario.questions.map((question: { id: string }) => question.id))
for (const requiredQuestion of ['union-movimiento', 'union-tornillos', 'union-cuando-agua', 'union-grieta']) {
  check(cisternQuestions.has(requiredQuestion), `cisterna-gotea: missing ${requiredQuestion}`)
}

const unionResult = cisternaGoteaScenario.results.find((result: { id: string }) => result.id === 'junta-union')
const unionRoutes = new Set((unionResult?.repairRoutes ?? []).map((route: { id: string }) => route.id))
for (const requiredRoute of [
  'ajuste-fijaciones',
  'sustituir-juntas-tornillos',
  'sustituir-junta-central',
  'profesional',
  'observacion',
]) {
  check(unionRoutes.has(requiredRoute), `cisterna-gotea: missing repair route ${requiredRoute}`)
}

check(
  (unionResult?.repairRouteRules ?? []).length >= 7,
  'cisterna-gotea: union result needs route selection rules'
)

function resolveRouteId(result: any, answers: Record<string, string>) {
  for (const rule of result.repairRouteRules ?? []) {
    const matches = rule.conditions.every((condition: { questionId: string; answerIds: string[] }) =>
      condition.answerIds.includes(answers[condition.questionId])
    )

    if (matches) return rule.routeId
  }

  return result.defaultRepairRouteId
}

if (unionResult) {
  check(
    resolveRouteId(unionResult, {
      'union-movimiento': 'ligero',
      'union-tornillos': 'buen-estado',
      'union-grieta': 'no',
    }) === 'ajuste-fijaciones',
    'cisterna-gotea: slight wobble route must select ajuste-fijaciones'
  )
  check(
    resolveRouteId(unionResult, {
      'union-tornillos': 'buen-estado',
      'union-cuando-agua': 'junto-tornillo',
      'union-grieta': 'no',
    }) === 'sustituir-juntas-tornillos',
    'cisterna-gotea: bolt leak route must select sustituir-juntas-tornillos'
  )
  check(
    resolveRouteId(unionResult, {
      'union-movimiento': 'estable',
      'union-cuando-agua': 'despues-descargar',
      'union-grieta': 'no',
    }) === 'sustituir-junta-central',
    'cisterna-gotea: central seam route must select sustituir-junta-central'
  )
  check(
    resolveRouteId(unionResult, { 'union-tornillos': 'oxido' }) === 'profesional',
    'cisterna-gotea: rust route must select profesional'
  )
  check(
    resolveRouteId(unionResult, { 'union-grieta': 'si' }) === 'profesional',
    'cisterna-gotea: crack route must select profesional'
  )
  check(
    resolveRouteId(unionResult, { 'union-movimiento': 'no-comprobar' }) === 'observacion',
    'cisterna-gotea: insufficient data route must select observacion'
  )
}

if (errors.length) {
  console.error(`Diagnostic validation failed with ${errors.length} error(s):`)
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('Diagnostic validation passed')
