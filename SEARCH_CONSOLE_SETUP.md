# Google Search Console Setup Guide

**Project:** Reparar24  
**Primary Market:** Valencia, Spain  
**Primary Locale:** Spanish (es)  
**Domain:** https://reparar24.es  
**Date:** 2026-05-18

---

## Pre-Setup Verification

### ✅ Sitemap Correctness (Verified)

**File:** `app/sitemap.ts`

**Status:** ✅ Production-safe
- Base URL: `https://reparar24.es` (correct)
- No localhost references
- Proper locale handling
- Includes all page types:
  - Homepage (priority: 1.0)
  - Service pages (priority: 0.9)
  - City pages (priority: 0.8)
  - Service+City pages (priority: 0.7)
  - Service+City+District pages (priority: 0.6)

**Total URLs in sitemap:** ~693 pages × 3 locales = ~2,079 URLs

---

### ✅ Robots.txt Correctness (Verified)

**File:** `app/robots.ts`

**Status:** ✅ Production-safe
```
User-agent: *
Allow: /
Disallow: /api/, /admin/
Sitemap: https://reparar24.es/sitemap.xml
```

**Verified:**
- ✅ No accidental noindex
- ✅ No overly restrictive disallows
- ✅ Proper sitemap reference
- ✅ Allows all user agents

---

### ✅ Canonical URLs (Architecture Review)

**Status:** ✅ Consistent
- Metadata generation uses proper baseUrl
- No localhost references detected
- Locale-aware canonicals
- Hreflang implementation present

**To verify post-deployment:**
- [ ] Check live pages show correct canonical tags
- [ ] Verify canonical = actual URL
- [ ] Confirm no mixed http/https

---

### ✅ Hreflang Tags (Architecture Review)

**File:** `lib/seo/hreflang.ts`

**Status:** ✅ Implemented
- Cross-locale linking configured
- Proper x-default handling
- Locale-aware URL generation

**To verify post-deployment:**
- [ ] Check HTML source for hreflang tags
- [ ] Verify all 3 locales linked
- [ ] Confirm x-default set properly

---

## Google Search Console Setup

### Step 1: Property Setup

#### 1.1 Create Property

1. **Go to Search Console:**
   - URL: https://search.google.com/search-console
   - Sign in with business Google account

2. **Add Property:**
   - Choose: "Domain property" (recommended)
   - Domain: `reparar24.es`
   
**Alternative:** URL prefix property
   - URL: `https://reparar24.es`
   - This is simpler but less comprehensive

3. **Verify Ownership:**
   
   **Method A: DNS Verification** (recommended for domain property)
   - Add TXT record to DNS
   - Record name: `@`
   - Record value: [GSC provides this]
   - TTL: 3600
   - Wait for DNS propagation (5-60 minutes)
   - Click "Verify" in GSC

   **Method B: HTML File Upload** (for URL prefix)
   - Download verification file
   - Place in `public/` directory
   - Deploy to production
   - Click "Verify" in GSC

   **Method C: HTML Tag** (easiest for Next.js)
   - Copy meta tag from GSC
   - Add to `app/layout.tsx` in `<head>`
   - Deploy to production
   - Click "Verify" in GSC

#### 1.2 Set Preferred Domain

- In GSC property settings
- Confirm: `https://reparar24.es` (with https)
- No www redirect needed (not using www)

#### 1.3 Configure Users

- Add team members with appropriate access:
  - Owner: Business owner
  - Full access: SEO manager, developer
  - Restricted access: Marketing team (view only)

---

### Step 2: Sitemap Submission

#### 2.1 Submit Main Sitemap

1. **Navigate to:** Sitemaps section in left sidebar
2. **Add new sitemap:**
   - URL: `https://reparar24.es/sitemap.xml`
   - Click "Submit"

3. **Expected Result:**
   - Status: "Success"
   - Discovered URLs: ~2,079
   - Processing time: 24-48 hours typically

#### 2.2 Verify Sitemap Access

Before submitting, verify:
```bash
# Check sitemap is accessible
curl https://reparar24.es/sitemap.xml

# Should return XML with <url> entries
# Should NOT return 404
```

