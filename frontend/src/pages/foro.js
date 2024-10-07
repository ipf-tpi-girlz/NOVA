export const foro = () => {
  const containerforo = document.createElement("div");
  containerforo.classList.add("min-h-screen");
  const title = document.createElement("h1");
  title.classList.add(
    "text-4xl",
    "font-bold",
    "font-serif",
    "text-center",
    "p-12"
  );
  title.textContent = "Mis foros";

  const containermisforos = document.createElement("div");
  containermisforos.classList.add(
    "hero-content",
    "flex-col",
    "lg:flex-row",
    "gap-40"
  );
  const containerA = document.createElement("div");
  containerA.classList.add("flex-col", "self-center", "lg:self-start");
  const subbtitulo = document.createElement("h6");
  subbtitulo.textContent = "Mis Foros";

  const container = document.createElement("div");
  container.classList.add("max-w-[500px]", "mx-auto");

  // Crear la tarjeta (card)
  const card = document.createElement("div");
  card.classList.add(
    "relative",
    "flex",
    "flex-col",
    "mt-6",
    "text-gray-700",
    "bg-white",
    "shadow-md",
    "bg-clip-border",
    "rounded-xl",
    "w-72"
  );

  // Imagen de la tarjeta
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add(
    "relative",
    "h-56",
    "mx-4",
    "-mt-6",
    "overflow-hidden",
    "text-white",
    "shadow-lg",
    "bg-clip-border",
    "rounded-xl",
    "bg-blue-gray-500",
    "shadow-blue-gray-500/40"
  );

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600";
  img.alt = "card-image";
  imgWrapper.appendChild(img);

  // Contenido de la tarjeta
  const cardContent = document.createElement("div");
  cardContent.classList.add("p-6");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add(
    "block",
    "mb-2",
    "font-sans",
    "text-xl",
    "antialiased",
    "font-semibold",
    "leading-snug",
    "tracking-normal"
  );
  cardTitle.textContent = "Manos Unidas";

  const cardText = document.createElement("p");
  cardText.classList.add(
    "block",
    "font-sans",
    "antialiased",
    "font-light",
    "leading-relaxed",
    "text-inherit"
  );
  cardText.textContent =
    "Somos una comunidad en busca de la sanacion al trauma, un espacio para poder expresarte e interactuar con otros que han pasado lo mismo.";

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardText);

  // Botón de la tarjeta
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("p-6", "pt-0");

  const button = document.createElement("button");
  button.classList.add(
    "align-middle",
    "select-none",
    "font-sans",
    "font-bold",
    "text-center",
    "uppercase",
    "transition-all",
    "disabled:opacity-50",
    "disabled:shadow-none",
    "disabled:pointer-events-none",
    "text-xs",
    "py-3",
    "px-6",
    "rounded-lg",
    "bg-gray-900",
    "text-white",
    "shadow-md",
    "shadow-gray-900/10",
    "hover:shadow-lg",
    "hover:shadow-gray-900/20",
    "focus:opacity-[0.85]",
    "focus:shadow-none",
    "active:opacity-[0.85]",
    "active:shadow-none"
  );
  button.type = "button";
  button.textContent = "Ver más";

  buttonWrapper.appendChild(button);

  // Ensamblar todo
  card.appendChild(imgWrapper);
  card.appendChild(cardContent);
  card.appendChild(buttonWrapper);

  container.appendChild(card);

  const containerB = document.createElement("div");
  containerB.classList.add("flex", "gap-20", "p-8", "mr-20");

  //Datos iniciales de posts
  const posts = [
    {
      id: 1,
      title: "Bienvenidos al foro",
      content:
        "Deja tu huella en nuestra comunidad. ¡Comenta y comparte tus pensamientos!",
      comments: [],
    },
    {
      id: 2,
      title: "Tema del día: exposicion social",
      content: "¿Como llevas el salir de tu zona de comfort?",
      comments: [],
    },
  ];

  //Crear el título del foro
  const appContainer = document.createElement("div");

  const forumTitle = document.createElement("h1");
  forumTitle.textContent = "Manos Unidas";
  forumTitle.classList.add(
    "text-3xl",
    "font-semibold",
    "mb-6",
    "text-center",
    "text-gray-800"
  );
  appContainer.appendChild(forumTitle);

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
  postContentTextarea.classList.add(
    "w-full",
    "p-2",
    "mb-4",
    "border",
    "rounded"
  );
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

  containerA.appendChild(subbtitulo);
  containerA.appendChild(container);
  containerB.appendChild(appContainer);
  containermisforos.appendChild(containerA);
  containermisforos.appendChild(containerB);

  containerforo.appendChild(title);
  containerforo.appendChild(containermisforos);

  return containerforo;
};
