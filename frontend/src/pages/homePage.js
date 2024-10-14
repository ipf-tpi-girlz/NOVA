import comment from "../assets/comment.svg";

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

export const homePage = () => {
  const containerHome = document.createElement("div");
  containerHome.classList.add("mx-5", "flex", "flex-col", "gap-3");

  const containerMain = document.createElement("div");
  containerMain.classList.add("flex", "gap-5", "mx-14");

  const titulo = document.createElement("h1");
  titulo.innerText = "NOVA";
  titulo.classList.add(
    "text-5xl",
    "font-bold",
    "text-center",
    "font-serif",
    "p-10",
    "bg-base-200"
  );

  const containerPost = document.createElement("div");
  containerPost.classList.add("flex", "flex-col", "gap-6", "mx-auto");

  const containerArticulo = document.createElement("div");
  containerArticulo.classList.add("flex", "flex-col");

  //Card
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
  containerArticulo.appendChild(card);

  // Posts

  function renderPosts() {
    const postsContainer = document.createElement("div");
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

      const commentSubmitButton = document.createElement("button");
      commentSubmitButton.type = "submit";
      commentSubmitButton.innerHTML = comment;
      commentSubmitButton.classList.add("btn", "btn-primary");
      commentForm.appendChild(commentSubmitButton);

      postElement.appendChild(commentForm);

      // Añadir el post al contenedor de posts
      containerPost.appendChild(postElement);
    });
  }
  renderPosts();

  //Appends
  containerHome.appendChild(titulo);
  containerMain.appendChild(containerPost);
  containerMain.appendChild(containerArticulo);
  containerHome.appendChild(containerMain);

  return containerHome;
};
