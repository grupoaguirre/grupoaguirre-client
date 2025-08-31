import { create } from 'zustand'
import { getBlogPosts, getBlogTags, type BlogPost, type BlogTag } from '../api'

interface BlogFilters {
  searchQuery: string
  selectedTagId: string | null
}

interface PaginationState {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface BlogState {
  posts: BlogPost[]
  tags: BlogTag[]
  filters: BlogFilters
  pagination: PaginationState
  isLoading: boolean
  isLoadingTags: boolean
  error: string | null
  initialize: () => Promise<void>
  fetchPosts: () => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedTag: (tagId: string | null) => void
  goToPage: (page: number) => void
}

const initialState = {
  posts: [],
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

export const useBlogStore = create<BlogState>((set, get) => ({
  ...initialState,

  initialize: async () => {
    if (!get().isLoading) set({ isLoading: true })
    try {
      const tags = await getBlogTags()
      set({ tags, isLoadingTags: false })
      await get().fetchPosts()
    } catch (error) {
      set({
        error: 'No se pudieron cargar los datos del blog.',
        isLoading: false,
        isLoadingTags: false,
      })
    }
  },

  fetchPosts: async () => {
    set({ isLoading: true, error: null })
    const { filters, pagination } = get()
    try {
      const response = await getBlogPosts({
        page: pagination.currentPage,
        search: filters.searchQuery || undefined,
        tagId: filters.selectedTagId || undefined,
      })
      set({
        posts: response.docs as BlogPost[],
        pagination: {
          currentPage: response.page,
          totalPages: response.totalPages,
          hasNextPage: response.hasNextPage,
          hasPrevPage: response.hasPrevPage,
        },
        isLoading: false,
      })
    } catch (error) {
      set({ error: 'Hubo un error al cargar los artículos.', isLoading: false, posts: [] })
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
        ...state.filters,
        selectedTagId: tagId,
        searchQuery: '',
      },
      pagination: { ...state.pagination, currentPage: 1 },
    }))
    get().fetchPosts()
  },

  goToPage: (page: number) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    }))
    get().fetchPosts()
  },
}))
