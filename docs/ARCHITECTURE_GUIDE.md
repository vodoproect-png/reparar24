# Reparar24 - Complete Architecture Guide

## 🏗️ Architecture Overview

Reparar24 is built as a **locale-first, SEO-optimized service platform** using Next.js 15 App Router with full support for multilingual content and district-level geographic targeting.

### Scale: **693 Static Pages** Across 3 Locales

## 🌍 Multilingual Routing Strategy

### Core Principle: Locale-First URLs

Every URL includes the locale as the first segment:

```
/{locale}/{service}/{city}/{district}
```

### Examples

**Spanish (es) - Primary/Default**
```
/es
/es/fontanero
/es/fontanero/madrid
/es/fontanero/madrid/salamanca
```

**English (en)**
```
/en
/en/plumber              # Localized slug
/en/plumber/madrid       # Same city, translated service
/en/plumber/madrid/salamanca
```

**Russian (ru)**
```
/ru
/ru/santekhnik           # Localized slug
/ru/santekhnik/madrid
/ru/santekhnik/madrid/salamanca
```

## 🔤 Centralized Slug System

### Location: `lib/i18n/slugs.ts`

**Service Slug Mapping:**
```typescript
const serviceSlugMap = {
  fontanero: {
    es: 'fontanero',
    en: 'plumber',
    ru: 'santekhnik',
  },
  electricista: {
    es: 'electricista',
    en: 'electrician',
    ru: 'elektrik',
  },
  // ...
}
```

**Why This Works:**
- ✅ SEO-friendly URLs in each language
- ✅ Centralized management of all slug variants
- ✅ Easy to add new locales or services
- ✅ Automatic bidirectional slug resolution

**Helper Functions:**
```typescript
// Get localized slug
getLocalizedServiceSlug('fontanero', 'en') // → 'plumber'

// Resolve service from any slug
getServiceIdFromSlug('santekhnik', 'ru') // → 'fontanero'

// Generate URLs
getLocalizedServiceUrl('fontanero', 'en') // → '/en/plumber'
```

## 🧭 Route Generation Helpers

### Location: `lib/routing/helpers.ts`

Three main helper groups:

### 1. RouteHelper - Generate Paths
```typescript
RouteHelper.home('es')                    // '/es'
RouteHelper.service('fontanero', 'en')    // '/en/plumber'
RouteHelper.serviceCity('fontanero', 'madrid', 'ru') 
  // '/ru/santekhnik/madrid'
```

### 2. CanonicalHelper - SEO Canonical URLs
```typescript
// Always points to Spanish (primary language)
CanonicalHelper.service('fontanero')
  // 'https://reparar24.es/es/fontanero'
```

### 3. HreflangHelper - Alternate Language URLs
```typescript
HreflangHelper.service('fontanero')
  // {
  //   es: 'https://reparar24.es/es/fontanero',
  //   en: 'https://reparar24.es/en/plumber',
  //   ru: 'https://reparar24.es/ru/santekhnik'
  // }
```

## 🍞 Breadcrumb System

### Location: `lib/routing/breadcrumbs.ts`

**Scalable breadcrumb generation** for all page types:

### BreadcrumbGenerator
```typescript
// Service page: Home > Fontanería
BreadcrumbGenerator.service(service, 'es')

// Service+City: Home > Fontanería > Madrid
BreadcrumbGenerator.serviceCity(service, city, 'es')

// Service+City+District: Home > Fontanería > Madrid > Salamanca
BreadcrumbGenerator.serviceCityDistrict(service, city, district, locale)
```

### BreadcrumbSchemaGenerator
Generates JSON-LD BreadcrumbList schema for SEO:
```typescript
BreadcrumbSchemaGenerator.service(service, 'es')
// Returns Schema.org BreadcrumbList ready for <script type="application/ld+json">
```

## 🎯 SEO Content Structure

### Location: `lib/seo/content-structure.ts`

**Foundation for programmatic SEO content generation:**

### Content Block Types
```typescript
type ContentBlockType =
  | 'faq'                    // FAQ sections
  | 'problem-solution'       // Problem-based landing pages
  | 'emergency-info'         // Emergency service blocks
  | 'service-comparison'     // Service comparison pages
  | 'trust-signals'          // Trust badges/reviews
  | 'local-info'             // Local coverage info
  | 'pricing-info'           // Pricing tables
  | 'process-steps'          // Process/how-to guides
```

