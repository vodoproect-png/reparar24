# Analytics Setup Guide - Reparar24

**Project:** Reparar24  
**Primary Market:** Valencia, Spain  
**Strategy:** Valencia-First Rollout  
**Date:** 2026-05-18

---

## Analytics Architecture Overview

### Goals

1. **Track page performance** across Valencia districts
2. **Measure conversion funnel** (impression → click → call/WhatsApp)
3. **Validate semantic differentiation** effectiveness
4. **Correlate SEO metrics with business outcomes**
5. **Guide rollout expansion** decisions

### Stack

- **Google Analytics 4** (GA4) - Primary analytics
- **Google Tag Manager** (GTM) - Tag management  
- **Google Search Console** (GSC) - SEO data (separate doc)
- **Custom events** - Conversion tracking

---

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. **Go to Google Analytics:**
   - URL: https://analytics.google.com
   - Sign in with business Google account

2. **Create Property:**
   - Name: "Reparar24"
   - Time zone: "Spain (Madrid)"
   - Currency: "EUR - Euro"

3. **Create Data Stream:**
   - Platform: Web
   - Website URL: `https://reparar24.es`
   - Stream name: "Reparar24 Production"
   - Enhanced measurement: Enable all

4. **Get Measurement ID:**
   - Format: `G-XXXXXXXXXX`
   - Save this ID for environment variables

### Step 2: Environment Variable Setup

**Add to `.env.local` and production environment:**

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**⚠️ IMPORTANT:** Do NOT commit real IDs to Git. Use placeholders in code.

### Step 3: GA4 Integration Code

**Create: `lib/analytics/google-analytics.ts`**

```typescript
/**
 * Google Analytics 4 Integration
 * 
 * Safe placeholder implementation - no real tracking IDs in code
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Only track in production
export const isProduction = process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID

/**
 * Page view tracking
 */
export const pageview = (url: string) => {
  if (!isProduction) return
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

/**
 * Event tracking
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (!isProduction) return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Conversion tracking
 */
export const trackConversion = (
  type: 'call' | 'whatsapp' | 'email',
  value?: number
) => {
  if (!isProduction) return
  
  window.gtag('event', 'conversion', {
    event_category: 'contact',
    event_label: type,
    value: value || 0,
  })
}
```

**Create: `lib/analytics/gtag.ts`**

```typescript
/**
 * Google Tag (gtag.js) Declaration
 */

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

export {}
```

### Step 4: Add Analytics Scripts

**Update: `app/layout.tsx`**

Add to `<head>` section (ONLY if env var is set):

```typescript
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </>
)}
```

---

## Event Tracking Implementation

### Core Events to Track

#### 1. Phone Click Tracking

**Component: `components/conversion/CallNowButton.tsx`**

```typescript
'use client'
import { trackConversion } from '@/lib/analytics/google-analytics'

export default function CallNowButton() {
  const handleClick = () => {
    // Track conversion
    trackConversion('call')
    
    // Also track as custom event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'call_now_button',
      })
    }
  }
  
  return (
    <a 
      href="tel:+34900000000"
      onClick={handleClick}
      className="btn-primary"
    >
      📞 Llamar Ahora
    </a>
  )
}
```

#### 2. WhatsApp Click Tracking

**Component: `components/conversion/WhatsAppCTA.tsx`**

