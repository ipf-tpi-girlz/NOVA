import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';


export const Respuesta = sequelize.define('respuestas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comentarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: "comentarios",
            key: 'id'
        }
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: 'id'
        }
    }
}, {
    tableName: 'respuestas',
    freezeTableName: true,
    underscored: true
});

