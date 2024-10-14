const bodyforum = document.createElement("div");
bodyforum.classList.add("p-4", "flex", "flex-row", "justify-center", "gap-24");
const miembros = document.createElement("div");
miembros.classList.add(
  "bg-base-200",
  "p-5",
  "w-72",
  "h-96",
  "text-center",
  "font-bold",
  "font-serif"
);
miembros.textContent = "Miembros";

//Crear el título del foro
const appContainer = document.createElement("div");
appContainer.classList.add("w-1/2");
// Crear el contenedor para los posts
const postsContainer = document.createElement("div");
postsContainer.id = "posts";
postsContainer.classList.add("space-y-6");
appContainer.appendChild(postsContainer);

// Crear el formulario para un nuevo post
const formContainer = document.createElement("form");
formContainer.id = "newPostForm";
formContainer.classList.add(
  "mt-8",
  "bg-white",
  "p-6",
  "rounded-lg",
  "shadow-md"
);

const formTitle = document.createElement("h2");
formTitle.textContent = "Crear Nuevo Post";
formTitle.classList.add("text-xl", "font-semibold", "mb-4", "text-gray-700");
formContainer.appendChild(formTitle);

// Input para el título del nuevo post
const postTitleInput = document.createElement("input");
postTitleInput.type = "text";
postTitleInput.id = "postTitle";
postTitleInput.placeholder = "Título del post";
postTitleInput.classList.add("w-full", "p-2", "mb-4", "border", "rounded");
postTitleInput.required = true;
formContainer.appendChild(postTitleInput);

// Textarea para el contenido del nuevo post
const postContentTextarea = document.createElement("textarea");
postContentTextarea.id = "postContent";
postContentTextarea.placeholder = "Contenido del post";
postContentTextarea.classList.add("w-full", "p-2", "mb-4", "border", "rounded");
postContentTextarea.rows = 4;
postContentTextarea.required = true;
formContainer.appendChild(postContentTextarea);

// Botón para publicar el nuevo post
const postSubmitButton = document.createElement("button");
postSubmitButton.type = "submit";
postSubmitButton.textContent = "Publicar";
postSubmitButton.classList.add(
  "bg-blue-500",
  "text-white",
  "px-4",
  "py-2",
  "rounded",
  "hover:bg-blue-600",
  "transition"
);
formContainer.appendChild(postSubmitButton);

// Añadir el formulario al contenedor principal
appContainer.appendChild(formContainer);

// Función para renderizar los posts
function renderPosts() {
  postsContainer.innerHTML = ""; // Limpiar el contenedor de posts

  posts.forEach((post) => {
    // Crear el elemento de cada post
    const postElement = document.createElement("div");
    postElement.classList.add("bg-white", "p-6", "rounded-lg", "shadow-md");

    // Título del post
    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;
    postTitle.classList.add(
      "text-xl",
      "font-semibold",
      "mb-2",
      "text-gray-800"
    );
    postElement.appendChild(postTitle);

    // Contenido del post
    const postContent = document.createElement("p");
    postContent.textContent = post.content;
    postContent.classList.add("text-gray-600", "mb-4");
    postElement.appendChild(postContent);

    // Sección de comentarios
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments", "space-y-2");

    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("bg-gray-50", "p-3", "rounded");
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });

    postElement.appendChild(commentsContainer);

    // Formulario de comentarios
    const commentForm = document.createElement("form");
    commentForm.classList.add("mt-4", "comment-form");
    commentForm.dataset.postId = post.id;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Añade un comentario";
    commentInput.classList.add("w-full", "p-2", "border", "rounded");
    commentForm.appendChild(commentInput);

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.type = "submit";
    commentSubmitButton.textContent = "Comentar";
    commentSubmitButton.classList.add(
      "mt-2",
      "bg-gray-200",
      "text-gray-700",
      "px-3",
      "py-1",
      "rounded",
      "hover:bg-gray-300",
      "transition"
    );
    commentForm.appendChild(commentSubmitButton);

    postElement.appendChild(commentForm);

    // Añadir el post al contenedor de posts
    postsContainer.appendChild(postElement);
  });
}

// Manejador para crear un nuevo post
formContainer.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = postTitleInput.value;
  const content = postContentTextarea.value;

  if (title && content) {
    posts.unshift({
      id: Date.now(),
      title,
      content,
      comments: [],
    });
    renderPosts();
    this.reset();
  }
});

// Manejador para añadir comentarios
postsContainer.addEventListener("submit", function (e) {
  if (e.target.classList.contains("comment-form")) {
    e.preventDefault();
    const postId = parseInt(e.target.dataset.postId);
    const commentInput = e.target.querySelector("input");
    const comment = commentInput.value;

    if (comment) {
      const post = posts.find((p) => p.id === postId);
      post.comments.push(comment);
      renderPosts();
      commentInput.value = "";
    }
  }
});

// Renderizar los posts iniciales
renderPosts();
bodyforum.appendChild(miembros);
bodyforum.appendChild(appContainer);
