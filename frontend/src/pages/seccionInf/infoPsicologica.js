export const articuloPsicologico = () => {
  // Crear el contenedor principal
  const container = document.createElement("div");
  container.className = "container mx-auto p-8";

  // Crear el artículo principal
  const article = document.createElement("article");
  article.className =
    "bg-white shadow-2xl rounded-xl overflow-hidden max-w-4xl mx-auto";

  // Crear el header del artículo
  const header = document.createElement("header");
  header.className =
    "bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-10 relative";

  const overlay = document.createElement("div");
  overlay.className = "absolute top-0 left-0 w-full h-full bg-black opacity-20";
  header.appendChild(overlay);

  const headerContent = document.createElement("div");
  headerContent.className = "relative z-10";

  const h1 = document.createElement("h1");
  h1.className = "text-4xl md:text-5xl font-bold mb-4 leading-tight";
  h1.textContent =
    "Violencia Psicológica: Cómo Identificarla, Prevenirla y Comprender su Impacto";

  const headerDescription = document.createElement("p");
  headerDescription.className = "text-xl text-purple-200";
  headerDescription.textContent =
    "Un análisis profundo sobre una forma invisible pero devastadora de maltrato";

  headerContent.appendChild(h1);
  headerContent.appendChild(headerDescription);
  header.appendChild(headerContent);
  article.appendChild(header);

  // Crear la sección principal de contenido
  const content = document.createElement("div");
  content.className = "p-8 md:p-12";

  const paragraphs = [
    {
      class: "text-lg text-gray-700 mb-6 leading-relaxed",
      text: "La violencia psicológica es una forma invisible pero devastadora de maltrato. Aunque no deja huellas físicas, sus cicatrices emocionales pueden durar toda la vida. Este tipo de violencia afecta la autoestima, las relaciones y la salud mental de quienes la padecen.",
    },
    {
      class: "text-3xl font-bold mt-10 mb-6 text-purple-800",
      text: "¿Qué es la Violencia Psicológica?",
    },
    {
      class: "text-lg text-gray-700 mb-6 leading-relaxed",
      text: "La violencia psicológica, también conocida como abuso emocional, se manifiesta a través de conductas de manipulación, control, desvalorización y humillación que impactan la salud emocional de la víctima. Puede ocurrir en cualquier tipo de relación: pareja, familiar, laboral o entre amigos.",
    },
    {
      class: "text-3xl font-bold mt-10 mb-6 text-purple-800",
      text: "Cómo Identificar la Violencia Psicológica",
    },
  ];

  paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.className = paragraph.class;
    p.textContent = paragraph.text;
    content.appendChild(p);
  });

  // Crear lista de identificación
  const ul = document.createElement("ul");
  ul.className = "list-none pl-0 mb-6";
  const listItems = [
    "Aislamiento forzado",
    "Control excesivo",
    "Desvalorización constante",
    "Gaslighting",
    "Amenazas e intimidación",
  ];

  listItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex items-center mb-4";
    li.innerHTML = `
            <span class="bg-purple-200 rounded-full p-2 mr-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </span>
            <span class="text-lg text-gray-700">${item}</span>
        `;
    ul.appendChild(li);
  });
  content.appendChild(ul);

  // Agregar otras secciones como "Impacto en la Salud Mental", "Prevención", y más
  const additionalSections = [
    {
      title: "Impacto en la Salud Mental",
      content: `
                <div class="bg-indigo-100 rounded-lg p-6 mb-8">
                    <ul class="list-disc pl-6 mb-0">
                        <li class="text-lg text-indigo-800 mb-2">Trastornos de ansiedad</li>
                        <li class="text-lg text-indigo-800 mb-2">Depresión</li>
                        <li class="text-lg text-indigo-800 mb-2">Estrés postraumático (TEPT)</li>
                        <li class="text-lg text-indigo-800">Baja autoestima</li>
                    </ul>
                </div>
            `,
    },
    {
      title: "Prevención de la Violencia Psicológica",
      content: `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-purple-100 rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 text-purple-800">Fomento de la autoestima</h3>
                        <p class="text-gray-700">Desarrollar programas de empoderamiento y educación emocional desde la infancia.</p>
                    </div>
                    <div class="bg-purple-100 rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 text-purple-800">Educación sobre relaciones saludables</h3>
                        <p class="text-gray-700">Enseñar desde temprana edad sobre el respeto mutuo y la comunicación abierta.</p>
                    </div>
                    <div class="bg-purple-100 rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 text-purple-800">Detección temprana</h3>
                        <p class="text-gray-700">Capacitar a profesionales para identificar señales de abuso psicológico.</p>
                    </div>
                    <div class="bg-purple-100 rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-3 text-purple-800">Campañas de concienciación</h3>
                        <p class="text-gray-700">Educar a la población sobre los riesgos y las señales de la violencia psicológica.</p>
                    </div>
                </div>
            `,
    },
  ];

  additionalSections.forEach((section) => {
    const h2 = document.createElement("h2");
    h2.className = "text-3xl font-bold mt-10 mb-6 text-purple-800";
    h2.textContent = section.title;
    const sectionContent = document.createElement("div");
    sectionContent.innerHTML = section.content;
    content.appendChild(h2);
    content.appendChild(sectionContent);
  });

  article.appendChild(content);
  container.appendChild(article);
  app.appendChild(container);

  return articuloPsicologico;
};
