import React, { useEffect, useState } from 'react'
import { useResourcesStore } from '../../hooks'
import { useDebounce } from '@/features'
import { Input } from '@/components'
import { Search, Type } from 'lucide-react'

export const ResourcesMobileFilters = () => {
  const { filters, setSearchQuery, fetchResources, setSelectedTag, tags, isLoadingTags } =
    useResourcesStore()
  const [localQuery, setLocalQuery] = useState(filters.searchQuery)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => {
    setSearchQuery(debouncedQuery)
  }, [debouncedQuery, setSearchQuery])

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3 || debouncedQuery.length === 0) {
      fetchResources()
    }
  }, [debouncedQuery, fetchResources])

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
              placeholder="Buscar recursos..."
              icon={<Search />}
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
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
            className="border-neutral/20 text-primary focus:border-primary focus:ring-primary/20 w-full rounded-md border bg-white px-4 py-2.5 text-base focus:outline-none focus:ring-2"
            disabled={isLoadingTags}
          >
            <option value="">Todas las categorías</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default ResourcesMobileFilters
