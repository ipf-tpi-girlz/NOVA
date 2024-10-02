
import { sequelize, DataTypes } from '../config/database/db.js'

export const Profesional = sequelize.define('profesionales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios",
            key: 'id'
        }
    },
    nro_matricula: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    modo_atencion: {
        type: DataTypes.ENUM('presencial', 'virtual'),
        allowNull: false
    },
    hora_atencion: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'profesionales',
    freezeTableName: true,
    underscored: true
});
