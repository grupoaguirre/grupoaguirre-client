export const ROUTES = {
  home: '/',
  about: '/nosotros',
  practiceAreas: '/areas',
  resources: '/recursos',
  blog: '/blog',
  contact: '/contacto',
  search: '/buscar',
} as const

export const getPracticeAreaRoute = (slug: string) => `${ROUTES.practiceAreas}/${slug}`

export const getBlogPostRoute = (slug: string) => `${ROUTES.blog}/${slug}`
