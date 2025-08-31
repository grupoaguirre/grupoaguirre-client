export const contactMeta = {
  title: 'Contacto',
  description:
    'Contáctanos para una consulta gratuita. Especialistas en derecho civil, penal y laboral. Estamos aquí para ayudarte con tu caso legal.',
  keywords: [
    'contacto abogados',
    'consulta gratuita',
    'asesoría legal',
    'bufete aguirre',
    'abogados especialistas',
  ],
  image: '/og-image.jpg',
  canonical: '/contacto',
  type: 'website',
  robots: 'index, follow',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto - Bufete Aguirre',
    description: 'Página de contacto para consultas legales',
    url: 'https://bufeteaguirre.com/contacto',
    mainEntity: {
      '@type': 'Organization',
      name: 'Bufete Aguirre',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1234567890',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
      },
    },
  },
}
