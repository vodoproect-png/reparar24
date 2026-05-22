# SEO Governance - Compact Reference
**Last Updated:** 2026-05-22  
**Purpose:** Single source of truth for district SEO refinement tasks  
**Token Optimization:** Read this file FIRST, avoid scanning old reports

---

## 1. PROJECT ARCHITECTURE

### CANONICAL SPANISH URL POLICY ⚠️ CRITICAL

**Spanish is the DEFAULT LOCALE and uses ROOT-LEVEL URLs without prefix.**

**✅ PUBLIC CANONICAL URLs (what users see):**
```
/                           (Spanish homepage)
/fontanero                  (Spanish service page)
/electricista/madrid        (Spanish city page)
/electricista/madrid/centro (Spanish district page)
/contacto                   (Spanish contact page)
```

**❌ FORBIDDEN in public examples:**
```
/es                         (redirects to /)
/es/fontanero               (redirects to /fontanero)
/es/electricista/madrid     (redirects to /electricista/madrid)
```

**⚙️ INTERNAL IMPLEMENTATION (behind the scenes only):**
- Middleware rewrites `/` → `/es/` internally
- App Router serves content from `/es/*` paths
- Users NEVER see `/es/` in browser
- `/es/*` requests redirect 301 to `/*`

**📋 IMPLEMENTATION RULES:**

1. **Reports MUST use canonical URLs:**
   ```
   ✅ CORRECT: /electricista/madrid
   ❌ WRONG:   /es/electricista/madrid
   ```

2. **Sitemap MUST use canonical URLs:**
   ```
   ✅ CORRECT: <loc>https://reparar24.es/electricista/madrid</loc>
   ❌ WRONG:   <loc>https://reparar24.es/es/electricista/madrid</loc>
   ```

3. **Internal linking MUST use canonical URLs:**
   ```tsx
   ✅ CORRECT: <Link href="/electricista/madrid">
   ❌ WRONG:   <Link href="/es/electricista/madrid">
   ```

4. **Metadata/SEO MUST reference canonical URLs:**
   ```tsx
   ✅ CORRECT: canonical: 'https://reparar24.es/electricista/madrid'
   ❌ WRONG:   canonical: 'https://reparar24.es/es/electricista/madrid'
   ```

5. **English/Russian URLs use prefixes normally:**
   ```
   ✅ /en/electrician/madrid
   ✅ /ru/elektrik/madrid
   ```

**🔍 VALIDATION CHECKLIST:**

Before every report/implementation:
- [ ] All public URL examples use root-level paths (no `/es/`)
- [ ] Canonical URLs in metadata are correct
- [ ] Internal links use root-level paths for Spanish
- [ ] `/es/*` only mentioned as implementation detail
- [ ] English `/en/*` and Russian `/ru/*` correctly prefixed

**⚠️ CONSEQUENCES OF VIOLATION:**
- SEO confusion (duplicate URL patterns)
- Governance drift
- Future implementation mistakes
- 301 redirect chain issues
- Incorrect external linking

### Routing Source of Truth
- **File:** `data/cities.ts`
- **Rule:** DO NOT MODIFY unless explicit GEO expansion approved
- **Current State:** 696 pages total (3 locales × 18 services × ~13 cities + districts)
- **District SEO:** Enhancement layer ONLY, not routing layer

### Page Count Baseline
```
✅ Expected: 696 pages
❌ If changed: Requires explicit approval
✓ Validation: npm run build must show 696
```

---

## 2. ALLOWED/FORBIDDEN FILES

### ✅ ALLOWED BY DEFAULT
```
data/district-seo-content.ts  (primary SEO content file)
```

### ❌ FORBIDDEN UNLESS EXPLICIT APPROVAL
```
data/cities.ts                (routing source of truth)
data/services.ts              (service definitions)
data/faqs.ts                  (FAQ database)
middleware.ts                 (routing logic)
app/[locale]/[serviceSlug]/[citySlug]/[districtSlug]/page.tsx  (template)
lib/routing/*                 (all routing helpers)
```

**Violation = Task Rejection**

---

## 3. SERVICE SEMANTIC OWNERSHIP

