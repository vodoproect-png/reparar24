import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Building2, Camera, Gauge, Search, ShieldCheck, Truck, Wrench } from 'lucide-react'

export interface LimpiezaTuberiasChildServiceData {
  h1: string
  metaTitle: string
  metaDescription: string
  lockedPrimaryKw: string
  secondaryKw: string[]
  seoBlockKw: string[]
  faqKw: string[]
  contentBrief: string
  description: string
  seoContent: SeoContentSectionV1Props
  faqs: { question: string; answer: string }[]
}

export const limpiezaTuberiasChildServicesData: Record<string, LimpiezaTuberiasChildServiceData> = {
  'inspeccion-camara-tuberias': {
    h1: 'Inspeccion de Tuberias con Camara',
    metaTitle: 'Inspeccion de Tuberias con Camara | Diagnostico CCTV',
    metaDescription: 'Inspeccion de tuberias con camara para localizar atascos, roturas, raices, pendientes y averias sin obras innecesarias.',
    lockedPrimaryKw: 'camara inspeccion tuberias',
    secondaryKw: ['inspeccion tuberias camara', 'videoinspeccion tuberias', 'camara para tuberias', 'inspeccion con camara tuberias'],
    seoBlockKw: ['camara inspeccion tuberias', 'inspeccion tuberias camara', 'videoinspeccion tuberias', 'diagnostico tuberias camara'],
    faqKw: ['precio inspeccion tuberias camara', 'cuando usar camara tuberias', 'que detecta una camara en tuberias'],
    contentBrief: 'Pagina comercial para diagnostico con camara CCTV. Excluye compra de camaras/endoscopios y bricolaje.',
    description: 'Localizamos el origen de atascos repetidos, roturas, raices o defectos de pendiente mediante camara de inspeccion.',
    seoContent: {
      badge: 'Diagnostico CCTV',
      title: 'Inspeccion de Tuberias con Camara Antes de Romper',
      intro: [
        'La inspeccion de tuberias con camara permite ver el interior de una red de saneamiento antes de abrir suelos, patios o paredes. La semantica de esta pagina se centra en inspeccion tuberias camara, camara inspeccion tuberias, videoinspeccion tuberias y diagnostico tuberias camara. Dejamos fuera las busquedas de compra de camaras o endoscopios porque no son servicio profesional.',
        'Usamos la camara cuando un atasco se repite, cuando hay malos olores sin causa visible, cuando una arqueta devuelve agua o cuando una comunidad necesita saber si existe rotura, raiz, aplastamiento, junta desplazada o pendiente incorrecta. La grabacion ayuda a decidir si basta una limpieza, si conviene hidrocurado o si hay que reparar un tramo concreto.',
        'El servicio esta pensado para comunidades, locales, restaurantes, hoteles, viviendas y empresas que necesitan una decision tecnica con presupuesto claro. Antes de intervenir explicamos el alcance, el acceso posible y si la inspeccion se combina con limpieza de tuberias, bajantes, arquetas o colectores.'
      ],
      serviceCards: [
        { icon: Camera, title: 'Camara CCTV', color: 'blue', bullets: ['Interior de tuberias', 'Atascos repetidos', 'Raices', 'Roturas'] },
        { icon: Search, title: 'Diagnostico', color: 'orange', bullets: ['Sin obras a ciegas', 'Origen visible', 'Informe verbal', 'Solucion recomendada'] },
        { icon: ShieldCheck, title: 'Decision segura', color: 'green', bullets: ['Presupuesto previo', 'Prueba del tramo', 'Menos roturas', 'Garantia'] },
      ],
      localCoverage: { title: 'Inspeccion de tuberias en Valencia', description: 'Diagnostico para comunidades, locales, viviendas y redes de saneamiento.' },
      benefitsTitle: 'Que detectamos',
      benefits: ['Raices y obstrucciones', 'Roturas o juntas desplazadas', 'Pendientes incorrectas', 'Acumulacion de grasa o sedimentos'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['camara inspeccion tuberias', 'inspeccion tuberias camara', 'videoinspeccion tuberias', 'diagnostico tuberias camara'],
    },
    faqs: [
      { question: '¿Cuánto cuestá una inspeccion de tuberías con cámara?', answer: 'Depende del acceso, longitud y si se combina con limpieza. Damos presupuesto antes de introducir la camara.' },
      { question: '¿La cámara evita romper?', answer: 'Ayuda a evitar obras innecesarias porque muestra el punto probable del problema y el estado del tramo.' },
      { question: '¿Sirve para comunidades?', answer: 'Si, es muy util en bajantes, colectores y arquetas comunitarias con incidencias repetidas.' },
    ],
  },

  'limpieza-arquetas-colectores': {
    h1: 'Limpieza de Arquetas y Colectores',
    metaTitle: 'Limpieza de Arquetas y Colectores | Saneamiento Profesional',
    metaDescription: 'Limpieza de arquetas, colectores y acometidas de saneamiento con alta presion, aspiracion y presupuesto previo.',
    lockedPrimaryKw: 'limpieza de arquetas',
    secondaryKw: ['limpieza arquetas', 'limpieza colectores', 'limpieza de colectores', 'limpieza acometida saneamiento'],
    seoBlockKw: ['limpieza de arquetas', 'limpieza colectores', 'limpieza arquetas saneamiento', 'limpieza alcantarillado privado'],
    faqKw: ['precio limpieza arquetas', 'cada cuanto limpiar arquetas', 'mal olor arqueta'],
    contentBrief: 'Pagina para arquetas, colectores y acometidas privadas. Excluye colectores de admision/moto y desatascos domesticos.',
    description: 'Limpiamos arquetas, colectores y acometidas con equipo profesional para eliminar lodos, grasas, sedimentos y malos olores.',
    seoContent: {
      badge: 'Saneamiento privado',
      title: 'Limpieza de Arquetas y Colectores con Equipo Profesional',
      intro: [
        'La limpieza de arquetas y colectores es un servicio de saneamiento preventivo y correctivo para edificios, comunidades, locales y empresas. La demanda comercial se concentra en limpieza de arquetas, limpieza arquetas, limpieza colectores y limpieza de colectores; se excluyen resultados ajenos como colectores de admision de vehiculos.',
        'Una arqueta colmatada puede provocar retorno de agua, malos olores, humedad en garajes o atascos que parecen estar dentro de una vivienda pero realmente vienen de la red comun. Revisamos el acceso, el nivel de residuos, el estado del colector y la necesidad de aspiracion, alta presion o inspeccion con camara.',
        'Trabajamos con presupuesto previo y explicamos si la actuacion es puntual o si conviene mantenimiento programado. En comunidades y negocios, una limpieza periodica evita emergencias, reduce olores y permite detectar defectos antes de que provoquen una averia costosa.'
      ],
      serviceCards: [
        { icon: Building2, title: 'Arquetas', color: 'blue', bullets: ['Lodos', 'Grasas', 'Olores', 'Retornos'] },
        { icon: Truck, title: 'Equipo', color: 'orange', bullets: ['Aspiracion', 'Alta presion', 'Cuba si procede', 'Retirada de residuos'] },
        { icon: Search, title: 'Control', color: 'green', bullets: ['Colectores', 'Acometida', 'Camara opcional', 'Plan preventivo'] },
      ],
      localCoverage: { title: 'Limpieza de arquetas en Valencia', description: 'Servicio para comunidades, garajes, locales, patios y redes privadas.' },
      benefitsTitle: 'Incluye',
      benefits: ['Retirada de sedimentos', 'Limpieza de colectores', 'Reduccion de olores', 'Recomendacion de mantenimiento'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza de arquetas', 'limpieza arquetas', 'limpieza colectores', 'limpieza acometida saneamiento'],
    },
    faqs: [
      { question: '¿Cada cuánto limpiar arquetas?', answer: 'Depende del uso. En comunidades y locales con mucho caudal suele convenir una revision periodica anual o semestral.' },
      { question: '¿Qué pasa si una arqueta huele mal?', answer: 'Puede tener lodos, grasas, falta de cierre hidraulico o mala ventilacion. Revisamos antes de proponer limpieza o reparacion.' },
      { question: '¿La limpieza requiere obras?', answer: 'Normalmente no. Se trabaja desde registros, arquetas o puntos de acceso existentes.' },
    ],
  },

  'limpieza-bajantes': {
    h1: 'Limpieza de Bajantes',
    metaTitle: 'Limpieza de Bajantes en Comunidades | Reparar24',
    metaDescription: 'Limpieza de bajantes de edificios y comunidades con alta presion, diagnostico y mantenimiento preventivo.',
    lockedPrimaryKw: 'limpieza de bajantes',
    secondaryKw: ['limpieza bajantes comunidad', 'limpieza de bajantes de edificios', 'mantenimiento bajantes comunidad', 'limpiar bajantes'],
    seoBlockKw: ['limpieza de bajantes', 'limpieza bajantes comunidad', 'limpieza de bajantes de edificios', 'mantenimiento bajantes'],
    faqKw: ['olor bajante comunidad', 'cada cuanto limpiar bajantes', 'limpieza bajantes precio'],
    contentBrief: 'Pagina para bajantes verticales de edificios y comunidades. Se separa de reparacion/sustitucion de bajantes de fontanero.',
    description: 'Limpiamos bajantes de edificios y comunidades para reducir atascos, olores, retornos y acumulacion de residuos.',
    seoContent: {
      badge: 'Comunidades',
      title: 'Limpieza de Bajantes para Evitar Atascos Comunitarios',
      intro: [
        'La limpieza de bajantes se orienta a edificios y comunidades donde una obstruccion puede afectar a varias viviendas a la vez. Esta pagina trabaja limpieza de bajantes, limpieza bajantes comunidad, limpieza de bajantes de edificios y mantenimiento bajantes comunidad. No sustituye a la pagina de reparacion de bajantes, que pertenece al cluster de fontaneria.',
        'Una bajante puede acumular grasa, restos organicos, jabon, cal, toallitas y sedimentos durante anos. Los sintomas suelen ser olores, ruidos, burbujeos, retornos por plantas bajas o atascos recurrentes en una misma columna. Antes de limpiar comprobamos acceso, material, antiguedad y si conviene presion controlada.',
        'El servicio puede ser puntual o preventivo. En comunidades antiguas recomendamos revisar bajantes antes de que aparezcan incidencias graves, especialmente si hay restaurantes, locales, viviendas turisticas o historial de atascos. El presupuesto se confirma antes de intervenir.'
      ],
      serviceCards: [
        { icon: Building2, title: 'Edificios', color: 'blue', bullets: ['Comunidades', 'Columnas', 'Patios', 'Locales'] },
        { icon: Wrench, title: 'Limpieza', color: 'orange', bullets: ['Presion controlada', 'Sedimentos', 'Grasas', 'Olores'] },
        { icon: ShieldCheck, title: 'Prevencion', color: 'green', bullets: ['Menos retornos', 'Menos urgencias', 'Plan anual', 'Informe'] },
      ],
      localCoverage: { title: 'Limpieza de bajantes en Valencia', description: 'Mantenimiento para comunidades, edificios residenciales y locales.' },
      benefitsTitle: 'Cuando conviene',
      benefits: ['Olor en bajante', 'Atascos repetidos', 'Retorno en plantas bajas', 'Mantenimiento preventivo'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza de bajantes', 'limpieza bajantes comunidad', 'mantenimiento bajantes comunidad'],
    },
    faqs: [
      { question: '¿La limpieza de bajantes arregla una rotura?', answer: 'No. Limpia obstrucciones y sedimentos; si hay rotura, se diagnostica y se deriva a reparacion de bajantes.' },
      { question: '¿Se puede hacer en una comunidad habitada?', answer: 'Si, coordinando accesos y avisando a vecinos cuando sea necesario evitar uso temporal de la bajante.' },
      { question: '¿Por qué huele una bajante?', answer: 'Puede haber sedimentos, ventilacion deficiente, juntas deterioradas o sifones secos. La limpieza ayuda cuando el origen es acumulacion.' },
    ],
  },

  'limpieza-tuberias-comunidades': {
    h1: 'Limpieza de Tuberias en Comunidades',
    metaTitle: 'Limpieza de Tuberias para Comunidades | Mantenimiento',
    metaDescription: 'Limpieza preventiva de tuberias en comunidades de vecinos, bajantes, arquetas y colectores con plan de mantenimiento.',
    lockedPrimaryKw: 'limpieza tuberias comunidades',
    secondaryKw: ['limpieza tuberias comunidad vecinos', 'mantenimiento redes comunitarias', 'limpieza saneamiento comunidades', 'limpieza preventiva comunidad'],
    seoBlockKw: ['limpieza tuberias comunidades', 'limpieza tuberias comunidad vecinos', 'mantenimiento redes comunitarias'],
    faqKw: ['mantenimiento tuberias comunidad', 'contrato limpieza comunidad', 'certificado limpieza comunidad'],
    contentBrief: 'Pagina B2B para administradores y comunidades. Agrupa mantenimiento preventivo de redes comunes.',
    description: 'Mantenimiento preventivo de tuberias, bajantes, arquetas y colectores en comunidades de vecinos.',
    seoContent: {
      badge: 'Mantenimiento comunitario',
      title: 'Limpieza de Tuberias para Comunidades y Administradores',
      intro: [
        'La limpieza de tuberias en comunidades no busca resolver un fregadero puntual, sino mantener redes comunes que afectan a varios vecinos: bajantes, colectores, arquetas, patios, garajes y acometidas. Esta pagina trabaja limpieza tuberias comunidades, limpieza tuberias comunidad vecinos y mantenimiento redes comunitarias.',
        'Un plan preventivo permite reducir urgencias, malos olores, inundaciones en garaje y discusiones sobre si una averia es privativa o comunitaria. Revisamos puntos de acceso, historial de incidencias, numero de viviendas, edad de la finca y si conviene limpieza, camara o alta presion.',
        'Trabajamos con administradores de fincas, presidentes y comunidades. Podemos preparar presupuesto por actuacion o mantenimiento periodico, explicando alcance, zonas incluidas y recomendaciones para futuras revisiones.'
      ],
      serviceCards: [
        { icon: Building2, title: 'Comunidad', color: 'blue', bullets: ['Bajantes', 'Arquetas', 'Colectores', 'Garajes'] },
        { icon: ShieldCheck, title: 'Plan preventivo', color: 'green', bullets: ['Menos urgencias', 'Menos olores', 'Presupuesto', 'Factura'] },
        { icon: Search, title: 'Diagnostico', color: 'orange', bullets: ['Historial', 'Accesos', 'Camara', 'Prioridades'] },
      ],
      localCoverage: { title: 'Limpieza de tuberias en comunidades de Valencia', description: 'Servicio para administradores, presidentes y edificios residenciales.' },
      benefitsTitle: 'Para que sirve',
      benefits: ['Prevenir atascos comunes', 'Reducir olores', 'Evitar retornos', 'Planificar mantenimiento anual'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza tuberias comunidades', 'limpieza tuberias comunidad vecinos', 'mantenimiento redes comunitarias'],
    },
    faqs: [
      { question: '¿Trabajáis con administradores de fincas?', answer: 'Si, preparamos presupuestos para comunidades, explicando alcance, zonas incluidas y periodicidad recomendada.' },
      { question: '¿Incluye certificado?', answer: 'Podemos emitir factura e informe basico del trabajo realizado cuando la comunidad lo necesita.' },
      { question: '¿Conviene mantenimiento anual?', answer: 'En edificios con incidencias repetidas o redes antiguas suele ser recomendable revisar y limpiar de forma periodica.' },
    ],
  },

  'limpieza-tuberias-empresas': {
    h1: 'Limpieza de Tuberias para Empresas y Hosteleria',
    metaTitle: 'Limpieza de Tuberias para Restaurantes, Hoteles y Empresas',
    metaDescription: 'Limpieza de tuberias para restaurantes, hoteles, cocinas industriales, empresas y separadores de grasas.',
    lockedPrimaryKw: 'limpieza tuberias empresas',
    secondaryKw: ['limpieza tuberias restaurante', 'limpieza tuberias hotel', 'limpieza separador de grasas', 'mantenimiento separador grasas'],
    seoBlockKw: ['limpieza tuberias empresas', 'limpieza tuberias restaurante', 'limpieza separador de grasas', 'limpieza tuberias hotel'],
    faqKw: ['limpieza separador grasas', 'mantenimiento cocina industrial', 'limpieza tuberias restaurante precio'],
    contentBrief: 'Pagina B2B para hosteleria, hoteles, cocinas industriales y empresas. Excluye desatascos domesticos.',
    description: 'Limpieza de tuberias, arquetas y separadores de grasas para restaurantes, hoteles, locales y empresas.',
    seoContent: {
      badge: 'Empresas y hosteleria',
      title: 'Limpieza de Tuberias para Negocios que No Pueden Parar',
      intro: [
        'Restaurantes, hoteles, cocinas industriales y empresas necesitan saneamiento fiable porque un atasco puede cerrar el servicio, generar olores o afectar a clientes. Esta pagina trabaja limpieza tuberias empresas, limpieza tuberias restaurante, limpieza tuberias hotel y limpieza separador de grasas.',
        'En hosteleria se acumulan grasas, restos organicos, detergentes y sedimentos que no se resuelven con productos domesticos. Revisamos tuberias de cocina, arquetas, separadores de grasas, zonas de lavado, patios y colectores, proponiendo limpieza puntual o mantenimiento programado.',
        'Coordinamos horarios para reducir impacto en la actividad. El presupuesto se adapta al acceso, volumen de residuos, necesidad de cuba, alta presion, retirada y frecuencia recomendada. El objetivo es prevenir paradas y mantener la instalacion operativa.'
      ],
      serviceCards: [
        { icon: Building2, title: 'Negocios', color: 'blue', bullets: ['Restaurantes', 'Hoteles', 'Locales', 'Empresas'] },
        { icon: Truck, title: 'Residuos', color: 'orange', bullets: ['Grasas', 'Lodos', 'Arquetas', 'Separadores'] },
        { icon: ShieldCheck, title: 'Continuidad', color: 'green', bullets: ['Fuera de horario', 'Plan preventivo', 'Factura', 'Menos cierres'] },
      ],
      localCoverage: { title: 'Limpieza de tuberias para empresas en Valencia', description: 'Servicio para restaurantes, hoteles, cocinas, locales y oficinas.' },
      benefitsTitle: 'Servicios habituales',
      benefits: ['Limpieza de separadores de grasas', 'Tuberias de cocina industrial', 'Arquetas y colectores', 'Mantenimiento programado'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza tuberias empresas', 'limpieza tuberias restaurante', 'limpieza separador de grasas'],
    },
    faqs: [
      { question: '¿Podéis trabajar fuera de horario?', answer: 'Si, valoramos horarios con menor impacto para restaurantes, hoteles y locales.' },
      { question: '¿Limpiáis separadores de grasas?', answer: 'Si, revisamos y limpiamos separadores de grasas, arquetas y tuberias asociadas.' },
      { question: '¿Hacéis mantenimiento periodico?', answer: 'Si, podemos proponer frecuencia segun volumen de uso, tipo de cocina y antecedentes de atascos.' },
    ],
  },

  'limpieza-alta-presion-camion-cuba': {
    h1: 'Limpieza de Tuberias con Alta Presion y Camion Cuba',
    metaTitle: 'Limpieza de Tuberias Alta Presion | Camion Cuba',
    metaDescription: 'Limpieza de tuberias con agua a presion, hidrocurado y camion cuba para redes de saneamiento, arquetas y colectores.',
    lockedPrimaryKw: 'limpieza tuberias alta presion',
    secondaryKw: ['limpieza tuberias camion cuba', 'camion cuba limpieza tuberias', 'hidrocurado tuberias', 'limpieza tuberias agua a presion'],
    seoBlockKw: ['limpieza tuberias alta presion', 'limpieza tuberias camion cuba', 'hidrocurado tuberias', 'camion cuba alta presion'],
    faqKw: ['que es hidrocurado', 'cuando usar camion cuba', 'limpieza alta presion precio'],
    contentBrief: 'Pagina sobre metodo/equipo profesional para redes con volumen o suciedad elevada. Separada de camion cuba de desatascos urgente.',
    description: 'Limpieza de tuberias con alta presion, hidrocurado y camion cuba para eliminar sedimentos, grasa, lodos y obstrucciones profundas.',
    seoContent: {
      badge: 'Alta presion',
      title: 'Limpieza de Tuberias con Hidrocurado y Camion Cuba',
      intro: [
        'La limpieza de tuberias con alta presion y camion cuba se utiliza cuando una red necesita una limpieza profunda, no solo retirar un atasco visible. La pagina trabaja limpieza tuberias alta presion, limpieza tuberias camion cuba, camion cuba limpieza tuberias e hidrocurado tuberias.',
        'El hidrocurado emplea agua a presion controlada para arrastrar sedimentos, grasa, lodos y restos adheridos a la pared interior. Si hay volumen de residuos o arquetas colmatadas, el camion cuba permite aspirar y retirar material de forma profesional. La presion se ajusta al estado y material de la tuberia.',
        'Este servicio encaja en comunidades, garajes, locales, restaurantes, hoteles, naves y redes privadas. Antes de actuar revisamos accesos, longitud, diametro, antiguedad y si conviene combinar alta presion con camara para comprobar resultado o detectar defectos.'
      ],
      serviceCards: [
        { icon: Gauge, title: 'Alta presion', color: 'blue', bullets: ['Hidrocurado', 'Agua a presion', 'Presion controlada', 'Sin obras'] },
        { icon: Truck, title: 'Camion cuba', color: 'orange', bullets: ['Aspiracion', 'Lodos', 'Arquetas', 'Colectores'] },
        { icon: ShieldCheck, title: 'Uso tecnico', color: 'green', bullets: ['Segun material', 'Presupuesto', 'Prueba final', 'Camara opcional'] },
      ],
      localCoverage: { title: 'Alta presion y camion cuba en Valencia', description: 'Limpieza profesional de redes privadas, comunidades y empresas.' },
      benefitsTitle: 'Aplicaciones',
      benefits: ['Redes con sedimentos', 'Arquetas con lodos', 'Grasa en tuberias', 'Mantenimiento preventivo de colectores'],
      keywordsTitle: 'Keywords trabajadas',
      keywordTags: ['limpieza tuberias alta presion', 'limpieza tuberias camion cuba', 'hidrocurado tuberias'],
    },
    faqs: [
      { question: '¿Qué es hidrocurado?', answer: 'Es limpieza con agua a presion controlada para arrastrar residuos adheridos en el interior de tuberias y colectores.' },
      { question: '¿Siempre hace falta camión cuba?', answer: 'No. Solo cuando hay volumen de residuos, arquetas colmatadas o necesidad de aspiracion y retirada.' },
      { question: '¿Puede dañar tuberías antiguas?', answer: 'Por eso ajustamos presion y tecnica segun material, antiguedad y estado aparente de la instalacion.' },
    ],
  },
}
