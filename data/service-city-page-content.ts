import type { ServicesGridV1Props } from '@/components/ds/ServicesGridV1'
import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3Props } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1Props } from '@/components/ds/PricingSectionV1'
import type { OpinionesClientesV1Props } from '@/components/ds/OpinionesClientesV1'
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'
import {
  fontaneroServicesGridContent,
  fontaneroTrustSignalsContent,
  fontaneroProcessStepsContent,
  fontaneroPricingSectionContent,
  fontaneroOpinionesClientesContent,
} from '@/data/fontanero/page-components-content'
import {
  electricistaServicesGridContent,
  electricistaTrustSignalsContent,
  electricistaProcessStepsContent,
  electricistaPricingSectionContent,
  electricistaOpinionesClientesContent,
} from '@/data/electricista/page-components-content'
import {
  aireAcondicionadoServicesDirectoryContent,
  aireAcondicionadoTrustSignalsContent,
  aireAcondicionadoProcessStepsContent,
  aireAcondicionadoPricingSectionContent,
  aireAcondicionadoOpinionesClientesContent,
} from '@/data/aire-acondicionado/page-components-content'

type ServicesListing =
  | {
      kind: 'grid'
      props: ServicesGridV1Props
    }
  | {
      kind: 'directory'
      props: ServicesDirectoryV2Props
    }

export interface ServiceCityPageContent {
  servicesListing: ServicesListing
  trustSignals: TrustSignalsV1Props
  processSteps: ProcessStepsV3Props
  pricing: PricingSectionV1Props
  opiniones: OpinionesClientesV1Props
  showValenciaCoverage?: boolean
}

export const SERVICE_CITY_PAGE_CONTENT: Record<string, ServiceCityPageContent> = {
  fontanero: {
    servicesListing: {
      kind: 'grid',
      props: fontaneroServicesGridContent,
    },
    trustSignals: fontaneroTrustSignalsContent,
    processSteps: fontaneroProcessStepsContent,
    pricing: fontaneroPricingSectionContent,
    opiniones: fontaneroOpinionesClientesContent,
    showValenciaCoverage: true,
  },
  electricista: {
    servicesListing: {
      kind: 'grid',
      props: electricistaServicesGridContent,
    },
    trustSignals: electricistaTrustSignalsContent,
    processSteps: electricistaProcessStepsContent,
    pricing: electricistaPricingSectionContent,
    opiniones: electricistaOpinionesClientesContent,
  },
  'aire-acondicionado': {
    servicesListing: {
      kind: 'directory',
      props: aireAcondicionadoServicesDirectoryContent,
    },
    trustSignals: aireAcondicionadoTrustSignalsContent,
    processSteps: aireAcondicionadoProcessStepsContent,
    pricing: aireAcondicionadoPricingSectionContent,
    opiniones: aireAcondicionadoOpinionesClientesContent,
  },
}

export function getServiceCityPageContent(serviceSlug: string): ServiceCityPageContent | null {
  return SERVICE_CITY_PAGE_CONTENT[serviceSlug] ?? null
}

export { servicePageValenciaCoverage }
