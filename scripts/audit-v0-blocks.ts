import fs from 'fs';
import path from 'path';

type ReviewChange = {
  action?: string;
  component?: string;
  why?: string;
  changeType?: string;
};

type ReviewChecklist = {
  phase: string;
  items: string[];
};

type V0Review = {
  service: string;
  slug: string;
  chat?: {
    webUrl?: string;
  };
  recommendedChanges?: ReviewChange[];
  whatNotToChange?: Array<{
    block: string;
    reason?: string;
  }>;
  checklist?: ReviewChecklist[];
  riskFlags?: string[];
  highestRoi?: string;
  counts?: {
    recommendedChanges?: number;
    checklistItems?: number;
    riskFlags?: number;
  };
};

type BlockFinding = {
  block: string;
  pages: string[];
  actions: string[];
  notes: string[];
};

const TMP_DIR = path.join(process.cwd(), '.tmp', 'v0-designs');

function parseArgs() {
  const args = process.argv.slice(2);
  const serviceFlagIndex = args.indexOf('--service');

  return {
    service: serviceFlagIndex >= 0 ? args[serviceFlagIndex + 1] : 'electricista',
  };
}

function readReviews(service: string): V0Review[] {
  if (!fs.existsSync(TMP_DIR)) {
    throw new Error(`v0 designs directory not found: ${TMP_DIR}`);
  }

  return fs
    .readdirSync(TMP_DIR)
    .filter((file) => file.endsWith('-v0-review.json'))
    .map((file) => path.join(TMP_DIR, file))
    .map((filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8')) as V0Review)
    .filter((review) => review.service === service);
}

function cleanBlockName(component = '') {
  return component
    .replace(/^\d+[a-z]?\s+[-.\u2013\u2014]*\s*/i, '')
    .replace(/^NEW BLOCK:\s*/i, '')
    .replace(/^Keep, no changes needed$/i, 'No structural change')
    .trim();
}

function addFinding(
  findings: Map<string, BlockFinding>,
  block: string,
  page: string,
  action: string,
  note?: string
) {
  const key = block || 'Unknown block';
  const existing =
    findings.get(key) ??
    ({
      block: key,
      pages: [],
      actions: [],
      notes: [],
    } satisfies BlockFinding);

  if (!existing.pages.includes(page)) {
    existing.pages.push(page);
  }

  if (action && !existing.actions.includes(action)) {
    existing.actions.push(action);
  }

  if (note && !existing.notes.includes(note)) {
    existing.notes.push(note);
  }

  findings.set(key, existing);
}

function buildAudit(reviews: V0Review[], service: string) {
  const findings = new Map<string, BlockFinding>();
  const protectedBlocks = new Map<string, BlockFinding>();

  for (const review of reviews) {
    const page = `${review.service}/${review.slug}`;

    for (const change of review.recommendedChanges ?? []) {
      const block = cleanBlockName(change.component);
      addFinding(
        findings,
        block,
        page,
        change.action ?? 'REVIEW',
        change.why ?? change.changeType
      );
    }

    for (const keep of review.whatNotToChange ?? []) {
      addFinding(
        protectedBlocks,
        keep.block,
        page,
        'KEEP',
        keep.reason
      );
    }
  }

  const blockFindings = Array.from(findings.values()).sort((a, b) => {
    const pageDiff = b.pages.length - a.pages.length;
    return pageDiff || a.block.localeCompare(b.block);
  });

  const sharedNeeds = blockFindings.filter((finding) => finding.pages.length > 1);
  const categorySpecificNeeds = blockFindings.filter((finding) => finding.pages.length === 1);

  return {
    source: 'v0-block-audit',
    generatedAt: new Date().toISOString(),
    service,
    pagesAudited: reviews.map((review) => ({
      slug: review.slug,
      chatUrl: review.chat?.webUrl ?? null,
      recommendedChanges: review.counts?.recommendedChanges ?? review.recommendedChanges?.length ?? 0,
      checklistItems: review.counts?.checklistItems ?? 0,
      riskFlags: review.counts?.riskFlags ?? review.riskFlags?.length ?? 0,
      highestRoi: review.highestRoi ?? null,
    })),
    sharedNeeds,
    categorySpecificNeeds,
    protectedBlocks: Array.from(protectedBlocks.values()).sort((a, b) =>
      a.block.localeCompare(b.block)
    ),
    recommendedNextStep: {
      phase: 'Phase 1 content-only',
      reason:
        'Two audited pages agree that the safest next move is content and schema work before adding new page components.',
      doFirst: [
        'Audit existing FAQ rendering and JSON-LD behavior.',
        'Add/adjust page-specific FAQ items from approved semantic clusters.',
        'Improve trust/benefit copy where page data already supports it.',
        'Run preview:seo-impact, semantic validators, ai-seo validator, and build.',
      ],
      deferUntilAfterContentPass: [
        'SymptomsCheckerV1',
        'ServiceVariantsCardV1',
        'ServicesGridV1 grouping',
        'PricingSectionV1 structural extension',
      ],
    },
  };
}

function main() {
  const { service } = parseArgs();
  const reviews = readReviews(service);

  if (reviews.length === 0) {
    throw new Error(`No v0 review files found for service: ${service}`);
  }

  const audit = buildAudit(reviews, service);
  const outputPath = path.join(TMP_DIR, `block-audit-${service}.json`);

  fs.writeFileSync(outputPath, `${JSON.stringify(audit, null, 2)}\n`);

  console.log(`Block audit completed for ${service}`);
  console.log(`Pages audited: ${reviews.length}`);
  console.log(`Shared needs: ${audit.sharedNeeds.length}`);
  console.log(`Category-specific needs: ${audit.categorySpecificNeeds.length}`);
  console.log(`Output: ${path.relative(process.cwd(), outputPath)}`);
}

main();
