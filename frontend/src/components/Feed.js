import manosunidas from '../assets/manosunidas.png'
import { ForumCard, ArticleCard, PostsFeed } from './index'

export function Feed() {
  //Contenedor del feed
  const containerFeed = document.createElement('div')
  containerFeed.className = 'flex flex-col md:flex-row gap-6'

  //Divisor
  const divider = document.createElement('div')
  divider.className = 'divider m-0'

  //Contenedor de los posts
  const containerPost = document.createElement('div')
  containerPost.classList.add(
    'flex',
    'flex-col',
    'gap-3',
    'items-center',
    'lg:items-start'
  )
  //Titulo
  const postsTitle = document.createElement('h1')
  postsTitle.className = 'text-lg font-semibold'
  postsTitle.textContent = 'Últimos posts'

  containerPost.appendChild(postsTitle)
  containerPost.appendChild(divider.cloneNode(true))
  containerPost.appendChild(PostsFeed())

  //Contenedor de los foros
  const containerForums = document.createElement('div')
  containerForums.classList.add(
    'flex',
    'flex-col',
    'gap-3',
    'items-center',
    'lg:items-start'
  )
  //Titulo
  const forumstTitle = document.createElement('h1')
  forumstTitle.className = 'text-lg font-semibold'
  forumstTitle.textContent = 'Foros Populares'

  containerForums.appendChild(forumstTitle)
  containerForums.appendChild(divider)

  //Contenedor de los articulos
  const containerArticulo = document.createElement('div')
  containerArticulo.classList.add(
    'flex',
    'flex-col',
    'gap-3',
    'items-center',
    'lg:items-start'
  )
  //Titulo
  const articlesTitle = document.createElement('h1')
  articlesTitle.className = 'text-lg font-semibold'
  articlesTitle.textContent = 'Últimos artículos'

  containerArticulo.appendChild(articlesTitle)
  containerArticulo.appendChild(divider.cloneNode(true))

  //Foros
  const newForum1 = ForumCard(
    manosunidas,
    'Manos Unidas',
    'Somos una comunidad en busca de la sanacion al trauma, un espacio para poder expresarte e interactuar con otros que han pasado lo mismo.'
  )
  const newForum2 = ForumCard(
    'https://media.istockphoto.com/id/857146092/es/foto/mar-de-manos.jpg?s=612x612&w=0&k=20&c=7iUAtDTLL8MpCqDJXDHo8E8ZySoZqGoSTjdNJs9HXj8=',
    'Otro foro',
    'Somos una comunidad en busca de la sanacion al trauma, un espacio para poder expresarte e interactuar con otros que han pasado lo mismo.'
  )

  containerForums.appendChild(newForum1)
  containerForums.appendChild(newForum2)

  //Articulos
  const newArticle1 = ArticleCard(
    'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Articulo 1',
    'Descripcion'
  )
  const newArticle2 = ArticleCard(
    'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Articulo 2',
    'Descripcion'
  )
  containerArticulo.appendChild(newArticle1)
  containerArticulo.appendChild(newArticle2)

  containerFeed.appendChild(containerForums)
  containerFeed.appendChild(containerPost)
  containerFeed.appendChild(containerArticulo)

  return containerFeed
}
