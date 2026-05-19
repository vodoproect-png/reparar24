# Reparar24 - Semantic Core & SILO Architecture

## 🎯 Overview

Intelligent semantic integration system for safe programmatic SEO scaling without generating thin content or AI spam.

**Status:** Foundation complete, ready for semantic core data ingestion and topical authority building.

---

## 🧠 Semantic Core Integration (`lib/seo/semantic-core.ts`)

### Core Components

**1. IntentMapper** - Search intent detection and mapping
**2. SemanticClusteringEngine** - Keyword grouping and organization
**3. SiloBuilder** - Hierarchical SEO SILO construction
**4. SemanticLinkingEngine** - Contextual internal linking

---

## 🎯 Intent Detection System

### SearchIntent Types

```typescript
type SearchIntent =
  | 'commercial'      // "fontanero precio"
  | 'emergency'       // "fontanero urgente 24h"
  | 'informational'   // "como desatascar tubería"
  | 'navigational'    // "fontanero madrid"
  | 'comparison'      // "fontanero vs plomero"
  | 'problem'         // "fuga de agua"
```

### How Intent Detection Works

**IntentMapper.detectIntent()** analyzes queries using signal words:

**Emergency Signals:**
- urgente, emergencia, 24h, inmediato, rápido, ya, ahora

**Problem Signals:**
- fuga, roto, atascado, gotea, no funciona, avería

**Commercial Signals:**
- precio, coste, cuánto cuesta, presupuesto, barato

**Informational Signals:**
- cómo, qué es, por qué, tutorial, guía, consejos

**Comparison Signals:**
- vs, versus, mejor, comparar, diferencia, opiniones

**Example:**
```typescript
Int entMapper.detectIntent("fontanero urgente madrid")
// Returns: "emergency"

IntentMapper.detectIntent("cuanto cuesta fontanero")
// Returns: "commercial"

IntentMapper.detectIntent("como desatascar tuberias")
// Returns: "informational"
```

### Intent → Content Type Mapping

```typescript
emergency → emergency-landing-page
problem → problem-solution-page
commercial → service-pricing-page
informational → how-to-guide
comparison → comparison-page
navigational → service-page
```

### Intent → CTAs Mapping

```typescript
emergency → ['Llamar Urgente', 'WhatsApp Inmediato']
problem → ['Llamar Ahora', 'Solicitar Presupuesto']
commercial → ['Ver Precios', 'Pedir Presupuesto']
informational → ['Contactar Experto', 'Ver Servicios']
```

**Benefit:** Automatic CTA optimization based on user intent

---

## 🗂️ Semantic Clustering System

### SemanticKeyword Structure

```typescript
interface SemanticKeyword {
  id: string
  keyword: string                 // "fontanero urgente madrid"
  variations: string[]            // Keyword variations
  searchVolume?: number           // Monthly searches
  difficulty?: KeywordDifficulty  // SEO difficulty
  intent: SearchIntent            // User intent
  serviceId: string               // Related service
  cityId?: string                 // Related city
  districtId?: string             // Related district
  urgency: 'emergency' | 'urgent' | 'normal'
  locale: 'es' | 'en' | 'ru'
  relatedKeywords?: string[]      // Semantic relationships
  faqQuestions?: string[]         // Related FAQs
}
```

### Clustering Methods

**A) By Service + Intent**
```typescript
SemanticClusteringEngine.clusterByServiceIntent(keywords)

Result:
Map {
  'fontanero-emergency' => [keywords...],
  'fontanero-commercial' => [keywords...],
  'electricista-emergency' => [keywords...],
}
```

**B) By Location Hierarchy**
```typescript
SemanticClusteringEngine.clusterByLocation(keywords)

Result:
Map {
  'city-madrid' => [keywords...],
  'city-barcelona' => [keywords...],
  'district-salamanca' => [keywords...],
}
```

### Cannibalization Detection

**SemanticClusteringEngine.detectCannibalization()** identifies risks:

```typescript
// Example risk:
{
  keywords: [
    { keyword: 'fontanero madrid', intent: 'navigational', ... },
    { keyword: 'fontanero madrid', intent: 'navigational', ... }
  ],
  reason: 'Multiple pages targeting similar keyword with same intent'
}
```

**Prevents:**
- Duplicate pages targeting same keywords
- Semantic keyword cannibalization
- Intent confusion

---

## 🏗️ SILO Architecture System

### Hierarchical Structure

```
Level 1: Service Root
  └─ Level 2: Service + City
      └─ Level 3: Service + City + District
          └─ Level 4: Service + City + District + Problem
```

### Example SILO

```
Fontanería (Level 1)
  ├─ Fontanero Madrid (Level 2)
  │   ├─ Fontanero Madrid Centro (Level 3)
  │   │   └─ Fontanero Madrid Centro Fuga Agua (Level 4)
  │   ├─ Fontanero Madrid Salamanca (Level 3)
  │   │   └─ Fontanero Madrid Salamanca Urgente (Level 4)
  │   └─ Fontanero Madrid Chamberí (Level 3)
  ├─ Fontanero Barcelona (Level 2)
  │   └─ ...
  └─ Fontanero Valencia (Level 2)
      └─ ...
```

