import type { ServicesGridV1Props } from '@/components/ds/ServicesGridV1'
import type { ServicesDirectoryV2Props } from '@/components/ds/ServicesDirectoryV2'
import type { TrustSignalsV1Props } from '@/components/ds/TrustSignalsV1'
import type { ProcessStepsV3Props } from '@/components/ds/ProcessStepsV3'
import type { PricingSectionV1Props } from '@/components/ds/PricingSectionV1'
import type { OpinionesClientesV1Props } from '@/components/ds/OpinionesClientesV1'
import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import { servicePageValenciaCoverage } from '@/data/block-presets/service-page-neutral'
import { childServicesData as fontaneroChildServicesData } from '@/data/fontanero/child-services-seo'
import { childServicesData as electricistaChildServicesData } from '@/data/electricista/child-services-seo'
import { desatascosChildServicesData } from '@/data/desatascos/child-services-seo'
import { aireAcondicionadoChildServicesData } from '@/data/aire-acondicionado/child-services-seo'
import { calefaccionChildServicesData } from '@/data/calefaccion/child-services-seo'
import { limpiezaTuberiasChildServicesData } from '@/data/limpieza-tuberias/child-services-seo'
import {
  fontaneroServicesDirectoryContent,
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

export type ChildPageServiceSlug =
  | 'fontanero'
  | 'electricista'
  | 'desatascos'
  | 'aire-acondicionado'
  | 'calefaccion'
  | 'limpieza-tuberias'

export interface ChildServiceData {
  h1: string
  metaTitle: string
  metaDescription: string
  lockedPrimaryKw: string
  secondaryKw: string[]
  description: string
  seoContent: SeoContentSectionV1Props
  faqs: { question: string; answer: string }[]
}

type ServicesListing =
  | {
      kind: 'grid'
      props: ServicesGridV1Props
    }
  | {
      kind: 'directory'
      props: ServicesDirectoryV2Props
    }

export interface ServiceChildPageContent {
  parentSlug: ChildPageServiceSlug
  parentLabel: string
  ogAlt: string
  childServices: Record<string, ChildServiceData>
  servicesListing: ServicesListing
  trustSignals: TrustSignalsV1Props
  processSteps: ProcessStepsV3Props
  pricing: PricingSectionV1Props
  opiniones: OpinionesClientesV1Props
}

export const SERVICE_CHILD_PAGE_CONTENT: Record<ChildPageServiceSlug, ServiceChildPageContent> = {
  fontanero: {
    parentSlug: 'fontanero',
    parentLabel: 'Fontanería',
    ogAlt: 'Fontanería profesional 24 horas | Reparar24',
    childServices: fontaneroChildServicesData,
    servicesListing: { kind: 'directory', props: fontaneroServicesDirectoryContent },
    trustSignals: fontaneroTrustSignalsContent,
    processSteps: fontaneroProcessStepsContent,
    pricing: fontaneroPricingSectionContent,
    opiniones: fontaneroOpinionesClientesContent,
  },
  electricista: {
    parentSlug: 'electricista',
    parentLabel: 'Electricista',
    ogAlt: 'Electricista profesional 24 horas | Reparar24',
    childServices: electricistaChildServicesData,
    servicesListing: { kind: 'grid', props: electricistaServicesGridContent },
    trustSignals: electricistaTrustSignalsContent,
    processSteps: electricistaProcessStepsContent,
    pricing: electricistaPricingSectionContent,
    opiniones: electricistaOpinionesClientesContent,
  },
  desatascos: {
    parentSlug: 'desatascos',
    parentLabel: 'Desatascos',
    ogAlt: 'Desatascos profesionales 24 horas | Reparar24',
    childServices: desatascosChildServicesData,
    servicesListing: { kind: 'directory', props: desatascosServicesDirectoryContent },
    trustSignals: desatascosTrustSignalsContent,
    processSteps: desatascosProcessStepsContent,
    pricing: desatascosPricingSectionContent,
    opiniones: desatascosOpinionesClientesContent,
  },
  'aire-acondicionado': {
    parentSlug: 'aire-acondicionado',
    parentLabel: 'Aire Acondicionado',
    ogAlt: 'Aire acondicionado profesional | Reparar24',
    childServices: aireAcondicionadoChildServicesData,
    servicesListing: { kind: 'directory', props: aireAcondicionadoServicesDirectoryContent },
    trustSignals: aireAcondicionadoTrustSignalsContent,
    processSteps: aireAcondicionadoProcessStepsContent,
    pricing: aireAcondicionadoPricingSectionContent,
    opiniones: aireAcondicionadoOpinionesClientesContent,
  },
  calefaccion: {
    parentSlug: 'calefaccion',
    parentLabel: 'Calefacción',
    ogAlt: 'Calefacción profesional | Reparar24',
    childServices: calefaccionChildServicesData,
    servicesListing: { kind: 'directory', props: calefaccionServicesDirectoryContent },
    trustSignals: calefaccionTrustSignalsContent,
    processSteps: calefaccionProcessStepsContent,
    pricing: calefaccionPricingSectionContent,
    opiniones: calefaccionOpinionesClientesContent,
  },
  'limpieza-tuberias': {
    parentSlug: 'limpieza-tuberias',
    parentLabel: 'Limpieza de Tuberías',
    ogAlt: 'Limpieza profesional de tuberías | Reparar24',
    childServices: limpiezaTuberiasChildServicesData,
    servicesListing: { kind: 'directory', props: limpiezaTuberiasServicesDirectoryContent },
    trustSignals: limpiezaTuberiasTrustSignalsContent,
    processSteps: limpiezaTuberiasProcessStepsContent,
    pricing: limpiezaTuberiasPricingSectionContent,
    opiniones: limpiezaTuberiasOpinionesClientesContent,
  },
}

export function getServiceChildPageContent(parentSlug: ChildPageServiceSlug): ServiceChildPageContent {
  return SERVICE_CHILD_PAGE_CONTENT[parentSlug]
}

export { servicePageValenciaCoverage }
