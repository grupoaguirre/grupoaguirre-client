import { create } from 'zustand'
import { getSearchResults, type SearchResultItem } from '../api'

interface SearchState {
  query: string
  results: SearchResultItem[]
  isLoading: boolean
  error: string | null
  setQuery: (query: string) => void
  search: (query: string) => Promise<void>
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isLoading: false,
  error: null,

  setQuery: (query) => set({ query }),

  search: async (query) => {
    if (!query || query.trim().length < 3) {
      set({ results: [], isLoading: false, error: null })
      return
    }

    set({ isLoading: true, error: null })

    try {
      const response = await getSearchResults(query)
      set({ results: response.docs, isLoading: false })
    } catch (error) {
      set({
        error: 'No se pudo completar la búsqueda. Inténtalo de nuevo.',
        isLoading: false,
        results: [],
      })
    }
  },

  clearSearch: () => set({ query: '', results: [], error: null }),
}))
