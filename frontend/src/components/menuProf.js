export const menu = () => {
  const sidebar = document.createElement("div");
  sidebar.classList.add(
    "bg-gradient-to-b",
    "from-pink-100",
    "to-red-100",
    "text-pink-900",
    "w-64",
    "h-screen",
    "p-6",
    "flex",
    "flex-col",
    "justify-between"
  );

  const titleEl = document.createElement("h2");
  titleEl.classList.add("text-2xl", "font-bold", "mb-4");
  titleEl.textContent = "Menú";
  sidebar.appendChild(titleEl);

  const navEl = document.createElement("nav");
  const ulEl = document.createElement("ul");

  const postsLiEl = document.createElement("li");
  postsLiEl.classList.add(
    "py-3",
    "px-4",
    "rounded-md",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-pink-300",
    "flex",
    "items-center"
  );
  const postsIconEl = document.createElement("i");
  postsIconEl.classList.add(
    "mr-2",
    "text-lg",
    "material-icons",
    "text-pink-600"
  );
  postsIconEl.textContent = "event_note";
  const postsTextEl = document.createElement("span");
  postsTextEl.classList.add("text-pink-600");
  postsTextEl.textContent = "Posts";
  postsLiEl.appendChild(postsIconEl);
  postsLiEl.appendChild(postsTextEl);
  postsLiEl.addEventListener("click", () => handleOptionClick("posts"));

  const articlesLiEl = document.createElement("li");
  articlesLiEl.classList.add(
    "py-3",
    "px-4",
    "rounded-md",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-pink-300",
    "flex",
    "items-center"
  );
  const articlesIconEl = document.createElement("i");
  articlesIconEl.classList.add(
    "mr-2",
    "text-lg",
    "material-icons",
    "text-red-600"
  );
  articlesIconEl.textContent = "article";
  const articlesTextEl = document.createElement("span");
  articlesTextEl.classList.add("text-red-600");
  articlesTextEl.textContent = "Artículos";
  articlesLiEl.appendChild(articlesIconEl);
  articlesLiEl.appendChild(articlesTextEl);
  articlesLiEl.addEventListener("click", () => handleOptionClick("articles"));

  const createGroupBtnEl = document.createElement("button");
  createGroupBtnEl.classList.add(
    "bg-gradient-to-r",
    "from-pink-500",
    "to-red-500",
    "text-white",
    "py-3",
    "px-4",
    "rounded-md",
    "hover:opacity-80",
    "transition-opacity",
    "flex",
    "items-center"
  );
  const createGroupIconEl = document.createElement("i");
  createGroupIconEl.classList.add("mr-2", "text-lg", "material-icons");
  createGroupIconEl.textContent = "group_add";
  const createGroupTextEl = document.createElement("span");
  createGroupTextEl.textContent = "Crear Grupo";
  createGroupBtnEl.appendChild(createGroupIconEl);
  createGroupBtnEl.appendChild(createGroupTextEl);

  ulEl.appendChild(postsLiEl);
  ulEl.appendChild(articlesLiEl);
  navEl.appendChild(ulEl);
  sidebar.appendChild(navEl);
  sidebar.appendChild(createGroupBtnEl);

  let activeOption = "posts";

  function handleOptionClick(option) {
    activeOption = option;
    postsLiEl.classList.toggle("bg-pink-500", activeOption === "posts");
    postsLiEl.classList.toggle("text-white", activeOption === "posts");
    postsIconEl.classList.toggle("text-white", activeOption === "posts");
    postsTextEl.classList.toggle("text-white", activeOption === "posts");
    articlesLiEl.classList.toggle("bg-red-500", activeOption === "articles");
    articlesLiEl.classList.toggle("text-white", activeOption === "articles");
    articlesIconEl.classList.toggle("text-white", activeOption === "articles");
    articlesTextEl.classList.toggle("text-white", activeOption === "articles");
  }

  return sidebar;
};
