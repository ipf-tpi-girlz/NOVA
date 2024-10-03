
import { Usuario } from '../models/users.js'
import { Subforo } from '../models/subForo.js'

export const getSubforos = async (req, res) => {
    try {
        // Obtener todos los subforos con sus publicaciones, comentarios y respuestas
        const subforos = await Subforo.findAll({
            include: [
                {
                    model: Publicacion,
                    as: 'publicaciones',
                    include: [
                        {
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['nombre', 'mail'] // Información básica del usuario
                        },
                        {
                            model: Comentario,
                            as: 'comentarios',
                            include: [
                                {
                                    model: Usuario,
                                    as: 'usuario',
                                    attributes: ['nombre', 'mail'] // Autor del comentario
                                },
                                {
                                    model: Respuesta,
                                    as: 'respuestas',
                                    include: [
                                        {
                                            model: Usuario,
                                            as: 'usuario',
                                            attributes: ['nombre', 'mail'] // Autor de la respuesta
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        // Enviar la información de subforos, publicaciones, comentarios y respuestas
        res.status(200).json({
            message: "Información de subforos obtenida con éxito",
            data: subforos
        });
    } catch (error) {
        console.log("----------------------------------------------------------------------------")
        console.error(error);
        console.log("----------------------------------------------------------------------------")
        res.status(500).json({ error: 'Error al obtener la información de subforos' });
    }
};

export const createSubForo = async (req, res) => {
    const user = req.user;
    const { title, desc, categoria_foro } = req.body;

    try {
        const userExist = await Usuario.findOne({ where: {} });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
        }

        //! Verificar si el usuario es una institución o un profesional (debe tener al menos uno de estos roles)
        if (user.role !== 'institucion' && user.role !== 'profesional') {
            return res.status(400).json({ message: "Solo instituciones o profesionales pueden crear nuevas secciones" });
        }

        const categoria = await CategoriaForo.findOne({ where: { nombre: categoria_foro } });

        if (!categoria) {
            return res.status(404).json({ message: "La categoría ingresada no existe en nuestro sistema" });
        }

        //* Crear el subforo
        await Subforo.create({
            title,
            desc,
            categoria_id: categoria.id,
            moderador_id: id
        });

        res.status(200).json({ message: "Seccion creada exitosamente" });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


