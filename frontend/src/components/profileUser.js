import { getUserProfile, deleteAccount, updateProfile } from '../api/auth';
import { notification } from "antd";
import Swal from 'sweetalert2';

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
    $loading.innerHTML = `...`; // Código del loading permanece igual

    $content.appendChild($loading);

    getUserProfile().then(user => {
        $content.innerHTML = '';

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

        // Mostrar modal de editar datos
        $editButton.addEventListener("click", async () => {
            const editForm = await formEditUser();
            showModal(editForm);
        });

        // Mostrar modal de cambiar contraseña
        $changePasswordButton.addEventListener("click", () => {
            showModal(formEditPassword());
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
                    showNotification('success', 'Cuenta eliminada correctamente.');
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Error al eliminar la cuenta:", error);
                showNotification('error', 'No se pudo eliminar la cuenta. Por favor, intenta de nuevo más tarde.');
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
        $content.innerHTML = `...`; // Mensaje de error permanece igual
        showNotification('error', 'No se pudo cargar el perfil del usuario. Por favor, intente de nuevo más tarde.');
    });

    $card.append($header, $content);
    $container.appendChild($card);

    return $container;
}


// Función para mostrar notificaciones
const showNotification = (type, message) => {
    const $notification = document.createElement("div");
    $notification.classList.add(
        "fixed",
        "bottom-4",
        "right-4",
        "px-6",
        "py-3",
        "rounded-lg",
        "shadow-lg",
        "transform",
        "transition-all",
        "duration-300",
        "ease-out",
        "flex",
        "items-center",
        "space-x-3",
        "z-50",
        type === 'error' ? 'bg-red-500' : 'bg-green-500',
        "translate-y-full",
        "opacity-0"
    );

    const icon = type === 'error'
        ? `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        : `<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

    $notification.innerHTML = `
        <div class="flex-shrink-0">${icon}</div>
        <p class="text-white font-medium">${message}</p>
    `;

    document.body.appendChild($notification);

    requestAnimationFrame(() => {
        $notification.classList.remove("translate-y-full", "opacity-0");
    });

    setTimeout(() => {
        $notification.classList.add("translate-y-full", "opacity-0");
        setTimeout(() => $notification.remove(), 300);
    }, 3000);
};

// Función para mostrar el modal
const showModal = (form) => {
    const $modalOverlay = document.createElement("div");
    $modalOverlay.classList.add(
        "fixed",
        "inset-0",
        "bg-black",
        "bg-opacity-50",
        "backdrop-blur-sm",
        "flex",
        "justify-center",
        "items-center",
        "z-50",
        "p-4",
        "transition-opacity",
        "duration-300",
        "opacity-0"
    );

    const $modal = document.createElement("div");
    $modal.classList.add(
        "bg-white",
        "rounded-xl",
        "shadow-2xl",
        "p-6",
        "w-full",
        "max-w-md",
        "transform",
        "transition-all",
        "duration-300",
        "scale-95",
        "opacity-0"
    );

    requestAnimationFrame(() => {
        $modalOverlay.classList.add("opacity-100");
        $modal.classList.remove("scale-95", "opacity-0");
        $modal.classList.add("scale-100", "opacity-100");
    });

    const $header = document.createElement("div");
    $header.classList.add(
        "flex",
        "justify-between",
        "items-center",
        "mb-6"
    );

    const $closeButton = document.createElement("button");
    $closeButton.innerHTML = `
        <svg class="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    `;
    $closeButton.classList.add(
        "p-1",
        "rounded-full",
        "hover:bg-gray-100",
        "transition-all",
        "duration-150",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-gray-200"
    );

    const closeModal = () => {
        $modalOverlay.classList.remove("opacity-100");
        $modal.classList.remove("scale-100", "opacity-100");
        $modal.classList.add("scale-95", "opacity-0");
        setTimeout(() => $modalOverlay.remove(), 300);
    };

    $closeButton.addEventListener("click", closeModal);
    $modalOverlay.addEventListener("click", (e) => {
        if (e.target === $modalOverlay) closeModal();
    });

    $header.appendChild($closeButton);
    $modal.appendChild($header);
    $modal.appendChild(form);
    $modalOverlay.appendChild($modal);
    document.body.appendChild($modalOverlay);
};



// Función para crear el formulario de edición de usuario
const formEditUser = async () => {
    const userProfile = await getUserProfile();

    if (!userProfile) {
        showNotification('error', 'No se pudo cargar el perfil del usuario');
        return;
    }

    const $form = document.createElement("form");
    $form.classList.add("space-y-6");

    // Título del formulario
    const $title = document.createElement("h2");
    $title.textContent = "Editar Perfil";
    $title.classList.add(
        "text-2xl",
        "font-bold",
        "text-gray-800",
        "text-center",
        "mb-8"
    );
    $form.appendChild($title);

    const fields = [
        {
            label: "Nombre",
            name: "nombre",
            type: "text",
            value: userProfile.nombre,
            icon: `👤`
        },
        {
            label: "Departamento",
            name: "departamento",
            type: "text",
            value: userProfile.departamento,
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>`
        },
        {
            label: "Localidad",
            name: "localidad",
            type: "text",
            value: userProfile.localidad,
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>`
        }
    ];

    // Crear campos del formulario
    fields.forEach(field => {
        const $fieldContainer = document.createElement("div");
        $fieldContainer.classList.add("space-y-1");

        const $label = document.createElement("label");
        $label.textContent = field.label;
        $label.classList.add(
            "block",
            "text-sm",
            "font-medium",
            "text-gray-700"
        );

        const $inputWrapper = document.createElement("div");
        $inputWrapper.classList.add(
            "relative",
            "rounded-md",
            "shadow-sm"
        );

        const $iconWrapper = document.createElement("div");
        $iconWrapper.classList.add(
            "absolute",
            "inset-y-0",
            "left-0",
            "pl-3",
            "flex",
            "items-center",
            "pointer-events-none"
        );
        $iconWrapper.innerHTML = field.icon;

        const $input = document.createElement("input");
        $input.type = field.type;
        $input.name = field.name;
        $input.value = field.value;
        $input.required = true;
        $input.classList.add("block", "w-full", "pl-10", "pr-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "focus:ring-2", "focus:ring-indigo-500", "focus:border-indigo-500", "sm:text-sm", "transition-colors", "duration-200");

        $inputWrapper.appendChild($iconWrapper);
        $inputWrapper.appendChild($input);
        $fieldContainer.appendChild($label);
        $fieldContainer.appendChild($inputWrapper);
        $form.appendChild($fieldContainer);
    });

    // Contenedor de botones
    const $buttonsContainer = document.createElement("div");
    $buttonsContainer.classList.add("flex", "space-x-3", "justify-end", "pt-6");


    // Botón Guardar
    const $submitButton = document.createElement("button");
    $submitButton.type = "submit";
    $submitButton.innerHTML = `
        <span class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Guardar cambios</span>
        </span>
    `;
    $submitButton.classList.add("px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-indigo-600", "border", "border-transparent", "rounded-md", "hover:bg-indigo-700", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "focus:ring-indigo-500", "transition-colors", "duration-200");

    $buttonsContainer.appendChild($submitButton);
    $form.appendChild($buttonsContainer);

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $submitButton.disabled = true;
        $submitButton.classList.add("opacity-75", "cursor-not-allowed");

        try {
            const formData = new FormData($form);
            const data = Object.fromEntries(formData);
            const response = await updateProfile(data);

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Error al actualizar el perfil');
            }

            showNotification('success', '¡Perfil actualizado con éxito!');
            setTimeout(() => {
                const modalOverlay = document.querySelector('.modal-overlay');
                if (modalOverlay) modalOverlay.remove();
            }, 1000);

            // Refrescar la página después de que se cierra el modal
            setTimeout(() => {
                location.reload();
            }, 1100); // Da tiempo para cerrar el modal antes de refrescar

        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            showNotification('error', error.message || 'Hubo un error al actualizar el perfil');
        } finally {
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
        }
    });



    return $form;
};


