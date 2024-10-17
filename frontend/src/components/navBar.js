import { $themeLabel } from "./themeButton";
import { isAuthenticated } from "../api/auth";

export const Navbar = () => {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar", "md:px-24", "bg-base-100");

  const navbarStart = document.createElement("div");
  navbarStart.classList.add("navbar-start", "w-fit");

  const navbarEnd = document.createElement("div");
  navbarEnd.classList.add("navbar-end", "gap-3", "w-full");

  //Logo
  const logo = document.createElement("a");
  logo.classList.add("btn", "btn-ghost", "text-2xl", "font-serif");
  logo.textContent = "NOVA";
  logo.setAttribute("href", "/home");

  navbarStart.appendChild(logo);

  //Dropdown para pantallas pequeñas
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown", "dropdown-end");

  // Dropdown boton
  const dropdownButton = document.createElement("label");
  dropdownButton.classList.add("btn", "btn-ghost", "lg:hidden");
  dropdownButton.setAttribute("role", "button");
  dropdownButton.setAttribute("tabindex", "0");
  dropdownButton.innerHTML = `<span class = "material-symbols-rounded dark:text-pink-200">menu</span>`;

  // Dropdown contenido
  const dropdownContent = document.createElement("ul");
  dropdownContent.classList.add(
    "menu",
    "menu-compact",
    "dropdown-content",
    "mt-3",
    "p-2",
    "shadow",
    "bg-base-100",
    "rounded-box",
    "z-[1]",
    "w-52",
    "gap-2"
  );

  // Menu para pantallas grandes
  const menu = document.createElement("ul");
  menu.classList.add(
    "menu",
    "menu-md",
    "menu-horizontal",
    "px-1",
    "font-semibold",
    "text-lg",
    "hidden",
    "lg:flex",
    "gap-2"
  );

  // Valida si el usuario inició sesión
  if (isAuthenticated()) {
    //Funcion para crear link para el menu
    function createLink(link, text) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", link);
      a.textContent = text;

      li.appendChild(a);

      return li;
    }

    const forums = createLink("/foros", "Foros");
    const articles = createLink("/chvg", "Artículos");
    const prof = createLink("/contact", "Profesionales");

    //Boton de cerrar sesión
    const btnLogOut = document.createElement("button");
    btnLogOut.classList.add("btn", "btn-primary", "btn-sm");
    btnLogOut.textContent = "Cerrar Sesión";
    btnLogOut.type = "submit";
    btnLogOut.setAttribute = ("href", "/");
    btnLogOut.addEventListener("click", () => {
      window.location.href = "http://localhost:5173";
    });

    //Se añaden los links al menu para pantallas grandes

    menu.appendChild(forums);
    menu.appendChild(articles);
    menu.appendChild(prof);
    menu.appendChild(btnLogOut);

    // Se copian los links al menu del dropdown

    dropdownContent.appendChild(forums.cloneNode(true));
    dropdownContent.appendChild(articles.cloneNode(true));
    dropdownContent.appendChild(prof.cloneNode(true));
    dropdownContent.appendChild(btnLogOut.cloneNode(true));

    navbarEnd.appendChild(menu);
    navbarEnd.appendChild(dropdownContent);
  } else {
    // Mostrar botones de login y register si el usuario no está autenticado
    const btnLogin = document.createElement("a");
    btnLogin.classList.add("btn", "btn-primary", "btn-sm");
    btnLogin.textContent = "Iniciar Sesión";
    btnLogin.type = "submit";
    btnLogin.setAttribute("href", "/login");

    const btnRegister = document.createElement("a");
    btnRegister.classList.add("btn", "btn-primary", "btn-sm");
    btnRegister.textContent = "Registrarse";
    btnRegister.type = "submit";
    btnRegister.setAttribute("href", "/register-user");

    dropdownContent.appendChild(btnLogin);
    dropdownContent.appendChild(btnRegister);
    menu.appendChild(btnLogin.cloneNode(true));
    menu.appendChild(btnRegister.cloneNode(true));
  }

  dropdown.appendChild(dropdownButton);
  dropdown.appendChild(dropdownContent);

  navbarEnd.appendChild(menu);
  navbarEnd.appendChild($themeLabel());
  navbarEnd.appendChild(dropdown);

  navbar.appendChild(navbarStart);
  navbar.appendChild(navbarEnd);

  return navbar;
};
