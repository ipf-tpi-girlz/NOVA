import { footer } from "../components/footer.js";
import { navbar } from "../components/navBar.js";

export function homePage() {
  const mainHome = document.createElement("div");

  navbar.innerHTML();
  // mainHome.append(navbar());
  mainHome.append(footer());
  return mainHome;
}
