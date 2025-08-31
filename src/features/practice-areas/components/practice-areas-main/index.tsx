import { useState } from 'react'
import PracticeAreasHeader from '../practice-areas-header'
import PracticeAreasCards from '../practice-areas-cards'

const PracticeAreasMain = () => {
  const [selectedCategory, setSelectedCategory] = useState<'empresarial' | 'civil'>('empresarial')

  return (
    <>
      <PracticeAreasHeader
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <PracticeAreasCards selectedCategory={selectedCategory} />
    </>
  )
}

export default PracticeAreasMain
