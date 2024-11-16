import { fetchComunity } from "../api/comunity"
export const forop = (id) => {
  const container = document.createElement("div");
  container.classList.add("flex");

  const createPostSection = document.createElement("div");
  createPostSection.classList.add("flex", "flex-col", "w-1/3", "p-5");
  createPostSection.appendChild(newPost(id)); //!id de la comunidad

  const postsSection = document.createElement("div");
  postsSection.classList.add("flex", "flex-col", "w-2/3", "p-5");

  renderPosts(id).then((data) => {
    postsSection.appendChild(data);
  });

  const membersSection = document.createElement("div");
  membersSection.classList.add("w-1/5", "p-5");

  renderMembers(id).then((data) => {
    membersSection.appendChild(data);
  });

  container.appendChild(createPostSection);
  container.appendChild(postsSection);
  container.appendChild(membersSection);

  return container;
};

//!Función que retorna el formulario para crear un nuevo post

const renderPosts = (id) => {
  return fetchComunity(id).then((data) => {
    const postsContainer = document.createElement("div");
    postsContainer.innerHTML = '';

    const publicaciones = data.community.publicaciones;
    publicaciones.forEach((post) => {
      const postContainer = document.createElement("div");
      postContainer.classList.add("post", "p-5", "mb-5", "bg-base-200", "rounded-lg");

      //* Usuario
      const user = document.createElement("div");
      user.classList.add("flex", "items-center", "gap-3");

      const imgProfile = document.createElement("img");
      imgProfile.src = post.usuario.img || 'default-https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg';
      imgProfile.classList.add("rounded-full", "w-10", "h-10");

      const nameUser = document.createElement("h6");
      nameUser.textContent = post.usuario.nombre;
      nameUser.classList.add("font-semibold");

      user.appendChild(imgProfile);
      user.appendChild(nameUser);

      //* Post
      const postContent = document.createElement("div");
      postContent.classList.add("post-content", "mt-4");

      const title = document.createElement("h1");
      title.textContent = post.titulo;
      title.classList.add("text-xl", "font-semibold", "text-center");

      const desc = document.createElement("p");
      desc.textContent = post.contenido;
      desc.classList.add("text-gray-700");

      if (post.img) {
        const img = document.createElement("div");
        img.style.backgroundImage = `url(${post.img})`;
        img.classList.add("post-image", "mt-3", "h-40", "bg-cover", "rounded-lg");
        postContent.appendChild(title);
        postContent.appendChild(desc);
        postContent.appendChild(img);
      } else {
        postContent.appendChild(title);
        postContent.appendChild(desc);
      }

      //* Comentarios
      const commentsContainer = document.createElement("div");
      const divider = document.createElement("div");
      divider.classList.add("divider", "m-1");
      commentsContainer.classList.add("comments", "flex");

      post.comentarios.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment", "bg-base-100", "p-3", "rounded-lg", "mb-3");

        const user = document.createElement("div");
        user.classList.add("flex", "gap-3");

        const imgComment = document.createElement("div");
        imgComment.style.backgroundImage = `url(${comment.usuario.img || "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg"})`;
        imgComment.classList.add("comment-image", "w-10", "h-10", "bg-cover", "rounded-full");

        const nameU = document.createElement("h5");
        nameU.textContent = comment.usuario.nombre; // Nombre del usuario que comentó
        nameU.classList.add("font-medium");

        const commentText = document.createElement("p");
        commentText.textContent = comment.contenido;
        commentText.classList.add("text-gray-600");

        commentElement.appendChild(nameU);
        commentElement.appendChild(commentText);
        user.appendChild(imgComment);
        commentsContainer.appendChild(user);
        commentsContainer.appendChild(divider);
        commentsContainer.appendChild(commentElement);

        const comentarContainer = document.createElement("div");
        comentarContainer.classList.add("flex", "gap-3");

        const comentarInput = document.createElement("input");
        comentarInput.type = "text";
        comentarInput.placeholder = "Comentar...";
        comentarInput.classList.add("input", "input-bordered", "w-full");

        const comentarButton = document.createElement("button");
        comentarButton.textContent = "Comentar";
        comentarButton.classList.add("btn", "btn-primary");

        comentarContainer.appendChild(comentarInput);
        comentarContainer.appendChild(comentarButton);
      });

      //* Agregar todo al contenedor de post
      postContainer.appendChild(user);
      postContainer.appendChild(postContent);
      postContainer.appendChild(commentsContainer);

      postsContainer.appendChild(postContainer);
    });

    return postsContainer;
  });
};

const renderMembers = (id) => {
  return fetchComunity(id).then((data) => {
    console.log(data);

    const moderador = data.moderador.nombre;
    const data2 = data.community.participantes;

    const membersContainer = document.createElement("div");
    membersContainer.classList.add(
      "p-5",
      "bg-base-200",
      "rounded-lg",
      "flex",
      "flex-col",
      "gap-3",
      "h-fit"
    );

    const moderator = document.createElement("div");
    moderator.textContent = `Moderador: ${moderador}`;
    moderator.className = "font-serif font-bold";


    // Divisor
    const divider = document.createElement("div");
    divider.className = "divider";

    const members = document.createElement("div");
    members.textContent = "Miembros";
    members.className = "font-serif font-bold";

    const membersList = document.createElement("ul");
    membersList.className = "list-disc pl-4";

    data2.forEach((member) => {
      const memberItem = document.createElement("li");
      memberItem.textContent = member.usuario.nombre;
      membersList.appendChild(memberItem);
    });

    // Agregar los elementos al contenedor
    membersContainer.appendChild(moderator);
    membersContainer.appendChild(divider);
    membersContainer.appendChild(members);
    membersContainer.appendChild(membersList);

    return membersContainer;
  });
};

export const newPost = (id) => {

  const newPostForm = document.createElement("form");
  newPostForm.classList.add(
    "p-5",
    "border",
    "border-gray-200",
    "bg-base-200",
    "rounded-lg",
    "flex",
    "flex-col",
    "gap-3",
    "shadow-2xl"
  );

  // Título
  const newPostTitle = document.createElement("h2");
  newPostTitle.textContent = "Publicar";
  newPostTitle.classList.add("text-xl", "font-semibold", "font-serif");

  // Input para el título del nuevo post
  const newPostTitleInput = document.createElement("input");
  newPostTitleInput.type = "text";
  newPostTitleInput.id = "postTitle";
  newPostTitleInput.placeholder = "Título";
  newPostTitleInput.classList.add("input", "border", "border-gray-200", "shadow-md");
  newPostTitleInput.required = true;

  // Textarea para el contenido del nuevo post
  const newPostTextArea = document.createElement("textarea");
  newPostTextArea.id = "postContent";
  newPostTextArea.placeholder = "Contenido";
  newPostTextArea.classList.add("textarea", "border", "border-gray-200", "shadow-md");
  newPostTextArea.rows = 4;
  newPostTextArea.required = true;

  // Botón para publicar el nuevo post
  const newPostButton = document.createElement("button");
  newPostButton.type = "submit";
  newPostButton.textContent = "Publicar";
  newPostButton.classList.add("btn", "border", "border-gray-200", "bg-base-100", "shadow-lg", "font-serif", "hover:bg-base-200");

  newPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //!usamos el id del parametro
  })

  // Agregar inputs al formulario
  newPostForm.appendChild(newPostTitle);
  newPostForm.appendChild(newPostTitleInput);
  newPostForm.appendChild(newPostTextArea);
  newPostForm.appendChild(newPostButton);

  return newPostForm;
};
