import type { Locale } from '@/lib/i18n/config'
import {
  generateChildServiceMetadata,
  generateChildServiceStaticParams,
  ServiceChildPageTemplate,
} from '@/components/templates/ServiceChildPageTemplate'

export function generateStaticParams() {
  return generateChildServiceStaticParams('calefaccion')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return generateChildServiceMetadata('calefaccion', params)
}

export default function CalefaccionChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return <ServiceChildPageTemplate parentSlug="calefaccion" params={params} />
}
