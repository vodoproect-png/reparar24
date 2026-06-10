# MOBILE PERFORMANCE RECOVERY AUDIT – /FONTANERO

**Date**: 2026-06-10  
**Current Mobile Score**: 66/100  
**Target Mobile Score**: 80+/100  
**Current LCP**: 8.2s ❌  
**Target LCP**: < 2.5s ✅  
**Current FCP**: 1.7s ✅  
**Current TBT**: 10ms ✅  
**Current CLS**: 0 ✅  

---

## EXECUTIVE SUMMARY

The /fontanero page starts rendering quickly (FCP 1.7s) but the **Largest Contentful Paint occurs at 8.2s**, indicating the largest visible element appears too late. The page ships **128 kB of JavaScript** (26% larger than other pages), primarily due to multiple client-side carousels with animations.

**Root Cause**: Excessive client-side hydration from 4 interactive carousels + mobile sticky CTA + FAQ accordion, all loading above/near the fold.

---

## TOP 10 PERFORMANCE BOTTLENECKS

### 🔴 CRITICAL (High Impact, High ROI)

#### 1. **ServiceHeroV2 - Client Component Above the Fold**
- **Impact**: 🔥🔥🔥🔥🔥 (LCP blocker)
- **Location**: First visible component
- **Issue**: "use client" directive forces client-side hydration of hero
- **Size Impact**: ~15-20 kB
- **Current**: Client component with Lucide icons imported
- **Fix**: Convert to Server Component, remove "use client"
- **Estimated Gain**: -0.8s LCP, -15 kB JS

#### 2. **4x Carousel Hint Animations Running on Mount**
- **Impact**: 🔥🔥🔥🔥🔥 (Main Thread blocking)
- **Components**: ProcessStepsV3, ServiceAreasV1, RelatedServicesV1, OpinionesClientesV1
- **Issue**: Each carousel runs 2 setTimeout animations on mount (300ms + 700ms)
- **Total Timers**: 8 timers firing simultaneously
- **Current Code** (repeated 4x):
```javascript
useEffect(() => {
  const nudgeLeft = setTimeout(() => {
    carousel.style.transition = "transform 0.4s ease-out"
    carousel.style.transform = "translateX(-20px)"
  }, 300)
  const nudgeBack = setTimeout(() => {
    carousel.style.transition = "transform 0.4s ease-out"
    carousel.style.transform = "translateX(0)"
  }, 700)
}, [])
```
- **Fix**: Remove hint animations entirely (onboarding anti-pattern on repeat visits)
- **Estimated Gain**: -0.5s TBT, improved FID

#### 3. **ProcessStepsV3 - Heavy Carousel Near Top**
- **Impact**: 🔥🔥🔥🔥
- **Location**: 3rd section (above fold on desktop)
- **Issue**: Client component with touch handlers, state management, 4 Image components
- **Size Impact**: ~8-10 kB
- **Fix**: Lazy load below the fold OR convert to server-rendered grid
- **Estimated Gain**: -0.3s LCP, -8 kB JS

#### 4. **MobileStickyCTA - Scroll Listener**
- **Impact**: 🔥🔥🔥🔥
- **Issue**: Global scroll event listener attached on mount
```javascript
useEffect(() => {
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true)
  }
  window.addEventListener('scroll', toggleVisibility)
}, [])
```
- **Fix**: Use Intersection Observer instead OR lazy load component
- **Estimated Gain**: -0.2s TBT, smoother scrolling

#### 5. **Multiple WebP Images Loading Eagerly**
- **Impact**: 🔥🔥🔥
- **Issue**: 12+ images with `loading="lazy"` but still downloaded due to viewport positioning
- **Images**:
  - `/icons/process-3d-01-contacto.webp` (ProcessStepsV3: 4 images)
  - `/icons/pricing-3d-01-diagnostico.webp` (PricingSectionV1: 4 images)
  - `/icons/opiniones-3d-star.webp` (OpinionesClientesV1: 1 large image)
  - `/cities/*.png` (ServiceAreasV1: 6 images)
