import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';

const InformacionProfesional = sequelize.define('InformacionProfesional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    profesional_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING(255),
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    modelName: 'InformacionProfesional',
    freezeTableName: true
});

export default InformacionProfesional;
