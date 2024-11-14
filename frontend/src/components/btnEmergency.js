import socket from "../config/socket.oiConfig";

export const BtnEmergency = () => {
  const container = document.createElement("div");
  container.className = "shadow-lg";
  //boton red de contencion
  const BtnEmergency = document.createElement("button");
  BtnEmergency.className =
    "btn btn-circle fixed bottom-10 z-50 right-4 btn-lg !text-3xl shadow-md";
  BtnEmergency.onclick = () => modal.showModal();
  BtnEmergency.innerHTML = `<span class = "material-symbols-rounded ">notification_important</span>`;

  //creacion modal
  const modal = document.createElement("dialog");
  modal.id = "modal";
  modal.className = "modal";

  const modalBox = document.createElement("div");
  modalBox.className = "modal-box text-center";

  //contenido
  const title = document.createElement("h1");
  title.className = "text-3xl   font-serif font-bold";
  title.textContent = "¿Necesitas ayuda?";

  const subTitle = document.createElement("h2");
  subTitle.className = "text-1xl mb-8 font-serif font-semibold";
  subTitle.textContent = "Estamos aqui para escucharte";

  const descripcion = document.createElement("p");
  descripcion.textContent =
    "Al presionar este botón, se abrirá un espacio de apoyo donde podrás solicitar ayuda. Notificaremos a alguien disponible para hablar y te acompañará en un chat privado.";
  descripcion.className = "font-thin font-serif text-xs text-opacity-95";

  // Botones de red de contencion

  //Boton Help
  const helpBtn = document.createElement("button");
  helpBtn.className =
    "btn bg-pink-200 items-center hover:bg-pink-400 w-96 mt-2 mb-4";
  helpBtn.innerHTML = `<span class = "material-symbols-rounded ">favorite</span> Necesito ayuda ahora `;

  const helpAccepted = document.createElement("button");

  const sendMessage = document.createElement("button");

  //Logica detras de los botones

  //Requerir ayuda
  helpBtn.addEventListener("click", () => {
    socket.emit("Un usuario necesita ayuda");
    console.log("se ha enviado el mensaje");
  });

  //aceptar ayudar
  helpAccepted.addEventListener("click", () => {
    const requesterSocketId = id.user; // Aquí debes colocar el ID del usuario que solicita ayuda
    socket.emit("Ayuda Aceptada", { requesterId: requesterSocketId });
  });

  // Lógica del botón para enviar mensaje en el chat
  sendMessage.addEventListener("click", () => {
    const chatRoom = "Red de contencion"; // Define el chat room si tienes uno
    const message = document.getElementById("messageInput").value;
    socket.emit("send", { chatRoom, message });
  });

  const recursos = document.createElement("div");
  recursos.className = "flex justify-center center mt-4 gap-8 items-center ";
  const message = document.createElement("a");
  message.innerHTML = `<span class = "material-symbols-rounded items-center ">Chat_Bubble</span> Contactanos`;
  message.className = "text-sm font-serif cursor-pointer";
  message.href = "https://www.example.com";

  const llamada = document.createElement("a");
  llamada.innerHTML = `<span class = "material-symbols-rounded  items-center">phone_in_talk</span>Linea 144`;
  llamada.className = "text-sm font-serif cursor-pointer";
  llamada.addEventListener("click", () => {
    window.location.href = "tel:144";
  });

  recursos.appendChild(llamada);
  recursos.appendChild(message);

  const modalBackdrop = document.createElement("form");
  modalBackdrop.method = "dialog";
  modalBackdrop.className = "modal-backdrop";

  const modalClose = document.createElement("form");
  modalClose.method = "dialog";

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.className =
    "btn btn-sm btn-circle btn-ghost absolute right-2 top-2";
  modalCloseBtn.textContent = "X";

  const modalBackdropBtn = document.createElement("button");
  modalBackdropBtn.textContent = "close";

  modalClose.appendChild(modalCloseBtn);
  modalBox.appendChild(modalClose);
  modalBox.appendChild(title);
  modalBox.appendChild(subTitle);
  modalBox.appendChild(descripcion);
  modalBox.appendChild(helpBtn);
  modalBox.appendChild(recursos);
  modalBackdrop.appendChild(modalBackdropBtn);

  modal.appendChild(modalBox);
  modal.appendChild(modalBackdrop);
  container.appendChild(BtnEmergency);
  container.appendChild(modal);

  return container;
};
