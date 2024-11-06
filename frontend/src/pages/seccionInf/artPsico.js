export const artPsico = () => {
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
  h1.innerText =
    "Violencia Psicológica: Cómo Identificarla, Prevenirla y Comprender su Impacto";
  headerContent.appendChild(h1);

  const headerParagraph = document.createElement("p");
  headerParagraph.classList.add("text-xl");
  headerParagraph.innerText =
    "Un análisis profundo sobre una forma invisible pero devastadora de maltrato";
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
    "La violencia psicológica es una forma invisible pero devastadora de maltrato. Aunque no deja huellas físicas, sus cicatrices emocionales pueden durar toda la vida. Este tipo de violencia afecta la autoestima, las relaciones y la salud mental de quienes la padecen.";
  mainContent.appendChild(mainParagraph);

  // Agregar el subtítulo ¿Qué es la Violencia Psicológica?
  const subtitle1 = document.createElement("h2");
  subtitle1.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle1.innerText = "¿Qué es la Violencia Psicológica?";
  mainContent.appendChild(subtitle1);

  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("text-lg", "mb-6", "leading-relaxed");
  paragraph1.innerText =
    "La violencia psicológica, también conocida como abuso emocional, se manifiesta a través de conductas de manipulación, control, desvalorización y humillación que impactan la salud emocional de la víctima. Puede ocurrir en cualquier tipo de relación: pareja, familiar, laboral o entre amigos.";
  mainContent.appendChild(paragraph1);

  // Agregar lista de indicadores
  const subtitle2 = document.createElement("h2");
  subtitle2.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle2.innerText = "Cómo Identificar la Violencia Psicológica";
  mainContent.appendChild(subtitle2);

  const indicators = [
    "Aislamiento forzado",
    "Control excesivo",
    "Desvalorización constante",
    "Gaslighting",
    "Amenazas e intimidación",
  ];
  const list = document.createElement("ul");
  list.classList.add("list-none", "pl-0", "mb-6");

  indicators.forEach((indicator) => {
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "items-center", "mb-4");

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
    listItem.appendChild(iconContainer);

    const itemText = document.createElement("span");
    itemText.classList.add("text-lg");
    itemText.innerText = indicator;
    listItem.appendChild(itemText);

    list.appendChild(listItem);
  });
  mainContent.appendChild(list);

  article.appendChild(mainContent);

  // Sección Medidas de Prevención
  const subtitle3 = document.createElement("h2");
  subtitle3.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle3.innerText = "Medidas de Prevención";
  mainContent.appendChild(subtitle3);

  const preventionText = document.createElement("p");
  preventionText.classList.add("text-lg", "mb-6", "leading-relaxed");
  preventionText.innerText =
    "Para protegerse de la violencia psicológica, es fundamental establecer límites claros, reconocer señales de abuso y fomentar relaciones de respeto y apoyo mutuo. También es importante fortalecer la autoestima y buscar ayuda de familiares, amigos o profesionales en caso de necesitarlo.";
  mainContent.appendChild(preventionText);

  const preventionList = [
    "Conocer tus derechos y mantener relaciones saludables",
    "Buscar apoyo en familiares o amigos de confianza",
    "Hablar con un profesional de la salud mental",
    "Aprender sobre inteligencia emocional",
    "Evitar el aislamiento social",
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
    path.setAttribute("d", "M12 4v16m8-8H4");
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

  // Sección Cómo Buscar Ayuda
  const subtitle4 = document.createElement("h2");
  subtitle4.classList.add("text-3xl", "font-bold", "mt-10", "mb-6");
  subtitle4.innerText = "Cómo Buscar Ayuda";
  mainContent.appendChild(subtitle4);

  const helpText = document.createElement("p");
  helpText.classList.add("text-lg", "mb-6", "leading-relaxed");
  helpText.innerText =
    "Si crees que estás siendo víctima de violencia psicológica, es importante que busques ayuda. Puedes hablar con alguien de confianza, o contactar a una línea de ayuda especializada en violencia de género. No estás solo y existen recursos para apoyarte.";
  mainContent.appendChild(helpText);

  // Agregar un botón de contacto para ayuda
  const contactButton = document.createElement("button");
  contactButton.classList.add(
    "bg-base-200",
    "py-3",
    "px-6",
    "rounded-full",
    "font-semibold",
    "hover:bg-red-700",
    "transition",
    "duration-300"
  );
  subtitle4.innerText = "Recursos y Ayuda para las Víctimas";
  mainContent.appendChild(subtitle4);

  const resourcesText = document.createElement("p");
  resourcesText.classList.add("text-lg", "mb-6", "leading-relaxed");
  resourcesText.innerText =
    "Afortunadamente, hay cada vez más recursos disponibles para las personas que sufren violencia psicológica. Si sientes que estás en una relación abusiva, busca ayuda en las siguientes fuentes:";
  mainContent.appendChild(resourcesText);

  const resourcesList = [
    "Línea 144: Asistencia gratuita y confidencial para víctimas de violencia de género.",
    "Centro de Atención Integral a la Mujer: Ofrece apoyo psicológico y legal en Formosa.",
    "Terapia individual y grupal: La intervención de un psicólogo especializado puede ser fundamental para la recuperación emocional de las víctimas.",
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
