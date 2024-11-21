import { ForumCard, ArticleCard, PostsFeed } from "./index";
import { fetchComunities } from "../api/comunity"
import { showNotification } from "./notification";
import { fetchArticles } from "../api/articles";
export function Feed() {
  //Contenedor del feed
  const containerFeed = document.createElement("div");
  containerFeed.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2";

  //Divisor
  const divider = document.createElement("div");
  divider.className = "divider m-0";

  //Contenedor de los posts
  const containerPost = document.createElement("div");
  containerPost.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "items-center",
    "lg:items-start"
  );
  //Titulo
  const postsTitle = document.createElement("h1");
  postsTitle.className = "text-lg font-semibold font-serif";
  postsTitle.textContent = "ÚlTIMAS PUBLICACIONES";

  containerPost.appendChild(postsTitle);
  containerPost.appendChild(divider.cloneNode(true));
  containerPost.appendChild(PostsFeed());

  //Contenedor de los foros
  const containerForums = document.createElement("div");
  containerForums.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "lg:items-start",
    "gap-2"
  );



  //Titulo
  const forumstTitle = document.createElement("h1");
  forumstTitle.className = "text-base font-semibold mb-2 font-serif";
  forumstTitle.textContent = "FOROS POPULARES";

  containerForums.appendChild(forumstTitle);
  containerForums.appendChild(divider.cloneNode(true));

  const articleTitle = document.createElement("h1");
  articleTitle.className = "text-lg font-semibold font-serif";
  articleTitle.textContent = "ÚLTIMOS ARTÍCULOS";

  const articleContainer = document.createElement("div");
  articleContainer.id = "publicaciones-container";
  articleContainer.className =
    "flex flex-col gap-2 items-center lg:items-start";

  // Agregar título y divisor al principio
  articleContainer.appendChild(articleTitle);
  articleContainer.appendChild(divider.cloneNode(true));

  const loadData = async () => {
    try {
      const data = await fetchArticles();

      // No limpiar todo el contenido, solo agregar los artículos después del título
      loadArticles(data);
    } catch (error) {
      showNotification("Error al cargar las publicaciones:", error);
    }
  };

  // Función para cargar artículos
  const loadArticles = (data) => {
    const publicacionesContainer = document.getElementById("publicaciones-container");
    const articlesContainer = publicacionesContainer.querySelector('.articles-container');
    if (articlesContainer) {
      articlesContainer.innerHTML = '';
    } else {
      const newArticlesContainer = document.createElement("div");
      newArticlesContainer.classList.add('articles-container');
      publicacionesContainer.appendChild(newArticlesContainer);
    }

    if (data && data.length > 0) {
      const limitedData = data.slice(0, 2);
      limitedData.forEach((art) => {
        const card = createArticleCard(art);
        publicacionesContainer.querySelector('.articles-container').appendChild(card);
      });
    } else {
      publicacionesContainer.appendChild(NoContent());
    }
  };

  loadData();



  //!CASI
  const createArticleCard = (art) => {
    const user = art.usuario;

    const card = document.createElement("div");
    card.classList.add(
      "bg-base-200",
      "rounded-xl",
      "shadow-md",
      "overflow-hidden",
      "transition-all",
      "duration-300",
      "hover:shadow-xl",
      "hover:-translate-y-1",
      "group",
      "cursor-pointer",
      "border",
      "border-gray-100",
      "flex",
      "flex-col",
      "w-full",
      "max-w-lg",
      "h-auto",
      "mb-4"
    );

    // Header con foto de usuario y nombre
    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add(
      "flex",
      "items-center",
      "gap-3",
      "p-4",
      "border-b",
      "border-gray-100"
    );

    const userImageWrapper = document.createElement("div");
    userImageWrapper.classList.add("w-14", "h-14", "rounded-full", "overflow-hidden");

    const userImage = document.createElement("img");
    userImage.classList.add("w-full", "h-full", "object-cover");
    userImage.src = user && user.img
      ? user.img
      : "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg";

    userImageWrapper.appendChild(userImage);

    const userName = document.createElement("div");
    userName.classList.add("flex-grow", "font-semibold", "text");
    userName.textContent = user && user.nombre ? user.nombre : "Usuario anónimo";

    headerWrapper.append(userImageWrapper, userName);
    card.appendChild(headerWrapper);

    // Contenido principal
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("p-6", "space-y-4", "flex-grow");  // Agregado 'flex-grow' para evitar el espacio vacío

    const textContent = document.createElement("div");

    const title = document.createElement("h3");
    title.classList.add(
      "text-2xl",  // Aumento el tamaño del título
      "font-semibold",
      "mb-2",
      "text",
      "group-hover:text-primary",
      "transition-colors",
      "duration-300"
    );
    title.textContent = art.nombre || "Sin título";

    const description = document.createElement("p");
    description.classList.add("text-sm", "text");
    description.textContent = art.desc || "Sin descripción disponible.";

    textContent.append(title, description);
    contentWrapper.appendChild(textContent);

    // Fecha de creación
    if (art.createdAt) {
      const metadata = document.createElement("div");
      metadata.classList.add("flex", "items-center", "text-xs", "text");
      metadata.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        ${formatDate(art.createdAt)}
      `;
      contentWrapper.appendChild(metadata);
    }

    card.appendChild(contentWrapper);

    return card;
  };




  //!nuevo
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  fetchComunities().then(data => {
    const foros = data
    console.log(foros)
    foros.forEach(e => {
      const newForum = ForumCard(
        e.id,
        e.img_perfil || "https://media.istockphoto.com/id/857146092/es/foto/mar-de-manos.jpg?s=612x612&w=0&k=20&c=7iUAtDTLL8MpCqDJXDHo8E8ZySoZqGoSTjdNJs9HXj8=",
        e.nombre,
        e.desc
      );
      console.log(e.desc)
      containerForums.appendChild(newForum);
    });
  });



  containerFeed.appendChild(containerForums);
  containerFeed.appendChild(containerPost);
  containerFeed.appendChild(articleContainer);

  return containerFeed;
}

