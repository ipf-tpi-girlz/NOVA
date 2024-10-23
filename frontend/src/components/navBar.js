import { notification } from "antd"; // Importa la función de notificación
import { $themeLabel } from "./themeButton";
import { logoutUser } from "../api/auth.js"; // Asegúrate de que esta ruta sea la correcta

export const navbar = () => {
  // Crear el elemento principal del navbar
  const navbar = document.createElement("div");
  navbar.classList.add("navbar", "bg-base-100", "gap-6", "sticky", "top-0");

  // Crear el contenedor flex-1 para el título
  const flexOne = document.createElement("div");
  flexOne.classList.add("flex-1");

  // Crear el enlace para el título
  const titleLink = document.createElement("a");
  titleLink.classList.add("btn", "btn-ghost", "text-xl", "font-serif");
  titleLink.textContent = "NOVA";
  titleLink.setAttribute("href", "/home");

  const secciones = document.createElement("div");
  secciones.classList.add("flex", "justify-evenly", "gap-8");

  const forosseccion = document.createElement("a");
  forosseccion.classList.add("text-base");
  forosseccion.setAttribute("href", "/foros");
  forosseccion.textContent = "Foros";

  const contactseccion = document.createElement("a");
  contactseccion.classList.add("text-base");
  contactseccion.textContent = "Contactos";
  contactseccion.setAttribute("href", "/contact");

  const infseccion = document.createElement("a");
  infseccion.classList.add("text-base");
  infseccion.textContent = "Informacion";
  infseccion.setAttribute("href", "/chvg");

  const aboutUs = document.createElement("a");
  aboutUs.classList.add("text-base");
  aboutUs.textContent = "AboutUs";
  aboutUs.setAttribute("href", "#");

  secciones.appendChild(forosseccion);
  secciones.appendChild(contactseccion);
  secciones.appendChild(infseccion);
  secciones.appendChild(aboutUs);

  const btnlogout = document.createElement("button");
  btnlogout.classList.add("btn", "btn-primary", "btn-sm");
  btnlogout.textContent = "Logout";
  btnlogout.type = "button"; // Cambié a "button" para evitar el comportamiento de envío del formulario

  btnlogout.addEventListener("click", async () => {
    try {
      const response = await logoutUser();
      console.log(response); // Verifica la respuesta en la consola
      if (response && response.success) {
        notification.success({
          message: 'Cierre de sesión',
          description: 'Sesión cerrada exitosamente.',
          placement: 'topRight',
          duration: 2,
        });
        setTimeout(() => {
          window.location.href = "/login"; // Asegúrate de que esta ruta sea correcta
        }, 2000);
      } else {
        notification.error({
          message: 'Error',
          description: response?.message || 'Error al cerrar sesión. Por favor, intenta de nuevo.',
          placement: 'topRight',
        });
      }
    } catch (error) {
      console.error("Error del servidor:", error);
      notification.error({
        message: 'Error',
        description: 'Hubo un problema al cerrar sesión.',
        placement: 'topRight',
      });
    }
  });


  // Añadir el enlace al contenedor flex-1
  flexOne.appendChild(titleLink);

  // Crear el contenedor flex-none para el botón de opciones
  const flexNoneRight = document.createElement("div");
  flexNoneRight.classList.add("flex-none", "gap-4");

  // Crear el botón de opciones
  const buttonOptions = document.createElement("button");
  buttonOptions.classList.add("btn", "btn-square", "btn-ghost");
  flexNoneRight.appendChild(btnlogout);

  // Crear el icono SVG dentro del botón de opciones
  const svgOptions = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgOptions.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgOptions.setAttribute("fill", "none");
  svgOptions.setAttribute("viewBox", "0 0 24 24");
  svgOptions.classList.add("inline-block", "h-5", "w-5", "stroke-current");

  // Crear el path del SVG
  const pathOptions = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathOptions.setAttribute("stroke-linecap", "round");
  pathOptions.setAttribute("stroke-linejoin", "round");
  pathOptions.setAttribute("stroke-width", "2");
  pathOptions.setAttribute("d", "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z");

  // Añadir el path al SVG
  svgOptions.appendChild(pathOptions);

  // Añadir el SVG al botón
  buttonOptions.appendChild(svgOptions);

  // Añadir el botón de opciones al contenedor
  flexNoneRight.appendChild($themeLabel());

  // Añadir todos los elementos al navbar principal
  navbar.appendChild(flexOne);
  navbar.appendChild(secciones);
  navbar.appendChild(flexNoneRight);

  return navbar;
};