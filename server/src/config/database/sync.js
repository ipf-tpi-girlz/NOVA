// Importaciones de modelos y sequelize
import { Profesional } from "../../models/profesional.js";
import { Localidad } from "../../models/localidades.js";
import { Usuario } from "../../models/users.js";
import { Departamento } from "../../models/departamentos.js";
import { sequelize } from "../../config/database/db.js";
import { Institucion } from "../../models/institucion.js";
import { Comentario } from "../../models/comentario.js";
import { Subforo } from "../../models/subForo.js";
import { Publicacion } from "../../models/publicacion.js";
import { Respuesta } from "../../models/respuesta.js";

// Función para sincronizar tablas y relaciones
export const syncTables = async () => {
    try {
        // Relaciones entre Departamento y Localidad
        Departamento.hasMany(Localidad, { foreignKey: 'departamento_id', as: 'localidades' });
        Localidad.belongsTo(Departamento, { foreignKey: 'departamento_id', as: 'departamento' });

        // Relación uno a uno: Usuario y Profesional
        Usuario.hasOne(Profesional, { foreignKey: 'usuario_id', as: 'profesional' });
        Profesional.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

        // Relación uno a uno: Usuario y Institución
        Usuario.hasOne(Institucion, { foreignKey: 'usuario_id', as: 'institucion' });
        Institucion.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

        // Relaciones entre Localidad y Usuario
        Localidad.hasMany(Usuario, { foreignKey: 'localidadId', onDelete: 'CASCADE' });
        Usuario.belongsTo(Localidad, { foreignKey: 'localidadId' });

        // Relaciones entre Usuario y Publicación
        Usuario.hasMany(Publicacion, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
        Publicacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

        // Relaciones entre Subforo y Publicación
        Subforo.hasMany(Publicacion, { foreignKey: 'subforoId', onDelete: 'CASCADE' });
        Publicacion.belongsTo(Subforo, { foreignKey: 'subforoId' });

        // Relaciones entre Publicación y Comentario
        Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId', onDelete: 'CASCADE' });
        Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

        // Relaciones entre Usuario y Comentario
        Usuario.hasMany(Comentario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
        Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });

        // Relaciones entre Comentario y Respuesta
        Comentario.hasMany(Respuesta, { foreignKey: 'comentarioId', onDelete: 'CASCADE' });
        Respuesta.belongsTo(Comentario, { foreignKey: 'comentarioId' });

        // Relaciones entre Usuario y Respuesta
        Usuario.hasMany(Respuesta, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
        Respuesta.belongsTo(Usuario, { foreignKey: 'usuarioId' });

        // Sincronización de tablas
        await sequelize.sync({ force: false });
        console.log('Sincronizado correctamente');
    } catch (error) {
        console.log('Se produjo un error al sincronizar:', error);
    }
};