#### 2.3 Monitor Sitemap Status

- Check daily for first week
- Look for:
  - ✅ "Success" status
  - ✅ All ~2,079 URLs discovered
  - ⚠️ Any errors or warnings
  - ⚠️ URLs marked as "Excluded"

---

### Step 3: Valencia-First Indexing Requests

#### 3.1 Priority URL List (25 Valencia Pages)

**Submit these FIRST for immediate indexing:**

```
# Valencia - Ciutat Vella (5 services)
https://reparar24.es/fontanero/valencia/ciutat-vella
https://reparar24.es/electricista/valencia/ciutat-vella
https://reparar24.es/desatascos/valencia/ciutat-vella
https://reparar24.es/calefaccion/valencia/ciutat-vella
https://reparar24.es/aire-acondicionado/valencia/ciutat-vella

# Valencia - L'Eixample (5 services)
https://reparar24.es/fontanero/valencia/leixample
https://reparar24.es/electricista/valencia/leixample
https://reparar24.es/desatascos/valencia/leixample
https://reparar24.es/calefaccion/valencia/leixample
https://reparar24.es/aire-acondicionado/valencia/leixample

# Valencia - Extramurs (5 services)
https://reparar24.es/fontanero/valencia/extramurs
https://reparar24.es/electricista/valencia/extramurs
https://reparar24.es/desatascos/valencia/extramurs
https://reparar24.es/calefaccion/valencia/extramurs
https://reparar24.es/aire-acondicionado/valencia/extramurs

# Valencia - Campanar (5 services)
https://reparar24.es/fontanero/valencia/campanar
https://reparar24.es/electricista/valencia/campanar
https://reparar24.es/desatascos/valencia/campanar
https://reparar24.es/calefaccion/valencia/campanar
https://reparar24.es/aire-acondicionado/valencia/campanar

# Valencia - Poblats Marítims (5 services)
https://reparar24.es/fontanero/valencia/poblats-maritims
https://reparar24.es/electricista/valencia/poblats-maritims
https://reparar24.es/desatascos/valencia/poblats-maritims
https://reparar24.es/calefaccion/valencia/poblats-maritims
https://reparar24.es/aire-acondicionado/valencia/poblats-maritims
```

#### 3.2 Manual Indexing Requests

**For each Valencia URL:**

1. **URL Inspection Tool:**
   - Paste URL into top search bar in GSC
   - Click "Test Live URL"
   - Wait for crawl results
   - Click "Request Indexing"
   - Repeat for all 25 URLs

2. **Rate Limits:**
   - GSC typically allows ~10 requests per day
   - Spread requests over 3-4 days
   - Prioritize highest-traffic expected pages first

3. **Priority Order Recommendation:**
   - Day 1: Ciutat Vella (5 URLs) + L'Eixample (5 URLs)
   - Day 2: Extramurs (5 URLs) + Campanar (5 URLs)
   - Day 3: Poblats Marítims (5 URLs)

---

### Step 4: Core Pages Indexing

**Also request indexing for:**

```
# Homepage
https://reparar24.es

# Valencia city page
https://reparar24.es/servicios/valencia

# Valencia service pages (5)
https://reparar24.es/fontanero/valencia
https://reparar24.es/electricista/valencia
https://reparar24.es/desatascos/valencia
https://reparar24.es/calefaccion/valencia
https://reparar24.es/aire-acondicionado/valencia
```

**Total priority indexing requests:** 31 URLs

---

## Coverage Monitoring

### Week 1: Initial Indexation

**Daily Checks:**
- [ ] Navigate to: Coverage → All submitted pages
- [ ] Track: "Valid" pages count
- [ ] Monitor: "Excluded" pages
- [ ] Check: "Error" pages (should be 0)

**Target Metrics (Week 1):**
- Valid indexed: >15/25 Valencia pages (60%)
- Excluded: Investigate any exclusions
- Errors: 0

### Week 2-4: Full Indexation

**Weekly Checks:**
- [ ] Valid indexed: >25/25 Valencia pages (100%)
- [ ] Impressions starting to appear
- [ ] Average position being tracked

