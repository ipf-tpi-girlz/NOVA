export const footer = () => {
  const footerContainer = document.createElement("header");
  footerContainer.classList.add("bg-gray-200", "text-white");
  const title = document.createElement("h1");
  title.textContent = "soy un footer ";
  footerContainer.appendChild(title);
  return footerContainer;
};