### SEOSilo Structure

```typescript
interface SEOSilo {
  id: string                    // 'silo-fontanero-madrid-centro'
  name: string                  // 'Fontanero Madrid Centro'
  level: 1 | 2 | 3 | 4          // Hierarchy level
  parentId?: string             // Parent SILO ID
  childrenIds: string[]         // Child SILO IDs
  keywords: string[]            // Target keywords
  pageUrl: string               // Landing page
  internalLinks: string[]       // Links within SILO
}
```

### Building SILO Hierarchy

```typescript
const silos = SiloBuilder.buildServiceSilo(
  'fontanero',           // serviceId
  'Fontanería',          // serviceName
  ['madrid', 'barcelona'], // cities
  {
    madrid: ['centro', 'salamanca', 'chamberi'],
    barcelona: ['eixample', 'gracia']
  }                      // districts
)
```

**Result:** Complete 3-level SILO structure with:
- Parent-child relationships
- Target keywords per level
- Internal linking map
- Breadcrumb-ready hierarchy

### Benefits

✅ **Clear topical authority** - Search engines understand site structure
✅ **Link juice distribution** - Power flows down hierarchy
✅ **User navigation** - Logical browsing path
✅ **Crawl efficiency** - Bots follow clear structure
✅ **Scalability** - Easy to add new branches

---

## 🔗 Semantic Internal Linking

### SemanticLinkingEngine

**Purpose:** Generate contextual internal links based on semantic relationships

### Finding Related Keywords

```typescript
SemanticLinkingEngine.findRelatedKeywords(
  keyword,      // Current keyword
  allKeywords,  // All available keywords
  5             // Max results
)
```

**Linking Strategy:**
1. Same service, different intent (2 links)
2. Same intent, different service (2 links)
3. Same location, different service (1 link)

**Example:**
```
Current: "fontanero urgente madrid" (emergency intent)

Related Links:
1. "fontanero precio madrid" (commercial intent, same service)
2. "fontanero madrid centro" (navigational, same service)
3. "electricista urgente madrid" (emergency, different service)
4. "desatascos madrid" (navigational, same location)
```

### Anchor Text Generation

```typescript
SemanticLinkingEngine.generateAnchorText(keyword)

Input:
{
  keyword: "fontanero urgente madrid",
  variations: ["fontanero emergencia madrid", "fontanero 24h madrid"],
  intent: "emergency"
}

Output:
[
  "fontanero urgente madrid",
  "fontanero emergencia madrid",
  "fontanero 24h madrid",
  "fontanero urgente madrid urgente",  // Intent-based
  "fontanero urgente madrid 24h"       // Intent-based
]
```

**Benefits:**
- Natural anchor text
- Semantic variation
- Context-aware
- Intent-optimized

---

## 📈 Programmatic Scaling Workflow

### Phase 1: Semantic Core Data Ingestion

```typescript
// 1. Import semantic core data
import { semanticCoreData } from './semantic-core-data'

// 2. Process keywords
const keywords: SemanticKeyword[] = semanticCoreData.map(processKeyword)

// 3. Cluster by intent and service
const clusters = SemanticClusteringEngine.clusterByServiceIntent(keywords)

// 4. Detect cannibalization risks
const risks = SemanticClusteringEngine.detectCannibalization(keywords)

// 5. Build SILO structure
const silos = SiloBuilder.buildServiceSilo(...)
```

### Phase 2: Page Generation

```typescript
// For each keyword cluster
for (const [clusterKey, clusterKeywords] of clusters) {
  
  // Detect intent
  const intent = IntentMapper.detectIntent(clusterKeywords[0].keyword)
  
  // Get recommended content type
  const contentType = IntentMapper.suggestContentType(intent)
  
  // Get recommended CTAs
  const ctas = IntentMapper.getRecommendedCTAs(intent)
  
  // Find related keywords for internal links
  const relatedKeywords = SemanticLinkingEngine.findRelatedKeywords(
    clusterKeywords[0],
    allKeywords,
    5
  )
  
  // Generate page structure
  const pageStructure = {
    hero: generateHero(intent),
    problems: generateProblems(clusterKeywords),
    process: generateProcess(),
    faq: generateFAQ(clusterKeywords),
    relatedLinks: generateLinks(relatedKeywords),
    ctas: ctas
  }
}
```

### Phase 3: Quality Validation

```typescript
// Validate each generated page
function validatePage(page: Page): boolean {
  return (
    page.wordCount >= 1000 &&              // Sufficient content
    page.hasUniqueTitle &&                 // No duplicates
    page.hasSchema &&                      // Structured data
    page.hasFAQ &&                         // FAQ section
    page.hasInternalLinks &&               // Link to related
    page.hasCTAs &&                        // Conversion focus
    !hasIntentConflict(page) &&            // Clear intent
    !isCannibalizationRisk(page)           // No cannibalization
  )
}
```

---

## 🛡️ Safety Mechanisms

### 1. Cannibalization Prevention