**Target Metrics (Week 4):**
- Valid indexed: 25/25 Valencia pages (100%)
- Impressions: >100/week for Valencia keywords
- Clicks: >5/week
- Average position: <50 for target keywords

---

## Performance Monitoring

### Search Performance Reports

**Navigate to:** Performance section

#### Key Metrics to Track

**1. Queries**
- [ ] Monitor Valencia-specific queries:
  - "fontanero valencia"
  - "electricista valencia"
  - "desatascos valencia"
  - "fontanero [district] valencia"
- [ ] Track impressions per query
- [ ] Track clicks per query
- [ ] Calculate CTR per query
- [ ] Monitor average position

**2. Pages**
- [ ] Sort by impressions
- [ ] Identify top-performing Valencia pages
- [ ] Track clicks per page
- [ ] Monitor CTR per page
- [ ] Check average position per page

**3. Countries**
- [ ] Verify Spain is primary source
- [ ] Check Valencia region specifically (if available)

**4. Devices**
- [ ] Monitor mobile vs desktop split
- [ ] Optimize for dominant device type

**5. Search Appearance**
- [ ] Track rich results appearances
- [ ] Monitor schema markup effectiveness

---

## Crawl Monitoring

### Crawl Stats

**Navigate to:** Settings → Crawl stats

**Monitor:**
- [ ] Total crawl requests per day
- [ ] Download time (should be <1s)
- [ ] Response time (should be <500ms)
- [ ] Crawl request stats by response type
- [ ] File type breakdown

**Target Crawl Stats:**
- Crawl requests: 10-50/day initially, increasing over time
- Average response time: <500ms
- 200 HTTP responses: >95%
- No 404s or 5xx errors

---

## Warning Monitoring Checklist

### Critical Warnings to Watch

#### 1. Manual Actions
**Navigate to:** Manual Actions

**Red Flags:**
- ⚠️ "Thin content with little or no added value"
- ⚠️ "Duplicate content"
- ⚠️ "Cloaking or sneaky redirects"
- ⚠️ "Unnatural links"

**Action if flagged:**
- STOP rollout immediately
- Review flagged pages
- Fix issues
- Request reconsideration

#### 2. Security Issues
**Navigate to:** Security issues

**Red Flags:**
- ⚠️ "Hacked content"
- ⚠️ "Malware"
- ⚠️ "Social engineering"

**Action if flagged:**
- CRITICAL - fix immediately
- Review all recent changes
- Scan for vulnerabilities

#### 3. Mobile Usability
**Navigate to:** Mobile Usability

**Common Warnings:**
- ⚠️ "Text too small to read"
- ⚠️ "Clickable elements too close together"
- ⚠️ "Content wider than screen"
- ⚠️ "Viewport not set"

**Action if warnings:**
- Review flagged pages on mobile
- Fix responsive design issues
- Re-validate in GSC

#### 4. Page Experience
**Navigate to:** Page Experience

**Red Flags:**
- ⚠️ Poor Core Web Vitals
- ⚠️ Not mobile-friendly
- ⚠️ Not secure (HTTPS)

**Target:**
- Core Web Vitals: "Good" for >75% of visits
- Mobile-friendly: Yes
- HTTPS: Yes

---

## Weekly Review Checklist

### Week 1-4 (Valencia Rollout)

**Every Monday:**
- [ ] Check coverage: Valid pages count
- [ ] Review impressions: Valencia keywords
- [ ] Monitor clicks: Any conversi

ons?
- [ ] Check warnings: Manual actions, security
- [ ] Review crawl stats: Response times
- [ ] Analyze top queries: What's working?
- [ ] Check CTR: >2% target
- [ ] Monitor average position: Improving?

**Report Template:**
```
Valencia Rollout - Week X Report

Coverage:
- Valid pages: X/25 (XX%)
- Excluded: X
- Errors: 0

Performance:
- Impressions: XXX
- Clicks: XX
- CTR: X.X%
- Avg Position: XX

Top Queries:
1. [query] - XXX impressions, XX clicks
2. [query] - XXX impressions, XX clicks
3. [query] - XXX impressions, XX clicks

Issues:
- [None or list issues]

Actions:
- [Next steps]
```

