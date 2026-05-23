# Multilingual SEO Architecture - Reparar24

## 🌍 Overview

The Reparar24 project now implements a **locale-first routing architecture** using Next.js 15 App Router, enabling true multilingual SEO with district-level granularity.

## 📁 Route Structure

```
app/
  [locale]/                          # Locale segment (es, en, ru)
    layout.tsx                       # Locale-specific layout with metadata
    page.tsx                         # Homepage: /{locale}
    
    [serviceSlug]/
      page.tsx                       # Service page: /{locale}/fontanero
      
      [citySlug]/
        page.tsx                     # Service+City: /{locale}/fontanero/madrid
        
        [districtSlug]/
          page.tsx                   # Service+City+District: /{locale}/fontanero/madrid/salamanca
    
    servicios/
      [citySlug]/
        page.tsx                     # City overview: /{locale}/servicios/madrid
```

## 🎯 URL Examples

### Spanish (Default Locale - es)
```
/es                                  # Homepage
/es/fontanero                        # Service page
/es/fontanero/madrid                 # Service in city
/es/fontanero/madrid/salamanca       # Service in district
/es/servicios/madrid                 # All services in Madrid
```

### English (en)
```
/en                                  # Homepage
/en/plumber                          # Service page (future translation)
/en/plumber/madrid                   # Service in city
/en/plumber/madrid/salamanca         # Service in district
```

### Russian (ru)
```
/ru                                  # Homepage  
/ru/santekhnik                       # Service page (future translation)
/ru/santekhnik/madrid                # Service in city
```

## 🚀 Key Features

### 1. **Locale-First Routing**
- All routes prefixed with `[locale]` parameter
- Spanish (es) is the default locale
- Middleware redirects root paths to `/es/`
- Scalable to add more locales

### 2. **District-Level SEO**
- Deep granularity: Service → City → District
- Each district has unique page with postal codes
- Example: `/es/fontanero/madrid/salamanca`
- Generates hundreds of SEO-optimized pages

### 3. **Multilingual Metadata**
- Locale-specific title, description, keywords
- Automatic hreflang generation
- OpenGraph and Twitter cards per locale
- Canonical URL management

### 4. **Scalable Sitemap**
- Generates URLs for all locale combinations
- Includes: homepage, services, cities, service+city, service+city+district
- Priority-based ranking
- Supports 3 locales × (services + cities + districts)

### 5. **Internal Linking**
- Locale-aware helper functions
- `getServiceCityLinks()` - Link service to all cities
- `getCityServiceLinks()` - Link city to all services
- `getDistrictLinks()` - Link to all districts in city

## 📊 Page Generation Scale

With current data (4 services × 3 cities × ~10 districts each):

| Page Type | Count per Locale | Total (3 locales) |
|-----------|------------------|-------------------|
| Homepage | 1 | 3 |
| Service pages | 4 | 12 |
| City pages | 3 | 9 |
| Service+City | 12 | 36 |
| Service+City+District | ~120 | ~360 |
| **TOTAL** | **~140** | **~420 pages** |

## 🛠 Technical Implementation

### Locale Configuration
```typescript
// lib/i18n/config.ts
export const locales = ['es', 'en', 'ru'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'es'
```

### Middleware
```typescript
// middleware.ts
- Redirects non-locale URLs to /es/
- Preserves locale in URL throughout navigation
- Excludes static files and API routes
```

### Static Params Generation
```typescript
export async function generateStaticParams() {
  const params: { locale: Locale; serviceSlug: string; citySlug: string }[] = []
  
  locales.forEach((locale) => {
    services.forEach((service) => {
      cities.forEach((city) => {
        params.push({ locale, serviceSlug: service.slug, citySlug: city.slug })
      })
    })
  })
  
  return params
}
```

### Metadata Generation
```typescript
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const metadataByLocale: Record<Locale, Metadata> = {
    es: { title: '...', description: '...' },
    en: { title: '...', description: '...' },
    ru: { title: '...', description: '...' }
  }
  return metadataByLocale[params.locale]
}
```

## 🔗 Component Integration

All layout and section components now accept `locale` prop:

```typescript
<Header locale={params.locale} />
<Hero locale={params.locale} />
<ServicesSection locale={params.locale} />
<CitiesSection locale={params.locale} />
<Footer locale={params.locale} />
```

## 📈 SEO Benefits

1. **Hreflang Implementation** - Proper multilingual SEO signals
2. **Canonical URLs** - Prevents duplicate content issues
3. **Locale-Specific Schema.org** - LocalBusiness, Service schemas per locale
4. **District Targeting** - Capture hyper-local searches
5. **Internal Link Juice** - Strong silo structure Service → City → District
6. **Scalable Growth** - Easy to add new locales, cities, districts

## 🎨 Future Enhancements

- [ ] Add Portuguese (pt) locale
- [ ] Translate service slugs per locale (fontanero → plumber)
- [ ] Add more districts from city data
- [ ] Implement locale switcher in UI
- [ ] Add locale-specific pricing (EUR, USD, RUB)
- [ ] Content translations via CMS

## 📝 Migration Notes

### Removed Routes
- ❌ `app/[serviceSlug]/` (conflicted with locale routing)
- ❌ `app/ciudad/[citySlug]/` (replaced by `/servicios/[citySlug]`)
- ❌ Root `app/layout.tsx` and `app/page.tsx` (moved to locale folder)

### Updated Files
- ✅ All components updated to accept `locale` prop
- ✅ Internal links use locale-aware URLs
- ✅ Sitemap generates multilingual URLs
- ✅ Middleware enforces locale-first routing
- ✅ Metadata helpers support i18n

## 🔍 Verification

Test the new structure:
```bash
# Start development server
npm run dev

# Visit URLs
http://localhost:3001/es
http://localhost:3001/es/fontanero
http://localhost:3001/es/fontanero/madrid
http://localhost:3001/es/fontanero/madrid/centro
http://localhost:3001/en
http://localhost:3001/ru

# Check sitemap
http://localhost:3001/sitemap.xml
```

## ✅ Completion Status

- [x] Locale-first routing structure created
- [x] All page types migrated (home, service, city, district)
- [x] Components updated for locale support
- [x] Sitemap generates multilingual URLs
- [x] Middleware redirects to default locale
- [x] Internal linking uses locale-aware helpers
- [x] Metadata generation per locale
- [x] Old conflicting routes removed
- [x] Architecture documented

---

**Result:** Fully scalable multilingual SEO architecture supporting 420+ pages across 3 locales with district-level granularity. Ready for production deployment and future locale expansion.
