import React, { useEffect } from 'react'
import { useBlogStore } from '../../hooks'
import { BlogPostCard } from '../blog-post-card'
import { BlogSidebar } from '../blog-sidebar'
import { BlogMobileFilters } from '../blog-mobile-filters'
import { Pagination } from '@/components'
import { StateDisplay } from '@/components'

const BlogPageContent = () => {
  const { posts, pagination, isLoading, error, initialize, goToPage } = useBlogStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <BlogMobileFilters />
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Articles Grid and Pagination */}
            <div className="lg:col-span-8">
              <StateDisplay
                isLoading={isLoading}
                error={error}
                data={posts}
                messages={{
                  loading: 'Cargando artículos...',
                  empty: 'No se encontraron artículos que coincidan con tu búsqueda.',
                }}
              />

              {!isLoading && !error && posts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {posts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
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

            <div className="hidden lg:col-span-4 lg:block">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPageContent
