import { getUserProfile, deleteAccount, updateProfile, updatePassword } from '../api/auth.js';
import Swal from 'sweetalert2';
import { showNotification } from '../components/notification.js';
import { HeaderProfile } from './HeaderProfile.js';
import { HeaderProf } from './HeaderProf.js';



const ProfileUser = () => {
    const $container = document.createElement("div");

    const $card = document.createElement("div");
    $card.classList.add("bg-base-100", "border", "rounded-2xl", "w-full", "max-w-2xl", "transform", "transition-all");

    const $header = document.createElement("div");
    $header.classList.add("bg-gradient-to-r", "from-base-300", "to-indigo-200", "text", "p-8");
    $header.innerHTML = `
        <h2 class="text-4xl font-bold mb-2">Perfil de Usuario</h2>
        <p class="text">Bienvenido a tu espacio personal</p>
    `;

    const $content = document.createElement("div");
    $content.classList.add("p-8");

    const $loading = document.createElement("div");
    $loading.classList.add("text-center", "py-8");
    $loading.innerHTML = `...`; // Código del loading permanece igual

    $content.appendChild($loading);

    // Llamamos a getUserProfile() usando .then() en vez de await
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
        $fieldsContainer.classList.add("bg-base-200", "border", "border-gray-300", "rounded-xl", "p-6", "mb-6", "shadow-inner");

        fields.forEach(field => {
            const $field = document.createElement("div");
            $field.classList.add("mb-4", "flex", "items-center", "hover:bg-base-300", "p-2", "rounded-lg", "transition-colors", "duration-200");
            $field.innerHTML = `
                <span class="text-3xl mr-4 bg-base-100 bg-cover text p-2 rounded-full">${field.icon}</span>
                <div>
                    <p class="text-sm font-medium text">${field.label}</p>
                    <p class="text-lg text font-semibold">${field.value}</p>
                </div>
            `;
            $fieldsContainer.appendChild($field);
        });

        $content.appendChild($fieldsContainer);

        // Contenedor de la configuración
        const $configDiv = document.createElement("div");
        $configDiv.classList.add("mt-6");

        const $details = document.createElement("details");
        $details.classList.add("cursor-pointer");

        const $summary = document.createElement("summary");
        $summary.classList.add("text-xl", "font-bold", "mb-4", "text", "flex", "items-center", "p-2", "bg-base-200", "border", "border-gray-300", "rounded-lg", "hover:bg-base-300", "bg-cover", "transition-colors", "duration-200");

        const $icon = document.createElement("span");
        $icon.classList.add("text-2xl", "mr-2");
        $icon.textContent = "⚙️";

        const $configText = document.createTextNode("Configuración");

        $summary.appendChild($icon);
        $summary.appendChild($configText);

        // Contenedor de botones
        const $buttonContainer = document.createElement("div");
        $buttonContainer.classList.add("pl-8", "mt-2", "space-y-2");

        const $editButton = document.createElement("button");
        $editButton.classList.add("w-full", "text-left", "px-4", "py-2", "text", "hover:bg-base-300", "rounded-lg", "transition-colors", "duration-200");
        $editButton.textContent = "Editar datos";

        const $changePasswordButton = document.createElement("button");
        $changePasswordButton.classList.add("w-full", "text-left", "px-4", "py-2", "text", "hover:bg-base-300", "rounded-lg", "transition-colors", "duration-200");
        $changePasswordButton.textContent = "Cambiar contraseña";

        const $deleteButton = document.createElement("button");
        $deleteButton.classList.add("w-full", "text-left", "px-4", "py-2", "text", "hover:bg-base-300", "rounded-lg", "transition-colors", "duration-200");
        $deleteButton.textContent = "Eliminar cuenta";

        // Añadir la funcionalidad de los botones
        $editButton.addEventListener("click", () => {
            formEditUser().then(editForm => {
                showModal(editForm);
            });
        });

        $changePasswordButton.addEventListener("click", () => {
            showModal(formEditPassword());
        });

        $deleteButton.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción es irreversible',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(result => {
                if (result.isConfirmed) {
                    deleteAccount().then(() => {
                        showNotification('success', 'Cuenta eliminada correctamente.');
                        window.location.href = "/";
                    }).catch(error => {
                        console.error("Error al eliminar la cuenta:", error);
                        showNotification('error', 'No se pudo eliminar la cuenta. Por favor, intenta de nuevo más tarde.');
                    });
                }
            });
        });

        // Condicional: Si es profesional, agregar el botón "Editar descripción"
        if (user.role === "profesional") {
            const $editDesc = document.createElement("button");
            $editDesc.classList.add("w-full", "text-left", "px-4", "py-2", "text", "hover:bg-base-300", "rounded-lg", "transition-colors", "duration-200");
            $editDesc.textContent = "Editar descripción";

            $editDesc.addEventListener("click", () => {
                showModal(formProfesional());

            });

            $buttonContainer.appendChild($editDesc);
        }

        // Agregar los botones al contenedor
        $buttonContainer.appendChild($editButton);
        $buttonContainer.appendChild($changePasswordButton);
        $buttonContainer.appendChild($deleteButton);

        $details.appendChild($summary);
        $details.appendChild($buttonContainer);

        $configDiv.appendChild($details);

        $content.appendChild($configDiv);

    }).catch(error => {
        console.error("Error al obtener el perfil del usuario:", error);
        $content.innerHTML = `Error al cargar el perfil. Por favor, intenta de nuevo más tarde.`;
        showNotification('error', 'No se pudo cargar el perfil del usuario. Por favor, intente de nuevo más tarde.');
    });

    $card.append($header, $content);
    $container.appendChild($card);
    return $container;
};



