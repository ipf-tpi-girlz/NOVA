import "./style.css";
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
import { foro } from "./pages/foro";


const app = document.getElementById("app");
const pathname = window.location.pathname;

switch (pathname) {
  case "/home":
    app.appendChild(navbar());
    app.appendChild(homePage());
    app.appendChild(separador());
    app.appendChild(createHeroSection());
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
    app.appendChild(footer());
    break;
  case "/contact":
    app.appendChild(navbar());
    app.appendChild(contacts());
    app.appendChild(footer());
    break;
    case "/chvg":
    app.appendChild(navbar());
    app.appendChild(violence());
    app.appendChild(footer())
    break;
    case "/foros":
    app.appendChild(navbar());
    app.appendChild(createHeroSection());
    app.appendChild(foro())
  app.appendChild(footer())
}
