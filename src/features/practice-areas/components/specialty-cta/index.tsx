interface SpecialtyCTAProps {
  specialtyName: string
  ctaText?: string
  buttonText?: string
  buttonLink?: string
}

const SpecialtyCTA = ({
  specialtyName,
  ctaText,
  buttonText = 'Agendar consulta',
  buttonLink = '/contacto',
}: SpecialtyCTAProps) => {
  const defaultCtaText = `Agenda una evaluación gratuita de tu caso en ${specialtyName}`
  const defaultDescription = `Discute tu situación con un abogado experimentado. Obtén orientación clara sobre tus derechos y opciones—sin costo, sin compromiso.`

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-primary relative overflow-hidden p-8 lg:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-32 translate-x-32 transform rounded-full bg-gradient-to-bl from-white/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-16 translate-y-16 transform rounded-full bg-gradient-to-tl from-white/10 to-transparent"></div>
          </div>

          <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-white">
                <div className="bg-primary flex h-8 w-8 items-center justify-center">
                  <div className="h-4 w-4 bg-white"></div>
                </div>
              </div>

              <div className="text-white">
                <h2 className="font-heading mb-2 text-2xl font-bold leading-tight lg:text-3xl">
                  {ctaText || defaultCtaText}
                </h2>
                <p className="text-base leading-relaxed text-white/90">{defaultDescription}</p>
              </div>
            </div>

            <a
              href={buttonLink}
              className="text-primary flex items-center bg-white px-6 py-3 font-medium transition-colors hover:opacity-80"
            >
              {buttonText}
              <span className="ml-2"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialtyCTA
