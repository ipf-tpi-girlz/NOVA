

import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';
import { Usuario } from './users.js';

export const Institucion = sequelize.define('Institucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    cuit: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'instituciones',
    freezeTableName: true,
    underscored: true,
});

Institucion.belongsTo(Usuario, { foreignKey: 'usuario_id' });
