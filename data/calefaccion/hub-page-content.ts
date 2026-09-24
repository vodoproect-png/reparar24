import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Flame, Gauge, Search, ShieldCheck, Thermometer, Wrench } from 'lucide-react'

export const calefaccionHubFaqs = [
  {
    question: '¿Cuánto cuestá reparar la calefaccion?',
    answer: 'Depende de si la averia esta en caldera, radiadores, termostato, valvulas o circuito. Revisamos primero y damos presupuesto antes de intervenir.',
  },
  {
    question: '¿Atendeis calderas que no encienden?',
    answer: 'Si. Revisamos presion, gas, corriente, codigo de error, encendido, valvulas y circuito para localizar la causa sin cambiar piezas a ciegas.',
  },
  {
    question: '¿Hacéis mantenimiento de calderas?',
    answer: 'Si. Realizamos mantenimiento y revision de calderas con comprobaciones de seguridad, presion, rendimiento y funcionamiento antes del invierno.',
  },
  {
    question: '¿Reparais radiadores que no calientan?',
    answer: 'Si. Purgamos, revisamos valvulas, detentores, presion, caudal y equilibrado para recuperar calor regular en la instalacion.',
  },
  {
    question: '¿Trabajáis con comunidades?',
    answer: 'Si. Atendemos calefaccion central, sala de calderas, radiadores comunitarios y mantenimiento para comunidades de vecinos.',
  },
]

export const calefaccionHubSeoContent: SeoContentSectionV1Props = {
  badge: 'Calefaccion',
  title: 'Calefaccion, Calderas y Radiadores con Servicio Profesional',
  intro: [
    'Esta categoria agrupa busquedas comerciales de usuarios que necesitan reparar una caldera, mantener el sistema antes del invierno, instalar equipos termicos, solucionar radiadores que no calientan o revisar una instalacion central en comunidad. La semantica recogida separa reparacion calderas, mantenimiento caldera, radiadores calefaccion, instalacion calefaccion, suelo radiante, calefaccion central y aerotermia para evitar que una sola URL compita contra todas.',
    'En Reparar24 trabajamos con viviendas, locales y comunidades. Diagnosticamos calderas que no encienden, pierden presion, gotean o muestran errores; purgamos radiadores, cambiamos valvulas y revisamos termostatos; tambien planteamos instalaciones nuevas o mejoras cuando el sistema antiguo consume demasiado o no reparte bien el calor.',
    'El objetivo de esta pagina principal es orientar al usuario hacia el servicio correcto. Las consultas informativas como como purgar radiadores, por que baja la presion de la caldera o ventajas del suelo radiante quedan reservadas para el futuro blog. En la zona comercial mantenemos foco en contratar servicio, recibir presupuesto y resolver la incidencia con garantia.'
  ],
  serviceCards: [
    { icon: Wrench, title: 'Calderas', color: 'orange', bullets: ['Reparacion', 'Revision', 'Presion baja', 'No enciende'] },
    { icon: Thermometer, title: 'Radiadores', color: 'blue', bullets: ['Purgado', 'Fugas', 'Valvulas', 'Instalacion'] },
    { icon: Gauge, title: 'Sistemas', color: 'green', bullets: ['Suelo radiante', 'Central', 'Termostatos', 'Aerotermia'] },
  ],
  localCoverage: {
    title: 'Calefaccion en Valencia y principales ciudades',
    description: 'Servicio tecnico para reparacion, mantenimiento e instalacion de calefaccion en vivienda, local y comunidad.',
  },
  trustStats: [
    { icon: ShieldCheck, label: 'Garantia', value: 'Trabajo profesional' },
    { icon: Flame, label: 'Invierno', value: 'Calor estable' },
    { icon: Search, label: 'Diagnostico', value: 'Presupuesto previo' },
  ],
  benefitsTitle: 'Servicios incluidos',
  benefits: ['Reparacion de calderas', 'Mantenimiento y revision', 'Radiadores y termostatos', 'Instalacion y sistemas centrales'],
  keywordsTitle: 'Semantica comercial trabajada',
  keywordTags: ['calefaccion', 'reparacion calderas', 'mantenimiento caldera', 'radiadores calefaccion', 'instalacion calefaccion', 'suelo radiante', 'calefaccion central'],
}
