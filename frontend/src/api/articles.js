const BASEURL = 'http://localhost:4000/articles';


export const fetchArticlesByUser = async () => {
    try {
        const response = await fetch(`${BASEURL}/user`, {
            method: "GET",
            credentials: "include",
        });

        // Verificar si la respuesta es OK
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener el artículo");
        }

        // Intentar parsear la respuesta como JSON
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error al obtener los artículos del usuario:", error);
        // Si ocurre un error, podemos retornar un valor específico para manejarlo en el código que llama a esta función.
        return { error: error.message || "Error desconocido" };
    }
}

export const fetchArticles = async () => {
    try {
        const response = await fetch(`${BASEURL}/`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener los artículos");
        }
        return response.json();
    } catch (error) {
        console.error("Error al obtener los artículos:", error);
    }
}
