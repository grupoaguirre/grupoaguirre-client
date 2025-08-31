import { Card, CardContent } from '@/components'
import { ArrowRight, Calendar, User } from 'lucide-react'
import type { BlogPost } from '../../api'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface BlogPostCardProps {
  post: BlogPost
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const allTags = []
  if (post.tags && post.tags.name) {
    allTags.push({ name: post.tags.name, isPrimary: true })
  }
  if (post.blogTags && post.blogTags.length > 0) {
    post.blogTags.forEach((tag) => allTags.push({ name: tag.title, isPrimary: false }))
  }

  return (
    <a href={`/blog/${post.slug}`} className="group block h-full text-left no-underline">
      <Card hover className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={post.image?.url}
            alt={post.image?.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="from-primary/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-6 py-2">
            {allTags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-medium ${
                  tag.isPrimary ? 'bg-primary text-white' : 'bg-neutral/10 text-primary'
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <CardContent className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col space-y-3">
            <h3 className="font-heading text-primary group-hover:text-neutral mt-2 line-clamp-2 text-base font-bold leading-tight transition-colors">
              {post.title}
            </h3>

            <p className="text-neutral line-clamp-3 flex-grow text-sm leading-relaxed">
              {post.excerpt}
            </p>

            <div className="text-neutral/80 flex items-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                <span>{post.author.nombre}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-primary group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
              <span>Leer más</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
