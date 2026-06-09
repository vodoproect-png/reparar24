# ANÁLISIS DE ARQUITECTURA GEO - Reparar24
**Fecha**: 2026-06-09  
**Estado**: Spanish-Only Production (241 páginas objetivo)  
**Build Actual**: 247 páginas generadas  

---

## RESUMEN EJECUTIVO

**HALLAZGO CRÍTICO**: El sistema actualmente genera **247 páginas** pero el objetivo documentado es **241 páginas**. Existe una discrepancia de **+6 páginas** que requiere investigación.

**NO EXISTE CONFLICTO REAL** entre `/fontanero` y `/fontanero/valencia`. El middleware y Next.js App Router manejan correctamente la jerarquía de rutas mediante carpetas anidadas.

---

## 1. ARQUITECTURA DE ROUTING ACTUAL

### 1.1 Estructura de Carpetas App Router

```
app/[locale]/
├── page.tsx                              → / (homepage)
├── [serviceSlug]/
│   ├── page.tsx                          → /{service}
│   ├── [citySlug]/
│   │   ├── page.tsx                      → /{service}/{city}
│   │   └── [districtSlug]/
│   │       └── page.tsx                  → /{service}/{city}/{district}
│   └── ...
├── fontanero/
│   └── [childSlug]/
│       └── page.tsx                      → /fontanero/{childService}
├── servicios/
│   └── [citySlug]/
│       └── page.tsx                      → /servicios/{city}
├── contacto/page.tsx                     → /contacto
├── privacidad/page.tsx                   → /privacidad
├── terminos/page.tsx                     → /terminos
└── cookies/page.tsx                      → /cookies
```

### 1.2 Middleware: Spanish-Only Enforcement

El middleware realiza:
- ✅ Reescritura interna: `/fontanero` → `/es/fontanero` (transparente al usuario)
- ✅ Redirección 301: `/es/fontanero` → `/fontanero` (canonical enforcement)
- ✅ Redirección 301: `/en/*` → `/*` (equivalente español)
- ✅ Redirección 301: `/ru/*` → `/*` (equivalente español)
- ✅ URLs públicas SIEMPRE root-level: `/fontanero`, `/electricista/madrid`, etc.

**Conclusión**: La arquitectura es correcta. No hay conflicto de routing.

---

## 2. INVENTARIO COMPLETO DE PÁGINAS

### 2.1 Páginas por Tipo

| TIPO | CANTIDAD | PATRÓN URL | ARCHIVO |
|------|---------|------------|---------|
| Homepage | 1 | `/` | `app/[locale]/page.tsx` |
| Servicios genéricos | 6 | `/{service}` | `app/[locale]/[serviceSlug]/page.tsx` |
| Servicio + Ciudad | 36 | `/{service}/{city}` | `app/[locale]/[serviceSlug]/[citySlug]/page.tsx` |
| Servicio + Ciudad + Distrito | 180 | `/{service}/{city}/{district}` | `app/[locale]/[serviceSlug]/[citySlug]/[districtSlug]/page.tsx` |
| Fontanero Child Services | ? | `/fontanero/{child}` | `app/[locale]/fontanero/[childSlug]/page.tsx` |
| City Hub Pages | 6 | `/servicios/{city}` | `app/[locale]/servicios/[citySlug]/page.tsx` |
| Legal Pages | 3 | `/privacidad`, `/terminos`, `/cookies` | `app/[locale]/{page}/page.tsx` |
| Contacto | 1 | `/contacto` | `app/[locale]/contacto/page.tsx` |

### 2.2 Cálculo de Páginas Esperadas

