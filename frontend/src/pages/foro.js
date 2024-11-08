export const foro = () => {
  const mainForo = document.createElement("div");

  const foros = [
    {
      id: 1,
      nombre: "Apoyo Emocional General",
      descripcion:
        "Un espacio seguro para compartir experiencias, obtener apoyo y consejos de la comunidad.",
    },
    {
      id: 2,
      nombre: "Autoestima y Recuperación",
      descripcion:
        "Foro dedicado a mejorar la autoestima y el bienestar emocional tras experiencias de violencia de género.",
    },
    {
      id: 3,
      nombre: "Recursos de Apoyo y Contactos",
      descripcion:
        "Espacio donde se comparten contactos de ayuda, centros de apoyo y recursos locales y online.",
    },
    {
      id: 4,
      nombre: "Grupo de Ayuda Mutua",
      descripcion:
        "Foro donde miembros pueden apoyarse mutuamente y establecer redes de apoyo emocional.",
    },
  ];

  //Barra de opciones
  const containerOpciones = document.createElement("div");

  const titleOpciones = document.createElement("h1");
  titleOpciones.innerHTML = `Foros <span class = "material-symbols-rounded  items-center">Diversity_2</span>`;
  titleOpciones.className = "text-sm font-serif";

  const divider = document.createElement("div");
  divider.className = "divider lg:divider-horizontal";

  const allForos = document.createElement("div");
  allForos.textContent = "All foros";

  //Feed foro

  containerOpciones.appendChild(titleOpciones);
  containerOpciones.appendChild(divider);

  mainForo.appendChild(containerOpciones);

  return mainForo;
};
