// URL base para la API
const BASEURL = "http://localhost:4000";

// Función para actualizar el perfil
export const updateProfile = async ({ img, description }) => {
    try {
        const formData = new FormData();
        if (img) formData.append("img", img); // Agrega la imagen
        if (description) formData.append("description", description); // Agrega la descripción

        const response = await fetch(`${BASEURL}/auth/update`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al actualizar el perfil");
        }

        return await response.json(); // Devuelve la respuesta JSON
    } catch (error) {
        console.error("Error en la actualización del perfil:", error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar
    }
};

// Función para obtener la imagen de perfil
export const getUserProfile = async () => {
    try {
        const response = await fetch(`${BASEURL}/auth/user`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Error al obtener la imagen de perfil"
            );
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error);
        throw error;
    }
};

// Función para eliminar la cuenta
export const deleteAccount = async () => {
    try {
        const response = await fetch(`${BASEURL}/auth/delete`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al eliminar la cuenta");
        }

        return await response.json(); // Devuelve la respuesta JSON
    } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar
    }
};

// Función para iniciar sesión
export const loginUser = async (mail, contrasenia) => {
    try {
        const response = await fetch(`${BASEURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail, contrasenia }),
            credentials: "include", // Necesario para que las cookies se envíen y reciban
        });

        const data = await response.json(); // Cambiado a json()

        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        console.log(data); // Aquí deberías ver { success: true, message: "Inicio de sesión exitoso" }
        return data; // Devuelve el objeto de datos

    } catch (error) {
        console.error("Error en login:", error.message);
        return { success: false, error: error.message }; // Devuelve un objeto con error
    }
};


// Función para registrar un usuario
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASEURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json(); // Parsear el resultado

        if (!response.ok) {
            throw new Error(result.message || 'Error en la solicitud al servidor');
        }

        return result; // Devolver el resultado exitoso (que debería incluir `success: true`)

    } catch (error) {
        console.error("Error en register:", error);
        return { success: false, error: error.message };
    }
};


// Función para cerrar sesión
export const logoutUser = async () => {
    try {
        const response = await fetch(`${BASEURL}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Para que la cookie de sesión sea eliminada
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al cerrar sesión");
        }

        const data = await response.json();
        console.log(data); // "Sesión cerrada exitosamente"
        return data;
    } catch (error) {
        console.error("Error en logout:", error.message);
    }
};
