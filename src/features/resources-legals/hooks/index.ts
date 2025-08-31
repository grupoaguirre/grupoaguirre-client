import { create } from 'zustand'
import { getLegalResources, getResourceTags } from '../api'
import type { LegalResource, ResourceTag } from '../api'

interface ResourcesFilters {
  searchQuery: string
  selectedTagId: string | null
}

interface PaginationState {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface ResourcesState {
  resources: LegalResource[]
  tags: ResourceTag[]
  filters: ResourcesFilters
  pagination: PaginationState
  isLoading: boolean
  isLoadingTags: boolean
  error: string | null

  initialize: () => Promise<void>
  fetchResources: () => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedTag: (tagId: string | null) => void
  goToPage: (page: number) => void
}

const initialState: Omit<
  ResourcesState,
  'initialize' | 'fetchResources' | 'setSearchQuery' | 'setSelectedTag' | 'goToPage'
> = {
  resources: [],
  tags: [],
  filters: {
    searchQuery: '',
    selectedTagId: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  isLoading: true,
  isLoadingTags: true,
  error: null,
}

export const useResourcesStore = create<ResourcesState>((set, get) => ({
  ...initialState,

  initialize: async () => {
    if (!get().isLoading) set({ isLoading: true })

    try {
      const tags = await getResourceTags()
      set({ tags, isLoadingTags: false })

      await get().fetchResources()
    } catch (error) {
      set({
        error: 'No se pudieron cargar los datos de los recursos.',
        isLoading: false,
        isLoadingTags: false,
      })
    }
  },

  fetchResources: async () => {
    set({ isLoading: true, error: null })
    const { filters, pagination } = get()

    try {
      const response = await getLegalResources({
        page: pagination.currentPage,
        search: filters.searchQuery || undefined,
        tagId: filters.selectedTagId || undefined,
      })

      set({
        resources: response.docs,
        pagination: {
          currentPage: response.page,
          totalPages: response.totalPages,
          hasNextPage: response.hasNextPage,
          hasPrevPage: response.hasPrevPage,
        },
        isLoading: false,
      })
    } catch (error) {
      set({ error: 'Hubo un error al cargar los recursos.', isLoading: false, resources: [] })
    }
  },

  setSearchQuery: (query: string) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
      pagination: { ...state.pagination, currentPage: 1 },
    }))
  },

  setSelectedTag: (tagId: string | null) => {
    set((state) => ({
      filters: {
        selectedTagId: tagId,
        searchQuery: '',
      },
      pagination: { ...state.pagination, currentPage: 1 },
    }))
    get().fetchResources()
  },

  goToPage: (page: number) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    }))
    get().fetchResources()
  },
}))
