const BASEURL = "http://localhost:4000"; // Cambia esto según sea necesario

export const updateProfile = async (userData) => {
  try {
    const formData = new FormData();
    if (userData.img) {
      formData.append("img", userData.img);
    }
    if (userData.description) {
      formData.append("description", userData.description);
    }

    // Cambia la URL y el método a PUT
    const response = await fetch(`${BASEURL}/auth/update`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el perfil");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error en la actualización del perfil:", error);
    throw error;
  }
};
