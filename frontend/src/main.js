import "./style.css";
import { homePage } from "./pages/homePage";
import { navbar } from "./components/navBar";
import { footer } from "./components/footer";

const app = document.getElementById("app");
const pathname = window.location.pathname;

switch (pathname) {
  case "/home":
    app.appendChild(navbar());
    app.appendChild(homePage());
    app.appendChild(footer());
    break;
  case "/login":
    app.innerHTML = `<h1>login</h1>`;
    break;

  default:
    break;
}
