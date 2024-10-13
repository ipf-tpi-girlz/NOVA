export function ForumCard(img, title, desc) {
  const card = document.createElement('div')
  card.className =
    'card bg-base-100 image-full lg:w-96 w-72 shadow-xl bg-cover '

  const cardFigure = document.createElement('figure')

  // Imagen de la tarjeta
  const cardImg = document.createElement('img')
  cardImg.src = img
  cardImg.alt = 'Manos Unidas'

  cardFigure.appendChild(cardImg)

  // Contenido de la tarjeta
  const cardBody = document.createElement('div')
  cardBody.className = 'card-body'

  const cardTitle = document.createElement('h2')
  cardTitle.className = 'card-title'
  cardTitle.textContent = title

  const cardDesc = document.createElement('p')
  cardDesc.textContent = desc

  // Botón de la tarjeta
  const cardAction = document.createElement('div')
  cardAction.className = 'card-actions justify-end'

  const cardBtn = document.createElement('button')
  cardBtn.className = 'btn btn-primary'
  cardBtn.textContent = 'Unirse a foro'
  cardBtn.setAttribute = ('href', '/ManosUnidas')

  cardAction.appendChild(cardBtn)

  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cardDesc)
  cardBody.appendChild(cardAction)

  card.appendChild(cardFigure)
  card.appendChild(cardBody)

  return card
}
