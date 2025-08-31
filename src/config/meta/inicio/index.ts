export const homeMeta = {
  title: 'Grupo Aguirre | Expertos en Derecho | Asesoría Legal Especializada',
  description:
    'Bufete de abogados especializado en derecho civil, penal, laboral y más. Más de 20 años de experiencia. Consulta gratuita disponible.',
  keywords: [
    'abogados',
    'derecho civil',
    'derecho penal',
    'derecho laboral',
    'asesoría legal',
    'bufete',
  ],
  image: '/og-image.jpg',
  canonical: '/',
  type: 'website',
  robots: 'index, follow',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Bufete Aguirre',
    description: 'Bufete de abogados especializado en múltiples áreas del derecho',
    url: 'https://bufeteaguirre.com',
    telephone: '+1234567890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Principal 123',
      addressLocality: 'Ciudad',
      addressCountry: 'MX',
    },
    areaServed: 'MX',
    serviceType: ['Derecho Civil', 'Derecho Penal', 'Derecho Laboral'],
  },
}
