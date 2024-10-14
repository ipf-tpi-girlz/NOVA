const BASEURL = "http://localhost:4000";


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
