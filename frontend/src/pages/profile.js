import { updateProfile, getUserProfilePicture } from "../api/user.js";
import Swal from "sweetalert2";

// Crea el formulario de perfil dinámicamente
const createProfileForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className =
    "flex flex-col items-center bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-10";

  const title = document.createElement("h2");
  title.textContent = "Actualizar Perfil";
  title.className = "text-2xl font-semibold mb-4";
  formContainer.appendChild(title);

  const form = document.createElement("form");
  form.id = "profileForm";
  form.className = "w-full";

  const label = document.createElement("label");
  label.htmlFor = "imgInput";
  label.className = "relative cursor-pointer mb-4 flex justify-center";

  const profileImg = document.createElement("img");
  profileImg.id = "profileImg";
  profileImg.src = "ruta/a/la/imagen/default.jpg"; // Imagen predeterminada
  profileImg.alt = "Perfil";
  profileImg.className = "w-32 h-32 rounded-full border-2 border-gray-300 mb-2";

  const imgInput = document.createElement("input");
  imgInput.type = "file";
  imgInput.id = "imgInput";
  imgInput.accept = "image/*";
  imgInput.className = "absolute inset-0 opacity-0 cursor-pointer";

  // Evento para la previsualización de la imagen seleccionada
  imgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profileImg.src = event.target.result; // Actualiza el src de la imagen para previsualizar
      };
      reader.readAsDataURL(file); // Lee el archivo de imagen y convierte a base64
    }
  });

  label.appendChild(profileImg);
  label.appendChild(imgInput);
  form.appendChild(label);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "descriptionInput";
  descriptionInput.placeholder = "Descripción";
  descriptionInput.className =
    "textarea textarea-bordered w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";
  descriptionInput.rows = 3;
  form.appendChild(descriptionInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className =
    "btn btn-primary w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200";
  submitButton.textContent = "Actualizar Perfil";
  form.appendChild(submitButton);

  // Agrega el evento de envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await handleProfileUpdate(imgInput, descriptionInput, profileImg);
  });

  formContainer.appendChild(form);
  return formContainer; // Devuelve el contenedor del formulario
};

// Función para manejar la actualización del perfil
const handleProfileUpdate = async (imgInput, descriptionInput, profileImg) => {
  const img = imgInput.files[0];
  const description = descriptionInput.value;

  if (!img && !description) {
    Swal.fire({
      title: "Advertencia",
      text: "Debes seleccionar una imagen o ingresar una descripción.",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    const userData = {
      img: img || null, // Asegúrate de que img se envíe correctamente
      description: description || null,
    };

    const result = await updateProfile(userData);

    // Actualizar la imagen de perfil en la interfaz solo después de la respuesta exitosa del servidor
    if (result.perfil && result.perfil.img) {
      profileImg.src = result.perfil.img; // Utiliza la URL completa directamente
    }

    Swal.fire({
      title: "¡Éxito!",
      text: "Perfil actualizado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error al actualizar el perfil.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    console.error("Error:", error);
  }
};

// Función para cargar la imagen de perfil al iniciar
const loadProfilePicture = async (profileImg) => {
  try {
    const result = await getUserProfilePicture();
    if (result && result.img) {
      profileImg.src = result.img; // Actualiza la imagen de perfil con la URL recibida
    }
  } catch (error) {
    console.error("Error al cargar la imagen de perfil:", error);
  }
};

// Exporta la función para usarla en otras partes de la aplicación
export const profile = () => {
  const container = document.createElement("div");
  container.className =
    "flex justify-center items-center min-h-screen bg-gray-100"; // Fondo gris
  const formContainer = createProfileForm(); // Crea el formulario
  container.appendChild(formContainer); // Añade el formulario al contenedor

  // Cargar la imagen de perfil al iniciar
  loadProfilePicture(formContainer.querySelector("#profileImg"));

  return container;
};
