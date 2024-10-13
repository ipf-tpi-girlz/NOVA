import './style.css'
import 'material-symbols'

//Manejo de modo claro y oscuro
import { themeChange } from 'theme-change'
import { LocalStorage } from './utils/localStorage.js'

//Componentes
import { Navbar, Footer, FormLogin, FormRegisterUser } from './components'

//Paginas
import { LandingPage } from './pages/LandingPage.js'
import { RegisterPage } from './pages/RegisterPage.js'
import { HomePage } from './pages/HomePage.js'

import { createHeroSection } from './components/post'
import { ContactsPage } from './pages/contacs'
import { violence } from './pages/seccionInf/violenceInf'
import { foro } from './pages/foro.js'
import { ManosUnidas } from './pages/manosUnidas.js'
import { forop } from './components/foroPreview.js'

const app = document.getElementById('app')
const pathname = window.location.pathname
themeChange()

switch (pathname) {
  case '/':
    app.appendChild(Navbar())
    app.appendChild(LandingPage())
    app.appendChild(Footer())
    LocalStorage()
    break
  case '/register-user':
    app.appendChild(Navbar())
    app.appendChild(RegisterPage(FormRegisterUser()))
    LocalStorage()

    break
  case '/login':
    app.appendChild(Navbar())
    app.appendChild(RegisterPage(FormLogin()))
    LocalStorage()

    break
  case '/home':
    app.appendChild(Navbar())
    app.appendChild(HomePage())
    app.appendChild(Footer())
    LocalStorage()

    break

  case '/contact':
    app.appendChild(Navbar())
    app.appendChild(ContactsPage())
    app.appendChild(aboutUs())
    app.appendChild(Footer())
    break
  case '/chvg':
    app.appendChild(Navbar())
    app.appendChild(violence())
    app.appendChild(aboutUs())
    app.appendChild(Footer())
    break
  case '/foros':
    app.appendChild(Navbar())
    app.appendChild(createHeroSection())
    app.appendChild(foro())
    app.appendChild(aboutUs())
    app.appendChild(Footer())
    break
  case '/ManosUnidas':
    app.appendChild(Navbar())
    app.appendChild(ManosUnidas())
    app.appendChild(forop())
    app.appendChild(aboutUs())
    app.appendChild(Footer())
}
