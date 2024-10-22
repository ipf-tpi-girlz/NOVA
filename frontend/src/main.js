import "./style.css";
import { formUser } from "./components/formRegisterUsuario.js";
import { mainRegister } from "../src/pages/mainRegister";
import { formLogin } from "./components/formLogin";
import { homePage } from "./pages/homePage";
import { navbar } from "./components/navBar";
import { footer } from "./components/footer";
import { createHeroSection } from "./components/post";
import { landing } from "./pages/lading";
import { contacts } from "./pages/contacs";
import { navbarNologin } from "./components/navbarNologin";
import { violence } from "./pages/seccionInf/violenceInf";
import { foro } from "./pages/foro.js";
import { ManosUnidas } from "./pages/manosUnidas.js";
import { forop } from "./components/foroPreview.js";
import { Perfil } from "./pages/perfil.js";

// Función para obtener una cookie por su nombre
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById("app");
  const pathname = window.location.pathname;

  // Función para verificar la autenticación
  const isAuthenticated = () => {
    return !!getCookie('authToken'); // Verifica si existe la cookie authToken
  };

  // Función para manejar rutas públicas
  const publicRoute = (children) => {
    app.appendChild(navbarNologin());
    app.appendChild(children);
    app.appendChild(footer());
  };

  // Función para manejar rutas privadas
  const privateRoute = (children) => {
    if (isAuthenticated()) {
      app.appendChild(navbar());
      app.appendChild(children);
      app.appendChild(footer());
    } else {
      window.location.href = '/login';
    }
  };

  switch (pathname) {
    case "/registerUser":
      publicRoute(mainRegister(formUser));
      break;
    case "/login":
      publicRoute(mainRegister(formLogin));
      break;
    case "/home":
      privateRoute(homePage());
      break;
    case "/":
      publicRoute(landing());
      break;
    case "/contact":
      privateRoute(contacts());
      break;
    case "/chvg":
      privateRoute(violence());
      break;
    case "/foros":
      privateRoute(createHeroSection());
      privateRoute(foro());
      break;
    case "/ManosUnidas":
      privateRoute(ManosUnidas());
      privateRoute(forop());
      break;
    case "/profile":
      privateRoute(Perfil());
      break;
    default:
      console.log("Ruta no encontrada");
      break;
  }
});
