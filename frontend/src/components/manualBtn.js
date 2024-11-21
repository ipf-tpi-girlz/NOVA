import { showNotification } from "../components/notification.js";
export const docsManual = () => {
  const container = document.createElement("div");
  container.className = "shadow-lg flex flex-col";

  const BtnManual = document.createElement("a");
  BtnManual.className =
    "flex flex-col fixed bottom-36  z-50 right-0 !text-3xl shadow-md bg-base-100 bg-cover cursor-pointer rounded-l-full p-2 transition-all duration-300 transform active:scale-95 ";
  BtnManual.href =
    "https://docs.google.com/document/d/1Ru-dQhKzyvZdJBCrJ4hwQmlU-Zqb3iOK9G92MJjJ4dk/edit?tab=t.n64bfnt2m0u5";

  BtnManual.target = "_blank";
  // Botón de cerrar sin borde circular, solo X
  const icon = document.createElement("button");
  icon.innerHTML = `<span class="material-symbols-rounded">developer_guide</span>`;

  const parrafo = document.createElement("p");
  parrafo.textContent = "Nuestro Manual";
  parrafo.className = "font-serif text-sm text-base-content";

  BtnManual.appendChild(icon);
  BtnManual.appendChild(parrafo);
  container.appendChild(BtnManual);
  return container;
};
