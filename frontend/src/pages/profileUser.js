export const ProfileUser = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "gap-4", "p-4");

    const $infoContainer = document.createElement("div");
    $infoContainer.classList.add("card", "bg-base-100", "shadow-xl", "w-fit");

    const $infoContent = document.createElement("div");
    $infoContent.classList.add("card-body");

    const $name = document.createElement("h2");
    $name.classList.add("card-title");
    $name.textContent = "Nombre del Usuario";

    const $email = document.createElement("p");
    $email.innerHTML = "Email:<br>usuario@ejemplo.com";

    const $department = document.createElement("p");
    $department.innerHTML = "Departamento:<br>Ejemplo";

    const $gender = document.createElement("p");
    $gender.innerHTML = "Género:<br>Ejemplo";

    $infoContent.append($name, $email, $department, $gender);
    $infoContainer.appendChild($infoContent);

    const $foroContainer = document.createElement("div");
    $foroContainer.classList.add("flex", "flex-col", "gap-4", "flex-grow");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.classList.add("flex", "justify-center", "gap-4", "mb-4");

    const $forosButton = document.createElement("button");
    $forosButton.classList.add("btn", "btn-primary");
    $forosButton.textContent = "Foros";

    const $subForoButton = document.createElement("button");
    $subForoButton.classList.add("btn", "btn-secondary");
    $subForoButton.textContent = "Comunidades";

    $buttonContainer.append($forosButton, $subForoButton);
    $foroContainer.appendChild($buttonContainer);

    // Crear ejemplos de card foro
    const createForoCard = (title, description) => {
        const $card = document.createElement("div");
        $card.classList.add("card", "bg-base-100", "shadow-xl", "mb-4");

        const $cardBody = document.createElement("div");
        $cardBody.classList.add("card-body");

        const $cardTitle = document.createElement("h2");
        $cardTitle.classList.add("card-title");
        $cardTitle.textContent = title;

        const $cardDescription = document.createElement("p");
        $cardDescription.textContent = description;

        $cardBody.append($cardTitle, $cardDescription);
        $card.appendChild($cardBody);

        return $card;
    };

    const foroExamples = [
        { title: "Foro de Apoyo Emocional", description: "Un espacio para compartir experiencias y brindar apoyo mutuo." },
        { title: "Recursos de Autoayuda", description: "Comparte y descubre herramientas útiles para el crecimiento personal." },
        { title: "Historias de Superación", description: "Inspírate con relatos de personas que han superado situaciones difíciles." }
    ];

    foroExamples.forEach(foro => {
        $foroContainer.appendChild(createForoCard(foro.title, foro.description));
    });

    $container.append($infoContainer, $foroContainer);

    return $container;
}
