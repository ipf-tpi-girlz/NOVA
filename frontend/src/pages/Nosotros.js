export const Nosotros = () => {
  // Contenedor principal de la sección
  const conteiner = document.createElement("div");
  conteiner.className = "hero min-h-screen w-full";

  // Contenedor de la historia
  const historyConteiner = document.createElement("div");
  historyConteiner.className = "hero-content flex gap-5";

  // Título de la historia
  const historyTitle = document.createElement("h1");
  historyTitle.className = "text-5xl font-bold font-serif";
  historyTitle.textContent = "Nuestra historia";

  // Texto de la historia
  const historyText = document.createElement("p");
  historyText.className = "text-xl font-serif";
  historyText.innerHTML = `
    <p> 
      Nova es un espacio pensado para acompañar a todas las personas afectadas por la violencia de género. Sabemos lo difícil que puede ser pedir ayuda, por eso hemos creado este sitio web interactivo, seguro y confidencial, donde puedes encontrar un lugar de apoyo, donde puedas navegar, comunicarte y expresarte libremente.
    </p>
    <p> 
      En Nova, ofrecemos recursos educativos y acceso a profesionales como psicólogos para brindarte la orientación que necesitas. Nuestro propósito es dar visibilidad a la violencia de género, sensibilizar a la sociedad y, sobre todo, crear una comunidad de apoyo donde puedas sentirte respaldado, comprendido y acompañado en cada paso del proceso.
    </p>
    <p> 
      Nuestro compromiso es que el silencio se rompa, que el apoyo esté siempre al alcance de quien lo necesite, y que la violencia de género no quede oculta ni sin respuesta.
    </p>
  `;

  // Contenedor de las tarjetas de compromiso
  const conteinerCommit = document.createElement("div");
  conteinerCommit.className = "hero-content flex gap-5 flex-wrap justify-center"; // Contenedor para las cards

  // Título de las tarjetas
  const commitTitle = document.createElement("h1");
  commitTitle.className = "text-5xl font-bold font-serif mb-6 text-center w-full";
  commitTitle.textContent = "Nuestro compromiso";

  // Card 1: Privacidad
  const cardCommit1 = document.createElement("div");
  cardCommit1.className = "card card-compact bg-base-100 shadow-xl p-5 w-80 text-center";

  const card1Title = document.createElement("h2");
  card1Title.className = "card-title text-xl font-semibold";
  card1Title.textContent = "Privacidad";

  const svg1 = document.createElement("svg");
  svg1.className = "w-12 h-12 mx-auto";
  svg1.innerHTML = `
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  `;

  const card1Text = document.createElement("p");
  card1Text.className = "text-gray-600 mt-3";
  card1Text.textContent = "La privacidad y seguridad de nuestros usuarios es lo más importante para nosotros. Utilizamos medidas de seguridad avanzadas para proteger tus datos personales.";

  cardCommit1.appendChild(card1Title);
  cardCommit1.appendChild(svg1);
  cardCommit1.appendChild(card1Text);

  // Card 2: Inclusión
  const cardCommit2 = document.createElement("div");
  cardCommit2.className = "card card-compact bg-base-100 shadow-xl p-5 w-80 text-center";

  const card2Title = document.createElement("h2");
  card2Title.className = "card-title text-xl font-semibold";
  card2Title.textContent = "Inclusión";

  const svg2 = document.createElement("svg");
  svg2.className = "w-12 h-12 mx-auto";
  svg2.innerHTML = `
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  `;

  const card2Text = document.createElement("p");
  card2Text.className = "text-gray-600 mt-3";
  card2Text.textContent = "Nos comprometemos a brindar un ambiente de inclusión y equidad para todas las personas. Para nosotros es muy importante que todos puedan sentirse respetados y comprendidos.";

  cardCommit2.appendChild(card2Title);
  cardCommit2.appendChild(svg2);
  cardCommit2.appendChild(card2Text);

  // Card 3: Apoyo
  const cardCommit3 = document.createElement("div");
  cardCommit3.className = "card card-compact bg-base-100 shadow-xl p-5 w-80 text-center";

  const card3Title = document.createElement("h2");
  card3Title.className = "card-title text-xl font-semibold";
  card3Title.textContent = "Apoyo";

  const svg3 = document.createElement("svg");
  svg3.className = "w-12 h-12 mx-auto";
  svg3.innerHTML = `
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v12m3-3l3 3-3 3M6 18l-3 3 3 3" />
  `;

  const card3Text = document.createElement("p");
  card3Text.className = "text-gray-600 mt-3";
  card3Text.textContent = "Estamos aquí para brindar apoyo emocional, profesional y social a todas las personas que lo necesiten, para que puedan superar la violencia de género y empezar una nueva etapa."

  cardCommit3.appendChild(card3Title);
  cardCommit3.appendChild(svg3);
  cardCommit3.appendChild(card3Text);

  // Agregar las tarjetas al contenedor
  conteinerCommit.appendChild(cardCommit1);
  conteinerCommit.appendChild(cardCommit2);
  conteinerCommit.appendChild(cardCommit3);

  // Contenedor de la historia
  const imgHistorie = document.createElement("img");
  imgHistorie.src = "https://i.pinimg.com/564x/40/e6/21/40e621207bd87bcc3ed9f44e3a5d8f67.jpg";
  imgHistorie.className = "w-full md:w-96 md:h-96";
  imgHistorie.style.objectFit = "cover"; // Para ajustar la imagen

  // Agregar título, texto e imagen de la historia al contenedor de la historia
  const historyTiTe = document.createElement("div");
  historyTiTe.className = "flex flex-col justify-center items-start md:w-1/2";
  historyTiTe.appendChild(historyTitle);
  historyTiTe.appendChild(historyText);

  historyConteiner.appendChild(historyTiTe);
  historyConteiner.appendChild(imgHistorie);

  // Agregar la historia y el compromiso al contenedor principal
  conteiner.appendChild(historyConteiner);
  conteiner.appendChild(conteinerCommit);

  return conteiner;
};
