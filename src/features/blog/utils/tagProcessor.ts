import type { BlogPost } from '../api/types'

export const extractAllTags = (post: BlogPost): string[] => {
  const tags: string[] = []

  if (post.tags?.name) {
    tags.push(post.tags.name)
  }

  if (Array.isArray(post.blogTags) && post.blogTags.length > 0) {
    post.blogTags.forEach((tag) => {
      if (tag && typeof tag === 'object' && tag.title && !tags.includes(tag.title)) {
        tags.push(tag.title)
      }
    })
  }

  return tags
}
