export const aboutUs = () => {
  const containerAboutUs = document.createElement("div");
  containerAboutUs.classList.add(
    "hero-content",
    "flex-col",
    "lg:flex-row",
    "p-24",
    "gap-40"
  );
  const containerA = document.createElement("div");
  containerA.classList.add("flex-col", "self-center", "lg:self-center");
  const subbtitulo = document.createElement("h6");
  subbtitulo.textContent = "Nuestra Solución";
  const titleAbout = document.createElement("h1");
  titleAbout.classList.add("font-bold", "w-80", "text-2xl");
  titleAbout.textContent =
    "Estamos utilizando la tecnología para amplificar las voces de las víctimas de violencia de género, brindando una plataforma virtual donde la comunidad puede compartir, sanar y apoyar, asegurando que el apoyo emocional y la ayuda estén al alcance de todas las sobrevivientes.";
  const containerB = document.createElement("div");
  containerB.classList.add("flex", "gap-20", "p-8", "mr-20");

  const containerB1 = document.createElement("div");
  containerB1.classList.add("flex", "flex-col", "gap-2");
  const seccion1 = document.createElement("div");
  seccion1.textContent =
    "🤍 Proporcionando un ambiente seguro para que los supervivientes compartan experiencias";
  const seccion2 = document.createElement("div");
  seccion2.textContent =
    "🤍 Ofrecemos interacciones con expertos para que los sobrevivientes aprendan y crezcan en su proceso de sanación.";
  const containerB2 = document.createElement("div");
  containerB2.classList.add("flex", "flex-col", "gap-2");
  const seccion3 = document.createElement("div");
  seccion3.textContent =
    "🤍 Brindamos recursos informativos para ayudar a reconocer, abordar y apoyar en casos de violencia de género.";
  const seccion4 = document.createElement("div");
  seccion4.textContent =
    "🤍 Empoderamos a cada sobreviviente de violencia  para que encuentre su propio camino hacia la sanación y el bienestar emocional.";

  containerA.appendChild(subbtitulo);
  containerA.appendChild(titleAbout);

  containerB1.appendChild(seccion1);
  containerB1.appendChild(seccion2);
  containerB2.appendChild(seccion3);
  containerB2.appendChild(seccion4);

  containerB.appendChild(containerB1);
  containerB.appendChild(containerB2);
  containerAboutUs.appendChild(containerA);
  containerAboutUs.appendChild(containerB);
  return containerAboutUs;
};
