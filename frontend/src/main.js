import "./style.css";
import { homePage } from "./pages/homePage";
import { navbar } from "./components/navBar";
import { footer } from "./components/footer";
import { createHeroSection } from "./components/post";
import { separador } from "./components/separador";
import { landing } from "./pages/lading";

const app = document.getElementById("app");
const pathname = window.location.pathname;

switch (pathname) {
  case "/home":
    app.appendChild(navbar());
    app.appendChild(homePage());
    app.appendChild(separador());
    app.appendChild(createHeroSection());
    app.appendChild(footer());
    break;
  case "/login":
    app.innerHTML = `<h1>login</h1>`;
    break;

  default:
    break;
  case "/landing":
    app.appendChild(navbar());
    app.appendChild(landing());
    app.appendChild(footer());
    break;
  case "/contact":
    app.appendChild(navbar());
    app.appendChild(footer());
}
