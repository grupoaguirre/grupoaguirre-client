import React from 'react'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Users,
  FileText,
  Shield,
  Lightbulb,
  Calculator,
  CreditCard,
  FileCheck,
  Scale,
  Home,
  Mountain,
  PiggyBank,
  Heart,
  Key,
} from 'lucide-react'
import { practiceAreasData } from '../../data'

interface PracticeAreasCardsProps {
  selectedCategory: 'empresarial' | 'civil'
}

const PracticeAreasCards = ({ selectedCategory }: PracticeAreasCardsProps) => {
  const categoryData = practiceAreasData[selectedCategory]

  if (!categoryData) return null

  const getAreaIcon = (areaId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      laboral: <Users className="h-6 w-6 text-white" />,
      comercial: <Building2 className="h-6 w-6 text-white" />,
      societario: <Briefcase className="h-6 w-6 text-white" />,
      administrativo: <FileText className="h-6 w-6 text-white" />,
      regulatorio: <Shield className="h-6 w-6 text-white" />,
      'propiedad-intelectual': <Lightbulb className="h-6 w-6 text-white" />,
      tributario: <Calculator className="h-6 w-6 text-white" />,
      financiero: <CreditCard className="h-6 w-6 text-white" />,
      contractual: <FileCheck className="h-6 w-6 text-white" />,
      'cumplimiento-normativo': <Scale className="h-6 w-6 text-white" />,
      inmobiliario: <Home className="h-6 w-6 text-white" />,
      minero: <Mountain className="h-6 w-6 text-white" />,
      patrimonial: <PiggyBank className="h-6 w-6 text-white" />,
      sucesiones: <Key className="h-6 w-6 text-white" />,
      propiedades: <Home className="h-6 w-6 text-white" />,
      familia: <Heart className="h-6 w-6 text-white" />,
    }
    return iconMap[areaId] || <FileText className="h-6 w-6 text-white" />
  }

  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-8 text-center">
          <h3 className="font-heading text-primary mb-3 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            {categoryData.title}
          </h3>
          <p className="text-neutral mx-auto max-w-3xl text-lg leading-relaxed">
            {categoryData.description}
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.areas.map((area) => (
            <div
              key={area.id}
              className="bg-neutral/5 hover:bg-neutral/10 group p-6 transition-colors"
            >
              <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center">
                {getAreaIcon(area.id)}
              </div>
              <h4 className="font-heading text-primary group-hover:text-neutral mb-3 text-xl font-bold leading-tight transition-colors">
                {area.title}
              </h4>
              <p className="text-neutral mb-4 text-sm leading-relaxed">{area.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary text-sm font-medium">
                  {area.subespecialidades} subespecialidades
                </span>
                <a
                  href={`/areas/${area.slug}`}
                  className="text-primary group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-90"
                >
                  <span>Ver más</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PracticeAreasCards
