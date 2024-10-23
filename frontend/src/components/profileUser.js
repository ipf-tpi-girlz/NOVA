import { getUserProfile, deleteAccount } from '../api/auth'
import Swal from 'sweetalert2'

export const ProfileUser = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "justify-center", "items-center", "min-h-screen", "bg-gradient-to-br", "from-purple-100", "to-indigo-200", "p-4");

    const $card = document.createElement("div");
    $card.classList.add("bg-white", "rounded-2xl", "shadow-2xl", "w-full", "max-w-2xl", "overflow-hidden", "transform", "transition-all");

    const $header = document.createElement("div");
    $header.classList.add("bg-gradient-to-r", "from-purple-500", "to-indigo-600", "text-white", "p-8");
    $header.innerHTML = `
        <h2 class="text-4xl font-bold mb-2">Perfil de Usuario</h2>
        <p class="text-purple-100">Bienvenido a tu espacio personal</p>
    `;

    const $content = document.createElement("div");
    $content.classList.add("p-8");

    const $loading = document.createElement("div");
    $loading.classList.add("text-center", "py-8");
    $loading.innerHTML = `
        <svg class="animate-spin h-10 w-10 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-xl text-gray-600">Cargando perfil...</p>
    `;

    $content.appendChild($loading);

    getUserProfile().then(user => {
        $content.innerHTML = ''; // Clear loading message

        const fields = [
            { icon: '👤', label: 'Email', value: user.mail },
            { icon: '🏢', label: 'Departamento', value: user.departamento },
            { icon: '📍', label: 'Localidad', value: user.localidad },
            { icon: '⚧', label: 'Género', value: user.genero },
            { icon: '📅', label: 'Fecha de registro', value: new Date(user.createdAt).toLocaleDateString() }
        ];

        const $fieldsContainer = document.createElement("div");
        $fieldsContainer.classList.add("bg-gray-50", "rounded-xl", "p-6", "mb-6", "shadow-inner");

        fields.forEach(field => {
            const $field = document.createElement("div");
            $field.classList.add("mb-4", "flex", "items-center", "hover:bg-white", "p-2", "rounded-lg", "transition-colors", "duration-200");
            $field.innerHTML = `
                <span class="text-3xl mr-4 bg-purple-100 text-purple-500 p-2 rounded-full">${field.icon}</span>
                <div>
                    <p class="text-sm font-medium text-gray-500">${field.label}</p>
                    <p class="text-lg text-gray-800 font-semibold">${field.value}</p>
                </div>
            `;
            $fieldsContainer.appendChild($field);
        });

        $content.appendChild($fieldsContainer);

        const $configDiv = document.createElement("div");
        $configDiv.classList.add("mt-6");

        const $details = document.createElement("details");
        $details.classList.add("cursor-pointer");

        const $summary = document.createElement("summary");
        $summary.classList.add("text-xl", "font-bold", "mb-4", "text-gray-700", "flex", "items-center", "p-2", "bg-gray-100", "rounded-lg", "hover:bg-gray-200", "transition-colors", "duration-200");

        const $icon = document.createElement("span");
        $icon.classList.add("text-2xl", "mr-2");
        $icon.textContent = "⚙️";

        const $configText = document.createTextNode("Configuración");

        $summary.appendChild($icon);
        $summary.appendChild($configText);

        const $buttonContainer = document.createElement("div");
        $buttonContainer.classList.add("pl-8", "mt-2", "space-y-2");

        const $editButton = document.createElement("button");
        $editButton.classList.add("w-full", "text-left", "px-4", "py-2", "text-purple-600", "hover:bg-purple-50", "rounded-lg", "transition-colors", "duration-200");
        $editButton.textContent = "Editar datos";

        const $changePasswordButton = document.createElement("button");
        $changePasswordButton.classList.add("w-full", "text-left", "px-4", "py-2", "text-blue-600", "hover:bg-blue-50", "rounded-lg", "transition-colors", "duration-200");
        $changePasswordButton.textContent = "Cambiar contraseña";

        const $deleteButton = document.createElement("button");
        $deleteButton.classList.add("w-full", "text-left", "px-4", "py-2", "text-red-600", "hover:bg-red-50", "rounded-lg", "transition-colors", "duration-200");
        $deleteButton.textContent = "Eliminar cuenta";


        $editButton.addEventListener("click", async () => {

        });

        $changePasswordButton.addEventListener("click", async () => {

        });

        $deleteButton.addEventListener("click", async () => {
            try {
                const result = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'Esta acción es irreversible',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                });

                if (result.isConfirmed) {
                    await deleteAccount();
                    await Swal.fire({
                        title: 'Cuenta eliminada',
                        text: 'Tu cuenta ha sido eliminada correctamente',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Error al eliminar la cuenta:", error);
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar la cuenta. Por favor, intenta de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                });
            }
        });

        $buttonContainer.appendChild($editButton);
        $buttonContainer.appendChild($changePasswordButton);
        $buttonContainer.appendChild($deleteButton);

        $details.appendChild($summary);
        $details.appendChild($buttonContainer);

        $configDiv.appendChild($details);

        $content.appendChild($configDiv);

    }).catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        $content.innerHTML = `
            <div class="text-red-500 text-center py-8">
                <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-xl font-semibold">No se pudo cargar el perfil del usuario.</p>
                <p class="mt-2">Por favor, intente de nuevo más tarde.</p>
            </div>
        `;
    });

    $card.append($header, $content);
    $container.appendChild($card);

    return $container;
}

const UpdateProfileUser = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "justify-center", "items-center", "min-h-screen", "bg-gradient-to-br", "from-purple-100", "to-indigo-200", "p-4");
}
