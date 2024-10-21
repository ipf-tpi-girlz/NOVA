import { getUserProfile } from "../api/auth";
import { fetchGetForos, fetchDeleteForo, fetchGetForosById, fetchUpdateForo, fetchCreateForo } from "../api/foro";
import { fetchComunitiesUser } from "../api/comunity";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    const createElementWithClasses = (tag, classes) => {
        const element = document.createElement(tag);
        element.classList.add(...classes);
        return element;
    };

    const $main = createElementWithClasses('div', ["flex", "flex-col", "min-h-screen", "w-full", "bg-gradient-to-br", "from-purple-100", "to-indigo-100", "p-8"]);

    const $container = createElementWithClasses('div', ['bg-white', 'rounded-3xl', 'shadow-xl', 'p-8', 'mb-8', 'transition-all', 'duration-300', 'hover:shadow-2xl']);

    const $header = createElementWithClasses('div', ['flex', 'flex-col', 'md:flex-row', 'items-center', 'md:items-start', 'gap-6']);

    const $imgContainer = createElementWithClasses('div', ['relative']);
    const $img = createElementWithClasses('img', ['w-32', 'h-32', 'md:w-48', 'md:h-48', 'rounded-full', 'object-cover', 'border-4', 'border-purple-500', 'shadow-lg']);


    const $textContainer = createElementWithClasses('div', ['flex', 'flex-col', 'justify-start', 'text-center', 'md:text-left']);

    const $name = createElementWithClasses('h2', ['text-3xl', 'md:text-4xl', 'font-bold', 'text-gray-800', 'mb-2']);
    const $bio = createElementWithClasses('p', ['text-gray-600', 'mb-4', 'max-w-lg']);
    const $stats = createElementWithClasses('div', ['flex', 'gap-4', 'text-sm', 'text-gray-500']);

    getUserProfile().then(user => {
        $img.src = user.img || '../assets/img/foto-profile.jfif';
        $name.textContent = user.nombre || 'Usuario';
        $bio.textContent = user.bio || 'Bienvenido a mi perfil!';
        $stats.innerHTML = `
            <span>${user.publicaciones || 0} publicaciones</span>
            <span>•</span>
            <span>${user.comunidades || 0} comunidades</span>
        `;
    }).catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        $img.src = 'https://i.pravatar.cc/300';
        $name.textContent = 'Usuario';
        $bio.textContent = 'Bienvenido a mi perfil!';
        $stats.innerHTML = '<span>0 publicaciones</span><span>•</span><span>0 comunidades</span>';
    });

    $imgContainer.append($img);
    $textContainer.append($name, $bio, $stats);
    $header.append($imgContainer, $textContainer);
    $container.appendChild($header);

    const $columnContainer = createElementWithClasses('div', ['flex', 'flex-col', 'lg:flex-row', 'gap-8']);

    const $leftColumn = createElementWithClasses('div', ['flex-1', 'bg-white', 'rounded-3xl', 'shadow-lg', 'p-6', 'transition-all', 'duration-300', 'hover:shadow-xl']);
    const $leftTitleContainer = createElementWithClasses('div', ['flex', 'justify-between', 'items-center', 'mb-6']);
    const $leftTitle = createElementWithClasses('h3', ['text-2xl', 'font-bold', 'text-gray-800', 'flex', 'items-center']);
    $leftTitle.innerHTML = '<svg class="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>Mis publicaciones';

    const $buttonContainer = createElementWithClasses('div', ['flex', 'gap-4']);

    const $createButton = createElementWithClasses('button', ['bg-indigo-500', 'hover:bg-indigo-600', 'text-white', 'py-2', 'px-4', 'rounded-full', 'text-sm', 'font-medium', 'shadow-md', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg', 'flex', 'items-center', 'justify-center']);
    $createButton.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>Crear';
    $createButton.addEventListener('click', async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Crear Foro',
            html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción" rows="4"></textarea>
      `,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-title').value;
                const desc = document.getElementById('swal-desc').value;
                if (!title || !desc) {
                    Swal.showValidationMessage('Por favor, completa todos los campos.');
                    return false;
                }
                return { title, desc };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetchCreateForo({
                        title: result.value.title,
                        desc: result.value.desc
                    });
                    if (response) {
                        Swal.fire('¡Éxito!', 'El foro ha sido creado.', 'success');
                        loadData();
                    } else {
                        throw new Error('No se pudo crear el foro');
                    }
                } catch (error) {
                    console.error('Error al crear el foro:', error);
                    Swal.fire('Error', 'No se pudo crear el foro', 'error');
                }
            }
        });
    });

    const $deleteButton = createElementWithClasses('button', ['bg-red-500', 'hover:bg-red-600', 'text-white', 'py-2', 'px-4', 'rounded-full', 'text-sm', 'font-medium', 'shadow-md', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg', 'flex', 'items-center']);
    $deleteButton.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>Eliminar Todo';
    $deleteButton.addEventListener('click', async (e) => {
        Swal.fire({
            title: '¿Estás seguro que quieres eliminar todas tus publicaciones?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log('Eliminar publicaciones');

                Swal.fire('Eliminado', 'Tus publicaciones han sido eliminadas.', 'success');
                loadData();
            }
        });
    });

    $buttonContainer.append($createButton, $deleteButton);
    $leftTitleContainer.append($leftTitle, $buttonContainer);
    $leftColumn.appendChild($leftTitleContainer);

    const publicacionesContainer = createElementWithClasses('div', ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'justify-center', 'items-center', 'mx-auto', 'max-w-6xl']);
    publicacionesContainer.id = "publicaciones-container";
    $leftColumn.appendChild(publicacionesContainer);

    const loadData = async () => {
        try {
            const data = await fetchGetForos();
            console.log(data)
            publicacionesContainer.innerHTML = "";
            if (!data.foros || data.foros.length === 0) {
                createCard();
            } else {
                loadPublication(data);
            }
        } catch (error) {
            console.error("Error loading foros:", error);
            createCard();
        }
    };

    loadData();

    const $rightColumn = createElementWithClasses('div', ['lg:w-1/3', 'bg-white', 'rounded-3xl', 'shadow-lg', 'p-6', 'transition-all', 'duration-300', 'hover:shadow-xl']);
    const $rightTitle = createElementWithClasses('h3', ['text-2xl', 'font-bold', 'mb-6', 'text-gray-800', 'flex', 'items-center']);
    $rightTitle.innerHTML = '<svg class="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>Mis comunidades';
    $rightColumn.appendChild($rightTitle);

    const communitiesContainer = createElementWithClasses('div', ['grid', 'grid-cols-1', 'gap-4']);
    communitiesContainer.id = "communities-container";
    $rightColumn.appendChild(communitiesContainer);

    const loadCommunity = async () => {
        try {
            const data = await fetchComunitiesUser();
            console.log("Datos de la comunidad:", data);

            communitiesContainer.innerHTML = "";

            // Verifica si hay un mensaje específico
            if (data.message) {
                createNoCommunityCard(data.message); // Pasa el mensaje a la función
            } else if (!data.community || data.community.length === 0) {
                createNoCommunityCard();
            } else {
                loadComunities(data);
            }
        } catch (error) {
            console.error("Error loading foros:", error);
            createNoCommunityCard("Ocurrió un error al cargar las comunidades."); // Mensaje de error
        }
    };

    loadCommunity()

    $columnContainer.append($leftColumn, $rightColumn);
    $main.append($container, $columnContainer);

    return $main;
};



const loadComunities = async (data) => {
    const communitiesContainer = document.getElementById('communities-container');
    communitiesContainer.innerHTML = '';
    if (data.community && data.community.length > 0) {
        const fragment = document.createDocumentFragment();
        data.community.forEach(communi => {
            const card = createCommunityCard(communi);
            console.log("Tarjeta creada:", card); // Verifica la tarjeta creada
            fragment.appendChild(card);
        });
        communitiesContainer.appendChild(fragment);
    } else {
        createNoCommunityCard();
    }
}

const createCommunityCard = (community) => {
    const card = document.createElement('div');
    card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'flex', 'items-center', 'p-4');

    const img = document.createElement('img');
    img.src = community.img_perfil || 'path/to/default/community/image.jpg';
    img.classList.add('w-16', 'h-16', 'rounded-full', 'object-cover', 'mr-4');

    const textContainer = document.createElement('div');
    textContainer.classList.add('flex-grow');

    const title = document.createElement('h4');
    title.textContent = community.nombre;
    title.classList.add('font-semibold', 'text-lg', 'mb-1');

    const description = document.createElement('p');
    description.textContent = community.desc;
    description.classList.add('text-sm', 'text-gray-600');

    textContainer.append(title, description);
    card.append(img, textContainer);

    return card;
};

const createNoCommunityCard = () => {
    const card = document.createElement("div");
    card.classList.add(
        "w-full",
        "h-64",
        "bg-gradient-to-br",
        "from-purple-100",
        "to-indigo-100",
        "rounded-xl",
        "shadow-lg",
        "overflow-hidden",
        "transition-all",
        "duration-300",
        "hover:shadow-2xl",
        "hover:scale-105",
        "cursor-pointer",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
    );

    const cardContent = document.createElement("div");
    cardContent.classList.add(
        "p-6",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "text-center"
    );

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("height", "48");
    icon.setAttribute("width", "48");
    icon.classList.add("text-purple-500", "mb-4");

    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconPath.setAttribute("stroke-linecap", "round");
    iconPath.setAttribute("stroke-linejoin", "round");
    iconPath.setAttribute("stroke-width", "2");
    iconPath.setAttribute("d", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z");

    icon.appendChild(iconPath);

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "text-gray-800", "mb-2");
    title.textContent = "Sin comunidades";

    const description = document.createElement("p");
    description.classList.add("text-sm", "text-gray-600");
    description.textContent = "Aún no estás unido a una comunidad.";

    cardContent.append(icon, title, description);
    card.appendChild(cardContent);

    return card;
};

const loadPublication = (data) => {
    const publicacionesContainer = document.getElementById("publicaciones-container");
    publicacionesContainer.innerHTML = "";
    if (data.foros && data.foros.length > 0) {
        data.foros.forEach((foro) => {
            const card = createPublicationCard(foro);
            publicacionesContainer.appendChild(card);
        });
    } else {
        createCard();
    }
};

const createPublicationCard = (post) => {
    console.log(post)
    const card = document.createElement("div");
    card.classList.add(
        "bg-white",
        "break-words",
        "rounded-lg",
        "p-4",
        "shadow-md",
        "hover:shadow-lg",
        "hover:bg-gray-100",
        "transition-shadow",
        "transition-bg",
        "duration-300",
        "w-full",
        "max-w-xs"
    );

    const dropdownContainer = createDropdownMenu(post);
    const cardTitle = createCardElement("h4", ["font-bold", "text-lg", "mb-2"], post.nombre);
    const cardDesc = createCardElement("p", ["text-sm", "text-gray-600"], post.desc);

    card.append(dropdownContainer, cardTitle, cardDesc);

    return card;
};

const createDropdownMenu = (foro) => {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown", "float-right");

    const dropdownButton = createCardElement("div", ["btn", "bg-transparent", "border-transparent", "box-border-0"], "🤍");
    dropdownButton.setAttribute("tabindex", "0");
    dropdownButton.setAttribute("role", "button");

    const dropdownContent = document.createElement("ul");
    dropdownContent.setAttribute("tabindex", "0");
    dropdownContent.classList.add(
        "dropdown-content",
        "menu",
        "bg-base-100",
        "rounded-box",
        "z-[1]",
        "w-52",
        "p-2",
        "shadow"
    );

    const itemEditar = createDropdownItem("Editar", () => editPublication(foro));
    const itemEliminar = createDropdownItem("Borrar", () => deletePublication(foro.id));

    dropdownContent.append(itemEditar, itemEliminar);
    dropdownContainer.append(dropdownButton, dropdownContent);

    return dropdownContainer;
};

const createCardElement = (tag, classes, textContent) => {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = textContent;
    return element;
};

const createDropdownItem = (text, onClick) => {
    const item = document.createElement("li");
    const button = document.createElement("btn");
    button.textContent = text;
    button.addEventListener("click", onClick);
    item.appendChild(button);
    return item;
};

const editPublication = (foro) => {
    Swal.fire({
        title: "Editar Publicación",
        html: `
            <input id="swal-edit-title" class="swal2-input" value="${foro.nombre}" placeholder="Título">
            <textarea id="swal-edit-desc" class="swal2-textarea" placeholder="Descripción">${foro.desc}</textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const title = document.getElementById("swal-edit-title").value.trim();
            const desc = document.getElementById("swal-edit-desc").value.trim();
            if (!title || !desc) {
                Swal.showValidationMessage("Por favor, completa todos los campos.");
                return false;
            }
            return { title, desc };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            const dataForo = {
                title: result.value.title,
                desc: result.value.desc
            }
            await fetchUpdateForo(foro.id, dataForo);
            await Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "La publicación se ha actualizado correctamente.",
                timer: 1500,
                showConfirmButton: false
            });
            window.location.reload();
        }

    });
};

