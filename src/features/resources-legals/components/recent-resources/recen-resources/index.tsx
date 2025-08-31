import { useState, useEffect } from 'react'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { getLegalResources, type LegalResource } from '../../../api'
import { RecentResourceCard } from '../recent-resource-card'
import { ROUTES } from '@/config/routes'

const ResourceSkeleton = () => (
  <div className="flex h-full animate-pulse flex-col">
    <div className="bg-neutral/10 mb-6 h-80 w-full"></div>
    <div className="flex-1 space-y-4">
      <div className="bg-neutral/10 h-4 w-1/4"></div>
      <div className="space-y-2">
        <div className="bg-neutral/10 h-6 w-full"></div>
        <div className="bg-neutral/10 h-6 w-5/6"></div>
      </div>
      <div className="bg-neutral/10 h-px w-full"></div>
      <div className="bg-neutral/10 h-4 w-1/3"></div>
    </div>
  </div>
)

export const RecentResources = () => {
  const [resources, setResources] = useState<LegalResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentResources = async () => {
      try {
        const response = await getLegalResources({ limit: 3 })
        setResources(response.docs)
      } catch (err) {
        setError('No se pudieron cargar los recursos recientes.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecentResources()
  }, [])

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-primary mb-6 inline-flex items-center px-4 py-2">
              <span className="text-sm font-medium uppercase tracking-wide text-white">
                RECURSOS LEGALES
              </span>
            </div>
            <h2 className="font-heading text-primary mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Últimos recursos legales
            </h2>
          </div>
          <div className="flex items-end justify-end">
            <a
              href={ROUTES.resources}
              className="bg-primary group flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors hover:opacity-80"
            >
              <span>Ver más recursos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <ResourceSkeleton />
              <ResourceSkeleton />
              <ResourceSkeleton />
            </>
          ) : error ? (
            <div className="md:col-span-2 lg:col-span-3">
              <div className="text-primary flex flex-col items-center gap-2 text-center">
                <AlertCircle className="h-8 w-8 text-yellow-500" />
                <p>{error}</p>
              </div>
            </div>
          ) : (
            resources.map((resource) => (
              <RecentResourceCard key={resource.id} resource={resource} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default RecentResources
