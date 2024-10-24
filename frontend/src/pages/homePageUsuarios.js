import { Stats, Feed, BtnEmergency } from "../components";

export const HomePage = () => {
  //Contenedor principal
  const main = document.createElement("main");
  main.classList.add("flex", "flex-col", "gap-3", "lg:px-24", "px-5", "mb-5");

  //title
  const title = document.createElement("h1");
  title.textContent = "Comparte tu historia";
  title.className = "font-serif lg:text-4xl font-bold text-center p-6";
  main.appendChild(title);
  main.appendChild(BtnEmergency());

  // //Estadisticas
  // main.appendChild(Stats());

  //Feed
  main.appendChild(Feed());

  return main;
};
