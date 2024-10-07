// export { mainRegister } from "";

export const register = async () => {
  // Crear elementos principales
  const container = document.createElement("div");
  container.className =
    "container p-4 bg-cover flex justify-end bg-[url('/fon3.jpg')] min-w-full";

  // Crear sección izquierda con el título
  const leftSection = document.createElement("div");
  leftSection.className = "flex justify-center items-center h-screen";
  container.appendChild(leftSection);

  const h1 = document.createElement("h1");
  h1.className = "anton_regular text-5xl text-white tracking-wide";
  h1.innerHTML = '"Un espacio seguro <br> para sanar, aprender y apoyar."';
  leftSection.appendChild(h1);
};
