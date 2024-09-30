import "./src/style.css";
import { homePage } from "./src/pages/homePage.js";

const app = document.getElementById("app");
const pathname = window.location.pathname;
switch (pathname) {
  case "/home":
    app.appendChild(homePage());
    break;
  case "/login":
    app.innerHTML = `<h1>login</h1>`;
    break;

  default:
    break;
}
