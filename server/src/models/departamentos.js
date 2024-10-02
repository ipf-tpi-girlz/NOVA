import { sequelize, DataTypes } from '../config/database/db.js'; // Importar sequelize y DataTypes

export const Departamento = sequelize.define('departamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'departamentos',
    freezeTableName: true,
    underscored: true,
    timestamps: true
});
