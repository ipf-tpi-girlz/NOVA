import "../style.css";
// import Swal from 'sweetalert2';

const $formRegister = document.getElementById("form-register")

$formRegister.addEventListener("submit", (e) => {
    e.preventDefault();


    const formData = new FormData(e);

    const datos = Object.fromEntries(formData.entries());

    fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
    })
    .then((respuesta)  => {
        console.log('res',respuesta);
        return respuesta.json()
    })
    .then((datos) => {
        // vas a meter la lógica
        // if
        window.location.href = "/"
    })

})