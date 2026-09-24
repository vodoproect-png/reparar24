import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type BlogTechnicalCardVisualProps = {
  slug: string
  icon: LucideIcon
}

const sceneBySlug: Record<string, ReactNode> = {
  'que-hacer-fuga-agua-casa': (
    <>
      <path d="M26 86h44" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
      <path d="M49 86c0 12-16 12-16 0 0-7 8-12 8-19 0 7 8 12 8 19z" fill="#60A5FA" />
      <path d="M24 128h48" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
      <circle cx="26" cy="128" r="5" fill="#2563EB" />
    </>
  ),
  'cuanto-cuesta-fontanero-valencia': (
    <>
      <rect x="22" y="66" width="52" height="42" rx="10" fill="#DBEAFE" />
      <circle cx="48" cy="87" r="14" fill="#2563EB" />
      <path d="M42 85h12M42 91h12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 128h46" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'por-que-gotea-cisterna': (
    <>
      <rect x="26" y="58" width="44" height="34" rx="8" fill="#DBEAFE" />
      <rect x="34" y="92" width="28" height="18" rx="5" fill="#BFDBFE" />
      <path d="M63 126c0 10-14 10-14 0 0-6 7-10 7-16 0 6 7 10 7 16z" fill="#2563EB" />
    </>
  ),
  'que-hacer-salta-diferencial': (
    <>
      <rect x="21" y="57" width="54" height="64" rx="10" fill="#DBEAFE" />
      <path d="M34 68v40M48 68v40M62 68v40" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 91h28" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'por-que-salta-diferencial': (
    <>
      <rect x="21" y="57" width="54" height="64" rx="10" fill="#DBEAFE" />
      <path d="M34 68v40M48 68v40M62 68v40" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 91h28" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'que-hacer-cortocircuito-casa': (
    <>
      <path d="M48 50 31 86h18l-8 40 27-50H51l-3-26z" fill="#2563EB" />
      <path d="M26 134h46" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
      <circle cx="67" cy="62" r="8" fill="#FDBA74" />
    </>
  ),
  'cuanto-cuesta-electricista-valencia': (
    <>
      <rect x="22" y="67" width="52" height="42" rx="11" fill="#DBEAFE" />
      <path d="M34 88h28" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 78 34 88l8 10M54 78l8 10-8 10" stroke="#F97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'como-saber-tuberia-atascada': (
    <>
      <path d="M24 92h36c12 0 12-20 0-20H48" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M58 92h18" stroke="#60A5FA" strokeWidth="9" strokeLinecap="round" />
      <circle cx="44" cy="72" r="8" fill="#F97316" />
      <path d="M25 125h46" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'que-hacer-wc-atascado': (
    <>
      <rect x="27" y="61" width="31" height="38" rx="8" fill="#DBEAFE" />
      <path d="M57 82h20c0 18-14 29-31 29H35" fill="#BFDBFE" />
      <path d="M70 65c7 9 7 19 0 28" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'cuando-llamar-camion-cuba': (
    <>
      <rect x="20" y="78" width="44" height="28" rx="7" fill="#2563EB" />
      <rect x="61" y="84" width="20" height="22" rx="5" fill="#93C5FD" />
      <circle cx="33" cy="110" r="6" fill="#0F2D75" />
      <circle cx="70" cy="110" r="6" fill="#0F2D75" />
      <path d="M25 65h43" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'aire-acondicionado-no-enfria-causas': (
    <>
      <rect x="21" y="64" width="54" height="36" rx="9" fill="#DBEAFE" />
      <path d="M32 76h31M32 88h22" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M35 118v-10M48 122v-14M61 118v-10" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'cuando-hacer-mantenimiento-aire-acondicionado': (
    <>
      <rect x="22" y="59" width="52" height="36" rx="9" fill="#DBEAFE" />
      <circle cx="48" cy="77" r="14" fill="#2563EB" />
      <path d="M48 67v10l7 4" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M29 119h39" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'cuanto-cuesta-instalar-split': (
    <>
      <rect x="20" y="65" width="46" height="32" rx="8" fill="#DBEAFE" />
      <rect x="59" y="91" width="22" height="24" rx="6" fill="#BFDBFE" />
      <path d="M33 122h31M61 75h13" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <circle cx="43" cy="81" r="7" fill="#60A5FA" />
    </>
  ),
  'caldera-no-arranca-que-revisar': (
    <>
      <rect x="28" y="55" width="40" height="62" rx="10" fill="#DBEAFE" />
      <circle cx="48" cy="86" r="14" fill="#2563EB" />
      <path d="M43 86h10M48 81v10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M69 68c8 10 8 25 0 36" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'radiador-no-calienta-causas': (
    <>
      <rect x="20" y="72" width="56" height="38" rx="8" fill="#DBEAFE" />
      <path d="M32 73v36M43 73v36M54 73v36M65 73v36" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M27 123h43" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'presion-baja-caldera': (
    <>
      <circle cx="48" cy="82" r="26" fill="#DBEAFE" />
      <path d="M32 87a17 17 0 0 1 32 0" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M48 84 38 75" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
      <path d="M28 124h40" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'cuando-limpiar-bajantes-comunidad': (
    <>
      <rect x="27" y="54" width="42" height="68" rx="9" fill="#DBEAFE" />
      <path d="M38 64v46M48 64v46M58 64v46" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 86c0 10-13 10-13 0 0-6 6-10 6-15 0 5 7 9 7 15z" fill="#60A5FA" />
    </>
  ),
  'inspeccion-camara-tuberias-cuando-conviene': (
    <>
      <rect x="28" y="70" width="40" height="32" rx="9" fill="#DBEAFE" />
      <circle cx="48" cy="86" r="11" fill="#2563EB" />
      <circle cx="48" cy="86" r="4" fill="#fff" />
      <path d="M68 86h16M20 122h56" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  'limpieza-arquetas-olores-comunidad': (
    <>
      <rect x="24" y="77" width="50" height="32" rx="8" fill="#DBEAFE" />
      <path d="M31 77h36M34 90h29M38 103h21" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M39 61c-8-8 8-8 0-16M58 64c-8-8 8-8 0-16" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  'calentador-gas-no-enciende': (
    <>
      <rect x="26" y="56" width="44" height="66" rx="11" fill="#DBEAFE" />
      <circle cx="48" cy="78" r="12" fill="#2563EB" />
      <path d="M43 82c0-9 10-10 10-19 8 12 6 23-5 27-4-2-5-5-5-8z" fill="#FDBA74" />
      <path d="M35 108h26" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'instalar-ventilador-techo-con-luz': (
    <>
      <circle cx="48" cy="77" r="11" fill="#2563EB" />
      <path d="M48 66V47M48 88v24M37 77H20M59 77h17" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
      <path d="M38 104h20l-10 18-10-18z" fill="#FDBA74" />
      <path d="M30 132h36" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-desatascar-fregadero': (
    <>
      <rect x="22" y="65" width="52" height="28" rx="8" fill="#DBEAFE" />
      <path d="M31 93v19c0 9 34 9 34 0V93" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M31 78h34M40 111h16" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <circle cx="66" cy="58" r="7" fill="#FDBA74" />
    </>
  ),
  'aire-acondicionado-no-enciende': (
    <>
      <rect x="21" y="62" width="54" height="35" rx="9" fill="#DBEAFE" />
      <path d="M32 77h24M32 88h16" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <circle cx="64" cy="80" r="7" fill="#F97316" />
      <path d="M40 118h16M48 106v24" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-purgar-radiadores': (
    <>
      <rect x="21" y="69" width="54" height="42" rx="9" fill="#DBEAFE" />
      <path d="M32 70v40M43 70v40M54 70v40M65 70v40" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M25 126h45" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 62c0 8-11 8-11 0 0-5 5-8 5-12 0 4 6 7 6 12z" fill="#60A5FA" />
    </>
  ),
  'como-limpiar-tuberias-casa': (
    <>
      <path d="M22 86h38c10 0 10-18 0-18H46" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M58 86h19" stroke="#93C5FD" strokeWidth="9" strokeLinecap="round" />
      <circle cx="37" cy="118" r="12" fill="#DBEAFE" />
      <path d="M31 118h12M37 112v12" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'como-cambiar-el-grifo-de-la-cocina': (
    <>
      <path d="M28 70h22c12 0 18 7 18 18v8" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M33 58h28M26 102h45" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 118c0 9-12 9-12 0 0-5 6-9 6-14 0 5 6 9 6 14z" fill="#FDBA74" />
    </>
  ),
  'como-cambiar-enchufe': (
    <>
      <rect x="25" y="61" width="46" height="48" rx="11" fill="#DBEAFE" />
      <circle cx="41" cy="85" r="5" fill="#2563EB" />
      <circle cx="56" cy="85" r="5" fill="#2563EB" />
      <path d="M48 100v16M37 124h22" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-desatascar-lavabo': (
    <>
      <rect x="22" y="67" width="52" height="24" rx="12" fill="#DBEAFE" />
      <path d="M31 91v16c0 12 34 12 34 0V91" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M39 118h18M48 118v12" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
      <circle cx="67" cy="63" r="7" fill="#FDBA74" />
    </>
  ),
  'aire-acondicionado-con-bomba-de-calor': (
    <>
      <rect x="21" y="61" width="54" height="36" rx="9" fill="#DBEAFE" />
      <path d="M32 75h31M32 88h18" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 118c8-14 24-14 32 0" stroke="#F97316" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M37 125h22" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'aerotermia-precio': (
    <>
      <rect x="23" y="62" width="50" height="35" rx="9" fill="#DBEAFE" />
      <circle cx="48" cy="80" r="12" fill="#2563EB" />
      <path d="M43 78h10M43 84h10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M29 118h38M34 128h28" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'bicarbonato-y-vinagre-para-desatascar': (
    <>
      <path d="M25 88h37c11 0 11-18 0-18H50" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="113" r="10" fill="#DBEAFE" />
      <circle cx="58" cy="119" r="7" fill="#93C5FD" />
      <path d="M63 70c0 8-11 8-11 0 0-5 5-8 5-12 0 4 6 7 6 12z" fill="#FDBA74" />
    </>
  ),
  'por-que-gotea-un-grifo-cerrado': (
    <>
      <path d="M28 68h25c13 0 19 7 19 19v7" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M32 58h27M27 101h43" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 121c0 9-12 9-12 0 0-5 6-9 6-15 0 6 6 10 6 15z" fill="#2563EB" />
      <circle cx="38" cy="126" r="6" fill="#DBEAFE" />
    </>
  ),
  'por-que-salta-el-diferencial-al-encender-un-aparato': (
    <>
      <rect x="21" y="57" width="38" height="58" rx="10" fill="#DBEAFE" />
      <path d="M33 68v36M46 68v36" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <rect x="58" y="78" width="20" height="28" rx="6" fill="#BFDBFE" />
      <path d="M62 91h12M68 78V64" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 128h42" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'por-que-se-atasca-el-fregadero-cada-poco': (
    <>
      <rect x="22" y="65" width="52" height="27" rx="9" fill="#DBEAFE" />
      <path d="M30 92v18c0 10 36 10 36 0V92" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M37 113c8-7 15 7 23 0" stroke="#F97316" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M33 78h30M40 128h16" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'por-que-el-aire-acondicionado-gotea-dentro-de-casa': (
    <>
      <rect x="20" y="62" width="56" height="36" rx="9" fill="#DBEAFE" />
      <path d="M32 76h31M32 88h20" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 119c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#60A5FA" />
      <path d="M64 126c0 7-10 7-10 0 0-4 5-7 5-11 0 4 5 7 5 11z" fill="#2563EB" />
      <path d="M29 134h40" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'por-que-baja-la-presion-de-la-caldera-cada-poco': (
    <>
      <rect x="27" y="55" width="42" height="64" rx="11" fill="#DBEAFE" />
      <circle cx="48" cy="81" r="18" fill="#2563EB" />
      <path d="M36 85a13 13 0 0 1 24 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M48 84 40 77" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 128h28" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'atascos-repetidos-en-tuberias-despues-de-desatascar': (
    <>
      <path d="M21 91h37c10 0 10-18 0-18H44" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="54" y="80" width="25" height="21" rx="6" fill="#DBEAFE" />
      <circle cx="66" cy="91" r="7" fill="#2563EB" />
      <circle cx="66" cy="91" r="3" fill="#fff" />
      <path d="M28 126h45" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'calentador-junkers-no-enciende': (
    <>
      <rect x="27" y="54" width="42" height="68" rx="11" fill="#DBEAFE" />
      <circle cx="48" cy="77" r="12" fill="#2563EB" />
      <path d="M43 82c1-8 10-10 10-20 8 12 5 24-5 28-4-2-6-5-5-8z" fill="#FDBA74" />
      <path d="M35 108h26" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 66l8-8M77 70h-9M72 76l6 6" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'como-desatascar-un-water': (
    <>
      <rect x="26" y="62" width="31" height="37" rx="8" fill="#DBEAFE" />
      <path d="M57 83h20c0 18-14 29-31 29H35" fill="#BFDBFE" />
      <path d="M69 65c7 9 7 19 0 28" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 125h38" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
      <circle cx="34" cy="81" r="7" fill="#F97316" />
    </>
  ),
  'como-poner-lampara-de-techo': (
    <>
      <path d="M48 48v34" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
      <path d="M31 82h34l9 31H22l9-31z" fill="#DBEAFE" />
      <path d="M36 97h24" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M39 122h18M48 113v19" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
      <path d="M27 138h42" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-limpiar-el-filtro-del-aire-acondicionado': (
    <>
      <rect x="20" y="61" width="56" height="36" rx="9" fill="#DBEAFE" />
      <path d="M31 74h34M31 86h26" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <rect x="31" y="107" width="34" height="22" rx="5" fill="#BFDBFE" />
      <path d="M37 113h22M37 122h22" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 115c0 7-9 7-9 0 0-4 4-7 4-11 0 4 5 7 5 11z" fill="#60A5FA" />
    </>
  ),
  'aerotermia-con-radiadores': (
    <>
      <rect x="20" y="72" width="55" height="38" rx="8" fill="#DBEAFE" />
      <path d="M31 73v36M42 73v36M53 73v36M64 73v36" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <circle cx="48" cy="50" r="12" fill="#BFDBFE" />
      <path d="M48 42v16M40 50h16" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 126h40" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-limpiar-las-tuberias-de-agua': (
    <>
      <path d="M22 82h35c12 0 12-18 0-18H45" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M57 82h20" stroke="#93C5FD" strokeWidth="9" strokeLinecap="round" />
      <circle cx="38" cy="114" r="12" fill="#DBEAFE" />
      <path d="M32 114h12M38 108v12" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M69 111c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#60A5FA" />
    </>
  ),
  'como-arreglar-cisterna-que-pierde-agua': (
    <>
      <rect x="25" y="58" width="46" height="34" rx="8" fill="#DBEAFE" />
      <rect x="33" y="92" width="30" height="20" rx="5" fill="#BFDBFE" />
      <path d="M47 67h14M47 77h10" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M66 127c0 9-12 9-12 0 0-5 6-9 6-14 0 5 6 9 6 14z" fill="#2563EB" />
      <path d="M28 135h42" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'revisar-caldera-gas': (
    <>
      <rect x="27" y="54" width="42" height="65" rx="11" fill="#DBEAFE" />
      <circle cx="48" cy="78" r="13" fill="#2563EB" />
      <path d="M43 78h10M48 73v10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M35 105h26" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 66c8 11 8 27 0 38" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'frigorias-por-m2': (
    <>
      <rect x="20" y="61" width="56" height="36" rx="9" fill="#DBEAFE" />
      <path d="M31 75h34M31 87h24" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 119h28M48 105v28" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <circle cx="68" cy="112" r="9" fill="#FDBA74" />
      <path d="M64 112h8M68 108v8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'olor-a-alcantarilla-en-casa': (
    <>
      <path d="M23 88h38c10 0 10-18 0-18H47" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="31" y="105" width="34" height="20" rx="6" fill="#DBEAFE" />
      <path d="M36 112h24M39 121h18" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M37 58c-8-8 8-8 0-16M59 60c-8-8 8-8 0-16" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  'cuanto-cuesta-instalar-un-cargador-de-coche-electrico': (
    <>
      <rect x="23" y="70" width="42" height="32" rx="9" fill="#DBEAFE" />
      <path d="M34 80h18M34 91h12" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M65 83h9c6 0 6 18 0 18h-4" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M43 118h19M52 107v22" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
      <circle cx="31" cy="112" r="6" fill="#2563EB" />
      <circle cx="66" cy="112" r="6" fill="#2563EB" />
    </>
  ),
  'olor-bajante-comunidad': (
    <>
      <rect x="27" y="54" width="42" height="69" rx="9" fill="#DBEAFE" />
      <path d="M38 64v48M48 64v48M58 64v48" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 83c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#60A5FA" />
      <path d="M35 134h27" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-arreglar-grifo-que-gotea': (
    <>
      <path d="M27 67h27c12 0 18 7 18 18v8" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M33 56h29M28 101h42" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 121c0 9-12 9-12 0 0-5 6-9 6-15 0 6 6 10 6 15z" fill="#2563EB" />
      <path d="M34 132h30" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
      <circle cx="42" cy="118" r="6" fill="#FDBA74" />
    </>
  ),
  'como-cambiar-un-tubo-fluorescente-por-uno-led': (
    <>
      <rect x="20" y="63" width="56" height="18" rx="9" fill="#DBEAFE" />
      <rect x="20" y="95" width="56" height="18" rx="9" fill="#BFDBFE" />
      <path d="M30 72h36M30 104h36" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="72" r="5" fill="#FDBA74" />
      <circle cx="68" cy="104" r="5" fill="#60A5FA" />
      <path d="M34 130h28" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'vaciado-fosa-septica-precio': (
    <>
      <rect x="24" y="83" width="49" height="34" rx="8" fill="#DBEAFE" />
      <path d="M30 83h37M34 97h29M38 110h21" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <path d="M23 70h50" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 58c-8-8 8-8 0-17M42 61c-8-8 8-8 0-17" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="70" cy="127" r="7" fill="#FDBA74" />
    </>
  ),
  'a-que-temperatura-poner-el-aire-acondicionado-en-calor': (
    <>
      <rect x="20" y="62" width="56" height="36" rx="9" fill="#DBEAFE" />
      <path d="M31 75h34M31 88h21" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M33 122c9-15 25-15 34 0" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="122" r="9" fill="#60A5FA" />
      <path d="M48 112v20M38 122h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  'aerotermia-en-un-piso': (
    <>
      <rect x="22" y="62" width="52" height="38" rx="9" fill="#DBEAFE" />
      <circle cx="48" cy="81" r="13" fill="#2563EB" />
      <path d="M42 81h12M48 75v12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 118h40M34 129h28" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 62c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#60A5FA" />
    </>
  ),
  'precio-limpieza-cal-tuberias': (
    <>
      <path d="M22 83h37c11 0 11-18 0-18H46" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M58 83h19" stroke="#93C5FD" strokeWidth="9" strokeLinecap="round" />
      <circle cx="38" cy="113" r="11" fill="#DBEAFE" />
      <circle cx="59" cy="119" r="8" fill="#BFDBFE" />
      <path d="M34 113h8M38 109v8" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M29 135h39" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-vaciar-termo-electrico': (
    <>
      <rect x="28" y="52" width="40" height="70" rx="12" fill="#DBEAFE" />
      <path d="M37 64h22M37 78h22" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 96v22" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 127c0 9-12 9-12 0 0-5 6-9 6-14 0 5 6 9 6 14z" fill="#2563EB" />
      <path d="M30 138h38" stroke="#BFDBFE" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-instalar-tiras-led': (
    <>
      <path d="M27 63h43M27 82h43M27 101h43" stroke="#DBEAFE" strokeWidth="8" strokeLinecap="round" />
      <circle cx="31" cy="63" r="5" fill="#2563EB" />
      <circle cx="47" cy="82" r="5" fill="#60A5FA" />
      <circle cx="64" cy="101" r="5" fill="#FDBA74" />
      <path d="M29 123h38M35 133h26" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  'como-desatascar-ducha': (
    <>
      <rect x="28" y="56" width="40" height="22" rx="7" fill="#DBEAFE" />
      <path d="M34 78v17M48 78v17M62 78v17" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 120h38c8 0 8-15 0-15H51" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="39" cy="105" r="6" fill="#F97316" />
    </>
  ),
  'cuanto-cuesta-instalar-aire-acondicionado': (
    <>
      <rect x="20" y="62" width="54" height="35" rx="9" fill="#DBEAFE" />
      <path d="M31 75h30M31 87h20" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <rect x="56" y="101" width="23" height="25" rx="6" fill="#BFDBFE" />
      <path d="M35 122h17M44 109v25" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="113" r="7" fill="#FDBA74" />
    </>
  ),
  'caldera-de-agua': (
    <>
      <rect x="28" y="54" width="40" height="68" rx="11" fill="#DBEAFE" />
      <circle cx="48" cy="78" r="13" fill="#2563EB" />
      <path d="M42 80c1-8 9-9 9-18 8 11 5 23-4 27-4-2-6-5-5-9z" fill="#FDBA74" />
      <path d="M35 105h26" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 112c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#60A5FA" />
    </>
  ),
  'desatascar-tuberias-bicarbonato': (
    <>
      <path d="M22 85h35c12 0 12-18 0-18H45" stroke="#2563EB" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M57 85h20" stroke="#93C5FD" strokeWidth="9" strokeLinecap="round" />
      <circle cx="38" cy="116" r="11" fill="#DBEAFE" />
      <circle cx="60" cy="122" r="7" fill="#BFDBFE" />
      <path d="M34 116h8M38 112v8" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 62c0 8-11 8-11 0 0-5 5-8 5-13 0 5 6 8 6 13z" fill="#FDBA74" />
    </>
  ),
  'limpieza-suelo-radiante': (
    <>
      <rect x="20" y="80" width="56" height="31" rx="8" fill="#DBEAFE" />
      <path d="M27 91c8-9 15 9 23 0s15 9 23 0" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M28 122h40M32 132h32" stroke="#FDBA74" strokeWidth="5" strokeLinecap="round" />
      <circle cx="48" cy="57" r="12" fill="#BFDBFE" />
      <path d="M48 49v16M40 57h16" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
}

export default function BlogTechnicalCardVisual({ slug, icon: Icon }: BlogTechnicalCardVisualProps) {
  const scene = sceneBySlug[slug] ?? sceneBySlug['que-hacer-fuga-agua-casa']

  return (
    <div
      className="relative flex w-[92px] shrink-0 items-start justify-center overflow-hidden bg-[#F8FBFF] p-3 sm:w-[108px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 176" className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <linearGradient id={`technical-card-bg-${slug}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="62%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id={`technical-card-fade-${slug}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.86" />
          </linearGradient>
        </defs>
        <rect width="96" height="176" fill={`url(#technical-card-bg-${slug})`} />
        <circle cx="17" cy="24" r="23" fill="#FFFFFF" opacity="0.66" />
        <circle cx="84" cy="151" r="33" fill="#FFFFFF" opacity="0.8" />
        <path d="M18 36h58M18 146h58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        {scene}
        <rect width="96" height="176" fill={`url(#technical-card-fade-${slug})`} />
      </svg>
      <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-white" />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/92 text-[#2563EB] shadow-sm ring-1 ring-[#DCE7F7]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>
  )
}
