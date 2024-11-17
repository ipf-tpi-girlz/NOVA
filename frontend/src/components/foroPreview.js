import { fetchComunity } from "../api/comunity"

export const forop = (id) => {
  const container = document.createElement("div");
  container.classList.add("flex", "gap-4", "bg-purple-50", "min-h-screen", "p-4");

  const createPostSection = document.createElement("div");
  createPostSection.classList.add("flex", "flex-col", "w-1/3", "p-5");
  createPostSection.appendChild(newPost(id));

  const postsSection = document.createElement("div");
  postsSection.classList.add("flex", "flex-col", "w-2/3", "p-5");

  // Mensaje de bienvenida
  const welcomeMessage = document.createElement("div");
  welcomeMessage.classList.add("mb-6", "text-center", "p-4", "bg-white", "rounded-lg", "shadow-md");
  welcomeMessage.innerHTML = `
    <h1 class="text-2xl font-serif text-purple-800 mb-2">Espacio Seguro 💜</h1>
    <p class="text-gray-600">Este es un lugar de apoyo y comprensión. Tu voz importa y estás a salvo aquí.</p>
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
    const publicaciones = data.community.publicaciones;

    if (publicaciones.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.classList.add("text-center", "p-8", "bg-white", "rounded-lg", "shadow-md");
      emptyState.innerHTML = `
        <div class="text-6xl mb-4">🫂</div>
        <h3 class="text-xl font-serif text-purple-800 mb-2">Aún no hay publicaciones</h3>
        <p class="text-gray-600">Sé la primera persona en compartir tu historia. Estamos aquí para escucharte y apoyarte 💜</p>
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
        "bg-white",
        "rounded-lg",
        "shadow-md",
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
      nameUser.classList.add("font-serif", "text-purple-800");
      user.appendChild(imgProfile);
      user.appendChild(nameUser);

      const postContent = document.createElement("div");
      postContent.classList.add("post-content", "mt-4");
      const title = document.createElement("h1");
      title.textContent = post.titulo;
      title.classList.add("text-xl", "font-serif", "text-purple-900", "text-center", "mb-3");
      const desc = document.createElement("p");
      desc.textContent = post.contenido;
      desc.classList.add("text-gray-700", "leading-relaxed");

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
      const divider = document.createElement("div");
      divider.classList.add("divider", "m-1");
      commentsContainer.classList.add("comments", "flex", "flex-col", "gap-3", "mt-4");

      post.comentarios.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add(
          "comment",
          "bg-purple-50",
          "p-3",
          "rounded-lg",
          "mb-3",
          "transition-colors",
          "duration-200",
          "hover:bg-purple-100"
        );

        const user = document.createElement("div");
        user.classList.add("flex", "gap-3", "items-center", "mb-2");
        const imgComment = document.createElement("div");
        imgComment.style.backgroundImage = `url(${comment.usuario.img || "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg"})`;
        imgComment.classList.add("w-8", "h-8", "bg-cover", "rounded-full", "border-2", "border-purple-200");
        const nameU = document.createElement("h5");
        nameU.textContent = comment.usuario.nombre;
        nameU.classList.add("font-serif", "text-purple-800");

        const commentText = document.createElement("p");
        commentText.textContent = comment.contenido;
        commentText.classList.add("text-gray-600", "pl-11");

        user.appendChild(imgComment);
        user.appendChild(nameU);
        commentElement.appendChild(user);
        commentElement.appendChild(commentText);
        commentsContainer.appendChild(commentElement);
      });

      const comentarContainer = document.createElement("div");
      comentarContainer.classList.add("flex", "gap-3", "mt-4");
      const comentarInput = document.createElement("input");
      comentarInput.type = "text";
      comentarInput.placeholder = "Comparte tu apoyo...";
      comentarInput.classList.add(
        "input",
        "input-bordered",
        "w-full",
        "focus:border-purple-400",
        "focus:ring-purple-400"
      );
      const comentarButton = document.createElement("button");
      comentarButton.textContent = "Comentar";
      comentarButton.classList.add(
        "btn",
        "bg-purple-600",
        "text-white",
        "hover:bg-purple-700",
        "transition-colors",
        "duration-200"
      );
      comentarContainer.appendChild(comentarInput);
      comentarContainer.appendChild(comentarButton);
      commentsContainer.appendChild(comentarContainer);

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
    const moderador = data.moderador.nombre;
    const data2 = data.community.participantes;
    const membersContainer = document.createElement("div");
    membersContainer.classList.add(
      "p-5",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "flex",
      "flex-col",
      "gap-3",
      "h-fit"
    );

    const moderator = document.createElement("div");
    moderator.innerHTML = `<span class="text-purple-800">👋 Moderador:</span> ${moderador}`;
    moderator.className = "font-serif font-bold";

    const divider = document.createElement("div");
    divider.className = "divider";

    const members = document.createElement("div");
    members.innerHTML = "💜 Miembros de la comunidad";
    members.className = "font-serif font-bold text-purple-800";

    const membersList = document.createElement("ul");
    membersList.className = "space-y-2";
    data2.forEach((member) => {
      const memberItem = document.createElement("li");
      memberItem.classList.add("flex", "items-center", "gap-2", "text-gray-700");
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
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "flex",
    "flex-col",
    "gap-3"
  );

  const newPostTitle = document.createElement("h2");
  newPostTitle.innerHTML = "Comparte tu historia 💜";
  newPostTitle.classList.add("text-xl", "font-serif", "text-purple-800", "text-center");

  const supportMessage = document.createElement("p");
  supportMessage.textContent = "Este es un espacio seguro para compartir. Tu experiencia puede ayudar a otras personas.";
  supportMessage.classList.add("text-gray-600", "text-sm", "text-center", "mb-2");

  const newPostTitleInput = document.createElement("input");
  newPostTitleInput.type = "text";
  newPostTitleInput.id = "postTitle";
  newPostTitleInput.placeholder = "Título de tu publicación";
  newPostTitleInput.classList.add(
    "input",
    "border",
    "border-gray-200",
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
    "bg-purple-600",
    "text-white",
    "hover:bg-purple-700",
    "transition-colors",
    "duration-200",
    "font-serif"
  );

  newPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Aquí va la lógica del submit
  });

  newPostForm.appendChild(newPostTitle);
  newPostForm.appendChild(supportMessage);
  newPostForm.appendChild(newPostTitleInput);
  newPostForm.appendChild(newPostTextArea);
  newPostForm.appendChild(newPostButton);

  return newPostForm;
};