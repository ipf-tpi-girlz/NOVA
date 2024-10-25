import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';

const Conversacion = sequelize.define('Conversacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario1_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    usuario2_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    tipo_conversacion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isIn: [['institucion-normal', 'profesional-normal']],
        },
    },
}, {
    modelName: 'Conversacion',
    freezeTableName: true
});

export default Conversacion;
