import { specialtiesData } from './specialties'

export const practiceAreasData = {
  empresarial: {
    title: 'Derecho Empresarial',
    description:
      'Asesoría legal especializada para empresas y negocios en todas sus etapas y necesidades.',
    areas: [
      {
        id: 'laboral',
        title: 'Laboral',
        description:
          'Brindamos asesoría especializada en todas las áreas del derecho laboral, desde la contratación hasta...',
        subespecialidades: 10,
        slug: 'laboral',
      },
      {
        id: 'comercial',
        title: 'Comercial',
        description:
          'Asesoramos en todas las áreas del derecho comercial, protegiendo los intereses de nuestros clientes...',
        subespecialidades: 10,
        slug: 'comercial',
      },
      {
        id: 'societario',
        title: 'Societario',
        description:
          'Proporcionamos asesoría integral en derecho societario, desde la constitución de empresas hasta oper...',
        subespecialidades: 10,
        slug: 'societario',
      },
      {
        id: 'administrativo',
        title: 'Administrativo',
        description:
          'Especialistas en derecho administrativo y regulatorio, asesorando en la relación entre empresas y en...',
        subespecialidades: 10,
        slug: 'administrativo',
      },
      {
        id: 'regulatorio',
        title: 'Regulatorio',
        description:
          'Ofrecemos asesoría especializada en cumplimiento regulatorio y normativo para diversos sectores econ...',
        subespecialidades: 10,
        slug: 'regulatorio',
      },
      {
        id: 'propiedad-intelectual',
        title: 'Propiedad Intelectual',
        description:
          'Protegemos los activos intangibles de nuestros clientes a través de una gestión integral de la propi...',
        subespecialidades: 10,
        slug: 'propiedad-intelectual',
      },
      {
        id: 'tributario',
        title: 'Tributario',
        description:
          'Brindamos asesoría tributaria integral, ayudando a nuestros clientes a optimizar su carga fiscal den...',
        subespecialidades: 10,
        slug: 'tributario',
      },
      {
        id: 'financiero',
        title: 'Financiero',
        description:
          'Asesoramos en operaciones financieras complejas y regulación bancaria. Nuestro equipo tiene amplia e...',
        subespecialidades: 10,
        slug: 'financiero',
      },
      {
        id: 'contractual',
        title: 'Contractual',
        description:
          'Especialistas en derecho contractual, brindando asesoría en la negociación, redacción y ejecución de...',
        subespecialidades: 10,
        slug: 'contractual',
      },
      {
        id: 'cumplimiento-normativo',
        title: 'Cumplimiento Normativo',
        description:
          'Desarrollamos e implementamos programas de cumplimiento normativo adaptados a las necesidades especí...',
        subespecialidades: 10,
        slug: 'cumplimiento-normativo',
      },
      {
        id: 'inmobiliario',
        title: 'Inmobiliario',
        description:
          'Brindamos asesoría integral en derecho inmobiliario, desde transacciones simples hasta proyectos inm...',
        subespecialidades: 10,
        slug: 'inmobiliario',
      },
      {
        id: 'minero',
        title: 'Minero',
        description:
          'Especialistas en derecho minero y recursos naturales, brindando asesoría integral en todas las etapa...',
        subespecialidades: 10,
        slug: 'minero',
      },
    ],
  },
  civil: {
    title: 'Derecho Civil',
    description:
      'Soluciones legales para personas y familias en asuntos patrimoniales y personales.',
    areas: [
      {
        id: 'patrimonial',
        title: 'Patrimonial',
        description:
          'Ofrecemos asesoría integral en la protección y gestión de patrimonios personales y familiares. Nuest...',
        subespecialidades: 10,
        slug: 'patrimonial',
      },
      {
        id: 'sucesiones',
        title: 'Sucesiones y Herencia',
        description:
          'Brindamos asesoría especializada en planificación sucesoria y procesos hereditarios. Ayudamos a nues...',
        subespecialidades: 10,
        slug: 'sucesiones',
      },
      {
        id: 'propiedades',
        title: 'Propiedades',
        description:
          'Especialistas en derecho inmobiliario personal, brindando asesoría en compraventa, arrendamiento y a...',
        subespecialidades: 10,
        slug: 'propiedades',
      },
      {
        id: 'familia',
        title: 'Familia',
        description:
          'Brindamos asesoría sensible y profesional en todos los aspectos del derecho de familia. Nuestro equi...',
        subespecialidades: 10,
        slug: 'familia',
      },
    ],
  },
}

export const getSpecialtyBySlug = (slug: string) => {
  return specialtiesData[slug as keyof typeof specialtiesData] || null
}
