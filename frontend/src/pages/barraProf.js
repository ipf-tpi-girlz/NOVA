// const comunidadId = window.location.pathname.split("/")[2];
//lo de rriba probe por si se podia agarrar el id para redirigir

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

    // Modal
    const $modal = document.createElement("div");
    $modal.classList.add(
      "fixed",
      "inset-0",
      "bg-black",
      "bg-opacity-50",
      "flex",
      "justify-center",
      "items-center",
      "hidden"
    );

    const $modalContent = document.createElement("div");
    $modalContent.classList.add(
      "bg-white",
      "p-6",
      "rounded-xl",
      "w-80",
      "shadow-lg"
    );
    $modalContent.innerHTML = `
          <h3 class="text-xl font-bold mb-4">Crear Nuevo Grupo</h3>
          <input type="text" id="nombreGrupo" class="w-full p-2 border rounded-lg mb-4" placeholder="Nombre del grupo" />
          <textarea id="descGrupo" class="w-full p-2 border rounded-lg mb-4" placeholder="Descripción del grupo"></textarea>
          <button class="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 font-semibold">Crear</button>
      `;

    $modal.appendChild($modalContent);
    $container.appendChild($modal);

    //"http://localhost:4000/comunity/create"

    // Mostrar modal al hacer clic en el botón "Crear Grupo"
    $createButton.addEventListener("click", () => {
      $modal.classList.remove("hidden");
    });

    // Lógica para cerrar el modal al hacer clic fuera del contenido
    $modal.addEventListener("click", (e) => {
      if (e.target === $modal) {
        $modal.classList.add("hidden");
      }
    });

    // Lógica para crear el grupo
    const $createGroupButton = $modalContent.querySelector("button");
    // Función para obtener el valor de una cookie por su nombre
    function getCookie(name) {
      console.log(document.cookie);
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    $createGroupButton.addEventListener("click", async () => {
      const nombre = document.getElementById("nombreGrupo").value;
      const desc = document.getElementById("descGrupo").value;

      // Obtén el token de la cookie
      // const token = getCookie("authToken"); // Cambia "token" por el nombre de tu cookie si es diferente
      // console.log(token);
      // if (!token) {
      //   console.error("Token no proporcionado");
      //   return;
      // }

      try {
        const response = await fetch("http://localhost:4000/comunity/create", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Agrega el token en los headers
          },
          body: JSON.stringify({ nombre, desc }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Comunidad creada:", result.message);
          $modal.classList.add("hidden");

          //probe agarrar la id por el window.location y por el reult.id los dos devuelven unddefild
          // Redirigir a la comunidad recién creada
          window.location.href = `/post/${result.id}`;
          cons;
        } else {
          console.error("Error al crear la comunidad:", result.message);
        }
      } catch (error) {
        console.error("Error en el servidor:", error);
      }
    });
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
        console.log(
          "Navegando a:",
          link.querySelector(".text-gray-800").textContent
        );
      });
    });
  };

  // Agregar event listeners después de que se cargue el contenido
  setTimeout(addEventListeners, 1100);

  return $container;
};
