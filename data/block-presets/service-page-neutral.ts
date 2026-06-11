/**
 * SEO-NEUTRAL COMMERCIAL BLOCK PRESETS
 * 
 * This file contains reusable preset data for commercial blocks
 * that remain consistent across service pages.
 * 
 * These presets are SEO-neutral and can be shared without
 * causing keyword cannibalization or semantic leakage.
 */

import type { CityCard } from '@/components/ds/ServiceAreasV1'

// Shared Valencia GEO preset for current Fontanero Valencia rollout.
// Replace with another city preset when expanding to Barcelona, Madrid, etc.
export const servicePageValenciaCoverage = {
  badge: "Servicio local",
  title: "Trabajamos en tu zona",
  subtitle: "Servicio profesional en Valencia y principales municipios cercanos.",
  cities: [
    {
      city: "Valencia capital",
      description: "Atención rápida en todos los barrios de Valencia.",
      image: "/cities/burjassot.webp",
      alt: "Servicio profesional en Valencia capital"
    },
    {
      city: "Torrent",
      description: "Cobertura en Torrent y zonas cercanas.",
      image: "/cities/torrent.webp",
      alt: "Servicio profesional en Torrent"
    },
    {
      city: "Paterna",
      description: "Atención profesional en Paterna y alrededores.",
      image: "/cities/paterna.webp",
      alt: "Servicio profesional en Paterna"
    },
    {
      city: "Mislata",
      description: "Servicio rápido en Mislata con profesionales cualificados.",
      image: "/cities/mislata.webp",
      alt: "Servicio profesional en Mislata"
    },
    {
      city: "Sagunto",
      description: "Cobertura en Sagunto para trabajos programados y urgentes.",
      image: "/cities/sagunto.webp",
      alt: "Servicio profesional en Sagunto"
    },
    {
      city: "Gandía",
      description: "Atención en Gandía según disponibilidad.",
      image: "/cities/gandia.webp",
      alt: "Servicio profesional en Gandía"
    }
  ] as CityCard[],
  responseTime: "30-60 min",
  coverageTitle: "Cobertura en Valencia y alrededores",
  coverageDescription: "Si tu ciudad no aparece en la lista, consúltanos. Cubrimos Valencia y área metropolitana según disponibilidad.",
  ctaText: "Llámanos ahora",
  ctaPhone: "tel:+34641688524"
}
