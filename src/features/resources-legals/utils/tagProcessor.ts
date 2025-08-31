import type { LegalResource } from '../api'

export const extractAllResourceTags = (resource: LegalResource): string[] => {
  const allTags: string[] = []

  if (resource.tags && resource.tags.name) {
    allTags.push(resource.tags.name)
  }

  if (resource.resourceTags && Array.isArray(resource.resourceTags)) {
    resource.resourceTags.forEach((tag) => {
      if (tag && typeof tag === 'object' && tag.name && !allTags.includes(tag.name)) {
        allTags.push(tag.name)
      }
    })
  }

  return allTags
}
