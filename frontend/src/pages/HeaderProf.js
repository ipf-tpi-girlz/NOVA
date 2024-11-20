import { getUserProfile } from "../api/auth";
import { fetchDeleteForo, fetchGetForosById, fetchUpdateForo, fetchCreateForo } from "../api/foro";
import { fetchComunitiesUser } from "../api/comunity";
import { fetchArticlesByUser } from "../api/articles.js"
import { notification } from "antd"

export const HeaderProf = () => {
    const createElementWithClasses = (tag, classes) => {
        const element = document.createElement(tag);
        element.classList.add(...classes);
        return element;
    };

    const $main = createElementWithClasses('div', ["flex", "flex-col", "min-h-screen", "w-full", "bg-base-100", "p-8"]);

    const $container = createElementWithClasses('div', ['bg-base-200', "bg-cover", "border", "border-gray-300", 'rounded-3xl', 'shadow-xl', 'p-8', 'mb-8', 'transition-all', 'duration-300', 'hover:shadow-2xl']);

    const $header = createElementWithClasses('div', ['flex', 'flex-col', 'md:flex-row', 'items-center', 'md:items-start', 'gap-6']);

    const $imgContainer = createElementWithClasses('div', ['relative']);
    const $img = createElementWithClasses('img', ['w-32', 'h-32', 'md:w-48', 'md:h-48', 'rounded-full', 'object-cover', 'border-4', 'border-gray-200', 'shadow-lg']);


    const $textContainer = createElementWithClasses('div', ['flex', 'flex-col', 'justify-start', 'text-center', 'md:text-left']);

    const $name = createElementWithClasses('h2', ['text-3xl', 'md:text-4xl', 'font-bold', 'text', 'mb-2']);
    const $bio = createElementWithClasses('p', ['text', 'mb-4', 'max-w-lg']);
    const $stats = createElementWithClasses('div', ['flex', 'gap-4', 'text-sm', 'text']);

    getUserProfile().then(user => {

        $img.src = user.img ? user.img : 'https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg';
        $name.textContent = user.nombre || 'Usuario';
        if (user.role == "profesional") {
            $bio.textContent = user.perfil.descripcion || 'Bienvenido a mi perfil!';
        } else {
            $bio.textContent = user.bio || 'Bienvenido a mi perfil!';
        }
    }).catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        $img.src = 'https://i.pravatar.cc/300';
        $name.textContent = 'Usuario';
        $bio.textContent = 'Bienvenido a mi perfil!';
        $stats.innerHTML = '<span>0</span> foros<span>•</span><span>0</span> comunidades';
    });


    $imgContainer.append($img);
    $textContainer.append($name, $bio, $stats);
    $header.append($imgContainer, $textContainer);
    $container.appendChild($header);

    const $columnContainer = createElementWithClasses('div', ['flex', 'flex-col', 'lg:flex-row', 'gap-8']);

    const $leftColumn = createElementWithClasses('div', ['flex-1', 'bg-base-200', "border", "border-gray-300", 'rounded-3xl', 'shadow-lg', 'p-6', 'transition-all', 'duration-300', "overflow-y-auto", 'scroll-invisible', 'hover:shadow-xl', 'h-screen',]);  // Aplicar scroll-invisible aquí
    const $leftTitleContainer = createElementWithClasses('div', ['flex', 'justify-between', 'items-center', 'mb-6']);
    const $leftTitle = createElementWithClasses('h3', ['text-2xl', 'font-bold', 'text', 'flex', 'items-center']);
    $leftTitle.innerHTML = '<svg class="w-6 h-6 mr-2 text-base-800 bg-cover" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>Mis articulos';


    $leftTitleContainer.append($leftTitle);
    $leftColumn.appendChild($leftTitleContainer);

    const publicacionesContainer = createElementWithClasses('div', ['grid', 'gap-6', "flex", "ml-9"]);
    publicacionesContainer.id = "publicaciones-container";
    $leftColumn.appendChild(publicacionesContainer);

    const loadData = async () => {
        try {
            const data = await fetchArticlesByUser();
            console.log(data)
            publicacionesContainer.innerHTML = "";
            if (!data || data.length === 0) {
                createCard();
            } else {
                loadArticles(data);
            }
        } catch (error) {
            console.error("Error loading foros:", error);
            createCard();
        }
    };

    loadData();

    const $rightColumn = createElementWithClasses('div', ['lg:w-1/3', 'bg-base-200', 'rounded-3xl', 'shadow-lg', 'p-6', 'transition-all', 'duration-300', 'hover:shadow-xl', "border", "border-gray-300", 'scroll-invisible']);  // Aplicar scroll-invisible aquí
    const $rightTitle = createElementWithClasses('h3', ['text-2xl', 'font-bold', 'mb-6', 'text', 'flex', 'items-center']);
    $rightTitle.innerHTML = '<svg class="w-6 h-6 mr-2 text-base-800 bg-cover" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>Mis comunidades';
    $rightColumn.appendChild($rightTitle);

    const communitiesContainer = createElementWithClasses('div', ['grid', 'grid-cols-1', 'gap-4']);
    communitiesContainer.id = "communities-container";
    $rightColumn.appendChild(communitiesContainer);

    $columnContainer.append($leftColumn, $rightColumn);
    $main.append($container, $columnContainer);

    loadComunities(); // Llamada a la función para cargar las comunidades

    return $main;
};