```typescript
'use client'
import { trackConversion } from '@/lib/analytics/google-analytics'

export default function WhatsAppCTA({ message }: { message: string }) {
  const handleClick = () => {
    // Track conversion
    trackConversion('whatsapp')
    
    // Custom event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_button',
      })
    }
  }
  
  const whatsappUrl = `https://wa.me/34900000000?text=${encodeURIComponent(message)}`
  
  return (
    <a 
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp"
    >
      WhatsApp
    </a>
  )
}
```

#### 3. District Page View Tracking

**Automatic with GA4**, but enhance with custom dimensions:

```typescript
// In district page component
useEffect(() => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: `${service.name} en ${district.name}`,
      page_location: window.location.href,
      district_id: district.id,
      city_id: city.id,
      service_id: service.id,
    })
  }
}, [])
```

---

## Valencia Rollout KPIs

### Primary Metrics

#### 1. Page Performance
- **Sessions per page** (Valencia districts)
- **Bounce rate** (target: <60%)
- **Average session duration** (target: >1 min)
- **Pages per session** (target: >1.5)

#### 2. Engagement
- **CTA clicks** (phone + WhatsApp)
- **Scroll depth** (% of page scrolled)
- **Time on page** by section
- **Internal link clicks**

#### 3. Conversions
- **Phone clicks** per district
- **WhatsApp clicks** per district
- **Email form submissions**
- **Conversion rate** (sessions → CTA click)

#### 4. Traffic Sources
- **Organic search** (from Google)
- **Direct** (brand awareness)
- **Referral** (external links)
- **Social** (if applicable)

### Secondary Metrics

- **Device breakdown** (mobile vs desktop)
- **Browser distribution**
- **Page load time**
- **Exit pages** (where users leave)

---

## Custom Dimensions & Metrics

### Recommended Custom Dimensions

Add in GA4 Admin → Custom Definitions:

1. **District ID** (Event-scoped)
   - Parameter: `district_id`
   - Values: `ciutat-vella`, `leixample`, etc.

2. **City ID** (Event-scoped)
   - Parameter: `city_id`
   - Values: `valencia`, `madrid`, `barcelona`

3. **Service ID** (Event-scoped)
   -

 Parameter: `service_id`
   - Values: `fontanero`, `electricista`, etc.

4. **Content Type** (Event-scoped)
   - Parameter: `content_type`
   - Values: `district_page`, `city_page`, `service_page`

5. **Rollout Phase** (User-scoped)
   - Parameter: `rollout_phase`
   - Values: `valencia`, `madrid`, `barcelona`

### Custom Metrics

1. **CTA Click Rate**
   - Formula: (CTA clicks / Sessions) × 100
   - Target: >5%

2. **District Engagement Score**
   - Formula: (Time on page + Scroll depth + Pages/session) / 3
   - Normalized 0-100

---

## Conversion Tracking Strategy

### Conversion Events

#### 1. Primary Conversions

**Phone Call Intent:**
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // If using Google Ads
  'value': 50.0,
  'currency': 'EUR',
  'conversion_type': 'phone_call'
})
```

**WhatsApp Contact:**
```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  'value': 40.0,
  'currency': 'EUR',
  'conversion_type': 'whatsapp_message'
})
```

#### 2. Micro-Conversions

- Scroll to "Problems" section (50%)
- Scroll to FAQ section (75%)
- View phone number
- Hover over CTA button
- Read 3+ sections

### Conversion Funnel

```
Stage 1: Page Load (100%)
   ↓
Stage 2: Content Engagement (scroll >25%) (target: 70%)
   ↓
Stage 3: Problem Section View (target: 50%)
   ↓
Stage 4: FAQ Interaction (target: 30%)
   ↓
Stage 5: CTA Click (phone/WhatsApp) (target: 5%)
```

---

## SEO Monitoring KPIs

### Organic Search Performance

Track in GA4 → Reports → Acquisition → Traffic Acquisition:

#### 1. Organic Traffic Metrics
- **Users from organic search** (Valencia)
- **Sessions from organic search**
- **Organic conversion rate**
- **Organic bounce rate**

#### 2. Landing Page Performance
- **Top Valencia landing pages** by sessions
- **Engagement rate** per landing page
- **Conversion rate** per landing page

#### 3. Query Analysis

Integrate GSC with GA4 to see:
- **Search queries** driving traffic
- **Landing pages** per query
- **Click-through rate** from search
- **Average position** in search results

---

## Dashboard Setup

### GA4 Custom Reports

#### 1. Valencia Rollout Dashboard

**Metrics to include:**
- Valencia sessions (last 7 days)
- Conversion rate trend
- Top performing districts
- CTA click breakdown (phone vs WhatsApp)
- Device breakdown
- Traffic source distribution

**Filters:**
- City: Valencia
- Date range: Last 30 days
- Compare to: Previous period

#### 2. District Performance Report

**Dimensions:**
- District name
- Service type

**Metrics:**
- Sessions
- Bounce rate
- Avg session duration
- CTA clicks
- Conversion rate

**Sort by:** Sessions descending

#### 3. Conversion Funnel Report

