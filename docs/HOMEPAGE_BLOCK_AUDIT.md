# Reparar24 Homepage Block Audit

Status date: 2026-06-15

Goal: turn the homepage from an old generic landing page into the project face, while preserving the approved Reparar24 service-page visual direction.

Approved visual rule:
- Keep the approved hero shell direction from `ServiceHeroV2`.
- Homepage hero image should show a branded technician, a white branded service van, and visible Reparar24 service branding.
- Do not replace the whole site architecture with a new one-off landing page.
- Use the same approved hero shell on every public page. Only the image and page-specific SEO/content props change.

## Current Homepage

Route: `app/[locale]/page.tsx`

Current block order:
1. `EmergencyBanner`
2. `Header`
3. `Hero`
4. `ServicesSection`
5. `CitiesSection`
6. `ReviewsSection`
7. `FAQSection`
8. `CTASection`
9. `Footer`
10. `MobileStickyCTA`

## Block Decisions

| Homepage block | Current component | Current status | Decision | Next action |
| --- | --- | --- | --- | --- |
| Emergency top strip | `components/conversion/EmergencyBanner.tsx` | Functional, but visually aggressive and generic | Redesign | Make calmer trust/availability strip or fold into header on desktop |
| Header | `components/layout/Header.tsx` | Functional, but some labels/icons need cleanup | Keep + light redesign | Fix mojibake, align nav with key service pages, remove emoji phone |
| Hero | `components/sections/Hero.tsx` | Updated to approved `ServiceHeroV2` shell | Keep | Continue changing only image and SEO/content props |
| Service entry grid | `components/sections/ServicesSection.tsx` | Redesigned as homepage service gateway | Keep + refine | Add richer visual assets as service icon set matures |
| City coverage | `components/sections/CitiesSection.tsx` | Useful SEO/navigation, but card style is old and text has mojibake | Redesign | Use compact service-area/city directory with priority city links |
| Reviews/social proof | `components/sections/ReviewsSection.tsx` | Has structure, but fake-looking/simple and mojibake | Replace with DS | Reuse/adapt `OpinionesClientesV1` with homepage copy |
| FAQ | `components/sections/FAQSection.tsx` | Functional, but all FAQs dumped globally and old interaction | Replace with DS | Use `FaqSectionV2` with homepage-level FAQs only |
| Final CTA | `components/sections/CTASection.tsx` | Replaced on homepage by `TrustCtaBlueV1` | Keep | Tune copy only if conversion data suggests it |
| Mobile sticky CTA | `components/conversion/MobileStickyCTA.tsx` | Conversion-critical | Keep + verify | Ensure it does not conflict with redesigned footer/CTA |
| Footer | `components/layout/Footer.tsx` | Functional, but mojibake and emoji social placeholders | Keep + cleanup | Fix copy/icons and remove placeholder social links if not real |

## Existing Blocks Worth Reusing

Approved or near-approved DS components:
- `ServiceHeroV2`: approved shell for service pages; use as visual reference for homepage hero.
- `ServicesDirectoryV2`: strong candidate for homepage service navigation.
- `ServicesGridV1`: usable for simpler service-card layout.
- `TrustSignalsV1`: strong candidate for homepage trust band.
- `ProcessStepsV3`: strong candidate for "how it works".
- `OpinionesClientesV1`: replace old reviews.
- `FaqSectionV2`: replace old FAQ.
- `TrustCtaBlueV1`: replace old final CTA.
- `ServiceAreasV1`: possible basis for city/coverage block.

Commercial/conversion components:
- `CommercialCTA`: possible CTA variant.
- `TrustStatsBlock`: possible compact trust stats.
- `PricingTableBlock`: probably not homepage-first; better on service pages.
- `StructuredContentBlock`: not homepage-first.

## Blocks To Draw Or Redesign

High priority:
1. Homepage hero image asset:
   - Branded technician.
   - White branded Reparar24 van.
   - Van side text: Reparar24 plus core services.
   - Wide crop with safe space for copy.
2. Homepage hero shell:
   - Not the old blue gradient.
   - Use approved DS direction and branded image.
   - Keep phone and WhatsApp as primary actions.
3. Homepage service gateway:
   - Clear routes to `fontanero`, `electricista`, `desatascos`, `aire-acondicionado`, `calefaccion`, `limpieza-tuberias`.
   - No emoji icons; use lucide or DS visual assets.
4. Homepage city/coverage gateway:
   - Compact city links.
   - Avoid overclaiming "toda Espana" if operational focus is Valencia + generated cities.

Medium priority:
5. Trust/proof band:
   - Response time, guarantee, certified professionals, insured work.
   - Use realistic claims already present in service pages.
6. Process block:
   - Contact -> diagnosis -> quote -> repair/guarantee.
   - Reuse `ProcessStepsV3` if visual fit is good.
7. Reviews block:
   - Use polished DS component.
   - Avoid fake-looking dates/names if not verified.
8. Homepage FAQ:
   - Keep broad, conversion-focused FAQs only.

Low priority:
9. Pricing preview:
   - Optional. Could be too much for homepage.
   - Better as a small "desde" signal inside service cards.
10. SEO text block:
   - Optional. Homepage should not become long generic SEO text.

## Recommended Homepage Order

1. Header
2. Hero with branded technician/van image
3. Service gateway
4. Trust proof strip
5. How it works
6. Coverage/city gateway
7. Reviews or guarantees
8. FAQ
9. Final CTA
10. Footer + mobile sticky CTA

## 2026-06-15 Implementation Notes

- Homepage hero now reuses `ServiceHeroV2`, matching the approved electricista/fontanero shell.
- Old homepage service cards were replaced by a stronger service gateway with 3D visual assets where available.
- `TrustSignalsV1`, `ProcessStepsV3`, and `TrustCtaBlueV1` are now reused on the homepage.
- Remaining cleanup candidates: city coverage block, reviews block, FAQ block, header/footer mojibake.

## Implementation Sequence

1. Generate and approve the branded hero image.
2. Replace `components/sections/Hero.tsx` only, keeping homepage route stable.
3. Replace `ServicesSection` with a DS-aligned homepage service gateway.
4. Replace `CitiesSection` with a compact DS-aligned coverage block.
5. Swap old reviews/FAQ/CTA to DS components or homepage-specific wrappers.
6. Clean mojibake in visible homepage copy, header and footer.
7. Run lint/build and visual check desktop/mobile.