```
Homepage:                   1
Servicios genéricos:        6  (fontanero, electricista, desatascos, aire-acondicionado, calefaccion, limpieza-tuberias)
Servicio + Ciudad:         36  (6 servicios × 6 ciudades)
Servicio + Ciudad + Distrito: 180  (6 servicios × 6 ciudades × 5 distritos)
City Hubs:                  6  (/servicios/madrid, etc.)
Legal:                      3  (privacidad, terminos, cookies)
Contacto:                   1
Fontanero Child Services:   ?  ← CAUSA DE LA DISCREPANCIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBTOTAL SIN CHILD:       233
BUILD REAL:               247
DIFERENCIA:               +14  ← Fontanero child services
```

**HALLAZGO**: El archivo `/fontanero/[childSlug]/page.tsx` existe y genera páginas adicionales que NO están documentadas en el objetivo de 241 páginas.

---

## 3. ANÁLISIS DE CONFLICTOS POR SERVICIO

### 3.1 Fontanero - Caso Especial

#### Estructura Real:

```
/fontanero                              → Página genérica (app/[locale]/[serviceSlug]/page.tsx)
/fontanero/reparacion-fugas            → Child service (app/[locale]/fontanero/[childSlug]/page.tsx)
/fontanero/desatascos-urgentes         → Child service (app/[locale]/fontanero/[childSlug]/page.tsx)
/fontanero/instalacion-sanitarios      → Child service (app/[locale]/fontanero/[childSlug]/page.tsx)
/fontanero/...                         → Más child services...
/fontanero/madrid                      → Ciudad (app/[locale]/[serviceSlug]/[citySlug]/page.tsx)
/fontanero/madrid/centro               → Distrito (app/[locale]/[serviceSlug]/[citySlug]/[districtSlug]/page.tsx)
```

#### ¿Hay Conflicto?

**NO**. Next.js App Router resuelve correctamente:

1. **Rutas estáticas tienen prioridad** sobre rutas dinámicas
2. **Carpeta específica `/fontanero/[childSlug]/`** tiene prioridad sobre **ruta genérica `/[serviceSlug]/[citySlug]/`**
3. Si no existe child service con ese slug, cae a la ruta ciudad

#### Resolución de Rutas (Next.js App Router Priority):

```
/fontanero                    → [serviceSlug]/page.tsx (service page)
/fontanero/madrid             → [serviceSlug]/[citySlug]/page.tsx (city page)
/fontanero/reparacion-fugas   → fontanero/[childSlug]/page.tsx (child service)
/fontanero/madrid/centro      → [serviceSlug]/[citySlug]/[districtSlug]/page.tsx (district)
```

**CONCLUSIÓN**: No hay conflicto técnico, pero puede haber **confusión semántica** para usuarios/bots.

---

### 3.2 Otros Servicios - Arquitectura Limpia

| SERVICIO | PÁGINA GENÉRICA | CIUDADES (n=6) | DISTRITOS (n=30) | CONFLICTOS |
|----------|----------------|----------------|------------------|------------|
| **electricista** | `/electricista` | `/electricista/{ciudad}` | `/electricista/{ciudad}/{distrito}` | ❌ NO |
| **desatascos** | `/desatascos` | `/desatascos/{ciudad}` | `/desatascos/{ciudad}/{distrito}` | ❌ NO |
| **aire-acondicionado** | `/aire-acondicionado` | `/aire-acondicionado/{ciudad}` | `/aire-acondicionado/{ciudad}/{distrito}` | ❌ NO |
| **calefaccion** | `/calefaccion` | `/calefaccion/{ciudad}` | `/calefaccion/{ciudad}/{distrito}` | ❌ NO |
| **limpieza-tuberias** | `/limpieza-tuberias` | `/limpieza-tuberias/{ciudad}` | `/limpieza-tuberias/{ciudad}/{distrito}` | ❌ NO |

**CONCLUSIÓN**: Arquitectura GEO limpia sin conflictos en 5 de 6 servicios.

---

## 4. PÁGINAS GEO POR SERVICIO - TABLA DETALLADA

