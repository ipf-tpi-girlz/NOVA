export const artFisco = () => {
  document.body.classList.add("bg-white", "min-h-screen");

  const container = document.createElement("div");
  container.classList.add("container", "mx-auto", "p-4", "md:p-8", "max-w-6xl");
  document.body.appendChild(container);

  // Crear el artículo principal
  const article = document.createElement("article");
  article.classList.add(
    "bg-white",
    "shadow-xl",
    "rounded-xl",
    "overflow-hidden"
  );
  container.appendChild(article);

  // Header del artículo
  const header = document.createElement("header");
  header.classList.add("bg-base-200", "p-10", "relative");

  const overlay = document.createElement("div");
  overlay.classList.add(
    "absolute",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "bg-black",
    "opacity-10"
  );
  header.appendChild(overlay);

  const headerContent = document.createElement("div");
  headerContent.classList.add("relative", "z-10");

  const h1 = document.createElement("h1");
  h1.classList.add(
    "text-4xl",
    "md:text-5xl",
    "font-bold",
    "mb-4",
    "leading-tight"
  );
  h1.innerText = "Violencia Física: Identificación, Prevención y Apoyo ";
  headerContent.appendChild(h1);

  const headerParagraph = document.createElement("p");
  headerParagraph.classList.add("text-xl");
  headerParagraph.innerText =
    "Explorando una forma grave de violación de los derechos humanos ";
  headerContent.appendChild(headerParagraph);

  header.appendChild(headerContent);
  article.appendChild(header);

  // Sección de contenido principal
  const mainContent = document.createElement("div");
  mainContent.classList.add("p-8", "md:p-12");

  const mainParagraph = document.createElement("p");
  mainParagraph.classList.add(
    "text-lg",
    "text-black",
    "mb-6",
    "leading-relaxed"
  );
  mainParagraph.innerText =
    "La violencia física es el uso de la fuerza contra una persona para causar daño, incluyendo golpes, empujones o uso de objetos. En Argentina, la Ley N° 26.485 la reconoce como una forma de violencia de género.";
  mainContent.appendChild(mainParagraph);

  // Agregar el subtítulo ¿Qué es y Cómo Identificarla?
  const subtitle1 = document.createElement("h2");
  subtitle1.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle1.innerText = "¿Qué es y Cómo Identificarla?";
  mainContent.appendChild(subtitle1);

  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("text-lg", "mb-6", "leading-relaxed");
  paragraph1.innerText =
    "La violencia física se manifiesta a través de agresiones directas, como golpes y empujones, y suele dejar marcas visibles (moretones, cortes). Otras señales incluyen el aislamiento social y cambios de comportamiento, como la justificación constante de las lesiones.";
  mainContent.appendChild(paragraph1);

  // Agregar el subtítulo Impacto y Consecuencias
  const subtitle2 = document.createElement("h2");
  subtitle2.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle2.innerText = "Impacto y Consecuencias";
  mainContent.appendChild(subtitle2);

  const impactParagraph = document.createElement("p");
  impactParagraph.classList.add("text-lg", "mb-6", "leading-relaxed");
  impactParagraph.innerText =
    "Las víctimas pueden experimentar problemas físicos (lesiones, fracturas) y psicológicos (depresión, ansiedad). La violencia física también afecta la capacidad de establecer relaciones saludables y seguras.";
  mainContent.appendChild(impactParagraph);

  // Sección Medidas de Prevención
  const subtitle3 = document.createElement("h2");
  subtitle3.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle3.innerText = "Medidas de Prevención";
  mainContent.appendChild(subtitle3);

  const preventionText = document.createElement("p");
  preventionText.classList.add("text-lg", "mb-6", "leading-relaxed");
  preventionText.innerText =
    "Para prevenir la violencia física, es esencial fomentar la igualdad de género, capacitar a profesionales y promover programas de educación sobre violencia de género.";
  mainContent.appendChild(preventionText);

  const preventionList = [
    "Educación sobre violencia de género: Programas de educación sexual integral (ESI) son clave.",
    "Igualdad de género: Fomentar el respeto y la igualdad en todos los ámbitos.",
    "Capacitación profesional: Preparar a personal de salud y seguridad para reconocer y responder a casos de violencia.",
  ];

  const ulPrevention = document.createElement("ul");
  ulPrevention.classList.add("list-none", "pl-0", "mb-6");

  preventionList.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("flex", "items-center", "mb-4");

    const iconContainer = document.createElement("span");
    iconContainer.classList.add(
      "bg-base-200",
      "shadow",
      "rounded-full",
      "p-2",
      "mr-4"
    );

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-6 h-6 text-white");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M12 6v6m0 0v6m0-6h6m-6 0H6");
    svg.appendChild(path);

    iconContainer.appendChild(svg);
    li.appendChild(iconContainer);

    const itemText = document.createElement("span");
    itemText.classList.add("text-lg");
    itemText.innerText = item;
    li.appendChild(itemText);

    ulPrevention.appendChild(li);
  });
  mainContent.appendChild(ulPrevention);

  // Sección Recursos en Formosa
  const subtitle4 = document.createElement("h2");
  subtitle4.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle4.innerText = "Recursos en Formosa";
  mainContent.appendChild(subtitle4);

  const resourcesText = document.createElement("p");
  resourcesText.classList.add("text-lg", "mb-6", "leading-relaxed");
  resourcesText.innerText =
    "En Formosa, existen varias instituciones y servicios de apoyo para las víctimas de violencia física.";
  mainContent.appendChild(resourcesText);

  const resourcesList = [
    "Línea 144: Asistencia gratuita y confidencial para víctimas de violencia de género.",
    "Centro de Atención Integral a la Mujer: Ofrece apoyo psicológico y legal en Formosa.",
    "Comisarías de la Mujer: Espacios especializados para recibir denuncias de violencia física.",
  ];

  const ulResources = document.createElement("ul");
  ulResources.classList.add("list-none", "pl-0", "mb-6");

  resourcesList.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("flex", "items-center", "mb-4");

    const iconContainer = document.createElement("span");
    iconContainer.classList.add(
      "bg-base-200",
      "shadow",
      "rounded-full",
      "p-2",
      "mr-4"
    );

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "w-6 h-6 text-white");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M12 6v6m0 0v6m0-6h6m-6 0H6");
    svg.appendChild(path);

    iconContainer.appendChild(svg);
    li.appendChild(iconContainer);

    const itemText = document.createElement("span");
    itemText.classList.add("text-lg");
    itemText.innerText = item;
    li.appendChild(itemText);

    ulResources.appendChild(li);
  });
  mainContent.appendChild(ulResources);

  // Agregar todas las secciones al artículo
  article.appendChild(mainContent);
  return container;
};
