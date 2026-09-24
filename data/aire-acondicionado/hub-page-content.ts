import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Flame, Wrench, ShieldCheck, Gauge, Search } from 'lucide-react'

export const aireAcondicionadoHubFaqs = [
  {
    question: '¿Cuánto cuestá instalar aire acondicionado?',
    answer: 'Depende del tipo de equipo, metros de tuberia, dificultad de paso, ubicacion de la unidad exterior y si hace falta bomba de condensados. Tambien valoramos si es split, multisplit o aire acondicionado conductos. Damos presupuesto antes de empezar.',
  },
  {
    question: '¿Reparais aire acondicionado que no enfría?',
    answer: 'Si. Revisamos filtros, gas refrigerante, fugas, compresor, sonda, placa, ventilador y desague para localizar la causa antes de cambiar piezas.',
  },
  {
    question: '¿Hace falta mantenimiento del aire acondicionado?',
    answer: 'Si. Una limpieza y revision antes de la temporada de calor mejora rendimiento, reduce malos olores y evita averias por filtros, drenaje o suciedad en bateria.',
  },
  {
    question: '¿Podéis hacer carga de gas?',
    answer: 'Si, pero solo cuando procede. Antes comprobamos presiones y posibles fugas, porque recargar sin diagnostico puede ocultar una averia y perder el gas de nuevo.',
  },
  {
    question: '¿Trabajáis con locales y comunidades?',
    answer: 'Si. Atendemos viviendas, oficinas, comercios, comunidades y pequenos negocios con instalacion, reparacion y mantenimiento de climatizacion.',
  },
]

export const aireAcondicionadoHubSeoContent: SeoContentSectionV1Props = {
  badge: 'Climatizacion',
  title: 'Aire Acondicionado con Instalacion, Reparacion y Mantenimiento',
  intro: [
    'Esta categoria concentra busquedas comerciales de usuarios que necesitan instalar, reparar o mantener un sistema de climatizacion. La semantica recogida separa con claridad instalacion aire acondicionado, reparacion aire acondicionado, mantenimiento aire acondicionado, carga gas aire acondicionado, aire acondicionado conductos e instalacion de split. Dejamos fuera de esta URL la intencion puramente informativa y las busquedas de tiendas, marcas u ofertas para evitar canibalizacion con futuras guias de blog.',
    'En Reparar24 trabajamos con viviendas, locales, oficinas y comunidades. Revisamos potencia necesaria, ubicacion de unidades, desague de condensados, conexion electrica y estado del circuito frigorifico antes de proponer una solucion. Si el equipo no enfria, pierde agua, huele mal, hace ruido o salta el diferencial, diagnosticamos primero la causa y explicamos si conviene reparar, limpiar, recargar gas o sustituir algun componente.',
    'El objetivo de esta pagina es dirigir cada necesidad al servicio correcto: montaje para equipos nuevos, reparacion para averias, limpieza y revision preventiva, carga de gas cuando hay perdida de rendimiento, conductos para viviendas o locales con distribucion centralizada, y split/multisplit para estancias concretas. Asi el usuario llega al servicio tecnico climatizacion adecuado y cada URL trabaja una intencion comercial concreta.'
  ],
  serviceCards: [
    { icon: Wrench, title: 'Instalacion y montaje', color: 'blue', bullets: ['Split y multisplit', 'Conductos', 'Unidad exterior', 'Desague'] },
    { icon: Search, title: 'Reparacion de averias', color: 'orange', bullets: ['No enfria', 'Pierde agua', 'Hace ruido', 'Salta diferencial'] },
    { icon: Gauge, title: 'Mantenimiento y gas', color: 'green', bullets: ['Limpieza filtros', 'Revision', 'Carga de gas', 'Fugas'] },
  ],
  localCoverage: {
    title: 'Aire acondicionado en Valencia y principales ciudades',
    description: 'Servicio tecnico climatizacion para instalacion, reparacion y mantenimiento en vivienda, local y comunidad.',
  },
  trustStats: [
    { icon: ShieldCheck, label: 'Garantia', value: 'Trabajo profesional' },
    { icon: Flame, label: 'Clima', value: 'Frio y calor' },
    { icon: Search, label: 'Diagnostico', value: 'Presupuesto previo' },
  ],
  benefitsTitle: 'Servicios incluidos',
  benefits: ['Instalacion de equipos domesticos y profesionales', 'Reparacion de equipos que no enfrian', 'Mantenimiento y limpieza preventiva', 'Carga de gas y deteccion de fugas'],
  keywordsTitle: 'Semantica comercial trabajada',
  keywordTags: ['aire acondicionado', 'instalacion aire acondicionado', 'reparacion aire acondicionado', 'mantenimiento aire acondicionado', 'carga gas aire acondicionado', 'aire acondicionado conductos'],
}
