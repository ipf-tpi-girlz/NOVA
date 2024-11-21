export const Nosotros = () => {
  // Contenedor principal de la sección
  const conteiner = document.createElement("div");
  conteiner.className = " bg-cover  mx-12";

  // Contenedor de la historia
  const historyConteiner = document.createElement("div");
  historyConteiner.className =
    "container mx-auto flex flex-col md:flex-row gap-10 px-4 mx-4";

  // Título de la historia
  const historyTitle = document.createElement("h1");
  historyTitle.className =
    "text-5xl font-bold font-serif text-center mb-8 mt-6";
  historyTitle.textContent = "Nuestra historia";

  // Texto de la historia
  const historyText1 = document.createElement("p");
  historyText1.className = "text-xl font-serif mt-6 mb-6  mt-4";
  historyText1.textContent =
    "Nova es un espacio pensado para acompañar a todas las personas afectadas por la violencia de género. Sabemos lo difícil que puede ser pedir ayuda, por eso hemos creado este sitio web interactivo, seguro  confidencial, donde puedes encontrar un lugar de apoyo, donde puedas navegar, comunicarte y expresarte libremente.";

  const historyText2 = document.createElement("p");
  historyText2.className = "text-xl font-serif  mt-4";
  historyText2.textContent =
    "En Nova, ofrecemos recursos educativos y acceso a profesionales como psicólogos para brindarte la orientación que necesitas. Nuestro propósito es dar visibilidad a la violencia de género, sensibilizar a la sociedad y, sobre todo, crear una comunidad de apoyo donde puedas sentirte respaldado, comprendido y acompañado en cada paso del proceso.";

  const historyText3 = document.createElement("p");
  historyText3.className = "text-xl font-serif  mt-4";
  historyText3.textContent =
    "Nuestro compromiso es que el silencio se rompa, que el apoyo esté siempre al alcance de quien lo necesite, y que la violencia de género no quede oculta ni sin respuesta.";

  // Contenedor de la información de la historia
  const historyInfoContainer = document.createElement("div");

  historyInfoContainer.appendChild(historyTitle);
  historyInfoContainer.appendChild(historyText1);
  historyInfoContainer.appendChild(historyText2);
  historyInfoContainer.appendChild(historyText3);

  // Agregar imagen e información de la historia al contenedor
  historyConteiner.appendChild(historyInfoContainer);

  // Contenedor de las tarjetas de compromiso
  const commitConteiner = document.createElement("div");
  commitConteiner.className =
    "container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-16";

  // Título de las tarjetas
  const commitTitle = document.createElement("h4");
  commitTitle.className = "text-5xl font-bold font-serif text-center  mb-8";
  commitTitle.textContent = "Nuestro compromiso";

  // Card 1: Privacidad
  const cardCommit1 = document.createElement("div");
  cardCommit1.className =
    "bg-base-100 bg-cover rounded-lg shadow-md p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";

  const card1Title = document.createElement("h3");
  card1Title.className = "text-xl font-semibold  mb-4";
  card1Title.textContent = "Privacidad";

  const card1Text = document.createElement("p");
  card1Text.className = "";
  card1Text.textContent =
    "La privacidad y seguridad de nuestros usuarios es lo más importante para nosotros. Utilizamos medidas de seguridad avanzadas para proteger tus datos personales.";

  cardCommit1.appendChild(card1Title);
  cardCommit1.appendChild(card1Text);

  // Card 2: Inclusión
  const cardCommit2 = document.createElement("div");
  cardCommit2.className =
    "bg-base-100 bg-cover rounded-lg shadow-md p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";

  const card2Title = document.createElement("h3");
  card2Title.className = "text-xl font-semibold  mb-4";
  card2Title.textContent = "Inclusión";

  const card2Text = document.createElement("p");
  card2Text.className = "";
  card2Text.textContent =
    "Nos comprometemos a brindar un ambiente de inclusión y equidad para todas las personas. Para nosotros es muy importante dar visibilidad a la diversidad de identidades y experiencias.";

  cardCommit2.appendChild(card2Title);
  cardCommit2.appendChild(card2Text);

  // Card 3: Apoyo Psicológico
  const cardCommit3 = document.createElement("div");
  cardCommit3.className =
    "bg-base-100 bg-cover rounded-lg shadow-md p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";

  const card3Title = document.createElement("h3");
  card3Title.className = "text-xl font-semibold  mb-4";
  card3Title.textContent = "Apoyo Psicológico";

  const card3Text = document.createElement("p");
  card3Text.className = "";
  card3Text.textContent =
    "Ofrecemos apoyo psicológico para ayudarte a superar situaciones de violencia. Nuestros profesionales están disponibles para brindarte orientación y acompañamiento en el proceso de recuperación.";

  cardCommit3.appendChild(card3Title);
  cardCommit3.appendChild(card3Text);

  // Agregar las tarjetas al contenedor
  commitConteiner.appendChild(cardCommit1);
  commitConteiner.appendChild(cardCommit2);
  commitConteiner.appendChild(cardCommit3);

  // Sección ¿Qué hacemos?
  const weDo = document.createElement("div");
  weDo.className = "rounded-lg m-8 flex flex-col items-center";
  const titleWedo = document.createElement("h1");
  const textWedo = document.createElement("p");

  titleWedo.className = "text-5xl font-bold font-serif text-center  mb-8";
  textWedo.className = " text-center";
  titleWedo.textContent = "¿Qué hacemos?";
  textWedo.textContent =
    "En Nova, nos dedicamos a conectar a las personas con profesionales de la salud mental especializados en el acompañamiento durante el proceso de superación de situaciones de violencia de género. Nuestro objetivo es ofrecer apoyo psicológico integral para ayudarte a sanar y superar las secuelas del maltrato, brindándote las herramientas necesarias para avanzar hacia tu bienestar y crecimiento personal mediante:";

  weDo.appendChild(titleWedo);
  weDo.appendChild(textWedo);

  // Agregar todo al contenedor principal
  conteiner.appendChild(historyConteiner);
  conteiner.appendChild(commitTitle);
  conteiner.appendChild(commitConteiner);
  conteiner.appendChild(weDo);

  // Crear las nuevas tarjetas debajo de "¿Qué hacemos?"
  const cardsContainer = document.createElement("div");
  cardsContainer.className =
    " container  justify-center items-center grid grid-cols-2 gap-12  ";

  // Card de Artículos
  const cardArticle = document.createElement("div");
  cardArticle.className =
    "bg-base-100  rounded-lg  shadow-lg p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";
  const articleTitle = document.createElement("h3");
  articleTitle.className = "text-xl font-semibold  mb-4";
  articleTitle.textContent = "Artículos";
  const articleText = document.createElement("p");
  articleText.className = "";
  articleText.textContent =
    "Aquí puedes encontrar información y artículos subidos por profesionales, que te ayudarán a comprender mejor las situaciones de violencia de género y cómo abordarlas.";
  const articleButton = document.createElement("a");
  articleButton.href = "/articulos";
  articleButton.className =
    "btn mt-4 bg-pink-400 to-purple-700 text-white mx-0 py-2 px-6 rounded-lg  ";
  articleButton.textContent = "Ver";
  cardArticle.appendChild(articleTitle);
  cardArticle.appendChild(articleText);
  cardArticle.appendChild(articleButton);

  // Card de Historias
  const cardStory = document.createElement("div");
  cardStory.className =
    "bg-base-100 rounded-lg  shadow-lg p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";
  const storyTitle = document.createElement("h3");
  storyTitle.className = "text-xl font-semibold  mb-4";
  storyTitle.textContent = "Historias";
  const storyText = document.createElement("p");
  storyText.className = "";
  storyText.textContent =
    "Encuentra historias redactadas por usuarios que han pasado por situaciones de violencia, compartiendo sus experiencias y superación.";
  const storyButton = document.createElement("a");
  storyButton.href = "/historias";
  storyButton.className =
    "mt-4 bg-pink-400 btn to-purple-700 text-white py-2 px-6 rounded-lg  ";
  storyButton.textContent = "Ver ";
  cardStory.appendChild(storyTitle);
  cardStory.appendChild(storyText);
  cardStory.appendChild(storyButton);

  // Card de Comunidades
  const cardCommunity = document.createElement("div");
  cardCommunity.className =
    "bg-base-100 rounded-lg  shadow-lg p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";
  const communityTitle = document.createElement("h3");
  communityTitle.className = "text-xl font-semibold  mb-4";
  communityTitle.textContent = "Comunidades";
  const communityText = document.createElement("p");
  communityText.className = "";
  communityText.textContent =
    "Únete a nuestra comunidad de apoyo gestionada por profesionales. Interactúa mediante publicaciones y encuentra el respaldo que necesitas.";
  const communityButton = document.createElement("a");
  communityButton.href = "/comunidades";
  communityButton.className =
    "mt-4 btn bg-pink-400 to-purple-800 text-white py-2 px-6 rounded-lg  ";
  communityButton.textContent = "Ver";
  cardCommunity.appendChild(communityTitle);
  cardCommunity.appendChild(communityText);
  cardCommunity.appendChild(communityButton);

  // Card de Profesionales
  const cardProfessionals = document.createElement("div");
  cardProfessionals.className =
    "bg-base-100 rounded-lg  shadow-lg p-6 flex flex-col items-center  ease-in-out transform hover:shadow-lg hover:scale-105";
  const professionalsTitle = document.createElement("h3");
  professionalsTitle.className = "text-xl font-semibold  mb-4";
  professionalsTitle.textContent = "Profesionales";
  const professionalsText = document.createElement("p");
  professionalsText.className = "";
  professionalsText.textContent =
    "En esta sección podrás obtener más información sobre los profesionales de la salud mental que pueden brindarte ayuda para superar situaciones de violencia de género.";
  const professionalsButton = document.createElement("a");
  professionalsButton.href = "/profesionales";
  professionalsButton.className =
    "mt-4 btn  bg-pink-400  text-white py-2 px-6 rounded-lg ";
  professionalsButton.textContent = "Ver";
  cardProfessionals.appendChild(professionalsTitle);
  cardProfessionals.appendChild(professionalsText);
  cardProfessionals.appendChild(professionalsButton);

  // Agregar las nuevas tarjetas al contenedor
  cardsContainer.appendChild(cardArticle);
  cardsContainer.appendChild(cardStory);
  cardsContainer.appendChild(cardCommunity);
  cardsContainer.appendChild(cardProfessionals); // Aquí añadimos la nueva tarjeta

  // Agregar las nuevas tarjetas al contenedor principal
  conteiner.appendChild(cardsContainer);

  return conteiner;
};
