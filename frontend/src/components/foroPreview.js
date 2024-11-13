export const forop = () => {
  //Datos iniciales de posts
  const posts = [
    {
      id: 1,
      title: "Bienvenidos al foro",
      content:
        "Somos una comunidad en busca de la sanacion al trauma, un espacio para poder expresarte e interactuar con otros que han pasado lo mismo.",
      comments: [],
    },

    {
      id: 2,
      title: "Tema del día: exposicion social",
      content: "¿Como llevas el salir de tu zona de comfort?",
      comments: [],
    },
    {
      id: 3,
      title: "Separacion y soledad",
      content:
        "Sali de una relacion toxica, donde sufria de violencia psicologica y fisica, pero no puedo acostumbrarmey hay veces que extraño a mi ex pareja. ¿Que me recomiendan hacer?",
      comments: [],
    },
  ];

  const container = document.createElement("div");
  container.classList.add("flex", "px-10");

  //Container para el nuevo post
  const newPostContainer = document.createElement("div");
  newPostContainer.className = "p-5 gap-2";

  const newPostForm = document.createElement("form");
  newPostForm.classList.add(
    "p-5",
    "bg-base-200",
    "rounded-lg",
    "flex",
    "flex-col",
    "gap-3"
  );

  //Titulo
  const newPostTitle = document.createElement("h2");
  newPostTitle.textContent = "Crear Nuevo Post";
  newPostTitle.classList.add("text-xl", "font-semibold", "mb-4", "font-serif");

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
  newPostButton.classList.add("btn", "btn-primary", "font-serif");

  newPostForm.appendChild(newPostTitle);
  newPostForm.appendChild(newPostTitleInput);
  newPostForm.appendChild(newPostTextArea);
  newPostForm.appendChild(newPostButton);
  newPostContainer.appendChild(newPostForm);

  //Container Miembros
  const miembrosMain = document.createElement("div");
  miembrosMain.className = "p-5";
  const miembrosContainer = document.createElement("div");
  miembrosContainer.classList.add(
    "p-5",
    "bg-base-200",
    "rounded-lg",
    "flex",
    "flex-col",
    "gap-3",
    "h-fit",
    "w-52"
  );
  const moderador = document.createElement("div");
  moderador.textContent = "Moderador";
  moderador.className = "font-serif font-bold";
  const divider = document.createElement("div");
  divider.className = "divider";
  const miembros = document.createElement("div");
  miembros.textContent = "Miembros";
  miembros.className = "font-serif font-bold";

  miembrosContainer.appendChild(moderador);
  miembrosContainer.appendChild(divider);
  miembrosContainer.appendChild(miembros);
  miembrosMain.appendChild(miembrosContainer);

  //Contenedor de posts

  const postsContainer = document.createElement("div");
  postsContainer.classList.add("p-5", "flex", "flex-col", "gap-4");

  // Función para renderizar los posts
  function renderPosts() {
    postsContainer.innerHTML = ""; // Limpiar el contenedor de posts

    posts.forEach((post) => {
      // Crear el elemento de cada post
      const postElement = document.createElement("div");
      postElement.classList.add(
        "bg-base-200",
        "p-6",
        "rounded-lg",
        "shadow-md"
      );

      // Título del post
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.title;
      postTitle.classList.add("text-xl", "font-semibold", "mb-2", "font-serif");
      postElement.appendChild(postTitle);

      // Contenido del post
      const postContent = document.createElement("p");
      postContent.textContent = post.content;
      postContent.classList.add("mb-4");
      postElement.appendChild(postContent);

      // Sección de comentarios
      const commentsContainer = document.createElement("div");
      commentsContainer.classList.add("comments", "space-y-2");

      post.comments.forEach((comment) => {
        const commentContainer = document.createElement("div");
        const commentElement = document.createElement("div");
        commentElement.classList.add("bg-base-300", "p-3", "rounded-full");
        commentElement.textContent = comment;
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
      commentSubmitButton.classList.add("btn", "btn-primary", "font-serif");
      commentForm.appendChild(commentSubmitButton);

      postElement.appendChild(commentForm);

      // Añadir el post al contenedor de posts
      postsContainer.appendChild(postElement);
    });
  }

  // Manejador para crear un nuevo post
  newPostForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = newPostTitleInput.value;
    const content = newPostTextArea.value;

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

  renderPosts();

  container.appendChild(newPostContainer);
  container.appendChild(postsContainer);
  container.appendChild(miembrosMain);

  return container;
};
