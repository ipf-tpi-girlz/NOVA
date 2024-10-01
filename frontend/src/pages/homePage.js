export function homePage() {
  const body = document.getElementsByTagName("body");
  body.classList.add("bg-base-300");
  const containerHome = document.createElement("div");
  containerHome.classList.add("h-100", "flex-grow");
  const titulo = document.createElement("h1");
  titulo.innerText = "Hola";
  containerHome.appendChild(titulo);
  return containerHome;
}
