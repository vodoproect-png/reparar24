#!/usr/bin/env ts-node
/**
 * Ahrefs Keyword Classifier (REVIEW MODE)
 *
 * PURPOSE:
 * Reads raw Ahrefs keyword exports from .tmp/ahrefs/ and classifies keywords
 * into approved existing targets, future candidates, rejected clusters, and
 * needs-review buckets.
 *
 * SAFETY:
 * - Does NOT modify data/seo
 * - Does NOT modify page-registry
 * - Does NOT create routes or pages
 * - Writes review output only to .tmp/semantic-review/
 */

const fs = require('fs');
const path = require('path');

type Bucket = 'approved-target' | 'future-candidate' | 'rejected' | 'needs-review';

interface AhrefsKeywordRow {
  keyword: string;
  volume?: number | null;
  difficulty?: number | null;
  cpc?: number | null;
  traffic_potential?: number | null;
}

interface ClassifiedKeyword extends AhrefsKeywordRow {
  bucket: Bucket;
  target?: string;
  reason: string;
}

interface ClassificationSummary {
  total: number;
  approvedTarget: number;
  futureCandidate: number;
  rejected: number;
  needsReview: number;
}

const REJECT_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\b(herramienta|herramientas|material electrico|material eléctrico|tienda|tiendas|fabricante|fabricantes|proveedor|proveedores|distribuidor|distribuidores|mayorista|showroom|catalogo|catálogo|almacen|almacén)\b/i, reason: 'Product/store/manufacturer intent, not service intent' },
  { pattern: /\b(adaptador|adaptadores|portalamparas|portalámparas|lampara|lámpara|e27|comprar|cargador|iphone|embellecedor|embellecedores)\b/i, reason: 'Consumer product intent, not electrician service intent' },
  { pattern: /\b(tijera|tijeras|guante|guantes|bota|botas|destornillador|destornilladores|alicate|alicates|pinza|pinzas|maleta|mochila|bolso|bolsa|casco|uniforme|ropa)\b/i, reason: 'Tool/equipment product intent' },
  { pattern: /\b(leroy merlin|bricodepot|amazon|wurth|wuerth|knipex|facom|milwaukee|stanley|bosch|simon|schneider|ikea|legrand|niloe|niessen)\b/i, reason: 'Retail/brand product intent' },
  { pattern: /\b(coche|auto|vehiculo|vehГ­culo|freno|peugeot|ibiza|seat|12v)\b/i, reason: 'Vehicle/auto electrical intent, not home electrician service intent' },
  { pattern: /\b(curso|cursos|fp|formacion|formación|certificado profesionalidad|carnet electricista|trabajo|empleo|oferta empleo|sueldo|salario|autonomo|autónomo)\b/i, reason: 'Education/job intent, not customer service intent' },
  { pattern: /\b(logo|dibujo|icono|icon)\b/i, reason: 'Design/asset intent, not service intent' },
  { pattern: /\bla casa del electricista\b/i, reason: 'Third-party brand/navigation intent' },
];

