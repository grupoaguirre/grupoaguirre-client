import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { testimonials } from './data'

const LegalResources = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const totalSlides = testimonials.length
  const maxVisible = 2

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + maxVisible >= totalSlides ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.max(0, totalSlides - maxVisible) : prev - 1))
  }

  const progressPercentage = ((currentSlide + maxVisible) / totalSlides) * 100

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="bg-primary mb-6 inline-flex items-center px-4 py-2">
              <span className="text-sm font-medium uppercase tracking-wide text-white">
                RECURSOS LEGALES
              </span>
            </div>
            <h2 className="font-heading text-primary mb-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Descubre nuestros recursos legales
            </h2>
            <p className="text-neutral text-base leading-relaxed">
              Aquí encontrarás recursos legales desde documentos de contratos hasta guías de manejo
              de contenido legal.
            </p>
          </div>
          <div className="flex items-end justify-end">
            <a
              href="#"
              className="bg-primary group flex items-center gap-2 px-4 py-2 text-white transition-colors hover:opacity-80"
            >
              <span className="font-medium">Ver más recursos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-8">
          <div className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
            <div
              className="flex px-4 transition-transform duration-500 ease-in-out sm:px-6 lg:px-8"
              style={{ transform: `translateX(-${currentSlide * (100 / maxVisible)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-5/12 flex-shrink-0 px-3">
                  <div className="bg-neutral/10 group flex min-h-[600px] flex-col p-6">
                    <div className="relative mb-4 h-64 w-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between space-y-3">
                      <h3 className="text-primary text-lg font-medium leading-tight">
                        {testimonial.title}
                      </h3>

                      <p className="text-neutral text-sm leading-relaxed">
                        {testimonial.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-primary text-sm font-medium">Resultados Obtenidos</h4>
                        {testimonial.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="bg-primary mt-1.5 h-2 w-2 flex-shrink-0 rounded-full"></div>
                            <p className="text-neutral text-xs leading-relaxed">{outcome}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button className="bg-primary flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-colors hover:opacity-90">
                          Leer más
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation and Progress */}
        <div className="mt-8 flex items-center justify-between">
          <div className="mr-8 flex-1">
            <div className="bg-neutral/20 h-1.5 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-neutral mt-2 text-sm">
              Caso {currentSlide + 1} de {totalSlides}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="border-neutral/20 hover:bg-neutral/5 focus:ring-primary flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={currentSlide === 0}
              aria-label="Caso anterior"
            >
              <svg
                className="text-primary h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Siguiente caso"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegalResources
