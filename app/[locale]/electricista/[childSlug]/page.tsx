import type { Locale } from '@/lib/i18n/config'
import {
  generateChildServiceMetadata,
  generateChildServiceStaticParams,
  ServiceChildPageTemplate,
} from '@/components/templates/ServiceChildPageTemplate'

export function generateStaticParams() {
  return generateChildServiceStaticParams('electricista')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return generateChildServiceMetadata('electricista', params)
}

export default function ElectricistaChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return <ServiceChildPageTemplate parentSlug="electricista" params={params} />
}
