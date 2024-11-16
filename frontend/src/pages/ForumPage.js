import { ForumHeader, forop } from "../components";
import { showNotification } from "../components/notification"
import { checkSession } from "../api/auth"

export const ForumPage = () => {
  if (!id) {
    showNotification("error", "No se encontro el foro");
    setTimeout(() => {
      window.location.href = "/home";
    }, 1000);
  }

  const main = document.createElement("div");
  checkSession().then((res) => {
    const userId = res.id;
    main.appendChild(ForumHeader(id, userId));
    //contenedor de post de foro
    main.appendChild(forop(id));
  });
  return main;
};

const id = sessionStorage.getItem("forumId");



