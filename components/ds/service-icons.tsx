/**
 * Reparar24 — Custom Service Icon System
 *
 * Design spec:
 *  - viewBox: "0 0 24 24"
 *  - stroke="currentColor", fill="none"
 *  - strokeWidth={1.8}, strokeLinecap="round", strokeLinejoin="round"
 *  - Render at 28–32 px inside a 56 × 56 px rounded-square container
 *  - Brand blue: #2563EB  |  Container tint: #EFF6FF
 *  - No external dependencies
 */

import React from "react"

// ─── Shared SVG props ────────────────────────────────────────────────────────

interface IconProps {
  /** Rendered size in px (default: 30) */
  size?: number
  /** CSS colour value — defaults to "currentColor" */
  color?: string
  className?: string
  "aria-label"?: string
}

const DEFAULTS = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLUMBING ICONS
// ─────────────────────────────────────────────────────────────────────────────

/** 1. Reparación de Fugas — pipe with a leak crack and dripping drop */
export function IconReparacionFugas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* horizontal pipe */}
      <rect x="2" y="10" width="20" height="4" rx="2" {...DEFAULTS} />
      {/* crack on pipe */}
      <path d="M12 10 L10.5 12 L12.5 12 L11 14" {...DEFAULTS} strokeWidth={1.6} />
      {/* drip drop below crack */}
      <path d="M11 17 Q11 19.5 12 20 Q13 19.5 13 17 Q13 15.5 12 15.5 Q11 15.5 11 17Z" stroke="currentColor" fill="currentColor" fillOpacity={0.18} strokeWidth={1.2} />
    </svg>
  )
}

/** 2. Cambio y Reparación de Grifos — faucet body with spout and a drop */
export function IconCambioReparacionGrifos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* body */}
      <rect x="8" y="5" width="8" height="5" rx="1.5" {...DEFAULTS} />
      {/* handle */}
      <line x1="12" y1="5" x2="12" y2="3" {...DEFAULTS} />
      <line x1="10" y1="3" x2="14" y2="3" {...DEFAULTS} />
      {/* spout */}
      <path d="M8 10 L8 14 Q8 15 9 15 L14 15" {...DEFAULTS} />
      {/* spout end */}
      <path d="M14 13.5 L14 16.5" {...DEFAULTS} strokeWidth={2.2} />
      {/* drop */}
      <path d="M15 18 Q15 20.2 16 20.5 Q17 20.2 17 18 Q17 16.8 16 16.8 Q15 16.8 15 18Z" stroke="currentColor" fill="currentColor" fillOpacity={0.2} strokeWidth={1.2} />
    </svg>
  )
}

/** 3. Reparación de Cisternas — cistern tank outline with water level line */
export function IconReparacionCisternas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* cistern body */}
      <rect x="4" y="4" width="16" height="13" rx="1.5" {...DEFAULTS} />
      {/* water level */}
      <line x1="4" y1="13" x2="20" y2="13" {...DEFAULTS} strokeOpacity={0.4} />
      {/* fill tint for water */}
      <rect x="4.9" y="13.9" width="14.2" height="2.2" rx="0" fill="currentColor" fillOpacity={0.12} stroke="none" />
      {/* float arm */}
      <line x1="14" y1="4" x2="14" y2="7" {...DEFAULTS} />
      <circle cx="15.5" cy="7.5" r="1" {...DEFAULTS} />
      {/* inlet pipe */}
      <path d="M4 18 L4 21" {...DEFAULTS} />
      <path d="M20 18 L20 21" {...DEFAULTS} />
    </svg>
  )
}

/** 4. Desatascos — drain circle with clockwise swirl and downward flow */
export function IconDesatascos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* drain ring */}
      <circle cx="12" cy="9" r="5.5" {...DEFAULTS} />
      {/* swirl */}
      <path d="M12 5.5 C15 5.5 15.5 9 13 9.5 C10.5 10 10 13 13 13.5" {...DEFAULTS} strokeWidth={1.5} />
      {/* downward pipe */}
      <line x1="12" y1="14.5" x2="12" y2="22" {...DEFAULTS} />
      {/* water flow arrows */}
      <polyline points="10,19 12,22 14,19" {...DEFAULTS} />
    </svg>
  )
}

/** 5. Instalaciones de Fontanería — pipe network with T-junctions and plus */
export function IconInstalaciones({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* main horizontal pipe */}
      <line x1="3" y1="12" x2="21" y2="12" {...DEFAULTS} />
      {/* vertical branch left */}
      <line x1="7" y1="12" x2="7" y2="5" {...DEFAULTS} />
      {/* cap left */}
      <line x1="5" y1="5" x2="9" y2="5" {...DEFAULTS} />
      {/* vertical branch right */}
      <line x1="17" y1="12" x2="17" y2="5" {...DEFAULTS} />
      {/* check mark on right branch */}
      <polyline points="14.5,5.5 16.5,7.5 19.5,3.5" {...DEFAULTS} strokeWidth={1.8} />
      {/* drain down */}
      <line x1="12" y1="12" x2="12" y2="19" {...DEFAULTS} />
      <line x1="10" y1="19" x2="14" y2="19" {...DEFAULTS} />
    </svg>
  )
}

/** 6. Instalación y Cambio de Inodoros — toilet bowl profile with wrench badge */
export function IconInstalacionCambioInodoros({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* cistern */}
      <rect x="6" y="2" width="8" height="5" rx="1" {...DEFAULTS} />
      {/* bowl top */}
      <path d="M6 7 L18 7" {...DEFAULTS} />
      {/* bowl */}
      <path d="M6 7 Q5 14 12 16 Q19 14 18 7" {...DEFAULTS} />
      {/* base */}
      <path d="M8 16 L8 19 L16 19 L16 16" {...DEFAULTS} />
      {/* small wrench hint */}
      <line x1="17" y1="3" x2="21" y2="7" {...DEFAULTS} strokeWidth={1.5} />
      <circle cx="18" cy="3.8" r="1.2" {...DEFAULTS} strokeWidth={1.4} />
    </svg>
  )
}

/** 7. Cambiar Bañera por Ducha — shower head with rays over a tray */
export function IconCambioBaneraDucha({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* pipe arm */}
      <path d="M5 4 L5 9 Q5 10 6 10 L12 10" {...DEFAULTS} />
      {/* shower head body */}
      <rect x="12" y="8" width="6" height="4" rx="1.5" {...DEFAULTS} />
      {/* spray drops */}
      <line x1="13.5" y1="12" x2="13" y2="15" {...DEFAULTS} strokeWidth={1.4} />
      <line x1="15" y1="12" x2="14.8" y2="16" {...DEFAULTS} strokeWidth={1.4} />
      <line x1="16.5" y1="12" x2="16.5" y2="15.5" {...DEFAULTS} strokeWidth={1.4} />
      <circle cx="13" cy="15.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="16.5" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16" r="0.4" fill="currentColor" stroke="none" />
      {/* tray */}
      <rect x="4" y="19" width="16" height="2.5" rx="0.8" {...DEFAULTS} />
      {/* drain dot */}
      <circle cx="12" cy="20.25" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** 8. Cambio de Tuberías — two pipe sections with coupling ring */
export function IconSustitucionTuberias({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* left pipe section */}
      <rect x="2" y="9.5" width="7" height="5" rx="1.2" {...DEFAULTS} />
      {/* coupling ring */}
      <rect x="9" y="8" width="6" height="8" rx="1.5" {...DEFAULTS} />
      {/* inner ring */}
      <rect x="10.5" y="9.5" width="3" height="5" rx="0.6" {...DEFAULTS} strokeWidth={1.2} strokeOpacity={0.5} />
      {/* right pipe section */}
      <rect x="15" y="9.5" width="7" height="5" rx="1.2" {...DEFAULTS} />
      {/* replacement arrows above */}
      <polyline points="9,6.5 12,4 15,6.5" {...DEFAULTS} strokeWidth={1.5} />
    </svg>
  )
}

/** 9. Termos y Calentadores — water heater cylinder with flame */
export function IconCalentadoresTermos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* tank */}
      <rect x="6" y="5" width="12" height="14" rx="3" {...DEFAULTS} />
      {/* top pipe */}
      <line x1="10" y1="5" x2="10" y2="2.5" {...DEFAULTS} />
      <line x1="14" y1="5" x2="14" y2="2.5" {...DEFAULTS} />
      {/* bottom drain */}
      <line x1="12" y1="19" x2="12" y2="21.5" {...DEFAULTS} />
      {/* flame */}
      <path d="M10.5 15 C10 12 12 11 12 9 C13 11 15 12 13.5 15 C13 16 11 16 10.5 15Z" {...DEFAULTS} strokeWidth={1.3} />
    </svg>
  )
}

/** 10. Grupos de Presión — pressure gauge dial with needle */
export function IconGruposPresionAgua({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* gauge face */}
      <path d="M4 16 A9 9 0 0 1 20 16" {...DEFAULTS} />
      {/* outer arc marks */}
      <line x1="4" y1="16" x2="3" y2="16" {...DEFAULTS} />
      <line x1="20" y1="16" x2="21" y2="16" {...DEFAULTS} />
      <line x1="5.4" y1="10.5" x2="4.7" y2="9.7" {...DEFAULTS} />
      <line x1="18.6" y1="10.5" x2="19.3" y2="9.7" {...DEFAULTS} />
      <line x1="12" y1="7" x2="12" y2="6" {...DEFAULTS} />
      {/* needle pointing to high pressure */}
      <line x1="12" y1="16" x2="17.5" y2="10" {...DEFAULTS} strokeWidth={2} />
      {/* pivot */}
      <circle cx="12" cy="16" r="1.2" {...DEFAULTS} />
      {/* pump body below */}
      <rect x="8" y="17" width="8" height="5" rx="1.2" {...DEFAULTS} />
      {/* pump inlet */}
      <line x1="5" y1="19.5" x2="8" y2="19.5" {...DEFAULTS} />
      <line x1="16" y1="19.5" x2="19" y2="19.5" {...DEFAULTS} />
    </svg>
  )
}

