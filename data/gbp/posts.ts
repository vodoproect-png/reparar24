export type GbpPostType = 'update' | 'offer' | 'service'

export type GbpPost = {
  id: string
  type: GbpPostType
  title: string
  body: string
  cta: 'CALL' | 'LEARN_MORE'
  url: string
  serviceId: string
  week: number
}

export const gbpPostCalendar: GbpPost[] = [
  {
    id: 'week-1-fontanero-urgente',
    type: 'service',
    title: 'Fontanero urgente en Valencia',
    body:
      'Si tienes una fuga, un grifo que no cierra o una cisterna averiada, Reparar24 atiende urgencias de fontaneria en Valencia con presupuesto previo.',
    cta: 'CALL',
    url: 'https://reparar24.es/fontanero',
    serviceId: 'fontanero-urgente',
    week: 1,
  },
  {
    id: 'week-1-electricista-urgente',
    type: 'service',
    title: 'Electricista 24 horas',
    body:
      'Revisamos saltos de diferencial, averias electricas, cuadros y enchufes con tecnicos identificados. Explicamos la causa del fallo, el presupuesto y la solucion antes de empezar.',
    cta: 'CALL',
    url: 'https://reparar24.es/electricista',
    serviceId: 'electricista-urgente',
    week: 1,
  },
  {
    id: 'week-2-desatascos',
    type: 'service',
    title: 'Desatascos con presupuesto previo',
    body:
      'Servicio de desatascos para tuberias, WC, fregaderos, arquetas y bajantes en Valencia. Atencion profesional y explicacion antes de intervenir.',
    cta: 'CALL',
    url: 'https://reparar24.es/desatascos',
    serviceId: 'desatascos',
    week: 2,
  },
  {
    id: 'week-2-aire-acondicionado',
    type: 'service',
    title: 'Aire acondicionado: instalacion y reparacion',
    body:
      'Tecnicos de climatizacion para instalacion, mantenimiento y reparacion de aire acondicionado en viviendas, locales y comunidades.',
    cta: 'LEARN_MORE',
    url: 'https://reparar24.es/aire-acondicionado',
    serviceId: 'aire-acondicionado',
    week: 2,
  },
  {
    id: 'week-3-calefaccion',
    type: 'service',
    title: 'Calefaccion y calderas',
    body:
      'Reparacion de calderas, radiadores que no calientan, purgado y mantenimiento de calefaccion. Servicio con presupuesto claro, factura y garantia en la intervencion.',
    cta: 'LEARN_MORE',
    url: 'https://reparar24.es/calefaccion',
    serviceId: 'calefaccion',
    week: 3,
  },
  {
    id: 'week-3-limpieza-tuberias',
    type: 'service',
    title: 'Limpieza preventiva de tuberias',
    body:
      'Mantenimiento de bajantes, arquetas y colectores para comunidades, hoteles, restaurantes y empresas con equipos profesionales.',
    cta: 'LEARN_MORE',
    url: 'https://reparar24.es/limpieza-tuberias',
    serviceId: 'limpieza-tuberias',
    week: 3,
  },
  {
    id: 'week-4-zonas-valencia',
    type: 'update',
    title: 'Servicio en Valencia y alrededores',
    body:
      'Reparar24 trabaja en Valencia, Torrent, Paterna, Mislata, Burjassot, Alboraya y zonas cercanas. Coordinamos reparaciones urgentes y servicios programados con respuesta rapida.',
    cta: 'CALL',
    url: 'https://reparar24.es',
    serviceId: 'brand',
    week: 4,
  },
  {
    id: 'week-4-garantia',
    type: 'update',
    title: 'Presupuesto previo y garantia',
    body:
      'Antes de intervenir explicamos el problema, la solucion y el presupuesto. Trabajos con factura, garantia y seguro profesional.',
    cta: 'CALL',
    url: 'https://reparar24.es',
    serviceId: 'brand',
    week: 4,
  },
]
