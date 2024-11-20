const BASEURL = "http://localhost:4000/coments";

export const createComent = async (id, content) => {
    try {
        const response = await fetch(`${BASEURL}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al crear el comentario");
        }

        return response.json();
    } catch (error) {
        console.error("Error al crear el comentario:", error);
        throw error;
    }
};