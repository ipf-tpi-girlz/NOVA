import { logout } from "../api/user";
import { deleteAccount } from "../api/auth";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    const $main = document.createElement('div');
    $main.className = "flex flex-col min-h-screen bg-base-200  w-full min-w-screen p-5";

    // --- Contenedor secundario ---
    const $conteiner = document.createElement('div');
    $conteiner.classList.add('flex', 'justify-between', 'items-start', 'gap-6', 'w-full', 'min-w-screen');

    // --- Contenedor para la imagen y el texto ---
    const $leftSide = document.createElement('div');
    $leftSide.classList.add('flex', 'gap-4', 'items-start');

    // Imagen
    const $img = document.createElement('img');
    $img.classList.add('w-48', 'h-48', 'rounded-full');
    $img.src = 'https://i.pravatar.cc/300';

    // Contenedor para el nombre y la descripción
    const $textContainer = document.createElement('div');
    $textContainer.classList.add('flex', 'flex-col', 'justify-start');

    // Nombre del usuario
    const $name = document.createElement('h2');
    $name.classList.add('text-4xl', 'font-bold');
    $name.textContent = 'Nombre del usuario';

    // Descripción
    const $description = document.createElement('p');
    $description.classList.add('text-gray-600', 'text-lg', 'mt-2');
    $description.textContent = 'Esta es la descripción del usuario.';

    // Botón de "Editar Perfil"
    const $btnEdit = document.createElement('button');
    $btnEdit.classList.add('bg-gray-200', 'text-gray-700', 'p-2', 'rounded-lg', 'hover:bg-gray-300', 'text-sm');
    $btnEdit.textContent = 'Editar Perfil';

    // Botón de configuración
    const $btnSettings = document.createElement('button');
    $btnSettings.classList.add('bg-gray-200', 'text-gray-700', 'p-2', 'rounded-full', 'hover:bg-gray-300', 'flex', 'items-center', 'justify-center', 'w-10', 'h-10');

    // Icono de configuración
    const $iconSettings = document.createElement('i');
    $iconSettings.classList.add('fas', 'fa-cog', 'w-4', 'h-4');
    $btnSettings.appendChild($iconSettings);

    // Añadir nombre y descripción al contenedor de texto
    $textContainer.appendChild($name);
    $textContainer.appendChild($description);

    // Añadir imagen y texto al lado izquierdo
    $leftSide.appendChild($img);
    $leftSide.appendChild($textContainer);

    // Agrupar los botones de editar y configuración en un contenedor
    const $btnContainer = document.createElement('div');
    $btnContainer.classList.add('flex', 'gap-2');
    $btnContainer.appendChild($btnEdit);
    $btnContainer.appendChild($btnSettings);

    // Añadir el lado izquierdo y los botones al contenedor principal
    $conteiner.appendChild($leftSide);
    $conteiner.appendChild($btnContainer);

    //Divisor
    const $divider = document.createElement("div");
    $divider.classList.add("divider");

    // ---- Añadir las pestañas aquí ----
    const $tabsContainer = document.createElement("div");
    $tabsContainer.setAttribute("role", "tablist");
    $tabsContainer.classList.add("tabs", "tabs-bordered", "flex", "justify-center");
    // Tab 1
    const $tab1 = document.createElement("input");
    $tab1.type = "radio";
    $tab1.name = "my_tabs_1";
    $tab1.setAttribute("role", "tab");
    $tab1.classList.add("tab");
    $tab1.setAttribute("aria-label", "Publicaciones");

    // Tab 2
    const $tab2 = document.createElement("input");
    $tab2.type = "radio";
    $tab2.name = "my_tabs_1";
    $tab2.setAttribute("role", "tab");
    $tab2.classList.add("tab");
    $tab2.setAttribute("aria-label", "Comunidades");
    $tab2.checked = true;

    // Contenido de las pestañas
    const $tabContent = document.createElement("div");
    $tabContent.classList.add("tab-content", "p-10", "mt-4");

    const $tabContent1 = document.createElement("div");
    $tabContent1.setAttribute("role", "tabpanel");
    $tabContent1.textContent = "Contenido de Publicaciones";
    $tabContent1.style.display = "none";

    const $tabContent2 = document.createElement("div");
    $tabContent2.setAttribute("role", "tabpanel");
    $tabContent2.textContent = "Contenido de Comunidades";

    $tabContent.appendChild($tabContent1);
    $tabContent.appendChild($tabContent2);

    // Función para cambiar entre pestañas
    const switchTab = (tab, content) => {
        $tabContent1.style.display = "none";
        $tabContent2.style.display = "none";
        content.style.display = "block";
        $tab1.checked = false;
        $tab2.checked = false;
        tab.checked = true;
    };

    $tab1.addEventListener("change", () => switchTab($tab1, $tabContent1));
    $tab2.addEventListener("change", () => switchTab($tab2, $tabContent2));


    // Añadir las pestañas al contenedor
    $tabsContainer.appendChild($tab1);
    $tabsContainer.appendChild($tabContent1);
    $tabsContainer.appendChild($tab2);
    $tabsContainer.appendChild($tabContent2);

    // --- Añadir las pestañas al DOM ---
    $main.appendChild($conteiner);
    $main.appendChild($divider);
    $main.appendChild($tabsContainer);

    return $main;
};
