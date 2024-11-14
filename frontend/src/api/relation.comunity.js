const BASEURL = "http://localhost:4000/join-community";

export const joinComunity = async (id) => {
    const response = await fetch(`${BASEURL}/join/${id}`, {
        method: "POST",
        credentials: "include",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Se produjo un error al unirse a la comunidad");
    }
    return response.json()
}

export const deleteRelationC = async (id) => {
    const response = await fetch(`${BASEURL}/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al salir de la comunidad");
    }
    return response.json()
}