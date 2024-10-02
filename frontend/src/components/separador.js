
export const separador = () => {
    const containerseparador = document.createElement("div");
    containerseparador.classList.add("p-4", "text-center");
   
    const titulosep = document.createElement("h1")
    titulosep.classList.add("text-1xl", "font-bold", "font-serif")
    titulosep.textContent = "You have the power to change your story."

    const parrafo = document.createElement("p")
    parrafo.classList.add("py-4","font-serif")
    parrafo.textContent = "— The Pursuit of Happyness (2006)"

 
  containerseparador.appendChild(titulosep);
  containerseparador.appendChild(parrafo)
  
  
   
    return containerseparador;
  }
  