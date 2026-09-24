export type OutreachDecision = 'submit_profile' | 'request_mention' | 'pitch_article' | 'negotiate_paid' | 'skip'

export type OutreachTemplate = {
  id: string
  decision: OutreachDecision
  subject: string
  body: string
}

export const outreachBudgetPolicy = {
  mode: 'aggressiveManaged',
  maxPaidPlacementEur: 120,
  preferredPaidPlacementEur: 40,
  maxExactCommercialAnchorsPerWave: 2,
  maxDofollowPaidPlacementsPerWave: 6,
  manualReviewAboveRiskScore: 45,
}

export const outreachTemplates: OutreachTemplate[] = [
  {
    id: 'citation-submit',
    decision: 'submit_profile',
    subject: 'Alta de empresa local Reparar24',
    body: [
      'Hola,',
      '',
      'Queremos dar de alta ATG S.L. en vuestro directorio, con Reparar24 como marca comercial.',
      'Somos una empresa de reparaciones urgentes en Valencia: fontaneria, electricidad, desatascos, climatizacion, calefaccion y limpieza de tuberias.',
      '',
      'Datos:',
      'Empresa: ATG S.L.',
      'Marca comercial: Reparar24',
      'Web: https://reparar24.es',
      'Telefono: +34 642 310 813',
      'Direccion: Calle Navas de Tolosa, 9, 46901 Torrent, Valencia, Espana',
      '',
      'Gracias.',
    ].join('\n'),
  },
  {
    id: 'local-mention',
    decision: 'request_mention',
    subject: 'Reparar24 como recurso local de reparaciones urgentes',
    body: [
      'Hola,',
      '',
      'Estoy revisando recursos locales sobre reparaciones del hogar y he visto vuestro contenido.',
      'Reparar24 trabaja en Valencia con servicios de fontaneria, electricidad, desatascos y climatizacion 24/7.',
      '',
      'Si actualizais la pagina o preparais una guia de servicios del hogar, podemos aportar informacion practica sobre tiempos de respuesta, precios orientativos y prevencion de averias.',
      '',
      'Web: https://reparar24.es',
      '',
      'Gracias por revisarlo.',
    ].join('\n'),
  },
  {
    id: 'article-pitch',
    decision: 'pitch_article',
    subject: 'Propuesta de contenido practico sobre reparaciones del hogar',
    body: [
      'Hola,',
      '',
      'Os propongo un contenido practico para vuestra audiencia: una guia sobre costes, urgencias y mantenimiento del hogar en Valencia.',
      'Podemos preparar un texto util, sin tono publicitario, con recomendaciones de fontaneria, electricidad, desatascos y climatizacion.',
      '',
      'La mencion a Reparar24 puede ir como fuente o recurso local.',
      'Web: https://reparar24.es',
      '',
      'Si os encaja, preparo una propuesta de titulo y estructura.',
    ].join('\n'),
  },
  {
    id: 'paid-placement',
    decision: 'negotiate_paid',
    subject: 'Consulta colaboracion editorial',
    body: [
      'Hola,',
      '',
      'Nos interesa valorar una colaboracion editorial en vuestra web relacionada con servicios del hogar y reparaciones.',
      'Buscamos una publicacion natural, con contexto real para el usuario, evitando contenido duplicado o puramente promocional.',
      '',
      'Proyecto: Reparar24 (ATG S.L.)',
      'Web: https://reparar24.es',
      '',
      'Podeis indicarnos condiciones, precio y tipo de enlace disponible?',
      '',
      'Gracias.',
    ].join('\n'),
  },
]