REJECT_PATTERNS.unshift(
  { pattern: /\b(metro|fgv|renfe|endesa|iberdrola|red electrica|red elГ©ctrica|noticia|noticias|hoy|corte programado|apag[oГі]n general|incidencia suministro)\b/i, reason: 'Public utility, transport, news or outage-status intent, not electrician service intent' },
  { pattern: /\b(automovil|automoviles|autom[oГі]vil|autom[oГі]viles|coches|nautico|n[ГЎa]utico|autocaravana)\b/i, reason: 'Vehicle, marine or caravan electrical intent, not home electrician service intent' },
  { pattern: /\b(pdf|manual tecnico|manual t[Г©e]cnico|plc|libro|guia|gu[Г­i]a)\b/i, reason: 'Document/manual/informational intent, not service intent' },
  { pattern: /\b(carnet|carn[Г©e]|obtener|cuanto gana|cu[ГЎa]nto gana|salario|sueldo|se necesita|peon|pe[Гіo]n)\b/i, reason: 'Qualification, salary or employment intent, not customer service intent' },
  { pattern: /\b(se busca|oferta electricista|ofertas electricista|ofertas de electricista|oferta de electricista|oposiciones|convenio colectivo|ayuntamiento|mano de obra electricista)\b/i, reason: 'Employment, labor-market or institutional intent, not customer service intent' },
  { pattern: /\b(milanuncios|mil anuncios|wallapop|habitissimo|cronoshare)\b/i, reason: 'Classifieds/directory marketplace intent, not owned service-page intent' },
  { pattern: /\b(campillo|mgelectric|el amigo electricista|jmp electricista|vlr|sanchez)\b/i, reason: 'Third-party brand/navigation intent' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(como|cГіmo|cómo|limpiar|sin cortar corriente|a espaГ±ol|a español|en ingles|en inglés|ingles|inglés)\b/i, reason: 'DIY/how-to or translation intent, not service landing-page intent' },
  { pattern: /\b(tarifa|tarifas|precio electricidad|bono social|comercializadora|ufd|suministra electricidad|suministro electrico|interrupcion servicio electrico|interrupcion de servicio electrico|caida del servicio electrico)\b/i, reason: 'Utility, tariff or supply-company intent, not electrician service intent' },
  { pattern: /\b(bicicleta electrica|bici electrica|patineta electrica|guitarra electrica|maquinaria electrica|motor electrico|direccion electrica|termo electrico|persiana electrica|carro electrico|autos|auto)\b/i, reason: 'Non-core appliance, vehicle or machinery repair intent, not home electrician service intent' },
  { pattern: /\b(industrial|instrumentacion|ingenieria|control industrial|montaje y mantenimiento electrico electronico|electrico electronico)\b/i, reason: 'Industrial engineering or B2B maintenance intent, outside current residential electrician scope' },
  { pattern: /\b(bricolaje|casero|linea de tiempo|magnetismo|eso|teorema|teoremas|propiedades|que significa|que es electricidad|generan electricidad|historia de la electricidad|programa de electricidad|tecnologia electricidad|curriculum vitae|curriculum|cv electricista)\b/i, reason: 'Educational, CV or broad informational intent, not service intent' },
  { pattern: /\b(base toma corriente|bases toma|cable toma corriente|caja empotrar|cajas de luz|toma corriente trifasica|toma corriente 25a|altavoces sin toma corriente|calentador electrico|generador electrico|port[oГі]n electrico)\b/i, reason: 'Product/component or non-core equipment intent, not service landing-page intent' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(wordreference|in english|voordelen|per le aziende|per industrie|corso|tutorial|online|bonus 110)\b/i, reason: 'Translation, foreign-language, course or document intent, not local smart-home service intent' },
  { pattern: /\b(tendencias|tips|objetivos|usos|ejemplos|que es la domotica|tipos de sensores|medios de transmision|elementos casa|portada)\b/i, reason: 'Informational smart-home intent, not service landing-page intent' },
  { pattern: /\b(dispositivo|dispositivos|software|controlador|modulo|sistema centralizado|siri|alexa|tapo|bticino|x10|risco|came|arduino|raspberry|philips|wago|vaillant|aquara|eedomus|ezviz|zelio|bricomart)\b/i, reason: 'Smart-home product, brand or platform intent, not electrician service intent' },
  { pattern: /\b(treviso|adeje|aviles|caceres|velez malaga|velez málaga|rincon de la victoria|rincón de la victoria)\b/i, reason: 'Out-of-market geo intent for current Valencia service page' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(copisteria|expert|ioio|hospitales|final de carrera|telefono|sai|simbolo|can x|e-domotica|ipod|laten installeren|controllo remoto|telegram|iberica|lo mejor)\b/i, reason: 'Navigation, foreign-language, platform or non-service smart-home intent' },
  { pattern: /\b(industriale|industrial|knx domotica en velez|knx domotica en vélez|zwave|comunicacion domotica|comunicación domotica)\b/i, reason: 'Industrial, protocol or technical smart-home intent outside current local service scope' },
  { pattern: /\b(domotica agua|domotica para mayores|problemas de domotica|domotica sistema|domotica calefaccion central)\b/i, reason: 'Ambiguous smart-home topic; not clear electrician service landing-page intent' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(normativa mantenimiento electrico|plantilla mantenimiento electrico|modelo de contrato|manual de mantenimiento electrico|plan de mantenimiento|libro de registro|importancia del mantenimiento electrico|mantenimiento electrico dibujos)\b/i, reason: 'Document, template, regulation or informational maintenance intent, not service landing-page intent' },
  { pattern: /\b(tecnico mantenimiento electrico|supervisor mantenimiento electrico|posgrado mantenimiento electrico|montaje y mantenimiento electrico y electronico|mantenimiento electrico y electronico)\b/i, reason: 'Job, training or technical education maintenance intent, not customer service intent' },
  { pattern: /\b(mantenimiento electrico (sevilla|huelva|bierzo|gerninka|gernika|barcelona|madrid|bogota|badalona|zaragoza)|empresas de mantenimiento electrico en (sevilla|madrid)|empresas mantenimiento electrico madrid|mantenimiento electrico general gernika|tresa mantenimiento electrico ciudad real)\b/i, reason: 'Out-of-market geo or third-party navigation maintenance intent' },
  { pattern: /\b(drones mantenimiento electrico|mantenimiento electrico mercadona)\b/i, reason: 'Non-local or third-party maintenance intent, not current service page intent' },
  { pattern: /\b(mantenimiento (cortacesped|autobus|martillo|bajo|patinete|transformador) electrico|mantenimiento de (patinete|un transformador|bajo) electrico)\b/i, reason: 'Non-core equipment or vehicle maintenance intent, not electrician service landing-page intent' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(revision electrica automotriz|revision tecnica moto electrica|revision caldera electrica)\b/i, reason: 'Vehicle, motorcycle or appliance revision intent, not electrician service landing-page intent' },
  { pattern: /\b(revision electrica en cordoba)\b/i, reason: 'Out-of-market geo intent for current Valencia service page' },
  { pattern: /\b(edp revision electrica|revision electrica edp|revision instalacion electrica edp)\b/i, reason: 'Utility company navigation intent, not owned service-page intent' },
  { pattern: /\b(caja de revision electrica|cajas de revision electrica)\b/i, reason: 'Product/component intent, not electrical inspection service intent' },
  { pattern: /\b(revision electrica funciona)\b/i, reason: 'Informational query, not service landing-page intent' },
);