### Fontanero (Plumber)
**Owns:**
- plumbing repairs, leaks, water pipes, water pressure
- faucets, sanitary installations, valves
- bathroom/kitchen plumbing
- water heaters (non-heating aspect)

**Cannot use:**
- electrical terms, heating terms, drainage blockage terms

### Electricista (Electrician)
**Owns:**
- electrical panels, wiring, lighting, sockets, circuits
- EV chargers, electrical certificates, power issues
- switchboards, circuit breakers

**Cannot use:**
- plumbing terms, heating terms, cooling terms

### Desatascos (Drain Unblocking)
**Owns:**
- blockages, drains, sewer systems
- colectores, bajantes bloqueadas
- CCTV inspection, pressure cleaning
- rooter service

**Cannot use:**
- plumbing installation terms, electrical terms, HVAC terms

### Aire Acondicionado (Air Conditioning)
**Owns:**
- cooling, refrigeration, split systems
- inverter cooling, airflow, filters
- dehumidification, summer comfort
- A/C installation and maintenance

**Cannot use:**
- heating terms, winter terms, boiler terms

### Calefacción (Heating)
**Owns:**
- winter heating, radiators, heating boilers
- central heating, radiant floor
- heating thermostats, winter comfort
- combustion systems

**Cannot use:**
- cooling terms, summer terms, A/C terms

---

## 4. ANTI-CANNIBALIZATION RULES

### Zero Semantic Leakage
```
❌ NEVER cross-pollinate service terms
❌ NEVER duplicate metadata across services
❌ NEVER copy/paste FAQs between services
✅ ALWAYS maintain service-specific intent
✅ ALWAYS use unique operational framing per district
```

### District Uniqueness
```
Each district must have:
✅ Unique operational context
✅ District-specific problem framing
✅ Local geographic references
✅ Distinct value proposition

Avoid:
❌ Copy-paste generic text
❌ "Also serves..." keyword stuffing
❌ Doorway page patterns
❌ Duplicate meta descriptions
```

---

## 5. CONTENT RULES

### Content Strategy
```
✅ REPLACE weak content (do not append)
✅ Use district-specific operational realism
✅ Write natural, conversational Spanish
✅ Optimize for AI Overviews + voice search
✅ Focus on user intent, not keyword density

❌ NO keyword stuffing
❌ NO doorway-style pages
❌ NO thin content
❌ NO duplicate SEO blocks
```

### AI Overviews Optimization
```
✅ Answer-first structure
✅ Conversational tone
✅ Featured snippet format
✅ Natural question answering
✅ Local expertise signals
```

### Spanish Language Quality
```
✅ Native Spanish phrasing
✅ Spanish-specific idioms
✅ Local Valencia terminology
✅ Formal "usted" for professional tone
✅ Active voice, clear CTAs
```

---

## 6. VALIDATION RULES

### Every Task Must Include

**1. Build Validation**
```bash
npm run build
```
**Expected Output:**
- ✅ Compiled successfully
- ✅ 696/696 pages generated
- ✅ 0 TypeScript errors
- ✅ Only pre-existing warnings OK

**2. File Integrity Check**
```
✅ data/cities.ts unchanged (git diff)
✅ No new districts added
✅ No routing changes
✅ Page count stable at 696
```

**3. Final Report**
- Create `[TASK_NAME]_REPORT.md`
- Document changes made
- Include build output
- Confirm validation passed

---

## 7. TOKEN-SAVING INSTRUCTIONS

### For Future AI Tasks

**ALWAYS DO FIRST:**
```
1. Read SEO_GOVERNANCE_COMPACT.md (this file)
2. Read data/district-seo-content.ts (if SEO task)
3. Read specific file user mentions
```

**DO NOT READ (unless explicitly required):**
```
❌ Old execution reports (*_EXECUTION_REPORT.md)
❌ Historical refinement reports
❌ Archived implementation docs
❌ Full ENTERPRISE_* blueprints
```

**Only scan old reports if:**
- User explicitly requests
- Debugging specific historical issue
- Cross-referencing previous decision

**Token Budget Optimization:**
- Focus on CURRENT state, not history
- Read only files being modified
- Use this compact file as complete reference
- Historical context available if needed, but not default

