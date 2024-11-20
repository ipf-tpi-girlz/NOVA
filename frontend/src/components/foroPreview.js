import { createComent } from "../api/comments.postC";
import { fetchComunity } from "../api/comunity"
import { createPost } from "../api/post.community";
import { showNotification } from "./notification";

export const forop = (id) => {
  const container = document.createElement("div");
  container.classList.add("flex", "gap-4", "bg-base-100", "bg-cover", "min-h-screen", "p-4");

  const createPostSection = document.createElement("div");
  createPostSection.classList.add("flex", "flex-col", "w-1/3", "p-5");
  createPostSection.appendChild(newPost(id));

  const postsSection = document.createElement("div");
  postsSection.classList.add("flex", "flex-col", "w-2/3", "p-5", "overflow-y-auto", "max-h-screen");

  // Mensaje de bienvenida
  const welcomeMessage = document.createElement("div");
  welcomeMessage.classList.add("mb-6", "text-center", "p-4", "bg-base", "rounded-lg", "shadow-md", "border", "border-gray-200");
  welcomeMessage.innerHTML = `
    <h1 class="text-2xl font-serif text-base-800 mb-2">Espacio Seguro 💜</h1>
    <p class="text-base-600">Este es un lugar de apoyo y comprensión. Tu voz importa y estás a salvo aquí.</p>
  `;
  postsSection.appendChild(welcomeMessage);

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

const renderPosts = (id) => {
  return fetchComunity(id).then((data) => {
    const postsContainer = document.createElement("div");
    postsContainer.innerHTML = '';
    console.log(data)
    const publicaciones = data.community.publicaciones;

    if (publicaciones.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.classList.add("text-center", "p-8", "bg-base", "border", "border-gray-200", "rounded-lg", "shadow-md");
      emptyState.innerHTML = `
        <div class="text-6xl mb-4">🫂</div>
        <h3 class="text-xl font-serif text-base-800 mb-2">Aún no hay publicaciones</h3>
        <p class="text">Sé la primera persona en compartir tu historia. Estamos aquí para escucharte y apoyarte 💜</p>
      `;
      postsContainer.appendChild(emptyState);
      return postsContainer;
    }

    publicaciones.forEach((post) => {
      const postContainer = document.createElement("div");
      postContainer.classList.add(
        "post",
        "p-5",
        "mb-5",
        "bg-base",
        "rounded-lg",
        "shadow-xl",
        "border",
        "border-gray-200",
        "transition-transform",
        "duration-200",
        "hover:transform",
        "hover:scale-[1.01]"
      );

      const user = document.createElement("div");
      user.classList.add("flex", "items-center", "gap-3");
      const imgProfile = document.createElement("img");
      imgProfile.src = post.usuario.img || 'https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg';
      imgProfile.classList.add("rounded-full", "w-10", "h-10", "border-2", "border-purple-200");
      const nameUser = document.createElement("h6");
      nameUser.textContent = post.usuario.nombre;
      nameUser.classList.add("font-serif", "text-base-800");
      user.appendChild(imgProfile);
      user.appendChild(nameUser);

      const postContent = document.createElement("div");
      postContent.classList.add("post-content", "mt-4", "max-h-60", "overflow-y-auto");
      const title = document.createElement("h1");
      title.textContent = post.titulo;
      title.classList.add("text-xl", "font-serif", "text-base-800", "text-center", "mb-3");
      const desc = document.createElement("p");
      desc.textContent = post.contenido;
      desc.classList.add("text", "leading-relaxed");

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

      const commentsContainer = document.createElement("div");
      commentsContainer.classList.add(
        "comments",
        "overflow-y-auto",
        "flex-col",
        "gap-3",
        "max-h-80", // Ajustar el tamaño de los comentarios
        "transition-all",
        "duration-300"
      );

      // Mostrar comentarios existentes
      post.comentarios.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add(
          "comment",
          "bg-purple-50",
          "rounded-lg",
          "transition-colors",
          "duration-200",
          "hover:bg-purple-100"
        );

        const user = document.createElement("div");
        user.classList.add("flex", "gap-3", "items-center");
        const imgComment = document.createElement("div");
        imgComment.style.backgroundImage = `url(${comment.usuario.img || "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg"})`;
        imgComment.classList.add("w-8", "h-8", "bg-cover", "rounded-full", "border-2", "border-purple-200");
        const nameU = document.createElement("h5");
        nameU.textContent = comment.usuario.nombre;
        nameU.classList.add("font-serif", "text-base-800");

        const commentText = document.createElement("p");
        commentText.textContent = comment.contenido;
        commentText.classList.add("text", "pl-11");

        user.appendChild(imgComment);
        user.appendChild(nameU);
        commentElement.appendChild(user);
        commentElement.appendChild(commentText);
        commentsContainer.appendChild(commentElement);
      });

      const newCommentContainer = document.createElement("div");
      newCommentContainer.classList.add("flex", "gap-3", "items-center", "mt-4"); // Asegurar que el formulario esté separado de los comentarios
      const newComment = document.createElement("input");
      newComment.placeholder = "Escribe un comentario...";
      newComment.classList.add("border", "border-gray-200", "rounded", "bg-base-100", "w-full", "px-4", "py-2", "rounded-lg");
      const newCommentButton = document.createElement("button");
      newCommentButton.textContent = "";

      const icon = document.createElement("svg");
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>`;
      newCommentButton.appendChild(icon);
      newCommentButton.classList.add("text", "px-2", "py-2", "rounded-full", "hover:shadow-lg");

      newCommentContainer.appendChild(newComment);
      newCommentContainer.appendChild(newCommentButton);
      commentsContainer.appendChild(newCommentContainer);

      const id = post.id;
      // Evento para agregar nuevo comentario
      newCommentButton.addEventListener("click", async () => {
        const content = newComment.value;
        if (content.trim() === "") {
          return showNotification("error", "No puedes enviar comentarios vacios");
        }
        try {
          await createComent(id, content);
          window.location.reload();
        } catch (error) {
          showNotification("error", error.message);
        }
      });

      // Botón para alternar visibilidad de los comentarios
      const toggleCommentsBtn = document.createElement("button");
      toggleCommentsBtn.textContent = " ";
      const iconComments = document.createElement("svg");
      iconComments.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>`;

      toggleCommentsBtn.appendChild(iconComments);
      toggleCommentsBtn.classList.add("toggle-comments", "text-purple-600", "mt-4", "hover:underline");
      const iconNoComment = document.createElement("svg");
      iconNoComment.innerHTML = ` 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>

      `
      toggleCommentsBtn.addEventListener("click", () => {
        const isHidden = commentsContainer.classList.contains("hidden");
        commentsContainer.classList.toggle("hidden", !isHidden);
        toggleCommentsBtn.textContent = isHidden ? "" : "";
        toggleCommentsBtn.appendChild(isHidden ? iconNoComment : iconNoComment, isHidden ? iconComments : iconNoComment)
      });

      postContainer.appendChild(user);
      postContainer.appendChild(postContent);
      postContainer.appendChild(toggleCommentsBtn);
      postContainer.appendChild(commentsContainer);
      postsContainer.appendChild(postContainer);
    });


    return postsContainer;
  });
};




