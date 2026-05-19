export interface City {
  id: string
  name: string
  slug: string
  province: string
  population: number
  districts: District[]
  coordinates: {
    lat: number
    lng: number
  }
  postalCodes: string[]
}

export interface District {
  id: string
  name: string
  slug: string
  postalCodes: string[]
}

export const cities: City[] = [
  {
    id: 'madrid',
    name: 'Madrid',
    slug: 'madrid',
    province: 'Madrid',
    population: 3223334,
    coordinates: { lat: 40.4168, lng: -3.7038 },
    postalCodes: ['28001', '28002', '28003', '28004', '28005'],
    districts: [
      { id: 'centro', name: 'Centro', slug: 'centro', postalCodes: ['28001', '28002', '28003'] },
      { id: 'salamanca', name: 'Salamanca', slug: 'salamanca', postalCodes: ['28006', '28009'] },
      { id: 'chamberi', name: 'Chamberí', slug: 'chamberi', postalCodes: ['28010', '28015'] },
      { id: 'retiro', name: 'Retiro', slug: 'retiro', postalCodes: ['28007', '28009'] },
      { id: 'chamartin', name: 'Chamartín', slug: 'chamartin', postalCodes: ['28016', '28036'] }
    ]
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    slug: 'barcelona',
    province: 'Barcelona',
    population: 1620343,
    coordinates: { lat: 41.3851, lng: 2.1734 },
    postalCodes: ['08001', '08002', '08003', '08004', '08005'],
    districts: [
      { id: 'ciutat-vella', name: 'Ciutat Vella', slug: 'ciutat-vella', postalCodes: ['08001', '08002', '08003'] },
      { id: 'eixample', name: 'Eixample', slug: 'eixample', postalCodes: ['08007', '08008', '08009'] },
      { id: 'gracia', name: 'Gràcia', slug: 'gracia', postalCodes: ['08012', '08024'] },
      { id: 'sants', name: 'Sants-Montjuïc', slug: 'sants', postalCodes: ['08004', '08015'] },
      { id: 'sarria', name: 'Sarrià-Sant Gervasi', slug: 'sarria', postalCodes: ['08017', '08034'] }
    ]
  },
  {
    id: 'valencia',
    name: 'Valencia',
    slug: 'valencia',
    province: 'Valencia',
    population: 791413,
    coordinates: { lat: 39.4699, lng: -0.3763 },
    postalCodes: ['46001', '46002', '46003', '46004', '46005'],
    districts: [
      { id: 'ciutat-vella', name: 'Ciutat Vella', slug: 'ciutat-vella', postalCodes: ['46001', '46002', '46003'] },
      { id: 'leixample', name: 'L\'Eixample', slug: 'leixample', postalCodes: ['46004', '46005'] },
      { id: 'extramurs', name: 'Extramurs', slug: 'extramurs', postalCodes: ['46007', '46008'] },
      { id: 'campanar', name: 'Campanar', slug: 'campanar', postalCodes: ['46015'] },
      { id: 'poblats-maritims', name: 'Poblats Marítims', slug: 'poblats-maritims', postalCodes: ['46011', '46024'] }
    ]
  },
  {
    id: 'sevilla',
    name: 'Sevilla',
    slug: 'sevilla',
    province: 'Sevilla',
    population: 688711,
    coordinates: { lat: 37.3891, lng: -5.9845 },
    postalCodes: ['41001', '41002', '41003', '41004', '41005'],
    districts: [
      { id: 'casco-antiguo', name: 'Casco Antiguo', slug: 'casco-antiguo', postalCodes: ['41001', '41004'] },
      { id: 'triana', name: 'Triana', slug: 'triana', postalCodes: ['41010'] },
      { id: 'nervion', name: 'Nervión', slug: 'nervion', postalCodes: ['41005', '41018'] },
      { id: 'macarena', name: 'Macarena', slug: 'macarena', postalCodes: ['41003', '41007'] },
      { id: 'sur', name: 'Sur', slug: 'sur', postalCodes: ['41013'] }
    ]
  },
  {
    id: 'zaragoza',
    name: 'Zaragoza',
    slug: 'zaragoza',
    province: 'Zaragoza',
    population: 674997,
    coordinates: { lat: 41.6488, lng: -0.8891 },
    postalCodes: ['50001', '50002', '50003', '50004', '50005'],
    districts: [
      { id: 'centro', name: 'Centro', slug: 'centro', postalCodes: ['50001', '50003'] },
      { id: 'delicias', name: 'Delicias', slug: 'delicias', postalCodes: ['50009', '50017'] },
      { id: 'universidad', name: 'Universidad', slug: 'universidad', postalCodes: ['50010'] },
      { id: 'san-jose', name: 'San José', slug: 'san-jose', postalCodes: ['50007', '50008'] },
      { id: 'actur', name: 'Actur', slug: 'actur', postalCodes: ['50018'] }
    ]
  },
  {
    id: 'malaga',
    name: 'Málaga',
    slug: 'malaga',
    province: 'Málaga',
    population: 578460,
    coordinates: { lat: 36.7213, lng: -4.4214 },
    postalCodes: ['29001', '29002', '29003', '29004', '29005'],
    districts: [
      { id: 'centro', name: 'Centro', slug: 'centro', postalCodes: ['29001', '29015'] },
      { id: 'este', name: 'Este', slug: 'este', postalCodes: ['29017', '29018'] },
      { id: 'ciudad-jardin', name: 'Ciudad Jardín', slug: 'ciudad-jardin', postalCodes: ['29014'] },
      { id: 'teatinos', name: 'Teatinos', slug: 'teatinos', postalCodes: ['29010'] },
      { id: 'carretera-cadiz', name: 'Carretera de Cádiz', slug: 'carretera-cadiz', postalCodes: ['29004'] }
    ]
  }
]
