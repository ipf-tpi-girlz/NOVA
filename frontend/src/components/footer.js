export const footer = () => {
  // Crear el contenedor del footer
  const footer = document.createElement("footer");
  footer.classList.add("footer", "footer-center", "bg-base-300", "text-base-content", "p-4");

  // Crear el contenedor aside
  const aside = document.createElement("aside");

  // Crear el párrafo con el texto dinámico de la fecha
  const paragraph = document.createElement("p");
  const currentYear = new Date().getFullYear();
  paragraph.textContent = `Copyright © ${currentYear} - All right reserved by NOVA-IPF`;

  // Añadir el párrafo al aside
  aside.appendChild(paragraph);

  // Añadir el aside al footer
  footer.appendChild(aside);

  return footer;
}

