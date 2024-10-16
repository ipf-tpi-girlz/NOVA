import "./style.css";
import "material-symbols";

//Manejo de modo claro y oscuro
import { themeChange } from "theme-change";
import { LocalStorage } from "./utils/localStorage.js";

//Componentes
import {
  Navbar,
  Footer,
  FormLogin,
  FormRegisterUser,
  BtnEmergency,
} from "./components";

//Paginas
import { LandingPage } from "./pages/LandingPage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import { HomePage } from "./pages/homePage.js";

import { createHeroSection } from "./components/post";
import { ContactsPage } from "./pages/contacs";
import { violence } from "./pages/seccionInf/violenceInf";
import { ManosUnidas } from "./pages/manosUnidas.js";
import { forop } from "./components/foroPreview.js";

const app = document.getElementById("app");
const pathname = window.location.pathname;
themeChange();

switch (pathname) {
  case "/":
    app.appendChild(Navbar());
    app.appendChild(LandingPage());
    app.appendChild(Footer());
    LocalStorage();
    break;
  case "/register-user":
    app.appendChild(Navbar());
    app.appendChild(RegisterPage(FormRegisterUser()));
    LocalStorage();

    break;
  case "/login":
    app.appendChild(Navbar());
    app.appendChild(RegisterPage(FormLogin()));
    LocalStorage();

    break;
  case "/home":
    app.appendChild(Navbar());
    app.appendChild(HomePage());
    app.appendChild(Footer());
    LocalStorage();

    break;

  case "/contact":
    app.appendChild(Navbar());
    app.appendChild(ContactsPage());
    app.appendChild(BtnEmergency());
    app.appendChild(Footer());
    break;
  case "/chvg":
    app.appendChild(Navbar());
    app.appendChild(violence());
    app.appendChild(BtnEmergency());
    app.appendChild(Footer());
    break;
  case "/foros":
    app.appendChild(Navbar());
    app.appendChild(createHeroSection());
    app.appendChild(BtnEmergency());
    app.appendChild(Footer());
    break;
  case "/manos-unidas":
    app.appendChild(Navbar());
    app.appendChild(ManosUnidas());
    app.appendChild(forop());
    app.appendChild(BtnEmergency());
    app.appendChild(Footer());
}
