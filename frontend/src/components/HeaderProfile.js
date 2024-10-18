import { logout } from "../api/user";
import { fetchGetForos, fetchDeleteForo, fetchGetForosById, fetchUpdateForo, fetchCreateForo } from "../api/foro";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    const createElementWithClasses = (tag, classes) => {
        const element = document.createElement(tag);
        element.classList.add(...classes);
        return element;
    };

    const $main = createElementWithClasses('div', ["flex", "flex-col", "min-h-screen", "w-full", "min-w-screen", "p-5"]);

    const $container = createElementWithClasses('div', ['flex', 'flex-col', 'md:flex-row', 'justify-between', 'items-center', 'md:items-start', 'gap-4', 'rounded-3xl', 'bg-white', 'p-6', 'relative']);

    const $leftSide = createElementWithClasses('div', ['flex', 'flex-col', 'md:flex-row', 'gap-4', 'items-center', 'md:items-start']);

    const $img = createElementWithClasses('img', ['w-32', 'h-32', 'md:w-48', 'md:h-48', 'rounded-full']);
    $img.src = 'https://i.pravatar.cc/300';

    const $textContainer = createElementWithClasses('div', ['flex', 'flex-col', 'justify-start', 'text-center', 'md:text-left']);

    const $name = createElementWithClasses('h2', ['text-3xl', 'md:text-4xl', 'font-bold']);
    $name.textContent = 'Ale Lopez';

    const $description = createElementWithClasses('p', ['text-gray-600', 'text-base', 'md:text-lg', 'mt-2']);
    $description.textContent = 'Esta es la descripción del usuario.';

    const $buttonContainer = createElementWithClasses('div', ['absolute', 'top-4', 'right-4', 'flex', 'gap-4']);

    const $createButton = createElementWithClasses('button', ['bg-gray-500', 'hover:bg-gray-700', 'text-white', 'py-3', 'px-4', 'rounded-full', 'text-sm', 'font-medium', 'shadow-md', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg']);
    $createButton.textContent = 'Crear';
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
                        // Aquí puedes agregar lógica para actualizar la lista de foros si es necesario
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

    const $deleteButton = createElementWithClasses('button', ['bg-red-500', 'hover:bg-red-700', 'text-white', 'py-3', 'px-4', 'rounded-full', 'text-sm', 'font-medium', 'shadow-md', 'transition', 'duration-300', 'ease-in-out', 'hover:shadow-lg']);
    $deleteButton.textContent = 'Eliminar Publicaciones';
    $deleteButton.addEventListener('click', async (e) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar todas tus publicaciones?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9333ea',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log('Eliminar publicaciones');
                // Aquí iría la lógica para eliminar las publicaciones
            }
        });
    });

    $buttonContainer.append($createButton, $deleteButton);
    $textContainer.append($name, $description, $buttonContainer);
    $leftSide.append($img, $textContainer);
    $container.appendChild($leftSide);

    const $columnContainer = createElementWithClasses('div', ['flex', 'flex-col', 'md:flex-row', 'gap-4', 'mt-6', 'w-full']);

    const $leftColumn = createElementWithClasses('div', ['flex-1', 'bg-white', 'p-6', 'rounded-3xl', 'shadow-lg']);
    const $leftTitle = createElementWithClasses('h3', ['text-xl', 'font-bold', 'mb-4']);
    $leftTitle.textContent = 'Mis publicaciones';
    $leftColumn.appendChild($leftTitle);

    const publicacionesContainer = createElementWithClasses('div', ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4']);
    publicacionesContainer.id = "publicaciones-container";
    $leftColumn.appendChild(publicacionesContainer);

    const loadData = async () => {
        try {
            const data = await fetchGetForos();
            publicacionesContainer.innerHTML = "";
            if (!data.foros || data.foros.length === 0) {
                createCard();
                return;
            }
            loadPublication(data);
        } catch (error) {
            console.error("Error loading foros:", error);
        }
    };

    loadData();

    const $rightColumn = createElementWithClasses('div', ['flex-2', 'bg-white', 'p-6', 'rounded-3xl', 'shadow-lg']);
    const $rightTitle = createElementWithClasses('h3', ['text-xl', 'font-bold', 'mb-4']);
    $rightTitle.textContent = 'Mis comunidades';
    $rightColumn.appendChild($rightTitle);

    $columnContainer.append($leftColumn, $rightColumn);
    $main.append($container, $columnContainer);

    return $main;
};

