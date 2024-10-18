import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Publicacion from './post.js';
import Usuario from './users.js';

const Reaccion = sequelize.define('Reaccion', {
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
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    tipo_reaccion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    modelName: 'Reaccion',
    freezeTableName: true
});

export default Reaccion;
