import { fetchComunity } from "../api/comunity"
import { joinComunity, deleteRelationC } from "../api/relation.comunity";
import { showNotification } from "./notification";
export const ForumHeader = (id, userId) => {

  const ForumHeader = document.createElement("div");
  ForumHeader.classList.add();

  const caratula = document.createElement("div");
  caratula.classList.add(
    "min-h-32",
    "flex",
    "rounded-lg",
    "justify-between",
    "px-20",
    "border",
    "border-gray-200",
  );
  caratula.style.backgroundImage = `url(${"https://i.pinimg.com/736x/28/a2/66/28a26660a48dc34608ea6514e7935edb.jpg"})`;

  const black = document.createElement("div");
  black.classList.add("absolute", "inset-0", "w-full", "h-full", "bg-black/40");

  fetchComunity(id).then((comunidad) => {
    const datos = comunidad.community

    //!DATOS PERFIL

    const perfil = document.createElement("div");
    perfil.className = " flex gap-4 my-4";


    const datosPerfil = document.createElement("div");
    datosPerfil.classList.add("flex", "flex-col", "gap-2", "justify-center"
    );

    const nameProfile = document.createElement("h1");
    nameProfile.textContent = datos.nombre;
    nameProfile.classList.add("text-4xl", "font-bold", "font-serif");

    const desc = document.createElement("p");
    desc.textContent = datos.desc;
    desc.classList.add("text-2xl", "font-serif");

    const img = document.createElement("img");
    img.src = datos.img_perfil || "https://i.pinimg.com/736x/55/f9/be/55f9bebb5ca0a5f2111618f13cfe0220.jpg";
    img.classList.add(
      "w-32",
      "h-32",
      "m-4",
      "rounded-2xl",
      "border-solid",
      "border-2",
      "border-gray-200"
    );





    const botones = document.createElement("div");
    botones.className = "gap-4 flex center items-center self-end p-5";
    //!BOTON DE UNION AL FORO
    const joinBtn = document.createElement("button");
    joinBtn.className =
      "btn cursor-point bg-base-100 border border-gray-200 rounded-lg self-end shadow-md hover:shadow-lg transition-shadow duration-300";
    joinBtn.textContent = "Unirte";
    joinBtn.addEventListener('click', async () => {
      try {
        await joinComunity(id);
        showNotification("success", `Te has unido a la comunidad ${datos.nombre || 'desconocida'}`);
      } catch (error) {
        showNotification("error", error.message);
        console.error(error);
      }
    });


    // Crear el contenedor del dropdown
    const DropdowncontainerMore = document.createElement("div");
    DropdowncontainerMore.classList.add("dropdown");

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
    //!REVISAR
    // Crear los elementos del menú
    const item1 = document.createElement("li");
    const buttonQuejas = document.createElement("button");
    buttonQuejas.textContent = "Mis publicaciones";
    item1.appendChild(buttonQuejas);

    const item2 = document.createElement("li");
    const buttonLogOut = document.createElement("button");
    buttonLogOut.textContent = "Salir";
    buttonLogOut.setAttribute;
    buttonLogOut.type = "submit";
    buttonLogOut.setAttribute = ("href", "/");
    buttonLogOut.addEventListener("click", async () => {
      try {
        await deleteRelationC(id)
        showNotification("success", `Has salido de la comunidad ${datos.nombre}`);
        window.location.href = "/home";
      } catch (error) {
        showNotification("error", error.message);
        console.error(error);
      }
    });
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

    //!AGREGAR DATOS
    perfil.appendChild(img);
    datosPerfil.appendChild(nameProfile);
    datosPerfil.appendChild(desc);
    perfil.appendChild(datosPerfil);
    caratula.appendChild(perfil);

    const participantes = datos.participantes || [];
    const usuarioIds = participantes.map((participante) => participante.usuario_id);

    if (!usuarioIds.includes(userId)) {
      botones.appendChild(joinBtn);
    } else {
      botones.appendChild(DropdowncontainerMore);
    }
    caratula.appendChild(botones);
  })


  ForumHeader.appendChild(caratula);

  return ForumHeader;
};

