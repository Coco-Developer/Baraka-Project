window.BARAKA_PACK_CONFIG = [
  {
    id: 'empanadas',
    name: 'Empanadas árabes',
    pricingMode: 'perUnit',
    displayUnitLabel: 'unid.',
    priceLabel: '$1.700 c/u',
    ruleLabel: 'Pedido base: 3 un.',
    minSelection: 3,
    increment: 1,
    pricingTiers: [
      { qty: 12, total: 20000, label: 'Docena $20.000' }
    ],
    variants: [{ id: 'clasicas', name: 'Clásicas', price: 1700 }]
  },
  {
    id: 'ninos',
    name: 'Niños envueltos',
    pricingMode: 'perUnit',
    displayUnitLabel: 'unid.',
    priceLabel: '$1.200 c/u',
    ruleLabel: 'Pedido base: 6 un.',
    minSelection: 6,
    increment: 6,
    variants: [{ id: 'clasicos', name: 'Clásicos', price: 1200 }]
  },
  {
    id: 'kepi',
    name: 'Kepi',
    pricingMode: 'perUnit',
    displayUnitLabel: 'unid.',
    priceLabel: '$1.800 c/u',
    ruleLabel: 'Porción de 2 un.',
    minSelection: 2,
    increment: 2,
    variants: [{ id: 'clasico', name: 'Clásico', price: 1800 }]
  },
  {
    id: 'falafel',
    name: 'Falafel',
    pricingMode: 'perUnit',
    displayUnitLabel: 'unid.',
    priceLabel: '$900 c/u',
    ruleLabel: 'Porción de 3 un.',
    minSelection: 3,
    increment: 3,
    variants: [{ id: 'clasico', name: 'Clásico', price: 900 }]
  },
  {
    id: 'pita',
    name: 'Pita casera',
    pricingMode: 'perUnit',
    displayUnitLabel: 'unid.',
    priceLabel: '$600 c/u',
    ruleLabel: 'Porción de 2 un.',
    minSelection: 2,
    increment: 2,
    variants: [{ id: 'casera', name: 'Casera', price: 600 }]
  },
  {
    id: 'hummus',
    name: 'Hummus',
    pricingMode: 'perSelection',
    displayUnitLabel: 'bandeja',
    priceLabel: 'Desde $3.200',
    ruleLabel: 'Elegí mediano o grande.',
    variants: [
      { id: 'mediano', name: 'Mediano · 150 g', price: 3200 },
      { id: 'grande', name: 'Grande · 300 g', price: 5800 }
    ]
  },
  {
    id: 'tabule',
    name: 'Tabule',
    pricingMode: 'perSelection',
    displayUnitLabel: 'bandeja',
    priceLabel: 'Desde $3.400',
    ruleLabel: 'Elegí mediano o grande.',
    variants: [
      { id: 'mediano', name: 'Mediano · 150 g', price: 3400 },
      { id: 'grande', name: 'Grande · 300 g', price: 6100 }
    ]
  },
  {
    id: 'baba',
    name: 'Baba ganoush',
    pricingMode: 'perSelection',
    displayUnitLabel: 'bandeja',
    priceLabel: 'Desde $2.900',
    ruleLabel: 'Elegí mediano o grande.',
    variants: [
      { id: 'mediano', name: 'Mediano · 100 g', price: 2900 },
      { id: 'grande', name: 'Grande · 200 g', price: 5400 }
    ]
  },
  {
    id: 'labneh',
    name: 'Labneh',
    pricingMode: 'perSelection',
    displayUnitLabel: 'bandeja',
    priceLabel: 'Desde $2.800',
    ruleLabel: 'Elegí mediano o grande.',
    variants: [
      { id: 'mediano', name: 'Mediano · 100 g', price: 2800 },
      { id: 'grande', name: 'Grande · 200 g', price: 5200 }
    ]
  },
  {
    id: 'zanahorias',
    name: 'Zanahorias y aceitunas',
    pricingMode: 'perSelection',
    displayUnitLabel: 'bandeja',
    priceLabel: 'Desde $2.600',
    ruleLabel: 'Elegí mediano o grande.',
    variants: [
      { id: 'mediano', name: 'Mediano', price: 2600 },
      { id: 'grande', name: 'Grande', price: 4700 }
    ]
  }
];
