export const FormRegisterProf = () => {
  // Crear el contenedor del formulario
  const formContainer = document.createElement("div");
  formContainer.className =
    "bg-base-200 px-5 pt-5 pb-2 rounded-lg shadow md:w-4/5 mx-auto";

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-semibold mb-6 text-center";
  h2.innerText = "Registro de Profesional";
  formContainer.appendChild(h2);

  // Crear el formulario
  const form = document.createElement("form");
  form.className = "space-y-4";
  form.id = "form-prof";
  formContainer.appendChild(form);

  // Función para crear grupos de formularios
  function createFormGroup(
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

  // Crear cada campo del formulario con el atributo 'name' correcto
  const nombreField = createFormGroup(
    "Nombre y Apellido:",
    "text",
    "nombre",
    "nombre",
    "Ingrese su nombre"
  );
  form.appendChild(nombreField);

  const emailField = createFormGroup(
    "Correo Electrónico:",
    "email",
    "mail",
    "mail",
    "Ingrese su correo electrónico"
  );
  form.appendChild(emailField);

  const matriculaField = createFormGroup(
    "Número de Matrícula:",
    "text",
    "nro_matricula",
    "nro_matricula",
    "Ingrese su número de matrícula"
  );
  form.appendChild(matriculaField);

  const especializacionField = createFormGroup(
    "Especialización:",
    "text",
    "especialidad",
    "especialidad",
    "Ej. Psicología clínica, Psicología familiar"
  );
  form.appendChild(especializacionField);

  // Crear el campo select para Departamento
  const departamentoField = createFormGroup(
    "Departamento:",
    "select",
    "departamento",
    "departamento"
  );
  const departamentos = [
    "",
    "Formosa",
    "Laishí",
    "Pilcomayo",
    "Pilagás",
    "Pirané",
    "Ramón Lista",
    "Matacos",
    "Bermejo",
  ];
  departamentos.forEach((dep) => {
    const option = document.createElement("option");
    option.value = dep.toLowerCase();
    option.innerText = dep === "" ? "Seleccione su departamento" : dep;
    departamentoField.querySelector("select").appendChild(option);
  });
  form.appendChild(departamentoField);

  const localidadField = createFormGroup(
    "Localidad:",
    "text",
    "localidad",
    "localidad",
    "Ingrese su localidad"
  );
  form.appendChild(localidadField);

  const generoField = createFormGroup(
    "Género (Opcional):",
    "select",
    "genero",
    "genero"
  );
  const generos = ["", "Femenino", "Masculino", "Otro"];
  generos.forEach((gen) => {
    const option = document.createElement("option");
    option.value = gen.toLowerCase();
    option.innerText = gen === "" ? "Seleccione su género" : gen;
    generoField.querySelector("select").appendChild(option);
  });
  form.appendChild(generoField);

  const passwordField = createFormGroup(
    "Contraseña:",
    "password",
    "contrasenia",
    "contrasenia",
    "Ingrese una contraseña"
  );
  form.appendChild(passwordField);

  // Botón de envío
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className =
    "btn btn-primary w-full bg-blue-600 text-white py-2 rounded mt-4";
  submitButton.innerText = "Registrarse";
  form.appendChild(submitButton);

  // Evento de envío del formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const mail = document.getElementById("mail").value;
    const nro_matricula = document.getElementById("nro_matricula").value;
    const especialidad = document.getElementById("especialidad").value;
    const departamento = document.getElementById("departamento").value;
    const localidad = document.getElementById("localidad").value;
    const genero = document.getElementById("genero").value;
    const contrasenia = document.getElementById("contrasenia").value;

    // Validar los campos
    if (
      nombre === "" ||
      mail === "" ||
      nro_matricula === "" ||
      especialidad === "" ||
      departamento === "" ||
      localidad === "" ||
      contrasenia === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      // Enviar los datos al backend usando fetch
      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          mail,
          nro_matricula,
          especialidad,
          departamento,
          localidad,
          genero,
          contrasenia,
          role: "profesional",
        }),
      });
      const result = await response.json();
      console.log(result);

      // Si el registro es exitoso, redirigir al login
      if (result.ok) {
        alert("Registro exitoso");
        window.location.href = "http://localhost:5173/login";
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  });

  return formContainer;
};
