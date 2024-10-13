export function LocalStorage() {
  // Theme Controller
  const themeButton = document.querySelector('#theme-button')

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
    themeButton.checked = savedTheme === 'dark'
  }

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'valentine' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    themeButton.checked = newTheme === 'dark'
  })
}
