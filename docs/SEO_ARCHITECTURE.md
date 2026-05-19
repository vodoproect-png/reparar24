# Reparar24 - SEO Architecture & Semantic System

## 🎯 Overview

Scalable SEO architecture built for future programmatic growth WITHOUT generating low-quality AI spam.

**Current Status:** Foundation ready, 693 pages generated, templates prepared for semantic expansion.

---

## 📊 Semantic Data Architecture

### Problem-Intent Clustering (`data/problems.ts`)

**Purpose:** Semantic organization of user search intent

**Structure:**
```typescript
interface Problem {
  id: string              // Unique identifier
  title: string           // User-facing title
  query: string           // Search query variation
  urgency: 'emergency' | 'urgent' | 'normal'
  serviceId: string       // Related service
  keywords: string[]      // SEO keywords
  faqQuestion?: string    // FAQ schema ready
  faqAnswer?: string      // FAQ schema ready
}
```

**Categories:**
- Plumbing Problems (4 problems)
- Electrical Problems (4 problems)
- AC Problems (2 problems)
- Drainage Problems (2 problems)

**Total:** 12 curated problem-intent clusters

**Future Scaling:**
- Add more problems per category
- Create problem-based landing pages
- Generate AI-assisted FAQs
- Build internal linking clusters

---

## 🧩 Reusable SEO Components

### 1. ProblemsSection (`components/seo/ProblemsSection.tsx`)

**Purpose:** Display common problems with semantic clustering

**Features:**
- ✅ Urgency-based visual hierarchy
- ✅ FAQ preview integration
- ✅ Keyword display
- ✅ Conversion CTAs
- ✅ Mobile-optimized grid

**Usage:**
```typescript
<ProblemsSection
  problems={plumbingProblems}
  serviceSlug="fontanero"
  locale="es"
  title="Problemas Comunes de Fontanería"
/>
```

**Scalability:**
- Service pages
- City pages
- District pages
- Future problem-intent pages

### 2. ProcessSection (`components/seo/ProcessSection.tsx`)

**Purpose:** Explain service process (HowTo schema ready)

**Features:**
- ✅ 4-step default process
- ✅ Customizable per service
- ✅ Desktop timeline / Mobile stack
- ✅ Trust-building content
- ✅ Schema.org HowTo compatible

**Usage:**
```typescript
<ProcessSection
  locale="es"
  serviceName="Fontanería"
  customSteps={customProcess}
/>
```

---

## 🏗️ Page Template Architecture

### Service Page Structure

```
┌─────────────────────────────────────┐
│ Hero Section                         │ ← Emergency badge, dual CTAs
├─────────────────────────────────────┤
│ ProblemsSection                      │ ← Semantic problem clustering
├─────────────────────────────────────┤
│ ProcessSection                       │ ← HowTo schema
├─────────────────────────────────────┤
│ Benefits / Trust Section             │ ← Conversion focus
├─────────────────────────────────────┤
│ FAQ Section                          │ ← FAQPage schema
├─────────────────────────────────────┤
│ City Coverage Links                  │ ← Internal linking
├─────────────────────────────────────┤
│ CTA Section                          │ ← Final conversion push
└─────────────────────────────────────┘
```

**Schemas Generated:**
- LocalBusiness
- Service
- FAQPage
- BreadcrumbList
- HowTo (ready)

### City Page Structure

```
┌───────────────────────────────────── ┐
│ Hero (Localized)                     │
├─────────────────────────────────────┤
│ Services Grid                        │ ← All services in city
├─────────────────────────────────────┤
│ District Links                       │ ← Hyper-local SEO
├─────────────────────────────────────┤
│ Local Trust Section                  │
├─────────────────────────────────────┤
│ Emergency Info (Localized)           │
└─────────────────────────────────────┘
```

### District Page Structure

