export const menuProfesional = () => {
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
        <h2 class="text-2xl font-bold mb-2">Comunidades</h2>
        <p class="text-purple-100">Grupos</p>
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

    // Container para los enlaces
    const $linksContainer = document.createElement("div");
    $linksContainer.classList.add("space-y-4");

    // Box de navegación
    const $navBox = document.createElement("div");
    $navBox.classList.add("bg-gray-50", "rounded-xl", "p-4", "shadow-inner");

    // Crear enlaces
    const links = [
      { label: "", value: "Ver Post" },
      { label: "Nuevos grupos", value: "Explorar" },
      { label: "A los que perteneces", value: "Mi Comunidad" },
    ];

    links.forEach((link) => {
      const $link = document.createElement("div");
      $link.classList.add(
        "mb-4",
        "flex",
        "items-center",
        "hover:bg-white",
        "p-3",
        "rounded-lg",
        "transition-colors",
        "duration-200",
        "cursor-pointer"
      );
      $link.innerHTML = `
                <div>
                    <p class="text-sm font-medium text-gray-500">${link.label}</p>
                    <p class="text-lg text-gray-800 font-semibold">${link.value}</p>
                </div>
            `;
      $navBox.appendChild($link);
    });

    // Botón Crear Grupo
    const $createButton = document.createElement("button");
    $createButton.classList.add(
      "w-full",
      "bg-gradient-to-r",
      "from-purple-500",
      "to-indigo-600",
      "text-white",
      "py-3",
      "px-4",
      "rounded-xl",
      "hover:opacity-90",
      "transition-opacity",
      "duration-200",
      "font-semibold"
    );
    $createButton.textContent = "Crear Grupo";

    $linksContainer.appendChild($navBox);
    $linksContainer.appendChild($createButton);
    $content.appendChild($linksContainer);
  }, 1000);

  // Ensamblar todo
  $card.appendChild($header);
  $card.appendChild($content);
  $container.appendChild($card);

  // Agregar event listeners
  const addEventListeners = () => {
    const links = $container.querySelectorAll(".cursor-pointer");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        // Aquí puedes agregar la lógica de navegación
        console.log(
          "Navegando a:",
          link.querySelector(".text-gray-800").textContent
        );
      });
    });

    const createButton = $container.querySelector("button");
    createButton.addEventListener("click", () => {
      console.log("Crear nuevo grupo");
    });
  };

  // Agregar event listeners después de que se cargue el contenido
  setTimeout(addEventListeners, 1100);

  return $container;
};

// Uso:
// const sidebar = createSidebar();
// document.body.appendChild(sidebar);