/** 11. Descalcificadores y Ósmosis — filter cartridge with mineral dots */
export function IconDescalcificadoresOsmosis({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* cartridge body */}
      <rect x="8" y="4" width="8" height="14" rx="2" {...DEFAULTS} />
      {/* top cap */}
      <rect x="9.5" y="2" width="5" height="2.5" rx="0.8" {...DEFAULTS} />
      {/* bottom cap */}
      <rect x="9.5" y="18" width="5" height="2.5" rx="0.8" {...DEFAULTS} />
      {/* filter layers inside */}
      <line x1="8" y1="9" x2="16" y2="9" {...DEFAULTS} strokeWidth={1.2} strokeOpacity={0.45} />
      <line x1="8" y1="13" x2="16" y2="13" {...DEFAULTS} strokeWidth={1.2} strokeOpacity={0.45} />
      {/* mineral particles left side */}
      <circle cx="5.2" cy="9" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="15" r="0.6" fill="currentColor" stroke="none" />
      {/* clean drops right side */}
      <path d="M19 8.5 Q19 10.2 19.8 10.5 Q20.6 10.2 20.6 8.5 Q20.6 7.5 19.8 7.5 Q19 7.5 19 8.5Z" fill="currentColor" stroke="none" fillOpacity={0.35} />
      <path d="M19 13.5 Q19 15.2 19.8 15.5 Q20.6 15.2 20.6 13.5 Q20.6 12.5 19.8 12.5 Q19 12.5 19 13.5Z" fill="currentColor" stroke="none" fillOpacity={0.35} />
    </svg>
  )
}

/** 12. Mantenimiento Preventivo — clipboard with wrench and check */
export function IconMantenimiento({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* clipboard body */}
      <rect x="4" y="4" width="16" height="18" rx="1.5" {...DEFAULTS} />
      {/* clip */}
      <rect x="9" y="2" width="6" height="3.5" rx="1" {...DEFAULTS} />
      {/* lines */}
      <line x1="7" y1="10" x2="17" y2="10" {...DEFAULTS} strokeWidth={1.3} />
      <line x1="7" y1="14" x2="13" y2="14" {...DEFAULTS} strokeWidth={1.3} />
      {/* wrench hint */}
      <path d="M14 17 L17.5 13.5" {...DEFAULTS} strokeWidth={1.6} />
      <circle cx="15" cy="18.2" r="1" {...DEFAULTS} strokeWidth={1.3} />
      {/* check on first line */}
      <polyline points="7,7.5 8.5,9 11,6.5" {...DEFAULTS} strokeWidth={1.6} />
    </svg>
  )
}

/** 13. Instalación y Cambio de Lavabos — sink bowl with drain and wrench */
export function IconInstalacionLavabos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* backsplash */}
      <line x1="3" y1="7" x2="21" y2="7" {...DEFAULTS} />
      {/* basin */}
      <path d="M5 7 L4 16 Q4 18 6 18 L18 18 Q20 18 20 16 L19 7" {...DEFAULTS} />
      {/* faucet */}
      <line x1="12" y1="7" x2="12" y2="4" {...DEFAULTS} />
      <path d="M10 4 Q10 3 12 3 Q14 3 14 4 L14 5 L10 5 Z" {...DEFAULTS} />
      {/* drain */}
      <circle cx="12" cy="17" r="1" {...DEFAULTS} strokeWidth={1.3} />
      {/* pipe down */}
      <line x1="12" y1="18" x2="12" y2="22" {...DEFAULTS} />
    </svg>
  )
}

/** 14. Reparación de Duchas — shower head with tool mark */
export function IconReparacionDuchas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* arm */}
      <path d="M5 3 L5 8 Q5 9.5 7 9.5 L11 9.5" {...DEFAULTS} />
      {/* head body */}
      <rect x="11" y="7.5" width="8" height="4" rx="1.5" {...DEFAULTS} />
      {/* spray */}
      <line x1="12.5" y1="11.5" x2="12" y2="14.5" {...DEFAULTS} />
      <line x1="15" y1="11.5" x2="14.8" y2="15" {...DEFAULTS} />
      <line x1="17.5" y1="11.5" x2="17.5" y2="14.5" {...DEFAULTS} />
      <circle cx="12" cy="15" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="15.5" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="15" r="0.45" fill="currentColor" stroke="none" />
      {/* wrench crossing head */}
      <path d="M11.5 9 L14 6.5" {...DEFAULTS} strokeWidth={1.6} />
      <circle cx="11" cy="9.5" r="1.2" {...DEFAULTS} strokeWidth={1.3} />
    </svg>
  )
}

/** 15. Instalación de Platos de Ducha — shower tray with drain and level mark */
export function IconPlatosDucha({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* tray */}
      <rect x="3" y="14" width="18" height="5" rx="1.5" {...DEFAULTS} />
      {/* drain */}
      <circle cx="12" cy="16.5" r="1.2" {...DEFAULTS} strokeWidth={1.3} />
      {/* pipe down */}
      <line x1="12" y1="19" x2="12" y2="22" {...DEFAULTS} />
      {/* level tool above */}
      <rect x="5" y="9" width="14" height="3.5" rx="1" {...DEFAULTS} />
      <circle cx="12" cy="10.75" r="1" {...DEFAULTS} strokeWidth={1.3} />
      {/* bubble dot */}
      <circle cx="12" cy="10.75" r="0.35" fill="currentColor" stroke="none" />
      {/* check mark */}
      <polyline points="5.5,7 7,8.5 9.5,5.5" {...DEFAULTS} strokeWidth={1.6} />
    </svg>
  )
}