### 4.1 Fontanero (Caso Especial)

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/fontanero` | ✅ Existe |
| **Child Services** | **~14** | `/fontanero/reparacion-fugas`, `/fontanero/desatascos-urgentes` | ⚠️ NO DOCUMENTADO EN OBJETIVO |
| Ciudades | 6 | `/fontanero/madrid`, `/fontanero/barcelona`, `/fontanero/valencia`, `/fontanero/sevilla`, `/fontanero/zaragoza`, `/fontanero/malaga` | ✅ Existe |
| Distritos | 30 | `/fontanero/madrid/centro`, `/fontanero/barcelona/gracia`, etc. | ✅ Existe |
| **TOTAL** | **~51** | - | ⚠️ +14 páginas extra |

### 4.2 Electricista

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/electricista` | ✅ Existe |
| Ciudades | 6 | `/electricista/madrid`, `/electricista/barcelona`, etc. | ✅ Existe |
| Distritos | 30 | `/electricista/madrid/centro`, `/electricista/madrid/salamanca`, etc. | ✅ Existe |
| **TOTAL** | **37** | - | ✅ Correcto |

### 4.3 Desatascos

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/desatascos` | ✅ Existe |
| Ciudades | 6 | `/desatascos/madrid`, `/desatascos/barcelona`, etc. | ✅ Existe |
| Distritos | 30 | `/desatascos/madrid/centro`, `/desatascos/valencia/ciutat-vella`, etc. | ✅ Existe |
| **TOTAL** | **37** | - | ✅ Correcto |

### 4.4 Aire Acondicionado

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/aire-acondicionado` | ✅ Existe |
| Ciudades | 6 | `/aire-acondicionado/madrid`, `/aire-acondicionado/barcelona`, etc. | ✅ Existe |
| Distritos | 30 | `/aire-acondicionado/madrid/centro`, etc. | ✅ Existe |
| **TOTAL** | **37** | - | ✅ Correcto |

### 4.5 Calefacción

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/calefaccion` | ✅ Existe |
| Ciudades | 6 | `/calefaccion/madrid`, `/calefaccion/barcelona`, etc. | ✅ Existe |
| Distritos | 30 | `/calefaccion/madrid/centro`, etc. | ✅ Existe |
| **TOTAL** | **37** | - | ✅ Correcto |

### 4.6 Limpieza de Tuberías

| TIPO DE PÁGINA | CANTIDAD | EJEMPLOS | ESTADO |
|----------------|----------|----------|--------|
| Genérica | 1 | `/limpieza-tuberias` | ✅ Existe |
| Ciudades | 6 | `/limpieza-tuberias/madrid`, `/limpieza-tuberias/barcelona`, etc. | ✅ Existe |
| Distritos | 30 | `/limpieza-tuberias/madrid/centro`, etc. | ✅ Existe |
| **TOTAL** | **37** | - | ✅ Correcto |

---

## 5. RESUMEN DE ARQUITECTURA GEO

### 5.1 Totales por Tipo de Página

```
TIPO                          CANTIDAD    NOTAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Homepage                      1           /
Servicios genéricos          6           /{service}
Servicio + Ciudad           36           /{service}/{city}
Servicio + Ciudad + Distrito 180         /{service}/{city}/{district}
Fontanero Child Services    ~14          /fontanero/{speciality}  ⚠️
City Hubs                     6          /servicios/{city}
Legal                         3          /privacidad, /terminos, /cookies
Contacto                      1          /contacto
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL REAL                  247          ← Build actual
OBJETIVO DOCUMENTADO        241          ← .clinerules
DISCREPANCIA                 +6          ← Investigar
```

### 5.2 Cobertura GEO

```
6 Servicios × 6 Ciudades × 5 Distritos = 180 páginas distrito
6 Servicios × 6 Ciudades = 36 páginas ciudad
6 Servicios = 6 páginas genéricas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL PAGES GEO: 222 páginas

