import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { Building2, Camera, Gauge, Search, ShieldCheck, Truck } from 'lucide-react'

export const limpiezaTuberiasHubFaqs = [
  {
    question: '¿Qué diferencia hay entre limpieza de tuberías y desatascos?',
    answer: 'Desatascos resuelve una obstruccion concreta. Este servicio se enfoca en mantenimiento preventivo y limpieza profunda de bajantes, arquetas, colectores y redes de saneamiento.',
  },
  {
    question: '¿Trabajáis con comunidades de vecinos?',
    answer: 'Si. Revisamos bajantes, arquetas, colectores, garajes y acometidas para proponer limpieza puntual, limpieza bajantes comunidad o mantenimiento periodico.',
  },
  {
    question: '¿Usáis cámara de inspeccion?',
    answer: 'Si, cuando hace falta camara inspeccion tuberias para diagnosticar atascos repetidos, roturas, raices, pendientes incorrectas o comprobar el estado interior de una tuberia.',
  },
  {
    question: '¿Hacéis limpieza para restaurantes y hoteles?',
    answer: 'Si. Atendemos tuberias de cocina, arquetas, separadores de grasas y redes de saneamiento en hosteleria y empresas.',
  },
  {
    question: '¿Cuánto cuestá la limpieza de tuberías?',
    answer: 'Depende del acceso, longitud, necesidad de cuba, alta presion, camara y volumen de residuos. Para saber cuanto cuesta la limpieza de tuberias, revisamos primero el alcance y damos presupuesto antes de intervenir.',
  },
]

export const limpiezaTuberiasHubSeoContent: SeoContentSectionV1Props = {
  badge: 'Limpieza de tuberias',
  title: 'Limpieza Profesional de Tuberias, Bajantes y Redes de Saneamiento',
  intro: [
    'La categoria cubre una intencion comercial distinta a los desatascos domesticos: mantenimiento preventivo, redes comunitarias, limpieza de arquetas, colectores, bajantes, alta presion, camion cuba e inspeccion con camara. La semantica recogida muestra mucha informacion DIY, pero las paginas comerciales deben centrarse en contratar un servicio profesional, no en productos caseros.',
    'En Reparar24 trabajamos con comunidades, administradores, restaurantes, hoteles, locales, garajes y empresas que necesitan mantener operativa su red de saneamiento. Revisamos accesos, sintomas, historial de incidencias y estado aparente antes de proponer limpieza, hidrocurado, aspiracion, camara o mantenimiento programado.',
    'El objetivo del hub es dirigir cada necesidad al servicio correcto: camara para diagnostico, arquetas y colectores para saneamiento privado, bajantes para comunidades, limpieza tuberias alta presion y camion cuba para limpieza profunda, y empresas/hosteleria para redes con grasa o uso intensivo. Las guias sobre bicarbonato, sosa, olores y prevencion quedan reservadas para el futuro blog.'
  ],
  serviceCards: [
    { icon: Camera, title: 'Diagnostico', color: 'blue', bullets: ['Camara CCTV', 'Atascos repetidos', 'Roturas', 'Raices'] },
    { icon: Truck, title: 'Limpieza profunda', color: 'orange', bullets: ['Alta presion', 'Camion cuba', 'Arquetas', 'Colectores'] },
    { icon: Building2, title: 'Mantenimiento', color: 'green', bullets: ['Comunidades', 'Empresas', 'Hoteles', 'Restaurantes'] },
  ],
  localCoverage: {
    title: 'Limpieza de tuberias en Valencia y principales ciudades',
    description: 'Servicio profesional para comunidades, empresas, locales y redes privadas de saneamiento.',
  },
  trustStats: [
    { icon: ShieldCheck, label: 'Presupuesto', value: 'Antes de intervenir' },
    { icon: Gauge, label: 'Alta presion', value: 'Segun estado de red' },
    { icon: Search, label: 'Diagnostico', value: 'Camara si procede' },
  ],
  benefitsTitle: 'Servicios incluidos',
  benefits: ['Inspeccion con camara', 'Limpieza de arquetas y colectores', 'Limpieza de bajantes', 'Alta presion y camion cuba', 'Mantenimiento para comunidades y empresas'],
  keywordsTitle: 'Semantica comercial trabajada',
  keywordTags: ['limpieza de tuberias', 'limpieza bajantes comunidad', 'limpieza de arquetas', 'camara inspeccion tuberias', 'limpieza tuberias alta presion'],
}