REJECT_PATTERNS.unshift(
  { pattern: /\b(planeta tierra|la tierra|espacio|universo|fisica|geografia|puesta de sol|luz en la tierra)\b/i, reason: 'Science, geography or non-service earth intent, not electrical grounding service intent' },
  { pattern: /\b(toma de tierra guitarra|guitarra toma tierra|bajo electrico toma tierra|amplificador toma tierra)\b/i, reason: 'Musical equipment grounding intent, not home electrical grounding service intent' },
  { pattern: /\b(videoportero wifi|videoportero inalambrico|videoportero 2 hilos|videoportero ip|kit videoportero|comprar videoportero|precio videoportero fermax|fermax|tegui|golmar|bticino)\b/i, reason: 'Video intercom product, kit, brand or shopping intent, not service landing-page intent' },
);

const NEEDS_REVIEW_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\b(nataly|justicia|sanidad|solar)\b/i, reason: 'Ambiguous entity or non-standard service intent; requires human review' },
  { pattern: /\b(como|cómo|limpiar|altura|conexiones|sin cortar corriente|ingles|inglés|a español)\b/i, reason: 'DIY/informational or ambiguous intent; requires human review before production use' },
];

const FUTURE_PATTERNS: Array<{ pattern: RegExp; target: string; reason: string }> = [
  { pattern: /\b(boletin|boletín|certificado electrico|certificado eléctrico|cie electrico|cie eléctrico|legalizacion|legalización)\b/i, target: 'certificados-electricos', reason: 'Compliance/certificate intent; separate future service family' },
  { pattern: /\b(cargador coche electrico|cargador coche eléctrico|punto de recarga|wallbox)\b/i, target: 'cargador-coche-electrico', reason: 'EV charger installation; future specialized category' },
  { pattern: /\b(domotica|domótica|casa inteligente|hogar inteligente)\b/i, target: 'domotica', reason: 'Smart-home intent; future category, semantic boundary needed' },
];

