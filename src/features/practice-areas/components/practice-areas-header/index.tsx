interface PracticeAreasHeaderProps {
  selectedCategory: 'empresarial' | 'civil'
  onCategoryChange: (category: 'empresarial' | 'civil') => void
}

const PracticeAreasHeader = ({ selectedCategory, onCategoryChange }: PracticeAreasHeaderProps) => {
  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="bg-neutral/5 inline-flex p-1">
            <button
              onClick={() => onCategoryChange('empresarial')}
              className={`px-8 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                selectedCategory === 'empresarial'
                  ? 'bg-primary focus:ring-primary text-white'
                  : 'text-primary hover:text-neutral focus:ring-neutral'
              }`}
            >
              Derecho Empresarial
            </button>
            <div className="bg-neutral/20 w-px"></div>
            <button
              onClick={() => onCategoryChange('civil')}
              className={`px-8 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                selectedCategory === 'civil'
                  ? 'bg-primary focus:ring-primary text-white'
                  : 'text-primary hover:text-neutral focus:ring-neutral'
              }`}
            >
              Derecho Civil
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PracticeAreasHeader
