import { HeroContacts } from "../components/HeroContacts";

export const ContactsPage = () => {
  const main = document.createElement("div");
  main.classList.add("min-h-dvh");

  main.appendChild(HeroContacts());

  const body = document.createElement("div");
  body.classList.add("flex", "flex-col", "px-24");

  const parrafodesc = document.createElement("p");
  parrafodesc.className = "text-xl font-semibold text-center my-10";
  parrafodesc.textContent =
    "En esta sección brindaremos contactos de ayuda en casos de emergencia, desamparo o, simplemente, ayuda. Las instituciones y especialistas que encontraran en la página estan miniusiomamente verificados y calificados.";

  const interfazProfesionales = document.createElement("div");
  interfazProfesionales.className =
    "flex row bg-base-200 h-screen justify-content mx-8 mb-8 grid grid-cols-2 ";

  //div profesionales
  const containerProfesionales = document.createElement("div");
  containerProfesionales.className = " border border-base-300  ";

  const containertitle = document.createElement("h1");
  containertitle.textContent = "Algunos Perfiles que te recomendamos";
  containertitle.className = "break-all text-center font-bold text-lx2 p-2";

  const profesional = document.createElement("div");
  profesional.className =
    "grid grid-row-6 border border-base-300 mx-2 base-red-200 ";

  const profesionalperfil = document.createElement("div");
  profesional.appendChild(profesionalperfil);
  const scrollBar = document.createElement("div");
  scrollBar.className = "overflow-auto";
  profesional.appendChild(profesionalperfil);
  profesional.appendChild(scrollBar);

  containerProfesionales.appendChild(containertitle);
  containerProfesionales.appendChild(profesional);

  //div preview perfil profesionales
  const previewProfesionales = document.createElement("div");
  previewProfesionales.textContent = "yo muestro las preview de los perfiles";
  previewProfesionales.className = "border border-base-300 text-center ";

  interfazProfesionales.appendChild(containerProfesionales);
  interfazProfesionales.appendChild(previewProfesionales);

  body.appendChild(parrafodesc);

  main.appendChild(body);

  main.appendChild(interfazProfesionales);

  return main;
};
