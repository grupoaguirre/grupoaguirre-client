import React from 'react'
import { Pagination } from '@/components'

const BlogPagination = () => {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={() => {}}
            showFirstLast={true}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </section>
  )
}

export default BlogPagination
