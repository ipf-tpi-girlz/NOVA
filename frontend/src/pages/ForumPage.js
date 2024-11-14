import { ForumHeader, forop } from "../components";
export const ForumPage = () => {
  const main = document.createElement("div");
  //header foro
  main.appendChild(ForumHeader());
  //contenedor de post de foro
  main.appendChild(forop());

  return main;
};