/** 16. Instalación de Mamparas de Ducha — glass panel with hinge lines */
export function IconMamparasDucha({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* wall side */}
      <line x1="4" y1="3" x2="4" y2="21" {...DEFAULTS} strokeWidth={2.5} />
      {/* fixed panel */}
      <rect x="4" y="4" width="6" height="16" rx="0.5" {...DEFAULTS} strokeWidth={1.4} strokeOpacity={0.5} />
      {/* glass light */}
      <rect x="5" y="5.5" width="4" height="13" rx="0.3" fill="currentColor" fillOpacity={0.07} stroke="none" />
      {/* hinge */}
      <circle cx="4" cy="8" r="0.9" {...DEFAULTS} />
      <circle cx="4" cy="16" r="0.9" {...DEFAULTS} />
      {/* opening door panel */}
      <path d="M10 4 Q18 6 18 12 Q18 18 10 20" {...DEFAULTS} strokeWidth={1.4} />
      {/* handle */}
      <line x1="10.5" y1="10.5" x2="10.5" y2="13.5" {...DEFAULTS} strokeWidth={2} />
    </svg>
  )
}

/** 17. Instalación y Reparación de Fregaderos — kitchen sink with faucet */
export function IconFregaderos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* countertop */}
      <line x1="2" y1="8" x2="22" y2="8" {...DEFAULTS} />
      {/* basin left */}
      <rect x="3" y="8" width="8" height="9" rx="1" {...DEFAULTS} />
      {/* basin right */}
      <rect x="13" y="8" width="8" height="9" rx="1" {...DEFAULTS} />
      {/* center divider handled by gap */}
      {/* faucet column */}
      <line x1="12" y1="8" x2="12" y2="4" {...DEFAULTS} />
      {/* faucet arm */}
      <path d="M12 4 Q14 4 14 6 L14 8" {...DEFAULTS} />
      {/* handle */}
      <line x1="10" y1="4" x2="12" y2="4" {...DEFAULTS} />
      {/* drains */}
      <circle cx="7" cy="15.5" r="0.8" {...DEFAULTS} strokeWidth={1.3} />
      <circle cx="17" cy="15.5" r="0.8" {...DEFAULTS} strokeWidth={1.3} />
    </svg>
  )
}

/** 18. Cambio de Llaves de Paso — shut-off valve with handle */
export function IconLlavesPaso({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* pipe left */}
      <line x1="2" y1="12" x2="8" y2="12" {...DEFAULTS} strokeWidth={2.5} />
      {/* pipe right */}
      <line x1="16" y1="12" x2="22" y2="12" {...DEFAULTS} strokeWidth={2.5} />
      {/* valve body */}
      <circle cx="12" cy="12" r="4" {...DEFAULTS} />
      {/* valve handle (ball-valve T) */}
      <line x1="12" y1="8" x2="12" y2="5" {...DEFAULTS} strokeWidth={1.8} />
      <line x1="10" y1="5" x2="14" y2="5" {...DEFAULTS} strokeWidth={2} />
      {/* flow indicator */}
      <line x1="9.5" y1="12" x2="14.5" y2="12" {...DEFAULTS} strokeWidth={1} strokeOpacity={0.4} />
    </svg>
  )
}

/** 19. Válvulas y Mecanismos de Fontanería — technical valve coupling */
export function IconValvulasFontaneria({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* pipe ends */}
      <line x1="2" y1="12" x2="6.5" y2="12" {...DEFAULTS} strokeWidth={2} />
      <line x1="17.5" y1="12" x2="22" y2="12" {...DEFAULTS} strokeWidth={2} />
      {/* flanges */}
      <rect x="5.5" y="9.5" width="2.5" height="5" rx="0.5" {...DEFAULTS} />
      <rect x="16" y="9.5" width="2.5" height="5" rx="0.5" {...DEFAULTS} />
      {/* valve body hex */}
      <polygon points="12,7 15,9 15,15 12,17 9,15 9,9" {...DEFAULTS} />
      {/* stem */}
      <line x1="12" y1="7" x2="12" y2="4.5" {...DEFAULTS} />
      <circle cx="12" cy="4" r="1" {...DEFAULTS} />
      {/* inner dot */}
      <circle cx="12" cy="12" r="1.5" {...DEFAULTS} strokeWidth={1.2} />
    </svg>
  )
}

/** 20. Reparación y Cambio de Bajantes — vertical drain pipe with downward flow */
export function IconBajantes({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* vertical pipe */}
      <rect x="9" y="2" width="6" height="20" rx="1.5" {...DEFAULTS} />
      {/* elbow at top */}
      <path d="M9 5 Q5 5 5 9" {...DEFAULTS} />
      {/* bracket mount */}
      <line x1="15" y1="7" x2="19" y2="7" {...DEFAULTS} strokeWidth={1.4} />
      <line x1="15" y1="14" x2="19" y2="14" {...DEFAULTS} strokeWidth={1.4} />
      {/* downward flow arrows inside */}
      <polyline points="10.5,9 12,11.5 13.5,9" {...DEFAULTS} strokeWidth={1.3} strokeOpacity={0.5} />
      <polyline points="10.5,14 12,16.5 13.5,14" {...DEFAULTS} strokeWidth={1.3} strokeOpacity={0.5} />
    </svg>
  )
}

