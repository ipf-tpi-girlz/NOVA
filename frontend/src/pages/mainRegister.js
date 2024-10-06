import { formUser } from "../components/formRegisterUsuario";

export const mainRegister = () => {
  // Crear contenedor principal
  const container = document.createElement("div");
  container.className =
    "flex flex-row justify-between w-screen px-10 items-center";

  // Crear sección izquierda con el título
  const leftSection = document.createElement("div");
  leftSection.className = " w-1/2 flex justify-center items-center h-screen";

  const h1 = document.createElement("h1");
  h1.className = "anton_regular text-5xl text-white tracking-wide";
  h1.innerHTML = '"Un espacio seguro <br> para sanar, aprender y apoyar."';
  leftSection.appendChild(h1);
  container.appendChild(leftSection);
  container.appendChild(formUser());
  // Retornar el contenedor principal para agregarlo al DOM en otro lugar
  return container;
};
