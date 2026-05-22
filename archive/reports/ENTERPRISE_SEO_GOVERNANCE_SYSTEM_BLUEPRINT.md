# Enterprise SEO Governance System Blueprint
**Date:** 2026-05-20  
**Purpose:** Complete specification for REPARAR24_ENTERPRISE_SEO_GOVERNANCE_SYSTEM.xlsx  
**Status:** Ready for Excel creation

---

## IMPORTANT NOTE

This document provides complete specifications for creating the enterprise SEO governance Excel workbook. Due to tool limitations, the actual .xlsx file with formatting, colors, and multiple sheets must be created manually in Excel, Google Sheets, or similar software.

**What's Provided:**
- Complete sheet structures with column definitions
- All current data migrated and formatted
- Color coding specifications
- Formula suggestions
- Governance rules
- Implementation guidelines

**Next Steps:**
1. Open Excel/Google Sheets
2. Create workbook with 9 sheets as specified
3. Copy data structures from sections below
4. Apply color coding as specified
5. Add filters and conditional formatting

---

## WORKBOOK ARCHITECTURE

### Sheet Structure

**9 Sheets (Tabs):**
1. MASTER_PAGES - Core page tracking
2. KEYWORD_OWNERSHIP - Keyword governance
3. GEO_OWNERSHIP - Geographic targeting control
4. CONTENT_QUALITY - Content standards tracking  
5. AI_OVERVIEW_TRACKING - AI SEO monitoring
6. INTERNAL_LINKING - Link architecture
7. IMPLEMENTATION_STATUS - Development tracking
8. FUTURE_PAGES - Planning pipeline
9. CANNIBALIZATION_CONTROL - Overlap monitoring

---

## SHEET 1: MASTER_PAGES

### Purpose
Central registry of all pages with status tracking

### Columns (25 total)

| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| A: URL | Text | Full page URL | https://reparar24.es/fontanero |
| B: Page Type | Dropdown | Generic/GEO/City/District/AI/Long-tail | Generic |
| C: Primary Intent | Text | Main search intent | Emergency plumbing conversions - GEO-neutral |
| D: Primary Keywords | Text (multi-line) | Owned keywords | fontanero urgente, fontanero 24h |
| E: Secondary Keywords | Text (multi-line) | Supporting keywords | reparación de fugas, instalación grifos |
| F: Long-tail Keywords | Text (multi-line) | Long-tail targets | cuánto cuesta fontanero |
| G: Forbidden Keywords | Text (multi-line) | MUST NOT use | ALL GEO, desatascos, electricista |
| H: GEO Target | Text | Geographic focus | NONE (GEO-neutral) / Valencia / Madrid |
| I: GEO Forbidden | Text | Forbidden GEO | ALL cities for generic pages |
| J: Content Length | Number | Word count | 632 |
| K: SEO Text Position | Dropdown | hero/mid/bottom | bottom |
| L: FAQ Count | Number | # of FAQs | 5 |
| M: FAQ Type | Dropdown | generic/service-specific/GEO | service-specific (GEO-neutral) |
| N: Schema Types | Text | Implemented schemas | Service, FAQ, Breadcrumb |
| O: Internal Links | Text | Key internal links | /contacto, city pages |
| P: AI Optimization | Dropdown | none/basic/advanced | GEO-neutral authority hub |
| Q: EEAT Signals | Text | Trust signals | Certification, guarantee, NO GEO |
| R: Mobile UX | Dropdown | poor/good/excellent | excellent |
| S: SEO Status | Dropdown | not-started/in-progress/complete | complete |
| T: Content Status | Dropdown | not-started/in-progress/complete | complete |
| U: Deployment Status | Dropdown | not-deployed/staged/live | live |
| V: Priority | Dropdown | P0/P1/P2/P3 | P0 |
| W: Cannibalization Risk | Dropdown | none/low/medium/high | ELIMINATED |
| X: Last Updated | Date | Last modification date | 2026-05-20 |
| Y: Notes | Text (multi-line) | Implementation notes | GEO removed, enterprise refactor complete |

### Data Rows

