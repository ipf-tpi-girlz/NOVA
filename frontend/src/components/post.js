import Swal from "sweetalert2";

export const createHeroSection = () => {
  const hero = document.createElement("div");
  hero.classList.add(
    "hero",
    "bg-base-200",
    "min-h-screen",
    "flex",
    "flex-col",
    "items-center",
    "p-5"
  );

  const titleSection = document.createElement("h2");
  titleSection.classList.add("text-3xl", "font-bold", "text-center", "mb-5");
  titleSection.textContent = "Sección de Foros";

  const heroContent = document.createElement("div");
  heroContent.classList.add("text-center", "w-full", "max-w-3xl", "mx-auto");

  // Botón para crear foro
  const createPostButton = document.createElement("button");
  createPostButton.classList.add(
    "bg-pink-500",
    "text-white",
    "p-3",
    "rounded",
    "hover:bg-pink-600",
    "transition-colors",
    "duration-300",
    "mb-5"
  );
  createPostButton.textContent = "Crear Foro";

  createPostButton.addEventListener("click", () => {
    Swal.fire({
      title: "Crear Foro",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción" rows="4"></textarea>
      `,
      background: "#f8f9fa",
      backdrop: `
        rgba(0, 0, 0, 0.5)
        url("../assets/fon3.jpg") left top
        no-repeat
      `,
      focusConfirm: false,
      preConfirm: () => {
        const title = document.getElementById("swal-title").value;
        const desc = document.getElementById("swal-desc").value;

        if (!title || !desc) {
          Swal.showValidationMessage(`Por favor, completa todos los campos.`);
          return false;
        }

        return { title, desc };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postData = {
          title: result.value.title,
          desc: result.value.desc,
        };

        try {
          const response = await fetch("http://localhost:4000/foro/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error(`HTTP ERROR! Status: ${response.status}`);
          }

          const data = await response.json();
          Swal.fire({
            icon: "success",
            title: "¡Post creado!",
            text: `Se ha creado el foro: ${data.title}`,
          });

          loadForos();
        } catch (error) {
          console.error("ERROR PA", error);
          Swal.fire({
            icon: "error",
            title: "Error al crear el post",
            text: error.message,
          });
        }
      }
    });
  });

  const forumsContainer = document.createElement("div");
  forumsContainer.classList.add(
    "mt-5",
    "grid",
    "grid-cols-1",
    "gap-4",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "lg:grid-cols-4",
    "lg:grid-cols-5"
  );

  const loadForos = async () => {
    try {
      const response = await fetch("http://localhost:4000/foro/infoGeneral", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR! Status: ${response.status}`);
      }
      const data = await response.json();

      forumsContainer.innerHTML = "";

      data.foros.forEach((foro) => {
        const forumCard = document.createElement("div");
        forumCard.classList.add(
          "bg-white",
          "rounded-lg",
          "p-5",
          "shadow-md",
          "hover:shadow-lg",
          "hover:bg-gray-100",
          "transition-shadow",
          "transition-bg",
          "duration-300"
        );

        const forumTitle = document.createElement("h4");
        forumTitle.classList.add("font-bold", "text-lg");
        forumTitle.textContent = foro.nombre;

        const forumDesc = document.createElement("p");
        forumDesc.classList.add("mt-2");
        forumDesc.textContent = foro.desc;

        forumCard.appendChild(forumTitle);
        forumCard.appendChild(forumDesc);
        forumsContainer.appendChild(forumCard);
      });
    } catch (error) {
      console.error("Error loading forums:", error);
    }
  };

  loadForos();

  heroContent.appendChild(titleSection);
  heroContent.appendChild(createPostButton);
  heroContent.appendChild(forumsContainer);
  hero.appendChild(heroContent);

  return hero;
};
