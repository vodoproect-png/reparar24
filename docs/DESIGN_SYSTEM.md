# Reparar24 - Design System & UI Architecture

## 🎨 Design Philosophy

**Local Services, Spanish Market Focus**

The design system is purpose-built for:
- **Trust & Credibility** - Professional, established business feel
- **Emergency Readiness** - Clear CTA hierarchy for urgent services
- **Mobile-First** - Optimized for on-the-go emergency searches
- **Conversion-Oriented** - Every element guides toward contact actions
- **Accessibility** - Touch-friendly, readable, semantic HTML

**NOT a generic SaaS UI. Built for local service businesses.**

---

## 🎯 Core Design Principles

### 1. Trust Over Flash
- Clean, professional aesthetics
- No aggressive animations
- Credibility-focused design
- Clear information hierarchy

### 2. Mobile-First, Always
- Touch-friendly targets (44px minimum)
- Readable typography on small screens
- Sticky CTAs on mobile
- Fast scanning patterns

### 3. Conversion-Oriented
- Multiple contact paths (phone, WhatsApp, form)
- Emergency CTAs prominently placed
- Clear service paths
- Minimal friction to contact

### 4. Performance
- Lightweight CSS (Tail

wind utilities)
- No heavy animation libraries
- Optimized images
- Fast page loads

---

## 🎨 Color System

### Primary Colors (Blue - Trust & Professionalism)
```css
primary-50:  #eff6ff  /* Lightest backgrounds */
primary-100: #dbeafe  /* Light backgrounds */
primary-500: #3b82f6  /* Interactive elements */
primary-600: #2563eb  /* Primary buttons */
primary-700: #1d4ed8  /* Hover states */
```

**Usage:**
- Buttons, links, headers
- Trust badges
- Professional service indicators

### Accent Colors (Orange - Urgency & Action)
```css
accent-500: #f97316  /* Attention */
accent-600: #ea580c  /* Primary accent */
accent-700: #c2410c  /* Hover */
```

**Usage:**
- Secondary CTAs
- Pricing highlights
- Service icons
- Attention-grabbing elements

### Emergency Colors (Red - Urgent Actions)
```css
emergency-500: #ef4444  /* Urgent */
emergency-600: #dc2626  /* Emergency CTA */
emergency-700: #b91c1c  /* Emergency hover */
```

**Usage:**
- Emergency banners
- 24/7 service indicators
- Urgent call buttons
- Alert messages

### Success Colors (Green - Confirmation)
```css
success-500: #22c55e  /* Success state */
success-600: #16a34a  /* Confirmation */
```

**Usage:**
- WhatsApp button
- Success messages
- Availability indicators
- Check marks

### Neutral Colors
```css
gray-50  through gray-900  /* Full grayscale palette */
```

---

## 📝 Typography System

### Font Stack
```css
font-family: 'Inter var', 'Inter', system-ui, -apple-system, sans-serif
```

**Why Inter:**
- Modern, professional
- Excellent readability
- Great metrics for UI
- Variable font support

### Type Scale

```css
/* Mobile → Desktop */
text-xs:   0.75rem  (12px)
text-sm:   0.875rem (14px)
text-base: 1rem     (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem  (20px)
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)
text-5xl:  3rem     (48px)
text-6xl:  3.75rem  (60px)
```

### Heading Styles

**H1 - Hero Headlines**
```css
.h1 {
  @apply text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight;
}
```
Usage: Landing pages, service heroes

**H2 - Section Headers**
```css
.h2 {
  @apply text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight;
}
```
Usage: Major section dividers

**H3 - Subsections**
```css
.h3 {
  @apply text-2xl lg:text-3xl font-bold tracking-tight;
}
```
Usage: Card headers, subsections

**Body Text**
```css
p {
  @apply text-base lg:text-lg leading-relaxed;
}
```
Desktop: 18px | Mobile: 16px

---

## 📦 Container System

### Standard Container
```css
.container-custom {
  max-width: 1280px (7xl);
  padding: 1rem → 2rem;
}
```
**Usage:** Most page content

### Narrow Container
```css
.container-narrow {
  max-width: 896px (4xl);
  padding: 1rem → 2rem;
}
```
**Usage:** Blog posts, FAQs, long-form content

### Wide Container
```css
.container-wide {
  max-width: 1408px (8xl);
  padding: 1rem → 2rem;
}
```
**Usage:** Image galleries, service grids

---

## 🃏 Card System

### Standard Card
```html
<div class="card">
  <!-- Rounded corners, shadow, hover lift -->
</div>
```

**Spec:**
- `bg-white`
- `rounded-xl` (12px)
- `shadow-card` → `shadow-card-hover`
- `padding: 1.5rem` (24px)
- Smooth transition

