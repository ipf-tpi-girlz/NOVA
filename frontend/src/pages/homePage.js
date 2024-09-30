import { navbar } from "../components/navBar.js";

export function homePage() {
  const mainHome = document.createElement("div");

  mainHome.append(navbar());
  return mainHome;
}
