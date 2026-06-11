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
    contentBrief: 'Texto centrado en detección de fugas, fugas ocultas, fuga en tubería, reparación urgente y garantía.',
    description: 'Especialistas en reparación y detección de fugas de agua. Localizamos fugas ocultas y reparamos con garantía y presupuesto previo.',
    seoContent: {
      badge: 'Detección y reparación de fugas',
      title: 'Servicio Profesional de Reparación de Fugas de Agua',
      intro: [
        'La detección y reparación de fugas de agua es un servicio especializado que requiere tecnología avanzada y técnicos cualificados. Una fuga de agua no detectada puede causar daños estructurales importantes, incrementar dramáticamente tu factura de agua y crear problemas de humedad que afectan la salud de tu hogar.',
        'Nuestro equipo utiliza equipos profesionales de última generación para localizar fugas ocultas sin necesidad de romper paredes o suelos innecesariamente. Trabajamos con termografía infrarroja, correlación acústica y geófonos electrónicos que permiten detectar el sonido del agua escapando incluso en tuberías enterradas a varios metros de profundidad.',
        'Una fuga de agua en casa puede manifestarse de múltiples formas: manchas de humedad en paredes o techos, un contador que gira constantemente aunque no se use agua, pérdida de presión en grifos, sonido de agua corriendo cuando todo está cerrado, o una factura de agua inexplicablemente elevada.',
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
        question: '¿Cuánto cuesta detectar una fuga de agua?',
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
        question: '¿Qué garantía ofrecéis en reparaciones de fugas?',
        answer: 'Todas nuestras reparaciones de fugas tienen garantía de 2 años en mano de obra. Los materiales usados (tuberías, manguitos, conectores) tienen garantía del fabricante que varía según marca: generalmente 10-25 años para tuberías certificadas. Si la misma fuga reaparece en el mismo punto reparado dentro de 2 años, volvemos y lo solucionamos sin coste adicional. Trabajamos solo con materiales profesionales certificados de primeras marcas, no usamos productos de ferretería domésticos. Todas las reparaciones incluyen pruebas de estanqueidad post-trabajo para verificar sellado perfecto antes de irnos.',
      },
    ],
  },
  
  'desatascos': {
    h1: 'Desatascos de Tuberías',
    metaTitle: 'Desatascos de Tuberías | Servicio Urgente 24/7',
    metaDescription: 'Servicio de desatascos para tuberías, desagües, arquetas y bajantes. Atención urgente, equipos profesionales y presupuesto claro.',
    lockedPrimaryKw: 'desatascos',
    secondaryKw: ['desatascos valencia', 'desatascos urgentes', 'desatascos en valencia', 'desatascos 24 horas', 'desatascos 24 horas valencia', 'desatascos 24h', 'desatascos urgentes valencia', 'empresa de desatascos', 'empresa desatascos', 'empresa desatascos valencia', 'empresas de desatascos', 'desatascos cerca de mi'],
    seoBlockKw: ['desatascos', 'desatascos valencia', 'desatascos urgentes', 'desatascos 24 horas', 'empresa de desatascos', 'desatascos tuberias', 'desatascos de tuberías', 'desatascos de fregaderos', 'desatascos con camion cuba valencia', 'camión cuba desatascos', 'camion cuba desatascos', 'camion desatascos', 'cuba desatascos', 'arqueta desatascos', 'fontanero desatascos'],
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
        question: '¿Cuánto cuesta un desatasco con camión cuba en Valencia?',
        answer: 'El precio del camión cuba desatascos en Valencia oscila entre 280-450€ según volumen a extraer y complejidad del acceso. El servicio de camión cuba desatascos se requiere cuando arquetas comunitarias están saturadas con acumulación de grasas, arena y residuos compactados, pozos de registro con metros cúbicos de lodos, o limpieza profunda de colectores. El precio incluye: desplazamiento del camión cuba especializado, vaciado completo con bomba de succión de alta potencia, limpieza a presión intensiva 150 bar del interior de la arqueta, extracción de residuos sólidos adheridos, transporte a punto de tratamiento autorizado, y enjuague final. Los desatascos con camion cuba valencia son inversión necesaria en comunidades donde arquetas nunca han recibido limpieza profesional. Una cuba desatascos resuelve saturaciones que equipos convencionales no pueden abordar.',
      },
      {
        question: '¿Cuáles son las tarifas de desatascos en Valencia?',
        answer: 'Las tarifas de desatascos y precios de empresa de desatascos profesional en Valencia varían según tipo de obstrucción: Desatasco simple accesible (sifón, WC superficial) desde 65€. Desatasco con máquina eléctrica rotativa (caso más frecuente) 95-190€ según complejidad y longitud de tubería. Desatasco de bajante comunitario vertical 160-320€ según altura. Inspección con cámara diagnóstica 85-160€ adicional para detectar problema estructural. Camión cuba desatascos para arquetas saturadas 280-450€. El precio desatascos urgencias en servicio nocturno (22h-8h) o festivo añade recargo 45-65€. El desatascos precio siempre se comunica completo por teléfono antes del desplazamiento. No hay sorpresas en la facturación. Como empresa de desatascos en Valencia, ofrecemos presupuesto cerrado que incluye desplazamiento, diagnóstico, desatasco completo y verificación. El precio hora desatascos NO aplicamos: trabajamos con precio cerrado por trabajo, no por tiempo.',
      },
      {
        question: '¿Cuánto cuesta un desatasco urgente nocturno o festivo?',
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
    faqKw: ['cuanto cobra un fontanero por cambiar un grifo', 'cuanto cuesta instalar un baño completo', 'precio instalacion fontaneria baño', 'precio cambiar grifo', 'se puede instalar fontaneria en pladur', 'cuanto cuesta reforma baño fontaneria', 'precio instalacion sanitarios'],
    contentBrief: 'Texto centrado en instalación de grifos, sanitarios, baños, termos y trabajos con garantía.',
    description: 'Instalamos grifos, sanitarios, termos y tuberías con técnicos cualificados, materiales de calidad y garantía por escrito.',
    seoContent: {
      badge: 'Instalaciones certificadas',
      title: 'Instalaciones de Fontanería Profesionales con Garantía',
      intro: [
        'La instalación fontanería profesional es fundamental tanto en obra nueva como en reformas. Una instalación bien ejecutada con materiales de calidad garantiza agua potable limpia, presión adecuada, ausencia de fugas, y durabilidad de 40-50 años. Una instalación deficiente con materiales baratos o mano de obra inexperta causa problemas recurrentes: fugas, pérdida de presión, averías frecuentes, y reparaciones costosas que superan el ahorro inicial.',
        'Realizamos instalación fontaneria baño completa, instalación de grifos y sanitarios, instalación fontaneria en pladur con refuerzos adecuados, instalación de tuberías para obra nueva, y cualquier trabajo relacionado. Trabajamos siguiendo estrictamente el Código Técnico de la Edificación (CTE), utilizando materiales certificados UNE, y coordinándonos perfectamente con otros oficios (albañilería, electricidad, alicatado).'
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
        question: '¿Cuánto cuesta instalar un baño completo de fontanería?',
        answer: 'Instalacion fontaneria baño completa (tuberías, desagües, conexiones, sin sanitarios): Baño básico pequeño (ducha, lavabo, inodoro): 600-1.000€. Baño mediano completo (ducha/bañera, lavabo, inodoro, bidé): 1.000-1.800€. Incluye: tuberías agua fría y caliente desde acometida, red evacuación con pendientes, sifones, llaves paso, instalación hidráulica de sanitarios, pruebas estanqueidad, certificado. NO incluye: alicatado, sanitarios, grifería, electricidad. Si añades sanitarios gama media + grifería: +900-2.000€. Total cuanto cuesta instalar un baño completo instalado: 1.500-3.800€ según tamaño y calidades.',
      },
      {
        question: '¿Qué precio tiene la instalación de fontanería en un baño?',
        answer: 'Precio instalacion fontaneria baño solo fontanería (no sanitarios, no alicatado): Baño estándar 5-6m²: 800-1.400€. Incluye: red tuberías cobre o multicapa con llaves paso sectoriales, red evacuación PVC con pendientes reglamentarias, instalación hidráulica inodoro/lavabo/ducha, sifones, válvulas, pruebas presión, certificado. Si es reforma (quitar instalación antigua + nueva): +200-400€ por demolición y retirada. El precio instalacion sanitarios (instalar inodoro, lavabo, ducha que tú aportas): +300-600€ mano de obra. Presupuesto varía según: tamaño baño, si instalacion fontaneria en pladur o tradicional, complejidad distribución.',
      },
      {
        question: '¿Cuánto cuesta cambiar un grifo de cocina o baño?',
        answer: 'Precio cambiar grifo solo mano de obra: Monomando simple lavabo/fregadero: 60-80€. Grifo dos  mandos: 70-90€. Termostático ducha: 100-120€. Monomando cocina extraíble: 80-100€. Grifo bañera mezclador: 90-120€. Grifo empotrado en pared: 120-180€ (requiere obra menor). Si llaves de paso están bloqueadas y hay que cambiarlas: +40-70€. Si necesita adaptadores roscas o extensores: +20-40€. Estos precios son cambiar grifo existente funcional por otro nuevo (tú lo aportas). Incluye retirada antiguo, instalación nuevo, conexiones, pruebas. NO incluye el grifo nuevo, solo instalación.',
      },
      {
        question: '¿Se puede instalar fontanería en paredes de pladur?',
        answer: 'Sí, se puede instalar fontaneria en pladur pero con consideraciones técnicas importantes: 1) Pladur debe ser hidrófugo (verde) en zonas húmedas obligatorio. 2) Para instalacion inodoro suspendido necesitas bastidor metálico empotrado ANTES del pladur que soporte peso (hasta 400kg). 3) Lavabos suspendidos o muebles pesados también requieren refuerzos metálicos empotrados. 4) Tuberías pasan por perfiles o premarcos metálicos previstos. 5) Una vez cerrado pladur NO hay acceso a tuberías, por eso se dejan registros con válvulas corte accesibles. 6) Medidas instalacion fontaneria deben ser exactas porque corrección posterior es muy difícil. Sí es viable con planificación correcta.',
      },
      {
        question: '¿Cuánto cuesta una reforma de fontanería de baño completa?',
        answer: 'Cuanto cuesta reforma baño fontaneria completa (quitar todo antiguo + instalar todo nuevo): Baño pequeño 4-5m²: 1.200-2.200€. Baño mediano 6-8m²: 1.800-3.200€. Baño grande o 2 baños: 2.800-5.000€. Incluye: demolición instalación antigua y retirada escombros, nueva red tuberías certificadas desde acometida, red evacuación con pendientes, llaves paso, instalación hidráulica sanitarios nuevos, grifería, pruebas, certificado. NO incluye: albañilería general, alicatado, pintura, electricidad, sanitarios/grifería como objetos. Estos precios son mano de obra + material fontanería. En reforma integral coordinamos con otros oficios.',
      },
      {
        question: '¿Qué se necesita para instalar fontanería en obra nueva?',
        answer: 'Fontaneria obra nueva requiere: 1) Proyecto o esquema instalación con ubicación puntos agua, desagües, diámetros. 2) Acometida general conectada y operativa con presión. 3) Estructura edificio cerrada (forjados, tabiquería, pre-instalaciones). 4) Coordinación con otros oficios (albañil para rozas, electricista para cuadro y tomas, alicatador para registro final). 5) Tuberías certificadas UNE apropiadas (cobre, PEX, multicapa para agua; PVC para desagües). 6) Cumplimiento estricto CTE DB HS (diámetros mínimos, presiones, pendientes, materiales). 7) Prueba estanqueidad antes de cerrar. 8) Certificado instalación. Coordinamos todo el proceso profesionalmente.',
      },
      {
        question: '¿Qué garantía tiene una instalación de fontanería?',
        answer: 'Nuestras instalaciones de fontanería tienen garantía 2 años mano de obra: si aparecen fugas en conexiones por defecto instalación, problemas derivados de trabajo mal ejecutado, o cualquier defecto atribuible a nuestra mano de obra, lo solucionamos sin coste durante 2 años. Los materiales usados tienen garantía fabricante separada: tuberías certificadas 10-25 años según marca y material (cobre 25, multicapa 15, PEX 10-15), grifería 5-10 años cartuchos cerámicos, sanitarios 2-10 años según marca. Para reclamar garantía material contactas con fabricante presentando factura. Conserva certificado instalación y facturas. Instalación profesional certificada vale garantías y seguro.',
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
    secondaryKw: [],
    seoBlockKw: ['sustitución tuberías', 'cambio tuberías', 'renovación tuberías', 'tuberías antiguas', 'tuberías corroídas'],
    faqKw: ['cuánto cuesta sustitución de tuberías', 'cuánto tarda sustitución de tuberías', 'hay garantía en sustitución de tuberías', 'servicio urgente de sustitución de tuberías'],
    contentBrief: 'Texto centrado en cambio de tuberías, cañerías antiguas, multicapa, cobre, presión y normativa.',
    description: 'Cambio y sustitución de tuberías antiguas por instalaciones seguras y eficientes. Presupuesto previo, materiales de calidad y garantía.',
    seoContent: {
      badge: 'Renovación de tuberías',
      title: 'Sustitución de Tuberías Antiguas por Instalaciones Modernas',
      intro: [
        'La sustitución tuberías es una intervención necesaria cuando la instalación de fontanería ha llegado al final de su vida útil. Tuberías con más de 30-40 años presentan corrosión interna, pérdida de espesor por erosión, acumulación de incrustaciones calcáreas que reducen el diámetro útil, fugas recurrentes en múltiples puntos, y riesgo creciente de rotura catastrófica que causa inundaciones.',
        'El cambio tuberías por instalaciones modernas no solo resuelve problemas actuales sino que previene futuras averías durante décadas. Tuberías nuevas de cobre,  PEX reticulado o multicapa tienen vida útil de 50+ años, proporcionan mejor presión y caudal, cumplen normativa actual, no contaminan agua potable, y reducen riesgo fugas al mínimo. La inversión en sustitución tuberías se amortiza evitando reparaciones recurrentes y daños por fugas.'
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
        'renovación fontanería',
        'tuberías multicapa',
        'tuberías corroídas',
      ],
    },
    faqs: [
      {
        question: '¿Cuánto cuesta la sustitución de tuberías de una vivienda?',
        answer: 'Cuánto cuesta sustitución de tuberías depende mucho de tamaño vivienda, material elegido, y estado actual. Precios orientativos: Renovación parcial 1 baño: 600-1.200€. Vivienda 2 baños 80-100m² completa: 1.800-3.500€. Vivienda 3 baños 120-150m² completa: 2.500-4.500€. Cambio solo acometida general: 800-2.000€. Bajante comunitaria vertical: 150-300€ metro lineal. Estos precios incluyen: materiales certificados (tuberías, conexiones, llaves paso), demolición antiguas, instalación nuevas, pruebas estanqueidad, certificado. Obras restauración (albañilería, alicatado) se presupuestan separadas según alcance. Material más económico (PEX) vs más caro (cobre) puede suponer diferencia 30-40% precio. Presupuesto personalizado tras visita.',
      },
      {
        question: '¿Cuánto tiempo tarda la sustitución de tuberías completa?',
        answer: 'Cuánto tarda sustitución de tuberías: Vivienda pequeña 1 baño 50-60m²: 2-4 días. Vivienda mediana 2 baños 80-100m²: 3-5 días trabajo efectivo. Vivienda grande 3 baños 120-150m²: 5-7 días. Baño individual renovar: 1-2 días. Estos son días trabajo real efectivo, no incluyen: tiempo secado adhesivos/morteros (si restauración albañilería), esperas coordinación otros oficios si reforma integral, o tiempo administrativo tramitación. Trabajamos para que tengas servicios mínimos agua cada final jornada cuando posible. En vivienda habitada programamos secuencia minimizar molestias. Si vivienda vacía avanzamos más rápido. Plazo depende también complejidad accesos y si aparece imprevisto (tubería extra oculta, estructura debe repararse).',
      },
      {
        question: '¿Qué garantía tiene la sustitución de tuberías?',
        answer: 'Hay garantía en sustitución de tuberías en dos niveles: Garantía instalación (mano obra): 2 años. Si aparece fuga en conexión ejecutada por nosotros, problema instalación, o defecto trabajo dentro 2 años, lo reparamos sin coste. Garantía materiales (tuberías, conexiones): depende fabricante, generalmente 10-25 años según material. Cobre: típicamente 25 años. Multicapa y PEX: 10-15 años. Estas garantías cubren defectos fabricación (tubería pincha sin causa externa, conexión falla por defecto material). NO cubren: daños por uso inadecuado, golpes externos, heladas por ausencia  calefacción invierno, o modificaciones posteriores por terceros. Trabajamos solo con marcas reconocidas europeas (Uponor, Rehau, Geberit, Wirsbo) que cumplen garantías escrupulosamente. Conserva factura y certificado instalación para reclamaciones.',
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
    secondaryKw: ['termo electrico', 'termo electrico 50 litros', 'termo electrico 100 litros', 'termo electrico 80 litros', 'termo electrico 30 litros', 'como vaciar un termo electrico', 'termo electrico 150 litros', 'termo de agua electrico'],
    seoBlockKw: ['termo eléctrico', 'termo electrico', 'termo electrico 50 litros', 'termo electrico 100 litros', 'termo electrico 80 litros', 'termo electrico 30 litros', 'como vaciar un termo electrico', 'termo electrico 150 litros', 'termo de agua electrico', 'termo electrico horizontal'],
    faqKw: ['como vaciar un termo electrico', 'como funciona un termo electrico', 'como vaciar termo electrico', 'cuanto dura un termo electrico', 'precio termo electrico', 'precio termo electrico 100 litros', 'cuanto consume un termo electrico', 'como cambiar un termo electrico'],
    contentBrief: 'Texto centrado en termo eléctrico, calentador de agua, instalación, reparación y mantenimiento.',
    description: 'Instalación y reparación de termos eléctricos y calentadores de agua. Servicio rápido, seguro y con garantía por escrito.',
    seoContent: {
      badge: 'Especialistas en termos',
      title: 'Termos Eléctricos: Instalación, Reparación y Mantenimiento Profesional',
      intro: [
        'Los termos eléctricos o termo electrico son el sistema más común para producir agua caliente sanitaria (ACS) en viviendas urbanas españolas. Un termo eléctrico almacena agua caliente en su depósito aislado térmicamente, manteniéndola a temperatura constante lista para uso. Cuando abres grifo agua caliente, el agua sale directamente del termo sin esperas, y el termostato activa la resistencia para recalentar el agua fría que entra reponiendo lo consumido.',
        'Ofrecemos servicio completo de instalación, reparación y mantenimiento de termos eléctricos de todas las capacidades: termo electrico 30 litros para cocina/lavabo individual, termo electrico 50 litros para 1-2 personas, termo electrico 80 litros para 2-3 personas, termo electrico 100 litros para 3-4 personas, y termo electrico 150 litros para 5+ personas o bañera. Trabajamos con todas las marcas líderes: Fleck, Junkers, Ariston, Cointra, Thermor, Bosch, Teka, Ferroli.'
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
        'mantenimiento termo',
      ],
    },
    faqs: [
      {
        question: '¿Cómo vaciar un termo eléctrico correctamente?',
        answer: 'Como vaciar un termo electrico paso a paso: 1) Desconectar electricidad OBLIGATORIO (cuadro general o desenchufar termo), 2) Cerrar llave paso agua fría entrada termo (usualmente sobre o lateral  termo), 3) Abrir un grifo agua caliente de casa para liberar presión interna sistema (dejar abierto), 4) Conectar manguera jardín a válvula de desagüe inferior termo, llevar otro extremo manguera a desagüe o exterior, 5) Abrir válvula desagüe (giro contrario reloj), agua empezará salir gravedad lentamente, 6) Esperar vaciado completo: termo 50L→15-25min, 100L→30-45min, 150L→45-70min. Si quieres acelerar abre también entrada agua fría con válvula desagüe abierta (empuja agua). Cerrar válvulas, reconectar, llenar abriendo agua fría con grifos calientes abiertos hasta que salga agua sin aire.',
      },
      {
        question: '¿Cómo funciona un termo eléctrico?',
        answer: 'Como funciona un termo electrico básicamente: termo almacena agua caliente en depósito aislado térmicamente con espuma poliuretano. Agua fría ciudad entra por inferior termo, empuja agua caliente existente hacia arriba que sale por tubo superior hacia grifos casa. Resistencia eléctrica sumergida (1000-2500W) calienta agua. Termostato monitoriza temperatura agua continuamente: cuando baja de temperatura programada (típicamente 60-70°C) por consumo o pérdidas térmicas naturales, circuito eléctrico activa resistencia que calienta hasta alcanzar temperatura deseada y se desconecta automáticamente. Ánodo magnesio barra sacrificial protege depósito interior de corrosión galvánica (se oxida él en lugar del depósito). Válvula seguridad libera presión excesiva si sobrecalentamiento impide explosión. Aislamiento mantiene agua caliente horas sin recalentar consumiendo energía solo mantenimiento temperatura pérdidas naturales.',
      },
      {
        question: '¿Cuánto dura un termo eléctrico?',
        answer: 'Cuanto dura un termo electrico depende mantenimiento y calidad agua. Termo bien mantenido limpieza anual ánodo cambiado periódicamente: 12-16 años vida útil. Termo sin mantenimiento: 8-11 años. Termo gama premium con depósito inoxidable: hasta 20 años. Factores reducen durabilidad: agua muy dura alta cal (acelera corrosión, incrusta resistencia), temperatura excesiva >75°C constantemente (acelera degradación depósito), ánodo magnesio agotado no reemplazado (corrosión acelerada), falta limpieza periódica (sedimentos cal acumulados), instalación defectuosa sin válvula seguridad (sobrepresiones dañan depósito). Señales vida útil terminando: fugas agua persistentes junta depósito, ruidos extraños calentamiento, agua sale color oxidado, tarda mucho más calentar, o eficiencia disminuye drásticamente. Con mantenimiento preventivo anual puedes alargar vida útil 3-5 años adicionales ahorrando coste reemplazo prematuro.',
      },
      {
        question: '¿Cuál es el precio de un termo eléctrico?',
        answer: 'Precio termo electrico solo equipo 2024: Termo electrico 50 litros básico: 150-280€, gama media 220-350€, premium 300-450€. Termo electrico 80 litros: 200-250€ básico, 280-380€ medio, 350-500€ premium. Termo electrico 100 litros: 250-350€ básico, 350-500€ medio, 450-700€ premium. Termo electrico 150 litros: 350-450€ básico, 450-650€ medio, 550-850€ premium. Diferencia precio: marca (Fleck/Cointra económico, Junkers/Ariston premium), depósito (vitrificado vs inoxidable), aislamiento (espesor/calidad afecta eficiencia), eficiencia energética (B vs A), funciones (programador, display digital, Smart). Termo plano compacto ultra delgado: +150-250€. Termo electrico instalado completo añadir instalación: básica 150-250€, completa certificada 250-400€. Total termo electrico 100 litros instalado: desde 550€ básico hasta 1.100€ premium todo incluido.',
      },
      {
        question: '¿Cuánto cuesta un termo eléctrico de 100 litros?',
        answer: 'Precio termo electrico 100 litros solo equipo sin instalación: Gama económica (marcas menos conocidas, básico): 250-350€. Gama media (Fleck, Cointra, Ariston básicos): 350-500€. Gama alta (Junkers, Bosch,  Thermor eficientes): 500-750€. Termo horizontal 100L (instalación techo bajo): +60-100€. Termo 100L ultra eficiente clase A: 450-700€. Si añades instalación profesional completa (incluye mano trabajo + grupo seguridad + llaves + latiguillos + conexiones eléctricas certificadas + retirada antiguo + certificado): +250-400€. Total termo electrico 100 litros instalado completamente llave en mano: desde 550€ básico hasta 1.100€ premium. Precios con IVA incluido. Diferencias: marca prestigio con mejores garantías, depósito inoxidable vs vitrificado, aislamiento grosor superior, resistencia envainada (cambiable sin vaciar) vs sumergida, electrónica programable vs termostato mecánico básico. Asesoramos qué opción según presupuesto y necesidades prioridades.',
      },
      {
        question: '¿Cuánto consume un termo eléctrico al mes?',
        answer: 'Cuanto consume un termo electrico mensualmente ejemplo real termo 100L familia 4 personas: Calentamiento completo desde frío: 1.8 kWh (0.45€). Mantenimiento temperatura diario standby: 1.1 kWh (0.28€). Consumo eléctrico mensual: 250-350 kWh → 15-25€/mes tarifa normal, 10-18€/mes tarifa discriminación valle. Variables afectan consumo: capacidad termo (50L consume menos que 150L), temperatura configurada (cada 5°C menos ahorra 8%), aislamiento calidad termo (modernos consumen 20-30% menos antiguos), uso real agua caliente familia (duchas largas vs cortas), temperatura agua entrada (invierno más fría cuesta más calentar), ubicación termo (interior climatizado pierde menos que garaje frío). Reducir consumo: programarlo con reloj temporizador calienta valle nocturno barato, bajar temperatura 55-60°C, aislar externamente termo ytuberías cercanas, duchas eficientes 5-7min. Termo moderno eficiente A consume 20-25% menos que antiguo sin etiqueta. Inversión termo eficiente amortiza 2-3 años ahorro factura eléctrica.',
      },
      {
        question: '¿Cómo cambiar un termo eléctrico?',
        answer: 'Como cambiar un termo electrico debe hacerlo profesional autorizado porque combina fontanería y electricidad: 1) Cortar electricidad y agua, 2) Como vaciar termo electrico vaciado completo, 3) Desconectar eléctricas documentando cables (fase-neutro-tierra), 4) Cerrar llaves paso entrada/salida, 5) Desconectar latiguillos fontanería, 6) Desmontar soportes sujeción pared con cuidado (peso), 7) Retirar termo viejo (termo 100L lleno pesa 120kg, vacío 20kg), 8) Instalar soportes nuevos termo dimensiones diferentes con tacos químicos forjado/pared maestra (nunca solo yeso), 9) Colgar termo nuevo perfectamente nivelado horizontal, 10) Instalar grupo seguridad nuevo obligatorio, 11) Conectar fontanería con latiguillles flexibles acero inoxidable nuevos y llaves paso si no las había, 12) Conectar electricidad con cable sección adecuada (2.5-4mm²), toma tierra obligatoria, protección diferencial 30mA y  magnetotérmica apropiada, 13) Llenar gradualmente abriendo agua fría con grifos calientes abiertos para purgar aire, 14) Enchufar-activar termo, configurar temperatura 60°C, esperar calentamiento inicial 1-3h, 15) Verificar sin fugas y temperatura correcta, 16) Certificado instalación eléctrica. Hazlo profesional: invalidación garantías, riesgo fugas/electrocución.',
      },
      {
        question: '¿Qué capacidad de termo necesito según usuarios?',
        answer: 'Tabla orientativa capacidad termo eléctrico según usuarios y uso: 1 persona uso moderado (solo ducha): termo electrico 30 litros suficiente. 1-2 personas (duchas, no bañera): termo electrico 50 litros. 2 personas (ducha + bañera ocasional): termo electrico 80 litros. 3 personas (duchas): termo electrico 80 litros. 3-4 personas (duchas frecuentes): termo electrico 100 litros. 4 personas (bañera habitual): termo electrico 100-150 litros. 5+ personas: termo electrico 150 litros o dos termos separados. PERO importante considerar: ¿Duchas consecutivas rápidas mañana o escalonadas día? (consecutivas necesita más capacidad). ¿Adolescentes duchas 15min? (más capacidad). ¿Bañera llena usa 120L? (necesitas grande). ¿Solo duchas rápidas 5min 15L? (menos capacidad). Termo recupera temperatura en 1-3 horas así que si usos distanciados temporalmente durante día puedes con capacidad menor. Asesoramos personalizadamente analizando hábitos consumo reales familia. Sobre-dimensionar termo gasta innecesariamente electricidad mantiene agua nunca usas caliente.',
      },
      {
        question: '¿El termo eléctrico gasta mucho?',
        answer: 'Termo eléctrico gasto eléctrico moderado comparado otros electrodomésticos grandes. Termo 100L familia 4 personas:  15-25€/mes. Comparación: aire acondicionado verano 40-80€/mes, calefacción eléctrica invierno 60-150€/mes, nevera+congelador 8-15€/mes. Termo NO es mayor gasto eléctrico vivienda típica. Para minimizar: usar termo con discriminación horaria programa calienta horario valle nocturno (electricidad 50% más barata), termo moderno eficiente A (ahorro 20-30%vs antiguo), temperatura justa 55-60°C no excesiva 75°C gasta innecesario, duchas eficientes ahorro agua implica ahorro energía, aislar termo externamente manta térmica adicional, vacaciones largas +1 semana apagar completamente termo. Termo eléctrico alternativa gas: gas natural más barato operación pero requiere inversión instalación gas cara amortiza solo si también calefacción gas. Vivienda solo ACS sin calefacción gas, termo eléctrico probablemente más económico globalmente. Aerotermia más eficiente pero inversión inicial 3-5x termo eléctrico amortiza muchos años. Para mayoría pisos urbanos termo eléctrico sigue siendo opción práctica económica.',
      },
      {
        question: '¿Termo eléctrico o calentador de gas: cuál elegir?',
        answer: 'Termo eléctrico vs calentador gas depende situación: TERMO ELÉCTRICO ideal si: NO tienes gas natural cerquita (instalación gas cuesta 800-2.000€), piso pequeño demanda ACS moderada, presupuesto instalación ajustado (termo 400-700€ instalado vs calentador gas 800-1.500€), no quieres mantenimiento obligatorio anual (gas requiere revisión 70-120€/año VS termo solo opcional), valoras agua caliente instantánea sin esperar (termo tiene reserva caliente lista). CALENTADOR GAS instantáneo ideal si: YA tienes gas natural instalación, familia numerosa alto consumo ACS ilimitado (calentador produce sin límite, termo se agota), no problema espacio (calentador compacto VS termo ocupa), aceptas mantenimiento obligatorio anual coste, priorizas coste operación (gas es más barato por kWh útil que electricidad). CONCLUSIÓN mayoría pisos urbanos sin instalación gas previa: termo eléctrico es opción más práctica económica global. Si tienes gas natural Y alto consumo ACS Y presupuesto instalación: calentador gas puede ser mejor largo plazo. Pisos pequeños 1-2 personas: termo 50-80L perfecto.',
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
       'Ofrecemos planes mantenimiento fontaneria adaptados a cada necesidad: revisión anual para viviendas particulares, revisión semestral para instalaciones con uso intenso, y revisión trimestral para comunidades de vecinos. El coste anual mantenimiento es fracción del coste reparar emergencia: una fuga importante cuesta 200-500€ reparar + daños, mantenimiento anual 120-180€ previene esos problemas.'
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
        question: '¿Cuánto cuesta el mantenimiento de fontanería anual?',
        answer: 'Cuánto cuesta mantenimiento de fontanería depende tipo instalación y frecuencia: Plan Básico Vivienda 1 revisión anual: 120-180€/año. Plan Premium Vivienda 2 revisiones semestrales: 220-300€/año. Comunidad vecinos pequeña hasta 10 viviendas revisión trimestral: 350-600€/año. Comunidad mediana 10-30 viviendas: 600-1.200€/año. Comunidad grande 30-50 viviendas: 1.000-2.000€/año. Incluye: inspección exhaustiva completa, pequeñas intervenciones preventivas menores, informe escrito detallado estado, asesoramiento recomendaciones, y descuentos 10-15% reparaciones mayores necesarias resto año. Revisión única puntual diagnóstico inicial (no contrato): 140-220€ incluye todo lo anterior pero una sola vez sin compromiso continuidad. Precio varía según: tamaño vivienda/instalación, complejidad/antigüedad instalación, frecuencia revisiones contratadas.',
      },
      {
        question: '¿Cuánto tarda una revisión de mantenimiento de fontanería?',
        answer: 'Cuánto tarda mantenimiento de fontanería revisión completa: Vivienda pequeña/media 50-80m² 1-2 baños: 1-2 horas. Vivienda media/grande 100-120m² 2-3 baños: 2-3 horas. Vivienda grande/unifamiliar 150+m² múltiples baños: 3-4 horas. Revisión trimestral comunidad pequeña 5-10 viviendas zonas comunes: 2-3 horas. Comunidad mediana 20-30 viviendas: 3-5 horas. Durante revisión técnico inspecciona minuciosamente: grifería completa,  llaves paso, tuberías visibles conexiones, arquetas/sifones accesibles, termo/calentador, presión sistema con manómetro, test contador fugas, caudal desagües, y realiza sobre marcha pequeñas intervenciones preventivas incluidas: limpieza aireadores, lubricación válvulas, apriete conexiones, ajuste cisternas, cambio juntas pequeñas deterioradas. Finaliza redactando informe, explicando hallazgos verbalmente, asesorando recomendaciones, respondiendo consultas. Trabajo minucioso profesional requiere tiempo hacer correctamente no prisas. Programación flexible adaptada disponibilidad cliente.',
      },
      {
        question: '¿El mantenimiento preventivo tiene garantía?',
        answer: 'Hay garantía en mantenimiento de fontanería en siguiente sentido: mantenimiento preventivo es principalmente inspección y pequeñas intervenciones ajuste/limpieza. Si durante revisión detectamos problema y realizamos pequeña reparación incluida (cambio junta, lubricación válvula, ajus te conexión, limpieza sifón), esas mini-intervenciones tienen garantía obviamente: si mismo elemento falla semanas siguientes por defecto nuestro trabajo, regresamos solucionamos sin coste. Pero el verdadero valor mantenimiento NO es garantía reparaciones sino PREVENCIÓN: detectar problemas fase embrionaria (grifo empezando gotear, tubería con corrosión incipiente, termo resistencia sulfatandose) antes convertirse averías caras. Te asesoramos transparentemente sobre problemas detectados priorizados por urgencia y damos presupuesto cerrado si decides contratarlas. Esas reparaciones mayores contratadas separadas tienen su garantía propia (2 años mano obra). Esencia mantenimiento preventivo es evitar sorpresas costosas detección temprana.',
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
}
