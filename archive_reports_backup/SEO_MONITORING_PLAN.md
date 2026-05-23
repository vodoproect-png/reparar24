# SEO Monitoring Plan - Valencia Rollout

**Project:** Reparar24  
**Primary Market:** Valencia  
**Strategy:** Valencia-First Controlled Rollout  
**Duration:** 4 weeks initial, ongoing  
**Date:** 2026-05-18

---

## Overview

This plan defines SEO monitoring activities for the Valencia-first rollout of 25 district pages. Success validates the semantic differentiation system and determines Phase 2 (Madrid) readiness.

---

## Key Performance Indicators (KPIs)

### Primary SEO Metrics

| Metric | Week 1 Target | Week 4 Target | Tool |
|--------|--------------|--------------|------|
| **Indexed Pages** | 15/25 (60%) | 25/25 (100%) | GSC |
| **Impressions/week** | >50 | >500 | GSC |
| **Clicks/week** | >2 | >20 | GSC |
| **CTR** | >1% | >3% | GSC |
| **Avg Position** | <80 | <30 | GSC |
| **Crawl Requests/day** | >5 | >20 | GSC |

### Secondary Metrics

- **Top Valencia queries ranking** (position tracking)
- **District-specific query impressions**
- **Zero manual actions** (critical)
- **Core Web Vitals: Good** (>75%)
- **Mobile usability: Pass** (100%)

---

## Weekly Monitoring Schedule

### Monday: Coverage & Performance Review

**Google Search Console:**
1. Coverage Report
   - Total indexed: X/25
   - Excluded pages: Investigate
   - Errors: Should be 0
   
2. Performance Report
   - Last 7 days vs previous 7 days
   - Total impressions, clicks, CTR, position
   - Top queries (Valencia-specific)
   - Top pages (district pages)

3. Manual Actions Check
   - Status: Should be "No issues detected"
   - Security issues: Should be clean

**Actions if Issues:**
- Indexation <60%: Request manual indexing
- Manual action: STOP rollout, fix issue
- Errors: Debug and fix immediately

---

### Wednesday: Query & District Performance

**Query Analysis:**
- Track top 20 Valencia queries
- Monitor position changes
- Identify new ranking queries
- Check query intent match

**District Performance:**
```
Top Performing Districts (Week X):
1. [district] - XXX impressions, XX clicks
2. [district] - XXX impressions, XX clicks
3. [district] - XXX impressions, XX clicks

Bottom Performing:<
1. [district] - X impressions, X clicks
   → Action: Review content quality
```

**Target Queries to Monitor:**
- "fontanero valencia" + variations
- "electricista valencia" + variations
- "desatascos valencia" + variations
- "fontanero [district] valencia"
- "[service] urgente valencia"

---

### Friday: Technical & Content Health

**Technical Checks:**
1. **Page Experience**
   - Core Web Vitals status
   - Mobile usability
   - HTTPS status
   - No intrusive interstitials

2. **Crawl Stats**
   - Response time: Target <500ms
   - 200 responses: Target >95%
   - Crawl budget utilization

3. **Sitemaps**
   - Status: Success
   - Discovered URLs: ~2,079
   - No errors

**Content Quality Spot Check:**
- Randomly select 2-3 Valencia pages
- Verify semantic uniqueness live
- Check FAQ variation quality
- Confirm no template patterns visible

---

## Warning Threshold System

### 🟢 Green (Proceed)
- Indexed: >75%
- No manual actions
- Impressions growing
- Business inquiries positive

### 🟡 Yellow (Monitor Closely)
- Indexed: 50-75%
- Impressions flat
- CTR <1.5%
- Position >50

### 🔴 Red (Stop & Fix)
- Indexed: <50% after 2 weeks
- Manual action received
- Thin content warning
- Impressions declining
- No business inquiries after 3 weeks

---

## Rollout Decision Matrix

### After Week 4: Go/No-Go for Madrid Expansion

✅ **GO Criteria (All must be met):**
- [ ] Valencia indexation: 25/25 (100%)
- [ ] No manual actions or warnings
- [ ] Impressions: >500/week
- [ ] Clicks: >20/week
- [ ] CTR: >2%
- [ ] Avg position: <30 for primary keywords
- [ ] Business inquiries: Increasing trend
- [ ] Core Web Vitals: Good
- [ ] Content quality: No issues identified

❌ **NO-GO Criteria (Any triggers stop):**
- Manual action received
- Thin content warning
- Indexation <75% after 4 weeks
- Average position >50
- Zero business conversions
- Negative customer feedback on content

🟡 **PAUSE & REFINE (Requires investigation):**
- Indexation 75-95%
- Mixed performance across districts
- Some content quality concerns
- CTR <2%

---

## Competitive Monitoring

### Benchmark Competitors

**Track monthly:**
1. Top 3 Valencia plumbing competitors
2. Top 3 Valencia electrician competitors
3. District-specific service providers

**Monitor:**
- Their ranking for target keywords
- Content strategy changes
- New pages launched
- Backlink profiles