### Content Templates
```typescript
// Generate FAQ for service in city
ContentTemplateGenerator.generateFAQTemplate(service, city, 'es')

// Generate problem-solution content
ContentTemplateGenerator.generateProblemSolutionTemplate(
  'Fuga de agua urgente',
  service,
  city
)

// Generate emergency info
ContentTemplateGenerator.generateEmergencyTemplate(service, city)
```

### Programmatic Page Generator
```typescript
// Generate complete structure for problem-based landing page
SEOPageGenerator.problemBasedPage(
  'Fuga de agua urgente',
  fontaneroService,
  madridCity,
  'es'
)
// Returns: title, meta, h1, intro, contentBlocks, CTAs, related pages
```

**Use Case:** AI-powered content generation for thousands of long-tail keyword pages

## 📊 SEO Features

### 1. Hreflang Implementation
- ✅ Automatic alternate language URLs
- ✅ `x-default` points to Spanish (primary)
- ✅ Proper hreflang codes (es-ES, en-GB, ru-RU)

### 2. Canonical URLs
- ✅ Spanish always canonical (primary SEO language)
- ✅ Prevents duplicate content issues
- ✅ Consistent across all locales

### 3. Schema.org Structured Data
- ✅ LocalBusiness per city/district
- ✅ Service schemas
- ✅ FAQPage schemas
- ✅ BreadcrumbList schemas
- ✅ Ready for Review, HowTo, Product schemas

### 4. Internal Linking
Strong silo architecture:
```
Homepage
  └─ Services
      └─ Cities
          └─ Districts
```

## 🔄 How Multilingual Routing Works

### 1. User Visits Root (`/`)
- Middleware detects no locale
- Redirects to `/es` (default locale)

### 2. User Clicks Service
- Spanish: `/es/fontanero`
- English: `/en/plumber` (localized slug)
- Russian: `/ru/santekhnik` (localized slug)

### 3. Service Slug Resolution
```typescript
// Spanish user sees: /es/fontanero
// English user sees: /en/plumber
// Both resolve to same service (fontanero)
// UI displayed in user's language
```

### 4. Hreflang Tags Generated
```html
<link rel="alternate" hreflang="es-ES" href="https://reparar24.es/es/fontanero" />
<link rel="alternate" hreflang="en-GB" href="https://reparar24.es/en/plumber" />
<link rel="alternate" hreflang="ru-RU" href="https://reparar24.es/ru/santekhnik" />
<link rel="alternate" hreflang="x-default" href="https://reparar24.es/es/fontanero" />
<link rel="canonical" href="https://reparar24.es/es/fontanero" />
```

## 📈 Future Programmatic SEO Scaling

### Phase 1: Current Foundation (COMPLETE ✅)
- 693 static pages
- 3 locales
- 6 services
- 3 cities
- ~30 districts

### Phase 2: Problem-Based Pages (Ready)
Use `SEOPageGenerator.problemBasedPage()`:
```
/es/fontanero/madrid/fuga-de-agua-urgente
/es/electricista/barcelona/cortocircuito-emergencia
```
**Potential:** 1000s of long-tail keyword pages

### Phase 3: AI Content Generation (Architecture Ready)
```typescript
// Content structure ready for AI/GPT integration
const pageStructure = SEOPageGenerator.problemBasedPage(
  problem,
  service,
  city,
  locale
)

// Feed to AI for content generation
const generatedContent = await generateWithAI(pageStructure)
```

### Phase 4: Service Comparisons (Architecture Ready)
```
/es/fontanero-vs-plomero-madrid
/es/electricista-vs-electrician-barcelona
```

## 🗂️ Directory Structure

```
lib/
  i18n/
    config.ts              # Locale configuration
    dictionaries.ts        # Translation loading
    navigation.ts          # Locale-aware nav
    slugs.ts              # ⭐ Centralized slug management
    
  routing/
    helpers.ts            # ⭐ Route generation
    breadcrumbs.ts        # ⭐ Breadcrumb generation
    
  seo/
    metadata.ts           # Basic metadata
    metadata-enhanced.ts  # Advanced i18n metadata
    schema.ts             # Schema.org generators
    hreflang.ts           # Hreflang utilities
    url.ts                # URL utilities
    content-structure.ts  # ⭐ Programmatic SEO foundation
    
  linking/
    internal.ts           # Internal linking helpers
```

## 🚀 Scaling Workflow

### Adding a New Service

