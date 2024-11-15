import socket from "../config/socket.oiConfig";
export const button = (helpless) => {
  const container = document.createElement("div");
  container.className = "toast toast-top toast-end mt-20 ";
  const helpAccepted = document.createElement("div");
  helpAccepted.className = "btn w-96 mt-2 mb-4 alert alert-base ";
  helpAccepted.innerHTML = `<span class="material-symbols-rounded">check_circle</span> Aceptar ayuda`;

  container.appendChild(helpAccepted);
  helpAccepted.addEventListener("click", () => {
    socket.emit("accept_help", {
      requesterId: socket.id,
    });
  });
  return container;
};
