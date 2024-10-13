import { Stats, Feed } from '../components'

export const HomePage = () => {
  //Contenedor principal
  const main = document.createElement('main')
  main.classList.add('flex', 'flex-col', 'gap-3', 'lg:px-24', 'px-5', 'mb-5')

  //Estadisticas
  main.appendChild(Stats())

  //Feed
  main.appendChild(Feed())

  return main
}
