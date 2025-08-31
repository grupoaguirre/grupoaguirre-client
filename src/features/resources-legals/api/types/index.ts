export interface ResourceTag {
  id: string
  name: string
  slug: string
}

export interface ResourceCategory {
  id: string
  name: string
  slug: string
}

export interface ResourceImage {
  id: string
  url: string
  alt: string
}

export interface ResourceFile {
  id: string
  url: string
  filename: string
  mimeType: string
  filesize: number
}

interface ResourceBase {
  id: string
  titulo: string
  descripcion: string
  imagenDestacada: ResourceImage
  tags: ResourceCategory
  resourceTags: ResourceTag[]
  fechaPublicacion: string
}

export interface ArticleResource extends ResourceBase {
  tipo: 'articulo'
  slug: string
  contenidoHtml: string
  archivo?: never
}

export interface DocumentResource extends ResourceBase {
  tipo: 'documento'
  archivo: ResourceFile
  slug?: never
  contenidoHtml?: never
}

export type LegalResource = ArticleResource | DocumentResource

export interface LegalResourcesApiResponse {
  docs: LegalResource[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export interface ResourceTagsApiResponse {
  docs: ResourceTag[]
}
