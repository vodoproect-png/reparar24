# Reparar24 - Multilingual SEO-Optimized Service Platform

A Next.js 15 platform for connecting users with professional repair services across Spain with full multilingual support (Spanish, English, Russian) and district-level granularity.

## 🌍 Multilingual Architecture

**693 Static Pages** generated across 3 locales with locale-first routing:

- **3** Homepage variants (es, en, ru)
- **18** Service pages (6 services × 3 locales)
- **108** Service+City pages  
- **540** Service+City+District pages (hyper-local SEO)
- **18** City overview pages
- **Sitemap & Robots.txt** with multilingual support

## 📁 Routing Structure

```
app/
  [locale]/                    # es, en, ru
    page.tsx                   # /{locale}
    [serviceSlug]/
      page.tsx                 # /{locale}/fontanero
      [citySlug]/
        page.tsx               # /{locale}/fontanero/madrid
        [districtSlug]/
          page.tsx             # /{locale}/fontanero/madrid/salamanca
    servicios/
      [citySlug]/
        page.tsx               # /{locale}/servicios/madrid
```

### URL Examples

**Spanish (Default - Primary SEO language)**
- `/es` - Homepage
- `/es/fontanero` - Plumbing services
- `/es/fontanero/madrid` - Plumbing in Madrid
- `/es/fontanero/madrid/salamanca` - Plumbing in Salamanca district

**English**
- `/en` - English homepage
- `/en/fontanero/madrid` - Same service, localized UI

**Russian**
- `/ru` - Russian homepage
- `/ru/fontanero/madrid` - Same service, localized UI

## 🚀 Features

- ✅ **Next.js 15** with App Router
- ✅ **True Multilingual SEO** - Locale-first routing
- ✅ **693 Static Pages** - Pre-rendered at build time
- ✅ **District-Level Granularity** - Hyper-local SEO targeting
- ✅ **Hreflang Tags** - Proper multilingual signals with x-default
- ✅ **Canonical URLs** - Spanish as primary canonical language
- ✅ **Translation Dictionaries** - /messages/ (es.json, en.json, ru.json)
- ✅ **Schema.org** - LocalBusiness, Service, FAQ schemas
- ✅ **Intelligent Sitemap** - 693 URLs with priority-based ranking
- ✅ **Tailwind CSS** - Responsive, mobile-first design
- ✅ **TypeScript** - Full type safety

## 🛠️ Quick Start

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Visit: http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 🌐 Translation System

Translation files located in `/messages/`:

### Spanish (es.json) - Primary
```json
{
  "nav": { "home": "Inicio", "plumbing": "Fontanería" },
  "cta": { "callNow": "Llamar Ahora" },
  "emergency": { "banner": "🚨 Servicio de Emergencias 24/7" }
}
```

### English (en.json)
```json
{
  "nav": { "home": "Home", "plumbing": "Plumbing" },
  "cta": { "callNow": "Call Now" }
}
```

### Russian (ru.json)
```json
{
  "nav": { "home": "Главная", "plumbing": "Сантехника" },
  "cta": { "callNow": "Позвонить" }
}
```

**Note:** Service slugs remain in Spanish across all locales for URL consistency. Only UI labels are translated.

## 📊 SEO Architecture

### Hreflang Implementation
- ✅ Alternate language URLs for each page
- ✅ `x-default` points to Spanish (primary)
- ✅ Canonical URLs prevent duplicate content
- ✅ Proper hreflang codes (es-ES, en-GB, ru-RU)

### Metadata Generation
- ✅ Locale-specific titles and descriptions
- ✅ Dynamic keywords per service/city/district
- ✅ OpenGraph tags per locale
- ✅ Twitter Cards

### Schema.org Structured Data
- ✅ LocalBusiness - Per city/district
- ✅ Service - Per service offering
- ✅ FAQPage - Per service
- ✅ BreadcrumbList - Navigation hierarchy

### Internal Linking
Strong silo structure:
```
Homepage → Services → Cities → Districts
```

## 🗂️ Data Structure

### Services (`data/services.ts`)
6 professional services with full metadata

### Cities (`data/cities.ts`)
3 major cities with districts and postal codes

### Districts
~30 districts across Madrid, Barcelona, Valencia for hyper-local targeting

## 📈 Scaling Strategy

### Add New Locales
1. Add locale to `lib/i18n/config.ts`
2. Create `messages/{locale}.json`
3. Add to `lib/i18n/navigation.ts`
4. Run build - pages auto-generate

### Add New Cities/Districts
1. Add to `data/cities.ts`
2. Run build - all route combinations auto-generate

### Add New Services
1. Add to `data/services.ts`
2. Run build - all city/district combinations auto-generate

## 🔧 Technical Details

### Middleware
- Redirects root paths to `/es/` (default locale)
- Preserves locale throughout navigation
- Excludes static files and API routes

### Static Generation
All 693 pages pre-rendered at build time using `generateStaticParams()`

### Performance
- Server Components by default
- Optimized images
- Code splitting
- First Load JS: ~102 kB shared

## 📝 Documentation

See `MULTILINGUAL_ARCHITECTURE.md` for complete technical documentation.

## 🎯 Future Enhancements

- [ ] Add Portuguese (pt) locale
- [ ] Translate service slugs per locale (optional)
- [ ] Add more cities and districts
- [ ] Implement locale switcher in UI
- [ ] Add locale-specific pricing
- [ ] Content translations via CMS

## 📞 Contact

- Phone: 900 000 000
- Email: info@reparar24.es
- Website: https://reparar24.es

## 📝 License

© 2024 Reparar24. All rights reserved.