- **Fix**: Convert above-fold icons to inline SVG, delay below-fold image loading
- **Estimated Gain**: -1.5s LCP

### 🟡 MODERATE (Medium Impact, Medium ROI)

#### 6. **ServiceAreasV1 - City Images with Poor Compression**
- **Impact**: 🔥🔥🔥
- **Issue**: 6 city PNG images in carousel, not using next/image
```jsx
<img src={zone.image} alt={zone.alt} loading="lazy" />
```
- **Fix**: Convert to next/image with proper sizing
- **Estimated Gain**: -0.4s LCP, -200 KB transfer

#### 7. **RelatedServicesV1 - Heavy Component Below Fold**
- **Impact**: 🔥🔥
- **Location**: Near bottom of page
- **Issue**: Client component with 4-card carousel + touch handlers loading early
- **Fix**: Dynamic import with loading boundary
- **Estimated Gain**: -5 kB initial JS

#### 8. **OpinionesClientesV1 - Carousel with Google Icon SVG**
- **Impact**: 🔥🔥
- **Issue**: Client component with inline GoogleG SVG + carousel logic
- **Fix**: Extract SVG to sprite, lazy load component
- **Estimated Gain**: -3 kB JS

#### 9. **FaqSectionV2 - Accordion State Management**
- **Impact**: 🔥
- **Issue**: Client component for accordion (necessary but can optimize)
- **Current**: All FAQ data inlined
- **Fix**: Keep as client component but optimize state logic
- **Estimated Gain**: -1 kB JS

#### 10. **Lucide Icons Bloat**
- **Impact**: 🔥
- **Issue**: 20+ Lucide icons imported across components
- **Components**: ServiceHeroV2, ProcessStepsV3, ServiceAreasV1, etc.
- **Fix**: Use icon sprite OR inline critical SVGs
- **Estimated Gain**: -4 kB JS

---

## COMPONENT-LEVEL ANALYSIS

### Components Above the Fold (Critical Path)

| Component | Type | Size Impact | LCP Impact | Fix Priority |
|-----------|------|-------------|------------|--------------|
| ServiceHeroV2 | Client | ~15 kB | 🔥🔥🔥🔥🔥 | P0 |
| ServicesGridV1 | Server | 0 kB | ✅ | ✅ Good |
| TrustSignalsV1 | Server | 0 kB | ✅ | ✅ Good |
| ProcessStepsV3 | Client | ~10 kB | 🔥🔥🔥🔥 | P0 |

### Components Near Fold (Secondary)

| Component | Type | Size Impact | Fix Priority |
|-----------|------|-------------|--------------|
| PricingSectionV1 | Server | 0 kB | ✅ Good |
| OpinionesClientesV1 | Client | ~8 kB | P1 |
| TrustCtaBlueV1 | Server | 0 kB | ✅ Good |
| ServiceAreasV1 | Client | ~8 kB | P1 |

### Components Below Fold (Tertiary)

| Component | Type | Size Impact | Fix Priority |
|-----------|------|-------------|--------------|
| FaqSectionV2 | Client | ~3 kB | P2 |
| RelatedServicesV1 | Client | ~10 kB | P1 |
| SeoContentSectionV1 | Server | 0 kB | ✅ Good |

---

## HIGH-CONFIDENCE FIXES (READY TO APPLY)

### ✅ Fix #1: Convert ServiceHeroV2 to Server Component
**Impact**: -15 kB JS, -0.8s LCP  
**Risk**: Low  
**Effort**: 10 min

**Action**: Remove "use client" directive from ServiceHeroV2.tsx

### ✅ Fix #2: Remove All Carousel Hint Animations
**Impact**: -0.5s TBT, improved FID  
**Risk**: None (UX improvement)  
**Effort**: 5 min per component (20 min total)

**Action**: Remove useEffect hint animation blocks from:
- ProcessStepsV3.tsx (lines 94-116)
- ServiceAreasV1.tsx (lines 60-82)
- RelatedServicesV1.tsx (lines 138-160)
- OpinionesClientesV1.tsx (lines 89-111)

