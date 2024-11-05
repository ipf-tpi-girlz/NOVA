export function ProfessionalPreview(
  id,
  name,
  desc,
  phone,
  email,
  aptitudes,
  acercaDe
) {
  const container = document.createElement("div");
  container.className = "flex flex-col gap-2 p-5  bg-cover h-full ";
  container.id = id;

  const nameProf = document.createElement("h1");
  nameProf.className = "font-bold text-xl font-serif text-start";
  nameProf.textContent = name;

  const descProf = document.createElement("p");

  descProf.textContent = desc;

  const phoneProf = document.createElement("h1");
  phoneProf.textContent = phone;

  const emailProf = document.createElement("h1");
  emailProf.textContent = email;

  const aptitudesProf = document.createElement("ul");
  aptitudes.forEach((aptitud) => {
    const li = document.createElement("li");
    li.textContent = aptitud;
    aptitudesProf.appendChild(li);
  });

  const acercaProf = document.createElement("h1");
  acercaProf.textContent = acercaDe;

  container.appendChild(nameProf);
  container.appendChild(descProf);
  container.appendChild(phoneProf);
  container.appendChild(emailProf);
  container.appendChild(aptitudesProf);
  container.appendChild(acercaProf);

  return container;
}