/** 21. Humedades y Filtraciones — wall corner with water stain and lens */
export function IconHumedadesFiltraciones({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* wall corner */}
      <path d="M4 4 L4 20 L20 20" {...DEFAULTS} strokeWidth={2} />
      {/* moisture stain */}
      <path d="M4 12 Q7 10 9 14 Q11 18 7 19 Q4 18.5 4 16 Z" fill="currentColor" fillOpacity={0.1} stroke="currentColor" strokeWidth={1.2} />
      {/* drip */}
      <path d="M7 19 Q7 21.5 8 22 Q9 21.5 9 19.5 Q9 18.5 8 18.5 Q7 18.5 7 19Z" fill="currentColor" fillOpacity={0.25} strokeWidth={1} stroke="currentColor" />
      {/* magnifying lens */}
      <circle cx="17" cy="10" r="4" {...DEFAULTS} />
      <line x1="20" y1="13" x2="22" y2="15.5" {...DEFAULTS} strokeWidth={1.8} />
    </svg>
  )
}

/** 22. Fontanería para Baños — bathroom plan with pipe, sink, toilet icons */
export function IconFontaneriaBanos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* room outline */}
      <path d="M3 3 L3 21 L21 21 L21 3 L3 3" {...DEFAULTS} />
      {/* simplified toilet */}
      <rect x="5" y="4.5" width="5" height="3" rx="0.8" {...DEFAULTS} strokeWidth={1.2} />
      <path d="M5 7.5 Q4.5 11.5 7.5 12 Q10.5 11.5 10 7.5" {...DEFAULTS} strokeWidth={1.2} />
      {/* simplified sink */}
      <rect x="14" y="4.5" width="5" height="5" rx="1.2" {...DEFAULTS} strokeWidth={1.2} />
      <circle cx="16.5" cy="7" r="0.6" {...DEFAULTS} strokeWidth={1.1} />
      {/* pipe run */}
      <path d="M12 12 L12 18 L18 18" {...DEFAULTS} strokeWidth={1.3} strokeOpacity={0.6} />
    </svg>
  )
}

/** 23. Fontanería para Cocinas — kitchen counter pipe connection */
export function IconFontaneriaCocinas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* counter */}
      <rect x="2" y="8" width="20" height="2.5" rx="1" {...DEFAULTS} />
      {/* sink hole in counter */}
      <rect x="7" y="8" width="10" height="8" rx="1" {...DEFAULTS} />
      {/* faucet */}
      <line x1="12" y1="8" x2="12" y2="5" {...DEFAULTS} />
      <path d="M12 5 Q15 5 15 7.5" {...DEFAULTS} />
      {/* drain */}
      <circle cx="12" cy="14" r="0.9" {...DEFAULTS} strokeWidth={1.2} />
      {/* under-counter pipe */}
      <path d="M12 16 L12 20 L16 20" {...DEFAULTS} strokeWidth={1.3} />
      {/* shutoff valve */}
      <circle cx="16.5" cy="20" r="1" {...DEFAULTS} strokeWidth={1.3} />
      <line x1="16.5" y1="19" x2="16.5" y2="17.5" {...DEFAULTS} strokeWidth={1.5} />
    </svg>
  )
}

/** 24. Fontanería para Comunidades — apartment building with pipe/water line */
export function IconComunidadesFontaneria({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* building */}
      <rect x="4" y="5" width="16" height="17" rx="1" {...DEFAULTS} />
      {/* roof */}
      <polyline points="2,5 12,2 22,5" {...DEFAULTS} />
      {/* windows floor 1 */}
      <rect x="6.5" y="7.5" width="3" height="3" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="14.5" y="7.5" width="3" height="3" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      {/* windows floor 2 */}
      <rect x="6.5" y="13" width="3" height="3" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="14.5" y="13" width="3" height="3" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      {/* central riser pipe */}
      <line x1="12" y1="5" x2="12" y2="22" {...DEFAULTS} strokeWidth={1.3} strokeOpacity={0.5} />
      {/* horizontal branches */}
      <line x1="9.5" y1="9" x2="12" y2="9" {...DEFAULTS} strokeWidth={1.1} strokeOpacity={0.5} />
      <line x1="14.5" y1="9" x2="12" y2="9" {...DEFAULTS} strokeWidth={1.1} strokeOpacity={0.5} />
      <line x1="9.5" y1="14.5" x2="12" y2="14.5" {...DEFAULTS} strokeWidth={1.1} strokeOpacity={0.5} />
      <line x1="14.5" y1="14.5" x2="12" y2="14.5" {...DEFAULTS} strokeWidth={1.1} strokeOpacity={0.5} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELECTRICAL ICONS
// ─────────────────────────────────────────────────────────────────────────────

/** E1. Urgencias Eléctricas — lightning bolt with alert ring */
export function IconUrgenciasElectricas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* outer alert ring (dashed) */}
      <circle cx="12" cy="12" r="9.5" {...DEFAULTS} strokeDasharray="3 2" strokeOpacity={0.4} />
      {/* lightning bolt */}
      <path d="M13.5 3 L7 13 L12 13 L10.5 21 L17 11 L12 11 Z" {...DEFAULTS} />
    </svg>
  )
}