//!CASI
const loadArticles = (data) => {
    const publicacionesContainer = document.getElementById("publicaciones-container");
    publicacionesContainer.innerHTML = "";

    if (data && data.length > 0) {
        data.forEach((art) => {
            const card = createArticleCard(art);
            publicacionesContainer.appendChild(card);
        });
    } else {
        publicacionesContainer.appendChild(NoContent());
    }
};

//!CASI
const createArticleCard = (art) => {
    const user = art.usuario;

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

    // Contenedor del header con foto de usuario y nombre (arriba)
    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add(
        "flex",
        "items-center",
        "gap-3",
        "p-4",
        "border-b",
        "border-gray-100"
    );

    // Foto de perfil del usuario
    const userImageWrapper = document.createElement("div");
    userImageWrapper.classList.add("w-14", "h-14", "rounded-full", "overflow-hidden");

    const userImage = document.createElement("img");
    userImage.classList.add("w-full", "h-full", "object-cover");
    userImage.src = user && user.img ? user.img : "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg"

    userImageWrapper.appendChild(userImage);

    // Nombre del usuario
    const userName = document.createElement("div");
    userName.classList.add("flex-grow", "font-semibold", "text");
    userName.textContent = user && user.nombre ? user.nombre : "Usuario anónimo";

    headerWrapper.append(userImageWrapper, userName);
    card.appendChild(headerWrapper); // Agregar el header arriba

    // Contenedor de la imagen con overlay (debajo del header)
    if (art.imagen) {
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add(
            "relative",
            "h-56",
            "overflow-hidden"
        );

        const img = document.createElement("div");
        img.classList.add(
            "h-full",
            "w-full",
            "bg-cover",
            "bg-center",
            "transition-transform",
            "duration-500",
            "group-hover:scale-110"
        );
        img.style.backgroundImage = art.imagen ? `url(${art.imagen})` : "url('/api/placeholder/400/320')";

        // Overlay gradient
        const overlay = document.createElement("div");
        overlay.classList.add(
            "absolute",
            "inset-0",
            "bg-gradient-to-t",
            "from-black/50",
            "to-transparent",
            "opacity-0",
            "group-hover:opacity-100",
            "transition-opacity",
            "duration-300"
        );

        imgWrapper.append(img, overlay);
        card.append(imgWrapper);
    }

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
        "text-gray-600",
        "leading-relaxed",
        "line-clamp-3"
    );
    description.textContent = art.desc || "Sin descripción disponible.";

    textContent.append(title, description);
    contentWrapper.appendChild(textContent);

    // Agregar fecha de creación (createdAt) al final
    if (art.createdAt) {
        const metadata = document.createElement("div");
        metadata.classList.add(
            "flex",
            "items-center",
            "gap-2",
            "mt-4",
            "text-xs",
            "text-gray-500"
        );
        metadata.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            ${formatDate(art.createdAt)}
        `;
        contentWrapper.appendChild(metadata); // Agregar fecha al final
    }

    card.appendChild(contentWrapper);

    return card;
};


//!TERMINADO
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};






//!TERMINADO
const loadComunities = async () => {
    try {
        const data = await fetchComunitiesUser();
        const communities = data.community;

        const communitiesContainer = document.getElementById("communities-container");
        communitiesContainer.innerHTML = "";  // Limpiar el contenedor antes de agregar contenido

        if (!communities || communities.length === 0) {
            console.log("No hay comunidades para mostrar");
            communitiesContainer.appendChild(NoContent());
            return;
        }

        communities.forEach((community) => {
            const card = createCommunityCard(community);
            communitiesContainer.appendChild(card);
        });

        console.log("Comunidades cargadas correctamente:", communities);
    } catch (error) {
        console.error("Error al cargar las comunidades:", error);
    }
};
//!TERMINADO
const NoContent = () => {
    const card = document.createElement("div");
    card.classList.add(
        "max-w-2xl",
        "border",
        "border-gray-200",
        "bg-base-100",
        "rounded-xl",
        "shadow-lg",
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

    // Aseguramos que el icono se agregue correctamente como SVG
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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
    iconPath.setAttribute("d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z");

    icon.appendChild(iconPath);  // Asegúrate de añadir el path al icono SVG

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "text", "mb-2");
    title.textContent = "Sin Comunidades";

    const description = document.createElement("p");
    description.classList.add("text-sm", "text");
    description.textContent = "Aún no has creado comunidades.";

    cardContent.append(icon, title, description);
    card.appendChild(cardContent);

    return card;
};




//!TERMINADO
const createCommunityCard = (community) => {
    const card = document.createElement('div');
    card.classList.add(
        "relative",
        "bg-base-100",
        "break-words",
        "rounded-lg",
        "p-4",
        "shadow-md",
        "hover:shadow-lg",
        "border",
        "border-gray-200",
        "hover:bg-base-400",
        "transition-shadow",
        "transition-bg",
        "duration-300",
        "w-full",

    );

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('flex-grow');
    const title = document.createElement('h2');
    title.textContent = community.nombre;
    title.classList.add(
        'text-3xl', // Reducir tamaño si es necesario
        'font-bold',
        'text-gray-900', // Asegurar que sea un color oscuro visible
        'flex',
        'items-center',
        'gap-3',
        'text-shadow-lg', // Añade sombra para contraste
        'w-full',
        'text-center'
    );

    const desc = document.createElement('p');
    desc.textContent = community.desc || "Sin descripción disponible";
    desc.classList.add(
        'text',
        'leading-relaxed'
    );

    const button = document.createElement('button');
    button.classList.add(
        'absolute',
        'bottom-4',
        'right-4',
        'w-10',
        'h-10',
        'bg-primary',
        'text-white',
        'rounded-full',
        'flex',
        'items-center',
        'justify-center',
        'transform',
        'hover:scale-105',
        'transition-all',
        'duration-200',
        'shadow-md',
        'hover:shadow-lg'
    );

    const arrowIcon = document.createElement('svg');
    arrowIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 base">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
    `;
    button.appendChild(arrowIcon);

    button.addEventListener('click', () => {
        sessionStorage.setItem('forumId', community.id);
        window.location.href = '/forum';
    });

    // Añadir el título y la descripción al contenido
    contentWrapper.appendChild(title);
    contentWrapper.appendChild(desc);

    // Añadir el contenedor de contenido y el botón a la carta
    card.appendChild(contentWrapper);
    card.appendChild(button);

    return card;
};



//!TERMINADO
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








