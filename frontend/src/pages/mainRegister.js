import bg from "../assets/fon3.jpg";
export const mainRegister = (form) => {
  // Crear contenedor principal
  const container = document.createElement("div");
  container.className =
    "flex flex-row justify-between w-screen px-10 items-center max-h-screen";
  container.style.backgroundImage = `url(${bg})`;
  // Crear sección izquierda con el título
  const leftSection = document.createElement("div");
  leftSection.className = " w-1/2 flex justify-center items-center h-screen";

  const h1 = document.createElement("h1");
  h1.className = "anton_regular text-5xl text-white tracking-wide font-serif";
  h1.innerHTML = '"Un espacio seguro <br> para sanar, aprender y apoyar."';

  leftSection.appendChild(h1);
  container.appendChild(leftSection);
  container.appendChild(form());
  // Retornar el contenedor principal para agregarlo al DOM en otro lugar
  return container;
};
