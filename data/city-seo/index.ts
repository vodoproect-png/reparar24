import type { CitySEOContent } from './types.ts'
import { AireAcondicionadoCitySEOContent } from './aire-acondicionado.ts'
import { CalefaccionCitySEOContent } from './calefaccion.ts'
import { DesatascosCitySEOContent } from './desatascos.ts'
import { ElectricistaCitySEOContent } from './electricista.ts'
import { FontaneroCitySEOContent } from './fontanero.ts'
import { LimpiezaTuberiasCitySEOContent } from './limpieza-tuberias.ts'

export type { CitySEOContent, CitySEOFAQ } from './types.ts'

export const citySEOContent: CitySEOContent[] = [
  ...AireAcondicionadoCitySEOContent,
  ...CalefaccionCitySEOContent,
  ...DesatascosCitySEOContent,
  ...ElectricistaCitySEOContent,
  ...FontaneroCitySEOContent,
  ...LimpiezaTuberiasCitySEOContent,
]

const fontaneroCitySeoAppendix: Record<string, string> = {
  madrid:
    ' En la practica, una busqueda como fontanero Madrid, fontanero urgente Madrid o fontanero 24 horas Madrid suele venir de una averia concreta: una fuga activa, una cisterna que no corta, un atasco que afecta a cocina o bano, o una comunidad que necesita diagnostico antes de autorizar obra. Por eso la pagina de Madrid concentra demanda local amplia y no invade las paginas hijas: la reparacion de fugas, el cambio de tuberias, los grupos de presion o los calentadores conservan su propio propietario semantico. Aqui explicamos cobertura, urgencia, edificios antiguos y decision inicial para que el usuario llegue despues al servicio especifico adecuado.',
  barcelona:
    ' En Barcelona, las consultas de fontanero Barcelona, fontanero urgente Barcelona y fontanero 24 horas Barcelona mezclan urgencias domesticas, problemas de fincas antiguas y mantenimiento en viviendas de alquiler. Esta pagina funciona como entrada geo para toda la ciudad: orienta sobre humedad, corrosiones, ITE, patios interiores y accesos complicados, pero no compite con las paginas hijas de fugas, cisternas, grifos, tuberias o calentadores. El objetivo es resolver la primera duda local y dirigir al usuario hacia el servicio concreto cuando ya sabe si necesita una reparacion puntual, una sustitucion o una revision preventiva.',
  valencia:
    ' En Valencia, la demanda de fontanero Valencia, fontanero urgente Valencia y fontanero 24 horas Valencia se reparte entre centro historico, barrios residenciales, zonas costeras y comunidades con instalaciones de distintas epocas. Esta pagina mantiene el enfoque geo general: tiempos de llegada, barrios, salinidad, cal, urgencias y presupuesto previo. Las intenciones comerciales especificas quedan asignadas a sus paginas hijas, como reparacion de fugas, instalacion de sanitarios, cambio de grifos, reparacion de cisternas o desatascos, evitando que la pagina de ciudad intente posicionar por todas las reparaciones a la vez.',
  sevilla:
    ' En Sevilla, las busquedas de fontanero Sevilla, fontanero urgente Sevilla y fontanero 24 horas Sevilla suelen estar condicionadas por calor extremo, edificios del casco historico, viviendas tradicionales y negocios de hosteleria. La pagina de ciudad cubre el contexto local y la necesidad de respuesta rapida, pero separa claramente las especialidades: una fuga va a reparacion de fugas, un problema de presion a grupos de presion, una cisterna averiada a reparacion de cisternas y un atasco a la categoria de desatascos. Esa separacion ayuda a que cada URL tenga una funcion clara dentro del cluster.',
  malaga:
    ' En Malaga, el usuario que busca fontanero Malaga, fontanero urgente Malaga o fontanero 24 horas Malaga puede necesitar ayuda en una vivienda habitual, un apartamento turistico, un local del centro o una casa cercana al mar. Esta pagina resume los factores geo que condicionan el servicio: salinidad, corrosiones, temporada alta, viviendas vacias y mantenimiento preventivo. Las reparaciones concretas no se mezclan aqui de forma agresiva; se derivan a sus paginas hijas para mantener propietarios claros de keywords como cambio de grifos, sustitucion de tuberias, termos, bajantes, duchas o fugas.',
  zaragoza:
    ' En Zaragoza, las consultas de fontanero Zaragoza, fontanero urgente Zaragoza y fontanero 24 horas Zaragoza tienen un componente local muy marcado por heladas, cierzo, cambios bruscos de temperatura y edificios antiguos del centro. Esta pagina explica esos riesgos y actua como puerta de entrada geo para la ciudad, mientras que las paginas hijas conservan las intenciones transaccionales especificas. Asi, una rotura por helada puede terminar en reparacion de fugas o sustitucion de tuberias, pero el contexto de ciudad queda concentrado en esta URL para evitar canibalizacion con las paginas de servicio.',
}

function buildCityKeywordAppendix(content: CitySEOContent): string {
  const phrases = [
    ...(content.keywords.primary ?? []),
    ...(content.keywords.secondary ?? []),
    ...(content.keywords.longTail ?? []),
  ]
    .map((keyword) => keyword.trim())
    .filter(Boolean)

  const uniquePhrases = Array.from(new Set(phrases)).slice(0, 12)
  if (uniquePhrases.length === 0) return ''

  const cityName = content.citySlug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return ` Para cubrir correctamente la busqueda local en ${cityName}, esta pagina concentra consultas como ${uniquePhrases.join(', ')}. Usamos estas expresiones para orientar el diagnostico inicial, explicar cobertura por ciudad y derivar cada reparacion concreta a su pagina de servicio cuando la intencion ya es especifica.`
}

const citySeoContentIndex = new Map(
  citySEOContent.map((content) => [`${content.serviceId}:${content.citySlug}`, content])
)

export function getCitySEOContent(
  serviceId: string,
  citySlug: string
): CitySEOContent | undefined {
  const content = citySeoContentIndex.get(`${serviceId}:${citySlug}`)

  if (!content) return undefined

  const appendix = [
    serviceId === 'fontanero' ? fontaneroCitySeoAppendix[citySlug] : undefined,
    buildCityKeywordAppendix(content),
  ]
    .filter(Boolean)
    .join(' ')

  if (!appendix || content.seoText.includes(appendix)) return content

  return {
    ...content,
    seoText: `${content.seoText}${appendix}`,
  }
}

export function hasCitySEOContent(
  serviceId: string,
  citySlug: string
): boolean {
  return getCitySEOContent(serviceId, citySlug) !== undefined
}