FUTURE_PATTERNS.push(
  { pattern: /\b(mantenimiento electrico|empresas mantenimiento electrico|empresas de mantenimiento electrico)\b/i, target: 'mantenimiento-electrico', reason: 'Electrical maintenance service intent; future category, semantic boundary needed' },
  { pattern: /\b(mantenimiento sistema electrico|mantenimiento de sistema electrico|mantenimiento instalacion electrica|mantenimiento de instalacion electrica)\b/i, target: 'mantenimiento-electrico', reason: 'Electrical system maintenance service intent; future category, semantic boundary needed' },
  { pattern: /\b(revision electrica|revision periodica electrica|revision electrica domiciliaria|revision instalacion electrica|revision periodica instalacion electrica|revision de instalacion electrica|revision de la instalacion electrica|presupuesto revision instalacion electrica|precio revision instalacion electrica)\b/i, target: 'revision-electrica', reason: 'Electrical inspection/revision service intent; future category, semantic boundary needed' },
  { pattern: /\b(videoportero|portero automatico|telefonillo|interfono)\b/i, target: 'videoportero-portero-automatico', reason: 'Video intercom, door entry or telephone entry service intent; future category, semantic boundary needed' },
  { pattern: /\b(puesta a tierra|toma de tierra|toma tierra|sin toma de tierra|instalar toma tierra|medicion toma tierra|medir toma tierra|resistencia de tierra)\b/i, target: 'puesta-a-tierra', reason: 'Electrical grounding service intent; future category, semantic boundary needed' },
);

const EARLY_FUTURE_PATTERNS: Array<{ pattern: RegExp; target: string; reason: string }> = [
  {
    pattern: /\b(instalar|instalacion|instalación|instalaciГіn|poner|colocar|presupuesto|instalador|quien instala)\b.*\b(cargador(?: de)? coche electrico|cargador(?: de)? coche eléctrico|wallbox|punto de recarga)\b|\b(cargador(?: de)? coche electrico|cargador(?: de)? coche eléctrico|wallbox|punto de recarga)\b.*\b(instalar|instalacion|instalación|instalaciГіn|poner|colocar|presupuesto|instalador|garaje|comunitario)\b/i,
    target: 'cargador-coche-electrico',
    reason: 'EV charger installation service intent; future specialized category',
  },
];

FUTURE_PATTERNS.unshift(
  { pattern: /\b(certificado instalacion electrica|certificado instalaciГіn elГ©ctrica|legalizar)\b/i, target: 'certificados-electricos', reason: 'Compliance/certificate intent; separate future service family' },
);

FUTURE_PATTERNS.unshift(
  { pattern: /\b(oca|obligatoria|obligacion)\b.*\b(revision|instalacion electrica)|\b(revision|instalacion electrica)\b.*\b(oca|obligatoria|obligacion)\b/i, target: 'certificados-electricos', reason: 'Regulatory/OCA inspection intent; separate future certificate/compliance family' },
);

const APPROVED_TARGET_PATTERNS: Array<{ pattern: RegExp; target: string; reason: string }> = [
  { pattern: /\b(urgente|urgencia|urgencias|24h|24 horas|emergencia|guardia|noches|festivos)\b/i, target: 'urgencias-electricas', reason: 'Emergency electrician intent mapped to existing page' },
  { pattern: /\b(averia|avería|averias|averías|reparacion electrica|reparación eléctrica|fallo electrico|fallo eléctrico|cortocircuito|salta el diferencial|saltan los plomos|no hay luz)\b/i, target: 'averias-electricas', reason: 'Electrical repair/fault intent mapped to existing page' },
  { pattern: /\b(instalacion electrica|instalación eléctrica|instalaciones electricas|instalaciones eléctricas|cableado|reforma electrica|reforma eléctrica|punto de luz)\b/i, target: 'instalaciones-electricas', reason: 'Installation intent mapped to existing page' },
  { pattern: /\b(cuadro electrico|cuadro eléctrico|cuadros electricos|cuadros eléctricos|diferencial|magnetotermico|magnetotérmico)\b/i, target: 'cuadros-electricos', reason: 'Electrical panel intent mapped to existing page' },
  { pattern: /\b(enchufe|enchufes|interruptor|interruptores|toma corriente|tomas corriente|tomacorriente|tomacorrientes)\b/i, target: 'enchufes-interruptores', reason: 'Outlet/switch intent mapped to existing page' },
  { pattern: /\b(iluminacion led|iluminación led|luces led|focos led|iluminacion exterior|iluminación exterior|iluminacion interior|iluminación interior)\b/i, target: 'iluminacion-led', reason: 'LED lighting intent mapped to existing page' },
];

