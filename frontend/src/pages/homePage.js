

export const homePage = () => {
  const containerHome = document.createElement("div");
  containerHome.classList.add("min-h-screen","bg-base", "flex-grow");
 
  const titulo = document.createElement("h1");
  titulo.innerText = "NOVA";
  titulo.classList.add("text-5xl", "font-bold", "text-center", "font-serif", "p-4", "bg-base-200")
  const subtitulo =document.createElement("h4")
  subtitulo.innerText = "Novas blog";
  subtitulo.classList.add("font-serif", "text-center", "bg-base-200")
  
  const informacion = document.createElement("div");
   informacion.classList.add("hero", "bg-base", "min-h-screen", "p-8")

   const containerinf = document.createElement("div")
   containerinf.classList.add("hero-content", "flex-col", "lg:flex-row")
const container2 = document.createElement("div")
container2.classList.add("flex-col")
const container3 = document.createElement("div")
container3.classList.add("flex-col")

   const img = document.createElement("img");
img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBalzAMrAXTICikBoi3APHXooj-zJuzQ9Tpw&s"; // Use the URL of the image
img.classList.add("max-w-max", "h-96", "rounded-lg", "shadow-2xl")
img.setAttribute("href", "#")
  const tituloinf = document.createElement("h1")
  tituloinf.classList.add("text-2xl", "font-bold")
  tituloinf.textContent = "¿Como hablar de la violencia de genero?"
  tituloinf.setAttribute("href", "#")
  const parrafo = document.createElement("p")
  parrafo.classList.add("py-6")
  parrafo.textContent = "“La violencia de género no va sólo en una modalidad puede normalizarse tanto que no nos damos cuenta que la estamos padeciendo, y es mucho más complicado en un noviazgo; nunca es tarde para romper ese círculo de agresión”"
  containerHome.appendChild(titulo);
  containerHome.appendChild(subtitulo)
container2.appendChild(img);
container3.appendChild(tituloinf)
container3.appendChild(parrafo)
containerinf.appendChild(container2)
containerinf.appendChild(container3)
informacion.appendChild(containerinf)
containerHome.appendChild(informacion)


 
  return containerHome;
}

