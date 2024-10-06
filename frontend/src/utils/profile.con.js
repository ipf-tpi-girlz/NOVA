export const API_URL = "http://localhost:4000";

export const getUserDate = async (req, res) => {
  const response = await fetch(`${API_URL}/auth`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message: error.message || "Error en el registro",
    };
  }
  return response.json();
};

export const deleteUser = async (req, res) => {
  const response = await fetch(`${API_URL}/auth/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message: error.message || "Error al eliminar el usuario",
    };
  }
  return response.json();
};

export const updateUser = async (req, res) => {
  const response = await fetch(`${API_URL}/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(req.body),
  });
  if (!response.ok) {
    const error = await response.json();
    return {
      success: false,
      message: error.message || "Error al actualizar el usuario",
    };
  }
  return response.json();
};
