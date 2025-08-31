import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  variant?: 'default' | 'outlined' | 'rounded' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  showPageInfo?: boolean
  className?: string
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  variant = 'default',
  size = 'md',
  showPageInfo = false,
  className = '',
}) => {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = []
    const half = Math.floor(maxVisiblePages / 2)

    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages)
    }
    if (currentPage > totalPages - half) {
      start = Math.max(1, totalPages - maxVisiblePages + 1)
    }

    if (showFirstLast && start > 1) {
      pages.push(1)
      if (start > 2) {
        pages.push('...')
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (showFirstLast && end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  const containerClasses = ['flex', 'items-center', 'justify-center', 'gap-1', className]
    .filter(Boolean)
    .join(' ')

  const sizes = {
    sm: {
      button: 'h-8 w-8 text-xs',
      icon: 'h-3 w-3',
    },
    md: {
      button: 'h-10 w-10 text-sm',
      icon: 'h-4 w-4',
    },
    lg: {
      button: 'h-12 w-12 text-base',
      icon: 'h-5 w-5',
    },
  }

  const variants = {
    default: {
      base: [
        'border',
        'border-neutral/20',
        'bg-white',
        'text-primary',
        'hover:bg-neutral/5',
        'hover:border-neutral/30',
        'focus:border-primary',
        'focus:ring-2',
        'focus:ring-primary/20',
      ].join(' '),
      active: [
        'bg-primary',
        'text-white',
        'border-primary',
        'hover:opacity-90',
        'focus:ring-primary/50',
      ].join(' '),
    },
    outlined: {
      base: [
        'border-2',
        'border-neutral/20',
        'bg-transparent',
        'text-primary',
        'hover:border-primary',
        'hover:text-primary',
        'focus:border-primary',
        'focus:ring-2',
        'focus:ring-primary/20',
      ].join(' '),
      active: ['border-primary', 'bg-primary', 'text-white', 'hover:opacity-90'].join(' '),
    },
    rounded: {
      base: [
        'rounded-full',
        'border',
        'border-neutral/20',
        'bg-white',
        'text-primary',
        'hover:bg-neutral/5',
        'hover:border-neutral/30',
        'focus:border-primary',
        'focus:ring-2',
        'focus:ring-primary/20',
      ].join(' '),
      active: [
        'rounded-full',
        'bg-primary',
        'text-white',
        'border-primary',
        'hover:opacity-90',
      ].join(' '),
    },
    minimal: {
      base: [
        'border-0',
        'bg-transparent',
        'text-neutral',
        'hover:bg-neutral/10',
        'hover:text-primary',
        'focus:bg-neutral/10',
        'focus:ring-2',
        'focus:ring-neutral/20',
      ].join(' '),
      active: ['bg-primary/10', 'text-primary', 'font-semibold', 'hover:bg-primary/20'].join(' '),
    },
  }

  const baseButtonClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:hover:bg-current',
    'select-none',
  ].join(' ')

  const getButtonClasses = (isActive = false, isDisabled = false) => {
    const variantClasses = isActive ? variants[variant].active : variants[variant].base

    const roundedClass = variant === 'rounded' ? '' : 'rounded-md'

    return [
      baseButtonClasses,
      sizes[size].button,
      variantClasses,
      roundedClass,
      isDisabled ? 'opacity-50 cursor-not-allowed' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  const ArrowLeft = () => (
    <svg
      className={sizes[size].icon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )

  const ArrowRight = () => (
    <svg
      className={sizes[size].icon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )

  const ChevronsLeft = () => (
    <svg
      className={sizes[size].icon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  )

  const ChevronsRight = () => (
    <svg
      className={sizes[size].icon}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <nav className={containerClasses} role="navigation" aria-label="Navegación de páginas">
        {/* First page button */}
        {showFirstLast && totalPages > maxVisiblePages && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={getButtonClasses(false, currentPage === 1)}
            aria-label="Primera página"
            title="Primera página"
          >
            <ChevronsLeft />
          </button>
        )}

        {/* Previous page button */}
        {showPrevNext && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={getButtonClasses(false, currentPage === 1)}
            aria-label="Página anterior"
            title="Página anterior"
          >
            <ArrowLeft />
          </button>
        )}

        {/* Pages */}
        {visiblePages.map((page, index) => (
          <React.Fragment key={`page-${index}`}>
            {page === '...' ? (
              <span
                className={`${sizes[size].button} text-neutral/60 flex select-none items-center justify-center`}
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={getButtonClasses(page === currentPage)}
                aria-label={`Ir a página ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                title={`Página ${page}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next page button */}
        {showPrevNext && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={getButtonClasses(false, currentPage === totalPages)}
            aria-label="Página siguiente"
            title="Página siguiente"
          >
            <ArrowRight />
          </button>
        )}

        {/* Last page button */}
        {showFirstLast && totalPages > maxVisiblePages && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={getButtonClasses(false, currentPage === totalPages)}
            aria-label="Última página"
            title="Última página"
          >
            <ChevronsRight />
          </button>
        )}
      </nav>

      {/* Page information */}
      {showPageInfo && (
        <div className="text-neutral text-sm">
          Página <span className="font-medium">{currentPage}</span> de{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
      )}
    </div>
  )
}

export default Pagination
export type { PaginationProps }
