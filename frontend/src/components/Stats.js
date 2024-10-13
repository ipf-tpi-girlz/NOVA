export function Stats() {
  const containerStats = document.createElement('div')
  containerStats.classList.add(
    'stats',
    'stats-vertical',
    'md:stats-horizontal',
    'shadow',
    'lg:w-4/5',
    'mx-auto',
    'bg-base-200',
    'mb-3'
  )

  //Funcion para crear stats
  function createStat(icon, title, value, desc) {
    const stat = document.createElement('div')
    stat.className = 'stat '

    const statIcon = document.createElement('div')
    statIcon.className = 'stat-figure text-secondary '
    statIcon.innerHTML = `<span class = "material-symbols-rounded !text-4xl text-primary ">${icon}</span>`

    const statTitle = document.createElement('div')
    statTitle.className = 'stat-title'
    statTitle.textContent = title

    const statValue = document.createElement('div')
    statValue.className = 'stat-value'
    statValue.textContent = value

    const statDesc = document.createElement('div')
    statDesc.className = 'stat-desc'
    statDesc.textContent = desc

    stat.appendChild(statIcon)
    stat.appendChild(statTitle)
    stat.appendChild(statValue)
    stat.appendChild(statDesc)

    return stat
  }

  //Creando las stats
  const viewsStat = createStat(
    'visibility',
    'Vistas',
    '100mil',
    'en el último mes'
  )
  const usersStat = createStat(
    'person_add',
    'Nuevos usuarios',
    '5mil',
    'en el último mes'
  )
  const postStat = createStat('post_add', 'Posts', '500', 'en la última semana')

  containerStats.appendChild(viewsStat)
  containerStats.appendChild(usersStat)
  containerStats.appendChild(postStat)

  return containerStats
}
