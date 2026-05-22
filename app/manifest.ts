import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Reparar24 - Servicios de Fontanería, Electricidad y Reparaciones 24/7',
    short_name: 'Reparar24',
    description: 'Servicios profesionales de fontanería, electricidad, desatascos, calefacción y aire acondicionado 24 horas en Valencia y toda España. Atención inmediata para emergencias.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#2563EB',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['business', 'utilities'],
    lang: 'es',
    dir: 'ltr',
    orientation: 'portrait-primary'
  }
}