const deletePublication = (foroId) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetchDeleteForo(foroId);

            await Swal.fire({
                icon: 'success',
                title: '¡Eliminado!',
                text: "La publicación ha sido eliminada correctamente.",
                timer: 1500,
                showConfirmButton: false
            });
            window.location.reload();

        }
    });
};

const createCard = () => {
    const card = document.createElement("div");
    card.classList.add(
        "w-full",
        "max-w-sm",
        "h-64",
        "bg-gradient-to-br",
        "from-purple-100",
        "to-indigo-100",
        "rounded-xl",
        "shadow-lg",
        "overflow-hidden",
        "transition-all",
        "duration-300",
        "hover:shadow-2xl",
        "hover:scale-105",
        "cursor-pointer",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
    );

    const cardContent = document.createElement("div");
    cardContent.classList.add(
        "p-6",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "text-center"
    );

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("height", "48");
    icon.setAttribute("width", "48");
    icon.classList.add("text-purple-500", "mb-4");

    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconPath.setAttribute("stroke-linecap", "round");
    iconPath.setAttribute("stroke-linejoin", "round");
    iconPath.setAttribute("stroke-width", "2");
    iconPath.setAttribute("d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10");

    icon.appendChild(iconPath);

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "text-gray-800", "mb-2");
    title.textContent = "Sin publicaciones";

    const description = document.createElement("p");
    description.classList.add("text-sm", "text-gray-600");
    description.textContent = "Aún no tienes publicaciones.";

    cardContent.append(icon, title, description);
    card.appendChild(cardContent);

    const publicacionesContainer = document.getElementById("publicaciones-container");
    publicacionesContainer.innerHTML = '';
    publicacionesContainer.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "min-h-[400px]"
    );
    publicacionesContainer.appendChild(card);
};

