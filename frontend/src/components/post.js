import Swal from "sweetalert2";
import {
  fetchGetForos,
  fetchCreateForo,
  fetchUpdateForo,
  fetchDeleteForo,
} from "../api/foro";

const frases = [
  {
    id: 1,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
];

let frasesIndex = 0;

export const createHeroSection = () => {
  const hero = document.createElement("div");
  hero.classList.add(
    "hero",

    "flex",
    "flex-col",
    "items-center",
    "min-h-screen"
  );
  let cardcount = 0;

  const titleSection = document.createElement("h2");
  titleSection.classList.add("text-3xl", "font-bold", "text-center", "mb-5");
  titleSection.textContent = "historias";

  const heroContent = document.createElement("div");
  heroContent.classList.add("text-center", "w-full", "p-4");

  // Botón para crear foro
  const createPostButton = document.createElement("button");
  createPostButton.classList.add("btn", "btn-lg", "btn-primary");
  createPostButton.textContent = "Crear Post";

  createPostButton.addEventListener("click", () => {
    Swal.fire({
      title: "Crear Post",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción" rows="4"></textarea>
      `,
      background: "#f8f9fa",
      backdrop: `
        rgba(0, 0, 0, 0.5)
        url("../assets/fon3.jpg") left top
        no-repeat
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const desc = document.getElementById("swal-desc").value;

        if (!title || !desc) {
          Swal.showValidationMessage(`Por favor, completa todos los campos.`);
          return false;
        }

        return { title, desc };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postData = {
          title: result.value.title,
          desc: result.value.desc,
        };

        try {
          const response = await fetch("http://localhost:4000/foro/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
          }

          const data = await response.json();
          Swal.fire({
            icon: "success",
            title: "¡Post creado!",
            text: `Se ha creado el Post!`,
          });

          loadForos();
        } catch (error) {
          console.error("ERROR PA", error);
          Swal.fire({
            icon: "error",
            title: "Error al crear el post",
            text: error.message,
          });
        }
      }
    });
  });

  const forumsContainer = document.createElement("div");
  forumsContainer.classList.add(
    "mt-5",
    "grid",
    "grid-cols-1",
    "gap-4",
    "md:grid-cols-2",
    "md:grid-cols-3"
  );

  const loadForos = async () => {
    try {
      const response = await fetch("http://localhost:4000/foro/infoGeneral", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR! Status: ${response.status}`);
      }
      const data = await response.json();

      forumsContainer.innerHTML = "";

      data.foros.forEach((foro) => {
        const forumCard = document.createElement("div");
        forumCard.classList.add(
          "bg-white",
          "break-words",
          "rounded-lg",
          "p-5",
          "shadow-md",
          "hover:shadow-lg",
          "hover:bg-gray-100",
          "transition-shadow",
          "transition-bg",
          "duration-300"
        );

        cardcount++;

        // Crear el contenedor del dropdown
        const dropdownContainer = document.createElement("div");
        dropdownContainer.classList.add("dropdown", "ml-28");

        // Crear el botón para activar el dropdown
        const dropdownButton = document.createElement("div");
        dropdownButton.setAttribute("tabindex", "0");
        dropdownButton.setAttribute("role", "button");
        dropdownButton.classList.add(
          "btn",
          "bg-transparent",
          "border-transparent",
          "box-border-0"
        );
        dropdownButton.textContent = "🤍";

        // Crear el contenido del dropdown
        const dropdownContent = document.createElement("ul");
        dropdownContent.setAttribute("tabindex", "0");
        dropdownContent.classList.add(
          "dropdown-content",
          "menu",
          "bg-base-100",
          "rounded-box",
          "z-[1]",
          "w-52",
          "p-2",
          "shadow"
        );

        // Crear los elementos del menú
        const item1 = document.createElement("li");
        const buttonEditar = document.createElement("btn");
        buttonEditar.textContent = "Editar";
        item1.appendChild(buttonEditar);

        const item2 = document.createElement("li");
        const buttonEliminar = document.createElement("btn");
        buttonEliminar.textContent = "Borrar";
        item2.appendChild(buttonEliminar);

        // Función para editar el foro
        buttonEditar.addEventListener("click", () => {
          Swal.fire({
            title: "Editar Foro",
            html: `
                    <input id="swal-edit-title" class="swal2-input" value="${foro.nombre}" placeholder="Título">
                    <textarea id="swal-edit-desc" class="swal2-textarea" placeholder="Descripción">${foro.desc}</textarea>
                `,
            preConfirm: () => {
              const title = document.getElementById("swal-edit-title").value;
              const desc = document.getElementById("swal-edit-desc").value;

              if (!title || !desc) {
                Swal.showValidationMessage("Completa todos los campos");
                return false;
              }

              return { title, desc };
            },
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await fetchUpdateForo(foro.id, result.value);
                Swal.fire(
                  "¡Actualizado!",
                  "El foro ha sido actualizado.",
                  "success"
                );
                loadForos(); // Actualizar lista de foros
              } catch (error) {
                console.log(error);
                Swal.fire("Error", "No se pudo actualizar el foro", "error");
              }
            }
          });
        });

        // Función para eliminar el foro
        buttonEliminar.addEventListener("click", async () => {
          Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await fetchDeleteForo(foro.id);
                Swal.fire(
                  "¡Eliminado!",
                  "El foro ha sido eliminado.",
                  "success"
                );

                // Eliminar la carta del foro del DOM
                forumCard.remove(); // Esto elimina la carta del foro inmediatamente
              } catch (error) {
                Swal.fire("Error", "No se pudo eliminar el foro", "error");
              }
            }
          });
        });

        // Añadir los elementos al contenido del dropdown
        dropdownContent.appendChild(item1);
        dropdownContent.appendChild(item2);

        // Añadir el botón y el contenido al contenedor del dropdown
        dropdownContainer.appendChild(dropdownButton);
        dropdownContainer.appendChild(dropdownContent);

        const forumTitle = document.createElement("h4");
        forumTitle.classList.add("font-bold", "text-lg");
        forumTitle.textContent = foro.nombre;

        const forumDesc = document.createElement("p");
        forumDesc.classList.add("mt-2");
        forumDesc.textContent = foro.desc;

        forumCard.appendChild(dropdownContainer);
        forumCard.appendChild(forumTitle);
        forumCard.appendChild(forumDesc);
        forumsContainer.appendChild(forumCard);
        if (cardcount % 4 === 0) {
          const emotionalMessage = document.createElement("div");
          emotionalMessage.className =
            "font-serif text-cener font-semibold text-lg p-2";
          emotionalMessage.innerText = `"${frases[frasesIndex].title}"`;
          forumsContainer.appendChild(emotionalMessage);

          // Aumenta el índice para la próxima frase y reinicia si llega al final
          frasesIndex = (frasesIndex + 1) % frases.length;
        }
      });
    } catch (error) {
      console.error("Error loading forums:", error);
    }
  };

  loadForos();

  heroContent.appendChild(titleSection);
  heroContent.appendChild(createPostButton);
  heroContent.appendChild(forumsContainer);
  hero.appendChild(heroContent);

  return hero;
};
