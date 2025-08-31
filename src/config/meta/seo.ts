export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string
  type?: string
  author?: string
  publishDate?: string
  modifiedDate?: string
  structuredData?: any
  breadcrumbData?: any
  image?: string
  canonical?: string
}

export const defaultSEO = {
  title: 'Grupo Aguirre - Servicios Legales',
  description: 'Bufete de abogados especializado en múltiples áreas del derecho',
  keywords: 'abogados, derecho civil, derecho penal, derecho laboral, asesoría legal',
  type: 'website',
  author: 'Bufete Aguirre',
  robots: 'index, follow',
}

export const siteConfig = {
  name: 'Bufete Aguirre',
  baseUrl: 'https://bufeteaguirre.com',
  themeColor: '#1f2937',
  locale: 'es-MX',
  currentYear: new Date().getFullYear(),
}

export function createDefaultStructuredData(siteUrl: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.name,
    description: description,
    url: siteUrl,
    telephone: '+1234567890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Principal 123',
      addressLocality: 'Ciudad',
      addressCountry: 'MX',
    },
    areaServed: 'MX',
    serviceType: ['Derecho Civil', 'Derecho Penal', 'Derecho Laboral'],
  }
}

export function generateFullUrl(path: string, baseSite: URL): string {
  return new URL(path, baseSite).href
}
