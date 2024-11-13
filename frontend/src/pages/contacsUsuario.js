import { profileProf } from "../api/auth.js";
import { ProfessionalCard } from "../components/ProfessionalCard";
import { Footer } from "../components/footer.js";

export const ContactsPage = async () => {
  const main = document.createElement("main");
  main.classList.add("flex", "flex-col", "gap-3", "mb-5");
  const conteiner = document.createElement("div");
  conteiner.className = "flex  gap-2";

  const interfazProfesionales = document.createElement("div");
  interfazProfesionales.className = "flex flex-grow bg-base-200 dark:bg-base-100  max-w-6xl p-5 rounded-md m-4 shadow-2xl";

  const containerProfesionales = document.createElement("div");
  containerProfesionales.className = "";

  const containertitle = document.createElement("div");
  const title = document.createElement("h1");
  title.textContent = "Profesionales";
  title.className = "break-all text-center font-bold font-serif text-2xl mb-2 m4";

  const desc = document.createElement("p");
  desc.className = " font-serif text-sm text-center";
  desc.textContent = "Si desea obtener mas informacion de un profesional, haga click sobre el.";

  containertitle.appendChild(title);
  containertitle.appendChild(desc);
  const profesional = document.createElement("div");
  profesional.className = "flex flex-col justify-content  gap-2 overflow-auto max-h-[64vh]";

  try {
    const profiles = await profileProf();
    profiles.forEach(profile => {
      const { nombre, img, perfil: { descripcion, especialidad }, id } = profile;
      const card = ProfessionalCard(nombre, descripcion, especialidad, id);
      profesional.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar perfiles:", error);
  }

  const divider = document.createElement("div");
  divider.className = "divider lg:divider-horizontal";

  containerProfesionales.appendChild(containertitle);
  containerProfesionales.appendChild(profesional);

  const previewContainer = document.createElement("div");
  previewContainer.id = "previewContainer";
  previewContainer.className = "w-full flex items-center justify-center mt-4";

  interfazProfesionales.appendChild(containerProfesionales);
  interfazProfesionales.appendChild(divider);
  interfazProfesionales.appendChild(previewContainer);
  conteiner.appendChild(interfazProfesionales);
  conteiner.appendChild(inspirationContainer());
  main.appendChild(conteiner);


  return main;
};

const inspirationContainer = () => {
  const container = document.createElement("div");
  container.className = "relative flex flex-col items-center justify-center w-full max-w-xs bg-base-100 p-5 rounded-md m-10 overflow-hidden shadow-2xl";

  // Añadir un fondo de imagen al contenedor con un filtro de brillo
  container.style.backgroundImage = "url('https://i.pinimg.com/736x/28/8f/82/288f82985709fed6986e02f7920c2877.jpg')";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";
  container.style.filter = "brightness(60%)";
  container.style.transition = "filter 0.3s ease, transform 0.3s ease";

  const textContainer = document.createElement("div");
  textContainer.className = "absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transform translate-y-10 transition-all duration-500";

  // Crear el título
  const title = document.createElement("h3");
  title.className = "text-lg font-semibold text-white text-center";
  title.textContent = "Busca ayuda de un profesional";

  // Crear la descripción
  const description = document.createElement("p");
  description.className = "text-white text-center mt-2";
  description.textContent = '"La ayuda está a un paso de ti. Tu seguridad y bienestar son lo más importante. Da el primer paso hacia una vida libre de miedo y llena de paz."';

  textContainer.appendChild(title);
  textContainer.appendChild(description);

  // Añadir el contenedor de texto al contenedor principal
  container.appendChild(textContainer);

  container.addEventListener("mouseenter", () => {
    container.style.filter = "brightness(100%)";
    container.style.transform = "scale(1.05)";

    // Mostrar el texto de forma animada
    textContainer.classList.remove("opacity-0", "translate-y-10");
    textContainer.classList.add("opacity-100", "translate-y-0");
  });

  container.addEventListener("mouseleave", () => {
    container.style.filter = "brightness(60%)";
    container.style.transform = "scale(1)";

    // Ocultar el texto de forma animada
    textContainer.classList.remove("opacity-100", "translate-y-0");
    textContainer.classList.add("opacity-0", "translate-y-10");
  });

  return container;
};



