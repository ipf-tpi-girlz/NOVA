
import { CategoriaForo } from '../models/categoriaForo.js'
import { Usuario } from '../models/users.js'
import { Subforo } from '../models/subForo.js'

export const createSubForo = async (req, res) => {
    const { id } = req.params;
    const { title, desc, categoria_foro } = req.body;

    try {
        const user = await Usuario.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
        }

        // Verificar si el usuario es una institución o un profesional (debe tener al menos uno de estos roles)
        if (user.role !== 'institucion' && user.role !== 'profesional') {
            return res.status(400).json({ message: "Solo instituciones o profesionales pueden crear nuevas secciones" });
        }

        const categoria = await CategoriaForo.findOne({ where: { nombre: categoria_foro } });

        if (!categoria) {
            return res.status(404).json({ message: "La categoría ingresada no existe en nuestro sistema" });
        }

        // Crear el subforo
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