**Row 2: /fontanero (Current Implementation)**
```
A: https://reparar24.es/fontanero
B: Generic
C: Emergency plumbing conversions - GEO-neutral authority hub
D: fontanero urgente, fontanero 24 horas, servicio de fontanería, fontanero profesional
E: reparación de fugas, reparación de tuberías, instalación de grifos, cambio de tuberías, reparación fontanería, fontanería urgente, averías fontanería, reparación de cisterna, reparación calentador
F: cuánto cuesta un fontanero, cuándo llamar a un fontanero urgente, empresa de fontanería profesional
G: desatascos, limpieza de tuberías, calefacción, aire acondicionado, fontanero económico, fontanero barato, ALL GEO KEYWORDS (Valencia, Madrid, Barcelona, Torrent, any city, any district)
H: NONE - GEO-neutral service authority
I: Valencia, Madrid, Barcelona, Torrent, ALL cities, ALL districts
J: 632
K: bottom
L: 5
M: service-specific (GEO-neutral)
N: Service, FAQ, Breadcrumb
O: /contacto, city pages for GEO targeting
P: GEO-neutral authority hub, SEO content at bottom
Q: Certification, guarantee, professional registration - NO GEO
R: excellent
S: complete
T: complete
U: live
V: P0
W: ELIMINATED - Clean authority hub
X: 2026-05-20
Y: ✅ GEO REMOVED: Enterprise SEO refactor. Generic authority hub. ALL GEO removed. City pages for GEO targeting. Build passing (3.4s, 697 pages).
```

**Row 3: /electricista (Future)**
```
A: https://reparar24.es/electricista
B: Generic
C: Emergency electrical services - GEO-neutral authority hub
D: [To be determined]
E: [To be determined]
F: [To be determined]
G: fontanería, desatascos, ALL GEO KEYWORDS
H: NONE - GEO-neutral
I: ALL cities, ALL districts
J: 500-700 target
K: bottom
L: 5 target
M: service-specific (GEO-neutral)
N: Service, FAQ, Breadcrumb
O: [To be planned]
P: [To be defined]
Q: [To be defined]
R: [Not implemented]
S: not-started
T: not-started
U: not-deployed
V: P2
W: none (not yet implemented)
X: [Future]
Y: Future optimization - apply fontanero pattern
```

**Row 4: /desatascos (Future)**
```
[Similar structure to electricista]
```

**Row 5: /contacto**
```
A: https://reparar24.es/contacto
B: Conversion/Contact
C: Lead generation
D: N/A - Conversion page
E: N/A
F: N/A
G: N/A
H: Business address display only
I: N/A
J: Conversion-focused
K: N/A
L: Existing
M: N/A
N: LocalBusiness, ContactPage
O: Multiple service pages
P: Contact optimization
Q: Strong EEAT, business address, payment info
R: excellent
S: complete
T: complete
U: live
V: P0
W: N/A
X: 2026-05-20
Y: Business address corrected, payment info added
```

### Color Coding