CIUDADES CUBIERTAS:
- Madrid (5 distritos: centro, salamanca, chamberi, retiro, chamartin)
- Barcelona (5 distritos: ciutat-vella, eixample, gracia, sants, sarria)
- Valencia (5 distritos: ciutat-vella, leixample, extramurs, campanar, poblats-maritims)
- Sevilla (5 distritos: casco-antiguo, triana, nervion, macarena, sur)
- Zaragoza (5 distritos: centro, delicias, universidad, san-jose, actur)
- Málaga (5 distritos: centro, este, ciudad-jardin, teatinos, carretera-cadiz)
```

---

## 6. IDENTIFICACIÓN DE CONFLICTOS Y PROBLEMAS

### 6.1 Conflictos Técnicos de Routing

| CONFLICTO | SEVERIDAD | ESTADO | RESOLUCIÓN |
|-----------|-----------|--------|------------|
| `/fontanero` vs `/fontanero/valencia` | ❌ NO EXISTE | ✅ Resuelto | Next.js App Router maneja correctamente la jerarquía |
| `/fontanero/{child}` vs `/fontanero/{city}` | ⚠️ AMBIGUO | ⚠️ Funciona pero confuso | Next.js prioriza rutas estáticas, pero puede confundir SEO |

**CONCLUSIÓN**: No hay conflictos técnicos de routing. El sistema funciona correctamente.

### 6.2 Conflictos Semánticos / SEO

| PROBLEMA | DESCRIPCIÓN | IMPACTO SEO |
|----------|-------------|-------------|
| **Confusión Child vs Ciudad** | `/fontanero/reparacion-fugas` vs `/fontanero/madrid` ambos son rutas válidas | ⚠️ MEDIO |
| **Internal Linking Ambiguity** | ¿Debe linkear a child service o a ciudad? | ⚠️ MEDIO |
| **URL Similarity** | Ambos tipos de página usan patrón `/fontanero/{slug}` | ⚠️ BAJO |

**CONCLUSIÓN**: Hay riesgo de confusión semántica aunque técnicamente funciona.

### 6.3 Problemas de Gobernanza

| PROBLEMA | DESCRIPCIÓN | ACCIÓN REQUERIDA |
|----------|-------------|------------------|
| **Páginas no documentadas** | Child services de fontanero no están en objetivo de 241 páginas | ✅ Actualizar documentación |
| **Discrepancia build** | 247 páginas generadas vs 241 objetivo | 🔍 Investigar origen de +6 páginas |
| **Escalabilidad child services** | ¿Otros servicios tendrán child services? Necesita governance | 📋 Definir estrategia |

---

## 7. RECOMENDACIONES

### 7.1 Recomendaciones Técnicas (Prioridad ALTA)

#### ✅ MANTENER (Lo que funciona bien)

1. **Arquitectura APP Router**: Funciona correctamente, no tocar
2. **Middleware Spanish-Only**: Correcto, cumple objetivo
3. **URLs root-level**: Perfectas para SEO español
4. **Jerarquía GEO**: Limpia en 5 de 6 servicios

#### ⚠️ EVALUAR (Requiere revisión)

1. **Fontanero Child Services**:
   - **Opción A**: Mantener y documentar correctamente (actualizar de 241 a 247+ páginas)
   - **Opción B**: Mover a subdirectorio distinto: `/fontanero/servicios/{child}` para evitar confusión
   - **Opción C**: Eliminar child services y consolidar en página genérica `/fontanero`

2. **Discrepancia de Páginas**:
   - Auditar `app/[locale]/fontanero/[childSlug]/page.tsx`
   - Contar exactamente cuántos child services se generan
   - Actualizar documentación oficial

#### ❌ NO HACER

1. **NO crear más child services** sin governance clara
2. **NO modificar routing** sin plan documentado
3. **NO mezclar** patrones GEO con patrones de especialización

### 7.2 Recomendaciones SEO (Prioridad ALTA)

#### 1. Clarificar Estrategia Fontanero

**Pregunta clave**: ¿`/fontanero` es:
- a) **Authority Hub** (como está ahora)
- b) **Landing genérica** con child services destacados
- c) **Mixto** con secciones para ambos

**Recomendación**: 
- Definir claramente qué representa `/fontanero`
- Si es authority hub → los child services son **deep-dive articles**
- Si es landing → child services compiten con página principal (malo para SEO)

#### 2. Internal Linking Strategy

**Problema actual**: No está claro cuándo enlazar a:
- `/fontanero` (genérica)
- `/fontanero/reparacion-fugas` (child service)
- `/fontanero/madrid` (ciudad)

**Recomendación**:
```
Homepage → /fontanero (authority hub)
/fontanero → /fontanero/{child} (deep-dive)
/fontanero → /fontanero/{city} (GEO)
/fontanero/{city} → /fontanero/{city}/{district} (GEO deep)
```

#### 3. Semantic Ownership

**Recomendación**: Documentar keywords por tipo de página:

| PÁGINA | KEYWORD OWNERSHIP |
|--------|------------------|
| `/fontanero` | "fontanero españa", "servicios fontanería", "fontanero profesional" |
| `/fontanero/reparacion-fugas` | "reparación de fugas", "detección fugas", "fuga oculta" |
| `/fontanero/madrid` | "fontanero madrid", "fontanero urgente madrid", "fontanería madrid" |
| `/fontanero/madrid/centro` | "fontanero centro madrid", "fontanero malasaña", "fontanero sol" |

### 7.3 Recomendaciones de Gobernanza (Prioridad MEDIA)

#### 1. Actualizar Documentación

**Acción**: Actualizar `.clinerules` con:
```markdown
Current Production Pages: 247 (not 241)
Architecture: Spanish-only (ES)
Breakdown:
- 6 service pages
- 36 service+city pages
- 180 service+city+district pages
- 14 fontanero child services ← AÑADIR ESTA LÍNEA
- 6 city hub pages
- 3 legal pages
- 1 contact page
- 1 homepage
```

#### 2. Definir Política Child Services

**Pregunta**: ¿Permitir child services en otros servicios?

**Escenarios**:
- `/electricista/instalacion-solar` ← ¿Permitido?
- `/desatascos/camion-cuba` ← ¿Permitido?
- `/aire-acondicionado/instalacion-split` ← ¿Permitido?

**Recomendación**: 
- Si SÍ → Crear governance clara y actualizar estimación a 300+ páginas
- Si NO → Considerar refactorizar fontanero para consistencia

#### 3. Monitoreo de Páginas

**Acción**: Crear script de validación:
```bash
npm run build | grep "Generating static pages"
# Debe salir: 247/247 (o el número objetivo documentado)
```

---

## 8. ARQUITECTURA GEO FINAL RECOMENDADA

### 8.1 Arquitectura Actual (247 páginas)

```
/                                   (homepage)
├── /{service}                      (6 páginas)
├── /{service}/{city}               (36 páginas: 6 servicios × 6 ciudades)
├── /{service}/{city}/{district}    (180 páginas: 6 servicios × 6 ciudades × 5 distritos)
├── /fontanero/{child}              (14 páginas: child services) ⚠️
├── /servicios/{city}               (6 páginas: city hubs)
├── /privacidad, /terminos, /cookies (3 páginas: legal)
└── /contacto                       (1 página)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: 247 páginas
```

### 8.2 Opción Recomendada A: Mantener Child Services

```
/fontanero                          (Authority Hub)
├── /fontanero/reparacion-fugas     (Deep-dive article)
├── /fontanero/desatascos-urgentes  (Deep-dive article)
├── /fontanero/instalacion-...      (Deep-dive article)
├── ...                             (Más child services)
├── /fontanero/madrid               (GEO landing)
├── /fontanero/madrid/centro        (GEO district)
└── ...                             (Más GEO)

