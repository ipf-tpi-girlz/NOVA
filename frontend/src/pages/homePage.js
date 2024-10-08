export const homePage = () => {
  const containerHome = document.createElement("div");
  containerHome.classList.add("bg-base", "flex-grow", "min-h-screen");

  const titulo = document.createElement("h1");
  titulo.innerText = "NOVA";
  titulo.classList.add(
    "text-5xl",
    "font-bold",
    "text-center",
    "font-serif",
    "p-10",
    "bg-base-200"
  );
  const subtitulo = document.createElement("h4");
  subtitulo.innerText = "Novas blog";
  subtitulo.classList.add("font-serif", "text-center", "bg-base-200", "pb-5");

  const informacion = document.createElement("div");
  informacion.classList.add("hero", "bg-base", "p-8");

  const containerinf = document.createElement("div");
  containerinf.classList.add("hero-content", "flex-col", "lg:flex-row");
  const container2 = document.createElement("div");
  container2.classList.add("flex-col");
  const container3 = document.createElement("div");
  container3.classList.add("flex-col", "self-center", "lg:self-start");

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600"; // Use the URL of the image
  img.classList.add("max-w-max", "h-96", "rounded-lg", "shadow-2xl");
  img.setAttribute("href", "/chvg");
  const tituloinf = document.createElement("h1");
  tituloinf.classList.add(
    "text-2xl",
    "font-bold",
    "px-10",
    "text-center",
    "lg:text-start"
  );
  tituloinf.textContent = "¿Como hablar de la violencia de genero?";
  const info = document.createElement("a");
  info.classList.add("link", "px-10");
  info.textContent = "Mas informacion";
  info.setAttribute("href", "/chvg");
  const parrafo = document.createElement("p");
  parrafo.classList.add("py-6", "p-10", "text-center", "lg:text-start");
  parrafo.textContent =
    "Abordar la violencia de género es un acto de responsabilidad social que exige sensibilidad y precisión. Al hablar del tema, es crucial usar un lenguaje claro y respetuoso, evitando culpabilizar a las víctimas o justificar el abuso .Es importante describir las diferentes formas de violencia (física, psicológica, sexual, económica y simbólica) y explicar que, aunque afecta principalmente a mujeres, cualquier persona puede sufrirla.                       “La violencia de género no va sólo en una modalidad puede normalizarse tanto que no nos damos cuenta que la estamos padeciendo, y es mucho más complicado en un noviazgo; nunca es tarde para romper ese círculo de agresión”";

  containerHome.appendChild(titulo);
  containerHome.appendChild(subtitulo);
  container2.appendChild(img);
  container3.appendChild(tituloinf);
  container3.appendChild(parrafo);
  container3.appendChild(info);
  containerinf.appendChild(container2);
  containerinf.appendChild(container3);
  informacion.appendChild(containerinf);
  containerHome.appendChild(informacion);

  return containerHome;
};
