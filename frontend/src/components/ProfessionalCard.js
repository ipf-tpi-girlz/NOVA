export function ProfessionalCard(name, desc) {
  const card = document.createElement("div");
  card.className = "card card-compact bg-base-100  bg-cover ";

  // Contenido de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.textContent = name;

  const cardDesc = document.createElement("p");
  cardDesc.textContent = desc;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);

  card.appendChild(cardBody);

  return card;
}
