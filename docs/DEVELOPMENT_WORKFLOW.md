# Reparar24 - Development Workflow & Review Process

## 🎯 Overview

This document defines the standard development workflow for the Reparar24 project to maintain quality, prevent regressions, and enable safe AI-assisted development.

**All developers (human and AI) must follow this workflow.**

---

## 📋 Pre-Development Checklist

Before starting any major task:

### 1. Understand Current Architecture
- [ ] Read `README.md`
- [ ] Review `ARCHITECTURE.md`
- [ ] Check relevant documentation in `docs/`
- [ ] Understand existing patterns

### 2. Define Clear Objectives
- [ ] What problem are we solving?
- [ ] What are the success criteria?
- [ ] What files will be affected?
- [ ] What are potential risks?

### 3. Check for Conflicts
- [ ] Will this affect SEO?
- [ ] Will this change routes?
- [ ] Will this affect multilingual support?
- [ ] Will this break internal linking?

---

## 🔨 Development Workflow

### Step 1: Planning Phase

**Create a brief plan:**
```markdown
## Task: [Task Name]
### Objectives:
- Objective 1
- Objective 2

### Affected Systems:
- [ ] Routing
- [ ] SEO/Metadata
- [ ] Multilingual
- [ ] Internal Linking
- [ ] Conversion/UI

### Files to Modify:
- file1.ts
- file2.tsx

### Risk Assessment: Low | Medium | High
```

### Step 2: Implementation Phase

**Follow existing patterns:**
1. Use existing component structures
2. Follow naming conventions
3. Maintain type safety
4. Add comments for complex logic
5. Keep conversion-focus intact

**Do NOT:**
- ❌ Redesign architecture without approval
- ❌ Break existing SEO structure
- ❌ Remove conversion elements
- ❌ Ignore TypeScript errors
- ❌ Skip multilingual support

### Step 3: Validation Phase

**Run automated checks:**
```bash
# 1. Lint check
npm run lint

# 2. TypeScript check
npm run build

# 3. Visual inspection
npm run dev
```

**Manual validation:**
- [ ] Test in browser
- [ ] Check mobile responsiveness
- [ ] Verify CTAs are visible
- [ ] Test emergency UX flows
- [ ] Check multilingual switching

### Step 4: Review Phase

**Create review report:**
```bash
# Copy template
cp REVIEW_REPORT_TEMPLATE.md REVIEW_REPORT_[DATE].md

# Fill in all sections
# Be thorough and honest
```

**Required sections:**
- Executive summary
- Changes made
- Architecture impact
- SEO impact
- Validation results
- Known issues
- Recommendations

### Step 5: Documentation Phase

**Update affected documentation:**
- [ ] Update README if user-facing changes
- [ ] Update ARCHITECTURE if structural changes
- [ ] Update relevant docs/ files
- [ ] Add comments to complex code
- [ ] Update TypeScript types

### Step 6: Final Sign-Off

**Before marking complete:**
- [ ] All validations passing
- [ ] Review report complete
- [ ] Documentation updated
- [ ] No critical issues remaining
- [ ] Rollback plan documented

---

## 🛡️ Validation Systems

### Automated Validation

**Always run these commands:**
```bash
# Full validation suite
npm run lint && npm run build
```

**Expected output:**
- ✅ Lint: Warnings OK, no errors
- ✅ Build: 693 pages (or expected count)
- ✅ TypeScript: All types valid
- ✅ Performance: < 110kB First Load JS

### Route Validation

**Check for:**
- No duplicate routes
- Valid locale prefixes
- Correct dynamic segments
- Service slugs exist in data
- City slugs exist in data

**Validation checklist:**
```typescript
// Routes must follow these patterns:
- /{locale}
- /{locale}/{serviceSlug}
- /{locale}/{serviceSlug}/{citySlug}
- /{locale}/{serviceSlug}/{citySlug}/{districtSlug}
- /{locale}/servicios/{citySlug}
```

### SEO Validation

**Check for:**
- Canonical URLs point to Spanish (es) version
- Hreflang tags include all locales
- Each page has unique title
- Each page has unique description
- Schema markup is valid
- Sitemap includes all pages

**Use these validators:**
- Google Rich Results Test
- Schema.org Validator
- Hreflang Tags Testing Tool

### Internal Linking Validation

**Check for:**
- No broken internal links
- Service ↔ City relationships valid
- District parent cities exist
- Related service links make sense
- Semantic relationships logical

---

## 🤖 AI-Assisted Development Guidelines

### When Using AI Assistance

**Always provide AI with:**
1. Current architecture context
2. Relevant documentation files
3. Examples of existing patterns
4. Clear constraints and requirements

**Example AI prompt structure:**
```
Context: Reparar24 is a multilingual local services platform...
Current architecture: [Brief summary]
Task: [Specific task]
Constraints:
- Do NOT redesign architecture
- Maintain SEO structure
- Preserve conversion elements
- Follow existing patterns
Requirements:
- [Requirement 1]
- [Requirement 2]
```