```
┌─────────────────────────────────────┐
│ Hero (Hyper-local)                   │
├─────────────────────────────────────┤
│ Local Coverage Info                  │ ← Postal codes, area
├─────────────────────────────────────┤
│ ProblemsSection (Localized)          │
├─────────────────────────────────────┤
│ Emergency CTAs                       │
├─────────────────────────────────────┤
│ Nearby Districts                     │ ← Internal linking
└─────────────────────────────────────┘
```

---

## 🔗 Internal Linking Strategy

### Current Implementation

**Existing Utilities:**
- `lib/linking/internal.ts` - Basic linking helpers
- `lib/routing/breadcrumbs.ts` - Breadcrumb generation
- `lib/routing/helpers.ts` - URL generation

### Semantic Linking Clusters

**Service → Problems:**
```
Fontanero Page
  ↓
[Fuga de Agua] [Grifo Gotea] [Sin Agua Caliente]
  ↓
Problem-intent landing pages (future)
```

**Service → Cities → Districts:**
```
Fontanero
  ↓
Madrid → Barcelona → Valencia
  ↓
Centro → Salamanca → Chamberí...
```

**Problem → Related Services:**
```
"Fuga de Agua" (fontanero)
  ↗ Related: Desatascos
  ↗ Related: Aire Acondicionado (if water-related)
```

**Benefits:**
- Strong topical authority
- Improved crawlability
- Better user experience
- Semantic relevance signals

---

## 📈 Future Programmatic SEO Strategy

### Phase 1: Current (COMPLETE ✅)
- 693 static pages
- Semantic data structures
- Reusable components
- SEO templates

### Phase 2: Problem-Intent Pages (Ready to Scale)

**Example URLs:**
```
/es/fontanero/madrid/fuga-de-agua-urgente
/es/electricista/barcelona/cortocircuito-emergencia
/es/desatascos/valencia/inodoro-atascado
```

**Content Structure Template:**
```typescript
{
  hero: "Fuga de Agua Urgente en Madrid",
  problem: ProblemData,
  process: GenericProcess,
  faq: ProblemSpecificFAQs,
  relatedProblems: [...],
  cta: EmergencyCTA
}
```

**Scaling Potential:** 12 problems × 3 cities × 30 districts × 3 locales = **3,240 pages**

**Safety Mechanisms:**
- Template-based (not thin content)
- Real problem clustering
- Conversion-focused
- FAQ schema included
- Internal linking structured

### Phase 3: AI-Assisted Content (Architecture Ready)

**Content Templates in `lib/seo/content-structure.ts`:**
- FAQBlock
- ProblemSolutionBlock
- EmergencyBlock
- ServiceComparisonBlock

**AI Integration Points:**
```typescript
// Generate unique FAQ for district
const faqContent = await generateFAQ({
  problem: 'fuga de agua',
  service: 'fontanero',
  city: 'Madrid',
  district: 'Salamanca'
})

// Use template structure
<FAQSection content={faqContent} />
```

**Quality Controls:**
- Template structure enforced
- Conversion CTAs mandatory
- Schema markup verified
- Internal linking automatic
- Duplicate detection

### Phase 4: Seasonal/Emergency Pages

**Examples:**
```
/es/fontanero-navidad-24h
/es/electricista-fin-de-semana
/es/desatascos-emergencia-nocturna
```

---

## 🛡️ Programmatic SEO Safety

### Duplicate Prevention

**Mechanisms:**
1. **Unique URL patterns** - No route collisions
2. **Template variation** - Different section combinations
3. **Localized content** - City/district specificity
4. **Problem clustering** - Semantic differentiation

### Thin Content Prevention

**Requirements for Every Page:**
- ✅ Hero section (localized)
- ✅ Problems section (semantic)
- ✅ Process section (trust-building)
- ✅ FAQ section (schema)
- ✅ CTA sections (conversion)
- ✅ Internal links (crawlability)
- ✅ Min 1000 words
- ✅ Schema markup

### Quality Assurance

**Automated Checks:**
```typescript
function validateSEOPage(page: Page): boolean {
  return (
    page.wordCount >= 1000 &&
    page.hasSchema &&
    page.hasFAQ &&
    page.hasInternalLinks &&
    page.hasUniqueMeta &&
    page.hasCTAs
  )
}
```