// Función para crear el formulario de cambio de contraseña
const formEditPassword = () => {
    const $form = document.createElement("form");
    $form.classList.add("space-y-6");

    const $title = document.createElement("h2");
    $title.textContent = "Cambiar Contraseña";
    $title.classList.add(
        "text-2xl",
        "font-bold",
        "text-gray-800",
        "text-center"
    );

    const fields = [
        {
            label: "Contraseña actual",
            name: "currentPassword",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`
        },
        {
            label: "Nueva contraseña",
            name: "newPassword",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>`
        },
        {
            label: "Confirmar nueva contraseña",
            name: "confirmPassword",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        }
    ];

    $form.appendChild($title);

    fields.forEach(field => {
        const $div = document.createElement("div");
        $div.classList.add("space-y-2");

        const $label = document.createElement("label");
        $label.textContent = field.label;
        $label.classList.add(
            "block",
            "text-sm",
            "font-medium",
            "text-gray-700"
        );

        const $inputWrapper = document.createElement("div");
        $inputWrapper.classList.add(
            "relative",
            "rounded-md",
            "shadow-sm"
        );

        const $iconWrapper = document.createElement("div");
        $iconWrapper.classList.add(
            "absolute",
            "inset-y-0",
            "left-0",
            "pl-3",
            "flex",
            "items-center",
            "pointer-events-none"
        );
        $iconWrapper.innerHTML = field.icon;

        const $input = document.createElement("input");
        $input.type = field.type;
        $input.name = field.name;
        $input.classList.add(
            "block",
            "w-full",
            "pl-10",
            "pr-3",
            "py-2",
            "border",
            "border-gray-300",
            "rounded-md",
            "shadow-sm",
            "focus:ring-2",
            "focus:ring-indigo-500",
            "focus:border-indigo-500",
            "sm:text-sm",
            "transition",
            "duration-150",
            "ease-in-out"
        );

        $inputWrapper.appendChild($iconWrapper);
        $inputWrapper.appendChild($input);
        $div.appendChild($label);
        $div.appendChild($inputWrapper);
        $form.appendChild($div);
    });

    // Contenedor de botones
    const $buttonsContainer = document.createElement("div");
    $buttonsContainer.classList.add(
        "flex",
        "space-x-3",
        "justify-end",
        "mt-8"
    );

    // Botón Guardar
    const $submitButton = document.createElement("button");
    $submitButton.type = "submit";
    $submitButton.textContent = "Cambiar contraseña";
    $submitButton.classList.add(
        "px-4",
        "py-2",
        "text-sm",
        "font-medium",
        "text-white",
        "bg-indigo-600",
        "border",
        "border-transparent",
        "rounded-md",
        "hover:bg-indigo-700",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-indigo-500",
        "transition",
        "duration-150",
        "ease-in-out"
    );
    $submitButton.innerHTML = `
        <span class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Cambiar contraseña</span>
        </span>
    `

    $buttonsContainer.appendChild($submitButton);
    $form.appendChild($buttonsContainer);

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $submitButton.disabled = true;
        $submitButton.classList.add("opacity-75", "cursor-not-allowed");

        const formData = new FormData($form);
        const data = Object.fromEntries(formData);

        if (data.newPassword !== data.confirmPassword) {
            showNotification('error', 'Las contraseñas no coinciden');
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
            return;
        }

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');

            showNotification('success', '¡Contraseña actualizada con éxito!');
            setTimeout(() => {
                document.querySelector('.modal-overlay').remove();
            }, 1000);
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            showNotification('error', 'Hubo un error al cambiar la contraseña');
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
        }
    });

    return $form;
};