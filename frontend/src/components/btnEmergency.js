export const BtnEmergency = () => {
  const container = document.createElement("div");

  //boton red de contencion
  const BtnEmergency = document.createElement("button");
  BtnEmergency.className =
    "btn btn-circle fixed bottom-20 z-50 right-4 btn-lg !text-3xl";
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
  title.className = "text-2xl mb-1 p-6";
  title.textContent = "Red de contencion";

  const subTitle = document.createElement("h2");
  subTitle.className = "text-sm mb-3 ";
  subTitle.textContent = "Estamos aqui para escucharte";

  const helpBtn = document.createElement("button");
  helpBtn.className = "btn bg-pink-200 items-center hover:bg-pink-400 w-96";
  helpBtn.innerHTML = `<span class = "material-symbols-rounded ">favorite</span> Necesito ayuda ahora `;

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
  modalBox.appendChild(helpBtn);

  modalBackdrop.appendChild(modalBackdropBtn);

  modal.appendChild(modalBox);
  modal.appendChild(modalBackdrop);
  container.appendChild(BtnEmergency);
  container.appendChild(modal);

  return container;
};
