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
