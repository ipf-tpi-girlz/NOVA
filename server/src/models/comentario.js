import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';

export const Comentario = sequelize.define('comentarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "usuarios",
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    underscored: true,
    timestamps: false
});
