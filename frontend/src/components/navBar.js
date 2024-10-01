import { $themeLabel } from "./themeButton";
export const navbar = () => {
  // Crear el elemento principal del navbar
  const navbar = document.createElement("div");
  navbar.classList.add("navbar", "bg-base-100");

  // Crear el contenedor flex-none para el botón de hamburguesa
  const flexNoneLeft = document.createElement("div");
  flexNoneLeft.classList.add("flex-none");

  // Crear el botón de hamburguesa
  const buttonHamburger = document.createElement("button");
  buttonHamburger.classList.add("btn", "btn-square", "btn-ghost");

  // Crear el icono SVG dentro del botón de hamburguesa
  const svgHamburger = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgHamburger.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgHamburger.setAttribute("fill", "none");
  svgHamburger.setAttribute("viewBox", "0 0 24 24");
  svgHamburger.classList.add("inline-block", "h-5", "w-5", "stroke-current");

  // Crear el path del SVG
  const pathHamburger = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathHamburger.setAttribute("stroke-linecap", "round");
  pathHamburger.setAttribute("stroke-linejoin", "round");
  pathHamburger.setAttribute("stroke-width", "2");
  pathHamburger.setAttribute("d", "M4 6h16M4 12h16M4 18h16");

  // Añadir el path al SVG
  svgHamburger.appendChild(pathHamburger);

  // Añadir el SVG al botón
  buttonHamburger.appendChild(svgHamburger);

  // Añadir el botón de hamburguesa al contenedor
  flexNoneLeft.appendChild(buttonHamburger);

  // Crear el contenedor flex-1 para el título
  const flexOne = document.createElement("div");
  flexOne.classList.add("flex-1");

  // Crear el enlace para el título
  const titleLink = document.createElement("a");
  titleLink.classList.add("btn", "btn-ghost", "text-xl");
  titleLink.textContent = "daisyUI";

  // Añadir el enlace al contenedor flex-1
  flexOne.appendChild(titleLink);

  // Crear el contenedor flex-none para el botón de opciones
  const flexNoneRight = document.createElement("div");
  flexNoneRight.classList.add("flex-none");

  // Crear el botón de opciones
  const buttonOptions = document.createElement("button");
  buttonOptions.classList.add("btn", "btn-square", "btn-ghost");

  // Crear el icono SVG dentro del botón de opciones
  const svgOptions = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgOptions.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgOptions.setAttribute("fill", "none");
  svgOptions.setAttribute("viewBox", "0 0 24 24");
  svgOptions.classList.add("inline-block", "h-5", "w-5", "stroke-current");

  // Crear el path del SVG
  const pathOptions = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathOptions.setAttribute("stroke-linecap", "round");
  pathOptions.setAttribute("stroke-linejoin", "round");
  pathOptions.setAttribute("stroke-width", "2");
  pathOptions.setAttribute(
    "d",
    "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
  );

  // Añadir el path al SVG
  svgOptions.appendChild(pathOptions);

  // Añadir el SVG al botón
  buttonOptions.appendChild(svgOptions);

  // Añadir el botón de opciones al contenedor
  flexNoneRight.appendChild($themeLabel());

  // Añadir todos los elementos al navbar principal
  navbar.appendChild(flexNoneLeft);
  navbar.appendChild(flexOne);
  navbar.appendChild(flexNoneRight);

  return navbar;
};