/** E2. Reparación de Averías Eléctricas — broken circuit with wrench */
export function IconAveriasElectricas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* circuit path left */}
      <path d="M2 12 L6 12 L6 7 L10 7" {...DEFAULTS} />
      {/* break gap */}
      <line x1="10" y1="7" x2="11" y2="7" {...DEFAULTS} strokeDasharray="1 1.5" />
      <line x1="13" y1="7" x2="14" y2="7" {...DEFAULTS} strokeDasharray="1 1.5" />
      {/* circuit path right */}
      <path d="M14 7 L18 7 L18 12 L22 12" {...DEFAULTS} />
      {/* wrench */}
      <path d="M10.5 10.5 L14.5 14.5" {...DEFAULTS} strokeWidth={1.8} />
      <circle cx="10" cy="11" r="1.8" {...DEFAULTS} strokeWidth={1.4} />
      <circle cx="15" cy="14" r="1.8" {...DEFAULTS} strokeWidth={1.4} />
      {/* spark at break */}
      <path d="M11.5 5.5 L12 7 L12.5 5.5" {...DEFAULTS} strokeWidth={1.4} />
    </svg>
  )
}

/** E3. Instalaciones Eléctricas — wiring nodes with check */
export function IconInstalacionesElectricas({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* bus line */}
      <line x1="3" y1="12" x2="21" y2="12" {...DEFAULTS} />
      {/* node circles */}
      <circle cx="7" cy="12" r="1.4" {...DEFAULTS} />
      <circle cx="17" cy="12" r="1.4" {...DEFAULTS} />
      {/* branch up-left */}
      <path d="M7 10.6 L7 6 L10 6" {...DEFAULTS} />
      <circle cx="10.8" cy="6" r="0.8" fill="currentColor" stroke="none" fillOpacity={0.7} />
      {/* branch up-right */}
      <path d="M17 10.6 L17 6 L14 6" {...DEFAULTS} />
      <circle cx="13.2" cy="6" r="0.8" fill="currentColor" stroke="none" fillOpacity={0.7} />
      {/* branch down */}
      <path d="M12 12 L12 17" {...DEFAULTS} />
      <circle cx="12" cy="12" r="1.4" {...DEFAULTS} />
      {/* check mark */}
      <polyline points="9.5,17 11.5,19 15.5,15" {...DEFAULTS} strokeWidth={1.8} />
    </svg>
  )
}

/** E4. Cuadros Eléctricos — electrical panel with breaker rows */
export function IconCuadrosElectricos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* panel box */}
      <rect x="3" y="2" width="18" height="20" rx="1.5" {...DEFAULTS} />
      {/* door line */}
      <line x1="12" y1="2" x2="12" y2="22" {...DEFAULTS} strokeWidth={1} strokeOpacity={0.3} />
      {/* breakers left column */}
      <rect x="5" y="5" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="5" y="9" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="5" y="13" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="5" y="17" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      {/* breakers right column */}
      <rect x="14" y="5" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="14" y="9" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="14" y="13" width="5" height="2.5" rx="0.5" {...DEFAULTS} strokeWidth={1.2} />
      {/* main breaker top full width */}
      <rect x="5" y="17" width="14" height="2.5" rx="0.5" {...DEFAULTS} fill="currentColor" fillOpacity={0.12} strokeWidth={1.3} />
    </svg>
  )
}

/** E5. Enchufes e Interruptores — outlet face with switch */
export function IconEnchufesInterruptores({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* outlet plate */}
      <rect x="3" y="5" width="10" height="14" rx="1.5" {...DEFAULTS} />
      {/* outlet face circle */}
      <circle cx="8" cy="12" r="3.5" {...DEFAULTS} />
      {/* prong holes */}
      <line x1="7" y1="11" x2="7" y2="12.5" {...DEFAULTS} strokeWidth={1.6} />
      <line x1="9" y1="11" x2="9" y2="12.5" {...DEFAULTS} strokeWidth={1.6} />
      {/* switch plate */}
      <rect x="15" y="5" width="6" height="14" rx="1.5" {...DEFAULTS} />
      {/* switch paddle */}
      <rect x="16.5" y="7" width="3" height="5" rx="1" {...DEFAULTS} strokeWidth={1.3} />
      {/* switch ON indicator */}
      <circle cx="18" cy="15.5" r="0.8" fill="currentColor" stroke="none" fillOpacity={0.5} />
    </svg>
  )
}

/** E6. Puesta a Tierra — grounding symbol with cable terminal */
export function IconPuestaTierra({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* vertical lead */}
      <line x1="12" y1="3" x2="12" y2="13" {...DEFAULTS} />
      {/* top terminal */}
      <circle cx="12" cy="3" r="1.2" {...DEFAULTS} />
      {/* ground lines */}
      <line x1="5" y1="13" x2="19" y2="13" {...DEFAULTS} />
      <line x1="7.5" y1="16.5" x2="16.5" y2="16.5" {...DEFAULTS} />
      <line x1="10" y1="20" x2="14" y2="20" {...DEFAULTS} />
    </svg>
  )
}

