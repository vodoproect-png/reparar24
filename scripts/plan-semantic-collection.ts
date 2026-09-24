const fs = require('fs');
const path = require('path');
const { cities } = require('../data/cities');
const { getAllowedPageSlugs } = require('../data/seo/page-registry');
const { childServicesData } = require('../data/electricista/child-services-seo');
const { ELECTRICISTA_CLUSTERS } = require('../data/seo/electricista-clusters');
const { getCitySEOContent } = require('../data/city-seo-content');
const { getDistrictSEOContent, getServiceDistrictSEO } = require('../data/district-seo-content');

type PageKind = 'hub' | 'child' | 'city' | 'district' | 'orphan-district-content';

type CollectionPriority = 'done-pilot' | 'high' | 'medium' | 'blocked-reconcile';

type SeedPlanItem = {
  path: string;
  kind: PageKind;
  priority: CollectionPriority;
  pageSlug: string;
  citySlug?: string;
  districtSlug?: string;
  primarySeed: string;
  secondarySeeds: string[];
  ahrefsLimit: number;
  semanticContentExists: boolean;
  productionContentExists: boolean;
  routeExists: boolean;
  notes: string[];
};

const SERVICE_ID = 'electricista';
const OUT_DIR = path.join(process.cwd(), '.tmp', 'semantic-collection');
const PILOT_DONE = new Set(['enchufes-interruptores', 'iluminacion-led']);

function slugToReadable(slug: string): string {
  return slug.replace(/-/g, ' ');
}

