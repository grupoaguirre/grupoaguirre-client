import { LoaderCircle, AlertCircle, SearchX } from 'lucide-react'
import React from 'react'

interface StateDisplayProps<T> {
  isLoading: boolean
  error: string | null
  data: T[] | undefined
  messages?: {
    loading?: string
    empty?: string
  }
}

const StatusWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-neutral flex flex-col items-center justify-center gap-4 py-12 text-center">
    {children}
  </div>
)

export const StateDisplay = <T,>({ isLoading, error, data, messages }: StateDisplayProps<T>) => {
  if (isLoading) {
    return (
      <StatusWrapper>
        <LoaderCircle className="text-primary h-8 w-8 animate-spin" />
        <p className="text-lg">{messages?.loading || 'Cargando...'}</p>
      </StatusWrapper>
    )
  }

  if (error) {
    return (
      <StatusWrapper>
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-primary text-lg font-semibold">¡Oh, no! Algo salió mal</p>
        <p className="max-w-md">{error}</p>
      </StatusWrapper>
    )
  }

  if (!data || data.length === 0) {
    return (
      <StatusWrapper>
        <SearchX className="text-neutral h-8 w-8" />
        <p className="text-lg">{messages?.empty || 'No se encontraron resultados.'}</p>
      </StatusWrapper>
    )
  }

  return null
}

export default StateDisplay
