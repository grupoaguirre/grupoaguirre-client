import React, { useEffect, useRef, useState } from 'react'
import { useSearchStore } from '@/features/search/hooks'
import { StateDisplay } from '@/components/ui/state-display'
import { SearchResultItemCard } from '@/features/search/components/search-resumen-item'
import { Search as SearchIcon, X } from 'lucide-react'
import { useDebounce } from '@/features/search/hooks'
import Input from '../input'

export const SearchModal = () => {
  const { query, setQuery, search, results, isLoading, error, clearSearch } = useSearchStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true)
    }

    window.addEventListener('openSearchModal', handleOpenModal)
    return () => window.removeEventListener('openSearchModal', handleOpenModal)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isModalOpen])

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleClose()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClose = () => {
    clearSearch()
    setIsModalOpen(false)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/50 transition-opacity duration-300 ${
        isModalOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`mt-20 w-full max-w-2xl transform transition-all duration-300 ${
          isModalOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        <div className="mx-4 bg-white shadow-xl">
          {/* Header of the modal */}
          <div className="border-neutral/10 flex items-center justify-between border-b p-6">
            <h2 className="font-heading text-primary text-xl font-semibold">Buscar en el sitio</h2>
            <button
              onClick={handleClose}
              className="text-neutral hover:text-primary flex h-10 w-10 items-center justify-center transition-colors"
              aria-label="Cerrar búsqueda"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search field */}
          <div className="p-6">
            <Input
              type="search"
              placeholder="Buscar artículos, especialidades, recursos..."
              variant="filled"
              value={query}
              onChange={handleInputChange}
              icon={<SearchIcon className="h-4 w-4" />}
              rightIcon={
                query ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="pointer-events-auto cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null
              }
              className="[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:hidden [&::-webkit-search-decoration]:appearance-none"
            />
          </div>

          {/* Results */}
          {query.length >= 3 && (
            <div className="border-neutral/10 border-t">
              <div className="max-h-[50vh] overflow-y-auto p-6">
                <StateDisplay
                  isLoading={isLoading}
                  error={error}
                  data={results}
                  messages={{ empty: `No hay resultados para "${query}"` }}
                />

                {!isLoading && !error && results.length > 0 && (
                  <div className="space-y-2">
                    {results.map((item) => (
                      <SearchResultItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Short search message */}
          {query.length > 0 && query.length < 3 && (
            <div className="border-neutral/10 border-t p-6">
              <p className="text-neutral text-sm">Escribe al menos 3 caracteres para buscar</p>
            </div>
          )}

          {/* Footer */}
          {query.length === 0 && (
            <div className="border-neutral/10 border-t p-6">
              <p className="text-neutral text-sm">
                Busca por especialidades legales, artículos del blog, recursos legales y más.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