---

## 🌍 Multilingual SEO Strategy

### Locale-Aware Templates

**All SEO components support localization:**
```typescript
<ProblemsSection locale={locale} />
<ProcessSection locale={locale} />
<FAQSection locale={locale} />
```

### Translation Strategy

**Current:**
- UI elements → `messages/{locale}.json`
- Service slugs → `lib/i18n/slugs.ts`
- Metadata → `lib/seo/metadata-enhanced.ts`

**Future:**
- Problem descriptions → Per-locale
- FAQ content → Per-locale
- City descriptions → Per-locale

### Hreflang Implementation

**Automatic for all pages:**
```html
<link rel="alternate" hreflang="es-ES" href="..." />
<link rel="alternate" hreflang="en-GB" href="..." />
<link rel="alternate" hreflang="ru-RU" href="..." />
<link rel="canonical" href="..." />
```

---

## 📊 SEO Metrics & Tracking (Future)

### Recommended Tracking

**Page-Level:**
- Organic impressions
- Click-through rate
- Average position
- Conversion rate
- Time on page

**Cluster-Level:**
- Problem-intent performance
- Service-city ranking
- District-level traffic
- Emergency vs normal queries

**Tools Integration:**
- Google Search Console
- Google Analytics 4
- Conversion tracking
- Heatmaps

---

## 🚀 Scaling Workflow

### Adding New Problems

**Step 1:** Add to `data/problems.ts`
```typescript
{
  id: 'new-problem',
  title: 'New Problem Title',
  serviceId: 'fontanero',
  urgency: 'urgent',
  // ...
}
```

**Step 2:** Use in pages
```typescript
<ProblemsSection
  problems={getProblemsByService('fontanero')}
  serviceSlug="fontanero"
  locale="es"
/>
```

**Result:** Automatically appears on all relevant pages

### Generating Problem-Intent Pages (Future)

**Step 1:** Create route
```typescript
// app/[locale]/[serviceSlug]/[citySlug]/[problemSlug]/page.tsx
```

**Step 2:** Use templates
```typescript
export default function ProblemPage({ params }) {
  const problem = getProblemById(params.problemSlug)
  
  return (
    <>
      <Hero problem={problem} city={city} />
      <ProblemsSection related={problem.related} />
      <ProcessSection />
      <FAQSection problems={[problem]} />
    </>
  )
}
```

**Step 3:** Build
```bash
npm run build
```

**Result:** 3000+ pages generated automatically

---

## ✅ Current Capabilities

**Data Layer:**
- ✅ Semantic problem clustering (12 problems)
- ✅ Service metadata (6 services)
- ✅ City/district data (3 cities, ~30 districts)

**Components:**
- ✅ ProblemsSection (reusable)
- ✅ ProcessSection (reusable)
- ✅ Hero (conversion-optimized)
- ✅ FAQ Section (schema-ready)
- ✅ Mobile sticky CTA
- ✅ Emergency banner

**SEO Infrastructure:**
- ✅ Hreflang tags
- ✅ Canonical URLs
- ✅ Schema generation
- ✅ Breadcrumbs
- ✅ Sitemap (693 URLs)
- ✅ Metadata generation

**Quality Controls:**
- ✅ Template-based content
- ✅ Conversion-focused
- ✅ Schema markup
- ✅ Internal linking
- ✅ Mobile-optimized

---

## 🎯 Summary

**Architecture Status:** Production-ready semantic SEO foundation that scales from 693 to 3000+ pages WITHOUT generating thin content or AI spam.

**Key Principles:**
1. **Template-based** - Structure enforced
2. **Semantic clustering** - Real problem organization
3. **Conversion-focused** - CTAs on every page
4. **Schema-ready** - Structured data built-in
5. **Quality-first** - No thin content allowed

**Next Steps (When Ready):**
1. Add more problem clusters
2. Generate problem-intent pages
3. Implement AI-assisted FAQ generation
4. Add seasonal/emergency pages
5. Scale to 5000+ pages safely