const showModal = (form) => {
    if (!(form instanceof HTMLElement)) {
        console.error("Error: `form` no es un elemento HTML válido.");
        return;
    }

    const $modalOverlay = document.createElement("div");
    $modalOverlay.classList.add("fixed", "inset-0", "bg-base", "bg-opacity-50", "backdrop-blur-sm", "flex", "justify-center", "items-center", "z-50", "p-4", "duration-300", "opacity-0");

    const $modal = document.createElement("div");
    $modal.classList.add("bg-base", "rounded-xl", "shadow-2xl", "p-6", "w-full", "max-w-md");

    requestAnimationFrame(() => {
        $modalOverlay.classList.add("opacity-100");
        $modal.classList.remove("scale-95", "opacity-0");
        $modal.classList.add("scale-100", "opacity-100");
    });

    // Resto del código del modal
    const $header = document.createElement("div");
    $header.classList.add("flex", "justify-between", "items-center", "mb-6");

    const $closeButton = document.createElement("button");
    $closeButton.innerHTML = `
        <svg class="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    `;
    $closeButton.classList.add("p-1", "rounded-full", "hover:bg-gray-100", "transition-all", "duration-150", "focus:outline-none", "focus:ring-2", "focus:ring-gray-200");

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

    // Agregar el formulario si es válido
    $modal.appendChild(form);

    $modalOverlay.appendChild($modal);
    document.body.appendChild($modalOverlay);
};


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
    $title.classList.add("text-2xl", "font-bold", "text", "text-center", "mb-8");
    $form.appendChild($title);

    // Campos del formulario (nombre, departamento, etc.)
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



    // Contenedor de la imagen de perfil
    const $imgContent = document.createElement("div");
    $imgContent.classList.add("flex", "items-center", "space-x-2");

    const $img = document.createElement("img");
    $img.src = userProfile.img ? userProfile.img : "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg";
    $img.classList.add("w-36", "h-36", "rounded-full", "mx-auto", "object-cover", "text-center");

    // Input oculto para la imagen
    const $imgInput = document.createElement("input");
    $imgInput.type = "file";
    $imgInput.accept = "image/*";
    $imgInput.classList.add("hidden");

    // Cuando se hace clic en la imagen, se activa el input de archivo
    $img.addEventListener("click", () => {
        $imgInput.click();
    });

    // Cuando se selecciona una imagen
    $imgInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });


    $imgContent.appendChild($img);
    $imgContent.appendChild($imgInput);


    $form.appendChild($imgContent);

    // Crear los demás campos del formulario como en tu código original
    fields.forEach(field => {
        const $fieldContainer = document.createElement("div");
        $fieldContainer.classList.add("space-y-3", "max-w-md", "mx-auto", "w-full");

        const $label = document.createElement("label");
        $label.textContent = field.label;
        $label.classList.add("block", "text-sm", "font-medium", "text");

        const $inputWrapper = document.createElement("div");
        $inputWrapper.classList.add("relative", "rounded-md", "shadow-sm", "bg-base-100");

        const $iconWrapper = document.createElement("div");
        $iconWrapper.classList.add("absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none");
        $iconWrapper.innerHTML = field.icon;

        const $input = document.createElement("input");
        $input.type = field.type;
        $input.name = field.name;
        $input.classList.add("block", "w-full", "pl-10", "pr-3", "py-2", "border", "border-gray-300", "rounded-md", "bg-base-100", "bg-cover", "shadow-sm", "focus:ring-2", "focus:ring-base-200", "sm:text-sm", "transition-colors", "duration-200");

        if (field.type === "file") {
            // Dejar este campo sin cambios ya que se maneja en otro bloque
        } else {
            $input.value = field.value;
        }

        $inputWrapper.appendChild($iconWrapper);
        $inputWrapper.appendChild($input);

        $fieldContainer.appendChild($label);
        $fieldContainer.appendChild($inputWrapper);
        $form.appendChild($fieldContainer);
    });

    // Botón de envío (Guardar cambios)
    const $buttonsContainer = document.createElement("div");
    $buttonsContainer.classList.add("flex", "space-x-3", "justify-end", "pt-6");

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
    $submitButton.classList.add("px-4", "py-2", "text-sm", "font-medium", "text", "bg-base-200", "bg-cover", "border", "border-gray-300", "rounded-md");
    $buttonsContainer.appendChild($submitButton);
    $form.appendChild($buttonsContainer);

    // Manejo del formulario de envío
    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $submitButton.disabled = true;
        $submitButton.classList.add("opacity-75", "cursor-not-allowed");

        try {
            const formData = new FormData();
            formData.append("nombre", $form.nombre.value);
            formData.append("departamento", $form.departamento.value);
            formData.append("localidad", $form.localidad.value);

            const fileInput = $form.img;
            if (fileInput.files[0]) {
                formData.append("img", fileInput.files[0]);
            }

            const response = await updateProfile(formData);

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || "Error al actualizar el perfil");
            }

            showNotification("success", "¡Perfil actualizado con éxito!");
            setTimeout(() => {
                closeModal();
            }, 1000);
            setTimeout(() => {
                location.reload();
            }, 1000);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            showNotification("error", error.message || "Hubo un error al actualizar el perfil");
        } finally {
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
        }
    });

    return $form;
};

