import "./style.css"
import { formInstitucion } from "./components/registerInstitucion.js"; 

const params = window.location.pathname;

const $index = document.getElementById("app");


switch (params) {
  case "/registerInst":
    $index.appendChild( formInstitucion());
    break;
//   case "/login":
//     $index.appendChild(await Pagelogin());
//     break;
//   case "/tasks":
//     $index.appendChild(await listTasks());
//     break;

  default:
    break;
}