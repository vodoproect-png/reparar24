/**
 * City Hub SEO Content
 *
 * Pages: /servicios/{city}
 * Intent: users comparing all Reparar24 services in one city.
 *
 * Anti-cannibalization:
 * - City hubs own multi-service intent: "servicios profesionales", "reparaciones del hogar", "urgencias 24h".
 * - Service+city pages own single-service intent: "fontanero Madrid", "electricista Madrid", etc.
 * - Copy must link users to service-specific city pages instead of explaining each trade in deep detail.
 */

export interface CityHubSEOContent {
  citySlug: string
  headline: string
  intro: string
  seoText: string
  faqs: CityHubFAQ[]
  localContext: string
  semanticOwnership: string[]
}

export interface CityHubFAQ {
  question: string
  answer: string
  category: 'servicios' | 'cobertura' | 'urgencias' | 'precio' | 'general'
}

const cityProfiles: Record<string, {
  cityName: string
  province: string
  areaContext: string
  buildingContext: string
  climateContext: string
  localProof: string
  responseContext: string
}> = {
  madrid: {
    cityName: 'Madrid',
    province: 'Madrid',
    areaContext: 'Centro, Salamanca, Chamberi, Retiro, Chamartin, Arganzuela y Tetuan',
    buildingContext: 'pisos antiguos del centro, comunidades grandes, oficinas, locales y viviendas reformadas',
    climateContext: 'inviernos frios, veranos exigentes y edificios con instalaciones de epocas muy distintas',
    localProof: 'La mezcla de fincas historicas, promociones modernas y alta densidad de comunidades exige coordinar bien cada reparacion.',
    responseContext: 'en Madrid ciudad priorizamos urgencias de agua, electricidad, desatascos y climatizacion con llegada habitual de 30-60 minutos segun trafico y zona',
  },
  barcelona: {
    cityName: 'Barcelona',
    province: 'Barcelona',
    areaContext: 'Ciutat Vella, Eixample, Gracia, Sants, Sarria y Poblenou',
    buildingContext: 'fincas modernistas, pisos compactos, locales de hosteleria y comunidades cercanas al litoral',
    climateContext: 'humedad mediterranea, salinidad en zonas de costa y uso intensivo de climatizacion en verano',
    localProof: 'En Barcelona es clave trabajar con limpieza, acceso controlado y soluciones compatibles con edificios antiguos y comunidades activas.',
    responseContext: 'organizamos la asistencia por barrio para reducir esperas en averias urgentes y servicios programados',
  },
  valencia: {
    cityName: 'Valencia',
    province: 'Valencia',
    areaContext: "Ciutat Vella, L'Eixample, Extramurs, Campanar, Poblats Maritims y Ruzafa",
    buildingContext: 'viviendas familiares, fincas del centro, bajos comerciales, restaurantes y comunidades residenciales',
    climateContext: 'calor fuerte, humedad marina en barrios cercanos al mar y episodios de lluvia intensa',
    localProof: 'Valencia requiere especial cuidado en climatizacion, saneamiento, presion de agua y redes antiguas de comunidades.',
    responseContext: 'desde nuestra base operativa en el area de Valencia coordinamos visitas rapidas y trabajos programados',
  },
  sevilla: {
    cityName: 'Sevilla',
    province: 'Sevilla',
    areaContext: 'Casco Antiguo, Centro, Triana, Nervion, Macarena y Sur',
    buildingContext: 'edificios historicos, pisos familiares, locales comerciales, patios interiores y comunidades consolidadas',
    climateContext: 'veranos muy calurosos, uso alto de aire acondicionado y redes de saneamiento sensibles a olores',
    localProof: 'La combinacion de calor, edificios antiguos y actividad comercial hace importante diagnosticar antes de intervenir.',
    responseContext: 'coordinamos servicios urgentes y programados en Sevilla con prioridad para averias que afectan a vivienda, local o comunidad',
  },
  zaragoza: {
    cityName: 'Zaragoza',
    province: 'Zaragoza',
    areaContext: 'Centro, Delicias, Universidad, San Jose y Actur',
    buildingContext: 'bloques residenciales, comunidades grandes, locales de barrio y viviendas con instalaciones de varias decadas',
    climateContext: 'contrastes de temperatura, cal en instalaciones y necesidades estacionales de calefaccion y climatizacion',
    localProof: 'En Zaragoza conviene revisar presion, electricidad, calefaccion y desagues con criterio preventivo para evitar averias repetidas.',
    responseContext: 'atendemos Zaragoza ciudad con equipos coordinados para urgencias y trabajos planificados por zona',
  },
  malaga: {
    cityName: 'Malaga',
    province: 'Malaga',
    areaContext: 'Centro, Este, Ciudad Jardin, Teatinos y Carretera de Cadiz',
    buildingContext: 'apartamentos, comunidades residenciales, viviendas cercanas al mar, locales turisticos y negocios de hosteleria',
    climateContext: 'humedad litoral, uso prolongado de aire acondicionado y saneamiento exigido por viviendas de alta ocupacion',
    localProof: 'La actividad turistica y la proximidad al mar hacen que una averia domestica o comercial necesite respuesta clara y ordenada.',
    responseContext: 'organizamos asistencia en Malaga por zonas para resolver urgencias y programar mantenimientos sin interrumpir la actividad',
  },
}

