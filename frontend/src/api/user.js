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
export const getUserProfilePicture = async () => {
  try {
    const response = await fetch(`${BASEURL}/auth/profile/picture`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener la imagen de perfil"
      );
    }

    return await response.json(); // Devuelve la respuesta JSON
  } catch (error) {
    console.error("Error al obtener la imagen de perfil:", error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASEURL}/users/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cerrar la sesión");
    }

    return await response.json(); // Devuelve la respuesta JSON
  } catch (error) {
    console.error("Error al cerrar la sesión:", error);
    throw error; // Lanza el error para que pueda ser manejado en otro lugar
  }
};
