import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

interface SpecialtySlidingSidebarProps {
  currentSlug: string
}

const SpecialtySlidingSidebar = ({ currentSlug }: SpecialtySlidingSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)

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

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSpecialtyClick = (slug: string) => {
    if (slug !== currentSlug) {
      window.location.href = `/areas/${slug}`
    }
  }

  return (
    <>
      {/* Mobile Sidebar Button */}
      <section className="bg-white py-8 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsOpen(true)}
            className="border-neutral/20 bg-neutral/5 hover:bg-neutral/10 flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors"
            aria-label="Abrir menú de especialidades"
          >
            <div>
              <h3 className="font-heading text-primary mb-1 text-lg font-semibold">
                Otras especialidades
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                Explora nuestras otras áreas de especialización legal
              </p>
            </div>
            <svg
              className="text-primary h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </section>

      {isOpen && <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={handleClose} />}

      <div
        className={`fixed right-0 top-0 z-50 h-full w-3/4 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="bg-primary flex items-center justify-between p-6">
            <h3 className="font-heading text-lg font-semibold text-white">Especialidades</h3>
            <button
              onClick={handleClose}
              className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80"
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <p className="text-neutral text-sm leading-relaxed">
                  Explora nuestras otras áreas de especialización legal
                </p>
              </div>

              {/* Derecho Empresarial */}
              <div>
                <h4 className="font-heading text-primary mb-3 text-base font-semibold">
                  Derecho Empresarial
                </h4>
                <div className="space-y-2">
                  {empresarialSpecialties.map((specialty) => (
                    <button
                      key={specialty.slug}
                      onClick={() => handleSpecialtyClick(specialty.slug)}
                      className={`group flex w-full items-center justify-between gap-2 p-2 text-left transition-colors ${
                        currentSlug === specialty.slug
                          ? 'bg-primary text-white'
                          : 'text-neutral hover:bg-neutral/10 hover:text-primary'
                      }`}
                    >
                      <span className="text-sm">{specialty.title}</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Derecho Civil */}
              <div>
                <h4 className="font-heading text-primary mb-3 text-base font-semibold">
                  Derecho Civil
                </h4>
                <div className="space-y-2">
                  {civilSpecialties.map((specialty) => (
                    <button
                      key={specialty.slug}
                      onClick={() => handleSpecialtyClick(specialty.slug)}
                      className={`group flex w-full items-center justify-between gap-2 p-2 text-left transition-colors ${
                        currentSlug === specialty.slug
                          ? 'bg-primary text-white'
                          : 'text-neutral hover:bg-neutral/10 hover:text-primary'
                      }`}
                    >
                      <span className="text-sm">{specialty.title}</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpecialtySlidingSidebar
