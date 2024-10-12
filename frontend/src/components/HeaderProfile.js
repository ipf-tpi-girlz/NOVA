import { logout } from "../api/user";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    // Contenedor principal: Ocupar todo el ancho disponible
    const $conteiner = document.createElement('div');
    $conteiner.classList.add('bg-base', 'flex', 'justify-between', 'items-start', 'gap-6', 'mx-auto', 'max-w-7xl', 'm-10', 'px-10');

    // Contenedor para la imagen y el texto
    const $leftSide = document.createElement('div');
    $leftSide.classList.add('flex', 'gap-4', 'items-start');

    // Imagen
    const $img = document.createElement('img');
    $img.classList.add('w-48', 'h-48', 'rounded-full'); // Aumentar el tamaño de la imagen
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

    // Añadir el lado izquierdo y los botones al contenedor principal
    $conteiner.appendChild($leftSide);
    $conteiner.appendChild($btnEdit);
    $conteiner.appendChild($btnSettings);

    // Crear el modal para editar perfil
    const $modal = document.createElement('div');
    $modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'justify-center', 'items-center', 'hidden');
    const $modalContent = document.createElement('div');
    $modalContent.classList.add('bg-white', 'rounded-lg', 'p-8', 'shadow-lg', 'max-w-lg', 'w-full');

    // Círculo para la foto
    const $modalImgContainer = document.createElement('div');
    $modalImgContainer.classList.add('flex', 'justify-center');
    const $modalImg = document.createElement('img');
    $modalImg.classList.add('w-24', 'h-24', 'rounded-full');
    $modalImg.src = $img.src;
    $modalImgContainer.appendChild($modalImg);

    // Área de texto para cambiar la descripción
    const $textArea = document.createElement('textarea');
    $textArea.classList.add('mt-4', 'w-full', 'h-32', 'border', 'rounded', 'p-2');
    $textArea.placeholder = 'Ingrese nueva descripción aquí...';

    // Botón de enviar
    const $btnSubmit = document.createElement('button');
    $btnSubmit.classList.add('bg-blue-500', 'text-white', 'p-2', 'rounded', 'mt-4', 'hover:bg-blue-600');
    $btnSubmit.textContent = 'Enviar';

    // Crear un contenedor para centrar el botón
    const $btnContainer = document.createElement('div');
    $btnContainer.classList.add('flex', 'justify-center');
    $btnContainer.appendChild($btnSubmit);

    // Añadir elementos al contenido del modal
    $modalContent.appendChild($modalImgContainer);
    $modalContent.appendChild($textArea);
    $modalContent.appendChild($btnContainer);
    $modal.appendChild($modalContent);

    // Funcionalidad para abrir el modal
    $btnEdit.addEventListener('click', () => {
        $modal.classList.remove('hidden');
    });

    // Funcionalidad para cerrar el modal
    $modal.addEventListener('click', (e) => {
        if (e.target === $modal) {
            $modal.classList.add('hidden');
        }
    });

    // Añadir el modal al contenedor principal
    document.body.appendChild($modal);

    // Crear la barra lateral
    const $sidebar = document.createElement('div');
    $sidebar.classList.add('fixed', 'right-0', 'top-0', 'h-full', 'bg-white', 'shadow-lg', 'w-64', 'hidden', 'shadow-md'); // Agregar sombra al sidebar

    const $sidebarContent = document.createElement('div');
    $sidebarContent.classList.add('flex', 'flex-col', 'h-full', 'justify-between', 'p-6');

    // Título de configuración
    const $titleConfig = document.createElement('h3');
    $titleConfig.classList.add('text-lg', 'font-bold', 'mb-2');
    $titleConfig.textContent = 'Configuración';

    // Imagen de perfil en la barra lateral
    const $sidebarImg = document.createElement('img');
    $sidebarImg.classList.add('w-48', 'h-48', 'rounded-full', 'mb-4', 'mx-auto'); // Centrar la imagen
    $sidebarImg.src = $img.src;

    const $hr = document.createElement('hr'); // Línea horizontal

    // Lista de opciones y sus respectivos enlaces
    const options = [
        { text: 'Editar Datos', href: '/editar-datos' },
        { text: 'Eliminar Cuenta', href: '/eliminar-cuenta' },
        { text: 'Usuarios Bloqueados', href: '/usuarios-bloqueados' },
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
        $link.textContent = option.text; // Nombre de la opción
        $link.href = option.href; // URL correspondiente
        $li.appendChild($link);
        $optionsList.appendChild($li);
    });

    const $btnLogout = document.createElement('button');
    $btnLogout.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded', 'mt-4', 'hover:bg-red-600', 'w-full');
    $btnLogout.textContent = 'Cerrar Sesión';
    const $hr2 = document.createElement('hr');
    // Añadir elementos a la barra lateral
    $sidebarContent.appendChild($titleConfig);
    $sidebarContent.appendChild($hr);
    $sidebarContent.appendChild($sidebarImg);
    $sidebarContent.appendChild($hr2);
    $sidebarContent.appendChild($optionsList);
    $sidebarContent.appendChild($btnLogout);
    $sidebar.appendChild($sidebarContent);
    document.body.appendChild($sidebar);


    $btnSettings.addEventListener('click', () => {
        $sidebar.classList.toggle('hidden');
    });


    $btnLogout.addEventListener('click', async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Quieres cerrar sesión',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await logout(); // Llama a la función de logout
                localStorage.removeItem('token'); // Limpiar el token de sesión
                Swal.fire('Cerrado', 'Has cerrado sesión exitosamente.', 'success'); // Mensaje de éxito
                window.location.href = '/login'; // Redirigir a la página de inicio de sesión
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un problema al cerrar sesión.', 'error'); // Manejo de error
            }

            $sidebar.classList.add('hidden'); // Ocultar la barra lateral
        }
    });

    return $conteiner;


};