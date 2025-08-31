export const nosotrosMeta = {
  title: 'Sobre Nosotros |  Historia y Experiencia | Grupo Aguirre',
  description:
    'Descubre quiénes somos en Grupo Aguirre: más de 15 años brindando asesoría legal de excelencia en el Perú. Conoce nuestro equipo, valores y compromiso.',
  keywords:
    'Grupo Aguirre, sobre nosotros, historia abogados, experiencia legal, bufete Perú, misión, visión, equipo legal',
  canonical: 'https://grupoaguirre.com/nosotros',
  image: 'https://grupoaguirre.com/og-nosotros.jpg',
  type: 'about',
  robots: 'index, follow',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Nosotros - Grupo Aguirre',
    description:
      'Historia, equipo y valores del bufete de abogados Grupo Aguirre, expertos en servicios legales empresariales.',
    mainEntity: {
      '@type': 'LegalService',
      name: 'Grupo Aguirre',
      url: 'https://grupoaguirre.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://grupoaguirre.com/logo.svg',
      },
      foundingDate: '2008-01-15',
      description:
        'Bufete de abogados con sede en Perú, especializado en asesoría legal empresarial, litigios, derecho civil y más.',
      areaServed: {
        '@type': 'Country',
        name: 'Perú',
      },
    },
  },
}
