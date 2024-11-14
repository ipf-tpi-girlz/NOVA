import bg from "../assets/pexels-karolina-grabowska-4465824.jpg";
export const ForumHeader = () => {
  const ForumHeader = document.createElement("div");
  ForumHeader.classList.add();

  const caratula = document.createElement("div");
  caratula.classList.add(
    "min-h-28",
    "flex",
    "rounded-lg",
    "justify-between",
    "px-20"
  );
  caratula.style.backgroundImage = `url(${bg})`;

  const black = document.createElement("div");
  black.classList.add("absolute", "inset-0", "w-full", "h-full", "bg-black/40");

  const perfil = document.createElement("div");
  perfil.className = " flex gap-4 ";

  const nameProfile = document.createElement("h1");
  nameProfile.textContent = "Manos Unidas";
  nameProfile.classList.add("text-4xl", "font-bold", "font-serif", "self-end");

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600";
  img.classList.add(
    "w-28",
    "h-28",
    "m-4",
    "rounded-2xl",
    "border-solid",
    "border-4",
    "border-base-100"
  );

  const botones = document.createElement("div");
  botones.className = "gap-4 flex center items-center self-end p-5";

  const joinBtn = document.createElement("button");
  joinBtn.className =
    "btn cursor-point bg-base-300 rounded-lg selft-end shadow";
  joinBtn.textContent = "Unirte";

  // Crear el contenedor del dropdown
  const DropdowncontainerMore = document.createElement("div");
  DropdowncontainerMore.classList.add("dropdown");

  // Botón ver mas
  const moreBtn = document.createElement("button");
  moreBtn.innerHTML = `<span class = "material-symbols-rounded ">Expand_Circle_Down</span>`;

  // Crear el contenido del dropdown
  const DropdownMore = document.createElement("ul");
  DropdownMore.setAttribute("tabindex", "0");
  DropdownMore.classList.add(
    "dropdown-content",
    "menu",
    "bg-base-100",
    "rounded-box",
    "shadow",
    "absolute",
    "top-full",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "invisible",
    "w-36",
    "text-center",
    "z-10"
  );
  DropdownMore.style.display = "none"; // Ocultar el menú inicialmente

  // Crear los elementos del menú
  const item1 = document.createElement("li");
  const buttonQuejas = document.createElement("button");
  buttonQuejas.textContent = "Comentarios";
  item1.appendChild(buttonQuejas);

  const item2 = document.createElement("li");
  const buttonLogOut = document.createElement("button");
  buttonLogOut.textContent = "Salir";
  buttonLogOut.setAttribute;
  buttonLogOut.type = "submit";
  // buttonLogOut.setAttribute = ("href", "/");
  // buttonLogOut.addEventListener("click", () => {
  //   window.location.href = "http://localhost:5173";
  // });
  item2.appendChild(buttonLogOut);

  DropdownMore.appendChild(item1);
  DropdownMore.appendChild(item2);

  // Añadir el botón y el contenido al contenedor del dropdown
  DropdowncontainerMore.appendChild(moreBtn);
  DropdowncontainerMore.appendChild(DropdownMore);

  // Evento de clic para mostrar/ocultar el menú
  moreBtn.addEventListener("click", () => {
    // Alternar visibilidad del dropdown
    DropdownMore.style.display =
      DropdownMore.style.display === "none" ? "block" : "none";
  });

  // Cerrar el menú si se hace clic fuera de él
  document.addEventListener("click", (event) => {
    if (!DropdowncontainerMore.contains(event.target)) {
      DropdownMore.style.display = "none";
    }
  });

  //Appends
  perfil.appendChild(img);
  perfil.appendChild(nameProfile);
  caratula.appendChild(perfil);

  botones.appendChild(joinBtn);
  botones.appendChild(DropdowncontainerMore);
  caratula.appendChild(botones);

  ForumHeader.appendChild(caratula);

  return ForumHeader;
};
