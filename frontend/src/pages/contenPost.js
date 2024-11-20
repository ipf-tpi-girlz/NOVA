import { showNotification } from "../components/notification";

const comunidadId = window.location.pathname.split("/")[2];

export const postPrev = () => {
  const container = document.createElement("div");
  container.classList.add("flex", "px-10");

  // Container para el nuevo post
  const newPostContainer = document.createElement("div");
  newPostContainer.classList.add("p-5");

  const newPostForm = document.createElement("form");
  newPostForm.classList.add(
    "p-5",
    "bg-base-200",
    "rounded-lg",
    "flex",
    "flex-col",
    "gap-3"
  );

  // Titulo
  const newPostTitle = document.createElement("h2");
  newPostTitle.textContent = "Crear Nuevo Post";
  newPostTitle.classList.add(
    "text-xl",
    "font-semibold",
    "mb-4",
    "text-gray-700"
  );

  // Input para el título del nuevo post
  const newPostTitleInput = document.createElement("input");
  newPostTitleInput.type = "text";
  newPostTitleInput.id = "postTitle";
  newPostTitleInput.placeholder = "Título del post";
  newPostTitleInput.classList.add("input");
  newPostTitleInput.required = true;

  // Textarea para el contenido del nuevo post
  const newPostTextArea = document.createElement("textarea");
  newPostTextArea.id = "postContent";
  newPostTextArea.placeholder = "Contenido del post";
  newPostTextArea.classList.add("textarea");
  newPostTextArea.rows = 4;
  newPostTextArea.required = true;

  // Botón para publicar el nuevo post
  const newPostButton = document.createElement("button");
  newPostButton.type = "submit";
  newPostButton.textContent = "Publicar";
  newPostButton.classList.add("btn", "btn-primary");

  newPostForm.appendChild(newPostTitle);
  newPostForm.appendChild(newPostTitleInput);
  newPostForm.appendChild(newPostTextArea);
  newPostForm.appendChild(newPostButton);

  newPostContainer.appendChild(newPostForm);

  // Contenedor de posts
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("p-5", "flex", "flex-col", "gap-4");

  // Función para obtener los posts del backend
  async function getPost() {
    try {
      const response = await fetch(
        `http://localhost:4000/comunity/general/${comunidadId}`
      ); // Reemplaza con la URL de tu API

      if (!response.ok) {
        throw new Error(`Error al obtener los posts: ${response.statusText}`);
      }

      const posts = await response.json();
      if (response.ok) {
        renderPosts(posts);
      } else {
        console.error("Error al obtener los posts:", posts.message);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  }

  // Función para renderizar los posts
  // Función para renderizar los posts
  function renderPosts(posts) {
    postsContainer.innerHTML = "";

    // Iterar sobre las publicaciones
    posts.community.publicaciones.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add(
        "bg-base-200",
        "p-6",
        "rounded-lg",
        "shadow-md",
        "shadow-md",
        "w-full",
        "max-w-4xl",
        "mx-auto"
      );

      // Título del post
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.titulo;
      postTitle.classList.add(
        "text-xl",
        "font-semibold",
        "mb-2",
        "text-gray-800"
      );
      postElement.appendChild(postTitle);

      // Contenido del post
      const postContent = document.createElement("p");
      postContent.textContent = post.contenido;
      postContent.classList.add("text-gray-600", "mb-4");
      postElement.appendChild(postContent);

      // Sección de comentarios
      const commentsContainer = document.createElement("div");
      commentsContainer.classList.add("comments", "space-y-2");

      post.comentarios.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("bg-base-300", "p-3", "rounded-full");
        commentElement.textContent = comment.contenido;
        commentsContainer.appendChild(commentElement);
      });

      postElement.appendChild(commentsContainer);

      // Formulario de comentarios
      const commentForm = document.createElement("form");
      commentForm.classList.add("mt-4", "flex", "gap-3", "comment-form");
      commentForm.dataset.postId = post.id;

      const commentInput = document.createElement("input");
      commentInput.type = "text";
      commentInput.placeholder = "Añade un comentario";
      commentInput.classList.add("input", "w-full");
      commentForm.appendChild(commentInput);

      const commentSubmitButton = document.createElement("button");
      commentSubmitButton.type = "submit";
      commentSubmitButton.textContent = "Comentar";
      commentSubmitButton.classList.add("btn", "btn-primary");
      commentForm.appendChild(commentSubmitButton);

      postElement.appendChild(commentForm);

      // Añadir el post al contenedor de posts
      postsContainer.appendChild(postElement);
    });
  }

  // Manejador para crear un nuevo post
  newPostForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = newPostTitleInput.value;
    const contenido = newPostTextArea.value;

    if (titulo && contenido) {
      // Enviar el nuevo post al servidor (esto dependerá de tu backend)
      fetch(`http://localhost:4000/comunity-post/create/${comunidadId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ titulo, contenido }),
      })
        .then((response) => {
          if (!response.ok) {

            throw new Error(`Error al crear el post: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            postPrev(); // Recargar los posts después de crear uno nuevo
            newPostForm.reset();
          } else {
            console.error("Error al crear el post:", data.message);
          }
        })
        .catch((error) => {
          showNotification("error", error.message);
          console.error("Error en la creación del post:", error);
        });
    }
  });

  // Manejador para añadir comentarios
  postsContainer.addEventListener("submit", function (e) {
    if (e.target.classList.contains("comment-form")) {
      e.preventDefault();
      const postId = parseInt(e.target.dataset.postId);
      const commentInput = e.target.querySelector("input");
      const comment = commentInput.value;
    }
  });

  // Obtener y mostrar los posts cuando se carga la página
  getPost().then(() => {
    container.appendChild(newPostContainer);
    container.appendChild(postsContainer);
  });

  return container;
};
