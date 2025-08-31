import type { LegalResource } from '../../../api'
import { extractAllResourceTags } from '../../../utils'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface RecentResourceCardProps {
  resource: LegalResource
}

export const RecentResourceCard = ({ resource }: RecentResourceCardProps) => {
  const linkUrl = resource.tipo === 'articulo' ? `/recursos/${resource.slug}` : resource.archivo.url

  const allDisplayTags = extractAllResourceTags(resource)

  return (
    <a
      href={linkUrl}
      target={resource.tipo === 'documento' ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="flex h-full flex-col">
        <div className="relative mb-6 h-80 w-full overflow-hidden">
          <img
            src={resource.imagenDestacada.url}
            alt={resource.imagenDestacada.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-3">
          {allDisplayTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allDisplayTags.map((tagName) => (
                <div key={tagName} className="bg-primary inline-flex self-start px-3 py-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-white">
                    {tagName}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h3 className="font-heading text-primary group-hover:text-neutral flex-grow text-lg font-bold leading-tight transition-colors">
            {resource.titulo}
          </h3>
          <div className="pt-2">
            <div className="bg-neutral/20 h-px w-full"></div>
            <div className="text-neutral pt-3 text-sm">{formatDate(resource.fechaPublicacion)}</div>
          </div>
        </div>
      </article>
    </a>
  )
}
