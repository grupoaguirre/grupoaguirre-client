interface SpecialtyHeroProps {
  title: string
  subtitle: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
}

const SpecialtyHero = ({
  title,
  subtitle,
  backgroundImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  ctaText = 'Solicitar asesoría',
  ctaLink = '/contacto',
}: SpecialtyHeroProps) => {
  return (
    <section className="from-primary to-primary-dark relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-r">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50"></div>
        <img
          src={backgroundImage}
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-3xl text-left text-white">
          <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={ctaLink}
              className="text-primary bg-white px-6 py-3 font-medium transition-colors hover:opacity-80"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialtyHero
