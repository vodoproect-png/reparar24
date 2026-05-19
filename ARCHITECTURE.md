# Reparar24 - SEO-First Architecture Documentation

## 🏗️ Architecture Overview

Reparar24 is a **scalable, SEO-first, multilingual platform** for local service businesses in Spain. Built with Next.js 15, TypeScript, and TailwindCSS, the architecture is designed to scale to **thousands of programmatic SEO pages** while maintaining clean code and excellent performance.

---

## 📊 Technology Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS (mobile-first)
- **SEO**: Comprehensive metadata, JSON-LD schemas, hreflang
- **i18n**: Built-in multilingual support (ES, EN, RU)

---

## 🌍 Multilingual Foundation

### Supported Locales

```typescript
- es (Spanish) - Default locale, clean URLs without prefix
- en (English) - /en/ prefix
- ru (Russian) - /ru/ prefix
```

### URL Structure

**Spanish (default):**
```
https://reparar24.es/fontanero/madrid
```

**English:**
```
https://reparar24.es/en/fontanero/madrid
```

**Russian:**
```
https://reparar24.es/ru/fontanero/madrid
```

### i18n Implementation

**Location**: `lib/i18n/`

- **config.ts**: Locale configuration, validation, helpers
- **dictionaries.ts**: Translation dictionaries (expandable)

**Middleware**: Handles locale detection and routing without redirects for default locale (SEO-friendly).

---

## 🔗 SEO-First URL Architecture

### Primary Routes (Optimized for Local SEO)

```
✅ /fontanero/madrid              - Service + City (PRIMARY)
✅ /electricista/barcelona        - Service + City
✅ /desatascos/valencia            - Service + City
✅ /fontanero                      - Service overview
✅ /servicios/madrid               - City services overview
```

### Future Scalability Routes

```
🔜 /fontanero/madrid/salamanca    - Service + City + District
🔜 /electricista/barcelona/eixample - Service + City + District
🔜 /emergencias/madrid             - Emergency pages
🔜 /fontanero/madrid/24h          - Specialized pages
```

### Deprecated

```
❌ /ciudad/[citySlug]  - Removed for better SEO
```

---

## 📁 Project Structure

```
reparar24/
├── app/                                    # Next.js App Router
│   ├── [serviceSlug]/                     
│   │   ├── [citySlug]/page.tsx            # Service + City pages (/fontanero/madrid)
│   │   └── page.tsx                        # Service pages (/fontanero)
│   ├── servicios/
│   │   └── [citySlug]/page.tsx            # City overview pages (/servicios/madrid)
│   ├── globals.css                         # Global styles
│   ├── layout.tsx                          # Root layout with SEO
│   ├── page.tsx                            # Homepage
│   ├── robots.ts                           # Dynamic robots.txt
│   └── sitemap.ts                          # Dynamic sitemap.xml
│
├── components/
│   ├── conversion/                         # Conversion-optimized components
│   │   ├── WhatsAppCTA.tsx                # WhatsApp floating/inline CTA
│   │   ├── EmergencyBanner.tsx            # 24/7 emergency banner
│   │   ├── TrustBadges.tsx                # Trust signals
│   │   ├── CallNowButton.tsx              # Call-to-action button
│   │   ├── ResponseTimeBlock.tsx          # Response time indicator
│   │   └── GuaranteeSection.tsx           # Guarantee section
│   ├── layout/
│   │   ├── Header.tsx                      # Site navigation
│   │   └── Footer.tsx                      # Site footer
│   └── sections/                           # Page sections
│       ├── Hero.tsx
│       ├── ServicesSection.tsx
│       ├── CitiesSection.tsx
│       ├── FAQSection.tsx
│       ├── ReviewsSection.tsx
│       └── CTASection.tsx
│
├── data/                                   # Data layer
│   ├── services.ts                         # Service definitions
│   ├── cities.ts                           # Cities & districts data
│   └── faqs.ts                             # FAQ content
│
├── lib/
│   ├── i18n/                               # Internationalization
│   │   ├── config.ts                       # Locale configuration
│   │   └── dictionaries.ts                 # Translations
│   ├── seo/                                # SEO utilities
│   │   ├── url.ts                          # URL generation & normalization
│   │   ├── hreflang.ts                     # Hreflang generation
│   │   ├── opengraph.ts                    # OpenGraph & Twitter Cards
│   │   ├── robots.ts                       # Robots directives
│   │   ├── schema.ts                       # JSON-LD schemas
│   │   ├── metadata.ts                     # Basic metadata generation
│   │   └── metadata-enhanced.ts            # i18n-aware metadata
│   └── linking/
│       └── internal.ts                     # Internal linking utilities
│
├── middleware.ts                           # Locale & routing middleware
└── public/                                 # Static assets
```

---

## 🎯 SEO Infrastructure

