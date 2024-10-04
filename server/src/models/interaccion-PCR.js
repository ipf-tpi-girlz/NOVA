import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';

export const interaccion_publicacion = sequelize.define('interaccion_publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'publicaciones', // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'
        }
    },
    comentario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'comentarios', // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'
        }
    },
    respuesta_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'respuestas', // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'
        }
    }
}, {
    tableName: 'interaccion_publicacion',
    freezeTableName: true,
    underscored: true,
});
