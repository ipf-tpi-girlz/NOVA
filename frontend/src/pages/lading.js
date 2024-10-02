import bg from "../assets/galaxi.jpg";

export const landing = () => {
  const containerHero = document.createElement("div");
  containerHero.classList.add("hero", "min-h-screen");

  const container1 = document.createElement("div");
  container1.classList.add("hero-overlay");
  const container2 = document.createElement("div");
  container2.classList.add(
    "hero-content",
    "text-neutral-content",
    "text-center",
    "flex",
    "flex-col",
    "p-10"
  );
  containerHero.style.backgroundImage = `url(${bg})`;
  const div = document.createElement("div");
  div.classList.add("max-w-md");
  const titulo = document.createElement("h1");
  titulo.classList.add("mb-5", "text-5xl", "font-bold", "text-center");
  titulo.textContent = "Construimos juntos un camino hacia la curación";
  const parrafo = document.createElement("p");
  parrafo.classList.add("mb-5", "text-center");
  parrafo.textContent = "NOVA";
  const containerBtn = document.createElement("div");
  containerBtn.classList.add("flex-col");
  const buttonlog = document.createElement("btn");
  buttonlog.classList.add("btn", "btn-primary");
  buttonlog.textContent = "Iniciar sesion";
  const buttonreg = document.createElement("btn");
  buttonreg.classList.add("btn", "btn-primary");
  buttonreg.textContent = "Registrarse";

  containerBtn.appendChild(buttonlog);
  containerBtn.appendChild(buttonreg);
  container2.appendChild(titulo);
  container2.appendChild(parrafo);
  container1.appendChild(container2);
  containerHero.appendChild(container1);
  containerHero.appendChild(containerBtn);
  return containerHero;
};
