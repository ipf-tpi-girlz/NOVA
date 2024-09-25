
import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';

import { Departamento } from './departamentos.js'; // Asumimos que el modelo de departamento ya está definido

export const Localidad = sequelize.define('Localidad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Departamento,
            key: 'id'
        }
    }
}, {
    tableName: 'localidades',
    freezeTableName: true,
    underscored: true,
});

Localidad.belongsTo(Departamento, { foreignKey: 'departamento_id' });

