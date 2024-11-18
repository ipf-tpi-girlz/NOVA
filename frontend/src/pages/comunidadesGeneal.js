export const getComunidades = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "px-10", "flex-col", "items-center"); // Centrar el contenido

  // Crear el h1 centrado y más grande
  const title = document.createElement("h1");
  title.textContent = "Comunidades";
  title.classList.add("text-4xl", "font-bold", "text-center", "mb-8", "mt-12");

  // Agregar el título al contenedor
  container.appendChild(title);

  // Contenedor de comunidades
  const comunidadesContainer = document.createElement("div");
  comunidadesContainer.classList.add("grid", "grid-cols-4", "gap-4", "p-5");

  // Función para obtener las comunidades desde el backend
  function fetchCommunities() {
    console.log("Iniciando la solicitud de comunidades..."); // Agregar log para depuración
    fetch("http://localhost:4000/comunity/") // Reemplaza con la URL de tu API
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            `Error al obtener las comunidades: ${response.statusText}`
          );
        }
        console.log("Respuesta obtenida correctamente"); // Agregar log de éxito
        return response.json();
      })
      .then((comunity) => {
        console.log("Datos de las comunidades recibidos:", comunity); // Agregar log de los datos
        if (typeof comunity === "object") {
          // Recorrer las comunidades como un objeto (por ejemplo, { id1: {...}, id2: {...} })
          Object.keys(comunity).forEach((id) => {
            const community = comunity[id]; // Acceder a cada comunidad usando su ID
            console.log(`Comunidad ID: ${id}`); // Mostrar ID de cada comunidad
            console.log(`Comunidad Nombre: ${community.nombre}`); // Mostrar nombre
            console.log(`Comunidad Descripción: ${community.desc}`); // Mostrar descripción

            if (community && community.nombre && community.desc) {
              // Llamar a la función para renderizar cada comunidad
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
    console.log("Renderizando comunidad:", community); // Agregar log para depurar renderización
    const communityElement = document.createElement("div");
    communityElement.classList.add(
      "bg-base-300",
      "p-12",
      "mb-6",
      "mr-6",
      "rounded-lg",
      "shadow-md"
    );

    // Nombre de la comunidad
    const communityName = document.createElement("h2");
    communityName.textContent = community.nombre;
    communityName.classList.add(
      "text-xl",
      "font-semibold",
      "mb-2",
      "text-gray-800"
    );
    communityElement.appendChild(communityName);

    // Descripción de la comunidad
    const communityDesc = document.createElement("p");
    communityDesc.textContent = community.desc || "Descripción no disponible";
    communityDesc.classList.add("text-gray-600", "mb-4");
    communityElement.appendChild(communityDesc);

    // Botón para unirse
    const joinButton = document.createElement("button");
    joinButton.textContent = "Unirse";
    joinButton.classList.add(
      "mt-2",
      "px-4",
      "py-2",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "hover:bg-blue-600"
    );

    // Agregar funcionalidad al botón (Aquí puedes implementar la lógica para unirse)
    joinButton.addEventListener("click", () => {
      alert(`Te has unido a la comunidad: ${community.nombre}`);
      // Aquí puedes agregar la lógica para procesar la acción de unirse a la comunidad
    });

    communityElement.appendChild(joinButton);

    // Añadir la comunidad al contenedor de comunidades
    comunidadesContainer.appendChild(communityElement);
  }

  // Llamar a la función para obtener y renderizar las comunidades
  fetchCommunities();

  // Agregar el contenedor de comunidades debajo del título
  container.appendChild(comunidadesContainer);

  return container;
};
