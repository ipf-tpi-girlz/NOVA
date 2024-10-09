import bg from "../assets/pexels-karolina-grabowska-4465824.jpg";
export const ManosUnidas = () => {
  const ManosUnidas = document.createElement("div");
  ManosUnidas.classList.add("bg-base", "m-12");

  const Caratula = document.createElement("div");
  Caratula.style.backgroundImage = `url(${bg})`;
  const perfil = document.createElement("div");
  perfil.classList.add("w-96", "h-72", "p-4");
  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600";
  img.classList.add("w-28", "h-28", "mt-40", "ml-24");
  perfil.appendChild(img);
  Caratula.appendChild(perfil);
  ManosUnidas.appendChild(Caratula);
  return ManosUnidas;
};
