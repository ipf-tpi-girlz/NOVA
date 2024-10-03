import bg from "../assets/pexels.jpg";
export const contacts = () => {
  const containerContacts = document.createElement("div");
  containerContacts.classList.add("bg-base", "flex-grow", "min-h-screen", "m-12");

  const caratula = document.createElement("div");
 caratula.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "p-40",
    "bg-center",
    "bg-cover",
    "h-60",
    "w-100",
  );
  caratula.style.backgroundImage = `url(${bg})`;
  const titulo = document.createElement("h1");
  titulo.classList.add(
    "text-3xl",
    "font-bold",
    "text-center",
    "font-serif",);
  titulo.textContent = "Contactos de Ayuda";
  
  const body = document.createElement("div")
  body.classList.add("flex", "flex-col", "p-5")
  const parrafodesc = document.createElement("p");
  parrafodesc.classList.add("font-serif");
  parrafodesc.textContent =
    "En esta session brindaremos contactos de ayuda en casos de emergencia, desamparo o, simplemente, ayuda. Las instituciones y especialistas que encontraran en la pagina estan miniusiomamente verificados y calificados.";
const contactospreviw = document.createElement("div")
contactospreviw.classList.add("flex", "flex-row", "gap-5")
const contactospreviw1 = document.createElement("div")
const contactospreviw2 = document.createElement("div")
// Crear el artículo principal
const article = document.createElement("article");
article.classList.add("relative", "overflow-hidden", "rounded-lg", "shadow", "transition", "hover:shadow-lg");

// Crear la imagen
const img = document.createElement("img");
img.setAttribute("alt", "");
img.setAttribute(
  "src","https://www.lamañanaonline.com.ar/media/fotos/menu_20200611003404.jpg");
img.classList.add("absolute", "inset-0", "h-full", "w-full", "object-cover", "rounded-lg");

// Crear el contenedor del gradiente y el contenido
const gradientDiv = document.createElement("div");
gradientDiv.classList.add("relative", "bg-gradient-to-t", "from-base-900/50", "to-base-900/25", "pt-32", "sm:pt-48", "lg:pt-64", "w-00");

// Crear el div que contiene el texto
const contentDiv = document.createElement("div");
contentDiv.classList.add("p-4", "sm:p-6");

// Crear el tiempo (fecha)
const time = document.createElement("time");
time.setAttribute("datetime", "2024-10-01");
time.classList.add("block", "text-xs", "text-white/90");
time.textContent = "01th Oct 2024";

// Crear el enlace y el encabezado
const link = document.createElement("a");
link.setAttribute("href", "#");

const heading = document.createElement("h3");
heading.classList.add("mt-0.5", "text-lg", "text-white", "font-bold");
heading.textContent = "Secretaria de al mujer";

// Añadir el encabezado al enlace
link.appendChild(heading);

// Crear el párrafo
const paragraph = document.createElement("p");
paragraph.classList.add("mt-2", "line-clamp-3", "text-sm/relaxed", "text-white");
paragraph.textContent =
  "La Provincia de Formosa es pionera en el proceso de integración de políticas públicas orientadas a los diferentes sectores de la sociedad, especialmente de los grupos más vulnerables. En este proceso el enfoque de género es central, cuyo rol del Estado es fundamentalmente otorgar el reconocimiento pleno de derechos a sus ciudadanos y ciudadanas hacia la concreción de la igualdad de oportunidades.";

// Agregar elementos al contenido
contentDiv.appendChild(time);
contentDiv.appendChild(link);
contentDiv.appendChild(paragraph);

// Agregar el contenido y la imagen al gradiente div
gradientDiv.appendChild(contentDiv);

// Añadir la imagen y el contenedor de gradiente al artículo principal
article.appendChild(img);
article.appendChild(gradientDiv);
contactospreviw1.appendChild(article);

//////
// Crear el enlace principal
const mainLink = document.createElement("a");
mainLink.setAttribute("href", "#");
mainLink.classList.add("relative", "block", "overflow-hidden", "rounded-lg", "border", "border-base", "p-4", "sm:p-6", "lg:p-8");

