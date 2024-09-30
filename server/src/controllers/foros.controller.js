import { CategoriaForo } from '../models/categoriaForo.js';
import { Subforo } from '../models/subForo.js';
import { Publicacion } from '../models/publicacion.js';
import { Usuario } from '../models/users.js';
import { Comentario } from '../models/comentario.js';
import { Respuesta } from '../models/respuesta.js';

// Función para obtener la información del foro con sus subforos, publicaciones, comentarios y respuestas
export const obtenerInfoGeneralForo = async (req, res) => {
    try {
        // Obtener todas las categorías (Foros principales)
        const categorias = await CategoriaForo.findAll({
            include: [
                {
                    model: Subforo,  // Relacionar los subforos con las categorías
                    as: 'sub_foros',  // Alias de la relación
                    include: [
                        {
                            model: Publicacion,  // Relacionar las publicaciones con los subforos
                            as: 'publicaciones',  // Alias de la relación
                            include: [
                                {
                                    model: Usuario,  // Incluir el usuario que hizo la publicación
                                    as: 'usuario',   // Alias de la relación
                                    attributes: ['id', 'nombre', 'mail'],  // Seleccionar campos específicos del usuario
                                },
                                {
                                    model: Comentario,  // Incluir los comentarios relacionados con la publicación
                                    as: 'comentarios',  // Alias de la relación
                                    include: [
                                        {
                                            model: Usuario,  // Incluir el usuario que hizo el comentario
                                            as: 'usuario',   // Alias de la relación
                                            attributes: ['id', 'nombre', 'mail'],  // Seleccionar campos específicos del usuario
                                        },
                                        {
                                            model: Respuesta,  // Incluir las respuestas relacionadas con el comentario
                                            as: 'respuestas',  // Alias de la relación
                                            include: [
                                                {
                                                    model: Usuario,  // Incluir el usuario que hizo la respuesta
                                                    as: 'usuario',   // Alias de la relación
                                                    attributes: ['id', 'nombre', 'mail'],  // Seleccionar campos específicos del usuario
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Si no hay categorías, retornar un mensaje
        if (!categorias.length) {
            return res.status(404).json({ message: 'No se encontraron foros' });
        }

        // Devolver la estructura completa del foro
        return res.status(200).json({ categorias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del foro' });
    }
};

export const eliminarForo = async (req, res) => {
    const { id } = req.params;
    try {
        const foro = await Subforo.findByPk(id);
        if (!foro) {
            return res.status(404).json({ message: 'Foro no encontrado' });
        }
        await foro.destroy();
        return res.status(200).json({ message: 'Foro eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el foro' });
    }
}

