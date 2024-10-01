import "../style.css";
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de inmediato
    
    // Recopilación de datos
    const nombreAsociacion = document.getElementById("nombreAsociacion").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const cuit = document.getElementById("cuit").value;
    const razonSocial = document.getElementById("razonSocial").value;
    const representante = document.getElementById("representante").value;
    const departamento = document.getElementById("departamento").value;
    const localidad = document.getElementById("localidad").value;
    const modalidad = document.getElementById("modalidad").value;
    const horario = document.getElementById("horario").value;
    const servicios = document.getElementById("servicios").value;
    const paginaWeb = document.getElementById("paginaWeb").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validaciones simples (Ejemplo)
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Si las validaciones son correctas, enviar la información (por ejemplo, mediante una solicitud AJAX o fetch)
    alert("Registro exitoso");
});