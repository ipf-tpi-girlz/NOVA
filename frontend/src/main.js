import "./style.css";
import { formUser } from "../src/components/formRegisterUsuario";
import { mainRegister } from "../src/pages/mainRegister";
import { formLogin } from "./components/formLogin";

const app = document.getElementById("app");
const pathname = window.location.pathname;

switch (pathname) {
  case "/registerUser":
    app.appendChild(mainRegister(formUser));

    break;
  case "/login":
    app.appendChild(mainRegister(formLogin));
    break;
  //   case "/tasks":
  //     $index.appendChild(await listTasks());
  //     break;
}
