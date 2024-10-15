

export const ProfileUser = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "gap-4", "p-4", "bg-base-", "min-h-screen");

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

    $container.append($infoContainer);

    return $container;
}
