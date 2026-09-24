import ServicePage, { generateMetadata as generateServiceMetadata } from '../[locale]/[serviceSlug]/page'

const params = Promise.resolve({ locale: 'es' as const, serviceSlug: 'aire-acondicionado' })

export async function generateMetadata() {
  return generateServiceMetadata({ params })
}

export default function Page() {
  return <ServicePage params={params} />
}
