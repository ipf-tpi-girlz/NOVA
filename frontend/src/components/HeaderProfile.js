import { logout } from "../api/user";
import { deleteAccount } from "../api/auth";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    // --- Contenedor principal ---
    const $conteiner = document.createElement('div');
    $conteiner.classList.add('bg-base', 'flex', 'justify-between', 'items-start', 'gap-6', 'mx-auto', 'max-w-7xl', 'm-10', 'px-10');

    // --- Contenedor para la imagen y el texto ---
    const $leftSide = document.createElement('div');
    $leftSide.classList.add('flex', 'gap-4', 'items-start');

    // Imagen
    const $img = document.createElement('img');
    $img.classList.add('w-48', 'h-48', 'rounded-full');
    $img.src = 'https://i.pravatar.cc/300';

    // Contenedor para el nombre y la descripción
    const $textContainer = document.createElement('div');
    $textContainer.classList.add('flex', 'flex-col', 'justify-start');

    // Nombre del usuario
    const $name = document.createElement('h2');
    $name.classList.add('text-4xl', 'font-bold');
    $name.textContent = 'Nombre del usuario';

    // Descripción
    const $description = document.createElement('p');
    $description.classList.add('text-gray-600', 'text-lg', 'mt-2');
    $description.textContent = 'Esta es la descripción del usuario.';

    // Botón de "Editar Perfil"
    const $btnEdit = document.createElement('button');
    $btnEdit.classList.add('bg-gray-200', 'text-gray-700', 'p-2', 'rounded-lg', 'hover:bg-gray-300', 'text-sm');
    $btnEdit.textContent = 'Editar Perfil';

    // Botón de configuración
    const $btnSettings = document.createElement('button');
    $btnSettings.classList.add('bg-gray-200', 'text-gray-700', 'p-2', 'rounded-full', 'hover:bg-gray-300', 'flex', 'items-center', 'justify-center', 'w-10', 'h-10');

    // Icono de configuración
    const $iconSettings = document.createElement('i');
    $iconSettings.classList.add('fas', 'fa-cog', 'w-4', 'h-4');
    $btnSettings.appendChild($iconSettings);

    // Añadir nombre y descripción al contenedor de texto
    $textContainer.appendChild($name);
    $textContainer.appendChild($description);

    // Añadir imagen y texto al lado izquierdo
    $leftSide.appendChild($img);
    $leftSide.appendChild($textContainer);

    // Agrupar los botones de editar y configuración en un contenedor
    const $btnContainer = document.createElement('div');
    $btnContainer.classList.add('flex', 'gap-2');
    $btnContainer.appendChild($btnEdit);
    $btnContainer.appendChild($btnSettings);

    // Añadir el lado izquierdo y los botones al contenedor principal
    $conteiner.appendChild($leftSide);
    $conteiner.appendChild($btnContainer);

    // --- Modal de Configuración ---
    const $settingsModal = document.createElement('div');
    $settingsModal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'hidden');

    const $settingsModalContent = document.createElement('div');
    $settingsModalContent.classList.add('bg-white', 'rounded-lg', 'p-8', 'shadow-lg', 'max-w-lg', 'w-full');

    const $titleConfig = document.createElement('h3');
    $titleConfig.classList.add('text-lg', 'font-bold', 'mb-2', 'text-center');
    $titleConfig.textContent = 'Configuración';

    const $settingsImg = document.createElement('img');
    $settingsImg.classList.add('w-48', 'h-48', 'rounded-full', 'mb-4', 'mx-auto');
    $settingsImg.src = $img.src;

    const $hr = document.createElement('hr');

    const options = [
        { text: 'Editar Datos', id: 'edit-data' },
        { text: 'Eliminar Cuenta', id: 'delete-account' },
        { text: 'Usuarios Bloqueados', id: 'blocked-users' },
        { text: 'Ayuda', href: '/ayuda' },
        { text: 'Comunidades', href: '/comunidades' },
        { text: 'Contáctanos', href: '/contacto' }
    ];

    const $optionsList = document.createElement('ul');
    options.forEach(option => {
        const $li = document.createElement('li');
        $li.classList.add('mt-2');

        const $link = document.createElement('a');
        $link.classList.add('text-black-500', 'hover:text-pink-500');
        $link.textContent = option.text;

        if (option.href) {
            $link.href = option.href;
        } else {
            $link.href = '#';
            $link.id = option.id;
        }

        $li.appendChild($link);
        $optionsList.appendChild($li);
    });

    const $btnLogout = document.createElement('button');
    $btnLogout.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded', 'mt-4', 'hover:bg-red-600', 'w-full');
    $btnLogout.textContent = 'Cerrar Sesión';

    $settingsModalContent.appendChild($titleConfig);
    $settingsModalContent.appendChild($hr);
    $settingsModalContent.appendChild($settingsImg);
    $settingsModalContent.appendChild($hr);
    $settingsModalContent.appendChild($optionsList);
    $settingsModalContent.appendChild($btnLogout);
    $settingsModal.appendChild($settingsModalContent);

    // Función para manejar eventos de opciones sin href
    const handleLinkClick = (linkId, action) => {
        const $link = $settingsModalContent.querySelector(`#${linkId}`);
        if ($link) {
            $link.addEventListener('click', action);
        }
    };

    // Evento para "Eliminar Cuenta"
    handleLinkClick('delete-account', async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: '¿Eliminar Cuenta?',
            text: 'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar tu cuenta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar cuenta',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteAccount();
                Swal.fire('Eliminada', 'Tu cuenta ha sido eliminada exitosamente.', 'success');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al eliminar tu cuenta. Por favor, intenta de nuevo más tarde.', 'error');
            }
        }
    });

    // Funcionalidad de Cerrar Sesión
    $btnLogout.addEventListener('click', async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await logout();
                await Swal.fire('Cerrado', 'Has cerrado sesión exitosamente.', 'success');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            await Swal.fire('Error', 'Hubo un problema al cerrar sesión. Por favor, intenta de nuevo más tarde.', 'error');
        }
    });

    // Añadir el modal de configuración al documento
    document.body.appendChild($settingsModal);

    $btnSettings.addEventListener('click', () => {
        $settingsModal.classList.remove('hidden');
    });

    $settingsModal.addEventListener('click', (e) => {
        if (e.target === $settingsModal) {
            $settingsModal.classList.add('hidden');
        }
    });

    return $conteiner;
};
