const DEFAULT_MIN_DESCRIPTION_LENGTH = 100
const DEFAULT_MAX_DESCRIPTION_LENGTH = 158

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function trimAtWordBoundary(value: string, maxLength: number): string {
  const normalized = normalizeWhitespace(value)
  if (normalized.length <= maxLength) return normalized

  const clipped = normalized.slice(0, maxLength).trim()
  const lastSpace = clipped.lastIndexOf(' ')
  let candidate = lastSpace > maxLength * 0.72 ? clipped.slice(0, lastSpace).trim() : clipped
  candidate = candidate.replace(/[,:;.!?]+$/, '').trim()

  const weakEnding = /\b(a|al|con|de|del|el|en|la|las|los|para|por|sin|un|una|y)$/i
  while (weakEnding.test(candidate)) {
    const previousSpace = candidate.lastIndexOf(' ')
    if (previousSpace < maxLength * 0.55) break
    candidate = candidate.slice(0, previousSpace).replace(/[,:;.!?]+$/, '').trim()
  }

  return candidate
}

export function fitMetaDescription(
  description: string,
  options: {
    minLength?: number
    maxLength?: number
    fallbackSuffix?: string
  } = {}
): string {
  const minLength = options.minLength ?? DEFAULT_MIN_DESCRIPTION_LENGTH
  const maxLength = options.maxLength ?? DEFAULT_MAX_DESCRIPTION_LENGTH
  const fallbackSuffix =
    options.fallbackSuffix ??
    'Servicio profesional con presupuesto previo.'

  let value = normalizeWhitespace(description)

  if (value.length < minLength) {
    value = normalizeWhitespace(`${value} ${fallbackSuffix}`)
  }

  value = trimAtWordBoundary(value, maxLength)

  if (!/[.!?]$/.test(value)) {
    value = `${value}.`
  }

  return value.length <= maxLength ? value : trimAtWordBoundary(value, maxLength - 1) + '.'
}

export function fitSeoTitle(title: string, maxLength = 70): string {
  const normalized = normalizeWhitespace(title)
  if (normalized.length <= maxLength) return normalized

  const brandSuffix = ' | Reparar24'
  if (normalized.endsWith(brandSuffix)) {
    const prefix = normalized.slice(0, -brandSuffix.length)
    return `${trimAtWordBoundary(prefix, maxLength - brandSuffix.length)}${brandSuffix}`
  }

  return trimAtWordBoundary(normalized, maxLength)
}
