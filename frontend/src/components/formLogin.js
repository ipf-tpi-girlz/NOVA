import { notification } from "antd"; // Asegúrate de tener esta línea para usar las notificaciones
import { loginUser } from "../api/auth.js";

export const formLogin = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "h-96 mt-16 bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-96 mr-32";
  const container = document.createElement("div");
  container.appendChild(formContainer);

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-semibold mb-6 text-center";
  h2.innerText = "Iniciar Sesión";
  formContainer.appendChild(h2);

  const form = document.createElement("form");
  form.className = "space-y-4";
  form.id = "form-login";
  formContainer.appendChild(form);

  function crearFormgroup(
    labelText,
    inputType,
    inputId,
    name,
    placeholder = "",
    required = true
  ) {
    const div = document.createElement("div");
    div.className = "form-group";

    const label = document.createElement("label");
    label.className = "block text-sm font-medium";
    label.setAttribute("for", inputId);
    label.innerText = labelText;
    div.appendChild(label);

    const input = document.createElement(
      inputType === "select" ? "select" : "input"
    );
    input.className = "form-control mt-1 w-full border-gray-300 rounded-lg p-2";
    input.id = inputId;
    input.name = name;
    if (inputType !== "select") {
      input.type = inputType;
      input.placeholder = placeholder;
      if (required) input.required = true;
    }

    div.appendChild(input);
    return div;
  }

  const emailLabel = crearFormgroup(
    "Correo electrónico",
    "email",
    "mail",
    "mail"
  );
  form.appendChild(emailLabel);

  const passwordLabel = crearFormgroup(
    "Contraseña",
    "password",
    "contrasenia",
    "contrasenia"
  );
  form.appendChild(passwordLabel);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary w-full py-2 rounded-lg";
  submitButton.innerText = "Ingresar";
  form.appendChild(submitButton);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const mail = document.getElementById("mail").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;

    if (!mail || !contrasenia) {
      notification.error({
        message: 'Campos incompletos',
        description: 'Todos los campos son obligatorios',
      });
      return;
    }
    try {
      const response = await loginUser(mail, contrasenia);

      if (response && response.success) {
        notification.success({
          message: 'Inicio de sesión exitoso',
          description: response.message,
        });
        // Redirigir a la página de inicio
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        notification.error({
          message: 'Error al iniciar sesión',
          description: response.message || 'Por favor, verifica tus credenciales.',
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      notification.error({
        message: 'Error en el servidor',
        description: 'Por favor, intenta de nuevo más tarde.',
      });
    }
  });

  return formContainer;
};