const formProfesional = () => {
    getUserProfile()

        .then(userProfile => {
            if (!userProfile) {
                showNotification('error', 'No se pudo cargar el perfil del usuario');
                return;
            }
            const form = document.createElement("form"); // Esto es válido

            console.log(userProfile)

            form.classList.add("space-y-6");

            // Título del formulario
            const $title = document.createElement("h2");
            $title.textContent = "Editar Perfil";
            $title.classList.add("text-2xl", "font-bold", "text-gray-800", "text-center", "mb-8");
            form.appendChild($title);

            const fields = [
                {
                    label: "Descripción",
                    name: "descripcion",
                    type: "text",
                    value: userProfile.perfil.descripcion || "",
                    icon: ``
                },
                {
                    label: "Teléfono",
                    name: "nro_telefono",
                    type: "tel",
                    value: userProfile.perfil.nro_telefono || "",
                    icon: ``
                },
                {
                    label: "Dirección",
                    name: "direccion",
                    type: "text",
                    value: userProfile.perfil.direccion || "",
                    icon: ``
                },
                {
                    label: "Modo de Atención",
                    name: "modo_atencion",
                    type: "text",
                    value: userProfile.perfil.modo_atencion || "",
                    icon: ``
                },
                {
                    label: "Especialidad",
                    name: "especialidad",
                    type: "text",
                    value: userProfile.perfil.especialidad || "",
                    icon: ``
                }
            ];

            // Crear los demás campos del formulario como en tu código original
            fields.forEach(field => {
                const $fieldContainer = document.createElement("div");
                $fieldContainer.classList.add("space-y-3", "max-w-md", "mx-auto", "w-full");

                const $label = document.createElement("label");
                $label.textContent = field.label;
                $label.classList.add("block", "text-sm", "font-medium", "text-gray-700");

                const $inputWrapper = document.createElement("div");
                $inputWrapper.classList.add("relative", "rounded-md", "shadow-sm");

                const $iconWrapper = document.createElement("div");
                $iconWrapper.classList.add("absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none");
                $iconWrapper.innerHTML = field.icon;

                const $input = document.createElement("input");
                $input.type = field.type;
                $input.name = field.name;
                $input.classList.add("block", "w-full", "pl-10", "pr-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "focus:ring-2", "focus:ring-indigo-500", "focus:border-indigo-500", "sm:text-sm", "transition-colors", "duration-200");

                $inputWrapper.appendChild($iconWrapper);
                $inputWrapper.appendChild($input);

                $fieldContainer.appendChild($label);
                $fieldContainer.appendChild($inputWrapper);
                form.appendChild($fieldContainer);
            });

            // Botón de envío (Guardar cambios)
            const $buttonsContainer = document.createElement("div");
            $buttonsContainer.classList.add("flex", "space-x-3", "justify-end", "pt-6");

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
            form.appendChild($buttonsContainer);

            // Manejo del formulario de envío
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                $submitButton.disabled = true;
                $submitButton.classList.add("opacity-75", "cursor-not-allowed");

                try {
                    const formData = new FormData();
                    formData.append("descripcion", form.description.value);
                    formData.append("nro_telefono", form.nro_telefono.value);
                    formData.append("direccion", form.direccion.value);
                    formData.append("modo_atencion", form.modo_atencion.value);
                    formData.append("especialidad", form.especialidad.value);

                    const response = await updateProfile(formData);

                    if (!response.ok) {
                        const errorResult = await response.json();
                        throw new Error(errorResult.message || "Error al actualizar el perfil");
                    }

                    showNotification("success", "¡Perfil actualizado con éxito!");
                    setTimeout(() => {
                        closeModal();
                    }, 1000);
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } catch (error) {
                    console.error("Error al actualizar el perfil:", error);
                    showNotification("error", error.message || "Hubo un error al actualizar el perfil");
                } finally {
                    $submitButton.disabled = false;
                    $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
                }
            });
            return form;
        })
};



