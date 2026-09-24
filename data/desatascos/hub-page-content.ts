import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Droplets, Wrench, Gauge, ShieldCheck, Truck, Search } from 'lucide-react'

export const desatascosHubFaqs = [
  {
    question: '¿Cuándo debo llamar a una empresa de desatascos?',
    answer: 'Cuando el agua no baja, vuelve por otro desagüe, hay mal olor persistente, el WC rebosa o el atasco afecta a varios puntos. Si hay arqueta, bajante o colector implicado, conviene llamar antes de usar productos químicos.',
  },
  {
    question: '¿Tenéis desatascos urgentes 24 horas?',
    answer: 'Sí. Atendemos urgencias de desatascos 24 horas cuando hay WC inutilizable, fregadero bloqueado, retorno de aguas o riesgo de inundación. El recargo de urgencia se comunica antes de intervenir.',
  },
  {
    question: '¿Cuánto cuestá un desatasco?',
    answer: 'Depende del punto afectado y del equipo necesario. Un fregadero o WC accesible no cuesta lo mismo que una arqueta, bajante comunitaria o servicio de alta presión. Siempre damos presupuesto previo.',
  },
  {
    question: '¿Usáis camión cuba?',
    answer: 'Sí, cuando el atasco requiere camión cuba, aspiración, alta presión o limpieza de arquetas, colectores, bajantes y saneamiento de mayor volumen. Si no hace falta equipo pesado, proponemos una solución más sencilla.',
  },
  {
    question: '¿Hacéis desatascos de arquetas y bajantes?',
    answer: 'Sí. La arqueta o bajante atascada suele avisar con mal olor, retorno de agua o desbordamiento en el punto más bajo del edificio. Revisamos el tramo, valoramos si hace falta camión cuba o cámara de inspección y damos presupuesto antes de intervenir.',
  },
  {
    question: '¿Qué diferencia hay entre fontanero y desatascos?',
    answer: 'Fontanería cubre fugas, instalaciones, grifos, cisternas o sanitarios. Desatascos cubre obstrucciones: tuberías que no tragan, WC atascado, fregadero bloqueado, arquetas, bajantes y saneamiento.',
  },
]

export const desatascosHubSeoContent: SeoContentSectionV1Props = {
  badge: 'Empresa de desatascos',
  title: 'Desatascos 24 Horas con Presupuesto Previo',
  intro: [
    'La categoría agrupa las búsquedas comerciales de usuarios que necesitan resolver una obstrucción real: desatascos urgentes, desatascos 24 horas, empresa de desatascos, desatascar tuberías, WC atascado, fregadero bloqueado, camión cuba, arquetas, bajantes y saneamiento. No mezclamos esta intención con reparaciones de fontanería que pertenecen a otras páginas; aquí el problema principal es que el agua no evacúa correctamente.',
    'Trabajamos con equipos profesionales para cada caso: herramientas de desatasco para WC, fregaderos, lavabos y duchas; máquinas rotativas para tuberías interiores; alta presión para tramos largos; cámara de inspección cuando el atasco se repite; y aspiración para arquetas, colectores, fosas o redes comunitarias. Antes de actuar explicamos el alcance, el precio y si la intervención es doméstica, comunitaria o profesional.',
    'La semántica recogida con DataForSEO confirma que las páginas de ciudad tienen demanda clara, mientras que los barrios exactos muestran menos volumen directo. Por eso el hub y las páginas geo deben concentrar la intención general y urgente, y las nuevas páginas hijas deben separar bloqueos concretos: tuberías, fregadero, WC, lavabo/ducha, servicio de cuba y fosas sépticas.'
  ],
  serviceCards: [
    { icon: Droplets, title: 'Desatascos urgentes', color: 'blue', bullets: ['WC atascado', 'Fregadero bloqueado', 'Ducha lenta', 'Retorno de agua'] },
    { icon: Wrench, title: 'Tuberías y desagües', color: 'orange', bullets: ['Máquina rotativa', 'Alta presión', 'Limpieza de tramo', 'Prueba final'] },
    { icon: Truck, title: 'Camión cuba', color: 'green', bullets: ['Arquetas', 'Bajantes', 'Colectores', 'Fosas sépticas'] },
  ],
  localCoverage: {
    title: 'Desatascos en Valencia y principales ciudades',
    description: 'Servicio urgente y programado para viviendas, locales, comunidades y negocios.',
  },
  trustStats: [
    { icon: Gauge, label: '24/7', value: 'Urgencias' },
    { icon: ShieldCheck, label: 'Garantía', value: 'Intervención' },
    { icon: Search, label: 'Diagnóstico', value: 'Sin sorpresas' },
  ],
  benefitsTitle: 'Servicios incluidos',
  benefits: ['Desatascos de tuberías', 'Desatascar fregadero, WC, lavabo y ducha', 'Alta presión y aspiración', 'Limpieza de fosas sépticas y arquetas'],
  keywordsTitle: 'Semántica comercial trabajada',
  keywordTags: ['desatascos', 'desatascos urgentes', 'desatascos 24 horas', 'empresa de desatascos', 'camion cuba', 'desatascar tuberias', 'desatascar arqueta', 'desatascar bajante'],
}
