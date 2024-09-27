
import { sequelize, DataTypes } from '../config/database/db.js'

export const Profesional = sequelize.define('Profesional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Usuario",
            key: 'id'
        }
    },
    nro_matricula: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'profesionales',
    freezeTableName: true,
    underscored: true,
});