const formEditPassword = () => {
    const $form = document.createElement("form");
    $form.classList.add("space-y-6");

    const $imgProfile = document.createElement("img");
    $imgProfile.src = "/assets/img/profile.png";
    $imgProfile.classList.add("w-20", "h-20", "rounded-full", "mx-auto");

    const $title = document.createElement("h2");
    $title.textContent = "Cambiar Contraseña";
    $title.classList.add("text-2xl", "font-bold", "text", "text-center");

    const fields = [
        {
            label: "Contraseña actual",
            name: "contrasenia",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`,
            errorMessage: ''
        },
        {
            label: "Nueva contraseña",
            name: "nueva_contrasenia",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>`,
            errorMessage: ''
        },
        {
            label: "Confirmar nueva contraseña",
            name: "confirmPassword",
            type: "password",
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            errorMessage: ''
        }
    ];

    $form.appendChild($title);

    fields.forEach(field => {
        const $div = document.createElement("div");
        $div.classList.add("space-y-2");

        const $label = document.createElement("label");
        $label.textContent = field.label;
        $label.classList.add("block", "text-sm", "font-medium", "text");

        const $inputWrapper = document.createElement("div");
        $inputWrapper.classList.add("relative", "rounded-md", "shadow-sm", "bg-base-100");

        const $iconWrapper = document.createElement("div");
        $iconWrapper.classList.add("absolute", "inset-y-0", "left-0", "pl-3", "flex", "items-center", "pointer-events-none");
        $iconWrapper.innerHTML = field.icon;

        const $input = document.createElement("input");
        $input.type = field.type;
        $input.name = field.name;
        $input.classList.add("block", "w-full", "pl-10", "pr-3", "py-2", "bg-base-100", "border", "border-gray-300", "rounded-md", "shadow-sm", "focus:ring-2", "focus:ring-indigo-500", "focus:border-indigo-500", "sm:text-sm", "transition", "duration-150", "ease-in-out");

        const $errorMessage = document.createElement("span");
        $errorMessage.classList.add("text-sm", "text-red-600", "hidden");
        $errorMessage.textContent = field.errorMessage;

        $inputWrapper.appendChild($iconWrapper);
        $inputWrapper.appendChild($input);
        $div.appendChild($label);
        $div.appendChild($inputWrapper);
        $div.appendChild($errorMessage);
        $form.appendChild($div);
    });

    // Contenedor de botones
    const $buttonsContainer = document.createElement("div");
    $buttonsContainer.classList.add("flex", "space-x-3", "justify-end", "mt-8");

    // Botón Guardar
    const $submitButton = document.createElement("button");
    $submitButton.type = "submit";
    $submitButton.textContent = "Cambiar contraseña";
    $submitButton.classList.add("px-4", "py-2", "text-sm", "font-medium", "text", "bg-base-300", "border", "border-transparent", "rounded-md");
    $submitButton.innerHTML = `
        <span class="flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Cambiar contraseña</span>
        </span>
    `;

    $buttonsContainer.appendChild($submitButton);
    $form.appendChild($buttonsContainer);

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        $submitButton.disabled = true;
        $submitButton.classList.add("opacity-75", "cursor-not-allowed");

        const formData = new FormData($form);
        const data = Object.fromEntries(formData);

        // Limpiar mensajes de error
        const errorMessages = $form.querySelectorAll("span.text-red-600");
        errorMessages.forEach($msg => {
            $msg.textContent = '';
            $msg.classList.add('hidden');
        });

        // Validación de contraseñas
        if (data.nueva_contrasenia !== data.confirmPassword) {
            const $confirmPasswordError = errorMessages[2];
            $confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
            $confirmPasswordError.classList.remove('hidden');
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
            return;
        }

        try {
            const responseData = await updatePassword(data);
            console.log("Respuesta del servidor:", responseData.message);

            showNotification('success', '¡Contraseña actualizada con éxito!');
            setTimeout(() => {
                document.querySelector('.modal-overlay').remove();
            }, 1000);
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            showNotification('error', error.message || 'Hubo un error al cambiar la contraseña');
            $submitButton.disabled = false;
            $submitButton.classList.remove("opacity-75", "cursor-not-allowed");
        }
    });

    return $form;
};

export const Perfil = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "bg-base-", "min-h-screen", "items-stretch");
    getUserProfile().then((data) => {

        $container.appendChild(ProfileUser())
        if (data.role === "profesional" || data.role === "institucion") {
            $container.appendChild(HeaderProf())
        } else {
            $container.appendChild(HeaderProfile())
        }


    })


    return $container;
}