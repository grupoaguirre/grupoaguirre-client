import { Card, CardContent } from '@/components'
import { ArrowRight, Calendar, Download } from 'lucide-react'
import type { LegalResource } from '../../api'
import { extractAllResourceTags } from '../../utils'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface ResourceCardProps {
  resource: LegalResource
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const isArticle = resource.tipo === 'articulo'
  const linkUrl = isArticle ? `/recursos/${resource.slug}` : resource.archivo.url
  const buttonText = isArticle ? 'Leer más' : 'Descargar'
  const ButtonIcon = isArticle ? ArrowRight : Download

  const allDisplayTags = extractAllResourceTags(resource)

  return (
    <Card hover className="group flex h-full flex-col">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={resource.imagenDestacada.url}
          alt={resource.imagenDestacada.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="from-primary/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
      </div>

      {/* Tags */}
      {allDisplayTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-6 py-2">
          {allDisplayTags.map((tagName) => (
            <span key={tagName} className="bg-primary px-3 py-1 text-xs font-medium text-white">
              {tagName}
            </span>
          ))}
        </div>
      )}

      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col space-y-3">
          {/* Title */}
          <h3 className="font-heading text-primary group-hover:text-neutral mt-2 line-clamp-2 text-base font-bold leading-tight transition-colors">
            {resource.titulo}
          </h3>

          {/* Description */}
          <p className="text-neutral line-clamp-3 flex-grow text-sm leading-relaxed">
            {resource.descripcion}
          </p>

          {/* Metadata */}
          <div className="text-neutral/80 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(resource.fechaPublicacion)}</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="pt-4">
          <a
            href={linkUrl}
            download={!isArticle}
            target={!isArticle ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="bg-primary group inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            <ButtonIcon className="h-4 w-4" />
            <span>{buttonText}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
