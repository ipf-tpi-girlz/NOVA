import socket from "../config/socket.oiConfig";

export const Chat = () => {
  const chatContainer = document.createElement("div");
  chatContainer.className =
    "flex flex-col w-60 z-50 fixed bottom-0  left-0 bg-white h-[100px] shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor pointer";
  const chatHeader = document.createElement("div");
  chatHeader.className =
    "flex z-50 items-center w-60 justify-center bg-pink-200  h-[50px] rounded-t-2xl";
  chatHeader.innerText = "Chat ";

  // Crear el cuerpo del chat
  const chatBody = document.createElement("div");
  chatBody.className = "flex-grow z-50 bg-white p-4 overflow-auto hidden"; // Oculto inicialmente

  chatBody.innerHTML = "<p>¡Bienvenido al chat! Escribe tus mensajes aquí.</p>";

  // Añadir header y cuerpo al contenedor
  chatContainer.appendChild(chatHeader);
  chatContainer.appendChild(chatBody);

  // Alternar entre desplegar y colapsar
  let isOpen = false;

  chatHeader.onclick = () => {
    if (isOpen) {
      // Ocultar el chat
      chatContainer.className =
        "flex flex-col fixed w-60 bottom-0 z-50 left-0 w-full h-[50px] bg-base-200 shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor-pointer";
      chatBody.classList.add("hidden");
    } else {
      // Desplegar el chat
      chatContainer.className =
        "flex flex-col w-60 fixed bottom-0 z-50 left-0 w-full h-[300px] bg-base-200s shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor-pointer";
      chatBody.classList.remove("hidden");
    }
    isOpen = !isOpen; // Cambiar el estado
  };

  return chatContainer;
};
