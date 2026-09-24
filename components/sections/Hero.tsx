import type { Locale } from '@/lib/i18n/config'
import {
  ServiceHeroV2,
  Star,
  Clock,
  ShieldCheck,
  Droplets,
  Flame,
  Wrench,
} from '@/components/ds/ServiceHeroV2'
import { Zap } from 'lucide-react'
import { getPhoneHref, getPhoneDisplay, getWhatsAppHref } from '@/lib/config/contact'

interface HeroProps {
  locale: Locale
}

export default function Hero(_props: HeroProps) {
  void _props

  return (
    <ServiceHeroV2
      eyebrow="Servicio profesional 24h"
      title="Reparaciones del hogar"
      titleHighlight="sin perder tiempo"
      subtitle="Fontaneria, electricidad, desatascos y climatizacion con tecnicos identificados, vehiculo equipado y presupuesto antes de empezar."
      phoneCta={{
        label: 'Llamar ahora',
        sublabel: getPhoneDisplay(),
        href: getPhoneHref(),
      }}
      whatsappCta={{
        label: 'WhatsApp',
        sublabel: 'Respuesta rapida',
        href: getWhatsAppHref('Hola, necesito ayuda con una reparacion'),
      }}
      trustCards={[
        { icon: Clock, title: '30-60 min', subtitle: 'respuesta media' },
        { icon: Star, title: '4.8/5', subtitle: 'valoracion clientes' },
        { icon: ShieldCheck, title: 'Garantia', subtitle: 'trabajos asegurados' },
      ]}
      quickChips={[
        { icon: Droplets, label: 'Fontaneria', href: '/fontanero' },
        { icon: Zap, label: 'Electricidad', href: '/electricista' },
        { icon: Wrench, label: 'Desatascos', href: '/desatascos' },
        { icon: Flame, label: 'Clima', href: '/aire-acondicionado' },
      ]}
      highlights={[
        { label: 'Tecnicos profesionales' },
        { label: 'Presupuesto previo' },
        { label: 'Seguro RC 600.000€' },
        { label: 'Atencion 24/7' },
      ]}
      image={{
        src: '/images/homepage/reparar24-branded-technician-van.webp',
        alt: 'Tecnico de Reparar24 junto a una furgoneta rotulada con servicios de fontaneria, electricidad, desatascos y climatizacion',
      }}
    />
  )
}
