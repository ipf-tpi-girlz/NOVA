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
import { formContacts } from "./pages/form.contacts.js";
import { artFisco } from "./pages/seccionInf/artFisico.js";
import { artPsico } from "./pages/seccionInf/artPsico.js";
import { artAbuso } from "./pages/seccionInf/artAbuso.js";
import { articulos } from "./pages/seccionInf/seccionArticulos.js";
import { Contactanos } from "./components/contactanosBtn.js";
import { Nosotros } from "./pages/Nosotros.js";

// Rutas públicas
const publicRoutes = ["/", "/register-user", "/login", "/registrar-profesional"];

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
        case "/contactanos":
          app.appendChild(formContacts());
          app.appendChild(Footer());
          break;
        case "/articulos":
          ;
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
        case "/registrar-profesional":
          app.appendChild(FormRegisterProf());
          break;
        case "/art":
          app.appendChild(articulos());
          app.appendChild(Footer());
          break;
      }

      LocalStorage();
    };

    await renderPage();

  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
  }
});
