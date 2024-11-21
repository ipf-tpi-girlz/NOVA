//Datos iniciales de posts
const posts = [
  {
    id: 1,
    title: "Mi amigo ya no es el mismo",
    content:
      "He notado que mi amigo está diferente: evita salir, ya no habla con nosotros como antes y parece siempre nervioso o triste. Me preocupa que esté pasando por algo difícil, tal vez en su relación. No sé cómo acercarme sin incomodarlo, pero quiero que sepa que estoy aquí para él.",
  },
  {
    id: 2,
    title: "¿Estoy exagerando?",
    content:
      "El otro día discutí con mi pareja porque actúa raro cada vez que salgo con amigos. Se enoja y me insulta, o suelta comentarios sarcásticos como si todo lo que hago estuviera mal. Dice que estoy exagerando y que lo hace porque le importo, pero no puedo evitar sentirme mal cada vez que pasa.",
  },
  {
    id: 3,
    title: "Tema del día: exposicion social",
    content: "¿Como llevas el salir de tu zona de comfort?",
  },
  {
    id: 4,
    title: "Separacion y soledad",
    content:
      "Sali de una relacion toxica, donde sufria de violencia psicologica y fisica, pero no puedo acostumbrarmey hay veces que extraño a mi ex pareja. ¿Que me recomiendan hacer?",
  },
];

export function PostsFeed() {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || {};

  const postsContainer = document.createElement("div");
  postsContainer.className = "flex flex-col gap-3";
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    // Crear el elemento de cada post
    const postElement = document.createElement("div");
    postElement.classList.add("bg-base-200", "p-6", "rounded-lg", "shadow-md");

    // Título del post
    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;
    postTitle.classList.add("text-xl", "font-serif", "font-semibold", "mb-2");
    postElement.appendChild(postTitle);

    // Contenido del post
    const postContent = document.createElement("p");
    postContent.textContent = post.content;
    postContent.classList.add("mb-4", "font-serif");
    postElement.appendChild(postContent);

    const input = document.createElement("input");
    input.className = "input";
    input.placeholder = "Escribe tu comentario aqui";

    const commentsList = document.createElement("div");
    commentsList.classList.add(
      "comments-list",
      "mt-4",
      "space-y-2",
      "font-serif"
    );
    postElement.appendChild(commentsList);

    // Formulario de comentarios
    const commentForm = document.createElement("form");
    commentForm.classList.add("mt-4", "flex", "gap-3", "comment-form");
    commentForm.dataset.postId = post.id;

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Añade un comentario";
    commentInput.classList.add("input", "w-full", "font-serif");
    commentForm.appendChild(commentInput);

    const commentSubmitButton = document.createElement("button");
    commentSubmitButton.type = "submit";
    commentSubmitButton.innerHTML = `<span class = "material-symbols-rounded !text-2xl">comment</span>`;
    commentSubmitButton.classList.add("btn", "btn-primary");
    commentForm.appendChild(commentSubmitButton);

    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Capturar el texto del comentario
      const commentText = commentInput.value.trim();
      if (commentText) {
        // Crear un nuevo comentario
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment", "bg-base-300", "p-2", "rounded");
        commentItem.textContent = commentText;

        const currentComments = savedComments[post.id] || [];
        currentComments.push(commentText);
        savedComments[post.id] = currentComments;
        localStorage.setItem("comments", JSON.stringify(savedComments));

        // Añadir el comentario al contenedor correspondiente
        commentsList.appendChild(commentItem);

        // Limpiar el campo de entrada
        commentInput.value = "";
      }
    });
    postElement.appendChild(commentForm);

    // Añadir el post al contenedor de posts
    postsContainer.appendChild(postElement);
  });

  return postsContainer;
}
