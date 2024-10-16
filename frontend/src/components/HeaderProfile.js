import { logout } from "../api/user";
import Swal from "sweetalert2";

export const HeaderProfile = () => {
    const $main = document.createElement('div');
    $main.className = "flex flex-col min-h-screen bg-base-200 w-full min-w-screen p-5";

    // --- Contenedor secundario ---
    const $conteiner = document.createElement('div');
    $conteiner.classList.add('flex', 'flex-col', 'md:flex-row', 'justify-between', 'items-center', 'md:items-start', 'gap-6', 'w-full', 'min-w-screen');

    // --- Contenedor para la imagen y el texto ---
    const $leftSide = document.createElement('div');
    $leftSide.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-4', 'items-center', 'md:items-start');

    // Imagen
    const $img = document.createElement('img');
    $img.classList.add('w-32', 'h-32', 'md:w-48', 'md:h-48', 'rounded-full');
    $img.src = 'https://i.pravatar.cc/300';

    // Contenedor para el nombre y la descripción
    const $textContainer = document.createElement('div');
    $textContainer.classList.add('flex', 'flex-col', 'justify-start', 'text-center', 'md:text-left');

    // Nombre del usuario
    const $name = document.createElement('h2');
    $name.classList.add('text-3xl', 'md:text-4xl', 'font-bold');
    $name.textContent = 'Nombre del usuario';

    // Descripción
    const $description = document.createElement('p');
    $description.classList.add('text-gray-600', 'text-base', 'md:text-lg', 'mt-2');
    $description.textContent = 'Esta es la descripción del usuario.';

    // Añadir nombre y descripción al contenedor de texto
    $textContainer.appendChild($name);
    $textContainer.appendChild($description);

    // Añadir imagen y texto al lado izquierdo
    $leftSide.appendChild($img);
    $leftSide.appendChild($textContainer);

    // Botón de cerrar sesión
    const $btnLogout = document.createElement('button');
    $btnLogout.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded-lg', 'hover:bg-red-600', 'text-sm', 'mt-4', 'md:mt-0');
    $btnLogout.textContent = 'Cerrar Sesión';
    $btnLogout.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Realmente deseas cerrar la sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sesión cerrada',
                        text: 'Has cerrado sesión exitosamente',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Redirigir al usuario a la página de inicio o login
                        window.location.href = '/login';
                    });
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cerrar la sesión. Por favor, intenta de nuevo.',
                        confirmButtonText: 'OK'
                    });
                });
            }
        });
    });

    // Añadir el lado izquierdo y el botón de cerrar sesión al contenedor principal
    $conteiner.appendChild($leftSide);
    $conteiner.appendChild($btnLogout);

    // Divisor
    const $divider = document.createElement("div");
    $divider.classList.add("divider", "mt-6");

    // --- Añadir los elementos al DOM ---
    $main.appendChild($conteiner);
    $main.appendChild($divider);

    return $main;
};
