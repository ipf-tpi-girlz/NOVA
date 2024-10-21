import { BASEURL } from "./user";
// Función para obtener todos los foros

export const fetchGetForos = async () => {
  try {
    const response = await fetch(`${BASEURL}/foro/infoGeneral`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los foros:", error);
  }
};

export const fetchGetForosById = async () => {
  try {
    const response = await fetch(`${BASEURL}/foro/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los foros por ID:", error);
  }
};

// Función para crear un nuevo foro
export const fetchCreateForo = async (foroData) => {
  try {
    const response = await fetch(`${BASEURL}/foro/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foroData),
      credentials: "include", // Agregado para incluir credenciales
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el foro:", error);
  }
};

// Función para actualizar un foro existente
export const fetchUpdateForo = async (id, dataForo) => {
  try {
    const response = await fetch(`${BASEURL}/foro/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForo),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar el foro:", error);
  }
};

// Función para eliminar un foro
export const fetchDeleteForo = async (id) => {
  try {
    const response = await fetch(`${BASEURL}/foro/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el foro:", error);
  }
};

export const fetchDeleteAllForos = async () => {
  try {
    const response = await fetch(`${BASEURL}/foro/deleteAll`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar todas las publicaciones:", error);
  }
};
