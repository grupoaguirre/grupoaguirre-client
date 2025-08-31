import axios from 'axios'
import { API_CONFIG, ENDPOINTS } from '@/config/env/api'
import type {
  BlogApiResponse,
  BlogTagsApiResponse,
  BlogTag,
  BlogPost,
  GetBlogPostsParams,
} from '../types'

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
})

export const getBlogPosts = async (params: GetBlogPostsParams = {}): Promise<BlogApiResponse> => {
  console.log('[DEBUG-SERVICE] Intentando obtener blogTags desde:', ENDPOINTS.blogTags)

  const { page = 1, limit = 9, search, tagId } = params

  const queryParams: Record<string, any> = {
    page,
    limit,
    sort: '-publishedDate',
    depth: 2,
  }

  const where: Record<string, any> = {}

  if (search && search.trim().length > 0) {
    where['or'] = [{ title: { like: search } }, { excerpt: { like: search } }]
  }

  if (tagId) {
    where['blogTags'] = { in: [tagId] }
  }

  if (Object.keys(where).length > 0) {
    queryParams.where = where
  }

  try {
    const response = await apiClient.get<BlogApiResponse>(ENDPOINTS.blog, {
      params: queryParams,
    })
    return response.data
  } catch (error) {
    console.error('[DEBUG-SERVICE] ¡ERROR al obtener blogTags!', error)
    throw new Error('No se pudieron obtener los artículos del blog.')
  }
}

export const getBlogTags = async (): Promise<BlogTag[]> => {
  try {
    const response = await apiClient.get<BlogTagsApiResponse>(ENDPOINTS.blogTags)
    return response.data.docs
  } catch (error) {
    throw new Error('No se pudieron obtener las etiquetas del blog.')
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await apiClient.get<BlogApiResponse>(ENDPOINTS.blog, {
      params: {
        'where[slug][equals]': slug,
        limit: 1,
        depth: 2,
      },
    })

    if (!response.data.docs || response.data.docs.length === 0) {
      return null
    }

    const post = response.data.docs[0]

    if (Array.isArray(post.blogTags) && post.blogTags.length > 0) {
      const firstTag = post.blogTags[0]
      const isAlreadyPopulated = typeof firstTag === 'object' && firstTag.title

      if (isAlreadyPopulated) {
        return post as BlogPost
      } else {
        try {
          const populatedBlogTags: BlogTag[] = []

          for (const tagId of post.blogTags) {
            try {
              const tagResponse = await apiClient.get<BlogTag>(`${ENDPOINTS.blogTags}/${tagId}`)
              populatedBlogTags.push(tagResponse.data)
            } catch (singleTagError) {
              console.warn('Error obteniendo tag individual:', tagId)
            }
          }

          return {
            ...post,
            blogTags: populatedBlogTags,
          } as BlogPost
        } catch (tagError) {
          console.error('Error populando blogTags:', tagError)
          return {
            ...post,
            blogTags: [],
          } as BlogPost
        }
      }
    } else {
      return {
        ...post,
        blogTags: [],
      } as BlogPost
    }
  } catch (error) {
    console.error('Error obteniendo post por slug:', error)
    throw new Error('No se pudo obtener el artículo del blog.')
  }
}