---

## Expansion Readiness Checklist

### Go/No-Go for Phase 2 (Madrid)

**After 4 weeks, evaluate:**

✅ **GO Criteria:**
- [ ] Valencia pages: 25/25 indexed (100%)
- [ ] No manual actions or warnings
- [ ] Impressions: >500/week
- [ ] Clicks: >20/week
- [ ] CTR: >2%
- [ ] Average position: <30 for primary keywords
- [ ] Business inquiries: Increasing trend

❌ **NO-GO Criteria (stop and fix):**
- [ ] Indexation rate <75%
- [ ] Manual action received
- [ ] Thin content warnings
- [ ] Average position >50
- [ ] No business inquiries after 4 weeks

---

## Advanced Monitoring (Optional)

### 1. URL Parameters Tool
- Configure if using query parameters
- Not needed for current clean URL structure

### 2. Removals Tool
- Use only if need to remove content
- Temporary removal (6 months)

### 3. Links Report
- Monitor external links to Valencia pages
- Track internal linking structure
- Identify broken links

### 4. Rich Results Status
- Monitor schema markup
- Check LocalBusiness schema indexing
- Verify Service schema appearing

---

## Integration with Analytics

### Connect GSC to Google Analytics

1. **In Google Analytics:**
   - Admin → Property Settings
   - "Adjust Search Console"
   - Link to GSC property

2. **Benefits:**
   - See GSC data in GA reports
   - Correlate search traffic with conversions
   - Unified reporting

---

## Troubleshooting Common Issues

### Issue: Pages Not Indexing

**Symptoms:**
- Submitted URLs stay "Discovered - not indexed"
- Low crawl rate

**Solutions:**
1. Check robots.txt not blocking
2. Verify sitemap is accessible
3. Check page quality (thin content?)
4. Improve internal linking
5. Request indexing manually
6. Check server response time

### Issue: Thin Content Warning

**Symptoms:**
- Manual action received
- Pages marked as "Thin content"

**Solutions:**
1. Review semantic differentiation
2. Add more unique content
3. Improve FAQ variation
4. Add user-generated content
5. Request reconsideration after fixes

### Issue: Duplicate Content

**Symptoms:**
- Multiple pages with duplicate meta
- Canonicals not working

**Solutions:**
1. Review canonical tags
2. Check hreflang implementation
3. Verify URL consistency
4. Add more unique content per page

---

## GSC API Integration (Advanced)

### For Automated Monitoring

**Setup:**
1. Enable GSC API in Google Cloud Console
2. Create service account
3. Grant access to GSC property
4. Use API to pull data programmatically

**Use Cases:**
- Automated weekly reports
- Alert system for warnings
- Store historical data
- Custom dashboards

**Not required for initial rollout** - manual checks sufficient

---

## Summary: First 4 Weeks

### Week 1 Actions
- [ ] Property setup and verification
- [ ] Submit sitemap
- [ ] Request indexing: 10 Valencia URLs (Day 1-2)
- [ ] Daily coverage checks
- [ ] Monitor for immediate issues

### Week 2 Actions
- [ ] Request indexing: 15 remaining Valencia URLs
- [ ] Continue daily coverage checks
- [ ] Start performance monitoring
- [ ] Check for any warnings

### Week 3 Actions
- [ ] Verify 100% Valencia indexation
- [ ] Analyze query performance
- [ ] Start CTR optimization if needed
- [ ] Weekly performance report

### Week 4 Actions
- [ ] Full 4-week analysis
- [ ] Go/No-Go decision for Phase 2
- [ ] Document learnings
- [ ] Plan Madrid rollout if GO

---

## Contact & Support

**Google Search Console Help:**
- Help Center: https://support.google.com/webmasters
- Community: https://support.google.com/webmasters/community

**Critical Issues:**
- Use "Request Review" for manual actions
- Report bugs in GSC via feedback button
- Contact Google for account issues

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-18  
**Next Review:** Post-deployment +1 week  
**Owner:** SEO Team Lead
