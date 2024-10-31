export const artAbuso = () => {
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
  header.classList.add("bg-red-600", "text-white", "p-10", "relative");

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
    "Violencia Sexual: Cómo Identificarla, Prevenirla y Entender su Impacto en Formosa, Argentina";
  headerContent.appendChild(h1);

  const headerParagraph = document.createElement("p");
  headerParagraph.classList.add("text-xl", "text-white");
  headerParagraph.innerText =
    "Explorando una forma grave de violación de los derechos humanos";
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
    "La violencia sexual es una de las formas más graves de violación de los derechos humanos. Afecta profundamente la dignidad y la integridad de quienes la sufren, y tiene consecuencias devastadoras a nivel físico, emocional y social. En este artículo, exploraremos qué es la violencia sexual, cómo identificarla, medidas de prevención y recursos disponibles en la provincia de Formosa, Argentina.";
  mainContent.appendChild(mainParagraph);

  // Agregar el subtítulo ¿Qué es la Violencia Psicológica?
  const subtitle1 = document.createElement("h2");
  subtitle1.classList.add(
    "text-3xl",
    "font-bold",
    "mt-10",
    "mb-6",
    "text-red-900"
  );
  subtitle1.innerText = "¿Qué es la Violencia Sexual?";
  mainContent.appendChild(subtitle1);

  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("text-lg", "mb-6", "leading-relaxed");
  paragraph1.innerText =
    "La violencia sexual se define como cualquier acto de naturaleza sexual que se comete contra una persona sin su consentimiento. Incluye una amplia gama de comportamientos, como el acoso, la agresión, la violación, la explotación sexual y el abuso sexual infantil. La Organización Mundial de la Salud (OMS) señala que la violencia sexual no solo ocurre en el ámbito de pareja, sino también en entornos comunitarios, laborales y familiares. En Argentina, la Ley N° 26.485 para Prevenir, Sancionar y Erradicar la Violencia contra las Mujeres, reconoce la violencia sexual como una forma de violencia de género.";
  mainContent.appendChild(paragraph1);

  // Agregar lista de indicadores
  const subtitle2 = document.createElement("h2");
  subtitle2.classList.add(
    "text-3xl",
    "font-bold",
    "mt-10",
    "mb-6",
    "text-red-900"
  );
  subtitle2.innerText = "Cómo Identificar la Violencia Sexual";
  mainContent.appendChild(subtitle2);

  const indicators = [
    "Acoso sexual: Comentarios, gestos, miradas o acercamientos no deseados de carácter sexual.",
    "Contacto físico no consentido: Tocar, besar o abrazar a alguien sin su consentimiento.",
    "Manipulación o coacción: Usar amenazas o chantajes para forzar a alguien a actos sexuales.",
    "Violación: Penetración sin consentimiento, que es un delito penado por la ley.",
  ];

  //HASTA ACA RENDERIZA EL RESTO NO
  const list = document.createElement("ul");
  list.classList.add("list-none", "pl-0", "mb-6");

  indicators.forEach((indicator) => {
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "items-center", "mb-4");

    const iconContainer = document.createElement("span");
    iconContainer.classList.add("bg-red-600", "rounded-full", "p-2", "mr-4");

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
    itemText.classList.add("text-lg", "text-black");
    itemText.innerText = indicator;
    listItem.appendChild(itemText);

    list.appendChild(listItem);
  });
  mainContent.appendChild(list);

  article.appendChild(mainContent);

  // Agrega el impacto de la violencia sexual
  const section3Title = document.createElement("h2");
  section3Title.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
  section3Title.textContent = "Impacto de la Violencia Sexual";
  content.appendChild(section3Title);

  const impactDesc = document.createElement("p");
  impactDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  impactDesc.textContent =
    "La violencia sexual tiene un impacto profundo en la salud física y emocional de las víctimas:";
  content.appendChild(impactDesc);

  const impactList = document.createElement("ul");
  impactList.className = "list-disc pl-8 mb-6";
  impactList.innerHTML = `
  <li>Trastornos de salud mental: depresión, ansiedad, trastorno de estrés postraumático (TEPT).</li>
  <li>Problemas físicos: infecciones de transmisión sexual, lesiones y embarazos no deseados.</li>
  <li>Estigma social: las víctimas enfrentan revictimización, dificultando la denuncia y búsqueda de ayuda.</li>
`;
  content.appendChild(impactList);

  // Sección Medidas de Prevención
  const subtitle3 = document.createElement("h2");
  subtitle3.classList.add(
    "text-3xl",
    "font-bold",
    "mt-10",
    "mb-6",
    "text-red-900"
  );
  subtitle3.innerText = "Prevención de la Violencia Sexual";
  mainContent.appendChild(subtitle3);

  const preventionText = document.createElement("p");
  preventionText.classList.add("text-lg", "mb-6", "leading-relaxed");
  preventionText.innerText =
    "Prevenir la violencia sexual requiere un enfoque integral, que incluya la educación, la conciencia social y el fortalecimiento de las redes de apoyo. Algunas estrategias de prevención clave incluyen:";
  mainContent.appendChild(preventionText);

  const preventionList = [
    "Educación sexual integral (ESI): fundamental para enseñar sobre el respeto por los límites y el consentimiento.",
    "Promoción del consentimiento: educar que un NO siempre significa NO.",
    "Campañas de sensibilización: organizaciones locales y el gobierno han llevado a cabo campañas para concientizar sobre la violencia de género y sexual.",
    "Fortalecimiento de redes de apoyo: crear líneas de atención y centros de asistencia para víctimas.",
  ];

  const ulPrevention = document.createElement("ul");
  ulPrevention.classList.add("list-none", "pl-0", "mb-6");

  preventionList.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("flex", "items-center", "mb-4");

    const iconContainer = document.createElement("span");
    iconContainer.classList.add("bg-red-600", "rounded-full", "p-2", "mr-4");

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
    itemText.classList.add("text-lg", "text-black");
    itemText.innerText = item;
    li.appendChild(itemText);

    ulPrevention.appendChild(li);
  });
  mainContent.appendChild(ulPrevention);

  // Sección Cómo Buscar Ayuda
  const subtitle4 = document.createElement("h2");
  subtitle4.classList.add(
    "text-3xl",
    "font-bold",
    "mt-10",
    "mb-6",
    "text-red-900"
  );
  subtitle4.innerText = "Recursos y Ayuda";
  mainContent.appendChild(subtitle4);

  const helpText = document.createElement("p");
  helpText.classList.add("text-lg", "mb-6", "leading-relaxed");
  helpText.innerText =
    "Para quienes enfrentan violencia sexual, es fundamental saber que no están solas y que hay recursos a su disposición:";
  mainContent.appendChild(helpText);

  // Agregar un botón de contacto para ayuda
  const contactButton = document.createElement("button");
  contactButton.classList.add(
    "bg-red-600",
    "text-white",
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
    iconContainer.classList.add("bg-red-600", "rounded-full", "p-2", "mr-4");

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
    itemText.classList.add("text-lg", "text-black");
    itemText.innerText = item;
    li.appendChild(itemText);

    ulResources.appendChild(li);
  });
  mainContent.appendChild(ulResources);

  // Agregar todas las secciones al artículo
  article.appendChild(mainContent);

  return container;
};
