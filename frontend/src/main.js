import "./style.css"
import { registerInstitucion } from "./components/registerInstitucion.js";

const app = document.getElementById("app");

document.addEventListener("DOMContentLoaded", () => {
    app.innerHTML = registerInstitucion();
})