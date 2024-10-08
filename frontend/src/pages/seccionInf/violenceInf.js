export const violence = () => {
  const container = document.createElement("div");
  container.classList.add(
    "min-h-screen",
    "flex",
    "flex-col",
    "bg-base",
    "content-center",
    "p-5"
  );

  const titulo = document.createElement("h1");
  titulo.classList.add(
    "mb-5",
    "text-5xl",
    "font-bold",
    "text-center",
    "font-serif",
    "w-3/5",
    "ml-72"
  );
  titulo.textContent = "¿Como hablar de la violencia de genero?";

  const img = document.createElement("img");
  img.src =
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600"; // Use the URL of the image
  img.classList.add("max-w-max", "h-96", "rounded-lg", "shadow-2xl", "ml-96");
  const containerinfo = document.createElement("div");
  containerinfo.classList.add(
    "p-12",
    "flex",
    "justify-center",
    "gap-4",
    "flex-col",
    "w-3/5",
    "ml-72"
  );
  const parrafo1 = document.createElement("p");
  parrafo1.classList.add("p-4");
  parrafo1.textContent =
    "La violencia de género es un tema que constantemente se escucha, pero que poco se comprende; más allá de las interpretaciones, como comunidad educativa es muy importante tratarlo abiertamente y dimensionar su importancia con la finalidad de comprenderlo y  proponer acciones que lleven a la convivencia sana y constructiva entre todas las personas que conviven en la sociedad.En nuestras relaciones personales hemos normalizado la violencia, debemos observar nuestra conducta y la manera en que las dinámicas de nuestras relaciones pueden ser parte de estas violencias que en ocasiones ni siquiera son percibidas";
  const parrafo2 = document.createElement("p");
  parrafo2.classList.add("p-4");
  parrafo2.textContent =
    "Generalmente, estos actos de violencia imperceptibles parecen parte de una relación cotidiana, al tiempo nos alejan de lo importante y nos encierran en una dinámica carente de respeto, tolerancia y libertad. Se convierten en relaciones en el que se olvidan los elementos esenciales de la dignidad y desaparecen las muestras de cariño y amor que deben guiar toda relación humana. ";

  containerinfo.appendChild(parrafo1);
  containerinfo.appendChild(parrafo2);

  container.appendChild(titulo);
  container.appendChild(img);
  container.appendChild(containerinfo);
  return container;
};
