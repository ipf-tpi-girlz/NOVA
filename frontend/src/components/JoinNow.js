export function JoinNow() {
  const joinNow = document.createElement('div')
  joinNow.classList.add(
    'w-2/3',
    'flex',
    'flex-col',
    'mx-auto',
    'p-8',
    'text-lg',
    'text-center',
    'content-center',
    'mb-10',
    'gap-10',
    'bg-base-100'
  )

  const joinNowText = document.createElement('h1')
  joinNowText.innerText =
    'Regístrate y encuentra apoyo en un entorno seguro y empático.'
  joinNowText.classList.add('text-5xl', 'font-serif', 'font-bold')

  const joinNowButton = document.createElement('button')
  joinNowButton.classList.add(
    'btn',
    'btn-lg',
    'btn-primary',
    'w-56',
    'mx-auto',
    'text-xl'
  )
  joinNowButton.textContent = 'Únete ahora'

  joinNow.appendChild(joinNowText)
  joinNow.appendChild(joinNowButton)

  return joinNow
}
