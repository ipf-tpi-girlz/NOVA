import { checkSession } from "../../api/auth";
import { fetchArticles, fetchCreateArticles } from "../../api/articles";
import { showNotification } from "../../components/notification";
import { Footer } from "../../components";

export const articulos = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // Crear estilos
    const style = document.createElement("style");
    style.innerHTML = `
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");
        body {
          font-family: "Poppins", sans-serif;
          background-color: #e6e6fa;
        }
        .hidden {
          display: none;
        }
      `;
    document.head.appendChild(style);
  });

  checkSession().then((usu) => {
    console.log(usu)
    // Crear estructura principal
    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className =
      "contenedorPrincipal bg-base min-h-screen mt-5";
    document.body.appendChild(contenedorPrincipal);

    const maxWidthContainer = document.createElement("div");
    maxWidthContainer.className = "max-w-5xl mx-auto";


    const titulo = document.createElement("h1");
    titulo.className = "text-4xl font-bold text-center  mb-12";
    titulo.textContent = "Recursos sobre Violencia de Género";
    maxWidthContainer.appendChild(titulo);

    const articleContainer = document.createElement("div");
    articleContainer.id = "publicaciones-container";
    articleContainer.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 m-4";


    const loadData = async () => {
      try {
        const data = await fetchArticles();

        articleContainer.innerHTML = "";

        loadArticles(data);
      } catch (error) {
        showNotification("Error al cargar las publicaciones:", error);
      }
    };

    loadData();

    //!CASI
    const loadArticles = (data) => {
      const publicacionesContainer = document.getElementById("publicaciones-container");
      publicacionesContainer.innerHTML = "";

      if (data && data.length > 0) {
        data.forEach((art) => {
          const card = createArticleCard(art);
          publicacionesContainer.appendChild(card);
        });
      } else {
        publicacionesContainer.appendChild(NoContent());
      }
    };

    //!CASI
    const createArticleCard = (art) => {
      const user = art.usuario;

      const card = document.createElement("div");
      card.classList.add(
        "bg-purple-50",
        "rounded-xl",
        "shadow-md",
        "overflow-hidden",
        "transition-all",
        "duration-300",
        "hover:shadow-xl",
        "hover:-translate-y-1",
        "group",
        "cursor-pointer",
        "border",
        "border-gray-100",
        "flex",
        "flex-col",
        "w-auto",
        "h-auto",
        "p-4"
      );

      // Header con foto de usuario y nombre
      const headerWrapper = document.createElement("div");
      headerWrapper.classList.add(
        "flex",
        "items-center",
        "gap-3",
        "p-4",
        "border-b",
        "border-gray-100"
      );

      const userImageWrapper = document.createElement("div");
      userImageWrapper.classList.add("w-14", "h-14", "rounded-full", "overflow-hidden");

      const userImage = document.createElement("img");
      userImage.classList.add("w-full", "h-full", "object-cover");
      userImage.src = user && user.img
        ? user.img
        : "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg";

      userImageWrapper.appendChild(userImage);

      const userName = document.createElement("div");
      userName.classList.add("flex-grow", "font-semibold", "text");
      userName.textContent = user && user.nombre ? user.nombre : "Usuario anónimo";

      headerWrapper.append(userImageWrapper, userName);
      card.appendChild(headerWrapper);

      // Imagen principal (si existe)
      if (art.imagen) {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("relative", "overflow-hidden");

        const img = document.createElement("div");
        img.classList.add("w-auto", "h-auto", "bg-cover", "bg-center", "transition-transform", "duration-500", "group-hover:scale-110");
        img.style.backgroundImage = `url(${art.imagen})`;

        const overlay = document.createElement("div");
        overlay.classList.add(
          "absolute",
          "inset-0",
          "bg-gradient-to-t",
          "from-black/50",
          "to-transparent",
          "opacity-0",
          "group-hover:opacity-100",
          "transition-opacity",
          "duration-300"
        );

        imgWrapper.append(img, overlay);
        card.append(imgWrapper);
      }

      // Contenido principal
      const contentWrapper = document.createElement("div");
      contentWrapper.classList.add("p-6", "space-y-4");

      const textContent = document.createElement("div");

      const title = document.createElement("h3");
      title.classList.add(
        "text-xl",
        "font-semibold",
        "mb-2",
        "text",
        "group-hover:text-primary",
        "transition-colors",
        "duration-300"
      );
      title.textContent = art.nombre || "Sin título";

      const description = document.createElement("p");
      description.classList.add("text-sm", "text-gray-600", "leading-relaxed");
      description.textContent = art.desc || "Sin descripción disponible.";

      textContent.append(title, description);
      contentWrapper.appendChild(textContent);

      // Fecha de creación
      if (art.createdAt) {
        const metadata = document.createElement("div");
        metadata.classList.add("flex", "items-center", "gap-2", "text-xs", "text-gray-500");
        metadata.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          ${formatDate(art.createdAt)}
        `;
        contentWrapper.appendChild(metadata);
      }

      card.appendChild(contentWrapper);

      return card;
    };

    //!nuevo
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };



    const buttonContainer = document.createElement("div");
    buttonContainer.className = "text-center mt-8";

    //!APPENDS
    maxWidthContainer.appendChild(buttonContainer);
    maxWidthContainer.appendChild(articleContainer);
    contenedorPrincipal.appendChild(maxWidthContainer);
    contenedorPrincipal.appendChild(Footer())

    //!BOTON PARA CREAR 
    if (usu.role === "profesional") {
      const createButton = document.createElement("button");
      createButton.className =
        "button bg-primary relative shadow px-4 py-2 rounded-md hover:shadow-xl transition";
      createButton.textContent = "Crear Artículo";
      createButton.onclick = openCreateArticleModal;
      buttonContainer.appendChild(createButton);
    }


    //! Modal para Crear Artículo
    const createArticleModal = document.createElement("div");
    createArticleModal.id = "createArticleModal";
    createArticleModal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 hidden";
    document.body.appendChild(createArticleModal);

    const modalContent = document.createElement("div");
    modalContent.className = "bg-purple-50 rounded-xl p-6 max-w-md w-full g-4, ";
    createArticleModal.appendChild(modalContent);

    const modalTitle = document.createElement("h2");
    modalTitle.className = "text-2xl font-semibold  mb-4";
    modalTitle.textContent = "Nuevo Artículo";
    modalContent.appendChild(modalTitle);

    const titleInput = document.createElement("input");
    titleInput.id = "newArticleTitle";
    titleInput.type = "text";
    titleInput.placeholder = "Título del artículo";
    titleInput.className = " input w-full mb-4 p-2 border  rounded";
    modalContent.appendChild(titleInput);

    const contentTextarea = document.createElement("textarea");
    contentTextarea.id = "newArticleContent";
    contentTextarea.placeholder = "Descripción del artículo";
    contentTextarea.className = "input w-full mb-4 p-2 border rounded";
    contentTextarea.rows = 6; // Incrementamos el número de filas para mayor altura inicial
    contentTextarea.style.minHeight = "150px"; // Altura mínima específica
    contentTextarea.style.resize = "vertical"; // Permitir que el usuario ajuste el tamaño
    modalContent.appendChild(contentTextarea);

    const publishButton = document.createElement("button");
    publishButton.className =
      "bg-base-200 relative  px-4 py-2 rounded-md hover:bg-pink-200 transition";
    publishButton.textContent = "Publicar";
    publishButton.addEventListener("click", async () => {
      try {
        const title = titleInput.value;
        const content = contentTextarea.value;

        if (title && content) {
          const data = {
            nombre: title,
            desc: content,
          };

          await fetchCreateArticles(data);
          showNotification("success", "Artículo creado con exito");
          setTimeout(() => {
            closeCreateArticleModal();
            titleInput.value = "";
            contentTextarea.value = "";
            loadData()
          }, 2000)

        } else {
          showNotification("Por favor, complete ambos campos antes de publicar.");
        }
      } catch (error) {
        showNotification("Error al publicar el artículo:", error);
      }
    })
    modalContent.appendChild(publishButton);
    //!PUBLICAR

    const cancelButton = document.createElement("button");
    cancelButton.className = " mt-4 hover:underline ml-4";
    cancelButton.textContent = "Cancelar";
    cancelButton.onclick = closeCreateArticleModal;
    modalContent.appendChild(cancelButton);




    function openCreateArticleModal() {
      createArticleModal.classList.remove("hidden");
    }

    function closeCreateArticleModal() {
      createArticleModal.classList.add("hidden");
    }

  })

  return contenedorPrincipal;
};