function buildCityHubContent(citySlug: string): CityHubSEOContent {
  const profile = cityProfiles[citySlug]

  return {
    citySlug,
    headline: `Servicios profesionales en ${profile.cityName}`,
    intro: `Fontaneria, electricidad, desatascos, climatizacion, calefaccion y limpieza de tuberias en ${profile.cityName}, con presupuesto previo y un unico equipo para coordinar la reparacion.`,
    seoText: `Reparar24 agrupa los servicios esenciales de reparacion y mantenimiento del hogar en ${profile.cityName}. Esta pagina esta pensada para quien no busca una unica especialidad, sino una solucion completa para vivienda, local, comunidad o negocio: fontaneria, electricidad, desatascos, aire acondicionado, calefaccion y limpieza profesional de tuberias. En lugar de llamar a varios proveedores, puedes elegir el servicio que necesitas y acceder directamente a la pagina especifica de ${profile.cityName}, donde se explica cada trabajo con mas detalle.

Trabajamos en zonas como ${profile.areaContext}, adaptando la intervencion al tipo de inmueble: ${profile.buildingContext}. No es lo mismo revisar una fuga en una finca antigua que resolver una averia electrica en una vivienda reformada, limpiar una arqueta comunitaria o diagnosticar un equipo de aire acondicionado que ha perdido rendimiento. Por eso el primer paso siempre es entender el problema, confirmar si es urgente o programado y explicar el presupuesto antes de empezar.

El contexto local tambien importa. En ${profile.cityName} influyen ${profile.climateContext}. Esta realidad afecta a tuberias, cuadros electricos, bajantes, equipos de climatizacion y sistemas de calefaccion. ${profile.localProof} Nuestro enfoque evita duplicar trabajos: si una humedad puede venir de fontaneria o climatizacion, si un termo combina agua y electricidad, o si una comunidad necesita desatasco y limpieza preventiva, coordinamos el servicio adecuado desde el inicio.

Para urgencias, ${profile.responseContext}. Para trabajos no urgentes, organizamos visita con horario acordado, factura disponible y garantia en la reparacion. El objetivo de esta pagina es ayudarte a entrar por ciudad y escoger rapido el servicio correcto, sin competir con las paginas especializadas de cada oficio. Si ya sabes lo que necesitas, usa las tarjetas de servicios; si no, contacta y te orientamos antes de enviar tecnico.`,
    faqs: [
      {
        question: `Que servicios ofrece Reparar24 en ${profile.cityName}?`,
        answer: `En ${profile.cityName} reunimos los oficios que suelen necesitar ${profile.buildingContext}: fontaneria, electricidad, desatascos, aire acondicionado, calefaccion y limpieza de tuberias. La tarjeta de cada servicio lleva a su pagina local para revisar trabajos incluidos, presupuesto orientativo y casos habituales.`,
        category: 'servicios',
      },
      {
        question: `Atendeis urgencias en ${profile.cityName}?`,
        answer: `Si. En ${profile.cityName} priorizamos averias de agua, electricidad, saneamiento y climatizacion cuando pueden afectar a una vivienda, negocio o comunidad. ${profile.responseContext}, y antes de desplazar al tecnico confirmamos disponibilidad y una estimacion realista.`,
        category: 'urgencias',
      },
      {
        question: `Como se calcula el precio de una reparacion en ${profile.cityName}?`,
        answer: `Depende del servicio, horario, acceso, materiales y complejidad. Antes de intervenir explicamos el diagnostico y el presupuesto. Para trabajos grandes o comunidades podemos preparar una propuesta programada con factura.`,
        category: 'precio',
      },
      {
        question: `Cubris todos los barrios de ${profile.cityName}?`,
        answer: `Trabajamos en las principales zonas de ${profile.cityName}, incluyendo ${profile.areaContext}. En cada servicio puedes revisar tambien paginas por ciudad y distrito cuando estan disponibles.`,
        category: 'cobertura',
      },
      {
        question: '¿Puedo pedir varios servicios en una misma visita?',
        answer: `Cuando el inmueble de ${profile.cityName} lo justifica, podemos coordinar varios oficios en una misma visita. En ${profile.buildingContext}, por ejemplo, puede tener sentido combinar fontaneria con electricidad, desatascos con limpieza de tuberias, o climatizacion con revision electrica. Te indicamos si conviene hacerlo junto o por fases.`,
        category: 'general',
      },
    ],
    localContext: `${profile.localProof} Por eso esta pagina funciona como entrada general por ciudad y deriva a cada servicio especializado sin mezclar intenciones SEO.`,
    semanticOwnership: [
      `servicios profesionales ${profile.cityName}`,
      `reparaciones del hogar ${profile.cityName}`,
      `servicios 24 horas ${profile.cityName}`,
      `mantenimiento vivienda ${profile.cityName}`,
      `urgencias hogar ${profile.cityName}`,
    ],
  }
}

export const cityHubSEOContent: CityHubSEOContent[] = Object.keys(cityProfiles).map(buildCityHubContent)

export function getCityHubSEOContent(citySlug: string): CityHubSEOContent | undefined {
  return cityHubSEOContent.find((content) => content.citySlug === citySlug)
}
