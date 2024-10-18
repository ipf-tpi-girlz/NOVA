export function StoriesCard(title, desc) {
  const card = document.createElement("div");
  card.className =
    "card bg-base-200 shadow-xl opacity-0 transform transition-opacity duration-1000 ease-in-out";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body !text-center";

  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.textContent = title;

  const cardDesc = document.createElement("p");
  cardDesc.textContent = desc;

  const cardActions = document.createElement("div");
  cardActions.className = "card-actions justify-end";

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardActions);
  card.appendChild(cardBody);

  requestAnimationFrame(() => {
    card.classList.remove("opacity-0");
    card.classList.add("opacity-100");
  });

  return card;
}