function showHelp(): void {
  console.log('Ahrefs Keyword Classifier - Help');
  console.log('================================\n');
  console.log('USAGE:');
  console.log('  npm run classify:ahrefs -- --input latest --service electricista');
  console.log('  npm run classify:ahrefs -- --input .tmp/ahrefs/file.json --service electricista\n');
  console.log('OPTIONS:');
  console.log('  --input <path|latest>   Ahrefs JSON file or latest (required)');
  console.log('  --service <service>     Service context, default: electricista');
  console.log('  --help                  Show this help message\n');
  console.log('OUTPUT:');
  console.log('  .tmp/semantic-review/{timestamp}-{service}-{seed}.json\n');
}

function parseArgs(): { input: string; service: string } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const inputIndex = args.indexOf('--input');
  const serviceIndex = args.indexOf('--service');

  if (inputIndex === -1 || !args[inputIndex + 1]) {
    console.error('Missing required argument: --input\n');
    showHelp();
    process.exit(1);
  }

  return {
    input: args[inputIndex + 1],
    service: serviceIndex !== -1 && args[serviceIndex + 1] ? args[serviceIndex + 1] : 'electricista',
  };
}

function getLatestAhrefsFile(): string {
  const dir = path.join(process.cwd(), '.tmp', 'ahrefs');

  if (!fs.existsSync(dir)) {
    throw new Error('No .tmp/ahrefs directory found. Run import:ahrefs first.');
  }

  const files = fs.readdirSync(dir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => ({
      file,
      mtime: fs.statSync(path.join(dir, file)).mtimeMs,
    }))
    .sort((a: any, b: any) => b.mtime - a.mtime);

  if (files.length === 0) {
    throw new Error('No Ahrefs JSON files found in .tmp/ahrefs.');
  }

  return path.join(dir, files[0].file);
}

