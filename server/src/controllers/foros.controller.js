import { CategoriaForo } from '../models/categoriaForo.js';
import { Subforo } from '../models/subForo.js';
import { Publicacion } from '../models/publicacion.js';
import { Usuario } from '../models/users.js';
import { Comentario } from '../models/comentario.js';
import { Respuesta } from '../models/respuesta.js';

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

        if (!categorias.length) {
            return res.status(404).json({ message: 'No se encontraron foros' });
        }

        return res.status(200).json({ categorias });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del foro' });
    }
};

export const crearForo = async (req, res) => {
    const { cate_name } = req.body
    try {
        const exist = await CategoriaForo.findOne({ where: { nombre: cate_name } })
        if (exist.length > 0) {
            return res.status(400).json({ error: 'La categoría ingresada ya existe en nuestro sistema' })
        }
        await CategoriaForo.create({ nombre: cate_name })
        return res.status(200).json({ message: 'Categoría creada exitosamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' })
    }
}

export const actualizarForo = async (req, res) => {

}


export const eliminarForo = async (req, res) => {

}

