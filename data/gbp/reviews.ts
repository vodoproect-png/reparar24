export type GbpReviewReplyTemplate = {
  id: string
  rating: 1 | 2 | 3 | 4 | 5
  intent: 'positive' | 'neutral' | 'negative'
  reply: string
}

export const gbpReviewReplyTemplates: GbpReviewReplyTemplate[] = [
  {
    id: 'positive-5',
    rating: 5,
    intent: 'positive',
    reply:
      'Gracias por confiar en Reparar24. Nos alegra saber que el servicio fue rapido y claro. Seguimos a vuestra disposicion para cualquier reparacion en Valencia.',
  },
  {
    id: 'positive-4',
    rating: 4,
    intent: 'positive',
    reply:
      'Gracias por tu valoracion. Tomamos nota para seguir mejorando y nos alegra haber podido ayudarte con la reparacion.',
  },
  {
    id: 'neutral-3',
    rating: 3,
    intent: 'neutral',
    reply:
      'Gracias por compartir tu experiencia. Revisaremos internamente el caso para mejorar la comunicacion y el servicio en proximas intervenciones.',
  },
  {
    id: 'negative-1-2',
    rating: 1,
    intent: 'negative',
    reply:
      'Sentimos que la experiencia no haya sido la esperada. Por favor, contacta con nuestro equipo para revisar el caso y buscar una solucion adecuada.',
  },
]