function resolveInput(input: string): string {
  if (input === 'latest') {
    return getLatestAhrefsFile();
  }

  const fullPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Input file not found: ${input}`);
  }

  return fullPath;
}

function extractKeywords(rawExport: any): AhrefsKeywordRow[] {
  const rows = rawExport?.raw?.keywords;

  if (!Array.isArray(rows)) {
    throw new Error('Unsupported Ahrefs export shape: expected raw.keywords array.');
  }

  return rows
    .filter((row: any) => row && typeof row.keyword === 'string')
    .map((row: any) => ({
      keyword: row.keyword,
      volume: row.volume ?? null,
      difficulty: row.difficulty ?? null,
      cpc: row.cpc ?? null,
      traffic_potential: row.traffic_potential ?? null,
    }));
}

function classifyKeyword(row: AhrefsKeywordRow): ClassifiedKeyword {
  const keyword = row.keyword.toLowerCase();

  if (/\b(boletin|boletГ­n|certificado|cie|legalizacion|legalizaciГіn|legalizar)\b/i.test(keyword)) {
    return {
      ...row,
      bucket: 'future-candidate',
      target: 'certificados-electricos',
      reason: 'Compliance/certificate intent; separate future service family',
    };
  }

  if (/\b(instalar|cambiar|sustituir|reemplazar|montar)\b.*\b(bombilla|bombillas|lampara|lamparas|plafon|plafones|aplique|apliques|ventilador de techo)\b|\b(bombilla|bombillas|lampara|lamparas|plafon|plafones|aplique|apliques|ventilador de techo)\b.*\b(instalar|cambiar|sustituir|reemplazar|montar)\b/i.test(keyword)) {
    return {
      ...row,
      bucket: 'future-candidate',
      target: 'pequenos-trabajos-electricos',
      reason: 'Small electrical job intent; future service category boundary needed',
    };
  }

  for (const rule of EARLY_FUTURE_PATTERNS) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'future-candidate', target: rule.target, reason: rule.reason };
    }
  }

  for (const rule of REJECT_PATTERNS) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'rejected', reason: rule.reason };
    }
  }

  for (const rule of NEEDS_REVIEW_PATTERNS) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'needs-review', reason: rule.reason };
    }
  }

  for (const rule of FUTURE_PATTERNS) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'future-candidate', target: rule.target, reason: rule.reason };
    }
  }

  for (const rule of APPROVED_TARGET_PATTERNS) {
    if (rule.pattern.test(keyword)) {
      return { ...row, bucket: 'approved-target', target: rule.target, reason: rule.reason };
    }
  }

  if (/\belectricista(s)?\b/i.test(keyword)) {
    return {
      ...row,
      bucket: 'approved-target',
      target: 'electricista',
      reason: 'Generic electrician service intent mapped to hub',
    };
  }

  if (/\bservicios? electricos?\b/i.test(keyword)) {
    return {
      ...row,
      bucket: 'approved-target',
      target: 'electricista',
      reason: 'Generic electrical service intent mapped to hub',
    };
  }

  return {
    ...row,
    bucket: 'needs-review',
    reason: 'No deterministic rule matched; requires human semantic review',
  };
}

function summarize(classified: ClassifiedKeyword[]): ClassificationSummary {
  return {
    total: classified.length,
    approvedTarget: classified.filter(item => item.bucket === 'approved-target').length,
    futureCandidate: classified.filter(item => item.bucket === 'future-candidate').length,
    rejected: classified.filter(item => item.bucket === 'rejected').length,
    needsReview: classified.filter(item => item.bucket === 'needs-review').length,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

function writeReviewFile(service: string, sourceExport: any, inputPath: string, classified: ClassifiedKeyword[]): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'semantic-review');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const seedSlug = slugify(sourceExport.seed || path.basename(inputPath, '.json'));
  const outputPath = path.join(outputDir, `${timestamp}-${service}-${seedSlug}.json`);

  const summary = summarize(classified);
  const grouped = {
    approvedTarget: classified.filter(item => item.bucket === 'approved-target'),
    futureCandidate: classified.filter(item => item.bucket === 'future-candidate'),
    rejected: classified.filter(item => item.bucket === 'rejected'),
    needsReview: classified.filter(item => item.bucket === 'needs-review'),
  };

  const result = {
    source: 'ahrefs-classifier',
    service,
    inputFile: path.relative(process.cwd(), inputPath),
    seed: sourceExport.seed,
    country: sourceExport.country,
    classifiedAt: new Date().toISOString(),
    summary,
    grouped,
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  return outputPath;
}

function printSummary(outputPath: string, summary: ClassificationSummary, classified: ClassifiedKeyword[]): void {
  console.log('\nClassification Summary');
  console.log('======================');
  console.log(`Total:             ${summary.total}`);
  console.log(`Approved targets:  ${summary.approvedTarget}`);
  console.log(`Future candidates: ${summary.futureCandidate}`);
  console.log(`Rejected:          ${summary.rejected}`);
  console.log(`Needs review:      ${summary.needsReview}`);

  const targets = Array.from(new Set(classified.map(item => item.target).filter(Boolean)));
  if (targets.length > 0) {
    console.log(`\nTargets detected: ${targets.join(', ')}`);
  }

  console.log(`\nSaved review to: ${path.relative(process.cwd(), outputPath)}`);
  console.log('\nNo production files were modified.');
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const inputPath = resolveInput(options.input);
  const sourceExport = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const keywords = extractKeywords(sourceExport);
  const classified = keywords.map(classifyKeyword);
  const outputPath = writeReviewFile(options.service, sourceExport, inputPath, classified);

  printSummary(outputPath, summarize(classified), classified);
}

try {
  main();
} catch (error: any) {
  console.error(`\nClassification failed: ${error.message}\n`);
  process.exit(1);
}
