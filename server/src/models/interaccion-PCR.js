import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';

export const interaccion_publicacion = sequelize.define('interaccion_publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'publicaciones', // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'
        }
    },
    comentarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'comentarios', // Asegúrate de que el nombre de la tabla sea correcto
            key: 'id'
        }
    },
    respuestaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
