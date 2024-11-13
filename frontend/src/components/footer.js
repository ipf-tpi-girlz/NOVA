export const Footer = () => {
  // Crear el contenedor del footer
  const footerContainer = document.createElement("div");
  const footer = document.createElement("footer");
  footer.classList.add("footer", "bg-base-400", "bg-cover", "shadow-xs", "text-base-content", "p-5", "border-base-300", "border-t");

  // Crear el primer <nav> (Servicios)
  const nav1 = createNav("Servicios", [
    { name: "Comunidades", route: "/comunidades" },
    { name: "Historias", route: "/historias" },
    { name: "Articulos", route: "/articulos" },
    { name: "Profesionales", route: "/profesionales" },
  ]);

  // Crear el segundo <nav> (Compañia)
  const nav2 = createNav("Compañia", [
    { name: "Sobre Nosotros", route: "/sobre-nosotros" },
  ]);

  // Crear el tercer <nav> (Legal)
  const nav3 = createNav("Legal", [
    { name: "Términos de uso", route: "/terminos" },
    { name: "Política de privacidad", route: "/privacidad" },
  ]);

  // Añadir los tres <nav> al footer
  footer.appendChild(nav1);
  footer.appendChild(nav2);
  footer.appendChild(nav3);

  const footer2 = document.createElement("footer");
  footer2.classList.add("footer", "bg-base-400", "bg-cover", "text-base-content", "border-base-300", "border-t", "px-5", "py-2");

  const aside = document.createElement("aside");
  aside.classList.add("grid-flow-col", "items-center");
  aside.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="fill-current">
      <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
    <p>NOVA<br />Funcionando desde 2024</p>
  `;

  footer2.appendChild(aside);

  // Agregar los dos footers al documento (puedes cambiar "body" por un contenedor específico si lo necesitas)

  footerContainer.appendChild(footer);
  footerContainer.appendChild(footer2);

  return footerContainer

};

// Función para crear un nav genérico con rutas
function createNav(title, items) {
  const nav = document.createElement("nav");
  const h6 = document.createElement("h6");
  h6.classList.add("footer-title");
  h6.textContent = title;
  nav.appendChild(h6);

  items.forEach(item => {
    const a = document.createElement("a");
    a.classList.add("link", "link-hover");
    a.textContent = item.name;
    a.href = item.route; // Asignar la ruta al link
    nav.appendChild(a);
  });

  return nav;
}
