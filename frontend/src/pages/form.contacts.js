import { showNotification } from "../components/notification.js";

export const formContacts = () => {
    // Contenedor principal con fondo degradado actualizado
    const container = document.createElement('div');
    container.className = 'flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-base-100 to-blue-200 p-6';

    // Contenedor del formulario con efecto glassmorphism mejorado
    const formWrapper = document.createElement('div');
    formWrapper.className = 'w-full max-w-xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/50 hover:border-white/70 transition-colors duration-200 bg-opacity-50';

    // Icono principal y contenedor del encabezado
    const headerContainer = document.createElement('div');
    headerContainer.className = 'text-center space-y-3 mb-8';

    // Icono de mensaje principal
    const mainIcon = document.createElement('div');
    mainIcon.innerHTML = `
        <svg class="w-16 h-16 mx-auto text-blue-600 hover:text-blue-800 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
    `;
    headerContainer.appendChild(mainIcon);

    const $title = document.createElement('h1');
    $title.textContent = 'Contáctanos';
    $title.className = 'text-3xl font-bold text-blue-600 tracking-tight hover:text-blue-800 transition-colors duration-200';

    const $subtitle = document.createElement('h2');
    $subtitle.textContent = 'Tu opinión nos ayuda a mejorar para dar una mejor experiencia';
    $subtitle.className = 'text-gray-600 text-lg';

    headerContainer.appendChild($title);
    headerContainer.appendChild($subtitle);
    formWrapper.appendChild(headerContainer);

    // Formulario
    const $form = document.createElement('form');
    $form.id = 'form';
    $form.className = 'space-y-6';

    const fields = [
        {
            name: 'to_name',
            label: 'Nombre:',
            type: 'text',
            placeholder: 'Ingresa tu nombre',
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>`
        },
        {
            name: 'email',
            label: 'Correo electrónico:',
            type: 'email',
            placeholder: 'correo@ejemplo.com',
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>`
        },
        {
            name: 'message',
            label: 'Mensaje:',
            type: 'textarea',
            placeholder: 'Escribe tu mensaje aquí...',
            icon: `<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>`
        }
    ];

    fields.forEach(field => {
        const $fieldDiv = document.createElement('div');
        $fieldDiv.className = 'space-y-2';

        const $label = document.createElement('label');
        $label.htmlFor = field.name;
        $label.textContent = field.label;
        $label.className = 'block text-sm font-medium text-gray-700';

        const $inputWrapper = document.createElement('div');
        $inputWrapper.className = 'relative';

        const $iconContainer = document.createElement('div');
        $iconContainer.className = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none';
        $iconContainer.innerHTML = field.icon;

        if (field.type === 'textarea') {
            const $textarea = document.createElement('textarea');
            $textarea.name = field.name;
            $textarea.id = field.name;
            $textarea.placeholder = field.placeholder;
            $textarea.rows = 4;
            $textarea.className = 'w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ease-in-out resize-none bg-white/70 placeholder-gray-400';

            $inputWrapper.appendChild($iconContainer);
            $inputWrapper.appendChild($textarea);
        } else {
            const $input = document.createElement('input');
            $input.type = field.type;
            $input.name = field.name;
            $input.id = field.name;
            $input.placeholder = field.placeholder;
            $input.className = 'w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ease-in-out bg-white/70 placeholder-gray-400';

            $inputWrapper.appendChild($iconContainer);
            $inputWrapper.appendChild($input);
        }

        $fieldDiv.appendChild($label);
        $fieldDiv.appendChild($inputWrapper);
        $form.appendChild($fieldDiv);
    });

    // Contenedor del botón con efectos mejorados
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'mt-8';

    const $submitButton = document.createElement('button');
    $submitButton.type = 'submit';
    $submitButton.id = 'button';
    $submitButton.className = `
        w-full bg-gradient-to-r from-blue-500 to-purple-500 
        text-white font-semibold py-3 px-6 rounded-lg
        hover:from-blue-600 hover:to-purple-600 
        transform transition-all duration-200 
        hover:shadow-lg hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
    `;

    // Agregar icono al botón
    $submitButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
        </svg>
        <span>Enviar mensaje</span>
    `;

    buttonContainer.appendChild($submitButton);
    $form.appendChild(buttonContainer);

    // Scripts de EmailJS
    const $script1 = document.createElement('script');
    $script1.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    $script1.type = 'text/javascript';
    $script1.onload = () => {
        emailjs.init('nx-5tMCeC94l6edpK');
    };

    // Manejo del envío del formulario con estado de carga mejorado
    $form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validaciones
        const name = $form.to_name.value.trim();
        const email = $form.email.value.trim();
        const message = $form.message.value.trim();

        if (!name) {
            showNotification('error', 'Por favor, ingresa tu nombre.');
            return;
        }

        if (!email) {
            showNotification('error', 'Por favor, ingresa tu correo electrónico.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!message) {
            showNotification('error', 'Por favor, escribe un mensaje.');
            return;
        }

        $submitButton.disabled = true;
        $submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Enviando...</span>
        `;

        const serviceID = 'default_service';
        const templateID = 'template_u1l8bqy';

        emailjs.sendForm(serviceID, templateID, $form)
            .then(() => {
                $submitButton.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                    <span>Enviar mensaje</span>
                `;
                $submitButton.disabled = false;
                showNotification('success', '¡Mensaje enviado con éxito!');
                $form.reset();
            }, (err) => {
                $submitButton.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                    <span>Enviar mensaje</span>
                `;
                $submitButton.disabled = false;
                showNotification('error', 'Error al enviar el mensaje: ' + JSON.stringify(err));
            });
    });

    // Ensamblaje final
    formWrapper.appendChild($form);
    container.appendChild(formWrapper);
    document.body.appendChild(container);
    document.body.appendChild($script1);

    return container;
};
