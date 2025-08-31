import { useEffect, useState } from 'react'
import { Search, Type } from 'lucide-react'
import { useBlogStore } from '../../hooks'
import { useDebounce } from '@/features'

export const BlogSidebar = () => {
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

  const handleTagClick = (tagId: string | null) => {
    setLocalQuery('')
    setSelectedTag(tagId)
  }

  const showKeepTypingMessage = localQuery.length > 0 && localQuery.trim().length < 3

  return (
    <aside className="bg-neutral/5 w-full">
      <div className="space-y-6 p-4">
        {/* Search */}
        <div>
          <h3 className="font-heading text-primary mb-4 text-xl font-semibold">Buscar</h3>
          <div className="relative">
            <Search className="text-neutral absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="border-neutral/20 text-primary placeholder:text-neutral/60 focus:border-primary focus:ring-primary/20 w-full border bg-white py-2.5 pl-10 pr-4 text-base focus:outline-none focus:ring-2"
            />
          </div>
          {showKeepTypingMessage && (
            <div className="text-neutral mt-2 flex items-center gap-2 text-sm">
              <Type className="h-4 w-4" />
              <span>Ingresa al menos 3 caracteres.</span>
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-heading text-primary mb-4 text-xl font-semibold">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filters.selectedTagId === null
                  ? 'bg-primary text-white'
                  : 'text-neutral hover:bg-primary/10 hover:text-primary bg-white'
              }`}
            >
              Todas
            </button>

            {isLoadingTags ? (
              <p className="text-neutral text-sm">Cargando categorías...</p>
            ) : (
              tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    filters.selectedTagId === tag.id
                      ? 'bg-primary text-white'
                      : 'text-neutral hover:bg-primary/10 hover:text-primary bg-white'
                  }`}
                >
                  {tag.title}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default BlogSidebar
