import bg from '../assets/pexels.jpg'

export function HeroContacts() {
  const hero = document.createElement('div')
  hero.className = 'hero h-72'
  hero.style.backgroundImage = `url(${bg})`

  const overlay = document.createElement('div')
  overlay.className = 'hero-overlay bg-opacity-60'

  const content = document.createElement('div')
  content.className = 'hero-content max-w-full flex flex-col lg:flex-row gap-12'

  const contentContainer = document.createElement('div')
  contentContainer.className = 'max-w-md'

  const title = document.createElement('h1')
  title.className = 'mb-5 text-5xl font-bold text-neutral-content'
  title.textContent = 'Centro de Ayuda'

  contentContainer.appendChild(title)
  content.appendChild(contentContainer)
  hero.appendChild(overlay)
  hero.appendChild(content)
  return hero
}
