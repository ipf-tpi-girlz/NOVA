import bg from "../assets/pexels-karolina-grabowska-4465824.jpg";
export const ManosUnidas = () => {
  const ManosUnidas = document.createElement("div");
  ManosUnidas.classList.add("bg-base", "m-12");

  const Caratula = document.createElement("div");
  Caratula.classList.add(
    "min-h-[400px]",
    "flex",
    "flex-col-reverse",
    "rounded-lg"
  );
  Caratula.style.backgroundImage = `url(${bg})`;

  const black = document.createElement("div");
  black.classList.add("absolute", "inset-0", "w-full", "h-full", "bg-black/40");

  const perfil = document.createElement("div");
  perfil.classList.add("max-h-[200px]", "p-4", "flex");

  const nameProfile = document.createElement("h1");
  nameProfile.textContent = "Manos Unidas";
  nameProfile.classList.add("text-4xl", "font-bold", "self-center", "ml-5");

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=600";
  img.classList.add("w-28", "h-28", "rounded-lg");

  //Appends
  perfil.appendChild(img);
  perfil.appendChild(nameProfile);
  Caratula.appendChild(perfil);
  ManosUnidas.appendChild(Caratula);

  return ManosUnidas;
};