**Usage:** Service cards, review cards, feature boxes

### Compact Card
```html
<div class="card-compact">
  <!-- Smaller padding, lighter shadow -->
</div>
```

**Usage:** District links, smaller UI elements

### Flat Card
```html
<div class="card-flat">
  <!-- Border instead of shadow -->
</div>
```

**Usage:** Forms, input groups, informational blocks

### Highlight Card
```html
<div class="card-highlight">
  <!-- Gradient background, border -->
</div>
```

**Usage:** Featured services, special offers

---

## 🔘 Button System

### Primary Button
```html
<button class="btn-primary">
  Llamar Ahora
</button>
```

**Spec:**
- Background: `primary-600` → `primary-700`
- Text: White, semibold
- Padding: `0.75rem 1.5rem`
- Rounded: `lg` (8px)
- Shadow: sm → md on hover

**Usage:** Main CTAs, primary actions

### Emergency Button
```html
<button class="btn-emergency">
  🚨 Emergencia 24/7
</button>
```

**Spec:**
- Background: `emergency-600` → `emergency-700`
- Text: White, bold
- Padding: `1rem 2rem`
- Larger text
- Stronger shadow

**Usage:** Emergency calls, urgent services

### WhatsApp Button
```html
<button class="btn-whatsapp">
  <span>💬</span> WhatsApp
</button>
```

**Spec:**
- Background: `#25D366` (WhatsApp green)
- Text: White, semibold
- Icon + text layout

**Usage:** WhatsApp contact CTAs

### Outline Button
```html
<button class="btn-outline">
  Más Información
</button>
```

**Spec:**
- Background: white → `gray-50`
- Border: `2px` gray → primary
- Text: gray-900

**Usage:** Secondary actions, "Learn more" links

### Button Sizes

```html
<button class="btn-primary btn-sm">Small</button>
<button class="btn-primary">Default</button>
<button class="btn-primary btn-lg">Large</button>
```

---

## 📏 Spacing System

### Section Padding
```css
.section        { py: 4rem → 6rem }  /* Standard */
.section-compact { py: 3rem → 4rem }  /* Compact */
.section-hero    { py: 5rem → 8rem }  /* Hero */
```

### Content Spacing
```css
gap-4   (1rem / 16px)   /* Tight */
gap-6   (1.5rem / 24px) /* Standard */
gap-8   (2rem / 32px)   /* Relaxed */
gap-12  (3rem / 48px)   /* Section dividers */
```

---

## 🎭 Component Patterns

### Trust Badge
```html
<div class="trust-badge">
  <span>✓</span>
  <span>Profesionales Certificados</span>
</div>
```

**Usage:** Trust indicators, certifications, guarantees

### Emergency Banner
```html
<div class="emergency-banner">
  <h3>🚨 Servicio de Emergencias 24/7</h3>
  <p>Atención inmediata</p>
</div>
```

**Usage:** Top of emergency service pages

### Icon Circle
```html
<div class="icon-circle">
  🔧
</div>
```

**Variants:**
- `.icon-circle` (primary)
- `.icon-circle-accent`
- `.icon-circle-emergency`

**Usage:** Service icons, feature highlights

### Review Card
```html
<div class="review-card">
  <p>"Excelente servicio..."</p>
  <div class="flex items-center gap-2">
    <span>⭐⭐⭐⭐⭐</span>
    <span class="font-semibold">María G.</span>
  </div>
</div>
```

**Usage:** Customer testimonials

---

## 📱 Mobile-First Patterns

### Touch Targets
```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

**Apply to:**
- All buttons
- All links
- Form inputs
- Interactive cards

### Mobile CTA Stack
```html
<div class="flex flex-col sm:flex-row gap-4">
  <button class="btn-primary w-full sm:w-auto">
    Llamar
  </button>
  <button class="btn-whatsapp w-full sm:w-auto">
    WhatsApp
  </button>
</div>
```

Mobile: Stack vertically, full width
Desktop: Row layout, auto width

### Sticky Mobile CTA
```html
<div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden">
  <button class="btn-emergency w-full">
    📞 Llam ar Ahora
  </button>
</div>
```

**Behavior:**
- Fixed to bottom on mobile
- Hidden on desktop
- Always accessible

---

## 🎬 Animation System

### Fade In
```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-in;
}
```

**Usage:** Content reveals, modal opens

### Slide Up
```css
.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
```

**Usage:** Hero content, section reveals

### Pulse (Soft)
```css
.animate-pulse-soft {
  animation: pulseSoft 2s infinite;
}
```

**Usage:** Emergency CTAs, notification badges

**Rule:** Use animations sparingly. Performance > flash.

---

## 🏗️ Layout Patterns

### Hero Section
```html
<section class="section-hero gradient-primary">
  <div class="container-custom">
    <div class="max-w-4xl">
      <h1 class="text-white mb-6">
        Fontanero en Madrid 24 Horas
      </h1>
      <p class="text-xl text-primary-100 mb-8">
        Servicio rápido y profesional
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <button class="btn-accent">Llamar Ahora</button>
        <button class="btn-whatsapp">WhatsApp</button>
      </div>
    </div>
  </div>