const renderMembers = (id) => {
  return fetchComunity(id).then((data) => {
    const moderador = data.moderador.nombre;
    const data2 = data.community.participantes;
    const membersContainer = document.createElement("div");
    membersContainer.classList.add(
      "p-5",
      "bg-base",
      "rounded-lg",
      "shadow-xl",
      "flex",
      "flex-col",
      "gap-3",
      "h-fit",
      "border",
      "border-gray-200"
    );

    const moderator = document.createElement("div");
    moderator.innerHTML = `<span class="text-base-800">👋 Moderador:</span> ${moderador}`;
    moderator.className = "font-serif font-bold";

    const divider = document.createElement("div");
    divider.className = "divider";

    const members = document.createElement("div");
    members.innerHTML = "💜 Miembros de la comunidad";
    members.className = "font-serif font-bold text";

    const membersList = document.createElement("ul");
    membersList.className = "space-y-2";
    data2.forEach((member) => {
      const memberItem = document.createElement("li");
      memberItem.classList.add("flex", "items-center", "gap-2", "text");
      memberItem.innerHTML = `
        <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
        ${member.usuario.nombre}
      `;
      membersList.appendChild(memberItem);
    });

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
    "bg-base",
    "rounded-lg",
    "shadow-xl",
    "flex",
    "flex-col",
    "gap-3",
    "shadow-xl",
    "border",
    "border-gray-200"
  );

  const newPostTitle = document.createElement("h2");
  newPostTitle.innerHTML = "Comparte tu historia 💜";
  newPostTitle.classList.add("text-xl", "font-serif", "text-base-800", "text-center");

  const supportMessage = document.createElement("p");
  supportMessage.textContent = "Este es un espacio seguro para compartir. Tu experiencia puede ayudar a otras personas.";
  supportMessage.classList.add("text", "text-sm", "text-center", "mb-2");

  const newPostTitleInput = document.createElement("input");
  newPostTitleInput.type = "text";
  newPostTitleInput.id = "postTitle";
  newPostTitleInput.placeholder = "Título de tu publicación";
  newPostTitleInput.classList.add(
    "input",
    "border",
    "border-gray-300",
    "focus:border-purple-400",
    "focus:ring-purple-400",
    "transition-colors",
    "duration-200"
  );
  newPostTitleInput.required = true;

  const newPostTextArea = document.createElement("textarea");
  newPostTextArea.id = "postContent";
  newPostTextArea.placeholder = "Comparte tu experiencia...";
  newPostTextArea.classList.add(
    "textarea",
    "border",
    "border-gray-200",
    "focus:border-purple-400",
    "focus:ring-purple-400",
    "transition-colors",
    "duration-200"
  );
  newPostTextArea.rows = 4;
  newPostTextArea.required = true;

  const newPostButton = document.createElement("button");
  newPostButton.type = "submit";
  newPostButton.innerHTML = "Publicar 💜";
  newPostButton.classList.add(
    "btn",
    "bg-primary",
    "text",
    "hover:shadow-lg",
    "transition-colors",
    "duration-200",
    "font-serif"
  );

  newPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = newPostTitleInput.value;
    const contenido = newPostTextArea.value;

    if (titulo && contenido) {
      const data = {
        titulo,
        contenido,
      }
      await createPost(id, data);
      newPostTitleInput.value = "";
      newPostTextArea.value = "";
      showNotification("success", "Publicación creada con exito.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      showNotification("error", "Debe llenar todos los campos.");
    }

  });

  newPostForm.appendChild(newPostTitle);
  newPostForm.appendChild(supportMessage);
  newPostForm.appendChild(newPostTitleInput);
  newPostForm.appendChild(newPostTextArea);
  newPostForm.appendChild(newPostButton);

  return newPostForm;
};