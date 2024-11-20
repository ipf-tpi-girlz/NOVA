export const getComunidades = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "px-10", "flex-col", "items-center");

  // Crear el h1 centrado y más grande
  const title = document.createElement("h1");
  title.textContent = "Comunidades";
  title.classList.add("text-4xl", "font-bold", "text-center", "mb-8", "mt-12");
  container.appendChild(title);

  // Botón Crear Grupo
  const createButton = document.createElement("button");
  createButton.classList.add(
    "bg-gradient-to-r",
    "from-purple-500",
    "to-indigo-600",
    "text-white",
    "py-2",
    "px-4",
    "rounded-xl",
    "hover:opacity-90",
    "transition-opacity",
    "duration-200",
    "font-semibold",
    "mb-4"
  );
  createButton.textContent = "Crear Grupo";
  container.appendChild(createButton);

  // Contenedor de comunidades
  const comunidadesContainer = document.createElement("div");
  comunidadesContainer.classList.add("grid", "grid-cols-4", "gap-4", "p-5");
  container.appendChild(comunidadesContainer);

  // Modal
  const modal = document.createElement("div");
  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-50",
    "flex",
    "justify-center",
    "items-center",
    "hidden"
  );

  const modalContent = document.createElement("div");
  modalContent.classList.add(
    "bg-white",
    "p-6",
    "rounded-xl",
    "w-80",
    "shadow-lg"
  );
  modalContent.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Crear Nuevo Grupo</h3>
    <input type="text" id="nombreGrupo" class="w-full p-2 border rounded-lg mb-4" placeholder="Nombre del grupo" />
    <textarea id="descGrupo" class="w-full p-2 border rounded-lg mb-4" placeholder="Descripción del grupo"></textarea>
    <button class="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 font-semibold">Crear</button>
  `;

  modal.appendChild(modalContent);
  container.appendChild(modal);

  // Mostrar modal al hacer clic en el botón "Crear Grupo"
  createButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Lógica para cerrar el modal al hacer clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Lógica para crear el grupo
  const createGroupButton = modalContent.querySelector("button");
  createGroupButton.addEventListener("click", async () => {
    const nombre = document.getElementById("nombreGrupo").value;
    const desc = document.getElementById("descGrupo").value;

    try {
      const response = await fetch("http://localhost:4000/comunity/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, desc }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Comunidad creada:", result.message);
        modal.classList.add("hidden");

        // Redirigir a la comunidad recién creada
      } else {
        console.error("Error al crear la comunidad:", result.message);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  });

  // Función para obtener las comunidades desde el backend
  function fetchCommunities() {
    console.log("Iniciando la solicitud de comunidades...");
    fetch("http://localhost:4000/comunity/")
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            `Error al obtener las comunidades: ${response.statusText}`
          );
        }
        console.log("Respuesta obtenida correctamente");
        return response.json();
      })
      .then((comunity) => {
        console.log("Datos de las comunidades recibidos:", comunity);
        if (typeof comunity === "object") {
          Object.keys(comunity).forEach((id) => {
            const community = comunity[id];
            if (community && community.nombre && community.desc) {
              renderCommunity(community);
            } else {
              console.error(
                "Error: Estructura de la comunidad no válida",
                community
              );
            }
          });
        } else {
          console.error("Error: la respuesta no es un objeto de comunidades");
        }
      })
      .catch((error) => {
        console.error("Error en el servidor:", error);
      });
  }

  // Función para renderizar una comunidad en la pantalla
  function renderCommunity(community) {
    const communityElement = document.createElement("div");
    communityElement.classList.add(
      "bg-base-300",
      "p-12",
      "mb-6",
      "mr-6",
      "rounded-lg",
      "shadow-md"
    );

    const communityName = document.createElement("h2");
    communityName.textContent = community.nombre;
    communityName.classList.add(
      "text-xl",
      "font-semibold",
      "mb-2",
      "text-gray-800"
    );
    communityElement.appendChild(communityName);

    const communityDesc = document.createElement("p");
    communityDesc.textContent = community.desc || "Descripción no disponible";
    communityDesc.classList.add("text-gray-600", "mb-4");
    communityElement.appendChild(communityDesc);

    // Botón "Ver más"
    const viewMoreButton = document.createElement("button");
    viewMoreButton.textContent = "Ver más";
    viewMoreButton.classList.add(
      "mt-2",
      "px-4",
      "py-2",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-600"
    );

    viewMoreButton.addEventListener("click", () => {
      // Aquí puedes agregar la lógica para redireccionar al detalle de la comunidad
      sessionStorage.setItem('forumId', community.id);
      window.location.href = `/forum`;

      alert(`Ver más detalles de la comunidad: ${community.nombre} `);
      // Aquí puedes agregar la lógica para mostrar más detalles de la comunidad
    });

    communityElement.appendChild(viewMoreButton);
    comunidadesContainer.appendChild(communityElement);
  }

  // Llamar a la función para obtener y renderizar las comunidades
  fetchCommunities();

  return container;
};
