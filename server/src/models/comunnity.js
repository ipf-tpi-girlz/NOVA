import { DataTypes } from '../config/database/db.js';
import { sequelize } from '../config/database/db.js';
import Usuario from './users.js';

const Comunidad = sequelize.define('Comunidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    moderador_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    img_perfil: DataTypes.TEXT,
    img_portada: DataTypes.TEXT,
    desc: DataTypes.TEXT,
}, {
    modelName: 'Comunidad',
    freezeTableName: true
});

export default Comunidad;
