import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Publicacion from './post.js';

const PublicacionImagen = sequelize.define('PublicacionImagen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    publicacion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Publicacion,
            key: 'id',
        },
    },
    imagen: DataTypes.TEXT,
}, {
    modelName: 'PublicacionImagen',
    freezeTableName: true
});

export default PublicacionImagen;