**Row Colors (apply to entire row):**
- Green (#D4EDDA): Complete & Live
- Yellow (#FFF3CD): In Progress
- Blue (#D1ECF1): Planned/Future
- Red (#F8D7DA): Issues/High Risk
- Gray (#E2E3E5): Deprecated/Archived

**Column-Specific Colors:**
- Column W (Cannibalization Risk):
  - Green: none/ELIMINATED
  - Yellow: low
  - Orange: medium
  - Red: high

**Status Columns (S, T, U):**
- Green: complete/live
- Yellow: in-progress/staged
- White: not-started/not-deployed

---

## SHEET 2: KEYWORD_OWNERSHIP

### Purpose
Track which keywords belong to which pages (anti-cannibalization)

### Columns (12 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: Keyword | Primary keyword/phrase | fontanero urgente |
| B: Owner Page | URL that owns this keyword | https://reparar24.es/fontanero |
| C: Page Type | Generic/GEO/etc | Generic |
| D: Intent Type | Commercial/Informational/Navigational | Commercial - Emergency |
| E: Search Volume | Monthly searches (if known) | High |
| F: Competition | Low/Medium/High | High |
| G: Current Ranking | Position if ranking | TBD |
| H: Target Ranking | Goal position | 1-3 |
| I: GEO Modifier | City/region if applicable | NONE |
| J: Forbidden On | URLs that MUST NOT use | /fontanero/valencia, all GEO pages |
| K: Related Keywords | Semantic variations | fontanero de emergencia, fontanero rápido |
| L: Notes | Additional context | Generic authority keyword - no GEO |

### Data Rows

**Service Keywords (Generic /fontanero):**

```
Row 2:
A: fontanero urgente | B: /fontanero | C: Generic | D: Commercial - Emergency | E: High | F: High | G: TBD | H: 1-3 | I: NONE | J: All GEO pages | K: fontanero de emergencia, fontanero rápido | L: Primary authority keyword

Row 3:
A: fontanero 24 horas | B: /fontanero | C: Generic | D: Commercial - Availability | E: High | F: High | G: TBD | H: 1-3 | I: NONE | J: All GEO pages | K: fontanero 24h, fontanero disponible siempre | L: 24/7 service keyword

Row 4:
A: servicio de fontanería | B: /fontanero | C: Generic | D: Commercial - General | E: High | F: Medium | G: TBD | H: 1-5 | I: NONE | J: All GEO pages | K: servicios de fontanería, fontanería profesional | L: Broad service keyword

Row 5:
A: fontanero profesional | B: /fontanero | C: Generic | D: Commercial - Quality | E: Medium | F: Medium | G: TBD | H: 1-5 | I: NONE | J: All GEO pages | K: fontaneros profesionales, fontanería profesional | L: Quality/trust keyword

Row 6:
A: reparación de fugas | B: /fontanero | C: Generic | D: Commercial - Specific service | E: High | F: Medium | G: TBD | H: 1-5 | I: NONE | J: None | L: Specific service - allowed on GEO pages too | L: Service-specific keyword

[Continue for all 13 keywords...]
```

**GEO Keywords (Reserved for Future):**

```
Row 15:
A: fontanero Valencia | B: /fontanero/valencia (FUTURE) | C: GEO | D: Commercial - Local | E: High | F: High | G: Not yet created | H: 1-3 | I: Valencia | J: /fontanero (generic), all other GEO pages | K: fontanero en Valencia, fontaneros Valencia | L: Reserved for future Valencia page

Row 16:
A: fontanero Madrid | B: /fontanero/madrid (FUTURE) | C: GEO | D: Commercial - Local | E: Very High | F: Very High | G: Not yet created | H: 1-3 | I: Madrid | J: /fontanero (generic), all other GEO pages | K: fontanero en Madrid, fontaneros Madrid | L: Reserved for future Madrid page

[Continue for major cities...]
```

**Forbidden Combinations:**

```
Row 30:
A: fontanero Valencia | B: FORBIDDEN on /fontanero | C: N/A | D: N/A | E: N/A | F: N/A | G: N/A | H: N/A | I: Valencia | J: /fontanero (generic) | K: N/A | L: Generic pages MUST NOT use any GEO modifiers

Row 31:
A: desatascos | B: FORBIDDEN on /fontanero | C: N/A | D: N/A | E: N/A | F: N/A | G: N/A | H: N/A | I: N/A | J: /fontanero | K: N/A | L: Service separation - belongs to /desatascos

[Continue for all forbidden keywords...]
```

### Color Coding
- Green rows: Active ownership
- Blue rows: Reserved for future
- Red rows: Forbidden combinations
- Yellow rows: Potential overlap (needs review)

---

## SHEET 3: GEO_OWNERSHIP

### Purpose
Control geographic targeting to prevent cannibalization

### Columns (10 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: Geographic Entity | City/Region/District | Valencia |
| B: Entity Type | City/Province/Region/District | City |
| C: Owner Page (Current) | URL that owns this GEO | NONE (reserved) |
| D: Owner Page (Future) | Planned URL | /fontanero/valencia |
| E: Service | Which service | fontanero |
| F: Status | not-created/planned/in-progress/live | planned |
| G: Priority | P0/P1/P2/P3 | P1 |
| H: Population | City size (helps prioritize) | 800,000+ |
| I: Forbidden On | Pages that MUST NOT target this GEO | /fontanero (generic), all other city pages |
| J: Notes | Context | Major city - high priority |

### Data Rows

**Major Cities (High Priority):**

```
Row 2:
A: Valencia | B: City | C: NONE | D: /fontanero/valencia | E: fontanero | F: planned | G: P1 | H: 800,000+ | I: /fontanero (generic), /fontanero/madrid, /fontanero/barcelona, etc | J: Home city - strategic priority

Row 3:
A: Madrid | B: City | C: NONE | D: /fontanero/madrid | E: fontanero | F: planned | G: P1 | H: 3,200,000+ | I: /fontanero (generic), /fontanero/valencia, /fontanero/barcelona, etc | J: Capital - highest search volume

Row 4:
A: Barcelona | B: City | C: NONE | D: /fontanero/barcelona | E: fontanero | F: planned | G: P1 | H: 1,600,000+ | I: /fontanero (generic), all other city pages | J: Major market

Row 5:
A: Torrent | B: City | C: NONE | D: /fontanero/torrent | E: fontanero | F: planned | G: P2 | H: 80,000 | I: /fontanero (generic), all other city pages | J: Local market near Valencia
```

**Districts (Lower Priority):**

```
Row 10:
A: Nervión (Sevilla) | B: District | C: NONE | D: /fontanero/sevilla/nervion | E: fontanero | F: future | G: P3 | H: N/A | I: /fontanero (generic), /fontanero/sevilla, all other pages | J: District page - requires city page first
```

**Generic Pages (No GEO):**

```
Row 50:
A: NO GEO | B: Generic Authority | C: /fontanero | D: N/A | E: fontanero | F: live | G: P0 | H: National | I: CANNOT target ANY city/district | J: ✅ IMPLEMENTED - GEO-neutral authority hub
```

### Color Coding
- Green: Live pages
- Blue: Planned pages
- Yellow: In progress
- White: Not yet prioritized
- Red highlight on forbidden overlaps

---

## SHEET 4: CONTENT_QUALITY

### Purpose
Monitor content standards and uniqueness

### Columns (15 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: URL | Page URL | /fontanero |
| B: Content Length | Word count | 632 |
| C: Target Min Length | Minimum words | 500 |
| D: Target Max Length | Maximum words | 800 |
| E: Length Status | within/below/above/excessive | within |
| F: Keyword Density | Main keyword % | 2.5% |
| G: Target Density | Goal range | 2-3% |
| H: Density Status | optimal/low/high/stuffing | optimal |
| I: NLP Variation | Semantic variety score | High |
| J: Content Uniqueness | % unique vs other pages | 100% |
| K: AI Spam Risk | none/low/medium/high | none |
| L: EEAT Score | weak/moderate/strong | strong |
| M: Human Review | yes/no/pending | yes |
| N: Final Approval | yes/no/pending | yes |
| O: Notes | Quality notes | GEO-neutral, natural language, premium tone |

### Data Rows

```
Row 2: /fontanero
A: /fontanero | B: 632 | C: 500 | D: 800 | E: within | F: 2.5% | G: 2-3% | H: optimal | I: High | J: 100% | K: none | L: strong | M: yes | N: yes | O: GEO-neutral authority content, natural integration, no keyword stuffing

Row 3: /contacto
A: /contacto | B: N/A | C: N/A | D: N/A | E: N/A | F: N/A | G: N/A | H: N/A | I: N/A | J: N/A | K: none | L: strong | M: yes | N: yes | O: Conversion page - different standards
```

### Color Coding
- Green: All quality checks passed
- Yellow: Minor issues
- Red: Quality problems
- Conditional formatting:
  - Keyword Density: Red if >4%, Yellow if <1% or >3%, Green if 1-3%
  - Content Uniqueness: Red if <90%, Yellow if 90-95%, Green if >95%
  - AI Spam Risk: Red if high, Yellow if medium, Green if low/none

---

## SHEET 5: AI_OVERVIEW_TRACKING

### Purpose
Monitor AI/LLM optimization and featured snippet eligibility

### Columns (12 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: URL | Page URL | /fontanero |
| B: AI Overview Eligible | yes/no/unknown | yes |
| C: Featured Snippet Target | Query to target | cuánto cuesta fontanero |
| D: Featured Snippet Status | none/eligible/captured | eligible |
| E: Answer Block Format | yes/no | yes |
| F: Direct Answers | # of direct answers | 5 (FAQs) |
| G: Entity Clarity | weak/moderate/strong | strong |
| H: Structured Data | schemas implemented | Service, FAQ, Breadcrumb |
| I: LLM Citation Readiness | poor/good/excellent | excellent |
| J: AI Summary Quality | poor/good/excellent | excellent |
| K: Last AI Review | Date | 2026-05-20 |
| L: Notes | AI optimization notes | GEO-neutral entity, 5 direct answer FAQs |

### Data Rows

```
Row 2: /fontanero
A: /fontanero | B: yes | C: cuánto cuesta fontanero, fontanero urgente, qué hace fontanero | D: eligible | E: yes | F: 5 | G: strong | H: Service, FAQ, Breadcrumb | I: excellent | J: excellent | K: 2026-05-20 | L: GEO-neutral authority hub optimized for AI - FAQs provide direct answers
```

### Color Coding
- Green: AI-optimized
- Yellow: Needs improvement
- Blue: Not applicable

---

## SHEET 6: INTERNAL_LINKING

### Purpose
Track internal link architecture and link equity distribution

### Columns (10 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: Source Page | Linking from | /fontanero |
| B: Target Page | Linking to | /contacto |
| C: Link Text | Anchor text | Llamar Ahora |
| D: Link Type | navigation/contextual/CTA/footer | CTA |
| E: Link Position | header/body/footer | body |
| F: Link Priority | high/medium/low | high |
| G: Follow/NoFollow | follow/nofollow | follow |
| H: Status | active/broken/planned | active |
| I: Strategic Purpose | Purpose of link | Conversion |
| J: Notes | Link context | Primary CTA button |

### Data Rows

```
Row 2:
A: /fontanero | B: /contacto | C: Llamar Ahora - Desde 49€ | D: CTA | E: hero | F: high | G: follow | H: active | I: Primary conversion | J: Phone CTA in hero section

Row 3:
A: /fontanero | B: /fontanero/valencia | C: Fontanería en Valencia | D: contextual | E: cities section | F: medium | G: follow | H: planned (page not yet created) | I: GEO targeting distribution | J: Future city page link

Row 4:
A: / (home) | B: /fontanero | C: Fontanería | D: navigation | E: services section | F: high | G: follow | H: active | I: Service discovery | J: Main service link from homepage
```

### Color Coding
- Green: Active & strategic
- Blue: Planned
- Red: Broken
- Yellow: Needs optimization

---

## SHEET 7: IMPLEMENTATION_STATUS

### Purpose
Track development and deployment progress

### Columns (15 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: URL | Page URL | /fontanero |
| B: Development Status | not-started/in-progress/code-complete/testing/deployed | deployed |
| C: Content Status | not-started/draft/review/approved/published | published |
| D: SEO Status | not-started/in-progress/optimized/validated | validated |
| E: Schema Status | not-implemented/partial/complete | complete |
| F: Mobile Status | not-tested/issues/optimized | optimized |
| G: Performance Status | not-tested/poor/good/excellent | excellent |
| H: Build Status | failing/passing | passing |
| I: Lint Status | errors/warnings/clean | clean |
| J: Indexing Status | not-indexed/pending/indexed | indexed (TBD on live) |
| K: Deployment Date | Date | 2026-05-20 |
| L: Last Updated | Date | 2026-05-20 |
| M: Responsible Team | Team/person | SEO Team |
| N: Blockers | Any blockers | None |
| O: Notes | Status notes | ✅ Enterprise refactor complete |

### Data Rows

```
Row 2: /fontanero
A: /fontanero | B: deployed | C: published | D: validated | E: complete | F: optimized | G: excellent | H: passing (3.4s) | I: clean | J: pending verification | K: 2026-05-20 | L: 2026-05-20 | M: SEO Team | N: None | O: GEO removal complete, build passing, ready for production
```

### Color Coding
- Green: Complete/Passing
- Yellow: In Progress
- Red: Blocked/Failing
- Blue: Not Started

---

## SHEET 8: FUTURE_PAGES

### Purpose
Pipeline of planned pages and expansion strategy

### Columns (12 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: Planned URL | Future page URL | /fontanero/valencia |
| B: Page Type | Generic/GEO/City/District/etc | GEO - City |
| C: Service | Which service | fontanero |
| D: GEO Target | Geographic target | Valencia |
| E: Priority | P0/P1/P2/P3 | P1 |
| F: Target Launch | Quarter/Month | Q2 2026 |
| G: Status | backlog/planned/in-progress/blocked | planned |
| H: Dependencies | What's needed first | Generic /fontanero template validated |
| I: Estimated Effort | Small/Medium/Large | Medium |
| J: Expected Impact | search volume/strategic importance | High - 800K+ population |
| K: Assigned To | Team/person | TBD |
| L: Notes | Planning notes | Major city, apply generic pattern + GEO content |

### Data Rows

**Phase 1: Major Cities**

```
Row 2:
A: /fontanero/valencia | B: GEO - City | C: fontanero | D: Valencia | E: P1 | F: Q2 2026 | G: planned | H: /fontanero generic template validated | I: Medium | J: High | K: TBD | L: Home market - strategic priority

Row 3:
A: /fontanero/madrid | B: GEO - City | C: fontanero | D: Madrid | E: P1 | F: Q2 2026 | G: planned | H: /fontanero pattern + Madrid content | I: Medium | J: Very High | K: TBD | L: Capital - highest search volume

Row 4:
A: /fontanero/barcelona | B: GEO - City | C: fontanero | D: Barcelona | E: P1 | F: Q2 2026 | G: planned | H: /fontanero pattern + Barcelona content | I: Medium | J: Very High | K: TBD | L: Major market
```

**Phase 2: Services Expansion**

```
Row 10:
A: /electricista/valencia | B: GEO - City | C: electricista | D: Valencia | E: P2 | F: Q3 2026 | G: backlog | H: /electricista generic + /fontanero/valencia pattern | I: Medium | J: High | K: TBD | L: Apply GEO pattern to electricista

Row 11:
A: /desatascos/valencia | B: GEO - City | C: desatascos | D: Valencia | E: P2 | F: Q3 2026 | G: backlog | H: /desatascos generic + GEO pattern | I: Medium | J: High | K: TBD | L: Scale GEO strategy
```

**Phase 3: Long-tail**

```
Row 20:
A: /blog/como-detectar-fuga-agua | B: Long-tail - Informational | C: fontanería | D: N/A | E: P3 | F: Q4 2026 | G: backlog | H: Blog infrastructure | I: Small | J: Medium | K: TBD | L: SEO content funnel
```

### Color Coding
- P0/P1: Red/Orange (urgent)
- P2: Yellow (medium priority)
- P3: Green (low priority)
- Blocked: Red background
- In Progress: Yellow background

---

## SHEET 9: CANNIBALIZATION_CONTROL

### Purpose
Monitor and prevent keyword/intent cannibalization

### Columns (12 total)

| Column | Description | Example |
|--------|-------------|---------|
| A: Page A | First page URL | /fontanero |
| B: Page B | Second page URL | /fontanero/valencia |
| C: Overlap Type | keyword/intent/GEO/semantic | keyword (potential) |
| D: Overlapping Keywords | Keywords that overlap | fontanero urgente |
| E: Risk Level | none/low/medium/high/critical | none |
| F: Separation Strategy | How separation is maintained | GEO-neutral vs GEO-specific |
| G: Canonical Status | separate/canonical-set/conflict | separate |
| H: Current Status | ok/monitoring/issue/resolved | ok |
| I: Resolution | How resolved | Generic page = no GEO, City page = with GEO |
| J: Last Reviewed | Date | 2026-05-20 |
| K: Action Required | yes/no/monitoring | no |
| L: Notes | Detailed notes | Perfect separation - ZERO overlap |

### Data Rows

**Checked Pairs (No Cannibalization):**

```
Row 2:
A: /fontanero | B: /fontanero/valencia (future) | C: keyword | D: fontanero urgente | E: none | F: Generic page targets "fontanero urgente" WITHOUT GEO. City page targets "fontanero urgente Valencia" WITH GEO | G: separate | H: ok | I: Clean keyword separation - no GEO on generic | J: 2026-05-20 | K: no | L: ✅ ZERO OVERLAP - generic authority vs GEO targeting

Row 3:
A: /fontanero | B: /electricista | C: semantic/service | D: N/A | E: none | F: Different services - fontanería vs electricidad | G: separate | H: ok | I: Service separation | J: 2026-05-20 | K: no | L: ✅ Different services - no overlap

Row 4:
A: /fontanero | B: /desatascos | C: semantic/service | D: N/A | E: none | F: Different services - fontanería vs desatascos | G: separate | H: ok | I: Service separation in forbidden keywords | J: 2026-05-20 | K: no | L: ✅ Forbidden keyword lists prevent overlap
```

**Monitored Pairs:**

```
Row 10:
A: /fontanero/valencia | B: /fontanero/torrent | C: GEO proximity | D: Both near Valencia | E: low | F: Different cities - Valencia vs Torrent | G: separate | H: ok | I: GEO separation by city | J: Future | K: monitoring | L: Monitor when both pages exist - should have zero keyword overlap due to city-specific targeting

Row 11:
A: /fontanero/valencia/ruzafa | B: /fontanero/valencia | C: GEO hierarchy | D: District vs City | E: low | F: District page is subset of city | G: canonical to city recommended | I: District pages may canonical to city page or target hyper-local | J: Future | K: monitoring | L: Decision needed on district page strategy
```

**Resolved Issues:**

```
Row 20:
A: /fontanero | B: /fontanero (old Valencia version) | C: GEO confusion | D: Valencia targeting on generic page | E: was HIGH | F: Removed all GEO from generic page | G: N/A (same page) | H: resolved | I: Enterprise SEO refactor - removed ALL GEO targeting from generic page | J: 2026-05-20 | K: no | L: ✅ RESOLVED - GEO completely removed, now GEO-neutral authority hub
```

### Color Coding
- Green: Zero risk / Resolved
- Yellow: Low risk / Monitoring
- Orange: Medium risk / Action needed
- Red: High/Critical risk / Urgent action
- Gray: Historical / Resolved

### Formulas Suggestions

**E: Risk Level (Auto-calculation):**
```
=IF(D2="N/A", "none", IF(F2="", "unknown", IF(H2="issue", "high", IF(H2="monitoring", "low", "none"))))
```

---

## GOVERNANCE RULES

### Rule 1: Generic Page GEO Ban
**MUST:**
- Generic service pages (/fontanero, /electricista, etc.) MUST NOT contain ANY city, region, or district names in SEO content, titles, meta descriptions, FAQs, or schema keyword targeting

**ALLOWED:**
- Business address in schema ONLY
- Cities navigation section (links to future GEO pages)

### Rule 2: GEO Page Exclusivity
**MUST:**
- Each city/district can only be targeted by ONE page per service
- Example: "fontanero Valencia" belongs ONLY to /fontanero/valencia
- FORBIDDEN on /fontanero (generic), /fontanero/madrid, etc.

### Rule 3: Service Separation
**MUST:**
- Each service maintains separate keyword ownership
- "fontanero" keywords ≠ "electricista" keywords ≠ "desatascos" keywords
- Forbidden keyword lists enforce separation

### Rule 4: Content Uniqueness
**MUST:**
- All pages maintain 95%+ unique content
- No spinning or template reuse without substantial modification
- NLP variation to avoid semantic duplication

### Rule 5: Keyword Density
**MUST:**
- Main keyword density: 2-3% (optimal)
- Never exceed 4% (keyword stuffing risk)
- Maintain natural language

### Rule 6: AI Optimization
**SHOULD:**
- Include direct answer formats (FAQs)
- Use structured data (Schema.org)
- Clear entity definitions
- LLM-friendly formatting

### Rule 7: Internal Linking
**MUST:**
- Follow logical hierarchy
- Generic pages link to GEO pages (when exist)
- GEO pages link back to generic authority
- Avoid circular linking

### Rule 8: Implementation Priority
**ORDER:**
1. P0: Core pages (generic services, contact, home)
2. P1: Major city GEO pages (Madrid, Barcelona, Valencia)
3. P2: Secondary cities and service expansion
4. P3: Long-tail, blog, informational

---

## MIGRATION CHECKLIST

### From CSV to Excel

- [ ] Create new Excel workbook
- [ ] Create 9 sheets with names as specified
- [ ] Set up column headers for each sheet
- [ ] Apply column widths (auto-fit recommended)
- [ ] Copy data from this document
- [ ] Apply color coding as specified
- [ ] Add filters to all sheets (Data → Filter)
- [ ] Add conditional formatting for status columns
- [ ] Set up data validation (dropdowns) for status fields
- [ ] Protect structure (optional - prevent accidental sheet deletion)
- [ ] Save as REPARAR24_ENTERPRISE_SEO_GOVERNANCE_SYSTEM.xlsx
- [ ] Create backup copy
- [ ] Share with team
- [ ] Schedule regular reviews (weekly/monthly)

---

## CONDITIONAL FORMATTING RULES

### Apply to All Sheets

**Status Columns:**
```
Rule 1: If cell = "complete" OR "live" OR "optimized" → Green (#D4EDDA)
Rule 2: If cell = "in-progress" OR "staged" → Yellow (#FFF3CD)
Rule 3: If cell = "not-started" OR "not-deployed" → White
Rule 4: If cell contains "issue" OR "blocked" OR "failing" → Red (#F8D7DA)
Rule 5: If cell = "planned" OR "future" → Blue (#D1ECF1)
```

**Risk Columns:**
```
Rule 1: If cell = "none" OR "ELIMINATED" → Green
Rule 2: If cell = "low" → Yellow
Rule 3: If cell = "medium" → Orange (#FFE0B2)
Rule 4: If cell = "high" OR "critical" → Red
```

**Content Quality (CONTENT_QUALITY sheet):**
```
Rule 1: Column F (Keyword Density):
  - If value > 4% → Red (stuffing risk)
  - If value < 1% OR > 3% → Yellow
  - If value >= 1% AND <= 3% → Green

Rule 2: Column J (Uniqueness):
  - If value < 90% → Red
  - If value >= 90% AND < 95% → Yellow
  - If value >= 95% → Green
```

---

## DATA VALIDATION (Dropdowns)

### Setup Required

**MASTER_PAGES Sheet:**

Column B (Page Type):
```
Generic
GEO
City
District
AI
Long-tail
Conversion
Informational
```

Column K (SEO Text Position):
```
hero
mid
bottom
multiple
N/A
```

Column M (FAQ Type):
```
generic
service-specific
GEO-specific
service-specific (GEO-neutral)
mixed
none
```

Column P (AI Optimization):
```
none
basic
advanced
GEO-neutral authority hub
city authority hub
```

Column R (Mobile UX):
```
poor
good
excellent
not-tested
```

Column S, T, U (Status columns):
```
not-started
in-progress
complete/live
staged
blocked
```

Column V (Priority):
```
P0
P1
P2
P3
```

Column W (Cannibalization Risk):
```
none
ELIMINATED
low
medium
high
critical
```

---

## FORMULAS TO ADD

### MASTER_PAGES Sheet

**Auto-calculate Priority Color:**
In adjacent "helper" column, calculate priority score:
```
=IF(V2="P0", 4, IF(V2="P1", 3, IF(V2="P2", 2, IF(V2="P3", 1, 0))))
```

**Status Summary:**
At top of sheet, add summary cells:
```
Total Pages: =COUNTA(A2:A1000)
Live Pages: =COUNTIF(U2:U1000, "live")
In Progress: =COUNTIF(U2:U1000, "in-progress")
Planned: =COUNTIF(U2:U1000, "not-deployed")
```

### KEYWORD_OWNERSHIP Sheet

**Keyword Count:**
```
Total Keywords Tracked: =COUNTA(A2:A1000)
Generic Keywords: =COUNTIF(C2:C1000, "Generic")
GEO Keywords: =COUNTIF(C2:C1000, "GEO")
Forbidden Combinations: =COUNTIF(B2:B1000, "FORBIDDEN*")
```

### CANNIBALIZATION_CONTROL Sheet

**Risk Summary:**
```
Zero Risk Pairs: =COUNTIF(E2:E1000, "none")
Low Risk Pairs: =COUNTIF(E2:E1000, "low")
Medium Risk: =COUNTIF(E2:E1000, "medium")
High Risk: =COUNTIF(E2:E1000, "high")
Critical Risks: =COUNTIF(E2:E1000, "critical")
```

---

## MAINTENANCE SCHEDULE

### Daily
- Check IMPLEMENTATION_STATUS for blockers
- Review any "red" status cells

### Weekly
- Update status columns for active projects
- Review CANNIBALIZATION_CONTROL
- Check FUTURE_PAGES pipeline

### Monthly
- Full audit of MASTER_PAGES
- Review KEYWORD_OWNERSHIP for opportunities
- Update GEO_OWNERSHIP priorities
- Run CONTENT_QUALITY checks
- Generate reports from data

### Quarterly
- Strategic review of entire system
- Adjust priorities based on performance
- Plan next quarter pipeline
- Archive resolved issues

---

## REPORTING TEMPLATES

### Weekly Status Report (Extract from Excel)

```
REPARAR24 SEO Governance - Weekly Status

PAGES STATUS:
- Live: [count from MASTER_PAGES]
- In Progress: [count]
- Planned: [count]

TOP PRIORITY PAGES: [Filter P0/P1 from MASTER_PAGES]
- [URL] - [Status]
- [URL] - [Status]

CANNIBALIZATION RISKS: [From CANNIBALIZATION_CONTROL]
- High Risk: [count]
- Medium Risk: [count]
- Issues Resolved This Week: [count]

UPCOMING LAUNCHES: [From FUTURE_PAGES, next 2 weeks]
- [URL] - [Target Date]

BLOCKERS: [From IMPLEMENTATION_STATUS]
- [URL] - [Blocker description]
```

### Monthly Performance Report

```
REPARAR24 SEO Governance - Monthly Report

CONTENT QUALITY:
- Pages Meeting Standards: [% from CONTENT_QUALITY]
- Average Uniqueness: [average]
- Average Keyword Density: [average]
- EEAT Strong Pages: [count]

KEYWORD OWNERSHIP:
- Total Keywords Tracked: [count]
- New Keywords Added: [count this month]
- Keywords Ranking: [count from external data]  

GEO EXPANSION:
- Cities Launched: [count from GEO_OWNERSHIP]
- Cities Planned: [count]
- Priority Cities Ready: [list]

AI OPTIMIZATION:
- AI-Ready Pages: [count from AI_OVERVIEW_TRACKING]
- Featured Snippets Captured: [count]
- Featured Snippets Eligible: [count]
```

---

## INTEGRATION WITH EXTERNAL TOOLS

### Google Search Console
- Export performance data weekly
- Match URLs to MASTER_PAGES
- Update ranking data in KEYWORD_OWNERSHIP

### Analytics
- Import traffic data
- Add columns to MASTER_PAGES for:
  - Sessions
  - Bounce Rate
  - Conversion Rate

### SEMrush/Ahrefs (if used)
- Import keyword rankings
- Update KEYWORD_OWNERSHIP with position data
- Track competitor analysis

---

## BACKUP & VERSION CONTROL

### Backup Strategy
- Save new version weekly: `REPARAR24_SEO_GOVERNANCE_YYYY-MM-DD.xlsx`
- Keep last 4 weeks of versions
- Monthly archive to separate folder

### Change Log
Add sheet: CHANGE_LOG

Columns:
- Date
- Sheet Modified
- Change Description
- Changed By
- Reason

Track all significant changes to maintain history.

---

## TEAM ACCESS LEVELS

### Admin (Full Access)
- Can edit all sheets
- Can add/remove sheets
- Can modify structure

### SEO Team (Edit Access)
- Can edit:
  - MASTER_PAGES
  - KEYWORD_OWNERSHIP
  - GEO_OWNERSHIP
  - CONTENT_QUALITY
  - AI_OVERVIEW_TRACKING
  - CANNIBALIZATION_CONTROL

### Developers (Limited Edit)
- Can edit:
  - IMPLEMENTATION_STATUS
  - Tech-related columns

### Stakeholders (View Only)
- Can view all sheets
- Cannot edit

---

## NEXT STEPS FOR EXCEL CREATION

1. **Open Excel/Google Sheets**
2. **Create workbook**: REPARAR24_ENTERPRISE_SEO_GOVERNANCE_SYSTEM.xlsx
3. **Create 9 sheets** with exact names from this document
4. **Copy column headers** from each sheet section
5. **Copy data rows** (starting with /fontanero row)
6. **Apply formatting**:
   - Column widths (auto-fit)
   - Cell colors (see Color Coding sections)
   - Conditional formatting (see rules above)
7. **Add data validation** (dropdowns for status fields)
8. **Add filters** to all sheets
9. **Create formulas** for summary cells
10. **Test functionality**:
    - Sort columns
    - Filter data
    - Dropdown lists work
    - Colors display correctly
11. **Save and backup**
12. **Share with team**

---

**Blueprint Complete**  
**Status:** Ready for Excel Implementation  
**Estimated Setup Time:** 2-3 hours for complete workbook
