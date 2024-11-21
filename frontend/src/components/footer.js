export const Footer = () => {
  // Crear el contenedor del footer
  const footerContainer = document.createElement("div");
  footerContainer.className = "flex flex-row mt-8 shadow";
  const footer = document.createElement("footer");
  footer.classList.add(
    "footer",
    "bg-base-200",
    "bg-cover",
    "shadow-xs",
    "text-base-content",
    "p-5",
    "shadow",
    "border-base-300",
    "border-t"
  );

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
  footer2.className =
    "flex justify-center w-96 items-center bg-base-200 text-base-content border-base-300 shadow border-t px-5 py-2";

  const aside = document.createElement("aside");
  aside.classList.add(
    "flex",
    "flex-col",

    "items-center",
    "text-center"
  );
  aside.innerHTML = `
    <p class = "font-serif font-bold text-3xl ">NOVA</p><p class="font-serif font-extralight">Funcionando desde 2024</p>
  `;

  footer2.appendChild(aside);

  // Agregar los dos footers al documento (puedes cambiar "body" por un contenedor específico si lo necesitas)

  footerContainer.appendChild(footer2);
  footerContainer.appendChild(footer);

  return footerContainer;
};

// Función para crear un nav genérico con rutas
function createNav(title, items) {
  const nav = document.createElement("nav");
  const h6 = document.createElement("h6");
  h6.classList.add("footer-title");
  h6.textContent = title;
  nav.appendChild(h6);

  items.forEach((item) => {
    const a = document.createElement("a");
    a.classList.add("link", "link-hover");
    a.textContent = item.name;
    a.href = item.route; // Asignar la ruta al link
    nav.appendChild(a);
  });

  return nav;
}
