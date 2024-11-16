export function ForumCard(id, img, nombre, desc) {
  const card = document.createElement("div");
  card.id = id;
  card.className = "card bg-base-100 image-full lg:w-72 w-72 shadow-xl ";
  const cardFigure = document.createElement("figure");
  cardFigure.className = "h-full";

  // Imagen de la tarjeta
  const cardImg = document.createElement("img");
  cardImg.src = img;

  cardFigure.appendChild(cardImg);

  // Contenido de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.textContent = nombre;

  const cardDesc = document.createElement("p");
  cardDesc.textContent = desc;

  // Botón de la tarjeta
  const cardAction = document.createElement("div");
  cardAction.className = "card-actions justify-end";

  // Crear el botón "Unirse a foro"
  const cardBtn = document.createElement("button");
  cardBtn.className = "btn btn-primary";
  cardBtn.type = "submit";
  cardBtn.textContent = "Ver más";

  // Agregar el evento de clic al botón
  cardBtn.addEventListener("click", async () => {
    sessionStorage.setItem("forumId", id);
    window.location.href = "/forum";
  });


  cardAction.appendChild(cardBtn);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardAction);

  card.appendChild(cardFigure);
  card.appendChild(cardBody);

  return card;
}