**Steps:**
1. Page load
2. Scroll 25%
3. Scroll 50%
4. Scroll 75%
5. CTA click

**Metric:** Drop-off rate per step

---

## Weekly Monitoring Plan

### Week 1: Baseline Establishment

**Goals:**
- Install tracking correctly
- Verify events firing
- Establish baseline metrics
- Identify tracking issues

**Actions:**
- [ ] Check Real-Time reports daily
- [ ] Verify all events tracked
- [ ] Debug any tracking errors
- [ ] Document baseline metrics

### Week 2-4: Performance Tracking

**Goals:**
- Monitor Valencia performance
- Track conversion trends
- Identify top/bottom performers
- Correlate with GSC data

**Actions:**
- [ ] Weekly dashboard review (Monday)
- [ ] Compare to GSC metrics
- [ ] Identify optimization opportunities
- [ ] Document insights

---

## Integration with Business Metrics

### CRM Integration (if available)

**Track lead quality:**
- Which districts generate best leads?
- Which services convert highest?
- What's the lead-to-customer rate?
- Average customer value by source

### Call Tracking (optional)

Use call tracking numbers to:
- Attribute phone calls to specific pages
- Track call duration
- Measure call quality
- Calculate ROI per district

---

## Privacy & Compliance

### GDPR Compliance

**Required:**
- [ ] Cookie consent banner
- [ ] Privacy policy updated
- [ ] Data retention settings configured
- [ ] User data deletion capability

**GA4 Settings:**
- IP anonymization: Enabled (automatic in GA4)
- Data retention: 14 months
- User deletion: Enabled
- Advertising features: Review carefully

### Cookie Consent

**Implementation needed:**
- Cookie consent management platform
- Block GA4 until consent given
- Allow opt-out mechanism
- Document consent choices

**Code example:**
```typescript
// Only load GA4 after consent
if (hasUserConsent()) {
  loadGA4()
}
```

---

## Testing & Validation

### Pre-Launch Checklist

- [ ] GA4 property created
- [ ] Measurement ID in environment variables
- [ ] Scripts load in production only
- [ ] Events fire correctly
- [ ] Custom dimensions recording
- [ ] Real-time data visible in GA4
- [ ] No PII (personal info) tracked
- [ ] Cookie consent implemented

### Event Testing

Use GA4 DebugView:
1. Add `?debug_mode=true` to URL
2. Open GA4 DebugView
3. Perform actions (click CTAs, scroll, etc.)
4. Verify events appear in DebugView
5. Check parameters correctly passed

---

## Troubleshooting

### Issue: Events Not Tracking

**Solutions:**
1. Check browser console for errors
2. Verify GA_MEASUREMENT_ID is set
3. Confirm scripts loaded (Network tab)
4. Use DebugView to test
5. Check ad blockers disabled for testing

### Issue: Duplicate Page Views

**Solutions:**
1. Review navigation tracking
2. Check for duplicate script tags
3. Verify SPA routing handled correctly
4. Use GTM to manage tags (prevents duplicates)

---

## Rollout Success Criteria

### Week 4 Target Metrics

**Traffic:**
- Valencia organic sessions: >100/week
- Direct sessions: >50/week
- Total Valencia sessions: >200/week

**Engagement:**
- Bounce rate: <60%
- Avg session duration: >1:30
- Pages per session: >1.5

**Conversions:**
- CTA clicks: >10/week
- Conversion rate: >5%
- Phone:WhatsApp ratio: Document baseline

---

## Recommendations

### Immediate (Deployment)
1. ✅ Set up GA4 property
2. ✅ Configure environment variables
3. ✅ Add tracking scripts to layout
4. ✅ Implement event tracking
5. ✅ Create Valencia dashboard

### Week 1-2 (Validation)
1. Verify tracking accuracy
2. Establish baseline metrics
3. Debug any issues
4. Set up automated reports

### Week 3-4 (Optimization)
1. Analyze conversion funnel
2. Identify top performers
3. A/B test CTAs if needed
4. Optimize based on data

### Future Enhancements
1. Heatmap tracking (Hotjar/Microsoft Clarity)
2. Session recording
3. Advanced segmentation
4. Predictive analytics
5. Attribution modeling

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-18  
**Owner:** Analytics Team Lead  
**Next Review:** Post-deployment +1 week
