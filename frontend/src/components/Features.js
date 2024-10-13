export const Features = () => {
  const features = document.createElement('div')
  features.classList.add(
    'w-4/5',
    'flex',
    'flex-col',
    'lg:flex-row',
    'gap-6',
    'mx-auto',
    'p-8',
    'text-lg',
    'text-center',
    'mb-10'
  )
  features.id = 'features'

  // Funcion para crear secciones
  const createSection = (icon, text) => {
    const section = document.createElement('div')
    section.classList.add(
      'flex',
      'flex-col',
      'items-center',
      'bg-base-200',
      'shadow-md',
      'rounded-sm',
      'p-4'
    )
    const sectionIcon = document.createElement('span')
    sectionIcon.classList.add(
      'material-symbols-rounded',
      '!text-5xl',
      'mb-3',
      'dark:text-pink-200'
    )
    sectionIcon.textContent = icon

    const sectionText = document.createElement('p')
    sectionText.textContent = text

    section.appendChild(sectionIcon)
    section.appendChild(sectionText)
    return section
  }

  // Secciones con íconos y texto
  const seccion1 = createSection(
    'volunteer_activism',
    'Proporcionando un ambiente seguro para que los supervivientes compartan experiencias'
  )
  const seccion2 = createSection(
    'clinical_notes',
    'Ofrecemos interacciones con expertos para que los sobrevivientes aprendan y crezcan en su proceso de sanación'
  )
  const seccion3 = createSection(
    'library_books',
    'Brindamos recursos informativos para ayudar a reconocer, abordar y apoyar en casos de violencia de género'
  )
  const seccion4 = createSection(
    'diversity_1',
    'Empoderamos a cada sobreviviente de violencia para que encuentre su propio camino hacia la sanación y el bienestar emocional'
  )

  // Añadir todas las secciones
  features.appendChild(seccion1)
  features.appendChild(seccion2)
  features.appendChild(seccion3)
  features.appendChild(seccion4)

  return features
}
