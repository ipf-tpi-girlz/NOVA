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
  FormRegisterProf,
  BtnEmergency,
  PostsFeed,
} from "./components";

// Páginas
import { LandingPage } from "./pages/LandingPage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import { HomePage } from "./pages/homePageUsuarios.js";
import { createHeroSection } from "./components/post";
import { ContactsPage } from "./pages/contacsUsuario.js";
import { ManosUnidas } from "./pages/manosUnidas.js";
import { forop } from "./components/foroPreview.js";
import { Perfil } from "./pages/profileUser.js";
import { checkSession } from "./api/auth.js";

import { artFisco } from "./pages/seccionInf/artFisico.js";
import { artPsico } from "./pages/seccionInf/artPsico.js";
import { artAbuso } from "./pages/seccionInf/artAbuso.js";
import { articulos } from "./pages/seccionInf/seccionArticulos.js";
import { Contactanos } from "./components/contactanosBtn.js";
import { Nosotros } from "./pages/Nosotros.js";
import { menuProfesional } from "./pages/barraProf.js";
import { menuComunidad } from "./pages/barraGrupo.js";
import { postPrev } from "./pages/contenPost.js";
import { getComunidades } from "./pages/comunidadesGeneal.js";
import { menuProfesionall } from "./pages/contenedorGeneral.js";

// Rutas públicas
const publicRoutes = ["/", "/register-user", "/login", "/register-prof"];

document.addEventListener("DOMContentLoaded", async () => {
  try {
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

    const renderPage = async () => {
      const navbar = await Navbar();
      app.appendChild(navbar);

      switch (pathname) {
        case "/":
          app.appendChild(LandingPage());
          app.appendChild(Footer());
          break;
        case "/register-user":
          app.appendChild(RegisterPage(FormRegisterUser()));
          app.appendChild(Footer());
          break;
        case "/register-prof":
          app.appendChild(RegisterPage(FormRegisterProf()));
          appendChild(Footer());
          break;
        case "/login":
          app.appendChild(RegisterPage(FormLogin()));
          break;
        case "/home":
          app.appendChild(HomePage());
          app.appendChild(Footer());
          break;
        case "/contact":
          const contactsPage = await ContactsPage();
          app.appendChild(contactsPage);
          app.appendChild(BtnEmergency());
          break;
        case "/historias":
          app.appendChild(createHeroSection());
          app.appendChild(BtnEmergency());
          app.appendChild(Footer());
          break;
        case "/foros":
          app.appendChild(Footer());
          break;
        case "/manos-unidas":
          app.appendChild(ManosUnidas());
          app.appendChild(forop());
          app.appendChild(BtnEmergency());
          app.appendChild(Footer());
          break;
        case "/profile":
          app.appendChild(Perfil());
          app.appendChild(Footer());
          break;
        case "/articulos":
          app.appendChild(articulos());
          app.appendChild(Footer());
          break;
        case "/articulo-fisica":
          app.appendChild(artFisco());
          app.appendChild(Footer());
          break;
        case "/articulo-psicologico":
          app.appendChild(artPsico());
          app.appendChild(Footer());
          break;
        case "/articulo-abuso":
          app.appendChild(artAbuso());
          app.appendChild(Footer());
          break;
        case "/register-prof":
          app.appendChild(FormRegisterProf());
          app.appendChild(Footer());
          break;
        case "/Nosotros":
          app.appendChild(Nosotros());
          app.appendChild(BtnEmergency());
          app.appendChild(Contactanos());
          app.appendChild(Footer());
          break;
        case "/menu-prof":
          app.appendChild(menuProfesional());
          app.appendChild(Footer());
          break;
        case "/comunidades-general":
          // app.appendChild(menuProfesional());
          app.appendChild(getComunidades());
          break;
        case "/prueba":
          app.appendChild(menuProfesionall());
          app.appendChild(Footer());
          break;
      }

      if (pathname.startsWith("/post/")) {
        app.appendChild(postPrev());
      }

      // if (pathname.startsWith("/menu-comunidad/")) {
      //   app.appendChild(menuComunidad());
      //   app.appendChild(Footer());
      // }

      LocalStorage();
    };

    await renderPage();
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
