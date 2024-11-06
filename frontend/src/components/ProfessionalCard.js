import { profileProfID } from "../api/auth.js";
import bg from '../assets/vacio_perfil.jfif'


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
    displayProfile(profileData[0]);
  } catch (error) {
    console.error("Error al mostrar el perfil:", error);
  }
};

const displayProfile = (profileData) => {
  let previewContainer = document.getElementById("previewContainer");
  previewContainer.className = "profile-preview shadow-md p-6 rounded-lg";
  if (!previewContainer) {
    previewContainer = document.createElement("div");
    previewContainer.id = "previewContainer";
    previewContainer.className = "profile-preview shadow-md p-6 rounded-lg max-w-md mx-auto";
    document.body.appendChild(previewContainer);
  }

  previewContainer.innerHTML = '';

  const headerContainer = document.createElement("div");
  headerContainer.className = "flex items-start mb-4";
  const img = document.createElement("div");
  const datos = document.createElement("div");

  // Crear la imagen de perfil
  const profileImg = document.createElement("img");
  profileImg.src = profileData.img?.trim() ? profileData.img : bg;
  profileImg.className = "w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-purple-500 shadow-md mr-4";


  const profileDesc = document.createElement("p");
  profileDesc.className = "text-gray-600";
  profileDesc.textContent = `${profileData.perfil.descripcion || "Sin descripción"}`;

  // Nombre del perfil
  const profileName = document.createElement("h2");
  profileName.className = "text-2xl font-bold text-gray-800 flex items-center";
  profileName.textContent = profileData.nombre;


  img.appendChild(profileImg);
  datos.appendChild(profileName);
  datos.appendChild(profileDesc);

  // Añadir las partes a la cabecera
  headerContainer.appendChild(img);
  headerContainer.appendChild(datos);

  previewContainer.appendChild(headerContainer);

  // Información adicional del perfil
  const infoContainer = document.createElement("div");
  infoContainer.className = "text-gray-700 mb-4 flex flex-col gap-2";

  const aboutMeConteiner = document.createElement("div");
  aboutMeConteiner.className = "mb-4";
  const aboutMeTitle = document.createElement("h3");
  aboutMeTitle.className = "text-lg font-medium mb-2";
  aboutMeTitle.textContent = "Sobre mí";
  aboutMeConteiner.appendChild(aboutMeTitle);

  const sectionUbi = document.createElement("div");
  sectionUbi.className = "mb-4";
  const ubicacionTitle = document.createElement("h3");
  ubicacionTitle.className = "text-lg font-medium mb-2";
  ubicacionTitle.textContent = "Ubicación";
  sectionUbi.appendChild(ubicacionTitle);

  const contactContainer = document.createElement("div");
  contactContainer.className = "mb-4";
  const contactTitle = document.createElement("h3");
  contactTitle.className = "text-lg font-medium mb-2";
  contactTitle.textContent = "Contactos";
  contactContainer.appendChild(contactTitle);

  const profileGender = document.createElement("p");
  profileGender.className = "text-gray-600";
  profileGender.textContent = `Género: ${profileData.genero}`;

  const profileDepartment = document.createElement("p");
  profileDepartment.className = "text-gray-600";
  profileDepartment.textContent = `Departamento: ${profileData.departamento ?? "-"}`;

  const profileLocation = document.createElement("p");
  profileLocation.className = "text-gray-600";
  profileLocation.textContent = `Localidad: ${profileData.localidad ?? "-"}`;

  const profileDirection = document.createElement("p");
  profileDirection.className = "text-gray-600";
  profileDirection.textContent = `Dirección: ${profileData.perfil.direccion ?? "-"}`;

  const profilePhone = document.createElement("p");
  profilePhone.className = "text-gray-600";
  profilePhone.textContent = `Teléfono: ${profileData.perfil.nro_telefono ?? "-"}`;

  const profileEspecialidad = document.createElement("p");
  profileEspecialidad.className = "text-gray-600";
  profileEspecialidad.textContent = `Especialidad: ${profileData.perfil.especialidad ?? "-"}`;

  const profileAtencion = document.createElement("p");
  profileAtencion.className = "text-gray-600";
  profileAtencion.textContent = `Modo de Atención: ${profileData.perfil.modo_atencion ?? "-"}`;

  const atencionConteiner = document.createElement("div");
  atencionConteiner.className = "mb-4";
  const atencionTitle = document.createElement("h3");
  atencionTitle.className = "text-lg font-medium mb-2";
  atencionTitle.textContent = "Modo de Atención";
  atencionConteiner.appendChild(atencionTitle);

  atencionConteiner.appendChild(profileAtencion);
  aboutMeConteiner.appendChild(profileGender);
  aboutMeConteiner.appendChild(profileEspecialidad);

  sectionUbi.appendChild(profileDepartment);
  sectionUbi.appendChild(profileLocation);
  sectionUbi.appendChild(profileDirection);

  contactContainer.appendChild(profilePhone);



  infoContainer.appendChild(aboutMeConteiner);
  infoContainer.appendChild(sectionUbi);
  infoContainer.appendChild(contactContainer);
  infoContainer.appendChild(atencionConteiner);

  const button = document.createElement("button");
  button.className = "flex justify-center btn btn-primary ";
  button.textContent = "Contactar";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "mt-4 flex justify-end";
  buttonContainer.appendChild(button);
  infoContainer.appendChild(buttonContainer);
  previewContainer.appendChild(infoContainer);
};