import { Stats, Feed, BtnEmergency } from "../components";

export const HomePage = () => {
  //Contenedor principal
  const main = document.createElement("main");
  main.classList.add("flex", "flex-col", "gap-3", "lg:px-24", "px-5", "mb-5");

  main.appendChild(BtnEmergency());

  // //Estadisticas
  // main.appendChild(Stats());

  //Feed
  main.appendChild(Feed());

  return main;
};