// Crear el span para el gradiente
const gradientEffectSpan = document.createElement("span");
gradientEffectSpan.classList.add("absolute", "inset-x-0", "bottom-0", "h-2", "bg-gradient-to-r", "from-green-300", "via-blue-500", "to-purple-600");

// Crear el contenedor para el título y la imagen
const contentContainer = document.createElement("div");
contentContainer.classList.add("sm:flex", "sm:justify-between", "sm:gap-4");

// Crear el contenedor para el título y el autor
const textContent = document.createElement("div");

// Crear el título
const articleTitle = document.createElement("h3");
articleTitle.classList.add("text-lg", "font-bold", "text-base-900", "sm:text-xl");
articleTitle.textContent = "Psicologa especialista, Secretaria de la Mujer";

// Crear el párrafo para el autor
const authorInfo = document.createElement("p");
authorInfo.classList.add("mt-1", "text-xs", "font-medium", "text-base-600");
authorInfo.textContent = "Jean Doe";

// Añadir el título y el autor al contenedor de texto
textContent.appendChild(articleTitle);
textContent.appendChild(authorInfo);

// Crear el contenedor para la imagen
const imageWrapper = document.createElement("div");
imageWrapper.classList.add("hidden", "sm:block", "sm:shrink-0");

// Crear la imagen
const articleImage = document.createElement("img");
articleImage.setAttribute("alt", "");
articleImage.setAttribute(
  "src",
  "https://images.pexels.com/photos/4098283/pexels-photo-4098283.jpeg?auto=compress&cs=tinysrgb&w=600"
);
articleImage.classList.add("size-16", "rounded-lg", "object-cover", "shadow-lg");

// Añadir la imagen al contenedor de imagen
imageWrapper.appendChild(articleImage);

// Añadir el texto y la imagen al contenedor principal
contentContainer.appendChild(textContent);
contentContainer.appendChild(imageWrapper);

// Crear el párrafo de descripción
const articleDescription = document.createElement("p");
articleDescription.classList.add("mt-4", "text-pretty", "text-sm", "text-base-500");
articleDescription.textContent =
  "Especialista en casos de violencia, más de 5 años de experiencia, psicologia y neuropsicologia.";

// Crear el contenedor para los detalles (fecha de publicación y tiempo de lectura)
const detailsList = document.createElement("dl");
detailsList.classList.add("mt-6", "flex", "gap-4", "sm:gap-6");

// Crear el contenedor de "Published"
const publishedInfo = document.createElement("div");
publishedInfo.classList.add("flex", "flex-col-reverse");

// Crear el dt y dd para "Published"
const publishedTitle = document.createElement("dt");
publishedTitle.classList.add("text-sm", "font-medium", "text-base-600");
publishedTitle.textContent = "Fecha de inicio";

const publishedDate = document.createElement("dd");
publishedDate.classList.add("text-xs", "text-base-500");
publishedDate.textContent = "31st June, 2018";

// Añadir dt y dd al contenedor de "Published"
publishedInfo.appendChild(publishedDate);
publishedInfo.appendChild(publishedTitle);

// Crear el contenedor de "Reading time"
const readingTimeInfo = document.createElement("div");
readingTimeInfo.classList.add("flex", "flex-col-reverse");

// Añadir los dos contenedores (Published y Reading time) al dl
detailsList.appendChild(publishedInfo);
detailsList.appendChild(readingTimeInfo);

// Añadir todos los elementos al enlace principal
mainLink.appendChild(gradientEffectSpan);
mainLink.appendChild(contentContainer);
mainLink.appendChild(articleDescription);
mainLink.appendChild(detailsList);

const tittlecontact = document.createElement("h1")
tittlecontact.classList.add("font-bold", "font-serif", "text-center")
body.appendChild(tittlecontact)
contactospreviw2.appendChild(mainLink)

contactospreviw.appendChild(contactospreviw1)
contactospreviw.appendChild(contactospreviw2)



  caratula.appendChild(titulo);
  body.appendChild(parrafodesc)
  containerContacts.appendChild(caratula);
  containerContacts.appendChild(body)
  containerContacts.appendChild(contactospreviw)
  return containerContacts;
};
