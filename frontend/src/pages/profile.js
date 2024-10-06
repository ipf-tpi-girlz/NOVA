import { updateProfile } from "../api/user.js";
import Swal from "sweetalert2";

// Crea el formulario de perfil dinámicamente
const createProfileForm = () => {
  const formContainer = document.createElement("div");
  formContainer.className = "flex flex-col items-center p-4";

  const form = document.createElement("form");
  form.id = "profileForm";

  const label = document.createElement("label");
  label.htmlFor = "imgInput";
  label.className = "relative cursor-pointer mb-4";

  const profileImg = document.createElement("img");
  profileImg.id = "profileImg";
  profileImg.src = "ruta/a/la/imagen/default.jpg"; // Ruta a tu imagen por defecto
  profileImg.alt = "Perfil";
  profileImg.className = "w-24 h-24 rounded-full border-2 border-gray-300";

  const imgInput = document.createElement("input");
  imgInput.type = "file";
  imgInput.id = "imgInput";
  imgInput.accept = "image/*";
  imgInput.className = "absolute inset-0 opacity-0 cursor-pointer";

  label.appendChild(profileImg);
  label.appendChild(imgInput);
  form.appendChild(label);

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "descriptionInput";
  descriptionInput.placeholder = "Descripción";
  descriptionInput.className = "textarea textarea-bordered w-full mb-4";
  descriptionInput.rows = 3;
  form.appendChild(descriptionInput);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-primary";
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
      img: img || null,
      description: description || null,
    };

    const result = await updateProfile(userData);

    // Actualizar la imagen de perfil en la interfaz
    profileImg.src = `http://localhost:4000/${result.perfil.img}`; // Ajusta la URL según sea necesario

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

// Exporta la función para usarla en otras partes de la aplicación
export const profile = () => {
  const container = document.createElement("div");
  container.appendChild(createProfileForm()); // Añade el formulario al contenedor
  return container;
};