function quoteCsv(value: unknown): string {
  const str = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

function childSeedPlan(): SeedPlanItem[] {
  return getAllowedPageSlugs(SERVICE_ID).map((slug: string) => {
    const content = childServicesData[slug];
    const cluster = ELECTRICISTA_CLUSTERS.find((entry: any) => entry.slug === slug);
    const primaryKeyword = cluster?.primaryKeyword ?? content?.lockedPrimaryKw ?? slugToReadable(slug);
    const pilotDone = PILOT_DONE.has(slug);

    return {
      path: `/${SERVICE_ID}/${slug}`,
      kind: 'child',
      priority: pilotDone ? 'done-pilot' : 'high',
      pageSlug: slug,
      primarySeed: primaryKeyword.includes('valencia') ? primaryKeyword : `${primaryKeyword} valencia`,
      secondarySeeds: [
        ...new Set([
          ...(cluster?.secondaryKeywords ?? []),
          ...(content?.secondaryKw ?? []),
        ])
      ].slice(0, 8).map((keyword: string) =>
        keyword.includes('valencia') ? keyword : `${keyword} valencia`
      ),
      ahrefsLimit: pilotDone ? 0 : 50,
      semanticContentExists: Boolean(cluster),
      productionContentExists: Boolean(content),
      routeExists: true,
      notes: pilotDone
        ? ['Pilot already collected/classified/promoted. Re-run only if expanding depth.']
        : ['Collect before updating child page copy or requesting v0 design changes.'],
    };
  });
}

function citySeedPlan(): SeedPlanItem[] {
  return cities.map((city: any) => {
    const content = getCitySEOContent(SERVICE_ID, city.slug);

    return {
      path: `/${SERVICE_ID}/${city.slug}`,
      kind: 'city',
      priority: 'high',
      pageSlug: city.slug,
      citySlug: city.slug,
      primarySeed: `electricista ${city.name}`,
      secondarySeeds: [
        `electricista urgente ${city.name}`,
        `electricista 24 horas ${city.name}`,
        `reparacion electrica ${city.name}`,
        `instalacion electrica ${city.name}`,
        `cuadro electrico ${city.name}`,
      ],
      ahrefsLimit: 50,
      semanticContentExists: Boolean(content?.keywords),
      productionContentExists: Boolean(content),
      routeExists: true,
      notes: [
        'City GEO has content source, but current route does not render electricista city SEO text/FAQ yet.',
      ],
    };
  });
}

function districtSeedPlan(): SeedPlanItem[] {
  return cities.flatMap((city: any) =>
    city.districts.map((district: any) => {
      const content = getDistrictSEOContent(SERVICE_ID, city.slug, district.slug);

      return {
        path: `/${SERVICE_ID}/${city.slug}/${district.slug}`,
        kind: 'district' as const,
        priority: content ? 'medium' : 'blocked-reconcile',
        pageSlug: `${city.slug}/${district.slug}`,
        citySlug: city.slug,
        districtSlug: district.slug,
        primarySeed: `electricista ${district.name} ${city.name}`,
        secondarySeeds: [
          `electricista urgente ${district.name} ${city.name}`,
          `electricista 24 horas ${district.name} ${city.name}`,
          `averia electrica ${district.name} ${city.name}`,
          `instalacion electrica ${district.name} ${city.name}`,
        ],
        ahrefsLimit: content ? 20 : 30,
        semanticContentExists: Boolean(content?.semanticOwnership?.length),
        productionContentExists: Boolean(content),
        routeExists: true,
        notes: content
          ? ['District content exists. Collect lighter validation sample before rendering changes.']
          : ['Missing district SEO content. Collect seed before creating/reconciling content.'],
      };
    })
  );
}

function orphanSeedPlan(): SeedPlanItem[] {
  const routeKeys = new Set(
    cities.flatMap((city: any) =>
      city.districts.map((district: any) => `${city.slug}/${district.slug}`)
    )
  );

  return getServiceDistrictSEO(SERVICE_ID)
    .filter((entry: any) => !routeKeys.has(`${entry.citySlug}/${entry.districtSlug}`))
    .map((entry: any) => ({
      path: `/${SERVICE_ID}/${entry.citySlug}/${entry.districtSlug}`,
      kind: 'orphan-district-content' as const,
      priority: 'blocked-reconcile' as const,
      pageSlug: `${entry.citySlug}/${entry.districtSlug}`,
      citySlug: entry.citySlug,
      districtSlug: entry.districtSlug,
      primarySeed: `electricista ${slugToReadable(entry.districtSlug)} ${entry.citySlug}`,
      secondarySeeds: [],
      ahrefsLimit: 0,
      semanticContentExists: true,
      productionContentExists: true,
      routeExists: false,
      notes: ['SEO content exists but route is not generated from data/cities.ts. Reconcile before collecting more.'],
    }));
}

function buildPlan() {
  const items: SeedPlanItem[] = [
    {
      path: `/${SERVICE_ID}`,
      kind: 'hub',
      priority: 'high',
      pageSlug: SERVICE_ID,
      primarySeed: 'electricista',
      secondarySeeds: [
        'electricista urgente',
        'electricista 24 horas',
        'electricista profesional',
        'servicio electrico',
        'reparacion electrica',
      ],
      ahrefsLimit: 100,
      semanticContentExists: true,
      productionContentExists: true,
      routeExists: true,
      notes: ['Collect category-level semantic baseline before final hub rewrite.'],
    },
    ...childSeedPlan(),
    ...citySeedPlan(),
    ...districtSeedPlan(),
    ...orphanSeedPlan(),
  ];

  return {
    source: 'semantic-collection-plan',
    generatedAt: new Date().toISOString(),
    service: SERVICE_ID,
    summary: {
      totalItems: items.length,
      routablePages: items.filter((item) => item.routeExists).length,
      hub: items.filter((item) => item.kind === 'hub').length,
      child: items.filter((item) => item.kind === 'child').length,
      city: items.filter((item) => item.kind === 'city').length,
      district: items.filter((item) => item.kind === 'district').length,
      orphanDistrictContent: items.filter((item) => item.kind === 'orphan-district-content').length,
      needsAhrefsCollection: items.filter((item) => item.ahrefsLimit > 0).length,
      alreadyDonePilot: items.filter((item) => item.priority === 'done-pilot').length,
      blockedReconcile: items.filter((item) => item.priority === 'blocked-reconcile').length,
    },
    contentPolicy: {
      existingContentStatus: 'draft-baseline',
      rule: 'Existing SEO content is not final. After full semantic collection and classification, page content must be rewritten or confirmed against approved keyword ownership.',
      appliesTo: [
        'data/electricista/hub-page-content.ts',
        'data/electricista/child-services-seo.ts',
        'data/city-seo-content.ts',
        'data/district-seo-content.ts',
      ],
      doNotDo: [
        'Do not treat existing GEO text as approved final content.',
        'Do not create or patch page copy from incomplete seed coverage.',
        'Do not add new DS blocks before semantic intent coverage is known.',
      ],
    },
    collectionOrder: [
      '1. Hub seed: establish category-wide electricista intent.',
      '2. Remaining child pages: finish service-intent layer before GEO rewrites.',
      '3. City GEO pages: validate electricista + city demand.',
      '4. Missing district GEO pages: collect before creating missing content.',
      '5. Existing district GEO pages: lighter validation sample.',
      '6. Orphans: reconcile route/content first; do not collect more until resolved.',
    ],
    items,
  };
}

function writeCsv(plan: any, csvPath: string) {
  const headers = [
    'path',
    'kind',
    'priority',
    'primarySeed',
    'secondarySeeds',
    'ahrefsLimit',
    'semanticContentExists',
    'productionContentExists',
    'routeExists',
    'notes',
  ];

  const lines = [
    headers.join(','),
    ...plan.items.map((item: SeedPlanItem) =>
      headers.map((header) => quoteCsv((item as any)[header])).join(',')
    ),
  ];

  fs.writeFileSync(csvPath, `${lines.join('\n')}\n`);
}

function main() {
  const plan = buildPlan();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const jsonPath = path.join(OUT_DIR, `${SERVICE_ID}-semantic-collection-plan.json`);
  const csvPath = path.join(OUT_DIR, `${SERVICE_ID}-semantic-collection-plan.csv`);

  fs.writeFileSync(jsonPath, `${JSON.stringify(plan, null, 2)}\n`);
  writeCsv(plan, csvPath);

  console.log(`Semantic collection plan completed for ${SERVICE_ID}`);
  console.log(`Routable pages: ${plan.summary.routablePages}`);
  console.log(`Needs Ahrefs collection: ${plan.summary.needsAhrefsCollection}`);
  console.log(`Already done pilot: ${plan.summary.alreadyDonePilot}`);
  console.log(`Blocked reconcile: ${plan.summary.blockedReconcile}`);
  console.log(`JSON: ${path.relative(process.cwd(), jsonPath)}`);
  console.log(`CSV: ${path.relative(process.cwd(), csvPath)}`);
}

main();
