import { getUserProfile } from "../api/auth";
import { fetchGetForosById, fetchUpdateForo, fetchCreateForo } from "../api/foro";
import { fetchUserComunnity } from "../api/comunity";


export const HeaderProfile = () => {
  const createElementWithClasses = (tag, classes) => {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
  };

  const $main = createElementWithClasses('div', ["flex", "flex-col", "min-h-screen", "w-full", "bg-base-100", "p-8"]);
  const $container = createElementWithClasses('div', ['bg-base-200', "bg-cover", "border", "border-gray-300", 'rounded-3xl', 'shadow-xl', 'p-8', 'mb-8', 'transition-all', 'duration-300', 'hover:shadow-2xl']);
  const $header = createElementWithClasses('div', ['flex', 'items-center', 'gap-6']); // Alineación horizontal en todos los tamaños de pantalla

  // Foto de perfil
  const $img = createElementWithClasses('img', ['w-32', 'h-32', 'rounded-full', 'shadow-lg', 'border-2', 'border-purple-500']);
  $img.src = 'https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg';

  const $textContainer = createElementWithClasses('div', ['flex', 'flex-col', 'justify-start', 'text-center', 'md:text-left']);
  const $name = createElementWithClasses('h2', ['text-3xl', 'md:text-4xl', 'font-bold', 'text', 'mb-2']);
  const $bio = createElementWithClasses('p', ['text', 'mb-4', 'max-w-lg']);
  const $stats = createElementWithClasses('div', ['flex', 'gap-4', 'text-sm', 'text']);

  getUserProfile().then(user => {
    $img.src = user.img || 'https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg';
    $name.textContent = user.nombre || 'Usuario';
    $bio.textContent = user.bio || 'Bienvenido a mi perfil! 👋';

    if (user.role == "profesional") {
      fetchArticlesByUser().then(article => {
        const ArticleCount = article.data.length;
        $stats.innerHTML = `<span>📄 ${ArticleCount}</span> Artículos`;
      }).catch(error => {
        console.error("Error al obtener artículos:", error);
        $stats.innerHTML = '📄 0 Artículos';
      });
    } else {
      fetchGetForosById().then(foros => {
        const forosCount = foros.foros.length;
        $stats.innerHTML = `<span>📚 ${forosCount}</span> Publicaciones`;
      }).catch(error => {
        console.error("Error al obtener foros:", error);
        $stats.innerHTML = '📚 0 Publicaciones';
      });
    }
  }).catch(error => {
    console.error("Error al obtener el perfil del usuario:", error);
    $name.textContent = 'Usuario';
    $bio.textContent = 'Bienvenido a mi perfil! 👋';
    $stats.innerHTML = '📚 0 Publicaciones';
  });

  $textContainer.append($name, $bio, $stats);
  $header.append($img, $textContainer); // Aseguramos que la foto y el texto estén juntos
  $container.appendChild($header);

  const $columnContainer = createElementWithClasses("div", [
    "flex",
    "flex-col",
    "lg:flex-row",
    "gap-8",
  ]);

  const $leftColumn = createElementWithClasses('div', ['flex-1', 'bg-base-200', "border", "border-gray-300", 'rounded-3xl', 'shadow-lg', 'p-6', 'transition-all', 'duration-300', 'hover:shadow-xl']);
  const $leftTitleContainer = createElementWithClasses('div', ['flex', 'justify-between', 'items-center', 'mb-6']);
  const $leftTitle = createElementWithClasses('h3', ['text-2xl', 'font-bold', 'text', 'flex', 'items-center']);
  $leftTitle.innerHTML = '<svg class="w-6 h-6 mr-2 text-base-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>Mis publicaciones';


  $leftTitleContainer.append($leftTitle);
  $leftColumn.append($leftTitleContainer);

  // Crear el contenedor de publicaciones
  const $publicationContainer = createElementWithClasses('div', ['flex', 'flex-col', 'gap-4', 'mb-8']);
  $publicationContainer.id = 'publicaciones-container';

  // Función para cargar los datos
  const loadData = async () => {
    try {
      const response = await fetchGetForosById();
      const data = response.foros;
      console.log(data);

      // Limpiar el contenedor antes de cargar nuevos datos
      $publicationContainer.innerHTML = "";

      if (!data || data.length === 0) {
        $publicationContainer.appendChild(createCard("Sin contenido disponible")); // Llamamos a createCard si no hay publicaciones
      } else {
        loadArticles(data);
      }
    } catch (error) {
      console.error("Error al cargar las publicaciones:", error);
      $publicationContainer.appendChild(createCard("Error al cargar las publicaciones"));
    }
  };

  loadData()

  // Cargar los artículos
  const loadArticles = (data) => {
    console.log(data)
    data.forEach((art) => {
      console.log(art)
      const card = createPublicationCard(art);
      $publicationContainer.appendChild(card);
    });
  };

  // Crear la tarjeta de publicación
  const createPublicationCard = (art) => {
    const card = document.createElement("div");
    card.classList.add(
      "max-w-md",
      "bg-base-100",
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
      "flex-col"
    );

    // Contenedor del contenido (debajo de la imagen)
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add(
      "p-6",
      "space-y-4"
    );

    // Título y descripción del artículo
    const textContent = document.createElement("div");
    textContent.classList.add("flex-grow");

    const title = document.createElement("h3");
    title.classList.add(
      "text-xl",
      "font-semibold",
      "mb-2",
      "text",
      "group-hover:text-primary",
      "transition-colors",
      "duration-300",
      "line-clamp-2"
    );
    title.textContent = art.nombre || "Sin título";

    const description = document.createElement("p");
    description.classList.add(
      "text-sm",
      "text",
      "leading-relaxed",
      "line-clamp-3"
    );
    description.textContent = art.desc || "Sin descripción disponible.";

    textContent.append(title, description);
    contentWrapper.appendChild(textContent);
    card.appendChild(contentWrapper);

    return card;
  };

  const createCard = () => {
    const card = document.createElement("div");
    card.classList.add(
      "relative",
      "rounded-xl",
      "shadow-lg",
      "border",
      "border-gray-200",
      "bg-base-100",
      "transition-all",
      "duration-300",
      "hover:shadow-2xl",
      "cursor-pointer",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "h-[500px]",
    );

    const cardContent = document.createElement("div");
    cardContent.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "text-center",
      "max-h-full"
    );

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("height", "48");
    icon.setAttribute("width", "48");
    icon.classList.add("text-base-800", "mb-4");

    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconPath.setAttribute("stroke-linecap", "round");
    iconPath.setAttribute("stroke-linejoin", "round");
    iconPath.setAttribute("stroke-width", "2");
    iconPath.setAttribute("d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10");

    icon.appendChild(iconPath);

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "text", "mb-2");
    title.textContent = "Sin Artículos";

    const description = document.createElement("p");
    description.classList.add("text-sm", "text");
    description.textContent = "Aún no has creado articulos.";

    cardContent.append(icon, title, description);
    card.appendChild(cardContent);

    const publicacionesContainer = document.getElementById("publicaciones-container");
    publicacionesContainer.appendChild(card);
  };
  // Contenedor de comunidades con efecto glassmorphism
  const $rightColumn = createElementWithClasses('div', [
    'flex-1',
    'bg-base-200',
    'backdrop-filter',
    'backdrop-blur-lg',
    'border',
    'border-gray-200',
    'rounded-3xl',
    'shadow-lg',
    'p-6',
    'transition-all',
    'duration-500',
    'hover:shadow-2xl'
  ]);

  const $communityTitleContainer = createElementWithClasses('div', [
    'flex',
    'justify-between',
    'items-center',
    'mb-8',
    'bg-gradient-to-r',
    'from-base-100',
    'to-pink-100',
    'p-4',
    'rounded-2xl',
    'border',
    'border-gray-200'
  ]);

  const $communityTitle = createElementWithClasses('h3', [
    'text-3xl',
    'font-bold',
    'text-gray-900',
    'flex',
    'items-center',
    'gap-3',
    'text-shadow-lg',
    'w-full',
    'text-center'
  ]);
  $communityTitle.textContent = 'Mis comunidades';

  const $communitiesContainer = createElementWithClasses('div', [
    'grid',
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'gap-6',
    'animate-fadeIn'
  ]);
  // Agregamos estilos CSS para las animaciones
  const style = document.createElement('style');
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
  document.head.appendChild(style);

  $rightColumn.append($communityTitleContainer, $communitiesContainer);

  const loadCommunities = async () => {
    try {
      const data = await fetchUserComunnity();
      const communities = data && data.comunidades ? data.comunidades : [];

      if (communities.length === 0) {
        createNoCommunityCard("¡Aún no te has unido a ninguna comunidad! 🌱");
      } else {
        communities.forEach((communi, index) => {
          setTimeout(() => {
            const card = createCommunityCard(communi);
            $communitiesContainer.appendChild(card);
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
          }, index * 100);
        });
      }
    } catch (error) {
      console.error("Error al cargar las comunidades:", error);
      createNoCommunityCard("¡Ups! Hubo un error al cargar las comunidades ⚠️");
    }
  };

  const createCommunityCard = (community) => {
    const card = createElementWithClasses('div', [
      'bg-base-100',
      'rounded-2xl',
      'shadow-lg',
      'overflow-hidden',
      'w-full',
      'max-w-xs',
      'transition-all',
      'duration-300',
      'hover:shadow-2xl',
      'hover:scale-105',
      'group',
      'relative',
      'animate-fadeIn',
      'flex',
      'flex-col'
    ]);

    const content = createElementWithClasses('div', [
      'p-6',
      'space-y-3',
      'flex-grow',
      'relative',
      'z-10'
    ]);

    const cardTitle = createElementWithClasses('h4', [
      'font-semibold',
      'text-xl',
      'text-gray-900',
      'group-hover:text-purple-600',
      'transition-colors',
      'duration-300'
    ]);
    cardTitle.innerHTML = `${community.nombre || 'Comunidad'} <span class="text-sm text-purple-500">✨</span>`;

    const cardDesc = createElementWithClasses('p', [
      'text-sm',
      'text',
      'line-clamp-3',
      'group-hover:text-gray-700',
      'transition-colors',
      'duration-300'
    ]);
    cardDesc.textContent = community.desc || 'Descripción no disponible';

    const joinButton = createElementWithClasses('button', [
      'mt-4',
      'w-full',
      'px-4',
      'py-2',
      'bg-gradient-to-r',
      'from-purple-500',
      'to-pink-500',
      'text-white',
      'font-medium',
      'rounded-xl',
      'transition-all',
      'duration-300',
      'transform',
      'hover:shadow-lg',
      'hover:scale-105',
      'active:scale-95',
      'flex',
      'items-center',
      'justify-center',
      'gap-2'
    ]);
    joinButton.innerHTML = '<span>Ver mas</span>';

    joinButton.addEventListener('click', () => {
      joinButton.classList.add('animate-pulse-slow');
      sessionStorage.setItem('forumId', community.id);
      setTimeout(() => {
        window.location.href = '/forum';
      }, 300);
    });

    content.append(cardTitle, cardDesc);
    card.append(content, joinButton);

    return card;
  };

  const createNoCommunityCard = (message) => {
    const card = createElementWithClasses('div', [
      'w-full',
      'max-w-sm',
      'h-80',
      'rounded-2xl',
      'shadow-lg',
      'overflow-hidden',
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'text-center',
      'bg-gradient-to-br',
      'from-base-100',
      'to-pink-50',
      'p-8',
      'animate-float'
    ]);

    const icon = createElementWithClasses('div', [
      'text-6xl',
      'mb-4',
      'animate-pulse-slow'
    ]);
    icon.textContent = '🌟';

    const title = createElementWithClasses('h3', [
      'text-xl',
      'font-semibold',
      'text-transparent',
      'bg-clip-text',
      'bg-gradient-to-r',
      'from-purple-600',
      'to-pink-600',
      'mb-2'
    ]);
    title.textContent = '¡Explora las comunidades!';

    const description = createElementWithClasses('p', [
      'text-sm',
      'text',
      'mb-6'
    ]);
    description.textContent = message;

    const exploreButton = createElementWithClasses('button', [
      'px-6',
      'py-2',
      'bg-base-800',
      "border",
      "border-indigo-200",
      'text',
      'font-medium',
      'rounded-xl',
      'shadow-md',
      'transition-all',
      'duration-300',
      'hover:shadow-lg',
      'hover:scale-105',
      'active:scale-95'
    ]);
    exploreButton.textContent = '¡Descubre las comunidades! 🔍';

    card.append(icon, title, description, exploreButton);
    $communitiesContainer.appendChild(card);
  };

  loadCommunities();

  $columnContainer.append($leftColumn, $rightColumn);
  $main.append($container, $columnContainer);

  return $main;
};


