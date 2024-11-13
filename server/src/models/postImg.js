import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';

const PublicacionImagen = sequelize.define('PublicacionImagen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagen: DataTypes.TEXT,
}, {
    modelName: 'PublicacionImagen',
    freezeTableName: true
});

export default PublicacionImagen;
