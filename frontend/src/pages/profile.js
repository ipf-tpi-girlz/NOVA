import "../css/profile.css"; // Importa el archivo de estilos CSS

// Crea la carta con foto de perfil, descripción dinámica y un textarea para ingresar descripción
const createCard = (profileImageUrl, description) => {
  const cardContainer = document.createElement("div");
  cardContainer.className = "relative"; // Contenedor principal que agrupa ambas cartas

  // Carta posterior (card2) con el color rosado claro
  const card2 = document.createElement("div");
  card2.className = "card2 absolute"; // Posiciona la carta detrás de card1
  cardContainer.appendChild(card2);

  // Carta frontal (card) blanca
  const card = document.createElement("div");
  card.className = "card relative z-10 flex flex-col items-center justify-center"; // Carta blanca con contenido
  cardContainer.appendChild(card);

  // Contenedor de la imagen de perfil
  const profileImageContainer = document.createElement("div");
  profileImageContainer.className =
    "flex justify-center items-center h-3/5 overflow-hidden";

  // Imagen de perfil
  const profileImage = document.createElement("img");
  profileImage.src = profileImageUrl;
  profileImage.alt = "Foto de perfil";
  profileImage.className = "w-36 h-36 rounded-full object-cover";
  profileImageContainer.appendChild(profileImage);

  // Contenedor para el textarea de descripción
  const descriptionInputContainer = document.createElement("div");
  descriptionInputContainer.className = "p-4 w-full";

  // Cambia el input por un textarea
  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.placeholder = "Ingresa una descripción";
  descriptionTextarea.value = description;
  descriptionTextarea.className =
    "textarea textarea-bordered w-full p-2 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"; // Clases para el textarea

  // Agrega todo a la carta frontal (card)
  descriptionInputContainer.appendChild(descriptionTextarea);
  card.appendChild(profileImageContainer);
  card.appendChild(descriptionInputContainer);

  return cardContainer; // Devuelve el contenedor completo
};

// Exporta la función para usarla en otras partes de la aplicación
export const profile = () => {
  const container = document.createElement("div");
  container.className = "flex justify-start items-center min-h-screen bg-gray-100"; // Alinear a la izquierda

  // Datos de ejemplo
  const profileImageUrl = "https://via.placeholder.com/150";
  const description = "Descripción del usuario.";

  // Crea la carta con la imagen de perfil y el textarea de descripción
  const card = createCard(profileImageUrl, description);
  container.appendChild(card);

  return container;
};
