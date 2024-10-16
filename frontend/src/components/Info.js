export const Info = () => {
  const info = document.createElement("div");
  info.classList.add("p-8", "mx-auto", "bg-base-100");

  const containerInf = document.createElement("div");
  containerInf.classList.add(
    "hero-content",
    "flex-col",
    "lg:flex-row",
    "gap-8",
    "mx-auto"
  );

  const container3 = document.createElement("div");
  container3.classList.add("flex-col", "self-center");

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/15543046/pexels-photo-15543046/free-photo-of-marketing-creativo-respeto-respetar.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"; // Use the URL of the image
  img.classList.add("max-w-full", "h-auto", "rounded-lg", "shadow-xl");
  img.setAttribute("href", "/chvg");
  const tituloInf = document.createElement("h1");
  tituloInf.classList.add(
    "text-5xl",
    "font-bold",
    "px-10",
    "text-center",
    "lg:text-start",
    "font-serif"
  );
  tituloInf.textContent = "¿Que ofrecemos?";

  const parrafo = document.createElement("p");
  parrafo.classList.add(
    "py-6",
    "p-10",
    "font-semibold",
    "text-center",
    "lg:text-start",
    "text-xl"
  );
  parrafo.textContent =
    "Estamos utilizando la tecnología para amplificar las voces de las víctimas de violencia de género, brindando una plataforma virtual donde la comunidad puede compartir, sanar y apoyar, asegurando que el apoyo emocional y la ayuda estén al alcance de todas las sobrevivientes.";

  container3.appendChild(tituloInf);
  container3.appendChild(parrafo);
  containerInf.appendChild(img);
  containerInf.appendChild(container3);
  info.appendChild(containerInf);

  return info;
};
