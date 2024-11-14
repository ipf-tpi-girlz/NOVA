const BASEURL = "http://localhost:4000";

export const profileProf = async () => {
  try {
    const response = await fetch(`${BASEURL}/auth/profesionales`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al mostrar los perfiles");
    }
    return response.json();
  } catch (error) {
    console.error("Error en la actualización del perfil:", error);
    throw error;
  }
};

// auth.js
export const profileProfID = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/auth/profile/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al mostrar los perfiles");
    }
    return response.json();
  } catch (error) {
    console.error("Error en la actualización del perfil:", error);
    throw error;
  }
};

// Función para actualizar el perfil
export const updateProfile = async (formData) => {
  try {
    const response = await fetch(`${BASEURL}/auth/update`, {
      method: "POST",
      // No pongas el encabezado "Content-Type"
      body: formData,
      credentials: "include",
    });

    // Verifica si la respuesta es ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el perfil");
    }

    return response; // Devuelve la respuesta completa
  } catch (error) {
    console.error("Error en la actualización del perfil:", error);
    throw error;
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

export const updatePassword = async (data) => {
  try {
    const response = await fetch(`${BASEURL}/auth/change-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error en la respuesta del servidor"
      );
    }

    return await response.json(); // Retorna el JSON aquí
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw error; // Lanza el error para manejarlo en el cliente
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
      credentials: "include",
    });

    const data = await response.json(); // Cambiado a json()

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en login:", error.message);
    return { success: false, error: error.message };
  }
};

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASEURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error en la solicitud al servidor");
    }

    return result;
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
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al cerrar sesión");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en logout:", error.message);
  }
};

export const checkSession = async () => {
  try {
    const response = await fetch(`${BASEURL}/users/session`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.user ? true : false;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al verificar la sesión:", error);
    return false;
  }
};
