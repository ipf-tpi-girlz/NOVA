//Datos iniciales de posts
const posts = [
  {
    id: 1,
    title: "Tema del día: exposicion social",
    content: "¿Como llevas el salir de tu zona de comfort?",
  },
  {
    id: 2,
    title: "Separacion y soledad",
    content:
      "Sali de una relacion toxica, donde sufria de violencia psicologica y fisica, pero no puedo acostumbrarmey hay veces que extraño a mi ex pareja. ¿Que me recomiendan hacer?",
  },
];

export function PostsFeed() {
  const postsContainer = document.createElement("div");
  postsContainer.className = "flex flex-col gap-3";
  postsContainer.innerHTML = ""; // Limpiar el contenedor de posts

  posts.forEach((post) => {
    // Crear el elemento de cada post
    const postElement = document.createElement("div");
    postElement.classList.add("bg-base-300", "p-6", "rounded-lg", "shadow-md");

    // Título del post
    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;
    postTitle.classList.add("text-xl", "font-semibold", "mb-2");
    postElement.appendChild(postTitle);

    // Contenido del post
    const postContent = document.createElement("p");
    postContent.textContent = post.content;
    postContent.classList.add("mb-4");
    postElement.appendChild(postContent);

    const commentButton = document.createElement("button");
    commentButton.innerHTML = `<span class = "material-symbols-rounded !text-2xl">comment</span>`;
    commentButton.classList.add("btn", "btn-primary");
    postElement.appendChild(commentButton);

    // Añadir el post al contenedor de posts
    postsContainer.appendChild(postElement);
  });

  return postsContainer;
}