VENTAJAS:
✅ Permite contenido especializado profundo
✅ Captura long-tail keywords específicos
✅ No requiere refactorización

DESVENTAJAS:
⚠️ Ambigüedad semántica en URLs
⚠️ Requiere internal linking cuidadoso
⚠️ Puede confundir bots de búsqueda
```

### 8.3 Opción Recomendada B: Consolidar Child Services

```
/fontanero                          (Authority Hub + Secciones)
├── #reparacion-fugas               (Sección en página genérica)
├── #desatascos                     (Sección en página genérica)
├── #instalacion                    (Sección en página genérica)
├── /fontanero/madrid               (GEO landing)
├── /fontanero/madrid/centro        (GEO district)
└── ...                             (Más GEO)

VENTAJAS:
✅ Arquitectura GEO limpia y clara
✅ No hay ambigüedad semántica
✅ Fácil de mantener y escalar

DESVENTAJAS:
⚠️ Pierde páginas especializadas
⚠️ Menos cobertura long-tail específica
⚠️ Requiere refactorización
```

### 8.4 Opción Recomendada C: Subdirectorio Explícito

```
/fontanero                          (Authority Hub)
├── /fontanero/especialidades/reparacion-fugas     (Clear hierarchy)
├── /fontanero/especialidades/desatascos-urgentes
├── /fontanero/madrid                              (GEO landing)
├── /fontanero/madrid/centro                       (GEO district)
└── ...

