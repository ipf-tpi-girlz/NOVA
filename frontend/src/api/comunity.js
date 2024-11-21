const BASEURL = "http://localhost:4000";

export const fetchComunities = async () => {
  try {
    const response = await fetch(`${BASEURL}/comunity`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener las comunidades:", error);
  }
};


export const fetchComunity = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/comunity/general/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener la comunidad:", error);
  }
}
export const fetchComunitiesUser = async () => {
  try {
    const response = await fetch(`${BASEURL}/comunity/user`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener las comunidades del usuario:", error);
  }
};

export const fetchUserComunnity = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/join-community/user/communities`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  } catch (error) {
    console.error("Error al obtener la comunidad del usuario:", error);
    return { error: error.message }; // Devuelves el error para manejarlo en el frontend
  }
}

//funcion para eliminar una comunidad

export const fetchDeleteComunity = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/comunity/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la comunidad: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al eliminar la comunidad:", error);
  }
};

export const getComunityById = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/comunity/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error al obtener la comunidad:", error);
  }
};
