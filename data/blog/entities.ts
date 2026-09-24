import type { BlogArticleBrief, BlogCategory } from './types'

export const BLOG_AUTHOR = {
  id: 'https://reparar24.es/#reparar24-editorial-team',
  name: 'Equipo tecnico Reparar24',
  url: 'https://reparar24.es/blog',
  description:
    'Equipo editorial tecnico de Reparar24 especializado en averias domesticas, mantenimiento preventivo y criterios practicos antes de llamar a un profesional.',
}

export const BLOG_PUBLISHER_ID = 'https://reparar24.es/#organization'

const serviceEntityNames: Record<string, string[]> = {
  fontanero: ['fontaneria', 'fontanero urgente', 'reparacion de fugas', 'averias de agua'],
  electricista: ['electricidad', 'electricista urgente', 'seguridad electrica', 'averias electricas'],
  desatascos: ['desatascos', 'atascos domesticos', 'saneamiento urgente', 'camion cuba'],
  'aire-acondicionado': ['aire acondicionado', 'climatizacion', 'mantenimiento de aire acondicionado'],
  calefaccion: ['calefaccion', 'calderas', 'radiadores', 'presion de caldera'],
  'limpieza-tuberias': ['limpieza de tuberias', 'bajantes', 'arquetas', 'camara CCTV'],
}

function normalizeEntity(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

function uniqueEntities(values: string[]) {
  return Array.from(
    new Set(
      values
        .map(normalizeEntity)
        .filter(Boolean)
        .map((value) => value.toLowerCase())
    )
  )
}

export function getBlogArticleEntities(article: BlogArticleBrief, category?: BlogCategory) {
  const baseEntities = [
    'Reparar24',
    'Valencia',
    category?.title ?? '',
    article.primaryKeyword,
    article.commercialOwner.replace(/^\/+/, '').replace(/-/g, ' '),
    ...(serviceEntityNames[article.serviceSlug] ?? []),
    ...article.secondaryKeywords,
  ]

  return {
    about: uniqueEntities([
      article.primaryKeyword,
      category?.title ?? '',
      ...(serviceEntityNames[article.serviceSlug] ?? []).slice(0, 2),
    ]).map((name) => ({ '@type': 'Thing', name })),
    mentions: uniqueEntities(baseEntities)
      .filter((name) => name !== article.primaryKeyword.toLowerCase())
      .slice(0, 12)
      .map((name) => ({ '@type': 'Thing', name })),
  }
}
