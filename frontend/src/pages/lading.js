import bg from "../assets/fon3.jpg";

export const landing = () => {
  const containerHero = document.createElement("div");
  containerHero.classList.add("hero", "min-h-screen", "justify-center");

  const container1 = document.createElement("div");
  container1.classList.add("hero-overlay");
  const container2 = document.createElement("div");
  container2.classList.add(
    "text-neutral-content",
    "text-center",
    "flex",
    "flex-col",
    "p-28"
  );
  containerHero.style.backgroundImage = `url(${bg})`;
  const div = document.createElement("div");
  div.classList.add("max-w-md");
  const titulo = document.createElement("h1");
  titulo.classList.add(
    "mb-5",
    "text-8xl",
    "font-bold",
    "text-center",
    "font-serif",
    "p-0"
  );
  titulo.textContent = "Un espacio para todos, una lucha en común.";
  const parrafo = document.createElement("p");
  parrafo.classList.add("mb-5", "text-center");
  parrafo.textContent = "SOMOS NOVA";
  const containerBtn = document.createElement("div");
  containerBtn.classList.add("flex", "gap-6", "p-28", "items-end", "mt-60");
  const buttonlog = document.createElement("btn");
  buttonlog.classList.add("btn", "btn-primary", "gap-5");
  buttonlog.textContent = "Iniciar sesion";
  const buttonreg = document.createElement("btn");
  buttonreg.classList.add("btn", "btn-primary", "gap-5");
  buttonreg.textContent = "Registrarse";
  //!//////

  //   const containerAboutUs = document.createElement("div");
  //   containerAboutUs.classList.add("hero-content", "flex-col", "lg:flex-row");
  //   const containerA = document.createElement("div");
  //   containerA.classList.add("flex-col", "self-center", "lg:self-start");
  //   const subtitulo = document.createElement("h6");
  //   subtitulo.textContent = "Nuestra Solución";
  //   const titleAbout = document.createElement("h1");
  //   titleAbout.classList.add("font-bold");
  //   titleAbout.textContent =
  //     "Estamos utilizando la tecnología para hacer que la curación impulsada por la comunidad sea accesible para todos los sobrevivientes.";

  //   const containerB = document.createElement("div");
  //   containerB.classList.add("flex", "flex-row");

  //   const containera = document.createElement("div");
  //   containera.classList.add("flex", "flex-col");
  //   const parafo = document.createElement("p");
  //   parafo.textContent =
  //     "Proporcionar un puerto seguro para que los supervivientes compartan experiencias";
  //   containera.appendChild(parafo);
  //   containerB.appendChild(containera);

  //   const containerb = document.createElement("div");
  //   containerb.classList.add("flex", "flex-col");
  //   const paraffo = document.createElement("p");
  //   paraffo.textContent =
  //     "Proporcionar un puerto seguro para que los supervivientes compartan experiencias";

  //   containerb.appendChild(paraffo);
  //   containerB.appendChild(containerb);

  //   const containerB2 = document.createElement("div");

  //   const containerc = document.createElement("div");
  //   containerc.classList.add("flex", "flex-col");
  //   const parafoo = document.createElement("p");
  //   parafoo.textContent =
  //     "Proporcionar un puerto seguro para que los supervivientes compartan experiencias";

  //   containerc.appendChild(parafoo);
  //   containerB2.appendChild(containerc);

  //   const containerd = document.createElement("div");
  //   containerd.classList.add("flex", "flex-col");
  //   const paarafo = document.createElement("p");
  //   paarafo.textContent =
  //     "Proporcionar un puerto seguro para que los supervivientes compartan experiencias";
  //   const containerbe = document.createElement("div");
  //   containerbe.classList.add("flex-col", "self-center", "lg:self-start");

  //   containerbe.appendChild(containerB);
  //   containerbe.appendChild(containerB2);

  //   containerd.appendChild(paarafo);
  //   containerB2.appendChild(containerd);

  //   containerA.appendChild(subtitulo);
  //   containerA.appendChild(titleAbout);
  //   containerAboutUs.appendChild(containerA);
  //   containerAboutUs.appendChild(containerbe);

  containerBtn.appendChild(buttonlog);
  containerBtn.appendChild(buttonreg);
  container2.appendChild(parrafo);
  container2.appendChild(titulo);
  container1.appendChild(container2);
  containerHero.appendChild(container1);
  containerHero.appendChild(containerBtn);
  //   containerHero.appendChild(containerAboutUs);
  return containerHero;
};
