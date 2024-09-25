import { DataTypes } from '../config/database/db.js'
import { sequelize } from '../config/database/db.js';

export const Departamento = sequelize.define('Departamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'departamentos',
    freezeTableName: true,
    underscored: true,
});

