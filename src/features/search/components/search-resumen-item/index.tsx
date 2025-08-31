import { Card } from '@/components/ui/card'
import type { SearchResultItem } from '../../api'
  
interface SearchResultItemProps {
  item: SearchResultItem
}

const typeToLabelMap: Record<SearchResultItem['type'], string> = {
  areas: 'Área de Práctica',
  blog: 'Artículo de Blog',
  recursos: 'Recurso Legal',
}

export const SearchResultItemCard = ({ item }: SearchResultItemProps) => {
  const label = typeToLabelMap[item.type] || 'Contenido'

  return (
    <a href={item.url} className="block text-left no-underline">
      <Card
        variant="ghost"
        padding="md"
        hover={true}
        className="hover:!border-primary/20 hover:bg-neutral/10 !scale-100 !border-0"
      >
        <span className="bg-primary/80 mb-2 inline-block px-3 py-1 text-xs font-semibold text-white">
          {label}
        </span>
        <h4 className="font-heading text-primary text-base font-semibold">{item.title}</h4>
        <p className="text-neutral mt-1 text-sm">{item.excerpt}</p>
      </Card>
    </a>
  )
}

export default SearchResultItemCard
