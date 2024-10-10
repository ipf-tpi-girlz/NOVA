import "./style.css";
import { formUser } from "../src/components/formRegisterUsuario";
import { mainRegister } from "../src/pages/mainRegister";
import { formLogin } from "./components/formLogin";
import { homePage } from "./pages/homePage";
import { navbar } from "./components/navBar";
import { footer } from "./components/footer";
import { createHeroSection } from "./components/post";
import { separador } from "./components/separador";
import { landing } from "./pages/lading";
import { contacts } from "./pages/contacs";
import { aboutUs } from "./components/problematica";
import { navbarNologin } from "./components/navbarNologin";
import { violence } from "./pages/seccionInf/violenceInf";
import { foro } from "./pages/foro.js";
import { ManosUnidas } from "./pages/manosUnidas.js";
import { forop } from "./components/foroPreview.js";
import { Articulo } from "./pages/seccionInf/hablardevg.js";

const app = document.getElementById("app");
const pathname = window.location.pathname;

switch (pathname) {
  case "/registerUser":
    app.appendChild(navbarNologin());
    app.appendChild(mainRegister(formUser));
    app.appendChild(footer());

    break;
  case "/login":
    app.appendChild(navbarNologin());
    app.appendChild(mainRegister(formLogin));
    app.appendChild(footer());
    break;
  case "/home":
    app.appendChild(navbar());
    app.appendChild(homePage());
    app.appendChild(separador());
    app.appendChild(Articulo());
    app.appendChild(aboutUs());
    app.appendChild(footer());
    break;
  case "/login":
    app.innerHTML = `<h1>login</h1>`;
    break;

  default:
    break;
  case "/":
    app.appendChild(navbarNologin());
    app.appendChild(landing());
    app.appendChild(Articulo());
    app.appendChild(aboutUs());
    app.appendChild(footer());
    break;
  case "/contact":
    app.appendChild(navbar());
    app.appendChild(contacts());
    app.appendChild(aboutUs());
    app.appendChild(footer());
    break;
  case "/chvg":
    app.appendChild(navbar());
    app.appendChild(violence());
    app.appendChild(aboutUs());
    app.appendChild(footer());
    break;
  case "/foros":
    app.appendChild(navbar());
    app.appendChild(createHeroSection());
    app.appendChild(foro());
    app.appendChild(aboutUs());
    app.appendChild(footer());
    break;
  case "/ManosUnidas":
    app.appendChild(navbar());
    app.appendChild(ManosUnidas());
    app.appendChild(forop());
    app.appendChild(aboutUs());
    app.appendChild(footer());
}
