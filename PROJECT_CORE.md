# REPARAR24 - PROJECT CORE

**Last Updated:** June 5, 2026  
**Status:** PRODUCTION-READY (Spanish-only)  
**Build:** 241 pages, 0 errors  
**Purpose:** Essential project context for AI agents

---

## BUSINESS GOAL

Spanish home repair marketplace connecting users with professional services (plumbing, electrical, HVAC, drainage, heating, AC) across Spain. Lead generation revenue model.

---

## TECH STACK

**Framework:**
- Next.js 15 (App Router)
- React 18
- TypeScript (strict mode)

**Styling:**
- TailwindCSS 3.x (mobile-first)

**SEO:**
- JSON-LD schemas
- Dynamic sitemap
- Hreflang implementation
- Meta tag optimization

**Analytics:**
- Google Tag Manager (GTM)
- Google Analytics 4 (GA4)
- Cookie consent (GDPR)

**Build:**
- Static Site Generation (SSG)
- 241 pre-rendered pages
- ~5-7 second build time

---

## PRODUCTION STATUS

**Current State:**
- **Pages:** 241 (Spanish-only)
- **Architecture:** Spanish canonical URLs (root-level, no `/es/` prefix)
- **Services:** 6 (Fontanero, Electricista, Desatascos, Aire Acondicionado, Calefacción, Limpieza de Tuberías)
- **Cities:** 6 major cities
- **Districts:** 180 district pages
- **Legal Pages:** 3 (/privacidad, /terminos, /cookies)
- **Multilingual:** TEMPORARILY DISABLED (EN/RU redirect to Spanish)

**Canonical URLs:**
```
✅ CORRECT:  /fontanero
✅ CORRECT:  /fontanero/madrid
✅ CORRECT:  /fontanero/madrid/centro
✅ CORRECT:  /privacidad

❌ FORBIDDEN: /es/fontanero (redirects to /fontanero)
❌ FORBIDDEN: /en/fontanero (redirects to /fontanero)
❌ FORBIDDEN: /ru/fontanero (redirects to /fontanero)
```

---

## CRITICAL PROJECT RULES

### Spanish-Only Canonical URLs
- **Public URLs:** Root-level only (no locale prefix)
- **Internal implementation:** `app/[locale]/` exists for technical reasons
- **Middleware:** Rewrites root URLs to `/es/*` internally
- **Users see:** `/fontanero` NOT `/es/fontanero`

### Build Validation
```bash
npm run build
```
**Expected:** 241 pages, 0 errors

### Page Count Lock
- **Current:** 241 pages
- **Rule:** CANNOT change without explicit approval

### File Modification Rules

**✅ ALLOWED:**
- `data/district-seo-content.ts` - District SEO content
- `data/city-seo-content.ts` - City SEO content
- Existing page content improvements

**❌ FORBIDDEN WITHOUT APPROVAL:**
- `data/cities.ts` - Routing source of truth
- `middleware.ts` - Routing logic
- Page templates
- Adding new cities/districts

### SEO Governance
1. **One keyword = One page** (per service)
2. **95%+ unique content** required
3. **No keyword cannibalization**
4. **Service semantic ownership** must be respected
5. **Root-level Spanish URLs** in all internal links

### Agent Architecture Rules

**P0 Critical:**
- **ONE PAGE = ONE SEO SECTION:** Never add new SEO blocks, always REPLACE
- **COMMERCIAL-FIRST:** Conversion priority > SEO volume
- **DESIGN CONSISTENCY:** Use existing global components only
- When SEO and UX conflict: Conversion > UX > Trust > SEO

**Role Separation:**
- **SEO_STRATEGIST:** Recommend only, never implement
- **COMMERCIAL_UX_AGENT:** Strategy only, never implement
- **IMPLEMENTATION_AGENT:** Execute only (REPLACE not ADD)
- **QA_AUDITOR:** Audit only, never fix
- **DEPLOY_MANAGER:** Deploy only, never code
- **PROJECT_ORCHESTRATOR:** Route tasks, resolve conflicts

---

## WORKFLOW RULES

### Every Task Must:
1. ✅ Read `PROJECT_CORE.md` FIRST
2. ✅ Read task-specific files only
3. ✅ Execute task
4. ✅ Validate build generates exactly 241 pages
5. ✅ Provide summary in chat (NO report files)

### Red Flags - STOP Immediately:
- ❌ Editing `data/cities.ts`
- ❌ Adding new cities/districts
- ❌ Changing routing logic
- ❌ Page count ≠ 241
- ❌ Using `/es/*` URLs in public examples
- ❌ Cross-service semantic pollution

### Token Optimization:
- **DO:** Read this file FIRST
- **DO:** Read only files being modified
- **DO NOT:** Read historical reports by default
- **DO NOT:** Scan old execution reports unless debugging

---

## ZERO DOCUMENTATION MODE

**DEFAULT BEHAVIOR:**

❌ **NEVER CREATE:**
- `*_REPORT.md`
- `*_AUDIT.md`
- `*_PLAN.md`
- `*_ROLLBACK.md`
- `*_SUMMARY.md`

**TASK COMPLETION WORKFLOW:**

1. Read `PROJECT_CORE.md`
2. Execute task
3. Validate build
4. Provide summary in chat
5. Stop

**DO NOT CREATE:**
- Report files
- Audit files
- Plan files
- Rollback files
- Implementation summary files

**EXCEPTION:**
- `CHANGELOG.md` only if explicitly requested

**RATIONALE:**

Git history is the audit trail. Report files are repository bloat and token waste.

---

## REQUIRED READING ORDER

**For ALL tasks:**
1. `PROJECT_CORE.md` (this file) - MANDATORY
2. Task-specific files only

**Historical Context:**
- All history available via git
- Read past commits ONLY when explicitly requested or debugging

---

## BUILD COMMANDS

```bash
npm install           # Install dependencies
npm run dev          # Start dev server
npm run build        # Build production (expect 241 pages)
npm start            # Start production server
npm run lint         # Lint code
```

---

## KEY FILES

**Governance:**
- `PROJECT_CORE.md` - This file (single source of truth)

**Content (Safe to Edit):**
- `data/district-seo-content.ts`
- `data/city-seo-content.ts`

**Routing (DO NOT EDIT):**
- `data/cities.ts`
- `middleware.ts`

**Documentation:**
- `docs/` - Technical architecture and design system guides

---

## SUCCESS CRITERIA

Every task completion requires:
- ✅ Build passes (`npm run build`)
- ✅ 241 pages confirmed
- ✅ 0 new TypeScript errors
- ✅ `data/cities.ts` unchanged
- ✅ Summary provided in chat (NO report files)

---

**END OF CORE DOCUMENTATION**

**Remember:**
- This file is the single source of truth
- No report files allowed (use git history for audit trail)
- Provide task summaries in chat only
- Focus on current state, not history
