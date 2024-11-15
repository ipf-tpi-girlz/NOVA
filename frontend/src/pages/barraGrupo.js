import { fetchDeleteComunity } from "../api/comunity";

const id = window.location.pathname.split("/")[2];

export const menuComunidad = () => {
  const $container = document.createElement("div");
  $container.classList.add(
    "w-80",
    "h-screen",
    "bg-gradient-to-br",
    "from-purple-100",
    "to-indigo-200",
    "p-4"
  );

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

  // Header
  const $header = document.createElement("div");
  $header.classList.add(
    "bg-gradient-to-r",
    "from-purple-500",
    "to-indigo-600",
    "text-white",
    "p-6"
  );
  $header.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Administración</h2>
      <p class="text-purple-100">Opciones</p>
    `;

  // Content
  const $content = document.createElement("div");
  $content.classList.add("p-6");

  // Loading inicial
  const $loading = document.createElement("div");
  $loading.classList.add("flex", "justify-center", "py-8");
  $loading.innerHTML = `
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
    `;
  $content.appendChild($loading);

  // Simulamos carga de contenido
  setTimeout(() => {
    $content.innerHTML = "";

    // Container para las opciones
    const $optionsContainer = document.createElement("div");
    $optionsContainer.classList.add("space-y-4");

    // Botón "Editar"
    const $editButton = document.createElement("button");
    $editButton.classList.add(
      "w-full",
      "bg-blue-500",
      "text-white",
      "py-3",
      "px-4",
      "rounded-xl",
      "hover:bg-blue-600",
      "transition-opacity",
      "duration-200",
      "font-semibold"
    );
    $editButton.textContent = "Editar";

    // Lógica para el botón "Editar"
    $editButton.addEventListener("click", () => {
      console.log("Editar acción ejecutada");
      //
    });

    // Botón "Eliminar"
    const $deleteButton = document.createElement("button");
    $deleteButton.id = "buttonDelete";
    $deleteButton.classList.add(
      "w-full",
      "bg-red-500",
      "text-white",
      "py-3",
      "px-4",
      "rounded-xl",
      "hover:bg-red-600",
      "transition-opacity",
      "duration-200",
      "font-semibold"
    );
    $deleteButton.textContent = "Eliminar";

    $deleteButton.addEventListener("click", async () => {
      await fetchDeleteComunity(id);
    });

    // Añadir los botones al contenedor
    $optionsContainer.appendChild($editButton);
    $optionsContainer.appendChild($deleteButton);
    $content.appendChild($optionsContainer);
  }, 1000);

  // Ensamblar todo
  $card.appendChild($header);
  $card.appendChild($content);
  $container.appendChild($card);

  return $container;
};
