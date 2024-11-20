import { getUserProfile } from "../api/auth";
import { fetchGetForosById, fetchUpdateForo, fetchCreateForo } from "../api/foro";
import { fetchComunitiesUser } from "../api/comunity";
import { fetchArticlesByUser } from "../api/articles.js";
import { showNotification } from "../components/notification.js";
import Swal from "sweetalert2";

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

  const $buttonContainer = createElementWithClasses("div", ["flex", "gap-4"]);

  const $createButton = createElementWithClasses('button', ['bg-base-900', "border", "border-gray-300", 'text', 'py-2', 'px-4', 'rounded-full', 'text-sm', 'font-medium', 'shadow-xl', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg', 'flex', 'items-center', 'justify-center']);
  $createButton.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>Crear 📝';
  $buttonContainer.append($createButton);
  $leftTitleContainer.append($leftTitle, $buttonContainer);
  $leftColumn.append($leftTitleContainer);


  // Contenedor de comunidades con efecto glassmorphism
  const $rightColumn = createElementWithClasses('div', [
    'flex-1',
    'bg-white/80',
    'backdrop-filter',
    'backdrop-blur-lg',
    'border',
    'border-gray-200',
    'rounded-3xl',
    'shadow-lg',
    'p-6',
    'transition-all',
    'duration-500',
    'hover:shadow-2xl',
    'hover:bg-white/90'
  ]);

  const $communityTitleContainer = createElementWithClasses('div', [
    'flex',
    'justify-between',
    'items-center',
    'mb-8',
    'bg-gradient-to-r',
    'from-purple-100',
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
      const data = await fetchComunitiesUser();
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
      'bg-white',
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
      'text-gray-600',
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
    joinButton.innerHTML = '<span>Ver Foro</span> <span class="text-lg">🚀</span>';

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
      'h-64',
      'rounded-2xl',
      'shadow-lg',
      'overflow-hidden',
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'text-center',
      'bg-gradient-to-br',
      'from-purple-50',
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
    title.textContent = '¡Explora nuevas comunidades!';

    const description = createElementWithClasses('p', [
      'text-sm',
      'text-gray-600',
      'mb-6'
    ]);
    description.textContent = message;

    const exploreButton = createElementWithClasses('button', [
      'px-6',
      'py-2',
      'bg-white',
      'text-purple-600',
      'font-medium',
      'rounded-xl',
      'shadow-md',
      'transition-all',
      'duration-300',
      'hover:shadow-lg',
      'hover:scale-105',
      'active:scale-95'
    ]);
    exploreButton.textContent = '¡Descubre más! 🔍';

    card.append(icon, title, description, exploreButton);
    $communitiesContainer.appendChild(card);
  };

  loadCommunities();

  $columnContainer.append($leftColumn, $rightColumn);
  $main.append($container, $columnContainer);

  return $main;
};


//! FUNCION TRAER HISTORIAS 

const loadForos = async () => {
  try {
    const data = await fetchGetForosById();

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
