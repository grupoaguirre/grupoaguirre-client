export const areasServiciosMeta = {
  title: 'Áreas de Práctica | Servicios Legales | Grupo Aguirre',
  description:
    'Descubre nuestras áreas de práctica y servicios legales: derecho civil, penal, laboral, familiar y corporativo. Más de 15 años brindando asesoría y representación legal en Perú.',
  keywords:
    'áreas de práctica legal, servicios legales, derecho civil, derecho penal, derecho laboral, derecho familiar, derecho corporativo, abogados Perú, asesoría legal Lima',
  canonical: 'https://grupoaguirre.com/areas-y-servicios',
  image: 'https://grupoaguirre.com/og-areas-servicios.jpg',
  type: 'service',
  robots: 'index, follow',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Áreas de Práctica y Servicios - Grupo Aguirre',
    description:
      'Página que detalla las principales especialidades y servicios legales del bufete Grupo Aguirre: derecho civil, penal, laboral, familiar y corporativo.',
    url: 'https://grupoaguirre.com/areas-y-servicios',
    serviceType: [
      'Derecho Civil',
      'Derecho Penal',
      'Derecho Laboral',
      'Derecho Familiar',
      'Derecho Corporativo',
    ],
    provider: {
      '@type': 'Organization',
      name: 'Grupo Aguirre',
      url: 'https://grupoaguirre.com',
      logo: 'https://grupoaguirre.com/logo.png',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Perú',
    },
    availableLanguage: ['Spanish'],
    hasPart: {
      '@type': 'ItemList',
      name: 'Áreas de Práctica Legal',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Derecho Civil' },
        { '@type': 'ListItem', position: 2, name: 'Derecho Penal' },
        { '@type': 'ListItem', position: 3, name: 'Derecho Laboral' },
        { '@type': 'ListItem', position: 4, name: 'Derecho Familiar' },
        { '@type': 'ListItem', position: 5, name: 'Derecho Corporativo' },
      ],
    },
  },
}
