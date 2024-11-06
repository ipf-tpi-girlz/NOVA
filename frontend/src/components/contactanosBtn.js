export const Contactanos = () => {
  const container = document.createElement("div");
  container.className = "shadow-lg flex flex-col";

  const BtnContactanos = document.createElement("div");
  BtnContactanos.className =
    "flex flex-col fixed bottom-36 z-50 right-0 !text-3xl shadow-md bg-base-200 cursor-pointer rounded-l-full p-2 transition-all duration-300";
  BtnContactanos.onclick = () => {
    BtnContactanos.style.transform = "translateX(100%)";
    setTimeout(() => {
      BtnContactanos.hidden = true;
      modal.showModal();
    }, 300);
  };

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.className =
    "btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content";
  modalCloseBtn.textContent = "X";
  modalCloseBtn.onclick = () => {
    modal.close(); // Cierra el modal
    BtnContactanos.hidden = false; // Muestra el botón
    BtnContactanos.style.transform = "translateX(0)"; // Resetea la posición
  };

  const icon = document.createElement("button");
  icon.innerHTML = `<span class="material-symbols-rounded">Chat</span>`;

  const parrafo = document.createElement("p");
  parrafo.textContent = "Contáctanos";
  parrafo.className = "font-serif text-sm text-base-content";

  // Creación del modal
  const modal = document.createElement("dialog");
  modal.id = "modal";
  modal.className = "modal";

  const modalBox = document.createElement("div");
  modalBox.className = "modal-box text-center bg-base-100 text-base-content";

  // Título del modal
  const modalTitle = document.createElement("h1");
  modalTitle.className = "text-2xl font-bold mb-4";
  modalTitle.textContent = "Contáctanos";

  modalBox.appendChild(modalCloseBtn);
  modalBox.appendChild(modalTitle);

  modal.appendChild(modalBox);

  BtnContactanos.appendChild(icon);
  BtnContactanos.appendChild(parrafo);

  container.appendChild(BtnContactanos);
  container.appendChild(modal);

  return container;
};
