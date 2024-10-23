import { notification } from "antd";
import "antd/dist/reset.css";
import { registerUser } from '../api/auth.js';

export const formUser = () => {
  const formContainer = document.createElement("div");
  formContainer.className = "bg-white bg-opacity-95 px-5 pt-5 pb-2 rounded-lg shadow-lg w-2/5 h-fit";

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-semibold mb-6 text-center";
  h2.innerText = "Registro de Usuario";
  formContainer.appendChild(h2);

  const form = document.createElement("form");
  form.className = "space-y-4";
  form.id = "form-register";
  formContainer.appendChild(form);

  // Función para crear grupos de formularios
  function createFormGroup(labelText, inputType, inputId, name, placeholder = "", required = true) {
    const div = document.createElement("div");
    div.className = "form-group";

    const label = document.createElement("label");
    label.className = "block text-sm font-medium";
    label.setAttribute("for", inputId);
    label.innerText = labelText;
    div.appendChild(label);

    const input = document.createElement(inputType === "select" ? "select" : "input");
    input.className = "form-control mt-1 w-full border-gray-300 rounded-lg p-2";
    input.id = inputId;
    input.name = name; // Atributo name para enviar los datos al backend
    if (inputType !== "select") {
      input.type = inputType;
      input.placeholder = placeholder;
      if (required) input.required = true;
    }

    div.appendChild(input);
    return div;
  }

  const nombreField = createFormGroup("Nombre y Apellido:", "text", "nombre", "nombre", "Ingrese su nombre");
  form.appendChild(nombreField);

  const gmailField = createFormGroup("Correo Electrónico (Gmail):", "email", "mail", "mail", "Ingrese su correo de Gmail");
  form.appendChild(gmailField);

  const departamentoField = createFormGroup("Departamento:", "select", "departamento", "departamento");
  const departamentos = ["", "Formosa", "Laishí", "Pilcomayo", "Pilagás", "Pirané", "Ramón Lista", "Matacos", "Bermejo"];
  departamentos.forEach((dep) => {
    const option = document.createElement("option");
    option.value = dep;
    option.innerText = dep === "" ? "Seleccione su departamento" : dep;
    departamentoField.querySelector("select").appendChild(option);
  });
  form.appendChild(departamentoField);

  const localidadField = createFormGroup("Localidad:", "text", "localidad", "localidad", "Ingrese su localidad");
  form.appendChild(localidadField);

  const generoField = createFormGroup("Género (Opcional):", "select", "genero", "genero", "Seleccione su género");
  const generos = ["", "Masculino", "Femenino", "Otro"];
  generos.forEach((gen) => {
    const option = document.createElement("option");
    option.value = gen;
    option.innerText = gen === "" ? "Seleccione su género" : gen;
    generoField.querySelector("select").appendChild(option);
  });
  form.appendChild(generoField);

  const passwordField = createFormGroup("Contraseña:", "password", "contrasenia", "contrasenia", "Ingrese una contraseña");
  form.appendChild(passwordField);

  // Botón de envío
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn w-full btn-primary py-2 rounded-lg";
  submitButton.innerText = "Registrarse";
  form.appendChild(submitButton);

  // Evento de envío del formulario
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const mail = document.getElementById("mail").value.trim();
    const departamento = document.getElementById("departamento").value.trim();
    const localidad = document.getElementById("localidad").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const contrasenia = document.getElementById("contrasenia").value;

    if (!nombre || !mail || !departamento || !localidad || !contrasenia) {
      notification.error({
        message: 'Campos incompletos',
        description: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const result = await registerUser({
        nombre,
        mail,
        departamento,
        localidad,
        genero,
        contrasenia,
        role: "victima",
      });

      // Manejo de respuesta
      if (result && result.success) {
        notification.success({
          message: 'Registro exitoso',
          description: result.message || 'Se ha registrado exitosamente',
        });
        setTimeout(() => {
          window.location.href = "http://localhost:5173/login";
        }, 2000);
      } else {
        notification.error({
          message: 'Error en el registro',
          description: result.error || 'Ocurrió un error durante el registro.',
        });
      }

    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      notification.error({
        message: 'Error en el servidor',
        description: 'Hubo un error en el servidor. Por favor, intente más tarde.',
      });
    }
  });

  return formContainer;
};
