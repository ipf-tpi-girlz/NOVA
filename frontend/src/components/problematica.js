export const aboutUs = () => {
    const containerAboutUs = document.createElement("div");
    containerAboutUs.classList.add("hero-content", "flex-col", "lg:flex-row", "p-14");
    const containerA = document.createElement("div");
    containerA.classList.add("flex-col", "self-center", "lg:self-start", "mr-12");
    const subbtitulo = document.createElement("h6");
    subbtitulo.textContent = "Nuestra Solución";
    const titleAbout = document.createElement("h1");
    titleAbout.classList.add("font-bold");
    titleAbout.textContent =
      "Estamos utilizando la tecnología para hacer que la curación impulsada por la comunidad sea accesible para todos los sobrevivientes.";
const containerB = document.createElement("div")
containerB.classList.add("flex", "gap-14", "p-8")

const containerB1 = document.createElement("div")
containerB1.classList.add("flex", "flex-col", "gap-2")
const seccion1 = document.createElement("div")
seccion1.textContent = "Providing a safe harbor for survivors to share experiences"
const seccion2 = document.createElement("div")
seccion2.textContent = "Providing a safe harbor for survivors to share experiences"

const containerB2 = document.createElement("div")
containerB2.classList.add("flex", "flex-col", "gap-2")
const seccion3 = document.createElement("div")
seccion3.textContent = "Providing a safe harbor for survivors to share experiences"
const seccion4 = document.createElement("div")
seccion4.textContent = "Providing a safe harbor for survivors to share experiences"
  
containerA.appendChild(subbtitulo);
containerA.appendChild(titleAbout);
   
    containerB1.appendChild(seccion1)
    containerB1.appendChild(seccion2)
    containerB2.appendChild(seccion3)
    containerB2.appendChild(seccion4)

    containerB.appendChild(containerB1)
    containerB.appendChild(containerB2)
    containerAboutUs.appendChild(containerA);
    containerAboutUs.appendChild(containerB);
    return containerAboutUs;
}