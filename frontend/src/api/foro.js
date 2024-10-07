// Función para obtener todos los foros
export const fetchGetForos = async () => {
    try {
        const response = await fetch('http://localhost:4000/foro', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Agregado para incluir credenciales
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los foros:", error);
    }
};

// Función para crear un nuevo foro
export const fetchCreateForo = async (foroData) => {
    try {
        const response = await fetch('http://localhost:4000/foro/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foroData),
            credentials: 'include', // Agregado para incluir credenciales
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear el foro:", error);
    }
};

// Función para actualizar un foro existente
export const fetchUpdateForo = async (id, foroData) => {
    try {
        const response = await fetch(`http://localhost:4000/foro/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foroData),
            credentials: 'include', // Agregado para incluir credenciales
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
        const response = await fetch(`http://localhost:4000/foro/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Agregado para incluir credenciales
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar el foro:", error);
    }
};
