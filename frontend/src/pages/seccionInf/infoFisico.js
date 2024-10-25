export const articuloFisco = () => {
  // Crea y agrega el contenedor principal
  const container = document.createElement("div");
  container.className =
    "bg-gradient-to-br from-red-50 to-orange-100 min-h-screen";
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
    "bg-gradient-to-r from-red-600 to-orange-600 text-white p-10 relative";
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
    "Violencia Física: Cómo Identificarla, Prevenirla y Comprender su Impacto";
  headerContent.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.className = "text-xl text-red-200";
  subtitle.textContent = "Explorando una forma visible y alarmante de abuso";
  headerContent.appendChild(subtitle);

  // Crea el contenido del artículo
  const content = document.createElement("div");
  content.className = "p-8 md:p-12";
  article.appendChild(content);

  const contentIntro = document.createElement("div");

  // Agrega párrafo de introducción
  const intro = document.createElement("p");
  intro.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  intro.textContent =
    "La violencia física es una de las formas más visibles y alarmantes de abuso, que se manifiesta a través de agresiones físicas directas hacia una persona. Esta forma de violencia puede tener consecuencias devastadoras no solo para la víctima, sino también para su entorno familiar y social. En este artículo, exploraremos qué es la violencia física, cómo identificarla, las medidas de prevención disponibles y los recursos en la provincia de Formosa, Argentina.";
  content.appendChild(intro);

  // Agrega el título y la descripción de "¿Qué es la Violencia Física?"
  const section1Title = document.createElement("h2");
  section1Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section1Title.textContent = "¿Qué es la Violencia Física?";
  content.appendChild(section1Title);

  const section1Desc = document.createElement("p");
  section1Desc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  section1Desc.textContent =
    "La violencia física se define como cualquier acto que implique el uso de la fuerza física contra otra persona con el propósito de causarle daño. Esto incluye, pero no se limita a:";
  content.appendChild(section1Desc);

  // Agrega la lista de tipos de violencia física
  const typesList = document.createElement("ul");
  typesList.className = "list-disc pl-8 mb-6";
  typesList.innerHTML = `
  <li>Golpes: Puñetazos, patadas o cualquier tipo de agresión que cause daño físico.</li>
  <li>Empujones: Fuerza utilizada para desequilibrar o derribar a otra persona.</li>
  <li>Agujeros: Uso de objetos como palos, cuchillos o armas de fuego para infligir daño.</li>
  <li>Privación de libertad: Mantener a alguien en un lugar sin su consentimiento, como una forma de control o castigo.</li>
`;
  content.appendChild(typesList);

  // Agrega la importancia de la ley
  const lawDesc = document.createElement("p");
  lawDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  lawDesc.textContent =
    "La Ley N° 26.485 de Argentina, que se centra en la prevención, sanción y erradicación de la violencia contra las mujeres, también abarca la violencia física como un componente clave de la violencia de género.";
  content.appendChild(lawDesc);

  // Agrega la sección "Cómo Identificar la Violencia Física"
  const section2Title = document.createElement("h2");
  section2Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section2Title.textContent = "Cómo Identificar la Violencia Física";
  content.appendChild(section2Title);

  const identificationDesc = document.createElement("p");
  identificationDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  identificationDesc.textContent =
    "Identificar la violencia física puede ser más fácil que otras formas de abuso, ya que a menudo deja marcas visibles. Sin embargo, hay comportamientos y señales que indican la presencia de violencia física:";
  content.appendChild(identificationDesc);

  // Agrega la lista de señales de violencia física
  const signsList = document.createElement("ul");
  signsList.className = "list-disc pl-8 mb-6";
  signsList.innerHTML = `
  <li>Lesiones visibles: Moretones, cortes, quemaduras u otras marcas en el cuerpo que son el resultado de un ataque físico.</li>
  <li>Cambios en el comportamiento: La víctima puede mostrar signos de ansiedad, miedo o evasión, especialmente en presencia del agresor.</li>
  <li>Justificaciones constantes: La víctima a menudo minimiza o justifica las agresiones, afirmando que "no fue para tanto" o que "sucedió porque estaba enojado".</li>
  <li>Aislamiento social: El agresor puede intentar aislar a la víctima de su familia y amigos, lo que puede dificultar la búsqueda de ayuda.</li>
`;
  content.appendChild(signsList);

  // Agrega el impacto de la violencia física
  const section3Title = document.createElement("h2");
  section3Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section3Title.textContent = "Impacto de la Violencia Física";
  content.appendChild(section3Title);

  const impactDesc = document.createElement("p");
  impactDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  impactDesc.textContent =
    "La violencia física no solo afecta el bienestar físico de la víctima, sino que también tiene repercusiones emocionales y psicológicas a largo plazo. Algunas de las consecuencias más comunes incluyen:";
  content.appendChild(impactDesc);

  const impactList = document.createElement("ul");
  impactList.className = "list-disc pl-8 mb-6";
  impactList.innerHTML = `
  <li>Trastornos de salud mental: Las víctimas pueden desarrollar depresión, trastorno de estrés postraumático (TEPT) y trastornos de ansiedad.</li>
  <li>Lesiones físicas: Dependiendo de la gravedad de las agresiones, las víctimas pueden enfrentar desde lesiones menores hasta daños severos, incluso la muerte.</li>
  <li>Dificultades en las relaciones: La violencia física puede dificultar la capacidad de la víctima para confiar en otros y establecer relaciones saludables en el futuro.</li>
`;
  content.appendChild(impactList);

  // Agrega la sección de prevención
  const section4Title = document.createElement("h2");
  section4Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section4Title.textContent =
    "Prevención de la Violencia Física en la Provincia";
  content.appendChild(section4Title);

  const preventionDesc = document.createElement("p");
  preventionDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  preventionDesc.textContent =
    "Prevenir la violencia física requiere un enfoque integral que involucre a toda la sociedad. Algunas estrategias clave incluyen:";
  content.appendChild(preventionDesc);

  // Agrega la lista de estrategias de prevención
  const preventionList = document.createElement("ul");
  preventionList.className = "list-disc pl-8 mb-6";
  preventionList.innerHTML = `
  <li>Educación sobre violencia de género: La educación es fundamental para crear conciencia sobre la violencia física y promover relaciones saludables. La implementación de programas de educación sexual integral (ESI) en las escuelas es esencial.</li>
  <li>Fomento de la igualdad de género: Promover la igualdad entre hombres y mujeres en todos los aspectos de la vida, desde la educación hasta el trabajo, puede ayudar a reducir las desigualdades que a menudo conducen a la violencia.</li>
  <li>Campañas de sensibilización: Las campañas locales, organizadas por el gobierno provincial y organizaciones de la sociedad civil, son cruciales para visibilizar el problema y fomentar una cultura de respeto y no violencia.</li>
  <li>Formación de profesionales: Capacitar a personal de salud, educadores y fuerzas de seguridad para reconocer y responder adecuadamente a los signos de violencia física es fundamental para brindar un apoyo efectivo a las víctimas.</li>
`;
  content.appendChild(preventionList);

  // Agrega estadísticas y realidad en Formosa
  const section5Title = document.createElement("h2");
  section5Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section5Title.textContent = "Estadísticas y Realidad en Formosa";
  content.appendChild(section5Title);

  const statisticsDesc = document.createElement("p");
  statisticsDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  statisticsDesc.textContent =
    "La violencia física es un problema significativo en Formosa y en Argentina en general:";
  content.appendChild(statisticsDesc);

  const statisticsList = document.createElement("ul");
  statisticsList.className = "list-disc pl-8 mb-6";
  statisticsList.innerHTML = `
  <li>Según el Ministerio de las Mujeres, Géneros y Diversidad, el 40% de las mujeres en Argentina han sufrido algún tipo de violencia física a lo largo de sus vidas.</li>
  <li>La Subsecretaría de la Mujer de Formosa ha registrado un aumento en las denuncias de violencia de género, que incluyen casos de violencia física, especialmente en situaciones de crisis, como la pandemia de COVID-19.</li>
  <li>Los datos del Registro Único de Casos de Violencia contra las Mujeres (RUCVM) indican que las denuncias de violencia física han ido en aumento, reflejando una creciente conciencia y disposición a reportar estos casos.</li>
`;
  content.appendChild(statisticsList);

  // Agrega recursos y ayuda en Formosa
  const section6Title = document.createElement("h2");
  section6Title.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  section6Title.textContent = "Recursos y Ayuda en Formosa";
  content.appendChild(section6Title);

  const resourcesDesc = document.createElement("p");
  resourcesDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  resourcesDesc.textContent =
    "Si tú o alguien que conoces está experimentando violencia física, es crucial saber que hay recursos y apoyo disponibles:";
  content.appendChild(resourcesDesc);

  const resourcesList = document.createElement("ul");
  resourcesList.className = "list-disc pl-8 mb-6";
  resourcesList.innerHTML = `
  <li><strong>Línea 144:</strong> Esta línea ofrece asistencia gratuita y confidencial las 24 horas del día a personas que sufren violencia de género, incluyendo violencia física.</li>
  <li><strong>Centro de Atención Integral a la Mujer:</strong> En Formosa, este centro brinda apoyo psicológico, legal y social a las víctimas de violencia.</li>
  <li><strong>Comisarías de la Mujer:</strong> Estas comisarías están diseñadas para ofrecer un entorno seguro y sensible para la denuncia de casos de violencia de género, incluyendo violencia física.</li>
  <li><strong>Organizaciones no gubernamentales (ONGs):</strong> Existen diversas ONGs en Formosa que trabajan para brindar apoyo a las víctimas y fomentar la prevención de la violencia de género.</li>
`;
  content.appendChild(resourcesList);

  // Agrega la conclusión
  const conclusionTitle = document.createElement("h2");
  conclusionTitle.className = "text-3xl font-bold mt-10 mb-6 text-red-800";
  conclusionTitle.textContent = "Conclusión";
  content.appendChild(conclusionTitle);

  const conclusionDesc = document.createElement("p");
  conclusionDesc.className = "text-lg text-gray-700 mb-6 leading-relaxed";
  conclusionDesc.textContent =
    "La violencia física es una realidad alarmante que afecta a muchas personas en Formosa y en todo Argentina. Identificar sus signos, educar sobre la prevención y ofrecer apoyo a las víctimas son pasos esenciales para abordar este problema de manera efectiva. Al fomentar una cultura de respeto y cero tolerancia hacia la violencia, podemos contribuir a un futuro más seguro y equitativo para todos.";
  content.appendChild(conclusionDesc);
  return container;
};