</section>
```

### Two-Column Feature
```html
<section class="section bg-white">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div><!-- Content --></div>
      <div><!-- Image --></div>
    </div>
  </div>
</section>
```

### Card Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card"><!-- Card 1 --></div>
  <div class="card"><!-- Card 2 --></div>
  <div class="card"><!-- Card 3 --></div>
</div>
```

---

## ✅ Accessibility Guidelines

### Color Contrast
- Text on white: >= 4.5:1
- Large text (18px+): >= 3:1
- All buttons meet WCAG AA

### Focus States
- All interactive elements have focus rings
- Focus ring: `ring-2 ring-offset-2 ring-[color]`
- Never remove focus styles

### Semantic HTML
- Proper heading hierarchy
- Meaningful alt text
- ARIA labels where needed
- Form labels properly associated

### Keyboard Navigation
- Tab order logical
- All CTAs keyboard-accessible
- Escape closes modals

---

## 🚀 Scalability Strategy

### Component Reusability
Every component should be:
- **Modular** - Works standalone
- **Composable** - Combines with others
- **Responsive** - Mobile through desktop
- **Accessible** - WCAG AA compliant

### Future-Ready
Design system supports:
- New service types
- New cities/regions
- Additional languages
- Programmatic page generation
- A/B testing variants

### Performance Budget
- CSS: < 50KB (Tailwind + customs)
- JS (First Load): < 102KB
- Largest Contentful Paint: < 2.5s
-  Cumulative Layout Shift: < 0.1

---

## 📚 Usage Examples

### Service Page Hero
```html
<section class="section-hero gradient-primary">
  <div class="container-custom">
    <div class="flex items-center gap-4 mb-6">
      <div class="icon-circle-emergency text-4xl">
        🔧
      </div>
      <h1 class="text-white">
        Fontanero en Madrid
      </h1>
    </div>
    <p class="text-xl text-primary-100 mb-8">
      Disponible 24/7 • Respuesta en 30-60 minutos
    </p>
    <!-- CTAs -->
  </div>
</section>
```

### Trust Badges Row
```html
<div class="flex flex-wrap gap-4 justify-center">
  <div class="trust-badge">
    <span>✓</span> Certificados
  </div>
  <div class="trust-badge">
    <span>🛡️</span> Garantía
  </div>
  <div class="trust-badge">
    <span>⭐</span> 4.9/5 en Google
  </div>
</div>
```

### Emergency CTA Section
```html
<section class="section-compact bg-emergency-50">
  <div class="container-narrow text-center">
    <h2 class="text-emergency-900 mb-4">
      ¿Necesitas Ayuda Urgente?
    </h2>
    <p class="text-lg mb-6">
      Disponibles 24 horas, 7 días a la semana
    </p>
    <button class="btn-emergency">
      📞 Llamar Ahora - 900 000 000
    </button>
  </div>
</section>
```

---

## 🎯 Conversion Optimization

### CTA Hierarchy
1. **Primary:** Emergency call button (red)
2. **Secondary:** Regular call/WhatsApp (blue/green)
3. **Tertiary:** Form/email (outline)

### Trust Signals
- Certifications (top of page)
- Social proof (reviews)
- Guarantees (near CTA)
- Response time (hero)
- Availability (everywhere)

### Mobile Optimizations
- Sticky bottom CTA bar
- Click-to-call links
- WhatsApp deep links
- Minimal form fields
- Large touch targets

---

## 📱 Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm:  640px  /* Small tablets */
md:  768px  /* Tablets */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
2xl: 1536px /* Large desktops */
```

**Design Strategy:**
- Design for 375px first (iPhone SE)
- Test at 768px (iPad)
- Optimize for 1440px (Desktop)

---

## 🎨 Brand Voice in UI

### Tone
- **Professional** but approachable
- **Urgent** without being alarming
- **Confident** without being arrogant
- **Local** and community-focused

### Microcopy Examples
- "Disponible Ahora" (not "Online Now")
- "Llamar Ahora" (not "Contact Us")
- "Respuesta en 30 Minutos" (specific, concrete)
- "Profesionales Certificados" (trust-building)

---

**Design System Status:** Production-ready for local services platform. Optimized for Spanish market, mobile-first, conversion-oriented.