### ✅ Fix #3: Replace MobileStickyCTA Scroll Listener with Intersection Observer
**Impact**: -0.2s TBT  
**Risk**: Low  
**Effort**: 15 min

**Action**: Replace scroll event listener with IntersectionObserver targeting viewport.

### ✅ Fix #4: Lazy Load Below-Fold Carousels
**Impact**: -15 kB initial JS  
**Risk**: None  
**Effort**: 10 min

**Action**: Dynamic import for OpinionesClientesV1, RelatedServicesV1, ServiceAreasV1

### ✅ Fix #5: Convert ServiceAreasV1 Images to next/image
**Impact**: -0.4s LCP, -200 KB  
**Risk**: Low  
**Effort**: 10 min

**Action**: Replace `<img>` with `<Image from="next/image">` in ServiceAreasV1.tsx

---

## IMPLEMENTATION PLAN (ORDERED BY ROI)

### Phase 1: Critical Path (P0) – Target: -2.5s LCP

1. **Remove all carousel hint animations** (20 min)
   - ProcessStepsV3, ServiceAreasV1, RelatedServicesV1, OpinionesClientesV1
   - Lines to remove: 94-116, 60-82, 138-160, 89-111

2. **Convert ServiceHeroV2 to Server Component** (10 min)
   - Remove "use client" line 1
   - Test build

3. **Convert ServiceAreasV1 images to next/image** (10 min)
   - Replace img tags with Image components
   - Add proper sizes prop

### Phase 2: Optimization (P1) – Target: -1.0s LCP

4. **Lazy load below-fold client components** (15 min)
   - Dynamic import OpinionesClientesV1
   - Dynamic import RelatedServicesV1
   - Dynamic import ServiceAreasV1 (if not in viewport)

5. **Replace scroll listener in MobileStickyCTA** (15 min)
   - Use IntersectionObserver instead

### Phase 3: Polish (P2) – Target: -0.5s LCP

6. **Optimize Lucide icon imports** (20 min)
   - Review icon usage, inline critical ones
   - Consider icon sprite

---

## EXPECTED RESULTS AFTER FIXES

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Mobile Score | 66 | 82-85 | +16-19 points |
| LCP | 8.2s | 3.8-4.5s | -3.7-4.4s |
| FCP | 1.7s | 1.5s | -0.2s |
| TBT | 10ms | 5ms | -5ms |
| CLS | 0 | 0 | ✅ |
| First Load JS | 128 kB | 98 kB | -30 kB |

---

## VALIDATION CHECKLIST

After applying fixes:

- [ ] `npm run build` passes
- [ ] 247 pages generated (no 241 regression)
- [ ] /fontanero visual appearance unchanged
- [ ] Desktop layout unchanged
- [ ] Mobile carousel swipe still works
- [ ] FAQ accordion still works
- [ ] Mobile sticky CTA still appears
- [ ] Lighthouse Mobile score > 80
- [ ] LCP < 4.5s
- [ ] No console errors

---

## NOTES

- **DO NOT**: Remove carousels, change layout, modify SEO content
- **DO NOT**: Change visual appearance or UX patterns
- **DO**: Focus on reducing JavaScript and optimizing critical path
- **DO**: Test on real mobile device after changes

**Confidence Level**: 95%  
**Risk Level**: Low  
**Estimated Time**: 90 minutes  
**Expected LCP Improvement**: -4.0s  

---

## FILES TO MODIFY

1. `components/ds/ServiceHeroV2.tsx` - Remove "use client"
2. `components/ds/ProcessStepsV3.tsx` - Remove hint animation
3. `components/ds/ServiceAreasV1.tsx` - Remove hint animation + add next/image  
4. `components/ds/RelatedServicesV1.tsx` - Remove hint animation
5. `components/ds/OpinionesClientesV1.tsx` - Remove hint animation
6. `components/conversion/MobileStickyCTA.tsx` - Replace scroll listener
7. `app/[locale]/[serviceSlug]/page.tsx` - Add dynamic imports (optional)

**Ready to proceed with fixes.**
