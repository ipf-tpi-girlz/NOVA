import { profileProfID } from "../api/auth.js";



export const ProfessionalCard = (nombre, desc, especialidad, usuario_id, imagenUrl) => {
  const card = document.createElement("div");
  card.className = "card card-compact bg-base-100 bg-cover"; // Aquí no aplicamos la animación directamente

  // Agregar evento de click para mostrar los detalles del perfil
  card.addEventListener("click", () => showProfileDetail(usuario_id));

  // Contenedor para el cuerpo de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.className = "card-body flex flex-col";

  const img = document.createElement("img");
  img.src = imagenUrl ?? "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg";
  img.alt = `${nombre}'s profile picture`;
  img.className = "w-8 h-8 rounded-full object-cover";

  // Título de la tarjeta (nombre)
  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title font-bold flex items-center ";
  cardTitle.textContent = nombre;

  // Descripción
  const cardDesc = document.createElement("p");
  cardDesc.textContent = desc;

  // Especialidad
  const cardEspecialidad = document.createElement("p");
  cardEspecialidad.className = "text-sm text-gray-500";

  cardEspecialidad.textContent = `Especialidad: ${especialidad}`;


  // Insertamos la imagen antes del título (nombre) para que aparezca al lado
  cardTitle.insertBefore(img, cardTitle.firstChild);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardEspecialidad);

  card.appendChild(cardBody);

  return card;
};


const showProfileDetail = async (id) => {
  try {
    const profileData = await profileProfID(id);
    displayProfile(profileData[0]);

  } catch (error) {
    console.error("Error al mostrar el perfil:", error);
  }
};

const displayProfile = (profileData) => {
  const previewContainer = document.getElementById("previewContainer");

  // Aplicamos las clases para inicializar la animación (invisible y fuera de la pantalla)
  previewContainer.className = "flex flex-col profile-preview shadow-md p-6 rounded-lg max-w-lg mx-auto w-full h-auto bg-base-100 bg-cover opacity-0 transform -translate-x-10 transition-all duration-500 ease-out";

  // Limpiamos el contenido previo del contenedor
  previewContainer.innerHTML = '';

  // Información del perfil en un solo contenedor
  const infoContainer = document.createElement("div");
  infoContainer.className = "text-gray-700 mb-4 flex flex-col gap-4";

  // Crear la imagen de perfil
  const profileImg = document.createElement("img");
  profileImg.src = profileData?.img?.trim() ? profileData.img : "https://i.pinimg.com/564x/9e/c9/19/9ec919468e1ed8af1002b551f5950a94.jpg";
  profileImg.className = "w-24 h-24 md:w-32 md:h-32 rounded-full border-4 mb-4 mx-auto";
  profileImg.alt = "Profile";

  const profileName = document.createElement("h2");
  profileName.className = "text-2xl font-bold  text-center";
  profileName.textContent = profileData?.nombre || "Unknown";

  const profileDesc = document.createElement("p");
  profileDesc.className = "text-gray-600 text-center mb-4 font-semibold";
  profileDesc.textContent = profileData?.perfil?.descripcion || "Sin descripción";

  // Información adicional del perfil
  const profileGender = document.createElement("div");
  profileGender.className = "flex items-center text-gray-600 gap-2";
  const genderIcon = document.createElement("svg");
  genderIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>';
  profileGender.appendChild(genderIcon);
  profileGender.appendChild(document.createTextNode(`Género: ${profileData?.genero || '-'}`));

  const profileEspecialidad = document.createElement("div");
  profileEspecialidad.className = "flex items-center text-gray-600 gap-2";
  const especialidadIcon = document.createElement("svg");
  especialidadIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>';
  profileEspecialidad.appendChild(especialidadIcon);
  profileEspecialidad.appendChild(document.createTextNode(`Especialidad: ${profileData?.perfil?.especialidad || '-'}`));

  const profilePhone = document.createElement("div");
  profilePhone.className = "flex items-center text-gray-600 gap-2";
  const phoneIcon = document.createElement("svg");
  phoneIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
  profilePhone.appendChild(phoneIcon);
  profilePhone.appendChild(document.createTextNode(`Teléfono: ${profileData?.perfil?.nro_telefono || '-'}`));

  const profileDirection = document.createElement("div");
  profileDirection.className = "flex items-center text-gray-600 gap-2";
  const directionIcon = document.createElement("svg");
  directionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>';
  profileDirection.appendChild(directionIcon);
  profileDirection.appendChild(document.createTextNode(`Dirección: ${profileData?.perfil?.direccion || '-'}`));

  const profileLocation = document.createElement("div");
  profileLocation.className = "flex items-center text-gray-600 gap-2";
  const locationIcon = document.createElement("svg");
  locationIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
  profileLocation.appendChild(locationIcon);
  profileLocation.appendChild(document.createTextNode(`Localidad: ${profileData?.localidad || '-'}`));

  const profileAtencion = document.createElement("div");
  profileAtencion.className = "flex items-center text-gray-600 gap-2";
  const atencionIcon = document.createElement("svg");
  atencionIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>';
  profileAtencion.appendChild(atencionIcon);
  profileAtencion.appendChild(document.createTextNode(`Modo de Atención: ${profileData?.perfil?.modo_atencion || '-'}`));

  const hr = document.createElement("hr");
  hr.className = "my-4 bg-black opacity-200";
  // Agregar todos los elementos al contenedor de la información
  infoContainer.appendChild(profileImg);
  infoContainer.appendChild(profileName);
  infoContainer.appendChild(profileDesc);
  infoContainer.appendChild(hr);
  infoContainer.appendChild(profileGender);
  infoContainer.appendChild(profileEspecialidad);
  infoContainer.appendChild(profilePhone);
  infoContainer.appendChild(profileDirection);
  infoContainer.appendChild(profileLocation);
  infoContainer.appendChild(profileAtencion);

  // Botón de contacto
  const button = document.createElement("button");
  button.className = "flex justify-center btn btn-primary";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-4 flex justify-end";
  buttonContainer.appendChild(button);
  const buttonIcon = document.createElement("svg");
  buttonIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
  `
  button.appendChild(buttonIcon);

  infoContainer.appendChild(buttonContainer);

  // Agregar todo a la vista previa
  previewContainer.appendChild(infoContainer);

  // Animación para hacer aparecer el contenedor
  setTimeout(() => {
    previewContainer.classList.remove("opacity-0", "-translate-x-10");
    previewContainer.classList.add("opacity-100", "translate-x-0");
  }, 200);
};


