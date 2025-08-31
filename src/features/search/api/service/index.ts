import axios from 'axios'
import { API_CONFIG, ENDPOINTS } from '@/config/env/api'
import type { SearchApiResponse } from '../types'

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
})

export const getSearchResults = async (query: string): Promise<SearchApiResponse> => {
  if (!query.trim()) {
    return { docs: [], totalDocs: 0 }
  }

  try {
    const response = await apiClient.get<SearchApiResponse>(ENDPOINTS.search, {
      params: {
        'where[or][0][title][like]': query,
        'where[or][1][excerpt][like]': query,
        limit: 5,
        depth: 1,
      },
    })
    return response.data
  } catch (error) {
    throw new Error('La petición a la API de búsqueda ha fallado.')
  }
}
