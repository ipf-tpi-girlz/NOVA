export const formLogin = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    " h-96 mt-16 bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-96 mr-32";
  const container = document.createElement("div");
  container.appendChild(formContainer);

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-semibold mb-6 text-center";
  h2.innerText = "Iniciar Sesion";
  formContainer.appendChild(h2);

  // Crear el formulario
  const form = document.createElement("form");
  form.className = "space-y-4";
  form.id = "form-login";
  formContainer.appendChild(form);

  //funcion para crear usuario
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
    input.name = name; // Atributo name para enviar los datos al backend
    if (inputType !== "select") {
      input.type = inputType;
      input.placeholder = placeholder;
      if (required) input.required = true;
    }

    div.appendChild(input);
    return div;
  }

  // Crear el formulario con los campos
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

  // Botón de envío
  const submitButtoon = document.createElement("button");
  submitButtoon.type = "submit";
  submitButtoon.className = "btn btn-primary w-full  py-2 rounded-lg ";
  submitButtoon.innerText = "Ingresar";
  submitButtoon.setAttribute = ("href", "/home");
  form.appendChild(submitButtoon);

  // evento
  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    //obtenemos el valor del formulario
    const mail = document.getElementById("mail").value;
    const contrasenia = document.getElementById("contrasenia").value;

    // Validar los datos
    if (!mail || !contrasenia) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Enviar los datos al backend
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, contrasenia }),
      });

      // Si el login fue exitoso
      if (response.ok) {
        const result = await response.text();
        console.log(result);
        // Redireccionar al dashboard
        window.location.href = "http://localhost:5173/home";
      } else {
        // Mostrar el error en caso de falla
        console.log(response);
        alert("Error al iniciar sesión. Verifica tu correo y contraseña.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  });

  return formContainer;
};
