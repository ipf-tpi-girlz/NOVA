import { profileProf } from "../api/auth.js";
import { ProfessionalCard } from "../components/ProfessionalCard";
import { Footer } from "../components/footer.js";

export const ContactsPage = async () => {
  const main = document.createElement("main");
  main.classList.add("flex", "flex-col");

  const interfazProfesionales = document.createElement("div");
  interfazProfesionales.className = "flex bg-base-200 shadow-xl mx-12 mt-8 p-5 rounded-3xl";

  const containerProfesionales = document.createElement("div");
  containerProfesionales.className = "max-w-xl";

  const containertitle = document.createElement("div");
  containertitle.textContent = "Algunos Perfiles que te recomendamos";
  containertitle.className = "break-all text-center font-bold font-serif text-2xl mb-2";

  const profesional = document.createElement("div");
  profesional.className = "flex flex-col justify-content mb-2 gap-2 overflow-auto max-h-[64vh]";

  // Obtener perfiles desde la API
  try {
    const profiles = await profileProf();
    profiles.forEach(profile => {
      const { nombre, perfil: { descripcion, especialidad }, id } = profile;
      const card = ProfessionalCard(nombre, descripcion, especialidad, id);
      profesional.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar perfiles:", error);
  }

  containerProfesionales.appendChild(containertitle);
  containerProfesionales.appendChild(profesional);

  const previewContainer = document.createElement("div");
  previewContainer.id = "previewContainer";
  previewContainer.className = "w-full flex items-center justify-center mt-4";

  interfazProfesionales.appendChild(containerProfesionales);
  interfazProfesionales.appendChild(previewContainer); // Contenedor para mostrar detalles
  main.appendChild(interfazProfesionales);
  main.appendChild(Footer());

  return main;
};
