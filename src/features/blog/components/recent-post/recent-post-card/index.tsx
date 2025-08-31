import type { BlogPost } from '@/features'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface RecentPostCardProps {
  post: BlogPost
}

export const RecentPostCard = ({ post }: RecentPostCardProps) => {
  const allDisplayTags: string[] = []

  if (post.tags && post.tags.name) {
    allDisplayTags.push(post.tags.name)
  }

  if (post.blogTags && Array.isArray(post.blogTags) && post.blogTags.length > 0) {
    post.blogTags.forEach((tag) => {
      if (tag && tag.title && !allDisplayTags.includes(tag.title)) {
        allDisplayTags.push(tag.title)
      }
    })
  }

  return (
    <a href={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col">
        {/* Image */}
        <div className="relative mb-6 h-80 w-full overflow-hidden">
          <img
            src={post.image?.url}
            alt={post.image?.alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col space-y-3">
          {allDisplayTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allDisplayTags.map((tagName) => (
                <div key={tagName} className="inline-flex self-start bg-black px-3 py-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-white">
                    {tagName}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading group-hover:text-neutral/80 flex-grow text-lg font-bold leading-tight text-white transition-colors">
            {post.title}
          </h3>

          {/* Metadata & Separator */}
          <div className="pt-2">
            <div className="h-px w-full bg-gray-700"></div>
            <div className="pt-3 text-sm text-gray-400">{formatDate(post.publishedDate)}</div>
          </div>
        </div>
      </article>
    </a>
  )
}
