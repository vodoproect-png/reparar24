import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3Props } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1Props } from '@/components/ds/PricingSectionV1'
import type { OpinionesClientesV1Props } from '@/components/ds/OpinionesClientesV1'
import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'
import { fontaneroHubSeoContent, fontaneroHubFaqs } from '@/data/fontanero/hub-page-content'
import { electricistaHubSeoContent, electricistaHubFaqs } from '@/data/electricista/hub-page-content'
import { desatascosHubSeoContent, desatascosHubFaqs } from '@/data/desatascos/hub-page-content'
import { aireAcondicionadoHubSeoContent, aireAcondicionadoHubFaqs } from '@/data/aire-acondicionado/hub-page-content'
import { calefaccionHubSeoContent, calefaccionHubFaqs } from '@/data/calefaccion/hub-page-content'
import { limpiezaTuberiasHubSeoContent, limpiezaTuberiasHubFaqs } from '@/data/limpieza-tuberias/hub-page-content'
import {
  fontaneroServicesDirectoryContent,
  fontaneroTrustSignalsContent,
  fontaneroProcessStepsContent,
  fontaneroPricingSectionContent,
  fontaneroOpinionesClientesContent,
} from '@/data/fontanero/page-components-content'
import {
  electricistaServicesDirectoryContent,
  electricistaTrustSignalsContent,
  electricistaProcessStepsContent,
  electricistaPricingSectionContent,
  electricistaOpinionesClientesContent,
} from '@/data/electricista/page-components-content'
import {
  desatascosServicesDirectoryContent,
  desatascosTrustSignalsContent,
  desatascosProcessStepsContent,
  desatascosPricingSectionContent,
  desatascosOpinionesClientesContent,
} from '@/data/desatascos/page-components-content'
import {
  aireAcondicionadoServicesDirectoryContent,
  aireAcondicionadoTrustSignalsContent,
  aireAcondicionadoProcessStepsContent,
  aireAcondicionadoPricingSectionContent,
  aireAcondicionadoOpinionesClientesContent,
} from '@/data/aire-acondicionado/page-components-content'
import {
  calefaccionServicesDirectoryContent,
  calefaccionTrustSignalsContent,
  calefaccionProcessStepsContent,
  calefaccionPricingSectionContent,
  calefaccionOpinionesClientesContent,
} from '@/data/calefaccion/page-components-content'
import {
  limpiezaTuberiasServicesDirectoryContent,
  limpiezaTuberiasTrustSignalsContent,
  limpiezaTuberiasProcessStepsContent,
  limpiezaTuberiasPricingSectionContent,
  limpiezaTuberiasOpinionesClientesContent,
} from '@/data/limpieza-tuberias/page-components-content'

export type OptimizedServiceSlug =
  | 'fontanero'
  | 'electricista'
  | 'desatascos'
  | 'aire-acondicionado'
  | 'calefaccion'
  | 'limpieza-tuberias'

export interface HubFaq {
  question: string
  answer: string
}

export interface DistrictLinksCopy {
  title: string
  description: string
}

export interface ServicePageContent {
  servicesDirectory: ServicesDirectoryV2Props
  trustSignals: TrustSignalsV1Props
  processSteps: ProcessStepsV3Props
  pricing: PricingSectionV1Props
  opiniones: OpinionesClientesV1Props
  faqs: HubFaq[]
  seo: SeoContentSectionV1Props
  districtLinks: DistrictLinksCopy
}

export const SERVICE_PAGE_CONTENT: Record<OptimizedServiceSlug, ServicePageContent> = {
  fontanero: {
    servicesDirectory: fontaneroServicesDirectoryContent,
    trustSignals: fontaneroTrustSignalsContent,
    processSteps: fontaneroProcessStepsContent,
    pricing: fontaneroPricingSectionContent,
    opiniones: fontaneroOpinionesClientesContent,
    faqs: fontaneroHubFaqs,
    seo: fontaneroHubSeoContent,
    districtLinks: {
      title: 'Fontanero por zonas en Valencia',
      description: 'Accede directamente a las páginas de fontanero por distrito en Valencia.',
    },
  },
  electricista: {
    servicesDirectory: electricistaServicesDirectoryContent,
    trustSignals: electricistaTrustSignalsContent,
    processSteps: electricistaProcessStepsContent,
    pricing: electricistaPricingSectionContent,
    opiniones: electricistaOpinionesClientesContent,
    faqs: electricistaHubFaqs,
    seo: electricistaHubSeoContent,
    districtLinks: {
      title: 'Electricista por zonas en Valencia',
      description: 'Accede directamente a las páginas de electricista por distrito en Valencia.',
    },
  },
  desatascos: {
    servicesDirectory: desatascosServicesDirectoryContent,
    trustSignals: desatascosTrustSignalsContent,
    processSteps: desatascosProcessStepsContent,
    pricing: desatascosPricingSectionContent,
    opiniones: desatascosOpinionesClientesContent,
    faqs: desatascosHubFaqs,
    seo: desatascosHubSeoContent,
    districtLinks: {
      title: 'Desatascos por zonas en Valencia',
      description: 'Accede directamente a las páginas de desatascos por distrito en Valencia.',
    },
  },
  'aire-acondicionado': {
    servicesDirectory: aireAcondicionadoServicesDirectoryContent,
    trustSignals: aireAcondicionadoTrustSignalsContent,
    processSteps: aireAcondicionadoProcessStepsContent,
    pricing: aireAcondicionadoPricingSectionContent,
    opiniones: aireAcondicionadoOpinionesClientesContent,
    faqs: aireAcondicionadoHubFaqs,
    seo: aireAcondicionadoHubSeoContent,
    districtLinks: {
      title: 'Aire acondicionado por zonas en Valencia',
      description: 'Accede directamente a las páginas de climatización por distrito en Valencia.',
    },
  },
  calefaccion: {
    servicesDirectory: calefaccionServicesDirectoryContent,
    trustSignals: calefaccionTrustSignalsContent,
    processSteps: calefaccionProcessStepsContent,
    pricing: calefaccionPricingSectionContent,
    opiniones: calefaccionOpinionesClientesContent,
    faqs: calefaccionHubFaqs,
    seo: calefaccionHubSeoContent,
    districtLinks: {
      title: 'Calefacción por zonas en Valencia',
      description: 'Accede directamente a las páginas de calefacción por distrito en Valencia.',
    },
  },
  'limpieza-tuberias': {
    servicesDirectory: limpiezaTuberiasServicesDirectoryContent,
    trustSignals: limpiezaTuberiasTrustSignalsContent,
    processSteps: limpiezaTuberiasProcessStepsContent,
    pricing: limpiezaTuberiasPricingSectionContent,
    opiniones: limpiezaTuberiasOpinionesClientesContent,
    faqs: limpiezaTuberiasHubFaqs,
    seo: limpiezaTuberiasHubSeoContent,
    districtLinks: {
      title: 'Limpieza de tuberías por zonas en Valencia',
      description: 'Accede directamente a las páginas de limpieza de tuberías por distrito en Valencia.',
    },
  },
}

export const OPTIMIZED_SERVICE_SLUGS = Object.keys(SERVICE_PAGE_CONTENT) as OptimizedServiceSlug[]

export function getServicePageContent(serviceSlug: string): ServicePageContent | null {
  return SERVICE_PAGE_CONTENT[serviceSlug as OptimizedServiceSlug] ?? null
}

export function hasOptimizedServicePage(serviceSlug: string): serviceSlug is OptimizedServiceSlug {
  return serviceSlug in SERVICE_PAGE_CONTENT
}

export { servicePageValenciaCoverage }
