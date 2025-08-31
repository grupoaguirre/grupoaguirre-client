import React, { useEffect, useState } from 'react'
import { useBlogStore } from '../../hooks'
import { useDebounce } from '@/features'
import { Input } from '@/components/ui'
import { Search, Type } from 'lucide-react'

export const BlogMobileFilters = () => {
  const { filters, setSearchQuery, fetchPosts, setSelectedTag, tags, isLoadingTags } =
    useBlogStore()
  const [localQuery, setLocalQuery] = useState(filters.searchQuery)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [debouncedQuery, setSearchQuery])

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3 || debouncedQuery.length === 0) {
      fetchPosts()
    }
  }, [debouncedQuery, fetchPosts])

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalQuery('')
    setSelectedTag(e.target.value || null)
  }

  const showKeepTypingMessage = localQuery.length > 0 && localQuery.trim().length < 3

  return (
    <section className="bg-white py-8 lg:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Buscar artículos..."
              icon={<Search />}
              value={localQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalQuery(e.target.value)}
            />
            {showKeepTypingMessage && (
              <div className="text-neutral mt-2 flex items-center gap-2 text-sm">
                <Type className="h-4 w-4" />
                <span>Ingresa al menos 3 caracteres.</span>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={filters.selectedTagId || ''}
            onChange={handleTagChange}
            className="border-neutral/20 text-primary focus:border-primary focus:ring-primary/20 w-full border bg-white px-4 py-2.5 text-base focus:outline-none focus:ring-2"
            disabled={isLoadingTags}
          >
            <option value="">Todas las categorías</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default BlogMobileFilters