const loadPublication = (data) => {
    const publicacionesContainer = document.getElementById("publicaciones-container");

    data.foros.forEach((foro) => {
        const card = createPublicationCard(foro);
        publicacionesContainer.appendChild(card);
    });
};

const createPublicationCard = (foro) => {
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

    const dropdownContainer = createDropdownMenu(foro);
    const cardTitle = createCardElement("h4", ["font-bold", "text-lg", "mb-2"], foro.nombre);
    const cardDesc = createCardElement("p", ["text-sm", "text-gray-600"], foro.desc);

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
            try {
                const dataForo = {
                    title: result.value.title,
                    desc: result.value.desc
                }
                const response = await fetchUpdateForo(foro.id, dataForo);
                if (response && response.message) {
                    await Swal.fire({
                        icon: "success",
                        title: "¡Actualizado!",
                        text: response.message,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    await fetchGetForos().then(data => {
                        const publicacionesContainer = document.getElementById("publicaciones-container");
                        publicacionesContainer.innerHTML = "";
                        if (!data.foros || data.foros.length === 0) {
                            createCard();
                        } else {
                            loadPublication(data);
                        }
                    });
                } else {
                    throw new Error("No se pudo actualizar la publicación");
                }
            } catch (error) {
                console.error("Error al actualizar la publicación:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo actualizar la publicación. Por favor, intenta de nuevo.",
                });
            }
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
            try {
                const response = await fetchDeleteForo(foroId);
                if (response && response.message) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: response.message,
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Actualizar la lista de foros después de eliminar
                    setTimeout(async () => {
                        const data = await fetchGetForos();
                        const publicacionesContainer = document.getElementById("publicaciones-container");
                        publicacionesContainer.innerHTML = "";
                        if (!data.foros || data.foros.length === 0) {
                            createCard();
                        } else {
                            loadPublication(data);
                        }
                    }, 2000);
                } else {
                    throw new Error("No se pudo eliminar la publicación");
                }
            } catch (error) {
                console.error("Error al eliminar la publicación:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la publicación. Por favor, intenta de nuevo.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }
    });
};

const createCard = () => {
    const card = document.createElement("div");
    card.classList.add(
        "w-full",
        "max-w-xs",
        "h-[150px]",
        "p-4",
        "bg-gray-100",
        "rounded-lg",
        "shadow-lg",
        "relative",
        "cursor-pointer",
        "transition-all",
        "hover:bg-gray-200",
        "flex",
        "flex-col",
        "justify-center",
        "items-center"
    );

    const cardContent = createCardElement("p", ["text-sm", "text-gray-600", "text-center"], "Aún no tienes publicaciones. Para crear una, presiona la flecha en la esquina inferior derecha.");

    const arrowContainer = document.createElement("div");
    arrowContainer.classList.add(
        "absolute",
        "bg-purple-600",
        "p-2",
        "rounded-bl-lg",
        "rounded-tr-lg",
        "bottom-0",
        "right-0",
        "flex",
        "justify-center",
        "items-center",
        "transition-all",
        "hover:bg-black"
    );

    const arrowSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrowSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    arrowSVG.setAttribute("viewBox", "0 0 24 24");
    arrowSVG.setAttribute("fill", "none");
    arrowSVG.setAttribute("height", "20");
    arrowSVG.setAttribute("width", "20");
    arrowSVG.classList.add("transition-transform", "hover:translate-x-1");

    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("fill", "#fff");
    arrowPath.setAttribute(
        "d",
        "M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
    );

    arrowSVG.appendChild(arrowPath);
    arrowContainer.appendChild(arrowSVG);

    arrowContainer.addEventListener('click', () => {
        window.location.href = '/foros';
    });

    card.append(cardContent, arrowContainer);

    const publicacionesContainer = document.getElementById("publicaciones-container");
    publicacionesContainer.classList.add(
        "flex",
        "justify-center"
    );
    publicacionesContainer.appendChild(card);
};