### AI Safety Checklist

Before accepting AI-generated code:
- [ ] Code follows existing patterns
- [ ] SEO structure unchanged (unless intentional)
- [ ] Multilingual support maintained
- [ ] Conversion elements intact
- [ ] TypeScript types valid
- [ ] No duplicate routes created
- [ ] Internal linking preserved

### Red Flags (AI-Generated Code)

❌ **Reject if AI:**
- Redesigns architecture without justification
- Removes conversion CTAs
- Breaks multilingual routing
- Creates route collisions
- Generates massive content volumes
- Ignores existing patterns
- Adds heavy dependencies

✅ **Accept if AI:**
- Follows existing patterns
- Maintains architecture
- Improves incrementally
- Adds proper validation
- Documents changes
- Creates review report

---

## 📊 Quality Gates

### Gate 1: Basic Validation
- TypeScript compiles
- Lint passes (warnings OK)
- Build succeeds

### Gate 2: Functional Validation
- All routes render
- Metadata correct
- Multilingual works
- Mobile responsive

### Gate 3: SEO Validation
- Canonical URLs correct
- Hreflang valid
- Schema markup valid
- Sitemap accurate

### Gate 4: Conversion Validation
- CTAs visible
- Emergency UX intact
- Mobile CTAs accessible
- Trust signals present

### Gate 5: Documentation Validation
- Changes documented
- Review report complete
- Architecture docs updated

**All gates must pass before deployment.**

---

## 🚨 Emergency Procedures

### If Build Breaks

1. **Immediately check:**
   - What was the last change?
   - Any TypeScript errors?
   - Any lint errors?

2. **Rollback strategy:**
   ```bash
   git log --oneline -10
   git revert [commit-hash]
   npm run build
   ```

3. **Report issue:**
   - Create incident report
   - Document what broke
   - Document how fixed
   - Update review workflow

### If Routes Break

1. **Check:**
   - `lib/i18n/slugs.ts` changes
   - Dynamic route files changed
   - Service/city data modified

2. **Validate:**
   ```bash
   npm run build | grep "Generating static pages"
   # Should show 693/693
   ```

3. **Fix:**
   - Restore slug mappings
   - Verify service data
   - Check dynamic routes

### If SEO Breaks

1. **Check:**
   - Metadata files changed
   - Canonical URL generation
   - Hreflang generation
   - Schema generation

2. **Validate:**
   - View page source
   - Check meta tags
   - Verify schema JSON-LD
   - Test hreflang tags

---

## 📈 Continuous Improvement

### After Each Major Task

**Reflect on:**
1. What went well?
2. What could be improved?
3. Any patterns to document?
4. Any risks discovered?

**Update workflow if:**
- New pattern emerges
- New risk identified
- Better validation found
- Process improvement discovered

### Monthly Review

**Review metrics:**
- Build success rate
- Issue frequency
- Documentation completeness
- Review report quality

**Improve process:**
- Update templates
- Add validation checks
- Document new patterns
- Train team/AI

---

## 📚 Key Documentation Files

### Must-Read Before Development
1. `README.md` - Project overview
2. `ARCHITECTURE.md` - Basic architecture
3. `MULTILINGUAL_ARCHITECTURE.md` - i18n system
4. `docs/ARCHITECTURE_GUIDE.md` - Complete architecture
5. `docs/DESIGN_SYSTEM.md` - UI/UX patterns
6. `docs/SEO_ARCHITECTURE.md` - SEO system
7. `docs/SEMANTIC_ARCHITECTURE.md` - Semantic SEO

### Reference During Development
- `REVIEW_REPORT_TEMPLATE.md` - Report template
- `lib/i18n/slugs.ts` - Slug mappings
- `data/services.ts` - Service data
- `data/cities.ts` - City data
- `data/problems.ts` - Problem clustering

---

## ✅ Development Checklist

### Before Starting
- [ ] Understand task requirements
- [ ] Review relevant documentation
- [ ] Check for potential conflicts
- [ ] Create development plan

### During Development
- [ ] Follow existing patterns
- [ ] Maintain type safety
- [ ] Add necessary comments
- [ ] Test incrementally

### Before Completing
- [ ] Run all validations
- [ ] Create review report
- [ ] Update documentation
- [ ] No critical issues
- [ ] Ready for deployment

---

## 🎯 Success Criteria

A task is considered **successfully complete** when:

1. ✅ All automated validations pass
2. ✅ Review report is complete and thorough
3. ✅ Documentation is updated
4. ✅ No critical issues remain
5. ✅ SEO structure intact (unless intentionally changed)
6. ✅ Multilingual support maintained
7. ✅ Conversion elements preserved
8. ✅ Mobile UX validated
9. ✅ Rollback plan documented
10. ✅ Team/AI sign-off obtained

**If any criterion fails, task is NOT complete.**

---

**Last Updated:** 2026-05-18
**Version:** 1.0
**Status:** Active
