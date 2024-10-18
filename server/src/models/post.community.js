import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';
import Comunidad from './comunnity.js';

const PublicacionComunidad = sequelize.define('PublicacionComunidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comunidad_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comunidad,
            key: 'id',
        },
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    titulo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    modelName: 'PublicacionComunidad',
    freezeTableName: true
});

export default PublicacionComunidad;
