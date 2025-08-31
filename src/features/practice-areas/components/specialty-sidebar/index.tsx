import { ArrowRight } from 'lucide-react'

interface SpecialtySidebarProps {
  currentSlug: string
}

const SpecialtySidebar = ({ currentSlug }: SpecialtySidebarProps) => {
  const specialties = [
    { slug: 'laboral', title: 'Derecho Laboral', category: 'Empresarial' },
    { slug: 'comercial', title: 'Derecho Comercial', category: 'Empresarial' },
    { slug: 'societario', title: 'Derecho Societario', category: 'Empresarial' },
    { slug: 'administrativo', title: 'Derecho Administrativo', category: 'Empresarial' },
    { slug: 'regulatorio', title: 'Derecho Regulatorio', category: 'Empresarial' },
    { slug: 'propiedad-intelectual', title: 'Propiedad Intelectual', category: 'Empresarial' },
    { slug: 'tributario', title: 'Derecho Tributario', category: 'Empresarial' },
    { slug: 'financiero', title: 'Derecho Financiero', category: 'Empresarial' },
    { slug: 'contractual', title: 'Derecho Contractual', category: 'Empresarial' },
    { slug: 'cumplimiento-normativo', title: 'Cumplimiento Normativo', category: 'Empresarial' },
    { slug: 'inmobiliario', title: 'Derecho Inmobiliario', category: 'Empresarial' },
    { slug: 'minero', title: 'Derecho Minero', category: 'Empresarial' },
    { slug: 'patrimonial', title: 'Derecho Patrimonial', category: 'Civil' },
    { slug: 'sucesiones', title: 'Derecho de Sucesiones', category: 'Civil' },
    { slug: 'propiedades', title: 'Derecho de Propiedades', category: 'Civil' },
    { slug: 'familia', title: 'Derecho de Familia', category: 'Civil' },
  ]

  const empresarialSpecialties = specialties.filter((s) => s.category === 'Empresarial')
  const civilSpecialties = specialties.filter((s) => s.category === 'Civil')

  return (
    <aside className="bg-neutral/5 w-full">
      <div className="space-y-6 p-4">
        {/* Header */}
        <div>
          <h3 className="font-heading text-primary mb-4 text-left text-lg font-semibold uppercase">
            Otras especialidades
          </h3>
          <p className="text-neutral text-sm leading-relaxed">
            Explora nuestras otras áreas de especialización legal
          </p>
        </div>

        {/* Derecho Empresarial */}
        <div>
          <h4 className="font-heading text-primary mb-3 font-semibold">Derecho Empresarial</h4>
          <div className="space-y-2">
            {empresarialSpecialties.map((specialty) => (
              <a
                key={specialty.slug}
                href={`/areas/${specialty.slug}`}
                className={`group flex items-center justify-between gap-2 p-2 transition-colors ${
                  currentSlug === specialty.slug
                    ? 'bg-primary text-white'
                    : 'text-neutral hover:bg-neutral/10 hover:text-primary'
                }`}
              >
                <span className="text-sm">{specialty.title}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>

        {/* Derecho Civil */}
        <div>
          <h4 className="font-heading text-primary mb-3 text-base font-semibold">Derecho Civil</h4>
          <div className="space-y-2">
            {civilSpecialties.map((specialty) => (
              <a
                key={specialty.slug}
                href={`/areas/${specialty.slug}`}
                className={`group flex items-center justify-between gap-2 p-2 transition-colors ${
                  currentSlug === specialty.slug
                    ? 'bg-primary text-white'
                    : 'text-neutral hover:bg-neutral/10 hover:text-primary'
                }`}
              >
                <span className="text-sm">{specialty.title}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SpecialtySidebar