1. **Add to data/services.ts**
```typescript
{
  id: 'albanil',
  name: 'Albañilería',
  slug: 'albanil',
  // ...
}
```

2. **Add slug mapping in lib/i18n/slugs.ts**
```typescript
albanil: {
  es: 'albanil',
  en: 'bricklayer',
  ru: 'kamenshchik'
}
```

3. **Run build**
```bash
npm run build
```

**Result:** Auto-generates:
- 3 service pages (1 per locale)
- 9 service+city pages (3 cities × 3 locales)
- 90 service+city+district pages (30 districts × 3 locales)
= **102 new pages automatically**

### Adding a New City

1. **Add to data/cities.ts**
```typescript
{
  id: 'sevilla',
  name: 'Sevilla',
  slug: 'sevilla',
  districts: [...],
  // ...
}
```

2. **Run build**

**Result:** Auto-generates:
- 3 city overview pages (1 per locale)
- 18 service+city pages (6 services × 3 locales)
- 180 service+city+district pages (10 districts × 6 services × 3 locales)
= **201 new pages automatically**

### Adding a New Locale

1. **Add to lib/i18n/config.ts**
```typescript
export const locales = ['es', 'en', 'ru', 'pt'] as const
```

2. **Create messages/pt.json**

3. **Add slug mappings in lib/i18n/slugs.ts**
```typescript
fontanero: {
  es: 'fontanero',
  en: 'plumber',
  ru: 'santekhnik',
  pt: 'canalizador',  // Add Portuguese
}
```

4. **Run build**

**Result:** Doubles page count (~693 → ~920 pages)

## 📝 Content Translation Strategy

### Current Approach (Hybrid)

**Localized:**
- ✅ Service slugs (fontanero → plumber → santekhnik)
- ✅ UI labels (nav, buttons, CTAs)
- ✅ Metadata (titles, descriptions)
- ✅ Trust signals

**Consistent Across Locales:**
- ✅ City slugs (madrid, barcelona, valencia)
- ✅ District slugs (centro, salamanca)
- ✅ Service data structure

**Why?**
- City/district names are proper nouns (Madrid = Madrid in all languages)
- Service slugs translated for better local SEO
- UI localized for user experience

## 🎯 SEO Best Practices Implemented

### Spanish as Primary Language
- Canonical URLs point to `/es/` versions
- `x-default` hreflang points to Spanish
- Spanish content most comprehensive

### Hreflang Tags
```html
<!-- Every page includes: -->
<link rel="alternate" hreflang="es-ES" href="..." />
<link rel="alternate" hreflang="en-GB" href="..." />
<link rel="alternate" hreflang="ru-RU" href="..." />
<link rel="alternate" hreflang="x-default" href="..." />
<link rel="canonical" href="..." />
```

### Internal Linking Silos
```
Homepage (priority: 1.0)
  ├─ Services (priority: 0.9)
  │   └─ Cities (priority: 0.8)
  │       └─ Districts (priority: 0.7)
  └─ City Overview (priority: 0.8)
      └─ Service in City (priority: 0.7)
```

### Schema.org Integration
- LocalBusiness per city/district
- Service schemas with offers
- FAQPage schemas
- BreadcrumbList for navigation
- Ready for Review, AggregateRating

## 🛣️ URL Patterns

| Page Type | Pattern | Example | Priority |
|-----------|---------|---------|----------|
| Homepage | `/{locale}` | `/es` | 1.0 |
| Service | `/{locale}/{service}` | `/en/plumber` | 0.9 |
| City Overview | `/{locale}/servicios/{city}` | `/es/servicios/madrid` | 0.8 |
| Service+City | `/{locale}/{service}/{city}` | `/ru/santekhnik/madrid` | 0.8 |
| Service+City+District | `/{locale}/{service}/{city}/{district}` | `/es/fontanero/madrid/salamanca` | 0.7 |

## 🔧 Utility Organization

### Routing Utilities (`lib/routing/`)
- `helpers.ts` - URL generation, canonical, hreflang
- `breadcrumbs.ts` - Breadcrumb generation + schema

### SEO Utilities (`lib/seo/`)
- `metadata.ts` - Basic metadata
- `metadata-enhanced.ts` - i18n metadata
- `schema.ts` - Schema.org generators
- `hreflang.ts` - Hreflang tag generation
- `url.ts` - URL utilities
- `content-structure.ts` - Programmatic SEO templates

