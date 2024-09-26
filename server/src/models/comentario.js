import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import { Publicacion } from './publicacion.js';
import { Usuario } from './users.js';

export const Comentario = sequelize.define('Comentario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicacionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Publicacion,
            key: 'id'
        }
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    tableName: 'comentarios',
    freezeTableName: true,
    underscored: true,
    timestamps: false
});