### 1. **Metadata Generation**

**Enhanced i18n-aware metadata:**

```typescript
import { generateEnhancedServiceMetadata } from '@/lib/seo/metadata-enhanced'

export async function generateMetadata({ params }) {
  const service = findService(params.serviceSlug)
  const city = findCity(params.citySlug)
  
  return generateEnhancedServiceMetadata(service, 'es', city)
}
```

**Features:**
- Dynamic title & description
- Locale-specific content
- Canonical URLs
- Keywords optimization
- OpenGraph & Twitter Cards

### 2. **Hreflang Implementation**

**Automatic alternate language links:**

```typescript
import { getHreflangMetadata } from '@/lib/seo/hreflang'

const metadata = getHreflangMetadata('fontanero/madrid')

// Generates:
// <link rel="alternate" hreflang="es-ES" href="https://reparar24.es/fontanero/madrid" />
// <link rel="alternate" hreflang="en-GB" href="https://reparar24.es/en/fontanero/madrid" />
// <link rel="alternate" hreflang="ru-RU" href="https://reparar24.es/ru/fontanero/madrid" />
// <link rel="alternate" hreflang="x-default" href="https://reparar24.es/fontanero/madrid" />
```

### 3. **JSON-LD Structured Data**

**Available schemas:**

```typescript
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema
} from '@/lib/seo/schema'
```

**Implementation:**
- LocalBusiness schema on all service pages
- Service schema with areaServed
- FAQ schema for SEO-rich snippets
- Breadcrumb schema for navigation
- Organization schema on homepage

### 4. **Dynamic Sitemap**

**Auto-generated with:**
- Homepage
- Service pages (6 services)
- City pages (6+ cities)
- Service + City combinations (36+ pages)
- Future: District pages (100s+)

**Update frequency:**
- Homepage: daily
- Service pages: weekly
- City pages: weekly
- Service + City: weekly

### 5. **Canonical URLs**

**Managed through:**

```typescript
import { getCanonicalUrl } from '@/lib/seo/url'

const canonical = getCanonicalUrl('fontanero/madrid', 'es')
// Returns: https://reparar24.es/fontanero/madrid
```

---

## 🔗 Internal Linking Strategy

### Scalable Link Generation

**Service → Cities:**

```typescript
import { getServiceCityLinks } from '@/lib/linking/internal'

const links = getServiceCityLinks(service, cities, locale)
// Generates links from service page to all city variations
```

**City → Services:**

```typescript
import { getCityServiceLinks } from '@/lib/linking/internal'

const links = getCityServiceLinks(city, services, locale)
// Generates links from city page to all service variations
```

**District Links (Future):**

```typescript
import { getDistrictLinks } from '@/lib/linking/internal'

const links = getDistrictLinks(city, service, locale)
// Generates district-level links for ultra-local SEO
```

**Emergency Services:**

```typescript
import { getEmergencyServiceLinks } from '@/lib/linking/internal'

const emergencyLinks = getEmergencyServiceLinks(services, locale)
// Links to 24h services for emergency pages
```

---

## 💰 Conversion Optimization

### Conversion Components

**1. WhatsApp CTA**

```tsx
<WhatsAppCTA 
  variant="floating"          // floating | inline | banner
  phone="34641688524"
  message="Custom message"
/>
```

**2. Emergency Banner**

```tsx
<EmergencyBanner 
  phone="+34 900 000 000"
  text="Servicio de Emergencias 24/7"
  showPulse={true}
/>
```

**3. Call Now Button**

```tsx
<CallNowButton 
  variant="primary"            // primary | secondary | emergency
  size="lg"                    // sm | md | lg
  phone="+34641688524"
/>
```

**4. Trust Badges**

```tsx
<TrustBadges 
  variant="grid"              // horizontal | grid
/>
```

**5. Response Time Block**

```tsx
<ResponseTimeBlock 
  variant="detailed"          // compact | detailed
  time="30-60 min"
/>
```

**6. Guarantee Section**

```tsx
<GuaranteeSection />
```

---

## 📈 Scaling Strategy

### Current Capacity

```
✅ 6 Services
✅ 6 Cities
✅ 30+ Districts
✅ 49 Pages generated
```

### Scaling to 1,000+ Pages

**Phase 1: Expand Cities**
```
Add 50 cities → 306 pages (6 services × 50 cities + overviews)
```

**Phase 2: Add Districts**
```
Add districts to top cities → 500+ pages
Example: Madrid (21 districts) × 6 services = 126 pages for one city
```

**Phase 3: Content Variations**
```
Add specialized pages:
- /fontanero/madrid/urgente
- /fontanero/madrid/24h
- /fontanero/madrid/economico
```

**Phase 4: Multilingual Expansion**
```
×3 locales = triple pages automatically
306 pages × 3 = 918 pages
```

### Programmatic SEO Ready

**Data-driven generation:**

```typescript
// Add to data/cities.ts
export const cities: City[] = [
  { id: 'madrid', name: 'Madrid', ... },
  { id: 'barcelona', name: 'Barcelona', ... },
  // ... add 50 more cities
]

// Pages auto-generated through dynamic routes
// No code changes needed!
```

**Database integration ready:**

```typescript
// Future: Replace static data with API calls
export async function getCities() {
  return await fetch('/api/cities').then(r => r.json())
}
```

---

## 🎨 Design Philosophy

### Brand Positioning

- **Trustworthy**: Professional, reliable, established
- **Premium**: Quality service, not cheap/discount
- **Practical**: Clear, functional, conversion-focused
- **Local**: Community-oriented, personal touch

### UI Principles

1. **Mobile-First**: Responsive from 320px to 4K
2. **Fast**: Optimized Core Web Vitals
3. **Accessible**: Semantic HTML, ARIA labels
4. **Clean**: No clutter, clear hierarchy
5. **Action-Oriented**: CTAs prominently placed

---

## 🚀 Performance Optimization

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
  - Server Components for fast initial load
  - Optimized images (AVIF/WebP)
  - No heavy frameworks

- **FID** (First Input Delay): < 100ms
  - Minimal client-side JavaScript
  - Code splitting per route

- **CLS** (Cumulative Layout Shift): < 0.1
  - Fixed dimensions for images
  - No layout shifts on load

### Optimization Techniques

```typescript
// next.config.js
{
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  compress: true,
  poweredByHeader: false,
}
```

---

## 🔮 Future Roadmap

### Phase 1: Content Expansion ✅ (Current)
- [x] 6 services
- [x] 6 cities
- [x] Multilingual foundation
- [x] SEO infrastructure

### Phase 2: Scale to 500+ Pages
- [ ] Add 20 more cities
- [ ] Add district pages
- [ ] Emergency-specific pages
- [ ] Blog integration

### Phase 3: Advanced SEO
- [ ] Review schema & ratings
- [ ] Video schema
- [ ] Local pack optimization
- [ ] AI-generated unique content

### Phase 4: CMS Integration
- [ ] Headless CMS (Sanity/Contentful)
- [ ] Admin panel for content
- [ ] Bulk import/export
- [ ] Content scheduling

### Phase 5: Advanced Features
- [ ] Online booking system
- [ ] Live chat integration
- [ ] Customer portal
- [ ] Mobile app

---

## 📝 Code Quality Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
export function getServiceUrl(
  serviceSlug: string, 
  locale: Locale = defaultLocale
): string {
  return getCanonicalUrl(serviceSlug, locale)
}

// ❌ Bad: Implicit any
export function getServiceUrl(serviceSlug, locale) {
  return getCanonicalUrl(serviceSlug, locale)
}
```

### Component Organization

```typescript
// ✅ Good: Props interface, default values
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export default function Component({ 
  variant = 'primary',
  size = 'md' 
}: Props) {
  // ...
}
```

### SEO Best Practices

```typescript
// ✅ Good: Semantic HTML
<article>
  <h1>Title</h1>
  <p>Content</p>
</article>

// ❌ Bad: Div soup
<div>
  <div class="title">Title</div>
  <div>Content</div>
</div>
```

---

## 🛠️ Development Workflow

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

### Adding New Service

```typescript
// data/services.ts
export const services: Service[] = [
  // ... existing services
  {
    id: 'new-service',
    name: 'Nuevo Servicio',
    slug: 'nuevo-servicio',
    icon: '🔧',
    description: 'Descripción corta',
    longDescription: 'Descripción larga detallada',
    benefits: ['Benefit 1', 'Benefit 2'],
    priceRange: 'Desde 49€',
    available24h: true,
    keywords: ['keyword1', 'keyword2']
  }
]

// Pages auto-generated! 🎉
```

### Adding New City

```typescript
// data/cities.ts
export const cities: City[] = [
  // ... existing cities
  {
    id: 'newcity',
    name: 'Nueva Ciudad',
    slug: 'nueva-ciudad',
    province: 'Provincia',
    population: 500000,
    coordinates: { lat: 40.41, lng: -3.70 },
    postalCodes: ['28001'],
    districts: [
      { id: 'district1', name: 'Distrito 1', slug: 'distrito-1', postalCodes: ['28001'] }
    ]
  }
]

// 6 new pages auto-generated! 🎉
```

---

## 📞 Support & Contacts

- **Project**: Reparar24
- **Type**: Local Services Platform
- **Market**: Spain (ES, EN, RU)
- **Tech**: Next.js 15 + TypeScript + TailwindCSS

---

**Last Updated**: 2024  
**Version**: 2.0 (Refactored Architecture)  
**Status**: Production Ready ✅
