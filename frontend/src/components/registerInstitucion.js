import "../style.css";
import Swal from 'sweetalert2';

export const formInstitucion = () => {
 const $main = document.createElement("div");
 $main.classList.add("flex", "justify-center", "items-center", "h-screen", "bg-gray-100");

 form.innerHTML =` <div class="container mx-auto mt-10 p-5">
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                <h2 class="text-2xl font-semibold mb-6 text-center">Registro de Institución</h2>
                <form id="registroForm">
                    <!-- Nombre de la Asociación -->
                    <div class="mb-4">
                        <label for="nombreAsociacion" class="block text-gray-700">Nombre de la Asociación:</label>
                        <input type="text" id="nombreAsociacion" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese el nombre de la institución" required>
                    </div>
    
                    <!-- Email -->
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700">Correo Electrónico:</label>
                        <input type="email" id="email" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese el correo electrónico de la institución" required>
                    </div>
    
                    <!-- Dirección -->
                    <div class="mb-4">
                        <label for="direccion" class="block text-gray-700">Dirección:</label>
                        <input type="text" id="direccion" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese la dirección de la institución" required>
                    </div>
    
                    <!-- Teléfono de Contacto -->
                    <div class="mb-4">
                        <label for="telefono" class="block text-gray-700">Teléfono de Contacto:</label>
                        <input type="tel" id="telefono" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese el teléfono de contacto" required>
                    </div>
    
                    <!-- CUIT -->
                    <div class="mb-4">
                        <label for="cuit" class="block text-gray-700">CUIT:</label>
                        <input type="text" id="cuit" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese el CUIT de la institución" required>
                    </div>
    
                    <!-- Razón Social -->
                    <div class="mb-4">
                        <label for="razonSocial" class="block text-gray-700">Razón Social:</label>
                        <input type="text" id="razonSocial" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese la razón social de la institución" required>
                    </div>
    
                    <!-- Representante Legal -->
                    <div class="mb-4">
                        <label for="representante" class="block text-gray-700">Representante Legal:</label>
                        <input type="text" id="representante" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese el nombre del representante legal" required>
                    </div>
    
                    <!-- Departamento -->
                    <div class="mb-4">
                        <label for="departamento" class="block text-gray-700">Departamento:</label>
                        <select id="departamento" class="mt-2 p-2 w-full border rounded-md" required>
                            <option value="">Seleccione su departamento</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Laishi">Laishí</option>
                            <option value="Pilcomayo">Pilcomayo</option>
                            <option value="Pilagás">Pilagás</option>
                            <option value="Pirané">Pirané</option>
                            <option value="Ramón Lista">Ramón Lista</option>
                            <option value="Matacos">Matacos</option>
                            <option value="Bermejo">Bermejo</option>
                        </select>
                    </div>
    
                    <!-- Localidad -->
                    <div class="mb-4">
                        <label for="localidad" class="block text-gray-700">Localidad:</label>
                        <input type="text" id="localidad" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese la localidad de la institución" required>
                    </div>
    
                    <!-- Modalidad de Atención -->
                    <div class="mb-4">
                        <label for="modalidad" class="block text-gray-700">Modalidad de Atención:</label>
                        <select id="modalidad" class="mt-2 p-2 w-full border rounded-md" required>
                            <option value="">Seleccione la modalidad de atención</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                            <option value="Ambas">Ambas</option>
                        </select>
                    </div>
    
                    <!-- Horario de Atención -->
                    <div class="mb-4">
                        <label for="horario" class="block text-gray-700">Horario de Atención:</label>
                        <input type="text" id="horario" class="mt-2 p-2 w-full border rounded-md" placeholder="Ej. Lunes a Viernes de 9:00 a 17:00" required>
                    </div>
    
                    <!-- Servicios que ofrece -->
                    <div class="mb-4">
                        <label for="servicios" class="block text-gray-700">Servicios que ofrece:</label>
                        <textarea id="servicios" class="mt-2 p-2 w-full border rounded-md" placeholder="Describa los servicios que ofrece la institución" rows="3" required></textarea>
                    </div>
    
                    <!-- Página Web (Opcional) -->
                    <div class="mb-4">
                        <label for="paginaWeb" class="block text-gray-700">Página Web (Opcional):</label>
                        <input type="url" id="paginaWeb" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese la URL de la página web">
                    </div>
    
                    <!-- Contraseña -->
                    <div class="mb-4">
                        <label for="password" class="block text-gray-700">Contraseña:</label>
                        <input type="password" id="password" class="mt-2 p-2 w-full border rounded-md" placeholder="Ingrese una contraseña" required>
                    </div>
    
                    <!-- Repetir Contraseña -->
                    <div class="mb-6">
                        <label for="confirmPassword" class="block text-gray-700">Repetir Contraseña:</label>
                        <input type="password" id="confirmPassword" class="mt-2 p-2 w-full border rounded-md" placeholder="Repita su contraseña" required>
                    </div>
    
                    <!-- Botón de envío -->
                    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Registrarse</button>
                    `;

                    form.addEventListener("submit", async (event) => {
                        event.preventDefault();
                        const nombreAsociacion = document.getElementById('nombreAsociacion').value;
                        const email = document.getElementById('email').value;
                        const direccion = document.getElementById('direccion').value;
                        const telefono = document.getElementById('telefono').value;
                        const cuit = document.getElementById('cuit').value;
                        const razonSocial = document.getElementById('razonSocial').value;
                        const representante = document.getElementById('representante').value;
                        const departamento = document.getElementById('departamento').value;
                        const localidad = document.getElementById('localidad').value;
                        const modalidad = document.getElementById('modalidad').value;
                        const horario = document.getElementById('horario').value;
                        const servicios = document.getElementById('servicios').value;
                        const paginaWeb = document.getElementById('paginaWeb').value;
                        const password = document.getElementById('password').value;
                        const confirmPassword = document.getElementById('confirmPassword').value;
                        
                        // Validar contraseñas
                        if (password!== confirmPassword) {
                            alert('Las contraseñas no coinciden');
                            return;
                            
                        }
                        
                        // Enviar formulario a la API
                        try{
                        const response = await fetch('https://localhost:4000/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                nombreAsociacion,
                                email,
                                direccion,
                                telefono,
                                cuit,
                                razonSocial,
                                representante,
                                departamento,
                                localidad,
                                modalidad,
                                horario,
                                servicios,
                                paginaWeb,
                                password
                            })
                        });
                        
                        const result = await response.json();
                        await Swal.fire({
                            title: "Registro Exitoso",
                            text: result.message || "Tu cuenta ha sido creada con éxito.",
                            icon: "success",
                            confirmButtonText: "OK",
                          });

                          window.location.href = "http://localhost:5173/login";
                        } catch{
                            Swal.fire({
                                title: "Error",
                                text: "Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.",
                                icon: "error",
                                confirmButtonText: "OK",
                              });
                        }
                        
                        $main.appendChild(form);
                        return $main;
                    })

}


