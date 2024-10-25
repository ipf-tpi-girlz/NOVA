document.addEventListener("DOMContentLoaded", function () {
  // Crear el contenedor principal
  const body = document.body;

  // Header
  const header = document.createElement("header");
  header.style.background = "linear-gradient(135deg, #D00000, #DC2F02)";
  header.style.color = "white";
  header.style.padding = "3rem 0";
  header.style.marginBottom = "2rem";
  header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
  header.style.position = "relative";
  header.style.overflow = "hidden";

  const headerBefore = document.createElement("div");
  headerBefore.style.position = "absolute";
  headerBefore.style.top = "0";
  headerBefore.style.left = "0";
  headerBefore.style.right = "0";
  headerBefore.style.bottom = "0";
  headerBefore.style.background = `
      linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`;
  headerBefore.style.backgroundSize = "60px 60px";
  headerBefore.style.opacity = "0.1";
  header.appendChild(headerBefore);

  const containerHeader = document.createElement("div");
  containerHeader.classList.add("container");

  const h1 = document.createElement("h1");
  h1.innerText = "Violencia Física: Identificación, Prevención e Impacto";
  h1.style.fontSize = "2.5rem";
  h1.style.textAlign = "center";
  h1.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
  h1.style.maxWidth = "800px";
  h1.style.margin = "0 auto";
  h1.style.position = "relative";
  containerHeader.appendChild(h1);
  header.appendChild(containerHeader);

  body.appendChild(header);

  // Main content
  const main = document.createElement("main");
  main.classList.add("container");

  // Sección ¿Qué es la Violencia Física?
  const sectionViolencia = createSection(
    "¿Qué es la Violencia Física?",
    "La violencia física es cualquier acto que implique el uso de la fuerza contra otra persona con el propósito de causar daño. Está contemplada en la Ley N° 26.485 de Argentina como un componente clave de la violencia de género.",
    [
      "Golpes y agresiones directas",
      "Empujones y forcejeos",
      "Agresiones con objetos",
      "Privación de libertad",
    ],
    "Manifestaciones"
  );
  main.appendChild(sectionViolencia);

  // Sección Señales de Alerta
  const sectionAlertas = createSection("Señales de Alerta", "", [
    "Lesiones Visibles",
    "Cambios de Comportamiento",
    "Justificaciones Frecuentes",
    "Aislamiento Social",
  ]);
  main.appendChild(sectionAlertas);

  // Sección Recursos de Ayuda Inmediata
  const emergencyBox = document.createElement("div");
  emergencyBox.classList.add("emergency-box");
  emergencyBox.style.background = "linear-gradient(135deg, #DC2F02, #D00000)";
  emergencyBox.style.color = "white";
  emergencyBox.style.padding = "2rem";
  emergencyBox.style.margin = "2rem 0";
  emergencyBox.style.borderRadius = "15px";
  emergencyBox.style.position = "relative";
  emergencyBox.style.overflow = "hidden";
  emergencyBox.style.boxShadow = "0 15px 30px rgba(208, 0, 0, 0.15)";

  const h3Emergency = document.createElement("h3");
  h3Emergency.innerText = "Recursos de Ayuda Inmediata";
  h3Emergency.style.color = "white";
  h3Emergency.style.marginTop = "0";
  h3Emergency.style.fontSize = "1.6rem";
  h3Emergency.style.marginBottom = "1.5rem";
  emergencyBox.appendChild(h3Emergency);

  const emergencyList = [
    { text: "Línea 144: Asistencia gratuita y confidencial las 24 horas" },
    { text: "Centro de Atención Integral: Apoyo psicológico, legal y social" },
    { text: "Comisarías de la Mujer: Entorno seguro para denuncias" },
  ];

  emergencyList.forEach((item) => {
    const p = document.createElement("p");
    p.style.color = "white";
    p.style.marginBottom = "1rem";
    p.style.fontSize = "1.1rem";
    p.innerText = item.text;
    emergencyBox.appendChild(p);
  });

  main.appendChild(emergencyBox);

  // Sección Estadísticas en Formosa
  const sectionEstadisticas = createSection(
    "Estadísticas en Formosa",
    "",
    [
      "40% de las mujeres han experimentado violencia física en Argentina",
      "Aumento significativo en denuncias durante la pandemia",
      "Incremento sostenido en registros del RUCVM",
    ],
    ""
  );
  main.appendChild(sectionEstadisticas);

  // Sección Prevención e Impacto
  const sectionPrevencion = createSection(
    "Prevención",
    "",
    [
      "Educación sobre violencia de género",
      "Fomento de la igualdad",
      "Campañas de sensibilización",
      "Formación profesional",
    ],
    ""
  );
  main.appendChild(sectionPrevencion);

  const sectionImpacto = createSection(
    "Impacto",
    "",
    [
      "Trastornos de salud mental",
      "Lesiones físicas permanentes",
      "Dificultades en relaciones",
      "Aislamiento social",
    ],
    "Consecuencias"
  );
  main.appendChild(sectionImpacto);

  body.appendChild(main);

  // Función para crear secciones
  function createSection(title, content, listItems = [], subtitle = "") {
    const section = document.createElement("section");
    section.classList.add("content-section");

    const h2 = document.createElement("h2");
    h2.innerText = title;
    section.appendChild(h2);

    if (content) {
      const p = document.createElement("p");
      p.innerText = content;
      section.appendChild(p);
    }

    if (subtitle) {
      const h3 = document.createElement("h3");
      h3.innerText = subtitle;
      section.appendChild(h3);
    }

    if (listItems.length) {
      const ul = document.createElement("ul");
      listItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = item;
        ul.appendChild(li);
      });
      section.appendChild(ul);
    }

    return section;
  }
});
