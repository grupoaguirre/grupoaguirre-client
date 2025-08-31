import { useEffect } from 'react'
import { useResourcesStore } from '../../hooks'
import { ResourceCard } from '../resource-card'
import { ResourcesSidebar } from '../resources-sidebar'
import { ResourcesMobileFilters } from '../resources-mobile-filters'
import { Pagination } from '@/components'
import { StateDisplay } from '@/components'

export const ResourcesPageContent = () => {
  const { resources, pagination, isLoading, error, initialize, goToPage } = useResourcesStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <ResourcesMobileFilters />

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Grid */}
            <div className="lg:col-span-8">
              <StateDisplay
                isLoading={isLoading}
                error={error}
                data={resources}
                messages={{
                  loading: 'Cargando recursos...',
                  empty: 'No se encontraron recursos que coincidan con tu búsqueda.',
                }}
              />

              {!isLoading && !error && resources.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {resources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={goToPage}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:col-span-4 lg:block">
              <ResourcesSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResourcesPageContent
