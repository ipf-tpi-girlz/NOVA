export const foro = () => {
  const containerforo = document.createElement("div");
  containerforo.classList.add("min-h-screen");

  const containermisforos = document.createElement("div");
  containermisforos.classList.add("hero-content", "flex-col", "lg:flex-row");
  const containerA = document.createElement("div");
  containerA.classList.add("flex-col");

  const container = document.createElement("div");
  container.classList.add("max-w-[500px]", "mx-auto");

  // Crear la tarjeta (card)
  const card = document.createElement("div");
  card.classList.add(
    "flex",
    "flex-col",
    "text-gray-700",
    "bg-base-200",
    "shadow-md",
    "bg-clip-border",
    "rounded-xl",
    "w-72"
  );

  // Imagen de la tarjeta
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add(
    "h-56",
    "m-4",
    "overflow-hidden",
    "text-white",
    "shadow-lg",
    "rounded-xl",
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
    "font-bold",
    "leading-relaxed"
  );
  cardText.textContent =
    "Somos una comunidad en busca de la sanacion al trauma, un espacio para poder expresarte e interactuar con otros que han pasado lo mismo.";

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardText);

  // Botón de la tarjeta
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("p-6", "pt-0");

  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.type = "submit";
  button.textContent = "Ver más";
  button.setAttribute = ("href", "/ManosUnidas");
  button.addEventListener("click", () => {
    window.location.href = "http://localhost:5173/ManosUnidas";
  });

  buttonWrapper.appendChild(button);

  // Ensamblar todo
  card.appendChild(imgWrapper);
  card.appendChild(cardContent);
  card.appendChild(buttonWrapper);

  container.appendChild(card);

  const containerB = document.createElement("div");
  containerB.classList.add("flex", "flex-col", "bg-blue-500");

  //Datos iniciales de posts
  const posts = [
    {
      id: 1,
      title: "Tema del día: exposicion social",
      content: "¿Como llevas el salir de tu zona de comfort?",
      comments: [],
    },
    {
      id: 2,
      title: "Separacion y soledad",
      content:
        "Sali de una relacion toxica, donde sufria de violencia psicologica y fisica, pero no puedo acostumbrarmey hay veces que extraño a mi ex pareja. ¿Que me recomiendan hacer?",
      comments: [],
    },
  ];

  ///////////////////////////////////////////////

  //Crear el título del foro
  const appContainer = document.createElement("div");
  appContainer.classList.add("bg-green-100");

  // Crear el contenedor para los posts
  const postsContainer = document.createElement("div");
  postsContainer.id = "posts";
  postsContainer.classList.add("space-y-6");
  appContainer.appendChild(postsContainer);

  // Crear el formulario para un nuevo post
  const formContainer = document.createElement("form");
  formContainer.id = "newPostForm";
  formContainer.classList.add("bg-red-700", "p-6", "rounded-lg", "shadow-md");

  // Función para renderizar los posts
  function renderPosts() {
    postsContainer.innerHTML = ""; // Limpiar el contenedor de posts

    posts.forEach((post) => {
      // Crear el elemento de cada post
      const postElement = document.createElement("div");
      postElement.classList.add(
        "bg-base-300",
        "p-6",
        "rounded-lg",
        "shadow-md"
      );

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
        commentElement.classList.add("bg-base-300", "p-3", "rounded-full");
        commentElement.textContent = comment;
        commentsContainer.appendChild(commentElement);
      });

      postElement.appendChild(commentsContainer);

      // Formulario de comentarios
      const commentForm = document.createElement("form");
      commentForm.classList.add("mt-4", "comment-form", "flex", "gap-2");
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

  containerA.appendChild(container);
  containerB.appendChild(appContainer);
  containermisforos.appendChild(containerA);
  containermisforos.appendChild(containerB);

  containerforo.appendChild(containermisforos);

  return containerforo;
};
