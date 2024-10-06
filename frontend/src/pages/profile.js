export const profile = () => {
  // Crear el contenedor principal del perfil
  const containerProfile = document.createElement("div");
  containerProfile.classList.add(
    "bg-white",
    "flex-grow",
    "min-h-screen",
    "flex",
    "flex-col",
    "items-center",
    "p-6",
    "shadow-md",
    "max-w-lg",
    "mx-auto",
    "rounded-lg",
    "mt-10"
  );

  // Crear el contenedor para la imagen de perfil
  const profileImage = document.createElement("img");
  profileImage.src = "ruta/de/tu/imagen.jpg"; // Reemplaza con la URL o ruta de tu imagen
  profileImage.alt = "Foto de perfil";
  profileImage.classList.add(
    "w-40",
    "h-40",
    "rounded-full",
    "border-4",
    "border-blue-500",
    "mb-4"
  );

  // Crear el nombre de usuario
  const profileName = document.createElement("h2");
  profileName.innerText = "Nombre del Usuario"; // Reemplaza con el nombre del usuario
  profileName.classList.add("text-2xl", "font-bold", "text-gray-800", "mb-2");

  // Crear la descripción del perfil
  const profileDescription = document.createElement("p");
  profileDescription.innerText =
    "Esta es una breve descripción sobre el usuario. Podría ser una biografía corta o algún detalle personal.";
  profileDescription.classList.add("text-gray-600", "text-center", "mb-4");

  // Botones de interacción (como en Facebook: Añadir amigo y Enviar mensaje)
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "space-x-4", "mt-4");

  // Botón "Añadir amigo"
  const addFriendButton = document.createElement("button");
  addFriendButton.innerText = "Añadir amigo";
  addFriendButton.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded",
    "hover:bg-blue-600",
    "transition"
  );

  // Botón "Enviar mensaje"
  const sendMessageButton = document.createElement("button");
  sendMessageButton.innerText = "Enviar mensaje";
  sendMessageButton.classList.add(
    "bg-gray-300",
    "text-gray-800",
    "py-2",
    "px-4",
    "rounded",
    "hover:bg-gray-400",
    "transition"
  );

  // Agregar los botones al contenedor
  buttonContainer.appendChild(addFriendButton);
  buttonContainer.appendChild(sendMessageButton);

  // Agregar todos los elementos al contenedor principal
  containerProfile.appendChild(profileImage);
  containerProfile.appendChild(profileName);
  containerProfile.appendChild(profileDescription);
  containerProfile.appendChild(buttonContainer);

  return containerProfile;
};
