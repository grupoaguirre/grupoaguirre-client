export interface SearchTag {
  id: string
  name: string
}

export interface SearchResultItem {
  id: string
  type: 'areas' | 'blog' | 'recursos'
  title: string
  excerpt: string
  url: string
  tags?: SearchTag[]
}

export interface SearchApiResponse {
  docs: SearchResultItem[]
  totalDocs: number
}
