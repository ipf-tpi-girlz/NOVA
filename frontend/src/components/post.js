import Swal from "sweetalert2";
import { fetchGetForos, fetchCreateForo, fetchUpdateForo, fetchDeleteForo } from "../api/foro.js";

export const createHeroSection = () => {
    const hero = document.createElement("div");
    hero.classList.add(
        "hero",
        "bg-base-200",
        "min-h-screen",
        "flex",
        "flex-col",
        "items-center",
        "p-5"
    );

    const titleSection = document.createElement("h2");
    titleSection.classList.add("text-3xl", "font-bold", "text-center", "mb-5");
    titleSection.textContent = "Sección de Foros";

    const heroContent = document.createElement("div");
    heroContent.classList.add("text-center", "w-full", "max-w-3xl", "mx-auto");

    // Botón para crear foro
    const createPostButton = document.createElement("button");
    createPostButton.classList.add(
        "bg-pink-500",
        "text-white",
        "p-3",
        "rounded",
        "hover:bg-pink-600",
        "transition-colors",
        "duration-300",
        "mb-5"
    );
    createPostButton.textContent = "Crear Foro";

    // Evento al hacer clic en "Crear Foro"
    createPostButton.addEventListener("click", () => {
        Swal.fire({
            title: "Crear Foro",
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
                    await fetchCreateForo(postData);
                    Swal.fire({
                        icon: "success",
                        title: "¡Foro creado!",
                        text: `Se ha creado el foro: ${postData.title}`,
                    });
                    loadForos(); // Recargar la lista de foros
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al crear el foro",
                        text: error.message,
                    });
                }
            }
        });
    });

    // Contenedor para los foros
    const forumsContainer = document.createElement("div");
    forumsContainer.classList.add(
        "mt-5",
        "grid",
        "grid-cols-1",
        "gap-4",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "lg:grid-cols-4",
        "lg:grid-cols-5"
    );

    // Función para cargar los foros
    const loadForos = async () => {
        try {
            const data = await fetchGetForos();
            console.log("Datos de foros:", data); // Agregar un log para verificar la respuesta

            if (!data || !data.foros) {
                throw new Error("La estructura de datos no es la esperada o no se recibieron foros.");
            }

            forumsContainer.innerHTML = "";

            // Verifica si hay foros disponibles
            if (data.foros.length === 0) {
                // Mensaje cuando no hay foros
                const noForosMessage = document.createElement("p");
                noForosMessage.textContent = "No existe o no se han creado foros aún.";
                noForosMessage.classList.add("text-center", "text-lg", "font-semibold"); // Clases para centrar y estilizar el mensaje
                forumsContainer.appendChild(noForosMessage);
                return;
            }

            data.foros.forEach((foro) => {
                const forumCard = document.createElement("div");
                forumCard.classList.add(
                    "bg-gray-200", // Cambiado a gris
                    "rounded-lg",
                    "p-5",
                    "shadow-md",
                    "relative", // Para posicionar el emoji en relación a la carta
                    "min-w-[300px]", // Mínimo ancho
                    "max-w-[90%]", // Máximo ancho adaptable
                    "w-full" // Ancho total
                );

                // Contenedor para título y descripción
                const contentContainer = document.createElement("div");
                contentContainer.classList.add("flex", "flex-col", "items-center", "mb-4"); // Flex en columna y centrado

                const forumTitle = document.createElement("h4");
                forumTitle.classList.add("font-bold", "text-lg", "text-center"); // Centrar título
                forumTitle.textContent = foro.nombre;

                // Línea horizontal
                const line = document.createElement("div");
                line.classList.add("border-b-2", "border-gray-300", "w-full", "my-2"); // Línea horizontal

                const forumDesc = document.createElement("p");
                forumDesc.classList.add("mt-2", "text-center"); // Centrando descripción
                forumDesc.textContent = foro.desc;

                // Emoji de corazón blanco
                const heartEmoji = document.createElement("span");
                heartEmoji.textContent = "🤍"; // Corazón blanco
                heartEmoji.classList.add("cursor-pointer", "text-2xl", "mt-2"); // Espacio inferior

                // Contenedor para acciones
                const actionContainer = document.createElement("div");
                actionContainer.classList.add("hidden", "flex", "justify-center", "mt-2"); // Inicialmente oculto y flex en fila

                // Botón para editar foro
                const editButton = document.createElement("button");
                editButton.textContent = "Editar";
                editButton.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "mr-2"); // Espacio a la derecha

                // Botón para eliminar foro
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.classList.add("bg-red-500", "text-white", "p-2", "rounded"); // Sin margen

                // Manejar el clic en el corazón para mostrar/ocultar acciones
                heartEmoji.addEventListener("click", () => {
                    actionContainer.classList.toggle("hidden"); // Alterna la visibilidad
                });

                // Función para editar el foro
                editButton.addEventListener("click", () => {
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
                                Swal.fire("¡Actualizado!", "El foro ha sido actualizado.", "success");
                                loadForos(); // Actualizar lista de foros
                            } catch (error) {
                                Swal.fire("Error", "No se pudo actualizar el foro", "error");
                            }
                        }
                    });
                });

                // Función para eliminar el foro
                deleteButton.addEventListener("click", async () => {
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
                                Swal.fire("¡Eliminado!", "El foro ha sido eliminado.", "success");

                                // Eliminar la carta del foro del DOM
                                forumCard.remove(); // Esto elimina la carta del foro inmediatamente
                            } catch (error) {
                                Swal.fire("Error", "No se pudo eliminar el foro", "error");
                            }
                        }
                    });
                });

                // Añadir botones al contenedor de acciones
                actionContainer.appendChild(editButton);
                actionContainer.appendChild(deleteButton);

                // Agregar elementos al contenedor
                contentContainer.appendChild(forumTitle);
                contentContainer.appendChild(line);
                contentContainer.appendChild(forumDesc);
                forumCard.appendChild(contentContainer);
                forumCard.appendChild(heartEmoji);
                forumCard.appendChild(actionContainer);

                // Agregar la carta del foro al contenedor
                forumsContainer.appendChild(forumCard);
            });
        } catch (error) {
            console.error("Error al cargar foros:", error);
        }
    };

    heroContent.appendChild(createPostButton);
    heroContent.appendChild(forumsContainer);
    hero.appendChild(titleSection);
    hero.appendChild(heroContent);

    // Cargar los foros al inicio
    loadForos();

    return hero;
};
