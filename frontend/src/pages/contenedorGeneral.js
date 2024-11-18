import { getComunidades } from "./comunidadesGeneal";
import { postPrev } from "./contenPost";

export const menuProfesionall = () => {
  const $container = document.createElement("div");
  $container.classList.add(
    "flex",
    "h-screen",
    "bg-gradient-to-br",
    "from-purple-100",
    "to-indigo-200"
  );

  // Crear contenedor izquierdo para la barra de navegación
  const $navContainer = document.createElement("div");
  $navContainer.classList.add(
    "w-80",
    "h-full",
    "bg-gradient-to-br",
    "from-purple-100",
    "to-indigo-200",
    "p-4"
  );

  // Barra de menú
  const $card = document.createElement("div");
  $card.classList.add(
    "bg-white",
    "rounded-2xl",
    "shadow-2xl",
    "h-full",
    "overflow-hidden",
    "transform",
    "transition-all"
  );

  const $header = document.createElement("div");
  $header.classList.add(
    "bg-gradient-to-r",
    "from-purple-500",
    "to-indigo-600",
    "text-white",
    "p-6"
  );
  $header.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Comunidades</h2>
      <p class="text-purple-100">Grupos</p>
    `;
  $card.appendChild($header);

  // Contenido de la barra de menú (enlaces)
  const $content = document.createElement("div");
  $content.classList.add("p-6");
  $content.innerHTML = `
      <button class="mb-4" id="miComunidadBtn">Mi Comunidad</button>
      <button class="mb-4" id="verPostBtn">Ver Post</button>
      <button class="mb-4" id="explorarBtn">Explorar</button>
    `;
  $card.appendChild($content);

  // Agregar la barra de menú al contenedor de la izquierda
  $navContainer.appendChild($card);

  // Crear el contenedor derecho dinámicamente para mostrar contenido
  const $rightContainer = document.createElement("div");
  $rightContainer.classList.add(
    "flex-1", // Ocupa el espacio restante
    "h-full",
    "p-6",
    "bg-white",
    "overflow-y-auto"
  );

  // Agregar ambos contenedores al contenedor principal
  $container.appendChild($navContainer);
  $container.appendChild($rightContainer);

  // Función para manejar la navegación
  const handleNavigation = (action) => {
    const $rightContainer = document.querySelector(".flex-1");

    // Limpiar el contenido actual del contenedor derecho
    $rightContainer.innerHTML = "";

    switch (action) {
      case "miComunidad":
        $rightContainer.appendChild(getComunidades()); // Llamar la función para mostrar comunidades
        break;
      case "verPost":
        $rightContainer.appendChild(postPrev());
        // Aquí podrías agregar la función para ver los posts
        break;
      case "explorar":
        // Aquí podrías agregar la función para explorar otros grupos
        break;
      default:
        console.error("Acción no reconocida");
    }
  };

  // Verifica si el DOM está listo antes de agregar event listeners
  const addEventListeners = () => {
    const miComunidadBtn = document.getElementById("miComunidadBtn");
    const verPostBtn = document.getElementById("verPostBtn");
    const explorarBtn = document.getElementById("explorarBtn");

    // Asegúrate de que los elementos existen antes de agregarles eventos
    if (miComunidadBtn && verPostBtn && explorarBtn) {
      miComunidadBtn.addEventListener("click", () =>
        handleNavigation("miComunidad")
      );
      verPostBtn.addEventListener("click", () => handleNavigation("verPost"));
      explorarBtn.addEventListener("click", () => handleNavigation("explorar"));
    } else {
      console.error("No se encuentran los botones de navegación.");
    }
  };

  // Asegurarse de que los event listeners se agreguen después de que el contenedor se haya creado
  setTimeout(addEventListeners, 0);

  return $container;
};
