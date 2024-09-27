import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';


export const Respuesta = sequelize.define('Respuesta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comentarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Comentario",
            key: 'id'
        }
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Usuario",
            key: 'id'
        }
    }
}, {
    tableName: 'respuestas',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});

