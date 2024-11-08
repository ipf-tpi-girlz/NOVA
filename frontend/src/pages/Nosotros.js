export const Nosotros = () => {
  // Contenedor principal de la sección
  const conteiner = document.createElement("div");
  conteiner.className = "bg-base-200 bg-cover py-20 w-full";

  // Contenedor de la historia
  const historyConteiner = document.createElement("div");
  historyConteiner.className = "container mx-auto flex flex-col md:flex-row gap-10 px-4";

  // Título de la historia
  const historyTitle = document.createElement("h1");
  historyTitle.className = "text-5xl font-bold font-serif text-gray-800 opacity-0 translate-y-10 transition-all duration-700";
  historyTitle.textContent = "Nuestra historia";

  // Texto de la historia
  const historyText1 = document.createElement("p");
  historyText1.className = "text-xl font-serif text-gray-600 opacity-0 translate-y-10 transition-all duration-700";
  historyText1.textContent = "Nova es un espacio pensado para acompañar a todas las personas afectadas por la violencia de género. Sabemos lo difícil que puede ser pedir ayuda, por eso hemos creado este sitio web interactivo, seguro y confidencial, donde puedes encontrar un lugar de apoyo, donde puedas navegar, comunicarte y expresarte libremente.";

  const historyText2 = document.createElement("p");
  historyText2.className = "text-xl font-serif text-gray-600 opacity-0 translate-y-10 transition-all duration-700";
  historyText2.textContent = "En Nova, ofrecemos recursos educativos y acceso a profesionales como psicólogos para brindarte la orientación que necesitas. Nuestro propósito es dar visibilidad a la violencia de género, sensibilizar a la sociedad y, sobre todo, crear una comunidad de apoyo donde puedas sentirte respaldado, comprendido y acompañado en cada paso del proceso.";

  const historyText3 = document.createElement("p");
  historyText3.className = "text-xl font-serif text-gray-600 opacity-0 translate-y-10 transition-all duration-700";
  historyText3.textContent = "Nuestro compromiso es que el silencio se rompa, que el apoyo esté siempre al alcance de quien lo necesite, y que la violencia de género no quede oculta ni sin respuesta.";

  // Imagen de la historia
  const imgHistorie = document.createElement("img");
  imgHistorie.src = "https://i.pinimg.com/564x/3e/c0/bc/3ec0bc0d4f927411e5318d08d94d18ab.jpg";
  imgHistorie.className = "w-full sm:w-2/3 md:w-1/3 h-auto object-cover rounded-lg opacity-0 translate-y-10 transition-all duration-700";

  // Contenedor de la información de la historia
  const historyInfoContainer = document.createElement("div");
  historyInfoContainer.className = "md:w-1/2 flex flex-col justify-center";
  historyInfoContainer.appendChild(historyTitle);
  historyInfoContainer.appendChild(historyText1);
  historyInfoContainer.appendChild(historyText2);
  historyInfoContainer.appendChild(historyText3);

  // Agregar imagen e información de la historia al contenedor
  historyConteiner.appendChild(imgHistorie);
  historyConteiner.appendChild(historyInfoContainer);

  // Contenedor de las tarjetas de compromiso
  const commitConteiner = document.createElement("div");
  commitConteiner.className = "container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-16";

  // Título de las tarjetas
  const commitTitle = document.createElement("h4");
  commitTitle.className = "text-5xl font-bold font-serif text-center text-gray-800 mb-8 opacity-0 translate-y-10 transition-all duration-700";
  commitTitle.textContent = "Nuestro compromiso";

  // Card 1: Privacidad
  const cardCommit1 = document.createElement("div");
  cardCommit1.className = "bg-white rounded-lg shadow-md p-6 flex flex-col items-center opacity-0 translate-y-10 transition-all duration-700";
  cardCommit1.style.backgroundImage = "url('https://i.pinimg.com/564x/5d/62/8e/5d628ee3a03b36749a8b433e0dea883a.jpg')"; // Fondo de la imagen
  cardCommit1.style.backgroundSize = "cover";  // Asegura que la imagen cubra toda la tarjeta
  cardCommit1.style.backgroundPosition = "center"; // Centra la imagen
  const card1Title = document.createElement("h3");
  card1Title.className = "text-xl font-semibold text-gray-800 mb-4";
  card1Title.textContent = "Privacidad";

  const card1Text = document.createElement("p");
  card1Text.className = "text-gray-600";
  card1Text.textContent = "La privacidad y seguridad de nuestros usuarios es lo más importante para nosotros. Utilizamos medidas de seguridad avanzadas para proteger tus datos personales.";

  cardCommit1.appendChild(card1Title);
  cardCommit1.appendChild(card1Text);

  // Card 2: Inclusión
  const cardCommit2 = document.createElement("div");
  cardCommit2.className = "bg-white rounded-lg shadow-md p-6 flex flex-col items-center opacity-0 translate-y-10 transition-all duration-700";
  cardCommit2.style.backgroundImage = "url('https://i.pinimg.com/564x/5d/62/8e/5d628ee3a03b36749a8b433e0dea883a.jpg')";
  cardCommit2.style.backgroundSize = "cover";
  cardCommit2.style.backgroundPosition = "center";
  const card2Title = document.createElement("h3");
  card2Title.className = "text-xl font-semibold text-gray-800 mb-4";
  card2Title.textContent = "Inclusión";

  const card2Text = document.createElement("p");
  card2Text.className = "text-gray-600";
  card2Text.textContent = "Nos comprometemos a brindar un ambiente de inclusión y equidad para todas las personas. Para nosotros es muy importante dar visibilidad a la diversidad de identidades y experiencias.";

  cardCommit2.appendChild(card2Title);
  cardCommit2.appendChild(card2Text);

  // Card 3: Apoyo Psicológico
  const cardCommit3 = document.createElement("div");
  cardCommit3.className = "bg-white rounded-lg shadow-md p-6 flex flex-col items-center opacity-0 translate-y-10 transition-all duration-700";
  cardCommit3.style.backgroundImage = "url('https://i.pinimg.com/564x/5d/62/8e/5d628ee3a03b36749a8b433e0dea883a.jpg')";
  cardCommit3.style.backgroundSize = "cover";
  cardCommit3.style.backgroundPosition = "center";
  const card3Title = document.createElement("h3");
  card3Title.className = "text-xl font-semibold text-gray-800 mb-4";
  card3Title.textContent = "Apoyo Psicológico";

  const card3Text = document.createElement("p");
  card3Text.className = "text-gray-600";
  card3Text.textContent = "Ofrecemos apoyo psicológico para ayudarte a superar situaciones de violencia. Nuestros profesionales están disponibles para brindarte orientación y acompañamiento en el proceso de recuperación.";

  cardCommit3.appendChild(card3Title);
  cardCommit3.appendChild(card3Text);

  // Agregar las tarjetas al contenedor
  commitConteiner.appendChild(cardCommit1);
  commitConteiner.appendChild(cardCommit2);
  commitConteiner.appendChild(cardCommit3);

  // Agregar todo al contenedor principal
  conteiner.appendChild(historyConteiner);
  conteiner.appendChild(commitTitle);
  conteiner.appendChild(commitConteiner);

  // Función para observar los elementos y aplicar animaciones cuando entran en el viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, { threshold: 0.5 }); // Cuando el 50% del elemento es visible

  // Observar cada uno de los elementos que deben aparecer
  observer.observe(historyTitle);
  observer.observe(historyText1);
  observer.observe(historyText2);
  observer.observe(historyText3);
  observer.observe(imgHistorie);
  observer.observe(commitTitle);
  observer.observe(cardCommit1);
  observer.observe(cardCommit2);
  observer.observe(cardCommit3);

  return conteiner;
};
