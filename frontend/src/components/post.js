
export const  createHeroSection= () => {
    const hero = document.createElement("div");
    hero.classList.add("hero", "bg-base-200", "min-h-screen", "flex-row");

    const herotitle = document.createElement("title")
    herotitle.textContent = "Foro general"
   
    // Crear el div de hero-content
    const heroContent = document.createElement("div");
    heroContent.classList.add( "text-center");
  
    const form = document.createElement("div");
  form.classList.add(
    "flex-col",
    "flex",
    "items-center",
    "border",
    "mb-2",
    "w-[300px]",
    "bg-white",
    "rounded-lg",
    "p-5"
  );
    
    const titleform= document.createElement("title");
    titleform.classList.add("fond-bold")
    titleform.textContent = "¿Quieres hacer un post?"
  
    const titlepost = document.createElement("input");
    titlepost.classList.add("p-2", "border", "mb-2");
    titlepost.placeholder = "Título";

  
    const input = document.createElement("input");
    input.classList.add("p-2", "border", "mb-2");
    input.placeholder = "Descripcion";
  
    const btn = document.createElement("button");
    btn.classList.add(
      "bg-pink-500",
      "text-white",
      "p-2",
      "rounded",
      "hover:bg-pink-800"
    );
    btn.textContent = "Crear Post";
    btn.type = "submit";
    form.appendChild(titleform);
  form.appendChild(titlepost);
  form.appendChild(input);
  form.appendChild(btn);


      const postearFore = async () => {
        try {
          const response = await fetch("http://localhost:4000/foro/create")
          method: "POST"
          credentials: "include"
          if(!response.ok){
            throw new Error(`HTTT ERROR ! Status: ${response.status}`)
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("ERROR PA", error)
          throw error
        };

 

  }
  // Crear el div max-w-md
  // const maxWmd = document.createElement("div");
  // maxWmd.classList.add(
  //   "max-w-md",
  //   "border",
  //   "mb-2",
  //   "w-[300px]",
  //   "bg-white",
  //   "rounded-lg",
  //   "p-5"
  // );

//   // Tiempo de publicación
//   const time = document.createElement("div");
//   time.classList.add("publish-time", "py-2");
//   time.textContent = "hace 2 horas";

//   // Crear el h1 para el título
//   const title = document.createElement("h1");
//   title.classList.add("text-5xl", "font-bold");
//   title.textContent = "Title";

//   // Crear el párrafo para la descripción
//   const paragraph = document.createElement("p");
//   paragraph.classList.add("py-6");
//   paragraph.textContent = "Description";

//   // Crear el botón de 'Get Started'
//   const button = document.createElement("button");
//   button.classList.add("btn", "btn-primary");
//   button.textContent = "Ver más";

//   heroContent.appendChild(herotitle);
//   // Añadir elementos a maxWmd
//   maxWmd.appendChild(title);
//   maxWmd.appendChild(paragraph);
//   maxWmd.appendChild(time);
//   maxWmd.appendChild(button);

  heroContent.appendChild(form);
  // Añadir maxWmd a hero-content
//   heroContent.appendChild(maxWmd);
  heroContent.appendChild(herotitle);

  // Añadir hero-content a hero
  hero.appendChild(heroContent);

  return hero;
  }