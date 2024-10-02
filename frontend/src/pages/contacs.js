import bg from "../assets/contacs.jpg";
export const contacts = () => {
  const containerContacts = document.createElement("div");
  containerContacts.classList.add("bg-base", "flex-grow", "min-h-screen");

  const descripcion = document.createElement("div");
  descripcion.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "p-60",
    "m-8",
    "bg-center",
    "bg-cover",
    "h-100"
  );
  descripcion.style.backgroundImage = `url(${bg})`;
  const titulo = document.createElement("h1");
  titulo.classList.add("text-center", "font-bold", "font-serif", "text-5x1");
  titulo.textContent = "Contactos de Ayuda";
  const parrafodesc = document.createElement("p");
  parrafodesc.classList.add("font-serif");
  parrafodesc.textContent =
    "En esta session brindaremos contactos de ayuda en casos de emergencia, desamparo o, simplemente, ayuda. Las instituciones y especialistas que encontraran en la pagina estan miniusiomamente verificados y calificados.";

  descripcion.appendChild(titulo);
  descripcion.appendChild(parrafodesc);
  containerContacts.appendChild(descripcion);
  return containerContacts;
};
