import { CategoriaForo } from '../models/categoriaForo.js';
import { Subforo } from '../models/subForo.js';
import { Publicacion } from '../models/publicacion.js';
import { Usuario } from '../models/users.js';
import { Comentario } from '../models/comentario.js';
import { Respuesta } from '../models/respuesta.js';

export const obtenerInfoGeneralForo = async (req, res) => {
    try {
        // Obtener todas las categorías de foros con sus subforos
        const categorias = await CategoriaForo.findAll({
            include: [
                {
                    model: Subforo,
                    as: 'subforos',
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
                }
            ]
        });

        // Enviar la información de categorías, subforos, publicaciones, comentarios y respuestas
        res.status(200).json({
            message: "Información general del foro obtenida con éxito",
            data: categorias
        });
    } catch (error) {
        console.log("----------------------------------------------------------------------------")
        console.error(error);
        console.log("----------------------------------------------------------------------------")
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
    const { cate_name } = req.body
    console.log("--------------------------------------------------------------")
    console.log(req.body)
    console.log("--------------------------------------------------------------")
    try {
        const exist = await CategoriaForo.findOne({ where: { nombre: cate_name } })
        if (!exist) {
            return res.status(400).json({ error: 'La categoría que desea eliminar no existe en nuestro sistema' })
        }
        //!Eliminar categoria
        await CategoriaForo.destroy({ where: { nombre: cate_name } })
        return res.status(200).json({ message: 'Categoría eliminada exitosamente' })
    } catch (error) {
        res.status(500).json({ error: 'Se produjo un error en el sistema' })
        console.log('--------------------------------------------------------------')
        console.log(error)
        console.log('--------------------------------------------------------------')
    }
}