/** E7. Iluminación LED — LED bulb with clean linear rays */
export function IconIluminacionLed({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* bulb dome */}
      <path d="M9 14 Q7 12 7 9 A5 5 0 0 1 17 9 Q17 12 15 14 Z" {...DEFAULTS} />
      {/* base neck */}
      <rect x="9" y="14" width="6" height="2" rx="0.5" {...DEFAULTS} />
      <rect x="9.5" y="16" width="5" height="2" rx="0.5" {...DEFAULTS} />
      {/* base threads */}
      <line x1="9.5" y1="17" x2="14.5" y2="17" {...DEFAULTS} strokeWidth={0.9} strokeOpacity={0.4} />
      {/* LED filament dots */}
      <circle cx="11" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13" cy="11" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
      {/* rays */}
      <line x1="12" y1="3" x2="12" y2="5" {...DEFAULTS} />
      <line x1="17.5" y1="5" x2="16.2" y2="6.3" {...DEFAULTS} />
      <line x1="6.5" y1="5" x2="7.8" y2="6.3" {...DEFAULTS} />
      <line x1="20" y1="9" x2="18" y2="9" {...DEFAULTS} />
      <line x1="4" y1="9" x2="6" y2="9" {...DEFAULTS} />
    </svg>
  )
}

/** E8. Pequeños Trabajos Eléctricos — screwdriver with small bolt */
export function IconPequenosTrabajos({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* screwdriver shaft */}
      <line x1="5" y1="19" x2="17" y2="7" {...DEFAULTS} strokeWidth={2} />
      {/* handle */}
      <path d="M17 7 L19 5 Q20.5 5 20.5 6.5 Q20.5 8 19 8 L17 7" {...DEFAULTS} strokeWidth={1.4} />
      {/* tip */}
      <path d="M4.5 19.5 L3.5 20.5 L5 20.5 L5 19 Z" fill="currentColor" stroke="none" />
      {/* small lightning bolt */}
      <path d="M8.5 12 L6 15.5 L8.5 15.5 L6 19" {...DEFAULTS} strokeWidth={1.5} />
    </svg>
  )
}

/** E9. Cargador de Coche Eléctrico — EV plug with battery outline */
export function IconCargadorCocheElectrico({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* cable */}
      <path d="M4 12 Q4 7 9 7 L11 7" {...DEFAULTS} />
      {/* plug body */}
      <rect x="11" y="5" width="7" height="10" rx="1.5" {...DEFAULTS} />
      {/* plug pins */}
      <line x1="13.5" y1="5" x2="13.5" y2="3" {...DEFAULTS} strokeWidth={1.6} />
      <line x1="16.5" y1="5" x2="16.5" y2="3" {...DEFAULTS} strokeWidth={1.6} />
      {/* charge bolt inside plug */}
      <path d="M15.5 7.5 L13.5 11 L15.5 11 L13.5 14" {...DEFAULTS} strokeWidth={1.4} />
      {/* small car side silhouette */}
      <path d="M3 14 Q3 12.5 4 12.5 L10 12.5 Q10 12.5 11 11.5 Q11.5 10.5 13 10.5 L20 10.5" {...DEFAULTS} strokeWidth={1.2} strokeOpacity={0.4} />
      <circle cx="5.5" cy="15" r="1.2" {...DEFAULTS} strokeWidth={1.3} />
      <circle cx="9.5" cy="15" r="1.2" {...DEFAULTS} strokeWidth={1.3} />
    </svg>
  )
}

/** E10. Domótica — smart home with connected nodes */
export function IconDomotica({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* house outline */}
      <path d="M3 10 L12 3 L21 10 L21 21 L3 21 Z" {...DEFAULTS} />
      {/* wifi arcs inside */}
      <path d="M9 14 Q12 11 15 14" {...DEFAULTS} strokeWidth={1.4} />
      <path d="M10.5 16.5 Q12 15 13.5 16.5" {...DEFAULTS} strokeWidth={1.4} />
      {/* center node */}
      <circle cx="12" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
      {/* corner node dots */}
      <circle cx="5" cy="21" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="19" cy="21" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="3" r="0.8" fill="currentColor" stroke="none" />
      {/* connectors */}
      <line x1="5" y1="21" x2="12" y2="18.5" {...DEFAULTS} strokeWidth={1} strokeOpacity={0.4} />
      <line x1="19" y1="21" x2="12" y2="18.5" {...DEFAULTS} strokeWidth={1} strokeOpacity={0.4} />
    </svg>
  )
}

