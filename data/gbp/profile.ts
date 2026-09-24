export type GbpAccessMode = 'manual-ready' | 'api-ready'

export const gbpProfile = {
  accessMode: 'manual-ready' as GbpAccessMode,
  businessName: 'ATG S.L.',
  tradeName: 'Reparar24',
  website: 'https://reparar24.es',
  phone: '+34 642 310 813',
  address: {
    street: 'Calle Navas de Tolosa, 9',
    postalCode: '46901',
    city: 'Torrent',
    region: 'Valencia',
    country: 'ES',
  },
  primaryServiceArea: 'Valencia',
  serviceAreas: [
    'Valencia',
    'Torrent',
    'Paterna',
    'Mislata',
    'Burjassot',
    'Alboraya',
    'Alaquas',
    'Quart de Poblet',
    'Xirivella',
    'Manises',
  ],
  primaryCategoryHint: 'Servicio de reparaciones del hogar',
  secondaryCategoryHints: [
    'Fontanero',
    'Electricista',
    'Servicio de desatascos',
    'Servicio de aire acondicionado',
    'Servicio de calefaccion',
    'Servicio de limpieza de tuberias',
  ],
  hours: {
    emergency: '24/7',
    office: 'Lunes a domingo, 24 horas para urgencias',
  },
  attributes: [
    'Presupuesto previo',
    'Atencion urgente',
    'Tecnicos identificados',
    'Factura disponible',
    'Garantia 6 meses',
    'Seguro RC 600.000 EUR',
  ],
  shortDescription:
    'Reparar24 ofrece servicios urgentes de fontaneria, electricidad, desatascos, climatizacion, calefaccion y limpieza de tuberias en Valencia y alrededores.',
}
