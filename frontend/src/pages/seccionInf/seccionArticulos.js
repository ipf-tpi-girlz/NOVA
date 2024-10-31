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

    // Crear estructura principal
    const contenedorPrincipal = document.createElement("div");
    contenedorPrincipal.className =
      "contenedorPrincipal bg-gray-100 min-h-screen";
    document.body.appendChild(contenedorPrincipal);

    const maxWidthContainer = document.createElement("div");
    maxWidthContainer.className = "max-w-5xl mx-auto";
    contenedorPrincipal.appendChild(maxWidthContainer);

    const titulo = document.createElement("h1");
    titulo.className = "text-4xl font-semibold text-center text-red-600 mb-12";
    titulo.textContent = "Recursos sobre Violencia de Género";
    maxWidthContainer.appendChild(titulo);

    const articleContainer = document.createElement("div");
    articleContainer.id = "articleContainer";
    articleContainer.className =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
    maxWidthContainer.appendChild(articleContainer);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "text-center mt-8";
    maxWidthContainer.appendChild(buttonContainer);

    const createButton = document.createElement("button");
    createButton.className =
      "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition";
    createButton.textContent = "Crear Artículo";
    createButton.onclick = openCreateArticleModal;
    buttonContainer.appendChild(createButton);

    // Modal para Crear Artículo
    const createArticleModal = document.createElement("div");
    createArticleModal.id = "createArticleModal";
    createArticleModal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 hidden";
    document.body.appendChild(createArticleModal);

    const modalContent = document.createElement("div");
    modalContent.className = "bg-white rounded-xl p-6 max-w-md w-full";
    createArticleModal.appendChild(modalContent);

    const modalTitle = document.createElement("h2");
    modalTitle.className = "text-2xl font-semibold text-red-600 mb-4";
    modalTitle.textContent = "Nuevo Artículo";
    modalContent.appendChild(modalTitle);

    const titleInput = document.createElement("input");
    titleInput.id = "newArticleTitle";
    titleInput.type = "text";
    titleInput.placeholder = "Título del artículo";
    titleInput.className = "w-full mb-4 p-2 border border-gray-300 rounded";
    modalContent.appendChild(titleInput);

    const contentTextarea = document.createElement("textarea");
    contentTextarea.id = "newArticleContent";
    contentTextarea.placeholder = "Descripción del artículo";
    contentTextarea.className =
      "w-full mb-4 p-2 border border-gray-300 rounded";
    contentTextarea.rows = 4;
    modalContent.appendChild(contentTextarea);

    const publishButton = document.createElement("button");
    publishButton.className =
      "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition";
    publishButton.textContent = "Publicar";
    publishButton.onclick = publishArticle;
    modalContent.appendChild(publishButton);

    const cancelButton = document.createElement("button");
    cancelButton.className = "text-gray-500 mt-4 hover:underline";
    cancelButton.textContent = "Cancelar";
    cancelButton.onclick = closeCreateArticleModal;
    modalContent.appendChild(cancelButton);

    // Lógica y creación de artículos
    const articles = [
      {
        id: 1,
        title: "Comprendiendo la Violencia Psicológica",
        content:
          "Conoce cómo identificar y enfrentar la violencia psicológica.",
        redirectUrl: "/articulo-psicologico",
      },
      {
        id: 2,
        title: "Identificando la Violencia Sexual",
        content:
          "Descubre los recursos para prevenir y denunciar la violencia sexual.",
        redirectUrl: "/articulo-abuso",
      },
      {
        id: 3,
        title: "Afrontando la Violencia Física",
        content: "Encuentra información y ayuda sobre la violencia física.",
        redirectUrl: "/articulo-fisica",
      },
      {
        id: 4,
        title: "Recursos de Ayuda y Apoyo",
        content:
          "Accede a recursos de ayuda y apoyo para víctimas de violencia.",
        redirectUrl: "/ayuda",
      },
    ];

    function createArticleCard(article) {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md p-6";

      const cardTitle = document.createElement("h2");
      cardTitle.className = "text-xl font-semibold text-red-600 mb-2";
      cardTitle.textContent = article.title;
      card.appendChild(cardTitle);

      const cardContent = document.createElement("p");
      cardContent.className = "text-black mb-4";
      cardContent.textContent = article.content;
      card.appendChild(cardContent);

      const viewMoreButton = document.createElement("button");
      viewMoreButton.className =
        "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition";
      viewMoreButton.textContent = "Ver más";
      viewMoreButton.onclick = function () {
        redirectTo(article.redirectUrl);
      };
      card.appendChild(viewMoreButton);

      return card;
    }

    function redirectTo(url) {
      window.location.href = url;
    }

    function openCreateArticleModal() {
      createArticleModal.classList.remove("hidden");
    }

    function closeCreateArticleModal() {
      createArticleModal.classList.add("hidden");
    }

    function publishArticle() {
      const title = titleInput.value;
      const content = contentTextarea.value;

      if (title && content) {
        const newArticle = {
          id: articles.length + 1,
          title: title,
          content: content,
          redirectUrl: "#",
        };
        articles.push(newArticle);
        articleContainer.appendChild(createArticleCard(newArticle));
        closeCreateArticleModal();
        titleInput.value = "";
        contentTextarea.value = "";
      } else {
        alert("Por favor, complete ambos campos antes de publicar.");
      }
    }

    articles.forEach((article) => {
      articleContainer.appendChild(createArticleCard(article));
    });
  });
};
