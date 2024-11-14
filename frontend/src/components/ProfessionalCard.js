import { profileProfID } from "../api/auth.js";

export const ProfessionalCard = (nombre, desc, especialidad, usuario_id) => {
  const card = document.createElement("div");
  card.className = "card card-compact bg-base-100 bg-cover";
  card.addEventListener("click", () => showProfileDetail(usuario_id));

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.textContent = nombre;

  const cardDesc = document.createElement("p");
  cardDesc.textContent = desc;

  const cardEspecialidad = document.createElement("p");
  cardEspecialidad.className = "text-sm text-gray-500";
  cardEspecialidad.textContent = `Especialidad: ${especialidad}`;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardEspecialidad);
  card.appendChild(cardBody);

  return card;
};

const showProfileDetail = async (id) => {
  try {
    const profileData = await profileProfID(id);
    displayProfile(profileData[0]); // Asegúrate de que estás enviando el primer objeto del array
  } catch (error) {
    console.error("Error al mostrar el perfil:", error);
  }
};

const displayProfile = (profileData) => {
  // Seleccionar o crear el contenedor donde se mostrará el perfil
  let previewContainer = document.getElementById("previewContainer");
  previewContainer.className =
    "profile-preview bg-white w-full max-w-2xl shadow-md p-6 rounded-lg max-w-md mx-auto";
  if (!previewContainer) {
    previewContainer = document.createElement("div");
    previewContainer.id = "previewContainer";
    previewContainer.className =
      "profile-preview shadow-md p-6 rounded-lg max-w-md mx-auto";
    document.body.appendChild(previewContainer);
  }

  // Limpiar el contenido previo
  previewContainer.innerHTML = "";

  // Crear un contenedor para la imagen y el nombre
  const headerContainer = document.createElement("div");
  headerContainer.className = "flex items-start mb-4";

  // Añadir la imagen
  const profileImg = document.createElement("img");
  profileImg.src = profileData.img;
  profileImg.alt = `${profileData.nombre}'s profile image`;
  profileImg.className = "w-24 h-24 rounded-full mr-4";

  // Añadir el nombre
  const profileName = document.createElement("h2");
  profileName.className = "text-xl font-bold text-gray-800";
  profileName.textContent = profileData.nombre;

  // Agregar la imagen y el nombre al contenedor
  headerContainer.appendChild(profileImg);
  headerContainer.appendChild(profileName);
  previewContainer.appendChild(headerContainer);

  // Crear un contenedor para el resto de la información
  const infoContainer = document.createElement("div");
  infoContainer.className = "text-gray-700";

  // Añadir el género
  const profileGender = document.createElement("p");
  profileGender.textContent = `Género: ${profileData.genero}`;

  // Añadir el departamento
  const profileDepartment = document.createElement("p");
  profileDepartment.textContent = `Departamento: ${profileData.departamento}`;

  // Añadir la localidad
  const profileLocation = document.createElement("p");
  profileLocation.textContent = `Localidad: ${profileData.localidad}`;

  // Añadir la descripción
  const profileDesc = document.createElement("p");
  profileDesc.textContent = `Descripción: ${profileData.perfil.descripcion}`;

  // Añadir el número de teléfono
  const profilePhone = document.createElement("p");
  profilePhone.textContent = `Teléfono: ${profileData.perfil.nro_telefono}`;

  // Añadir la especialidad
  const profileEspecialidad = document.createElement("p");
  profileEspecialidad.textContent = `Especialidad: ${profileData.perfil.especialidad}`;

  // Añadir el modo de atención
  const profileAtencion = document.createElement("p");
  profileAtencion.textContent = `Modo de Atención: ${profileData.perfil.modo_atencion}`;

  // Añadir la fecha de registro
  const profileDate = document.createElement("p");
  profileDate.textContent = `Fecha de Registro: ${new Date(
    profileData.fecha_registro
  ).toLocaleDateString()}`;
  // Agregar todos los elementos al contenedor de información
  infoContainer.appendChild(profileGender);
  infoContainer.appendChild(profileDepartment);
  infoContainer.appendChild(profileLocation);
  infoContainer.appendChild(profileDesc);
  infoContainer.appendChild(profilePhone);
  infoContainer.appendChild(profileEspecialidad);
  infoContainer.appendChild(profileAtencion);
  infoContainer.appendChild(profileDate);
  // Añadir el contenedor de información al contenedor principal
  previewContainer.appendChild(infoContainer);
};