**Detection:**
```typescript
SemanticClusteringEngine.detectCannibalization(keywords)
```

**Alerts when:**
- Multiple pages target same keyword
- Same intent + same service + same location
- Similar normalized keywords

### 2. Intent Clarity

**Requirement:**
- Each page must have single clear intent
- Intent determines content type
- Intent determines CTAs

**Prevents:**
- Confusing mixed-intent pages
- Poor user experience
- Low conversion rates

### 3. Template Enforcement

**Every page must include:**
- ✅ Intent-appropriate hero
- ✅ Semantic problem clustering
- ✅ Trust-building process
- ✅ FAQ section (schema)
- ✅ Internal links (semantic)
- ✅ Intent-appropriate CTAs

### 4. Minimum Quality Standards

```typescript
{
  minWordCount: 1000,
  minInternalLinks: 3,
  minFAQs: 3,
  requiresSchema: true,
  requiresCTAs: true,
  requiresUniqueMetadata: true
}
```

---

## 🌍 Multilingual Semantic SEO

### Locale-Aware Keywords

```typescript
{
  id: 'kw-plumber-urgent-madrid',
  keyword: 'plumber urgent madrid',
  locale: 'en',
  serviceId: 'fontanero',  // Links to Spanish service
  intent: 'emergency',
  // ...
}
```

### Translation Strategy

**Spanish (Primary):**
- Most comprehensive keyword coverage
- Primary SEO authority
- Canonical target

**English & Russian:**
- Translated keyword variations
- Support locales
- Alternate language signals

### Semantic Relationships Across Locales

```
Spanish: "fontanero urgente" ↔ English: "urgent plumber" ↔ Russian: "срочный сантехник"
  ↓                              ↓                            ↓
Same intent: emergency
Same service: fontanero
Same semantic cluster
```

---

## 📊 Example Use Cases

### Use Case 1: Emergency Landing Page

**Keyword:** "fontanero urgente madrid 24h"

**System Actions:**
1. **Intent Detection:** `emergency`
2. **Content Type:** `emergency-landing-page`
3. **CTAs:** `['Llamar Urgente', 'WhatsApp Inmediato']`
4. **SILO Level:** 2 (service + city)
5. **Related Links:** Other emergency services in Madrid
6. **FAQ Theme:** Emergency response times, availability

**Result:** High-converting emergency landing page

### Use Case 2: Informational Content

**Keyword:** "como desatascar tuberias"

**System Actions:**
1. **Intent Detection:** `informational`
2. **Content Type:** `how-to-guide`
3. **CTAs:** `['Contactar Experto', 'Ver Servicios']`
4. **SILO Level:** 1 (service root)
5. **Related Links:** Problem-solution pages, service pages
6. **FAQ Theme:** DIY tips, when to call professional

**Result:** Trust-building informational content

### Use Case 3: Commercial Intent

**Keyword:** "precio fontanero madrid"

**System Actions:**
1. **Intent Detection:** `commercial`
2. **Content Type:** `service-pricing-page`
3. **CTAs:** `['Ver Precios', 'Pedir Presupuesto']`
4. **SILO Level:** 2 (service + city)
5. **Related Links:** Service pages, comparison pages
6. **FAQ Theme:** Pricing details, what affects cost

**Result:** Transparent pricing page that converts

---

## 🎯 Scaling Strategy

### Current: 693 Pages
- Manual templates
- Curated content
- Foundation architecture

### Phase 1: +1,000 Pages (Ready)
- Problem-intent keywords
- Service + city + problem combinations
- Template-based generation
- Quality validation

### Phase 2: +3,000 Pages (Architecture Ready)
- District-level problem pages
- Emergency variations
- Seasonal content
- AI-assisted FAQ generation

### Phase 3: +10,000 Pages (Safety Systems In Place)
- Full semantic core integration
- Automated clustering
- Intent-based generation
- Cannibalization monitoring

**All phases maintain:**
- Template structure
- Quality standards
- Conversion focus
- Schema markup
- Internal linking

---

## ✅ Summary

**Delivered:** Intelligent semantic integration system that enables safe programmatic SEO scaling from 693 to 10,000+ pages.

**Key Innovations:**

1. **Intent-Aware Architecture**
   - Automatic intent detection
   - Intent → content type mapping
   - Intent → CTA optimization

2. **Semantic Clustering**
   - Service + intent clustering
   - Location hierarchy clustering
   - Cannibalization detection

3. **SILO Structure**
   - 4-level hierarchy
   - Clear topical authority
   - Scalable internal linking

4. **Quality Safeguards**
   - Template enforcement
   - Minimum standards
   - Cannibalization alerts
   - Intent clarity validation

5. **Multilingual Support**
   - Locale-aware keywords
   - Cross-language semantic relationships
   - Primary/support language strategy

**Ready For:**
- Semantic core data ingestion
- Keyword cluster expansion
- Intent-based page generation
- Topical authority building
- Safe 10K+ page scaling

**Prevents:**
- Keyword cannibalization
- Thin content generation
- Intent confusion
- Duplicate pages
- Low-quality AI spam
