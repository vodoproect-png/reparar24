import type { Locale } from '@/lib/i18n/config'
import {
  generateChildServiceMetadata,
  generateChildServiceStaticParams,
  ServiceChildPageTemplate,
} from '@/components/templates/ServiceChildPageTemplate'

export function generateStaticParams() {
  return generateChildServiceStaticParams('aire-acondicionado')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return generateChildServiceMetadata('aire-acondicionado', params)
}

export default function AireAcondicionadoChildServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; childSlug: string }>
}) {
  return <ServiceChildPageTemplate parentSlug="aire-acondicionado" params={params} />
}