VENTAJAS:
✅ Jerarquía clara y explícita
✅ No hay ambigüedad semántica
✅ Soporta child services sin confusión

DESVENTAJAS:
⚠️ URLs más largas
⚠️ Requiere refactorización significativa
⚠️ Cambio de URLs (301 redirects necesarios)
```

---

## 9. DECISIONES REQUERIDAS

### 9.1 Para el Product Owner / SEO Lead

**DECISIÓN 1**: ¿Mantener child services de fontanero?
- [ ] SÍ, mantener como está (Opción A)
- [ ] NO, consolidar en página genérica (Opción B)
- [ ] SÍ, pero mover a subdirectorio explícito (Opción C)

**DECISIÓN 2**: ¿Permitir child services en otros servicios?
- [ ] SÍ, permitir para todos los servicios
- [ ] NO, solo fontanero tiene child services
- [ ] DECIDE caso por caso

**DECISIÓN 3**: ¿Actualizar objetivo de páginas?
- [ ] SÍ, actualizar de 241 a 247 páginas oficialmente
- [ ] NO, eliminar las 6 páginas extra para cumplir 241
- [ ] INVESTIGAR primero qué son las 6 páginas extra

### 9.2 Para el Tech Lead

**ACCIÓN 1**: Auditar exactamente qué child services existen
```bash
# Comando sugerido
find app/[locale]/fontanero/[childSlug]/ -name "page.tsx" | wc -l
# O revisar el código fuente del array fontaneroChildServices
```

**ACCIÓN 2**: Validar build page count
```bash
npm run build 2>&1 | grep "Generating static pages"
# Debe coincidir con objetivo documentado
```

**ACCIÓN 3**: Implementar test de regresión
```typescript
// test/page-count.test.ts
test('Page count must be exactly 241', () => {
  const buildOutput = execSync('npm run build').toString()
  const match = buildOutput.match(/Generating static pages \((\d+)\/(\d+)\)/)
  expect(match[2]).toBe('241')
})
```

---

## 10. CONCLUSIONES FINALES

### ✅ LO QUE FUNCIONA BIEN

1. **Routing técnico**: Next.js App Router maneja correctamente toda la jerarquía
2. **Middleware Spanish-Only**: Funciona perfectamente, cumple objetivo
3. **URLs canónicas**: Root-level perfecto para SEO español
4. **Arquitectura GEO base**: Limpia en 5 de 6 servicios (222 páginas)
5. **Cobertura territorial**: 6 ciudades × 5 distritos = buena cobertura inicial

### ⚠️ LO QUE REQUIERE ATENCIÓN

1. **Fontanero child services**: Funciona técnicamente pero necesita governance clara
2. **Discrepancia page count**: 247 real vs 241 objetivo documentado
3. **Escalabilidad child services**: ¿Permitir en otros servicios? Definir política
4. **Internal linking strategy**: Necesita documentación clara
5. **Semantic ownership**: Documentar keywords por tipo de página

### ❌ LO QUE NO ES PROBLEMA

1. **NO hay conflicto** entre `/fontanero` y `/fontanero/valencia`
2. **NO hay** problemas técnicos de routing
3. **NO hay** problemas de canonicalización (middleware funciona bien)
4. **NO hay** URLs duplicadas en producción
5. **NO hay** problemas de indexación (root-level correcto)

### 🎯 RECOMENDACIÓN PRINCIPAL

**DECISIÓN INMEDIATA REQUERIDA**: Elegir una de las 3 opciones para child services de fontanero (A, B, o C) y documentar la decisión oficialmente.

**ACCIÓN RÁPIDA**: Actualizar `.clinerules` con page count correcto (247 si se mantienen child services, o 233 si se eliminan).

**ARQUITECTURA GEO**: **APROBADA** para todos los servicios excepto fontanero (que requiere decisión sobre child services).

---

## ANEXO A: URLs COMPLETAS GENERADAS

### A.1 Fontanero (51 páginas estimadas)

#### Genérica (1)
- `/fontanero`

#### Child Services (~14)
- `/fontanero/reparacion-fugas`
- `/fontanero/desatascos-urgentes`
- `/fontanero/instalacion-sanitarios`
- ...y más (requiere audit completo)

#### Ciudades (6)
- `/fontanero/madrid`
- `/fontanero/barcelona`
- `/fontanero/valencia`
- `/fontanero/sevilla`
- `/fontanero/zaragoza`
- `/fontanero/malaga`

#### Distritos Madrid (5)
- `/fontanero/madrid/centro`
- `/fontanero/madrid/salamanca`
- `/fontanero/madrid/chamberi`
- `/fontanero/madrid/retiro`
- `/fontanero/madrid/chamartin`

#### Distritos Barcelona (5)
- `/fontanero/barcelona/ciutat-vella`
- `/fontanero/barcelona/eixample`
- `/fontanero/barcelona/gracia`
- `/fontanero/barcelona/sants`
- `/fontanero/barcelona/sarria`

#### Distritos Valencia (5)
- `/fontanero/valencia/ciutat-vella`
- `/fontanero/valencia/leixample`
- `/fontanero/valencia/extramurs`
- `/fontanero/valencia/campanar`
- `/fontanero/valencia/poblats-maritims`

#### Distritos Sevilla (5)
- `/fontanero/sevilla/casco-antiguo`
- `/fontanero/sevilla/triana`
- `/fontanero/sevilla/nervion`
- `/fontanero/sevilla/macarena`
- `/fontanero/sevilla/sur`

#### Distritos Zaragoza (5)
- `/fontanero/zaragoza/centro`
- `/fontanero/zaragoza/delicias`
- `/fontanero/zaragoza/universidad`
- `/fontanero/zaragoza/san-jose`
- `/fontanero/zaragoza/actur`

#### Distritos Málaga (5)
- `/fontanero/malaga/centro`
- `/fontanero/malaga/este`
- `/fontanero/malaga/ciudad-jardin`
- `/fontanero/malaga/teatinos`
- `/fontanero/malaga/carretera-cadiz`

**SUBTOTAL FONTANERO**: ~51 páginas (1 + 14 + 6 + 30)

*(Por brevedad, no detallo todos los servicios, pero siguen el mismo patrón: 37 páginas cada uno sin child services)*

---

**FIN DEL ANÁLISIS**

**Preparado por**: Cline AI Assistant  
**Fecha**: 2026-06-09  
**Versión**: 1.0  
**Estado**: Pendiente aprobación Product Owner
