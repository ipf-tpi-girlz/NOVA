export const navbar = () => {
  const navbarContainer = document.createElement("header");
  navbarContainer.classList.add("bg-red-200", "text-white");
  const title = document.createElement("h1");
  title.textContent = "soy un nav ";
  navbarContainer.appendChild(title);
  return navbarContainer;
};