---

## 8. CURRENT STATE SNAPSHOT

### Services
```
Fontanero, Electricista, Desatascos, 
Aire Acondicionado, Calefacción
```

### Cities (Major)
```
Madrid, Barcelona, Valencia, Sevilla, 
Zaragoza, Málaga, Murcia, etc.
```

### Districts (Per Service/City)
```
Madrid: Centro, Salamanca, Chamberí, Retiro, etc.
Valencia: Ciutat Vella, Eixample, Poblats Marítims, etc.
Barcelona: Eixample, Gràcia, Sarrià-Sant Gervasi, etc.
```

### Content Files
```
data/district-seo-content.ts  (main SEO content)
data/cities.ts                (routing, DO NOT EDIT)
data/services.ts              (service definitions)
data/faqs.ts                  (FAQ database)
```

---

## 9. COMMON TASKS QUICK REFERENCE

### Task: Refine District SEO for Service X
```
1. Read SEO_GOVERNANCE_COMPACT.md ✓
2. Open data/district-seo-content.ts
3. Find service section
4. Update ONLY that service's districts
5. Maintain semantic ownership rules
6. Run npm run build
7. Confirm 696 pages
8. Create report
```

### Task: Add New District Content
```
1. Verify district exists in data/cities.ts
2. If not exists: STOP, need approval
3. If exists: Add to district-seo-content.ts only
4. Follow uniqueness rules
5. Validate build (696 pages)
```

### Task: Fix Semantic Leakage
```
1. Identify which service owns the term
2. Remove term from other services
3. Replace with service-appropriate synonym
4. Validate no metadata duplication
5. Build + validate
```

---

## 10. RED FLAGS - STOP IMMEDIATELY

**If you see yourself doing any of these, STOP:**

```
❌ Editing data/cities.ts
❌ Adding new cities/districts
❌ Changing routing logic
❌ Modifying page templates
❌ Page count ≠ 696
❌ Cross-service term pollution
❌ Copy-pasting between services
❌ Creating doorway pages
❌ Keyword stuffing
❌ Ignoring build errors
```

**Instead:**
- Ask user for clarification
- Reference this governance file
- Explain the constraint
- Suggest alternative approach

---

## 11. SUCCESS CRITERIA

### Task is Complete When:
```
✅ npm run build passes
✅ 696 pages confirmed
✅ 0 new TypeScript errors
✅ data/cities.ts unchanged
✅ Semantic ownership respected
✅ No content duplication
✅ Report created
✅ Changes documented
```

---

## 12. APPROVAL REQUIREMENTS

### These Actions Need Explicit User Approval:
```
- Adding new cities
- Adding new districts
- Modifying routing files
- Changing page count
- Cross-service term usage
- Template modifications
- Breaking changes
```

### These Actions Allowed Without Approval:
```
- Updating district-seo-content.ts
- Improving existing content
- Fixing semantic leakage
- Enhancing metadata
- Optimizing for AI Overviews
- Spanish language improvements
```

---

## APPENDIX: File Modification Matrix

| File | Modify? | Approval Needed? | Notes |
|------|---------|------------------|-------|
| `data/district-seo-content.ts` | ✅ Yes | ❌ No | Primary SEO file |
| `data/cities.ts` | ❌ No | ✅ Yes | Routing source |
| `data/services.ts` | ❌ No | ✅ Yes | Service defs |
| `data/faqs.ts` | ❌ No | ✅ Yes | FAQ database |
| `middleware.ts` | ❌ No | ✅ Yes | Routing logic |
| `app/[locale]/[serviceSlug]/[citySlug]/[districtSlug]/page.tsx` | ❌ No | ✅ Yes | Template |
| `lib/seo/*.ts` | ⚠️ Maybe | ✅ Yes | SEO utilities |
| `components/seo/*.tsx` | ⚠️ Maybe | ✅ Yes | SEO components |

---

**END OF GOVERNANCE DOCUMENT**

**Remember:** This file contains ALL rules needed for district SEO tasks.  
**Do not** read historical reports unless specifically debugging a past issue.  
**Token efficiency:** Read this once, apply rules throughout task.
