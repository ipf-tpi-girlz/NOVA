import { $themeLabel } from "./themeButton";
import { checkSession } from '../api/auth.js';

export const Navbar = async () => {
  const isAuthenticated = await checkSession().catch(error => {
    console.error("Error al verificar sesión:", error);
    return false; // Devuelve `false` si ocurre un error en `checkSession`
  });

  console.log("Estado de autenticación:", isAuthenticated);

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
  navbarEnd.classList.add("navbar-end", "gap-3", "w-full");

  // Logo
  const logo = document.createElement("a");
  logo.classList.add("btn", "btn-ghost", "text-2xl", "font-serif");
  logo.textContent = "NOVA";
  logo.setAttribute("href", "/home");
  navbarStart.appendChild(logo);

  // Dropdown para pantallas pequeñas
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown", "dropdown-end");

  const dropdownButton = document.createElement("label");
  dropdownButton.classList.add("btn", "btn-ghost", "lg:hidden");
  dropdownButton.setAttribute("role", "button");
  dropdownButton.setAttribute("tabindex", "0");
  dropdownButton.innerHTML = `<span class="material-symbols-rounded dark:text-pink-200">menu</span>`;

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

  // Verifica si el usuario está autenticado
  if (isAuthenticated) {
    console.log("Usuario autenticado");

    const createLink = (link, text) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", link);
      a.textContent = text;
      li.appendChild(a);
      return li;
    };

    const forums = createLink("/foros", "Foros");
    const histories = createLink("/historias", "Historias");
    const articles = createLink("/chvg", "Artículos");
    const prof = createLink("/contact", "Profesionales");

    const profile = document.createElement("button");
    profile.classList.add("btn", "btn-primary", "btn-sm");
    profile.textContent = "Mi perfil";
    profile.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "http://localhost:5173";
    });

    menu.append(forums, histories, articles, prof, profile);
    dropdownContent.append(forums.cloneNode(true), histories.cloneNode(true), articles.cloneNode(true), prof.cloneNode(true), profile.cloneNode(true));
  } else {
    console.log("Usuario no autenticado");

    const btnLogin = document.createElement("a");
    btnLogin.classList.add("btn", "btn-primary", "btn-sm");
    btnLogin.textContent = "Iniciar Sesión";
    btnLogin.setAttribute("href", "/login");

    const btnRegister = document.createElement("a");
    btnRegister.classList.add("btn", "btn-primary", "btn-sm");
    btnRegister.textContent = "Registrarse";
    btnRegister.setAttribute("href", "/register-user");

    dropdownContent.append(btnLogin, btnRegister);
    menu.append(btnLogin.cloneNode(true), btnRegister.cloneNode(true));
  }

  dropdown.append(dropdownButton, dropdownContent);
  navbarEnd.append(menu, $themeLabel(), dropdown);

  navbar.append(navbarStart, navbarEnd);

  return navbar;
};
