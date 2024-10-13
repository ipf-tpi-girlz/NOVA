import { HeroLanding, Info, Features, JoinNow } from '../components'

export const LandingPage = () => {
  const main = document.createElement('main')

  //Hero
  main.appendChild(HeroLanding())

  //Info
  main.appendChild(Info())

  //Features
  main.appendChild(Features())

  //Join Now
  main.appendChild(JoinNow())

  return main
}
