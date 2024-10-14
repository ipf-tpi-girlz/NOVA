export function homePost() {
  // Create the main card container div
  const card = document.createElement("div");
  card.classList.add("card", "bg-base-100", "w-96", "shadow-xl");

  // Create the figure element
  const figure = document.createElement("figure");

  // Create the img element
  const img = document.createElement("img");
  img.src =
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";
  img.alt = "Shoes";

  // Append img to figure
  figure.appendChild(img);

  // Create the card-body div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create the h2 element for the card title
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = "Shoes!";

  // Create the paragraph element
  const description = document.createElement("p");
  description.textContent = "If a dog chews shoes whose shoes does he choose?";

  // Create the card-actions div
  const cardActions = document.createElement("div");
  cardActions.classList.add("card-actions", "justify-end");

  // Create the button element
  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Buy Now";

  // Append button to card-actions
  cardActions.appendChild(button);

  // Append elements to card-body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(description);
  cardBody.appendChild(cardActions);

  // Append figure and card-body to card
  card.appendChild(figure);
  card.appendChild(cardBody);

  return card;
}
