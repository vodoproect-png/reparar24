/**
 * Fontanero Child Services SEO Data
 * Source: data/fontanero/SEO_MASTER_FONTANERO.xlsx
 * 
 * CRITICAL: This file contains SEO-specific content for fontanero child service pages.
 * Each service uses ONLY its assigned keywords from the Excel file to avoid cannibalization.
 * 
 * Pages:
 * - /fontanero/reparacion-fugas (PRIMARY_KW: reparación fugas agua)
 * - /fontanero/desatascos (PRIMARY_KW: desatascos)
 * - /fontanero/instalaciones (PRIMARY_KW: instalación fontanería)
 * - /fontanero/sustitucion-tuberias (PRIMARY_KW: sustitución tuberías)
 * - /fontanero/calentadores-termos (PRIMARY_KW: termo eléctrico)
 * - /fontanero/mantenimiento (PRIMARY_KW: mantenimiento fontanería)
 */

import type { SeoContentSectionV1Props } from '@/components/ds/SeoContentSectionV1'
import {
  Droplets,
  Wrench,
  Gauge,
  Flame,
  ShowerHead,
  Toilet,
  Zap,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'

export interface ChildServiceData {
  h1: string
  metaTitle: string
  metaDescription: string
  lockedPrimaryKw: string
  secondaryKw: string[]
  seoBlockKw: string[]
  faqKw: string[]
  contentBrief: string
  description: string
  seoContent: SeoContentSectionV1Props
  faqs: { question: string; answer: string }[]
}

export const childServicesData: Record<string, ChildServiceData> = {
  'reparacion-fugas': {
    h1: 'Reparación de Fugas de Agua',
    metaTitle: 'Reparación de Fugas de Agua | Detección y Solución Rápida',
    metaDescription: 'Especialistas en reparación y detección de fugas de agua. Localizamos fugas ocultas y reparamos con garantía y presupuesto previo.',
    lockedPrimaryKw: 'reparación fugas agua',
    secondaryKw: ['fuga de agua', 'como localizar una fuga de agua en una tubería enterrada', 'precio detectar fuga de agua', 'fuga de agua en casa', 'detector de fuga de agua', 'detector fuga de agua', 'como tapar una fuga de agua con presión', 'como detectar una fuga de agua'],
    seoBlockKw: ['reparación fugas agua', 'fuga de agua', 'como localizar una fuga de agua en una tubería enterrada', 'precio detectar fuga de agua', 'fuga de agua en casa', 'detector de fuga de agua', 'detector fuga de agua', 'como tapar una fuga de agua con presión', 'como detectar una fuga de agua', 'como tapar una fuga de agua en un tubo de pvc'],
    faqKw: ['como localizar una fuga de agua en una tubería enterrada', 'precio detectar fuga de agua', 'como tapar una fuga de agua con presión', 'como detectar una fuga de agua', 'como tapar una fuga de agua en un tubo de pvc', 'como saber si tengo una fuga de agua en casa', 'como detectar fuga de agua en casa', 'precio detectar fuga de agua calefacción'],
    contentBrief: 'Texto centrado en reparación fugas agua, detección de fugas, fugas ocultas, fuga en tubería, reparación urgente y garantía.',
    description: 'Especialistas en reparación y detección de fugas de agua. Localizamos fugas ocultas y reparamos con garantía y presupuesto previo.',
    seoContent: {
      badge: 'Detección y reparación de fugas',
      title: 'Servicio Profesional de Reparación de Fugas de Agua',
      intro: [
        'La detección y reparación de fugas de agua es un servicio especializado que requiere tecnología avanzada y técnicos cualificados. Una fuga de agua no detectada puede causar daños estructurales importantes, incrementar dramáticamente tu factura de agua y crear problemas de humedad que afectan la salud de tu hogar.',
        'Para fuga oculta, fuga tubería enterrada o reparar fuga presión, nuestro equipo utiliza detector de fuga de agua, detector fuga de agua y otros equipos profesionales de última generación para localizar fugas ocultas sin necesidad de romper paredes o suelos innecesariamente. Trabajamos con termografía infrarroja, correlación acústica y geófonos electrónicos que permiten detectar el sonido del agua escapando incluso en tuberías enterradas a varios metros de profundidad.',
        'Una fuga de agua en casa puede manifestarse de múltiples formas: manchas de humedad en paredes o techos, un contador que gira constantemente aunque no se use agua, pérdida de presión en grifos, sonido de agua corriendo cuando todo está cerrado, o una factura de agua inexplicablemente elevada. También atendemos casos donde el cliente necesita saber cómo detectar una fuga de agua, cómo localizar una fuga en una tubería enterrada o cuál es el precio de detectar una fuga de agua antes de autorizar la reparación.',
        'El servicio se mantiene dentro de su intención comercial: localizar, diagnosticar y reparar fuga de agua, no sustituir una instalación completa ni hacer una reforma de fontanería. Si la fuga está en una tubería de PVC, cobre, multicapa, pared, techo, suelo o tramo enterrado, explicamos la solución viable antes de abrir. Cuando hay presión activa, priorizamos contención segura y reparación definitiva con materiales adecuados, evitando selladores improvisados que fallan al poco tiempo.',
      ],
      serviceCards: [
        {
          icon: Droplets,
          title: 'Detección de fugas ocultas',
          color: 'blue' as const,
          bullets: ['Termografía infrarroja', 'Correlación acústica', 'Geófonos electrónicos', 'Sin obras innecesarias'],
        },
        {
          icon: Wrench,
          title: 'Reparación de fugas',
          color: 'orange' as const,
          bullets: ['Fugas en tuberías', 'Fugas en paredes y techos', 'Fugas en tuberías enterradas', 'Reparación garantizada'],
        },
        {
          icon: Gauge,
          title: 'Fugas por presión',
          color: 'red' as const,
          bullets: ['Como tapar fuga con presión', 'Sellado interno de tuberías', 'Inyección de resina', 'Técnicas sin cortar agua'],
        },
      ],
      localCoverage: {
        title: 'Detección de fugas en toda Valencia',
        description: 'Llegamos rápido con equipos especializados para localizar fugas ocultas sin romper.',
      },
      benefitsTitle: '¿Por qué contratar nuestro servicio?',
      benefits: [
        'Detección sin obras con tecnología avanzada',
        'Reparación urgente 24/7 incluidos festivos',
        'Técnicos especializados en fugas',
        'Presupuesto claro sin sorpresas',
        'Garantía por escrito en reparaciones',
      ],
      keywordsTitle: 'Servicios de detección y reparación',
      keywordTags: [
        'reparación fugas agua',
        'fuga de agua',
        'detector de fuga de agua',
        'precio detectar fuga',
        'fuga oculta',
        'fuga tubería enterrada',
        'como detectar fuga',
        'reparar fuga presión',
      ],
    },
    faqs: [
      {
        question: '¿Cómo localizar una fuga de agua en una tubería enterrada?',
        answer: 'Utilizamos equipos especializados como geófonos electrónicos que detectan el sonido del agua escapando bajo tierra, y correlación acústica que capta ultrasonidos específicos del agua a presión saliendo de la tubería. También empleamos trazadores de tuberías para localizar el recorrido exacto de la conducción. El proceso no requiere excavar hasta saber el punto exacto de la fuga, lo que ahorra tiempo, dinero y obras innecesarias.',
      },
      {
        question: '¿Cuánto cuestá detectar una fuga de agua?',
        answer: 'La detección visual básica desde 49€. Detección con equipos especializados (termografía, correlación acústica, geófonos) entre 120-250€ según complejidad del caso. El precio incluye inspección completa de la instalación, uso de tecnología de detección profesional, localización precisa de la fuga, y presupuesto cerrado de reparación. Siempre damos presupuesto antes de proceder con cualquier trabajo. El coste de detección es muy inferior al coste de buscar la fuga rompiendo al azar.',
      },
      {
        question: '¿Cómo tapar una fuga de agua con presión?',
        answer: 'Primero cerramos las llaves de paso para reducir o eliminar la presión en la zona afectada. Según el tipo de fuga y tubería, usamos sellado con abrazaderas metálicas específicas, inyección de resina epoxi en juntas, reemplazo del tramo dañado con manguitos de reparación, o soldadura profesional. En emergencias podemos hacer reparaciones temporales resistentes para contener la fuga inmediatamente, y posteriormente realizar la reparación definitiva. Los productos domésticos tipo selladores líquidos raramente funcionan con presión real.',
      },
      {
        question: '¿Cómo detectar una fuga de agua en casa sin equipos profesionales?',
        answer: 'Prueba del contador: cierra todos los grifos y puntos de agua de casa, anota la lectura exacta del contador, espera 2 horas sin usar nada de agua, y vuelve a comprobar. Si el contador ha avanzado, tienes una fuga activa. También observa señales como: manchas de humedad nuevas en paredes o techos, moho en lugares inusuales, sonido continuo de agua corriendo cuando todo está cerrado, pérdida de presión gradual en grifería, o zonas del suelo húmedas sin explicación. Para localizar exactamente dónde está la fuga necesitas equipos profesionales.',
      },
      {
        question: '¿Cómo tapar una fuga de agua en un tubo de PVC?',
        answer: 'Para tuberías de PVC: en fugas pequeñas puntuales usamos masilla epoxi bicomponente específica para PVC, aplicándola con la superficie limpia y seca. En fugas mayores o en juntas, cortamos el tramo dañado con segueta, limpiamos los extremos, y soldamos un manguito de reparación o una nueva sección de tubo usando adhesivo para PVC de alta resistencia. Es crítico limpiar bien con imprimador PVC y dejar secar el tiempo especificado (24-48h) antes de dar presión. Las reparaciones caseras con cinta o selladores temporales fallan rápidamente.',
      },
      {
        question: '¿Cómo saber si tengo una fuga de agua en casa?',
        answer: 'Señales inequívocas: contador que gira con todo cerrado, factura de agua inexplicablemente alta comparada con meses anteriores, manchas de humedad que crecen en paredes o techos, sonido de agua corriendo en tuberías cuando no usas nada, pérdida progresiva de presión en grifos, moho que aparece sin motivo aparente, o suelo húmedo sin haber fregado. Realiza la prueba del contador descrita anteriormente. Si confirmas fuga pero no localizas visualmente de dónde viene, necesitas detección profesional porque está oculta en algún tramo empotrado o enterrado.',
      },
      {
        question: '¿Cómo detectar fuga de agua en casa de forma profesional?',
        answer: 'Los técnicos profesionales combinamos inspección visual experta con tecnología avanzada: termografía infrarroja que muestra cambios de temperatura causados por agua fría o caliente escapando (invisible al ojo humano), correladores acústicos digitales que captan el ultrasonido específico del agua saliendo a presión, geófonos amplificados que detectan sonidos subterráneos, gas trazador con detectores específicos para circuitos cerrados, y cámaras endoscópicas para inspeccionar interior de tuberías. La combinación de estas tecnologías permite localizar cualquier fuga, por oculta que esté.',
      },
      {
        question: '¿Cuál es el precio de detectar una fuga de agua en calefacción?',
        answer: 'Detección de fugas en instalaciones de calefacción: 150-300€ según complejidad del circuito. Las fugas en calefacción son más complicadas de localizar porque el circuito está cerrado, a mayor presión que agua sanitaria, y las tuberías suelen estar empotradas bajo suelo o en paredes. Incluye pruebas de presión del circuito, detección con equipos especializados (termografía muy efectiva porque el agua es caliente), uso de gas trazador si es necesario, y localización exacta del punto de pérdida. El precio detectar fuga de agua calefacción incluye informe completo y presupuesto de reparación.',
      },
      {
        question: '¿Ofrecéis servicio urgente para reparación de fugas?',
        answer: 'Sí, servicio de emergencia 24/7 para fugas graves. Si tienes fuga importante con riesgo de inundación, rotura de tubería con escape masivo, o fuga que está causando daños estructurales progresivos, llamamos y coordinamos llegada urgente en menos de 2 horas. Llevamos equipos de detección, herramientas y materiales de reparación de emergencia. En situaciones extremas hacemos reparación de contención inmediata (abrazaderas, sellados temporales resistentes) para parar la fuga ya, y luego coordinamos la reparación definitiva. El servicio de emergencia tiene un recargo de 40-70€ sobre tarifa normal según horario (nocturno/festivo).',
      },
      {
        question: '¿Qué garantía ofrecéis en reparaciónes de fugas?',
        answer: 'Todas nuestras reparaciones de fugas tienen garantía de 6 meses en mano de obra. Los materiales usados (tuberías, manguitos, conectores) tienen garantía del fabricante que varía según marca: generalmente 10-25 años para tuberías certificadas. Si la misma fuga reaparece en el mismo punto reparado dentro de 6 meses, volvemos y lo solucionamos sin coste adicional. Trabajamos solo con materiales profesionales certificados de primeras marcas, no usamos productos de ferretería domésticos. Todas las reparaciones incluyen pruebas de estanqueidad post-trabajo para verificar sellado perfecto antes de irnos.',
      },
    ],
  },
  
  'desatascos': {
    h1: 'Desatascos de Tuberías',
    metaTitle: 'Desatascos de Tuberías | Servicio Urgente 24/7',
    metaDescription: 'Servicio de desatascos para tuberías, desagües, arquetas y bajantes. Atención urgente, equipos profesionales y presupuesto claro.',
    lockedPrimaryKw: 'desatascos',
    secondaryKw: ['desatascos valencia', 'desatascos urgentes', 'desatascos en valencia', 'desatascos 24 horas', 'desatascos 24 horas valencia', 'desatascos 24h', 'desatascos urgentes valencia', 'empresa de desatascos', 'empresa desatascos', 'empresa desatascos valencia', 'empresas de desatascos', 'desatascos cerca de mi'],
    seoBlockKw: ['desatascos de tuberías', 'desatascos valencia', 'desatascos urgentes', 'desatascos 24 horas', 'empresa de desatascos', 'desatascos tuberias', 'desatascos de tuberías', 'desatascos de fregaderos', 'desatascos con camion cuba valencia', 'camión cuba desatascos', 'camion cuba desatascos', 'camion desatascos', 'cuba desatascos', 'arqueta desatascos', 'fontanero desatascos'],
    faqKw: ['camión cuba desatascos precio', 'empresa de desatascos precios', 'precio desatascos urgencias', 'precio hora desatascos', 'desatascos precio', 'tarifas de desatascos'],
    contentBrief: 'Texto centrado en desatascos de tuberías, desagües, fregaderos, WC/inodoros, arquetas, bajantes, camión cuba y urgencias 24 horas en Valencia.',
    description: 'Servicio de desatascos para tuberías, desagües, arquetas y bajantes. Atención urgente 24/7, equipos profesionales y presupuesto claro en Valencia.',
    seoContent: {
      badge: 'Desatascos urgentes 24/7',
      title: 'Servicio Profesional de Desatascos de Tuberías en Valencia',
      intro: [
        'Los desatascos profesionales en Valencia requieren equipamiento especializado y experiencia demostrable. Cuando tuberías, desagües, fregaderos, WC, inodoros, arquetas o bajantes presentan obstrucciones graves, nuestra empresa de desatascos responde con maquinaria industrial de última generación y técnicos cualificados disponibles para desatascos urgentes 24 horas. Operamos en toda Valencia capital y área metropolitana con llegada garantizada en menos de 60 minutos para desatascos urgentes valencia, porque entendemos que un inodoro bloqueado o un fregadero colapsado paralizan completamente la vida familiar o comercial.',
        'Nuestro servicio de desatascos valencia combina máquinas eléctricas rotativas profesionales con espirales de hasta 50 metros, equipos de alta presión que alcanzan 200 bar para desatascos de bajantes, cámaras de inspección endoscópica que diagnostican causas estructurales, y camión cuba desatascos para vaciado completo de arquetas comunitarias saturadas. Los desatascos 24 horas valencia son nuestra especialidad: atendemos emergencias nocturnas, fines de semana y festivos incluidas Fallas, porque los atascos no esperan. El 65% de nuestros desatascos urgentes son WC completamente bloqueados, fregaderos donde el agua queda estancada con residuos, y arquetas que desbordan en zonas comunes.',
        'Como empresa desatascos valencia profesional, rechazamos productos químicos que solo dañan tuberías sin resolver obstrucciones reales. Trabajamos exclusivamente con métodos mecánicos certificados que garantizan eliminación definitiva del atasco sin corroer instalaciones. Cada intervención incluye presupuesto claro comunicado antes de comenzar, desatasco completo verificado con prueba de agua, y garantía de 30 días. Atendemos desatascos de tuberías, desatascos de fregaderos, desatascos con camión cuba valencia, limpieza de arqueta desatascos, y cualquier obstrucción en desagües. Presupuesto transparente, llegada rápida, y servicio de desatascos cerca de mi disponible en toda Valencia.'
      ],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá un desatasco con camión cuba en Valencia?',
        answer: 'El precio del camión cuba desatascos en Valencia oscila entre 280-450€ según volumen a extraer y complejidad del acceso. El servicio de camión cuba desatascos se requiere cuando arquetas comunitarias están saturadas con acumulación de grasas, arena y residuos compactados, pozos de registro con metros cúbicos de lodos, o limpieza profunda de colectores. El precio incluye: desplazamiento del camión cuba especializado, vaciado completo con bomba de succión de alta potencia, limpieza a presión intensiva 150 bar del interior de la arqueta, extracción de residuos sólidos adheridos, transporte a punto de tratamiento autorizado, y enjuague final. Los desatascos con camion cuba valencia son inversión necesaria en comunidades donde arquetas nunca han recibido limpieza profesional. Una cuba desatascos resuelve saturaciones que equipos convencionales no pueden abordar.',
      },
      {
        question: '¿Cuáles son las tarifas de desatascos en Valencia?',
        answer: 'Las tarifas de desatascos y precios de empresa de desatascos profesional en Valencia varían según tipo de obstrucción: Desatasco simple accesible (sifón, WC superficial) desde 65€. Desatasco con máquina eléctrica rotativa (caso más frecuente) 95-190€ según complejidad y longitud de tubería. Desatasco de bajante comunitario vertical 160-320€ según altura. Inspección con cámara diagnóstica 85-160€ adicional para detectar problema estructural. Camión cuba desatascos para arquetas saturadas 280-450€. El precio desatascos urgencias en servicio nocturno (22h-8h) o festivo añade recargo 45-65€. El desatascos precio siempre se comunica completo por teléfono antes del desplazamiento. No hay sorpresas en la facturación. Como empresa de desatascos en Valencia, ofrecemos presupuesto cerrado que incluye desplazamiento, diagnóstico, desatasco completo y verificación. El precio hora desatascos NO aplicamos: trabajamos con precio cerrado por trabajo, no por tiempo.',
      },
      {
        question: '¿Cuánto cuestá un desatasco urgente nocturno o festivo?',
        answer: 'El precio desatascos urgencias nocturnas o festivas incluye tarifa base + recargo urgencia 45-65€. Ejemplo: desatasco urgente de WC con máquina eléctrica domingo medianoche = 95€ base + 55€ recargo urgencia = 150€ total cerrado. Nuestro servicio de desatascos urgentes valencia garantiza llegada en menos de 60 minutos en Valencia capital, máximo 90 minutos área metropolitana. El recargo urgencia cubre disponibilidad de técnicos especializados en desatascos 24 horas, desplazamiento inmediato con equipos profesionales, y furgoneta equipada permanentemente operativa. Los desatascos urgentes son necesarios cuando WC rebosa en plena noche, fregadero restaurante bloqueado en servicio, o arqueta desbordando en portal. El servicio de desatascos 24 horas valencia resuelve emergencias que no pueden esperar a horario laboral, evitando daños mayores por inundación o pérdida de actividad comercial.',
      },
      {
        question: '¿Trabajáis con precio hora desatascos o precio cerrado?',
        answer: 'Trabajamos siempre con precio cerrado, nunca por precio hora desatascos. El 90% de desatascos profesionales se resuelven en 25-50 minutos con los equipos adecuados. Cobrar por horas crea incentivos perversos para trabajar lento. Nuestra empresa de desatascos ofrece precio fijo completo antes de comenzar cualquier intervención. El desatascos precio incluye: desplazamiento urgente, diagnóstico de la obstrucción, aplicación del equipo profesional necesario (máquina eléctrica, alta presión, camión cuba según caso), eliminación completa del atasco, verificación de desagüe correcto con prueba de agua, y limpieza de la zona. Así conoces exactamente el coste final antes de autorizar el trabajo. Solo si aparece complicación extraordinaria no prevista (tubería rota oculta, objeto imposible de extraer que requiere desmontaje completo) comunicamos coste adicional y pedimos confirmación antes de proceder. Transparencia total en tarifas de desatascos.',
      },
      {
        question: '¿Cuál es el precio normal de un desatasco de WC o fregadero?',
        answer: 'El desatascos precio estándar en Valencia para obstrucción típica de WC, fregadero o lavabo: desde 65€ si es accesible en sifón visible y se resuelve con desatascador profesional. Si requiere máquina eléctrica rotativa (70% de casos): 95-150€ según profundidad del atasco, longitud de tubería afectada y dificultad de acceso. El precio incluye: llegada del técnico especialista en desatascos, diagnóstico de la obstrucción, desatasco completo con equipo profesional, verificación de funcionamiento correcto, y limpieza de la zona. Los desatascos de tuberías con máquina garantizan eliminación completa de la obstrucción. NO incluye reparación de elementos rotos que descubramos (tubería fisurada, sifón agrietado): esas reparaciones se presupuestan separadamente. Los desatascos de fregaderos y desatascos de WC son intervenciones habituales resueltas eficazmente con equipamiento profesional adecuado.',
      },
      {
        question: '¿Ofrecéis servicio de desatascos 24 horas en Valencia?',
        answer: 'Sí, nuestro servicio de desatascos 24 horas valencia funciona los 365 días del año incluidos Navidad, Semana Santa y Fallas. Los atascos no respetan horarios: el 40% de atascos graves ocurren fines de semana cuando el uso intensivo de baños y cocina satura las instalaciones. Un WC atascado que rebosa, fregadero completamente bloqueado en restaurante durante servicio, o arqueta desbordando aguas fecales en portal son emergencias sanitarias urgentes. Nuestra empresa de desatascos valencia coordina llegada en menos de 60 minutos en Valencia capital con furgoneta equipada. Los desatascos 24h incluyen equipos profesionales completos. El servicio desatascos urgentes valencia añade recargo nocturno/festivo (45-65€) comunicado claramente por teléfono antes del desplazamiento. Como empresa desatascos valencia especializada, garantizamos atención inmediata cualquier día o hora con técnicos preparados y equipamiento profesional (máquinas rotativas, alta presión, camión cuba).',
      },
      {
        question: '¿Por qué los desatascos profesionales no usan productos químicos?',
        answer: 'Los productos químicos desatascadores son ineficaces, peligrosos y dañinos. Ineficaces porque solo disuelven superficialmente materia orgánica reciente, no eliminan atascos reales de grasa solidificada, objetos sólidos, raíces o papel compactado. Peligrosos porque son cáusticos extremos que causan quemaduras graves, generan gases tóxicos, y si el desagüe está bloqueado quedan estancados creando peligro químico. Dañinos porque corroen tuberías especialmente PVC, atacan juntas causando fugas futuras, y contaminan altamente el alcantarillado. Nuestra empresa desatascos valencia usa exclusivamente métodos mecánicos profesionales 100% efectivos: máquinas eléctricas rotativas con torque alto que destruyen cualquier obstrucción en tuberías, equipos de alta presión que arrastran residuos, completamente seguros para personas e instalaciones, y respetuosos con el medio ambiente. Los desatascos de tuberías profesionales resuelven el problema definitivamente sin dañar las conducciones.',
      },
      {
        question: '¿Qué garantía tienen los desatascos profesionales?',
        answer: 'Nuestra empresa de desatascos ofrece garantía de desatasco completo 30 días: si el mismo atasco reaparece en el punto exacto en plazo de 30 días desde la intervención, volvemos sin coste adicional. Esto indica que no eliminamos completamente la obstrucción inicial y asumimos responsabilidad. Si aparece atasco diferente en otro punto, o el mismo punto se atasca meses después por seguir echando grasa, toallitas o restos de comida, es atasco nuevo por mal uso no cubierto por garantía. Tras cada desatasco damos instrucciones claras sobre qué NUNCA echar: grasa caliente líquida, toallitas "biodegradables", bastoncillos, pañales, compresas, arena de gatos, restos sólidos de comida, pelos en grandes cantidades. Si al realizar desatascos de tuberías detectamos problema estructural (tubería hundida, raíces invasoras, rotura), lo comunicamos con recomendación de solución definitiva. Los desatascos valencia profesionales incluyen diagnóstico completo del origen del problema.',
      },
      {
        question: '¿Por qué fallan los desatascadores domésticos y necesito empresa desatascos?',
        answer: 'Las herramientas domésticas tienen limitaciones físicas insuperables. Desatascador ventosa manual: genera solo 0.3-0.5 bar, efectivo únicamente para atascos superficiales en sifón visible primeros 30cm, inútil para obstrucciones compactas 3-10 metros dentro de tubería. Cables manuales ferretería: máximo 3-5 metros, sin potencia rotatoria para perforar atascos duros, se doblan sin penetrar. Productos químicos: ineficaces y peligrosos como explicamos. Las máquinas profesionales de desatascos de tuberías: espirales metálicas hasta 50 metros, motor rotatorio 350-600 rpm con torque alto que destruye cualquier obstrucción, cabezales intercambiables específicos (cuchillas, picas, cepillos), y control de velocidad para no dañar tuberías. Una empresa de desatascos profesional resuelve en 30-45 minutos lo que métodos domésticos no logran en días. Los desatascos urgentes requieren equipamiento especializado que solo empresas de desatascos poseen.',
      },
      {
        question: '¿Qué pasa si el atasco es causado por tubería rota o raíces?',
        answer: 'Algunos atascos recurrentes son síntoma de problema estructural, no obstrucción simple. Causas estructurales comunes en Valencia: tubería PVC o fibrocemento rota por asentamiento del terreno acumulando arena constantemente, invasión de raíces de árboles (naranjos, palmeras) que penetran juntas buscando humedad, tubería con pendiente invertida por obras posteriores impidiendo drenaje, o bajante colapsado. Cuando realizamos desatascos de tuberías y sospechamos problema estructural (atasco reaparece cada semanas, síntomas de rotura), recomendamos inspección con cámara video especializada (85-160€ adicional). La cámara recorre el interior de la tubería mostrando exactamente el problema: rotura, fisura, raíces penetrando, objeto imposible de extraer. Con diagnóstico confirmado explicamos opciones: reparación puntual excavando solo tramo dañado, o sustitución completa si daño generalizado. Los desatascos profesionales detectan estos problemas estructurales que requieren solución definitiva más allá del desatasco temporal.',
      },
    ],
  },

  'instalaciones': {
    h1: 'Instalaciones de Fontanería',
    metaTitle: 'Instalaciones de Fontanería | Grifos, Sanitarios y Tuberías',
    metaDescription: 'Instalamos grifos, sanitarios, termos y tuberías con técnicos cualificados, materiales de calidad y garantía por escrito.',
    lockedPrimaryKw: 'instalación fontanería',
    secondaryKw: ['instalacion fontaneria baño', 'instalacion fontaneria en pladur', 'medidas instalacion fontaneria', 'instalar grifo', 'cambiar grifo', 'instalacion sanitarios', 'instalacion inodoro', 'instalacion lavabo'],
    seoBlockKw: ['instalación fontanería', 'instalacion fontaneria baño', 'instalar grifo', 'cambiar grifo', 'instalacion sanitarios', 'instalacion inodoro', 'instalacion lavabo', 'instalacion fontaneria en pladur', 'medidas instalacion fontaneria', 'instalacion fontaneria', 'reforma baño', 'fontaneria obra nueva'],
    faqKw: ['cuanto cobra un fontanero por cambiar un grifo', 'cuanto cuesta instalar un baño completo', 'precio instalacion fontaneria baño', 'precio cambiar grifo', 'se puede instalar fontaneria en pladur', 'cuanto cuesta reforma baño fontaneria'],
    contentBrief: 'Texto centrado en instalación de grifos, sanitarios, baños, termos y trabajos con garantía.',
    description: 'Instalamos grifos, sanitarios, termos y tuberías con técnicos cualificados, materiales de calidad y garantía por escrito.',
    seoContent: {
      badge: 'Instalaciones certificadas',
      title: 'Instalaciones de Fontanería Profesionales con Garantía',
      intro: [
        'La instalación fontanería profesional es fundamental tanto en obra nueva como en reformas. Una instalación bien ejecutada con materiales de calidad garantiza agua potable limpia, presión adecuada, ausencia de fugas, y durabilidad de 40-50 años. Una instalación deficiente con materiales baratos o mano de obra inexperta causa problemas recurrentes: fugas, pérdida de presión, averías frecuentes, y reparaciones costosas que superan el ahorro inicial.',
        'Realizamos instalación fontaneria baño completa, instalación de grifos y sanitarios, instalación fontaneria en pladur con refuerzos adecuados, instalación de tuberías para obra nueva, y cualquier trabajo relacionado. Trabajamos siguiendo estrictamente el Código Técnico de la Edificación (CTE), utilizando materiales certificados UNE, y coordinándonos perfectamente con otros oficios (albañilería, electricidad, alicatado).',
        'Esta página cubre instalaciones generales de fontanería: tomas de agua, desagües, medidas de instalación, distribución de baño, cocina, lavabo, ducha, sanitario e inodoro cuando forman parte de una instalación más amplia. Los servicios hiperconcretos, como cambiar un grifo, cambiar un inodoro, reparar una cisterna o cambiar bañera por ducha, tienen sus propias páginas para evitar canibalización y dar presupuestos más precisos.',
        'Antes de ejecutar revisamos presión disponible, trazado, materiales existentes, pendientes de evacuación, accesos y compatibilidad con el resto de la obra. El presupuesto explica qué incluye la mano de obra, qué materiales se usarán, qué pruebas de estanqueidad se harán y qué garantía queda documentada. Así la instalación no depende de improvisación, sino de un esquema claro y medible.',
      ],
      serviceCards: [
        {
          icon: ShowerHead,
          title: 'Grifería y sanitarios',
          color: 'blue' as const,
          bullets: ['Grifos y monomandos', 'Inodoros y cisternas', 'Lavabos y duchas', 'Cambio bañera por ducha'],
        },
        {
          icon: Wrench,
          title: 'Fontanería completa',
          color: 'purple' as const,
          bullets: ['Baños y cocinas', 'Obra nueva', 'Reformas integrales', 'Instalación en pladur'],
        },
        {
          icon: Gauge,
          title: 'Instalaciones certificadas',
          color: 'blue' as const,
          bullets: ['Cumplimiento CTE', 'Materiales certificados', 'Coordinación oficios', 'Garantía escrita'],
        },
      ],
      localCoverage: {
        title: 'Instaladores de fontanería en toda Valencia',
        description: 'Realizamos instalaciones siguiendo normativa vigente con materiales certificados y garantía escrita.',
      },
      benefitsTitle: '¿Por qué confiar en nosotros?',
      benefits: [
        'Instaladores certificados con experiencia',
        'Materiales de primeras marcas',
        'Cumplimiento normativa CTE',
        'Garantía escrita en instalaciones',
        'Coordinación con otros oficios',
      ],
      keywordsTitle: 'Servicios de instalación',
      keywordTags: [
        'instalación fontanería',
        'instalación baño',
        'fontanería obra nueva',
        'cambiar grifo',
        'instalación sanitarios',
        'fontanería pladur',
        'reforma baño',
        'instalar grifos',
      ],
    },
    faqs: [
      {
        question: '¿Cuánto cobra un fontanero por cambiar un grifo?',
        answer: 'Cambiar grifo solo mano de obra (grifo NO incluido): 60-120€ según tipo y complejidad. Grifo monomando simple de lavabo o fregadero sobre encimera: 60-80€. Grifería termostática de ducha empotrada: 100-140€ porque requiere más trabajo. Mezclador bañera con inversor ducha: 90-120€. Si al cambiar grifo descubrimos llaves de paso defectuosas o necesidad adaptadores por diferencia roscas, incrementa 30-60€. Incluye: retirada grifo antiguo, limpieza zona, instalación grifo nuevo con juntas y latiguillos nuevos, conexiones estancas, pruebas funcionamiento. El grifo nuevo lo aportas tú o lo suministramos (precio aparte).',
      },
      {
        question: '¿Cuánto cuestá instalar un baño completo de fontanería?',
        answer: 'Instalacion fontaneria baño completa (tuberías, desagües, conexiones, sin sanitarios): Baño básico pequeño (ducha, lavabo, inodoro): 600-1.000€. Baño mediano completo (ducha/bañera, lavabo, inodoro, bidé): 1.000-1.800€. Incluye: tuberías agua fría y caliente desde acometida, red evacuación con pendientes, sifones, llaves paso, instalación hidráulica de sanitarios, pruebas estanqueidad, certificado. NO incluye: alicatado, sanitarios, grifería, electricidad. Si añades sanitarios gama media + grifería: +900-2.000€. Total cuanto cuesta instalar un baño completo instalado: 1.500-3.800€ según tamaño y calidades.',
      },
      {
        question: '¿Qué precio tiene la instalación de fontanería en un baño?',
        answer: 'Precio instalacion fontaneria baño solo fontanería (no sanitarios, no alicatado): Baño estándar 5-6m²: 800-1.400€. Incluye: red tuberías cobre o multicapa con llaves paso sectoriales, red evacuación PVC con pendientes reglamentarias, instalación hidráulica inodoro/lavabo/ducha, sifones, válvulas, pruebas presión, certificado. Si es reforma (quitar instalación antigua + nueva): +200-400€ por demolición y retirada. La instalación de sanitarios que aporta el cliente (inodoro, lavabo o ducha) suele presupuestarse aparte: +300-600€ mano de obra. Presupuesto varía según: tamaño baño, si instalacion fontaneria en pladur o tradicional, complejidad distribución.',
      },
      {
        question: '¿Cuánto cuestá cambiar un grifo de cocina o baño?',
        answer: 'Precio cambiar grifo solo mano de obra: Monomando simple lavabo/fregadero: 60-80€. Grifo dos  mandos: 70-90€. Termostático ducha: 100-120€. Monomando cocina extraíble: 80-100€. Grifo bañera mezclador: 90-120€. Grifo empotrado en pared: 120-180€ (requiere obra menor). Si llaves de paso están bloqueadas y hay que cambiarlas: +40-70€. Si necesita adaptadores roscas o extensores: +20-40€. Estos precios son cambiar grifo existente funcional por otro nuevo (tú lo aportas). Incluye retirada antiguo, instalación nuevo, conexiones, pruebas. NO incluye el grifo nuevo, solo instalación.',
      },
      {
        question: '¿Se puede instalar fontanería en paredes de pladur?',
        answer: 'Sí, se puede instalar fontaneria en pladur pero con consideraciones técnicas importantes: 1) Pladur debe ser hidrófugo (verde) en zonas húmedas obligatorio. 2) Para instalacion inodoro suspendido necesitas bastidor metálico empotrado ANTES del pladur que soporte peso (hasta 400kg). 3) Lavabos suspendidos o muebles pesados también requieren refuerzos metálicos empotrados. 4) Tuberías pasan por perfiles o premarcos metálicos previstos. 5) Una vez cerrado pladur NO hay acceso a tuberías, por eso se dejan registros con válvulas corte accesibles. 6) Medidas instalacion fontaneria deben ser exactas porque corrección posterior es muy difícil. Sí es viable con planificación correcta.',
      },
      {
        question: '¿Cuánto cuestá una reforma de fontanería de baño completa?',
        answer: 'Cuanto cuesta reforma baño fontaneria completa (quitar todo antiguo + instalar todo nuevo): Baño pequeño 4-5m²: 1.200-2.200€. Baño mediano 6-8m²: 1.800-3.200€. Baño grande o 2 baños: 2.800-5.000€. Incluye: demolición instalación antigua y retirada escombros, nueva red tuberías certificadas desde acometida, red evacuación con pendientes, llaves paso, instalación hidráulica sanitarios nuevos, grifería, pruebas, certificado. NO incluye: albañilería general, alicatado, pintura, electricidad, sanitarios/grifería como objetos. Estos precios son mano de obra + material fontanería. En reforma integral coordinamos con otros oficios.',
      },
      {
        question: '¿Qué se necesita para instalar fontanería en obra nueva?',
        answer: 'Fontaneria obra nueva requiere: 1) Proyecto o esquema instalación con ubicación puntos agua, desagües, diámetros. 2) Acometida general conectada y operativa con presión. 3) Estructura edificio cerrada (forjados, tabiquería, pre-instalaciones). 4) Coordinación con otros oficios (albañil para rozas, electricista para cuadro y tomas, alicatador para registro final). 5) Tuberías certificadas UNE apropiadas (cobre, PEX, multicapa para agua; PVC para desagües). 6) Cumplimiento estricto CTE DB HS (diámetros mínimos, presiones, pendientes, materiales). 7) Prueba estanqueidad antes de cerrar. 8) Certificado instalación. Coordinamos todo el proceso profesionalmente.',
      },
      {
        question: '¿Qué garantía tiene una instalación de fontanería?',
        answer: 'Nuestras instalaciones de fontanería tienen garantía 6 meses mano de obra: si aparecen fugas en conexiones por defecto instalación, problemas derivados de trabajo mal ejecutado, o cualquier defecto atribuible a nuestra mano de obra, lo solucionamos sin coste durante 6 meses. Los materiales usados tienen garantía fabricante separada: tuberías certificadas 10-25 años según marca y material (cobre 25, multicapa 15, PEX 10-15), grifería 5-10 años cartuchos cerámicos, sanitarios 2-10 años según marca. Para reclamar garantía material contactas con fabricante presentando factura. Conserva certificado instalación y facturas. Instalación profesional certificada vale garantías y seguro.',
      },
      {
        question: '¿Por qué contratar instalador profesional versus hacerlo yo?',
        answer: 'Instalación fontanería requiere: 1) Conocimiento normativa CTE actualizada (diámetros mínimos según puntos consumo, presiones, materiales permitidos). 2) Experiencia técnicas unión: soldadura cobre con soplete (fácil quemar tubería o dejarla porosa), termofusión PEX (temperatura exacta o no sella), prensado multicapa (herramienta específica). 3) Comprensión principios hidráulicos: pérdidas carga, golpes ariete, presiones. 4) Herramientas profesionales costosas: soplete, prensa hidráulica, termofusora, dobladora tubo. 5) Pruebas estanqueidad presurización 1.5x presión nominal 2 horas. 6) Certificado instalación para seguro/inspección. Error instalación causa fugas, daños estructurales, denegación seguro. Instalador profesional te ahorra problemas, asumimos responsabilidad civil, damos garantía, certificamos. Vale la inversión.',
      },
      {
        question: '¿Ofrecéis suministro de materiales o solo instalación?',
        answer: 'Ofrecemos ambas opciones flexibles: 1) Instalación con nuestros materiales: te damos presupuesto desglosado materiales + mano obra. Compramos materiales certificados de primeras marcas con descuento profesional, aseguramos compatibilidad y calidad, y extendemos garantía a conjunto completo. 2) Solo instalación (tú aportas materiales): presupuesto solo mano trabajo. Verificamos previamente que materiales sean apropiados, certificados, compatibles. Si no lo son, avisamos antes empezar. NO nos responsabilizamos defectos fabricación de materiales aportados por cliente, solo de instalación ejecutada. Muchos clientes prefieren opción 1 porque ganan tranquilidad: seleccionamos correcto, garantizamos funcional, y cualquier problema es responsabilidad nuestra única sin discusiones si fue material o instalación.',
      },
    ],
  },

  'sustitucion-tuberias': {
    h1: 'Sustitución de Tuberías',
    metaTitle: 'Sustitución de Tuberías | Cambio de Cañerías con Garantía',
    metaDescription: 'Cambio y sustitución de tuberías antiguas por instalaciones seguras y eficientes. Presupuesto previo, materiales de calidad y garantía.',
    lockedPrimaryKw: 'sustitución tuberías',
    secondaryKw: ['sustitución tuberías', 'presupuesto cambiar tuberias casa'],
    seoBlockKw: ['sustitución tuberías', 'cambio tuberías', 'renovación tuberías', 'tuberías antiguas', 'tuberías corroídas', 'presupuesto cambiar tuberias casa'],
    faqKw: ['cuánto cuesta sustitución de tuberías', 'presupuesto cambiar tuberias casa', 'cuánto tarda sustitución de tuberías', 'hay garantía en sustitución de tuberías', 'servicio urgente de sustitución de tuberías'],
    contentBrief: 'Texto centrado en cambio de tuberías, cañerías antiguas, multicapa, cobre, presión y normativa.',
    description: 'Cambio y sustitución de tuberías antiguas por instalaciones seguras y eficientes. Presupuesto previo, materiales de calidad y garantía.',
    seoContent: {
      badge: 'Renovación de tuberías',
      title: 'Sustitución de Tuberías Antiguas por Instalaciones Modernas',
      intro: [
        'La sustitución tuberías es una intervención necesaria cuando la instalación de fontanería ha llegado al final de su vida útil. Tuberías con más de 30-40 años presentan corrosión interna, pérdida de espesor por erosión, acumulación de incrustaciones calcáreas que reducen el diámetro útil, fugas recurrentes en múltiples puntos, y riesgo creciente de rotura catastrófica que causa inundaciones.',
        'El cambio tuberías por instalaciones modernas no solo resuelve problemas actuales sino que previene futuras averías durante décadas. Tuberías nuevas de cobre, PEX reticulado o multicapa tienen vida útil prolongada, proporcionan mejor presión y caudal, cumplen normativa actual, no contaminan agua potable, y reducen riesgo fugas al mínimo. La inversión en sustitución tuberías se amortiza evitando reparaciones recurrentes y daños por fugas.',
        'Esta página se centra en renovación de tuberías, cambio de tuberías antiguas, tuberías corroídas, sustitución de cañerías y mejora de una red ya envejecida. No compite con una reparación puntual de fuga ni con una instalación nueva de baño: aquí evaluamos si conviene sustituir tramos, renovar por fases o cambiar toda la red de agua y evacuación.',
        'Antes de preparar presupuesto para cambiar tuberías de casa revisamos antigüedad, material existente, accesos, presión, zonas con humedad, trazado visible y posibilidad de minimizar obra. Si hay plomo, galvanizado oxidado o fugas repetidas, explicamos por qué conviene sustituir en lugar de seguir reparando. El trabajo incluye planificación, materiales adecuados, pruebas de estanqueidad y garantía por escrito.',
      ],
      serviceCards: [
        {
          icon: Wrench,
          title: 'Sustitución completa',
          color: 'purple' as const,
          bullets: ['Viviendas completas', 'Cambio por fases', 'Minimización de obras', 'Restauración incluida'],
        },
        {
          icon: Droplets,
          title: 'Tuberías modernas',
          color: 'blue' as const,
          bullets: ['Cobre multicapa', 'PEX reticulado', 'Certificadas UNE', 'Garantía fabricante'],
        },
        {
          icon: Gauge,
          title: 'Cambio de bajantes',
          color: 'cyan' as const,
          bullets: ['Bajantes comunitarias', 'Hierro por PVC', 'Comunidades de vecinos', 'Sin molestias'],
        },
      ],
      localCoverage: {
        title: 'Sustitución de tuberías en toda Valencia',
        description: 'Renovamos instalaciones completas con materiales certificados y mínimas molestias para ti.',
      },
      benefitsTitle: 'Ventajas de renovar tuberías',
      benefits: [
        'Elimina fugas y problemas recurrentes',
        'Mejora presión y caudal de agua',
        'Materiales con 50+ años de vida útil',
        'Cumplimiento normativa vigente',
        'Garantía en materiales e instalación',
      ],
      keywordsTitle: 'Servicios de renovación',
      keywordTags: [
        'sustitución tuberías',
        'cambio tuberías antiguas',
        'tuberías de cobre',
        'tuberías PEX',
        'cambio bajantes',
        'presupuesto cambiar tuberias casa',
        'renovación fontanería',
        'tuberías multicapa',
        'tuberías corroídas',
      ],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá la sustitución de tuberías de una vivienda?',
        answer: 'Cuánto cuesta sustitución de tuberías depende mucho de tamaño vivienda, material elegido, y estado actual. Precios orientativos: Renovación parcial 1 baño: 600-1.200€. Vivienda 2 baños 80-100m² completa: 1.800-3.500€. Vivienda 3 baños 120-150m² completa: 2.500-4.500€. Cambio solo acometida general: 800-2.000€. Bajante comunitaria vertical: 150-300€ metro lineal. Estos precios incluyen: materiales certificados (tuberías, conexiones, llaves paso), demolición antiguas, instalación nuevas, pruebas estanqueidad, certificado. Obras restauración (albañilería, alicatado) se presupuestan separadas según alcance. Material más económico (PEX) vs más caro (cobre) puede suponer diferencia 30-40% precio. Presupuesto personalizado tras visita.',
      },
      {
        question: '¿Cuánto tiempo tarda la sustitución de tuberías completa?',
        answer: 'Cuánto tarda sustitución de tuberías: Vivienda pequeña 1 baño 50-60m²: 2-4 días. Vivienda mediana 2 baños 80-100m²: 3-5 días trabajo efectivo. Vivienda grande 3 baños 120-150m²: 5-7 días. Baño individual renovar: 1-2 días. Estos son días trabajo real efectivo, no incluyen: tiempo secado adhesivos/morteros (si restauración albañilería), esperas coordinación otros oficios si reforma integral, o tiempo administrativo tramitación. Trabajamos para que tengas servicios mínimos agua cada final jornada cuando posible. En vivienda habitada programamos secuencia minimizar molestias. Si vivienda vacía avanzamos más rápido. Plazo depende también complejidad accesos y si aparece imprevisto (tubería extra oculta, estructura debe repararse).',
      },
      {
        question: '¿Qué garantía tiene la sustitución de tuberías?',
        answer: 'Hay garantía en sustitución de tuberías en dos niveles: Garantía instalación (mano obra): 6 meses. Si aparece fuga en conexión ejecutada por nosotros, problema instalación, o defecto trabajo dentro 6 meses, lo reparamos sin coste. Garantía materiales (tuberías, conexiones): depende fabricante, generalmente 10-25 años según material. Cobre: típicamente 25 años. Multicapa y PEX: 10-15 años. Estas garantías cubren defectos fabricación (tubería pincha sin causa externa, conexión falla por defecto material). NO cubren: daños por uso inadecuado, golpes externos, heladas por ausencia  calefacción invierno, o modificaciones posteriores por terceros. Trabajamos solo con marcas reconocidas europeas (Uponor, Rehau, Geberit, Wirsbo) que cumplen garantías escrupulosamente. Conserva factura y certificado instalación para reclamaciones.',
      },
      {
        question: '¿Ofrecéis servicio urgente de sustitución de tuberías?',
        answer: 'Servicio urgente de sustitución de tuberías completa: no es habitual porque sustitución integral requiere planificación, coordinación, y tiempo (varios días). PERO sí ofrecemos sustitución parcial urgente: si tienes rotura grave en tubería muy deteriorada, rotura con fuga importante que no admite reparación puntual, o tubería reventada que requiere cambio tramo completo, hacemos sustitución urgente del tramo afectado en 24-48h para resolver emergencia. Luego planificamos sustitución completa restante si procede. También hay situaciones semi-urgentes: vas a hacer reforma inmediata (obra empieza en días), necesitas certificación rápida para trámite, o has comprado vivienda y quieres habitarla cuanto antes. En estos casos priorizamos la obra y movilizamos equipos para ejecutar rápido.',
      },
      {
        question: '¿Es obligatorio cambiar tuberías de plomo?',
        answer: 'Sí, es obligatorio sustituir tuberías de plomo por normativa sanitaria porque contaminan agua potable con sales de plomo (plumbismo) especialmente peligrosas para desarrollo cerebral en niños, causan problemas neurológicos acumulativos, daño renal, y múltiples patologías. No hay nivel seguro plomo en agua potable. Tuberías plomo fueron comunes hasta años 70-80 especialmente en acometidas generales edificios antiguos. Si tu vivienda es anterior años 80 y nunca se renovó fontanería, probablemente haya plomo al menos en acometida. Análisis agua puede detectar concentración plomo. En algunas comunidades autónomas existen subvenciones para cambio tuberías plomo en edificios antiguos. Consulta ayuntamiento. No postergar: es riesgo sanitario  real especialmente en casas con niños pequeños.',
      },
      {
        question: '¿Hay que romper paredes para cambiar tuberías?',
        answer: 'Depende de trazado actual y opciones construcción. Minimizamos obras todo lo posible: Aprovechamos registros existentes, falsos techos, cámaras bajo suelo si hay, pasos por armarios, recorridos zonas no críticas. En instalaciones empotradas en paredes con tuberías por interior definitivamente sí hay que abrir rozas, pero solo las imprescindibles justas para nueva tubería. Si haces reforma integral con alicatado/pintura nueva, es momento perfecto porque las paredes van a abrirse de todos modos para esos trabajos: aprovechar para renovar fontanería no supone obra adicional significativa. Restauramos completamente todas las paredes/suelos abiertos (enlucido, alicatado puntual, pintura) dejando acabado perfecto. En obra nueva o vivienda en construcción las tuberías se instalan antes cerrar paredes evidentemente sin demolición.',
      },
      {
        question: '¿Qué material de tubería es mejor: cobre, PEX o multicapa?',
        answer: 'Los tres materiales son excelentes certificados para agua potable, duraderos y fiables. Cobre: máxima durabilidad (50+ años), extremadamente resistente presión/temperatura, bacteriostático natural, reciclable, valor residual. Requiere soldadura profesional soplete. Más caro. Ideal: presupuesto holgado, vivienda unifamiliar larga vida útil. PEX reticulado: flexible facilitando instalación, rapidez montaje sin soldadura, muy económico, resistente incrustaciones calcáreas, 40+ años vida. Menos resistencia altas temperaturas que cobre. Ideal: presupuesto ajustado, reformas rápidas, trazados complejos donde flexibilidad ventaja. Multicapa PE-AL-PE: equilibrio perfecto combine flexibilidad + estabilidad, excelente memoria forma, muy buena resistencia, instalación rápida prensado. Precio medio. Ideal: mayoría casos buscando relación calidad-precio óptima. Recomendamos según: prioridades (durabilidad max, economía, equilibrio), presupuesto disponible, y características vivienda.',
      },
      {
        question: '¿Cuándo hay que sustituir las tuberías de una casa?',
        answer: 'Indicadores claros necesidad sustitución tuberías: Antigüedad +30-40 años (vida útil cumplida), fugas recurrentes en múltiples puntos diferentes (indica degradación generalizada), agua sale color oxidado frecuentemente (corrosión interna avanzada), pérdida significativa presión en toda vivienda (incrustaciones reducen diámetro), tuberías de plomo identificadas (obligatorio cambiar: riesgo sanitario), corrosión visible en tuberías exteriores, o vas hacer reforma integral (momento ideal por paredes abiertas). Si tienes dudas, hacemos inspección profesional evaluamos estado tuberías accesibles, analizamos agua si procede, comprobamos presión puntos, y asesoramos si necesario cambiar ahora, si puede esperar algunos años con vigilancia, o si solo requiere reparación puntual actual. Honestidad profesional: no recomendamos sustituir completa si no necesario realmente.',
      },
      {
        question: '¿Se puede sustituir solo una parte de las tuberías?',
        answer: 'Sí, se puede hacer sustitución tuberías parcial cambiando solo tramos más problemáticos conservando resto en estado aceptable. Situaciones típicas: cambiar solo fontanería baño principal dejando resto vivienda (baño más usado, mayor desgaste), renovar solo bajante comunitaria problemática dejando derivaciones viviendas, cambiar acometida general edificio muy deteriorada manteniendo instalaciones interiores, o sustituir solo tramo tubería con fuga recurrente. Ventaja: coste significativamente menor. Desventaja: lo que dejas sin cambiar sigue envejeciendo y probablemente requerirá cambio años posteriores. Si instalación tiene +35 años y vas abrir paredes, recomendamos cambiar completa porque diferencia coste es moderada pero beneficio es total (40 años sin problemas vs ir cambiando trozos cada vez). Pero respetamos decisión cliente tras exponer pros/contras objetivamente.',
      },
      {
        question: '¿Qué diferencia hay entre renovar tuberías en vivienda vacía vs habitada?',
        answer: 'Vivienda vacía: ventajas enormes: libertad total horarios (trabajamos jornada completa sin interrupciones), no preocupación incomodar, guardado muebles no es problema, limpieza profunda más fácil, avance obra mucho más rápido (20-30% menos tiempo), no necesidad mantener servicios mínimos cada noche, y obras pueden ser más extensas si beneficia trazado óptimo. Vivienda habitada: requiere: coordinación horarios civilizados (9h-19h), protecciones estrictas zonas no obra, mantener punto agua operativo cada noche si posible, baño básico usable, limpieza diaria rigurosa polvo/escombros, avisos previos cortes agua programados, y mayor cuidado general. Es perfectamente factible pero ralentiza algo la obra y requiere mayor coordinación. Si puedes alojar temporalmente con familiares durante los 4-6 días obra, se simplifica mucho y acelera finalización. Precio similar en ambos casos, diferencia está en comodidad tuya y velocidad ejecución.',
      },
    ],
  },

  'calentadores-termos': {
    h1: 'Calentadores y Termos',
    metaTitle: 'Calentadores y Termos | Instalación y Reparación',
    metaDescription: 'Instalación y reparación de termos eléctricos y calentadores de agua. Servicio rápido, seguro y con garantía por escrito.',
    lockedPrimaryKw: 'termo eléctrico',
    secondaryKw: ['termo electrico', 'termo electrico 50 litros', 'termo electrico 100 litros', 'termo electrico 80 litros', 'termo electrico 30 litros', 'como vaciar un termo electrico', 'termo electrico 150 litros', 'termo de agua electrico', 'presupuesto cambiar termo electrico'],
    seoBlockKw: ['termo eléctrico', 'termo electrico', 'termo electrico 50 litros', 'termo electrico 100 litros', 'termo electrico 80 litros', 'termo electrico 30 litros', 'como vaciar un termo electrico', 'termo electrico 150 litros', 'termo de agua electrico', 'termo electrico horizontal', 'presupuesto cambiar termo electrico'],
    faqKw: ['como vaciar un termo electrico', 'como funciona un termo electrico', 'como vaciar termo electrico', 'cuanto dura un termo electrico', 'precio termo electrico', 'presupuesto cambiar termo electrico', 'precio termo electrico 100 litros', 'cuanto consume un termo electrico', 'como cambiar un termo electrico'],
    contentBrief: 'Texto centrado en termo eléctrico, calentador de agua, instalación, reparación y mantenimiento.',
    description: 'Instalación y reparación de termos eléctricos y calentadores de agua. Servicio rápido, seguro y con garantía por escrito.',
    seoContent: {
      badge: 'Especialistas en termos',
      title: 'Termos Eléctricos: Instalación, Reparación y Mantenimiento Profesional',
      intro: [
        'Un equipo de agua caliente tiene que funcionar sin ruidos, sin goteos y sin disparar el diferencial. Cuando falla, no basta con mirar la capacidad del depósito: revisamos presión de entrada, grupo de seguridad, fijación a pared, toma eléctrica, latiguillos, válvula de corte y estado real del equipo antes de proponer reparación o sustitución.',
        'Instalamos y cambiamos termos eléctricos de 30, 50, 80, 100 y 150 litros según uso real de la vivienda. Un piso con una persona no necesita la misma reserva que una familia con duchas consecutivas, y un termo colocado sobre falso techo exige una solución distinta a uno vertical en galería. Por eso ajustamos capacidad, orientación y materiales antes de dar precio cerrado.',
        'Esta página trabaja termo eléctrico, termo de agua eléctrico, reparación de termo que no calienta, vaciado seguro, cambio de resistencia, revisión de termostato y presupuesto cambiar termo electrico. Tambien orientamos termo electrico 50 litros, termo electrico 80 litros, termo electrico 100 litros, termo electrico 150 litros y termo electrico horizontal segun espacio real. No vendemos una caja sin más: dejamos el equipo conectado, probado, purgado y explicado para que sepas cómo usarlo sin forzar consumo ni seguridad.',
        'Si el acumulador pierde por la válvula, tarda mucho en calentar, hace saltar la luz o entrega agua templada, comprobamos si merece la pena reparar resistencia, termostato, ánodo o conexiones. Cuando el depósito está oxidado o la reparación ya no compensa, planteamos cambio completo con retirada del equipo anterior y garantía por escrito.',
      ],
      serviceCards: [
        {
          icon: Flame,
          title: 'Termos eléctricos',
          color: 'red' as const,
          bullets: ['Termo 50 litros', 'Termo 100 litros', 'Termo 80 y 150 litros', 'Horizontales y verticales'],
        },
        {
          icon: Wrench,
          title: 'Instalación y reparación',
          color: 'orange' as const,
          bullets: ['Instalación certificada', 'Cambio resistencia/termostato', 'Descalcificación y limpieza', 'Termo sin agua caliente'],
        },
        {
          icon: Gauge,
          title: 'Mantenimiento preventivo',
          color: 'blue' as const,
          bullets: ['Limpieza anual', 'Cambio ánodo magnesio', 'Revisión válvula seguridad', 'Alarga vida útil +5 años'],
        },
      ],
      localCoverage: {
        title: 'Servicio de termos eléctricos en toda Valencia',
        description: 'Instalación, reparación y mantenimiento con certificado eléctrico. Marcas reconocidas y garantía por escrito.',
      },
      benefitsTitle: '¿Por qué confiar en nosotros?',
      benefits: [
        'Técnicos especializados en ACS',
        'Instalación con certificado eléctrico',
        'Reparaciones económicas cuando es posible',
        'Asesoramiento capacidad adecuada',
        'Garantía escrita en trabajos',
      ],
      keywordsTitle: 'Servicios de termos',
      keywordTags: [
        'termo eléctrico',
        'termo 50 litros',
        'termo 100 litros',
        'termo 80 litros',
        'instalación termo',
        'reparación termo',
        'termo sin agua',
        'presupuesto cambiar termo electrico',
        'mantenimiento termo',
      ],
    },
    faqs: [
      {
        question: '¿Cómo vaciar un termo eléctrico correctamente?',
        answer: 'Para vaciar un acumulador primero se corta la corriente y después se cierra la entrada de agua fría. Si buscas como vaciar termo electrico, conviene hacerlo con el equipo frio y sin presion. Abrimos un grifo de agua caliente para quitar presión y conectamos una manguera al punto de vaciado o al grupo de seguridad, llevando el agua a un desagüe. El tiempo depende de la capacidad: un equipo pequeño se vacía antes que uno de 100 o 150 litros. No conviene desmontarlo lleno porque pesa mucho y puede romper soportes o conexiones.',
      },
      {
        question: '¿Cómo funciona un termo eléctrico?',
        answer: 'Un acumulador electrico acumula agua en un depósito aislado y la calienta mediante una resistencia controlada por termostato. Cuando entra agua fría por la parte inferior, el agua caliente sale hacia la vivienda por la parte superior. Si el termostato detecta bajada de temperatura, activa la resistencia hasta recuperar el punto configurado. El grupo de seguridad y el ánodo ayudan a proteger el depósito frente a presión y corrosión.',
      },
      {
        question: '¿Cuánto dura un termo eléctrico?',
        answer: 'La vida útil cambia mucho según calidad del agua, uso y mantenimiento. En viviendas con cal, un termo sin revisión suele deteriorarse antes por sedimentos en resistencia y corrosión interna. Señales de final de vida: agua oxidada, goteo constante del depósito, calentamiento muy lento, ruido al calentar o disparos eléctricos repetidos. Si el problema está en una pieza sustituible, se repara; si el vaso está dañado, recomendamos cambio.',
      },
      {
        question: '¿Cuál es el precio de un termo eléctrico?',
        answer: 'El precio termo electrico depende de capacidad, marca, orientación, eficiencia y dificultad de montaje. Para calcular precio termo electrico 100 litros revisamos pared, tomas y grupo de seguridad. No cuesta lo mismo sustituir un termo accesible con tomas preparadas que instalar uno nuevo con soporte reforzado, llaves, grupo de seguridad y adaptación eléctrica. En Reparar24 damos presupuesto antes de empezar e indicamos por separado equipo, material auxiliar, mano de obra y retirada del termo antiguo.',
      },
      {
        question: '¿Cuánto cuestá un termo eléctrico de 100 litros?',
        answer: 'Un termo eléctrico de 100 litros suele ser una opción equilibrada para tres o cuatro personas, pero el presupuesto final varía por espacio, altura, tipo de pared y conexiones existentes. Si hay que cambiar latiguillos, grupo de seguridad, soportes o cableado, lo dejamos reflejado antes de intervenir. También comprobamos si conviene vertical, horizontal o modelo compacto para no forzar la instalación.',
      },
      {
        question: '¿Cuánto consume un termo eléctrico al mes?',
        answer: 'El consumo mensual depende de litros, temperatura seleccionada, aislamiento, número de duchas y horario eléctrico. Un equipo sobredimensionado mantiene caliente agua que quizá no se usa; uno pequeño se queda corto y trabaja más veces al día. Para reducir gasto recomendamos ajustar temperatura, evitar modelos demasiado grandes, revisar cal acumulada y, si procede, programar funcionamiento en horas más económicas.',
      },
      {
        question: '¿Cómo cambiar un termo eléctrico?',
        answer: 'Para cambiar un termo eléctrico se corta agua y corriente, se vacía el depósito, se desmontan conexiones y se retira el equipo con seguridad. Después se revisa pared, distancia de tomas, grupo de seguridad y protección eléctrica antes de colgar el nuevo. Una vez instalado, se llena sin aire, se comprueban fugas y solo entonces se conecta la corriente. Es un trabajo de fontanería y electricidad, por eso conviene hacerlo con técnico.',
      },
      {
        question: '¿Qué capacidad de termo necesito según usuarios?',
        answer: 'Como orientación, 30 litros puede servir para un uso puntual, 50 litros para una o dos personas, 80 litros para consumo medio y 100 litros para una familia pequeña con varias duchas. Si hay bañera, horarios concentrados o cinco usuarios, puede interesar 150 litros o una solución distinta. La decisión no se toma solo por número de personas: también miramos espacio, presión, hábitos y tiempo de recuperación.',
      },
      {
        question: '¿El termo eléctrico gasta mucho?',
        answer: 'Puede gastar más de lo necesario si está mal dimensionado, lleno de cal o configurado a temperatura excesiva. Un termo moderno, con capacidad correcta y uso razonable, suele ser práctico para pisos sin gas. Si buscas ahorrar, conviene revisar aislamiento, resistencia, temperatura y horarios. También se puede valorar gas o aerotermia, pero no siempre compensa la inversión inicial en una vivienda urbana.',
      },
      {
        question: '¿Termo eléctrico o calentador de gas: cuál elegir?',
        answer: 'Depende de la vivienda. El termo eléctrico suele encajar mejor cuando no hay instalación de gas, se busca una obra sencilla y el consumo de agua caliente es moderado. El calentador de gas puede interesar si ya existe gas natural, hay muchos usuarios y se necesita producción continua. En una visita revisamos espacio, salida de humos, potencia disponible y hábitos de uso para recomendar la opción más razonable.',
      },
    ],
  },

  'mantenimiento': {
    h1: 'Mantenimiento de Fontanería',
    metaTitle: 'Mantenimiento de Fontanería | Revisiones y Prevención',
    metaDescription: 'Mantenimiento preventivo de fontanería para evitar fugas, atascos y averías. Revisiones periódicas con técnicos cualificados.',
    lockedPrimaryKw: 'mantenimiento fontanería',
    secondaryKw: ['mantenimiento fontaneria'],
    seoBlockKw: ['mantenimiento fontanería', 'mantenimiento fontaneria', 'revisión fontanería', 'prevención averías fontanería'],
    faqKw: ['cuánto cuesta mantenimiento de fontanería', 'cuánto tarda mantenimiento de fontanería', 'hay garantía en mantenimiento de fontanería', 'servicio urgente de mantenimiento de fontanería'],
    contentBrief: 'Texto centrado en revisión, prevención de averías, mantenimiento de tuberías, grifos, termos y comunidades.',
    description: 'Mantenimiento preventivo de fontanería para evitar fugas, atascos y averías. Revisiones periódicas con técnicos cualificados.',
    seoContent: {
      badge: 'Prevención inteligente',
      title: 'Mantenimiento Preventivo de Fontanería: Evita Averías Costosas',
      intro: [
        'El mantenimiento fontanería preventivo es la estrategia más inteligente y económica para mantener tu instalación en perfecto estado durante décadas. Una revisión profesional periódica detecta problemas pequeños antes de que se conviertan en averías grandes costosas: una junta que empieza a gotear micro-fugas, un sifón parcialmente obstruido acumulando residuos, un termo con resistencia sulfatada o llaves de paso agarrotadas.',
        'Ofrecemos planes mantenimiento fontaneria adaptados a cada necesidad: revisión anual para viviendas particulares, revisión semestral para instalaciones con uso intenso, y revisión trimestral para comunidades de vecinos. El coste anual mantenimiento es fracción del coste reparar emergencia: una fuga importante cuesta 200-500€ reparar más daños, mientras una revisión preventiva puede detectar el problema antes.',
        'Esta página trabaja revisión fontanería, prevención de averías, mantenimiento de tuberías, grifos, cisternas, termos, llaves de paso y comunidades. No sustituye a una reparación urgente ni a una instalación nueva: su objetivo es revisar estado, medir presión, comprobar contador, detectar microfugas, limpiar elementos sencillos y priorizar actuaciones antes de que se conviertan en urgencias.',
        'Durante la visita revisamos puntos visibles, conexiones, sifones, caudal, desagües, señales de corrosión, funcionamiento de llaves y posibles pérdidas. Si aparece una avería mayor, la documentamos y damos presupuesto aparte. Así el mantenimiento preventivo funciona como una capa de control técnico: reduce sorpresas, alarga la vida útil de la instalación y permite planificar reparaciones sin prisas.',
      ],
      serviceCards: [
        {
          icon: ShieldCheck,
          title: 'Planes para viviendas',
          color: 'blue' as const,
          bullets: ['Revisión anual 120-180€', 'Revisión semestral 220-300€', 'Inspección completa', 'Informe escrito detallado'],
        },
        {
          icon: Wrench,
          title: 'Inspección preventiva',
          color: 'green' as const,
          bullets: ['Revisión grifería y válvulas', 'Detección fugas ocultas', 'Revisión termo/calentador', 'Limpieza preventiva'],
        },
        {
          icon: Gauge,
          title: 'Comunidades de vecinos',
          color: 'purple' as const,
          bullets: ['Planes trimestrales', 'Bajantes y arquetas', 'Contadores y bombeo', 'Informes para administrador'],
        },
      ],
      localCoverage: {
        title: 'Mantenimiento de fontanería en Valencia',
        description: 'Pre vención inteligente que detecta problemas pequeños antes de que se conviertan en averías caras.',
      },
      benefitsTitle: 'Ventajas del mantenimiento',
      benefits: [
        'Previene averías costosas',
        'Detecta problemas en fase inicial',
        'Alarga vida útil de instalaciones',
        'Prioridad en caso de urgencia',
        'Descuentos en reparaciones necesarias',
      ],
      keywordsTitle: 'Servicios de mantenimiento',
      keywordTags: [
        'mantenimiento fontanería',
        'revisión fontanería',
        'prevención fugas',
        'inspección tuberías',
        'mantenimiento comunidad',
        'plan mantenimiento',
        'revisión anual',
        'chequeo fontanería',
      ],
    },
    faqs: [
      {
        question: '¿Cuánto cuestá el mantenimiento de fontanería anual?',
        answer: 'Cuánto cuesta mantenimiento de fontanería depende tipo instalación y frecuencia: Plan Básico Vivienda 1 revisión anual: 120-180€/año. Plan Premium Vivienda 2 revisiones semestrales: 220-300€/año. Comunidad vecinos pequeña hasta 10 viviendas revisión trimestral: 350-600€/año. Comunidad mediana 10-30 viviendas: 600-1.200€/año. Comunidad grande 30-50 viviendas: 1.000-2.000€/año. Incluye: inspección exhaustiva completa, pequeñas intervenciones preventivas menores, informe escrito detallado estado, asesoramiento recomendaciones, y descuentos 10-15% reparaciones mayores necesarias resto año. Revisión única puntual diagnóstico inicial (no contrato): 140-220€ incluye todo lo anterior pero una sola vez sin compromiso continuidad. Precio varía según: tamaño vivienda/instalación, complejidad/antigüedad instalación, frecuencia revisiones contratadas.',
      },
      {
        question: '¿Cuánto tarda una revisión de mantenimiento de fontanería?',
        answer: 'Cuánto tarda mantenimiento de fontanería revisión completa: Vivienda pequeña/media 50-80m² 1-2 baños: 1-2 horas. Vivienda media/grande 100-120m² 2-3 baños: 2-3 horas. Vivienda grande/unifamiliar 150+m² múltiples baños: 3-4 horas. Revisión trimestral comunidad pequeña 5-10 viviendas zonas comunes: 2-3 horas. Comunidad mediana 20-30 viviendas: 3-5 horas. Durante revisión técnico inspecciona minuciosamente: grifería completa,  llaves paso, tuberías visibles conexiones, arquetas/sifones accesibles, termo/calentador, presión sistema con manómetro, test contador fugas, caudal desagües, y realiza sobre marcha pequeñas intervenciones preventivas incluidas: limpieza aireadores, lubricación válvulas, apriete conexiones, ajuste cisternas, cambio juntas pequeñas deterioradas. Finaliza redactando informe, explicando hallazgos verbalmente, asesorando recomendaciones, respondiendo consultas. Trabajo minucioso profesional requiere tiempo hacer correctamente no prisas. Programación flexible adaptada disponibilidad cliente.',
      },
      {
        question: '¿El mantenimiento preventivo tiene garantía?',
        answer: 'Hay garantía en mantenimiento de fontanería en siguiente sentido: mantenimiento preventivo es principalmente inspección y pequeñas intervenciones ajuste/limpieza. Si durante revisión detectamos problema y realizamos pequeña reparación incluida (cambio junta, lubricación válvula, ajus te conexión, limpieza sifón), esas mini-intervenciones tienen garantía obviamente: si mismo elemento falla semanas siguientes por defecto nuestro trabajo, regresamos solucionamos sin coste. Pero el verdadero valor mantenimiento NO es garantía reparaciones sino PREVENCIÓN: detectar problemas fase embrionaria (grifo empezando gotear, tubería con corrosión incipiente, termo resistencia sulfatandose) antes convertirse averías caras. Te asesoramos transparentemente sobre problemas detectados priorizados por urgencia y damos presupuesto cerrado si decides contratarlas. Esas reparaciones mayores contratadas separadas tienen su garantía propia (6 meses mano obra). Esencia mantenimiento preventivo es evitar sorpresas costosas detección temprana.',
      },
      {
        question: '¿Ofrecéis servicio urgente para clientes de mantenimiento?',
        answer: 'Servicio urgente de mantenimiento de fontanería: los clientes con contrato mantenimiento activo tienen varios beneficios urgencias: 1) Prioridad atención: si llamas urgencia real (fuga importante, atasco grave, termo sin agua niños temporada fría) y tienes contrato, priorizamos y llegamos antes que clientes sin contrato lista espera. 2) Conocimiento previo instalación: cómo hacemos revisiones periódicas, conocemos ya tu instalación profundamente (dónde llaves paso, tipo tuberías, problemas anteriores) permitiendo diagnosticar y preparar materiales apropiados antes llegar, acelerando resolución. 3) Descuento urgencia: clientes contrato tienen descuento 10-15% también aplicado urgencias incluido recargo nocturno/festivo. 4) Línea telefónica preferente: número directo técnicos para clientes contratos Premium para asesoramiento inmediato y coordinación urgencia. Aunque mantenimiento es preventivo, entendemos pueden surgir imprevisto s y cuidamos especialmente clientes confiaron prevención nuestros servicios.',
      },
      {
        question: '¿Con qué frecuencia hay que hacer mantenimiento de fontanería?',
        answer: 'Frecuencia óptima mantenimiento fontanería según situación: Vivienda instalación moderna <15 años uso normal familiar: anual suficiente. Vivienda instalación 15-30 años o historial problemas: semestral recomendable (detecta antes). Vivienda instalación > 30 años: semestral muy recomendable o incluso trimestral si problemas frecuentes. Segunda residencia desatendida meses: antes/después cada temporada uso. Vivienda alquiler turístico rotación continua: trimestral por alto desgaste uso intenso variado. Comunidades vecinos instalaciones comunes: trimestral ideal para bajantes/arquetas/grupos presión. Local comercial/oficina: anual mínimo. Restaurante/hotel instalaciones críticas: semestral o trimestral según volumen. Primera revisión evaluamos estado instalación y recomendamos frecuencia apropiada tu caso específico. Siempre puedes empezar Plan Básico Anual y upgrade Premium Semestral si observas necesitas más frecuencia. Flexibilidad total.',
      },
      {
        question: '¿Qué incluye exactamente una revisión de mantenimiento?',
        answer: 'Revisión mantenimiento fontanería incluye exhaustivamente: Inspección visual completa: grifos todos lavabos/fregaderos/duchas/bidés verificando sin goteos, llaves paso generales y sectoriales funcionamiento, tuberías visibles sin corrosión/humedad, conexiones sin micro-fugas, sifones acumulación residuos, arquetas accesibles nivel llenado. Verificaciones funcionales instrumentales: presión sistema manómetro certificado (2.5-4 bar ideal), test contador todo cerrado detecta fugas ocultas, caudal grifos estándares, desagüe rapido sin retención, termo/calentador funcionamiento temperatura. Pequeñas intervenciones preventivas incluidas: limpieza aireadores grifos, lubricación llaves paso, apriete conexiones vibrac ión, ajuste cisternas pérdidas, cambio juntas pequeñas deterioradas, desatasco preventivo sifón inicio. Informe escrito: checklist estado elementos, fotos puntos relevantes, intervenciones realizadas, recomendaciones priorizadas urgencia, presupuesto reparaciones mayores si necesarias. Asesoramiento verbal transparente. TODO incluido precio cerrado.',
      },
      {
        question: '¿Puedo cancelar el plan de mantenimiento cuando quiera?',
        answer: 'Sí, transparencia total: planes mantenimiento son anuales pero puedes cancelar cuando desees sin penalización cláusulas permanencia. Contratas anual pagando adelantado con descuento respecto fraccionar. Si decides cancelar antes cumplir año (ejemplo: hiciste 1 revisión semestral plan 2/año pagaste 260€, cancelar a mitad): prorrateamos proporcionalmente y devolvemos parte no usada (en ejemplo 130€). No atamos nadie contratos perpetuos obligatorios porque prioridad es que valores servicio beneficio real aporte te fidelices voluntariamente satisfacción no coacción contractual. Mayoría clientes mantienen contrato años renovando voluntariamente porque verifican ahorro real y tranquilidad proporcionada. Queremos clientes satisfechos largo plazo no atrapados jurídicamente. Honestidad profesionalidad por encima tácticas comerciales agresivas. Can cancelas avisando simplemente, ningún problema, sin preguntas incómodas ni presiones.',
      },
      {
        question: '¿Vale la pena contratar mantenimiento preventivo de fontanería?',
        answer: 'Absolutamente sí vale pena contratar mantenimiento fontanería análisis coste-beneficio objetivo: Cliente CON mantenimiento 3 años: 150€/año x3= 450€ preventivo + probabilidad 1 reparación menor detectada temprano 80€ = 530€ total + tranquilidad. Cliente SIN mantenimiento 3 años: 0€ prevención + probabilidad 2-3 urgencias reparación (fuga, atasco grave, termo averiado) 200-500€ cada = 600-1.200€ + daños asociados humedad/moho 100-300€ + estrés = 800-1.700€. Ahorro neto mantenimiento: 300-1.000€ trienio. Además, mantenimiento: alarga vida útil instalación 20-30% (termos bien mantenidos duran 14-16 años vs 9-11 sin mantenimiento), reduce consumo (termo limpio eficiente, fugas inexistentes no desperdician agua/energía), evita daños multiplicadores (humedad estructural, moho salud, muebles estropeados), y proporciona tranquilidad invaluable no preocuparte sorpresas. Inversión pequeña prevención inteligente supera comostamente ignorar hasta problema explote. Estadística clara: clientes mantenimiento tienen 70-80% menos urgencias costosas que clientes reactivos. Matemáticas simples: prevenir ahorra.',
      },
      {
        question: '¿Qué pasa si durante la revisión detectáis problemas graves?',
        answer: 'Si durante revisión mantenimiento fontanería detectamos problema mayor que requiere reparación importante (no pequeña intervención incluida), procedemos así transparentemente: 1) Documentar: fotografías problema, mediciones relevantes, explicación técnica clara. 2) Evaluar urgencia: problema requiere acción inmediata (fuga activa peligrosa), corto plazo (grifo muy deteriorado fallará semanas), medio plazo (tubería corrosión progresiva planificar cambio meses), o largo plazo informativo (instalación anticuada considerar renovación años). 3) Presupuestar: damos presupuesto cerrado reparación sugerida explicando alcance trabajo, materiales usaríamos, garantía, y plazo ejecución. 4) Tú decides: aceptas hacer ahora (aplicamos descuento contrato mantenimiento 10-15%), programas futuro, decides no hacer después considerar .  NUNCA presionamos hacer reparaciones innecesarias inflarnos factura: honestidad profesional es pilar credibilidad largo plazo clientes. Si problema detectado NO es urgente te asesoramos honestamente puedes esperar vigilar. Detección temprana permite planificar presupuestar sin urgencias costosas.',
      },
      {
        question: '¿El mantenimiento incluye reparación de averías encontradas?',
        answer: 'Mantenimiento fontanería incluye pequeñas intervenciones preventivas menores sin coste adicional: limpieza aireadores grifos, lubricación llaves paso agarrotadas, apriete conexiones vibraciones, ajuste flotador cisterna perdida, cambio juntas goma pequeñas visibles deterioradas, desatasco preventivo sifón acumulación inicial. Estas micro intervenciones rápidas hacemos sobre marcha durante revisión incluidas precio. PERO reparaciones mayores (cambio grifo completo deteriorado, reparación fuga tubería oculta requiere obra, descalcificación termo apertura completa, cambio termo averiado, desatasco complejo equipo específico) NO están incluidas precio mantenimiento obvio: presupuestan aparte y decides si las contratas. Ventaja: al tener contrato mantenimiento aplicamos descuento 10-15% reparaciones mayores automáticamente. Presupuesto siempre cerrado previo aprobación tu, nunca sorpresas factura final. Separación clara prevención (incluida) vs reparación mayor (presupuestada).'
      },
    ],
  },

  'cambio-banera-por-ducha': {
    h1: 'Cambiar Bañera por Ducha',
    metaTitle: 'Cambiar Bañera por Ducha | Plato de Ducha con Garantía',
    metaDescription: 'Cambio de bañera por ducha con presupuesto previo, retirada de bañera, instalación de plato de ducha y garantía profesional.',
    lockedPrimaryKw: 'cambiar bañera por ducha',
    secondaryKw: [
      'cambiar bañera por plato de ducha',
      'cambio de bañera por ducha',
      'cambiar bañera por ducha precio',
      'precio cambiar bañera por ducha',
      'cambiar plato de ducha',
      'instalacion de plato ducha',
      'instalar plato de ducha',
      'reparar plato ducha resina',
      'cambio baño por ducha',
      'quitar bañera y poner ducha',
    ],
    seoBlockKw: [
      'cambiar bañera por ducha',
      'cambiar bañera por plato de ducha',
      'cambio de bañera por ducha',
      'precio cambiar bañera por ducha',
      'cambiar plato de ducha',
      'quitar bañera poner ducha',
      'cambio baño por ducha',
      'cambio de baño por ducha',
      'instalar plato de ducha',
      'instalacion de plato ducha',
      'montar plato de ducha',
      'cambiar desague plato ducha',
      'reparar grieta plato ducha',
      'reforma de baño parcial',
    ],
    faqKw: [
      'cuanto cuesta cambiar bañera por ducha',
      'cuanto tarda cambiar bañera por plato de ducha',
      'precio cambiar bañera por ducha',
      'cambiar bañera por ducha sin obra',
    ],
    contentBrief: 'Texto centrado en sustitución de bañera por plato de ducha, presupuesto previo, retirada de bañera, impermeabilización, mampara y garantía.',
    description: 'Cambiamos tu bañera por ducha con plato antideslizante, instalación profesional, presupuesto claro y garantía.',
    seoContent: {
      badge: 'Reforma de baño',
      title: 'Cambio de Bañera por Ducha con Instalación Profesional',
      intro: [
        'La sustitucion de bañera por ducha es una reforma parcial pensada para ganar seguridad, comodidad y uso diario sin transformar todo el baño. Esta página trabaja el servicio concreto de cambiar bañera por plato de ducha, no una reforma integral: retiramos la bañera antigua, revisamos el desagüe existente, comprobamos tomas de agua, preparamos la base y dejamos el nuevo plato de ducha instalado con pendiente correcta, sellado perimetral e impermeabilización en la zona afectada.',
        'El cambiar bañera por ducha precio depende de medidas, tipo de plato, mampara, revestimiento necesario y estado real de la fontanería. Tambien valoramos precio cambiar bañera por ducha cuando hay que adaptar desague o alicatado. Por eso no damos una cifra genérica sin revisar el caso: antes de empezar confirmamos si basta con quitar bañera y poner ducha, si hay que cambiar plato de ducha por otro, adaptar el desagüe, corregir una toma, montar plato de ducha o rematar alicatado. Así el presupuesto queda claro y no compite con otros trabajos de instalaciones completas.',
        'Este servicio está orientado a viviendas donde se busca acceso más cómodo, menos riesgo de resbalones y un baño más fácil de limpiar. También es habitual en pisos de alquiler, viviendas de personas mayores o baños antiguos que ya no resultan prácticos. Trabajamos con materiales adecuados, retirada ordenada de la bañera, limpieza final y garantía por escrito en la instalación realizada.',
      ],
      serviceCards: [
        { icon: ShowerHead, title: 'Plato de ducha', color: 'blue' as const, bullets: ['Resina o porcelana', 'Antideslizante', 'Corte a medida', 'Pendiente correcta'] },
        { icon: Wrench, title: 'Retirada e instalación', color: 'orange' as const, bullets: ['Retirada de bañera', 'Adaptación de desagüe', 'Nivelación de base', 'Sellado profesional'] },
        { icon: ShieldCheck, title: 'Garantía y acabado', color: 'green' as const, bullets: ['Impermeabilización', 'Prueba de estanqueidad', 'Limpieza final', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Cambio de bañera por ducha en Valencia',
        description: 'Servicio profesional para viviendas, pisos de alquiler, personas mayores y reformas de baño parciales.',
      },
      benefitsTitle: 'Ventajas de cambiar la bañera por ducha',
      benefits: ['Acceso más cómodo y seguro', 'Menos riesgo de resbalones', 'Baño más moderno y fácil de limpiar', 'Presupuesto cerrado antes de empezar', 'Instalación con garantía profesional'],
      keywordsTitle: 'Servicios relacionados',
      keywordTags: ['cambiar bañera por ducha', 'cambiar bañera por plato de ducha', 'cambio de bañera por ducha', 'precio cambiar bañera por ducha', 'cambiar plato de ducha', 'instalar plato de ducha', 'quitar bañera poner ducha'],
    },
    faqs: [
      { question: '¿Cuánto cuestá cambiar bañera por ducha?', answer: 'El precio depende de medidas, tipo de plato, mampara, alicatado y estado de la fontanería. Siempre damos presupuesto previo cerrado antes de empezar.' },
      { question: '¿Cuánto tarda cambiar una bañera por plato de ducha?', answer: 'La mayoría de trabajos se completan en 1-2 días laborables si no aparecen problemas ocultos en desagües, paredes o tuberías.' },
      { question: '¿Se puede cambiar bañera por ducha sin reforma completa?', answer: 'Sí. En muchos baños se puede retirar solo la bañera, adaptar el desagüe, instalar plato de ducha y revestir la zona afectada. Eso cubre cambiar bañera por ducha sin obra integral, aunque siempre hay remates.' },
      { question: '¿Qué incluye el cambio de bañera por ducha?', answer: 'Incluye retirada de bañera, preparación de base, adaptación de desagüe, instalación del plato, sellado perimetral, prueba de estanqueidad y limpieza final.' },
      { question: '¿Dais garantía en la instalación?', answer: 'Sí. La instalación tiene garantía de mano de obra y comprobamos estanqueidad antes de finalizar.' },
    ],
  },

  'reparacion-cisternas': {
    h1: 'Reparación de Cisternas',
    metaTitle: 'Reparación de Cisternas | Cisterna Pierde Agua',
    metaDescription: 'Reparamos cisternas que pierden agua, gotean o no cargan. Cambio de mecanismo, flotador, descargador y cisternas empotradas.',
    lockedPrimaryKw: 'cisterna pierde agua',
    secondaryKw: ['arreglar cisterna', 'cisterna gotea', 'cisterna no carga agua', 'cambiar mecanismo cisterna', 'reparar cisterna roca', 'cisterna empotrada pierde agua', 'reparar cisterna que pierde agua', 'reparar cisterna wc pierde agua'],
    seoBlockKw: ['cisterna pierde agua', 'arreglar cisterna', 'cisterna gotea', 'cisterna no carga agua', 'cambiar mecanismo cisterna', 'reparar cisterna roca', 'cisterna empotrada pierde agua', 'reparar cisterna que pierde agua', 'reparar wc pierde agua'],
    faqKw: ['por que mi cisterna pierde agua', 'cuanto cuesta arreglar una cisterna', 'cambiar mecanismo cisterna', 'cisterna empotrada pierde agua', 'reparar cisterna wc pierde agua', 'reparar inodoro pierde agua'],
    contentBrief: 'Texto centrado en reparación de cisternas que pierden agua, gotean, no cargan o tienen mecanismo averiado.',
    description: 'Reparamos cisternas que pierden agua, gotean o no cargan. Cambiamos mecanismo, flotador, descargador y juntas con presupuesto previo.',
    seoContent: {
      badge: 'Reparación de cisternas',
      title: 'Cisterna Pierde Agua: Reparación Profesional',
      intro: [
        'Cuando una cisterna pierde agua de forma continua no conviene esperar: aunque parezca un goteo pequeño, puede consumir muchos litros al día, generar ruido constante y terminar dañando el mecanismo interno. Esta página se centra en reparar cisterna, cisterna gotea, cisterna no carga agua y cambio de mecanismo de cisterna, especialmente cuando el fallo está en el flotador, el descargador, la válvula de llenado, el pulsador o una junta que ya no sella correctamente.',
        'El diagnóstico empieza comprobando si la cisterna pierde agua hacia el inodoro, si la fuga aparece por la base, si el flotador no corta, si el pulsador se queda enganchado o si el mecanismo completo está desgastado. En muchos casos basta con ajustar, limpiar cal, cambiar junta o sustituir una pieza compatible; en otros, lo más sensato es cambiar mecanismo cisterna para evitar reparaciones repetidas. También revisamos cisternas empotradas accediendo por la placa cuando el modelo lo permite.',
        'No mezclamos este servicio con instalar inodoro ni con desatascos de WC: aquí el objetivo es solucionar la avería de la cisterna y dejar la descarga funcionando sin pérdidas. Si necesitas reparar cisterna que pierde agua, reparar cisterna WC pierde agua o revisar un inodoro que pierde agua por descarga continua, comprobamos el mecanismo antes de proponer cambios. Antes de cambiar piezas te explicamos qué falla, qué opciones hay y cuánto cuesta arreglar una cisterna en tu caso. La reparación termina con prueba de llenado, descarga y estanqueidad, usando recambios adecuados y garantía sobre la intervención realizada.',
      ],
      serviceCards: [
        { icon: Droplets, title: 'Fugas y goteos', color: 'blue' as const, bullets: ['Cisterna pierde agua', 'Goteo continuo', 'Agua al inodoro', 'Pérdida por abajo'] },
        { icon: Wrench, title: 'Mecanismos', color: 'orange' as const, bullets: ['Flotador', 'Descargador', 'Pulsador doble', 'Válvula de llenado'] },
        { icon: ShieldCheck, title: 'Trabajo garantizado', color: 'green' as const, bullets: ['Diagnóstico claro', 'Piezas compatibles', 'Prueba de llenado', 'Garantía escrita'] },
      ],
      localCoverage: { title: 'Reparación de cisternas en Valencia', description: 'Atendemos viviendas, pisos de alquiler, locales y comunidades con cisternas vistas o empotradas.' },
      benefitsTitle: 'Ventajas de reparar la cisterna a tiempo',
      benefits: ['Evitas desperdicio de agua continuo', 'Reduces ruido y molestias en el baño', 'Prevenimos daños en juntas y mecanismo', 'Presupuesto antes de empezar', 'Reparación con piezas adecuadas'],
      keywordsTitle: 'Averías habituales',
      keywordTags: ['cisterna pierde agua', 'arreglar cisterna', 'cisterna gotea', 'cisterna no carga agua', 'reparar cisterna que pierde agua', 'reparar wc pierde agua'],
    },
    faqs: [
      { question: '¿Por qué mi cisterna pierde agua continuamente?', answer: 'Lo más habitual es que falle la junta del descargador, el flotador no corte bien, la válvula de llenado quede abierta o el mecanismo esté desajustado.' },
      { question: '¿Cuánto cuestá arreglar una cisterna que gotea?', answer: 'Depende de si basta con ajuste o junta, si hay que cambiar mecanismo completo, si es empotrada y de la disponibilidad de piezas compatibles.' },
      { question: '¿Se puede cambiar solo el mecanismo de la cisterna?', answer: 'Sí. En muchos casos no hace falta cambiar la cisterna completa si el cuerpo está en buen estado.' },
      { question: '¿Una cisterna empotrada se puede reparar sin romper?', answer: 'Normalmente sí. Muchas cisternas empotradas se reparan accediendo por la placa del pulsador.' },
      { question: '¿Reparáis inodoros o WC que pierden agua por la cisterna?', answer: 'Si la pérdida viene de la descarga o del mecanismo interno, lo tratamos como reparación de cisterna. Si el WC pierde por la base, está atascado o requiere sustitución completa, lo derivamos al servicio correspondiente.' },
    ],
  },

  'cambio-reparacion-grifos': {
    h1: 'Cambio y Reparación de Grifos',
    metaTitle: 'Cambio y Reparación de Grifos | Cocina, Ducha y Lavabo',
    metaDescription: 'Cambiamos y reparamos grifos de cocina, ducha y lavabo. Solucionamos goteos, monomandos, juntas y cartuchos con presupuesto previo.',
    lockedPrimaryKw: 'cambiar grifo cocina',
    secondaryKw: ['grifo gotea', 'cambiar grifo ducha', 'cambiar grifo lavabo', 'cambiar grifo bañera', 'arreglar goteo grifo', 'reparar grifo monomando cocina', 'reparar grifo termostático', 'precio cambiar grifo cocina', 'precio fontanero cambiar grifo'],
    seoBlockKw: ['cambiar grifo cocina', 'grifo gotea', 'cambiar grifo ducha', 'cambiar grifo lavabo', 'cambiar grifo bañera', 'arreglar goteo grifo', 'reparar grifo monomando', 'precio cambiar grifo cocina', 'precio fontanero cambiar grifo'],
    faqKw: ['cuanto cuesta cambiar un grifo', 'precio fontanero cambiar grifo', 'por que gotea un grifo monomando', 'cambiar grifo cocina', 'reparar grifo monomando'],
    contentBrief: 'Texto centrado en cambio y reparación de grifos de cocina, ducha, lavabo y bañera. No competir con instalaciones completas de fontanería.',
    description: 'Cambiamos y reparamos grifos de cocina, ducha, lavabo y bañera. Solucionamos goteos, pérdidas por el mando, juntas y cartuchos.',
    seoContent: {
      badge: 'Grifos y monomandos',
      title: 'Cambio y Reparación de Grifos con Presupuesto Previo',
      intro: [
        'Cambiar grifo cocina, ducha o lavabo es una intervención frecuente cuando el grifo gotea, pierde agua por el mando, se queda duro, no mezcla bien o empieza a mojar el mueble bajo fregadero. Esta página trabaja el cambio y reparación de grifos como servicio específico: grifo de cocina, grifo de ducha, grifo de lavabo, grifo de bañera, monomandos y grifería termostática. No pretende sustituir a una instalación completa de fontanería, sino resolver el problema concreto de la grifería.',
        'Antes de cambiar el grifo revisamos si la avería se puede reparar: cartucho cerámico desgastado, junta deteriorada, flexo en mal estado, rosca con pérdida, cal acumulada o conexión mal apretada. Si el grifo está muy corroído, no hay repuesto compatible o la reparación no compensa, recomendamos sustituirlo. Si ya tienes comprado el grifo, comprobamos compatibilidad con la toma, el lavabo, la ducha o el fregadero antes de instalarlo. Atendemos cambiar grifo ducha, cambiar grifo lavabo, cambiar grifo bañera, reparar grifo monomando cocina y reparar grifo termostático cuando la pieza y el acceso lo permiten.',
        'El precio cambiar grifo cocina o arreglar goteo grifo depende del acceso, estado de las llaves de paso, tipo de grifo y posibles adaptadores. Si buscas precio fontanero cambiar grifo, confirmamos presupuesto antes de tocar la instalación. Al terminar hacemos prueba de apertura, cierre, caudal y estanqueidad, dejando claro qué pieza se ha cambiado y qué garantía cubre el trabajo.',
      ],
      serviceCards: [
        { icon: Wrench, title: 'Cambio de grifos', color: 'blue' as const, bullets: ['Grifo de cocina', 'Grifo de ducha', 'Grifo de lavabo', 'Grifo de bañera'] },
        { icon: Droplets, title: 'Goteos y pérdidas', color: 'orange' as const, bullets: ['Grifo gotea', 'Pérdida por el mando', 'Pérdida por la rosca', 'Fuga bajo fregadero'] },
        { icon: ShieldCheck, title: 'Piezas y garantía', color: 'green' as const, bullets: ['Cartuchos', 'Juntas', 'Flexos', 'Prueba de estanqueidad'] },
      ],
      localCoverage: { title: 'Cambio y reparación de grifos en Valencia', description: 'Atendemos viviendas, locales, pisos de alquiler y comunidades con grifos de cocina, baño, ducha y lavabo.' },
      benefitsTitle: 'Ventajas de arreglar o cambiar el grifo a tiempo',
      benefits: ['Evitas desperdicio de agua', 'Prevenimos daños en muebles', 'Diagnóstico claro antes de cambiar piezas', 'Presupuesto antes de empezar', 'Prueba final de estanqueidad'],
      keywordsTitle: 'Servicios de grifería',
      keywordTags: ['cambiar grifo cocina', 'precio fontanero cambiar grifo', 'grifo gotea', 'cambiar grifo ducha', 'cambiar grifo lavabo', 'reparar grifo monomando'],
    },
    faqs: [
      { question: '¿Cuánto cuestá cambiar un grifo de cocina?', answer: 'Depende del tipo de grifo, acceso bajo fregadero, estado de las llaves de paso y si el cliente ya tiene el grifo comprado. Siempre confirmamos presupuesto antes de empezar.' },
      { question: '¿Por qué gotea un grifo monomando?', answer: 'Lo más habitual es que el cartucho cerámico esté desgastado, haya cal acumulada, una junta pierda estanqueidad o el cierre interno no selle bien.' },
      { question: '¿Reparáis grifos de ducha y grifos termostáticos?', answer: 'Sí. Reparamos y cambiamos grifos de ducha, bañera y modelos termostáticos cuando gotean o no regulan bien la temperatura.' },
      { question: '¿Es mejor reparar o cambiar un grifo que pierde agua?', answer: 'Depende de la edad del grifo, disponibilidad de repuestos, estado del cartucho, corrosión y tipo de avería; reparar grifo monomando compensa si hay repuesto compatible.' },
      { question: '¿Podéis cambiar un grifo si ya lo tengo comprado?', answer: 'Sí, podemos instalar el grifo que ya tienes si es compatible con la toma, el lavabo, fregadero o ducha.' },
    ],
  },

  'grupos-presion-agua': {
    h1: 'Grupos de Presión de Agua',
    metaTitle: 'Grupos de Presión de Agua | Instalación y Reparación',
    metaDescription: 'Instalamos y reparamos grupos de presión de agua para viviendas y comunidades. Bombas, calderín, presostato y presión baja.',
    lockedPrimaryKw: 'grupo de presion de agua',
    secondaryKw: [
      'grupo de presión',
      'grupo presion agua',
      'grupo presion',
      'grupo presión agua doméstico',
      'grupo de presión de agua para comunidades',
      'instalacion bomba de agua',
      'bomba de agua para vivienda',
      'bomba de agua no arranca',
    ],
    seoBlockKw: [
      'grupo de presion de agua',
      'grupo de presión',
      'grupo presion agua',
      'grupo presión agua doméstico',
      'grupo de presión de agua para comunidades',
      'instalacion bomba de agua',
      'bomba de agua para vivienda',
      'reparar bomba de agua',
    ],
    faqKw: [
      'cuanto cuesta instalar un grupo de presion',
      'por que no arranca la bomba de agua',
      'grupo de presion para vivienda',
      'grupo de presión de agua para comunidades',
    ],
    contentBrief: 'Texto centrado en instalación, reparación y mantenimiento de grupos de presión de agua para viviendas y comunidades. Excluir intención puramente e-commerce.',
    description: 'Instalamos y reparamos grupos de presión, bombas de agua, calderines y presostatos para recuperar presión en viviendas y comunidades.',
    seoContent: {
      badge: 'Presión de agua',
      title: 'Instalación y Reparación de Grupos de Presión',
      intro: [
        'Un grupo de presion de agua se instala cuando la presión de red no llega con estabilidad a la vivienda, chalet, local o comunidad. El objetivo de esta página es cubrir instalación bomba de agua, grupo presion agua vivienda, grupo de presión de agua para comunidades y reparación de equipos que no arrancan, hacen ciclos continuos o no mantienen caudal. No tratamos aquí búsquedas de compra de producto sin instalación ni sistemas industriales contra incendios.',
        'El diagnóstico de un grupo de presión empieza midiendo presión real, caudal, arranques de bomba, estado del calderín, presostato, válvula de retención, cuadro eléctrico y conexiones hidráulicas. Una bomba de agua no arranca por muchas causas: condensador, protección térmica, presostato desajustado, falta de alimentación, aire en el circuito, válvula bloqueada o desgaste del motor. Revisar el conjunto evita cambiar piezas a ciegas.',
        'En viviendas con presión baja estudiamos si conviene instalar grupo de presión doméstico, ajustar el equipo existente o sustituir componentes. En comunidades revisamos sala técnica, bombas, calderines, maniobra y fugas asociadas para recuperar servicio sin paradas innecesarias. Siempre damos presupuesto previo, explicamos si la solución es reparación, mantenimiento o sustitución y dejamos prueba de presión antes de cerrar el trabajo.',
      ],
      serviceCards: [
        { icon: Gauge, title: 'Presión estable', color: 'blue' as const, bullets: ['Presión baja', 'Caudal irregular', 'Viviendas altas', 'Comunidades'] },
        { icon: Wrench, title: 'Instalación y reparación', color: 'orange' as const, bullets: ['Bomba de agua', 'Calderín', 'Presostato', 'Válvula de retención'] },
        { icon: ShieldCheck, title: 'Diagnóstico claro', color: 'green' as const, bullets: ['Prueba de presión', 'Revisión eléctrica', 'Ajuste de equipo', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Grupos de presión de agua en Valencia',
        description: 'Servicio para viviendas, chalets, locales, comunidades y edificios con problemas de presión o bombas averiadas.',
      },
      benefitsTitle: 'Ventajas de revisar el grupo de presión',
      benefits: ['Recuperas presión y caudal estable', 'Evitas arranques continuos de la bomba', 'Reducimos riesgo de averías mayores', 'Diagnóstico antes de cambiar piezas', 'Instalación y reparación con garantía'],
      keywordsTitle: 'Servicios de bombas y presión',
      keywordTags: ['grupo de presion de agua', 'grupo presion agua', 'grupo de presión para vivienda', 'grupo de presión para comunidades', 'instalacion bomba de agua', 'reparar bomba de agua'],
    },
    faqs: [
      { question: '¿Cuánto cuestá instalar un grupo de presión de agua?', answer: 'Depende de caudal necesario, tipo de bomba, calderín, acceso a la instalación, conexiones y si es vivienda individual o comunidad. Confirmamos presupuesto antes de empezar.' },
      { question: '¿Por qué no arranca la bomba de agua?', answer: 'Puede fallar el presostato, la alimentación eléctrica, el condensador, la protección térmica, la válvula de retención o la propia bomba. Primero diagnosticamos el origen.' },
      { question: '¿Un grupo de presión sirve para una vivienda con poca presión?', answer: 'Sí, cuando la instalación lo permite. Revisamos presión disponible, consumo previsto y normativa para elegir una solución adecuada.' },
      { question: '¿Reparáis grupos de presión de comunidades?', answer: 'Sí. Revisamos bombas, calderines, maniobra, presostatos, válvulas y fugas asociadas en salas técnicas o cuartos de bombas.' },
      { question: '¿Es mejor reparar o cambiar el grupo de presión?', answer: 'Depende de edad del equipo, disponibilidad de recambios, estado del motor, calderín y coste de la reparación frente a un equipo nuevo.' },
    ],
  },

  'descalcificadores-osmosis': {
    h1: 'Descalcificadores y Ósmosis',
    metaTitle: 'Mantenimiento de Descalcificadores y Ósmosis | Reparar24',
    metaDescription: 'Mantenimiento, reparación e instalación de descalcificadores y equipos de ósmosis inversa. Cambio de filtros, resina, sal y revisión.',
    lockedPrimaryKw: 'mantenimiento descalcificador',
    secondaryKw: [
      'mantenimiento de descalcificador',
      'mantenimiento osmosis',
      'mantenimiento osmosis inversa',
      'reparar descalcificador',
      'reparacion descalcificadores',
      'reparar osmosis',
      'instalar osmosis valencia',
      'instalar descalcificador valencia',
    ],
    seoBlockKw: [
      'mantenimiento descalcificador',
      'mantenimiento de descalcificador',
      'mantenimiento osmosis',
      'mantenimiento osmosis inversa',
      'reparar descalcificador',
      'reparacion descalcificadores',
      'reparar osmosis',
      'instalar osmosis valencia',
    ],
    faqKw: [
      'cuanto cuesta mantenimiento descalcificador',
      'cada cuanto cambiar filtros osmosis',
      'cuando reparar descalcificador',
      'mantenimiento osmosis inversa',
    ],
    contentBrief: 'Texto centrado en mantenimiento, reparación e instalación de descalcificadores y ósmosis inversa. Excluir comparativas de compra y product-only intent.',
    description: 'Mantenimiento y reparación de descalcificadores y ósmosis inversa: filtros, membranas, resina, sal, fugas, presión y revisión del equipo.',
    seoContent: {
      badge: 'Tratamiento de agua',
      title: 'Mantenimiento y Reparación de Descalcificadores y Ósmosis',
      intro: [
        'El mantenimiento descalcificador y el mantenimiento osmosis inversa son servicios de fontanería especializados, no una simple venta de filtros. Esta página se centra en revisar, reparar e instalar equipos de tratamiento de agua que ya están conectados a la instalación: descalcificador doméstico, descalcificadores comunitarios, ósmosis bajo fregadero, grifos de ósmosis, membranas, filtros, resina, sal, conexiones y posibles fugas.',
        'Para reparar descalcificador o reparar osmosis, primero revisamos si hay fuga, baja presión, fallo de regeneración o filtros agotados. En un descalcificador comprobamos programación, regeneración, consumo de sal, by-pass, presión, dureza del agua, resina y estado de las válvulas. Cuando un equipo no regenera, pierde agua o deja pasar cal, puede necesitar ajuste, limpieza, sustitución de juntas, revisión de resina o reparación del cabezal. En ósmosis inversa revisamos filtros, membrana, depósito, presión de trabajo, caudal, sabor del agua y estanqueidad del grifo específico.',
        'El precio del mantenimiento de descalcificador u ósmosis depende del equipo, antigüedad, acceso y recambios necesarios. Si hace falta reparar el equipo, valorar reparacion descalcificadores, instalar osmosis valencia o instalar descalcificador valencia, primero revisamos y después presupuestamos filtros, membranas, resina o reparación si procede. Excluimos comparativas de compra y consultas puramente de producto: nuestro trabajo es dejar el equipo instalado funcionando con seguridad, sin fugas y con mantenimiento documentado.',
      ],
      serviceCards: [
        { icon: Droplets, title: 'Mantenimiento', color: 'blue' as const, bullets: ['Descalcificador', 'Ósmosis inversa', 'Filtros', 'Membrana'] },
        { icon: Wrench, title: 'Reparación', color: 'orange' as const, bullets: ['Fugas', 'Baja presión', 'Equipo no regenera', 'Grifo de ósmosis'] },
        { icon: ShieldCheck, title: 'Instalación', color: 'green' as const, bullets: ['Equipo doméstico', 'Comunidades', 'Conexiones', 'Prueba final'] },
      ],
      localCoverage: {
        title: 'Descalcificadores y ósmosis en Valencia',
        description: 'Servicio para viviendas, locales y comunidades con equipos de tratamiento de agua domésticos o comunitarios.',
      },
      benefitsTitle: 'Ventajas del mantenimiento periódico',
      benefits: ['Mejor calidad de agua', 'Menos cal en la instalación', 'Evitas fugas y averías', 'Mantienes presión y caudal', 'Alargas la vida útil del equipo'],
      keywordsTitle: 'Servicios de tratamiento de agua',
      keywordTags: ['mantenimiento descalcificador', 'mantenimiento osmosis', 'reparar descalcificador', 'reparar osmosis', 'instalar osmosis valencia', 'descalcificador doméstico'],
    },
    faqs: [
      { question: '¿Cuánto cuestá mantenimiento descalcificador?', answer: 'Depende del tipo de equipo, estado de resina, consumo de sal, acceso, antigüedad y recambios necesarios. Damos presupuesto antes de intervenir.' },
      { question: '¿Cada cuánto cambiar filtros osmosis?', answer: 'Normalmente los prefiltros se revisan o cambian cada 6-12 meses y la membrana según uso, calidad del agua y rendimiento del equipo.' },
      { question: '¿Cuándo reparar descalcificador?', answer: 'Sí. Revisamos programador, válvulas, salmuera, resina, by-pass, alimentación y posibles obstrucciones.' },
      { question: '¿Podéis instalar un equipo de ósmosis inversa?', answer: 'Sí. Instalamos equipos compatibles bajo fregadero, revisamos presión, toma de agua, desagüe y grifo específico.' },
      { question: '¿El mantenimiento incluye recambios?', answer: 'Los recambios dependen del equipo y se presupuestan antes: filtros, membranas, juntas, resina u otros componentes.' },
    ],
  },

  'instalacion-cambio-inodoros': {
    h1: 'Instalación y Cambio de Inodoros',
    metaTitle: 'Instalación y Cambio de Inodoros | Sanitarios y WC',
    metaDescription: 'Instalamos y cambiamos inodoros, sanitarios y WC. Retirada del antiguo, conexión, sellado, fijación y prueba de estanqueidad.',
    lockedPrimaryKw: 'instalar inodoro',
    secondaryKw: [
      'instalar inodoro',
      'instalacion sanitario',
      'instalacion de sanitario',
      'instalacion de sanitarios',
      'instalar sanitario',
      'cambiar vater',
      'instalar vater',
      'precio cambiar inodoro',
      'cuanto cobra un fontanero por cambiar un inodoro',
    ],
    seoBlockKw: [
      'cambiar inodoro',
      'instalar inodoro',
      'instalacion sanitario',
      'instalar sanitario',
      'cambiar vater',
      'instalar vater',
      'colocacion de sanitarios',
      'precio instalacion sanitarios',
      'cuanto cobra un fontanero por cambiar un inodoro',
    ],
    faqKw: [
      'cuanto cuesta instalar un inodoro',
      'cuanto cuesta cambiar un inodoro',
      'instalar inodoro',
      'cambiar vater precio',
      'cuanto cobra un fontanero por cambiar un inodoro',
    ],
    contentBrief: 'Texto centrado en instalación y sustitución de inodoros/sanitarios. Reparación de cisternas queda en reparacion-cisternas y atascos WC en desatascos.',
    description: 'Instalamos y cambiamos inodoros, sanitarios y WC con retirada del antiguo, conexión al desagüe, fijación, sellado y prueba final.',
    seoContent: {
      badge: 'Sanitarios y WC',
      title: 'Instalación y Cambio de Inodoros con Garantía',
      intro: [
        'Instalar inodoro o cambiar inodoro parece sencillo, pero una mala colocación puede provocar fugas en la base, olores, movimientos de la taza, descarga deficiente o problemas en la conexión al desagüe. Esta página trabaja instalación sanitario, instalación de sanitarios, instalar váter, cambiar váter y sustitución de WC como servicio propio, separado de la reparación de cisternas y de los desatascos.',
        'Antes de instalar el sanitario comprobamos la salida existente, distancia a pared, toma de agua, estado del manguito, nivel del suelo, fijaciones y compatibilidad del nuevo modelo. Si hay que retirar el inodoro antiguo, lo desmontamos, limpiamos la zona de apoyo y preparamos la conexión. Después colocamos el nuevo WC, fijamos la taza, conectamos entrada y salida, sellamos la base y hacemos pruebas de descarga y estanqueidad.',
        'El precio de cambiar un inodoro depende de si el cliente ya aporta el sanitario, si la salida coincide, si hay que adaptar conexiones, retirar el antiguo o resolver un problema previo de instalación. Si buscas cuánto cobra un fontanero por cambiar un inodoro, la respuesta real depende de esos puntos y no solo de la taza nueva. Si solo la cisterna pierde agua, corresponde a reparación de cisternas; si el WC está atascado, corresponde a desatascos. Así cada página mantiene su intención comercial clara y el presupuesto se ajusta al trabajo real.',
      ],
      serviceCards: [
        { icon: Toilet, title: 'Cambio de WC', color: 'blue' as const, bullets: ['Inodoro compacto', 'WC suspendido', 'Váter antiguo', 'Taza sanitaria'] },
        { icon: Wrench, title: 'Instalación', color: 'orange' as const, bullets: ['Conexión desagüe', 'Toma de agua', 'Fijación', 'Sellado base'] },
        { icon: ShieldCheck, title: 'Prueba final', color: 'green' as const, bullets: ['Descarga correcta', 'Sin fugas', 'Nivelado', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Instalación de inodoros en Valencia',
        description: 'Servicio para viviendas, baños reformados, locales, pisos de alquiler y sustitución de sanitarios antiguos.',
      },
      benefitsTitle: 'Ventajas de cambiar el inodoro correctamente',
      benefits: ['Evitas fugas en la base', 'Mejor sellado y estabilidad', 'Compatibilidad con la salida existente', 'Retirada del sanitario antiguo', 'Instalación con garantía'],
      keywordsTitle: 'Servicios de inodoros y sanitarios',
      keywordTags: ['cambiar inodoro', 'instalar inodoro', 'instalacion sanitario', 'instalar sanitario', 'precio cambiar inodoro', 'cuanto cobra un fontanero por cambiar un inodoro'],
    },
    faqs: [
      { question: '¿Cuánto cuestá instalar un inodoro?', answer: 'Depende del tipo de WC, salida existente, acceso, retirada del antiguo, estado de la toma de agua y si hay que adaptar conexiones. Confirmamos presupuesto antes.' },
      { question: '¿Cuánto cobra un fontanero por cambiar un inodoro?', answer: 'Depende de si hay que retirar el antiguo, adaptar salida o toma de agua, sellar base, transportar el sanitario y comprobar estanqueidad. Por eso damos precio cerrado tras revisar medidas y acceso.' },
      { question: '¿Podéis cambiar un inodoro antiguo por uno nuevo?', answer: 'Sí. Retiramos el antiguo, comprobamos medidas y salida, instalamos el nuevo, sellamos la base y hacemos prueba final.' },
      { question: '¿Incluye retirada del sanitario antiguo?', answer: 'Puede incluirse en el presupuesto. Lo confirmamos antes según acceso, peso, transporte y punto de retirada.' },
      { question: '¿Esta página cubre cisternas que pierden agua?', answer: 'No como servicio principal. Las cisternas que gotean o no cargan se atienden en reparación de cisternas.' },
      { question: '¿Atendéis inodoros atascados?', answer: 'Los atascos de WC pertenecen al servicio de desatascos, porque requieren otro diagnóstico y herramientas específicas.' },
    ],
  },

  'instalacion-lavabos': {
    h1: 'Instalación y Reparación de Lavabos',
    metaTitle: 'Cambiar Lavabo | Instalación y Reparación de Lavabos',
    metaDescription: 'Cambio e instalación de lavabos: desagüe, sifón, válvula click clack, sellado y prueba de estanqueidad con presupuesto previo.',
    lockedPrimaryKw: 'cambiar lavabo',
    secondaryKw: [
      'cambiar desague lavabo',
      'cambiar sifon lavabo',
      'cambiar valvula lavabo',
      'instalar lavabo',
      'instalar lavabo suspendido',
      'montaje lavabo',
      'montar lavabo sobre encimera',
      'arreglar lavabo que gotea',
    ],
    seoBlockKw: [
      'cambiar lavabo',
      'cambiar desague lavabo',
      'cambiar sifon lavabo',
      'cambiar valvula lavabo',
      'instalar lavabo',
      'montaje lavabo',
      'poner desague lavabo',
      'arreglar lavabo que gotea',
    ],
    faqKw: [
      'cuanto cuesta cambiar un lavabo',
      'cambiar desague lavabo',
      'cambiar sifon lavabo',
      'instalar lavabo suspendido',
    ],
    contentBrief: 'Texto centrado en cambio, instalación y pequeñas reparaciones de lavabos: desagüe, sifón, válvula click clack, sellado y goteos. Excluir grifería como foco principal y reforma completa de baño.',
    description: 'Cambiamos e instalamos lavabos, desagües, sifones y válvulas con sellado, conexión correcta y prueba final de estanqueidad.',
    seoContent: {
      badge: 'Lavabos y desagües',
      title: 'Cambio e Instalación de Lavabos con Presupuesto Previo',
      intro: [
        'Cambiar lavabo es un trabajo pequeño si se mira desde fuera, pero concentra varias piezas que deben quedar bien conectadas: toma de agua, desagüe, sifón, válvula, mueble, pared, encimera y sellado. Esta página se centra en cambiar lavabo, instalar lavabo, montaje lavabo, cambiar desague lavabo, cambiar sifon lavabo y cambiar valvula lavabo cuando el problema está en la pieza sanitaria o en su conexión inferior. Si lo que falla es el grifo, la intención principal pertenece a cambio y reparación de grifos; si hablamos de una reforma completa, corresponde a instalaciones de fontanería.',
        'Antes de intervenir revisamos el tipo de lavabo, el estado del mueble o soporte, la salida del desagüe, la altura, la compatibilidad del sifón y si existe fuga por junta, válvula click clack, tubo flexible o conexión a pared. También comprobamos si conviene sustituir solo el desagüe o sifón, reparar un lavabo que gotea por abajo o cambiar el lavabo completo porque está roto, antiguo, mal fijado o no encaja con el nuevo mueble. Esta separación evita presupuestos inflados y permite resolver el punto real de la avería.',
        'Trabajamos con presupuesto previo y prueba de estanqueidad al terminar. En lavabos suspendidos revisamos fijaciones y carga; en lavabos sobre encimera cuidamos el corte, apoyo y sellado; en lavabos antiguos valoramos si hay que adaptar el desagüe o cambiar válvula. El objetivo es que el lavabo quede estable, sin olores, sin goteos y con evacuación correcta desde el primer uso. La página no persigue consultas de compra de producto ni guías de bricolaje: está orientada a servicio profesional para vivienda, local o piso de alquiler.',
      ],
      serviceCards: [
        { icon: Droplets, title: 'Desagüe y sifón', color: 'blue' as const, bullets: ['Cambiar desagüe lavabo', 'Cambiar sifón lavabo', 'Válvula click clack', 'Sin malos olores'] },
        { icon: Wrench, title: 'Instalación', color: 'orange' as const, bullets: ['Lavabo suspendido', 'Sobre encimera', 'Lavabo con mueble', 'Adaptación de conexión'] },
        { icon: ShieldCheck, title: 'Prueba final', color: 'green' as const, bullets: ['Sellado limpio', 'Sin goteos', 'Evacuación correcta', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Cambio de lavabos en Valencia',
        description: 'Servicio para viviendas, locales, baños reformados, pisos de alquiler y sustitución de lavabos antiguos.',
      },
      benefitsTitle: 'Ventajas de reparar o cambiar el lavabo correctamente',
      benefits: ['Evitas goteos bajo el mueble', 'Eliminamos olores por sifón mal conectado', 'Adaptamos desagüe y válvula', 'Instalación estable y sellada', 'Presupuesto antes de empezar'],
      keywordsTitle: 'Servicios de lavabos',
      keywordTags: ['cambiar lavabo', 'instalar lavabo', 'cambiar desague lavabo', 'cambiar sifon lavabo', 'cambiar valvula lavabo', 'montaje lavabo'],
    },
    faqs: [
      { question: '¿Cuánto cuestá cambiar un lavabo?', answer: 'Depende del tipo de lavabo, si va suspendido, sobre encimera o con mueble, del estado del desagüe, sifón, válvula y de si hay que adaptar conexiones. Confirmamos presupuesto antes de empezar.' },
      { question: '¿Podéis cambiar solo el desagüe o sifón del lavabo?', answer: 'Sí. Si el lavabo está bien y la fuga viene del desagüe, sifón, junta o válvula, cambiamos solo la pieza necesaria y hacemos prueba de estanqueidad.' },
      { question: '¿Instaláis lavabos suspendidos o sobre encimera?', answer: 'Sí. Revisamos soporte, altura, fijación, conexión del desagüe y sellado para que el lavabo quede estable y sin fugas.' },
      { question: '¿Qué hago si el lavabo gotea por abajo?', answer: 'Conviene cerrar el agua si la pérdida es importante y evitar usar el lavabo. Normalmente el origen está en sifón, junta, válvula o conexión a pared.' },
      { question: '¿Esta página incluye cambio de grifos de lavabo?', answer: 'Puede hacerse en la misma visita, pero el foco SEO y comercial del cambio de grifos pertenece a la página de cambio y reparación de grifos.' },
    ],
  },

  'mamparas-ducha': {
    h1: 'Instalación y Reparación de Mamparas de Ducha',
    metaTitle: 'Cambiar Mampara de Ducha | Instalación y Reparación',
    metaDescription: 'Instalamos, cambiamos y reparamos mamparas de ducha. Ajuste de puertas, sellado, perfiles, rodamientos y presupuesto previo.',
    lockedPrimaryKw: 'cambiar mampara ducha',
    secondaryKw: [
      'reparacion de mamparas de baño',
      'reparacion de mamparas de ducha',
      'reparar mampara ducha',
      'arreglar mampara ducha',
      'sustituir mampara de ducha',
      'poner una mampara de ducha',
      'cambiar mampara bañera',
      'instalacion mampara ducha',
    ],
    seoBlockKw: [
      'cambiar mampara ducha',
      'reparacion de mamparas de baño',
      'reparacion de mamparas de ducha',
      'reparar mampara ducha',
      'arreglar mampara ducha',
      'sustituir mampara de ducha',
      'poner una mampara de ducha',
      'instalacion mampara ducha',
    ],
    faqKw: [
      'cuanto cuesta cambiar una mampara de ducha',
      'reparar mampara ducha',
      'arreglar puerta mampara ducha',
      'poner una mampara de ducha',
    ],
    contentBrief: 'Texto centrado en instalación, sustitución y reparación de mamparas de ducha o bañera. Mantener separado de cambio de bañera por ducha y de instalación de plato de ducha.',
    description: 'Instalamos, cambiamos y reparamos mamparas de ducha y bañera con ajuste de perfiles, puertas, rodamientos, sellado y garantía.',
    seoContent: {
      badge: 'Mamparas de ducha',
      title: 'Instalación y Reparación de Mamparas de Ducha',
      intro: [
        'Cambiar mampara ducha o reparar mampara ducha requiere medir bien, nivelar perfiles y sellar sin bloquear la evacuación del agua. Esta página trabaja la instalación mampara ducha, sustitución de mampara de ducha, reparación de mamparas de baño y arreglo de mamparas de ducha cuando la puerta roza, no cierra, pierde agua por los perfiles, tiene rodamientos dañados o necesita un sellado nuevo. No sustituye a la página de cambiar bañera por ducha, que mantiene la conversión completa y el plato de ducha como intención principal.',
        'Antes de instalar o sustituir la mampara revisamos medidas del hueco, tipo de plato o bañera, escuadra de paredes, estado del alicatado, perfiles existentes, sentido de apertura y compatibilidad de la mampara. Cuando se puede reparar, ajustamos puertas, cambiamos rodamientos, repasamos juntas, recolocamos perfiles o renovamos silicona. Si el vidrio está dañado, los perfiles están deformados o el modelo ya no admite recambio, recomendamos cambiar la mampara completa con presupuesto cerrado.',
        'El trabajo se entrega con prueba de uso y revisión de estanqueidad. Una mampara mal montada provoca fugas al suelo, humedad en muebles, puertas que se descuelgan y acumulación de cal en puntos difíciles de limpiar. Por eso cuidamos el apoyo, la alineación, el sellado y la fijación. Atendemos viviendas, pisos de alquiler, baños reformados y locales, siempre separando la demanda comercial real de consultas de producto o bricolaje. Si ya tienes comprada la mampara, verificamos medidas y compatibilidad antes de instalarla.',
      ],
      serviceCards: [
        { icon: ShowerHead, title: 'Instalación', color: 'blue' as const, bullets: ['Mampara fija', 'Corredera', 'Abatible', 'Para ducha o bañera'] },
        { icon: Wrench, title: 'Reparación', color: 'orange' as const, bullets: ['Puerta que roza', 'Rodamientos', 'Juntas', 'Perfiles'] },
        { icon: ShieldCheck, title: 'Sellado', color: 'green' as const, bullets: ['Sin fugas', 'Nivelación', 'Silicona sanitaria', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Mamparas de ducha en Valencia',
        description: 'Servicio para instalación, cambio y reparación de mamparas en viviendas, pisos de alquiler y baños reformados.',
      },
      benefitsTitle: 'Ventajas de instalar o reparar la mampara a tiempo',
      benefits: ['Evitas fugas al suelo', 'Mejoras cierre y deslizamiento', 'Reducimos humedad en el baño', 'Ajuste y sellado profesional', 'Presupuesto claro antes de intervenir'],
      keywordsTitle: 'Servicios de mamparas',
      keywordTags: ['cambiar mampara ducha', 'reparar mampara ducha', 'reparacion de mamparas de ducha', 'arreglar mampara ducha', 'sustituir mampara de ducha', 'instalacion mampara ducha'],
    },
    faqs: [
      { question: '¿Cuánto cuestá cambiar una mampara de ducha?', answer: 'Depende de medidas, tipo de apertura, estado de paredes, retirada de la antigua y si la mampara la aporta el cliente. Revisamos compatibilidad y confirmamos presupuesto antes.' },
      { question: '¿Reparáis mamparas que no cierran bien?', answer: 'Sí. Revisamos rodamientos, bisagras, perfiles, juntas y nivelación. Si el recambio existe, normalmente se puede reparar sin cambiar toda la mampara.' },
      { question: '¿Cuándo conviene reparar una mampara de ducha?', answer: 'Conviene reparar la mampara cuando el vidrio está bien y el problema está en rodamientos, perfiles, juntas, bisagras, cierre o sellado. Si el sistema está deformado, valoramos sustitución.' },
      { question: '¿Podéis instalar una mampara que ya tengo comprada?', answer: 'Sí, siempre que las medidas y el sistema sean compatibles con el hueco, plato o bañera. Lo comprobamos antes de empezar.' },
      { question: '¿Cuándo conviene sustituir la mampara completa?', answer: 'Cuando el vidrio está dañado, los perfiles están deformados, faltan recambios o la reparación no garantiza un cierre seguro y estanco.' },
      { question: '¿Esta página incluye cambiar plato de ducha?', answer: 'No como intención principal. El cambio de plato de ducha y la conversión de bañera a ducha se trabajan en la página de cambiar bañera por ducha.' },
    ],
  },

  'bajantes': {
    h1: 'Reparación de Bajantes',
    metaTitle: 'Reparación de Bajantes sin Obras | PVC y Comunidades',
    metaDescription: 'Reparación y cambio de bajantes de PVC o comunidad. Diagnóstico de fugas, tramos dañados, sellado y presupuesto previo.',
    lockedPrimaryKw: 'reparacion de bajantes sin obras',
    secondaryKw: [
      'reparar bajantes sin obras',
      'reparar bajante sin obras',
      'reparacion de bajantes',
      'reparar bajante pvc',
      'reparacion bajantes',
      'arreglar bajantes',
      'cambiar bajante comunidad',
      'cambiar bajantes comunidad precio',
      'reparacion bajantes comunidad',
    ],
    seoBlockKw: [
      'reparacion de bajantes sin obras',
      'reparar bajantes sin obras',
      'reparar bajante sin obras',
      'reparacion de bajantes',
      'reparar bajante pvc',
      'cambiar bajante comunidad',
      'cambio de bajantes comunidad',
      'cambiar bajantes comunidad precio',
      'sustitucion bajantes valencia',
    ],
    faqKw: [
      'cuanto cuesta reparar una bajante',
      'reparacion de bajantes sin obras',
      'reparar bajante sin obras',
      'cambiar bajante comunidad',
      'reparar bajante pvc',
    ],
    contentBrief: 'Texto centrado en reparación y cambio de bajantes de PVC o comunidad, incluyendo soluciones sin obra cuando son viables. Separar de detección genérica de fugas y de sustitución amplia de tuberías.',
    description: 'Reparamos y cambiamos bajantes de PVC o comunidad con diagnóstico, presupuesto previo y soluciones sin obra cuando la instalación lo permite.',
    seoContent: {
      badge: 'Bajantes y comunidades',
      title: 'Reparación de Bajantes sin Obras Cuando es Viable',
      intro: [
        'La reparacion de bajantes sin obras es una solución muy buscada cuando una comunidad, vivienda o local tiene humedad, olor, ruido de descarga o una fuga localizada en una bajante vertical. Esta página se centra en reparar bajantes sin obras, reparar bajante sin obras, reparación de bajantes, reparar bajante PVC, cambiar bajante comunidad y sustitución de bajantes cuando el problema está en el tramo vertical o en sus conexiones. No sustituye a detección de fugas general ni a cambio completo de tuberías de una vivienda; aquí el foco es la bajante y su impacto en vecinos, techos, patios y zonas comunes.',
        'Antes de proponer reparación o cambio revisamos material, accesibilidad, tramo afectado, uniones, codos, registros, paso por forjados y si existe daño por fisura, junta abierta, PVC deformado, vibración o bajante antigua. Cuando la avería lo permite, se puede reparar sin obra grande mediante acceso localizado, sellado técnico, sustitución parcial de tramo o refuerzo compatible. Si la bajante está muy deteriorada, es de uralita, tiene varias fugas o afecta a diferentes plantas, lo responsable es valorar cambio de bajante de comunidad con planificación clara.',
        'El precio de cambiar bajantes en comunidad depende de altura, número de plantas, acceso, retirada de material, necesidad de albañilería y coordinación con vecinos. Por eso trabajamos con diagnóstico previo y presupuesto explicado antes de intervenir. En reparaciones puntuales hacemos prueba de estanqueidad y dejamos indicado qué tramo se ha tratado. Si además hay fuga oculta o humedad sin origen claro, coordinamos la localización, pero la página mantiene su intención comercial: bajantes, reparación, sustitución y mantenimiento técnico.',
      ],
      serviceCards: [
        { icon: Wrench, title: 'Reparación de bajantes', color: 'blue' as const, bullets: ['Bajante PVC', 'Fisuras', 'Juntas abiertas', 'Tramos dañados'] },
        { icon: Droplets, title: 'Sin obra cuando se puede', color: 'orange' as const, bullets: ['Acceso localizado', 'Sellado técnico', 'Sustitución parcial', 'Prueba de estanqueidad'] },
        { icon: ShieldCheck, title: 'Comunidades', color: 'green' as const, bullets: ['Presupuesto claro', 'Coordinación vecinos', 'Cambio de bajante', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Reparación de bajantes en Valencia',
        description: 'Servicio para viviendas, locales y comunidades con bajantes de PVC, antiguas, dañadas o con fugas localizadas.',
      },
      benefitsTitle: 'Ventajas de actuar sobre una bajante dañada',
      benefits: ['Evitas humedades entre plantas', 'Reducimos olores y filtraciones', 'Valoramos reparación sin obra si es viable', 'Presupuesto para comunidades', 'Trabajo con garantía y prueba final'],
      keywordsTitle: 'Servicios de bajantes',
      keywordTags: ['reparacion de bajantes sin obras', 'reparar bajantes sin obras', 'reparar bajante sin obras', 'reparacion de bajantes', 'reparar bajante pvc', 'cambiar bajante comunidad'],
    },
    faqs: [
      { question: '¿Se pueden reparar bajantes sin obras?', answer: 'A veces sí, si el daño está localizado y hay acceso suficiente. Revisamos el tramo, material y tipo de fuga antes de decidir si basta una reparación parcial o si hace falta sustituir.' },
      { question: '¿Cuánto cuestá reparar una bajante?', answer: 'Depende de altura, acceso, material, tramo afectado y si es vivienda individual o comunidad. Damos presupuesto previo tras revisar el caso.' },
      { question: '¿Cuándo conviene cambiar una bajante de comunidad?', answer: 'Cuando hay varias fugas, material muy antiguo, bajante deformada, fisuras repetidas o daños que afectan a varias viviendas o zonas comunes.' },
      { question: '¿Reparáis bajantes de PVC?', answer: 'Sí. Reparamos o sustituimos tramos de PVC, juntas, codos y conexiones cuando el sistema lo permite y la solución queda segura.' },
      { question: '¿Esta página cubre fugas ocultas?', answer: 'Solo cuando la fuga pertenece a la bajante. La detección general de fugas de agua se trabaja en la página específica de reparación de fugas.' },
    ],
  },

  'reparacion-duchas': {
    h1: 'Reparación y Cambio de Duchas',
    metaTitle: 'Reparación de Duchas | Cambio de Columnas y Flexos',
    metaDescription: 'Cambio y reparación de duchas, columnas, flexos, mangueras, desagües, sumideros y goteos con presupuesto previo.',
    lockedPrimaryKw: 'cambiar ducha',
    secondaryKw: [
      'cambio de ducha',
      'reforma ducha',
      'reformas de duchas',
      'reformas duchas baños',
      'cambiar columna de ducha',
      'cambiar desague ducha',
      'ducha gotea',
      'ducha goteando',
      'goteo ducha',
      'arreglar ducha que gotea',
      'cambiar flexo ducha',
      'cambiar manguera ducha',
      'reparar ducha que gotea',
      'reparar grifo termostatico de ducha',
      'reparar grifo de ducha que gotea',
      'reparar grifo banera',
    ],
    seoBlockKw: [
      'cambiar ducha',
      'cambio de ducha',
      'reforma ducha',
      'cambiar columna de ducha',
      'cambiar desague ducha',
      'ducha gotea',
      'cambiar flexo ducha',
      'arreglar ducha que gotea',
      'reparar ducha que gotea',
      'reparar grifo termostatico de ducha',
      'reparar grifo de ducha que gotea',
      'cambio de ducha precio',
    ],
    faqKw: [
      'cuanto cuesta cambiar una ducha',
      'ducha gotea',
      'cambiar columna de ducha',
      'cambiar desague ducha',
      'reparar ducha que gotea',
      'reparar grifo termostatico de ducha',
      'reparar grifo de ducha que gotea',
    ],
    contentBrief: 'Texto centrado en reparación y cambio de duchas: columna, flexo, manguera, desagüe, sumidero, goteo y pequeños trabajos. Puede cubrir grifo termostático o grifo de ducha cuando el goteo pertenece al conjunto de ducha; mantener grifería general en cambio-reparacion-grifos.',
    description: 'Reparamos y cambiamos duchas, columnas, flexos, mangueras, desagües y sumideros con diagnóstico claro y presupuesto previo.',
    seoContent: {
      badge: 'Duchas y accesorios',
      title: 'Reparación y Cambio de Duchas sin Reforma Completa',
      intro: [
        'Cambiar ducha no siempre significa reformar todo el baño. Esta página cubre cambio de ducha, reparación de duchas, cambiar columna de ducha, cambiar manguera ducha, cambiar flexo ducha, cambiar desague ducha y goteo ducha cuando el problema está en los elementos de uso diario de la ducha. También revisamos reparar ducha que gotea, reparar grifo termostático y reparar grifo de ducha que gotea cuando el fallo pertenece al conjunto de ducha y no a una grifería general de cocina o lavabo.',
        'Antes de intervenir revisamos si la ducha gotea por una conexión, si el flexo está deteriorado, si la columna no regula bien, si el sumidero evacúa lento, si el desagüe pierde agua o si una pieza se ha soltado por desgaste. En muchas viviendas se puede resolver con sustitución de manguera, ajuste de columna, reparación de grifo de bañera o ducha, cambio de desagüe o reparación localizada sin abrir una obra mayor. Si el problema viene del plato, de la mampara o de grifería fuera de la ducha, lo derivamos a la página correcta para mantener el presupuesto y el SEO sin solapamientos.',
        'El precio de cambio de ducha depende de acceso, piezas necesarias, estado de las conexiones, antigüedad del sistema y si el cliente ya dispone de recambio. Trabajamos con presupuesto previo, prueba de estanqueidad y comprobación de caudal. Esta página está pensada para viviendas, pisos de alquiler, baños antiguos y pequeñas reparaciones donde se busca recuperar una ducha funcional, sin goteos, con evacuación correcta y sin convertir una avería sencilla en una reforma completa.',
      ],
      serviceCards: [
        { icon: ShowerHead, title: 'Cambio de ducha', color: 'blue' as const, bullets: ['Columna de ducha', 'Flexo', 'Manguera', 'Soporte'] },
        { icon: Droplets, title: 'Goteos y desagües', color: 'orange' as const, bullets: ['Ducha gotea', 'Desagüe ducha', 'Sumidero', 'Prueba de estanqueidad'] },
        { icon: ShieldCheck, title: 'Diagnóstico claro', color: 'green' as const, bullets: ['Sin obra innecesaria', 'Presupuesto previo', 'Piezas compatibles', 'Garantía escrita'] },
      ],
      localCoverage: {
        title: 'Reparación de duchas en Valencia',
        description: 'Servicio para viviendas, pisos de alquiler y baños con duchas que gotean, columnas averiadas o desagües defectuosos.',
      },
      benefitsTitle: 'Ventajas de reparar la ducha a tiempo',
      benefits: ['Evitas goteos y humedad', 'Recuperas caudal y comodidad', 'Sustituimos solo la pieza necesaria', 'Separamos plato, mampara y grifería general si corresponde', 'Presupuesto claro antes de intervenir'],
      keywordsTitle: 'Servicios de ducha',
      keywordTags: ['cambiar ducha', 'cambio de ducha', 'cambiar columna de ducha', 'reparar ducha que gotea', 'reparar grifo termostatico de ducha', 'reparar grifo de ducha que gotea'],
    },
    faqs: [
      { question: '¿Cuánto cuestá cambiar una ducha?', answer: 'Depende de si hay que cambiar columna, flexo, manguera, desagüe, sumidero o varias piezas. Revisamos el caso y damos presupuesto antes de empezar.' },
      { question: '¿Reparáis duchas que gotean?', answer: 'Sí. Localizamos si el goteo viene de una conexión, flexo, columna, desagüe, sumidero o pieza desgastada y reparamos la causa real.' },
      { question: '¿Reparáis grifos termostáticos de ducha?', answer: 'Si el grifo termostático pertenece a la ducha y gotea, no regula o pierde por una conexión, lo revisamos dentro de este servicio. Para grifos de cocina, lavabo o bañera como foco principal usamos la página de cambio y reparación de grifos.' },
      { question: '¿Podéis cambiar una columna de ducha?', answer: 'Sí. Comprobamos medidas, tomas, fijaciones y compatibilidad antes de instalar o sustituir la columna.' },
      { question: '¿Esta página incluye plato de ducha o mampara?', answer: 'No como foco principal. El plato de ducha pertenece a cambiar bañera por ducha y la mampara a mamparas de ducha.' },
      { question: '¿Cambiáis flexos y mangueras de ducha?', answer: 'Sí. Cambiamos flexos, mangueras, soportes y conexiones cuando están deteriorados o provocan pérdidas.' },
    ],
  },
}