/** E11. Videoportero y Portero Automático — intercom screen with bell and camera */
export function IconVideoportero({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* device body */}
      <rect x="4" y="3" width="16" height="18" rx="2" {...DEFAULTS} />
      {/* screen */}
      <rect x="6.5" y="5.5" width="8" height="7" rx="1" {...DEFAULTS} />
      {/* camera lens on screen */}
      <circle cx="10.5" cy="9" r="1.5" {...DEFAULTS} strokeWidth={1.3} />
      <circle cx="10.5" cy="9" r="0.5" fill="currentColor" stroke="none" fillOpacity={0.5} />
      {/* speaker grille */}
      <line x1="16" y1="6.5" x2="18" y2="6.5" {...DEFAULTS} strokeWidth={1} />
      <line x1="16" y1="8" x2="18" y2="8" {...DEFAULTS} strokeWidth={1} />
      <line x1="16" y1="9.5" x2="18" y2="9.5" {...DEFAULTS} strokeWidth={1} />
      {/* call button */}
      <circle cx="10.5" cy="16.5" r="2" {...DEFAULTS} />
      {/* bell inside button */}
      <path d="M9.8 16.5 Q10.5 15.2 11.2 16.5" {...DEFAULTS} strokeWidth={1.2} />
      <line x1="10.5" y1="17.5" x2="10.5" y2="18" {...DEFAULTS} strokeWidth={1.2} />
    </svg>
  )
}

/** E12. Mantenimiento Eléctrico — shield with circuit line check */
export function IconMantenimientoElectrico({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* shield */}
      <path d="M12 2 L20 5 L20 12 Q20 18 12 22 Q4 18 4 12 L4 5 Z" {...DEFAULTS} />
      {/* circuit check path */}
      <path d="M7 12 L9.5 12 L11 9.5 L13 14.5 L14.5 12 L17 12" {...DEFAULTS} strokeWidth={1.6} />
    </svg>
  )
}

/** E13. Revisión Eléctrica — magnifying glass over circuit/panel */
export function IconRevisionElectrica({ size = 30, color, className, "aria-label": label }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} className={className} aria-label={label} role={label ? "img" : "presentation"} {...DEFAULTS}>
      {/* panel background */}
      <rect x="2" y="4" width="13" height="16" rx="1.5" {...DEFAULTS} />
      {/* breaker stubs inside */}
      <rect x="4" y="7" width="4" height="2" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="4" y="11" width="4" height="2" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      <rect x="4" y="15" width="4" height="2" rx="0.4" {...DEFAULTS} strokeWidth={1.2} />
      {/* waveform on right side of panel */}
      <path d="M9 8 L10.5 8 L11.5 6.5 L12.5 9.5 L13.5 8 L14 8" {...DEFAULTS} strokeWidth={1.3} />
      {/* magnifying glass */}
      <circle cx="17" cy="14" r="4.5" {...DEFAULTS} />
      <line x1="20.2" y1="17.2" x2="22.5" y2="19.5" {...DEFAULTS} strokeWidth={2} />
      {/* bolt inside lens */}
      <path d="M17.5 11.5 L15.5 14.5 L17.5 14.5 L15.5 17" {...DEFAULTS} strokeWidth={1.4} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  SERVICE ICON MAP
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceIconComponent = React.FC<IconProps>

export const serviceIconMap: Record<string, ServiceIconComponent> = {
  // Plumbing — existing
  "reparacion-fugas": IconReparacionFugas,
  "cambio-reparacion-grifos": IconCambioReparacionGrifos,
  "reparacion-cisternas": IconReparacionCisternas,
  "desatascos": IconDesatascos,
  "instalaciones": IconInstalaciones,
  "instalacion-cambio-inodoros": IconInstalacionCambioInodoros,
  "cambio-banera-por-ducha": IconCambioBaneraDucha,
  "sustitucion-tuberias": IconSustitucionTuberias,
  "calentadores-termos": IconCalentadoresTermos,
  "grupos-presion-agua": IconGruposPresionAgua,
  "descalcificadores-osmosis": IconDescalcificadoresOsmosis,
  "mantenimiento": IconMantenimiento,
  // Plumbing — future
  "instalacion-lavabos": IconInstalacionLavabos,
  "reparacion-duchas": IconReparacionDuchas,
  "platos-ducha": IconPlatosDucha,
  "mamparas-ducha": IconMamparasDucha,
  "fregaderos": IconFregaderos,
  "llaves-paso": IconLlavesPaso,
  "valvulas-fontaneria": IconValvulasFontaneria,
  "bajantes": IconBajantes,
  "humedades-filtraciones": IconHumedadesFiltraciones,
  "fontaneria-banos": IconFontaneriaBanos,
  "fontaneria-cocinas": IconFontaneriaCocinas,
  "comunidades-fontaneria": IconComunidadesFontaneria,
  // Electrical
  "urgencias-electricas": IconUrgenciasElectricas,
  "averias-electricas": IconAveriasElectricas,
  "instalaciones-electricas": IconInstalacionesElectricas,
  "cuadros-electricos": IconCuadrosElectricos,
  "enchufes-interruptores": IconEnchufesInterruptores,
  "puesta-tierra": IconPuestaTierra,
  "iluminacion-led": IconIluminacionLed,
  "pequenos-trabajos-electricos": IconPequenosTrabajos,
  "cargador-coche-electrico": IconCargadorCocheElectrico,
  "domotica": IconDomotica,
  "videoportero-portero-automatico": IconVideoportero,
  "mantenimiento-electrico": IconMantenimientoElectrico,
  "revision-electrica": IconRevisionElectrica,
}
