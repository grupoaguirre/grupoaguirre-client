export interface BlogTag {
  id: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface MainTag {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Author {
  id: string
  nombre: string
  createdAt: string
  updatedAt: string
}

export interface BlogImage {
  id: string
  alt: string
  url: string
  thumbnailURL?: string | null
  width: number
  height: number
  mimeType: string
  filesize: number
  createdAt: string
  updatedAt: string
}

export interface BlogPostRaw {
  id: string
  title: string
  slug: string
  excerpt: string
  contentHtml: string
  publishedDate: string
  status: 'published' | 'draft'
  tags: MainTag
  blogTags: string[] | BlogTag[]
  author: Author | string
  image?: BlogImage
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  contentHtml: string
  publishedDate: string
  status: 'published' | 'draft'
  tags: MainTag
  blogTags: BlogTag[]
  author: Author
  image?: BlogImage
  createdAt: string
  updatedAt: string
}

export interface BlogApiResponse {
  docs: BlogPostRaw[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface BlogTagsApiResponse {
  docs: BlogTag[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface GetBlogPostsParams {
  page?: number
  limit?: number
  search?: string
  tagId?: string
}
