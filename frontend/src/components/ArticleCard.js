export function ArticleCard(img, title, desc) {
  const articleCard = document.createElement("div");
  articleCard.className =
    "card card-compact bg-base-200 lg:w-72 md:w-60 shadow ";

  const aricleFigure = document.createElement("figure");
  aricleFigure.className = "h-1/2";

  const articleImg = document.createElement("img");
  articleImg.src = img;

  const articleBody = document.createElement("div");
  articleBody.className = "card-body";

  const articleTitle = document.createElement("h2");
  articleTitle.className = "card-title";
  articleTitle.textContent = title;

  const articleDesc = document.createElement("p");
  articleDesc.textContent = desc;

  const articleActions = document.createElement("div");
  articleActions.className = "card-actions justify-end";

  const articleBtn = document.createElement("button");
  articleBtn.className = "btn btn-primary";
  articleBtn.textContent = "Leer Articulo";

  aricleFigure.appendChild(articleImg);
  articleActions.appendChild(articleBtn);
  articleBody.appendChild(articleTitle);
  articleBody.appendChild(articleDesc);
  articleBody.appendChild(articleActions);
  articleCard.appendChild(aricleFigure);
  articleCard.appendChild(articleBody);

  return articleCard;
}