### i18n Utilities (`lib/i18n/`)
- `config.ts` - Locale configuration
- `dictionaries.ts` - Translation loading
- `navigation.ts` - Nav configuration
- `slugs.ts` - Slug management ⭐

### Linking Utilities (`lib/linking/`)
- `internal.ts` - Internal link generation

## 📦 Data Layer

### Services (`data/services.ts`)
```typescript
{
  id: 'fontanero',     // Unique ID (base Spanish slug)
  name: 'Fontanería',  // Display name
  slug: 'fontanero',   // Base slug (used as ServiceId)
  keywords: [...],     // SEO keywords
  benefits: [...],     // USPs
  available24h: true,  // Emergency flag
}
```

### Cities (`data/cities.ts`)
```typescript
{
  id: 'madrid',
  slug: 'madrid',
  name: 'Madrid',
  province: 'Madrid',
  population: 3223334,
  districts: [
    {
      id: 'centro',
      slug: 'centro',
      name: 'Centro',
      postalCodes: ['28001', '28002', '28003'],
    },
  ],
}
```

## 🎨 Translation System

### Dictionary Structure
```
messages/
  es.json  # Spanish (primary)
  en.json  # English
  ru.json  # Russian
```

### Usage
```typescript
const dict = getDictionary('es')
dict.nav.home          // 'Inicio'
dict.cta.callNow       // 'Llamar Ahora'
dict.emergency.banner  // '🚨 Servicio de Emergencias 24/7'
```

### Categories
- `nav` - Navigation labels
- `cta` - Call-to-action buttons
- `emergency` - Emergency/urgency labels
- `trust` - Trust signals, guarantees
- `footer` - Footer content
- `common` - Common UI elements

## 🚦 Middleware Flow

```
User → Request URL → Middleware
                       ├─ Has locale? → Next()
                       └─ No locale? → Redirect to /es/{path}
```

**Example:**
```
/fontanero → Redirect → /es/fontanero
/en/plumber → Pass through (locale present)
```

## 📊 Sitemap Architecture

### Structure
```xml
<url>
  <loc>https://reparar24.es/es</loc>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://reparar24.es/es/fontanero</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://reparar24.es/en/plumber</loc>
  <priority>0.9</priority>
</url>
<!-- ... 693 URLs total ... -->
```

### Priority Strategy
- Homepage: 1.0
- Service pages: 0.9
- City pages: 0.8
- Service+City: 0.8
- Districts: 0.7

### Change Frequency
- Homepage: daily
- Services: weekly
- Cities: weekly
- Districts: monthly

## 🔮 Future Scaling Strategies

### 1. Problem-Based SEO Pages
**Architecture Ready:** `lib/seo/content-structure.ts`

Generate pages targeting specific problems:
```
/es/fontanero/madrid/fuga-de-agua-urgente
/es/electricista/barcelona/cortocircuito-electrico
```

**Scaling Potential:** 10,000+ pages

### 2. AI Content Generation
Content templates ready for:
- GPT-4 integration
- Automated unique content per district
- Dynamic FAQ generation
- Problem-solution content

### 3. Service Comparisons
```
/es/fontanero-vs-plomero
/es/electricista-certificado-vs-autonomo
```

### 4. Seasonal/Emergency Pages
```
/es/fontanero-navidad-24h
/es/electricista-emergencia-nocturna
```

### 5. Review/Rating Pages
```
/es/fontanero/madrid/opiniones
/es/electricista/barcelona/valoraciones
```

## ✅ Current Status

**Build:** ✅ PASSING (693 pages)  
**Lint:** ✅ PASSING (minor warnings only)  
**TypeScript:** ✅ ALL TYPES VALID  
**Performance:** ✅ 102 kB First Load JS  

## 📚 Key Files Reference

### Must-Know Files
1. `lib/i18n/slugs.ts` - **Slug management** ⭐
2. `lib/routing/helpers.ts` - **URL generation** ⭐
3. `lib/routing/breadcrumbs.ts` - **Breadcrumbs** ⭐
4. `lib/seo/content-structure.ts` - **Programmatic SEO** ⭐
5. `app/[locale]/[serviceSlug]/[citySlug]/[districtSlug]/page.tsx` - **District page template**

### Documentation Files
- `README.md` - Quick start guide
- `MULTILINGUAL_ARCHITECTURE.md` - Multilingual details
- `ARCHITECTURE_GUIDE.md` - This file (complete reference)

---

**Architecture Status:** Production-ready multilingual SEO foundation with programmatic scaling capabilities.
