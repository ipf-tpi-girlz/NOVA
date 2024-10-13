import bg from '../assets/fon3.jpg'

export const RegisterPage = (form) => {
  // Crear contenedor principal
  const hero = document.createElement('div')
  hero.className = 'hero h-[calc(100vh-64px)]'
  hero.style.backgroundImage = `url(${bg})`

  const overlay = document.createElement('div')
  overlay.className = 'hero-overlay bg-opacity-60'

  const content = document.createElement('div')
  content.className = 'hero-content max-w-full flex flex-col lg:flex-row gap-12'

  // Crear sección izquierda con el título
  const leftSection = document.createElement('div')
  leftSection.className = 'lg:w-1/2'

  //Crear sección derecha con el formulario
  const rightSection = document.createElement('div')
  rightSection.className = 'lg:w-1/2 w-full'
  rightSection.appendChild(form)

  const h1 = document.createElement('h1')
  h1.className =
    'text-4xl lg:text-6xl font-serif text-center text-neutral-content font-semibold'
  h1.innerHTML = '"Un espacio seguro <br> para sanar, aprender y apoyar."'

  leftSection.appendChild(h1)
  hero.appendChild(overlay)
  content.appendChild(leftSection)
  content.appendChild(rightSection)
  hero.appendChild(content)

  // Retornar el contenedor principal para agregarlo al DOM en otro lugar
  return hero
}
