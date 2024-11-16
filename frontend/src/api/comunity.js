const BASEURL = 'http://localhost:4000';

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
}

export const fetchComunity = async (id) => {
    try {
        const response = await fetch(`${BASEURL}/comunity/general/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener la comunidad");
        }
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

}
