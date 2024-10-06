import "../style.css";

const $formProf = document.getElementById("formProf");

$formProf.addEventListener("submit", () => {
  e.preventdefault();

  const formData = new FormData(e);

  const datos = Object.FormData(formData.entries());

  datos.rol = "VIctima";

  fetch("http://localhost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((respuesta) => {
      console.log("respuesta", respuesta);
      return respuesta.json();
    })
    .then((datos) => {
      console.log("datos", datos);

      window.location.href = "http://localhost";
    });
});
