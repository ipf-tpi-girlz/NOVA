import { $themeLabel } from "./themeButton";
import { checkSession } from "../api/auth.js";

export const Navbar = () => {
  const navbar = document.createElement("nav");
  navbar.classList.add(
    "navbar",
    "md:px-24",
    "bg-base-100",
    "shadow-md",
    "sticky",
    "top-0",
    "z-50"
  );

  const navbarStart = document.createElement("div");
  navbarStart.classList.add("navbar-start", "w-fit");

  const navbarEnd = document.createElement("div");
  navbarEnd.classList.add(
    "navbar-end",
    "flex",

    "w-full",

    "items-center"
  );
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
    "my-0",
    "font-semibold",
    "text-lg",
    "hidden",
    "lg:flex",
    "gap-2"
  );

  // Valida si el usuario inició sesión
  if (checkSession()) {
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
    const histories = createLink("/historias", "Historias");
    const articles = createLink("/articulos", "Artículos");
    const prof = createLink("/contact", "Profesionales");
    const aboutUs = createLink("/Nosotros", "Nosotros");

    // Crear el contenedor del dropdown
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown");

    // Botón de perfil
    const profile = document.createElement("div");
    profile.setAttribute("tabindex", "0");
    profile.setAttribute("role", "button");
    profile.className = " cursor-pointer h-15 w-15 mt-2";
    profile.innerHTML = `<span class="material-symbols-rounded">Account_Circle</span>`;

    // Crear el contenido del dropdown
    const dropdownProfile = document.createElement("ul");
    dropdownProfile.setAttribute("tabindex", "0");
    dropdownProfile.classList.add(
      "dropdown-content",
      "menu",
      "bg-base-100",
      "rounded-box",
      "shadow",
      "absolute",
      "top-full",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "invisible",
      "w-36",
      "text-center",
      "z-10"
    );
    dropdownProfile.style.display = "none"; // Ocultar el menú inicialmente

    // Crear los elementos del menú
    const item1 = document.createElement("li");
    const buttonPerfil = document.createElement("button"); // Cambiar 'btn' por 'button'
    buttonPerfil.textContent = "Ver Perfil";
    item1.appendChild(buttonPerfil);

    const item2 = document.createElement("li");
    const buttonLogOut = document.createElement("button"); // Cambiar 'btn' por 'button'
    buttonLogOut.textContent = "Cerrar Sesion";
    buttonLogOut.setAttribute;
    buttonLogOut.type = "submit";
    // buttonLogOut.setAttribute = ("href", "/");
    // buttonLogOut.addEventListener("click", () => {
    //   window.location.href = "http://localhost:5173";
    // });
    item2.appendChild(buttonLogOut);

    dropdownProfile.appendChild(item1);
    dropdownProfile.appendChild(item2);

    // Añadir el botón y el contenido al contenedor del dropdown
    dropdownContainer.appendChild(profile);
    dropdownContainer.appendChild(dropdownProfile);

    // Evento de clic para mostrar/ocultar el menú
    profile.addEventListener("click", () => {
      // Alternar visibilidad del dropdown
      dropdownProfile.style.display =
        dropdownProfile.style.display === "none" ? "block" : "none";
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownProfile.style.display = "none";
      }
    });

    //Se añaden los links al menu para pantallas grandes

    menu.appendChild(forums);
    menu.appendChild(histories);
    menu.appendChild(articles);
    menu.appendChild(prof);
    menu.appendChild(aboutUs);
    menu.appendChild(dropdownContainer);
    menu.appendChild($themeLabel());

    // Se copian los links al menu del dropdown
    dropdownContent.appendChild(forums.cloneNode(true));
    dropdownContent.appendChild(histories.cloneNode(true));
    dropdownContent.appendChild(articles.cloneNode(true));
    dropdownContent.appendChild(prof.cloneNode(true));
    dropdownContent.appendChild(aboutUs.cloneNode(true));
    dropdownContent.appendChild(dropdownContainer.cloneNode(true));

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
  navbarEnd.appendChild(dropdown);

  navbar.appendChild(navbarStart);
  navbar.appendChild(navbarEnd);

  return navbar;
};
