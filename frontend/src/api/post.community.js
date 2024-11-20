const BASEURL = "http://localhost:4000/comunity-post";

export const createPost = async (id, data) => {
    const response = await fetch(`${BASEURL}/create/${id}`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el post");
    }
    return response.json()
}