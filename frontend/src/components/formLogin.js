// Asegúrate de incluir Toastify antes de este código
export const formLogin = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "h-96 mt-16 bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-96 mr-32";

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-semibold mb-6 text-center";
  h2.innerText = "Iniciar Sesion";
  formContainer.appendChild(h2);

  const form = document.createElement("form");
  form.className = "space-y-4";
  form.id = "form-login";
  formContainer.appendChild(form);

  function crearFormgroup(labelText, inputType, inputId, name, placeholder = "", required = true) {
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
  const emailLabel = crearFormgroup("Correo electrónico", "email", "mail", "mail");
  form.appendChild(emailLabel);

  const passwordLabel = crearFormgroup("Contraseña", "password", "contrasenia", "contrasenia");
  form.appendChild(passwordLabel);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary w-full py-2 rounded-lg";
  submitButton.innerText = "Ingresar";
  form.appendChild(submitButton);

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const mail = document.getElementById("mail").value;
    const contrasenia = document.getElementById("contrasenia").value;

    if (!mail || !contrasenia) {
      Toastify({
        text: "Todos los campos son obligatorios",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, contrasenia }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        Toastify({
          text: "Inicio de sesión exitoso!",
          backgroundColor: "green",
          duration: 3000,
        }).showToast();
        window.location.href = "/home";
      } else {
        const errorData = await response.json();
        Toastify({
          text: errorData.message || "Error al iniciar sesión",
          backgroundColor: "red",
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      Toastify({
        text: "Error al iniciar sesión. Por favor, intenta de nuevo más tarde.",
        backgroundColor: "red",
        duration: 3000,
      }).showToast();
    }
  });

  return formContainer;
};