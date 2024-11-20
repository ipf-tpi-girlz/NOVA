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
