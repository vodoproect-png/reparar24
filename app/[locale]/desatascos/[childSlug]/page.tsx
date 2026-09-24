import type { Locale } from '@/lib/i18n/config'
import {
  generateChildServiceMetadata,
  generateChildServiceStaticParams,
  ServiceChildPageTemplate,
} from '@/components/templates/ServiceChildPageTemplate'

export function generateStaticParams() {
  return generateChildServiceStaticParams('desatascos')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return generateChildServiceMetadata('desatascos', params)
}

export default function DesatascosChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return <ServiceChildPageTemplate parentSlug="desatascos" params={params} />
}
