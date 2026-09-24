import HomePage, { generateMetadata as generateHomeMetadata } from './[locale]/page'

const params = Promise.resolve({ locale: 'es' as const })

export async function generateMetadata() {
  return generateHomeMetadata()
}

export default function Page() {
  return <HomePage params={params} />
}
