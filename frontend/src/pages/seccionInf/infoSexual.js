export const articuloVioSex = () => {
  // Crea y agrega el contenedor principal
  const container = document.createElement("div");
  container.className =
    "bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen";
  document.body.appendChild(container);

  // Crea el contenedor del artículo
  const articleContainer = document.createElement("div");
  articleContainer.className = "container mx-auto p-8";
  container.appendChild(articleContainer);

  // Crea el artículo
  const article = document.createElement("article");
  article.className =
    "bg-white shadow-2xl rounded-xl overflow-hidden max-w-4xl mx-auto";
  articleContainer.appendChild(article);

  // Crea y agrega el encabezado
  const header = document.createElement("header");
  header.className =
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 relative";
  article.appendChild(header);

  const headerOverlay = document.createElement("div");
  headerOverlay.className =
    "absolute top-0 left-0 w-full h-full bg-black opacity-20";
  header.appendChild(headerOverlay);

  const headerContent = document.createElement("div");
  headerContent.className = "relative z-10";
  header.appendChild(headerContent);

  const title = document.createElement("h1");
  title.className = "text-4xl md:text-5xl font-bold mb-4 leading-tight";
  title.textContent =
    "Violencia Sexual: Cómo Identificarla, Prevenirla y Entender su Impacto en Formosa, Argentina";
  headerContent.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "text-xl ";
  subtitle.textContent =
    "Explorando una forma grave de violación de los derechos humanos";
  headerContent.appendChild(subtitle);

  // Crea el contenido del artículo
  const content = document.createElement("div");
  content.className = "p-8 md:p-12";
  article.appendChild(content);

  // Agrega párrafo de introducción
  const intro = document.createElement("p");
  intro.className = "text-lg mb-6 leading-relaxed";
  intro.textContent =
    "La violencia sexual es una de las formas más graves de violación de los derechos humanos. Afecta profundamente la dignidad y la integridad de quienes la sufren, y tiene consecuencias devastadoras a nivel físico, emocional y social. En este artículo, exploraremos qué es la violencia sexual, cómo identificarla, medidas de prevención y recursos disponibles en la provincia de Formosa, Argentina.";
  content.appendChild(intro);

  // Agrega el título y la descripción de "¿Qué es la Violencia Sexual?"
  const section1Title = document.createElement("h2");
  section1Title.className = "text-3xl font-bold mt-10 mb-6 ";
  section1Title.textContent = "¿Qué es la Violencia Sexual?";
  content.appendChild(section1Title);

  const section1Desc = document.createElement("p");
  section1Desc.className = "text-lg  mb-6 leading-relaxed";
  section1Desc.textContent =
    "La violencia sexual se define como cualquier acto de naturaleza sexual que se comete contra una persona sin su consentimiento. Incluye una amplia gama de comportamientos, como el acoso, la agresión, la violación, la explotación sexual y el abuso sexual infantil. La Organización Mundial de la Salud (OMS) señala que la violencia sexual no solo ocurre en el ámbito de pareja, sino también en entornos comunitarios, laborales y familiares. En Argentina, la Ley N° 26.485 para Prevenir, Sancionar y Erradicar la Violencia contra las Mujeres, reconoce la violencia sexual como una forma de violencia de género.";
  content.appendChild(section1Desc);

  // Agrega la lista de "Cómo Identificar la Violencia Sexual"
  const section2Title = document.createElement("h2");
  section2Title.className = "text-3xl font-bold mt-10 mb-6 ";
  section2Title.textContent = "Cómo Identificar la Violencia Sexual";
  content.appendChild(section2Title);

  const list = document.createElement("ul");
  list.className = "list-none pl-0 mb-6";
  content.appendChild(list);

  const items = [
    "Acoso sexual: Comentarios, gestos, miradas o acercamientos no deseados de carácter sexual.",
    "Contacto físico no consentido: Tocar, besar o abrazar a alguien sin su consentimiento.",
    "Manipulación o coacción: Usar amenazas o chantajes para forzar a alguien a actos sexuales.",
    "Violación: Penetración sin consentimiento, que es un delito penado por la ley.",
  ];

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "flex items-center mb-4";

    const iconContainer = document.createElement("span");
    iconContainer.className = "bg-purple-200 rounded-full p-2 mr-4";
    listItem.appendChild(iconContainer);

    const icon = document.createElement("svg");
    icon.className = "w-6 h-6 text-purple-600";
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>';
    iconContainer.appendChild(icon);

    const text = document.createElement("span");
    text.className = "text-lg ";
    text.textContent = item;
    listItem.appendChild(text);

    list.appendChild(listItem);
  });

  // Agrega el impacto de la violencia sexual
  const section3Title = document.createElement("h2");
  section3Title.className = "text-3xl font-bold mt-10 mb-6 ";
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

  // Agrega la sección de prevención
  const section4Title = document.createElement("h2");
  section4Title.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
  section4Title.textContent = "Prevención de la Violencia Sexual en Formosa";
  content.appendChild(section4Title);

  const preventionDesc = document.createElement("p");
  preventionDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  preventionDesc.textContent =
    "Prevenir la violencia sexual requiere un enfoque integral, que incluya la educación, la conciencia social y el fortalecimiento de las redes de apoyo. Algunas estrategias de prevención clave incluyen:";
  content.appendChild(preventionDesc);

  const preventionList = document.createElement("ul");
  preventionList.className = "list-disc pl-8 mb-6";
  preventionList.innerHTML = `
  <li>Educación sexual integral (ESI): fundamental para enseñar sobre el respeto por los límites y el consentimiento.</li>
  <li>Promoción del consentimiento: educar que un "no" siempre significa "no".</li>
  <li>Campañas de sensibilización: organizaciones locales y el gobierno han llevado a cabo campañas para concientizar sobre la violencia de género y sexual.</li>
  <li>Fortalecimiento de redes de apoyo: crear líneas de atención y centros de asistencia para víctimas.</li>
`;
  content.appendChild(preventionList);

  // Agrega estadísticas y realidad en Formosa
  const section5Title = document.createElement("h2");
  section5Title.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
  section5Title.textContent = "Estadísticas y Realidad en Formosa";
  content.appendChild(section5Title);

  const statisticsDesc = document.createElement("p");
  statisticsDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  statisticsDesc.textContent =
    "La violencia sexual es un problema significativo en Formosa y en todo el país:";
  content.appendChild(statisticsDesc);

  const statisticsList = document.createElement("ul");
  statisticsList.className = "list-disc pl-8 mb-6";
  statisticsList.innerHTML = `
  <li>Altos índices de violencia de género en Argentina, con la violencia sexual como una de las modalidades más denunciadas.</li>
  <li>Aumento en las denuncias de violencia sexual en Formosa, especialmente durante la pandemia.</li>
  <li>Más del 50% de las mujeres que han sufrido violencia sexual lo han padecido por parte de su pareja o expareja.</li>
`;
  content.appendChild(statisticsList);

  // Agrega recursos y ayuda en Formosa
  const section6Title = document.createElement("h2");
  section6Title.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
  section6Title.textContent = "Recursos y Ayuda en Formosa";
  content.appendChild(section6Title);

  const resourcesDesc = document.createElement("p");
  resourcesDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  resourcesDesc.textContent =
    "Para quienes enfrentan violencia sexual, es fundamental saber que no están solas y que hay recursos a su disposición:";
  content.appendChild(resourcesDesc);

  const resourcesList = document.createElement("ul");
  resourcesList.className = "list-disc pl-8 mb-6";
  resourcesList.innerHTML = `
  <li><strong>Línea 144:</strong> Servicio nacional gratuito y confidencial, disponible las 24 horas.</li>
  <li><strong>Centro de Atención Integral a la Mujer:</strong> Ofrece asesoramiento psicológico, legal y social.</li>
  <li><strong>Comisarías de la Mujer:</strong> Personal capacitado para recibir denuncias de violencia de género.</li>
  <li><strong>ONGs:</strong> Diversas ONGs como la Asociación Mujeres Formoseñas Unidas brindan apoyo a las víctimas.</li>
`;
  content.appendChild(resourcesList);

  // Agrega la conclusión
  const conclusionTitle = document.createElement("h2");
  conclusionTitle.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
  conclusionTitle.textContent = "Conclusión";
  content.appendChild(conclusionTitle);

  const conclusionDesc = document.createElement("p");
  conclusionDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  conclusionDesc.textContent =
    "La violencia sexual es una problemática que requiere la atención y el compromiso de toda la sociedad. Identificar sus señales, educar sobre el respeto y el consentimiento, y ofrecer apoyo a las víctimas son pasos esenciales para construir un entorno más seguro y justo en Formosa y en toda Argentina.";
  content.appendChild(conclusionDesc);
  return container;
};

//esto dejo para cambiar la info que tengo aca a la otra pagina
