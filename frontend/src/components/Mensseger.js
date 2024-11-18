import { io } from "socket.io-client";
export const Chat = () => {
  const chatContainer = document.createElement("div");
  chatContainer.className =
    "flex flex-col w-96 z-50 fixed bottom-0  left-0 bg-white h-[100px] shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor pointer";
  const chatHeader = document.createElement("div");
  chatHeader.className =
    "flex z-50 items-center text-center justify-center bg-pink-400  h-[50px] rounded-t-2xl font-serif font-semibold";
  chatHeader.textContent = "Chat";

  const chatBody = document.createElement("div");
  chatBody.className =
    " flex-grow z-50 w-full  bg-base-100 p-4 overflow-scroll   hidden";

  const mensajes = document.createElement("ul");
  mensajes.id = "messages";
  mensajes.className = "list flex-1 flex flex-col gap-2 overflow-auto";

  const formulario = document.createElement("form");
  formulario.id = "form";
  formulario.className =
    "flex bg-white rounded-lg gap-2 shadow-lg  bottom-0 left-0 right-0 justify-between  box-border backdrop-blur-md p-2  ";
  //input
  const inputText = document.createElement("input");
  inputText.className =
    "flex-1 px-4 py-2 outline-none bg-white-200 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out";
  inputText.type = "text";
  inputText.placeholder = "Escribe tu mensaje aquí...";
  //btn
  const sendBtn = document.createElement("button");
  sendBtn.className =
    "bg-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-pink-600 transition-colors duration-300 focus:outline-none";
  sendBtn.textContent = "Enviar";

  formulario.appendChild(inputText);
  formulario.appendChild(sendBtn);

  chatBody.appendChild(mensajes);

  chatContainer.appendChild(chatHeader);
  chatContainer.appendChild(chatBody);

  let isOpen = false;
  chatHeader.onclick = () => {
    if (isOpen) {
      chatContainer.className =
        "flex flex-col fixed w-96 bottom-0 z-50 left-0  h-[50px] bg-base-400 shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor-pointer";
      chatBody.classList.add("hidden");
      formulario.remove();
    } else {
      chatContainer.className =
        "flex flex-col fixed w-96 bottom-0 z-50 left-0  h-[600px] bg-base-200 shadow-md rounded-t-2xl overflow-hidden transition-all duration-300 cursor-pointer";
      chatBody.classList.remove("hidden");
      chatContainer.appendChild(formulario);
    }
    isOpen = !isOpen;
  };
  const socket = io("http://localhost:4000");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputText.value) {
      if (!socket.id) {
        console.error("Socket no conectado, no se puede emitir el mensaje");
        return;
      }
      console.log("Mensaje enviado: ", inputText.value);
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, "0"); // Hora
      const minutes = currentTime.getMinutes().toString().padStart(2, "0"); // Minutos
      const timeString = `${hours}:${minutes}`;
      socket.emit("chat_message", {
        socketId: socket.id,
        msg: inputText.value,
        time: timeString,
      });
      inputText.value = "";
    }
  });

  socket.on("chat_message", ({ socketId, msg, time }) => {
    console.log("Mensaje recibido: ", msg, "de socketId: ", socketId);
    const item = document.createElement("li");
    item.className = `${
      socketId === socket.id ? " self-end" : "self-start"
    } p-2 rounded-md text-base shadow-sm w-max max-w-[80%]`;

    // Crear un contenedor para el mensaje
    const messageText = document.createElement("div");
    messageText.textContent = msg;
    messageText.className = `${
      socketId === socket.id ? "bg-violet-200" : "bg-pink-400 "
    }  p-2 px-2 rounded-md text-base shadow-sm `;
    const messageTime = document.createElement("div");
    messageTime.textContent = time;
    messageTime.className = `${
      socketId === socket.id ? "self-end" : "self-start"
    } text-xs text-gray-500 mt-1`;
    item.appendChild(messageText);
    item.appendChild(messageTime);
    mensajes.appendChild(item);
    window.scrollTo(0, chatBody.scrollHeight);
  });

  return chatContainer;
};
