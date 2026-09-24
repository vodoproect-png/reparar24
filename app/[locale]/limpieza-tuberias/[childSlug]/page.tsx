import type { Locale } from '@/lib/i18n/config'
import {
  generateChildServiceMetadata,
  generateChildServiceStaticParams,
  ServiceChildPageTemplate,
} from '@/components/templates/ServiceChildPageTemplate'

export function generateStaticParams() {
  return generateChildServiceStaticParams('limpieza-tuberias')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return generateChildServiceMetadata('limpieza-tuberias', params)
}

export default function LimpiezaTuberiasChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return <ServiceChildPageTemplate parentSlug="limpieza-tuberias" params={params} />
}
