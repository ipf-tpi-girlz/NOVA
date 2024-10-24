export const menu = () => {
  const menuConteiner = document.createElement("div");

  const ul = document.createElement("ul");
  ul.className = "menu bg-base-200 rounded-box w-56";

  const items = ["ultimos Articulos", "Ultimos post", "Crear un Grupo"];

  items.forEach((itemText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = itemText;

    li.appendChild(a);
    ul.appendChild(li);

    menuConteiner.appendChild(ul);
  });

  return menuConteiner;
};
