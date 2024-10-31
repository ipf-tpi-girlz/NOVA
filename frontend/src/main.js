import "./style.css";
import "material-symbols";

// Manejo de modo claro y oscuro
import { themeChange } from "theme-change";
import { LocalStorage } from "./utils/localStorage.js";

// Componentes
import {
  Navbar,
  Footer,
  FormLogin,
  FormRegisterUser,
  BtnEmergency,
} from "./components";

// Páginas
import { LandingPage } from "./pages/LandingPage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import { HomePage } from "./pages/homePageUsuarios.js";
import { createHeroSection } from "./components/post";
import { ContactsPage } from "./pages/contacsUsuario.js";
import { violence } from "./pages/seccionInf/violenceInf";
import { ManosUnidas } from "./pages/manosUnidas.js";
import { forop } from "./components/foroPreview.js";
import { Perfil } from './pages/profileUser.js';
import { checkSession } from "./api/auth.js";
import { formContacts } from "./pages/form.contacts.js"

// Rutas públicas
const publicRoutes = ["/", "/register-user", "/login"];

document.addEventListener("DOMContentLoaded", async () => {
  const isAuthenticated = await checkSession();
  const pathname = window.location.pathname;

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    window.location.href = "/login";
    return;
  }

  if (isAuthenticated && publicRoutes.includes(pathname)) {
    window.location.href = "/home";
    return;
  }


  const app = document.getElementById("app");
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
      app.appendChild(Footer());
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
      break;
    case "/chvg":
      app.appendChild(Navbar());
      app.appendChild(violence());
      app.appendChild(BtnEmergency());
      app.appendChild(Footer());
      break;
    case "/historias":
      app.appendChild(Navbar());
      app.appendChild(createHeroSection());
      app.appendChild(BtnEmergency());
      app.appendChild(Footer());
      break;
    case "/foros":
      app.appendChild(Navbar());
      app.appendChild(Footer());
      break;
    case "/manos-unidas":
      app.appendChild(Navbar());
      app.appendChild(ManosUnidas());
      app.appendChild(forop());
      app.appendChild(BtnEmergency());
      app.appendChild(Footer());
      break;
    case "/profile":
      app.appendChild(Navbar());
      app.appendChild(Perfil());
      app.appendChild(Footer());
      break;
    case "/contactanos":
      app.appendChild(Navbar());
      app.appendChild(formContacts());
      app.appendChild(Footer());
      break;
  }
});
