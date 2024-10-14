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
  //creacion de boton inicio de sesion
  const buttonlog = document.createElement("btn");
  buttonlog.classList.add("btn", "btn-primary", "gap-5");
  buttonlog.textContent = "Iniciar sesion";
  buttonlog.setAttribute("href", "/login");
  buttonlog.type = "submit";

  buttonlog.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/login";
  });

  const buttonreg = document.createElement("btn");
  buttonreg.classList.add("btn", "btn-primary", "gap-5");
  buttonreg.textContent = "Registrarse";
  buttonreg.type = "submit";
  buttonreg.setAttribute("href", "/registerUser");

  buttonreg.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/registerUser";
  });

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
