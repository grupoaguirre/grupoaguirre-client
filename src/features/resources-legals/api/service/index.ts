import axios from 'axios'
import { API_CONFIG, ENDPOINTS } from '@/config/env/api'
import type {
  LegalResourcesApiResponse,
  ResourceTagsApiResponse,
  ArticleResource,
  LegalResource,
  ResourceTag,
} from '../types'

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
})

interface GetResourcesParams {
  page?: number
  limit?: number
  search?: string
  tagId?: string
}

/**
 * Obtiene los recursos legales desde la API, con soporte para paginación y filtros.
 */
export const getLegalResources = async (
  params: GetResourcesParams = {},
): Promise<LegalResourcesApiResponse> => {
  const { page = 1, limit = 9, search, tagId } = params

  const queryParams: Record<string, any> = {
    page,
    limit,
    sort: '-fechaPublicacion',
    depth: 2,
  }

  const where: Record<string, any> = {}

  if (search) {
    where['or'] = [{ titulo: { like: search } }, { descripcion: { like: search } }]
  }
  if (tagId) {
    where['resourceTags'] = { in: [tagId] }
  }

  if (Object.keys(where).length > 0) {
    queryParams.where = where
  }

  try {
    const response = await apiClient.get<LegalResourcesApiResponse>(ENDPOINTS.recursos, {
      params: queryParams,
    })
    return response.data
  } catch (error) {
    throw new Error('No se pudieron obtener los recursos legales.')
  }
}

/**
 * Obtiene todas las etiquetas disponibles para los recursos.
 */
export const getResourceTags = async (): Promise<ResourceTag[]> => {
  try {
    const response = await apiClient.get<ResourceTagsApiResponse>(ENDPOINTS.resourceTags)

    return response.data.docs
  } catch (error) {
    throw new Error('No se pudieron obtener las etiquetas de los recursos.')
  }
}

/**
 * Obtiene un único recurso de tipo 'articulo' por su slug.
 */
export const getArticleResourceBySlug = async (slug: string): Promise<ArticleResource | null> => {
  try {
    const response = await apiClient.get<LegalResourcesApiResponse>(ENDPOINTS.recursos, {
      params: {
        'where[slug][equals]': slug,
        'where[tipo][equals]': 'articulo',
        depth: 2,
      },
    })

    if (response.data.docs && response.data.docs.length > 0) {
      return response.data.docs[0] as ArticleResource
    }

    return null
  } catch (error) {
    throw new Error('No se pudo obtener el recurso.')
  }
}
