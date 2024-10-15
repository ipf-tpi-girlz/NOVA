import bg from "../assets/fon3.jpg";

export function HeroLanding() {
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
    "lg:text-8xl",
    "md:text-7xl",
    "sm:text-6xl",
    "text-5xl",
    "font-bold",
    "text-center",
    "font-serif",
    "p-0",
    "select-none"
  );
  titulo.textContent = "Un espacio para todos, una lucha en común.";

  const parrafo = document.createElement("p");
  parrafo.classList.add("mb-5", "text-center", "text-3xl", "select-none");
  parrafo.textContent = "SOMOS ";
  const nova = document.createElement("span");
  nova.classList.add("font-serif", "font-bold");
  nova.textContent = "NOVA";
  parrafo.appendChild(nova);

  const containerBtn = document.createElement("div");
  containerBtn.classList.add("flex", "gap-6", "justify-center", "lg:mt-10");
  const buttonlog = document.createElement("btn");
  buttonlog.classList.add(
    "btn",
    "btn-lg",
    "btn-primary",
    "gap-5",
    "text-xl",
    "text-base"
  );
  buttonlog.textContent = "Iniciar Sesión";
  buttonlog.type = "submit";
  buttonlog.setAttribute("href", "/login");

  buttonlog.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/login";
  });

  const buttonreg = document.createElement("btn");
  buttonreg.classList.add("btn", "btn-lg", "btn-primary", "gap-5", "text-xl");
  buttonreg.textContent = "Registrarse";
  buttonreg.type = "submit";
  buttonreg.setAttribute("href", "/register-user");

  buttonreg.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/registerUser";
  });

  containerBtn.appendChild(buttonlog);
  containerBtn.appendChild(buttonreg);

  container2.appendChild(parrafo);
  container2.appendChild(titulo);
  container2.appendChild(containerBtn);
  container1.appendChild(container2);
  containerHero.appendChild(container1);

  return containerHero;
}