**Tool:** Manual SERP checks + SEMrush/Ahrefs (if available)

---

## Cannibalization Detection

### Internal Competition Check

**Monitor for:**
- Multiple Reparar24 pages ranking for same query
- District pages competing with city pages
- Service pages competing with district pages

**Analysis:**
```
Query: "fontanero valencia ciudad-vella"
- Expected: /fontanero/valencia/ciutat-vella (rank 1)
- Also ranking: /fontanero/valencia (rank 5) ← Acceptable
- Also ranking: /ciutat-vella/fontanero ← Problem if exists
```

**Action if cannibalization detected:**
- Review internal linking
- Adjust canonical tags if needed
- Improve semantic differentiation

---

## Content Performance Tracking

### Semantic Differentiation Validation

**Monthly Deep Dive:**
1. **Select 5 random Valencia pages**
2. **Compare content:**
   - Intro uniqueness
   - FAQ variation
   - Problem section differentiation
   - Local expertise signals

3. **User Engagement:**
   - Bounce rate per page
   - Time on page
   - Scroll depth (if tracked)

4. **SERP Analysis:**
   - Featured snippets captured?
   - FAQ schema showing?
   - LocalBusiness schema showing?

---

## Reporting Templates

### Weekly Report (Internal)

```markdown
# Valencia SEO Report - Week X

## Coverage
- Indexed: XX/25 (XX%)
- Change: +X from last week

## Performance
- Impressions: XXX (+XX% vs last week)
- Clicks: XX (+XX% vs last week)
- CTR: X.X% (target: >2%)
- Avg Position: XX (target: <30)

## Top 5 Queries
1. [query] - XXX imp, XX clicks, pos XX
2. [query] - XXX imp, XX clicks, pos XX
3. [query] - XXX imp, XX clicks, pos XX
4. [query] - XXX imp, XX clicks, pos XX
5. [query] - XXX imp, XX clicks, pos XX

## Issues & Actions
- [None or list issues]
- [Planned actions]

## Recommendation
🟢 Proceed / 🟡 Monitor / 🔴 Stop
```

### Month-End Report (Stakeholder)

```markdown
# Valencia Rollout - Month 1 Summary

## Executive Summary
[2-3 sentences on overall performance]

## Key Achievements
- XX% of Valencia pages indexed
- XXX total impressions
- XX clicks generating XX business leads

## Performance vs Targets
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Indexed | 100% | XX% | ✅/🟡/🔴 |
| Impressions | >500 | XXX | ✅/🟡/🔴 |
| Clicks | >20 | XX | ✅/🟡/🔴 |
| CTR | >2% | X.X% | ✅/🟡/🔴 |

## Insights
- [Key learnings]
- [District performance patterns]
- [Query opportunities]

## Next Steps
- [Immediate actions]
- [Phase 2 decision]
```

---

## Tool Stack

### Required Tools
1. **Google Search Console** (primary)
2. **Google Analytics 4** (conversion tracking)
3. **Spreadsheet** (tracking & charts)

### Optional Tools
1. **SEMrush/Ahrefs** (competitor analysis)
2. **Screaming Frog** (technical audits)
3. **Google Data Studio** (automated dashboards)
4. **Rank Tracker** (position monitoring)

---

## Escalation Protocol

### Issue Severity Levels

**P0 - Critical (Act immediately):**
- Manual action received
- Security issue
- Site down/unreachable
- Mass deindexation

**P1 - High (Act within 24h):**
- Indexation drops >25%
- Thin content warning
- Major ranking drops (>20 positions)

**P2 - Medium (Act within 1 week):**
- Single page indexation issues
- Minor ranking fluctuations
- Technical warnings

**P3 - Low (Monitor):**
- Individual query position changes
- Slow indexation (but progressing)

---

## Success Celebration Criteria

### Week 4 Success Indicators:
- ✅ 25/25 Valencia pages indexed
- ✅ >500 impressions/week
- ✅ >20 clicks/week
- ✅ >5 business inquiries from organic
- ✅ Zero warnings or issues
- ✅ Avg position <30 for primary keywords

**If achieved:** 🎉 Plan Madrid rollout (Phase 2)

---

## Appendix: Query List Template

**Valencia Target Queries (Track Weekly):**

_Primary Keywords:_
- fontanero valencia
- electricista valencia
- desatascos valencia
- calefaccion valencia
- aire acondicionado valencia

_District Keywords (25 combinations):_
- fontanero ciutat vella valencia
- fontanero leixample valencia
- fontanero extramurs valencia
- fontanero campanar valencia
- fontanero poblats maritims valencia
- [repeat for electricista, desatascos, calefaccion, aire-acondicionado]

_Long-tail Keywords:_
- fontanero urgente valencia
- fontanero 24 horas valencia
- precio fontanero valencia
- mejor fontanero valencia
- fontanero economico valencia

---

**Document Owner:** SEO Manager  
**Review Frequency:** Weekly (Weeks 1-4), Biweekly (Month 2+)  
**Last Updated:** 2026-05-18  
**Version:** 1.0
